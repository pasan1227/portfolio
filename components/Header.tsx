"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";

import { links } from "@/lib/data";
import { useActiveSectionContext } from "@/context/ActiveSectionContext";

export default function Header() {
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  return (
    <header className="fixed inset-x-0 top-0 z-[999] flex justify-center">
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 26 }}
        className="mt-4 flex w-[min(100%-1.5rem,82rem)] items-center justify-between gap-4 rounded-full border border-white/10 bg-ink-900/85 px-4 py-2.5 backdrop-blur-md sm:px-5"
      >
        {/* Wordmark */}
        <Link
          href="#home"
          onClick={() => {
            setActiveSection("Home");
            setTimeOfLastClick(Date.now());
          }}
          className="flex items-center gap-2 font-display text-base font-bold tracking-tight text-bone"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-volt" />
          Pasan<span className="hidden text-bone-muted sm:inline">.dev</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => {
              const isActive = activeSection === link.name;
              return (
                <li key={link.hash} className="relative">
                  <Link
                    href={link.hash}
                    onClick={() => {
                      setActiveSection(link.name);
                      setTimeOfLastClick(Date.now());
                    }}
                    className={clsx(
                      "relative z-10 rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                      isActive ? "text-ink-950" : "text-bone-muted hover:text-bone"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-volt"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* CTA */}
        <Link
          href="#contact"
          onClick={() => {
            setActiveSection("Contact");
            setTimeOfLastClick(Date.now());
          }}
          className="hidden shrink-0 rounded-full bg-volt px-5 py-2.5 text-sm font-semibold text-ink-950 transition-transform hover:scale-[1.04] active:scale-100 sm:inline-flex"
        >
          Let&apos;s talk
        </Link>
      </motion.div>
    </header>
  );
}
