import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          background: "linear-gradient(135deg, #0a1f3a 0%, #031426 100%)",
          color: "#e2e8f0",
          fontFamily: "Geist, sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 28,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          AI Spreadsheet Toolkit
        </span>
        <h1
          style={{
            fontSize: 70,
            marginTop: 24,
            marginBottom: 24,
            fontWeight: 600,
            lineHeight: 1.1,
          }}
        >
          Excel Formula Generator – Free AI Tool
        </h1>
        <p style={{ fontSize: 32, maxWidth: "80%", lineHeight: 1.4 }}>
          Type what you want. Get optimized Excel or Google Sheets formulas
          instantly with plain-English explanations.
        </p>
        <footer style={{ marginTop: 48, fontSize: 24, opacity: 0.8 }}>
          {new URL(siteConfig.url).host}
        </footer>
      </div>
    ),
    {
      ...size,
    },
  );
}
