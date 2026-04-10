# Design System — PharmaClear ERP

## Product Context
- **What this is:** Dark-mode-first ERP 系統，用於製藥製造管理 — GMP 管理、批次追蹤、品質控管、倉儲管理、效期監控
- **Who it's for:** 廠長、品保主管、QC 人員、生產主管、倉管人員
- **Space/industry:** 製藥製造業（原料藥、固體劑型、液體劑型、包裝、品質檢驗）
- **Project type:** 資料密集型企業 Web App（儀表板 + 批次管理 + GMP 製程監控 + 品質報表）

## Aesthetic Direction
- **Direction:** Lab Precision — 實驗室精密美學，不是辦公室軟體
- **Decoration level:** Minimal — 幾乎零裝飾，讓 teal 的每次出現都像無菌指示燈亮起
- **Mood:** 打開這個 ERP 像走進 GMP 潔淨室。暗底上極度克制的色彩，teal accent 像無菌指示燈般稀少而精確。批號等寬排列，效期倒數清晰可見。不是科幻片，不是企業灰 — 是實驗室級的潔淨、精確、零容錯的工業控制台。
- **Reference inspirations:** IBM（企業數據嚴謹、碳色系統）、Apple（潔淨留白、極致簡約）、Stripe（數據精緻排版、tabular numbers）、Linear（暗色精密 UI、層次邊框）、Superhuman（奢華極簡、戲劇性字重對比）

## Typography

### Font Stack
- **Display/Hero:** Cabinet Grotesk — 幾何精密但圓角柔和。有實驗室器材銘牌的工業感，但不冰冷。比 General Sans 更有特色，比 Satoshi 更嚴肅。
- **Body/UI:** Source Sans 3 — IBM 企業血統，極致可讀性。GMP 文件級的清晰度，CJK 搭配良好。製藥法規文件的最佳閱讀體驗。
- **Data/Tables:** Geist Mono — 批號、效期、含量、pH 值。tabular-nums 精確對齊，維持系列設計一致性。
- **Code:** Geist Mono
- **Loading:**
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Cabinet+Grotesk:wght@400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  ```

### CSS Variables
```css
--font-display: 'Cabinet Grotesk', system-ui, -apple-system, sans-serif;
--font-body: 'Source Sans 3', system-ui, -apple-system, sans-serif;
--font-mono: 'Geist Mono', ui-monospace, 'SF Mono', 'Menlo', monospace;
```

### Scale

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display XL | Cabinet Grotesk | 48px | 700 | 1.05 | -1.2px | 頁面主標題，最大衝擊力 |
| Display | Cabinet Grotesk | 32px | 600 | 1.1 | -0.8px | 區塊標題 |
| Heading | Cabinet Grotesk | 22px | 600 | 1.2 | -0.3px | 卡片標題、子區塊 |
| Heading SM | Cabinet Grotesk | 18px | 600 | 1.3 | -0.2px | 小標題、Widget 標題 |
| Body LG | Source Sans 3 | 16px | 400 | 1.5 | normal | 功能描述 |
| Body | Source Sans 3 | 14px | 400 | 1.5 | normal | 標準內文 |
| Body SM | Source Sans 3 | 13px | 400 | 1.5 | normal | 表格內文、緊湊內文 |
| Body Emphasis | Source Sans 3 | 14px | 600 | 1.5 | normal | 標籤、導航 |
| Caption | Source Sans 3 | 12px | 500 | 1.4 | normal | 時間戳、備註 |
| Data | Geist Mono | 13px | 500 | 1.4 | normal | 批號、效期、含量、pH 值。`font-variant-numeric: tabular-nums` |
| Data SM | Geist Mono | 12px | 400 | 1.4 | normal | 小數據、圖表標籤 |
| Label | Geist Mono | 10px | 500 | 1.4 | 1.5px | 表頭、區塊標籤。UPPERCASE |
| Micro | Geist Mono | 10px | 500 | 1.4 | normal | Badges、tiny labels |

### Principles
- **三字型系統：** Cabinet Grotesk 負責標題的精密工業感，Source Sans 3 負責 UI 文件級可讀性，Geist Mono 負責數據精準度
- **負字距是身份：** Display 尺寸使用 -0.8px ~ -1.2px 字距，標題看起來像實驗室器材的銘牌
- **判斷標準：** 如果是「被量測的精確資料」→ Geist Mono。如果是「被閱讀的內容」→ Source Sans 3。如果是「被掃視的標題」→ Cabinet Grotesk
- **Cabinet Grotesk 的精密感：** 幾何結構帶有實驗室器材的精確度，圓角處理讓它不會太冰冷，適合製藥的嚴謹但人性化

## Color

### Approach
Clinically restrained — 暗底畫布上，teal 主色像潔淨室的無菌指示燈，極度稀少而精確。製藥業的零容錯精神映射到色彩使用上：每一個顏色出現都必須有明確的語義目的。

### CSS Custom Properties
```css
/* Background Surfaces — 冷藍黑色階（潔淨室的冷白燈光轉譯到暗色模式）*/
--bg-deep: #090B10;           /* 頁面背景 — 潔淨室暗底，冷藍黑調 */
--bg-surface-1: #0F1117;      /* Sidebar、面板、次級容器 */
--bg-surface-2: #171A22;      /* 卡片、Modal、Dropdown */
--bg-surface-3: #1F222C;      /* Hover 狀態、Active 元素 */
--bg-surface-4: #272B36;      /* 選取列、Pressed 狀態 */

