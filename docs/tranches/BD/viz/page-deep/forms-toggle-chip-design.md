# forms/toggle-chip — FRONTEND-DESIGN deep critique (Pass-E)

**Page:** `demo/stories/forms/toggle-chip.vue` · live `http://localhost:5173/forms/toggle-chip`
**Subpath label:** `@mkbabb/glass-ui/toggle-chip`
**Captured:** 1440×900, light mode, full-page. Background resolves to the `forms → grid` category default — but `canvasCount: 0` (no live substrate); the page is a flat cream wash (`--neutral-0`). Body card is `glass-resting` (`backdrop-filter: blur(10px) saturate(1.05)`, oklab L≈0.93 α≈0.66). The cell + chip toggles ARE on the correct `glass-floating` register (`blur(13px) saturate(1.18)`, warm-cream α 0.8) — the selected state is glass, not a gray slab — but at cream-on-cream contrast it READS as a flat gray box anyway.

---

## VERDICT IN ONE BREATH

This is the **forms/toggle page's smaller, emptier sibling** — and it is even thinner. Two `StorySection`s (chip-multi, cell-exclusive) of mono-caption-label → control → mono-readout, inside ONE tall `glass-resting` card, over a FLAT cream page with **zero colorful backdrop**. It is *correct* (the toggles work, the selected state is genuinely `glass-floating` not a gray plate, the one-color-event teal is disciplined) and *completely inert* — it is the **generic-AI-template aesthetic the frontend-design skill exists to avoid**: a couple of controls floating in a wide whitespace frame, one faint accent, debug readouts, a single card. The DESIGN.md §L1 six-layer optical composite is *present on the outer card* and **invisible** because nothing colorful sits behind it to refract — glass theater with the lights off. Worse than its sibling: it has only TWO sections, so the wide 72rem card is ~70% dead whitespace. Every primitive is well-built; the **page composing them is unfinished.**

---

## 1. VISUAL HIERARCHY — strong title, then a cliff

- **The display `<h1>` is the only hierarchy event.** "Toggle Chip" at `text-display` (86px / 600) is genuinely commanding — the audacious √φ ladder doing exactly its job, the one place the typography-forward north star is honored. Then the eye **drops off a cliff**: below it is a near-white card holding two identical caption→control→readout blocks. **No second focal moment, no rhythm of weight.**
- **The chrome header and the in-card header DUPLICATE the descriptor.** The chrome says "FORMS · TOGGLE CHIP" + the `@mkbabb/glass-ui/toggle-chip` subpath chip + "chip vs cell variants…" blurb; the in-card hand-rolled `<header>` *also* renders an `<IconChip>` + "FORMS · TOGGLE CHIP" + "Segmented chip and cell toggles — the section identity is the ONE color event." The eye reads the same identity **twice in one band** — the exact `D1-4 double-<h1>` inversion `StoryHeader.vue` was built to kill, re-introduced by the page hand-rolling its own header *inside* the card on top of the chassis chrome header.
- **Zero `text-subheading` section rungs** (`h2Count: 0`, `subheadingCount: 0` confirmed live). Both section labels are `--type-caption` Fira-Code mono at 14.4px / weight 400 — a *caption whisper*, BELOW body weight. The page bypasses `<StorySection heading>` and passes `label=` only. Per **AZ.W-HIERARCHY**, a section should read as a section (the canonical `text-subheading` 20.4px / 600 rung), not a debug caption. The section *structure* is legible but never *commanding*.
- **The verbose `variant=chip — multi-select` / `variant=cell — exclusive selection (no ToggleGroup)` labels are prop-syntax, not titles.** They read as code comments dressed as headings. A section title is "Multi-select chips" / "Exclusive cells" — the `variant=…` machinery belongs in the blurb or a `<code>` aside, not the heading slot.
- **The mono state-readout (`selected: triangle`) is debug output dressed as content** at the same lane as the controls.

## 2. AFFORDANCE — adequate, but the cues are whispers

- The `ToggleChip` chip + cell carry the four-state contract (rest/hover/active/disabled per **DESIGN.md philosophy pillar 3**), so the states *exist*. But at rest the chips are **near-invisible**: "bone / contour / segment" render as faint outline pills (warm-ink rim α 0.88 on a cream plate) with almost no edge contrast — the §L1 **edge rim** layer has nothing to draw against because the contrast ceiling is cream-on-cream.
- **The selected cell READS as a dead gray box** even though it is correctly `glass-floating`. The capture shows "Triangle" as an opaque-looking gray slab. The register is right (W-REGISTER-IOS "selected reads as glass"), but with NO colorful backdrop the translucent warm-cream plate composites against flat cream → a muddy mid-gray. This is the **R10-5 "No gray" defect surfacing not from a token bug but from STAGING**: glass over nothing looks gray. The fix is not the token — it is putting a colorful field behind it.
- **No visible selected-vs-unselected differentiation at a glance.** A glance at the chip row cannot tell which of bone/contour/segment is pressed — the selected chip's only tell is a marginally denser fill. There is no accent rim, no glow, no icon weight shift.

