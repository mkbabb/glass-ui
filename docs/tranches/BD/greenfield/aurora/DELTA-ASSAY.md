# Aurora — DELTA-ASSAY (golden vs current, the UNION path)

The golden-vs-HEAD delta and the deft integration path: precisely how to evolve the CURRENT
`<Aurora>` toward `GOLDEN.md` reusing extant primitives. KISS, no legacy, no dual-path,
survival of the fittest. Grounded against HEAD source + a LIVE inspection of
`/substrates/aurora` (Chrome :5173, both modes) + the three folded challenges
(`challenge/1.md`, `2.md`, `3.md`).

Verdict up front: **REFINE the field + the metal taxonomy; RE-INVENT nothing; BUILD two
genuinely net-new sub-systems (the image-texture pipeline + the macro-flower asset).** The
engine, the nuclei spine, the medium dispatch, the dual-backend parity net, the
configurator, and the lifecycle are all FIT and KEPT. The four asks are values on existing
axes — except the image source, which is honestly Aurora's FIRST texture pipeline (a net-new
binding surface, not a color-stage swap).

---

## 0. Ground truth re-verified at HEAD (not assumed)

Every load-bearing fact in `GOLDEN.md §0` was re-checked against source + live this session:

- **`MEDIUM_ID` stops at `kuwahara: 7`** (`uniformBridge.ts:55`); the frag dispatch ladder
  ends `else if (uMedium == 7) col = mediumKuwahara(...)` (`aurora.frag.ts:406`). The
  `AuroraMedium` union (`presets.ts:61-75`) ends at `kuwahara`. **Metal at 8/9 is correct.**
  The competing `BD.W-AUR-METAL.md` puts metal at **10/11 above phantom satin=8/prism=9** —
  those satin/prism waves do NOT exist in HEAD or in the BD union wave set; the 10/11 premise
  is PHANTOM. The golden's 8/9 wins (and `W-AURORA-METALLIC.md`'s slot-8 instinct was right).
- **`structureTensorField` computes `Gx,Gy` and DISCARDS them.** GLSL `mediums.glsl.ts:52-53`
  forms the Sobel `Gx,Gy`, eigen-decomposes, and `return vec3(dir, A)` (`:89`) — the gradient
  is thrown away. The WGSL twin `aurora-mediums.wgsl.ts:86-90` has the IDENTICAL discard
  (`return vec3<f32>(dir, A)`). Metal re-plumbs this, zero new taps. ✓
- **`uLightDir` is WebGL2-only; ABSENT from the WGSL struct.** `uLightDir` is in
  `uniformBridge.ts`/`aurora.frag.ts:130`; the WGPU struct (`uniformBridgeWGPU.ts`) packs
  `cursor` at off 64 (`uCursor.x, uCursor.y, _, _`) and has **no light lane**. A WGSL metal
  catch-light must synthesize the light from `uCursor` in-shader. ✓
- **The default field is PALE.** `DEFAULT_AURORA_CONFIG.palette` (`presets.ts:282-285`):
  `{L:0.72,C:0.10,h:55} … {L:0.95,C:0.03,h:70}` — chroma ceiling `C:0.10`, warm hues 45/55/70.
- **Free uniform pad slots exist, written 0 today** (`uniformBridgeWGPU.ts`): `scalars3.w`
  (off 60), `cursor.z/.w` (off 72/76), `ints1.z/.w` (off 104/108), `kuwahara.z/.w` (off 568/572).
  Homes for metal/source/vividness knobs with ZERO new struct lane (byte-offset lockstep).
- **Aurora is 100% procedural — NO texture, NO sampler, anywhere.** `grep` over
  `src/components/custom/aurora/` for `texImage2D|copyExternalImageToTexture|createImageBitmap|`
  `createSampler|texture_2d<|sampler2D` = **ZERO**. The image source is the first texture
  pipeline. (Challenge-2 R1 / Challenge-1 R2 — confirmed live.)
- **LIVE born-RED confirmed.** `/substrates/aurora` renders a pale pink→peach→blue wash
  (`challenge/delta-aurora-light.png`); the configurator medium roster is
  smooth/pastel/watercolor/oil/crayon/vangogh/oil-pastel/kuwahara — **NO metal, NO image**
  (DOM scrape this session: `hasMetal:false, hasBlur:false`). Challenge-1 measured the
  rendered field mean OKLab chroma **0.0350 < the 0.045 §3 floor → born-RED true** on the
  SHIP default, not just the spike. And a visible **periwinkle/blue zone** sits upper-right
  of the warm wash (Challenge-1 R4 / Challenge-3 — the per-zone-hue hole).

