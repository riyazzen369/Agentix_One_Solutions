import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "light";
const variants: Record<Variant, string> = {
  primary: "bg-ink text-lemon border-ink hover:bg-mint hover:text-ink",
  secondary: "bg-alabaster text-ink border-ink hover:bg-mint",
  light: "bg-lemon text-ink border-lemon hover:bg-mint hover:border-mint",
};

export const buttonClass = (variant: Variant = "primary", className?: string) =>
  cn(
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 px-5 py-3 font-display text-sm font-bold uppercase tracking-wide shadow-brut transition-[transform,box-shadow,background-color,color] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brut-lg active:translate-x-0.5 active:translate-y-0.5 active:shadow-brut-sm sm:text-[15px]",
    variant === "light" && "shadow-none hover:shadow-none active:shadow-none",
    variants[variant],
    className,
  );

type Props = { variant?: Variant; arrow?: boolean; children: ReactNode; className?: string };

export function Button({ href, variant, arrow, children, className, ...rest }: Props & { href: string } & Omit<ComponentProps<"a">, "href">) {
  const content = (
    <>
      {children}
      {arrow && <ArrowRight aria-hidden className="h-4 w-4 shrink-0" />}
    </>
  );
  const cls = buttonClass(variant, className);
  if (/^(https?:|mailto:|tel:)/.test(href))
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {content}
      </a>
    );
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}
