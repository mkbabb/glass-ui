# Aurora greenfield — lens-a (pure iOS-27 fidelity)

The most faithful, audacious iOS-27 interpretation: Aurora is no longer "a pretty
background" — it is the **load-bearing §3 colorful field** every glass surface
refracts. The lens reads the live surface, the four user asks, and the on-disk
wave specs (W-AURORA-METALLIC, BD.W-AUR-METAL, W-BLURRED-IMAGE-BG, BD.W-DOT-IMAGE,
BD.W-FIELD-ENGINE, IOS27-REFERENCE) and designs ONE coherent field engine that
delivers metal + blurred-image + per-page-custom + match-or-better, as VARIANTS of
the existing single-pass field, never a fork.

---

## 0. The live diagnosis (chrome-devtools /substrates/aurora, both modes)

**(a) Is the current Aurora vivid enough to be the §3 field? NO — it is too pale.**
The default "Dawn" placeholder palette, read off the live root, is
`rgb(250,147,180)` pink → `rgb(134,169,247)` blue → `rgb(252,198,136)` peach →
`rgb(254,219,213)` near-white: **high-luma, low-to-mid chroma pastels.** The WebGL
composite (screenshot) is paler STILL than the placeholder — the breath
`col *= 1 + breath·0.5` luminance wobble plus the ACES tonemap plus `clamp(col·0.985
+ 0.008)` all lift L and compress C toward a milky wash. Over a flat page this is
exactly the gray-glass root cause the glass-material greenfield proved: a warm plate
over a pale field reads gray because the field has no chroma for the glass to
transmit. **The field is built for "atmospheric wisp", not for "vivid colorful field
behind glass."** The studio preset row carries one genuinely saturated palette
(`rgb(197,52,67)` deep crimson) — proof the engine CAN be vivid; the DEFAULT is the
miss, and the default is what `/forms/select` etc. would inherit.

**Verdict:** the engine is sound; the **vividness floor** is the defect. The
greenfield raises a chroma floor as a first-class field concern (§1), not a per-
preset accident.

**(b) Metal variants — new shader pass or re-parameterization? RE-PARAMETERIZE.**
The painterly engine ALREADY computes everything metal needs and throws half of it
away. `structureTensorField` (`mediums.glsl.ts:40`) Sobel-samples the field's luma,
forms the structure tensor, and returns `vec3(dir, A)` at `:89` — it computes the
luma gradient `(Gx,Gy)` at `:52-53` (the screen-space height-field normal metal's
`N·H` crest term needs) and **discards it.** Metal is a re-plumb of that discard +
a relight operator, on the EXISTING single-pass ladder (slots 0-7 occupied;
`else if (uMedium == 7) mediumKuwahara` at `aurora.frag.ts:406`). NO new pass, NO
new substrate, NO new rAF. This is the BD.W-AUR-METAL finding, and it holds against
HEAD.