---

## 1. The KEEP / REFINE / RE-INVENT / BUILD ledger (survival of the fittest)

| Surface | Verdict | Why |
|---|---|---|
| The single-pass field engine (WGSL primary + WebGL2 fallback over `useGpuSubstrate`) | **KEEP** | Fit. ONE rAF, ONE substrate, byte-offset-locked dual bridges. Every new axis rides it. |
| The nuclei spine (`nucleiField`/`domainWarp`/drift/breath) | **KEEP** | The §3 vibrant-backdrop substrate; metal ridges + image blur-zones both ride its drift. |
| The medium dispatch (`uMedium` ladder, each medium AUTHORS its body) | **KEEP** | The AX.W13 own-body discipline; metal appends slots 8/9 with zero touch to 0–7. |
| The configurator + presets + `resolveAtoms` ≤7-atom door | **KEEP** | Drives every axis already; new axes are new dropdown values, not a new config system. |
| The dual-backend parity net (`shader-eval-harness`) | **KEEP** (extend) | Fit for ARITHMETIC; has never round-tripped a TEXTURE — the image arm needs a real capture-pair lane, not a numeric eval (Challenge-2 R1). |
| The PALE default field (`C:0.10` palette, no vividness floor) | **REFINE** | The §3 gray-glass root cause. Add the shader-resident OKLab vividness floor (opt-OUT, default-high) + lift the default palette to a warm `C:0.16–0.20` band. The library's OWN identity evolving (no-backwards-compat carve). |
| The metal taxonomy (the two competing wave specs) | **REFINE/RECONCILE** | metal is a `medium` (uMedium 8/9), NOT an orthogonal `finish` — the slots prove it (Challenge-3 R2). Drop the medium×finish split framing; keep `vividness`/`source` as the genuinely-orthogonal axes. |
| metal/metal-gradient finishes | **BUILD** (deft, ~zero-fork) | A re-plumbed-gradient two-term BRDF body at `uMedium==8/9`, dual-ported GLSL+WGSL, cursor-z-synth light. Falls out of the engine's OWN discarded math. |
| `source:"image"` blurred-flower | **BUILD** (net-new pipeline) | Aurora's FIRST sampler + texture binding + bind-group entry (WGPU) / texture unit (WebGL2) + the upload decode seam. A construction-time program permutation, NOT a runtime god-branch. Honest net-new, still a union (not a `<BlurredImage>` fork). |
| The macro-flower asset array | **BUILD** (consumer assets) | Does not exist (`find demo -iname '*flower*'` = nothing). The library ships `<Aurora source="image" :src>`; the demo curates the array. |
| per-page custom field | **REFINE** (chassis convention) | A wiring problem — a per-route field registry in the demo chassis, not a library fork. |

**RE-INVENT: nothing.** The blurred-image-as-separate-`<BlurredImage>`-component is RETIRED
into the aurora `source` axis (the union, not a parallel engine).

---

## 2. The UNION path — precisely how the current evolves toward the golden

### 2a. The vividness floor (REFINE the pale default) — the literal §3 fix

Append to the shared `procedural-color` chunk (GLSL + the WGSL twin), AFTER the
color/medium stage, BEFORE the tonemap — an OKLab chroma-floor lift:

```glsl
vec3 lab = linearToOklab(col);
float C  = length(lab.yz);
float Cmin = uVividness * VIVID_TARGET;          // mode-aware §3 floor (VIVID_TARGET ≈ 0.115)
// near-gray hue guard (Challenge-2 R4): below eps the hue is precision noise — synth the
// lift along the warm AURORA_CATCH_LIGHT_ANCHOR direction, never the noisy near-zero vector.
vec2 warmDir = normalize(vec2(WARM_ANCHOR_A, WARM_ANCHOR_B));
vec2 hueDir  = (C > VIVID_EPS) ? lab.yz / C : warmDir;
lab.yz = hueDir * max(C, Cmin);
col = oklabToLinear(lab);
```

- **Opt-OUT, default-high.** Default `<Aurora>` ships `uVividness` high enough to clear §3; a
  deliberately-pale hero sets `vividness={0}`. Inverts pale→vivid as the identity (the §3 fix).
- **The default palette ALSO lifts**: `DEFAULT_AURORA_CONFIG.palette` C:0.10 → a warm
  `C:0.16–0.20` band, hues 45–70 (the authored identity; the floor is the runtime guarantee).
