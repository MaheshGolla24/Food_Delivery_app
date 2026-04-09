"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { login } from "@/services/auth.service";
import { setToken } from "@/store/auth.store";

type LoginForm = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login(form);

      if (!res?.access) {
        throw new Error(res?.detail || res?.error || "Login failed");
      }

      setToken(res.access);
      router.push("/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-[-5rem] top-24 h-72 w-72 rounded-full bg-[rgba(255,138,61,0.16)] blur-3xl" />
        <div className="absolute right-[-3rem] top-0 h-64 w-64 rounded-full bg-[rgba(34,197,94,0.1)] blur-3xl" />
      </div>

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
        <aside className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(165deg,rgba(255,138,61,0.18),rgba(17,26,44,0.95))] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.32)] sm:p-8 lg:p-10">
          <div className="absolute right-0 top-0 h-56 w-56 translate-x-16 -translate-y-16 rounded-full bg-white/10 blur-3xl" aria-hidden />
          <div className="relative flex h-full flex-col justify-between gap-8">
            <div className="space-y-6">
              <Link href="/" className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-[rgba(248,239,227,0.7)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-base tracking-normal text-white">DB</span>
                DashBite
              </Link>

              <div className="space-y-4">
                <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[rgba(248,239,227,0.6)]">
                  Welcome back
                </p>
                <h1 className="max-w-lg text-4xl font-black leading-tight text-white sm:text-5xl">
                  Sign in and jump straight back into your orders.
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-[rgba(248,239,227,0.72)]">
                  Use the same modern shell across customer, rider, and admin flows. The login screen now feels like part of the product, not a separate form.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Secure", "Token-based session"],
                ["Fast", "One-screen access"],
                ["Focused", "No clutter, just action"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[rgba(248,239,227,0.64)]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <form onSubmit={handleLogin} className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.26)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(248,239,227,0.55)]">Customer login</p>
            <h2 className="text-3xl font-bold text-white">Sign in</h2>
            <p className="text-sm leading-relaxed text-[rgba(248,239,227,0.68)]">
              Access your dashboard, track order flow, and continue where you left off.
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
                placeholder="Your username"
                autoComplete="username"
                required
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
                placeholder="Your password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition placeholder:text-[rgba(248,239,227,0.35)] focus:border-[rgba(255,138,61,0.7)] focus:ring-4 focus:ring-[rgba(255,138,61,0.15)]"
              />
            </div>

            {error ? (
              <p className="rounded-2xl border border-[rgba(239,68,68,0.35)] bg-[rgba(239,68,68,0.1)] px-4 py-3 text-sm font-medium text-[#fecaca]">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-[#ff9d57] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm text-[rgba(248,239,227,0.72)]">
            <span>Need a new account?</span>
            <Link href="/register" className="font-semibold text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white">
              Register now
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}