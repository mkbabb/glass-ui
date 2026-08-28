# π BATTERY — BAND γ (handmark) · 10 CELLS · ALL DRAINED

**Seat:** singleton browser seat, `claude-opus-5` (asserted from this seat's own subagent
transcript
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_e9e29b07-16b/agent-a1718c476d4479838.jsonl`,
whose first user message is this band's order and whose every assistant record carries
`model: claude-opus-5`; the assertion `&&`-gated the chain). **Session:** 2026-08-28.
**Directory name kept** (`2026-08-25-pi-band/`) — it is the band's identity, cited in ⊕⁷⁹.
Dates live inside the records, not in the path.

**Sources of record read in full before any capture:** roster row **#51**
(`EXECUTION-PROGRESS.md`, the `5a69ed9f` landing block) · row **49**'s g3 note ·
`2026-08-10-lanegamma-unit5/RECORD.md` §7 (the ten cells, the π-BAND
never-wave-through clause, the π-SCROLL kill criterion) · that unit's
`PASTE-BLOCKS.md` §4 (each cell's detector, verbatim) · `ASK.md:22` (g3) · the three
subject files `HandMark.vue` (375) · `stroke.ts` (280) · `index.ts` (20) and the story
`demo/stories/motion/handmark.vue` (103).

**WALL RECOVERY — nothing owed here.** The predecessor's 18 partial files under
`alpha-dock-search/` were censused and dispositioned per file by the **α seat in this same
session**, its record at `alpha-dock-search/PI-BATTERY-alpha-dock-search.md` §"WALL
RECOVERY". They are α's subject (dock + search), not γ's. **This band adopts nothing and
supersedes nothing**; it writes only into its own `gamma-handmark/` directory.

**Environment.** Dev server **REUSED, not started by this seat**: `localhost:5400`,
port-guarded before the first capture (`curl` → `200`, `<title>glass-ui Feature
Demo</title>`). **Not killed at band end** — this seat did not start it.
**Chromium:** the `chrome-devtools` MCP daemon driven through the
`chrome-devtools-mcp:chrome-devtools-cli` skill (the MCP tool schemas are not registered
in this session; the CLI is the same server over its socket — no hand-rolled browser
script was used). ONE browser context throughout.
**Safari:** a **real** Safari 26.4 (`AppleWebKit/605.1.15`, `Version/26.4`), reached by
plain W3C WebDriver on `safaridriver -p 4599` after `pkill -f safaridriver`. Session
`22D1176A-B884-4FB7-8D4A-C1B4A1E9B31B`, **DELETEd and the driver killed at band end** —
this seat started it. **Declared deviation:** `scripts/safari-probe.mjs` carries a
hard-coded route list that **excludes `/motion/handmark`** and emits a glass-material
census rather than a handmark π reading, so **its own endpoints were driven directly**
against the same driver. No repo file was written and no probe was added to the tree.

**Observation discipline.** Screenshot + `getComputedStyle` only. **`getContext()` was
never called on any canvas** — every colour, area and nib figure below is read from a
**captured PNG in Node** (`pngjs` + `oklabFromRgb` from `scripts/reflect-capture-verify.mjs`,
the one colour-math source `scripts/lib/paint-arm.mjs` re-exports). Screenshots are
dpr-scaled; every crop scales the CSS box by the live `devicePixelRatio` (2 at 1440/1920,
**3** at 390). Scroll reads carry a ≥500 ms settle plus screenshot corroboration.

---

## THE VERDICT TABLE

| cell | verdict | one line |
|---|---|---|
| π-BAND | **DEFECT-ROUTED** (#51) | the two-arm mechanism's first live test: the arms *select* correctly in both engines, and the band **paints ZERO pixels** for the cell's own specimen in both themes |
| π-RING | **DEFECT-ROUTED** (#51) | the `padding-inline` reservation **does** push a real neighbour; the ring itself is **never painted** — two independent causes |
| π-MOBILE | **DEFECT-ROUTED** (#51) | no bridging (PASS), but **two** chisels per line rect, not one |
| π-DRAW | **DEFECT-ROUTED** (#51) | `T = 140 + 0.55·L` and the per-rect clocks are **exact**; the draw itself erases the mark, in both engines |
| π-PEN | **CAPTURED-GREEN** | painted `w(48.7157)/w(18.608)` = **1.9615** light / **2.2018** dark, both inside `2.06 ±10%` |
| π-HOVER | **CAPTURED-GREEN** | a real hover re-inks on `--spring-press`; it is also the instrument that isolates π-DRAW |
| π-TOUCH | **CAPTURED-GREEN** | on a real coarse pointer (`(hover:none)` true), a tap re-inks; paired untapped control in the same frame |
| π-SCROLL | **DEFECT-ROUTED** (#51) | ink-lag amplitude **0.00 px** — the mechanism never engages; **kill criterion NOT triggered** |
| π-GALLERY | **DEFECT-ROUTED** (#51) | five sections present; at rest four of them show no mark at all |
| π-LADDER | **CAPTURED-GREEN** | the three rungs are `--type-body × {1, 1.618, 2.618}` exactly, and the nib holds its allometry across them |

**Three root defects carry all seven REDs. None was fixed here — this seat fixes nothing.**

---

## THE THREE DEFECTS, PROVEN FROM PAINT AND COMPUTED STYLE

### γ-π-1 · `minJerk()`'s terminal control point is the loop INDEX, not `1`

`src/components/handmark/stroke.ts:86`, verbatim:

```js
stops.push(i === 0 || i === samples ? `${i}` : `${round(v)} ${round(t * 100)}%`);
```

At `i === samples` that emits `24`, so the easing the draw runs on is, verbatim from the
live animation in Chromium:

```
linear(0 0%, 0.001 4.167%, … , 0.995 91.667%, 0.999 95.833%, 24 100%)
```

and from **real Safari 26.4**: `… 1.00 95.833%, 24.00 100%)`. **The easing's output at
`t=1` is 24**, so the animated `stroke-dashoffset` settles at
`from + (to − from)·24 = −23 × dasharray`. Every measured guide, both engines, sits at
exactly that: `−3909.29 / 169.969`, `−2416.56 / 105.068`, `−1493.89 / 64.9518`,
`−8598.43 / 373.845`, `−3371.06 / 146.568` — **the ratio is −23.000 in all of them**, and
every animation's `playState` is `finished` with `fill: both`, so this is the **resting**
state and not a caught frame.

With `stroke-dasharray: <total>` the pattern period is `2 × total`, and `−23 × total` is
congruent to `+1 × total`: the dash occupies path range `[−total, 0]` and the **gap**
occupies `[0, total]`. The guide therefore lies **wholly inside the gap**, the mask
renders empty, and the ink paints nothing at all except the dash's round linecap —
radius `stroke-width / 2` — bleeding back over each guide end. That prediction is what
the pixels show: a **2–3 px** dot at the underline ends (`stroke-width` 5.90) and a
**13–15 px** chip at each band end (`stroke-width` 30.08), and the per-column painted
profile of `rose` has exactly two such humps with 36 dead columns between them.

**The paired delta names it without argument.** `pi-DRAW-A-crop-revealed-1440-light.png`:
a real hover re-inks `drawn`, `stroke-dashoffset` → `0px`, the underline is fully painted.
`pi-DRAW-B-crop-erased-1440-light.png`: clicking the story's **own `Replay` button** —
which calls the component's exposed `play()` — returns the offset to `−3371.06px` and
**erases the line**. The documented affordance ("Replay it whenever you like") destroys
the mark.

**Why no gate saw it:** `minJerk` is exported from `index.ts:14` and has **zero
references** in `tests/` or `tests-visual/` — `grep -rn minJerk src tests tests-visual demo`
returns four hits, all in `src/`. The 47-case battery never asserts the easing string.

### γ-π-2 · the mask's percentage window collapses with an inline host's box

`HandMark.vue:294-301` sizes the mask `maskUnits="userSpaceOnUse" x="-100%" y="-100%"
width="300%" height="300%"` — percentages **of the SVG's own box** — while `:335-343`
gives `.hm-mark` `position:absolute; left:0; top:0; width:100%; height:100%` inside a
`display:inline; position:relative` host. Measured computed `.hm-mark` widths:

| mount | Chromium 1440 | Chromium 1920 | Chromium 390 | Safari 26.4 (1440) |
|---|---|---|---|---|
| `pays in` (bare slot, 1 line) | 162.04px | — | 139.32px | 158.63px |
| `Friday` (`<del>` wrapper, 1 line) | **0px** ×2 | — | **0px** ×2 | 87.09px ×2 |
| `threefold` (bare slot, padded host, 2-line box) | **0px** | — | **0px** | 173.08px |
| `Hpqjy really matters` (`<mark>`, 2 lines) | **0px** ×4 | **9.05px** ×4 | **0px** ×4 | **0px** ×4 |
| `rose` (`<mark>`, 1 line) | not read at 1440 | 68.17px ×2 | 52.87px ×2 | 63.73px ×2 |

(Chromium 1440 figures are the dark-arm reading; the `pays in` column is the SVG's own
box, not the host's rect, which is why it differs from the 158.6 px host width quoted
elsewhere. `rose` was not read at 1440 in Chromium and no figure is invented for it.)

A `0px` box gives a **zero-area** mask window and the ink is fully masked out; a `9.05px`
box gives a window of `[−9.05, +18.09]`, which is why the wrapped hue-78 band paints as a
**21 px orange chip on the "H" and nothing at all on its second line**
(`pi-GALLERY-all-revealed-1920-light.png`). **This is independent of γ-π-1**: with
`stroke-dashoffset` forced to `0px` by a real hover, the ring still paints nothing
(`pi-RING-no-ring-painted-crop-1440-light.png`).

**It also diverges across engines**, which is the reason to state it separately: Safari
resolves real widths for `Friday` and `threefold` where Chromium resolves `0`, so in
Safari those two mounts have a live mask window and are killed only by γ-π-1 — visible as
the small hook surviving between "Up" and "threefold" in
`pi-GALLERY-safari26-rest-1440.png`.

**Why no gate saw it:** `G-HM-LAYER 2` — *"CONTAINMENT, geometric — extent is geometry,
never isolation"* (`tests/components/custom/handmark/g-hm-layer.test.ts:169`) — reasons
over `ringAxes()` in pure geometry and never reads a rendered `.hm-mark` box or the mask's
percentage window. The unit-5 record's own §7 states the doctrine *"extent is fixed by
geometry alone"*; on a live surface it is fixed by **that percentage window**, and the
window collapses.

### γ-π-3 · `slotRects()` double-counts through a `<del>` / `<mark>` wrapper

`HandMark.vue:101-114` builds a `Range` over the slot's child nodes and takes
`getClientRects()`. When the slot is wrapped — `<del>` for `strike`, `<mark>` for
`highlight` — the range returns **both the wrapper's box and its text box per line**, so
the component emits **two identical overlapping marks per line rect** and chains the
second's delay behind the first's duration. Measured rect counts: bare slot → 1
(`pays in`, `threefold`), `<del>` → 2 (`Friday`), `<mark>` → 2 per line (`rose`,
`violet`), `<mark>` over two lines → **4** (`Hpqjy really matters`, guide lengths
`171.583 / 108.632 / 170.281 / 108.817` — line1, line2, line1′, line2′).

**Why no gate saw it:** both handmark gates **stub** `Range.prototype.getClientRects` to a
hand-authored list (`g-hm-mark.test.ts:69`, `g-hm-layer.test.ts:85`), so the duplicate a
real wrapper produces is unobservable to them by construction.

---

## THE CELLS

### π-BAND — **DEFECT-ROUTED**

> *both arms · both themes · ≥3 hues (78/318/270) · specimen carrying
> cap+ascender+descender · painted L window [0.80,0.87] light / [0.42,0.48] dark ·
> painted C ≥ 0.08 · page fg on band ≥ 4.5:1 · band vs card ≥ 1.30:1 · dark÷light painted
> area ≥ 0.90. CANVAS READBACK ONLY … THE FIRST LIVE TEST OF THE TWO-ARM MECHANISM. Never
> wave through on a foreman capture.*

**The cell's own predicted mutation is confirmed in both engines**: `getComputedStyle`
returns `--hm-band` as the authored literal
`light-dark(oklch(0.86 0.16 318), oklch(0.44 0.16 318))` verbatim in Chromium **and** in
Safari 26.4 (`CSS.supports("color","light-dark(red,blue)")` → `true` there). What *does*
resolve is the `fill` presentation property, and it resolves **to the right arm**:
`oklch(0.86 0.16 318)` under `color-scheme: light`, `oklch(0.44 0.16 318)` under `dark`,
identical in Safari. **The two-arm SELECTION works. The band does not paint.**

*Painted* means OKLab chroma ≥ 0.08 — the cell's own floor, which cleanly separates band
ink from the warm paper grain (C ≈ 0.025) and the page text (C ≈ 0.006).

**REST STATE — the cell's subject** (`pi-BAND-highlight-section-1440-{dark,light}.png`,
1440×806 @dpr2, `/motion/handmark`):

| hue | specimen | dark painted px | light painted px | shape of what survives |
|---|---|---|---|---|
| **78** | `Hpqjy really matters` (H cap · l/j ascender · p/q/y descender) | **0 of 144,400** | **0** | nothing; also 0 at floors 0.06 and 0.05 |
| 318 | `rose` | 1,236 (12.6%) | 1,289 (13.2%) | **two** end chips of 13–14 CSS px, 36 dead columns between |
| 270 | `violet` | 705 (5.9%) | **0** | one 15 CSS px chip; the light arm is below the C floor entirely |

**The specimen the cell names by its own letterforms paints nothing, in both themes.**
That is the finding, and it is why this cell is not waved through.

**REVEALED STATE — banked so the windows have a live reading at all.** The only way to
see a band is the re-ink (π-HOVER / π-TOUCH). Modal interior colours, read from the PNG:

| arm | hue | modal painted L | window | C | band÷card | fg on band |
|---|---|---|---|---|---|---|
| light | 318 | 0.8053 – 0.8159 | [0.80, 0.87] **IN** | 0.1267–0.1282 **IN** | 1.729–1.792 **IN** | 9.04–9.37 **IN** |
| light | 270 | 0.7860 – 0.7982 | **OUT**, −0.014 low | 0.0706–0.0722 **OUT** | 1.740–1.815 IN | 8.92–9.31 IN |
| dark | 318 | 0.4802 – 0.4929 | [0.42, 0.48] **OUT**, high | 0.1460–0.1494 **IN** | 1.486–1.574 **IN** | 5.44–5.76 **IN** |

Two window failures that survive even a fixed draw, stated rather than smoothed:
**(a)** the dark arm paints at ≈ 0.485 against an authored `oklch(0.44 …)` — the card's
`paper-grain-overlay` composites over the band and lifts it ≈ +0.045 L, straight through
the window's 0.48 ceiling. **(b)** `oklch(0.86 0.16 270)` is **outside sRGB**; Chromium
gamut-maps it to a painted chroma of **0.071**, under the cell's own 0.08 floor, and its
L lands 0.014 below the window. Hue 318 passes every arm in both themes.
**dark ÷ light painted area** = 0.9589 at rest, 0.9732 revealed — both ≥ 0.90, but the
rest-state figure is a ratio of **chips**, not of bands, and is reported as such.

Artifacts: `pi-BAND-two-arm-paired.json`, `pi-BAND-highlight-section-1440-{dark,light}.png`,
`pi-BAND-hover-revealed-3hues-1440-light.png`, `pi-HOVER-reink-reveals-band-1440-dark.png`.

### π-RING — **DEFECT-ROUTED**

> *the `padding-inline` reservation PUSHING a real neighbour (never yet painted).*

**The reservation arm is GREEN and it is the first time it has been seen live.** Computed
`padding-inline` on the circle mount: **18.2611px** (1440 dark), **21.028px** (1920 light),
**19.66065px** (Safari 26.4), matching `--hm-reserve` exactly; the host rect grows from a
≈154 px text width to **190.44 px** = text + 2 × 18.2611, and the gap it opens between
"Up" and "threefold" is visible in every capture, both engines, both themes.

**The ring itself is never painted.** In Chromium the mount's `.hm-mark` computed width is
**`0px`**, so the mask's `-100% / 300%` `userSpaceOnUse` window has zero area and the ink
is entirely masked — and this holds **with `stroke-dashoffset` forced to `0px`** by a real
hover, which separates it from γ-π-1. In Safari the same box is `173.08px`, the window is
real, and only the round-cap residue survives — killed there by γ-π-1 instead.

Artifacts: `pi-RING-reservation-and-mask-window.json`,
`pi-RING-no-ring-painted-crop-1440-light.png`, `pi-GALLERY-safari26-rest-1440.png`.

### π-MOBILE — **DEFECT-ROUTED**

> *390×844, the wrap case: one chisel per line rect, no bridging.*

Emulated with `--viewport '390x844x3,mobile,touch'`; verified in-page: `dpr` 3,
`(hover:none)` **true**, `(pointer:coarse)` **true**, `maxTouchPoints` 1.

**No bridging — PASS.** The two-line mark's line-1 ink bbox spans `x ∈ [−3.3, +169.6]` and
line-2 spans `x ∈ [−185.3, −69.9]` in the shared SVG frame: disjoint, no rect reaches into
another line.

**One chisel per line rect — FAIL.** The wrapped mount emits **4** `.hm-mark` SVGs over
**2** line rects (γ-π-3). All four `.hm-mark` boxes resolve `width: 0px` at this viewport,
so nothing paints regardless. Artifacts: `pi-MOBILE-wrap.json`,
`pi-MOBILE-wrap-rest-390x844-light.png`.

### π-DRAW — **DEFECT-ROUTED**

> *the mask-dash minimum-jerk draw · per-rect clocks · T = 140 + 0.55·L.*

**`T = 140 + 0.55·L` is EXACT on all five measured rects** — `169.969 → 233.483`,
`105.068 → 197.787`, `64.9518 → 175.723`, `373.845 → 345.615`, `146.568 → 220.612`,
against observed durations `233.48308786517094`, `197.7871665027224`, `175.72348835101775`,
`345.6149151825557`, `220.61242284494188`. **The per-rect clocks chain correctly**: the
strike's second rect starts at `190.34623041297226` = the first's duration; the
highlight's four delays are `0 / 234.371 / 434.118 / 667.773`, each the running sum. Both
arms GREEN.

**The draw itself is RED** — γ-π-1 in full, including the `Replay`-erases-the-mark paired
delta. Artifacts: `pi-DRAW-easing-terminal-stop.json`, `pi-DRAW-A-*`, `pi-DRAW-B-*`.

### π-PEN — **CAPTURED-GREEN**

> *the nib at three rungs — painted `w(48.70)/w(18.608)` = 2.06 ±10%* → window
> `[1.854, 2.266]`.

Method: per-column contiguous ink run about the derived underline seat (baseline +
0.1 em), median over the middle 80 % of each rect, sub-pixel edges by alpha, read from the
PNG at dpr 2.

| rung | closed form `nib(1, fs)` | painted median, light | painted median, dark |
|---|---|---|---|
| 48.7157 px | 3.6879 | 4.161 | 3.662 |
| 30.1077 px | 2.5706 | 3.109 | 2.559 |
| 18.608 px | 1.7919 | 2.121 | 1.663 |

**Ratio: 1.9615 (light) · 2.2018 (dark) — both INSIDE `[1.854, 2.266]`.**
**Disclosure:** measured on the re-ink-revealed state, because the rest state paints no
mark; all three rungs were revealed the same way so the *ratio* is a fair reading, and the
light arm's ≈ +0.4 CSS px absolute offset is the antialias edge at dpr 2.
Artifacts: `pi-PEN-nib-allometry.json`, `pi-PEN-LADDER-revealed-1440-light.png`,
`pi-LADDER-revealed-1440-dark.png`.

### π-HOVER — **CAPTURED-GREEN**

> *re-ink replay on the press spring.*

A **real** pointer hover (dispatched by the daemon, not a synthetic event) takes `rose`'s
two guides from `−1469.03px / −1464.32px` to **`0px`**, while `violet` **in the same
frame** stays at `−1756.81px / −1744.76px`. The replay animation runs 220 ms on the
`--spring-press` token, whose `linear()` tail is verbatim `0.97581 97.959%, 1 100%` — it
**terminates at 1**, which is precisely why the re-ink is the only state in which any mark
paints, and why γ-π-1 is isolated to `minJerk()` rather than to the mask-dash idea.
Artifacts: `pi-HOVER-reink.json`, `pi-HOVER-reink-reveals-band-1440-dark.png`.

### π-TOUCH — **CAPTURED-GREEN**

> *tap re-ink on `(hover:none)` — the coarse pointer's own answer.*

On a genuinely coarse pointer (`(hover:none)` true, `(pointer:coarse)` true,
`maxTouchPoints` 1, `isMobile` + `hasTouch`), a tap on `rose` takes its guides from
`−1263.14px / −1259.09px` to **`0px`**; the untapped `violet` control in the same frame is
unchanged at `−1510.71px / −1500.36px`, and the capture shows a full band on one and two
end chips on the other. Artifacts: `pi-TOUCH-tap-reink.json`,
`pi-TOUCH-tap-reink-390x844-light.png`.

### π-SCROLL — **DEFECT-ROUTED · KILL CRITERION NOT TRIGGERED**

> *ink-lag ≤1.5px. KILL CRITERION: if it reads as a made mark DETACHING from its word, the
> resolution is DELETION, not tuning.*

41 rAF-cadence samples while `main.demo-main-scroller.scrollTop` was driven `0 → 163px`,
plus one settle sample 700 ms after the scroll stopped. **Every sample read
`matrix(1, 0, 0, 1, 0, 0)`** — the set of distinct transforms over the whole run has
exactly one member. `hm-mark--settling` was **never** applied and `window.scrollY` stayed
`0` throughout.

**Measured ink-lag amplitude: 0.00 px ≤ 1.5 px.** The threshold is satisfied and the
satisfaction is worthless: the mechanism never engages. `HandMark.vue:256` registers
`onScroll` on **`window`**, and the demo scrolls **`main.demo-main-scroller`**; a scroll
event on an element does not reach `window`, and the document itself is not scrollable on
this route (`documentElement.scrollHeight === innerHeight`). A reading of the source, not
a claim: `lag = sign(delta) · min(1.5, |0.06·delta|)` is **capped at 1.5 by
construction**, so even wired the amplitude could not exceed the cell's threshold.

**Against the kill criterion:** detachment **is not observed**, because nothing moves.
The criterion's trigger is therefore **not met**, and the disposition of a mechanism that
is inert on its own subject surface — delete it or rewire it — **belongs to the owner, not
to this capture seat**. Artifact: `pi-SCROLL-ink-lag.json`.

### π-GALLERY — **DEFECT-ROUTED**

> *the five-section story.*

All five sections render and are titled — `UNDERLINE` · `STRIKE` · `CIRCLE` ·
`HIGHLIGHT` · `THE DRAW` — over 9 HandMark mounts. **At rest, four of the five show no
mark at all** in Chromium (three underline rungs, the strike, the circle, and the draw's
underline all absent); the highlight section shows only end-cap chips on two of its three
hues and nothing on the third. Safari 26.4 tells the same story with one difference: the
circle's cap residue survives there, because its `.hm-mark` box is not collapsed
(γ-π-2). Captures: `pi-GALLERY-story-fullpage-1440-dark.png`,
`pi-GALLERY-rest-top-1440-dark.png`, `pi-GALLERY-safari26-rest-1440.png`, and the
revealed counterparts `pi-GALLERY-revealed-top-1440-light.png`,
`pi-GALLERY-all-revealed-1920-light.png`.

**g3 — FIRES HERE, AND IS NOT LOGGED, WITH GROUNDS.** `ASK.md:22` reads
*"g3 | aurora DUSK/DAWN | #49 — at π-GALLERY, **after the medium-collapse renderer fix** |
harden-not-delete"*. The π-GALLERY g3 names is the **aurora** medium gallery of roster row
49, not this band's handmark story, and **its own precondition is unmet on this tree**: a
bounded look at `/substrates/aurora` from this seat found `data-aurora-settled` **null**
(the settle beacon absent) and a canvas whose **backing store is 300×150** against an
**830×246 CSS box**. A DUSK/OPENAI_DAWN confusability comparison taken in that state would
be vacuous, so **nothing is logged against g3** and the aurora observation is **ROUTED to
roster row 49 / the π-ARCHIVE seat** rather than claimed as a γ finding. Evidence:
`g3-aurora-precondition-unmet-1440-dark.png`.

**One adjacent defect, ROUTED and explicitly NOT claimed.** At
`main.demo-main-scroller.scrollTop = 257` @1440, the sticky story-header cluster paints its
title and blurb **over** the underline card's content — text on text, both themes, visible
in `pi-PEN-LADDER-revealed-1440-light.png`. Owner: the `demo/chassis` story header (δ's
surface). Outside this band's fence; recorded so it is not rediscovered, not counted as γ's.

Artifact: `pi-GALLERY-five-sections.json`.

### π-LADDER — **CAPTURED-GREEN**

> *the three rungs.*

Measured font sizes at 1440: **48.7157 / 30.1077 / 18.608 px**, against
`--type-body` = 18.608 → `×1.618 = 30.108`, `×2.618 = 48.716`. **The ladder is exact.**
The painted nib holds its allometry across all three rungs in both themes (table under
π-PEN). Crops: `pi-LADDER-three-rungs-crop-1440-{light,dark}.png`. Artifact:
`pi-LADDER-three-rungs.json`.

---

## WHAT THIS SEAT DID NOT DO

```
· NOTHING WAS FIXED. Zero source bytes touched; no gate file touched; nothing minted.
· No git add / commit / stash / checkout. The tree is shared. The driver commits.
· No dev server started and none killed — :5400 was reused and left running.
· The Safari session and the safaridriver process WERE started here and BOTH were
  closed at band end (DELETE /session, then pkill -f safaridriver; `pgrep -f
  safaridriver` → none).
