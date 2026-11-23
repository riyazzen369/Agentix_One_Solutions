"use client";
import { createContext, useCallback, useContext, useRef, useState, type ReactNode, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { LEAD_HREF } from "@/content/site";

const Ctx = createContext<(service?: string) => void>(() => {});
export const useLeadModal = () => useContext(Ctx);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [service, setService] = useState<string | undefined>();
  const [key, setKey] = useState(0);

  const open = useCallback((s?: string) => {
    setService(s);
    setKey((k) => k + 1);
    ref.current?.showModal();
  }, []);

  return (
    <Ctx.Provider value={open}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="lead-title"
        onClick={(e) => e.target === ref.current && ref.current?.close()}
        className="m-auto w-[calc(100%-1.5rem)] max-w-xl rounded-brut border-2 border-ink bg-alabaster p-0 text-ink shadow-brut-lg"
      >
        <div className="max-h-[88dvh] overflow-y-auto p-5 sm:p-8">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="eyebrow text-slate">Free · No obligation</p>
              <h2 id="lead-title" className="mt-2 text-3xl uppercase sm:text-4xl">Get your free AI growth plan</h2>
            </div>
            <button type="button" onClick={() => ref.current?.close()} aria-label="Close form" className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border-2 border-ink bg-lemon hover:bg-mint">
              <X aria-hidden className="h-5 w-5" />
            </button>
          </div>
          <ContactForm key={key} defaultService={service} compact />
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
