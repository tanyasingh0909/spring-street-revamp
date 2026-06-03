"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "dark" | "light";
type ThemeCtx = { theme: Theme; setTheme: (t: Theme) => void; toggle: () => void };

const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Start with "dark" so SSR and first client render agree (avoids hydration mismatch)
  const [theme, setTheme] = useState<Theme>("dark");

  // Read saved preference only after mount (client-only)
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const initial =
      saved ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
  }, []);

  // Apply class to <html> — make sure your root layout has suppressHydrationWarning on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const value = useMemo<ThemeCtx>(
    () => ({
      theme,
      setTheme,
      toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
