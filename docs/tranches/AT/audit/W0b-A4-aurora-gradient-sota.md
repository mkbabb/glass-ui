# AT.W0b — A4: aurora / gradient-mesh background SOTA

**Lens A4** — the state-of-the-art lens for glass-ui's aurora gradient/mesh-background
substrate. Augments + hardens the prior 6-lens W0 audit (`audit/W0-L{1..6}`) and the
AT.W1 design slice (`design/AT.W1-blob-primitives.md`). Author analysis + design only;
NO src/ written, NO sibling written. Read-only across glass-ui + value.js.

Every glass-ui claim is `file:line`-cited against HEAD. SOTA findings are tagged
`[web]` (cited URL) or `[knowledge]` (reasoned from training, cutoff Jan 2026). The
value.js reference impl is `/Users/mkbabb/Programming/value.js/demo/@/lib/animation/webgl-utils.ts`.

The A4 brief: (1) assess glass-ui's aurora vs animated-mesh-gradient / aurora-background
SOTA; (2) assess `deriveAurora`'s harmony model vs SOTA palette generation; (3) assess
how aurora shares the AT.W2 `useWebGLCanvas` substrate with goo-blob (the ≥2 substrate
consumers) — and harden the W2 transposition where the prior lenses left gaps; (4)
propose aurora-quality augmentations as AUGMENTED-AT waves/slices, each with a hard gate.

---

## §0 — Headline (what A4 adds to AT, in one breath)

The prior audit framed aurora as the **donor** of a hardened lifecycle envelope to the
new `useWebGLCanvas` substrate — correct, and the headline of W2. A4 finds the
**reverse leverage is also true and currently unbooked**: the W2 substrate extraction
is the once-a-tranche moment to close **three concrete aurora-quality gaps that are
SOTA-table-stakes in 2026 and that aurora visibly fails today** —

1. **No dither → 8-bit banding is structurally present** in every smooth-medium aurora
   field. Aurora bakes OKLCh→linear, ACES-tonemaps, then writes to an 8-bit canvas with
   only an OPTIONAL white-noise `paperGrain` (default `0.008`) that is NOT a calibrated
   ±0.5/255 dither and is OFF on the default config. This is the #1 visible-quality gap
   vs SOTA (`§2.1`).
2. **The palette LUT interpolates in LINEAR sRGB, not OKLab** — aurora authors stops in
   OKLCh (perceptually uniform) but `samplePalette` (`aurora.frag.ts:195-203`) `mix()`es
   the baked LINEAR-RGB triples, so between-stop interpolation crosses the same muddy
   midpoints OKLab was adopted to avoid. The OKLCh authoring is half-wasted at the
   interpolation step (`§2.2`).
3. **`deriveAurora`'s harmony model is a fixed HSL-style hue rotation in OKLCh
   coordinates** — it walks hue by literal degree offsets (`+180·t`, `+240·t`, `±28°`)
   with NO adaptive dark/light/muddy-zone steering. That is one generation behind the
   2026 SOTA (meodai `pro-color-harmonies`, Figma "Volume"), which steers hues away from
   muddy zones and adapts L/C strategy to the seed's tone (`§3`).

None of the three needs new substrate; all three are CHEAP (a dither is ~3 GLSL lines; the
OKLab LUT is a known closed-form; the harmony steering is a CPU-side `color.ts` refinement
with the value.js Ottosson core already in hand). All three are gated by the SAME class of
test aurora already trusts (CPU OKLab-equivalence + the W2 byte-parity discipline). A4
proposes folding them as a tightly-scoped **AT.W2b "aurora-quality" slice** riding the W2
substrate work (the shader is already open on the bench), NOT a new tranche — see `§6`.

A4 also HARDENS the W2 substrate contract itself: the prior lenses' byte-parity gate is
necessary but **not sufficient** for a shared lifecycle envelope — aurora and goo-blob have
DIVERGENT context attributes, quad geometry, and DPR policy, and a naive `useWebGLCanvas`
that hardcodes aurora's would silently regress goo-blob (`§4`).

---

## §1 — What aurora IS, measured against the 2026 "aurora / mesh-gradient" SOTA

### §1.1 — the technique class is correct and current

