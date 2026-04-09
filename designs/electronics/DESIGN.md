# Design System — Electronics ERP

## Product Context
- **What this is:** Dark-mode-first ERP system for electronics supply chain management
- **Who it's for:** Electronics procurement teams, inventory managers, production planners
- **Space/industry:** Electronics manufacturing, component distribution, supply chain
- **Project type:** Web app (dashboard, data tables, forms, reports)

## Aesthetic Direction
- **Direction:** Industrial Luxe — precision instrument meets premium tech
- **Decoration level:** Expressive — glassmorphism panels, glow status indicators, gradient accents
- **Mood:** Opening this ERP should feel like sitting in a control center. Dark, focused, powerful. Electric cyan accents pulse like signals on a circuit board. Glassmorphism surfaces float with depth. Every status indicator glows like an LED. Not corporate flat, not sci-fi fantasy... premium engineering.
- **Reference inspirations:** Linear (dark-mode layers, precision borders), Stripe (data-grade shadows, tabular numbers), Raycast (multi-layer physical depth, macOS-native feel), Superhuman (luxury typography, dramatic hero)

## Typography

### Font Stack
- **Display/Hero:** General Sans — geometric, bold, modern. Not overused. Confident without shouting.
- **Body:** DM Sans — clean, screen-optimized, excellent readability at small sizes. Good CJK pairing.
- **Data/Tables:** Geist Mono — Vercel's monospace, built for tabular-nums. Perfect for part numbers, amounts, dates.
- **Code:** Geist Mono
- **Loading:** Google Fonts CDN
  ```html
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=General+Sans:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  ```

### CSS Variables
```css
--font-display: 'General Sans', system-ui, -apple-system, sans-serif;
--font-body: 'DM Sans', system-ui, -apple-system, sans-serif;
--font-mono: 'Geist Mono', ui-monospace, 'SF Mono', 'Menlo', monospace;
```

### Scale

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display XL | General Sans | 48px | 700 | 1.05 | -1.2px | Hero headlines, page titles |
| Display | General Sans | 32px | 600 | 1.1 | -0.8px | Section headings |
| Heading | General Sans | 22px | 600 | 1.2 | -0.3px | Card titles, sub-sections |
| Heading SM | General Sans | 18px | 600 | 1.3 | -0.2px | Widget titles |
| Body LG | DM Sans | 16px | 400 | 1.5 | normal | Feature descriptions |
| Body | DM Sans | 14px | 400 | 1.5 | normal | Standard reading text |
| Body SM | DM Sans | 13px | 400 | 1.5 | normal | Compact body, table cells |
| Body Emphasis | DM Sans | 14px | 600 | 1.5 | normal | Labels, navigation |
| Caption | DM Sans | 12px | 500 | 1.4 | normal | Metadata, timestamps |
| Data | Geist Mono | 13px | 500 | 1.4 | normal | Part numbers, amounts, PO numbers. Use `font-variant-numeric: tabular-nums` |
| Data SM | Geist Mono | 12px | 400 | 1.4 | normal | Small data, chart labels |
| Label | Geist Mono | 10px | 500 | 1.4 | 1.5px | Table headers, section labels. UPPERCASE |
| Micro | Geist Mono | 10px | 500 | 1.4 | normal | Badges, tiny labels |

## Color

### Approach
Restrained-with-punch. An almost entirely achromatic dark canvas, punctuated by a single electric accent. Color is rare and meaningful — when cyan glows, it commands attention.

