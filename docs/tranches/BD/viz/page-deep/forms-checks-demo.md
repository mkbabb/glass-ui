# Pass-E — forms/checks META-STORYBOOK DEMO audit

- **Route**: `/forms/checks` · **SFC**: `demo/stories/forms/checks.vue` (126 lines) · **Import label**: `@mkbabb/glass-ui/switch`
- **Live**: http://localhost:5173/forms/checks (verified — full-page screenshot + DOM probe)
- **Manifest row**: `s("forms", "checks", "Checkbox · Radio · Switch")` (manifest.ts:720) — no options → inherits `CATEGORY_DEFAULT_BG.forms = "grid"` (manifest.ts:184), `variant="page"`, `heroScale="4"`.
- **Verdict**: thin, flat, single-card spec-sheet. The component-LEVEL motion (Switch thumb spring, checkbox check-in) is correct, but the PAGE composition misses nearly every North-Star bar — identical failure shape to the sibling `forms/inputs`.

---

## Live DOM census (in-article, excludes global shell dock)

```
checkboxes: 4   radios: 6   switches: 3   inputs: 0   buttons: 0
docks: 0   tabs: 0   iconChips: 2   canvases: 0   sections: 4
innerGlassCards: 1 (the outer story-hero-card only — ZERO per-section cards)
card tier: glass-resting / story-hero-card--page, bg oklab(.934 / .664), backdrop blur(10px) saturate(1.05)
background: .story-hero-bg.grid-bg.story-hero-bg--bleed, position:fixed (full-bleed)
  grid lines: repeating-linear-gradient at srgb .11/.098/.09 / 0.11 α (≈11%) over rgb(251,250,248) — near-invisible cream-on-cream
```

The page is **three StorySections (Checkbox / RadioGroup / Switch) stacked vertically inside ONE resting Card**, separated by `--configurator-divider` hairlines (the auto `.story-sections--delimited` seam). That is the entire composition — a static control-inventory sheet.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + full API?

**PARTIAL on the component, FAIL on the page.**

- **The component motion is actually correct (credit where due).** DOM-probed: the Switch thumb rides a real spring — `translate 0.34s linear(0 0%, 0.10038 …, 1.01981 20.4%, … )` — the W-GLASS-CAL `--spring-snappy` overshoot curve, NOT a flat bezier. Checkbox/radio carry the four-state `background-color/box-shadow/border-color 0.12s` transition. So toggling a control IS alive at the four-state bar. This is the page's one genuine strength.
- **But the API surface shown is the bare minimum.** Each of the three families is demoed as `{default, one variant, disabled}`:
  - Checkbox (checks.vue:55-72): tos / marketing / indeterminate / disabled — the `"indeterminate"` model state IS shown (checks.vue:20,65), good.
  - RadioGroup (checks.vue:79-102): two groups, plan + delivery-with-disabled.
  - Switch (checks.vue:109-122): notifications / airplane / disabled.
  - Missing: NO size axis, NO `<ToggleGroup>`/`<ToggleChip>` sibling (the natural radio-group adjacency), NO card/tile selection variant (`ToggleGroupItem variant="card"` — CLAUDE.md §BB.W-CONTROL-TOKENS), NO label-on-left vs label-on-right, NO descriptive secondary text per row (the iOS settings-row idiom these controls live in).
- **No contextual switching / dock APIs.** Zero in-page dock, zero tabs, zero segmented control. The user explicitly asks to "leverage the dock APIs (contextual switching/animating)" — wholly absent. A selection-controls page is the canonical home for a `<DockLayerGroup>` or `<SegmentedTabs>` to switch between the three families, or a live "settings panel" composition where toggles drive a visible preview.
- **No entrance/exit affordance authored per control.** The `.scroll-cascade` section build is inherited from the chassis (correct), but the individual controls have no stagger-reveal, no value-commit pulse, no error/confirm feedback. North Star: "HIGH animation affordance for EVERY component."

## (2) COMPONENT ABILITY — does it deftly compose a SERIES of glass-ui components?

**FAIL.** In-article glass-ui surface = `{Checkbox ×4, RadioGroup ×2 (6 items), Switch ×3, Label ×N, IconChip ×2}`. No Button, no Dock, no Tabs, no Card-per-section, no procedural anim, no live preview. It is a flat control list, not a composition. A strong selection-controls demo would, e.g.:
  - seat the three families behind a `<SegmentedTabs variant="pill">` or `<DockLayerGroup>` (the contextual-switching ask), each family in its own glassy sub-card;
  - build a live **settings-panel scene** — switches + radios driving a visible `<Card>` preview (airplane-mode dims a panel, plan-radio swaps a price), exercising the immediate-effect semantic the Switch blurb claims (checks.vue:106-107);
  - add a `<Button>` to commit/reset, and the `<ToggleGroup type="single">` radio-semantics arm (BB.W-CONTROL-TOKENS) as the explicit single-select adjacency.
  That exercises 5-6 families in one deft scene vs the current 3 static atoms.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

**FAIL on the colorful-aurora bar.** Background is the static `grid` wash (`.story-hero-bg.grid-bg`, position:fixed), lines at ~11% α over `rgb(251,250,248)` — near-invisible cream-on-cream (screenshot: the page reads as flat gray-white). The card IS translucent (α .664, `blur(10px) saturate(1.05)`) so the glass *mechanism* is live, but there is **nothing colorful behind it** for the glass to refract — the six-layer optical composite (DESIGN.md) collapses to "slightly milky white box on white." The user's binding ask — "glass demos over COLORFUL aurora backgrounds so the morphism reads" — is not met. The forms-band manifest default `grid` (manifest.ts:184) is the root cause; this page needs an aurora / vivid liquid-grid field for the glass to read. PAPER morphism is nominally present (the grid IS the paper register) but so faint it reads as no-background.

