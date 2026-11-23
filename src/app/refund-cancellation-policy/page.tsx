import type { Metadata } from "next";
import { legalDocs } from "@/content/legal";
import { pageMeta } from "@/lib/seo";
import { LegalPageLayout } from "@/components/LegalPageLayout";

const doc = legalDocs["refund-cancellation-policy"];
export const metadata: Metadata = pageMeta({ title: doc.title, description: doc.description, path: "/refund-cancellation-policy" });

export default function Page() {
  return <LegalPageLayout title={doc.title} intro={doc.intro} sections={doc.sections} path="/refund-cancellation-policy" />;
}
