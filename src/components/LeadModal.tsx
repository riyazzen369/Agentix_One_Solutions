"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import { LEAD_HREF } from "@/content/site";

const ContactForm = dynamic(() => import("./ContactForm").then((m) => m.ContactForm), { ssr: false, loading: () => <p className="py-6 text-sm text-slate">Loading form…</p> });

const Ctx = createContext<(service?: string) => void>(() => {});
export const useLeadModal = () => useContext(Ctx);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [service, setService] = useState<string | undefined>();
  const [key, setKey] = useState(0);
  const [opened, setOpened] = useState(false);

  // Fetch the form code in the background once the page has settled, so the first tap feels instant.
  useEffect(() => {
    const t = window.setTimeout(() => void import("./ContactForm"), 4000);
    return () => window.clearTimeout(t);
  }, []);

  const open = useCallback((s?: string) => {
    setService(s);
    setKey((k) => k + 1);
    setOpened(true);
    ref.current?.showModal();
  }, []);

  return (
    <Ctx.Provider value={open}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="lead-title"
        onClick={(e) => e.target === ref.current && ref.current?.close()}
        className="lead-sheet m-auto w-[calc(100%-1.5rem)] max-w-xl rounded-brut border-2 border-ink bg-alabaster p-0 text-ink shadow-brut-lg max-sm:mb-0 max-sm:w-full max-sm:max-w-none max-sm:rounded-b-none max-sm:border-x-0 max-sm:border-b-0"
      >
        <div className="max-h-[90dvh] overflow-y-auto overscroll-contain p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-8">
          <span aria-hidden className="mx-auto -mt-1 mb-4 block h-1.5 w-12 rounded-full bg-ink/25 sm:hidden" />
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-slate">Free · No obligation</p>
              <h2 id="lead-title" className="mt-2 text-3xl uppercase sm:text-4xl">Get your free AI growth plan</h2>
            </div>
            <button type="button" onClick={() => ref.current?.close()} aria-label="Close form" className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border-2 border-ink bg-lemon hover:bg-mint">
              <X aria-hidden className="h-5 w-5" />
            </button>
          </div>
          {opened && <ContactForm key={key} defaultService={service} compact />}
        </div>
      </dialog>
    </Ctx.Provider>
  );
}

export function LeadButton({ children, className, service }: { children: ReactNode; className: string; service?: string }) {
  const open = useLeadModal();
  const pathname = usePathname();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/contact" || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    open(service);
  };
  return (
    <a href={LEAD_HREF} onClick={onClick} className={className} aria-haspopup="dialog">
      {children}
    </a>
  );
}