**(c) Blurred-image — GPU-blur zones + drift, cross-engine, performant.** A new
`source` axis (the image is the field's COLOR source) + a Kawase separable blur
whose radius is driven by the SAME `nucleiField` softmax-Gaussian the aurora already
drifts. Cross-engine via the texture-upload semantics-match (BD.W-DOT-IMAGE's
premultiply/colorspace/flipY discipline — the genuine Safari divergence). Performant
via the inherited offscreen-pause / PRM-freeze / content-visibility park lifecycle.

**(d) Per-page custom — the preset/config API already exists.** `<Aurora :config>`
takes a full `AuroraConfig`; `resolveAtoms` is the ≤7-atom door; presets live in
consumers. The per-page gap is not API — it is a *staging convention*: the demo
chassis stages the constellation default everywhere. The fix is a thin per-page
field registry (§4), not new library surface.

---

## 1. The core idea — ONE field, FOUR finishes, a VIVIDNESS FLOOR

Aurora stays exactly what it is: a single-pass WebGL2 fragment program over
`useGpuSubstrate`, dispatching painterly MEDIUMS by `uMedium`, with the shared
`procedural-color` OKLCh chunk and the drifting `nucleiField`. The greenfield adds
**three things and changes ZERO existing paint**:

1. **A field-level VIVIDNESS axis** (the §3 fix) — a `vividness ∈ [0,1]` field
   property (NOT a per-preset saturation accident) that lifts the OKLCh chroma floor
   of the composite so the field is guaranteed transmissive-colorful behind glass.
   The default identity moves OFF the milky-pastel floor toward a calibrated
   chroma-rich-but-warm field.

2. **The metal + metal-gradient FINISHES** (`uMedium == 10/11`) — the BD.W-AUR-METAL
   re-plumbed-`N` relight operator; metal reads as folded liquid metal, metal-
   gradient as a brushed warm-metal sheet with twinkle. This is the "two new metallic
   variants" ask, expressed as the existing engine's next two medium slots.

3. **The IMAGE source axis** (`<Aurora source="image">`) — the blurred-image
   procedural bg: the field's color comes from an uploaded macro-flower texture
   instead of the synthetic palette, with a zone-varying Kawase blur driven by the
   SAME drifting nuclei field. This is the "blurred-image bg" ask, expressed as a
   `source` permutation on the SAME substrate (the BD.W-DOT-IMAGE construction-time-
   permutation discipline, shared with the dot family's texture arm).

The unifying insight: **medium = how the field is PAINTED (substance); finish = how
the field is RE-LIT (operator); source = where the field's COLOR comes from (synthetic
palette vs uploaded image).** These are three orthogonal axes on ONE engine. metal
is a finish; blurred-image is a source; vividness is a field property. None forks the
engine; each is reachable only by opting in (default byte-identical except the
vividness-floor identity move, which is a deliberate identity change per the no-
backwards-compat law).

This reconciles BD.W-FIELD-ENGINE (the shared `field/{noise,color}` basis the metal
finish and the image source both consume) without a parallel system: metal's
re-plumbed `N` reads the shared value-noise host; the image source's drift reads the
shared `nucleiField`; the color path is the one shared OKLCh chunk.

---

## 2. The metal finishes — re-plumb the discard, relight the field

**Mechanism (BD.W-AUR-METAL, hardened against HEAD).**

1. **Widen `structureTensorField` to RETURN its discarded gradient.** It already has
   `Gx,Gy` in scope (`:52-53`). Return `vec4(dir, A, packGradient(Gx,Gy))`; the two
   existing callers keep reading `.xy`/`.z` byte-unchanged; only the metal body reads
   the new `.w`. `N = normalize(vec3(Gx, Gy, METAL_HEIGHT_SCALE))` — the screen-space
   height normal, ZERO re-paid taps.

2. **A two-term anisotropic BRDF.** The metal read needs BOTH the streak (WHERE the
   highlight runs — along the structure-tensor tangent `T`) AND the `N·H` crest
   (CREST brightness — dark valleys, bright crests). One without the other reads as a
   tinted orientation map, not folded metal:
   ```glsl
   vec3 H = normalize(lightDir3D + vec3(0.0, 0.0, 1.0));
   float streak = pow(sqrt(max(1.0 - dot(normalize(vec3(T,0.0)),H)*dot(...),0.0)), METAL_SHININESS_ANISO);
   float crest  = pow(max(dot(N,H),0.0), METAL_SHININESS_CREST);
   float spec   = streak * mix(METAL_VALLEY_FLOOR, 1.0, crest) * uMetalPolish;
   spec *= smoothstep(0.0, METAL_COHERENCE_FLOOR, A);   // gate streak on coherence — no phantom banding in smooth zones
   col += spec * vec3(METAL_CATCH_WARM);                // ACHROMATIC-warm catch-light; metal reads from SHADING not hue
   ```
   The coherence gate is mandatory — it is what lets metal-gradient's smooth zones
   read smooth (the brushed-sheet base) while the high-coherence ridges read metal.

3. **The light CROSSES to WGSL via cursor-z-synthesis.** `uLightDir` does not exist
   on the WGSL struct; `uCursor` does. Synthesize the missing dimension in-shader:
   `lightDir3D = normalize(vec3(uCursor - p, METAL_LIGHT_Z))`, falling back to a
   static upper-right rake when `uCursorStrength==0`. So the catch-light rakes with
   the cursor and the SAME math runs on both backends (this is the cursor-as-light
   `interactivity:"light"` axis the engine already ships, re-pointed at metal). The
   two authoring knobs (`uMetalPolish`, `METAL_HEIGHT_SCALE`) pack into the free
   `.z/.w` slots of the existing `kuwahara` uniform vec4 — NO new struct lane.

4. **metal-gradient = metal over a pre-flattened base + twinkle.** `mediumMetalGradient`
   calls the same BRDF over a smoothed/gradient `col`, and adds a sparkle: a per-cell
   FIXED-seed hash (`hash21(floor(p * METAL_SPARKLE_DENSITY))`) with the PHASE animated
   (`sin(t + seed·τ)`) so flakes twinkle IN PLACE and never boil across the field; the
   hash is forced `highp` (a `mediump` hash boils cross-backend). This is the "minor
   sparkle imperfections + other colors woven in" — the warm multi-tone gradient base
   carries the per-region hue variation, the twinkle adds the flake catch.

**Why this is iOS-27-better, not just matching:** the reference metallic flow-field
is a smooth pre-baked mesh. Aurora's metal RIDES THE STRUCTURE TENSOR of a LIVE
drifting field — the ridges are the field's own iso-bands, so the metal flows and
breathes as the nuclei drift, and the catch-light is movable (cursor-raked). The
reference cannot interact; Aurora's metal does.

---

## 3. The image source — blurred macro-bloom, zone-varying drift

**Mechanism (W-BLURRED-IMAGE-BG, reconciled to a `source` permutation).**

`<Aurora source="image" :src>` swaps the color stage: instead of
`samplePalette(nucleiField(p))`, the field samples an uploaded texture, then applies
a **spatially-varying Kawase blur** whose tap-radius is driven by the SAME drifting
`nucleiField` softmax-Gaussian:

```glsl
float zone = nucleiField(domainWarp(uv, t), t);          // the SAME drifting field — but it drives BLUR, not color
float radius = mix(BLUR_MIN, BLUR_MAX, zone);            // zone-varying blur radius
vec3 col = kawaseBlur(uImage, uv, radius);               // cheap separable multi-tap, GPU-friendly
```

- The macro-flower's organic hues read through (sampled, linear-light via the shared
  OETF chunk); some zones stay near-sharp, some dissolve dramatically; the zone
  BOUNDARIES drift like aurora nuclei (the `nucleiDrift`/`paletteDrift` clock). The
  result is a "drifting macro-bloom" — a real photo dissolving into a slow abstract
  color field, the IDEAL glass-refraction backdrop (rich organic chroma, no synthetic-
  palette flatness).
