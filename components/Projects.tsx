"use client";

import React from "react";

import SectionHeading from "./SectionHeading";
import Project from "./Project";
import { projectsData } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

export default function Projects() {
  const { ref } = useSectionInView("Work", 0.15);

  return (
    <section
      ref={ref}
      id="work"
      className="mx-auto max-w-wide scroll-mt-28 px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading eyebrow="Selected Work">
        Things I&apos;ve designed &amp; built.
      </SectionHeading>

      {/* Personal projects — live, clickable demos */}
      <div className="mt-12">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-bone-dim">
          Personal projects · live demos
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {projectsData.map((project, index) => (
            <Project key={project.title} index={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
