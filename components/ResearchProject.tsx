"use client"

import { useState } from "react"

export default function ResearchProject({
  title,
  status,
  abstract,
  reportUrl,
  demoUrl,
  imageUrl,
}: {
  title: string
  status?: string
  abstract?: string
  reportUrl?: string | null
  demoUrl?: string | null
  imageUrl?: string | null
}) {
  const [open, setOpen] = useState(false)

  const links = [
    reportUrl && { label: "Report", url: reportUrl },
    demoUrl && { label: "Demo", url: demoUrl },
  ].filter(Boolean) as { label: string; url: string }[]

  return (
    <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem", paddingBottom: "0.25rem" }}>
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={title}
            style={{ width: 48, height: 48, objectFit: "cover", flexShrink: 0, borderRadius: 4, border: "1px solid var(--border)" }}
          />
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: "1rem", color: "#990000" }}>{title}</div>
          {status && (
            <span style={{
              display: "inline-block",
              fontSize: "0.7rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              border: "1px solid var(--border)",
              borderRadius: 3,
              padding: "0.1rem 0.45rem",
              color: "var(--muted)",
              marginTop: "0.35rem",
            }}>
              {status}
            </span>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.5rem", fontSize: "0.875rem", flexWrap: "wrap" }}>
            {abstract && (
              <button
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--link)",
                  cursor: "pointer",
                  fontSize: "inherit",
                  fontFamily: "inherit",
                  padding: 0,
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                {open ? "Hide abstract" : "Abstract"}
              </button>
            )}
            {links.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
                {l.label} ↗
              </a>
            ))}
          </div>
          {open && abstract && (
            <p style={{
              marginTop: "0.75rem",
              fontSize: "0.9rem",
              lineHeight: 1.7,
              color: "var(--text)",
              fontStyle: "italic",
              borderLeft: "2px solid var(--border)",
              paddingLeft: "0.75rem",
              marginBottom: 0,
            }}>
              {abstract}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
