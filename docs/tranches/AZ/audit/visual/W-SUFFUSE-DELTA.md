# AZ.W-SUFFUSE — the suffusion pass: audacious-type uplift + the motion-purple color-pop + the calm grid/paper/math content idiom, each surface its ONE deliberate event · DELTA

<!-- surface-paths: demo/stories/StoryHero.vue, demo/stories/StoryPage.vue, demo/stories/story-hero.css, demo/stories/data/metric-cell.vue, demo/stories/data/metric-stack.vue, src/components/custom/metric-cell/MetricCell.vue, src/styles/typography.css, demo/stories/compositions/settings.vue, demo/stories/manifest.ts, demo/stories/motion/typewriter.vue, demo/stories/motion/underline.vue, demo/demo.css -->
<!-- surface-hash: 53786ae7407183c7da5c4f96001ede353caddea1520ffd9f65427aa149c03be2 -->
<!-- AZ.W-GATES content-hash freshness model: fresh IFF the twelve surface-paths'
     bytes are byte-identical to capture time (sha256 of the "\n"-joined bytes,
     surfaceHash convention). Stamped at the own-surface capture against the live
     demo on :5199 with the W-SUFFUSE edits in place (tests-visual/suffuse.spec.ts
     navigated the routes — the π half). -->

This wave SUFFUSES the design language within proportion. The house OWNED a
magnificent audacious type ladder + a 13-stop section-color ramp + paper/grid/math
vocabulary, but the demo STARVED all three: the chassis capped every title at
`text-heading`, the two top audacious tiers had ZERO consumers, the motion family
spent the WRONG (Fourier-red) hue, ~104/121 routes wore the flat default, and the
settings eyebrows cycled a four-hue rainbow. Each surface now gets its ONE
deliberate color/display event, never two competing.

## The π readback (the BINDING truth — `tests-visual/suffuse.spec.ts`)

`getComputedStyle` readback captured live on :5199 (paired-π: `W-SUFFUSE-readback.json`):

| signal | resolved | guard |
|---|---|---|
| hero title (`/substrates/constellation`, `.story-hero-title`) | **67.78px / 600** | >> 25.9px text-heading ✓ (display register, D2-1) |
| `--motion-accent` (light) | **oklch 0.532 0.180 317.5** · hue **317.4°** | violet, not warm-red ~30° ✓ (D3-3) |
| `--motion-accent` (dark) | **oklch 0.739 0.134 318.1** · hue **318.3°** | violet, mode-robust ✓ |
| plot stroke (`svg polyline`) | **oklch 0.532 0.18 317.5** | reads the SAME violet (one event) ✓ |
| `text-display-mega` metric number | **177.42px** | >> 32.9px text-title ✓ (activated, D2-3) |
| `text-display-audacious` metric number | **284.8px** | the fast.com peg, activated ✓ |
| settings grid underlay (`.story-bg-grid`) | present, paints gradients, 1096×1337px | VISIBLE (D4-1/D4-3) ✓ |
| settings card bg alpha | **oklab … / 0.44** | dropped below 0.65α resting so the grid reads ✓ |
| settings eyebrows (×4) | ALL **oklch 0.532 0.18 317.5** | ONE register, hue spread 0° (de-noised D1-8) ✓ |

The 10/10 π spec passed (chromium-headless-new + coarse-touch projects). The π
in-situ readback is the binding suffusion truth; the source arm ratifies shape.

## Arm D2 — the audacious-type uplift

