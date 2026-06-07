# AW.W9 - Blob Droplet Surface

## State

**Name**: W9 - Blob Droplet Surface
**Opens after**: AW tranche open (blob arm; independent of the aurora and dock arms)
**Agents**: 2 serial
**Hard gate**: `proof:blob-smin-normalized` + `proof:blob-gradient-unit-length` + `proof:blob-spec-premult` green; `POS_SCALE`/`/0.22` smoothK fudge gone; `metaball.frag.ts` `edgeGlow` site subsumed by the Fresnel rim; `proof:blob-color-equivalence` + `proof:blob-space-gamma` stay green.
**Status**: planned

## Goal criterion

The blob reads as a cohesive lit glass droplet rather than a flat colored sticker: the
satellite merges round into true menisci, the body carries a warm-cream specular glint and a
`--foreground`-tinted Fresnel rim built from the SDF gradient it already half-computes, and the
edge breathes as a domain-warped organic membrane. This wave succeeds if a side-by-side render
shows a curved, wet, premium droplet where HEAD shows a flat fill, with the OKLCh/OETF color
discipline and the AA edge intact.

## Scope

1. Normalize the `smin` in `sdf-body.glsl.ts:16-19` to the IQ 2024 form (`k *= 4.0; …`) so
   `uSmoothK` is a real blend-thickness in distance units, and delete the `/0.22` smoothK
   normalizer and the `POS_SCALE` multiply on `uSmoothK` at `useMetaballRenderer.ts:272-273`.
2. Add a config-gated circular `smin` (`k *= 1.0/(1.0-sqrt(0.5)); … - k*0.5*(1.0+h-sqrt(1.0-h*(h-2.0)))`)
   as the rounder-merge variant; default the quadratic, expose a `merge: "quadratic" | "circular"`
   axis on `BlobConfig`.
3. Add `vec3 surfaceNormal(vec2 uv, float d, float bodyR)` deriving a 2D normal from the SDF
   gradient (`normalize(vec2(dFdx(d), dFdy(d)))`, reusing the `fwidth(d)` derivatives at
   `metaball.frag.ts:149`) lifted to pseudo-3D via an edge-dome Z (`h = sqrt(max(0.0, -d/bodyR))`).
   **Screen-space epsilon (sharpened at convergence):** if the convergence prefers the IQ 4-tap
   tetrahedron gradient on the composite `sceneDist(uv)` (factored per W11/the lit-droplet path), the
   tap epsilon MUST be SCREEN-SPACE (~1.5px / `uResolution.y`), NOT a tiny constant — the smin+FBM
   field breaks `|grad|=1`, so a small fixed epsilon shimmers. Lift to `n3 = normalize(vec3(grad2d*(1-z),
   z))` with `z = sqrt(max(0, 1-(1-interior)^2))` so the droplet reads as a rounded bead (flat center,
   steep rim). Guard `normalize()` with `+1e-6`. The `dFdx`/`dFdy` 2-tap form is the cheaper baseline;
   the tetrahedron form is the dome-quality option the gate's `|N|≈1` assertion covers either way.
