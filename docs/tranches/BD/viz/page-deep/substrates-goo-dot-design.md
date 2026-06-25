# substrates/goo-dot — FRONTEND-DESIGN deep critique (Pass-E)

**Page:** `demo/stories/substrates/goo-dot.vue` · live `http://localhost:5173/substrates/goo-dot`
**Lens:** frontend-design skill (distinctive, production-grade, AVOID generic-AI) applied to glass-ui's own language.
**North star:** DESIGN.md (iOS-26/27 Liquid Glass — the six-layer optical composite + 7 tiers + glass-cannot-sample-glass + spring physics) · design-idioms · motion-canon · affordance-map · PROCEDURAL-SUITE · the dock APIs.
**Captured:** desktop 1680-wide, light. Single inner `.demo-main-scroller` (sh 2582 / ch 806). Structural defects below are mode-invariant.
**Measured at HEAD:** 1 `<canvas>` (WebGL2), backing store **300×150** stretched to 1020×460; `h1` font-size **273.6px**; viz wrapper bg `rgba(0,0,0,0)` (transparent); 3 native `<Switch>`; 0 `DockBackgroundToggle`; 0 page-composed dock; 2 `<StorySection>` (the page + the body); no aurora ground.

---

## VERDICT IN ONE BREATH

This is the **dot-matrix defect class re-shipped** — and it is the worst page in the substrates band tied with its sibling, for the same structural reasons, not taste. The audacious `<h1>` ("Goo Dot-Matrix") renders at 273px and z-stacks over its own blurb and control row; the 460px viz frame paints a **literal empty void** (warm-cream field-driven dots over a `tier="field"` TRANSPARENT plate sit on a warm-cream page and disappear *by construction*, and the `<canvas>` backing buffer is the uninitialized **300×150** default stretched 3.4×); the blurb is a 7-line ALL-CAPS engineering changelog; and the page delivers ZERO of the six things the user asked for — no per-subsection glassy cards, no bigger main stage, no dock-API contextual switching, no deliberate component series, no colorful aurora ground, and the import label is repeated three times. It currently reads as a giant word over white space with three checkboxes piled into it. The fix is not a patch — it is the gestalt transposition onto the **shared `VizStudio` chassis** the page conspicuously does NOT use.

---

## 0. THE SINGLE MOST DAMNING FACT

**This page ignores `demo/stories/substrates/VizStudio.vue`.** The chassis exists, is documented (BC.W-VIZ-CONFIGURATOR-SUITE, single-writer discipline), and is the SHAPE every viz studio is mandated to compose: `<Configurator asideSide="right">` with the live STAGE on the left and a full `<ConfiguratorRow>`/`<ConfiguratorLayer>` controls column on the right, the rounded `shadow-cartoon` glass inspector frame, the audacious shrink-on-scroll hero, the Fira-Code subpath chip ON the card. `aurora.vue` composes it. `goo-dot.vue` instead hand-rolls a flat `<StorySection>` + `<ShowcaseFrame tier="field">` + three raw `<Switch>` rows — the exact pre-chassis fork the discipline forbids. **Every one of the user's six asks is already satisfied by adopting `VizStudio`.** That is the headline move; everything below is what falls out of it.

---

## 1. THE BLOCKING DEFECTS (must die before any "design" conversation)

Render failures, not opinions. See `_cap-goo-dot-viz2.png`.

1. **The hero z-stacks over its own body.** "Goo Dot-Matrix" at 273px (`text-display-audacious`) overflows its block and the blurb paragraph + the `dot-field/dot-dither/dot-lattice/dot-sphere` variant button row + the three switches collapse into the SAME pixels — the blurb text reads literally on top of the buttons in the capture. **Violates** the W-HIERARCHY2 reading-order cluster (eyebrow→title→blurb top-to-bottom, NEVER overlapping) and the §"audacious-type uplift" CEILING (display tiers land on the hero `<h1>` ALONE — here the title eats the controls). On a world-class page the eye lands on ONE thing; here it lands on a collision.

2. **The viz is INVISIBLE — a void where the hero specimen belongs.** The `<GooDotMatrix>` canvas backing store is **300×150** (the uninitialized `<canvas>` default) painted at 1020×460 — the substrate never sized to its container, so the field is a 3.4×-stretched smear at best. Compounding it fatally: `ShowcaseFrame tier="field"` strips the plate to `transparent`, so a **warm-cream field-driven dot cloud over a transparent ground sits on a warm-cream page and vanishes.** The entire reason this page exists — the goo+dot HYBRID, the metaball-SDF-drawn-as-dot-matrix, dense+bright inside the blob, sparse+dim at the rim — is **not on screen.** Two root causes (canvas-size + plate-color + no contrasting ground), all three must be fixed.

