# BI.W-DIALOG-PLACEMENT — Sheet folds onto Dialog as `placement`; ConfirmDialog → preset

Band B8 (Kronecker factorization). Follows W-OVERLAY-UNION's fold pattern. Design: D-FACTOR FACTOR-B dialog
cluster (PASS-1; PASS-4B factor proto — P3 edge-slide byte-identical to the shipped Sheet, structurally +
frame-series, both engines).

## §Mandate

Discharges: UF-P7 (the Kronecker factorization applied to the dialog cluster). Registry: FAM-10 mechanism-
distinctness (Sheet = same reka DialogRoot + same focus trap; the slide is paint, not mechanism).

## §Design

Decided (PASS-1 dialog cluster + PASS-4B proto):

- **Sheet FOLDS onto Dialog** as a `placement: center | top | right | bottom | left` axis (same reka
  DialogRoot, same FocusScope; the side-slide is a paint transform). Proto: `slideClasses`/`animationName`
  identical both engines; enter travel Chromium 360/360, WebKit 361/360.
- **ConfirmDialog demotes to a Dialog PRESET** (its imperative promise-opener is thin — a preset over the
  Dialog root, not a distinct component).
- **Dialog `variant` → `surface` clean break** (the binary `variant: glass|opaque` retires onto the shared
  surface axis — no alias; the W-SURFACE-EXTRACT courier is the door).
- **Placed-content anatomy is stable.** Every non-center placement is one stationary plate plus one
  stable side-content region. Header, body, and actions remain intrinsic top-flow children of that
  region; full-height left/right placements leave unused space below rather than stretching implicit
  grid tracks or pinning generic actions. The `scroll` axis changes only that region's overflow
  ownership, never the plate, its material sampler, or the slot's parentage.
- **THE N3 DISAMBIGUATION RULE (load-bearing):** Dialog[placement] is NOT Drawer. **Drawer SURVIVES** — it
  owns snap-detent spring physics + the live-behind non-modal focus model + a keyframes-bearing chunk (a
  mechanism no survivor expresses). A side sheet with no detents is `Dialog placement=right`; a detented
  bottom sheet over a live surface is `Drawer`. The rule: placement is a Dialog paint axis; snap-physics is
  Drawer's mechanism — the two are disjoint, never a third fork.

## §Work

- `src/components/ui/dialog/` — add the `placement` axis + `surface` prop (retire `variant`); the
  `placement != center` values bind the side-slide (folding `sheetVariants`).
- DELETE `src/components/ui/sheet/` (Sheet* + index) + the `./sheet` subpath (`package.json:438`) as a NAME.
  (`SheetContent.vue:92` surfaceClass wart already re-pointed in W-SURFACE-EXTRACT; it dies with the SFC.)
- `src/components/custom/confirm-dialog/` — re-express as a Dialog preset.
- `/api` + MIGRATION.md rows (Dialog `variant`→`surface` + Sheet→Dialog[placement]) → W-FACTOR-ASKS.

## §Acceptance

Gate: **`proof:fold-delete`** (dialog/sheet clause, authored in W-AXES-GATES) + edge-slide π parity.
- dialog/sheet clause (BORN-RED at HEAD — Sheet dir + subpath + ConfirmDialog live): `ui/sheet/` dir-absent,
  `/sheet` subpath-absent, no live `Sheet`/`SheetContent` import in `src/`, `ConfirmDialog` folded to a
  preset (no standalone root); survivor `Dialog[placement]` + `Drawer` present → GREEN.
- Dialog `variant` DEFINITION-ABSENT (the binary retired onto `surface`); axes membership: `PLACEMENTS`
  tuple (from W-AXES-GATES) is the fenced source.
- All four non-center placements keep actions at their intrinsic authored height and content-adjacent;
  `scroll` moves only the stable inner region while the plate stays at `scrollTop = 0`. The direct-child
  graded edge retains its bounds within ±0.5 CSS px before/after an actual overflow scroll. A host
  overflow/clip, `DialogFooter`/Button sizing patch, implicit bottom anchoring, or conditional wrapper
  that re-parents content is a failed fold.
- N3 fence bite: `Drawer` root present-and-distinct (the placement fold must NOT swallow Drawer's snap
  engine); a synthetic Drawer-fold-into-Dialog REDs.

## §π/DELTA

**Edge-slide parity + focus-return** π: Dialog `placement=top|right|bottom|left` keeps the retired Sheet
frame-series, intrinsic action geometry, and stable inner-scroll ownership; focus-trap + focus-return;
the N3 fence (Drawer live-behind non-modal unchanged) — wide + narrow, both schemes, Chrome + real
WebKit. DELTA: `W-DIALOG-PLACEMENT-DELTA.md`. rides the B-close gestalt ceremony (W-GESTALT-LEDGER-FILE oracle + the close battery)
(`proof:ba-gestalt` overlay-band).

## §Obligations

- Modal-Dialog focus-RETURN divergence on stable Safari/WKWebView (SAF-1) — the same real-device run
  W-OVERLAY-UNION owes (the fold inherits reka's FocusScope focus→body).

## §Dispositions

- Terminalizes the Sheet fold: **FOLDED-TERMINAL** onto `Dialog placement=right|top|bottom|left`.
- Terminalizes ConfirmDialog: **DEMOTED** to a Dialog preset.
- Dialog `variant`: **RETIRED** onto `surface`. Drawer: **SURVIVES** (N3 rule recorded). Clean break, no alias.
