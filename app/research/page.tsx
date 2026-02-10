// app/research/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

const PROJECTS = [
  {
    title: "MIRA — Multi-functional Indian Real-time Assistant (Wearable AI)",
    status: "prototype — accessibility-focused, low-cost smart glasses",
    abstract:
      "An AI-powered, hands-free assistant combining vision and voice: Android app + ESP32-S3 (camera/mic) with Wi-Fi/Bluetooth, real-time STT/TTS, and multimodal LLM responses. Offloads heavy compute to Android for latency and power. Built to improve accessibility and enable ubiquitous assistance.",
    links: [
      { label: "Report", url: "/reports/Final_Seminar_REPORT_FINAL.pdf" },
      { label: "Demo", url: "https://..." },
    ],
  },
  {
    title: "Intrusion Detection in IoT/IIoT",
    status: "completed — CatBoost accuracy 0.9475; F1 0.9474",
    abstract:
      "Compared SVM (linear/RBF) against boosting models (GBM, LightGBM, XGBoost, CatBoost) on Edge-IIoTset. CatBoost handled categorical features natively and achieved the best overall accuracy and F1.",
    links: [{ label: "Report", url: "/reports/SECURITY_IN_IOT.pdf" }],
  },
];

export default function ResearchPage() {
  const year = new Date().getFullYear();

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
          I study trsutworthy machine learning and NLP, with an emphasiss on reliability, robustness, and bias in real-world systems. My work spans inference-time reliability for LLMs, security critical ML for IoT, and ethical limitations of language-based user modeling.
        </p>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <div className="space-y-6">
          {PROJECTS.map((p, i) => (
            <Project key={i} {...p} />
          ))}
        </div>
      </section>

    </main>
  );
}

function Project({
  title,
  status,
  abstract,
  links,
}: {
  title: string;
  status: string;
  abstract: string;
  links: { label: string; url: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t pt-4">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-slate-500">{status}</p>

      <div className="flex items-center gap-3 mt-2 text-sm">
        <button
          onClick={() => setOpen(!open)}
          className="underline"
          aria-expanded={open}
        >
          Abstract
        </button>

        {links.map((l, i) => (
          <a key={i} href={l.url} target="_blank">
            {l.label}
          </a>
        ))}
      </div>

      {open && <p className="mt-3 text-sm">{abstract}</p>}
    </div>
  );
}
