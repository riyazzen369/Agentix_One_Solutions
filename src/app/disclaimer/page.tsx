import type { Metadata } from "next";
import { legalDocs } from "@/content/legal";
import { pageMeta } from "@/lib/seo";
import { LegalPageLayout } from "@/components/LegalPageLayout";

const doc = legalDocs["disclaimer"];
export const metadata: Metadata = pageMeta({ title: doc.title, description: doc.description, path: "/disclaimer" });

export default function Page() {
  return <LegalPageLayout title={doc.title} intro={doc.intro} sections={doc.sections} path="/disclaimer" />;
}
