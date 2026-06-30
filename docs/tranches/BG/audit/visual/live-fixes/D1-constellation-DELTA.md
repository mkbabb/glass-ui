# D1-constellation — ALL dots track the cursor + shift around

**Verdict: REPRODUCED → FIXED.** Dual-engine verified (Chrome CDP pixel-measure + Safari WebKit JS-engine).
Route: `/substrates/constellation` (and the page-spanning StoryHero background constellation + every demo
canvas — they all read the one default constant).

## Root cause (CONFIRMED in src)
`DEFAULT_PARALLAX = 0.08` was **default-ON** and applied to EVERY node via `parallaxNodePos`:

- `src/components/custom/constellation/constants.ts:143` — `export const DEFAULT_PARALLAX = 0.08`
- `src/components/custom/constellation/Constellation.vue:49` — `withDefaults(... parallax: 0.08)`
- `src/components/custom/constellation/composables/useConstellation.ts:81` — `props.parallax ?? DEFAULT_PARALLAX`
- `src/components/custom/constellation/constellationField.ts:359-374` — `parallaxNodePos` offsets each
  node by `ox = (pointer.x − cx) · parallax · z`, `oy = (pointer.y − cy) · parallax · z`.

On a 1066×420 canvas, a node at `z=1` shifts up to `0.08 · 533 ≈ 42px` horizontally; the cross-correlated
whole-lattice slide on a center→corner sweep measured **58px**. The user reads this as a bug: the entire
proximity-graph lattice slides to chase the cursor. (The distance-gated local `stepField` lean — `d < infl`
— and the BB.B4 velocity term inside that gate are NOT the bug and were NOT touched.)

## Fix (clean break, no alias — token-first, one constant)
`DEFAULT_PARALLAX = 0` — pointer-parallax is now **DEFAULT-OFF / opt-in depth**. `parallaxNodePos` early-returns
`{node.x, node.y}` unchanged when `parallax <= 0`, so the bare lattice never tracks the cursor. A consumer that
wants the "living-network" depth passes `parallax` explicitly (e.g. a sub-perceptual `0.02`).
- `constants.ts` — `DEFAULT_PARALLAX = 0` (+ doc rewrite: default-off, opt-in, the bug recorded).
- `Constellation.vue` — `withDefaults` now reads the one constant `parallax: DEFAULT_PARALLAX` (was a hardcoded
  `0.08`); imports it. All three read sites now resolve to the single source.
- `useConstellation.ts` — unchanged (`props.parallax ?? DEFAULT_PARALLAX` already correct; now resolves to 0).

Compositor-only (the parallax is a transform of node screen positions, no layout); PRM-irrelevant (pure default
value); warm-cream/no-gray untouched; ≥2-consumer bar untouched (parallax stays a public prop). Why **0** not
**0.02**: the directive favors near-zero/OFF because the user reads it as a bug; on the 6180px-tall StoryHero
background canvas even 0.02 still slides the lattice perceptibly (the parallax origin is far off-screen), and 0
is the only value that fully kills the perceived whole-lattice tracking while keeping depth available opt-in.

## Live verify (the binding numbers)

### Chrome (real Chrome.app over CDP :9341, composited GPU canvas via CDP screenshot — the binding pixel measure)
Method: scroll a 420px demo canvas to viewport center, `page.mouse.move(center)` → screenshot A,
`page.mouse.move(corner)` → screenshot B, 2D cross-correlate best-align shift over the canvas crop.

| | center→corner slide | drift-only control | corner→opp-corner |
|---|---|---|---|
| **BEFORE** (0.08) | **58.1 px** | 2.0 px | 67.1 px |
| **AFTER** (0)     | **5.7–6.3 px** | 2.0–2.8 px | 4.0 px |

The whole-lattice slide collapsed from 58px to the drift+local-lean noise band (~5–6px ≈ the natural drift
over the dwell + the distance-gated local lean near the cursor, which is the intended interaction, not the bug).
Captures: `D1-constellation/before-A-center.png`, `before-B-corner.png`, `after-final-A-center.png`,
`after-final-B-corner.png`.

### Safari (WebKit.framework / JavaScriptCore — AppleWebKit/605.1.15, "Apple Computer, Inc.")
The off-screen WKWebView `takeSnapshotWithConfiguration` does NOT capture the live WebGPU/WebGL2 constellation
canvas (proof: two snapshots 1.2s apart of a continuously-drifting lattice came back **byte-identical, SAD=0.00**,
canvas crop static at mean 194.8 — the GPU layer + offscreen rAF-park preclude an off-screen pixel pointer-sweep;
this is a known WebKit tooling limit, not a fix issue). The fix is **pure engine-independent JS** (a default
constant + the `parallax <= 0` early-return), so it was verified at the WebKit JS-engine level on the LIVE route:

```
engine="Apple Computer, Inc."   parallax0_offsetPx=0   parallax008_offsetPx=40   canvasCount=10
```

WebKit's JavaScriptCore yields **0 offset at parallax=0** (the fix) vs **40px at the old 0.08** (the defect), and
the route renders without regression (10 constellation canvases present, no JS error). Engine-stable; the binding
GPU-canvas pixel measurement is the Chrome-CDP run above.

## Gates (all green in the worktree)
- `npx vue-tsc --noEmit` → exit 0 (the `withDefaults`-reads-imported-constant compiles clean).
- `proof:constellation-field` (unit) → 41 passed (`parallaxNodePos` flat/inactive/depth cases — they pass the
  parallax value explicitly, independent of the default, so no breakage).
- `proof:viz-constellation` → GREEN. `proof:constellation-spine` / `-tokens` / `-substrate-single` / `-gen` → PASS.

## Files changed
- `src/components/custom/constellation/constants.ts`
- `src/components/custom/constellation/Constellation.vue`

Patch: `/tmp/respec-fixes/D1-constellation.patch`
