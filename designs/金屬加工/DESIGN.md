# Design System — MetalForge ERP

## Product Context
- **What this is:** Dark-mode-first ERP 系統，用於金屬加工製造管理 — 工單排程、CNC 機台監控、刀具壽命管理、品質檢測、材料庫存
- **Who it's for:** 廠長、製程工程師、CNC 操作員、品管人員、採購主管
- **Space/industry:** 金屬加工製造業（CNC 切削、沖壓、鑄造、焊接、表面處理）
- **Project type:** 資料密集型企業 Web App（儀表板 + 工單管理 + 機台即時監控 + 品質檢測報表）

## Aesthetic Direction
- **Direction:** Forge Command — 鍛造指揮台美學，不是辦公室軟體
- **Decoration level:** Intentional — 金屬切削紋理漸層 + CNC 精密邊框 + 熔鑄發光效果
- **Mood:** 打開這個 ERP 像走進深夜的精密加工車間。暗鋼色背景上，鍛造橙標記著每一道工序的進度。工件編號等寬排列，機台狀態指示燈脈衝閃爍。不是科幻片，不是企業灰 — 是鍛造級的精密、現代、有溫度的工業控制台。
- **Reference inspirations:** BMW（精密德國工程美學、深色高端表面）、SpaceX（航太極簡、黑白對比）、NVIDIA（技術力量感、綠黑能量改為橙黑能量）、Warp（深色 IDE 精密介面、block-based 佈局）

## Typography

### Font Stack
- **Display/Hero:** Space Grotesk — 幾何精密、工程圖紙感。比 Inter 更有機械衝擊力，比 Satoshi 更精密冷靜。
- **Body/UI:** Inter — 極致可讀性、中性精密。Google Fonts 最佳工程感 body 字型，CJK 搭配良好。
- **Data/Tables:** Geist Mono — 工件編號、刀具壽命、進給率、公差值。tabular-nums 精確對齊，維持系列設計一致性。
- **Code:** Geist Mono
- **Loading:**
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  ```

### CSS Variables
```css
--font-display: 'Space Grotesk', system-ui, -apple-system, sans-serif;
--font-body: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'Geist Mono', ui-monospace, 'SF Mono', 'Menlo', monospace;
```

### Scale

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display XL | Space Grotesk | 48px | 700 | 1.05 | -1.5px | 頁面主標題，最大衝擊力 |
| Display | Space Grotesk | 32px | 600 | 1.1 | -1.0px | 區塊標題 |
| Heading | Space Grotesk | 22px | 600 | 1.2 | -0.5px | 卡片標題、子區塊 |
| Heading SM | Space Grotesk | 18px | 600 | 1.3 | -0.3px | 小標題、Widget 標題 |
| Body LG | Inter | 16px | 400 | 1.5 | normal | 功能描述 |
| Body | Inter | 14px | 400 | 1.5 | normal | 標準內文 |
| Body SM | Inter | 13px | 400 | 1.5 | normal | 表格內文、緊湊內文 |
| Body Emphasis | Inter | 14px | 600 | 1.5 | normal | 標籤、導航 |
| Caption | Inter | 12px | 500 | 1.4 | normal | 時間戳、備註 |
| Data | Geist Mono | 13px | 500 | 1.4 | normal | 工件編號、公差值、進給率、刀具壽命。`font-variant-numeric: tabular-nums` |
| Data SM | Geist Mono | 12px | 400 | 1.4 | normal | 小數據、圖表標籤 |
| Label | Geist Mono | 10px | 500 | 1.4 | 1.5px | 表頭、區塊標籤。UPPERCASE |
| Micro | Geist Mono | 10px | 500 | 1.4 | normal | Badges、tiny labels |

### Principles
- **三字型系統：** Space Grotesk 負責標題精密衝擊力，Inter 負責 UI 極致可讀性，Geist Mono 負責數據精準度
- **負字距是身份：** Display 尺寸使用 -1.0px ~ -1.5px 字距，標題看起來像 CNC 控制面板上的銘牌
- **判斷標準：** 如果是「被量測的精確資料」→ Geist Mono。如果是「被閱讀的內容」→ Inter。如果是「被掃視的標題」→ Space Grotesk
- **Space Grotesk 的精密感：** 幾何結構源自 Space Mono，帶有工程圖紙的精確度，但作為 sans-serif 更適合標題衝擊

## Color

### Approach
Forge-driven — 暗鋼色畫布上，鍛造橙主色像金屬切削時的火花，標記關鍵加工進度。色彩稀少而有力 — 當 forge orange 亮起，它像白熱化的鋼材般命令注意力。

### CSS Custom Properties
```css
/* Background Surfaces — 暗鋼色階 */
--bg-deep: #0B0C10;           /* 頁面背景 — 碳黑鋼，冷硬的加工車間基調 */
--bg-surface-1: #12141A;      /* Sidebar、面板、次級容器 */
--bg-surface-2: #1A1D26;      /* 卡片、Modal、Dropdown */
--bg-surface-3: #232733;      /* Hover 狀態、Active 元素 */
--bg-surface-4: #2C3140;      /* 選取列、Pressed 狀態 */

