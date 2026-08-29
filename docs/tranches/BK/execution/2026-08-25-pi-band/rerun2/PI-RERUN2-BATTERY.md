# π RE-CAPTURE BATTERY — SECOND PASS (`pi-RERUN2-`)

**Seat.** The singleton π re-capture seat, two cells, at `master` **`30abc048`**, tracked tree
porcelain **0** at open and at close. Model asserted from this seat's own on-disk subagent
transcript before any other act — `agent-a42df5942cad5890c.jsonl`, whose first user message is
this seat's prompt, carries `"model": "claude-opus-5"` on every assistant record and no other
model id. `CLAUDE_MODEL_ID` was unset, so the assertion is the transcript's and not an
environment echo.

**Transport, stated because it is a deviation.** The order names chrome-devtools MCP with
playwright as the fallback. **Neither MCP server was exposed to this session** — `ToolSearch`
over the deferred roster returns only `Monitor`, `WebFetch`, `WebSearch`, `TaskStop`,
`SendMessage`, `EnterWorktree`, `ExitWorktree`, `NotebookEdit`; there is no
`mcp__chrome-devtools__*` and no `mcp__playwright__*` to load. The fallback was therefore taken
one rung further down: the repo's own `playwright@1.61.1` driving **Google Chrome for Testing,
Chromium `149.0.7827.55`** — the engine version the order specifies. One browser process at a
time, closed at the end of each cell. No second browser owner ran at any point.

**Standing laws, honoured.** Screenshot + `getComputedStyle` only. **`getContext()` is never
called on any canvas or any element in this battery** — the only geometry reads are
`getBoundingClientRect()`, `getBBox()`, `getTotalLength()` and computed style. Colour is read
from captured PNGs in Node through `pngjs` + `oklabFromRgb`, re-exported by
`scripts/lib/paint-arm.mjs`, which parses `oklab()`. Every crop scales the CSS box by the live
`devicePixelRatio` **before** cropping (2 at 1440, 3 at 390×844). Every scroll is followed by a
≥600 ms settle before any read or shot.

**Server.** Port-guarded (`lsof -nP -iTCP -sTCP:LISTEN`; 5433–5436 all free, 5433 taken),
`npx vite --host localhost --port 5433 --strictPort`, `HTTP 200`, **killed at close**. Build
freshness: the dev server compiles from `src/` at `30abc048`, so both cures are the bytes under
test — `run.css:250 box-sizing: content-box` and `HandMark.vue`'s per-frame `:width`/`:height`
were both read back off the live DOM (`boxSizing: "content-box"`; every `.hm-mark` carrying a
numeric `width` attribute, no percentages).

**Coverage.** 2 cells owed, **2 captured, 2 verdicts**. 10 arms owed on R2 + the adjudication's
morph flag; 9 arms owed on R6 + the one live-engine unknown. **90 artifacts** banked here (86
captures + 4 instruments). Cells at 1440×900 dpr 2 in both themes; R6 additionally at
390×844 dpr 3 in both themes. Zero arms deferred, zero arms staged, zero arms claimed
without a pixel or a computed value behind them.

---

## VERDICT TABLE

| cell | verdict | route |
|---|---|---|
| **π-RERUN2-R2** | **CURED-GREEN** | none — R2 closes |
| **π-RERUN2-R6** | **CURED-GREEN** | none — R6-ring closes; **the culling special-case did NOT fire** |

---

## 1 · π-RERUN2-R2 — the reserve that now has room to be a reserve · **CURED-GREEN**

Order of record: `docs/tranches/BK/execution/2026-08-10-lanealpha-unit9/PI-QUEUE.md`.
Control: `../rerun/PI-RERUN-BATTERY.md` §π-RERUN-R2 at `dfe6971f`.
`/dock/overview` @1440×900, **both themes, figures identical in both** — which is what the queue
said a geometry cure must look like.

### The queue stated its expected shape in advance. All six figures landed on it.

