# BB.W-DEEP-GLASS — DELTA (the OPT-IN deep-glass tier: `--glass-depth` + `--glass-blur-deep-*` + `.glass-deep` + CardTier `deep`)

**Wave**: BB.W-DEEP-GLASS (Batch L) · **Branch**: tranche/BB · **Date**: 2026-06-17
**HEAD**: `2928da41` (the wave's RE-GROUND base — the spec defect-table cite `6c8eb429` had advanced across the Batch-L rim-seam glass chain; drift table below)
**Dev-box**: darwin 25.4.0 (arm64) · **Chromium**: Playwright 1.60.0 (chromium-headless-new + coarse-touch) · **Node**: v26.0.0
**Gate**: `proof:glass-depth` born-RED → GREEN (D1 the `--glass-depth` typed-inheriting axis driving the deep recipe · D2 the Apple-range deep tokens STRICTLY deeper than calm floating · D3 the calm ladder BYTE-unchanged + `proof:glass-cal` cross-asserted GREEN · D4 the deep tier COMPOSES `--glass-level` + `.glass-deep` is a token re-point not a parallel recipe · D5 the deep tier is OPT-IN) + the 6-bite `--self-test` GREEN. No-regress: `proof:glass-cal`, `proof:glass-cohesion`, `proof:glass-level`, `proof:glass-accent`, `proof:no-god-module` (glass.css 505 / ladder.css 510 — 0-growth, net-new in partials) all GREEN. `proof:visual-runner` enrollment GREEN (the new spec auto-enrolled: disk-non-private 101 | enrolled 97 | orphans 0 | union==disk ✓). `npm run typecheck` GREEN (the `CardTier` enum extension types cleanly; `api/index.ts` widens by construction).

## §0 RE-GROUND — drift at HEAD (recorded, never re-diagnosed)

The spec cited HEAD `6c8eb429`; the wave executed against `2928da41` (the rim-seam glass chain — W-LENSING, W-GLASS-ACCENT, W-METAL-SHIMMER — landed first; a sibling W-?-REVEAL landed `glass/reveal.css` between surface-axis and this wave's deep.css). Every §0 cite re-grepped at `2928da41`; the MECHANISMS held, the line numbers drifted:

| cite (spec) | HEAD `2928da41` | note |
|---|---|---|
| DEEP-NET-NEW `grep -rn 'glass-depth\|glass-deep' src/` → ZERO | ZERO across styles + components + scripts | EXACT — the net-new mint confirmed empty (born-RED) |
| CALM-LADDER `glass.css:43-60` (the six base radius primitives) | the six at `tokens/glass.css:43-60` (wash 1 / quiet 8 / resting 10 / floating 13 / overlay 13 / dock 9) | EXACT — the W-GLASS-CAL frozen values held |
| CALM-COMPOSED `glass.css:67-95` (the composed `--glass-blur-*` + companions) | `tokens/glass.css:67-95` — the per-rung saturate/brightness + the `* var(--glass-level)` seam intact (floating `saturate(1.18)`) | EXACT — `proof:glass-cal` B1-B3 GREEN |
| LEVEL-REG `property-regs.css:111-115` (`--glass-level`) | the `@property --glass-level` at `property-regs.css:185-189` (drifted +~70: the W-LENSING `--glass-refract`/`--specular-angle` + W-GLASS-ACCENT `--glass-accent*` regs inserted above) | the deep `--glass-depth` reg lands IMMEDIATELY after `--glass-level` (the twin) |
| OPAQUE-PRECEDENT `ladder.css:287-297` (`.glass-opaque { --glass-level: 0 }`) | the `.glass-opaque` at `ladder.css:320-330` (the token-substitution model — `--glass-level: 0` + `--glass-tint-strength: 0%`) | EXACT mechanism — the `.glass-deep` token re-point mirrors it |
| TIER-LADDER `ladder.css:36-113` (the five `.glass-*` tiers) | the five at `ladder.css:41-125` (each `background: color-mix(in oklab, …); backdrop-filter; border; box-shadow`) | EXACT — `.glass-floating` is the deep tier's base rung |
| CARDTIER `Card.vue:29-35` + `:160-200` resolver | `CardTier` union at `Card.vue:30-36`, resolver `tier === 'opaque' ? 'glass-resting glass-opaque' : …` at `:246` | EXACT — the `deep` branch mirrors the opaque branch |
| DARK-ARM `dark-arm.css:210-222` (the `.dark --glass-blur-*` companions) | the dark companions at `dark-arm.css:224-229` (the saturate/brightness LUMINOSITY lift, radius-only) | EXACT — the dark deep arm mirrors them |

**The sibling reveal.css collision (recorded).** A sibling Batch-L wave inserted `@import "./glass/reveal.css"` into `glass.css` between `surface-axis.css` and this wave's `deep.css`. The shared `scripts/read-css-monoliths.mjs` `glass.order` array did not yet list `reveal.css` (the sibling's monolith-order edit had not landed), so this wave added BOTH `reveal.css` and `deep.css` to the order array (in the actual `glass.css` import sequence) to keep `proof:no-god-module`'s import-order assertion GREEN. This is coordination on the shared script leaf, not a foreign-tree edit.

## The Apple-range derivation (the DEEP-RANGE finding → the deep token values)

The deep-SOTA audit (`audit/sota-deep/findings.md:9,36`) measured Apple's live glass nav material at `backdrop-filter: saturate(1.8) blur(20px)` (home) with product-page tiers in the 14-20px band. glass-ui's W-GLASS-CAL calm ladder tops at floating 13px / saturate 1.18 — conservative against the canonical Liquid Glass. The deep tier lands:

| axis | calm floating (W-GLASS-CAL) | Apple measure | **glass-ui DEEP** | rationale |
|---|---|---|---|---|
| blur radius | 13px | 14-20px (home 20px) | **16px** | STRICTLY deeper than calm (13px), in-band, the budget-clearing landing. The full Apple 20px is BOOKED to a successor (the §7-style fall — `backdrop-filter` radius is the dominant GPU cost over a live aurora; 16px clears the throttle while reading unmistakably deeper). |
| saturate | 1.18 | 1.8 | **1.5** | the LOW end of the 1.5-1.8 band. The Apple 1.8 is measured over a NEUTRAL backdrop; glass-ui's deep tier sits over warm-aurora, and the warm-cream light-concentration ceiling (AX.W52 D19 — a saturate that over-juices a colored substrate reads as a garish smear) keeps it just-rich. The deepest BLUR carries the "more glass" read; the saturate stays restrained. The §Triumvirate saturate-band trigger did NOT fire — 1.5 read rich, not garish, in one iteration. |

**Booked successors** (the §Named-successors, recorded against the perf number):
- The always-on **20px** deep register (the maximal Apple home value) — booked to a successor with the recorded throttle perf number. The 16px landing is the deeper register that ships; the maximal 20px is the GPU-cost refinement.
- The continuous `--glass-depth` lerp is ALREADY SHIPPED (not booked) — the deep recipe LERPs blur+saturate between the calm-floating endpoint (depth 0) and the Apple-deep endpoint (depth 1), so `--glass-depth` is the full `--glass-level` twin: a host dials `--glass-depth: 0.5` to land the deep tier half-way to the calm rung, and it animates smoothly. `initial-value: 1` (the resting deep magnitude — a `.glass-deep` surface paints at the full Apple-deep register by default).
- The deep-tier `@2dppx` richer-wash restore (the resolution-adaptive deep arm) — a SEPARATE named successor owned by the calm-ladder's `light-dark.css` `@media` restore precedent, not this wave's mint.

## The chosen axis shape (the LEVEL-COMPOSE design)

The deep recipe (`tokens/glass-deep.css`) is the SCALAR-LERP form (the spec's preferred shape):
```
--glass-blur-deep-active-radius:
    calc((floating + (deep - floating) * var(--glass-depth)) * var(--glass-level));
--glass-saturate-deep-active:
    calc(1.18 + (deep-saturate - 1.18) * var(--glass-depth));
--glass-blur-deep:
    blur(var(--glass-blur-deep-active-radius)) saturate(var(--glass-saturate-deep-active));
```
- `var(--glass-depth)` is the genuine driver (D1 — not a baked literal; both the radius AND the saturate read it).
- `* var(--glass-level)` on the radius (D4 — the level seam reaches the deep plate; at `--glass-level: 0` the deep blur resolves `blur(0)`, the opaque escape + the a11y brackets compose for free).
- A SEPARATE token family the calm ladder NEVER reads (D3 — the calm `--glass-blur-floating` composite is byte-untouched; `proof:glass-cal` GREEN).

The `.glass-deep` class (`glass/deep.css`) is the **token-substitution model** (option a, the `.glass-opaque` precedent — no cascade fight): it sets `--glass-blur-floating: var(--glass-blur-deep)` locally, so the base `.glass-floating` rule's `backdrop-filter: var(--glass-blur-floating)` resolves to the deep blur. NO competing `backdrop-filter` declaration, NO base-rule edit; the glass edge/rim/under-shadow + the W55 tint axis + the a11y brackets all compose unchanged. The §Triumvirate cascade-order trigger did NOT fire (the token-substitution sidesteps it entirely). The CardTier `deep` maps `'glass-floating glass-deep'` (a base rung + the deep decoration, mirroring `opaque → 'glass-resting glass-opaque'`).

## The π readback (the BINDING visual truth — `tests-visual/glass-depth.spec.ts`)

The device-free D1-D5 SOURCE clauses prove the RECIPE; the π proves the RENDER. The spec injects four synthetic plates over a busy gradient backdrop on the live demo (`/styles` global) and reads back the resolved `backdrop-filter` off the live DOM, at 2 viewports × both modes (LOCAL-ONLY real-GPU; `backdrop-filter` over a live `<canvas>` aurora needs a real Chromium GPU — the AY W-LIVE1 split, backstopped on CI by `proof:live-verified-ledger`, the binding capture rides W-REFLECT3):

- **(a) DEEP vs CALM** — the `.glass-floating.glass-deep` plate resolves a LARGER blur radius (16px) AND a HIGHER saturate (1.5) than the calm `.glass-floating` default (13px / 1.18) beside it over the SAME backdrop. The deeper plate reads visibly more diffuse + more light-concentrating (the "increased glassmorphism" realized in the paint). The deep blur is asserted in the Apple [14,20] band.
- **(b) CALM BYTE-UNCHANGED** — the calm `.glass-floating` plate's resolved `backdrop-filter` blur == 13px (the W-GLASS-CAL value; mode-invariant — the radius is the light-arm primitive) AND saturate == 1.18 in light (the calm-unchanged proof in the render — the deep mint did NOT shift the calm default).
- **(c) LEVEL-COMPOSE** — the deep plate at `--glass-level: 0` (the opaque escape, the a11y bracket) collapses to `blur(0)` through the SAME level path (the deep tier inherits the ONE level seam — not a parallel recipe).
- **(d) W55 BRIGHT BUCKET** — the deep plate under an injected `--glass-backdrop: light` ancestor still resolves a deep blur (it composes the listed `.glass-floating` rung, so the bright-bucket darken reaches it — the deep tier is not exempt from the legibility seam; the tint axis is disjoint from the blur axis, so the filter is unchanged by the bucket while the surface IS in it).

Fail-CLOSED: a deep plate that reads identical to calm, OR a calm plate that drifted, reds the readback (never SKIP-with-EXIT=0).

## The dark deep arm (the WARM-CREAM + W-DARK-MATERIAL discipline)

The `.dark` deep companion (`dark-arm.css`) mirrors the calm dark-arm saturate/brightness LUMINOSITY lift (the iOS-dark "dark glass glows where light passes" model): the deep dark glass glows MORE where the backdrop passes — `--glass-blur-deep: blur(var(--glass-blur-deep-active-radius)) saturate(1.55) brightness(1.16)`, lifting harder than the calm dark floating (1.28/1.10). The RADIUS is the SAME `--glass-blur-deep-active-radius` × `var(--glass-level)` (radius-only across modes — the §2c discipline). A SEPARATE deep token the calm dark ladder never reads (CALM-UNCHANGED in dark too). The warm-cream/luminous-dark identity HOLDS — the deep tier deepens DIFFUSION + SATURATION, never hue (the `--card` warm-cream base is the same; the saturate LIFTS the backdrop's existing chroma, it does not inject a hue; no ppmycota/demo color enters a token).

## `proof:ba-gestalt` glass/CTA verdict

The glass band (a `.glass-deep` plate beside the calm content tiers over the live aurora, both modes — the demo witness in `glass-material.vue`) judged as a designed gestalt: **the deep tier reads as the MAXIMAL iOS-27 liquid glass — thicker, more diffuse, more light-concentrating — while the calm content surfaces stay calm-and-readable, a coherent two-register page.** The calm default did NOT look reverted (byte-identical in the render); the deep tier did NOT read as a garish over-blur (16px / 1.5 reads rich, not smeared, over the warm-aurora). Verdict: **operative-PASS both modes** (the binding whole-page capture is owed to W-REFLECT3, on the fresh capture; recorded here against the HEAD calm-only ground).

## Files

- `src/styles/tokens/glass-deep.css` (NEW) — the `--glass-blur-deep-*` family + the lerp recipe (net-new partial, keeps `tokens/glass.css` at 505).
- `src/styles/glass/deep.css` (NEW) — the `.glass-deep` token-substitution decoration (net-new partial, keeps `ladder.css` at 510).
- `src/styles/tokens.css` — `@import "./tokens/glass-deep.css"` after glass.css.
- `src/styles/glass.css` — `@import "./glass/deep.css"` after surface-axis/reveal.
- `src/styles/tokens/property-regs.css` — `@property --glass-depth` (the `--glass-level` twin).
- `src/styles/tokens/dark-arm.css` — the `.dark` deep saturate/brightness companion.
- `src/components/ui/card/Card.vue` — `CardTier | "deep"` + the `deep → 'glass-floating glass-deep'` resolver branch.
- `scripts/proof-glass-depth.mjs` (NEW) — the born-RED gate (D1-D5 + the 6-bite self-test).
- `tests-visual/glass-depth.spec.ts` (NEW) — the π readback.
- `scripts/read-css-monoliths.mjs` — register `glass-deep.css` (tokens order) + `reveal.css`/`deep.css` (glass order).
- `demo/stories/substrates/glass-material.vue` — the deep-vs-calm demo witness over the live aurora.
