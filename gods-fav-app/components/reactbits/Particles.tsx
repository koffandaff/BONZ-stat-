"use client"
import { useEffect, useRef } from "react"

interface Particle { x: number; y: number; vx: number; vy: number; size: number; color: string }

export default function Particles({ particleColors = ["#8B0000"], particleCount = 60, speed = 0.4 }: { particleColors?: string[]; particleCount?: number; speed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let W = 0, H = 0, particles: Particle[] = []
    let animationFrameId: number

    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight
      canvas.width = W; canvas.height = H
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * speed, vy: (Math.random() - 0.5) * speed,
        size: Math.random() * 2 + 1, color: particleColors[Math.floor(Math.random() * particleColors.length)]
      }))
    }
    resize()
    window.addEventListener("resize", resize)

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        ctx.fillStyle = p.color
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill()
      })
      animationFrameId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [particleCount, speed, particleColors])

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
}
