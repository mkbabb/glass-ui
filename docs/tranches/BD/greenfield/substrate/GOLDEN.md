# Substrate (GPU base) — GOLDEN reference

> The shared canvas lifecycle EVERY procedural viz mounts on — `createGpuSubstrate` /
> `createWebGPUCanvas` / `createWebGLCanvas` / `webgpuDevice` / `createCanvasLifecycle`,
> the WebGPU→WebGL2 fall, the DPR sizing, the offscreen-park + PRM-freeze.
>
> **VERDICT (all three lenses converge): this is the most-hardened code in the repo. The
> golden is NOT a rebuild — it is ONE inversion + FIVE thin unions on the shipped seams.
> Survival of the fittest: keep the spine byte-for-byte, REFINE the one leaked contract
> (sizing), RE-INVENT only the one absent register (the reveal MOMENT).**

---

## 0. SOURCE-VERIFIED (grepped + read in full, not cited from memory)

| Symbol | File | State |
|---|---|---|
| `createCanvasLifecycle`, `N_RESTORE_STORM=3`/`T=2000`/`DEBOUNCE=100` | `src/composables/glass/webgl/createCanvasLifecycle.ts` | the agnostic core — suspend-Set, demand-gate, CV-park, PRM re-monitor, circuit-breaker. **FIT.** |
| `createWebGLCanvas`, `probeWebGL2Renderer`, `canvasCanHostWebGL2` | `src/composables/glass/webgl/useWebGLCanvas.ts` | WebGL2 backend + the per-backend `ResizeObserver` (built INSIDE `buildContext`). **FIT, one RO-placement refine.** |
| `createWebGPUCanvas`, `WEBGPU_ACQUIRE_TIMEOUT_MS=6000`, `acquireSharedDevice` | `src/composables/glass/webgpu/useWebGPUCanvas.ts` | async prelude + shared-device warm + validation-probe gate. **FIT.** |
| `WebGPUInitError`, `isSoftwareWebGPUAdapter` | `src/composables/glass/webgpu/webgpuDevice.ts` | typed init-failure leaf. **FIT.** |
| `createGpuSubstrate`, `freshCanvasForFallback`, `GpuBackend` | `src/composables/glass/webgpu/useGpuSubstrate.ts` | the try-WebGPU-then-rebuild-WebGL2 picker + clone-only-when-poisoned. **FIT.** |
| `useIntersectionPause`, `PausableRuntime` | `src/composables/motion/useIntersectionPause.ts` | the IO `off-screen-io` park driver. **FIT.** |

The prompt's `useGpuSubstrate` / `useWebGPUCanvas` names map to the imperative factories
`createGpuSubstrate` / `createWebGPUCanvas` (there is no `use*`-named hook — the doc honours
the real exports). `preserveDrawingBuffer:false` is set in **all** live consumers; π-gates
read via the compositor (`locator.screenshot()`), never `getImageData` — confirmed.

### THE LIVE WOUND, REPRODUCED + ROOT-CAUSED (the keystone finding all three lenses share)

The sizing contract is **scattered across N hand-written consumer `resize()` closures**, each
re-deriving DPR + the un-laid-out-box fallback independently — and they have **DRIFTED into
three mutually-incompatible conventions**, proven by grep:

| Consumer | un-laid-out fallback | verdict |
|---|---|---|
| `aurora/runtime.ts:283` | `getBoundingClientRect()` → **ancestor `parentRect` walk** → `1` (never 300×150) + a rAF-chained double-resize first-paint defense | **CORRECT — the gold standard.** |
| `goo-blob/useMetaballRenderer.ts:306` | `canvas.clientWidth \|\| config.geometry.canvasSize` | **BROKEN** — `clientWidth===0` under a content-skip → freezes at the `canvasSize` constant, masking the bug |
| `concentric/{GL,WGPU}Setup.ts:104` | `canvas.clientWidth \|\| 320` | **BROKEN** — same class, a different magic constant |

So: ONE viz (aurora) carries the proven sizer; the others carry broken copies with `clientWidth`
(which is `0` for a `content-visibility:auto`-skipped subtree — exactly the born-skipped trap)
and a per-consumer magic-constant floor. The live `300×150` aurora stuck-canvas (lens A/C) +
the ≤6s blurry-flash (lens B) + the born-skipped 2nd-canvas-forever (lens C) are all the SAME
root cause: **sizing is delegated N times, coupled to context-acquisition, and has drifted.**

