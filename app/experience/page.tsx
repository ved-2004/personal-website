import { getExperiences, ExperienceMeta } from "@/lib/experience"

export const revalidate = 60

export default async function ExperiencePage() {
  const experiences: ExperienceMeta[] = await getExperiences()

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Experience</h1>
      <p className="muted">Past internships and roles.</p>

      <div>
        {experiences.length === 0 && <p>No entries yet.</p>}

        {experiences.map((exp) => (
          <article key={exp.id} style={{ margin: "2rem 0", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
            {exp.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={exp.imageUrl}
                alt={exp.company}
                style={{ width: 48, height: 48, objectFit: "contain", flexShrink: 0, borderRadius: 6, border: "1px solid var(--border)" }}
              />
            )}
            <div style={{ flex: 1 }}>
            <div style={{ color: "#990000", fontSize: "1.25rem", fontWeight: 700 }}>
              {exp.role}
            </div>
            <div style={{ fontWeight: 600 }}>{exp.company}</div>
            {(exp.startDate || exp.location) && (
              <div className="muted" style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>
                {[
                  exp.startDate &&
                    `${exp.startDate}${exp.endDate ? ` – ${exp.endDate}` : " – Current"}`,
                  exp.location,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </div>
            )}
            {exp.summary && <p style={{ marginTop: "0.5rem" }}>{exp.summary}</p>}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
