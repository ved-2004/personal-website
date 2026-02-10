// app/experience/page.tsx
export default function ExperiencePage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold">Experience</h1>
      <p className="text-slate-300">
        Past internships and roles I&apos;ve had.
      </p>

      <div className="space-y-4">
        {/* Example experience item */}
        <div className="border border-slate-800 rounded-xl p-4">
          <h2 className="font-medium">Company / Role</h2>
          <p className="text-sm text-slate-400 mt-1">
            Dates, team, and a 1–2 line summary of what you did.
          </p>
        </div>
      </div>
    </main>
  );
}
