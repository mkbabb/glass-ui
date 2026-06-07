# AW.W13 - At-rest affordance pass (token + CSS)

## State

**Name**: W13 - At-rest affordance pass (token + CSS)
**Opens after**: AW tranche open (independent of W12; disjoint file bounds)
**Agents**: 1 serial
**Hard gate** (`proof:affordance-contrast`): the `gold-audacious` rest-text passes WCAG-AA against its 8%-tint substrate in light mode (computed contrast probe); the input/select resting border resolves above an 8%α floor (computed-alpha probe); the standard slider paints a perceptible filled range left of the thumb (computed-style differential probe vs the unfilled track); the goo-blob story renders with ZERO per-frame `value.js`-throw (console-clean probe — `defaultBlobColorResolver` no longer feeds an unresolved `var(--primary)` token to value.js).
**Status**: planned

## 2a. Goal criterion

This wave succeeds if the three too-timid cream affordances read at rest WITHOUT going loud AND the goo-blob story stops throwing every frame: the gold-audacious CTA stops rendering near-invisible cream-on-cream text, the input/select field edge is legible against cream, the standard slider track fills to the thumb for state feedback, and the goo-blob's `defaultBlobColorResolver` stops feeding an unresolved `var(--primary)` token into value.js (the confirmed live per-frame runtime throw). The three cream affordances are token/CSS only and extend an existing mechanism (the spectrum slider's proven track-fill, the existing border token, the existing audacious foreground contract) — no new variant, no new primitive, no forked slider. The goo-blob fix resolves the token to a concrete color before value.js sees it (or fixes the consuming story to pass concrete colors), not a new resolver API.

## 3. Scope

