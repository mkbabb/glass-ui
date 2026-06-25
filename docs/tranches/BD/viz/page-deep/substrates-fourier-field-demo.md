# Pass-E META-STORYBOOK audit — substrates/fourier-field

- **Page:** `substrates/fourier-field`
- **Import label (target):** `@mkbabb/glass-ui/fourier-field`
- **SFC:** `demo/stories/substrates/fourier-field.vue`
- **Component:** `src/components/custom/fourier-field/FourierField.vue` (`/fourier-field`)
- **Live:** `http://localhost:5173/substrates/fourier-field` (spot-checked; dev server PID 26665)
- **Working tree at audit:** branch `prototype/liquid-dock`, HEAD `9a765843` (BF tranche-DEV). The
  session git-status snapshot said `tranche/BB`; the live tree is the later BF/BD line. The SFC on disk
  is the `f220a497`/`cb1e09fd` (BA→BC) revision — findings below are against the disk SFC + the live paint.

---

## 0. Verdict-shaping context — the field IS alive (no dead demo)

A first pixel-sample of `.fourier-field-canvas` read ALL BLACK (`maxLum 0`, `mean [0,0,0]`), which LOOKS
like a dead viz. It is NOT — `drawImage()` from a **WebGPU** canvas into a 2D scratch context returns
black (cross-context readback limitation without `preserveDrawingBuffer`). The direct viewport screenshot
(after scroll) shows the warm-amber Fourier curve, the rotating epicycle circles, the comet head, and the
pink chain arm all painting + animating. Status reads `N 4 / 16 playing`. **The demo animates correctly.**
Both `navigator.gpu` and WebGL2 are present; backing store resizes to `1246×1042` @2dpr over the `623×521`
CSS box. So: no GPU error, no dead demo, no broken animation in the FIELD.

---

## 1. DEMO CONGRUENCE — does it show the component at its BEST + full API?

**Mostly YES, with reservations.** The studio exercises the real API surface deftly:
- `useConfiguratorState<FourierViewCfg>` with `cloneMode: "per-preset"` (SFC:152-156) — 4 presets
  (Ambient / Dense / Brand ℱ / Summing) that fold the retired `variant` enum.
- The orthogonal axes are all live: `harmonics` (N, the assembling axis), `showEpicycles` + `epicycleArms`
  (orthogonal to N), `rainbowChain`, `trailArc`/`trailWidth`/`intensity`, `harmonicScale`, `source`
  (elliptic + ℱ/heart/star forward-DFT traces via `fourier-paths.ts` → `dftFromPoints`), `color` (the 3
  shipped `--viz-*` tokens, warm/cool/violet — no demo-local teal, per the warm-cream identity fence).
- The **scrub** API (`setHeadT`) is wired to a `<GlassTimeline variant="scrubber">` (SFC:340-345,265-269)
  and the `pause`/`resume` expose is wired to `<DockBackgroundToggle v-model:paused>` (SFC:338,256-264) +
  a `LabeledSelect` speed control. This is a genuinely full-API teaching surface.

**Reservations / misses:**
- The **`freeze` / `renderAt` / capture lever** is exposed by the component (FourierField.vue:162-169) but
  NOT demonstrated anywhere on the page.
