"use client"
import { useEffect, useRef } from "react"

export default function Hyperspeed() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let W = 0, H = 0, stars: { x: number; y: number; z: number; pz: number }[] = [], animId: number, active = true

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight
      canvas.width = W; canvas.height = H
      stars = Array.from({ length: 120 }, () => ({
        x: (Math.random() - 0.5) * W, y: (Math.random() - 0.5) * H, z: Math.random() * W, pz: 0
      }))
    }
    resize()
    window.addEventListener("resize", resize)

    const io = new IntersectionObserver(([e]) => { active = e.isIntersecting }, { threshold: 0 })
    io.observe(canvas)

    const draw = () => {
      if (active) {
        const cx = W / 2, cy = H / 2
        ctx.fillStyle = "rgba(0,0,0,0.18)"
        ctx.fillRect(0, 0, W, H)
        stars.forEach(s => {
          s.pz = s.z; s.z -= 5
          if (s.z <= 0) { s.z = W; s.x = (Math.random() - 0.5) * W; s.y = (Math.random() - 0.5) * H; s.pz = s.z }
          const sx = (s.x / s.z) * W + cx, sy = (s.y / s.z) * H + cy
          const px = (s.x / s.pz) * W + cx, py = (s.y / s.pz) * H + cy
          const bright = 1 - s.z / W
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(sx, sy)
          ctx.strokeStyle = `rgba(${Math.floor(180 + 75 * bright)},0,0,${bright * 0.7})`
          ctx.lineWidth = Math.max(0.2, bright * 1.8); ctx.stroke()
        })
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => { window.removeEventListener("resize", resize); io.disconnect(); cancelAnimationFrame(animId) }
  }, [])

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", background: "black" }} />
}
