# AT.W0b — A3: the `useWebGLCanvas` substrate + WebGL perf/INP SOTA lens

**Lens A3** — WebGL substrate + performance / INP state-of-the-art, hardening the
`useWebGLCanvas` contract the W2 transposition extracts. Augment/harden the prior
6-lens audit (L5 §1 the substrate transposition, L6 §4 the renderer-abstraction
question) + the W1 design slice (§2 `useWebGLCanvas`). Author analysis only; NO
src/ written.

Every claim is `file:line`-cited against glass-ui HEAD, the value.js reference
renderer, and the SOTA web sources cited inline. Findings are tagged **[WEB]**
(corroborated by a 2025/2026 source) or **[KNOWLEDGE]** (reasoned from the
Jan-2026 cutoff, web-unconfirmed).

---

## 0. Executive summary — the load-bearing findings

The prior audit DECIDED the substrate extraction (DEC-AT-1, W2) over L6's
"standalone" recommendation. This lens does NOT relitigate that — it accepts the
extraction and asks: **what is the SOTA-correct contract for the one
`useWebGLCanvas` aurora + goo-blob will both run on, and what is its perf budget
+ gate?** Six findings:

1. **The aurora runtime is ALREADY 90% of a SOTA demand-driven WebGL substrate.**
   Its `SuspendReason`-set model (`runtime.ts:57-61,210-227`), the
   park-at-steady-state `needsAnimation()` gate (`runtime.ts:507-521`), DPR-clamp
   (`runtime.ts:338`), and tab-visibility owner (`runtime.ts:235`) are the exact
   patterns the SOTA sources prescribe — and the metaball renderer is the WEAKER
   version of every one of them. The extraction's risk is REGRESSING aurora's
   demand-drive DOWN to the metaball's always-on RAF, not the reverse. The W2
   contract must keep aurora's hardened model as the floor.

2. **The metaball renderer has NO viewport-intersection pause — it is a
   continuous-RAF leak the moment it scrolls off-screen.** `useMetaballRenderer.ts`
   pauses only on tab-hidden (`:256`) + reduced-motion (`:251`), NEVER on
   off-screen. The full-canvas 4-octave FBM fragment shader
   (`metaball.frag.glsl:67-78`, run per-pixel every frame) keeps burning GPU +
   main-thread RAF while invisible. SOTA is unambiguous: pause off-screen via
   IntersectionObserver **[WEB]**. The substrate MUST fold the
   `"off-screen"` SuspendReason in at the harness level so BOTH consumers get it
   — exactly what `useAurora` already wires via `useIntersectionPause`
   (`useAurora.ts:246-253`). goo-blob inherits it for free; that is a headline
   value of the extraction.

3. **The substrate must be demand-driven by default, NOT always-on.** The
   metaball's unconditional `requestAnimationFrame(render)` (`:252`) is the
   anti-pattern; aurora's `needsAnimation()`-gated reschedule (`runtime.ts:533`)
   is the SOTA. But the metaball IS genuinely always-animating (mood/pointer/
   satellite/noise are live every frame) — so its `needsAnimation()` is honestly
   `true` while on-screen. The win is the OFF-SCREEN + tab-hidden + reduced-motion
   parks, not a steady-state park goo-blob can't reach. The contract: the harness
   owns the SuspendReason set; the consumer supplies a `needsAnimation()`
   predicate (aurora returns its steady-state check; goo-blob returns
   `!reducedMotion`).

4. **DPR clamp at 2 is right; ADD a frame-budget escape valve.** Both renderers
   clamp `Math.min(devicePixelRatio, 2)` (`runtime.ts:338`,
   `useMetaballRenderer.ts:149`) — SOTA-correct (4× DPR phones = 16× fragment
   cost, `min(2,dpr)` is the canonical clamp **[WEB]**). But neither has an
   adaptive-degradation path. For a BACKGROUND canvas the SOTA frame-budget move
   is a soft FPS cap / DPR step-down under sustained frame overrun. This lens
   proposes a `maxFps?` + optional `qualityScale` lever on the contract (see §5),
   gated by a perf budget, NOT a mandatory always-on cost.

5. **OffscreenCanvas + Worker is the WRONG move for these primitives — REJECT,
   name-forward.** SOTA is explicit: for SMALL background animations the worker
   overhead does not justify it, and the GPU is a shared finite resource either
   way **[WEB]**. goo-blob is a small hero-blob; aurora is a single
   full-screen quad. The main-thread cost is the FRAGMENT shader on the GPU +
   ~20 uniform uploads — neither is the JS main-thread blocker a worker relieves.
   OffscreenCanvas stays OFF the contract; named-forward as a future opt-in IF a
   consumer ever runs N simultaneous heavy blobs.

