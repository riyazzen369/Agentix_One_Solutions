import type { Metadata } from "next";
import { legalDocs } from "@/content/legal";
import { pageMeta } from "@/lib/seo";
import { LegalPageLayout } from "@/components/LegalPageLayout";

const doc = legalDocs["cookie-policy"];
export const metadata: Metadata = pageMeta({ title: doc.title, description: doc.description, path: "/cookie-policy" });

export default function Page() {
  return <LegalPageLayout title={doc.title} intro={doc.intro} sections={doc.sections} path="/cookie-policy" />;
}
