"use client";
import { useEffect } from "react";
import { buttonClass } from "@/components/Button";
import { whatsappHref } from "@/content/site";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <section className="dots border-b-2 border-ink">
      <div className="container flex min-h-[60vh] flex-col items-start justify-center py-20">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-4 text-5xl uppercase sm:text-7xl">That didn’t work.</h1>
        <p className="mt-6 max-w-xl text-lg text-ink/80">An unexpected error stopped this page from loading. Please try again, or message us on WhatsApp and we’ll help.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={reset} className={buttonClass("primary")}>Try again</button>
          <a href={whatsappHref()} className={buttonClass("secondary")}>Chat on WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
