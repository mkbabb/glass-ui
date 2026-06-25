# SYNTHESIS — foundations/chart-chassis-palette (Pass-E, binding per-page verdict)

**Page:** `demo/stories/foundations/chart-chassis-palette.vue` (113 L) · live `/foundations/chart-chassis-palette`
**Import-path label:** `/foundations/chart-chassis-palette` (demo-route form — **already standardized**, all 3 auditors agree; do NOT "fix" to a `@mkbabb` subpath, this is a token page with no single exported component).
**Inputs reconciled:** the demo-lens, design-lens, and component-lens reports in this dir.
**Subject:** the speedtest chart aliases (`--chart-{ping,download,upload,jitter}` → `--viz-{fourier,chebyshev,legendre,bessel}` basis) + the four chassis-tier composite tokens (`--glass-bg-{dock,chassis}`, `--glass-curvature-overlay`, `--glass-specular`), with ONE live `<InstrumentChassis phase="ready">`.

---

## 1 · Convergence call

**~30% converged — needs several more loops.** All three auditors land on the same verdict independently: an accurate-but-generic token-export spreadsheet that fails the core BD mandates (no aurora field, no per-section glass cards, near-zero animation, a frozen chassis, content debt). One auditor surfaces a genuine **correctness bug** (two dead swatches that misrepresent their own tokens) that the other two missed or under-weighted — that alone forecloses a "close" verdict. This page is among the lower-converged foundations pages; it is a full rebuild, not a polish pass.

## 2 · Reconciled findings (deduped, conflicts resolved)

The three lenses are **highly concordant** — same 7 problems from three angles. Dedupe:

- **Dead-swatch correctness bug (design #1 — UNIQUE, load-bearing).** `--glass-specular` is a `box-shadow` literal (`inset 0 1.5px 0 0 hsl(0 0% 100% / 0.30)`) painted as a `background:` — invalid CSS, paints nothing. `--glass-curvature-overlay` is a `0.012`-α radial gradient — perceptually invisible at 48px. Both ride `TokenLadder`'s flat-`background` swatch. **Confirmed on disk.** The section meant to prove the catch-light demonstrates two empty tiles — it lies about its own tokens. The demo + component lenses noted "inert chassis / static composite" but did NOT catch that the SWATCHES are structurally dead. This is the headline.
- **No live colorful field → glass lenses nothing (all 3).** `canvas.length===0`; `foundations→paper` static wash; `ShowcaseFrame` at default `resting` (opaque `bg-card`) at all 4 sites → the BG-2 black-plate defect; dark mode re-introduces the W-DARK-MATERIAL charcoal-slab-on-void read at the composition layer.
- **Not per-section glass cards; main area sparse (demo #4 + design #3).** 5 `StorySection`s in ONE shared `StoryHero` plate, hairline-delimited; inner `ShowcaseFrame` is opaque paper, not glass. The "each sub-section its own glassy card / main BIGGER" ask is unmet AND inverted.
- **Chassis frozen at `phase="ready"` — its ONE animation never fires (all 3).** The `--phase-color`/`--phase-tint-amount` cascade is the chassis's whole motion story and is invisible. Empty text-only slots, no meter, no phase cycle, no `complete`-gold seal.
- **Zero deft component series; dock/tabs/ColorSwatch absent (demo #2 + design #5).** Only `<InstrumentChassis>` (inert) + `<TokenLadder>`. Dead `<div :style>` rectangles where `<ColorSwatch>` belongs; no `<Progress variant="sectioned">` phase-bus (the single best fit for the chart palette); no dock contextual-switch.
- **Content debt — redundancy + changelog leak (all 3).** Sections 1+2 paint the identical four `--chart-*` hues twice (stacked, then inline tiles). Section 5 "resolved drift" is a `--viz-topology`/`--viz-recursion` post-mortem — **renders a label + NOTHING** (no slot — confirmed: `<StorySection label="resolved drift" blurb=… />` self-closes). Pure changelog in the UI; violates no-meta-in-artifacts.
- **Src-component gaps (component #3/#4/#5 — beyond the demo).** `<InstrumentChassis>` has NO entrance/exit (hard cut); bare `backdrop-filter` with NO `-webkit-` companion (Safari ≤17 drops the plate blur); the six-layer composite is 4.5/6 STATIC (no grain, no saturate companion, static catch-light, no deep/lens refraction); `--phase-tint-peak` 6% is sub-perceptual. The `spine` variant has a high prose-to-consumer ratio.

**Conflict resolved — the aurora-field mandate vs the one-GL-per-route fence.** The demo + design lenses both call for a live `<Aurora>` page background seeded from the chart hues. The component lens correctly flags the hard constraint: **`BD.W-TOKEN-TOUR-GLASS` is GL-FREE by fence (M8 blocks GL on a static-wash route), and `BD.W-PAGE-BACKGROUND` does NOT exist on disk.** Resolution: this is a foundations TOKEN page, not a substrates GL route. The colorful-field ask is satisfied via **`ShowcaseFrame tier="field"` over a designed page wash** — and the page's subject (the chart/viz palette) is the ideal wash source: a **chromatic paper/grid wash seeded from the `--chart-*`/`--viz-*` hues** (NOT a new GL context). The glass cards then lens a real chromatic substrate without staging a second `<Aurora>`. If a genuine GL aurora is judged essential for THIS page (the design lens argues the chassis is the most refraction-dependent surface in the system and deserves it), that requires a **NEW Band-16 wave** to carve a per-page GL exception with its own M8-carve gate — flagged below as the one real NEW-wave candidate. The conservative default is `tier="field"` over the chromatic wash.

## 3 · Ranked changes (by impact)

1. **[CORRECTNESS] Kill the dead-swatch bug** — never paint `--glass-specular` (box-shadow) or `--glass-curvature-overlay` (0.012-α) as a flat tile background. Show them ONLY as a composed before/after glass pair: two identical glass tiles, one with the specular/curvature layer, one without, the catch-light reading as the delta (§L1 layer-4 demonstrated, not asserted). The flat opacity tokens (`--glass-bg-dock`, `--glass-bg-chassis`) may stay as fills. **This blocks any close.**
2. **[STRUCTURE+SUFFUSION] Per-section glass cards over a chromatic field** — promote each sub-section to its own `ShowcaseFrame tier="field"` (or `glass-quiet`/`glass-resting` inner plate) over a chart-hue-seeded chromatic page wash; share the ONE composition container (glass-cannot-sample-glass §L1); enlarge the chassis + chart-ladder protagonists (bento span); kills the BG-2/dark-void read.
3. **[ANIMATION+COMPONENT] Make the chassis BREATHE through its phase bus** — a `<SegmentedTabs>` / `<StoryPlayButton>` cycling `ready→ping→download→upload→jitter→complete`, animating `--phase-color` + `--phase-tint-amount` LIVE, firing `<CompletionSeal>` gold on `complete`. Single highest-leverage move: lands animation + deft-component + contextual-switching at once.
4. **[COMPONENT SERIES] `<ColorSwatch>` + `<Progress variant="sectioned">` + a `<DockStack mode="facets">`** — every dead `<div :style>` becomes a four-state click-to-copy `<ColorSwatch>`; the chart palette gets a LIVE consumer (the sectioned phase-bus rendering the `--chart-*` hues as a blended fill); a facet dock (Chart palette / Chassis tiers, per-facet `--glass-accent` hues) gives the contextual-switching index.
5. **[CONTENT] Cut the debt** — merge sections 1+2 into ONE chart-palette specimen; **DELETE the "resolved drift" changelog section** from the UI; one-line code-voiced blurbs.
6. **[SRC] Component-canon + Safari + deep-glass uptake** — chassis mount-bloom entrance; `-webkit-backdrop-filter` companion (systemic ladder sweep); opt the dial hero into `vSpecular`/`useSpecularPointer` living catch-light + `.glass-lens` + the deep tier; calibrate `--phase-tint-peak` up from 6%.

## 4 · Tranche actions (per change → wave)

| # | Change | Action | Wave |
|---|--------|--------|------|
| 1 | Dead-swatch composed-pair fix (specular/curvature are composite effects, NOT fills) | **MODIFY** `BD.W-TOKEN-TOUR-GLASS` — add a clause to Arm B: "a composite-effect token (box-shadow / sub-α gradient) is NEVER swatched as a flat `background`; it shows as a composed before/after glass pair." Add the M-clause + self-test bite (a flat-background composite-token swatch reds). Enroll chart-chassis-palette in the page set. | `BD.W-TOKEN-TOUR-GLASS` (MODIFY) |
| 2 | Per-section glass cards + chromatic-wash field staging + bigger protagonist | **AUGMENT** `BD.W-TOKEN-TOUR-GLASS` — extend Arm B's `tier="field"` field-staging + the per-section glass-card fold to this page; the chromatic page wash seeds from `--chart-*`/`--viz-*`; **GL-FREE (M8 GREEN) — wash, not a new `<Aurora>` GL context.** | `BD.W-TOKEN-TOUR-GLASS` (AUGMENT) |
| 3 | Chassis phase-bus cycling + `<CompletionSeal>` gold | **AUGMENT** `BD.W-TOKEN-TOUR-GLASS` — add a live-demo clause: the token-tour chassis is driven through the phase bus (mirrors the wave's existing Arm-B live-demo intent). | `BD.W-TOKEN-TOUR-GLASS` (AUGMENT) |
| 4 | `<ColorSwatch>` / `<Progress variant="sectioned">` / `<DockStack mode="facets">` composition | **AUGMENT** `BD.W-TOKEN-TOUR-GLASS` — the deft-component-series clause (this page's swatches → `<ColorSwatch>`, the chart palette → the live phase-bus, the facet dock). | `BD.W-TOKEN-TOUR-GLASS` (AUGMENT) |
| 5 | Merge sections 1+2; DELETE "resolved drift"; tighten blurbs | **FOLD** into `BD.W-TOKEN-TOUR-GLASS` — content cleanup rides the same demo edit. The changelog-in-UI deletion is a no-meta-discipline fix. | `BD.W-TOKEN-TOUR-GLASS` (FOLD) |
| 6a | Chassis entrance + living catch-light (`vSpecular`) | **AUGMENT** `BD.W-BC-COMPONENT-CANON` — extend the component-canon sweep to `<InstrumentChassis>` (mount bloom + tier-root specular auto-arm reach). | `BD.W-BC-COMPONENT-CANON` (AUGMENT) |
| 6b | Bare `backdrop-filter` → `-webkit-` companion | **MODIFY** `BD.W-BC-COMPONENT-CANON` — add the chassis to the systemic Safari prefixed-pair ladder sweep. | `BD.W-BC-COMPONENT-CANON` (MODIFY) |
| 6c | Deep-glass / lens refraction + `--phase-tint-peak` recalibration | **AUGMENT** `BD.W-DEEP-GLASS-20PX` + `BD.W-GLASS-LENS-CHROMA` — add the chassis dial as a consumer; recalibrate the sub-perceptual 6% tint. | `BD.W-DEEP-GLASS-20PX` / `BD.W-GLASS-LENS-CHROMA` (AUGMENT) |
| 7 | `spine` variant prose-to-consumer ratio | **PRUNE-CANDIDATE** — re-confirm `spine`/`structure` ≥2-consumer bar at the overfitting-audit close; prune `spine` if the App-level binding is not real. | `BD.W-WEAK-KEEP-REGRADE` (PRUNE-CANDIDATE) |
| — | Heavy chassis docstrings (60-line variant essay + 20-line CSS essay) | **FOLD** prose-tighten into `BD.W-PRECEPTS-README-FRESHEN`. | `BD.W-PRECEPTS-README-FRESHEN` (FOLD) |

**NEW-wave candidate (flagged, not asserted):** a per-page GL `<Aurora>` exception for chart-chassis-palette (the design lens argues the chassis warrants a real chromatic GL field, not just a wash) would need a **NEW Band-16 `BD.W-CHASSIS-AURORA-FIELD`** with its own M8-carve gate (a named per-route GL exception + the one-GL-per-route budget assertion). **Default recommendation: do NOT mint it** — the `tier="field"` chromatic-wash path satisfies the mandate within the existing fences. Escalate to NEW only if the orchestrator judges the chassis's refraction-dependence worth a budget exception.

## 5 · Fences to hold (do not regress)

- The √φ `text-display-4` page title + the semantic-alias framing (chart→viz basis) are correct — keep.
- The import-path label is already standardized — do NOT touch.
- Monochrome page chrome / one-color-event proportion — keep (`proof:suffuse` GREEN).
- **M8 GL-on-static-wash + one-GL-per-route** — the field staging is a chromatic WASH via `tier="field"`, NOT a new `<Aurora>` GL context (unless the NEW-wave exception is minted).
- The `<InstrumentChassis>` CLS≈0 static dial reserve (BB.W-DESKTOP-RESERVE) — the entrance must be compositor-only (transform/opacity), never an animated height (`proof:no-layout-animation` holds).

---

## VERDICT (6 lines)

1. **Top-3 changes:** (a) KILL the dead-swatch correctness bug — `--glass-specular` (a box-shadow) + `--glass-curvature-overlay` (0.012-α) painted as flat backgrounds paint nothing/invisible; show them ONLY as a composed before/after glass pair; (b) per-section GLASS cards over a chart-hue-seeded chromatic field (`tier="field"`, GL-free) + enlarge the chassis protagonist; (c) make the frozen chassis BREATHE through its phase bus (`<SegmentedTabs>`/`<StoryPlayButton>` cycling ready→…→complete + `<CompletionSeal>` gold) with `<ColorSwatch>`/`<Progress sectioned>`/`<DockStack facets>` deftly composed.
2. **Tranche actions:** the demo-side changes (1–5) all ride `BD.W-TOKEN-TOUR-GLASS` (1×MODIFY for the dead-swatch-composite clause + enrollment, 3×AUGMENT for field/chassis/component-series, 1×FOLD for content cleanup).
3. The src-component upgrades AUGMENT `BD.W-BC-COMPONENT-CANON` (chassis entrance + living catch-light + the `-webkit-` Safari sweep) and `BD.W-DEEP-GLASS-20PX`/`BD.W-GLASS-LENS-CHROMA` (deep/lens uptake + `--phase-tint-peak` recalibration).
4. The `spine` variant is a PRUNE-CANDIDATE for `BD.W-WEAK-KEEP-REGRADE`; the heavy chassis docstrings FOLD into `BD.W-PRECEPTS-README-FRESHEN`.
5. **NO net-new wave required** by default — every finding folds onto an existing BD wave; one NEW-wave is flagged-not-asserted (`BD.W-CHASSIS-AURORA-FIELD`, a per-page GL exception) and recommended AGAINST in favor of the `tier="field"` chromatic-wash path.
6. **Convergence ~30% — needs several more loops**; the dead-swatch correctness bug forecloses any "close" verdict, and the page is a full rebuild (field + glass cards + live chassis + component series + content cuts) before it earns its place as a chassis-grade artifact.
