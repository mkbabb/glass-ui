# AT.W0b — A1: metaball / SDF / gooey-rendering SOTA

**Lens:** A1 — state-of-the-art assessment of the goo-blob metaball/SDF/noise/AA
pipeline, against the value.js reference shader.
**Scope:** augment + harden the AT.W4 (goo-blob lift) and AT.W5 (D1 OKLCh shader)
waves with concrete, citable shader-quality upgrades and a tightened gate. Builds
ON `audit/W0-L6` (the design lens) and `design/AT.W1-blob-primitives.md` — does NOT
re-derive the lift contract.
**Disposition:** authored design/audit slice. NO src/ written; read-only across
value.js + glass-ui. Reference impl read in full
(`value.js/.../goo-blob/shaders/metaball.frag.glsl:1-160`,
`metaball.vert.glsl:1-9`, `composables/useMetaballRenderer.ts:44-70,215-230`).
SOTA via WebSearch/WebFetch (sources cited inline + §8); the few KNOWLEDGE-only
calls are marked `[K]`.

---

## 0. Executive summary — the four findings

The AT plan (W1 §6, W0-L6 §3) frames the blob shader work as **one** change: HSV→OKLCh
color perturbation (D1). That is correct but **incomplete**. A first-hand read of the
reference shader against current SOTA finds the demo's SDF/noise/AA core is *competent
2020-era Shadertoy*, with **four concrete, low-risk, citable quality gaps** that AT
should fold into W4/W5 — none of which the W1 gate currently catches:

1. **The edge AA is fixed-width, not derivative-based (frag :137-138).** The demo
   computes a hardcoded `px = 1/min(res)` and a `±1.5px` smoothstep band. SOTA is
   `fwidth(d)` screen-space-derivative AA — adapts per-pixel, free on the GPU, and the
   *only* correct width once `smin` blending and FBM displacement have made the field's
   gradient non-unit-length (which they have). **The demo's fixed band is provably wrong
   near satellite merges and noisy edges** — the very places the gooey blob's identity
   lives. (§2, the headline gap.)

2. **The smin is the C1 cubic, NOT the SOTA-recommended normalized quadratic
   (frag :86-89).** The demo's `smin` is structurally Quilez's *old* cubic
   (`h*h*h*k/6`). Quilez's 2024 rewrite recommends the **normalized quadratic** as the
   default (faster, `k` maps to actual blend-distance in world units, never
   overestimates). The demo's `k` does NOT map to a distance — it's an opaque knob, and
   the renderer post-scales it by `POS_SCALE` (`useMetaballRenderer.ts:~223`) to
   compensate. Adopting the normalized form makes `uSmoothK` a *meaningful* token. (§3.)

3. **The noise is value-noise FBM with NO derivative/rotation decorrelation
   (frag :54-78).** The demo's `fbm` sums plain `valueNoise` at `freq *= 2.0` with NO
   inter-octave rotation — this produces the axis-aligned grid artifacts value noise is
   infamous for, *and* they compound across octaves because every octave shares the
   integer lattice orientation. glass-ui's OWN aurora shader already fixes exactly this
   (`aurora.frag.ts:124` `mat2 r = mat2(0.8,0.6,-0.6,0.8)` + `2.02` non-power-of-two
   lacunarity). The blob lift should adopt aurora's hardened `fbm`, not the demo's naive
   one — a *consistency* win, not net-new code. (§4.)

4. **Premultiplied-alpha output is CORRECT (frag :159) — keep it; harden the gate.**
   The demo outputs `vec4(rgb*alpha, alpha)` — premultiplied, which is what GPUs and
   correct compositing want; this is a genuine strength and must NOT regress. But the
   *color perturbation happens on straight (un-premultiplied) RGB before the multiply*,
   which is right — and the D1 OKLCh transposition must preserve that ordering or it
   reintroduces edge fringing. The W5 gate should assert the premultiply ordering, not
   just the OKLCh math. (§5.)

**Net AT proposal:** the D1 wave (W5) is under-scoped as "HSV→OKLCh only." Rename/expand
it to **"the shader-quality wave"** carrying four byte-isolated changes (AA, smin, fbm,
premultiply-preserve) PLUS the OKLCh transposition, each with its own gate line. This is
*more* elegant, not more work: three of the four (AA, smin, fbm) are **single-line or
small-function swaps to forms glass-ui already trusts or Quilez canonically recommends**,
and they make `uSmoothK`/the edge a *token-meaningful* surface instead of magic numbers.
Verdict on the W1 framing: **AUGMENT** (the D1 transposition is sound; the wave that
carries it should carry the whole quality delta while the shader is open) — not refute.

