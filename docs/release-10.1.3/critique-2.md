# 10.1.3 — critique, round 2 (value.js O-110)

Critic: claude-opus-5-5, fresh, adversarial. Branch `release/10.1.3` at `9a768746b` (nine
commits over `v10.1.2`), worktree `.claude/worktrees/release-10.1.3`. Read: every commit,
`implement.md`, `critique-1.md`, the full `src/` diff (`dockMorphMeasure.ts`,
`useDockMorph.ts`, `useDockState.ts`, `GlassDock.vue`, `styles/{index,layers,shape}.css`),
the unchanged `useDockClickIntegrity.ts`, and the witness spec and harness.

Verdict: **the cure holds in paint for every anchor and form I tried, and the asked gates
are GREEN. One new defect is reproduced, introduced by the round-1 press rule: a touch
press that ends without a click and without a `pointercancel` leaves the press "in
flight", and from then on a focus or a hover no longer expands the collapsed dock (RED on
the branch, GREEN on 10.1.2).**

## How I attacked it

My own harness and spec, not the implementer's, run unchanged against two trees served by
one Vite server from this worktree:

- `branch`: this worktree's `src/` and `demo/`.
- `red`: `git archive v10.1.2 src demo`, extracted beside it. The only files that differ
  are the seven dock files of the cure, so the RED arm needs no source swap in the branch
  and no other worktree.

The harness is one collapsible `GlassDock`, set by query parameters:

- `?anchor=`: `right`, `left` or `center` (horizontal); `top`, `bottom` or `vcenter`
  (vertical).
- `?seat=`: `anchored` or `open`.
- `?fit=1|0`, `?shape=pill|rounded|card`.
- `?pin=stage|fixed`: a canvas dock in a stage, or a detached dock fixed to the viewport.

Each cell reads `getBoundingClientRect` on every rAF and records the events each gesture
dispatched. Chromium runs in headless shell; WebKit is 2287 under `guarded --exclusive
webkit`. Every run went through `guarded`.

The record sits out of the tree in `.claude/worktrees/critic2-10.1.3/`. `data/` holds
per-cell JSON tagged by tree and engine, and the `*.log` files are the runs. The harness
(`tests-visual/_critic2/`, untracked) was removed from the branch worktree at close. A copy
is kept in `critic2-10.1.3/harness/`.

## Results, Chromium (92 cells per tree; branch 82 passed, the 10 failures are the 7 centred E cells below and S3/S4)

| attack | branch | v10.1.2 |
|---|---|---|
| E. Hover expand: first frame = rest, anchored edge drift, settle snap, no frame outside the viewport. Right and left at 360/390/430/1440; top and bottom at 390/1440; open-side seats; `fit=0`; `card`; `rounded`; fixed (detached) | GREEN 20/20 (first-frame distance 0, drift 0, snap 0, anchored seat never off the pointer) | RED 20/20 (first frame 116 to 121 px off, the seat off the pointer on 14 to 18 frames, outside the plate on 8 or 9) |
| E. The same for a centred dock (h and v; fixed) | first frame = rest, symmetric growth, seat inside the plate. My "seat stays under the pointer" check does not apply here (no anchored side, the end seat must move) | same geometry; seat outside the plate on 9 or 10 frames |
| C. Collapse by click-away and by the mouseleave timer: every anchor, 360/390/1440, `card`, fixed, `fit=0`, open seat | GREEN 15/15 (drift 0, snap 0, seat inside the plate) | RED 15/15 (snap 116 or 121 px; seat outside the plate on 61 to 65 frames in every cell, centred included) |
| R. Re-hover mid-collapse (reversal): right, left, bottom | GREEN 3/3 | RED 3/3 |
| K. `locator.click()` on the collapsed dock's persistent seat: 6 anchors × anchored and open seat at 390; right and left at 360/430/1440; right open at 1440 | GREEN 19/19 | RED 18/19 |
| T. Touch tap on that seat (right, left and bottom × anchored and open; right at 360/430; centre) | GREEN 9/9 | RED 8/9 |
| P. Press on the anchored seat mid-expand (hover-armed) | GREEN 3/3 | RED 3/3 |
| G. Guard race (b): approach the summary, press and release mid-morph on the arriving control (right, left, centre, bottom) | GREEN 4/4: dropped (`click-prevented`, no handler ran) | GREEN 4/4 (same) |
| G2. A non-morph move: the stage reflows 120 px between pointerdown and pointerup on the collapsed seat | GREEN: the seat's handler does not run | GREEN (same) |
| S. Long-press and cross-axis swipe on the collapsed seat (CDP touch), then hover or focus | GREEN 4/4 (the long press yields a click, the swipe a `pointercancel`) | GREEN 4/4 |
| **S3. Swipe across the expanded run (`touch-action: pan-x`), so `pointerup` arrives with no click and no cancel; Escape collapses; then focus or hover** | **RED 2/2** | GREEN 2/2 |
| **S4. The same state by script-dispatched touch `pointerdown`/`pointerup` on the seat, then focus** | **RED** | GREEN |
| M. Real reduce (`contextOptions`): expand and collapse jump, the seat click lands | GREEN 2/2 | GREEN 2/2 |
| D. Dark (`colorScheme: dark`, page reads dark): first frame = rest, drift, click | GREEN 2/2 | RED 2/2 |