### CSS Custom Properties
```css
/* Background Surfaces */
--bg-deep: #07090E;           /* Page background — deep navy-black, like a dark PCB */
--bg-surface-1: #0D1117;      /* Sidebar, panels, elevated containers */
--bg-surface-2: #161B22;      /* Cards, modals, dropdowns */
--bg-surface-3: #1C2333;      /* Hover states, active elements */
--bg-surface-4: #242D3D;      /* Selected rows, pressed states */

/* Accent */
--accent-primary: #00E5FF;    /* Electric cyan — the hero color. Circuit board signals. */
--accent-primary-dim: rgba(0, 229, 255, 0.15);
--accent-primary-glow: rgba(0, 229, 255, 0.4);
--accent-secondary: #7C3AED;  /* Violet — secondary actions, complements cyan */
--accent-secondary-dim: rgba(124, 58, 237, 0.15);

/* Text */
--text-primary: #E6EDF3;      /* Near-white, not pure white — prevents eye strain */
--text-secondary: #8B949E;    /* Descriptions, secondary content */
--text-muted: #484F58;        /* Placeholders, disabled, timestamps */
--text-on-accent: #07090E;    /* Text on accent-colored backgrounds */

/* Semantic Status */
--success: #3FB950;
--success-dim: rgba(63, 185, 80, 0.15);
--success-glow: rgba(63, 185, 80, 0.4);
--warning: #D29922;
--warning-dim: rgba(210, 153, 34, 0.15);
--warning-glow: rgba(210, 153, 34, 0.4);
--error: #F85149;
--error-dim: rgba(248, 81, 73, 0.15);
--error-glow: rgba(248, 81, 73, 0.4);
--info: #58A6FF;
--info-dim: rgba(88, 166, 255, 0.15);

/* Borders */
--border-subtle: rgba(255, 255, 255, 0.06);
--border-standard: rgba(255, 255, 255, 0.08);
--border-emphasis: rgba(255, 255, 255, 0.12);

/* Glassmorphism */
--glass-bg: rgba(13, 17, 23, 0.7);
--glass-border: rgba(255, 255, 255, 0.08);
--glass-blur: blur(20px);

/* Shadows */
--shadow-glow-cyan: 0 0 20px rgba(0, 229, 255, 0.15), 0 0 60px rgba(0, 229, 255, 0.05);
--shadow-glow-violet: 0 0 20px rgba(124, 58, 237, 0.15);
--shadow-card: 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 1px rgba(255, 255, 255, 0.05);
--shadow-elevated: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.06);
```

### Light Mode Strategy
Reduce saturation 10-20%, swap surfaces to warm grays, darken accent for contrast:
```css
[data-theme="light"] {
  --bg-deep: #F0F2F5;
  --bg-surface-1: #FFFFFF;
  --bg-surface-2: #F7F8FA;
  --bg-surface-3: #EEF0F4;
  --accent-primary: #0097A7;    /* Darker cyan for readability */
  --accent-secondary: #6D28D9;
  --text-primary: #1A1D23;
  --text-secondary: #5A6270;
  --text-muted: #9CA3AD;
  --border-subtle: rgba(0, 0, 0, 0.06);
  --border-standard: rgba(0, 0, 0, 0.1);
  --glass-bg: rgba(255, 255, 255, 0.8);
}
```

### Status Badge Pattern
Status indicators use a glowing LED dot + tinted background:
```css
.badge-status {
  font-size: 11px;
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
.badge-success {
  background: var(--success-dim);
  color: var(--success);
}
.badge-success::before {
  background: var(--success);
  box-shadow: 0 0 6px var(--success-glow);  /* The LED glow */
}
```

## Spacing
- **Base unit:** 8px
- **Density:** Compact-first (ERP users need data density, not marketing whitespace)
- **Scale:**

| Token | Value | Usage |
|-------|-------|-------|
| 2xs | 2px | Micro gaps, icon padding |
| xs | 4px | Tight inline spacing |
| sm | 8px | Base unit. Component padding, row gaps |
| md | 16px | Card padding, section gaps |
| lg | 24px | Section spacing |
| xl | 32px | Major section spacing |
| 2xl | 48px | Page-level spacing |
| 3xl | 64px | Hero spacing |

## Layout
- **Approach:** Grid-disciplined — predictable alignment, high information density
- **Grid:** 12-column with 16px gutters
- **Max content width:** 1400px (ERP dashboards need room for data)
- **Sidebar:** 220px default, collapsible to 64px (icon-only)
- **Header:** 56px fixed height, glassmorphism backdrop

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| sm | 4px | Inputs, inline badges, small elements |
| md | 8px | Buttons, cards, dropdowns |
| lg | 12px | Modals, feature cards, panels |
| xl | 16px | Large containers, dashboard sections |
| pill | 9999px | Status badges, filter chips, tags |

## Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Level 0 | No shadow, `--bg-deep` | Page background |
| Level 1 | `--border-subtle` only | Sidebar, inline elements |
| Level 2 (Glass) | `--glass-bg` + `--glass-blur` + `--glass-border` | KPI cards, floating panels |
| Level 3 (Card) | `--shadow-card` + `--border-standard` | Data tables, content cards |
| Level 4 (Elevated) | `--shadow-elevated` | Modals, popovers, command palette |
| Glow | `--shadow-glow-cyan` or per-color glow | Active states, status indicators, hover accents |

