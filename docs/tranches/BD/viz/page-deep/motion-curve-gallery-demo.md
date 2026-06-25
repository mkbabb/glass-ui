# Pass-E META-STORYBOOK DEMO audit — motion/curve-gallery

- **Page:** `motion/curve-gallery`
- **Import label (rendered):** `@mkbabb/glass-ui/easing` ✓ (matches manifest)
- **SFC:** `demo/stories/motion/curve-gallery.vue`
- **Live:** http://localhost:5173/motion/curve-gallery
- **Manifest:** `demo/stories/manifest.ts:310` (path-label) · `:1054` (row, `background: "grid"`)
- **Substrate (live, verified):** `canvasCount: 0` — NO live GL field. The "grid" CSS wash only.

The demo is FUNCTIONALLY correct and faithfully drives the real value.js/keyframes twins, but it FAILS the BD design north-star on four of the seven axes: glass suffusion (no live field), structure (no per-subsection glass cards + a duplicated title), component-series composition (thin — no dock/tab/aurora/procedural composition), and main-card sizing.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + exercise the full API?

**Mostly YES on the EasingPicker primitive, but the page's headline component is under-shown.**

- The Custom family renders `<EasingPicker mode="bezier">` AND `<EasingConfigurator>` (chassis-seated), and the Steps family renders `<EasingPicker mode="steps">` (`curve-gallery.vue:270,276,298`). Live-verified: `hasCubicReadout: true`, `customVisible: true`, configurator present. Good — both modes + both register shapes (bare + Configurator-seated) are exercised.
- **But the EasingPicker is the page's real published component and it is rendered TINY and buried.** Live: `easingPickerWidth ≈ 217px` in Custom mode. The curve editor — the draggable-handle, live-readout hero of `@mkbabb/glass-ui/easing` — is a cramped ~217px box on the left, while 90% of the page is STATIC reference plots (read-only SVG polylines + a driven dot). The demo leads with the static taxonomy and treats the actual interactive primitive as an afterthought in ONE of twelve tabs (`v-if="activeFamily === CUSTOM_FAMILY"`). The component-at-its-BEST would lead with a LARGE, focal curve editor.
- Full API: `mode` (bezier/steps) ✓; `EasingConfigurator` shell ✓. Not shown: the picker's `v-model` payload readback wired to a live consumer (e.g. drive a real card transition off the authored curve — the "author → apply → watch" loop the boundary-law promises). The travelling-dot playback IS demonstrated on the static cards, but not OFF the user-authored Custom curve.
- Contextual switching: the 12-family chip rack IS a switcher, and it works (live: all 12 chips render + select). But it is a demo-LOCAL CSS chip rack, not a glass-ui switching component (no `<SegmentedTabs>`, no dock contextual-layer API). The BD ask "leverage the dock APIs (contextual switching/animating)" is unmet — the family switch is a plain `background` CSS transition, no morph/spring.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

**THIN.** Live-verified the page composes essentially ZERO library surface components:

- `usesTabs: false` — no `<SegmentedTabs>` (the family switcher is hand-rolled `.curve-chip` buttons, `curve-gallery.vue:415-470`).
- `usesAuroraComp: false` — no `<Aurora>` / procedural viz.
- Page-composed docks: ZERO (the 2 `.glass-dock` on-page are the demo SHELL nav docks, present on every route — not composed by this page).
- The only library components are `<EasingPicker>`/`<EasingConfigurator>` (the subject), `<FadingScroll>` (chip overflow), `<Select>` (narrow floor), `<StoryPlayButton>` (demo chassis). The doctrine section is two RAW `<table>` elements (`:366-396`).
- The BD ask "each page deftly uses a series of glass-ui components (docks/procedural-anims/cards/tabs/buttons)" is not met. A motion page is the ideal place to compose: `<SegmentedTabs draggable>` for the family axis (it IS the tab use-case), a `<Card pressable>` for the per-curve plot, a procedural viz (`<Concentric>`/`<DotFlowField>`) as a live motion backdrop, a real `<Button>` driven by the authored Custom curve.

## (3) GLASS SUFFUSION — live colorful field, or flat?

**FLAT — the headline failure.** Live-verified `canvasCount: 0`. The cards are `glass-card` with real `backdrop-filter: blur(8px) saturate(1.05) brightness(1.02)` (`cardBackdrop` confirmed) — but there is NOTHING colorful behind them. The page background is the `grid` CSS wash (`manifest.ts:1062`), chosen explicitly to spend the one-GL-per-route budget on `springs` instead. So every `glass-card` blurs a flat warm-grey page → the morphism reads as **grey-on-grey**, exactly the iOS-26 six-layer optical composite NOT reading (no backdrop chroma to refract, no edge rim against a field, no inner catch-light catching anything).

- The SFC header comment (`:16-18`) literally admits the prior "grey-on-grey kill" and the fix was "a calm `grid` substrate so the glass POPs" — but a grid wash is not COLOR. The BD north-star is explicit: "glass demos over COLORFUL aurora backgrounds." A blueprint grid is monochrome.
- **PAPER morphism:** absent. A curve/math gallery is a prime PAPER-morphism candidate (the `paper-grain-overlay` + blueprint-grid + fira-code math idiom — the `math-paper.vue` gold standard). The plots are mathematical; a paper register would be apt and is missing.
- Verdict: glass present, suffusion absent. Either put a contained `<Aurora>`/procedural field behind the curve cards (budget permitting), or commit to a designed PAPER register — currently it is neither.

