# `@mkbabb/glass-ui/aurora` — research-backed README

Aurora is glass-ui's painterly procedural-gradient backdrop: one full-screen fragment program that paints a
living, soft-edged color field — atmospheric wispy-sky washes (the OpenAI/DALL-E/Sora hero register,
Frankenthaler soak-stain) through visible oil-impasto, oil-pastel, watercolor, and van-Gogh brushwork. No
images, no video, no external libraries; every frame is generated from a handful of authored color zones and
a warped noise field, resolved through OKLCh-perceptual color over glass-ui's warm-cream-glass identity.

This is the research-grounded reference, sourced from the 32-facet aurora corpus
(`docs/tranches/AX/research/aurora-research-corpus.json`) and synthesis (`aurora-synthesis.md`). Facet
citations are inline as `[facet N]`. It is the AX-tranche path-forward view (post W07/W10–W14); the in-tree
`src/components/custom/aurora/README.md` is the shipped consumer guide, swept planned→landed by W11.

```ts
import { Aurora, useAurora } from "@mkbabb/glass-ui/aurora";
```

---

## 1. What this is — the fidelity bar

Aurora is **not a mesh gradient.** The Stripe / OpenAI / Linear "ethereal glow" backdrops are layered noise +
a UV warp over a few color points; aurora's multi-nuclei softmax field + Quilez double domain-warp +
OKLCh-authored palette + tonemap already exceeds that substrate on richness, and the painterly mediums take
it somewhere no mesh-gradient tool ships — visible, hand-painted brushwork [facet 15/16].

The fidelity bar, stated plainly: a **stunning gradient-art backdrop** in the register of a golden-hour
landscape/skyscape photograph and "OpenAI's gradient, and better" — arresting where arrest is wanted,
receding where it competes with content. Two laws govern that:

- **Color discipline is load-bearing** [facet 0/14]. Low chroma, a narrow hue arc, never-pure-black/white
  floors, within-region value variation (no flat fills), warm-light/cool-shadow temperature coupling,
  bell-curve chroma (saturated body, calm edges). Restraint in color is as load-bearing as restraint in
  motion. A real skyscape is a coupled lighter+desaturated+cooler-toward-distance ramp (aerial perspective),
  not a hue-rotated swatch [facet 3/14].
- **Motion discipline is load-bearing** [facet 31]. Breath-paced drift (40–60s cycle, warpDrift 0.005–0.010),
  ease-in-out, seamless loop, the single-loud-element budget. The calm-technology periphery test: *if your
  eyes are drawn to the motion, it is already too much.* The wispy-sky DEFAULT is sub-threshold by
  construction and is the brand's honest face — it renders identically on WebGL2 and WebGPU.

Aurora is the WebGL sibling of [`GooBlob`](../../../components/custom/goo-blob/): both compose the shared
`useWebGLCanvas` substrate and resolve color through the shared `procedural-color.glsl` chunk. The blob is
the bounded metaball creature; aurora is the full-bleed field.

---

## 2. Use cases

- **Hero backdrop** — full register, full-viewport, deliberate arrest (the OpenAI-gradient register).
- **Content-over-aurora** — receded via opacity + saturation/value clamp; a text-legibility contract.
- **Per-mood / per-medium presets** — atmospheric wispy-sky → gestural van-Gogh oil → wet watercolor →
  oil-pastel. Presets live in the consumer (`demo/stories/aurora/presets.ts`); the library ships its own
  defaults as identity, not a preset library.
- **Seed-driven generative variety** — one seed → a whole in-family scene (palette AND composition) via the
  shared seeded PRNG [facet 27].
- **Warm low-intensity page-backdrop** — a barely-there wash behind a marketing or docs route.

The 12 demo presets span the registers: `Sky` / `Dawn` (smooth), `Meadow` / `Day 9` (watercolor),
`Deliberative` (pastel), `Oil Impasto` / `Oil Gestural` / `Oil Swirl` (oil), `Pastel Sunset/Rainbow/Ocean`,
`Speedtest` (smooth, 6-nuclei). They live in the consumer and are re-baselined whenever the library tonemap
or palette identity evolves (presets-in-consumers).

---

## 3. The atom model — ≤7 intuitive knobs

