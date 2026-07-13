# W-GLASS-TOKEN-PRUNE-DELTA — the dialog/sheet rung reconcile (the α-band probe)

Band B2 (glass taxonomy). Lands ON W-SURFACE-EXTRACT / W-CLEAR-FOLD. The α-band probe is the
ARBITER — run FIRST, verdict recorded here, not assumed.

## The α-band probe (the arbiter) — RUN

The composited plate is `color-mix(in srgb, var(--card) X%, transparent)`, `X = (1-(1-op)*level)*100`;
at level=1 the computed `background-color`'s own alpha channel == the rung's opacity register. The
oklab tint wrapper (dialog/sheet) is byte-equal to the plate at `--glass-tint-strength: 0%` and lifts
both overlay-band rungs equally under self-engage — the RELATIVE Δ is preserved. Composited luminance
over a backdrop B (card luminance C): `L = op·C + (1-op)·B`.

Live Chrome/Safari getComputedStyle capture over the mounted Dialog + Sheet, BOTH modes, is the
orchestrator-owned π (rides the B-close gestalt ceremony — W-GESTALT-LEDGER-FILE oracle). The
deciding arbiter below is the DETERMINISTIC composited-α (color-mix is exact); the live capture is
0-delta by construction (the reconcile is a proven byte-identical mechanism swap).

| rung              | plate-α | L / white | L / busy(0.42) | L / dark(0.06) |
|-------------------|---------|-----------|----------------|----------------|
| floating (light)  | 0.80    | 0.924     | 0.808          | 0.736          |
| **dialog** (light)| **0.68**| 0.9354    | 0.7498         | 0.6346         |
| overlay  (light)  | 0.95    | 0.9098    | 0.8808         | 0.8628         |
| **sheet** (light) | **0.74**| 0.9297    | 0.7789         | 0.6853         |
| floating (dark)   | 0.88    | 0.1658    | 0.0962         | 0.053          |
| **dialog** (dark) | **0.76**| 0.2795    | 0.1403         | 0.0539         |

**ΔL — dialog vs floating:** light {white 0.011, busy 0.058, dark 0.101} · dark {white 0.114, busy 0.044, dark 0.001}
**ΔL — sheet(0.74) vs overlay(0.95), light:** {white 0.020, busy 0.102, dark 0.178}
**Δ plate-α (the see-through register):** dialog−floating = **0.12** · sheet−overlay = **0.21**

## VERDICT: KEEP (genuinely-distinct iOS control-center α)

Both rungs clear the ~2% ΔL collapse threshold by a wide margin over any representative busy/dark page
(the see-through register the whole point of BC.W-DIALOG-GLASS / BE.W-SHEET-TRANSLUCENT — floating 0.80
read "NOT glassy at all"). Δ plate-α 0.12 / 0.21 are NOT named duplicates of floating/overlay. The
rungs STAY with the recorded distinct-physics rationale in `tokens/glass.css`.

The KEEP branch still KILLS the named-duplicate WART: `DialogContent.vue:253` re-declared
`--glass-bg-floating: var(--glass-bg-dialog)` (hijacking the `floating` NAME to hold the dialog value —
the double-name). It now re-points the INTERNAL compose slot directly:
`--glass-bg-rung: var(--glass-bg-dialog)` (one door, the NAMED dialog rung read directly). `.glass-
floating` composes `--glass-plate-tinted` from `--glass-bg-rung → background`, so the plate α is
BYTE-IDENTICAL; `--glass-bg-floating` keeps meaning `floating` on the dialog scope.

## Byte-diff of the Dialog/Sheet plate (before/after) — 0 delta

- **Dialog (glass surface):** old `--glass-bg-floating: var(--glass-bg-dialog)` → new
  `--glass-bg-rung: var(--glass-bg-dialog)`. Old path: class `--glass-bg-rung: var(--glass-bg-floating)`
  reads the inline-overridden `--glass-bg-floating` = dialog bg → `--glass-plate-tinted` = dialog.
  New path: inline `--glass-bg-rung` = dialog bg → `--glass-plate-tinted` = dialog. IDENTICAL composite.
- **Dialog (veil/opaque surfaces):** the `[data-surface]` rule sets `background` DIRECTLY (independent
  of `--glass-bg-rung`), so both mechanisms are irrelevant there — identical.
- **Sheet:** UNCHANGED. SheetContent paints the `glass-floating` tier (0.80) at rest and does NOT
  consume `--glass-bg-sheet` (the LIVE consumer is the Drawer descent gradient, `drawer.css`, where
  the crown sinks toward the 0.74 see-through floor). No plate change → 0 delta. The stale glass.css
  comment that claimed "SheetContent re-declares" is reconciled to reality; wiring the resting sheet
  onto the 0.74 register is a booked BE follow (held out here by the 0-delta constraint).

## Gate

`proof:dialog-glass` re-pointed + a rung-census clause. All GREEN on the edited tree:
- **DG3** — DialogContent one-door `--glass-bg-rung: var(--glass-bg-dialog)` + the double-name
  DEFINITION-ABSENT + keeps `surfaceClass(.., 'floating')`. Born-RED at HEAD (double-name lived at
  DialogContent.vue:253; the one-door rung absent).
- **DG6** (new census) — KEEP: both `--glass-bg-dialog`/`--glass-bg-sheet` composed rungs survive +
  the `BI.W-GLASS-TOKEN-PRUNE … probe … KEEP` distinct-physics rationale recorded in glass.css + no
  token-source double-name. Born-RED at HEAD (verdict not recorded).
- Self-test bites: DG3 double-name re-add REDs; DG6 rung-collapse REDs. Both teeth verified.

## Disposition

The dialog/sheet named-duplicate-rung row is DECIDED by the probe (KEEP-with-rationale), gate-locked.
No re-book.
