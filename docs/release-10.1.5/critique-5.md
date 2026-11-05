# 10.1.5 — critique, round 5 (adversarial)

Critic: claude-opus-5-5, fresh context. Branch `release/10.1.5` at `b253e1ba1` (43 commits
over `v10.1.4`). I read every commit and the full `src/` diff, plus `critique-1.md` to
`critique-4.md`, `implement.md` (fix rounds 1 to 4), `inbound-O-132.md`, `inbound-O-133.md`,
and the untracked `inbound-O-150-Rt1.md`, `inbound-O-155.md` and
`orchestrator-note-round4.md`.

Every run was admitted by `guarded`: Chromium (`chromium-headless-new`) and Playwright WebKit
2287 (`--exclusive webkit`, which queued behind other seats' WebKit runs and then ran).

## Probes

- **Spec:** `tests-visual/release-10-1-5-critic-5.spec.ts` (WebKit config
  `release-10-1-5-critic-5.config.ts`). It is critic-4's whole battery on the tip, on the
  same harness (`release-10-1-5/critic-4.{html,ts}`), plus round 5's cells:
  - **r5 run clip.** Fix round 4 gave the run a rounded clip on the cap's timeline, and
    critic-4's ring check is rectangular, so it cannot see a ring the run's corner arc
    cuts. r5 reads shapes. It compares each focused seat's ring outline (the seat's
    scaled rounded box grown by `outline-width + outline-offset`) against the run's
    computed rounded clip. It also checks the seat's visible fill (seat shape ∩ run clip)
    against the plate's rounded box.
    - configs: house, icons-only, cockpit, `#persistent`, RTL, at 320 / 390 / 844, plus
      two vertical docks
    - postures: an overflowing run at 0, a quarter pitch, mid and end, with every seat
      within 60 px of either end hovered, then focus+hover by keyboard modality
  - **r5b end reach:** the end seat of a run flush at its end, focused, with and without
    the pointer on it.
  - **r5c far reach:** the end seat reached from scroll 0 by `focus()` and by the `End`
    key.
  - **r5 reserve basis**, **r5 segtabs order** (labels over the indicator at rest, hover,
    press and mid-glide, and the drag lift over them), and **r5d** (which scene raises
    `ResizeObserver loop`).
- **v10.1.4 arm:** the same cells on `critic-4-v1014.{html,ts}` over
  `tests-visual/release-10-1-5/v1014/` (`git archive v10.1.4 src demo`, untracked, as in
  round 4).
- **Drivers:** `docs/release-10.1.5/scripts/critic-5.sh`, `g6-critic-5.sh`,
  `gates-critic-5.sh`.
- **Summary:** `critic-5-summary.mjs`.
- **Rows:** `docs/release-10.1.5/critic-5/<arm>/<project>/`, with the run log in
  `critic-5/runs.txt`.

| run | result |
|---|---|
| Chromium, r5 cells, branch / v10.1.4 | run clip 2/2 and 2/2; r5b 2/2 and 2/2; r5c 2/2 and 2/2; r5d 1/1 and 1/1; reserve and segtabs 4/4 |
| Chromium, critic-4 battery on the tip | 52/52 cells read |
| WebKit 2287, whole spec, branch | 62/63. The one failure is `r5 run clip coarse`, which threw after 3.1 min because `.dock-run.is-active` was absent (see Owed); critic-4's battery 52/52 cells read |
| WebKit 2287, r5 cells, v10.1.4 | 11/11 |
| g6 Chromium | release-10-1-5 32/32, release-10-1-4 23/23, release-10-1-3 60/60 |
| g6 WebKit 2287 | release-10-1-5 32/32, release-10-1-4 15 passed + 8 skips (`page.pdf`), release-10-1-3 58 passed + 2 skips (CDP swipe): the same skip set as fix 3 and fix 4 |
| g7 | typecheck exit 0 (`--light`). Then, in order: `build` 0, `demo:dist:build` 0, vitest 247/247 files (2397 passed, 10 expected fail, 1 skipped), `verify:package` terminal CLEAN at 10.1.5 (`critic-5/g7/`) |

