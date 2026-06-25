# BD.W-AUR-PRISM — the prismatic-burst aurora medium (`uMedium==9`, the spectral radial bursts)

**Band 6 (aurora) · depends: W-AUR-SATIN (slot-8 anchor) · W-GATE-TRUTH-AUDIT (the numeric parity net — Band 0) · sequences AFTER satin on the monotonic ladder (`EXECUTION-DAG.md:68`).** PRISM slots `uMedium==9` (monotonic above satin==8); W-AUR-METAL (10/11) extends after it. The `satisfies Record<AuroraMedium,number>` total-map forces the coordination — PRISM requires SATIN's slot-8 to be landed (else its `prism==9` premise is phantom). Its parity gate COMPOSES `scripts/lib/shader-eval-harness.mjs` (a real oracle↔shader ΔE with coefficient-flip bites), NOT a name-presence regex.

> **Status:** SPEC (tranche-dev — this file is the PLAN; the `src/` edit is the gated build). Grounded against HEAD `mediums.glsl.ts:20-27` (`sampleBase`/`nucleiField` the burst centers tap), `aurora-mediums.wgsl.ts:300-312` (the WGSL `applyMedium` dispatch), `procedural-color.glsl.ts`/`procedural-color.wgsl.ts` (the shared OKLCh ramp the spectral split reads), `uniformBridge.ts:42-56` (`MEDIUM_ID`), `uniformBridgeWGPU.ts:24-26` (the scalar lanes).

## The defect / the ask

The BD aurora band wants a **prism** medium — prismatic radial bursts: a spectral light-refraction effect where the field's brightest centers throw chromatic radial bursts (like light through a prism / the diffraction spikes of a star — a hue-rotated radial spread around the nuclei field's peaks). It is the third medium of the post-kuwahara ladder, the most CHROMATIC of the cluster (satin is light-bending warm-white, metal is achromatic crest, prism is the SPECTRAL spread).

The cardinal constraint (the kuwahara precedent's RIGHT half): **PRISM is OPT-IN, the default byte-identical.** A `medium:"prism"` config is reached ONLY by explicit selection; the smooth default + the van-Gogh HERO + every shipped medium render byte-unchanged. PRISM adds a new dispatch ARM, never touches an existing one — every `proof:aurora-*` gate + the W-AURORA-WGSL parity surface stay GREEN by construction.

## The mechanism

ONE new medium body, present on BOTH backends in lockstep (FULL port — the spectral-burst math is cheap single-pass arithmetic + the SHARED OKLCh ramp, fully transpilable; NO silent Safari kuwahara-degrade). The prism look = a radial chromatic burst keyed off the field's own luma peaks, the hue-rotation drawn from the SHARED procedural-color OKLCh seam (ONE color source — never a second hue-rotation math).

### 1. The burst geometry — radial spectral spread off the field's luma peaks

`mediumPrism(col, p, t)` builds a radial burst keyed on the FIELD's brightness (the prism throws bursts where light concentrates):

- **The burst mask:** the field's own luma `L = dot(col, W_LUMA)` thresholded high (`smoothstep(PRISM_PEAK_LO, PRISM_PEAK_HI, L)` — bursts only from the bright centers, the prism's "light through the gap"). NO new nuclei-position uniform read — the burst centers are the EXISTING bright zones of the rendered field (the `sampleBase`/`nucleiField` peaks), so the bursts track the field's own structure without a new uniform lane.
- **The radial angle:** `ang = atan(p.y - center.y, p.x - center.x)` where the per-fragment "center" is derived from the local luma-gradient direction (the 2-tap central difference, the SAME taps the satin/metal path uses — re-tapped, not a new Sobel). The burst SPIKES are an angular sinusoid: `spike = pow(0.5 + 0.5 * cos(ang * PRISM_SPIKE_COUNT + t * PRISM_DRIFT), PRISM_SPIKE_SHARP)` — `PRISM_SPIKE_COUNT` (default 6) sets the prism-spike count, `PRISM_DRIFT` slowly rotates the spread, `PRISM_SPIKE_SHARP` sets the spike narrowness.
- **The radial falloff:** `radial = exp(-r * r / (PRISM_RADIUS * PRISM_RADIUS))` so the burst fades outward from each peak — a localized spectral spread, not a full-field wash.

