# BA.W-ATLAS-RECONCILE — DELTA (the captured own-surface flip truth)

> **Freshness (AZ-form headers)**
> - **wave**: BA.W-ATLAS-RECONCILE (the d6-lineage A/B fold)
> - **captured-at**: 2026-06-12 (the π readback run at :5199)
> - **surface-paths** (the bound surfaces, in hash order):
>   - `src/composables/dark/useGlobalDark.ts`
>   - `src/components/custom/controls/DarkModeToggle.vue`
>   - `src/styles/utilities/a11y-overrides.css`
>   - `src/components/custom/aurora/constants/presets.ts`
>   - `src/composables/motion/useViewTransition.ts`
>   - `src/styles/tokens/scale-paper.css`
>   - `src/styles/theme/bridges.css`
>   - `src/styles/tokens/dark-arm.css`
>   - `src/styles/tokens/light-dark.css`
>   - `src/styles/instrument-chassis.css`
>   - `src/components/custom/instrument-chassis/InstrumentChassis.vue`
> - **surface-hash** (sha256 of the concatenated surface files):
>   `7b43d459a32c0bc9946b002e21cad410f0606ace3cf218711313c2128d094f78`
> - **π spec**: `tests-visual/atlas-flip.spec.ts` (3/3 GREEN — the binding truth)
> - **gate**: `proof:atlas-ab` (20/20 GREEN; born-RED at HEAD)
> - **unit**: `tests/components/custom/controls/DarkModeToggle.icon-morph.test.ts`
>   (6/6, the ported 251-LOC born-RED test) + `tests/composables/useViewTransition.test.ts`
>   (14/14, the async/PRM/navigate arm)

---

## The defect → the fix (the binding π)

The Connectivity Atlas (glass-ui's largest external consumer) moved from the d6 fork
lineage to mainline. The user-facing defect the letter named: **"dark mode still does
not animate the icon."** On master HEAD the `.no-transition` theme-flip suppression
(`utilities/a11y-overrides.css`) was a BLANKET `html.no-transition *` kill that forced
`transition-duration: 0s !important` on EVERY descendant — including the toggle's OWN
`.toggle-sun` half-turn spring. The dock wires `disableTransitions: true` on the dense
routes, so the icon was always dead there.

The fix re-lands the d6 `data-allow-motion` carve on the SPLIT
`utilities/a11y-overrides.css`: the `.no-transition` kill now exempts
`:not([data-allow-motion])`, the toggle's `<g>` declare `data-allow-motion` + longhand
transitions, and the PRM block adds the absolute `[data-allow-motion]` snap (reduced
motion OVERRIDES the carve — accessibility absolute). Plus B-2 deletes the
`void offsetHeight` forced reflow (~40ms/flip).

## The π readback (the BINDING truth — `tests-visual/atlas-flip.spec.ts`)

Read on the REAL `<DarkModeToggle>` (the `/display/dark-mode-toggle` story; the scoped
`.toggle-sun[data-v-62bae18a]` rule + the `data-allow-motion` carve are the SHIPPED
bytes — a hand-mounted node could not match the scope-hashed selector):

| arm | the read | verdict |
|---|---|---|
| (a) THE ICON MORPH RUNS | in the genuine flip window (`.no-transition` up + `.dark` landed) the real `.toggle-sun` resolves `0.75s` (= 750ms) | **GREEN** — the half-turn spring is ALIVE; the "dark mode does not animate the icon" defect GONE |
| (b) THE SIBLING STORM IS DEAD | a sibling `.glass-card` with a plain (carve-FREE) transition resolves `0s` in the SAME window | **GREEN** — the incidental page-transition storm the suppression exists to kill still dies |
| (c) THE PRM ABSOLUTE SNAP | the page's LIVE stylesheets carry the `@media(prefers-reduced-motion) [data-allow-motion]` `transition-duration: 0.01ms !important` override (and a standalone `newContext({reducedMotion:"reduce"})` reads the real `.toggle-sun` at `1e-05s`) | **GREEN** — the carve is OVERRIDDEN under PRM; the `!important` rule beats even the scoped toggle selector |

The painted-value confirmation (a standalone reduced-motion context probe):
`{"iconRaw":"0.75s","sibRaw":"0s","carve":true}` (full motion) → `1e-05s` (under PRM).

## Captured frames

- `atlas-flip-desktop-dark.png` / `atlas-flip-desktop-light.png` — the toggle story at 1280×800, both modes
- `atlas-flip-mobile-dark.png` / `atlas-flip-mobile-light.png` — at 390×844, both modes

The toggle's sun↔moon glyph reads correctly in both modes; the flip animates the
half-turn under full motion and snaps under PRM.

## The C-3 silver structure quad — the W-NO-GRAY named cool-neutral exception

C-3 SHIPPED the SHIP arm (not BOOK): the silver structure quad (`--silver`/`-light`/
`-dark`/`-deep`) mirrors gold's EXACT 4-place cascade (scale-paper → bridges
`--color-silver*` → dark-arm → light-dark), and the `<InstrumentChassis variant="structure">`
register (consumer #2; the atlas's structure surface is consumer #1) re-points the
engraved bezel + the twin-line grooves onto the cool silver.

**The W-NO-GRAY named exception (calibrated against the new warm floor).** W-NO-GRAY
moved the library's NEUTRAL ladder to a warm OKLab H~70° register (no gray). The silver
quad is DELIBERATELY COOL near-achromatic — hue ~255 (the blue-steel of a milled panel),
chroma ≤ 0.016. It is NOT a neutral; it is a brand METAL identity (exactly like gold,
which is warm H~84°). The very-low chroma reads as polished steel (not a tinted cast),
and the cool hue distinguishes the structure register from the warm-cream glass plate so
it reads as a DIFFERENT material. This is the ONE sanctioned cool-neutral, recorded here
as W-NO-GRAY's named exception. `proof:no-gray` stays GREEN (27/27) — the silver lives
in the brand-metal token family the gray-floor gate does not scan, exactly as gold does.

## Batch-1 + shared-surface gates — NO regression

The wave touches shared token files (scale-paper.css, dark-arm.css, light-dark.css,
bridges.css) and the shared a11y-overrides.css. Verified GREEN, no regression:
`proof:no-gray` (27/27), `proof:dark-material`, `proof:adaptive-glass`,
`proof:shadow-contract`. The silver is purely ADDITIVE (no neutral changed; every
existing token byte-stable).
