# display/buttons — FRONTEND-DESIGN deep critique (Pass-E)

**Surface:** `demo/stories/display/buttons.vue` · live `http://localhost:5173/display/buttons`
**Lens:** world-class frontend designer, DESIGN.md north star, frontend-design skill (distinctive · production-grade · AVOID generic-AI aesthetics).
**Captured:** 1440×900, light mode, real `.demo-main-scroller` (scrollHeight 2221), dock shell present (SidebarDock + BottomDock collapsed).

---

## TL;DR

The page has ONE bespoke moment (the display-5 "Buttons" hero + the aurora CTA band) bolted onto a flat **spec-sheet body**: eight sections stacked as hairline-delimited rows on a SINGLE cream `rounded-card` plate. The user's literal asks — *each sub-section in its own glassy card; main area bigger; leverage dock APIs; deft component series; glass over colorful aurora; standardize import-path; tighten language* — are ~85% unmet. It reads as a competent component dump, not an iOS-26 Liquid-Glass showcase. The glass variants are demonstrated over flat cream (nothing to refract, against the SFC's own thesis), there is a **double-header redundancy** at the top, and 5 of 8 sections are 100% static (no per-element entrance/hover/press choreography beyond the library button defaults). This is the canonical *"canon-on-paper / muddy-in-render"* gap DESIGN §L1 and `proof:ba-gestalt` were written to kill.

---

## What works (keep)

- **The hero is right.** `text-display-5` (109px) "Buttons" on the √φ audacious ladder with the `story-hero-title-rise` entrance — this IS the typography-forward north star. Eyebrow + import-path chip + display title is a strong, distinctive masthead.
- **The aurora CTA band exists at all.** `<Aurora :config="OPENAI_SKY">` behind `primary-audacious` + `gold-audacious` at `size="lg"` is the one place glass-over-field reads. The CTA-presence inversion (CTA louder than destructive) is correctly fixed *for that one row*.
- **Glass material is real.** Computed `backdrop-filter: blur(13px) saturate(1.6) brightness(1.02)` on `variant="glass"` — the §L1 six-layer composite (blur+saturate · tint · rim) is genuinely wired, not faked.
- **`scroll-cascade` is on the section column** — the body DOES fade-build on scroll (medium-tier §L4 staging present at the column level).

---

## The defects (exhaustive, opinionated)

### 1. VISUAL HIERARCHY — the double-header + the flat body

- **Double-eyebrow / double-title collision.** StoryPage chrome renders eyebrow `DISPLAY · BUTTONS` + `<h1 text-display-5>Buttons`. Then the FIRST `<section>` *repeats* `DISPLAY · BUTTONS` eyebrow + `<h2 text-title>Launch the sequence` + a blurb. Two eyebrows, two titles, ~140px apart. This is exactly the D1-4 double-`<h1>` / W-HIERARCHY2 reading-order inversion the precept fights — here re-introduced by hand. The eye lands twice and bounces.
- **The ladder collapses after the hero.** Below the masthead every section is `text-subheading` (20.4px / 600) — ONE rung, eight times. The page goes display-5 → 20px and never modulates again. There is no `text-display-mega`/`-audacious` ACTIVATION on any focal specimen (the §Suffuse "activate the mega/hero tiers on the focal number/word" mandate is unused). The body is monotone.
- **One plate, no cards.** Measured: `opaqueSectionHasCard` resolves to the single StoryPage `rounded-card` — every section is a `flex flex-col gap-3` row inside ONE plate, delimited by `story-sections--delimited` hairlines. The user asked for *"each sub-section in its OWN glassy card."* There are ZERO per-section glass cards (`glass-card: 0`, `glass-resting: 1` total page-wide). The body reads as a Notion doc, not a glass showcase.

### 2. THE MAIN CARD AREA IS TOO SMALL / TOO NARROW