### 2. The spectral hue-rotation — the SHARED OKLCh ramp, ONE color source

The CHROMATIC half is a per-channel radial hue-shift: the prism splits white light into a spectrum along the radial axis. PRISM reads the SHARED `procedural-color` OKLCh seam (`procedural-color.glsl.ts` / `.wgsl.ts` — the AV.W2 shared chunk both backends splice; ONE color math). The spectral split:

```
float hueShift = (r * PRISM_DISPERSION + ang / 6.2831) * spike * radial;
vec3 spectral = oklchHueRotate(col, hueShift * mask);   // the SHARED OKLCh rotate
col = mix(col, spectral, mask * radial * uStrokeAmount);
```

- `oklchHueRotate` is the SHARED OKLCh chunk's hue-rotation primitive (NOT a per-channel sRGB `rgb.gbr` cheap-rotate — that is the wrong color space and would shift luminance; the prism reads the OKLCh seam the whole aurora color system speaks, the `proof:single-color-core` discipline). If the shared chunk does not yet export a `hueRotate`, it is ADDED to `procedural-color.{glsl,wgsl}.ts` (the ONE home) and both backends splice it — never an aurora-local hue-rotation fork.
- The `PRISM_DISPERSION` knob (the chromatic-aberration strength) controls how far the spectrum spreads — bounded so the bursts stay a refined spectral whisper over the warm-cream identity, never a rainbow neon (the §6 calm register — the prism is a light effect, not a disco).

### 3. The dispatch — both backends, lockstep

- **GLSL** (`mediums.glsl.ts` POST_BRUSH block + `aurora.frag.ts`): append `mediumPrism()` + `else if (uMedium == 9) col = mediumPrism(col, pN, t);`.
- **WGSL** (`aurora-mediums.wgsl.ts:300`): append `fn mediumPrism(...)` + an `if (medium == 9) { return mediumPrism(col, p, t); }` arm to `applyMedium` — PRISM renders FULLY on WebGPU (the radial-burst + OKLCh-rotate math is transpilable; it does NOT join the oil/vangogh kuwahara-degrade cohort). Its parity ΔE is a REAL lockstep number.
- **Bridges:** `MEDIUM_ID.prism = 9` (`uniformBridge.ts:42-56`); the `AuroraMedium` union gains `"prism"`; the `satisfies Record<AuroraMedium,number>` forces the slot. NO new uniform lane (PRISM reads `uStrokeAmount`/`uStrokeScale` for intensity; the spike/dispersion/radius are shader constants — a future `uPrismDispersion` authoring knob is a BOOKED successor IFF a 2nd consumer needs to tune it, not built here).

### 4. ONE generalized demo preset (NOT album/iOS-27/burst-app)

A single `AURORA_PRISM_PRESET` in `presets.ts` — a generic "Prism" register, NO app name, NO `album`/`iOS-27`/`station-burst`/`now-playing` identifier (the D7 fence; the metallic-aurora §8 names the phantom "burst" sibling — PRISM is the HONEST generalized member, named without an app). The demo `substrates/aurora.vue` adds "Prism" to its medium selector. The ≥2-consumer bar is met by the medium being a first-class `<Aurora medium="prism">` register (any backdrop consumer reaches it); the demo exerciser is the second site — NOT a contrived consumer.

### 5. The medium-vs-finish classification (recorded)

PRISM is a genuine **medium** (the field rendered AS a prismatic/refractive material — a substance, like oil/satin), NOT a post-FILTER (kuwahara). It files under `medium`. The `medium`/`finish` split axis is W-AUR-METAL's (the wave that adds the 2nd post-filter member and mints the axis); PRISM records its `medium` class and defers the split.