## Verdict

The fix-4 cures hold in both engines:

- **H1:** the run's clip follows the cut corner. Visible seat fill past the plate's arc is
  at most 0.61 px in Chromium and 0.63 px in WebKit, over 1,437 and 714 seat reads.
- **H2:** a labelled trigger's dock is the icon dock's width again (Chromium 385.17,
  WebKit 387.97, the v10.1.4 widths).
- **H3:** a ticking label constructs no observer (4 → 4).
- **H4:** with no `ResizeObserver` the plate rests at `h/2` (28/30 px).
- **H5:** the step tokens are gone.
- **H6:** `git diff -U0 v10.1.4..HEAD -- src` adds no line carrying a process id or `~~`.
- **O-133:** a z:1 fixed header paints over both materials, and the tab z is 1 inside an
  isolated strip.
- **O-150 R-t-1:** every Table rule equals `--border`, light and dark.
- **O-155:** a two-seat dock rests at four `h/2` corners with `sw = cw`, plate on root,
  both themes, 390 and 1440.
- **r1 to r7:** every r1/r2/r5/r6/r7 cell in critic-4's battery, re-run on the tip, reads
  as it did in round 4.

The branch is not ready to tag. Fix rounds 2 to 4 gave the run a longer scroll (the
reserve's padding plus the trailing spacer) and a rounded clip. Neither one is a defect
on its own, but each exposes a defect the battery did not look for:

1. **K1 (medium).** The keyboard reach lands a narrow run's end seat short of flush, so
   the focused end seat is cut, ring and fill. v10.1.4 lands it flush in both engines.
2. **K2 (low-medium).** On a vertical run that overflows, the rounded clip cuts a wide
   leading seat's ring by 14.5 to 14.8 px. v10.1.4 cuts it by 6.3 px.

K3 (low) is r1's own class at 320, which fix 3 ruled deliberately; it needs the
orchestrator's ruling. Critique-3's four static suspicions, critique-2's WebKit keyboard
cells and the cockpit edge room all hold (below).

## Defects (reproduced)

### K1: the reach lands a narrow run's end seat short of flush, so the focused end seat is cut (regression, medium, both engines)

- **Probes:** `r5c far reach` (the run at 0; the end seat `S12` reached by `focus()` after
  a key, and by `End` from `S1`) and `r5b end reach` (the run flush at its end; `S12`
  focused with and without the pointer on it). Both are read after the glide settles
  (1.5 s, traced every 250 ms).
- **Scene:** the house geometry at 320 (`maxw=290`), `tab:Home`, ten icons and
  `tab:Settings`, with both persistent regions. Rows:
  `critic-5/{chromium-headless-new,webkit}/r5{b,c}-*.json` and the same under `v1014/`.

| trigger | engine | pointer | 10.1.5 run lands / max | end seat past the clip | ring cut | v10.1.4 lands / max |
|---|---|---|---|---|---|---|
| `End` key | Chromium | fine | 503 / 516 | 3.3 px | 7.28 px | 496 / 496 (flush) |
| `End` key | Chromium | coarse | 537 / 564 | 17.3 px | 21.28 px | 544 / 544 (flush) |
| `End` key or `focus()` | WebKit 2287 | fine | 505 / 521 | 5.9 px | 9.94 px | 501 / 501 (flush) |
| `End` key or `focus()` | WebKit 2287 | coarse | 539 / 569 | 19.9 px | 23.94 px | 549 / 549 (flush) |
| hover then focus, run already flush | Chromium | fine | glides 516 → 503 | 8.3 px | 12.74 px | holds 496 |
| hover then focus, run already flush | Chromium | coarse | glides 564 → 537 | 22.3 px | 26.74 px | holds 544 |
| hover then focus, run already flush | WebKit | fine | glides 521 → 505 | 11.2 px | 15.56 px | holds 505 |
| hover then focus, run already flush | WebKit | coarse | glides 569 → 539 | 25.2 px | 29.56 px | holds 554 |

The same scenes at 390 and 844, the cockpit preset at 320, the icon-only run and the run
with no persistent region all land flush with no ring cut in both engines. At v10.1.4 the
flush end seat already lost 3.9 to 4.3 px of ring to the rectangular clip. Fix 4 cures
that whenever the run reaches flush.

**Cause, read from `useDockRun.ts`.** `anchorFor` is `i·P + [open]·(m−1)·P − P/2`,
clamped to `[0, scrollMax]`. It assumes every seat is one pitch.
- A leading `tab:Home` is 87 px against `P = 48`, so the end seat's anchor (11·48 − 24
  = 504) sits short of its real position.
