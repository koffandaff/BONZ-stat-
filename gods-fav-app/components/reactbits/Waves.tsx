"use client"
import { useEffect, useRef } from "react"

export default function Waves() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let W = 0, H = 0, t = 0, animId: number, active = true

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight
      canvas.width = W; canvas.height = H
    }
    resize()
    window.addEventListener("resize", resize)

    const io = new IntersectionObserver(([e]) => { active = e.isIntersecting }, { threshold: 0 })
    io.observe(canvas)

    const draw = () => {
      if (active) {
        t += 0.012
        ctx.clearRect(0, 0, W, H)
        for (let i = 0; i < 4; i++) {
          ctx.beginPath()
          const baseY = H * 0.3 + i * (H * 0.18)
          ctx.moveTo(0, baseY)
          for (let x = 0; x <= W; x += 8) {
            ctx.lineTo(x, baseY + Math.sin(x * 0.018 + t + i * 0.6) * (16 - i * 2))
          }
          ctx.strokeStyle = `rgba(139,0,0,${0.07 - i * 0.01})`
          ctx.lineWidth = 1; ctx.stroke()
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => { window.removeEventListener("resize", resize); io.disconnect(); cancelAnimationFrame(animId) }
  }, [])

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
}
