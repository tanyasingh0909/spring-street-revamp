/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import type { ReactNode, SVGProps } from "react";
// Adjust this import path if your ThemeProvider lives elsewhere.
import { useTheme } from "@/components/theme/ThemeProvider";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Belief = {
  number: string;
  title: string;
  description: string;
  icon: ReactNode;
};

type Milestone = {
  year: string;
  title: string;
  description: string;
};

function IconGlobe(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M2 12h20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M12 2c3.3 2.8 5.2 6.5 5.2 10S15.3 19.2 12 22c-3.3-2.8-5.2-6.5-5.2-10S8.7 4.8 12 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconSpark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2l1.2 6.2L20 10l-6.8 1.8L12 18l-1.2-6.2L4 10l6.8-1.8L12 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M4 19l.6 2.8L8 22l-2.8.6L4 26"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconChart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 19V5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4 19h16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M7 15l4-4 3 3 5-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 8h1v1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconShield(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2l8 4v7c0 5-3.4 8.8-8 9-4.6-.2-8-4-8-9V6l8-4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 12.2 11.3 14l3.7-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionTitle(props: {
  eyebrow?: string;
  title: string;
  description?: string;
  forceLight?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {props.eyebrow ? (
        <p
          className={cx(
            "text-xs font-semibold tracking-[0.2em] text-slate-500 dark:text-slate-400",
            props.forceLight && "!text-slate-500"
          )}
        >
          {props.eyebrow}
        </p>
      ) : null}
      <h2
        className={cx(
          "mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl",
          props.forceLight && "!text-slate-900"
        )}
      >
        {props.title}
      </h2>
      {props.description ? (
        <p
          className={cx(
            "mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300",
            props.forceLight && "!text-slate-600"
          )}
        >
          {props.description}
        </p>
      ) : null}
    </div>
  );
}

function Glow({ forceLight }: { forceLight?: boolean }) {
  return (
    <>
      <div
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute -top-24 left-1/2 h-72 w-[38rem] -translate-x-1/2 rounded-full blur-3xl",
          "bg-gradient-to-r from-sky-300/25 via-blue-300/20 to-indigo-300/25",
          "dark:from-cyan-400/10 dark:via-blue-500/12 dark:to-indigo-500/10",
          forceLight && "!from-sky-300/18 !via-blue-300/14 !to-indigo-300/18"
        )}
      />
      <div
        aria-hidden="true"
        className={cx(
          "pointer-events-none absolute -bottom-40 right-[-6rem] h-80 w-80 rounded-full blur-3xl",
          "bg-gradient-to-tr from-blue-300/18 via-indigo-300/14 to-fuchsia-300/10",
          "dark:from-blue-500/10",
          forceLight && "!from-blue-300/12 !via-indigo-300/10 !to-fuchsia-300/8"
        )}
      />
    </>
  );
}

