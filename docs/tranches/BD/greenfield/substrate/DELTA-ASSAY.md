# Substrate (GPU base) — DELTA-ASSAY (golden vs current → the UNION path)

> The deft delta. GOLDEN.md is the reference; this assay reconciles it against the LIVE
> current implementation + the three adversarial challenges, settles the contested
> keystone by measurement, and routes the survival-of-the-fittest verdict (KEEP / REFINE /
> RE-INVENT) into a single union path. No fork, no parallel, no legacy.

---

## 0. METHOD — live-measured, source-grepped, not reasoned

- **Source read in full:** `createCanvasLifecycle.ts`, `useWebGPUCanvas.ts`, `webgpuDevice.ts`,
  `useGpuSubstrate.ts`, `useWebGLCanvas.ts` (sizing seam), `useIntersectionPause.ts`, and the three
  drifted consumer sizers (`aurora/runtime.ts:283-318`, `goo-blob/useMetaballRenderer.ts:306`,
  `concentric/concentricGLSetup.ts:104`).
- **Live-measured (chrome-devtools, dpr 2, Chromium, `:5173`):** `/substrates/aurora`,
  `/substrates/concentric`, `/substrates/blob` — each at route-nav T0 + after a settle, plus a hard
  reload, plus a `resize` dispatch. Console captured. Screenshot artefact at
  `delta-concentric-stuck.png` (the concentric field blank/low-res behind the header glass).

---

## 1. THE KEYSTONE, SETTLED BY MEASUREMENT (golden R1 vs challenge-1 R1 vs challenge-2/3 R1)

The three docs disagree on WHICH route carries the live 300×150 wound. The golden names **aurora
frozen forever**; challenge 1 says **aurora is transient, blob/concentric do not reproduce**;
challenge 2/3 say **concentric is the live stuck canvas**. I measured all three, twice, this session:

| Route | route-nav T0 | after settle / reload | verdict |
|---|---|---|---|
| `/substrates/aurora` (2 canvases) | ratio **0.75** (= 1.5× wash DPR / 2× dpr — CORRECT by design) | stable | **NOT stuck — aurora is protected** (its rAF-double-resize at `runtime.ts:352`) |
| `/substrates/concentric` (1 canvas) | **300×150, ratio 0.296, `clientWidth=506` (NOT 0)** | hard-reload → **healed 1012×576** | **STUCK on route-nav, HEALS on reload — an arm-time race** |
| `/substrates/blob` (2 canvases) | **BOTH 300×150** (in-fold + off-fold), `clientWidth=569`/`447` (NOT 0) | +2.5s → **healed 1138/894** | **STUCK at T0, heals on a delayed tick — the same race** |

**The reconciled root cause (supersedes all three contested claims):**

The stuck-300×150 is a **real, live, intermittent ARM-TIME SIZING RACE**, route-nav-dependent, that
bites **every consumer EXCEPT aurora**. It is NOT "frozen forever" (the golden over-states — it heals)
and it is NOT "does not reproduce" (challenge 1 under-states — I reproduced it on blob AND concentric)
and it is NOT specifically `clientWidth===0` (every stuck canvas reported a NON-zero `clientWidth`, so
the `|| constant` broken branch is NOT the trigger). The trigger is: **`resize()` runs ONCE at `arm()`
before the SPA-route layout settles, sizes the backing to the un-laid-out 300×150 default, and never
re-fires** (no ResizeObserver tick for a same-box reveal, no CV event for a non-CV host, no double-rAF
defense). **Aurora alone survives because it ALONE carries the rAF-chained double-resize** belt-and-
braces (`runtime.ts:352-355`) — the proven defense the golden correctly identifies as the gold standard.

So the golden's MECHANISM is right (lift aurora's defense to the leaf, size synchronously, decouple
from the GPU acquire) but its EVIDENCE label is wrong (it is a race, not a freeze; the cure is the
double-rAF + sync-at-mount promotion, not a `clientWidth` fix). **The wave note + the born-RED gate
must read the LIVE per-route state and assert at the arm-window, not pin "aurora frozen forever."**

---

## 2. SURVIVAL OF THE FITTEST — the KEEP / REFINE / RE-INVENT triage

