import { Client } from "@notionhq/client"

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  // Required for SDK v5: enables notion.dataSources.* methods
  // and the 2025-09-03 API that supports data_source_id queries.
  notionVersion: "2025-09-03",
})