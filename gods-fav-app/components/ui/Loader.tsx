"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

// Smoke wisp component — each wisp is an animated gradient blob
function SmokeWisp({ delay, x, size, dur }: { delay: number; x: string; size: number; dur: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, scale: 0.5 }}
      animate={{ opacity: [0, 0.25, 0.4, 0.2, 0], y: -300, scale: [0.5, 1.2, 1.8, 2.2], x: [0, 20, -15, 30] }}
      transition={{ duration: dur, delay, ease: "easeOut" }}
      style={{
        position: "absolute",
        bottom: "30%",
        left: x,
        width: size,
        height: size,
        borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(255,255,255,0.2) 0%, rgba(200,200,200,0.08) 40%, transparent 70%)",
        filter: `blur(${size * 0.3}px)`,
        pointerEvents: "none",
        willChange: "transform, opacity"
      }}
    />
  )
}

export default function Loader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += 1.8
      setProgress(Math.min(p, 100))
      if (p >= 100) {
        clearInterval(interval)
        // Trigger smoke phase before exit
        setExiting(true)
        setTimeout(() => onFinish(), 1200)
      }
    }, 16)
    return () => clearInterval(interval)
  }, [onFinish])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{
        position: "fixed", inset: 0, zIndex: 99999, backgroundColor: "#000",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "32px",
        overflow: "hidden"
      }}
    >
      {/* Smoke wisps — appear when loading completes */}
      {exiting && (
        <>
          <SmokeWisp delay={0} x="20%" size={120} dur={1.8} />
          <SmokeWisp delay={0.15} x="70%" size={100} dur={1.6} />
          <SmokeWisp delay={0.25} x="45%" size={180} dur={2.2} />
          <SmokeWisp delay={0.05} x="10%" size={110} dur={2.1} />
        </>
      )}

      {/* Smoke haze overlay — fades in during exit */}
      <motion.div
        animate={exiting ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 100% 80% at 50% 60%, rgba(255,255,255,0.1) 0%, rgba(200,200,200,0.15) 50%, transparent 80%)",
          filter: "blur(30px)",
          pointerEvents: "none",
          willChange: "opacity"
        }}
      />

      {/* Pulsing glow */}
      <motion.div
        animate={exiting
          ? { scale: 2.5, opacity: 0 }
          : { scale: [1, 1.25, 1], opacity: [0.15, 0.45, 0.15] }
        }
        transition={exiting
          ? { duration: 1, ease: "easeOut" }
          : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
        }
        style={{
          position: "absolute", width: "160px", height: "120px",
          background: "radial-gradient(ellipse, rgba(139,0,0,0.6) 0%, transparent 70%)",
          filter: "blur(30px)"
        }}
      />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
        animate={exiting
          ? { opacity: 0, scale: 1.3, y: -40, filter: "blur(10px)" }
          : { opacity: 1, scale: 1, rotate: 0 }
        }
        transition={exiting
          ? { duration: 0.8, ease: "easeIn" }
          : { duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }
        }
      >
        <Image
          src="/logo.png"
          alt="BONZ logo"
          width={80}
          height={80}
          style={{ objectFit: "contain", filter: "invert(1)" }}
          priority
        />
      </motion.div>

      {/* BONZ wobble title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={exiting
          ? { opacity: 0, y: -30, filter: "blur(8px)" }
          : { opacity: 1, y: 0 }
        }
        transition={exiting
          ? { duration: 0.6, ease: "easeIn" }
          : { delay: 0.3, duration: 0.6 }
        }
        style={{ display: "flex", gap: "6px" }}
      >
        {"BONZ".split("").map((char, i) => (
          <motion.span
            key={i}
            className="bonz-letter"
            initial={{ y: 30, opacity: 0, rotate: -10 }}
            animate={exiting
              ? { y: -20, opacity: 0, rotate: 10 }
              : { y: 0, opacity: 1, rotate: 0 }
            }
            transition={exiting
              ? { delay: i * 0.05, duration: 0.4 }
              : { delay: 0.35 + i * 0.1, duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }
            }
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              color: "white",
              textShadow: "0 0 20px rgba(139,0,0,0.6), 0 0 60px rgba(139,0,0,0.3)",
              letterSpacing: "0.08em"
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={exiting ? { opacity: 0, y: 20 } : { opacity: 1 }}
        transition={exiting ? { duration: 0.3 } : { delay: 0.4 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
      >
        <div style={{ width: "220px", height: "2px", backgroundColor: "#111", overflow: "hidden", borderRadius: "2px" }}>
          <motion.div
            style={{ height: "100%", backgroundColor: "#8B0000", boxShadow: "0 0 12px rgba(139,0,0,0.8)" }}
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.016 }}
          />
        </div>
        <div style={{ fontFamily: "var(--font-space-mono)", fontSize: "10px", color: "#E8E2D9", letterSpacing: "0.5em", marginTop: "4px" }}>
          {Math.floor(progress).toString().padStart(3, "0")} %
        </div>
      </motion.div>
    </motion.div>
  )
}
