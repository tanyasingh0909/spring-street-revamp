/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Product = {
  id: string;
  badge: string;
  name: string;
  desc: string;
  cagr1y: string;
  ytd: string;
  volatility: string;
  minInv: string;
  spark: number[];
  tags: string[];
};

function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("reveal-in");
        }
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function SparklineArea({ data, isDark }: { data: number[]; isDark: boolean }) {
  const { linePath, areaPath } = useMemo(() => {
    const W = 380,
      H = 80,
      padX = 4,
      padY = 8;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const scaleX = (i: number) => (i / (data.length - 1)) * (W - padX * 2) + padX;
    const scaleY = (v: number) => {
      const t = (v - min) / (max - min || 1);
      return H - padY - t * (H - padY * 2);
    };
    const pts = data.map((v, i) => [scaleX(i), scaleY(v)] as [number, number]);
    const line = pts
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`)
      .join(" ");
    const area = `${line} L${pts[pts.length - 1][0]},${H} L${pts[0][0]},${H} Z`;
    return { linePath: line, areaPath: area };
  }, [data]);

  const strokeColor = isDark ? "#22D3EE" : "#2563EB";
  const fillId = `sparkFill-${data[0]}-${data.length}`;

  return (
    <svg width="100%" height="80" viewBox="0 0 380 80" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.22" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${fillId})`} />
      <path
        d={linePath}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProductsPage() {
  useRevealOnScroll();

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const products: Product[] = [
    {
      id: "growth",
      badge: "FLEX-CAP",
      name: "Global Growth Prisma",
      desc: "A globally diversified equity allocation across developed and emerging markets. Built on a proprietary methodology, enhanced periodically, engineered to compound steadily across market cycles.",
      cagr1y: "16.82%",
      ytd: "+10.0%",
      volatility: "Medium",
      minInv: "₹10,000",
      spark: [10, 10.4, 10.2, 11.1, 11.8, 11.6, 12.3, 13.0, 14.1, 15.2, 16.0, 16.82],
      tags: ["Equity", "Global", "Growth"],
    },
    {
      id: "core",
      badge: "MULTI-ASSET",
      name: "Global Core Prisma",
      desc: "A globally diversified allocation across equities, bonds, and commodities. Designed to smooth volatility while still compounding meaningfully across market cycles.",
      cagr1y: "10.45%",
      ytd: "+8.4%",
      volatility: "Low–Med",
      minInv: "₹10,000",
      spark: [10, 10.1, 10.3, 10.5, 10.8, 11.0, 10.9, 11.2, 11.5, 11.7, 11.9, 12.0],
      tags: ["Multi-asset", "Core", "Balanced"],
    },
    {
      id: "adv",
      badge: "AGGRESSIVE",
      name: "Global Advantage Prisma",
      desc: "A concentrated high-conviction portfolio of global growth equities. Built to capture innovation, scale, and compounding through cycles with higher expected volatility.",
      cagr1y: "—",
      ytd: "+35.4%",
      volatility: "High",
      minInv: "₹10,000",
      spark: [10, 10.8, 11.5, 11.0, 12.5, 13.4, 13.0, 15.0, 16.2, 18.0, 20.1, 22.5],
      tags: ["Equity", "High-growth", "Thematic"],
    },
  ];

  const tabs = ["All", "Equity", "Multi-asset", "Income"] as const;
  const [active, setActive] = useState<(typeof tabs)[number]>("All");

  const filtered = useMemo(() => {
    if (active === "All") return products;
    return products.filter((p) => p.tags.some((t) => t.toLowerCase() === active.toLowerCase()));
  }, [active, products]);

  return (
    <div className="page">
      <main className="main">
        {/* HERO */}
        <section className="hero" data-reveal>
          <div className="hero-left">
            <h1 className="h1">
              Prisma: Global investing,
              <br />
              <span className="accent">treated as a scientific problem.</span>
            </h1>
            <p className="p">
              Global portfolios built from systematic investing grounded in economic theory — where conviction meets
              quantitative analysis, paired with economic intuition, across global markets.
            </p>
            <p className="p1">The discipline is the edge.</p>
            <div className="cta">
              <button className="btn-primary" type="button">
                Explore Products
              </button>
              <button className="btn-secondary" type="button">
                Book a Consultation
              </button>
            </div>
          </div>
          <div className="hero-right" aria-hidden="true">
            {/* Static hero image (background removed PNG), same placement as the blank square */}
            <div className="hero-visual">
              <img className="hero-image" src="/hero-illustration.png" alt="" />
            </div>
          </div>
        </section>

        {/* PRODUCT FAMILY */}
        <section className="section" data-reveal>
          <div className="section-head">
            <div className="section-title">
              <h2 className="h2">The Prisma family</h2>
              <p className="section-sub">
                Institutional-grade ETF portfolios, expertly curated for Indian investors seeking global diversification.
              </p>
            </div>
            <div className="tabs" role="tablist" aria-label="Product filters">
              {tabs.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`tab ${active === t ? "active" : ""}`}
                  onClick={() => setActive(t)}
                  role="tab"
                  aria-selected={active === t}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid">
            {filtered.map((p) => (
              <article key={p.id} className="card" data-reveal>
                {/* Badge + Name + Desc */}
                <div className="card-top">
                  <span className="badge">{p.badge}</span>
                  <h3 className="h3">{p.name}</h3>
                  <p className="card-desc">{p.desc}</p>
                </div>

                {/* Metrics */}
                <div className="metrics">
                  <div className="metric">
                    <div className="k">CAGR (1Y)</div>
                    <div className="v">{p.cagr1y}</div>
                  </div>
                  <div className="metric">
                    <div className="k">1Y (USD)</div>
                    <div className="v green">{p.ytd}</div>
                  </div>
                </div>

                {/* Sparkline */}
                <div className="spark">
                  <div className="spark-label">SINCE JAN 2020</div>
                  <div className="sparkline-wrap">
                    <SparklineArea data={p.spark} isDark={isDark} />
                  </div>
                </div>

                {/* Actions */}
                <div className="card-actions">
                  <button className="btn-invest" type="button">
                    Invest now
                  </button>
                  <Link
                    className="btn-explore"
                    href={`/products/${p.id === "growth" ? "global-growth-prisma" : p.id}`}
                  >
                    Explore →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="view-all-wrap">
            <Link href="/products" className="view-all">
              View all products →
            </Link>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="section" data-reveal>
          <div className="section-head">
            <div className="section-title">
              <h2 className="h2">How it works?</h2>
              <p className="section-sub">
                A simple four-step process designed to give you access to globally diversified portfolios with minimal
                effort.
              </p>
            </div>
          </div>
          <div className="steps">
            {[
              { n: "01", t: "Top-up wallet", d: "Fund a USD wallet via your Indian bank under LRS." },
              { n: "02", t: "Pick a Prisma", d: "Choose by risk appetite and time horizon. Switch anytime." },
              { n: "03", t: "Auto-allocate", d: "We allocate across global assets using target weights." },
              { n: "04", t: "Annual rebalance", d: "We optimize the basket yearly—hands-off for you." },
            ].map((s) => (
              <div key={s.n} className="step" data-reveal>
                <div className="step-n">{s.n}</div>
                <div className="step-t">{s.t}</div>
                <div className="step-d">{s.d}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <style jsx>{`
        .page {
          min-height: 100vh;
        }

        :global(html) {
          --bg0: #f8fbff;
          --bg1: #ffffff;
          --text: rgba(10, 20, 40, 0.95);
          --muted: rgba(10, 20, 40, 0.7);
          --muted2: rgba(10, 20, 40, 0.72);
          --border: rgba(10, 20, 40, 0.1);
          --borderStrong: rgba(10, 20, 40, 0.18);
          --accent: #316cb5;
          --accent2: #4a89dc;
          --shadow: 0 16px 35px rgba(47, 107, 255, 0.16);
          --card-bg: #ffffff;
          --card-border: rgba(10, 20, 40, 0.1);
          --green: #16a34a;
        }
        :global(html.light) {
          --bg0: #f8fbff;
          --bg1: #ffffff;
          --text: rgba(10, 20, 40, 0.95);
          --muted: rgba(10, 20, 40, 0.7);
          --muted2: rgba(10, 20, 40, 0.72);
          --border: rgba(10, 20, 40, 0.1);
          --borderStrong: rgba(10, 20, 40, 0.18);
          --accent: #316cb5;
          --accent2: #4a89dc;
          --shadow: 0 16px 35px rgba(47, 107, 255, 0.16);
          --card-bg: #ffffff;
          --card-border: rgba(10, 20, 40, 0.1);
          --green: #16a34a;
        }
        :global(html.dark) {
          --bg0: #030b1d;
          --bg1: #071a3a;
          --text: rgba(255, 255, 255, 0.95);
          --muted: rgba(255, 255, 255, 0.68);
          --muted2: rgba(255, 255, 255, 0.74);
          --border: rgba(255, 255, 255, 0.14);
          --borderStrong: rgba(255, 255, 255, 0.28);
          --accent: #316cb5;
          --accent2: #00e87a;
          --shadow: 0 16px 35px rgba(0, 201, 106, 0.22);
          --card-bg: rgba(255, 255, 255, 0.05);
          --card-border: rgba(255, 255, 255, 0.12);
          --green: #22c55e;
        }

        :global(html.dark) .page {
          background: radial-gradient(1100px 650px at 18% 18%, var(--bg1) 0%, transparent 55%),
            radial-gradient(900px 600px at 75% 40%, rgba(0, 201, 106, 0.12), transparent 60%),
            linear-gradient(180deg, var(--bg1), var(--bg0));
        }
        :global(html.light) .page,
        .page {
          background: radial-gradient(1100px 650px at 18% 18%, rgba(49, 108, 181, 0.08) 0%, transparent 55%),
            linear-gradient(180deg, var(--bg0), var(--bg1));
        }

        .main {
          max-width: 1240px;
          margin: 0 auto;
          padding: 24px 28px 80px;
        }

        [data-reveal] {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .reveal-in {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }

        /* HERO */
        .hero {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 26px;
          align-items: center;
          padding: 38px 0 10px;
        }
        .hero-visual {
          width: 100%;
          aspect-ratio: 1/1;
          border-radius: 28px;
          background: transparent;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-image {
          width: 5000px;
          height: 5000px;
          object-fit: contain;
          display: block;
        }

        .h1 {
          font-family: "Syne", sans-serif;
          font-size: clamp(32px, 3.2vw, 48px);
          line-height: 1.06;
          letter-spacing: -0.03em;
          margin: 0;
          color: var(--text);
        }
        .accent {
          color: var(--accent);
        }
        .p {
          margin: 10px 0 0;
          color: var(--muted);
          line-height: 1.8;
          font-weight: 500;
          max-width: 640px;
        }
        .p1 {
          margin: 10px 0 0;
          color: var(--muted);
          line-height: 1.8;
          font-weight: 650;
          max-width: 640px;
        }
        .cta {
          display: flex;
          gap: 12px;
          margin-top: 18px;
          flex-wrap: wrap;
        }

        /* SECTION */
        .section {
          padding: 34px 0 0;
        }
        .section-head {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 18px;
          margin-bottom: 24px;
        }
        .section-title {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .h2 {
          margin: 0;
          font-size: 30px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text);
        }
        .section-sub {
          margin-top: 8px;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.6;
          max-width: 700px;
          text-align: center;
        }

        /* TABS */
        .tabs {
          display: flex;
          gap: 8px;
          padding: 6px;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.05);
        }
        :global(html.light) .tabs {
          background: rgba(255, 255, 255, 0.8);
        }
        .tab {
          border: none;
          background: transparent;
          color: var(--muted2);
          padding: 8px 12px;
          border-radius: 999px;
          cursor: pointer;
          font-weight: 700;
          font-size: 12px;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .tab.active {
          background: var(--accent);
          color: #fff;
        }

        /* PRODUCT GRID */
        .grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
          margin-top: 14px;
        }

        /* CARD — matches screenshot style */
        .card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 18px;
          padding: 22px 20px 18px;
          display: flex;
          flex-direction: column;
          gap: 0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 1px 4px rgba(10, 20, 40, 0.06);
        }
        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(10, 20, 40, 0.1);
        }
        :global(html.dark) .card:hover {
          box-shadow: 0 8px 24px rgba(0, 201, 106, 0.12);
        }

        .card-top {
          flex: 1;
        }

        /* Badge */
        .badge {
          display: inline-flex;
          align-items: center;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--accent);
          background: rgba(49, 108, 181, 0.1);
          border: 1px solid rgba(49, 108, 181, 0.2);
          padding: 3px 9px;
          border-radius: 999px;
        }
        :global(html.dark) .badge {
          background: rgba(0, 201, 106, 0.1);
          border-color: rgba(0, 201, 106, 0.22);
        }

        .h3 {
          margin: 10px 0 6px;
          font-size: 17px;
          font-weight: 700;
          color: var(--text);
          line-height: 1.3;
        }
        .card-desc {
          margin: 0;
          color: var(--muted);
          line-height: 1.65;
          font-weight: 400;
          font-size: 13px;
        }

        /* Metrics */
        .metrics {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin-top: 18px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }
        .metric .k {
          font-size: 11px;
          color: var(--muted2);
          font-weight: 700;
          letter-spacing: 0.03em;
        }
        .metric .v {
          font-size: 18px;
          font-weight: 800;
          margin-top: 3px;
          color: var(--text);
        }
        .metric .v.green {
          color: var(--green);
        }

        /* Sparkline */
        .spark {
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid var(--border);
        }
        .spark-label {
          font-size: 10px;
          color: var(--muted2);
          font-weight: 700;
          letter-spacing: 0.08em;
          margin-bottom: 6px;
        }
        .sparkline-wrap {
          width: 100%;
          overflow: hidden;
          border-radius: 6px;
        }

        /* Card actions — matches screenshot: wide invest btn + smaller explore */
        .card-actions {
          display: flex;
          gap: 10px;
          margin-top: 18px;
          align-items: center;
        }
        .btn-invest {
          flex: 1;
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 13px 16px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease;
          box-shadow: 0 4px 12px rgba(49, 108, 181, 0.25);
        }
        .btn-invest:hover {
          background: #1f6ef5;
          transform: translateY(-1px);
        }
        :global(html.dark) .btn-invest {
          box-shadow: 0 4px 14px rgba(0, 201, 106, 0.2);
        }
        .btn-explore {
          color: #316cb5;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .btn-explore:hover {
          color: #4a89dc;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        :global(html.dark) .btn-explore {
          color: #4a89dc;
        }

        :global(html.dark) .btn-explore:hover {
          color: #72a6e8;
        }

        .btn-explore {
          color: #316cb5 !important;
        }

        .btn-explore:hover {
          color: #4a89dc !important;
        }
        :global(.btn-explore) {
          color: #316cb5 !important;
          font-weight: 800;
          text-decoration: none;
          font-size: 14px;
        }

        :global(.btn-explore:hover) {
          color: #4a89dc !important;
          text-decoration: underline;
          text-underline-offset: 4px;
        }
        .btn-explore:hover {
          background: rgba(49, 108, 181, 0.07);
          transform: translateY(-1px);
        }
        :global(html.dark) .btn-explore:hover {
          background: rgba(255, 255, 255, 0.07);
        }

        /* View all link */
        .view-all-wrap {
          display: flex;
          justify-content: center;
          margin-top: 28px;
        }
        .view-all {
          color: var(--accent);
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
        }
        .view-all:hover {
          text-decoration: underline;
        }

        /* HOW IT WORKS */
        .steps {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }
        .step {
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.06);
          border-radius: 14px;
          padding: 14px;
          transition: transform 0.2s ease;
        }
        :global(html.light) .step {
          background: rgba(255, 255, 255, 0.85);
        }
        .step:hover {
          transform: translateY(-3px);
        }
        .step-n {
          font-size: 11px;
          font-weight: 900;
          color: var(--accent);
          letter-spacing: 0.14em;
        }
        .step-t {
          margin-top: 8px;
          font-weight: 900;
          color: var(--text);
        }
        .step-d {
          margin-top: 6px;
          color: var(--muted);
          line-height: 1.7;
          font-weight: 400;
          font-size: 13px;
        }

        /* Global buttons */
        .btn-primary,
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        .btn-primary {
          background: var(--accent);
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 12px 18px;
          font-weight: 900;
          cursor: pointer;
          box-shadow: var(--shadow);
          transition: transform 0.15s ease, background 0.2s ease;
        }
        .btn-primary:hover {
          background: #1f6ef5;
          transform: translateY(-1px);
        }
        .btn-secondary {
          background: transparent;
          color: var(--text);
          border: 1px solid var(--borderStrong);
          border-radius: 999px;
          padding: 12px 18px;
          font-weight: 900;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.06);
          transform: translateY(-1px);
        }
        :global(html.light) .btn-secondary:hover {
          background: rgba(10, 20, 40, 0.04);
        }

        @media (max-width: 980px) {
          .hero {
            grid-template-columns: 1fr;
          }
          .grid {
            grid-template-columns: 1fr;
          }
          .steps {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 560px) {
          .main {
            padding: 16px 16px 60px;
          }
          .steps {
            grid-template-columns: 1fr;
          }
          .card-actions {
            flex-direction: column;
          }
          .btn-invest,
          .btn-explore {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
