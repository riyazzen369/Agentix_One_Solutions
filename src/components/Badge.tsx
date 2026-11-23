import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const tones = { ink: "bg-ink text-lemon", lavender: "bg-lavender text-ink", mint: "bg-mint text-ink", paper: "bg-alabaster text-ink" };

export function Badge({ children, tone = "paper", className }: { children: ReactNode; tone?: keyof typeof tones; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full border-2 border-ink px-3 py-1 font-display text-[11px] font-bold uppercase tracking-[0.14em]", tones[tone], className)}>
      {children}
    </span>
  );
}
