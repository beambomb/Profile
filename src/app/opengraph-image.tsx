import { ImageResponse } from "next/og";
import { profile } from "@content";

export const alt = `${profile.name} - ${profile.headline}`;
export const size = { width: 1200, height: 630 };
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
          padding: 80,
          background: "#000000",
          color: "#EDEDED",
          border: "8px solid #333333",
        }}
      >
        <div style={{ fontSize: 28, color: "#FFFFFF", letterSpacing: 6 }}>SOFTWARE &amp; DATA</div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>{profile.name}</div>
        <div style={{ fontSize: 36, color: "#A1A1AA", marginTop: 24 }}>{profile.headline}</div>
        <div style={{ fontSize: 28, color: "#FFFFFF", marginTop: 48 }}>Universitas Gadjah Mada</div>
      </div>
    ),
    size,
  );
}
