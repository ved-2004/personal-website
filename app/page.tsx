import { getImageByName } from "@/lib/images"
import { getPageContent } from "@/lib/content"
import ZoomableImage from "@/components/ZoomableImage"

export const revalidate = 60

export default async function HomePage() {
  const [imageUrl, content] = await Promise.all([
    getImageByName(process.env.HOME_PAGE_IMAGE_NAME ?? ""),
    getPageContent("home"),
  ])

  const get = (name: string) => content.find(i => i.name === name)?.value ?? ""
  const textItems = content.filter(i => !i.url)
  const linkItems = content.filter(i => i.url !== null)

  return (
    <main className="page-main" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
      {/* Text side */}
      <div style={{ flex: 1, minWidth: 260 }}>
        {get("intro") && (
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.25rem" }}>
            {get("intro")}
          </p>
        )}

        {textItems
          .filter(i => i.name.startsWith("bio"))
          .map(i => (
            <p key={i.name} style={{ lineHeight: 1.7, marginBottom: "0.9rem" }}>
              {i.value}
            </p>
          ))
        }

        {linkItems.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", fontSize: "0.9rem", marginTop: "0.6rem" }}>
            {linkItems.map(i => (
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
      </div>

      {/* Image side */}
      {imageUrl && (
        <div style={{ flexShrink: 0 }}>
              <ZoomableImage
            src={imageUrl}
            alt="Photo of Ved"
            style={{ width: 220, height: 220, objectFit: "cover", borderRadius: "1.25rem", border: "1px solid var(--border)" }}
          />
        </div>
      )}
    </main>
  )
}
