# Design System — FoodSafe ERP

## Product Context
- **What this is:** 食品廠 ERP 系統，涵蓋生產排程、庫存管理、品質追蹤、HACCP 合規、進出貨管理
- **Who it's for:** 工廠管理者、產線主管、品管人員、倉管人員
- **Space/industry:** 食品製造業
- **Project type:** 資料密集型企業 Web App（儀表板 + 資料表格 + 表單）
- **Design philosophy:** 「資料狀態就是設計」— 綠色是合規、紅色是警報、等寬是精確。每個視覺決策都有功能理由。

## Aesthetic Direction
- **Direction:** Industrial/Utilitarian with premium finish — 控制室美學，不是辦公室 ERP
- **Decoration level:** Intentional — 玻璃擬態、漸層、發光效果作為功能性裝飾
- **Mood:** 專業、精確、科技感。像 NASA 控制室遇上現代 SaaS Dashboard
- **Theme:** Dark mode first — 深色基底減少視覺疲勞，狀態色彩在深色背景上更鮮明
- **Reference base:** IBM/Carbon 的結構紀律 + Sentry 的深色活力

## Typography

### Font Stack
- **Display/Body:** `Plus Jakarta Sans`, `Noto Sans TC`, `system-ui`, `sans-serif`
- **Data/Monospace:** `JetBrains Mono`, `SF Mono`, `monospace`
- **CJK:** `Noto Sans TC`（思源黑體）
- **Loading:** Bunny Fonts CDN (`fonts.bunny.net`)

### Font Usage Rules
- **Display/UI:** Plus Jakarta Sans — 所有標題、導航、按鈕、標籤
- **Production Data:** JetBrains Mono — 批號、lot number、重量、溫度、pH 值、時間戳、所有數值資料
- **Body Text:** Plus Jakarta Sans — 描述文字、備註、說明

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display | Jakarta Sans | 52px (3.25rem) | 800 | 1.05 | -0.03em | 頁面主標題，漸層上色 |
| H1 | Jakarta Sans | 36px (2.25rem) | 700 | 1.15 | -0.02em | 區塊標題 |
| H2 | Jakarta Sans | 24px (1.50rem) | 700 | 1.20 | -0.01em | 子區塊標題 |
| H3 | Jakarta Sans | 18px (1.13rem) | 600 | 1.30 | 0 | 卡片標題 |
| Body | Jakarta Sans | 15px (0.94rem) | 400 | 1.60 | 0 | 標準內文 |
| Caption | Jakarta Sans | 13px (0.81rem) | 400 | 1.40 | 0 | 輔助資訊 |
| Label | Jakarta Sans | 11-12px | 700 | 1.33 | 0.06-0.12em | `text-transform: uppercase` |
| Data | JetBrains Mono | 12-14px | 400 | 1.50 | 0 | 所有生產資料 |
| Data Large | JetBrains Mono | 28-40px | 500-600 | 1.10 | 0 | KPI 大數字，可漸層上色 |

### Principles
- **雙字型系統：** Jakarta Sans 負責所有 UI 文字；JetBrains Mono 負責所有數值/生產資料
- **判斷標準：** 如果這個文字代表「可被機器讀取的精確資料」→ 用 mono。否則 → 用 Jakarta
- **Weight 800 限 Display：** 只有頁面最頂級標題用 800 weight，其餘 700/600/400
- **Uppercase labels：** Section title、KPI label、表頭全部用 uppercase + letter-spacing

## Color

### Approach
Restrained with intentional glow — 核心只有一個漸層主色 + 紅綠燈三色。深色背景讓色彩發光，不需要更多裝飾色。

### Primary — Gradient Green
- **Primary Gradient:** `linear-gradient(135deg, #059669, #10B981, #0D9488)` — 翡翠到青綠
- **Primary:** `#10B981` — 主色基準值
- **Primary Dark:** `#059669` — hover、active 狀態
- **Primary Darker:** `#047857` — pressed 狀態
- **Primary Light:** `#34D399` — dark mode 文字、亮色調
- **Primary Glow:** `rgba(16, 185, 129, 0.25)` — 發光陰影

### Traffic Light System（核心色彩語言）

| Status | Color (Dark) | Color (Light) | Glow | Background | Meaning |
|--------|-------------|---------------|------|------------|---------|
| OK / 合規 | `#34D399` | `#16A34A` | `rgba(52,211,153,0.2)` | `rgba(52,211,153,0.1)` | 數據在安全範圍 |
| Warning / 注意 | `#FBBF24` | `#D97706` | `rgba(251,191,36,0.2)` | `rgba(251,191,36,0.1)` | 接近臨界值 |
| Danger / 異常 | `#F87171` | `#DC2626` | `rgba(248,113,113,0.2)` | `rgba(248,113,113,0.1)` | 超出安全範圍 |
| Info / 資訊 | `#60A5FA` | `#2563EB` | `rgba(96,165,250,0.2)` | `rgba(96,165,250,0.1)` | 中性資訊 |

