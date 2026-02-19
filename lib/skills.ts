import { notion } from "./notion"

export type SkillMeta = {
  id: string
  name: string
  experience?: string
}

/**
 * Fetch all skill entries from a Notion data source.
 *
 * Expected Notion database properties:
 *   Name       — Title
 *   Experience — Rich text  (e.g. "3 years", "Used in production")
 *   Published  — Checkbox
 *
 * Set NOTION_SKILLS_DATASOURCE to the data source ID (not database ID).
 * In Notion: open the database → ··· → "Manage data sources" → "Copy data source ID".
 */
export async function getSkills(): Promise<SkillMeta[]> {
  const ds = process.env.NOTION_SKILLS_DATASOURCE
  if (!ds) {
    console.warn("Missing NOTION_SKILLS_DATASOURCE env var")
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
      name: p?.Name?.title?.[0]?.plain_text ?? "",
      experience: p?.Experience?.rich_text?.[0]?.plain_text ?? undefined,
    } satisfies SkillMeta
  })
}
