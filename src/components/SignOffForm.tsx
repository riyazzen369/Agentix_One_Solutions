"use client";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CheckCircle2, Copy, Loader2, Printer } from "lucide-react";
import { signoffSchema, type Signoff } from "@/lib/signoff-schema";
import { buttonClass } from "./Button";
import { whatsappHref } from "@/content/site";

type Receipt = { ref: string; signedAt: string; version: string; fullName: string };
type CheckName = "acceptMsa" | "acceptSow" | "acceptDpa" | "acceptTerms";

export function SignOffForm({ checks }: { checks: { name: CheckName; label: string }[] }) {
  const uid = useId();
  const [receipt, setReceipt] = useState<Receipt | null>(null);
  const [serverError, setServerError] = useState("");
  const [copied, setCopied] = useState(false);
  const off = false as unknown as true;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Signoff>({
    resolver: zodResolver(signoffSchema),
    defaultValues: { acceptMsa: off, acceptSow: off, acceptDpa: off, acceptTerms: off },
    mode: "onTouched",
  });

  useEffect(() => setValue("startedAt", String(Date.now())), [setValue]);

  const onSubmit = async (data: Signoff) => {
    setServerError("");
    try {
      const res = await fetch("/api/signoff", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = (await res.json().catch(() => ({}))) as { ref?: string; signedAt?: string; version?: string; error?: string };
      if (!res.ok || !json.ref) throw new Error(json.error || "Something went wrong. Please try again.");
      setReceipt({ ref: json.ref, signedAt: json.signedAt ?? new Date().toISOString(), version: json.version ?? "", fullName: data.fullName });
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

  const copyRef = async (ref: string) => {
    try {
      await navigator.clipboard.writeText(ref);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable: the reference is still visible to copy by hand */
    }
  };

  if (receipt) {
    const when = new Date(receipt.signedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "long", timeStyle: "short" });
    return (
      <div role="status" className="rounded-brut border-2 border-ink bg-mint p-6 sm:p-8">
        <CheckCircle2 aria-hidden className="h-10 w-10" />
        <h3 className="mt-3 text-3xl uppercase">Sign-off recorded</h3>
        <p className="mt-2">Thank you, {receipt.fullName}. Your acceptance has been recorded. Keep this receipt — copy the reference, take a screenshot or print it.</p>
        <dl className="mt-5 grid gap-3 rounded-lg border-2 border-ink bg-white p-4 text-[15px] sm:grid-cols-2">
          <div className="sm:col-span-2"><dt className="text-sm text-slate">Reference</dt><dd className="break-all font-mono text-lg font-semibold">{receipt.ref}</dd></div>
          <div><dt className="text-sm text-slate">Name (signature)</dt><dd className="font-semibold">{receipt.fullName}</dd></div>
          <div><dt className="text-sm text-slate">Signed on (IST)</dt><dd className="font-semibold">{when}</dd></div>
          <div className="sm:col-span-2"><dt className="text-sm text-slate">Agreement version</dt><dd className="font-semibold">{receipt.version}</dd></div>
        </dl>
        <div className="no-print mt-5 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={() => copyRef(receipt.ref)} className={buttonClass("primary")}>
            {copied ? <Check aria-hidden className="h-4 w-4" /> : <Copy aria-hidden className="h-4 w-4" />}
            {copied ? "Copied" : "Copy reference"}
          </button>
          <button type="button" onClick={() => window.print()} className={buttonClass("secondary")}><Printer aria-hidden className="h-4 w-4" />Print receipt</button>
          <a href={whatsappHref(`Hi, I signed the Agentix One Solution agreements. Reference: ${receipt.ref}`)} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary")}>Send on WhatsApp</a>
        </div>
      </div>
    );
  }

  const id = (n: string) => `${uid}-${n}`;
  const err = (n: keyof Signoff) => (errors[n] ? <p id={id(`${n}-err`)} className="mt-1.5 text-sm font-medium text-red-700">{errors[n]?.message as string}</p> : null);
  const aria = (n: keyof Signoff) => ({ "aria-invalid": errors[n] ? true : undefined, "aria-describedby": errors[n] ? id(`${n}-err`) : undefined });

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} aria-label="Client sign-off" className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={id("fullName")} className="mb-1.5 block text-sm font-semibold">Full name — your typed name is your signature <span aria-hidden className="text-slate">*</span></label>
          <input id={id("fullName")} autoComplete="name" className="field" {...aria("fullName")} {...register("fullName")} />
          {err("fullName")}
        </div>
        <div>
          <label htmlFor={id("whatsapp")} className="mb-1.5 block text-sm font-semibold">WhatsApp number <span aria-hidden className="text-slate">*</span></label>
          <input id={id("whatsapp")} type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" className="field" {...aria("whatsapp")} {...register("whatsapp")} />
          <p className="mt-1 text-xs text-slate">10 digits are saved as +91. Include your country code for other numbers.</p>
          {err("whatsapp")}
        </div>
        <div>
          <label htmlFor={id("addressOrPlace")} className="mb-1.5 block text-sm font-semibold">Business address or place <span aria-hidden className="text-slate">*</span></label>
          <input id={id("addressOrPlace")} autoComplete="street-address" placeholder="Shop / office address, or city / area" className="field" {...aria("addressOrPlace")} {...register("addressOrPlace")} />
          {err("addressOrPlace")}
        </div>
      </div>

      <fieldset className="space-y-3 rounded-lg border-2 border-ink bg-white p-4">
        <legend className="px-2 font-display text-sm font-bold uppercase tracking-wide">Your acceptance</legend>
        {checks.map((c) => (
          <div key={c.name}>
            <label className="flex min-h-[44px] cursor-pointer items-start gap-3 text-[15px]">
              <input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-ink" {...aria(c.name)} {...register(c.name)} />
              <span className={c.name === "acceptTerms" ? "font-semibold" : undefined}>{c.label}</span>
            </label>
            {err(c.name)}
          </div>
        ))}
      </fieldset>

      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input id={id("website")} tabIndex={-1} autoComplete="off" {...register("website")} />
        <input type="hidden" {...register("startedAt")} />
      </div>

      {serverError && <p role="alert" className="rounded-lg border-2 border-ink bg-alabaster p-3 text-sm font-medium">{serverError}</p>}

      <button type="submit" disabled={isSubmitting} className={buttonClass("primary", "w-full disabled:opacity-70")}>
        {isSubmitting ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : null}
        {isSubmitting ? "Recording…" : "Accept and sign"}
      </button>
      <p className="text-xs text-slate">Electronic acceptance on this page is as valid as a handwritten signature. Your details are used only to keep this record and are not shown to anyone else on this website.</p>
    </form>
  );
}
