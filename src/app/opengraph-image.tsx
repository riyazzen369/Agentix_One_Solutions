import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#FFF21A", padding: 72, alignItems: "center", justifyContent: "space-between", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 4, color: "#171717" }}>AGENTIX ONE SOLUTION · BENGALURU</div>
          <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 0.95, color: "#171717", marginTop: 28 }}>YOUR BUSINESS, RUNNING ON AI.</div>
          <div style={{ fontSize: 30, color: "#171717", marginTop: 28 }}>{site.tagline}</div>
        </div>
        <div style={{ width: 260, height: 260, background: "#A65BFF", border: "8px solid #171717", borderRadius: 40, boxShadow: "16px 16px 0 #171717", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 110, fontWeight: 800, color: "#171717" }}>AI</div>
      </div>
    ),
    size,
  );
}
