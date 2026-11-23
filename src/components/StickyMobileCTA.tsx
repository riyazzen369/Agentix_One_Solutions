"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/content/site";
import { buttonClass } from "./Button";
import { LeadButton } from "./LeadModal";
import { cn } from "@/lib/cn";

export function StickyMobileCTA() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector("footer");
      const nearFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight - 40 : false;
      setShow(!nearFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname === "/contact") return null;

  return (
    <div
      className={cn(
        "no-print fixed inset-x-0 bottom-0 z-30 border-t-2 border-ink bg-lemon p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-300 ease-out motion-reduce:transition-none sm:hidden",
        !show && "translate-y-full",
      )}
      aria-hidden={!show}
      inert={!show}
    >
      <div className="flex gap-2">
        <LeadButton className={buttonClass("primary", "flex-1 shadow-none hover:shadow-none")}>Book free call</LeadButton>
        <a href={whatsappHref()} aria-label="Chat on WhatsApp" className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 border-ink bg-alabaster hover:bg-mint">
          <MessageCircle aria-hidden className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
