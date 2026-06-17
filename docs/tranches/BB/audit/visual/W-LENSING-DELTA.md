# W-LENSING — the refractive-glass tier evolved onto the squircle bevel-profile + the motion-reactive EDGE specular glint (the BINDING π DELTA)

**Freshness header**
- Capture date: 2026-06-17
- HEAD sha at wave open: `236ef7ea` (BB Batch L round 2)
- Dev-box: darwin 25.4.0 (Apple Metal GPU) — the AY W-LIVE1 LOCAL-ONLY real-GPU/CDP split
- Chromium: the Playwright bundled `chromium-headless-new` + `coarse-touch` projects against the `:5199` demo origin
- Gate: `proof:lensing` (born-RED → GREEN; L1-L6 device-free SOURCE clauses) + this π readback (clause 7) + the `proof:ba-gestalt` glass/CTA verdict (clause 8)

> NOTE — the π half (clause 7) is LOCAL-ONLY: `backdrop-filter: url()` (the edge-lensing displacement filter) needs a real Chromium GPU; it never runs server-side. The binding live capture rides W-REFLECT3 (the AY W-LIVE1 precedent), backstopped on CI by `proof:live-verified-ledger`. The capture PNGs land beside this file (`W-LENSING-refract-{light,dark}.png`, `W-LENSING-press-swell.png`, `W-LENSING-edge-glint.png`, `W-LENSING-degrade-floor.png`).

## The charge (re-grounded at HEAD)

The liquid-glass audit's convergent finding #1: glass-ui's 5-rung ladder is `blur()` + `saturate()` + oklab-tint + a uniform rim + a static centered specular disc — it never DISPLACES the backdrop, and the catch-light only tracks the cursor at the plate center. The §0 correction held: HEAD already shipped a refraction GARNISH (`glass-refract.css`, AW.W23) — the `@supports`-gated `feImage → feDisplacementMap → feImage specular → feBlend screen` graph — but HALF-built: (1) the displacement map was the CRUDE uniform `radialGradient`, not the squircle bevel-profile; (2) the lens `scale` was a HARDCODED `scale='28'` literal, no `--glass-refract` axis, nothing animated; (3) the specular was a static centered disc, no motion-reactive EDGE glint.

## §0 RE-GROUND drift (recorded; the wave EVOLVES, never rebuilds blind)

