# LANE γ — UNIT 6 · π QUEUE · FOUR RE-CAPTURE CELLS

**Enqueued, not discharged.** Every cure in this unit's `RECORD.md` §2 changes paint;
none has been observed. Each cell below is a **DELTA against pixels already banked** in
`docs/tranches/BK/execution/2026-08-25-pi-band/gamma-handmark/`, so the re-capture
compares like with like rather than forming a fresh opinion.

**Standing law for every cell.** ENQUEUE to the singleton browser seat; no seat opens its
own browser. Screenshot + `getComputedStyle` only — `getContext()` is never called on any
canvas. Colour read from the captured PNG in Node (`pngjs` + `oklabFromRgb`, the one
colour-math source `scripts/lib/paint-arm.mjs` re-exports). Port and build-freshness
cited in the cell. Crops scale the CSS box by the live `devicePixelRatio` (2 at 1440/1920,
**3** at 390). Scroll reads carry a ≥500 ms settle plus screenshot corroboration. **The
predecessor artifact is the control; a cell that cannot show its predecessor is not a
delta.**

Route for all four: **`/motion/handmark`**. Predecessor engine pair: **Chromium** via the
`chrome-devtools` daemon and **real Safari 26.4** (`AppleWebKit/605.1.15`, `Version/26.4`)
over plain W3C WebDriver — the census's own note stands, that
`scripts/safari-probe.mjs` excludes `/motion/handmark` from its hard-coded route list, so
its endpoints are driven directly.

---

## π-RERUN-R5 — the draw resolves, and the rest state stops being empty

**Cures:** `stroke.ts` `minJerk()` — the terminal `linear()` stop is the profile's value,
not the loop index.
**Predecessor verdict:** π-BAND · π-RING · π-MOBILE · π-DRAW · π-GALLERY all
DEFECT-ROUTED; the census's single largest route.

| arm | the census's reading, which is the control | the cure's claim |
|---|---|---|
| resting `stroke-dashoffset` ÷ `stroke-dasharray`, every guide, both engines | **−23.000** on all five measured guides (`−3909.29/169.969`, `−2416.56/105.068`, `−1493.89/64.9518`, `−8598.43/373.845`, `−3371.06/146.568`), `playState: finished`, `fill: both` | **0.000** on every guide |
| the live easing string off the running animation | `linear(0 0%, …, 0.999 95.833%, 24 100%)` in Chromium; `… 1.00 95.833%, 24.00 100%)` in Safari 26.4 | terminates at **1** in both |
| REST-state painted px at OKLab chroma ≥ 0.08, 1440×806 @dpr2, both themes | hue 78 `Hpqjy really matters` **0 of 144,400**; hue 318 `rose` 1,236 dark / 1,289 light as **two end chips with 36 dead columns between**; hue 270 `violet` 705 dark / **0** light | a continuous band, not chips: the dead columns close |
| the story's own **Replay** button (`play()`) | returns the offset to `−3371.06px` and **ERASES** the line | Replay re-draws and **leaves the mark painted** |
| π-GALLERY at rest, five sections, Chromium + Safari 26.4 | four of five show **no mark at all** | all five carry their mark at rest |

**Artifacts to re-bank (same names, `-cured` suffix):**
`pi-DRAW-easing-terminal-stop.json` · `pi-DRAW-A-{revealed-by-hover,crop-revealed}-1440-light.png` ·
`pi-DRAW-B-{after-replay-erased,crop-erased}-1440-light.png` (the B pair is the
paired delta and must now show the **opposite** outcome) ·
`pi-BAND-highlight-section-1440-{dark,light}.png` · `pi-BAND-two-arm-paired.json` ·
`pi-GALLERY-{rest-top-1440-dark,story-fullpage-1440-dark,safari26-rest-1440}.png`.

**KILL:** if the resting ratio is anything but 0.000 on any guide in either engine, the
cure is not the cure and the route reopens against `stroke.ts`.

---

## π-RERUN-R6 — the mask window resolves against real units

**Cures:** `HandMark.vue` — `maskWindow()`; the mask carries user-space `x/y/width/height`
in place of `-100%/-100%/300%/300%`.
**Predecessor verdict:** π-BAND (hue 78) · π-RING · π-MOBILE.

| arm | control | claim |
|---|---|---|
| rendered `<mask>` attributes, read off the live DOM at every mount | `x="-100%" y="-100%" width="300%" height="300%"` | four finite user-space numbers per mask, area > 0, containing the ink |
| computed `.hm-mark` width per mount, Chromium 1440 / 1920 / 390 and Safari 26.4 | `pays in` 162.04 / — / 139.32 / 158.63 · `Friday` **0**×2 / — / **0**×2 / 87.09×2 · `threefold` **0** / — / **0** / 173.08 · `Hpqjy really matters` **0**×4 / **9.05**×4 / **0**×4 / **0**×4 · `rose` — / 68.17×2 / 52.87×2 / 63.73×2 | **unchanged and no longer load-bearing** — the reading is banked to prove the window cure does not depend on this box |
| the ring, with `stroke-dashoffset` FORCED to 0px by a real hover (isolates R6 from R5) | ring **never painted**; Chromium `.hm-mark` width `0px` | the ring paints |

