# AT.W0b — A2: OKLab/OKLCh in-shader color SOTA (the D1 transposition, hardened)

**Lens:** A2 — validate/harden the D1 shader transposition (HSV→OKLCh in the metaball
fragment shader). Augments `AT.W1-blob-primitives.md §6` + `audit/W0-L6 §3` + `AT.md
DEC-AT-4`. Built ON the prior plan; does not re-derive. Every glass-ui/value.js claim is
`file:line`-cited; SOTA claims are web-sourced + flagged knowledge-vs-web.

**Verdict in one line:** the D1 transposition (OKLCh-perturb-then-back) is the RIGHT
move — but the prior plan has a **load-bearing color-space bug** (the perturbation must
happen in LINEAR-sRGB OKLab, while `uBaseColor` is GAMMA sRGB), a **matrix-source
ambiguity** (value.js exact-Mat3 vs the convenience shader matrices give different
round-trip error), and an **under-specified in-shader gamut step** (`clamp(rgb,0,1)` is
perceptually destructive). All three are fixable; this lens specifies the exact GLSL +
the hardened CPU-equivalence gate that is sound WITHOUT a WebGL harness.

---

## §0 — The corpus actually read (in full, per the analyze-in-full precept)

| Artefact | Read | The load-bearing fact |
|---|---|---|
| `metaball.frag.glsl:91-160` (value.js demo) | full | HSV path: `rgb2hsv`(:93) → perturb h/s/v(:146-155) → `hsv2rgb`(:102). `fragColor = vec4(rgb*alpha, alpha)` (:159) — **no tonemap, no linearization. `uBaseColor` is treated as final display RGB.** |
| `useMetaballRenderer.ts:44-70` (value.js demo) | full | `cssColorToRgb` = 1×1-canvas `getImageData()[i]/255` → **GAMMA sRGB [0,1]**. This is what feeds `uBaseColor` (`:221-223` upload). |
| `aurora.frag.ts:1-9, 23-25, 330-338, 811-812` (glass-ui) | full | **Aurora does NOT do OKLab in-shader.** Palette baked CPU-side to LINEAR sRGB (`color.ts oklchToLinear`), shader interpolates in linear + `aces()` tonemaps in linear (`:812`). The shader is gamma-naive; gamma is the framebuffer's job. |
| `aurora/composables/color.ts:1-293` (glass-ui) | full | The value.js-backed OKLab core (inv-K-2): `cssToOklch`(:119), `oklchToLinear`(:33), `gamutMapStop`(:280) — all compose value.js's Ottosson primitives; ZERO local color math. |
| `value.js src/units/color/gamut.ts:67-99, 283-348` | full | `srgbToOKLab` (:283) takes **GAMMA** sRGB, linearizes internally (`srgbToLinear`), cube-roots LMS. `oklabToLinearSRGB` (:67) returns **LINEAR**. The canonical math the GLSL must mirror. |
| `value.js src/units/color/constants.ts:346-358` | full | `LINEAR_SRGB_TO_LMS` + `LMS_TO_LINEAR_SRGB` — the EXACT Ottosson matrices (10-digit). **These differ from the GM-Shaders/LYGIA convenience matrices** — see §3. |
| GM Shaders "Mini: OkLab" (web) | fetched | The canonical in-shader pair: `im1*linear` → `sign(lms)*pow(abs(lms),1/3)` → `im2*…`. Operates on **linear** input. |
| Ottosson "sRGB gamut clipping" (web) | fetched | `clamp(rgb,0,1)` = "heavily distorted hues, loss of detail." Adaptive-L0 α=0.05 is the recommended map; chroma-reduction is the cheap-but-sound middle. |
| Aras-P "Optimizing Oklab gradients" (web) | fetched | `cbrtf` dominates CPU OKLab cost; on GPU `pow()` is hardware-accelerated — the per-pixel cost is real but not a blocker at blob scale. |

---

## §1 — Does aurora already do OKLab in-shader? (the prompt's first question)

**NO — and that is the whole reason D1 is non-trivial.** Aurora's architecture (`aurora.frag.ts:6`)
is **bake-OKLCh-CPU-side, interpolate-in-LINEAR-sRGB, tonemap-in-linear**. The shader
never sees OKLab; `color.ts:33 oklchToLinear` does the OKLCh→linear conversion on the
CPU and uploads a `uPalette[]` of linear triples. The shader's only color-space act is
`aces()` (`:331`) in linear, then the framebuffer applies the sRGB OETF.

