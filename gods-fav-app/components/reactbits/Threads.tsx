"use client"
import { useEffect, useRef } from "react"

export default function Threads() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let W = 0, H = 0, threads: { x: number; y: number; vx: number; vy: number; len: number; angle: number; da: number }[] = []
    let animId: number, active = true

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight
      canvas.width = W; canvas.height = H
      threads = Array.from({ length: 6 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        len: 60 + Math.random() * 90, angle: Math.random() * Math.PI * 2, da: (Math.random() - 0.5) * 0.003
      }))
    }
    resize()
    window.addEventListener("resize", resize)

    const io = new IntersectionObserver(([e]) => { active = e.isIntersecting }, { threshold: 0 })
    io.observe(canvas)

    const draw = () => {
      if (active) {
        ctx.clearRect(0, 0, W, H)
        threads.forEach(t => {
          t.x += t.vx; t.y += t.vy; t.angle += t.da
          if (t.x < -t.len) t.x = W + t.len
          if (t.x > W + t.len) t.x = -t.len
          if (t.y < -t.len) t.y = H + t.len
          if (t.y > H + t.len) t.y = -t.len
          const ex = t.x + Math.cos(t.angle) * t.len
          const ey = t.y + Math.sin(t.angle) * t.len
          const g = ctx.createLinearGradient(t.x, t.y, ex, ey)
          g.addColorStop(0, "rgba(139,0,0,0)"); g.addColorStop(0.5, "rgba(139,0,0,0.18)"); g.addColorStop(1, "rgba(139,0,0,0)")
          ctx.beginPath(); ctx.moveTo(t.x, t.y); ctx.lineTo(ex, ey)
          ctx.strokeStyle = g; ctx.lineWidth = 0.8; ctx.stroke()
        })
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => { window.removeEventListener("resize", resize); io.disconnect(); cancelAnimationFrame(animId) }
  }, [])

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
}