## 3. ANIMATION AFFORDANCE — STATIC at the iOS-27 bar

The largest gap against the north star ("HIGH animation affordance for EVERY component").

- **Entrance — credit where due.** The page inherits the chassis `.scroll-build` page-build + `.scroll-cascade` section cascade + the `StoryHeader` 3-stage GRAVITY rise (**BB.W-SCROLL-MOTION** / W-HIERARCHY2), so the title cluster + the two section bodies arrive on a spring-clocked coupled transform+opacity build. The `<IconChip bloom reveal>` even pops on the snappy clock (**W-SUFFUSE3**). But once the cascade fires, **every control just sits there.**
- **Hover/press — no liquid-hover gleam.** `vSpecular` / `useSpecularTracking` (the **BB.W-LIQUIDHOVER** tier-root auto-arm) is NOT engaged on these toggle specimens, so hovering a chip gives a flat color-swap, not the pointer-following catch-light the §L1 inner-catch-light layer + the iOS-27 register promise. The §L3 tap-squish CSS floor exists (`--scale-press`), but there is no spring-coupled gleam, no brightness lift — the press is functional, not *alive*.
- **State transition hard-cuts.** Toggle a chip and the `selected: triangle` mono readout **snaps** with zero transition — no `<Transition>`, no `useAnimatedNumber`. A state demo whose *state readout* hard-cuts is the antithesis of "every element alive."
- **The cell grid is a static 2×4 — no gliding indicator.** The exclusive cell selection is a radio chooser; the iOS-grade move is an **elastic gliding/squishing indicator** (`useLiquidFlex` reciprocal-squish on `--spring-snappy`, the `SegmentedTabs` family precedent per **DESIGN.md §L2**). Here selection just repaints the active cell. The platform OWNS the gliding-indicator primitive and the page doesn't reach for it.
- **No `useDragMorph` anywhere.** The `:draggable` liquid-tab / pull-to-morph delight (**BB.W-DRAG-MORPH**) — "grab live chrome and pull it" — is exactly what would make a chip/cell page memorable. Absent.

## 4. POLISH + DISTINCTIVENESS — generic, not bespoke

- **It looks like a Storybook MDX smoke-test.** The tells: two controls in a wide whitespace frame, one accent color, mono caption labels, a debug readout, a single big card. Nothing here could not be generated by any component library's default docs theme.
- **The glass card is wasted (`canvasCount: 0`).** The page's whole identity is *Liquid Glass*, yet the ONE glass surface refracts a flat cream backdrop, so the §L1 six-layer composite collapses to "a slightly translucent off-white rectangle." Per **DESIGN.md §L1**, the glass *is* the optical composite of the backdrop; remove the colorful backdrop and you have removed the design. The §L5 worst-case-contrast mandate is moot here because there's no kinetic field to contrast against.
- **The toggle specimens float on the card with NO staging.** Compare the dock-band `<DockStage>` pattern (ONE shared offscreen-paused aurora behind a column of demos, each in a transparent framed tile): that is what "glass demos over colorful aurora" looks like. This page has zero of it.
- **Two sections in a 72rem card = ~70% dead whitespace.** The user's "main card area BIGGER / more screen space" is *available but unused* — the page is two narrow rows in a vast frame.

## 5. SPACING / RHYTHM — flat, not golden

- The outer card uses the φ-ladder padding correctly (`--card-pad-block = inline·1.272`, **BB.W-CARD-PAD**). But INSIDE, the chip row is `gap-2`, the cell grid `gap-3`, the section stack one `--story-page-section-gap` — one flat spacing scale with **no φ-stepped cadence** between label → control → readout. The micro-rhythm is evenly gray.
- **The chip row is left-flush in a single short line**, leaving the right ~75% of the `lg`-padded ShowcaseFrame as dead gutter. The cell grid is `grid-cols-2 sm:grid-cols-4` — better, but it sits in the same vast frame with the controls clustered top-left.

## 6. COLOR / SUFFUSION — disciplined but lifeless

- **The one-color-event rule is honored** — the `--section-color-3` teal identity (the forms-band cool stop) on the IconChip + the eyebrow border-left, per **AZ.W-SUFFUSE**. Correct restraint. But "disciplined" tips into "monochrome and dull" because there is NO second register doing the heavy lifting (no aurora, no procedural backdrop, no metal accent). One faint teal event on an otherwise gray-cream page is *too* quiet.
- **Unlike the sibling toggle page, the swatches here are NOT off-identity** — the cell icons are neutral lucide glyphs (Triangle/Square/Circle/Hexagon), no stray `--viz-fourier` red. So the page is *cleaner* but even *emptier* — there is not a single saturated pixel below the title.

---

## TOP DESIGN MOVES — make this page exceptional