3. **The dock CTA grazes the title region** (the recurring W-CHIP-GRAZE / `--dock-content-safe-inset` class) — the demo-shell nav dock icon sits at the very top-left edge with no content gutter on this route; the ℱ wordmark glyph touches the eyebrow band.

Until 1–3 die, nothing else matters — a premium page that renders a collision over a void is worth zero.

---

## 2. VISUAL HIERARCHY — does the eye land right?

**No.** The ladder is right on paper (audacious `<h1>` → mono eyebrow → blurb → focal viz) and the √φ typographic ambition IS the brand's strength. Three failures break it:

- **The title is too big for its job and is the only living thing.** At 273px the word "Goo" alone fills the viewport. The audacious tier is the fast.com-peg register (§"audacious-type uplift"): correct as ONE focal beat, wrong as the protagonist of a *substrate showcase* whose protagonist is the goo-dot field. The word out-shouts the demo.
- **The blurb is a 7-line wall of ALL-CAPS-shouting prose** — "FIELD OF DOTS", "DENSE, BIG, and BRIGHT", "THICKENS", "SAME field", "WebGPU-FIRST", "ONE GL context". This is the "tighten superfluous language" ask verbatim. It reads as a changelog, not editorial copy, and violates the calm-content idiom (a hero specimen wants ≤2 sentences of lede; the mechanism detail belongs in a caption or a disclosure). The `v = thickness(sceneDistG(cellCenter))` tixy-on-an-SDF line is genuinely the page's most interesting idea and it is buried in paragraph 1 mid-shout.
- **No section rhythm.** ONE `StorySection`. No second beat, no WARM-vs-REFERENCE framing, no per-variant tour, no dock-driven facet switch, no live readout. Eye lands on title → falls into void → finds a footer caption. Three stops, two dead.

**Move:** demote the title to `text-display-3` as a *masthead* (the §"motion + studio page TITLES lift to the DISPLAY register" idiom — `text-display-3` on a page-local `<header>` with `--motion-accent` violet as the ONE color event) and promote the **viz to the hero protagonist** in a big glass card. Let the dot-field be the thing the eye lands on.

---

## 3. THE USER'S ASKS, ONE BY ONE

### (a) "each sub-section in its OWN glassy card"
Currently: ZERO page-composed cards — flat column on the bare page wash (the 7 `card`-classed nodes measured are the demo-shell chrome, not content cards). **Move:** split into a small glass-card set — (i) the hero VIZ card (big, `glass-floating`, or the OPT-IN `.glass-deep` tier BB.W-DEEP-GLASS reserves precisely for "the hero glass, the dock, the CTA"); (ii) a controls card (the `<Configurator>` right column via `VizStudio`); (iii) a "how it reads" specimen card — the depth/thickness math (`v = thickness(sceneDistG(cell))`) shown as a small frozen still + a one-line caption. Each card composes the **six-layer composite (DESIGN.md §L1):** backdrop blur+saturate · surface tint · edge rim · inner catch-light · drop shadow · grain. Right now there is not ONE content glass surface on a glass-UI showcase page — a glass demo with no glass.

### (b) "the main card area BIGGER (more screen space)"
The viz is `h-[460px]` in a column that wastes the right two-thirds of a 1680px viewport as margin. **Move:** the hero viz card is a wide, tall stage — `VizStudio`'s default `h-[min(78vh,720px)]` envelope, full content-width, the goo-dot field centered and large with the `#stage` `rounded-card overflow-hidden` reaching the canvas pixels. The current 460px letterbox is timid; the field needs room for the orbit→merge→bridge→absorb show to read.

### (c) "leverage the dock APIs (contextual switching/animating)"
ZERO dock usage — three raw native `<Switch>` rows piled into the title. The biggest missed opportunity. The preset/variant/interaction state IS a contextual-switch problem. **Move:**
- The four `GooDotVariant` registers (`dot-field` · `dot-dither` · `dot-lattice` · `dot-sphere`) are a textbook **`<DockStack mode="facets">`** (BE.W-DOCK-RAIL-REALIZE) or `<DockLayerGroup>` — each variant a dock facet chip with its OWN accent hue via `--glass-accent` / `--glass-accent-strength` (BB.W-GLASS-ACCENT per-instance chromatic rim), the active facet lifting onto the `--dock-control-active-bg` selected-as-glass tier (W-REGISTER-IOS). Switching the dither↔lattice↔sphere render mode should MORPH (the contextual-layer crossfade), not flip a flat button whose only active state today is `bg-card`.
- The WARM ⇄ REFERENCE material switch is a `<SegmentedTabs variant="pill">` two-material register, not a checkbox labeled with a 12-word sentence.
- The `paused` switch is the textbook **`<DockBackgroundToggle>`** (WCAG 2.2.2 Pause/Stop/Hide) bound to the substrate `pause()`/`resume()` seam — currently a raw Switch labeled "paused", which is uglier AND less correct (the shipped control carries the `aria-pressed` + Pause↔Play glyph contract the bare Switch lacks).

