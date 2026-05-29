import type { Metadata } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import Header from "@/components/Header";
import ActiveSectionContextProvider from "@/context/ActiveSectionContext";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Backdrop from "@/components/Backdrop";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pasan Ratnayake — Full-stack Engineer",
  description:
    "Full-stack software engineer building fast, production-grade web products with React, Next.js & Node. Open to elite roles and select freelance work.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${body.variable} ${mono.variable} font-sans relative min-h-screen overflow-x-hidden bg-ink-950 text-bone`}
      >
        {/* Hairline grid + one signature glow that drifts on scroll (transform
            only — the blur layer is never repainted). */}
        <Backdrop />

        <ScrollProgress />

        <ActiveSectionContextProvider>
          <Header />
          <SmoothScroll>
            <main className="relative">{children}</main>
          </SmoothScroll>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: { background: "#181818", color: "#f4f4ee", border: "1px solid rgba(255,255,255,0.1)" },
            }}
          />
        </ActiveSectionContextProvider>
      </body>
    </html>
  );
}
