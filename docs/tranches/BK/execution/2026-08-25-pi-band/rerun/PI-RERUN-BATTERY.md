# π RE-CAPTURE BATTERY — the twelve cured cells, re-observed

**Seat.** The singleton π re-capture seat, `claude-opus-5`, asserted from its own on-disk
subagent transcript `agent-a33bc18c653ce3648.jsonl` (`&&`-gated on `claude-opus-5*`;
`CLAUDE_MODEL_ID` unset). Tree `/Users/mkbabb/Programming/glass-ui` at **HEAD `ac204dca`**,
`git status --porcelain` = **0** at open and at close. **No `git add/commit/stash/checkout`
was run.** No file was written outside this directory.

**Rig.** ONE browser context, `chrome-devtools` CLI over the daemon already running at this
seat's open (MCP browser tools were absent from this seat's deferred set — see §5.1 — so the
plugin's own sanctioned CLI route was used; **no hand-rolled Playwright**). Chromium
**151.0.7922.174**. Dev server **`vite --host localhost --port 5411`, started and killed by
this seat** (pid 33341); a second throwaway server on **5412** served an archived pre-cut tree
for the two DELTA comparands (§4). The pre-existing `:5400` server was **not touched**.
Port-guard run before the first capture. **Not `dist-demo/`** — every figure below is off the
dev server, declared per the δ-unit-6 queue's own instruction.

**Laws honoured.** Screenshot + `getComputedStyle` only. **`getContext()` was never called on
any canvas** — the canvas census below is by class/attribute, and the GL-context half is
refused with grounds (§5.2). Colour read from captured PNGs in Node through the ONE colour
source (`scripts/lib/paint-arm.mjs` → `oklabFromRgb`); `oklab()`/`oklch()` serialisations are
parsed, never string-compared. Every crop scales the CSS box by the live `devicePixelRatio`
before cropping. Scroll writes carry a ≥500 ms settle (1.2 s in practice) plus screenshot
corroboration. Theme is verified **in-page** (`documentElement.classList`) beside every frame
that names one — the predecessor battery's O1 mislabel is not repeated.

