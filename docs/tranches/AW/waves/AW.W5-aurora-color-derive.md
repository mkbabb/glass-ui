# AW.W5 — AURORA-COLOR (in-shader OKLCh interpolation + hue-path + the derive-color front door)

> **Numbering note:** W5 opens BEFORE W4 by dependency — W5 lands the OKLCh `brokenColorJitter` seam W4's van-Gogh/oil-pastel per-stroke jitter consumes, so W5 SHOULD precede W4's integration. The wave NUMBER ordering (W4 then W5) is not the EXECUTION ordering. The charter §2 open-order is fixed to match by the charter-AW fixer.

## 2. State

**Name**: W5 — AURORA-COLOR (the OKLCh pipeline + derive-color — the lowest-cost, highest-value win)
**Opens after**: HEAD — independent of every other AW aurora wave. The two arms (in-shader OKLCh + the derive-color CPU extension) are file-disjoint and run in parallel. AW.W4 (painterly) depends on the OKLCh broken-color seam this wave lands, so W5 SHOULD precede W4's integration.
**Agents**: 2 parallel — AW.W5.1 (in-shader OKLCh interpolation — the GLSL arm), AW.W5.2 (derive-color: harmonies, easing, temperature, scene — the CPU-TS arm). File-disjoint (the GLSL `composition.glsl.ts`/`aurora.frag.ts` vs the TS `color.ts`) — they run in sibling worktrees per §4b.
**Hard gate**: two born-RED gates green — `proof:aurora-oklch-interp` (the spliced `OKLCH_MATRICES_GLSL` matches the value.js Ottosson constants to 1e-6 + the OKLCh interpolation of a vivid blue→yellow pair holds chroma ABOVE the linear-`mix` midpoint), `proof:aurora-derive-gamut` (every stop of every harmony × easing × temperature combination over a neon-seed matrix is in-sRGB after `gamutMapStop`). `typecheck` + `build` + the existing gate matrix stay green; the affected preset thumbnails re-baked.
**Status**: planned

**Type:** IMPL (VISUAL — the user-mandated "full + total OKLAB/OKLCh migration" + "the derive-color variant; a harmonious palette from one seed"). Not publish-blocking; the `deriveAurora` signature is a SUPERSET (all new fields on `DeriveAuroraOptions`) — the prior behavior is the named `chromaEasing:"linear"` branch, NOT a compat alias.
**Scope source:** `docs/tranches/AW/aurora/PATH-FORWARD.md` §2 (the full-OKLCh color pipeline — §2a in-shader interpolation + hue-path, §2b the derive-color variant), `docs/tranches/AW/waves/aurora-wave-seeds.md` W1 (OKLCh in-shader) + W2 (derive-color — this wave consolidates the two color seeds), and the SOTA digest (`docs/tranches/AW/audit/research/aurora-digest.md` Lanes 1/2/3/5 — Ottosson OKLab, the Aras cbrt-LMS optimization, the OKLab-vs-OKLCh-hue interpolation nuance, the harmony/temperature painting rules).

**Precepts in force.** No legacy / no back-compat — the linear-sRGB `samplePalette` `mix()` is REPLACED by the OKLCh interpolation, not flagged alongside it; `brokenColorJitter`'s YIQ-style sRGB `hueShift` matrix and `saturate3`'s sRGB saturation are MOVED into OKLCh, the old matrices deleted. The `deriveAurora` extension is a SUPERSET (the signature gains fields, removes none); the prior behavior is NOT a back-compat shim but the named `chromaEasing:"linear"` branch — the genuine "bell chroma becomes the new default" with the prior linear falloff reachable as `chromaEasing:"linear"`. Gestalt: splice the ALREADY-AUTHORED, 1e-6-verified `OKLCH_MATRICES_GLSL` chunk (`procedural-color.glsl.ts:73-134`) — zero new payload, the matrices already ship for the goo-blob — rather than authoring a parallel OKLCh transcription. DRY: the in-shader OKLCh path consumes the shared `procedural-color.glsl.ts` chunk (the single OKLCh/OETF source); the derive-color CPU path consumes value.js's Ottosson core (the same core that bakes the LUT). The render pipeline's linear/gamma plumbing (linear compose → ACES → OETF → IGN dither) is CORRECT and LOCKED — `tonemap.glsl.ts` is untouched; only the palette INTERPOLATION space changes. The Aras precompute-keys pattern aurora already follows (the CPU LUT bake) is preserved — interpolate perceptually BETWEEN the baked endpoints. value.js where befitting: the CPU `deriveAurora` extension routes through value.js's Ottosson OKLCh + its `interpolateHue`/`mixColorsN`/`HueInterpolationMethod`, no hand-rolled color math where value.js owns it. The NEGATIVE (record, do NOT push down): AW.W5.2's `deriveHue`/`deriveAurora`/`deriveScene`/`temperatureShift`/eased-L-C IS correctly glass-ui aurora-DOMAIN — value.js has NO harmony/derive/scheme/easing-ramp API (the whole `value.js/src/units/color/` tree was grepped), so there is nothing to consume there and a value.js harmony API would be SPECULATIVE single-consumer substrate. Keep it in `color.ts`; AW warrants no value.js-side code wave, only the publication discipline (the value.js peer-widen the orchestrator owns). The wispy-sky default palette is UNTOUCHED.

