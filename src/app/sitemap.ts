import type { MetadataRoute } from "next";
import { site, legalNav } from "@/content/site";

const routes = ["", "/services", "/ai-automations", "/pricing", "/process", "/sow-legal", "/contact", ...legalNav.map((l) => l.href)];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({ url: `${site.url}${r}`, lastModified: now, changeFrequency: "monthly", priority: r === "" ? 1 : r.startsWith("/services") || r === "/pricing" ? 0.9 : 0.6 }));
}