6. **`scheduler.postTask` is NOT the per-frame scheduler — it is the ARM-time +
   color-resolve-time lever.** RAF is correct for the per-frame draw (frame-
   aligned, paints before heavy logic) **[WEB]**. `postTask` does NOT replace
   the RAF loop. But it IS the right tool for (a) the deferred shader compile/link
   (today aurora uses `requestIdleCallback`, `useAurora.ts:79`) and (b) a
   background color-resolve warmup. This closes the `supportsPostTask`-with-zero-
   callers debt (AT.W6) by giving `usePrioritizedTask` its first real WebGL
   consumer. See §6.

---

## 1. The substrate the extraction starts from — aurora is the SOTA reference, not the metaball

The W1 slice (§2) frames `useWebGLCanvas` as a fresh extraction with an `onFrame`
callback. The architecturally-honest framing (L5 §1.3) is sharper: **aurora's
`runtime.ts` envelope IS the substrate already — generalize it, do not author a
new one.** A side-by-side of the two lifecycle models the extraction must
reconcile:

| Lifecycle concern | aurora `runtime.ts` (the hardened model) | metaball `useMetaballRenderer.ts` (the weaker model) | SOTA verdict |
|---|---|---|---|
| Suspend model | `Set<SuspendReason>` — 3 orthogonal reasons, resume-while-suspended structurally unreachable (`:57-61,210-227`; proven AP.W3) | 2 booleans `paused` + `tabHidden` (`:98-99`); a `pause()` that aliases tab-hidden | aurora wins — keep the set |
| Off-screen pause | YES — `"off-screen"` reason driven by `useIntersectionPause` (`useAurora.ts:246`) | **NONE** — never observes intersection | aurora wins; this is finding #2 |
| Steady-state park | YES — `needsAnimation()` parks RAF at rest (`:507-533`) | **NONE** — unconditional reschedule (`:252`) | aurora wins; finding #3 |
| Tab-hidden | runtime-level `visibilitychange` owner, ONE writer (`:235-241`) | `document.hidden` poll in `render()` + listener (`:164,256`) | aurora wins (cleaner ownership) |
| Reduced-motion | single-frame + re-draw on config change (`:195,525`) | single-frame + re-draw on color change (`:84,329-335`) | parity |
| DPR clamp | `Math.min(dpr, 2)` (`:338`) | `Math.min(dpr, 2)` (`:149`) | parity — both SOTA |
| Resize | `ResizeObserver` + double-rAF settle (`:349-355`) | `ResizeObserver` (`:265-268`) | aurora wins (race-hardened) |
| Context-loss | `WEBGL_lose_context` on dispose ONLY (`:566`) — NO restore handler | **full** lost+restored re-init (`:285-302`) | **metaball wins** — finding §4.3 |
| RAF-outruns-destroy | SuspendReason/isRunning gate (`:524`) | explicit null-canvas guard (`:189-194`) | aurora wins (structural vs ad-hoc) |

**The decisive reading:** on 8 of 9 lifecycle axes aurora is the stronger model.
The ONE axis the metaball is stronger — context-loss RESTORE recovery
(`:285-302`) — is a genuine gap in aurora the extraction should ABSORB (§4.3). So
`useWebGLCanvas` = aurora's envelope + the metaball's context-restore handler,
and the metaball renderer collapses to a `drawFrame`/`onFrame` + uniform-upload
leaf. This is the L5 §1.3 gestalt, sharpened by the lifecycle diff.

> **The extraction's true risk is a SILENT DOWNGRADE.** A naive `useWebGLCanvas`
> authored from the metaball's shape (always-on RAF, no off-screen pause, no
> steady-state park) and then bolted under aurora would REGRESS aurora's
> demand-drive. The W2 byte-parity gate (DEC-AT-1) catches a *pixel* regression
> but NOT a *scheduling* regression — aurora at rest draws the same pixels whether
> it parks RAF or burns 60fps. The W2 gate must therefore assert the SCHEDULING
> contract too (§7), not just pixel parity.

---

## 2. Finding #2 — the off-screen RAF leak (the headline perf gap the lift inherits)

### 2.1 The metaball burns GPU + main-thread while invisible

`useMetaballRenderer.ts` reschedules unconditionally:

```
// :251-253
if (!prefersReducedMotion) {
    rafId = requestAnimationFrame(render);
}
```

The only suspends are tab-hidden (`:164` `if (paused || tabHidden)`) and
reduced-motion. **Scrolling the blob off-screen pauses NOTHING.** The fragment
shader is a full-canvas 4-octave FBM value-noise field
(`metaball.frag.glsl:67-78`, `valueNoise` × `fbm` evaluated per-pixel every
frame) plus SDF metaball blends + per-pixel HSV→RGB. At `min(2,dpr)` on a
400×400 CSS blob that is ~640k fragments × FBM × 60fps, running invisibly. On a
long page with a hero blob far above the fold, this is pure waste.

