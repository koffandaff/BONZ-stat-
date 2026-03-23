"use client"
export default function SplitText({ text, className }: { text: string; className?: string }) {
  return <div className={className} style={{ display: "inline-block", animation: "splitIn 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards" }}>{text}
    <style>{`@keyframes splitIn { from { opacity: 0; transform: translateY(40px) rotateX(-20deg); } to { opacity: 1; transform: translateY(0) rotateX(0); } }`}</style>
  </div>
}
