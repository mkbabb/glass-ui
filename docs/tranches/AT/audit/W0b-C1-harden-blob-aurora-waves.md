# AT.W0b — C1: harden the blob/aurora waves (W2-W5) — fail-closed + sufficient gates

**Lens C1.** Take each blob/aurora wave's GATE as written (`AT.md §Wave sequence`,
`design/AT.W1-blob-primitives.md §8`, `DEC-AT-{1,4}`) and make it **fail-closed +
sufficient** — folding the SOTA-wave findings (`W0b-A1..A6`). The brief's five
questions, answered with a decision each:

1. **W2 aurora frame-parity** — achievable without a WebGL harness? what does it compare?
2. **W3 watercolor zero-wiring filter render** — what does the gate actually assert?
3. **W4 inv-K-3 proof** — transitive import-graph not just grep (per A5).
4. **W5 OKLCh CPU-equivalence** — fold A2's exact assertions.
5. **The WebGL/Playwright harness question (A3/A6)** — does AT need to STAND UP a
   harness, or is CPU-equivalence + manual-visual genuinely binding?

Disposition: analysis only. NO src/ written, NO sibling written, NO other doc
touched. Every glass-ui claim is `file:line`-cited at HEAD; A1-A6 findings are
folded by ID; the one NEW load-bearing fact (the harness already exists) is
empirically verified below.

---

## 0 — The executive: the four gate-hardenings + the harness verdict

