# forms/toggle — FRONTEND-DESIGN deep critique (Pass-E)

**Page:** `demo/stories/forms/toggle.vue` · live `http://localhost:5173/forms/toggle`
**Subpath label:** `@mkbabb/glass-ui/toggle-group`
**Captured:** 1440×900, light mode. Background resolves to the `forms → grid` category default (no aurora); body card is `glass-resting` (`backdrop-filter: blur(10px) saturate(1.05)`, α≈0.66) floating over a flat near-white page (`--neutral-0` ≈ `hsl(40 30% 98%)`).

---

## VERDICT IN ONE BREATH

This is a **spec-sheet, not a designed page.** It is a single tall glass card holding six gap-stacked rows of label + control + mono state-readout, separated by hairlines, over a flat cream wash. It is *correct* (the controls work, the suffusion is disciplined, the eyebrow cluster is in reading order) and *completely inert* — nothing here says "iOS-27 Liquid Glass." It reads as a competent component-library smoke-test, the exact **generic-AI-template aesthetic the frontend-design skill exists to avoid**: centered controls floating in whitespace, one color event, no depth, no motion, no bespoke moment. The DESIGN.md six-layer optical composite is *technically present on the outer card* and **invisible** because there is nothing colorful behind it to refract. Every individual primitive is well-built; the **page composing them is unfinished.**

---

## 1. VISUAL HIERARCHY — the eye lands nowhere

- **The display `<h1>` is the only hierarchy event.** "Toggle · Toggle Group" at `text-display-4` is genuinely strong (the audacious √φ ladder doing its job — this is the one place the typography-forward north star is honored). But then the eye drops off a cliff: below the title is a uniform field of six identical `section-label` (mono caption, muted) → control → mono-readout triplets. **No second focal moment. No rhythm of weight.** The page is a title and then a flat list.
- **The chrome `<h1>` and the in-card header DUPLICATE the descriptor.** The big title says "Toggle · Toggle Group"; the in-card `<IconChip>` header *also* says "FORMS · TOGGLE" + the blurb. Two headers, one band — the eye reads the same identity twice (the very `D1-4 double-<h1>` inversion `StoryHeader.vue` was built to kill, re-introduced here by the page hand-rolling its OWN `<header>` *inside* the card on top of the chassis chrome header). Pick one.
- **Every section has identical typographic weight.** "SINGLE TOGGLE", "TOGGLE-GROUP · MULTIPLE", "TOGGLE-CHIP · CHIP VARIANT" are all the same `--type-caption` mono whisper. There is no `text-subheading` (the canonical AZ.W-HIERARCHY section rung) anywhere — the page bypasses `<StorySection heading>` entirely and hand-rolls `<p class="section-label">`. So the section structure is *legible* but never *commanding*. Per **AZ.W-HIERARCHY**, a section should read as a section, not a caption.
- **The mono state-readouts (`pressed · false`, `marks · [bold]`, `align · left`) are visual noise at equal weight to the controls.** They are debug output dressed as content. They compete with the actual interactive elements for the same horizontal lane.

## 2. AFFORDANCE — adequate, but the cues are quiet

- The `Toggle`, `ToggleGroup`, and `ToggleChip` controls carry the four-state contract, so hover/press/active *exist*. But at rest they are **near-invisible**: a single `B` glyph on a translucent pill against a near-white card has almost no edge. The DESIGN.md **edge rim** layer is doing nothing because the contrast ceiling (cream-on-cream) gives the rim nothing to draw against.
- **The cell-variant selected state is a FLAT GRAY SLAB** (captured: `warm` selected renders as an opaque `~oklab(0.78)` gray box). This is the **R10-5 "No gray" defect живущий on the page** — a selected toggle-cell reading as a dead gray plate is exactly the `--surface-tint-N` gray-slab the BA.W-DARK-MATERIAL / W-NO-GRAY work condemned. The selected register must be the **"selected reads as glass"** tier (`--glass-bg-floating`, the W-REGISTER-IOS model), never a saturated/opaque fill.
- **The three cell swatches are ALL THE SAME RED DOT** (`bg-viz-fourier`). The "warm / cool / mono" palette picker shows three *identical* red circles — the demo's own content is broken. An affordance that claims to choose between three palettes but renders them identically is worse than no affordance: it teaches the user the control does nothing.

