"use client"

import { useState } from "react"
import NotionContent from "./NotionContent"

export default function ExpandableSection({ markdown }: { markdown: string }) {
  const [open, setOpen] = useState(false)

  if (!markdown.trim()) return null

  return (
    <div style={{ marginTop: "0.85rem" }}>
      {open && (
        <div style={{
          borderLeft: "2px solid var(--border)",
          paddingLeft: "1rem",
          marginBottom: "0.75rem",
        }}>
          <NotionContent markdown={markdown} />
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        style={{
          background: "none",
          border: "none",
          color: "var(--link)",
          cursor: "pointer",
          fontSize: "0.85rem",
          fontFamily: "inherit",
          padding: 0,
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}
      >
        {open ? "Show less ↑" : "Read more ↓"}
      </button>
    </div>
  )
}
