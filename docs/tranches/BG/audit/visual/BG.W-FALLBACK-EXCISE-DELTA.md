# BG.W-FALLBACK-EXCISE — dual-engine paint judge DELTA (NF.1, seq F3 Dock, class P)

> **Role:** NON-AUTHORING paint judge (did not build the wave). **Verdict: PASS.**
> **Date:** 2026-07-04. **Method:** the PROVEN C18 `?capture=<route>&mode=<m>` pipeline
> (data-capture-ready poll) over the BUILT demo dist on `:5200`, dual-engine
> (Chrome ANGLE-Metal M5 Max via CDP + Safari/WebKit off-screen WKWebView, system
> WebKit.framework/Metal, NO TCC), BOTH modes. **Fence honored:** zero src/demo/styles/
> scripts edits — only this DELTA + the PNGs + the EXECUTION-PROGRESS cursor flip.

## Criterion (verbatim)

- Pass-condition: *"PAINT rides W-REFLECT — the fail-VISIBLE missing-state (a broken class
  binding paints unset chrome, never plausibly-expanded) over the dock morph frame-series,
  both modes."*
- Gate-arm paint spec (col7): *"zero-delta dock purge + the C3 tap-floor / dock morph both
  modes."*

This is the NO-MASKING-FALLBACK purge — zero paint delta **by construction** (every collapsed
fallback is a dead/identical read), so the paint is a **regression proof** that the dock
collapse/expand morph frame-series still paints correctly, PLUS the ATLAS-N **C3 a11y rider**
(a REAL fix): the compact/dense dock control rung guarantees a **44px effective tap floor** via
`@media(pointer:coarse)` hit-slop.

## Verdict — PASS · dual-engine (Chrome + WebKit) · both modes · 16/16 PNGs on disk

Every dock surface, in BOTH engines and BOTH modes, paints a **plausibly-expanded / plausibly-
collapsed real glass state — NEVER unset chrome**. The masking-fallback purge left zero paint
delta; the C3 tap-floor rider is realized (≥44px effective on every dock control under coarse
pointer). All sibling + minted gates GREEN on the integrated tree.

### 1 · Fail-VISIBLE / zero-delta dock purge (COMPUTED-DOM, Chrome)

The masking purge replaced `var(--dock-expand-t, 1)` (and the dead `var(--dock-morph-t, 1)`)
with bare `var()` reads backed by registered-dormant `@property` seats. The fail mode would be
a bare `var()` resolving to EMPTY / invalid → **unset chrome** (transparent plate, degenerate
sliver, no glass). Measured across all 3 routes × 2 modes:

| assertion | result |
|---|---|
| `--dock-expand-t` resolves to a REAL number on every `.glass-dock` | **`"1"` × 46/46 docks** — never empty/unset (the masking-away read is impossible) |
| `--dock-morph-t` real scalar on the morph route | `T = 0.000` readout painted on `/dock/morph-showcase` (the vertical rest state) |
| dock plate paints a real translucent glass bg | e.g. `color(srgb 0.943 0.904 0.864 / 0.52)` light · `… / 0.56` dark — never `transparent`/`rgba(…,0)` |
| dock box non-degenerate | 0 docks < 20px in either axis; 0 transparent-bg; 0 flagged |
| morph frame-series (collapse↔expand drive, 17 samples ×2 modes) | dock stays plausibly-painted at EVERY frame — never an unset/broken frame (the always-expanded SidebarDock correctly stable w66×h712 `expandT=1` throughout) |

### 2 · C3 coarse-pointer 44px tap-floor (COMPUTED-DOM, forced `pointer:coarse` via CDP, mobile 402×874 @3x)

`@media(pointer:coarse)` active (`matchMedia('(pointer: coarse)').matches === true`),
`--dock-touch-target = 2.75rem` (44px). Two mechanisms, both verified in both modes:

| control family | mechanism | measured |
|---|---|---|
| `.dock-icon-button` (in-dock) | `--dock-scale × max(…, 44px)` density clamp | visible min box **46.8 × 46.8px** (≥44 ✓) |
| `.dock-select-trigger` / `.dock-dropdown-trigger` (the census 32×24 defect) | transparent centered `::after` hit-slop `max(100%, 44px)` each axis, parent `position:relative`, `::after position:absolute` | visible box 25.3px tall → **`::after` H=44, W≥75.7** — effective tap ≥44px both axes ✓ |

The dropdown/select triggers paint at their compact visible size (25.3px tall) while the
transparent `::after` extends the POINTER target to the 44px WCAG-2.5.5 floor without growing
or painting the box — exactly the ATLAS-N N-SPEC §4.5 chrome-floor idiom.

### 3 · Visual reads (pixel, both engines both modes)

- **Recessive warm aurora** behind the DockStage — a soft warm-cream→coral gradient, **no
  conic banding, no oversaturation**, calm grain. Docks read as **liquid glass over a live
  field**, not gray pills on charcoal.
- **Dark register** is luminous-transmissive glass (not a dead charcoal slab) — the
  `/dock/layers` DockLayerGroup chips + the morph vertical dock read glass-through in dark.
- **Hero fits its envelope** — the "Overview" / "Vertical ↔ Horizontal Morph" / "Dock Layers"
  display `<h1>` sits in its cluster, no overflow.
- **One-context-per-route budget:** canvas count overview=2 (DockStage aurora + big-dock viz),
  morph-showcase=1, layers=1 — within budget.

### 4 · Provenance (in-pixel badge, decoded)

- **Chrome:** `ENGINE CHROME · GPU ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max…)` — real
  Metal GPU, NOT SwiftShader.
- **WebKit:** `ENGINE WEBKIT · GPU Apple GPU` — system WebKit.framework/Metal.
- All 16 PNGs `isRealPng === true`; dims desktop **2880×1800**, coarse **1206×2622**.

### 5 · Sibling + minted gates (integrated tree)

| gate | exit | note |
|---|---|---|
| `proof:no-masking-fallback` | 0 · PASS | 6 self-test bites all flagged (born-RED → GREEN) |
| `proof:dock-engine-unify` | 0 · PASS | U3 busy-single set/read/clear = true, no bool shadow |
| `proof:dock-morph-family` | 0 · PASS | F6 vertical chrome-interp OK |

`node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before AND after).

## Non-blocking observation (NOT a defect — out of scope for the zero-delta purge)

On `/dock/overview` the collapsible feature dock rendered **expanded** (4-icon pill) in the
Chrome capture and **collapsed** (perfect-circle home glyph) in the WebKit capture — a benign
cross-engine capture-timing difference of the hover-to-expand default. **Both are valid,
real, plausible glass states; neither is unset chrome** — which is precisely the fail-VISIBLE
property this wave guarantees. No fallback-excise regression.

## Artefacts on disk (`docs/tranches/BG/audit/visual/BG.W-FALLBACK-EXCISE-paint/`)

Desktop dual-engine (12): `fallback-excise-dock_{overview,morph-showcase,layers}-{chrome,safari}-{light,dark}.png`
Coarse/mobile C3 (4): `fallback-excise-dock_{overview,layers}-coarse-{light,dark}.png`
Probes: `chrome-probe.json` (badge + scalar + frame-series), `coarse-probe.json` (tap-floor).
Capture scripts: `../BG.W-FALLBACK-EXCISE-chrome-capture.mjs`, `../BG.W-FALLBACK-EXCISE-coarse-probe.mjs`.
