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
    <div ref={ref} role="img" aria-label="3D alien robot with glowing neon-blue antennae, surrounded by automation cards: AI Chat, Workflow Automation, LinkedIn Outreach, Payment Follow-Up, Content Automation and Cold Call Agent" className="relative mx-auto aspect-square w-full max-w-[560px] [perspective:1100px]">
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
        <Robot sx={sx} sy={sy} still={!!reduce} />
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

const NEON_GLOW = "0 0 10px 3px rgba(47,216,255,0.85), 0 0 26px 8px rgba(47,216,255,0.45)";

type CuboidProps = { w: number; h: number; d: number; x: number; y: number; dark?: boolean; front?: React.ReactNode };

function Cuboid({ w, h, d, x, y, dark, front }: CuboidProps) {
  const base = "absolute grid place-items-center border-[3px] border-ink rounded-[12px]";
  const c = dark ? { front: "bg-ink", side: "bg-ink", top: "bg-ink" } : { front: "bg-lavender", side: "bg-[#8B45EC]", top: "bg-[#C39BFF]" };
  return (
    <div className="absolute [transform-style:preserve-3d]" style={{ left: x, top: y, width: w, height: h }}>
      <div className={`${base} ${c.front}`} style={{ width: w, height: h, transform: `translateZ(${d / 2}px)` }}>{front}</div>
      <div className={`${base} ${c.side}`} style={{ width: w, height: h, transform: `rotateY(180deg) translateZ(${d / 2}px)` }} />
      <div className={`${base} ${c.side}`} style={{ width: d, height: h, left: (w - d) / 2, transform: `rotateY(90deg) translateZ(${w / 2}px)` }} />
      <div className={`${base} ${c.side}`} style={{ width: d, height: h, left: (w - d) / 2, transform: `rotateY(-90deg) translateZ(${w / 2}px)` }} />
      <div className={`${base} ${c.top}`} style={{ width: w, height: d, top: (h - d) / 2, transform: `rotateX(90deg) translateZ(${h / 2}px)` }} />
      <div className={`${base} ${c.side}`} style={{ width: w, height: d, top: (h - d) / 2, transform: `rotateX(-90deg) translateZ(${h / 2}px)` }} />
    </div>
  );
}

function Antenna({ side }: { side: -1 | 1 }) {
  return (
    <div className="absolute bottom-0 left-1/2 h-[64px] w-[5px] origin-bottom rounded-full bg-ink" style={{ marginLeft: side * 34 - 2, transform: `rotateZ(${side * 20}deg)` }}>
      <span className="anim-neon absolute -left-[9px] -top-[18px] h-[23px] w-[23px] rounded-full border-[3px] border-ink bg-neon" style={{ boxShadow: NEON_GLOW, animationDelay: side > 0 ? "-0.9s" : "0s" }} />
    </div>
  );
}

function Eye({ side }: { side: -1 | 1 }) {
  return (
    <span className="anim-blink relative block h-[34px] w-[50px] rounded-[60%_60%_55%_55%/70%_70%_45%_45%] border-[3px] border-ink bg-ink" style={{ transform: `rotate(${side * -16}deg)` }}>
      <span className="absolute top-[8px] h-[13px] w-[13px] rounded-full bg-neon" style={{ left: side < 0 ? 22 : 9, boxShadow: NEON_GLOW }} />
      <span className="absolute top-[7px] h-[4px] w-[4px] rounded-full bg-white" style={{ left: side < 0 ? 24 : 11 }} />
    </span>
  );
}

function Robot({ sx, sy, still }: { sx: MotionValue<number>; sy: MotionValue<number>; still: boolean }) {
  const headY = useTransform(sx, (v) => (still ? 0 : v * 22));
  const headX = useTransform(sy, (v) => (still ? 0 : v * -12));
  return (
    <div
      className="absolute left-1/2 top-1/2 h-[390px] w-[240px] [--k:0.66] [transform-style:preserve-3d] sm:[--k:0.9] lg:[--k:1]"
      style={{ transform: "translate(-50%,-50%) scale(var(--k)) translateZ(30px)" }}
    >
      <div className="anim-bob absolute inset-0 pt-[50px] [transform-style:preserve-3d]">
        <div className="anim-sway absolute inset-x-0 bottom-0 top-[50px] [transform-style:preserve-3d] [transform:rotateX(-8deg)_rotateY(-22deg)]">
          {/* head + antennae track the pointer */}
          <motion.div style={{ rotateY: headY, rotateX: headX, transformOrigin: "50% 100%" }} className="absolute inset-x-0 -top-[60px] h-[236px] [transform-style:preserve-3d]">
            <div className="absolute inset-x-0 top-0 h-[128px]">
              <Antenna side={-1} />
              <Antenna side={1} />
            </div>
            <Cuboid
              w={164} h={112} d={112} x={38} y={124}
              front={
                <div className="flex flex-col items-center gap-3">
                  <div className="flex gap-4"><Eye side={-1} /><Eye side={1} /></div>
                  <span className="flex gap-1">{[0, 1, 2, 3].map((i) => <span key={i} className="h-[6px] w-[6px] rounded-sm bg-ink" />)}</span>
                </div>
              }
            />
          </motion.div>
          <Cuboid w={40} h={18} d={40} x={100} y={176} dark />
          <Cuboid
            w={132} h={98} d={86} x={54} y={192}
            front={
              <div className="flex flex-col items-center gap-2.5">
                <span className="anim-neon h-[30px] w-[30px] rounded-full border-[3px] border-ink bg-neon" style={{ boxShadow: NEON_GLOW }} />
                <span className="flex gap-1.5"><span className="h-2 w-5 rounded-full border-2 border-ink bg-mint" /><span className="h-2 w-2 rounded-full border-2 border-ink bg-lemon" /></span>
              </div>
            }
          />
          <Cuboid w={26} h={78} d={26} x={22} y={200} />
          <Cuboid w={26} h={78} d={26} x={192} y={200} />
        </div>
        <div className="absolute bottom-[10px] left-1/2 h-[34px] w-[150px] rounded-[50%] bg-ink/20 [transform:translateX(-50%)_rotateX(75deg)]" />
      </div>
    </div>
  );
}
