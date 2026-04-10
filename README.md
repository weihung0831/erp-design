# ERP Design

Industry-specific design systems for manufacturing ERP applications. Each industry has a tailored `DESIGN.md` with design tokens, typography, color, and component patterns. A unified Astro showcase site lets you browse and compare all designs with live previews.

[繁體中文](README.zh-TW.md)

## Industries

| Industry | Accent Color | Status |
|----------|-------------|--------|
| [Electronics](designs/電子業/) | Electric Cyan `#00E5FF` | ✅ Complete |
| [Food Factory](designs/食品廠/) | Gradient Green `#10B981` | ✅ Complete |
| [Logistics](designs/物流業/) | Signal Amber `#F59E0B` | ✅ Complete |
| [Metal Processing](designs/金屬加工/) | Forge Orange `#FF6B2C` | ✅ Complete |
| [Textile](designs/紡織業/) | Indigo `#6366F1` | ✅ Complete |
| [Pharmaceutical](designs/製藥業/) | Clinical Teal `#14B8A6` | ✅ Complete |

## Quick Start

```bash
git submodule update --init   # Initialize reference designs
npm install
npm run dev                   # Start dev server at http://localhost:4321
```

## Showcase Site

Built with **Astro** (Vercel-style UI: monochrome base, Geist fonts, shadow-as-border). The neutral black/white palette lets each industry's accent color stand out.

- **Homepage** — Card grid with all 6 industries
- **Detail page** — Embedded live preview with dark/light sync + DESIGN.md download
- **Preview** — 7 unified sections: Typography, Color, Components, Spacing & Radius, Shadows, KPI Cards, Dashboard Mockup

## Structure

```
designs/
├── <industry>/
│   └── DESIGN.md              # Design spec (source of truth)
src/
├── data/
│   ├── industry-slugs.json    # Slug mapping (single source)
│   ├── industries.ts          # Industry metadata
│   └── design-tokens.ts       # Full design tokens per industry
├── components/
│   └── PreviewTemplate.astro  # Shared preview template (7 sections)
├── pages/
│   ├── index.astro            # Homepage card grid
│   ├── designs/[slug].astro   # Detail page (iframe + download)
│   └── preview/[slug].astro   # Live preview page
├── layouts/Base.astro
└── styles/global.css
scripts/prebuild.mjs           # Zip DESIGN.md for download
awesome-design-md/             # Submodule — 59 reference design systems
```

## Design System Format

Each `DESIGN.md` includes:

- **Product Context** — target users, industry, project type
- **Aesthetic Direction** — mood, decoration level, reference inspirations
- **Typography** — font stack, scale, CSS variables
- **Color** — accent, backgrounds, semantic status, light/dark mode
- **Spacing** — 8px base unit, compact-first density
- **Layout** — 12-column grid, sidebar, header, breakpoints
- **Depth & Elevation** — shadow system, border radius
- **Motion** — easing, duration, signature animations
- **Component Patterns** — buttons, tables, badges, KPI cards, nav
- **Do's and Don'ts** — guard rails for consistency

## Design References

This repo includes [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) as a submodule with 59 reference design systems (Linear, Stripe, BMW, Tesla, SpaceX, etc.) used as inspiration.

## Shared Conventions

All industry designs share these conventions while maintaining distinct visual identities:

- **Light mode default** — preview defaults to light, with dark mode toggle
- **Monospace data** — Geist Mono with `tabular-nums` for all numerical data
- **8px spacing base** — compact-first for data-dense ERP layouts
- **LED-glow status badges** — pill-shaped with animated dot indicators

## Tech Stack

- [Astro](https://astro.build/) — Static site generator
- [Geist](https://vercel.com/font) — Sans + Mono fonts
- Deployed on [Zeabur](https://zeabur.com/)

## License

Private project.