- **Near-gray hue guard is STRUCTURAL** (Challenge-2 R4 H): below `VIVID_EPS` the floor
  synthesizes along the warm anchor (`AURORA_CATCH_LIGHT_ANCHOR`, `uniformBridge.ts:106`), so
  "never teal/navy" is a guarantee, not a hope — the BA.W-NO-GRAY warm-floor on the field side.
- Packs `uVividness` into a free pad slot (`scalars3.w` off 60) — no new struct lane. Pure
  OKLab arithmetic on the shared chunk → ports to WGSL by construction.

### 2b. metal / metal-gradient (BUILD the finish, deft) — folded from the discard

1. **Widen `structureTensorField` to RETURN its discarded gradient**, BOTH GLSL
   (`mediums.glsl.ts`) AND the WGSL twin (`aurora-mediums.wgsl.ts`). The existing `.xy`/`.z`
   callers (`flow.glsl.ts:48`, the kuwahara `:182` reads) stay byte-unchanged; only the metal
   body reads the new gradient lane. **The grad-transport must be PROVEN, not hand-waved**
   (Challenge-2 R6): the spike's `packGrad`→never-unpacked is a non-answer; the wave widens
   to a returned struct (WGSL) / out-param-or-vec4 (GLSL) with a precision-proven scheme.
2. **The metal body at `uMedium==8` (pure) / `9` (gradient)** — `N = normalize(vec3(grad *`
   `METAL_HEIGHT_SCALE, 1.0))`; the cursor-z-synth light
   `L = (cursorActive) ? normalize(vec3(uCursor - p, METAL_LIGHT_Z)) : idleRake` (the ONLY
   form that crosses to WGSL — `uCursor` is in-struct, `uLightDir` is not); a TWO-term
   anisotropic BRDF `streak(WHERE, along tensor tangent) × crest(N·H brightness)`, coherence-
   gated `smoothstep(0, METAL_COHERENCE_FLOOR, A)` so smooth zones stay smooth; a
   technicolor-DR `valley` term (deep warm-shadow troughs → bright crests); an achromatic-warm
   catch-light (`METAL_CATCH_WARM`, no hue — the field hue tints the body, the warm floor holds).
3. **metal-gradient (9)** = the metal BRDF over a pre-flattened base + a twinkle-IN-PLACE
   sparkle (`hash21(floor(p*DENSITY))` fixed per-cell seed, PHASE animated — glints, never
   boils). highp-conditioned seed (value-conditioning, NOT a WGSL `highp` qualifier which
   does not exist — Challenge-2 R2).
4. **The GESTALT, not just the metric** (Challenge-3 R1, LOAD-BEARING): the golden spike PNG
   reads as pastel TERRAZZO/speckle, not folded metal, because `METAL_HEIGHT_SCALE=2.3` on the
   dense noisy nuclei field flips the normal every pixel-pair and the streak lobe is sub-pixel.
   The wave MUST **low-pass the height field before the normal** (a smoothed gradient / lower
   nuclei octave so folds resolve at SHEET scale), WIDEN the streak so the rake is a visible
   band, and DEEPEN the valley toward a warm near-black (technicolor DR). And the gate adds a
   **coherence/orientation-co-alignment clause** (isotropic speckle FAILS even at high
   localContrast) + a **human EYE-VERIFY** both modes (the live-verify-capture rule).
5. **Cartoon-punch / liquid-weight** (Challenge-3 R3): the rake follows the cursor on the
   existing inertial lerp; a velocity-coupled streak-stretch (squash & stretch, morph-MORE-
   on-move) and a deep technicolor valley are the FLOW & PUNCH the binding law demands.

### 2c. `source:"image"` blurred-flower (BUILD the texture pipeline, honest net-new)

Reclassified from the golden's "swap the color stage" to **"Aurora's first textured pipeline
variant"** (Challenge-2 R1 H1). A CONSTRUCTION-TIME program permutation
(`source:"palette"|"image"`), NOT a runtime `if (uSource)` god-branch:

- NET-NEW resources, named honestly: a `GPUSampler` + `texture_2d<f32>` + a new bind-group
  entry on WGPU; a `gl.createTexture` + sampler params + a `uImage` sampler + texture-unit on
  WebGL2; the `copyExternalImageToTexture` / `texImage2D(ImageBitmap)` decode seam.
