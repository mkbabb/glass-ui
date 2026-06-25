# dock/sections — Frontend-Design Deep Critique (Pass-E)

**Page:** `demo/stories/dock/sections.vue` · live `http://localhost:5173/dock/sections`
**North star:** DESIGN.md (iOS-26/27 Liquid Glass — §L1 six-layer composite, §L2 spring trio, §L3 tap choreography, §L4 motion tiers, §L5 a11y brackets) · `docs/precepts/{design-idioms,motion-canon,affordance-map}.md` · PROCEDURAL-SUITE.md · the dock contextual-switch/morph/silhouette APIs.
**Lens:** frontend-design skill — distinctive, production-grade, AVOID generic-AI aesthetics — applied to THIS project's liquid-glass + paper vocabulary.

---

## The page as it renders today (the honest read)

A big `text-display` "Dock Sections" title; a four-line blurb; then ONE peachy-tinted `DockStage` card spanning the column, holding ONE horizontal `<GlassDock always-expanded>` (7 icon buttons in 5 zones, divider seams), floating over an empty inner panel; two helper captions. The page shell dock (BottomDock) and the left SidebarDock are the only other chrome.

This is a **spec-sheet, not a specimen.** It demonstrates the `<DockSection>` API correctly and reads as documentation — but it is exactly the generic-AI-template aesthetic the frontend-design skill exists to refuse: one centered widget on a flat tinted card, a wall of explanatory prose, zero kinetic life, the "colorful aurora" reduced to a dead peach wash. It teaches the feature; it does not SELL the material. Against the iOS-27 bar it is inert.

---

## 1. Visual hierarchy — the eye lands, then has nowhere to go

- **The display title is correct** — `text-display` audacious √φ rung, the typography-forward ladder doing its job. Good. But it is the ONLY moment of the audacious ladder on the page. The whole rest is body copy + one icon row.
- **The blurb is too long and out-competes the demo.** Four lines of `text-muted-foreground` body before the eye reaches the actual dock. The user's brief is explicit: *tighten superfluous language.* The title→blurb→demo cascade buries the protagonist (the dock) below 400px of text. The dock — the THING the page is about — is the smallest, lowest-contrast element on screen.
- **No mid-tier hierarchy inside the card.** `<StorySection heading="Declarative tripartite sections">` gives one `text-subheading` rung (the AZ.W-HIERARCHY canonical section rung — correct), but below it everything is flat: prose, then a bare dock, then a mono caption. There is no rhythm, no focal staging of the dock, no "this is the hero specimen" weight. The dock should be the visual climax; instead it's a quiet pill in the middle of a beige rectangle.
- **The one-card monolith violates the user's first ask** — *each sub-section in its OWN glassy card.* Right now there is ONE `StorySection` in ONE `DockStage` card. The Browse / Assets / System / nav zones — the literal SUBJECT of this page — are invisible-as-structure: they're divider seams inside a single dock, not their own demonstrable surfaces. The page has the concept (tripartite sections) but renders it as one undifferentiated strip.

**Move:** invert the weight. Title + ONE tight sentence (≤2 lines). Then promote the dock to a HERO specimen — bigger stage, larger dock (`data-density` up or `--dock-scale` lift), real aurora behind it. Below the hero, a 2-up or 3-up grid of **separate glassy cards**, one per facility (the rail-core anchor · the divided sections · the nav group · the contextual-switch), each its own `glass-resting`/`glass-floating` tile (§L1 tier ladder) with its own live mini-dock demonstrating that ONE zone. That satisfies "each sub-section in its own glassy card" AND "a series of glass-ui components deftly used."

---

## 2. The main card area — too small, and wrong-tier