**The golden closes this by promoting aurora's proven sizer to the leaf, running it
synchronously at mount (decoupled from the GPU acquire) on an engine-agnostic ResizeObserver,
and DELETING the N copies — DRY, no-legacy, no parallel path.**

---

## 1. WHAT A SUBSTRATE OWES EVERY VIZ (first principles — the contract)

A procedural-viz substrate has exactly ONE job: hand the consumer a **correctly-sized,
live-or-cleanly-parked drawing surface on whichever engine the platform affords, that ENTERS
with grace** — and get out of the way of the shader. Six guarantees the consumer must be able
to assume WITHOUT re-implementing any:

1. **SIZE** — backing == `box × DPR`, on mount/resize/reveal/resume, never the 300×150 default,
   never coupled to whether/when a GPU device lands. **ONE implementation.** *(today: leaked, drifted — FIX)*
2. **ENGINE** — WebGPU where truly afforded, an invisible WebGL2 fall everywhere else, no hang,
   no flash, no per-frame flood. *(today: FIT — KEEP)*
3. **PARK** — zero rAF + zero GPU work while hidden (tab / offscreen / content-skipped), resumed
   velocity-clean. *(today: FIT — KEEP, one wiring-uniformity refine)*
4. **FREEZE** — one static frame then park under `prefers-reduced-motion: reduce`, live-re-monitored.
   *(today: FIT — KEEP)*
5. **READBACK** — a declared, non-tainting path so a π-gate reads real pixels. *(today: implicit
   compositor contract — DOCUMENT + one capture-mode auto-flip)*
6. **ENTER** — the first paint / scroll-reveal / un-park is the ONE moment the invisible substrate
   is *perceptible*; it must carry FLOW & PUNCH, not a silent mechanical `canvas.width=` pop.
   *(today: ABSENT — RE-INVENT, the bold move)*

Today #2/#3/#4 are fit. #1 and #5 leak; #6 is missing. The golden closes #1 (the inversion),
formalizes #3/#5, and adds #6 — all DEFT unions on the shipped seams.

---

## 2. THE GOLDEN MECHANISM — "the substrate SIZES, the shader PAINTS, the surface ENTERS"

ONE inversion + five thin unions. No new module. No parallel path. The whole change lands in the
three lifecycle files + a one-line consumer shrink per viz.

### G1 — `sizeBacking()`: the ONE canonical backing-store sizer (the inversion) · BLOCKING

Lift aurora's PROVEN gBCR-ancestor sizer into `createCanvasLifecycle.ts` (the agnostic leaf — it
already owns the schedule; sizing belongs beside it). The body is aurora's verbatim logic
promoted, not re-invented:

```ts
// createCanvasLifecycle.ts — the ONE backing-store sizer. The gBCR-ancestor fallback +
// the DPR clamp + the NEVER-300×150 floor live HERE once, not in N drifted consumers.
export interface BackingSize { w: number; h: number; dpr: number; changed: boolean; }

export function sizeBacking(
    canvas: HTMLCanvasElement,
    dprPolicy: number | ((box: { w: number; h: number }) => number),
): BackingSize {
    // Measure the LAID-OUT border-box via getBoundingClientRect (NOT clientWidth — it is
    // 0 under a content-visibility:auto skip, the born-skipped trap). Walk ancestors only
    // when our own rect is still zero (truly un-laid-out) — NEVER the 300×150 HTML default,
    // NEVER a per-consumer magic constant.
    const rect = canvas.getBoundingClientRect();
    let cw = rect.width, ch = rect.height;
    let el = canvas.parentElement;
    while ((cw === 0 || ch === 0) && el) {
        const pr = el.getBoundingClientRect();
        cw = cw || pr.width; ch = ch || pr.height; el = el.parentElement;
    }
    const box = { w: Math.max(1, cw), h: Math.max(1, ch) };
    const dpr = Math.max(1, typeof dprPolicy === "function" ? dprPolicy(box) : dprPolicy);
    const w = Math.max(1, Math.round(box.w * dpr));
    const h = Math.max(1, Math.round(box.h * dpr));
    const changed = canvas.width !== w || canvas.height !== h;
    if (changed) { canvas.width = w; canvas.height = h; }  // idempotent: no realloc when unchanged
    return { w, h, dpr, changed };
}
```

