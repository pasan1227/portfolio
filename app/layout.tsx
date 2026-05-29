import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";
import Header from "@/components/Header";
import ActiveSectionContextProvider from "@/context/ActiveSectionContext";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Backdrop from "@/components/Backdrop";
import { siteConfig, siteUrl } from "@/lib/site";

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
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: `${siteConfig.name} — Portfolio`,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: `${siteConfig.name} — Portfolio`,
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteUrl,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@pasan1227",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteUrl,
  image: `${siteUrl}/assets/pasan.jpg`,
  jobTitle: siteConfig.jobTitle,
  description: siteConfig.description,
  worksFor: {
    "@type": "Organization",
    name: siteConfig.employer,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: siteConfig.alumniOf,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.location.city,
    addressCountry: siteConfig.location.country,
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "NestJS",
    "Tailwind CSS",
    "PostgreSQL",
    "MongoDB",
    "Full-stack Web Development",
  ],
  sameAs: [siteConfig.social.github, siteConfig.social.linkedin],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

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