Aurora is a **single full-screen-triangle fragment-shader field** (`runtime.ts:319-331`
emits the canonical `[-1,-1, 3,-1, -1,3]` triangle; `aurora.vert.ts:5-11`) with a
domain-warped multi-nuclei softmax composition (`aurora.frag.ts:151` `domainWarp`, `:206`
`nucleiField`). This is exactly the SOTA shape for animated backgrounds: the modern
"mesh/aurora gradient" canon (Stripe's gradient, Alex Harri's deconstruction, the Codrops
WebGL-background series) all converge on **fullscreen fragment + Quilez domain warp + fBm**,
not a displaced vertex mesh `[web: alexharri.com/blog/webgl-gradients; gist dkaraush Stripe
gradient]`. The "Stripe mesh gradient" name is a misnomer in the popular write-ups — the
production Stripe shader is a fragment field, and a vertex-displaced color mesh is the older,
lower-fidelity approach (coarse, vertex-count-limited) `[web: leadwerks vertex-displacement;
medium Caden Chen]`. **Aurora picked the right substrate.** No change warranted here; this is
a STRENGTH to record so a future "should we switch to a vertex mesh?" question is pre-refuted.

DESIGN.md already cites Quilez warp + Harri + Hufnagl + Heckel (`DESIGN.md:165-168`) — the
canon is correctly sourced. Aurora's domain warp is the literal Quilez double-warp
(`aurora.frag.ts:151-156`, comment "Quilez canonical double warp"), which is the reference
implementation, not an approximation.

### §1.2 — where aurora is AHEAD of the commodity SOTA

Aurora materially exceeds the typical "mesh gradient generator" tier on three axes, worth
recording so AT does not regress them:

- **Painterly media layer.** The commodity tools (Mesh Gradient Studio, gradients.juangarcia.ch,
  the Stripe package) stop at a smooth warped field. Aurora's `medium` axis
  (`smooth|pastel|watercolor|oil`, `presets.ts:48`) adds genuine NPR — curved-spine
  brushstrokes (`aurora.frag.ts:457` `curvedStroke`), anisotropic crayon tooth
  (`:621` `mediumOil_crayon`), watercolor wet-edge (`:352` `mediumWatercolor`). This is
  Meier-1996 / Hertzmann-1998-lineage painterly rendering `[knowledge]`, well beyond the
  commodity tier. Keep.
- **Demand-driven RAF parking.** `needsAnimation()` (`runtime.ts:507-521`) parks the loop
  when drift uniforms are 0 AND the cursor has settled — most web gradient shaders run a
  perpetual 60fps `requestAnimationFrame`. This is a real efficiency win the SOTA tools lack.
- **OKLCh-authored, gamut-mapped palette.** Stops are authored in OKLCh and baked through
  value.js's Ottosson gamut map (`color.ts:33,280`). The commodity tools author in
  sRGB/hex. Aurora's *authoring* is SOTA — the gap is purely at the *interpolation* and
  *output* steps (`§2`).

### §1.3 — the one place the "alive" axis is BELOW SOTA: no curl-noise color advection

The 2026 "alive aurora" reference look (the divergence-free curl-noise vortex field that
reads as slow fluid motion) is achieved by **advecting a coordinate through a curl-noise
field** — `p = p + curl(p)·dt`, iterated 4–8 steps — so coherent vortices emerge
`[web: threejs-blocks CurlNoise; al-ro.github.io/projects/embers; emildziewanowski.com/curl-noise]`.
Aurora has a `flow.pattern: "multi"` that is "curl-noise driven" (`aurora.frag.ts:261-265`)
BUT it is used ONLY to pick stroke DIRECTION in the oil medium — it never advects the COLOR
field. The smooth-medium field's only motion is (a) nuclei orbit (`:212-216`), (b) palette
breathe (`:243`), (c) warp scroll (`:153`). There is no curl advection of the composition
coordinate. The result: the smooth aurora reads as "slowly panning warped bands," not
"slowly churning fluid." This is a fidelity gap vs the OpenAI/Sora-press reference DESIGN.md
§1 explicitly targets.

**Disposition:** NOT an AT ask — it is a net-new visual capability (a new `flow`/motion
mode), higher blast-radius than the three §0 gaps, and risks the W2 byte-parity. **A4
records it as NAME-FORWARD** (`§7`), a candidate aurora-v5 motion axis, gated on a real
consumer wanting it. Flagged here so the SOTA survey is complete, not to fold it.

---

## §2 — The two SOTA output-fidelity gaps (CHEAP, gated, fold-worthy)

### §2.1 — GAP 1: no calibrated dither → structural 8-bit banding `[web, high-confidence]`

