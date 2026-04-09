import Link from "next/link";

const highlights = [
  { title: "Lightning Delivery", value: "20 mins avg", detail: "Dense city zones, tuned routes" },
  { title: "Live Rider Map", value: "Real-time", detail: "Orders tracked from kitchen to door" },
  { title: "Trusted Kitchens", value: "500+ partners", detail: "Verified restaurants and chefs" },
];

const features = [
  {
    title: "One control room",
    detail: "Switch between customer, rider, and admin flows without leaving the app.",
  },
  {
    title: "Fast ordering",
    detail: "An interface built to reduce friction, highlight decisions, and keep checkout simple.",
  },
  {
    title: "Clear status",
    detail: "Every important action is surfaced with bold cards, motion, and high-contrast surfaces.",
  },
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute left-8 top-8 h-56 w-56 rounded-full bg-[rgba(255,138,61,0.18)] blur-3xl" />
        <div className="absolute right-0 top-28 h-72 w-72 rounded-full bg-[rgba(34,197,94,0.12)] blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[rgba(251,191,36,0.08)] blur-3xl" />
      </div>

      <section className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl flex-col justify-between gap-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_35px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-10 lg:p-12">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[rgba(255,255,255,0.55)]">
              DashBite
            </p>
            <h1 className="mt-2 text-xl font-semibold text-white sm:text-2xl">Food delivery, rebuilt for speed.</h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-[rgba(248,239,227,0.8)]">
            <Link className="rounded-full border border-white/10 px-4 py-2 transition hover:border-white/20 hover:bg-white/5" href="/login">
              Sign in
            </Link>
            <Link className="rounded-full border border-transparent bg-[var(--accent)] px-4 py-2 text-slate-950 transition hover:bg-[#ff9d57]" href="/register">
              Create account
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[rgba(248,239,227,0.72)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              A sharper ordering experience
            </p>

            <div className="space-y-5">
              <h2 className="max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl">
                Hungry users, riders, and restaurants in one clean command center.
              </h2>
              <p className="max-w-2xl text-base leading-relaxed text-[rgba(248,239,227,0.72)] sm:text-lg">
                DashBite gives the app a darker, more modern visual system with stronger hierarchy,
                clearer action buttons, and a faster path from discovery to checkout.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/orders/create"
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_45px_rgba(255,138,61,0.28)] transition hover:-translate-y-0.5 hover:bg-[#ff9d57]"
              >
                Start an order
              </Link>
              <Link
                href="/dashboard"
                className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Open dashboard
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <article key={item.title} className="rounded-3xl border border-white/10 bg-slate-950/35 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.2)] backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[rgba(248,239,227,0.5)]">{item.title}</p>
                  <p className="mt-2 text-2xl font-black text-white">{item.value}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[rgba(248,239,227,0.68)]">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,138,61,0.14),rgba(17,26,44,0.92))] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="absolute right-0 top-0 h-52 w-52 translate-x-16 -translate-y-20 rounded-full bg-white/10 blur-3xl" aria-hidden />
            <div className="relative space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(248,239,227,0.55)]">Live pulse</p>
                  <h3 className="mt-2 text-2xl font-bold text-white">Dispatch board</h3>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-[rgba(248,239,227,0.75)]">
                  Active now
                </div>
              </div>

              <div className="grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-[rgba(248,239,227,0.6)]">Most ordered</p>
                  <p className="mt-1 text-xl font-semibold text-white">Smoky Grill Bowl</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-[rgba(248,239,227,0.6)]">Popular dessert</p>
                  <p className="mt-1 text-xl font-semibold text-white">Caramel Churro Stack</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-[rgba(248,239,227,0.6)]">Delivery window</p>
                  <p className="mt-1 text-xl font-semibold text-white">22-28 minutes</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[rgba(248,239,227,0.68)]">{feature.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
