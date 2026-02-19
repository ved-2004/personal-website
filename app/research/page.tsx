import Image from "next/image"
import { getResearchProjects, ResearchMeta } from "@/lib/research"
import ResearchProject from "@/components/ResearchProject"

export const revalidate = 60

export default async function ResearchPage() {
  const projects: ResearchMeta[] = await getResearchProjects()

  return (
    <main className="max-w-4xl mx-auto px-4 space-y-16">
      {/* HERO */}
      <section id="home" className="grid grid-cols-[220px_1fr] gap-8 items-center">
        <Image
          src="/images/usc1.jpg"
          alt="Ved Chadderwala"
          width={220}
          height={280}
          className="rounded-lg border"
        />

        <div className="space-y-3">
          <p className="text-sm text-slate-500">
            Graduate Student • Thomas Lord Department of Computer Science •
            University of Southern California
          </p>

          <div className="flex gap-4 text-sm">
            <a href="mailto:chadderw@usc.edu">chadderw@usc.edu</a>
            <a
              href="https://drive.google.com/file/d/1acli47cQlfbbIUj_1bszztJBJVZ4GNWw/view"
              target="_blank"
            >
              CV
            </a>
          </div>

          <p>
            I&apos;m a first-year MSCS student at USC focused on AI/ML, NLP, and
            multimodal learning for accessible and trustworthy systems.
          </p>
        </div>
      </section>

      {/* RESEARCH FOCUS */}
      <section id="focus">
        <h2 className="text-2xl font-semibold mb-2">Research Focus</h2>
        <p className="text-sm text-slate-600 mb-2">
          Trustworthy LLMs | Robust NLP | ML Security
        </p>
        <p>
          I study trustworthy machine learning and NLP, with an emphasis on reliability, robustness,
          and bias in real-world systems. My work spans inference-time reliability for LLMs, security
          critical ML for IoT, and ethical limitations of language-based user modeling.
        </p>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        {projects.length === 0 && <p className="text-sm text-slate-500">No projects yet.</p>}
        <div className="space-y-6">
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
