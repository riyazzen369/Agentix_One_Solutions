"use client";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { leadSchema, type Lead } from "@/lib/lead-schema";
import { formOptions, site, whatsappHref, SUCCESS_MSG } from "@/content/site";
import { buttonClass } from "./Button";
import { cn } from "@/lib/cn";


type FieldName = Exclude<keyof Lead, "website" | "startedAt">;

export function ContactForm({ defaultService, compact }: { defaultService?: string; compact?: boolean }) {
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Lead>({ resolver: zodResolver(leadSchema), defaultValues: { service: defaultService ?? "" }, mode: "onTouched" });

  useEffect(() => setValue("startedAt", String(Date.now())), [setValue]);

  const onSubmit = async (data: Lead) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setStatus("success");
      reset();
    } catch (e) {
      setStatus("error");
      setServerError(e instanceof Error ? e.message : "Something went wrong.");
    }
  };

  if (status === "success")
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-brut border-2 border-ink bg-mint p-6">
        <CheckCircle2 aria-hidden className="h-10 w-10" />
        <p className="font-display text-xl font-bold leading-snug">{SUCCESS_MSG}</p>
        <button type="button" className="link-u font-semibold" onClick={() => setStatus("idle")}>
          Send another request
        </button>
      </div>
    );

  const id = (n: string) => `${uid}-${n}`;
  const fieldProps = (name: FieldName) => ({
    id: id(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? id(`${name}-err`) : undefined,
    ...register(name),
  });
  const label = (name: FieldName, children: string) => (
    <label htmlFor={id(name)} className="mb-1.5 block text-sm font-semibold">
      {children} <span aria-hidden className="text-slate">*</span>
    </label>
  );
  const err = (name: FieldName) =>
    errors[name] ? (
      <p id={id(`${name}-err`)} className="mt-1.5 text-sm font-medium text-red-700">
        {errors[name]?.message}
      </p>
    ) : null;
  const select = (name: FieldName, text: string, options: string[]) => (
    <div>
      {label(name, text)}
      <select className="field appearance-auto" {...fieldProps(name)}>
        <option value="">Select…</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {err(name)}
    </div>
  );
  const input = (name: FieldName, text: string, type = "text", auto?: string, placeholder?: string) => (
    <div>
      {label(name, text)}
      <input type={type} autoComplete={auto} placeholder={placeholder} className="field" {...fieldProps(name)} />
      {err(name)}
    </div>
  );

  return (
    <form action="/api/contact" method="post" noValidate onSubmit={handleSubmit(onSubmit)} aria-label="Request a free AI growth plan" className="space-y-4">
      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        {input("name", "Name", "text", "name")}
        {input("businessName", "Business name", "text", "organization")}
        {input("whatsapp", "WhatsApp number", "tel", "tel", "+91 98XXXXXXXX")}
        {input("email", "Email", "email", "email")}
        {select("businessType", "Business type", formOptions.businessTypes)}
        {select("service", "Service needed", formOptions.services)}
        <div className={cn(!compact && "sm:col-span-2")}>
          {select("budget", "Monthly budget range", formOptions.budgets)}
        </div>
      </div>
      <div>
        {label("message", "Message")}
        <textarea rows={4} placeholder="What do you want to automate, build, or grow?" className="field min-h-[120px]" {...fieldProps("message")} />
        {err("message")}
      </div>

      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("website")}>Leave this field empty</label>
        <input id={id("website")} tabIndex={-1} autoComplete="off" {...register("website")} />
        <input type="hidden" {...register("startedAt")} />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-lg border-2 border-ink bg-alabaster p-3 text-sm font-medium">
          {serverError}{" "}
          {site.contact.whatsapp && (
            <a className="link-u" href={whatsappHref()} target="_blank" rel="noopener noreferrer">
              Message us on WhatsApp instead.
            </a>
          )}
        </p>
      )}

      <button type="submit" disabled={isSubmitting} className={buttonClass("primary", "w-full disabled:opacity-70")}>
        {isSubmitting ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : null}
        {isSubmitting ? "Sending…" : "Get my free AI growth plan"}
      </button>
      <p className="text-xs text-slate">
        By submitting, you agree to our <a className="link-u" href="/privacy-policy">Privacy Policy</a>. We never sell your data.
      </p>
    </form>
  );
}
