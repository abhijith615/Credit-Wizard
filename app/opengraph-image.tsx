import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated Open Graph card — navy field with the real brand mark. */
export default async function OgImage() {
  const logo = await readFile(join(process.cwd(), "public", "logo-mark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
          background: "linear-gradient(160deg, #16244A 0%, #243E73 60%, #1C2F5C 100%)",
          color: "white",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={84} height={84} style={{ borderRadius: 18 }} alt="" />
          <div style={{ fontSize: 44, display: "flex", gap: 12 }}>
            <span>Credit</span>
            <span style={{ color: "#C79A2D" }}>Wizard</span>
            <span style={{ color: "#8BA3D6" }}>In</span>
          </div>
        </div>
        <div style={{ fontSize: 72, marginTop: 60, lineHeight: 1.15, display: "flex", flexDirection: "column" }}>
          <span>Finance Made Simple.</span>
          <span style={{ color: "#C79A2D" }}>Growth Made Possible.</span>
        </div>
        <div style={{ fontSize: 28, marginTop: 48, color: "#BCCBE8" }}>
          20+ Years of Trusted Financial Advisory · Serving Clients Across India
        </div>
      </div>
    ),
    size
  );
}
