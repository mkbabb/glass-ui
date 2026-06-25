# SAFARI critique — the cross-viz/glass/transition WebKit fence, ruthless + per-wave (BD viz)

**Lane** BD viz-fleet2 / critique / safari · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Scope** PLANNING audit — zero `src/` edits. WRITE-only. The angle: is **"WebGL2 IS the Safari path"** (D1)
LOAD-BEARING-VERIFIED per compute-using viz, per metallic-BRDF op, per texture-upload, per glass/transition
primitive — or do some waves have NO WebKit path / an un-verified parity claim / a silent-degrade?

**Grounded against** the shipped shaders (`metaball.wgsl.ts` · `dot-matrix.wgsl.ts` · `goo-dot.wgsl.ts` ·
`flow-field.{compute.wgsl,render.wgsl,glsl}.ts` · `aurora.{wgsl,frag}.ts`) + `src/styles/glass/squircle.css` +
the fleet2 specs (`gpu-only-architecture` · `metallic-aurora` · `dotmatrix-image` · `dot-suite-reconcile` ·
`glass-ios27-every-element` · `glass-ios27-buttons-icons-controls` · `maps-card-expand` ·
`video-liquid-transitions`) + the research (`concentric-levelset` · `papergrid-warp`) + the `arch/no-fallback-policy`.

> **Non-duplication fence:** `critique/gpu-only.md` H5/H1 already owns the headless-`"none"`-SwiftShader pixel-delta
> AND the Lockdown-Mode-Safari `"none"` edge (a locked-down Safari that returns adapter-null + software-WebGL gets
> the inert box). Those are SETTLED findings — I CROSS-REFERENCE, I do not re-litigate. THIS doc is the per-VIZ /
> per-OP / per-PRIMITIVE Safari fence the gpu-only critique did NOT descend into: the metallic BRDF ops, the dot
> texture upload, the compute-pass-vs-fragment-net reality, the goo filter, the rim/corner/@property facts.

---

## VERDICT (TL;DR)

"WebGL2 is the Safari path" is **TRUE-by-construction for the FRAGMENT-only viz** (aurora · concentric ·
paper-grid · metallic mediums) — those have a real WGSL↔GLSL twin and no compute dependency, so Safari paints
the GLSL arm. It is **TRUE-but-UNDER-SPECIFIED for the STORAGE-buffer viz** (dot-flow-field compute, dot-matrix
static-storage) — the GLSL net exists and re-derives the field analytically, BUT the plan asserts "parity verified"
on a TRANSIENT-DIVERGENT mechanism (a stateful spring vs a stateless re-eval) without confronting that the WebGL2
arm is a DIFFERENT computation that happens to settle the same. And it is **FALSE-until-built for ONE wave**:
**W-DOT-IMAGE's `texture` target is 100% greenfield with a real cross-backend luminance-divergence parity hazard**
(`copyExternalImageToTexture` ≠ `texImage2D(ImageBitmap)`: flipY / premultiply / colorspace) — there is no
shipped texture-upload anywhere in the repo, and the plan calls it "honored" / "trivial" without a parity wave.

Three Safari-BREAK or un-verified claims that must be fixed BEFORE the build:

1. **W-DOT-IMAGE texture upload** — greenfield, cross-backend-divergent, NO parity gate. (SEV-HIGH)
2. **The compute-pass viz "parity verified" claim is a category error** — a stateful spring (compute) and a
   stateless re-eval (fragment) are not the same computation; the verified-bar must read the SETTLED field, and
   the plan must NAME that the WebGL2 arm drops the per-frame inter-particle state. (SEV-MED)
3. **glass-ios27 D2 "flatter corners" mis-labels a Chromium-ONLY enhancement as a Safari-first delta** — the
   codebase's OWN `squircle.css` records "no FF/Safari 2026"; the flatter-superellipse is INVISIBLE on the
   believable-glass surface the user is critiquing ON Safari. (SEV-MED — a user-facing no-op on the target engine)

Everything else (metallic BRDF · goo filter:url sRGB · `.glass-lens` @supports · the rim light-dark trap ·
the @property transitions) is Safari-CLEAN or Safari-correctly-gated — verified below, with the one rim caveat.

---

## 1. The metallic BRDF (W-AUR-METAL) — Safari-CLEAN, one un-verified parity nuance

