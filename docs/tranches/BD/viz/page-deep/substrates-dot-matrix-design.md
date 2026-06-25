# substrates/dot-matrix — FRONTEND-DESIGN deep critique (Pass-E)

**Page:** `demo/stories/substrates/dot-matrix.vue` · live `http://localhost:5173/substrates/dot-matrix`
**Lens:** frontend-design skill (distinctive, production-grade, AVOID generic-AI) applied to glass-ui's own language.
**North star:** DESIGN.md (iOS-26/27 Liquid Glass — the six-layer optical composite + 7 tiers + glass-cannot-sample-glass + spring physics) · design-idioms · motion-canon · PROCEDURAL-SUITE · the dock APIs.
**Captured:** desktop 2000-wide, light. Both modes implied; the structural defects below are mode-invariant.

---

## VERDICT IN ONE BREATH

This is the single worst page in the substrates band right now, and not because of taste — because it is **structurally broken on the screen**. The hero `<h1>` z-stacks ON TOP of the blurb and the control row; the 460px viz frame paints a **literal empty void** (the warm-cream globe over a `tier="field"` transparent plate is invisible against the warm-cream page, and the canvas backing buffer is an un-sized 300×150 default stretched to 1032×460); and the page is a single flat `StorySection` column with zero of the things the user asked for (per-subsection glassy cards, a bigger main stage, dock-API contextual switching, a deliberate component series, a colorful aurora ground). It currently reads as a giant typographic title floating over white space with three native `<Switch>` rows piled into it. The fix is not a patch — it is the gestalt transposition the user named.

---

## 1. THE BLOCKING DEFECTS (must die before any "design" conversation)

These are not critique-of-taste; they are render failures. Reference photos in the capture set.

1. **The hero z-stacks over its own body.** "Dot Matrix" (`text-display-audacious`, ~350px) overlaps the blurb paragraph AND the toggle/switch control row AND "paused" — three independent text runs occupy the same pixels. This is the W-HIERARCHY2 `.scroll-build` cluster / `StoryHeader` GRAVITY entrance leaving siblings collapsed into one stacking region (or the audacious tier overflowing its line-box with no reserved block). On a world-class page the eye must land on ONE thing; here it lands on a collision. **Violates** the W-HIERARCHY2 reading-order cluster (eyebrow→title→blurb top-to-bottom, NEVER overlapping) and the §"audacious-type uplift" CEILING (display tiers land on the hero `<h1>` ALONE — here it eats the controls).

2. **The viz is INVISIBLE — a void where the hero specimen should be.** The `<DotMatrix>` canvas backing store reads **300×150** (the uninitialized `<canvas>` default) displayed at 1032×460 — the substrate never sized to its container, so either nothing is drawn or it is a 7×-stretched smear. Compounding it: `ShowcaseFrame tier="field"` strips the plate to transparent, so a **warm-cream globe over a transparent ground sits on a warm-cream page and disappears by construction.** This is the single most important defect: the entire reason the page exists — the fine-dot phyllotaxis sphere — is **not on screen.** Two root causes (canvas-size + plate-color), both must be fixed.

3. **The dock CTA grazes / collides with the title region** (the recurring W-CHIP-GRAZE / `--dock-content-safe-inset` class) — the left rail icon sits at the very top-left edge with no content gutter on this route.

Until 1–3 are fixed, nothing else matters — a premium page that renders a collision over a void is worth zero.

---

## 2. VISUAL HIERARCHY — does the eye land right?

**No.** The intended ladder is right on paper (audacious `<h1>` → mono eyebrow → blurb → focal viz), and the typographic ambition is genuinely the project's strength — the √φ audacious title IS the brand. But three failures break it:

- **The title is TOO big for its job here and is the only thing alive.** At ~350px the word "Matrix" alone fills a 2000-wide viewport top-to-bottom. The audacious tier is the fast.com-peg register (§"audacious-type uplift") — appropriate as ONE focal beat, but here it crowds out the hero VIZ, which should be the protagonist on a *substrate showcase* page. The protagonist of a dot-sphere demo is the dot sphere, not the word.
- **The blurb is a 9-line wall of ALL-CAPS-shouting prose** ("dot-SPHERE", "SURFACE", "WebGPU-FIRST", "SAME", "ONE GL context"). This is the "tighten superfluous language" ask, verbatim. It reads as engineering changelog, not editorial copy. The one-color-event proportion is fine (ink-only), but the VOLUME violates the calm-content idiom — a hero specimen wants ≤2 sentences of lede, the rest demoted to a caption or an info disclosure.
- **No section rhythm.** Everything is one `StorySection`. There is no second beat, no "here is the WARM identity / here is the REFERENCE" framing, no token tour, no dock-driven facet switch. The eye lands on title → falls into void → finds a caption. Three stops, two of them dead.

