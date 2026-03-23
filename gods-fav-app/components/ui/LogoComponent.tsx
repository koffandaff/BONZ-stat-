"use client"
import Image from "next/image"

interface LogoProps { size?: 'sm' | 'md' | 'lg' }

export default function LogoComponent({ size = 'md' }: LogoProps) {
  const dim = size === 'sm' ? 28 : size === 'lg' ? 48 : 36
  const textSize = size === 'sm' ? "18px" : size === 'lg' ? "32px" : "24px"

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Image
        src="/logo.png"
        alt="BONZ logo"
        width={dim}
        height={dim}
        style={{ objectFit: "contain", filter: "invert(1)" }}
        priority
      />
      <span style={{ display: "flex", gap: "2px", letterSpacing: "0.12em" }}>
        {"BONZ".split("").map((char, i) => (
          <span
            key={i}
            className="bonz-letter"
            style={{
              fontSize: textSize,
              color: "white",
              textShadow: "0 0 8px rgba(139,0,0,0.5)",
            }}
          >
            {char}
          </span>
        ))}
      </span>
    </div>
  )
}
