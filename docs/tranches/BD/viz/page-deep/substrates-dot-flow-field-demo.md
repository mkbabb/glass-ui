# Pass-E META-STORYBOOK deep audit — substrates/dot-flow-field

- **Import:** `@mkbabb/glass-ui/dot-flow-field`
- **SFC:** `demo/stories/substrates/dot-flow-field.vue`
- **Live:** http://localhost:5173/substrates/dot-flow-field
- **Manifest row:** `demo/stories/manifest.ts:636-646` (`hero: true`, `heroScale: "hero"`, `background: "grid"`)
- **Component API:** `src/components/custom/dot-flow-field/constants.ts:42` (`FlowFieldConfig`, 15 axes)
- **Verdict:** REBUILD — the page is the OLD flat ShowcaseFrame+3-Switch shape; its rich-studio siblings (concentric/aurora/blob/paper-grid) already moved to `VizStudio`/`<Configurator>`. Plus two live BUGS.

This is one of the three laggard viz pages (with `dot-matrix.vue` + `goo-dot.vue`) still on the pre-`VizStudio` shape. The contrast with `concentric.vue` (same band, same author-era target) is stark and is the spine of every finding below.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + exercise the FULL API?

**NO. This is the dominant defect.** `FlowFieldConfig` (`constants.ts:42-75`) exposes **15 tunable axes**:
`waveComponents`, `windSpeed`, `curlStrength`, `gridPitch`, `dotSize`, `displaceAmp`, `springK`, `waveBandCenter`, `waveBandWidth`, `contrast`, `coherence`, `globeMask`, `palette`, `background`, `interactive`.

The demo (`dot-flow-field.vue:58-77`) exercises **ZERO of them via live controls** — it ships exactly **three boolean `<Switch>`es**:
- `mono-on-near-black reference` preset toggle (`:60`)
- `interactive` (`:67`)
- `paused` (`:74`)

So a visitor can never see the LARGE-wave sweep change speed (`windSpeed`), the lattice tighten/loosen (`gridPitch`), the band widen (`waveBandWidth`), the curl break engage (`curlStrength`), the globe mask (`globeMask` — exposed in config, only reachable via the buried reference preset), or re-tint the palette. The single most expressive axis the blurb sells ("a broad bright iso-band crosses the field like a tide") — `waveBandCenter`/`waveBandWidth`/`contrast` — is **completely un-demonstrable**.

**Reference for what BEST looks like — `concentric.vue` (same band):** a full right-side `<Configurator>` with ~12 live `<ConfiguratorRow>`s grouped into 3 `<ConfiguratorLayer>` sections (families, base wavelength, beat detune, ellipsoid tilt, render mode, line width, line softness, contour levels, speed, pointer-reactive, theme, paused) — `concentric.vue:116-265`. dot-flow-field should be the IDENTICAL shape; it has MORE axes than concentric and demonstrates fewer.

**Contextual-switching / dock APIs:** none. No `<DockStack mode="facets">`, no contextual layer switch, no preset CAROUSEL — the "leverage the dock APIs" mandate is entirely unmet. The preset switch is a bare Switch, not even a `<Configurator>` preset chip row.

## (2) COMPONENT ABILITY — does it deftly compose a SERIES of glass-ui components?

**NO — thin and flat.** The page composes only:
- `StoryPage`, `StorySection`, `ShowcaseFrame` (demo chassis)
- `Switch` ×3, `Label` ×3 (`:12-13`)
- `DotFlowField` ×1

That is it. No `<Configurator>`/`<ConfiguratorLayer>`/`<ConfiguratorRow>`, no `<ColorSwatch>`, no `<LabeledSlider>`/`<LabeledSelect>`/`<LabeledSwitch>`, no tabs, no buttons, no dock. Compare the deft series in `concentric.vue` or `aurora.vue` (which composes the shared `VizStudio` → `Configurator` + `ColorSwatch` + labeled fields). The page reads as a placeholder, not a designed showcase.

