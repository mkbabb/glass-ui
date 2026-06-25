# Substrate (GPU base) — Greenfield Brainstorm · LENS B (cross-engine / perf-first)

> The shared canvas lifecycle every Band-A viz mounts on: `useGpuSubstrate` /
> `createGpuSubstrate` / `useWebGPUCanvas` / `webgpuDevice` / `createCanvasLifecycle`
> + the WebGPU→WebGL2 fallback, the DPR sizing, the offscreen-pause + PRM-freeze.
> Lens: **flawless Chrome AND Safari + performance**. KISS, survival-of-the-fittest —
> VALIDATE + HARDEN the fit lifecycle, do NOT re-fork.

## 0. Verdict up front: this is FIT infra. Refine, never re-fork.

Source-verified (grep + read) — every cited symbol EXISTS and is sound:

- `createCanvasLifecycle.ts` — the backend-agnostic core: the three-reason suspend
  `Set` (`tab-hidden`/`off-screen`/`off-screen-io`/`manual`), the demand-gated rAF
  tick/wake, the `visibilitychange` owner, the `contentvisibilityautostatechange`
  offscreen-park **with the unconditional reveal re-measure**, the live-monitored PRM
  re-arm, and the **BC.W-SAFARI-WEBGL context-loss circuit-breaker** (N=3 in T=2000ms +
  the 100ms restore debounce). This is excellent. KEEP byte-for-byte.
- `useWebGLCanvas.ts` — the WebGL2 backend + `probeWebGL2Renderer` (single-bootstrap) +
  `canvasCanHostWebGL2` (the poison probe). Fit.
- `useWebGPUCanvas.ts` — the async-prelude wrapper + `acquireSharedDevice` (ONE device,
  N contexts — pays the cold acquire ONCE) + the `WEBGPU_ACQUIRE_TIMEOUT_MS = 6000` race
  + the `pushErrorScope`/probe-draw pipeline-validation gate (catches the lying
  software-Metal adapter). Fit.
- `webgpuDevice.ts` — `WebGPUInitError` (typed init-failure) + `isSoftwareWebGPUAdapter`.
  Fit.
- `useGpuSubstrate.ts` — the **try-WebGPU-then-rebuild-WebGL2** picker + the
  `freshCanvasForFallback` clone-ONLY-when-poisoned guard. Fit.
- `useIntersectionPause.ts` — the IO + `document.hidden` pause driver. Fit.

**The lifecycle's correctness machinery is the most-hardened part of the codebase.** The
prior tactical fix (the 9-viz 300×150 hang) landed real value: the acquire-timeout, the
clone-only-when-poisoned, the unconditional reveal re-measure. Nothing here should be
re-invented. The greenfield is a SURGICAL hardening of FOUR seams the live-assay still
catches — none of which require a parallel system.

## 1. THE LIVE-ASSAY (Chrome :5173, both routes, DPR2) — what I actually measured

I navigated `/substrates/aurora` + `/substrates/blob`, sampled the mount window vs after
settle, resized, checked console:

| Observation | Reading |
|---|---|
| **Mount window (T0): BOTH canvases `300×150` backing under a `768×768`/`563×563` CSS box** | The HTML default, CSS-upscaled → a multi-second **blurry/blank flash**. `underSized:true`. |
| **After ~3s settle: backing = `1536×1536` / `1126×1126` (= CSS×DPR2). `stuck300:false`** | The reveal/resize path **heals correctly** — the 300×150 is **transient**, not stuck. The prior fix works; the residue is the *latency to first correct size*. |
| Console: **clean** — no `[Invalid RenderPipeline]` flood, no `no GPU adapter` page-error | The validation gate + the silent fallback + the typed init-error all hold. |
| `parentCV: auto` on both viz hosts | The content-visibility offscreen-park is live + wired. |
| Resize 1000×760 → backing re-tracks on next settle | ResizeObserver path fit. |

