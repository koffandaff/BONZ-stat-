"use client"
import dynamic from "next/dynamic"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Lazy-load 3D viewer — no SSR
const ModelViewer = dynamic(() => import("@/components/ui/ModelViewer"), { ssr: false })

export default function About() {
  const ruleRef = useRef<HTMLDivElement>(null)
  const [showModel, setShowModel] = useState(false)

  useEffect(() => {
    const el = ruleRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.width = "60px"; io.disconnect() }
    }, { threshold: 0.5 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="about" className="rg" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100svh", borderTop: "1px solid #1a1a1a" }}>

      {/* LEFT — brand copy */}
      <div className="rp" style={{ position: "relative", padding: "80px 60px", overflow: "hidden", borderRight: "1px solid #1a1a1a",
        backgroundImage: "linear-gradient(rgba(139,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(139,0,0,0.03) 1px, transparent 1px)",
        backgroundSize: "44px 44px"
      }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-60px" }}
            style={{ fontFamily: "var(--font-barlow)", fontSize: "9px", color: "#8B0000", letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: "20px" }}>
            ABOUT THE BRAND
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: 0.08 }}
            style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(26px, 3vw, 42px)", marginBottom: "24px", lineHeight: 1.1 }}>
            <span style={{ color: "#E8E2D9" }}>We don&apos;t follow.</span><br />
            We lead<span style={{ color: "#8B0000" }}>.</span>
          </motion.h2>

          <div ref={ruleRef} style={{ height: "1px", background: "#8B0000", marginBottom: "32px", width: "0", boxShadow: "0 0 12px rgba(139,0,0,0.4)", transition: "width 0.9s ease" }} />

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: 0.12 }}
            style={{ fontFamily: "var(--font-space-mono)", fontSize: "12px", color: "#444", lineHeight: 2.2, maxWidth: "400px", marginBottom: "48px" }}>
            BONZ is a dark streetwear label born from the underground. No trends. No compromise. Crafted for those who were chosen.
          </motion.p>

          <div style={{ display: "flex", gap: "40px" }}>
            {[{ num: "001", label: "Origin Drop" }, { num: "∞", label: "Always Limited" }, { num: "SS25", label: "Season" }].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div style={{ fontFamily: "var(--font-bebas)", fontSize: "36px", color: "#8B0000", lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontFamily: "var(--font-barlow)", fontSize: "9px", color: "#444", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "4px" }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT — Product Showcase */}
      <div className="rp" style={{
        position: "relative", background: "#060606", overflow: "hidden",
        backgroundImage: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(139,0,0,0.06) 0%, transparent 70%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 30px"
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", width: "100%" }}
        >
          {/* Label */}
          <div style={{ fontFamily: "var(--font-barlow)", fontSize: "9px", color: "#8B0000", letterSpacing: "0.5em", textTransform: "uppercase" }}>
            FIRST DROP PREVIEW
          </div>

          {/* Product Name */}
          <div style={{ textAlign: "center" }}>
            <div className="glitch-text" data-text="THE PHANTOM DRAPE"
              style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(22px, 2.5vw, 32px)", color: "white", letterSpacing: "0.08em", textShadow: "0 0 30px rgba(139,0,0,0.4)" }}>
              THE PHANTOM DRAPE
            </div>
            <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "10px", color: "#444", letterSpacing: "0.2em", marginTop: "8px" }}>
              SS25 · WEAR YOUR GHOST · 001
            </div>
          </div>

          {/* UNVEIL button — toggles 3D model */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139,0,0,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowModel(!showModel)}
            style={{
              fontFamily: "var(--font-barlow)", fontSize: "10px",
              letterSpacing: "0.45em", textTransform: "uppercase",
              padding: "14px 44px", marginTop: "8px",
              border: "1px solid #8B0000", color: showModel ? "white" : "#8B0000",
              backgroundColor: showModel ? "#8B0000" : "transparent",
              cursor: "pointer", transition: "all 0.3s",
            }}
          >
            {showModel ? "✕  CLOSE" : "⬡  UNVEIL THE DROP"}
          </motion.button>

          {/* 3D Model — appears when button is clicked */}
          <AnimatePresence>
            {showModel && (
              <motion.div
                initial={{ opacity: 0, height: 0, scale: 0.8 }}
                animate={{ opacity: 1, height: 420, scale: 1 }}
                exit={{ opacity: 0, height: 0, scale: 0.8 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ width: "100%", maxWidth: 440, overflow: "hidden", border: "1px solid #1a1a1a", background: "rgba(0,0,0,0.6)" }}
              >
                {/* Smoke reveal layer */}
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                  style={{
                    position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
                    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, rgba(100,100,100,0.2) 40%, rgba(0,0,0,0.9) 80%)",
                    filter: "blur(20px)",
                  }}
                />
                <ModelViewer
                  url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Corset/glTF-Binary/Corset.glb"
                  width={440}
                  height={420}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint text */}
          {showModel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{ fontFamily: "var(--font-space-mono)", fontSize: "8px", color: "#333", letterSpacing: "0.3em", marginTop: "4px" }}
            >
              DRAG TO ROTATE · PINCH TO ZOOM
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