### Warm Neutrals (Stone) — Dark Theme

| Token | Hex | Usage |
|-------|-----|-------|
| Gray 100 | `#0F0E0D` | 頁面背景 `--background` |
| Gray 95 | `#161514` | 次級背景 `--background-secondary` |
| Gray 90 | `#1C1B19` | 深色表面 |
| Gray 85 | `#232220` | Sidebar 背景 |
| Gray 80 | `#2E2C2A` | 邊框、分隔線 |
| Gray 70 | `#3D3B38` | hover 背景 |
| Gray 60 | `#57534E` | 次要文字 |
| Gray 50 | `#78716C` | muted 文字 |
| Gray 40 | `#A8A29E` | 次要文字 (dark) |
| Gray 30 | `#D6D3D1` | 次要文字 (light) |
| Gray 20 | `#E7E5E3` | 邊框 (light) |
| Gray 10 | `#F5F5F4` | 主要文字 (dark) / 表面 (light) |

### Light Theme Overrides
- Background: `#FAFAF9`
- Surface: `rgba(255,255,255,0.9)`
- Primary: `#059669`（略深，確保在白底上對比度足夠）
- Status colors 飽和度降低 — OK `#16A34A`, Warn `#D97706`, Danger `#DC2626`

### Dark Theme Surfaces（透明度優先）
- `--surface`: `rgba(255,255,255,0.03)` — 卡片、容器
- `--surface-hover`: `rgba(255,255,255,0.06)` — hover 狀態
- `--surface-glass`: `rgba(255,255,255,0.05)` — 玻璃擬態
- `--border`: `rgba(255,255,255,0.08)` — 邊框
- `--border-subtle`: `rgba(255,255,255,0.04)` — 細微邊框

## Spacing
- **Base unit:** 8px
- **Density:** Comfortable — 工廠人員使用，不需要極端密集
- **Scale:**

| Token | Value | Usage |
|-------|-------|-------|
| 2xs | 2px | 微調 |
| xs | 4px | 元件內間距 |
| sm | 8px | 基本間距 |
| md | 16px | 標準間距、元件 padding |
| lg | 24px | 區塊內間距 |
| xl | 32px | 區塊間距 |
| 2xl | 48px | 大區塊間距 |
| 3xl | 64px | Section 間距 |

## Layout
- **Approach:** Grid-disciplined — 結構化網格，可預測的對齊
- **Grid:** 12 column
- **Breakpoints:**
  - Mobile: < 640px (single column)
  - Tablet: 640-1024px (collapsed sidebar)
  - Desktop: 1024-1440px (full layout)
  - Wide: > 1440px (max-width contained)
- **Max content width:** 1440px
- **Navigation pattern:** 固定左側 sidebar (240px) + 頂部 header (56px)
- **Primary interaction:** 資料表格 + KPI 卡片 + 狀態監控

### Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| sm | 6px | 輸入框、小元素 |
| md | 10px | 按鈕、標籤、下拉選單 |
| lg | 14px | 卡片、容器、對話框 |
| xl | 20px | 大型容器、模態框 |
| pill | 9999px | 狀態標籤、badge |

## Depth & Elevation

### Glassmorphism（深色主題核心）
- 卡片/容器：`backdrop-filter: blur(12px)` + 半透明背景
- 頂部列：`backdrop-filter: blur(20px) saturate(180%)`
- 邊框用透明度：`rgba(255,255,255,0.08)` 而非實色

### Shadow System

| Level | Treatment | Usage |
|-------|-----------|-------|
| Flat | 無陰影 | 預設表面 |
| Glow-sm | `0 2px 12px var(--primary-glow)` | Primary 按鈕、active nav |
| Glow-md | `0 4px 20px var(--primary-glow)` | hover 狀態 |
| Status glow | `0 0 30px var(--status-X-glow)` | 紅綠燈卡片 |
| Elevated | `0 8px 24px rgba(0,0,0,0.2)` | hover 上浮 |
| Container | `0 0 60px rgba(0,0,0,0.4)` | 大型容器外框 |

### Inset Light
- 玻璃容器頂部：`inset 0 1px 0 rgba(255,255,255,0.05)` — 模擬光源

## Motion
- **Approach:** Intentional — 有目的的動畫，每個都傳達資訊
- **Easing:**
  - Enter/appear: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out)
  - Bounce/spring: `cubic-bezier(0.34, 1.56, 0.64, 1)` (overshoot)
- **Duration:**
  - Fast: 150ms — hover、focus
  - Normal: 250ms — 狀態切換、展開/收合
  - Slow: 400ms — 頁面轉場、模態框

