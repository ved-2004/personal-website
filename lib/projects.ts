import { notion } from "./notion"

export type ProjectMeta = {
  id: string
  title: string
  description?: string
  status?: string
  tags: string[]
  team: string[]
  url?: string | null
  githubUrl?: string | null
  mediaUrls: string[]
}

/**
 * Fetch all project entries from a Notion data source.
 *
 * Expected Notion database properties:
 *   Title       — Title
 *   Description — Rich text
 *   Status      — Select
 *   Tags        — Multi-select  (skills / tech stack)
 *   Team        — Multi-select  (LinkedIn URLs of teammates)
 *   URL         — URL
 *   GitHub URL  — URL
 *   Media       — Files & media (optional, multiple)
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
    sorts: [{ property: "Order", direction: "ascending" }],
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
      team: p?.Team?.multi_select?.map((t: any) => t.name) ?? [],
      url: p?.URL?.url ?? null,
      githubUrl: p?.["GitHub URL"]?.url ?? null,
      mediaUrls: (p?.Media?.files ?? [])
        .map((f: any) => f.file?.url ?? f.external?.url ?? null)
        .filter(Boolean),
    } satisfies ProjectMeta
  })
}
