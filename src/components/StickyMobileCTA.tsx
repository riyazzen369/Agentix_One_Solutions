import { MessageCircle } from "lucide-react";
import { whatsappHref } from "@/content/site";
import { buttonClass } from "./Button";
import { LeadButton } from "./LeadModal";

export function StickyMobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-ink bg-lemon p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden">
      <div className="flex gap-2">
        <LeadButton className={buttonClass("primary", "flex-1 shadow-none hover:shadow-none")}>Book free call</LeadButton>
        <a href={whatsappHref()} aria-label="Chat on WhatsApp" className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border-2 border-ink bg-alabaster hover:bg-mint">
          <MessageCircle aria-hidden className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
