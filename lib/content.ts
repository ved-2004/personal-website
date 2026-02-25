import { notion } from "./notion"

export type ContentItem = {
  name: string
  value: string
  url: string | null
  order: number
}

/**
 * Fetch all content items for a given page from the Content Notion database.
 * Results are sorted by Order (ascending).
 *
 * Expected Notion database properties:
 *   Name   — Title    (lookup key, e.g. "bio-1", "focus-body", "link-github")
 *   Value  — Rich text (the display text; for link items this is the link label)
 *   URL    — URL      (optional — only for link items)
 *   Page   — Select   (which page this belongs to: "home", "research", etc.)
 *   Order  — Number   (display order within the page)
 *
 * Set NOTION_CONTENT_DATASOURCE to the data source ID (not database ID).
 */
export async function getPageContent(page: string): Promise<ContentItem[]> {
  const ds = process.env.NOTION_CONTENT_DATASOURCE
  if (!ds) {
    console.warn("Missing NOTION_CONTENT_DATASOURCE env var")
    return []
  }

  const resp = await notion.dataSources.query({
    data_source_id: ds,
    filter: { property: "Page", select: { equals: page } },
    sorts: [{ property: "Order", direction: "ascending" }],
    page_size: 100,
  })

  return (resp.results || []).map((row: any) => {
    const p = row.properties ?? {}
    return {
      name: p?.Name?.title?.[0]?.plain_text ?? "",
      value: p?.Value?.rich_text?.[0]?.plain_text ?? "",
      url: p?.URL?.url ?? null,
      order: p?.Order?.number ?? 0,
    }
  })
}
