import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-wide px-5 py-14 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <a
              href="#home"
              className="flex items-center gap-2.5 font-display text-2xl font-extrabold tracking-tight text-bone"
            >
              <span className="h-3 w-3 rounded-full bg-volt" />
              Pasan Ratnayake
            </a>
            <p className="mt-3 max-w-sm text-sm text-bone-muted">
              Full-stack engineer building fast, production-grade web products.
              Open to elite roles and select freelance work.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-bone-muted">
            <span className="h-2 w-2 rounded-full bg-volt" />
            Available for work — 2026
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 font-mono text-xs text-bone-dim sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Pasan Ratnayake. All rights reserved.</p>
          <p>Built with Next.js · TypeScript · Tailwind · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
