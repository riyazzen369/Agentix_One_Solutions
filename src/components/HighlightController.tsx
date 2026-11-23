"use client";
import { useEffect } from "react";

// Highlights any element with [data-hl="group"] when clicked (one per group),
// and the element targeted by the URL hash on load / hash change.
export function HighlightController() {
  useEffect(() => {
    const select = (el: HTMLElement, updateHash: boolean) => {
      const group = el.dataset.hl;
      document.querySelectorAll<HTMLElement>(`[data-hl="${group}"].is-hl`).forEach((x) => {
        x.classList.remove("is-hl");
        x.querySelector("[data-hl-toggle]")?.setAttribute("aria-pressed", "false");
      });
      el.classList.add("is-hl");
      el.querySelector("[data-hl-toggle]")?.setAttribute("aria-pressed", "true");
      if (updateHash && el.id) history.replaceState(null, "", `#${el.id}`);
    };
    const fromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      const el = id ? document.getElementById(id) : null;
      if (el?.dataset.hl) select(el, false);
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest("a")) return;
      const el = target.closest<HTMLElement>("[data-hl]");
      if (el) select(el, true);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("hashchange", fromHash);
      document.removeEventListener("click", onClick);
    };
  }, []);
  return null;
}
