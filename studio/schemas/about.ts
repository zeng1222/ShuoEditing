import { defineField, defineType } from "sanity";

export const about = defineType({
  name: "about",
  title: "關於我",
  type: "document",
  fields: [
    defineField({
      name: "headshot",
      title: "個人照",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "bio",
      title: "自我介紹",
      type: "text",
      rows: 8,
      description: "段落之間用空行分隔",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "experience",
      title: "經歷",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "year",
              type: "string",
              title: "時間",
              description: "例如：2024、2021—2024",
            },
            { name: "description", type: "string", title: "描述" },
          ],
          preview: {
            select: { title: "year", subtitle: "description" },
          },
        },
      ],
    }),
    defineField({
      name: "brands",
      title: "合作品牌",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "品牌名稱" },
            {
              name: "logo",
              type: "image",
              title: "Logo（選填）",
              description: "不上傳則顯示品牌名稱",
            },
          ],
          preview: {
            select: { title: "name", media: "logo" },
          },
        },
      ],
    }),
  ],

  preview: {
    prepare: () => ({ title: "👤 關於我" }),
  },
});
