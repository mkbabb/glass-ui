# AS visual-evidence baseline — capture manifest

Captured by the CAPTURE agent against the running demo dev server at
`http://localhost:5173` (vue-router, path-based). All viewport captures at
**1440x900**, both light and dark. Dark mode toggled via
`document.documentElement.classList.add('dark')` and verified (`isDark`) before
each dark capture; removed + re-verified before each light capture (the demo's
dark-sync can re-assert `dark` on navigation, so the class was re-set on every
route after `browser_navigate`).

Output dir: `/Users/mkbabb/Programming/glass-ui/as-verify/` (gitignored scratch).

## AS-affected priority surfaces

| File | Route | Viewport | Theme | Note |
|------|-------|----------|-------|------|
| `aurora-light.png` | `/aurora` | 1440x900 | light | Aurora stage renders NON-EMPTY (blue painterly gradient + visible nuclei circles); preset strip thumbnails + configurator panel read rounded. Live GL context confirmed (canvas 931x700, webgl2). |
| `aurora-dark.png` | `/aurora` | 1440x900 | dark | Rail/preset-strip/configurator chrome all dark; aurora stage still renders non-empty blue gradient. |
| `aurora-configurator-light.png` | `/aurora` (`.configurator` element) | element | light | Configurator panel element-capture — rounded-corner detail legible; preset segmented control (Medium/Smooth/Watercolor/Pastel/Oil) + sliders. |
| `aurora-configurator-dark.png` | `/aurora` (`.configurator` element) | element | dark | Same panel, dark chrome; corners read rounded. |
| `dock-light.png` | `/navigation/dock` | 1440x900 | light | 6 `.glass-dock` instances. Pill-shaped docks (home-icon, media transport, select/dropdown triggers) — rounded floor intact, standalone floor reads. |
| `dock-dark.png` | `/navigation/dock` | 1440x900 | dark | Docks render rounded with soft glow halo; floor + triggers intact in dark. |
| `dock-token-ladder-light.png` | `/dock/icon-button-token-ladder` | 1440x900 | light | `--dock-active-{bg,color,scale,border,shadow}` cohort table + 5 active-rung swatches (Default/Audacious/Boomed/Outlined/Shadowed) each a rounded dock-icon-button. |
| `dock-token-ladder-dark.png` | `/dock/icon-button-token-ladder` | 1440x900 | dark | Same cohort + swatches, dark; rounded floors intact. |
| `foundations-radii-light.png` | `/foundations/radii` | 1440x900 | light | THE rounded-corner canon: scale xs(2px)→sm(4px)→md(6px)→lg(var)→xl(12px)→2xl(16px)→pill(9999px) with progressively rounder corners; semantic aliases (card/panel/dialog/input/button/badge/dock). Corner progression correct + legible. |
| `foundations-radii-dark.png` | `/foundations/radii` | 1440x900 | dark | Same radius ladder, dark surfaces. |
| `foundations-colors-light.png` | `/foundations/colors` | 1440x900 | light | Core token swatches (background/foreground/muted/border/card/primary/secondary/accent/destructive/ring), 13-stop rainbow section palette, viz-basis cards — warm-cream palette, all rounded. |
| `foundations-colors-dark.png` | `/foundations/colors` | 1440x900 | dark | Same palette in dark. |
| `configurator-light.png` | `/primitives/configurator` | 1440x900 | light | Floating glass substrate (rounded), preset segmented control (Quiet/Default/Lush), spread/bloom sliders, grain switch. |
| `configurator-dark.png` | `/primitives/configurator` | 1440x900 | dark | Same primitive in dark; rounded glass substrate intact. |
| `search-light.png` | `/data/search` | 1440x900 | light | Fuzzy Search: rounded search input, metric pills (49 rows / 0 results / No selection), readout + helper-ledger cards, destructive Clear-cache button. |
| `search-dark.png` | `/data/search` | 1440x900 | dark | Same surface in dark. |
| `sliders-glass-scrubber-light.png` | `/sliders/glass-scrubber` | 1440x900 | light | Three scrubber-state instances (at-rest/hover/grab) rounded-pill tracks + 6-variant comparison ladder (standard/spectrum/timeline/glass-pill/...). |
| `sliders-glass-scrubber-dark.png` | `/sliders/glass-scrubber` | 1440x900 | dark | Same slider variants in dark. |
| `carousel-light.png` | `/navigation/carousel` | 1440x900 | light | Warm-cream base-surface card (rounded), pager (chevrons + 1/5 counter pill + active dot), glass story-pager with rounded slide cards. |
| `carousel-dark.png` | `/navigation/carousel` | 1440x900 | dark | Same carousel surfaces in dark. |

## Representative primitives / feedback sample

| File | Route | Viewport | Theme | Note |
|------|-------|----------|-------|------|
| `buttons-light.png` | `/primitives/buttons` | 1440x900 | light | Full variant ladder (default/destructive/outline/secondary/accent/ghost/glass/glass-wash/ai/link), audacious + gold-audacious CTAs, size scale — all pill-rounded. |
| `buttons-dark.png` | `/primitives/buttons` | 1440x900 | dark | Same variant ladder in dark. |
| `progress-light.png` | `/feedback/progress` | 1440x900 | light | Determinate (42%), animated red-basis loop, indeterminate, sizes ladder, sectioned phase-bus variant — all rounded-pill bars/fills. |
| `progress-dark.png` | `/feedback/progress` | 1440x900 | dark | Same progress surfaces in dark. |
| `foundations-paper-glass-light.png` | `/foundations/paper-glass` | 1440x900 | light | 5-rung glass-tier ladder (wash/quiet/resting/floating/overlay) as rounded glass cards + tiered-glass-panel section w/ detected `svg-filter` tier badge. |
| `foundations-paper-glass-dark.png` | `/foundations/paper-glass` | 1440x900 | dark | Same glass-tier ladder in dark. |

## Totals

- 13 routes captured (12 category/flat routes × light+dark = 24 viewport captures)
  plus 2 aurora `.configurator` element captures (light+dark) = **26 capture
  files** for this baseline.
- No route 404'd; no capture failed.
- No alert/confirm/prompt dialog was triggered.

## Notes / caveats

- `aurora.png` and `aurora-configurator.png` (no `-light`/`-dark` suffix) in the
  same dir are PRE-EXISTING stale captures from a prior run — NOT part of this
  AS baseline set. Leave or delete as the orchestrator sees fit.
- All affected surfaces confirm the three load-bearing AS reads: corners read
  ROUNDED (radii ladder + every glass/dock/card surface), aurora renders
  NON-EMPTY in both themes, and the dock floor renders (standalone pill +
  token-ladder swatches).
