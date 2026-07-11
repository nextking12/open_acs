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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0c0a09",
          color: "#f5f5f4",
          fontSize: 72,
          fontFamily: "sans-serif",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#fcd34d",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Physical Access Control Training
        </div>
        <div style={{ display: "flex", fontSize: 80, fontWeight: 700, textAlign: "center" }}>
          PhySec.Learn
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#a8a29e",
            marginTop: 24,
            textAlign: "center",
            maxWidth: 800,
          }}
        >
          Learn how real access control systems are built and operated.
        </div>
      </div>
    ),
    { ...size },
  );
}