- At v10.1.4, `scrollMax` (496) was under the anchor, and the clamp made the end flush.
- The branch's run is longer by twice the reserve (the inline padding and the trailing
  spacer, 10 px each here), so `scrollMax` is 516 and the clamp no longer reaches.

The second trigger is `occluded()`. It reads `getBoundingClientRect()`, which includes
the seat's hover `scale`, against the port less the reserve. So a fully visible end seat
under the pointer counts as occluded, and focusing it fires the same short anchor. That
breaks the OD-5 law the patch states in `run.css`: a seat's engagement scale never counts
as reach.

**Cure direction.** The reach brings the seat's measured box inside the port less the
reserve:
- the anchor from the seat's layout offset in the run (`offsetLeft`), not `i·P`, or at
  least `scrollMax` for the last seat
- `occluded()` from the layout box (`offsetLeft`/`offsetWidth` against `scrollLeft`), not
  the transformed rect

**Gate.** At 320, fine and coarse, both engines, with a wide leading tab and both
persistent regions: `End`, `focus()` and hover+focus on the end seat each settle at
`scrollMax` with the seat's ring whole. The same holds for the first seat.

### K2: on a vertical run that overflows, the rounded clip cuts a wide leading seat's ring and fill (regression, low-medium, both engines)

`r5-runclip-*.json`, vertical dock `tab:Home, ten icons, tab:Settings`, `stageH=360`, run at
0, `S1` focused and hovered:

| | ring outside the run's clip |
|---|---|
| 10.1.5 Chromium | 14.51 px (fine and coarse) |
| 10.1.5 WebKit | 14.83 px |
| v10.1.4 Chromium / WebKit | 6.29 / 6.31 px |

The run's block-start clip is `50% 61.3px`, a 64 × 61 px ellipse. That is
`--dock-cap-rest − --dock-run-inset` on the scroll axis and `50%` on the cross axis. The
seat it cuts is the 120 px label tab that spans the 132 px plate, so the clip also takes
the corners of the tab's fill.

The same dock with nothing to scroll leaves its timeline inactive, so it paints the seat
and ring whole. The same posture then paints two ways, depending on whether the run
overflows. The icon-only vertical dock reads 0.

H1's cure needs the clip's corner only where the plate is CUT (the `to` keyframe). The
plate's REST corner is not a cut, and at the house geometry the seat fill lies inside the
rest arc anyway (the max is 0.61 px, all at cut corners).

**Cure direction:** the clip's `from` keyframe is square (or no larger than the cut), so
the rest edge clips as it did at v10.1.4 and only the cut corner rounds.

**Gate:** the vertical tab dock above, run at 0 and at its end: the end seats' rings are
whole, in both engines.

### K3: at 320 coarse a viewport-capped dock whose seats all show still scrolls and cuts its trailing cap at rest (low, both engines; ruling asked)

`dock-postures-coarse-320.json` and `r4-press-rtl-coarse.json`: `tab:Home, icon, icon,
tab:Settings`, coarse, 320 wide. The plate is 320 × 60.

| engine | run `sw/cw` | corners |
|---|---|---|
| Chromium | 320/316 | `30 / 28.92 / 28.92 / 30` |
| WebKit | 325/316 | `30 / 27.58 / 27.58 / 30` |

