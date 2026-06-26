import { ImageResponse } from "next/og";

import { site } from "@/lib/dummy-content";

export const alt = "Blog Dai Islami";
export const size = {
  width: 1200,
  height: 630,
};
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
          justifyContent: "space-between",
          background: "#f8fafc",
          color: "#0f172a",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "22px",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              background: "#14b8a6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
            }}
          >
            EP
          </div>
          <div>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
          <div style={{ maxWidth: 880, fontSize: 76, lineHeight: 1.05, fontWeight: 800 }}>
            Catatan dakwah, artikel Islam, dan karya buku
          </div>
          <div style={{ maxWidth: 820, color: "#475569", fontSize: 30, lineHeight: 1.35 }}>
            {site.description}
          </div>
        </div>
        <div style={{ color: "#0f766e", fontSize: 26, fontWeight: 700 }}>edipurnama.id</div>
      </div>
    ),
    size,
  );
}