**The defect.** Aurora's output path (`aurora.frag.ts:808-817`):
```glsl
col = saturate3(col, uSaturation);
col = aces(col);                                   // tonemap → display-ish [0,1]
float grain = hash21(gl_FragCoord.xy + t * 17.0);  // WHITE noise, value-hash
col += (grain - 0.5) * uPaperGrain;                // uPaperGrain default 0.008
col = clamp(col * 0.985 + 0.008, 0.0, 1.0);
fragColor = vec4(col * uAlpha, uAlpha);            // → 8-bit canvas
```
The canvas backing store is 8-bit per channel. A smooth warped gradient across a large
viewport steps through ~256 levels per channel — the textbook banding case. The ONLY
mitigation present is `uPaperGrain`, and it is inadequate on three counts:
1. **It is OFF by default in spirit** — `DEFAULT_AURORA_CONFIG.paperGrain = 0.008`
   (`presets.ts:182`), and the band-killing amplitude SOTA wants is exactly `1.0/255 ≈
   0.0039` of *triangular* noise — `0.008` of *uniform white* noise is a different, coarser
   thing tuned as a "film grain" texture, not a dither.
2. **It is the WRONG noise distribution.** SOTA dithering uses **TPDF (triangular
   probability density function)** or interleaved-gradient noise (Jimenez/CoD), NOT uniform
   white noise — uniform noise leaves residual banding and adds more visible grain per unit
   band-suppression `[web: blog.frost.kiwi/GLSL-noise-and-radial-gradient;
   momentsingraphics.de/BlueNoise; shader-tutorial.dev color-banding-dithering]`. The
   canonical one-liner is interleaved gradient noise:
   ```glsl
   float ign(vec2 p){ return fract(52.9829189*fract(dot(p, vec2(0.06711056,0.00583715)))); }
   col += (ign(gl_FragCoord.xy) - 0.5) / 255.0;   // ±0.5/255, applied at output
   ```
   `[web: blog.frost.kiwi]`. TPDF is the more rigorous remap (sum/difference of two uniform
   draws) and is the right choice for a STATIC-quality background; IGN is the cheap
   per-frame default. Either dwarfs uniform white at equal grain.
3. **It is tuned as a creative knob, not a floor.** A consumer who sets `paperGrain: 0`
   (a legitimate "clean atmospheric" choice) gets FULL banding. A dither must be a
   non-defeatable OUTPUT FLOOR, orthogonal to the creative grain.

**Why even OKLCh doesn't save it `[web]`:** banding is the 8-bit *quantization* step, a
SEPARATE problem from the muddy-midpoint problem OKLab solves
(`[web: toolbox365 gradient-banding-and-oklch; bluemonkeymakes]`). Perceptual color spaces
fix *which* colors the gradient passes through; dithering fixes *how finely* the 8-bit
framebuffer can represent the transition. Aurora needs BOTH and currently has NEITHER at the
output (it has OKLCh authoring but not OKLab interpolation — §2.2 — and no calibrated dither).

**The fix (≈3 GLSL lines + one CPU constant):** add an interleaved-gradient-noise (or TPDF)
dither of fixed ±0.5/255 amplitude AT the output, AFTER `aces` and the creative `paperGrain`,
BEFORE the final write. Keep `paperGrain` as the orthogonal creative grain. The dither floor
is config-independent (or exposes a single `dither: boolean` defaulting `true`).

> **SOTA-confidence:** HIGH. Calibrated output dithering is table-stakes for any large-area
> gradient shader in 2026; its absence is the single most visible quality gap in aurora's
> smooth medium. Knowledge + 4 corroborating web sources.

### §2.2 — GAP 2: the palette LUT interpolates in LINEAR sRGB, not OKLab

**The defect.** `samplePalette` (`aurora.frag.ts:195-203`):
```glsl
vec3 samplePalette(float id) {
  ...
  float t = fract(scaled);
  t = smoothstep(0.0, 1.0, t);
  return mix(uPalette[i0], uPalette[i1], t);   // LINEAR-sRGB lerp between two stops
}
```
`uPalette` is baked to LINEAR sRGB CPU-side (`color.ts:33` `oklchToLinear`,
`aurora.frag.ts:23` comment "Palette baked CPU-side to linear-sRGB"). The shader then
`mix()`es two adjacent linear-RGB triples. Linear-light interpolation is BETTER than
gamma-sRGB interpolation (it is physically correct light mixing, avoids the dark-midpoint
artifact of naive sRGB lerp) — but it is NOT OKLab interpolation. A linear-light lerp from
blue to yellow still passes nearer gray than an OKLab lerp does, because the straight line in
linear-RGB does not track the perceptual hue arc `[web: aras-p.info Optimizing-Oklab-gradients;
bottosson.github.io/posts/oklab]`. Aurora authors stops in OKLCh PRECISELY to get perceptual
uniformity, then throws half of it away at the between-stop interpolation.

**The contradiction is internal to aurora.** `paletteToCssGradient` (`color.ts:80-89`) — the
CSS placeholder — emits a `linear-gradient(...)` of gamma-sRGB hexes, an even coarser
interpolation; the comment (`color.ts:71-74`) admits it is a "visually-adjacent
approximation." That's acceptable for a 0-GPU placeholder. But the SHADER, where aurora can
afford the math, also under-interpolates.

