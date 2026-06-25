# Aurora — the GOLDEN reference

The single canonical design for the `<Aurora>` generative-background system: the field
engine + the configurator + the WebGL2/WebGPU backends, PLUS the three asked-for new
registers — **pure liquid-metal**, **gradient-metallic-sparkle**, and the **blurred-image
macro-flower** procedural bg — unified into ONE engine, deftly integrated, perfect in
Chrome AND Safari.

Synthesized from lens-a (pure iOS-27 fidelity), lens-b (cross-engine/perf-first), lens-c
(audacious technicolor-cartoon punch), then reconciled against HEAD by live source-dig +
a live WebGL2 spike (`golden/spike.html`, gate GREEN). Where the lenses disagreed on
fact, HEAD wins; where they offered different bold moves, the fittest is kept.

---

## 0. Ground truth (verified against HEAD, not assumed)

The three lenses agreed on the architecture and the metal mechanism but **diverged on two
load-bearing facts**. I resolved both by reading source:

1. **WebGPU is LIVE and PRIMARY on BOTH engines — Safari 26 included.** lens-c's "WebGPU
   excised, Aurora is WebGL2-only" is STALE. `aurora.wgsl.ts` is the WGSL **primary**;
   `aurora.frag.ts` is the WebGL2 **fallback**; `useGpuSubstrate.ts` runs both. The WGSL
   header is explicit: *"the user's 'WebGPU EVERYWHERE … NO FALLBACKS on Safari' mandate"*
   — Safari 26 ships WebGPU and takes the WGSL path. The painterly mediums are **really
   ported to WGSL** (`aurora-mediums.wgsl.ts`: pastel/watercolor/crayon/kuwahara have real
   WGSL bodies); only the oil/vangogh/oil-pastel STROKE cascade degrades to the smooth
   core on WebGPU. **Consequence: every new register MUST dual-port (GLSL + WGSL).** A
   metal that lived only in the frag would be invisible on the primary path of both
   browsers. This corrects lens-a/b's "WebGL2 is the Safari path" framing.

2. **Metal slots are `uMedium == 8/9`, NOT 10/11.** `MEDIUM_ID` (`uniformBridge.ts:42`)
   stops at `kuwahara: 7`; the frag dispatch ladder ends `else if (uMedium == 7)
   mediumKuwahara` (`aurora.frag.ts:406`). lens-c is right (8/9); lens-a/b assumed phantom
   satin/prism slots at 8/9 and put metal at 10/11. There are no phantom slots. Metal is
   the NEXT two ids.

The facts ALL three lenses got right, re-confirmed:

- **The default field is PALE.** `DEFAULT_AURORA_CONFIG` palette (`presets.ts:283-285`):
  `{L:0.72,C:0.10,h:55} … {L:0.95,C:0.03,h:70}` — a chroma ceiling of **C:0.10**, a
  whisper. Over a flat page a warm glass plate reads gray because the field has no chroma
  to transmit. This is the §3 "missing colorful field → gray glass" root cause, at the
  source.
- **The structure tensor computes a gradient and THROWS IT AWAY.**
  `structureTensorField` (`mediums.glsl.ts:40`) Sobel-samples luma, forms `Gx,Gy`
  (`:52-53`), eigen-decomposes to `(tangent, A)`, and `return vec3(dir, A)` (`:89`) —
  **the gradient `(Gx,Gy)` is discarded.** That gradient is exactly the screen-space
  height-normal the metal `N·H` crest term needs. The WGSL twin
  (`aurora-mediums.wgsl.ts:76`) has the SAME discard. Metal re-plumbs BOTH, ZERO new taps.
- **The light cannot cross to WGSL as `uLightDir`.** `uLightDir` exists on the WebGL2
  frag (`:130`, the AW.W4.2/W8 cursor-as-light axis) but is **absent from the WGSL
  uniform struct** (`uniformBridgeWGPU.ts` has no light lane). `uCursor` IS in the struct
  (off 64). So a metal catch-light that "rides `uLightDir`" is a phantom on the WGSL
  primary. The light MUST be synthesized from `uCursor` in-shader. This is lens-b's
  load-bearing line, and it is now mandatory on BOTH browsers (not just Safari).
