"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { createOrder } from "@/services/order.service";
import { getToken } from "@/store/auth.store";

type OrderForm = {
  restaurant_id: string;
  items: string;
  total_price: string;
};

export default function CreateOrder() {
  const [data, setData] = useState<OrderForm>({
    restaurant_id: "",
    items: `[{"name":"Pizza","qty":2}]`,
    total_price: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = getToken();

      if (!token) {
        throw new Error("Please sign in before creating an order.");
      }

      const payload = {
        restaurant_id: Number(data.restaurant_id),
        items: JSON.parse(data.items),
        total_price: Number(data.total_price),
      };

      const response = await createOrder(payload, token);

      if (response?.error || response?.detail) {
        throw new Error(response.error || response.detail || "Unable to create order");
      }

      setSuccess("Order submitted successfully.");
      setData({
        restaurant_id: "",
        items: `[{"name":"Pizza","qty":2}]`,
        total_price: "",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unable to create order";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-[-4rem] top-16 h-64 w-64 rounded-full bg-[rgba(255,138,61,0.14)] blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[rgba(34,197,94,0.1)] blur-3xl" />
      </div>

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] w-full max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <aside className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(165deg,rgba(255,138,61,0.16),rgba(17,26,44,0.95))] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.32)] sm:p-8 lg:p-10">
          <div className="flex h-full flex-col justify-between gap-8">
            <div className="space-y-6">
              <Link href="/dashboard" className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-[rgba(248,239,227,0.7)]">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-base tracking-normal text-white">DB</span>
                DashBite
              </Link>

              <div className="space-y-4">
                <p className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[rgba(248,239,227,0.64)]">
                  New order
                </p>
                <h1 className="max-w-lg text-4xl font-black leading-tight text-white sm:text-5xl">
                  Create orders with a cleaner, more deliberate form.
                </h1>
                <p className="max-w-xl text-base leading-relaxed text-[rgba(248,239,227,0.72)]">
                  Enter the restaurant, add items as JSON, and submit a dispatch-ready payload without the old clutter.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Fast entry", "Minimal fields only"],
                ["Explicit items", "JSON payload for clarity"],
                ["Direct submit", "Token checked before send"],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[rgba(248,239,227,0.64)]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.26)] backdrop-blur-xl sm:p-8 lg:p-10">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(248,239,227,0.55)]">Create order</p>
            <h2 className="text-3xl font-bold text-white">Order form</h2>
            <p className="text-sm leading-relaxed text-[rgba(248,239,227,0.68)]">
              Keep the payload compact and readable while the UI handles the surrounding structure.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[rgba(248,239,227,0.82)]" htmlFor="restaurant_id">
                Restaurant ID
              </label>
              <input
                id="restaurant_id"
                type="number"
                min="1"
                placeholder="12"
                required
                value={data.restaurant_id}
                onChange={(e) => setData({ ...data, restaurant_id: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition placeholder:text-[rgba(248,239,227,0.35)] focus:border-[rgba(255,138,61,0.7)] focus:ring-4 focus:ring-[rgba(255,138,61,0.15)]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[rgba(248,239,227,0.82)]" htmlFor="items">
                Items JSON
              </label>
              <textarea
                id="items"
                rows={5}
                required
                placeholder='[{"name":"Pizza","qty":2}]'
                value={data.items}
                onChange={(e) => setData({ ...data, items: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 font-mono text-sm text-white outline-none transition placeholder:text-[rgba(248,239,227,0.35)] focus:border-[rgba(255,138,61,0.7)] focus:ring-4 focus:ring-[rgba(255,138,61,0.15)]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-[rgba(248,239,227,0.82)]" htmlFor="total_price">
                Total price
              </label>
              <input
                id="total_price"
                type="number"
                min="0"
                step="0.01"
                placeholder="24.50"
                required
                value={data.total_price}
                onChange={(e) => setData({ ...data, total_price: e.target.value })}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-white outline-none transition placeholder:text-[rgba(248,239,227,0.35)] focus:border-[rgba(255,138,61,0.7)] focus:ring-4 focus:ring-[rgba(255,138,61,0.15)]"
              />
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
              className="inline-flex w-full items-center justify-center rounded-2xl bg-[var(--accent)] px-5 py-3.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-[#ff9d57] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Submitting..." : "Create order"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}