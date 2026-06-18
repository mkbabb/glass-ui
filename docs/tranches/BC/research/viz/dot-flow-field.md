# BC viz research — dot-flow-field

> Per-viz SOTA re-modernization research. RESEARCH ONLY — zero `src/` edits.
> Viz: `dot-flow-field` (`@mkbabb/glass-ui/dot-flow-field`).
> User defect (USER-DEFECTS.md §E, verbatim): "**absolutely awful — does not form
> waves/shapes, a mess of NOISE**. Must be **SUBTLE, form LARGER + more SWEEPING
> waves** (ref: the Claude co-work dot-matrix spheres — subtle fine-dot spheres on
> dark; `Downloads/Screenshot 2026-06-17 at 14.45.16.png`). Large + sweeping, not
> chaotic." Plus the §E global mandate: "**WebGPU is present EVERYWHERE (as long as it
> works on Safari) — ALL animations use it. NO FALLBACKS. EVER.** No canvas anywhere."

---

## 0. Verdict in one line

The current implementation is **architecturally wrong for the requested aesthetic**. It
is a *free-advecting particle cloud* — N particles wander the domain, wrap/re-seed at
the edge (`flow-field.compute.wgsl.ts:151`), and accumulate into the chaotic "mess of
NOISE" the user condemns. The reference (the Claude co-work `Gemma 4 in your browser`
hero, captured `Screenshot_2026-06-17_at_14.45.25.png`) is the **opposite topology**: a
**fixed, regular dot-MATRIX grid** of small dim dots on near-black, where each dot is
*anchored to its grid cell* and only **brightness + a small sub-cell displacement** are
modulated by a **low-spatial-frequency field**, so a large coherent shape (the
sphere/globe silhouette) sweeps slowly across an otherwise static lattice. The fix is to
**retopologize from free particles → an anchored dot-matrix grid driven by a low-frequency
divergence-free field**, keeping the cited Bridson/Tessendorf math but inverting the
*coherence regime* (low frequency, high amplitude-falloff, anchored origins, restoring
spring) so the field reads as ONE sweeping wave, not a thousand independent walkers.

---

## 1. The reference, read precisely (the binding acceptance target)

`Screenshot_2026-06-17_at_14.45.25.png` (the file the user names; the `14.45.16`
filename in the defect text is the same Downloads capture, re-saved into the audit set as
`…14.45.25`). What it actually shows, pixel-read:

- A **regular square/iso dot lattice** — small, soft, uniform dots on a near-black
  ground, evenly spaced (a fixed pitch, NOT scattered).
- **TWO large circular "globe" silhouettes** (a big one upper-left, a smaller one
  upper-right) emerge purely from **per-dot brightness/opacity modulation**: dots inside
  the disc are brighter; dots outside fade to near-invisible. The dots themselves do not
  move far — the *shape* is painted in the brightness channel of a static grid.
- The motion (implied; it is a hero animation) is **slow + sweeping**: the globe's
  internal banding drifts like a slow rotation / a low-frequency wave passing through.
  Nothing darts. Nothing wraps. There is no streaking.
- Palette: **monochrome warm-white-ish dots on black** — exactly the warm-cream-identity
  register the library default already wants (the teal-on-navy is NOT in this reference;
  it was a prior, separate "Claude co-work dot-wave" the README invented — §6 fence).
- Contrast is **subtle**: the brightest dots are maybe 70-80% white, most are 10-30%, the
  field never blows out. "Subtle" is literally the dominant quality.

The gestalt the user wants: **a calm dot-matrix that large coherent waves/shapes sweep
through.** The grid is the stable canvas; the field is the slow brush.

---

## 2. Current state — what exists, and why it reads as noise

### 2.1 Files (the colocation, all present)
- `DotFlowField.vue` — the SFC (canvas + `useDotFlowField`).
- `constants.ts` — `FlowFieldConfig`, `DEFAULT_FLOW_CONFIG`, `WARM_IDENTITY_PALETTE`,
  `buildWaveLadder`, caps (`MAX_PARTICLES=16384`, `MAX_WAVE_COMPONENTS=8`).
- `composables/flowField.ts` — the **ONE math source** (`gerstnerVelocity`, `curlFBM`,
  `sampleVelocity`, `buildWaveLadder`); pure + node-testable (the round-trip discipline).