- The `intensity` prop override path (component clamps [0,2]) is shown only via config, not the prop seam.
- No demonstration of the **ambient/recessive register** (`color` + `colorResolver` seam, the
  non-interactive background consumer) — the page only shows the interactive studio. A `§7`-style state
  gallery (like blob.vue's STAGE walk-through) showing ambient-vs-studio would round out "at its BEST".

## 2. COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

**Reasonable composition, but NOT the dock-forward gestalt the audit asks for.** Components composed:
`StoryPage`, `StorySection`, `ShowcaseFrame`, `Configurator`/`ConfiguratorLayer`/`ConfiguratorRow`,
`LabeledSelect`, `LabeledSlider`, `GlassTimeline` (scrubber), `DockBackgroundToggle`, `FourierField`. That
is a real series. **But:**
- The "leverage the dock APIs (contextual switching / animating)" directive is essentially UNMET. The only
  dock-family component is `<DockBackgroundToggle>` used as a bare pause button — none of the
  contextual-switching / morph / `DockLayerGroup` / `DockStack` / silhouette APIs appear. The preset
  switching is done with `<Configurator>` preset chips, not a dock contextual switch.
- Two of the four configurator toggles are **raw `<input type="checkbox">`** (SFC:398-403, 428-433) with
  `accent-[var(--viz-fourier)]` — NOT a glass-ui `<Switch>`/`<ToggleChip>`. A library demo hand-rolling a
  native checkbox where it ships a `Switch` is a congruence miss (it should dogfood its own control).

## 3. GLASS SUFFUSION — glass over a LIVE colorful field, or flat?

**Partial / weak.** The substrate-studio case is special: the **viz IS the colorful field** (the warm-amber
Fourier curve is the color event), so there is no separate aurora-behind-glass. The configurator chrome,
the status pill (`bg-card/70 backdrop-blur-sm`, SFC:323), and the transport bar DO read as glass — but they
float over a **flat dark/charcoal page**, not over a live colorful field. So the glass morphism is muted:
the configurator panel reads as a dark glass slab, the catch-light/rim/tint of the six-layer composite is
barely exercised because there is nothing colorful behind it to refract. **PAPER morphism: absent** (no
`paper-grain`/`paper-ink-mark`/blueprint-grid register anywhere — apt for a "math paper" Fourier teaching
surface and currently unused). The audit's "glass demos over COLORFUL aurora backgrounds" is the weakest
dimension here.

## 4. STRUCTURE — each sub-section its OWN glassy card? main card BIG enough?

**FAILS the "own glassy card per sub-section" ask.** The entire studio is ONE `<ShowcaseFrame tier="quiet">`
holding ONE `<Configurator>` (SFC:300-487). The four logical sub-sections (Spectrum / Epicycles / Comet /
Color) are `<ConfiguratorLayer>` collapsible groups INSIDE the single configurator column — they are
flush-divider sections, not discrete glassy cards. There is no per-concept card decomposition.

**Main card size:** the field stage is `h-[min(72vh,600px)]` (SFC:301) split between the canvas and the
transport row — measured live at **623×521** for the canvas. Siblings run LARGER: aurora/`VizStudio` default
`min(78vh,720px)`, blob `min(70vh,560px)`. So fourier's field is mid-pack and, after the transport row eats
~60px, the actual canvas is the smallest of the three. The audit's "main card area BIGGER (more screen
space)" is not satisfied — the field should grow toward `min(78vh,720px)` and the transport could float over
the field (overlay) rather than steal a row.

**Architectural divergence (root cause):** aurora + concentric use the shared **`<VizStudio>` chassis**
(`demo/stories/substrates/VizStudio.vue`) which bundles StoryPage + the hero cluster + configurator-right +
the rounded-field clip + `#masthead`/`#stage`/`#controls`/`#presets` slots. **fourier-field.vue (and
blob.vue) hand-roll the studio** instead. fourier should adopt `<VizStudio>` for congruence — it would give
the bigger default field, the single coherent header, and the shared rounded-field treatment for free.

## 5. PATH-LABEL standardization

**ALREADY STANDARDIZED + verified live.** Eyebrow renders `Substrates · @mkbabb/glass-ui/fourier-field`
(SFC:278; live `.section-label` confirmed). Note the SIBLINGS are NOT standardized — aurora.vue:122 reads
`Substrates · Aurora Studio`, blob.vue:441 reads `Substrates · Blob Studio` (no `@mkbabb/glass-ui/*`
label). So this page is the COMPLIANT exemplar; the standardization gap is on aurora/blob, not here.