| the wrapped hue-78 band at 1920 | a **21 px orange chip on the "H"** and nothing on its second line | both lines carry a full band |
| Safari 26.4 divergence | `Friday` / `threefold` resolve real widths where Chromium resolves 0, so only R5 kills them there | both engines now agree, from the same window |
> **[2026-08-29 · STRIKE on the computed-`.hm-mark`-width row's claim cell (the verbatim quote is the anchor; relocated below the table 2026-08-29 so the GFM table renders whole) — *"unchanged and no longer
> load-bearing"* is FALSE.]** π-RERUN-R6 came back SPLIT: window CURED, ring/paint
> STILL-RED. With `stroke-dashoffset` 0 at rest (R5's cure supplying the isolation this
> row wanted a forced hover for), the ring on `threefold` is still never painted, and
> the mounts that fail are *precisely and only* the four resolving `.hm-mark` width 0.
> **The width IS load-bearing** — a zero-width SVG viewport renders nothing whatever
> window it carries. Routed to and cured in **γ unit 7**; re-capture is **π-RERUN2-R6**
> in `../2026-08-10-lanegamma-unit7/PI-QUEUE.md`.

**Artifacts:** `pi-RING-reservation-and-mask-window.json` (extend with the rendered window
per mount) · `pi-RING-no-ring-painted-crop-1440-light.png` (must invert) ·
`pi-GALLERY-all-revealed-1920-light.png` · `pi-GALLERY-safari26-rest-1440.png`.

**Also re-read here, unchanged and expected to hold:** the reservation arm, which is
already GREEN and is the one live figure R6 must not disturb — computed `padding-inline`
**18.2611px** (1440 dark) / **21.028px** (1920 light) / **19.66065px** (Safari 26.4),
host rect ≈154px → **190.44px**, and the visible gap it opens between "Up" and
"threefold".

---

## π-RERUN-R7 — one chisel per line rect

**Cures:** `HandMark.vue` — `slotRects()` walks text nodes and merges per line box.
**Predecessor verdict:** π-MOBILE.

| arm | control | claim |
|---|---|---|
| `.hm-mark` SVG count per mount, 390×844×3, emulated `--viewport '390x844x3,mobile,touch'`, verified in-page (`dpr` 3, `(hover:none)` true, `(pointer:coarse)` true, `maxTouchPoints` 1) | bare slot → 1 (`pays in`, `threefold`) · `<del>` → **2** (`Friday`) · `<mark>` → **2** per line (`rose`, `violet`) · `<mark>` over two lines → **4** (`Hpqjy really matters`) | 1 · 1 · 1 · **2** — one per LINE rect |
| emitted guide lengths on the two-line highlight | `171.583 / 108.632 / 170.281 / 108.817` — line1, line2, line1′, line2′ | two lengths, not four |
| the per-rect delay chain | four delays `0 / 234.371 / 434.118 / 667.773`, the duplicate's clock chained behind the original's duration | two delays, `0` and the first rect's duration |
| no bridging (already PASS — must stay) | line-1 ink bbox `x ∈ [−3.3, +169.6]`, line-2 `x ∈ [−185.3, −69.9]`, disjoint | still disjoint |

**Artifacts:** `pi-MOBILE-wrap.json` · `pi-MOBILE-wrap-rest-390x844-light.png`.

---

## π-RERUN-R8 — the mark hears its own scroller, and the kill criterion goes live

**Cures:** `HandMark.vue` — `document` capture listener; the signal is the host's own
`getBoundingClientRect().top`.
**Predecessor verdict:** π-SCROLL, DEFECT-ROUTED with the **KILL CRITERION NOT
TRIGGERED**.

| arm | control | claim |
|---|---|---|
| 41 rAF-cadence samples while `main.demo-main-scroller.scrollTop` is driven `0 → 163px`, plus one settle sample 700 ms after the stop | **every** sample `matrix(1, 0, 0, 1, 0, 0)`; the set of distinct transforms has exactly **one** member | a non-trivial transform set; a measurable amplitude |
| `hm-mark--settling` during and after the run | **never applied**; `window.scrollY` stayed `0` throughout | applied during the quiet window, cleared on settle |
| ink-lag amplitude | **0.00 px** — inside the 1.5 px threshold *"only because the mechanism is inert"* | > 0 and ≤ **1.5 px**, which the source caps by construction |
| **direction, and it is new** | unobservable | the mark must trail — displaced **against** the content's motion. The cure reverses the sense of `y` (`scrollY` rises on a downward scroll; `rect.top` falls) and this is the first capture that can see which way it goes |

**THE KILL CRITERION IS NOW JUDGEABLE FOR THE FIRST TIME.** unit-5 §7: *"if it reads as a
made mark DETACHING from its word, the resolution is DELETION, not tuning."* The census
could not trigger it because nothing moved. This capture can. **The disposition remains
the owner's** — this queue asks for the reading, not the ruling.

**Artifacts:** `pi-SCROLL-ink-lag.json` · a rest/mid-scroll PNG pair at 1440 so the
direction is legible to an eye and not only to a matrix.

---

## NOT ENQUEUED HERE, AND WHY

| cell | grounds |
|---|---|
| π-PEN · π-HOVER · π-TOUCH · π-LADDER | **CAPTURED-GREEN** already. π-PEN's disclosure — measured on the re-ink-revealed state *because the rest state paints no mark* — becomes moot when R5 lands, and re-reading it on the rest state is a **bonus** the R5 cell already covers, not an owed cell |
| the two π-BAND colour windows: dark arm ≈0.485 against `[0.42,0.48]` (the card's `paper-grain-overlay` lifting ≈+0.045 L), and `oklch(0.86 0.16 270)` gamut-mapping to C **0.071** under the 0.08 floor | **Carried OPEN to #51 and NOT cured in unit 6.** Both survive a fixed draw; neither is R5–R8. They are named here so four green cures cannot bury them |
| g3 (aurora DUSK/DAWN) | precondition unmet and already routed to row **49** by the handmark seat with grounds; not γ-handmark's |
| the sticky story-header overlap at `scrollTop = 257` | routed to `demo/chassis` (δ) by the census; not this fence |
| R9 · R10 · R11 | aurora. Driver-banked rulings, not this unit's cures |
