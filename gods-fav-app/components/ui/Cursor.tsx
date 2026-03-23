"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      if (cursorRef.current) cursorRef.current.style.display = "none";
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const render = () => {
      // Smooth interpolation
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove);
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed", top: 0, left: 0, pointerEvents: "none", zIndex: 10000,
        willChange: "transform"
      }}
    >
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <line x1="18" y1="0" x2="18" y2="36" stroke="#8B0000" strokeWidth="1" />
        <line x1="0" y1="18" x2="36" y2="18" stroke="#8B0000" strokeWidth="1" />
        <circle cx="18" cy="18" r="2" fill="#8B0000" />
      </svg>
    </div>
  );
}
