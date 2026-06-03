"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const onChange =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
    };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! (demo)");
    setForm({ fullName: "", email: "", phone: "", message: "" });
  };

  return (
    <main className="page">
      {/* Top banner */}
      <section className="banner">
        <div className="wrap">
          <div className="kicker">CONTACT</div>
          <h1 className="title">
            Let&apos;s talk about <span className="accent">your global journey.</span>
          </h1>
          <p className="subtitle">Have questions about global investing? We&apos;re here to help!</p>

          <button className="btn-access" type="button">
            Request access
          </button>
        </div>
      </section>

      {/* Contact card */}
      <section className="section">
        <div className="wrap">
          <div className="card">
            <div className="left">
              <div className="mini">GET IN TOUCH</div>
              <h2 className="h2">Let&apos;s Start a Conversation</h2>
              <p className="p">
                Our investment experts are here to help you achieve your financial goals.
              </p>

              <div className="info">
                <div className="row">
                  <div className="icon" aria-hidden="true">
                    ✉
                  </div>
                  <div>
                    <div className="label">Email</div>
                    <div className="value">hello@springstreet.in</div>
                  </div>
                </div>

                <div className="row">
                  <div className="icon" aria-hidden="true">
                    ☎
                  </div>
                  <div>
                    <div className="label">Phone</div>
                    <div className="value">+91 79 0189 7503</div>
                  </div>
                </div>

                <div className="row">
                  <div className="icon" aria-hidden="true">
                    ⌂
                  </div>
                  <div>
                    <div className="label">Address</div>
                    <div className="value">
                      VIOS Tower
                      <br />
                      Wadala,Mumbai
                      <br />
                      Mumbai, Maharashtra MH-400037
                    </div>
                  </div>
                </div>
              </div>

              <div className="note">We typically respond within 24 hours</div>
            </div>

            <form className="right" onSubmit={onSubmit}>
              <input
                className="input"
                placeholder="Full Name"
                value={form.fullName}
                onChange={onChange("fullName")}
                required
              />
              <input
                className="input"
                placeholder="Email Address"
                value={form.email}
                onChange={onChange("email")}
                type="email"
                required
              />
              <input
                className="input"
                placeholder="Phone Number"
                value={form.phone}
                onChange={onChange("phone")}
              />
              <textarea
                className="textarea"
                placeholder="Your Message"
                value={form.message}
                onChange={onChange("message")}
                required
              />
              <button className="btn-send" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* SS17: FAQ CTA at end */}
      <section className="faqCta">
        <div className="wrap">
          <div className="faqCard">
            <div>
              <div className="faqMini">FAQ</div>
              <div className="faqTitle">Common Questions</div>
              <div className="faqSub">
                Looking for quick answers? Check out our frequently asked questions.
              </div>
            </div>

         <Link
  className="faqBtn"
  href="/faq"
  style={{ background: "red", color: "white", padding: "20px" }}
>
  Visit Help Center
</Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        :global(html.dark) {
          --bg: #061326;
          --banner: #071a3a;
          --text: rgba(255, 255, 255, 0.92);
          --muted: rgba(255, 255, 255, 0.68);
          --border: rgba(255, 255, 255, 0.12);
          --card: rgba(255, 255, 255, 0.06);
          --panel: rgba(255, 255, 255, 0.05);
          --accent-hover: #1f6ef5;


          --accentBlue: #316cb5;
          --send: #00c96a;
          --send2: #00e87a;

          --ctaBg: rgba(255, 255, 255, 0.06);
        }

        :global(html.light) {
          --bg: #f5f7fb;
          --banner: #efece6;
          --text: rgba(10, 20, 40, 0.95);
          --muted: rgba(10, 20, 40, 0.68);
          --border: rgba(10, 20, 40, 0.12);
          --card: rgba(255, 255, 255, 0.9);
          --panel: rgba(10, 20, 40, 0.04);

          --accentBlue: #316cb5;
          --send: #00c96a;
          --send2: #00b85f;

          --ctaBg: rgba(255, 255, 255, 0.9);
        }

        .page {
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          font-family: var(--font-dm, system-ui, -apple-system, Segoe UI, Roboto, Arial);
        }

        .wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 28px;
        }

        .banner {
          background: var(--bg);
          padding: 64px 0 52px;
        }

        .kicker {
          font-size: 15px;
          font-weight: 900;
          letter-spacing: 0.2em;
          color: var(--accentBlue);
          margin-bottom: 10px;
        }

        .title {
          font-family: var(--font-syne, system-ui, -apple-system, Segoe UI, Roboto, Arial);
          margin: 0;
          font-size: clamp(30px, 4vw, 52px);
          line-height: 1.05;
          letter-spacing: -0.03em;
        }

        .accent {
          color: var(--accentBlue);
        }

        .subtitle {
          margin: 14px 0 0;
          color: var(--muted);
          font-weight: 600;
          max-width: 560px;
          line-height: 1.7;
        }

        .btn-access {
          margin-top: 18px;
          background: var(--accentBlue);
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 10px 14px;
          font-weight: 800;
          cursor: pointer;
        }

         .btn-access:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }

        .section {
          padding: 34px 0 34px;
        }

        .card {
          margin-top: -22px;
          border: 1px solid var(--border);
          border-radius: 18px;
          overflow: hidden;
          background: var(--card);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.08);
          display: grid;
          grid-template-columns: 0.45fr 0.55fr;
        }

        .left {
          background: linear-gradient(180deg, var(--panel), transparent 70%);
          padding: 28px;
        }

        .mini {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.16em;
          color: rgba(49, 108, 181, 0.75);
        }
        :global(html.dark) .mini {
          color: rgba(255, 255, 255, 0.55);
        }

        .h2 {
          margin: 10px 0 10px;
          font-family: var(--font-syne, system-ui, -apple-system, Segoe UI, Roboto, Arial);
          font-size: 28px;
          letter-spacing: -0.02em;
        }

        .p {
          margin: 0;
          color: var(--muted);
          line-height: 1.75;
          font-weight: 600;
          max-width: 420px;
        }

        .info {
          margin-top: 18px;
          display: grid;
          gap: 14px;
        }

        .row {
          display: grid;
          grid-template-columns: 34px 1fr;
          gap: 12px;
          align-items: start;
        }

        .icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.25);
        }
        :global(html.dark) .icon {
          background: rgba(255, 255, 255, 0.06);
        }

        .label {
          font-size: 12px;
          font-weight: 900;
          color: var(--text);
          opacity: 0.9;
        }

        .value {
          margin-top: 4px;
          color: var(--muted);
          font-weight: 650;
          line-height: 1.6;
          font-size: 13px;
        }

        .note {
          margin-top: 16px;
          font-size: 12px;
          font-weight: 700;
          color: var(--muted);
        }

        .right {
          padding: 28px;
          display: grid;
          gap: 14px;
          background: rgba(255, 255, 255, 0.55);
        }
        :global(html.dark) .right {
          background: rgba(255, 255, 255, 0.03);
        }

        .input,
        .textarea {
          width: 100%;
          border-radius: 12px;
          border: 1px solid var(--border);
          padding: 14px 14px;
          font-size: 14px;
          font-weight: 650;
          outline: none;
          background: rgba(255, 255, 255, 0.9);
          color: rgba(10, 20, 40, 0.92);
    
        }
    .input:focus,
