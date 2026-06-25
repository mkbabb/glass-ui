# Substrate (GPU base) — WAVE-AMENDMENT

> The concrete tranche amendment reconciled against the extant 116-wave set
> (`docs/tranches/BD/union/waves/`). Reference implementation: `GOLDEN.md` (+ the folded
> hardenings in `DELTA-ASSAY.md`). No duplicative work — every existing wave that touches
> the substrate is cited, AUGMENTED / UPDATED / left intact, and the two genuine gaps are
> authored as NEW waves with born-RED gates. KISS, DRY, no legacy, no parallel path.

---

## 0. THE RECONCILIATION — what already exists (do NOT re-author)

Grepped the full wave set. The substrate is touched by these EXTANT waves; the amendment
must not duplicate them:

| Extant wave | What it ALREADY owns | Amendment relation |
|---|---|---|
| `W-VIZ-BROKEN-FIX.md` (D3) | `acquireSharedDevice()` + `WEBGPU_ACQUIRE_TIMEOUT_MS` 2500→6000 — **SHIPPED in HEAD** (`useWebGPUCanvas.ts:78,128`) | **KEEP — the new SIZE wave CITES it as the device-warm precondition; does NOT re-do it.** The golden's G2 sync-at-mount is what makes the (already-relaxed) 6000ms ceiling cosmetic. |
| `BD.W-VIZ-RESPEC.md` (C6) | RETIRES `ringField.ts`, re-aims concentric's MATH to a level-set topology | **ORTHOGONAL — UPDATE one line.** Concentric's sizing fix is independent of its math re-aim; the re-spec'd concentric INHERITS the leaf `sizeBacking` (its new `concentricGLSetup`/`concentricWGPUSetup` `resize()` must be authored against the new `resize(s)` signature, not the old `clientWidth||320`). Add a cross-ref. |
| `BD.W-GPU-ONLY-SPINE.md` (F4) | the probe-first `selectGpuBackend()` + the NAMED residual clone | **KEEP — independent.** The SIZE wave does not touch backend selection; the REVEAL wave does not either. |
| `BD.W-VIZ-PERF-BUDGET.md` | the worst-case frame-time gate over the GPU substrate | **KEEP — the SIZE wave's bounded-walk ≤1-reflow clause feeds the perf budget; cross-ref, no overlap.** |
| `W-LIQUID-ENTRANCE-GENERAL.md` | the universal liquid-weight LAW (inertia/weight/bounce/squish) | **CITE — the REVEAL wave is the substrate INSTANCE of this law; reuses `useLiquidFlex`, cites the law, adds no new motion engine.** |
| `W-LIQUID-REVEAL-FIX.md` | repairs the broken `useLiquidReveal` (source-rect FLIP bloom for overlays) | **DISJOINT — name it explicitly as NOT the substrate's primitive.** `useLiquidReveal` is a discrete-overlay morph (wrong for a FIELD); the substrate reveal is a field-bloom. The REVEAL wave declares it does NOT depend on `useLiquidReveal`. |
| `BD.W-CARTOON-PUNCH` + `BD.W-MOTION-WEIGHT` (Band-0, per ledger row 0) | mint `--ease-cartoon-punch` + `--motion-weight` in `src/styles/` | **DEPENDS — the REVEAL wave is GATED on these; they are NOT shipped today (grep: 0 hits in src/).** |
| `proof:offscreen-pause`, `proof:gpu-substrate-single`, `proof:webgl-substrate-single`, `proof:substrate-cohesion`, `proof:substrate-staging`, `proof:substrate-paints-color` | the extant substrate gate fleet | **REUSE — the new gate SITS BESIDE them; clause C/E reuse `proof:substrate-paints-color`'s screenshot harness (DRY at the gate layer); it does NOT subsume them.** |

**No existing wave touches the substrate SIZING-leaf contract or the reveal-bloom register.** Both
are genuine gaps. Two NEW waves, plus targeted AUGMENT/UPDATE of the above.

---

## 1. NEW WAVE — `BD.W-SUBSTRATE-SIZE-UNIFY` (the spine — REFINE, BLOCKING)

