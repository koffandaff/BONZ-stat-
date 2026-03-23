"use client"
import { motion, useScroll, useAnimationControls } from "framer-motion"
import { useEffect, useState } from "react"
import Magnet from "@/components/reactbits/Magnet"

export default function ScrollToTop() {
  const { scrollY } = useScroll()
  const controls = useAnimationControls()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (latest > 300) {
        setIsVisible(true)
        controls.start({ opacity: 1, scale: 1, y: 0, pointerEvents: "auto" })
      } else {
        setIsVisible(false)
        controls.start({ opacity: 0, scale: 0.8, y: 20, pointerEvents: "none" })
      }
    })
  }, [scrollY, controls])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20, pointerEvents: "none" }}
      animate={controls}
      style={{
        position: "fixed",
        bottom: "40px",
        right: "40px",
        zIndex: 90,
      }}
      className="scroll-to-top"
    >
      <Magnet padding={16} disabled={false} magnetStrength={3}>
        <button
          onClick={scrollToTop}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "rgba(139, 0, 0, 0.8)",
            color: "white",
            border: "1px solid #ff4444",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(139,0,0,0.4)",
            backdropFilter: "blur(10px)",
            transition: "transform 0.2s ease, background-color 0.2s ease",
          }}
          onMouseOver={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(180, 0, 0, 1)";
          }}
          onMouseOut={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(139, 0, 0, 0.8)";
          }}
          aria-label="Scroll to top"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </Magnet>
      
      {/* Add a responsive override for mobile spacing */}
      <style>{`
        @media (max-width: 768px) {
          .scroll-to-top {
            bottom: 24px !important;
            right: 24px !important;
          }
          .scroll-to-top button {
            width: 44px !important;
            height: 44px !important;
          }
        }
      `}</style>
    </motion.div>
  )
}
