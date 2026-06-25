# design-language-edicts — orchestrator corrections + APPLIED status

The greenfield ran brainstorm-3 → GOLDEN → challenge-3 → delta. The challenge fleet landed
2/3 substantive refutations (goldenSurvivesClean=false). The orchestrator (core model = the
synthesizer) hardened the golden by **source-verifying every contested fact** and applied the
corrected amendment to `design.md` directly (tranche-design = authoring the precept source).

## The 5 challenger-found defects — verified TRUE, corrected before applying

| # | Golden defect | Source-verified truth | Correction applied to design.md |
|---|---|---|---|
| 1 | §2f cites `<CartoonCard>` / `.glass-cartoon` as "the canonical carrier" | RETIRED: cards.css:4 "former `.glass-cartoon` recipe"; Card.vue:50 "the RETIRED `<CartoonCard>`" | §Shadows register cites the LIVE carriers: `.shadow-cartoon-{sm,md,lg}` utilities + `<Card surface="cartoon">` / `.cartoon-surface` (reads `--shadow-cartoon`) |
| 2 | §L7 "WebKit defaults to linearRGB and blows the edge" | INVERTED: WatercolorDot.vue:150 — "Safari renders SVG filters in sRGB REGARDLESS of `color-interpolation-filters`"; Chrome/FF honor linearRGB | §L7 corrected: declare `sRGB` to force Chrome to MATCH WebKit's forced-sRGB threshold |
| 3 | "cartoon shadow tokens already warm `color-mix(--shadow-color)`, doc-only fix" | MIXED: `--shadow-color: var(--foreground)` (color-radius.css:104) — neutral, re-tints per mode, NOT warm; `--shadow-cartoon: color-mix(--foreground 8%)` (shadow.css:9) | §Shadows: honest that the cast rides `--shadow-color`(=`--foreground`), re-tinting per mode (black-ish light / white-ish dark); a WARM/technicolor tint is deferred to the `cartoon-shadow` greenfield as a real token decision |
| 4 | `--ease-cartoon-punch` as a `MOTION_CURVES` entry "no engine change" | `MotionCurveKind = "spring" \| "bezier"` is closed (curves.ts:35) — a shaped `linear()` is neither; a typed entry needs a 3rd kind + sampler | §L2 + §Easing: ships as a **raw CSS `--ease-cartoon-punch` easing token**, explicitly NOT a `SPRING_PRESETS` row and NOT a typed `MOTION_CURVES` entry → zero engine change, KISS |
| 5 | "NEVER `backdrop-filter:url`" (too absolute) | A live `@supports`-gated Chromium-only refraction lens with a WebKit fallback ships (glass-refract.css:106) | §L7: forbidden for the GOO / steady-state; a `@supports`-gated Chromium-only enhancement WITH a plain-blur WebKit fallback (the `glass-refract` lens) is the sanctioned exception |

Also fixed a phantom I briefly introduced: the §L4 secondary-action row cited `--*-flood-t`
(0 files in src/) → replaced with the real `useStagger`/`useStaggerReveal` chains + the
`--tab-indicator-*` glide.

## What was applied to design.md (the precept source)
- Philosophy: 5th pillar (Aristotelian proportion + iOS-27 canon); "Four"→"Five principles".
- §L preamble: the IOS27-REFERENCE T1–T17 reference-bar clause; "Five"→"Seven precepts".
- §L2: the `--ease-cartoon-punch` home (raw easing token, not a spring/typed-curve).
- §Easing: the `--ease-cartoon-punch` `linear()` (anticipation dip → ~1.22 overshoot → settle).
- §L4: RE-TIERED to Universal / Scene-orchestrated (the "weak tier — we don't ship these"
  disclaimer DELETED; every Disney principle names live substrate; `--motion-weight` driver-scoped).
- §Shadows: "Cartoon shadows" elevated to the register (live `color-mix` form + the moving cast).
- §L6 — Aristotelian Proportion (new precept) + the √φ radius-ladder derivation + concentric rule.
- §L7 — The Cross-Engine Floor (new precept; corrected WebKit-sRGB + the gated backdrop-filter exception).
- §L5 Cross-references + the "name your precept vocabulary" sentence: §L6 + §L7 added.

Gate: GREEN on the amendment's own contributions (the 3 residual grep hits are a self-referential
prose mention of "rgba(0,0,0)", and 2 pre-existing honest citations — see below).

## CARRY-FORWARD finding (→ the `cartoon-shadow` greenfield, Band 0)
design.md still documents `<CartoonCard>` / `.glass-cartoon` as LIVE (lines ~499, 501, 1069,
1077, 1121) but src/ RETIRED them (the live path is `<Card surface="cartoon">` → `.cartoon-surface`
+ `.shadow-cartoon-*`). This pre-existing doc staleness is a real delta for the `cartoon-shadow`
greenfield to reconcile (a doc-hygiene wave), NOT introduced by this amendment.