## (3) GLASS SUFFUSION — is the glass demoed over a LIVE colorful field?

**NO.** Two compounding problems:
- **Static, colorless backdrop.** Manifest declares `background: "grid"` (`manifest.ts:642`) — a flat paper grid wash, not a live colorful aurora. The viz frame is `ShowcaseFrame tier="field"` (`:79`) which correctly drops the opaque plate, but there is nothing colorful behind it — the dots float over near-white cream. Live capture confirms: gray-on-cream, the morphism does not read at all.
- **The dots themselves are the only "field."** This viz IS a procedural field, so the *natural* fix is to let it be vivid — but the warm-cream default over a cream page is near-invisible. The reference preset (mono-on-near-black) is the only legible look and it is buried behind a Switch defaulting OFF.

There is no GLASS card demoed over a colorful field here at all (the user's "glass demos over COLORFUL aurora backgrounds" bar is unmet). PAPER morphism: the grid wash is present but inert — not leveraged as a designed paper layer.

## (4) STRUCTURE — own glassy card per sub-section? main card BIG enough?

**Partially / NO.**
- **Single sub-section, single frame.** The whole page is ONE `StorySection` (`:53`) → one `ShowcaseFrame` (`:79`). There is no "each sub-section in its own glassy card" because there are no sub-sections — controls, stage, and PRM note are stacked bare. A proper studio would have: a stage card, a controls card (right column), and a gallery of state cards below.
- **Main card too SMALL.** The viz frame is a hardcoded `h-[460px]` (`:80`). Sibling studios use `h-[min(78vh,720px)]` (`concentric.vue:116`, `VizStudio.vue:81`) — i.e. ~720px / 78vh. 460px is ~36% smaller than the band standard. The mandate "main card area BIGGER (more screen space)" is directly violated, and worse, the giant `heroScale: "hero"` title eats the top ~900px of viewport so the actual viz is pushed far below the fold.

## (5) PATH-LABEL standardization

**PASS (one nit).** The hero chip renders `@mkbabb/glass-ui/dot-flow-field` (Fira-Code chip, live-verified) from `manifest.ts:226`. Correct and standardized. Nit: the blurb tail still says "Shipped /dot-flow-field." (`manifest.ts:640`) — the bare `/dot-flow-field` short-form is redundant now that the chip carries the full path; tighten/drop it.

## (6) LANGUAGE — superfluous prose to tighten?

**YES — heavily.** The in-SFC blurb (`dot-flow-field.vue:56`) is a **single 90+ word run** packed with SHOUTING caps and parentheticals: "anchored dot-matrix (NOT a free particle cloud)", "a broad bright iso-band crosses the field like a tide", "the regime inverted to the LOW-frequency coherent band (one dominant wave, a faint curl break). WebGPU-FIRST: …", "ONE GL context (the field's own) — the one-GL-per-route budget held." The one-GL-budget note is internal-tranche bookkeeping, not user-facing copy.
- The PRM note paragraph (`:89-96`) repeats "the lattice freezes mid-sweep, the shape held. The grid is the stable canvas; the sweeping bright band is the slow brush" — editorializing the same fact twice.
- Switch label `:64` "mono-on-near-black reference (off = warm-cream identity default)" — the parenthetical is dev-speak; a tooltip is the home for it.
- Manifest blurb (`manifest.ts:640`) duplicates the SFC blurb's physics-paper citations.

Tighten to one or two plain sentences; move mechanism detail to tooltips (the `concentric.vue` tooltips are the model).

## (7) BUGS (live-verified on :5173, DPR 2)

- **BUG-1 (CRITICAL) — canvas backing store stuck at 300×150.** Live: `canvas.width=300, canvas.height=150` while CSS box is 1152×1585 — render ratio **0.26**; at DPR 2 it should be ~2304 wide. The WebGPU substrate's backing-store resize never fires for this mount, so the field renders at ~13% resolution and is stretch-upscaled → the dots are fuzzy gray smudges (visible in capture), not crisp warm-cream dots. This alone makes the viz look broken. (`useGpuSubstrate`/`useWebGPUCanvas` resize path — the demo gives the canvas no explicit pixel size and the substrate isn't picking up the 460px frame rect.)
- **BUG-2 (HIGH) — sticky hero title overlaps the viz.** Live (scrolled): `.story-hero-shrink` is `position:sticky; z-index:2` and its `<h1>` bottom sits at y=408 while the canvas top is at y=40 — a **368px overlap**. The giant "Dot Flow Field" title composites ON TOP of the dot field AND the three Switch controls (capture shows the title bleeding across the controls row). Acute here because `hero:true` + a short page + a `tier="field"` transparent frame = nothing masks the sticky title. The `heroScale:"hero"` (largest rung) makes it worse. Likely a shared StoryPage/StoryHeader sticky-shrink issue, but this page is the worst exhibit.
- **BUG-3 (secondary) — canvas CSS height 1585px** vs the `h-[460px]` frame (`:80`). The `absolute inset-0` canvas appears to resolve a much taller box than its rounded-card parent — worth confirming the frame actually clips to 460px (the giant hero may be inflating the stacking context). At minimum the backing-store bug (BUG-1) must be read together with this.

