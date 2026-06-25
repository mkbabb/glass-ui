# dot-flow-field — DELTA-ASSAY (golden "AURORA CURRENT" vs the current implementation)

> The LIVE golden-vs-current delta + the UNION path. Survival of the fittest: KEEP what is fit,
> REFINE what is weak, RE-INVENT what is broken. Deft integration, KISS/DRY, no legacy, no
> parallel fork. Verdict: **REFINE the topology spine + RE-INVENT the kinetic register** — the
> engine, substrate, math-twin seam, and pointer field SURVIVE; the dead-flow kernel + the
> invisible brightness model + the unmeasurable WebGL2 readback are the RE-INVENT.

---

## 0. LIVE INSPECTION (Chrome DevTools MCP, :5173, both registers, canvas readback)

Captured live on `/substrates/dot-flow-field` (artifacts in `golden/`):

| measure | warm-cream default (lead) | mono-near-black reference | floor | reading |
|---|---|---|---|---|
| backend | **`webgl2`** (NOT webgpu) | `webgl2` | — | the FALLBACK is the live path |
| `litFrac` | **0.023** | **0** (unmeasurable) | 0.06 | near-invisible / all-zero readback |
| `meanLum` | **3.03 / 255** | **0** | — | ~97% black |
| `meanChroma` | 33 (over ~50 lit px) | 0 | 18 | meaningless at this litFrac (noise) |
| `frameDelta` (3-frame) | ~2777 / 40k-sum (twinkle) | — | — | minor in-place shimmer, NOT coherent flow |
| pageBg / frameBg / hostBg | **transparent** | transparent | — | the systemic flat-field defect |
| canvas `aria-hidden` / `pointer-events` | `true` / `none` | same | — | a11y carve INTACT ✓ |

**Screenshots:** `golden/delta-field-light.png` (warm-cream lead — a faint near-invisible
warm halftone lattice over cream, monochrome, no flow), `golden/delta-field-reference.png`
(mono-near-black — visible but extremely subtle warm-white dots on near-black, static-reading,
NOT vivid, NOT flowing).

**Three live-confirmed root causes (the GOLDEN §0 union, all verified):**
1. **It is NOT a flow field.** `cs_main` (`flow-field.compute.wgsl.ts:185-186`) is the anchored
   pull `pos = mix(pos, anchorTarget, 1-exp(-springK·dt))` — advection DELETED by the BC
   retopology, dots nailed to lattice anchors, `displaceAmp 0.18` sub-half-pitch. Confirmed live:
   only minor twinkle, no coherent transport.
2. **Near-invisible + monochrome.** `dotSize 2.0` over ~26px pitch, low floor-alpha, mono-warm
   palette → a faint flat halftone. ZERO trails. Confirmed: `litFrac 0.023`, `meanLum 3/255`.
3. **(LOAD-BEARING, lens-c) the live backend is WebGL2, not WebGPU.** Despite `navigator.gpu`
   present, the picker runs the **WebGL2 fragment fallback** (`getContext('webgl2')` returns the
   live ctx). That ctx has no `preserveDrawingBuffer`, so a 2D `drawImage` readback returns
   **all-zero** on the opaque-ground register (confirmed: reference toggle → `litFrac 0`). Any
   rebuild gating WebGPU-only false-greens on the path users actually see.

**Correction to the GOLDEN's own headline (Challenge #1 R3/R4, confirmed):** the current is NOT
"functionally STATIC / identical litFrac across frames" — it twinkles (frameDelta ~2777). The
killer is *invisibility + no coherent transport*, not frozen-ness. The `meanChroma 33` reads
high but is statistically meaningless over ~50 near-black-noise lit pixels (R4 false-PASS risk).
The born-RED basis is restated accordingly below.

---

## 1. THE DELTA — survival-of-the-fittest triage (file by file)