**Band A (procedural-viz substrate) · depends:** `W-VIZ-BROKEN-FIX` (the shipped `acquireSharedDevice`
device-warm) · **feeds:** `BD.W-VIZ-PERF-BUDGET` (the ≤1-reflow clause), `BD.W-VIZ-RESPEC` (concentric's
re-authored `resize`) · **reference:** `GOLDEN.md` §G1/§G2/§G3/§G4 + `DELTA-ASSAY.md` §4 H-B/H-D.

### The defect (LIVE-measured, this session — `DELTA-ASSAY.md` §1)

The backing-store sizing contract is scattered across N hand-written consumer `resize()` closures,
drifted into THREE incompatible conventions, and coupled to the GPU-acquire — producing a **live,
intermittent ARM-TIME race** where `resize()` runs once before the SPA-route layout settles, sizes the
backing to the 300×150 default, and never re-fires:

- `/substrates/concentric` — **300×150, ratio 0.296, `clientWidth=506` (NOT 0)** on route-nav; healed on
  hard reload. The field renders at 0.30× resolution behind the hero glass (an iOS-27 fidelity failure;
  screenshot `delta-concentric-stuck.png`).
- `/substrates/blob` — **BOTH canvases 300×150** (in-fold + off-fold, `clientWidth` non-zero) on route-nav;
  healed +2.5s.
- `/substrates/aurora` — CORRECT (ratio 0.75 = 1.5× wash DPR). It ALONE survives because it ALONE carries
  the rAF-double-resize defense (`runtime.ts:352`).

The trigger is NOT `clientWidth===0` (every stuck canvas had a non-zero `clientWidth` — the `||constant`
branch is never the cause). It is: sizing runs once at arm before layout, never re-fires, no double-rAF.

### The fix (the UNION — `GOLDEN.md` §G1/§G2, with the four challenge hardenings folded)

1. **`sizeBacking()` in `createCanvasLifecycle.ts`** — aurora's sizer GENERALIZED to a BOUNDED ancestor
   walk (H-B: cap depth 3 + stop at the first sized/contained/positioned/CV ancestor — NOT an unbounded
   gBCR storm, NOT an over-recovered wide-grid box). Returns `BackingSize {w,h,dpr,changed}`. The DPR
   *policy* (1.5× wash / 2× focal `resolveBudgetDpr`) stays the consumer's, passed as `dprPolicy`.
2. **A NEW `presize()` leaf phase** (H-D: NOT a "move" — `arm()` runs only AFTER the async acquire on the
   WebGPU path). Called from `createGpuSubstrate` BEFORE `armAsync()`; runs `sizeBacking` synchronously
   + schedules the aurora rAF-double-resize defense (promoted to the leaf for ALL consumers). The leaf
   OWNS the ResizeObserver (observing `canvas`).
3. **DELETE both backend ROs** (`useWebGLCanvas.ts:180`, `useWebGPUCanvas.ts:337`) — the leaf RO REPLACES
   them (H-D: else a triple-observe parallel path). Amend §0 "KEEP the per-backend RO" → "KEEP minus the RO."
4. **`CanvasFrameHooks.resize` → `resize(s: BackingSize)`** (H-D: an N-consumer BREAKING arity change,
   ~16 GL+WGPU setup files — the PRIMARY churn surface; body shrinks measure→upload). The leaf passes the
   freshly-computed size so a consumer can NEVER re-derive a wrong one.
5. **Bind CV to the nearest `content-visibility:auto` ancestor** (not `canvas.parentElement` —
   `createCanvasLifecycle.ts:247` binds the wrong element on a grandparent CV host).
6. **G3 — compose IO at the leaf, retire the per-consumer `useIntersectionPause`** (aurora/goo-blob/goo-dot)
   in the SAME diff (H-D atomicity); IO-reveal also re-measures via `sizeBacking`.
7. **G4 — `captureFrame()` seam** + auto-`preserveDrawingBuffer` in capture mode + the documented
   compositor-read contract in the substrate header.
8. **PRUNE** the `clientWidth||canvasSize` / `clientWidth||320` / one-parent-gBCR / 300×150 guards across
   goo-blob, concentric(GL+WGPU), aurora, dot-matrix, dot-flow, fourier, paper-grid, constellation; RETIRE
   aurora's double-rAF special-case (the leaf owns it for all).

