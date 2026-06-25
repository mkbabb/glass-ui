# dock-core — orchestrator validation of the cardinal finding

The dock-core delta claims the user's "broken dock" is a WIDTH SEIZURE that every prior judge
missed (they measured the centroid `cx`, which is clean, never the width). I validated this
myself — and noted one limitation.

## SOURCE-VALIDATED (the authoritative, fake-proof check) ✓
`src/styles/dock/layers.css:129-160` (read live):
```
--dock-root-ratio: calc(from / max(to, 1px));         /* floor on the DENOMINATOR only */
--dock-root-scale: max(ratio + (1 - ratio) * t, 0.06); /* floor 0.06, NO CEILING */
inline-size: max(to, 2.75rem);
```
The bug is REAL: when the morph target `to` is measured small (e.g. ~4px during a rapid
hover re-trigger, before content lays out), `ratio = from/max(to,1px) ≈ 224/4 ≈ 56`, so
`--dock-root-scale ≈ 56` at t=0 over a reserved width of 44px → visible width ≈ 2464px — the
delta's ~2452px / scaleX(55) detonation. There is NO ceiling on the scale; the `max(…,1px)`
only prevents div-by-zero. `transform-origin: center` keeps the CENTROID symmetric (cxRange 0)
— which is precisely why judges measuring `cx` PASSED while the WIDTH seized. The cardinal
mechanism-vs-gestalt trap, source-exact.

The delta's fix is sound: a ratio-FREE direct interpolation between two POSITIVE endpoints
(`--dock-live: calc(collapsed-px + (expanded-px - collapsed-px) * t)`) — bounded by
construction, no unbounded ratio, no scaleX explosion.

## ALSO orch-confirmed live (matching my pre-diagnosis)
- A1 live nav docks CLEAN: 0 broken-rail artefacts, BottomDock one row.
- Warm-cream plate `srgb .944/.903/.865` (H66 warm, never gray), both modes.
- `--motion-weight` + `--ease-cartoon-punch` EMPTY on `:root` (phantom — SHIP, do not assume).

## LIMITATION (honest)
I could NOT reproduce the live seizure via synthetic `pointerenter/leave` dispatchEvent — the
dock's collapse is hover-INTENT-gated (a timer/useTouchGate), so synthetic events did not fire
the morph (width held 224, `data-morphing` never set). This is the dispatchEvent≠real-gesture
trap the hardened judge warns of. The SOURCE validation above is decisive regardless; a live
re-confirm would need a real CDP hover (chrome-devtools `hover` tool on a snapshot uid).

## Verdict: dock-core delta ACCEPTED (~86%, REFINE spine + RE-INVENT the width leg).
The fix (ratio-free convex blend, bounded; the punch on a SEPARATE `--dock-punch-stretch`
channel not the 6-owner-contended `--stretch`; wire `useDockItemDrag` onto nav items; ship the
two phantom motion tokens) is sound and source-grounded.