**Move:** demote the title to `text-display-2`/`-3` as a *masthead* (the §"motion + studio page TITLES lift to the DISPLAY register" idiom — `text-display-3` on a page-local `<header>`, the `--motion-accent` violet as the ONE color event), and promote the **viz to the hero protagonist** in a big glass card. Let the sphere be the thing the eye lands on.

---

## 3. THE USER'S ASKS, ONE BY ONE

### (a) "each sub-section in its OWN glassy card"
Currently: ZERO cards. The whole page is flat column on the bare page wash. **Move:** split into a small set of glass cards — (i) the hero VIZ card (big, `glass-floating` or the new `.glass-deep` OPT-IN tier — this is exactly the "hero glass, the dock, the CTA" surface BB.W-DEEP-GLASS reserves the deep tier for), (ii) a controls card (`<Configurator>` chassis, see (c)), (iii) a "how it reads" specimen card (the depth-fade math + a frozen still). Each card composes the six-layer composite (DESIGN.md): backdrop blur+saturate · surface tint · edge rim · inner catch-light · drop shadow · grain. Right now there is not a single glass surface on the page — a glass-UI showcase page with no glass.

### (b) "the main card area BIGGER (more screen space)"
The viz is `h-[460px]` in a column that wastes the entire right two-thirds of a 2000px viewport as white margin. **Move:** the hero viz card should be a wide, tall stage — at least `min(72vh, 720px)` and full content-width, the sphere centered and large. This is where the user's "BIGGER main card" lands. The current 460px letterbox in a half-width column is timid.

### (c) "leverage the dock APIs (contextual switching/animating)"
ZERO dock usage. The page uses three raw native `<Switch>` rows (warm/reference, interactive, paused) piled into the title. This is the biggest missed-opportunity. **Move:** the preset/interaction state IS a contextual-switch problem — wire a `<GlassDock>` + `<DockLayerGroup>` (or `<DockStack mode="facets">`, BE.W-DOCK-RAIL-REALIZE) so each facet (WARM identity · MONO reference · interactive · paused) is a dock chip with its OWN accent hue via `--glass-accent` (BB.W-GLASS-ACCENT per-instance chromatic rim), the active facet lifting onto the `--dock-control-active-bg` selected-as-glass tier (W-REGISTER-IOS). Switching presets should MORPH (the `useDockOrientationMorph` / contextual-layer crossfade), not flip a checkbox. The `pause/play` is the textbook `<DockBackgroundToggle>` (WCAG 2.2.2) — currently a raw Switch labeled "paused", which is both uglier and less correct than the shipped control.

### (d) "each page deftly uses a series of glass-ui components"
Currently the page uses: `StoryPage`, `StorySection`, `ShowcaseFrame`, native `Switch`, native `Label`, `DotMatrix`. That is ONE library viz + two atoms. A deft page composes a *series*: `GlassDock` + `DockStack`/`DockLayerGroup` + `DockBackgroundToggle` (controls) · `Configurator`/`ConfiguratorRow` (the tunable knobs — sphere count, breathing, palette) · `SegmentedTabs variant="pill"` (WARM ⇄ REFERENCE material switch) · `Card`/`ScrollCard` (the subsection cards) · `Button variant="glass"` (a "reset" / "randomize seed" CTA, gleaming on `vSpecular`) · `IconChip` (the section eyebrow pop) · `MetricStack`/`MetricCell` (live readout: dot count, FPS, facing-ratio). Right now none of these appear. The page should be a *tour of the system rendered as a working instrument*, not a single canvas + three checkboxes.

### (e) "glass demos over COLORFUL aurora backgrounds"
This is the deepest contradiction on the page. The `CATEGORY_DEFAULT_BG` map (BA.W-STAGE) assigns `substrates → aurora` — but this route appears to render on the flat paper wash (the capture is uniform warm-cream, no aurora visible), and even if aurora were there, the `tier="field"` viz over a warm-cream globe would still vanish. **Move:** put a real **colorful aurora** behind the page (the §"per-category background map" already wants it for substrates), and let the glass cards + the dot-sphere read AS glass over a live colored field — the AX.W54 glass-first identity ("the blur is imperceptible over a flat substrate; the rich backgrounds that make glass POP"). A dot-sphere over a living aurora is a hero image; a cream globe over cream is nothing. Mind the one-GL-per-route budget — the `<DockStage>` pattern (ONE shared offscreen-paused aurora behind a column) is the sanctioned way to get a colored ground without a second GL context fighting the sphere's own.

