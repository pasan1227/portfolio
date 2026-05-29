function resolveBaseUrl(): string {
  // Explicit override — set NEXT_PUBLIC_SITE_URL once a custom domain is live.
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  // Vercel injects the stable production domain at build time.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveBaseUrl();

export const siteConfig = {
  name: "Pasan Ratnayake",
  title: "Pasan Ratnayake — Full-stack Engineer",
  role: "Full-stack Engineer",
  jobTitle: "Software Engineer",
  description:
    "Full-stack software engineer building fast, production-grade web products with React, Next.js, NestJS & TypeScript. Open to elite engineering roles and select freelance work.",
  url: siteUrl,
  locale: "en_US",
  location: { city: "Kandy", country: "Sri Lanka" },
  employer: "BotCalm",
  alumniOf: "University of Staffordshire",
  social: {
    github: "https://github.com/pasan1227",
    linkedin: "https://www.linkedin.com/in/pasanratnayake/",
  },
  keywords: [
    "Pasan Ratnayake",
    "Full-stack Engineer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "NestJS",
    "TypeScript",
    "Node.js",
    "Web Developer Sri Lanka",
    "Freelance Software Engineer",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
