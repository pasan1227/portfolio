"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";

type MarqueeProps = {
  items: string[];
  baseVelocity?: number;
};

export default function Marquee({ items, baseVelocity = 3 }: MarqueeProps) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // How much scroll speed warps the marquee; clamp:false lets fast flicks overshoot.
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });

  // 4 copies + a 25% wrap window keeps the strip seamless as baseX advances.
  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const repeated = Array.from({ length: 4 }).flatMap(() => items);

  return (
    <div className="marquee-mask relative flex overflow-hidden border-y border-white/10 py-6">
      <motion.div
        style={{ x }}
        className="flex shrink-0 items-center whitespace-nowrap will-change-transform"
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className="flex items-center font-display text-2xl font-bold uppercase leading-none tracking-tight text-bone sm:text-3xl"
          >
            {item}
            <span className="px-12 text-volt">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