### Glassmorphism Recipe
```css
.glass-panel {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
}
```

## Motion
- **Approach:** Intentional — subtle entrance animations, smooth state transitions, glow pulses
- **Easing:** enter(`ease-out`) exit(`ease-in`) move(`ease-in-out`)
- **Duration:** micro(100ms) short(150ms) medium(250ms) long(400ms)

### Signature Animations
- **Status LED pulse:** `animation: pulse 2s ease-in-out infinite` on processing indicators
- **Hover lift:** `transform: translateY(-2px)` + shadow intensify on cards
- **Glow on hover:** `box-shadow` transition from dim to glow on interactive elements
- **Glassmorphism entry:** `opacity: 0 -> 1` + `translateY(8px) -> 0` on panel mount

```css
@keyframes pulse {
  0%, 100% { opacity: 1; box-shadow: 0 0 6px var(--accent-primary-glow); }
  50% { opacity: 0.5; box-shadow: 0 0 12px var(--accent-primary-glow); }
}
```

## Component Patterns

### Buttons

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| Primary | `--accent-primary` | `--text-on-accent` | none | glow intensify + lift |
| Secondary | `--accent-secondary` | white | none | violet glow |
| Ghost | transparent | `--text-secondary` | `--border-standard` | bg -> `--bg-surface-3` |
| Danger | `--error-dim` | `--error` | `rgba(248,81,73,0.2)` | error glow |

### Data Table
- Header: `--bg-surface-2`, Geist Mono 10px uppercase labels
- Rows: transparent, `--border-subtle` bottom border
- Hover: `--bg-surface-2` background
- Status cells: LED-glow badge pattern
- Amounts: Geist Mono with `tabular-nums`
- PO/Part numbers: Geist Mono, `--accent-primary` or `--text-primary`

### Navigation Sidebar
- Background: `--bg-surface-1`
- Active item: `--accent-primary-dim` bg + `--accent-primary` text + 3px left border with glow
- Hover: `--bg-surface-2`
- Labels: `--font-mono` 10px uppercase `--text-muted`
- Badge counts: `--error-dim` bg, `--error` text, pill shape

## Do's and Don'ts

### Do
- Use `--bg-deep` (#07090E) as page background — the blue-black tint is essential
- Apply glow (`box-shadow: 0 0 Npx`) on status indicators — they're LEDs on a circuit board
- Use glassmorphism for KPI cards and floating panels — depth and premium feel
- Keep data table text in Geist Mono with `tabular-nums` — numbers must align
- Use `--accent-primary` (#00E5FF) sparingly — it's the hero, not the wallpaper
- Apply `rgba(255,255,255,0.06-0.08)` borders — semi-transparent white, never solid dark
- Put real part numbers (IC-7805CT, GRM188R71C104) in mockups — this is electronics

### Don't
- Don't use pure black (#000000) as background — `--bg-deep` has essential blue-navy tint
- Don't use purple/violet gradients as primary accent — cyan is the brand color, violet is secondary only
- Don't apply glow to everything — it's for status indicators and hover states, not static decoration
- Don't use solid opaque card backgrounds — glassmorphism or `rgba(255,255,255,0.02-0.05)` transparency
- Don't forget `backdrop-filter` fallback for older browsers — use solid `--bg-surface-1` as fallback
- Don't make the design feel like a gaming UI — this is an enterprise tool with premium taste, not Cyberpunk
- Don't use tight letter-spacing on body text — only on display sizes (24px+)

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-10 | Initial design system created | Created by /design-consultation based on 4 reference designs (Linear, Stripe, Raycast, Superhuman) + user preference for premium dark-mode aesthetic |
| 2026-04-10 | Electric cyan (#00E5FF) as primary accent | Communicates "electronics/technology" identity, stands out against dark background, avoids overused purple/blue |
| 2026-04-10 | General Sans + DM Sans + Geist Mono font stack | Display needs personality (General Sans), body needs readability (DM Sans), data needs tabular precision (Geist Mono) |
| 2026-04-10 | Glassmorphism as elevation strategy | Adds premium depth beyond flat dark cards, aligns with user's requirement for visual impact |
| 2026-04-10 | LED-glow status badges | Circuit board metaphor for electronics ERP, makes status visually immediate |
