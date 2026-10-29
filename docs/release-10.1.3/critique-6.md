# 10.1.3 — critique, round 6 (value.js O-110)

Critic: claude-opus-5-5, fresh, adversarial. Branch `release/10.1.3` at `17ef64035` (25
commits over `v10.1.2`), worktree `.claude/worktrees/release-10.1.3`. I read every commit,
`implement.md`, `critique-1.md` to `critique-5.md`, the `src/` diff (`dockMorphMeasure.ts`,
`useDockMorph.ts`, `useDockState.ts`, `GlassDock.vue`, `styles/{dock,index,layers,shape,shell}.css`)
and the click guard (`useDockClickIntegrity.ts`, byte-identical to `v10.1.2`).

Verdict: **the geometry cure holds; the press rule that answers ask (2) has a WebKit hole.**

- Every asked gate is GREEN on the branch. The fourier cells are RED on v10.1.2.
- The morph geometry held under every new attack: dark at all four widths, every anchor, and
  a viewport resize mid-expand.
- One functional defect reproduced, in Playwright WebKit 2287. Two mouse gestures leave the
  press rule's hold armed for good: a native drag of a dock link, and a right-click. Neither
  ends in a `pointerup`, a `pointercancel` or a `click`. After either one, a hover or a
  keyboard focus no longer expands the collapsed dock until the user clicks somewhere. On
  v10.1.2 the same cells are GREEN. This is D-1 below.
- One minor record defect: R-1 below.

## How I attacked it

The harness is my own and lives outside the tree, in `.claude/worktrees/critic6-10.1.3/`.
It extends critique-5's.

- **Scene.** fourier's dock shape: a `fit-content` collapsible `GlassDock` pinned by one edge
  in a stage, with "Edit" in a persistent slot.
- **New query parameters.**
  - `link=1` adds a draggable `<a href>` seat beside Edit.
  - `swap=1` replaces Edit with an "Imposter" control at the same spot on Edit's
    `pointerdown`. That is an identity change that is not the dock's morph.
- **Trees.** One Vite server served two trees:
  - `branch`: this worktree's `src/`.
  - `red`: `git archive v10.1.2 src demo`, extracted beside it.
  - The harness was mounted at `tests-visual/_critic6/` and removed afterwards.
- **Engines.**
  - Chromium: Playwright's default headless shell for my harness. The repo's
    `chromium-headless-new` project for the official specs.
  - WebKit: build 2287 (`webkit-2287.config.ts`), under `guarded --exclusive webkit`.
- **Guard.** Every run went through `guarded`, serially, from `chain.sh`.
- **Records.** `data/` holds the per-cell JSON, tagged by tree and engine. `*.log` holds
  the runs. `harness/` holds the spec, config and template.

## Results

| attack | branch Chromium | branch WebKit 2287 | v10.1.2 Chromium | v10.1.2 WebKit 2287 |
|---|---|---|---|---|
| **A6.** Dark (the page reads dark) at 360, 430 and 1440, with right, left, center, top and bottom anchors. The hover expand is read per frame, and the anchored seat is clicked | GREEN 30/30. First frame 0 px off, drift 0, seat ≤ 4 px off the pointer, 1 click | GREEN 30/30 | RED on every edge-anchored cell. First frame 116 to 121 px off, seat 94 to 101 px off, 0 clicks. The centred cells are GREEN | RED on all 15 expand cells. The centred ones fail on the summary glyph's frame-to-frame jump (v10.1.2's leaving pane jumps to the reserved box's start). The 15 click cells are GREEN, because WebKit does not focus on press |
| **Z.** 1440 -> 390 mid-expand (60 ms in), right and left | GREEN 2/2. Settles expanded at 36-374 (right) and 16-360 (left), no frame past 390 | GREEN 2/2 | GREEN 2/2, the same boxes | GREEN 2/2 |
| **S.** Guard: a non-morph identity change. Edit is swapped for Imposter on Edit's `pointerdown`. Touch tap and mouse click, right and left | Imposter not activated 4/4 | mouse 2/2 not activated. Touch: Imposter activated 2/2 | not activated 4/4 | mouse 2/2 not activated. Touch: Imposter activated 2/2, the same as the branch |
| **D1.** A mouse press on a dock link that becomes a native drag, dropped outside. Then `collapse()`, then a hover or a focus on Edit | GREEN 4/4. Chromium sends `pointercancel` at `dragstart` | **RED 4/4.** No `pointercancel`, `pointerup` or `click`. The dock stays collapsed | GREEN 4/4 | **GREEN 4/4.** The same event trace; the dock expands |
| **D2.** A right-click on a collapsed seat. Then `collapse()`, then a hover or a focus | GREEN 2/2 | **RED 2/2.** `contextmenu`, then no `pointerup`, `mouseup` or `click`. The dock stays collapsed | GREEN 2/2 | **GREEN 2/2.** The same event trace; the dock expands |

