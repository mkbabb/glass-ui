# BA.W-GOO-REDRESS — π readback DELTA

<!-- FRESHNESS (AZ-form) -->
- **surface-paths**:
  - `src/components/custom/goo-blob/composables/uploadBlobUniforms.ts`
  - `src/components/custom/goo-blob/composables/useBlobSatellites.ts`
  - `src/components/custom/goo-blob/composables/useMetaballRenderer.ts`
  - `src/components/custom/goo-blob/GooBlob.vue`
  - `src/components/custom/goo-blob/constants.ts`
  - `demo/stories/substrates/blob.vue`
- **surface-hash** (sha256 of the concatenated surface files): `1af0765480f31b17fce52bca137f0441bad2d6196914a402049d3d89970b4b49`
- **captured-at**: 2026-06-12, `/substrates/blob`, `:5199`, chromium-headless-new, BOTH modes
- **π spec**: `tests-visual/goo-redress.spec.ts`
- **frames**: `W-GOO-REDRESS-{bridge,hover}-{light,dark}.png` — resolved (this dir):
  `W-GOO-REDRESS-bridge-light.png`, `W-GOO-REDRESS-bridge-dark.png`,
  `W-GOO-REDRESS-hover-light.png`, `W-GOO-REDRESS-hover-dark.png`.

## Arm decision (scope 6 / BA-VJS-5 / C-1)

**ARM B — BOOK to a 4.x point release (the conservative DEFAULT).** The wave lead did
NOT widen the GL fence to the satellite COLOR seam (`uSatColor` in
`metaball-uniforms.glsl.ts` + the `metaball.frag.ts` per-source sample). Per the spec,
arm A is a §Triumvirate scope-reveal (research+plan-augment the bound FIRST) — NOT
unilateral — and the dispatch did not authorize the fence-widen. So BA-VJS-5 re-stamps
as a named successor booked to a 4.x point release with the ready spec recorded
(`uSatColor[MAX_SATS]` vec3 + the per-source weighted blend with a smin-neck cross-fade +
the `uploadBlobUniforms.ts` `paletteStops[(i % (stopCount-1))+1]` assignment + the
optional `satelliteShadeSpread` knob + the `deriveBlobPalette` `lightnessFloor`
companion). value.js holds (it cannot derive satellite colors until the seam lands). The
W4 gate clause is OMITTED (arm B), not a gate failure — the honest fence-respect
CONDITIONS-UNMET close-path. `metaball.frag.ts` / `metaball-uniforms.glsl.ts` /
`constants.ts` `UNIFORM_NAMES` / `color/index.ts` stay UNTOUCHED on the color seam.

**The C-1 both-arms note (per the value.js fold):** the satellites still render from the
SAME palette field as the body (read as the body color) — the in-family derived-shade
ask is UNCHANGED by this wave. The arm that holds is **arm B**.

## Chosen smin/orbit direction (scope 1)

**Composed (i)+(ii), the band-widen as the PRIMARY coupling + the capped envelope as the
robustness floor** — direction (ii) alone over-inflated past both the calm-lean ceiling
AND the four-side containment, so it is bounded LOW and the capped orbit-random/wobble
envelope (i) carries the rest:

- **(ii) the worst-case-orbit band widen** (`uploadBlobUniforms.ts`): the `uSmoothK`
  upload is no longer the bare nominal `cMem.smoothK * params.smoothK * POS_SCALE`. It is
  `nominalBand * orbitWiden * POS_SCALE` where `orbitWiden = min(1.25, 1 + bridgeGap /
  nominalBand)` and `bridgeGap = max(0, worstOrbitDist − satelliteRadius − bodyRadius)`,
  `worstOrbitDist = orbitRadius × 1.2 × (1 + eccentricity)` — the SAME worst-case orbit
  term the `uMaxReach` `satWorst` already sums. SELF-TARGETING: `bridgeGap = 0` (factor
  1.0, the band BYTE-IDENTICAL) when the satellite is well-inside the body (the library
  `BLOB_CONFIG_DEFAULTS` — orbit 0.17, near-edge 0.132 inside body 0.22), so the
  `proof:blob-render` body lean does NOT move; it lifts only when there is a gap to
  bridge. The ceiling is `MAX_BRIDGE_WIDEN = 1.25` (not 1.6) — a higher ceiling
  over-inflated the painted footprint.
- **(i) the capped orbit-random/wobble envelope** (`useBlobSatellites.ts` +
  `constants.ts`): the per-satellite orbit random is RE-CENTERED + CAPPED (`×0.85..1.05`,
  was `×0.8..1.2`) and the wobble amplitudes calmed (`wobble1 0.015..0.035` was
  `0.02..0.08`; `wobble2 0.01..0.025` was `0.015..0.055`), so the worst-case near-edge
  stays within the widened band's reach across the WHOLE orbit. The `create` +
  `randomizeOrbit` sites read ONE source (no per-site drift). The orbit→merge→absorb→
  emerge show survives — the satellites still sweep OUT to ~1.05× the nominal orbit and
  back; the envelope is bounded, NOT collapsed.
