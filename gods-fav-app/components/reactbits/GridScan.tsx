"use client"
export default function GridScan({ color = "#8B0000", scanSpeed = 3 }: { color?: string; scanSpeed?: number }) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(${color} 1px, transparent 1px)`, backgroundSize: "100% 4px", opacity: 0.1 }} />
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "20%", background: `linear-gradient(to bottom, transparent, ${color}, transparent)`, animation: `gridScan ${scanSpeed}s linear infinite`, opacity: 0.3 }} />
      <style>{`@keyframes gridScan { 0% { transform: translateY(-100%); } 100% { transform: translateY(500%); } }`}</style>
    </div>
  )
}
