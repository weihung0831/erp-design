# Design System — Logistics ERP

## Product Context
- **What this is:** Dark-mode-first ERP system for logistics operations — 倉儲管理、運輸排程、訂單追蹤、車隊管理
- **Who it's for:** 物流調度員、倉管人員、車隊管理者、運營主管
- **Space/industry:** 物流運輸、倉儲管理、供應鏈
- **Project type:** 資料密集型企業 Web App（儀表板 + 資料表格 + 地圖 + 即時追蹤）

## Aesthetic Direction
- **Direction:** Industrial Command — 物流指揮中心美學，不是辦公室軟體
- **Decoration level:** Intentional — shadow-as-border（Vercel 技法）+ 選擇性 glow + 狀態信號發光
- **Mood:** 打開這個 ERP 像走進深夜的物流調度中心。深色背景上，琥珀色信號燈標記著每一筆在途貨物。追蹤號碼等寬排列，狀態指示燈脈衝閃爍。不是科幻片，不是企業灰 — 是精密、現代、有溫度的工業指揮台。
- **Reference inspirations:** SpaceX（工業極簡、航太精密）、Vercel（Geist 字型、shadow-as-border）、Superhuman（高端質感、glow 效果）、Uber（物流語境、pill-shaped 膠囊元件、功能密度）

## Typography

### Font Stack
- **Display/Hero:** Satoshi — 幾何、工業、現代。Weight 700/900 有看板衝擊力，不像 Inter 那樣被用爛。
- **Body/UI:** Geist — Vercel 出品，精密工程感。Display 尺寸搭配負字距創造壓縮的專業氣質。
- **Data/Tables:** Geist Mono — 運單號、貨號、重量、座標、時間戳。tabular-nums 精確對齊。
- **Code:** Geist Mono
- **Loading:**
  ```html
  <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400;500;600;700;900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  ```

### CSS Variables
```css
--font-display: 'Satoshi', system-ui, -apple-system, sans-serif;
--font-body: 'Geist', system-ui, -apple-system, sans-serif;
--font-mono: 'Geist Mono', ui-monospace, 'SF Mono', 'Menlo', monospace;
```

### Scale

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display XL | Satoshi | 48px | 900 | 1.05 | -2.0px | 頁面主標題，最大衝擊力 |
| Display | Satoshi | 32px | 700 | 1.1 | -1.5px | 區塊標題 |
| Heading | Satoshi | 22px | 700 | 1.2 | -0.5px | 卡片標題、子區塊 |
| Heading SM | Satoshi | 18px | 700 | 1.3 | -0.3px | 小標題、Widget 標題 |
| Body LG | Geist | 16px | 400 | 1.5 | normal | 功能描述 |
| Body | Geist | 14px | 400 | 1.5 | normal | 標準內文 |
| Body SM | Geist | 13px | 400 | 1.5 | normal | 表格內文、緊湊內文 |
| Body Emphasis | Geist | 14px | 600 | 1.5 | normal | 標籤、導航 |
| Caption | Geist | 12px | 500 | 1.4 | normal | 時間戳、備註 |
| Data | Geist Mono | 13px | 500 | 1.4 | normal | 運單號、貨號、重量、座標。`font-variant-numeric: tabular-nums` |
| Data SM | Geist Mono | 12px | 400 | 1.4 | normal | 小數據、圖表標籤 |
| Label | Geist Mono | 10px | 500 | 1.4 | 1.5px | 表頭、區塊標籤。UPPERCASE |
| Pill | Geist | 13px | 600 | 1.0 | normal | 膠囊按鈕、篩選 chip |

### Principles
- **三字型系統：** Satoshi 負責標題衝擊力，Geist 負責 UI 精密感，Geist Mono 負責數據精準度
- **負字距是身份：** Display 尺寸使用 -1.5px ~ -2.0px 字距，標題看起來像被壓縮的工程圖紙
- **判斷標準：** 如果是「被追蹤的精確資料」→ Geist Mono。如果是「被閱讀的內容」→ Geist。如果是「被掃視的標題」→ Satoshi
- **Geist 的工程感：** Body 文字在 14px 用 Geist 的默認 tracking，保持乾淨利落