/* Accent — Clinical Teal（臨床 Teal）*/
--accent-primary: #14B8A6;    /* 臨床 Teal — 無菌指示燈、製藥包裝、可信賴的潔淨 */
--accent-primary-dim: rgba(20, 184, 166, 0.15);
--accent-primary-glow: rgba(20, 184, 166, 0.4);
--accent-secondary: #5EEAD4;  /* 淡 teal — 輔助光澤、次要動作、hover 狀態 */
--accent-secondary-dim: rgba(94, 234, 212, 0.15);

/* Text */
--text-primary: #E4E8EF;      /* 近白，偏冷 — 潔淨室白燈下的冷光 */
--text-secondary: #848B9B;    /* 描述、次要內容 */
--text-muted: #4A5060;        /* placeholder、disabled、時間戳 */
--text-on-accent: #090B10;    /* Accent 色背景上的文字 */

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

/* Borders — 潔淨室的精密邊框 */
--border-subtle: rgba(255, 255, 255, 0.06);
--border-standard: rgba(255, 255, 255, 0.08);
--border-emphasis: rgba(255, 255, 255, 0.12);
--border-accent: rgba(20, 184, 166, 0.2);

/* Shadows & Depth */
--shadow-card: 0 2px 8px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.05);
--shadow-elevated: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 1px rgba(255, 255, 255, 0.06);
--shadow-glow-teal: 0 0 20px rgba(20, 184, 166, 0.15), 0 0 60px rgba(20, 184, 166, 0.05);
--shadow-glow-clean: 0 0 20px rgba(94, 234, 212, 0.15);

