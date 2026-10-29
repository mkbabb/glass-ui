# 10.1.3 — implement record (value.js O-110, DOCK-ANCHOR-FIRST-FRAME)

Branch `release/10.1.3` from tag `v10.1.2`, worktree `.claude/worktrees/release-10.1.3`.
Implementer: claude-opus-5-5. Not pushed, not tagged.

## The report

value.js orchestrator `value-js-f3` (INBOUND O-110): on 10.1.2 an edge-anchored collapsed
dock lays out its first expand frame at the final width with its controls centred, so a
control moves under the pointer between pointerdown and pointerup and the click is lost.
fourier /v, canvas dock pinned to the stage's right edge, 390: "Edit contour" x 317 -> 215,
the editor never opens. fourier `f-w14v-au2` L2-15 (360/390/430) and `f-w14-control-row`
G-h (1440) RED on 10.1.2 (fourier CI 40608758433), GREEN on 10.1.1.

fourier's dock (read, not run): `CanvasControlsDock.vue` is a `fit-content` `GlassDock`
with "Edit contour" in `#persistent-end`, inside `.controls-dock-anchor`
(`VisualizationView.vue`: `position: absolute; top: 0.5rem; right: 0.5rem`), so the box is
the dock's width and grows leftward from the right edge. G-h fails at "More editor tools"
because the earlier "Edit contour" click never opened the editor: the same defect.

## Reproduction on v10.1.2, per frame

The glass-side port is scene `edge-anchor` in `tests-visual/release-10-1-3/harness.ts`:
fourier's dock shape, pinned right (`?anchor=right`, the seat in `#persistent-end`) or
mirrored left (`?anchor=left`, the seat in `#persistent`, again on the anchored side). A
detached worktree at `v10.1.2` (`.claude/worktrees/red-10.1.2`, `npm ci --ignore-scripts`)
carries the same harness and spec, untracked.

The hover expand, read on every frame (pointer moved from off the dock to the seat's
centre). `rest` and `first` are the dock's painted `[left, right]` at rest and on the first
`[data-morphing]` frame; `seat` is the seat's centre x at rest and on that frame;
`maxOff` the seat centre's largest distance from the pointer over the morph; `summary` the
summary glyph's left at rest and on that frame. Identical in Chromium and WebKit 2287.

| width | anchor | tree | rest | first | seat rest -> first | maxOff | summary rest -> first |
|---|---|---|---|---|---|---|---|
| 360 | right | 10.1.2 | 248-344 | 128-224 | 316 -> 216 | 100 | 264 -> 38.3 |
| 360 | right | 10.1.3 | 248-344 | 248-344 | 316 -> 316 | 4 | 264 -> 264 |
| 390 | right | 10.1.2 | 278-374 | 157-253 | 346 -> 245 | 101 | 294 -> 66.3 |
| 390 | right | 10.1.3 | 278-374 | 278-374 | 346 -> 346 | 4 | 294 -> 294 |
| 430 | right | 10.1.2 | 318-414 | 197-293 | 386 -> 285 | 101 | 334 -> 106.3 |
| 430 | right | 10.1.3 | 318-414 | 318-414 | 386 -> 386 | 4 | 334 -> 334 |
| 1440 | right | 10.1.2 | 1328-1424 | 1207-1303 | 1396 -> 1295 | 101 | 1344 -> 1116.3 |
| 1440 | right | 10.1.3 | 1328-1424 | 1328-1424 | 1396 -> 1396 | 4 | 1344 -> 1344 |
| 360 | left | 10.1.2 | 16-118 | 133-235 | 44 -> 141.5 | 97.5 | 78 -> 62 |
| 360 | left | 10.1.3 | 16-118 | 16-118 | 44 -> 44 | 4 | 78 -> 78 |
| 390/430/1440 | left | 10.1.2 | 16-118 | 137-239 | 44 -> 145.3 | 101.3 | 78 -> 61.8 |
| 390/430/1440 | left | 10.1.3 | 16-118 | 16-118 | 44 -> 44 | 4 | 78 -> 78 |

On 10.1.2 the first frame paints the collapsed box's width centred in the reserved box
(390 right: reserved 36-374, centre 205, first frame 157-253), and the seat jumps ~100 px.
On 10.1.3 the first frame is the rest box exactly and the anchored edge holds. The 4 px the
seat travels over the whole morph is the difference between the two postures' own inline
padding, interpolated continuously; the settled frame is identical on both trees.

fourier's click (Playwright `locator.click()` on the collapsed dock's seat), events on
10.1.2 Chromium 390 right: `pointerdown` on the seat's glyph (seat at x 326), `pointerup` on
the anchor box (seat now at 225), `click` on the anchor box; the handler never runs. The
press focuses the seat, `onFocusIn` expands the dock, and the post-flush morph arm runs in
that microtask, before pointerup. WebKit does not focus a button on press, so its dock
expands only after the click: that gesture is Chromium's. The hover path reaches both.

## Root cause (v10.1.2 lines)

