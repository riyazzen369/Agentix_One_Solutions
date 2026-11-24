import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { adminToken } from "@/lib/admin-auth";
import { sbConfigured } from "@/lib/supabase-rest";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Admin sign in", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminLogin() {
  if (await adminToken()) redirect("/admin");
  return (
    <section className="dots border-b-2 border-ink">
      <div className="container flex min-h-[70vh] items-center justify-center py-16">
        <div className="card w-full max-w-md p-6 sm:p-8">
          <p className="eyebrow text-slate">Private</p>
          <h1 className="mt-2 text-4xl uppercase">Admin sign in</h1>
          {sbConfigured() ? <div className="mt-6"><LoginForm /></div> : <p className="mt-6 rounded-lg border-2 border-ink bg-lemon p-3 text-sm font-semibold">Admin is not configured yet (database settings missing).</p>}
        </div>
      </div>
    </section>
  );
}
