import { defineField, defineType } from "sanity";

const youtubeIdRegex = /^[a-zA-Z0-9_-]{11}$/;

export const homepage = defineType({
  name: "homepage",
  title: "首頁設定",
  type: "document",
  fields: [
    defineField({
      name: "tagline",
      title: "首頁標語",
      type: "text",
      rows: 2,
      description: "首頁最大的那行字。例如：用畫面說故事 — 一位剪輯師的剪接室",
      validation: (R) => R.required().max(60),
    }),
    defineField({
      name: "intro",
      title: "簡短自介",
      type: "text",
      rows: 4,
      description: "標語下方的小段介紹文字",
      validation: (R) => R.max(200),
    }),
    defineField({
      name: "showreelYoutubeId",
      title: "Showreel YouTube ID",
      type: "string",
      description: "首頁那支精選集錦影片的 YouTube ID",
      validation: (R) =>
        R.required().regex(youtubeIdRegex, { name: "YouTube ID" }),
    }),
    defineField({
      name: "showreelCaption",
      title: "Showreel 標題",
      type: "string",
      description: "影片下方的說明文字。例如：2025 Showreel · 精選作品集錦",
    }),
  ],

  preview: {
    prepare: () => ({ title: "🏠 首頁設定" }),
  },
});
