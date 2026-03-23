"use client"
import { ReactNode } from "react"
export default function Magnet({ children }: { children: ReactNode; padding?: number; disabled?: boolean; magnetStrength?: number }) {
  return <div style={{ display: "inline-block", transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}
    onMouseMove={(e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      e.currentTarget.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`
    }}
    onMouseLeave={(e) => e.currentTarget.style.transform = "translate(0, 0)"}
  >{children}</div>
}