**Consequence for D1 — this is the headline of this lens:** goo-blob is the FIRST glass-ui
shader to do OKLab *in-shader*. There is no existing in-shader OKLab GLSL to crib from in
glass-ui; D1 introduces it. The CPU-side reference (`color.ts`) is the equivalence anchor,
not a copy source. So the gate cannot be "matches aurora's in-shader OKLab" (there is
none) — it must be "matches value.js's CPU Ottosson core to a stated tolerance" (§5).

**Architectural note (augments AT.md §Architecture transpositions):** because aurora bakes
OKLCh→linear on the CPU and goo-blob will perturb in OKLab *per-pixel*, the two are NOT
the same color path and should NOT be unified into a shared in-shader color module in AT.
A future "shared OKLab GLSL" lever exists (≥2 the moment goo-blob lands), but it is
name-forward, not in-scope — aurora has zero need for per-pixel OKLab and folding it in
would be overfit. **This lens REFUTES any temptation to make D1 "also move aurora
in-shader."** (No such temptation is in the plan; flagged pre-emptively.)

---

## §2 — THE BUG: the color-space mismatch the D1 plan does not name

This is the single most important finding of this lens. The prior plan (`AT.W1 §6`,
`L6 §3.1`) says "perturb in OKLCh then convert back" and lists the GLSL line swaps — but it
**never states which sRGB encoding `uBaseColor` is in**, and gets it implicitly wrong.

**The chain, traced end-to-end:**

1. `cssColorToRgb` (`useMetaballRenderer.ts:66`) returns `getImageData/255` = **gamma sRGB**.
   The lifted `ColorResolver` / `defaultBlobColorResolver` (AT.W1 §3) is specified as
   `oklchToLinear(cssToOklch(css))` → returns **LINEAR sRGB** (`color.ts:33` returns linear).
   **These two resolvers return DIFFERENT spaces.** The demo's `uBaseColor` is gamma; the
   AT default's `uBaseColor` is linear. If the shader's OKLab math assumes one, the other
   mis-paints.

2. Ottosson's `rgbToOklab` (`srgbToOKLab`, `gamut.ts:283-291`) takes **GAMMA** sRGB and
   linearizes internally (`srgbToLinear` at :284-286) before the LMS cube-root. The GM-Shaders
   in-shader `oklab_from_linear` takes **LINEAR** and does NOT linearize. **These are two
   different entry points; you must pick the matching one for whatever space `uBaseColor` holds.**

3. The current HSV path is gamma-space throughout (canvas gamma in, `hsv2rgb` gamma out,
   no tonemap) and "works" only because HSV is a gamma-space hack that never claimed
   perceptual correctness. OKLab is defined on LINEAR light. **Perturbing in OKLab derived
   from a GAMMA `uBaseColor` (without the OETF) yields wrong OKLab coordinates** — the
   lightness axis would be skewed and the whole "perceptually uniform" claim D1 is sold on
   (`L6 §3.3`) evaporates.

**The fix (must be in the W5 wave spec, not discovered at impl):** pick ONE canonical
`uBaseColor` space and make the GLSL entry match it. Two clean options:

- **Option L (RECOMMENDED) — `uBaseColor` is LINEAR sRGB.** The `ColorResolver` contract
  returns linear (matches `defaultBlobColorResolver = oklchToLinear∘cssToOklch`, AT.W1 §3,
  which already returns linear). The GLSL uses `oklab_from_linear` (no OETF in-shader) →
  perturb → `oklab_to_linear` → **then apply the sRGB OETF before `fragColor`** (the blob
  has no tonemap stage, so the OETF must be explicit, OR the output stays linear and the
  canvas is configured for it — but the blob canvas is a default gamma canvas, so the
  shader MUST encode: `fragColor = vec4(linearToSrgb(rgb) * alpha, alpha)`). This makes the
  whole pipeline linear-correct end-to-end and matches aurora's "everything-in-linear" ethos.
  **Cost:** one in-shader `linearToSrgb` (a `pow(x, 1/2.4)` branch, ~the cost of the cube root).

- **Option G — `uBaseColor` stays GAMMA sRGB.** The GLSL uses `srgbToOKLab`-equivalent
  (with the OETF-inverse `srgbToLinear` inside) → perturb → `oklabToLinearSRGB` → `linearToSrgb`
  → output gamma. The `ColorResolver` must then return GAMMA, contradicting the AT.W1
  `defaultBlobColorResolver` (which returns linear). This re-introduces two extra transfer
  functions per pixel for no benefit.