**The ops are all WebGL2/WebKit-safe.** The `metalSpecular` core is `sqrt` / `dot` / `pow` / `mix` / `max` over
the structure-tensor tangent + a `sampleBase`-luma gradient — every one a GLSL ES 3.0 / WGSL builtin with no
extension and no derivative dependency. The Kajiya-Kay streak `sinTH = sqrt(1 - dot(T,H)²)` and the F0=albedo
Fresnel tint are pure arithmetic. **No WebGL2-unsafe op.** The plan's §5 "FULL WGSL lockstep, no degrade-to-smooth"
is the CORRECT Safari posture (a `medium:"metal"` config on Safari 26 paints metal via the GLSL arm OR the WGSL
arm — both painted, both backends are GPU).

**The sparkle RNG determinism on WebKit-Metal — the plan ALREADY confronts it, correctly (§5 fence).** The
`uMetalSparkle` glint is a thresholded `hash21` micro-facet field. `hash21` is `fract(sin(dot)·large)` — and the
plan explicitly records that **the sparkle PATTERN may differ sub-pixel between GLSL/WGSL `hash21` rounding** and
scopes the ΔE parity bar to the MACRO field (gradient + ridge + catch-light), recording the sparkle as a
below-threshold high-freq overlay like film grain. **This is the right call and it is NOT a Safari break** — the
glint is decoration, not a load-bearing silhouette, and a per-GPU `sin()` rounding drift in a thresholded hash is
the SAME class glass-ui already accepts for `metaball.frag` film grain. The two-sided fence holds.

**The ONE nuance to harden:** the plan says the parity is "read on the MACRO field" but the WGSL-vs-GLSL `sin()`
precision divergence can also shift the THRESHOLD CROSSINGS of the sparkle (not just the sub-pixel position) —
on Metal `sin` is `relaxed`-precision by default. A sparkle that fires on Chromium-D3D but NOT on WebKit-Metal at
the same `(uv,t)` is a visible density delta, not just a position jitter. FIX: the `metal-gradient` π must assert
the sparkle DENSITY (count-per-area) is within band across backends, not just that the macro gradient matches —
otherwise "Safari paints metal" is true but "Safari paints the SAME metal" is unverified on the sparkle register.
Cheap: clamp the `hash21` to `highp`/`f32` (force-promote, no `relaxed`) in BOTH arms so the threshold crossing is
deterministic — the macro-field ΔE already needs this for the gradient anyway.

**Verdict: Safari-CLEAN.** The metallic BRDF has a real WGSL twin (FULL lockstep, the Safari-first posture) and
no unsafe op. The sparkle determinism is correctly recorded as below-threshold; ADD a density-band assert + a
force-`highp` hash so "same metal" holds, not just "metal."

---

## 2. The dot-image texture upload (W-DOT-IMAGE) — the SEV-HIGH Safari hazard