- **User ask: the main card area BIGGER.** Today the `DockStage` card is ~720px wide on a 2000px viewport with vast dead margin left/right and a tiny dock inside an oversized empty inner `.dock-stage-tile` panel. The signal-to-space ratio is terrible: 80% of the card is empty peach. Either the dock must grow to fill the stage (a larger, denser, multi-layer dock that EARNS the space) or the stage must host MORE (a `DockLayerGroup` with switchable panes, a contextual rail, content that the section actually drives).
- **The inner `.dock-stage-tile` is a bordered empty box** (`border border-border/30 p-8` rounded) — it frames nothing but the dock and a sea of padding. That border is a generic-template tell. Kill it; let the dock float DIRECTLY over the aurora (the BG-2 lesson DockStage.vue's OWN comment cites — "glass over a flat substrate is invisible glass"). The extra bordered tile re-introduces exactly the flat plate DockStage was built to remove.
- **Tier mismatch.** The outer `DockStage` card reads as an opaque-ish peach plate, not a glass tier. Per §L1 the demo card hosting glass-over-aurora should itself be `field`/transparent (the `<ShowcaseFrame tier="field">` BG-2 pattern, BA.W-STAGE) so the glass dock reads as LIQUID glass over a live field — not a gray (here, beige) pill on a plate. Glass-cannot-sample-glass (§L1) is the precept: the dock's `backdrop-filter` needs REAL aurora pixels behind it, not a flat tint.

**Move:** make the stage full-bleed-wide (or near it), transparent-tier, with the aurora cranked to actual color. The dock grows to a hero scale and ideally becomes a `DockLayerGroup` multi-pane so the "main card area" has switchable CONTENT, not emptiness.

---

## 3. Animation affordance — the page is DEAD (this is the biggest failure)

Against the iOS-27 bar and `affordance-map.md`'s five-primitive closed vocabulary, this page ships almost none of it live:

- **No entrance.** The page does not BUILD. `affordance-map` + `motion-canon.md` + the `.scroll-build`/`.scroll-cascade` registers (BB.W-SCROLL-MOTION) exist precisely for this — the title, blurb, and dock should arrive as a gravity fade-rise (eyebrow→title→blurb stagger, the StoryHeader GRAVITY entrance BB.W-HIERARCHY2; the dock card on `.scroll-cascade`). Right now everything is painted flat on load. Dead on arrival.
- **The dock itself shows no contextual switching — the page's WHOLE POINT.** The user's brief: *leverage the dock APIs (contextual switching / animating).* This is the SECTIONS page and it demonstrates a STATIC dock. There is no `DockLayerGroup`, no `useContextualDockLayers`, no `DockStack` facet carousel, no morph. The single most on-theme thing this page could do — click a section → the dock contextually re-skins / the rail swaps / a pane crossfades on `--spring-snappy` (§L2 "confident tap") — is entirely absent. The dock sits there. A SECTIONS demo with no section-switching is the spec-sheet failure in its purest form.
- **`always-expanded` removes the headline dock animation.** The dock never collapses↔expands, so the W-DOCK-MORPH-FAMILY compositor-transform morph (the box-size morph over a reserved footprint, the chrome-continuous `--dock-expand-t` interp) — glass-ui's flagship dock motion — is switched OFF on the page that should showcase it. At minimum offer a hover-expand or a collapse toggle so the morph reads.
- **Press/hover ARE wired at the primitive level** (`DockIconButton` carries the `v-specular` gleam-track + `--scale-press-dock` 0.92 squish + hover-lift per affordance-map primitives 1/2/3) — so individual icons DO answer the pointer. Credit where due. But nothing at the PAGE/composition level is alive: no staged choreography, no section-driven state, no follow-through (§L4 medium tier). The primitives are alive; the page is a morgue.

**Move:** wire `v-model:active` section state. Clicking a zone (or a facet chip) drives a contextual switch — the dock morphs/re-skins, and a HERO PANE beside or below crossfades to that section's content on `--spring-smooth` (§L2 pane-swap). Add the `.scroll-build` page entrance + `.scroll-cascade` on the card grid. Every card gets hover-lift; the protagonist dock gets a live collapse↔expand morph affordance. THIS is the iOS-27 bar.

---

## 4. Polish + distinctiveness — generic-template tells

- **Flat peach wash instead of colorful aurora.** The user asks for *glass demos over COLORFUL aurora backgrounds.* `DockStage` ships `DEFAULT_AURORA_CONFIG` at `opacityCeiling 0.42` — a deliberately CALM wash, which over the warm-cream identity collapses to a flat beige rectangle (visible in capture). The aurora is technically present but reads as a static gradient plate, defeating its own purpose. The glass has nothing colorful to refract. Per PROCEDURAL-SUITE + the §L1 "concentrated light / saturate channel matters as much as blur" precept, the dock needs a LIVE, SATURATED, MOVING field behind it (a richer preset, higher opacity ceiling, the `breathing`/`drifting` MOTION_FIELDS register made honest at BA.W-STAGE) so the six-layer composite actually reads — the backdrop blur+saturate (layer 1) has nothing to bend here.
- **The bordered empty inner box, the centered-single-widget layout, the wall of prose** — these are the three canonical generic-AI-page tells. A world-class designer would never frame a small control in a large bordered void.
- **The `<code class="rounded bg-muted px-1">` inline-code spam.** Six inline code chips in one paragraph (`sections`, `<DockSection>`, `<DockSeparator>`, `display: contents`, `anchorId`) is documentation texture, not design. It's reference-manual prose dressed as a demo. Tighten ruthlessly per the user's brief — the demo should SHOW `display: contents` (the box shrink-wraps), not narrate it.
- **No paper morphism anywhere.** DESIGN.md mandates GLASS + PAPER both. This page is all (flat) glass. A SECTIONS page is a natural home for the `.paper-ink-mark` register (the section-divider hairline as an ink rail), a `paper-grain-overlay` on a content tier, the editorial `math-paper.vue` idiom for the descriptor-array code block. The paper half of the north star is entirely missing.

---

## 5. Spacing / rhythm — golden-ratio absent inside the card

- The `StorySection gap="md"` + `p-8` tile padding are uniform, not φ-stepped. The card-padding ladder (BB.W-CARD-PAD — `--card-pad-block = inline × 1.272` sqrt-φ, the section-gap, the φ²-tight title gap) is the house golden-ratio system and this hand-rolled `p-8` tile bypasses it. The dock floats in a 1:1 padded box with no breathing cadence.
- The vast horizontal dead margin (card ~720px centered in 2000px) is unmotivated whitespace, not rhythm. Either go full-width (hero) or constrain the page to a real content measure (~65ch) so the margin reads as deliberate. Right now it reads as a component that forgot to lay itself out.

---

## 6. Color + suffusion proportion

- Per AZ.W-SUFFUSE / the one-color-event rule, each surface gets ONE deliberate color event. This page's event should be the **aurora itself** (the colorful field the user asks for) + the dock's **selected-as-glass** register (W-REGISTER-IOS — the `--dock-control-active-bg` glass-tier lift on the active section). Today there is NO active state, so there is NO color event — the dock is monochrome ink on beige. The contextual-switch (move 3) IS the color event: the active zone lifts to the glass-floating tier, optionally carrying a per-facet `--glass-accent` chromatic rim (BB.W-GLASS-ACCENT, the DockStack facet-mode pattern) so each section reads in its own context hue — distinct, bounded, ONE event per zone.
- The warm-cream identity is intact (good, no gray — BA.W-NO-GRAY), but it's currently the ONLY note. Let the aurora carry saturated color so the warm glass has something to be warm AGAINST.

---

## Import-path label

The page shows `@mkbabb/glass-ui/dock` (good — the canonical subpath). The SFC imports from `../../../src/components/custom/dock` (the dev relative path — correct for the demo). **Standardize the displayed label to the published subpath form** `@mkbabb/glass-ui/dock` everywhere it appears (it already does in the eyebrow chip), and ensure the StoryPage import-label prop is set from the published subpath, not the dev relative path — consistent with the other dock pages.

---

## TOP design moves (ranked, concrete)

1. **Wire contextual switching — the page's reason to exist.** `v-model:active` section state; clicking a zone drives a live dock re-skin/morph + a hero pane crossfade on `--spring-snappy`/`--spring-smooth` (§L2). Use `DockLayerGroup` or `DockStack` facet-mode. Without this the page is a spec-sheet.
2. **Each zone in its OWN glassy card (the user's #1 ask).** Below a hero dock, a 2–3-up grid of `glass-resting`/`floating` tiles (§L1), one per facility (rail-core · divided sections · nav · contextual-switch), each with its own live mini-dock + its own `--glass-accent` context hue. `.scroll-cascade` entrance.
3. **Make the aurora COLORFUL + the stage transparent-tier + BIGGER.** Crank the field to a saturated moving preset (higher opacity ceiling, `breathing`/`drifting`), drop the bordered inner tile, go `tier="field"`/transparent so the dock's six-layer composite (§L1) refracts REAL color. Make the main stage near-full-bleed; grow the dock to hero scale.
4. **Bring the page ALIVE — entrance + morph.** `.scroll-build` page-build + StoryHeader GRAVITY entrance (BB.W-HIERARCHY2); offer the dock collapse↔expand morph (drop blanket `always-expanded` or add a hover-expand) so W-DOCK-MORPH-FAMILY's flagship motion reads. Every card hover-lifts (affordance-map primitive 1).
5. **Tighten language + add the PAPER half.** Title + ONE sentence; kill the inline-code spam; SHOW `display: contents` (shrink-wrap) rather than narrate it. Introduce paper morphism — `.paper-ink-mark` section-divider rails, a `paper-grain` content tier, the editorial code block for the descriptor array — so GLASS + PAPER both land per the north star.