The consumer-facing door is **`resolveAtoms`**, not the ~28-field author schema. It is the corpus's exact
decomposition [facet 26] and it is governed by Disney's "Principled" 5-rule discipline (Burley 2012): (1)
intuitive not physical parameters, (2) as few as possible, (3) each normalized 0..1 over its plausible range,
(4) allow push beyond [0,1] where meaningful, (5) **every combination must be robust and plausible** — no
setting produces garbage [facet 26].

The atoms — re-derived around the user's named control elements (zones / noise / color):

| Atom | Drives |
|---|---|
| **seed** | palette AND a stable composition (positions, drift phases, value bias) — one source, whole scene |
| **color** | seed + harmony + a color-energy / saturation knob (the named COLOR element) |
| **zones** | count + an *arrangement character* (scattered / composed / centred → thirds/golden/radial priors), NOT a bare integer |
| **noise** | one organic-boundary knob fanning to `warpAmount` / `warpScale` / `warpMode` (the named NOISE element) |
| **medium** | the operator family (§4) |
| **textureAmount** | medium-texture intensity — offered ONLY with a textured medium (structurally absent on smooth, never a silent no-op) |
| **motion** | breath depth + drift tempo |
| (interactivity) | a sub-object — light / scroll / flow / wake (wired-or-excised, never declared-but-dead) |

Three contract properties:

- **The door is PURE + TOTAL + DEFAULT-PRESERVING** [facet 26/27]. Every input (including out-of-range or
  adversarial) clamps to a valid, plausible config; `resolveAtoms(DEFAULT_ATOMS)` deep-equals
  `DEFAULT_AURORA_CONFIG` (`proof:aurora-atoms-roundtrip`). Quality is a property of the parameter SPACE, not
  any one seed — curate the space, not the outputs (Hobbs/Fidenza weakest-output loop) [facet 27].
- **Co-varying axes move as ONE continuous curve, not a 3-point LUT** [facet 26]. A `mood`/`energy` knob must
  move `saturation + warpAmount + valueVariance + breathDepth` together along a monotone curve — moving any
  one alone reads as a defect. Named stops stay as labels on a `[0,1]` axis.
- **seed → everything is deterministic** [facet 26/27]. Art-Blocks hash-to-traits: one seed deterministically
  derives palette AND a stable nuclei arrangement via `src/utils/prng.ts` (mulberry32 + hashString). Use
  golden-ratio-conjugate (φ⁻¹=0.618) hue stepping + low-discrepancy / stratified scatter so layouts stay
  composed for ANY count and deterministic for `renderAt` thumbnail bakes. Do NOT over-fit the derive to
  encode multi-pole composition — palette-derive and nuclei-layout are orthogonal axes [facet 28].

**Two-tier progressive disclosure:** ≤7 atoms → 28-field author schema (Advanced escape hatch) → an optional
thumbnail design-gallery picker (dispersion-sampled grid + refine slider, Marks 1997 / Koyama 2020) as the
eventual primary "choose" UI [facet 26]. The `usePresetThumbnails` bake harness already supports the
deterministic `renderAt` bakes a gallery needs — but a 20+ thumbnail grid MUST reuse the single shared
offscreen capture context (Chromium caps ~8 live WebGL contexts/page), never one context per cell.

---

## 4. The medium taxonomy

| Medium | Operator family | Backend |
|---|---|---|
| **smooth / wispy-sky** | domain-warped fBm + OKLCh palette + IGN dither | the cheap, identical-on-both-backends DEFAULT |
| **watercolor** | wet-edge power-curve + pigment-density turbulence + paper-tooth granulation + boundary wobble | single-pass; fluid wet-on-wet bleed + backruns are WebGPU-only |
| **oil-pastel** | tooth-deposition + scumble (broken/optical color) + waxy burnish + sgraffito | single-pass; OKLab broken color, K-M mix optional |
| **oil / impasto** | structure-tensor ETF orientation + energy-graded strokes + impasto height→GGX relight + directional broken color | single-pass strokes; the Kuwahara flatten is WebGPU-only |
| **van-Gogh** | the oil family at full energy — multi-scale coarse-to-fine SBR + meandering tensor-spine strokes + divisionist complementary dabs | the Starry-Night cascade |