**The fix (a known closed-form, ≈15 GLSL lines):** bake the palette to OKLab (3 floats per
stop, same uniform size), interpolate in OKLab in `samplePalette`, convert OKLab→linear-sRGB
per-pixel before the medium/tonemap path. The OKLab↔linear matrices are the standard
Ottosson constants — the EXACT pair the AT.W5 goo-blob D1 shader is ALREADY adding to GLSL
(`AT.W1 §6`, "Add `rgbToOklab`/`oklabToRgb` GLSL fns"). **This is a free ride on W5's
shader work:** AT is already authoring Ottosson OKLab matrices in GLSL for goo-blob; aurora's
palette LUT is the second consumer of those exact fns, which converts a "goo-blob-only shader
helper" into a ≥2-consumer shared GLSL primitive (satisfies the overfitting bar for the GLSL
OKLab pair the same way `useWebGLCanvas` satisfies it for the lifecycle envelope).

> **SOTA-confidence:** HIGH for the principle (OKLab interpolation > linear-RGB > sRGB is
> settled `[web: aras-p, bottosson]`). MEDIUM on the magnitude of the visual win for AURORA
> specifically — aurora's stops are within-palette analogous/harmonious (not blue↔yellow
> complementary extremes), so the muddy-midpoint risk is SMALLER than a generic two-color
> gradient. The win is real but subtler than the dither (§2.1). Gate it on a visual-confirm
> line, and treat the per-pixel OKLab→RGB cost as the tradeoff to measure (`§6` gate).

> **Performance note `[knowledge]`:** Aras's "Optimizing Oklab gradients" shows the per-pixel
> cube-root in OKLab→linear is the cost; a full-screen field does it per fragment. Aurora's
> shader is already heavy (the oil medium is hundreds of ALU ops); one OKLab decode in
> `samplePalette` is marginal for smooth/pastel/watercolor but should be MEASURED, not assumed
> free. The fix is gated on "no FPS regression on the smooth medium," not unconditional.

---

## §3 — `deriveAurora`'s harmony model vs palette-generation SOTA

### §3.1 — what `deriveAurora` does (file:line)

`deriveAurora` (`color.ts:182-230`) seeds one color → N OKLCh stops:
- **L ramp:** symmetric spread of `lightnessSpread` (0.32 default) around the anchor L,
  clamped into a painterly `[0.35, 0.95]` band, monotonic ascending (`color.ts:202-219`).
- **C falloff:** `C = anchor.C·(1 − (1−chromaFalloff)·t)` — full chroma at the deep base,
  scaled toward the pale apex (`color.ts:223`).
- **Hue walk (`deriveHue`, `color.ts:233-253`):** literal degree offsets per harmony —
  `monochrome` (hold), `complementary` (`+180·t`), `triad` (`+240·t`), `analogous`
  (`±hueSpread` centred, default ±28°).
- **Gamut safety:** every stop through `gamutMapStop` (`color.ts:280-292`) — value.js
  `gamutMapOKLab` + a 6-step inward-chroma nudge. This part IS SOTA (adaptive-L0 hull map,
  hue-preserving). Hardened by `derive-aurora.test.ts` against neon/near-black/multi-format
  adversarial seeds — genuinely strong.

### §3.2 — where it sits vs 2026 SOTA `[web]`

The gamut/output half is SOTA. The **harmony half is one generation behind.** The 2026
reference (meodai `pro-color-harmonies`, Figma "Volume") does NOT use fixed hue rotations;
it `[web: github.com/meodai/pro-color-harmonies; colorarchive.org oklch guide; figma Volume]`:

1. **Steers hues away from "muddy zones"** (dark yellows/browns) rather than landing a stop
   wherever `+180·t` puts it. A `complementary` walk from an orange seed lands the apex in
   the muddy blue-green trough; `deriveAurora` has no awareness of this and will produce a
   dead stop there.
2. **Adapts L/C strategy to the seed's tone** — dark seeds (L<0.3), light seeds (L>0.7), and
   vibrant seeds get DIFFERENT lightness/chroma narratives, with SMOOTH interpolation near
   the thresholds to avoid category "jumps." `deriveAurora` applies ONE symmetric L-spread +
   one C-falloff regardless of whether the seed is near-black or near-white (its only
   adaptation is the L-band CLAMP, which SHIFTS the window but does not re-strategize).