### Functional Animations
- **Hover 上浮:** `translateY(-2px)` + 陰影加深 — 表示可互動
- **呼吸脈衝:** Danger 狀態卡片 glow 值 3 秒一個循環 — 表示需要注意
- **狀態圓點脈衝:** status dot 2 秒一個循環，scale 1→1.5 — 表示即時監控中
- **Focus ring 發光:** `0 0 0 3px var(--primary-glow), 0 0 20px var(--primary-glow)` — 鍵盤焦點可見度

### Motion Rules
1. 動畫只用在傳達狀態變化的地方，不做裝飾性動畫
2. Danger 呼吸脈衝是唯一的持續性動畫，只出現在需要立即處理的項目
3. 使用者可透過 `prefers-reduced-motion` 關閉所有動畫
4. 轉場不超過 400ms

## Component Patterns

### Buttons
- **Primary:** 漸層背景 + 發光陰影 + 白色文字
- **Secondary:** 透明背景 + 邊框 + hover 時邊框變主色
- **Danger:** 紅色漸層 + 發光
- **Warning:** 琥珀漸層 + 發光
- **Ghost:** 透明 + 主色文字 + hover 時淡色底

### Traffic Light Cards
- 透明背景（status color 10% opacity）+ 同色邊框（20% opacity）
- 頂部 3px 漸層色條
- Glow shadow：`0 0 30px` status glow color
- Danger 卡片附加呼吸脈衝動畫

### Data Tables
- 表頭：uppercase label style、灰色背景
- 資料欄位：JetBrains Mono
- 狀態標籤：pill shape + glow
- hover 整行高亮

### KPI Cards
- 左側 3px 漸層色條（對應 status）
- 右上角模糊圓形（status color 15% opacity, blur 40px）
- hover 上浮效果
- 大數字用 JetBrains Mono 600 weight

### Navigation (Sidebar)
- 深色背景 + 漸層 `linear-gradient(180deg, #161514, #0F0E0D)`
- Active item：主色漸層背景 + glow
- Logo：漸層方塊 icon + 漸層文字

### Form Inputs
- 透明背景 + 邊框
- Focus：邊框變主色 + 雙層發光（`0 0 0 3px` + `0 0 20px`）
- 數值欄位用 JetBrains Mono + 主色淡色文字

## Do's and Don'ts

### Do
- 所有生產數據（批號、重量、溫度、pH、時間）用 JetBrains Mono
- 狀態色彩帶 glow shadow，讓紅綠燈在深色背景上發光
- Danger 狀態使用呼吸脈衝動畫
- KPI 卡片左側色條反映資料狀態
- 保持暖色調灰階（Stone palette）
- 漸層綠用在品牌元素（logo、主按鈕、active nav）
- Dark theme 表面用透明度而非實色

### Don't
- 不要用冷灰（blue-gray）— 全部用暖灰 Stone
- 不要在生產資料上用比例字型 — 數字必須等寬對齊
- 不要在非 Danger 狀態使用持續性動畫
- 不要用純黑 `#000000` — 最深用 `#0F0E0D`
- 不要對圓角矩形用 `border-radius: 0` — 最小 6px
- 不要在同一元件混用漸層色和實色按鈕
- 不要加沒有功能意義的裝飾性動畫或圖案

## Kiosk Mode（工廠大螢幕）
針對 55" 產線看板的建議變體：
- 字型放大 1.5-2x
- KPI 卡片改為全寬
- 隱藏 sidebar，只顯示核心監控數據
- 高對比：距離 3 公尺仍可辨識狀態色彩
- 自動輪播不同區域的監控數據

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-10 | 初始設計系統建立 | 基於 IBM/Carbon 結構 + Sentry 深色活力，為食品廠 ERP 定制 |
| 2026-04-10 | Dark mode first | 控制室美學 + 狀態色彩在深色背景更鮮明 |
| 2026-04-10 | 漸層綠取代實色藍 | 食品安全語義 + 與紅綠燈系統一體化 + 區別於所有藍色 ERP |
| 2026-04-10 | JetBrains Mono for data | 生產數據需要精確對齊，等寬字型是功能需求不是風格選擇 |
| 2026-04-10 | 紅綠燈色彩系統 | 食品安全通用語言，每筆資料的狀態就是色彩 |
| 2026-04-10 | 玻璃擬態 + 發光 | 在深色基底上增加層次感和科技感 |
| 2026-04-10 | Plus Jakarta Sans | 比 Source Sans 3 更有衝擊力，weight 800 的 Display 更強烈 |
| 2026-04-10 | 圓角 6-14px | 比 IBM 的 0px 溫暖，比典型 SaaS 的 16px+ 更專業 |
