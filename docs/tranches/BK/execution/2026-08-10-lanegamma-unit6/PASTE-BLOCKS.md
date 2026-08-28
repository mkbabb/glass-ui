# LANE γ — UNIT 6 · PASTE-BLOCKS

Literal `⊕ⁿ` / `<SHA>` placeholders. The driver stamps them at the commit; nothing here
claims a number this seat could not read.

---

## 1 · COMMIT MESSAGE

```
fix(handmark): cure the four γ-owned π routes — the easing that ended at 24, the mask window that resolved to nothing, the wrapper's second chisel, and the listener that heard the wrong scroller

The π band's γ/handmark cell ran the component live for the first time and found it
paints nothing: 6 of 10 cells DEFECT-ROUTED, four root defects, and a story whose own
Replay button erased the mark it documented. This unit cures all four, closes the three
detector gaps that let them ship, and strikes one refuted paragraph in a committed γ
record. Every arm was written and run against the UNCURED tree first — born-RED is an
observation here, not a claim.

· R5 — THE EASING ENDED AT 24. `stroke.ts:86` emitted the loop INDEX as the terminal
  linear() stop, so easing(1) = samples and a draw animating stroke-dashoffset to 0 with
  fill:both came to rest at −23 dash periods: the guide lies wholly inside the dash gap,
  the mask renders empty, and the only ink is the round linecap bleeding back over each
  guide end. Measured on five guides in two engines, the ratio is −23.000 every time.
  The branch is DELETED, not patched — every stop is now the profile's own value at its
  own input, so easing(0)=0 and easing(1)=1 hold by construction, because 10t³−15t⁴+6t⁵
  is exactly 0 and exactly 1 there. An endpoint special case is a second expression for
  a quantity the loop already has, and the two can disagree. They did.

· R6 — THE MASK WINDOW WAS A PERCENTAGE OF A BOX THAT RESOLVES 0px. `-100%/300%` under
  maskUnits="userSpaceOnUse" resolves against the SVG's own box, and .hm-mark is
  width:100% inside a display:inline host: 0px for every <del>, every <mark>, and every
  wrap in Chromium; 9.05px at 1920. Zero area masks perfect geometry away. The window is
  now the mark's own bounds in the SAME user units the geometry is emitted in, opened by
  the guide's half-stroke and one pixel of antialias, rounded OUTWARD so it can only ever
  be wider than the ink it gates. Independent of R5 and proven so: with dashoffset forced
  to 0 by a real hover the ring still painted nothing.

· R7 — Range.getClientRects() RETURNS THE WRAPPER BOX TOO. Through a <del>/<mark> the
  range reported the element box AND its text box, so every line was chiselled twice and
  the duplicate's delay chained behind the original's duration — 4 marks over 2 line
  rects. slotRects() now walks TEXT NODES, which admits no element box at any nesting
  depth, then merges per line box. The merge puts back the one thing a single range gave
  for free, and gives it for nested inline markup too, which the single range never
  handled either.

· R8 — SCROLL EVENTS DO NOT BUBBLE. The ink-lag listener sat on `window` while the demo
  scrolls main.demo-main-scroller, so hm-mark--settling was NEVER applied and the cell
  measured an amplitude of 0.00px against a 1.5px threshold — a pass earned by inertness.
  The listener now sits on the document in the CAPTURE phase, where every scroller's
  event passes on its way to its target: no ancestor to guess at, no demo-shaped
  selector, works in ANY scroller. And the signal is the WORD'S OWN viewport motion
  rather than one scroller's offset, because only the mark's own rect knows which of the
  document, a pane, a dialog or a nested pane inside it actually moved. THE POLARITY
  FLIPS AS A CONSEQUENCE AND IS DISCLOSED: scrollY rises on a downward scroll where
  rect.top falls, so the mark now trails its word instead of leading it — which is what
  "ink-lag" was named for. Nobody could have seen either while the mechanism was inert.

· THE THREE DETECTOR GAPS ARE SHUT, AND THE STUB IS MADE HONEST. minJerk had ZERO test
  references repo-wide; G-HM-MARK 8 now parses the EMITTED linear() into its stop table
  and evaluates it at u = 0, ¼, ½ and 1 across three sample counts. G-HM-LAYER 2 read
  ringAxes() geometry and never a rendered mask window; it now reads the window off the
  DOM for all four shapes and requires it to contain the ink on all four edges. And both
  gates stubbed Range.prototype.getClientRects to a list in which a wrapper COULD NOT
  double-count — the stub now returns what an engine returns, the border box of every
  element fully contained in the range on top of the text rects, stated ONCE in
  tests/components/custom/handmark/measure-frame.ts instead of duplicated in two files.
  The element branch stays live after the cure: it is what REDs if the component ever
  goes back to ranging over child nodes. Ten arms, born-RED at ebb58a0f, all ten green.

· R12 — A DERIVATION REFUTED ON A DEVICE, STRUCK IN PLACE. lanegamma-unit4 §3 derived
  paintableShareOfInterior = 1.000 from the stage clip's geometry; the π-CEILING receipt
  measured 0.557 on all three arms — the paintable rect runs 0.188 → 0.702 vertically, so
  the clip reaches ≈30% of the box from below. Two dated brackets, nothing deleted, both
  citing the census and the run logs. §5's own conditional predicted this exact outcome
  and the instrument needed no defence: the flood plant still bites the MAX at 0.997 on
  the same denominator. BLOB_COVERAGE_MAX is untouched. The defect was prose.

· NOT π-VERIFIED, AND SAID PLAINLY. Four paint-changing cures, zero pixels observed.
  PI-QUEUE.md enqueues π-RERUN-R5..R8 with the exact arms, viewports, engines and
  artifact names the census used, so each is a DELTA against banked pixels. The cures are
  claims until those cells return GREEN. π-SCROLL's kill criterion — DELETION if the mark
  reads as detaching — becomes judgeable for the first time in R8's cell, and the
  disposition stays the owner's.

· CARRIED OPEN, NOT BURIED. π-BAND's two colour-window failures survive a fixed draw and
  are NOT cured here: the dark arm paints ≈0.485 against a [0.42,0.48] window because the
  card's paper-grain-overlay composites over the band and lifts it ≈+0.045 L, and
  oklch(0.86 0.16 270) is outside sRGB and gamut-maps to a painted chroma of 0.071 under
  the cell's own 0.08 floor. Both stay with #51.

VERIFY. vue-tsc 0 and 0. Handmark gates 58 passed, REAL_EXIT 0 (48 standing + 10 flipped).
Battery 2122 passed | 10 xf | 2 failed, ZERO γ-owned: both REDs read build artifacts 18
days stale and both were RED at ebb58a0f before this seat wrote a byte — dist/ ships
components/dock/styles/overflow.css, which is absent at HEAD where run.css exists, and
dist-demo/index.html (2026-08-25T10:20:39) predates src/components/_shared/control.ts
(2026-08-25T11:08:12) with every working-tree modification excluded. verify:package REDs
in the same class, on dist/components/handmark/geometry.d.ts — one of seven files there
that do not exist at HEAD, from a build stamped 2026-08-10, before #51's twelve-to-three
cut; it throws at the declaration arm and never reaches G-BUNDLE-RATCHET, so this seat
does not claim to have observed the ratchet either way. Receipt UNMOVED and byte-identical
to unit 5: seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13
armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0.

Record: docs/tranches/BK/execution/2026-08-10-lanegamma-unit6/
Census:  docs/tranches/BK/execution/2026-08-25-pi-band/PI-CENSUS.md §3 R5-R8, R12
Cursor:  ⊕ⁿ
```

