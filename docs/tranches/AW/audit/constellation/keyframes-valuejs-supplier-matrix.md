# keyframes-valuejs-supplier-matrix — every AW aurora/blob supplier dependency is REAL at the resolved version; zero phantom APIs; no supplier-side wave needed before AW executes

The upstream-supplier direction: what do glass-ui's AW aurora (W4-8) + blob (W9-11) waves NEED
from `@mkbabb/keyframes.js` and `@mkbabb/value.js`, and does the cited API exist at the version
glass-ui actually RESOLVES today? Verdict: **every cited supplier API is present and shaped as the
wave assumes.** The one phantom-class risk the prompt flagged (the blob soft-body `useSpring`
seam) is verified REAL — `SpringProgress` exists with the exact `value`/`velocity`/`tick(dt)`/
`subscribe`/`play` surface W10 needs. No supplier-side wave is required before the AW waves run.

## Findings

### Version baseline (read TODAY)

1. **keyframes.js: published latest = 4.0.0, but glass-ui RESOLVES 2.2.0.** npm latest is `4.0.0`
   (`npm view @mkbabb/keyframes.js version`). glass-ui's peer pin is `"@mkbabb/keyframes.js":
   "^2.2.0 || ^3.0.0"` (`/Users/mkbabb/Programming/glass-ui/package.json:615`) and the installed
   tree resolves **2.2.0** (`node_modules/@mkbabb/keyframes.js/package.json` → `"version":
   "2.2.0"`). **All AW keyframes claims must be verified against 2.2.0, not 4.0.0** — and they
   were (Findings 5-7). The local sibling repo `/Users/mkbabb/Programming/keyframes.js` is at
   `4.0.0` (its dist d.ts), used here only as the forward-repin check (Finding 7).

2. **value.js: published latest = 0.11.0, but glass-ui RESOLVES 0.10.0.** npm latest is `0.11.0`.
   glass-ui's peer pin is `"@mkbabb/value.js": "^0.10.0"` (`package.json:616`) and the installed
   tree resolves **0.10.0** (`node_modules/@mkbabb/value.js/package.json` → `"version": "0.10.0"`).
   All AW value.js claims verified against 0.10.0's d.ts (Findings 3-4). value.js is also
   keyframes.js's own upstream peer — the resolved 2.2.0 keyframes d.ts imports `ColorSpace`,
   `HueInterpolationMethod`, `timingFunctions`, `ValueUnit` et al. from `@mkbabb/value.js`
   (`node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts:1-9`).

### value.js — the W5/W11 aurora+blob color-derive dependency (VERIFIED REAL at 0.10.0)

3. **W5 derive-color routes through value.js's Ottosson core — every cited function exists at
   0.10.0.** AW.W5 §2/§3/§11 (`AW.W5-aurora-color-derive.md:16,38,183`) mandates "value.js where
   befitting: the CPU `deriveAurora` extension routes through value.js's Ottosson OKLCh, no
   hand-rolled color math" and keeps `gamutMapStop` over value.js's gamut-map. The current aurora
   `color.ts` already imports the exact functions from `@mkbabb/value.js`
   (`src/components/custom/aurora/composables/color.ts:19-26`): `srgbToOKLab`, `oklabToLinearSRGB`,
   `rawOklabToOklch`, `rawOklchToOklab`, `gamutMapOKLab`, `isInSRGBGamut`. All six are exported by
   value.js 0.10.0 (`node_modules/@mkbabb/value.js/dist/units/color/gamut.d.ts` declares every one,
   re-exported through `dist/index.d.ts`). The harmony/temperature/easing/scene extensions W5.2
   adds are NEW glass-ui-local code in `color.ts` over this SAME value.js surface — **no new
   value.js API is required.**

4. **W5 `huePath` atom + W11 multi-stop hue-arc map cleanly onto value.js's `interpolateHue` +
   `HueInterpolationMethod`.** W5 §3.3 adds a `huePath` (`shorter|longer|increasing|decreasing`)
   atom; W11.b adds "shorter/longer hue-arc control." value.js 0.10.0 exports the exact type
   `HueInterpolationMethod = "shorter" | "longer" | "increasing" | "decreasing"` and the
   `interpolateHue(h1,h2,t,method?)` function (`dist/units/color/dispatch.d.ts`). NB: W5's `huePath`
   is an IN-SHADER GLSL uniform (the interpolation happens in `samplePalette` GLSL), so the value.js
   `interpolateHue` is the CPU-side reference/derive companion, not the per-fragment path — but the
   union is value.js-canonical, so the type can be re-used directly if the CPU derive wants it. The
   W11 shared `ColorHarmony` hoist (W11 Scope 4) lives in glass-ui's `/color` leaf, consuming the
   same value.js core the leaf already imports (`src/composables/color/index.ts:17-26` imports
   `colorUnit2`, `oklabToLinearSRGB`, `oklabToRgb255`, `parseCSSColor`, `rawOklabToOklch`,
   `rawOklchToOklab`, `srgbToOKLab`). **No new value.js API.**

### keyframes.js — the W10 blob soft-body spring dependency (the phantom-risk lane — VERIFIED REAL at 2.2.0)

5. **The W10 `useSpring`/`SpringProgress` dependency is NOT a phantom.** W10 §3.1 + §Agent Units +
   §Dependencies (`AW.W10-blob-interaction.md:24-27,104-108,174-175`) require: "reusing the real
   `useSpring` composable (`src/composables/motion/useSpring.ts` — wraps `@mkbabb/keyframes.js`
   `SpringProgress`, already exposes `value` + `velocity`); consume, do not hand-roll." Verified:
   `useSpring.ts:15` imports `SpringProgress` from `@mkbabb/keyframes.js`, exposes a `SpringRef`
   with `value`/`velocity`/`isSettled`/`snap`/`reset`/`dispose` (`useSpring.ts:61-74`), and reads
   `spring.value.value` + `spring.value.velocity` + `spring.value.settled` per frame
   (`useSpring.ts:122-127,147-151`). The keyframes **2.2.0** d.ts declares
   `export declare class SpringProgress` (`node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts:776`)
   with `get value()`, `get velocity()`, `get settled()`, `set target()`, `snap()`,
   `reset(value?, velocity?)`, `subscribe(fn): () => void`, `play(onFrame?)`, `stop()`, `dispose()`
   (`:798-862`). `SpringSubscriber = (value, velocity) => void` (`:904`). **Every method/getter
   `useSpring.ts` touches exists at the resolved version.**

6. **W10's §3a triumvirate fear — "keyframes.js's solver does not expose a usable `tick(dt)` seam"
   — is a NON-CONCERN.** `AW.W10-blob-interaction.md:55-57` reserves a triumvirate halt if the
   frame-rate-independence assertion fails "because `keyframes.js`'s solver does not expose a usable
   `tick(dt)` seam (re-plan toward the SmoothDamp closed form...)." It DOES: `SpringProgress.tick(dt)`
   is declared (`keyframes.d.ts:809`, "Advance by `dt` seconds. Uses the analytic closed-form
   solution... so per-frame error is O(machine epsilon), not O(dt²) like Euler"), plus
   `tickToTime(t)` (`:816`). The class is frame-rate-independent BY CONSTRUCTION — the W10 60/120 Hz
   settle-equality sub-gate (`:111`) is satisfiable. NB: `useSpring.ts` does not call `tick(dt)`
   directly; it uses `play(noop)` + `subscribe` (`:122-136`), so W10 consumes the spring through the
   composable's managed-rAF surface — the `tick(dt)` seam is the engine's internal stepper that
   `play` drives. **The frame-rate-independent settle is engine-owned and real.**

7. **A forward repin (3.x/4.x) is SAFE for the spring seam — but UNNECESESARY for AW.** In keyframes
   4.0.0 (the local sibling repo dist, = npm latest) `SpringProgress` survives with identical
   `get value`/`get velocity`/`get settled`/`set target`/`subscribe`/`play`
   (`/Users/mkbabb/Programming/keyframes.js/dist/keyframes.d.ts:2202,2235-2296`); the only delta is
   the per-frame stepper was RENAMED `tick(dt)`→`tickDt(dt)` (`:2255`). Because `useSpring.ts` drives
   the engine via `play(onFrame)`+`subscribe` and never calls the stepper by name, **the rename is
   transparent** — W10 works on the currently-resolved 2.2.0 AND on a future 3.x/4.x repin. AW does
   NOT require a repin; the existing `^2.2.0 || ^3.0.0` pin resolving 2.2.0 is sufficient for every
   aurora+blob wave. (keyframes 4.0.0 is outside the current pin's `||` range — adopting it would be
   a separate, AW-independent peer-bump decision.)

### keyframes.js / value.js — the aurora W4/W7/W8 waves need NEITHER (VERIFIED value.js-FREE / keyframes-FREE)

8. **W4 (painterly) is explicitly value.js-FREE and keyframes-FREE.** `AW.W4-aurora-painterly.md:16`
   states: "value.js-FREE: every edit is a GLSL string literal; the OKLCh per-stroke jitter consumes
   the W5 in-shader OKLCh path (the `OKLCH_MATRICES_GLSL` chunk), not a runtime-JS color call."
   grep of W4 for keyframes/spring/easing/NumericAnimation returns only that value.js-FREE
   disclaimer line. **Zero supplier dependency.**

9. **W7 (WebGPU) needs no supplier runtime API — the WGSL color twin re-bakes glass-ui's OWN
   already-baked matrices.** grep of `AW.W7-aurora-webgpu.md` for keyframes/value/spring/easing
   returns NOTHING. W7.2 §3 (`:24`) twins `procedural-color.glsl.ts`'s OETF + Ottosson OKLCh
   matrices + FBM_ROT into WGSL "gated by a CPU-equivalence test." Those matrices are NOT a runtime
   value.js call — they are GLSL `mat3` literals already authored + 1e-6-verified in glass-ui's own
   `src/composables/glass/webgl/shaders/procedural-color.glsl.ts` (`OKLCH_MATRICES_GLSL` at line 73,
   the four Ottosson mat3s + space fns through line 134; the inline comment at `:83,91,115`
   documents they mirror value.js's `LMS_TO_OKLAB_MATRIX`/`OKLAB_TO_LMS_COEFF`/`oklabToLinearSRGB`).
   **W7 consumes a glass-ui-internal chunk; no new supplier API.**

10. **W8 (interactive) "easing out over ~1s" is a GLSL decay term, NOT a keyframes.js easing
    call; scroll coupling uses glass-ui's own composable.** `AW.W8-aurora-interactive.md:23,90`
    describe "a transient swirl-burst easing out over ~1s (a decaying `uCursorVelocity`-driven
    term)" — a GLSL shader decay, lands in `flow.glsl.ts`/`aurora.frag.ts` per the File Bounds
    (`:46-50`), not a `SpringProgress`/`NumericAnimation` instance. Scroll coupling (§3.3, `:24`)
    "binds palette/breath progress to scroll via the existing `useScrollProgress` motion composable
    (a glass-ui public composable — no new substrate)" — and `useScrollProgress.ts:2-4` imports only
    `vue` + a glass-ui-local `supportsCssTimeline`, no supplier. **Zero supplier dependency.**

### blob W9 / W11 supplier surface

11. **W9 (droplet) is pure GLSL — no supplier API.** `AW.W9-blob-droplet.md` File Bounds (`:64-71`)
    are all shaders + composables + types + the GLSL-port fixture; it splices glass-ui's own
    `procedural-color.glsl.ts` FBM_ROT (`:40`, "reuse the shared `FBM_ROT` rotation constant").
    grep confirms no keyframes/value/spring/easing reach. **Zero supplier dependency.**

12. **W11 (blob mood/iridescence/palette) reuses the value.js core via glass-ui's `/color` leaf —
    no new value.js API.** W11 Scope 3/4 (`AW.W11-blob-mood.md:34-49`) adds `deriveBlobPalette` +
    hoists `ColorHarmony` into `src/composables/color/`, which already imports the value.js Ottosson
    primitives (Finding 4). The iridescence IQ cosine palette + fake-SSS mix into OKLCh "before
    `gamutClampOklch`" (`:29,33`) is GLSL. W11's mood-spring expressiveness reads the W10 pointer
    state (which is the `useSpring`/`SpringProgress` seam of Finding 5), introducing no further
    supplier surface. **value.js core consumed via the existing leaf; no new API.**

## Wave-forming input

- **No supplier-side wave is needed before AW executes.** Both keyframes.js and value.js, at the
  versions glass-ui resolves (2.2.0 / 0.10.0), already export every API the AW aurora+blob waves
  cite. A wave-spec writer should NOT sequence a "bump keyframes" or "extend value.js" prerequisite
  in front of W5/W9/W10/W11. This is the headline edge: **AW aurora+blob has no upstream blocker.**
- **W10 sequencing edge (confirm, do not re-derive):** W10.a's only supplier touch is
  `src/composables/motion/useSpring.ts` (already shipped, wraps `SpringProgress`). The W10 gate
  `proof:blob-interaction-prm` 60/120 Hz settle-equality assertion is satisfiable on the resolved
  2.2.0 (Finding 6) — the gate sketch can assert `SpringProgress.tick(dt)`-driven determinism
  without a supplier change. Drop the §3a "keyframes lacks a usable `tick(dt)` seam" contingency
  branch as a dead path (it can stay as defensive prose, but it will not fire).
- **W5/W11 derive-color gate sketch:** the `proof:aurora-derive-gamut` + `proof:blob-color-equivalence`
  neon-seed gamut matrices assert in-sRGB after `gamutMapOKLab` — a value.js 0.10.0 function that
  exists and is the same one the AV.W2 1e-6 convergence already locked. No supplier-version guard
  needed in the gate; pin the gate to the resolved value.js, not the npm-latest 0.11.0.
- **Optional forward-repin note for a future wave (NOT this tranche):** if a later wave wants
  keyframes 4.0.0's surface, the spring seam survives intact (Finding 7) save the `tick`→`tickDt`
  rename, which `useSpring` is insulated from. That is an AW-independent peer-bump decision; flag it
  to the supplier-pin owner, do not fold it into an aurora/blob wave.

## Anti-findings (verified FINE / already done)

- **The blob `useSpring`/`SpringProgress` seam is NOT a phantom API.** The prompt named this as "the
  blob phantom `useSpringOrchestrator` class of defect." Verified: `useSpring.ts` consumes the real
  `SpringProgress` class, present in keyframes 2.2.0 with the exact `value`+`velocity` surface
  (Finding 5). There is no `useSpringOrchestrator` reference in any AW aurora/blob wave file (grep
  clean). The W10 reuse is correct and grounded.
- **`SpringProgress.tick(dt)` frame-rate independence exists** (Finding 6) — the W10 triumvirate
  fear is unfounded; no SmoothDamp re-plan will be needed.
- **value.js 0.10.0 carries the full Ottosson gamut surface** (`gamutMapOKLab`, `srgbToOKLab`,
  `findCusp`, `findGamutIntersection`, `computeMaxSaturation`, `interpolateHue`,
  `HueInterpolationMethod`, the OKLab/LMS matrices) — every W5/W11 color-derive need is met without
  touching value.js (Findings 3-4). The aurora `color.ts` already imports exactly these today.
- **The W5 `OKLCH_MATRICES_GLSL` "zero new payload" claim is true** — the chunk is authored +
  1e-6-mirrored from value.js in glass-ui's `procedural-color.glsl.ts:73-134`; W5/W7 splice it, no
  supplier round-trip (Findings 9, and the chunk's own value.js-mirror comments).
- **Aurora W4/W7/W8 are correctly self-described as value.js-FREE / keyframes-FREE** (Findings 8-10)
  — no over-claimed supplier dependency to walk back.

## Summary

- Verdict: every AW aurora (W4-8) + blob (W9-11) supplier dependency is REAL at the resolved
  versions (keyframes 2.2.0, value.js 0.10.0); ZERO phantom APIs; NO supplier-side wave needed first.
- glass-ui resolves keyframes 2.2.0 (pin `^2.2.0||^3.0.0`) and value.js 0.10.0 (pin `^0.10.0`),
  NOT the npm-latest 4.0.0 / 0.11.0 — all claims verified against the resolved d.ts.
- W10 blob soft-body: `useSpring.ts` wraps the REAL `SpringProgress` (keyframes.d.ts:776) with the
  exact `value`/`velocity`/`tick(dt)`/`subscribe`/`play` surface; the "no usable tick(dt) seam"
  triumvirate fear is a non-concern (`tick(dt)` is analytic, frame-rate-independent).
- W5/W11 derive-color: value.js 0.10.0 exports every cited Ottosson fn (`gamutMapOKLab`,
  `srgbToOKLab`, `rawOklabToOklch`, `interpolateHue`, `HueInterpolationMethod`); aurora `color.ts`
  already imports them; the W5/W11 extensions are glass-ui-local over that surface — no new API.
- Aurora W4/W7/W8 need NEITHER supplier: W4 is value.js-FREE (GLSL literals), W7 re-bakes
  glass-ui's OWN already-1e-6-verified `OKLCH_MATRICES_GLSL` chunk into WGSL, W8's "easing" is a
  GLSL decay term + glass-ui's own `useScrollProgress`. Blob W9 is pure GLSL.
- A forward repin to keyframes 3.x/4.x is SAFE for the spring seam (only `tick`→`tickDt` renamed,
  insulated by `useSpring`'s `play`/`subscribe` usage) but UNNECESSARY for AW — flag as a separate
  peer-bump decision, not an aurora/blob prerequisite.

Digest path: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/constellation/keyframes-valuejs-supplier-matrix.md
