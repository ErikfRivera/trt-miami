import { ImageResponse } from "next/og";

export const alt = "Miami TRT — Testosterone Replacement Therapy in Miami, FL";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#94a3b8",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          Miami, FL
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1.05,
            marginTop: 24,
            letterSpacing: -2,
          }}
        >
          Testosterone Replacement Therapy in Miami
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#cbd5e1",
            marginTop: 32,
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          Physician-supervised TRT, comprehensive bloodwork, and ongoing
          follow-up.
        </div>
      </div>
    ),
    { ...size },
  );
}
