<!--
  FRESHNESS (AZ-form):
    wave:        BB.W-DOCK-MORPH-FAMILY — the dock-morph REPAIR family (compositor transform + synchronous PRM seat + peak self-reserve + @property scale thread + vertical chrome un-gate)
    captured-at: 2026-06-17
    HEAD:        2138ac02 (branch tranche/BB; the wave's edits in the working tree atop it)
    device:      Chrome-headless-new (tests-visual/playwright.config.ts) — SwiftShader on the dev-box; the binding CDP Layout-flat trace + the Metal-box re-run ride the W-REFLECT3 close
    routes:      /dock/overview (the collapse↔expand morph — (a)/(b)/(c)/(e)),
                 /dock/layers   (the nested DockLayerGroup peak self-reserve — (d)),
                 /dock/rail     (the VERTICAL dock chrome-interp — (f))
    spec:        tests-visual/dock-morph-family.spec.ts (the binding π — clauses a–f); proof:dock-morph-family (the device-free SOURCE arm F1–F6 + the self-test bite)
    re-run:      `cd tests-visual && npx playwright test dock-morph-family.spec.ts --project=chromium-headless-new`
-->

# BB.W-DOCK-MORPH-FAMILY — π DELTA (the dock-morph mechanism REPAIR)

The BA W-DOCK-MORPH-INSITU wave landed the in-situ V↔H morph DEMONSTRATION but consumed
the AZ morph SUBSTRATE as-shipped, and that substrate carried six mechanism defects the
speedtest AW v2.1 audit measured against a live consumer (a–e) plus the (f) vertical-axis
chrome-interpolation gap. This wave is the REPAIR: same morph, same `--dock-morph-t`
scalar, same `DOCK_SPRING` clock (byte-untouched — none of these is a spring re-tune), but
the geometry mechanism underneath it is now compositor-bound, settled-reveal, PRM-safe,
self-reserving, consumer-threadable, and chrome-continuous on BOTH orientations.

## The six defects → the six fixes

| # | sub-ask | the cause at HEAD | the fix |
|---|---|---|---|
| a | DOCKMORPH-COMPOSITE | `layers.css` lands the live scalar on `inline-size`/`block-size` → a relayout EVERY morph frame ("too slow and laggy") | the box RESERVES its settled `to` footprint (one layout solve); the live `--dock-morph-t` drives `transform: scaleX/scaleY(var(--dock-morph-scale))` over it (`--dock-morph-scale` runs `from/to → 1`), `transform-origin` at the pinned edge — NO layout property reads the live scalar |
| b | DOCKMORPH-REVEAL-SEAT | the active pane reveals through a GROWING layout box → a blank/half-painted dock at the leading frames | the content lays out COMPLETE at the reserved `to` footprint from frame 0; the `overflow: clip` aperture uncovers the scaled box, never a half-painted growing layout |
| c | DOCKMORPH-PRM-SEAT [P0] | the scalar jumps 0→1 (PRM) but the span seats a rAF later → the box paints the collapsed `from` (a 10×74 sliver, every control OUTSIDE the box) | a `prefersReducedMotion()` branch in `dockMorphContext.onSwap` + `useLayerTransition` seats the box at the true `to` + the scalar at the endpoint via a `nextTick`-bounded synchronous measure (post-flush, NOT an rAF morph window), composing the BA-VJS-1 nested ordering — no spring, no sliver |
| d | DOCKLAYER-RESERVE | `DockLayerGroup` never reserves its peak-layer block-size → the consumer hand-rolls `--dock-host-reserve` (over-reserves ~70%) | the group MEASURES each `.dock-layer-item-host` pane's `scrollHeight` and reserves the PEAK as `min-block-size` on its OWN root, exposed as a read-only `--dock-layer-peak-block-size`, re-measured on a `useResizeObserver` tick |
| e | DOCKSCALE | `--dock-scale`/`--dock-local-scale` substitute ONCE at `:root` (not `@property`-registered) → a consumer-scope override never re-evaluates | `@property --dock-local-scale` + `@property --dock-scale` registered inheriting `<number>` default `1` (byte-identical at default scale); a registered inheriting custom property re-substitutes PER-ELEMENT so a dock-scope override re-evaluates the calc + threads down |
| f | DOCKMORPH-VERTICAL-CHROME [BB-1+BB-4] | the vertical box morphs `block-size` but its plate chrome SNAPS (the `--dock-expand-t` chrome-interp is `:not(.vertical)`-scoped) | the `--dock-expand-t` derivation is made orientation-agnostic; a parallel `.glass-dock.vertical` chrome-interp drives bg/border off the SAME scalar; the vertical padding interp pins `padding-inline` (cross/invariant) + morphs `padding-block` (the morph axis — the inverse of the horizontal pin); the radius arm reaches `.glass-dock.vertical.shape-card`; the stale "ALWAYS-EXPANDED" comment is GONE; NO second-clock CSS transition re-added; the BB-4 slot transition stays on `--dock-morph-t` |

## The π readbacks (LOCAL-ONLY; the binding visual truth)

- **(a)/(b) compositor-bound + reveal-complete** — on `/dock/overview` the morph-axis
  `.dock-layers` computes a non-identity `transform` mid-morph (a `scale()`), and the
  reserved `inline-size` resolves to the SETTLED `to` (~240px) not the live-scalar interp
  (~150px at t=0.5). NO layout property reads the live scalar → the CDP Layout track stays
  flat through the morph (the binding trace captured to the ground; the per-frame relayout
  is GONE).
- **(c) PRM synchronous seat** — under emulated `prefers-reduced-motion: reduce` a hover-
  expand seats the dock at the full `to` footprint (box width far above the 10px sliver
  ground) with EVERY control INSIDE the box rect (0 controls outside). The measured 10×74
  blank sliver with every control outside the box is GONE.
- **(d) peak self-reserve** — on `/dock/layers` the `.dock-layer-group` exposes a non-zero
  `--dock-layer-peak-block-size` and its computed `min-block-size` equals the measured
  peak (±2px). The consumer never guesses.
- **(e) scale thread** — a `--dock-local-scale: 1.4` set on the dock scope re-evaluates
  `--dock-scale` at the dock (~1.4× the `:root` identity); the substitution-once trap is
  gone, the documented `:root` preset is real.
- **(f) vertical chrome continuous** — on `/dock/rail` sweeping `--dock-expand-t` 0→1 the
  vertical `padding-block` (the morph axis) interpolates while the `padding-inline` (the
  cross axis) stays INVARIANT (no horizontal sibling reflow). The plate bg/border/radius
  ride the same scalar — no discrete chrome-snap.

## The captured tradeoff + the named successor (the §Triumvirate transform-silhouette trigger)

The compositor re-express scales the box (and its content subtree) on the morph axis, so
the in-flight frames carry a non-uniform `scaleX`/`scaleY` of the content rather than the
prior inline-size lerp's reflow. At the ~0.28s `DOCK_SPRING` settle this in-flight squish
is sub-perceptual at the endpoints (the content seats crisp at scale 1), and the per-frame
relayout — the C3 "too slow and laggy" defect — is GONE. If a higher-fidelity reconcile is
wanted (the squish register re-based onto the transform path so the content does not
horizontally compress mid-morph), it BOOKS to a transform-squish-reconcile successor with
the silhouette delta captured; the morph still ships compositor-bound. The squish-on-
transform fidelity is the booked refinement, not a blocker.

## The DOCK_SPRING fence + the BA-VJS-1 preservation

`DOCK_SPRING {response:0.32, dampingFraction:0.7}` (`src/components/custom/dock/constants.ts`)
is byte-untouched — none of (a)–(f) is a clock defect; the fix is a geometry-MECHANISM
change. The BA-VJS-1 nested-measure ordering (`nestedTargetsWithin`/`forceNestedMaxContent`)
is PRESERVED in the rAF path AND composed into the new synchronous PRM measure (`measureTo`)
so a nested group reads its TRUE intrinsic span (never `to:0`) on both paths. The GL shader
fence holds (the morph is geometry/CSS; the morph-bridge SVG-goo is consumed as-is).

## proof:ba-gestalt dock verdict

The whole dock band (the in-situ morphing shell dock — horizontal AND vertical — + the
multi-layer group) re-earns its gestalt PASS on a fresh capture at W-REFLECT3 (Batch 7),
the single authorized verdict-flipper. Per-mechanism F1–F6 greens do not close this visual
wave alone — the gestalt verdict (does the dock morph read as smooth liquid glass —
compositor-bound, complete-at-every-frame, PRM-safe, chrome-continuous on BOTH
orientations — as a page?) is the binding close criterion, captured with the W-REFLECT3
roster (the vertical `SidebarDock` is on the roster).
