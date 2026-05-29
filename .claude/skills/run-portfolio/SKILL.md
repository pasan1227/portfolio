---
name: run-portfolio
description: Build, run, and drive the portfolio Next.js web app. Use when asked to start/run the portfolio, build it, run its checks, take a screenshot of the site, or interact with / drive the running app in a browser.
---

Single-page personal portfolio — Next.js 16 (App Router), React 19, Tailwind, Framer Motion. You drive it by starting the dev server, then driving **headless system Chrome** via `.claude/skills/run-portfolio/driver.mjs` — a zero-dependency Chrome DevTools Protocol driver (no Playwright or `chromium-cli` needed). All paths below are relative to the repo root.

## Prerequisites

- **Node ≥ 22** — the driver uses Node's built-in global `WebSocket` + `fetch`.
- **A Chrome/Chromium binary.** Auto-detected at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` (macOS) or `/usr/bin/google-chrome` / `/usr/bin/chromium` (Linux). Override with `CHROME_BIN`.
- **Yarn 4** (repo pins `yarn@4.12.0` via Corepack).

```bash
node -v   # must print v22.x or newer
```

## Setup

```bash
yarn install
```

## Build

```bash
yarn build   # compiles, type-checks, and statically prerenders /
```

## Run (agent path)

Start the dev server in the background and wait until it actually serves:

```bash
pkill -f "next dev" 2>/dev/null   # clear any stale server (avoids EADDRINUSE on :3000)
yarn dev > /tmp/portfolio-dev.log 2>&1 &
# macOS has no `timeout` — poll the port in a loop instead:
for i in $(seq 1 60); do curl -sf http://localhost:3000 >/dev/null 2>&1 && { echo "up after ${i}s"; break; }; sleep 1; done
```

Then drive it — pipe a command script to the driver on stdin:

```bash
node .claude/skills/run-portfolio/driver.mjs <<'EOF'
nav http://localhost:3000
wait-for text=Pasan Ratnayake
screenshot 01-hero
click a[href="#work"]
wait-for text=designed & built
screenshot 02-work
reveal
screenshot-full 03-whole-page
console
EOF
```

Screenshots land in **`$TMPDIR/portfolio-shots/`** (override with `SHOTS_DIR=/abs/path`). The final `console` line reports page console errors/warnings — expect `console: no errors/warnings`. A non-zero exit means a `wait-for`/`click` failed (page didn't render as expected).

| command | what it does |
|---|---|
| `nav <url>` | navigate, wait for load + brief hydration settle |
| `wait-for text=<s>` / `wait-for <css>` | poll until text/selector appears (absorbs slow first compile) |
| `scroll bottom\|top\|<px>\|<css>` | scroll; settles scroll-triggered animation |
| `reveal` | step-scroll the whole page so every Framer-Motion `whileInView` section triggers — **run before `screenshot-full`** |
| `click <css>` | click an element (e.g. a nav anchor) |
| `fill <css> <value>` | set an input/textarea value (via React's native setter + input/change events) |
| `eval <js>` | run JS in the page, print the result |
| `screenshot [name]` | viewport PNG |
| `screenshot-full [name]` | full-page PNG (run `reveal` first) |
| `console` | print collected console errors/warnings |

Drive the **contact form** (the one genuinely interactive surface) — fill it and screenshot, but **do not submit** (see Gotchas):

```bash
node .claude/skills/run-portfolio/driver.mjs <<'EOF'
nav http://localhost:3000
wait-for text=Pasan Ratnayake
scroll #contact
wait-for input[name="senderEmail"]
fill input[name="senderEmail"] recruiter@example.com
fill textarea[name="message"] Hi Pasan — loved the portfolio, let's talk!
screenshot 04-contact-filled
console
EOF
```

Stop the server when done:

```bash
pkill -f "next dev"
```

## Run (human path)

```bash
yarn dev   # → http://localhost:3000 ; open in a browser. Ctrl-C to stop.
```

## Test

No unit/e2e suite exists in this project. `yarn build` is the correctness gate (TypeScript + compile + static prerender). For a behavior/visual smoke check, use the driver flow above and confirm `console` is clean.

## Gotchas

- **`whileInView` sections render blank in `screenshot-full`.** Every section starts at `opacity: 0` and only animates in when scrolled into the *real* viewport, so a full-page capture shows them faded/empty. Run `reveal` first — it step-scrolls top→bottom→top, and because reveals use `viewport={{ once: true }}` they stay shown. For one section, `scroll <#id>` then `screenshot` (viewport).
- **macOS has no `timeout`.** The generic `timeout 30 bash -c '...'` pattern fails with `command not found`. Poll with a `for i in $(seq 1 60)` loop (as above).
- **`chromium-cli` / Playwright are NOT installed here.** The driver talks to system Chrome directly over CDP using Node 22's built-in `WebSocket`. On Node < 22 it can't connect.
- **First `nav` can take several seconds** — Turbopack compiles routes on demand. `wait-for` absorbs it; a fixed `sleep` won't.
- **`next/image` `quality` must be listed in `next.config.js` `images.qualities`** (currently `[75, 95]`). An unlisted value logs a console warning per image — surfaced by the `console` command.
- **Don't submit the contact form from the driver.** The submit button fires a Next Server Action (`actions/sendEmail.ts`) that calls Resend — it needs `RESEND_API_KEY` and actually sends an email. `fill` the fields and `screenshot` to prove the form works; stop before `click button[type="submit"]`. The form inputs are uncontrolled (read via `FormData` `name`), but `fill` uses the native setter + events so it's safe either way.

## Troubleshooting

- **`Chrome devtools endpoint never came up`**: port `9222` busy or Chrome path wrong → set `CDP_PORT=` / `CHROME_BIN=`.
- **`No Chrome/Chromium found`**: set `CHROME_BIN=/path/to/chrome`.
- **`EADDRINUSE` or stale content on :3000**: an old dev server is running → `pkill -f "next dev"`, then restart.
- **`yarn: command not found`**: enable Corepack (`corepack enable`) or prefix commands with `corepack ` (repo pins `yarn@4.12.0`).
