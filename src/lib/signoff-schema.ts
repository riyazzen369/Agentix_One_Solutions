import { z } from "zod";

export const signoffSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\+?[\d\s-]+$/, "Use digits only, e.g. 98765 43210")
    .refine((v) => {
      const d = v.replace(/\D/g, "").length;
      return d >= 10 && d <= 15;
    }, "Enter a valid number (10 digits, or 10–15 with country code)"),
  addressOrPlace: z.string().trim().min(3, "Enter your business address or place (at least 3 characters)").max(300),
  acceptMsa: z.literal(true, { message: "Tick to accept the Master Service Agreement" }),
  acceptSow: z.literal(true, { message: "Tick to accept the Statement of Work" }),
  acceptDpa: z.literal(true, { message: "Tick to accept the Data & Platform Compliance Acknowledgement" }),
  acceptTerms: z.literal(true, { message: "Tick to accept the terms and sign" }),
  // spam protection
  website: z.string().max(0).optional(),
  startedAt: z.string().max(20).optional(),
});

export type Signoff = z.infer<typeof signoffSchema>;

// 10 digits -> +91XXXXXXXXXX; 11–15 digits are treated as already including a country code.
export function normalizePhone(input: string) {
  const d = input.replace(/\D/g, "");
  return d.length === 10 ? `+91${d}` : `+${d}`;
}