### (f) "standardize the import-path label"
Currently the import path appears THREE times in three forms: the eyebrow chip `@mkbabb/glass-ui/dot-matrix` (good — the standardized pill), then "Shipped `/dot-matrix`" in the blurb, then "Shipped `@mkbabb/glass-ui/dot-matrix`" again in the footer caption. **Move:** ONE standardized import-path label (the eyebrow code-pill is the right home), delete the two prose repetitions.

### (g) "tighten superfluous language"
The blurb is ~140 words of capitalized changelog. The footer caption repeats the depth-fade math already implied. **Move:** lede ≤ 2 sentences ("A Fibonacci-phyllotaxis sphere of fine dots, depth-shaded so it reads as a 3-D shell even at rest."). Everything else — the arXiv cite, the WebGPU/WebGL fallback note, the `opacity = …` math — moves into a collapsible "Under the hood" disclosure or a mono caption band, OFF the hero path. No SHOUTING-CAPS in body copy (it violates the calm-content idiom + the eyebrow is the only mono-caps register).

---

## 4. AFFORDANCE — clear interactive cues?

**Weak.** The only affordances are three native `<Switch>` toggles, and they are visually buried in the title collision so a user cannot even find them cleanly. "interactive (parallax + dimple + flick bloom)" is a developer label, not an affordance. The viz itself is draggable (parallax/dimple/flick) but there is **zero visual cue** that the canvas is interactive — no grab cursor, no hint, no "drag me" affordance, and since the canvas is empty there is nothing to grab. **Move:** the dock-facet chips (c) are self-evident affordances; add a `.glass-drag-grabbable` cursor on the viz card and a one-line micro-hint ("drag the sphere") that fades on first interaction.

## 5. ANIMATION AFFORDANCE — is every element ALIVE at the iOS-27 bar?

**Mostly dead, ironically on the most kinetic page in the band.**
- The VIZ should be the alive thing (slow tilted spin + parallax + dimple + flick bloom) — but it is invisible, so the page's one animated element reads as static void.
- The hero cluster has the W-HIERARCHY2 GRAVITY entrance in spec, but it is mis-firing (the collision), so it reads as broken-not-alive.
- The native Switches have no spring, no liquid-press, no state choreography — they are stock.
- ZERO hover affordance anywhere (no `vSpecular` gleam, no `.glass-btn` press, no card hover-lift).
**Move:** every card enters on `.scroll-cascade` (W-SCROLL-MOTION, spring-clocked coupled transform+opacity), the dock facets fan/morph on `--spring-dock`, buttons gleam on `vSpecular` + press on `useSpringPress` (W-PRESS-UNIFY interruptible coupled spring), the viz card hover-lifts. Reference: motion-canon P1 (spring-iff-spatial), P2 (enter-bouncy), P3 (fade-coupled-to-transform), P5 (compositor-only), P6 (PRM-keeps-fade).

## 6. POLISH + DISTINCTIVENESS — bespoke or generic-AI?

Right now: **generic-broken.** A giant sans-serif title over white space with native checkboxes is the *exact* generic-AI-template silhouette the frontend-design skill warns against — and the render bugs push it below template into broken. BUT the bones are world-class: the √φ audacious ladder, the phyllotaxis sphere, the warm-cream identity, the dock system, the six-layer glass — these are genuinely bespoke and premium *when composed*. The page fails by NOT composing them. The distinctiveness is all latent. **The single highest-leverage move is to make the page LOOK like the system it ships** — glass cards over a colored aurora, a dot-sphere hero, dock-driven facets — instead of a wireframe of one canvas.

## 7. iOS-27 / PAPER / GLASS NORTH-STAR FIDELITY

- **Glass:** absent. Not one glass surface paints. DESIGN.md's six-layer composite, the 7 tiers, glass-cannot-sample-glass — none exercised. A glass-UI flagship viz page with no glass is the headline fidelity miss.
- **Paper:** the page wash is paper-ish cream but there's no paper-grain-overlay, no blueprint grid, no `.paper-ink-mark` rail — the calm-content paper idiom (math-paper gold standard) is unused.
- **iOS-27 spring physics:** unused on every control.
- **The viz's own fidelity** (depth-fade, golden-angle, no pole-pinching) is correct in spec but unverifiable because it doesn't paint.

## 8. SPACING / RHYTHM (golden-ratio)

The flat column has no φ rhythm — it inherits `StorySection`'s default gaps but with one section there's nothing to set a cadence against. The card padding ladder (W-CARD-PAD sqrt-φ block-over-inline) is unused because there are no cards. The right two-thirds of the viewport is dead margin — the rhythm is "title, void, caption", not a composed measure. **Move:** the φ rhythm comes for free once the cards land (W-CARD-PAD) and the hero stage claims the width.

