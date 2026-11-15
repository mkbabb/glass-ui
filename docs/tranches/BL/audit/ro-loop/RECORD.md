# O-360a — the ResizeObserver loop on the idle fold: diagnostic record

Seat: diagnostic, claude-opus-5-5, 2026-11-15. Worktree `.claude/worktrees/bl/ro-loop`,
branch `bl/ro-loop` from `v11.0.2`. Nothing shipped.

## Amendment, round 2: reproduced, attributed and cured

value.js ran the probe's wrapper in its o21 spec
(`~/.dev-logs/owner-1112/LAST-TEN/color/ro-loop/`). The writer was glass's
`useDockExpandedSize` observer. A morph had just started, and the delivery held the
root's parent (value.js's dock host div) and the layers' children. Those are outside
the callback's `own` list, so `capture()` ran inside the callback and wrote
`--dock-expanded-px`. That grew `.glass-dock`, the host div and the plate from 389 to
461 px after they were delivered. The trigger is a viewport resize across the
breakpoint while a morph runs: o21 sets 390x844 and about 230 ms later 1440x900.

### Reproduction (glass alone)

- `ro-harness.html?scene=consumer&responsive=1` follows value.js's desktop predicate.
  At 1024 px and up the dock is `collapse: "open"` and carries one more worded seat.
  Below that it is pinned open (`collapse: false`) without that seat, so each crossing
  changes the posture and the expanded box in one render.
- The witness is `tests-visual/ro-loop.spec.ts`. Each cell fails on any window
  `error`, `pageerror` or `console.error`. The four cells:
  - out-and-back: 1440, then 390x844, then about 230 ms later 1440x900
  - back-and-out: the reverse
  - unfold: the same pair while a hover unfold runs
  - fold: the same pair while the idle fold runs
- Run it with Vite serving the tree on 5421:
  `GLASS_UI_DEMO_PORT=5421 guarded -- npx playwright test -c tests-visual/playwright.config.ts ro-loop.spec.ts --project=chromium-headless-new --workers=1`.

### Readings (Chromium headless shell, `--repeat-each=2`)

| tree | out-and-back | back-and-out | unfold | fold | total |
| --- | --- | --- | --- | --- | --- |
| v11.0.2 | RED 2/2 | RED 2/2 | RED 2/2 | RED 2/2 | 8 failed: "window error: ResizeObserver loop completed with undelivered notifications." |
| v11.0.1 (`git archive` tree in `.cache/v1101`) | green | green | green | green | 8 passed |
| cure, fca26fdbb | green | green | green | green | 8 passed (and 8 more in `coarse-touch`) |

**v11.0.1 does not raise it.**

### Guilty commit and line

I bisected by disabling each 11.0.2 change to `dockMorphMeasure.ts` on the v11.0.2
tree, one at a time:
- With the collapse arm's `keepExpanded` off, all 4 cells were green.
- With the `own` skip off, all 4 were still red.

