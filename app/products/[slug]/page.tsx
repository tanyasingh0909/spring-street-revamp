/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Theme = "dark" | "light";

function getPreferredThemeClient(): Theme {
  if (typeof window === "undefined") return "dark";
  const saved = window.localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getThemeFromRootOrStorage(): Theme {
  if (typeof window === "undefined") return "dark";
  const root = document.documentElement;
  if (root.classList.contains("dark")) return "dark";
  if (root.classList.contains("light")) return "light";
  return getPreferredThemeClient();
}

type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  badges: string[];
  kpis: Array<{ label: string; value: string; sub?: string }>;
  series: Array<{ month: string; prisma: number; benchmark: number }>;
  allocations: {
    sectors: Array<{ name: string; value: number }>;
    countries: Array<{ name: string; value: number }>;
  };
  holdings: Array<{
    symbol: string;
    name: string;
    weight: number;
    oneY: number;
    volatility: number;
  }>;
  buildSteps: Array<{ title: string; description: string }>;
};

const PRODUCT: Product = {
  slug: "global-growth-prisma",
  name: "Global Growth Prisma",
  tagline: "A diversified global equity portfolio, built for long-term compounding.",
  description:
    "Global Growth Prisma blends developed and emerging market exposure with a quality tilt. The goal: participate in global innovation while keeping the experience simple and the risks visible.",
  badges: ["FLEX-CAP", "Global Equity", "Long-term"],
  kpis: [
    { label: "CAGR (1Y)", value: "16.82%" },
    { label: "1Y (USD)", value: "+10.0%" },
    { label: "Min. investment", value: "₹10,000" },
    { label: "Volatility", value: "Medium" },
  ],
  series: [
    { month: "Jul", prisma: 100, benchmark: 100 },
    { month: "Aug", prisma: 104, benchmark: 102 },
    { month: "Sep", prisma: 108, benchmark: 106 },
    { month: "Oct", prisma: 111, benchmark: 109 },
    { month: "Nov", prisma: 116, benchmark: 112 },
    { month: "Dec", prisma: 118, benchmark: 114 },
    { month: "Jan", prisma: 123, benchmark: 118 },
    { month: "Feb", prisma: 126, benchmark: 120 },
    { month: "Mar", prisma: 131, benchmark: 124 },
    { month: "Apr", prisma: 136, benchmark: 128 },
    { month: "May", prisma: 141, benchmark: 132 },
    { month: "Jun", prisma: 147, benchmark: 135 },
  ],
  allocations: {
    sectors: [
      { name: "Technology", value: 34 },
      { name: "Healthcare", value: 16 },
      { name: "Consumer", value: 14 },
      { name: "Financials", value: 12 },
      { name: "Industrials", value: 10 },
      { name: "Other", value: 14 },
    ],
    countries: [
      { name: "United States", value: 58 },
      { name: "Europe", value: 16 },
      { name: "Japan", value: 10 },
      { name: "India", value: 6 },
      { name: "Other", value: 10 },
    ],
  },
  holdings: [
    { symbol: "AAPL", name: "Apple", weight: 6.2, oneY: 18.4, volatility: 22.1 },
    { symbol: "MSFT", name: "Microsoft", weight: 5.8, oneY: 21.2, volatility: 20.6 },
    { symbol: "NVDA", name: "NVIDIA", weight: 4.1, oneY: 35.4, volatility: 38.2 },
    { symbol: "UNH", name: "UnitedHealth", weight: 3.2, oneY: 12.8, volatility: 16.4 },
    { symbol: "ASML", name: "ASML", weight: 2.6, oneY: 15.1, volatility: 24.0 },
    { symbol: "TSM", name: "TSMC", weight: 2.4, oneY: 13.7, volatility: 26.3 },
  ],
  buildSteps: [
    {
      title: "What it owns?",
      description:
        "US Listed ETFs that provide exposure across markets and asset classes, screened for AUM, cost, risk and other performance thresholds.",
    },
    {
      title: "How it's sized?",
      description:
        "Weighted on a proprietary methodology that balances historical risk and performance attributes with conviction",
    },
    {
      title: "How it stays on track?",
      description:
        "Rebalanced periodically based on evolving market conditions and aimed to deliver superior performance while optimizing tax.",
    },
  ],
};

