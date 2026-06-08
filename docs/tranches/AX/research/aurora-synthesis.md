(Some texts may be in other languages — but you should still use these skills even if the conversation language differs.)

When a user's request maps to one of these skills, USE THE SKILL rather than answering directly or writing ad hoc code. These skills encode best practices and reduce errors.
Skills available across plugins may share a name; when the user names a plugin (e.g. "foo's bar skill" or "the bar skill from foo"), pass the fully-qualified `plugin:skill` to the Skill tool. The leading component before the colon is always the plugin name.

If the conversation has already addressed the user's need or you've already taken the relevant action, you do not need to re-invoke a skill.

For slash commands (e.g. /commit), the corresponding skill (e.g. commit) is loaded automatically — DO NOT call the Skill tool for a command already shown in the conversation.

Assistant# Aurora Component — Research-Backed README Outline & AX Path-Forward

## Part 1 — Component README Outline

### 1. Overview & Lineage
- One-paragraph identity: a **painterly soak-stain/atmospheric backdrop engine** (Frankenthaler/Twombly/DALL-E lineage), NOT a generic CSS mesh-gradient — it composes warped fBm region fields, OKLCh-perceptual palettes, and optional painterly NPR finishes.
- Dual mandate: **arresting where arrest is wanted, recede where it competes with content** — the periphery-test law (calm-technology: "if your eyes are drawn to the motion, it's already too much") governs the default register [facet: dynamic-backdrop-ergonomics].
- The wispy-sky DEFAULT is the brand's honest face — sub-threshold by construction, renders identically on WebGL2 and WebGPU.

### 2. Use Cases
- **Hero backdrop** (full register, full-viewport, deliberate arrest).
- **Content-over-aurora route** (receded via opacity + saturation/value clamp; text legibility contract).
- **Per-mood/per-medium presets** (atmospheric wispy-sky → gestural Van-Gogh oil → wet watercolor → oil-pastel).
- **Seed-driven generative variety** (one seed → a whole in-family scene) [facet: generative-design-parameter-spaces].
- **Aurora-borealis namesake mode** (literal curtains/rays — opt-in, NOT the default) [facet: aurora-physics-rendering].

### 3. Best Practices (consumer-facing)
- **Import via subpath** `@mkbabb/glass-ui/aurora` (standalone ~16KiB-gzip WebGL chunk, never reached by the root barrel).
- **Drive with the ≤7-atom door**, not the 28-field author schema, unless you need the Advanced escape hatch [facet: atom-based-parametric-control].
- **Presets live in the consumer** (`demo/stories/aurora/presets.ts`); the library's own defaults are its identity — don't fork them.
- **Always pair a pause control**: `DockBackgroundToggle` (WCAG 2.2.2) + honor `prefers-reduced-motion` — two distinct seams, both required [facet: PRM/offscreen-park].
- **Content-over-aurora**: test contrast at the gradient's WORST-CASE luminance (lightest + darkest pixel under the glyph, and over time), not the average [facet: compositing-under-content].

### 4. Design Considerations (the painterly law-set)
- **Color discipline**: low chroma, narrow hue arc, never-pure-black/white floors — restraint in color is as load-bearing as restraint in motion.
- **Motion grammar**: breath-paced drift (40–60s cycle, warpDrift 0.005–0.010), ease-in-out, seamless loop; the single loud element budget; idle-variation against the ~90s wallpaper-effect.
- **Within-region value variation** (no flat fills) — the no-flat-fill law via pigment-density turbulence.
- **Warm-light/cool-shadow temperature coupling** + bell-curve chroma (saturated body, calm edges) — the painterly "reads as real pigment" levers.

### 5. The Atom Model (≤7 intuitive knobs)
- **The door**: `resolveAtoms` is PURE + TOTAL + DEFAULT-PRESERVING — every input (incl. out-of-range) yields a valid, plausible config (Disney "Principled" 5-rule discipline) [facet: atom-based-parametric-control].
- **Atoms**: `seed` · `mood` · `medium` · `textureAmount` · `motion` · `zones` · `interactivity` (harmony rides seed).
- **Two-tier progressive disclosure**: ≤7 atoms → 28-field author schema (Advanced) → optional thumbnail design-gallery picker as the primary "choose" UI.
- **Seed→everything determinism**: one seed deterministically derives palette AND scene via the shared seeded PRNG (Art-Blocks hash-to-traits; mulberry32/hashString) [facet: generative-design].