### (d) "each page deftly uses a series of glass-ui components"
HEAD uses: `StoryPage`, `StorySection`, `ShowcaseFrame`, native `Switch`, native `Label`, `GooDotMatrix` — ONE library viz + two atoms. A deft page composes a *series rendered as a working instrument*: `Configurator`/`ConfiguratorRow`/`ConfiguratorLayer` (the tunable axes — dot density, blob radius, satellite count, smin bridge-k, palette) · `DockStack`/`DockLayerGroup` + `DockBackgroundToggle` (the facet + pause chrome) · `SegmentedTabs variant="pill"` (WARM⇄REFERENCE) · `Card`/`ScrollCard` (the subsection cards) · `Button variant="glass"` gleaming on `vSpecular` (a "randomize seed" / "reset" CTA) · `IconChip` (the eyebrow pop, `:reveal`+`:bloom` per W-SUFFUSE3) · `MetricStack`/`MetricCell` (a live readout: dot count, FPS, peak bridge-thickness, facing-ratio — the instrument the viz IS). None of these appear today.

### (e) "glass demos over COLORFUL aurora backgrounds"
The deepest contradiction. `CATEGORY_DEFAULT_BG` (BA.W-STAGE) assigns `substrates → aurora`, but this route renders on the flat paper wash (measured: 1 canvas only, body bg transparent, no aurora) — AND even with aurora present, the `tier="field"` warm-cream dots would still vanish into it. **Move:** put a real **colorful aurora** behind the page and let the glass cards + the goo-dot field read AS glass over a live colored field — the AX.W54 glass-first identity ("the blur is imperceptible over a flat substrate; the rich backgrounds make glass POP"). A goo-dot field bridging its satellites over a living aurora is a hero image; warm-cream dots over warm-cream is nothing. Respect the **one-GL-per-route budget** + DESIGN.md §L1 **glass-cannot-sample-glass**: the `<DockStage>` pattern (ONE shared offscreen-paused aurora behind the column, monotone Z-stack Aurora→Dock→Card) is the sanctioned way to get a colored ground without a second GL context fighting the field's own — and the field's transparent ground must composite over the aurora through a SINGLE composition container, never two `backdrop-filter` plates at the same z-tier.

### (f) "standardize the import-path label"
The import path appears THREE times in three forms: the eyebrow chip `@mkbabb/glass-ui/goo-dot-matrix` (good — the standardized Fira-Code pill), then "Shipped `@mkbabb/glass-ui/goo-dot-matrix`" again opening the footer caption, then the mechanism `code` runs. **Move:** ONE standardized label (the eyebrow code-pill is the canonical home, as `VizStudio` + the manifest already render it); delete the footer prose repetition.

### (g) "tighten superfluous language"
The blurb is ~110 words of capitalized changelog. Target ≤2 sentences: *"A merging metaball drawn entirely as a dot matrix — dense and bright inside the blob, sparse and dim at the rim. The dot size reads the SDF thickness (`v = thickness(sceneDistG(cell))`): tixy.land applied to a signed-distance field."* The WebGPU-first / fallback / one-GL-budget / PRM detail moves to a caption or an `<ExpandableContainer>` "how it works" disclosure — present, not shouted.

---

## 4. ANIMATION AFFORDANCE — is every element ALIVE at the iOS-27 bar?

**Almost nothing is alive; the one thing that should be (the field) is invisible.**

- **Entrance:** the page inherits the W-HIERARCHY2 `.scroll-build` GRAVITY cluster in principle, but with the title overflowing and the viz void there is no perceivable choreography — nothing arrives because nothing reads.
- **Hover:** the four variant buttons are bare `rounded-button border` toggles — no `vSpecular` gleam (W-LIQUIDHOVER tier-root auto-arm), no `--spring-smooth` lift, no glass hover register. They are the generic-AI flat-pill look the frontend-design skill explicitly warns against. A `<SegmentedTabs variant="pill">` would give them the gliding+squishing indicator (`--spring-snappy`, `--tab-indicator-max-stretch`) for free.
- **Press:** native `<Switch>` carries reka's default; no `useSpringPress`/`useLiquidPress` coupled spring-press (BB.W-PRESS-UNIFY), no `--*-press-t` brightness/specular coupling.
- **State / contextual switch:** flipping `dot-field`→`dot-sphere` is an instant config mutation with NO morph — exactly where the dock contextual-layer crossfade (motion-canon P1 spatial-spring, P3 fade-coupled-to-transform) belongs. The whole point of the dock APIs is that a context switch ANIMATES.
- **The field itself:** the spec promises field-lean toward the cursor, dot swell + brighten near the pointer, and a flick-fired accel bloom (`usePointerVelocityField`, BB.B4) — all genuinely iOS-27-grade. NONE of it is verifiable because the canvas is unsized and invisible. The single best animation in the system is shipped dead on this page.

