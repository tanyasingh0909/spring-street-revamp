"use client";

import Link from "next/link";

import { useEffect, useMemo, useRef, useState } from "react";

type Stat = {
  value: number;
  suffix: string;
  title: string;
  desc: string;
};

type ProductCard = {
  tag: string;
  name: string;
  desc: string;
  cagr: string;
  oneY: string;
  since: string;
  spark: number[];
};

function useInViewOnce() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}

function CountUp({
  target,
  suffix,
  durationMs = 1200,
  startWhen,
}: {
  target: number;
  suffix: string;
  durationMs?: number;
  startWhen: boolean;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!startWhen) return;

    let raf = 0;
    const t0 = performance.now();

    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / durationMs);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [startWhen, target, durationMs]);

  return (
    <span>
      {val}
      {suffix}
    </span>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const W = 170;
  const H = 52;
  const P = 6;

  const { d, area } = useMemo(() => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const span = max - min || 1;

    const sx = (i: number) => P + (i / (data.length - 1)) * (W - P * 2);
    const sy = (v: number) => P + (1 - (v - min) / span) * (H - P * 2);

    let path = "";
    data.forEach((v, i) => {
      const x = sx(i);
      const y = sy(v);
      path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    });

    const baseY = H - P;
    const areaPath = `${path} L ${sx(data.length - 1)} ${baseY} L ${sx(0)} ${baseY} Z`;
    return { d: path, area: areaPath };
  }, [data]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={area} fill="url(#sparkFill)" opacity="0.9" />
      <path className="sparkLine" d={d} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <style jsx>{`
        .sparkLine {
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          animation: draw 1100ms ease forwards;
        }
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}

export default function PrismaShowcase() {
  const { ref, inView } = useInViewOnce();

  const stats: Stat[] = [
    {
      value: 99,
      suffix: "%",
      title: "Domestic Concentration",
      desc: "Your portfolio likely stays weighted towards a single economy. Diversity is safeguard for hard-earned wealth.",
    },
    {
      value: 5,
      suffix: "%",
      title: "Share of Global Economy",
      desc: "India represents only ~5% of the global economy. Explore the remaining 95% of opportunity set.",
    },
    {
      value: 2,
      suffix: "x",
      title: "Superior Growth",
      desc: "US markets have historically delivered ~2x returns compared to NIFTY 50 over the last decade. Capture this growth.",
    },
  ];

  const products: ProductCard[] = [
    {
      tag: "FLEX-CAP",
      name: "Global Growth Prisma",
      desc: "A globally diversified equity allocation across developed and emerging markets. Built on a proprietary methodology, enhanced periodically, engineered to compound steadily across market cycles.",
      cagr: "16.82%",
      oneY: "+10.0%",
      since: "SINCE JAN 2020",
      spark: [10, 11, 10.6, 12, 13.2, 12.9, 13.7, 14.2, 15.3, 16.8],
    },
    {
      tag: "MULTI-ASSET",
      name: "Global Core Prisma",
      desc: "A globally diversified allocation across equities, bonds, and commodities. Designed to smooth volatility while still compounding meaningfully across market cycles.",
      cagr: "10.45%",
      oneY: "+8.4%",
      since: "SINCE JAN 2020",
      spark: [10, 10.2, 10.15, 10.6, 10.85, 11.1, 11.0, 11.35, 11.55, 12.0],
    } as any,
    {
      tag: "AGGRESSIVE",
      name: "Global Advantage Prisma",
      desc: "A concentrated high‑conviction portfolio of global growth equities. Built to capture innovation, scale, and compounding through cycles with higher expected volatility.",
      cagr: "—",
      oneY: "+35.4%",
      since: "SINCE JAN 2020",
      spark: [10, 10.4, 11.2, 10.9, 12.1, 13.0, 12.6, 14.1, 15.7, 17.0],
    },
  ];

  return (
    <section className="wrapOuter" ref={ref}>
      <div className="wrap">
        {/* Stats row */}
        <div className="statsRow">
          {stats.map((s) => (
            <div key={s.title} className="statCard">
              <div className="statValue">
                <CountUp target={s.value} suffix={s.suffix} startWhen={inView} />
              </div>
              <div className="statTitle">{s.title}</div>
              <div className="statDesc">{s.desc}</div>
            </div>
          ))}
        </div>

        {/* Prisma family */}
        <div className="familyHead">
          <div className="familyTitle">The Prisma family</div>
          <div className="familySub">
            Institutional-grade ETF portfolios, expertly curated for Indian investors seeking global diversification.
          </div>
        </div>

        <div className="productGrid">
          {products.map((p) => (
            <article key={p.name} className="productCard">
              <div className="pTop">
                <div className="tag">{p.tag}</div>
                <div className="pName">{p.name}</div>
                <div className="pDesc">{p.desc}</div>
              </div>

              <div className="pMetrics">
                <div className="metric">
                  <div className="k">CAGR (1Y)</div>
                  <div className="v">{p.cagr}</div>
                </div>
                <div className="metric">
                  <div className="k">1Y (USD)</div>
                  <div className="v good">{p.oneY}</div>
                </div>
              </div>

              <div className="spark">
                <div className="since">{p.since}</div>
                <div className="sparkBox">
                  <Sparkline data={p.spark} />
                </div>
              </div>

              <div className="pActions">
                <button className="btnPrimary" type="button">Invest now</button>
                <button className="btnGhost" type="button">Explore</button>
              </div>
            </article>
          ))}
        </div>

        <div className="viewAll">
          <Link href="/products">View all products →</Link>
        </div>

        {/* Why Spring Street */}
        <div className="why">
          <div className="whyKicker">WHY SPRING STREET</div>
          <div className="whyTitle">Investing without borders</div>

          <div className="whyGrid">
            <div className="whyCard">
              <div className="whyH">Global Diversification</div>
              <div className="whyP">Access institutional-grade portfolios across world markets — not just one country.</div>
            </div>
            <div className="whyCard">
              <div className="whyH">Tax Optimized</div>
              <div className="whyP">Strategies designed around local tax regulations, so the returns you see are closer to net.</div>
            </div>
            <div className="whyCard">
              <div className="whyH">Long-term Growth</div>
              <div className="whyP">Build wealth for generations with proven ETF strategies, rebalanced to stay on track.</div>
            </div>
          </div>
        </div>

        {/* ── CTA card ── */}
        <div className="ctaCard">
          <div aria-hidden="true" className="ctaOverlay" />
          <div className="ctaContent">
            <div>
              <div className="ctaMini">GET STARTED</div>
              <div className="ctaTitle">Start your global journey.</div>
              <div className="ctaSub">Free to start. No lock-in. Cancel or switch strategies anytime.</div>
            </div>
            <div className="ctaBtns">
              <button className="ctaBtnGhost" type="button">Get Started with Invite code</button>
              <button className="ctaBtnPrimary" type="button">Request access</button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(html.light) {
          --bg: #f5f7fb;
          --panel: rgba(255, 255, 255, 0.9);
          --text: rgba(10, 20, 40, 0.95);
          --muted: rgba(10, 20, 40, 0.66);
          --border: rgba(10, 20, 40, 0.12);
          --shadow: 0 18px 60px rgba(0, 0, 0, 0.08);
          --accent: #316cb5;
          --accent2: #4a89dc;
          --good: #00a86b;
        }

        :global(html.dark) {
          --bg: #020c1f;
          --panel: rgba(255, 255, 255, 0.06);
          --text: rgba(255, 255, 255, 0.92);
          --muted: rgba(255, 255, 255, 0.62);
          --border: rgba(255, 255, 255, 0.12);
          --shadow: 0 18px 60px rgba(0, 0, 0, 0.22);
          --accent: #316cb5;
          --accent2: #4a89dc;
          --good: #00e87a;
        }

        .wrapOuter {
          background: var(--bg);
          padding: 28px 0 76px;
        }

        .wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 28px;
          color: var(--text);
          font-family: var(--font-dm, system-ui, -apple-system, Segoe UI, Roboto, Arial);
        }

        /* animations */
        .statCard, .productCard, .whyCard {
          transform: translateY(10px);
          opacity: 0;
          animation: rise 700ms ease forwards;
          animation-delay: 120ms;
        }
        .productCard:nth-child(2) { animation-delay: 200ms; }
        .productCard:nth-child(3) { animation-delay: 280ms; }
        @keyframes rise {
          to { transform: translateY(0); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .statCard, .productCard, .whyCard {
            animation: none; opacity: 1; transform: none;
          }
        }

        /* stats row */
        .statsRow {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-top: 10px;
        }
        .statCard {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 18px;
          box-shadow: var(--shadow);
        }
        .statValue { font-family: Georgia, serif !important; font-weight: 900; font-size: 30px; letter-spacing: -0.02em; }
        .statTitle { margin-top: 8px; font-weight: 900; font-size: 13px; }
        .statDesc  { margin-top: 6px; color: var(--muted); font-weight: 650; font-size: 12px; line-height: 1.7; }

        /* prisma family */
        .familyHead  { text-align: center; margin-top: 34px; }
        .familyTitle { font-family: Georgia, serif !important; font-weight: 900; letter-spacing: -0.02em; font-size: 22px; }
        .familySub   { margin-top: 8px; color: var(--muted); font-weight: 650; font-size: 12px; }

        .productGrid {
          margin-top: 18px;
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }
        .productCard {
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 16px;
          box-shadow: var(--shadow);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .productCard:hover { transform: translateY(-4px); border-color: rgba(99,102,241,0.25); }
        :global(html.dark) .productCard:hover { border-color: rgba(49,108,181,0.45); }

        .tag   { font-size: 10px; font-weight: 900; letter-spacing: 0.14em; color: var(--accent); }
        .pName { margin-top: 8px; font-weight: 900; font-size: 15px; }
        .pDesc { margin-top: 8px; color: var(--muted); font-weight: 650; font-size: 12px; line-height: 1.7; min-height: 78px; }

        .pMetrics { margin-top: 12px; display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; padding-top: 12px; border-top: 1px solid var(--border); }
        .metric .k { font-size: 11px; color: var(--muted); font-weight: 800; }
        .metric .v { margin-top: 4px; font-weight: 900; font-size: 14px; }
        .good { color: var(--good); }

        .spark     { margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border); }
        .since     { font-size: 10px; font-weight: 900; letter-spacing: 0.12em; color: var(--muted); }
        .sparkBox  { margin-top: 10px; height: 52px; color: var(--accent); }

        .pActions { display: flex; gap: 10px; margin-top: 14px; }
        .btnPrimary { background: var(--accent); color: #fff; border: none; border-radius: 10px; padding: 10px 12px; font-weight: 900; cursor: pointer; flex: 1; transition: background 0.2s; }
        .btnPrimary:hover { background: var(--accent2); }
        .btnGhost { background: transparent; color: var(--text); border: 1px solid var(--border); border-radius: 10px; padding: 10px 12px; font-weight: 900; cursor: pointer; width: 96px; transition: background 0.2s; }
        .btnGhost:hover { background: rgba(255,255,255,0.08); }
        :global(html.light) .btnGhost:hover { background: rgba(10,20,40,0.04); }

        .viewAll { text-align: center; margin-top: 14px; }
        .viewAll :global(a) { color: var(--accent); font-weight: 900; text-decoration: none; font-size: 12px; }

        /* why */
        .why      { margin-top: 44px; }
        .whyKicker { font-size: 10px; font-weight: 900; letter-spacing: 0.2em; color: var(--accent); text-align: left; }
        .whyTitle  { margin-top: 8px; font-family: Georgia, serif !important; font-weight: 900; font-size: 22px; }
        .whyGrid   { margin-top: 14px; display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 14px; }
        .whyCard   { background: var(--panel); border: 1px solid var(--border); border-radius: 14px; padding: 16px; box-shadow: var(--shadow); transition: transform 0.2s ease; }
        .whyCard:hover { transform: translateY(-3px); }
        .whyH { font-weight: 900; font-size: 14px; }
        .whyP { margin-top: 8px; color: var(--muted); font-weight: 650; font-size: 12px; line-height: 1.7; }

        /* ── CTA card — light mode matches screenshot exactly ── */
        .ctaCard {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          margin-top: 35px;

          /* light: soft blue-white gradient card */
background: linear-gradient(
  135deg,
  #e7f0fb 0%,
  #f4f8fd 40%,
  #fbfdff 100%
);
          border: 1px solid rgba(49, 108, 181, 0.18);
          box-shadow: 0 4px 24px rgba(49, 108, 181, 0.10);
        }

        /* dark: keep it dark/subtle */
        :global(html.dark) .ctaCard {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.10);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.30);
        }

        /* subtle radial glow on top of the gradient */
        .ctaOverlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(50rem 18rem at 15% -20%, rgba(49, 108, 181, 0.18), transparent 55%),
            radial-gradient(35rem 18rem at 90% 120%, rgba(76, 137, 220, 0.14), transparent 55%);
          pointer-events: none;
        }
        :global(html.dark) .ctaOverlay {
          background:
            radial-gradient(50rem 18rem at 15% -20%, rgba(49, 108, 181, 0.22), transparent 55%),
            radial-gradient(35rem 18rem at 90% 120%, rgba(76, 137, 220, 0.16), transparent 55%);
        }

        .ctaContent {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 28px 32px;
        }

        /* light: dark navy text from screenshot */
        .ctaMini  { font-size: 11px; font-weight: 700; letter-spacing: 0.14em; color: #4a6fa5; }
        .ctaTitle { margin-top: 5px; font-size: 17px; font-weight: 700; color: #0f1f3d; font-family: Georgia, serif; }
        .ctaSub   { margin-top: 4px; font-size: 13px; font-weight: 500; color: #4a5a72; }

        /* dark: white text */
        :global(html.dark) .ctaMini  { color: rgba(255, 255, 255, 0.55); }
        :global(html.dark) .ctaTitle { color: rgba(255, 255, 255, 0.93); }
        :global(html.dark) .ctaSub   { color: rgba(255, 255, 255, 0.60); }

        .ctaBtns { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; flex-shrink: 0; }

        /* "Request access" — solid blue pill (matches screenshot) */
        .ctaBtnPrimary {
          background: #2f6ab3;
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 9px 20px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.15s ease;
          white-space: nowrap;
        }
        .ctaBtnPrimary:hover { background: #3d7ec9; transform: translateY(-1px); }
        :global(html.dark) .ctaBtnPrimary { background: #316cb5; }
        :global(html.dark) .ctaBtnPrimary:hover { background: #4a89dc; }

        /* "See portfolios" / "Get Started" — white outlined pill (matches screenshot) */
        .ctaBtnGhost {
          background: #ffffff;
          color: #1e3a5f;
          border: 1.5px solid #c8d8ec;
          border-radius: 999px;
          padding: 9px 20px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.15s ease;
          white-space: nowrap;
        }
        .ctaBtnGhost:hover { background: #f0f6ff; border-color: #a0bcd8; transform: translateY(-1px); }
        :global(html.dark) .ctaBtnGhost {
          background: rgba(255, 255, 255, 0.07);
          color: rgba(255, 255, 255, 0.88);
          border-color: rgba(255, 255, 255, 0.18);
        }
        :global(html.dark) .ctaBtnGhost:hover { background: rgba(255, 255, 255, 0.12); }

        @media (max-width: 768px) {
          .ctaContent { flex-direction: column; align-items: flex-start; padding: 22px 20px; }
          .ctaBtns { width: 100%; }
        }

        @media (max-width: 980px) {
          .statsRow, .productGrid, .whyGrid { grid-template-columns: 1fr; }
        }

        @media (max-width: 520px) {
          .wrap { padding: 0 16px; }
        }
      `}</style>
    </section>
  );
}