The mediums are **`StrokeProfile`-as-data** [facet 11], not engine forks: each medium is a parameter vector
(`shapeType` / `bristleAmp` / `streakFreq` / `impastoAmp` / `hardness` / `tooth*` / `density*` / `lenMul` /
`widMul`) over one shared placement substrate (`bestOil` / `curvedStroke` / `paintOver` / `strokeShape`),
which the corpus confirms is at SOTA-parity and STAYS.

The headline per-medium levers the research names:

- **van-Gogh** — multi-scale coarse-to-fine SBR (Hertzmann 1998; 2–3 descending brush radii, fine dabs only
  where the coarse layer's luma diverges) is the single biggest quality lever and is NOT yet in the
  single-scale engine; the cell-size prior is the Starry-Night turbulence scaling (−5/3 Kolmogorov / −1
  Batchelor) [facet 9/11]. Replace the fixed quadratic-bulge spine with a short multi-step integration along
  the structure-tensor minor-eigenvector (meandering strokes that hug iso-bands). Directional complementary
  broken color (push neighboring cells toward OPPOSITE OKLCh poles — divisionism, not i.i.d. jitter).
- **oil / impasto** — GGX/Cook-Torrance relight over Blinn-Phong (roughness α=0.3, F0=0.08, (Ld,Ls)=(1.0,0.8)
  — the 2026 SOTA, Liu et al.) with a Schlick-Fresnel `pow(1−N·V, p)` rim as the TRUE view-dependent
  catch-light (the old constant rim was a screen-space phantom light) [facet 10]. **Mandatory companion:**
  geometric specular AA (Toksvig/Kaplanyan — fold sub-pixel normal variance into roughness) the moment the
  lobe sharpens, or the fbm-driven height field strobes; a 4-tap central-difference normal kills the dFdx
  2×2-quad faceting.
- **oil-pastel** — pigment-on-tooth deposition + scumble is the headline model (Murakami & Tsuruno 2002):
  pigment lands on tooth PEAKS, skips VALLEYS; scumble is a broken upper layer (coverage<1) dragged over a
  base so the lower color reads through the gaps → OPTICAL mixing [facet 8]. Waxy burnish is a wide
  low-roughness specular lobe whose intensity grows with layer count. Broken color is per-cell OKLCh jitter
  (hue ±16° / value ±14%), never RGB snow.
- **watercolor** — wet-edge power-curve `col = pow(col, 1+k·edge)` (monotone, rim-darkens more, pre-tonemap,
  replaces a flat multiply), pigment-density turbulence `col *= (1 − density·(τ−0.5))` (the no-flat-fills
  keystone), paper-height granulation + OKLab two-pigment separation, boundary wobble (warp the edge sample
  coordinate by the existing fBm) [facet 12]. All single-pass.

**The painterly OVER-blend:** move `paintOver`'s linear-RGB `mix` into OKLab on painterly mediums so
overlapping complementaries transition through a chromatic path, not grey (cheapest correct fix). The richer
option is Kubelka-Munk subtractive mixing (spectral.js — blue+yellow→green) [facet 8/12]; the corpus's cost
verdict is decisive: **bake the K-M mix into the CPU palette LUT (zero per-pixel cost)** rather than calling
38-band `spectral_mix` per fragment, strip spectral.js's own companding (keep aurora's single shared OETF),
gate to painterly mediums. Use spectral.js (open-source, K-M from first principles); never pull Mixbox's
CC-BY-NC trained LUT into a shipped library.

**The anisotropic-Kuwahara finish** ("make a gradient read as oil paint") is the WebGPU-only multi-pass
enhancement common to the painterly mediums — see §6.

---

## 5. The color-space discipline (the non-negotiable substrate)

**The corpus is emphatic: the OKLCh core is already at SOTA.** Eight things the engine does are
confirmed-correct by the literature [facet 0/1/2/3/29] — do NOT re-litigate them:

1. **Linear-light compositing + a single sRGB OETF close** at `main()`. The AV.W1 "~2.2× too dark" defect was
   exactly the missing-OETF failure; now landed, locked by `proof:aurora-space-gamma` [facet 0].
2. **OKLab-rectangular interpolation for adjacent stops** — Aras' muddy-midpoint kill (rectangular for
   two-color pairs, NOT OKLCh-polar) [facet 0].
