import { getProjects } from "@/lib/projects"
import { getSkills } from "@/lib/skills"
import ExpandableText from "@/components/ExpandableText"
import ImageCarousel from "@/components/ImageCarousel"

export const revalidate = 60

const STATUS_COLORS: Record<string, string> = {
  "Current":     "#F59E0B",
  "Completed":   "#22C55E",
  "Deployed":    "#3B82F6",
  "In Progress": "#F97316",
}

function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status] ?? "#94a3b8"
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.8rem", color: "var(--text)", marginTop: "0.25rem" }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0, display: "inline-block" }} />
      {status}
    </span>
  )
}

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

function TeamLinks({ members }: { members: string[] }) {
  if (members.length === 0) return null
  return (
    <div style={{ fontSize: "0.875rem", marginTop: "0.6rem" }}>
      <span style={{ fontWeight: 600 }}>Team: </span>
      {members.map((member, i) => {
        const parts = member.split(" | ")
        const name = parts[0].trim()
        const url = parts[1]?.trim()
        return (
          <span key={i}>
            {i > 0 && ", "}
            {url ? (
              <a href={url} target="_blank" rel="noreferrer">{name}</a>
            ) : (
              name
            )}
          </span>
        )
      })}
    </div>
  )
}

export default async function ProjectsPage() {
  const [projects, skills] = await Promise.all([
    getProjects(),
    getSkills(),
  ])

  return (
    <main className="page-main">
      <div className="projects-layout" style={{ display: "flex", gap: "3rem", alignItems: "flex-start" }}>

        {/* Left: Projects */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1>Projects</h1>
          <p className="muted" style={{ marginBottom: "0.25rem" }}>Things I&apos;ve built or worked on.</p>

          <div style={{ marginTop: "1rem" }}>
            {projects.length === 0 && <p>No entries yet.</p>}

            {projects.map((proj, idx) => {
              const proxiedMedia = proj.mediaUrls.map((_, i) =>
                `/api/page-image?pageId=${proj.id}&property=Media&index=${i}`
              )
              return (
                <article
                  key={proj.id}
                  className="project-article"
                  style={{
                    padding: "1.5rem 0",
                    borderTop: idx === 0 ? "none" : "1px solid var(--border)",
                    display: "flex",
                    gap: "2rem",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: "#990000", fontSize: "1.2rem", fontWeight: 700 }}>
                      {(proj.url || proj.githubUrl) ? (
                        <a
                          href={proj.url ?? proj.githubUrl!}
                          target="_blank"
                          rel="noreferrer"
                          className="project-title-link"
                        >
                          {proj.title}
                        </a>
                      ) : proj.title}
                    </div>
                    {proj.status && <StatusBadge status={proj.status} />}
                    <TagList tags={proj.tags} />
                    {proj.description && (
                      <ExpandableText text={proj.description} />
                    )}
                    <TeamLinks members={proj.team} />
                    {(proj.url || proj.githubUrl) && (
                      <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem", flexWrap: "wrap" }}>
                        {proj.url && (
                          <a href={proj.url} target="_blank" rel="noreferrer" className="chip-link">
                            Visit ↗
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="chip-link">
                            GitHub ↗
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Project image carousel */}
                  {proxiedMedia.length > 0 && (
                    <ImageCarousel urls={proxiedMedia} alt={proj.title} width={160} height={110} />
                  )}
                </article>
              )
            })}
          </div>
        </div>

        {/* Vertical divider */}
        <div className="projects-divider" style={{ width: "1px", background: "var(--border)", alignSelf: "stretch", flexShrink: 0 }} />

        {/* Right: Skills */}
        <div className="skills-sidebar" style={{ width: 160, flexShrink: 0 }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Skills</h1>
          {skills.length === 0 && <p className="muted">No entries yet.</p>}
          <div className="tag-list" style={{ flexDirection: "column", alignItems: "flex-start" }}>
            {skills.map((skill) => (
              <span key={skill.id} className="tag" title={skill.experience ?? undefined}>
                {skill.name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
