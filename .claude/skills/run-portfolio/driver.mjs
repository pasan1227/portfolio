#!/usr/bin/env node
// Zero-dependency headless-Chrome driver for the portfolio web app.
// Drives a running Next.js dev/prod server over the Chrome DevTools Protocol:
// navigate, wait for content, scroll, click, screenshot, and report console errors.
//
// Needs only Node >=22 (global WebSocket + fetch) and a Chrome/Chromium binary.
//
// Usage: pipe a command script on stdin (one command per line):
//
//   node .claude/skills/run-portfolio/driver.mjs <<'EOF'
//   nav http://localhost:3000
//   wait-for text=Pasan Ratnayake
//   screenshot hero
//   reveal
//   screenshot-full whole-page
//   console
//   EOF
//
// Commands: nav <url> | wait-for text=<s>|<css> | scroll bottom|top|<px>|<css>
//           | reveal | click <css> | fill <css> <value> | eval <js>
//           | screenshot[-full] [name] | console
//
// Env:
//   CHROME_BIN  override Chrome path
//   SHOTS_DIR   screenshot output dir (default: $TMPDIR/portfolio-shots)
//   WIDTH/HEIGHT viewport (default 1440x900)
//   CDP_PORT    remote debugging port (default 9222)

import { spawn } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const PORT = Number(process.env.CDP_PORT || 9222);
const WIDTH = Number(process.env.WIDTH || 1440);
const HEIGHT = Number(process.env.HEIGHT || 900);
const SHOTS_DIR = process.env.SHOTS_DIR || path.join(os.tmpdir(), "portfolio-shots");

function findChrome() {
  if (process.env.CHROME_BIN) return process.env.CHROME_BIN;
  const candidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ];
  for (const c of candidates) if (existsSync(c)) return c;
  throw new Error("No Chrome/Chromium found. Set CHROME_BIN.");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --- minimal CDP client over the browser-level websocket (flatten sessions) ---
class CDP {
  constructor(ws) {
    this.ws = ws;
    this.nextId = 1;
    this.pending = new Map();
    this.handlers = [];
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
      } else if (msg.method) {
        for (const h of this.handlers) h(msg);
      }
    });
  }
  send(method, params = {}, sessionId) {
    const id = this.nextId++;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify(payload));
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error(`CDP timeout: ${method}`));
        }
      }, 30000);
    });
  }
  on(fn) { this.handlers.push(fn); }
}

async function connect(url) {
  const ws = new WebSocket(url);
  await new Promise((res, rej) => {
    ws.addEventListener("open", res, { once: true });
    ws.addEventListener("error", () => rej(new Error("ws connect failed")), { once: true });
  });
  return ws;
}

async function waitForJsonVersion() {
  for (let i = 0; i < 100; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) return await r.json();
    } catch {}
    await sleep(100);
  }
  throw new Error("Chrome devtools endpoint never came up");
}

