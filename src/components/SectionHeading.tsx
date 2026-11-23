import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { id?: string; eyebrow?: string; title: ReactNode; text?: ReactNode; as?: "h1" | "h2"; align?: "left" | "center"; className?: string };

export function SectionHeading({ id, eyebrow, title, text, as: H = "h2", align = "left", className }: Props) {
  return (
    <div data-reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <H id={id} className={cn(H === "h1" ? "text-[clamp(2.5rem,5.5vw+0.75rem,4.75rem)]" : "text-[clamp(2.1rem,4vw+0.9rem,3.75rem)]", "uppercase")}>{title}</H>
      {text && <p className="mt-5 max-w-2xl text-lg text-ink/80 sm:text-xl [text-wrap:pretty]" style={align === "center" ? { marginInline: "auto" } : undefined}>{text}</p>}
    </div>
  );
}