- Content column ≈1086px inside a 1357px main, on a 1440 viewport — but the *specimen canvases* (the button rows) are tiny `flex-wrap gap-3` strips hugging the left edge with vast dead cream to the right. The "main card area" the user wants BIGGER is the demo canvas per section, and right now each is a ~60px-tall sliver. The glass-register / raw-glass-btn `ShowcaseFrame tier="field" pad="lg"` frames are the only ones with breathing room, and even those are narrow bands. There is no large, central, stage-like demo surface.

### 3. GLASS OVER COLORFUL AURORA — half-done, against the SFC's own thesis

- The SFC comment is explicit: *"staged over the live field so the lit glass reads… glass over a flat cream page is invisible-by-construction (the blur has nothing to bend)."* Yet only the CTA row has a real aurora. The "Glass register" and "Raw .glass-btn" `tier="field"` frames drop the `bg-card` plate but sit over the **flat cream page** — there is NO field behind them either (only ONE `<canvas>` on the whole page, in the CTA). So the glass-register buttons refract flat cream = the very invisible-lozenge the comment claims to fix. `glassBtn` border computes to `α 0.04` and `.glass-btn` icon is `blur(1px)` (the dock floor) — these read as faint gray pills, NOT liquid glass. **This is a §L1 violation in the demo that exists to teach §L1.**
- DESIGN §L1 "glass cannot sample glass" + §Composition demand a monotone Aurora→Dock→Card→Modal Z-stack. The right move is ONE shared aurora field behind the WHOLE section column (the `<DockStage>` pattern, already shipped) so every glass specimen reads over live color — within the one-GL-context-per-route budget.

### 4. ANIMATION AFFORDANCE — 5 of 8 sections are inert (the iOS-27 bar is unmet)

- DESIGN §L3/§L4 + `affordance-map.md` mandate the FIVE primitives (hover-lift · gleam-track · press-squish · drag-morph · focus-ring) on every interactive element, and HIGH animation affordance for EVERY component. Reality:
  - Buttons carry the LIBRARY default (hover-lift + press-squish + gleam) — fine, but that's the floor, not a showcase.
  - The sections themselves have NO staggered entrance beyond the column-level `scroll-cascade` (the per-element gravity-rise W-HIERARCHY2 cluster is NOT applied to specimen rows).
  - "Four-state contract" is faked with `scale-[0.97]` and a `bg-[var(--glass-bg-resting)]` static class labeled "Hover (sim.)" / "Active (sim.)" — a STATIC paste pretending to be a state. A button page that *simulates* states with frozen classes instead of demonstrating LIVE choreography is the antithesis of "every component alive." This section should be a single button you can actually hover/press/toggle with the real spring, annotated live.
  - The viz-basis + cartoon-shadow rows are plain `<Button>` with raw Tailwind hover translates — no spring, no gleam, generic.
- Nothing here demonstrates the DRAG-MORPH primitive, the GLEAM-TRACK on a large surface, or a dock contextual-switch — all shipped APIs the page could flex.

### 5. LEVERAGE THE DOCK APIs — entirely unused

- The user asks the page to *"leverage the dock APIs (contextual switching/animating)"* and *"deftly use a series of glass-ui components (docks/procedural-anims/cards/tabs/buttons)."* The page imports `Button` + `Aurora` and nothing else. No `<SegmentedTabs>` to switch between variant families, no `<DockLayerGroup>`/`<DockStack mode="facets">` to contextually switch the demo register, no `<GlassDock>` mini-instance hosting the button playground. The shell dock is present but the PAGE never composes a dock. This is a button page on a glass design-system that ships a world-class dock — and shows none of it.

### 6. POLISH / DISTINCTIVENESS — generic-AI-template smell

- Hairline-delimited stacked sections on one cream plate with a left-hugging chip strip per section is the single most common generic-AI component-gallery layout. It is competent and forgettable. Nothing about the BODY says "bespoke premium iOS-26."
- The `destructive` button renders LOUD red (`oklab` filled) despite the SFC's claim it's "a quiet specimen" — it's the second-loudest thing on the page after the aurora. The intent and the render disagree.
- Import-path label: the hero shows `@mkbabb/glass-ui/button` (good), but the SFC `import { Button } from "../../../src/components/ui/button"` — the demo imports from a relative `src/` path while labeling the public subpath. The user's "standardize the import-path label" ask wants the LABEL and the actual import to speak the same canonical subpath across all pages (a shared chip primitive reading the real published path).

