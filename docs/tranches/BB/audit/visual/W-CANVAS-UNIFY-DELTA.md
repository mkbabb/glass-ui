# BB.W-CANVAS-UNIFY — DELTA

**The re-forked Canvas2D lifecycle collapsed back onto the single substrate leaf.**
`useCanvas2D` is now a THIN Canvas2D backend over the shared `createCanvasLifecycle`
core — the EXACT thin-wrapper-over-the-leaf shape `useWebGLCanvas` already had. The
AV.W1 two-copy class (re-forked at AW.W17) is undone; the lifecycle is single-source
across BOTH backends.

This is a STRUCTURAL wave (BA inv-4 binds VISUAL waves only): it changes ZERO paint —
the canvas backends render the same frames. The single behaviour delta is the F6
park-correctness FIX (the `off-screen-io` reason-key split), recorded below. The
binding truth is the device-free gates + the unchanged contract test + typecheck, not
a `proof:ba-gestalt` verdict.

## §0 RE-GROUND drift

- `useWebGLCanvas.ts` is **234 lines** at HEAD, not the spec's `198`. (The spec's
  `:103-198p` exemplar-sed range still lands on the `buildContext`/`createCanvasLifecycle`
  composition seam; the count drifted, the mechanism held.) The exemplar shape the
  wave transposes (a thin backend that threads `buildContext`/`resize` to the leaf,
  passing NO `bindContextEvents` for 2D) is exactly as the spec describes.
- `createCanvasLifecycle.ts` **267 lines** at HEAD — matches the spec. (Grew to **280**
  after the one symmetric reduced-motion arm refinement; see Scope-1 below.)
- `useCanvas2D.ts` **347 lines** — matches. The fork is total: HEAD imports nothing
  from the leaf (`createCanvasLifecycle` named ONLY in the `:344` alias-comment), and
  `detectCanvas2DSingleSource(HEAD)` returns `{composesLeaf:false, forkedMachinery:true}`
  with all four fork signals — confirming the fork still held at the authoring base.
- Every other anchor (the gate trap at `proof-constellation-substrate-single.mjs:66-103`,
  the api publication `src/api/index.ts:418-421`, the consumer set) re-grepped clean.

## (a) the `useCanvas2D.ts` line-count delta — the duplication drained

| file | HEAD | now | note |
|---|---|---|---|
| `useCanvas2D.ts` | 347 | 321 | the forked schedule machinery removed; the file now composes the leaf + carries ONLY the 2D backend + the Vue-ref wrapper (dense house-idiom seam docs keep the gross count modest, but the duplicated MACHINERY is gone — see below) |
| `createCanvasLifecycle.ts` | 267 | 280 | +13: the one symmetric reduced-motion arm refinement (Scope-1) + its comment |

The drained fork (live-code presence in the wrapper, HEAD → now):

| forked machinery | HEAD | now |
|---|---|---|
| suspend `Set<…>` + `isRunning` | present | **0** (lives in the leaf) |
| `tick` rAF loop + `requestAnimationFrame(tick)` | present | **0** (lives in the leaf) |
| `visibilitychange`/`document.hidden` tab-hidden owner | present | **0** (lives in the leaf) |
| `matchMedia("(prefers-reduced-motion: reduce)")` `change` re-monitor | present | **0** live (1 comment mention only) |
| `contentvisibilityautostatechange` CV-park | present | **0** live (2 comment mentions only) |
| `suspend`/`resume`/`wake`/`paintStatic`/`dispose` schedule logic | inline copy | delegated to the leaf |

What the wrapper keeps (the genuinely backend-specific 2D concerns + the Vue wrapper):
the 2D `getContext("2d")` acquisition + `setup(ctx)`, the dpr-clamped `ResizeObserver`
+ `setTransform` resize, the `IntersectionObserver` rootMargin fallback (now writing
`off-screen-io`), the `toValue` ref resolution, the `autoStart` deferred arm, and the
`getCurrentScope()`/`onScopeDispose(dispose)` wiring. It threads `buildContext`/`resize`
to the leaf and passes NO `bindContextEvents` (a 2D context cannot be lost the WebGL
way), exactly the `useWebGLCanvas` seam shape.