3. **The four CSS-Color-4 hue-arc methods** (shorter / longer / increasing / decreasing) for deliberate
   rainbow travel, routed per harmony (complementary/split → longer, analogous/mono → shorter, triad →
   increasing) [facet 0/2].
4. **Bell-curve chroma** (saturated body, calm edges via `sin(πt)`) — L stays monotone, the bell rides CHROMA
   only [facet 0/28].
5. **Warm-light / cool-shadow temperature coupling** — the single most-cited painting rule [facet 0/2/3].
6. **IGN dither in DISPLAY space after the OETF**, at 1/255 — the highest-ROI move for flat gradients;
   dithering in linear under-corrects mid-tone banding [facet 0/3/29].
7. **The Ottosson cusp twins shipped in value.js** (`findCusp` / `findGamutIntersection` /
   `computeMaxSaturation` / `deltaEOK` / `DELTA_E_OK_JND`) — the gamut machinery exists [facet 1/2].
8. **The column-major Ottosson matrices, single-sourced** — the verbatim GLSL↔WGSL twin is byte-identical and
   sound [facet 21].

So the AX color work (W11) is **seam-level, not a core redo.** The four recorded upgrades:

- **Cusp adaptive-L0 gamut mapping** [facet 1]. The current `gamutMapStop` 0.999 chroma-shrink loop
  under-shrinks saturated stops AND over-desaturates (the P3-yellow witness: pure chroma reduction grays to
  chroma ~25 vs the hybrid's ~103). Swap to CSS-Color-4 binary-search + deltaEOK-JND (**0.02, not 2** — OKLab
  L is 0..1) channel-clip refinement on the CPU bake, OR the analytic Ottosson cusp clip in-shader (project
  toward `L0=L_cusp`, adaptive α≈0.05 — branch-free, constant-cost; mind the blue-hue precision dip with one
  Halley + one Newton step). Hue-preserving chroma reduction, NEVER per-channel RGB clamp (which hue-shifts).
- **The optional Oklch+ path** [facet 0], a documented axis only. Oklch+ (arXiv 2606.05255: `L'=L^0.73` +
  Naka-Rushton `C'=C^0.87/(C^0.87+0.34^0.87)`, hue unchanged) reaches STRESS 29 (~CIEDE2000) vs native
  OKLab's 47. It is a DISTANCE-metric correction (apply AND invert around the lerp) for wide-hue presets only,
  flag-gated, and MUST NOT move the wispy-sky default. **OPEN: ratify ship-vs-document-only** — it is all
  CPU-side and deterministic, but a second interpolation space is surface the default never needs.
- **Display-P3 swapchain + fp16** [facet 0/1/11] → W07/W14. An sRGB swapchain clamps the bell-curve chroma
  peak; a `display-p3` canvas color-space + fp16 intermediate storage unlocks ~25% more chroma and defers
  banding to the single OETF+dither close. **Portability hazard:** P3 silently desaturates on sRGB displays
  — `@media (color-gamut: p3)`-gate, keep the sRGB path tested, and note the analytic cusp coefficients are
  derived FROM the sRGB primaries (a P3 map needs different constants). **OPEN: gating decision.**

**Cross-cutting color invariants** — the structural guards against the two-copy drift class (the AV.W1
defect): single shared color chunk (`procedural-color.glsl.ts`), one set of Ottosson matrices, GLSL+WGSL
twins certified at 1e-6 (`proof:single-color-core` / `proof:aurora-wgsl-equivalence`); column-major matrices
verbatim; gamut-map BEFORE the tonemap and OETF in linear/OKLCh; dither stays post-OETF. Tonemap selector:
Khronos PBR Neutral is the safe headline default (hue+saturation preserving, 13 lines, texture-free, built
for designed [0,1] backdrops) over the current Narkowicz ACES (a fit that bakes in oversaturation and skews
bright blue→magenta); AgX behind a per-preset "cinematic" opt-in with an exposure pre-scale [facet 29].
Replace the achromatic black floor with an OKLCh floor tied to the palette's darkest-stop hue (deep paint,
not crushed neutral) [facet 29].

---

## 6. WebGL2 vs WebGPU — the dual-backend story