4. Add a Blinn-Phong specular lobe (warm-cream tint, `specShininess` 16-64 tight glint) and a
   Fresnel/Schlick rim (`--foreground`-tinted — the warm-highlight rim, NOT the default cold-blue
   Fresnel; the rim reads cream/ink-warm congruent with warm-cream-glass, `rimPower` ~2-3),
   combined `max(spec, rim*scale)`,
   injected into linear `rgb` BEFORE `linearToSrgb()` and the `* alpha` premultiply
   (`metaball.frag.ts:172-176`). Subsume the `edgeGlow` lift at `:167-168`.
   **Concrete color discipline (sharpened at convergence):**
   - The warm-cream glint is NOT pure white (pure white reads cheap-CG) — it is a near-white OKLCh
     tint (`L~0.97, C~0.03, hue~85°`) routed through the SAME spliced `OKLCH_MATRICES_GLSL`, NOT a
     hardcoded sRGB white. `spec = pow(max(dot(n3,h),0), specShininess) * ~0.9`.
   - The Fresnel rim is fed a NEW `uRimColor` uniform uploaded through the EXISTING injected
     `ColorResolver` seam (`defaultBlobColorResolver` in `/color`) — mirror the `uBaseColor` upload
     (`useMetaballRenderer.ts:238` `gl.uniform3f(U.uBaseColor, …)`), NOT an ad-hoc DOM probe (the
     value.js 1×1-canvas probe was deliberately removed at DEC-AT-2). `fres = pow(1-max(dot(n3,V),0),
     rimPower)`, attenuated where the body is thick (`1 - 0.6*thickness`).
   - **PremultipliedAlpha confirmation (the unhandled case — VERIFIED):** the blob context is created
     with `premultipliedAlpha: true` + `antialias: false` (`useMetaballRenderer.ts:149-150`). The
     premultiply-last discipline (the `* alpha` AFTER the OETF on the straight-alpha gamma triple) is
     therefore CORRECT against the real context attr — `proof:blob-spec-premult` asserts the lit terms
     enter linear `rgb` BEFORE `linearToSrgb()` AND the `* alpha` stays last; both `premultipliedAlpha:
     true` and `antialias: false` stay UNTOUCHED (the gate confirms the context attr is unchanged).
5. Replace the value-noise edge displacement (`fbm` at `metaball.frag.ts:134`,
   `watercolor-edges.glsl.ts`) with IQ analytic-derivative gradient noise (`noised()` →
   value + gradient in one eval), and wrap it in one domain-warp pass (`fbm(uv + W·fbm(uv))`)
   for the marbled organic edge; reuse the shared `FBM_ROT` rotation constant.
6. Declare the new uniforms/config (`specStrength`, `specShininess`, `rimPower`, `rimStrength`,
   `uRimColor`, `lightDir`, `warpAmp`, `merge`) in `types.ts` + `BLOB_CONFIG_DEFAULTS` with current-
   look-preserving defaults; upload them in `useMetaballRenderer.ts` — **`uRimColor` uploads through
   `resolveColor`/the injected `ColorResolver` exactly like `uBaseColor` (`useMetaballRenderer.ts:238`),
   NOT a DOM probe.** Every NEW uniform traces shader→`UNIFORM_NAMES`-array→`getUniformLocation`
   loop→`gl.uniform*` upload→`types.ts` config in THIS wave (the binding-verification memory: a uniform
   declared in the shader but not added to the `UNIFORM_NAMES` array at `useMetaballRenderer.ts:30` and
   not uploaded silently no-ops — vue-tsc and units miss it). Gate the lit terms behind a `lit` flag so
   the flat fill stays the default look (zero regression for existing consumers).

## Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory when:

- the file bounds would expand beyond the six listed paths — e.g. the gradient-noise swap forces
  an edit to the shared `procedural-color.glsl.ts` chunk that aurora also consumes (a cross-surface
  blast radius, not a blob-local edit);
- `proof:blob-color-equivalence` fails in a way not recoverable by a local TS-port update — i.e.
  the new specular/rim/gradient-noise terms cannot be made character-equivalent between the GLSL
  and the `metaball-color.glsl-port.ts` fixture;
- the premultiply-order gate (`proof:blob-spec-premult`) fails on three successive integration
  attempts (the light injection cannot be parsed as preceding the OETF + `* alpha`) — halt and
  re-plan the assembler splice order rather than redispatch the failing unit.

## File Bounds

| File | Access |
|---|---|
| `src/components/custom/goo-blob/shaders/sdf-body.glsl.ts` | modify |
| `src/components/custom/goo-blob/shaders/metaball.frag.ts` | modify |
| `src/components/custom/goo-blob/shaders/watercolor-edges.glsl.ts` | modify |
| `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` | modify |
| `src/components/custom/goo-blob/types.ts` | modify |
| `tests/components/custom/goo-blob/metaball-color.glsl-port.ts` | modify |
| `scripts/proof-blob-smin-normalized.mjs`, `scripts/proof-blob-gradient-unit-length.mjs`, `scripts/proof-blob-spec-premult.mjs` (the flat `scripts/proof-<name>.mjs` convention) | create |
| `package.json` (the three new `proof:*` script entries) | modify-carve |