## (4) STRUCTURE — each sub-section in its OWN glassy card? main area BIG enough?

**FAIL on both — this is the user's headline ask, unmet.**
- **One card, not per-section.** All 3 StorySections live inside the single `story-hero-card--page` (`glass-resting` from StoryHero.vue), separated by hairline dividers (DOM: `innerGlassCards: 1`). The user's explicit ask — "each sub-section in its OWN glassy card" — is the opposite of the divider-stack idiom shipped. Checkbox / RadioGroup / Switch should each be a discrete `<Card surface="glass">` (or a `glass-floating` tier) over the aurora field.
- **Main card area underfilled.** The controls are a thin left-aligned column of small chips/rows inside a wide `--story-page-max-inline` (~6xl) card — acres of dead space to the right (screenshot). The user asks the "main card area BIGGER (more screen space)"; the content does not fill it. A per-section card grid (or a 2-up settings layout) would consume the width generously instead of stranding it.

## (5) PATH-LABEL standardization

**PASS.** The page chip renders `@mkbabb/glass-ui/switch` (manifest.ts:234, screenshot-confirmed) — standardized `@mkbabb/glass-ui/<subpath>` form, correct. No in-body import-path prose to drift (unlike `forms/inputs`, which leaked a `@/components/custom/search` dev alias). The imports in `<script>` are deep relative `../../../src/components/...` (checks.vue:5-9) — acceptable as demo-internal (not user-facing copy). One minor note: the page demos THREE families (checkbox/radio/switch) under a single `/switch` chip — the chip names only one of the three. If the standardized chassis allows it, a multi-subpath page could chip `@mkbabb/glass-ui/{checkbox,radio-group,switch}` or the page could be re-scoped; minor.

## (6) LANGUAGE — superfluous prose to tighten?

- **checks.vue:44-47 header blurb**: "Checkboxes, radios, and switches — **the field controls stay ink; the section identity is the ONE color event.**" → the trailing clause is internal design-system jargon (the W-SUFFUSE one-color-event rule) leaked into user-facing demo copy. Tighten to a plain descriptor: "Checkboxes, radios, and switches."
- **checks.vue:52-54**: "Standard, indeterminate, and disabled." — restates the visible chips; borderline filler but acceptable as a one-liner.
- **checks.vue:76-77**: "One-of-N. **Inline layout with labels for hit-targets.**" — the second sentence is implementation talk (layout/hit-targets), not demo value; trim to "One-of-N selection."
- **checks.vue:106-107**: "Immediate-effect toggle. Prefer over checkbox when the change is instant." — the guidance sentence is decent (it teaches WHEN to use Switch); keep, but it's the only blurb earning its place.
- **checks.vue:11-15 comment block**: the `BC.W-SUFFUSE-reconcile` rationale comment is fine as a code comment (not rendered), no action.

## (7) BUGS / dead demo

- **No functional bug.** All controls toggle live (verified DOM transitions present); the indeterminate checkbox carries its `"indeterminate"` model (checks.vue:20). No dead demo, no broken animation.
- **The `opacity-60` wrapper double-dims disabled rows** (checks.vue:68,98,118): the wrapper sets `opacity-60` AND the control's own `disabled` state already dims (`opacity-disabled`) — the label+control read doubly-faded. Minor: the disabled state is already expressed by the control; the wrapper opacity is redundant and over-dims the label. Cosmetic, not a bug.
- **Header `<header>` is hand-rolled, not the chassis cluster** (checks.vue:31-49): an inline `borderLeft` 3px rail + IconChip + tinted eyebrow — the PH3-safe inline-border form (per the comment). It works, but it's a per-SFC hand-roll of what `W-STORY-PAGE-STANDARD` aims to standardize; flag for the chassis fold, not a bug.

---

## Tranche actions (ranked)

1. **[Band-16/W-STORY-PAGE-STANDARD] Re-scaffold as per-section glassy cards.** Checkbox / RadioGroup / Switch each become a discrete `<DemoSpecimen>` glassy sub-card (a `<DemoMatrix>` of state per family), over an **aurora background** (override the forms-band `grid` default on this row, or fix the band default to a vivid field). Closes structure-ask (own cards) + suffusion-ask (colorful field) + main-area-fill in one move.
2. **[W-DEMO-COMPOSE] Add a live settings-panel composition** — switches/radios drive a visible `<Card>` preview, with a `<SegmentedTabs>` or `<DockLayerGroup>` switching the three families (the contextual-switching / dock-API ask). Lifts component-ability from 3 atoms to a 5-6-family scene.
3. **[W-CONTROL-API] Exercise the fuller API** — add the `<ToggleGroup type="single">` radio-semantics arm + `ToggleGroupItem variant="card"` tile selection + a size axis, so the page shows the families at their BEST, not the minimum.
4. **[W-LANG] Tighten copy** — strip the one-color-event jargon (checks.vue:46-47) + the hit-target implementation prose (checks.vue:77); keep only the Switch when-to-use guidance.
5. **[minor] Drop the redundant `opacity-60` disabled wrappers** (checks.vue:68,98,118) — the control's own disabled state already dims.

## What is already RIGHT (do not regress)

- Component-level four-state + spring motion is correct (Switch thumb on the snappy overshoot, checkbox/radio four-state transitions).
- The indeterminate checkbox model is shown.
- Path-label chip is standardized (`@mkbabb/glass-ui/switch`).
- The `.scroll-cascade` section entrance + the dark-adaptive divider seam are inherited correctly from the chassis.
