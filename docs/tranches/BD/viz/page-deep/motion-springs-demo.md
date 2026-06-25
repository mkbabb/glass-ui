# Pass-E META-STORYBOOK audit — motion/springs

- **Page**: `motion/springs` · import `@mkbabb/glass-ui/motion`
- **SFC**: `demo/stories/motion/springs.vue`
- **Manifest**: `demo/stories/manifest.ts:1050` (`background: "constellation"`)
- **Live**: http://localhost:5173/motion/springs (verified 2026-06-23)
- **Capture**: `_cap-springs-full.png`

## Verdict per audit axis

### (1) DEMO CONGRUENCE — partial
The page DOES teach the canonical spring vocabulary well: it reads `SPRING_PRESETS`/`springPreset`/`springTimingFunction`/`springLinearStops` off the single source (springs.vue:16-24,42-52) — no local solver fork, exactly the right architectural posture. The Spring Playground (response/ζ → live `linear()` readout + copy + overshoot %) is a genuinely strong API exercise (lines 94-146).
- **GAP**: the API surface shown is the MATH twin only. The motion band's HIGH-affordance components are absent: no `useSpringPress`, no `useLiquidPress`, no `useLiquidFlex`, no `useDragMorph`, no `useLiquidReveal` — the page demos the CURVE, never a spring DRIVING a real glass component (a pressable card, a draggable morph, a dock-CTA receive). "HIGH animation affordance for EVERY component" is under-met: one rAF-translated div + one travelling dot.
- The named-register stage (lines 196-214) animates a bare opaque `oklch(...) shadow-cartoon` block — NOT a glass-ui component. The demo's own hero motion specimen should BE a glass surface springing.

### (2) COMPONENT ABILITY — thin
The page composes Select + StoryPlayButton + Button + 2×LabeledSlider + a code `<code>` + caption buttons. That is a controls strip, not "a series of glass-ui components (docks/cards/tabs/buttons/procedural-anims)."
- **ZERO docks composed by the page** (the 2 `.glass-dock` on screen are AppShell shell chrome). The user explicitly asks to "leverage the dock APIs (contextual switching/animating)" — the register picker is a plain `<Select>` where a `<DockLayerGroup>`/`<DockStack mode="facets">` register-switcher would showcase the contextual-switch + morph APIs AND the spring registers at once (the registers ARE the dock morph clock — `--spring-dock`).
- **ZERO tabs** (`role=tablist` count 0). `<SegmentedTabs>` is the natural Named-registers ⇄ Playground switcher.
- **ZERO procedural-anim composed by the page** — the only canvas is the faint constellation BACKGROUND.

### (3) GLASS SUFFUSION — weak / wrong substrate
- **background is `constellation`, NOT aurora.** North star: "glass demos over COLORFUL aurora backgrounds." Constellation is a sparse near-monochrome dot field; live sample shows it barely registers (faint specks, `_cap-springs-full.png`). The glass morphism does not READ — the card floats over near-white, so the six-layer optical composite (backdrop blur/saturate/tint/rim/catch-light) has nothing colorful behind it to bend.
- The two inner sections are **bare transparent wrappers** (`flex flex-col gap-3`, `background: rgba(0,0,0,0)` — confirmed live), so there is no per-section glass plate suffusing anything.
- The named-register STAGE (line 196) is `bg-background/40 paper-grain-overlay` — a paper register, fine in isolation, but its animated specimen is opaque, so neither glass NOR paper morphism is demonstrated ON the moving element.
- PAPER morphism: present only as the stage grain overlay; not load-bearing.

### (4) STRUCTURE — FAILS the core mandate
- **Sub-sections are NOT in their own glassy cards.** Live: `.story-sections > section` ×2 are transparent `flex flex-col gap-3` blocks inside ONE outer StoryHero glass card. The user's binding ask — "each sub-section in its OWN glassy card" — is unmet. Each `<StorySection>` ("Named registers", "Spring playground") should be wrapped in its own `glass-card`/`glass-resting` plate.
- **Main card area**: article width 1152px on a 1440px viewport (`max-w` via `--story-page-max-inline`). User asks "the main card area BIGGER (more screen space)." There is generous side gutter; the stage (`h-48`, line 197) and the playground travel rail (`h-12`, line 263) are small. The hero spring stage especially is cramped for the flagship motion specimen.

### (5) PATH-LABEL — OK
Chip resolves `@mkbabb/glass-ui/motion` (manifest:309, live-confirmed). Standardized. ✓

### (6) LANGUAGE — tighten
- Header comment block (lines 1-11) + inline `BB.W-SUFFUSE3`/`BA.W-DEMO-AFFORDANCES`/`BA.W-SUFFUSE2` wave-tag commentary (151-156, 217-219, 259-262) is internal-tranche prose that does not belong in a shipped demo SFC.
- Blurbs are dense and self-referential: "fires the SAME springTimingFunction twin springLinearStops solves the CSS linear() token from. No local spring solver: the demo teaches the canonical curves, so it can never drift from the vocabulary" (169) — teaches the MAINTAINER, not the user. Tighten to the user-facing fact ("Four shipped spring registers. Pick one and play it.").
- "the playground feeds the pair straight to springTimingFunction and reads back the exact CSS linear() stops springLinearStops emits" (236) — superfluous internal plumbing; the user cares that they get a copy-pasteable `linear()`.

### (7) BUGS
- **Double title**: chrome `<h1>` "Spring Orchestrator" (StoryPage header, variant=page) PLUS the in-card masthead `<span class="text-display-3">Springs</span>` (springs.vue:157-165). Two titles stacked — the in-card `<header>` masthead duplicates the page chrome `<h1>` directly above it (live `_cap-springs-full.png` shows both). The hand-rolled in-card masthead predates the StoryHeader chassis cluster and should be removed.
- Named-register play + playground play both animate correctly (verified: spring block mid-flight `translateX≈361px` + rotation; no dead demo).
- The two play paths use DIFFERENT engines: Named-registers uses `useNumericTransition` (the orchestrator, springs.vue:74-87), Playground hand-rolls a local rAF loop (124-135). Minor inconsistency — the playground could ride the same shipped transition.

## Recommended redesign (gestalt, not patch)
1. Switch `background: "constellation"` → `aurora` (colorful, the north-star substrate) so the glass reads.
2. Wrap each `<StorySection>` in its own `glass-card`/`glass-resting` plate (the per-section card mandate).
3. Replace the `<Select>` register picker with a `<DockLayerGroup>` / `<DockStack mode="facets">` register switcher — leverages the dock contextual-switch + morph APIs AND visually demos the registers driving real chrome.
4. Make the spring SPECIMEN a glass component (a `<Card :pressable>` / `glass-floating` block springing), so the animated hero IS the morphism.
5. Enlarge the stage (`h-48`→taller) + the main card; remove the duplicate in-card masthead `<header>`.
6. Strip wave-tag comments + tighten blurbs to user-facing one-liners.
