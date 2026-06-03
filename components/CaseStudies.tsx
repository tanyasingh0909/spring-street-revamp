"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

// ─── Data ─────────────────────────────────────────────────────────────────────

const usTechData = [
  { date: "2013", xlk: 100, spy: 100, nifty: 100 },
  { date: "2014", xlk: 138, spy: 128, nifty: 132 },
  { date: "2015", xlk: 148, spy: 131, nifty: 128 },
  { date: "2016", xlk: 162, spy: 139, nifty: 135 },
  { date: "2017", xlk: 230, spy: 170, nifty: 162 },
  { date: "2018", xlk: 248, spy: 162, nifty: 168 },
  { date: "2019", xlk: 340, spy: 213, nifty: 196 },
  { date: "2020", xlk: 510, spy: 252, nifty: 208 },
  { date: "2021", xlk: 720, spy: 326, nifty: 278 },
  { date: "2022", xlk: 620, spy: 270, nifty: 295 },
  { date: "2023", xlk: 900, spy: 340, nifty: 358 },
  { date: "2024", xlk: 1650, spy: 480, nifty: 450 },
  { date: "2026", xlk: 2750, spy: 1380, nifty: 590 },
];

const diversificationData = [
  { date: "Mar 23", dax: 100, nifty: 100, mchi: 100 },
  { date: "Jun 23", dax: 108, nifty: 105, mchi: 94 },
  { date: "Sep 23", dax: 112, nifty: 110, mchi: 88 },
  { date: "Nov 23", dax: 118, nifty: 115, mchi: 85 },
  { date: "Feb 24", dax: 128, nifty: 122, mchi: 90 },
  { date: "Jun 24", dax: 138, nifty: 132, mchi: 96 },
  { date: "Sep 24", dax: 158, nifty: 138, mchi: 102 },
  { date: "Jan 25", dax: 172, nifty: 140, mchi: 118 },
  { date: "Apr 25", dax: 188, nifty: 142, mchi: 128 },
  { date: "Sep 25", dax: 210, nifty: 143, mchi: 148 },
  { date: "Jan 26", dax: 228, nifty: 142, mchi: 155 },
  { date: "Apr 26", dax: 222, nifty: 138, mchi: 138 },
];

const goldData = [
  { date: "Feb 24", goldbees: 100, gldm: 100 },
  { date: "Apr 24", goldbees: 108, gldm: 112 },
  { date: "Jun 24", goldbees: 112, gldm: 118 },
  { date: "Aug 24", goldbees: 118, gldm: 128 },
  { date: "Oct 24", goldbees: 125, gldm: 140 },
  { date: "Jan 25", goldbees: 138, gldm: 160 },
  { date: "Mar 25", goldbees: 148, gldm: 178 },
  { date: "Jun 25", goldbees: 162, gldm: 200 },
  { date: "Aug 25", goldbees: 178, gldm: 220 },
  { date: "Nov 25", goldbees: 195, gldm: 248 },
  { date: "Jan 26", goldbees: 215, gldm: 262 },
  { date: "Mar 26", goldbees: 228, gldm: 272 },
  { date: "Apr 26", goldbees: 232, gldm: 268 },
];

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="cs-tooltip">
      <p className="cs-tooltip-label">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color, margin: "2px 0", fontSize: 12, fontFamily: "DM Sans, sans-serif" }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
      <style jsx>{`
        .cs-tooltip {
          background: var(--tooltip-bg);
          border: 1px solid var(--tooltip-border);
          border-radius: 10px;
          padding: 10px 14px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .cs-tooltip-label {
          font-size: 11px;
          font-weight: 600;
          color: var(--tooltip-text);
          margin: 0 0 6px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-family: "DM Sans", sans-serif;
        }
      `}</style>
    </div>
  );
};

// ─── Individual chart blocks ───────────────────────────────────────────────────

