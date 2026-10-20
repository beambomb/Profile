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
          background: "#0B0F17",
          color: "#E6EAF2",
          border: "8px solid #2A3550",
        }}
      >
        <div style={{ fontSize: 28, color: "#22D3EE", letterSpacing: 6 }}>PLAYER 1</div>
        <div style={{ fontSize: 76, fontWeight: 700, marginTop: 24, lineHeight: 1.1 }}>{profile.name}</div>
        <div style={{ fontSize: 36, color: "#9AA6BD", marginTop: 24 }}>{profile.headline}</div>
        <div style={{ fontSize: 28, color: "#FBBF24", marginTop: 48 }}>Universitas Gadjah Mada</div>
      </div>
    ),
    size,
  );
}
