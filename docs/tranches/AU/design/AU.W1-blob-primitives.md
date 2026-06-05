# AU.W1 design slice — the blob primitives (re-issue of AT.W1-blob-primitives)

**Origin:** `docs/tranches/AT/design/AT.W1-blob-primitives.md` (the AT.W1 blob slice,
authored on the W0b SOTA reads `W0b-A1..A6` + the C-synthesis `W0b-C1..C6`). AU re-issues
it as-authored — NO re-audit; the W0b SOTA + C-synthesis bind whole (AU.md §header,
CHARTER §header).

**HEAD delta @ `8e4cb9f`:** the blob graph is **carried whole — ZERO src exists at HEAD.**
Verified ABSENT: no `/goo-blob` subpath, no `/watercolor-dot` subpath, no
`useMetaballRenderer`, no `useWatercolorBlob`, no `ColorResolver`/`defaultBlobColorResolver`,
no `metaball.{vert,frag}.glsl`, no `metaball-color.glsl-port.ts`, no `prng` leaf. The
value.js DEMO `cssColorToRgb` 1×1-canvas probe is un-replaced. So the design is unchanged
from AT.W1 — the entire slice folds forward verbatim. AU executes it at **AU.W6** (the
substrate the blob needs) + **AU.W7** (the blob trio + the shader-quality stage).

---

## §1 — The two primitives (carried from AT.W1, executes AU.W7)

1. **`/goo-blob` + `useMetaballRenderer` + `metaball.{vert,frag}.glsl`** — the WebGL2
   metaball primitive, lifted onto the AU.W6 `useWebGLCanvas` substrate. The faithful lift
   paints **GAMMA sRGB** (HSV needed no OETF — DEC-AT-7's W4 space; AU.md §6). OFF the root
   barrel (DEC-AT-6), OFF the value.js peer.

2. **`/watercolor-dot` + `useWatercolorBlob` + the internalized SVG filter + the `prng`
   leaf** — the CSS/SVG sibling. The SVG filter is INTERNALIZED (auto-mounted, namespaced,
   zero-wiring — DEC-AT-3): mount the component and the filter just works. The `prng` leaf
   is hoisted (seeded, deterministic).

## §2 — The three forced transpositions (P2, AU.md §1)

The blob lift is a forcing function for three transpositions (the user's "transpositions
for elegance/simplicity/performance are desirable; no legacy"):

1. **ONE `useWebGLCanvas` substrate** (AU.W6) — aurora + goo-blob share it; `frostShader.ts`
   DELETED; `webglcontextrestored` absorbed; aurora's existing `useIntersectionPause`
   off-screen gate WIRED (not re-added). The substrate must NOT bake aurora's quad/attrs/DPR
   (the consumer-#2 usability assert, W0b-C6 must-fix #4).
2. **The injected `ColorResolver` seam** (AU.W7) — REQUIRED-injected; `defaultBlobColorResolver`
   OPT-IN; THROWS by name on a no-resolver mount (the loud failure, not a silent gray
   default). The DOM-coupled 1×1-canvas `cssColorToRgb` probe is DELETED (P1).
3. **The OKLCh shader transposition** (AU.W7's shader-quality stage) — the five
   byte-isolated SOTA edits on the GAMMA shader: `fwidth` AA, Quilez quadratic `smin`,
   rotated-octave FBM, OKLCh linear-flip + the mandatory `linearToSrgb()` OETF (the
   headline correctness bug — left implicit the blob ships too-dark AND the perceptual
   claim voids), exact Ottosson matrices + radians (the matrix-source trap DEC-AT-10 — NOT
   the LYGIA convenience matrices), hue-preserving gamut mapping.

## §3 — The ≥2 + the seam (P3)

The blob's ≥2 is **value.js** (the firm A→F-aged producer-consumer) + **a glass-ui demo
story** (the `deriveAurora` precedent). muster's blob interest is design-SURVEY, NOT a
committed app — NOT claimed as a firm 2nd. The injected `ColorResolver` seam is the proof
the blob is substrate-shaped, not value.js-coupled: value.js supplies its OWN resolver;
the demo story uses `defaultBlobColorResolver`.

## §4 — The DEC-AT-7 space-seam (load-bearing, AU.md §6)

Lift = GAMMA (the faithful lift, HSV no OETF). Shader-quality stage = LINEAR (the OKLCh
flip + `linearToSrgb()`). The `/color` leaf (AU.W5) ships BOTH `oklchToLinear` (aurora's
bake) and `oklchToGammaRgb` (the blob's gamma exit). Each wave's gate asserts THAT wave's
declared space (`proof:blob-space-gamma` for the lift; the 8-assertion CPU-equivalence with
`linearToSrgb()` present for the quality stage). This is the one design decision an AU
executor cannot rediscover from the code — carried verbatim.

## §5 — Anti-gold-plating (the CEILING, BOOKed)

The shader-quality wave is the CEILING — analytic-derivative noise, exponential smin,
raymarching, a binding Playwright golden are BOOKED, NOT folded (AU.md §9 / `AT.md §BOOK`).
The golden is `profile-aurora.mjs`-promoted (`proof:webgl-golden`), not a new Playwright
binding. ONE quality level (the correct one) — no "fast" and "correct" shader paths.
