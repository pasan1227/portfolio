"use client";

import React from "react";
import { motion } from "framer-motion";

type SectionHeadingProps = {
  children: React.ReactNode;
  eyebrow?: string;
  align?: "center" | "left";
};

export default function SectionHeading({
  children,
  eyebrow,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={align === "center" ? "flex flex-col items-center text-center" : ""}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="mt-5 max-w-3xl font-display text-display-sm font-extrabold text-bone">
        {children}
      </h2>
    </motion.div>
  );
}