- **Construction-time permutation, NOT a runtime god-branch.** `source: "palette" |
  "image"` selects a SEPARATE shader program at build (the BD.W-DOT-IMAGE B1
  discipline shared with the dot family) — never an `if (uSource)` per-fragment switch.
- **Cross-engine texture parity (the genuine Safari divergence).** Decode ONCE via
  `createImageBitmap(blob, {premultiplyAlpha:"none", colorSpaceConversion:"none"})`;
  upload with MATCHING semantics on both backends (WebGL2 `pixelStorei(UNPACK_
  PREMULTIPLY_ALPHA_WEBGL,false)` + `UNPACK_COLORSPACE_CONVERSION_WEBGL NONE` +
  `UNPACK_FLIP_Y_WEBGL false`; WebGPU `copyExternalImageToTexture` with the explicit
  premultiply/colorspace descriptor). The parity gate is a REAL rendered-capture-pair
  (webkit-vs-chromium), never a name-presence — this is the W-DOT-IMAGE T3 mechanism,
  SHARED, not re-invented (one texture-upload seam serves both the dot-image arm and
  the blurred-image arm — DRY).
- **Performance + a11y.** Inherited from the ONE substrate leaf: offscreen-pause via
  content-visibility, PRM → a single STATIC blurred frame (no drift), DPR cap, the
  WCAG-2.2.2 dock pause. Kawase is a handful of bilinear taps per pass — budget-
  clearing where a per-frame full-Gaussian would not be.
- **The macro-flower ARRAY is consumer assets** (presets-in-consumers): the library
  ships `<Aurora source="image" :src>`; the demo supplies a curated array (researched:
  soft high-color organic macro shots — peony/dahlia/poppy/orchid close-ups, the
  bokeh-rich petal-fill frames) with a slow cross-fade for the per-page-varied register.

---

## 4. Per-page custom — a field registry, not new surface

The API exists (`:config` / `resolveAtoms` / presets-in-consumers). The gap is the
chassis staging the SAME constellation everywhere. The fix is a thin **per-route field
map** in the demo chassis: a `routeFieldRegistry` that picks a DIFFERENT field per page
— a varied vivid aurora preset OR a `source="image"` macro-flower OR a metal finish —
so the storybook is not monotone and EVERY glass demo has its own colorful field to
refract (the §3 mandatory field, varied). This is a consumer convention (presets-in-
consumers), not a library fork; it reconciles W-PAGE-BACKGROUND.