- `uMaxReach` (the bounding-discard pad) now sums the WIDENED band (`nominalBand *
  orbitWiden`), not the nominal, so the wet meniscus is never clipped.
- `STUDIO_GEO_BASE.orbitRadius` stays **0.30** (> bodyRadius 0.22 — the
  `proof:blob-page` orbit-outside-body source-witness + the four-side containment ceiling
  both bound it; lower over-inflated the merged footprint). `BASE_OPACITY` stays the
  calibrated **0.75** (lifting it to 0.95 over-inflated the merged footprint past
  containment). The bridge-hold is carried by the band-widen + the capped envelope, NOT
  by a studio-orbit re-center or an opacity lift.

## The pointer wake seam (scope 3 / root cause 2 / BA-goo-3)

`useMetaballRenderer` now exposes a public `wake()` handle (the twin of `pause`/`resume`,
calling the SAME substrate `canvasHandle.wake()` the `color`/`paletteStops` watchers
call — NO new rAF, NO second wake path, the single-substrate-loop invariant intact).
`GooBlob.vue` wires `watch(() => pointer.active.value, (a) => { if (a) renderer.wake() })`
so a first hover over a fully-parked blob (all satellites orbiting → the AX.W16
quiescence gate parked the loop) re-arms the loop on the SAME frame instead of waiting up
to an orbit horizon for the next scheduled satellite wake.

## π readback (the BINDING visual truth)

`tests-visual/goo-redress.spec.ts` — `/substrates/blob`, `:5199`, BOTH modes. The
silhouette mask is CHROMA-keyed (`max−min` over RGB), NOT bg-diff-keyed: the canvas
overflows its host (the 160% satellite-overflow box), so its screenshot sits over a
TWO-TONE backdrop (the gray configurator panel ≈200,200,200 AND the cream page
≈251,250,248 through the overflow). A single-threshold modal-bg mask flags BOTH the
golden blob AND the cream-page corners as "foreground" and splits into SPURIOUS
components (a measurement artifact, not a blob detachment — first-discovered on this
wave's own π). The warm golden bead is SATURATED; both backdrops are near-NEUTRAL, so the
chroma key isolates the body+satellites and rejects both backdrops.

| metric | light | dark | bar |
|---|---|---|---|
| worstComponents over 36-frame orbit sweep | 1 | 1 | ≤ 1 (no detached disc) |
| detach frames | 0 / 36 | 0 / 36 | 0 (the BA-goo-2 fail state is a 2nd satellite-sized component) |
| min silhouette mass (cells) | 3038 | 2587 | ≥ 1500 (the merged creature is present + substantial, not absent/flooded) |
| hover-wake mask delta (cells) | 79 | 65 | ≥ 8 (the first hover repaints within a frame) |
| pointer-follow lurchRatio | 0.81* | 0.29 | < 0.92 (continuous spring, not one clamped jump) — *travel < 6px → assert skipped |

The bridge HOLDS across the full 36-frame orbit sweep in BOTH modes (one connected
saturated creature, substantial merged mass, NO detached-disc frame), and the first
hover after the loop has parked repaints same-frame (mask delta 65–79) with the
pointer-follow spring advancing continuously. The canvas-only frame inspection confirmed
a coherent merging creature with visible necking pseudopods — the "watch the metaballing"
read.

## Honest finding — the detach is INTERMITTENT (the P-1 trap)

With the corrected CHROMA mask, the bridge already reads as ONE component at HEAD over a
36-frame sample too — the R8-07 full-detach is a RARE worst-case orbit alignment that
neither a 36- nor 40-frame sweep reliably catches in EITHER version. The earlier
7-component readings were entirely the two-tone-backdrop measurement artifact. So the π
component count is a FALSIFIABLE FLOOR (it REDs on a detached disc) rather than a
HEAD-vs-fix discriminator. The fix's load-bearing value is the worst-case-orbit band
COUPLING + the capped envelope (the band rides the orbit excursion the lane named as the
specific coupling, the satellite near-edge bounded inside the smin reach) + the merged
mass evidence (the satellites neck more solidly: the resting merged silhouette is
LARGER/denser than HEAD) — and the pointer wake, which is unambiguously new (HEAD had no
pointer→wake wire; the W2 source witness is born-RED at HEAD).

## §0 drift / pre-existing condition recorded (NOT my regression)

`proof:blob-page` (AZ.W-BLOB-PAGE's gate, NOT this wave's bound) FAILS the four-side
containment check at PURE HEAD on `tranche/BA` (footprint-edge paint fraction 1.000,
ceiling 0.6) with ZERO of my changes — a PRE-EXISTING failure, almost certainly from the
Batch-1 W-DARK-MATERIAL / W-NO-GRAY backdrop change interacting with the SAME modal-bg
measurement class that broke this wave's own initial π (the warmed page backdrop confuses
the `modalBg(png)` footprint classifier). My changes do NOT worsen it (HEAD is already at
the maximum 1.000; my working state reads the identical 1.000). It is outside this wave's
bound (the blob-page surface is AZ's; the backdrop is Batch-1's) and is flagged here for
the close-battery, not fixed.