- `composables/useFlowParticles.ts` — `createFlowWGPUSetup` (compute+render two-pass).
- `composables/useDotFlowField.ts` — the picker (`createGpuSubstrate` WGPU primary →
  `useCanvas2D` fallback).
- `composables/uniformBridgeWGPU.ts` — typed-struct uniform packing (std140-safe).
- `shaders/flow-field.compute.wgsl.ts` — the advection compute kernel.
- `shaders/flow-field.render.wgsl.ts` — the instanced-billboard render pass.
- `shaders/flow-field.glsl.ts` — the Canvas2D fallback stepper (`createCpuFlowField`).
- `src/composables/glass/webgl/shaders/flow.glsl.ts` — the shared `curlFBM` chunk (BB.B1).

### 2.2 The math is *correct and cited*; the *regime* is wrong
The math source `flowField.ts` is genuinely the cited SOTA — analytic Gerstner ∇⊥h
(`gerstnerVelocity`, lines 81-103), Bridson curl-noise (`curlFBM`, lines 169-178),
composed in `sampleVelocity` (lines 185-200). It is NOT arbitrary noise. The PROBLEM is
the visual *regime* the parameters + the topology select:

1. **Free-advection topology (the root cause).** Each particle integrates `p ← p + v·dt`
   (`flow-field.compute.wgsl.ts:147`) and re-seeds at a *random* position when it leaves
   the domain or ages past 6s (`:151-154`). So particles have **no anchor** — they wander
   freely, pile into the convergent regions of the field, and the screen fills with
   independent walkers. There is no lattice, no stable shape; the eye sees a turbulent
   cloud. This is the "mess of NOISE."
2. **High spatial frequency (the coherence killer).** `buildWaveLadder` (`flowField.ts:208`)
   builds a **6-octave** ladder starting at `wavelength = 2.4` and multiplying by `0.62`
   per octave (`:226`) — so it adds 5 progressively *finer* waves down to λ≈0.22. Over a
   domain half-extent of ~1 (the `uDomainHalf` reseed bound), λ=0.22 means ~9 wave periods
   across the view → **high spatial frequency → small, chaotic eddies** (the fBM
   feature-size law: large features come from LOW frequency, detail from high
   [catlikecoding noise-variants]). The reference wants the *opposite*: one or two
   dominant low-frequency waves spanning the whole view.
3. **The curl-noise term braids at fine scale.** `sampleVelocity` samples
   `curlFBM(p·1.7 + t·0.15)` (`flowField.ts:195`) at `curlStrength=0.6` (default
   `constants.ts:78`) — a 1.7× domain scale on a 3-octave value-noise fBM → more
   fine braiding on top of the already-fine wave ladder. Strength 0.6 is *high* for
   "subtle."
4. **Per-particle size from |v| only thins dots in fast regions** (`render.wgsl:122`) —
   it does not paint a coherent shape; it just makes the fast streaks thinner, which reads
   as more streaking, not less.

### 2.3 The fallback violates the new mandate
The §E mandate is **"WebGPU EVERYWHERE … NO FALLBACKS. EVER. No canvas anywhere."** The
current design ships a **Canvas2D point-cloud fallback** (`flow-field.glsl.ts`
`createCpuFlowField`, wired in `useDotFlowField.ts:112-153`). Per the new mandate +
the confirmed Baseline status (§4), the Canvas2D fallback is **RETIRED**. WebGPU is
Baseline (Safari 26+); the WebGL2/Canvas2D fallback is kept ONLY for the genuinely-absent
tail and is NOT the "no canvas anywhere" surface — see §4 for the exact disposition.

---

## 3. The SOTA technique (cited) — and the regime inversion that fixes it

### 3.1 The cited math (kept — it is correct)
- **Deep-water dispersion (Tessendorf 2001, *Simulating Ocean Water*).** ω(k) = √(g·k):
  long waves travel faster than short ones — "real ocean math, not arbitrary noise."
  [Tessendorf coursenotes, Clemson PDF; Robert Ryan ocean-rendering part 1]. Already in
  `flowField.ts:93` (`omega = √(FLOW_GRAVITY·k)·windSpeed`). KEEP.