**1. Each subsection in its OWN glassy card, over ONE colorful aurora (the headline move).**
Retire the single-tall-card layout. Stage the page as a **`<DockStage>`-style bento**: ONE shared, offscreen-paused `<Aurora>` (a warm-teal seed matching the `--section-color-3` forms identity) behind a 2-up grid of **glass-tier cards** (`surface="glass"` `glass-floating`, or the opt-in `.glass-deep` Apple-saturate tier — **BB.W-DEEP-GLASS**), one card per subsection (chip-multi · cell-exclusive — and SPLIT cell into a third "icon cells" card to fill the bento). Now the §L1 six-layer composite (backdrop blur+saturate · tint · edge rim · catch-light · shadow · grain) finally *refracts a colorful field*, the selected cell reads as glass-over-color instead of gray-over-cream, and the page becomes Liquid Glass. Honors "each sub-section in its own glassy card" + "glass demos over COLORFUL aurora" + "main card area bigger" (the bento fills the 72rem width). The `<ShowcaseFrame tier="field">` mode (BG-2 black-plate kill) is the existing seam for this.

**2. Wire liquid-hover + the gliding indicator on every specimen.**
Engage `v-specular` (**BB.W-LIQUIDHOVER** tier-root auto-arm) so each chip/cell gleams pointer-following on hover (the §L1 inner-catch-light layer alive). Add the elastic gliding indicator (`useLiquidFlex` reciprocal-squish on `--spring-snappy`, the `SegmentedTabs`/§L2 precedent) to the exclusive cell group so selection *glides + squishes* between cells, not a hard repaint. Animate the `selected:` readout with a `<Transition>` or `useAnimatedNumber` so the state echo is *alive*, not hard-cut.

**3. Leverage the dock APIs for contextual switching (the user's explicit ask).**
Mount a `<GlassDock>` with a `<DockLayerGroup>` whose layers ARE the variants (Chip / Cell), so the rail **contextually switches** which demo is foregrounded with the dock crossfade + size FLIP (**W-DOCK-MORPH-FAMILY**) — the page *teaches the dock system while demoing toggles*. Or a `<DockStack mode="facets">` rail (**BE.W-DOCK-RAIL-REALIZE**) whose facet chips carry per-variant accent hues via `--glass-accent` (**BB.W-GLASS-ACCENT** per-instance chromatic rim). This is "leverage the dock APIs (contextual switching/animating)" verbatim. The page already mounts the shell SidebarDock — promote it from chrome to *content*.

**4. Promote the cell grid to a hero focal moment + add real color identity.**
Make the icon-cell grid the editorial lead (it is the richest control) at a larger scale, give the selected cell a distinct accent glow via `--glass-accent` keyed to `--section-color-3` teal (so selection reads as a *colored* glass lift, not a denser gray), and activate a `text-subheading` (**AZ.W-HIERARCHY** canonical section rung) per card title so sections *command*. Rename the headings from prop-syntax ("variant=chip — multi-select") to product titles ("Multi-select chips" / "Exclusive cells").

**5. Kill the double-header + tighten the language.**
Remove the hand-rolled in-card `<header>` (the IconChip + "Segmented chip and cell toggles — the section identity is the ONE color event" blurb) — it duplicates the chassis chrome header AND the blurb is meta-commentary ABOUT the design system, not about toggle chips. The chrome header already carries the correct `@mkbabb/glass-ui/toggle-chip` subpath chip (standardized — leave it as the single source). Replace the in-card blurb with a real product line on the manifest row ("On/off chips and exclusive icon cells — `aria-pressed` over a reka-ui Toggle root."). Drop "the section identity is the ONE color event" and "deliberately unopinionated about ToggleGroup" entirely (superfluous design-system language leaking into product copy).

---

### 5-LINE VERDICT
The forms/toggle-chip page is a correct, disciplined **spec-sheet** — and a generic-AI-template one: two caption→control→readout sections in a single tall `glass-resting` card over a FLAT cream wash (`canvasCount: 0`), so the iOS-27 §L1 six-layer composite has no colorful backdrop to refract and collapses to an off-white rectangle, leaving the selected cell reading as a muddy gray even though its register is correctly `glass-floating`. Hierarchy dies after the (strong, 86px) display `<h1>`: zero `text-subheading` rungs, prop-syntax headings, a debug readout, and a hand-rolled in-card header re-introducing the D1-4 double-descriptor inversion. Animation is near-absent at the north-star bar — no `vSpecular` liquid-hover gleam, a hard-cut state readout, a non-gliding cell indicator, and no `useDragMorph`. The headline fixes: stage each subsection in its OWN `glass-floating`/`.glass-deep` card over ONE shared colorful aurora (DockStage bento filling the wide frame), wire `vSpecular` + the `useLiquidFlex` gliding indicator + `--glass-accent` selected glow, and leverage `<DockLayerGroup>`/`<DockStack facets>` for the contextual-switching the user asked for. It is well-built primitives in an unfinished composition — the gap is entirely at the PAGE layer, not the component layer.
