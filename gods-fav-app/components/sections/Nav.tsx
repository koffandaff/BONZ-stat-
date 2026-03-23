"use client"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Magnet from "@/components/reactbits/Magnet"
import LogoComponent from "@/components/ui/LogoComponent"

const LINKS = ["ABOUT", "VISION", "CONTACT"]

export default function Nav() {
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 60], ["rgba(0,0,0,0)", "rgba(0,0,0,0.92)"])
  const blur = useTransform(scrollY, [0, 60], ["blur(0px)", "blur(20px)"])
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: "56px", display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 32px",
        borderBottom: "1px solid rgba(139,0,0,0.08)",
        backdropFilter: blur, backgroundColor: bg
      }}
    >
      {/* Logo */}
      <div style={{ position: "relative", zIndex: 1, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <LogoComponent size="sm" />
      </div>

      {/* Desktop Links */}
      <div className="desktop-only" style={{ display: "flex", gap: "32px" }}>
        {LINKS.map(link => (
          <Magnet key={link} padding={14} disabled={false} magnetStrength={2}>
            <button onClick={() => scrollTo(link)} style={{
              fontFamily: "var(--font-barlow)", fontSize: "10px", letterSpacing: "0.25em",
              textTransform: "uppercase", color: "var(--c-ghost)", background: "none", border: "none",
              cursor: "pointer", transition: "color 0.2s", padding: "4px 0"
            }}
              onMouseOver={e => { (e.currentTarget as HTMLButtonElement).style.color = "#8B0000" }}
              onMouseOut={e => { (e.currentTarget as HTMLButtonElement).style.color = "var(--c-ghost)" }}
            >
              {link}
            </button>
          </Magnet>
        ))}
      </div>

      {/* Desktop Social */}
      <div className="desktop-only" style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <a href="https://www.instagram.com/godsfavourite.in" target="_blank" rel="noopener noreferrer" style={{ opacity: 0.4, transition: "opacity 0.2s" }}
          onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1" }}
          onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.4" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" fill="#fff" stroke="none" />
          </svg>
        </a>
        <a href="mailto:info@godsfavourite.com" style={{ opacity: 0.4, transition: "opacity 0.2s" }}
          onMouseOver={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1" }}
          onMouseOut={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.4" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
            <rect x="2" y="5" width="20" height="14" />
            <path d="M2 5l10 9 10-9" />
          </svg>
        </a>
      </div>

      {/* Mobile Hamburger Button */}
      <button className="mobile-only" onClick={() => setMenuOpen(!menuOpen)} style={{
        background: "rgba(0,0,0,0.8)", border: "1px solid #1a1a1a", color: "white", cursor: "pointer", zIndex: 101, gap: "6px",
        display: "none", flexDirection: "column", padding: "10px", borderRadius: "50%",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
      }}>
        <motion.div animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} style={{ width: "24px", height: "1px", background: "white" }} />
        <motion.div animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} style={{ width: "24px", height: "1px", background: "white" }} />
        <motion.div animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} style={{ width: "24px", height: "1px", background: "white" }} />
      </button>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mobile-only"
            style={{
              position: "fixed", inset: 0, background: "rgba(6,6,6,0.95)", backdropFilter: "blur(20px)", zIndex: 100, display: "none",
              flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "32px"
            }}
          >
            {LINKS.map((link, i) => (
              <motion.button key={link}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}
                onClick={() => scrollTo(link)}
                style={{
                  fontFamily: "var(--font-cinzel)", fontSize: "20px", color: "white",
                  background: "none", border: "none", cursor: "pointer", letterSpacing: "0.2em"
                }}
              >
                {link}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
