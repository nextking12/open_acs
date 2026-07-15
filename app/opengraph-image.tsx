import { ImageResponse } from "next/og";

export const alt = "PhySec.Learn — Physical Access Control Training";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#070707",
          color: "#f5f1eb",
          fontFamily: "sans-serif",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(228,211,191,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(228,211,191,0.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            opacity: 0.5,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#e4d3bf",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            marginBottom: 20,
            fontWeight: 600,
          }}
        >
          Physical Access Control Training
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#f5f1eb",
          }}
        >
          PhySec.Learn
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#b6aa9b",
            marginTop: 28,
            maxWidth: 780,
            lineHeight: 1.4,
          }}
        >
          Learn how real access control systems are built and operated.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            height: 2,
            width: 120,
            backgroundColor: "#d8c2a6",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
