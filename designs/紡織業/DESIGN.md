# Design System — TextileWeave ERP

## Product Context
- **What this is:** Dark-mode-first ERP 系統，用於紡織製造管理 — 織布排程、染整製程、成衣追蹤、品質檢測、訂單管理
- **Who it's for:** 廠長、生管人員、染整工程師、品管員、業務主管
- **Space/industry:** 紡織製造業（織布、染整、印花、成衣、品質檢驗）
- **Project type:** 資料密集型企業 Web App（儀表板 + 訂單管理 + 製程監控 + 品質報表）

## Aesthetic Direction
- **Direction:** Loom Precision — 織機精密美學，不是辦公室軟體
- **Decoration level:** Intentional — 織物紋理漸層 + 絲綢光澤邊框 + 靛藍染料發光效果
- **Mood:** 打開這個 ERP 像走進深夜的染整控制室。暗靛色背景上，靛藍標記著每一道工序的進度。紗支數等寬排列，機台狀態指示燈脈衝閃爍。不是科幻片，不是企業灰 — 是織機級的精密、優雅、有溫度的工業控制台。
- **Reference inspirations:** Linear（極簡精密暗色 UI、精確邊框）、Stripe（優雅字重 300、紫色漸層質感）、Pinterest（視覺探索、圖片優先）、Figma（多彩活潑專業）、Revolut（暗底漸層卡片、金融級精緻）

## Typography

### Font Stack
- **Display/Hero:** Satoshi — 幾何精密但有織物的柔和圓潤。比 General Sans 更溫暖，比 Space Grotesk 更柔軟，呼應紡織品的觸感。
- **Body/UI:** Instrument Sans — 優雅可讀、比 DM Sans 更精緻。Google Fonts 上最佳「精緻工藝」感 body 字型，CJK 搭配良好。
- **Data/Tables:** Geist Mono — 紗支數、碼重、色號、批號。tabular-nums 精確對齊，維持系列設計一致性。
- **Code:** Geist Mono
- **Loading:**
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Satoshi:wght@400;500;600;700&family=Instrument+Sans:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  ```

### CSS Variables
```css
--font-display: 'Satoshi', system-ui, -apple-system, sans-serif;
--font-body: 'Instrument Sans', system-ui, -apple-system, sans-serif;
--font-mono: 'Geist Mono', ui-monospace, 'SF Mono', 'Menlo', monospace;
```

### Scale

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display XL | Satoshi | 48px | 700 | 1.05 | -1.2px | 頁面主標題，最大衝擊力 |
| Display | Satoshi | 32px | 600 | 1.1 | -0.8px | 區塊標題 |
| Heading | Satoshi | 22px | 600 | 1.2 | -0.3px | 卡片標題、子區塊 |
| Heading SM | Satoshi | 18px | 600 | 1.3 | -0.2px | 小標題、Widget 標題 |
| Body LG | Instrument Sans | 16px | 400 | 1.5 | normal | 功能描述 |
| Body | Instrument Sans | 14px | 400 | 1.5 | normal | 標準內文 |
| Body SM | Instrument Sans | 13px | 400 | 1.5 | normal | 表格內文、緊湊內文 |
| Body Emphasis | Instrument Sans | 14px | 600 | 1.5 | normal | 標籤、導航 |
| Caption | Instrument Sans | 12px | 500 | 1.4 | normal | 時間戳、備註 |
| Data | Geist Mono | 13px | 500 | 1.4 | normal | 紗支數、碼重、色號、批號。`font-variant-numeric: tabular-nums` |
| Data SM | Geist Mono | 12px | 400 | 1.4 | normal | 小數據、圖表標籤 |
| Label | Geist Mono | 10px | 500 | 1.4 | 1.5px | 表頭、區塊標籤。UPPERCASE |
| Micro | Geist Mono | 10px | 500 | 1.4 | normal | Badges、tiny labels |

### Principles
- **三字型系統：** Satoshi 負責標題的柔和精密感，Instrument Sans 負責 UI 優雅可讀性，Geist Mono 負責數據精準度
- **負字距是身份：** Display 尺寸使用 -0.8px ~ -1.2px 字距，標題看起來像高端紡織品牌的銘牌
- **判斷標準：** 如果是「被量測的精確資料」→ Geist Mono。如果是「被閱讀的內容」→ Instrument Sans。如果是「被掃視的標題」→ Satoshi
- **Satoshi 的柔和幾何感：** 圓潤的幾何結構帶有織物觸感，比 Space Grotesk 的機械感更適合紡織產業

## Color

### Approach
Loom-driven — 暗靛色畫布上，靛藍主色像古老的染料從染缸中暈開，標記關鍵製程進度。色彩稀少而有力 — 當 indigo 亮起，它像絲綢上的靛藍光澤般命令注意力。

### CSS Custom Properties
```css
/* Background Surfaces — 暗靛色階（紫灰調，染缸沉澱物的色感）*/
--bg-deep: #0C0B11;           /* 頁面背景 — 染缸黑，微紫調的深夜染整車間 */
--bg-surface-1: #13121A;      /* Sidebar、面板、次級容器 */
--bg-surface-2: #1B1A24;      /* 卡片、Modal、Dropdown */
--bg-surface-3: #24232F;      /* Hover 狀態、Active 元素 */
--bg-surface-4: #2D2C3A;      /* 選取列、Pressed 狀態 */