Do NOT touch: `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` (the aurora-shared
OETF/matrix/FBM_ROT chunk — splice from it, never edit it here), `GooBlob.vue`,
`useBlobSatellites.ts`, `useBlobPointer.ts`, `useBlobMood.ts`, any aurora source.

## Disjointness

Two agent units, run serially within the wave (W9.a then W9.b) — they share
`metaball.frag.ts`, `types.ts`, and `useMetaballRenderer.ts`, so they MUST NOT run in parallel.
W9.a (geometry: smin + gradient noise + warp) lands first; W9.b (lighting: normal + spec + rim)
opens on W9.a's clean tree. No other AW wave writes these blob paths concurrently (the aurora
arm writes `aurora.frag.ts`/`composition.glsl.ts`; the dock arm writes the dock tree).

## Agent Units

### AW.W9.a Field And Membrane

- Goal: the merge geometry rounds into a real meniscus and the edge reads as a living
  domain-warped membrane, with `uSmoothK` decoupled from the magic normalizer.
- Mechanism: normalize the quadratic `smin` (`k *= 4.0`) and add the config-gated circular
  variant in `sdf-body.glsl.ts`; delete the `/0.22` and `POS_SCALE` smoothK fudge in
  `useMetaballRenderer.ts:272-273`; swap the value-noise edge for IQ `noised()` analytic-gradient
  noise + one domain-warp pass in `watercolor-edges.glsl.ts`/`metaball.frag.ts:134`; declare the
  `merge` + `warpAmp` config fields. The retained `noised()` gradient is published for W9.b.
- Files: `sdf-body.glsl.ts`, `watercolor-edges.glsl.ts`, `metaball.frag.ts` (edge block),
  `useMetaballRenderer.ts` (uniform upload), `types.ts` (config), `metaball-color.glsl-port.ts`
  (the warp/noise terms), `scripts/proof-blob-smin-normalized.mjs`.
- Sub-gate: `proof:blob-smin-normalized` asserts `uSmoothK` maps to a measured neck-width in
  distance units (k → blend band within tolerance) AND the `/0.22` + `POS_SCALE`-on-smoothK sites
  are gone (grep + a runtime k-sweep); `proof:blob-color-equivalence` stays green with the warp.

### AW.W9.b Lit Glass Surface

- Goal: the body carries a warm-cream specular glint + a `--foreground` Fresnel rim built from the
  SDF gradient, premultiply-correct, replacing the flat `edgeGlow`.
- Mechanism: add `surfaceNormal()` consuming the `fwidth(d)` derivatives (and the W9.a gradient
  where available) lifted by the edge-dome Z; add the Blinn-Phong specular + Schlick rim combined
  `max(spec, rim*scale)`, warm/`--foreground` tinted; inject into linear `rgb` upstream of
  `linearToSrgb()` + `* alpha`; subsume the `edgeGlow` site at `metaball.frag.ts:167-168`; declare
  + upload `specStrength`/`specShininess`/`rimPower`/`rimStrength`/`lightDir` behind a `lit` flag.
- Files: `metaball.frag.ts` (normal + lighting block), `types.ts` (lighting config),
  `useMetaballRenderer.ts` (uniform upload), `metaball-color.glsl-port.ts` (the lit terms),
  `scripts/proof-blob-gradient-unit-length.mjs`, `scripts/proof-blob-spec-premult.mjs`.
- Sub-gate: `proof:blob-gradient-unit-length` asserts the derived normal is unit-length
  (|N| ≈ 1) across a sampled interior AND the `edgeGlow` site is gone; `proof:blob-spec-premult`
  asserts the specular/rim terms enter `rgb` BEFORE the OETF + premultiply (assembled-shader parse).

## Hard Gate

1. `npm run proof:blob-smin-normalized` exits 0: `uSmoothK` → measured neck-width within tolerance;
   `rg 'POS_SCALE' useMetaballRenderer.ts` shows no occurrence on the `uSmoothK` upload, and the
   `/0.22` literal is absent.
2. `npm run proof:blob-gradient-unit-length` exits 0: sampled `|surfaceNormal()| ∈ [0.99, 1.01]`
   across the body interior; `rg 'edgeGlow' metaball.frag.ts` returns nothing.