- `src/components/dock/styles/layers.css:117` — `.glass-dock[data-morphing]:not(.vertical)
  { inline-size: var(--dock-expanded-px) }`: the morph reserves the expanded box from its
  first frame. For a box pinned by `right` alone this grows leftward from the edge.
- `src/components/dock/styles/layers.css:106` — `transform-origin: center center` on the
  morphing root, with `scale: var(--dock-size-scale, 1) 1` (`shape.css:103-104`): the
  visible box is the collapsed width scaled about the reserved box's centre, so the first
  frame paints it centred in the reserved box, not at its anchored edge.
- `src/components/dock/styles/shape.css:129-138` — the persistent regions and the layers
  carry the inverse scale about their own centres (the default origin), which restores
  their size but not their place: their centres are mapped by the root's centre-origin
  scale, so the seat travels with the box toward its centre.
- `src/components/dock/composables/useDockMorph.ts:105-113` — the arm (10.1.2, O-101)
  measures the endpoints from the patched posture and plays at once, in the same flush as
  the posture change; triggered from `onFocusIn` (`useDockState.ts:301-307`) by the press,
  the reservation and the centred scale land between pointerdown and pointerup.

Why 10.1.1 was GREEN (by its source, `v10.1.1:dockMorphMeasure.ts`): on a dock mounted
collapsed, its expanded endpoint was `chrome + fullSize` with `fullSize` the inactive full
pane's box (stretched over the collapsed layers), so a first expand reserved about the
collapsed width and nothing scaled; the box snapped at settle (the O-101 defect itself).
The centre origin was the latent cause; O-101's honest endpoint exposed it on the first
expand. The click guard (`useDockClickIntegrity.ts`) never saw fourier's click: the engine
dispatched it to the common ancestor, outside the dock.

## The cure

`src/components/dock/composables/dockMorphMeasure.ts` (`useDockExpandedSize` returns
`first`, `anchor`, `release` beside `measure`), `useDockMorph.ts` (the orchestrator takes
`geometry` and calls `first` in the pre-flush swap, before the patch; `measure` then
`anchor` once `[data-morphing]` and the start scalar are set; `release` at settle),
`GlassDock.vue` (passes it), `styles/index.css` (`@property --dock-morph-origin`,
`<length-percentage>`, non-inheriting, initial `50%`), `styles/layers.css` and
`styles/shape.css` (the root and the regions read it as their `transform-origin` on the
morph axis; the leaving pane reads `--dock-leave-shift`).

- The root's origin is the fixed point of the map from the box painted before the morph to
  the reserved box: `(first - laid) / (1 - s)` in root coordinates, `s` the root's scale at
  the start scalar. The first frame paints exactly the box that was painted, and each edge
  moves linearly to its rest. For an edge-anchored dock that is the anchored edge; for a
  centred dock it is the centre (unchanged). It is read from the layout, never inferred
  from a prop or a justify value, so a reversed morph (its first box is the current
  painted one) and an ancestor transform (the viewport-per-local ratio `k`) hold too.
- A persistent region takes the origin that holds its painted centre: a seat on the
  anchored side stays under the pointer; one on the open side rides the growing edge.
- The layers take the root's origin, so the two scales cancel and the pane lays out where
  it rests, inside the reserved box; no frame paints content outside it (the O-101 gate).
  ~~That was true of the reserved box, not of the plate the user sees~~ (critique-4 D-1;
  Round 4 below: the box now clips to the plate while it morphs).