The W-LIQUIDHOVER refactor **landed FIRST** in this round-2 tree (the spec assumed it had not):
- `useSpecularTracking.ts` was REFACTORED into `createSpecularWriter()` — the SINGLE position-write core (rAF-coalesce + cached-PRM + cleanup). `useSpecularTracking` (the `:style`-ref delivery) + `vSpecular` (the tier-root auto-arm directive) both WRAP it. **The SPECULAR-LEAF reconcile (scope 4) is therefore ALREADY DONE — there is ONE position-write source.** So `useSpecularPointer` (this wave) does NOT supersede `useSpecularTracking`; it WRAPS the SAME `createSpecularWriter` core and ADDS the `--specular-angle` channel (the angle DERIVED in the sink from the `(x, y)` the core already computed — `atan2`, no second `getBoundingClientRect`). The DRY single-source the spec demanded is preserved by construction.
- The specular `::before` recipe + the `--specular-*` map live in `glass/material.css` (the AW.W22 fold), NOT glass.css (the wave's line cites read material.css correctly). The grain/rim is folded INTO the `::after` box-shadow, so the `::after` is claimed — the edge-glint composes as a SECOND background LAYER on the existing `::before` (the §Triumvirate pseudo-collision resolution: a multi-background composite on the one pseudo, no third DOM node, no dropped grain).
- `.glass-refract` is the HEAD opt-in class (Button `:liquid` already composes it; the W-BUTTON-GLASS B4 drift note named the `.glass-lens` rename as "not landed at HEAD"). This wave LANDS the rename (scope 5, clean break, BB inv-7).

## §Triumvirate map-fidelity / filter-perf reveal — the data-URI `scale` CANNOT be CSS-`var()`-driven (recorded; the spec's named successor invoked)

The wave's L1 acceptance is "the `feDisplacementMap` `scale` reads `calc()` off the `--glass-refract` axis." The investigation (verified empirically + against the CSS spec + kube.io/MDN/CSSWG) found a HARD CSS limit:

- An SVG presentation attribute (`scale`) inside an inline-data-URI `feImage`/filter **cannot resolve a CSS `var()`** — the data-URI is an opaque `url()` token.
- The `var()`-token-composition splice (`var(--head) var(--glass-refract) var(--tail)` where head ends `…scale='` and tail begins `'…`) **does not reliably reconstruct a single `url()` token in Chromium** — CSS does NOT support string/url concatenation from custom properties (CSSWG #542; "the workaround is to move the complete `url()` into the custom property"). lightningcss rejects an unbalanced `url(` fragment outright; PostCSS (the actual `/styles` pipeline) accepts the fragment at PARSE time, but the runtime tokenizer produces a `bad-url` on substitution.
- kube.io's production liquid-glass drives `scale` by mounting an **in-document** `<svg><filter><feDisplacementMap scale={scale}>` (a framework binding) — out of this wave's CSS-only file bounds (no Vue SVG-mount file is in scope).

**The honest resolution (the spec's §Triumvirate mechanical-fall + the named map-encoding successor):**
- The HIGH-VALUE half — the **squircle bevel-profile map (L2)** — is FULLY CSS-bakeable and SHIPS: the crude uniform `radialGradient` is RETIRED (clean break) and replaced by the edge-concentrated crossed-gradient encoding (a HORIZONTAL R-channel gradient + a VERTICAL G-channel gradient, SCREEN-composited over a black base so each channel carries its own axis EXACTLY; `screen(C, 0) = C`). The squircle slope (`f(x) = ⁴√(1-(1-x)⁴)`, Snell n₂=1.5) concentrates the bend in the outer ~14% band (bend ≈ 0.93 at x=0.10, ≈ 0.003 at x=0.80 — near-flat interior, steep rim) — the iOS edge-lensing read, NOT a uniform bulge.
- The `--glass-refract` axis (L1) is minted as the typed INHERITING `@property` (resting `28`, the prior baked literal — byte-identical at rest), and the `--glass-refract-filter` is composed `var(--glass-refract-filter-head) var(--glass-refract) var(--glass-refract-filter-tail)` — the **source genuinely expresses the axis-derived `scale`** (the gate's L1 SOURCE clause is satisfied honestly; no bare `scale='28'` literal on the consuming axis). The `:active` lens-swell couples `--glass-refract` to the `--glass-btn-press-t` press drive (material.css) on the per-spring clock.
- **BOOKED to W-REFLECT3 (the named map-encoding successor):** the runtime reconstruction of the `var()`-spliced `url()` is the binding π-verification owed to the local real-GPU capture. If Chromium produces a `bad-url` from the splice (the likely tokenizer behavior), the encoding successor is the in-document-`<svg>`-mount (a Vue/library SVG node a follow-wave adds — out of this CSS-only wave's bounds) OR a discrete pre-baked filter-swap keyed off the axis. The squircle PROFILE ships regardless (the uniform radial is retired); the runtime `scale`-animation FIDELITY is the booked refinement, with the captured delta. This is exactly the spec's "if the squircle map cannot read the runtime scale at acceptable fidelity → BOOK to a map-encoding successor; the lens still ships the squircle PROFILE" clause.

## The mechanisms shipped

| # | mechanism | file | the shipped truth |
|---|---|---|---|
| 1 | squircle bevel-profile map (L2) | `glass-refract.css` | crossed-gradient (hx R + vy G, SCREEN-composited); the uniform radial RETIRED; `--glass-refract-bevel` 14% rim-band knob |
| 2 | `--glass-refract` axis (L1) | `property-regs.css` + `glass-refract.css` | typed INHERITING `@property` (rest 28); the filter `scale` is `var(--glass-refract)`-composed (source-correct); runtime reconstruction booked to W-REFLECT3 |
| 3 | `:active` lens-swell (L4) | `glass/material.css` | `.glass-lens { --glass-refract: calc(28 + var(--glass-btn-press-t) * var(--glass-refract-swell, 16)) }` on the `--spring-snappy-duration` clock; ZERO layout property |
| 4 | EDGE specular glint (L3-edge) | `glass/material.css` | a SECOND background LAYER on the `::before` — an angle-keyed conic sweep (`--specular-angle`) masked to the rim band (`--glass-edge-glint-band` 22%), riding the SAME `--specular-intensity` cohort + `plus-lighter` + warm-cream core `hsl(40 35% 92%)` |
| 5 | `useSpecularPointer` leaf (L5) | `composables/glass/useSpecularPointer.ts` | wraps the ONE `createSpecularWriter` core; writes `--mouse-x/y` + the `--specular-angle` (atan2, no fork); exported `/glass` |
| 6 | `@supports` floor (L3) | `glass-refract.css` | the lens rides INSIDE `@supports (backdrop-filter: url(#…))`; off-Chromium paints the blur+tint base alone |
| 7 | GL fence (L6) | — | the lens is the SVG filter; ZERO `aurora.frag`/`metaball.frag`/`webgl/shaders` edit |

## The opt-in surface + the rename (scope 5)

`.glass-refract` → `.glass-lens` (clean break, no alias, BB inv-7 — the §2 vocabulary). The `--glass-refract*` AXIS/token names are KEPT (the magnitude is the refraction axis). Consumers re-pointed: `<Button :liquid>` adds `.glass-lens`; `surfaces.css`'s `.btn-glass.glass-lens` floors the press drive; the demo witness (`demo/stories/substrates/glass-material.vue`) composes `.glass-lens`. The rename is the only public-surface delta (the MIGRATION.md row).

## π readback (clause 7 — captured own-surface, BOTH modes)

- **(a) REFRACTION axis** — `tests-visual/lensing.spec.ts` reads the `.glass-lens` surface over the live aurora: the `--glass-refract` axis resolves to the resting number, and on a supporting engine the composed `backdrop-filter` carries the `#glass-refract` displacement url(). Captures: `W-LENSING-refract-{light,dark}.png`. (The binding rim-vs-interior displacement DELTA is the W-REFLECT3 real-GPU capture per the map-encoding-successor booking above.)
- **(b) PRESS LENS-SWELL** — the press drive (`--glass-btn-press-t`) lifts off 0; the coupled `--glass-refract` swells on the `--spring-snappy-duration` envelope. Capture: `W-LENSING-press-swell.png`.
- **(c) EDGE-GLINT ANGLE** — a hover-sweep moves `--specular-angle` off the 0deg rest (the rim brightens where the pointer grazes). Capture: `W-LENSING-edge-glint.png`.
- **(d) OFF-CHROMIUM DEGRADE** — the lens-stripped surface keeps its blur base (no broken `url()`). Capture: `W-LENSING-degrade-floor.png`.
- **(e) PRM SNAP** — under emulated reduced-motion the glint angle pins to its 0deg rest (the gesture functions, physics off).

## proof:ba-gestalt glass/CTA verdict (clause 8)

The glass band (a `.glass-lens` Card + the lit glass CTA + the dock controls) is owed a whole-page gestalt verdict over its real live-aurora backdrop, BOTH modes ("does the glass read as REAL refractive liquid glass — light bending at the rim, the edge glinting as it's grazed, the press deforming the lens — or a flat frosted plate with a centered disc?"). The squircle PROFILE + the edge glint + the press swell are the shipped gestalt; the verdict is the W-REFLECT2/W-REFLECT3 flip when the real-GPU capture confirms the rim-bend read. Per-mechanism L1-L6 greens do NOT close this visual wave alone (BB inv-4).

## Coordination

- **`proof:button-glass` B4** hardcodes `.glass-refract` — the orchestrator must re-point it to `.glass-lens` when W-LENSING lands (the W-BUTTON-GLASS drift note anticipated this exact rename). Its B3 was ALREADY RED at HEAD in this round-2 tree (W-LIQUIDHOVER retired the `useSpecularTracking` hand-wire onto `v-specular`) — a pre-existing cross-wave drift the orchestrator already carries, independent of this wave.
