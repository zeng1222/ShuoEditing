# 剪輯師作品集網站

直式短影音作品集 · 一頁式 · Astro + Sanity（含 Visual Editing 點擊式編輯）

```
portfolio/
├── src/              主網站（Astro）
├── studio/           Sanity 後台（含 Presentation 視覺編輯）
└── README.md
```

## 第一次設定

### 1. 安裝主網站依賴

```bash
npm install
```

啟動開發伺服器看視覺成果（不需 Sanity 也能跑，會用範例資料）：

```bash
npm run dev
# → http://localhost:4321
```

### 2. 建立 Sanity 專案

1. 到 https://www.sanity.io/signup 註冊（Google 登入最快）
2. https://www.sanity.io/manage → Create new project
3. 名稱 `Editor Portfolio`，dataset 用 `production`
4. **複製 Project ID**（像 `abcd1234`）
5. 在 **API → Tokens** 建立一個 **Viewer** token（給 Visual Editing 用），複製備用
6. 在 **API → CORS origins** 加入 `http://localhost:4321`（之後再加上 production 網址）

### 3. 填入環境變數

```bash
cp .env.example .env
cp studio/.env.example studio/.env
```

`/.env`：
```
PUBLIC_SANITY_PROJECT_ID=你的 Project ID
PUBLIC_SANITY_DATASET=production
SANITY_VIEWER_TOKEN=你剛建的 Viewer Token
```

`studio/.env`：
```
SANITY_STUDIO_PROJECT_ID=同一個 Project ID
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PREVIEW_URL=http://localhost:4321
```

### 4. 安裝並啟動 Studio

```bash
cd studio
npm install
npx sanity login    # 第一次需要登入
npm run dev         # → http://localhost:3333
```

---

## 日常使用：Visual Editing 編輯流程

啟動兩個終端：

```bash
# 終端 1：主網站
npm run dev

# 終端 2：Sanity Studio
cd studio && npm run dev
```

打開 http://localhost:3333

1. 點左側 **「Presentation」** 圖示
2. 右半邊會載入你的網站預覽
3. **點任何文字 → 左側欄位自動跳到對應位置 → 改字 → 預覽即時更新**
4. 可以在預覽上方切換 **手機 / 平板 / 桌機** 尺寸
5. 沒儲存前是「草稿」狀態，按 **Publish** 才會更新正式網站

### 拖曳排序

左側選單裡，這三個項目支援拖曳：
- 📁 **作品（拖曳排序）**
- 💼 **服務方案（拖曳排序）**
- ❓ **常見問題（拖曳排序）**

進入清單後直接用滑鼠拖列拉項目調整順序，**即時生效**，不用 publish。

### 新增作品

1. 點「📁 作品」→ 右上角「+」
2. 填表單（標題、YouTube ID、類型、說明等）
3. 按 Publish
4. 在 Presentation 模式可即時看到新作品出現在牆面

---

## 部署到雲端（讓網站和後台都上線）

### Astro 網站 → Vercel

```bash
# 推到 GitHub 後到 vercel.com 連接 repo
# 在 Environment Variables 設定：
#   PUBLIC_SANITY_PROJECT_ID
#   PUBLIC_SANITY_DATASET
#   SANITY_VIEWER_TOKEN
#   RESEND_API_KEY (聯絡表單用，選填)
```

部署完成後，記得在 Sanity → API → CORS origins 加上 production 網址。

### Sanity Studio → sanity.studio 子網域

```bash
cd studio
npx sanity deploy
# 選一個 hostname，例如 your-portfolio
# → https://your-portfolio.sanity.studio
```

部署後 **記得在 studio/.env 把 SANITY_STUDIO_PREVIEW_URL 改成 production 網址**，否則 Presentation 還是會載入 localhost。

---

## 聯絡表單（可選）

預設只 console.log 訊息。要寄信到信箱：

1. https://resend.com 註冊（每月 3,000 封免費）
2. 驗證 domain，取得 API Key
3. 填 `.env`：
   ```
   RESEND_API_KEY=re_xxx
   CONTACT_TO_EMAIL=your-email@example.com
   CONTACT_FROM_EMAIL=noreply@yourdomain.com
   ```

---

## 技術棧

- **前端**：Astro 6 + Tailwind CSS v4
- **後台**：Sanity v3 + Presentation tool + orderable-document-list
- **影片**：YouTube 嵌入 + lite-youtube-embed（先載縮圖，點擊才載播放器）
- **聯絡表單**：Resend + Vercel Functions
- **字體**：Inter Tight + Instrument Serif italic + Noto Sans TC
- **部署**：Vercel（網站）+ Sanity Cloud（後台）

## 常用指令

```bash
# 主網站（在專案根目錄）
npm run dev          # localhost:4321
npm run build        # 建置正式版
npm run preview      # 預覽 build

# Sanity Studio（在 studio/ 內）
npm run dev          # localhost:3333
npm run build
npm run deploy       # 部署到 sanity.studio
```

## 客製化

- **顏色字體**：`src/styles/global.css` 的 `@theme` 區塊
- **導覽選單**：`src/components/Nav.astro`
- **作品類型**：`src/lib/types.ts` 的 `CATEGORY_LABELS`（同步改 `studio/schemas/work.ts` 的 options）
