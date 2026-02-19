import { notion } from "./notion"

export type PostMeta = {
  id: string
  rawId: string // hyphen-stripped ID for notion-client (used by react-notion-x)
  title: string
  slug: string
  date?: string
  summary?: string
  externalUrl?: string | null
}

/**
 * Fetch all published posts from a Notion data source (sorted by Date desc).
 *
 * IMPORTANT: NOTION_WRITING_DATASOURCE must be a DATA SOURCE ID, not a database ID.
 * In the Notion app: open your database → ··· menu → "Manage data sources"
 * → "Copy data source ID". It looks like a UUID but is distinct from the database ID.
 *
 * You can also retrieve it programmatically via:
 *   GET /v1/databases/:database_id  →  response.data_sources[0].id
 */
export async function getWritings(): Promise<PostMeta[]> {
  const ds = process.env.NOTION_WRITING_DATASOURCE
  if (!ds) throw new Error("Missing NOTION_WRITING_DATASOURCE env var")

  const resp = await notion.dataSources.query({
    data_source_id: ds,
    filter: {
      property: "Published",
      checkbox: { equals: true },
    },
    sorts: [{ property: "Date", direction: "descending" }],
    page_size: 100,
  })

  return (resp.results || []).map((page: any) => {
    const id: string = page.id
    const p = page.properties ?? {}
    return {
      id,
      rawId: id.replace(/-/g, ""), // notion-client needs hyphens stripped
      title: p?.Title?.title?.[0]?.plain_text ?? "",
      slug: p?.Slug?.rich_text?.[0]?.plain_text ?? "",
      date: p?.Date?.date?.start ?? undefined,
      summary: p?.Summary?.rich_text?.[0]?.plain_text ?? undefined,
      externalUrl: p?.["External URL"]?.url ?? null,
    } satisfies PostMeta
  })
}

/**
 * Find one post by slug. Returns null if not found.
 */
export async function getPostBySlug(slug: string): Promise<PostMeta | null> {
  const ds = process.env.NOTION_WRITING_DATASOURCE
  if (!ds) throw new Error("Missing NOTION_WRITING_DATASOURCE env var")

  if (!slug) return null

  const resp = await notion.dataSources.query({
    data_source_id: ds,
    filter: {
      and: [
        { property: "Slug", rich_text: { equals: slug } },
        { property: "Published", checkbox: { equals: true } },
      ],
    },
    page_size: 1,
  })

  const page = resp.results?.[0] ?? null
  if (!page) return null

  const id: string = page.id
  const p = (page as any).properties ?? {}
  return {
    id,
    rawId: id.replace(/-/g, ""),
    title: p?.Title?.title?.[0]?.plain_text ?? "",
    slug: p?.Slug?.rich_text?.[0]?.plain_text ?? slug,
    date: p?.Date?.date?.start ?? undefined,
    summary: p?.Summary?.rich_text?.[0]?.plain_text ?? undefined,
    externalUrl: p?.["External URL"]?.url ?? null,
  }
}