import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "網站設定",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "網站名稱",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "email",
      title: "聯絡 Email",
      type: "string",
      validation: (R) => R.required().email(),
    }),
    defineField({
      name: "location",
      title: "所在地",
      type: "string",
      description: "例如：Taipei, Taiwan",
    }),
    defineField({
      name: "instagram",
      title: "Instagram 帳號",
      type: "string",
      description: "例如：@your_handle",
    }),
    defineField({
      name: "vimeo",
      title: "Vimeo URL（選填）",
      type: "string",
    }),
  ],

  preview: {
    prepare: () => ({ title: "⚙️ 網站設定" }),
  },
});
