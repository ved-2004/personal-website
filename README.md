Personal Website | Next.js + Notion API
=======================================

This is a **Next.js** project bootstrapped with `create-next-app`.

The site uses **Notion as a content management layer**. All blogs, titles, descriptions, and images are written in Notion and fetched dynamically using the Notion API. The UI and content are fully decoupled.

Instead of editing code to update content, you write in Notion and refresh the site.

Tech Stack
----------

-   Next.js (App Router)

-   TypeScript

-   Notion API (`@notionhq/client`)

-   Deployed on Vercel

How It Works
------------

Notion → Notion API → Data layer → Next.js UI

1.  Content is written inside a Notion database.

2.  The Notion API fetches structured data.

3.  The application parses Notion blocks.

4.  Components render content dynamically.

This architecture keeps presentation separate from content storage.

Notion Setup
------------

### 1\. Create a Notion Integration

-   Go to <https://www.notion.so/my-integrations>

-   Create a new integration

-   Copy the Internal Integration Token

### 2\. Share Your Database

-   Open your Notion database

-   Click Share

-   Invite your integration

Without this step, API requests will fail.

### 3\. Get Your Database ID
There are two ways.
1) From the database URL:
```
https://www.notion.so/{workspace}/{database_id}?v=...
```

Copy the `database_id`.

2) From the Notion App:
<img width="1546" height="730" alt="Screenshot 2026-02-25 224103" src="https://github.com/user-attachments/assets/e5b66bc7-3587-4b88-a4f6-f78618c1b903" />
<img width="431" height="352" alt="Screenshot 2026-02-25 224120" src="https://github.com/user-attachments/assets/412d00e0-02ab-4f3e-a4ec-ebae6f2aa253" />


Environment Variables
---------------------

Create a `.env.local` file with:

```
NOTION_TOKEN=your_api_key
NOTION_WRITING_DATASOURCE=your_datasource_id
NOTION_PROJECTS_DATASOURCE=your_datasource_id
NOTION_EXPERIENCE_DATASOURCE=your_datasource_id
NOTION_EDUCATION_DATASOURCE=your_datasource_id
NOTION_SKILLS_DATASOURCE=your_datasource_id
NOTION_RESEARCH_DATASOURCE=your_datasource_id
NOTION_IMAGES_DATASOURCE=your_datasource_id
HOME_PAGE_IMAGE_NAME=your_name
RESEARCH_PAGE_IMAGE_NAME=your_name
NOTION_CONTENT_DATASOURCE=your_datasource_id
IMAGE_NAME_FAVICON=your_name
```
Do not commit this file.

Installing Dependencies
-----------------------

Run:
```bash
npm install
```

If setting up manually, also install the Notion client:
```bash
npm install @notionhq/client
```

Running Locally
---------------

Start the development server:
```bash
npm run dev
```
Open `http://localhost:3000` in your browser. The app auto-updates as you edit files.

Fetching Content from Notion
----------------------------

Basic Notion client setup:
```
import { Client } from "@notionhq/client";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  // Required for SDK v5: enables notion.dataSources.* methods
  // and the 2025-09-03 API that supports data_source_id queries.
  notionVersion: "2025-09-03",
})
```
Query the database:
```
const resp = await notion.dataSources.query({
  data_source_id: ds,
  filter: { property: "Published", checkbox: { equals: true } },
  sorts: [{ property: "Order", direction: "ascending" }],
  page_size: 100,
})
```

Map Notion block types to UI components:

-   `heading_1` → `<h1>`

-   `heading_2` → `<h2>`

-   `paragraph` → `<p>`

-   `image` → `<Image />`

-   `bulleted_list_item` → `<li>`

Keep parsing logic separate from UI components. Convert Notion blocks into a normalized internal structure before rendering.

Content Structure in Notion
---------------------------

Sample database properties:

-   Title

-   Slug

-   Published

-   Tags

-   Description

-   Image

Filter by `Published = True` before rendering publicly. Use `Slug` for routing.

Deployment
----------

### Deploy on Vercel

1.  Push the repository to GitHub

2.  Import the project into Vercel

3.  Add environment variables:

4.  Deploy

For other providers, ensure environment variables are configured correctly, and serverless limits are sufficient for Notion API calls.


Learn More
----------

-   Next.js Documentation: <https://nextjs.org/docs>

-   Notion API Documentation: <https://developers.notion.com>
