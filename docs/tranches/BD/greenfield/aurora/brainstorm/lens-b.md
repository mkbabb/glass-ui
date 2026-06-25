# Aurora greenfield — LENS B (cross-engine / perf-first)

> Lens: design for FLAWLESS Chrome **and** Safari + performance. The §3 colorful
> field is now LOAD-BEARING — glass over a flat page reads gray (proved by the
> glass-material greenfield: 0 colorful fields behind 24 glass surfaces on
> `/forms/select`). Aurora must be the mandatory vivid field, per-page, both
> modes, both engines. The four asks — (1) two metallic variants, (2) the
> blurred-image macro-flower bg, (3) per-page custom auroras, (4) match-or-better
> the Apple aurora demos — must land as ONE coherent field engine, never four
> forks. KISS, DRY, no legacy.

---

## 0. The status-quo reading (live-inspected `/substrates/aurora`, both modes, M5 Max)

- **The engine is dual-backend and LIVE on both** (DESIGN.md is STALE — it still
  documents the AX/AY WebGPU *excise*; BB.W-VIZ-SUITE *re-introduced* WebGPU-first
  with a named consumer). HEAD ships `aurora.wgsl.ts` (WGSL **primary**) +
  `aurora.frag.ts` (WebGL2 **fallback**), the painterly mediums ported to WGSL
  (`aurora-mediums.wgsl.ts`), a typed-struct uniform lockstep
  (`uniformBridgeWGPU.ts`, 576-byte buffer with documented free pad slots), and
  `useGpuSubstrate` lifecycle (offscreen-pause / PRM-freeze / DPR). **Safari/WebKit
  takes the WebGL2 fallback** (no WebGPU in WebKit stable) — so the WebGL2 path IS
  the Safari path and must stay full-fidelity, never a degrade.
- **The field is PALE.** The light-mode default (Dawn) reads as a soft pastel wash
  — high L, low C (pink→lavender→blue→peach). Against the §3 bar this is the
  *missing-field-reads-gray* failure waiting to happen: a warm glass plate over a
  pale-pastel field still resolves close to neutral. The dark-mode Oil-Pastel-
  Rainbow preset carries real painterly texture + more chroma but reads **dim** —
  the field has headroom but the *defaults* don't use it.
- **The configurator drives EVERY axis** (color seed+harmony+per-stop OKLCh editor,
  medium, zones+arrangement, motion, warp/noise, flow, texture). Per-page-custom is
  a *preset-selection* problem, not a new-API problem — the API already exists.