· The Chromium daemon was INHERITED live from the α seat, not started here. At band end
  its one page was navigated back to `about:blank` — the subject is released — and the
  daemon itself is LEFT RUNNING for the next serialized seat, exactly as α left it for
  this one. Killing shared infrastructure the seat did not start is not a teardown.
· getContext() was never called on any canvas, live or otherwise.
· No predecessor artifact was adopted or superseded — the 18 files under
  alpha-dock-search/ are α's subject and α censused them this same session.
· g3 NOT LOGGED (precondition unmet, grounds above). The /substrates/aurora observation
  is routed to row 49, not claimed.
· The story-header overlap is routed to demo/chassis (δ), not claimed as γ's.
· No disposition was taken on π-SCROLL's kill criterion — the observation is recorded
  against it and the ruling is the owner's.
· No figure above was repeated from memory: every number is either read live at this
  seat or measured from a PNG banked in this directory.
```

## ROUTING

All seven REDs route to **roster row #51 GF-HANDMARK** (lane γ unit 5, landed `5a69ed9f`),
whose files they are, at these sites:

| defect | site | cells it takes down |
|---|---|---|
| γ-π-1 easing terminal stop | `src/components/handmark/stroke.ts:86` | π-BAND · π-RING · π-MOBILE · π-DRAW · π-GALLERY |
| γ-π-2 mask window collapse | `src/components/handmark/HandMark.vue:294-301` + `:335-343` | π-BAND (hue 78) · π-RING · π-MOBILE |
| γ-π-3 wrapper double-rect | `src/components/handmark/HandMark.vue:101-114` | π-MOBILE |
| γ-π-4 scroll listener target | `src/components/handmark/HandMark.vue:256` | π-SCROLL |

Three detector gaps are named with them, because each is why a landed, gate-verified cut
shipped a component that paints nothing: **`minJerk` has zero test references** anywhere in
the repo; **`G-HM-LAYER 2` reads geometry and never the rendered mask window**; and **both
handmark gates stub `Range.prototype.getClientRects`**, so no wrapper-induced duplicate can
reach them.
