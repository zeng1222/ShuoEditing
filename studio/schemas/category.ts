import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const category = defineType({
  name: "category",
  title: "作品類型",
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
      name: "name",
      title: "類型名稱",
      type: "string",
      description: "顯示在篩選按鈕和作品卡片上的名稱。例如：品牌商業、創作者合作",
      validation: (R) => R.required().max(20),
    }),
    defineField({
      name: "slug",
      title: "代稱（自動產生）",
      type: "slug",
      description: "用於篩選的內部代稱，由名稱自動產生",
      options: { source: "name", maxLength: 40 },
      validation: (R) => R.required(),
    }),
    orderRankField({ type: "category" }),
  ],

  preview: {
    select: { title: "name", slug: "slug.current" },
    prepare({ title, slug }) {
      return { title, subtitle: slug };
    },
  },
});
