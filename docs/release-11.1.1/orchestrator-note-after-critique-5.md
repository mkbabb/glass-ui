# The orchestrator's line on critique 5 (2026-11-17). BINDING for fix seat 6 and critics 6 on.

Critique 5's three defects stand as written, with their cures. This note adds three of its open gaps to fix seat 6's list, says how defect 1 is to be found, and books the rest.

## Defect 1: the WebKit 390 stall is a fault of the branch until shown otherwise

The record places the stall at the close of a rested Accordion or Collapsible, on the branch only (76 of 146 reopen films; 0 of 108 "closed while it opens" films; 0 of 40 on v11.1.0 under the same probe). Treat it as a paint fault of row 5, cured in `src`.

- **Bisect, do not guess.** `critic-5/probe/stall5.probe.ts` is the reproduction (12 of 20 reopen cells stall in ten repeats). Run it under `guarded --exclusive webkit` on trees that take the branch's `src` commits against v11.1.0 one at a time, or by halves, and name the commit whose change brings the stall. Read what that change does at the close of a rested region (a transition on a property WebKit cannot composite, a layout read in a frame callback, a `will-change` or filter added to the moving box, an observer that fires per frame).
- **Cure in the source**, keeping row 5's claim (the region turns from where it is). If the cure costs the claim, record both readings and stop: that is a ruling for the orchestrator, not a trade the fix seat makes.
- Only if the bisect shows that the film itself loads the page (the stall present on v11.1.0 under the branch's spec, absent under v11.1.0's), restate the film, and say so with the readings.
- Witness: the four disclosure reversal cells read twenty interleaved repeats in WebKit 390 with no unread film and no failure; the gate's part B passes there three times running; v11.1.0's reds stay red.

## Added to the list (critique 5's open gaps B, E, F and G)

- **B. Every control that scales on press keeps scale 1 under reduced motion.** The ruling after critique 2 names every such control; three still scale: a pressable `Card` (`card/styles.css:197`), a `SortableList` handle (`sortable-list/styles.css:186`) and the Dialog close button's plate (`dialog/styles.css:136-139`). Each shows its press by fill, as the Button does. Witness: the existing `press` cell gains these three controls (scale 1 and transform none on every held frame, a fill step), RED on v11.1.0, GREEN on the tip; the CHANGELOG's reduced-motion sentence names them with the command palette's rows (defect 3).
- **E. `gate.sh`** says how many parts it runs (four), and serves on a port it chooses free, never reusing a server it did not start.
- **F and G. Comments in `src` describe the code as it is.** Correct the stale comments (`Toast.vue:124`, `animations.css:146`, the comment above `glass-reveal-out-reduced`, `reveal.css:120`) and remove the internal phrases (`a11y-overrides.css`'s path to a tranche document; `sheet/styles.css:538`'s "this round" and "the sheet family's next π"). No behaviour changes; the bundle ratchet is rebound once after the last source commit if bytes move.

## Booked for 11.1.2, not this patch

- A. A dock Select picked at 1440 hops 10 px on its first exit frame (v11.1.0 does the same).
- C. The Dialog leaves on three channels (opacity, about 5 % scale, an 11 px drop); with the specular and hover work.
- D. A pressed glass Button's fill step under reduced motion is about 2 to 3 L*; 11.1.2 sets it to a step as visible as a dock seat's press (α 0.20 and brightness 0.96).
- H. Internal tokens moved without a CHANGELOG line: they are internal; nothing to name.
- I. `release-11-0-1-critic-1`'s two light WebKit titles throw in `plateOf` on both trees: a witness fault, fixed with 11.1.2's spec sweep.
- J, carried: the routes not driven; a drag-dismissed Sheet under reduced motion snaps; real Safari for the press, the drag and the firm plate; row 13 (b). The CHANGELOG heading takes its date at the close.
