# motion/scroll-vt — Pass-E SYNTHESIS (binding per-page verdict)

**Page:** `demo/stories/motion/scroll-vt.vue` · route `/motion/scroll-vt` · import label `@mkbabb/glass-ui/motion-core`
**Inputs:** `motion-scroll-vt-demo.md` (congruence/structure lens) · `motion-scroll-vt-design.md` (frontend-design lens) · `motion-scroll-vt-component.md` (substrate/motion-canon lens)
**Real subject:** a CSS-substrate + native-API showcase, NOT a paint component. Four facilities: `.scroll-progress` (scroll() bar), `[data-scroll-reveal]` (view() reveal), `.gl-list-item` VT reorder, and a `supports*` capability probe — composing `Button` ×1 + bare `glass-card` divs ×13.

---

## 1 · Reconciliation — where the three lenses AGREE (high confidence)

All three converge on the same structural verdict; the only divergence is depth of remedy, not direction.

- **The SUBSTRATE is exemplary; the defects are PAGE-level.** The component lens is unambiguous: `useViewTransition.ts` + `supportsCssTimeline.ts` + `scroll-driven.css` + `view-transition.css` are among the cleanest leaves in the library — dependency-free (`/motion-core`, SCC-trap held), compositor-only, PRM-as-outer-gate (P6), per-spring settle clock (P4), dual-path single-writer with a hardened garbage-probe, Safari-floored, no dead code. **No PRUNE of live substrate.** The demo + design lenses never contradict this — they audit the *page that stages it*. This is the cleanest split in the corpus: zero src-repair, all page-redesign + one motion-grace generalization.
- **Structure FAILS both halves of the user ask (unanimous).** Four `<StorySection>`s share ONE `glass-wash` chassis card, hairline-`delimited`, NOT own glassy cards; the main card is 76% width with two small fixed scroll-ports (256px / 288px). The ask — "each sub-section in its OWN glassy card; the main card area BIGGER" — is unmet on both axes.
- **The field is the wrong register (unanimous).** Resolves to `constellation` (motion category default) — a monochrome Canvas2D dot field at opacity ceiling 0.4/0.62, near-invisible. The `glass-card` tier is CORRECT (measured `oklab(.726…/.6)` + `blur(8px) saturate(1.05)`) but has nothing to refract → the plates render as opaque grey slabs (the BG-2 black-plate class, live-confirmed). The ask names "COLORFUL aurora backgrounds"; the page taps none.
- **A motion-timeline page is itself inert (the deepest, most ironic failure — design + component agree).** The capability badges are dead `<span>`s, the reveal/VT cards have no hover/press/gleam at rest, the section bodies never ride `.scroll-cascade`, and the page demos a CANON-RETIRED reveal register (`[data-scroll-reveal]`, superseded by `.scroll-cascade`) on the WRONG latch (continuous → re-fires on scroll-back; should be `[data-scroll-reveal-once]` for the scroll-port). The page about motion has nearly no motion affordance.
- **Path label PASS (unanimous KEEP).** The Fira-Code chip reads `@mkbabb/glass-ui/motion-core` — the canonical subpath convention, no `/motion/scroll-vt` local drift. No action.
- **No functional bugs (unanimous).** VT animates, scroll-bar tracks, reveal staggers, probe reports correctly, no scroll-reset race.