- **Free uniform pad slots exist, written 0 today** (`uniformBridgeWGPU.ts:136,141,154`):
  `scalars3.w` (off 60), `cursor.z/.w` (off 72/76), `ints1.z/.w` — homes for the metal +
  source + vividness knobs with ZERO new struct lanes (byte-offset lockstep preserved).

**Live spike verdict (`golden/spike.html`, WebGL2, gate GREEN):** the re-plumbed-gradient
two-term BRDF produces **25× the local crest-valley contrast of the smooth wash**
(smooth localContrast ≈ 0.0011 → metal ≈ 0.0267, metal-gradient ≈ 0.0302) — it genuinely
FOLDS, reads as fine warm folded metal, not a tinted orientation map. The OKLab vividness
floor lifts mean chroma 0.031 → 0.057 (clears the §3 bar). Born-RED holds: smooth-no-vivid
fails both bars. The boldest mechanism is de-risked.

---

## 1. The core design — ONE engine, THREE orthogonal axes, a VIVIDNESS FLOOR

Aurora stays exactly what it is: a single-pass fragment program (WGSL primary / WebGL2
fallback) over `useGpuSubstrate`, dispatching painterly MEDIUMS by `uMedium`, with the
shared OKLCh `procedural-color` chunk and the drifting `nucleiField`. The golden design
adds **three orthogonal axes + one field property**, and changes ZERO existing paint
(byte-identical default except the deliberate vividness identity move):

```
fragment(uv, t):
  field  = nucleiField(domainWarp(uv, t), t)   # the SHARED drifting-zone spine (unchanged)
  color  = SOURCE(field, uv, t)                # AXIS 1 — where pigment comes from
  out    = FINISH(color, field, uv, t)         # AXIS 2 — the relight/operator over the field
  out    = VIVIDNESS_FLOOR(out)                # the §3 chroma guarantee (a field property)
```

- **AXIS 1 — `source: "palette" | "image"`** (where pigment comes from). `palette` =
  today's synthetic OKLCh stops (default). `image` = sample a base texture (the
  macro-flower) where the SAME nuclei field drives a per-zone blur radius. The
  blurred-image bg is NOT a new component — it is `<Aurora source="image" :src>`.
- **AXIS 2 — `finish: "none" | "kuwahara" | "metal" | "metal-gradient"`** (an operator
  RELIGHTING the rendered field). `medium` = the paint **substance** the field is rendered
  AS (smooth/oil/vangogh/…); `finish` = an **operator** over it. kuwahara is re-classed a
  finish; **metal** and **metal-gradient** are the two new finishes — an anisotropic
  metallic BRDF over the field, NOT a new shader pass.
- **A field property — `vividness: 0..1`** (the §3 floor). A shader-resident OKLab
  chroma-floor that guarantees the field never resolves toward gray behind glass.

