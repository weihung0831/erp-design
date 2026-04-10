# ERP Design

Industry-specific design systems for manufacturing ERP applications. Each industry gets a tailored `DESIGN.md` (design tokens, typography, color, components) and a `preview.html` (interactive browser preview with light/dark toggle).

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

## Structure

```
designs/
├── 電子業/          # Electronics — cyan, glassmorphism, circuit board aesthetic
│   ├── DESIGN.md
│   └── preview.html
├── 食品廠/          # Food Factory — green, traffic light system, warm stone grays
│   ├── DESIGN.md
│   └── preview.html
├── 物流業/          # Logistics — amber, shadow-as-border, pill nav chips
│   ├── DESIGN.md
│   └── preview.html
├── 金屬加工/        # Metal Processing — forge orange, cold steel, CNC precision
│   ├── DESIGN.md
│   └── preview.html
├── 紡織業/          # Textile — indigo, loom gradient, warm purple-gray
│   ├── DESIGN.md
│   └── preview.html
└── 製藥業/          # Pharmaceutical — clinical teal, lab precision, cold blue-black
    ├── DESIGN.md
    └── preview.html
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

## Preview

Open any `preview.html` in a browser to see the full design system rendered:

```bash
open designs/金屬加工/preview.html
```

Each preview includes:
- Color palette swatches
- Typography specimen
- Component showcase (buttons, inputs, badges)
- Spacing & border radius scale
- Full ERP dashboard mockup with sidebar, KPI cards, and data table
- Dark/Light mode toggle

## Design References

This repo includes [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) as a submodule with 59 reference design systems (Linear, Stripe, BMW, Tesla, SpaceX, etc.) used as inspiration.

```bash
git submodule update --init
```

## Shared Conventions

All industry designs share these conventions while maintaining distinct visual identities:

- **Light mode default** — preview defaults to light, with dark mode toggle
- **Monospace data** — Geist Mono with `tabular-nums` for all numerical data
- **8px spacing base** — compact-first for data-dense ERP layouts
- **LED-glow status badges** — pill-shaped with animated dot indicators
- **56px fixed header** — consistent navigation frame
- **220px collapsible sidebar** — icon-only at 64px

## License

Private project.