| arm 1 · sidebar vertical run `i=0` | control | **expected, stated in advance** | **HEAD light** | **HEAD dark** |
|---|---|---|---|---|
| `runBorderBox` w | 40 | **48** | **48** | **48** |
| `clientW` | 40 | **48** | **48** | **48** |
| `scrollW` | 48 | **48** | **48** | **48** |
| `crossContent` | 32 | **40** | **40** | **40** |
| `crossSeat` | 40 | **40** | **40** | **40** |
| **`crossOverflow`** | **+8** | **0** | **0** | **0** |

`runBorderBox [16,28,48,637]`, `boxSizing` reads **`content-box`** off the live element,
`--dock-ring-reserve` resolving to **4** everywhere (`reserveSeen [4]`). `crossOverflow` is
reported under the control's own definition, `crossSeat − crossContent` (which reproduces the
control's `+8` at `i=0` and `−16` at `i=1`); the scroll definition `scrollW − clientW` gives
**0** here as well, so the arm does not depend on which one is meant.

**Arm 2 — the margin box is handed back, and the dock did not move.**
`runMarginBox` **`[20,28,40,637]`** — width **40**, against the control's **32**, and the x
origin back at **20**. `dockRect` **`[8,20,64,653]`** — **byte-identical to the control**. The
cure did not move the dock.

> *Instrument note, stated because a wrong number was banked mid-run and then corrected:* the
> margin box is the border box **expanded** by its margins, `left = borderLeft − marginLeft`.
> A first pass added the margin instead of subtracting it and reported `x 12`; with a `−4px`
> margin that is wrong by 8px. The corrected arithmetic reproduces the control's own `32` from
> the control's own border box, which is how it was checked. The banked artifacts carry the
> corrected values and state the rule inline (`marginBoxRule`).

**Arm 3 — cross-axis clip count → 0.** Broken out by axis, never reported as a bare
`clippedCount`:

| | control | **HEAD light** | **HEAD dark** |
|---|---|---|---|
| **any cross-axis clip** | **21** | **0** | **0** |
| any scroll-axis clip | 34 | 19 | 19 |
| cross-only | 15 | **0** | **0** |
| scroll-only | 28 | 19 | 19 |
| both axes | 6 | **0** | **0** |
| seats censused | 68 | 59 (51 focusable + 8 separators) | 59 |

**Arm 4 — the scroll-axis residual, reported as a number and not folded away: 19.**
**19 of 19 sit at a scroll extremity** (`scrollAxisAtExtremity 19`, `scrollAxisNotAtExtremity`
**0**), and 13 of them ride a run with nothing to scroll at all. That is exactly the refused
class the unit-8 RECORD §2.2 and this unit's §3 describe: a seat flush against a scroll
extremity loses its outward 4px because a scroller clips its scroll axis by definition. **This
cell does not fail on them and did not try to cure them** — no scroll-axis padding was added,
the snapport was not moved, and `scroll-padding` was not touched.

> *Why 19 and not 34.* The population differs, not the geometry. The control's census script
> was inline in a session that hit the wall and is not recoverable from the bank; its artifact
> banks `total 68` but only a **24-row sample**, so the seat predicate cannot be read back off
> disk. This seat reconstructed it and states it explicitly: real boxes inside a `.dock-run`
> matching `.dock-icon-button, .dock-trigger, button, [role=button], .dock-separator`,
> **excluding `display:contents` elements**, which have no principal box — their
> `getBoundingClientRect()` is a union of descendants and measures nothing real. A first pass
> that included them produced 5 phantom "cross-axis clips" with impossible cuts
> (`left:300.5`, `top:840`) on `contents` wrappers; all 5 vanish once boxless elements are
> excluded, and **that is the whole difference between 5 and 0** on the cross axis. The
> instrument is banked at `instruments/` so the next seat does not have to reconstruct it
> again.

**Arm 5 — the synthetic seat-fill clip-edge probe, repeated.** Seat painted solid magenta,
`border-radius` and `box-shadow` suppressed, scanline at the seat's vertical centre:

| | control | **HEAD light** | **HEAD dark** |
|---|---|---|---|
| layout box cssX | `20.0 .. 60.0` | `20.0 .. 60.0` | `20.0 .. 60.0` |
| **paint reach cssX** | **`20 .. 55.5`** | **`20 .. 60`** | **`20 .. 60`** |
| device px on scanline | — | **80 / 80** | **80 / 80** |
| cut left / right | 0 / **4px** | **0 / 0** | **0 / 0** |

**The 4px of button that was being cut off is back.** `pi-RERUN2-R2-SYNTHETIC-seatfill-clipedge-1440-{light,dark}.png`
shows an uncut square.

**Arm 6 — the ring paints BOTH arcs, driven by a real Tab.** Focus reached by pressing `Tab`
with the pointer parked off every dock; never programmatic focus. Focused seat
`[20,28,40,40]`, outline `2px solid color(srgb 0.11 0.098 0.09 / 0.48) off:2px` (light),
`color(srgb 0.73 0.718 0.67 / 0.48)` (dark). Ink located by focus-vs-blur delta on the
scanline at the seat's vertical centre:

| | control | **HEAD light** | **HEAD dark** |
|---|---|---|---|
| left arc, band `16 .. 18` | `16, 16.5, 17, 17.5` | `16, 16.5, 17, 17.5` | `16, 16.5, 17, 17.5` |
| right arc, band `62 .. 64` | **absent** | **`61.5, 62, 62.5, 63, 63.5, 64, 64.5`** | **`62, 62.5, 63, 63.5`** |
| both arcs | **no** | **YES** | **YES** |

The left arc reproduces the control's four positions to the pixel; the right arc, which the
control found **absent**, now paints. Ink further right than the ring band (70 px light /
53 px dark beyond `64.5`) is a focus-revealed label outside the run, not ring ink; it is
reported separately as `inkBeyondRing` rather than folded into the arc counts.

**Arm 7 — the horizontal half of the same collision.**

| `i=5` (the run whose `min-height` binds) | control | **HEAD, both themes** |
|---|---|---|
| `dockRect` h | **48** (siblings 56) | **56** |
| `runMarginBox` h | **32** | **40** |
| `crossContent` | 32 | **40** |

The auto-cross-axis horizontal runs are unmoved: `i=1, 7, 8, 10` all read `crossOverflow`
**−16**, byte-identical to the control's `i=1` figure, with `runBorderBox [425,516.11,56,64]`
and `runMarginBox [425,520.11,56,56]` against the control's `[425,517.45,56,64]` /
`[425,521.45,56,56]` — identical in x, width and height, offset by a uniform **1.34px** in page
y that applies to every dock on the route and is a page-level layout offset, not a run-box
change. `i=9` reads `crossOverflow 0` (a `shape-card` dock whose seat height equals its content
height). `content-box` and `border-box` agree on an auto axis, and they do.

**Arm 8 — the lattice is byte-unchanged.**
`seatOffsets` **`[0,48,96,144,192,240,288,336,384,432,480,534,549,597]`** — **all fourteen
entries byte-identical to the control**, both themes, step 48 preserved including the
`480 → 534 → 549` separator break. `--dock-pitch` **`48px`**. `scrollPos [0,0]` at rest.

**Arm 9 — the scroll timeline still runs.** The sidebar run is **not scrollable**
(`scrollH 637 === clientH 637`, `scrollMax 0`), so its plate holds its base corner — which is
`run.css`'s own stated behaviour ("when there is NOTHING to scroll the timeline is inactive").
The arm was therefore run on the three runs on this route that genuinely scroll, all three
**active** and correctly wired (`animation-name: gl-dock-cap-*`, `animation-timeline: --dock-run, --dock-run`):

