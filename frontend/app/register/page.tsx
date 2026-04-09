"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { login, register } from "@/services/auth.service";
import { setToken } from "@/store/auth.store";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", password: "", role: "customer" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const getErrorMessage = (payload: unknown) => {
    if (!payload || typeof payload !== "object") {
      return "Registration failed";
    }

    const data = payload as Record<string, unknown>;
    const status = typeof data.status === "number" ? data.status : undefined;
    const values = [data.error, data.detail, data.message].filter((value): value is string => typeof value === "string");

    if (values.length > 0) {
      return values[0];
    }

    const fieldErrors = ["username", "password", "role", "non_field_errors"]
      .flatMap((field) => {
        const value = data[field];
        if (Array.isArray(value)) {
          return value.filter((item): item is string => typeof item === "string");
        }

        return [];
      })
      .filter(Boolean);

    if (fieldErrors.length > 0) {
      return fieldErrors[0];
    }

    if (status === 503) {
      return "Auth service is unavailable. Please start the backend and try again.";
    }

    return "Registration failed";
  };

  const hasRegistrationErrors = (payload: unknown) => {
    if (!payload || typeof payload !== "object") {
      return false;
    }

    const data = payload as Record<string, unknown>;
    return ["error", "detail", "username", "password", "role", "non_field_errors"].some((field) => {
      const value = data[field];
      return typeof value === "string" || (Array.isArray(value) && value.length > 0);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await register(form);

      if (hasRegistrationErrors(response)) {
        throw new Error(getErrorMessage(response));
      }

      const loginResponse = await login({ username: form.username, password: form.password });

      if (!loginResponse?.access) {
        throw new Error("Account created, but automatic sign-in failed. Please sign in manually.");
      }

      setToken(loginResponse.access);
      setSuccess("Account created. Redirecting to your dashboard...");
      setForm({ username: "", password: "", role: "customer" });
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-0 top-20 h-72 w-72 rounded-full bg-[rgba(34,197,94,0.14)] blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[rgba(255,138,61,0.15)] blur-3xl" />
      </div>

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <aside className="hidden overflow-hidden rounded-4xl border border-white/10 bg-[linear-gradient(165deg,rgba(34,197,94,0.16),rgba(17,26,44,0.95))] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.3)] sm:p-8 lg:block lg:p-10">
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-[rgba(248,239,227,0.72)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-base tracking-normal text-white">DB</span>
                DashBite
              </Link>

              <div className="space-y-4">
                <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[rgba(248,239,227,0.64)]">
                  Create access
                </p>
                <h1 className="max-w-lg text-4xl font-black leading-tight text-white sm:text-5xl">
                  Set up a profile for customers, riders, or admins.
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-[rgba(248,239,227,0.72)]">
                  The registration flow now feels intentional and product-grade, with better spacing, contrast, and role selection.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Customer", "Browse and place orders"],
                ["Rider", "Track and deliver meals"],
                ["Admin", "Manage kitchens and orders"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[rgba(248,239,227,0.64)]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="rounded-4xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.26)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(248,239,227,0.55)]">New account</p>
            <h2 className="text-3xl font-bold text-white">Register</h2>
            <p className="text-sm leading-relaxed text-[rgba(248,239,227,0.68)]">
              Create access in a few steps and move straight into the platform.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[rgba(248,239,227,0.82)]" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                required
                placeholder="Choose a username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition placeholder:text-[rgba(248,239,227,0.35)] focus:border-[rgba(255,138,61,0.7)] focus:ring-4 focus:ring-[rgba(255,138,61,0.15)]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[rgba(248,239,227,0.82)]" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="Create a strong password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition placeholder:text-[rgba(248,239,227,0.35)] focus:border-[rgba(255,138,61,0.7)] focus:ring-4 focus:ring-[rgba(255,138,61,0.15)]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[rgba(248,239,227,0.82)]" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition focus:border-[rgba(255,138,61,0.7)] focus:ring-4 focus:ring-[rgba(255,138,61,0.15)]"
              >
                <option value="customer">Customer</option>
                <option value="restaurant">Restaurant</option>
                <option value="rider">Rider</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {error ? (
              <p className="rounded-2xl border border-[rgba(239,68,68,0.35)] bg-[rgba(239,68,68,0.1)] px-4 py-3 text-sm font-medium text-[#fecaca]">
                {error}
              </p>
            ) : null}

            {success ? (
              <p className="rounded-2xl border border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.1)] px-4 py-3 text-sm font-medium text-[#bbf7d0]">
                {success}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-(--accent) px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-[#ff9d57] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </div>

          <p className="mt-6 text-sm text-[rgba(248,239,227,0.72)]">
            Already registered?{" "}
            <Link href="/login" className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white">
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

