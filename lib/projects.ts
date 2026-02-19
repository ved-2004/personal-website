import { notion } from "./notion"

export type ProjectMeta = {
  id: string
  title: string
  description?: string
  status?: string
  tags: string[]
  url?: string | null
  githubUrl?: string | null
  imageUrl?: string | null
}

/**
 * Fetch all project entries from a Notion data source.
 *
 * Expected Notion database properties:
 *   Title       — Title
 *   Description — Rich text
 *   Status      — Select
 *   Tags        — Multi-select
 *   URL         — URL
 *   GitHub URL  — URL
 *   Image       — Files & media (optional)
 *
 * Set NOTION_PROJECTS_DATASOURCE to the data source ID (not database ID).
 * In Notion: open the database → ··· → "Manage data sources" → "Copy data source ID".
 */
export async function getProjects(): Promise<ProjectMeta[]> {
  const ds = process.env.NOTION_PROJECTS_DATASOURCE
  if (!ds) {
    console.warn("Missing NOTION_PROJECTS_DATASOURCE env var")
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
      description: p?.Description?.rich_text?.[0]?.plain_text ?? undefined,
      status: p?.Status?.select?.name ?? undefined,
      tags: p?.Tags?.multi_select?.map((t: any) => t.name) ?? [],
      url: p?.URL?.url ?? null,
      githubUrl: p?.["GitHub URL"]?.url ?? null,
      imageUrl: p?.Image?.files?.[0]?.file?.url ?? p?.Image?.files?.[0]?.external?.url ?? null,
    } satisfies ProjectMeta
  })
}