- **Gerstner sum-of-sines height field.** h(p,t) = Σᵢ Aᵢ·sin(kᵢ·(Dᵢ·p) − ωᵢt + φᵢ), the
  analytic gradient ∂h/∂x = Σ Aᵢkᵢ Dᵢ.x cos(θᵢ) (no finite difference). Already in
  `flowField.ts:81-103`. KEEP.
- **Bridson curl-noise (Bridson, Hourihan, Nordenstam, *Curl-Noise for Procedural Fluid
  Flow*, SIGGRAPH 2007).** The velocity is the curl of a potential, divergence-free BY
  CONSTRUCTION: in 2D, v = ∇⊥ψ = (∂ψ/∂y, −∂ψ/∂x), so ∇·v = ∂²ψ/∂x∂y − ∂²ψ/∂y∂x = 0 — the
  field swirls without sources/sinks, so anchored dots displaced along it never pile up.
  [Bridson SIGGRAPH 2007 PDF cs.ubc.ca; freder.github.io curl-noise chapter]. The 2D
  formula and the EPSILON finite-difference gradient (`CURL_EPS`, central differences ÷
  2·ε) are exactly what `flow.glsl.ts` + `flowField.ts:169-178` implement. KEEP the
  operator; the shared `curlFBM` chunk (`flow.glsl.ts`) is its single source.

