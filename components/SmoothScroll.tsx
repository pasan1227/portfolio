"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

// Leaves room for the fixed header pill when scrolling to an anchor (matches scroll-mt-28).
const ANCHOR_OFFSET = -112;

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Route same-page anchor clicks through Lenis so nav/CTA links inherit the
  // momentum scroll (falls back to native smooth when Lenis is off).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
      const anchor = (e.target as HTMLElement)?.closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      const hash = anchor?.getAttribute("href");
      if (!hash || hash === "#") return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: ANCHOR_OFFSET });
      } else {
        (target as HTMLElement).scrollIntoView({ behavior: "smooth" });
      }
      history.pushState(null, "", hash);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <>{children}</>;
}