| run | scroll range | rest corners | mid-scroll | flush-at-end | rest = back |
|---|---|---|---|---|---|
| `horizontal shape-pill collapsed` | 421 | `50% / 16px / 16px / 50%` | all `16px` | all `16px` | ✅ |
| `horizontal shape-pill collapsed` | 176 | `50% / 16px / 16px / 50%` | all `16px` | `16px / 41.67% / 41.67% / 16px` | ✅ |
| `w-80 shape-card expanded` | 128 | `24 / 10 / 10 / 24px` | all `10px` | `10 / 24 / 24 / 10px` | ✅ |

Leading cap at rest, cut mid-scroll, trailing cap restored flush-at-end, and the run returns to
its rest corners. Changing the run's box model did not perturb the progress timeline.

**Arm 10 — light AND dark.** Every figure above is identical in the two arms. There is no
divergence, so there is no finding.

### THE ADJUDICATION'S MID-MORPH FLAG — observation for the owner, not a kill

`layers.css:334` — `.glass-dock.expanded:not(.fit-content) .dock-layer--full { width: 100% }`
— carries **no `[data-morphing]` gate**, confirmed on disk. The line directly above it,
`.glass-dock.expanded:not(.fit-content):not([data-morphing]) .dock-layers`, **does**.

A `requestAnimationFrame` box trace was taken across a real collapse→expand cycle on
`relative z-10 glass-dock horizontal shape-pill collapsed`, driven by a **real pointer**
(`page.mouse.move` in and out; synthetic `PointerEvent` dispatch does not arm the morph and a
first pass that used it recorded `sawMorphing: false` — stated so the negative is not mistaken
for evidence). **379 frames, 66 of them with `[data-morphing]` set.**

**The morph shows a discontinuity.** The run's border box takes exactly **three discrete
widths across all 379 frames — `56 → 0 → 157`** — with no intermediate value at any sampled
frame:

| boundary | t (ms) | `runBorderBox` w × h | `.dock-layer--full` computed width | `[data-morphing]` |
|---|---|---|---|---|
| collapsed at rest | 3320 | **56 × 64** | `56px` | no |
| morph entry | **3460.5** | **0** × 48 | **`0px`** | **set** |
| morph settle | **4018.6** | **157** × 48 | `157px` | cleared |

Two frame-to-frame jumps, `ΔW 56` / `ΔH 16` at entry and `ΔW 157` at settle; the zero-width
window lasts the whole ≈558 ms morph. The mechanism is the ungated rule: `.dock-layers` hands
its box to the transform when `[data-morphing]` is set, and `.dock-layer--full`'s `width: 100%`
keeps applying against that now-auto parent, resolving to `0px`.

**What is and is not the cure's.** A zero-width resolution mid-morph would occur under
`border-box` too — `100%` of a zero-width parent is zero either way — so the discontinuity
itself is not created by this cure. What the cure does change is the **collapsed-at-rest block
size**: the run's border box is now **64** tall inside a 56-tall dock (the 4px block reserve
materialising on each side, exactly as intended on the cross axis), so the step at morph entry
is `64 → 48` where it would have been `56 → 48`. **The cure widens the entry step on the block
axis by 8px; it does not introduce the zero-width state.** Recorded for the owner; per the
order this is an observation and **not** a kill, and R2's verdict does not turn on it.
Trace banked whole at `pi-RERUN2-R2-MORPH-raf-boxtrace-1440-light.json`.

---

## 2 · π-RERUN2-R6 — the frame has a size of its own · **CURED-GREEN**

Order of record: `docs/tranches/BK/execution/2026-08-10-lanegamma-unit7/PI-QUEUE.md`.
Controls: the `dfe6971f` `pi-RERUN-R5-crop-*` and `pi-RERUN-R6-*` artifacts.
`/motion/handmark` at rest, **1440×900 dpr 2 AND 390×844 dpr 3, both themes** — four cells.

**KILL criterion (`if any .hm-mark still resolves width 0 in either engine`): DOES NOT FIRE.**
All ten mounts resolve a positive computed width in all four cells, each frame carrying a
numeric `width`/`height` attribute and no percentage.

