"use client"
import { useEffect, useRef } from "react"

export default function Silk() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let W = 0, H = 0, t = 0
    let animationFrameId: number

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight
      canvas.width = W; canvas.height = H
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      t += 0.006
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < 6; i++) {
        const y = H * (i / 5)
        const wave = Math.sin(t + i * 0.8) * 30
        const g = ctx.createLinearGradient(0, y + wave, W, y + wave + 20)
        const hue = i * 8
        g.addColorStop(0, `hsla(${hue},80%,15%,0)`)
        g.addColorStop(0.4, `hsla(${hue + 10},60%,25%,0.15)`)
        g.addColorStop(0.6, `hsla(${hue},70%,20%,0.1)`)
        g.addColorStop(1, `hsla(${hue},80%,15%,0)`)
        ctx.beginPath(); ctx.moveTo(0, y + wave)
        for (let x = 0; x <= W; x += 10) {
          const wy = y + Math.sin(t * 1.2 + x * 0.02 + i) * 20 + wave
          ctx.lineTo(x, wy)
        }
        ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.closePath()
        ctx.fillStyle = g; ctx.fill()
      }
      animationFrameId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
}