- **The chassis hero display register (D2-1/D2-4).** `StoryHero` gains a `title`
  prop + a `showHeroTitle` computed; on `variant="hero"` it renders the chassis
  hero `<h1 class="text-display-3 story-hero-title">` — the audacious moment is a
  CHASSIS affordance. The starved substrate hero pages (paper-glass / aurora /
  constellation / fourier-field / glass-material) — title-less after W-HIERARCHY's
  chrome-`<h1>` suppression — gain the display-register `<h1>` (the constellation
  page reads **67.78px**). The three bespoke front-door composition heroes (intro /
  hero / auth-shell) set `:hero-title="false"` (the `StoryPage` → `StoryHero`
  pass-through) and keep their hand-authored display `<h1>` (hero.vue's typewriter
  `<h2>` + auth-shell's brand `<h2>` PROMOTED to `<h1>` so the outline is correct).
- **The dead audacious tiers ACTIVATED (D2-3 — ACTIVATE, not prune).** `text-display-mega`
  (peak 177px) + `text-display-audacious` (peak 352px), prior ZERO consumers, gain
  2 live consumers EACH on the metric/number surfaces (their fast.com-peg natural
  home): `data/metric-cell` (a hero-metric block — download mega 912 + latency
  audacious 14) + `data/metric-stack` (peak throughput mega 912 + uptime audacious
  100%). The CEILING holds — the gate asserts NO section `<h2>`/`<h3>` and NO
  body-copy element consumes them (the over-spend counter), and no D2 edit re-rungs
  a W-HIERARCHY-shared-route `<h2>` off `text-subheading` (the non-collision clause).

## Arm D3 — the color-pop map under the one-color-event rule

- **The motion-PURPLE identity completed (D3-3/D3-4/D3-5).** W-MOTION-SUITE (Batch
  3) already minted `--motion-accent: var(--viz-legendre)` (demo.css) + re-pointed
  curve-gallery / foundations-motion / springs / scroll-vt / BezierEditor; this
  wave closes the LAST two leftover surfaces — `typewriter.vue` (`text-[var(--motion-accent)]`)
  + `underline.vue` (the `<GlassUnderline color="var(--motion-accent)">` preset).
  The whole motion family now reads ONE coherent violet event across the
  FILL/STROKE/BACKGROUND/color channels (the channel-swap-evasion guard bites).
- **The metric glyph tint (D3-6).** `MetricCell` gains an `iconColor` prop tinting
  the LEADING GLYPH ONLY to its semantic `--chart-*` viz color (download / upload /
  ping / jitter); the value + unit stay neutral ink — the cell's ONE color event.
- **The `.section-label--tinted` abstraction + the settings eyebrow de-noise (D3-7/D1-8).**
  A new `.section-label--tinted` variant (typography.css) reads ONE
  `--section-label-accent` knob (default `--section-color-7`, the violet brand
  anchor). `settings.vue` collapses the prior four-hue eyebrow rainbow (account=indigo
  / appearance=amber / notifications=red / accessibility=teal — the arbitrary noise)
  to the ONE coherent register — the page-scope one-color-event rule (all 4 eyebrows
  resolve to the SAME hue, spread 0°).
- **The restraint counters hold (D3-8/D3-9).** The positive idioms (timeline /
  notification / gate / icons+empty-states chips) are UNTOUCHED; the
  legitimately-monochrome surfaces (the icon grid, the Section type-ladder, the
  curve-gallery TABLE) stay flat — the gate's d3 count asserts ZERO tinted events on
  the monochrome set.

## Arm D4 — the calm glass/grid/math content idiom (NO live substrate)

- **Lift the declared-background strength (D4-3).** `StoryHero` extends its
  live-substrate card-thinning (`quiet`/`wash`) to the declared STATIC backdrops
  (grid / paper) via a `staticBackdrop` computed — the 7%-grid under a 0.65α
  `resting` card was invisible; the card now drops to the calm `wash` (page) tier so
  the underlay READS (settings card alpha 0.44).
- **Propagate the math-paper idiom (D4-1/D4-4/D4-5).** `settings.vue` (the canonical
  thin offender — a page ABOUT grain/paper rendered flat) gains the math-paper
  section-accent rail (a `border-inline-start: 3px` keyed off the page's ONE accent)
  + the ONE eyebrow register, on a blueprint-grid wash (`background: "grid"` on its
  manifest row). `table` + `data-table` (the ledger/engineering-paper-shaped
  surfaces, the most native blueprint-grid fit, prior bare) gain `background: "grid"`
  — their grid + the semantic status badges are the content event (no second tint).
- **Re-scale the settings slider fill (D1-7).** The three Base size / Radius / Grain
  `.slider-range` cylinders painted a near-opaque dark `--primary` fill (the
  censor/redaction-bar effect that pulled the eye OFF content). A settings-LOCAL
  `--slider-range-bg: var(--section-color-7)` override (the already-exposed Slider
  seam) drops the fill off the page-darkest-block — NOT a library default re-tune
  (presets-in-consumers).
- **The over-spend fence (D4-7).** The gate asserts NO `<Aurora>`/`<Constellation>`/
  `<FourierField>`/`<GooBlob>` is added to a content page; ppmycota purple is NOT in
  any library token (the HARD fence E1-7 — `--motion-accent` rides the EXISTING
  `--viz-legendre` twin, demo-local only).

## Captures (≥2 viewports × {light,dark} — the own-surface DELTA bar)

- `W-SUFFUSE-hero-title-{light,dark}.png` — the chassis display-register `<h1>` on
  the constellation hero page.
- `W-SUFFUSE-motion-purple-{light,dark}.png` — the curve-gallery violet plots/dots
  (the ONE motion event, mode-robust).
- `W-SUFFUSE-metric-audacious-{light,dark}.png` — the activated mega/audacious tiers
  on the metric surface (the fast.com peg).
- `W-SUFFUSE-settings-thin-{light,dark}.png` — the settings thin page on the calm
  blueprint-grid wash + the de-noised ONE-accent eyebrows + the re-scaled sliders.
- `W-SUFFUSE-readback.json` — the paired-π resolved-value readback (the binding truth).

## Gates

- `proof:suffuse` (born-RED → GREEN, 16/16) — the device-free SOURCE arm: the hero
  display register, the ≥2-consumer floor + the over-spend ceiling, the motion-purple
  identity (no orange-red across all channels), the one-color-event three-predicate
  count over the per-surface LEDGER (the under-enrollment guard), the over-spend fence
  + the ppmycota library-token fence.
- `tests-visual/suffuse.spec.ts` (10/10 passed) — the π getComputedStyle readback (G2);
  the binding truth is the RESOLVED render, not the screenshot.
- `proof:glass-cohesion` + `proof:hierarchy` + `proof:metric-core` stay GREEN
  (calm washes + content accents, no solid-surface or live-substrate regression);
  the main `vue-tsc --noEmit` + the JS `vite build` arm green.

## Note — the `dist/*.d.ts` emit / `proof:motion-suite` is blocked by a SIBLING lane

The build's `emit-types` (vue-tsc) arm and `proof:motion-suite` (which reads
`dist/motion.d.ts`) are RED at capture time on a `constellationDraw.ts`
`ConstellationPalette.edgeAnomalyAlpha` type error — that surface is a SIBLING
constellation lane's in-flight work (NOT touched by W-SUFFUSE; the constellation
files were already `M` at lane start). W-SUFFUSE's own surfaces are type-clean
(the main `vue-tsc --noEmit` passes) and the JS `vite build` arm emits green; the
dts/motion-suite failure resolves when the constellation lane lands its type.

## The captured frames (literal filenames, audit/visual/)

- `W-SUFFUSE-hero-title-dark.png`
- `W-SUFFUSE-hero-title-light.png`
- `W-SUFFUSE-metric-audacious-dark.png`
- `W-SUFFUSE-metric-audacious-light.png`
- `W-SUFFUSE-motion-purple-dark.png`
- `W-SUFFUSE-motion-purple-light.png`
- `W-SUFFUSE-settings-thin-dark.png`
- `W-SUFFUSE-settings-thin-light.png`