### 1.1 KEEP (verbatim — fit, all grep-confirmed present)
| primitive | file | why it survives |
|---|---|---|
| `createGpuSubstrate` picker (WGPU→WebGL2 fall, `armAsync`/`suspend`/`resume`/`wake`/`renderAt`, offscreen-park, PRM-freeze, three-reason suspend) | `composables/glass/webgpu/useGpuSubstrate.ts` | the lifecycle leaf; no re-fork — extend the ctx attrs only |
| `contextAttrs` seam already threaded to `getContext("webgl2", attrs)` | `useGpuSubstrate.ts:79,126` → `useWebGLCanvas.ts:121,175` | the R0 `preserveDrawingBuffer` fix is a ONE-LINE addition, not a fork (live-confirmed the seam exists) |
| `usePointerVelocityField` (`.velocity`/`.speed`/`.burst`/`.active`, `tick`, PRM `tick(0)`) | `composables/motion/usePointerVelocityField.ts` | the vortex feed; already wired in `useDotFlowField.ts:86,116` — no second rAF |
| `curlFBM`/`gerstnerVelocity`/`sampleVelocity` (JS + WGSL + GLSL twins) | `flowField.ts` + `shaders/flow-field.{compute.wgsl,glsl}.ts` | the velocity field `flow` mode advects off — the ∇⊥ψ curl basis is reusable verbatim |
| `samplePaletteLin` + `OETF_WGSL`/`OKLCH_MATRICES_WGSL` (+ GLSL twin) | `flow-field.render.wgsl.ts:71` + `procedural-color.{wgsl,glsl}` | the ONE color seam — the speed→hue ramp samples through it, no WGSL↔GLSL drift |
| `MAX_PARTICLES 16384`, `MAX_FLOW_STOPS 4` | `constants.ts:25,31` | the 4-stop speed ramp FITS the existing budget — no cap change |
| `useDotFlowField` lifecycle (pause/PRM/park/wake/onFrame pointer hook) | `composables/useDotFlowField.ts` | the wiring spine; the trail/vortex thread into the existing `onFrame` |
| presets-in-consumers home | `demo/stories/substrates/presets.ts` | the technicolor preset lands here, never a library token (F5 holds) |

### 1.2 REFINE (weak — evolve in place)
- **The render pass** (`flow-field.render.wgsl.ts`): keep the instanced-billboard topology +
  additive blend (`srcFactor:"one"` already present, L180); REFINE the brightness/color drive
  from `waveBand(h)·contrast` to `speed→samplePaletteLin` hue + `speed·life` brightness for the
  `flow` register. The `field` register keeps `waveBand` verbatim.
- **`FlowFieldConfig`** (`constants.ts:42`): ADD the `mode` discriminator + the flow-mode lever
  set (clean break, mode-orthogonal — no alias). `field` reads the existing levers verbatim.
- **The demo stage** (`dot-flow-field.vue` + `presets.ts`): REFINE the flat-cream/near-black
  stage to a deep warm floor + colorful corner-bloom, full-bleed; lead with the flow register.

### 1.3 RE-INVENT (broken — clean break, no legacy)
- **`cs_main` (the `flow` branch):** advection is DELETED. RE-INVENT a `flow` branch (under a
  `mode` uniform) that integrates with momentum: `v = sampleVelocity(p,t) + pointerVortex(...);
  v = mix(v_prev, v, turnRate); p += v·dt`, decrement lifetime, density-weighted respawn on
  death/out-of-domain, write `(pos, speed, life)`. The `field` branch keeps the anchored
  evaluator BYTE-untouched (its fence holds).