## WebKit 2287 (`guarded --exclusive webkit`)

Branch, my 92-cell suite: 78 passed, 6 skipped (the CDP-touch S and S3 cells are
Chromium only) and 8 failed. The failures are the same 7 centred E cells as in Chromium
(the check does not apply) and **S4, RED**: the clickless-touch-press defect below
reproduces in WebKit by script-dispatched pointer events. Every other cell is GREEN: E,
C, R, K, T, P, G, G2, M and D, for every anchor and form above. Log:
`critic2-10.1.3/c2-branch-webkit.log`.

The WebKit RED arms were not run:

- the v10.1.2 critic arm;
- the release spec on v10.1.2;
- the 77-cell release specs on the branch.

My three queued jobs waited about 2 h 40 min on the machine-wide WebKit lock (two other
seats' 90-minute holds) and were stopped unrun. For those cells this record relies on
`implement.md` (WebKit 35/35 and 77/77) and `critique-1.md` (WebKit 24/24 and 77/77),
which I did not re-witness.

## The asked gates, re-run by me on the branch

| gate | Chromium | WebKit 2287 |
|---|---|---|
| `release-10-1-3.spec.ts`: the four fourier cells ported (L2-15 at 360/390/430, G-h at 1440) × right and left, plus the critique-1 cells | 35/35 GREEN | not re-run by me (see below) |
| The same spec against the v10.1.2 tree (URL pointed at the `red` copy of the same harness) | 34/35 RED: every O-110 click cell at 360/390/430/1440, both anchors, is RED. D-3 is GREEN, as `implement.md` says (reduce jumps on 10.1.2 too) | not re-run by me (see below) |
| `release-10-1-2.spec.ts` + `release-10-1-1.spec.ts` (77) | 77/77 GREEN, including all 16 O-101 no-overflow cells 1440->390 and 390->1440 (h and v; collapsed, pinned, reversal, mid-expand) | not re-run by me (see below) |
| `useDockClickIntegrity.ts`, `constants.ts`, diff `v10.1.2..HEAD` | empty: no tolerance widened, no exemption | — |

## Defects

### D-1 (minor; a regression the round-1 press rule introduces) — a clickless, cancel-less touch press leaves the press in flight, and a later focus or hover no longer expands the collapsed dock

`useDockState.ts`, the press rule:

- `pointerup` is ignored for touch (`:211`, `if ((e as PointerEvent).pointerType ===
  "touch" || pressEndTimer) return;`). A touch press resolves only on a `click`
  (`:206`) or a `pointercancel`.
- A touch press can end with neither. One case: a swipe on an element whose
  `touch-action` forbids that axis. The dock's own run is `pan-x` (`run.css:181`), so a
  vertical swipe across a horizontal dock's run is one. Chromium then dispatches
  `pointerdown` and `pointerup` and nothing else.
- `pressInFlight` stays `true`. Every environmental expand is deferred in the meantime:
  `onFocusIn` sets `expandOnPressEnd = "focus"` (`:387`), and the hover dwell sets
  `expandOnPressEnd ??= "hover"` (`:344`). Neither runs until some later click anywhere
  on the page, or the next press on the dock.

Reproduced, Chromium, right-anchored, 390, `hasTouch`:

1. Tap "Edit" to expand the dock, and let it settle.
2. CDP touch: `touchStart` on "Equation" in the run, eight `touchMove` steps of 8 px
   downward, then `touchEnd`. Events: `pointerdown` and `pointerup` (touch) on
   Equation, no click, no cancel.
3. Escape collapses the dock (`collapsed`).
4. Then, either:
   - `locator.focus()` on the "Edit" seat: the dock stays `collapsed`, with focus on
     Edit. On v10.1.2 it is `expanded`.
   - The mouse moves onto the summary and dwells 1.2 s: the dock stays `collapsed`.
     On v10.1.2 it is `expanded`.

The engine-independent form (S4): dispatch `pointerdown` and `pointerup` with
`pointerType: "touch"` on the collapsed seat, then focus it. The branch stays collapsed;
v10.1.2 expands. S4 is RED in WebKit 2287 on the branch as well.

Data: `critic2-10.1.3/data/{branch,red}-chromium-headless-new-S3-{focus,hover}.json` and
`*-S4.json`; logs `c2-{branch,red}-chromium.log`.

Reach:

- A touch-and-keyboard device (a tablet with a keyboard) or a touchscreen laptop with a
  mouse. After such a swipe, a collapse that involves no click (Escape, the consumer's
  `collapse()`, an idle timer) leaves the dock unable to expand on focus or hover.
- On a pure touch device the next tap anywhere clears it, because that tap's click ends
  the stale press. This is why I rate it minor.

What a cure must satisfy, without a timeout or tolerance:

- A touch press must also resolve when its `pointerup` arrives and no click follows for
  that gesture. That is, it resolves at the next pointerdown, at a `click` or at a
  `pointercancel`, never later than the next environmental expand.
- Or the deferral must be scoped to the press's own target: defer only a focus-in whose
  target is the press's target, and drop a hover dwell's deferral once the pointer that
  pressed is up.

Either way, a focus or a hover that arrives after the press has physically ended is not
"while a press is in flight".

## Not defects (attacked, held)

- **The jump** reproduces on v10.1.2 (first frame 121 px off at 390 right, the seat off
  the pointer) and is gone on the branch in every anchor and form above: first-frame
  distance 0, drift 0, settle snap 0. That includes the vertical dock, the detached
  (fixed) dock, the canvas (stage) dock, `card` and `rounded`, `fit=0`, dark, and widths
  from 360 to 1440.
- **Collapse (critique-1 D-2)** holds its anchored end with no settle snap in every
  anchor, by click-away and by the idle timer. A reversal mid-collapse holds the edge,
  with no frame-to-frame jump over 40 px.
- **Clicks and taps** on an anchored or an open-side seat land exactly once, by pointer
  and by touch.
- **The guard** is byte-identical. Race (b) is still dropped. A target moved by a page
  reflow during the press still does not activate it. Both behave identically on
  v10.1.2.
- **Reduced motion** (a real reduce) jumps on both trees, and the click lands.

## Housekeeping

- Nothing tracked was changed. `tests-visual/_critic2/` was removed after the runs, and
  `git status` on the branch shows only this file.
- `test-results/` output from my runs was removed.
