# Pass-E component deep audit — `display/separator` → `Separator.vue`

**Page:** `demo/stories/display/separator.vue` · **Import label:** `@mkbabb/glass-ui/separator`
**Component(s):** `src/components/ui/separator/Separator.vue` (+ `index.ts`) wrapping reka-ui `Separator`.
**Token:** `--separator-ink: color-mix(in srgb, var(--foreground) 22%, transparent)` (`tokens/color-radius.css:132`).

Separator is a **deliberately-minimal allowlist primitive** — a 1px warm hairline (un-labelled, reka `Separator`) OR a `[rule] [label-chip] [rule]` split-rule flexbox (labelled, BC.W-SEPARATOR-FIX). It is on the **legibility allowlist** shared by `proof:glass-cohesion` (l.86), `proof:no-shadcn-default` (l.273-274), and `BD.W-DESHADCN-CANON` — its `bg-background` label chip is the SANCTIONED opaque survivor, NOT a defect.

## Findings (component, not demo)

**(1) ANIMATION — affordance is correctly ABSENT, with ONE legitimate gap.**
A separator is a non-interactive structural mark (`role="separator"`); it has NO four-state contract (no hover/press/active/disabled — it is not interactive, the affordance-map carries no rule for it) and that is correct per motion-canon (animation is earned by a state change, not blanket-applied — l.234). No dead/janky animation exists because none is wired. The ONE defensible affordance gap: a separator that ENTERS with its host card could carry a compositor-only **draw-on / scale-X reveal** (the motion-canon "draw-on reveal" arrival on `--spring-snappy`, l.32/37) so a rule materializes as part of the W-SCROLL-MOTION `.scroll-cascade` page-build rather than snapping in. This is OPT-IN and PRM-static — not a blanket add. → **AUGMENT (additive, optional).**

**(2) PROCEDURAL VIZ — N/A.** No aurora/blob/fourier; nothing to measure against PROCEDURAL-SUITE.

**(3) PERFORMANCE — clean.** Pure CSS hairline + flexbox; no JS render loop, no rAF, no measure, nothing to offscreen-pause. The labelled arm uses `flex-1` rule segments + `gap` (no absolute positioning, no occluder) — zero layout-thrash, no per-frame reflow. Compositor-trivial. The split-rule design (vs the retired floated-label-over-1px-line) is the architecturally-correct transposition already landed.

**(4) SAFARI — clean.** `color-mix(in srgb …)`, `light-dark()` (via `--foreground`), flexbox, `bg-(--separator-ink)` arbitrary-value utility — all Safari 16.4+/17.5 baseline. No `backdrop-filter`, no `@property`, no scroll-timeline. Auto-darks warm in both modes through `--foreground`'s `light-dark()` resolution (`light-dark.css:95`).

**(5) IDIOMATIC / NO-LEGACY — clean, one nit.** No workaround, no dual-path, no dead code. `--separator-ink` is token-first warm-ink (NOT grey `--border`, BA.W-NO-GRAY floor). reka behavior inviolate. NIT: the labelled-arm wrapper hand-rolls `role="separator"` + `aria-orientation` + `aria-label` on a plain `<div>` instead of composing reka's `Separator` `as-child` — works, axe-clean (covered by BD.W-ARIA-ORIENTATION-GUARD as a sanctioned allowlist emit), but it duplicates reka's role wiring. Low priority; leave byte-untouched per the guard wave unless the labelled arm is reworked. The labelled-arm `aria-label` carries the visible label as accessible name correctly.

**(6) SIX-LAYER GLASS COMPOSITE — correctly N/A.** A hairline rule has no plate, so the six-layer composite does NOT apply — Separator is the allowlist exception BY DESIGN (a glassy 1px rule would be invisible/illegible). The label chip's `bg-background` is the sanctioned opaque survivor, not a missing-glass defect. Do NOT add glass tiers here.

## Verdict (5 lines)
1. Separator is an allowlist hairline primitive — opaque-by-design, NO glass composite, NO four-state contract; that is CORRECT, not a defect (do not "fix" it into glass).
2. The split-rule labelled arm (BC.W-SEPARATOR-FIX) is already the elegant transposition — performant, Safari-clean, no occluder, warm-ink token-first; PRUNE nothing.
3. Sole AUGMENT candidate: an OPT-IN compositor-only draw-on/scale-X entrance reveal on `--spring-snappy` (PRM-static) so rules build in with the host card — fold under **BD.W-SCROLL-MOTION** (cascade entrance), additive default-off.
4. Demo-page asks (bigger main card, per-section glassy cards, dock contextual-switching, glass-over-colorful-aurora, import-label standardize, tighten copy) are DEMO-LAYER work → **MODIFY the story** under **BD.W-DEMO-DESIGN / Pass-E page rework**, NOT a component edit.
5. MODIFY `display/separator.vue` import label to `@mkbabb/glass-ui/separator` (currently deep-relative `../../../src/components/ui/separator`) per the standardize-import ask — story-file only, component byte-untouched.
