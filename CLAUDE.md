# CLAUDE.md

## Design System
每個產業的設計系統定義在 `designs/<產業>/DESIGN.md`。
進行任何視覺或 UI 決策前，**必須先讀取對應產業的 DESIGN.md**。
字型、色彩、間距、美學方向皆定義於此，未經使用者核准不可偏離。
QA 模式下，標記任何不符合 DESIGN.md 的程式碼。

## 目錄結構

```
designs/
├── <產業>/
│   └── DESIGN.md            # 設計規格：色彩、字型、間距、元件模式
src/
├── data/
│   ├── industry-slugs.json   # 產業 slug 映射（單一來源）
│   ├── industries.ts         # 產業 metadata（名稱、accent、描述）
│   └── design-tokens.ts      # 各產業的完整設計 token（preview 用）
├── components/
│   └── PreviewTemplate.astro # 共用 preview 模板（7 區塊）
├── pages/
│   ├── index.astro           # 首頁卡片總覽
│   ├── designs/[slug].astro  # 產業詳情頁（iframe 嵌入 preview）
│   └── preview/[slug].astro  # 產業 preview 頁面
├── layouts/Base.astro        # 共用 layout（Vercel 風格）
└── styles/global.css         # 全域樣式
scripts/prebuild.mjs          # 建構前複製 DESIGN.md 為下載 zip
docs/references/vercel-DESIGN.md  # 展示網站的設計參考
awesome-design-md/            # submodule — 59 套參考設計系統（唯讀）
```

## 產業設計差異化

每個產業必須有獨立的 accent 色，不可重複：
- 電子業：Electric Cyan `#00E5FF`
- 食品廠：Gradient Green `#10B981`
- 物流業：Signal Amber `#F59E0B`
- 金屬加工：Forge Orange `#FF6B2C`
- 紡織業：Indigo `#6366F1`
- 製藥業：Clinical Teal `#14B8A6`

共通慣例：亮色預設、Geist Mono 等寬數據、8px 間距基準、LED 發光狀態標籤。

## 新增產業流程

1. 從 `awesome-design-md/design-md/` 挑選 3-5 個風格參考
2. 執行 `/design-consultation` 產出設計系統
3. 在 `designs/<產業>/` 產出 `DESIGN.md`
4. 在 `src/data/industry-slugs.json` 新增 `{ dirName, slug }` 映射
5. 在 `src/data/industries.ts` 新增 metadata（nameEn、accent、description）
6. 在 `src/data/design-tokens.ts` 新增該產業的完整設計 token
7. 確保 accent 色與既有產業不衝突

## 開發指令

```bash
npm install                   # 安裝依賴
npm run dev                   # 啟動開發伺服器（含 prebuild）
npm run build                 # 建構靜態站（部署至 Zeabur）
```

## 預覽

開發伺服器啟動後，訪問 `http://localhost:4321/` 查看首頁，
點擊產業卡片進入 preview 頁面。

## Git 規範

- 執行 `git commit` 或 `git push` 之前，**必須先取得使用者明確同意**，不可自行決定提交或推送。
- **禁止修改** `awesome-design-md/` submodule 的任何內容，該目錄為唯讀參考資料。

## 前置設定

```bash
git submodule update --init   # 初始化 awesome-design-md 參考設計
```