---

## Recommended rebuild (architectural, not a patch)

1. **Adopt the shared `VizStudio` chassis** (the concentric/aurora pattern): stage LEFT, full `<Configurator asideSide="right">` RIGHT. Promote ALL 15 axes to live `<ConfiguratorRow>`s grouped into `<ConfiguratorLayer>` sections (Wave · Lattice · Sweep-band · Motion & theme), color via `<ColorSwatch>`, tooltips per row.
2. **Main card to `h-[min(78vh,720px)]`** (drop the 460px), and demote the hero — set `hero:false`/`background:"grid"` (the concentric row shape) so the studio is the focal element, not a giant title. This also kills BUG-2 by construction (no sticky hero over the field).
3. **Fix BUG-1** — ensure the WebGPU substrate resizes the backing store to the display rect × DPR (the field must render crisp).
4. **Demo glass over a LIVE colorful field** — either default the viz to a vivid palette over a dark/aurora ground in-stage, or host the studio's glass chrome over a colorful aurora so the morphism reads (the user mandate). At minimum default the legible mono-on-near-black or a saturated palette, not invisible cream-on-cream.
5. **Add a contextual/dock affordance** — a `<DockStack mode="facets">` or preset CAROUSEL for the named presets, exercising the dock APIs the mandate names.
6. **Tighten copy** — one plain sentence + tooltips; drop the one-GL-budget bookkeeping and the doubled PRM editorializing.

## 5-LINE VERDICT
1. REBUILD: dot-flow-field is the OLD flat ShowcaseFrame + 3-Switch shape while siblings (concentric/aurora/blob/paper-grid) already moved to the rich `VizStudio`/`<Configurator>` controls-right studio — it must adopt that chassis.
2. API massively under-demoed: 15 `FlowFieldConfig` axes, ZERO exposed as live controls (only preset/interactive/paused toggles); the iso-band sweep the blurb sells is undemonstrable; no dock/contextual-switching affordance.
3. Two live BUGS: (a) CRITICAL — canvas backing store stuck at 300×150 vs 1152px CSS (0.26 ratio) → fuzzy gray dots; (b) HIGH — sticky `heroScale:"hero"` title overlaps the viz+controls by 368px (z-index:2 over a transparent field frame).
4. Glass suffusion fails: viz floats on a flat cream `grid` wash (no live colorful aurora), warm-cream dots near-invisible; main card is a hardcoded 460px (band standard is `min(78vh,720px)`) and the giant hero pushes it below the fold.
5. PASS items: path chip `@mkbabb/glass-ui/dot-flow-field` is standardized and correct; FIX items: kill the giant hero, tighten the 90-word SHOUTING blurb + doubled PRM note to plain copy with per-row tooltips.