async function main() {
  const script = (await readStdin()).split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
  if (script.length === 0) { console.error("No commands on stdin."); process.exit(2); }

  mkdirSync(SHOTS_DIR, { recursive: true });
  const profile = mkdtempSync(path.join(os.tmpdir(), "portfolio-chrome-"));
  const chrome = spawn(findChrome(), [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${profile}`,
    `--window-size=${WIDTH},${HEIGHT}`,
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-sandbox",
    "--disable-dev-shm-usage",
    "about:blank",
  ], { stdio: "ignore" });

  let failed = false;
  const consoleErrors = [];
  try {
    const { webSocketDebuggerUrl } = await waitForJsonVersion();
    const browserWs = await connect(webSocketDebuggerUrl);
    const cdp = new CDP(browserWs);

    const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });

    cdp.on((msg) => {
      if (msg.sessionId && msg.sessionId !== sessionId) return;
      if (msg.method === "Runtime.consoleAPICalled" && ["error", "warning"].includes(msg.params.type)) {
        consoleErrors.push(`[console.${msg.params.type}] ` + msg.params.args.map((a) => a.value ?? a.description ?? a.type).join(" "));
      } else if (msg.method === "Runtime.exceptionThrown") {
        consoleErrors.push("[exception] " + (msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text));
      } else if (msg.method === "Log.entryAdded" && msg.params.entry.level === "error") {
        consoleErrors.push("[log.error] " + msg.params.entry.text);
      }
    });

    await cdp.send("Page.enable", {}, sessionId);
    await cdp.send("Runtime.enable", {}, sessionId);
    await cdp.send("Log.enable", {}, sessionId);
    await cdp.send("Emulation.setDeviceMetricsOverride", { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: false }, sessionId);

    const evaluate = async (expr) => {
      const r = await cdp.send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true }, sessionId);
      if (r.exceptionDetails) throw new Error("eval failed: " + (r.exceptionDetails.exception?.description || r.exceptionDetails.text));
      return r.result.value;
    };

    for (const line of script) {
      const sp = line.indexOf(" ");
      const cmd = sp === -1 ? line : line.slice(0, sp);
      const arg = sp === -1 ? "" : line.slice(sp + 1).trim();

      if (cmd === "nav") {
        const loaded = new Promise((res) => {
          const h = (m) => { if (m.method === "Page.loadEventFired" && m.sessionId === sessionId) { res(); } };
          cdp.on(h);
        });
        await cdp.send("Page.navigate", { url: arg }, sessionId);
        await Promise.race([loaded, sleep(20000)]);
        await sleep(600); // let client-side hydration/animation settle
        console.log(`nav -> ${arg}`);
      } else if (cmd === "wait-for") {
        let expr;
        if (arg.startsWith("text=")) { const t = arg.slice(5); expr = `!!(document.body && document.body.innerText.includes(${JSON.stringify(t)}))`; }
        else { expr = `!!document.querySelector(${JSON.stringify(arg)})`; }
        let ok = false;
        for (let i = 0; i < 60; i++) { if (await evaluate(expr)) { ok = true; break; } await sleep(250); }
        if (!ok) throw new Error(`wait-for timed out: ${arg}`);
        console.log(`wait-for ok: ${arg}`);
      } else if (cmd === "scroll") {
        if (arg === "bottom") await evaluate("window.scrollTo(0, document.body.scrollHeight)");
        else if (arg === "top") await evaluate("window.scrollTo(0,0)");
        else if (/^\d+$/.test(arg)) await evaluate(`window.scrollTo(0, ${arg})`);
        else await evaluate(`document.querySelector(${JSON.stringify(arg)})?.scrollIntoView({behavior:'instant',block:'start'})`);
        await sleep(700); // settle scroll-triggered animations
        console.log(`scroll: ${arg}`);
      } else if (cmd === "reveal") {
        // Step-scroll top->bottom so every framer-motion whileInView section
        // (initial opacity 0, viewport once:true) actually triggers, then return
        // to top. Required before screenshot-full or sections render blank.
        const h = await evaluate("document.body.scrollHeight");
        for (let y = 0; y < h; y += Math.floor(HEIGHT * 0.8)) { await evaluate(`window.scrollTo(0, ${y})`); await sleep(250); }
        await evaluate("window.scrollTo(0, document.body.scrollHeight)"); await sleep(400);
        await evaluate("window.scrollTo(0, 0)"); await sleep(400);
        console.log("reveal: scrolled full page to trigger animations");
      } else if (cmd === "click") {
        const found = await evaluate(`(()=>{const el=document.querySelector(${JSON.stringify(arg)}); if(el){el.click(); return true;} return false;})()`);
        if (!found) throw new Error(`click target not found: ${arg}`);
        await sleep(700);
        console.log(`click: ${arg}`);
      } else if (cmd === "fill") {
        // fill <css-selector> <value> — sets the field via React's native value
        // setter and fires input+change, so it works for both uncontrolled and
        // React-controlled inputs (plain el.value = x would skip React's onChange).
        const fsp = arg.indexOf(" ");
        if (fsp === -1) throw new Error("fill needs: <selector> <value>");
        const sel = arg.slice(0, fsp), val = arg.slice(fsp + 1);
        const found = await evaluate(`(()=>{const el=document.querySelector(${JSON.stringify(sel)}); if(!el) return false; const proto = el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:HTMLInputElement.prototype; Object.getOwnPropertyDescriptor(proto,'value').set.call(el, ${JSON.stringify(val)}); el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true})); el.focus(); return true;})()`);
        if (!found) throw new Error(`fill target not found: ${sel}`);
        console.log(`fill: ${sel}`);
      } else if (cmd === "eval") {
        console.log("eval ->", await evaluate(arg));
      } else if (cmd === "screenshot" || cmd === "screenshot-full") {
        const full = cmd === "screenshot-full";
        const name = (arg || `shot-${Date.now()}`).replace(/[^\w.-]/g, "_");
        const { data } = await cdp.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: full, fromSurface: true }, sessionId);
        const out = path.join(SHOTS_DIR, name.endsWith(".png") ? name : `${name}.png`);
        writeFileSync(out, Buffer.from(data, "base64"));
        console.log(`${cmd} -> ${out}`);
      } else if (cmd === "console") {
        if (consoleErrors.length === 0) console.log("console: no errors/warnings");
        else { console.log(`console: ${consoleErrors.length} error(s)/warning(s):`); consoleErrors.forEach((e) => console.log("  " + e)); }
      } else {
        throw new Error(`unknown command: ${cmd}`);
      }
    }
  } catch (e) {
    failed = true;
    console.error("DRIVER ERROR:", e.message);
  } finally {
    chrome.kill("SIGKILL");
    try { rmSync(profile, { recursive: true, force: true }); } catch {}
  }
  process.exit(failed ? 1 : 0);
}

function readStdin() {
  return new Promise((resolve) => {
    let data = "";
    if (process.stdin.isTTY) return resolve("");
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (c) => (data += c));
    process.stdin.on("end", () => resolve(data));
  });
}

main();
