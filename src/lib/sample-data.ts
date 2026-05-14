import type {
  Work,
  Homepage,
  About,
  Service,
  FAQ,
  SiteSettings,
  Category,
} from "./types";

export const sampleSite: SiteSettings = {
  siteName: "Shuo Portfolio",
  email: "hello@example.com",
  lineId: "@shuo_editing",
  location: "Taipei, Taiwan",
  instagram: "@shuo_editing",
  contactTitle: "聊聊你的專案",
  contactIntro:
    "留下你的 LINE 或 Email，我會在 48 小時內主動聯繫，了解你的需求。",
  contactResponseTime: "一般工作天 48 小時內回覆",
};

export const sampleHomepage: Homepage = {
  tagline: "Shuo 剪輯工作室",
  intro:
    "專注於短影音剪輯 — 為品牌、創作者、個人 IP 製作節奏緊湊、視覺鮮明的短內容。",
  showreelYoutubeId: "dQw4w9WgXcQ",
  showreelCaption: "2026 Showreel · 精選作品集錦",
};

export const sampleAbout: About = {
  bio:
    "Shuo 剪輯工作室 — 專注於剪輯，把素材轉成有節奏、有情緒的影像故事。\n\n從廣告公司到獨立接案，3 年多的剪輯經驗，服務超過 100 個品牌與創作者，產出 1000+ 支影片作品。",
  yearsExperience: 3,
  projectsCount: 100,
  editsCount: 1000,
  servicesText: "YT 長影音 · IG / TikTok 短影音（純剪輯）",
  brands: [],
};

export const sampleCategories: Category[] = [
  { _id: "cat-beauty", name: "美妝品牌", slug: "beauty" },
  { _id: "cat-food", name: "美食探店", slug: "food" },
  { _id: "cat-creator", name: "創作者合作", slug: "creator" },
  { _id: "cat-mv", name: "音樂錄影帶", slug: "music-video" },
  { _id: "cat-doc", name: "訪談紀錄", slug: "documentary" },
  { _id: "cat-event", name: "活動側拍", slug: "event" },
];

const cat = (slug: string) =>
  sampleCategories.find((c) => c.slug === slug)!;

export const sampleWorks: Work[] = [
  {
    _id: "1",
    slug: "skincare-reel",
    title: "保養品牌 Reel 系列",
    client: "某美妝品牌",
    year: 2026,
    category: cat("beauty"),
    format: "vertical",
    youtubeId: "dQw4w9WgXcQ",
    excerpt: "三支 15 秒系列短片，為新品上市打造的 Reels 內容。",
  },
  {
    _id: "2",
    slug: "creator-vlog",
    title: "創作者日常 Vlog 短片",
    client: "某 IG 創作者",
    year: 2026,
    category: cat("creator"),
    format: "vertical",
    youtubeId: "dQw4w9WgXcQ",
    excerpt: "30 秒一日生活 Vlog，節奏緊湊但有情緒。",
  },
  {
    _id: "3",
    slug: "food-shorts",
    title: "餐廳介紹 Shorts",
    client: "某餐廳集團",
    year: 2025,
    category: cat("food"),
    format: "vertical",
    youtubeId: "dQw4w9WgXcQ",
    excerpt: "ASMR 風格的食物特寫短片。",
  },
  {
    _id: "4",
    slug: "mv-snippet",
    title: "MV 直式版本剪輯",
    client: "某獨立音樂人",
    year: 2025,
    category: cat("music-video"),
    format: "vertical",
    youtubeId: "dQw4w9WgXcQ",
    excerpt: "為社群平台重新剪輯的 60 秒直式 MV。",
  },
  {
    _id: "5",
    slug: "fashion-haul",
    title: "穿搭分享 Reels",
    client: "個人創作者",
    year: 2025,
    category: cat("creator"),
    format: "vertical",
    youtubeId: "dQw4w9WgXcQ",
    excerpt: "六套穿搭、45 秒、節奏隨音樂變化。",
  },
  {
    _id: "6",
    slug: "event-recap",
    title: "活動回顧 Reels",
    client: "某活動主辦",
    year: 2025,
    category: cat("event"),
    format: "vertical",
    youtubeId: "dQw4w9WgXcQ",
    excerpt: "兩日活動濃縮成 45 秒精華。",
  },

  // Long-form samples (16:9)
  {
    _id: "L1",
    slug: "brand-documentary",
    title: "品牌故事紀錄片",
    client: "某文化品牌",
    year: 2025,
    category: cat("documentary"),
    format: "horizontal",
    youtubeId: "dQw4w9WgXcQ",
    excerpt: "8 分鐘紀錄片，記錄職人的一日工作。",
  },
  {
    _id: "L2",
    slug: "yt-podcast-edit",
    title: "Podcast 影音版剪輯",
    client: "某 YouTuber",
    year: 2025,
    category: cat("creator"),
    format: "horizontal",
    youtubeId: "dQw4w9WgXcQ",
    excerpt: "45 分鐘 Podcast 影音剪輯，含 b-roll 與字幕設計。",
  },
];

export const sampleServices: Service[] = [
  {
    _id: "s1",
    name: "單支短影音",
    tagline: "15-60 秒 · 適合社群測試",
    priceFrom: 3500,
    priceUnit: "起 / 支",
    includes: [
      "60 秒內成片",
      "兩次修改",
      "字卡 + 基礎調色",
      "音樂選曲建議",
    ],
    deliveryTime: "5 個工作天",
    order: 1,
  },
  {
    _id: "s2",
    name: "短影音系列包",
    tagline: "3-5 支 · 適合品牌活動",
    priceFrom: 12000,
    priceUnit: "起 / 系列",
    includes: [
      "風格一致的系列短片",
      "三次修改",
      "完整字幕 + 動態字卡",
      "進階調色",
      "多平台規格輸出",
    ],
    deliveryTime: "10 個工作天",
    order: 2,
  },
  {
    _id: "s3",
    name: "長期合作包月",
    tagline: "每月 8-12 支",
    priceFrom: 35000,
    priceUnit: "起 / 月",
    includes: [
      "每月 8-12 支短影音",
      "優先排程",
      "風格策略討論",
      "內容企劃建議",
      "無限次修改",
    ],
    deliveryTime: "依排程",
    order: 3,
  },
];

export const sampleFAQs: FAQ[] = [
  {
    question: "如何開始合作？",
    answer:
      "請透過下方表單留下你的 LINE，我會在 48 小時內主動加你並了解需求。",
  },
  {
    question: "可以接急件嗎？",
    answer: "可以，但會收取急件加成費用（30-50%）。請先聯繫確認檔期。",
  },
  {
    question: "費用包含哪些？",
    answer:
      "報價包含剪輯、調色、字幕、聲音整理、不同平台規格輸出。不包含拍攝、音樂版權購買、特殊特效。",
  },
  {
    question: "可以保密嗎？",
    answer: "可以簽署 NDA。未公開的客戶案件不會放上作品集，或設為密碼保護。",
  },
];
