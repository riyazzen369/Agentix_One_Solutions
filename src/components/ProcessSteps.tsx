import { processSteps } from "@/content/site";
import { cn } from "@/lib/cn";

export function ProcessSteps({ className, detailed }: { className?: string; detailed?: boolean }) {
  return (
    <ol className={cn("grid gap-5 md:grid-cols-2 lg:grid-cols-5", className)}>
      {processSteps.map((s, i) => (
        <li key={s.title} data-reveal className="card card-hover relative flex flex-col p-6">
          <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink bg-lemon font-display text-lg font-bold">{i + 1}</span>
          <h3 className="mt-5 text-xl">{s.title}</h3>
          <p className="mt-2 text-[15px] text-ink/75">{s.text}</p>
          {detailed && (
            <ul className="mt-4 space-y-1.5 border-t-2 border-ink pt-4 text-sm">
              {s.detail.map((d, i) => <li key={`${i}-${d}`} className="flex gap-2"><span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />{d}</li>)}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