**The guilty commit is `5afae24e9`** (O-262, "a collapse starts from the open box it
leaves"), not `f4557c102`. The lines in `src/components/dock/composables/dockMorphMeasure.ts`
on v11.0.2:

```ts
249        const keepExpanded = arming && !expanded && lastPostureExpanded && lastExpandedPx !== null;
...
254                  ? lastExpandedPx!
```

After the crossing, the collapse arm reserved the expanded box from before the resize
(389 px, without the wide seat). The first capture of the morph read the real box
(461 px). The host had moved, so the band hold let the reading through, and the capture
wrote it from inside the observer delivery (v11.0.2 line 459, `capture();` in the
`ResizeObserver` callback). On v11.0.1 the arm read the box fresh, so the in-delivery
capture wrote an unchanged value. The write inside the delivery was the latent defect,
and `keepExpanded` made the reading move.

### The cure (worktree commit fca26fdbb, one commit)

A ResizeObserver delivery through a morph never writes a size:

- **ResizeObserver callback.** At rest it captures as before. Through a morph, a
  delivery of only the morph's own boxes still captures nothing (`f4557c102`). Any
  other delivery owes a capture, which runs once at the next animation frame, before
  that frame's layout.
- **Host style watcher.** When the constraint has moved, it now owes the capture
  instead of running it. Its record can land in the delivery's microtask checkpoint,
  since the plate cross observer writes the root's style.
- **Pane mutation observer.** Through a morph it now captures on the pane's mutation
  record, before the layout of the frame the patch lands in. So the reservation still
  follows a pane patched mid-morph in that same frame (O-101), and no delivery has to
  write it.
- **Layout cost.** No layout is forced per frame beyond 11.0.2's own. The owed capture
  runs only when a delivery owes one, and the mutation capture only on a content
  change mid-morph.
- **The kept box stays.** `keepExpanded` (`5afae24e9`) is unchanged, so the rail cells
  it made green stay green. A stale kept box is now corrected at the next frame (or at
  the patch), outside any delivery.

```diff
+    /* The capture a morph's observer delivery owes, taken at the next animation frame. */
+    let owedFrame = 0;
+
+    function owe(): void {
+        if (owedFrame) return;
+        if (typeof requestAnimationFrame === "undefined") {
+            capture();
+            return;
+        }
+        owedFrame = requestAnimationFrame(() => {
+            owedFrame = 0;
+            if (!disposed) capture();
+        });
+    }
@@ the ResizeObserver callback
-                const own = [rootEl.value, contentEl.value, expandedEl.value, collapsedEl.value];
-                if (
-                    rootEl.value?.hasAttribute("data-morphing") &&
-                    entries.every((entry) => own.includes(entry.target as HTMLElement))
-                ) {
+                if (!rootEl.value?.hasAttribute("data-morphing")) {
+                    capture();
                     return;
                 }
-                capture();
+                const own = [rootEl.value, contentEl.value, expandedEl.value, collapsedEl.value];
+                if (entries.every((entry) => own.includes(entry.target as HTMLElement))) return;
+                owe();
@@ the pane mutation observer
-                if (!observer) capture();
+                if (!observer || rootEl.value?.hasAttribute("data-morphing")) capture();
@@ the host style watcher
-                if (constraintOf(root, axis.value) !== restConstraint) capture();
+                if (constraintOf(root, axis.value) !== restConstraint) owe();
@@ dispose
+        if (owedFrame) cancelAnimationFrame(owedFrame);
```

The same commit also carries a block comment, "THROUGH A MORPH NO CAPTURE RUNS INSIDE
AN OBSERVER DELIVERY", the witness spec, `tests-visual/ro-loop.config.ts` (the WebKit
2287 project for it) and the harness's `responsive=1` mode.

The first attempt deferred the mutation path too, and paid for it. The
`release-10-1-2` O-101 `mid-expand` and `reversal` cells went red (11 of 32: one
morphing frame reserved the old pane's box, for example 390 for 160). Capturing on the
mutation record fixed them.

### Regression on the cured tree

- **Dock unit specs** (`tests/components/custom/dock`, `tests/components/dock`,
  `tests/components/ui/slider/dock-hold-contract.test.ts`, vitest `--maxWorkers=2`):
  27 files. 223 passed, 1 expected fail and 1 skipped, all marked as such in the
  specs. No test was changed.
- **Visual specs** (`release-11-0-2`, `release-10-1-2` and `ro-loop` in
  `chromium-headless-new` and `coarse-touch`, `--workers=1`): 202 passed, 17 skipped
  and 1 failed.
  - The failure was `O-101 · horizontal · collapsed (1440->390)` in
    `chromium-headless-new`. It is a harness TypeError
    (`page.waitForFunction: Cannot read properties of undefined (reading 'some')`, the
    spec's `__frames` read), not a reservation assertion. The same cell passed 10 of 10
    on a repeat (`--repeat-each=5`, both directions), and passed in the run before
    this one.
  - Every other O-101 and O-101a cell was green in both projects.
  - Green in both projects: the 11.0.2 `fold · an idle fold lays out once per morph
    frame` (`f4557c102`'s cell), and both `rail ·` cells (`5afae24e9`'s).

### WebKit 2287

This ran under `guarded --exclusive webkit`, with a lock wait of about 7 minutes and the
run itself from 10:13:41 to 10:15:11 EST. It used
`tests-visual/ro-loop.config.ts`, project `webkit`, with `RO_LOOP_WEBKIT=1`, one pass
per tree.

- v11.0.2 (uncured `git archive` tree): **RED 4/4**. Every cell raised the window
  error "ResizeObserver loop completed with undelivered notifications."
- v11.0.1: 4/4 green.
- cure fca26fdbb: **GREEN 4/4**.

Round 1's WebKit-only loop when a Select opens in the dock is separate. It is
unchanged by this cure and still present on both tags.

### What did not run (round 2)

- value.js: nothing run there. Its probe output was read only.
- Firefox: not part of this seat.
- Nothing published or merged. The cure lives on `bl/ro-loop` only.

## Verdict (round 1, superseded by the amendment above)

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
