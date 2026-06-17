# W-DRAG-MORPH-DELTA — the pull/drag-to-morph-squish primitive (BB.W-DRAG-MORPH)

**Capture freshness (AZ-form headers)**
- Capture date: 2026-06-17
- HEAD sha: `086c030e97f2`
- Branch: `tranche/BB`
- Dev-box / harness: the π readback (`tests-visual/drag-morph.spec.ts`) is LOCAL-ONLY
  (real-GPU/CDP/pointer-emulation dev-box, the AY W-LIVE1 split) — it is NOT runnable
  in the siblings-absent CI/sandbox impl env (no live `:5199` demo + GPU + pointer
  emulation). The BINDING live capture rides **W-REFLECT3 (Batch 7)**, which re-walks
  the navigation band; this DELTA records the SOURCE-GREEN state + the π's binding
  frame-series shape + the gestalt verdict slot, backstopped on CI by
  `proof:live-verified-ledger`.

## §1 — what shipped

The headline iOS-27 move: **you can GRAB the live chrome and PULL it.** The
SegmentedTabs `pill` indicator stops being a click-target that glides on selection and
becomes a PHYSICAL lozenge — it follows the finger ~1:1, STRETCHES along the travel
axis by drag VELOCITY (a volume-preserving gel-squish, capped LOW so it swells, never
taffy-pulls), and on release FLINGS velocity-continuously to the NEAREST tab, settling
with a small ζ<1 overshoot. The same gesture reaches the dock: a `DockLayerGroup` you
can pull-to-switch between layers. Grab → follow → squish → fling-snap.

The new primitive `useDragMorph` (`@mkbabb/glass-ui/motion`) WIRES the UNCONSUMED kf
`Draggable` substrate (zero binary consumer at HEAD) + `SpringProgress` + the shared
`useLiquidFlex` `"tanh"` velocity-squish — no second drag-physics engine. The two
binary consumers (SegmentedTabs `:draggable` + DockLayerGroup pull-to-switch) satisfy
the ≥2-consumer bar at birth. The strip ALSO gains the owed roving-tabindex keyboard
contract (a draggable tab that is keyboard-broken is the worse failure).

## §2 — the device-free SOURCE gate (proof:drag-morph) — GREEN at close

```
proof:drag-morph — the pull/drag-to-morph-squish primitive (BB.W-DRAG-MORPH)
  D1 composes kf substrate, no 2nd engine : YES
  D2 tanh velocity-squish, capped LOW     : YES  (cap-literal:none)
  D3 fling to NEAREST, single-commit      : YES
  D4 :draggable additive, ≥2 consumers    : YES  (consumers:2)
  D5 roving-tabindex, axis-derived arrows : YES
  self-test D5 bite has teeth             : YES
  status: PASS
```

**Born-RED → GREEN transition (proven):** at HEAD pre-wave the gate was RED on D4
(no `draggable` prop, 0 consumers) + D5 (no `tabindex`/`@keydown` on the strip) — the
mid-wave run after `.1` (the primitive) showed D1/D2/D3 GREEN with D4/D5 still RED, and
the consumer wave (`.2`) drove D4/D5 GREEN. The self-test bite (a synthetic
`:draggable`-gated tabindex — the exact D5 evasion) FLAGS every run.

## §3 — the BINDING π frame-series (owed to W-REFLECT3, the binding live capture)

`tests-visual/drag-morph.spec.ts` asserts the painted truth, BOTH modes, ≥2 viewports:

- **(a) the drag frame-series.** Grab the indicator + drag toward the last tab; the
  indicator center FOLLOWS the pointer within ~40px tolerance, a fast pull resolves
  `--stretch` > 1 (capped ≤ 1.08), and on release the lozenge FLINGS to the nearest tab
  center, `--stretch` releases to ~1 at settle, and the dragged-toward tab's
  `aria-pressed` flips `true` (the model committed). Screenshot:
  `drag-morph-a-fling-desktop-light.png`.
