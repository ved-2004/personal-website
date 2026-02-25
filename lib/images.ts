import { notion } from "./notion"

/**
 * Fetch a single image URL from the Images Notion database by its Name field.
 *
 * Expected Notion database properties:
 *   Name  — Title       (the lookup key, e.g. "home", "research-hero")
 *   Image — Files & media
 *
 * Set NOTION_IMAGES_DATASOURCE to the data source ID (not database ID).
 * Callers pass the name value from their own env var, e.g.:
 *   getImageByName(process.env.IMAGE_NAME_HOME ?? "")
 */
export async function getImageByName(name: string): Promise<string | null> {
  if (!name) return null

  const ds = process.env.NOTION_IMAGES_DATASOURCE
  if (!ds) {
    console.warn("Missing NOTION_IMAGES_DATASOURCE env var")
    return null
  }

  const resp = await notion.dataSources.query({
    data_source_id: ds,
    filter: { property: "Name", title: { equals: name } },
    page_size: 1,
  })

  const page = resp.results?.[0] as any
  if (!page) return null

  const files = page.properties?.Image?.files ?? []
  return files[0]?.file?.url ?? files[0]?.external?.url ?? null
}
