"use client"
import LogoComponent from "@/components/ui/LogoComponent"

export default function Footer() {
  return (
    <footer style={{ position: "relative", background: "var(--c-void)", borderTop: "2px solid #8B0000", padding: "28px 60px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <LogoComponent size="sm" />

      <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "9px", color: "#1a1a1a", letterSpacing: "0.1em" }}>
        © 2025 BONZ. All Rights Reserved.
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <a href="https://www.instagram.com/godsfavourite.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-barlow)", fontSize: "9px", color: "#222", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", transition: "color 0.2s" }}
          onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#8B0000" }}
          onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#222" }}>
          Instagram
        </a>
        <a href="mailto:contact@godsfavourite.in" style={{ fontFamily: "var(--font-barlow)", fontSize: "9px", color: "#222", letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none", transition: "color 0.2s" }}
          onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#8B0000" }}
          onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#222" }}>
          Email
        </a>
      </div>
    </footer>
  )
}