## Scope-1 — the time-base bridge + the ONE symmetric leaf refinement

- **The time base bridges through the EXISTING leaf seam — no leaf-seam widen.** The
  leaf computes `t = hooks.time(elapsed)` then calls `hooks.frame(t)`. The 2D backend
  returns `time: () => performance.now()` (raw ms) and `frame: (now) => render(ctx, now)`,
  so the consumer's `Canvas2DFrame.render(ctx, now)` receives `performance.now()` — its
  contract, byte-for-byte. The `time?`/`frame` hooks are exactly the seam designed for
  this; no `CanvasFrameHooks`/`CanvasLifecycleOptions` change.
- **The ONE symmetric leaf refinement (NOT a seam widen; a behaviour refinement the
  WebGL backend gets identically).** The leaf's `arm()` previously SCHEDULED a deferred
  `tick` even under reduced-motion (the first static frame painted one rAF later). The
  2D substrate's contract test asserts ONE static frame painted **synchronously at arm**
  under reduced-motion (`frames === 1`, `rafQueue.length === 0` immediately —
  `useCanvas2D.test.ts:162-176`). So `arm()` now paints the reduced-motion first frame
  synchronously (`if (reducedMotion) tick()` in-line; `tick` parks because
  `!reducedMotion` gates the reschedule). This is byte-behaviour-IDENTICAL for the WebGL
  backend (a static frame under `reduce` is a static frame either way; the WebGL contract
  test + the aurora PRM suite assert the interaction math, never the arm-tick timing) —
  proven by `tests/composables/glass/webgl/useWebGLCanvas.test.ts` + the aurora suite
  (74 tests) staying GREEN. This is the Triumvirate-sanctioned scope-1 outcome (a leaf
  refinement the WebGL backend is proven invariant under) — NOT a second fork, NOT a
  public-seam widen.

## (b) `proof:webgl-substrate-single` — born-RED → GREEN (the new Canvas2D clause)

The gate gained clause (e) — the Canvas2D lifecycle is ALSO single-source — built on a
pure exported detector `detectCanvas2DSingleSource(src)` (`{composesLeaf, forkedMachinery}`)
+ a leaf-owns-the-machinery cross-check + the self-test bite.

**BORN-RED (gate run vs the HEAD fork, exit code 1):**
```
  canvas2d composes : NO ✗
  canvas2d fork     : FORKED ✗ (a suspend `Set<…>` gating `isRunning`; a local `requestAnimationFrame(tick)` rAF loop; a `visibilitychange`/`document.hidden` tab-hidden owner; a `matchMedia` reduced-motion `change` re-monitor)
  canvas2d bite     : bites ✓
VIOLATIONS:
  ✗ useCanvas2D does NOT compose the shared createCanvasLifecycle core (import:false, call:false) …
  ✗ useCanvas2D re-forks the lifecycle machinery INLINE (… all four signals …) …
  status: FAIL
```

**GREEN (at close, exit code 0):**
```
  canvas2d composes : leaf ✓
  canvas2d fork     : none ✓
  canvas2d bite     : bites ✓
  status: PASS
```

**The self-test bite (anti-evasion, every run):** a synthetic wrapper that BOTH imports
the leaf AND re-inlines a `new Set<…>` + `requestAnimationFrame(tick)` loop is flagged
(`composesLeaf:true, forkedMachinery:true` → still a fork — a leaf-import fig-leaf over a
live duplicate does NOT pass); a synthetic genuine thin wrapper passes
(`composesLeaf:true, forkedMachinery:false`). W1+W2 jointly forbid the re-fork: dropping
the composition reds W1; re-inlining the loop reds W2.

## (c) `proof:constellation-substrate-single` — GREEN through the de-fork (the re-point)

The SUBSTRATE-EXISTS clause used to grep `useCanvas2D.ts` SOURCE for the inlined
machinery (`new Set<`/`contentvisibilityautostatechange`/`visibilitychange`+`document.hidden`/
`matchMedia`+`change`). Lifting the fork into the leaf would have RED'd every one of
those regexes. The re-point splits the asserts:

- **Wrapper-side (read the wrapper):** `exportsFactory`, `hasDispose`, and the NEW
  `composesLeaf` (imports + calls `createCanvasLifecycle`).
- **Machinery-presence (follow the composition into the leaf):** `hasSuspendSet`,
  `hasContentVisibility`, `hasTabHidden`, `hasReducedMotionReMonitor` resolve against
  `createCanvasLifecycle.ts` — gated on `reachable = composesLeaf && leafExists` (unreachable
  machinery — a severed import — is no machinery at all).

The clause INTENT ("the Canvas2D substrate carries the same machinery as useWebGLCanvas")
is unchanged; only the LOCATION read moved from the inlined fork to the shared leaf.

**GREEN at close (exit 0):** `SUBSTRATE-EXISTS yes ✓`, `PRNG-SINGLE-SOURCE yes ✓`,
`ANOMALY-IS-SKIN yes ✓`.

**The re-point is load-bearing (falsifiability probe):** severing the wrapper's
composition (drop the `createCanvasLifecycle` import + call) RE-REDS the gate with all
five SUBSTRATE violations (composes-NO + the four unreachable-machinery asserts) — proving
the re-point follows the composition rather than greening vacuously.

## (d) `proof:canvas2d-substrate` — the contract test UNCHANGED and GREEN

`tests/composables/glass/canvas2d/useCanvas2D.test.ts` is byte-UNCHANGED (`git diff` empty)
and all four `it()` blocks pass:
1. the suspend-Set 3-reason model (a tab-show cannot lift an off-screen suspension);
2. the `document.hidden` `visibilitychange` park;
3. reduced-motion paints ONE static frame then parks (the load-bearing synchronous
   contract the Scope-1 leaf refinement preserves — `frames === 1`, `rafQueue.length === 0`);
4. idempotent `dispose()` + `handle.ctx === null` after dispose.

`npm run typecheck` (vue-tsc, both configs) GREEN. `npm run verify-export-types` GREEN
(the `/canvas` subpath dts surface resolves; `Canvas2DSuspendReason` gained `off-screen-io`
— an ADDITIVE union widen, not a break: the existing keys are unchanged, a consumer
suspending/resuming by reason still uses the same keys, the new key is the IO fallback's
own written only by the substrate).

## (e) the F6-inherit record — the ONE behaviour change (a correctness FIX, captured)

HEAD's 2D fork collapsed BOTH offscreen detectors onto the single `"off-screen"` reason —
the `contentvisibilityautostatechange` CV-park AND the `IntersectionObserver` rootMargin
fallback both wrote `suspend("off-screen")`/`resume("off-screen")`. So an IO `resume`
could lift a legitimately-held CV `suspend` (the latent breach AX.W16 F6 closed on the
WebGL leaf by splitting the reason key, never reaching the 2D fork). The de-fork inherits
the fix for free: the leaf's `CanvasSuspendReason` already carries `"off-screen-io"`, so
the wrapper's IO binding now calls `suspend("off-screen-io")`/`resume("off-screen-io")`
(its OWN key, distinct from the CV path's `"off-screen"`), and the leaf's empty-Set
`isRunning()` ORs both correctly — the loop runs ONLY when BOTH detectors agree the
surface is visible. The CV path (now in the leaf) keeps `"off-screen"`. `off-screen-io`
went 0 → 6 mentions in the wrapper (the IO binding + the type union + the seam docs).

This is the ONE behaviour delta of the wave — a park-correctness FIX, not a no-op
refactor — and it is captured here, not silent.

## Named-successor seam (clean for Batch V)

The de-fork is a complete discharge: the lifecycle is single-source across both backends,
the gate locks it (W1+W2 + the self-test bite make a re-fork machine-detectable). The
booked `proof:gpu-substrate-single` (Batch V) is the superset that lands on this
post-de-fork shape — the seam is clean (ONE `createCanvasLifecycle` leaf, TWO thin
backends composing it, no inline schedule in either wrapper).
