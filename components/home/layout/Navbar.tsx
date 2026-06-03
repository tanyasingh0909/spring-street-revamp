"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "../../theme/ThemeProvider";

export default function Navbar() {
  const { theme, toggle } = useTheme();

  return (
    <nav className="navbar">
      <Link className="nav-left" href="/" aria-label="Home">
        <Image src="/logo.png" alt="Spring Street" width={210} height={56} priority />
      </Link>

      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><Link href="/about">About Us</Link></li>
        <li className="dropdown">
  <span className="dropdown-title">Products ▾</span>

  <div className="dropdown-menu">
    <Link href="/products">All</Link>
    <Link href="/products/global-growth-prisma">Global Growth Prisma</Link>
    <Link href="#">Global Core Prisma
</Link>
    <Link href="#">Global Advantage Prisma
</Link>
  </div>
</li>
        <li><Link href="/contact">Contact</Link></li>
        <li><Link href="/faq">FAQ</Link></li>
      </ul>

      <div className="nav-actions">
        <button className="btn-login" type="button">Signup/Login</button>
        <button className="btn-request" type="button">Request Access</button>

        <button className="btn-theme" type="button" onClick={toggle} aria-label="Toggle theme">
          {theme === "dark" ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
              <path
                d="M20 14.2A7.7 7.7 0 0 1 9.8 4a6.9 6.9 0 1 0 10.2 10.2Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
              <path
                d="M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M12 2.5v2.2M12 19.3v2.2M3.3 12h2.2M18.5 12h2.2M5.1 5.1l1.6 1.6M17.3 17.3l1.6 1.6M18.9 5.1l-1.6 1.6M6.7 17.3l-1.6 1.6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      <style jsx>{`
        /* ── Light mode ─────────────────────────────────────────── */
        :global(html.light) {
          --nav-bg: rgba(255, 255, 255, 0.92);
                    --bg: #f5f7fb;

          --nav-border: rgba(0, 0, 0, 0.08);
          --nav-text: #0b1f3a;
          --nav-muted: #4a5568;
          --btn-border: rgba(0, 0, 0, 0.15);
          --accent: #316cb5;
          --accent-hover: #1f6ef5;
          --shadow: 0 8px 24px rgba(11, 92, 222, 0.2);
        }

        /* ── Dark mode ──────────────────────────────────────────── */
        :global(html.dark) {
          --nav-text: rgba(255, 255, 255, 0.95);
          --nav-muted: rgba(255, 255, 255, 0.60);
          --btn-border: rgba(255, 255, 255, 0.18);
          --accent: #316cb5;
          --accent-hover: #60a5fa;
          --shadow: 0 8px 28px rgba(59, 130, 246, 0.25);

          /* Fully transparent bg + border so the page colour shows through */
          --nav-bg: rgba(0, 0, 0, 0);
          --nav-border: rgba(255, 255, 255, 0.07);
        }

        /* ── Base navbar ────────────────────────────────────────── */
        .navbar {
          top: 0;
          z-index: 50;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 14px 28px;
background: var(--nav-bg);
          border-bottom: 1px solid var(--nav-border);
          /* backdrop-filter only kicks in when there's an actual bg colour;
             in dark mode bg is transparent so we skip it to avoid the
             frosted-glass box that breaks blending */
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        :global(html.light) .navbar {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        /* ── Logo ───────────────────────────────────────────────── */
        .nav-left {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        /* Light mode: clean, no glow */
        :global(html.light) .nav-left img {
          filter: none;
        }

        /* Dark mode: strong, layered blue/cyan glow */
        :global(html.dark) .nav-left img {
          filter:
            drop-shadow(0 0 4px rgba(99, 179, 255, 0.9))
            drop-shadow(0 0 10px rgba(59, 130, 246, 0.75))
            drop-shadow(0 0 22px rgba(59, 130, 246, 0.50))
            drop-shadow(0 0 40px rgba(96, 165, 250, 0.30));
          transition: filter 0.3s ease;
        }

        :global(html.dark) .nav-left:hover img {
          filter:
            drop-shadow(0 0 6px rgba(147, 210, 255, 1))
            drop-shadow(0 0 14px rgba(59, 130, 246, 0.90))
            drop-shadow(0 0 30px rgba(59, 130, 246, 0.65))
            drop-shadow(0 0 55px rgba(96, 165, 250, 0.40));
        }

        /* ── Nav links ──────────────────────────────────────────── */
        .nav-links {
          display: flex;
          list-style: none;
          gap: 34px;
          margin: 0;
          padding: 0;
          justify-content: center;
          align-items: center;
        }

        .nav-links :global(a) {
          position: relative;
          color: var(--nav-muted);
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.01em;
          transition: color 0.25s ease;
        }

        .nav-links :global(a::after) {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -6px;
          width: 0;
          height: 2px;
          background:#316cb5;
          transform: translateX(-50%);
          transition: width 0.3s ease;
          border-radius: 999px;
        }

        .nav-links :global(a:hover) {
          color: var(--nav-text);
        }

        .nav-links :global(a:hover::after) {
          width: 100%;
        }

        /* ── Action buttons ─────────────────────────────────────── */
        .nav-actions {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 10px;
        }

        .btn-login {
          background: transparent;
          color: var(--nav-muted);
          border: 1px solid var(--btn-border);
          border-radius: 999px;
          padding: 9px 18px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.15s, background 0.2s, color 0.2s;
        }

        .btn-login:hover {
          transform: translateY(-1px);
          color: var(--nav-text);
          background: rgba(0, 0, 0, 0.05);
        }

        :global(html.dark) .btn-login:hover {
          background: rgba(255, 255, 255, 0.08);
        }
          .dropdown {
  position: relative;
}

.dropdown-title {
  color: var(--nav-muted);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.dropdown:hover .dropdown-title {
  color: var(--nav-text);
}

.dropdown-menu {
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  min-width: 190px;
  padding: 10px;
  border-radius: 14px;
  background: var(--nav-bg);
  border: 1px solid var(--nav-border);
  box-shadow: 0 14px 35px rgba(0, 0, 0, 0.18);
  display: none;
  flex-direction: column;
  gap: 8px;
  z-index: 100;
}

.dropdown:hover .dropdown-menu {
  display: flex;
}

.dropdown-menu :global(a) {
  padding: 9px 12px;
  border-radius: 10px;
  white-space: nowrap;
}

.dropdown-menu :global(a:hover) {
  background: rgba(49, 108, 181, 0.12);
}


        .btn-request {
          background: #316cb5;
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 9px 20px;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: var(--shadow);
          transition: transform 0.15s, background 0.2s;
        }

        .btn-request:hover {
          background: var(--accent-hover);
          transform: translateY(-1px);
        }

        .btn-theme {
          width: 38px;
          height: 38px;
          border-radius: 999px;
          border: 1px solid var(--btn-border);
          background: transparent;
          color: var(--nav-muted);
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s, background 0.2s, color 0.2s;
        }

        .btn-theme:hover {
          transform: translateY(-1px);
          color: var(--nav-text);
          background: rgba(0, 0, 0, 0.05);
        }

        :global(html.dark) .btn-theme:hover {
          background: rgba(255, 255, 255, 0.08);
        }

        /* ── Responsive ─────────────────────────────────────────── */
        @media (max-width: 980px) {
          .nav-links { display: none; }
          .navbar { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 520px) {
          .btn-login { display: none; }
          .navbar { padding: 12px 16px; }
        }
      `}</style>
    </nav>
  );
}
