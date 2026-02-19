import { notion } from "./notion"

export type ResearchMeta = {
  id: string
  title: string
  status?: string
  abstract?: string
  reportUrl?: string | null
  demoUrl?: string | null
  imageUrl?: string | null
}

/**
 * Fetch all research project entries from a Notion data source.
 *
 * Expected Notion database properties:
 *   Title      — Title
 *   Status     — Rich text (e.g. "completed", "prototype")
 *   Abstract   — Rich text
 *   Report URL — URL
 *   Demo URL   — URL
 *   Image      — Files & media (optional)
 *
 * Set NOTION_RESEARCH_DATASOURCE to the data source ID (not database ID).
 * In Notion: open the database → ··· → "Manage data sources" → "Copy data source ID".
 */
export async function getResearchProjects(): Promise<ResearchMeta[]> {
  const ds = process.env.NOTION_RESEARCH_DATASOURCE
  if (!ds) {
    console.warn("Missing NOTION_RESEARCH_DATASOURCE env var")
    return []
  }

  const resp = await notion.dataSources.query({
    data_source_id: ds,
    filter: { property: "Published", checkbox: { equals: true } },
    page_size: 100,
  })

  return (resp.results || []).map((page: any) => {
    const id: string = page.id
    const p = page.properties ?? {}
    return {
      id,
      title: p?.Title?.title?.[0]?.plain_text ?? "",
      status: p?.Status?.rich_text?.[0]?.plain_text ?? undefined,
      abstract: p?.Abstract?.rich_text?.[0]?.plain_text ?? undefined,
      reportUrl: p?.["Report URL"]?.url ?? null,
      demoUrl: p?.["Demo URL"]?.url ?? null,
      imageUrl: p?.Image?.files?.[0]?.file?.url ?? p?.Image?.files?.[0]?.external?.url ?? null,
    } satisfies ResearchMeta
  })
}