## (4) STRUCTURE — each sub-section its OWN glassy card? main card BIG enough?

**NO on both.** Live-verified:

- The StorySection roots are `backgroundColor: rgba(0,0,0,0)`, `borderRadius: 0px` — **transparent, not cards** (`ssRoots` probe). The doctrine table wrappers are `backgroundColor: rgba(0,0,0,0)`, `backdropFilter: none` (`tables` probe) — bare bordered tables on the page wash.
- The ONLY card on the page is the single giant StoryHero masthead wash card that wraps the ENTIRE page body. So the structure is: one big flat card containing (a) the chip rack, (b) a 2-col grid of small `glass-card` plot tiles, and (c) two naked tables. The user's ask "each sub-section in its OWN glassy card" is unmet — "The curve canon" and "Easing doctrine" and the "House Material cores" should each be a distinct glassy card; currently they are flat regions in one container.
- **Duplicated title (BUG-adjacent):** there are TWO "Curve Gallery" headings stacked — the StoryPage chrome `<h1>` (black, top) AND a second masthead `<header>` purple display heading inside the body (`curve-gallery.vue:197-205`). Live `h1s: ["Curve Gallery"]` (one semantic h1) but the page paints the title TWICE visually (the black chrome title + the purple in-card title). This is the W-HIERARCHY2 "title shown ONCE" rule violated — the in-card purple masthead duplicates the chrome title. Screenshot confirms both render, stacked, ~600px apart.
- **Main card size:** `main` content column ratio `0.94` of viewport. The masthead card is wide enough, but the AREA devoted to the actual subject (the live editor) is small — the BD ask "the main card area BIGGER (more screen space)" reads as: give the interactive curve editor a large focal stage. Currently the focal area is consumed by static reference grids; the live editor is ~217px.

## (5) PATH-LABEL standardization

**PASS.** Renders `@mkbabb/glass-ui/easing` (screenshot + `manifest.ts:310`). Standardized, correct, single source of truth in the manifest path-label map. No action.

## (6) LANGUAGE — superfluous prose to tighten?

Several over-long, capital-shouting blurbs:

- `curve-gallery.vue:209` (StorySection "The curve canon" blurb): a 60-word run-on listing all 11 families inline AND restating the manifest description. The family list is already the chip rack — the prose re-enumerates it. Tighten to one sentence.
- `manifest.ts:1056` description duplicates the same family enumeration AGAIN (third copy of "Standard/Sine/Quad/...").
- `:84` Custom blurb "the path is the real CSSCubicBezier twin from value.js, the same evaluator the library samples" — internal-implementation detail leaked into user-facing copy; tighten to "drag the points to author a curve."
- `:386` House Material cores caption: "(the library's own bezier tokens — distinct from the CSS Standard keywords above)" — parenthetical over-explanation.
- "REAL JS twin" / "FULL" / capitalized SHOUTING appear repeatedly in user-facing blurbs (`:209` "REAL JS twin", "FULL motion taxonomy"). Per the writing-style memory (no grandiloquence, no shouting), drop the all-caps emphasis from rendered copy.

## (7) BUGS / dead demos

- **Duplicate title** (see §4) — the chrome `<h1>` + the in-body purple masthead both paint "Curve Gallery". Visual duplication.
- **Custom EasingPicker cramped/clipped** — at scroll ~950 the picker's top is clipped by the card edge; ~217px wide box, two stacked editors (`EasingPicker` + `EasingConfigurator max-w-sm`) in a narrow left column with dead space to the right.
- No dead animation found: the driven dots fire (the static-card play path works), the chip switching works, the Custom editor is live. Reduced-motion path present (`:125-138,135`).
- No console errors observed in navigation.

---

## Priority fixes (architectural, BD)

1. **Suffuse over a live colorful field** — contain an `<Aurora>` (or a procedural viz as a motion-apt backdrop) behind the curve cards so the glass actually refracts color; OR commit a designed PAPER register (math-paper idiom) for the mathematical content. Not a flat grid wash.
2. **Per-subsection glass cards** — wrap "The curve canon", "Easing doctrine", "House Material cores" each in its OWN glassy card; the doctrine tables especially should be glass surfaces, not naked `<table>`s.
3. **Kill the duplicate title** — suppress the in-body purple masthead (it duplicates the chrome `<h1>`), per W-HIERARCHY2 "shown ONCE."
4. **Lead with a LARGE live editor** — promote `<EasingPicker>` to a big focal stage (the component-at-its-best); drive a real `<Button>`/`<Card>` transition off the authored Custom curve to close the author→apply→watch loop.
5. **Compose a real component series** — replace the hand-rolled `.curve-chip` rack with `<SegmentedTabs draggable>` (the canonical contextual switcher) or a dock contextual-layer API; make the family switch ANIMATE (morph/spring), not a CSS color fade.
6. **Tighten copy** — collapse the triple family-enumeration, drop the all-caps shouting and the implementation-detail leak from user-facing blurbs.
