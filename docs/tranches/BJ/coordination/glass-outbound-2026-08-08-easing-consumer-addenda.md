# glass-ui → value.js · keyframes.js · fourier-analysis — the easing addenda (BK #85 W-EASING)

**From** glass-ui BK Φ5 row #85 (W-EASING) · **date** 2026-08-08 · **spec of record**
`docs/tranches/BJ/addenda/2026-07-24-refinement/COMPONENT-WAVES-TERMINAL-3.md` §LANE
easing §9 (ROUTED) · roster cell `TERMINAL-ROSTER.md:235`.

Under the consumer-updates ruling, **consumer dependence never preserves an obsolete
API**: glass-ui cuts on merit and each consumer updates via a marked addendum in ITS
OWN tranche. This file is that addendum's inbound half — one page, three repos, no
edits made anywhere outside glass-ui.

The census below was re-grepped at the adjudication seat (`5677ca43`) and is carried,
not re-derived: **11 consumer code files across the three repos.**

---

## 1 · What changed on `@mkbabb/glass-ui/easing`

| before | after | why |
|---|---|---|
| `EasingPicker` + `EasingConfigurator` | **`EasingCurve`** (display) + `EasingPicker` (editor) | the subpath published editors only; three repos forked the display half |
| `EasingConfigurator.vue` | **DELETED** | 62 lines, zero state, dropped 3 of 7 props, printed the literal a second time, **0 consumers in seven repos** |
| props `mode`/`preset`/`steps`/`term`/`readout`/`playback`/`label` (7) | `initial` / `playback` / `label` / `surface` (**4**) | only `mode` was watched; the other three were read once, so they were initial state wearing a prop's name |
| fitted per-edit `viewBox` | the constant `-0.1 -0.1 1.2 1.2` | the frame was a function of the curve: two plots on one page rendered 9% apart and every chrome dimension moved −18% under a drag |
| `role="group"` on the canvas | **`role="img"`** on `<EasingCurve>`'s plot | see §2 — this is the 7.0.0 regression, reversed |
| `data-testid` ×8 | `data-slot` | one published seam, matching the rest of the library |
| hardcoded `.glass-card` plate + inline sizing | `surface?: "card" \| "bare"` + overridable CSS | see §2 — this is what the `backdrop-filter: none` / `!important` tax was buying |
| sampled 241-command staircase | constructed treads + risers, ≤ `2n+1` commands | a sampled staircase cannot have a crisp riser |

`useEasingPicker` keeps its **exported symbol unchanged** (only its file moved,
`composables/useEasingPicker.ts` → `usePicker.ts`), so the `EasingPickerValue` type
family consumed downstream is untouched. `bezierPresets`, `steppedEase`, `jumpTerms`,
`CubicBezier` and `parseTimingFunction` remain value.js's — glass-ui re-implements no
curve math, and `MAX_OVERSHOOT` stays 0.6, so no preset breaks.

---

## 2 · value.js — **MARKED ADDENDUM, NOT OPTIONAL** (6 code files)

`GradientVisualizer.vue` · `GradientEasingEditor.vue` · `easingCatalogue.ts` ·
`EasingAuthoringStage.vue` · `useGradientModel.ts` · `useGradientCSS.ts`.

**(a) The live `role` regression — dead at HEAD, fixed by this cut.**
`EasingAuthoringStage.vue` selects `svg[role='img']` in its Law-3 CSS (`:104`) and in
`syncVbRatio()` (`:49`). glass-ui 7.0.0 changed that canvas to `role="group"`, so both
have been dead and `--vb-ratio` has been frozen at its seed value ever since. The plot
is `role="img"` again — but it is now a DIFFERENT element (`<EasingCurve>`'s svg, at
`[data-slot="easing-curve"] svg`), so re-verify the selector rather than assuming it
resurrects.

**(b) All three seat-laws retire at adopt.**
- *Law 1 (one column)* — the editor is one column; the `lg:grid-cols-[1fr_18rem]` fork
  is deleted.
- *Law 2 (`backdrop-filter: none; -webkit-backdrop-filter: none`, `:97-98`)* — replaced
  by `surface="bare"`, which renders no plate. **Delete the forbidden prefix pair with
  the law.**
- *Law 3 (the rAF `--vb-ratio` reader + `!important` ×3)* — the frame is constant, so
  there is nothing left to measure. Delete the reader and all three `!important`s.

**(c) `data-testid` → `data-slot`** at `:88` (and any sibling selector): the editor
root is `[data-slot="easing-picker"]`, the plot `[data-slot="easing-curve"]`, the ink
stroke `[data-slot="easing-curve-stroke"][data-tone="ink"]`.

**(d) The kf-wider named-map question is a value.js CATALOGUE gap**, not a glass-ui
one — recorded here so it stops being re-raised at the component boundary.

---

## 3 · keyframes.js — MARKED ADDENDUM (5 code files)

`ChannelOptions.vue` · `TimingFunctionPanel.vue` · `EasingTarget.vue` ·
`useEasingDemo.ts` · `EasingSidebar.vue`.

**The S1 cure comes FIRST: `@mkbabb/glass-ui` is an UNDECLARED dependency** — 0 hits in
`package.json` AND `package-lock.json`, with 7.0.0 installed on disk in `node_modules`.
Six BK lanes confirmed this independently. Declare it before adopting anything below.

Then: the 7 → 4 prop cut (any `mode=`/`preset=`/`steps=`/`term=`/`readout=` setter
becomes `:initial="{ … }"`), the `data-testid` → `data-slot` seam, and — for anything
that only DISPLAYS a curve — `<EasingCurve>` in place of a hand-rolled plot.

---

## 4 · fourier-analysis — MARKED ADDENDUM

Adopt `<EasingCurve>` and **delete the fork**: the 98-line name-colliding
`EasingPicker.vue`, `EasingCurvePreview.vue` (41 lines), and the duplicate `EasingFn`
in `easings.ts` (127 lines).

One note on the shape, because it is the one place this cut deviates from the spec's
letter: `EasingStroke` carries **`d` (a path), not `fn` (a callable)**. A display unit
handed a callable can only SAMPLE it, and sampling a staircase is exactly the defect
this lane deleted — 241 commands that still could not draw a crisp riser. The owner of
a curve knows whether it is smooth or stepped and hands over the exact path;
`useEasingPicker` publishes both (`bezierPathD`, `stepPathD`). A consumer holding only
control points builds `M 0 1 C x1 y1, x2 y2, 1 0` with the SVG-Y flip (`y → 1 − y`),
which is what the fork already computes.

---

## 5 · What did NOT change, and may not be relayed as if it had

- The **boundary law**: every curve callable, the 30-preset catalogue, the 4 jump
  terms and the literal parser are value.js's. glass-ui composes them.
- The **PRM arm**, byte for byte.
- The **`--motion-accent` → `--viz-legendre` accent chain**, byte for byte — it moved
  from the editor root to `<EasingCurve>`'s root (the unit that actually strokes with
  it), and the declaration text is identical. A consumer still overrides
  `--motion-accent` from any ancestor.
- `MAX_OVERSHOOT` (0.6) and the `./easing` subpath name.

## 6 · Owed back to glass-ui

Nothing blocking. If any of the three repos finds a selector this cut broke that is
not listed in §2(c), reply on this thread and it enters #85's routed table rather than
being fixed silently at the consumer.
