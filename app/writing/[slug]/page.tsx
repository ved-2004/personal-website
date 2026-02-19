import { notFound } from "next/navigation"
import { getPostBySlug } from "@/lib/writing"
import { getPageMarkdown } from "@/lib/notionBlocks"
import NotionContent from "@/components/NotionContent"

export const revalidate = 60

function externalHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return "external site"
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const post = await getPostBySlug(slug)
  if (!post) return notFound()

  if (post.externalUrl) {
    return (
      <article style={{ padding: "2rem", maxWidth: "40rem" }}>
        <h1>{post.title}</h1>
        {post.summary && <p style={{ margin: "1rem 0" }}>{post.summary}</p>}
        <p className="muted" style={{ margin: "1.5rem 0 0.5rem" }}>
          This post is hosted on {externalHostname(post.externalUrl)}, outside this site.
        </p>
        <a href={post.externalUrl} target="_blank" rel="noreferrer">
          Continue to {externalHostname(post.externalUrl)} ↗
        </a>
      </article>
    )
  }

  const markdown = await getPageMarkdown(post.id)

  return (
    <article style={{ padding: "2rem" }}>
      <h1>{post.title}</h1>
      <NotionContent markdown={markdown} />
    </article>
  )
}