3. **Distributes chroma/visual-weight perceptually** ("Chroma Narratives," "Color
   Hierarchy") so one stop reads as protagonist — `deriveAurora`'s monotonic C-falloff is a
   fixed ramp, no per-stop weighting.
4. **Offers post-process "modulators"** (Sine/Wave/Zap/Block) for controlled irregularity —
   `deriveAurora` is purely deterministic-smooth, no texture knob.

The critique the SOTA libraries level at exactly `deriveAurora`'s approach is on the record:
*"Standard color harmony libraries often rely on simple mathematical hue rotations in HSL or
HSV space; while mathematically correct, these often produce results that feel unbalanced or
'muddy.'"* `[web: github.com/meodai/pro-color-harmonies]`. `deriveAurora` does the hue
rotation in OKLCh coordinates (better than HSL — the L and C axes ARE perceptual) but the HUE
WALK ITSELF is still the naive fixed-degree rotation the SOTA moved past.

### §3.3 — verdict + disposition

**`deriveAurora`'s harmony model is NOT SOTA — it is "OKLCh-coordinate hue rotation," one
step short of "adaptive perceptual harmony."** It is, however, *good enough and gamut-safe*,
and it SHIPPED at AS.W7 (`aurora/index.ts:28`) as a thin composing producer with an explicit
"no color math re-implemented" posture (`color.ts:171-178`). A4's verdict is **augment, do
NOT replace**, and only IF a consumer is asking — because:
- The overfitting bar matters: `deriveAurora` has a real consumer (the demo Palette tab, T6)
  but bolting on muddy-zone steering + tonal adaptation is net-new surface that needs its own
  ≥2 justification. Adding it speculatively is the exact over-engineering the precepts forbid.
- The clean augmentation, IF taken, is **muddy-zone hue steering** (the single highest-value
  SOTA delta): after `deriveHue`, nudge the walked hue off the OKLab muddy trough
  (the low-chroma-ceiling hue band) before `gamutMapStop`. This is a small, testable
  `color.ts` refinement (CPU-side, value.js core in hand), gated by a unit asserting no
  derived stop lands in the muddy band below a chroma-ceiling threshold. The tonal-adaptation
  + modulators + chroma-narratives are LOWER priority and NAME-FORWARD.

**Recommendation:** book muddy-zone steering as an OPTIONAL `deriveAurora` refinement inside
the §6 aurora-quality slice (small, gated, real SOTA delta); name-forward the
tonal-adaptation/modulator depth as an aurora-v5 item gated on a consumer. Do not relitigate
the VAL-1 kill (`AT.md:189` — `deriveAurora` shipped, the kill did not fire); A4 confirms it
should stay and proposes a bounded improvement, not a rewrite.

---

## §4 — Hardening the W2 `useWebGLCanvas` shared substrate (aurora + goo-blob)

The prior lenses (L5 §1.3, AT.W1 §2) establish the transposition: extract aurora's
RAF/visibility/PRM/resize/context-loss envelope to `useWebGLCanvas`; aurora + goo-blob are
the ≥2 consumers; gate on aurora byte-parity. A4 AUGMENTS this with the **divergence map** the
byte-parity gate does NOT catch — the two consumers do not bootstrap GL identically, and a
substrate that bakes aurora's choices silently breaks goo-blob.

### §4.1 — the divergences `useWebGLCanvas` MUST parameterize (not hardcode)

Comparing aurora's `arm()` (`runtime.ts:301-576`) against the value.js metaball bootstrap
(`webgl-utils.ts` + the demo `useMetaballRenderer`):

| Axis | Aurora | goo-blob (value.js) | Risk if substrate hardcodes aurora's |
|---|---|---|---|
| **Quad geometry** | full-screen **triangle** `[-1,-1,3,-1,-1,3]`, attr `aPos`, `drawArrays(TRIANGLES,0,3)` (`runtime.ts:326,331,493`) | full-screen **quad** 6 verts, attr `aPosition`, `drawArrays(TRIANGLES,0,6)` (`webgl-utils.ts:51,55`) | goo-blob's shader reads attr `aPosition`; aurora's substrate binds `aPos` → link-time attr mismatch, blank canvas. **The attr NAME and vert COUNT must be substrate params** (or the substrate owns the quad and BOTH shaders adopt one canonical attr name — cleaner). |
| **Context attrs** | `antialias:false, alpha:true, premultipliedAlpha:true, preserveDrawingBuffer:(capture)` (`runtime.ts:304-311`) | demo sets its own; metaball wants `alpha:true` + premultiplied for the drop-shadow composite | `preserveDrawingBuffer` is capture-only for aurora; goo-blob has no capture mode. The attrs must be **per-consumer options**, not the aurora literal. |
| **Blend mode** | `ONE, ONE_MINUS_SRC_ALPHA` (premultiplied) (`runtime.ts:473`) | metaball composites its own alpha edge | Same premultiplied family, but goo-blob's edge-glow alpha math may differ; blend setup belongs in the **per-frame/init callback**, not the substrate. |
| **DPR clamp** | `min(dpr, 2)` (`runtime.ts:338`) | metaball uses its own cap | A hardcoded `2` is a reasonable shared default but should be an **option** (a high-DPI hero may want 1.5 for perf). |
| **Reduced-motion frozen-t** | aurora freezes `t = frozenOffset (3.7)` so the static frame is a specific phase (`runtime.ts:200,526`) | metaball's PRM single-frame is its own | The frozen-t VALUE is aurora-semantic; the substrate provides the "render one frame then park" MECHANISM, the consumer picks the frozen time. |
| **Suspend reasons** | `Set<"tab-hidden"|"off-screen"|"manual">` (`runtime.ts:61`) | metaball uses a single boolean + visibilitychange | The `SuspendReason` set IS the hardened model to lift — goo-blob INHERITS off-screen suspend for free (a genuine win L5 §1.3 noted). Keep it; it is the right shared mechanism. |

**The hard finding:** the byte-parity gate proposed in W2 verifies AURORA is unchanged; it
says NOTHING about whether goo-blob can ALSO consume the extracted substrate. A substrate
extracted to be "aurora's envelope, generalized" risks being "aurora's envelope, renamed" —
passing byte-parity while being unusable by the second consumer. **The W2 gate must be
two-sided.**

### §4.2 — A4's hardening of the W2 gate (augment DEC-AT-1)

Augment the W2 hard gate with a **second-consumer smoke**: `useWebGLCanvas` must be proven to
drive a MINIMAL second program (a trivial 1-uniform fragment shader with a DIFFERENT attr
name + 6-vert quad + non-capture attrs) green in the test harness, BEFORE the goo-blob lift
(W4) depends on it. Without this, the goo-blob-substrate coupling is discovered only at W4,
defeating the "W2 lands before W4" sequencing rationale (`AT.md:139`).

Concretely the substrate contract A4 recommends (shape only):
```ts
interface UseWebGLCanvasOptions {
  canvasRef: Ref<HTMLCanvasElement | null>;
  vert: string; frag: string;
  uniformNames: readonly string[];
  contextAttrs?: WebGLContextAttributes;     // per-consumer; NOT aurora's literal
  quad?: "triangle" | "quad";                // or: substrate owns ONE canonical quad + attr
  dprCap?: number;                           // default 2
  blend?: (gl) => void;                      // consumer sets blendFunc in init
  respectReducedMotion?: boolean;            // default true
  frozenTime?: number;                       // PRM static-frame phase; consumer-chosen
  onFrame: (ctx: WebGLFrameContext) => void;
}
```
The canonical-attr-name option (substrate owns one quad with one attr name, both shaders
adopt it) is the CLEANEST resolution — it removes the attr-mismatch class entirely and is a
legitimate clean break (rename goo-blob's `aPosition`→`aPos` at lift; no back-compat owed).
A4 recommends that over carrying two quad shapes.

> **Gate (augmented W2):** (a) aurora `drawFrame` byte-identical to 3.2.0 (the existing
> discipline, `AT.md:146`); AND (b) a second-consumer smoke proves `useWebGLCanvas` drives a
> minimal non-aurora program (different attr/quad/attrs) to a correct readback in the
> harness; AND (c) `rg frostShader src/ = 0`; AND (d) net LOC down. Two-sided.

### §4.3 — the GLSL OKLab pair is the SECOND shared GLSL primitive (ties §2.2 to W5)

The W2 substrate shares the LIFECYCLE. A4 surfaces a SECOND, smaller shared GLSL asset the
plan does not yet name: the **OKLab↔linear-sRGB GLSL function pair**. AT.W5 adds it to
goo-blob's shader for the D1 perturbation (`AT.W1 §6`). §2.2 wants the SAME pair in aurora's
`samplePalette`. Rather than two copies, AT should home the GLSL OKLab pair as a shared shader
chunk (a `src/composables/glass/webgl/oklab.glsl.ts` string fragment both shaders `#include`-by-
concatenation, mirroring how aurora composes `VERTEX_SRC`/`FRAGMENT_SRC` as string modules).
This makes the GLSL OKLab pair a ≥2-consumer shared primitive (goo-blob D1 + aurora palette
LUT) — the same overfitting-clearing move `useWebGLCanvas` makes for the lifecycle. It also
gives the W5 CPU-equivalence test (`AT.md:149`) a SECOND assertion target for free (aurora's
palette LUT now uses the gated GLSL OKLab, so the same CPU port covers both).

---

## §5 — WebGPU vs WebGL2: explicitly do NOT migrate aurora in AT `[web]`

The A4 brief asks the WebGPU-vs-WebGL2 question. The 2026 answer for a GRADIENT BACKGROUND is
unambiguous and A4 records it to pre-empt a speculative migration:

- **WebGPU reached "ships by default in Chrome, Firefox, Safari, Edge" in Nov 2025**
  `[web: webgpu.com/news; chrome dev from-webgl-to-webgpu]` — but Firefox stable is still
  staged (Nightly-default → stable "tentatively late 2026"), and Safari requires recent iOS.
  WebGL2 remains the **universally-supported** substrate. The production guidance is explicit:
  "default to WebGPU with WebGL fallback" is for COMPUTE-heavy workloads; "for gradient
  backgrounds using fragment shaders, WebGL2 is fully functional"
  `[web: dailydevpost webgpu-vs-webgl; sitepoint benchmarks]`.
- **WebGPU's win is COMPUTE** (4–8× on parallel particle/physics/inference workloads via
  compute shaders + direct buffer access) `[web]`. Aurora is a SINGLE full-screen fragment
  draw — zero compute, one triangle. There is **no WebGPU performance win** for a fragment
  gradient field; the migration would be pure cost (WGSL rewrite of the entire `aurora.frag.ts`
  pipeline, a new context path, a fallback to maintain) for zero user-visible gain.
- glass-ui already carries a "webgpu path" reference for the GLASS frost renderer
  (`CLAUDE.md` structure note; `useGlassRenderer`), which is the right place for any WebGPU
  experimentation — NOT aurora.

**Verdict:** aurora stays WebGL2. The `useWebGLCanvas` substrate is WebGL2; "the webgpu path
stays separate" (`AT.W1 §2`) is correct and A4 affirms it. No AT WebGPU work. Record as a
pre-refuted question so a future audit does not re-open it without a compute consumer.

---

## §6 — Proposed AUGMENTED-AT: the W2b "aurora-quality" slice

A4's three SOTA gaps (§2.1 dither, §2.2 OKLab LUT, §3 muddy-zone steering) are CHEAP, gated by
aurora's existing test class, and ride work AT is ALREADY doing (the W2 shader/substrate is on
the bench; the W5 GLSL OKLab pair is being authored). A4 proposes folding them as a single
tightly-scoped slice rather than a new tranche — bundling avoids re-opening the shader twice.