### 2.2 SOTA: pause off-screen via IntersectionObserver

The SOTA sources are unanimous: **stop rendering to a canvas when it is outside
the viewport, via IntersectionObserver** **[WEB]** (MDN OffscreenCanvas /
the xterm.js pause-resume-on-intersection pattern; Growing-with-the-Web's
IntersectionObserver perf guide). xterm.js's exact recipe — pause/resume render
keyed on `intersectionRatio === 0` — is the canonical reference implementation.

glass-ui ALREADY OWNS this primitive: `useIntersectionPause`
(`composables/motion/useIntersectionPause.ts`) — a scope-aware
IntersectionObserver+visibility pause that calls `runtime.pause()`/`resume()`,
SSR-safe, already composed by `useAurora` (`useAurora.ts:246-253`) driving the
`"off-screen"` reason. The substrate doesn't need to invent this; it needs to
make it a FIRST-CLASS part of the `useWebGLCanvas` contract so goo-blob gets it
without re-wiring.

### 2.3 The contract: harness owns the SuspendReason set; the Vue wrapper wires intersection

The clean shape (mirroring how `useAurora` already splits it):

- `useWebGLCanvas` (the harness) owns the `SuspendReason` set + the
  `"tab-hidden"` visibilitychange owner + the RAF loop. It exposes
  `pause(reason)` / `resume(reason)`.
- The component's Vue wrapper (`GooBlob.vue`, `Aurora.vue`) composes
  `useIntersectionPause(canvasRef, { pause: () => h.pause("off-screen"),
  resume: () => h.resume("off-screen") }, { pauseWhenHidden: false })` — exactly
  `useAurora.ts:246-253`. `pauseWhenHidden:false` because the harness owns
  tab-hidden; one writer per reason (the AP.W3 alias-avoidance discipline).

This gives goo-blob the off-screen pause **for free** — the single largest perf
win of the extraction, and a concrete headline beyond "less code."

> **Demand-driven arm, too (not just pause).** `useAurora` does NOT just pause
> off-screen — it DEFERS the shader compile/link until the FIRST intersection
> (`useAurora.ts:256-277`), so an above-the-fold blob never compiles its shader
> while off-screen. goo-blob today compiles eagerly in `start()` (`:260-263`).
> The substrate should expose the same `deferred` arm strategy aurora has
> (`AuroraInitStrategy`, `runtime.ts:77`) so goo-blob can defer its compile past
> first paint + first intersection too. This is the INP-on-load win (§6.2).

---

## 3. Finding #3 — demand-driven by default; the `needsAnimation()` predicate is the seam

### 3.1 RAF is the right per-frame scheduler — do NOT swap it for postTask

The prompt asks whether the substrate should be RAF or `scheduler.postTask`. The
SOTA answer is **RAF for the per-frame draw, unambiguously** **[WEB]**: RAF
runs once per frame right before the browser renders — the scheduling gap nothing
else fills; `postTask` is for prioritizing NON-render work so paint lands first
(DebugBear; WICG scheduling-apis; Marsha Teo "the missing scheduling layer"). A
WebGL draw IS the render — it belongs on RAF. `postTask` for the draw would
decouple it from the frame boundary and HURT INP (presentation delay). Settled:
the loop stays RAF; `postTask` is the arm/warmup lever (§6).

### 3.2 The reschedule must be CONDITIONAL — aurora's model, generalized

aurora's loop only reschedules while motion is live:

```
// runtime.ts:533
raf = needsAnimation() ? requestAnimationFrame(tick) : 0;
```

`needsAnimation()` (`:507-521`) returns false under reduced-motion OR at
steady-state (all drift uniforms 0 AND cursor settled within ε). At rest the loop
PARKS (raf→0) and a `wake()` (`:546`) re-arms on demand. This is the SOTA
"don't perpetually re-rasterize a byte-identical frame" discipline. The metaball
has no equivalent — it always reschedules.

**The honest nuance for goo-blob:** goo-blob is genuinely always-animating while
visible — mood eases, pointer decays, satellites orbit, FBM noise advances with
`uTime`. Its `needsAnimation()` is `true` whenever on-screen + not-reduced-motion.
So goo-blob does NOT get a steady-state park (it has no steady state) — but it
DOES get the off-screen + tab-hidden + reduced-motion parks via the SuspendReason
set. The contract should NOT force a steady-state park on every consumer; it
should accept a `needsAnimation` predicate:

```ts
// shape only — authored in W2
interface UseWebGLCanvasOptions {
    // ...
    /** Per-frame: should the loop reschedule? Park RAF when false.
     *  aurora → its steady-state check; goo-blob → () => !reducedMotion. */
    needsAnimation?: () => boolean;   // default () => true (always-animate)
}
```

aurora passes its steady-state predicate; goo-blob passes `() => !reducedMotion`
(park only when reduced-motion forces single-frame). Both inherit off-screen +
tab-hidden parking from the harness's SuspendReason set unconditionally.

---

## 4. The per-axis SOTA hardening of the contract

### 4.1 DPR clamp — keep `min(2, dpr)`, expose as a constant

Both renderers hard-code `Math.min(window.devicePixelRatio || 1, 2)`. SOTA: this
is THE canonical clamp — "drawing 16× the pixels is up to 16× slower; clamp
`dpr = Math.min(2, devicePixelRatio)`" **[WEB]** (web.dev High-DPI Canvas;
WebGPU-fundamentals resizing; PlayCanvas DPR optimization). Keep it. The only
hardening: hoist the `2` to a named constant on the substrate (e.g.
`MAX_DEVICE_PIXEL_RATIO = 2`) so it is ONE knob, not two divergent literals — and
make it the floor of the optional `qualityScale` lever (§5). A consumer on a
constrained device could pass a lower clamp; the default stays 2.

### 4.2 prefers-reduced-motion — single static frame, NOT zero frames

SOTA for a CONTINUOUS WebGL background under reduced-motion: **render ONE static
frame, do not loop** **[WEB]** (the canonical georgedoescode WebGL-background
recipe: "if prefers-reduced-motion, run update+render once instead of 60fps";
web.dev/learn/accessibility/motion: provide a static alternative). Both renderers
already do this (aurora `:195,525,278`; metaball `:84,278,329`). KEEP — it is
SOTA-correct.

**One hardening the lens flags [WEB]:** WCAG 2.2.2 "Pause, Stop, Hide" applies
to persistent background motion that runs >5s — `prefers-reduced-motion` handles
the OS-preference case but a user without that preference set still has no
pause control (Pope Tech 2025; web.dev motion). For glass-ui's blobs this is
EDGE — they are decorative, sub-5s-loop-equivalent organic motion, and the
reduced-motion static frame covers the accessibility floor. The lens RECORDS the
WCAG note but does NOT propose a mandatory in-canvas pause button (that is a
consumer-chrome concern, name-forward). The substrate already exposes
`pause()`/`resume()` so a consumer CAN wire a pause control if a compliance audit
demands it.

### 4.3 Context-loss recovery — ABSORB the metaball's restore handler into the substrate

This is the ONE axis the metaball is stronger (§1). aurora only `loseContext()`s
on dispose (`runtime.ts:566`) — it has NO `webglcontextrestored` handler, so an
aurora canvas that loses its context (GPU reset, tab backgrounding on mobile,
the ~8-context Chromium cap evicting it) goes permanently black until remount.
The metaball does it right:

```
// useMetaballRenderer.ts:285-302
function onContextLost(e) { e.preventDefault(); /* cancel RAF */ }
function onContextRestored() { if (initGL(canvas)) { /* re-arm */ } }
```

SOTA confirms this exact two-step: **`preventDefault()` on `webglcontextlost` to
signal self-recovery, then re-create ALL resources (textures, buffers, shaders,
programs, state) on `webglcontextrestored`** **[WEB]** (Khronos
HandlingContextLost wiki; MDN webglcontextrestored — updated Sept 2025;
mattdesl "Non-Intrusive WebGL"). The substrate's `arm()`/`initGL` is already the
"re-create all resources" function — so the restore handler is just
`arm()`-again. **The W2 extraction should fold context-restore into
`useWebGLCanvas` so AURORA GAINS it** (a real robustness upgrade aurora lacks
today) and goo-blob keeps it. This makes the extraction strictly additive on the
robustness axis, not a lateral move.

> Gate this: a unit asserting the substrate re-arms after a synthesized
> `webglcontextrestored` (the `WEBGL_lose_context` extension's
> `loseContext()`/`restoreContext()` is testable in happy-dom-with-a-GL-mock OR
> at least the handler wiring is unit-assertable). Tier-1 (handler attached +
> calls `arm`) is binding; the real GPU round-trip is a Playwright stretch.

### 4.4 The RAF-outruns-destroy race — the substrate's structural model subsumes both

The metaball carries an explicit null-canvas guard mid-`render()`
(`:189-194` — "cancelAnimationFrame does not stop a frame already dequeued").
aurora solves the same race structurally via the `isRunning()` gate at the top
of `tick()` (`:524`) + the disposed flag. The substrate should use aurora's
structural model (one `tick()` guard) and DROP the ad-hoc mid-frame null check —
cleaner, one mental model. The dispose path must `cancelAnimationFrame` + null
the canvas ref + `loseContext()` (aurora `:554-568` is the template).

