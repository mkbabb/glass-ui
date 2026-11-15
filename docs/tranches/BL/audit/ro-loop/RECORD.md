# O-360a — the ResizeObserver loop on the idle fold: diagnostic record

Seat: diagnostic, claude-opus-5-5, 2026-11-15. Worktree `.claude/worktrees/bl/ro-loop`,
branch `bl/ro-loop` from `v11.0.2`. Nothing shipped.

## Verdict

**Not reproduced in glass alone.** Across three scenes, two tags, two scales, scrolling,
6x CPU throttling, a Select pick flow and a live field canvas, there was no
"ResizeObserver loop completed with undelivered notifications" error in any cell, on
v11.0.1 or on v11.0.2. A wrapped ResizeObserver found that no glass observer callback,
and no MutationObserver callback in the observer delivery, changed the size of any
observed box at any time in any cell. With no RED there was no bisect, no guilty commit
or line, and no cure commit. Nothing was written into `src/`. In WebKit 2287 there was
also no error at any fold. There was a separate loop error each time a Select in the
dock opens, which is the same on v11.0.1 and v11.0.2 (see the WebKit section).

## Harness (worktree commits 66aa1201b and 64c18369a, branch `bl/ro-loop`)

- `tests-visual/ro-loop/ro-harness.{html,ts}`: imports relative to `src/`, so it mounts
  unchanged on both tags. `?scene=`:
  - `base`: `collapse="closed"`, `expandOn: "hover"`, a `#persistent` seat, a two-layer
    `DockLayerGroup`, five seats (icon and tab), fixed at the foot of an 80-row
    scrolling page.
  - `controls`: the same dock, with a 200 px Slider and a Select in the active layer.
  - `consumer`: value.js's shape as far as glass's public API goes. `collapse="open"`,
    `fit-content`, in flow in a top band (`display:flex; justify-content:center;
    min-height:72px`) whose host div is sized by the dock, as `.dock-band > div >
    GlassDock` is. A layer group whose main layer holds a Select, a `DockSeparator` and
    seats. The collapsed face is value.js's seal (`block-size:100%; aspect-ratio:1`).
    A canvas under the page drawn every frame and announced with
    `announceFieldPaint`, passed as `background-canvas`, so the dock's luminance
    sampler runs live.
- `tests-visual/ro-loop/probe.mjs`: one headless browser per run and a new context per
  cell. It records every window `error` event (with whether `[data-morphing]` was set),
  every console message and pageerror, and every `data-morphing` flip. With
  `--instrument` it wraps `ResizeObserver` and `MutationObserver`, snapshots the
  computed size of every observed target before and after each callback (and each
  MutationObserver callback that runs in the observer delivery's microtask
  checkpoint), and logs any change with the callback's creation site.
  Flow per cell: hover the dock open, move the pointer away, wait 8.5 s through the
  6 s idle fold, and repeat. The `consumer` cell first waits out the fold from mount.
  `--pick` opens the Select in the dock, picks another option and blurs, as value.js's
  `openView` fixture does. `--scroll` scrolls the page every 16 ms through each idle wait.
  `--dpr`, `--width` and `--throttle` (CDP CPU throttling) set the other conditions.

Run (from the worktree, with Vite serving the tree on 5421):
`~/.claude/guard/guarded --timeout 15 -- node tests-visual/ro-loop/probe.mjs --base http://localhost:5421 --label v11.0.2 --width 1440 [--dpr 2] [--pick] [--scroll] [--instrument] [--throttle 6]`

## Readings (Chromium headless shell, Playwright 1.61.1)

Each cell runs 2 folds and 2 unfolds, and `consumer` runs one more fold from mount.
All cells: `roLoopErrors: 0`, no other window error, no pageerror, no console error.

| tree | conditions | scenes | RO loop errors |
| --- | --- | --- | --- |
| v11.0.2 | 1280, dpr 1 | base, controls, consumer (fixed dock at the foot) | 0 |
| v11.0.2 | 1280, dpr 1, consumer in band | consumer | 0 |
| v11.0.2 | 1280, dpr 2, scroll, instrument | all three | 0, no callback size writes |
| v11.0.2 | 1440, dpr 1 and 2, live field, instrument | consumer, base | 0, no callback size writes |
| v11.0.2 | 1440, live field, seal face, instrument | consumer | 0, no callback size writes |
| v11.0.2 | 1440, dpr 2, pick + blur, instrument | controls, consumer | 0, no callback size writes |
| v11.0.2 | 1440, dpr 2, pick, CPU throttle 6x | all three | 0 |
| v11.0.1 | 1440, dpr 1 | all three | 0 |
| v11.0.1 | 1440, dpr 2, pick, instrument | all three | 0, no callback size writes |

v11.0.1 was a `git archive v11.0.1` tree under the worktree's `.cache/` (deleted after).
It shared the worktree's `node_modules`, which resolve `reka-ui` 2.10.x. v11.0.1's own
range was `^2.9`, so a reka difference between the trees would not show here.

Observers on the page (instrumented): the dock has 4. `useDockExpandedSize`'s observer
has 7 targets: the root, its parent, the layers, both panes, and each pane's direct
child. Then the plate cross observer and two `useResizeObserver`s (DockCrossfade,
backdrop luminance). The Select adds reka's one. value.js counted 12 with its own
stubbed, so the other ~7 belong to components outside the dock on its page, which this
harness does not mount.

What the v11.0.2 fold does, read with temporary logs in `dockMorphMeasure.ts`
(reverted, never committed):

- A collapse arm keeps `lastExpandedPx`, and it equalled a fresh `restSize` read on
  every arm (340/340, 646/646, 657/657, 459/459, 470/470).
- The constraint `anchor` notes equalled every capture's constraint through the morph,
  so `hostMoved` never set and the endpoint held.