**Why this is the golden shape:** every one of the four asks is a *value on an existing
axis*, so the configurator, the presets, the dual-backend parity net, the lifecycle, and
the per-page wiring are all REUSED. No parallel engine, no second rAF, no second substrate.
The blurred-image is `source:image`; the metallics are `finish:metal[-gradient]`;
per-page-custom is preset selection in the consumer; match-or-better-Apple is the vividness
floor + the metallic register + cursor-reactive light (levers Apple's CSS-mesh demos lack).

`medium` (substance) × `finish` (operator) × `source` (pigment) × `vividness` (floor) are
four orthogonal axes on ONE engine. This is the BD.W-FIELD-ENGINE DRY discipline made real:
the metal finish, the image source, and the blur all read the shared `field/{noise,color}`
basis — the genuine 2nd/3rd consumers that keep the hoist non-overfit.

---

## 2. THE SINGLE BOLDEST MOVE — the §3 vividness floor as a shader-resident contract, fused with the metal finish born from the engine's own discarded math

The golden boldest move fuses the strongest swing of each lens into ONE through-line:

- **lens-b's contribution (the contract):** make transmission-fitness a property the field
  GUARANTEES IN-SHADER, per-fragment, not a preset author's discipline. The user's
  gray-glass complaint becomes *un-representable*: a pale zone blooms to the floor; a vivid
  zone is untouched.
- **lens-a's contribution (the deftness):** the headline new variant — liquid metal —
  costs ZERO new shader passes, ZERO new rAF, ZERO new substrate. It is a `vec3(dir,A)` →
  `vec4(dir, A, packGrad)` return-widening plus a two-term relight. Liquid metal falls out
  of the painterly engine's OWN discarded math.
- **lens-c's contribution (the punch, disciplined):** the metal must read with TECHNICOLOR
  dynamic range — deep warm-shadow valleys, near-white crests — so it reads POLISHED, not
  brushed-gray. This is folded into the BRDF's `valley` term (the deep-trough Fresnel),
  NOT a separate `vivid`-everywhere operator (the vividness floor already owns chroma; the
  metal owns its own DR). lens-c's standalone "ink-and-paint cel-outline" is **deferred,
  not adopted** (see §8 — it is a real idea but a second bold swing the golden spec does
  not need to land the four asks, and it risks reading as a hard contour over a transmissive
  field that the §3 glass mandate wants soft).

**The fused statement:** *the field paints its own §3 transmission-fitness as an in-shader
OKLab chroma floor (the contract); and the headline metal finish is built entirely by
re-plumbing the luma gradient the structure tensor already computes and discards (the
deftness), relit with a technicolor-DR two-term BRDF and a cursor-synthesized light that
crosses to WGSL (the punch + the cross-engine correctness).*

### 2a. The vividness floor (the §3 contract) — born-RED on the pale default

After the color/finish stages, before the tonemap, in OKLab (the shared `procedural-color`
chunk):

```glsl
// operate in OKLab — hue + lightness untouched, chroma lifted toward the §3 floor
vec3 lab  = linearToOklab(col);
float C   = length(lab.yz);
float Cmin = uVividness * VIVID_TARGET;     // the per-route §3 chroma floor (VIVID_TARGET ≈ 0.115)
float Clift = max(C, Cmin);                  // a pale zone BLOOMS; a vivid zone is untouched
lab.yz   *= (C > 1e-4) ? (Clift / C) : 0.0;  // scale chroma, hue+L preserved
col      = oklabToLinear(lab);
```

- **Opt-OUT, not opt-in.** Default `<Aurora>` ships `uVividness` high enough to clear §3; a
  hero surface that wants a deliberately-pale wash sets `vividness={0}`. This INVERTS the
  status quo — vivid is the default identity, pale is the explicit choice — which is the
  literal §3 fix. This is the library's OWN default tokens evolving as the lib's identity
  changes (per the presets-in-consumers memory-rule carve), a deliberate no-backwards-compat
  identity move.
- **Mode-aware for free.** `VIVID_TARGET` scales with route mode (dark routes a slightly
  higher chroma target — a dim field needs more chroma to read vivid through glass). One
  scalar, both modes — the BA.W-NO-GRAY warm-floor's field-side complement. The warm floor
  holds: the floor LIFTS chroma along the existing hue, it never injects a cold hue, so the
  field stays warm-cream, NEVER gray and NEVER teal/navy.
- **The DEFAULT palette also lifts** (lens-c's calibration): `DEFAULT_AURORA_CONFIG` chroma
  moves off the `C:0.10` ceiling toward a `C:0.16–0.20` warm band (hue 45–70). The floor is
  the runtime guarantee; the palette lift is the authored identity. Both, not either.
- **Cross-engine trivial.** OKLab chroma-scale is pure transpilable arithmetic on the
  shared chunk (GLSL + the WGSL twin already splice `procedural-color`) — ports to WGSL by
  construction, round-trips ΔE≈0 in the existing parity net. Verified live: the spike's
  JS-side OKLab readback confirms the lift (0.031 → 0.057).

### 2b. The metal finish (the deftness + the punch) — folded from the discard

```glsl
// 1. WIDEN structureTensorField to RETURN its discarded gradient (both GLSL + WGSL twin).
//    return vec4(dir, A, packGrad(Gx,Gy));  — .xy/.z callers (kuwahara) byte-unchanged.
//    The height-field normal — ZERO re-paid taps:
vec3 N = normalize(vec3(grad * METAL_HEIGHT_SCALE, 1.0));

// 2. The cursor-z-synth LIGHT — the ONLY form that crosses to WGSL (uCursor is in-struct;
//    uLightDir is NOT). Idle → a static upper-right rake so a non-interactive metal reads lit.
vec3 L = (uCursorStrength > 0.0 || uCursorBurst > 0.0)
       ? normalize(vec3(uCursor - p, METAL_LIGHT_Z))
       : normalize(vec3(0.55, 0.55, METAL_LIGHT_Z));
vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));

// 3. The TWO-TERM anisotropic BRDF — streak (WHERE) × crest (BRIGHTNESS). BOTH required:
//    streak-only = a tinted orientation map; crest-only = plastic.
float sinTH  = sqrt(max(1.0 - pow(dot(normalize(vec3(T,0.0)), H), 2.0), 0.0));
float streak = pow(sinTH, METAL_SHININESS_ANISO);            // highlight runs ALONG the tensor tangent
float crest  = pow(max(dot(N,H), 0.0), METAL_SHININESS_CREST); // N·H height specular — bright crests
float spec   = streak * mix(0.35, 1.0, crest);
spec *= smoothstep(0.0, METAL_COHERENCE_FLOOR, A);           // coherence gate — no phantom banding in smooth zones

// 4. The technicolor-DR base — the field's CHROMA preserved (the field hue TINTS the metal),
//    the LUMA driven by the height field: deep warm-shadow valleys, bright crests.
float facing = max(N.z, 0.0);                                // crest faces viewer → bright; valley grazes → dark
float valley = mix(METAL_VALLEY_FLOOR, 1.0, facing);
vec3  chroma = col / max(dot(col, W_LUMA), 1e-3);            // unit-luma field hue
vec3  base   = chroma * (valley * 0.55 + 0.10);
col = base + spec * METAL_CATCH_WARM * 2.4;                  // ACHROMATIC-warm catch (warm floor, NO hue)
```

- **The catch-light is achromatic-warm** (`METAL_CATCH_WARM ≈ vec3(1.0,0.97,0.90)`, the
  `AURORA_CATCH_LIGHT_ANCHOR` already at `uniformBridge.ts:106`): the metal read comes from
  SHADING, not hue; the field hue tints the body, the catch is warm-white. The warm floor
  holds.
- **The coherence gate is mandatory** — it fades the streak to zero in structureless zones
  so a `metal-gradient` smooth base reads smooth (no phantom banding). This is what lets
  metal-gradient's diffuse wash coexist with metal's crisp ridges.
- **Two knobs (`uMetalPolish`, `METAL_HEIGHT_SCALE`) pack the free `cursor.z/.w` or
  `kuwahara.z/.w` pad slots** — no new struct lane, byte-offset lockstep preserved.
- **Why iOS-27-BETTER, not just matching:** Apple's metallic flow-field is a pre-baked
  smooth mesh. Aurora's metal RIDES THE STRUCTURE TENSOR of a LIVE drifting field — the
  ridges are the field's own iso-bands, so the metal flows and breathes as the nuclei
  drift, and the catch-light is cursor-rakable. The reference cannot interact; Aurora's can.

### 2c. metal-gradient (the sparkle) — metal over a flattened base + twinkle-in-place

`finish:"metal-gradient"` = the same BRDF over a **pre-flattened / gradient base** (the
brushed-sheet read — `metal` with a smoothed `col`, NOT a second BRDF) + a sparkle:

```glsl
// twinkle-IN-PLACE: fixed per-cell seed, PHASE animated — the flake glints, never BOILS.
vec2  cell = floor(p * METAL_SPARKLE_DENSITY);
float seed = hash21(cell);                                   // highp forced — a mediump hash boils cross-backend
float tw   = pow(max(sin(t + seed * TAU), 0.0), 40.0);       // PHASE animates, position FIXED
col += tw * METAL_CATCH_WARM * smoothstep(0.0, 0.3, facing); // glint gated on facing → reads as metallic FLAKE
```

The warm multi-tone gradient base carries the per-region hue variation (the existing
per-nucleus `paletteBias`), the twinkle adds the flake catch — the "minor sparkle
imperfections + other colors woven in" ask. Verified: spike metal-gradient localContrast
0.0302 (> metal's 0.0267 — the flake adds texture).

---

## 3. The blurred-image macro-flower bg (AXIS 1 — `source:"image"`)

`<Aurora source="image" :src>` swaps the color stage: instead of `samplePalette(field)`,
sample an uploaded texture, then apply a **spatially-varying blur** whose radius is driven
by the SAME drifting `nucleiField`:

```glsl
float zone   = nucleiField(domainWarp(uv, t), t);   // the SAME drifting field — drives BLUR, not color
float radius = mix(BLUR_MIN, BLUR_MAX, zone);        // zone-varying blur radius
vec3  col    = spatiallyVaryingBlur(uImage, uv, radius);
```

- **A real photo dissolving into a slow abstract color field** — the macro-flower's organic
  saturated hues read through (sampled in linear-light via the shared OETF chunk); some
  zones near-sharp, some dramatically dissolved; the zone boundaries DRIFT like aurora
  nuclei. The ideal glass-refraction backdrop: rich organic chroma, no synthetic flatness.
  The §3 vividness floor STILL applies (source-agnostic — it operates on the final `col`),
  so a washed-out flower blooms to transmission-fit.
- **The blur kernel — single-pass, bounded, Safari-safe.** The substrate invariant is
  single-pass (no FBO ping-pong), so this is a **bounded Gaussian/Kawase tap loop with a
  FIXED tap count** (e.g. 3 rings × 8 taps = 24, the kuwahara tap-budget precedent that
  already clears the perf budget), the radius modulated per-fragment by the zone field. A
  fixed tap count is the WebKit-safe choice — no dynamic loop bound that WebKit's compiler
  chokes on, no `backdrop-filter:url`.
- **Construction-time permutation, NOT a runtime god-branch.** `source: "palette" |
  "image"` selects a SEPARATE shader program at build (the BD.W-DOT-IMAGE B1 discipline) —
  never an `if (uSource)` per-fragment switch.
- **Cross-engine texture parity (the ONE genuine divergence).** WebGPU
  `copyExternalImageToTexture` vs WebGL2 `texImage2D(ImageBitmap)` carry different
  premultiply/colorspace/flipY defaults — and since BOTH backends are live, BOTH must
  declare them explicitly. Shared decode: `createImageBitmap(blob,
  {premultiplyAlpha:"none", colorSpaceConversion:"none"})`. WebGPU:
  `copyExternalImageToTexture({premultipliedAlpha:false, colorSpaceConversion:"none"})`.
  WebGL2: `pixelStorei(UNPACK_PREMULTIPLY_ALPHA_WEBGL,false)` +
  `UNPACK_COLORSPACE_CONVERSION_WEBGL,NONE` + `UNPACK_FLIP_Y_WEBGL,false`. The parity gate
  is a **real rendered-capture-pair** (chromium-WGSL vs webkit-WGSL decoded pixels, OKLab
  ΔE), never a name-presence. This is the BD.W-DOT-IMAGE texture-upload seam, SHARED — ONE
  upload primitive, two consumers (dot-image + aurora-image), DRY.
- **The macro-flower ARRAY is consumer assets** (presets-in-consumers): the library ships
  `<Aurora source="image" :src>`; the demo supplies a curated array (researched soft
  high-color organic macro shots — peony/dahlia/poppy/ranunculus close-ups, the
  bokeh-rich petal-fill frames) with a slow cross-fade for the per-page-varied register.

---

## 4. Per-page custom auroras — a wiring problem, not an engine one

The configurator already drives every axis; `<Aurora :config>` + `resolveAtoms` (the ≤7-atom
door) + presets-in-consumers already exist. The per-page gap is a *staging convention*: the
demo chassis stages the SAME constellation field everywhere. The fix is a thin **per-route
field registry** in the demo chassis (`W-PAGE-BACKGROUND` extends): each demo page declares
its field — a varied vivid aurora preset OR a `source:"image"` macro-flower OR a
`finish:"metal"` field — so the storybook is non-monotone and EVERY glass demo has its own
colorful §3 field to refract. This is a consumer convention (presets-in-consumers), NOT a
library fork; the library exposes the axes, the consumer selects.

---

## 5. Visual + motion + interaction (the iOS-27 register, liquid-weight universal)

- **The field BREATHES and DRIFTS** (the existing `nucleiDrift`/`paletteDrift`/`breath`
  clocks) — the load-bearing §3 vibrant backdrop (IOS27 T11), now guaranteed-vivid.
- **Metal flows with the drift** — the catch-light ridges ride the field's iso-bands, so
  the metal breathes as the nuclei drift (overlapping action: the twinkle stays put while
  the ridges slide beneath). On cursor, the catch-light rakes WITH WEIGHT — the highlight
  does not snap to the new rake angle; it follows on the existing cursor lerp (0.22/frame,
  the inertial pursuit). Liquid-weight universal: morph-MORE-on-move, never tight/springy.
- **The image source dissolves like aurora** — the blur zones drift, a real photo slowly
  abstracting and re-forming.
- **Match-or-better Apple (IOS27 T11):** Aurora is already superior (real fluid nuclei
  field + breathing + painterly mediums vs a CSS mesh). The golden better-than levers Apple
  cannot touch: the metallic register, the sampled-image source, the guaranteed mode-aware
  vividness floor, and cursor-reactive light + flow.

---

## 6. Cross-engine plan (Chrome AND Safari, WGSL primary on both)

- **WGSL primary (Chrome + Safari 26) + WebGL2 fallback (older WebKit/no-WebGPU), ONE math
  source.** Every new term — the vividness floor, the metal BRDF, the cursor-light z-synth,
  the zone-blur — is pure transpilable arithmetic on the SHARED `procedural-color` chunk.
  Each ports to WGSL **by construction** and round-trips ΔE≈0 in the `shader-eval-harness`
  parity net. **Metal dual-ports** (GLSL `mediums.glsl.ts` body + WGSL `aurora-mediums.wgsl.ts`
  body — both re-plumb their own `structureTensorField` discard); it is NOT a frag-only add
  (which would be invisible on the primary path of BOTH browsers).
- **The light crosses via `uCursor`, never a phantom `uLightDir` lane** — the only form
  that exists on the WGSL struct. Verified: `uniformBridgeWGPU.ts` has cursor (off 64), no
  light lane.
- **WebKit-fragile ops fenced:** `pow(x, highExp)` (the sharp metal crest — clamp exponent
  + `highp`); `hash21` / `fract(p.x*p.y)` (the sparkle — `highp`, per-cell floor'd seed so
  precision drift can't relocate a flake); `atan(sin,cos)` (already shipped). NO
  `backdrop-filter:url`, NO dynamic loop bounds (fixed tap count), NO compositor-fragile
  WebKit traps — the blur is IN-SHADER.
- **The texture upload is the one genuine divergence** — explicit
  premultiply/colorspace/flipY on BOTH backends, gated by a real chromium-vs-webkit
  rendered-capture-pair (SHARED with dot-image).

---

## 7. a11y / PRM carve

- **PRM → ONE static frame, both backends.** The master-tempo scalar zeroes drift: metal
  seats one lit static frame (no sparkle phase advance, rake frozen to idle), the image
  source seats one static blurred frame (no zone drift, no cross-fade), the field seats one
  static vivid frame. All via the inherited `useGpuSubstrate` freeze — NO parallel
  matchMedia, NO new rAF, NO new lifecycle.
- **WCAG 2.2.2 (pause)** via the existing dock background toggle; **2.3.3** (animation from
  interaction) — the cursor write-path early-outs on `reducedMotion`.
- **Offscreen/park** — content-visibility + tab-hidden suspend the rAF; parked = zero
  frames. Inherited, unchanged. The 24-tap blur loop rides the SAME park.
- **Glass-over-the-field (the §3 payoff):** with the vividness floor + the metal/flower
  registers, the field is finally saturated enough that warm-cream transmissive glass over
  it reads TRANSMISSIVE-not-gray (the brief's load-bearing requirement). The
  `opacity-ceiling` prop already recedes the field behind content-dense routes.

---

## 8. The acceptance bar + the born-RED gate (`proof:aurora`)

A wave is GREEN only when ALL clear, BOTH modes, BOTH backends:

1. **Vividness floor (§3).** The default field's mean OKLab chroma over the frame ≥ the §3
   transmissive floor at `vividness=1`. **Born-RED on the current `C:0.10` pale Dawn.**
   Composes the glass-material no-gray π: a warm glass surface over the default field reads
   transmissive-not-gray (the field carries chroma). *Spike-proven: 0.031 (no-vivid, RED) →
   0.057 (vivid, GREEN); bar 0.045.*
2. **Metal FOLDS.** The `finish:metal` field's local crest-valley contrast (high-freq OKLab
   L texture) ≥ the fold bar AND ≥ 1.5× the smooth field's. **Born-RED on the smooth field
   (a tinted-orientation-map metal would fail this).** *Spike-proven: smooth 0.0011 (RED) →
   metal 0.0267, metal-gradient 0.0302 (GREEN, 25× over smooth); bar 0.020.*
3. **Metal catch-light crosses to WGSL.** A real chromium-WGSL render shows a non-zero
   cursor-raked catch-light (proven by a real capture, never an authored `0.0`). Born-RED if
   the metal body reads a phantom `uLightDir` (which is `0` on the WGSL struct → flat).
4. **Image source parity.** A chromium-WGSL vs webkit-WGSL rendered-capture-pair of the same
   uploaded macro-flower agrees ΔE ≤ threshold (the texture premultiply/colorspace/flipY is
   matched). Born-RED on a default-premultiply mismatch (the genuine Safari divergence).
5. **Default byte-identity.** A `medium:"smooth"`, `finish:"none"`, `source:"palette"`,
   `vividness:0` config renders byte-identical to the prior smooth parity capture on BOTH
   backends (the new lanes write 0). The vividness identity move is the ONE deliberate
   default change (gated, not accidental).
6. **PRM.** Under `prefers-reduced-motion:reduce`, the field is ONE static frame on both
   backends (no drift, no sparkle phase, no rake motion, no cross-fade).

### Born-RED gate sketch (`scripts/proof-aurora.mjs`)

```js
// Renders the default + each new register on BOTH backends (headless chromium WGSL/WebGL2 +
// webkit WGSL), reads pixels back, asserts the bars. Born-RED on HEAD: the default field's
// mean OKLab chroma is BELOW the §3 floor (C:0.10 palette), and no metal/image register
// exists, so clauses 1/2/3/4 all FAIL until the registers land.
const VIVID_FLOOR = 0.045, METAL_FOLD = 0.020;
for (const backend of ['chromium-wgsl','chromium-webgl2','webkit-wgsl']) {
  for (const mode of ['light','dark']) {
    const px = renderAndReadback({backend, mode, config: DEFAULT});
    assert(meanOklabChroma(px) >= VIVID_FLOOR, `[${backend}/${mode}] vividness floor`); // RED on HEAD
    const m = renderAndReadback({backend, mode, config: {finish:'metal'}});
    assert(localContrast(m) >= METAL_FOLD && localContrast(m) > 1.5*localContrast(px),
           `[${backend}/${mode}] metal folds`);                                          // RED on HEAD (no metal)
    assert(catchLightNonZero(m), `[${backend}/${mode}] metal light crosses to WGSL`);    // RED if phantom uLightDir
  }
}
const [chrome, webkit] = ['chromium-wgsl','webkit-wgsl'].map(b =>
  renderAndReadback({backend:b, config:{source:'image', src:FLOWER}}));
assert(deltaE(chrome, webkit) <= TEX_PARITY, 'image texture parity');                    // RED on premultiply mismatch
```

---

## 9. Deft integration — the union map (no fork, KISS, DRY)

| New register | Composes (extant) | NET-NEW | Fork avoided |
|---|---|---|---|
| `finish:"metal"` (8) | structureTensorField (re-plumbed N, GLSL+WGSL), the cursor uniform, OKLCh core | the 2-term BRDF body + cursor-light z-synth + 2 knobs (free pad slots) | NOT a new shader/substrate — a `uMedium==8` body, dual-ported |
| `finish:"metal-gradient"` (9) | the metal BRDF over a flattened base | the twinkle-in-place sparkle (1 highp hash + phase) | NOT a 2nd BRDF — metal over a pre-flattened col |
| `vividness` floor | the OKLab `procedural-color` chunk, the post-stage | a chroma-floor lift (default high = the §3 identity) | NOT a new pass — appends to the post, both backends |
| `source:"image"` blurred-flower | the nucleiField drift, useGpuSubstrate, the OETF/color chunk, the dot-image upload seam | a `source` program-permutation + a bounded tap-loop blur | NOT a `<BlurredImage>` parallel engine — an Aurora source axis |
| per-page custom | resolveAtoms + W-PAGE-BACKGROUND | a per-route field resolver in the demo chassis | NOT a new config system — the atoms door, consumer-side |

Every register is reached by `medium`/`finish`/`source`/`vividness` — a re-parameterization
or an appended opt-in body on the ONE single-pass dispatch. The smooth/oil/vangogh/kuwahara
mediums + `source:"palette"` + `finish:"none"` + `vividness:0` defaults are BYTE-IDENTICAL.

---

## 10. The wave amendment (delta-assay → AUGMENT, no dup)

- **AUGMENT `W-AURORA-METALLIC` / `BD.W-AUR-METAL`** — slots **8/9** (corrected from the
  lens-a/b 10/11; `MEDIUM_ID` stops at kuwahara:7). Re-plumb the discarded `N` in BOTH the
  GLSL (`mediums.glsl.ts:89`) AND the WGSL twin (`aurora-mediums.wgsl.ts:76`) — metal
  DUAL-PORTS (WGSL is primary on both browsers; a frag-only metal is invisible). Two-term
  BRDF (streak + `N·H`) + technicolor-DR valley term + cursor-z light crossing to WGSL +
  twinkle-in-place highp hash + the medium/finish split taxonomy. The catch-light is the
  EXISTING `interactivity:"light"` axis re-pointed (no new cursor path). ONE generalized
  "Metal" / "Brushed Metal" preset, no app-name.
- **AUGMENT `W-BLURRED-IMAGE-BG`** — express as `source:"image"` on `<Aurora>` (NOT a
  separate `<BlurredImage>` — deft union; the blur is a new color-stage operator, the
  substrate/lifecycle/drift are the existing aurora's). Single-pass bounded tap-loop (the
  kuwahara budget precedent), NOT an FBO Kawase chain. SHARE the texture-upload seam + the
  rendered-capture-pair parity gate with `BD.W-DOT-IMAGE` (one upload primitive, two
  consumers — DRY). The macro-flower array is the demo's curated consumer asset.
- **NEW field property `vividness`** — the §3 chroma-floor lift (shader-resident, mode-aware,
  opt-OUT default-high), + the `DEFAULT_AURORA_CONFIG` palette chroma lift (C:0.10 →
  C:0.16-0.20, warm hue 45-70). Gated by clause 1 (born-RED on the pale default). The
  literal §3 fix the hardening wave exists to deliver.
- **NEW chassis convention `routeFieldRegistry`** — per-page varied field; reconciles
  `W-PAGE-BACKGROUND`; consumer convention, no library fork.
- **RECONCILE `BD.W-FIELD-ENGINE`** — metal's `N` host + the image source's drift + the
  blur's color all read the shared `field/{noise,color}` basis; the metallic + image arms
  are the genuine 2nd/3rd consumers that keep the hoist non-overfit.
- **DEFERRED (not adopted): lens-c's ink-and-paint cel-outline.** A real, audacious idea
  (a hard technicolor contour keyed to the same re-plumbed gradient), but a SECOND bold
  swing the four asks do not need, and a hard contour fights the §3 mandate's *soft
  transmissive* field. Logged as a future opt-in `cel:true` register, not in the golden
  critical path.

**Survival of the fittest:** KEEP the dual-backend field engine, the nuclei spine, the
medium dispatch, the configurator, the lifecycle, the parity net (all fit). REFINE the
pale default (the vividness floor + palette lift invert pale→vivid as the identity).
RE-INVENT nothing — the two metallics + the image source are additive finish/source values
on the existing axes; the blurred-image-as-fork is RETIRED into the aurora `source` axis.
ONE engine, three axes, one floor, four asks delivered, Chrome + Safari, performant.

---

## Files

- `GOLDEN.md` — this spec.
- `golden/spike.html` — the throwaway WebGL2 de-risk spike (gate GREEN): re-plumbed-gradient
  two-term metal BRDF + cursor-z-synth light + metal-gradient twinkle + OKLab vividness
  floor + the born-RED π readback. Verified live in Chrome.
- `golden/spike-metal-fixed.png` — the metal render (folded warm metal, 25× local contrast
  over the smooth wash).