**DECISION the W5 spec must record (call it DEC-AT-A2-1):** `uBaseColor` is **linear sRGB**;
`ColorResolver` returns linear (already true for the default); the blob fragment shader
gains an explicit `linearToSrgb()` on output (it previously had none because gamma-HSV
needed none). This is a **third GLSL function** the D1 plan did not budget for, and it is
mandatory — without it the lifted blob with the linear-returning default resolver paints
visibly too-dark (linear values written straight to a gamma canvas).

> This is exactly the class of silent space-bug that `feedback_glass_ui_binding_verification.md`
> warns about: typecheck + unit pass, the blob just looks wrong. The CPU-equivalence gate
> (§5) MUST assert the full `uBaseColor→…→fragColor` chain including the OETF, not just the
> OKLab round-trip, or it will not catch this.

---

## §3 — THE MATRIX-SOURCE TRAP: value.js-exact vs shader-convenience constants

The prior plan (`L6 §3.1`) says "port from value.js's canonical constants (the same
matrices `oklabToLinearSRGB` inverts)." Correct in intent, but there is a trap the wave
spec must call out:

**There are (at least) two circulating Ottosson matrix sets, and they are NOT identical:**

- **value.js's `LINEAR_SRGB_TO_LMS`** (`constants.ts:354-358`): row 0 = `0.4122214708,
  0.5363325363, 0.0514459929`. This is Ottosson's **exact** 10-digit matrix.
- **GM-Shaders / LYGIA `im1`** (web): row 0 = `0.4121656120, 0.2118591070, 0.0883097947`
  (column-major `mat3`, so this is actually the first COLUMN). The shader-convenience set is
  **rounded/re-derived** and diverges in the ~5th–6th decimal.

These differ by ~1e-4 per coefficient. For a gradient that is invisible; for a
**CPU-equivalence gate asserting 1e-6 agreement** (`AT.W1 §3` mirror of
`color-equivalence.test.ts`) it is **fatal** — the GLSL-with-convenience-matrices will NOT
match value.js's core to 1e-6, and the gate will red-flag a non-bug (or worse, be loosened
to hide it).

**DECISION (DEC-AT-A2-2):** the GLSL MUST hardcode value.js's EXACT matrices
(`LINEAR_SRGB_TO_LMS`, `LMS_TO_LINEAR_SRGB`, `OKLAB_TO_LMS_COEFF` from
`value.js/src/units/color/constants.ts:346-365`), transposed into GLSL `mat3`
column-major form. Do NOT copy GM-Shaders/LYGIA constants. Rationale: the gate asserts
GLSL-math == value.js-core; the only way that holds tightly is identical constants. The
web shader libraries are the structural reference (the `sign(lms)*pow(abs(lms),1/3)`
idiom), NOT the numeric source.

**GLSL ↔ value.js column/row note (a real foot-gun):** value.js stores matrices as flat
row-major `Mat3` arrays applied as `M[0]*r + M[1]*g + M[2]*b` (`gamut.ts:289` — first ROW
dotted with the input). GLSL `mat3(c0x,c0y,c0z, c1x,c1y,c1z, c2x,c2y,c2z)` is **column-major**,
and `M * v` dots each ROW of the conceptual matrix with `v`. So to get value.js's row-major
`M` to act identically in GLSL, the GLSL literal must be the **transpose** of value.js's
flat array (or use `M[0]*v.x + M[1]*v.y + M[2]*v.z` with explicit `vec3` rows). The
equivalence test (§5) is the only thing that catches a transpose error — it must run a
non-symmetric color (NOT gray, NOT a primary) so a transpose mistake actually diverges.

---

## §4 — THE EXACT GLSL (hardened, value.js-matrixed, linear-correct)

This is the concrete W5 shader body — the prior plan listed line-swaps; this lens supplies
the functions. Constants are value.js's EXACT set (§3); the cube-root uses the
`sign·pow(abs,1/3)` idiom (the web-confirmed canonical, handles the out-of-gamut negative
LMS the HSV path never produced).

```glsl
// --- OKLab (value.js-exact Ottosson constants; linear-sRGB domain) -----------
// NB: GLSL mat3 is column-major. These literals are the TRANSPOSE of value.js's
// row-major LINEAR_SRGB_TO_LMS / LMS_TO_LINEAR_SRGB (constants.ts:346-358) so that
// `M * v` reproduces value.js's `row·v`. The equivalence test (§5) is the canary.