## Color

### Approach
Signal-driven — 深色畫布上，琥珀色主色像物流信號燈標記重要資訊。色彩稀少而有意義 — 當 amber 亮起，它指引注意力。

### CSS Custom Properties
```css
/* Background Surfaces */
--bg-deep: #0A0D14;           /* 頁面背景 — 深海軍藍黑，指揮中心的基調 */
--bg-surface-1: #111621;      /* Sidebar、面板、次級容器 */
--bg-surface-2: #1A2030;      /* 卡片、Modal、Dropdown */
--bg-surface-3: #222B3C;      /* Hover 狀態、Active 元素 */
--bg-surface-4: #2B3548;      /* 選取列、Pressed 狀態 */

/* Accent — Signal Amber */
--accent-primary: #F59E0B;    /* 琥珀信號 — 倉庫信號燈、航線標記、追蹤定位 */
--accent-primary-dim: rgba(245, 158, 11, 0.15);
--accent-primary-glow: rgba(245, 158, 11, 0.4);
--accent-secondary: #3B82F6;  /* 航線藍 — 地圖路線、導航元素、次要動作 */
--accent-secondary-dim: rgba(59, 130, 246, 0.15);

/* Text */
--text-primary: #E8ECF1;      /* 近白，不是純白 — 減輕長時間盯螢幕的疲勞 */
--text-secondary: #8892A0;    /* 描述、次要內容 */
--text-muted: #4A5568;        /* placeholder、disabled、時間戳 */
--text-on-accent: #0A0D14;    /* Accent 色背景上的文字 */

/* Semantic Status */
--success: #34D399;
--success-dim: rgba(52, 211, 153, 0.15);
--success-glow: rgba(52, 211, 153, 0.4);
--warning: #FBBF24;
--warning-dim: rgba(251, 191, 36, 0.15);
--warning-glow: rgba(251, 191, 36, 0.4);
--error: #F87171;
--error-dim: rgba(248, 113, 113, 0.15);
--error-glow: rgba(248, 113, 113, 0.4);
--info: #60A5FA;
--info-dim: rgba(96, 165, 250, 0.15);

/* Borders — Shadow-as-Border (Vercel 技法) */
--border-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06);
--border-shadow-hover: 0 0 0 1px rgba(245, 158, 11, 0.2);
--border-subtle: rgba(255, 255, 255, 0.06);
--border-standard: rgba(255, 255, 255, 0.08);
--border-emphasis: rgba(255, 255, 255, 0.12);

/* Shadows & Depth */
--shadow-card: var(--border-shadow), 0 2px 8px rgba(0, 0, 0, 0.3);
--shadow-elevated: var(--border-shadow), 0 8px 32px rgba(0, 0, 0, 0.4);
--shadow-glow-amber: 0 0 20px rgba(245, 158, 11, 0.15), 0 0 60px rgba(245, 158, 11, 0.05);
--shadow-glow-blue: 0 0 20px rgba(59, 130, 246, 0.15);
```

### Light Mode Strategy
```css
[data-theme="light"] {
  --bg-deep: #F1F3F6;
  --bg-surface-1: #FFFFFF;
  --bg-surface-2: #F7F8FA;
  --bg-surface-3: #EEF0F4;
  --accent-primary: #D97706;    /* 略深的 amber，白底上確保對比度 */
  --accent-secondary: #2563EB;
  --text-primary: #1A1D23;
  --text-secondary: #5A6270;
  --text-muted: #9CA3AD;
  --border-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
  --border-subtle: rgba(0, 0, 0, 0.06);
  --border-standard: rgba(0, 0, 0, 0.1);
}
```