- The leaving pane is shifted back to the box it painted and fades there (the summary
  glyph no longer jumps to the reserved box's start: 294 -> 66.3 on 10.1.2 at 390).
- Ask (2), the click guard: no change. With the seat held, Playwright's click and a press
  mid-expand both land on the seat, and the guard's persistent arm passes them on
  identity. Its tolerance is not widened. ~~no movement exemption was needed, because the
  movement is gone.~~ [critique-1 D-1] The movement is gone for an anchored-side seat
  only. An open-side seat rides the growing edge, so a press-triggered expand still moved
  it before the release; the cure for that is the press rule under "Round 1" below, not
  the guard.

No public API is removed or renamed: the composables are internal (not in the dock
subpath's exports); `--dock-morph-origin` and `--dock-leave-shift` are new internal
properties.

## Gates

| gate | result |
|---|---|
| `npm run typecheck` (guarded `--light`) | exit 0 |
| `npm run build` (guarded) | exit 0 |
| `npx vitest run --maxWorkers=2` (guarded) | 245 files, 2378 passed, 10 expected fail, 1 skipped (after `npm run demo:dist:build`; `gate:boot-graph` reads `dist-demo`) |
| unit "the morph's origins (O-110)" x3 | GREEN (RED on 10.1.2: `first`/`anchor` absent) |
| `release-10-1-3.spec.ts`, Chromium headless-new | 24/24 GREEN on the branch; 24/24 RED on v10.1.2 |
| `release-10-1-3.spec.ts`, WebKit 2287 (`guarded --exclusive webkit`) | 24/24 GREEN on the branch; 16/24 RED on v10.1.2 (the 8 click cells are GREEN there: WebKit does not focus on press) |
| `release-10-1-2.spec.ts` + `release-10-1-1.spec.ts`, Chromium | 77/77 (O-101 no-overflow cells 1440->390 and 390->1440 among them) |
| the same, WebKit 2287 | 77/77 |
| `dock-morph-family`, `dock-morph-insitu`, `dock-animation-live` (Chromium) | 1 passed / 9 failed on BOTH trees, identical cells: pre-existing rot, no delta |
| `npm run verify:package` | terminal CLEAN after the bundle-ratchet rebind 2934538 -> 2938017 (+3,479 B: the origin measure and its CSS) |

The witness cells per width x anchor: (1) Playwright's click on the collapsed dock's seat
reaches it (pointerdown, pointerup and click all on the seat; the handler ran once);
(2) the hover expand per frame: the first morph frame is the collapsed box (both edges,
< 0.5 px), the anchored edge holds < 0.5 px, the pointer is inside the seat on every
frame, no frame widens the document or leaves the viewport; (3) a press on the seat once
the morph is in flight is kept.

Logs (beside the worktree, `.claude/worktrees/`): `pw-chromium-10.1.3-witness.log`,
`pw-webkit-10.1.3-witness.log`, `pw-chromium-red-10.1.2-on-10.1.3-witness.log`,
`pw-webkit-red-10.1.2-on-10.1.3-witness.log`, `pw-chromium-release-on-10.1.3.log`,
`pw-webkit-release-on-10.1.3.log`, `vitest-10.1.3.log`, `verify-10.1.3.log`,
`trace-{chromium,webkit}-{release-10.1.3,red-10.1.2}.txt` (the table above).

## Open

- fourier's own cells are not run here (sibling repos are read-only); fourier re-adopts at
  10.1.3 and runs them.
- ~~A reversal mid-expand re-anchors from the painted boxes, but the summary pane, active
  again, drops its leave shift at that moment; it is partly faded by the stagger then. Not
  witnessed in paint.~~ [critique-3 D-1] Measured, it was opaque and outside the plate
  for most of the collapse. Cured in Round 3 below.
- The `red-10.1.2` worktree stays for critics' RED reruns; remove it with
  `git worktree remove .claude/worktrees/red-10.1.2` when the close is done.

## Round 1 (critique-1)

- **D-1, ask (2): the press holds the posture.** `useDockState` holds an environmental
  expand (a focus-in, a hover-intent dwell) that lands while a press on the dock is in
  flight and runs it when the press resolves: at its `click` (the engine has already
  hit-tested it), its `pointercancel`, or, for a mouse or pen press with no click, when
  its `pointerup` task ends. A touch press waits for the tap's click, because the
  compatibility mousedown that focuses comes after the pointerup. The deferred expand
  runs only if the focus is still inside (`focusout` to outside drops it) or the pointer
  has not left (`mouseleave` drops a deferred dwell). A keyboard focus expands at once.
  The press listener is attached with the root ref (`flush: "sync"`), so no press can
  precede it. The guard is unchanged. A hover expand still moves an open-side seat away
  from a resting pointer (it must reach the open edge); a press that then lands on an
  arriving control is the guard's race (b), still dropped.
- **D-2: a collapse holds its end.** A collapse starts unscaled, where every origin is a
  fixed point, so the root's origin fell back to the centre (snap 121 px at 390, seat
  outside the plate; 10.1.1 and 10.1.2 the same). `anchor` now reads, when the start is
  unscaled, the END boxes: the root, regions and panes laid out with `scale: none`,
  `--dock-expanded-px: initial` and `--dock-morph-t: 1`, in the same task. The root's and
  regions' origins hold those; the entering pane is shifted to its rest and the leaving
  pane to the box it painted, through one property, `--dock-pane-shift` (registered,
  non-inheriting, `0px`), which replaces the unreleased `--dock-leave-shift`.
- **D-3: not a dock defect.** `reducedMotion` is a Playwright context option, not a test
  option: `test.use({ reducedMotion: "reduce" })` is ignored without a word, and the
  critic's page read `matchMedia("(prefers-reduced-motion: reduce)").matches === false`
  (asserted in the corrected cell). Under a real reduce (`contextOptions`) the spring
  jumps on this branch and on 10.1.2: data-morphing is set and cleared in one task, and
  the box goes from rest to rest. The witness cell now uses `contextOptions` and asserts
  the page reads reduce. (`tests-visual/playwright.config.ts`'s own top-level
  `reducedMotion: "no-preference"` is dead for the same reason; it matches the default,
  so nothing changes, and it is left for its owner.)


### Round 1 gates

| gate | result |
|---|---|
| `npm run typecheck` (guarded `--light`) | exit 0 |
| `npm run build`, `npm run demo:dist:build` (guarded) | exit 0 |
| `npx vitest run --maxWorkers=2` (guarded) | 246 files, 2383 passed, 10 expected fail, 1 skipped; `gate:boot-graph` failed only on a stale `dist-demo`, 14/14 after `demo:dist:build` |
| unit `GlassDock.press-posture.test.ts` | 5/5 GREEN; 4/5 RED on the pre-cure source (the keyboard cell is an invariant) |
| unit "a right-anchored collapse…" (`dockMorphMeasure.test.ts`) | GREEN; RED on the pre-cure source |
| `release-10-1-3.spec.ts`, Chromium | 35/35 GREEN (the 24 O-110 cells and 11 critique-1 cells). On the pre-cure branch the 11 cells were 10 RED (left-anchored open seat GREEN). On v10.1.2 dock source they were 10 RED (D-3 GREEN: reduce jumps there too) |
| the same, WebKit 2287 (`guarded --exclusive webkit`) | 35/35 GREEN. On v10.1.2 the critique-1 cells were 3 RED (D-2, all three anchors); D-1 is GREEN there because WebKit does not focus on press |
| `release-10-1-2.spec.ts` + `release-10-1-1.spec.ts` | Chromium 77/77, WebKit 2287 77/77 (the O-101 no-overflow cells 1440->390 and 390->1440 among them) |
| `npm run verify:package` | terminal CLEAN after the bundle-ratchet rebind 2938017 -> 2939290 (+1,273 B) |

Logs, beside the worktree: `fix1-pre-chromium.log`, `fix1-post-chromium.log`,
`fix1-post-webkit.log`, `fix1-red1012-chromium.log`, `fix1-red1012-webkit.log`,
`fix1-release-chromium.log`, `fix1-release-webkit.log`, `fix1-vitest.log`,
`fix1-typecheck.log`, `fix1-build.log`, `fix1-verify.log`. The RED arms swapped
`src/components/dock` to the named tree inside this worktree and restored it to HEAD.

## Round 2 (critique-2)

- **D-1: a touch press lets go at its pointerup.** The round-1 rule ignored a touch
  `pointerup` and held the press until the tap's `click`. A touch gesture need not tap: a
  vertical swipe across the run (`touch-action: pan-x`) dispatches `pointerdown` and
  `pointerup` and nothing else. The press stayed in flight, and every later focus-in and
  hover dwell was deferred until some click anywhere. After Escape, a keyboard focus or a
  mouse hover no longer expanded the collapsed dock. 10.1.2 behaves correctly here. The
  press now has phases:
  - `down`: the pointer is down.
  - `tap`: after a touch `pointerup`. Nothing is held.
  - `compat`: from the tap's compatibility `mousedown` to its `click`, or to the end of
    its `mouseup` task. No `pointerdown` precedes that `mousedown`, and the
    `mousedown` is what focuses the seat.

  Environmental expands defer only in `down` and `compat`. The next `pointerdown`
  anywhere drops an unresolved touch press, with what it deferred. There is no timeout
  or tolerance, and the click guard is unchanged.

### Round 2 gates

| gate | result |
|---|---|
| `npm run typecheck` (guarded `--light`) | exit 0 |
| `npm run build`, `npm run demo:dist:build` (guarded) | exit 0 |
| `npx vitest run --maxWorkers=2` (guarded) | 246 files, 2387 passed, 10 expected fail, 1 skipped |
| unit `GlassDock.press-posture.test.ts` | 8/8 GREEN; the 3 new cells are RED on the round-1 source (touch press with no tap then focus; then hover dwell; a stale touch press dropped with its deferral by the next pointerdown). The touch-tap cell now dispatches the compatibility mousedown the engine sends |
| `release-10-1-3.spec.ts`, Chromium | 38/38 GREEN; the 3 critique-2 cells (CDP swipe across the run, Escape, then focus or hover; script touch press with no tap, then focus) are 3/3 RED on the round-1 source |
| the same, WebKit 2287 (`guarded --exclusive webkit`) | 36 passed, 2 skipped (the CDP swipe cells are Chromium's); the script touch press cell is RED on the round-1 source |
| `release-10-1-2.spec.ts` + `release-10-1-1.spec.ts` | Chromium 77/77, WebKit 2287 77/77 (the O-101 no-overflow cells among them) |
| `npm run verify:package` | terminal CLEAN after the bundle-ratchet rebind 2939290 -> 2939587 (+297 B) |

Logs, beside the worktree: `fix2-pre-chromium.log`, `fix2-post-chromium.log`,
`fix2-pre-webkit.log`, `fix2-post-webkit.log` (the 10.1.3 spec and the two release specs),
`fix2-release-chromium.log`, `fix2-vitest.log`, `fix2-typecheck.log`, `fix2-build.log`,
`fix2-demo-build.log`, `fix2-verify.log`. For the RED arms, `useDockState.ts` was swapped
to its `9a768746b` version inside this worktree and then restored.

## Round 3 (critique-3)

- **D-1: a collapse that reverses an expand keeps the summary inside the plate.** Two
  causes, both in `anchor`.
  - The rest boxes (`end`) were read only for an unscaled start. A reversal starts
    scaled, so the entering summary got no `--dock-pane-shift`. It laid out at the
    reserved box's start, outside the plate and opaque, and jumped about 245 px at
    settle. `end` is now read for every collapse, which is the full pane no longer
    `.is-active` in the patched DOM, and for any unscaled start as before.
  - The pane's shift was read from its laid box at the start scalar. The root's
    `padding-inline` interpolates on `--dock-expand-t` (11.3 px to 8 px at 390). It moves
    and resizes the layers under their percentage origin, so a pane painted (1 - s)·e
    plus the padding delta away from its laid box by the end. Traced in Chromium:
    e = 5.06 px, s = 0.284, 6.9 px short of rest.
  - The fix: the entering pane of a collapse is shifted against the box it paints at
    the end scalar, with the origins written, so the settle is exact. The leaving pane
    keeps the first-frame read, where it is opaque.
  - This also cures the 3 to 7 px settle residual that an unscaled collapse, and a
    left-anchored reversal, left on the summary. Nothing is widened, and the click guard
    is unchanged.

### Round 3 gates

Run by the round-3 completion seat on the final source (`d98a2f5ae`). Every run went
through `guarded`.

| gate | result |
|---|---|
| `npm run typecheck` (guarded `--light`) | exit 0 |
| `npm run build`, `npm run demo:dist:build` (guarded) | exit 0 |
| `npx vitest run --maxWorkers=2` (guarded) | 246 files, 2388 passed, 10 expected fail, 1 skipped |
| unit `dockMorphMeasure.test.ts` | 18/18 GREEN; the new reversal cell is RED on the round-2 source (shift `''`, want `247px`) |
| `release-10-1-3.spec.ts` + `release-10-1-2.spec.ts` + `release-10-1-1.spec.ts`, Chromium | 118/118 GREEN (41 in the 10.1.3 spec, the 3 reversal cells among them; 77 release cells, the O-101 no-overflow cells among them) |
| reversal cells (right, left, bottom at 390), Chromium, RED arms in `red-10.1.2` | v10.1.2 dock 3/3 RED (72, 64 and 72 frames outside the plate); round-2 dock (`10234c77c`) 3/3 RED (right and bottom 73 frames outside; left a 3.4 px settle jump) |
| the same three specs, WebKit 2287 (`guarded --exclusive webkit`) | NOT PROVEN on the final source: see the WebKit crash below. The round-3 fix seat's run at 10:18 (116 passed, 2 skipped) predates its last edit to `dockMorphMeasure.ts` (10:29) |
| reversal cells, WebKit 2287, RED arms | NOT RUN: the same crash |
| `npm run verify:package` | the ratchet refused +154 B (2939741 > 2939587); rebound on the committed tree in `2706e08ba`, then terminal CLEAN |

**The WebKit crash (environmental, not this round's).** From about 12:37 on 2026-10-28,
every Playwright WebKit 2287 page that mounts a `GlassDock` crashes at load ("Page
crashed"). It crashes on the v10.1.2 tree in `red-10.1.2` exactly as on the branch, and
the same code was GREEN in WebKit at 23:38, 03:35, 08:40 and 10:18. Pages without a dock
pass, for example 10.1.1's G-1, G-2 and Skeleton cells. The WebContent crash reports
(`~/Library/Logs/DiagnosticReports/com.apple.WebKit.WebContent.Development-2026-10-28-12*.ips`)
abort in `WebCore::Style::Color::resolvedColor()`, called from
`toStyleColor(CSS::ColorMix)` while applying `border-top-color`.

A probe that rewrites the dev-served `demo/demo.css` traced it to `color-mix` values:
- Neutralising every value `color-mix(` stops the crash.
- Neutralising either half of them also stops it, so the abort needs `color-mix` values
  from both halves together, which suggests a nested `color-mix` resolved through a
  custom property.

This is the BL registry's PF-2 class ("the glass-ui demo crashes Playwright WebKit on
boot"). Nothing in either tree's Tailwind sources changed between the green run and the
crashes, so the trigger is machine state outside both trees, not yet identified. The
WebKit cells stay owed. Rerun the three specs and the two RED arms in WebKit once a dock
page loads there again.

Logs, beside the worktree:
- Branch runs: `fix4-post-chromium.log`, `fix4-post-webkit.log` (the crash).
- RED arms: `fix4-red-{v10.1.2,10234c77c}-{chromium-headless-new,webkit}.log`.
- Unit RED and GREEN: `fix4-unit-red.log`, `fix4-unit-green.log`.
- Builds and checks: `fix4-typecheck.log`, `fix4-build.log`, `fix4-demo-build.log`,
  `fix4-vitest.log`, `fix4-verify.log` (the refusal), `fix4-verify-rebind.log` (CLEAN).

The RED arms ran in `red-10.1.2` with this spec and harness copied in. They ran first on
its own v10.1.2 dock and then on `10234c77c`'s. The dock was then restored to v10.1.2,
checked with `git diff --quiet v10.1.2`. The unit RED arm swapped `dockMorphMeasure.ts` to
its `10234c77c` version inside this worktree and then restored it.

## Round 4 (critique-4)

Implementer: claude-opus-5-5. Both cures are in `src/components/dock/styles/shell.css`;
no script changed, and the click guard is untouched.

- **D-1: the morph clips its content to the plate.** The layers lay out where they rest
  and the plate grows over them from the measured origin, so the full pane's controls
  past the plate's moving edge painted on the bare stage. Nothing clipped them: the box,
  `.dock-controls` (`display: contents`) and `.dock-layers` were all `overflow: visible`.
  - The cure: `.glass-dock[data-morphing]` clips on its morph axis with `overflow: clip`
    (`overflow-x` horizontal, `overflow-y` vertical; the cross axis stays `visible`).
    The plate is the box's padding box (`.dock-plate`, `position: absolute; inset: 0`),
    and the clip is drawn in the box's coordinates, so the morph's `scale` carries the
    clip with the plate on every frame. At rest nothing clips, as before.
  - Not `clip-path` on `.dock-layers`: it forms a backdrop root (the grasp gate's own
    capture, `tests/styles/glass-subtlety.test.ts`), so an active `.glass-capsule` lens
    in the pane would blur nothing mid-morph and pop at settle. `overflow: clip` forms
    none and is no scroll container.
  - Not an opacity ramp: it would only approximate the plate's edge.
  - The one exception is the GU-4 press keepalive (`.is-press-keepalive`, armed when a
    press is in flight as the dock collapses). Its pressed control must stay painted and
    hit-testable under the pointer until the click resolves, and an overflow clip cuts
    hit testing too, so the box does not clip while it is held (`:not(:has(...))`).
- **D-2: a vertical collapse settles without a snap.** The vertical root's transition
  carried `scale var(--dock-motion-resize)`, held off only by a `[data-morphing]` rule.
  The leg's at-rest writer, the collapsed hover pre-scale, was struck at BK #47 W7, so its
  only input was the morph's own release. At settle the attribute cleared, the morph's
  `scale: 1 0.32` dropped to `none`, and the re-armed leg eased the settled collapsed box
  back from 32 % of its height. The leg and the `[data-morphing]` rule are deleted; the
  morph is the only writer of the root's `scale`. The `transform` leg (press-squish) and
  the box-shadow fade stay.

### Witnesses (`tests-visual/release-10-1-3.spec.ts`)

- The D-2 collapse cells read every frame after the morph settles ("every frame after the
  morph paints the settled box"), and run top-anchored as well (the harness gains
  `?anchor=top`). Before, the witness compared the last morph frame with a box read
  1.7 s later, after the re-grow, and passed while the snap painted.
- D-1 (critique-4), per frame. Every `[data-witness]` element with painted opacity above
  0.1 (the product up to the dock, 0 when hidden), cut by each ancestor whose computed
  `overflow` clips, lies within 1 px of the plate's box. Read on the hover expand and the
  click-away collapse (right, left, bottom at 390; right at 1440), and through a double
  reversal (hover, `collapse()` 120 ms in, re-hover; right and bottom at 390).
- D-1 (critique-4), in paint. The page's rAF is frozen mid-morph, set by the plate's
  travel (40 % of the expand's, 30 % of the collapse's; right-anchored at 390), not by a
  frame count: a first draft froze on expand frame 6 and collapse frame 4, and in WebKit
  those are different geometry (its frames advance further apart), so the expand cell
  failed its own setup check and the collapse cell passed on the round-3 source. The
  stage strip left of the frozen plate, less a 6 px margin, is compared with the same
  strip at rest: no pixel may differ by more than 48 in a channel.

### Round 4 gates

Every run went through `guarded`; WebKit is build 2287 through
`tests-visual/webkit-2287.config.ts` under `guarded --exclusive webkit`. The pre-cure arm
swapped `shell.css` to the round-3 source (`fa096339a`) inside this worktree and restored
it (`cmp` checked). The v10.1.2 arm ran in `red-10.1.2` with this spec and harness copied
in, its `src/` checked against `v10.1.2` before and after.

| gate | result |
|---|---|
| `npm run typecheck` (guarded `--light`) | exit 0 |
| `npm run build`, `npm run demo:dist:build` (guarded) | exit 0 |
| `npx vitest run --maxWorkers=2` (guarded) | 246 files; 2387 passed, 10 expected fail, 1 skipped, 1 failed: the aurora `resolveAtoms` fuzz timed out at 5 s under machine load (load about 35). Rerun alone: 24/24 |
| `release-10-1-1` + `release-10-1-2` + `release-10-1-3` specs, Chromium | 127/127 GREEN (77 release cells, the O-101 no-overflow cells among them; 50 in the 10.1.3 spec) |
| the same, WebKit 2287 | 125 passed, 2 skipped (the CDP swipe cells are Chromium's). This includes the critique-3 reversal cells that round 3 left owed |
| new and changed cells, round-3 source, Chromium | 10/12 RED: D-2 bottom 35.9 px, top 37.3 px; D-1 per frame 6/6 (right: "View layers" up to 218 px outside the plate); the right and left D-2 cells pass (a horizontal dock has no such leg) |
| the same, WebKit 2287 | 10/12 RED: D-2 bottom 31.0 px, top 29.6 px; D-1 per frame 6/6; the right and left D-2 cells pass |
| the same, v10.1.2, Chromium and WebKit 2287 | the per-frame cells and all four D-2 cells RED in both engines. The D-2 cells fail first on the earlier anchored-edge drift (121 and 116 px), before the settle check |
| frozen paint cells (by travel), Chromium | branch 2/2 GREEN; round-3 source 2/2 RED (180 and 68 ink pixels); v10.1.2 2/2 RED (160, 152) |
| the same, WebKit 2287 | branch 2/2 GREEN; round-3 source 2/2 RED (318, 720); v10.1.2 2/2 RED (356, 612) |
| `npm run verify:package` | the ratchet refused +65 B (2939806 > 2939741); rebound on the committed tree in `49bf38296`, then terminal CLEAN |

**The WebKit crash that round 3 recorded.** Round 3's chain (`fix4-chain.sh`) ran its
WebKit cells through `tests-visual/playwright.config.ts`, which resolves Playwright's
bundled WebKit 2311. `webkit-2287.config.ts` documents that 2311 crashes every page that
mounts a `GlassDock`. Every WebKit run this round, and critique-4's, used the 2287 config,
and no dock page crashed.

Logs, beside the worktree in `fix5/`: `chain.sh` and `chain2.sh` (the serial runs),
`chain.log`, `chain2.log`; `pre-chromium.log`, `post-chromium.log` (the first RED and
GREEN pair); `release-{chromium,webkit}.log`; `pre-webkit.log`;
`red1012-{chromium,webkit}.log`; `frozen-{post,pre,red1012}-*.log`; `typecheck.log`,
`build.log`, `build-committed.log`, `demo-build.log`, `vitest.log`,
`vitest-aurora-rerun.log`, `verify.log` (the refusal), `verify-rebind.log` (CLEAN).

Housekeeping: `release-10.1.3/fix5/` (two Playwright JSON reports from the first runs,
whose relative `PI_REPORT` resolved inside the worktree) is untracked and not committed.
Removing it was refused by the permission system; delete it by hand.

## Round 5 (critique-5)

Implementer: claude-opus-5-5. Both defects are records; no rule, script or spec changed,
and the click guard is untouched.

- **R-1: the comments now match the morph clip.** Four comments said the dock box never
  clips, beside the round-4 rule that clips it on the morph axis while `[data-morphing]`
  is set:
  - `shell.css`, the block above the rule (it said the "MORPH APERTURE is DELETED" and
    "`.glass-dock` NEVER clips its descendants now");
  - `dock.css`, the L1 rule ("structurally impossible") and the file header's L1 entry;
  - `GlassDock.vue`, the `.dock-controls` template comment ("NO ancestor clips them");
  - `shape.css`, which quoted the `shell.css` sentence.

  Each now says that at rest nothing clips, and points to the morph clip in `shell.css`
  as the one place the box clips, with its scope: the morph axis only, only while
  `[data-morphing]` is set, lifted under the press keepalive. The stale transitional-window
  note in `shell.css` is struck; it described a mid-morph spill that round 4 clips.
- **R-2: the CHANGELOG states the WebKit result.** The critique-3 bullet said its WebKit
  cells were owed. They are RED on v10.1.2 in WebKit 2287 (critique-5,
  `red-1013spec-webkit.log`, cells 36 to 38) and GREEN on the branch (this round's
  `release-webkit.log`, cells 113 to 115). The sentence now says so.

Witness: `fix-r5/records-witness.sh`, beside the worktree. It fails on any of the struck
claims in the four dock files or on "WebKit cells are owed" in the CHANGELOG, and checks
that both `[data-morphing]` clip rules are present. RED before the cure
(`records-witness-pre.log`: 7 hits), GREEN after. It is a record check, so it has no
engine arm; the engine gates below show the comment edits changed nothing in paint or
behaviour.

### Round 5 gates

| gate | result |
|---|---|
| `npm run typecheck` (guarded `--light`) | exit 0 |
| `npm run build`, `npm run demo:dist:build` (guarded) | exit 0 |
| `npm run verify:package` | terminal CLEAN, no ratchet refusal |
| `npx vitest run --maxWorkers=2` (guarded) | 246 files; 2387 passed, 10 expected fail, 1 skipped, 1 failed: `comment-ratio.test.ts` "the COMMITTED figure is derivable at a named revision" timed out at 5 s (load about 45). It reads `HEAD` twice, so the uncommitted edits cannot reach it; rerun alone it timed out again at 5.1 s, with the file's other 13 cells passing |
| `release-10-1-1` + `release-10-1-2` + `release-10-1-3` specs, Chromium | 127/127 GREEN (the 77 release cells with the O-101 no-overflow cells, and the 10.1.3 fourier cells) |
| the same, WebKit 2287 (`webkit-2287.config.ts`, `guarded --exclusive webkit`) | 125 passed, 2 skipped (the CDP swipe cells are Chromium's) |

Logs, beside the worktree in `fix-r5/`: `chain.sh`, `chain.log`, `typecheck.log`,
`build.log`, `demo-build.log`, `vitest.log`, `vitest-comment-ratio-rerun.log`,
`verify.log`, `release-{chromium,webkit}.{log,json}`, `records-witness.sh`,
`records-witness-{pre,post}.log`.

Housekeeping: `release-10.1.3/fix5/` (round 4's two stray Playwright JSON reports) is
still untracked; removing it was refused by the permission system again. Delete it by hand
before the tag.

## Round 6 (critique-6)

Implementer: claude-opus-5-5. The click guard and its constants are untouched.

- **D-1: a press ends where the engine ends it without a release** (`useDockState.ts`,
  the press rule). The hold ended only at a `click`, a `pointercancel`, a `pointerup`
  task's end, or a new in-dock `pointerdown`. WebKit ends two ordinary mouse gestures
  with none of those: a native drag of a dock link (`pointerdown`, `mousedown`,
  `dragstart`, `dragend`) and a right-click (`pointerdown`, `mousedown`, `contextmenu`).
  The hold now ends at `dragstart` and at `contextmenu`, which run what the press
  deferred. Neither is followed by a click, so nothing that runs then can move a click's
  target. An unresolved press of any pointer type now lapses, with what it deferred, at
  the next primary `pointerdown` anywhere. Before, only a touch press did. A second
  finger (`isPrimary: false`) leaves the first press holding. There is no timeout and no
  tolerance.
- **R-1:** the `shell.css` at-rest comment names the vertical scroll port as `.dock-run`
  (`run.css`), not the root.

### Witnesses

- Unit (`GlassDock.posture.test.ts`, "a press that ends without a release"): `dragstart`
  and `contextmenu` each run the deferred focus expand and leave no hold. A primary
  `pointerdown` outside drops the press and what it deferred. A non-primary one does not.
  RED 3/4 before the cure (the non-primary cell is the control), 23/23 GREEN after.
- Engine (`release-10-1-3.spec.ts`, `-g critique-6`; the harness gains `?link=1`, a
  draggable `<a href>` beside "Edit contour", and an outside button):
  - a link dragged out of the collapsed dock, right- and left-anchored, then a focus or
    a hover (4 cells);
  - a right-click on the collapsed seat, then a focus;
  - a hover-intent dwell that completes after a right-click: the pointer enters the
    collapsed seat and right-clicks it inside the 60 ms dwell. The cell first checks
    that the dock was still collapsed at the `contextmenu`;
  - a mouse `pointerdown` with no release, then a `pointerdown` outside, then a focus
    (any engine).

  The critic's move-away-and-back hover after a right-click cannot be driven in
  Playwright WebKit 2287. Once its context menu takes the release, no later mouse move
  reaches the page. A diagnostic showed this on both trees:
  - a right-click outside the dock, then a hover over it, expands nothing on v10.1.2 or
    the branch;
  - with the page cancelling `contextmenu`, the release and the moves arrive, and both
    expand.

  On v10.1.2 every event after the menu reports the pointer at the seat. Its hover
  expand came from the morph sliding the seat out from under that pointer and back,
  firing a spurious leave and enter: the O-110 defect. So that cell's v10.1.2 GREEN is
  not a hover. The dwell cell replaces its hover arm.

### Round 6 gates

| gate | result |
|---|---|
| critique-6 cells (7), pre-cure tree (`17ef64035` `src` + these witnesses), Chromium | 6 GREEN, 1 RED: the supersede cell. Chromium cancels a drag and releases a right-click, so the D-1 gestures pass there before the cure, as critique-6 found |
| the same, WebKit 2287 | 7/7 RED |
| the same, v10.1.2 `src` + these witnesses, WebKit 2287 | 7/7 GREEN |
| `npm run typecheck` | exit 0 |
| `npm run build`, `npm run demo:dist:build` | exit 0 |
| `npx vitest run --maxWorkers=2` | 246 files, 2391 passed, 10 expected fail, 1 skipped; 1 failed: `boot-graph` stale `dist-demo`, GREEN 14/14 after `demo:dist:build` |
| `npm run verify:package` | the ratchet refused +76 B (the listeners); rebound 2939806 → 2939882 on the committed tree, then terminal CLEAN |
| `release-10-1-1` + `release-10-1-2` + `release-10-1-3` specs, Chromium | 134/134 GREEN (the 77 release cells with the O-101 no-overflow cells, the 10.1.3 fourier cells, the 7 critique-6 cells) |
| the same, WebKit 2287 (`guarded --exclusive webkit`) | 132 passed, 2 skipped (the CDP swipe cells are Chromium's) |

Logs, beside the worktree in `fix-r6/`: `{pre,post}-{chromium,webkit}.log` (first
pass, with the replaced hover arm RED on the branch in WebKit), `pre2-*`, `red2-webkit`,
`post2-*` (final), `d2rep-webkit.log`, `d3/{branch,pre,red}/diag-webkit-*.json` with
`_fix6-diag.spec.ts` (the context-menu diagnostic), `unit-{pre,post}.log`, `vitest*.log`,
`typecheck*.log`, `build.log`, `demo-build.log`, `verify-package.log`, the chain scripts.

Housekeeping: `fix5/` is removed.