---

## 2 · CURSOR / ⊕-LEDGER BACK-ANNOTATION

```
⊕ⁿ  γ π-CURE LANDED — <SHA>. The five γ-owned routes of the π census close in source:
    R5 (stroke.ts, the terminal linear() stop), R6 (the mask window in real units),
    R7 (text-node ranging, one chisel per line), R8 (document capture listener + the
    word's own rect), R12 (unit-4 §3 struck in place, 0.557 not 1.000). Ten arms born-RED
    at ebb58a0f, all ten green after. Receipt unmoved at seats:60 violations:0.
    OWED: π-RERUN-R5..R8 at the singleton seat — four paint-changing cures, zero pixels
    observed. #51 keeps two colour-window findings the cures do not touch, and π-SCROLL's
    kill criterion is now judgeable for the first time.
```

---

## 3 · ROSTER ROW #51 — the line to append at the landing block

```
| #51 GF-HANDMARK | γ4 landed 5a69ed9f; the π band found it paints nothing (6/10 cells
  DEFECT-ROUTED). γ6 <SHA> cures all four root defects (R5-R8) and closes the three
  detector gaps that hid them. OPEN: π-RERUN-R5..R8 (paint unobserved); the two π-BAND
  colour windows (paper-grain lift ≈+0.045 L over a [0.42,0.48] dark window; hue 270
  gamut-mapping to C 0.071 under the 0.08 floor); π-SCROLL's kill-criterion disposition. |
```

---

## 4 · THE BORN-RED BLOCK, VERBATIM — for anyone who wants to reproduce it

At `ebb58a0f` with only the gate files changed:

```
npx vitest run tests/components/custom/handmark --reporter=verbose
REAL_EXIT=1     Test Files 2 failed (2)     Tests 10 failed | 48 passed (58)

R5  easing(1) of linear(0, 0.001 4.167%, …, 0.999 95.833%, 24):
      expected 24 to be close to 1, received difference is 23, but expected 5e-10
R5  (samples=12) expected 12 to be close to 1
R5  (samples=60) expected 60 to be close to 1
R5  stop output 24 is outside [0,1]: expected 24 to be less than or equal to 1
R6  mask x="-100%" is a PERCENTAGE of the SVG's own box — an inline host resolves that
      box to 0px on wrap and the window has zero area: expected '-100%' not to match /%/
      × underline · strike · circle · highlight
R7  <del> over 1 line rect emitted 2 marks: expected [ …(2) ] to have a length of 1 but
      got 2
R8  the scroller's event never reached the mark: a non-bubbling scroll is heard on the
      document in the CAPTURE phase, not on window: expected [ 'hm-mark' ] to include
      'hm-mark--settling'
```

After the cure, same command: `REAL_EXIT=0 · Test Files 2 passed · Tests 58 passed (58)`.
