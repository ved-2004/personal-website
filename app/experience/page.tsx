import { getExperiences, ExperienceMeta } from "@/lib/experience"
import { getPageMarkdown } from "@/lib/notionBlocks"
import ZoomableImage from "@/components/ZoomableImage"
import ExpandableSection from "@/components/ExpandableSection"

export const revalidate = 60

function TagList({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null
  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <span key={tag} className="tag">{tag}</span>
      ))}
    </div>
  )
}

function MediaGallery({ urls, alt }: { urls: string[]; alt: string }) {
  if (urls.length === 0) return null
  return (
    <div style={{ display: "flex", gap: "0.6rem", overflowX: "auto", marginTop: "1rem" }}>
      {urls.map((url, i) => (
        <ZoomableImage
          key={i}
          src={url}
          alt={`${alt} ${i + 1}`}
          style={{
            width: 280,
            height: 180,
            objectFit: "cover",
            borderRadius: 8,
            border: "1px solid var(--border)",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  )
}

export default async function ExperiencePage() {
  const experiences: ExperienceMeta[] = await getExperiences()

  // Fetch page body content for all entries in parallel
  const contents = await Promise.all(
    experiences.map(exp => getPageMarkdown(exp.id).catch(() => ""))
  )

  return (
    <main className="page-main">
      <h1>Experience</h1>
      <p className="muted" style={{ marginBottom: "0.25rem" }}>Past internships and roles.</p>

      <div style={{ marginTop: "1rem" }}>
        {experiences.length === 0 && <p>No entries yet.</p>}

        {experiences.map((exp, idx) => (
          <article
            key={exp.id}
            style={{
              padding: "1.5rem 0",
              borderTop: idx === 0 ? "none" : "1px solid var(--border)",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              {exp.iconUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={`/api/page-image?pageId=${exp.id}&property=Icon&index=0`}
                  alt={exp.company}
                  style={{ width: 48, height: 48, objectFit: "contain", flexShrink: 0, borderRadius: 6, border: "1px solid var(--border)" }}
                />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "#990000", fontSize: "1.2rem", fontWeight: 700 }}>
                  {exp.role}
                </div>
                <div style={{ fontWeight: 600 }}>{exp.company}</div>
                {(exp.startDate || exp.location) && (
                  <div className="muted" style={{ marginTop: "0.2rem" }}>
                    {[
                      exp.startDate &&
                        `${exp.startDate}${exp.endDate ? ` – ${exp.endDate}` : " – Current"}`,
                      exp.location,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </div>
                )}
                <TagList tags={exp.tags} />
                {exp.summary && <p style={{ marginTop: "0.6rem", marginBottom: 0 }}>{exp.summary}</p>}
              </div>
            </div>

            {/* Page body content written in Notion */}
            <ExpandableSection markdown={contents[idx] ?? ""} />

            <MediaGallery
              urls={exp.mediaUrls.map((_, i) => `/api/page-image?pageId=${exp.id}&property=Media&index=${i}`)}
              alt={exp.company}
            />
          </article>
        ))}
      </div>
    </main>
  )
}
