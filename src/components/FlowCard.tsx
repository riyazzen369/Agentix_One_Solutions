import type { Flow } from "@/content/site";

export function FlowCard({ flow, index }: { flow: Flow; index: number }) {
  return (
    <article data-reveal className="card card-hover p-6">
      <p className="eyebrow text-slate">Flow {String(index + 1).padStart(2, "0")}</p>
      <h3 className="mt-2 text-2xl">{flow.title}</h3>
      <ol className="mt-6" aria-label={`${flow.title} automation steps`}>
        {flow.steps.map((s, i) => (
          <li key={s} className="relative flex items-start gap-4 pb-6 last:pb-0">
            {i < flow.steps.length - 1 && <span aria-hidden className="flow-line anim-flow absolute left-[13px] top-7 h-[calc(100%-1.25rem)] w-1" />}
            <span
              aria-hidden
              className="anim-node relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 border-ink bg-lavender font-display text-xs font-bold"
              style={{ animationDelay: `${i * 1}s` }}
            >
              {i + 1}
            </span>
            <span className="pt-0.5 font-medium leading-snug">{s}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}
