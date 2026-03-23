"use client"
export default function BlurText({ text, className }: { text: string; className?: string }) {
  return <div className={className} style={{ display: "inline-block", animation: "blurIn 1s ease-out forwards" }}>{text}
    <style>{`@keyframes blurIn { from { filter: blur(10px); opacity: 0; } to { filter: blur(0); opacity: 1; } }`}</style>
  </div>
}
