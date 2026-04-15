import { notion } from "@/lib/notion"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const pageId   = req.nextUrl.searchParams.get("pageId") ?? ""
  const property = req.nextUrl.searchParams.get("property") ?? "Media"
  const index    = parseInt(req.nextUrl.searchParams.get("index") ?? "0", 10)

  if (!pageId) return new NextResponse(null, { status: 400 })

  let page: any
  try {
    page = await notion.pages.retrieve({ page_id: pageId })
  } catch {
    return new NextResponse(null, { status: 404 })
  }

  const files: any[] = page.properties?.[property]?.files ?? []
  const entry = files[index]
  if (!entry) return new NextResponse(null, { status: 404 })

  const url: string | null = entry.file?.url ?? entry.external?.url ?? null
  if (!url) return new NextResponse(null, { status: 404 })

  // 302 so the browser re-fetches on every load — Notion signed URLs expire in ~1hr
  return NextResponse.redirect(url, { status: 302 })
}
