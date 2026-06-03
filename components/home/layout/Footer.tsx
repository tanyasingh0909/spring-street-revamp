"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="top">
          <div className="col">
            <div className="h">Company</div>
            <a className="a" href="#">
              Home
            </a>
            <a className="a" href="#">
              About Us
            </a>
            <a className="a" href="#">
              Why Global?
            </a>
            <a className="a" href="#">
              Products
            </a>
            <a className="a" href="#">
              Contact
            </a>
          </div>

          <div className="col">
            <div className="h">Contact</div>
            <a className="a" href="mailto:hello@springstreet.in">
              hello@springstreet.in
            </a>
            <a className="a" href="tel:+917908987503">
              +91 79 0898 7503
            </a>
            <div className="t">VIOS Tower, Wadala</div>
            <div className="t">Mumbai, MH-400037</div>
          </div>

          <div className="col">
            <div className="h">Legal</div>
            <a className="a" href="#">
              Privacy Policy
            </a>
            <a className="a" href="#">
              Terms &amp; Conditions
            </a>
            <a className="a" href="#">
              Risk Disclosure
            </a>
            <a className="a" href="#">
              Grievance Redressal
            </a>
          </div>

          <div className="col">
            <div className="h">Follow Us</div>
            <div className="social">
              <a className="icon" href="#" aria-label="X / Twitter">
                {/* X icon */}
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                  <path
                    d="M17.7 3H20l-6.9 7.9L21.2 21H15l-4.9-6.1L4.7 21H2.4l7.4-8.6L2 3h6.4l4.4 5.6L17.7 3Zm-0.8 16.5h1.3L7.1 4.4H5.7l11.2 15.1Z"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a className="icon" href="#" aria-label="LinkedIn">
                {/* LinkedIn icon */}
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                  <path
                    d="M6.4 6.9a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2ZM4.7 21V9h3.4v12H4.7Zm5.6 0V9h3.2v1.6h.05c.44-.83 1.52-1.7 3.14-1.7 3.36 0 4 2.2 4 5.06V21h-3.4v-5.33c0-1.27-.02-2.9-1.77-2.9s-2.04 1.38-2.04 2.8V21h-3.2Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>

            <div className="tagline">Global Stage for Indian Capital</div>
          </div>
        </div>

        <div className="divider" />

        <div className="bottom">
          <div className="brand">
            <Image src="/logo.png" alt="Spring Street" width={160} height={44} />
          </div>

          <p className="disclaimer">
            All investing involves risk, including loss of capital. Past performance does not guarantee
            future performance. Historical and expected returns are for illustrative purposes only.
            Investments in securities market are subject to market risks.
          </p>
        </div>
      </div>

      <style jsx>{`
        :global(html.dark) {
          --ft-bg: #0b0f16;
          --ft-top: rgba(255, 255, 255, 0.06);
          --ft-border: rgba(255, 255, 255, 0.12);
          --ft-text: rgba(255, 255, 255, 0.86);
          --ft-muted: rgba(255, 255, 255, 0.62);
          --ft-muted2: rgba(255, 255, 255, 0.45);
        }

        :global(html.light) {
          --ft-bg: #0b2340; /* matches your light-mode navbar navy */
          --ft-top: rgba(255, 255, 255, 0.06);
          --ft-border: rgba(255, 255, 255, 0.14);
          --ft-text: rgba(255, 255, 255, 0.9);
          --ft-muted: rgba(255, 255, 255, 0.68);
          --ft-muted2: rgba(255, 255, 255, 0.5);
        }

        .footer {
          margin-top: 0;
          background: var(--ft-bg);
          color: var(--ft-text);
        }

        .wrap {
          max-width: 1240px;
          margin: 0 auto;
          padding: 44px 28px 34px;
        }

        .top {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 28px;
          padding-bottom: 28px;
        }

        .h {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: none;
          margin-bottom: 14px;
          color: var(--ft-text);
        }

        .a {
          display: block;
          text-decoration: none;
          color: var(--ft-muted);
          font-size: 13px;
          font-weight: 600;
          margin: 10px 0;
          transition: color 0.2s ease;
        }

        .a:hover {
          color: var(--ft-text);
        }

        .t {
          color: var(--ft-muted);
          font-size: 13px;
          font-weight: 600;
          margin: 10px 0;
        }

        .social {
          display: flex;
          gap: 10px;
          margin-top: 6px;
        }

        .icon {
          width: 36px;
          height: 36px;
          border-radius: 999px;
          border: 1px solid var(--ft-border);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--ft-text);
          background: rgba(255, 255, 255, 0.04);
          transition: transform 0.15s ease, background 0.2s ease;
          text-decoration: none;
        }

        .icon:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.08);
        }

        .tagline {
          margin-top: 12px;
          color: var(--ft-muted2);
          font-size: 12px;
          font-weight: 700;
        }

        .divider {
          height: 1px;
          background: var(--ft-border);
          margin: 8px 0 22px;
        }

        .bottom {
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 24px;
          align-items: center;
        }

        .disclaimer {
          margin: 0;
          color: var(--ft-muted2);
          font-size: 11px;
          line-height: 1.7;
          font-weight: 600;
        }

        @media (max-width: 980px) {
          .top {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .bottom {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .wrap {
            padding: 36px 16px 28px;
          }
          .top {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
