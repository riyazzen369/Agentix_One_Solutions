"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { nav, site, whatsappHref } from "@/content/site";
import { buttonClass } from "./Button";
import { LeadButton } from "./LeadModal";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex min-h-[44px] items-center gap-2.5 font-display font-bold uppercase leading-none tracking-tight", className)} aria-label={`${site.name} — home`}>
      <span aria-hidden className="grid h-9 w-9 place-items-center rounded-lg border-2 border-current bg-lavender text-ink text-sm">A1</span>
      <span className="text-[15px] sm:text-base">
        Agentix One<span className="block text-[11px] tracking-[0.2em]">Solution</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dlg = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) dlg.current?.showModal();
    else dlg.current?.close();
  }, [open]);
  useEffect(() => setOpen(false), [pathname]);

  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-lemon/95 backdrop-blur-sm">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-lemon">
        Skip to content
      </a>
      <div className="container flex h-[72px] items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={active(n.href) ? "page" : undefined}
                  className={cn("rounded-lg px-3 py-2 text-[15px] font-semibold transition-colors hover:bg-mint", active(n.href) && "bg-ink text-lemon hover:text-ink")}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <LeadButton className={buttonClass("primary", "hidden min-h-[44px] px-4 py-2 sm:inline-flex")}>Book free call</LeadButton>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-12 w-12 place-items-center rounded-xl border-2 border-ink bg-alabaster shadow-brut-sm hover:bg-mint lg:hidden"
          >
            <Menu aria-hidden className="h-6 w-6" />
          </button>
        </div>
      </div>
      <span aria-hidden className="scroll-progress absolute -bottom-[2px] left-0 h-[3px] w-full origin-left bg-lavender" />

      <dialog
        id="mobile-menu"
        ref={dlg}
        onClose={() => setOpen(false)}
        aria-label="Menu"
        className="on-dark m-0 h-[100dvh] max-h-none w-screen max-w-none bg-ink p-0 text-lemon backdrop:bg-ink"
      >
        <div className="container flex h-full flex-col py-4">
          <div className="flex h-14 items-center justify-between">
            <Logo className="text-lemon" />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-12 w-12 place-items-center rounded-xl border-2 border-lemon hover:border-mint hover:text-mint">
              <X aria-hidden className="h-6 w-6" />
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-8 flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {[{ label: "Home", href: "/" }, ...nav].map((n, i) => (
                <li key={n.href} className="menu-item" style={{ animationDelay: `${60 + i * 40}ms` }}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === n.href ? "page" : undefined}
                    className="group flex min-h-[56px] items-center justify-between border-b border-lemon/20 font-display text-3xl font-bold uppercase tracking-tight hover:text-mint aria-[current=page]:text-mint sm:text-4xl"
                  >
                    {n.label}
                    <ArrowRight aria-hidden className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-3 pt-6 sm:grid-cols-2">
            <LeadButton className={buttonClass("light", "w-full")}>Book free call</LeadButton>
            <a href={whatsappHref()} className="inline-flex min-h-[48px] items-center justify-center rounded-xl border-2 border-lemon font-display text-sm font-bold uppercase tracking-wide hover:border-mint hover:text-mint">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
