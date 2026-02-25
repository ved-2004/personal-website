import { getResearchProjects } from "@/lib/research"
import { getImageByName } from "@/lib/images"
import { getPageContent } from "@/lib/content"
import ResearchProject from "@/components/ResearchProject"
import ZoomableImage from "@/components/ZoomableImage"

export const revalidate = 60

export default async function ResearchPage() {
  const [projects, heroImageUrl, content] = await Promise.all([
    getResearchProjects(),
    getImageByName(process.env.RESEARCH_PAGE_IMAGE_NAME ?? ""),
    getPageContent("research"),
  ])

  const get = (name: string) => content.find(i => i.name === name)?.value ?? ""
  const heroLinks = content.filter(i => i.name.startsWith("hero-link") && i.url)

  return (
    <main className="page-main" style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
      {/* HERO */}
      <section className="research-hero" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "2rem", alignItems: "center" }}>
        {heroImageUrl && (
          <ZoomableImage
            src={heroImageUrl}
            alt="Ved Chadderwala"
            style={{ width: 220, height: 280, objectFit: "cover", borderRadius: 8, border: "1px solid var(--border)" }}
          />
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {get("affiliation") && (
            <p className="muted">{get("affiliation")}</p>
          )}

          {heroLinks.length > 0 && (
            <div style={{ display: "flex", gap: "1.25rem", fontSize: "0.9rem" }}>
              {heroLinks.map(i => (
                <a
                  key={i.name}
                  href={i.url!}
                  target={i.url!.startsWith("mailto") ? undefined : "_blank"}
                  rel={i.url!.startsWith("mailto") ? undefined : "noreferrer"}
                >
                  {i.value}
                </a>
              ))}
            </div>
          )}

          {get("blurb") && (
            <p style={{ lineHeight: 1.7 }}>{get("blurb")}</p>
          )}
        </div>
      </section>

      {/* RESEARCH FOCUS */}
      <section>
        <h2>Research Focus</h2>
        {get("focus-subtitle") && (
          <p className="muted" style={{ marginBottom: "0.5rem" }}>{get("focus-subtitle")}</p>
        )}
        {get("focus-body") && (
          <p style={{ lineHeight: 1.7 }}>{get("focus-body")}</p>
        )}
      </section>

      {/* PROJECTS */}
      <section>
        <h2>Projects</h2>
        {projects.length === 0 && <p className="muted">No projects yet.</p>}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {projects.map((proj) => (
            <ResearchProject
              key={proj.id}
              title={proj.title}
              status={proj.status}
              abstract={proj.abstract}
              reportUrl={proj.reportUrl}
              demoUrl={proj.demoUrl}
              imageUrl={proj.imageUrl}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
