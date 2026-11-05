# 10.1.3 — critique, round 1 (value.js O-110)

Critic: claude-opus-5-5, fresh, adversarial. Branch `release/10.1.3` at `03eb08d8d` (five
commits over `v10.1.2`), worktree `.claude/worktrees/release-10.1.3`. Read: every commit,
`implement.md`, the full `src/` diff, the witness harness and spec.

Verdict: **the cure holds for the case fourier reported, and it does not answer ask (2).**
An anchored-side seat now stays under the pointer from the first frame in every anchor and
dock form I tried, in both engines. But a persistent seat that the expand *has* to move
(on the open side) still loses its click in Chromium, by pointer and by touch. That click
lands on 10.1.1 and is lost on 10.1.2 and on this branch. `implement.md` answers ask (2)
with "no change… the movement is gone", and that is only true on the anchored side.

## How I attacked it

An independent harness, `critic-1` (one collapsible `GlassDock` pinned by `?anchor=`
right | left | center | top | bottom, `?orient=` horizontal | vertical, `?seat=` anchored |
open, `?fit=0|1`). I ran it unchanged on three trees: this branch, `red-10.1.2` (v10.1.2
source) and `release-10.1.1` (v10.1.1 source). The evidence sits beside the worktrees, out
of the tree, in `.claude/worktrees/critic1-10.1.3/`: `harness/` holds the spec, the page
and the configs, `data/` the per-frame JSON for every cell (tagged by tree and engine), and
the `*.log` files are the runs. A runnable copy stays untracked in `red-10.1.2`.

Every run went through `guarded`: Chromium headless-new, and WebKit 2287 under `guarded
--exclusive webkit`. Each cell records `getBoundingClientRect` on every rAF, so it reads
painted geometry, transforms included.

Cells per configuration:

- **Expand by hover.** The first `[data-morphing]` frame equals the rest box, the anchored
  edge holds, an anchored seat stays under the pointer, nothing leaves the viewport, and
  nothing snaps at settle.
- **Collapse by click-away.** The anchored edge holds and nothing snaps at settle.
- **Click.** Playwright's click on the collapsed dock's persistent seat.
- **Touch tap.** `hasTouch`, at 360, 390 and 430.
- **Reduced motion.**
- **Guard.** Race (b): approach the summary, then press and release mid-morph on the
  arriving control.

## Results

| attack | branch Chromium | branch WebKit 2287 | v10.1.2 Chromium | v10.1.1 Chromium |
|---|---|---|---|---|
| hover expand, anchored seat: right and left at 360/390/430/1440, `fill` at 390/1440, vertical top and bottom at 390/1440 | GREEN 14/14 | GREEN 14/14 | RED 14/14 | RED (snap at settle) |
| hover expand, first frame = rest, open-side seat (h right/left, v bottom) | GREEN | GREEN | RED (121 / 116 px) | GREEN (snap at settle) |
| hover expand, centred dock | first frame = rest, symmetric growth | same | same | snap at settle |
| click on the anchored persistent seat (every config above) | GREEN | GREEN | RED | GREEN |
| touch tap, anchored seat (h right/left, v bottom × 360/390/430) | GREEN 9/9 | GREEN 9/9 | RED 9/9 | GREEN 9/9 |
| **click on an open-side persistent seat** (h-right 390/1440, v-bottom 390) | **RED 3/3** | GREEN 3/3 | RED 3/3 | **GREEN 3/3** |
| **touch tap on an open-side persistent seat** (h-right 360/390/430) | **RED 3/3** | GREEN 3/3 | RED 3/3 | **GREEN 3/3** |
| guard: race (b) click on an arriving control mid-morph is dropped (right/left/centre 390) | GREEN 3/3 (dropped) | GREEN 3/3 | GREEN 3/3 | GREEN 3/3 |
| collapse: anchored edge holds, no settle snap | RED (all) | RED (all) | RED (all) | RED (all) |
| reduced motion: the morph jumps | RED | RED | RED | GREEN |
| dark (`colorScheme: dark`): expand cells + O-110 witness | 46/46 GREEN | not run (geometry is theme-independent) | — | — |

The asked gates, which I re-ran myself on the branch:

| gate | result |
|---|---|
| `release-10-1-3.spec.ts` (the four fourier cells ported, × right/left × 3), Chromium | 24/24 GREEN |
| the same, WebKit 2287 | 24/24 GREEN |
| `release-10-1-2.spec.ts` + `release-10-1-1.spec.ts`, Chromium | 77/77 GREEN, including the O-101 no-overflow cells 1440->390 and 390->1440 (horizontal and vertical; pinned, collapsed, reversal, mid-expand) and O-101a |
| the same, WebKit 2287 | 77/77 GREEN (52 + 25) |
| `vitest tests/components/custom/dock/` (guarded `--light`, `--maxWorkers=2`) | 19 files, 175 passed, 1 expected fail; `GlassDock.click-integrity.test.ts` included |
| `useDockClickIntegrity.ts`, `constants.ts` diff `v10.1.2..HEAD` | empty: no tolerance widened |
| public API | `useDockMorphOrchestrator`'s `measure` option became `geometry`, but the composables barrel is not re-exported by `dock/index.ts` or any `package.json` subpath, so the change is internal |

The jump reproduces on 10.1.2, Chromium, 390, right-anchored: rest `278-374`, first morph
frame `157-253` (121 px), and Playwright's click goes `pointerdown` on the seat, then
`pointerup` and `click` elsewhere. It is gone on the branch: the first frame is `278-374`,
the anchored edge drift is 0, and the seat's largest offset is 4 px.

## Defects

### D-1 (major) — ask (2) is unmet: a persistent seat the expand moves still loses its click in Chromium, by pointer and by touch; GREEN on 10.1.1

