# ERP Design

為製造業 ERP 應用打造的產業別設計系統。每個產業擁有專屬的 `DESIGN.md`（設計代碼、字型、色彩、元件）。統一的 Astro 展示網站可即時瀏覽和比較所有設計系統。

[English](README.md)

## 產業總覽

| 產業 | 主色 | 狀態 |
|------|------|------|
| [電子業](designs/電子業/) | Electric Cyan `#00E5FF` | ✅ 完成 |
| [食品廠](designs/食品廠/) | Gradient Green `#10B981` | ✅ 完成 |
| [物流業](designs/物流業/) | Signal Amber `#F59E0B` | ✅ 完成 |
| [金屬加工](designs/金屬加工/) | Forge Orange `#FF6B2C` | ✅ 完成 |
| [紡織業](designs/紡織業/) | Indigo `#6366F1` | ✅ 完成 |
| [製藥業](designs/製藥業/) | Clinical Teal `#14B8A6` | ✅ 完成 |

## 快速開始

```bash
git submodule update --init   # 初始化參考設計
npm install
npm run dev                   # 啟動開發伺服器 http://localhost:4321
```

## 展示網站

使用 **Astro** 建構（Vercel 風格：黑白中性底色、Geist 字型、shadow-as-border）。中性底色讓各產業的 accent 色成為視覺主角。

- **首頁** — 6 個產業的卡片總覽
- **詳情頁** — 嵌入即時 preview，主題同步切換 + 下載 DESIGN.md
- **Preview** — 統一 7 區塊：字型、色彩、元件、間距圓角、陰影層次、KPI 卡片、儀表板 Mockup

## 目錄結構

```
designs/
├── <產業>/
│   └── DESIGN.md              # 設計規格（唯一來源）
src/
├── data/
│   ├── industry-slugs.json    # 產業 slug 映射（單一來源）
│   ├── industries.ts          # 產業 metadata
│   └── design-tokens.ts       # 各產業完整設計 token
├── components/
│   └── PreviewTemplate.astro  # 共用 preview 模板（7 區塊）
├── pages/
│   ├── index.astro            # 首頁卡片總覽
│   ├── designs/[slug].astro   # 詳情頁（iframe + 下載）
│   └── preview/[slug].astro   # 即時 preview 頁面
├── layouts/Base.astro
└── styles/global.css
scripts/prebuild.mjs           # 打包 DESIGN.md 為下載 zip
awesome-design-md/             # submodule — 59 套參考設計系統
```

## 設計系統格式

每份 `DESIGN.md` 包含：

- **產品情境** — 目標使用者、產業、專案類型
- **美學方向** — 氛圍、裝飾程度、參考靈感
- **字型系統** — 字型組合、字級表、CSS 變數
- **色彩** — 主色、背景色階、語義狀態色、明暗模式
- **間距** — 8px 基準單位、Compact-first 密度
- **版面** — 12 欄網格、Sidebar、Header、斷點
- **深度與層級** — 陰影系統、圓角層級
- **動效** — 緩動函數、時長、特色動畫
- **元件模式** — 按鈕、表格、標籤、KPI 卡片、導航
- **Do's and Don'ts** — 一致性護欄

## 設計參考

本專案以 submodule 引入 [awesome-design-md](https://github.com/VoltAgent/awesome-design-md)，包含 59 套參考設計系統（Linear、Stripe、BMW、Tesla、SpaceX 等）作為靈感來源。

## 共通慣例

所有產業設計系統共享以下慣例，同時保持各自的視覺獨特性：

- **亮色模式預設** — 預覽預設亮色，可切換深色模式
- **等寬數據字型** — Geist Mono + `tabular-nums`，所有數值資料
- **8px 間距基準** — Compact-first，適配資料密集型 ERP
- **LED 發光狀態標籤** — 膠囊形 + 動態脈衝指示

## 技術棧

- [Astro](https://astro.build/) — 靜態站產生器
- [Geist](https://vercel.com/font) — Sans + Mono 字型
- 部署於 [Zeabur](https://zeabur.com/)

## 授權

私有專案。