The seats span 300.3 px inside a 316 px port, so no seat is hidden. Only the
10 px trailing reserve overflows.

- r1's text: "cure it so a run that hides nothing has nothing to scroll."
- Fix 3 (e4) ruled the opposite: a sub-reserve overrun scrolls exactly the overrun, to
  keep the end seat's ring.
- g1 gates only 390, 844 and desktop.

On a fine pointer WebKit reads 317/316 (corner 27.75 against 28, within g1's 0.5 px) and
Chromium 316/316. I report it so the orchestrator rules which law holds at 320. If r1
holds, the cure is that the reserve's overrun is room the dock grows into (the plate
widens by up to the reserve) rather than scroll. If e4 holds, the patch should state that
r1 holds only above the width where every seat plus both reserves fit.

## Not defects, recorded

NOT### K1: the reach lands a narrow run's end seat short of flush, so the focused end seat is cut (regression, medium, both engines)

- **Probes:** `r5c far reach` (the run at 0; the end seat `S12` reached by `focus()` after
  a key, and by `End` from `S1`) and `r5b end reach` (the run flush at its end; `S12`
  focused with and without the pointer on it). Both are read after the glide settles
  (1.5 s, traced every 250 ms).
- **Scene:** the house geometry at 320 (`maxw=290`), `tab:Home`, ten icons and
  `tab:Settings`, with both persistent regions. Rows:
  `critic-5/{chromium-headless-new,webkit}/r5{b,c}-*.json` and the same under `v1014/`.

| trigger | engine | pointer | 10.1.5 run lands / max | end seat past the clip | ring cut | v10.1.4 lands / max |
|---|---|---|---|---|---|---|
| `End` key | Chromium | fine | 503 / 516 | 3.3 px | 7.28 px | 496 / 496 (flush) |
| `End` key | Chromium | coarse | 537 / 564 | 17.3 px | 21.28 px | 544 / 544 (flush) |
| `End` key or `focus()` | WebKit 2287 | fine | 505 / 521 | 5.9 px | 9.94 px | 501 / 501 (flush) |
| `End` key or `focus()` | WebKit 2287 | coarse | 539 / 569 | 19.9 px | 23.94 px | 549 / 549 (flush) |
| hover then focus, run already flush | Chromium | fine | glides 516 → 503 | 8.3 px | 12.74 px | holds 496 |
| hover then focus, run already flush | Chromium | coarse | glides 564 → 537 | 22.3 px | 26.74 px | holds 544 |
| hover then focus, run already flush | WebKit | fine | glides 521 → 505 | 11.2 px | 15.56 px | holds 505 |
| hover then focus, run already flush | WebKit | coarse | glides 569 → 539 | 25.2 px | 29.56 px | holds 554 |

The same scenes at 390 and 844, the cockpit preset at 320, the icon-only run and the run
with no persistent region all land flush with no ring cut in both engines. At v10.1.4 the
flush end seat already lost 3.9 to 4.3 px of ring to the rectangular clip. Fix 4 cures
that whenever the run reaches flush.

**Cause, read from `useDockRun.ts`.** `anchorFor` is `i·P + [open]·(m−1)·P − P/2`,
clamped to `[0, scrollMax]`. It assumes every seat is one pitch.
- A leading `tab:Home` is 87 px against `P = 48`, so the end seat's anchor (11·48 − 24
  = 504) sits short of its real position.
- At v10.1.4, `scrollMax` (496) was under the anchor, and the clamp made the end flush.
- The branch's run is longer by twice the reserve (the inline padding and the trailing
  spacer, 10 px each here), so `scrollMax` is 516 and the clamp no longer reaches.

The second trigger is `occluded()`. It reads `getBoundingClientRect()`, which includes
the seat's hover `scale`, against the port less the reserve. So a fully visible end seat
under the pointer counts as occluded, and focusing it fires the same short anchor. That
breaks the OD-5 law the patch states in `run.css`: a seat's engagement scale never counts
as reach.

