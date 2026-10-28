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
- A reversal mid-expand re-anchors from the painted boxes, but the summary pane, active
  again, drops its leave shift at that moment; it is partly faded by the stagger then. Not
  witnessed in paint.
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
