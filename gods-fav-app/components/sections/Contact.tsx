"use client"
import Magnet from "@/components/reactbits/Magnet"
import { TextField } from "@mui/material"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const fieldSx = {
  mb: 3,
  "& .MuiInput-root": { color: "#E8E2D9", fontFamily: "var(--font-space-mono)", fontSize: "13px" },
  "& .MuiInputLabel-root": { color: "#444", fontFamily: "var(--font-barlow)", letterSpacing: "0.25em", textTransform: "uppercase", fontSize: "10px" },
  "& .MuiInput-underline:before": { borderBottomColor: "#1a1a1a" },
  "& .MuiInput-underline:hover:not(.Mui-disabled):before": { borderBottomColor: "#8B0000" },
  "& .MuiInput-underline:after": { borderBottomColor: "#8B0000" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#8B0000" },
}

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" className="rg" style={{
      position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr",
      minHeight: "80svh", borderTop: "2px solid #1a1a1a", overflow: "hidden",
      /* CSS-only wave-like bg */
      backgroundImage: "radial-gradient(ellipse 80% 60% at 10% 80%, rgba(139,0,0,0.07) 0%, transparent 60%)"
    }}>
      {/* Subtle CSS scan line */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(139,0,0,0.015) 3px, rgba(139,0,0,0.015) 4px)"
      }} />

      {/* LEFT */}
      <div className="rp" style={{ position: "relative", zIndex: 1, padding: "80px 60px" }}>
        <div style={{ fontFamily: "var(--font-barlow)", fontSize: "9px", color: "#8B0000", letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: "24px" }}>
          GET IN TOUCH
        </div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-bebas)", fontSize: "clamp(48px, 7vw, 80px)", color: "white", lineHeight: 0.9, marginBottom: "24px" }}>
          Let&apos;s<br /><span style={{ color: "#8B0000", textShadow: "0 0 30px rgba(139,0,0,0.5)" }}>Talk.</span>
        </motion.h2>
        <p style={{ fontFamily: "var(--font-space-mono)", fontSize: "11px", color: "#444", lineHeight: 2.1, maxWidth: "300px", marginBottom: "36px" }}>
          Collabs, press &amp; partnerships. We respond to those who move right.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "300px" }}>
          {[
            { label: "Instagram", href: "https://www.instagram.com/godsfavourite.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" },
            { label: "Email us directly", href: "mailto:contact@godsfavourite.in" },
            { label: "Collab Inquiry", href: "#" }
          ].map((lnk, i) => (
            <motion.div key={lnk.label} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <a href={lnk.href} target="_blank" rel="noopener noreferrer" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", border: "1px solid #1a1a1a", textDecoration: "none", color: "#E8E2D9", transition: "border-color 0.2s, color 0.2s" }}
                onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#8B0000"; (e.currentTarget as HTMLAnchorElement).style.color = "#8B0000" }}
                onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "#1a1a1a"; (e.currentTarget as HTMLAnchorElement).style.color = "#E8E2D9" }}>
                <span style={{ fontFamily: "var(--font-barlow)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{lnk.label}</span>
                <span>→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="rp" style={{ position: "relative", zIndex: 1, padding: "80px 60px", borderLeft: "1px solid #1a1a1a" }}>
        <AnimatePresence mode="wait">
          {!sent ? (
            <motion.div key="form" exit={{ opacity: 0, scale: 0.96 }}>
              <TextField variant="standard" label="Name" fullWidth sx={fieldSx} />
              <TextField variant="standard" label="Email" fullWidth sx={fieldSx} />
              <TextField variant="standard" label="Message" multiline minRows={4} fullWidth sx={fieldSx} />
              <Magnet padding={16} disabled={false} magnetStrength={2}>
                <button onClick={() => setSent(true)} style={{
                  fontFamily: "var(--font-barlow)", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.4em",
                  background: "#8B0000", color: "white", border: "none", padding: "12px 36px", cursor: "pointer",
                  transition: "box-shadow 0.2s", fontWeight: 600
                }}
                  onMouseOver={e => (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 20px rgba(139,0,0,0.5)"}
                  onMouseOut={e => (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"}>
                  Send →
                </button>
              </Magnet>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontFamily: "var(--font-bebas)", fontSize: "52px", color: "#8B0000", textShadow: "0 0 30px rgba(139,0,0,0.5)" }}>Received.</div>
              <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "11px", color: "#444", marginTop: "8px" }}>We&apos;ll be in touch.</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