**This is the one genuinely Safari-DANGEROUS new capability, and the plan under-states it.** Both
`dotmatrix-image.md §3.2/§9` and `dot-suite-reconcile.md §5` assert the texture path is "the mandate-honored
path" / "honored" / Safari-native because it is `ImageBitmap → copyExternalImageToTexture (WGPU) /
texImage2D (WebGL2)` and "no `getContext("2d")`." That is necessary but NOT sufficient. **Two hard problems the
plan does not name:**

### 2a. There is ZERO texture-upload precedent in the repo (greenfield, not "trivial").
`grep -rn "copyExternalImageToTexture|texImage2D|ImageBitmap|createImageBitmap"` across
`src/components/custom/` + `src/composables/glass/` returns **NOTHING**. Every shipped viz is procedural — aurora,
blob, the dot suite, concentric, paper-grid sample analytic fields, never a bound texture. So W-DOT-IMAGE is the
FIRST texture sampler on EITHER backend, on BOTH backends, simultaneously. The substrate leaf
(`createCanvasLifecycle`) has no texture-binding seam; `useGpuSubstrate` exposes none. This is a net-new
cross-backend capability — `dot-suite-reconcile.md §7` even admits "the texture target needs the instanced path on
both backends" but frames it as "a recorded per-target capability," not as the greenfield parity wave it is. The
pass-1d critique (`VIZ-BAND-PLAN.md §1d dot-unify (3)`) is the ONLY place that names it "100% GREENFIELD with
cross-backend luminance divergence … a real parity wave, not trivial" — but that finding has NOT propagated into
the two research docs, which still call it honored. **The two-systems-disease on the texture path: the research
says trivial, the critique says greenfield, and the build would inherit the trivial framing.**

### 2b. `copyExternalImageToTexture` ≠ `texImage2D(ImageBitmap)` — the cross-backend luminance divergence (the BREAK).
The two upload paths differ on THREE axes that all move the sampled luminance the dots halftone:
- **flipY** — WebGL2 needs `UNPACK_FLIP_Y_WEBGL` (texture origin is bottom-left); WebGPU `copyExternalImageToTexture`
  has its OWN `flipY` option (origin top-left). Get one wrong → the image is upside-down on ONE backend. A Safari
  user (WebGL2 arm) and a Chromium user (WebGPU arm) see MIRRORED halftones unless both flips are reconciled.
- **premultiplied alpha** — `copyExternalImageToTexture` defaults `premultipliedAlpha: false`; `texImage2D` with
  `UNPACK_PREMULTIPLY_ALPHA_WEBGL` is a separate toggle. An image with alpha samples a DIFFERENT luminance per
  backend if the premultiply state diverges → the dot coverage `T = luminance` diverges → the halftone reads
  different on Safari vs Chromium.
- **colorspace** — `ImageBitmap` carries a `colorSpaceConversion` option (`createImageBitmap(blob, {colorSpaceConversion})`);
  WebGPU `copyExternalImageToTexture` does its own sRGB-vs-linear handling per the texture FORMAT
  (`rgba8unorm` vs `rgba8unorm-srgb`); WebGL2 `texImage2D` sRGB is `SRGB8_ALPHA8` internal format. If the dot
  coverage is sampled in a different gamma per backend, the mid-tones halftone differently. **This is the EXACT
  `proof:gpu-substrate-single` ΔE-divergence class the suite's whole parity discipline exists to catch — but the
  parity table only covers PROCEDURAL fields; a uploaded texture is not in the round-trip math harness.**

WebKit's `texImage2D(ImageBitmap)` is specced and supported, AND `copyExternalImageToTexture` ships on Safari 26 —
so neither path is MISSING on Safari. The hazard is not absence, it is **DIVERGENCE**: the same image produces a
different sampled-luminance field on the two backends, and the round-trip parity harness (a JS↔WGSL↔GLSL analytic
sample-set) CANNOT catch it because the texture is not analytic.

**FIX (binding):**
1. W-DOT-IMAGE owns a TEXTURE-UPLOAD parity sub-wave: ONE `uploadImageTexture(source, backend)` seam that
   reconciles flipY + premultiply + colorspace so the two backends sample the SAME luminance, with a π over a KNOWN
   test image asserting the dot-coverage field matches across backends (not just the procedural round-trip).
2. The `proof:gpu-substrate-single` parity row for the texture target reads a RENDERED capture-pair (WebGPU vs
   WebGL2 over the same test image), not the analytic round-trip — the texture is the FIRST non-analytic parity
   row and needs its own capture-pair on disk.
3. The research docs (`dotmatrix-image.md` / `dot-suite-reconcile.md`) get the "trivial/honored" framing
   CORRECTED to "greenfield cross-backend parity wave" — fold the pass-1d finding INTO them (close the
   two-systems-disease).
4. Confirm the SAFARI texture path is the WebGL2 arm (instanced billboard + `sampler2D`) — the plan says the
   texture target is "instanced-only" on both backends, which means the FRAGMENT-fallback (the fullscreen
   dot-lattice that covers the no-WebGPU tail for procedural targets) does NOT cover the texture target. So a
   no-WebGPU-but-WebGL2 Safari (pre-26, or a WebGL2-only iOS) on a `target="texture"` config hits the
   instanced-WebGL2 path — verify that path EXISTS and is not assumed to be the fragment fallback (the fragment
   fallback can't size per-dot from a sampler — the plan's own §3.5 admits this). **NAME the texture-target Safari
   path explicitly: instanced-WebGL2, not the fragment net.**

**Verdict: SEV-HIGH Safari-divergence hazard, currently mis-labeled trivial.** Not a "no Safari path" (both
uploads exist on WebKit) but a "different image on Safari vs Chrome" parity break with no gate. Must become a
named parity wave with a rendered-capture-pair row.

### 2c. The `glyph` target — the Canvas2D trap the plan already half-caught, KEEP cut on Safari grounds too.
`dotmatrix-image.md §10-Q3` correctly flags that rasterizing a glyph to an OffscreenCanvas 2D context is FORBIDDEN
by the zero-Canvas2D mandate, and pass-1d says "CUT `glyph` (a 2D-rasterize trap)." CONCUR + a Safari amplifier:
the MSDF-atlas alternative needs a build-step asset, and a WebGPU/WebGL2 render-to-texture glyph pass is a SECOND
greenfield texture path. On Safari this compounds 2b. **CUT `glyph` for BD** (book it behind the texture-parity
wave's own ≥2-consumer trigger). It is the lowest-value, highest-Safari-friction target.

---

## 3. The compute-pass viz — "WebGL2 is the Safari net" is TRUE, but the "parity verified" claim is a category error

**The fact (verified at HEAD):**
- `dot-flow-field` ships `flow-field.compute.wgsl.ts` (a `@compute @workgroup_size(64)` particle-advection kernel
  writing a `var<storage, read_write> particles` buffer) + `flow-field.render.wgsl.ts` (reads
  `@binding(1) var<storage, read> particles`) + `flow-field.glsl.ts` (a PURE fullscreen-fragment that re-derives
  the field analytically — NO compute, NO storage buffer, NO particle state).
- `dot-matrix.wgsl.ts` reads `var<storage, read> dots` — a STATIC storage buffer (written once at init, the
  phyllotaxis lattice), NOT a per-frame compute. The GLSL arm re-derives the lattice.
- `goo-dot.wgsl.ts` is a fullscreen FRAGMENT-quantize (no storage, no compute) — `fs_main`-only `fwidth`.
- So **only dot-flow-field has a per-frame COMPUTE pass**; dot-matrix has a static storage buffer; goo-dot is pure
  fragment. **No viz has "NO Safari path"** — every one has a real WebGL2 GLSL arm. D1's "WebGL2 IS the Safari
  path" is structurally TRUE for the dot suite: a compute viz has a fragment-re-eval net (per D1's own framing).

**The category error in "parity verified":** `dot-flow-field/README.md` + the research claim the compute↔fragment
parity "flips degraded → verified." But the WebGPU compute pass is a **STATEFUL critically-damped spring** —
`mix(p, target, 1 - exp(-springK·dt))` where `p` is the PREVIOUS frame's stored particle position — and the WebGL2
fragment arm is a **STATELESS analytic re-eval** that has NO previous-frame state and just evaluates `o + disp` at
the settled target. **These are not the same computation.** They CONVERGE (the spring settles to the analytic
target), so a STILL capture matches — but:
- the TRANSIENT differs (a Safari user sees the lattice snap analytically; a Chromium user sees it spring in with
  momentum). For dot-flow this is sub-perceptual (the spring settle is fast + the dots barely drift off anchor),
  so it's acceptable — BUT the plan must NAME it, not claim byte-parity.
- the "verified" parity bar MUST read the SETTLED field (a still frame after the spring settles), and the gate
  must record that the WebGL2 arm DROPS the per-frame inter-frame momentum (a recorded, accepted divergence —
  the same honesty the metallic sparkle gets). Asserting "verified" on a frame-0 transient would FALSELY red OR
  FALSELY green depending on capture timing.

**The forward hazard for W-DOT-UNIFY + W-DOT-IMAGE:** the unification (D4) folds three vizzes onto ONE rasterizer
with a `shape="wave"` ≡ dot-flow path. If the unified WebGPU arm keeps the compute-spring AND the unified WebGL2
arm keeps the fragment-re-eval, the unify INHERITS this stateful-vs-stateless divergence — and now a `target="cloud"`
curl-warped WASH FRONT (the temporal coverage front that "enters from an edge and crosses") is a per-frame
TEMPORAL gate. A temporal wash that depends on accumulated state would diverge harder than the spring (a front
position that drifts per-frame on WebGPU but re-derives per-frame on WebGL2 could DESYNC the wash). **The wash MUST
be a stateless `f(uv, t)` (a pure function of absolute time, no accumulated front position)** — the plan's
`washPhase(o, t, coverage)` IS written as stateless (`f(t)` a moving threshold over absolute `t`), which is
correct — but the gate must ASSERT statelessness (no `read_write` storage feeding the wash) so the wash reads
identically on the compute and fragment arms. **NAME this: the wash is stateless-by-construction; the compute pass
is ONLY the spring-advected lattice position, never the wash front.**

**FIX:**
1. Re-label the dot-flow (and unified) parity as "**settled-field** verified, transient-divergent-by-design (the
   WebGL2 arm is a stateless re-eval; the WebGPU compute carries inter-frame spring momentum)" — the honest claim,
   not "byte-verified."
2. The W-DOT-IMAGE wash-front gate asserts the wash is a stateless `f(uv,t)` (no `read_write` storage in the wash
   path) so it reads identically on both backends — the Safari arm must not desync the wash.
3. Confirm `dot-matrix`'s STATIC storage buffer is written identically (init-time) on both backends (it's the same
   phyllotaxis math; low risk) — but the unify must not accidentally route the static-lattice buffer through the
   per-frame compute path.

**Verdict: WebGL2 IS the Safari net (verified — every dot viz has a GLSL arm), but "parity verified" overstates a
transient-divergent mechanism.** No Safari BREAK; a HONESTY fix + a stateless-wash gate-assert owed.

---

## 4. The goo-split filter:url() sRGB — Safari-CLEAN (correctly fenced)

The dock goo-split / fission (`W-DOCK-SUBDOCK`) uses `filter: url(#…)` with `color-interpolation-filters="sRGB"`
(`DockGooFilter.vue` already speaks this). **This is the WebKit-CORRECT path and the plan fences it right
everywhere:** `gpu-only-architecture.md §2`, `video-liquid-transitions.md §5.4`, and the maps doc all distinguish
`filter: url()` (the goo, sRGB, WebKit-safe — applied to the element's OWN pixels) from `backdrop-filter: url()`
(WebKit bug 245510, FORBIDDEN as load-bearing). The sRGB `color-interpolation-filters` is the EXACT fix for
Safari's `feGaussianBlur`+`feColorMatrix` linearRGB compositing bug — the metaball threshold reads right on Metal.
**No break.** One verify-at-build: the goo-split is a CSS SVG filter (not the GPU metaball field) — pass-1's
"`useLavaField` ≥2-consumer = blob + goo-dot-matrix (the dock goo-split is a CSS feGaussianBlur, INCOMPATIBLE
mechanism)" correctly keeps the CSS-goo and the GPU-SDF-lava as DISTINCT mechanisms; do not let a future agent
fold the CSS goo onto the GPU lava (they have different Safari profiles — the CSS filter is the safe one, the
GPU lava rides the substrate). **Verdict: Safari-CLEAN, correctly fenced.**

---

## 5. The `.glass-lens` @supports gate — Safari-CLEAN; the LENS-RASTER-PURGE migration is the watch

`.glass-lens` rides `@supports (backdrop-filter: url(#…))` so off-Chromium paints the un-gated blur+tint base
alone (the documented W-LENSING floor). On Safari the `backdrop-filter: url()` is UNSUPPORTED, so the refraction
silently drops to the plain blur+tint — **the CORRECT graceful degrade (it's an enhancement over the cross-engine
floor, not a load-bearing path).** The fleet2 docs are consistent (`glass-ios27-buttons-icons-controls.md §5.3`:
"the `:liquid` SVG lens stays Chromium-only with the un-gated blur+tint Safari floor … NO control/button depends
on the SVG lens for its glass read"). **No break.**

**The watch — `BD.W-LENS-RASTER-PURGE` (gpu-only §6):** the plan MIGRATES `useGlassRenderer`'s Canvas2D Snell-bake
→ the `.glass-lens` crossed-CSS-gradient `data:` URI. This is LIVE in `GlassPanel.vue`/`DockGooFilter.vue`. The
crossed-gradient encoding is the `feDisplacementMap` SOURCE for `backdrop-filter: url()` — which is STILL
Chromium-only. So post-migration, `GlassPanel`'s refraction is STILL Safari-degraded-to-plain-blur (the same as
today's Canvas2D-baked map, which also fed `backdrop-filter: url()`). **The migration does NOT change the Safari
read** (both old + new feed a Chromium-only `backdrop-filter: url()`) — but the plan must NOT claim the
crossed-gradient encoding makes the lens Safari-paintable. It does not; the lens REFRACTION is Chromium-only by
the `backdrop-filter: url()` substrate, regardless of whether the displacement map is Canvas2D-baked or
CSS-gradient-encoded. The Safari floor stays the plain blur+tint. CONFIRM the migration's gate asserts the Safari
floor is byte-identical pre/post (not that the lens now paints on Safari).

**Verdict: Safari-CLEAN (correct degrade); the LENS-RASTER-PURGE must not over-claim Safari refraction.**

---

## 6. The iOS-27 glass rim (D3) — Safari-CLEAN, the light-dark() inset trap CORRECTLY pre-empted

`glass-ios27-every-element.md §3 D3` + `§5` lift `--glass-rim-top` 0.30→0.40 light + ADD a `--glass-rim-bottom-light`
bright lower catch. The mechanism is pure `box-shadow` inset stops — **WebKit-native, no gap.** The fence is the
EXACT MEMORY trap: "**plain per-mode arms — NEVER an inset fragment inside `light-dark()`** (light-dark() round an
inset computes the whole box-shadow to none — the MEMORY trap)." This is the
`feedback_lightdark_inset_shadow.md` lesson, correctly cited and pre-empted. **No break.** The fleet2 doc and the
buttons doc both carry it; the gate must include the `light-dark()`-inset source-bite the doc names. **Verdict:
Safari-CLEAN; the trap is correctly fenced — ensure the bite ships.**

ONE legibility caveat (not Safari-specific but it lands on the believable-glass Safari surface the user critiques):
the brighter rim α must stay below the text-AA-eating threshold over a busy backdrop (the doc books this to the π).
On Safari the `backdrop-filter: blur()` saturate-halo + the brighter rim COMPOUND at the corner (the
`W-CORNER-AA-WIDEN` `clip-path: inset(0 round …)` defect the 2026-06-22 screenshot shows) — verify the brighter
rim does not worsen the un-clipped corner halo on WebKit BEFORE W-CORNER-AA-WIDEN lands (sequence W-CORNER-AA-WIDEN
BEFORE the rim lift so the brighter edge reads clean, not jaggy — the doc §4 says corner-AA is "the prerequisite
for the flatter-squircle reading clean" but the same applies to the brighter RIM).

---

## 7. D2 "flatter corners" — a Chromium-ONLY enhancement mis-framed as a Safari-first delta (SEV-MED no-op)

**This is the loosest Safari claim in the glass fleet.** `glass-ios27-every-element.md §3 D2` + the buttons doc
§1.2 propose a per-register `--glass-superellipse-n` so controls read FLATTER via `corner-shape: superellipse(n)`,
framed under "the whole fleet is … Safari-first." **But the codebase's OWN `src/styles/glass/squircle.css` records
the truth: `corner-shape: superellipse()` is "Chrome 139+ … no FF/Safari 2026" — an `@supports`-gated ENHANCEMENT
over the `border-radius` round CONTRACT.** So:
- The flatter-superellipse is **INVISIBLE on Safari** (the `@supports (corner-shape: superellipse(2))` block does
  not match on WebKit → the surface stays the `border-radius` round floor).
- The user's ios27-a critique ("flatter tops and sides … edges still too dark to believe they're glass") is read
  on a Safari-class reference (Apple's own iOS-27). **Shipping the flatter-corner as a `corner-shape` superellipse
  delivers ZERO of the requested flattening to the very engine the user is comparing against.** The believable-glass
  bar (D3 rim + D2 corner) loses its D2 half on Safari.
- The doc's §3 D2 "Fence: Safari-first — the `@supports` gate keeps the `border-radius` floor on WebKit" is
  CORRECT as a no-BREAK statement (nothing crashes) but DISHONEST as a "Safari-first" claim (the FEATURE is absent
  on Safari — "first" implies it lands there).

**This aligns with the pass-1d finding** ("`W-SQUIRCLE` is PHANTOM — AX.W56 removed the squircle from buttons as
imperceptible; flatter-corners = a RADIUS reduction → folds into W-CORNER-AA-WIDEN, NOT a superellipse"). The
SAFARI angle SHARPENS it: even if W-SQUIRCLE weren't phantom, the superellipse mechanism is Chromium-only, so the
ONLY way to deliver "flatter corners" to Safari is a **plain `border-radius` reduction** (a smaller radius on the
control register) — which IS cross-engine and IS the user's literal "flatter tops/sides." FIX: D2 becomes a
`border-radius`-token reduction on the control register (Safari-cross-engine), with the `corner-shape` superellipse
as the OPTIONAL Chromium-only continuous-corner refinement OVER it — NOT the primary mechanism. The believable-glass
bar must read on Safari via the radius, not the (Safari-absent) superellipse.

**Verdict: SEV-MED — D2 mis-frames a Chromium-only feature as Safari-first; the flatter-corner must ride a
cross-engine `border-radius` reduction to reach Safari at all.**

---

## 8. The maps/card-expand + the 4 video transitions — Safari-CLEAN (@property Baseline confirmed)

All four transitions + the card-expand are compositor-only: `transform`/`opacity`/`filter: blur()` (the surface's
OWN pixels, never `backdrop-filter: url()`) over a one-time-RESERVED footprint, with REGISTERED `@property`
scalars (`--liquid-morph-t` · `--glass-drawer-t` · `--maps-backdrop-dim` · `--tab-blob` · `--stretch` ·
`--glass-ambient-strength`) so they INTERPOLATE. **`@property` is Baseline-Newly-available and ships on WebKit/Safari
16.4+ (well before 26)** — the plan's "Baseline on WebKit 26" is conservative-correct (it's actually been on Safari
since 16.4, so the floor is even safer than claimed). The `.scroll-cascade` content build is under
`@supports (animation-timeline: view())` + PRM (Safari lacks scroll-driven timelines at 26 → degrades to terminal
fade, never broken — the doc fences it). The drag uses kf `Draggable` (pointer-capture `transform`, WebKit-native).
PRM-safe by construction (`respectReducedMotion` verified in the shipped primitives). **No backdrop-filter:url(),
no animated layout property, no compute.** The video-transitions §5 cross-cutting fence is rigorous and correct.

ONE watch: `--maps-backdrop-dim` reads `filter: brightness()` + `transform: scale()` on the BACKDROP element — if
the backdrop is the live aurora `<canvas>`, a `filter: brightness` on a WebGL canvas is a compositor op (fine on
Safari) but COMPOUNDS with the canvas's own paint; verify the dim reads on a STATIC backdrop (the doc Q5 recommends
the static satellite image, which sidesteps this) — on Safari a `filter` over a live GL canvas can force a
non-accelerated composite. RECOMMEND the static-image backdrop for the maps demo (the doc already leans this way).

**Verdict: Safari-CLEAN. `@property` is actually safer than the plan claims (Safari 16.4, not 26).**

---

## 9. The fragment-only viz (aurora · concentric · paper-grid) — Safari-SAFE by construction (verified)

- **concentric** (`concentric-levelset.md §0`): "full-screen-triangle fragment shape-class (no vertex/storage
  buffer — the lightest GPU path) … STAYS pure WebGPU-primary / WebGL2-fallback, both the same fragment pass …
  NOTHING to delete (no `getContext("2d")`)." The IQ `contourInk` uses `fwidth` — a fragment-stage builtin, valid
  in BOTH GLSL ES 3.0 and WGSL (the `metaball.wgsl.ts` header confirms "the WebGPU derivative builtins are
  fragment-only, exactly as GLSL"). **Safari-safe.**
- **paper-grid** (`papergrid-warp.md §1`): "fullscreen-triangle, NO vertex/compute/storage buffer (the LIGHTEST
  viz)" + Golus `fwidth` AA (fragment-stage). **Safari-safe.**
- **aurora**: WGSL primary + GLSL twin, fullscreen fragment, no compute. The metallic mediums (§1) extend the
  fragment dispatch. **Safari-safe.**

These three are the EASY case — no compute, no storage, no texture, real WGSL↔GLSL twins. D1's "WebGL2 is the
Safari path" is TRUE-by-construction here. **The shared `field/` engine (D2) must keep the WGSL+GLSL twin pair per
chunk** (the `flow.{glsl,wgsl}.ts` precedent) — a `noise.glsl.ts`/`wave.glsl.ts` that ships only `.wgsl` would
BREAK the Safari fragment arm. The field-engine critique (`critique/field-engine.md`) owns the DRY shape; the
SAFARI rider: **every shared field chunk MUST ship the `.glsl` twin, or the fragment-only viz lose their Safari
arm.** Gate-assert the twin-pair completeness on the new `field/` chunks (the `proof:wave-field-single` should
include a "every shared chunk has both `.glsl` AND `.wgsl`" clause — a Safari-net-completeness assert).

**Verdict: Safari-SAFE. ADD a twin-pair-completeness clause to `proof:wave-field-single`.**

---

## 10. The `fwidth` WGSL-uniformity hazard (Safari/Tint) — already navigated, KEEP the discipline

A real WebKit/Tint hazard the codebase ALREADY confronts: WGSL **uniformity analysis rejects `fwidth()`/`dpdx`/`dpdy`
reached only through non-uniform control flow** (a derivative inside an `if`/early-`return` predicated on
per-fragment data is a compile ERROR on a strict implementation — Safari's Metal-WGSL is strict). `metaball.wgsl.ts`
explicitly hoists `fwidth(d)` into uniform top-level control flow ("WGSL uniformity analysis rejects a `fwidth()`
reached only through a return predicated on …") and `goo-dot.wgsl.ts` fences "fwidth lives in `fs_main` ONLY."
**This is the right discipline and it must propagate to EVERY new WGSL viz** — the unified `<DotMatrix>` rasterizer,
the metallic medium, the W-DOT-IMAGE texture sampler (a `textureSample` in non-uniform flow has the SAME
uniformity constraint on Safari). FIX: the `proof:gpu-substrate-single` (or a new viz-WGSL lint) must assert NO
derivative/texture-sample builtin sits behind non-uniform control flow in any new `.wgsl` — a Safari-compile bite.
A WGSL viz that compiles on Chromium-Tint-relaxed but ERRORS on Safari-Metal-strict is a Safari BREAK that
device-free gates miss (it needs a real WebKit compile). **Verdict: a real Safari hazard, already navigated in the
shipped shaders; the new WGSL must inherit the hoist discipline + a gate-bite.**

---

## 11. Summary ledger (the per-wave Safari verdict)

| wave / surface | Safari path | verdict | fix owed |
|---|---|---|---|
| **W-AUR-METAL** (BRDF + sparkle) | FULL WGSL lockstep + GLSL twin; no unsafe op | CLEAN | sparkle DENSITY-band assert + force-`highp` hash (so "same metal," not just "metal") |
| **W-DOT-IMAGE texture** | both uploads exist on WebKit, but DIVERGE (flipY/premul/colorspace); greenfield, no parity gate | **SEV-HIGH** | texture-upload parity sub-wave + rendered-capture-pair row + correct the "trivial" framing + name the instanced-WebGL2 Safari path + CUT `glyph` |
| **W-DOT-UNIFY / dot-flow compute** | every dot viz has a GLSL arm (compute→fragment re-eval); WebGL2 IS the Safari net | CLEAN path, **MED honesty** | re-label "settled-field verified, transient-divergent-by-design"; assert the wash is stateless `f(uv,t)` |
| **goo-split filter:url() sRGB** | WebKit-safe `filter:url()` + sRGB color-interp | CLEAN | keep CSS-goo + GPU-lava DISTINCT (different Safari profiles) |
| **`.glass-lens` @supports** | Chromium-only refraction over Safari blur+tint floor | CLEAN | LENS-RASTER-PURGE must not claim Safari refraction (still `backdrop-filter:url()`) |
| **iOS-27 rim (D3)** | pure box-shadow inset, per-mode arms | CLEAN | ship the `light-dark()`-inset bite; sequence W-CORNER-AA-WIDEN before the rim lift |
| **iOS-27 flatter corner (D2)** | `corner-shape: superellipse()` is Chromium-ONLY (`squircle.css`: "no FF/Safari 2026") | **SEV-MED no-op** | deliver flatter via cross-engine `border-radius` reduction; superellipse is the Chromium-only refinement OVER it |
| **maps/card-expand + 4 transitions** | compositor + `@property` (Safari 16.4+) | CLEAN | static-image maps backdrop (avoid `filter` over live GL canvas) |
| **concentric / paper-grid / aurora** | fullscreen fragment, WGSL↔GLSL twins, no compute/storage/texture | SAFE | `proof:wave-field-single` twin-pair-completeness clause |
| **all new WGSL** | `fwidth`/`textureSample` uniformity (Safari-Metal strict) | hazard, navigated | hoist-discipline gate-bite (real-WebKit-compile, device-free misses it) |
| **headless `"none"` / Lockdown Safari** | — | (owned by `gpu-only.md` H1/H5) | CROSS-REF — not re-litigated here |

---

## 12. The load-bearing answer to the assigned question

**Is "WebGL2 is the Safari path" LOAD-BEARING-VERIFIED per compute-using viz?** — YES for the EXISTING dot suite
(every viz has a real GLSL arm; the lone compute pass — dot-flow — has a fragment re-eval net per D1; dot-matrix's
storage buffer is static; goo-dot is pure fragment). **No compute-using viz has NO Safari path.** BUT the "parity
verified" claim is a category error on the stateful-spring-vs-stateless-re-eval divergence (transient differs;
settled matches) — a HONESTY fix, not a break.

**Where does a wave have NO WebKit path / an un-verified claim?**
1. **W-DOT-IMAGE texture** — both backends paint, but DIFFERENT images (the parity break), with no gate. The
   highest Safari risk in the band, mis-labeled trivial. (And `glyph` should be CUT.)
2. **iOS-27 D2 flatter-corner** — the `corner-shape` mechanism is absent on Safari; the believable-glass D2 half
   delivers nothing to the engine the user is comparing against unless it rides a `border-radius` reduction.
3. **The sparkle determinism** (W-AUR-METAL) + the **`fwidth` uniformity** (all new WGSL) — both real Safari-Metal
   hazards the SHIPPED code navigates but the NEW waves must inherit with gate-bites, or a device-free-green wave
   Safari-compile-errors or paints-a-different-sparkle.

The metallic BRDF, the goo filter, the `.glass-lens` gate, the rim, and the 12 compositor transitions are
Safari-CLEAN or correctly-gated. The fragment-only viz are Safari-SAFE by construction. The fence holds EXCEPT the
texture upload (build it as a parity wave), the D2 corner (deliver via radius, not superellipse), and the two
Safari-Metal hazards (gate-bite the sparkle density + the WGSL uniformity).
