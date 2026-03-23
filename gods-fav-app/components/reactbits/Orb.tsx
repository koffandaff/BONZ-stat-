"use client"
export default function Orb({ hue = 0, size = 300, opacity = 0.5, blur = 80 }: { hue?: number; size?: number; opacity?: number; blur?: number }) {
  return <div style={{
    width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"
  }}>
    <div style={{
      width: size, height: size,
      background: `radial-gradient(circle, hsla(${hue}, 100%, 30%, ${opacity}), transparent)`,
      filter: `blur(${blur}px)`,
      borderRadius: "50%",
      animation: "orbPulse 4s ease-in-out infinite"
    }} />
    <style>{`@keyframes orbPulse { 0%,100% { transform: scale(1); opacity: 0.8; } 50% { transform: scale(1.15); opacity: 1; } }`}</style>
  </div>
}