const mat3 LIN2LMS = mat3(   // = transpose(LINEAR_SRGB_TO_LMS)
  0.4122214708, 0.2119034982, 0.0883024619,
  0.5363325363, 0.6806995451, 0.2817188376,
  0.0514459929, 0.1073969566, 0.6299787005);

const mat3 LMS2LIN = mat3(   // = transpose(LMS_TO_LINEAR_SRGB)
   4.0767416621, -1.2684380046, -0.0041960863,
  -3.3077115913,  2.6097574011, -0.7034186147,
   0.2309699292, -0.3413193965,  1.7076147010);

// OKLab forward/back coefficient matrices (Ottosson; match value.js OKLAB_TO_LMS_COEFF
// and srgbToOKLab's LMS→OKLab rows at gamut.ts:295-297).
const mat3 LMS2LAB = mat3(   // rows = the three OKLab output coeffs, column-major transpose
  0.2104542553,  1.9779984951,  0.0259040371,
  0.7936177850, -2.4285922050,  0.7827717662,
 -0.0040720468,  0.4505937099, -0.8086757660);

const mat3 LAB2LMS = mat3(   // = transpose([[1,0.3963377774,0.2158037573],[1,-0.1055613458,-0.0638541728],[1,-0.0894841775,-1.2914855480]])
  1.0,           1.0,           1.0,
  0.3963377774, -0.1055613458, -0.0894841775,
  0.2158037573, -0.0638541728, -1.2914855480);

vec3 linearToOklab(vec3 lin) {
  vec3 lms = LIN2LMS * lin;
  lms = sign(lms) * pow(abs(lms), vec3(1.0 / 3.0));  // cube-root, sign-safe
  return LMS2LAB * lms;
}

vec3 oklabToLinear(vec3 lab) {
  vec3 lms = LAB2LMS * lab;
  lms = lms * lms * lms;                              // cube
  return LMS2LIN * lms;
}

// sRGB OETF (gamma encode) — REQUIRED on output because the blob has no tonemap
// stage and uBaseColor is now LINEAR (DEC-AT-A2-1). Mirrors value.js linearToSrgb
// (gamut.ts) with the standard 0.0031308 knee.
vec3 linearToSrgb(vec3 c) {
  vec3 lo = c * 12.92;
  vec3 hi = 1.055 * pow(max(c, 0.0), vec3(1.0 / 2.4)) - 0.055;
  return mix(hi, lo, step(c, vec3(0.0031308)));
}
```

**The perturbation block** (replaces `metaball.frag.glsl:146-157`), in OKLCh derived from
the linear OKLab — operate on (L, C, h), not raw (L, a, b), because the perturbation axes
ARE chroma-and-hue:

```glsl
vec3 lab  = linearToOklab(uBaseColor);          // uBaseColor is LINEAR (DEC-AT-A2-1)
float L   = lab.x;
float C   = length(lab.yz);                       // chroma
float h   = atan(lab.z, lab.y);                   // hue, RADIANS

float colorNoise = fbm(uv * uColorNoiseFreq + uTime * uColorNoiseSpeed, 3);

h += (colorNoise - 0.5) * radians(uHueRange);     // uHueRange in DEGREES → radians; NO /360
C  = max(0.0, C + (colorNoise - 0.5) * uSatShift); // chroma delta; clamp ≥ 0 only
L  = L + uBrightnessShift;                          // perceptual L shift (the D1 point)

// edge-glow retune (was hsv.z += 0.06): an L bump near the inner edge.
float edgeGlow = smoothstep(0.0, -bodyR * 0.6, d);
L = mix(L, L + uEdgeGlowL, 1.0 - edgeGlow);        // uEdgeGlowL ≈ 0.025–0.04 (see §6)

lab = vec3(L, C * cos(h), C * sin(h));             // OKLCh → OKLab
vec3 lin = oklabToLinear(lab);                     // → LINEAR sRGB
lin = gamutReduce(lin, L);                         // §6 in-shader gamut handling
vec3 rgb = linearToSrgb(lin);                      // → gamma sRGB for the gamma canvas
fragColor = vec4(rgb * alpha, alpha);
```

**Deltas from the prior plan worth flagging:**
- `radians(uHueRange)` not `uHueRange` raw — the plan said "degrees, no /360" but OKLCh hue
  in this GLSL is `atan` RADIANS, so a `radians()` is needed (the plan would have rotated by
  ~57× too much). A real bug averted.
- `L += uBrightnessShift` has NO `clamp(...,0,1)` — OKLab L is unbounded-ish; clamping it
  pre-gamut would distort. The gamut step (§6) handles the excursion.
- `uEdgeGlowL` is a NEW uniform (or a `#define`) — the `+0.06` HSV-V constant cannot carry
  over numerically (§6).