**Cure direction.** The reach brings the seat's measured box inside the port less the
reserve:
- the anchor from the seat's layout offset in the run (`offsetLeft`), not `i·P`, or at
  least `scrollMax` for the last seat
- `occluded()` from the layout box (`offsetLeft`/`offsetWidth` against `scrollLeft`), not
  the transformed rect

**Gate.** At 320, fine and coarse, both engines, with a wide leading tab and both
persistent regions: `End`, `focus()` and hover+focus on the end seat each settle at
`scrollMax` with the seat's ring whole. The same holds for the first seat.

### K2: on a vertical run that overflows, the rounded clip cuts a wide leading seat's ring and fill (regression, low-medium, both engines)

`r5-runclip-*.json`, vertical dock `tab:Home, ten icons, tab:Settings`, `stageH=360`, run at
0, `S1` focused and hovered:

| | ring outside the run's clip |
|---|---|
| 10.1.5 Chromium | 14.51 px (fine and coarse) |
| 10.1.5 WebKit | 14.83 px |
| v10.1.4 Chromium / WebKit | 6.29 / 6.31 px |

The run's block-start clip is `50% 61.3px`, a 64 × 61 px ellipse. That is
`--dock-cap-rest − --dock-run-inset` on the scroll axis and `50%` on the cross axis. The
seat it cuts is the 120 px label tab that spans the 132 px plate, so the clip also takes
the corners of the tab's fill.

The same dock with nothing to scroll leaves its timeline inactive, so it paints the seat
and ring whole. The same posture then paints two ways, depending on whether the run
overflows. The icon-only vertical dock reads 0.

H1's cure needs the clip's corner only where the plate is CUT (the `to` keyframe). The
plate's REST corner is not a cut, and at the house geometry the seat fill lies inside the
rest arc anyway (the max is 0.61 px, all at cut corners).

**Cure direction:** the clip's `from` keyframe is square (or no larger than the cut), so
the rest edge clips as it did at v10.1.4 and only the cut corner rounds.

**Gate:** the vertical tab dock above, run at 0 and at its end: the end seats' rings are
whole, in both engines.

### K3: at 320 coarse a viewport-capped dock whose seats all show still scrolls and cuts its trailing cap at rest (low, both engines; ruling asked)

`dock-postures-coarse-320.json` and `r4-press-rtl-coarse.json`: `tab:Home, icon, icon,
tab:Settings`, coarse, 320 wide. The plate is 320 × 60.

| engine | run `sw/cw` | corners |
|---|---|---|
| Chromium | 320/316 | `30 / 28.92 / 28.92 / 30` |
| WebKit | 325/316 | `30 / 27.58 / 27.58 / 30` |

The seats span 300.3 px inside a 316 px port, so no seat is hidden. Only the
10 px trailing reserve overflows.

- r1's text: "cure it so a run that hides nothing has nothing to scroll."
- Fix 3 (e4) ruled the opposite: a sub-reserve overrun scrolls exactly the overrun, to
  keep the end seat's ring.
- g1 gates only 390, 844 and desktop.

On a fine pointer WebKit reads 317/316 (corner 27.75 against 28, within g1's 0.5 px) and
Chromium 316/316. I report it so the orchestrator rules which law holds at 320. If r1
holds, the cure is that the reserve's overrun is room the dock grows into (the plate
widens by up to the reserve) rather than scroll. If e4 holds, the patch should state that
r1 holds only above the width where every seat plus both reserves fit.

## What held (refutation attempts that failed)

- **r1 / g1 / O-155:** the critic-4 battery on the tip, both engines.
  - Every `dock postures` row at 390, 430, 844 and 1440, fine and coarse, is uniform
    `h/2` with `sw = cw` and no ring clipped. The postures are rest, hover on each seat,
    focus, focus+hover and press, and RTL as well. The only non-uniform rows are K3 and
    true overflows.
  - Fine 320 is uniform in Chromium. In WebKit it is within 0.25 px.
  - O-155 two-seat: `28|28|28|28` (coarse 30) with `sw = cw`, root and plate equal, both
    themes, 390 and 1440, both engines.