**Arm 1/2 — computed `.hm-mark` width per mount.** The covering detector for the
`width:stretch` blindness; every value below is `getComputedStyle(mark).width`, not the
attribute.

| mount | control (1440) | **HEAD 1440** | control (390) | **HEAD 390×844×3** |
|---|---|---|---|---|
| `pays in` | 162.04 | **162.047** | 139.32 | **139.329** |
| `pays in` (2) | 100.14 | **100.125** | — | — |
| `pays in` (3) | 61.88 | **61.891** | — | — |
| `drawn` | 139.29 | **139.297** | — | **119.766** |
| `rose` | 61.48 | **61.484** | 52.87 | **52.859** |
| `violet` | 73.78 | **73.781** | 63.45 | **63.438** |
| **`Friday`** | **0** | **87.797** | **0** | **75.5** |
| **`threefold`** | **0** | **122.984** | **0** | **105.75** |
| **`Hpqjy` line 1** | **0** | **165.094** | **0** | **141.953** |
| **`Hpqjy` line 2** | **0** | **105.359** | **0** | **90.594** |

The four zeros are gone in every cell; the six that already painted are unchanged to the digit.

> *One honest discrepancy with the queue's stated expectation.* Arm 1 predicted the four zeros
> would become "≈87.81 · 153.93 · 171.58 · 108.63". `Friday` lands on it (87.797 ≈ 87.81), the
> other three do not — and the reason is that **three of the four predicted figures are guide
> path LENGTHS, not line-rect widths**: `171.583` and `108.632` appear verbatim as entries 6
> and 7 of arm 9's own guide-length list, and `threefold`'s measured guide length is 373.804
> against a 122.984-wide frame because a loop's path is far longer than the box it encloses.
> The cure's actual claim — the frame equals the **line rect** the mark was made for — is not
> falsified by this; the queue's expectation for those three conflated two different
> quantities. Stated rather than quietly reconciled.

**Arms 3–5 — the rest-state crops.** Painting is decided by a strict **delta against a
marks-hidden control** captured in the same scroll position (`.hm-mark{visibility:hidden}`,
which changes no layout), because the control's own `C ≥ 0.08` chroma instrument reports zero
on light-arm bands that gamut-map to `C 0.07256` — the carried-OPEN item below. Both readings
are banked for every crop.

| arm | mount | control | **HEAD 1440 light / dark** | **HEAD 390 light / dark** |
|---|---|---|---|---|
| 3 | **`Friday`** (STRIKE, `<del>`) | **blank, no struck line** | **PAINTS** Δ 678 / 655 px | **PAINTS** Δ 1083 / 1075 |
| 4 | **`threefold`** (CIRCLE) | **blank, no ring** | **PAINTS** Δ 4219 / 4216 | **PAINTS** Δ 7079 / 7063 |
| 5 | **`Hpqjy` line 1** | 0 of 103,782 hue-78 px | **PAINTS** Δ 8887 / 8476 | **PAINTS** Δ 14591 / 14070 |
| 5 | **`Hpqjy` line 2** | 0 of 103,782 | **PAINTS** Δ 5513 / 5240 | **PAINTS** Δ 9507 / 8961 |

`pi-RERUN2-R6-crop-Friday-*` shows a hand-drawn line through the word; `-threefold-*` shows the
loop closed, overshoot and all; the two `Hpqjy` crops each carry **their own band, neither
bridging the gap between them** — line 1 under "Hpqjy really", line 2 under "matters".
Column coverage on the two bands is `345/356` and `220/231` at 1440 with a longest dead run of
**6 device px** (the sub-pixel gaps between glyph coverage), i.e. continuous bands.

**Arm 6 — π-GALLERY at rest: five of five.** The full-page rest capture at 1440 shows
UNDERLINE (`pays in`, all three sizes), **STRIKE** (`The deadline is ~~Friday~~`), **CIRCLE**
(`Up (threefold) since spring`), HIGHLIGHT (`rose`/`violet`) and THE DRAW all carrying their
mark. The control carried **three of five**.

