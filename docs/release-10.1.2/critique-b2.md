# 10.1.2 critique b2 (fresh adversarial critic, round 2)

Model: claude-opus-5-5. Branch `release/10.1.2` at `74a679351`, 19 commits over `v10.1.1`,
all read. I did not edit source. Engine runs used two scratch trees (`git archive v10.1.1`
and `git archive release/10.1.2`). Each tree carried the branch's spec and harness, plus my
probe spec `critic-b2.spec.ts` and harness `critic-b2/`. Every run went through `guarded`.
The WebKit runs used `guarded --exclusive webkit` on Playwright WebKit 2287
(`webkit-2287.config.ts`). Chromium ran as `chromium-headless-new` with one worker.

## Verdict

G-4 (b-ii) survives every attack I made, in paint. O-101 now cures every sequence its
witnesses name. Two defects survive my own re-check:

- **D-1 · regression.** The new natural-span measure resets a scrolled run's scroll
  position in WebKit.
- **D-2 · residual.** The reservation is still latched mid-morph for a dock whose run
  scrolls. The cause is the per-posture frame.

## Gates (worktree)

| Gate | Result |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run build` | exit 0. Worktree status unchanged, apart from the untracked critique files |
| `npx vitest run --maxWorkers=2` | 245 files passed. 2364 passed, 10 expected fail, 1 skipped |
| `npm run verify:package` | `terminal: CLEAN`, version 10.1.2. Both root entries of `package-lock.json` read 10.1.2 |
| Branch `dockMorphMeasure`, `g-dock-seat-rule` and `crit-seat-cx` on the v10.1.1 tree | 19 RED. Seat files: 13 RED (12 + 1), which matches the CHANGELOG. Measure: all 6 O-101 arms RED |
| Branch `release-10-1-2.spec.ts` on the v10.1.1 tree, Chromium and WebKit | 32 of 36 RED per engine. The 4 green are the documented regression arms: all-declared, and composites at 2 widths |
| Branch `release-10-1-2.spec.ts` + `release-10-1-1.spec.ts` on the branch tree, Chromium | 61 of 61 green |
| Same on the branch tree, WebKit 2287 | all green (O-102(3), G-3, O-102(6) and Skeleton included) |

## Attacks that did not land

- **The lost tab stops, in paint** (probe P3). Atlas scene. Tab from `before`; Alt+Tab on
  WebKit. On v10.1.1 the walk goes `seat-0, after` in both engines at 390 and 1440, light
  and dark. On the branch it goes `seat-0, filter, gear`, and the gear matches
  `:focus-visible` with a painted ring in all 8 cells. The 390-dark capture shows the ring
  on "G".
- **Arrows, Home/End and toolbar truth.** The branch witnesses pass in both engines.
  `onKeydown` reads only `declaredSeatsOf`, and `onActivate` writes no `tabIndex`.
  `isToolbar` waives only `.dock-separator` and the exact reka form-select shape.
- **Focusability inference.** `isRovedSeat` and `HELD_CONTROL_SELECTOR` are deleted, with no
  alias. `FOCUSABLE_SELECTOR` is read only by `announce()` to name an undeclared child,
  never to decide membership.
- **Seat primitives.** `DockControl`, the three `DockTrigger` arms and
  `DockBackgroundToggle` (via `DockControl`) declare themselves. `DockCrossfade`,
  `DockLayerGroup` and `SegmentedTabs` are composites, and they keep their own stops.
- **O-101 at rest.** I wrote a constant 20-seat pane in an in-flow grid track, collapsed,
  then resized. Branch: `collapsed` 1440->390 and 390->1440 reserve the settled size from
  the first morph frame, with 0 overflowing frames, in both engines. On v10.1.1 the same
  cell is RED: 976 reserved for 390, with 66 (Chromium) and 49 (WebKit) overflowing frames.
- **W7 flip guard.** A `"flip"` capture takes no frame (`settled` requires `"layout"` and no
  `[data-morphing]`). The arm-time `measure()` reads a patched, forced layout.
- **CHANGELOG, MIGRATION and version.** The attribute name, build path and four-point
  contract are present. `package.json` and both lock entries read 10.1.2. See D-2 for the
  one sentence that over-claims.

## Defects

### D-1 · high · regression: a capture resets a scrolled run's scroll position in WebKit

- **Where.** `src/components/dock/composables/dockMorphMeasure.ts`, `naturalSize()`. Every
  capture sets `inline-size: max-content !important` on the full pane, reads
  `offsetWidth`, then restores it. The full pane is `.dock-run`, the lattice's scroll
  container. While it is `max-content` wide, its scroll range is 0. WebKit clamps
  `scrollLeft` during that forced layout and does not restore it.
- **When it fires.** Captures now run on many triggers: every ResizeObserver hit on the
  root, the layers, the panes or any pane child, and every MutationObserver record
  (`childList`, `subtree`, `characterData`) in either pane. So a text change in any seat
  triggers one. So does a seat resize, for example the open seat widening by 3 pitches
  when `aria-current` moves. So does `fonts.ready`.
- **Witness: probe P1.** An always-open dock, 20 seats at 390 (60 at 1440), in a fixed
  host as wide as the viewport. Scroll the run to 312, wait 400 ms, change one seat's text,
  wait 2 frames and 200 ms.

  | Engine | v10.1.1 | Branch |
  |---|---|---|
  | WebKit 2287, 390 | 312 -> 312 | 312 -> **24** |
  | WebKit 2287, 1440 | 312 -> 312 | 312 -> **0** |
  | Chromium | 312 -> 312 | 312 -> 312 (no reset) |

  A seat resize afterwards leaves WebKit on the branch at 24 and 0. v10.1.1 moves to the
  next snap position, 352.
- **Effect.** On Safari, a dock whose run scrolls (the 390 lattice) jumps to its leading
  edge whenever a seat's text or size changes. A route change then glides `reach` from 0
  instead of from where the user was.
- **Cure shape (glass's choice).** Do not change the scroll container's own size to
  measure it. For example, take the natural span from content that is not the scroller
  (the sum of the seats' boxes plus gaps and padding, or `scrollWidth` with the
  scroll-padding accounted for). Or save `scrollLeft`/`scrollTop` and restore them in the
  same task. Add a WebKit engine witness: a scrolled run keeps `scrollLeft` across a text
  change and a seat resize.

### D-2 · medium · the reservation is still latched mid-morph for a dock whose run scrolls

- **Where.** The same file. `expandedFrame = rootSize - fullSize` is taken only from a
  settled capture. When the pane is wider than the host (the run scrolls), the frame is
  negative and encodes the host's width. A host change during a morph moves no observed
  box, because the root's inline size is reserved, and it never re-takes the frame. So
  `frame + natural span` keeps the old host width.
- **Witness: probe P2.** A constant 20-seat pane in an in-flow grid track, the
  value.js-style host. Pane natural span 960. Settled widths: 976 at 1440 and 390 at 390.

  | Sequence | Chromium, branch | WebKit 2287, branch | v10.1.1 |
  |---|---|---|---|
  | mid-expand 1440->390 | 976 reserved for 390. 64 frames with `scrollWidth` 683 > 390 | 49 overflowing frames | same |
  | reversal 1440->390 | 74 overflowing frames | 54 overflowing frames | same |
  | mid-expand 390->1440 | 390 reserved for 976 for 65 frames, then a 586 px snap | 49 frames | same |
  | reversal 390->1440 | 75 frames, snap | 56 frames, snap | same |

  These are the same sequences as the branch's own `mid-expand` and `reversal` cells, with
  a pane that scrolls instead of a breakpoint that swaps seats. The branch's cells pass only
  because their panes fit the host at both widths.
- **Status.** This is not a regression: v10.1.1 fails identically. But O-101a asks that the
  endpoint is never latched, and the gate is "no frame exceeds the viewport". A run that
  scrolls at 390 is the lattice's mobile norm.
- **Records truth.** CHANGELOG says the endpoint "follows the pane in either posture and
  retargets the reserved box during a morph". MIGRATION says "Nothing changes for a dock
  whose pane is stable" and invites consumers to delete overflow workarounds. For a stable
  pane in a host that resizes mid-morph, the overflow and the snap remain.
- **Cure shape (glass's choice).** Mid-morph, read the target posture's real box, not a
  latched frame. For example, measure the root with its reservation lifted inside the same
  task, and observe what constrains it (the root's parent) so a host change re-captures.
  Add `mid-expand` and `reversal` cells with an overflowing pane at 1440->390 and
  390->1440.

## Notes, not defects

- Cost: every text mutation in a pane now runs `observe()` (disconnect and re-observe
  every pane child, which queues fresh ResizeObserver notifications) and a capture with
  two forced layouts. A dock carrying a live number (a timer, a meter) pays this every
  tick. I did not measure frame cost.
- The demo docks (`demo/shell/BottomDock.vue` and others) were not audited for undeclared
  plain-element seats. "No other change" keeps the demo out of 10.1.2.
- Scratch artefacts only, not committed:
  `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/out/`
  (P1, P2 and P3 JSON for {old,new} x {chromium,webkit}, and the P3 captures).