**AT.W2b — aurora output-fidelity + harmony (rides W2, gated independently):**

| Item | Change | Hard gate |
|---|---|---|
| **D-1 dither floor** (§2.1; HIGH value) | Add interleaved-gradient-noise (or TPDF) ±0.5/255 dither at `aurora.frag.ts` output, after `aces`+`paperGrain`, before write. Config-independent floor (or single `dither:bool` default true). `paperGrain` stays the orthogonal creative grain. | (a) aurora byte-parity gate is **rebased** (the dither CHANGES output by design — so the W2 byte-identity assertion must be split: the COMPOSITION path byte-identical, the dither an additive ≤1/255 delta provable as bounded); (b) a CPU unit asserts the IGN/TPDF amplitude is exactly ±0.5/255; (c) manual visual-confirm: a large smooth-blue field shows NO banding (the P5-precedent visual line). |
| **D-2 OKLab palette LUT** (§2.2; MEDIUM value) | Bake palette to OKLab; interpolate OKLab in `samplePalette`; OKLab→linear per-pixel using the shared GLSL OKLab pair (§4.3, same fns as W5). | (a) CPU OKLab-equivalence: the GLSL OKLab port round-trips to value.js core to 1e-6 (extends the W5 test — `AT.md:149`); (b) **no FPS regression** on the smooth/pastel/watercolor mediums (the per-pixel OKLab decode cost is measured, not assumed — gate FAILS if smooth-medium frame time regresses >X%); (c) manual visual-confirm: a 2-stop analogous field is visibly smoother through the midpoint. |
| **D-3 muddy-zone hue steering** (§3.2; OPTIONAL, real SOTA delta) | In `deriveAurora`'s `deriveHue`, after the harmony walk, steer the hue off the OKLab low-chroma-ceiling trough before `gamutMapStop`. CPU-side, value.js core in hand. | a unit asserting NO derived stop (across the adversarial seed × harmony matrix already in `derive-aurora.test.ts`) lands in the muddy band below a chroma-ceiling threshold; monotonic-L + gamut-safety regressions stay green. |