.textarea:focus {
  border-color: var(--accentBlue);
          box-shadow:
    0 0 0 1px rgba(49, 108, 181, 0.25),
    0 0 15px rgba(49, 108, 181, 0.20),
    0 0 35px rgba(49, 108, 181, 0.15);
      }
        :global(html.dark) .input,
        :global(html.dark) .textarea {
          background: rgba(0, 0, 0, 0.22);
          color: rgba(255, 255, 255, 0.9);
        }

        .textarea {
          min-height: 140px;
          resize: vertical;
        }

        .input:focus,
        .textarea:focus {
          border-color: rgba(0, 201, 106, 0.55);
          box-shadow: #316cb5
        }

        .btn-send {
          margin-top: 4px;
          background: var(--accentBlue);
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 14px 16px;
          font-weight: 900;
          cursor: pointer;
          transition: transform 0.15s ease, background 0.2s ease;
        }
        

        .btn-send:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }

        /* SS17 CTA section */
        .faqCta {
          padding: 25px 0 70px;
          background: var(--bg);
        }
.faqCard {
  position: relative;
  overflow: hidden;

  background: linear-gradient(
    135deg,
    #e7f0fb 0%,
    #f4f8fd 40%,
    #fbfdff 100%
  );

  border: 1px solid rgba(49, 108, 181, 0.12);
  border-radius: 16px;
  padding: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  box-shadow: 0 4px 24px rgba(49, 108, 181, 0.08);
}
  :global(html.dark) .faqCard {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.30);
}
  .faqCard::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;

  background:
    radial-gradient(
      50rem 18rem at 15% -20%,
      rgba(49, 108, 181, 0.18),
      transparent 55%
    ),
    radial-gradient(
      35rem 18rem at 90% 120%,
      rgba(76, 137, 220, 0.14),
      transparent 55%
    );
}
    

        .faqMini {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.2em;
          color: var(--accentBlue);
        }

        .faqTitle {
          margin-top: 6px;
  font-family: Georgia, serif !important;
              font-size: 20px;
          font-weight: 900;
        }

        .faqSub {
          margin-top: 6px;
          color: var(--muted);
          font-weight: 650;
          font-size: 13px;
        }
:global(.faqBtn) {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: var(--accentBlue) !important;
  color: #fff !important;
  text-decoration: none;

  text-decoration: none;

  padding: 8px 18px;
  border-radius: 10px;

  font-size: 13px;
  font-weight: 800;

  transition: all 0.25s ease;
}

:global(.faqBtn:hover) {
  background: #255ea6 !important;
  color: #fff !important;
  transform: translateY(-2px);
}

        @media (max-width: 980px) {
          .card {
            grid-template-columns: 1fr;
          }
          .banner {
            padding: 46px 0 42px;
          }
        }

        @media (max-width: 520px) {
          .wrap {
            padding: 0 16px;
          }
          .left,
          .right {
            padding: 18px;
          }
          .faqCard {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </main>
  );
}