**The consumer contract shrinks.** `CanvasFrameHooks.resize` stays the seam name (no churn at the
leaf's call-sites) but its BODY becomes "upload these dims to my viewport/uniforms" — the
consumer no longer measures. The DPR *policy* (aurora's 1.5× wash ceiling vs blob's 2× focal
`resolveBudgetDpr`) stays the consumer's, passed as the `dprPolicy` arg; the *measurement +
the floor* is the leaf's, ONE implementation. Each consumer `resize()` collapses from a
15-line gBCR/DPR/constant-fallback block to:

```ts
// goo-blob, after: the substrate already sized the backing; just upload + viewport.
resize: (s) => { gl.viewport(0, 0, s.w, s.h); uploadResolution(s.w, s.h); }
// concentric WGSL, after: nothing but the aspect upload (the swap chain auto-tracks the backing).
resize: (s) => uploadAspect(s.w / s.h);
```

The leaf passes the freshly-computed `BackingSize` to the consumer's `resize`, so a consumer
can NEVER re-derive a wrong size. **PRUNE: the `clientWidth || canvasSize` and `clientWidth || 320`
blocks in goo-blob/concentric/dot-matrix/dot-flow/fourier/paper-grid/constellation — absorbed,
no legacy.** Aurora's stuck-canvas is structurally impossible after this.

### G2 — size SYNCHRONOUSLY at mount, before the async device acquire (the perf win) · BLOCKING

The backing store is a CSS-geometry concern — zero dependency on which GPU API is live. Today it
is smuggled inside each backend's `buildContext`, which on the WebGPU path does not run until the
device resolves (live-measured cold acquire **5562ms** — lens C — vs the 6000ms ceiling, a
coin-flip margin). So a slow-but-healthy cold acquire = up-to-6s of a 300×150 blurry flash.

**The fix (lens B's boldest move, made concrete): move the `ResizeObserver` UP into the agnostic
leaf, wired at `arm()` BEFORE the async device acquire, and run `sizeBacking` once synchronously
the instant the canvas has a box.** The leaf owns the RO (it observes `canvas`, engine-agnostic) +
calls back the consumer's `resize(size)` only to upload — so:

- **frame 0 of the mount has a `1536×1536` sharp buffer** even though no device exists yet.
- the device resolves invisibly behind a correctly-sized, transparent (or rest-frame-painted, G6)
  surface — the page's colorful field (§3) shows through, never a blur.
- the **6000ms acquire-timeout becomes a pure correctness net** (falls to WebGL2 on a true wedge)
  with NO perceptual cost even when slow. The ceiling stays 6000ms — it is now cosmetic.

This also closes the **born-skipped 2nd-canvas-forever** trap (lens C): the RO lives at `arm()`,
the CV reveal + IO reveal + resume all route through the SAME `sizeBacking`, four call-sites, one
sizer, zero drift. (The leaf's existing CV-reveal re-measure at `createCanvasLifecycle.ts:241`
already runs unconditionally; it now runs `sizeBacking` instead of a consumer closure.)

> **Born-skipped CV-host fix (lens C H3, folded in):** the CV listener today binds to
> `canvas.parentElement` only (`bindContentVisibility`), but the `content-visibility:auto` is
> often on a HIGHER ancestor — the event fires on the wrong element, the 2nd canvas never
> re-measures. **Walk up to the nearest `content-visibility:auto` ancestor and bind there**, with
> the IO-reveal (G3) as belt-and-braces. This is the AX.W16 two-detector discipline (already
> embraced for park) extended to reveal.

### G3 — the substrate composes BOTH park detectors itself (DRY uniformity) · REFINE

Today it is inconsistent which viz wire the IO fallback: aurora/goo-blob/goo-dot call
`useIntersectionPause`; `useConcentric`/`useFourierField`/`useDotFlowField` rely ONLY on
content-visibility — so on a host where the viz host lacks `content-visibility:auto` they never
park off-screen. **`createGpuSubstrate` composes `useIntersectionPause(canvas.parentElement, …)`
internally** writing the distinct `"off-screen-io"` reason key (the one-writer-per-reason
invariant holds), so EVERY consumer inherits the IO-park ORed with CV — no per-viz wiring, no
forgotten viz. **RETIRES the per-consumer `useIntersectionPause` calls (DRY, no dual path).** The
IO `isIntersecting→true` ALSO triggers a `sizeBacking` re-measure (the reveal belt-and-braces).

### G4 — `captureFrame()`: the declared non-tainting readback seam · REFINE

The "all-zero readback" the dot-flow delta found is **NOT a substrate defect** — it is the
correct behaviour of `getImageData`/`readPixels` on a `preserveDrawingBuffer:false` buffer in
BOTH engines; live π-gates correctly use the compositor `screenshot()`. The golden makes the
contract first-class instead of folklore:

```ts
// GpuSubstrateHandle gains:
captureFrame(timeSec: number): Promise<ImageData | null>;
```

In `mode:"capture"` it **auto-flips `preserveDrawingBuffer:true`** at context creation (the only
time it is free — lens C H4's one-line `OR-in`), `renderAt(timeSec)`, then
`readPixels`/`copyTextureToBuffer`. For a LIVE context it does a same-rAF-turn read (read in the
same task the frame painted, before the compositor clears — the documented WebGL contract). No
taint (same-origin), no live-path cost (live stays `false`). π-gates call `captureFrame` instead
of `screenshot()` + pngjs where an exact-pixel read is needed; the all-zero readback is
structurally closed. **DOCUMENT in the substrate header: live π reads via the compositor; the
all-zero `readPixels` is a feature, not a bug; capture-mode is the in-page read.**

### G5 — `priority: "focal" | "preview"` + context-release-when-long-parked (the N-canvas budget) · REFINE

A substrates page mounts the live stage canvas PLUS N preview-thumbnail canvases, each counting
against the ~8-per-page context cap (tighter on WebKit). Two formalizations of the economy the
prior fix half-addressed, both reusing shipped seams:

- **`priority` option:** `"preview"` canvases (a) cap DPR at 1× regardless of policy, (b) bake one
  frame then park (the thumbnail pattern), (c) share the ONE WebGPU device (already true via
  `acquireSharedDevice`). Keeps a substrates grid at 60fps.
- **Release the context of a viz parked beyond a grace window** (e.g. 10s off-screen): the leaf's
  `teardown` already wires `WEBGL_lose_context`; the reveal re-build (`buildContext` on reveal)
  re-acquires against the warm shared device (instant). Reuses teardown + reveal-rebuild, gated on
  a timer — makes N-viz pages cap-safe on WebKit's tighter budget. *(Lens B §4.2; lower priority
  than G1/G2 — ship behind the size-unify.)*

### G6 — the REVEAL CHOREOGRAPHY (the bold RE-INVENT — guarantee #6) · the signature move

The substrate paints no pixels of its own, so its cartoon-technicolor duty is the ONE moment it
is perceptible: the **entrance** — cold first-paint, scroll-reveal from content-skip, or un-park.
Today that is a silent mechanical `canvas.width=` pop (worse: blank-then-pop on a slow acquire) —
the antithesis of the 1940s register. The golden gives the substrate a **bloom-in** at those
EXACT shipped seams (`arm()` first-paint / CV+IO reveal / `resume()` un-park):

- a `.substrate-reveal` recipe + a `--substrate-reveal-t` per-canvas scalar the leaf toggles —
  a compositor-only `transform: scale()` squish-grow on the **shipped** `--ease-cartoon-punch`
  (anticipate-dip → ~22% overshoot → settle) + `opacity` fade + the canvas's OWN
  `filter: blur()` settle (the `.glass-reveal` blur-settle — §L7-safe, NEVER `backdrop-filter`),
  depth scaled by the shipped `--motion-weight`.
- **volume-preserving squish** via `useLiquidFlex` (X·Y≈1, the T10 grace-calibrated ≈0.88
  anticipation depth) so the bloom reads as liquid weight, not a uniform zoom.
- a **ONE-SHOT transition** at the reveal seam — never a steady-state loop. The canvas's per-frame
  GL/WGSL paint is byte-untouched; the §L7 paint-cost fence is honoured.
- PRM → instant `opacity` fade, zero transform (the §L5 cascade via `--motion-weight: 0`).

This is DEFT, not a fork: the substrate already OWNS the arm/reveal/wake seams; the reveal is a
thin CSS-class toggle the leaf drives at them, reusing `--ease-cartoon-punch` + `--motion-weight`
+ `.glass-reveal`/`useLiquidFlex` — zero new scheduler, zero new observer. It transforms the
substrate's ugliest live moment (blank → hard 300×150 pop) into its most ALIVE one: a viz field
that **anticipates, squishes up past full, and settles with real weight** — the §3 colorful field
arriving with FLOW & PUNCH. *(Spike: §6 de-risks the squish curve + Safari parity.)*

---

## 3. CROSS-ENGINE PLAN — perfect in Chrome AND Safari

| Concern | Contract | Chrome | Safari/WebKit |
|---|---|---|---|
| WebGPU primary | June-2026 Baseline (Safari 26+/Metal); shared-device warm pays cold acquire ONCE | acquires `apple/metal-3` | acquires where present; the `acquire-timeout`→WebGL2 net fires SILENTLY where `requestDevice` hangs (virtualized-Metal/SwiftShader) — live-confirmed clean console |
| WebGL2 fall | clone-only-when-poisoned; typed `WebGPUInitError`; no flash-of-error | net on `false` poison probe | TIGHTER context cap — the G5 release-when-parked + the N=3/T=2000 circuit-breaker are the kill for the "rapidly FLASHES" report |
| `sizeBacking` (G1/G2) | pure CSS-geometry + DPR; no engine dependency | identical | identical (gBCR works across a CV skip in both) |
| readback (G4) | live = compositor `screenshot()`; capture = auto-`preserveDrawingBuffer` in-page read | all-zero `readPixels` on live is correct | all-zero `readPixels` on live is correct (avoids WebKit's always-allocated readback buffer) |
| reveal bloom (G6) | transform/opacity/own-`filter` ONLY — never `backdrop-filter:url` | compositor-cheap | **byte-identical** (the §L7-safe channel set); the acceptance is a PAIRED-engine π frame-series, never single-engine |
| meatball/goo compositing | a COMPONENT concern (dock-fission/goo-morph), NOT the substrate's — but the substrate GUARANTEES its canvas is `pointer-events:none` + composites cleanly UNDER the static SVG `filter:url()` metaball | — | the substrate is the §L7-arm HOME the viz inherits (parked-when-hidden GPU surface, no per-frame paint-bound CSS) |

The substrate's iOS-27 duty is **negative and absolute**: never let the field behind the glass be
broken, gray, blank, or stuck. The §3 colorful-field-behind-glass + the BA.W-NO-GRAY warm floor
are only as real as the substrate's guarantee that the aurora/blob/dot-flow field is PAINTING at
full resolution in both modes and both engines. The stuck 300×150 aurora canvas IS an iOS-27
fidelity failure (the colorful field at 1/15th resolution behind the hero glass) — G1+G2 make
full-res-from-frame-0 mechanically guaranteed rather than per-consumer-hoped.

---

## 4. A11Y / PRM CARVE

- **FREEZE** (one static frame then park under `reduce`, live `matchMedia` re-monitor) is the
  substrate's PRM contract and is already correct — the golden routes its re-measure through
  `sizeBacking` and collapses the G6 reveal to an instant `opacity` fade (`--motion-weight: 0`,
  zero squish/overshoot/blur). WCAG 2.2.2 (pause) is satisfied by the park + the consumer pause
  seam; no auto-playing motion survives `reduce`.
- `prefers-reduced-transparency` does not touch the viz (a viz is a content field, not a
  transmissive glass layer); a consumer SHOULD fall to its static `auroraFallbackGround` mesh
  where one exists.
- the offscreen-park (G3, now uniform across all consumers) + the PRM-freeze are the suite floor
  the substrate threads through EVERY consumer.

---

## 5. ACCEPTANCE BAR + the born-RED GATE

**The gestalt bar (= the iOS-27 fidelity bar verbatim):** load every Band-A viz route, resize,
hide/show, toggle PRM, dark/light — **no stuck / blank / 300×150 canvas, no error flood, both
engines, the field always alive and full-res behind the glass, entering with the reveal bloom.**

**The born-RED π / readback gate** (`proof:substrate-golden`, RED on today's aurora):

| Clause | Assertion | Born-RED today because |
|---|---|---|
| A — SIZE | for each Band-A route: `canvas.width === round(boxW × dpr)` && `> 300` on mount(T0), resize, CV-reveal of a below-fold 2nd canvas, and resume — **never 300×150** | aurora #1 frozen 300×150 at T0; aurora #2 (below-fold) 300×150 forever |
| B — DECOUPLE | the backing is correct-sized BEFORE the WebGPU device resolves (sample within the cold-acquire window) | sizing rides `buildContext` → waits ≤6s on the device |
| C — FALL | a forced WebGL2 fall paints non-error, no `[Invalid RenderPipeline]` flood, console clean | (passes today — the assertion PINS it) |
| D — READBACK | `captureFrame()` returns NON-ZERO pixels on a fallen WebGL2 context | `getImageData` returns all-zero on the live `false` buffer |
| E — PARK | a viz with NO `content-visibility:auto` host parks off-screen via the substrate-composed IO detector (rAF count → 0) | `useConcentric` has no IO fallback wired |
| F — REVEAL | a PAIRED-engine (chromium+webkit) frame-series proves the entrance squishes (scale≠1 mid-flight, X·Y≈1) + fades + settles; PRM → instant fade, zero transform | no reveal choreography exists |

The gate uses `captureFrame` (D) + `getBoundingClientRect`/`canvas.width` probes (A/B/E) + the
paired-engine compositor π frame-series (F) — the live-verify DELTA-artefact discipline
(screenshot + paired-π, not a commit-message claim).

---

## 6. THE SPIKE (de-risks the boldest mechanism — G6 reveal + G1 sizer)

Built under `docs/tranches/BD/greenfield/substrate/golden/` (throwaway; greenfield dir, NOT
glass-ui src — the mechanism is provable standalone). It de-risks the two unproven moves:

1. **`sizeBacking` (G1) under a `content-visibility:auto` skip** — proves gBCR-ancestor sizing
   yields the real box where `clientWidth` reads 0 (the born-skipped trap), and is idempotent.
2. **the reveal bloom (G6) curve + Safari parity** — proves the compositor-only
   squish-grow-on-`--ease-cartoon-punch` reads as liquid weight (anticipate → overshoot → settle,
   volume-preserving), is §L7-safe (transform/opacity/own-filter only), and collapses to an
   instant fade under PRM.

`index.html` self-verifies in the browser (asserts A/B + renders the reveal for visual + paired-
engine capture). See the spike's own README for the run + the captured result.

---

## 7. DELTA-ASSAY → WAVE AMENDMENTS (the union path, no fork)

**KEEP byte-for-byte (fit — survival of the fittest):** the agnostic core (suspend-Set,
demand-gate, CV-park, PRM re-monitor), the three-reason park, the PRM freeze, the circuit-breaker
(`N_RESTORE_STORM`/`T`/`DEBOUNCE`), the shared-device warm + 6000ms timeout, the
clone-only-when-poisoned fall, `useIntersectionPause`, the validation-probe lying-adapter gate.

**REFINE / RE-INVENT — ONE wave `BD.W-SUBSTRATE-SIZE-UNIFY` (+ the reveal sibling):**

1. **G1 (BLOCKING)** — lift `sizeBacking()` into `createCanvasLifecycle.ts`; pass `BackingSize` to
   the consumer `resize`; DELETE the N drifted consumer measure-blocks. *Closes the live aurora
   stuck-canvas.*
2. **G2 (BLOCKING)** — move the `ResizeObserver` up into the leaf, wired at `arm()` before the
   async acquire; size synchronously at mount; bind CV to the nearest `content-visibility:auto`
   ancestor. *Closes the WGPU-not-acquired freeze + the ≤6s flash + the born-skipped trap.*
3. **G3** — `createGpuSubstrate` composes BOTH park detectors; retire the per-consumer
   `useIntersectionPause`. *DRY; every viz inherits the IO-park.*
4. **G4** — `captureFrame()` seam + auto-`preserveDrawingBuffer` in capture mode; document the
   compositor-read contract. *Reconciles the dot-flow readback as a contract gap, not a fall defect.*
5. **G5** — `priority:"focal"|"preview"` + context-release-when-long-parked. *Formalizes the
   N-canvas budget; cap-safe on WebKit.*
6. **G6 (`BD.W-SUBSTRATE-REVEAL-BLOOM`)** — the cartoon reveal choreography at the arm/reveal/wake
   seams. *The signature RE-INVENT; the substrate's one perceptible moment carries FLOW & PUNCH.*

**PRUNE:** the duplicated DPR/gBCR/`clientWidth||constant`/300×150 guard in every consumer
`resize()` (absorbed by G1); the per-consumer `useIntersectionPause` (absorbed by G3).

**CONVERGENCE: ~85%.** The substrate is the most-hardened code in the repo — schedule, park,
freeze, fall, device-warm, circuit-breaker all ship and are sound. The ONE genuine gap is the
leaked+drifted sizing contract (live-reproduced 300×150, three incompatible fallback conventions),
the one absent register is the reveal MOMENT, and both are thin UNIONS on the shipped seams — lift
one helper, move one observer, compose one detector, add one readback seam + one priority flag +
one reveal recipe. No rebuild. No parallel path. No legacy.
