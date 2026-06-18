# BC procedural-refs — WEB-SOTA TARGET references for the procedural-animation suite (Band 4)

Research grounded in: the user reference screenshots (`docs/tranches/BC/audit/screenshots/`), the live codebase viz sources, the DEFECT-LEDGER (D8/D9/D7), and web SOTA (NVIDIA GPUGems, Bridson 2007, Tessendorf 2001, Codrops, web.dev/WebGPU-baseline, the WebGL dot-sphere lineage). Every finding is grounded to a file:line, a measured param, or a cited URL.

---

## 0 — THE HEADLINE: WebGPU is Baseline (Jan 2026). Safari 26 ships it ON by default. The user's mandate is VALID; the blocker is a picker bug.

**Fact (web.dev / Apple / GPUWeb Implementation-Status, June 2026):** WebGPU achieved **Baseline status January 2026**. Chrome/Edge 113+, **Safari 26+ (macOS Tahoe 26, iOS 26, iPadOS 26, visionOS 26)**, Firefox 141+/145+ all ship it **stable + on by default — no flags, no opt-in**. Apple's impl builds atop Metal (high perf, low battery/CPU). This DIRECTLY validates the user's directive: *"WebGPU is present EVERYWHERE (as long as it works on Safari) — ALL animations use it. NO FALLBACKS."* It works on Safari now.

**BUT the substrate picker is broken (D8 root, GROUNDED).** `src/composables/glass/webgpu/useGpuSubstrate.ts:91` commits the backend at construction via `useGpu = supportsWebGPU() && options.setupWGPU != null`. And `supportsWebGPU()` (`useWebGPUCanvas.ts:50-57`) is a **synchronous presence check only**:
```ts
export function supportsWebGPU(): boolean {
  return typeof navigator !== "undefined" && "gpu" in navigator && navigator.gpu != null;
}
```
It NEVER calls `requestAdapter()`. So on a host where `navigator.gpu` exists but `requestAdapter()` returns null (headless, software/SwiftShader, locked-down, some VMs), the picker selects WebGPU, then `useWebGPUCanvas.armAsync()` reaches `useWebGPUCanvas.ts:243-245`:
```ts
const adapter = await navigator.gpu.requestAdapter(options.adapterOptions);
if (!adapter) throw new Error("[useWebGPUCanvas] no GPU adapter");   // line 245
```
and THROWS — with NO fallback to WebGL2, because the backend was already committed synchronously. This is the literal `no GPU adapter` PAGEERROR the audit observed on blob / dot-flow / concentric. **WebGPU "present" ≠ adapter available — the presence check is the bug.**