---

## §5 — THE CPU-EQUIVALENCE GATE, HARDENED (sound without a WebGL harness)

The prior plan (`AT.W1 §6`, `DEC-AT-4`) says: round-trip identity, value.js-core match,
zero-perturb no-op, in-gamut clamp. **Those are necessary but NOT sufficient** — they do
not catch the §2 space-bug, the §3 transpose-bug, or the §6 gamut-step mismatch. Here is
what the gate must assert to be SOUND when no GLSL ever runs in CI:

The gate works by **porting the GLSL functions to TS verbatim** (a `metaball-color.glsl-port.ts`
test fixture: `linearToOklab`, `oklabToLinear`, `linearToSrgb`, `gamutReduce`, and the
perturbation), then asserting the TS port against value.js's core. The soundness argument:
*if the TS port is a faithful transcription of the GLSL (same constants, same ops, same
order), and the TS port matches value.js, then the GLSL matches value.js to within
GPU `highp` float error (~1e-6 relative, mantissa-limited).* The port-fidelity is the one
unprovable link — mitigate it by keeping the GLSL and the TS port **textually parallel**
(same function names, same constant literals, reviewed side-by-side) and by adding the
transpose-catching asymmetric-color assertion below.

**Required assertions (each a `it()` in the vitest spec):**

1. **Round-trip identity (linear domain):** `oklabToLinear(linearToOklab(c)) ≈ c` for a
   sweep of 64 linear colors incl. near-zero and near-1; tol 1e-6. *Catches: matrix
   inverse errors, cube/cube-root mismatch.*
2. **value.js forward agreement, GAMMA entry:** for a sweep of CSS colors, assert the TS
   port's `linearToOklab(srgbToLinearTS(gammaRGB))` == value.js `srgbToOKLab(gammaRGB)` to
   1e-6. *Catches the §3 matrix-source divergence — fails LOUD if convenience matrices crept
   in.* **Must include an ASYMMETRIC color (e.g. `#3a7bd5`, not gray/primary) so a
   transpose error diverges** (§3).
3. **value.js inverse agreement:** TS `oklabToLinear(lab)` == value.js `oklabToLinearSRGB(lab)`
   to 1e-6 over a lab sweep. *Catches LMS2LIN transpose/source.*
4. **OETF agreement:** TS `linearToSrgb(c)` == value.js `linearToSrgb(c)` (`gamut.ts`) to
   1e-6, incl. the knee at 0.0031308. *Catches the §2 missing/mis-encoded OETF — the bug
   the prior gate would have MISSED entirely because it had no OETF assertion.*
5. **Full-chain space check (the §2 guard):** feed a known CSS color through the FULL
   pipeline `defaultBlobColorResolver(css) → [linear] → linearToOklab → (zero perturb) →
   oklabToLinear → linearToSrgb` and assert the result == the gamma RGB of the input color
   to 1e-5. *This is the assertion that proves the linear/gamma bookkeeping is internally
   consistent end-to-end — the one the prior plan lacked.*
6. **Zero-perturb no-op:** `uHueRange=uSatShift=uBrightnessShift=uEdgeGlowL=0` ⇒ output ==
   `linearToSrgb(uBaseColor)` exactly (bit-identical in the TS port; ≈ in GLSL). *Catches an
   accidental constant offset in the perturb block.*
7. **In-gamut after `gamutReduce`:** for the cross of {8 hues × {ΔL,ΔC,Δh} extremes}, assert
   `gamutReduce` output is in [0,1]³ to a tight tolerance (the §6 contract). *Catches an
   out-of-gamut leak reaching the canvas (the HSV path's `clamp(0,1)` masked this; OKLCh can
   excurse harder on chroma-up).* 