## The gate — proof:aur-prism (born-RED → GREEN) + the COMPOSED numeric parity

`scripts/proof-aur-prism.mjs`, `tags: ["local","ci"]`. The parity clauses COMPOSE `shader-eval-harness.mjs` (the anti-false-green requirement — NO `.test(/mediumPrism/)` name-presence as the parity proof).

- **P1 — the medium exists on BOTH backends + slots 9.** `MEDIUM_ID.prism === 9` (off `uniformBridge.ts`), the `AuroraMedium` union carries `"prism"`, `mediumPrism` is DEFINED in BOTH `mediums.glsl.ts` AND the SPLICED `aurora-mediums.wgsl.ts` (via `resolveSplices(aurora.wgsl.ts)` — splice-following), AND `applyMedium`'s WGSL dispatch carries an `if (medium == 9)` arm. A missing WGSL body / dispatch arm REDs (the NO-silent-degrade assert).
- **P2 — the NUMERIC parity ΔE (the real lockstep number).** Via `shader-eval-harness`: `sampleOracle` over a JS twin (`prismBurst.ts` — the burst mask + spike + radial + the OKLCh hue-rotate, the SAME math), `sampleShader` over the transpiled GLSL `mediumPrism` AND the spliced WGSL `mediumPrism` at the SAME lattice, `fieldDeltaE` → `≤ PER_VIZ_BARS.prism` (the recorded tight bar in `parity-bars.md`). The COLOR-arm ΔE is the OKLab `mean`/`p99` (the harness's color path — the spectral split is the prism's WHOLE point, so the parity must measure the CHROMATIC delta, not just luminance). GLSL twin ↔ WGSL twin ↔ oracle all within bar.
- **P3 — the OKLCh seam, ONE color source (no fork).** The `mediumPrism` body's hue-rotation resolves to the SHARED `procedural-color` `oklchHueRotate` (the gate scans the prism body + the shared chunk: the hue-rotate primitive lives in `procedural-color.{glsl,wgsl}.ts`, NOT inline in the prism body; an aurora-local `rgb.gbr` cheap-rotate or a second OKLCh math REDs — the `proof:single-color-core` discipline extended).
- **P4 — the default byte-identical fence.** A `medium:"smooth"` (and every NON-prism medium) config's assembled shader is byte-identical to the pre-wave tree EXCEPT the appended `mediumPrism` body + the single dispatch arm (additive structural diff). `warpModeFor`/the atom fan-out never auto-selects prism.
- **P5 — the calm-register + warm-cream fences.** The `PRISM_DISPERSION`/burst intensity is bounded (the gate asserts the recorded bound is `≤ PRISM_DISPERSION_MAX` — a refined spectral whisper, not a neon rainbow; a dispersion above the bound REDs the calm-register fence). No album/iOS-27 token in the preset identifier (the D7 raw-string scan). PRISM records `medium`-class in the taxonomy note.

**Self-test bites (each planted defect MUST red, harness coefficient-flip discipline):** (a) the OKLCh `oklchHueRotate` swapped for an inline sRGB `col.gbr` cheap-rotate → the COLOR ΔE (the OKLab path catches the luminance shift) > bar → P2/P3 RED (the wrong-color-space bite); (b) `PRISM_SPIKE_COUNT 6 → 12` (a wrong spike count) → the burst-distribution ΔE > bar → P2 RED (the coefficient-flip); (c) the WGSL `applyMedium` arm routes `medium==9` into `mediumKuwahara` → the WGSL ΔE diverges → P1/P2 RED (the silent-degrade bite); (d) `PRISM_DISPERSION` raised above `PRISM_DISPERSION_MAX` → P5 RED (the neon-rainbow bite); (e) a faithful re-transcription → ΔE ≈ 0, all GREEN (identical control); (f) a sub-threshold drift (`PRISM_DRIFT 0.1 → 0.0999`) → PASS (the bar is not a hair-trigger).