### 6. The Medium Taxonomy
| Medium | Operator family | Notes |
|---|---|---|
| **smooth / wispy-sky** | domain-warped fBm + OKLCh palette + IGN dither | the cheap, identical-on-both-backends DEFAULT |
| **watercolor** | wet-edge power-curve + granulation + pigment-density turbulence + boundary wobble | single-pass; KM glaze + fluid bleed are WebGPU-only |
| **oil-pastel / crayon** | tooth-deposition + scumble (broken/optical color) + waxy burnish + sgraffito | Kubelka-Munk subtractive mix is the headline fidelity lever |
| **Van-Gogh oil** | structure-tensor ETF orientation + energy-graded strokes + impasto height→GGX relight + directional broken color | multi-scale coarse-to-fine is the Starry-Night cascade |
| **aurora-borealis (namesake)** | triangle-noise curtain field + altitude→color banding + curl drape | opt-in; core curtain must render single-pass WebGL2 |

- The **anisotropic-Kuwahara finish** ("make a gradient read as oil paint") is the WebGPU-only multi-pass enhancement common to the painterly mediums.

### 7. The Color-Space Discipline (the non-negotiable substrate)
- **Linear-light compositing + single sRGB OETF close** at `main()` — the AV.W1 "~2.2× too dark" defect is exactly the missing-OETF failure; locked by `proof:aurora-space-gamma` [facets: OKLab-interpolation, gamut-mapping].
- **OKLab-rectangular default interpolation** (the muddy-midpoint kill); **OKLCh hue-arc** (shorter/longer/increasing/decreasing) reserved for deliberate rainbow travel; OKLab-rect for near-achromatic pairs.
- **Per-stop gamut mapping**: hue-preserving chroma reduction, NEVER per-channel RGB clamp (which hue-shifts).
- **Single-source shared chunk** (`procedural-color.glsl.ts`): one set of Ottosson matrices, column-major, GLSL+WGSL twins at 1e-6 (`proof:single-color-core` / `proof:aurora-wgsl-equivalence`) — the structural guard against the two-copy drift class.
- **Dither in DISPLAY space after the OETF** (IGN, 1/255) — dithering in linear under-corrects mid-tone banding.

### 8. WebGPU vs WebGL2 (the dual-backend story)
- **WebGL2 single-pass is the universal, zero-regression floor** (DESIGN.md invariant 8): one full-screen triangle, one fragment program, zero deps, no FBO. The wispy-sky default renders IDENTICALLY on both paths.
- **WebGPU is the capability-gated enhancement** for genuinely multi-pass operators: smoothed structure tensor, anisotropic Kuwahara, LIC smear, stable-fluids pointer-wake, wet-on-wet bleed [facets: structure-tensor, Kuwahara, WebGPU-compute, multi-pass-FBO].
- **Production reality**: WebGPU ships in all four engines (Safari 26, Nov 2025) but NOT yet Baseline-widely-available (~5% still WebGL2-only) — the painterly headline can NEVER be a hard requirement.
- **Address-space discipline (the W01 bug class)**: dynamically-indexed arrays MUST live in `var<storage, read>`, NOT `var<uniform>` — uniform dynamic indexing is silent-broken on Safari/Metal while green on Chrome/Dawn [facet: WGSL-address-space].
- **Parity strategy**: real-device WGSL execution (dawn.node) > hand-transcription; column-major-is-the-invariant; codegen (Naga, build-tool only) over a second hand-maintained copy [facet: WGSL↔GLSL-parity].

### 9. Examples / Snippets
- **Minimal mount** (subpath import + atom door).
- **Content-over-aurora** (opacity-ceiling + saturation clamp + `backdrop-filter` content surface + `contrast-color()` `@supports`-gated).
- **Per-preset editable baseline** (`cloneMode="per-preset"` via the Configurator).
- **Manual pause wiring** (`DockBackgroundToggle` → `pause()`/`resume()`).
- **Vite manualChunks** split recipe.