**Arm 7 — the reservation arm, which must NOT move.** `threefold` computed `padding-inline`
**18.2591px** against the control's **18.2611px** (Δ 0.002), host rect **190.422** against
**190.45** (Δ 0.028), identical in both themes. Unchanged to within sub-pixel measurement
noise; this cure touches no padding and no reserve.

**Arm 8 — the mask windows, which must NOT move.** All 10 finite with area > 0.
`threefold {x −3.885, y −1.349, w 165.156, h 41.743}` against `{−3.88, −1.599, 165.176, 41.743}`;
`Hpqjy` line 2 `{x −206.001, y 34.006, w 141.661, h 50.959}` against
`{−206.033, 33.756, 141.677, 50.959}`. Heights byte-identical; x and w within 0.032; **y differs
by a uniform +0.25 on both**. A quarter-pixel is the raster grid at dpr 2 and this seat scrolled
each mount to its scroller's centre rather than reading it at the control's scroll offset, which
shifts sub-pixel text positions and therefore the Range rects the window is derived from.
Reported as measured rather than rounded into agreement; **not byte-identical, and the 0.25 is
uniform and instrument-attributable, not a re-basing.**

**Arm 9 — the emitted geometry, which must NOT move.** Guide lengths measured
`169.977 / 105.068 / 64.952 / 91.523 / 373.804 / 171.568 / 108.615 / 63.871 / 76.383 / 146.576`
against the banked `169.969 / 105.068 / 64.952 / 91.539 / 373.845 / 171.583 / 108.632 / 63.871 /
76.383 / 146.568`. Four match to the digit; the rest differ by **≤ 0.041 px**, same sub-pixel
class as arm 8. The frame stays pinned at `left:0; top:0` in every cell, so `measure()`'s origin
is the same fixed point.

### THE ONE LIVE-ENGINE UNKNOWN — tested explicitly. **NO CULLING.**

> *Does ink lying wholly outside a small `overflow: visible` viewport still paint?*

`Hpqjy` line 2's ink bounding box sits at **x ∈ [−189.961, −80.381]** in its frame's user space
while its frame's viewport spans **[0, 105.359]** — the ink is **entirely** left of its own
viewport, `inkWhollyOutsideOwnViewport: true`, confirmed programmatically in all four cells.
(The queue quotes `[−206.03, −64.36]`, which is the **mask window**; the figure above is the
ink path's own bbox, and the window is that bbox padded by `stroke/2 + 1`. Same band, both
wholly outside.)

**That band paints.** Δ **5513** px at 1440 light, **5240** dark, **9507** at 390 light,
**8961** dark, with 220/231 live columns and a longest dead run of 6. The crop
`pi-RERUN2-R6-crop-Hpqjyreallymat-1440-light.png` shows a complete highlighter band under
"matters".

**Verdict on the kill criterion: it does not fire.** Line 2 did **not** stay at zero while line
1 went positive — both went positive, at both viewports, in both themes. Chromium 149 paints
SVG ink that lies wholly outside an `overflow: visible` viewport. **The diagnosis is not
culling, the route does NOT reopen on frame POSITION, and the frame stays pinned at
`left:0; top:0`.**

---

## 3 · CARRIED-OPEN ITEMS — RESTATED, NOT ADJUDICATED

No capture is owed on any of these and **this seat adjudicates none of them.** They are the
owner's, and they are named here so that two green paint cells cannot bury them.

- **The γ #51 dark band window.** ≈**0.485** measured against the `[0.42, 0.48]` target, the
  card's `paper-grain-overlay` lifting ≈ +0.045 L. **Still carried OPEN on #51 and still not
  cured.**