3. `npm run proof:blob-spec-premult` exits 0: the assembled `METABALL_FRAGMENT_SRC` places the
   specular/rim injection strictly before `linearToSrgb(` and before the `* alpha` premultiply.
4. `npm run proof:blob-color-equivalence` exits 0: `metaball-color.glsl-port.ts` matches the GLSL
   to 1e-6 with the gradient-noise + warp + lit terms added.
5. `npm run proof:blob-space-gamma` stays green (the OETF seam unbroken).
6. `npm run typecheck` exits 0 (the new `BlobConfig` fields + uniform plumbing typecheck clean).
7. `npm run build` exits 0 (the blob chunk emits; the shader assembler splice is character-valid).

## Format And Lint Cadence

`npm run typecheck` + `npm run build` after each agent unit and before close. `git diff --check`
on every commit (no trailing-whitespace/conflict-marker leakage into the GLSL template strings).
No formatter runs on the `/* glsl */` template literals beyond Prettier's default TS pass; the
shader-equivalence gate (`proof:blob-color-equivalence`) is the load-bearing correctness check.

## Verification Artefacts

- `scripts/proof-blob-smin-normalized.mjs`, `scripts/proof-blob-gradient-unit-length.mjs`, `scripts/proof-blob-spec-premult.mjs`
  (the three new gates).
- The updated `tests/components/custom/goo-blob/metaball-color.glsl-port.ts` (the TS port carrying
  the new terms).
- Gate logs saved under `docs/tranches/AW/audit/W9-blob-droplet.json` (the JSON evidence ledger:
  each gate name + exit code + the k-sweep / |N| / premult-order measurements).
- A before/after render pair (flat HEAD vs lit droplet) captured at close if browser automation is
  available; otherwise the build-verification floor + a re-probe obligation recorded to the next
  tranche (the π visual-runtime lane contingency clause).

## Commit Plan

- `feat(goo-blob): normalize smin + analytic-gradient noise + domain-warp edge (W9.a)` — the
  geometry/membrane unit; body names the `POS_SCALE`/`/0.22` deletion and the `noised()` swap.
- `feat(goo-blob): SDF-gradient normal + Blinn-Phong spec + Fresnel rim, premult-correct (W9.b)` —
  the lit-surface unit; body names the `edgeGlow` subsumption and the premultiply-order discipline.
- `test(goo-blob): blob-smin-normalized + gradient-unit-length + spec-premult gates` — the three
  proof scripts + the `package.json` entries + the TS-port extension.
- `docs(tranche-AW): W9 droplet close — gate ledger + before/after artefacts`.

## Dependencies

- **Depends on**: AW tranche open. Independent of the aurora and dock arms (disjoint file bounds).
  W9.b depends on W9.a's clean tree (shared shader paths; serial).
- **Blocks**: AW.W11 (Blob Mood) consumes the `surfaceNormal()` from W9.b for its Fresnel-driven
  iridescence and its thickness-from-`-d` fake-SSS; AW.W11 cannot land its surface terms without
  the W9.b normal. AW.W10 (Blob Interaction) is independent of W9 (it touches the pointer/satellite
  composables, not the lit-surface block) and may run in parallel with W9.

## Archaeology

This wave promotes the blob SOTA seeds `AW.Wb2` (normalized + circular smin), `AW.Wb3`
(SDF-gradient normal keystone), `AW.Wb4` (Blinn-Phong spec + Fresnel rim, premult-correct), and
the gradient-noise/domain-warp half of `AW.Wb7` from `docs/tranches/AW/blob/wave-seeds.md` into one
formal surface wave. The prior posture is the `AU.W1-blob-primitives.md:67-71` BOOK ceiling
(analytic-derivative noise + lighting deferred as "ONE quality level, the correct one"); W9
un-books the cheap analytic half. The guardrail against the historical A5/A2 darkening trap
(linear-in-without-OETF-out ships ~2.2× too dark) is the premultiply-order gate
(`proof:blob-spec-premult`) plus the unbroken `proof:blob-space-gamma` — every new light term
enters `rgb` in linear before the OETF, never after the `* alpha`.