export default function AboutPage() {
  const { theme } = useTheme();
  const forceLight = theme === "light";

  const beliefs: Belief[] = [
    {
      number: "01",
      title: "Global by Design",
      description:
        "We build portfolios that cross borders—so your wealth can participate in innovation wherever it happens.",
      icon: <IconGlobe className="h-5 w-5" />,
    },
    {
      number: "02",
      title: "Data‑Driven at the Core",
      description:
        "Every decision is backed by research, risk models, and clear assumptions—not guesswork.",
      icon: <IconChart className="h-5 w-5" />,
    },
    {
      number: "03",
      title: "Curated for Clarity",
      description:
        "Complexity is a tax. We simplify choices into understandable, investor‑friendly portfolios.",
      icon: <IconSpark className="h-5 w-5" />,
    },
  ];

  const milestones: Milestone[] = [
    {
      year: "The spark",
      title: "A question at a single address",
      description:
        "From Spring Street's first office, we kept hearing the same question: Why is global investing still so confusing for India?",
    },
    {
      year: "The build",
      title: "Turning research into portfolios",
      description:
        "We translated institutional frameworks into simple portfolio building blocks—so the strategy stays sophisticated, while the experience stays human.",
    },
    {
      year: "The mission",
      title: "A global stage for Indian capital",
      description:
        "Today, we're reimagining global access—helping Indian investors diversify with discipline, transparency, and confidence.",
    },
  ];

  return (
    <main
      className={cx(
        "relative overflow-hidden bg-slate-50 text-slate-900 dark:bg-[#061427] dark:text-white",
        forceLight && "!bg-slate-50 !text-slate-900"
      )}
    >
      <div className="relative">
        <Glow forceLight={forceLight} />
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
          {/* HERO */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Left card */}
            <div
              className={cx(
                "rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-white/5",
                forceLight && "!bg-white !border-slate-200"
              )}
            >
              <p
                className={cx(
                  "text-xs font-semibold tracking-[0.22em] text-slate-500 dark:text-slate-300",
                  forceLight && "!text-slate-500"
                )}
              >
                ABOUT US
              </p>
              <h1
                className={cx(
                  "mt-3 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl",
                  forceLight && "!text-slate-950"
                )}
              >
                Global Stage
                <span
                  className={cx(
                    "block text-slate-900 dark:text-white",
                    forceLight && "!text-slate-900"
                  )}
                >
                  for Indian Capital
                </span>
              </h1>
              <p
                className={cx(
                  "mt-4 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-200",
                  forceLight && "!text-slate-600"
                )}
              >
                Spring Street is a systematically driven investment management
                platform that brings clarity and expertise to global investing.
                We help you diversify beyond borders—without losing sight of what
                matters: discipline, risk control, and a story you can believe
                in.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/request-access"
                  className="inline-flex items-center justify-center rounded-full bg-[#316cb5] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/60 dark:focus:ring-blue-300/60"
                >
                  Request access
                </Link>
                <Link
                  href="/products"
                  className={cx(
                    "inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400/40 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
                    forceLight && "!border-slate-300 !bg-white !text-slate-900"
                  )}
                >
                  Explore products
                </Link>
                <div
                  className={cx(
                    "ml-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300",
                    forceLight && "!text-slate-500"
                  )}
                >
                  <span className="inline-flex h-2 w-2 rounded-full bg-[#316cb5] " />
                  Built for long‑term investors
                </div>
              </div>
            </div>

            {/* Right / Story card */}
            <div
              className={cx(
                "relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm dark:border-white/10 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-950",
                forceLight && "!bg-white !bg-none !border-slate-200"
              )}
            >
              <div
                aria-hidden="true"
                className={cx(
                  "absolute inset-0 bg-[radial-gradient(40rem_20rem_at_70%_-10%,rgba(16,185,129,0.14),transparent_60%),radial-gradient(30rem_20rem_at_-10%_100%,rgba(59,130,246,0.10),transparent_60%)] dark:bg-[radial-gradient(40rem_20rem_at_70%_-10%,rgba(16,185,129,0.25),transparent_60%),radial-gradient(30rem_20rem_at_-10%_100%,rgba(59,130,246,0.18),transparent_60%)]",
                  forceLight &&
                    "!bg-[radial-gradient(40rem_20rem_at_70%_-10%,rgba(16,185,129,0.14),transparent_60%),radial-gradient(30rem_20rem_at_-10%_100%,rgba(59,130,246,0.10),transparent_60%)]"
                )}
              />
              <div className="relative">
                <p
                  className={cx(
                    "text-xs font-semibold tracking-[0.22em] text-slate-500 dark:text-white/60",
                    forceLight && "!text-slate-500"
                  )}
                >
                  THE STORY
                </p>
                <p
                  className={cx(
                    "mt-4 text-sm leading-6 text-slate-700 dark:text-white/85",
                    forceLight && "!text-slate-700"
                  )}
                >
                  The name <span className="font-semibold">Spring Street</span>{" "}
                  is inspired by our founder's first US address in Atlanta. It
                  marked the beginning of a global journey—now reimagined for
                  every Indian investor who wants more than a single‑country
                  future.
                </p>

                {/* Milestone cards — ALL text nodes now have forceLight overrides */}
                <div className="mt-6 grid gap-3">
                  {milestones.map((m) => (
                    <div
                      key={m.title}
                      className={cx(
                        "rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5",
                        forceLight && "!bg-slate-50 !border-slate-200"
                      )}
                    >
                      <p
                        className={cx(
                          "text-xs font-semibold text-blue-700 dark:text-cyan-300/90",
                          forceLight && "!text-blue-700"
                        )}
                      >
                        {m.year}
                      </p>
                      <p
                        className={cx(
                          "mt-1 text-sm font-semibold text-slate-900 dark:text-white",
                          forceLight && "!text-slate-900"
                        )}
                      >
                        {m.title}
                      </p>
                      <p
                        className={cx(
                          "mt-1 text-xs leading-5 text-slate-600 dark:text-white/75",
                          forceLight && "!text-slate-600"
                        )}
                      >
                        {m.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Built on trust */}
                <div
                  className={cx(
                    "mt-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5",
                    forceLight && "!bg-slate-50 !border-slate-200"
                  )}
                >
                  <div
                    className={cx(
                      "grid h-10 w-10 place-items-center rounded-lg bg-blue-600/10 text-blue-700 dark:bg-cyan-400/15 dark:text-cyan-200",
                      forceLight && "!bg-blue-600/10 !text-blue-700"
                    )}
                  >
                    <IconShield className="h-5 w-5" />
                  </div>
                  <div>
                    <p
                      className={cx(
                        "text-sm font-semibold text-slate-900 dark:text-white",
                        forceLight && "!text-slate-900"
                      )}
                    >
                      Built on trust
                    </p>
                    <p
                      className={cx(
                        "text-xs text-slate-600 dark:text-white/70",
                        forceLight && "!text-slate-600"
                      )}
                    >
                      Transparency in assumptions, fees, and risk.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CORE BELIEFS */}
      <section
        className={cx(
          "border-t border-slate-200/70 bg-white/60 py-14 dark:border-white/10 dark:bg-white/0 sm:py-16",
          forceLight && "!bg-white/60 !border-slate-200/70"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="WHAT WE BELIEVE"
            title="Our Core Beliefs"
            description="A portfolio is not just a set of holdings—it's a story about where the world is going, and how you participate without taking reckless bets."
            forceLight={forceLight}
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {beliefs.map((b) => (
              <div
                key={b.title}
                className={cx(
                  "group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5",
                  forceLight && "!bg-white !border-slate-200"
                )}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-400/10 blur-2xl transition group-hover:bg-blue-400/15"
                />
                <div className="relative flex items-start gap-3">
                 <div
  className={cx(
    "flex shrink-0 aspect-square h-10 items-center justify-center rounded-full bg-[#316cb5] text-white",
    forceLight && "!bg-[#316cb5] !text-white"
  )}
>
  {b.icon}
</div>
                  <div className="min-w-0">
                    <p
                      className={cx(
                        "text-xs font-semibold tracking-widest text-slate-500 dark:text-slate-400",
                        forceLight && "!text-slate-500"
                      )}
                    >
                      {b.number}
                    </p>
                    <p
                      className={cx(
                        "mt-1 text-sm font-semibold text-slate-900 dark:text-white",
                        forceLight && "!text-slate-900"
                      )}
                    >
                      {b.title}
                    </p>
                    <p
                      className={cx(
                        "mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300",
                        forceLight && "!text-slate-600"
                      )}
                    >
                      {b.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How we work strip */}
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <div
              className={cx(
                "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5 lg:col-span-2",
                forceLight && "!bg-white !border-slate-200"
              )}
            >
              <p
                className={cx(
                  "text-sm font-semibold text-slate-900 dark:text-white",
                  forceLight && "!text-slate-900"
                )}
              >
                How we make it feel simple
              </p>
              <p
                className={cx(
                  "mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300",
                  forceLight && "!text-slate-600"
                )}
              >
                Think of us as your research desk, portfolio engineer, and
                long‑term partner. We start with global opportunity sets, filter
                for quality and resilience, then assemble portfolios that can
                hold up through different market seasons.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Transparent frameworks",
                  "Risk-first allocation",
                  "Institutional research",
                  "India-friendly experience",
                ].map((t) => (
                  <span
                    key={t}
                    className={cx(
                      "rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200",
                      forceLight && "!border-slate-200 !bg-slate-50 !text-slate-700"
                    )}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
<div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-[#316cb5] via-[#3b7ad0] to-[#234f89] p-6 text-white shadow-sm dark:border-white/10">    <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(30rem_20rem_at_40%_0%,rgba(255,255,255,0.35),transparent_60%)]"
              />
              <div className="relative">
                <p className="text-sm font-semibold">Our promise</p>
                <p className="mt-2 text-sm leading-6 text-white/90">
                  You should always know{" "}
                  <span className="font-semibold">why</span>{" "}
                  you own what you own—and what could go wrong.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                >
                  Talk to us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section
        className={cx(
          "border-t border-slate-200/70 py-14 dark:border-white/10 sm:py-16",
          forceLight && "!border-slate-200/70"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div
            className={cx(
              "relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-white/5 sm:p-10",
              forceLight && "!bg-white !border-slate-200"
            )}
          >
            <div
              aria-hidden="true"
className="absolute inset-0 bg-[radial-gradient(45rem_20rem_at_20%_-10%,rgba(49,108,181,0.28),transparent_60%),radial-gradient(40rem_20rem_at_90%_110%,rgba(76,139,219,0.20),transparent_55%)]"            />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p
                  className={cx(
                    "text-sm font-semibold text-slate-900 dark:text-white",
                    forceLight && "!text-slate-900"
                  )}
                >
                  Ready to diversify beyond borders?
                </p>
                <p
                  className={cx(
                    "mt-1 text-sm text-slate-600 dark:text-slate-300",
                    forceLight && "!text-slate-600"
                  )}
                >
                  Start with curated portfolios designed for long‑term Indian
                  investors.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/request-access"
                  className="inline-flex items-center justify-center rounded-full bg-[#316cb5] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/60 dark:focus:ring-blue-300/60"
                >
                  Request access
                </Link>
                <Link
                  href="/products"
                  className={cx(
                    "inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400/40 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
                    forceLight && "!border-slate-300 !bg-white !text-slate-900"
                  )}
                >
                  See portfolios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
