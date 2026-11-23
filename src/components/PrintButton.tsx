"use client";
import { Printer } from "lucide-react";
import { buttonClass } from "./Button";

export function PrintButton({ label = "Print / save as PDF" }: { label?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className={buttonClass("secondary", "no-print")}>
      <Printer aria-hidden className="h-4 w-4" />
      {label}
    </button>
  );
}
