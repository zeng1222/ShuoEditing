import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "網站設定",
  type: "document",
  groups: [
    { name: "general", title: "一般" },
    { name: "contact", title: "聯絡區塊" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "網站名稱",
      type: "string",
      group: "general",
      initialValue: "Shuo Portfolio",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "email",
      title: "聯絡 Email",
      type: "string",
      group: "general",
      validation: (R) => R.required().email(),
    }),
    defineField({
      name: "lineId",
      title: "Line ID（顯示用）",
      type: "string",
      group: "general",
      description: "例如 @shuo_editing",
    }),
    defineField({
      name: "location",
      title: "所在地",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "instagram",
      title: "Instagram 帳號",
      type: "string",
      group: "general",
    }),

    // ===== 聯絡區塊文案（可編輯） =====
    defineField({
      name: "contactTitle",
      title: "聯絡區塊標題",
      type: "string",
      group: "contact",
      initialValue: "聊聊你的專案",
      description: "顯示在最底部聯絡區塊的大標",
    }),
    defineField({
      name: "contactIntro",
      title: "聯絡區塊副標",
      type: "text",
      rows: 3,
      group: "contact",
      description: "標題下方的說明文字",
    }),
    defineField({
      name: "contactResponseTime",
      title: "回覆時間說明",
      type: "string",
      group: "contact",
      initialValue: "一般工作天 48 小時內回覆",
    }),
  ],

  preview: {
    prepare: () => ({ title: "⚙️ 網站設定" }),
  },
});
