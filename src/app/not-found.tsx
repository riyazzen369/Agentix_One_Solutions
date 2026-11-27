import type { Metadata } from "next";
import { Button } from "@/components/Button";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="dots border-b-2 border-ink">
      <div className="container flex min-h-[70vh] flex-col items-start justify-center py-20">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 break-words text-5xl uppercase sm:text-8xl">This page isn’t automated yet.</h1>
        <p className="mt-6 max-w-xl text-lg text-ink/80">The page you’re looking for doesn’t exist or has moved. Let’s get you back on track.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" arrow>Back to home</Button>
          <Button href="/services" variant="secondary">View services</Button>
        </div>
      </div>
    </section>
  );
}
