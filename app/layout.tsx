import type { Metadata } from "next";
import { STIX_Two_Text } from "next/font/google";
import Link from "next/link";

import "./globals.css";

const stix = STIX_Two_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Ved Chadderwala",
  description: "Research and personal site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="site">
        <header
          style={{
            position: "sticky",
            top: 0,
            background: "var(--bg)",
            borderBottom: "1px solid var(--border)",
            zIndex: 10,
          }}
        >
          <nav className="container flex justify-center gap-6 py-3 text-sm">
            <Link href="/">Home</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/experience">Experience</Link>
            <Link href="/education">Education</Link>
            <Link href="/skills">Skills</Link>
            <Link href="/research">Research</Link>
            <Link href="/writing">Writing</Link>
          </nav>
        </header>

        <main className="content">{children}</main>

        <footer className="footer">
          © {new Date().getFullYear()} Ved Chadderwala
        </footer>
      </body>
    </html>
  );
}
