import { getPageContent } from "@/lib/content"
import ZoomableImage from "@/components/ZoomableImage"

export const revalidate = 60

export default async function HomePage() {
  const content = await getPageContent("home")

  const get = (name: string) => content.find(i => i.name === name)?.value ?? ""
  const textItems = content.filter(i => !i.url)
  const linkItems = content.filter(i => i.url !== null)

  const imageName = process.env.HOME_PAGE_IMAGE_NAME
  const proxyImageSrc = imageName
    ? `/api/image?name=${encodeURIComponent(imageName)}`
    : null

  return (
    <main className="page-main home-layout" style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "3rem", flexWrap: "wrap" }}>
      {/* Text side */}
      <div style={{ flex: 1, minWidth: 260 }}>
        {get("intro") && (
          <h1 style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "var(--primary)",
            marginBottom: "1.25rem",
            lineHeight: 1.2,
          }}>
            {get("intro")}
          </h1>
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
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "1rem" }}>
            {linkItems.map(i => (
              <a
                key={i.name}
                href={i.url!}
                target={i.url!.startsWith("mailto") ? undefined : "_blank"}
                rel={i.url!.startsWith("mailto") ? undefined : "noreferrer"}
                className="pill-link"
              >
                {i.value}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Image side */}
      {proxyImageSrc && (
        <div style={{ flexShrink: 0 }}>
          <ZoomableImage
            src={proxyImageSrc}
            alt="Photo of Ved"
            style={{
              width: 210,
              height: 210,
              objectFit: "cover",
              borderRadius: "1.25rem",
              border: "2px solid var(--primary)",
              boxShadow: "0 4px 20px rgba(131, 34, 50, 0.12)",
            }}
          />
        </div>
      )}
    </main>
  )
}