**The headline finding of C1 — it reframes A6's S1:** glass-ui **already ships a
headless-Chrome WebGL2 `readPixels` harness.** `scripts/profile-aurora.mjs` spawns
`chrome --headless=new --remote-debugging-port` over CDP (`profile-aurora.mjs:236-263`)
and runs `scripts/aurora-profile/harness-browser.mjs`, a 433-line browser-side
instrumentation that holds a real `WebGL2RenderingContext`, calls
`gl.readPixels(0,0,w,h, RGBA, UNSIGNED_BYTE, pixels)` (`harness-browser.mjs:137`),
computes per-channel `readPixelStats` (`:124-160`), and `canvas.toDataURL` bakes
(`:230`). **A6-4's premise — "glass-ui has no Playwright/WebGL harness; standing one
up is a wave" — is REFUTED at HEAD.** The harness is built, proven (it backs the
aurora preset-thumbnail bake + the F.W5 perf profile), and merely **not wired into
the gate matrix** (`profile:aurora` is a `package.json` script, absent from
`scripts/gates.mjs` — local-only, `profile:` not `proof:`). So the real WebGL-gate
question is NOT "build a harness" (A6's framing) but **"promote the existing harness
from a profile to a golden proof, and decide its determinism posture."** This is a
materially smaller, lower-risk move than A6 priced — and it makes the GPU golden
*affordable enough to be binding*, closing A6-4 without a new wave.

| Wave | Gate as written | C1 verdict | Hardened gate (fail-closed + sufficient) |
|---|---|---|---|
| **W2** | "aurora frame-parity vs 3.2.0 (CPU-readback OR uniform-sequence)" | The CPU-readback clause is **runnable** (the harness exists) but the *uniform-sequence* fallback is **insufficient** (blind to envelope GL-state, per A6-2) AND blind to a **scheduling** downgrade (A3 finding #1). Split into THREE binding lines. | (a) uniform-AND-GL-state call-sequence parity (happy-dom, A6-2); (b) **scheduling-parity** spec (A3 §8.2, 7 assertions); (c) **GPU pixel golden** via the promoted aurora harness (A6-4) — `readPixels` hash before/after fold, per-pixel tolerance. `frostShader` delete = its OWN line (A6-6.b). |
| **W3** | "renders zero-wiring; seeded-shape spec; verify-export-types+proof:resolution" | Underspecified — "renders" is not assertable in happy-dom without pinning WHAT. Three concrete sub-asserts needed. | (a) Teleport-singleton mount unit (filter `<defs>` present, idempotent across N mounts); (b) seeded-shape determinism unit; (c) subpath publication (verify-export-types + proof:resolution); (d) **`proof:blob-value-free` source-graph** (A5-2) covers `/watercolor-dot` too. |
| **W4** | "proof:no-value-default grep; no-resolver throws; ≥2 met; off root barrel" | The dist-grep is **sound but late** (A5 §4.1); needs the **transitive source-graph** floor beneath it (A5-2). The seam **return-space is unpinned** (A5 §0.1, A6-3.b) — a silent color bug. "≥2 met" **overstates** (A6-5). | (a) **two-tier** inv-K-3: `proof:blob-value-free` (source) + `proof:no-value-default` (dist); (b) no-resolver-throws unit whose **error string contains the importable fix** (A6-3.c); (c) `defaultBlobColorResolver` equivalence unit asserting the **DECLARED space** (A5-3); (d) off-root-barrel grep; (e) overfitting row = **export-bar + 1 real + 1 demo** (A6-5). |
| **W5** | "vitest OKLCh-equivalence (4 asserts) + manual visual line" | The 4 asserts are **necessary but not sufficient** (A2 §5 adds 4 more; A6-4 says the TS port is not the GPU path). | (a) the **8-assertion** CPU-equivalence spec (A2 §5) over a TS port kept TEXTUALLY PARALLEL to the GLSL (A2-7); (b) **GPU on-shader zero-perturb==base** golden via the promoted harness (A6-4); (c) the manual-visual line scoped to ONLY the edge-glow constant (A2-6). |

The through-line: **every "frame-parity"/"renders correctly"/"equivalence" gate as
written has a runnable-but-weak floor and an unstated sufficient ceiling.** C1's job
is to name the floor honestly and make the ceiling binding — and the existing harness
makes the GPU ceiling cheap enough to bind.

---

## 1 — The harness already exists (the load-bearing empirical, refuting A6's framing)

A6-4 (the only S1 of the SOTA wave) rests on: *"glass-ui has no WebGL harness; the
'no harness' excuse is a choice, not a constraint; standing one up is a few-hours
job."* The few-hours job is **already done** — and that strengthens A6's conclusion
while demolishing its premise. Verified at HEAD:

| Capability A6 wants for the GPU golden | Where it ALREADY lives | Cite |
|---|---|---|
| Headless Chrome w/ real WebGL2 | `profile-aurora.mjs` spawns `--headless=new --remote-debugging-port` | `profile-aurora.mjs:236, 252-263` |
| CDP driver (no Playwright dep needed) | raw `WebSocket(wsUrl)` to the CDP target | `profile-aurora.mjs:139, 195` |
| A live `WebGL2RenderingContext` against the dev server | harness runs in-page on the booted `npm run dev` | `profile-aurora.mjs:236` (spawns dev), `harness-browser.mjs` |
| `gl.readPixels` buffer extraction | `readPixelStats(gl,w,h)` → `gl.readPixels(...RGBA,UNSIGNED_BYTE)` | `harness-browser.mjs:124-160`, esp. `:137` |
| `canvas.toDataURL` frame bake | thumbnail batch bakes per-preset PNGs | `harness-browser.mjs:230, 358-413` |
| Per-frame RAF timing + over-budget ratio | `sampleFrameTiming(frameCount)` | `harness-browser.mjs:197-212` |
| `--disable-gpu` (SwiftShader-class CPU rasterizer path) | already a conditional arg | `profile-aurora.mjs:263` (`args.splice(1,0,"--disable-gpu")`) |

So the A6-4 "stand up a Playwright+swiftshader harness" recommendation collapses to a
**much smaller delta**: the harness exists, captures pixels, and even has the
`--disable-gpu` determinism lever A6-4.c calls for. What it does NOT do today:
(1) it computes pixel STATISTICS (mean/variance per channel, `readPixelStats:142-158`),
not a stable golden HASH or a baseline-PNG diff; (2) it is a `profile:` script
(local-only, F-tranche artifact path `profile-aurora.mjs:22-24`), absent from
`gates.mjs`; (3) it points at aurora presets, not at a `GooBlob` story.

**DECISION C1-HARNESS (settles the brief's Q5):** AT does NOT stand up a new harness.
AT **promotes the existing `profile-aurora.mjs` CDP harness to a golden proof**
(`proof:webgl-golden`), generalizing its target from aurora-presets to a parameterized
`{story, fixedSeed, fixedTime, dpr}` capture, and adding a stable-hash / tolerance-diff
comparison the stats-only path lacks. Run it under `--disable-gpu` (the CPU rasterizer
already wired) for cross-runner determinism. This is the A6-4 S1 closed at a fraction
of A6's priced cost — because the cost was already paid by the F/O-tranche aurora work.

> Why this matters for the verdict: A6-4 offered an out — *"if AT declines the harness,
> downgrade D1 to manually-verified-only and book the GPU gate forward."* C1 removes
> the out's justification: declining is no longer "save a wave of harness work," it is
> "leave a built, paid-for capability un-promoted." The cost/benefit that made the GPU
> gate "optional stretch" (`AT.md:126, DEC-AT-4`) is inverted. **The GPU golden is
> BINDING for W2 + W5; the harness work is a promotion, not a construction.**

### 1.1 — The determinism posture (the one real risk A6-4.c named)

Cross-machine pixel-drift (GPU-vendor differences) is the known friction. The harness's
`--disable-gpu` arg (`profile-aurora.mjs:263`) selects Chrome's SwiftShader CPU
rasterizer — deterministic across runners, the A6-4.c-endorsed mitigation. The golden
proof MUST pin: `--disable-gpu` (CPU raster), a fixed `devicePixelRatio` (the harness
already parameterizes `dprs`, `profile-aurora.mjs:38`), a fixed RNG seed (the blob's
`prng` + satellite seeds; aurora's drift uniforms), and a fixed `uTime`. With those
pinned the readback is byte-stable; the baseline is a committed hash (NOT a PNG in git
— a hash file, to keep the diff out of the budget). A small per-pixel tolerance (±1 LSB)
absorbs SwiftShader minor-version float drift. This is the standard golden recipe
(A6-4.c sources) realized on the harness glass-ui already owns.

---

## 2 — W2 gate, hardened: three binding lines, not one ambiguous one

The W2 gate as written (`AT.W1 §8` / `AT.md:146`): *"aurora frame-parity vs 3.2.0;
frostShader gone; one WebGL setup; build/tests green."* `AT.W1 §2` elaborates parity
as *"a CPU-readback OR a captured-uniform-sequence equality check."* Three problems,
each from a SOTA-wave lens, each with a fail-closed fix:

### 2.1 — The uniform-sequence floor is blind to GL-STATE (A6-2)

A6-2 verified: the only happy-dom-runnable parity is a uniform-call-sequence equality,
and it does NOT catch a changed `gl.enable(BLEND)` / `blendFunc` / `clearColor` /
`viewport` / VAO-binding-order — *exactly the envelope GL-state the extraction moves*
(`runtime.ts` context creation + `createVertexArray` :320 + blend/clear config). The
extraction's blast-radius is the envelope; the cheap gate is blindest there.

**Hardened floor (W2 line a):** the recorded sequence MUST include the **setup** calls
(`createVertexArray`, `enable`/`blendFunc`/`clearColor`, `viewport`, the DPR-resize
call), not just per-frame `drawFrame` uniforms — recorded over a fixed time+cursor
sweep, before vs after the refactor, asserted identical. This is the AP.W3 "drawFrame
byte-identical" discipline (commit `69d8202`) **extended to the envelope**. Runnable in
happy-dom by mocking the GL context and capturing the call log. **Rename the gate line
from "frame-parity" to "uniform-AND-GL-state call-sequence parity"** so the name does
not over-claim (A6-2).

### 2.2 — The cheap floor is blind to a SCHEDULING downgrade (A3 finding #1)

A3's sharpest finding: the extraction's true risk is a **silent demand-drive
downgrade** — a `useWebGLCanvas` authored from the metaball's always-on-RAF shape and
bolted under aurora would REGRESS aurora's `needsAnimation()` parking
(`runtime.ts:507-533`) + off-screen pause. **The byte-parity gate catches a *pixel*
regression but NOT a *scheduling* one** — aurora at rest draws the same pixels whether
it parks RAF or burns 60fps (A3 §1). The cheap gate is structurally blind to the
extraction's headline risk.

**Hardened floor (W2 line b) — the scheduling-parity spec (A3 §8.2), 7 assertions,
all happy-dom-runnable:**

| Assertion | Guards | Mechanism |
|---|---|---|
| Off-screen → RAF parks | the off-screen pause goo-blob inherits (A3 #2) | mock IntersectionObserver not-intersecting → assert `pause("off-screen")` + no RAF scheduled |
| Tab-hidden → RAF parks | the SuspendReason model survives extraction | `visibilitychange` w/ `document.hidden=true` → assert parked |
| reduced-motion → single frame | SOTA a11y floor (A3 §4.2) | `matchMedia` mock → exactly ONE `drawFrame`, no reschedule |
| Resume-while-suspended unreachable | the AP.W3 structural invariant survives | `resume("tab-hidden")` while `"off-screen"` held → still parked |
| Steady-state parks (aurora only) | aurora keeps `needsAnimation` (A6-1.b) | aurora config 0-drift + settled cursor → RAF→0 |
| blob default never parks | the opposite-policy consumer (A6-1.b) | blob `needsFrame=()=>true` → never parks on-screen |
| context-restored re-arms | the robustness gain aurora GAINS (A3 §4.3) | synth `webglcontextrestored` → `arm`/`initGL` re-called |
| DPR clamp ≤ 2 | SOTA (A3 §4.1) | `devicePixelRatio=4` → backing-store = cssSize×2 |

These assert the SCHEDULING/lifecycle wiring AROUND the GL calls (mocking the context),
so no real GPU is needed — they are the cheap, precise, *correct* floor for the
extraction's actual risk. **This is the single most important W2 hardening C1 adds:
the demand-gate predicate (`needsFrame?:()=>boolean`, A6-1.b) is the one coupling the
shared substrate lives or dies on, and the plan's `UseWebGLCanvasOptions` (`AT.W1:59-72`)
omits it — the spec MUST add it and the scheduling spec MUST gate it.**

### 2.3 — The TRUE pixel parity needs the GPU golden (now affordable, §1)

The CPU readback A6-2 said was "not runnable" IS runnable via the §1 harness. **W2 line
c — the GPU pixel golden:** capture `readPixels` of aurora at a fixed
seed+time+dpr+config under `--disable-gpu`, before the fold (3.2.0 baseline hash) and
after, assert hash-equal within ±1 LSB tolerance. This is the **real frame-parity** the
byte-parity-over-the-draw-closure cannot reach (A6-2) — it sees the composited result of
the envelope state-setup the call-sequence gate is blind to (§2.1). The aurora harness
already targets aurora presets; the golden is a thin generalization (§1).

### 2.4 — `frostShader` delete is its OWN line (A6-6.b)

The zero-risk orphan delete (verified: `grep frostShader src/` = the file only, not in
any barrel — `W0-L5 §4.1`) must NOT dilute the parity signal. W2 gate reports
`rg frostShader src/ = 0` as a **distinct trivially-green line** from the parity lines,
so a W2 red flags whether it was the aurora fold or the (impossible-to-fail) delete.

### 2.5 — W2 rollback boundary (A6-1.c)

Specify W2 so the substrate extraction + goo-blob port land FIRST in a
standalone-compatible shape, with the aurora **re-fold as a separable, revertible
sub-step** — so a late-discovered aurora regression backs out the fold WITHOUT
unwinding the W3/W4/W5 blob arm (which the DAG makes depend on W2). The L6-standalone
posture as a safety net under the L5-extract headline. **Gate:** the W2 plan states the
aurora-fold is revertible at the wave seam.

**W2 hardened gate (fail-closed):**
- (a) uniform-AND-GL-state call-sequence parity (happy-dom) — **green only on identical setup+draw log**.
- (b) scheduling-parity spec — **8 assertions all pass** (the demand-gate, off-screen, tab-hidden, reduced-motion, context-restore, DPR).
- (c) GPU pixel golden via promoted harness, `--disable-gpu`, fixed seed/time/dpr — **hash-equal ±1 LSB**.
- (d) `rg frostShader src/ = 0` — distinct line.
- (e) build + typecheck + test green; the rollback boundary documented.

---

## 3 — W3 gate, hardened: name what "renders zero-wiring" asserts

The W3 gate (`AT.W1 §8` / `AT.md:147`): *"/watercolor-dot ships; renders zero-wiring;
seeded-shape spec; verify-export-types + proof:resolution."* "Renders correctly with
zero wiring" is the DEC-AT-3 headline (auto-mounted namespaced SVG filter, no consumer
`<defs>`) — but "renders correctly" is not assertable in happy-dom without pinning the
mechanism. Three concrete sub-asserts:

### 3.1 — The Teleport-singleton mount (the zero-wiring claim made executable)

DEC-AT-3 auto-mounts a namespaced `<filter id="glass-watercolor-filter">` via a
`<Teleport to="body">` singleton — closing the same hidden-global-dependency class as
the `tw-animate-css`/`@source` traps (`W0-L6 §2`; A6-7 verified the demo's
`#watercolor-filter` IS an `App.vue`-mounted global singleton the consumer must wire).
**Gate assertion (happy-dom-runnable):** mount `<WatercolorDot>` → assert
`document.querySelector('filter#glass-watercolor-filter')` is present; mount N
`<WatercolorDot>`s → assert **exactly one** filter node (idempotency); unmount all →
assert the singleton's teardown discipline (no orphaned `<defs>` leak). This converts
"renders zero-wiring" from a claim into a DOM-presence + idempotency assertion — the
exact analog of the consumer-wiring-trap class the lift is closing.

### 3.2 — Seeded-shape determinism (already in the plan — keep, sharpen)

The `useWatercolorBlob` border-radius animation seeds shape by `hashString(color+seed)`
via the re-homed `prng` (`AT.W1 §4`). **Gate:** same `(color, seed)` → identical
8-value `border-radius` string (deterministic). Use an **asymmetric color** (not gray)
so a hash-collision or a transposed-radii bug actually diverges (the A2 §3 asymmetric-
witness discipline applied to prng). Note (A6-6.d): `prng` clears the **internal-≥2**
bar legitimately (satellites + watercolor vertices = two distinct internal consumers) —
state it as internal-≥2-pass, distinct from goo-blob's export-only pass (§5.4).

### 3.3 — Subpath publication + the source-graph proof reaches /watercolor-dot too

`verify-export-types` + `proof:resolution` green for `/watercolor-dot` (the L.W0 release
probe). AND: the **`proof:blob-value-free` source-graph proof (A5-2, §4.1 below) covers
`/watercolor-dot`** — watercolor-dot has NO ColorResolver (color only seeds the shape,
no RGB resolution; `AT.W1 §4` "do NOT over-inject"), so it must be value.js-free by the
same transitive-graph assertion, NOT just by being CSS/SVG. The proof is one walker over
both blob barrels.

**W3 hardened gate (fail-closed):**
- (a) Teleport-singleton: filter present + idempotent across N mounts + clean teardown.
- (b) seeded-shape determinism on an asymmetric color.
- (c) `/watercolor-dot` subpath + dts: verify-export-types + proof:resolution green.
- (d) `proof:blob-value-free` source-graph reaches `/watercolor-dot` (value.js-free).

W3 is the lightest wave and rightly ships first (A6-7) — it proves the lift mechanics
(subpath + dts + internalized-global + source-graph proof) at lowest risk before the
WebGL waves consume them.

---

## 4 — W4 gate, hardened: the transitive import-graph + the pinned seam space

The W4 gate (`AT.W1 §8` / `AT.md:148`): *"proof:no-value-default (0 value.js in
dist/goo-blob.js); no-resolver throws; defaultBlobColorResolver matches value.js; ≥2
met; off root barrel."* Three hardenings, all from A5/A6.

### 4.1 — Two-tier inv-K-3: source-graph floor BENEATH the dist grep (A5-2 — the brief's Q3)

The brief asks for "transitive import-graph not just grep, per A5." A5 §4 settled the
nuance precisely, and C1 adopts it verbatim as the W4 gate:

**The dist grep is SOUND but LATE.** `@mkbabb/value.js` is a Rollup `external`
(`vite.library.ts:121-137`, `:126`), so Rollup NEVER bundles it into any chunk — it
emits a literal `import "@mkbabb/value.js"` specifier. **Empirically verified at HEAD:**
`grep -l "@mkbabb/value.js" dist/*.js` returns **exactly one file — `dist/aurora.js`** —
and no other chunk. So "does `dist/goo-blob.js` reach value.js" reduces EXACTLY to "does
the literal string appear in `dist/goo-blob.js`" — there is no transitive-bundling path
hiding a reach behind an inlined symbol. **The dist grep is COMPLETE, not heuristic**
(materially stronger than the `/motion-core` engine-free proof, which guards an INLINED
keyframes.js — here the externalization does half the work for free, A5 §4.1).

**BUT the grep fires post-build with poor blame** ("value.js found in dist — WHERE?").
The leak vector is a **source re-export**: a careless `export … from "../color"` (or
`../aurora/composables/color`) in the goo-blob barrel pulls `/color` (which imports
value.js) into the chunk. This is a *plausible* mistake precisely because the W1 design
sits `defaultBlobColorResolver` on `/color` AND goo-blob exports the `ColorResolver`
TYPE — a refactor could fat-finger the value re-export (A5 §4.2).

**Hardened — the two-tier gate (A5-2):**
1. **`proof:blob-value-free` (SOURCE, EARLY, precise):** from `src/goo-blob.ts` +
   `src/watercolor-dot.ts`, walk the transitive `import`/`export … from` graph and
   assert it NEVER reaches `@mkbabb/value.js` OR `aurora/composables/color.ts`. **Reuse
   the existing walker** — `proof-consumers-static.mjs` already does
   comment-stripped transitive resolution (`collectExports`/`resolveModulePath`,
   `:59-130`, verified: comment-strip BEFORE scan per the AP.W4 false-witness fix
   `:101-103`; `resolveModulePath` resolves `.ts/.tsx/.js/.mjs/index.*`, `:59-77`). This
   fires at the SOURCE (precise blame: "`goo-blob/index.ts:N` re-exports `../color`"),
   runs WITHOUT a build (pre-commit-able), and is the precise analog of the root-surface
   `unionExports` walk this repo already trusts (`proof-consumers-static.mjs:121-130`).
2. **`proof:no-value-default` (DIST, RELEASE floor):** `dist/goo-blob.js` +
   `dist/watercolor-dot.js` contain no `@mkbabb/value.js` literal — on the real
   published artefact a consumer installs.

Tier 1 catches the source mistake at authoring time; tier 2 is the publish-the-truth
backstop on the externalized artefact. Together they fail-closed on every inv-K-3
violation vector. **This directly answers the brief's Q3: the grep alone is sound (because
external) but insufficient as the SOLE gate — the transitive SOURCE graph is the early,
precise tier the dist grep needs beneath it.**

### 4.2 — The seam return-space MUST be pinned (A5 §0.1 + A6-3.b — a silent color bug)

This is the gate-sufficiency gap A5 and A6 both surfaced, and it is the W4-W5 hinge.
The `ColorResolver` type (`AT.W1 §3:90`) says `(css) => [r,g,b]` "linear [0,1] RGB" and
implements `defaultBlobColorResolver = oklchToLinear(cssToOklch(css))` (`AT.W1 §3:99`,
returns LINEAR). But:

- The metaball shader being lifted (UNCHANGED at W4) is **end-to-end GAMMA sRGB**: the
  demo resolver reads `getImageData/255` = gamma bytes (`useMetaballRenderer.ts:66`),
  and `fragColor = vec4(rgb*alpha, alpha)` (`metaball.frag.glsl:159`) with NO linear→sRGB
  encode (A5 §1.2). Feeding it `oklchToLinear(...)` hands the HSV math a wrong-curve
  value — `#808080` reads linear `~0.216` vs gamma `0.502`, a **~2× luminance error**: a
  visibly DARKER blob on the headline primitive (A5 §0.1).
- The D1 shader (W5) runs OKLab in-shader, which **requires LINEAR input** (A2 §2,
  A6-3.b). So W4 wants gamma (faithful lift on the unchanged gamma shader); W5 wants
  linear (OKLab needs it). **These are different spaces at different waves** — the seam
  cannot be silently one or the other.

**This is THE load-bearing contradiction across the SOTA wave** (A5 says gamma-for-W4;
A2/A6 say linear-for-W5), and C1 resolves it as a **wave-phased space contract** rather
than a single static choice:

- **DEC-C1-SPACE (the resolution):** the `ColorResolver` return-space is a **named,
  versioned contract**, not an unstated assumption. **W4 lifts on the UNCHANGED gamma
  shader with a GAMMA-returning default** (`defaultBlobColorResolver` = `cssToOklch` →
  `oklchToGammaRgb`, the gamma `[0,1]` triple A5-3 extracts as a standalone helper — NOT
  `oklchToLinear`). This makes W4 a *faithful* byte-isolated lift (the blob looks like
  the demo, no darkening) and honors the W4/W5 byte-isolation the plan prizes. **W5's D1
  transposition then flips the whole pipeline to LINEAR as a DELIBERATE, GATED change**:
  the resolver switches to linear-returning, the shader gains the `linearToSrgb()` output
  stage (A2-1, the mandatory 3rd GLSL fn), and the §5 equivalence spec asserts the new
  declared space. The space-flip is a *wave-scoped decision recorded in the D1 wave*, not
  a silent default baked at W4 and mis-assumed at W5.

  > The contradiction between A5 (gamma) and A2/A6 (linear) is NOT a conflict — it is
  > the W4-vs-W5 boundary. A5 is right FOR W4 (faithful lift on the gamma shader); A2/A6
  > are right FOR W5 (the D1 shader needs linear). The hardened plan ships gamma at W4,
  > flips to linear at W5 as the D1 wave's own gated change. The gate at each wave
  > asserts THAT wave's declared space.

**W4 gate assertion (fail-closed):** the `defaultBlobColorResolver` equivalence unit
asserts the **W4-DECLARED space (GAMMA)** to 1e-6 — `defaultBlobColorResolver("#808080")`
returns ~`0.502` (gamma), NOT ~`0.216` (linear) — mirroring `color-equivalence.test.ts`'s
harness shape (`aurora/__tests__/color-equivalence.test.ts`, the STOPS×HEXES sweep at
`EPS=1e-6`) but asserting the seam's W4 space. PLUS a demo-story side-by-side showing the
lifted blob matches the value.js demo's base color (no darkening). **Without this
assertion the seam ships space-ambiguous and the headline primitive paints wrong** —
exactly the `feedback_glass_ui_binding_verification` silent-no-op class.

### 4.3 — No-resolver throw with a self-curing error (A6-3.c)

DEC-AT-2 makes a no-resolver mount throw (inv-K-3-correct). A6-3.c hardens the
ergonomics: keep the throw, but the error string MUST be the COPY-PASTE fix. **Gate:** a
unit asserting the thrown error string contains `defaultBlobColorResolver` (the
importable symbol) so the dev-loud failure is self-curing — AND document the app-root
`provide(COLOR_RESOLVER_KEY, defaultBlobColorResolver)` one-time-wire as the canonical
single-ceremony pattern.

### 4.4 — The ≥2 honesty gate (A6-5)

"≥2 met" (`AT.W1 §8 W4 row`, `AT.md:90`) **overstates** what the plan's own honesty
admits ("goo-blob is THIN", `AT.md:44`). goo-blob has **ONE** real consumer
(`HeroBlob.vue`, verified A6-5) + one self-authored demo. **Gate:** the W4/close
overfitting row reads `export-bar + 1 real + 1 demo`, NOT "≥2 distinct external
contexts." The value-justification cites the D1 shader + the inv-K-3 seam + the substrate
transposition (real value INDEPENDENT of consumer count), NOT breadth. Plus a
**book-if-value.js-stalls clause**: if value.js K.W3 doesn't adopt the published
`/goo-blob` in a bounded window, FINAL names the lift as "moved value.js's demo
primitive into a shared home" (a legitimate motive — but NAMED, not dressed as a
satisfied ≥2). The `blob.vue` reconciliation (A6-6.a) is the mechanism that makes
goo-blob's 2nd-context LESS of a fig-leaf: retire-or-reconcile as a first-class slice;
`grep -l metaball demo/` resolves to ONE impl at close.

**W4 hardened gate (fail-closed):**
- (a) two-tier inv-K-3: `proof:blob-value-free` (source) + `proof:no-value-default` (dist) — BOTH green.
- (b) `defaultBlobColorResolver` equivalence asserts the W4-DECLARED GAMMA space to 1e-6 + demo side-by-side no-darkening.
- (c) no-resolver throw whose error string contains `defaultBlobColorResolver`.
- (d) off-root-barrel grep (`rg GooBlob src/index.ts = 0`); off the value.js peer (the source-graph proof).
- (e) overfitting row = `export-bar + 1 real + 1 demo`; `grep -l metaball demo/` = ONE.

---

## 5 — W5 gate, hardened: the 8-assertion CPU spec + the GPU on-shader no-op

The W5 gate (`AT.W1 §8` / `AT.md:149`): *"vitest OKLCh-equivalence (round-trip ·
core-match · zero-perturb no-op · gamut clamp) + manual visual confirmation line."* A2
proved the 4 asserts are **necessary but not sufficient** (they miss the space-bug, the
transpose-bug, the gamut-step mismatch); A6-4 proved the TS port is **not the GPU path**.
C1 binds both fixes.

