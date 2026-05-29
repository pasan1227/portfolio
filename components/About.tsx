"use client";

import React from "react";
import { motion } from "framer-motion";

import SectionHeading from "./SectionHeading";
import { useSectionInView } from "@/lib/hooks";

const facts = [
  { k: "Based in", v: "Kandy, Sri Lanka · Remote-friendly" },
  { k: "Focus", v: "Full-stack web (React / Next.js / NestJS)" },
  { k: "Currently", v: "Software Engineer @ BotCalm" },
  { k: "Education", v: "BSc (Hons) Computer Science — Staffordshire (UK)" },
];

export default function About() {
  const { ref } = useSectionInView("About");

  return (
    <section
      ref={ref}
      id="about"
      className="mx-auto max-w-wide scroll-mt-28 px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading eyebrow="About">The person behind the code.</SectionHeading>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="space-y-5 text-lg leading-relaxed text-bone-muted"
        >
          <p className="text-2xl leading-snug text-bone">
            I got into programming for the problem-solving — that moment a hard
            bug finally clicks. I never lost it.
          </p>
          <p>
            I&apos;m a full-stack engineer with 2+ years of commercial experience
            and a BSc (Hons) in Computer Science from the University of
            Staffordshire. Today I&apos;m a Software Engineer at BotCalm, building
            scalable products across diverse domains — from a casino compliance
            platform to a school management system — using Next.js, NestJS, and
            TypeScript in a monorepo setup.
          </p>
          <p>
            My core stack is{" "}
            <span className="text-bone">
              React, Next.js, NestJS, and TypeScript
            </span>
            , and I care about clean, maintainable code, fast iteration, and
            interfaces that feel considered. I also mentor junior developers on
            best practices. When I&apos;m not coding: video games, films, and my
            dog.
          </p>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="surface divide-y divide-white/10 rounded-3xl p-2"
        >
          {facts.map((f) => (
            <div key={f.k} className="px-5 py-4">
              <dt className="font-mono text-xs uppercase tracking-[0.2em] text-bone-dim">
                {f.k}
              </dt>
              <dd className="mt-1 font-medium text-bone">{f.v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
