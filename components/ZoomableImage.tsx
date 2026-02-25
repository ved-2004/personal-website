"use client"

import { useState, useEffect } from "react"

interface Props {
  src: string
  alt: string
  style?: React.CSSProperties
}

export default function ZoomableImage({ src, alt, style }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{ ...style, cursor: "zoom-in" }}
        onClick={() => setOpen(true)}
      />

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            cursor: "zoom-out",
            padding: "2rem",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={e => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: 10,
              boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
              cursor: "default",
            }}
          />
        </div>
      )}
    </>
  )
}
