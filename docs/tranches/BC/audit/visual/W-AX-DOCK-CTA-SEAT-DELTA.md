# BC.W-AX-DOCK-CTA-SEAT — DELTA (the CTA-receive landing seat: reserve → fly-in → FLIP reveal)

The CTA-receive landing SEAT around the byte-untouched `useDockCtaReceive` morph: the
`[data-cta-pending]` ghost + the un-gated resting reserve + the plain `transition:opacity`
FLIP reveal + the `setPending()`/`clearPending()`/`pending` pending-state API + the `/dock`
re-export. Folds the speedtest-AX intake **BC-W2** (the seat) + **BC-W3** (the API + subpath).

## The gestalt (what a reader sees)
The CTA does NOT vanish onto a static control — the control was WAITING for it. While the
CTA is in flight (or pending), the target dock control shows a dim `[data-cta-pending]`
ghost, sized for its arrival **from frame 0**, so the dock box does NOT jump when the CTA
lands. The CTA flies + reshapes onto the seat (the BB morph), and on landing the seat
REVEALS its real content with a calm `transition: opacity` FLIP — NOT the dock
morph-stagger. The box width is CONSTANT throughout: the CTA lands into an already-sized
hole.

## The four moves (source-half, this wave)
- **T1 — the pending API.** `setPending()` writes `data-cta-pending` on `options.dockControl`
  (arms the ghost + the static reserve); `clearPending()` removes it (fires the opacity FLIP
  reveal); `pending: Readonly<Ref<boolean>>` is the reactive seat state. The default
  `onReceived` hand-off calls `clearPending()` — the seat reveals as the CTA lands. The
  methods toggle a DATA ATTRIBUTE — they never animate a layout property (the compositor-only
  floor extends to the seat). `receive()`/`reset()`/the kf morph are BYTE-UNTOUCHED.
- **T2 — the un-gated resting geometry (no box-jump).** `src/styles/dock/cta-seat.css`'s
  `[data-cta-pending]` rule reserves a STATIC `min-inline-size`/`min-block-size` off
  `--dock-control-size`/`--dock-layer-height` (the W-DESKTOP-RESERVE static-frame-0
  precedent) — NEVER an animated dimension. The dock's shrink-wrap is already at the seated
  width.
- **T3 — the FLIP reveal.** A plain `transition: opacity var(--cta-seat-reveal-duration,
  var(--spring-snappy-duration)) var(--ease-out)` — the `--ease-out` no-overshoot register
  (W-MOTION-CANON P2). It does NOT ride `--dock-expand-t`/the morph-stagger (a content swap
  is not a box morph). The ghost is `opacity: var(--cta-seat-ghost-opacity, 0.35)`; PRM →
  `transition: none` instant swap (the vestibular floor; the seat snaps to content).
- **T4 — the `/dock` re-export.** `useDockCtaReceive` (+ its option/return/preset types) is
  re-exported from `src/components/custom/dock/index.ts` beside `GlassDock`/`useDockState`/
  `DockIconButton` (ADDITIVE — the `/motion` export stays; a re-export, not a move).

## Fences honored (box-inviolate)
- `dockMorphContext` / `dockMorphMeasure` / `DOCK_SPRING` / `morph.css` / `layers.css` /
  `density.css` BYTE-UNTOUCHED — this wave's footprint is DISJOINT from the morph-geometry
  files. `setPending`/`clearPending` write a data attr + a static reserve, never an
  orchestrator edit (R2 holds).
- The morph half (`receive()`/`reset()`/the kf `ElementMorph`/`springTimingFunction`/the PRM
  snap) is byte-untouched (R1/R3/R4 stay GREEN by construction).
- The seat reserve is STATIC, the reveal is `transition: opacity` — `proof:no-layout-animation`
  stays GREEN (232 transition legs scanned, 0 layout animations off the allowlist; my 2
  opacity legs are compositor-safe).
- Rect-driven, layout-agnostic (Gate-1 Q5): the seat targets `[data-cta-pending]` on ANY dock
  control, makes NO skip-arrow assumption.

## Gates (source half — born-RED → GREEN, validated here)
- **`proof:dockmorph-cta` R6** born-RED at HEAD (no pending API, no seat partial, no `/dock`
  re-export → 6 R6 clauses RED) → GREEN. R1-R5 stay GREEN (the morph half byte-untouched). The
  R6b self-test bite was falsified against the REAL partial (an injected `transition:
  min-inline-size` reds the gate) then restored — the detector is load-bearing.
- **`proof:no-layout-animation`** stays GREEN (the seat partial scanned, 0 layout animations).
- **`proof:ba-gestalt`** parses the new `dock-cta-seat` roster row (14 surfaces, born-RED
  operative-FAIL — correct until the live warm capture flips it).

## Pending — the ORCHESTRATOR's live PAINT (per the cardinal split)
The LIVE morph/reserve/reveal PAINT is the orchestrator's binding π — **pending-orchestrator-capture**:
- The live `:5199` gate set as applicable: `liquid-morph` / `dock-animation-live` (the CTA
  lands on a real glass control, the FLIP reveal compositor-only).
- The CAPTURED-PAINT frame-series (both modes) over `/dock/cta-receive` `<DockStage>`: the dim
  `[data-cta-pending]` ghost → the CTA fly-in → the opacity FLIP reveal, with the dock root's
  `getBoundingClientRect().width` CONSTANT from `setPending` through `clearPending` (the
  no-jump annotation), + a SECOND PRM capture (the seat snaps to content, zero transform/blur
  frames). On capture, the `dock-cta-seat` roster row flips FAIL→PASS (fresh warm-cream pixel
  read at the probe + the per-surface freshness record) and the `tests-visual/dockmorph-cta.spec.ts`
  seat arm's constant-box-width measurement records the binding π readback.
