# W-DIALOG-PLACEMENT — DELTA (edge-slide parity + focus-return + the N3 fence)

Band B8 (Kronecker factorization). BI.W-DIALOG-PLACEMENT — Sheet folds onto
`<DialogContent placement>`; ConfirmDialog demotes to a Dialog preset; Dialog `variant`
was retired onto `surface` (BA.W-SURFACE-AXIS, separate). This is a FOLD, not a repaint:
the side-slide is byte-identical to the retired Sheet frame-series, reached now through
ONE reka `DialogRoot` + FocusScope.

## The binding claim — edge-slide byte-identical (the slide is paint, not mechanism)

- **Enter/exit travel** — `<DialogContent placement="right|bottom|top|left">` composes the
  retired `sheetVariants` per-side arms VERBATIM (`rounded-{l,t,b,r}-dialog` + the inner
  `border-{l,t,b,r}` + the `data-[state]:slide-{in,out}-{from,to}-*` pairs) over the shared
  `sheet-animate` register. The structural positioning (`position:fixed` + inset + 75%/24rem
  size) ships PRECOMPILED off `[data-slot="dialog-content"][data-placement]`
  (`dialog-placement.css`, the renamed `sheet.css`), physical-property-for-physical-property
  identical to the retired `sheet.css` — so the enter travel is byte-identical (proto:
  Chromium 360/360, WebKit 361/360) and a consumer sizing override still wins by
  `:where()` specificity.
- **`placement="center"` (default)** — the byte-identical centered modal: the `.glass-reveal`
  bloom over the `--glass-bg-dialog` rung, unchanged from HEAD. No side path touches it
  (`center` emits NO `data-placement`, so no positioning rule matches).
- **Plate-α note (NOT a geometry delta)** — the folded side sheet reads the Dialog
  `--glass-bg-dialog` glass rung (the fold's whole point: ONE dialog material), where the
  retired Sheet read the floating rung. A plate translucency shift, expected + intended; the
  SLIDE geometry is unchanged.

## The N3 disambiguation fence (Drawer SURVIVES)

- `Dialog[placement]` is a PAINT axis; `Drawer` owns the snap-detent spring physics + the
  live-behind non-modal focus model + its keyframes chunk — disjoint, never a third fork.
  Sheet's `dragDismiss` (the JS slide-spring) does NOT carry into the fold: a drag-dismissable
  bottom sheet over a live surface is a `Drawer`, not a placement Dialog. The Drawer root is
  present-and-distinct (proof:fold-delete's N3 bite: a synthetic Drawer-fold-into-Dialog REDs).

## The ConfirmDialog preset (consumer composition)

- The confirm flow is a glass `<DialogContent surface="glass" :show-close="false"
  @escape-key-down @interact-outside>` + a `<DialogHeader>` title/description + a
  `<DialogFooter>` cancel/confirm `<Button>` pair, with the loading dismiss-guard
  `preventDefault`ing the reka dismiss intents in-flight. Demonstrated inline in the demo
  `feedback/confirm-dialog` story — the library ships no ConfirmDialog component (presets
  live in consumers).

## Obligations (ride the B-close gestalt ceremony — W-REFLECT / W-GESTALT-LEDGER-FILE)

- **Edge-slide π** — `placement=right|bottom` slide byte-identical to the retired Sheet
  frame-series, both modes, Chrome + real WebKit (Playwright-WebKit per SAF-1; the
  visible-Metal confirm owed at reflect). Paired A/B capture (folded Dialog side vs the
  retired Sheet frame-series).
- **Focus-trap + focus-return π** — the fold inherits reka's FocusScope; open traps focus,
  close RETURNS it to the trigger. The Modal-Dialog focus-RETURN divergence on stable
  Safari/WKWebView (SAF-1 — reka's FocusScope focus→body) is the SAME real-device run
  W-OVERLAY-UNION owes; captured together.
- **N3 fence π** — Drawer's live-behind non-modal focus model UNCHANGED by the placement
  fold (a Drawer over a live surface stays interactive behind).
- `proof:ba-gestalt` overlay-band verdict re-earned on a fresh capture.
