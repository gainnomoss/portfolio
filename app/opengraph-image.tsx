import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Ke Er Zhang — Product Designer";

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
          padding: "80px 96px",
          background: "#fdfdfd",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#0b5fff",
            }}
          />
          <div style={{ fontSize: 28, color: "#6c6d78" }}>keerux.com</div>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 68,
            fontWeight: 600,
            lineHeight: 1.15,
            color: "#14151a",
            maxWidth: 920,
          }}
        >
          I design clarity into complexity.
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 32, color: "#6c6d78" }}>
          Ke Er Zhang — Product Designer
        </div>
      </div>
    ),
    { ...size }
  );
}
