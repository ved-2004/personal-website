import { getProjects } from "@/lib/projects"
import { getSkills } from "@/lib/skills"
import ExpandableText from "@/components/ExpandableText"
import ImageCarousel from "@/components/ImageCarousel"

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

            {projects.map((proj, idx) => (
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
                    {proj.title}
                  </div>
                  {proj.status && (
                    <div className="muted" style={{ marginTop: "0.2rem" }}>
                      {proj.status}
                    </div>
                  )}
                  <TagList tags={proj.tags} />
                  {proj.description && (
                    <ExpandableText text={proj.description} />
                  )}
                  <TeamLinks members={proj.team} />
                  <div style={{ display: "flex", gap: "1rem", marginTop: "0.75rem", fontSize: "0.875rem" }}>
                    {proj.url && (
                      <a href={proj.url} target="_blank" rel="noreferrer">Visit ↗</a>
                    )}
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>
                    )}
                  </div>
                </div>

                {/* Project image carousel */}
                {proj.mediaUrls.length > 0 && (
                  <ImageCarousel urls={proj.mediaUrls} alt={proj.title} width={160} height={110} />
                )}
              </article>
            ))}
          </div>
        </div>

        {/* Vertical divider */}
        <div className="projects-divider" style={{ width: "1px", background: "var(--border)", alignSelf: "stretch", flexShrink: 0 }} />

        {/* Right: Skills */}
        <div className="skills-sidebar" style={{ width: 40, flexShrink: 0 }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Skills</h1>
          {skills.length === 0 && <p className="muted">No entries yet.</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {skills.map((skill) => (
              <div key={skill.id}>
                <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{skill.name}</div>
                {skill.experience && (
                  <div className="muted" style={{ fontSize: "0.8rem", marginTop: "0.1rem" }}>{skill.experience}</div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
