"use client"
import { useEffect, useRef } from "react"

export default function Plasma() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    let W = 0, H = 0, t = 0, animId: number, active = true

    const resize = () => {
      // Run at 1/4 res for much better perf
      W = Math.max(1, Math.floor(canvas.offsetWidth / 4))
      H = Math.max(1, Math.floor(canvas.offsetHeight / 4))
      canvas.width = W; canvas.height = H
    }
    resize()
    window.addEventListener("resize", resize)

    const io = new IntersectionObserver(([e]) => { active = e.isIntersecting }, { threshold: 0 })
    io.observe(canvas)

    const draw = () => {
      if (active) {
        t += 0.02
        const img = ctx.createImageData(W, H)
        const d = img.data
        for (let y = 0; y < H; y++) {
          for (let x = 0; x < W; x++) {
            const v = Math.sin(x * 0.06 + t) + Math.sin(y * 0.05 + t * 0.7) + Math.sin((x + y) * 0.04 + t * 1.3)
            const n = (v + 3) / 6
            const idx = (y * W + x) * 4
            d[idx] = Math.floor(n * 90); d[idx + 1] = 0; d[idx + 2] = 0; d[idx + 3] = Math.floor(n * 130 + 30)
          }
        }
        ctx.putImageData(img, 0, 0)
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => { window.removeEventListener("resize", resize); io.disconnect(); cancelAnimationFrame(animId) }
  }, [])

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", background: "#000" }} />
}
