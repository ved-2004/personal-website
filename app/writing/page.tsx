// app/writing/page.tsx
export default function WritingPage() {
  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold">Writing</h1>
      <p className="text-slate-300">
        Essays, blog posts, and random notes I found worth writing down.
      </p>

      <ul className="space-y-3">
        {/* Example post entry */}
        <li>
          <span className="text-sm text-slate-400">Jan 1, 2025 · Note</span>
          <h2 className="font-medium">Post title</h2>
        </li>
      </ul>
    </main>
  );
}