### 5.1 — Fold A2's exact 8 assertions (the brief's Q4)

The W5 CPU-equivalence spec ports the GLSL fns to a `metaball-color.glsl-port.ts` fixture
kept TEXTUALLY PARALLEL to the GLSL (A2-7 — same fn names, same constant literals,
reviewed side-by-side; the port-fidelity is the one unprovable link, mitigated by the
parallelism + the asymmetric-color witness). The spec asserts, each an `it()`:

1. **Round-trip identity (linear):** `oklabToLinear(linearToOklab(c)) ≈ c`, 64-color sweep, tol 1e-6. *Catches matrix-inverse / cube-mismatch.*
2. **value.js forward agreement (gamma entry):** TS `linearToOklab(srgbToLinear(gammaRGB))` == value.js `srgbToOKLab(gammaRGB)`, 1e-6, **on an ASYMMETRIC color `#3a7bd5`** (a transpose error diverges only off-gray). *Catches the §A2-3 matrix-source / transpose bug.*
3. **value.js inverse agreement:** TS `oklabToLinear(lab)` == value.js `oklabToLinearSRGB(lab)`, 1e-6. *Catches LMS2LIN transpose/source.*
4. **OETF agreement (NEW vs prior plan):** TS `linearToSrgb(c)` == value.js `linearToSrgb(c)`, incl. the 0.0031308 knee. *Catches the §A2-2 missing/mis-encoded OETF — the bug the prior 4-point gate would MISS entirely.*
5. **Full-chain space check (NEW — the §2 guard):** `defaultBlobColorResolver(css) → [linear] → linearToOklab → (zero perturb) → oklabToLinear → linearToSrgb` == gamma RGB of the input, 1e-5. *Proves the linear/gamma bookkeeping is internally consistent end-to-end — the assertion the prior plan lacked.*
6. **Zero-perturb no-op:** all perturb uniforms 0 ⇒ output == `linearToSrgb(uBaseColor)` exactly. *Catches an accidental constant offset.*
7. **In-gamut after `gamutReduce`:** {8 hues × ΔL/ΔC/Δh extremes} → output in [0,1]³ + hue-preservation check. *Catches an out-of-gamut leak the HSV `clamp(0,1)` masked.*
8. **Perceptual-uniformity witness (NEW — the D1 RAISON D'ÊTRE):** a fixed hue rotation produces a SMALLER L-excursion in OKLCh than the same-magnitude HSV rotation. *Proves D1 is WORTH IT — the closest unit-test proxy for "does it look right," demoting the manual line to edge-glow aesthetics only.*

Assertions 4, 5, 8 are A2's augmentations over the prior 4-point gate; they are the
sufficiency the W5 gate was missing.

### 5.2 — Three load-bearing D1 corrections the W5 SPEC must record (not discover at impl)

A2 surfaced three bugs that are NOT gate items but SPEC items — they change the shader
the gate tests, so they must land in the W5 wave spec BEFORE impl:

- **DEC-AT-A2-1 — `uBaseColor` is LINEAR at W5; the shader gains an explicit
  `linearToSrgb()` output stage** (A2 §2, §4). A mandatory 3rd GLSL fn the current plan
  omits — without it the linear-returning resolver writes linear straight to a gamma
  canvas (visibly too dark). This is the W5 half of DEC-C1-SPACE (§4.2): W4 = gamma, W5
  flips to linear + adds the OETF.
- **DEC-AT-A2-2 — hardcode value.js's EXACT Ottosson matrices** (`constants.ts:346-365`),
  transposed for GLSL column-major; NOT the GM-Shaders/LYGIA convenience set (which
  diverges in the 5th-6th decimal — fatal to the 1e-6 gate, A2 §3). The asymmetric-color
  assertion (§5.1 #2) is the canary for a transpose/source error.
- **Hue unit: `radians(uHueRange)`, not raw** (A2 §4) — OKLCh hue is `atan` radians; the
  plan's "no /360" would over-rotate ~57×. Assertion #8 catches a units error as a wild ΔL.

Plus: in-shader gamut = hue-preserving CHROMA-REDUCTION (the GPU cousin of `color.ts
gamutMapStop`), `clamp(rgb,0,1)` as the sub-1e-4 backstop ONLY (A2 §6.1); `uEdgeGlowL` a
uniform/`--blob-edge-glow-l` token seeded ~0.03, NOT a baked `+0.06` (A2 §6.2).

### 5.3 — The GPU on-shader golden — the CPU port is not the GPU path (A6-4, now affordable)

A6-4's S1: the CPU spec tests a TS RE-IMPLEMENTATION, proving nothing about whether the
GLSL the GPU compiles matches (a transposed constant in the `.frag.ts` string, a
`highp`/`mediump` drift, a `pow`/`exp2` substitution are INVISIBLE to a TS test of a
hand-kept copy). And aurora's color-equivalence precedent does NOT transfer — aurora runs
OKLab **CPU-side only** (`color.ts`), its GLSL has ZERO OKLab math (verified: `grep oklab
aurora/shaders/*.ts` = empty); **D1 is the first in-shader color math glass-ui has ever
run, with NO existing gate class** (A6-4.b). The CPU spec is the FAST complement; the GPU
golden is the floor.

**Via the §1 promoted harness (NOT a new wave):** `proof:webgl-golden` targets a
`GooBlob` story at a fixed color+seed+time+dpr under `--disable-gpu`, asserts (a) the
`readPixels` frame hash-matches a committed baseline within ±1 LSB, AND (b) the **on-GPU
zero-perturbation invariant**: a frame with all perturb uniforms 0 reads back ==
`linearToSrgb(uBaseColor)` per-pixel — proving the in-shader no-op the CPU test only
proves in the port. This is the math-as-COMPILED-AND-WIRED hole closed on the actual GPU.

### 5.4 — The manual-visual line, scoped to ONLY the edge-glow (A2-6)

The 8-assertion CPU spec + the GPU golden shrink the manual-visual confirmation (the
P5-precedent, DEC-AT-4) to its irreducible core: **does the `--blob-edge-glow-l` constant
read right + does the overall look please.** Everything else is unit- or GPU-gated. The
manual line is a *complement*, not the floor (A6-4's correction to DEC-AT-4).

Plus A1's four shader-quality folds (A1 §0 — fwidth AA, normalized-quadratic smin,
aurora's decorrelated fbm, premultiply-ordering preservation): the W5 gate's premultiply
assertion (A1 §5 — perturbation on STRAIGHT RGB before the `*alpha` multiply) and the
fwidth-AA visual line ride alongside the OKLCh asserts. (C1 notes these as W5-spec
inclusions; A1 owns their detail.)

**W5 hardened gate (fail-closed):**
- (a) the 8-assertion CPU-equivalence spec over the textually-parallel TS port — all pass.
- (b) `proof:webgl-golden`: GooBlob `readPixels` hash ±1 LSB + on-GPU zero-perturb==`linearToSrgb(base)`.
- (c) premultiply-ordering assertion (A1 §5).
- (d) manual-visual line scoped to the edge-glow constant + overall look (A2-6).
- (e) the three DEC-AT-A2 spec corrections recorded in the wave BEFORE impl.

---

## 6 — The two NEW gates the brief names (concrete, fail-closed, runner-ready)

### 6.1 — `proof:webgl-substrate-single` (the brief's "single WebGL substrate" gate)

The W2 success criterion "one WebGL setup glass-ui ships" (`AT.md:76`, `AT.W1 §2`) has
NO gate today — it is a prose claim. C1 makes it a fail-closed proof. **What it asserts:**
the compile→link→quad→uniforms→RAF-lifecycle boilerplate exists in exactly ONE place.
Concretely, a `proof-webgl-substrate-single.mjs` that:

1. asserts `rg "createVertexArray\|compileShader\|linkProgram" src/` resolves to exactly
   ONE module family — `src/composables/glass/webgl/` (the extracted `useWebGLCanvas` +
   `glUtils.ts`), NOT scattered across `aurora/composables/runtime.ts` AND
   `goo-blob/composables/useMetaballRenderer.ts` (the pre-AT duplication, `W0-L5 §1`);
2. asserts `frostShader.ts` is gone (`rg frostShader src/ = 0` — the orphan delete);
3. asserts both aurora's runtime AND goo-blob's renderer transitively import
   `useWebGLCanvas` (the ≥2-consumer floor for the substrate — A6-1.a's "the new
   substrate has its ≥2 at the wave it lands, not on a promise");
4. **EXCLUDES the webgpu path** (it stays separate — `W0-L5`, `AT.md:80`,
   `AT.W1 §2`) and the `useGlassRenderer` frost path IF it survives — the proof must
   allowlist the deliberately-separate substrates, not red-flag them.

This is a grep-tier proof (the `proof:vt-names` / `proof:phantom-classes` pattern — a
`scripts/proof-*.mjs` that scans src and exits non-zero on violation). It fails-closed:
a re-introduced 4th WebGL bootstrap, or a goo-blob that DOESN'T consume the substrate (a
covert standalone re-impl), reds the gate. **Caveat (the allowlist is load-bearing):** the
proof must enumerate the legitimately-separate substrates (webgpu, and the
`useGlassRenderer` frost path until it's deleted) explicitly, or it over-fires. Pin the
allowlist in the proof with a comment citing why each is separate.

### 6.2 — `proof:no-value-default` (transitive) — the two-tier inv-K-3 (the brief's framing)

Per §4.1, the brief's "`proof:no-value-default` transitive" is the **source-graph tier**
(`proof:blob-value-free`) BENEATH the dist-grep tier. Both ship; the transitive one is
the early/precise gate. Concretely a `scripts/proof-blob-value-free.mjs` that **reuses
`proof-consumers-static.mjs`'s `collectExports`/`resolveModulePath`** comment-stripped
walker (already battle-tested against the AP.W4 false-witness class) — walk
`src/goo-blob.ts` + `src/watercolor-dot.ts` transitively, exit non-zero if the graph
reaches `@mkbabb/value.js` OR `aurora/composables/color.ts`. The dist tier stays the
`readFileSync(dist/goo-blob.js).includes("@mkbabb/value.js") === false` floor. Both
register in `gates.mjs` tagged `{local, ci, release}` (the source tier needs no build,
runs everywhere; the dist tier needs `dist/`, runs post-build).

### 6.3 — `proof:webgl-golden` (the promoted harness, §1 + §5.3)

The promotion of `profile-aurora.mjs` → a golden proof: parameterized `{story, seed,
time, dpr}` capture under `--disable-gpu`, committed baseline HASHES (not PNGs),
±1 LSB tolerance. Binding for W2 (aurora before/after fold) + W5 (GooBlob + on-GPU
zero-perturb). **Gate-matrix posture:** tag it `{local, ci}` — NOT `release` (it boots a
dev server + Chrome, the heaviest gate; the release path already runs the cheap proofs).
It joins the `sibling: true` / heavy-gate class alongside `proof:consumers:build` +
`proof:runtime` (local/ci, not release — `gates.mjs:16-18`). CI runs it on a runner with
Chrome (the `profile-aurora.mjs` chrome-path discovery already handles
`CHROME_PATH`/fallback, `profile-aurora.mjs:30-32`).

> **Honest scope note (the determinism caveat is real):** if cross-runner SwiftShader
> drift exceeds ±1 LSB in practice, the golden falls back to a STRUCTURAL assertion
> (frame mean/variance per channel within tolerance — the `readPixelStats` the harness
> ALREADY computes, `:142-158`) rather than a strict hash. That is weaker than a hash
> but still catches a gross regression (a black frame, a wrong base color, a
> 2×-luminance space-bug) — and it is strictly MORE than the zero GPU coverage the plan
> ships today. The hash is the goal; the stats-tolerance is the fail-soft floor. Either
> way the GPU is in the loop, which is the A6-4 ask.

---

## 7 — The WebGL/Playwright harness question, settled (the brief's Q5, in full)

**Does AT need to STAND UP a WebGL e2e harness, or is CPU-equivalence + manual-visual
genuinely binding?**

**Verdict: AT does NOT stand up a harness — it PROMOTES the one glass-ui already owns —
and CPU-equivalence + manual-visual is NOT sufficient alone (A6-4 is right) but the GPU
gate that closes the gap is now CHEAP (A6-4's premise is wrong).** The synthesis:

- **A6-4's conclusion (GPU gate binding) is CORRECT** — the CPU port is a different code
  path than the GPU GLSL; aurora's CPU-only OKLab precedent does not transfer; D1 is the
  first in-shader color math with no existing gate class. CPU-equivalence + manual-visual
  alone leaves the two highest-risk artefacts (the aurora envelope re-fold, the D1
  shader) gated by tests that never touch a GPU.
- **A6-4's premise (no harness; stand-up = a wave) is WRONG** — the headless-Chrome CDP
  WebGL2 `readPixels` harness is BUILT (`profile-aurora.mjs` + `harness-browser.mjs`,
  §1), with the `--disable-gpu` determinism lever already wired. It is a `profile:`, not
  a `proof:`, and points at aurora presets, not a blob story.
- **Therefore the resolution is a PROMOTION, not a CONSTRUCTION** (DEC-C1-HARNESS, §1):
  generalize the harness target to `{story, seed, time, dpr}`, add a stable-hash /
  stats-tolerance comparison, run it `--disable-gpu`, register it as `proof:webgl-golden`
  `{local, ci}`. The cost is hours-of-generalization on a paid-for capability, not a
  wave of harness-building.
- **What stays binding alongside the GPU golden:** the 8-assertion CPU spec (FAST,
  catches math bugs without booting Chrome — the dev-loop gate), and the manual-visual
  line scoped to ONLY the edge-glow constant (the irreducible subjective knob). The GPU
  golden is the floor under both; it is the complement that makes "does it look right"
  regression-locked rather than eyeballed-once.

The net: CPU-equivalence is binding AND insufficient; manual-visual is binding AND
narrow; the GPU golden is the binding floor that was thought unaffordable and isn't.
**AT ships all three.** The "no WebGL harness" excuse the plan leaned on since the aurora
work (`AT.md:126`, `DEC-AT-4`) is retired — by glass-ui's own pre-existing harness.

---

## 8 — The consolidated hardened-gate ledger (wave → fail-closed gate)

| Wave | Hardened gate (fail-closed; sufficient) | Folds |
|---|---|---|
| **W2** | (a) uniform+GL-STATE call-sequence parity (happy-dom); (b) scheduling-parity spec — 8 asserts incl. `needsFrame` demand-gate; (c) `proof:webgl-golden` aurora before/after fold ±1 LSB; (d) `rg frostShader=0` distinct line; (e) `proof:webgl-substrate-single`; (f) rollback boundary documented | A6-2, A6-1.b/c, A3 §8.2, A6-4, A6-6.b |
| **W3** | (a) Teleport-singleton filter present + idempotent + clean teardown; (b) seeded-shape determinism on asymmetric color; (c) `/watercolor-dot` verify-export-types + proof:resolution; (d) `proof:blob-value-free` reaches it | DEC-AT-3, A6-7, A6-6.d, A5-2 |
| **W4** | (a) two-tier inv-K-3 (`proof:blob-value-free` source + `proof:no-value-default` dist) BOTH green; (b) `defaultBlobColorResolver` asserts W4-DECLARED GAMMA space 1e-6 + no-darkening side-by-side; (c) no-resolver throw error string contains `defaultBlobColorResolver`; (d) off-root-barrel + off-value.js-peer; (e) overfitting row = export-bar+1 real+1 demo, `grep -l metaball demo/`=ONE | A5-2, DEC-C1-SPACE, A6-3.b/c, A6-5, A6-6.a |
| **W5** | (a) 8-assertion CPU spec over textually-parallel TS port; (b) `proof:webgl-golden` GooBlob hash ±1 LSB + on-GPU zero-perturb==`linearToSrgb(base)`; (c) premultiply-ordering assert; (d) manual-visual scoped to edge-glow only; (e) DEC-AT-A2-{1,2}+hue-unit recorded in spec pre-impl | A2 §5, A6-4, A1 §5, A2-6, A2-1/2 |

**Three NEW gates** (all fail-closed, runner-ready):
- `proof:webgl-substrate-single` (§6.1) — one WebGL bootstrap, allowlisting webgpu; the W2 "single substrate" claim made executable.
- `proof:blob-value-free` (§6.2) — the transitive SOURCE-graph tier of inv-K-3, reusing the existing comment-stripped walker.
- `proof:webgl-golden` (§6.3) — the promoted CDP harness as a golden proof; `{local,ci}`; binding for W2 + W5; hash-with-stats-tolerance-fallback.

**No new wave.** Every hardening sharpens an existing W2-W5 gate or adds a proof that
runs WITHOUT a new tranche phase. The DEV/IMPL boundary (W1|W2) is unchanged. NO src/
touched by this lens.

---

## 9 — Sources

**glass-ui corpus (read first-hand, HEAD):**
- `scripts/profile-aurora.mjs:22-32, 139, 195, 236, 252-263` (the CDP harness + `--disable-gpu` lever) — **the load-bearing §1 empirical**.
- `scripts/aurora-profile/harness-browser.mjs:124-160 (readPixelStats+readPixels :137), 197-212 (frameTiming), 230 (toDataURL), 358-413 (thumbnail bake)`.
- `scripts/proof-consumers-static.mjs:59-130 (collectExports/resolveModulePath/comment-strip), 121-130 (unionExports)` — the walker `proof:blob-value-free` reuses.
- `scripts/gates.mjs:7-18` (the `{local,ci,release}`-tagged gate registry).
- `vite.library.ts:121-137` (`@mkbabb/value.js` Rollup external — A5 §4.1).
- `src/components/custom/aurora/__tests__/{color-equivalence,derive-aurora}.test.ts` (the equivalence-test precedent).
- `dist/aurora.js` — empirically the SOLE `@mkbabb/value.js` literal in `dist/*.js` (verified).
- `vitest.config.ts` (`environment:"happy-dom"` — no in-process WebGL, A6-2).

**AT prior art folded:** `AT.md §DEC-AT-{1,2,4,5}, §Wave sequence`;
`design/AT.W1-blob-primitives.md §1-8`; `audit/W0-L{5,6}`;
`audit/W0b-A1 §0,§5`, `A2 §2,§3,§5,§6,§9 (DEC-AT-A2-1/2)`, `A3 §1,§4.3,§8.2,§9`,
`A5 §0.1,§4.1,§4.2,§5 (A5-2/3)`, `A6 §A6-1.b/c,§A6-2,§A6-3.b/c,§A6-4,§A6-5,§A6-6.a/b/d`.

**SOTA (web, via the A-wave lenses — not re-fetched by C1; cited by provenance):**
headless-WebGL golden testing is solved/cheap (A6-4.c: createIT, Barth Cave, Krämer,
webgl2fundamentals readPixels); OKLab needs linear working space (A2/A6: GM Shaders
Mini OkLab, Ottosson); IntersectionObserver pause + DPR-clamp + reduced-motion-single-frame
(A3: xterm.js, web.dev High-DPI, georgedoescode). C1's NEW finding (the harness already
exists) is first-hand from this repo, not web.
