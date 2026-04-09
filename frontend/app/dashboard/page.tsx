import Link from "next/link";

const metrics = [
  { label: "Active orders", value: "18" },
  { label: "Avg delivery", value: "24 min" },
  { label: "Available riders", value: "42" },
];

const actions = [
  {
    title: "Create an order",
    detail: "Open the order entry form and submit a new request in a few focused steps.",
    href: "/orders/create",
  },
  {
    title: "Register a profile",
    detail: "Create a customer, rider, or admin profile with the improved onboarding screen.",
    href: "/register",
  },
  {
    title: "Return to home",
    detail: "See the updated landing page and navigate to the rest of the app from there.",
    href: "/",
  },
];

export default function DashboardPage() {
  return (
    <main className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-[rgba(255,138,61,0.14)] blur-3xl" />
        <div className="absolute right-0 top-1/2 h-80 w-80 rounded-full bg-[rgba(34,197,94,0.1)] blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl flex-col gap-8 rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-[0_35px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(248,239,227,0.55)]">DashBite dashboard</p>
            <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">Control center</h1>
          </div>
          <Link href="/login" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
            Sign in again
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {metrics.map((metric) => (
            <article key={metric.label} className="rounded-3xl border border-white/10 bg-slate-950/35 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.2)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[rgba(248,239,227,0.5)]">{metric.label}</p>
              <p className="mt-3 text-3xl font-black text-white">{metric.value}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,138,61,0.16),rgba(17,26,44,0.92))] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(248,239,227,0.55)]">Today</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Dispatch-ready overview</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[rgba(248,239,227,0.7)]">
              This dashboard is a lightweight landing point after login, giving the app a finished feel while you connect deeper data later.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["Pending checks", "Kitchen confirmations and rider handoff status."],
                ["Best sellers", "Surfaces the most active menu items today."],
              ].map(([title, detail]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[rgba(248,239,227,0.66)]">{detail}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(248,239,227,0.55)]">Quick actions</p>
            <div className="mt-4 space-y-3">
              {actions.map((action) => (
                <Link key={action.title} href={action.href} className="block rounded-2xl border border-white/10 bg-slate-950/35 p-4 transition hover:-translate-y-0.5 hover:bg-white/8">
                  <p className="text-base font-semibold text-white">{action.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[rgba(248,239,227,0.66)]">{action.detail}</p>
                </Link>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}