**The single live defect: a ≤6s `300×150` blurry-flash window on every WebGPU-primary
viz mount.** Root cause (read-confirmed): backing-store SIZING is COUPLED to context
ACQUISITION. The WebGPU-primary consumers (`useConcentric`, `useDotFlowField`,
`useMetaballRenderer`, `useFourierField`) only call `resize()` from inside the leaf's
`buildContext()`, which runs **after** `armAsync()` awaits the cold `requestAdapter` →
`requestDevice` (live-measured ~3.5s cold; bounded at 6s). The WebGL-only path
(`useAurora`/`inst.arm()`) is synchronous so it sizes fast — which is exactly why the
WebGL canvas was *less* stuck than the WebGPU one in the assay. **Sizing must not wait on
the GPU.**

## 2. THE CORE IDEA — "size at mount, paint when ready": decouple the backing-store
##    lifecycle from the context lifecycle, with one shared sizing leaf.

The backing store is a CSS-geometry concern (`clientWidth × DPR`). It has **zero**
dependency on which GPU API (or whether any) is live. Today it's smuggled inside each
backend's `buildContext`. Greenfield: lift sizing into the **agnostic core**, run it
**synchronously at `createCanvasLifecycle` construction** (before any async prelude), and
re-run it on the existing resize/reveal triggers. The async device acquire then only
governs *whether we paint pixels into a correctly-sized buffer* — never the buffer's
dimensions.

Mechanism (KISS, ~one new function + one call-site move, no new module):

1. **`measureBacking(canvas, dpr)` — ONE sizing leaf in `createCanvasLifecycle`.**
   The `Math.round(clientWidth * dpr)` + the `if (canvas.width !== w)` idempotency guard
   currently duplicated across every `*Setup.ts` `resize()` collapses to one helper the
   core owns. The consumer still owns its **DPR policy** (it passes a `dpr()` getter —
   `resolveBudgetDpr` / `AV_AURORA_DPR_MAX` stay consumer-side); the core owns the
   *write*. This is the W-CANVAS-UNIFY DRY move the lifecycle already aspires to.
2. **Size at construction, before the async prelude.** `createGpuSubstrate` calls
   `lifecycle.measure()` (synchronous, no context) the moment the canvas ref resolves —
   so frame 0 of the mount has a `1536×1536` buffer even though no device exists yet. A
   `content-visibility:auto`-skipped subtree has `clientWidth===0`; the core's existing
   born-skipped reveal re-measure (the `onContentVisibilityAutoStateChange`
   unconditional `resize()`) covers that — now it covers a *sizing* concern that no
   longer also drags context-build behind it.
3. **`fallbackPaint` while acquiring (the no-blank-flash floor).** A correctly-sized but
   not-yet-painted canvas is *transparent*, not blurry — already a win (the page's
   colorful field shows through, per §3 glass-needs-a-field). For the focal viz (blob),
   the consumer MAY paint one cheap CSS/2D "rest frame" (a static warm-cream radial) into
   the sized buffer at construction so the mount reads as the calm reference plate from
   pixel 0, then the GPU loop takes over on arm. Opt-in, KISS, compositor-cheap.

**Why this is the perf-first win, not just a cosmetic one:** it removes the only
remaining place where the 6s WebGPU timeout is *user-visible*. Today a slow-but-healthy
cold acquire = up-to-6s of blur. After: the buffer is sharp + transparent at mount, the
device resolves invisibly behind it. The acquire-timeout becomes a pure correctness net
(falls to WebGL2 on a true wedge) with **no perceptual cost** even when it's slow.

## 3. SAFARI/WEBKIT — the cross-engine floor for the SUBSTRATE specifically

Two distinct Safari concerns, both addressed without a fork:

### 3a. The canvas substrate on WebKit
- **WebGPU on Safari 26+/Metal is Baseline** (the picker's June-2026 fact). Where it's
  present the WGSL primary runs; where `requestDevice` hangs on a virtualized-Metal/
  SwiftShader host the **acquire-timeout (6s) → typed `acquire-timeout` → WebGL2 net**
  fires silently. Live-confirmed shape: clean console, no flash *of an error*, just the
  same viz via GL. KEEP.
- **The WebGL2 context-cap is TIGHTER on WebKit** (~8 in Chromium, often fewer on
  Safari). N viz on one page can overrun it → the eviction storm. The
  **circuit-breaker (N=3/T=2000ms)** in the shared leaf is the exact kill for the
  "rapidly FLASHES" report and is backend-agnostic (covers WebGL2 + the WebGPU
  `device.lost` Metal-TDR twin). KEEP — but HARDEN the **acquisition budget**: the
  offscreen-park must release contexts of parked viz so a long page never holds N live
  contexts at once (see §4).
- **`preserveDrawingBuffer`** — the read-confirmed answer to the prompt's Q4: the π
  readback path is `locator.screenshot()` (the COMPOSITOR read through the browser), NOT
  `readPixels`/`getImageData`. So `preserveDrawingBuffer:false` is **correct** for every
  live viz (a true per-frame perf + memory win, and on WebKit avoids the
  always-allocated readback buffer). The "all-zero readback" the dot-flow delta found is
  **not a substrate defect** — it's the failure mode of *any* in-page `getImageData` on a
  `false` buffer, which no viz does for π. The substrate's contract is correct; the gate
  uses the compositor path. **The hardening is to DOCUMENT this as the contract** (a
  capture-mode `contextAttrs.preserveDrawingBuffer:true` opt-in exists for a viz that
  ever needs an in-page readback — aurora's `runtime.ts` already models it) so no future
  gate author taints by reaching for `readPixels` on a live canvas.

### 3b. The meatball/liquid layer that COMPOSITES with the substrate
Per §L7 + the IOS27 reference: the goo/meatball merge on WebKit is a **static SVG
`filter:url()` metaball** (`DockGooFilter.vue`, sRGB `color-interpolation-filters`),
**NEVER `backdrop-filter:url`** (WebKit drops it), compositor-only, `@supports`/PRM
floors. This is a COMPONENT concern (dock-fission/goo-morph), not the substrate's — but
the substrate must guarantee the **canvas viz** it hosts is `pointer-events:none` and
composites cleanly *under* that SVG layer (the concentric setup already does
`pointer-events:none` on the canvas, listeners on the wrapper). The substrate's §L7 arm:
the GPU viz is GPU-only (no per-frame paint-bound CSS), offscreen-paused, PRM-frozen — it
**inherits** the cross-engine floor by being a parked-when-hidden GPU surface, exactly as
design.md §L7 states. No new mechanism; the brainstorm AFFIRMS the existing carve.

## 4. PERFORMANCE — N canvases, the rAF budget, park-when-hidden (harden)

1. **The demand-gate + offscreen-park are the budget.** Each viz owns ONE rAF; a parked
   viz attaches ZERO frames (proof:offscreen-pause). On a page with N viz where only M
   are on-screen, only M loops run. This is the correct architecture. KEEP.
2. **HARDEN: release GPU contexts of long-parked viz, not just the rAF.** Today
   `suspend("off-screen")` parks the *loop* but the WebGL2 context (and the WebGPU swap
   chain) stays allocated against the per-page cap. On a tall demo page (the storybook
   chassis) with many viz below the fold, the cap can still be approached even though
   most are parked. Greenfield: a viz parked **longer than a grace window** (e.g. 10s
   off-screen) calls the leaf's `teardown` to release its context (`WEBGL_lose_context`
   already wired in teardown), and the existing reveal re-build (`buildContext` on
   reveal) re-acquires. The **shared device** (WebGPU) makes this cheap — re-context is
   instant against the warm device. This makes N-viz pages cap-safe on WebKit's tighter
   budget. KISS: it reuses the EXISTING teardown + reveal-rebuild seams, gated on a timer.
3. **The shared-device memo is the per-page perf keystone.** `acquireSharedDevice` pays
   the ~3.5s cold acquire ONCE; every subsequent canvas awaits the resolved device
   (instant). KEEP. The §2 sizing-decouple compounds this: even the FIRST canvas is sized
   before the acquire, so the cold acquire is invisible.
4. **PRM-freeze is wired everywhere it should be** (the core's live `matchMedia` monitor +
   the consumer's `reducedMotion` read → frozen-t). Affirmed. The hardening is a
   **born-RED rAF frame-budget gate** (the motion-spring sibling flagged the same): assert
   that on N≥4 on-screen viz the aggregate rAF stays within a frame budget — a real-paint
   gate, not the headless cascade-arithmetic the spike used.

## 5. THE OFFSCREEN-PAUSE WIRING GAP (Q3 — is it wired for EVERY consumer?)

Read-confirmed: **TWO independent detectors** feed the park, by design:
- The **content-visibility path** (`contentvisibilityautostatechange` → `"off-screen"`)
  lives in the core and fires for **any** consumer whose host has `content-visibility:auto`
  — live-confirmed `parentCV:auto` on both routes, so concentric/blob get it *for free*
  even though `useConcentric` does NOT call `useIntersectionPause`.
- The **IntersectionObserver path** (`useIntersectionPause` → `"off-screen-io"`) is the
  fallback for an engine WITHOUT content-visibility, wired by aurora/goo-blob/goo-dot.

The gap: it's **inconsistent** which viz wire the IO fallback. `useConcentric`,
`useFourierField`, `useDotFlowField` rely ONLY on content-visibility. On a browser/host
where the viz host lacks `content-visibility:auto` (or it's overridden), those viz never
park off-screen. Greenfield hardening (KISS, DRY): **the substrate wires BOTH detectors
itself.** `createGpuSubstrate` already owns the canvas; have it compose
`useIntersectionPause(canvas.parentElement, { pause: ()=>suspend("off-screen-io"),
resume: ()=>resume("off-screen-io") })` internally, so EVERY consumer inherits the IO
fallback ORed with content-visibility — no per-viz wiring, no forgotten viz. The
"one-writer-per-reason" invariant holds (distinct `"off-screen-io"` key). This RETIRES
the per-consumer `useIntersectionPause` calls (DRY — removes the copy-paste, no legacy
dual path).

## 6. THE SINGLE BOLDEST MOVE

**Split the substrate's lifecycle into TWO independent state machines that meet only at
paint-time: a SYNCHRONOUS sizing/visibility machine (owns the backing store + the
park/PRM gate, runs at mount with zero GPU dependency) and an ASYNC paint machine (owns
device acquisition + the WebGPU→WebGL2 fall + the per-frame draw).** The backing store is
correctly-sized and the park/PRM logic is live from frame 0; the device can take its full
6s to resolve behind a sharp, transparent (or cheap-rest-frame-painted) buffer. This
turns the acquire-timeout from a *user-visible blur budget* into a *pure correctness net*,
kills the live-measured ≤6s 300×150 flash on every WebGPU-primary viz, and — because
sizing no longer rides the context-build — lets the substrate own the IO-park + context-
release-when-parked hardening uniformly for all N consumers. One agnostic sizing leaf, no
parallel system, the whole hardened lifecycle survives intact.

## 7. DELTA SUMMARY (for the golden/assay) — keep / refine / re-invent

| Concern | Verdict | Move |
|---|---|---|
| `createCanvasLifecycle` core (suspend set, demand-gate, reveal re-measure, circuit-breaker) | **KEEP** | byte-for-byte; the most-hardened code in the repo |
| WebGPU→WebGL2 fall + clone-only-when-poisoned + acquire-timeout | **KEEP** | live-confirmed silent + correct, no flash-of-error |
| Backing-store sizing coupled to `buildContext`/async arm | **REFINE** | lift to a synchronous agnostic `measure()` leaf, run at mount before the async prelude (§2) — **the live 300×150-flash fix** |
| `preserveDrawingBuffer:false` + compositor-screenshot readback | **KEEP + DOCUMENT** | correct contract; the "all-zero readback" is a non-defect; pin capture-mode opt-in (§3a Q4) |
| Offscreen-park wiring (inconsistent IO fallback per viz) | **REFINE** | substrate composes BOTH detectors itself; retire per-consumer `useIntersectionPause` (§5, DRY) |
| Context retention of long-parked viz vs the WebKit cap | **REFINE** | release context after a grace window off-screen, reuse teardown + reveal-rebuild (§4.2) |
| Safari meatball/goo compositing under the canvas | **AFFIRM (component concern)** | substrate guarantees `pointer-events:none` GPU surface under the static SVG goo; §L7 inherited (§3b) |
| PRM-freeze + shared-device warm | **KEEP** | wired + correct; add a real-paint rAF-budget born-RED gate (§4.4) |

**Re-invent: NOTHING.** Every move is a refine of a fit seam. The substrate survives;
four hardenings (sync-sizing, substrate-owned IO-park, context-release-when-parked,
the documented readback contract) close the live gaps without a single parallel path.
