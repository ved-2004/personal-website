import Link from "next/link"
import { getWritings, PostMeta } from "@/lib/writing"

export const revalidate = 60

function externalHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return "external site"
  }
}

export default async function WritingPage() {
  const posts: PostMeta[] = await getWritings()

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Writing</h1>
      <p className="muted">Learning, Sharing and Reflecting</p>

      <div>
        {posts.length === 0 && <p>No posts yet.</p>}

        {posts.map((post: PostMeta) => (
          <article key={post.id} style={{ margin: "2rem 0" }}>
            <div style={{ color: "#990000", fontSize: "1.25rem", fontWeight: 700 }}>
              {post.title}
            </div>

            {post.summary && <p style={{ margin: "0.5rem 0" }}>{post.summary}</p>}

            {post.externalUrl ? (
              <div>
                <a href={post.externalUrl} target="_blank" rel="noreferrer">
                  Read more ↗
                </a>
                <span className="muted" style={{ marginLeft: "0.5rem", fontSize: "0.8rem" }}>
                  Opens on {externalHostname(post.externalUrl)}
                </span>
              </div>
            ) : (
              <Link href={`/writing/${post.slug}`}>Read more</Link>
            )}
          </article>
        ))}
      </div>
    </main>
  )
}