### Conflicts resolved
- **"Field is dead" (design) vs "field is live, works" (demo).** Both right: the constellation IS running and correct — but it is monochrome + low-contrast, so the *glass reads* as flat. Resolution: SWAP the field register (constellation→violet aurora), don't fix the constellation. One-GL-per-route budget holds (a swap, not an addition).
- **"Reveal is the best moment" (demo) vs "reveal binds a retired register on the wrong latch" (component).** Both right at different altitudes: the reveal IS the most-alive surface ON the page, AND it binds canon-superseded `[data-scroll-reveal]` continuous. Resolution: keep the reveal as a protagonist surface but re-point it onto `.scroll-cascade` / `[data-scroll-reveal-once]` (the no-legacy fix) — it stays the best moment, on the SHIPPED register.
- **VT-reorder altitude.** Demo calls it "thin (single rotate-by-1)"; design calls it "the coolest thing, buried last"; component calls it "correct, rigid in flight." Reconciled: it is the page's natural PROTAGONIST — promote it to the focal facet, enrich the exercise (add/remove/filter beyond rotate-by-1), and grace it (`useLiquidFlex` flight-squish). All three remedies stack.

---

## 2 · Ranked changes (by impact) + tranche action per change

> Every remedy folds into an EXISTING union/Band-16 wave. The page is the textbook flat-spec-sheet redesign the chassis waves already author against. **One genuine gap surfaced: the phantom-dependency `W-LIQUID-ENTRANCE-GENERAL` is referenced by `W-STORY-PAGE-STANDARD` (and every substrates SYNTHESIS) but authored nowhere** — that is the single NEW action, and it is a tranche-hygiene fix, not a page-specific one.

