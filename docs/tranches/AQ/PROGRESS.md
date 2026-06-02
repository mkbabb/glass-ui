# Tranche AQ — PROGRESS

Execution log for tranche AQ (the platform-native substrate — modern-web). Updated at wave boundaries. Plan basis — `docs/tranches/AQ/AQ.md`; the W0 baseline audit at `audit/W0-modern-web-baseline.md`; the W1 design slices at `design/W1.{1,2,3}-*.md`; the close at `FINAL.md`.

Status vocabulary — PLANNED / IN-PROGRESS / DONE / MET / MISS / NAMED-FORWARD (watched condition) / USER-DOMAIN (cross-repo perimeter; user's push authority).

## Top-line status

**AQ CLOSED — W0-W8 complete.** The full glass-ui-internal gate matrix is green and AQ folds into the published 3.0.0 (GATE 1) + 3.1.0 (GATE 2). AQ swapped glass-ui's hand-rolled JS substrate for the browser platform primitives — `color-scheme`/`light-dark()`/`color-mix` (W2), `:has()`/individual-transforms/`.deferred-section`/`useYieldToMain`/coarse-floor (W3), `:user-invalid`/`useUserInvalidAria`/`field-sizing`/Sheet-a11y (W4), scroll-driven/`@starting-style`/`useViewTransition` (W5), anchor-underline/dock-VT/`moveBeforeSafe`/native-dialog-pilot (W6), and the bundle guardrail + `/number-field`+`/switch` subpaths + value.js-laziness (W7) — each token-first, each Newly/Limited feature feature-detected with the current path kept as the documented fallback. The cross-repo consumer fan-out is COMPLETE and confirms the ≥ 2-consumer bar for every AQ public contract. The overfitting audit is clean (no leaked demo-gated primitive; `GlassNativeSelect` correctly not-shipped). One open glass-ui gap surfaced (the standalone-`DockIconButton` coarse floor) is flagged for a follow-up, not fixed.

## Wave status table

| Wave | Title | Phase | Status | Evidence |
|---|---|---|---|---|
| AQ.W0 | 6-agent modern-web baseline audit | DEV | DONE | `audit/W0-modern-web-baseline.md` (49 findings → the 6-wave sequence) |
| AQ.W1 | Design slices — color/theming · selectors-forms · motion-anchor. **END OF DEV BOUNDARY.** | DEV (boundary) | DONE | `design/W1.{1,2,3}-*.md` + `audit/W1-design-close.md` (couplings cohere; 71-site `hsl(var())` classification; `/number-field`+`/switch` folded into W7) |
| AQ.W2 | Color & theming — `color-scheme` + `light-dark()` mirror collapse + `color-mix` alpha + `accent-color` + forced-colors focus | IMPL | DONE (`659458b`) | `tokens.css`/`theme.css`/`utilities.css`; the consumer `hsl(var())` bug fixed |
| AQ.W3 | Selectors & transforms + absorbed gaps + coarse floor | IMPL | DONE (`0ed3f6a`) | `:has()` + individual-transform identity base + `text-wrap` + tokenized scrollbars + `.deferred-section` + `useYieldToMain` + the `(pointer: coarse)` 44px dock floor |
| AQ.W4 | Form vocabulary + `useUserInvalidAria` contract | IMPL | DONE (`ece42a5`) | `:user-invalid`/`:user-valid` rungs + the `aria-invalid` blur-bridge + attr-passthrough + `field-sizing` autosize + `required`/error-slot + Sheet a11y; `form-validation` demo |
| AQ.W5 | Motion → platform substrate | IMPL | DONE (`4f739af`) | scroll-driven CSS (composables demoted to fallback) + `@starting-style` top-layer + `useViewTransition` + `view-transition.css`/`scroll-driven.css` |
| AQ.W6 | Anchor positioning + native top-layer | IMPL | DONE (`728b1c6`) | anchor-positioned underline (JS FLIP retired) + dock VT swap + `moveBeforeSafe` + `GlassDialogNative` (demo-gated) + `HoverPopover :native` opt-in (demo-gated); `native-top-layer` demo |
| AQ.W7 | Bundle guardrail + subpath completeness + value.js-laziness | IMPL | DONE (`cb20c24`) | heavy-leaf carve + barrel-vs-subpath delta + `+/number-field` + `+/switch` + keyframes.js `^2.2.0` dynamic re-export + the sanctioned CSS-ceiling rebase (82500 → 96800) |
| AQ.W8 | Close — overfitting audit + AQ.FINAL + the 3.x fold | IMPL (LAST) | DONE | `FINAL.md` + this PROGRESS; gate matrix green; 3.0.0 (GATE 1) + 3.1.0 (GATE 2) published |

**Wave count: 9 (AQ.W0-AQ.W8)** — 2 DEVELOPMENT (W0 audit + W1 design) + 7 IMPLEMENTATION. Dev/impl boundary at W1|W2.

## Cross-tranche posture

AQ is the substrate half of a cross-repo pair: it ships the platform-native primitives via the published glass-ui (contract-v2 dev-resolution); **muster tranche J** is the first adopter. The outward leg was orchestrator-authorized (green-gated, secret-safe): the staged 3.0.0 publish (GATE 1) landed first, then AQ published a 3.x minor (3.1.0, GATE 2 — additive + fallback-guarded, SemVer-minor) carrying the AQ waves. The cross-repo consumer fan-out is COMPLETE and CONFIRMS the ≥ 2-consumer bar:

- `useViewTransition` ← muster verdict-reveal + fourier route-morph + speedtest
- `useUserInvalidAria` ← muster forms + speedtest admin
- `.deferred-section` ← muster + fourier + speedtest
- `useYieldToMain` ← muster re-rank + speedtest maplibre
- `/number-field` + `/switch` ← muster J.W4 import-sweep

## Close gate matrix (W8)

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `typecheck` exit 0 | MET | `vue-tsc --noEmit` clean |
| 2 | `build` exit 0 (vite arm + vue-tsc dts arm) | MET | `dist/glass-ui.js` 8.41 KB-gz; `dist/number-field.js` + `dist/switch.js` emitted |
| 3 | `test` (vitest) green | MET | **542/542** passed (48 files) |
| 4 | `proof:theme` PASS | MET | theme/style proof passed |
| 5 | `proof:resolution` PASS | MET | contract-v2 dev-resolution satisfied across the constellation |
| 6 | `verify-export-types` PASS | MET | all export targets + the 2 new subpaths resolve |
| 7 | `profile:budget --enforce` PASS | MET | CSS gzip 87928 / 96800 (90.8%); JS gzip 8389 / 33700 (24.9%); ceiling rebased 82500 → 96800 at close |
| 8 | Overfitting audit clean — every AQ-new primitive ≥ 2 consumers (fan-out + demo) or demo-gated; no public-barrel leak; `GlassNativeSelect` not-shipped | MET | `FINAL.md` §Overfitting audit; 0 `dialog-native`/`GlassNativeSelect` in `package.json`/public barrels |
| 9 | `AQ/FINAL.md` authored — thesis + gate matrix + couplings + overfitting verdict + the flagged gap + successor | MET | `FINAL.md` |

## Named-forward / open

- **Standalone-`DockIconButton` coarse floor (open glass-ui gap).** The fan-out surfaced speedtest's Settings-gear `DockIconButton` rendered OUTSIDE a `.glass-dock`: the W3 `(pointer: coarse)` 44px floor is scoped to `.glass-dock[data-density]` (`dock.css:1079`), so a standalone button gets no touch-target floor + no `data-size=icon`. A real publisher gap; NOT fixed in this close (a coarse floor on the bare button independent of dock context wants ≥ 2 consumer sites to justify the contract). Flagged for a follow-up tranche. Recorded in `FINAL.md`.
- **Baseline-Limited pilots stay demo-gated** — the customizable-`<select>` (`GlassNativeSelect`, not built — muster did not adopt) + `GlassDialogNative` + the `HoverPopover :native` `interestfor` opt-in graduate from demo-gated/opt-in to default when they reach Baseline Widely Available.

## Cross-repo perimeter (USER-DOMAIN — recorded)

The 3.0.0 (GATE 1) + 3.1.0 (GATE 2) publishes are landed. Remaining outward-facing actions stay the user's push/npm authority per the standing agent git clause; the orchestrator owns the index and the gates, agents are edit-only / read-only-git.
