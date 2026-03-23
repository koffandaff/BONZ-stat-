"use client"
export default function Iridescence() {
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(45deg, rgba(139,0,0,0.1), rgba(0,0,0,0), rgba(139,0,0,0.2))", animation: "irid 8s ease infinite alternate" }}>
      <style>{`@keyframes irid { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(20deg); } }`}</style>
    </div>
  )
}