/* Accent — Forge Orange（鍛造橙）*/
--accent-primary: #FF6B2C;    /* 鍛造橙 — 白熱金屬、切削火花、鑄造熔液 */
--accent-primary-dim: rgba(255, 107, 44, 0.15);
--accent-primary-glow: rgba(255, 107, 44, 0.4);
--accent-secondary: #64748B;  /* 冷鋼灰 — 機台表面、輔助資訊、次要動作 */
--accent-secondary-dim: rgba(100, 116, 139, 0.15);

/* Text */
--text-primary: #E8ECF4;      /* 近白，偏冷 — 金屬表面的冷光反射 */
--text-secondary: #8891A0;    /* 描述、次要內容 */
--text-muted: #4A5060;        /* placeholder、disabled、時間戳 */
--text-on-accent: #0B0C10;    /* Accent 色背景上的文字 */

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

/* Borders — CNC 精密邊框 */
--border-subtle: rgba(255, 255, 255, 0.06);
--border-standard: rgba(255, 255, 255, 0.08);
--border-emphasis: rgba(255, 255, 255, 0.12);
--border-accent: rgba(255, 107, 44, 0.2);

/* Shadows & Depth */
--shadow-card: 0 2px 8px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.05);
--shadow-elevated: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 1px rgba(255, 255, 255, 0.06);
--shadow-glow-forge: 0 0 20px rgba(255, 107, 44, 0.15), 0 0 60px rgba(255, 107, 44, 0.05);
--shadow-glow-steel: 0 0 20px rgba(100, 116, 139, 0.15);