- **(b) the flick-vs-slow snap decision.** A slow drag a short distance (well short of
  the next tab's center) snaps BACK to the origin tab (the velocity-projected
  `decayRest` rest lands inside the origin's basin). The fast-flick-forward case is the
  (a) capture.
- **(c) PRM — no squish, instant snap, gesture still functions.** Under emulated
  `prefers-reduced-motion: reduce`, the drag produces ZERO in-between `--stretch` > 1
  frames AND the snap still commits (`aria-pressed` flips) — the physics is off, the
  gesture works.
- **(d) the keyboard roving readback.** Exactly ONE horizontal-strip tab carries
  `tabindex="0"` (the rest `-1`); ArrowRight moves focus + activates the next, End jumps
  to the last, Home back to the first; the VERTICAL strip is keyboard-navigable on the
  BLOCK axis (ArrowDown moves focus).
- **consumer #2 — the DockLayerGroup pull-to-switch.** On `/dock/layers`, a pull on the
  `.dock-layer-rail` (the rail flexes Y on a horizontal group → drag axis vertical)
  switches the active layer (the `aria-selected`/`data-state="active"` tab changes).
  Screenshot: `drag-morph-dock-pull-consumer2.png`.

## §4 — the fences honored

- **Spring fence:** `useDragMorph` reuses the `snappy` SPRING_PRESETS row (response 0.35
  / ζ 0.65, the iOS-canonical drag register; bracketed by the shipped `--spring-snappy`
  / `--spring-dock`). NO `--spring-*` / `--spring-*-duration` retune; NO new clock.
- **Foreign-tree fence:** the kf `Draggable`/`SpringProgress`/`decayRest` surface is
  CONSUMED, never edited. The kf source `Draggable.snap` option is not yet on the
  published dist `DragOptions`, so the nearest-snap resolution is wired in `useDragMorph`
  off the published `reset` + `decayRest` + `spring.target` surface (the
  named-successor interim — the kf `snap`-option adopt is a by-name coordination ask,
  NOT a glass-ui fork of the pointer-velocity engine).
- **Compositor-only:** the drag follow is `transform: translate` (never
  `inline-size`/`left`/`top`/`width`); `proof:no-layout-animation` (W-MOTION-CANON's
  library-wide gate) stays GREEN — 38 keyframes scanned, 0 layout animations.
- **GL shader fence + ppmycota:** untouched — the lozenge is a CSS `transform` on the
  existing `--glass-bg-floating` plate; the drag path reads no library-token accent.
- **One-`--stretch`-writer:** the drag composes the indicator's OWN `--stretch` var (the
  SAME var the click `squishOnTravel` writes — ONE source of truth; the squish-ownership
  reconcile).
- **No-grow fences:** `dockMorphContext.ts` (ratchet-baselined) UNTOUCHED; the
  DockLayerGroup peak-reserve UNTOUCHED — the pull wire is built BESIDE it.

## §5 — sibling gates stay GREEN

```
proof:tabs-std           : PASS  (the :draggable axis is additive — pill/underline,
                                  axis, clock, center-correction, retirements all hold)
proof:dock-unify         : PASS  (the pull wire is additive on the rail)
proof:dock-rail-hairline : PASS  (the rail register untouched)
proof:no-layout-animation: PASS  (the drag is transform-only)
proof:surface-axis       : PASS  (the CLAUDE.md canon edit is doc-honest)
proof:visual-runner      : PASS  (drag-morph.spec.ts auto-enrolled; 0 orphans)
npm run typecheck        : EXIT 0
```

## §6 — the proof:ba-gestalt navigation verdict

The navigation-band gestalt (the draggable liquid tab + the dock pull-to-switch) is
captured whole-page, BOTH modes, over its real backdrop, and judged ("does the tab read
as a physical liquid lozenge you can grab and fling — follow, squish, fling-snap — as a
page, keyboard-correct?") at **W-REFLECT3 (Batch 7)** — the single authorized
verdict-flipper. Per BB inv-4 the per-mechanism D1-D5 greens do NOT close this visual
wave alone; the gestalt verdict must be operative-PASS, captured fresh on the
real-device dev-box at the reflection.

**Verdict slot:** PENDING (W-REFLECT3) — born-FAIL anchored to the source-green close,
flipped to PASS on the fresh live capture + the navigation-band whole-page judgement.
