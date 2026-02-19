import { notion } from "./notion"

export type ExperienceMeta = {
  id: string
  company: string
  role: string
  startDate?: string
  endDate?: string | null
  summary?: string
  location?: string
  imageUrl?: string | null
}

/**
 * Fetch all experience entries from a Notion data source (sorted by Start Date desc).
 *
 * Expected Notion database properties:
 *   Company    — Title
 *   Role       — Rich text
 *   Start Date — Date
 *   End Date   — Date
 *   Summary    — Rich text
 *   Location   — Rich text
 *   Image      — Files & media (optional)
 *
 * Set NOTION_EXPERIENCE_DATASOURCE to the data source ID (not database ID).
 * In Notion: open the database → ··· → "Manage data sources" → "Copy data source ID".
 */
export async function getExperiences(): Promise<ExperienceMeta[]> {
  const ds = process.env.NOTION_EXPERIENCE_DATASOURCE
  if (!ds) {
    console.warn("Missing NOTION_EXPERIENCE_DATASOURCE env var")
    return []
  }

  const resp = await notion.dataSources.query({
    data_source_id: ds,
    filter: { property: "Published", checkbox: { equals: true } },
    sorts: [{ property: "Start Date", direction: "descending" }],
    page_size: 100,
  })

  return (resp.results || []).map((page: any) => {
    const id: string = page.id
    const p = page.properties ?? {}
    return {
      id,
      company: p?.Company?.title?.[0]?.plain_text ?? "",
      role: p?.Role?.rich_text?.[0]?.plain_text ?? "",
      startDate: p?.["Start Date"]?.date?.start ?? undefined,
      endDate: p?.["End Date"]?.date?.start ?? null,
      summary: p?.Summary?.rich_text?.[0]?.plain_text ?? undefined,
      location: p?.Location?.rich_text?.[0]?.plain_text ?? undefined,
      imageUrl: p?.Image?.files?.[0]?.file?.url ?? p?.Image?.files?.[0]?.external?.url ?? null,
    } satisfies ExperienceMeta
  })
}
