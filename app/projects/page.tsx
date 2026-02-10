// app/projects/page.tsx
export default function ProjectsPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-slate-300">
        A list of things I&apos;ve built or worked on.
      </p>

      <div className="space-y-4">
        {/* Example project block */}
        <div className="border border-slate-800 rounded-xl p-4">
          <h2 className="font-medium">Project Name</h2>
          <p className="text-sm text-slate-400 mt-1">
            Short description of what this project does and why it exists.
          </p>
        </div>
      </div>
    </main>
  );
}