## 3. ANIMATION AFFORDANCE — the page is STATIC at the iOS-27 bar

This is the largest gap against the north star ("HIGH animation affordance for EVERY component").

- **Entrance:** The page *does* inherit the chassis `.scroll-build` + `.scroll-cascade` section entrance and the `StoryHeader` 3-stage GRAVITY rise — so the title cluster arrives well. **Credit where due.** But the section *bodies* are bare gap-stacked `<section>`s, so once the cascade fires, every control just sits there.
- **Hover / press:** The toggles ride the library four-state CSS, but there is **no per-element liquid-hover gleam wired** — `vSpecular` / `useSpecularTracking` (the **BB.W-LIQUIDHOVER** tier-root auto-arm) is not engaged on these specimens, so hovering a toggle gives a flat color-swap, not the pointer-following catch-light the iOS-27 register promises.
- **State transition:** When you press `B`, the state flips with the CSS register, but the **mono readout text snaps** (`pressed · false` → `pressed · true`) with zero transition. A state demo whose *state readout* hard-cuts is the antithesis of "every element alive." There is no `useAnimatedNumber`-class transition, no `<Transition>` on the readout, no spring.
- **The ToggleGroup indicator does not glide.** A single-select `ToggleGroup` (the align row) is a radio chooser — the iOS-grade move is an **elastic gliding/squishing indicator** (the `--spring-snappy` + `useLiquidFlex` reciprocal-squish the `SegmentedTabs` family ships). Here the selection just paints the active item. The platform OWNS the gliding-indicator primitive and the page doesn't reach for it.
- **No `useDragMorph` on anything.** The `:draggable` liquid-tab / pull-to-morph axis (BB.W-DRAG-MORPH) is exactly the kind of "grab live chrome and pull it" delight that would make a toggle-group page memorable; it is absent.

## 4. POLISH + DISTINCTIVENESS — generic, not bespoke

- **It looks like a Storybook MDX page**, not a premium product surface. The tells: centered controls in whitespace, one accent color, uniform caption labels, debug readouts, a single big card. Nothing here could not be generated by any component library's default docs theme.
- **The glass card is wasted.** The page's whole identity is supposed to be *Liquid Glass*, yet the ONE glass surface (the body card) refracts a **flat cream backdrop** — so the six-layer composite collapses to "a slightly translucent off-white rectangle." Glass with nothing colorful behind it is **glass theater with the lights off.** Per DESIGN.md, the glass *is* the optical composite of the backdrop; remove the colorful backdrop and you have removed the design.
- **The toggle specimens float on the card with no staging.** Compare the dock-band `<DockStage>` pattern (ONE shared offscreen-paused aurora behind a column of demos, each in a transparent framed tile): that is what "glass demos over colorful aurora" looks like. This page has none of it.

## 5. SPACING / RHYTHM — flat, not golden

- The card uses the φ-ladder padding (`--card-pad-block = inline·1.272`) correctly on the OUTER card — but inside, every section is a uniform `gap-3` / `gap-4`, and the inter-section gap is one `--story-page-section-gap`. There is **no φ-stepped cadence** between the section-label → control → readout micro-rhythm. Everything is one spacing scale, so the page has no breathing structure — it is evenly gray.
- The controls are all **left-flush in a single column**, leaving the right ~55% of a 72rem card as dead whitespace (visible in capture: the align icons sit mid-card with a vast empty right gutter). The user's "main card area BIGGER / more screen space" is *available* but *unused* — the page is narrow content in a wide frame.

## 6. COLOR / SUFFUSION — disciplined but lifeless

- The **one-color-event rule is honored** (the `--section-color-3` teal identity on the IconChip + the eyebrow border-left). This is correct restraint per **AZ.W-SUFFUSE**. But "disciplined" here tips into "monochrome and dull" because there is no *second* register doing the heavy lifting (no aurora, no procedural backdrop, no metal accent). One faint teal event on an otherwise gray-cream page is *too* quiet.
- The cell-variant red dots are **off-identity** (`--viz-fourier` warm-red on a forms page whose identity is teal `--section-color-3`) — a stray hue that breaks the page's own one-color-event budget AND is the same broken-identical-swatch problem from §2.

---

## TOP DESIGN MOVES — make this page exceptional

