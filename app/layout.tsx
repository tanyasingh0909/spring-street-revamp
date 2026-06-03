import "./globals.css";
import { Syne, DM_Sans } from "next/font/google";

import { ThemeProvider } from "../components/theme/ThemeProvider";
import Navbar from "../components/home/layout/Navbar";

import Footer from "../components/home/layout/Footer";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}