function getProduct(slug: string): Product | null {
  if (slug === PRODUCT.slug) return PRODUCT;
  return null;
}

// ── Light-mode design tokens ───────────────────────────────────────────────
// page bg    : #F0F4FA  (cool blue-tinted, matches screenshot 2)
// card bg    : #FFFFFF
// inner card : #F4F7FC
// border     : #D0DBEA  (clearly visible slate-blue)
// text-900   : #0B1F3A  (deep navy)
// text-600   : #3B526E
// text-400   : #6B7F96
// accent     : #2563EB  (blue-600)
// ──────────────────────────────────────────────────────────────────────────

function SoftShell({
  children,
  forceLight,
  className,
}: {
  children: React.ReactNode;
  forceLight?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "rounded-2xl border shadow-sm",
        forceLight
          ? "border-[#D0DBEA] bg-white shadow-[0_1px_4px_rgba(11,31,58,0.07)]"
          : "border-white/10 bg-white/5",
        className
      )}
    >
      {children}
    </div>
  );
}

function StatPill({
  label,
  value,
  sub,
  forceLight,
}: {
  label: string;
  value: string;
  sub?: string;
  forceLight?: boolean;
}) {
  return (
    <div className={cx("rounded-xl border p-3", forceLight ? "border-[#D0DBEA] bg-[#F4F7FC]" : "border-white/10 bg-white/5")}>
      <p className={cx("text-[11px] font-semibold tracking-wide", forceLight ? "text-[#6B7F96]" : "text-slate-300")}>{label}</p>
      <p className={cx("mt-1 text-sm font-semibold", forceLight ? "text-[#0B1F3A]" : "text-white")}>{value}</p>
      {sub && <p className={cx("mt-1 text-xs", forceLight ? "text-[#6B7F96]" : "text-slate-300")}>{sub}</p>}
    </div>
  );
}

function MiniLabel({ children, forceLight }: { children: React.ReactNode; forceLight?: boolean }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold",
        forceLight ? "border-[#D0DBEA] bg-white text-[#3B526E]" : "border-white/10 bg-white/5 text-slate-200"
      )}
    >
      {children}
    </span>
  );
}

function formatPct(v: number) {
  return `${v > 0 ? "+" : ""}${v.toFixed(1)}%`;
}

const PIE_LIGHT = ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD", "#1D4ED8", "#BFDBFE"];
const PIE_DARK  = ["#22D3EE", "#60A5FA", "#818CF8", "#38BDF8", "#A5B4FC", "#475569"];