**1. Each subsection in its OWN glassy card, over ONE colorful aurora (the headline move).**
Retire the single-tall-card + hairline-divider layout. Stage the page as a **`<DockStage>`-style bento**: ONE shared, offscreen-paused `<Aurora>` (warm-teal seed to match the `--section-color-3` forms identity) behind a 2-up grid of **glass-tier cards** (`surface="glass"`, `glass-floating` or the opt-in `.glass-deep` tier — **BB.W-DEEP-GLASS**), one card per subsection (single-toggle · group-multiple · group-single · chip · cell). Now the six-layer composite (**DESIGN.md** backdrop-blur+saturate · tint · edge rim · catch-light · shadow · grain) finally *refracts a colorful field* and the page reads as Liquid Glass. Honors "each sub-section in its own glassy card" + "glass demos over COLORFUL aurora" + "main card area bigger" (the bento fills the 72rem width).

**2. Wire the liquid-hover + selected-as-glass register on every specimen.**
Engage `v-specular` (**BB.W-LIQUIDHOVER** tier-root auto-arm) so each toggle gleams pointer-following on hover. Re-point the cell-variant selected state OFF the gray slab onto `--glass-bg-floating` (**W-REGISTER-IOS** "selected reads as glass") — kill the R10-5 gray plate. Add the elastic gliding indicator (`useLiquidFlex` reciprocal-squish on `--spring-snappy`, the `SegmentedTabs` family precedent) to the single-select align group so selection *glides + squishes*.

**3. Leverage the dock APIs for contextual switching (the user's explicit ask).**
Mount a `<GlassDock>` with a `<DockLayerGroup>` whose layers ARE the toggle families (Toggle / Group / Chip), so the rail **contextually switches** which demo is foregrounded with the dock crossfade + size FLIP — the page *teaches the dock system while demoing toggles*. Or a `<DockStack mode="facets">` rail (**BE.W-DOCK-RAIL-REALIZE**) whose facet chips carry per-family accent hues via `--glass-accent` (**BB.W-GLASS-ACCENT** per-instance chromatic rim). This is "leverage the dock APIs (contextual switching/animating)" verbatim.

**4. Promote ONE specimen to a hero focal moment + fix the broken content.**
Make the `ToggleChip` cell-variant the editorial lead (it is the richest control), give each cell a **distinct real hue** (warm = `--section-color-9` amber, cool = `--section-color-3` teal, mono = ink) instead of three identical `--viz-fourier` reds — so the palette picker actually *picks palettes*. Activate a `text-subheading` (**AZ.W-HIERARCHY** canonical section rung) per card title so sections command, not whisper. Animate the state-readouts (a `<Transition>` or `useAnimatedNumber` on the `marks` array) so state changes are *alive*, not hard-cut.

**5. Kill the double-header + tighten the language.**
Remove the hand-rolled in-card `<header>` (the IconChip + "On/off and grouped toggles — the section identity is the ONE color event" blurb) — it duplicates the chassis chrome header and the blurb is meta-commentary ABOUT the design system, not about toggles. Replace with a real blurb on the manifest row ("On/off marks, exclusive groups, and chip/cell pickers."). Standardize the subpath label as `@mkbabb/glass-ui/toggle-group` (already correct in the chrome chip — ensure it is the single source). Drop "the section identity is the ONE color event" entirely (superfluous design-system language leaking into product copy).

---

### 5-LINE VERDICT
The forms/toggle page is a correct, disciplined **spec-sheet** — and a generic-AI-template one: a single tall glass card of six gap-stacked label/control/readout rows over a FLAT cream wash, so the iOS-27 six-layer composite has no colorful backdrop to refract and collapses to an off-white rectangle. Hierarchy dies after the (strong) display `<h1>`: uniform caption labels, no section-rung weight, debug-readout noise, and a duplicated in-card header re-introducing the D1-4 double-title inversion. Animation is near-absent at the north-star bar — no liquid-hover gleam, hard-cut state readouts, a non-gliding indicator, and the cell-variant selected state is a dead R10-5 GRAY SLAB with three identical broken red swatches. The headline fixes: stage each subsection in its OWN glass-floating/deep card over ONE shared colorful aurora (DockStage bento), wire `vSpecular` + selected-as-glass + the `useLiquidFlex` gliding indicator, and leverage `<DockLayerGroup>`/`<DockStack facets>` for the contextual-switching the user asked for. It is well-built primitives in an unfinished composition — the gap is entirely at the PAGE layer, not the component layer.