---

## 5. The frame-budget lever (the prompt's "should it have a frame-budget?")

### 5.1 The case FOR a budget — background canvas under contention

SOTA frame-budget logic: smooth 60fps needs the whole frame's work inside
~10–16ms; for a canvas that is "a small part of a larger app" you need
SIGNIFICANTLY less so other widgets get their slice **[WEB]** (Scott Logic
OffscreenCanvas; Evil Martians "render within ~10ms frame budget"). A background
blob/aurora is exactly "a small part" — it should never be the reason an
interaction misses its paint.

Two levers SOTA offers for a background canvas:
1. **Soft FPS cap** — render at e.g. 30fps not 60 for a slow-drifting background,
   halving GPU + uniform-upload cost. The blob's organic motion reads fine at
   30fps (it is not a game). Recipe: a `maxFps` with a frame-time accumulator
   (skip the draw if `now - lastDraw < 1000/maxFps`, but still RAF-poll). This is
   the standard "FPS throttle to cap frames during non-interactive phases" canvas
   optimization **[WEB]** (MDN Optimizing canvas).
2. **Adaptive DPR step-down** — under sustained frame overrun, drop
   `qualityScale` (effective DPR) a notch. This is the "let the user/engine
   choose a resolution multiplier" pattern native games use **[WEB]** (web.dev
   High-DPI; PlayCanvas DPR). More complex; defer.

### 5.2 The contract proposal — `maxFps` opt-in, adaptive DPR named-forward

The lens proposes the substrate expose ONE budget lever now, the other
name-forward:

```ts
interface UseWebGLCanvasOptions {
    // ...
    /** Soft frame cap. Skip the draw (but keep RAF-polling) when the elapsed
     *  since last DRAWN frame < 1000/maxFps. Default undefined = uncapped
     *  (every RAF frame draws). 30 is a sensible background-canvas default a
     *  consumer can opt into. */
    maxFps?: number;
    /** Effective-DPR multiplier, clamped to [0.5, MAX_DEVICE_PIXEL_RATIO].
     *  Default 1 (= the min(2,dpr) clamp). A constrained consumer lowers it. */
    qualityScale?: number;   // STATIC for now; adaptive auto-step is name-forward
}
```

- `maxFps` is opt-in, default uncapped — so the extraction is byte-parity with
  aurora's current behaviour (aurora passes no `maxFps`, draws every frame). It
  is the consumer's lever for a slow background. Cheap (a timestamp compare),
  no always-on cost.
- `qualityScale` is STATIC in W2 (a manual quality knob). **Adaptive
  auto-step-down under sustained overrun is explicitly NAMED-FORWARD**, NOT built
  now — it needs a frame-time EWMA + hysteresis + a "did it actually help" probe,
  which is a wave of its own and risks the byte-parity gate (it changes pixels by
  design). Recorded as a future lever once a real heavy-blob consumer witnesses
  the need (no overfit: a budget auto-step with zero contended consumers is
  speculative substrate, J inv 10).

### 5.3 Why NOT make the budget mandatory

aurora's current draw-every-frame behaviour MUST be preserved byte-for-byte
(DEC-AT-1). A mandatory FPS cap would change aurora's motion cadence — a visible
regression the byte-parity gate would (correctly) FAIL. So the budget is a
per-consumer opt-in, default off, and aurora opts out (passes nothing). goo-blob
MAY opt into `maxFps: 30` if a capture confirms the organic motion holds — that
is a W4 visual-confirmation line-item, not a W2 default.

---

## 6. `scheduler.postTask` / `/motion-core` — the substrate is its first real consumer

### 6.1 The `supportsPostTask`-with-zero-callers debt this closes