### The born-RED gate — `proof:substrate-size-unify` (REUSES `proof:substrate-paints-color`'s harness)

| Clause | Assertion | Born-RED today because |
|---|---|---|
| **A — SIZE (per route, arm-window)** | for EACH Band-A route, sampled at the arm-window (before any settle): `canvas.width === round(boxW × dprPolicy)` && `> 300` | concentric + blob measure 300×150 at route-nav T0 (live this session) — enumerated per route, not a stale single pin |
| **B — DECOUPLE** | the backing is correct-sized BEFORE the WebGPU device resolves (sampled within the cold-acquire window) | sizing rides `buildContext` → waits on the device |
| **C — ONE OBSERVER** | exactly ONE ResizeObserver per canvas + exactly ONE IO observer per canvas after the change | today: 1 backend RO + (composed) IO; the leaf RO must REPLACE, not add |
| **D-now — READBACK CONTRACT** | today's `getImageData`/`readPixels` returns all-ZERO on a live `preserveDrawingBuffer:false` context | born-GREEN — pins the contract (the golden's "a feature, not a bug") |
| **D-fix — CAPTURE** | `captureFrame()` returns NON-ZERO pixels in capture mode | `captureFrame` does not exist yet |
| **E — PARK** | a viz with NO `content-visibility:auto` host (concentric/fourier/dot-flow) parks off-screen via the substrate-composed IO detector (rAF count → 0) | those consumers wire no IO fallback today |
| **F — BOUND** | `sizeBacking` causes ≤1 forced reflow per resize tick (PerformanceObserver layout count) AND does NOT over-recover the viewport on a zero-height-parent / sized-grandparent fixture | the unbounded walk (golden's verbatim) would fail both |

Gate runs on chromium AND webkit for clause A (H-A: the `clientWidth`-zero divergence + the weaker WebKit
`contentvisibilityautostatechange` support is where the latent drift actually bites — engine-honest RED).

---

## 2. NEW WAVE — `BD.W-SUBSTRATE-REVEAL-BLOOM` (the signature RE-INVENT, RE-SPEC'd)

**Band A · depends (HARD):** `BD.W-CARTOON-PUNCH` + `BD.W-MOTION-WEIGHT` (mint `--ease-cartoon-punch` +
`--motion-weight` — NOT shipped today) · `BD.W-SUBSTRATE-SIZE-UNIFY` (the leaf reveal seams) ·
**cites:** `W-LIQUID-ENTRANCE-GENERAL` (the law) · **reference:** `GOLDEN.md` §G6 + `DELTA-ASSAY.md` §4
H-E/H-F.

### The defect

The entrance — the ONE moment the invisible substrate is perceptible (cold first-paint / scroll-reveal /
un-park) — is a silent mechanical `canvas.width=` pop (worse: blank→pop on a slow acquire). The §L4
cartoon register is ABSENT at the seam this lens owns. The golden's first attempt (G6 box-zoom on
`--ease-cartoon-punch`) is REFUTED live: a `scale()` box-zoom is the wrong gestalt for a FIELD (a 14%
bare-warm-cream gutter at the glass edge breaks §3's defined edge — H-E), and the punch was structurally
gutted to a live-measured **3.5%** (peakScaleX 1.0347 vs the advertised 22% — the 1.22 ease multiplied a
0.20 keyframe delta — H-F), with a hardcoded `true` volume-preservation gate disproved by its own numbers.

### The fix (RE-SPEC'd — `DELTA-ASSAY.md` §4 G6)

A FIELD bloom, not a box-zoom:
- a one-shot `--substrate-reveal-t` 0→1 the SHADER reads to ramp luminance/saturation/drift-speed (the
  field catches up from WITHIN); the canvas rect stays `scale(1)` so the defined edge never breaks.
- a CSS `opacity` fade + the canvas's OWN `filter: blur()` settle (§L7-safe, NEVER `backdrop-filter:url`),
  depth scaled by `--motion-weight`.
- the overshoot lives in the KEYFRAME values (e.g. field-luminance `0→1.12→1.0`), driven on
  `--ease-cartoon-punch` once Band-0 lands — so the punch is REAL, not an ease × small delta.
- ONE-SHOT at cold-first-paint ONLY — a re-reveal of an already-seen viz (IO-reveal / G5-rebuild) is a
  silent re-attach (scroll off+back → ZERO second bloom).
- PRM → instant `opacity` fade, zero field-ramp (`--motion-weight: 0`), unified with the spec (not a
  separate `@media` keyframe swap).
- reuses `useLiquidFlex` for the blur-settle weight; cites `W-LIQUID-ENTRANCE-GENERAL`; does NOT depend on
  the broken `useLiquidReveal` (wrong primitive for a field).

### The born-RED gate — `proof:substrate-reveal-bloom`

| Clause | Assertion | Born-RED today because |
|---|---|---|
| **A — PUNCH (measured)** | a paired-engine (chromium+webkit) compositor π frame-series shows the entrance field-luminance overshoot ≥ 12% then settles — sampled from the compositor, NOT the ease label | no reveal choreography exists |
| **B — EDGE** | the canvas rect stays `scale(1)` through the reveal (no bare-stage gutter at the glass edge) | the box-zoom (golden verbatim) leaves a 14% gutter |
| **C — VOLUME (computed)** | X·Y computed from the keyframes ∈ [0.95, 1.05] at every sampled beat (NOT a hardcoded `true`) | the spike's curve is 0.67 |
| **D — ONCE** | scrolling a viz off-screen and back fires ZERO second bloom | n/a — must hold by construction |
| **E — PRM** | under `reduce`: instant opacity fade, zero field-ramp, zero transform | `--motion-weight` does not exist yet (gated on Band-0) |

---

## 3. AUGMENT / UPDATE / PRUNE (the extant set)

- **AUGMENT `BD.W-VIZ-RESPEC.md` (C6 concentric):** add a cross-ref line — the level-set re-aim authors its
  new `concentricGLSetup`/`concentricWGPUSetup` `resize()` against the `BD.W-SUBSTRATE-SIZE-UNIFY`
  `resize(s: BackingSize)` signature (upload-only), NOT a fresh `clientWidth||320`. (Sequencing: SIZE-UNIFY
  lands the signature; RESPEC consumes it. No conflict — different files / different concerns.)
- **UPDATE `W-VIZ-BROKEN-FIX.md` (D3):** note that the shipped `acquireSharedDevice` + 6000ms ceiling
  become COSMETIC once `BD.W-SUBSTRATE-SIZE-UNIFY` G2 sizes synchronously at mount (the ≤6s blurry-flash
  window closes). One sentence; no mechanism change.
- **UPDATE `BD.W-GPU-ONLY-SPINE.md`:** none required (backend selection is disjoint from sizing/reveal) —
  confirm the residual-clone `freshCanvasForFallback` is untouched by the leaf RO change.
- **PRUNE (inside `BD.W-SUBSTRATE-SIZE-UNIFY`, not a standalone wave):** the per-consumer
  `clientWidth||constant` / one-parent-gBCR / 300×150 measure-blocks + the per-consumer
  `useIntersectionPause` + the two backend ROs + aurora's double-rAF special-case. All absorbed, no legacy.
- **No EXCISE.** Every extant substrate wave survives; the two new waves fill the genuine gaps.

---

## 4. SEQUENCING

```
BD.W-CARTOON-PUNCH + BD.W-MOTION-WEIGHT (Band 0, mint the tokens)
        │
W-VIZ-BROKEN-FIX (device-warm, SHIPPED) ──► BD.W-SUBSTRATE-SIZE-UNIFY (BLOCKING spine)
                                                     │            │
                                          BD.W-VIZ-RESPEC    BD.W-SUBSTRATE-REVEAL-BLOOM
                                          (consumes resize(s))  (gated on Band-0 tokens + SIZE-UNIFY)
```

`BD.W-SUBSTRATE-SIZE-UNIFY` is the BLOCKING spine (closes the live stuck-canvas — the iOS-27 fidelity
floor) and ships independently of the reveal. `BD.W-SUBSTRATE-REVEAL-BLOOM` is the signature move, gated
on the Band-0 cartoon tokens; it can slip behind SIZE-UNIFY without blocking the field-correctness fix.
