"use client"
import FloatingLines from "@/components/reactbits/FloatingLines"
import { motion } from "framer-motion"

const TEXT = "BONZ  ◆  WEAR THE VOID  ◆  BORN CHOSEN  ◆  DARK CULTURE  ◆  NOT FOR EVERYONE  ◆  SS 2025  ◆  UNDERGROUND  ◆  "
const REPEATED = TEXT + TEXT + TEXT

export default function Marquee() {
  return (
    <div style={{ position: "relative", height: "36px", display: "flex", alignItems: "center", borderTop: "1px solid var(--c-ash)", borderBottom: "1px solid var(--c-ash)", background: "var(--c-deep)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.12 }}>
        <FloatingLines color="#8B0000" />
      </div>
      <motion.div
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity, repeatType: "loop" }}
        style={{ display: "flex", whiteSpace: "nowrap", position: "relative", zIndex: 1 }}
      >
        <span style={{ fontFamily: "var(--font-bebas)", fontSize: "13px", letterSpacing: "0.35em", textTransform: "uppercase" }}>
          {REPEATED.split("◆").map((part, i) => (
            <span key={i}>{part}<span style={{ color: "#8B0000" }}>◆</span></span>
          ))}
        </span>
      </motion.div>
    </div>
  )
}
