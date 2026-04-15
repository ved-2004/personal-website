import { getImageByName } from "@/lib/images"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name") ?? ""
  if (!name) return new NextResponse(null, { status: 400 })

  const url = await getImageByName(name)
  if (!url) return new NextResponse(null, { status: 404 })

  // 302 so the browser re-fetches on every load — Notion signed URLs expire in ~1hr
  return NextResponse.redirect(url, { status: 302 })
}