| | WebGL2 (the floor) | WebGPU (the enhancement) |
|---|---|---|
| **Posture** | universal, zero-regression, tested floor | capability-gated enhancement, never required |
| **Architecture** | one full-screen triangle, one fragment program, zero deps, no FBO (DESIGN invariant 8) | genuinely multi-pass: smoothed structure tensor, anisotropic Kuwahara, LIC smear, stable-fluids wake |
| **Reach** | ~100% of sessions | ~95% (Safari 26, Nov 2025; NOT yet Baseline-widely-available) |
| **The default** | renders the wispy-sky default IDENTICALLY | renders the wispy-sky default IDENTICALLY |

The headline rule: **the wispy-sky default + any parity-floor field MUST render acceptably single-pass
WebGL2; the Kuwahara/LIC painterly finish is the gated bonus.** WebGPU is an enhancement, never the default,
never a hard requirement [facet 6/9/22/23].

**The W07 address-space bug class** [facet 19] — the headline AX fix. WGSL permits a fixed-size
`array<vec4f,N>` in a `var<uniform>` block, but the moment a per-invocation index reads it (a `floor(t)`
palette index, a `U.nucleiPos[i]` loop counter), Naga must map it to MSL `constant` space, and MSL forbids
per-instance dynamic indexing of `constant` — **green on Chrome/Dawn, silently black on Safari/Metal.** The
canonical fix is the storage flip: `var<storage, read>` (CPU side: `GPUBufferUsage.UNIFORM` → `STORAGE`). The
existing two-vec4-lane nucleus padding is std140-legal in BOTH spaces, so the flip is byte-identical — only
the binding keyword and the usage flag change. Storage is always-legal for dynamic indices AND runtime-sized
(`arrayLength`), retiring the `MAX_NUCLEI=6` / `MAX_STOPS=8` caps.

**The anisotropic-Kuwahara finish** [facet 6/5/18] — if WebGPU's painterly multi-pass is wired. The authored
scaffold uses the PRE-2010 hard sector-binning + winner-take-all, which **bands into an 8-spoke pinwheel on
aurora's flat gradient fields (its worst case).** The SOTA is a SOFT polynomial blend: N=8 overlapping sectors
of an elliptical kernel warped by the structure tensor, polynomial sector weights `max(0,(x+η)−λy²)²` (η≈0.1,
λ≈0.5) computed in-loop, combined via `w_k = 1/(1+(hardness·1000·s_k)^(sharpness/2))` — a soft variance blend,
NOT a hard argmin. Smooth the tensor COMPONENTS (Jxx/Jyy/Jxy) — NOT the gradient vectors — with a separable
Gaussian before eigen-decomposition (the single biggest quality jump) [facet 5]. Compute mean/variance in
linear/OKLab, not gamma [facet 6]. Per-pixel kernel-rotation noise must be STATIC (seeded), not time-varying,
or the paint crawls [facet 6].

**Multi-pass discipline** [facet 18/20/22]: allocate intermediates ONCE (rebuild on resize only); `rgba16float`
for the tensor (renderable + filterable by default; NEVER `rgba32float`, which is not filterable without the
optional feature); run the tensor at half-res then bilinear-upsample (orientation is low-frequency);
instrument each pass with `timestamp-query` to assert the total stays inside `profile:budget`; **benchmark
before promoting to compute** — texture cache often beats hand-rolled LDS (a tiled shared-memory Gaussian ran
~2× slower than the naive fragment shader); convert ONLY the Kuwahara gather, keep tensor/smooth as fragment
passes. Wire `device.lost` → WebGL2 self-heal; route `isFallbackAdapter` (software WebGPU) to WebGL2.

**Parity strategy** [facet 21]: real-device WGSL execution (dawn.node — Dawn as a Node native addon, prebuilt
macOS/Windows/Linux) > hand-transcription; column-major-is-the-invariant; codegen (Naga, build-tool only) over
a second hand-maintained copy. Reject Three.js TSL (inseparable from the renderer, forbids raw-shader
authoring). Watch the real-device hazards the 1e-6 CPU port can never reveal: `atan2` has a 4096-ULP allowance
and is UNDEFINED at (0,0); `textureSample` requires uniform control flow (use `textureSampleLevel` inside
loops); derivatives (`dpdx`/`dpdy`) are screen-space and uncomputable in a CPU port — derivative-bearing
relight needs pixel-readback parity, not the color-core 1e-6 gate.