- **The γ #51 chroma floor.** `oklch(0.86 0.16 270)` gamut-maps to **C 0.07256**, under the
  **0.08** floor. Still open. This battery corroborates the mechanism incidentally rather than
  by design: the light arm's `violet` band reads `chromaGE08 = 0` while `chromaGE04 = 3444` in
  the same crop that shows the band plainly painted — a `C ≥ 0.08` detector reports zero on a
  band that is unambiguously there. That is why the paint arms above are decided on a
  marks-hidden delta and not on the chroma threshold. **Not an R6 failure and not adjudicated
  here.**
- **π-SCROLL's kill-criterion disposition.** π-RERUN-R8 read **0.36 CSS px** of trailing
  inertia against a **1.5 px** cap. **The disposition is the owner's** and no capture changes
  that. Not re-asked, not re-run, not decided.

---

## 4 · EXIT CODES

| step | command | exit |
|---|---|---|
| model assertion | `python3` over own transcript, `&&`-gated | **0** |
| port guard | `lsof -nP -iTCP:5433 -sTCP:LISTEN` | free → taken |
| dev server (mine, :5433) | `npx vite --host localhost --port 5433 --strictPort` | started, **`HTTP 200`**, killed at close |
| R6 capture | `node cell2b.mjs` | **REAL_EXIT 0** |
| R2 capture | `node cell1b.mjs` | **REAL_EXIT 0** |
| R2 corrections | `node cell1c.mjs` | **REAL_EXIT 0** |
| R2 lattice | `node cell1d.mjs` | **REAL_EXIT 0** |
| browser version | `chromium.version()` | `149.0.7827.55` |
| tracked tree at close | `git status --porcelain --untracked-files=no \| wc -l` | **0** |

Exit codes are read from `$?` on the unpiped command, never through a pipe — a piped runner
reports the tail's status, not the runner's.

**No git operation of any kind was performed by this seat** — no `add`, no `commit`, no
`stash`, no `checkout`. The only working-tree change is this untracked bank directory.

---

## 5 · ARTIFACTS

86 captures + 4 instruments, all under
`docs/tranches/BK/execution/2026-08-25-pi-band/rerun2/`.

**R2** — `pi-RERUN2-R2-MATERIAL-ringclip-census-overview-1440-{light,dark}-cured2.json` ·
`pi-RERUN2-R2-lattice-paired-overview-1440-{light,dark}.json` ·
`pi-RERUN2-R2-SYNTHETIC-seatfill-clipedge-1440-{light,dark}.png` ·
`pi-RERUN2-R2-ringcrop-focused-sidebar-seat-1440-{light,dark}-CURED2.png` ·
`pi-RERUN2-R2-PAGE-overview-1440-{light,dark}.png` ·
`pi-RERUN2-R2-MORPH-raf-boxtrace-1440-light.json` ·
`pi-RERUN2-R2-SUMMARY.json` + `pi-RERUN2-R2-SUMMARY-corrected.json`.

**R6** — `pi-RERUN2-R6-CENSUS-all.json` (arms 1, 2, 7, 8, 9 in one read, all four cells) ·
`pi-RERUN2-R6-crop-{paysin,Friday,threefold,Hpqjyreallym,Hpqjyreallymat,rose,violet,drawn}-{1440,390x844}-{light,dark}.png`
(32) · the paired `pi-RERUN2-R6-cropHIDDEN-*` marks-hidden controls (32) ·
`pi-RERUN2-R6-GALLERY-rest-{1440,390x844}-{light,dark}.png` ·
`pi-RERUN2-R6-PAGE-rest-{1440,390x844}-{light,dark}.png`.

**Instruments** — `instruments/pi-RERUN2-R2-census-ring-seatfill.mjs` ·
`instruments/pi-RERUN2-R2-corrections-timeline-ring.mjs` ·
`instruments/pi-RERUN2-R2-lattice.mjs` · `instruments/pi-RERUN2-R6-handmark.mjs`.
Banked deliberately: the control's census script was inline in a session that hit the wall and
could not be re-run unchanged, which cost this seat a reconstruction and two corrections. The
next seat re-runs these instead of rebuilding them.
