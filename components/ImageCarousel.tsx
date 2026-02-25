"use client"

import { useState, useEffect } from "react"
import ZoomableImage from "./ZoomableImage"

interface Props {
  urls: string[]
  alt: string
  width: number
  height: number
}

export default function ImageCarousel({ urls, alt, width, height }: Props) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (urls.length <= 1) return
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % urls.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [urls.length])

  if (urls.length === 0) return null

  if (urls.length === 1) {
    return (
      <ZoomableImage
        src={urls[0]}
        alt={alt}
        style={{ width, height, objectFit: "cover", borderRadius: 8, border: "1px solid var(--border)", flexShrink: 0, display: "block" }}
      />
    )
  }

  return (
    <div style={{ position: "relative", width, height, flexShrink: 0, borderRadius: 8, overflow: "hidden", border: "1px solid var(--border)" }}>
      {urls.map((url, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === current ? 1 : 0,
            transition: "opacity 0.6s ease",
            pointerEvents: i === current ? "auto" : "none",
          }}
        >
          <ZoomableImage
            src={url}
            alt={`${alt} ${i + 1}`}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
      ))}

      {/* Dot indicators */}
      <div style={{
        position: "absolute",
        bottom: 6,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        gap: 5,
        pointerEvents: "none",
      }}>
        {urls.map((_, i) => (
          <div
            key={i}
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: i === current ? "#fff" : "rgba(255,255,255,0.45)",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  )
}