export default function ProductDetailPage() {
  const params = useParams<{ slug?: string | string[] }>();
  const slug =
    typeof params?.slug === "string"
      ? params.slug
      : Array.isArray(params?.slug)
        ? params.slug[0] ?? ""
        : "";

  const [theme, setTheme] = useState<Theme>(() => getPreferredThemeClient());
  const fl = theme === "light"; // forceLight shorthand

  useEffect(() => {
    setTheme(getThemeFromRootOrStorage());
    const root = document.documentElement;
    const obs = new MutationObserver(() => setTheme(getThemeFromRootOrStorage()));
    obs.observe(root, { attributes: true, attributeFilter: ["class"] });
    const onStorage = (e: StorageEvent) => { if (e.key === "theme") setTheme(getThemeFromRootOrStorage()); };
    window.addEventListener("storage", onStorage);
    return () => { obs.disconnect(); window.removeEventListener("storage", onStorage); };
  }, []);

  const product = useMemo(() => getProduct(slug), [slug]);
  const pies = fl ? PIE_LIGHT : PIE_DARK;

  // ── Reusable token helpers ─────────────────────────────────────────────
  const tp  = fl ? "text-[#0B1F3A]"  : "text-white";          // primary
  const ts  = fl ? "text-[#3B526E]"  : "text-slate-300";      // secondary
  const tm  = fl ? "text-[#6B7F96]"  : "text-slate-400";      // muted
  const ic  = fl ? "border-[#D0DBEA] bg-[#F4F7FC]" : "border-white/10 bg-white/5"; // inner card
  const tip = {
    borderRadius: 12,
    border: fl ? "1px solid #D0DBEA" : "1px solid rgba(255,255,255,0.12)",
    background: fl ? "#ffffff" : "rgba(2,6,23,0.92)",
    color: fl ? "#0B1F3A" : "#E2E8F0",
    fontSize: 12,
  };

  const btnPrimary = "rounded-full bg-[#2563EB] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/60";
  const btnSecondary = cx(
    "rounded-full border px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2",
    fl ? "border-[#D0DBEA] bg-white text-[#0B1F3A] hover:bg-[#F4F7FC] focus:ring-slate-300/50"
       : "border-white/15 bg-white/5 text-white hover:bg-white/10 focus:ring-white/20"
  );

  if (!product) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <p className="mt-2 text-sm text-slate-600">
          Try <Link href="/products" className="text-blue-600 underline">/products</Link>.
        </p>
      </main>
    );
  }

  return (
    <main className={cx("min-h-screen", fl ? "bg-[#F0F4FA] text-[#0B1F3A]" : "bg-[#061427] text-white")}>

      {/* ── Sub-nav ──────────────────────────────────────────────────── */}
      <div className={cx("border-b backdrop-blur-md", fl ? "border-[#D0DBEA] bg-white/80" : "border-white/10 bg-transparent")}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/products" className={cx("text-sm font-semibold transition hover:opacity-70", tp)}>
              ← Products
            </Link>
            <div className={cx("hidden h-5 w-px sm:block", fl ? "bg-[#D0DBEA]" : "bg-white/10")} />
            <p className={cx("hidden text-sm sm:block", tm)}>Portfolio details</p>
          </div>
          <div className="flex items-center gap-2">
           <Link
  href="#"
  className="inline-flex items-center justify-center rounded-full bg-[#316CB5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3F7AC3]"
>
  Invest Now
</Link>

            <Link href="/contact" className={cx("inline-flex items-center justify-center", btnSecondary)}>Talk to us</Link>
          </div>
        </div>
      </div>

      {/* ── Content ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }} className="min-w-0">

            {/* Hero card */}
            <SoftShell forceLight={fl} className="p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-2">
                    {product.badges.map(b => <MiniLabel key={b} forceLight={fl}>{b}</MiniLabel>)}
                  </div>
                  <h1 className={cx("mt-3 text-xl font-semibold tracking-tight sm:text-2xl lg:text-3xl", tp)}>{product.name}</h1>
                  <p className={cx("mt-2 text-sm", ts)}>{product.tagline}</p>
                </div>

                <div className={cx("w-full rounded-2xl border p-4 sm:w-auto sm:min-w-[224px]", ic)}>
                  <p className={cx("text-xs font-semibold tracking-wide", tm)}>Start with</p>
                  <div className="mt-2 flex items-end justify-between gap-2">
                    <p className={cx("text-2xl font-semibold", tp)}>₹10,000</p>
                    <span className={cx("rounded-full px-2 py-1 text-xs font-semibold", fl ? "bg-blue-100 text-blue-700" : "bg-cyan-400/15 text-cyan-200")}>
                      Suggested
                    </span>
                  </div>
                  <p className={cx("mt-2 text-xs", tm)}>One-time or SIP. Switch anytime.</p>
                  <div className="mt-4 flex gap-2">
                    <Link href="/request-access" className="flex-1 rounded-full bg-[#316cb5] px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-blue-500">Invest </Link>
                    <button type="button" className={cx("flex-1", btnSecondary)}>Download</button>
                  </div>
                </div>
              </div>

              <p className={cx("mt-4 text-sm leading-6", ts)}>{product.description}</p>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {product.kpis.map(k => <StatPill key={k.label} label={k.label} value={k.value} sub={k.sub} forceLight={fl} />)}
              </div>
            </SoftShell>

            {/* Performance */}
            <motion.div className="mt-6" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, ease: "easeOut" }}>
              <SoftShell forceLight={fl} className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className={cx("text-sm font-semibold", tp)}>Performance</p>
                    <p className={cx("mt-1 text-xs", tm)}>Prisma vs benchmark </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MiniLabel forceLight={fl}><span className={cx("mr-2 inline-block h-2 w-2 rounded-full", fl ? "bg-blue-600" : "bg-cyan-400")} />Prisma</MiniLabel>
                    <MiniLabel forceLight={fl}><span className="mr-2 inline-block h-2 w-2 rounded-full bg-slate-400" />Benchmark</MiniLabel>
                  </div>
                </div>

                <div className="mt-5 h-[220px] sm:h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={product.series} margin={{ left: 0, right: 10, top: 8, bottom: 0 }}>
                      <defs>
                        <linearGradient id="prismaFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={fl ? "#2563EB" : "#22D3EE"} stopOpacity={0.18} />
                          <stop offset="100%" stopColor={fl ? "#2563EB" : "#22D3EE"} stopOpacity={0.01} />
                        </linearGradient>
                        <linearGradient id="benchFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#94A3B8" stopOpacity={0.14} />
                          <stop offset="100%" stopColor="#94A3B8" stopOpacity={0.01} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 6" stroke={fl ? "#E2EBF4" : "rgba(255,255,255,0.07)"} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: fl ? "#6B7F96" : "rgba(255,255,255,0.4)" }} stroke="transparent" />
                      <YAxis tick={{ fontSize: 11, fill: fl ? "#6B7F96" : "rgba(255,255,255,0.4)" }} stroke="transparent" width={30} />
                      <Tooltip contentStyle={tip} />
                      <Area type="monotone" dataKey="benchmark" stroke="#94A3B8" strokeWidth={2} fill="url(#benchFill)" dot={false} activeDot={{ r: 4 }} />
                      <Area type="monotone" dataKey="prisma" stroke={fl ? "#2563EB" : "#22D3EE"} strokeWidth={2.5} fill="url(#prismaFill)" dot={false} activeDot={{ r: 5 }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <StatPill label="1Y return" value="+10.0%" forceLight={fl} />
                  <StatPill label="Max drawdown" value="-8.7%" forceLight={fl} />
                  <StatPill label="Sharpe (1Y)" value="0.74" forceLight={fl} />
                </div>
              </SoftShell>
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.aside initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }} className="min-w-0 space-y-6">

            {/* What's inside */}
            <SoftShell forceLight={fl} className="p-5 sm:p-6">
              <p className={cx("text-sm font-semibold", tp)}>What's inside</p>
              <p className={cx("mt-1 text-xs", tm)}>Allocation snapshots</p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  { title: "Equity Exposure by Market Cap", data: product.allocations.sectors, offset: 0, label: "6 buckets" },
                  { title: "Exposure by Region", data: product.allocations.countries, offset: 1, label: "5 buckets" },
                ].map(({ title, data, offset, label }) => (
                  <div key={title} className={cx("rounded-2xl border p-4", ic)}>
                    <div className="flex items-center justify-between gap-2">
                      <p className={cx("text-xs font-semibold", ts)}>{title}</p>
                      <MiniLabel forceLight={fl}>{label}</MiniLabel>
                    </div>
                    <div className="mt-3 h-[155px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={data} dataKey="value" nameKey="name" innerRadius={46} outerRadius={68} paddingAngle={2}>
                            {data.map((_, i) => <Cell key={i} fill={pies[(i + offset) % pies.length]} />)}
                          </Pie>
                          <Tooltip formatter={(v: any) => [`${v}%`, "Weight"]} contentStyle={tip} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-y-1.5 gap-x-3">
                      {data.slice(0, 4).map((s, i) => (
                        <div key={s.name} className="flex items-center gap-1.5 text-xs">
                          <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ background: pies[(i + offset) % pies.length] }} />
                          <span className={cx("truncate", ts)}>{s.name}</span>
                          <span className={cx("ml-auto font-semibold tabular-nums", tp)}>{s.value}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SoftShell>

            {/* Holdings preview */}
            <SoftShell forceLight={fl} className="p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <p className={cx("text-sm font-semibold", tp)}>Holdings</p>
                <Link href="#holdings" className={cx("text-xs font-semibold", fl ? "text-[#2563EB]" : "text-cyan-200")}>View all →</Link>
              </div>
              <div className="mt-4 space-y-2">
                {product.holdings.slice(0, 4).map(h => (
                  <div key={h.symbol} className={cx("flex items-center gap-3 rounded-xl border p-3 text-sm", ic)}>
                    <div className={cx("grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg text-xs font-bold", fl ? "bg-blue-100 text-blue-700" : "bg-cyan-400/15 text-cyan-200")}>
                      {h.symbol}
                    </div>
                    <div className="min-w-0">
                      <p className={cx("truncate font-semibold", tp)}>{h.name}</p>
                      <p className={cx("text-xs", tm)}>Weight {h.weight.toFixed(1)}% · 1Y {formatPct(h.oneY)}</p>
                    </div>
                    <div className="ml-auto flex-shrink-0 text-right">
                      <p className={cx("text-xs font-semibold", tp)}>Vol {h.volatility.toFixed(1)}</p>
                      <p className={cx("text-[11px]", tm)}>risk</p>
                    </div>
                  </div>
                ))}
              </div>
            </SoftShell>
          </motion.aside>
        </div>

        {/* ── Holdings table ─────────────────────────────────────────── */}
        <motion.section id="holdings" className="mt-10" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.55, ease: "easeOut" }}>
          <SoftShell forceLight={fl} className="overflow-hidden">
            <div className={cx("flex flex-wrap items-center justify-between gap-3 border-b p-5 sm:p-6", fl ? "border-[#D0DBEA]" : "border-white/10")}>
              <p className={cx("text-xl font-bold", tp)} style={{ fontFamily: "var(--font-syne)" }}>Holdings</p>
              <MiniLabel forceLight={fl}>Returns in INR</MiniLabel>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead className={cx("text-xs", fl ? "bg-[#F4F7FC] text-[#6B7F96]" : "bg-white/5 text-slate-300")}>
                  <tr>
                    {["Ticker", "Company", "Weight", "1Y", "Volatility"].map(h => (
                      <th key={h} className="px-5 py-3 font-semibold sm:px-6">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.holdings.map(h => (
                    <tr key={h.symbol} className={cx("border-t transition", fl ? "border-[#E8EEF6] hover:bg-[#F4F7FC]" : "border-white/10 hover:bg-white/5")}>
                      <td className={cx("px-5 py-4 font-semibold sm:px-6", tp)}>{h.symbol}</td>
                      <td className={cx("px-5 py-4 sm:px-6", ts)}>{h.name}</td>
                      <td className={cx("px-5 py-4 sm:px-6", ts)}>{h.weight.toFixed(1)}%</td>
                      <td className={cx("px-5 py-4 font-semibold sm:px-6", h.oneY >= 0 ? "text-emerald-600" : "text-rose-600")}>{formatPct(h.oneY)}</td>
                      <td className={cx("px-5 py-4 sm:px-6", ts)}>{h.volatility.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SoftShell>
        </motion.section>

        {/* ── How we build + Next actions ────────────────────────────── */}
        <motion.section className="mt-10" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.55, ease: "easeOut" }}>
          <div className="grid gap-6 lg:grid-cols-3">
            <SoftShell forceLight={fl} className="p-5 sm:p-6 lg:col-span-2">
              <p className={cx("text-xl font-bold", tp)} style={{ fontFamily: "var(--font-syne)" }}>How we build Prisma</p>
              <p className={cx("mt-1 text-xs", tm)}>A clearer, step-by-step story</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {product.buildSteps.map((s, idx) => (
                  <motion.div key={s.title} whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 320, damping: 22 }} className={cx("rounded-2xl border p-4", ic)}>
                    <div className="flex items-center gap-2">
                      <span className={cx("grid h-7 w-7 flex-shrink-0 place-items-center rounded-lg text-xs font-bold", fl ? "bg-blue-100 text-blue-700" : "bg-cyan-400/15 text-cyan-200")}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <p className={cx("text-sm font-semibold", tp)}>{s.title}</p>
                    </div>
                    <p className={cx("mt-2 text-xs leading-5", ts)}>{s.description}</p>
                  </motion.div>
                ))}
              </div>
            </SoftShell>

            <SoftShell forceLight={fl} className="p-5 sm:p-6">
              <p className={cx("text-sm font-semibold", tp)}>Next actions</p>
              <p className={cx("mt-1 text-xs", tm)}>Quick, user-friendly CTAs</p>
              <div className="mt-5 space-y-3">
                <Link href="/request-access" className="block rounded-2xl bg-[#316cb5] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-500">
                  Invest in {product.name}
                </Link>
                <Link href="/contact" className={cx("block rounded-2xl border px-4 py-3 text-center text-sm font-semibold transition", fl ? "border-[#D0DBEA] bg-white text-[#0B1F3A] hover:bg-[#F4F7FC]" : "border-white/15 bg-white/5 text-white hover:bg-white/10")}>
                  Ask a question
                </Link>
                <div className={cx("rounded-2xl border p-4 text-xs", ic)}>
                  <p className={cx("font-semibold", tp)}>Reminder</p>
                  <p className={cx("mt-1 leading-5", ts)}>Past returns are not indicative of future performance. Review risk and allocation before investing.</p>
                </div>
              </div>
            </SoftShell>
          </div>
        </motion.section>

        {/* ── CTA footer ─────────────────────────────────────────────── */}
        <section className={cx("border-t py-14 sm:py-16", fl ? "border-[#D0DBEA]" : "border-white/10")}>
          <div className={cx("relative overflow-hidden rounded-3xl border p-8 sm:p-10", fl ? "border-[#D0DBEA] bg-white shadow-[0_2px_8px_rgba(11,31,58,0.07)]" : "border-white/10 bg-white/5")}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background: fl
                  ? "radial-gradient(45rem 20rem at 20% -10%, rgba(37,99,235,0.07), transparent 60%), radial-gradient(40rem 20rem at 90% 110%, rgba(37,99,235,0.04), transparent 55%)"
                  : "radial-gradient(45rem 20rem at 20% -10%, rgba(49,108,181,0.28), transparent 60%), radial-gradient(40rem 20rem at 90% 110%, rgba(76,139,219,0.20), transparent 55%)",
              }}
            />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className={cx("mb-2 text-lg font-semibold", fl ? "text-[#316CB5]" : "text-[#4A89DC]")} style={{ fontFamily: "var(--font-syne)" }}>
                  Get Started
                </p>
                <p className={cx("text-xl font-bold", tp)} style={{ fontFamily: "var(--font-syne)" }}>
                  Add Flexi-Cap to your global portfolio
                </p>
                <p className={cx("mt-1 text-sm", ts)}>Transparent fees. Daily liquidity. No exit penalties.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
  href="#"
  className="inline-flex items-center justify-center rounded-full bg-[#316CB5] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3F7AC3]"
>
  Invest Now
</Link>
                <Link href="/products" className={cx("inline-flex items-center justify-center", btnSecondary)}>View all Products</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