/* Forge Gradient — 鍛造漸層 */
--gradient-forge: linear-gradient(135deg, #FF6B2C, #FF8F5C);
--gradient-steel: linear-gradient(135deg, #64748B, #94A3B8);
--gradient-heat: linear-gradient(135deg, #FF6B2C, #EAB308);
```

### Light Mode Strategy
```css
[data-theme="light"] {
  --bg-deep: #F1F2F6;
  --bg-surface-1: #FFFFFF;
  --bg-surface-2: #F7F8FA;
  --bg-surface-3: #EDEFF3;
  --accent-primary: #E05A1B;    /* 深橙，白底上確保對比度 */
  --accent-secondary: #475569;
  --text-primary: #1A1D26;
  --text-secondary: #5A6270;
  --text-muted: #9CA3AD;
  --text-on-accent: #FFFFFF;
  --border-subtle: rgba(0, 0, 0, 0.06);
  --border-standard: rgba(0, 0, 0, 0.1);
  --border-emphasis: rgba(0, 0, 0, 0.15);
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.05);
  --shadow-elevated: 0 4px 16px rgba(0, 0, 0, 0.1), 0 0 1px rgba(0, 0, 0, 0.06);
}
```

### Status Badge Pattern
狀態指示使用 glow dot + 有色背景 — 機台信號燈隱喻：
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
.badge-running {
  background: var(--accent-primary-dim);
  color: var(--accent-primary);
}
.badge-running::before {
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
.badge-alarm {
  background: var(--error-dim);
  color: var(--error);
}
.badge-alarm::before {
  background: var(--error);
  box-shadow: 0 0 6px var(--error-glow);
  animation: pulse 2s ease-in-out infinite;
}
```

## Spacing
- **Base unit:** 8px
- **Density:** Compact-first（加工車間操作員需要同時看到多台機台狀態和工單進度）
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
| sm | 4px | Inputs、inline badge、小元素 — CNC 精密感 |
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
| Glow | `--shadow-glow-forge` 或 per-color glow | Active 狀態、status indicators、hover accents |

### Metal Surface Treatment
卡片和面板使用微妙的金屬紋理感：
```css
.metal-card {
  background: var(--bg-surface-1);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  box-shadow: var(--shadow-card);
  position: relative;
  overflow: hidden;
}
.metal-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gradient-forge);
  opacity: 0.6;
}
.metal-card:hover {
  border-color: var(--border-accent);
  box-shadow: var(--shadow-card), 0 0 20px rgba(255, 107, 44, 0.08);
  transform: translateY(-1px);
}
```

## Motion
- **Approach:** Intentional — 有目的的動畫，傳達機台和工單狀態而非裝飾
- **Easing:** enter(`ease-out`) exit(`ease-in`) move(`ease-in-out`)
- **Duration:** micro(100ms) short(150ms) medium(250ms) long(400ms)

### Signature Animations
- **機台脈衝:** 加工中的機台狀態 glow dot 以 2s 循環脈動 — 像 CNC 的運轉指示燈
- **Hover 上浮:** `translateY(-1px)` + shadow 加深 + border 亮橙 — 卡片浮起
- **Forge glow on hover:** interactive 元素 hover 時從 dim 到 glow
- **異常警報:** 機台異常狀態 glow dot 以 1.5s 循環脈動 — 更快速的閃爍提示緊急

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
2. Pulse 動畫出現在「加工中」和「異常」狀態（分別用 2s 和 1.5s 循環區分）
3. `prefers-reduced-motion` 關閉所有動畫
4. 轉場不超過 400ms

## Component Patterns

### Buttons

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| Primary | `--accent-primary` | `--text-on-accent` | none | forge glow + slight lift |
| Secondary | transparent | `--accent-primary` | `--border-standard` | border → forge orange, bg → `--accent-primary-dim` |
| Ghost | transparent | `--text-secondary` | `--border-standard` | bg → `--bg-surface-3` |
| Danger | `--error-dim` | `--error` | `rgba(239,68,68,0.2)` | error glow |

### Data Table
- Header: `--bg-surface-2`, Geist Mono 10px uppercase labels
- Rows: transparent, `--border-subtle` bottom border
- Hover: `--bg-surface-2` background
- 工單號/工件編號: Geist Mono, `--accent-primary` — 可點擊查看加工進度
- 公差值/重量/進給率: Geist Mono, `tabular-nums`, `--text-primary`
- Status cells: pill badge with glow

### Navigation Sidebar
- Background: `--bg-surface-1`
- Active item: `--accent-primary-dim` bg + `--accent-primary` text + 3px left border with forge glow
- Hover: `--bg-surface-2`
- Section labels: `--font-mono` 10px uppercase `--text-muted`
- Badge counts: `--error-dim` bg, `--error` text, pill shape

### KPI Cards
- Top 2px forge gradient bar（`--gradient-forge`）
- 大數字: Space Grotesk 28px 700 weight
- 趨勢箭頭: success/error 色
- Hover: border → forge orange glow, slight lift

### Machine Status Panel
- 機台網格佈局，每台機台一張卡片
- 狀態色: 加工中(`--accent-primary`)、閒置(`--accent-secondary`)、異常(`--error`)、維護中(`--warning`)
- 即時數據: 主軸轉速(RPM)、進給率(mm/min)、刀具壽命(%)、加工進度(%)
- 異常機台卡片附加 `alarm-pulse` 動畫

## Do's and Don'ts

### Do
- 用 `--bg-deep` (#0B0C10) 作為頁面背景 — 碳黑鋼的色調是加工車間基底
- 工單號、工件編號、公差值、進給率、主軸轉速一律用 Geist Mono + `tabular-nums`
- `--accent-primary` (#FF6B2C) 省著用 — 它是鍛造火花，出現時必須有意義
- 用 2px 頂部漸層色條（`--gradient-forge`）標記卡片 — 像金屬切削的火花飛濺
- Space Grotesk 在 Display 尺寸使用負字距（-1.0px ~ -1.5px）— CNC 銘牌般的精密感
- 機台異常用 `alarm-pulse` 動畫（1.5s 循環）— 比一般 pulse 更快，表示緊急
- 把真實的工件編號（WP-A7075-0823、CNC-M5-008）和公差值（±0.02mm）放進 mockup

### Don't
- 不要用純黑 `#000000` 當背景 — `--bg-deep` 的冷鋼色調是必要的
- 不要在加工數據上用比例字型 — 數字必須等寬對齊
- 不要把鍛造橙灑滿全場 — 它是鍛造火花，出現時必須像金屬切削瞬間
- 不要用暖灰色階 — 金屬加工用冷鋼灰（藍灰調），不是食品廠的暖灰(Stone)
- 不要對非加工中/非異常狀態使用 pulse 動畫 — 閃爍 = 機台運作中或需要注意
- 不要在 body text 加負字距 — 只有 Space Grotesk Display 尺寸（22px+）才壓縮
- 不要讓設計像遊戲 UI — 這是精密機械加工企業工具，要 BMW 的工程質感不要鋼鐵人 HUD

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-10 | 初始設計系統建立 | 基於 BMW + SpaceX + NVIDIA + Warp 四個參考設計，為金屬加工 ERP 定制 |
| 2026-04-10 | Forge Orange (#FF6B2C) 主色 | 區別於電子業(cyan)、物流業(amber)、食品廠(green)。金屬切削火花 / 鍛造熔液的隱喻 |
| 2026-04-10 | 冷鋼灰 (#64748B) 作為 secondary | 金屬表面、機台外殼的冷灰色，搭配鍛造橙形成溫冷對比 |
| 2026-04-10 | Space Grotesk + Inter + Geist Mono 字型組合 | Space Grotesk 有 CNC 銘牌的精密幾何感，Inter body 極致可讀，Geist Mono 延續系列數據字型 |
| 2026-04-10 | 冷鋼灰背景色階 | 金屬加工用冷灰（藍灰調 #0B0C10），區別於物流業的海軍藍和食品廠的暖灰 |
| 2026-04-10 | alarm-pulse 快速閃爍 (1.5s) | 機台異常比一般 processing 狀態更緊急，用更快的 pulse 頻率區分 |
| 2026-04-10 | 2px 頂部 forge gradient bar | 像金屬切削火花飛濺的視覺隱喻，比 glassmorphism 更符合金屬加工的工業質感 |
