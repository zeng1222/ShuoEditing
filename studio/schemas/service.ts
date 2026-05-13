import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const service = defineType({
  name: "service",
  title: "服務方案",
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
      title: "方案名稱",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "tagline",
      title: "副標",
      type: "string",
      description: "例如：適合社群平台、品牌行銷",
    }),
    defineField({
      name: "priceFrom",
      title: "起價（NTD）",
      type: "number",
      validation: (R) => R.required().positive(),
    }),
    defineField({
      name: "priceUnit",
      title: "計價單位",
      type: "string",
      initialValue: "起 / 支",
      description: "例如：起 / 支、起 / 專案",
    }),
    defineField({
      name: "deliveryTime",
      title: "交期",
      type: "string",
      description: "例如：7 個工作天",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "includes",
      title: "方案包含",
      type: "array",
      of: [{ type: "string" }],
      description: "列出方案內含項目，每行一個",
      validation: (R) => R.required().min(1),
    }),
    defineField({
      name: "order",
      title: "顯示順序（舊欄位，新版用拖曳取代）",
      type: "number",
      initialValue: 1,
      hidden: true,
    }),

    orderRankField({ type: "service" }),
  ],

  preview: {
    select: {
      title: "name",
      tagline: "tagline",
      price: "priceFrom",
    },
    prepare({ title, tagline, price }) {
      return {
        title,
        subtitle: `NT$ ${price?.toLocaleString() ?? "—"} · ${tagline ?? ""}`,
      };
    },
  },
});
