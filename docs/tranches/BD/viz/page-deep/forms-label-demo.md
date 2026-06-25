# Pass-E — forms/label META-STORYBOOK DEMO audit

- **Route**: `/forms/label` · **SFC**: `demo/stories/forms/label.vue` (105 lines) · **Import label**: `@mkbabb/glass-ui/label`
- **Live**: http://localhost:5173/forms/label (verified — full-page screenshot + DOM probe, 1440×900)
- **Manifest row**: `s("forms", "label", "Label")` (manifest.ts:744) — NO options → inherits `CATEGORY_DEFAULT_BG.forms = "grid"` (manifest.ts:184), `variant="page"`, `heroScale="4"`. Import chip `@mkbabb/glass-ui/label` (manifest.ts:243).
- **Verdict**: thin, flat, single-card spec-sheet over a near-invisible cream-on-cream grid — the identical failure shape as sibling `forms/checks`/`forms/inputs`. The Label component itself has almost no surface (a `<label>` is intrinsically minimal), so the page leans hard on the FORM CONTROLS it labels — yet it composes them as a bare static column, missing nearly every North-Star bar.

---

## Live DOM census (in-article, excludes the global shell dock)

```
labels: 7   inputs: 2   checkboxes: 1   radios: 3   switches: 1
buttons: 0   docks: 0   tabs: 0   iconChips: 1   canvases: 0   sections: 6
innerGlassCards: 1  (the outer story-hero-card ONLY — ZERO per-section cards; one bare bg-card "switch row" box, not a glass card)
card: glass-resting / story-hero-card--page · bg oklab(.934 /.664) · backdrop blur(10px) saturate(1.05) · 1152×1003px
background: .story-hero-bg.grid-bg.story-hero-bg--bleed · position:fixed · repeating-linear-gradient srgb .11/.098/.09 / 0.11α (≈11%) over rgb(251,250,248) — near-invisible cream-on-cream
input well: rgb(243,236,226) · backdrop blur(8px) saturate(1.05) brightness(1.02)  (the well IS frosted, but over nothing colorful)
```

The page is **five StorySections (for-attribute / nested checkbox / switch row / radio group / peer-disabled) stacked vertically inside ONE `glass-resting` card**, separated by `--configurator-divider` hairlines (the auto `.story-sections--delimited` seam). That is the whole composition — a static label-coupling inventory sheet.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + full API?

**PARTIAL on the component, FAIL on the page.**

- **The five coupling MODES are correct and pedagogically complete (credit).** The SFC walks every Label binding channel: `for`-attribute coupling (label.vue:47-48), nested-checkbox wrap (label.vue:57-60), label-left settings row (label.vue:67-75), per-radio label wrap (label.vue:82-93), and `peer-disabled:` dimming (label.vue:99-103). For a `<label>` primitive that IS the full a11y API surface, and it's honest — clicking the "Email address" label focuses the input live.
- **But the `required?` prop is NEVER demoed.** `Label.vue:16` ships a first-class `required?: boolean` that renders the decorative `*` asterisk (Label.vue:38) — the page exercises ZERO of it. The single most "label-specific" API beyond `for`-coupling is silently absent. A `<Label required>` row is the obvious missing specimen.
- **No size/weight axis, no `IconTooltip`/`LabeledField` adjacency.** The natural label family members (`<LabeledField>` parent + the `IconTooltip` co-located label, manifest.ts:1198-1206) are siblings the page never gestures at — a Label demo is the canonical home to show the label-with-help-tooltip register.
- **No contextual switching / dock APIs.** Zero in-page dock, zero tabs, zero segmented control (`docks:0 tabs:0`). The user explicitly asks to "leverage the dock APIs (contextual switching/animating)" — wholly absent. The five coupling modes are the perfect candidate for a `<DockLayerGroup>`/`<SegmentedTabs>` to switch between, each mode in its own glassy sub-card.
- **No per-control entrance/commit affordance.** The `.scroll-cascade` section build is inherited from the chassis (correct); the individual controls carry only the four-state transition. No stagger-reveal of the label→control pair, no focus-bloom on the labelled well, no value-commit pulse. North Star: "HIGH animation affordance for EVERY component."

## (2) COMPONENT ABILITY — does it deftly compose a SERIES of glass-ui components?

**FAIL.** In-article glass-ui surface = `{Label ×7, Input ×2, Checkbox ×1, RadioGroup (3 items), Switch ×1, IconChip ×1}`. No Button, no Dock, no Tabs, no Card-per-section, no procedural anim, no live preview. It is a flat label-coupling list, not a composition. A strong Label demo would, e.g.:
  - seat the five coupling modes behind a `<SegmentedTabs variant="pill">` or `<DockLayerGroup>` (the contextual-switching ask), each mode in its OWN glassy sub-card;
  - build a live **form-builder / settings scene** where the labelled controls drive a visible `<Card>` preview (the email + plan + notify state render a "summary card"), exercising the immediate-effect of each labelled control;
  - add the `required` asterisk row + `IconTooltip`-help-label + `<Button>` submit/reset, lifting the family count from ~5 atoms to a 7-8-family deft scene.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

