// Editable prices: every price shown on the site has a stable id. The admin saves only the
// prices that differ from the defaults in src/content/*; pages apply them at render time.
import { appPlan, priceTables, websitePlans, type Plan, type PriceTable, type WebsitePlan } from "@/content/pricing";
import { automations, services, type Automation, type Service } from "@/content/site";

export type Overrides = Record<string, string>;
export type PriceItem = { id: string; group: string; label: string; def: string };

export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function priceItems(): PriceItem[] {
  const items: PriceItem[] = [];
  for (const p of websitePlans) {
    items.push({ id: `web:${slug(p.name)}:price`, group: "Website plans", label: `${p.name} — ${p.tag} (price)`, def: p.price });
    items.push({ id: `web:${slug(p.name)}:estimate`, group: "Website plans", label: `${p.name} — first-year total estimate`, def: p.estimate });
  }
  items.push({ id: "app:price", group: "App development", label: "App development — starting price", def: appPlan.price });
  for (const t of priceTables) for (const [name, price] of t.rows) items.push({ id: `table:${slug(t.title)}:${slug(name)}`, group: t.title, label: name, def: price });
  for (const s of services) items.push({ id: `svc:${s.slug}`, group: "Services page — starting prices", label: s.title, def: s.price });
  for (const a of automations) items.push({ id: `uc:${slug(a.title)}`, group: "AI Automations page — starting prices", label: a.title, def: a.price });
  return items;
}

export const applyWebsitePlans = (plans: WebsitePlan[], ov: Overrides): WebsitePlan[] =>
  plans.map((p) => ({ ...p, price: ov[`web:${slug(p.name)}:price`] ?? p.price, estimate: ov[`web:${slug(p.name)}:estimate`] ?? p.estimate }));

export const applyAppPlan = (p: Plan, ov: Overrides): Plan => ({ ...p, price: ov["app:price"] ?? p.price });

export const applyTables = (tables: PriceTable[], ov: Overrides): PriceTable[] =>
  tables.map((t) => ({ ...t, rows: t.rows.map(([a, b, c]) => [a, ov[`table:${slug(t.title)}:${slug(a)}`] ?? b, c] as [string, string, string]) }));

export const applyServices = (list: Service[], ov: Overrides): Service[] => list.map((s) => ({ ...s, price: ov[`svc:${s.slug}`] ?? s.price }));

export const applyAutomations = (list: Automation[], ov: Overrides): Automation[] => list.map((a) => ({ ...a, price: ov[`uc:${slug(a.title)}`] ?? a.price }));
