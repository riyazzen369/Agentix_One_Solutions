import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  businessName: z.string().trim().min(2, "Please enter your business name").max(120),
  whatsapp: z
    .string()
    .trim()
    .regex(/^\+?[\d\s-]+$/, "Use digits only, e.g. +91 98XXXXXXXX")
    .refine((v) => {
      const d = v.replace(/\D/g, "").length;
      return d >= 10 && d <= 15;
    }, "Enter a valid number with 10–15 digits"),
  email: z.string().trim().email("Enter a valid email address").max(120),
  businessType: z.string().min(1, "Select your business type"),
  service: z.string().min(1, "Select a service"),
  callType: z.string().min(1, "Choose how you want the call"),
  // What the visitor has already paid for, per service (₹). Either list at least one, or tick "first time".
  previousSpend: z
    .array(z.object({ service: z.string().trim().min(1).max(120), amount: z.number({ message: "Enter an amount in ₹ (0 if unsure)" }).int().min(0, "Amount cannot be negative").max(100000000, "That amount looks too large") }))
    .max(20),
  firstTime: z.boolean(),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(2000),
  // spam protection
  website: z.string().max(0).optional(),
  startedAt: z.string().max(20).optional(),
});

export const leadSchemaChecked = leadSchema.refine((v) => v.firstTime || v.previousSpend.length > 0, {
  message: "Tick what you have paid for before, or tick “This is my first time”",
  path: ["previousSpend"],
});

export type Lead = z.infer<typeof leadSchema>;
