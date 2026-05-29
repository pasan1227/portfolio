"use client";

import React from "react";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiNestjs,
  SiTailwindcss,
  SiPrisma,
  SiTurborepo,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiExpress,
} from "react-icons/si";

import SectionHeading from "./SectionHeading";
import { skillGroups } from "@/lib/data";
import { useSectionInView } from "@/lib/hooks";

const icons: Record<string, IconType> = {
  HTML: SiHtml5,
  CSS: SiCss,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  NestJS: SiNestjs,
  Tailwind: SiTailwindcss,
  Prisma: SiPrisma,
  Turborepo: SiTurborepo,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  MySQL: SiMysql,
  Firebase: SiFirebase,
  Express: SiExpress,
};

export default function Skills() {
  const { ref } = useSectionInView("Capabilities");

  return (
    <section
      ref={ref}
      id="capabilities"
      className="mx-auto max-w-wide scroll-mt-28 px-5 py-24 sm:px-8 sm:py-32"
    >
      <SectionHeading eyebrow="Capabilities">
        The stack I build with.
      </SectionHeading>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: gi * 0.1 }}
            className="surface rounded-3xl p-7"
          >
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-bone-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-volt" />
              {group.label}
            </h3>
            <ul className="mt-6 space-y-1">
              {group.skills.map((skill) => {
                const Icon = icons[skill];
                return (
                  <li
                    key={skill}
                    className="group flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/[0.04]"
                  >
                    {Icon && (
                      <Icon className="text-xl text-bone-muted transition-colors group-hover:text-volt" />
                    )}
                    <span className="font-medium text-bone">{skill}</span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