---

## 5. The single boldest move

**Make Aurora a MANDATORY field with a hard chroma floor, and unify metal + image +
synthetic under ONE `(source × medium × finish × vividness)` engine where the metal
finish is built entirely by RE-PLUMBING the luma gradient the structure-tensor already
computes and throws away.** The audacity is twofold: (1) the field stops being optional
decoration and becomes the load-bearing §3 substrate with a guaranteed vividness floor
(the gray-glass cure at the source); (2) the headline new variant the user asked for —
liquid metal — costs ZERO new shader passes, ZERO new substrate, ZERO new rAF: it is a
`vec3(dir,A)` → `vec4(dir,A,gradient)` return-widening plus a two-term relight, the most
DEFT possible union (the engine already pays for every tap metal needs). Liquid metal
falls out of the painterly engine's own discarded math.

---

## 6. Cross-engine / a11y / PRM carve

- **Single-pass WebGL2 unconditionally** (the substrate invariant); the metal BRDF is
  transpilable arithmetic that ACTUALLY ports to WGSL (cursor-light reuse, no phantom
  light lane), so metal is the FIRST finish to deliver a real Safari catch-light — proven
  by a real capture-pair, never an authored 0.0.
- **Texture parity** is the one genuine Safari divergence; the matched
  premultiply/colorspace/flipY upload + the rendered-capture-pair gate is the fix,
  SHARED with the dot-image arm.
- **PRM:** the master-tempo scalar zeroes drift; metal seats one lit static frame, the
  image source seats one static blurred frame, the field seats one static vivid frame —
  all via the inherited substrate freeze (no parallel matchMedia).
- **Offscreen/park:** content-visibility + tab-hidden + manual(pause) suspend the rAF;
  parked = zero frames. Inherited, unchanged.

---

## 7. The wave amendment (delta-assay → AUGMENT, no dup)

- **AUGMENT W-AURORA-METALLIC / BD.W-AUR-METAL** — confirmed against HEAD: slots 10/11,
  re-plumb the discarded `N` (`mediums.glsl.ts:89`), two-term BRDF (streak + `N·H`),
  cursor-z light crossing to WGSL, twinkle-in-place highp hash, the medium/finish split
  taxonomy, ONE generalized "Metal"/"Brushed Metal" preset (no D7 app-name). ADD: the
  metal finish reads the BD.W-FIELD-ENGINE shared value-noise host (no re-fork); the
  catch-light is the EXISTING `interactivity:"light"` axis re-pointed (no new cursor
  path).
- **AUGMENT W-BLURRED-IMAGE-BG** — express as `source:"image"` permutation on `<Aurora>`
  (NOT a separate `<BlurredImage>` component — DEFT union; the blur is a new color-stage
  operator, the substrate/lifecycle/drift are all the existing aurora's). SHARE the
  texture-upload seam + the rendered-capture-pair parity gate with BD.W-DOT-IMAGE's
  texture arm (one upload primitive, two consumers — DRY). The macro-flower array is the
  demo's curated consumer asset.
- **NEW field property: `vividness`** — a chroma-floor lift on the composite (the §3
  cure), default identity moves off the milky-pastel floor (a deliberate no-backwards-
  compat identity change). Gated by a π that the default field's mean OKLCh chroma
  clears a transmissive-floor bar (born-RED on the current pale Dawn), BOTH modes, and
  that a glass surface over it reads transmissive-not-gray (composes the glass-material
  no-gray π).
- **NEW chassis convention: `routeFieldRegistry`** — per-page varied field (vivid
  aurora / image / metal), reconciles W-PAGE-BACKGROUND; consumer convention, no library
  fork.
- **RECONCILE BD.W-FIELD-ENGINE** — metal's `N` host + the image source's drift + the
  blur's color all read the shared `field/{noise,color}` basis; no new basis, the
  metallic and image arms are the genuine 2nd consumers that keep the hoist non-overfit.

No new substrate, no new rAF, no parallel engine. metal + image + vividness + per-page
are four opt-in axes of the ONE single-pass field — survival of the fittest: the engine
is fit and kept; the pale default is weak and refined; nothing is re-invented because
nothing is broken.
