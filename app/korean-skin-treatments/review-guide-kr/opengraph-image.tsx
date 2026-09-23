import { ImageResponse } from "next/og";

export const alt = "BEYOND FIVE STARS — RELYN review reading guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "52px 65px", background: "#f6e748", color: "#171923", border: "14px solid #171923" }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}><span>RELYN READING CLUB</span><span>GUIDE 02</span></div><div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between" }}><div style={{ display: "flex", flexDirection: "column", fontSize: 102, fontWeight: 900, lineHeight: 1.05 }}><span>BEYOND</span><span>FIVE STARS.</span></div><div style={{ display: "flex", gap: 14, padding: 30, background: "#9b8afa", border: "5px solid #171923", boxShadow: "12px 12px 0 #171923", transform: "rotate(-5deg)" }}>{[0, 1].map(i => <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 74, height: 110, border: "4px solid #171923", borderRadius: "50%", background: "white" }}><div style={{ width: 27, height: 40, borderRadius: "50%", background: "#171923" }} /></div>)}</div></div><div style={{ display: "flex", borderTop: "3px solid #171923", paddingTop: 22, fontSize: 27 }}>A closer look at Korean aesthetic treatment reviews.</div></div>, size);
}
