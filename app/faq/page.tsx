"use client";

import { useMemo, useState } from "react";

type Faq = { q: string; a: string };

export default function FAQPage() {
  const faqs: Faq[] = useMemo(
    () => [
      {
        q: "What is Spring Street?",
        a: "Spring Street is a global investment management platform built for Indian investors and NRIs to make global investing simple and easy. We are building an integrated platform that simplifies remittances, tax and compliance for simpler access while developing in-house products “Prisma” that helps you grow your wealth globally.",
      },
      {
        q: "What is Prisma? What does Prisma invest in?",
        a: "Prisma is Spring Street family of globally diversified portfolios built on a proprietary methodology combining powerful quantitative research and market expertise.Prisma products invest in listed stocks and ETFs that give you exposure across the world (not limited to the US).Our team of researchers and experts develop portfolios that adopt a systematic framework that optimizes returns by diversifying across US, Europe, China, Japan, Latin America and other growing markets across the globe.Prismas are rebalanced periodically like any fund/PMS with no intervention needed from the customer.",
      },
      {
        q: "What is the minimum investment size to invest in Prisma?",
        a: "Minimums can vary by product. A common starting point is ₹10,000. You can add more over time based on your plan.",
      },
      {
        q: "How does Spring Street enable resident Indians to invest globally?",
        a: "Yow does Spring Street enable resident Indians to invest globally?We have partnered with ViewTrade, a leading global brokerage service provider, to offer Prisma through our seamless platform. ViewTrade is regulated by IFSCA in GIFT City and carries a GAP licence to operate in GIFT City.A resident Indian can now seamlessly open a brokerage account through our portal and start investing in Prisma.The platform enables digital remittances for HDFC, Axis and ICICI bank customers.",
      },
      {
        q: "What is GIFT City?",
        a: "GIFT City is a financial services hub in India that hosts regulated international financial services entities.",
      },
      {
        q: "What is ViewTrade’s role?",
        a: "ViewTrade (or the selected broker partner) supports execution and brokerage infrastructure depending on the product flow.",
      },
      {
        q: "Where are my assets held?",
        a: "Your assets are held with regulated intermediaries/custodians as per the product structure and onboarding flow.",
      },
      {
        q: "What happens to my investments if Spring Street, as a firm, or broker ceases to operate?",
        a: "Your assets are segregated with regulated intermediaries. The continuity process depends on the custody/broker structure; we design flows to protect client holdings.",
      },
      {
        q: "What documents do I need for onboarding?",
        a: "Typically: PAN, address proof, bank details, and KYC documents. Exact requirements may vary by product and regulatory needs.",
      },
      {
        q: "How long does account opening take?",
        a: "Most accounts are opened within a few business days depending on document verification and bank processing timelines.",
      },
      {
        q: "Can I invest via an entity? Can NRIs invest through Spring Street?",
        a: "Entity and NRI availability depends on product and compliance requirements. Share your details and we’ll confirm eligibility.",
      },
      {
        q: "How do I fund my account from India?",
        a: "Funding is typically via bank transfer as per the approved remittance route. We provide step-by-step guidance during onboarding.",
      },
      {
        q: "What is the LRS, and how does it work for global investing?",
        a: "LRS is a permitted remittance scheme for resident Indians to invest abroad subject to RBI rules and bank processing.",
      },
      {
        q: "How do I know my remittance has gone through?",
        a: "You’ll see bank confirmation/UTR plus updates inside the platform once funds are credited and reconciled.",
      },
      {
        q: "Can I withdraw, and how long does it take?",
        a: "Yes. Timelines depend on market settlement and bank transfer processing. We’ll show expected timelines during withdrawal.",
      },
      {
        q: "How are returns from global investments taxed for an Indian resident? Will I face double taxation on global holdings?",
        a: "Taxation depends on instrument type and holding period. Some cases may have treaty benefits. Please consult a tax advisor for your situation.",
      },
      {
        q: "Will TCS be deducted on my remittance?",
        a: "TCS rules can apply depending on purpose and thresholds. Your bank typically applies it as per regulations.",
      },
      {
        q: "Does Spring Street provide tax statements?",
        a: "We provide transaction-level reporting and partner statements where applicable. Specific formats depend on product and provider.",
      },
      {
        q: "Who do I contact for help?",
        a: "You can reach us at hello@springstreet.in. For account-specific queries, use the Contact page form.",
      },
    ],
    []
  );

  const [open, setOpen] = useState<number | null>(0);
  const [expanded, setExpanded] = useState(false); 

  const visibleFaqs = expanded ? faqs : faqs.slice(0, 5);

  return (
    <main className="page">
      <div className="wrap">
        <div className="grid">
          {/* Left column like SS18 */}
          <aside className="left">
            <div className="mini">FAQ</div>
            <h1 className="h1">Common questions</h1>
            <p className="sub">
              Everything you need to know about Prisma, GIFT City, ViewTrade, funding, taxes, and getting
              started.
            </p>
          </aside>

          {/* Right column accordions */}
          <section className="right" aria-label="FAQ list">
            {visibleFaqs.map((f, idx) => {
              const isOpen = open === idx;
              return (
                <button
                  key={f.q}
                  className={`item ${isOpen ? "open" : ""}`}
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                >
                  <div className="q">
                    <span>{f.q}</span>
                    <span className="chev" aria-hidden="true">
                      ⌄
                    </span>
                  </div>
                  <div className="a">{f.a}</div>
                </button>
              );
            })}

            <div className="moreRow">
              <button className="more" type="button" onClick={() => setExpanded((v) => !v)}>
                {expanded ? "View less  ↑" : "View more  ↓"}
              </button>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        :global(html.dark) {
          --bg: #efece6;
          --panel: rgba(255, 255, 255, 0.06);
          --text: rgba(255, 255, 255, 0.92);
          --muted: rgba(255, 255, 255, 0.65);
          --border: rgba(255, 255, 255, 0.12);
          --card: rgba(255, 255, 255, 0.05);
          --accent: #316cb5;
         
        }

        :global(html.light) {
          --bg:  rgba(255, 255, 255, 0.05);
          --panel: rgba(10, 20, 40, 0.03);
          --text: rgba(10, 20, 40, 0.95);
          --muted: rgba(10, 20, 40, 0.62);
          --border: rgba(10, 20, 40, 0.12);
          --card: rgba(255, 255, 255, 0.9);
          --accent: #316cb5;
        }

        .page {
          background: var(--bg);
          min-height: 100vh;
          padding: 44px 0 70px;
          font-family: var(--font-dm, system-ui, -apple-system, Segoe UI, Roboto, Arial);
          color: var(--text);
        }

        /* in dark mode we keep the same beige background but text becomes white;
           this matches your “same UI” direction while still being readable */
        :global(html.dark) .page {
          background: linear-gradient(180deg, rgba(6, 19, 38, 1), rgba(6, 19, 38, 1));
        }

        .wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 28px;
        }

        .grid {
          display: grid;
          grid-template-columns: 0.33fr 0.67fr;
          gap: 18px;
          align-items: start;
        }

        .left {
          padding: 10px 0;
        }
.mini {
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: var(--accent);
  text-transform: uppercase;
}
.h1 {
  margin: 8px 0 10px;
  font-family: var(--font-syne);
  font-size: 3rem;          
  font-weight: 560;      
  line-height: 1.05;
  letter-spacing: -0.04em;  
  color: var(--text);
}
  
  @media (max-width: 768px) {
  .h1 {
    font-size: 2.25rem;
  }
}

        .sub {
          margin: 0;
          color: var(--muted);
          font-weight: 600;
          line-height: 1.7;
          max-width: 320px;
          font-size: 13px;
        }

       .right {
  position: relative;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);

  box-shadow:
    0 0 0 1px rgba(49, 108, 181, 0.05),
    0 0 30px rgba(49, 108, 181, 0.12),
    0 0 80px rgba(49, 108, 181, 0.08);
}

        .item {
          width: 100%;
          text-align: left;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--border);
          padding: 14px 16px;
          cursor: pointer;
        }

        .q {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-weight: 900;
          font-size: 13px;
        }

        .chev {
          transition: transform 0.2s ease;
          opacity: 0.7;
        }

        .a {
          max-height: 0;
          overflow: hidden;
          color: var(--muted);
          font-weight: 500;
          line-height: 1.7;
          font-size: 13px;
          transition: max-height 0.25s ease, margin-top 0.25s ease;
          margin-top: 0;
        }

        .item.open .a {
          max-height: 240px;
          margin-top: 10px;
        }

        .item.open .chev {
          transform: rotate(180deg);
        }

        .moreRow {
          display: flex;
          justify-content: center;
          padding: 14px;
        }

        .more {
  border: 1px solid rgba(49, 108, 181, 0.25);
  background: linear-gradient(
    135deg,
    #316cb5 0%,
    #3f7ac3 100%
  );
  color: white;
  border-radius: 10px;
  padding: 8px 16px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow:
    0 0 12px rgba(49, 108, 181, 0.18),
    0 0 30px rgba(49, 108, 181, 0.08);
}

.more:hover {
  transform: translateY(-2px);
  background: linear-gradient(
    135deg,
    #3f7ac3 0%,
    #4a86d0 100%
  );
  box-shadow:
    0 0 20px rgba(49, 108, 181, 0.35),
    0 0 50px rgba(49, 108, 181, 0.18);
}

        @media (max-width: 980px) {
          .grid {
            grid-template-columns: 1fr;
          }
          .sub {
            max-width: 100%;
            font-weight:600;
            margin: 14px 0 0;
            
          }
        }

        @media (max-width: 520px) {
          .wrap {
            padding: 0 16px;
          }
        }
      `}</style>
    </main>
  );
}