- The blur: a single-pass **bounded fixed-tap loop** (no FBO ping-pong, the substrate
  single-pass invariant), the radius modulated per-fragment by the SAME drifting `nucleiField`
  zone. **Explicit-LOD sampling** (`textureSampleLevel`/`textureLod(...,0.0)`) on every tap —
  no implicit-derivative reads inside the varying-radius loop (Challenge-2 R3, WebKit). The
  "kuwahara tap-budget precedent" is RETIRED as the justification (it is ALU re-evals, the
  image is dependent texture reads — a different cost class; re-justify with a real mobile-GPU
  frame-time measurement — Challenge-2 R3).
- The §3 vividness floor STILL applies (source-agnostic, on the final `col`) — a washed-out
  flower blooms to transmission-fit. The wave MUST land ≥1 real licensed macro-flower asset and
  prove clause-1 passes on the BLURRED image output (Challenge-3 R5 — a pale-petal image with
  near-zero hue cannot be lifted).
- **Cross-engine texture parity is the ONE genuine divergence** — explicit
  `premultiplyAlpha:false` / `colorSpaceConversion:none` / `flipY:false` on BOTH backends,
  gated by a REAL chromium-WGSL vs webkit-WGSL rendered-capture-pair (NOT a numeric eval, NOT
  a name-presence). This is the SAME upload primitive `BD.W-DOT-IMAGE` needs — BUT that seam
  does NOT exist yet (Challenge-1 R2 / Challenge-2 R1): one of these two waves is the PRODUCER
  of the shared upload primitive. Sequence them; do not claim DRY reuse of an unshipped sibling.

### 2d. per-page custom field (REFINE the chassis)

A thin per-route field registry in the demo chassis (`W-PAGE-BACKGROUND` extends): each demo
page declares its field (a varied vivid aurora preset / a `source:"image"` macro-flower / a
`medium:"metal"` field). A consumer convention (presets-in-consumers), NOT a library fork.

---

## 3. The deft-integration map (no fork, KISS, DRY) — corrected against the challenges

| New register | Composes (extant) | NET-NEW (honest) | Fork avoided |
|---|---|---|---|
| `medium:"metal"` (8) | `structureTensorField` (re-plumbed N, GLSL+WGSL), `uCursor`, OKLCh core | the 2-term BRDF + cursor-z light synth (NET-NEW WGSL shader code, not a re-point — Challenge-1 R3) + low-pass-normal + 2 knobs (free pads) | NOT a new shader/substrate — a `uMedium==8` body, dual-ported |
| `medium:"metal-gradient"` (9) | the metal BRDF over a flattened base | the twinkle-in-place sparkle (value-conditioned seed) | NOT a 2nd BRDF — metal over a pre-flattened col |
| `vividness` floor | the OKLab `procedural-color` chunk, the post-stage | a chroma-floor lift + the near-gray warm-anchor guard (default high = §3 identity) | NOT a new pass — appends to the post, both backends |
| `source:"image"` flower | the nucleiField drift, `useGpuSubstrate`, OETF/color chunk | **Aurora's FIRST sampler + texture binding + bind-group entry + upload decode seam** (net-new on both backends) + a bounded explicit-LOD tap-loop blur | NOT a `<BlurredImage>` parallel engine — an Aurora source axis (still a union) |
| per-page custom | resolveAtoms + W-PAGE-BACKGROUND | a per-route field resolver in the demo chassis | NOT a new config system — the atoms door, consumer-side |

`medium` (slots 0–9) × `source` (palette/image) × `vividness` (floor) — three real
orthogonal axes (the medium×finish "fourth axis" is dropped as incoherent — Challenge-3 R2).
The smooth/oil/vangogh/kuwahara mediums + `source:"palette"` + `vividness:0` defaults are
BYTE-IDENTICAL (the new lanes write 0). The vividness identity move is the ONE deliberate
default change (gated against an explicit legacy-palette+`vividness:0` config — Challenge-1
R5 — so the byte-identity invariant and the palette-lift identity move are BOTH literally true).

---

## 4. Convergence

The golden's SPINE is fit and verified — the four asks reduce to a re-plumbed BRDF body, an
OKLab post-stage lift, a texture pipeline, and a chassis convention, all on the ONE engine.
The build-time gaps are concrete and de-riskable: the metal GESTALT (re-tune off pixel-speckle
+ eye-verify), the image arm's net-new texture pipeline + a real webkit capture-pair + a real
flower asset, the grad-transport precision proof, and the metal-as-medium taxonomy reconcile.

**Convergence: ~78%** (spec/design fit + born-RED proven live; remaining 22% is build-time:
the metal gestalt re-tune, the net-new image texture pipeline, the real webkit cross-engine
spike + flower asset, and the two-stale-wave reconcile).
