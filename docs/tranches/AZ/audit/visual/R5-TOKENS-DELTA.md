# AZ.R5-TOKENS (R5-1 + R5-2) — the dead `--dock-mobile-scale` knob + the over-big coarse dock · DELTA

<!-- surface-paths: src/styles/dock/overflow.css, src/styles/tokens/offsets-sizing.css, scripts/proof-ui-scale.mjs -->
<!-- surface-hash: fd29e7cbca77ad509774a321969e14427e7ab939cdf8ad997cb72e29d39667da -->
<!-- AZ.W-GATES content-hash freshness model: fresh IFF the three surface-paths' bytes
     are byte-identical to capture time (sha256 of the concatenated bytes, "\n"-joined,
     surfaceHash convention). Stamped at the own-surface capture against the live demo
     shell + the /dock/overview story on :5199 (the user's truth surface) under
     coarse-pointer (iPhone-class 390×844 @2×) emulation, with the R5-TOKENS edits in place. -->

The slides-consumer audit (USER-AUDIT-2026-06-11-R5 §R5-1/R5-2) reported, consumer-verified
on the production deck (glass-ui 3.9.0→3.11.2 probe), TWO coupled dock-scale defects:

- **R5-1 — the DEAD KNOB.** `--dock-scale: calc(var(--ui-scale) * var(--dock-local-scale, 1))`
  was declared ONLY at `:root`. Custom-property SUBSTITUTION resolves a property at its
  declaring element, so `--dock-scale` froze `--dock-local-scale` at the `:root` identity 1.
  The coarse `@media (pointer: coarse) .glass-dock[data-density]` block lifts
  `--dock-local-scale` LOWER in the tree — but that lift never re-flowed into the
  already-substituted `--dock-scale`. So the documented consumer knob `--dock-mobile-scale`
  NEVER reached the geometry cascade — the AX.W55 substitution-vs-inheritance trap, 3rd recurrence.
- **R5-2 — the over-big coarse default.** The bare global `--ui-coarse-scale: 1.5` painted a
  ~80px collapsed pill on a phone (the user: "the dock is like 25-20% too big on mobile").

## The root fix (token-first, no consumer guard)

`dock/overflow.css` coarse block — RE-DECLARE `--dock-scale` on the SAME
`.glass-dock[data-density]` element that lifts `--dock-local-scale`, so the descendant
lift re-flows into it (the formula is IDENTICAL to the `:root` one by construction). The
coarse register is the FALLBACK, not a hard-pin: `--dock-local-scale: var(--dock-mobile-scale,
var(--dock-coarse-scale, 0.78))` — so a consumer's `--dock-mobile-scale` on any ancestor WINS
(a hard `--dock-mobile-scale: 0.78` on this block would re-create the dead knob via a
specificity war). `--dock-coarse-scale: 0.78` is minted at `:root` (overridable). The
0.78 × the 1.5 global ≈ 1.17 effective → a ~60px collapsed pill; the WCAG-2.5.5 44px touch
floor holds via the `max(…, --dock-control-floor)` clamp in every scaled control-size.

**The sweep (R5-1 task §3 — the trap, one level out).** The OTHER `:root` tokens that derive
from `--dock-scale` (`--dock-icon-glyph`, `--dock-collapsed-padding`, `--dock-layer-tab-size`)
freeze `--dock-scale` at the `:root` 1.5× too — with R5-2 now introducing a dock-local 1.17×,
they would paint at 1.5× while the density box paints at 1.17× (a desync R5-2 would introduce).
Re-resolved each on the coarse block so they thread the dock-local register. Plus the
PRE-EXISTING freeze: `--dock-collapsed-summary-min-size = calc(var(--dock-layer-height) * 0.85)`
read `--dock-layer-height` at `:root` (density.css never sets it there → froze at the inline
2.5rem fallback × 0.85 = 34px). Re-resolved so the collapsed circle FLOOR tracks the dock scale.

### Enumeration of the substitution-vs-inheritance candidates in the dock token chain

| `:root` token | derives from | descendant re-declares the dep? | verdict |
|---|---|---|---|
| `--dock-scale` | `--ui-scale` · `--dock-local-scale` | `--dock-local-scale` (coarse) | **FIXED (R5-1)** — re-declared on the coarse block |
| `--dock-icon-glyph` | `--dock-scale` | yes (now coarse) | **FIXED** — re-resolved on the coarse block |
| `--dock-collapsed-padding` | `--dock-scale` | yes (now coarse) | **FIXED** — re-resolved on the coarse block |
| `--dock-layer-tab-size` | `--dock-scale` | yes (now coarse) | **FIXED** — re-resolved on the coarse block |
| `--dock-collapsed-summary-min-size` | `--dock-layer-height` | `--dock-layer-height` (density) | **FIXED** — re-resolved (pre-existing freeze too) |
| `--dock-h` | `--size-icon-btn` | `--size-icon-btn` (coarse) | benign — **ZERO consumers** (dead token; trap never manifests; not touched, no speculative edit) |
| density geometry (`--dock-control-size`, `--dock-layer-height`, …) | `--dock-scale` | already re-declared per-density on `.glass-dock[data-density]` (density.css) | NOT a trap — these are declared on the dock element, so they read the dock-local `--dock-scale` natively |

## Live verification — the π readback under coarse-pointer emulation (the painted truth)

The binding truth is the painted size, NOT a green source gate. Playwright coarse-pointer
emulation (`hasTouch + isMobile`, 390×844 @2×, so `@media (pointer: coarse)` MATCHES — the
AY.W-SCALE2 `coarse-touch` project shape), reading the live `/dock/overview` collapsible dock
and the demo-shell BottomDock on :5199.

### R5-1 — the knob REACHES the geometry (the dead-knob is alive)

| `--dock-mobile-scale` | `--dock-scale` resolved | collapsed summary | dock box | capture |
|---|---|---|---|---|
| (unset → coarse default) | `calc(1.5 * 0.78)` | 60.83px | 249×63 | `R5-TOKENS-knob-default-light.png` |
| `0.6` | `calc(1.5 * 0.6)` | 54.78px | 227×57 | `R5-TOKENS-knob-0p6-light.png` |
| `1.4` | `calc(1.5 * 1.4)` | 109.19px | 312×111 | `R5-TOKENS-knob-1p4-light.png` |
| `1` (match global) | `calc(1.5 * 1)` | 78px | — | (readback) |

The painted pill grows monotonically with the knob — the consumer knob now reaches the
geometry cascade. **BORN-RED contrast:** on the pre-fix tree the same three knob values ALL
painted an identical 78px pill (`--dock-scale` frozen at `calc(1.5 * 1)`), the dead knob.

### R5-2 — the compact coarse default (the ~22%-too-big fix)

The default coarse collapsed pill drops from **~80px → ~60.83px** (the slides-verified
60×60.8 register). The demo-shell BottomDock (`always-expanded`, the user's mobile truth
surface) reads `--dock-scale: calc(1.5 * 0.78)` and its control-size clamps at the 44px touch
floor — captures `R5-TOKENS-shell-bottomdock-{light,dark}.png`.

### No fine-pointer regression

Fine pointer (desktop, no `hasTouch`): `--dock-scale` resolves to `calc(1 * 1) = 1`,
`--dock-local-scale = 1`, the collapsed summary 52px — byte-identical to HEAD. The coarse
register and the `--dock-mobile-scale: initial` :root change have ZERO effect at fine pointer.

## Gate

`proof:ui-scale` (`scripts/proof-ui-scale.mjs`) extended with TWO new witnesses (born-RED on
the pre-fix tree, verified by a temporary pre-fix simulation):

- **`dock-coarse-redeclares-scale`** — the coarse block RE-DECLARES `--dock-scale: calc(var(--ui-scale)
  * var(--dock-local-scale, 1))` on `.glass-dock[data-density]` so the knob reaches the geometry
  (R5-1). Removing the re-declare REDs it.
- **`dock-coarse-scale-minted`** — `--dock-coarse-scale: 0.78` minted at `:root` (R5-2).

The existing `dock-coarse-honors-global` witness updated to assert the compact-register fallback
form (`var(--dock-mobile-scale, var(--dock-coarse-scale, …))`). proof:ui-scale 30/30 pass.

Adjacent fleet GREEN (no regression): `proof:dock-region-model`, `proof:dock-perfection`
(Q1/C2), `proof:dock-unify` (F1/F5), `proof:dock-no-scale-pop`, `proof:dock-taxonomy`,
`proof:dock-hold-contract`; `npm run typecheck`; `npm run build` (CSS compiles, dock chunk emits).

## Files

| file | change |
|---|---|
| `src/styles/dock/overflow.css` | the coarse `.glass-dock[data-density]` block: RE-DECLARE `--dock-scale` (R5-1) + the `--dock-mobile-scale, var(--dock-coarse-scale, 0.78)` compact-register fallback (R5-2) + re-resolve the 4 frozen derived tokens (the sweep) |
| `src/styles/tokens/offsets-sizing.css` | `--dock-mobile-scale: initial` (the consumer knob unset at :root so the fallback wins) + mint `--dock-coarse-scale: 0.78` (the dock-layer compact coarse default) |
| `scripts/proof-ui-scale.mjs` | the `dock-coarse-redeclares-scale` + `dock-coarse-scale-minted` witnesses; the `dock-coarse-honors-global` fallback-form update |
| `CLAUDE.md` | the dock section: a new "coarse-pointer dock scale knobs" subsection documenting `--dock-mobile-scale` / `--dock-coarse-scale` + the substitution-vs-inheritance discipline (R5-2 §doc) |