---

## 7. Examples / snippets

**Minimal mount** (subpath import + atom door):

```vue
<script setup lang="ts">
import { Aurora } from "@mkbabb/glass-ui/aurora";
</script>

<template>
    <Aurora :atoms="{ seed: 'meadow', medium: 'smooth', motion: 0.4 }" />
</template>
```

**Content-over-aurora** (opacity ceiling + saturation clamp + a legible content surface):

```vue
<template>
    <div class="relative isolate min-h-screen">
        <Aurora
            class="absolute inset-0 -z-10"
            :atoms="{ seed: 'dawn', medium: 'smooth' }"
            :opacity-ceiling="0.4"
            :saturation-ceiling="0.6"
        />
        <main class="backdrop-blur-sm bg-background/60">…content…</main>
    </div>
</template>
```

Test contrast at the gradient's WORST-CASE luminance — the lightest AND darkest pixel under the glyph, and
over time — never the average [facet 30]. Add a `recede` axis (OKLCh chroma + value-band compression
in-shader) as the second axis beyond `opacityCeiling`. Wrap the root in `isolation: isolate`.

**Per-preset editable baseline** via the Configurator (`cloneMode="per-preset"`): aurora treats each preset as
a named editable baseline the user tunes and returns to — slider edits must survive a preset round-trip
[facet 28]. (The blob uses the default `commit-on-write` — a clean reset per switch.)

**Manual pause wiring** (`DockBackgroundToggle` → `pause()` / `resume()`):

```vue
<DockBackgroundToggle v-model:paused="paused" />
<Aurora :paused="paused" />
```

**Vite manualChunks split** — keep aurora's standalone ~16 KiB-gzip WebGL chunk out of app code:

```ts
output: {
    manualChunks(id) {
        if (id.includes("@mkbabb/glass-ui")) return "glass-ui";
    },
}
```

---

## 8. Best practices (consumer-facing)

- **Import via the subpath** `@mkbabb/glass-ui/aurora` — a standalone ~16 KiB-gzip WebGL chunk the root barrel
  never transitively reaches.
- **Drive with the ≤7-atom door**, not the 28-field author schema, unless you need the Advanced escape hatch.
- **Presets live in the consumer.** The library's own defaults are its identity — don't fork them.
- **Always pair a pause control.** `DockBackgroundToggle` is the WCAG 2.2.2 (auto-play, pause/stop, ALL users)
  obligation for auto-starting >5s non-essential motion; the `useWebGLCanvas` substrate handles
  `prefers-reduced-motion` separately via its live PRM freeze. Two distinct seams, both required [facet 23].
- **Let the substrate park.** The offscreen / content-hidden / tab-backgrounded park
  (`content-visibility:auto` + IntersectionObserver `rootMargin:200px` + `document.hidden`) attaches zero
  frames when not visible — not a nicety, the cheapest global perf lever [facet 22/23]. DPR ≤ 2; per-tier
  downgrade to a CSS placeholder on low-power signals.
- **`paperGrain` is load-bearing for skyscapes** — a wide low-chroma sky bands hard on 8-bit; a consumer who
  zeroes the grain to "clean up" reintroduces stair-steps [facet 3].

---

## 9. Design considerations (the painterly law-set)

- **No flat fills** — within-region value variation via pigment-density turbulence `col *= (1 −
  density·(τ−0.5))`; a single noise eval, the dominant "reads as a real wash" lever after edge darkening
  [facet 12].
- **Stroke texture is MATERIAL, not process** (DESIGN invariant 7). Grain, broken color, and kernel-rotation
  noise are functions of static position only — a `t·17.0` reseed makes the paper "boil," an aesthetic error
  AND a PRM/seizure-adjacent motion concern the flow-stack freeze does not reach [facet 6/13].
- **Selective time injection** — animate only the lowest + highest fBm octaves, not every octave; a uniform
  coordinate offset pans ALL octaves in lockstep (reads as scrolling, not alive) [facet 4]. Route all motion
  through the master-tempo dt-scaling seam (never `uTime` directly) so the PRM freeze holds [facet 4/23].
