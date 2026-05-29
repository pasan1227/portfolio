import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        ink: {
          950: "#080808",
          900: "#0c0c0c",
          850: "#121212",
          800: "#181818",
          700: "#222222",
        },
        bone: {
          DEFAULT: "#f4f4ee",
          muted: "#9b9b92",
          dim: "#6a6a62",
        },
        volt: {
          DEFAULT: "#c9ff3d",
          500: "#c9ff3d",
          600: "#b4ef1f",
          dark: "#9ccc1c",
        },
      },
      fontSize: {
        // fluid oversized display scale
        "display-sm": ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display": ["clamp(3rem, 9vw, 7rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(3.5rem, 13vw, 11rem)", { lineHeight: "0.86", letterSpacing: "-0.04em" }],
      },
      maxWidth: {
        wide: "82rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-speed, 30s) linear infinite",
        "marquee-rev": "marquee-rev var(--marquee-speed, 30s) linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
