import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const faq = defineType({
  name: "faq",
  title: "常見問題",
  type: "document",
  orderings: [
    {
      title: "拖曳順序",
      name: "orderRank",
      by: [{ field: "orderRank", direction: "asc" }],
    },
  ],
  fields: [
    defineField({
      name: "question",
      title: "問題",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "answer",
      title: "回答",
      type: "text",
      rows: 4,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "order",
      title: "顯示順序（舊欄位，新版用拖曳取代）",
      type: "number",
      initialValue: 1,
      hidden: true,
    }),

    orderRankField({ type: "faq" }),
  ],

  preview: {
    select: { title: "question", subtitle: "answer" },
  },
});
