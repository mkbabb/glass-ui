# display/badge — component deep audit (Pass-E)

**Page:** `demo/stories/display/badge.vue` · **Import:** `@mkbabb/glass-ui/badge`
**Component(s) under audit:** `src/components/ui/badge/Badge.vue` + `src/components/ui/badge/index.ts` (`badgeVariants` CVA). No procedural viz. Demo also composes `IconChip` (header) — audited under its own page.

## What the component IS

A static metadata/status PILL. `<div data-slot="badge">` + a CVA with two axes: `variant` (default·secondary·destructive·outline·success·warning·info) paints fill+border+foreground; `size` (sm·md·lg) governs font/leading/padding off the `--ui-scale` comfort thread. Root base: `focus-ring inline-flex items-center gap-1.5 rounded-badge border font-semibold transition-control wrap-anywhere`. It is DELIBERATELY opaque — Badge is on the W54 glass-first legibility allowlist (`proof-glass-cohesion.mjs:90`, the "loud-pill" register: maximal contrast for status legibility, ratified, not unconverted). So it is correctly NOT a glass six-layer surface. Per DESIGN.md §Badges it is a non-interactive pill — no `:pressable`, no `role=button`, no aria-pressed.

## Findings

### 1 · ANIMATION — LOW affordance, the largest gap (correct for the role, but under-spec'd)
- The ONLY motion is `transition-control` (`btn.css:66`) — a SURFACE-only color/border/shadow cross-fade on `--ease-standard`/`--duration-control`. There is NO `transform` leg (by design — the split is canonical). But a Badge is non-interactive, so even the hover cross-fade rarely fires; in practice the pill is MOTIONLESS.
- NO four-state contract (no `:active` scale-press, no `.tap-squish`) — defensible: a Badge is not a button (DESIGN.md §136 names secondary-action as a composition concern, not bundled).
- **MISSING: entrance per motion-canon.** A status pill appearing/changing (count tick, status flip) is exactly the high-affordance moment the BD liquid-weight mandate targets, and the sibling primitives ALREADY ship the recipe: `IconChip` has `:reveal` (the `icon-chip-reveal` spring-clock scale(0.85)→1 entrance on `--spring-snappy`, P3-coupled opacity, PRM-carved). Badge has NO entrance/exit register. A status-FLIP (e.g. success→error) is a flat instant repaint — no goo/morph/crossfade weight. This is the dead-animation finding.
- `transition-control` only animates `background-color`; a `variant` swap that also changes `border-color`/`color` rides it, but the `dark:bg-[hsl(...)]` destructive arm and inline `:style` section fills are NOT in the property list edge cases — they snap.

### 2 · PROCEDURAL VIZ — N/A. No aurora/blob/fourier. (Demo header's IconChip `bloom`/`reveal` is the only motion on the page; not this component.)

### 3 · PERFORMANCE — clean. Compositor-only by construction (no layout-animated property; `transition-control` is surface-only). No rAF, no offscreen concern, no layout thrash. `wrap-anywhere` prevents overflow-driven reflow. Nothing to fix.

### 4 · SAFARI — clean. `color-mix`, `inline-flex`, `rounded-badge`(→`--radius-pill`), arbitrary `text-[length:var(...)]` all Safari-safe. `wrap-anywhere` is Baseline. The `dark:bg-[hsl(0_70%_45%)]` destructive AA-fix is a plain hsl plate — safe. No `backdrop-filter` (opaque), so the glass-cannot-sample-glass constraint is moot.

### 5 · IDIOMATIC / no-legacy — mostly clean, two transposition seams:
- **DEMO (not component) — the section-tone axis is an inline `:style` fill + `text-white` paste**, repeated 3 ways (sectionToneBadges `:style` fill, vizBadges `bg-viz-* text-white` cls, leading-dot raw `bg-viz-*` spans). DESIGN.md §846 EXPLICITLY defers a `tone` axis ("1 src consumer count… introduce a `tone` axis when a 2nd consumer surfaces"). The BD-wide colorful-aurora + per-section-card mandate is plausibly that 2nd consumer — see AUGMENT below.
- **DEMO drift:** the page is a flat `StorySection` list over the default page bg, NOT each sub-section in its own glassy card over a COLORFUL aurora (the user's binding ask). `text-white` hardcoded on tinted pills is an off-token literal (W-PAGE-OFFTOKEN-SWEEP class) — should read `--*-foreground`/a contrast-color flip.
- Component itself: no dual-path, no dead code, idiomatic CVA. The `transition-colors`→`transition-control` and shadcn icon-sizing idioms are current.

### 6 · GLASS SIX-LAYER — absent, CORRECTLY (allowlist-ratified opaque loud-pill). No action; a glass Badge would lose the status-legibility floor.

## Disposition map (against existing BD waves)

- **AUGMENT — BD.W-DATA-SUFFUSE** (or a sibling display-suffuse wave): lift the section-tone recipe OFF the inline `:style`/`text-white` pastes into a real `tone` axis on `badgeVariants` (the DESIGN.md §846 deferred axis — the BD per-section-card + colorful-aurora demos ARE the 2nd-consumer trigger). Drop hardcoded `text-white` for a `--*-foreground`/contrast-color flip. One CVA axis, no per-demo paste.
- **AUGMENT — (new BD wave, e.g. W-BADGE-ENTRANCE, OR fold into the suffuse/jubilance motion register):** give Badge a `:reveal` entrance + a status-FLIP morph mirroring `IconChip`'s `icon-chip-reveal` (spring-clock scale+opacity, PRM-carved, compositor-only). Closes the dead-animation / liquid-weight gap for status pills WITHOUT making the pill interactive.
- **MODIFY — BD.W-PAGE-HEADER-FOLD:** the badge page's inline `<header borderLeft>`+IconChip paste is one of the 36 enrolled folds — confirm it folds onto `StorySectionHeader`. (Already in scope; no new wave.)
- **MODIFY — (page-redesign wave for the storybook display band):** wrap each `StorySection` in its own glassy card, enlarge the main card area, host the demos over a colorful aurora, standardize the import-path label to `@mkbabb/glass-ui/badge`, tighten the superfluous "(v0.8.6)"/baseline-prose sections. Demo-only, zero src paint.
- **PRUNE — none.** No dead code in the component.

## Verdict (5 lines)

1. Badge is a correctly-opaque allowlist loud-pill (NOT a glass six-layer surface — leave it opaque); component code is idiomatic, performant, Safari-clean, zero dead code.
2. Biggest real gap: LOW animation affordance — no entrance/exit/status-flip morph despite the BD liquid-weight mandate and the IconChip `:reveal` precedent sitting right beside it; AUGMENT with a `:reveal`+flip register.
3. The section-tone/viz fills live as inline `:style`+`text-white` demo pastes; DESIGN.md §846's deferred `tone` CVA axis is now warranted (BD is the 2nd consumer) — AUGMENT onto `badgeVariants`, drop the off-token `text-white`.
4. Demo page needs the BD page-redesign: per-section glassy cards, bigger main area, colorful aurora backdrop, standardized import label, tightened prose — MODIFY (demo-only), and the header folds via W-PAGE-HEADER-FOLD.
5. No procedural viz; performance and Safari are non-issues — the work is the `tone` axis + the entrance/flip motion + the demo-page glass/aurora restage.
