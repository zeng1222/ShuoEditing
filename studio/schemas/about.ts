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
      description: "拖曳上傳，會在「關於我」區左側顯示為黑白色調",
      options: { hotspot: true },
    }),

    defineField({
      name: "bio",
      title: "自我介紹",
      type: "text",
      rows: 5,
      description: "段落之間用空行分隔。會顯示在個人照旁",
      validation: (R) => R.required(),
    }),

    // ===== 數據 stats (animated count-up) =====
    defineField({
      name: "yearsExperience",
      title: "剪輯經驗（年數）",
      type: "number",
      description: "例如 3 表示「3+ 年」",
      validation: (R) => R.required().positive(),
    }),
    defineField({
      name: "projectsCount",
      title: "服務專案數",
      type: "number",
      description: "例如 100 表示「100+ 件」",
      validation: (R) => R.required().positive(),
    }),
    defineField({
      name: "editsCount",
      title: "剪輯數",
      type: "number",
      description: "例如 1000 表示「1000+ 支」",
      validation: (R) => R.required().positive(),
    }),
    defineField({
      name: "services",
      title: "服務內容",
      type: "array",
      description: "每行一個平台 + 格式",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "平台",
              type: "string",
              validation: (R) => R.required(),
            },
            {
              name: "format",
              title: "格式",
              type: "string",
              description: "例如：長影音、短影音",
              validation: (R) => R.required(),
            },
          ],
          preview: {
            select: { title: "platform", subtitle: "format" },
          },
        },
      ],
      validation: (R) => R.required().min(1),
    }),

    defineField({
      name: "brands",
      title: "合作品牌（選填）",
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