/* Accent — Indigo（靛藍）*/
--accent-primary: #6366F1;    /* 靛藍 — 最古老紡織染料、深邃高貴的藍紫 */
--accent-primary-dim: rgba(99, 102, 241, 0.15);
--accent-primary-glow: rgba(99, 102, 241, 0.4);
--accent-secondary: #A78BFA;  /* 淡紫絲綢 — 絲綢光澤、輔助資訊、次要動作 */
--accent-secondary-dim: rgba(167, 139, 250, 0.15);

/* Text */
--text-primary: #E8E6F0;      /* 近白，偏暖紫 — 織物表面的柔和反射 */
--text-secondary: #8B879E;    /* 描述、次要內容 */
--text-muted: #504D60;        /* placeholder、disabled、時間戳 */
--text-on-accent: #FFFFFF;    /* Accent 色背景上的文字 */

/* Semantic Status */
--success: #22C55E;
--success-dim: rgba(34, 197, 94, 0.15);
--success-glow: rgba(34, 197, 94, 0.4);
--warning: #EAB308;
--warning-dim: rgba(234, 179, 8, 0.15);
--warning-glow: rgba(234, 179, 8, 0.4);
--error: #EF4444;
--error-dim: rgba(239, 68, 68, 0.15);
--error-glow: rgba(239, 68, 68, 0.4);
--info: #3B82F6;
--info-dim: rgba(59, 130, 246, 0.15);

/* Borders — 絲線般的精密邊框 */
--border-subtle: rgba(255, 255, 255, 0.06);
--border-standard: rgba(255, 255, 255, 0.08);
--border-emphasis: rgba(255, 255, 255, 0.12);
--border-accent: rgba(99, 102, 241, 0.25);

/* Shadows & Depth */
--shadow-card: 0 2px 8px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.05);
--shadow-elevated: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 1px rgba(255, 255, 255, 0.06);
--shadow-glow-indigo: 0 0 20px rgba(99, 102, 241, 0.15), 0 0 60px rgba(99, 102, 241, 0.05);
--shadow-glow-silk: 0 0 20px rgba(167, 139, 250, 0.15);