### 10. Accessibility & Performance Contract
- WCAG **2.2.2** (auto-play pause/stop, all users) + **2.3.3** (interaction-motion disableable) + live-monitored PRM freeze.
- **Offscreen/hidden/tab-backgrounded park** (`content-visibility:auto` + IntersectionObserver fallback + `document.hidden`) + **demand-driven** render-on-demand gate.
- **DPR ≤ 2 clamp**; per-tier substrate downgrade to CSS-placeholder on low-power signals (`hardwareConcurrency≤4` / save-data / PRM).
- **`profile:budget`** caps (`AV_MAX_COLORS`, `MAX_NUCLEI`, loop-duration band).

---

## Part 2 — Prioritized PATH-FORWARD for the AX Aurora Waves

Ranked by ROI × risk. Each item names the seam and the facet backing it.

### TIER 0 — The Core Fix (W01, blocking)
**Flip the dynamically-indexed WGSL arrays from `var<uniform>` to `var<storage, read>`.** [facet: WGSL-address-space]
- `aurora.wgsl.ts` declares `var<uniform> U` yet dynamically indexes `U.nucleiPos[i]` / `U.palette[i0]` per-fragment — the exact Metal/`constant`-address-space hazard. **Green on Chrome/Dawn, silently broken/de-opted on Safari/Metal** — the very platform AW.W7 added WebGPU for.
- **FIX A (minimal, land first)**: flip the binding + buffer usage (UNIFORM→STORAGE); the existing vec4-padded std140 packing already satisfies std430, so **zero re-pack, byte-identical visual parity**.
- **FIX B (cap-lifting follow-up)**: split into a small `var<uniform>` scalar block + a `var<storage>` runtime-sized `array<Nucleus>`/palette with `arrayLength()`, retiring `MAX_NUCLEI=6`/`MAX_STOPS=8` — delivering the storage promise the `aurora.wgsl.ts` doc header ALREADY asserts but the code doesn't ship (doc-vs-code drift).
- **Gate**: born-RED storage-binding assertion + a Metal/Safari e2e via **dawn.node real-device execution** (compile the ACTUAL WGSL string against the GLSL oracle at 1e-6) — closes the hand-transcription drift class [facet: WGSL↔GLSL-parity].

### TIER 1 — Color Correctness (CPU-side, cheap, no hot-path cost)
**A. Upgrade `gamutMapStop` from the blunt 0.999 chroma-shrink loop to Ottosson cusp / CSS-Color-4 deltaEOK-JND.** [facets: OKLab-interp, gamut-mapping, color-harmony]
- value.js ALREADY ships `findCusp`/`findGamutIntersection`/`computeMaxSaturation`/`deltaEOK`/`DELTA_E_OK_JND`; the current loop under-shrinks saturated stops AND over-desaturates. Swap to the binary-search + deltaEOK-0.02 channel-clip refinement (recovers chroma the shrink loop discards — P3 yellow ~103 vs ~25). **CPU bake, negligible cost.**

**B. Splice an analytic Ottosson cusp clip into the shared shader chunk + route mixPaletteOklab/OklchArc/brokenColorJitter/saturate3 through it.** [facet: gamut-mapping]
- Today the in-fragment interpolants hit the naive per-channel clamp + ACES (the hue-shift/grey-out fallback). Analytic cusp projection (cubic + 1 Halley + 1 Newton, **mind the blue-hue precision dip**) is branch-free, ~constant cost, single-pass-safe, WGSL-twinned at 1e-6.

**C. Add the OKLCh-total migration as a documented axis.** [facets: OKLab-interp, color-harmony, palette-derivation]
- Add a thin perceptual-correction layer on `deriveHue` (muddy-zone steer + threshold-adaptive L/C) and `correctLightness`-style stop reparameterization. Keep OKLab-rectangular the SHIPPED default; gate any Oklch+ (L^0.73 + Naka-Rushton C) path behind a flag for wide-hue presets only. **All CPU-side, deterministic, must not move the wispy-sky default** (`proof:aurora-atoms-roundtrip`).

