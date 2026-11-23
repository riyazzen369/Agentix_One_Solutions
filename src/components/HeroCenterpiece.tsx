"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import type { IconName } from "@/content/site";
import { Icon } from "./Icon";

const chips: { icon: IconName; label: string; status: string; pos: string; depth: number; delay: string }[] = [
  { icon: "bot", label: "AI Chat", status: "Lead qualified", pos: "left-0 top-[4%]", depth: 1.4, delay: "0s" },
  { icon: "workflow", label: "Workflow Automation", status: "CRM updated", pos: "right-0 top-[10%]", depth: 0.9, delay: "-1.2s" },
  { icon: "linkedin", label: "LinkedIn Outreach", status: "Reply tracked", pos: "-left-1 top-[44%] sm:-left-4", depth: 1.7, delay: "-2.4s" },
  { icon: "wallet", label: "Payment Follow-Up", status: "Link shared", pos: "-right-1 top-[50%] sm:-right-4", depth: 1.2, delay: "-3.1s" },
  { icon: "megaphone", label: "Content Automation", status: "Post scheduled", pos: "left-[4%] bottom-[3%]", depth: 0.8, delay: "-0.6s" },
  { icon: "phone", label: "Cold Call Agent", status: "Meeting booked", pos: "right-[4%] bottom-[8%]", depth: 1.5, delay: "-1.8s" },
];

const faces = [
  "rotateY(0deg)", "rotateY(90deg)", "rotateY(180deg)", "rotateY(-90deg)", "rotateX(90deg)", "rotateX(-90deg)",
];

export function HeroCenterpiece() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 80, damping: 18 });
  const sy = useSpring(py, { stiffness: 80, damping: 18 });
  const rotateY = useTransform(sx, [-1, 1], [-14, 14]);
  const rotateX = useTransform(sy, [-1, 1], [10, -10]);

  useEffect(() => {
    if (reduce) return;
    const move = (x: number, y: number) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      px.set(Math.max(-1, Math.min(1, ((x - r.left) / r.width) * 2 - 1)));
      py.set(Math.max(-1, Math.min(1, ((y - r.top) / r.height) * 2 - 1)));
    };
    const onPointer = (e: PointerEvent) => move(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => e.touches[0] && move(e.touches[0].clientX, e.touches[0].clientY);
    const reset = () => { px.set(0); py.set(0); };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", reset, { passive: true });
    document.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", reset);
      document.removeEventListener("pointerleave", reset);
    };
  }, [reduce, px, py]);

  return (
    <div ref={ref} role="img" aria-label="Lavender AI core surrounded by automation cards: AI Chat, Workflow Automation, LinkedIn Outreach, Payment Follow-Up, Content Automation and Cold Call Agent" className="relative mx-auto aspect-square w-full max-w-[560px] [perspective:1100px]">
      <motion.div style={{ rotateX, rotateY }} className="absolute inset-0 [transform-style:preserve-3d]">
        <div className="absolute inset-[13%] rounded-full border-2 border-ink [transform:rotateX(72deg)] [transform-style:preserve-3d]">
          <div className="anim-orbit absolute inset-0">
            <span className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-ink bg-mint" />
          </div>
        </div>
        <div className="absolute inset-[20%] rounded-full border-2 border-dashed border-ink/70 [transform:rotateY(70deg)_rotateX(10deg)]">
          <div className="anim-orbit-rev absolute inset-0">
            <span className="absolute -bottom-2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-ink bg-lavender" />
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2 [--s:clamp(104px,30vw,184px)] h-[var(--s)] w-[var(--s)] [transform-style:preserve-3d]" style={{ transform: "translate(-50%,-50%) translateZ(40px)" }}>
          <div className="anim-spin3d relative h-full w-full [transform-style:preserve-3d] [transform:rotateX(-18deg)_rotateY(30deg)]">
            {faces.map((f, i) => (
              <div
                key={f}
                className="dots absolute inset-0 grid place-items-center rounded-md border-[3px] border-ink bg-lavender [backface-visibility:visible]"
                style={{ transform: `${f} translateZ(calc(var(--s) / 2))` }}
              >
                {i % 2 === 0 ? (
                  <span className="font-display text-[calc(var(--s)*0.32)] font-bold leading-none">AI</span>
                ) : (
                  <span className="h-1/3 w-1/3 rounded-full border-[3px] border-ink bg-lemon" />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {chips.map((c) => (
        <Chip key={c.label} {...c} sx={sx} sy={sy} still={!!reduce} />
      ))}
    </div>
  );
}

function Chip({ icon, label, status, pos, depth, delay, sx, sy, still }: (typeof chips)[number] & { sx: MotionValue<number>; sy: MotionValue<number>; still: boolean }) {
  const x = useTransform(sx, (v) => (still ? 0 : v * depth * 14));
  const y = useTransform(sy, (v) => (still ? 0 : v * depth * 12));
  return (
    <motion.div style={{ x, y }} className={`absolute ${pos}`}>
      <div className="anim-bob flex items-center gap-2 rounded-xl border-2 border-ink bg-alabaster px-2.5 py-2 shadow-brut-sm sm:gap-2.5 sm:px-3 sm:shadow-brut" style={{ animationDelay: delay }}>
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border-2 border-ink bg-lemon sm:h-8 sm:w-8">
          <Icon name={icon} className="h-4 w-4" />
        </span>
        <span className="leading-tight">
          <span className="block font-display text-[11px] font-bold sm:text-[13px]">{label}</span>
          <span className="hidden items-center gap-1 text-[11px] text-slate sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-mint ring-1 ring-ink" />
            {status}
          </span>
        </span>
      </div>
    </motion.div>
  );
}