/* Loom Gradient — 織物漸層 */
--gradient-loom: linear-gradient(135deg, #6366F1, #A78BFA);
--gradient-silk: linear-gradient(135deg, #A78BFA, #C4B5FD);
--gradient-dye: linear-gradient(135deg, #6366F1, #818CF8);
```

### Light Mode Strategy
```css
[data-theme="light"] {
  --bg-deep: #F3F2F7;
  --bg-surface-1: #FFFFFF;
  --bg-surface-2: #F8F7FB;
  --bg-surface-3: #EEEDF3;
  --accent-primary: #4F46E5;    /* 深靛藍，白底上確保對比度 */
  --accent-secondary: #7C3AED;
  --text-primary: #1B1A24;
  --text-secondary: #5A576E;
  --text-muted: #9C99AD;
  --text-on-accent: #FFFFFF;
  --border-subtle: rgba(0, 0, 0, 0.06);
  --border-standard: rgba(0, 0, 0, 0.1);
  --border-emphasis: rgba(0, 0, 0, 0.15);
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.05);
  --shadow-elevated: 0 4px 16px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.06);
}
```

### Status Badge Pattern
狀態指示使用 glow dot + 有色背景 — 織機信號燈隱喻：
```css
.badge-status {
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.badge-status::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.badge-weaving {
  background: var(--accent-primary-dim);
  color: var(--accent-primary);
}
.badge-weaving::before {
  background: var(--accent-primary);
  box-shadow: 0 0 6px var(--accent-primary-glow);
  animation: pulse 2s ease-in-out infinite;
}
.badge-completed {
  background: var(--success-dim);
  color: var(--success);
}
.badge-completed::before {
  background: var(--success);
  box-shadow: 0 0 6px var(--success-glow);
}
.badge-defect {
  background: var(--error-dim);
  color: var(--error);
}
.badge-defect::before {
  background: var(--error);
  box-shadow: 0 0 6px var(--error-glow);
  animation: pulse 2s ease-in-out infinite;
}
```

## Spacing
- **Base unit:** 8px
- **Density:** Compact-first（染整車間操作員需要同時看到多台織機狀態和訂單進度）
- **Scale:**

| Token | Value | Usage |
|-------|-------|-------|
| 2xs | 2px | 微調、icon padding |
| xs | 4px | 緊湊行內間距 |
| sm | 8px | 基本間距、元件內 padding、列間距 |
| md | 16px | 卡片 padding、區塊間距 |
| lg | 24px | 區塊內間距 |
| xl | 32px | 大區塊間距 |
| 2xl | 48px | 頁面級間距 |
| 3xl | 64px | Hero 間距 |

## Layout
- **Approach:** Grid-disciplined — 可預測的對齊、高資訊密度
- **Grid:** 12-column, 16px gutters
- **Max content width:** 1400px（ERP 儀表板需要空間放資料）
- **Sidebar:** 220px default, collapsible to 64px (icon-only)
- **Header:** 56px fixed height
- **Breakpoints:**
  - Mobile: < 640px (single column, sidebar hidden)
  - Tablet: 640-1024px (collapsed sidebar)
  - Desktop: 1024-1440px (full layout)
  - Wide: > 1440px (max-width contained)

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| sm | 4px | Inputs、inline badge、小元素 |
| md | 8px | 按鈕、卡片、dropdown — 標準容器 |
| lg | 12px | Modal、feature cards、面板 |
| xl | 16px | 大型容器、dashboard sections |
| pill | 9999px | Status badges、filter chips |

## Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Level 0 | No shadow, `--bg-deep` | 頁面背景 |
| Level 1 | `--border-subtle` only | Sidebar、inline 元素 |
| Level 2 (Card) | `--shadow-card` + `--border-subtle` | 資料表格、內容卡片 |
| Level 3 (Elevated) | `--shadow-elevated` | Modal、Popover、Command Palette |
| Glow | `--shadow-glow-indigo` 或 per-color glow | Active 狀態、status indicators、hover accents |

### Loom Surface Treatment
卡片和面板使用微妙的織物質感：
```css
.loom-card {
  background: var(--bg-surface-1);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  box-shadow: var(--shadow-card);
  position: relative;
  overflow: hidden;
}
.loom-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-loom);
  opacity: 0.6;
}
.loom-card:hover {
  border-color: var(--border-accent);
  box-shadow: var(--shadow-card), 0 0 20px rgba(99, 102, 241, 0.08);
  transform: translateY(-1px);
}
```

## Motion
- **Approach:** Intentional — 有目的的動畫，傳達織機和訂單狀態而非裝飾
- **Easing:** enter(`ease-out`) exit(`ease-in`) move(`ease-in-out`)
- **Duration:** micro(100ms) short(150ms) medium(250ms) long(400ms)

### Signature Animations
- **織機脈衝:** 織造中的機台狀態 glow dot 以 2s 循環脈動 — 像織機的穿梭指示燈
- **Hover 上浮:** `translateY(-1px)` + shadow 加深 + border 亮靛藍 — 卡片浮起
- **Loom glow on hover:** interactive 元素 hover 時從 dim 到 glow
- **異常警報:** 品質異常狀態 glow dot 以 1.5s 循環脈動 — 更快速的閃爍提示緊急

```css
@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 6px var(--accent-primary-glow); }
  50% { opacity: 0.5; box-shadow: 0 0 12px var(--accent-primary-glow); }
}
@keyframes alarm-pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--error-glow); }
  50% { opacity: 0.4; box-shadow: 0 0 16px var(--error-glow); }
}
```

### Motion Rules
1. 動畫只用在傳達狀態變化的地方
2. Pulse 動畫出現在「織造中」和「異常」狀態（分別用 2s 和 1.5s 循環區分）
3. `prefers-reduced-motion` 關閉所有動畫
4. 轉場不超過 400ms

## Component Patterns

### Buttons

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| Primary | `--accent-primary` | `--text-on-accent` | none | indigo glow + slight lift |
| Secondary | transparent | `--accent-primary` | `--border-standard` | border → indigo, bg → `--accent-primary-dim` |
| Ghost | transparent | `--text-secondary` | `--border-standard` | bg → `--bg-surface-3` |
| Danger | `--error-dim` | `--error` | `rgba(239,68,68,0.2)` | error glow |

### Data Table
- Header: `--bg-surface-2`, Geist Mono 10px uppercase labels
- Rows: transparent, `--border-subtle` bottom border
- Hover: `--bg-surface-2` background
- 批號/色號: Geist Mono, `--accent-primary` — 可點擊查看製程進度
- 紗支數/碼重/克重: Geist Mono, `tabular-nums`, `--text-primary`
- Status cells: pill badge with glow

### Navigation Sidebar
- Background: `--bg-surface-1`
- Active item: `--accent-primary-dim` bg + `--accent-primary` text + 3px left border with indigo glow
- Hover: `--bg-surface-2`
- Section labels: `--font-mono` 10px uppercase `--text-muted`
- Badge counts: `--error-dim` bg, `--error` text, pill shape

### KPI Cards
- Top 2px loom gradient bar（`--gradient-loom`）
- 大數字: Satoshi 28px 700 weight
- 趨勢箭頭: success/error 色
- Hover: border → indigo glow, slight lift

### Loom Status Panel
- 織機網格佈局，每台織機一張卡片
- 狀態色: 織造中(`--accent-primary`)、閒置(`--accent-secondary`)、異常(`--error`)、維護中(`--warning`)
- 即時數據: 車速(rpm)、緯密(picks/cm)、經紗張力(cN)、完成進度(%)
- 異常織機卡片附加 `alarm-pulse` 動畫

## Do's and Don'ts

### Do
- 用 `--bg-deep` (#0C0B11) 作為頁面背景 — 染缸黑的微紫色調是紡織車間基底
- 批號、色號、紗支數、碼重、克重一律用 Geist Mono + `tabular-nums`
- `--accent-primary` (#6366F1) 省著用 — 它是靛藍染料，出現時必須有意義
- 用 2px 頂部漸層色條（`--gradient-loom`）標記卡片 — 像絲綢上的靛藍光澤
- Satoshi 在 Display 尺寸使用負字距（-0.8px ~ -1.2px）— 高端紡織品牌銘牌般的精密感
- 品質異常用 `alarm-pulse` 動畫（1.5s 循環）— 比一般 pulse 更快，表示緊急
- 把真實的批號（DYE-2024-0823）、色號（PMS-2745C）和紗支數（40s/2）放進 mockup

### Don't
- 不要用純黑 `#000000` 當背景 — `--bg-deep` 的微紫暗調是必要的
- 不要在製程數據上用比例字型 — 數字必須等寬對齊
- 不要把靛藍灑滿全場 — 它是珍貴染料，出現時必須像絲綢上的靛藍光澤
- 不要用冷鋼灰色階 — 紡織業用暖紫灰（紫灰調），不是金屬加工的冷鋼灰
- 不要對非織造中/非異常狀態使用 pulse 動畫 — 閃爍 = 織機運作中或需要注意
- 不要在 body text 加負字距 — 只有 Satoshi Display 尺寸（22px+）才壓縮
- 不要讓設計像時尚品牌官網 — 這是精密紡織製造企業工具，要 Stripe 的數據精緻感不要 Gucci 的奢華

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-10 | 初始設計系統建立 | 基於 Linear + Stripe + Pinterest + Figma + Revolut 五個參考設計，為紡織業 ERP 定制 |
| 2026-04-10 | Indigo (#6366F1) 主色 | 區別於電子業(cyan)、物流業(amber)、食品廠(green)、金屬加工(orange)。靛藍是最古老紡織染料的隱喻 |
| 2026-04-10 | 淡紫絲綢 (#A78BFA) 作為 secondary | 絲綢光澤的淡紫色，搭配靛藍形成同色系的深淺對比 |
| 2026-04-10 | Satoshi + Instrument Sans + Geist Mono 字型組合 | Satoshi 有柔和圓潤的幾何感適合紡織，Instrument Sans body 優雅精緻，Geist Mono 延續系列數據字型 |
| 2026-04-10 | 暖紫灰背景色階 | 紡織業用暖紫灰（#0C0B11），區別於金屬加工的冷鋼灰和電子業的海軍黑 |
| 2026-04-10 | alarm-pulse 快速閃爍 (1.5s) | 品質異常比一般織造狀態更緊急，用更快的 pulse 頻率區分 |
| 2026-04-10 | 2px 頂部 loom gradient bar | 靛藍到淡紫的漸層像絲綢光澤，比 glassmorphism 更符合紡織的工藝質感 |