What `implement.md` claims for ask (2): "no change. With the seat held… no movement
exemption was needed, because the movement is gone." The cure's own comment says the
opposite for one class of seats: "a persistent region… on the open side rides the growing
edge". So the movement is gone on the anchored side only.

Reproduction (Chromium, branch). A right-anchored collapsed `fit-content` dock, with
"Edit contour" in `#persistent` (the open side), at 390:

- **Pointer.** `locator.click()` gives `pointerdown` on the seat, `pointerup` on
  `.dock-layer--full`, `click` on `.dock-controls`. The handler ran 0 times.
- **The same at 1440**, and for a vertical bottom-anchored dock with the seat in
  `#persistent` (`pointerup` on "Export frame"). All 0.
- **Touch.** `touchscreen.tap` at 360, 390 and 430 gives `pointerdown` and `pointerup` on
  the seat, then `click` on `.dock-controls`. The handler ran 0 times.
- **Per frame**, hover expand at 390: the open seat leaves the pointer on 71 of 73 morph
  frames, up to 238 px away.

On v10.1.1, for every one of those cells, all three events land on the seat and the
handler runs once. On 10.1.1 the open seat held its place for the whole morph (largest
offset 4 px) and the box snapped at settle (242 px). On 10.1.2 the click is RED as well,
so 10.1.2 regressed this class of seats and 10.1.3 leaves the regression in place.

Mechanism, from implement.md's own analysis:

- **Pointer.** Chromium focuses the button on press, `onFocusIn` expands the dock, and
  the post-flush arm runs before `pointerup`.
- **Touch.** The compatibility click is hit-tested after the morph has started.

Either way the seat moves only because of the dock's own morph, which is exactly the
click ask (2) says must not be dropped. The engine, not `useDockClickIntegrity`, sends the
click to the common ancestor. A guard exemption therefore cannot cure it, and widening
tolerance is ruled out.

The direction this points to is an arm-time rule: a morph armed by a press that is still
in flight (a focus-in between `pointerdown` and `pointerup`, or a tap) must not move that
press's target before the press resolves. 10.1.1 met that by accident, by not scaling on
the first expand.

WebKit 2287 is GREEN in these cells only because it does not focus on press, so the dock
expands after the click.

Scope: the four fourier cells are anchored-side and GREEN. fourier's
`EditorControlsDock` is a centred bottom dock with "Save contour" in `#persistent`. My
centred Chromium click cells passed (the seat moves at half the speed), so I do not claim
that dock fails. The open-side class is unwitnessed in `release-10-1-3.spec.ts`.

### D-2 (minor, pre-existing on 10.1.1 and 10.1.2; not a 10.1.3 gate) — collapsing an edge-anchored dock shrinks it toward the reserved box's centre, then it snaps at settle

The reserved box during a collapse is still the expanded one, and the first collapse frame
has `s = 1`. In that case `anchor()`'s `fixedPoint` returns `null` and the origin falls
back to `local / 2`, the centre.

Measured at 390 on the branch, Chromium and WebKit, by click-away:

- **Right-anchored:** expanded `36-374`, last morph frame `157-253`, settled `278-374`.
  That is a 121 px snap, with anchored-edge drift of 121.
- **Left-anchored:** last morph frame `137-239`, settled `16-118` (121 px).
- **Vertical, bottom-anchored:** 116 px.
- **The seat leaves the plate:** in every collapse, including the centred dock, the
  persistent seat paints outside the shrinking plate on about 70 of about 73 frames.

v10.1.2 and v10.1.1 are byte-for-byte the same in these numbers, so this is no regression.
It does contradict implement.md's general statement ("each edge moves linearly to its
rest… for an edge-anchored dock that is the anchored edge"), which holds for the expand
only.

The same fixed-point construction, taken from the end box (`s_end`, the collapsed box at
its anchored rest) whenever `s` at the start is 1, would hold the anchored edge on
collapse too. A reversed collapse already behaves this way, because it starts from a
scaled box.

### D-3 (minor, pre-existing since 10.1.2; not O-110) — under `prefers-reduced-motion: reduce` the dock morph animates

With `reducedMotion: "reduce"` at 390, a hover expand painted 31 distinct box geometries
over about 530 ms of `[data-morphing]` on the branch and on v10.1.2, in Chromium and
WebKit. That contradicts `useDockSpring.ts:14-17`: "JUMPS the scalar 0→target in one
frame".

v10.1.1 painted one box geometry. The spring runs the same length there, but on that tree
nothing scaled during a first expand. The O-101 honest endpoint made the reduce path
visible, and 10.1.3 carries it forward. Data:
`critic1-10.1.3/data/*--reduced-motion_expand_per_frame-*`.

## Not defects (attacked, held)

- **The first expand frame** on the branch equals the collapsed box to within 0 px in
  every anchor (right, left, top, bottom, centre), in `fit` and `fill`, horizontal and
  vertical, at 360/390/430/1440. Nothing leaves the viewport or widens the document.
- **The click guard** is unchanged and exact. A click on an arriving full-pane control
  mid-morph (race b) is still dropped on all four tree and engine combinations.
- **The O-101 no-overflow gate and the 77-cell release spec** are GREEN in both engines.
- **Reversals:** the O-101 reversal and mid-expand cells hold. The summary-pane
  leave-shift drop on reversal that `implement.md` lists as open is not something I
  witnessed in paint.

## Housekeeping

- My files are out of the branch tree (`git status` is clean). The runnable copy is in
  `red-10.1.2/tests-visual/` (untracked), and the record is in
  `.claude/worktrees/critic1-10.1.3/`.
- `release-10.1.1` is restored to its prior state.