**Sequencing:** W2b lands WITH or immediately AFTER W2 (the shader is open; the substrate is
extracted) and BEFORE W5 ships the GLSL OKLab pair only if D-2 is taken — else D-2/D-3 ride
after W5 (which authors the OKLab pair first). The cleanest order: **W2 (substrate+frost
delete) → W5 (goo-blob D1 authors the GLSL OKLab pair) → W2b D-2 (aurora's palette LUT
consumes that exact pair, making it ≥2) + D-1 dither + D-3 steering.** This makes the GLSL
OKLab pair a clean 2-consumer primitive by construction.

**Overfitting posture for W2b:** every W2b item improves an EXISTING shipped consumer
(aurora's smooth/pastel/watercolor fields + `deriveAurora`'s demo Palette tab) — none is
net-new substrate, so none needs a fresh ≥2 witness; they are quality fixes to a shipped
surface, the same class as the AS-residual correctness fold (`AT.md:95`). The GLSL OKLab pair
IS net-new shared substrate and clears ≥2 (goo-blob D1 + aurora LUT) by construction.

**Decision to surface (DEC-AT-A4):** is W2b in-scope for AT, or name-forward to an aurora-v5
tranche? A4 RECOMMENDS folding D-1 (dither) at minimum — it is the cheapest, highest-value,
most-clearly-SOTA gap, and the W2 shader work is the natural moment. D-2/D-3 are
defensible-to-defer if AT's blast-radius budget is tight, but D-2 specifically gets MUCH
cheaper if it rides W5's GLSL OKLab pair, so deferring it past AT loses that free ride.

