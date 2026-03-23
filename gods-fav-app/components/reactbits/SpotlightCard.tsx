"use client"
import { ReactNode } from "react"
export default function SpotlightCard({ children, spotlightColor = "rgba(255,255,255,0.1)" }: { children: ReactNode; spotlightColor?: string }) {
  return <div style={{ position: "relative", overflow: "hidden", borderRadius: 0, background: "transparent" }}
    onMouseMove={(e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      e.currentTarget.style.background = `radial-gradient(circle at ${x}px ${y}px, ${spotlightColor}, transparent 80%)`
    }}
    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
  >{children}</div>
}
