"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BsArrowRight, BsCheckLg } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";

import SectionHeading from "./SectionHeading";

const tracks = [
  {
    no: "01",
    label: "For companies",
    title: "Hire a full-stack engineer",
    blurb:
      "Looking for someone who can own features end-to-end and ship? I move fast across the stack and write code that holds up.",
    points: [
      "2+ years shipping production software across domains",
      "End-to-end React, Next.js & NestJS — frontend to backend",
      "Monorepo architecture, REST APIs, and clean code",
      "Mentors junior developers and raises code quality",
    ],
    primary: { label: "View my experience", href: "#experience" },
    secondary: { label: "Download CV", href: "/CV.pdf", download: true },
  },
  {
    no: "02",
    label: "For founders & teams",
    title: "Let's build your product",
    blurb:
      "Got an idea, MVP, or feature that needs building? I take projects from design to deployment with a modern, reliable stack.",
    points: [
      "Full-stack web apps from idea to deployment",
      "Modern stack: Next.js, TypeScript, NestJS, PostgreSQL",
      "Clear communication and fast iteration",
      "Available for select freelance engagements",
    ],
    primary: { label: "Start a project", href: "#contact" },
    secondary: null,
  },
] as const;

export default function DualTrack() {
  return (
    <section className="mx-auto max-w-wide px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading eyebrow="Engagement">
        Two ways to <span className="text-volt">work together</span>.
      </SectionHeading>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {tracks.map((t, i) => (
          <motion.div
            key={t.no}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="surface surface-hover group flex flex-col rounded-3xl p-8 sm:p-10"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-display text-5xl font-extrabold text-ink-700 transition-colors group-hover:text-volt">
                {t.no}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-bone-muted">
                {t.label}
              </span>
            </div>

            <h3 className="mt-6 font-display text-3xl font-bold text-bone">
              {t.title}
            </h3>
            <p className="mt-3 text-bone-muted">{t.blurb}</p>

            <ul className="mt-7 flex-1 space-y-3">
              {t.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-bone">
                  <BsCheckLg className="mt-0.5 shrink-0 text-volt" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href={t.primary.href} className="btn-volt group/btn">
                {t.primary.label}
                <BsArrowRight className="transition-transform group-hover/btn:translate-x-1" />
              </Link>
              {t.secondary && (
                <a href={t.secondary.href} download className="btn-ghost group/dl">
                  {t.secondary.label}
                  <HiDownload className="transition-transform group-hover/dl:translate-y-0.5" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
