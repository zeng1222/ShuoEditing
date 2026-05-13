import type {
  Work,
  Homepage,
  About,
  Service,
  FAQ,
  SiteSettings,
  Category,
} from "./types";

// Fallback data shown when Sanity is not yet configured.

export const sampleSite: SiteSettings = {
  siteName: "Editor Portfolio",
  email: "hello@example.com",
  location: "Taipei, Taiwan",
  instagram: "@your_handle",
};

export const sampleHomepage: Homepage = {
  tagline: "短影音的剪輯室",
  intro:
    "我相信好的剪輯，是把素材裡藏著的情緒挑出來，讓觀眾在 15 秒內被帶走。專注於直式短影音 — Reels、Shorts、TikTok。",
  showreelYoutubeId: "dQw4w9WgXcQ",
  showreelCaption: "2025 Reel · 精選作品集錦",
};

export const sampleAbout: About = {
  bio:
    "剪輯師、影像工作者。從廣告公司起步，現為獨立接案。專注於直式短影音 — 為品牌、創作者、個人 IP 製作節奏緊湊、視覺鮮明的短內容。\n\n相信短影音不是「長片變短」，而是另一種敘事文法。15 秒裡的每一個切點、每一個轉場、每一個字卡的進場時機，都該被認真對待。",
  experience: [
    { year: "2024", description: "獨立接案 · 短影音剪輯 / Creator 合作" },
    { year: "2021—2024", description: "某廣告公司 · 後期製作部" },
    { year: "2020", description: "國立藝術大學 影像系畢業" },
  ],
  brands: [
    { name: "Brand A" },
    { name: "Brand B" },
    { name: "Brand C" },
    { name: "Brand D" },
    { name: "Brand E" },
    { name: "Brand F" },
  ],
};

export const sampleCategories: Category[] = [
  { _id: "cat-commercial", name: "品牌商業", slug: "commercial" },
  { _id: "cat-creator", name: "創作者合作", slug: "creator" },
  { _id: "cat-mv", name: "音樂錄影帶", slug: "music-video" },
  { _id: "cat-doc", name: "訪談紀錄", slug: "documentary" },
  { _id: "cat-short", name: "短片", slug: "short-film" },
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
    year: 2025,
    category: cat("commercial"),
    youtubeId: "dQw4w9WgXcQ",
    excerpt: "三支 15 秒系列短片，為新品上市打造的 Reels 內容。",
    description:
      "客戶希望在三天內產出三支 15 秒短片，每支獨立但風格一致。剪輯重點放在前 3 秒的鉤子，以及節奏與背景音樂的咬合。\n\n用了大量快速跳切搭配字卡進場，但保留每個畫面 0.5 秒以上的呼吸感。最終 CTR 高於品牌過往平均 40%。",
    role: "剪輯指導 · 字幕設計",
    credits: [
      { label: "導演", name: "—" },
      { label: "攝影", name: "—" },
      { label: "剪輯", name: "本人" },
    ],
    featured: true,
    featuredOrder: 1,
  },
  {
    _id: "2",
    slug: "creator-vlog",
    title: "創作者日常 Vlog 短片",
    client: "某 IG 創作者",
    year: 2025,
    category: cat("creator"),
    youtubeId: "dQw4w9WgXcQ",
    excerpt: "30 秒一日生活 Vlog，節奏緊湊但有情緒。",
    description:
      "為創作者打造的個人風格短片。挑戰在於：3 小時的 vlog 素材壓縮成 30 秒，但要保留情緒起伏，不能只是流水帳。\n\n採用「日記式」的結構，加上手寫字卡與環境聲，營造私密感。",
    role: "剪輯",
    featured: true,
    featuredOrder: 2,
  },
  {
    _id: "3",
    slug: "food-shorts",
    title: "餐廳介紹 Shorts",
    client: "某餐廳集團",
    year: 2024,
    category: cat("commercial"),
    youtubeId: "dQw4w9WgXcQ",
    excerpt: "ASMR 風格的食物特寫短片。",
    description:
      "全片以聲音為核心 — 切菜聲、油爆聲、湯匙碰瓷的聲音。畫面跟著聲音剪，反向操作。",
    role: "剪輯 · 聲音設計",
    featured: true,
    featuredOrder: 3,
  },
  {
    _id: "4",
    slug: "mv-snippet",
    title: "MV 直式版本剪輯",
    client: "某獨立音樂人",
    year: 2024,
    category: cat("music-video"),
    youtubeId: "dQw4w9WgXcQ",
    excerpt: "為社群平台重新剪輯的 60 秒直式 MV。",
    description:
      "從橫式 4 分鐘 MV 重新剪出直式 60 秒。不是單純裁切 — 而是重新挑鏡頭、重組節奏、改變視覺重心。",
    role: "剪輯",
    featured: true,
    featuredOrder: 4,
  },
  {
    _id: "5",
    slug: "fashion-haul",
    title: "穿搭分享 Reels",
    client: "個人創作者",
    year: 2024,
    category: cat("creator"),
    youtubeId: "dQw4w9WgXcQ",
    excerpt: "六套穿搭、45 秒、節奏隨音樂變化。",
    featured: true,
    featuredOrder: 5,
  },
  {
    _id: "6",
    slug: "product-launch",
    title: "新品發表短片",
    client: "某科技品牌",
    year: 2024,
    category: cat("commercial"),
    youtubeId: "dQw4w9WgXcQ",
    excerpt: "20 秒產品 teaser，三個視覺重點。",
    featured: true,
    featuredOrder: 6,
  },
  {
    _id: "7",
    slug: "interview-clips",
    title: "人物訪談精華剪輯",
    client: "某媒體",
    year: 2024,
    category: cat("documentary"),
    youtubeId: "dQw4w9WgXcQ",
    excerpt: "兩小時訪談剪出五支 30 秒精華片段。",
    featured: true,
    featuredOrder: 7,
  },
  {
    _id: "8",
    slug: "event-recap",
    title: "活動回顧 Reels",
    client: "某活動主辦",
    year: 2024,
    category: cat("event"),
    youtubeId: "dQw4w9WgXcQ",
    excerpt: "兩日活動濃縮成 45 秒精華。",
    featured: true,
    featuredOrder: 8,
  },
  {
    _id: "9",
    slug: "tutorial-series",
    title: "教學系列短片",
    year: 2023,
    category: cat("creator"),
    youtubeId: "dQw4w9WgXcQ",
    excerpt: "10 集教學短片，每集 60 秒。",
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
      "多平台規格輸出 (Reels / Shorts / TikTok)",
    ],
    deliveryTime: "10 個工作天",
    order: 2,
  },
  {
    _id: "s3",
    name: "長期合作包月",
    tagline: "每月 8-12 支 · 適合創作者與品牌經營",
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
      "請透過下方表單留言，告訴我專案類型、預算與時程。我會在 48 小時內回覆，必要時安排線上會議了解細節。",
  },
  {
    question: "可以接急件嗎？",
    answer:
      "可以，但會收取急件加成費用（30-50%）。請先聯繫確認檔期。",
  },
  {
    question: "費用包含哪些？",
    answer:
      "報價包含剪輯、調色、字幕、聲音整理、不同平台規格輸出。不包含拍攝、音樂版權購買、特殊特效。",
  },
  {
    question: "可以提供素材以外的東西嗎？",
    answer:
      "可以協助處理：腳本/分鏡建議、內容企劃、配樂建議、版權音樂資源推薦。",
  },
  {
    question: "可以保密嗎？",
    answer:
      "可以簽署 NDA。未公開的客戶案件不會放上作品集，或設定為密碼保護。",
  },
];
