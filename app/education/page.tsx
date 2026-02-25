import { getEducation, EducationMeta } from "@/lib/education"
import ZoomableImage from "@/components/ZoomableImage"

export const revalidate = 60

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

export default async function EducationPage() {
  const entries: EducationMeta[] = await getEducation()

  return (
    <main className="page-main">
      <h1>Education</h1>
      <p className="muted" style={{ marginBottom: "0.25rem" }}>Academic background.</p>

      <div style={{ marginTop: "1rem" }}>
        {entries.length === 0 && <p>No entries yet.</p>}

        {entries.map((edu, idx) => (
          <article
            key={edu.id}
            style={{
              padding: "1.5rem 0",
              borderTop: idx === 0 ? "none" : "1px solid var(--border)",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              {edu.iconUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={edu.iconUrl}
                  alt={edu.institution}
                  style={{ width: 48, height: 48, objectFit: "contain", flexShrink: 0, borderRadius: 6, border: "1px solid var(--border)" }}
                />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ color: "#990000", fontSize: "1.2rem", fontWeight: 700 }}>
                  {edu.institution}
                </div>
                {(edu.degree || edu.field) && (
                  <div style={{ fontWeight: 600 }}>
                    {[edu.degree, edu.field].filter(Boolean).join(" in ")}
                  </div>
                )}
                {(edu.startDate || edu.location) && (
                  <div className="muted" style={{ marginTop: "0.2rem" }}>
                    {[
                      edu.startDate &&
                        `${edu.startDate}${edu.endDate ? ` – ${edu.endDate}` : " – Current"}`,
                      edu.location,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </div>
                )}
                {edu.gpa && (
                  <div style={{ fontSize: "0.875rem", marginTop: "0.3rem" }}>
                    GPA: {edu.gpa}
                  </div>
                )}
              </div>
            </div>
            <MediaGallery urls={edu.mediaUrls} alt={edu.institution} />
          </article>
        ))}
      </div>
    </main>
  )
}
