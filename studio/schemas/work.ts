import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

const youtubeIdRegex = /^[a-zA-Z0-9_-]{11}$/;

export const work = defineType({
  name: "work",
  title: "作品 Work",
  type: "document",
  orderings: [
    {
      title: "拖曳順序",
      name: "orderRank",
      by: [{ field: "orderRank", direction: "asc" }],
    },
  ],
  fieldsets: [
    { name: "basic", title: "基本資訊", options: { collapsible: false } },
    { name: "video", title: "影片", options: { collapsible: false } },
    { name: "content", title: "內容", options: { collapsible: true } },
    {
      name: "featured",
      title: "首頁精選",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "作品標題",
      type: "string",
      fieldset: "basic",
      validation: (R) => R.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "網址代稱 (slug)",
      type: "slug",
      fieldset: "basic",
      options: { source: "title", maxLength: 60 },
      validation: (R) => R.required(),
      description: "用於網址的英文代稱，例如 spring-campaign",
    }),
    defineField({
      name: "client",
      title: "客戶",
      type: "string",
      fieldset: "basic",
    }),
    defineField({
      name: "year",
      title: "年份",
      type: "number",
      fieldset: "basic",
      initialValue: () => new Date().getFullYear(),
      validation: (R) => R.required().min(2000).max(2100),
    }),
    defineField({
      name: "category",
      title: "類型",
      type: "reference",
      to: [{ type: "category" }],
      fieldset: "basic",
      description: "如果下拉沒有你要的類型，先到「🏷 類型」新增",
      validation: (R) => R.required(),
    }),

    defineField({
      name: "youtubeId",
      title: "YouTube 影片 ID",
      type: "string",
      fieldset: "video",
      description:
        "貼上 YouTube 影片 ID（不是完整網址）。例如網址 https://youtu.be/dQw4w9WgXcQ 的 ID 是 dQw4w9WgXcQ",
      validation: (R) =>
        R.required().regex(youtubeIdRegex, {
          name: "YouTube ID",
          invert: false,
        }),
    }),
    defineField({
      name: "coverImage",
      title: "封面圖（選填）",
      type: "image",
      fieldset: "video",
      description:
        "不上傳的話會自動使用 YouTube 預覽圖。建議自己挑一張高解析封面。",
      options: { hotspot: true },
    }),

    defineField({
      name: "excerpt",
      title: "簡短描述",
      type: "text",
      rows: 2,
      fieldset: "content",
      description: "一句話形容這支作品，會顯示在卡片與作品頁標題下方",
      validation: (R) => R.max(120),
    }),
    defineField({
      name: "description",
      title: "完整製作說明",
      type: "text",
      rows: 8,
      fieldset: "content",
      description: "段落之間用空行分隔",
    }),
    defineField({
      name: "role",
      title: "你的角色",
      type: "string",
      fieldset: "content",
      description: "例如：剪輯指導 · 後期統籌",
    }),
    defineField({
      name: "credits",
      title: "工作人員",
      type: "array",
      fieldset: "content",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "職位" },
            { name: "name", type: "string", title: "姓名" },
          ],
          preview: {
            select: { title: "label", subtitle: "name" },
          },
        },
      ],
    }),

    defineField({
      name: "featured",
      title: "顯示在首頁",
      type: "boolean",
      fieldset: "featured",
      initialValue: false,
    }),
    defineField({
      name: "featuredOrder",
      title: "首頁顯示順序",
      type: "number",
      fieldset: "featured",
      hidden: ({ parent }) => !parent?.featured,
      description: "數字越小越前面（1, 2, 3...）。首頁建議放 6 件",
    }),

    orderRankField({ type: "work" }),
  ],

  preview: {
    select: {
      title: "title",
      client: "client",
      year: "year",
      categoryName: "category.name",
      media: "coverImage",
    },
    prepare({ title, client, year, categoryName, media }) {
      return {
        title,
        subtitle: [year, categoryName, client].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
