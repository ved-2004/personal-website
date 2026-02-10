// app/page.tsx
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
      {/* Text side */}
      <div className="flex-1 space-y-6">
        <p className="text-xs tracking-[0.3em] uppercase text-slate-400">
          Hey peeps, I'm Ved!
        </p>

        <p className="text-slate-300 leading-relaxed max-w-xl">
          I'm a CS grad student at USC. Lately, I have been studying DL and deriving the architectures by hand. I like building software, and integrating AI into them. I also love to record and write my learnings and brainstorming. 
        </p>

        <p className="text-slate-300 leading-relaxed max-w-xl">
          This space is where I collect what I&apos;ve built, what I&apos;ve
          worked on, and what I&apos;m still figuring out.
        </p>

        {/* Links at the end */}
        <div className="flex flex-wrap gap-4 pt-2 text-sm">
          <a
            href="mailto:ved29022004@gmail.com"
            className="underline underline-offset-4 decoration-slate-500 hover:decoration-slate-100 hover:text-slate-100"
          >
            Email
          </a>
          <a
            href="https://github.com/ved-2004"
            className="underline underline-offset-4 decoration-slate-500 hover:decoration-slate-100 hover:text-slate-100"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ved-chadderwala-196529223/"
            className="underline underline-offset-4 decoration-slate-500 hover:decoration-slate-100 hover:text-slate-100"
          >
            LinkedIn
          </a>
          <a
            href="/Ved_Chadderwala_Resume.pdf"
            className="underline underline-offset-4 decoration-slate-500 hover:decoration-slate-100 hover:text-slate-100"
          >
            Resume
          </a>
        </div>
      </div>

      {/* Image side */}
      <div className="flex-1 flex justify-center md:justify-end">
        <div className="relative w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
          <Image
            src="/me.jpeg"
            alt="Photo of Ved"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </main>
  );
}
