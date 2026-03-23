"use client"
import { motion } from "framer-motion"

export default function Vision() {
  return (
    <section id="vision" style={{
      position: "relative", minHeight: "85svh", overflow: "hidden",
      borderTop: "1px solid #1a1a1a",
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#000",
      /* CSS-only plasma-like bg — no canvas */
      backgroundImage: `
        radial-gradient(ellipse 70% 50% at 20% 30%, rgba(139,0,0,0.12) 0%, transparent 60%),
        radial-gradient(ellipse 50% 70% at 80% 70%, rgba(80,0,0,0.08) 0%, transparent 60%),
        linear-gradient(rgba(139,0,0,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(139,0,0,0.03) 1px, transparent 1px)
      `,
      backgroundSize: "100% 100%, 100% 100%, 50px 50px, 50px 50px"
    }}>
      {/* Ghost watermark */}
      <div style={{
        position: "absolute", fontFamily: "var(--font-bebas)", fontSize: "clamp(120px, 22vw, 300px)",
        color: "white", opacity: 0.018, userSelect: "none", letterSpacing: "-0.02em",
        animation: "ghost-rot 10s ease-in-out infinite"
      }}>GF</div>
      <style>{`@keyframes ghost-rot { 0%,100% { transform: rotate(0deg); } 50% { transform: rotate(1.5deg); } }`}</style>

      <div className="rp" style={{ position: "relative", zIndex: 2, maxWidth: "700px", margin: "auto", padding: "100px 40px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontFamily: "var(--font-barlow)", fontSize: "9px", color: "#8B0000", letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: "24px" }}>
          OUR VISION
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          style={{ fontFamily: "var(--font-cinzel)", fontSize: "clamp(22px, 3.5vw, 40px)", lineHeight: 1.3, marginBottom: "20px" }}>
          <span style={{ color: "#E8E2D9" }}>We were not built for now.</span><br />
          <span style={{ color: "white" }}>We were built for forever<span style={{ color: "#8B0000" }}>.</span></span>
        </motion.h2>

        <motion.div initial={{ width: "0px" }} whileInView={{ width: "80px" }} viewport={{ once: true }} transition={{ duration: 0.9, ease: "easeOut" }}
          style={{ height: "1px", background: "#8B0000", margin: "28px auto", boxShadow: "0 0 12px rgba(139,0,0,0.5)" }} />

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
          style={{ fontFamily: "var(--font-space-mono)", fontSize: "11px", color: "#444", lineHeight: 2.4, marginBottom: "52px" }}>
          Crafted for the few. Remembered by all.<br />Dark culture has a uniform — this is it.
        </motion.p>

        <div style={{ display: "flex", justifyContent: "center", gap: "48px", flexWrap: "wrap" }}>
          {[
            { title: "THE MARK", text: "Identity forged in the void." },
            { title: "THE CLOTH", text: "Heavy, enduring, pitch black." },
            { title: "THE MOVEMENT", text: "Silent but absolute." }
          ].map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.08 * i }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", maxWidth: "160px" }}>
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="#8B0000" fill="none" strokeWidth="1">
                <line x1="12" y1="2" x2="12" y2="22" /><line x1="2" y1="12" x2="22" y2="12" /><circle cx="12" cy="12" r="3" />
              </svg>
              <div style={{ fontFamily: "var(--font-bebas)", fontSize: "20px", color: "white", letterSpacing: "0.1em" }}>{p.title}</div>
              <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "10px", color: "#444" }}>{p.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