### KEEP byte-for-byte (FIT — the most-hardened code in the repo, all three lenses concede)

| Mechanism | Where | Why it stays |
|---|---|---|
| the three-reason suspend `Set` + demand-gate rAF | `createCanvasLifecycle.ts:131-197` | the one-writer-per-reason invariant is sound; `proof:offscreen-pause` pins it |
| the two-detector park (`off-screen` CV + `off-screen-io` IO, distinct keys) | `:23-35` | AX.W16 F6 — literally one-writer-per-reason; do NOT collapse |
| the PRM freeze (one static frame at arm under `reduce`, live `matchMedia` re-monitor) | `:142-172`, `:332-345` | correct WCAG 2.2.2 floor |
| the context-loss circuit-breaker (`N=3`/`T=2000`/`DEBOUNCE=100`) | `:120-122`, `:285-327` | the BC.W-SAFARI-WEBGL flash-storm kill; pinned safety floors |
| the shared-device warm + 6000ms acquire-timeout | `useWebGPUCanvas.ts:78-182` | pays the cold acquire ONCE; the timeout is a pure correctness net |
| clone-only-when-poisoned fall + typed `WebGPUInitError` + validation-probe gate | `useGpuSubstrate.ts:160-177`, `webgpuDevice.ts`, `useWebGPUCanvas.ts:372-380` | the lying-adapter close; structurally required for ONE class (see W-GPU-ONLY-SPINE F4) |
| `useIntersectionPause` / `PausableRuntime` | `useIntersectionPause.ts` | the IO park driver — REUSED by G3, not retired |

### REFINE (weak — fit code that has drifted or leaks a contract)

| # | What | Verdict |
|---|---|---|
| **D1** | the sizing contract is scattered across N hand-written consumer `resize()` closures, drifted into 3 incompatible conventions (aurora gBCR+1-parent; goo-blob `clientWidth||canvasSize`; concentric `clientWidth||320`) | **REFINE → G1: one `sizeBacking()` leaf helper, bounded ancestor walk; DELETE the N copies** |
| **D2** | sizing is smuggled inside each backend's `buildContext` (`useWebGLCanvas.ts:180`, `useWebGPUCanvas.ts:337`), so on the WebGPU path it waits ≤6s on the async device | **REFINE → G2: a `presize()` leaf phase + the RO at arm, BEFORE the acquire; the leaf RO REPLACES both backend ROs** |
| **D3** | which viz wire the IO fallback is inconsistent (aurora/blob/goo-dot do; concentric/fourier/dot-flow do NOT) | **REFINE → G3: `createGpuSubstrate` composes IO; retire the per-consumer call ATOMICALLY** |
| **D4** | the all-zero `readPixels` readback is correct (`preserveDrawingBuffer:false`) but folklore, not a documented contract | **REFINE → G4: a `captureFrame()` seam + the documented compositor-read contract** |
| **D5** | the N-canvas budget (live + N preview thumbnails) is half-addressed; no DPR-cap-by-priority, no release-when-long-parked | **REFINE → G5: `priority:"focal"|"preview"` + release-when-parked (lower priority)** |

### RE-INVENT (broken / absent register)

| # | What | Verdict |
|---|---|---|
| **D6** | the ENTRANCE — the one moment the invisible substrate is perceptible — is a silent mechanical `canvas.width=` pop (worse: blank→pop on a slow acquire). The §L4 cartoon register is absent at the seam this lens owns | **RE-INVENT → G6, but RE-SPEC'd** (see §4) — a FIELD bloom, not a box-zoom; gated on the Band-0 cartoon tokens |

---

## 3. THE FOUR HARDENINGS THE CHALLENGES LAND (folded into the union path)

The three adversarial passes converge on a SURVIVES-but-DENTED verdict. The spine (G1/G2) survives;
the documentation and G6 do not survive clean. The four load-bearing corrections, folded:

1. **H-A — the keystone label (all three R1).** The wound is concentric+blob, an INTERMITTENT arm-time
   race, NOT "aurora frozen forever." §1 above is the corrected diagnosis. The gate asserts the LIVE
   per-route arm-window state, enumerating every Band-A route — never a stale single-canvas pin.

