# AW.W11 - Blob Mood, Iridescence And Palette

## State

**Name**: W11 - Blob Mood, Iridescence And Palette
**Opens after**: AW.W9 (Blob Droplet) — consumes the `surfaceNormal()` keystone; AW.W10 (Blob Interaction) — consumes the pointer/idle state for state-driven moods; AW.W5 (Aurora Color/Derive) — owns `aurora/composables/color.ts`, the harmony-hoist source (no concurrent `color.ts` write; see Scope 4)
**Agents**: 3 serial
**Hard gate**: `proof:blob-color-equivalence` green with the iridescence + SSS terms in the TS port; the warm-bias chroma-cap holds; `proof:single-color-core` asserts the blob consumes the shared `ColorHarmony` (no forked `deriveHue`); the mood model is wire-or-cut (no orphaned `setMood`/`orbitSpeedScale`/`wobbleScale`); a demo story exercises every shipped mood.
**Status**: planned

## Goal criterion

The blob has depth and expressiveness: a warm-biased iridescent sheen and a thickness-driven
fake-subsurface glow give it the read of translucent gel rather than flat fill, a seed-driven
OKLCh palette distributes 2-4 in-family stops across body and satellites, and the mood model is
resolved — either driven from interaction/idle state with the two dead params consumed, or
collapsed to one `energy` scalar — with a demo that exercises whatever ships. This wave succeeds
if the blob shimmers subtly at the rim, glows from within, derives a coherent multi-stop palette
from a seed, and carries no orphaned mood substrate.

## Scope

1. Add iridescence: an IQ cosine palette (`a + b*cos(2π(c*t + d))`) driving OKLCh **hue**, `t` from
   the AW.W9 Fresnel/edge angle + the existing FBM color field + an animated thickness map (reuse
   the edge FBM via `uColorNoiseSpeed`/`uTime`), **warm-biased — a warm-pearl highlight, NOT the
   default cold-blue Fresnel rim**: bias the palette `d` phase to the warm arc and clamp chroma to
   the warm-pearl band so the rim sheen reads cream/gold, congruent with the warm-cream-glass
   identity (the cold-blue rim is the explicit anti-pattern). Default `iridescence` LOW. Mix into
   `oklch` BEFORE `gamutClampOklch` (`metaball.frag.ts:170`).
2. Add fake subsurface translucency: a thickness-driven inner-luminosity ramp off `-d` (bright
   translucent core fading to a light-leaking edge) plus the fast-SSS back-light
   `pow(saturate(dot(V,-(L+N*dist))), power)*scale*(1-thickness)`, lifting OKLCh L and warming the
   hue, consuming the AW.W9 `surfaceNormal()`. Both terms in OKLCh before the gamut clamp + OETF.
3. Add `deriveBlobPalette(seed, options)` mirroring `deriveAurora`: one seed → 2-4 gamut-mapped
   OKLCh stops distributed across body + satellites; generalize `metaball.frag.ts` from
   `uBaseColor` to `uPalette[N]` + `uStopCount`, interpolating in OKLab with shorter/longer
   hue-arc control + a midpoint chroma-bump; default the palette from glass-ui warm tokens.
4. Hoist the shared harmony vocabulary — `AuroraHarmony` + `deriveHue` + `gamutMapStop` → a
   `ColorHarmony` type in the `/color` leaf — so the blob and aurora derive from one source (no
   second divergent harmony); the deriver returns space-neutral OKLCh stops (each surface bakes to
   its own target). **Cross-band ordering (the AW.W5 `color.ts` write conflict):** the source of
   that vocabulary is `src/components/custom/aurora/composables/color.ts`, which **AW.W5.2 owns as
   `modify`** (its harmonies/easing/temperature edits). W11 therefore **depends-on AW.W5** and the
   hoist lands ONE of two ways, decided at dispatch: (a) PREFERRED — AW.W5 performs the hoist into
   `/color` as the last step of its derive work, and W11 ONLY consumes the shared `ColorHarmony`
   (W11 never touches `color.ts`); OR (b) FALLBACK — if W5 ships without hoisting, W11 performs the
   hoist, sequenced strictly AFTER W5 commits to a clean main, and adds
   `aurora/composables/color.ts` to its File Bounds as `modify`. Either way the two waves never
   write `color.ts` concurrently — W11 opens after W5 lands.
