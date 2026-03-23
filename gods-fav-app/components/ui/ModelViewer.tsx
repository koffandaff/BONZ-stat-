"use client"
import React, { useEffect, useRef } from "react"

interface ModelViewerProps {
  url: string
  width?: number
  height?: number
}

export default function ModelViewer({ url, width = 400, height = 400 }: ModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamically create the model-viewer element after script is guaranteed loaded
    if (!containerRef.current) return

    const mv = document.createElement("model-viewer") as HTMLElement
    mv.setAttribute("src", url)
    mv.setAttribute("camera-controls", "")
    mv.setAttribute("auto-rotate", "")
    mv.setAttribute("rotation-per-second", "30deg")
    mv.setAttribute("shadow-intensity", "1")
    mv.setAttribute("interaction-prompt", "none")
    mv.setAttribute("touch-action", "pan-y")
    mv.style.width = "100%"
    mv.style.height = "100%"
    mv.style.backgroundColor = "transparent"
    mv.style.outline = "none"

    containerRef.current.innerHTML = ""
    containerRef.current.appendChild(mv)

    return () => {
      if (containerRef.current) containerRef.current.innerHTML = ""
    }
  }, [url])

  return (
    <div
      ref={containerRef}
      style={{
        width, height,
        position: "relative",
        overflow: "hidden",
        background: "radial-gradient(ellipse at center, rgba(139,0,0,0.08) 0%, transparent 70%)",
      }}
    />
  )
}