2. **H-B — `sizeBacking` is a REFINE of aurora, not "verbatim" (c1·R3, c2·R2, c3·R4).** Aurora walks
   ONE parent; the golden's `while`-loop walks the FULL chain — a genuine improvement that the spike's
   C2 depends on, but an UNBOUNDED gBCR storm (O(depth) forced reflow per tick) and an over-recovery
   risk (a wide flex/grid grandparent sizes the backing to the viewport). **BOUND the walk:** cap at 3
   levels OR stop at the nearest `content-visibility`/`contain`/sized-or-positioned ancestor (which G2
   already locates), and gate ≤1 forced reflow per resize tick + no-over-recover on a zero-height-parent
   fixture. Drop "verbatim" — call it "aurora's sizer, generalized to a BOUNDED ancestor walk."

3. **H-C — `--ease-cartoon-punch` + `--motion-weight` are NOT shipped (c1·R2, c2·R3, c3·R1).** Grep:
   ZERO hits in `src/`. They are owned by the Band-0 `motion-spring-register` golden (the ledger row 0
   confirms NEW `BD.W-CARTOON-PUNCH` + `BD.W-MOTION-WEIGHT` mint them). So G6 is NOT "reuse the shipped
   tokens, zero new" — it is an undeclared cross-wave dependency. **G6 (`BD.W-SUBSTRATE-REVEAL-BLOOM`)
   is GATED on `BD.W-CARTOON-PUNCH` + `BD.W-MOTION-WEIGHT` landing first.** Until then the reveal rides
   the tokens that DO ship (`--spring-snappy`/`--spring-snappy-duration`/`--ease-out`, the `.glass-reveal`
   grammar) as a calibration placeholder. Drop the word "shipped" for both tokens.

4. **H-D — three scope claims understate the churn (c1·R4/R5/R6, c3·R3).**
   - **The RO is a NEW leaf phase, not a "move."** `arm()` is only reached AFTER the async acquire on the
     WebGPU path, so sizing-before-acquire needs a NEW `presize()` seam called from the factory before
     `armAsync()`. Name it; it is a new public leaf seam.
   - **`resize(s: BackingSize)` is an N-consumer BREAKING signature change** (every GL+WGPU setup pair,
     ~16 files, hook arity measure→upload). It is the wave's PRIMARY churn surface; require a typecheck
     + an e2e PAINT pass per consumer (the [[glass-ui binding verification]] lesson: vue-tsc misses arity
     drift). Enumerate ALL consumers, not the 7 in the prune.
   - **The leaf RO REPLACES both backend ROs** — the PRUNE list must DELETE `useWebGLCanvas.ts:180` +
     `useWebGPUCanvas.ts:337`, or a leaf RO + two backend ROs = a triple-observe parallel path (the
     BINDING LAW forbids it). §0's "KEEP the per-backend RO" is amended to "KEEP minus the RO (it rises
     to the leaf)." The G3 IO retirement is ATOMIC same-diff (assert exactly ONE IO observer per canvas).

Plus the two design-fidelity corrections (challenge 3, folded into the G6 re-spec, §4):
- **H-E — the box-zoom is the WRONG gestalt for a FIELD** (c3·R7): a `scale(0.86)` start leaves a 14%
  gutter of bare warm-cream at the glass edge — breaking §3's "defined edge." A field's cartoon register
  is a bloom-from-within (luminance/saturation/drift swell), not a rect zoom.
