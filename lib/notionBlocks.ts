import { NotionToMarkdown } from "notion-to-md"
import { notion } from "./notion"

const n2m = new NotionToMarkdown({ notionClient: notion as any })

export async function getPageMarkdown(pageId: string): Promise<string> {
  if (!pageId) throw new Error("No pageId provided to getPageMarkdown")
  const blocks = await n2m.pageToMarkdown(pageId)
  return n2m.toMarkdownString(blocks).parent
}
