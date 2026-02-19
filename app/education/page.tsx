import { getEducation, EducationMeta } from "@/lib/education"

export const revalidate = 60

export default async function EducationPage() {
  const entries: EducationMeta[] = await getEducation()

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Education</h1>
      <p className="muted">Academic background.</p>

      <div>
        {entries.length === 0 && <p>No entries yet.</p>}

        {entries.map((edu) => (
          <article key={edu.id} style={{ margin: "2rem 0", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            {edu.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={edu.imageUrl}
                alt={edu.institution}
                style={{ width: 48, height: 48, objectFit: "contain", flexShrink: 0, borderRadius: 6, border: "1px solid var(--border)" }}
              />
            )}
            <div style={{ flex: 1 }}>
            <div style={{ color: "#990000", fontSize: "1.25rem", fontWeight: 700 }}>
              {edu.institution}
            </div>
            {(edu.degree || edu.field) && (
              <div style={{ fontWeight: 600 }}>
                {[edu.degree, edu.field].filter(Boolean).join(" in ")}
              </div>
            )}
            {(edu.startDate || edu.location) && (
              <div className="muted" style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>
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
              <div style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>
                GPA: {edu.gpa}
              </div>
            )}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
