import { z } from "zod";

export const signoffSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(120),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\+?[\d\s-]+$/, "Use digits only, e.g. +91 98XXXXXXXX")
    .refine((v) => {
      const d = v.replace(/\D/g, "").length;
      return d >= 10 && d <= 15;
    }, "Enter a valid number with 10–15 digits"),
  addressOrPlace: z.string().trim().min(2, "Enter your business address or place").max(300),
  acceptMsa: z.literal(true, { message: "Tick to accept the Master Service Agreement" }),
  acceptSow: z.literal(true, { message: "Tick to accept the SOW terms" }),
  acceptData: z.literal(true, { message: "Tick to accept the Data & Platform Compliance Acknowledgement" }),
  // spam protection
  website: z.string().max(0).optional(),
  startedAt: z.string().max(20).optional(),
});

export type Signoff = z.infer<typeof signoffSchema>;
