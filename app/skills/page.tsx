import { getSkills, SkillMeta } from "@/lib/skills"

export const revalidate = 60

export default async function SkillsPage() {
  const skills: SkillMeta[] = await getSkills()

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Skills</h1>
      <p className="muted">Technologies and tools I work with.</p>

      {skills.length === 0 && <p>No entries yet.</p>}

      <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {skills.map((skill) => (
          <div key={skill.id} style={{ display: "flex", alignItems: "baseline", gap: "1rem" }}>
            <span style={{ fontWeight: 600 }}>{skill.name}</span>
            {skill.experience && (
              <span className="muted" style={{ fontSize: "0.875rem" }}>{skill.experience}</span>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