function ChartBlock({
  tag,
  icon,
  accentColor,
  title,
  body,
  note,
  chart,
  reverse,
}: {
  tag: string;
  icon: string;
  accentColor: string;
  title: string;
  body: string;
  note: string;
  chart: React.ReactNode;
  reverse?: boolean;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={`cb-row ${reverse ? "cb-row--reverse" : ""} ${visible ? "cb-row--visible" : ""}`}
      ref={(el) => {
        if (!el) return;
        const obs = new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
          { threshold: 0.2 }
        );
        obs.observe(el);
      }}
    >
      {/* Text panel */}
      <div className="cb-text">
        <div className="cb-tag-row">
          <span className="cb-icon" style={{ background: `${accentColor}18`, color: accentColor }}>{icon}</span>
          <span className="cb-tag" style={{ color: accentColor }}>{tag}</span>
        </div>
        <h3 className="cb-title">{title}</h3>
        <p className="cb-body">{body}</p>
      </div>

      {/* Chart panel */}
      <div className="cb-chart-wrap">
        <p className="cb-note">{note}</p>
        <div className="cb-chart">
          {visible ? chart : <div style={{ height: 300 }} />}
        </div>
      </div>

      <style jsx>{`
        .cb-row {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 0;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--cs-border);
          background: var(--cs-card-bg);
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .cb-row--visible {
          opacity: 1;
          transform: translateY(0);
        }
        .cb-row--reverse {
          grid-template-columns: 1.6fr 1fr;
        }
        .cb-row--reverse .cb-text { order: 2; }
        .cb-row--reverse .cb-chart-wrap { order: 1; }

        .cb-text {
          padding: 40px 36px;
          background: var(--cs-panel-left);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
        }

        .cb-tag-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cb-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
        }

        .cb-tag {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-family: "DM Sans", sans-serif;
        }

        .cb-title {
  font-family: Georgia, serif !important;
          font-size: 22px;
          font-weight: 800;
          color: var(--cs-title);
          line-height: 1.25;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .cb-body {
          font-family: "DM Sans", sans-serif;
          font-size: 13.5px;
          line-height: 1.7;
          color: var(--cs-body);
          margin: 0;
          font-weight: 300;
        }

        .cb-chart-wrap {
          padding: 24px 24px 20px;
          background: var(--cs-card-bg);
          display: flex;
          flex-direction: column;
        }

        .cb-note {
          font-size: 11px;
          color: var(--cs-note);
          text-align: center;
          margin: 0 0 12px;
          font-family: "DM Sans", sans-serif;
          letter-spacing: 0.02em;
        }

        .cb-chart {
          flex: 1;
        }

        @media (max-width: 800px) {
          .cb-row, .cb-row--reverse {
            grid-template-columns: 1fr;
          }
          .cb-row--reverse .cb-text { order: 1; }
          .cb-row--reverse .cb-chart-wrap { order: 2; }
          .cb-text { padding: 28px 24px; }
        }
      `}</style>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function CaseStudies() {
  return (
    <section className="cs-section">
      <h2 className="cs-heading">The case for global investing is structural</h2>
      <p className="cs-sub">Real data. Real divergence. Real opportunity.</p>

      <div className="cs-stack">

        {/* Block 1 — US Tech */}
        <ChartBlock
          tag="Global Tech vs Indian Markets"
          icon="↗"
          accentColor="#3b82f6"
          title="The US Advantage"
          body="Global technology companies are driving the future. By limiting yourself to domestic markets, you miss out on this generational growth opportunity."
          note="Adjusted Closing Prices Rebased to 100, in INR currency"
          chart={
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={usTechData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gXlk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gSpy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gNifty" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(150,150,150,0.1)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={42} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, fontFamily: "DM Sans, sans-serif" }} />
                <Area type="monotone" dataKey="xlk" name="US Tech (XLK)" stroke="#3b82f6" strokeWidth={2} fill="url(#gXlk)" dot={false} animationDuration={1400} animationEasing="ease-out" />
                <Area type="monotone" dataKey="spy" name="S&P 500 (SPY)" stroke="#10b981" strokeWidth={2} fill="url(#gSpy)" dot={false} animationDuration={1600} animationEasing="ease-out" />
                <Area type="monotone" dataKey="nifty" name="NIFTY 50" stroke="#f59e0b" strokeWidth={2} fill="url(#gNifty)" dot={false} animationDuration={1800} animationEasing="ease-out" />
              </AreaChart>
            </ResponsiveContainer>
          }
        />

        {/* Block 2 — Diversification (reversed) */}
        <ChartBlock
          reverse
          tag="Don't bet on just one country"
          icon="⊕"
          accentColor="#10b981"
          title="Diversification across top economies"
          body="Over the last two years, the two biggest economies after US — China and Germany — delivered >70% Total Returns."
          note="Adjusted Closing Prices Rebased to 100, in INR currency"
          chart={
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={diversificationData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gDax" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gNifty2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gMchi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(150,150,150,0.1)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={42} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, fontFamily: "DM Sans, sans-serif" }} />
                <Area type="monotone" dataKey="dax" name="Germany (DAX)" stroke="#10b981" strokeWidth={2} fill="url(#gDax)" dot={false} animationDuration={1400} animationEasing="ease-out" />
                <Area type="monotone" dataKey="nifty" name="India (NIFTY)" stroke="#f59e0b" strokeWidth={2} fill="url(#gNifty2)" dot={false} animationDuration={1600} animationEasing="ease-out" />
                <Area type="monotone" dataKey="mchi" name="China (MCHI)" stroke="#ef4444" strokeWidth={2} fill="url(#gMchi)" dot={false} animationDuration={1800} animationEasing="ease-out" />
              </AreaChart>
            </ResponsiveContainer>
          }
        />

        {/* Block 3 — Gold */}
        <ChartBlock
          tag="Case Study: Gold"
          icon="◎"
          accentColor="#f59e0b"
          title="The same asset, two different returns."
          body="In July 2024, the Indian government cut the import duty on gold from 15% to 6%. This policy change along with higher expense ratio and tracking error resulted in 25% performance divergence in domestic gold vs global counterparts."
          note="Adjusted Closing Prices Rebased to 100, in INR currency"
          chart={
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={goldData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gGldm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gGoldbees" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.22} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(150,150,150,0.1)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} width={42} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12, fontFamily: "DM Sans, sans-serif" }} />
                <Area type="monotone" dataKey="gldm" name="GLDM" stroke="#3b82f6" strokeWidth={2} fill="url(#gGldm)" dot={false} animationDuration={1400} animationEasing="ease-out" />
                <Area type="monotone" dataKey="goldbees" name="GOLDBEES" stroke="#f59e0b" strokeWidth={2} fill="url(#gGoldbees)" dot={false} animationDuration={1600} animationEasing="ease-out" />
              </AreaChart>
            </ResponsiveContainer>
          }
        />
      </div>

      <style jsx>{`
        :global(html.dark) {
          --cs-section-bg: #020c1f;
          --cs-heading-color: rgba(255,255,255,0.95);
          --cs-sub-color: rgba(255,255,255,0.38);
          --cs-border: rgba(255,255,255,0.07);
          --cs-card-bg: rgba(255,255,255,0.03);
          --cs-panel-left: rgba(255,255,255,0.05);
          --cs-title: rgba(255,255,255,0.93);
          --cs-body: rgba(255,255,255,0.44);
          --cs-note: rgba(255,255,255,0.28);
          --tooltip-bg: #0f1e35;
          --tooltip-border: rgba(255,255,255,0.1);
          --tooltip-text: rgba(255,255,255,0.9);
        }
        :global(html.light) {
          --cs-section-bg: #f4f6fb;
          --cs-heading-color: #0b1f3a;
          --cs-sub-color: #64748b;
          --cs-border: rgba(0,0,0,0.08);
          --cs-card-bg: #ffffff;
          --cs-panel-left: #f0f2f8;
          --cs-title: #0b1f3a;
          --cs-body: #4a5568;
          --cs-note: #94a3b8;
          --tooltip-bg: #ffffff;
          --tooltip-border: rgba(0,0,0,0.1);
          --tooltip-text: #0b1f3a;
        }

        .cs-section {
          background: var(--cs-section-bg);
          padding: 100px 48px 88px;
          transition: background 0.3s;
        }

        .cs-heading {
  font-family: Georgia, serif !important;

  font-size: clamp(28px, 3.2vw, 44px);
          font-weight: 800;
          color: var(--cs-heading-color);
          text-align: center;
          margin: 0 0 12px;
          letter-spacing: -0.025em;
        }

        .cs-sub {
          text-align: center;
          font-size: 15px;
          color: var(--cs-sub-color);
          margin: 0 0 60px;
          font-family: "DM Sans", sans-serif;
          font-weight: 300;
        }

        .cs-stack {
          display: flex;
          flex-direction: column;
          gap: 28px;
          max-width: 1160px;
          margin: 0 auto;
        }

        :global(.recharts-legend-item-text) {
          color: var(--cs-body) !important;
          font-family: "DM Sans", sans-serif !important;
          font-size: 12px !important;
        }

        @media (max-width: 768px) {
          .cs-section { padding: 64px 20px 56px; }
        }
      `}</style>
    </section>
  );
}
