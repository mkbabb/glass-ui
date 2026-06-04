# AT.W0b — A6: adversarial challenge of the blob + aurora AT spec

**Lens A6.** Adversarial. The brief: try to REFUTE the load-bearing decisions of
the blob+aurora plan (`design/AT.W1-blob-primitives.md`, `AT.md §DEC-AT`) and the
prior 6-lens audit (`W0-L{1..6}`). Build ON the plan — augment / harden / refute,
do not re-derive. Every surviving weakness is a HARDENING ITEM with a **severity**
and a **concrete gate**. Where a finding needs SOTA, the web call is cited and
the knowledge-vs-web provenance is stated.

This lens is NOT a re-litigation of WHETHER to lift (L5/L6 settled that — the
home exists, the consumer demand is real). It attacks the SHAPE the plan picked,
and finds that **the plan's two highest-leverage decisions (DEC-AT-1 extract-now,
DEC-AT-4 no-GPU-gate) are each adopted AGAINST the explicit caution of the very
lens that owns that area** — L6 §4 recommended STANDALONE + name-forward for the
substrate; L6 §3.2 + AT.W1 §6 both flagged the missing WebGL harness as a real
hole and then waved it through as "optional stretch." This lens argues both
calls are under-hardened and gives the gate that closes each.

Severity legend (inherited from L1): **S1** ships-broken / blocks publish ·
**S2** ships quietly wrong on a real path · **S3** hygiene / DRY / overfit-risk ·
**S4** record/claim accuracy.

---

## 0 — Executive: the five adversarial verdicts

| # | Target | Verdict | Severity | Gate that closes it |
|---|---|---|---|---|
| **A6-1** | DEC-AT-1 extract `useWebGLCanvas` NOW | **PLAN SELF-CONTRADICTS** — L5 says extract, L6 §4 says STANDALONE + name-forward; the plan adopted L5 and silently buried L6's dissent. The extraction is real value but the W2 *sequencing + gate* as written is under-specified and the demand-gate coupling is unflagged. | S2 | the demand-gate predicate must be a CONSUMER callback, proven by a unit; W2 ships behind a **rollback boundary** (aurora-fold is reversible at the wave seam) |
| **A6-2** | DEC-AT-1 frame-parity gate is "achievable + meaningful" | **PARTLY REFUTED** — glass-ui's vitest is `happy-dom`, **no WebGL context**. A "CPU-readback" / "byte-identical pixel" gate is NOT runnable in-repo (W1 §2 overstates it). The runnable gate is a *uniform-call-sequence equality*, which is weaker than "frame-parity" and does NOT catch a draw-order / state-leak regression. | S2 | re-name the gate honestly (uniform-sequence parity) + add the GPU golden as BINDING not optional (A6-4) |
| **A6-3** | DEC-AT-2 `/color` extraction + required-inject | **NEW COUPLING RISK CONFIRMED** — hoisting `cssToOklch`/`deriveAurora` to a `/color` subpath makes aurora depend on `/color` and feeds value.js's C3 circular-resolution concern. "Required-inject, no default" is also **ergonomically hostile in the common case** (every mount throws until wired) and the linear-vs-gamma working-space of the resolver return is UNSPECIFIED — a silent color-wrongness trap. | S2 | the resolver contract must PIN the working space (linear [0,1]); the `/color` extraction needs an acyclic-import proof; reconsider inject-with-explicit-opt-in-default vs hard-throw |
| **A6-4** | DEC-AT-4 CPU-equivalence + manual visual is "sufficient" | **REFUTED — REAL HOLE** — the CPU gate tests a TS *port* of the GLSL, NOT the GLSL the GPU runs (a separate code path). Aurora's color-equivalence precedent does NOT transfer: aurora runs OKLab **CPU-side only** (`color.ts`), its GLSL has ZERO OKLab math — so D1 introduces net-new in-shader OKLab with NO existing gate class. SOTA (web-confirmed) says headless WebGL golden testing is a SOLVED, cheap problem. The "no harness" excuse is a choice, not a constraint. | **S1** | a minimal headless-WebGL `readPixels` golden gate is BINDING for W5 (or W2/W4 if the shader ships there); the manual visual is a complement, not the floor |
| **A6-5** | DEC-AT-5 demo-story-as-consumer-#2 for goo-blob | **FIG-LEAF CONFIRMED for the spirit, defensible for the letter** — goo-blob has exactly **ONE** real consumer (`HeroBlob.vue`, verified). The demo story is a glass-ui-authored test fixture, not an independent context. watercolor-dot is genuinely ≥2; goo-blob is overfit-by-the-spirit and the plan should say so even more plainly AND gate the honesty. | S3 | the overfitting audit must record goo-blob as **export-bar-only (1 real consumer + 1 self-authored demo)**, not "≥2 met"; a `book-if-value.js-stalls` clause |

The two S2→S1 escalations (A6-2, A6-4) share one root: **glass-ui has no GPU in
its test loop, and the plan treats that as a permanent constraint rather than a
one-wave fix.** The single most load-bearing recommendation of this lens is:
**AT must stand up the headless-WebGL harness it has been deferring since the
aurora work — it is cheap, web-proven, and it is the ONLY thing that gates the
two highest-risk artefacts (the aurora re-fold and the D1 shader) at the level
they actually risk.**

---

## A6-1 — DEC-AT-1: the extract-now call contradicts L6, and the coupling is unflagged

### A6-1.a — the plan adopted L5 and silently buried L6's explicit dissent (S2, record + risk)