- **Bounded broken color** — divisionism is juxtaposition of NEARBY hues (±16° / ±14% in OKLCh), not random
  color; pushing complementaries too hard reads as RGB noise, not paint [facet 8/9].
- **Temperature vs aerial perspective ride DIFFERENT axes** — warm-light/cool-shadow couples to the L
  (light/shadow) axis; aerial perspective (cooler-with-distance) couples to the DEPTH (nucleus-y / paletteBias)
  axis. Stacking both on the same `t` cancels into a muddy mid [facet 3].
- **Cellular metric swaps need a warp** — Manhattan/Chebyshev cells make the underlying square lattice visible;
  warp the coordinate (Quilez double-fBm) BEFORE the cellular lookup to hide it [facet 7].

---

## 10. Accessibility & performance contract

- **WCAG 2.2.2** (auto-play pause/stop, all users) + **2.3.3** (interaction-motion disableable) +
  live-monitored `prefers-reduced-motion` freeze (one static frame, then park — a CSS reset cannot reach the
  WebGL rAF) [facet 23].
- **Offscreen / hidden / tab-backgrounded park** + demand-driven render-on-demand gate; the WebGPU multi-pass
  ladder inherits the SAME park (no pass attaches a frame while parked) [facet 22/23].
- **DPR ≤ 2 clamp**; per-tier substrate downgrade to a CSS placeholder on low-power signals
  (`hardwareConcurrency ≤ 4` / save-data / PRM).
- **`profile:budget` caps** (`AV_MAX_COLORS`, `MAX_NUCLEI`, loop-duration band) bite at the LAST boundary
  (uniform upload), so no authoring path escapes them — a raw `AuroraConfig` bypassing the atoms door still
  clamps at upload [facet 27].
- **fp16 / mediump is capability-gated** — `shader-f16` excludes ~58% of Android (zero Adreno); KEEP f32 for
  the OKLab cbrt, the eigen-decomposition, and exp/division, relax ONLY the [0,1] color-blend/tooth/grain tail
  [facet 22].

---

## 11. Scar list (the named pitfalls every wave must respect)

- **The two-copy color drift class** (the AV.W1 "~2.2× too dark" defect) — one shared chunk, GLSL+WGSL twins
  at 1e-6, never a second hand-authored matrix copy.
- **deltaEOK JND is 0.02, not 2** — OKLab L is 0..1; hardcoding 2 degenerates the gamut map to a near-pure
  clip [facet 1].
- **ACES is not gamut mapping** — it desaturates bright OOG values so the grey-out reads as "tonemapping" and
  slips visual review; map in OKLCh BEFORE the tonemap [facet 1].
- **Kuwahara over-denatures** — too-large a radius flattens the nuclei field into mush and kills the
  broken-color texture; apply AFTER deposition, energy-grade the radius DOWN in the lights [facet 6/9].
- **K-M per-pixel cost** — 38-band `spectral_mix` per fragment blows `profile:budget` and risks NaN/black on
  mediump; bake to the CPU LUT [facet 8/12].
- **Headless GPU is a CI trap** — headless Chromium uses no GPU by default; the device-parity gate must run
  headed-under-xvfb with explicit ANGLE/Vulkan flags, or dawn.node with `!adapter.isFallbackAdapter` [facet
  21].
- **Tonemap/noise swaps move EVERY preset** — value-noise→gradient-noise, Narkowicz→PBR-Neutral, hash→PCG are
  visual-regression events, not transparent tweaks; re-bake preset thumbnails in the consumer
  (presets-in-consumers) [facet 4/29].

---

Files of record: `src/components/custom/aurora/constants/shaders/{aurora.frag.ts, aurora.wgsl.ts,
mediums.glsl.ts, composition.glsl.ts, painterly.wgsl.ts, brush.glsl.ts, tonemap.glsl.ts}`,
`src/composables/glass/webgl/shaders/procedural-color.glsl.ts`,
`src/components/custom/aurora/composables/{color.ts, atoms.ts, uniformBridge.ts, gpuRuntime.ts}`,
`src/components/custom/aurora/constants/{presets.ts, renderMode.ts, budget.ts}`, `src/utils/prng.ts`,
`src/components/custom/aurora/{README.md, DESIGN.md}`.
