import { sb } from "./supabase-rest";

export type SignoffRow = {
  ref: string | null;
  created_at: string;
  full_name: string;
  whatsapp: string;
  address_or_place: string;
  accepted_msa: boolean;
  accepted_sow: boolean;
  accepted_dpa: boolean;
  accepted_terms: boolean;
  method: string;
  agreement_version: string;
  agreement_hash: string;
};

const COLS = "ref,created_at,full_name,whatsapp,address_or_place,accepted_msa,accepted_sow,accepted_dpa,accepted_terms,method,agreement_version,agreement_hash";

/** Newest first, paged 1000 at a time (Supabase's default row cap). Returns null on error. */
export async function fetchSignoffs(token: string, max = 1000): Promise<SignoffRow[] | null> {
  const out: SignoffRow[] = [];
  for (let offset = 0; offset < max; offset += 1000) {
    const res = await sb(`/rest/v1/client_signoffs?select=${COLS}&order=created_at.desc&limit=1000&offset=${offset}`, { token }).catch(() => null);
    if (!res?.ok) return null;
    const page = (await res.json()) as SignoffRow[];
    out.push(...page);
    if (page.length < 1000) break;
  }
  return out.slice(0, max);
}

export const istTime = (iso: string) => new Date(new Date(iso).getTime() + 5.5 * 3600 * 1000).toISOString().replace("T", " ").slice(0, 19);

// Cells starting with = + - @ are prefixed with ' so spreadsheets never run them as formulas.
const cell = (v: unknown) => {
  let s = String(v ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export function signoffsToCsv(rows: SignoffRow[]) {
  const head = ["Reference", "Signed at (IST)", "Name", "WhatsApp", "Business address or place", "MSA accepted", "SOW accepted", "Data & Platform Compliance accepted", "Terms accepted", "Signature method", "Agreement version", "Agreement hash"];
  const yn = (b: boolean) => (b ? "Yes" : "No");
  const lines = rows.map((r) => [r.ref, istTime(r.created_at), r.full_name, r.whatsapp, r.address_or_place, yn(r.accepted_msa), yn(r.accepted_sow), yn(r.accepted_dpa), yn(r.accepted_terms), r.method, r.agreement_version, r.agreement_hash].map(cell).join(","));
  return `﻿${[head.map(cell).join(","), ...lines].join("\r\n")}\r\n`;
}
