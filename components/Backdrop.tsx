"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function Backdrop() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // Compositor-only transform on the already-isolated blur layer — the glow
  // drifts as you scroll without repainting the blur.
  const glowY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-40, 260]);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid opacity-[0.5]" />
      <motion.div
        style={{ x: "-50%", y: glowY }}
        className="pointer-events-none fixed -top-48 left-1/2 -z-10 h-[40rem] w-[40rem] rounded-full bg-volt/10 blur-[120px] will-change-transform"
      />
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-ink-950 to-transparent" />
    </>
  );
}