---

## 1. The reference shader, read as a pipeline (file:line)

`value.js/.../goo-blob/shaders/metaball.frag.glsl`, the per-pixel flow:

| Stage | Lines | What it does | SOTA verdict |
|---|---|---|---|
| Pointer deform | :112-117 | normalize-toward-pointer warp, `smoothstep(0.4,0.0,dist)` falloff | fine — cheap, organic |
| Body radius + pulse | :120 | `uBodyRadius + sin(phase)*amp` | fine |
| **FBM edge displacement** | :54-78,:122-126 | value-noise fbm, 3 oct, displaces the body SDF radius | **gap 3 — no octave rotation (§4)** |
| Body SDF | :82-84,:126 | `sdCircle` = `length(p-c)-r` | canonical |
| **Satellite smin merge** | :86-89,:128-134 | cubic `smin(d,satD,k)` over ≤4 sats | **gap 2 — old cubic, non-normalized (§3)** |
| **Edge AA** | :137-138 | `px=1/min(res)`; `1-smoothstep(-1.5px,1.5px,d)` | **gap 1 — fixed width, not fwidth (§2)** |
| Early-out | :140-143 | `alpha<0.001 → discard` | fine (perf) |
| **Color perturb** | :93-106,:146-157 | rgb→HSV, perturb h/s/v by color-noise fbm, HSV→rgb; inner edge-glow on V | **D1 target — HSV→OKLCh (W1 §6 / W0-L6 §3)** |
| **Output** | :159 | `vec4(rgb*alpha, alpha)` — premultiplied | **CORRECT — preserve (§5)** |

The vertex shader (`metaball.vert.glsl:1-9`) is a trivial fullscreen-quad passthrough —
no notes, lift verbatim. `vUv = 0.5*(aPosition+1.0)` matches aurora's convention, so the
two shaders are coordinate-compatible (relevant when they share `useWebGLCanvas`, W2).

**Cross-reference to glass-ui's own shader:** aurora (`aurora.frag.ts`) is glass-ui's
in-house SOTA reference and it is *materially more advanced* than the demo blob shader on
exactly the axes below — rotated-octave fbm (:124), domain-warp (Quilez double-warp,
:151-156), ACES tonemap (:331-338), premultiplied output (:817). The blob lift is an
opportunity to **bring the blob up to aurora's bar**, reusing aurora's hardened helpers
rather than carrying the demo's weaker copies. That framing (consistency, not net-new) is
what keeps these augmentations inside AT's no-gold-plating discipline.

---

## 2. GAP 1 (HEADLINE) — derivative-based edge AA via `fwidth`

### The defect

```glsl
// metaball.frag.glsl:137-138  (CURRENT)
float px = 1.0 / min(uResolution.x, uResolution.y);
float alpha = 1.0 - smoothstep(-px * 1.5, px * 1.5, d);
```

This assumes the signed distance `d` changes by exactly `px` per screen pixel — i.e. that
the field's gradient is **unit-length** in the shader's `uv` space. Two things in this
very shader break that assumption:

- **`smin` blending flattens the gradient.** A smooth-minimum deliberately bends the
  field so its slope is `<1` in the blend region (that's what makes the merge gooey). The
  AA band there is therefore *too narrow* — the merge neck aliases.
- **FBM displacement (`bodyDisplacement`, :124) adds a high-frequency term to the
  radius**, so near the noisy edge `|∇d|` swings well above and below 1. Fixed-width AA
  over- and under-blurs along the same contour.

The fix is the SOTA-canonical screen-space-derivative AA. From pkh.me's
"Perfecting anti-aliasing on signed distance functions" and numb3r23's fwidth note:

```glsl
// SOTA — derivative-based, gradient-correct
float aa    = fwidth(d);                       // |∂d/∂x|+|∂d/∂y|, the true screen footprint
float alpha = 1.0 - smoothstep(-aa, aa, d);    // or: clamp(0.5 - d/aa, 0.0, 1.0)
```

`fwidth(d)` *measures* how fast the distance actually changes between adjacent pixels, so
it self-corrects for the smin flattening and the noise swings — exactly the case the fixed
band gets wrong. It is a hardware intrinsic (`abs(dFdx)+abs(dFdy)`), effectively free, and
**already available** — the shader is `#version 300 es` with `precision highp float`, so
`fwidth` is core, no extension needed (it would need `OES_standard_derivatives` only on
WebGL1; this is WebGL2). Source:
[pkh.me — Perfecting AA on SDFs](https://blog.pkh.me/p/44-perfecting-anti-aliasing-on-signed-distance-functions.html),
[numb3r23 — using fwidth for distance AA](http://www.numb3r23.net/2015/08/17/using-fwidth-for-distance-based-anti-aliasing/),
[Cassidy — SDF antialiasing](https://drewcassidy.me/2020/06/26/sdf-antialiasing/).

### Subtlety the W5 gate must encode

pkh.me's article assumes a **unit-gradient** SDF and does NOT cover non-unit fields
(WebFetch confirmed: "The article does not address... non-unit gradients"). Our field is
non-unit by construction (smin + displacement). That is precisely *why* `fwidth(d)` is the
right tool and the fixed `±1.5px` is the wrong one: `fwidth` is computed on the **final
blended/displaced** `d`, so it captures whatever gradient the field actually has at that
pixel. A naive alternative — normalizing by `length(vec2(dFdx(d),dFdy(d)))` — is the same
quantity up to the L1-vs-L2 constant and slightly costlier; `fwidth` is the pragmatic
default. The one true caveat: at the dead-center of a near-flat smin neck `fwidth(d)→0`
and the band collapses to a hard edge; guard with `max(fwidth(d), 1e-4)`.

### Why this is the headline

The gooey-blob *identity* is the satellite merge neck and the watercolor-noisy rim. Those
are exactly the two loci where fixed-width AA misfires. Derivative AA is a one-line change
that makes the primitive's signature feature render correctly at every resolution and DPR
— and it composes perfectly with the W2 `useWebGLCanvas` DPR-clamped resize (the AA no
longer needs to *know* the resolution; `fwidth` reads it from the rasterizer).

---

## 3. GAP 2 — the smin is the old non-normalized cubic

### The defect

```glsl
// metaball.frag.glsl:86-89  (CURRENT — Quilez "old" cubic)
float smin(float a, float b, float k) {
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * h * k / 6.0;
}
```

This is the **cubic** member of Quilez's polynomial family, but in its *un-normalized*
2013 form. The consequence: `k` does **not** equal the blend-region thickness in distance
units. The renderer betrays this — it post-scales the authored knob:
`gl.uniform1f(uniforms.uSmoothK, config.smoothK * params.smoothK / 0.22 * POS_SCALE)`
(`useMetaballRenderer.ts:~223`). The `/0.22 * POS_SCALE` is a fudge factor to drag an
opaque `k` back into a useful range — a code smell that a *normalized* smin removes
entirely.

### The SOTA forms (Quilez 2024 rewrite, WebFetch-verified)

```glsl
// Quadratic — Quilez's RECOMMENDED default (normalized: k = blend thickness in world units)
float smin(float a, float b, float k) {
    k *= 4.0;
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * k * (1.0 / 4.0);
}
// Cubic (normalized) — smoother (C2-ish), if the rounder merge is wanted
float smin(float a, float b, float k) {
    k *= 6.0;
    float h = max(k - abs(a - b), 0.0) / k;
    return min(a, b) - h * h * h * k * (1.0 / 6.0);
}
```

Quilez's analysis (WebFetch of `iquilezles.org/articles/smin/`): the polynomial CD
(clamped-difference) family — quadratic/cubic/quartic — is **C1-continuous, never
distorts the field outside the blend region, and the quadratic "balances fast, close
enough to circular, never overestimates,"** which is why he names it his default. The
exponential variant (`-k*log2(exp2(-a/k)+exp2(-b/k))`) is **associative** (blend order
doesn't matter) but **distorts the field everywhere** and needs transcendentals — wrong
trade for a ≤4-satellite blob where order is fixed and per-pixel cost matters.
Source: [Quilez — smooth minimum](https://iquilezles.org/articles/smin/).

### The AT recommendation

Adopt the **normalized quadratic smin** and DELETE the `/0.22*POS_SCALE` fudge. Then
`uSmoothK` becomes a clean token: "blend-neck thickness, in `uv` units." This is the
token-first axis (a magic number becomes a meaningful CSS-tunable knob), and it costs one
multiply less than the cubic. If the art direction wants the rounder cubic neck, ship the
*normalized* cubic — but either way the un-normalized form and its fudge factor go. There
is one consequence to gate: changing the smin changes the merge geometry slightly, so the
mood-param `smoothK` defaults (`useBlobMood.ts`) re-tune to the new `k`-means-distance
scale — the same re-tune class the W1 §6 OKLCh mood-magnitude re-tune already books.

> Note on the satellite-opacity hack (`satD += (1.0-opacity)*0.3`, frag :132): this fakes
> a fading satellite by *pushing its SDF outward* so the smin absorbs it less. With a
> normalized `k`, the `0.3` constant is now in real distance units and reads as "0.3 uv of
> opacity-driven recession" — also a candidate token. Low priority; flag, don't force.

---

## 4. GAP 3 — value-noise FBM with no octave decorrelation

### The defect

```glsl
// metaball.frag.glsl:67-78  (CURRENT — naive fbm)
float fbm(vec2 p, int octaves) {
    float value = 0.0, amp = 0.5, freq = 1.0;
    for (int i = 0; i < 4; i++) {
        if (i >= octaves) break;
        value += amp * valueNoise(p * freq);
        freq *= 2.0;   // power-of-two lacunarity, NO rotation
        amp  *= 0.5;
    }
    return value;
}
```

Two known value-noise weaknesses, both unmitigated here:

1. **Value noise is "blocky"/axis-aligned** (Book of Shaders §11: "Value noise tends to
   look blocky"). Each octave's hash lattice is axis-aligned.
2. **No inter-octave rotation + power-of-two lacunarity** means every octave's lattice is
   *aligned to the same axes and harmonically related*, so the grid artifacts **reinforce**
   across octaves instead of averaging out. This is the single biggest fbm-quality lever
   and it's free.

### glass-ui already solved this — adopt aurora's fbm

```glsl
// aurora.frag.ts:121-132  (glass-ui's OWN hardened fbm — the in-house SOTA)
float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    mat2 r = mat2(0.8, 0.6, -0.6, 0.8);   // ~37° rotation per octave — decorrelates lattices
    for (int i = 0; i < 5; i++) {
        if (i >= uNoiseOctaves) break;
        v += a * vnoise(p);
        p = r * p * 2.02;                  // 2.02 (not 2.0) — irrational-ish, kills harmonic banding
        a *= 0.5;
    }
    return v;
}
```

The rotation matrix + `2.02` lacunarity is the canonical Quilez fbm hardening (his fbm
article, and the Book of Shaders fbm chapter both show it). The two shaders use the *same*
`hash21`-family value noise, so this is a **drop-in swap to a form glass-ui already ships
and trusts** — pure consistency, zero new technique, and it removes the grid-y look from
both the edge displacement (:123) and the color-noise field (:148). Sources:
[Quilez — fBM](https://iquilezles.org/articles/fbm/),
[Book of Shaders — fBM](https://thebookofshaders.com/13/),
[Book of Shaders — Noise](https://thebookofshaders.com/11/).

### The bigger swing (optional, name-forward): analytic-derivative noise

Quilez's "value noise derivatives" (2008) computes `noise + ∇noise` in one evaluation,
which enables (a) **derivative-aware fbm** where high-slope octaves are damped — "much
nicer variety... erosion-like effects" — and (b) **gradient-driven domain warp** without a
second noise tap. For an organic watercolor blob edge this is the *most* expressive option.
But it's a genuine technique change (rewrite `valueNoise` to return `vec3(n, dn/dx, dn/dy)`),
higher risk, and the rotated-octave fbm already captures ~80% of the visual win at ~0% of
the risk. **Recommendation: adopt aurora's rotated fbm in W5; NAME-FORWARD the
analytic-derivative-noise + domain-warp upgrade** as a future blob-polish ask gated on a
real art-direction request (don't gold-plate). Source:
[Quilez — value noise derivatives](https://iquilezles.org/articles/morenoise/).
`[K]` The analytic-derivative recommendation is knowledge-grounded (the article confirms
the technique; the specific risk/benefit call for *this* blob is my assessment).

> Gradient/simplex noise is the textbook alternative to value noise (no axis artifacts,
> cheap analytic gradients — Gustavson's GLSL simplex). But swapping the noise *basis*
> changes the blob's whole texture and diverges from aurora's value-noise house style.
> Rotated value-noise fbm is the *consistent* fix; a basis change is over-reach for AT. `[K]`

---

## 5. GAP 4 — premultiplied alpha: a STRENGTH to preserve, and a D1 ordering trap

### The strength (do not regress)

```glsl
// metaball.frag.glsl:159  (CURRENT — CORRECT)
fragColor = vec4(rgb * alpha, alpha);
```

This is **premultiplied (associated) alpha** output, which is exactly what the SOTA
compositing pipeline wants: GPUs prefer premultiplication, and a soft-edged cutout
composited with *straight* alpha gets dark/light edge fringing because the transparent-edge
RGB bleeds in unweighted. The demo does it right. Source:
[Real-Time Rendering — GPUs prefer premultiplication](https://www.realtimerendering.com/blog/gpus-prefer-premultiplication/),
[provideocoalition — premultiplied vs straight](https://www.provideocoalition.com/alpha-channels-premultiplied-vs-straight/).

**Consequence for the lift (W4):** the consumer's `<canvas>` and the W2 `useWebGLCanvas`
context must be created with `premultipliedAlpha: true` (the WebGL default) AND the page
composite/CSS must expect premultiplied — and any CSS `drop-shadow` on the canvas
(`GooBlob.vue` applies one) reads the premultiplied edge correctly. The W4 gate should
assert the context attribute, because a `premultipliedAlpha:false` context with this shader
output **double-darkens the edge** — a silent, easy-to-miss regression of exactly the class
glass-ui's binding-verification precept exists to catch.

### The D1 ordering trap (W5)

The color perturbation (frag :146-157) runs on **straight** RGB and the premultiply happens
*last* (:159). That ordering is correct and must survive the HSV→OKLCh transposition. The
risk: a careless D1 rewrite that folds the `*alpha` into the OKLab→RGB conversion, or
clamps post-multiply, reintroduces fringing or crushes the edge. **The W5 gate must assert
"perturb on straight RGB, premultiply once, last"** — not only the OKLCh math. Concretely:
the gamut clamp the D1 path needs (`clamp(rgb,0,1)` after `oklabToRgb`, W0-L6 §3.1 :157)
must happen **before** the `*alpha`, on straight RGB. This is a one-line ordering invariant
that the CPU-side OKLCh test cannot see (it tests color math in isolation, not the alpha
composite) — so it needs its own explicit gate line or a code-review checklist item.

---

## 6. Hardening the D1 (W5) OKLCh transposition itself

W0-L6 §3 and W1 §6 already specify the HSV→OKLCh math well (Ottosson constants mirrored
from value.js, the `/360.0` deletion, hue-in-degrees, L-axis brightness, gamut clamp). Two
SOTA-grounded hardening notes to add:

1. **Perturb chroma multiplicatively, not additively, and clamp to gamut — not to [0,1].**
   HSV `S` is bounded `[0,1]`; OKLCh chroma `C` is unbounded and its *achievable* max
   depends on `L` and `h` (the OKLCh gamut is a non-convex blob). An additive
   `C += (n-.5)*uSatShift` can push `C` far outside sRGB at high `L`, and a naive
   `clamp(rgb,0,1)` post-conversion *desaturates AND hue-shifts* the clipped color
   (channel clipping is not perceptually neutral). The cheap in-shader mitigation: scale
   `C *= (1 + (n-.5)*uSatShift)` (proportional, stays sensible across the gamut) and, after
   `oklab→rgb`, if any channel is out of range, **reduce `C` toward the in-gamut chroma**
   rather than hard-clip RGB — even a 1-step `C *= 0.0 if any(rgb<0||rgb>1) else 1.0`
   bisection beats raw clip. value.js owns the full `gamutMapOKLab` (CPU-only); the GLSL
   needs a *cheap* approximation, and "scale C down on overflow" is the standard one.
   `[K]` (gamut-clip-desaturates is established OKLab knowledge; the cheap-GLSL-mitigation
   call is my recommendation, not a fetched source).

2. **The edge-glow L-bump (frag :154-155) is the one perceptual unknown — keep the manual
   gate line, and tie it to a fixed reference.** W0-L6 §3.2 already books a manual
   visual-confirmation line-item (the P5-precedent). Strengthen it: the demo story renders
   **three** tiles side by side — HSV-era (baseline), OKLCh-naive-port (same numeric
   constants), OKLCh-retuned (perceptually-matched glow constant) — so the human judging
   "does the glow read the same" has the actual A/B/C, per the π visual-evidence precept
   W7 adopts (`baseline|close/` + `DELTA.md`). Without the middle tile you can't tell a
   *retune* from a *regression*.

---

## 7. GPU performance posture (per-pixel SDF cost)

The blob is a **single fullscreen quad, per-pixel SDF** — no raymarching, no loops over
depth — so it is fragment-bound, not iteration-bound. Cost ledger for the proposed changes:

| Change | Per-pixel cost delta | Verdict |
|---|---|---|
| `fwidth(d)` AA (§2) | +1 intrinsic (≈free; derivatives are computed by the rasterizer regardless) | **strictly cheaper-or-equal** vs the fixed-px math it replaces |
| normalized quadratic smin (§3) | −1 multiply vs cubic; runs ≤4× (sat loop) | **cheaper** |
| rotated-octave fbm (§4) | +1 `mat2` mul/octave (×3 oct × 2 fbm calls) | negligible; aurora ships it at 5 oct |
| OKLab perturb (§5, W5) | OKLab needs a cbrt (`pow(x,1/3)`) ×3 + two 3×3 matmuls vs HSV's branchy frac math | **roughly neutral**; cbrt is the only real cost, once per pixel inside the alpha mask |

The early-out (`alpha<0.001 → return`, :140) means the *expensive* color path only runs
inside the blob — so the OKLab cbrt is masked to the body, not the whole quad. Net: the
four changes are **performance-neutral-to-positive**. The one watch: `fwidth` forces the
fragment to run in 2×2 quads (it always does on modern GPUs anyway), and the early-out
`return` can cause minor divergence at the silhouette — but that's already true of the
current `discard`-equivalent. No perf gate regression expected; the W2 frame-parity gate
(aurora) and a W5 "renders ≥30fps at 2× DPR on the demo story" smoke line cover it.
`[K]` (cost ledger is knowledge-grounded shader-perf reasoning; no single source.)

---

## 8. AUGMENTED-AT proposals (wave + hard gate)

The W1 plan's W4/W5 stand; these AUGMENT them. Nothing here adds a wave — it loads the
already-open W5 shader wave with the full quality delta while the shader is touched.

### Proposal A1-1 — derivative AA (fold into W5; HEADLINE)
- **Slice:** replace frag :137-138 fixed-`px` band with `fwidth(d)` derivative AA, guarded
  `max(fwidth(d),1e-4)`. The W2 `useWebGLCanvas` resize no longer needs to feed `uResolution`
  *for AA* (it still feeds it for the pointer/noise scale).
- **Gate:** the demo-story manual-visual line gains an explicit "satellite-merge neck and
  noisy rim are smooth at 1× and 2× DPR" check (the loci fixed-width gets wrong); a
  resolution-sweep screenshot in the `close/` set per the π precept.

### Proposal A1-2 — normalized quadratic smin (fold into W5)
- **Slice:** swap frag :86-89 to Quilez's normalized quadratic; DELETE the
  `/0.22*POS_SCALE` fudge in the renderer; `uSmoothK` becomes "neck thickness in uv units";
  re-tune `useBlobMood` `smoothK` defaults to the new scale.
- **Gate:** a CPU unit asserting the normalized smin is C1 at the seam and that
  `smin(a,b,0)==min(a,b)` (degenerate `k→0` is exactly hard union); the mood-default re-tune
  is visually confirmed in the same A/B/C story tile.

### Proposal A1-3 — adopt aurora's rotated-octave fbm (fold into W5)
- **Slice:** replace the blob's naive `fbm` (frag :67-78) with aurora's rotated-octave form
  (`aurora.frag.ts:121-132`) — `mat2(0.8,0.6,-0.6,0.8)` + `2.02` lacunarity. Same `hash21`
  noise, so it's a drop-in. Applies to BOTH the edge-displacement and color-noise taps.
- **Gate:** visual A/B (grid-artifact gone) in the story; NO new unit (it's a known-good
  glass-ui form). NAME-FORWARD the analytic-derivative-noise upgrade as a future ask.

### Proposal A1-4 — premultiplied-alpha invariant (fold into W4 + W5)
- **Slice (W4):** assert the `useWebGLCanvas` context is `premultipliedAlpha:true`; document
  that `GooBlob`'s output is associated alpha (so a consumer's CSS composite/`drop-shadow`
  is correct).
- **Slice (W5):** preserve "perturb straight RGB → gamut-clamp straight RGB → premultiply
  last" ordering through the OKLCh rewrite.
- **Gate:** a code-review/checklist invariant line "color perturbation + clamp precede the
  single `*alpha`"; a W4 unit/assert on the context attribute (this is the silent-regression
  class the binding-verification precept targets).

### Proposal A1-5 — gamut-safe OKLCh chroma perturbation (harden W5)
- **Slice:** multiplicative chroma (`C *= 1+(n-.5)*uSatShift`), not additive; on RGB
  overflow scale `C` down toward gamut rather than hard-clip channels.
- **Gate:** extend the W1 §6 / W0-L6 §3.2 vitest OKLCh-equivalence spec with an
  **out-of-gamut sweep**: feed high-`L`/high-`C` perturbations and assert the GLSL clamp
  path stays in `[0,1]` AND preserves hue within an ε (i.e. the mitigation desaturates,
  doesn't hue-shift) — the existing "in-gamut clamp" gate line, sharpened from "stays in
  range" to "stays in range *without hue drift*."

### Proposal A1-6 — rename the wave to reflect scope
- **Slice:** W5's title in `AT.md` ("The D1 OKLCh shader") → **"The shader-quality wave —
  D1 OKLCh + derivative AA + normalized smin + rotated fbm + premultiply-preserve."** Five
  byte-isolated edits, each gated; the OKLCh CPU-equivalence test stays the binding math
  gate, the others ride the demo-story manual-visual + the targeted units above.

### What this lens does NOT recommend (anti-gold-plating)
- **No noise-basis change** (value→simplex/gradient): diverges from aurora's house style;
  over-reach. Rotated value-fbm is the consistent fix.
- **No raymarched/3D metaballs, no exponential smin:** the blob is 2D fullscreen; associative
  smin buys nothing for a fixed ≤4-sat blend and costs transcendentals.
- **No analytic-derivative noise in AT:** named-forward, art-direction-gated.
- **No Playwright/WebGL frame-golden as a *binding* gate:** stays optional (W0-L6 §3.2);
  the CPU-equivalence + manual A/B/C visual carry W5. (A1 concurs with DEC-AT-4.)

---

## 9. Sources

- [Inigo Quilez — Smooth minimum (2024 rewrite: normalized poly/exp/root, kernels, associativity)](https://iquilezles.org/articles/smin/)
- [Inigo Quilez — fBM (rotated-octave construction)](https://iquilezles.org/articles/fbm/)
- [Inigo Quilez — Value noise derivatives / morenoise (analytic gradients, erosion fbm)](https://iquilezles.org/articles/morenoise/)
- [pkh.me — Perfecting anti-aliasing on signed distance functions (fwidth AA, unit-gradient caveat)](https://blog.pkh.me/p/44-perfecting-anti-aliasing-on-signed-distance-functions.html)
- [numb3r23 — Using fwidth for distance based anti-aliasing](http://www.numb3r23.net/2015/08/17/using-fwidth-for-distance-based-anti-aliasing/)
- [Andrew Cassidy — Antialiasing for SDF textures](https://drewcassidy.me/2020/06/26/sdf-antialiasing/)
- [The Book of Shaders — Noise (§11, value-noise blockiness)](https://thebookofshaders.com/11/)
- [The Book of Shaders — Fractal Brownian Motion (§13, rotated-octave fbm)](https://thebookofshaders.com/13/)
- [Real-Time Rendering — GPUs prefer premultiplication](https://www.realtimerendering.com/blog/gpus-prefer-premultiplication/)
- [ProVideo Coalition — Alpha channels: premultiplied vs straight](https://www.provideocoalition.com/alpha-channels-premultiplied-vs-straight/)
- Reference impl (read in full): `value.js/demo/@/components/custom/goo-blob/shaders/metaball.frag.glsl:1-160`, `metaball.vert.glsl:1-9`, `composables/useMetaballRenderer.ts:44-70,215-230`.
- glass-ui in-house comparison: `src/components/custom/aurora/shaders/aurora.frag.ts:121-132,151-156,331-338,817`; `aurora/composables/color.ts:1-60`.

`[K]` flags mark findings reasoned from knowledge (cutoff Jan 2026) where no specific
source was fetched: the analytic-derivative-noise risk call (§4), the gamut-clip-desaturates
GLSL mitigation (§6.1), the per-pixel perf ledger (§7). All web-sourced findings carry an
inline citation.
