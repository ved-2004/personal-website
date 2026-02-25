import { getImageByName } from "@/lib/images"

export const revalidate = 3600 // re-fetch from Notion every hour

export async function GET() {
  const notionUrl = await getImageByName(process.env.IMAGE_NAME_FAVICON ?? "")

  if (!notionUrl) {
    return new Response(null, { status: 404 })
  }

  const upstream = await fetch(notionUrl)
  const buffer = await upstream.arrayBuffer()
  const contentType = upstream.headers.get("content-type") ?? "image/png"

  return new Response(buffer, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  })
}