- **The run's rounded clip, horizontal (`r5 run clip`):**
  - Scenes: house, icons-only and cockpit at 320, 390 and 844, the run at 0, a quarter
    pitch, mid and end, every edge seat hovered and then focus+hovered.
  - Ring outside the clip: Chromium 0 over 762 reads; WebKit fine at most 0.02 px.
  - Visible fill past the plate's arc: at most 0.61 px (Chromium) and 0.63 px (WebKit).
  - The cut fires on a true overflow (`28|16|16|28`, mid all 16, flush mirrored) and the
    rest returns at 0.
- **r2 / OD-16 / OD-18:** collapse frames and layer-switch frames uniform at half the
  extent, with no ghost larger than the plate, in both engines.
- **OD-17 and critique-2's WebKit keyboard cells:** `dock-tab-ring-kbd-*`, WebKit 2287,
  key press then programmatic focus then hover, on S1, S4 and the layers' L1, at 390 and
  1440, fine and coarse. All are ringed whole, with `sw = cw` and uniform corners.
- **Critique-3's four suspicions, re-run on the tip:**
  - S1: trigger reserve = icon reserve. The dock is 385.17 px (Chromium) and 387.97 px
    (WebKit), which are v10.1.4's widths.
  - S2: 4 → 4 constructions over 60 ticks, with no error.
  - S3: `28px`/`30px` on all four corners with no `ResizeObserver`.
  - S4: unchanged, out of scope.
- **Dock-edge room, cockpit and house, overflowing:** the end seats focused and hovered
  at both scroll ends ring whole, wherever the reach lands flush (every case except K1's
  320 house-with-persistent scene).
- **r5:** the Slider thumb is visible, one size per rung, inside the fill at its value
  end, in every cell. The cells are min, mid and max, step edges, sm/lg, disabled, RTL,
  inverted, vertical, two thumbs, and a drag held past both ends, in both engines.
- **r6:** at coarse 390 every field on the recipe is 16 px, 1.128 × the subtitle, with a
  54 px bar: `.input-bar-field`, `.input-pill`, an sm pill, `SelectTrigger` and the dock
  search. Fine 390 is 14 px. Desktop is 16 px on both pointers.
- **r7:** 4 px = `--icon-label-gap` on icon, spanned-label, checkbox, radio and sub-trigger
  items. Items with no icon have no gap to measure. Both engines.
- **O-133:** the header paints over both materials. The strip is `isolation: isolate`
  with tab z 1, the indicator is 0 and the lift is 2.
- **O-150 R-t-1:** every rule with a width equals `--border`, light and dark, both
  engines.
- **API and tokens:** no export removed or renamed (`verify:package` CLEAN). The only
  moved values are the coarse `--control-text` and `--control-text-sm` (r6's cure is the
  token). The new tokens are each internal to a cure: `--field-text-floor`,
  `--icon-label-gap`, `--value-mark-inset`, `--dock-run-*`, `--dock-seat-max-*` and
  `--dock-plate-cross-px`.
- **g6 and g7:** see the table above.

## Owed

- **K1:** the reach lands the end seat flush, from the seat's layout box, and
  `occluded()` stops counting the hover scale. The K1 gate goes in both engines.
- **K2:** the run's clip rounds only the cut. The K2 gate goes in both engines.
- **K3:** a ruling, r1 or e4 at 320, then its cure or its stated bound.
- **WebKit `r5 run clip coarse`.** It threw `null is not an object (evaluating
  'run.style')`: no `.dock-run.is-active` at some point in the cell. The harness now
  records the dock's classes and panes when the active run is missing, and the cell is
  queued for re-run under `--exclusive webkit` (RERUN). The Chromium coarse cell and the
  v10.1.4 WebKit coarse cell completed with the run present throughout.
- After any cure: this spec (`release-10-1-5-critic-5.spec.ts`), then g6 and g7 in both
  engines.