### 7. SPACING / RHYTHM + COLOR SUFFUSION

- The golden `--card-pad` ladder is on the outer plate, but the per-section internal rhythm is flat `gap-3`/`gap-4` — no √φ block-over-inline modulation, no `--card-pad-section-gap` breath between the title cluster and the specimen. Sections run together (the hairline is doing all the separation work).
- Color suffusion: the page has TWO color events (aurora CTA + the viz-basis red/blue/violet row) plus the loud destructive — that's ~3 competing events against the one-color-event-per-surface proportion (`proof:suffuse` d3). The body otherwise is correctly ink-on-cream, but the events aren't proportioned or earned.

---

## TOP design moves (ranked — make this exceptional)

1. **Stage the WHOLE body over ONE shared aurora field** via the shipped `<DockStage>` / `tier="field"` pattern, so every glass specimen reads over live color (DESIGN §L1 six-layer composite + §Composition monotone Z-stack; one-GL-context budget). Kill the flat-cream-behind-glass contradiction.
2. **Each section in its OWN glass card.** Wrap each `<StorySection>` body in a `.glass-resting`/`.glass-quiet` card (DESIGN §L1 tier ladder — pick the lowest tier that floats over the field). This is the literal ask AND the gestalt fix for the flat-plate spec-sheet. Cards over aurora = the showcase reads as the product.
3. **Kill the double-header.** Suppress the first section's redundant eyebrow+title (W-HIERARCHY2 / D1-4) — the hero owns the page descriptor ONCE. Re-flow eyebrow→title→blurb as the single gravity-rise cluster.
4. **Make the demo BIGGER + dock-driven.** Replace the eight stacked strips with a large central stage whose register is switched by a `<SegmentedTabs variant="pill">` or a `<DockStack mode="facets">` contextual rail (Glass · Opaque · Sizes · Chromatic · States) — leverage the dock contextual-switch/animate APIs the user named. One big animated canvas, dock-switched, not eight slivers.
5. **Make the four-state section LIVE.** One real `<Button>` with a live hover/press/toggle harness + annotated spring readout (DESIGN §L3 tap choreography), not frozen `scale-[0.97]` sim classes. Demonstrate the actual `useSpringPress` interruptible spring + gleam-track.
6. **Activate the type ladder + per-element entrance.** Promote ONE focal word/specimen to `text-display-mega`/`-audacious` (§Suffuse activation), and give specimen rows the W-HIERARCHY2 staggered gravity-rise entrance so the body is ALIVE, not column-faded-once.
7. **Proportion color + fix destructive.** Make destructive genuinely quiet (it's a specimen, not a CTA), hold the page to its earned color events, and standardize the import-path chip to the real canonical subpath as a shared primitive across pages.

---

## North-star scorecard

| Axis | Grade | Note |
|---|---|---|
| Visual hierarchy | C− | strong hero, double-header collision, monotone 20px body |
| Typography-forward (√φ) | C | hero only; ladder collapses + never re-activates |
| Affordance (interactive cues) | B− | library button defaults present + clear |
| Animation affordance (iOS-27 bar) | D+ | 5/8 sections inert; states FAKED with static classes |
| Polish / distinctiveness | C− | bespoke hero on a generic-AI spec-sheet body |
| iOS-26 glass fidelity (§L1) | D | glass demoed over flat cream — invisible-lozenge, against its own thesis |
| Spacing/rhythm (golden) | C | outer ladder ok; flat internal gaps, sections run together |
| Color suffusion proportion | C | ~3 competing events; destructive over-loud |
| Dock-API leverage | F | zero dock/tabs/procedural composition in the page |
