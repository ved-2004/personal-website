"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/research", label: "Research" },
  { href: "/writing", label: "Writing" },
]

export default function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="container flex flex-wrap justify-center gap-x-5 gap-y-1 py-2 text-sm px-4">
      {links.map(({ href, label }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            style={{
              fontWeight: active ? 700 : undefined,
              textDecoration: active ? "underline" : undefined,
              textUnderlineOffset: active ? "4px" : undefined,
            }}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
