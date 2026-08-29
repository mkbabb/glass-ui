# LANE γ — UNIT 6 · THE γ π-CURE · R5 · R6 · R7 · R8 · R12

**Seat:** `claude-opus-5[1m]`, asserted at step 0 and `&&`-gated into every command below.
**Session:** 2026-08-28. **Base:** `ebb58a0f` (the π band's own landing commit).
**Scope:** the five γ-owned defect routes of `2026-08-25-pi-band/PI-CENSUS.md` §3 — four
cures in the handmark family (R5–R8) and one prose strike on a committed γ record (R12).
**This seat commits nothing.** The tree is shared; the driver commits.

---

## §0 · STEP-0 BASELINE, BANKED BEFORE ANY BYTE

```
HEAD                      ebb58a0f
git status --porcelain    0 lines
untracked (enumerated)    none
git diff -U0              /tmp/bk-lanegamma-baseline-1787938441.diff  (0 bytes)
receipt                   seats:60 active:46 reserved:5 worstCase:51 remaining:9
                          external:11 bound:13 armOnly:2 unbound:45 drift:0
                          rosterSha256:282d05cf violations:0
handmark gates at base    2 files · 47 passed · REAL_EXIT 0
```

The tree was **clean** at open. Everything in `git status` at close that is not in §6's
fence belongs to a concurrent lane and was never read as this seat's own.

---

## §1 · WHAT THE CENSUS SAID, VERIFIED ON DISK BEFORE CUTTING

Read in full first: `2026-08-25-pi-band/PI-CENSUS.md` (344 lines, committed `ebb58a0f`)
and `2026-08-25-pi-band/gamma-handmark/PI-BATTERY-gamma-handmark.md` (429 lines). Then
the three subject files and the two gates. **Every coordinate the census gives was
checked at its line number before a byte moved** — all five landed exactly:

| route | census site | on disk at `ebb58a0f` | verdict |
|---|---|---|---|
| R5 | `stroke.ts:86` | `stops.push(i === 0 \|\| i === samples ? \`${i}\` : …)` — verbatim | **CONFIRMED** |
| R6 | `HandMark.vue:294-301` + `:335-343` | `maskUnits="userSpaceOnUse" x="-100%" y="-100%" width="300%" height="300%"`; `.hm-mark { position:absolute; width:100%; height:100% }` under `.hm { display:inline; position:relative }` | **CONFIRMED** |
| R7 | `HandMark.vue:101-114` | `slotRects()` — `setStartBefore(content[0])` / `setEndAfter(content[last])` over the host's CHILD NODES | **CONFIRMED** |
| R8 | `HandMark.vue:256` | `window.addEventListener("scroll", onScroll, { passive: true })` | **CONFIRMED** |
| R12 | `lanegamma-unit4/RECORD.md` §3 | the 0.8013 derivation and its *"never diluted"* conclusion; §5's table cell `derived 0.8013 ⇒ share 1.000` | **CONFIRMED** |

The three detector gaps the census names were also confirmed, because they are what the
cure has to close and not merely what it has to fix:

```
grep -rn minJerk src tests tests-visual demo   → 4 hits, ALL in src/. Zero in tests/.
g-hm-layer.test.ts:169  G-HM-LAYER 2 reads ringAxes() geometry; the string "mask"
                        never appears in the file.
g-hm-mark.test.ts:69 · g-hm-layer.test.ts:85   both stub Range.prototype.getClientRects
                        to a hand-authored list in which a wrapper CANNOT double-count.
```

---

## §2 · THE ACT LEDGER

Order was **detectors first**: every arm was written and run against the **uncured**
tree, so born-RED is an observation at this seat and not a claim about one. No
scratch-copy was needed — the cure had not landed yet, which is the honest form of the
same law.

### 2.1 · BORN-RED, RUN AT `ebb58a0f` + gates only

```
npx vitest run tests/components/custom/handmark --reporter=verbose
REAL_EXIT=1        Test Files 2 failed (2)        Tests 10 failed | 48 passed (58)
```

Ten arms, every one a defect route. Verbatim, from `/tmp/gamma6-bornred.txt`:

```
R5  easing(1) of linear(0, 0.001 4.167%, …, 0.995 91.667%, 0.999 95.833%, 24):
      expected 24 to be close to 1, received difference is 23, but expected 5e-10
R5  easing(1) of linear(… , 12): expected 12 to be close to 1  (samples=12)
R5  easing(1) of linear(… , 60): expected 60 to be close to 1  (samples=60)
R5  stop output 24 is outside [0,1]: expected 24 to be less than or equal to 1
R6  mask x="-100%" is a PERCENTAGE of the SVG's own box — an inline host resolves that
      box to 0px on wrap and the window has zero area: expected '-100%' not to match /%/
      ×4 (underline · strike · circle · highlight)
R7  <del> over 1 line rect emitted 2 marks: expected [ …(2) ] to have a length of 1
      but got 2
R8  the scroller's event never reached the mark: a non-bubbling scroll is heard on the
      document in the CAPTURE phase, not on window: expected [ 'hm-mark' ] to include
      'hm-mark--settling'
```

The R5 line reproduces the census's own reading of the live animation
(`… 0.999 95.833%, 24 100%)`) from the generator alone — a terminal stop with no
percentage takes 100%, which is why the emitted `24` and the compositor's `24` are the
same number.

**One arm was born-RED for the wrong reason and is disclosed rather than counted.** The
first draft of *"the profile is minimum-jerk between its ends"* asserted the quarter
value as `5/64`; the quintic's true quarter is `53/512 = 0.103515625`. That was this
seat's arithmetic, not a defect — the constant was corrected and the arm re-run before
the cure, which is where the honest **10** comes from (an uncorrected count would have
read 11).

### 2.2 · R5 — `src/components/handmark/stroke.ts` · the terminal stop

The branch is **deleted**, not patched. Every stop is now emitted the same way — the
profile's own value at its own input — so `easing(0) = 0` and `easing(1) = 1` hold **by
construction**: `10t³ − 15t⁴ + 6t⁵` is exactly 0 and exactly 1 at those ends. An
endpoint special case is a second expression for a quantity the loop already has, and
the two can disagree; they did.

```diff
-        stops.push(i === 0 || i === samples ? `${i}` : `${round(v)} ${round(t * 100)}%`);
+        stops.push(`${round(v)} ${round(t * 100)}%`);
```

Cost: two stops gain an explicit `0%` / `100%`, which the grammar already permitted and
which no longer has to be inferred. **Detector landed:** `G-HM-MARK 8 · DRAW PROFILE`,
which parses the EMITTED `linear()` into its (output, input%) table, evaluates its
endpoints (u = 0 and 1) across `samples ∈ {12, 24, 60}` and its interior (u = ¼ and ½)
at the default 24, and holds every stop inside [0,1] on a monotone clock. The ¼ arm exists so an easing of `linear(0, 1)` cannot satisfy the
endpoint arms. **`minJerk` now has test references; the hole the census named is shut.**

### 2.3 · R6 — `HandMark.vue` · the mask window, in real units

The window is now the mark's own bounds, in the same user units the geometry is emitted
in, opened by the guide's half-stroke (the round cap's reach, comfortably past the
ribbon's half-nib) plus one pixel of antialias, and rounded **outward** to the same three
decimals the `d` strings carry — so the window can only ever be wider than the ink it
gates, never a hair narrower.

```
new: function maskWindow(points, stroke): Frame     (HandMark.vue, module-local)
     Mark gains `window: Frame`; geometryFor returns it for all four shapes
     template: :x="m.window.x" :y="m.window.y" :width=… :height=…  (was -100%/300%)
```

Emitted, measured at this seat over a two-line 30.1px mount (`Hpqjy really matters`):

```
underline   x=34.92    y=90.416  w=253.174  h=10.102   |  x=-5.714  y=129.771 w=162.028 h=8.886
strike      x=34.92    y=75.819  w=253.174  h=10.102   |  x=-5.714  y=115.174 w=162.028 h=8.886
circle      x=-3.397   y=60.551  w=322.027  h=40.83    |  x=-23.034 y=99.529  w=199.772 h=41.765
highlight   x=20.296   y=58.791  w=279.221  h=50.962   |  x=-18.381 y=98.886  w=186.411 h=50.977
```

Two marks over two line rects, four shapes, every window finite and non-degenerate.
**Detector landed:** `G-HM-LAYER 2` gains an arm that reads the **RENDERED** window off
the DOM for all four shapes — `maskUnits` is `userSpaceOnUse`, no dimension carries a
`%`, area is positive, and the window **contains the emitted ink bbox on all four
edges**. That is the reading the doctrine *"extent is fixed by geometry alone"* was
missing: on a live surface extent is fixed by the mask window, and a window authored in
percentages of a collapsible box is not geometry.

**Not touched, and stated:** `.hm-mark`'s own `width:100%/height:100%` still resolves to
`0px` on an inline host in Chromium. It no longer masks anything away — the SVG carries
`overflow: visible` and the coordinates are absolute — so this is a measurement the
window cure makes harmless, not a second defect papered over. π-RERUN-R6 is what
converts that from an argument into a reading.

> **[2026-08-29 · STRIKE — THE READING CAME BACK AND IT REFUTES THIS PARAGRAPH.]**
> π-RERUN-R6 ran (`2026-08-25-pi-band/rerun/PI-RERUN-BATTERY.md` §π-RERUN-R6, committed
> `dfe6971f`) and SPLIT: the window cure is **CURED-GREEN** — all 10 masks carry four
> finite user-space numbers with area > 0 — but the ring on `threefold` is **still never
> painted**, and the mounts that fail to paint are *precisely and only* the four whose
> `.hm-mark` box resolves `width: 0`. **"Harmless" is wrong.** A zero-width SVG viewport
> renders nothing at all, whatever window it carries: an SVG's own viewport is a clip
> the ink never reaches, not a coordinate space `overflow: visible` can rescue. Measured
> at 1440 dark (`rerun/pi-RERUN-R6-RING-reservation-1440-dark-cured.json`) —
> `pays in` 162.04 ✓ · `rose` 61.48 ✓ · `violet` 73.78 ✓ · `drawn` 139.29 ✓ ·
> **`Friday` 0 ✗ · `threefold` 0 ✗ · `Hpqjy` 0, 0 ✗** — and identically at 390×844×3, in
> both themes. STRIKE and CIRCLE are blank at rest on `/motion/handmark`. **WHAT
> SURVIVES:** the window cure itself and every arm that proved it; the box was a SECOND
> defect of the same class standing behind the first, and it is cured in **unit 7**
> (`../2026-08-10-lanegamma-unit7/RECORD.md`), which gives the frame the line rect it was
> made for.

### 2.4 · R7 — `HandMark.vue` · the wrapper double-rect

`slotRects()` no longer ranges over the host's child nodes. It walks the slot's **text
nodes** and ranges over each one's contents, which admits no element border box at any
nesting depth, then merges the rects **per line box** — two rects belong to one line iff
they share more than half a line vertically. The merge puts back the one thing a single
range gave for free, and gives it for nested inline markup too, which the single range
never handled either: `The <em>part</em> that` inside a `<mark>` was already three rects
plus an element box before this.

`slotRects` now returns `Frame[]` in viewport coordinates rather than `DOMRect[]`;
`measure()` reads `r.x` / `r.y` instead of `r.left` / `r.top`. Same arithmetic, one type.

**Detector landed, and the stub made honest.** Both gates' measurement frame is now one
module — `tests/components/custom/handmark/measure-frame.ts`, not a test file, holding no
seat — whose `Range.getClientRects()` returns what an engine returns: **the border box of
every element FULLY CONTAINED in the range, in addition to the text rects**. A range
anchored on child nodes therefore reports a `<del>`/`<mark>` twice per line; a range
whose endpoints sit inside a text node contains no element and yields text rects alone.
`G-HM-MARK 3` gains the arm that reads it. The element branch **stays live after the
cure** — it is what REDs if the component ever goes back to ranging over child nodes.

This also removes the duplicated `domRect` + `installMeasure` blocks from both gate
files; the rect shape is stated **once**, honestly, which is the only place it can stop
drifting.

### 2.5 · R8 — `HandMark.vue` · the listener, and the polarity it exposed

Two changes, both required, one of them disclosed rather than smuggled.

**The wiring.** Scroll events do not bubble — they are dispatched at the scroller and
stop there — but every scroller in the document lies on the capture path from the
document down. One capture listener hears every pane on the page, the document's own
included, **with no ancestor to guess at and no demo-shaped selector anywhere**:

```diff
-    window.addEventListener("scroll", onScroll, { passive: true });
+    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
```

**The signal.** `window.scrollY` answers for the document alone, so the handler is now
read from the WORD'S OWN viewport motion — `root.getBoundingClientRect().top` — which is
the only reading that knows which of the document, an app shell's pane, a dialog or a
nested pane inside it actually moved. A mark works in ANY scroller because it never asks
which one it is in.

**THE POLARITY FLIPS, AND IT IS A BEHAVIOUR CHANGE, NOT A REWIRE.** The arithmetic below
the reading is untouched (`delta = y − lastY`, `lag = sign(delta)·min(1.5, |0.06·delta|)`,
`transform: translateY(−lag)`), but `y` reverses sense: scrolling down **raises**
`scrollY` and **lowers** `rect.top`. The old expression displaced the mark **with** the
content — reading as a lead. The new one displaces it **against** — the mark stays behind
as the word moves up, which is what *"the mark trails its word"* means and what "ink-lag"
was named for. **Nobody could have seen either, because the mechanism never engaged**;
the census's own 0.00 px was *"satisfied only because the mechanism is inert"*. This seat
did not tune the amplitude and did not touch the 1.5 px cap the census names as capped by
construction.

**Detector landed:** `G-HM-LAYER 4 · TRACKING` mounts a mark inside an ordinary `<div>`
and dispatches a `scroll` on it **exactly as an engine does — `bubbles: false`** — then
reads the `hm-mark--settling` class off the mark. Probed first, so the arm is not a hope:
happy-dom's capture path delivers that event to a document capture listener (**1**) and
not to a plain window listener (**0**).

**The kill criterion becomes live for the first time.** The census recorded π-SCROLL's
DELETION trigger as *not met* — *"detachment is not observed, because nothing moves"* —
and routed the disposition of an inert mechanism to the owner. It is no longer inert.
π-RERUN-R8 is the first run in which the criterion can be judged at all, and this seat
does not pre-judge it.

### 2.6 · R12 — the prose strike, in place and dated

`docs/tranches/BK/execution/2026-08-10-lanegamma-unit4/RECORD.md` gains two dated
brackets, **nothing deleted**: one under §3's *"Measured, not argued"* paragraph and one
under §5's `Status: ENQUEUED — RECEIPT OWED` clause. They cite the census
(`PI-CENSUS.md` §3 row R12), the battery's §5/§10 row 4, and the three run logs, and they
carry the measured line verbatim:

```
PI blob paintable=[0.188,0.188]-[0.813,0.702] paintableShareOfInterior=0.557
```

**0.557, not 1.000.** The paintable rect is not centred on the short axis the way §3
assumes — its vertical span runs `0.188 → 0.702`, so the clip reaches ≈30% of the box from
below and the sampled 0.76 interior is **not** wholly inside the visible band. The
instrument is untouched and needed no defence: §5's own conditional predicted this exact
outcome in as many words, and the receipt bears it out — green arm `coverage 0.156 /
paintedShare 0.280`, flood plant biting the MAX at **0.997** on the same denominator.
**`BLOB_COVERAGE_MAX` is not touched.** The defect was prose; prose is what was struck.

---

## §3 · WHAT THIS SEAT DID **NOT** DO

```
· NO CURE IS π-VERIFIED. Four paint-changing cures, zero pixels observed. Every one is
  enqueued in PI-QUEUE.md and each stays UNPROVEN until re-captured GREEN at the
  singleton seat. This record claims headless arms and emitted attributes — nothing more.
· No browser, no dev server, no capture, no getContext(). π ENQUEUES; it does not run here.
· No git add / commit / stash / checkout. Baseline banked before the first byte.
· The two colour-window findings π-BAND recorded are NOT cured and are NOT this unit's
  routes: (a) the dark arm paints ≈0.485 against a [0.42,0.48] window because the card's
  `paper-grain-overlay` composites over the band and lifts it ≈+0.045 L; (b)
  `oklch(0.86 0.16 270)` is outside sRGB and gamut-maps to a painted chroma of 0.071,
  under the cell's own 0.08 floor. Both survive a fixed draw. Carried OPEN to #51, named
  here so they cannot evaporate behind four green cures.
· π-SCROLL's kill criterion is NOT disposed of. It is made judgeable and handed on.
· `.hm-mark`'s 0px inline box is not "fixed" — it is made irrelevant by the window cure,
  and π-RERUN-R6 is what proves that rather than argues it.
  [2026-08-29 · STRUCK. π-RERUN-R6 proved the opposite: the 0px box is load-bearing and
   is the whole of the still-RED half. See the §2.3 bracket. Cured in unit 7.]
· No aurora byte. R9–R11 are the driver's banked rulings, not this unit's cures.
· dist/ was NOT rebuilt. See §5 — it is 18 days stale and shared with three live lanes;
  rebuilding it would bake four lanes' uncommitted edits into a shared artifact.
```

---

## §4 · VERIFY, VERBATIM, WITH REAL EXIT CODES

Assertion `&&`-gated; no figure below is a piped tail's.

```
MODEL_ID_ASSERT=claude-opus-5[1m]  →  GATE_OPEN

npx vue-tsc --noEmit                              VUE_TSC_SRC_EXIT=0
npx vue-tsc --noEmit -p tsconfig.test.json        VUE_TSC_TEST_EXIT=0

npx vitest run tests/components/custom/handmark   REAL_EXIT=0
    Test Files  2 passed (2)
         Tests  58 passed (58)          ← 48 standing + the 10 born-RED, flipped

npx vitest run                                    BATTERY_REAL_EXIT=1
    Test Files  2 failed | 222 passed (224)
         Tests  2 failed | 2122 passed | 10 expected fail (2134)

node scripts/gate-register.mjs                    RECEIPT_REAL_EXIT=0
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13
armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

**THE RECEIPT DID NOT MOVE.** Byte-identical to §0's baseline and to unit 5's. The three
new arms landed inside two ORDINARY vitest files and one non-test helper module; no seat
was minted, no roster name added, `drift:0`.

### 4.1 · THE BATTERY LINE, WITH ITS TWO REDs ATTRIBUTED

**γ-owned failures: ZERO.** Both REDs are one class and neither is any lane's source
byte — they are **build artifacts 18 days stale**, and both were RED at `ebb58a0f` before
this seat wrote anything. Proven, not asserted:

| RED | reads | proof it is foreign and pre-existing |
|---|---|---|
| `tests/public-surface.spec.ts` › *ships exactly the style closure plus the three generated members* | `dist/` | expects `components/dock/styles/run.css`, `dist/` ships `overflow.css`. `git cat-file -e HEAD:src/components/dock/styles/run.css` → **exists**; `…/overflow.css` → **absent at HEAD**. `dist/components/dock/styles/overflow.css` mtime **2026-08-10T14:07:18** |
| `tests/gates/boot-graph.test.ts` › *the dist-demo it measures is NEWER than every source it is built from* | `dist-demo/` | `dist-demo/index.html` built **2026-08-25T10:20:39**; newest source **excluding every working-tree modification and every untracked file** is `src/components/_shared/control.ts` at **2026-08-25T11:08:12** — stale by 48 minutes inside the committed tree alone, three days before this session |

**Owner: build freshness** (`npm run build`, `npm run demo:dist:build`) at the driver's
close — not α, not β, not γ, not δ. The standing figure moved with the batch as the
dispatch said it would (last quiesced read `2015 passed | 7 xf`); the movement is the
concurrent lanes' landed arms plus this unit's ten.

### 4.2 · `verify:package` — RED, AND NOT AT THE ARM THE DISPATCH NAMED

```
node scripts/verify-export-types.mjs              VERIFY_PACKAGE_REAL_EXIT=1
Error: Invalid package artifact:
components/handmark/geometry.d.ts: bare declaration reference @mkbabb/pencil-boil
requires direct dependency ownership of @mkbabb/pencil-boil
```

Stated, never papered. `dist/components/handmark/` on disk holds `geometry.d.ts`,
`brush.d.ts`, `freehand.d.ts`, `ink.d.ts`, `noise.d.ts`, `texture.d.ts`, `types.d.ts`,
`constants.d.ts`, `composables/useHandMark.d.ts` —
**nine files that do not exist at HEAD**, from a build stamped **2026-08-10T14:07:28**,
i.e. from *before* #51's twelve-files-to-three cut (`5a69ed9f`). `@mkbabb/pencil-boil` is
not in `package.json` at all. Same stale-artifact class as §4.1, same owner.

**G-BUNDLE-RATCHET was NOT reached.** `verify-export-types.mjs:811` throws on the
declaration failures collected at `:809`, and `ratchetEvidence()` is called at `:828`,
behind both that throw and the `--pack` flag. The dispatch's ruling — that the ratchet
arm REDs lawfully by route, carrying β0's +1215 against the driver's −71 — **stands
un-contradicted and un-observed by this seat**, and this seat does not claim to have seen
it either way.

---

## §5 · π — ENQUEUED, NOT DISCHARGED

`PI-QUEUE.md` beside this file carries **π-RERUN-R5 · R6 · R7 · R8**, each with the exact
arm, route, viewport, engine and artifact set the census used, so the re-capture is a
DELTA against banked pixels rather than a fresh opinion. **Every paint-changing cure in
§2 is unproven until its cell returns GREEN.** Said plainly: this unit fixed four defects
in source and proved four detectors; it has not yet seen a single mark paint.

---

## §6 · FENCE

Written by this seat, and nothing else:

```
src/components/handmark/stroke.ts                              R5
src/components/handmark/HandMark.vue                           R6 · R7 · R8
tests/components/custom/handmark/g-hm-mark.test.ts             R5 · R7 arms
tests/components/custom/handmark/g-hm-layer.test.ts            R6 · R8 arms
tests/components/custom/handmark/measure-frame.ts     (new)    the honest rect shape
docs/tranches/BK/execution/2026-08-10-lanegamma-unit4/RECORD.md R12 — two dated brackets
docs/tranches/BK/execution/2026-08-10-lanegamma-unit6/{RECORD,PASTE-BLOCKS,PI-QUEUE}.md
```

Untouched and unread as this seat's own: every dock, search, overlay-plate,
a11y-override, demo-story, aurora, blob and δ surface in the working tree; both formerly
fenced files (`src/styles/glass/material.css`, `tests/styles/material-css-syntax.test.ts`)
— tracked and attributed since `2cfc1124`, still not lane surfaces; every other lane's
records; `dist/`, `dist-demo/`, `.bundle-ratchet`. No export key moved. Two throwaway
probe files were written under `tests/components/custom/handmark/` to establish
happy-dom's capture semantics and to read the emitted mask attributes; **both were
deleted in the same command that ran them** and neither appears in `git status`.