8. **Perceptual-uniformity witness (the D1 RAISON D'ÊTRE, not in the prior plan):** assert
   that a fixed `uHueRange` hue rotation produces a SMALLER L-excursion in the OKLCh path
   than the same-magnitude rotation in the old HSV path. Concretely: rotate hue by the mood
   default across a yellow→green arc, measure `|ΔL_oklab|` for both paths, assert
   `oklch_path_ΔL < hsv_path_ΔL` by a meaningful margin. **This is the assertion that proves
   D1 is WORTH IT** — without it, the gate proves the math is correct but not that it
   achieves the perceptual goal D1 is sold on (`L6 §3.3`). It is the closest a unit test can
   get to "does it look right," and it converts the §6 manual-visual line from the ONLY
   evidence of value into a backstop.

> Assertions 4, 5, and 8 are the AUGMENTATIONS this lens adds to the prior 4-point gate.
> 4+5 close the §2 space-bug; 8 closes the "we proved correctness but not benefit" gap.

**What the gate CANNOT settle (honest scope, per DEC-AT-4 + the P5 precedent):** the GLSL
*executing on a GPU* (driver `pow` precision, `highp` vs `mediump` if a consumer's context
downgrades, the `fbm` noise interaction with the perturbation at real frequencies). The
manual visual-confirmation line (§6, the demo story) remains binding for these — but the
8-assertion gate above shrinks the visual-confirmation's burden to ONLY "does the edge-glow
constant read right and does it look pleasing," which is genuinely subjective and correctly
left to a human.

---

## §6 — In-shader gamut handling + the edge-glow retune (the two subtle parts)

### 6.1 Gamut handling — `clamp(rgb,0,1)` is NOT acceptable as specified

The prior plan (`L6 §3.1` row `:157`) offers "`clamp(rgb,0,1)` or a soft desaturate." The
web SOTA is unambiguous (Ottosson gamut-clipping post): **naive RGB clamp causes "heavily
distorted hues, loss of detail"** — a chroma-up perturbation on an already-saturated base
would clip a channel and **shift the hue**, defeating the entire perceptual-uniformity point
of D1. Shipping `clamp(rgb,0,1)` would be self-defeating.

But value.js's full `gamutMapOKLab` (adaptive-L0 + Halley's method, `gamut.ts:247-277`) is
~40 lines with a cusp-finding iteration — too heavy for a per-pixel fragment path on a blob
that may cover a large canvas. **The right in-shader middle is a cheap CHROMA-REDUCTION**,
exactly the `gamutMapStop` chroma-shrink loop `color.ts:285-290` already trusts CPU-side
("`safeC *= 0.999` until in gamut, ≤6 steps"). In GLSL, a fixed-iteration analytic version:

```glsl
// Cheap gamut reduce: if oklabToLinear(L, C·dir) leaves [0,1], pull chroma toward 0
// (hue + L preserved) until in-gamut. Hue-preserving (the D1 invariant), ~3 iters.
vec3 gamutReduce(vec3 lin, float L) {
  if (all(greaterThanEqual(lin, vec3(0.0))) && all(lessThanEqual(lin, vec3(1.0))))
    return lin;
  // binary-search chroma scale in [0,1] toward the in-gamut interior; 4 iters ≈ value.js's loop
  // (reconstruct from the lab we already have rather than re-deriving — pass lab in if cheaper)
  // ... 4-step bisection on a chroma multiplier, clamp final to [0,1] as a 1e-4 backstop
  return clamp(lin, 0.0, 1.0);  // final hairline backstop ONLY (matches color.ts Math.max wrap)
}
```

The contract: hue-preserving chroma reduction is PRIMARY; `clamp(0,1)` is the sub-1e-4
backstop for the float-noise residual `gamutMapStop` itself documents (`color.ts:268-276`),
NOT the gamut strategy. This makes the in-shader behaviour the perceptual cousin of the
CPU `gamutMapStop` — and the §5 assertion 7 gates it. **The W5 spec must specify the
chroma-reduction, not leave "or clamp" as an option**, or the impl will take the cheap-wrong
path. (Knowledge-vs-web: the "clamp is destructive" claim is web-sourced (Ottosson); the
"use the chroma-shrink that color.ts already trusts" mapping is from reading glass-ui.)

### 6.2 The edge-glow retune — the genuinely-untestable constant

HSV: `hsv.z = mix(hsv.z, min(hsv.z+0.06, 1.0), 1.0-edgeGlow)` (`:155`). The `+0.06` is a V
(roughly gamma-luma) bump. In OKLab L, **0.06 is NOT the same perceptual magnitude** — OKLab
L is normalized so that L∈[0,1] spans black→white perceptually-uniformly, and a +0.06 L
step near a mid-L base is a *larger* perceived lightening than +0.06 in gamma-V near a bright
base. The prior plan (`L6 §3.1`, `:153-155`) correctly flags this as "the subtle,
untestable-by-unit part" and assigns it to manual visual confirmation. This lens AGREES and
sharpens:

- Make the glow magnitude a **uniform/`#define` `uEdgeGlowL`** (not a baked `0.06`), seeded
  at **~0.03** as a starting estimate (roughly half the V-bump, because L is more sensitive),
  and TUNED in the demo story by eye. Exposing it as a `--blob-edge-glow-l` token (token-first
  axis) lets the look be retuned without a shader edit.
- The §5 assertion 7 still gates that the glow does not push out of gamut; the §5 assertion
  8 gates that the overall path stays perceptually flatter than HSV. The remaining freedom —
  the exact glow value — is the one genuinely subjective knob, correctly the manual line.

---

## §7 — Cost of cbrt in GLSL (the prompt's explicit question)

**Finding (web-confirmed):** on modern GPUs `pow()` is hardware-accelerated; the
`sign(x)*pow(abs(x),1/3)` cube-root is the canonical idiom and "custom optimized
implementations… don't offer practical performance benefits over `pow()`" (web). The D1
path adds, per fragment: 1 cube-root-pow (3 channels), 1 cube (cheap), 1 `atan`, 1
`cos`+`sin`, 1 `length`, the OETF `pow(1/2.4)`, and up to ~4 gamut-reduce iterations. That
is materially more than HSV's two `K`-vector tricks — but:

- It runs ONLY inside the `alpha >= 0.001` branch (`:140`), i.e. only on covered pixels, not
  the whole canvas. The blob is a small fraction of most layouts.
- Aras-P's finding that `cbrtf` dominates is a CPU-gradient-bake observation (thousands of
  evaluations on CPU); on the GPU at one blob's pixel count it is comfortably in budget for
  a 60fps RAF — aurora's far heavier per-pixel shader (multi-nuclei softmax + FBM medium +
  ACES, `aurora.frag.ts`) already ships at 60fps, so a single OKLab round-trip is not the
  bottleneck.
- **Mitigation if ever needed (name-forward, NOT in W5):** the base-color OKLab decode
  `linearToOklab(uBaseColor)` is CONSTANT across all pixels in a frame (uBaseColor is a
  uniform) — it could be computed CPU-side and uploaded as a `uBaseLab` uniform, leaving only
  the per-pixel perturb + `oklabToLinear` + OETF in-shader. This halves the per-pixel OKLab
  cost. **Recommend NOT doing this in W5** (it splits the color logic across CPU/GPU and
  complicates the equivalence gate); flag it as a perf lever if a consumer reports cost.

**Verdict:** cbrt cost is a non-issue at blob scale; do the simplest correct thing
(full in-shader round-trip) in W5; name-forward the uBaseLab-uniform optimization.

---

## §8 — Is "OKLCh-perturb-then-back" the right transposition? (validation)

**YES, with the §2/§3/§6 corrections.** The reasoning:

- **The perturbation axes ARE OKLCh axes.** The three mood knobs are hue-shift, saturation-
  shift, brightness-shift (`metaball.frag.glsl:33-35`). In OKLCh these map 1:1 to h, C, L —
  the cleanest possible mapping. HSV's H/S/V are a gamma-space approximation of the same
  intent; OKLCh is the perceptually-correct realization. This is a textbook
  architectural-transposition-for-elegance (the user's standing directive; `feedback_architectural_approach.md`).
- **It aligns with glass-ui's OKLab-everywhere identity** (aurora bakes OKLCh; tokens are
  OKLCh-derived; `color.ts` is the value.js Ottosson core). A goo-blob perturbing in HSV
  would be the ONE color-island in the system. D1 removes the island.
- **The alternative transpositions are worse:** (a) perturb in OKLab a/b directly (not
  OKLCh) — wrong, because hue-rotation in a/b is a rotation matrix, more ops than `atan`+
  `cos`/`sin`, and chroma-shift is non-obvious; OKLCh is the natural basis for these knobs.
  (b) Keep HSV but linearize — pointless, HSV's whole value was being a cheap gamma hack.
  (c) Perturb the baked palette CPU-side like aurora — impossible, the perturbation is
  per-pixel position-dependent (`colorNoise = fbm(uv…)`, `:148`), it CANNOT be a uniform.

So OKLCh-in-shader is not just right, it is **forced** by the per-pixel position-dependence
— which is also exactly why aurora (whose color variation is per-nucleus, bakeable) does NOT
need in-shader OKLab and goo-blob does. The two shaders are correctly different.

---

## §9 — Concrete augmented-AT proposals (wave + hard gate)