**Bar:** motion-canon P1–P6 — spring-iff-spatial, enter-bouncy/exit-no-overshoot, fade-coupled-to-transform, per-spring duration clock, compositor-only, PRM-keeps-fade-drops-transform. The page consumes NONE of it at the chrome level today.

---

## 5. POLISH + DISTINCTIVENESS — bespoke or generic-AI?

**Generic-AI-template, by omission.** A flat centered column, a giant sans title, three checkbox rows, and a blank rectangle is the canonical "AI built me a demo page" silhouette. The project OWNS a bespoke language — the √φ audacious ladder, the six-layer Liquid Glass composite, the warm-cream paper-grain identity, the dock contextual-switch system, the seven glass tiers, the procedural-suite vizzes — and this page uses essentially none of it. The distinctiveness is one `VizStudio` adoption away: a colorful aurora ground, a deep-glass hero stage with the goo-dot field bridging its satellites, a dock facet-rail switching render modes with per-facet accent hues, a configurator-right inspector, a live MetricStack readout — THAT is bespoke and premium. What ships now is the template.

---

## 6. SPACING / RHYTHM + COLOR

- **Rhythm:** no golden-ratio cadence is legible because the title overflow destroys the vertical rhythm and the void has no internal structure. Adopting `VizStudio` inherits the √φ card padding ladder (BB.W-CARD-PAD — `--card-pad-inline` → `calc(×1.272)` block → φ-stepped footer) and the `--configurator-section-*` hierarchy vocabulary (AZ.W-HIERARCHY) for free.
- **Color / suffusion:** the one-color-event proportion (W-SUFFUSE) is technically intact (ink-only chrome), but ONLY because there is no color at all — a defensible-by-emptiness pass, not a designed one. The substrates band wants the `--motion-accent` violet masthead event + the aurora ground as the deliberate color; the goo-dot field's warm-cream identity then reads as the ONE warm protagonist over the cool field. Today: cream on cream, zero events, zero life.

---

## 7. TOP DESIGN MOVES (ranked, concrete)

1. **Fix the canvas size + the void (BLOCKING).** Size the `<GooDotMatrix>` backing store to its container (the 300×150→1020×460 stretch is a substrate-resize bug shared with dot-matrix); drop `tier="field"`-over-cream and give the field a CONTRASTING ground (the aurora). Without this the page is a void — fix first.
2. **Adopt `VizStudio`.** Replace the flat `StorySection` + `ShowcaseFrame` + raw Switches with `<VizStudio>`: `#stage` = the goo-dot field at `min(78vh,720px)`, full width, rounded-to-pixels; `#controls` = a real `<Configurator>` (dot density, blob/satellite, smin bridge-k, palette `<ColorSwatch>`, pause/PRM). This single move satisfies (a) cards, (b) bigger stage, (d) component series, and the rhythm/hierarchy inheritance at once.
3. **Wire the dock APIs (c).** `<DockStack mode="facets">` for the four `GooDotVariant` render modes (per-facet `--glass-accent` hue, active lifts to `--dock-control-active-bg`, contextual crossfade on switch); `<SegmentedTabs variant="pill">` for WARM⇄REFERENCE; `<DockBackgroundToggle>` for pause. Make every context switch ANIMATE.
4. **Colorful aurora ground via `<DockStage>` (e).** ONE shared offscreen-paused aurora behind the column, monotone Z-stack (DESIGN.md §L1 glass-cannot-sample-glass + one-GL-per-route budget), so the goo-dot field + the glass cards read AS glass over a living colored field.
5. **Demote the title to a `text-display-3` masthead** with the `--motion-accent` violet color event; let the field be the protagonist (§"audacious-type uplift" CEILING + §"motion/studio TITLES lift to DISPLAY").
6. **Tighten the copy to ≤2 sentences (g)** + ONE standardized import-path label (f); push the WebGPU/fallback/PRM mechanism into a caption or `<ExpandableContainer>` disclosure.
7. **Add a live readout** — `<MetricStack>`/`<MetricCell>` (dot count, FPS, peak bridge-thickness) — so the page reads as a working instrument, not a passive canvas. Bonus: the goo-dot field's distinguishing feature (the satellite→body BRIDGE thickening) becomes a *measured* hero beat.

---

*Captures:* `_cap-goo-dot-full.png` (the audacious-title-fills-viewport state) · `_cap-goo-dot-viz2.png` (the blurb-over-controls collision + the empty `tier="field"` void).
