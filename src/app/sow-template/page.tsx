import type { Metadata } from "next";
import { sowTemplate } from "@/content/legal";
import { pageMeta } from "@/lib/seo";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = pageMeta({
  title: "Client Agreement / SOW Template",
  description: "A general Statement of Work template covering scope, deliverables, milestones, payments, IP, confidentiality and change requests. Not legal advice.",
  path: "/sow-template",
});

export default function SowTemplatePage() {
  return (
    <LegalPageLayout
      title="Client Agreement / SOW Template"
      intro="A general template showing how our Statements of Work are structured. Replace bracketed fields for each project. This is template documentation, not legal advice."
      sections={sowTemplate}
      path="/sow-template"
    />
  );
}