### TIER 2 — Medium-Fidelity Perfection (single-pass WebGL2 where possible)
**D. Oil-pastel: Kubelka-Munk subtractive mix (the headline).** [facets: oil-pastel, watercolor, gamut-mapping]
- Splice a reduced-band spectral.js-style K-M mixer into the shared chunk so scumbled/overlapped layers composite subtractively (blue+yellow→green, not muddy lerp). **Cost is the hazard** — gate to painterly mediums, ideally **bake the K-M mix into the CPU palette LUT** (zero per-pixel cost) rather than calling 38-band `spectral_mix` per fragment. Strip spectral.js's own companding (keep aurora's single shared OETF). Make scumble OPTICAL (let the lower palette color show through); add sgraffito as a cheap high-value gesture.

**E. Van-Gogh oil: the Starry-Night cascade + GGX relight + directional broken color.** [facets: van-gogh, SBR, impasto, structure-tensor, anisotropic-Kuwahara]
- **(1) Multi-scale coarse-to-fine `bestOil`** (Hertzmann; currently single-scale — the biggest quality lever): 2–3 descending brush radii, fine dabs only where the coarse layer's luma diverges from the base; cite the −5/3 Kolmogorov / −1 Batchelor turbulence scaling as the cell-size prior.
- **(2) Replace the fixed quadratic-bulge spine** with a short multi-step integration along the structure-tensor minor-eigenvector (genuinely meandering strokes that hug iso-bands).
- **(3) Blinn-Phong → GGX** (roughness 0.3, F0 0.08) + Schlick-Fresnel N·V rim (the principled catch-light, NOT a baked constant) + **geometric specular AA** (fold normal variance into roughness — mandatory once the lobe sharpens or it strobes) + 4-tap central-difference normal (kill dFdx quad-faceting).
- **(4) Directional complementary broken color** (push neighboring cells toward opposite OKLCh hue poles — divisionism, not i.i.d. jitter).

**F. WebGPU anisotropic-Kuwahara: hard argmin → soft polynomial blend.** [facets: anisotropic-Kuwahara, structure-tensor, WebGPU-compute]
- `painterly.wgsl.ts` uses the pre-2010 HARD sector-binning + winner-take-all variance — which **bands into an 8-spoke pinwheel on aurora's flat gradient fields (its worst case)**. Adopt: soft blend `w_k=1/(1+(scale·s_k)^(q/2))`, in-loop polynomial sector weights (ζ≈0.1), Gaussian sector-membership overlap, canonical `a/b` ellipse axes, per-pixel STATIC noise kernel-rotation. Compute mean/variance in linear/OKLab, not gamma. Keep `q`/`radius` on the consumer-owned seam (`proof:webgpu-substrate-single`).

**G. Watercolor: wet-edge power-curve + granulation 2.0 + boundary wobble.** [facet: watercolor]
- Replace the flat 0.78 multiply with `col = pow(col, 1+uWetEdge·k·edge)` (monotone, rim-stronger, pre-tonemap); add paper-height sedimentation + OKLab two-pigment split; wobble the edge sample coordinate via the existing fBm. **All single-pass.** Fluid wet-on-wet bleed + backruns ride the WebGPU wake texture.

### TIER 3 — Atom Simplification & Generative Robustness
**H. Make scalar atoms continuous curves, not 3-point LUTs.** [facet: atom-based-parametric-control]
- `mood`/`motion` are discrete enums backed by 3-stop Records — collapse onto a single `[0,1]` monotone scalar driving co-varying curves (saturation+warpAmount+valueVariance+breathDepth), keeping named stops as labels on the axis. (Type break — acceptable clean cut per no-backwards-compat.) Audit ALL atom pairs for garbage combinations (Disney rule 5).