1. `src/components/ui/button/index.ts:17` — the `gold-audacious` variant sets `text-white` over the `btn-audacious-gold` rest substrate (an 8%-gold-tint over glass, `utilities.css:861`), which in light mode is near-cream: white-on-cream is sub-legible. Replace `text-white` with a foreground/contrast token that survives the 8% rest tint (the warm-ink `--foreground` register or a dedicated audacious-foreground token), reserving any light text for the saturated hover/active state where the substrate darkens. Audit `primary-audacious` in the same pass — it is `bg-primary` (dark-primary-safe) but the specular backplate lightens it; confirm its `text-primary-foreground` still clears AA over the lightened backplate, and if not, apply the same fix.
2. `src/styles/glass.css:283-300` — the `.input-pill` resting border is `1.5px solid var(--glass-border-wash)` (~8%α), the field edge nearly vanishing on cream. Lift the resting border to a token that clears a legibility floor (a less-faint glass-border rung, or `--border-soft`/a tuned `--surface-tint-*` rung) so the field reads as an enclosed control at rest. Apply the same lift to the Select trigger, which mirrors the input pill. The error/invalid ring (`:user-invalid`) already proves a present border paints; this raises only the resting alpha.
3. `src/components/ui/slider/Slider.vue:183-186` — the standard variant's `.slider-range` paints `var(--surface-tint-25)` over a `--muted-medium` track; a 25% tint over the muted track is sub-visible on cream (the audit's "no fill" finding). Lift the standard range fill to a perceptible token (`--primary` or a darker `--surface-tint-*`/`--muted-foreground` rung) so the filled portion left of the thumb reads as progress. The spectrum variant already proves the track-fill mechanism (its gradient IS the fill); extend the standard range's fill token, do NOT fork a new slider or new track element.
4. The goo-blob `var()` throw — `defaultBlobColorResolver` resolves its color via `cssToOklch(var(--primary))`, passing the raw `var(--primary)` token string straight to value.js, which cannot parse a CSS custom-property reference and THROWS once per frame (a confirmed live runtime bug; D-8/charter `:114`). Resolve the token to a concrete color BEFORE value.js sees it — read it off `getComputedStyle(el).getPropertyValue('--primary')` (or the equivalent computed-style resolution the renderer already has element access to) so `cssToOklch` receives an `oklch()/hsl()` literal, not a `var()` wrapper. If the cleaner fix is at the call site, fix the consuming goo-blob story to pass a concrete color rather than a token; either way the per-frame throw stops. Do NOT mint a new resolver API — bind the existing `defaultBlobColorResolver` seam (or the story's color prop).
5. Add a light-mode contrast assertion to the button story (`demo/stories/.../button.vue` if present, else the canonical button story path) covering `gold-audacious` and `primary-audacious` rest text — the canary that re-asserts the fix and catches a future regression.

## 3a. Triumvirate Dispatch

Trigger a triumvirate when:

- the gold-audacious foreground fix requires a NEW token in `tokens.css` rather than reusing `--foreground`/an existing rung — file bounds expand into the token source and the "extend the spectrum mechanism, no new primitive" precept is implicated;
- lifting the input border alpha regresses the focus-ring or invalid-ring specificity order (the `:focus-visible` and `:user-invalid` rungs at `glass.css:312-338` must still win) — a non-local-recoverable cascade failure;
- a third iteration on the slider range token fails to produce a perceptible fill differential against the track (the muted-track contrast is the obstacle, not the range token) — escalate to re-derive the track background, not just the range;
- the goo-blob throw cannot be killed by computed-style resolution at the existing `defaultBlobColorResolver` seam or by fixing the story (the throw originates inside value.js's `cssToOklch` for a non-`var()` input too, i.e. the bug is broader than the token wrapper) — the fix expands beyond the resolver/story and the renderer's color path itself is implicated; escalate rather than patch deeper into `goo-blob/`.

## 4. File Bounds

| File | Access |
|---|---|
| `src/components/ui/button/index.ts` | modify-carve (the `gold-audacious` + `primary-audacious` variant strings only) |
| `src/styles/glass.css` | modify-carve (the `.input-pill` resting border + the Select-trigger mirror only) |
| `src/components/ui/slider/Slider.vue` | modify-carve (the standard `.slider-range` fill token only) |
| `src/components/custom/goo-blob/` | modify-carve (the `defaultBlobColorResolver` token-resolution path only — kill the `var()`→value.js throw) |
| `demo/stories/primitives/button.vue` | modify |
| `demo/stories/.../goo-blob story` | modify (only if the cleaner fix is to pass a concrete color at the call site) |

Do NOT touch: `src/styles/tokens.css` (no new token; reuse existing rungs — if a new token is unavoidable, that is a triumvirate trigger, §3a), `src/styles/utilities.css` (the `btn-audacious-gold` substrate recipe stays; only the Button variant's text token changes), the spectrum slider rules (`Slider.vue:241+`), `src/composables/color/` (the `cssToOklch` leaf stays — W13 fixes the INPUT it receives, not value.js's parser), the goo-blob shader/metaball internals (the throw is in the JS resolver, not the GLSL).

## 4a. Disjointness

Single agent unit; no intra-wave path contention. W13 owns `button/index.ts` + `glass.css` + `Slider.vue` + the goo-blob resolver path + the button story (+ optionally the goo-blob story). It shares NO `modify` path with W12 (W12 owns `GlassPanel.vue` + `tokens.css §8` + the glass-panel/card stories), W14 (data-table only), or W15. The button story here is `primitives/button.vue`; W12's stories are `substrates/glass-panel.vue` + `primitives/card.vue` — disjoint. The goo-blob resolver is owned by NO blob wave (W9-W11 touch the metaball shader + color terminus, not `defaultBlobColorResolver`'s token-resolution path); W13 owns this fix per charter `:114` + D-8.

## 5. Agent Units

### AW.W13.a At-rest affordance tokens + goo-blob throw fix

- Goal: the gold-audacious text, the input/select border, and the standard slider track-fill all read at rest in light mode without going loud, and the goo-blob story stops throwing every frame.
- Mechanism: swap `text-white`→a foreground/contrast token on `gold-audacious` (+ audit `primary-audacious`); lift the `.input-pill` + Select-trigger resting border token above the 8%α floor; lift the standard `.slider-range` fill token to a perceptible rung extending the spectrum track-fill mechanism; resolve `defaultBlobColorResolver`'s `var(--primary)` to a concrete color via computed-style (or fix the story to pass concrete colors) so value.js's `cssToOklch` no longer throws per frame; add the button-story contrast canary.
- Files: `src/components/ui/button/index.ts`, `src/styles/glass.css`, `src/components/ui/slider/Slider.vue`, `src/components/custom/goo-blob/` (the resolver path), `demo/stories/primitives/button.vue` (+ the goo-blob story only if fixed at the call site).
- Sub-gate: a computed-contrast probe over the rendered `gold-audacious` button asserts AA (≥4.5:1 for the rest text against the rest substrate) in light mode; a computed-alpha probe asserts the resting input border alpha exceeds the 8% floor; a computed-style probe asserts the standard slider's `.slider-range` background differs perceptibly from the `.slider-track` background; a console-clean probe over the mounted goo-blob story records ZERO `value.js` throw across ≥5 frames; `vue-tsc --noEmit` green.

## 6. Hard Gate

1. **Gold-audacious rest legibility.** A Playwright/Vitest computed-contrast probe over the mounted `gold-audacious` button in forced light mode asserts the rest-text vs rest-substrate ratio ≥ 4.5:1 (AA). Pre-fix the same probe fails (white-on-cream ≈ 1.x:1); the diff is the proof. `primary-audacious` clears the same probe over its lightened backplate.
2. **Input/select border floor.** A computed-style probe over the resting `.input-pill` and the resting Select trigger asserts the border-color alpha exceeds the pre-fix 8% floor by a stated margin (the chosen token's resolved alpha). The `:focus-visible` ring and `:user-invalid` ring still resolve their original colors (specificity-order probe).
3. **Standard slider track-fill.** A computed-style probe over a standard slider at 50% asserts `.slider-range` background ≠ `.slider-track` background by a perceptible delta (not the pre-fix near-identical 25%-tint-over-muted). The spectrum variant's range stays transparent (unchanged).
4. **Goo-blob console-clean.** A Playwright/Vitest probe mounts the goo-blob story, runs the renderer for ≥5 frames, and asserts ZERO `value.js`/`cssToOklch` throw on the console (pre-fix the same probe captures a per-frame throw; the diff is the proof). `grep` confirms `defaultBlobColorResolver` no longer passes a bare `var(--…)` string to `cssToOklch` (it resolves via computed style first), OR the story passes a concrete color literal.
5. **No new token, no new primitive, no new resolver API.** `git diff src/styles/tokens.css` is empty; `git diff` shows no new CVA variant key in `button/index.ts`, no new track/range element in `Slider.vue`, and no new exported resolver symbol from `goo-blob/` — only token swaps on existing rules + the in-place resolver token-resolution fix.
6. **Build + types green.** `npm run build` and `npm run typecheck` pass.

## 7. Format And Lint Cadence

- `npm run typecheck` after the `button/index.ts` variant-string edit and again before close.
- `npm run build` before close (confirms the `/styles` SFC-CSS fold still emits).
- `git diff --check` for whitespace; assert `git diff src/styles/tokens.css` empty (gate 4).
- No formatter is skipped.

## 8. Verification Artefacts

- `docs/tranches/AW/audit/W13-affordance-contrast.md` — the gold-audacious + primary-audacious contrast-ratio table (pre/post), the input-border resolved-alpha pair, the slider range/track background pair, and the goo-blob console-throw count (pre: per-frame; post: 0 over ≥5 frames).
- Playwright screenshots: the gold-audacious + primary-audacious buttons in light mode, the input/select at rest, the standard slider at 50%, the goo-blob story running clean, at 1440×900, under `docs/tranches/AW/audit/screens/`.
- The integration commit hash.

## 9. Commit Plan

- `fix(button): gold-audacious rest text reads in light mode; audit primary-audacious` — the variant text-token swap; body cites the white-on-cream defect and the AA gate.
- `fix(input): lift resting input/select border above the 8%α floor` — the `glass.css` border carve.
- `fix(slider): standard track fills to the thumb (extend the spectrum mechanism)` — the `.slider-range` fill-token lift.
- `fix(goo-blob): resolve --primary before value.js (kill the per-frame cssToOklch throw)` — the `defaultBlobColorResolver` token-resolution fix; body cites the `var()`→value.js throw and the console-clean gate.
- `chore(demo): button-story light-mode contrast canary` — the story assertion.
- `docs(AW): W13 close — contrast + alpha + range + console-clean probes` — the artefact + status commit.

## 10. Dependencies

- **Depends on**: AW tranche open. No dependency on W12 (disjoint files); may run in parallel with W12 and W14 once main is clean.
- **Blocks**: nothing in AW. The input-invalid ring widening (a separate convergence item per the digest §2) is NOT this wave; this wave touches only the resting border alpha.

## 11. Archaeology

The `gold-audacious` `text-white` predates the `btn-audacious-gold` 8%-tint rest substrate (utilities.css:861) — the text token was set for a saturated substrate that the rest state no longer provides. The standard slider's `--surface-tint-25` range was tuned against a darker mock backdrop; on the shipped flat cream it falls below the perception floor. Both are "tuned-for-a-different-substrate" regressions; the guardrail is the computed-contrast + range-differential probes (gates 1, 3) wired as story canaries. The goo-blob `var()` throw is a different class — a confirmed LIVE runtime bug, not a regression: `defaultBlobColorResolver`'s `cssToOklch(var(--primary))` has always handed value.js a token wrapper it cannot parse, throwing every frame the resolver runs; it survived because the throw is caught/swallowed visually but floods the console. The guardrail is the console-clean probe (gate 4) over ≥5 frames.
