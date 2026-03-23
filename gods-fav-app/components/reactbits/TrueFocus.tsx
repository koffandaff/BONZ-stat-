"use client"
export default function TrueFocus({ sentence, focusColor }: { sentence: string; focusColor?: string }) {
  return <div style={{ color: focusColor || "white", transition: "all 0.3s" }}>{sentence}</div>
}
