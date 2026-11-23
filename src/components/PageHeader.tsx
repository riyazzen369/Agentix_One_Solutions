import type { ReactNode } from "react";
import { SectionHeading } from "./SectionHeading";

export function PageHeader({ eyebrow, title, text, children }: { eyebrow: string; title: ReactNode; text?: ReactNode; children?: ReactNode }) {
  return (
    <section className="dots border-b-2 border-ink">
      <div className="container py-16 sm:py-24">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} text={text} />
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
