"use client"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Magnet from "@/components/reactbits/Magnet"

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Start video animation after a slight delay to coordinate with the loader curtain
    const timer = setTimeout(() => setLoaded(true), 600)
    return () => clearTimeout(timer)
  }, [])

  const scrollToAbout = () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })

  return (
    <section style={{ position: "relative", height: "100svh", overflow: "hidden", background: "#000" }}>

      {/* ── VIDEO — single source, portrait used for all, landscape for wide screens ── */}
      <style>{`
        .hero-vid-portrait { display: block; }
        .hero-vid-landscape { display: none; }
        @media (min-aspect-ratio: 16/10) {
          .hero-vid-portrait  { display: none; }
          .hero-vid-landscape { display: block; }
        }
      `}</style>

      <motion.video
        className="hero-vid-portrait"
        autoPlay muted loop playsInline preload="metadata"
        initial={{ scale: 1.15, opacity: 0, filter: "blur(10px)" }}
        animate={{ 
          scale: loaded ? 1 : 1.15, 
          opacity: loaded ? 0.55 : 0,
          filter: loaded ? "blur(0px)" : "blur(10px)"
        }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center top", zIndex: 0,
          willChange: "transform, opacity, filter"
        }}
      >
        <source src="https://res.cloudinary.com/dsne2l17k/video/upload/v1774290238/Video-457_y9416t.mp4" type="video/mp4" />
      </motion.video>

      <motion.video
        className="hero-vid-landscape"
        autoPlay muted loop playsInline preload="metadata"
        initial={{ scale: 1.15, opacity: 0, filter: "blur(10px)" }}
        animate={{ 
          scale: loaded ? 1 : 1.15, 
          opacity: loaded ? 0.5 : 0,
          filter: loaded ? "blur(0px)" : "blur(10px)"
        }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", objectPosition: "center", zIndex: 0,
          willChange: "transform, opacity, filter"
        }}
      >
        <source src="https://res.cloudinary.com/dsne2l17k/video/upload/v1774290256/My_First_Project_bqmzk5.mp4" type="video/mp4" />
      </motion.video>

      {/* Watermark cover (top-right on landscape) */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: "220px", height: "90px",
        background: "linear-gradient(to bottom left, #000 50%, transparent)",
        zIndex: 2, pointerEvents: "none"
      }} />

      {/* Heavy dark overlay so text is always legible */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.85) 100%)"
      }} />

      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 40%, transparent 25%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.9) 100%)"
      }} />

      {/* Perspective grid floor */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(139,0,0,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(139,0,0,0.07) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
        transform: "perspective(700px) rotateX(46deg) scale(1.9)",
        transformOrigin: "50% 100%", opacity: 0.55
      }} />

      {/* Scanline */}
      <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", overflow: "hidden", opacity: 0.04 }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "3px", background: "#8B0000", animation: "scanline 5s linear infinite" }} />
      </div>

      {/* Corner brackets */}
      {([
        { key: "tl", top: 20, left: 20, r: 0 },
        { key: "tr", top: 20, right: 20, r: 90 },
        { key: "bl", bottom: 20, left: 20, r: -90 },
        { key: "br", bottom: 20, right: 20, r: 180 },
      ] as const).map(({ key, r, ...pos }) => (
        <div key={key} style={{ position: "absolute", ...pos, zIndex: 3, width: 28, height: 28, animation: "bracketPulse 2.5s ease-in-out infinite" }}>
          <svg viewBox="0 0 28 28" fill="none" style={{ transform: `rotate(${r}deg)` }}>
            <path d="M28 2H2V28" stroke="#8B0000" strokeWidth="1.5" />
          </svg>
        </div>
      ))}

      {/* ── CONTENT ── */}
      <AnimatePresence>
        {loaded && (
          <div style={{
            position: "absolute", inset: 0, zIndex: 4,
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: "8px", textAlign: "center", padding: "0 20px"
          }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
              style={{ fontFamily: "var(--font-barlow)", fontSize: "12px", fontWeight: 600, color: "#8B0000", letterSpacing: "0.55em", textTransform: "uppercase" }}>
              EST. 2025 · UNDERGROUND LABEL
            </motion.div>

            {/* BONZ wobble hero title */}
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: [0.175, 0.885, 0.32, 1.275] }}
              style={{ display: "flex", gap: "clamp(4px, 1vw, 12px)", margin: "8px 0" }}
            >
              {"BONZ".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="bonz-letter glitch-text"
                  data-text={char}
                  initial={{ y: 60, opacity: 0, rotate: -15 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.7 + i * 0.12, duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
                  style={{
                    fontSize: "clamp(72px, 14vw, 180px)",
                    color: "white",
                    lineHeight: 0.9,
                    letterSpacing: "0.05em",
                    textShadow: "0 0 60px rgba(139,0,0,0.4), 0 0 120px rgba(139,0,0,0.2)",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
              style={{ fontFamily: "var(--font-space-mono)", fontSize: "14px", fontWeight: 700, color: "#555", letterSpacing: "0.2em", marginTop: "8px" }}>
              The chosen wear the void.
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7 }}
              style={{ marginTop: "28px" }}>
              <Magnet padding={20} disabled={false} magnetStrength={3}>
                <button onClick={scrollToAbout} style={{
                  fontFamily: "var(--font-barlow)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.4em",
                  textTransform: "uppercase", padding: "12px 32px",
                  border: "1px solid #8B0000", color: "#8B0000",
                  backgroundColor: "transparent", cursor: "pointer", transition: "all 0.2s"
                }}
                  onMouseOver={e => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#8B0000"
                    ;(e.currentTarget as HTMLButtonElement).style.color = "white"
                  }}
                  onMouseOut={e => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"
                    ;(e.currentTarget as HTMLButtonElement).style.color = "#8B0000"
                  }}
                >
                  Discover →
                </button>
              </Magnet>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{ position: "absolute", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #8B0000, transparent)" }} />
        <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "10px", fontWeight: 700, color: "#333", letterSpacing: "0.3em" }}>SCROLL</div>
      </motion.div>
    </section>
  )
}
