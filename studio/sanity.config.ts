import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { schemaTypes } from "./schemas";

// Where your Astro site is served.
// Dev: http://localhost:4321  ·  Production: https://your-domain.com
const SITE_URL =
  process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:4321";

export default defineConfig({
  name: "default",
  title: "Editor Portfolio",

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",

  plugins: [
    presentationTool({
      previewUrl: {
        origin: SITE_URL,
        preview: "/?preview=true",
      },
    }),

    structureTool({
      structure: (S, context) =>
        S.list()
          .title("內容管理")
          .items([
            S.listItem()
              .title("🏠 首頁設定")
              .child(
                S.document().schemaType("homepage").documentId("homepage"),
              ),
            S.listItem()
              .title("👤 關於我")
              .child(S.document().schemaType("about").documentId("about")),
            S.divider(),

            // Drag-to-reorder list for works
            orderableDocumentListDeskItem({
              type: "work",
              title: "📁 作品（拖曳排序）",
              S,
              context,
            }),

            // Drag-to-reorder list for categories
            orderableDocumentListDeskItem({
              type: "category",
              title: "🏷 作品類型（拖曳排序）",
              S,
              context,
            }),

            // Drag-to-reorder list for services
            orderableDocumentListDeskItem({
              type: "service",
              title: "💼 服務方案（拖曳排序）",
              S,
              context,
            }),

            // Drag-to-reorder list for FAQs
            orderableDocumentListDeskItem({
              type: "faq",
              title: "❓ 常見問題（拖曳排序）",
              S,
              context,
            }),

            S.divider(),
            S.listItem()
              .title("⚙️ 網站設定")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
          ]),
    }),

    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(
        (t) =>
          !["homepage", "about", "siteSettings"].includes(t.schemaType),
      ),
  },
});