The S touch cell in WebKit is not a regression: v10.1.2 activates Imposter too. WebKit does not focus on
a press, so no expand runs, and the guard sees a dock at rest. "At rest every click is
genuine" is the guard's stated scope on both trees. In Chromium the compatibility
`mousedown` focuses Imposter, and the deferred expand runs at the click's window-capture
listener. The microtask checkpoint before the root's capture listener arms
`[data-morphing]`, so the guard still drops the click exactly as on 10.1.2. The press rule
did not open a pass-through there.

## The asked gates, re-run on `17ef64035`

| gate | Chromium | WebKit 2287 |
|---|---|---|
| `release-10-1-1.spec.ts` + `release-10-1-2.spec.ts` (77) | 77/77 GREEN (`rel-chromium.log`, 127 passed with the 10.1.3 spec) | 77/77 GREEN (`rel-webkit.log`, 125 passed and 2 skipped with the 10.1.3 spec) |
| O-101 no-overflow cells: 1440->390 and 390->1440, horizontal and vertical, each pinned, collapsed, reversal and mid-expand | GREEN 24/24 | GREEN 24/24 |
| `release-10-1-3.spec.ts` on the branch | 50/50 GREEN | 48 passed, 2 skipped (the CDP-swipe cells are Chromium's) |
| The fourier cells (`-g O-110`: L2-15 at 360/390/430 and G-h at 1440, right and left; click, per frame, mid-expand press) on v10.1.2 (`red-10.1.2`, `src` clean against `v10.1.2`) | 24/24 RED | Not re-run: the WebKit lock was held by other repos' runs for over 30 minutes and I stopped the stage. The red tree and the spec are byte-identical to what critique-5 ran (`critic5-10.1.3/red-1013spec-webkit.log`: the per-frame cells RED, the click cells GREEN because WebKit does not focus on press) |

## Defects

### D-1 (functional): a press that ends in no pointerup, cancel or click holds the dock's posture forever (WebKit)

`useDockState.ts:193-262`. `onPressStart` sets `press = "down"` on any `pointerdown` inside
the dock. A mouse press leaves `down` only through one of these:

- a window `click`, which calls `endPress`;
- a `pointercancel`, which calls `endPress`;
- a `pointerup`, which calls `endPressAtTaskEnd`;
- a later `pointerdown` inside the dock, through `onPressStart`'s `dropPress`.

While `press === "down"`, `pressHolds()` is true:

- `onFocusIn` (`:422`) stores `expandOnPressEnd = "focus"` and returns.
- the hover dwell (`:379`) stores `"hover"` and returns.

Nothing expands until the press ends.

WebKit 2287 ends two ordinary mouse gestures with none of those events:

- **A native drag of a dock link.** `<a href>` is draggable by default.
  - Events: `pointerdown`, `mousedown`, `dragstart`, `dragend`. There is no
    `pointercancel`, `pointerup` or `click`.
  - Chromium sends `pointercancel` at `dragstart`, so its cells pass.
- **A right-click.**
  - Events: `pointerdown`, `mousedown`, `contextmenu`. There is no `pointerup`, `mouseup`
    or `click`.
  - Safari's native context menu takes the release.

After either gesture, the press stays `down`. In all six cells (`branch-webkit-D1-*`,
`branch-webkit-D2-*`) the dock was collapsed by `collapse()`, then:

- **Hover.** The pointer rested on the summary for 900 ms, far past the 60 ms dwell. The
  dock stayed collapsed.
- **Focus.** Edit was focused programmatically, after focus had moved out to the page's
  outside button so that a fresh `focusin` fired. The dock stayed collapsed. This is the
  keyboard parity path.

Only a click somewhere on the page releases the hold, and that click then expands the dock
under it. The same cells are GREEN on v10.1.2 in WebKit (`c6-red-webkit.log`: D1 4/4 and D2 2/2 GREEN, with the same `pointerdown`, `mousedown`, `dragstart`/`contextmenu` traces) and on both trees in
Chromium.

This is the critique-2 D-1 class again: an unresolved press that defers every later
environmental expand. Round 2 closed it for touch only.

- On WebKit/Safari, a link or image in a dock and a right-click or Ctrl-click on any seat
  are everyday input.
- Chromium on macOS likely shows the right-click case too, because its native context
  menu also takes the `mouseup`. I could not show that headless, where no native menu
  opens.

A cure stays inside the exact, tolerance-free design. The hold must end on the events that
end a press without a release:

- `dragstart`, which a drag always sends;
- `contextmenu`, which ends the press for the expand's purposes;
- a `pointerdown` anywhere outside the dock, as the touch phase already does.

That last one should be checked for a mouse `down` as well. It must not be a timeout.

Evidence:

- `c6-branch-webkit.log`, cells D1 × 4 and D2 × 2, with the event traces in the failure
  messages.
- `data/branch-webkit-D1-*.json`, `data/branch-webkit-D2-*.json`.
- The v10.1.2 arm: `c6-red-webkit.log`, `data/red-webkit-D*.json`.
- Chromium, both trees GREEN: `c6-{branch,red}-chromium.log`.

### R-1 (records, minor): the rewritten at-rest comment still points at a scroll port the root no longer has

`shell.css:287-292` was rewritten in round 5. It says: "The vertical SCROLL port
(`overflow-y: auto`, below) keeps its cross axis `visible`."

- The rule below it is struck. Since BK #47 W3 the port is `.dock-run` (`run.css:289`), not
  the dock root, as the struck block itself explains.
- The sentence came over from v10.1.2's comment, but round 5 re-authored it.

It should point at `run.css` or be dropped. This has no effect on behaviour.

## Attacked and held (not defects)

- **Dark mode, every width.** The first morph frame is the rest box at 360/430/1440 for
  every anchor. The anchored edge drifts 0, and the click lands in both engines.
- **A resize mid-expand.** On 1440 -> 390 the morph lands on the new rest, on the anchor
  (right edge 374, left edge 16). No frame passes 390, and the result matches v10.1.2's.
- **The guard, by a non-morph identity change.**
  - Mouse: the click goes to the common ancestor, and Imposter is not activated, on both
    trees.
  - Touch in Chromium: the guard still drops it. The press rule's deferred expand arms
    `[data-morphing]` in the microtask before the guard's capture listener.
  - `useDockClickIntegrity.ts` and `constants.ts` are unchanged. No tolerance was widened
    and no exemption was added.
- **The morph clip and the vertical scroll port.** The clip is on the root. The port is on
  `.dock-run`, so the morph's `overflow-y: clip` does not reset a scrolled column.

## Housekeeping

- `fix5/` (round 4's two stray Playwright JSON reports) is still untracked in the worktree.
  It should go before the tag.
- My harness (`tests-visual/_critic6/`) is removed from the worktree. A copy is in
  `critic6-10.1.3/harness/`. No server is left on 5307 or 5308.
