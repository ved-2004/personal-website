import { getResearchProjects } from "@/lib/research"
import { getPageContent } from "@/lib/content"
import ResearchProject from "@/components/ResearchProject"
import ZoomableImage from "@/components/ZoomableImage"

export const revalidate = 60

export default async function ResearchPage() {
  const [projects, content] = await Promise.all([
    getResearchProjects(),
    getPageContent("research"),
  ])

  const get = (name: string) => content.find(i => i.name === name)?.value ?? ""
  const heroLinks = content.filter(i => i.name.startsWith("hero-link") && i.url)

  const researchImageName = process.env.RESEARCH_PAGE_IMAGE_NAME
  const proxyImageSrc = researchImageName
    ? `/api/image?name=${encodeURIComponent(researchImageName)}`
    : null

  return (
    <main className="page-main" style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>

      {/* NAME + AFFILIATION HEADER */}
      <div>
        <h1 style={{ marginBottom: "0.15rem" }}>Ved Chadderwala</h1>
        {get("affiliation") && (
          <p className="muted" style={{ marginBottom: 0 }}>{get("affiliation")}</p>
        )}
      </div>

      {/* HERO — photo + blurb + links */}
      <section className="research-hero" style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "1.75rem", alignItems: "flex-start" }}>
        {proxyImageSrc && (
          <ZoomableImage
            src={proxyImageSrc}
            alt="Ved Chadderwala"
            style={{ width: 160, height: 200, objectFit: "cover", borderRadius: 4, border: "1px solid var(--border)" }}
          />
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
          {heroLinks.length > 0 && (
            <div style={{ display: "flex", gap: "1.25rem", fontSize: "0.9rem", flexWrap: "wrap" }}>
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
            <p style={{ lineHeight: 1.7, fontSize: "0.95rem", margin: 0 }}>{get("blurb")}</p>
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          {projects.map((proj) => (
            <ResearchProject
              key={proj.id}
              title={proj.title}
              status={proj.status}
              abstract={proj.abstract}
              reportUrl={proj.reportUrl}
              demoUrl={proj.demoUrl}
              imageUrl={proj.imageUrl ? `/api/page-image?pageId=${proj.id}&property=Image&index=0` : null}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