### R1 (HIGHEST) — Colorful violet aurora field + drop the demo-container frames
The single highest-leverage move (all three lenses rank it #1). Swap `constellation` for a `--motion-accent`/`--viz-legendre`-seeded `<Aurora>` (offscreen-paused, one-GL-per-route), and drop the two `rounded-card border border-border/60` scroll-port frames + the reveal grid to `field`/transparent so the aurora refracts THROUGH the `glass-card` tiles — turning every grey slab into real liquid glass at zero structural cost (DESIGN.md §L1; BG-2 fix).
**ACTION: MODIFY `W-PAGE-BACKGROUND`** — add `motion/scroll-vt` to its per-category background roster with the violet-aurora register (the motion family's identity); its gate (resolved-box + vivid `--viz-*` palette + litFrac > 0, the substrates-glass-panel precedent) covers this page. **+ FOLD the frame-drop into `W-PAGE-CHASSIS`** (the frame-kill / field-reaches-the-glass arm).

### R2 — Bind the dock APIs: `<DockStack mode="facets">` / `<DockLayerGroup>` rail
Replace the four-sections-stacked-vertically layout with ONE focal demo stage + a dock rail switching facets (Capability / Scroll progress / Reveal / View Transitions), the dock morphing to the selected facet on `DOCK_SPRING`. This single move closes THREE user asks at once: (a) leverages the dock contextual-switching APIs the prompt names; (b) makes the demo area BIGGER (one focal stage, not four small ones); (c) is itself a transition demo on a page nominally about transitions.
**ACTION: MODIFY `W-STORY-PAGE-STANDARD`** — this page is a prime `<DemoStage>` + `<DockStack mode="facets">` consumer; add it to the migration roster's motion category. The `<DemoStage>` taxonomy + the `<DockStack mode="facets">` contextual-switch shape already exist in the spec. **No new dock wave** — `W-DOCK-INTEGRATE`/`W-DOCK-SEQUENCE` own the dock mechanism; this is composition.

### R3 — Each facet → its OWN glassy sub-card; enlarge the focal stage
Wrap each facet in a `glass-resting`/`glass-quiet` sub-card (the W-STORY-PAGE-STANDARD `<DemoSpecimen>`/`<DemoInteraction>` taxonomy); kill the 1152 stage cap on the protagonist (VT reorder + scroll-progress get the φ²-dominant frame); set `:delimited="false"` (the hairline rule is redundant once each facet is carded).
**ACTION: FOLD into `W-STORY-PAGE-STANDARD`** (conformity invariants 2+3 — protagonist stage φ²-dominant + each sub-section its own glassy card; covered verbatim by the existing gate).

### R4 — Make EVERY surface alive (the affordance-map bar) + re-point the RETIRED reveal register
The deepest design failure. Three stacked remedies:
- (a) **Re-point the reveal onto the SHIPPED SOTA register** — `[data-scroll-reveal]` continuous → `.scroll-cascade` (or `[data-scroll-reveal-once]` for the scroll-port). This is the **no-legacy fix** (the page demos the canon-RETIRED register; component-lens Finding A1). It simultaneously fixes the re-fire-on-scroll-back jank AND upgrades the near-flat 6px lift to the iOS-27 squish/fade/settle.
- (b) **Arm at-rest affordance on the plates** — `vSpecular` pointer-gleam (W-LIQUIDHOVER tier-root auto-arm) + HOVER-LIFT + PRESS-SQUISH on the reveal/VT cards (affordance-map primitives 1+3); section bodies ride `.scroll-cascade` (the page reveals on the `view()` timeline it documents).
- (c) **"Rotate order" → the gold/primary CTA**, spring-clocked rotation with rows that overshoot into slots.
**ACTION: MODIFY `W-STORY-PAGE-STANDARD`** for the entrance/vSpecular conformity (invariant 5) — BUT this depends on `W-LIQUID-ENTRANCE-GENERAL` which **does not exist** (see §3, the NEW action). The retired-register re-point (a) is a clean no-legacy page edit owned by the page-deep demo sweep under the same wave.

### R5 — Headline the capability verdict on the audacious ladder
Promote "supported / fallback" to a `text-display-3`-scale GREEN/violet readout (the hero datum deserves the √φ ladder, not a 14px pill) + give each section a canonical `text-subheading` `<h2>` (the four facilities currently read as four equal-weight mono captions — the AZ.W-HIERARCHY caption-not-heading trap).
**ACTION: FOLD into `W-STORY-PAGE-STANDARD`** (the header-cluster + heading-rung conformity, invariant 1 + the `heading`-rung assert) **+ `W-HEADER-SCALE`** (the display-rung readout sizing).

### R6 — Make the scroll-progress motion VISIBLE: `<BorderProgress>`
A page named "Scroll progress" hides its progress in a 4px top hairline. Replace it with a `<BorderProgress coverage>` ring tracing the panel edge (progress-IS-the-border, BB.W-BORDER-PROGRESS) on the violet, with the coupled brightness leg (motion-canon P3) so the scroll energy reads.
**ACTION: FOLD into the page-deep demo sweep under `W-STORY-PAGE-STANDARD`** (compose the shipped `<BorderProgress>` — no src work; it is a deft-composition upgrade, the "page deftly uses a series of components" ask).

### R7 — VT-reorder flight-squish (motion grace)
The reordered row translates rigidly; the DESIGN.md liquid bar wants a small volume-preserving `useLiquidFlex` squish on travel so the row reshapes as it flies (component-lens Finding A2). Add an optional `--vt-squish` token / `useLiquidFlex` leg to the `.gl-list-item` group.
**ACTION: AUGMENT `W-BC-COMPONENT-CANON`** with a `--vt-squish` clause on the `.gl-list-item` group recipe (it is a token-first substrate grace, not a page edit), OR co-locate with the entrance-grace wave (§3). MINOR — sequence after the structural waves.

### R8 — `viewTransitionClass` inline-style binding is engine-flaky (Safari/FF)
The demo binds `viewTransitionClass` via a JS-camelCase `:style` key — NOT a settable CSS style property on every engine (Safari/FF may drop it silently — the glass-ui-binding-no-op class; component-lens Finding S1). Fix the demo to a real CSS `view-transition-class` rule; book a helper affordance (an ergonomic class-assignment seam) so consumers don't hand-bind a brittle style key. ALSO: document the Safari ≤18 `view-transition-class` partial-support Baseline caveat in the `useViewTransition.ts` header.
**ACTION: MODIFY (demo)** under the page-deep sweep + **AUGMENT `W-BC-COMPONENT-CANON`** with the binding-caveat note + the doc-caveat (the wave already re-checks `cross-document-vt`/`directional-view-transition` Baseline books, per `W-DISPOSITION-RESTAMP`). A standalone `W-VT-CLASS-SEAM` is NOT warranted — the helper-seam is a one-line additive affordance, foldable.

### R9 — Tighten copy
Strip dev-speak from the rendered blurbs: `≤20-LOC`, `single writer, no double-run`, `no setTimeout cascade`, internal symbol names (`startViewTransition`, `.gl-list-item`); dedupe the 14 filler paragraphs that literally repeat "costs the main thread nothing"; state the perf claim ONCE.
**ACTION: FOLD into `W-PAGE-OFFTOKEN-SWEEP`** (the jargon/ALL-CAPS/dev-speak sweep — the existing copy-hygiene arm).

### PRUNE (no action)
- Component-lens P1 (continuous reveal unbounded by IntersectionObserver) — **PRUNE/subsumed**: the R4(a) `-once` / `.scroll-cascade` re-point fixes it; no separate action.
- No live substrate code is pruned (the leaf is exemplary).

---

## 3 · The ONE net-new action — a tranche-hygiene gap, not a page wave

**`W-LIQUID-ENTRANCE-GENERAL` is a PHANTOM DEPENDENCY.** It is named as a `depends:`/`rides` target by `W-STORY-PAGE-STANDARD` (invariant 5) and by EVERY substrates SYNTHESIS (aurora, blob, constellation, concentric, dot-flow-field, fourier-field, glass-panel, paper-grid, goo-dot) + both motion component reports — yet `grep` finds NO wave file authoring it (`docs/tranches/BD/{waves,union/waves}/`). The whole "alive entrance / iOS-27 squish-fade-settle on the glassy sub-cards" conformity invariant rests on a wave that does not exist. This page (R4) is one of its prime consumers; it cannot be remediated until the wave is authored.

**ACTION: NEW — author `BD.W-LIQUID-ENTRANCE-GENERAL` (Band 16, the entrance-grace SPINE).** Scope: generalize the iOS-27 entrance (`.glass-reveal` bloom + `.scroll-cascade` spring-clocked coupled transform+opacity + the `useLiquidFlex` squish-on-arrival) into the ONE register every `<DemoSpecimen>`/`<DemoStage>`/glassy-sub-card composes, superseding the bare `[data-scroll-reveal]` 6px fade (clean break, no alias). Real gate: `proof:liquid-entrance-general` (the register exists once; the per-card π frame-series — volume-preserving squish scale≠1 + coupled fade + overshoot settle, both engines + PRM single-paint) + the `[data-scroll-reveal]`-is-RETIRED census bite (a page binding the bare register reds). This page's reveal section (R4a) is the canonical π consumer. **This is the convergence pre-requisite for the entire Band-16 chassis migration** — it is named everywhere, owed by the whole storybook, and currently un-authored.

This is the SAME class the substrates-glass-panel SYNTHESIS flagged ("MODIFY W-LIQUID-ENTRANCE-GENERAL — π consumer") while assuming the wave existed. The synthesis across pages assumes it; it must be authored. (If a sibling page-deep synthesis has already filed this NEW action, dedupe — file ONCE, this page is a co-consumer.)

---

## 4 · Convergence assessment

**CLOSE — one redesign loop + one live-verify loop. NOT several.** This is among the most convergent pages in the corpus, for one structural reason: **the substrate needs ZERO repair** (the cleanest leaf in the library), so the entire defect surface is page-redesign that the Band-16 chassis/colorful-field/entrance waves ALREADY author against the aurora reference. There is no taste-iteration backlog — the design target is unambiguous (the four facilities as a dock-switched series of glassy cards over a violet aurora, the VT reorder as the protagonist).

- **Loop 1 (redesign):** execute R1–R6 + R9 (the chassis migration: violet aurora + frame-drop, the `<DockStack mode="facets">` contextual switch, per-facet glassy cards + enlarged stage, every surface alive + the retired-register re-point, the headlined verdict + heading rungs, `<BorderProgress>` for the scroll bar, tightened copy). The substrate graces R7/R8 land as token-first augments beside it.
- **Loop 2 (verify-only):** live-confirm the four facets read as a dock-switched series over a vivid violet field, the plates bloom-in + catch pointer-light, the reveal uses the `.scroll-cascade` register (not the retired one), the VT reorder is the focal protagonist with overshooting rows, both modes. Otherwise CONVERGED.

**The ONE blocker is the phantom wave (§3):** R4's entrance conformity cannot execute until `W-LIQUID-ENTRANCE-GENERAL` is authored. That is a bounded, known, tranche-wide pre-requisite (not a page unknown) — author it once and the page (plus the whole storybook) unblocks.

**Estimate: ~25% now → ~90% after Loop 1 → CONVERGED after the Loop-2 live-verify.** Zero genuine page-level UNKNOWNS (the substrate is proven, the field-swap is a known register, the dock composition is shipped API). The only cross-cutting risk is the phantom-wave authoring — and that is the single NEW action this page surfaces.

---

## 6-LINE VERDICT

1. **Top-3 changes:** (R1) **violet aurora field + drop the container frames** so the `glass-card` plates refract a live field instead of reading as grey slabs (the #1 move all three lenses rank highest, the BG-2 fix); (R2) **bind the dock APIs — `<DockStack mode="facets">` contextual switch** replacing the four-stacked-sections with ONE focal stage (closes BIGGER + contextual-switching + is-itself-a-transition at once); (R4) **make the motion-page ALIVE** — re-point the CANON-RETIRED `[data-scroll-reveal]` onto `.scroll-cascade`/`-once` (no-legacy), arm `vSpecular`/hover/press on the plates, promote the VT reorder to the protagonist.
2. **CONFLICTS resolved:** field IS live (demo) but monochrome/low-contrast (design) → SWAP register, don't fix the constellation; reveal IS the best moment (demo) but binds a retired register (component) → keep it protagonist, re-point to the shipped SOTA.
3. **MODIFY (5):** `W-PAGE-BACKGROUND` (violet-aurora roster row), `W-STORY-PAGE-STANDARD` (the dock-facet stage + glassy sub-cards + heading rungs + entrance conformity), `W-HEADER-SCALE` (display-rung verdict), `W-BC-COMPONENT-CANON` (VT-class binding caveat + doc), the page-deep demo sweep (retired-register re-point + `<BorderProgress>` compose).
4. **AUGMENT (2):** `W-BC-COMPONENT-CANON` (`--vt-squish` flight-squish, the `view-transition-class` helper seam); **FOLD (4):** frame-drop→`W-PAGE-CHASSIS`; protagonist-stage/sub-cards/heading→`W-STORY-PAGE-STANDARD`; copy→`W-PAGE-OFFTOKEN-SWEEP`.
5. **PRUNE (1):** component P1 (unbounded-IO reveal) subsumed by the R4 `-once`/`.scroll-cascade` re-point — no separate action; ZERO live src pruned (the substrate is exemplary). **NEW (1):** author `BD.W-LIQUID-ENTRANCE-GENERAL` — the PHANTOM dependency named by `W-STORY-PAGE-STANDARD` + every substrates SYNTHESIS yet authored nowhere; this page is its prime π consumer; it blocks the whole Band-16 entrance conformity (dedupe if a sibling synthesis already filed it).
6. **Convergence: CLOSE (~25%→~90% after one redesign loop + one live-verify loop).** The substrate needs zero repair (cleanest leaf in the library); the entire defect surface is the Band-16 chassis/colorful-field/dock-composition waves that already exist — the ONE blocker is the phantom `W-LIQUID-ENTRANCE-GENERAL` (bounded, tranche-wide, author-once).