## 2a. Goal criterion

This wave succeeds if the aurora's color is interpolated, jittered, and saturated in perceptually-uniform OKLCh rather than linear-sRGB — killing the muddy-midtone grey on warm↔cool ramps — and a consumer can hand one seed color to `deriveAurora` and get a coherent, harmonious, painterly multi-stop palette. The reader's test: the OKLCh interpolation of a vivid blue→yellow pair holds chroma ABOVE the linear-`mix` midpoint (no desaturated grey crossing); a `huePath` atom lets an animated palette drift sweep the hue wheel without flipping at the 180° boundary; `deriveAurora(seed, {harmony:"split-complementary"})` and the new `tetradic`/eased-chroma/temperature-coupled variants produce in-gamut stops over a neon-seed matrix; `deriveScene(seed, mood)` returns a whole `AuroraConfig` (palette + nuclei layout + medium + motion) from one seed + a mood word. The locked linear→ACES→OETF→dither pipeline is untouched; the matrices ship zero new payload (already authored + goo-blob-proven). WebGL2-ships now.

## 3. Scope

1. **Splice `OKLCH_MATRICES_GLSL` into aurora (AW.W5.1).** Today aurora imports only `FBM_ROT_GLSL` + `OETF_GLSL` from the shared chunk (`aurora.frag.ts:29-32`). Add the `OKLCH_MATRICES_GLSL` import (the four Ottosson `mat3` literals + their space fns, `procedural-color.glsl.ts:73-134`) — already 1e-6-verified, goo-blob-proven, zero new payload.

2. **Rewrite `samplePalette` to interpolate in OKLCh (AW.W5.1).** Replace the linear-sRGB `mix()` (`composition.glsl.ts:9-17`) with OKLCh interpolation between the baked LUT endpoints — lerp L and C, interpolate H along the chosen arc. Keep the CPU bake for the LUT *endpoints*; interpolate perceptually *between* them (the Aras precompute pattern).