## 6. LANGUAGE — superfluous prose to tighten?

- **SFC `<header>` blurb (SFC:285-293) is the LONG redundant copy** — 8 lines repeating what the manifest
  blurb already says. It duplicates the manifest description (manifest.ts:594, the tighter "ONE Fourier view
  on the WebGPU substrate…"). The SFC blurb is superfluous and should be DELETED (see bug #1 — it is the
  duplicate that also causes the double-header).
- Tooltip prose is generally tight + good. `tooltip="The partial-sum term count — TRUNCATE the spectrum and
  watch the curve assemble…"` etc. are fine.
- Minor: `liveStatus` "playing"/"paused" micro-label is fine.

## 7. BUGS

**BUG-1 (HIGH) — DOUBLE HEADER (duplicate title + eyebrow + blurb).** The SFC hand-rolls its own
`<header>` (SFC:277-294) with eyebrow + `text-display-3` "Fourier Field" + a `<p>` blurb, but `<StoryPage>`
ALSO renders a `<StoryHeader>` hero cluster from the manifest row (eyebrow → display `<h1>` "Fourier Field"
→ manifest blurb). Live DOM confirms TWO "Fourier Field" titles (`displayTitles: ["Fourier Field","Fourier
Field"]`) and TWO blurbs (`proseBlurbs: [manifest-short, SFC-long]`). Visually the giant StoryPage hero
"Fourier Field" OVERLAPS the "The live studio" `<h2>` and bleeds into the configurator stage. This is the
exact **D1-4 double-`<h1>` defect** StoryPage was built to suppress; the SFC bypasses the suppression by
hand-rolling a header. blob.vue dodges it by naming its masthead "Blob Studio" (≠ manifest "Blob") + putting
its blurb on `<StorySection>`. **Fix:** delete the SFC `<header>` (SFC:277-294); rely on StoryPage's hero,
OR adopt `<VizStudio>` and move the violet masthead into its `#masthead` slot (the aurora pattern).

**BUG-2 (MED) — Harmonics-N slider fill overflows its track.** In the live screenshot the purple slider
fill for "Harmonics (N)" sits LEFT of / outside the track rail (the fill pill protrudes past the track's
left edge). Likely a `LabeledSlider`/`min=1` rounding-at-low-N rendering issue. Spot-check + reproduce at
N=4.

**BUG-3 (LOW) — `<Transition>` non-element-root Vue warn.** Console: `[Vue warn]: Component inside
<Transition> renders non-element root node that cannot be animated` at `<TooltipProvider> … <StoryPage> …
<FourierField>`. Benign but noisy; traceable to a fragment/comment root inside a `fade-slide` transition.

---

## Recommended remediation (gestalt, architectural — no patches)

1. **Adopt `<VizStudio>`** (the aurora/concentric chassis) — kills the double-header (BUG-1), gives the
   bigger `min(78vh,720px)` field (struct #4), and unifies the studio family. Move the violet `--motion-accent`
   masthead into `#masthead`; delete the SFC `<header>` + its long blurb (lang #6).
2. **Decompose into per-concept glassy cards** OR float the transport over the field — give each axis group
   its own glass card so the morphism reads, and reclaim vertical space for a BIGGER canvas (struct #4).
3. **Leverage the dock APIs** — replace the `<Configurator>` preset-chip switch with a dock
   contextual-switch / `DockLayerGroup` register, and animate preset transitions (audit directive #2).
4. **Dogfood `<Switch>`/`<ToggleChip>`** for showEpicycles/rainbowChain instead of raw `<input checkbox>`.
5. **Add a PAPER register** (paper-grain / blueprint-grid / `paper-ink-mark` axis labels) — apt for a math
   teaching surface and currently absent (suffusion #3).
6. **Standardize the siblings** — aurora/blob eyebrows to `@mkbabb/glass-ui/aurora` / `…/goo-blob` (this
   page is the compliant model).