**FAIL on the colorful-aurora bar.** Background is the static `grid` wash (`.story-hero-bg.grid-bg`, position:fixed), lines at ~11% α over `rgb(251,250,248)` — near-invisible cream-on-cream (screenshot: the page reads as a flat gray-white sheet). The card IS translucent (α .664, `blur(10px) saturate(1.05)`) AND the input well is frosted (`blur(8px) saturate(1.05) brightness(1.02)`) — so the glass *mechanism* is live — but there is **nothing colorful behind it** for the glass to refract. The DESIGN.md six-layer optical composite collapses to "milky-white box on white." The user's binding ask — "glass demos over COLORFUL aurora backgrounds so the morphism reads" — is unmet. Root cause: the forms-band manifest default `grid` (manifest.ts:184) with no per-row override. PAPER morphism is nominally present (the grid IS the paper register) but so faint it reads as no-background. **A label/forms page is the textbook case for an aurora field** — the frosted input wells would refract a live colorful backdrop beautifully.

## (4) STRUCTURE — each sub-section in its OWN glassy card? main area BIG enough?

**FAIL on both — the user's headline ask, unmet.**
- **One card, not per-section.** All 5 StorySections live inside the single `story-hero-card--page` (`glass-resting`), separated by hairline dividers (DOM: `innerGlassCards:1`). The "switch row" (label.vue:67) is a bare `rounded-card border bg-card` box — an OPAQUE plate, not a glass card. The user's explicit ask — "each sub-section in its OWN glassy card" — is the opposite of the divider-stack idiom shipped. The five coupling modes should each be a discrete `<Card surface="glass">` (or `glass-floating` tier) over the aurora field.
- **Main card area underfilled.** The card is 1152px wide × 1003px tall, but every control sits in a thin left-aligned column capped at `max-w-sm` (label.vue:45,65,99) — the right ~550px is dead space (screenshot: acres of empty cream to the right of every row). The user asks the "main card area BIGGER (more screen space)"; the content does not fill it. A per-mode card grid (2-up or 3-up) would consume the width generously instead of stranding it. The page is also short relative to viewport — five small rows in a tall card.

## (5) PATH-LABEL standardization

**PASS.** The page chip renders `@mkbabb/glass-ui/label` (manifest.ts:243, screenshot-confirmed) — the standardized `@mkbabb/glass-ui/<subpath>` form, correct and singular (one component, one chip — cleaner than the sibling `forms/checks` which chips `/switch` for three families). The `<script>` imports are deep relative `../../../src/components/ui/label` (label.vue:4-8) — acceptable as demo-internal (not user-facing copy). No drift.

## (6) LANGUAGE — superfluous prose to tighten?

- **label.vue:37-40 header blurb**: "Accessible control labels and hit-targets — **the section identity is the ONE color event.**" → the trailing clause is internal design-system jargon (the W-SUFFUSE one-color-event rule) leaked into user-facing demo copy. Tighten to a plain descriptor: "Accessible control labels and hit-targets."
- **label.vue:11-14 comment block**: the `BC.W-SUFFUSE-reconcile` rationale is fine as a code comment (not rendered); no action.
- **label.vue:59 / 87-92**: "I agree to the **paper-and-glass manifesto**." / "Pro — **private palettes**." / "Studio — onboarding + **ghostwritten tokens**." — cute filler copy; harmless levity, acceptable, but borderline cutesy. Keep or trim to taste.
- **label.vue:100**: section eyebrow "peer-disabled dims the label" — implementation jargon as a user-facing section title; a label demo can say "Disabled field" plainly. Minor.

## (7) BUGS / dead demo

- **No functional bug.** All controls toggle live; the `for`-coupling focuses the input; the peer-disabled dims correctly. No dead demo, no broken animation. 1 console warning (non-error), 0 errors.
- **The `required` prop is dead-on-the-page** (not a bug — an unexercised API): Label.vue:16,38 ships it; the demo never sets it, so the most label-specific affordance is invisible. Flag for the re-scaffold, not a defect.
- **Header `<header>` is hand-rolled, not the chassis cluster** (label.vue:24-42): an inline `borderLeft` 3px rail + IconChip + tinted eyebrow — the PH3-safe inline-border form (per the comment). Works, but it's a per-SFC hand-roll of what the page-standard chassis aims to own; flag for the chassis fold, not a bug.

---

## Tranche actions (ranked)

1. **[Band-16/W-STORY-PAGE-STANDARD] Re-scaffold as per-section glassy cards over aurora.** The five coupling modes each become a discrete glassy sub-card (a `<DemoSpecimen>`) over an **aurora background** (override the forms-band `grid` default on this row, or fix the band default to a vivid field). Closes structure-ask (own cards) + suffusion-ask (colorful field) + main-area-fill in one move. The frosted input wells will finally read as glass.
2. **[W-DEMO-COMPOSE] Add a live form/settings scene + contextual switch.** A `<SegmentedTabs>` or `<DockLayerGroup>` switches the coupling modes; the labelled controls drive a visible `<Card>` preview. Lifts component-ability from ~5 atoms to a 7-8-family scene and lands the dock-API ask.
3. **[W-CONTROL-API] Exercise the fuller Label API** — add the `<Label required>` asterisk row + the `IconTooltip`-help-label register + a size/weight axis, so the page shows Label at its BEST, not the bare `for`-coupling minimum.
4. **[W-LANG] Tighten the header blurb** — drop the "ONE color event" design-jargon trailing clause (label.vue:39-40).