This is the sharpest finding. The two design lenses **disagree on the headline
decision** and the plan only surfaces one side:

- **L5 §1.3** (`W0-L5:94-131`): "Extract one `useWebGLCanvas` substrate; metaball
  + aurora both consume it … aurora's runtime re-expresses on top of it (the
  envelope deletes from `runtime.ts`)." Treats it as THE gestalt core.
- **L6 §4** (`W0-L6:209-214`): "**lift goo-blob's renderer STANDALONE in AT; do
  NOT attempt the L5 shared-substrate transposition in this tranche.**" Rationale:
  scope discipline, blast-radius on "the two most visually-load-bearing shipped
  surfaces (aurora, glass)", and that the shared util is "4 trivial functions."
  L6's DEC-AT-3 (`W0-L6:256`) recommends **standalone + name-forward**.

`AT.md §DEC-AT-1` and `AT.W1 §2` adopt L5's extract-now and present it as
"the audit settled" (`AT.md:113`) — but the audit did NOT settle it; **two
co-equal design lenses reached opposite conclusions** and the plan picked one
without recording that L6 dissented. A reader of `AT.md` cannot tell that the
headline architectural decision was contested 1-1.

This is not pedantry: L6's caution is *correct on the merits* for the part it
owns. The blast-radius point is real (aurora is the most-watched shipped surface;
AP.W3 already spent a whole wave proving `drawFrame` byte-identical on it). The
plan's resolution ("do W2 as its own wave ahead of W4, gated by frame-parity"
— `AT.md:114`) is a *reasonable* synthesis, but it is presented as consensus
when it is a judgment call over a live disagreement.

→ **HARDENING ITEM A6-1.a (S2, record + W1 design):** `AT.md §DEC-AT-1` must
record the L5-vs-L6 split explicitly and state the tie-break rationale (why
extract-now beats standalone+name-forward: the ≥2-consumer bar for the substrate
is met THE MOMENT aurora+goo-blob both consume it, so name-forwarding a 2nd
substrate wave is the avoidable indirection). **Gate:** a `§DEC-AT-1` paragraph
that cites `W0-L6:209-214` and gives the tie-break; the overfitting audit at
close confirms the new substrate has its ≥2 (aurora + goo-blob) AT THE WAVE IT
LANDS, not on a promise.

### A6-1.b — the demand-gate is aurora-specific and CANNOT generalize cleanly (S2, real coupling)

The plan's `useWebGLCanvas` interface (`AT.W1:59-72`) takes a generic
`onFrame(ctx)` callback + a `respectReducedMotion` flag. **This is too thin to
carry aurora's envelope**, and the gap is the demand-gate. Verified at HEAD:

- Aurora's loop PARKS at steady-state via `needsAnimation()`
  (`runtime.ts:507`), which reads **aurora-specific** state:
  `config.nucleiDrift !== 0`, the cursor-eased-within-ε check, the four
  motion-drift uniforms (`runtime.ts:507-533`). The RAF re-arms only via
  `wake()` (`:546`) on a config/cursor change.
- value.js's `useMetaballRenderer` runs an **UNCONDITIONAL** RAF — verified:
  `requestAnimationFrame(render)` at `useMetaballRenderer.ts:165,179,252,281,299`
  with NO demand-gate. The blob is *animated every frame by design* (mood eases,
  pointer smoothing, satellite orbit/merge kinematics are all live-per-frame).

So the two consumers want **opposite RAF policies**: aurora parks aggressively;
the blob never parks (its motion is always live). A naive shared `useWebGLCanvas`
that bakes in either policy breaks the other. The honest generalization must lift
the demand-gate predicate OUT as a consumer-supplied callback —
`needsFrame?: () => boolean` (default `() => true` for the always-animating blob;
aurora supplies its `needsAnimation`). L5 §1.3 step-2 hand-waves this ("the
per-shader bit becomes an injected `drawFrame`") but the *envelope's* demand-gate
is NOT per-shader — it is per-consumer-POLICY, and the plan's interface omits it
entirely. AT.W1 §2's `UseWebGLCanvasOptions` has no `needsFrame` member. **An
extraction that drops aurora's parking would regress the AP-era compositor-cost
win (the whole point of `needsAnimation`); an extraction that keeps aurora's
parking as the default would silently park the blob mid-animation.**

→ **HARDENING ITEM A6-1.b (S2, W1 design + W2 gate):** `UseWebGLCanvasOptions`
MUST expose the demand-gate as a consumer callback (`needsFrame?: () => boolean`,
default `true`). **Gate:** a vitest unit (happy-dom, no GL needed — it tests the
loop-arming logic via a mocked RAF) asserting (1) aurora's `needsFrame=false`
parks the loop, (2) the blob's default `needsFrame=true` never parks, (3)
`wake()` re-arms a parked loop. This is the ONE coupling the shared substrate
lives or dies on, and the plan currently has no gate for it.

### A6-1.c — the W2 wave needs a rollback boundary, not just a parity assertion (S3, risk discipline)

DEC-AT-1 ring-fences blast-radius by doing W2 as its own wave "gated by aurora
frame-parity" (`AT.md:114`). But "gated by parity" is a PASS/FAIL at close; it is
not a *rollback boundary*. If the aurora re-fold regresses in a way the
(weakened — see A6-2) parity gate misses, the blob waves (W3/W4/W5) have already
built ON the extracted substrate. The plan's DAG (`AT.md:137`) makes W4 depend on
W2, so a late-discovered aurora regression cannot be reverted without unwinding
the blob lift.

→ **HARDENING ITEM A6-1.c (S3, W1 sequencing):** specify W2 so the
`useWebGLCanvas` extraction lands FIRST with goo-blob consuming it via a
*standalone-compatible* shape — i.e. the substrate must be consumable WITHOUT the
aurora re-fold, so that if the aurora fold is backed out, goo-blob still ships on
the new substrate (and aurora keeps its current runtime). This is the
L6-standalone posture as a SAFETY NET under the L5-extract headline: extract the
substrate, port goo-blob onto it, and treat aurora's re-fold as a *separable*
W2 sub-step with its own revert seam. **Gate:** the W2 plan states the
aurora-fold is revertible at the wave seam without touching the goo-blob arm.

---

## A6-2 — DEC-AT-1: the frame-parity gate is NOT what the plan thinks it is (S2)

### The refutation

`AT.W1 §2` W2-gate: "aurora renders frame-parity-identical to 3.2.0 (**a
CPU-readback** or a captured-uniform-sequence equality check)" (`AT.W1:82-84`).
The "CPU-readback" clause is **not runnable in this repo**. Verified:

- `vitest.config.ts:18` → `environment: "happy-dom"`. happy-dom has **no WebGL
  rendering context** (it stubs `<canvas>` but does not implement
  `getContext("webgl2")` with a real GL backend). There is no `readPixels` path,
  no software rasterizer, no GPU.
- No existing test reads GPU pixels: `grep readPixels src/` returns only
  `runtime.ts`/`useGlassRenderer.ts` (production code) and a CSS comment — zero
  test-side pixel reads.

So the ONLY runnable form of the W2 gate today is the **uniform-call-sequence
equality** (record every `gl.uniform*`/`drawArrays` call aurora makes over a
fixed time/cursor sequence, before vs after the refactor, assert identical). That
is a real and useful gate — it is exactly the AP.W3 "drawFrame byte-identical"
discipline (commit `69d8202`) — BUT it is strictly weaker than "frame parity":

- It catches a changed uniform VALUE or a changed draw call. ✓
- It does NOT catch a changed GL STATE setup (a dropped `gl.enable(BLEND)`, a
  changed `clearColor`, a VAO-binding-order change, a viewport/DPR regression) if
  those aren't in the recorded call list. The aurora envelope owns exactly this
  state setup (`runtime.ts` context creation, `createVertexArray` at `:320`,
  blend/clear config) — which is PRECISELY the code the extraction moves. The
  refactor's blast-radius is the state-setup code, and the runnable gate is
  blindest exactly there.

The plan calls this "the byte-parity gate de-risks the refactor" (`AT.md:79`).
The byte-parity is over the *draw closure*, not the *envelope* — and the
extraction's risk is the envelope.

→ **HARDENING ITEM A6-2 (S2, W1 gate naming + W2):** (1) rename the W2 gate from
"frame-parity" to "**uniform-and-GL-state-call-sequence parity**" and make the
recorded sequence include the envelope's setup calls (`createVertexArray`,
`enable`/`blendFunc`/`clearColor`, `viewport`, the DPR-resize call) — not just
the per-frame `drawFrame` uniforms. (2) The TRUE frame-parity (actual pixels)
requires the headless-WebGL harness of A6-4 — make that the binding closure for
the envelope risk. **Gate:** a recorded-call-sequence spec covering setup+draw;
plus the A6-4 golden as the real-pixel backstop.

---

## A6-3 — DEC-AT-2: the `/color` extraction creates new coupling, and required-inject is under-specified (S2)

### A6-3.a — the `/color` subpath extraction feeds the C3 circular-resolution risk (S2, new coupling)

DEC-AT-2 (`AT.md:118`) + AT.W1 §1 hoist `cssToOklch`/`oklchToLinear`/`deriveAurora`
out of `aurora/composables/color.ts` into a NEW `@mkbabb/glass-ui/color`
subpath, with aurora re-exporting it "no break" (`AT.W1:108`). This is presented
as pure upside. It is not. Three coupling hazards:

1. **Aurora now depends on `/color`.** Today `color.ts` is aurora-LOCAL (a
   sibling file). After extraction, `/aurora`'s chunk imports `/color`'s chunk
   (or they're inlined — see hazard 3). The `/color` chunk carries the value.js
   peer reach (it IS where `parseCSSColor` lives). So the value.js peer reach now
   has TWO doors into the graph (`/aurora` and `/color` and any `/color`
   consumer), widening the surface the A6-3.b working-space bug can leak through.
2. **C3 (value.js circular-resolution).** value.js is BOTH a glass-ui peer AND a
   glass-ui consumer (its demo). value.js K.W3 will consume `@mkbabb/glass-ui/
   color`'s `defaultBlobColorResolver`, which internally calls value.js's
   `parseCSSColor` — value.js → glass-ui/color → value.js. In the published-dist
   world this is fine (peers resolve at the leaf), but in the **symlinked-monorepo
   dev layout** the cohort uses (per MEMORY `project_publish_ci_broken`,
   `project_ci_monorepo_layout_cascade`) a `file:`-linked value.js consuming a
   `file:`-linked glass-ui that imports value.js is the exact cycle that has
   already bitten `proof:*` gates twice. The plan does not name this risk.
3. **Inline-vs-chunk ambiguity.** Is `/color` a real separate chunk, or does
   Rollup inline it into `/aurora` + `/goo-blob` (the demo-default resolver)?
   If inlined, the "shared home" is a source-organization fiction with three
   copies in three chunks; if a real chunk, every consumer of `/aurora` pulls a
   second network/module request. AT.W1 doesn't decide this.

→ **HARDENING ITEM A6-3.a (S2, W1 design + a gate):** before extracting `/color`,
AT must (1) prove the import graph stays ACYCLIC in the dev symlink layout —
extend `proof:resolution` (or a new `proof:color-acyclic`) to assert
`@mkbabb/glass-ui/color` does not create a value.js↔glass-ui cycle that breaks
`file:`-link resolution; (2) DECIDE chunk-vs-inline explicitly and record the
gzip delta (does `/aurora` grow or shrink?); (3) consider the LESS invasive
alternative L6 §2.2 raised and the plan ignored: keep `cssToOklch` aurora-local,
ship `defaultBlobColorResolver` from the `/goo-blob` subpath itself (it can
import value.js — the inv-K-3 point is only that it's OPT-IN, not that it lives
in a new subpath). The `/color` extraction is the MORE elegant story but the
HIGHER coupling cost; the plan picked it without pricing the cost.

### A6-3.b — the resolver return working-space is UNSPECIFIED — a silent color-wrongness trap (S2)

This is the subtlest and most dangerous gap. The seam type
(`AT.W1:90`) is `ColorResolver = (css: string) => [number, number, number]`
with the comment "linear [0,1] RGB". But:

- The value.js DEMO resolver it replaces (`useMetaballRenderer.ts:58-66`) reads
  `getImageData` → **gamma-space sRGB bytes / 255** — it returns GAMMA RGB, not
  linear. The shader (`metaball.frag.glsl`) consumes `uBaseColor` and perturbs it
  directly. So the demo's `uBaseColor` is GAMMA.
- The D1 transposition (A6-4) runs OKLab math in-shader. **OKLab math REQUIRES
  linear-RGB input** (web-confirmed: "OkLab is designed to work with linear RGB,
  so conversion to linear RGB and back to sRGB is necessary" —
  [GM Shaders: Mini OkLab](https://mini.gmshaders.com/p/oklab)). If the resolver
  returns gamma (matching the demo) but the new shader treats it as linear, the
  perturbation is computed in the WRONG space — colors shift wrong, and NO unit
  test catches it because the CPU-equivalence gate (A6-4) tests the math in
  isolation, not the pipeline working-space.
- `AT.W1:99` says `defaultBlobColorResolver = oklchToLinear(cssToOklch(css))` —
  i.e. glass-ui's default returns LINEAR. But the type comment says "[0,1] RGB"
  ambiguously and a consumer-supplied resolver (the inv-K-3 whole point) could
  return EITHER. **The contract does not PIN the space, so a consumer's
  gamma-returning resolver + the linear-assuming D1 shader = silent wrong color.**

→ **HARDENING ITEM A6-3.b (S2, W1 contract — HIGH):** the `ColorResolver` type
contract MUST pin the working space unambiguously: `(css) => LinearRGB` where
`LinearRGB` is a branded/documented `[number,number,number]` in **linear-light
[0,1]**, and the D1 shader's `uBaseColor` is documented as linear. The
`defaultBlobColorResolver` already returns linear (`oklchToLinear`) — good — but
the CONTRACT must say a consumer's resolver MUST too. **Gate:** the JSDoc + a
unit asserting `defaultBlobColorResolver("white")` returns `[1,1,1]` AND
`defaultBlobColorResolver("#808080")` returns the LINEAR value (~0.216), NOT the
gamma 0.5 — proving the space is linear and catching a regression to the demo's
gamma behaviour.

### A6-3.c — "required-inject, no default" is hostile in the common case (S3, ergonomics)

DEC-AT-2 makes a no-resolver mount THROW (`AT.md:118`, `AT.W1:96`). The lens
agrees this is the correct inv-K-3 *honoring* — but the ergonomics are worse than
the plan admits. EVERY consumer, on EVERY first mount, hits a dev-time throw
until they wire the resolver. For a *visual* primitive whose whole appeal is
"drop it in and it looks good," a hard-throw-on-mount is a hostile first-run.
Contrast: aurora ships with working default colors; the blob would ship broken-
until-wired. The plan's own escape hatch (import `defaultBlobColorResolver` and
pass it) is a two-line ceremony every consumer pays.

The defensible middle the plan dismissed: ship the primitive with the throw, BUT
make the error message a COPY-PASTEABLE one-liner (it already gestures at this,
`W0-L6:139`), AND consider an `<GooBlob :color-resolver>` default-slot pattern
where a `<GooBlobProvider>` at app root injects once (the `provide` idiom is
already in scope, `BLOB_CONFIG_KEY`). The throw-vs-default is a real 1-bit
ergonomics decision the plan treats as closed.

→ **HARDENING ITEM A6-3.c (S3, W1 ergonomics):** keep the throw (inv-K-3-correct)
but (1) the error MUST be the exact copy-paste fix (`import { defaultBlob...`),
and (2) document the app-root `provide(COLOR_RESOLVER_KEY, defaultBlobColorResolver)`
one-time-wire as the canonical pattern so it's a single ceremony per app, not per
call-site. **Gate:** a unit asserting the thrown error string contains the
importable symbol name (so the dev-loud failure is self-curing).

---

## A6-4 — DEC-AT-4: CPU-equivalence + manual visual is NOT sufficient for a GPU shader (S1 — REAL HOLE)

This is the lens's headline refutation and the one S1.

### A6-4.a — the CPU gate tests a DIFFERENT code path than the GPU runs (S1)

DEC-AT-4 (`AT.md:125`) + AT.W1 §6 gate the D1 OKLCh shader on "a vitest spec
running the GLSL OKLab math CPU-side (port the fns to a test harness)" +
"a manual visual confirmation line." **The CPU port is not the shader.** The gate
proves: a TS RE-IMPLEMENTATION of `rgb2oklch`/`oklch2rgb` round-trips and matches
value.js. It proves NOTHING about whether:

- the actual GLSL the GPU compiles and runs matches that TS port (a typo in the
  `.frag.ts` string — a transposed matrix constant, a `highp`-vs-`mediump`
  precision drift, a `pow` vs `exp2` substitution — is INVISIBLE to a TS test of
  a hand-kept-in-sync TS copy);
- the perturbation wiring (`uHueRange`/`uSatShift`/`uBrightnessShift` fed at
  `useMetaballRenderer.ts:221`) feeds the right uniforms after the `/360.0`
  deletion (`AT.W1:175` — the CPU feeder changes meaning);
- the gamut clamp the plan ADDS (`AT.W1:173`, `clamp(rgb,0,1)` since perturbed
  OKLCh can leave sRGB) behaves at the boundary.

The gate tests the MATH; the risk is the MATH-AS-COMPILED-AND-WIRED. These are
different. The plan's own framing admits it: "the one thing CPU math can't settle
is 'does it look right'" (`AT.W1:174`) — but it then makes "does it look right"
a MANUAL line-item, i.e. UNGATED (a human eyeballing a demo once, never
regression-locked).

### A6-4.b — aurora's color-equivalence precedent does NOT transfer (S1, refutes the analogy)

The plan repeatedly justifies the CPU-only gate as "mirroring aurora's OKLab
gate" (`AT.md:94,128`; `AT.W1:115,181`). **This analogy is false.** Verified:

- Aurora runs OKLab math **CPU-side ONLY**. `color.ts` imports `srgbToOKLab`/
  `oklabToLinearSRGB` from value.js and bakes the resulting RGB stops into
  uniforms (`color.ts:35` `oklabToLinearSRGB(L,a,b)` feeds the palette flatten).
- Aurora's GLSL (`aurora.frag.ts`, 32KB) has **ZERO OKLab math** — confirmed:
  `grep oklab src/components/custom/aurora/shaders/*.ts` = empty. Aurora's shader
  consumes pre-baked linear-RGB stops; all perceptual color work is CPU-side.

So aurora's `color-equivalence.test.ts` gates a TS function that IS the production
code path (CPU). The D1 shader gates a TS PORT that is NOT the production code
path (the GPU GLSL is). **glass-ui has NO precedent for gating in-shader color
math, because it has never run color math in a shader.** D1 is the first time —
and the plan reaches for a precedent that doesn't cover it.

### A6-4.c — SOTA: headless-WebGL golden testing is a SOLVED, cheap problem (web-confirmed)

The plan's excuse is "glass-ui has no Playwright/WebGL harness" (`AT.md:126`),
treating it as a permanent constraint that makes the GPU gate "OPTIONAL stretch."
The web refutes the framing: headless WebGL2 + `readPixels` golden-image testing
in CI is a well-trodden path.

- Playwright drives a headless Chromium with WebGL; the canonical pattern is
  "visit the WebGL page, screenshot or `readPixels`, compare to a baseline PNG"
  ([createIT: testing WebGL using Playwright](https://www.createit.com/blog/headless-chrome-testing-webgl-using-playwright/);
  [Barth Cave: WebGL/WebGPU Playwright setup](https://barthpaleologue.github.io/Blog/posts/webgl-webgpu-playwright-setup/)).
- Determinism: WebGL2 + `swiftshader`/GPU-flag gives byte-stable frames at a
  fixed seed+time; `readPixels` extracts the buffer for hashing
  ([webgl2fundamentals: readPixels](https://webgl2fundamentals.org/webgl/lessons/webgl-readpixels.html);
  [Krämer: enable GPU for Playwright headless](https://michelkraemer.com/enable-gpu-for-slow-playwright-tests-in-headless-mode/)).
- The known friction is cross-machine pixel-drift (GPU vendor differences) —
  mitigated by `swiftshader` (CPU rasterizer, deterministic across runners) or a
  per-pixel tolerance, both standard.

A `headless-gl` (node WebGL2) approach exists too (the three.js community uses it
for unit-level GL tests) but is more fragile for WebGL2; the Playwright+swiftshader
route is the SOTA for CI determinism. **The harness is a few-hours stand-up, not
a wave-sized cost.** The plan's "optional stretch" framing under-prices the value
(it gates the TWO highest-risk artefacts — the aurora re-fold AND the D1 shader)
and over-prices the cost.

*(Provenance: the SOLVED-ness is web-confirmed via the four sources above; the
glass-ui-side facts — happy-dom only, aurora's CPU-only OKLab, the empty GLSL
grep — are first-hand from this repo at HEAD.)*

→ **HARDENING ITEM A6-4 (S1 — BINDING, not optional):** AT stands up a minimal
headless-WebGL golden harness (Playwright + Chromium + `swiftshader` for runner
determinism, or `headless-gl` if WebGL2 coverage proves adequate). It is BINDING
for the waves that touch the GPU: (1) the W2 aurora re-fold — a real-pixel golden
of aurora at fixed seed+time before/after (the true frame-parity A6-2 wants); (2)
the W5 D1 shader — a `readPixels` golden of `GooBlob` at a fixed color+time, plus
a zero-perturbation frame == base-color frame check ON THE GPU (proving the
in-shader no-op invariant the CPU test only proves in the port). The CPU-
equivalence gate stays as a FAST complement; the manual visual stays as the human
"does it look right" — but the GPU golden is the floor that closes the
math-as-compiled hole. **If AT declines the harness, it must downgrade the D1
shader claim from "gated" to "manually-verified-only" in FINAL and book the GPU
gate forward — it cannot claim the shader is gated when no gate runs the GPU.**

---

## A6-5 — DEC-AT-5: the demo-story-as-consumer-#2 is a fig-leaf for goo-blob's spirit-bar (S3)

### The verdict: defensible by the letter, fig-leaf by the spirit — and the plan should gate the honesty

The overfitting precept (MEMORY `feedback_overfitting_audit`) is ≥2 DISTINCT
consumer CONTEXTS, "not 2 call-sites in one demo." Measured at HEAD:

- **goo-blob: ONE real consumer.** Verified — `<GooBlob>` is used at exactly one
  non-definition site: `HeroBlob.vue:5` (`grep GooBlob value.js/demo` = the
  component def + `HeroBlob` + its own barrel). That is ONE context.
- **watercolor-dot: genuinely ≥2.** 10+ value.js sites across mix/palette/
  color-picker/dock (one context) + the glass-ui story (a second). Decisively met
  by both the letter AND the spirit — it is the most-used demo primitive.

For goo-blob, the plan's consumer-#2 is `demo/stories/blob-primitives.vue` — a
glass-ui-AUTHORED demo the SAME tranche ships. That is NOT a distinct external
consumer context; it is a test fixture the author writes to satisfy the bar. The
plan is HONEST about this (`AT.md:44-47`, `W0-L6:228-231` — "state the motive
plainly rather than manufacture phantom consumers"), which is to its credit. But
"honest about a fig-leaf" is still a fig-leaf, and the plan oscillates between
"≥2 met" (`AT.md:90` success criterion, `AT.W1:201` gate "≥2 met") and "goo-blob
is THIN" (`AT.md:44`). It cannot be both "met" and "thin" — the gate language
overstates what the honesty admits.

The deeper point: goo-blob's REAL justification is NOT consumer breadth — it is
(a) the D1 shader improvement, (b) the inv-K-3 seam hardening, (c) the substrate
transposition. Those are real value INDEPENDENT of consumer count. The plan
SHOULD lean on those and stop pretending the demo story is a second context. A
self-authored demo clears the THIRD overfitting clause ("is a private demo
helper") — but that clause is for the HELPER, not for the PRIMITIVE the helper
exercises. Using "the demo exists" to bless "the primitive has ≥2 consumers" is
the category error the precept exists to prevent.

→ **HARDENING ITEM A6-5 (S3, overfitting audit honesty):** the AT-close
overfitting audit MUST record goo-blob as **passing on the EXPORT bar (a
published subpath IS public surface) + ONE real consumer (`HeroBlob`) + ONE
self-authored demo** — explicitly NOT as "≥2 distinct external contexts met."
The value-justification line must cite the D1 shader + the seam + the substrate,
NOT consumer breadth. AND a **book-if-stalls clause:** if value.js K.W3 does not
adopt the published `/goo-blob` within a bounded window, goo-blob's real-consumer
count stays at 1 and the lift is retroactively a "moved value.js's demo primitive
into a shared home" — a legitimate motive (the plan says so) but one that must be
NAMED as such in FINAL, not dressed as a satisfied ≥2 invariant. **Gate:** the
overfitting-audit row for goo-blob reads `export-bar + 1 real + 1 demo`, and
FINAL distinguishes export-pass from ≥2-pass (the exact W7-c discipline L1 already
flagged for `deriveAurora`, `W0-L1:434-453`).

---

## A6-6 — secondary adversarial findings (lower severity, still hardening)

### A6-6.a — the existing canvas-2D `demo/stories/blob.vue` collision is a reconciliation the plan UNDERSTATES (S3)

L1 head-a (`W0-L1:475-501`) flagged it: glass-ui ALREADY ships a canvas-2D
metaball demo (`demo/stories/blob.vue`, 14.7KB, verified at HEAD — header: "The
renderer is self-contained (canvas 2D) … the demo medium, not a library
primitive"). The plan's reconciliation (`AT.W1:188` — "re-points to the lifted
WebGL `GooBlob` or is retired") is a one-line aside on a 14.7KB file that is a
WHOLE SECOND IMPLEMENTATION of the same idea. If `blob.vue` retires, that work is
deleted (fine, clean-break). If it re-points to `GooBlob`, the canvas-2D renderer
+ its configurator wiring is rewritten — non-trivial, and it BECOMES the consumer
#2 the plan needs (making head-b's ≥2 true, `W0-L1:503-511`). The plan treats this
as a footnote; it is the actual mechanism by which goo-blob's 2nd-context claim
could become LESS of a fig-leaf (a reconciled `blob.vue` that drives the lifted
primitive in the existing studio shell is a more genuine consumer than a fresh
throwaway `blob-primitives.vue`).

→ **HARDENING ITEM A6-6.a (S3, W1 design):** decide `blob.vue`'s fate as a
FIRST-CLASS slice, not an aside — retire it OR reconcile it onto `GooBlob`, and
if reconciled, count THAT (the existing studio story re-pointed) as the more-
genuine consumer #2 over a net-new throwaway. **Gate:** no two metaball
implementations coexist in `demo/` at AT close (`grep -l metaball demo/` resolves
to one).

### A6-6.b — `frostShader.ts` deletion is correct but its inclusion in the W2 GATE conflates two risks (S3)

The plan bundles "DELETE `frostShader.ts`" into W2's gate (`AT.md:146`, `rg
frostShader = 0`). The deletion is CORRECT (verified orphan — `grep frostShader
src/` returns only the file itself, not in any barrel). But it is a ZERO-risk
unrelated deletion (no consumer, no behaviour) bundled into the HIGH-risk aurora
re-fold wave. Conflating a trivial delete with the riskiest refactor muddies the
W2 gate's signal — if W2 fails, was it the aurora fold or the (impossible-to-fail)
frost delete? Keep them in the same wave for thematic coherence, but the gate
should report them as SEPARATE line-items.

→ **HARDENING ITEM A6-6.b (S3, W2 gate hygiene):** W2's gate lists the
`frostShader` deletion as its own pass/fail line (`rg frostShader = 0`, trivially
green) distinct from the aurora-parity line — so the parity signal isn't diluted.

### A6-6.c — the `.glsl?raw` → `.ts` shader-format settle imports a 91-line/30-field config literal (S3, token-first debt)

The plan settles the shader format on `.ts` raw-strings (`AT.W1:147`) — correct
(matches aurora, no new Vite asset type). But the same lift drags
`BLOB_CONFIG_DEFAULTS` — verified **30+ fields** (`types.ts:100`, the interface
spans `:58-98`, 91 `:`-delimited lines in the file). L5 §6 (`W0-L5:411-418`)
flagged this: shipping the 30-field literal as the only knob is "a demo-tuning
artefact, not a token-first public contract." The plan keeps `BLOB_CONFIG_KEY`
(`AT.W1:149`) but does NOT token-ify the surface. This is a token-first invariant
gap the plan inherited and did not close.

→ **HARDENING ITEM A6-6.c (S3, W4 token-first):** the blob's primary tunable
surface should be `--blob-*` CSS custom properties + a small prop set (matching
`GooBlob.vue`'s existing `--blob-color`), with the 30-field `BLOB_CONFIG` as an
advanced inject-only escape hatch — NOT the primary contract. **Gate:** the
overfitting/token audit confirms the blob's documented public surface is
token+prop-first, not the raw config literal.

### A6-6.d — `prng.ts` as a private leaf has exactly the ≥2 the blobs claim to need (S4, consistency)

Minor consistency note: the plan internalizes `prng` (mulberry32/hashString/
randomRadii/radiiToCSS) as a private `src/utils/prng.ts` (`AT.W1:122`), justified
by "≥2 latent consumers" (goo-blob satellites + watercolor-dot vertices). That is
TWO call-sites in ONE tranche's two new files — the same shape the lens just
dinged goo-blob for (A6-5). The difference: `prng` is PRIVATE (not exported), so
the bar for an internal util is "≥2 internal uses," which it meets (satellites +
vertices are two distinct internal consumers). This is FINE — but the plan should
apply the same honesty bar it owes goo-blob: `prng` clears the internal-≥2 bar
legitimately; goo-blob clears only the export bar. Stating both consistently
avoids a double standard in the close audit.

---

## A6-7 — what the plan got RIGHT (adversarial pass found no defect)

To be fair under the adversarial lens — these survive scrutiny:

- **watercolor-dot's ≥2 is genuine** (10+ external sites + a story). No fig-leaf.
- **The internalized SVG filter (DEC-AT-3)** correctly closes the hidden-global
  trap. Verified: the demo's `#watercolor-filter` is an App.vue-mounted global
  singleton (`color-picker/App.vue:2` `<SvgFilters/>`) that `WatercolorDot`
  references by bare id — exactly the consumer-wiring trap class. The
  auto-mount+namespace (`glass-watercolor-filter`) is the right fix.
- **The W3∥W2 (watercolor lightest, ships first) ordering** is sound risk
  discipline — the CSS/SVG primitive proves the lift mechanics at lowest risk.
- **The inv-16 cross-repo perimeter** is correctly drawn — value.js K.W3 is
  name-forward, glass-ui only publishes.
- **The deletion-is-clean-break discipline** (frost, the canvas resolver, the HSV
  path) honors no-backwards-compat throughout.

---

## A6-8 — augmented-AT proposals (the consolidated hardening ledger)

Every item carries severity + the wave it binds + the concrete gate.

| ID | Sev | Binds | Hardening | Gate |
|---|---|---|---|---|
| **A6-4** | **S1** | W2 + W5 (new sub-wave) | Stand up the headless-WebGL golden harness (Playwright + swiftshader). BINDING for the aurora re-fold AND the D1 shader — the CPU port is not the GPU path; aurora's CPU-only precedent does not transfer. | aurora real-pixel golden (before/after fold); GooBlob `readPixels` golden at fixed color+time; on-GPU zero-perturb==base check. If declined → downgrade D1 to "manually-verified-only" in FINAL + book the GPU gate forward |
| **A6-1.b** | S2 | W1 + W2 | `useWebGLCanvas` must expose the demand-gate as a consumer callback (`needsFrame?:()=>boolean`); aurora parks, blob never parks — opposite policies | happy-dom unit (mocked RAF): aurora `needsFrame=false` parks, blob default never parks, `wake()` re-arms |
| **A6-2** | S2 | W1 + W2 | The runnable W2 gate is uniform-AND-GL-state-call-sequence parity, NOT pixel "frame-parity" (happy-dom has no GL). Rename honestly; include envelope setup calls (VAO/blend/clear/viewport/DPR) in the recorded sequence | recorded-call-sequence spec covering setup+draw; real-pixel parity deferred to A6-4 golden |
| **A6-3.b** | S2 | W1 + W4/W5 | `ColorResolver` return working-space is UNSPECIFIED; demo resolver returns GAMMA, D1 OKLab needs LINEAR — silent wrong-color trap | type pins linear-light [0,1]; unit asserts `defaultBlobColorResolver("#808080")` returns ~0.216 (linear) not 0.5 (gamma) |
| **A6-3.a** | S2 | W1 + W2 | `/color` extraction creates a value.js↔glass-ui cycle in the symlink dev layout (C3) + chunk-vs-inline undecided. Consider keeping `cssToOklch` aurora-local and shipping the default from `/goo-blob` directly | `proof:color-acyclic` (no value.js↔glass-ui cycle in `file:`-link layout); record chunk-vs-inline + the `/aurora` gzip delta |
| **A6-1.a** | S2 | W1 (record) | `§DEC-AT-1` adopts L5 against L6 §4's explicit standalone+name-forward dissent without recording the 1-1 split | `§DEC-AT-1` cites `W0-L6:209-214` + states the tie-break; close audit confirms the substrate's ≥2 lands at its wave |
| **A6-5** | S3 | W8 (overfitting) | goo-blob is ONE real consumer + ONE self-authored demo — record as export-bar-pass, NOT "≥2 met"; the gate language overstates the honesty | overfitting row = `export + 1 real + 1 demo`; FINAL distinguishes export-pass from ≥2-pass; book-if-value.js-stalls clause |
| **A6-1.c** | S3 | W1 (sequencing) | W2 needs a rollback boundary — extract substrate + port goo-blob FIRST, aurora re-fold as a separable revertible sub-step (the L6-standalone posture as a safety net under the L5-extract headline) | W2 plan states aurora-fold is revertible at the wave seam without unwinding the goo-blob arm |
| **A6-3.c** | S3 | W1 (ergonomics) | required-throw is inv-K-3-correct but hostile first-run; make the error copy-paste-curing + document the app-root one-time provide | unit asserts thrown error string contains `defaultBlobColorResolver` |
| **A6-6.a** | S3 | W1 (design) | the existing canvas-2D `blob.vue` (14.7KB) is a second metaball impl — decide retire-vs-reconcile as a first-class slice; reconciled = the more-genuine consumer #2 | `grep -l metaball demo/` resolves to ONE impl at close |
| **A6-6.c** | S3 | W4 (token-first) | the 30-field `BLOB_CONFIG` literal is a demo artefact, not a token-first contract; primary surface = `--blob-*` + small props | token audit: documented surface is token+prop-first, config-literal is inject-only escape hatch |
| **A6-6.b** | S3 | W2 (gate hygiene) | `frostShader` delete (zero-risk) is bundled into the high-risk aurora-fold gate — report as a separate line | W2 gate lists `rg frostShader = 0` distinct from the parity line |
| **A6-6.d** | S4 | W8 (consistency) | apply the same honesty bar to `prng` (private, internal-≥2 = legit) and goo-blob (export-only) — avoid a double standard | close audit states both bars consistently |

### The single binding recommendation

If AT adopts ONE thing from this lens: **stand up the headless-WebGL golden
harness (A6-4).** It is the only gate that runs the GPU, it closes the TWO
highest-risk artefacts (the aurora re-fold's envelope-state risk that the
happy-dom call-sequence gate is blindest to, and the D1 shader's
math-as-compiled-and-wired risk the CPU port can't see), the cost is hours-not-
weeks (web-confirmed SOTA, sources in A6-4.c), and it retires the standing "no
WebGL harness" excuse the plan has leaned on since the aurora work. Without it,
AT ships its two riskiest changes gated only by tests that don't touch a GPU —
and claims they are "gated" when they are not.

---

**Sources (SOTA, web):**
- [createIT — Headless chrome: testing WebGL using Playwright](https://www.createit.com/blog/headless-chrome-testing-webgl-using-playwright/)
- [Barth Cave — End-to-end testing for web games (WebGL/WebGPU Playwright)](https://barthpaleologue.github.io/Blog/posts/webgl-webgpu-playwright-setup/)
- [Michel Krämer — Enable GPU to speed up Playwright headless tests](https://michelkraemer.com/enable-gpu-for-slow-playwright-tests-in-headless-mode/)
- [webgl2fundamentals — WebGL2 readPixels](https://webgl2fundamentals.org/webgl/lessons/webgl-readpixels.html)
- [GM Shaders — Mini: OkLab (linear-RGB working space requirement)](https://mini.gmshaders.com/p/oklab)
- [yum-food/HLSL_OKLAB — LRGB↔OKLAB/OKLCH conversion functions](https://github.com/yum-food/HLSL_OKLAB)

**Provenance note:** the SOTA claims (headless WebGL golden testing is solved/cheap;
OKLab requires linear working space) are WEB-confirmed via the sources above. All
glass-ui/value.js facts (happy-dom only; aurora's CPU-only OKLab + empty-GLSL grep;
the unconditional-RAF blob vs aurora's `needsAnimation` park; goo-blob's single
`HeroBlob` consumer; the gamma-returning demo resolver; the 30-field config; the
`/color` symlink-cycle risk) are FIRST-HAND from this repo + the value.js sibling
at HEAD, file:line-cited inline.