**Coverage.** 12 of 12 enqueued cells OBSERVED (α R1–R4 · γ R5–R8 · δ D1 + D1a + D1d, D2, D3,
D6) · 10 CURED-GREEN · 1 STILL-RED (R2) · 1 SPLIT (R6: mask window green, ring/paint red) ·
0 unattempted. Of the 4 δ NOT-ENQUEUED dispositions: **3 CAPTURED** (δ3-π-4's DELTA comparand,
δ4-π-1's pre-cut header rect, the scrollTop-257 overlap) · **1 BLOCKED on tested grounds**
(δ4-π-4's real-PRM leg). **154 artifacts** banked here under the `pi-RERUN-` prefix.

---

## 1 · LANE α — UNIT 8

### π-RERUN-R1 — the vertical run gap · **CURED-GREEN**

Controls: `pi-PROPORTION-lattice-layout-overflow-1440-light.json` (vertical dock `i=0`:
`P_token 48px`, `run_computed_gap` **6px**, painted step **46**, seat offsets `0,46,92,138…`;
horizontal lattice exact at 48/48) and `pi-REACH-vertical-dock3-393-coarse-dark.json`
(`seatOff 19,69,119,169,219`, step **50 = 44+6**, declared `P 52`).

**The control was reproduced LIVE rather than only cited.** The R1 cure is a strike of
`.glass-dock.vertical .dock-layer { gap: var(--dock-layer-gap, 0.375rem); }`
(`shell-regions.css`). Re-injecting that exact declaration into the live page as a `<style>`
restores the pre-cure paint byte-for-byte, and removing it restores HEAD
(`restoredIdentical: true` on both routes). That injection **is** the before-arm.

| route · vp · theme | vertical run gap | painted step | seat offsets (first 5) |
|---|---|---|---|
| `/dock/overflow` 1440 light · **struck rule re-injected (= control)** | **6px** | 46 | `0, 46, 92, 138, 184` |
| `/dock/overflow` 1440 light · **HEAD** | **8px** | **48** | `0, 48, 96, 144, 192` |
| `/dock/layers` 1440 dark · re-injected | 6px | 46 | `0, 46, 92, 138` |
| `/dock/layers` 1440 dark · **HEAD** | **8px** | **48** | `0, 48, 96, 144` |

1. **Painted step === `--dock-pitch`**, read from `getComputedStyle` and compared, not assumed:
   `--dock-pitch 48px` / painted step **48** on the sidebar's 11-seat block at `/dock/overflow`
   and `/dock/layers`, both themes (`0,48,96,144,192,240,288,336,384,432,480`).
2. **The identity holds as arithmetic.** The 11-seat icon block: last offset `480` + seat `40`
   = **520** = `10 × 48 + 40`. Under the re-injected control the same block reads step 46, i.e.
   `10 × 46 + 40 = 500` — the **20 px shortfall over 11 seats** (2 px × 10 gaps), which is the
   census's 24 px over a 12-seat column at the same 2 px/seat rate.
3. **The horizontal lattice is untouched.** `/dock/overflow` bottom dock, HEAD *and*
   re-injected: steps `48, 680, 54, 15, 48, 48`, gaps `8, 8, 14, 14, 8, 8` — byte-identical to
   the banked control. 5 of 8 runs at `/dock/layers` are horizontal; **0** of them moved.
4. **Non-run layers are byte-unchanged — the strike's whole risk, falsified.** Re-injecting the
   struck rule at `/dock/layers` 1440 dark moved **0 of 13** non-run `.dock-layer` /
   `.dock-layer-group` boxes (rect *and* computed `gap`), while moving **3 of 8** runs — and
   the 3 are exactly the three vertical ones (the sidebar plus both library verticals `i=3`,
   `i=5`). Every non-run layer reads `gap: 6px` from `--dock-layer-gap: calc(0.375rem * 1)` in
   both states, on both routes, in both themes. `layers.css:206` carries it, as the cure said.

**The 393 coarse arm is reported as observed, not as a delta.** At `393×852×3` (verified
in-page: `dpr 3`, `(pointer:coarse) true`) `/dock/overview` presents **no vertical dock with
seats** at HEAD — dock `i=3`, the control's `glass-dock vertical shape-pill collapsed`, is
horizontal on this tree. The pitch identity is nonetheless exact on that viewport's docks:
`--dock-pitch 52px`, painted steps `52, 52, 52, 52, 52, 52, 52, 52` on dock `i=9`, at the
coarse 44 px seat (`52 = 44 + 8`), against the control's `50 = 44 + 6`.
`pi-RERUN-R1-REACH-vertical-393-coarse-dark-cured.json`.

Artifacts: `pi-RERUN-R1-PROPORTION-{lattice-layout-overflow-1440-light,layers-1440-light,
layers-1440-dark}-cured.json` · `pi-RERUN-R1-nonrun-layers-struck-rule-probe-{1440-light,
layers-1440-dark}.json` · `pi-RERUN-R1-layers-1440-dark-{CURED,CONTROL-struck-rule-reinjected}.png`.

---

### π-RERUN-R2 — the focus ring the run port was cutting off · **STILL-RED**

Control: `pi-MATERIAL-ringclip-census-overview-1440-{light,dark}.json` — `total 67`,
`clippedCount 63`, every clipper `dock-layer dock-layer--full dock-run`, every cut **4px**.

**The horizontal arm works. The vertical arm is worse than before the cure.**

`/dock/overview` @1440, **both themes, identical figures**, `--dock-ring-reserve` resolving to
**4** everywhere:

| | control | HEAD |
|---|---|---|
| total | 67 | **68** |
| clippedCount | 63 | **49** |
| cross-axis only | (12 of a 20-row sample) | **15** |
| scroll-axis only | (3 of 20) | **28** |
| both axes | (5 of 20) | **6** |
| **any cross-axis clip** | — | **21** |
| **any scroll-axis clip** | — | **34** |

The scroll-axis residual (**34**) is reported and not folded away: a seat flush against a
scroll extremity loses its outward 4 px, which is a scroller property and which §2.2 of the
RECORD refuses to cure. **The cross-axis count did not reach 0 — it is 21, and on the vertical
dock the cut GREW from 4 px to 8 px.**

**Why, in numbers.** `run.css:263-264` gives the vertical run `padding-inline: 4px` /
`margin-inline: -4px`. But `.dock-run` rides the same element as `.dock-layer--full`, and
**`layers.css:334` — `.glass-dock.expanded:not(.fit-content) .dock-layer--full { width: 100%; }`
— fixes that element's border box.** With `box-sizing: border-box` the padding therefore eats
the *content* box instead of growing the *padding* box, and the negative margin only shifts
the box left:

```
sidebar vertical run, /dock/overview 1440:
  runRect x=16 w=40    padding-inline 4px/4px   margin-inline -4px/-4px   box-sizing border-box
  clientW 40   scrollW 48   content width 32    seat width 40
  → crossOverflow  HEAD +8px   ·   reconstructed pre-cure  0px
  padding box 16..56           seat layout box 20..60      ring outer 16..64
```

- `pi-RERUN-R2-lattice-paired-overview-1440-light.json`: the run's **margin box shrank**,
  `width 40 → 32` (Δ −8), while the dock's outer rect held. Clause 3's "the negative margin
  hands every pixel back" is **false on this run**.
- **In paint** (`:focus-visible` driven by a real Tab, seat rect `[20,172,40,40]`, outline
  `2px solid color(srgb 0.11 0.098 0.09 / 0.48) off:2px`), the scanline at the seat's vertical
  centre finds ring ink at cssX **`16, 16.5, 17, 17.5` only** — the LEFT side of the ring
  paints and **the right side is absent**. Under the reconstructed pre-cure (reserve zeroed)
  the same scanline finds **no ring ink at all**, matching the control's "cut 4px both sides".
- **The port now clips the SEAT ITSELF.** With the seat painted solid (a labelled synthetic
  probe, `pi-RERUN-R2-SYNTHETIC-seatfill-clipedge-1440-light.png`): layout box cssX
  **20.0 .. 60.0**, paint actually reaching the screen cssX **20 .. 55.5**. **4 px of the
  button is cut off.**

**Not only the vertical dock.** The paired probe also shows horizontal dock `i=5` at
`/dock/overview` losing **8 px of dock height** (`dockRect` h `56 → 48`, `runMarginBox` h
`40 → 32`) for the same reason on its block axis. The runs whose cross axis is `auto`-sized
(`i=1, 7, 8, 9, 10`) behave exactly as designed — border box `+8`, margin box unchanged.

**ROUTE BACK → BK #47 W8 MATERIAL + W3 LATTICE**, with coordinates:
`src/components/dock/styles/run.css:263-264` (the vertical reserve pair) is defeated by
`src/components/demo/../dock/styles/layers.css:334` (`.dock-layer--full { width: 100% }`) on
the same element, and by whatever fixes the block size of `i=5`'s run. A reserve that lands as
`padding` on a `width:100%` border box is a reserve that never materialises. Clauses 1, 3 and
4 all fail on the vertical arm; clauses 5, 6, 7 were not reached because clause 3 gates them.
Both themes read identically, so this is geometry, as the census said.

Artifacts: `pi-RERUN-R2-MATERIAL-ringclip-census-overview-1440-{light,dark}-cured.json` ·
`pi-RERUN-R2-lattice-paired-overview-1440-light.json` ·
`pi-RERUN-R2-ringcrop-focused-sidebar-seat-1440-light-{CURED,CONTROL-zero-reserve}.png` ·
`pi-RERUN-R2-SYNTHETIC-seatfill-clipedge-1440-light.png`.

---

### π-RERUN-R3 — the triple ring on the dock dropdown trigger · **CURED-GREEN**

Control: `pi-MATERIAL-dropdown-doublering-1440-light.json` — `ringCount 3` on
`.dock-dropdown-trigger.menu__trigger` (`outline 2px` + `box-shadow` accent/0.30 `0 0 0 2px` +
accent/0.15 8px halo), `ringCount 1` on the plain trigger, resting `box-shadow: none`.

| arm | light | dark |
|---|---|---|
| `.dock-dropdown-trigger.menu__trigger` at `:focus-visible` | **ringCount 1** · `outline 2px solid color(srgb 0.11 0.098 0.09 / 0.48) off:2px` · `box-shadow: none` | **ringCount 1** · `outline 2px solid color(srgb 0.73 0.718 0.67 / 0.48) off:2px` · `box-shadow: none` |
| plain `.dock-dropdown-trigger` | ringCount 1, unchanged | ringCount 1 |
| `.dock-select-trigger` | ringCount 1 | ringCount 1 |
| resting `box-shadow` on the compound trigger | **`none`** | **`none`** |

1. **Exactly one ring**, keyboard-driven (`:focus-visible true` after a real `Tab`). ✅
2. **The surviving ring is the DOCK's, and the two rungs are separable by serialisation.** On
   the dock trigger the outline resolves as **`color(srgb …)`** — the `color-mix(in srgb, …)`
   form of `--dock-ring-color` (`color-mix(in srgb, light-dark(hsl(24 10% 10%), hsl(48 10% 70%))
   48%, transparent)`), 2px/2px. A standalone `.menu__trigger` resolves as
   **`oklab(0.216128 0.00350075 0.00518669 / 0.48)`** — the house form. Different serialisation,
   same 0.48 rung: the later dock rule took the outline channel, exactly as
   `overlay-plate.css:145-152` argues. ✅
3. **A standalone `.menu__trigger` outside any dock still paints a ring** — at
   `/containers/dropdown-menu`, `button tap-squish focus-ring menu__trigger`, `inDock false`:
   focused `outline 2px solid oklab(0.216128 0.00350075 0.00518669 / 0.48) off:2px`,
   `box-shadow none`, **ringCount 1**; dark `oklab(0.925196 0.00238398 0.00574207 / 0.48)`.
   Three rings were not traded for zero. ✅
   *(The other `.menu__trigger` rows on that route report ringCount 5→6; their five parts are
   `glass-capsule` ELEVATION, identical at rest and at focus, and only the sixth is the ring.)*
4. Plain `.dock-dropdown-trigger` unchanged from its banked clean capture. ✅
5. Resting `box-shadow` still `none`. ✅
6. Both themes. ✅

**The pointer half of clause 1, which the control did not take.** Opening the menu by a real
**click** (`aria-expanded "true"`, one `[role=menu]` in the document) leaves the trigger with
`:focus false`, `:focus-visible false`, `outline none`, `box-shadow none` — **ringCount 0**. A
pointer-opened menu paints no keyboard ring. ✅

Artifacts: `pi-RERUN-R3-MATERIAL-dropdown-ringcount-1440-{light,dark}-cured.json` ·
`pi-RERUN-R3-standalone-menutrigger-1440-{light,dark}.json` ·
`pi-RERUN-R3-pointer-open-no-keyboard-ring-1440-light.json`.

---

### π-RERUN-R4 — the combobox that is now a combobox · **CURED-GREEN**

Control: `pi-SEARCH-ROUTE-aria-wiring-1440-dark.json` — `role=option` **0 document-wide** on
every step, `aria-selected` absent, listbox `id "(empty)"`, `inputRole null`,
`inputAriaControls null`, `inputAriaExpanded null`.

**1 · the 5-step ArrowDown walk on a live engine**, `/data/search` @1440, real keystrokes after
a real typed query `"a"`:

| step | `aria-activedescendant` | role | `aria-selected` | `data-selected` | #`[role=option]` | #selected | ad ≡ selected |
|---|---|---|---|---|---|---|---|
| 0 | `search-result-search-row-044` | option | true | true | **12** | 1 | true |
| 1 | `search-result-search-row-088` | option | true | true | 12 | 1 | true |
| 2 | `search-result-search-row-132` | option | true | true | 12 | 1 | true |
| 3 | `search-result-search-row-176` | option | true | true | 12 | 1 | true |
| 4 | `search-result-search-row-026` | option | true | true | 12 | 1 | true |
| 5 | `search-result-search-row-013` | option | true | true | 12 | 1 | true |

`optionCountAlways12 true` · `exactlyOneSelected true` · `adAlwaysAnOption true` ·
`adEqualsSelected true` · `distinctAd 6` · listbox id **`search-results-listbox`** (was empty),
`role="listbox"`, 12 option descendants · input `role="combobox"`, `aria-expanded "true"`,
`aria-controls "search-results-listbox"`, `aria-autocomplete "list"`. **Identical in light.**

**2 · the selected row is VISIBLE** — the paint the unit arm cannot see. Exactly one of the 12
carries `--card-fill: oklch(0.925196 0.00621729 67.4529 / 0.12)`; the other eleven read
`rgba(0, 0, 0, 0)`. Photometered against its immediate neighbour after `scrollIntoView` +
settle:

| theme | selected modal rgb (L) | neighbour modal rgb (L) | Δ mean L | modal ratio |
|---|---|---|---|---|
| dark | `[62,44,35]` (0.31146) | `[36,17,10]` (0.20322) | **+0.08712** | **1.371** |
| light | `[201,176,163]` (0.7752) | `[226,198,186]` (0.84694) | **−0.05785** | **1.274** |

The ink-tinted fill lifts a dark plate and darkens a light one; the announced selection now has
a non-ARIA indication in both themes. ✅

**3 · the 12 tab stops, captured rather than argued about.** 13 presses from the field:
Tab 1–12 land on `[role=option]` `…-044, -088, -132, -176, -026, -013, -070, -114, -158, -057,
-101, -145`; **Tab 13 leaves the listbox** for a `dock-icon-button`. **12 option tab stops**,
which is the artifact the RECORD §2.4 disposition rests on.
(`pi-RERUN-R4-SEARCH-tabstops-1440-dark.json`.)

**4 · dark AND light.** ✅ — the predecessor arm was dark-only.

---

## 2 · LANE γ — UNIT 6

### π-RERUN-R5 — the draw resolves, the rest state stops being empty · **CURED-GREEN**

| arm | control | HEAD |
|---|---|---|
| resting `stroke-dashoffset ÷ stroke-dasharray`, every guide | **−23.000** on all five (`−3909.29/169.969`, `−2416.56/105.068`, `−1493.89/64.9518`, `−8598.43/373.845`, `−3371.06/146.568`) | **0.000** on **all 10** guides; the dasharrays are the same subjects (`169.969`, `105.068`, `64.952`, `373.845`, `146.568`) |
| live easing string | `linear(0 0%, …, 0.999 95.833%, **24** 100%)` | `… 0.97296 95.918%, 0.9755 97.959%, **1** 100%)` |
| `playState` / `fill` | `finished` / `both` | `finished` / `both` (unchanged) |

**KILL not triggered:** the resting ratio is `0.000` on every guide. ✅

**REST-state paint, `/motion/handmark` @1440 dpr2, theme verified in-page:**

| mount | control | HEAD light | HEAD dark |
|---|---|---|---|
| hue 318 `rose` | 1,289 light / 1,236 dark, **two end chips with 36 dead columns between** | **2,700** px · liveCols **123/123** · **longest dead run 0** | **2,616** px · liveCols **123/123** · **dead run 0** |
| hue 270 `violet` | 705 dark / **0** light | **0** at the C ≥ 0.08 floor — see below | **3,251** px · liveCols **148/148** · dead run 0 |
| hue 78 `Hpqjy really matters` | **0 of 144,400** | **0 of 103,782** | **0 of 103,782** |

The band's dead columns **closed**: `rose` is now continuous edge to edge in both themes, and
`violet` in dark went 705 → 3,251. The `violet` light zero is **not** an R5 failure: measured
peak chroma inside the hue window is **0.07256**, under the 0.08 floor — the γ queue's own
NOT-ENQUEUED item (*"`oklch(0.86 0.16 270)` gamut-mapping to C 0.071 under the 0.08 floor …
carried OPEN to #51 and NOT cured in unit 6"*), corroborated here to within rounding. The band
is visibly painted; only the detector's floor excludes it. The `Hpqjy` zero **is** a failure,
and it belongs to R6 — see below.

**The Replay button — the control's sharpest arm, inverted.** Control: `play()` returned the
offset to `−3371.06px` and **ERASED** the line. HEAD, sampled every ~120 ms across the click:

```
t=  61ms  ratios [0,0,0,0,0,0,0,0,0, 0.9136]   ← the mark is RE-DRAWING
t= 183ms  ratios [0,0,0,0,0,0,0,0,0, 0.0695]
t= 303ms  ratios [0,0,0,0,0,0,0,0,0, 0]
…  finalAllZero: true                          ← and it is LEFT PAINTED
```
✅ Replay re-draws and leaves the mark painted.

**π-GALLERY at rest** (control: *four of five sections show no mark at all*): **three of five**
now carry their mark — UNDERLINE (all three specimen sizes), HIGHLIGHT (`rose`, `violet`), THE
DRAW (`drawn`). **STRIKE** (`Friday`) and **CIRCLE** (`threefold`) still show nothing, as does
the two-line `Hpqjy really matters` highlight. Those three are R6's, on an exact correlation:

> **every mount whose `.hm-mark` box width is 0 paints nothing; every mount with a real width
> paints.** widths at 1440 dark — `pays in` 162.04 / 100.14 / 61.88 ✓ · `rose` 61.48 ✓ ·
> `violet` 73.78 ✓ · `drawn` 139.29 ✓ · **`Friday` 0 ✗ · `threefold` 0 ✗ · `Hpqjy` 0, 0 ✗**.

---

### π-RERUN-R6 — the mask window resolves against real units · **SPLIT: window CURED · ring/paint STILL-RED**

**GREEN — the mask window.** Control: `x="-100%" y="-100%" width="300%" height="300%"` on every
mount. HEAD: **all 10 masks carry four finite user-space numbers with area > 0**, e.g.
`pays in {x -7.007, y 50.28, w 177.684, h 10.375}` · `threefold {x -3.88, y -1.599, w 165.176,
h 41.743}` · `Hpqjy` line 1 `{x -19.323, y -2.369, w 204.017, h 50.879}`, line 2
`{x -206.033, y 33.756, w 141.677, h 50.959}`. ✅

**GREEN — the reservation arm that must not be disturbed.** `threefold` computed
`padding-inline` **18.2611px** at 1440 dark — the control's figure to the digit — with host
rect **190.45px** against the control's `≈154px → 190.44px`. The visible gap between "Up" and
"threefold" is in the banked frame. ✅

**RED — the ring does not paint, and the width reading IS load-bearing.** The queue banked the
`.hm-mark` width reading as *"unchanged and no longer load-bearing"*. **That declaration is
falsified.** With `stroke-dashoffset` now 0 at rest (R5's cure supplies the isolation the queue
wanted a forced hover for), the ring on `threefold` is **still never painted**, and the mounts
that fail to paint are precisely and only the four whose `.hm-mark` width is `0`. Both engines'
agreement was claimed from the same window; Chromium still resolves 0 for `Friday`,
`threefold` and both `Hpqjy` line rects, at 1440 **and** at 390×844×3.

**ROUTE BACK → BK #51 (GF-HANDMARK) / `src/components/handmark/HandMark.vue`**, with
coordinates: the mask window is fixed, but `.hm-mark`'s own box still resolves to `width: 0`
for the `<del>` mount, the `circle` shape mount and both line rects of the two-line `<mark>` —
and a zero-width SVG paints nothing regardless of the window inside it. STRIKE and CIRCLE are
blank at rest on `/motion/handmark`, in both themes, at both viewports.

---

### π-RERUN-R7 — one chisel per line rect · **CURED-GREEN**

`390×844×3`, verified in-page: `dpr 3` · `(hover:none) true` · `(pointer:coarse) true` ·
`maxTouchPoints 1`.

| mount | control `.hm-mark` count | HEAD |
|---|---|---|
| bare slot (`pays in`, `threefold`) | 1 | **1** |
| `<del>` (`Friday`) | **2** | **1** |
| `<mark>` one line (`rose`, `violet`) | **2** each | **1** each |
| `<mark>` two lines (`Hpqjy really matters`) | **4** | **2** |

- **guide lengths on the two-line highlight**: control `171.583 / 108.632 / 170.281 / 108.817`
  (four) → HEAD **`171.583 / 108.632`** at 1440 and **`147.535 / 93.402`** at 390 — **two**, and
  the 1440 pair is exactly the control's line-1/line-2 values with the duplicates struck. ✅
- **the per-rect delay chain**: control `0 / 234.371 / 434.118 / 667.773` (the duplicate's clock
  chained behind the original's duration) → HEAD **`0 / 234.371`** at 1440 and **`0 / 221.145`**
  at 390, where `221.145` **is** the first rect's measured duration (`durations[0] = 221.145`).
  Two delays, the second being the first rect's duration, exactly as claimed. ✅
- **no bridging, still**: line-1 ink bbox `x ∈ [−2.78, +144.75]`, line-2 `x ∈ [−163.03, −69.63]`,
  `disjoint: true` (control: `[−3.3, +169.6]` / `[−185.3, −69.9]`, disjoint). Read via
  `getBBox()`, never `getContext()`. ✅
- control `.hm-mark` widths corroborate the same mounts at 390: `pays in` **139.32** (control
  139.32), `rose` **52.87** (control 52.87), `violet` 63.45 (control 63.73).

---

### π-RERUN-R8 — the mark hears its own scroller, and the kill criterion goes live · **CURED-GREEN**

**An instrument note that matters.** `.demo-main-scroller` computes `scroll-behavior: smooth`.
A per-rAF `scrollTop = …` drive is swallowed by it — the first trace shows all 40 drive samples
at `scrollTop 0`, `hostTop 362.258`, and only the `settle+700` sample at 163. That reproduces
the control's "every sample `matrix(1,0,0,1,0,0)`" as an *artefact of the drive*, not of the
mechanism. The reading below uses `scrollTo({behavior:"instant"})` and verifies the host rect
actually moved. Both traces are banked.

| arm | control | HEAD (instant drive, 6 px/frame × 32) |
|---|---|---|
| host actually moved | — | `hostTop` **362.258 → 199.258** (163 px) |
| scroll events the document-capture listener heard | mechanism inert | **28** |
| distinct transforms | exactly **1** (`matrix(1,0,0,1,0,0)`) | **9** |
| ink-lag amplitude | **0.00 px** *"only because the mechanism is inert"* | **0.36 px**, peak abs **0.36 px** — `> 0` ✅ and `≤ 1.5` ✅ |
| `hm-mark--settling` | **never applied**; `window.scrollY` stayed 0 | **cleared during the drive** (`settlingClearedDuringDrive true`, `settlingDuringDrive false`) and **applied on settle** (10 marks) |
| **direction** | unobservable | **`+ty` — the mark is displaced DOWN while the content moves UP. It TRAILS.** |

`0.36 = 0.06 × 6`, i.e. exactly `Math.sign(delta) * Math.min(1.5, Math.abs(0.06 * delta))` at
this drive rate; the settle tail rides back `0.0594 → 0.0581 → … → 0.0485 → 0` on the spring.

**THE KILL CRITERION — the reading, not the ruling.** unit-5 §7: *"if it reads as a made mark
DETACHING from its word, the resolution is DELETION, not tuning."* Peak displacement at this
drive is **0.36 CSS px (0.72 device px at dpr 2)**, and the source caps it at **1.5 CSS px
(3 device px)** for any scroll rate. That is a sub-nib trail, an order of magnitude below the
1.5 px threshold at ordinary rates, and it moves in the trailing direction. **This seat reads
it as inertia, not detachment.** The disposition remains the owner's.

*One sub-arm short of the order:* the paired rest/mid-scroll PNG "so the direction is legible
to an eye". A 0.36 px displacement that lives for the 90 ms quiet window cannot be caught by a
screenshot whose round-trip exceeds that window, and at the 1.5 px cap it is 3 device pixels.
The matrix trace is the evidence; the legibility frame is **not obtainable at this amplitude**
and is reported as such rather than staged.

---

## 3 · LANE δ

### π-RERUN-D1 (+ D1a, D1d) — the Fourier stage paints · **CURED-GREEN**

**THE GATE ARM, taken first and cheapest — it flips.**

| arm | control | HEAD |
|---|---|---|
| `rendererStatus` state + engine at boot | `state "error"`, `renderer "webgpu"`, `Error while parsing WGSL: :100:32 error: unresolved value 'PI'` | **`data-state "ready"`**, `data-renderer "webgpu"`, pill **`WebGPU·apple · metal-3"`**, **no error field** |
| any `unresolved value` text in the document | present | **null** |
| `consoleErrors` over the first 3 s | 0 | **0** (unchanged) |
| `canvasCount` | 2 | **2** (`aurora-canvas`, `fourier-field-canvas`) |

**KILL not triggered.** No validation error of any class.

**δ2-π-4 rider D1a — the clock un-freezes.** Control: `tZero.loop "0.00104375"` **=**
`tThreeSeconds.loop "0.00104375"` across 3 s while nominally playing. HEAD, same 3 s window:
`aria-valuenow` **`0.293` → `0.478`**, `aria-valuetext` **`"N 6/15 · 29% through the period"` →
`"N 6/15 · 48% through the period"`**. The one arm that proves the cure reached the loop and
not merely the compiler. ✅

**δ2-π-1 / δ2-π-3 — photometry over a stage that now paints.** Canvas rect 1660×998 (backing
store 1660×998), theme verified in-page:

| | dark | light |
|---|---|---|
| `uniqueRgb` | **5,338** | **5,645** |
| mean OKLab L | 0.30727 | 0.81097 |
| max chroma | 0.14311 | 0.19091 |
| marked px (C ≥ 0.04) | **26,604** (1.61 %) | **28,632** (1.73 %) |
| **chartreuse hue 80–120°** | **0** | **0** |
| white specular cluster (L > 0.95, C < 0.02) | **0** | **0** |

**δ2-π-3's zero is no longer vacuous** — it is 0 chartreuse pixels over **1,656,680 painted
pixels** instead of 0 over an empty well. The battery's O5 is honoured: no figure here is
cross-cited from `pi-d2-EXPAND-…pixels.json`. *(The neutral-dark share reads 17.33 % over the
WHOLE stage; the queue's ≤5 % detector is scoped to the mark, which is a different instrument,
so it is reported as a whole-stage figure and not scored.)*

**Rider D1d — cured.** Under `navigator.gpu === undefined` (injected by `--initScript`, **no
source byte touched**):

| arm | control | HEAD |
|---|---|---|
| pill text | `WebGL 2·[FourierField] WebGPU is required. …` | **`WebGPU·[FourierField] WebGPU is required. …`** |
| `[data-renderer]` | `"webgl2"` | **`"webgpu"`** |
| `canvasCount` | 2 | **2** (unchanged, no lookalike) |

**Carried, not claimed: δ2-π-7 is still owed.** The transport census at HEAD still reads **8 of
9 `[role=slider]` at `w: 0, h: 20`**, including `"Move through the loop"`; only the stage
slider (`"Fourier reconstruction parameter"`, `830 × 499`) has a pointer target. The picker's
own label reads **`"Elliptic — generated · 15 terms"`** verbatim, which is the domain the
re-scoped δ2-π-2 walk must use. Neither cell was enqueued to this seat and neither is claimed.

---

### π-RERUN-D2 — the collapsed chrome plate washes in DARK · **CURED-GREEN**

`/foundations/typography`, collapse verified live (`--chrome-collapse-t: 1`, plate
`opacity: 1`, chrome height 102.85 → **90.5** at 1440 / **65.8** at 390, transform
`matrix(0.88, 0, 0, 0.88, 0, -5.28)`).

| arm | control (banked) | HEAD |
|---|---|---|
| `.story-page-chrome::before` `background-image`, **dark** | `linear-gradient(color(srgb 0.914 0.9 0.886 / **0.07**) 0px, … 62%, rgba(0,0,0,0))` — the near-white INK | `linear-gradient(**color(srgb 0.2074 0.165013 0.1326 / 0.8)** 0px, … 62%, rgba(0,0,0,0))` — the claim was `0.2074 0.165 0.1326 / 0.8` |
| the same, **light** | `color(srgb 0.994 0.96 0.926 / 0.7)` | **`color(srgb 0.994 0.96 0.926 / 0.7)` — byte-identical** |
| token | — | `--story-chrome-plate-wash: color-mix(in srgb, hsl(26 22% 17%) 80%, transparent)` (dark) |
| **the ghost** — content passing beneath the h1 | dark: opaque strokes **cut through** | dark **1.882 : 1** · light **1.863 : 1** — predicted **≈1.88** against the light arm's measured **1.86** |
| h1 over the plate, dark | 12.53 : 1 (repaired instrument) | **11.756 : 1** (1440) · **11.796 : 1** (390) — predicted **≈11.9**, AA ✅ |
| return leg over the plate, dark | 6.08 : 1 | **5.742 : 1** (1440) · **5.762 : 1** (390), AA ✅ |
| `--chrome-fade-depth` | `"0"` | **`"0"`** unchanged |

The predicted direction is exactly what landed: *"the plate darkens the ground slightly and the
title still clears AA with an order of magnitude to spare."* **KILL not triggered** — the dark
ghost (1.882) does not read above the light arm (1.863); the two now agree to 0.02.

**THE CONTAMINATED INSTRUMENT, re-run unrepaired, and BOTH readings stated as ordered.**

- **UNREPAIRED (darkest-2 % centroid, the predecessor's exact instrument): it still returns ONE
  pair in dark** — `h1 = [48,37,30]`, `leg = [48,37,30]`, both ≈ the plate `[49,38,30]`, ratios
  1.012 and 1.012 at 1440 (1.009 / 1.009 at 390). **The cure did not un-contaminate it, and the
  token-corroboration file stays the load-bearing evidence.** The *mode* of contamination did
  invert, which is itself evidence the plate now occludes: the control locked onto a
  bleed-through GLYPH (`[43,34,27]` against a near-white ground), whereas the darkest thing in
  the crop is now the plate itself.
- **REPAIRED (polarity-aware): two distinct pairs.** dark `h1 = [233,229,226]`,
  `leg = [172,160,145]` — matching the computed `h1Color rgb(233,230,226)` and `linkColor
  rgb(172,160,145)` to within one unit. Light is unaffected either way (`[28,25,23]` /
  `[124,102,80]`), which is the control that says the light arm was not touched.

Artifacts: `pi-RERUN-D2-SCROLL-collapsed-{1440,390}-{light,dark}-cured.{json,png}` ·
`pi-RERUN-D2-SCROLL-platewash-1440-{light,dark}-cured.json` ·
`pi-RERUN-D2-SCROLL-legibility-AA-decile-both-instruments.json` ·
`pi-RERUN-D2-crop-{ghostband,h1,plate}-*.png`. The **390 light/dark pair** is the cleanest
single delta and is the frame this verdict rests on.

---

### π-RERUN-D3 — the ToC's untracked labels clear AA in light · **CURED-GREEN**

`/navigation/toc-tracking` @1440, theme verified in-page.

**The identification the queue asked to be falsified rather than trusted — it holds.** The
untracked child rows compute **`rgb(91, 70, 51)`** in light, which is `--on-glass-muted-strong`
= `hsl(28 28% 28%)`. The queue's own falsifier: *"If the re-capture's ink is not
`rgb(91, 70, 51)`, the class name did not reach the element."* It is. The control's ink was
`rgb(112, 89, 66)` = `--on-glass-muted` `hsl(30 26% 35%)`.

| row | arm | control | HEAD |
|---|---|---|---|
| `1.2 Subsection` | light, ink / ground / ratio | `rgb(112,89,66)` on `[226,197,185]` → **4.04 : 1**, `AA_normalText_4_5: false` | **`rgb(91,70,51)` on `[226,197,185]` → 5.455 : 1**, AA **true** |
| `1.3 Subsection` | light | 4.04 : 1, AA false | **5.455 : 1**, AA true |
| `1.2 / 1.3 Subsection` | dark — the control that must not regress | 9.34 / 9.28 | **11.798 / 11.697** — it rose, as predicted, the -strong rung being the brighter |
| `Section 1` (tracked) | light / dark | 8.87 / 6.29 | **8.865 / 6.294** — unchanged |
| `1.1 Subsection` (tracked) | light / dark | 8.86 / 6.29 | **8.865 / 6.294** — unchanged |

The ground `[226,197,185]` is byte-identical to the banked control's, so the instrument and the
plate are the same; **only the ink moved.** The queue predicted *"the pure rung computes
5.45 : 1, so 5.45 is the floor and not the estimate"* — measured **5.455**.

**Subordination, by eye and by number.** Light: untracked 5.455 against their `text-foreground`
parents at 8.865 — still quieter, one rung, not a promotion. Dark: untracked ink
`rgb(213,208,200)` against `text-foreground` `rgb(233,230,226)` — still the dimmer of the two.
*(A note so the table is not misread: in dark the tracked/active rows are `text-primary`
`oklch(0.739 0.134 318.1)` at 6.294, which is a hue rung and not a loudness one; the
`text-foreground` siblings `Section 10/11/12` are the correct comparand for subordination.)*

---

### π-RERUN-D6 — the frozen stills carry a dark arm · **CURED-GREEN**

The stills are `data:image/png;base64` sources, so this cell reads **the raster itself** rather
than a screenshot crop — every still is 132 × 82, decoded in Node.

**THE ONE ARM THAT DECIDES — it flips on all six.**

| still | control (banked) light vs dark | HEAD light | HEAD dark | differ? |
|---|---|---|---|---|
| `/substrates/aurora` | **628 vs 628 — identical** | 1,917 | **2,621** | ✅ |
| `/substrates/fourier-field` | **477 vs 477 — identical** | 222 | **268** | ✅ |
| `/substrates/blob` | 917 vs 924 | 881 | **1,113** | ✅ |
| `/substrates/constellation` | 1,171 vs 903 | 525 | **676** | ✅ |
| `/substrates/glass-material` | 843 vs 844 | 982 | **1,856** | ✅ |
| `/substrates/glass-panel` | 1,451 vs 1,452 | 1,563 | **2,413** | ✅ |

Byte comparison of the two data URIs: **all six differ** (`byteIdentical: false`).

**Photometry, dark, per still — mean OKLab L (claim band 0.36–0.50) and C max (floor 0.06):**

| route | control L | HEAD dark L | predicted | C max dark |
|---|---|---|---|---|
| aurora | ≈0.93 | **0.49705** | 0.41→0.48 (0.007 over) | **0.12527** |
| blob | ≈0.93 | **0.44350** | 0.36→0.40 (0.044 over) | **0.12270** |
| constellation | ≈0.93 | **0.43130** | 0.40→0.44 ✅ | **0.11281** |
| fourier-field | ≈0.93 | **0.41363** | 0.39→0.43 ✅ | **0.10918** |
| glass-material | ≈0.93 | **0.50683** | 0.41→0.49 (0.007 over the band ceiling) | **0.12265** |
| glass-panel | ≈0.93 | **0.49564** | 0.40→0.50 ✅ | **0.14005** |

Four of six land inside their per-route prediction; `glass-material` overshoots the 0.50 band
ceiling by **0.0068** and `blob` sits 0.044 above its own predicted top while remaining inside
the stated 0.36–0.50 band. Reported as measured. **The charcoal-slab KILL does not fire**: C max
is **≥ 0.109 on all six**, against a 0.06 floor — chroma is kept, not collapsed. The stills are
no longer the brightest thing on a dark page (control: slab 0.93 over a ground of L 0.34–0.57);
they sit inside the ground's band.

**THE LIGHT ARM — settled directly rather than argued.** My light figures (1,917 / 881 / 525 /
222 / 982 / 1,563) do **not** match the banked control light figures (628 / 917 / 1,171 / 477 /
843 / 1,451). The queue anticipated this: *"Gated deterministically too … so a disagreement
here convicts the capture, not the cure."* Rather than lean on that, this seat **stood up the
pre-cut tree and measured it on the same rig** (§4):

| route | PRE-CUT `8a96868d` light | PRE-CUT dark | identical? | HEAD light | HEAD dark |
|---|---|---|---|---|---|
| aurora | **1,917** | 1,917 | **true** | **1,917** | 2,621 |
| blob | **881** | 881 | **true** | **881** | 1,113 |
| constellation | **525** | 525 | **true** | **525** | 676 |
| fourier-field | **222** | 222 | **true** | **222** | 268 |
| glass-material | **982** | 982 | **true** | **982** | 1,856 |
| glass-panel | **1,563** | 1,563 | **true** | **1,563** | 2,413 |

Three things fall out at once. **(a)** The D6 defect is **reproduced live** on the pre-cut tree
— light ≡ dark on all six. **(b)** The cure splits them at HEAD. **(c)** The **light arm is
byte-identical between pre-cut and HEAD on one rig** — the queue's central control, proven
directly. The disagreement with the banked figures is therefore **capture provenance**
(`dist-demo/` raster vs dev-server raster), demonstrated rather than assumed. The raster is also
**deterministic**: two independent light loads produced identical bytes on all six.
The deterministic gate agrees — `tests/demo/story-preview-card.test.ts`: **66 passed | 2
expected fail**, exit **0**.

**THE FLIP ARM — green, and it needed the app's own signal.** A synthetic
`classList.add("dark")` moves nothing (`stillTheme` reads `useGlobalDark()`, not the class), and
that first attempt is banked as a null result. Driving the real storage signal
(`StorageEvent` carrying `storageArea`):

| route | classList `""` → `"dark"` → `""` | raster changed at the flip | returned exactly on flip-back |
|---|---|---|---|
| all six | ✅ | **true** on all six | **true** on all six |

The per-arm memo is a cache, not a one-way door.

**`/display` — unchanged, as claimed.** dark mean L **0.30288** (control **0.305**), C max
**0.03916** (control **0.039**); `dataImageStills: 0` on that route, confirming the theme
argument reaches the `still` rung only and never the authored `.tile.vue` path.
`ladderCanvases: 0` on both landings.

---

## 4 · THE δ NOT-ENQUEUED DISPOSITIONS

**A throwaway pre-cut tree was stood up for the two comparand cells** — `git archive 8a96868d`
extracted into this seat's scratchpad with the repo's `node_modules` symlinked, served by a
second `vite` on **:5412**, killed at close. **No working-tree mutation, no checkout, nothing
moved.**

### δ3-π-4's missing DELTA comparand — **CAPTURED**
The battery records *"No `git archive 8a96868d` before-tree frames exist anywhere"* and asks for
six. All six are now banked, three landings × two themes, same rig, same viewport (1440×900
dpr2), theme verified in-page:
`pi-RERUN-DISP-DELTA-PRECUT-8a96868d-LANDING-{display,substrates,foundations}-1440-{light,dark}.{json,png}`.
Notable in them: at `8a96868d` `/substrates` already carried **6** `data:image` stills (which is
what made the D6 light≡dark measurement above possible), `/display` carried **0**, and
`.story-page-chrome` is absent on landings.

### δ4-π-1's pre-cut header rect comparand — **CAPTURED, and it isolates D2 cleanly**
`/foundations/typography` @1440 dark, both trees, at two scroll offsets:

| | `8a96868d` | `ac204dca` (HEAD) |
|---|---|---|
| header rect @ scrollTop 0 | `{112, 32, 1296, 102.9}` | **identical** |
| transform / `--chrome-collapse-t` / plate opacity @ 0 | `matrix(1,0,0,1,0,0)` / `0` / `0` | **identical** |
| header rect @ scrollTop 600 | `{112, 26.7, 1140.5, 90.5}` | **identical** |
| transform / collapse-t / plate opacity @ 600 | `matrix(0.88,0,0,0.88,0,-5.28)` / `1` / `1` | **identical** |
| position / z-index | `sticky` / `35` | **identical** |
| **plate wash, dark** | `color(srgb 0.914 0.9 0.886 / 0.07)` | **`color(srgb 0.2074 0.165013 0.1326 / 0.8)`** |

**The header geometry did not move between the two trees. The only difference is the D2 wash.**
That is as clean an isolation of the D2 cure as this cell could have asked for.
*(Stated precisely: the ref used is `8a96868d`, the commit the δ3-π-4 DELTA was specified
against. It is "pre-cut" for the D2 wash; it already carries W-SCROLL-SHRINK.)*

### δ4-π-4's real-PRM leg — **BLOCKED, on tested grounds rather than assumed ones**
The `chrome-devtools` CLI *does* expose a Chrome argument passthrough (`--chromeArg`), so the
seam the queue thought absent exists. It was tried: daemon fully stopped, restarted as
`chrome-devtools start --chromeArg="--force-prefers-reduced-motion"`, fresh navigation. The page
still reports `matchMedia("(prefers-reduced-motion: reduce)").matches === **false**` and
`(no-preference) === true`, on Chrome 151 headless. `emulate` exposes only `colorScheme`, with
no `Emulation.setEmulatedMedia` passthrough, and a `matchMedia` stub cannot reach an `@media`
query. **The leg stays owed**, now with a tested ground: the flag does not reach the media query
on this engine build. The daemon was restored to its default configuration at close.

### the scrollTop-257 sticky-header overlap — **CAPTURED; the D2 cure moved the PAINT, not the GEOMETRY**
The census names it without a route; the γ battery (`PI-BATTERY-gamma-handmark.md:370`) places
it on **`/motion/handmark`** — *"title and blurb over the underline card's content — text on
text, both themes, visible."* At `scrollTop 257` @1440, **both themes**, the overlap **persists
geometrically**: the chrome (`z-index 35`, `--chrome-collapse-t 1`, plate `opacity 1`, rect
`{112, 26.7, 1140.5, 110.7}`) covers the `underline` and `strike` section labels
(`{112, 26.8, 418.7, 21.6}` and `{550.7, 26.8, 418.7, 21.6}`), the `h2 "The hand voice"`
(`{112, 60.4, 418.7, 30.5}`) and both columns' body copy — identical rects in light and dark.

What changed is the plate: dark now composites `color(srgb 0.2074 0.165013 0.1326 / 0.8)` where
it composited `color(srgb 0.914 0.9 0.886 / 0.07)`. So the family no longer reads as
*text-on-text bleed-through*; it reads as an occluding plate — which is what D2 was for, and
which D2's own ghost arm scores at **1.882 : 1** on `/foundations/typography`. **The residue is
a LAYOUT question** (a collapsed chrome 110.7 px tall sitting over a story section that starts
at cssY 26.8) **and not the wash question D2 cured.** Not this seat's to fix; **routed to δ
`demo/chassis`** as the census had it, now with coordinates and a paired frame.
`pi-RERUN-DISP-underlinecard-overlap-handmark-257-1440-{light,dark}.{json,png}` ·
`pi-RERUN-DISP-stickyheader-scrollTop257-1440-{light,dark}.{json,png}` (the typography route,
banked for completeness: **no** card intersects the chrome there at that offset).

---

## 5 · WHAT THIS SEAT REFUSED, AND WHY

### 5.1 · The browser transport
The MCP browser tools named in the order (`chrome-devtools` MCP, Playwright MCP fallback) were
**not present in this seat's deferred tool set** — `ToolSearch` over `select:`, `+chrome` and
`+playwright browser` all returned no matches. The plugin's own `chrome-devtools-mcp:
chrome-devtools-cli` skill was loaded and its CLI driven against the daemon that was already
running. This is the sanctioned CLI route, not a hand-rolled Playwright script, and the singleton
constraint held throughout: **one context, one owner, no second browser**.

### 5.2 · The GL-context census
δ3-π-5's control carries `webgl2 ×2, webgpu ×1, requestAdapter ×1` per landing. Establishing
those numbers requires `getContext()` on live canvases, which **steals the context and fakes the
black fallback**. This seat censused canvases **by class and count only** (`/substrates`: 1,
`aurora-canvas`; `/substrates/fourier-field`: 2, `aurora-canvas` + `fourier-field-canvas`;
`ladderCanvases: 0` on both landings) and **forwards the GL-context half unmeasured**. The D6
claim it supports — *"the arm adds zero GL"* — is **not** discharged here; the canvas tally is
the observable half and it is unchanged.

### 5.3 · Sub-arms named short
- **R8's paired legibility PNG** — not obtainable at a 0.36 px (cap 1.5 px) amplitude living for
  90 ms. §2 states the grounds; the trace is the evidence.
- **R2 clauses 5, 6, 7** — gated behind clause 3, which fails. Re-take them when the reserve
  actually materialises.
- **δ2-π-2 / δ2-π-5 / δ2-π-6 / δ2-π-7** — re-scoped or additional cells inside the D1 order that
  were not part of the four-cell enqueue; the D1 gate + clock + photometry are what this seat
  closes. δ2-π-7's live figures are carried in §3 so they do not evaporate.
- **Safari 26.4** — every α Safari cell is already BLOCKED → BAND-BUILD at
  `lanealpha-unit5/PI-QUEUE.md:49-51`; the γ queue's Safari column is a second engine this
  singleton seat was not asked to open. Not re-minted.
- **Forced-colors for R3** — already on the books BLOCKED (census §4.2); not double-counted.

---

## 6 · EXIT CODES AND VERDICT TABLE

| step | command | exit |
|---|---|---|
| model assertion | `python3 … && case "$MODEL" in claude-opus-5*)` | **0** |
| port guard | `lsof -nP -iTCP -sTCP:LISTEN` | 0 |
| dev server (mine, :5411) | `npx vite --host localhost --port 5411 --strictPort` | started, `HTTP 200`, killed at close |
| pre-cut server (mine, :5412) | `git archive 8a96868d \| tar -x` + `npx vite --port 5412` | started, `HTTP 200`, killed at close |
| d6 light-arm identity gate | `npx vitest run tests/demo/story-preview-card.test.ts` | **0** — 66 passed, 2 expected fail |
| tree at close | `git status --porcelain \| wc -l` | **0** |

| cell | verdict | control it was paired against |
|---|---|---|
| π-RERUN-R1 | **CURED-GREEN** | `pi-PROPORTION-lattice-layout-overflow-1440-light.json` + `pi-REACH-vertical-dock3-393-coarse-dark.json`, control re-created live by rule injection |
| π-RERUN-R2 | **STILL-RED → BK #47 W8 + W3** | `pi-MATERIAL-ringclip-census-overview-1440-{light,dark}.json` |
| π-RERUN-R3 | **CURED-GREEN** | `pi-MATERIAL-dropdown-doublering-1440-light.json` |
| π-RERUN-R4 | **CURED-GREEN** | `pi-SEARCH-ROUTE-aria-wiring-1440-dark.json` |
| π-RERUN-R5 | **CURED-GREEN** | `pi-DRAW-*`, `pi-BAND-*`, `pi-GALLERY-*` |
| π-RERUN-R6 | **SPLIT — window CURED · ring/paint STILL-RED → BK #51** | `pi-RING-reservation-and-mask-window.json` |
| π-RERUN-R7 | **CURED-GREEN** | `pi-MOBILE-wrap.json` |
| π-RERUN-R8 | **CURED-GREEN** (kill criterion read as inertia; ruling is the owner's) | `pi-SCROLL-ink-lag.json` |
| π-RERUN-D1 (+D1a, D1d) | **CURED-GREEN** | `pi-d2p1-FOURIER-boot-*`, `pi-d2p4-FOURIER-clock-untouched-*`, `pi-d2p8-FOURIER-nowebgpu-*` |
| π-RERUN-D2 | **CURED-GREEN** | `pi-d4p3-SCROLL-legibility-1440-dark.aa.json` + the 390 collapsed pair |
| π-RERUN-D3 | **CURED-GREEN** | `pi-d3p6-TOC-headings-AA-{light,dark}.json` |
| π-RERUN-D6 | **CURED-GREEN** | `pi-d3p5-*` **plus a live pre-cut tree**, which reproduced the defect |

---

[2026-08-29 · driver close-note: the seat hit the session wall immediately after the
verdict table — its last transcript line reads "154 artifacts banked, only my servers
killed. Writing the battery." The driver verified on disk: 154 artifacts + this file,
12/12 cells carrying verdicts, both servers absent, tree porcelain 0 at the seat's
own close reading. The two residual routes dispatch as cure units at this commit:
R2 → α unit-9 (the border-box collision at run.css:263-264 × layers.css:334) ·
R6-ring → γ unit-7 (the four zero-width .hm-mark mount classes).]
