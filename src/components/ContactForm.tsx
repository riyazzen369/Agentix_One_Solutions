"use client";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { leadSchemaChecked, type Lead } from "@/lib/lead-schema";
import { formOptions, site, whatsappHref, SUCCESS_MSG } from "@/content/site";
import { buttonClass } from "./Button";
import { cn } from "@/lib/cn";


type FieldName = Exclude<keyof Lead, "website" | "startedAt" | "previousSpend" | "firstTime">;

const digits = (v: string) => v.replace(/\D/g, "").slice(0, 9);
const money = (v: string) => (v ? Number(v).toLocaleString("en-IN") : "");

export function ContactForm({ defaultService, compact }: { defaultService?: string; compact?: boolean }) {
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  // Previous spend: service -> amount typed (digits only). Order follows the services list.
  const [spend, setSpend] = useState<Record<string, string>>({});
  const [firstTime, setFirstTime] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    getFieldState,
    formState: { errors, isSubmitting },
  } = useForm<Lead>({ resolver: zodResolver(leadSchemaChecked), defaultValues: { service: defaultService ?? "", callType: "", previousSpend: [], firstTime: false }, mode: "onTouched" });

  useEffect(() => setValue("startedAt", String(Date.now())), [setValue]);

  const syncSpend = (nextSpend: Record<string, string>, nextFirst: boolean) => {
    setSpend(nextSpend);
    setFirstTime(nextFirst);
    setValue(
      "previousSpend",
      formOptions.pastServices.filter((n) => n in nextSpend).map((service) => ({ service, amount: nextSpend[service] === "" ? NaN : Number(nextSpend[service]) })),
    );
    setValue("firstTime", nextFirst);
    if (getFieldState("previousSpend").isTouched || getFieldState("previousSpend").error) void trigger("previousSpend");
  };
  const toggleService = (name: string, on: boolean) => {
    const next = { ...spend };
    if (on) next[name] = next[name] ?? "";
    else delete next[name];
    syncSpend(next, on ? false : firstTime);
  };
  const total = Object.values(spend).reduce((t, v) => t + (Number(v) || 0), 0);

  const onSubmit = async (data: Lead) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "Something went wrong. Please try again.");
      setStatus("success");
      reset();
      setSpend({});
      setFirstTime(false);
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
        {options.map((o, i) => (
          <option key={`${i}-${o}`}>{o}</option>
        ))}
      </select>
      {err(name)}
    </div>
  );
  const input = (name: FieldName, text: string, type = "text", auto?: string, placeholder?: string) => (
    <div>
      {label(name, text)}
      <input type={type} autoComplete={auto} placeholder={placeholder} inputMode={type === "tel" ? "tel" : type === "email" ? "email" : undefined} enterKeyHint="next" className="field" {...fieldProps(name)} />
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
        {select("callType", "Preferred call type", formOptions.callTypes)}
        <fieldset className={cn("min-w-0", !compact && "sm:col-span-2")} aria-describedby={id("spend-help")}>
          <legend className="mb-1 block text-sm font-semibold">
            What have you paid for before? <span aria-hidden className="text-slate">*</span>
          </legend>
          <p id={id("spend-help")} className="mb-3 text-xs text-slate">
            Tick each service you already spent money on, then add roughly how much (₹). Approximate is fine; enter 0 if you don’t remember.
          </p>
          <ul className="space-y-2">
            {formOptions.pastServices.map((name, i) => {
              const on = name in spend;
              const amountErr = errors.previousSpend?.[formOptions.pastServices.filter((n) => n in spend).indexOf(name)]?.amount?.message;
              const aid = id(`amount-${i}`);
              return (
                <li key={`${i}-${name}`} className={cn("rounded-lg border-2 border-ink bg-white", on && "bg-lemon/40")}>
                  <label className="flex min-h-[44px] cursor-pointer items-center gap-3 px-3 py-2 text-[15px] font-medium">
                    <input type="checkbox" name="used" value={name} checked={on} onChange={(e) => toggleService(name, e.target.checked)} className="h-5 w-5 shrink-0 accent-ink" />
                    {name}
                  </label>
                  {on && (
                    <div className="px-3 pb-3">
                      <label htmlFor={aid} className="mb-1 block text-xs font-semibold text-slate">
                        Amount spent on {name} (₹)
                      </label>
                      <div className="flex items-center gap-2">
                        <span aria-hidden className="font-display text-lg font-bold">₹</span>
                        <input
                          id={aid}
                          name={`amount:${name}`}
                          inputMode="numeric"
                          autoComplete="off"
                          enterKeyHint="next"
                          placeholder="e.g. 25,000"
                          value={money(spend[name] ?? "")}
                          onChange={(e) => syncSpend({ ...spend, [name]: digits(e.target.value) }, false)}
                          aria-invalid={amountErr ? true : undefined}
                          aria-describedby={amountErr ? `${aid}-err` : undefined}
                          className="field"
                        />
                      </div>
                      {amountErr && (
                        <p id={`${aid}-err`} className="mt-1.5 text-sm font-medium text-red-700">
                          {amountErr}
                        </p>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
            <li className={cn("rounded-lg border-2 border-ink bg-white", firstTime && "bg-mint/40")}>
              <label className="flex min-h-[44px] cursor-pointer items-center gap-3 px-3 py-2 text-[15px] font-medium">
                <input type="checkbox" name="firstTime" checked={firstTime} onChange={(e) => syncSpend(e.target.checked ? {} : spend, e.target.checked)} className="h-5 w-5 shrink-0 accent-ink" />
                This is my first time — I haven’t paid for these before
              </label>
            </li>
          </ul>
          {Object.keys(spend).length > 0 && (
            <p className="mt-3 text-sm font-semibold" aria-live="polite">
              Total spent so far: ₹{total.toLocaleString("en-IN")}
            </p>
          )}
          {(errors.previousSpend?.message || errors.previousSpend?.root?.message) && (
            <p role="alert" className="mt-1.5 text-sm font-medium text-red-700">
              {errors.previousSpend?.message ?? errors.previousSpend?.root?.message}
            </p>
          )}
        </fieldset>
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
