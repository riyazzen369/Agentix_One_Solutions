"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const all = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.revealed):not(.reveal-hidden)");
    if (!("IntersectionObserver" in window)) {
      all.forEach((el) => el.classList.add("revealed"));
      return;
    }
    // Anything already on screen (or above it) stays visible; only content below the fold is hidden and revealed on scroll.
    const els: HTMLElement[] = [];
    all.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("revealed");
      else {
        el.classList.add("reveal-hidden");
        els.push(el);
      }
    });
    const io = new IntersectionObserver(
      (entries) =>
        entries
          .filter((e) => e.isIntersecting)
          .forEach((e, i) => {
            const el = e.target as HTMLElement;
            const delay = Math.min(i, 6) * 70;
            el.style.transitionDelay = `${delay}ms`;
            el.classList.add("revealed");
            window.setTimeout(() => (el.style.transitionDelay = ""), delay + 500);
            io.unobserve(e.target);
          }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