5. Resolve the mood model (wire-or-cut, per the overfitting-audit precept): EITHER wire `setMood`
   internally from the AW.W10 pointer/idle state (curious on approach, excited on click, sleepy
   after inactivity), consume the dead `orbitSpeedScale`/`wobbleScale` in `useBlobSatellites.tick`,
   reframe `MOOD_TARGETS` as derived from a 2-axis `{valence, arousal}` model, route iridescence/
   SSS intensity through `MoodParams` (excited = stronger/faster shimmer, sleepy = nearly flat),
   AND add a demo that exercises every mood, OR collapse `useBlobMood` to a single `energy` scalar
   and delete the orphaned vocabulary (no backwards-compat alias).
6. Declare the new config/`MoodParams` fields (`iridescence`, `iridHue`, `iridSpeed`, `sssScale`,
   `sssPower`, `coreGlow`, and the palette stops) in `types.ts` + `BLOB_CONFIG_DEFAULTS` with
   taste-first low defaults; upload them in `useMetaballRenderer.ts`.

## Triumvirate Dispatch

A triumvirate is mandatory when:

- the harmony hoist forces a file-bound expansion beyond the `/color` leaf — e.g. `deriveAurora`
  cannot be refactored onto the shared `ColorHarmony` without editing aurora's deriver surface (a
  cross-surface API change that exceeds the blob arm's scope and must be co-planned with the
  aurora arm);
- `proof:blob-color-equivalence` or `proof:single-color-core` fails non-locally — the iridescence
  or multi-stop term cannot be made character-equivalent in the TS port, or the blob still resolves
  a forked `deriveHue` after the hoist;
- the third successive attempt at the mood resolution leaves an orphan (a `setMood` with no caller,
  or a dead `orbitSpeedScale`/`wobbleScale`) — halt and re-plan toward the collapse-to-`energy`
  option rather than redispatch the wiring unit.

## File Bounds

