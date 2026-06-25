# Pass-E deep audit — forms/selectable-chip (COMPONENT lens)

**Page:** `demo/stories/forms/selectable-chip.vue` (manifest `forms/selectable-chip` → `@mkbabb/glass-ui/selectable-chip`, manifest:242/740). Import label ALREADY standardized to the `@mkbabb/glass-ui/<subpath>` form (manifest:242) — no path-label finding here.

**The COMPONENT under test** — read in full at HEAD on `master`:
- `src/components/custom/selectable-chip/SelectableChip.vue` — the reka-`Toggle` chip SFC (68 lines).
- `src/components/custom/selectable-chip/selectableChipVariants.ts` — the CVA recipe (the `.accent-tone` hook + idle/active paint + size axis + the motion `[transition:…]` literal).
- `src/composables/color/useAccentTone.ts` — the contrast-safe-ink JS half (value.js `safeAccentColor`).
- `src/styles/glass/accent-tone.css` — the 4-channel `.accent-tone` register (`--accent-fill/-band/-edge/-ink`, `in oklab`).
- `scripts/proof-accent-tone.mjs` — the gate (A1–A6: register/ink/N-paste-collapse/idle-floor/regression-guard/colocation).

This is a **tonal-FILL control register**, NOT a procedural-viz and NOT (currently) a glass surface. The audit is sharp on that gap.

---

## (1) ANIMATION affordance

**Partial. The chip has the SURFACE four-state + a scale lift, but the register is materially thinner than every sibling interactive control and carries two real motion defects.**

- **What IS present (idiomatic):** the §6 split is honoured in the `[transition:…]` literal (variants.ts:39) — the `scale` TRANSFORM leg rides `--spring-smooth` + `--spring-smooth-duration` (motion-canon P1 spatial→spring, P4 per-spring clock), the SURFACE legs (bg/border/color) ride `--duration-fast`/`--ease-standard` (P1 effects→bezier). Four states wired: rest (`scale-100` + `--accent-fill`), hover (`hover:scale-(--scale-hover-btn)` 1.05 + lift), active/press (`active:scale-(--scale-press-btn)`), selected (`data-[state=on]` → `--accent-band` + `--accent-edge` rim + `--accent-ink` + `font-medium`). `focus-ring` present.

- **C1 — SELECTED-STATE SCALE PIN (real defect).** variants.ts:38 declares BOTH `active:scale-(--scale-press-btn)` AND `data-[state=on]:scale-(--scale-press-btn)`. A SELECTED chip is therefore pinned PERMANENTLY at the press-shrink scale (≈0.96) at REST — it sits visibly smaller than its unselected siblings, and a hover on a selected chip cannot lift (the `data-[state=on]` shrink and `hover:` lift are equal-specificity, source-order races). The intent was "press feedback on toggle"; the effect is "every active chip is frozen shrunk." A selected chip should rest at `scale-100` (or a subtle SELECTED lift), pressing only on `:active`. **PRUNE the `data-[state=on]:scale-(--scale-press-btn)` term.**

- **C2 — NO ENTRANCE / EXIT choreography (missing affordance, the marquee gap).** The chip has zero mount entrance — no `vReveal`, no `.glass-reveal`, no staggered build. A filter/tag strip is the canonical place for the iOS-27 liquid build-in (eyebrow→chips cascade). motion-canon P2 (enter-bouncy) / P3 (fade-coupled) are entirely absent. Every sibling glassy control attaches a spring-clocked enter; the chip is flat-pop. **AUGMENT — wire a `vReveal`/cascade entrance.**

- **C3 — the selection TRANSITION is a bezier color cross-fade, not a tonal MORPH.** Selecting a chip cross-fades `--accent-fill`→`--accent-band` on `--duration-fast`/`--ease-standard`. That is correct per P1 (a color channel rides bezier), but the marquee iOS-27 selection is a tonal *bloom* — the rim/ink/band arriving with a coupled scale beat. The scale leg exists but is hijacked by C1, so the selection reads as a flat color swap, not a lit bloom. Fixing C1 + adding a momentary selection over-scale (a sub-perceptual `--scale-hover-btn` beat on `data-[state=on]` ARRIVAL, releasing to `scale-100`) gives the bloom. **AUGMENT alongside C1.**