**I. Unify `seed` into a true seed→whole-scene derivation.** [facets: generative-design, atom-control]
- Today `seed` drives only palette; the FIXED `thirdsZones` 6-anchor LUT means two seeds give identically-arranged scenes. Drive nuclei placement (positions, driftPhase, valueBias) via the seeded PRNG with golden-ratio/stratified scatter (stays composed for any count, deterministic for `renderAt` bakes). Run a **weakest-output batch curation sweep** (sample N seeds × moods × mediums, surface the worst frames) and extend `proof:aurora-atoms-roundtrip` to a degeneracy/coverage sweep.

### TIER 4 — WebGPU Parity-or-Default-Off Decision
**J. WebGPU is an ENHANCEMENT, never the default and never a hard requirement.** [facets: WebGPU-compute, multi-pass-FBO, PRM-park, dynamic-backdrop-ergonomics]
- **Decision: default-off for the painterly multi-pass finish; parity-required for the core curtain/default field.** The wispy-sky default + any literal-aurora curtain shape MUST render acceptably single-pass WebGL2 (reaching ~100% of users); the Kuwahara/LIC/fluid finish is the gated bonus for the ~95% on WebGPU.
- **Before promoting any WebGPU pass**: benchmark first (lisyarus finding — texture cache often beats hand-rolled LDS; convert ONLY the Kuwahara gather, keep tensor/smooth as fragment passes); wire `device.lost` self-heal → WebGL2 fallback; route `isFallbackAdapter` (software) to WebGL2; instrument each pass with `timestamp-query` and assert the multi-pass total stays inside `profile:budget`; allocate intermediates once (rebuild on resize only); RGBA16F tensor target (renderable+filterable by default; never rgba32float).

### TIER 5 — Tonemap & Compositing Refinements (lower priority, real polish)
- **Tonemap selector** [facet: ACES/filmic]: Narkowicz ACES (the current blue→magenta-skewing per-channel fit) → **Khronos PBR Neutral** as the safe headline default (built for well-exposed [0,1] designed backdrops, hue+saturation preserving, 13 lines, texture-free) with AgX behind a "cinematic" opt-in + exposure pre-scale. Re-baseline preset thumbnails (presets-in-consumers).
- **Chromatic never-pure-black/white floor** [facet: ACES/filmic]: replace the achromatic `clamp(col·0.985+0.008)` with an OKLCh floor tied to the palette's darkest-stop hue (deep paint, not crushed neutral), pre-OETF.
- **TPDF dither upgrade** over the single-sample IGN; blue-noise on the WebGPU branch only (texture-free invariant).
- **Per-route compositing envelope** [facet: compositing-under-content]: add a `saturationCeiling`/`recede` atom (OKLCh chroma + value-band compression in-shader) as the second axis beyond `opacityCeiling`; add a parameterized luma-band clamp as the shader-side worst-case-luminance contract; wrap the root in `isolation:isolate`.
- **Cursor-as-light / velocity-flow refinements** [facets: cursor-as-light, velocity-flow]: IQ `expImpulse` flick envelope over the linear burst ramp; dt-correct `1−exp(−λ·dt)` smoothing over fixed-constant lerps; `getCoalescedEvents()` for accurate flick magnitude; route all new motion through the master-tempo dt-scaling seam (never `uTime`) so PRM-freeze holds. Stable-fluids wake stays WebGPU-only.

---

**Cross-cutting invariants every wave must respect**: single shared color chunk (no second copy → the AV.W1 defect class); column-major matrices verbatim; dither stays post-OETF; gamut-map before ACES/OETF in linear; the wispy-sky default unchanged (`proof:aurora-atoms-roundtrip`); WebGL2 the zero-regression floor; all new motion through the PRM/tempo seam.

Files of record: `src/components/custom/aurora/constants/shaders/{aurora.frag.ts, aurora.wgsl.ts, mediums.glsl.ts, composition.glsl.ts, painterly.wgsl.ts, brush.glsl.ts, tonemap.glsl.ts}`, `src/composables/glass/webgl/shaders/procedural-color.glsl.ts`, `src/components/custom/aurora/composables/{color.ts, atoms.ts}`, `src/components/custom/aurora/constants/{presets.ts, budget.ts}`, `src/utils/prng.ts`, `DESIGN.md`.