| File | Access |
|---|---|
| `src/components/custom/goo-blob/shaders/metaball.frag.ts` | modify |
| `src/components/custom/goo-blob/shaders/oklch-perturb.glsl.ts` | modify |
| `src/components/custom/goo-blob/composables/useMetaballRenderer.ts` | modify |
| `src/components/custom/goo-blob/composables/useBlobMood.ts` | modify |
| `src/components/custom/goo-blob/composables/useBlobSatellites.ts` | modify |
| `src/components/custom/goo-blob/types.ts` | modify |
| `src/composables/color/` (the shared `ColorHarmony` + `deriveBlobPalette` home) | modify-carve |
| `src/components/custom/aurora/composables/color.ts` (the harmony hoist SOURCE — **AW.W5.2's file**) | conditional modify — ONLY under Scope 4 fallback (b), sequenced strictly after AW.W5 commits; under preferred (a) AW.W5 hoists and this file stays out of W11's bounds |
| `demo/stories/.../blob-mood.vue` | create |
| `tests/components/custom/goo-blob/metaball-color.glsl-port.ts` | modify |
| `scripts/proof-blob-color-equivalence.mjs`, `scripts/proof-single-color-core.mjs` (extend); `scripts/proof-blob-mood-resolved.mjs` (new — the flat `scripts/proof-<name>.mjs` convention) | modify-carve / create |
| `package.json` (the new `proof:blob-mood-resolved` entry) | modify-carve |

Do NOT touch: `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` (splice, never edit),
aurora's `aurora.frag.ts`/`composition.glsl.ts` (the harmony hoist exposes a shared `ColorHarmony`
type — do not rewrite aurora's GLSL deriver in this wave), `aurora/composables/color.ts` UNLESS the
Scope 4 fallback (b) is in effect (W5 owns it; under fallback W11 modifies it only AFTER W5 commits
— never a concurrent write), `useBlobPointer.ts` / `GooBlob.vue` (AW.W10's interaction surface;
consume its exposed state, do not edit it), `sdf-body.glsl.ts` / `watercolor-edges.glsl.ts`
(AW.W9's geometry GLSL).

## Disjointness

Three agent units run serially (W11.a iridescence/SSS → W11.b palette/harmony → W11.c mood) — they
share `metaball.frag.ts`, `types.ts`, and `useMetaballRenderer.ts`, so they MUST NOT run in
parallel. W11 opens AFTER AW.W9 commits (it consumes the W9 `surfaceNormal()`), AFTER AW.W10
commits (it consumes the W10 pointer/idle state), AND AFTER AW.W5 commits (the cross-band
`aurora/composables/color.ts` write conflict — W5.2 owns that file; W11's harmony hoist/consume
per Scope 4 must not co-write it). So when W11 runs, W5/W9/W10 are already on a clean main and
there is no concurrent writer on either the shared blob files or `color.ts`.

## Agent Units

### AW.W11.a Iridescence And Fake-SSS

- Goal: the blob reads as translucent gel — a warm-biased rim sheen plus a thickness-driven inner
  glow and back-light, OKLCh-correct.
- Mechanism: add the warm-biased IQ cosine-palette iridescence driving OKLCh hue (`t` from the W9
  Fresnel angle + FBM + animated thickness); add the `-d` inner-luminosity ramp + the fast-SSS
  back-light consuming the W9 normal; mix both into `oklch` before `gamutClampOklch`; declare +
  upload `iridescence`/`iridHue`/`iridSpeed`/`sssScale`/`sssPower`/`coreGlow`.
- Files: `metaball.frag.ts` (color block), `oklch-perturb.glsl.ts` (if the clamp needs the chroma
  cap), `useMetaballRenderer.ts` (uniforms), `types.ts` (config), `metaball-color.glsl-port.ts`.
- Sub-gate: `proof:blob-color-equivalence` matches the GLSL to 1e-6 with the iridescence + SSS
  terms; a gamut assertion (the spectral term never pushes a pixel out-of-gamut after the clamp);
  a chroma-cap assertion (the warm-bias holds the sheen below a max chroma).

### AW.W11.b Palette And Shared Harmony

- Goal: a seed derives 2-4 in-family OKLCh stops across body + satellites, from one shared harmony
  vocabulary the blob and aurora both consume.
- Mechanism: add `deriveBlobPalette(seed, options)`; consume the shared `ColorHarmony` in `/color`
  (the `AuroraHarmony`/`deriveHue`/`gamutMapStop` vocabulary hoisted out of
  `aurora/composables/color.ts` — landed by AW.W5 per Scope 4 preferred path, or by W11 sequenced
  after W5 per the fallback; W11 never co-writes `color.ts` with W5); generalize `metaball.frag.ts`
  from `uBaseColor` to
  `uPalette[N]` + `uStopCount` interpolating in OKLab with hue-arc control + midpoint chroma-bump;
  reuse aurora's buffer-reuse pattern to avoid GC churn.
- Files: `src/composables/color/` (the shared harmony + deriver), `metaball.frag.ts` (multi-stop),
  `useMetaballRenderer.ts` (palette upload), `types.ts`, `metaball-color.glsl-port.ts`.
- Sub-gate: `proof:single-color-core` asserts the blob consumes the shared `ColorHarmony` (no
  forked `deriveHue`); a midpoint-chroma assertion (OKLCh interpolation of a vivid pair holds
  chroma above the linear-`mix` midpoint); `proof:color-acyclic` stays green.

### AW.W11.c Mood Resolution

- Goal: no orphaned mood substrate — moods are state-driven (or collapsed) and a demo exercises them.
- Mechanism: wire `setMood` from the W10 pointer/idle state, consume the dead
  `orbitSpeedScale`/`wobbleScale` in `useBlobSatellites.tick`, reframe `MOOD_TARGETS` on a
  `{valence, arousal}` model, route iridescence/SSS intensity through `MoodParams`, ship a demo
  that drives every mood — OR collapse `useBlobMood` to one `energy` scalar and delete the
  vocabulary.
- Files: `useBlobMood.ts`, `useBlobSatellites.ts` (consume the dead params), `types.ts`
  (`MoodParams`), `demo/stories/.../blob-mood.vue`, `scripts/proof-blob-mood-resolved.mjs`.
- Sub-gate: `proof:blob-mood-resolved` asserts no `setMood`/`orbitSpeedScale`/`wobbleScale` is
  declared-but-unread, and the demo story drives every shipped mood (or the collapse deleted the
  vocabulary outright).

## Hard Gate

1. `npm run proof:blob-color-equivalence` exits 0: `metaball-color.glsl-port.ts` matches the GLSL
   to 1e-6 with the iridescence + SSS + multi-stop palette terms; a gamut assertion (no pixel
   out-of-gamut after the clamp) and a chroma-cap assertion (warm-bias holds) pass.
2. `npm run proof:single-color-core` exits 0: the blob derives through the shared `ColorHarmony`;
   `rg 'deriveHue'` shows no forked copy in the blob tree; `proof:color-acyclic` stays green.
3. `npm run proof:blob-mood-resolved` exits 0: no declared-but-unread mood param remains
   (`orbitSpeedScale`/`wobbleScale` consumed or deleted; `setMood` has a caller or is removed) and
   the demo story binds every shipped mood.
4. `npm run proof:blob-space-gamma` stays green (the OETF seam unbroken by the new color terms).
5. `npm run typecheck` exits 0 (the `ColorHarmony` hoist, the palette deriver, and the config
   additions typecheck clean across both blob and the `/color` leaf).
6. `npm run build` exits 0 (the blob chunk + the demo story + the `/color` subpath emit clean).

## Format And Lint Cadence

`npm run typecheck` + `npm run build` after each agent unit and before close; `git diff --check`
on every commit. The `/color` leaf hoist runs the repository's TS lint pass. The load-bearing
checks are `proof:blob-color-equivalence` (the GLSL/TS-port equivalence with the new color terms),
`proof:single-color-core` (the shared-harmony consumption), and `proof:blob-mood-resolved` (the
no-orphan assertion), run after each unit and at close.

## Verification Artefacts

- `scripts/proof-blob-mood-resolved.mjs` (the new gate) + the extended `blob-color-equivalence`
  and `single-color-core` scripts.
- `src/composables/color/` shared `ColorHarmony` + `deriveBlobPalette` (the hoisted vocabulary).
- `demo/stories/.../blob-mood.vue` (the mood consumer).
- The updated `metaball-color.glsl-port.ts` (the TS port carrying iridescence/SSS/multi-stop).
- Gate logs under `docs/tranches/AW/audit/W11-blob-mood.json` (each gate name + exit code + the
  gamut/chroma-cap/midpoint-chroma measurements + the no-orphan grep result).
- A palette-tour render (a few seeds → their derived stops) + a per-mood render set, captured at
  close if browser automation is available; otherwise the build floor + the re-probe obligation.

## Commit Plan

- `feat(goo-blob): warm-biased iridescence + thickness-driven fake-SSS, OKLCh-correct (W11.a)` —
  body names the Fresnel-driven cosine palette, the `-d` thickness, and the gamut/chroma discipline.
- `feat(color): hoist ColorHarmony + deriveBlobPalette; blob multi-stop palette (W11.b)` — body
  names the shared-harmony hoist and the `uBaseColor` → `uPalette[N]` generalization.
- `refactor(goo-blob): resolve mood model — state-driven moods + dead-param consumption (W11.c)` —
  body names the wired params or the `energy`-scalar collapse and the orphan deletion.
- `feat(demo): blob mood + palette story exercising every shipped mood`.
- `test(goo-blob): blob-mood-resolved gate + color-equivalence/single-color-core extensions`.
- `docs(tranche-AW): W11 mood close — gate ledger + palette/mood render artefacts`.

## Dependencies

- **Depends on**: AW.W9 (Blob Droplet) for the `surfaceNormal()` keystone (the iridescence Fresnel
  driver and the SSS back-light both consume it) and the thickness-from-`-d` the SDF gives; AW.W10
  (Blob Interaction) for the pointer/idle state the state-driven mood arc reads; AND **AW.W5
  (Aurora Color/Derive)** for the harmony hoist — W5.2 owns `aurora/composables/color.ts`, the
  source of `AuroraHarmony`/`deriveHue`/`gamutMapStop`. W11 opens only after W5 commits; the hoist
  lands per Scope 4 (preferred: W5 hoists, W11 consumes the shared `ColorHarmony`; fallback: W11
  hoists, sequenced after W5). Consumes the shared `procedural-color.glsl.ts` chunk by splice
  (never edits it) and value.js as the single color-math source.
- **Blocks**: nothing within the blob arm (W11 is the blob arm's surface/expressiveness terminus).
  The hoisted shared `ColorHarmony` is available for the aurora arm's derive-color wave to consume
  on its own schedule (a non-blocking convenience, not a hard coupling).

## Archaeology

This wave promotes the surface-color half of blob SOTA seed `AW.Wb5` (iridescence + fake-SSS),
all of `AW.Wb8` (deriveBlobPalette + multi-stop + shared harmony), and the mood-resolution fold of
`AW.Wb6` from `docs/tranches/AW/blob/wave-seeds.md`. The prior posture is a near-monochrome fill
(`hueRange: 5°`, `satShift: 0`, `brightnessShift: 0` — a ±2.5° hue wobble) with no view/curvature
term and a half-built mood model: `useBlobMood` cross-fades five presets but `setMood` has no
internal caller and `orbitSpeedScale`/`wobbleScale` are lerped in `MoodParams` yet never read by
the satellite tick (the substrate-without-consumer finding, brief 30/31/32). The wire-or-cut
discipline is the overfitting-audit precept (every src/ artefact has ≥2 sites or is exported or is
a private demo helper). The physically-based multi-wavelength thin-film and the Belcour-Barla Airy
BRDF are the documented *deferred* ceiling — too saturated/heavy for a lit-less warm-cream surface;
the fresnel-driven cosine palette is the artist-friendly, GPU-cheap path, restrained per the 2026
"year of human taste" taste constraint. The guardrail against forking the color math is
`proof:single-color-core` + `proof:color-acyclic` (value.js stays the single source; the harmony
hoists, it does not duplicate).
