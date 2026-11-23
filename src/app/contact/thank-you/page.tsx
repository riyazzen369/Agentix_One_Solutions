import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { Button } from "@/components/Button";
import { whatsappHref, SUCCESS_MSG } from "@/content/site";

export const metadata: Metadata = pageMeta({ title: "Request received", description: "Your AI Growth Plan request has been received.", path: "/contact/thank-you", noindex: true });

export default async function ThankYou({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const failed = (await searchParams).status === "error";
  return (
    <section className="dots border-b-2 border-ink">
      <div className="container flex min-h-[60vh] flex-col items-start justify-center py-20">
        <p className="eyebrow">{failed ? "Something went wrong" : "Request received"}</p>
        <h1 className="mt-4 max-w-3xl text-4xl uppercase sm:text-6xl">
          {failed ? "We couldn’t send your request." : "Thank you!"}
        </h1>
        <p className="mt-6 max-w-xl text-lg">
          {failed ? "Please check that every field is filled in correctly and try again, or message us on WhatsApp." : SUCCESS_MSG}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href={failed ? "/contact#lead-form" : "/"} arrow>{failed ? "Try again" : "Back to home"}</Button>
          <Button href={whatsappHref()} variant="secondary">Chat on WhatsApp</Button>
        </div>
      </div>
    </section>
  );
}
