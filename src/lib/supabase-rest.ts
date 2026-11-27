// Minimal Supabase REST helper (no SDK). Server-only: reads secrets from env.
const base = () => (process.env.SUPABASE_URL || "").replace(/\/$/, "");
const apiKey = () => process.env.SUPABASE_PUBLISHABLE_KEY || "";

export const sbConfigured = () => !!(base() && apiKey());

type Opts = {
  token?: string; // signed-in user's access token; omit for public (anon) access
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  next?: { revalidate?: number | false; tags?: string[] };
  timeoutMs?: number; // never let a slow or paused database hold a page or API request hostage
};

export async function sb(path: string, o: Opts = {}) {
  const headers: Record<string, string> = { apikey: apiKey(), ...(o.headers ?? {}) };
  if (o.token) headers.Authorization = `Bearer ${o.token}`;
  if (o.body !== undefined) headers["Content-Type"] = "application/json";
  return fetch(`${base()}${path}`, {
    method: o.method ?? "GET",
    headers,
    body: o.body !== undefined ? JSON.stringify(o.body) : undefined,
    signal: AbortSignal.timeout(o.timeoutMs ?? 6000),
    ...(o.next ? { next: o.next } : { cache: "no-store" as const }),
  });
}
