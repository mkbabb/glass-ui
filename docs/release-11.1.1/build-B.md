# 11.1.1 build seat B: scope rows 5 to 11

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`, on
seat A's tip 12db2d6b7. Orchestrator notes read and followed: `orchestrator-note-row-11.md`
(row 11 is this seat's), `orchestrator-note-dialog-exit-clock.md` (binding, since row 9 was not
done when it landed), `orchestrator-note-row-12.md` (row 12 is left to the first fix seat; see
"Not done here").

## Setup

- Servers, each `guarded --timeout 90`: 5351 the branch, 5352 seat A's v11.1.0 tree
  (`.cache/red-v11.1.0/tree`). Logs `logs/serve-535{1,2}-B.log`.
- Runners: `scripts/build-B-run.sh <branch|red> <project> <log> [grep]` (seat A's runner, its
  own `logs/runs-B.out`), `scripts/build-B-cells.sh <label> <grep> [projects]` (one grep, every
  project, both trees). A red run copies the 11.1.1 spec, config, harness and film helper into
  the v11.1.0 tree. WebKit projects run under `guarded --exclusive webkit`.
- **The guard refused nothing.** No WebKit lock wait passed a minute.
- The harness gained: a second Tooltip in the same provider, a Toast trigger (with the
  `Toaster`), a press counter, a Collapsible, an Accordion, an ExpandableContainer with an
  outside toggle for its open state, and a `leave-finished` emit counter on every content it
  mounts. `film.ts` gained a second mark (`markTurn`) and exposes its clock origin (`t0`).

## Rows

| row | commit | disposition |
|---|---|---|
| 5 reversal | 001a726e8 (+ 00e0c144a, the type guard) | landed |
| 6 tooltips tween and hand over | dae6d8b3f | landed |
| 7 CommandDialog keeps its list | 22e65f1ba (seat A, row 4) | already landed; witnessed again by the standing cell |
| 8 reduced motion is a fade | none | **moved** (below) |
| 9 ExpandableContainer | 500df67da | landed |
| Dialog exit clock (ruling) | fd338d8cf | landed; CHANGELOG clause in row 3's entry |
| 10 hover-shift | none | not built: `audit/hover-shift/TABLE.md` does not exist (the directory holds crops, rows, tools and a tree only) |
| 11 leave-finished | aa0cf3170 | landed |
| standing cell + release.sh + README | 936ea8128 (README in aa0cf3170) | landed |
| gates after the rows | e2956bbfc, 7bd3e7419 | `LEAVE_FINISHED` made module-private (the export-reach gate); the boot graph's request count 67 → 68 for the leave-finished chunk (5.4 KB), the byte ceiling unchanged |

Cells are chromium-phone, chromium-desktop, webkit-phone, webkit-desktop (WebKit is build 2287).
"R/G n" means n cells RED on v11.1.0 and GREEN on the branch; `-` is a skip stated in the spec.

### Row 5 (001a726e8): a surface turned back mid-way turns from where it is

- **Root.**
  - The reveal's exit was a keyframe from fixed stops, its entrance a transition, so a close
    mid-entrance started the exit at full opacity and a reopen mid-exit dropped the keyframe and
    jumped to open. `glass/reveal.css`: the closed state is now transitions on every channel
    (scale, translate, opacity, filter, clip-path) on the exit clock and curve, plus
    `glass-reveal-hold` (`animations.css`), a keyframe that paints nothing, on the same clock:
    reka's `usePresence` unmounts on `animationend` and has no `transitionend` path, so the hold
    is what keeps the node through the transitions. A reopen removes the hold; the engine retargets
    the running transitions. `glass-reveal-out` is still defined.
  - The menu's grow and recede were two keyframes (LT-8). They are now one clip-path transition
    each way (`--menu-clip-open`, `--menu-clip-strip`, the strip mirrored for `data-side="top"`),
    the grow still on `--spring-bloom`. The menu's other channels move only when it turns back, so
    on the way in they retrace the exit's clock and curve (the phone Select's sheet first read a
    0.24 frame share on its reopen with the entrance's ease-out).
  - Toast: its closed neutraliser (`opacity: 1`) is now reached by the same opacity transition, so
    a toast dismissed mid-entrance no longer flashes to full opacity before it vaporizes.
  - Accordion and Collapsible (`_shared/disclosure/turn.ts`): reka's content re-measures with the
    animation off after every flip, which restarts the keyframe; a pre-flush watcher reads the
    height the region stands at and, after reka's measurement in the same task, seeks the new
    keyframe to the moment it passes that height (a binary search on `currentTime`).
  - Dialog, Sheet, Select (`_shared/overlay/exit-press.ts`): through the exit reka's dismissable
    layer kept `pointer-events: none` on `body` and the scrim kept `pointer-events: auto`, and an
    outside press dismissed again (a touch reopen's own click closed it). Now the layer blocks the
    page only while open (`disableOutsidePointerEvents`), the scrim takes presses only while open,
    and a press that began after the close is not a dismissal.
- **Witness** (`reverse` cells): close mid-entrance and reopen mid-exit for Select, DropdownMenu,
  Popover, Collapsible and Accordion, close mid-entrance for the Toast; after the turn no frame
  moves what is seen by more than a fifth and the surface ends where the second input sent it;
  a press on a leaving Dialog's, Sheet's and Select's trigger reopens it; a press on the page
  during a bottom sheet's exit reaches the page.
  - v11.1.0: 14 of 15 RED in every cell (`logs/r5-red-*`); the DropdownMenu reopen-mid-exit
    already passed there. Branch: 15 of 15 GREEN in every cell (`logs/r5-green-webkit-*`,
    `logs/r5-green-chromium-desktop`, `logs/r5b-green-chromium-phone` after the menu-curve change).
- Seat A's cells re-read GREEN after the row (`logs/r5-all-chromium-{phone,desktop}`).

### Row 6 (dae6d8b3f): tooltips

- **Root.** The open values and their `@starting-style` were keyed on `[data-state="open"]`; reka's
  tooltip is `delayed-open` or `instant-open`. They are keyed on `[data-state$="open"]` (base and the
  four side rules). A new register knob `--reveal-fade` (default `--ease-out`) is the entrance fade's
  curve; the tooltip register sets it to `--exit-curve`, so the 200 ms hint carries at most about a
  tenth of its light in a frame (ease-out put a third in the first frame) and a reversed hint
  retraces at the same pace (the reopen read 0.205 on ease-out).
- **Witness** (`tooltip` cells and the Tooltip `reverse` cells, desktop only; a Tooltip does not open
  on touch): enters with more than two frames between gone and whole and no frame over a fifth; a
  hand-off to the neighbour fades the incoming and the outgoing hint; turns both ways.
  v11.1.0: 6 of 6 RED at 1440 in both engines; branch 6 of 6 GREEN (`logs/r6-*`). The hand-off
  drives the pointer in eight steps: reka ignores a trigger reached in one jump while the pointer
  is "in transit" toward the first hint.

### Row 7: already landed

Seat A's row 4 (22e65f1ba) force-mounts the list (`CommandList`) and its `routes · CommandDialog`
cells hold the list and the plate's height through every exit route. The standing cell reads it
again by pick, outside and Escape, GREEN in every cell.

### Row 9 (500df67da): ExpandableContainer

- **Root.** `ExpandableContainer.vue` flipped the Teleport and `data-state` from `open` in one render
  and `styles.css` animated only the birth. Now `placed` (where the subtree is) is separate from
  `open` (the intent): closing keeps it placed and marked `data-leaving` while the panel (scale
  0.78, fade) and the dim (`background-color`, which now also fades in) leave on transitions on
  `--spring-dock-exit-duration` and `--exit-curve`; a post-flush watcher sends the subtree home when
  those transitions on the root and the panel have finished (at once when none runs, as in
  happy-dom). Both legs are transitions, so reversals turn. Escape registers the moment `open` turns
  true. A leaving overlay takes no press, so the outside toggle reaches its button. Reduced motion
  keeps a 0.12 s opacity fade both ways. The two old keyframes are still defined.
- **Witness** (`expand` cells): the overlay channel is the panel's opacity times its share of the
  viewport while the root is the fullscreen overlay, over its open value. Leaves by its Exit button,
  by Escape and by its open state; turns closed mid-entrance and reopened mid-exit; Escape dispatched
  in the first frame after the press closes it.
  v11.1.0: 5 of 7 RED in Chromium, 4 of 7 in WebKit (the entrance and the first-frame Escape already
  passed there; WebKit's closed-mid-entrance passed too). Branch: 7 of 7 GREEN in every cell
  (`logs/r9-*`).
- Not in this row (the scope row names only these four): the origin holding its box while the
  subtree is away (O-351 c), the dead `surface` prop (d), an inert page behind (f).

### The Dialog's exit clock (fd338d8cf), per the orchestrator's ruling

`useSpringMount` stretches the `present` row's mount exit by 1.5 (`MOUNT_EXIT_STRETCH`, private),
so a Dialog leaves in about 180 ms; the generator's floor and the Sheet's 250 ms are unchanged.
Readings, `exit · Dialog` in WebKit 2287, five consecutive runs each (`logs/dialog-clock-*`):

| form | per-frame share | exit ms | entrance ms |
|---|---|---|---|
| 390 touch | 0.104 ×5 | 207 to 220 | 291 to 302 |
| 1440 | 0.102 to 0.107 | 204 to 228 | 283 to 297 |

CHANGELOG: row 3's clause now says "a dialog in about 180 ms".

### Row 11 (aa0cf3170): leave-finished

- **What existed.** glass fired no `closed` event (no emit of that name anywhere in `src/`); color's
  reliance is on unmount timing, and fourier's `LeaveSignal` reads `onBeforeUnmount`. reka's
  `Presence` dispatches a non-bubbling `after-leave` on the node it is about to unmount, after the
  exit's animation ends, and nothing on a reopen.
- **Shape.** `_shared/overlay/leave-finished.ts`: the name `leave-finished`, the same for the Vue emit
  (`@leave-finished`) and the DOM `CustomEvent` (bubbles, composed, `detail.kind`). Each content
  stamps a `data-leave-key`; a sync watcher notes the content element at the close (and forgets it on
  a reopen); a document capture listener for reka's `after-leave` on that node (or the popper wrapper
  round it) fires the event while the node is still in the document; an unmount mid-exit fires it at
  the unmount. Wired into Dialog, Sheet, Popover (kind `hover-card` on its hover arm), DropdownMenu
  (ContextMenu shares it, kind `menu`), Select, Tooltip and Toast. Dialog and Sheet strip the
  forwarded `onLeaveFinished` listener off reka's content, where it answered the DOM event a second
  time. Toast's `open` and `defaultOpen` defaults are unset rather than cast to `false`, so it can tell
  a held prop from none; what reaches reka is unchanged.
- **Witness** (`leave` cells): one event with its kind, bubbling and composed, at or after the last
  frame in which the surface is still seen, and the Vue emit once; a close reversed at 40 ms says
  nothing. v11.1.0: every "says once" cell RED (no event); branch: 13 of 13 GREEN at 1440, 11 of 11
  at 390 (Tooltip skipped on touch) in both engines (`logs/r11-*`).
- Not witnessed in the harness: ContextMenu and the hover card (same code paths as DropdownMenu and
  Popover).
- README: "Closing a surface" (close by the open state and let the exit finish; `v-if` in the same
  tick cuts it) and the `leave-finished` paragraph with an example.

### The standing cell (936ea8128)

`standing · <surface> by <route>`: Select (pick, outside, Escape, trigger), DropdownMenu (same),
Popover (outside, Escape, trigger), Tooltip (Escape, pointer away), Dialog and the right and bottom
Sheets (close, outside, Escape), the detented Sheet (outside, Escape), Toast (close; its ink is
filmed, since its root stays at full opacity while it vaporizes), Collapsible and Accordion
(trigger, by height), ExpandableContainer (close, Escape), CommandDialog on `/containers/command`
(pick, outside, Escape). Each: gone, painted more than two frames, no frame over a fifth of what is
seen, nor of its travel at 16 px or more. Branch: 30 of 30, 32 of 32, 19 of 19 and 32 of 32 GREEN
(`logs/st-green-*`); WebKit at 390 skips the outside routes and the trigger routes that close
through the outside-press listener (seat A's "WK outside: harness"). `tests-visual/package.json`
gains `gate:exits` and `scripts/release.sh` runs it after the pixel floor.

## Row 8, moved

Not attempted at the root in this seat; it is moved whole. What the reading found, for the seat
that takes it:

- The blanket rule (`utilities/a11y-overrides.css`, `*` with `!important` in `@layer components`)
  is what a consumer cannot relax. Making it relaxable without letting every glass component's
  own motion through needs it as a normal, zero-specificity declaration in a layer after
  `components` (so it beats glass's normal declarations and loses to a consumer's unlayered or
  utility rule), with every glass fade that must survive restated as a layered `!important`
  carve, the Toast's (`glass/dissolve.css`) being the one that exists.
- The carves this needs: the reveal (its carve fades on `--duration-fast`, 200 ms, above the
  150 ms ruling, and its exit on the register's exit clock, 120 to 250 ms), the disclosure
  (0.01 ms today), ExpandableContainer (0.12 s, already within), and the Dialog and Sheet, whose
  exit is script-driven: `useSpringMount`'s `runExit` returns false under reduced motion and the
  spring snaps, so their fade is a script change, not a stylesheet one.
- The dock's fold under reduce (O-364) is the JS morph (`dock/composables/useDockMorph.ts`, the
  `--dock-t` pin in `dock/styles/dock.css`): a cross-fade there is its own piece of work, with
  Gregg's `reduceFold` as the reference.

## Closing readings

- The whole spec on the committed tip (`logs/tip-B-green-*`): Chromium 89 of 89 at 390 (11
  skips) and 93 of 93 at 1440 (7 skips). WebKit: every cell green up to the 90th, where the
  branch server's 90-minute guard timeout ended it (`serve-5351-B.log`: "KILLED: timeout after
  90 min"; `page.goto` timed out in both WebKit forms). With the server restarted, the
  `standing` and `leave` cells re-read GREEN in both WebKit forms (`logs/tip-B2-*`: 30 at 390,
  45 at 1440), so every cell after the 89th has a green reading on the tip.
- Typecheck: exit 0 (`logs/typecheck-B.log`). Vitest, after `demo:dist:build`: 285 files,
  2600 passed, 10 expected fail, 1 skipped (`logs/vitest-B.log`). The first full run (before
  e2956bbfc and 7bd3e7419) failed the export-reach gate and the boot graph (stale build, then
  one request over the count); both are cured above.

## Not done here

- Row 12 (the SegmentedTabs corners on touch, added after this seat started): left to the first
  fix seat, as its note says.
- The 11.0.x and 11.1.0 release specs were not re-run by this seat.
- No frame-cost claim is made, so no GPU-lane renderer string is recorded.
- No tag, no push, no publish.