## 9. COLOR (suffusion proportion)

The one-color-event rule (AZ.W-SUFFUSE) is technically *passed* (ink-only body), but by ABSENCE — there's no color event at all. The page is monochrome cream+ink. For a *substrates* page this is a missed identity beat: the eyebrow should carry its `--section-color` IconChip pop, the masthead title could lift to the `--motion-accent`/substrate-violet display event (the motion/studio masthead idiom), and the dock facets should each carry their own context accent (`--glass-accent`). Suffuse ONE deliberate event per surface — currently zero.

---

## TOP DESIGN MOVES (ranked, do in order)

1. **FIX THE RENDER (blocking):** size the DotMatrix canvas to its container (the substrate's resize seam — 300×150 → real DPR-correct buffer); give the viz a ground it can be seen on. These are P0 — the page shows nothing today.
2. **Hero = the sphere, not the word.** Demote the title to a `text-display-3` masthead `<header>` (the studio-title idiom, `--motion-accent` event); promote the dot-sphere into a BIG glass hero card (`min(72vh,720px)`, `.glass-deep` opt-in tier) over a **colorful aurora** (the `substrates → aurora` `CATEGORY_DEFAULT_BG`, via the `<DockStage>` one-shared-context pattern). The user's "bigger main card over colorful aurora" + "glass cards" land together here.
3. **Replace the three native Switches with the DOCK.** `<GlassDock>` + `<DockStack mode="facets">` / `<DockLayerGroup>` for WARM⇄REFERENCE⇄interactive context switching (each facet a `--glass-accent` chip lifting onto `--dock-control-active-bg`, morphing on `--spring-dock`), and `<DockBackgroundToggle>` for pause/play. This is the "leverage the dock APIs (contextual switching/animating)" ask, done idiomatically.
4. **Add the Configurator + a component series.** A `<Configurator>`/`<ConfiguratorRow>` controls card (sphere count, breathing, palette via `<ColorSwatch>`), a `<MetricStack>` live readout (dot count / facing-ratio), `SegmentedTabs` for the material switch, a glass `<Button>` reset CTA with `vSpecular` gleam + `useSpringPress`. The "deftly uses a series of glass-ui components" ask.
5. **Split into glassy subsection cards + animate them alive.** Hero card · controls card · "how it reads" specimen card (frozen still + depth-fade math, the superfluous prose relocated here). Each enters on `.scroll-cascade`, hover-lifts, presses — the iOS-27 animation-affordance bar (motion-canon P1–P6).
6. **Standardize the import label + tighten copy.** ONE `@mkbabb/glass-ui/dot-matrix` pill (the eyebrow), delete the two prose repeats; lede ≤2 sentences, the changelog prose → "Under the hood" disclosure, kill the SHOUTING-CAPS.
7. **Suffuse ONE color event per surface:** eyebrow IconChip pop, masthead violet, per-facet dock accents — the AZ.W-SUFFUSE proportion, currently at zero.

---

## VERDICT (5 lines)

1. The page is **structurally broken on screen**: the audacious `<h1>` z-stacks over its blurb + control row, and the 460px viz is a **literal void** — a warm-cream globe over a `tier="field"` transparent plate on a cream page, with the canvas backing-buffer un-sized at 300×150. P0, blocking.
2. It satisfies **none** of the user's asks: zero glassy subsection cards, a timid 460px viz in a half-width column (not BIGGER), zero dock-API contextual switching (three raw native Switches instead), only one library component composed, no colorful aurora ground, a thrice-repeated import label, and a 140-word SHOUTING-CAPS changelog blurb.
3. The bones are world-class — the √φ audacious ladder, the phyllotaxis sphere, the dock system, the six-layer glass — but **none are composed**, so the page reads as the exact generic-AI silhouette (giant title + white space + native checkboxes) the frontend-design skill forbids.
4. The fix is a **gestalt transposition, not a patch**: make the dot-sphere the hero protagonist in a big `.glass-deep` card over a live colorful aurora (`DockStage`), replace the Switches with a morphing dock of accented facets + `DockBackgroundToggle`, add a `Configurator`/`MetricStack`/`SegmentedTabs`/glass-`Button` series, split into `.scroll-cascade`-animated glass cards, and cut the copy to a ≤2-sentence lede.
5. North-star fidelity is currently **near-zero** (not one glass surface paints, no spring physics, no suffusion event); the latent identity is all there — the single highest-leverage act is to **make the page look like the system it ships**.
