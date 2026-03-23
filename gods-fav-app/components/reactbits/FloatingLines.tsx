"use client"
import { useEffect, useRef } from "react"

export default function FloatingLines({ color = "#8B0000", speed = 1 }: { color?: string; speed?: number }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.innerHTML = ""
    for (let i = 0; i < 4; i++) {
      const line = document.createElement("div")
      const top = 20 + i * 20
      const dur = (3 + i * 1.5) / speed
      const delay = -i * 1.2
      line.style.cssText = `position:absolute;top:${top}%;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${color},transparent);animation:flineMove ${dur}s linear ${delay}s infinite`
      containerRef.current.appendChild(line)
    }
  }, [color, speed])

  return <>
    <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }} />
    <style>{`@keyframes flineMove { from { transform: translateX(-100%); } to { transform: translateX(300%); } }`}</style>
  </>
}
