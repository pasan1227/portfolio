"use client";

import Image from "next/image";
import React, { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BsArrowRight, BsLinkedin, BsGithub } from "react-icons/bs";

import { useSectionInView } from "@/lib/hooks";
import { useActiveSectionContext } from "@/context/ActiveSectionContext";

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.08 * i, ease: "easeOut" as const },
  }),
};

export default function Intro() {
  const { ref } = useSectionInView("Home", 0.4);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();

  const reduce = useReducedMotion();
  const portraitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ["start start", "end start"],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -70]);
  const frameY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 50]);

  return (
    <section
      ref={ref}
      id="home"
      className="mx-auto flex min-h-screen max-w-wide scroll-mt-28 flex-col justify-center px-5 pb-16 pt-32 sm:px-8"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
        {/* Left — statement */}
        <div>
          <motion.p custom={0} variants={rise} initial="hidden" animate="show" className="eyebrow">
            Pasan Ratnayake — Full-stack Engineer
          </motion.p>

          <motion.h1
            custom={1}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-6 font-display text-display font-extrabold text-bone"
          >
            I build fast,
            <br />
            <span className="text-volt">production-grade</span>
            <br />
            web products.
          </motion.h1>

          <motion.p
            custom={2}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-8 max-w-xl text-lg leading-relaxed text-bone-muted"
          >
            I&apos;m a full-stack engineer with 2+ years building production web
            apps in{" "}
            <span className="text-bone">React, Next.js &amp; NestJS</span> — from
            compliance dashboards to school platforms. Open to elite engineering
            roles and select freelance work.
          </motion.p>

          <motion.div
            custom={3}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-4 flex flex-wrap items-center gap-3"
          >
            <Link
              href="#work"
              onClick={() => {
                setActiveSection("Work");
                setTimeOfLastClick(Date.now());
              }}
              className="btn-volt group"
            >
              See selected work
              <BsArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#contact"
              onClick={() => {
                setActiveSection("Contact");
                setTimeOfLastClick(Date.now());
              }}
              className="btn-ghost"
            >
              Start a conversation
            </Link>
            <div className="flex items-center gap-2 pl-1">
              <a
                href="https://github.com/pasan1227"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone-muted transition-colors hover:border-volt hover:text-volt"
              >
                <BsGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/pasanratnayake/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-bone-muted transition-colors hover:border-volt hover:text-volt"
              >
                <BsLinkedin />
              </a>
            </div>
          </motion.div>

          {/* honest credibility row */}
          <motion.dl
            custom={4}
            variants={rise}
            initial="hidden"
            animate="show"
            className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-7 font-mono text-xs uppercase tracking-wider text-bone-dim"
          >
            <div>
              <dt>Experience</dt>
              <dd className="mt-1 text-2xl font-bold tracking-normal text-bone">2+ yrs</dd>
            </div>
            <div>
              <dt>Production systems</dt>
              <dd className="mt-1 text-2xl font-bold tracking-normal text-bone">6+</dd>
            </div>
            <div>
              <dt>Credential</dt>
              <dd className="mt-1 text-2xl font-bold tracking-normal text-bone">BSc (Hons)</dd>
            </div>
          </motion.dl>
        </div>

        {/* Right — portrait */}
        <motion.div
          ref={portraitRef}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto hidden w-full max-w-sm lg:block"
        >
          <motion.div
            style={{ y: portraitY }}
            className="surface relative overflow-hidden rounded-3xl p-3 will-change-transform"
          >
            <Image
              src="/assets/pasan.jpg"
              alt="Pasan Ratnayake"
              width={480}
              height={560}
              quality={95}
              priority
              className="aspect-[4/5] w-full rounded-2xl object-cover"
            />
            <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full bg-ink-950/80 px-3 py-1.5 text-xs font-medium text-bone">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-volt opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-volt" />
              </span>
              Available for work
            </div>
          </motion.div>
          <motion.div
            style={{ y: frameY }}
            className="pointer-events-none absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-3xl border border-volt/40 will-change-transform"
          />
        </motion.div>
      </div>
    </section>
  );
}
