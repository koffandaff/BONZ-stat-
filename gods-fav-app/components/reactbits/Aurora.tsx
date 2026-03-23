"use client"
export default function Aurora() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 30% 60%, rgba(100,0,0,0.2) 0%, transparent 70%)", animation: "aurora1 6s ease-in-out infinite alternate" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 40% at 70% 40%, rgba(60,0,0,0.15) 0%, transparent 70%)", animation: "aurora2 8s ease-in-out infinite alternate" }} />
      <style>{`@keyframes aurora1 { from { transform: translateX(-5%) scale(1) } to { transform: translateX(5%) scale(1.05) } } @keyframes aurora2 { from { transform: translateX(5%) scale(1.05) } to { transform: translateX(-5%) scale(1) } }`}</style>
    </div>
  )
}