- One capture ran per morph (from a non-own entry), and the endpoint held.
- `hostStyle` (the root `style`/`class` MutationObserver) ran about 80 times per morph
  (395 over 5 morphs in the consumer scene). The morph's own per-frame root style
  writes, the cross observer's `--dock-plate-cross-px` and the luminance sampler's
  writes all trigger it. Each run forces a style and layout read (`constraintOf`:
  `getComputedStyle` twice and `parent.clientWidth`). It never captured, because the
  constraint never moved, so it raised no loop. It is still a per-frame forced layout
  that 11.0.2's own O-268 count does not include. That is a cost, not this error.

## Candidates in 11.0.2 checked by reading (no RED to bisect)

- `f4557c102` (O-268): the observer skips a delivery of only the morph's own boxes, and
  `restConstraint` moved from the first morph-frame capture to `anchor`. This writes
  less inside the delivery, not more. It could raise a loop only if the constraint read
  at `anchor` differed from the frames' reading, which would set `hostMoved` and
  release the band hold. Then a capture triggered by a non-own entry (the parent, a
  pane child) or by `hostStyle` in the delivery's microtask checkpoint would write a
  new `--dock-expanded-px`. That resizes the root, and the dock-sized parent with it,
  inside the delivery. It did not happen in any cell here.
- `5afae24e9` (O-262): a collapse arm starts from `lastExpandedPx`, not a fresh read.
  This could raise a loop only if the fresh read differed from it by more than the
  2 px band. Then the first morph capture would take the new reading and resize the
  root in the delivery. They were equal in every cell here.
- `e12789fef` (the idle window to 6000 ms), `8124e3e53` (dark hover fill),
  `e7f07b2c9` (seat corner), `0e3cbfb3d`/`a671920c6` (Slider), `ac27d0868`,
  `fd9452769`, `beb176f5f`, `564031139` (edge colour), `46ec8d30f` (seat transitions):
  none of these writes from an observer callback. They change timing, paint or CSS
  transitions only.

## A note on "new with 11.0.2"

value.js's own evidence logs show the same error, raised as `window.error`, on glass
10.1.2. Examples: `docs/tranches/X/close/evidence/browser/release-4.1.0-2026-10-28/runs/chromium-smoke-root.log`
(several, 13:36 to 13:46), `.../runs/rerun-smoke.log`, and the WebKit runs of
2026-10-28. value.js's lockfile then pinned `@mkbabb/glass-ui` 10.1.2 (commit
e38be1ea4). Those runs are on other specs, so they do not settle o21. Still, the error
predates 11.0.2 on that site, and o21 turning red on 11.0.2 may come from timing (the
6 s idle window now lands the fold inside the spec's run) rather than a new writer.
That would match `e12789fef` moving the fold, not adding a write.

## What value.js could send to settle it

A Chromium trace of the failing o21 frame, or the probe's instrumented wrapper
(`init` in `probe.mjs`, pasted into an `addInitScript`) run on the site. It names the
callback that changed an observed box inside the delivery and that box. The harness
cannot mount the site's 7 or so non-dock observers. The likeliest shallow targets are
the pane scrollers and the band row, which are the only boxes whose resize inside a
delivery would leave a notification undelivered at a shallower depth.

## Cure

None applied. Without a RED cell there is no witness to turn GREEN, and no line to
cure at the root. The general rule this seat would apply once a writer is named: no
size or style write that changes an observed box from inside that observer's own
delivery (or its microtask checkpoint), one observer per job, and a next-frame defer
only where the write is needed.

## What did not run

- Bisect, cure commit, dock unit specs and the release-11-0-2 visual spec on a cured
  tree: not run, because there was no reproduction and no cure.
- value.js: read only (`demo/shell/dock/Dock.vue`, `demo/styles/shell.css`,
  `demo/styles/foundation.css`, `e2e/smoke/oracles/o21-gradient-rail.spec.ts`,
  `e2e/smoke/fixtures/dock.ts`). Nothing run there.
- Playwright WebKit build 2287 ran (under `guarded --exclusive webkit`, after lock
  waits of about 9 and 10 minutes). The results are below.

## WebKit 2287: a different loop, and it is not new

Ran on v11.0.2 with base, controls and consumer at 1440 with `--pick --instrument`.
Then a paired run of `controls --pick`, two reps per tag, on v11.0.2 and v11.0.1.
Then `controls` and `base` without the pick on v11.0.2.

- **No error at any fold or unfold** in any WebKit cell, on either tag.
- **An error each time the Select in the `controls` dock opens**, about 50 ms after the
  trigger click, with the dock at rest and open (`morphing: false`). It appeared in 2
  of 2 opens per cell, on **v11.0.2 (3 cells) and v11.0.1 (2 cells) alike**. It arrived
  as a window `error` and as a Playwright `pageerror`, never as `console.error`. It did
  not appear in the `consumer` scene's Select (same Select, no Slider, a `fit-content`
  dock in a band), in Chromium, or without the pick.
- The wrapped observers logged no observed box changing inside a callback or in its
  microtask checkpoint (read again after three microtask turns). So the writer resolves
  later than that, most likely reka's floating-ui `autoUpdate` (a ResizeObserver on the
  reference and the floating element, whose `computePosition` resolves its writes
  asynchronously), or the engine itself.
- It is pre-existing on both tags and on the Select's open, not on the idle fold. It is
  not O-360a. It is worth its own row: a WebKit Select opened from inside a dock raises
  the loop error on 11.0.1 and 11.0.2.

Files: worktree `.cache/out/` (`v1102-webkit.json`, `wk-1102-pick.json`,
`wk-1101-pick.json`, `wk-1102-nopick.json`, Chromium `*.json`), local and not
committed.