| # | Proposal (slice of AT.W5) | Hard gate addition |
|---|---|---|
| **A2-1** | **Record DEC-AT-A2-1: `uBaseColor` is LINEAR sRGB; the blob fragment shader gains an explicit `linearToSrgb()` output stage** (§2). This is a mandatory 3rd GLSL fn the current plan omits. | §5 assertion 4 (OETF agreement) + assertion 5 (full-chain space check) must be in the vitest spec; without them the space-bug ships silently. |
| **A2-2** | **Record DEC-AT-A2-2: GLSL hardcodes value.js's EXACT matrices (constants.ts:346-365), transposed for GLSL column-major; NOT the GM-Shaders/LYGIA convenience set** (§3). | §5 assertion 2 includes an ASYMMETRIC color (`#3a7bd5`) so a transpose/source error diverges; 1e-6 tol holds ONLY with exact matrices. |
| **A2-3** | **Specify the in-shader gamut step as a hue-preserving CHROMA-REDUCTION (the GPU cousin of `color.ts gamutMapStop`), NOT `clamp(rgb,0,1)`** (§6.1). Clamp is the sub-1e-4 backstop only. | §5 assertion 7: across {8 hues × ΔL/ΔC/Δh extremes} the output is in [0,1]³; AND a hue-preservation check (output hue ≈ pre-reduce hue). |
| **A2-4** | **Fix the hue-rotation unit: `radians(uHueRange)`, not raw `uHueRange`** (§4) — the OKLCh hue is `atan` radians; the plan's "no /360" would over-rotate ~57×. | §5 assertion 8 (perceptual-uniformity witness) exercises a real hue rotation and would catch a units error as a wild ΔL. |
| **A2-5** | **Add the perceptual-uniformity witness (§5 assertion 8) as a BINDING gate line** — proves D1 achieves its goal (OKLCh ΔL < HSV ΔL for the same hue rotation), not just that the math round-trips. | The assertion itself; it is the closest unit-test proxy for "the transposition was worth it," demoting the manual-visual line to edge-glow aesthetics only. |
| **A2-6** | **Make `uEdgeGlowL` a uniform/token (`--blob-edge-glow-l`, seed ~0.03), not a baked `+0.06`** (§6.2). Token-first axis; the one genuinely-subjective knob stays tunable + the manual-visual line owns ONLY this. | The demo-story manual-visual confirmation (the P5-precedent, DEC-AT-4) is scoped to: edge-glow magnitude reads right + overall look pleasing. Everything else is unit-gated. |
| **A2-7** | **Keep the GLSL and a `metaball-color.glsl-port.ts` TS transcription TEXTUALLY PARALLEL** (same fn names, same constant literals) so the port-fidelity link in the soundness argument (§5) is reviewable by eye. | A doc-comment in both files cross-referencing the other; the equivalence spec imports the port; CI runs the spec. The port IS the gate's executable half. |

**None of these add a wave** — they all sharpen AT.W5's existing spec + gate. The DEV/IMPL
boundary is unchanged. No src/ touched by this lens.

---

## §10 — Sources

- GM Shaders, "Mini: OkLab" — in-shader `oklab_from_linear`/`linear_from_oklab`, the
  `sign(lms)*pow(abs(lms),1/3)` idiom: https://mini.gmshaders.com/p/oklab
- Björn Ottosson, "A perceptual color space for image processing" (OKLab origin, matrices):
  https://bottosson.github.io/posts/oklab/
- Björn Ottosson, "sRGB gamut clipping" (clamp-is-destructive; adaptive-L0; chroma reduction):
  https://bottosson.github.io/posts/gamutclipping/
- Aras Pranckevičius, "Optimizing Oklab gradients" (cbrt/pow cost; precompute lever):
  https://aras-p.info/blog/2022/03/11/Optimizing-Oklab-gradients/
- LYGIA Shader Library, `color/space/rgb2oklab` (canonical GLSL structural reference):
  https://lygia.xyz/color/space/rgb2oklab
- Color.js gamut-mapping docs (deltaEOK chroma-reduction, the SOTA CPU strategy):
  https://colorjs.io/docs/gamut-mapping
- glass-ui in-repo: `aurora/composables/color.ts`, `aurora/shaders/aurora.frag.ts`,
  value.js `src/units/color/{gamut.ts,constants.ts}`, value.js demo
  `goo-blob/{shaders/metaball.frag.glsl,composables/useMetaballRenderer.ts}` (all read in full, §0).
