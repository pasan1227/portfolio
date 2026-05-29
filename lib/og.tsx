import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const ogSize = { width: 1200, height: 630 };
export const ogAlt = `${siteConfig.name} — ${siteConfig.role}`;
export const ogContentType = "image/png";

const INK = "#080808";
const BONE = "#f4f4ee";
const BONE_MUTED = "#9b9b92";
const VOLT = "#c9ff3d";

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INK,
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* signature volt glow */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -200,
            width: 640,
            height: 640,
            borderRadius: "9999px",
            background: VOLT,
            opacity: 0.16,
            filter: "blur(40px)",
            display: "flex",
          }}
        />

        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: VOLT,
            fontWeight: 700,
          }}
        >
          {siteConfig.name}
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 116,
              lineHeight: 0.95,
              fontWeight: 800,
              letterSpacing: -4,
              color: BONE,
            }}
          >
            Full-stack
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 116,
              lineHeight: 0.95,
              fontWeight: 800,
              letterSpacing: -4,
              color: VOLT,
            }}
          >
            Engineer.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 30,
              color: BONE_MUTED,
              fontWeight: 500,
            }}
          >
            React · Next.js · NestJS · TypeScript
          </div>
        </div>

        {/* footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 26,
              color: BONE,
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "9999px",
                backgroundColor: VOLT,
                display: "flex",
              }}
            />
            Available for work
          </div>
          <div style={{ display: "flex", fontSize: 24, color: BONE_MUTED }}>
            Open to roles & freelance
          </div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