- **No janky/dead animation** beyond C1's static shrink-pin; the wired transitions are compositor-safe (see §3).

## (2) PROCEDURAL VIZ

**N/A — no procedural viz.** SelectableChip is a CSS-tinted reka-`Toggle`, GL-free by design. The page correctly stages no GL context (a filter-chip strip is not a viz route; the one-GL-per-route budget is moot). The user's "glass demos over COLORFUL aurora backgrounds" ask is a PAGE/background concern (W-PAGE-BACKGROUND systemic), not a component concern — but it DOES bear on C5 below (the chip should be a glass surface so it has something to read THROUGH the aurora).

## (3) PERFORMANCE

**Compositor-clean, no layout thrash.** The `[transition:…]` animates only `scale` (transform), `background-color`, `border-color`, `color` — zero layout property (`proof:no-layout-animation` GREEN by construction). `useAccentTone` is a pure `computed` (no rAF, no DOM read, no observer) — the ink solve runs ONCE per tone change, DOM-free + SSR-safe (DEFAULT_SURFACE seed). No offscreen-pause needed (no animation loop). The `color-mix(in oklab, …)` channels resolve at paint-time, cheap. **No performance finding.**

## (4) SAFARI compatibility

**Safe.** `color-mix(in oklab, …)` is Baseline-2023 (Safari 16.4+); `data-[state=…]` attr selectors, CSS custom-prop transitions, and reka's `Toggle` are all Safari-clean. value.js `safeAccentColor` is pure JS (no platform API). The chip declares NO `backdrop-filter` (it is not a glass surface — see C5), so the `-webkit-backdrop-filter` prefix concern does not arise. **No Safari finding** — but note C5 means that when the chip BECOMES a glass surface it inherits the ladder's webkit-prefix discipline (already shipped in `dist/` via `vite.style-assets.ts`).

## (5) IDIOMATIC / no-legacy

**Largely exemplary — ONE structural gap.**
- **Exemplary:** the register-not-hand-roll discipline is textbook (the N-paste ToggleChip cluster collapses onto `.accent-tone`; `proof:accent-tone` A2/A3 lock it). value.js owns 100% of the contrast/lightness math (A2, `proof:single-color-core`). Strength magnitudes are TOKENS not props (the no-over-prop fence). `in oklab` not `in srgb` (the W55/W-NO-GRAY perceptual family, AW.W26 fence honoured). value.js-bearing → `/selectable-chip` only, off the root barrel (the SCC-trap precedent). The `var(--…)` tone passthrough is the correct graceful degrade (CSS fallback ink). Clean colocation dir (A6).
- **C4 — `text-muted-foreground` idle ink is page-calibrated, not surface-calibrated.** The idle label reads `text-muted-foreground` (calibrated AA-vs-PAGE, BA.W-NO-GRAY). Over the faint `--accent-fill` tint the contrast is fine, but this is the SAME page-vs-surface mismatch class W-ON-GLASS-FG closes for glass plates — if the chip becomes a translucent glass surface (C5), the idle ink must re-point onto `--on-glass-muted`. MINOR, contingent on C5.

## (6) The glass six-layer composite

**ABSENT — this is the headline component finding (C5).** SelectableChip paints a FLAT `bg-(--accent-fill)` tonal plate. It composes NONE of the six DESIGN.md layers: no backdrop blur+saturate, no `.glass-material` surface, no edge rim BEYOND the flat `--accent-edge` border, no inner specular catch-light (`::before`), no drop shadow, no grain. It is a solid tinted toggle, not liquid glass.