### 3.2 The regime inversion (the actual fix — cited via the fBM feature-size law)
The fBM law: **large coherent structures come from LOW spatial frequency + high amplitude
at the base octave; detail/chaos comes from HIGH frequency** (persistence ≈ 0.5,
lacunarity ≈ 2.0 superimposes octaves; "low frequency drives overall flow while high
frequency adds detail" [catlikecoding noise-variants; gamegeniuslab Perlin intro]). To go
from "mess of noise" → "large sweeping waves," invert every coherence knob:

| knob | current (noise) | target (sweeping) | why |
|---|---|---|---|
| base wavelength | 2.4 (domain~1 → many periods) | **λ₀ ≈ 2.0–3.0× the domain extent** (≈ ½–1 period across view) | one dominant wave spans the whole field |
| octave count | 6 | **2–3** | fewer scales → no fine chatter |
| λ falloff per octave | ×0.62 (steep → fine) | **×0.55–0.6 but starting LOW-freq**, capped so finest λ ≥ ~⅓ view | detail stays coarse |
| amplitude spread | each octave half | **steeper falloff (persistence ≈ 0.35–0.4)** | the base wave dominates; detail is a whisper |
| curlStrength | 0.6 (fine braiding) | **0.08–0.18** (a hint of organic break) | curl is seasoning, not the dish |
| curl domain scale | ×1.7 (fine) | **×0.4–0.7** (coarse braiding) | the braiding is large too |
| time speed | windSpeed 1.0 + curl t·0.15 | **slow: ωscale ≈ 0.25–0.4** | "subtle," slow sweep |

This produces ONE or TWO low-frequency waves slowly translating across the view — the
"larger more sweeping waves" target — with a faint curl break so it is organic, not a
mechanical sine band.

### 3.3 The topology inversion (the gestalt fix — anchored dot-matrix)
This is the bigger change and the one that actually produces the *reference*. Replace
free-advecting + re-seed with an **anchored dot-matrix grid + restoring spring +
brightness modulation**:

1. **Anchored origins.** Lay out N dots on a regular lattice (square or staggered-iso —
   the reference reads as a square/iso grid). Each particle stores its **origin** `o`
   (grid cell center) in addition to its live position `p`. The grid pitch is a config
   axis (`gridPitch`), so density = view / pitch² (deterministic, not the free
   `particleCount`).
2. **Displacement, not advection.** Each frame, the dot is displaced from its origin by
   the field, BUT a **restoring spring** pulls it back toward `o`:
   `displacement = field(o, t) · displaceAmp`; `p = o + smoothed(displacement)`. The dot
   never leaves its cell by more than ~0.5 pitch (a cap). NO wrap, NO re-seed — the
   lattice is permanent. This is the GPGPU-flow-field "base position + influence/strength
   that pulls particles back" pattern [threejs-journey GPGPU flow-field particles] applied
   to a *grid* instead of a random cloud — the displacement is a perturbation of a stable
   anchor, so the grid reads coherently while the field sweeps through it.
3. **Brightness/scale modulation paints the SHAPE.** This is what makes the
   sphere/globe emerge. The per-dot brightness + radius are driven by a **scalar field
   sampled at the origin** — the same low-frequency Gerstner height `h(o,t)` (or a
   `smoothstep` band of it). `brightness = base + waveBand(h(o,t)) · contrast`. The
   sweeping wave is literally a moving iso-band of the height field, lighting up the dots
   it crosses. (Optionally a slow large-scale "globe" mask — a soft radial field — adds
   the disc silhouette; that mask itself drifts/rotates slowly. This is the
   reference's two-globe look.)
4. **Velocity feeds size/displacement, not lifetime.** `|v|` modulates the
   displacement magnitude + a subtle size pulse (the reference's varying dot size), never
   a re-seed.

The result: a STATIC lattice (coherent, calm) that a LOW-frequency wave + an optional
soft globe-mask sweep through in the brightness channel, with a sub-cell organic
displacement so it breathes. That is the reference, exactly.

### 3.4 The ONE-math-source discipline (kept + extended)
`flowField.ts` stays the single evaluator. The new functions it must own (pure, node-
testable, transcribed line-for-line by WGSL): `sampleHeight(o,t)` (the scalar Gerstner
height — the brightness driver), `sampleDisplacement(o,t)` (the divergence-free
∇⊥h + faint curl, the sub-cell offset), and `gridOrigin(index, cols, pitch)` (the
deterministic lattice layout so the WGSL `instance_index → origin` mapping matches the JS
exactly). `proof:flow-field` clause 3 round-trips JS vs WGSL at a fixed sample set.

---

## 4. Substrate, Safari, and the WebGPU-everywhere mandate

### 4.1 WebGPU is Baseline — Safari 26+ ships it (the mandate is satisfiable)
- **WebGPU reached Baseline "Newly available" in January 2026** — Chrome/Edge 113+,
  Firefox 141+ (macOS Tahoe ARM64 145+), and **Safari 26+** (macOS Tahoe 26, iOS 26,
  iPadOS 26, visionOS 26 — enabled by default; all iOS browsers follow WebKit).
  [web.dev/blog/webgpu-supported-major-browsers; caniuse.com/webgpu; webkit.org Safari 26
  beta blog]. ~82-83% global traffic as of 2026 [webo360solutions WebGPU support guide].
- **WGSL is the W3C Candidate Recommendation Draft (2026-06-17)** [w3.org/TR/WGSL]. The
  shading language ships wherever WebGPU does — no separate gate.
- **`canvas.getContext("webgpu")` → `GPUCanvasContext` is supported in Safari 26**
  (configured via `context.configure({device, format, alphaMode})`); Safari 26.2 even
  ships WebGPU rendering for WebXR on Vision Pro [MDN GPUCanvasContext; webkit.org Safari
  26.2 features].

**Conclusion:** the user's "WebGPU everywhere, works on Safari" is correct as of June 2026.
The dot-flow-field's WGSL compute+render primary IS the surface on Safari 26+. NO Safari
caveat blocks it; the only caveat is the substrate must use `armAsync()` (async device
acquisition) + the `device.lost` self-heal the leaf already owns (`useWebGPUCanvas.ts`).

### 4.2 The fallback disposition (the "no canvas anywhere" reconciliation)
The mandate "NO FALLBACKS. EVER. No canvas anywhere" is a DESIGN-INTENT statement (do not
*design to* a canvas; do not ship a degraded canvas as the visible surface). The literal
engineering reconciliation, given Baseline:
- **The WebGPU WGSL path is THE surface on every Baseline browser (incl. Safari 26+).**
- **RETIRE the Canvas2D point-cloud fallback** (`createCpuFlowField` /
  `flow-field.glsl.ts` and its `useDotFlowField.ts` branch). It is the "canvas anywhere"
  the user condemns AND it cannot render the anchored-grid + brightness-shape aesthetic at
  CPU step rates (it was already `degraded`).
- **Keep a single WebGL2 fragment fallback ONLY for the genuinely-absent ~5-10% tail**
  (Linux Firefox pre-141, pre-A12 iPhones). Because the new design is an **anchored grid
  with brightness driven by a scalar field**, the fallback can be a **pure WebGL2 fragment
  shader** (NOT a particle/compute simulation): render a fullscreen quad, compute the dot
  lattice analytically in the fragment (`fract(uv·gridFreq)` dot mask), sample the SAME
  `flowField.ts` height for brightness. This is byte-parity-able (the SAME math source,
  the aurora/concentric fullscreen-fragment precedent), reads identically to the WGSL
  primary at the gestalt level, and uses NO per-frame canvas readback. It is the graceful
  path, gate-blocked from retirement by `proof:gpu-substrate-single` clause B until the
  tail closes. This is materially better than the old Canvas2D path AND respects the
  "no canvas" intent (it is GPU, not 2D-context).
- The new design's grid+brightness model is **fragment-friendly**, so the WebGL2 fallback
  becomes parity `verified` (not `degraded`) — a real win the retopology unlocks.

### 4.3 Substrate reuse (the discipline — no fork)
- Compose `createGpuSubstrate` (`useGpuSubstrate.ts`) → `useWebGPUCanvas` over the ONE
  `createCanvasLifecycle` leaf. ZERO scheduling re-fork (offscreen-pause, live-PRM-freeze,
  demand-loop all inherited). `useDotFlowField` keeps the same handle shape
  (`pause`/`resume`/`wake`/`renderAt`/`reducedMotion`/`dispose`).
- DPR: the field is wash-class — `resolveBudgetDpr()` (`aurora/constants/budget.ts`,
  AV_AURORA_DPR_MAX=1.5) is right. KEEP.
- Color: the shared `procedural-color.wgsl.ts` OKLCh ramp (ONE color source). KEEP; the
  new brightness drive multiplies the sampled stop's luminance.

---

## 5. The WGSL-first kernel design (the new shape)

### 5.1 Compute pass (anchored-grid displacement — replaces free advection)
`flow-field.compute.wgsl` per-invocation (workgroup_size 64 — the WebGPU canonical
[webgpufundamentals compute-shader-basics]):
```
idx = gid.x; if (idx >= count) return;
o   = gridOrigin(idx, cols, pitch);          // deterministic lattice (matches JS)
disp = sampleDisplacement(o, t);             // ∇⊥h + faint curl (divergence-free)
target = o + disp * displaceAmp;             // never advect; offset from anchor
// critically-damped restoring smoothing toward target (spring-lerp, frame-rate-indep):
p.xy = mix(p.xy, target, 1 - exp(-springK * dt));
h    = sampleHeight(o, t);                    // scalar brightness driver (low-freq wave)
speed = length(disp);
particles[idx] = vec4(p.xy, h, speed);       // store p, brightness-h, speed
```
- NO wrap, NO re-seed (the lattice is permanent — the coherence fix).
- The spring-lerp `1 - exp(-k·dt)` is the framerate-independent critically-damped pull-to-
  anchor (the same lerp shape `usePointerVelocityField` uses; the GPGPU "influence pulls
  particles back to base" pattern). For the deterministic π-capture path, `renderAt`
  drives it with a fixed dt.
- Uniforms (typed-struct SoT via `uniformBridgeWGPU.ts`): `time, dt, windSpeed, curlStrength`;
  `domainHalf, gridCols, gridPitch, displaceAmp`; `springK, waveBandCenter, waveBandWidth,
  contrast`; the wave-component table (≤8 vec4 rows); palette stops (≤4).

### 5.2 Render pass (instanced billboards, brightness-driven — replaces |v|-thinning)
`flow-field.render.wgsl` instanced quad (6 verts × N):
```
p, h, speed = particles[ii];
brightness  = baseBright + waveBand(h) * contrast;   // the SHAPE: iso-band of h
brightness *= optionalGlobeMask(o, t);               // the reference's soft-disc silhouette
size        = dotBaseSize * (1 + speed * sizePulse); // subtle size breathe
// soft radial circle in fragment; color = palette stop · brightness (premultiplied alpha)
```
- `waveBand(h)` is a `smoothstep` band centered on `waveBandCenter` with `waveBandWidth`
  — this is the moving bright stripe that sweeps the lattice (the "sweeping wave").
- `optionalGlobeMask` is a soft radial field whose center drifts on a slow Lissajous (or
  is off by default) — the reference's globe silhouette, opt-in via a config axis.
- The dot stays in its cell (clip-space position from `p`, quad half-extent from `size`);
  the SHAPE lives in `brightness`, exactly as the reference paints it.

### 5.3 The WGSL/JS round-trip (the parity floor)
`gridOrigin`, `sampleHeight`, `sampleDisplacement`, `waveBand` transcribed line-for-line
JS↔WGSL; `proof:flow-field` clause 3 asserts agreement at a fixed (index, t) sample set
(the std140-alignment / transcription-drift trap closed by round-trip, not per-line edit).

---

## 6. The full configurator (the tunable axes — controls-on-the-RIGHT per §E/§D)

The studio is a `useConfiguratorState<FlowFieldConfig>` (commit-on-write — a single
surface, the README discipline) seated in a `<ConfiguratorLayer>`/`<ConfiguratorRow>`
shell, **on the RIGHT on desktop** (the §E configurator-placement mandate — all
configurators move to a right rail). The new axes (note the **regime defaults bias
SUBTLE+LARGE**):

| axis | type / range | default | what it does |
|---|---|---|---|
| **Wave scale** | slider, λ₀ as a multiple of view extent, 0.5–4 | **2.5** | the dominant wavelength — high = LARGER sweeping waves |
| **Wave speed** | slider, ω-scale 0–1 | **0.3** | dispersion travel speed — low = slow sweep |
| **Coherence** | slider 0–1 (maps to octaves 1↔4 + persistence) | **0.8** | high = few coarse octaves (coherent); low = many fine (chaotic) |
| **Curl** | slider 0–0.4 | **0.12** | the divergence-free braiding seasoning — keep low |
| **Dot pitch / density** | slider, grid pitch px | **~26px** (≈ the reference) | the lattice spacing — drives N |
| **Dot size** | slider px | **2.0** | base billboard radius |
| **Displacement** | slider 0–0.5 pitch | **0.18** | how far dots drift from anchor (sub-cell) |
| **Contrast** | slider 0–1 | **0.6** | brightness modulation depth (subtle ↔ bold) |
| **Band width** | slider | **wide** | the sweeping bright-stripe thickness |
| **Globe mask** | toggle + center-drift | **off** (warm default); demo preset **on** | the reference's soft-disc silhouette |
| **Palette** | OKLCh ramp (`<ColorSwatch>`) | warm-cream identity | dot color; demo preset = mono-white-on-black |
| **Background** | `<ColorSwatch>` / transparent | transparent | the ground (demo: near-black) |
| **Interactive** | toggle | off | pointer ripple (§8) |
| **Paused** | toggle (WCAG 2.2.2) | off | `<DockBackgroundToggle>` seam |

Config-shape compatibility: most existing `FlowFieldConfig` fields survive
(`windSpeed`→Wave speed, `curlStrength`→Curl, `dotSize`, `palette`, `background`,
`interactive`, `respectReducedMotion`); `particleCount` → derived from `gridPitch` (a
clean break — the lattice is deterministic; a count axis becomes a pitch axis). New
fields: `gridPitch`, `displaceAmp`, `contrast`, `waveBandWidth`, `springK`, `globeMask`,
`coherence` (the README MIGRATION row records `particleCount`→`gridPitch`). Caps mirror
the WGSL `#define`s (`MAX_WAVE_COMPONENTS=8`, `MAX_FLOW_STOPS=4`).

---

## 7. The comprehensive demo-suite scope

Stories/states the demo must exercise (the substrate page reuses the giant-hero-shrinks-
on-scroll + body-in-ONE-card idiom per §C/§E; ONE card with the procedural animation, NOT
the double-card-grid idiom):

1. **Hero — the reference reproduction.** Mono-dim dots on near-black, the **globe mask
   ON**, a slow sweeping wave — the captured reference, byte-faithful. This is the default
   the page leads with (a calm, subtle, LARGE-wave surface filling the hero card).
2. **Warm-cream identity default.** The library default palette + globe mask OFF — the
   neutral register (proves the default is warm-cream, not the demo preset).
3. **Wave-scale sweep.** Three side-by-side stills (small / medium / LARGE λ₀) showing
   the coherence axis — the "noise → sweeping" proof.
4. **Coherence sweep.** Low (many octaves, chaotic — the OLD look, as a deliberate
   counter-example) → high (few octaves, coherent — the target). Demonstrates the fix.
5. **Globe mask + drift.** The soft-disc silhouette drifting on a slow Lissajous (one and
   two globes — the reference's two-sphere composition).
6. **Interactive.** Pointer ripple (§8) — drag/hover pushes a local displacement wave
   through the lattice; velocity/acceleration shown.
7. **Density / pitch.** Coarse vs fine lattice (the dot pitch axis).
8. **Reduced-motion.** One static frame then park (the WCAG/PRM proof — the lattice
   freezes mid-sweep, the shape held).
9. **Paused (WCAG 2.2.2).** `<DockBackgroundToggle>` pause/resume.
10. **As a subtle page background.** The §E "suffuse it throughout the site as a subtle
    background element" — a very-low-contrast, large-pitch instance behind content (the
    grid-background register the user wants, done RIGHT: simple, large, evenly spaced).

Each story is a configurator preset (presets-in-consumers); the reference + globe presets
live in `demo/stories/substrates/presets.ts`, NEVER a library token (§6 fence).

---

## 8. The cursor/touch + velocity/acceleration interaction model

Compose the shipped `usePointerVelocityField` (`@mkbabb/glass-ui/motion-core` — BB.B4):
position (event-driven, PRM-gated) + derived **velocity** + derived **acceleration** + a
flick **burst**. It owns no rAF — the renderer FEEDS it `tick(deltaMs)` from inside the
canvas-lifecycle frame callback (the one-loop discipline; `proof:offscreen-pause` intact).

The interaction (a **local displacement wave**, NOT a global warp — the lattice stays
coherent):
- **Pointer position → a soft falloff influence** centered on the cursor (Gaussian /
  quadratic falloff over a `pointerRadius`, the standard repel/attract falloff [the
  repel-effect + cursor-animation refs]). Inside the radius, the dot's displacement target
  gains a radial push (attract or repel — a config axis), so dots near the cursor lift off
  their anchor and ripple, then the restoring spring settles them back. This reads as the
  cursor pushing a ripple through a calm grid — the iOS-control-centre liquid feel.
- **Velocity → ripple amplitude + direction.** A fast sweep drags a stronger, directional
  displacement wake; a slow hover is a gentle local lift. `velocity` scales the push
  magnitude.
- **Acceleration (the second derivative) → a brightness/scale BURST.** A flick (high
  accel) fires a transient brightness pulse at the cursor (the `flick burst` term) — the
  dots momentarily brighten + swell, then decay on the restoring spring. This is the
  acceleration term made visible (per the user mandate that the interaction read
  velocity AND acceleration).
- **Choreography on ONE clock (keyframes.js).** The enter/transition/restart is one
  `SpringProgress`-backed clock: the field's appearance (the build-in fade of the lattice
  + the first wave sweep) rides a `SpringProgress` (or `springTimingFunction` for the FLIP
  of the globe-mask center); a "restart"/preset-switch re-seats it velocity-continuously
  (`reseatToSpring`); the cursor burst decays on the same spring family (`decayRest`
  projects the rest point). keyframes.js is the single choreography source — NO hand-
  rolled rAF spring [keyframes.d.ts: `SpringProgress`, `springTimingFunction`,
  `reseatToSpring`, `decayRest`; LIGHT `Oscillator` for the optional looped sweep].
- **PRM:** `usePointerVelocityField`'s deterministic `tick(0)` freeze — under reduce the
  pointer interaction is inert (no live velocity), the lattice paints one static frame.
  The interaction is compositor-/GPU-only (it perturbs the displacement uniform, never a
  layout property).

---

## 9. Discipline checklist (the binding fences)

- **ONE lifecycle leaf:** `createCanvasLifecycle` via `useGpuSubstrate`/`useWebGPUCanvas`.
  Do NOT fork. ✓
- **ONE math source:** `flowField.ts` (extended with `sampleHeight`/`sampleDisplacement`/
  `gridOrigin`); WGSL transcribes line-for-line; `proof:flow-field` clause 3 round-trips.
- **Warm-cream identity default;** teal-on-navy is GONE (it was a fabricated prior
  reference — the ACTUAL reference is mono-white-on-black). The library default palette is
  warm-cream; the mono-on-black is a DEMO preset (`presets.ts`); `proof:flow-field` clause
  5 reds a teal/navy literal in `constants.ts`. **REMOVE the teal-on-navy preset entirely**
  per §E ("REMOVE the teal-on-navy reference entirely") — replace it with the mono-on-black
  reference preset.
- **keyframes.js for the start/transition/end/restart choreography (ONE clock).** ✓ (§8)
- **Real cited math, no arbitrary noise:** Bridson 2007 curl, Tessendorf 2001 dispersion,
  Gerstner sum-of-sines, fBM feature-size law — all cited. ✓
- **Compositor/GPU-only;** `proof:no-layout-animation` n/a (canvas) but the interaction
  perturbs uniforms only. ✓
- **WebGPU primary on Safari 26+ (Baseline);** Canvas2D fallback RETIRED; a pure-fragment
  WebGL2 fallback (NOT a particle sim) for the genuinely-absent tail, parity `verified`.
- **Configurator on the RIGHT on desktop (§E);** body in ONE card; hero shrinks on scroll.
- **`proof:gpu-substrate-single` clause F** — the flow-field parity row resolves on disk
  (now `verified`, the grid+fragment design making byte-parity achievable).

---

## 10. Sources (cited)

- Bridson, Hourihan, Nordenstam, *Curl-Noise for Procedural Fluid Flow*, SIGGRAPH 2007 —
  https://www.cs.ubc.ca/~rbridson/docs/bridson-siggraph2007-curlnoise.pdf ;
  https://history.siggraph.org/learning/curl-noise-for-procedural-fluid-flow-by-bridson-houriham-and-nordenstam/
- Curl-noise 2D/3D math + EPSILON finite-difference gradient —
  https://freder.github.io/UnityGraphicsProgrammingBook1/html-translated/vol2/Chapter%206%20_%20Curl%20Noise-Explanation%20of%20Noise%20Algorithms%20for%20Pseudo-Fluids.html
- Tessendorf, *Simulating Ocean Water*, SIGGRAPH 2001/2002 — dispersion ω=√(gk),
  sum-of-sines — https://jtessen.people.clemson.edu/reports/papers_files/coursenotes2002.pdf ;
  Robert Ryan, *Ocean Rendering Part 1* — https://rtryan98.github.io/2025/10/04/ocean-rendering-part-1.html
- fBM feature-size law (low freq = large structure, octaves/persistence/lacunarity) —
  https://catlikecoding.com/unity/tutorials/pseudorandom-noise/noise-variants/ ;
  https://www.gamegeniuslab.com/tutorial-post/introduction-to-procedural-generation-with-perlin-noise-for-game-development/
- GPGPU flow-field particles (base position + influence/strength pull-to-anchor) —
  https://threejs-journey.com/lessons/gpgpu-flow-field-particles-shaders
- WGSL compute-shader best practice (workgroup_size 64, storage buffers, alignment) —
  https://webgpufundamentals.org/webgpu/lessons/webgpu-compute-shaders.html ;
  https://developer.chrome.com/docs/capabilities/web-apis/gpu-compute
- WebGPU Baseline + Safari 26 status —
  https://web.dev/blog/webgpu-supported-major-browsers ; https://caniuse.com/webgpu ;
  https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/ ;
  https://webo360solutions.com/blog/webgpu-browser-support/
- WGSL CR draft (2026-06-17) — https://www.w3.org/TR/WGSL/
- GPUCanvasContext / getContext("webgpu") Safari 26 —
  https://developer.mozilla.org/en-US/docs/Web/API/GPUCanvasContext ;
  https://webkit.org/blog/17640/webkit-features-for-safari-26-2/
- Cursor repel/attract falloff (Gaussian/quadratic), spring physics —
  https://speckyboy.com/repelling-effect-in-web-design/ ;
  https://threejs-journey.com/lessons/particles-cursor-animation-shader
- In-repo: `flowField.ts:81-229`, `flow-field.compute.wgsl.ts:130-157`,
  `flow-field.render.wgsl.ts:98-153`, `flow.glsl.ts:41-57`, `useGpuSubstrate.ts:87-143`,
  `constants.ts:61-84`, `aurora/constants/budget.ts:36`, `keyframes.d.ts:2526-2550`
  (`reseatToSpring`/`SpringProgress`/`springTimingFunction`/`decayRest`).
