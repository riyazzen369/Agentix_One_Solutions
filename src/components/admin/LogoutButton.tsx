"use client";
import { LogOut } from "lucide-react";
import { buttonClass } from "../Button";

export function LogoutButton() {
  return (
    <button
      type="button"
      className={buttonClass("secondary", "min-h-[44px] px-4 py-2")}
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/login";
      }}
    >
      <LogOut aria-hidden className="h-4 w-4" />
      Sign out
    </button>
  );
}
