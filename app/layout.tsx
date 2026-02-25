import type { Metadata } from "next";
import { STIX_Two_Text } from "next/font/google";
import NavBar from "@/components/NavBar";

import "./globals.css";

const stix = STIX_Two_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
});

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Ved Chadderwala",
    description: "Research and personal site",
    icons: { icon: "/api/favicon" },
  }
}

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
          <NavBar />
        </header>

        <main className="content">{children}</main>

        <footer className="footer">
          © {new Date().getFullYear()} Ved Chadderwala
        </footer>
      </body>
    </html>
  );
}