This is a deliberate-but-now-stale choice: BC.W-ACCENT-TONE's README §"DISTINCT seams" explicitly says `--accent-tone` (control tonal-FILL) and `--glass-accent` (glass-RIM) **COMPOSE on a chip that is both a glass surface and a tonal control** — yet the shipped chip is NOT a glass surface, so the composition the README promises is never realized. Under the BD "every component is iOS-27 liquid glass" north star, a selectable chip over a colorful aurora SHOULD be a translucent glass plate (a glass tier) whose RIM reads the tonal `--glass-accent` and whose FILL reads `--accent-tone` — the exact two-axis composition the README describes. **AUGMENT — give the chip a glass tier base + the `--glass-accent` rim seam, so the tonal fill rides ON a six-layer glass surface, not a flat plate.** This makes the "glass demos over colorful aurora" ask LOAD-BEARING (the chip transmits the aurora) and realizes the README's own promised composition.

---

## Findings → BD tranche mapping

| # | Finding | Disposition | Wave |
|---|---------|-------------|------|
| **C5** | NO six-layer glass composite — chip is a FLAT tonal plate; the README's `--accent-tone`×`--glass-accent` glass-composition promise is unrealized | **AUGMENT** | `BD.W-FORMS-CARD-FOLD` is Band-4 PAGE-only (zero src paint) — does NOT fit. **NEW Band-7/component wave** `BD.W-CHIP-GLASS-COMPOSE`: give SelectableChip a glass-tier base + `--glass-accent` rim seam (the README's own two-axis composition), so the tonal fill rides ON glass; re-point idle ink onto `--on-glass-muted` (closes C4). Extend `proof:accent-tone` with a glass-composite + on-glass-ink clause (the gate has NO §6/glass coverage today). |
| **C1** | selected chips PINNED at press-shrink scale (`data-[state=on]:scale-(--scale-press-btn)`) — frozen smaller, hover-lift dead | **PRUNE** | Same `BD.W-CHIP-GLASS-COMPOSE` (it touches `selectableChipVariants.ts` already) — drop the `data-[state=on]:scale` term; rest selected at `scale-100`. Add a `proof:accent-tone` motion clause (the gate has ZERO motion/four-state/PRM coverage). |
| **C2** | NO mount entrance/exit (no `vReveal`/`.glass-reveal`/cascade) — motion-canon P2/P3 absent | **AUGMENT** | `BD.W-LIQUID-ENTRANCE-GENERAL` (the NEW Pass-E wave: iOS-27 squish/morph/fade generalized to EVERY surface entrance, Safari-`filter`-safe). The chip strip is a canonical consumer — bind the staggered cascade. |
| **C3** | selection reads as flat color swap, not a lit tonal bloom (scale beat hijacked by C1) | **AUGMENT** | `BD.W-CHIP-GLASS-COMPOSE` — add a sub-perceptual selection over-scale ARRIVAL beat on `data-[state=on]` (coupled to the band/rim/ink per P3), releasing to `scale-100`. Pairs with the C5 specular catch-light. |
| **C4** | idle `text-muted-foreground` is page-calibrated; mismatches a translucent-glass chip | **MODIFY** | Folded into `BD.W-CHIP-GLASS-COMPOSE` (contingent on C5 — re-point to `--on-glass-muted` once the chip is glass; W-ON-GLASS-FG precedent). |
| — | the `[transition:…]` §6 split, value.js-math fence, register discipline, colocation | **KEEP** | exemplary — no action; do NOT regress in C5's edit (the `--accent-*` channels + the value.js ink fence are inviolate). |

**Gate gap to close:** `proof:accent-tone` covers A1–A6 (register/ink/N-paste/idle-floor/regression/colocation) but has **ZERO clauses for motion, the four-state contract, PRM-carve, entrance, or the glass composite**. C1/C2/C5 are all invisible to the current gate. `BD.W-CHIP-GLASS-COMPOSE` should add A7 (motion/four-state/PRM) + A8 (glass-composite/on-glass-ink), born-RED → GREEN.

**src/ paint owed:** YES — C1/C3/C5/C4 all touch the COMPONENT (`SelectableChip.vue` + `selectableChipVariants.ts` + `accent-tone.css` + the gate). This is the rare Pass-E page where the component itself, not the demo page, carries the substantive findings. The page-level asks (bigger main card, per-subsection glassy cards, dock-API contextual switching, import-label) are demo-page concerns handled by the `demo`/`design` lenses + `W-STORY-PAGE-STANDARD`.
