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
    <div className="border-t pt-4">
      <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={title}
            style={{ width: 56, height: 56, objectFit: "cover", flexShrink: 0, borderRadius: 6, border: "1px solid var(--border)" }}
          />
        )}
        <div style={{ flex: 1 }}>
          <h3 className="font-medium">{title}</h3>
          {status && <p className="text-sm text-slate-500">{status}</p>}

          <div className="flex items-center gap-3 mt-2 text-sm">
            {abstract && (
              <button
                onClick={() => setOpen(!open)}
                className="underline"
                aria-expanded={open}
              >
                Abstract
              </button>
            )}
            {links.map((l) => (
              <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            ))}
          </div>

          {open && abstract && <p className="mt-3 text-sm">{abstract}</p>}
        </div>
      </div>
    </div>
  )
}