- **Substrate truths (grounded against HEAD, confirming BD.W-AUR-METAL):**
  `structureTensorField` computes the Sobel luma gradient `Gx,Gy` then **discards
  it** (`return vec3(dir,A)`), keeping only tangent+coherence — the metal `N·H`
  crest term needs exactly this discarded gradient (re-plumb, don't re-pay 8 taps).
  `uLightDir` exists on WebGL2 only — **no light lane crosses to WGSL** — but
  `uCursor` crosses both (cursor off 64). Free uniform pad slots exist at
  `scalars3.w`, `cursor.z/.w`, `ints1.z/.w`, `kuwahara.z/.w` — homes for new knobs
  with ZERO new struct lanes (byte-offset-stable lockstep preserved).

**Verdict:** the engine is *fit* — keep it. The pathologies are (a) **pale
defaults** (a vividness floor problem, not an engine problem), (b) **two missing
finishes** (metal / metal-gradient), (c) **a missing field source** (sampled image
vs synthetic palette), (d) **no per-page field wiring**. All four are
*re-parameterizations + two additive finish bodies + one additive source-axis* on
the ONE engine. No fork survives this lens.

---

## 1. THE CORE IDEA — Aurora is ONE field engine with THREE orthogonal axes

Aurora already has the right spine: a **drifting nuclei field** (softmax-Gaussian
zones that breathe and drift) feeding a **color stage**, optionally transformed by
a **medium/finish operator**. The greenfield does **not** add engines — it
completes the spine into three orthogonal, composable axes, and adds a **vividness
floor** so the field is §3-fit by construction:

```
fragment(uv,t):
  field   = nucleiField(domainWarp(uv,t), t)     # the SHARED drifting-zone spine
  color   = SOURCE(field, uv, t)                  # AXIS 1 — where pigment comes from
  out     = FINISH(color, field, uv, t)           # AXIS 2 — the relight/operator pass
  out    *= VIVIDNESS_FLOOR(out)                   # the §3-fit chroma guarantee
```

- **AXIS 1 — `source` (where the pigment comes from).** `palette` (the shipped
  synthetic OKLCh stops — today's behaviour, the default) **|** `image` (sample a
  base texture's color — the macro-flower). The nuclei field is the SAME; only the
  *color lookup* changes. The blurred-image bg is **not a new viz** — it is
  `source:"image"` where the nuclei field drives the **blur radius per zone**
  instead of (or alongside) the palette id.
- **AXIS 2 — `finish` (the operator applied over the rendered field).** The
  `medium`/`finish` split BD.W-AUR-METAL mints: `medium` = a paint **substance**
  the field is rendered AS (smooth/oil/vangogh/oil-pastel/…); `finish` = an
  **operator** relighting/resampling the field (kuwahara the smoother, **metal**
  the relighter, **metal-gradient**). `metal` and `metal-gradient` are the two new
  finishes — an anisotropic metallic BRDF over the field, NOT a new shader pass.
- **AXIS 3 — `vividness` (the §3 floor).** A per-route chroma floor that guarantees
  the field never resolves toward gray behind glass (§2 below).

This is the **single boldest move's** substrate: every one of the four asks is a
*value on an existing axis*, so the configurator, the presets, the dual-backend
parity net, the lifecycle, and the per-page wiring are all REUSED — zero parallel
systems. The blurred-image is `source:image`; the metallics are `finish:metal[-gradient]`;
per-page-custom is preset selection; match-or-better Apple is the vividness floor +
the metallic register (a lever Apple's demos lack).

---

## 2. THE SINGLE BOLDEST MOVE — the **§3 vividness floor as a shader-resident contract**, the field paints its OWN transmission-fit guarantee

The user's gray-glass complaint is a *missing-field* problem. The naive fix is "use
more saturated presets" — but that is unenforced (a future preset author re-pales
it) and mode-blind (a chroma that reads vivid in light reads muddy in dark). The
bold move: make **transmission-fitness a property the field GUARANTEES in-shader**,
not a preset author's discipline.

**`uVividness` (0..1, the §3 floor) + a post-stage chroma-lift in OKLCh:**

After the color/finish stages, before the tonemap, the shader lifts the field's
**OKLab chroma toward a per-route floor** while preserving hue and lightness:

```glsl
// after FINISH, before aces() — operate in OKLab (the shared procedural-color chunk)
vec3 lab  = linearToOklab(col);
float C   = length(lab.yz);                       // current chroma
float Cmin = uVividnessFloor * VIVID_TARGET;      // the per-route §3 chroma floor
float Clift = max(C, Cmin);                        // never BELOW the floor (a pale zone blooms)
lab.yz   *= (C > 1e-4) ? (Clift / C) : 0.0;        // scale chroma, hue+L untouched
col      = oklabToLinear(lab);
```

Why this is the right move under the cross-engine/perf lens:

1. **It is the §3 contract made mechanical.** The field cannot render *gray* behind
   glass because the floor is computed per-fragment — a pale Dawn preset blooms to a
   transmissive-fit chroma; a vivid preset is untouched (`C > Cmin` already). A
   `proof:aurora` gate asserts the field's mean OKLab chroma over the frame `≥`
   the §3 floor at `uVividness=1` — **born-RED on the current pale defaults**, GREEN
   only when the floor lands. The "missing field reads gray" failure becomes
   *un-representable*.
2. **It is mode-aware for free.** The floor scales with the route's mode (dark
   routes get a slightly *higher* chroma target — a dim field needs more chroma to
   read vivid through glass; light routes a calmer one). One scalar, both modes —
   the BA.W-NO-GRAY warm-floor's field-side complement.
3. **It is cross-engine-trivial.** OKLab chroma-scale is pure transpilable
   arithmetic on the **shared** `procedural-color` chunk (GLSL + the WGSL twin
   already splice it) — it ports to WGSL by construction and round-trips at ΔE≈0 in
   the existing parity net. No backdrop-filter, no second pass, no Safari fragility.
4. **It is the §3-field's reason to EXIST, paid once.** The glass-material
   greenfield can now *rely* on the field being transmission-fit (it composes
   Aurora knowing the field carries chroma), instead of each consumer hand-tuning a
   preset's saturation.

**The floor is opt-OUT, not opt-in.** The default `<Aurora>` ships `uVividness`
high enough to clear §3; a hero surface that wants a deliberately-pale wash sets
`vividness={0}` (presets-in-consumers). This INVERTS the status quo — vivid is the
default identity, pale is the explicit choice — which is the literal §3 fix.

---

## 3. The two metallic finishes (AXIS 2 — `finish:metal` / `finish:metal-gradient`)

Unions verbatim with **BD.W-AUR-METAL** (the honest re-scope) + **W-AURORA-METALLIC**.
The mechanism is a **re-parameterization of the existing field**, NOT a new pass:

- **Re-plumb the discarded `N`.** Widen `structureTensorField`'s return to carry the
  Sobel gradient it already computes (the `vec4(dir, A, packGrad)` form); the metal
  body reads `N = normalize(vec3(Gx, Gy, METAL_HEIGHT_SCALE))` — the screen-space
  height-field normal. Zero extra taps; `.xy`/`.z` callers byte-unchanged.
- **The two-term BRDF.** `streak = pow(sinTH, ANISO)` (WHERE the highlight runs —
  along the structure-tensor ridge tangent) **×** `crest = pow(NdotH, CREST)` (the
  valley→crest brightness, dark troughs → bright ridges). BOTH terms — streak-only
  is the *tinted-tensor-map* anti-read; crest-only is *plastic*. The catch-light is
  achromatic-warm (the metal read comes from SHADING not hue; the warm-cream
  identity holds).
- **`metal` (pure liquid chrome/mercury).** A single metal tone (the W-METAL-SHIMMER
  gold/silver/bronze quad or a consumer `metalColor`), high-contrast remap
  (near-white crest → deep-shadow trough), the molten draped read of ref-1.
- **`metal-gradient` (the ios27 sparkle wash).** The same BRDF over a **smoothed
  gradient base** (a pre-flattened `col` — the brushed-sheet) + a **twinkle-in-place
  sparkle** (`hash21(floor(p*DENSITY))` fixed per-cell seed, the PHASE animated by
  `sin(t+seed*TAU)`, force-`highp` — twinkles in place, never boils) + subtle
  per-region hue variation (the "other colors woven in" of ref-2). The **coherence
  gate** (`smoothstep(0,FLOOR,A)`) is mandatory — it fades the streak to zero in the
  smooth (structureless) zones so the gradient base reads smooth, no phantom banding.

**The cross-engine clincher (this lens's load-bearing contribution):** the metal
catch-light is **cursor-as-light with a synthesized Z** — `uLightDir` cannot cross
to WGSL, but `uCursor` does, so `lightDir3D = normalize(vec3(uCursor - p, METAL_LIGHT_Z))`
synthesizes the missing dimension in-shader (static upper-right rake when no
pointer). This is the ONLY way the metal catch-light is **deliverable on Safari**
(the WebGL2 fallback path) AND Chrome (WGSL primary) from ONE math source — a light
that "rides `uLightDir`" would be a phantom on WebGPU. The metal knobs
(`uMetalPolish`, `METAL_HEIGHT_SCALE`) pack into the **free `kuwahara`-vec4 pad
slots** (`.z/.w`) — no new struct lane, byte-offset-stable lockstep.

Both finishes ride the EXISTING one-draw loop (offscreen-pause / PRM / DPR
inherited); the sparkle is a cheap hash, the BRDF a few extra ALU — budget-clearing.
PRM → the static lit metal frame (no sparkle phase advance).

---

## 4. The blurred-image macro-flower bg (AXIS 1 — `source:"image"`)

Unions with **W-BLURRED-IMAGE-BG** + **BD.W-DOT-IMAGE**'s texture-parity discipline.
The bold framing: the blurred-image is **NOT a new `<BlurredImage>` component** — it
is `<Aurora source="image" :src>` where the SAME drifting nuclei field drives the
**per-zone blur radius** instead of the palette id. This is the deftest possible
union — the entire aurora spine (drift, lifecycle, PRM, configurator, parity net) is
reused; only the color-lookup stage swaps from `samplePalette` to
`spatiallyVaryingBlur(uImage, uv, radius(field))`.

- **The zone-blur.** `radius(uv,t) = mix(BLUR_MIN, BLUR_MAX, nucleiBlurField(uv,t))`
  — the nuclei drive the blur AMOUNT per zone (some zones near-sharp, some
  dramatically dissolved), the zone boundaries DRIFT with `nucleiDrift`/`paletteDrift`
  (the SAME drift model the color field uses). A **Kawase** multi-tap blur (cheap,
  GPU-friendly, separable-ish dual-filter) modulated by the zone field — far cheaper
  than a true gaussian and the Safari-safe choice (a fixed small tap count, no
  dynamic loop bound that WebKit's ANGLE chokes on).
- **The color is the SAMPLED IMAGE's organic hues** (the macro-flower's soft
  refraction-ideal color), not a synthetic palette — handled in linear-light via the
  shared OETF/OKLCh chunk so the sampled color is correct on both backends.
- **The §3 vividness floor STILL applies** — a washed-out macro-flower blooms to the
  transmission-fit chroma; the floor is source-agnostic (it operates on the final
  `col`).

**The cross-engine texture-parity discipline (this lens's mandate):** the texture
upload is the one genuinely Safari-divergent path — `copyExternalImageToTexture`
(WebGPU) vs `texImage2D(ImageBitmap)` (WebGL2) carry different
premultiply/colorspace/flipY defaults. BOTH backends MUST declare them explicitly:
`createImageBitmap(blob, {premultiplyAlpha:"none", colorSpaceConversion:"none"})`
shared decode, `copyExternalImageToTexture({premultipliedAlpha:false, colorSpaceConversion:"none"})`
on WGPU, the matching `pixelStorei(UNPACK_PREMULTIPLY_ALPHA_WEBGL,false)` +
`UNPACK_COLORSPACE_CONVERSION_WEBGL,NONE` + `UNPACK_FLIP_Y_WEBGL,false` cohort on
WebGL2. The parity gate is a **real rendered-capture-pair** (webkit-vs-chromium
decoded pixels, OKLab ΔE), NOT a name-presence — the BD.W-DOT-IMAGE texture-parity
sub-wave's exact methodology, reused here (ONE texture-upload seam shared between
dot-image and aurora-image — DRY).

- **The macro-flower ARRAY is CONSUMER ASSETS** (presets-in-consumers — the library
  ships `<Aurora source="image" :src>`; the consumer/demo supplies the curated array).
  The demo provides a researched sample array (soft, high-color, organic macro
  shots) + a slow cross-fade between `:src` entries for the per-page-varied register.
  PRM → a single static blurred frame (no drift, no cross-fade).

---

## 5. Per-page custom auroras (AXIS-orthogonal — a wiring problem, not an engine one)

The configurator already drives every axis and the demo already carries 13 presets —
per-page-custom is **preset selection wired into `W-PAGE-BACKGROUND`**, not new API.
The greenfield contribution: extend the page-background register so each demo page
picks a **DIFFERENT field** — a varied aurora preset (its own palette/zones/medium)
OR a `<Aurora source="image">` macro-flower — instead of the monotone constellation
default. The selection lives in the demo chassis (a per-route `auroraPreset` field),
NOT the library; the library just exposes the axes. This makes the storybook
non-monotone AND proves the §3 field varies per page while every page stays
transmission-fit (the vividness floor guarantees it regardless of which preset).

---

## 6. Match-or-better the Apple aurora demos (IOS27-REFERENCE T11)

Per IOS27-REFERENCE T11, glass-ui's Aurora is **already arguably superior** to
Apple's per-card mesh-gradient (real fluid nuclei field + breathing + the painterly
mediums + the anisotropic-Kuwahara finish — a richer, more painterly field than a
smooth CSS mesh). The greenfield's **better-than levers** Apple cannot touch:

1. **The metallic register** — Apple's demos have NO metal field; `finish:metal` is a
   pure better-than.
2. **The sampled-image source** — a drifting macro-bloom carrying real photographic
   color, blurred and zone-varying, is beyond a synthetic mesh.
3. **The §3 vividness floor** — a *guaranteed* transmission-fit field, mode-aware,
   not a hand-tuned gradient.
4. **Cursor-reactive light + flow** — the catch-light and the swirl react to the
   pointer (the shipped interactivity axes); a video/CSS-mesh cannot.

The bar is met by construction: the engine is superior, the two new finishes + the
image source + the floor are net-additive, and the cross-engine fidelity (WGSL
primary + full-fidelity WebGL2/Safari fallback, ONE math source) is the discipline
Apple's platform-locked demos never have to prove.

---

## 7. Cross-engine + a11y/PRM carve (the lens's hard gate)

- **WGSL primary (Chrome) + WebGL2 fallback (Safari/WebKit), ONE math source.**
  Every new term (the floor, the metal BRDF, the cursor-light z-synth, the zone-blur)
  is pure transpilable arithmetic on the **shared** `procedural-color` chunk — it
  ports to WGSL by construction and round-trips at ΔE≈0 in the
  `shader-eval-harness` parity net. The metal catch-light crosses via `uCursor`
  (not a phantom `uLightDir` lane). The texture upload declares
  premultiply/colorspace/flipY explicitly on BOTH backends, gated by a real
  webkit-vs-chromium rendered-capture-pair.
- **NO backdrop-filter:url, NO compositor-fragile WebKit traps.** The field is a
  single fragment program drawn to a canvas — the blur is IN-SHADER (Kawase taps),
  never a CSS `backdrop-filter`. This is the Safari-safe blur (the user's repeated
  WebKit flag).
- **PRM / WCAG 2.2.2 + 2.3.3.** The whole interactive stack routes through
  `masterTempo()` (0 under live PRM); PRM → a single static frame (metal lit but no
  sparkle phase, image blurred but no drift, no cross-fade). The `useGpuSubstrate`
  offscreen-pause parks the rAF when hidden (zero frames). All inherited — the new
  axes add NO new lifecycle, NO new rAF, NO new `matchMedia` listener.
- **Perf.** ONE draw, ONE program per backend; the floor is ~6 ALU, the metal BRDF a
  few more, the sparkle one hash, the Kawase blur a fixed small tap count. Budget
  clears the `W-VIZ-PERF-BUDGET` worst-case; the lifecycle parks when offscreen.

---

## 8. The DELTA-ASSAY → wave amendments (AUGMENT, never fork)

| Ask | Mechanism | Wave amendment |
|---|---|---|
| Vividness (the §3 root cause) | `uVividness` OKLab chroma-floor post-stage, mode-aware, opt-OUT default-high | **NEW clause on the aurora close** + the `proof:aurora` chroma-floor gate (born-RED on pale defaults) — reconcile into BD.W-FIELD-ENGINE's color chunk |
| Pure metal | `finish:metal` — re-plumbed `N` + 2-term BRDF + cursor-light z-synth | **AUGMENT W-AURORA-METALLIC / BD.W-AUR-METAL** (already specced; this lens confirms the cross-engine cursor-light is the load-bearing line) |
| Gradient-metallic-sparkle | `finish:metal-gradient` — BRDF over smoothed base + twinkle-in-place + coherence gate | same wave (the `metalMode`/slot-11 sub-axis) |
| Blurred-image macro-flower | `source:"image"` — nuclei drive per-zone Kawase blur radius; sampled-image color; texture-parity capture-pair | **AUGMENT W-BLURRED-IMAGE-BG** — reframe as `<Aurora source="image">` (NOT a `<BlurredImage>` fork); share the dot-image texture-upload seam |
| Per-page custom | preset selection in the demo chassis | **AUGMENT W-PAGE-BACKGROUND** — per-route `auroraPreset`, library exposes axes only |
| Match-or-better Apple | the metallic register + image source + floor + cursor-reactivity | rides the above; the better-than levers Apple lacks |

**Reconciliation vs the 116 union waves (no dup):** the metal finishes are
BD.W-AUR-METAL (the slot-10/11 + medium/finish split + numeric parity) — this lens
AUGMENTS, does not re-spec. The blurred-image is W-BLURRED-IMAGE-BG REFRAMED as an
aurora `source` axis (retiring the standalone `<BlurredImage>` framing — DEFT union,
no fork). The field-engine DRY hoist (BD.W-FIELD-ENGINE) is the shared `field/noise`
+ `field/color` chunk the image-source and the vividness floor both compose. The
**ONLY net-new** is the `uVividness` floor — and it is the literal §3 fix the whole
hardening wave exists to deliver, so it earns its keep.

**Survival-of-the-fittest verdict:** KEEP the dual-backend field engine, the nuclei
spine, the medium dispatch, the configurator, the lifecycle, the parity net (all
fit). REFINE the defaults (the vividness floor inverts pale→vivid as the identity).
RE-INVENT nothing — the two metallics and the image source are additive
finish/source values on the existing axes, the blurred-image-as-fork is RETIRED into
the aurora `source` axis. One engine, three axes, four asks delivered, Chrome +
Safari, performant.