### Status Badge Pattern
狀態指示使用 glow dot + 有色背景 — 信號燈隱喻：
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
.badge-in-transit {
  background: var(--accent-primary-dim);
  color: var(--accent-primary);
}
.badge-in-transit::before {
  background: var(--accent-primary);
  box-shadow: 0 0 6px var(--accent-primary-glow);
}
.badge-delivered {
  background: var(--success-dim);
  color: var(--success);
}
.badge-delivered::before {
  background: var(--success);
  box-shadow: 0 0 6px var(--success-glow);
}
.badge-delayed {
  background: var(--error-dim);
  color: var(--error);
}
.badge-delayed::before {
  background: var(--error);
  box-shadow: 0 0 6px var(--error-glow);
  animation: pulse 2s ease-in-out infinite;
}
```

## Spacing
- **Base unit:** 8px
- **Density:** Compact-first（物流調度員需要同時看到大量資訊）
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
| md | 8px | 卡片、dropdown、標準容器 |
| lg | 12px | Modal、feature cards、面板 |
| xl | 16px | 大型容器、dashboard sections |
| pill | 9999px | Nav chips、status badges、filter chips、action pills |

### Pill Navigation Chips (Uber 影響)
路線/倉庫/車隊的頂層切換使用膠囊按鈕：
```css
.nav-chip {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 9999px;
  background: var(--bg-surface-2);
  color: var(--text-secondary);
  border: none;
  cursor: pointer;
  transition: all 150ms ease-out;
}
.nav-chip:hover {
  background: var(--bg-surface-3);
  color: var(--text-primary);
}
.nav-chip.active {
  background: var(--accent-primary);
  color: var(--text-on-accent);
  box-shadow: var(--shadow-glow-amber);
}
```

## Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Level 0 | No shadow, `--bg-deep` | 頁面背景 |
| Level 1 (Border) | `--border-shadow` (shadow-as-border, Vercel 技法) | Sidebar、inline 元素 |
| Level 2 (Card) | `--shadow-card` | 資料表格、內容卡片 |
| Level 3 (Elevated) | `--shadow-elevated` | Modal、Popover、Command Palette |
| Glow | `--shadow-glow-amber` 或 per-color glow | Active 狀態、status indicators、hover accents |

### Shadow-as-Border (Vercel 技法)
用 `box-shadow: 0 0 0 1px` 取代傳統 CSS border — 更滑順的 transition、不影響 box model：
```css
.card {
  background: var(--bg-surface-2);
  box-shadow: var(--shadow-card);
  border-radius: 8px;
  border: none; /* 不用 CSS border */
}
.card:hover {
  box-shadow: var(--border-shadow-hover), 0 4px 16px rgba(0, 0, 0, 0.35);
  transform: translateY(-1px);
}
```

## Motion
- **Approach:** Intentional — 有目的的動畫，傳達狀態而非裝飾
- **Easing:** enter(`ease-out`) exit(`ease-in`) move(`ease-in-out`)
- **Duration:** micro(100ms) short(150ms) medium(250ms) long(400ms)

### Signature Animations
- **信號脈衝:** Delayed/異常狀態的 glow dot 以 2s 循環脈動 — 像信號燈閃爍
- **Hover 上浮:** `translateY(-1px)` + shadow 加深 — 卡片懸浮感
- **Amber glow on hover:** interactive 元素 hover 時從 dim 到 glow
- **Tracking beacon:** 地圖上的追蹤點以 3s 循環縮放 1→1.3 — 表示在途

```css
@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 6px var(--accent-primary-glow); }
  50% { opacity: 0.5; box-shadow: 0 0 12px var(--accent-primary-glow); }
}
@keyframes beacon {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.6; }
}
```

### Motion Rules
1. 動畫只用在傳達狀態變化的地方
2. Pulse 動畫只出現在需要注意的異常狀態（delayed、error）
3. `prefers-reduced-motion` 關閉所有動畫
4. 轉場不超過 400ms

## Component Patterns

### Buttons

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| Primary | `--accent-primary` | `--text-on-accent` | none | glow intensify + slight lift |
| Secondary | transparent | `--accent-primary` | `--border-standard` | border → amber, bg → `--accent-primary-dim` |
| Ghost | transparent | `--text-secondary` | none | bg → `--bg-surface-3` |
| Danger | `--error-dim` | `--error` | `rgba(248,113,113,0.2)` | error glow |
| Pill Chip | `--bg-surface-2` | `--text-secondary` | none | bg → `--bg-surface-3`; active: amber bg (Uber 風格) |

### Data Table
- Header: `--bg-surface-2`, Geist Mono 10px uppercase labels
- Rows: transparent, shadow-as-border 底線 (`0 1px 0 0 var(--border-subtle)`)
- Hover: `--bg-surface-2` background
- 運單號/貨號: Geist Mono, `--accent-primary` — 可點擊追蹤
- 金額/重量: Geist Mono, `tabular-nums`, `--text-primary`
- Status cells: pill badge with glow

### Navigation Sidebar
- Background: `--bg-surface-1`
- Active item: `--accent-primary-dim` bg + `--accent-primary` text + 3px left border with amber glow
- Hover: `--bg-surface-2`
- Section labels: `--font-mono` 10px uppercase `--text-muted`
- Badge counts: `--error-dim` bg, `--error` text, pill shape

### KPI Cards
- Shadow-as-border (`--border-shadow`)
- 大數字: Satoshi 32px 700 weight, `--accent-primary`
- 趨勢箭頭: success/error 色 + micro 脈衝
- Hover: border → amber glow, slight lift

### Map Integration
- 深色地圖底圖（Mapbox dark style 或同等）
- 追蹤點: amber dot with beacon animation
- 路線: `--accent-secondary`（航線藍）描邊
- Geofence: `--accent-primary-dim` 填充區域

## Do's and Don'ts

### Do
- 用 `--bg-deep` (#0A0D14) 作為頁面背景 — 深海軍藍黑的色調是指揮中心基底
- 運單號、貨號、重量、座標、時間戳一律用 Geist Mono + `tabular-nums`
- 用 shadow-as-border (`0 0 0 1px`) 取代 CSS border — Vercel 技法讓邊界更精緻
- Satoshi 在 Display 尺寸使用負字距（-1.5px ~ -2.0px）— 壓縮的工程感
- `--accent-primary` (#F59E0B) 省著用 — 它是信號燈，不是背景色
- Pill chips (9999px) 用於導航切換和狀態標籤 — Uber 影響的現代觸控設計
- Delayed/異常狀態用脈衝動畫 — 信號燈閃爍表示需要注意
- 地圖路線用 `--accent-secondary`（藍色），追蹤點用 `--accent-primary`（amber）

### Don't
- 不要用純黑 `#000000` 當背景 — `--bg-deep` 的海軍藍色調是必要的
- 不要在物流數據上用比例字型 — 數字必須等寬對齊
- 不要用 CSS `border` 取代 shadow-as-border — 保持 Vercel 技法的一致性
- 不要把 amber accent 灑滿全場 — 它是信號，出現時必須有意義
- 不要對非異常狀態使用 pulse 動畫 — 閃爍 = 需要注意
- 不要在 body text 加負字距 — 只有 Satoshi Display 尺寸（22px+）才壓縮
- 不要把 pill radius 用在卡片容器上 — pill 是給 chips/badges 的，容器用 8-16px
- 不要讓設計像遊戲 UI — 這是企業工具，要精密不要花俏

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-10 | 初始設計系統建立 | 基於 SpaceX + Vercel + Superhuman + Uber 四個參考設計，為物流 ERP 定制 |
| 2026-04-10 | Signal Amber (#F59E0B) 主色 | 區別於 electronics（cyan）和 food-factory（green），物流信號燈/航線標記的隱喻 |
| 2026-04-10 | Satoshi + Geist + Geist Mono 字型組合 | Satoshi 標題有工業衝擊力，Geist body 有 Vercel 精密感，Geist Mono 數據精確 |
| 2026-04-10 | Shadow-as-border (Vercel 技法) | 比傳統 CSS border 更精緻，transition 更滑順，不影響 box model |
| 2026-04-10 | Pill-shaped nav chips (Uber 影響) | 膠囊按鈕比 tab 更現代、更觸控友善，符合物流調度快速切換的需求 |
| 2026-04-10 | 負字距 Display 標題 | 壓縮的 Satoshi 標題像工程圖紙，營造精密感而非行銷感 |
| 2026-04-10 | 航線藍 (#3B82F6) 作為 secondary | 地圖路線用藍色、追蹤點用 amber，雙色分工明確 |