`supportsPostTask()` (`utils/platformSupport.ts:23`) + the whole
`usePrioritizedTask`/`postTaskSafe` leaf (`usePrioritizedTask.ts`) exist with
NO production caller (AT.W6 folds this: "supportsPostTask with zero callers —
wire or drop"). The WebGL substrate is the natural first consumer — and SOTA
backs the two specific uses:

### 6.2 Use 1 — the deferred shader compile/link (the INP-on-load win)

The dominant SYNCHRONOUS WebGL cost is shader compile + GPU link — a long task on
the main thread that, if it lands during load, inflates INP/TBT. aurora already
defers it past first paint via `requestIdleCallback` + first-intersection
(`useAurora.ts:79-101,269`). SOTA: `scheduler.postTask({priority:'background'})`
is the more precise tool than `requestIdleCallback` for "run this after
input/paint" **[WEB]** (WICG scheduling-apis; DebugBear: "postTask guarantees
a frame in between, improving INP"). The substrate's deferred-arm path could
schedule the compile via `postTaskSafe(() => arm(), {priority:'background'})`
instead of (or alongside) `requestIdleCallback` — giving `usePrioritizedTask`
its first real caller AND a measurably-better INP-on-load story.

> Caveat [KNOWLEDGE]: `requestIdleCallback` has a `timeout` (aurora caps at
> 2000ms, `useAurora.ts:81`) that guarantees the arm runs even on a busy thread;
> `postTask({priority:'background'})` can starve under sustained high-priority
> work. The robust shape is `postTask('background')` with a `requestIdleCallback`
> `timeout` SAFETY net — or keep `requestIdleCallback` as the primary and use
> `postTask` only for the color-resolve warmup (§6.3), the lower-risk first
> caller. Recommend the latter for W2 (don't destabilize aurora's proven
> idle-arm), graduate the compile to postTask in a later wave once measured.

### 6.3 Use 2 — the color-resolve warmup (goo-blob's per-frame resolver)

The metaball memoises its per-frame `cssColorToRgb` (`:54-67`) because the canvas
`getImageData` probe is expensive. The AT lift REPLACES that with the injected
`ColorResolver` (W4 / DEC-AT-2) — `defaultBlobColorResolver` = `cssToOklch`→
`oklchToLinear`, a pure CPU OKLab path. That resolve is cheaper than the canvas
probe but still non-trivial (matrix math). For a blob cycling through N palette
colors, a `postTask('background')` WARMUP of the resolver cache (resolve the
known palette once, off the critical path) is a clean `usePrioritizedTask`
caller. This is OPTIONAL (the resolve is fast enough inline) but it is the
"cheaper-than-a-Worker INP win for main-thread-bound work" the `usePrioritizedTask`
header (`usePrioritizedTask.ts:1-7`) was written for. Recommend it as the
LOW-RISK first caller that closes the zero-callers debt without touching aurora.

### 6.4 What postTask is NOT for here

NOT the per-frame draw (RAF owns that, §3.1). NOT the uniform upload (must be
frame-synchronous). The per-frame hot path stays 100% RAF; postTask is strictly
the off-critical-path arm + warmup lever.

---

## 7. OffscreenCanvas + Worker — REJECT for AT, name-forward

The prompt asks: OffscreenCanvas? The SOTA answer for THESE primitives is no:

- **The cost is the GPU fragment shader + ~20 uniform uploads, not a JS
  main-thread block.** A worker relieves main-thread JS contention; it does NOT
  relieve GPU contention — "the GPU is a finite resource both worker and main
  window use; if the worker consumes all GPU the main window drops no matter
  where rendering happens" **[WEB]** (Scott Logic; gpuweb discussion #1705).
  goo-blob/aurora's bottleneck is the GPU, so a worker doesn't help.
- **For SMALL background animations the worker overhead does not justify it**
  **[WEB]** (the OffscreenCanvas worker tradeoff consensus). goo-blob is a
  single hero blob; aurora is one full-screen quad. This is exactly the
  "not worth it" regime.
- **It would shatter the substrate's reactive contract.** `useWebGLCanvas` lives
  in a Vue scope with reactive config/cursor/mood; transferring control to a
  worker (`transferControlToOffscreen()`) means serializing every uniform update
  across the worker boundary — a massive complexity tax for a primitive whose
  main-thread JS cost is already trivial.
- glass-ui has ZERO OffscreenCanvas usage today (`rg OffscreenCanvas src/ = 0`),
  so there is no existing pattern to extend.

**Verdict:** OffscreenCanvas is OFF the W2 contract. NAME-FORWARD: if a future
consumer renders N≥4 simultaneous heavy blobs (a particle field, a grid of live
previews) where the JS uniform-update + multiple-context main-thread cost
genuinely contends, an OffscreenCanvas+worker variant of the substrate is the
graduation move — gated on that witnessed consumer (≥2 distinct contexts, J inv
10). Recorded, not built.

---

## 8. The W2 substrate gate + the perf budget (the deliverable)

Augmenting the W1 §2 / L5 §7 W2 gate. The W2 gate must assert BOTH pixel parity
AND the scheduling contract (the silent-downgrade risk, §1):

### 8.1 Pixel parity (the existing DEC-AT-1 gate — keep)

- aurora `drawFrame` byte-identical to 3.2.0 (the AP.W3 commit `69d8202`
  discipline) — a captured-uniform-sequence equality OR CPU-readback hash over a
  fixed config + time sweep. `aurora/__tests__/` is the home (it already holds
  `color-equivalence.test.ts` — the equivalence-test pattern is established).
- `rg frostShader src/ = 0` (the orphan deletion, L5 §4.1).

### 8.2 Scheduling parity (NEW — this lens's addition)

A unit/integration spec asserting the substrate's lifecycle contract, so the
extraction cannot silently downgrade aurora's demand-drive:

| Assertion | Why | How (happy-dom-runnable) |
|---|---|---|
| Off-screen → RAF parks | finding #2 — goo-blob's headline win | mock IntersectionObserver → not-intersecting → assert `pause("off-screen")` called + no RAF scheduled |
| Tab-hidden → RAF parks | the SuspendReason model survives | dispatch `visibilitychange` w/ `document.hidden=true` → assert parked |
| reduced-motion → single frame | SOTA accessibility floor (§4.2) | `matchMedia` mock matches → assert exactly ONE `drawFrame`, no reschedule |
| Resume-while-suspended unreachable | the AP.W3 invariant survives extraction | `resume("tab-hidden")` while `"off-screen"` held → assert still parked |
| Steady-state parks (aurora only) | finding #3 — aurora keeps `needsAnimation` | aurora config w/ 0 drift + settled cursor → assert RAF→0 |
| context-restored re-arms | finding §4.3 — the absorbed robustness gain | synthesize `webglcontextrestored` → assert `arm`/`initGL` re-called |
| DPR clamp ≤ 2 | SOTA (§4.1) | set `devicePixelRatio=4` → assert canvas backing-store = cssSize×2 |

These are happy-dom-runnable (no real WebGL needed — they assert the
SCHEDULING/lifecycle wiring around the GL calls, mocking the context). The actual
pixel draw is the §8.1 byte-parity gate's job.

### 8.3 The perf budget (background-canvas posture, recorded)

A documented budget the substrate honors BY DEFAULT (not a CI-enforced number —
glass-ui has no WebGL perf harness; this is a design contract + a capture-time
sanity line):

- **Off-screen cost = 0 RAF, 0 GPU draw.** (finding #2 — the binding posture).
- **Tab-hidden cost = 0.** (already true both renderers).
- **Reduced-motion cost = 1 frame then 0.** (§4.2).
- **On-screen default = every-RAF draw at `min(2,dpr)`** (byte-parity with
  aurora). A consumer MAY opt into `maxFps`/`qualityScale` (§5) for a slow
  background; aurora opts out.
- **Arm cost OFF the first-paint critical path** (deferred compile via
  idle/postTask, §6.2) — the INP-on-load floor.
- **No OffscreenCanvas / no worker** (§7) — main-thread JS cost is the trivial
  uniform upload, kept frame-synchronous.

The capture-precept (L5 §5) visual evidence for W4/W5 should include a
PERFORMANCE line: a manual confirmation (DevTools Performance / the
`isIntersecting`-driven pause) that the blob's RAF stops when scrolled off-screen.
That is the one perf assertion no happy-dom unit can fully settle — the
P5-precedent (manual visual/perf confirmation) the prior audit already adopts.

---

## 9. Proposed AUGMENTED-AT changes (wave/slice + hard gate)

This lens does NOT add a wave — it HARDENS W2's contract + gate, closes the W6
`supportsPostTask` debt with a real caller, and records two name-forwards. Concrete:

### 9.1 AUGMENT W2 — the `useWebGLCanvas` contract (3 additions to the W1 §2 shape)

1. **Fold off-screen pause + deferred arm into the substrate's documented
   contract**, not just `useAurora`'s wrapper. The harness owns the
   `SuspendReason` set + tab-hidden + the RAF loop; the Vue wrappers
   (`GooBlob.vue`/`Aurora.vue`) each compose `useIntersectionPause` for
   `"off-screen"`. **goo-blob inherits the off-screen pause + the deferred
   compile aurora already has** — the headline perf win of the extraction
   (finding #2). *Gate:* the §8.2 off-screen-parks + deferred-arm scheduling
   assertions.
2. **Absorb the metaball's context-restore handler** so aurora GAINS
   `webglcontextrestored` recovery it lacks today (finding §4.3). *Gate:* the
   §8.2 context-restored re-arm assertion.
3. **Add a `needsAnimation?` predicate + opt-in `maxFps?`/`qualityScale?` budget
   levers** (default: always-animate, uncapped, scale 1 — byte-parity with
   aurora). aurora passes its steady-state predicate; goo-blob passes
   `() => !reducedMotion`. (findings #3, §5). *Gate:* the §8.2 steady-state-park
   (aurora) + DPR-clamp assertions; `maxFps`/`qualityScale` covered by a unit
   asserting a capped consumer skips draws below the interval.

### 9.2 AUGMENT the W2 gate — scheduling parity, not just pixel parity

Add the §8.2 scheduling-contract assertion table to the W2 hard gate (the
silent-downgrade risk, §1). The existing byte-parity gate (DEC-AT-1) catches a
pixel regression; the new table catches a SCHEDULING regression a pixel-hash is
blind to. *Hard gate:* W2 is green only when BOTH the byte-parity AND the
scheduling-parity specs pass.

### 9.3 AUGMENT W6 — give `supportsPostTask`/`usePrioritizedTask` its first caller

The W6 "wire-or-drop `supportsPostTask`" item gets a concrete WIRE target: the
color-resolve warmup (§6.3, low-risk) as the first `usePrioritizedTask` caller;
optionally graduate the deferred shader compile to `postTask('background')` with
an `requestIdleCallback`-timeout safety net (§6.2) in a later wave. *Hard gate:*
`usePrioritizedTask` has ≥1 production caller OR is dropped — the zero-callers
debt is closed either way.

### 9.4 NAME-FORWARD (recorded, NOT built — no overfit)

- **Adaptive auto-DPR-step-down under sustained frame overrun** (§5.2) — a
  frame-time-EWMA quality auto-step; gated on a witnessed heavy-blob/contended
  consumer (it changes pixels by design, can't share the byte-parity gate).
- **OffscreenCanvas + Worker substrate variant** (§7) — gated on a witnessed
  N≥4-simultaneous-heavy-blob consumer where main-thread JS genuinely contends;
  the GPU-is-shared SOTA caveat means it only pays when JS, not GPU, is the
  bottleneck.
- **WCAG 2.2.2 in-canvas pause control** (§4.2) — a consumer-chrome concern; the
  substrate already exposes `pause()`/`resume()` so a consumer CAN wire it; not a
  substrate default.

---

## 10. Sources

SOTA web sources (June 2026 access):

- DebugBear — *Improve Web Performance With requestAnimationFrame*
  <https://www.debugbear.com/blog/requestanimationframe>
- WICG — *scheduling-apis (scheduler.postTask / scheduler.yield)*
  <https://github.com/WICG/scheduling-apis>
- Marsha Teo — *requestAnimationFrame: The Missing Scheduling Layer*
  <https://www.marshateo.com/writing/requestAnimationFrame>
- MDN — *OffscreenCanvas*
  <https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas>
- Evil Martians — *Faster WebGL/Three.js graphics with OffscreenCanvas and Web Workers*
  <https://evilmartians.com/chronicles/faster-webgl-three-js-3d-graphics-with-offscreencanvas-and-web-workers>
- Scott Logic — *Rendering charts with OffscreenCanvas (the GPU-is-shared / 10ms-budget caveat)*
  <https://blog.scottlogic.com/2020/03/19/offscreen-canvas.html>
- Growing with the Web — *Using the Intersection Observer web API to improve performance*
  <https://www.growingwiththeweb.com/2018/01/intersection-observer.html>
- Khronos — *HandlingContextLost (WebGL Public Wiki)*
  <https://wikis.khronos.org/webgl/HandlingContextLost>
- MDN — *HTMLCanvasElement: webglcontextrestored event* (updated Sept 2025)
  <https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/webglcontextrestored_event>
- Matt DesLauriers — *Non-Intrusive WebGL. Part 1: Context Loss & Preloading*
  <https://medium.com/@mattdesl/non-intrusive-webgl-cebd176c281d>
- web.dev — *High DPI Canvas* <https://web.dev/articles/canvas-hidipi>
- WebGPU Fundamentals — *Resizing the Canvas (DPR clamp)*
  <https://webgpufundamentals.org/webgpu/lessons/webgpu-resizing-the-canvas.html>
- MDN — *Optimizing canvas (FPS throttle)*
  <https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas>
- georgedoescode (DEV) — *WebGL powered background animation (reduced-motion single-frame)*
  <https://dev.to/georgedoescode/create-a-generative-landing-page-webgl-powered-background-animation-3nl0>
- web.dev — *Accessibility: Animation and motion*
  <https://web.dev/learn/accessibility/motion>
- Pope Tech (2025) — *Design accessible animation and movement (WCAG 2.2.2)*
  <https://blog.pope.tech/2025/12/08/design-accessible-animation-and-movement/>

glass-ui / value.js corpus (read first-hand):
`aurora/composables/runtime.ts`, `aurora/composables/useAurora.ts`,
`composables/motion/useIntersectionPause.ts`, `composables/motion/useRAFLoop.ts`,
`composables/motion/usePrioritizedTask.ts`, `utils/platformSupport.ts`,
`composables/glass/useGlassRenderer.ts`,
`value.js/demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts`,
`value.js/.../goo-blob/shaders/metaball.frag.glsl`.
