import { getProjects, ProjectMeta } from "@/lib/projects"

export const revalidate = 60

export default async function ProjectsPage() {
  const projects: ProjectMeta[] = await getProjects()

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Projects</h1>
      <p className="muted">Things I&apos;ve built or worked on.</p>

      <div>
        {projects.length === 0 && <p>No entries yet.</p>}

        {projects.map((proj) => (
          <article key={proj.id} style={{ margin: "2rem 0" }}>
            {proj.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={proj.imageUrl}
                alt={proj.title}
                style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 8, marginBottom: "0.75rem", border: "1px solid var(--border)" }}
              />
            )}
            <div style={{ color: "#990000", fontSize: "1.25rem", fontWeight: 700 }}>
              {proj.title}
            </div>
            {proj.status && (
              <div className="muted" style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}>
                {proj.status}
              </div>
            )}
            {proj.tags.length > 0 && (
              <div style={{ fontSize: "0.8rem", marginTop: "0.25rem", color: "#555" }}>
                {proj.tags.join(", ")}
              </div>
            )}
            {proj.description && <p style={{ marginTop: "0.5rem" }}>{proj.description}</p>}
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", fontSize: "0.875rem" }}>
              {proj.url && (
                <a href={proj.url} target="_blank" rel="noreferrer">Visit</a>
              )}
              {proj.githubUrl && (
                <a href={proj.githubUrl} target="_blank" rel="noreferrer">GitHub</a>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