**What reds on the pre-wave tree:** P1 (no `mediumPrism`, `MEDIUM_ID` stops at 8 after satin), P2/P3/P5 (no body to evaluate) — born-RED by construction; GREEN only after the GLSL+WGSL bodies + the dispatch arms + the bridge slot + the JS twin + the shared `oklchHueRotate` + the parity bar land.

## The binding "π" — the prismatic BURSTS read as spectral light, both backends, both modes

`tests-visual/aur-prism.spec.ts` (LOCAL-only real-GPU, rides W-REFLECT3). The binding gestalt: a `<Aurora medium="prism">` surface reads as **prismatic spectral bursts** — chromatic radial spreads throwing off the field's bright centers, like light refracted through a prism (a hue-rotated radial spike pattern, distinct from satin's warm-white sheen AND from the smooth default's flat field). The π asserts: (1) the bursts are present (a measurable radial spike pattern around the field's luma peaks vs the smooth-default ground); (2) the spread is CHROMATIC (a measurable hue VARIATION along the radial axis — the spectral split, getComputedStyle/canvas-sample OKLab hue spread > the smooth field's; the prism's defining property, NOT just a luminance burst); (3) the bursts are LOCALIZED to peaks (the flat zones carry no burst — the P-mask confirmation); (4) the calm register (the spread is a refined whisper, not a saturated neon — the chroma stays bounded); (5) both modes; (6) the WGSL and GLSL captures agree (the real-Metal spectral lockstep). The `proof:ba-gestalt` aurora verdict gains a prism row.

## Fences

- **OPT-IN, default byte-identical.** PRISM is reached ONLY by `medium:"prism"`; the atom fan-out never auto-selects it; every existing medium byte-unchanged (P4).
- **FULL lockstep, NO silent Safari degrade.** PRISM ports FULLY to WGSL (transpilable burst + OKLCh-rotate math); a REAL lockstep ΔE (P2), never the oil/vangogh degrade cohort.
- **ONE OKLCh color source.** The hue-rotation lives in the SHARED `procedural-color` chunk, both backends splice it (P3); an aurora-local hue-rotation fork or a cheap sRGB rotate REDs (`proof:single-color-core`).
- **The calm register holds.** The spectral spread is a bounded refined whisper, not a neon rainbow (P5 — the §6 calm doctrine; the disco family stays gone).
- **The warm-cream identity holds.** The default field is unchanged; the spectral burst is an OPT-IN light effect over it; presets-in-consumers (a colored-prism preset lives in a consumer).
- **medium-class, the split deferred.** PRISM records `medium`; the `medium`/`finish` split axis is W-AUR-METAL's.
- **The gate COMPOSES the numeric net.** P2/P3 import `shader-eval-harness.mjs`; a `.test(/mediumPrism/)` name-presence as the parity proof is FORBIDDEN (the false-green this tranche kills).

## Disposition links

- **`UNIFIED-ROSTER.md:78` (W-AUR-PRISM — `uMedium==9`, the prismatic radial bursts)** → BUILT (the spec; the build user-gated).
- **`EXECUTION-DAG.md:68` (W-AUR-PRISM, the prismatic radial bursts — extends the ladder monotonically after satin)** → CLOSED.
- **`critique/metallic-aurora.md §8` (the phantom "burst" sibling)** → PRISM is the HONEST generalized burst medium, named without an app, slotting 9 at HEAD (no phantom). CLOSED.
- **DEPENDS: `W-AUR-SATIN` (slot-8 anchor)** — PRISM's `prism==9` premise requires satin landed; **`W-GATE-TRUTH-AUDIT`** (the `shader-eval-harness.mjs` numeric net + the SHARED `oklchHueRotate` parity). The Band-0 + intra-band prerequisite edges.
- **PREREQUISITE FOR: `W-AUR-METAL` (10/11)** — the monotonic ladder; PRISM's slot-9 is the anchor metal slots above.
