import { Quote } from "lucide-react";

export function TestimonialCard({ quote, name, business }: { quote: string; name: string; business: string }) {
  return (
    <figure data-reveal className="card card-hover flex flex-col p-6">
      <Quote aria-hidden className="h-8 w-8 text-lavender" strokeWidth={2.5} />
      <blockquote className="mt-4 flex-1 font-display text-xl font-semibold leading-snug">“{quote}”</blockquote>
      <figcaption className="mt-6 border-t-2 border-ink pt-4 text-sm">
        <span className="font-bold">— {name}</span>, <span className="text-slate">{business}</span>
      </figcaption>
    </figure>
  );
}