3. **The `huePath` atom (AW.W5.1).** Add a `huePath` uniform/atom so an animated palette drift never flips at the 180° boundary. The CONFIG field TYPE is `import type { HueInterpolationMethod } from "@mkbabb/value.js"` (`= "shorter" | "longer" | "increasing" | "decreasing"`, `value.js dispatch.ts:219`) — NOT a re-invented inline union. value.js OWNS color (the UNION color-ownership contract — the same reason the `OKLCH_MATRICES_GLSL` matrices are already locked to value.js's Ottosson constants), so glass-ui imports the type, it does not duplicate it. Re-export through `src/api/index.ts` as `AuroraHuePath` ONLY if a public alias name is wanted (an ALIAS of the value.js type, not a copy). The `aurora.frag.ts` uniform stays a GLSL-int; the TS config field + the `uniformBridge.ts` thread take the value.js type. Default `shorter`. The OKLab-vs-OKLCh nuance: interpolate *ramps* in OKLab (straight perceptual line, no hue detour through out-of-gamut); reserve the OKLCh hue-arc for deliberate rainbow travel.

4. **Move broken color + saturation into OKLCh (AW.W5.1).** `brokenColorJitter` (`aurora.frag.ts:276-282`) moves off the YIQ-style sRGB `hueShift` matrix to an OKLCh h/C jitter at fixed L (broken color is *hue* variation at constant value, which only OKLCh makes perceptually true — and this is the seam AW.W4's van-Gogh/oil-pastel per-stroke jitter consumes); `saturate3` (`:284`) moves into OKLCh. The old sRGB matrices are deleted.

5. **More harmonies (AW.W5.2).** Add `split-complementary` and `tetradic` to the `AuroraHarmony` union (`color.ts:110`) and the `deriveHue` switch (`:203`) — split-comp = anchor + 150/210; tetrad = anchor + 90/180/270.

6. **Eased L/C journeys + bell chroma default (AW.W5.2).** Replace the single linear chroma falloff (`color.ts:193`) with selectable `lightnessEasing` / `chromaEasing` (`linear` | `sine` | `bell` | bezier); a **bell** chroma curve (peak in the mids, desaturated extremes) becomes the new default (the prior linear falloff stays reachable as `chromaEasing:"linear"`).

7. **Temperature coupling (AW.W5.2).** Add `temperatureShift` (0..1): a warm-as-it-lightens / cool-as-it-darkens hue delta coupled onto every harmony — the painterly-congruence axis (the single most-cited painting rule; lights warmer, shadows cooler). This is what makes AW.W4's oil/oil-pastel modes read as *mixed paint* rather than stamped hue.

8. **`deriveScene(seed, mood)` (AW.W5.2).** A new front-door function: `atmospheric` | `painterly` | `vivid` | `muted` → a whole `AuroraConfig` (palette via `deriveAurora` + nuclei layout on a rule-of-thirds/golden prior + medium + motion preset), not just the palette. Keep the `gamutMapStop` guard verbatim (`:250`). All additive on `DeriveAuroraOptions`.

9. **The two born-RED gates** — `proof:aurora-oklch-interp` (extends the `proof:aurora-space-gamma`/`proof:single-color-core` seam) + `proof:aurora-derive-gamut` (extends the `color-equivalence` canary) (§6).

10. **DESIGN.md §color update + re-bake** the affected thumbnails (the warm↔cool-ramp presets gain chroma; the derive-color demos gain the new harmonies). Refresh `docs/tranches/F/audit/W5-aurora-profile.json` if the in-shader OKLCh path changes the ALU profile.

The palette-LUT-texture optimization (PATH-FORWARD §6 — bake the OKLCh-interpolated ramp into a 1D 256×1 texture so `samplePalette` is one `texture()` tap, not a loop) is DEFERRED with a trigger (see §10) — the in-shader OKLCh interpolation is the correctness headline; the LUT-texture is a perf lever that rides the same chunk.

## 3a. Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory — the orchestrator may NOT redispatch the failing unit alone — when:

- **The OKLCh in-shader interpolation breaks the budget.** The OKLab cbrt-LMS round-trip is more ALU than a linear `mix()`; aurora is already fill- and ALU-bound on mobile. If `profile:budget` reds after the `samplePalette` rewrite, the redress is the palette-LUT-texture optimization (PATH-FORWARD §6 — pre-bake the OKLCh ramp to a texture so the per-fragment interpolation becomes one tap) — a structural perf transposition, not a local tweak. Halt and triumvirate; do not ship a budget-busting `samplePalette`.
- **The OKLab-vs-OKLCh-hue interpolation choice produces a worse ramp.** The digest is explicit (Lane 2/3) that OKLCh-*hue* interpolation takes "unexpected detours" through out-of-gamut hues and darkens at the midpoint — ramps should interpolate in OKLab (rectangular), reserving the hue-arc for deliberate rainbow travel. If the `huePath:"shorter"` default visibly darkens a two-stop ramp midpoint (the very artifact OKLCh was meant to fix), the default interpolation space is wrong — the redress is OKLab-rectangular for ramps with the OKLCh hue-arc opt-in only on `huePath:"increasing"/"decreasing"`, a correctness decision about the interpolation space, not a local lerp tweak. Halt and triumvirate.
- **`gamutMapStop` fails to keep a neon-seed harmony in-gamut.** If a `tetradic` or temperature-coupled stop over a saturated neon seed cannot be mapped into sRGB by the existing `gamutMapStop` guard (the adaptive-L0 Ottosson clip), the redress is whether to tighten the chroma ceiling per-harmony or to widen the gamut-map strategy — a color-science decision about the derive contract, not a local clamp. Halt and triumvirate.
- **Any diagnostic loop reaches its third iteration** on the 1e-6 matrix-equivalence assertion (the spliced GLSL matrices drift from the value.js constants) — halt; the drift is a transcription bug in the splice, not a tolerance tweak.

File-bound expansion BEYOND the §4 table (the palette-LUT texture path in `glSetup.ts`/`uniformBridge.ts`, a runtime.ts change) invalidates the wave scope and triggers the triumvirate — that surface is the deferred LUT-texture fold.

## 4. File Bounds

| File | Access |
|---|---|
| `src/components/custom/aurora/constants/shaders/composition.glsl.ts` | modify (AW.W5.1 — `samplePalette` OKLCh interpolation) |
| `src/components/custom/aurora/constants/shaders/aurora.frag.ts` | modify (AW.W5.1 — the `OKLCH_MATRICES_GLSL` import + `brokenColorJitter` + `saturate3` into OKLCh + the `huePath` uniform) |
| `src/components/custom/aurora/composables/uniformBridge.ts` | modify (AW.W5.1 — thread `uHuePath`; the config field carries value.js's `HueInterpolationMethod`, mapped to the GLSL int) |
| `src/api/index.ts` | modify-OPTIONAL (AW.W5.1 — re-export the value.js `HueInterpolationMethod` as the alias `AuroraHuePath` ONLY if a public name is wanted; an alias, not a copy) |
| `src/components/custom/aurora/composables/color.ts` | modify (AW.W5.2 — harmonies, easing, temperature, `deriveScene`) |
| `src/components/custom/aurora/constants/presets.ts` | modify (AW.W5.2 — the `deriveScene` mood→config mapping, the new harmony defaults) |
| `src/components/custom/aurora/DESIGN.md` | modify (the color-pipeline notes — OKLCh interp, hue-path, derive-color) |
| `src/components/custom/aurora/__tests__/color-equivalence.test.ts` | modify (AW.W5.1 — the OKLCh-interp matrix + midpoint-chroma asserts) |
| `src/components/custom/aurora/__tests__/derive-color.test.ts` | create (AW.W5.2 — the harmony × easing × temperature × neon-seed gamut matrix) |
| `scripts/proof-aurora-oklch-interp.mjs` | create (AW.W5.1) |
| `scripts/proof-aurora-derive-gamut.mjs` | create (AW.W5.2) |
| `scripts/gates.mjs` | modify (register the two gates — append, one per arm) |
| `package.json` | modify (scripts only — the two gate entries) |
| `docs/tranches/F/audit/W5-aurora-profile.json` | regenerate (re-bake if the OKLCh path changes the profile) |
| `docs/tranches/AW/PROGRESS.md` | modify (record green runs + the re-bake) |
| the affected preset thumbnail PNG assets (warm↔cool ramps + derive-color demos) | regenerate |

Do NOT touch: `tonemap.glsl.ts` (the locked linear→ACES→OETF→dither pipeline — `proof:aurora-space-gamma` guards it) · `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` (the shared OKLCh/OETF chunk — READ-only / IMPORTED; this wave splices its matrices, it does not edit them — if a missing OKLCh fn is needed, that is a shared-chunk edit requiring the §3a triumvirate, NOT a silent local copy) · `flow.glsl.ts` / `brush.glsl.ts` / `mediums.glsl.ts` (the painterly shaders — AW.W4 owns them; this wave lands the OKLCh `brokenColorJitter` seam in `aurora.frag.ts`, which AW.W4 consumes) · `src/composables/color/index.ts` (the LUT-bake `oklchToLinear`/`flattenPalette` — correct and unchanged; the endpoints stay baked, only the BETWEEN-endpoint interpolation moves to OKLCh) · the wispy-sky `DEFAULT_AURORA_CONFIG` palette. **The palette-LUT-texture optimization is the deferred fold, NOT this wave.**

## 4a. Disjointness

The two agent units are FILE-DISJOINT and run in parallel:

- **AW.W5.1** (in-shader OKLCh) owns the GLSL surface: `composition.glsl.ts`, `aurora.frag.ts`, `uniformBridge.ts` (the `uHuePath` thread), `color-equivalence.test.ts`, `scripts/proof-aurora-oklch-interp.mjs`.
- **AW.W5.2** (derive-color) owns the CPU-TS surface: `color.ts`, `presets.ts` (the `deriveScene` mapping + harmony defaults), `derive-color.test.ts`, `scripts/proof-aurora-derive-gamut.mjs`.

No shared `modify` path between the two units EXCEPT `scripts/gates.mjs` + `package.json` (each appends ONE gate entry) and `DESIGN.md` (each adds its color note) — these are append-only, written at each unit's close, serialized by the orchestrator (no parallel append race; the orchestrator merges the two gate registrations + the two DESIGN notes). `presets.ts` is touched ONLY by .2 (the `deriveScene` config mapping); `aurora.frag.ts` is touched ONLY by .1. Net: two parallel lanes, the orchestrator owns the gates.mjs/package.json/DESIGN.md merge at close.

## 4b. Worktree Plan

Two parallel writers → two sibling worktrees off clean HEAD.

| Agent unit | Sibling worktree absolute path | notes |
|---|---|---|
| AW.W5.1 (in-shader OKLCh — GLSL) | `/Users/mkbabb/Programming/glass-ui-aw-w5-1` | owns the GLSL shaders + `uniformBridge.ts` + `color-equivalence.test.ts` + the oklch-interp gate |
| AW.W5.2 (derive-color — CPU TS) | `/Users/mkbabb/Programming/glass-ui-aw-w5-2` | owns `color.ts` + `presets.ts` + `derive-color.test.ts` + the derive-gamut gate |

No `CARGO_TARGET_DIR` (Node/Vite repo). Both branch off clean HEAD (file-disjoint). The orchestrator runs `git worktree add` for the two siblings, merges the two `gates.mjs`/`package.json`/`DESIGN.md` append-deltas at close, and owns the close integration.

## 5. Agent Units

### AW.W5.1 In-shader OKLCh interpolation + hue-path + broken-color/saturation into OKLCh

- **Goal**: the aurora palette is interpolated, jittered, and saturated in perceptually-uniform OKLCh — killing the muddy-midtone grey on warm↔cool ramps — with a `huePath` atom for deliberate rainbow sweeps, splicing the already-authored 1e-6-verified matrices for zero new payload.
- **Mechanism**:
  - **`aurora.frag.ts:29-32` — add the import.** Add `OKLCH_MATRICES_GLSL` to the existing `FBM_ROT_GLSL`/`OETF_GLSL` import from `procedural-color.glsl.ts`; splice it into the helper region (the four Ottosson `mat3` literals + `linearToOklab`/`oklabToLinear`/`oklabToOklch`/`oklchToOklab`, `procedural-color.glsl.ts:73-134`).
  - **`composition.glsl.ts:9-17` — rewrite `samplePalette`.** Replace the linear `mix(stopA, stopB, t)` with: convert the two baked-linear endpoints to OKLab, lerp L and a/b (OKLab-rectangular for ramps — the digest's "interpolate ramps in OKLab, no hue-detour darkening" finding), or to OKLCh + interpolate H along the `uHuePath` arc when the hue-arc is requested; convert back to linear. The endpoints stay CPU-baked (the Aras precompute); only the BETWEEN-interpolation moves to OKLCh.
  - **`aurora.frag.ts` — the `huePath` uniform.** Add `uHuePath` as a GLSL-int enum. The CPU-side TS type behind it is value.js's `HueInterpolationMethod` (`import type { HueInterpolationMethod } from "@mkbabb/value.js"` — NOT a hand-rolled glass-ui union); the config field + the `uniformBridge.ts` thread carry that type, and `uniformBridge.ts` maps it to the GLSL int. `samplePalette`'s hue-arc respects it; default `shorter`. The OKLab-rectangular path is used for `shorter`/default ramps; the OKLCh hue-arc for `increasing`/`decreasing` (deliberate rainbow travel). Re-export through `src/api/index.ts` as the alias `AuroraHuePath` only if a public name is wanted (an alias, not a copy).
  - **`aurora.frag.ts:276-282` — `brokenColorJitter` into OKLCh.** Replace the YIQ-style sRGB `hueShift` matrix with an OKLCh h/C jitter at fixed L (broken color = hue variation at constant value). Delete the old sRGB matrix. This is the seam AW.W4's per-stroke pigment jitter consumes.
  - **`aurora.frag.ts:284` — `saturate3` into OKLCh.** Replace the sRGB saturation with an OKLCh chroma scale at fixed L/H.
  - **`uniformBridge.ts`** — thread `uHuePath` from the config.
- **Files**: `composition.glsl.ts` (modify), `aurora.frag.ts` (modify), `uniformBridge.ts` (modify), `color-equivalence.test.ts` (modify — the OKLCh-interp + midpoint-chroma asserts), `scripts/proof-aurora-oklch-interp.mjs` (create), `gates.mjs` + `package.json` (register).
- **Sub-gate**: `proof:aurora-oklch-interp` GREEN + bite-verified — assert the spliced `OKLCH_MATRICES_GLSL` constants match the value.js Ottosson matrices to 1e-6 (extend the `proof:aurora-space-gamma` / `proof:single-color-core` seam); a hue-arc reference assertion: TS-port the GLSL `samplePalette` hue-arc and assert it matches value.js's `interpolateHue(h1, h2, t, method)` (`@mkbabb/value.js/dist/units/color/dispatch.d.ts:20` — `interpolateHue(h1, h2, t, method?)`) to 1e-6 for EACH of the four `HueInterpolationMethod` methods (`"shorter" | "longer" | "increasing" | "decreasing"` — `dispatch.d.ts:13`) over a vivid-pair matrix (the GLSL arc is locked to value.js's arc, the same way the matrices are); AND a midpoint-chroma assertion: the blue→yellow OKLab-rectangular midpoint holds chroma ABOVE the linear-`mix` midpoint (the muddy-midtone kill), with value.js's `mixColors(…, space:"oklab"/"oklch")` (`dispatch.d.ts:26`) as the CPU reference. **The hue-port gate fixture MUST seed the ANTIPODE and a warm→cool `"longer"` pair as named cases, not merely a sampled grid** — the radians-native transcription trap (thresholds expressed as `PI` not the `0.5`-turn half-arc, the wrap as `+TAU` not `fract()`) diverges by exactly 180° at the antipode and is invisible to a grid that steps over it. The two named fixture rows are: `(h0=30°, h1=210°, t=0.5, method="shorter")` — the antipode where the turns-domain `.5` branch must agree with `interpolateHue` to 1e-6; and `(h0=30°, h1=250°, t=0.5, method="longer")` — the warm(orange)→cool(blue) `"longer"`-arc pair whose midpoint must hold chroma above the linear-mix grey (a same-temperature pair won't exercise the muddy-midtone defect). Bite: revert `samplePalette` to the linear `mix()` → the midpoint-chroma assertion REDs; OR transcribe the in-shader hue arc with `PI`/`+TAU` radians thresholds instead of the turns-domain `0.5`/`fract()` → the antipode row REDs. `build` green (GLSL compiles).

  **value.js version note (corrected at convergence):** `interpolateHue` + `HueInterpolationMethod` SHIP in the INSTALLED value.js `0.10.0` (verified `node_modules/@mkbabb/value.js/dist/index.d.ts:15-16` re-exports both from `dispatch`). The peer in `package.json` is ALREADY `"^0.10.0 || ^0.11.0"` (line 617) — there is NO hard-dependency on a peer-widen for this gate; the prior "registry-green ONLY against 0.11.0" framing was stale and is RETIRED. Do NOT widen the peer further on the strength of an unverified future range; the gate is registry-green against the installed `0.10.0`.

### AW.W5.2 Derive-color: harmonies, easing, temperature, scene

- **Goal**: a consumer hands one seed color to `deriveAurora`/`deriveScene` and gets a coherent, harmonious, painterly multi-stop palette — split-complementary/tetradic harmonies, eased (bell-default) chroma journeys, warm/cool temperature coupling, and a whole-`AuroraConfig` `deriveScene(seed, mood)` front door — every stop in-gamut over a neon-seed matrix.
- **Mechanism** (all additive on `DeriveAuroraOptions`, the current behavior the default branch):
  - **`color.ts:110` + `:203` — more harmonies + route `deriveHue` through `interpolateHue`.** Add `split-complementary` and `tetradic` to the `AuroraHarmony` union + the `deriveHue` switch (split-comp = anchor + 150/210; tetrad = anchor + 90/180/270). Replace `deriveHue`'s hand-rolled degree wraps (`color.ts:202-224`) with value.js `interpolateHue` in the turns domain: **`h = interpolateHue(h0/360, h1/360, t, method) * 360` — MANDATORY `/360` in, `*360` out** (value.js takes NORMALIZED TURNS `[0,1]`, not degrees — passing degrees silently misbehaves because the `.5` short-arc threshold is a half-TURN). The harmony→method mapping is FIXED and verified against the value.js enum (`"shorter" | "longer" | "increasing" | "decreasing"`): **`complementary` uses `method="longer"`** to keep the long arc saturated (NOT `"shorter"`, which cuts through grey on a warm→cool pair — the muddy-midtone defect this wave exists to kill); `analogous` uses `"shorter"`; `triad`/`tetradic` use `"increasing"`. The temperature/harmony/derive LOGIC stays aurora-DOMAIN in `color.ts` (value.js owns the hue-arc primitive, not the harmony scheme — a value.js harmony API would be speculative single-consumer substrate; see §Precepts).
  - **`color.ts:193` — eased L/C + bell chroma default.** Replace the single linear chroma falloff with selectable `lightnessEasing`/`chromaEasing` (`linear` | `sine` | `bell` | bezier); the **bell** chroma curve (peak in mids, desaturated extremes) is the new default (the prior linear falloff reachable as `chromaEasing:"linear"`).
  - **`color.ts` — `temperatureShift` (0..1).** A warm-as-it-lightens / cool-as-it-darkens hue delta coupled onto every harmony (lights warmer, shadows cooler — the painterly-congruence axis).
  - **`color.ts` / `presets.ts` — `deriveScene(seed, mood)`.** `atmospheric` | `painterly` | `vivid` | `muted` → a whole `AuroraConfig` (palette via `deriveAurora` + nuclei layout on a rule-of-thirds/golden prior + medium + motion preset). Keep the `gamutMapStop` guard verbatim (`color.ts:250`).
- **Files**: `color.ts` (modify), `presets.ts` (modify — the `deriveScene` mapping + harmony defaults), `derive-color.test.ts` (create), `scripts/proof-aurora-derive-gamut.mjs` (create), `gates.mjs` + `package.json` (register).
- **Sub-gate**: `proof:aurora-derive-gamut` GREEN + bite-verified — assert every stop of every (harmony × easing × temperature) combination over a neon-seed matrix is in-sRGB after `gamutMapStop` (extend the `color-equivalence` canary). Bite: remove the `gamutMapStop` guard from a derive branch → an out-of-gamut neon stop REDs. `derive-color.test.ts` green under `vitest run`. Pure-TS, WebGL2-ships now.

## 6. Hard Gate

W5 closes when every condition below is evidence-backed:

1. **AW.W5.1** — `aurora.frag.ts` imports `OKLCH_MATRICES_GLSL`; `samplePalette` interpolates in OKLCh/OKLab (not the linear `mix()`); `brokenColorJitter` + `saturate3` are in OKLCh (the old sRGB matrices deleted); the `huePath` atom is threaded, its CONFIG field typed as value.js's `HueInterpolationMethod` (imported, NOT a re-invented glass-ui union; aliased through `/api` as `AuroraHuePath` only if a public name is wanted). `proof:aurora-oklch-interp` GREEN + bite-verified (matrices 1e-6 + the hue-arc matches value.js's `interpolateHue` to 1e-6 for each of the four methods, with the ANTIPODE row `(30°,210°,t=0.5,"shorter")` and the warm→cool `(30°,250°,t=0.5,"longer")` row SEEDED AS NAMED FIXTURE CASES + the blue→yellow midpoint holds chroma above the linear midpoint; reverting `samplePalette` → RED; a radians-native `PI`/`+TAU` hue port → the antipode row REDs). The CONFIG-field type binds the installed value.js `0.10.0` `HueInterpolationMethod` (no peer-widen). The OKLab-vs-OKLCh-hue interpolation choice is recorded (OKLab-rectangular ramps default, OKLCh hue-arc on `increasing`/`decreasing`).
2. **AW.W5.2** — `split-complementary` + `tetradic` on the `AuroraHarmony` union + `deriveHue`; `lightnessEasing`/`chromaEasing` with the bell-chroma default; `temperatureShift`; `deriveScene(seed, mood)`. `proof:aurora-derive-gamut` GREEN + bite-verified (every harmony × easing × temperature stop in-gamut over the neon matrix; removing `gamutMapStop` → RED). `deriveAurora`'s shipped signature is a SUPERSET (it gains fields, removes none) — the prior behavior is the named `chromaEasing:"linear"` branch, not a compat alias.
3. **The tonemap pipeline is UNTOUCHED** — `tonemap.glsl.ts` byte-unchanged; `proof:aurora-space-gamma` GREEN (the linear→ACES→OETF→dither pipeline intact; only the palette interpolation space changed).
4. **The shared color chunk is UNTOUCHED** — `procedural-color.glsl.ts` byte-unchanged (the matrices are IMPORTED, not edited); `proof:single-color-core` + `proof:blob-color-equivalence` GREEN. **Coverage note:** `proof:single-color-core` guards the 11 value.js TS matrix/space primitives via a TS-regex; it does NOT see the NEW in-shader turns-domain `interpolateHue` transcription (a GLSL string, not a guarded TS matrix). The dedicated 1e-6 hue-port equivalence gate inside `proof:aurora-oklch-interp` is therefore the ONLY guard on the hue port and is LOAD-BEARING — it cannot be skipped or folded into single-color-core. The midpoint-chroma assertion measures chroma at `t=0.5` SPECIFICALLY (the muddy-midtone defect is a midpoint artifact) over a genuine warm→cool pair (OKLCh hue ~30°→~250°), not a same-temperature pair (which would not exercise the grey-crossing).
5. **The wispy-sky default is UNCHANGED** — `DEFAULT_AURORA_CONFIG` palette byte-unchanged; the smooth/atmospheric default renders identically (richer interpolation, same endpoints).
6. **The LUT-texture optimization is NOT in this wave** — recorded as the deferred-with-trigger fold (§10); no `glSetup.ts`/texture-upload change here.
7. **No regression.** The existing gate matrix stays GREEN: `proof:aurora-space-gamma`, `proof:single-color-core`, `proof:blob-color-equivalence`, `proof:color-acyclic`, `proof:webgl-substrate-single`, `npm run typecheck`, `npm run build`, the aurora + blob unit suites. `PROGRESS.md` records green run ids + the re-bake.

**Born-RED gate registration (manifest==ci invariant):**

| gate | script | tags | bite-check |
|---|---|---|---|
| `proof:aurora-oklch-interp` | `scripts/proof-aurora-oklch-interp.mjs` | `["local","ci"]` | revert `samplePalette` to linear `mix()` → the midpoint-chroma assertion REDs |
| `proof:aurora-derive-gamut` | `scripts/proof-aurora-derive-gamut.mjs` | `["local","ci"]` | remove `gamutMapStop` from a derive branch → an out-of-gamut neon stop REDs |

Each follows the house gate template (`scripts/proof-aurora-space-gamma.mjs`): a pure read-and-detect / vitest-driven matrix over the shader text + the TS color path, a byte-stable JSON artefact via `scripts/gate-output.mjs`, a human summary, `process.exit(1)` on violation. Register in `package.json` + `gates.mjs` ONLY after each arm lands (`gates:verify-ci` enforces manifest==ci).

## 7. Format And Lint Cadence

- `npm run typecheck` (`vue-tsc --noEmit`) — after each arm and at close.
- `npm run build` — after AW.W5.1 (the OKLCh GLSL compiles) and at close.
- `proof:aurora-oklch-interp` + `proof:aurora-derive-gamut` + the no-regression existing-gate matrix — after each arm lands and at close.
- `vitest run src/components/custom/aurora/__tests__/color-equivalence.test.ts` (after .1) + `…/derive-color.test.ts` (after .2).
- `npm run profile:aurora` — once at close if the OKLCh `samplePalette` changes the ALU profile (regenerate `W5-aurora-profile.json`); otherwise record "unchanged".
- `git diff --check` on `DESIGN.md` + `PROGRESS.md` at close.

No formatter is intentionally skipped; the two gates + the 1e-6 matrix equivalence + the midpoint-chroma + the neon-gamut matrix are the binding evidence.

## 8. Verification Artefacts

- The two `proof:aurora-*` JSON gate artefacts (byte-stable) — born-RED (pre-fold) AND green (post-fold) for each.
- The `color-equivalence.test.ts` run (the OKLCh matrix 1e-6 + the blue→yellow midpoint-chroma assertion) + `derive-color.test.ts` run (the harmony × easing × temperature × neon-seed gamut matrix), both green.
- The re-baked `docs/tranches/F/audit/W5-aurora-profile.json` (or the "unchanged" record).
- The refreshed warm↔cool-ramp + derive-color preset thumbnails.
- DESIGN.md the color-pipeline notes (OKLCh interp space choice, hue-path, derive-color harmonies/easing/temperature/scene).
- Browser-verify notes (the warm↔cool midpoint no longer greys; a `huePath` drift sweeps without 180° flip; `deriveScene` returns a coherent backdrop) + the green CI run ids + integration commit hashes — `docs/tranches/AW/PROGRESS.md`.

## 9. Commit Plan

- **AW.W5.1 (in-shader OKLCh) commits**:
  - `feat(tranche-AW): W5 — aurora in-shader OKLCh palette interpolation (splice OKLCH_MATRICES_GLSL) + huePath atom + born-RED proof:aurora-oklch-interp` (body: the muddy-midtone kill, the OKLab-rectangular-ramps / OKLCh-hue-arc choice, zero new payload, the brokenColorJitter/saturate3 move into OKLCh, the AW.W4 jitter-seam handoff).
- **AW.W5.2 (derive-color) commits**:
  - `feat(tranche-AW): W5 — aurora deriveAurora harmonies+easing+temperature + deriveScene front door + born-RED proof:aurora-derive-gamut` (body: split-comp/tetradic, bell-chroma default, warm-light/cool-shadow temperature, the seed+mood→AuroraConfig door, the neon-gamut matrix).
- **Orchestrator integration + docs commit** — `docs(tranche-AW): W5 close — DESIGN.md color pipeline + PROGRESS green run ids + re-bake` (body: status/close; the merged gates.mjs/package.json registrations).

## 10. Dependencies

- **Depends on**: HEAD only — NO peer-widen dependency (corrected at convergence). `proof:aurora-oklch-interp`'s hue-arc reference consumes value.js's `interpolateHue`/`HueInterpolationMethod`, which SHIP in the installed `0.10.0` (`dist/index.d.ts:15-16`) and are admitted by the existing `"^0.10.0 || ^0.11.0"` peer (`package.json:617`) — the gate is registry-green against the installed version with no separate peer-conformance precondition. The AV.W2 shared-color chunk (`procedural-color.glsl.ts` — the `OKLCH_MATRICES_GLSL` is authored, 1e-6-verified, goo-blob-proven) is the read-only seam this wave splices. The AV.W1 OETF fix is landed (the linear pipeline is correct; the OKLCh interpolation lands in that correct linear space, output through the locked OETF).
- **Blocks**: **AW.W4** (painterly) — the van-Gogh per-stroke pigment jitter and the oil-pastel broken color consume the OKLCh `brokenColorJitter` seam this wave lands; W5 SHOULD precede W4's integration. **AW.W7** (WebGPU) — the WGSL OKLCh twin (the `procedural-color` WGSL chunk gated by a CPU-equivalence test) consumes the OKLCh interpolation contract this wave establishes (the in-shader OKLCh path is the GLSL reference the WGSL twin must match to 1e-6).

**Deferred against this wave (with trigger):** the palette-LUT-texture optimization (PATH-FORWARD §6 — bake the OKLCh-interpolated ramp into a 1D 256×1 texture so `samplePalette` is one `texture()` tap, not a per-fragment loop; banding stays closed by the IGN dither). DEFER — the in-shader OKLCh interpolation is the correctness headline; the LUT-texture is a perf lever. Trigger: `profile:budget` reds after the OKLCh `samplePalette` rewrite (the §3a budget triumvirate redress), OR a profiling pass identifies `samplePalette` as the hot path on mobile.

## 11. Archaeology

Not a re-attempt of a prior failed wave. The OKLCh color gap is named precisely in PATH-FORWARD §0 gap 2 + §2: the palette is baked to linear CPU-side (`color.ts:42`) and `samplePalette` mixes the stops with a plain linear `mix()` (`composition.glsl.ts:16`) — so distant-hue gradient midpoints desaturate toward grey (the classic muddy-midtone artifact); `brokenColorJitter` (`aurora.frag.ts:276`) jitters via a YIQ-style sRGB rotation matrix, not OKLCh; so does `saturate3` (`:284`). The `OKLCH_MATRICES_GLSL` chunk is *already authored and 1e-6-verified* (`procedural-color.glsl.ts:73-134`) from the AV.W2 shared-color convergence + the AU.W7 goo-blob OKLCh work — aurora simply does not splice it. This is the single highest-leverage low-cost color win: the matrices ship zero new payload, already goo-blob-proven. The technique is canonical (Ottosson, *A perceptual color space for image processing*, `bottosson.github.io/posts/oklab/`; Aras Pranckevičius, *Optimizing Oklab gradients* — the precompute-keys/cbrt-LMS pattern aurora's CPU LUT bake already follows; Tailwind #14955 switched OKLCH→OKLab for gradient interpolation for exactly the hue-detour-darkening reason — the OKLab-rectangular-ramps / OKLCh-hue-arc-for-rainbow-only distinction the §3a triumvirate guards). The derive-color extension is grounded in adaptive harmony + muddy-zone avoidance (meodai/pro-color-harmonies), eased L/C journeys + bell chroma (Adobe Leonardo / OKLCh ramp tooling), and warm-light/cool-shadow temperature (Baudisch; Gamblin — the single most-cited painting rule, the fold that makes AW.W4's oil/oil-pastel read as mixed paint, not stamped hue). All accessed 2026-06-06. The render pipeline's linear/gamma plumbing was made correct at AV.W1 and is LOCKED — this wave changes only the interpolation SPACE, never the transfer.
