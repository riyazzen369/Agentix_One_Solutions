import { whatsappHref } from "@/content/site";
import { Button, buttonClass } from "./Button";
import { LeadButton } from "./LeadModal";

type Props = { title?: string; text?: string; primary?: string };

export function CTASection({
  title = "Let’s build your AI-powered business",
  text = "Tell us what you want to automate, build, or grow. We’ll send you a practical AI growth plan.",
  primary = "Book free AI strategy call",
}: Props) {
  return (
    <section aria-labelledby="cta-title" className="container py-16 sm:py-24">
      <div data-reveal className="on-dark relative overflow-hidden rounded-[22px] border-2 border-ink bg-ink p-8 text-lemon shadow-brut-lg sm:p-14">
        <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 rotate-12 rounded-[32px] border-2 border-lemon bg-lavender sm:h-64 sm:w-64" />
        <div className="relative max-w-2xl">
          <h2 id="cta-title" className="text-4xl uppercase sm:text-6xl">{title}</h2>
          <p className="mt-5 text-lg text-lemon/85 sm:text-xl">{text}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LeadButton className={buttonClass("light")}>{primary}</LeadButton>
            <Button href={whatsappHref()} variant="secondary" className="border-lemon bg-transparent text-lemon shadow-none hover:shadow-none hover:text-ink">
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