/* Lab Gradient — 潔淨漸層 */
--gradient-lab: linear-gradient(135deg, #14B8A6, #5EEAD4);
--gradient-clean: linear-gradient(135deg, #5EEAD4, #99F6E4);
--gradient-clinical: linear-gradient(135deg, #14B8A6, #2DD4BF);
```

### Light Mode Strategy
```css
[data-theme="light"] {
  --bg-deep: #F2F4F7;
  --bg-surface-1: #FFFFFF;
  --bg-surface-2: #F8F9FB;
  --bg-surface-3: #EDEEF2;
  --bg-surface-4: #E4E5EB;
  --accent-primary: #0D9488;    /* 深 teal，白底上確保對比度 */
  --accent-secondary: #0F766E;
  --text-primary: #171A22;
  --text-secondary: #555D6E;
  --text-muted: #9CA3AF;
  --text-on-accent: #FFFFFF;
  --border-subtle: rgba(0, 0, 0, 0.06);
  --border-standard: rgba(0, 0, 0, 0.1);
  --border-emphasis: rgba(0, 0, 0, 0.15);
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.05);
  --shadow-elevated: 0 4px 16px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.06);
}
```

### Status Badge Pattern
狀態指示使用 glow dot + 有色背景 — 潔淨室信號燈隱喻：
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
.badge-processing {
  background: var(--accent-primary-dim);
  color: var(--accent-primary);
}
.badge-processing::before {
  background: var(--accent-primary);
  box-shadow: 0 0 6px var(--accent-primary-glow);
  animation: pulse 2s ease-in-out infinite;
}
.badge-released {
  background: var(--success-dim);
  color: var(--success);
}
.badge-released::before {
  background: var(--success);
  box-shadow: 0 0 6px var(--success-glow);
}
.badge-deviation {
  background: var(--error-dim);
  color: var(--error);
}
.badge-deviation::before {
  background: var(--error);
  box-shadow: 0 0 6px var(--error-glow);
  animation: alarm-pulse 1.5s ease-in-out infinite;
}
```

## Spacing
- **Base unit:** 8px
- **Density:** Compact-first（QC 人員需要同時看到多批次狀態和檢驗數據）
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
| sm | 4px | Inputs、inline badge、小元素 — 實驗室器材的精密邊角 |
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
| Glow | `--shadow-glow-teal` 或 per-color glow | Active 狀態、status indicators、hover accents |

### Lab Surface Treatment
卡片和面板使用潔淨室的極簡質感：
```css
.lab-card {
  background: var(--bg-surface-1);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  box-shadow: var(--shadow-card);
  position: relative;
  overflow: hidden;
}
.lab-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-lab);
  opacity: 0.6;
}
.lab-card:hover {
  border-color: var(--border-accent);
  box-shadow: var(--shadow-card), 0 0 20px rgba(20, 184, 166, 0.08);
  transform: translateY(-1px);
}
```

## Motion
- **Approach:** Minimal-functional — 極度克制，只有狀態變化才觸發動畫。潔淨室不需要花俏的動效。
- **Easing:** enter(`ease-out`) exit(`ease-in`) move(`ease-in-out`)
- **Duration:** micro(100ms) short(150ms) medium(250ms) long(400ms)

### Signature Animations
- **製程脈衝:** 生產中的批次狀態 glow dot 以 2s 循環脈動 — 像潔淨室的運行指示燈
- **Hover 上浮:** `translateY(-1px)` + shadow 加深 + border 亮 teal — 卡片浮起
- **Lab glow on hover:** interactive 元素 hover 時從 dim 到 glow
- **偏差警報:** 品質偏差狀態 glow dot 以 1.5s 循環脈動 — 更快速的閃爍提示緊急

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
2. Pulse 動畫出現在「生產中」和「偏差」狀態（分別用 2s 和 1.5s 循環區分）
3. `prefers-reduced-motion` 關閉所有動畫
4. 轉場不超過 400ms

## Component Patterns

### Buttons

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| Primary | `--accent-primary` | `--text-on-accent` | none | teal glow + slight lift |
| Secondary | transparent | `--accent-primary` | `--border-standard` | border → teal, bg → `--accent-primary-dim` |
| Ghost | transparent | `--text-secondary` | `--border-standard` | bg → `--bg-surface-3` |
| Danger | `--error-dim` | `--error` | `rgba(239,68,68,0.2)` | error glow |

### Data Table
- Header: `--bg-surface-2`, Geist Mono 10px uppercase labels
- Rows: transparent, `--border-subtle` bottom border
- Hover: `--bg-surface-2` background
- 批號/產品代碼: Geist Mono, `--accent-primary` — 可點擊查看製程記錄
- 含量/pH 值/效期: Geist Mono, `tabular-nums`, `--text-primary`
- Status cells: pill badge with glow

### Navigation Sidebar
- Background: `--bg-surface-1`
- Active item: `--accent-primary-dim` bg + `--accent-primary` text + 3px left border with teal glow
- Hover: `--bg-surface-2`
- Section labels: `--font-mono` 10px uppercase `--text-muted`
- Badge counts: `--error-dim` bg, `--error` text, pill shape

### KPI Cards
- Top 2px lab gradient bar（`--gradient-lab`）
- 大數字: Cabinet Grotesk 28px 700 weight
- 趨勢箭頭: success/error 色
- Hover: border → teal glow, slight lift

### Batch Status Panel
- 批次網格佈局，每個批次一張卡片
- 狀態色: 生產中(`--accent-primary`)、待放行(`--accent-secondary`)、偏差(`--error`)、隔離中(`--warning`)
- 即時數據: 產出量(kg)、收率(%)、含量(mg/tab)、效期(yyyy-mm-dd)
- 偏差批次卡片附加 `alarm-pulse` 動畫

## Do's and Don'ts

### Do
- 用 `--bg-deep` (#090B10) 作為頁面背景 — 潔淨室的冷藍黑調是製藥車間基底
- 批號、產品代碼、含量、pH 值、效期一律用 Geist Mono + `tabular-nums`
- `--accent-primary` (#14B8A6) 省著用 — 它是無菌指示燈，出現時必須有意義
- 用 2px 頂部漸層色條（`--gradient-lab`）標記卡片 — 像潔淨室的指示燈條
- Cabinet Grotesk 在 Display 尺寸使用負字距（-0.8px ~ -1.2px）— 實驗室器材銘牌般的精密感
- 品質偏差用 `alarm-pulse` 動畫（1.5s 循環）— 比一般 pulse 更快，表示緊急
- 把真實的批號（PB-2024-0823）、產品代碼（ASP-500-TAB）和含量（500.2 mg/tab）放進 mockup

### Don't
- 不要用純黑 `#000000` 當背景 — `--bg-deep` 的冷藍黑色調是必要的
- 不要在製程數據上用比例字型 — 數字必須等寬對齊
- 不要把 teal 灑滿全場 — 它是無菌指示燈，出現時必須像潔淨室指示燈亮起的瞬間
- 不要用暖灰色階 — 製藥業用冷藍灰（潔淨室白燈的冷調），不是食品廠的暖灰(Stone)
- 不要對非生產中/非偏差狀態使用 pulse 動畫 — 閃爍 = 製程運行中或需要注意
- 不要在 body text 加負字距 — 只有 Cabinet Grotesk Display 尺寸（22px+）才壓縮
- 不要讓設計像醫療 App — 這是 GMP 製造企業工具，要 IBM 的企業嚴謹感不要 HealthKit 的消費者友善

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-10 | 初始設計系統建立 | 基於 IBM + Apple + Stripe + Linear + Superhuman 五個參考設計，為製藥業 ERP 定制 |
| 2026-04-10 | Clinical Teal (#14B8A6) 主色 | 區別於電子業(cyan)、物流業(amber)、食品廠(green)、金屬加工(orange)、紡織業(indigo)。無菌潔淨室的色調隱喻 |
| 2026-04-10 | 淡 teal (#5EEAD4) 作為 secondary | 同色系的亮度對比，潔淨室白燈的輝映感 |
| 2026-04-10 | Cabinet Grotesk + Source Sans 3 + Geist Mono 字型組合 | Cabinet Grotesk 有實驗室器材銘牌感，Source Sans 3 的 IBM 血統適合 GMP 文件，Geist Mono 延續系列數據字型 |
| 2026-04-10 | 冷藍黑背景色階 | 製藥業用冷藍黑（#090B10），潔淨室冷白燈的暗色轉譯，區別於紡織業的暖紫灰和金屬加工的冷鋼灰 |
| 2026-04-10 | alarm-pulse 快速閃爍 (1.5s) | 品質偏差比一般生產狀態更緊急，用更快的 pulse 頻率區分 |
| 2026-04-10 | Minimal decoration level | 製藥業的 GMP 精神 — 零容錯、零多餘。比其他產業更克制的裝飾，讓 teal 的每次出現都有最大視覺重量 |
