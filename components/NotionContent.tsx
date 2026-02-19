import ReactMarkdown from "react-markdown"

export default function NotionContent({ markdown }: { markdown: string }) {
  return (
    <div className="notion-content">
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}
