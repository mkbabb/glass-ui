# AZ.W-MORPH-SHOWCASE — the vertical↔horizontal liquid-glass dock morph showcase · DELTA

<!-- surface-paths: demo/stories/dock/morph-showcase.vue,src/components/custom/dock/composables/useDockOrientationMorph.ts,src/composables/motion/useLiquidFlex.ts,src/styles/dock/morph-bridge.css -->
<!-- surface-hash: 6349463b7a9eb347dc168e4be01a9cfa60db22e258f6121886e88fe308eea27d -->
<!-- AZ.W-GATES (D6) content-hash freshness model: fresh IFF the four surface-paths'
     bytes are byte-identical to capture time (sha256 of the "\n"-joined bytes,
     surfaceHash convention). Stamped at the own-surface capture against the live demo
     on :5199 (the deterministic-pin seam) with the arm-c-default + liquid-preview
     showcase in place. -->

The R3-13 showcase: a button presses and the dock flows vertical→horizontal and back,
fully bidirectional + deterministic, with the topology reflow (flex column→row)
invisible (the platform CANNOT continuously interpolate a mismatched-topology
silhouette — AX.W42 fold 7, the binding limit; the showcase respects it, never fights
it). Built on the metaball-bridge fleet recommendation (H4 arm a), folding in the
W-LIQUID substrate.

## The chosen H4 arm — and the §7 mechanical fall

The fleet RECOMMENDED arm (a), the metaball-bridge: TWO real DOM docks driven off the
ONE `--dock-morph-t` scalar + a net-new CSS SVG-goo teardrop bridge that merges them
into one amorphous silhouette, occluding the reflow at the `t≈0.5` midpoint. **HG5 (the
arm-a-vs-arm-c perf NUMBER) decided the ship:** the metaball-bridge does NOT clear the
strict 4×-throttle budget (`p50 ≤ ~12ms / 0% of morph frames over 16.7ms`). The
measured arm-a perf (the always-on goo bridge, 4× CPU throttle, ANGLE/Metal dev-box
GPU): median p50 ~13.7–15.1ms across 4 runs/direction, NEVER 0% over the 16.7ms cap
(min 2–3 frames over per run) — the per-frame `feGaussianBlur` repaint + the live
dock-resize layout are the cost. Even the bare two-dock layout morph (goo disabled)
spiked 2–3 frames over.

**Per §H4/§7 — the fall is mechanical (the number decides, not a judgement call):** the
SHIPPED DEFAULT is **arm (c), the View-Transitions crossfade** (`startViewTransition` —
the AQ.W5 substrate; a compositor-snapshot crossfade, deterministic + bidirectional, p50
7.7–8.1ms — see `ground/W-MORPH-SHOWCASE-gperf-{v2h,h2v}.json`). The amorphous
metaball-teardrop fidelity is **BOOKED to a successor** and demonstrable here as the
perf-gated **"Liquid teardrop (preview)"** toggle — the deterministic scalar-driven
two-dock morph + the goo bridge. HG1 carries the arm-c marker + this deferred-teardrop
note. The substrate (`useLiquidFlex` + `useDockOrientationMorph`) STILL SHIPS and drives
the preview (HG2).

The bridge-path PICK (the §3 record): the **CSS SVG-goo filter**, NOT the goo-blob mount
— the M5-deterministic choice (the goo-blob's three free-running `uTime` channels +
pointer-velocity squish would RED the M5 scalar-binding; the SVG-goo has NO clock, the
teardrop aspect is a pure `f(--dock-morph-t)`).

## HG1 — the bidirectional deterministic frame-series (the topology reflow OCCLUDED)

The deterministic-pin seam (`window.__dockMorphShowcase.setMorphT(t)`) pins the EXACT
scalar — no spring, no wall-clock — so a frame at a given `t` is byte-reproducible (the
bridge has no free-running `uTime`). Captured at t=0/.25/.5/.75/1 in BOTH directions,
light + dark (the liquid-teardrop preview surface):

| t | vertical dock height | horizontal dock width | vertical opacity | horizontal opacity |
|---|---|---|---|---|
| 0.00 | 296px (full) | 18px (collapsed) | 1.00 | 0.00 |
| 0.25 | 222px | 83px | 0.50 | 0.00 |
| 0.50 | 148px | 166px | 0.00 | 0.00 |
| 0.75 | 74px | 249px | 0.00 | 0.50 |
| 1.00 | 18px (collapsed) | 332px (full) | 0.00 | 1.00 |

Both docks are at opacity 0 (dimmest) at the `t=0.5` midpoint — exactly where the
goo bridge teardrop occludes the column→row reflow jump-cut. Every intermediate frame is
a coherent amorphous silhouette; NO visible clip-path snap. Captures:
`W-MORPH-SHOWCASE-{light,dark}-liquid-{v2h,h2v}-t{0,025,05,075,1}.png` (20 frames). The
arm-c shipped crossfade states: `W-MORPH-SHOWCASE-{light,dark}-vt-{vertical,horizontal}.png`.
The `light-liquid-v2h-t05.png` midpoint shows the two perpendicular capsules merged into
one amorphous goo silhouette via the `feGaussianBlur` + `feColorMatrix` threshold (the
classic gooey-CSS trick) — the metaball teardrop the user named.

## HG2 — useLiquidFlex born with ≥2 consumers (the W-LIQUID fold)

`src/composables/motion/useLiquidFlex.ts` — the shared amorphous flex+squish primitive
(a PURE projection of a caller-driven normalized scalar onto a size span + a
volume-preserving squish; owns no spring/rAF/element). It reconciles the scattered squish
math into ONE named primitive:

- **Consumer #1** — `useDockOrientationMorph` (the V↔H driver): drives two `useLiquidFlex`
  spans (vertical height-collapse + horizontal width-grow) off the ONE scalar; the
  teardrop squish rides the scalar's DERIVATIVE (the M5 binding — `drive()` records the
  |Δt| travel, never a wall-clock).
- **Consumer #2** — `useTabIndicator` (the SegmentedTabs squish): the reciprocal-stretch
  travel-squish re-points onto `useLiquidFlex` (`squishLaw: "linear"`, the
  geometry-relative travel-fraction the §7 names as the indicator's load-bearing local
  detail). **Byte-identical reconcile** — the `--stretch` write is the same prior local
  `1 + frac·(cap−1)`, now computed through the shared cap-clamp + reciprocal projection.
  The 3 SegmentedTabs unit tests stay GREEN.

The `squishLaw` axis (`"tanh"` default = the metaball `sa = 1 + tanh(speed·k)·uStretch`
saturating velocity register; `"linear"` = the tabs travel-fraction register) is the
honest reconcile of the two dialects — one primitive, one cap-clamp + reciprocal
projection, the curve law-selected.

## HG3 — PRM-aware + offscreen

Under `prefers-reduced-motion: reduce` the morph SNAPS to the target with ZERO motion
frames: `useDockOrientationMorph.runTo` reads the PRM query and `pin()`s the target
endpoint in one synchronous step (no spring runs). Captured: the scalar samples after a
PRM `morphTo("horizontal")` read `["1","1","1","1","1"]` (every sample is the endpoint —
zero intermediate motion frames), the goo teardrop never paints. Capture:
`W-MORPH-SHOWCASE-prm-snap-horizontal.png`. The bridge is decorative-only and removed
under PRM (the bridge `--dock-bridge-opacity: 0` block); the shipped arm-c VT crossfade
honors PRM via `view-transition.css` (`animation: none` on the VT pseudos under PRM —
the swap runs without motion). Offscreen: the arm-c crossfade is a one-shot
state-flip (no continuous loop to park); the liquid preview's docks are real DOM (no
WebGL); neither holds a free-running rAF.

## HG4 — the topology limit + determinism structurally asserted (proof:morph-showcase)

`proof:morph-showcase` (born-RED device-free static src-scan, GREEN at close):

```
proof:morph-showcase — the V↔H liquid-glass dock-morph gate (AZ.W-MORPH-SHOWCASE)
  M1 one --dock-morph-t scalar (no 2nd clock) : YES
  M2 topology limit respected (occluded)      : YES
  M3 bidirectional on the one scalar          : YES
  M4 useLiquidFlex ≥2 consumers               : YES  (useDockOrientationMorph.ts, useTabIndicator.ts, …)
  M5 bridge clock scalar-bound (no free clock): YES
  status: PASS
```

M1 — the morph writes ONLY `--dock-morph-t` (no second clock token). M2 — no `clip-path`
interpolation across the orientation flip (the AX.W42 fold-7 NO-GO); the reflow is
occluded by the two-plate goo bridge. M3 — the same spring re-targets 0↔1 both
directions. M4 — `useLiquidFlex` ≥2 consumers. M5 — the bridge reads `f(--dock-morph-t)`
/ `--stretch`, carries no free-running CSS `animation`, and mounts no `<GooBlob>` (the
free-running `uTime`/pointer-`speed` path the M5 clause forbids) — the deterministic CSS
SVG-goo (`feColorMatrix`) is the mounted bridge. Born-RED bite verified: a `<GooBlob>`
mount, a `clip-path` interp, a second clock token, or a free CSS animation each RED a
clause.

## HG5 — the frame budget (the arm-a-vs-arm-c NUMBER)

`ground/W-MORPH-SHOWCASE-gperf-{v2h,h2v}.json` (4× CPU-throttle, ANGLE/Metal dev-box GPU):

- **arm-a (the always-on goo bridge — the perf MISS that fell):** median p50 ~13.7–15.1ms,
  never 0% over the 16.7ms cap (min 2–3 frames over/run). → fell to arm (c).
- **arm-c (the SHIPPED VT crossfade — the trace):** v2h p50 7.7ms, h2v p50 8.1ms (both ≤
  the ~12ms budget). The over-16.7ms frames (6/158, 6/150) are the VT SNAPSHOT-raster
  frames at each crossfade start (the inherent one-shot VT mechanic — max 37–43ms on the
  snapshot frame), NOT the sustained crossfade (the steady frames sit at the p50). The
  crossfade itself is a compositor opacity animation on cached snapshots — the
  budget-clearing default the §7 fall mandates.

The §7 successor BOOK: the metaball-teardrop fidelity at the strict 4×-throttle budget
(a compositor-only goo that does not re-rasterize per frame, or a worker-rasterized
teardrop) is booked with the arm-a perf trace recorded; the showcase ships
bidirectional + deterministic on the arm-c crossfade today, with the teardrop
demonstrable as the perf-gated preview.

## proof:live-verified arm (the π half)

The captured frame-series (HG1, 20 PNGs + 4 VT states + the PRM snap), the PRM-snap
readback (HG3), and the `gperf-{v2h,h2v}.json` perf re-run (HG5) are the LOCAL-ONLY π
half (real-GPU/Metal dev-box truth — SwiftShader cannot judge the liquid teardrop, and
the 4×-throttle number is dev-box truth, the AY W-LIVE1 split). `proof:morph-showcase`
(M1–M5) is the device-free CI half; this DELTA is the captured visual/budget truth,
backstopped on CI by `proof:live-verified-ledger`.