---

## §7 — Named-forward (inv-16-clean, glass-ui-internal or future-tranche)

- **Curl-noise color advection** (§1.3) — the "alive fluid" SOTA motion axis aurora lacks.
  Net-new visual capability, higher blast-radius, gated on a real consumer wanting it.
  aurora-v5 motion-mode candidate. NOT AT.
- **`deriveAurora` tonal adaptation + modulators + chroma-narratives** (§3.2 items 2–4) —
  the deeper SOTA harmony depth beyond muddy-zone steering. Gated on a consumer past the
  demo Palette tab. aurora-v5.
- **WebGPU aurora** (§5) — pre-refuted; re-open ONLY with a compute consumer. The webgpu
  experimentation home is the glass frost path, not aurora.
- **The GLSL OKLab shared pair** (§4.3) — if D-2 is deferred, the pair still lands at W5 for
  goo-blob; aurora's LUT becomes its 2nd consumer whenever D-2 is taken. Named-forward as the
  shared-GLSL-color home the same way `useWebGLCanvas` is the shared-lifecycle home.

Every cross-repo item stays NAME-FORWARD: value.js K.W3 supplies its OWN `ColorResolver` and
its own harmony core; A4 records, does not absorb. The π visual-evidence precept (`AT.md:211`)
is the right vehicle for D-1's "no banding" + D-2's "smoother midpoint" manual confirms —
baseline|close/ + DELTA.md, exactly the blob-wave protocol (`AT.md:243`) extended to aurora.

---

## §8 — A4 summary verdict

- **Aurora's substrate choice is SOTA** (fullscreen fragment + Quilez warp + fBm; painterly
  media + demand-driven RAF exceed the commodity tier). Keep; record as a strength.
- **Aurora's OUTPUT is below SOTA on two cheap, fixable axes:** no calibrated dither (§2.1,
  HIGH-confidence, the #1 visible gap) and linear-RGB (not OKLab) palette interpolation
  (§2.2, the OKLCh authoring half-wasted). Both fold cleanly into a W2b slice riding the W2
  shader work; D-2 rides W5's GLSL OKLab pair for free.
- **`deriveAurora`'s harmony model is NOT SOTA** — OKLCh-coordinate fixed hue rotation, one
  generation behind adaptive perceptual harmony (muddy-zone steering, tonal adaptation). Its
  gamut/output half IS SOTA. Augment with muddy-zone steering (small, gated, real delta); do
  NOT rewrite; name-forward the deeper depth.
- **The W2 substrate gate is one-sided and must be hardened** — aurora byte-parity proves
  aurora unchanged but NOT that goo-blob can consume the substrate; the two diverge on
  quad/attr/context-attrs/DPR (§4.1). Add a two-sided gate: a second-consumer smoke before W4
  depends on W2 (§4.2). Adopt the canonical-attr-name clean break.
- **WebGPU is a non-goal for aurora in 2026** (§5) — fragment gradient = zero compute win;
  WebGL2 is the universally-supported, correct substrate. Pre-refuted.
- **The GLSL OKLab pair (W5) should be a shared chunk** consumed by goo-blob D1 AND aurora's
  palette LUT (§4.3) — a 2nd shared GLSL primitive alongside `useWebGLCanvas`.
</content>
</invoke>