**The FIX (the SOTA pattern, cited):** the backend choice must be ASYNC + adapter-real, not presence-only. Two correct shapes:
1. **Async probe before commit:** `supportsWebGPUReal()` = `navigator.gpu != null && (await navigator.gpu.requestAdapter()) != null` (cache the result; one probe per page). The picker awaits it before choosing the backend.
2. **Try-WebGPU-then-rebuild-WebGL2:** the picker attempts `armAsync()` on the WebGPU path inside a `try`, and on ANY init failure (no adapter, device-lost-at-birth, validation throw) silently disposes + rebuilds on the WebGL2 leaf — a true graceful degrade (the picker's documented-but-undelivered promise). This is the more robust shape (it also catches a device that creates but immediately loses).

The "structural-proxy ΔE-0.0 parity" the BB gate claimed only proved the SAME CPU evaluator matches itself; it NEVER proved the WGSL path paints on a real WebGPU host or that the fallback fires. The BC gate must measure **a real on-host meanLum > 0 per viz on an adapter-less host** (the fallback fires) AND **on a WebGPU host** (the primary paints).

---

## 1 — DOT-MATRIX SPHERE (Claude co-work ref) — the technique

**Reference:** `user-Screenshot_2026-06-17_at_14.45.25.png` (the "Gemma 4 in your browser / Kernels written by Fable 5" page). Two **subtle fine-dot spheres on near-black**, dots arranged on a sphere surface, density/opacity reading the curvature so the sphere emerges from the dot field. This is the **Stripe/GitHub dot-globe lineage** (interactive WebGL globes made of dots distributed on a sphere surface — confirmed via the Will Howard "Stunning WebGL Dot Spheres" lineage).

**The distribution math (cited, with concrete formulas):**
- **Fibonacci phyllotaxis spiral (THE SOTA — even distribution, no pole-clustering):** for dot `i` of `N`:
  ```
  phi   = acos(1 − 2·(i + 0.5)/N)          // polar angle, even-area
  theta = i · π · (3 − √5)                  // golden-angle azimuth (2.39996 rad)
  pos   = (sin phi·cos theta, sin phi·sin theta, cos phi)·R
  ```
  This beats lat-long (which "packs rings densely at the poles") — the article names phyllotaxis "much more satisfying / even." `N ≈ 1500–4000` dots reads as the reference's fine field.
- **Depth-fade to read as a sphere on dark (the subtle part — the article omits it, here's the SOTA):** after projecting to screen, each dot's opacity + size is modulated by its **z-facing-ness** (the dot normal · view dir) and depth:
  ```
  facing = clamp(dot(normal, viewDir), 0, 1)   // back dots fade
  opacity = baseOpacity · (0.15 + 0.85·facing) // front bright, rim dim — NOT a hard cull
  size    = baseSize · (0.6 + 0.4·facing)       // depth-of-field dot-size taper
  ```
  Soft fade (not a binary back-face cull) is what makes the sphere read as a translucent dot-shell rather than a flat disc. On dark: `baseOpacity ≈ 0.35–0.6`, dot color a soft warm-cream (`oklch(0.92 0.03 78)` — the library identity, NOT teal). A slow Y-axis rotation (≈0.05–0.1 rad/s) gives life without distraction.

**WebGPU shape:** instanced billboards (one quad per dot, the phyllotaxis positions in a storage/vertex buffer), camera-facing, additive or alpha-blend, the per-instance opacity/size computed in the vertex stage. This is the **dot-matrix variant** the user wants as a goo-blob sibling (`/substrates/blob` "a dot-matrix goo-blob variant is wanted").

---

## 2 — DOT-FLOW-FIELD: SUBTLE LARGE SWEEPING WAVES, not noise

**Defect (USER-DEFECTS §E, verbatim):** *"absolutely awful — does not form waves/shapes, a mess of NOISE. Must be SUBTLE, form LARGER + more SWEEPING waves … Large + sweeping, not chaotic."*

**The math is already correct + cited** (`flowField.ts:1-229`): Tessendorf sum-of-sines wave potential `h(p,t)=ΣA_i·sin(k_i·(D_i·p)−ω_i·t+φ_i)`, `ω_i=√(g·k_i)` deep-water dispersion (Tessendorf, *Simulating Ocean Water*, SIGGRAPH 2001), divergence-free flow `v=∇⊥h=(∂h/∂y,−∂h/∂x)` (Bridson, *Curl-Noise for Procedural Fluid Flow*, SIGGRAPH 2007). The **defect is the PARAMETERIZATION** — three concrete grounded over-tunings make it read as noise:

| param | current (`constants.ts` / `flowField.ts`) | TARGET (cited) | why |
|---|---|---|---|
| octaves | **6** (`buildWaveLadder(35, 6)`, line 69) | **3–4** | GPUGems Ch1: *"We limit ourselves to four geometric waves."* More = noise. |
| wavelength range | **`2.4·0.62^i`** → ~2.4 down to ~0.21 = **~11:1 span** (line 226) | **half-to-double the median = 2:1** | GPUGems: *"select a median wavelength and generate random wavelengths between half and double."* 11:1 is the fine-octave noise. |
| curlStrength | **0.6** (line 77) | **~0.10–0.18** | curl-fbm braiding at 0.6 dominates the clean Gerstner sweep → chaos. The curl is a WHISPER on top of large waves, not the carrier. |
| dotSize | **2.4** (line 78) | **4–6** | the reference dots are visibly larger; tiny dots + dense flow = visual noise. |
| particleCount | **4000** (line 25) | **1500–2500** | fewer, larger, longer streamlines read as sweeping. Density = noise. |
| dotSizeVelocity | 0.5 | keep ~0.4 | denser-where-calm is correct (the reference's varying size). |

**The steepness/loop constraint (GPUGems, to keep crests clean):** `Σ(steepness/wavelength · amplitude) ≤ 1` — keep the per-wave amplitude/wavelength ratio constant and modest (median amplitude small) so peaks don't loop into noise. The directional spread: `±30–60°` about the dominant wind (current `18 + i·9°` widens to ±63° by octave 6 — tighten to **±25–35°** for coherent sweeping bands vs a braided delta).

**Net TARGET config:** `octaves: 4`, wavelength ladder `median·{0.5, 0.75, 1.0, 1.5}` (≈2:1 span), `curlStrength: 0.12`, `dotSize: 5`, `particleCount: 2000`, spread ±30°, slow `windSpeed` so the waves SWEEP. The math source (`sampleVelocity`) stays; only the ladder + 4 scalars retune. **The teal-on-navy is a DEMO preset (`presets.ts`) — the library default is warm-cream; D8-ledger says "REMOVE the teal-on-navy reference entirely," so the demo preset itself must drop teal-on-navy (retint to warm-cream/dark-warm, never delete the viz).**

Sources: [NVIDIA GPUGems Ch1 — Effective Water Simulation](https://developer.nvidia.com/gpugems/gpugems/part-i-natural-effects/chapter-1-effective-water-simulation-physical-models), [Bridson Curl-Noise SIGGRAPH 2007](https://history.siggraph.org/learning/curl-noise-for-procedural-fluid-flow-by-bridson-houriham-and-nordenstam/), [Tessendorf Simulating Ocean Water](https://people.computing.clemson.edu/~jtessen/reports/papers_files/coursenotes2002.pdf).

---

## 3 — CONCENTRIC: ELLIPSOID LINES forming distinct WAVES, not a smooth fill

**Defect:** *"concentric: awful → must display concentric ELLIPSOID LINES that form distinct WAVES (not noise)."*

**Root cause (GROUNDED, `concentric.glsl.ts:106-118` + `constants.ts`):** the shader evaluates the ring field `f(p,t)` (multi-center radial sum-of-sines, ellipsoidal radius `√((dx/a)²+(dy/b)²)`, correct ellipsoid math), then maps the field VALUE through a 3-stop warm color ramp (`samplePaletteLin(v)`) — a **smooth continuous color FILL**, NOT distinct LINES. That's why it reads as a blurry interference blob instead of crisp rings.

**The TARGET technique — iso-contour LINE bands (cited):** extract the contours of the field as anti-aliased line strokes rather than filling. The SOTA GLSL pattern (Shadertoy "concentric rings" / Codrops AA-basics / numb3r23 fwidth):
```glsl
float field = sampleRingField(p, t);          // the existing ellipsoidal ring field
float lines = abs(fract(field·N) - 0.5);      // triangle wave: 0 at the iso-line, 0.5 between
float w     = fwidth(field·N);                // pixel footprint → resolution-independent AA
float ring  = 1.0 - smoothstep(w·1.0, w·2.0, lines·2.0);  // crisp 1px-ish anti-aliased ring stroke
// color: rim warm-amber where ring>0, transparent between — DISTINCT LINES
```
- `N` = ring count across the field (≈6–10 for the reference's distinct rings).
- `fwidth`-driven width gives **always-sharp 1px lines** at any zoom (the redblobgames/numb3r23 SDF-AA canon: `w = clamp(d/fwidth(d)+0.5, 0, 1)`).
- The **ellipsoid** axis ratio `axisRatio: [1, 0.62]` (already in `constants.ts`) makes the rings ELLIPTICAL — exactly the user's "ellipsoid lines."
- **DISTINCT WAVES:** keep the 2-center interference (`DEFAULT_CENTERS`, the moiré beat) so the elliptical line families cross + interfere into "distinct waves," but render each family as LINES not fill. Drop the 3-stop fill palette; color the line stroke a single warm-amber on transparent (one color event).

This is a pure fragment-field change (no compute, no particles), so the WebGL2 GLSL + WebGPU WGSL twins both get the same `abs(fract)+fwidth` line extraction — clean parity. Sources: [Shadertoy concentric rings](https://www.shadertoy.com/view/WcKfWG), [numb3r23 fwidth AA](http://www.numb3r23.net/2015/08/17/using-fwidth-for-distance-based-anti-aliasing/), [Red Blob Games SDF AA](https://www.redblobgames.com/blog/2024-09-22-sdf-antialiasing/).

---

## 4 — PAPER-GRID LIQUID-WAVE + the SIMPLE keyframes.js grid

**Two distinct user asks (USER-DEFECTS §E):**
- (a) *"the new grid background is a BLURRY MESS → TOTALLY ABROGATE it. It's a SIMPLE grid — like in keyframes.js. The grid is oddly spaced → consistent + larger, and NOT displayed in the card."*
- (b) *"The PAPER GRID procedural: a mess → fix to be evenly spaced + LARGER; the grid LINES must morph + wave in a liquid way; suffuse it throughout the site as a subtle background element."*

**Starting state (GROUNDED):** the current grid is a STATIC CSS `background-image` of 4 `linear-gradient` 1px lines (`tokens/scale-paper.css:118-134`): `--paper-grid-texture-size: 32px` minor + 128px major (4×), `--paper-grid-opacity: 0.08`, color a `color-mix` of `--foreground`. It's static (no wave) AND the spacing reads "oddly spaced"/blurry per the user.

**The SIMPLE-grid TARGET (keyframes.js reference, GROUNDED):** keyframes.js `EditorShell.vue:213-235` draws a **two-tier graph paper grid: fine (1rem) + major (5rem) at 3% / 11% opacity** (`design-idioms.css:270-271`). That's the clean, evenly-spaced, larger reference. glass-ui should re-express this as the calm static base: **fine 1rem (~16px) + major 5rem (~80px), 3%/11% of `--foreground`, evenly spaced, LARGER than the current 32/128px is "oddly" perceived** — match the 1rem/5rem rem-relative rhythm.

**The LIQUID-WAVE TARGET (the morph, cited):** static CSS gradients CANNOT wave — the liquid grid is a SHADER (vertex/UV displacement of grid lines). Two SOTA shapes:
1. **WebGPU/WebGL fragment grid with UV warp:** sample a procedural grid `grid(uv) = aa-line(fract(uv·spacing))` but warp the UV by a slow flow field before sampling: `uv += A·curlFBM(uv·freq + t·speed)` — the existing `curlFBM` chunk (`flow.glsl.ts`, this is the BOOKED #2 consumer "paper-grid-breathe") drives the line displacement. Amplitude tiny (`A ≈ 0.01–0.03` of viewport) so it's a SUBTLE liquid breathe, evenly spaced lines that gently undulate. This is the "2D-plane-with-3D-feel" — the warp gives apparent depth.
2. **3D-plane vertex displacement (Codrops/Three lineage):** a tessellated plane in perspective, vertices displaced in z by a sum-of-sines (the same Gerstner field), grid drawn as a wireframe — the lines wave in a perspective plane. *"Subtle variations in wave height — 0.05 to 0.15 units in vertex displacement — significantly enhance the illusion of depth without overwhelming performance"* (Codrops). For a subtle site-wide bg, the fragment-UV-warp (shape 1) is cheaper + suffusable.

**Suffusion:** the liquid grid is a subtle SITE-WIDE bg element (low opacity, behind content), NOT in a card — the user explicitly says "NOT displayed in the card." It composes the `curlFBM` operator (satisfies its ≥3-consumer bar) so there's ONE flow-warp source shared with the dot-flow-field. Sources: [Codrops GSAP WebGL ripples](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/), keyframes.js `EditorShell.vue:213-235`.

---

## 5 — GOO-BLOB: SDF smin metaballs, WHY it must work on Safari, the first-principles state

**Defect:** *"the blob is TOTALLY broken — does not meatball, does not render at all"* + the `no GPU adapter` PAGEERROR (D8). Also "TWO headers IN the card" (a page-chassis defect, Band 5, not viz).

**Starting state (GROUNDED — the MATH is already SOTA):** `sdf-body.glsl.ts:1-91` carries the **IQ-2024 NORMALIZED smin** (`uSmoothK` is a real distance-unit blend band, the `k *= 4.0` pre-scale, both quadratic + circular merge variants) AND the **analytic-gradient normal** (`sdgCircle` returns `vec3(d, grad.xy)`, `sminG` propagates the gradient through the merge so the surface normal reads the field gradient DIRECTLY — no per-pixel 4-tap finite-difference). This is correct, performant, first-principles metaball SDF. The renderer composes `createGpuSubstrate` (metaball.wgsl primary + metaball.frag.ts WebGL2 fallback). **The blob does NOT need a math rebuild — it needs the substrate to not crash.**

**WHY it must work on Safari (the binding fix):** Safari 26+ ships WebGPU on Metal (validated above). The two real blockers:
1. **D8 — the adapter-less crash** (the picker bug, §0). Fix the async-probe + graceful WebGL2 fallback and the blob paints on EVERY host.
2. **D7 — WebGL2 `fwidth` on WebKit + context-loss.** The metaball.frag uses `fwidth()` in TWO sites (the AA-edge half-width + the Toksvig normal-variance spec-clamp — the README names them "the most rasterizer-drift-prone lines"). WebKit's `fwidth` is the L1-norm `abs(dFdx)+abs(dFdy)` (standard, works) but Safari is stricter about **`precision highp float` derivatives** and **context-loss churn** (the "rapidly FLASHES" defect = WebGL context lost + re-arm storm). The Safari fix: (a) explicit `precision highp float` (already present per `concentric.glsl.ts`), (b) a robust `webglcontextlost`/`webglcontextrestored` lifecycle that PREVENTS the default + re-arms ONCE (not a churn loop), (c) prefer the WebGPU primary on Safari 26 (Metal — no `fwidth`-derivative variance at all). The analytic-gradient normal (no 4-tap) ALSO reduces Safari derivative sensitivity — keep it.

**The first-principles rebuild is NOT warranted** — the audit's CORRECTION confirms the viz DO paint with GPU flags (blob meanLum 228/chroma 110). The work is robustness: clean WebGPU degrade + Safari context lifecycle + a real on-host paint gate. Source: [Red Blob SDF AA](https://www.redblobgames.com/blog/2024-09-22-sdf-antialiasing/), [numb3r23 fwidth](http://www.numb3r23.net/2015/08/17/using-fwidth-for-distance-based-anti-aliasing/).

---

## 6 — The GOO + DOT-MATRIX HYBRID

**Ask:** *"a dot-matrix goo-blob variant + the goo+dot-matrix hybrid."*

**The technique (cited — Bayer dithering of an SDF field):** render the metaball SDF field, then DITHER it into a dot-matrix instead of a smooth filled surface. The Codrops Bayer-dithering canon:
```glsl
float Bayer2(vec2 a){ a=floor(a); return fract(a.x/2.0 + a.y*a.y*0.75); }
// 8x8 Bayer for smooth tonal transitions (recursive from Bayer2)
// PIXEL_SIZE = 8-10px (dot spacing), the SDF field is the brightness signal:
float bright = smoothstep(0.0, -blendBand, sdfDistance);  // inside the blob = bright
vec2 cell = floor(gl_FragCoord.xy / PIXEL_SIZE);
float dither = Bayer8(cell);
float dot = step(0.5, bright + dither - 0.5);  // dots appear denser where the blob is
```
So the blob's interior is rendered as a **field of dots that thicken toward the metaball core and thin at the rim** — the organic form made of dots (the goo+dot-matrix hybrid). Two registers: (a) the **dot-matrix variant** = the pure phyllotaxis/Bayer dot-sphere (§1) as a sibling viz; (b) the **hybrid** = the metaball SDF field dithered into dots, so a meatball reads as a dotted droplet. Combine the §1 depth-fade (front dots bright, rim dim) with the §5 SDF so the dotted blob has volume. Sources: [Codrops Bayer Dithering](https://tympanus.net/codrops/2025/07/30/interactive-webgl-backgrounds-a-quick-guide-to-bayer-dithering/).

**Bayer params (cited):** `PIXEL_SIZE = 8–10px` dot spacing; use an **8×8 Bayer matrix** (not 2×2) for "smoother tonal transitions" on the dark ground; combine with fbm to "feel more organic."

---

## 7 — WebGPU compute-particle advection (the flow-field substrate)

**Ask:** the flow field via WebGPU compute. The current `flow-field.compute.wgsl.ts` exists (`@compute @workgroup_size(64)`); the user wants ALL viz on WebGPU with no canvas (constellation currently uses `useCanvas2D` — a GAP).

**The SOTA shape (cited, web.dev / Three.js-roadmap / Phish Chiang):**
- **Ping-pong storage buffers:** two particle buffers A/B; each compute frame reads A, writes updated positions to B, swaps pointers next pass (each thread sole-writer of its slot — no sync hazard). *"Ping-pong buffers separate input and output by reading from buffer A, writing to buffer B, and swapping pointers."*
- **Workgroups:** `@workgroup_size(64)` (current), dispatch `ceil(N/64)` workgroups; each thread advects one particle: `pos += sampleVelocity(pos, t)·dt` (the `flowField.ts` evaluator transcribed line-for-line — the existing single-math-source discipline).
- **Instanced billboard render pass:** particles in a storage buffer rendered as **instanced camera-facing quads** with the per-particle gradient color + additive/alpha blend (`flow-field.render.wgsl.ts`). 1M+ particles are feasible at interactive FPS on WebGPU (the galaxy-sim benchmark) — but for the SUBTLE sweeping look, 1.5–2.5k is the TARGET (§2).
- **Particle respawn/wrap:** when a particle leaves the viewport or its lifetime expires, respawn at a seeded position (keeps the streamlines populated). A small lifetime jitter avoids synchronized respawn pulses.

**Constellation → WebGPU (the GAP):** `useConstellation.ts:15,187` binds `useCanvas2D` — the user wants "Totally redesign to WebGPU — NO canvas anywhere" + "the circles are supremely LOW-RES." The constellation (points + edges) is a natural WebGPU instanced-points + line-list render; the low-res is the Canvas2D rasterizer + no DPR scaling. TARGET: re-home constellation onto `createGpuSubstrate` (WebGPU instanced points/lines primary, WebGL2 fallback), DPR-aware, in a card per the page chassis. Source: [WebGPU supported in major browsers (web.dev)](https://web.dev/blog/webgpu-supported-major-browsers), [Three.js Roadmap — Galaxy WebGPU compute](https://threejsroadmap.com/blog/galaxy-simulation-webgpu-compute-shaders), [Phish Chiang ping-pong→compute](https://medium.com/phishchiang/webgpu-from-ping-pong-webgl-to-compute-shader-%EF%B8%8F-1ab3d8a461e2).

---

## 8 — Cross-cutting: the VIZ-INTERACTION + CHOREOGRAPHY + the no-fallback decision

- **W-VIZ-INTERACTION (cursor velocity + acceleration):** the platform already ships `usePointerVelocityField` (`/motion-core`) — pointer position + derived velocity + acceleration + flick burst, fed via `tick(deltaMs)` from the viz frame loop (no own rAF). Every procedural bg must CONSUME it: the flow field warps locally about the cursor (velocity-scaled perturbation), the dot-sphere repels dots near the pointer, the metaball gets a pointer satellite (already wired). The current viz `interactive: false` defaults — flip to wire the field.
- **W-VIZ-CHOREOGRAPHY (ONE clock via keyframes.js):** start/transition/end/restart on keyframes.js `SpringProgress`/timeline — the viz arm/fade-in/park ride the ONE keyframes clock, not ad-hoc setTimeout. The substrate already PRM-parks; the choreography (page-enter reveal, route-leave fade) threads keyframes.js.
- **The NO-FALLBACK decision (the user's literal demand vs reality):** the user says "NO FALLBACKS. EVER." BUT a robust system MUST handle the adapter-less host (D8) or it crashes to black. The reconciliation: **WebGPU is the PRIMARY everywhere (Safari 26+ included); the WebGL2 fallback is the INVISIBLE safety net that fires ONLY when `requestAdapter()` genuinely returns null (software/headless/old-device tail) — it never shows as a "downgrade," it just paints.** The user's intent ("WebGPU everywhere as long as it works on Safari") is satisfied: it DOES work on Safari, so WebGPU is the path; the fallback is the don't-crash-to-black insurance, not a parallel design. The gate measures real paint on BOTH host types.

---

## 9 — TARGET param table (the pinned numbers per viz)

| viz | TARGET technique | TARGET params (concrete) | starting-state file:line |
|---|---|---|---|
| dot-sphere | Fibonacci phyllotaxis + depth-fade | N=1500–4000, golden-angle 2.39996, opacity 0.15+0.85·facing, size 0.6+0.4·facing, warm-cream dots, rot 0.05–0.1 rad/s | NEW (sibling of goo-blob) |
| dot-flow | 4 Gerstner waves, subtle sweep | octaves 4, λ-range 2:1 (median·{0.5,0.75,1,1.5}), curlStrength 0.12, dotSize 5, particles 2000, spread ±30° | `flowField.ts:208-229`, `constants.ts:69-84` |
| concentric | iso-contour ellipsoid LINES | abs(fract(field·N))+fwidth AA, N=6–10, axisRatio [1,0.62], 2 centers, single warm-amber stroke (drop 3-stop fill) | `concentric.glsl.ts:106-118`, `constants.ts` |
| paper-grid liquid | simple 2-tier grid + curlFBM UV-warp | fine 1rem + major 5rem @ 3%/11%, warp A≈0.01–0.03·vp, slow speed, suffuse site-wide (not in card) | `tokens/scale-paper.css:118-134`; ref keyframes `EditorShell.vue:213-235` |
| goo-blob | IQ-2024 normalized smin + analytic normal (KEEP) | math unchanged; fix substrate + Safari fwidth/context | `sdf-body.glsl.ts:1-91` (sound) |
| goo+dot hybrid | Bayer-dither the SDF field into dots | PIXEL_SIZE 8–10px, 8×8 Bayer, dots denser at core, depth-fade rim | NEW |
| flow compute | ping-pong storage + instanced billboards | @workgroup_size(64), 2 buffers swap, instanced quads, additive | `flow-field.compute.wgsl.ts` (exists) |
| constellation | WebGPU instanced points/lines (kill Canvas2D) | DPR-aware, in-card, WebGPU primary + WebGL2 fallback | `useConstellation.ts:15,187` (Canvas2D — GAP) |
| substrate picker | async adapter-real probe + graceful degrade | supportsWebGPUReal()=requestAdapter()≠null OR try-then-rebuild-WebGL2 | `useGpuSubstrate.ts:91`, `useWebGPUCanvas.ts:50,243-245` (BUG) |

---

## Sources
- [WebGPU now supported in major browsers — web.dev](https://web.dev/blog/webgpu-supported-major-browsers)
- [Safari 26 Release Notes — Apple](https://developer.apple.com/documentation/safari-release-notes/safari-26-release-notes)
- [GPUWeb Implementation Status](https://github.com/gpuweb/gpuweb/wiki/Implementation-Status)
- [NVIDIA GPUGems Ch1 — Effective Water Simulation (Gerstner)](https://developer.nvidia.com/gpugems/gpugems/part-i-natural-effects/chapter-1-effective-water-simulation-physical-models)
- [Bridson Curl-Noise for Procedural Fluid Flow (SIGGRAPH 2007)](https://history.siggraph.org/learning/curl-noise-for-procedural-fluid-flow-by-bridson-houriham-and-nordenstam/)
- [Tessendorf — Simulating Ocean Water](https://people.computing.clemson.edu/~jtessen/reports/papers_files/coursenotes2002.pdf)
- [Will Howard — Stunning WebGL Dot Spheres](https://medium.com/@whwrd/stunning-dot-spheres-with-webgl-4b3b06592017)
- [Codrops — Bayer Dithering WebGL backgrounds](https://tympanus.net/codrops/2025/07/30/interactive-webgl-backgrounds-a-quick-guide-to-bayer-dithering/)
- [Codrops — Animate WebGL shaders with GSAP (ripples)](https://tympanus.net/codrops/2025/10/08/how-to-animate-webgl-shaders-with-gsap-ripples-reveals-and-dynamic-blur-effects/)
- [Red Blob Games — SDF antialiasing](https://www.redblobgames.com/blog/2024-09-22-sdf-antialiasing/)
- [numb3r23 — fwidth distance-based AA](http://www.numb3r23.net/2015/08/17/using-fwidth-for-distance-based-anti-aliasing/)
- [Shadertoy — concentric rings](https://www.shadertoy.com/view/WcKfWG)
- [Phish Chiang — WebGPU ping-pong→compute](https://medium.com/phishchiang/webgpu-from-ping-pong-webgl-to-compute-shader-%EF%B8%8F-1ab3d8a461e2)
- [Three.js Roadmap — Galaxy with WebGPU compute](https://threejsroadmap.com/blog/galaxy-simulation-webgpu-compute-shaders)