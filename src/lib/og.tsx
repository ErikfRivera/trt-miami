import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;

type OgImageInput = {
  eyebrow: string;
  title: string;
  tagline: string;
};

export function renderOgImage({ eyebrow, title, tagline }: OgImageInput) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          background:
            "linear-gradient(135deg, #18181b 0%, #27272a 60%, #3f3f46 100%)",
          color: "#fafafa",
          fontFamily: "system-ui, -apple-system, Helvetica, Arial",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "#a1a1aa",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: "84px",
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#fafafa",
              maxWidth: "1000px",
              display: "flex",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "32px",
              lineHeight: 1.4,
              color: "#d4d4d8",
              maxWidth: "1000px",
              marginTop: "12px",
              display: "flex",
            }}
          >
            {tagline}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: "28px",
            color: "#d4d4d8",
          }}
        >
          <span style={{ display: "flex", fontWeight: 600, color: "#fafafa" }}>
            Strong Health Miami
          </span>
          <span style={{ display: "flex" }}>stronghealth.com</span>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
