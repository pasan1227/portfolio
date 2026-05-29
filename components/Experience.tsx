"use client";

import React from "react";
import { motion } from "framer-motion";

import SectionHeading from "./SectionHeading";
import { experiencesData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

export default function Experience() {
  const { ref } = useSectionInView("Experience");

  return (
    <section
      ref={ref}
      id="experience"
      className="mx-auto max-w-wide scroll-mt-28 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.7fr] lg:gap-16">
        {/* Pinned heading — stays put while the timeline scrolls past it */}
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <SectionHeading eyebrow="Track record">
            Where I&apos;ve worked &amp; studied.
          </SectionHeading>
          <p className="mt-6 max-w-xs text-bone-muted">
            The teams, products, and degree that shaped how I build today.
          </p>
        </div>

        <div className="relative pl-9 sm:pl-14">
          <div className="absolute left-[0.45rem] top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-volt via-white/15 to-transparent sm:left-[1.2rem]" />

          <div className="space-y-5">
            {experiencesData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative"
            >
              <span className="absolute -left-9 top-5 flex h-[1.3rem] w-[1.3rem] items-center justify-center rounded-full border border-volt/50 bg-ink-900 text-sm text-volt sm:-left-[2.75rem] sm:h-7 sm:w-7">
                {item.icon}
              </span>

              <div className="surface surface-hover rounded-2xl p-6 sm:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl font-bold text-bone">
                    {item.title}
                  </h3>
                  <span className="font-mono text-xs uppercase tracking-wider text-volt">
                    {item.date}
                  </span>
                </div>
                <p className="mt-0.5 text-sm font-medium text-bone-muted">
                  {item.location}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-bone-muted">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
