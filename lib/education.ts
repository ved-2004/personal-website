import { notion } from "./notion"

export type EducationMeta = {
  id: string
  institution: string
  degree?: string
  field?: string
  startDate?: string
  endDate?: string | null
  gpa?: string
  location?: string
  iconUrl?: string | null
  mediaUrls: string[]
}

/**
 * Fetch all education entries from a Notion data source (sorted by Start Date desc).
 *
 * Expected Notion database properties:
 *   Institution — Title
 *   Degree      — Rich text  (e.g. "Master of Science")
 *   Field       — Rich text  (e.g. "Computer Science")
 *   Start Date  — Date
 *   End Date    — Date
 *   GPA         — Rich text
 *   Location    — Rich text
 *   Icon        — Files & media (optional, single — institution logo)
 *   Media       — Files & media (optional, multiple)
 *
 * Set NOTION_EDUCATION_DATASOURCE to the data source ID (not database ID).
 * In Notion: open the database → ··· → "Manage data sources" → "Copy data source ID".
 */
export async function getEducation(): Promise<EducationMeta[]> {
  const ds = process.env.NOTION_EDUCATION_DATASOURCE
  if (!ds) {
    console.warn("Missing NOTION_EDUCATION_DATASOURCE env var")
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
      institution: p?.Institution?.title?.[0]?.plain_text ?? "",
      degree: p?.Degree?.rich_text?.[0]?.plain_text ?? undefined,
      field: p?.Field?.rich_text?.[0]?.plain_text ?? undefined,
      startDate: p?.["Start Date"]?.date?.start ?? undefined,
      endDate: p?.["End Date"]?.date?.start ?? null,
      gpa: p?.GPA?.rich_text?.[0]?.plain_text ?? undefined,
      location: p?.Location?.rich_text?.[0]?.plain_text ?? undefined,
      iconUrl: p?.Icon?.files?.[0]?.file?.url ?? p?.Icon?.files?.[0]?.external?.url ?? null,
      mediaUrls: (p?.Media?.files ?? [])
        .map((f: any) => f.file?.url ?? f.external?.url ?? null)
        .filter(Boolean),
    } satisfies EducationMeta
  })
}
