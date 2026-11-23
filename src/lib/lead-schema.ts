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
  budget: z.string().min(1, "Select a budget range"),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(2000),
  // spam protection
  website: z.string().max(0).optional(),
  startedAt: z.string().max(20).optional(),
});

export type Lead = z.infer<typeof leadSchema>;
