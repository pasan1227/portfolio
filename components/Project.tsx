"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

import { projectsData } from "@/lib/data";

type ProjectProps = (typeof projectsData)[number] & { index: number };

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  link,
  index,
}: ProjectProps) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
      className="surface surface-hover group flex flex-col overflow-hidden rounded-3xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={imageUrl}
          alt={`${title} — screenshot`}
          quality={95}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-850 via-transparent to-transparent" />
        <span className="absolute left-5 top-5 font-display text-2xl font-extrabold text-bone drop-shadow-lg">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-ink-950/70 text-bone transition-colors duration-300 group-hover:bg-volt group-hover:text-ink-950">
          <FiArrowUpRight className="text-lg" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="font-display text-2xl font-bold text-bone transition-colors group-hover:text-volt">
          {title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-bone-muted">
          {description}
        </p>
        <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[0.7rem] uppercase tracking-wider text-bone-dim">
          {tags.map((tag) => (
            <li key={tag} className="before:mr-3 before:text-volt before:content-['/']">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.a>
  );
}