- **The trail feedback buffer (ABSENT → the headline lever):** a ping-pong RGBA16F render-target
  pair (decay-blit prev→cur at α, then additive motes over it, then present). Net-new — `grep`
  for `RGBA16F|RGBA32F|HALF_FLOAT|EXT_color_buffer_float` across `src/` returns ZERO. This is a
  HONEST net-new sub-renderer (Challenge #2 R-C), not a "values-only refine."
- **The WebGL2 path (the LIVE backend) — RE-INVENT, not refine.** The current WebGL2 path is a
  single fullscreen-triangle FRAGMENT evaluator (`flow-field.glsl.ts`, `drawArrays(TRIANGLES,0,3)`)
  with NO particle population. The `flow` register needs a **state-texture GPGPU ping-pong**
  (particle state advected in a fragment pass) + a two-FBO trail ping-pong + point-sprite draw.
  This is the largest single piece of net-new work and it is on the path most users see.
- **The substrate R0 fix:** WebGL2 ctx created with `preserveDrawingBuffer:true` (or a dedicated
  readback FBO) so the gate reads real pixels. Currently the readback is all-zero on opaque ground.

---

## 2. THE UNION PATH (deft integration — KISS/DRY, one component, two modes, no fork)

ONE `DotFlowField` component, ONE `useGpuSubstrate` leaf, ONE WebGPU/WebGL2 picker — extended,
not re-forked. The retopology's anchored-lattice-with-spring **becomes the `field`-mode
evaluator** (it was always the backdrop answer); `flow` mode restores real advection off the
SAME `sampleVelocity`. The dock `dim`-idiom discipline (one schema, orthogonal lever sets) —
NOTE Challenge #1's correction: the cited `dim`-mode precedent could not be grepped; the
two-mode pattern stands on its own merits (the mode-scoped levers in §3.3 are clean), do NOT
lean on the precedent as proof.

**Step 0 (substrate, benefits every viz):** add `preserveDrawingBuffer:true` to the WebGL2 ctx
attrs (Challenge #3 R6 hardening — scope it behind a measurement/dev concern if production paint
is taxed; the narrow alternative is a `readPixels` from the trail FBO which needs no preserve
flag). The seam already exists (`contextAttrs` thread), so this is a one-line change.

**Step 1 (config):** extend `FlowFieldConfig` with `mode:"flow"|"field"` (default `"flow"`) + the
flow-mode levers (`particleCount`, `trailDecay`, `turnRate`, `speedScale`, `speedGlow`,
`lifetimeSec`, `edgeBias`, `contentMask`, `vortexRadius`, `vortexSpin`, `dragGain`, `burstShove`,
`shadowOffset`, `stretchAmp`). `field` reads `gridPitch/displaceAmp/springK/waveBand*/globeMask`
verbatim. Default `interactive:true` for the vortex. Library `DEFAULT_FLOW_CONFIG.palette` stays
WARM_IDENTITY_PALETTE (F5 holds).

**Step 2 (compute kernel):** extract the current anchored evaluator into a named
`fn cs_field(...)` (the fence-scopable unit — see §4), add `fn cs_flow(...)` with the integrator
+ vortex + lifetime + respawn; `cs_main` branches on the `mode` uniform.

**Step 3 (trail + render):** wire the RGBA16F ping-pong trail into the existing `onFrame`
(no new rAF); `flow` render = `speed→samplePaletteLin` hue + `speed·life` brightness + additive;
the cartoon-cast/squash-stretch billboard on the WebGPU instanced-quad path only.

**Step 4 (WebGL2 twin):** the state-texture GPGPU ping-pong + two-FBO trail — the SAME
advected-population gestalt as WebGPU (the spike proves a true particle ping-pong works in
WebGL2). FBO lifecycle owned in `setup`/`teardown` (rebuild on `webglcontextrestored` AND
`resize` — Challenge #2 R-C). A float-extension capability probe with a graceful fallback
(Challenge #1/#2 R-A): if `RGBA32F` is not color-renderable on the live WebKit ctx, fall the
state texture to `RGBA16F` half-float or a packed-RGBA8 fixed-point encoding. Trail pinned to
NEAREST (no LINEAR sample — `OES_texture_half_float_linear` is false even in Chrome).

**Step 5 (demo):** the AURORA CURRENT preset leads, full-bleed on a deep warm floor + colorful
corner-bloom; `mode:"field"` halftone as the toggle. **The technicolor ramp must be the
WARM-FIRE ladder (no cyan/teal) — see §3.**

---

## 3. THE BLOCKING HARDENINGS THE AMENDMENT MUST CARRY (the three challenges, FOLDED)

The golden SURVIVES but is **NOT buildable as written** — three refutations LAND and are folded
into the amendment (each is a real precept/gate collision the orchestrator confirmed):

### H1 (Challenge #3 R1 — TOP, LANDS) — the technicolor ramp REDs a LIVE shipped gate
The GOLDEN's headline 4-stop ramp is "magenta-violet → **electric cyan** → hot amber →
near-white" with a "**teal opposite** corner-bloom." Source-confirmed: `proof:teal-navy-purge.mjs`
scans `DEMO_PRESETS = demo/stories/substrates/presets.ts` + `DOTFLOW_VUE` and reds any
`OKLChStop` with hue ∈ **[180,270]** above the W-NO-GRAY chroma floor; its self-test bite is
`{L:.66,C:.13,h:205}` — essentially the GOLDEN's cyan (`vec3(0.05,0.62,0.78)` ≈ h193). The
GOLDEN's defence ("F5 guards the LIBRARY, technicolor is a DEMO preset") **refutes the wrong
gate** — the purge census scans the DEMO file too, and the AURORA preset is the DEFAULT-shown
demo state (T2 reds a default-shown in-band preset). This is the exact teal-on-navy register
BC.W-TEAL-NAVY-PURGE already DELETED.
**FOLD:** re-cast the velocity ramp to a **WARM-FIRE technicolor ladder, hue ∈ ~[20,90]**: deep
ember/oxblood (slow) → molten amber → incandescent gold → near-white bloom (fast). The opposite
corner-bloom is a **warm rose/magenta (h~330, NOT teal)**. Speed reads via luminance + warm-hue
rise (as legibly as a cool→hot ramp). Any cool accent must be chroma ≤ the W-NO-GRAY floor (a
desaturated steel highlight — the silver carve), never a saturated cyan. The gate adds a born-RED
bite planting the GOLDEN's exact cyan `{L,C,h≈193}` in the AURORA preset and asserting RED.

### H2 (Challenge #2 R-B + #3 R3 — LANDS) — the spike is monochrome-amber/white, NOT technicolor
Live hue-histogram of the spike's lit pixels: ~67% white-blowout, ~33% amber, **0% cyan, 0%
magenta**. `meanChroma 21.8` PASSES `>18` because amber alone has high `max−min` — the gate
measures *saturation*, not *hue-variety*. It is gameable by one warm hue (the same failure the
GOLDEN charges the current viz with). The cause is architecture, not tuning: the curl speed
distribution is unimodal, so motes never sample the ramp ends → 2 of 4 stops never paint.
**FOLD:** (1) gate-R4 becomes a **hue-spread + warm-fraction** metric, not a chroma magnitude:
bin lit-pixel hue, require ≥2 distinct warm buckets to clear a floor AND `warmHueFrac ≥ 0.85`
(lit pixels in [20,90]) — a single-hue OR a cool-dominant field REDs. (2) Architecture fix: with
the warm ramp, put the **modal mote speed at the ramp MIDDLE** (molten-amber) via `speedScale` +
curl tuning, so the full ember→gold→white spread paints; OR drive hue off a second field axis
(curl-direction angle / low-freq spatial hue field) so adjacent streamlines differ in hue
regardless of speed. (3) Tame the 67% white blowout: cap additive accumulation / pull the 4th
stop so highlights read as hot cores, not a white wash. The spike must be RE-RUN with the warm
ramp and clear `meanChroma ≥ 24` with margin + `warmHueFrac ≥ 0.85` before ratification.

### H3 (Challenge #1 R1 + #3 R2 — LANDS) — the math-fence carve is a DETECTOR REWRITE, not prose
`proof:viz-dotflow.mjs` **F1** is file-global, mode-blind: it reds `pos = pos + v*dt`
(forward-Euler advection) and `reseed(` anywhere in `flow-field.compute.wgsl.ts`. The `flow`
branch lives in the SAME file and IS advection + respawn → F1 fires the instant the flow kernel
lands. **F4** reds unless `flow-field.glsl.ts` exports `FLOW_FIELD_FRAG_GLSL` (a *fragment*
fallback) — in direct tension with the state-texture GPGPU.
**FOLD (a scoped REWRITE, not a deletion):** (a) extract the `field` evaluator into a named
`fn cs_field(...)` and have F1 grep WITHIN that function's brace-span (the no-advection/no-reseed
witness scoped to `field` only), NOT the file; (b) ADD a NEW born-RED witness **F1b** asserting
the `cs_flow(...)` branch DOES carry `p += v·dt` + density-weighted respawn + a vortex term (so
flow's correctness is itself gated, not merely un-gated — without F1b, retopologising F1 away
leaves the headline mechanism with no source proof); (c) retire F4's `FLOW_FIELD_FRAG_GLSL`
mandate in favour of a `FLOW_FIELD_STATE_GLSL` (GPGPU ping-pong) export requirement, with the
F3 one-math-source round-trip extended to cover the advection integrand. This is a born-RED wave
of its own (the current source REDs the new F4 state clause — no GPGPU GLSL exists yet).

### Other folds (carried, lower-severity)
- **R-A/R7 (cross-engine):** "Safari-real" is a Chrome-only spike. The R6 paired-engine gate must
  be a CAPTURED Chromium+WebKit delta artifact (per `feedback_live_verify_capture`), not a
  projected parity; the `RGBA32F` render-target fallback (→ RGBA16F/packed-RGBA8) is mandatory
  (WebKit's historical weak spot); `gl_PointSize` clamp fallback stated.
- **R-D (perf):** trail target gated to **half-res RGBA16F** (`trailScale` lever) — quarters the
  float fillrate; perf captured on a throttled profile. The cartoon-cast is the WebGPU "more"
  (drops on WebGL2/PRM/PRT) — strike the "identical on both engines" claim OR bring a cheap
  in-frag directional-disc shadow to the point path; the gestalt (flowing ribbons) is identical.
- **R-E (a11y/PRM):** the PRM still-frame must **pre-roll the trail ~30 frames** then freeze
  (a single frame-0 trail buffer reads as sparse dots, not ribbons); pin a deterministic
  freeze-time. The PRT/contrast arm **widens hue-separation + caps white**, does NOT raise
  luminance (raising it pushes into the white blowout). The corner-bloom + defined edge + true
  full-bleed must appear in the de-risk capture (the spike's `*0.55` inset → drop for full-bleed).
- **R5 (proportion):** replace bare numbers with an explicit **√φ ladder** off one anchor
  (`vortexRadius=r₀`, `bloomRadius=r₀·√φ`, `trailHalfLife=τ₀`, `lifetimeSec=τ₀·√φ²`,
  `spawnPitch=p₀`); `trailDecay` DERIVED from `trailHalfLife` + frame rate (DRY), not a free knob.
- **R4-motion (liquid-weight):** the resting current needs a slow breathing OVERSHOOT (√φ-phased
  ease-out-back, not linear drift) + squash-on-deceleration (bidirectional squash&stretch) — a
  low-`turnRate` lerp is LAG not WEIGHT; over-damped is as wrong as under-damped.
- **R6-dedup:** pin the three-dot boundary — `dot-flow-field` = streamline-advected ribbons,
  `dot-matrix` = static/anchored, `goo-dot` = metaball-merged; a gate that the three don't share a
  default preset.

---

## 4. THE FENCE CARVE (explicit — the hardest part of the union)
`flow` is a real shader-math change (integrator + vortex) → it CANNOT sit under the frozen
`proof:viz-dotflow` math-fence, which guards the `field`-mode anchored evaluator. The carve is
NOT prose — it is the F1/F1b/F4 detector rewrite of H3. The `field` branch (`cs_field`) is
byte-untouched under its (now function-scoped) fence; the `flow` branch (`cs_flow`) is a NEW
integrator gated by F1b. F5 (warm LIBRARY palette) HOLDS — the WARM-FIRE technicolor ramp is a
DEMO preset (and now passes `proof:teal-navy-purge` clean, per H1).

---

## 5. CONVERGENCE
**~62%.** The substrate, picker, math-twin seam, pointer field, color seam, and lifecycle all
ship and are FIT (the union is genuinely deft on those axes — live-confirmed). The diagnosis is
real and grounded (live readback + screenshots + backend probe + gate-source reads). But the
buildable golden owes: (a) the WARM-FIRE ramp re-cast + the warm-ramp spike RE-RUN clearing
chroma-with-margin + `warmHueFrac` (H1/H2); (b) the F1/F1b/F4 detector rewrite as its own
born-RED wave (H3); (c) the net-new state-texture GPGPU + two-FBO trail WebGL2 sub-renderer with
the `RGBA32F`→`RGBA16F`/packed fallback + the captured paired-engine WebKit artifact (R-A/R-C);
(d) the half-res trail + PRM pre-roll + √φ ladder + breathing-overshoot calibrations. These are
the build-time remaining 38%, all specified.
