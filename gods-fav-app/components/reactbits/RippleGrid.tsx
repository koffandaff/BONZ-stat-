"use client"
export default function RippleGrid({ color = "#8B0000", gridSize = 40 }: { color?: string; gridSize?: number }) {
  return <div style={{
    width: "100%", height: "100%", opacity: 0.1,
    backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
    backgroundSize: `${gridSize}px ${gridSize}px`
  }} />
}