- **H-F — the punch was structurally gutted to 3.5%** (c3·R1, live-measured `peakScaleX 1.0347` vs the
  advertised 22%): the 1.22 ease multiplied a 0.20 keyframe delta → sub-perceptual. The acceptance is
  the MEASURED peak from the compositor, never the ease label; the volume-preservation gate must COMPUTE
  X·Y, not hardcode `true` (the spike's rigged D2).

---

## 4. THE UNION PATH (deft, KISS, no fork — precisely how to evolve current toward golden)

The whole change lands in the three lifecycle files + a one-line-collapse per consumer + one new
recipe. Reuse, never re-roll. Ordered by binding priority:

### G1 + G2 + H-D (BLOCKING, the spine) — `sizeBacking()` leaf helper + `presize()` phase

```ts
// createCanvasLifecycle.ts — the ONE backing-store sizer (REFINE of aurora's, BOUNDED).
export interface BackingSize { w: number; h: number; dpr: number; changed: boolean; }

export function sizeBacking(
    canvas: HTMLCanvasElement,
    dprPolicy: number | ((box: { w: number; h: number }) => number),
): BackingSize {
    const rect = canvas.getBoundingClientRect();
    let cw = rect.width, ch = rect.height;
    let el = canvas.parentElement, depth = 0;
    // BOUNDED walk (H-B): cap depth AND stop at the first sized/contained/CV ancestor —
    // never an unbounded gBCR storm to <body>, never an over-recovered wide-grid box.
    while ((cw === 0 || ch === 0) && el && depth < 3) {
        const pr = el.getBoundingClientRect();
        cw = cw || pr.width; ch = ch || pr.height;
        const cs = getComputedStyle(el);
        if (cs.contain.includes("size") || cs.containerType !== "normal" ||
            cs.position !== "static") break;
        el = el.parentElement; depth++;
    }
    const box = { w: Math.max(1, cw), h: Math.max(1, ch) };
    const dpr = Math.max(1, typeof dprPolicy === "function" ? dprPolicy(box) : dprPolicy);
    const w = Math.max(1, Math.round(box.w * dpr));
    const h = Math.max(1, Math.round(box.h * dpr));
    const changed = canvas.width !== w || canvas.height !== h;
    if (changed) { canvas.width = w; canvas.height = h; }  // idempotent — no realloc when unchanged
    return { w, h, dpr, changed };
}
```

- **The leaf OWNS the ResizeObserver** (observing `canvas`, engine-agnostic), built in a new `presize()`
  phase called from the factory BEFORE `armAsync()`. `presize()` runs `sizeBacking` once synchronously
  the instant the canvas has a box + schedules the aurora-proven rAF-double-resize defense (promoted from
  `runtime.ts:352` — the belt-and-braces that today protects only aurora now protects EVERY consumer).
  **DELETE the two backend ROs.** `arm()`/CV-reveal/IO-reveal/resume all route through the SAME
  `sizeBacking` — four call-sites, one sizer, zero drift, no race.
- **`CanvasFrameHooks.resize` becomes `resize(s: BackingSize)`** — body shrinks from a 15-line
  measure/DPR/constant-fallback block to an upload: `gl.viewport(0,0,s.w,s.h); uploadResolution(s.w,s.h)`
  (GL) / `uploadAspect(s.w/s.h)` (WGSL swap-chain auto-tracks). The DPR *policy* (aurora's 1.5× wash,
  blob's 2× focal `resolveBudgetDpr`) stays the consumer's, passed as `dprPolicy`.
- **PRUNE:** the `clientWidth||canvasSize` / `clientWidth||320` / one-parent-gBCR / 300×150 guard in
  goo-blob, concentric (GL+WGPU), aurora, dot-matrix, dot-flow, fourier, paper-grid, constellation —
  absorbed. The aurora double-rAF special-case is RETIRED (the leaf now owns it for all).
- **Bind CV to the nearest `content-visibility:auto` ancestor** (not just `canvas.parentElement` —
  `createCanvasLifecycle.ts:247` binds the wrong element when CV is on a grandparent).

### G3 (REFINE, DRY) — compose BOTH park detectors at the leaf, ATOMICALLY

`createGpuSubstrate` composes `useIntersectionPause(canvas.parentElement, …)` writing the distinct
`"off-screen-io"` reason, so every consumer inherits IO-park ORed with CV. The per-consumer
`useIntersectionPause` calls in aurora/goo-blob/goo-dot are DELETED in the SAME diff (H-D atomicity:
assert exactly ONE IntersectionObserver per canvas after — no double-write of `off-screen-io`). The
IO `isIntersecting→true` ALSO triggers a `sizeBacking` re-measure (the reveal belt-and-braces, the
load-bearing reveal path on WebKit where `contentvisibilityautostatechange` support is weaker).

### G4 (REFINE, contract) — `captureFrame()` seam

`GpuSubstrateHandle.captureFrame(timeSec): Promise<ImageData|null>`. In `mode:"capture"` it auto-flips
`preserveDrawingBuffer:true` at context creation (free only there), `renderAt(timeSec)`, then
`readPixels`/`copyTextureToBuffer`. Live path stays `false` — same-rAF-turn read. **DOCUMENT in the
substrate header:** live π reads via the compositor `screenshot()`; the all-zero `readPixels` on a live
buffer is a FEATURE, not a bug; capture-mode is the in-page exact-pixel read. Gate D splits into D-now
(today's `getImageData`→all-zero, born-GREEN, pins the contract) + D-fix (`captureFrame`→non-zero).

### G5 (REFINE, lower priority) — `priority:"focal"|"preview"` + release-when-long-parked

`"preview"` caps DPR at 1×, bakes one frame then parks, shares the one device. A viz parked beyond a
grace window (10s) releases its context via the leaf's existing `WEBGL_lose_context` teardown; reveal
re-builds against the warm shared device. Reuses teardown + reveal-rebuild + a timer. Ships behind G1/G2.

### G6 (RE-INVENT, RE-SPEC'd) — the FIELD bloom, gated on the Band-0 cartoon tokens

NOT a box-zoom (H-E). The substrate paints no pixels of its own, so the entrance is a FIELD bloom:
- a one-shot `--substrate-reveal-t` 0→1 the SHADER reads to ramp luminance/saturation/drift-speed (the
  field "catches up" from within) — the canvas rect stays `scale(1)` so the §3 defined edge never breaks.
- a CSS `opacity` fade + the canvas's OWN `filter: blur()` settle (the `.glass-reveal` blur-settle —
  §L7-safe, NEVER `backdrop-filter:url`), depth scaled by `--motion-weight`.
- driven on `--ease-cartoon-punch` once Band-0 lands; the overshoot lives in the KEYFRAME values (e.g.
  field-luminance `0→1.12→1.0`) so the punch is REAL, not an ease multiplied by a small delta (H-F).
- a ONE-SHOT at the cold-first-paint seam ONLY — NOT on every IO-reveal/G5-rebuild (a re-reveal of an
  already-seen viz is a silent re-attach; scrolling a viz off+back fires ZERO second bloom — else a
  scrolling page is a flicker-storm).
- PRM → instant `opacity` fade, zero field-ramp (`--motion-weight: 0`), unified with the spec (not a
  separate `@media` keyframe swap).
- **acceptance is the MEASURED peak** from a paired-engine (chromium+webkit) compositor π frame-series
  (e.g. measured field-luminance overshoot ≥ 12% then settle), never the ease label.

**Reconcile with the liquid-weight law:** G6 CITES `W-LIQUID-ENTRANCE-GENERAL` (the universal inertia/
weight/bounce law) as its register source and reuses `useLiquidFlex` for the blur-settle weight — it is
the substrate INSTANCE of that law, not a new motion engine. It does NOT depend on the broken
`useLiquidReveal` (that is a source-rect FLIP bloom for discrete overlays — wrong primitive for a field;
W-LIQUID-REVEAL-FIX repairs it independently).

---

## 5. CONVERGENCE

**REFINE (spine) + RE-INVENT (the reveal register, re-spec'd). CONVERGENCE: ~85%.**

The substrate is the most-hardened code in the repo — schedule, park, freeze, fall, device-warm,
circuit-breaker, clone-only-when-poisoned all ship and are sound (KEEP byte-for-byte). The ONE genuine
gap is the leaked + drifted + arm-raced sizing contract (live-reproduced 300×150 on concentric AND blob,
healing intermittently), and the one absent register is the perceptible-entrance moment — both thin
UNIONS on the shipped seams: lift one bounded helper, add one `presize()` phase + leaf RO (replacing the
two backend ROs), compose one detector, add one readback seam + one priority flag + one field-bloom
recipe gated on the Band-0 tokens. No rebuild, no parallel path, no legacy. The 15% residual is the G6
re-spec proof (field-bloom punch measured paired-engine) + the cross-wave token dependency landing.
