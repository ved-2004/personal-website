"use client"

import { useState } from "react"

const LIMIT = 160

export default function ExpandableText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false)

  if (text.length <= LIMIT) {
    return <p style={{ marginTop: "0.6rem", marginBottom: 0 }}>{text}</p>
  }

  return (
    <p style={{ marginTop: "0.6rem", marginBottom: 0 }}>
      {expanded ? text : text.slice(0, LIMIT).trimEnd() + "…"}
      {" "}
      <button
        onClick={() => setExpanded(!expanded)}
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
        {expanded ? "Read less" : "Read more"}
      </button>
    </p>
  )
}
