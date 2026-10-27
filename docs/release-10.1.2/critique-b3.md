# 10.1.2 critique b3 (fresh adversarial critic, round 3)

Model: claude-opus-5-5. Branch `release/10.1.2` at `53c68dab7`, 23 commits over `v10.1.1`,
all read. I did not edit source. Engine runs used two scratch trees (`git archive v10.1.1`
and `git archive release/10.1.2`). Each tree carried the branch's spec and harness, plus my
probe spec `critic-b3.spec.ts` and harness `critic-b3/`. Every run went through `guarded`.
WebKit runs used `guarded --exclusive webkit` on Playwright WebKit 2287
(`tests-visual/webkit-2287.config.ts`). Chromium ran as `chromium-headless-new`. Both
engines ran with one worker.

## Verdict

The round-2 cures hold. b2 D-1 (WebKit scroll reset) and b2 D-2 (a latched mid-morph
reservation) no longer reproduce. O-101 and O-101a are clean in every sequence I drove,
including two that the branch's own spec does not drive. G-4 (b-ii) holds in paint for
every atlas shape.

One defect survives my re-check:

- **D-1 · high · regression.** A disabled `DockTrigger` is a declared seat that cannot take
  focus. When it holds the stop, the run's declared seats leave the Tab order. When it sits
  mid-run, it blocks arrow roving.

## Gates (worktree)

| Gate | Result |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run build` | exit 0. Worktree status unchanged, apart from the untracked critique files |
| `npx vitest run --maxWorkers=2` | 244 of 245 files passed. The one failure is environmental: `tests/gates/boot-graph.test.ts` reported "dist-demo/index.html is STALE", because the local `dist-demo` predated the round-2 commits. After `npm run demo:dist:build` the file is 14 of 14 green. Totals: 2367 passed, 10 expected fail, 1 skipped |
| `npm run verify:package` | `terminal: CLEAN`, version 10.1.2. `package.json` and both root entries of `package-lock.json` read 10.1.2 |
| Branch `release-10-1-2.spec.ts` + `release-10-1-1.spec.ts`, branch tree, Chromium | 69 of 69 green |
| Same, branch tree, WebKit 2287 | 69 of 69 green, which matches the CHANGELOG's "69 of 69 per engine" |
| Branch `release-10-1-2.spec.ts`, v10.1.1 tree, Chromium | 38 RED, 6 green. The 6 green are the documented regression arms: all-declared and composites at 2 widths, and the 2 scroll cells (the CHANGELOG says these are GREEN on 10.1.1) |

## Attacks that did not land

- **The lost tab stops, in paint** (probe P3). Atlas scene, 390 and 1440, light and dark,
  both engines (Alt+Tab on WebKit).
  - v10.1.1: the walk is `seat-0, after`, and the run claims `role="toolbar"`.
  - Branch: the walk is `seat-0, filter, gear, handle, year-from, year-to, dark, after`. Each
    stop matches `:focus-visible` with a painted ring, and the run has no role. The WebKit
    390-dark capture shows the ring on "G".
- **b2 D-1, scroll reset** (P1, branch `scroll` scene). Scroll to 312, then 1 text change
  and 5 more text ticks: 312 -> 312 -> 312 at 390 and 1440, both engines.
- **b2 D-2 and O-101a, host change during or before a morph** (P2, branch `overflow` scene,
  20 seats with a 960 px natural span). The sequences are `mid-expand`, `reversal`,
  `collapsed`, plus two of mine: `mid-collapse` (host changes 60 ms into a collapse) and
  `expanded-then-collapse` (host changes while expanded, then collapse). Each ran at
  1440->390 and 390->1440.
  - Branch, both engines: every morphing frame after the change reserves the expanded rest
    size at the new width (+-1 px), and 0 frames have `scrollWidth > clientWidth`.
  - v10.1.1, Chromium: the same cells are RED. `mid-expand` 1440->390 reserves 976 for 390
    with 64 overflowing frames (`scrollWidth` 683). `mid-collapse` 1440->390 keeps 976 for
    64 frames.
- **W7 flip guard.** The posture comes from the DOM's `.is-active`, never from the posture
  ref. A capture under `[data-morphing]` takes no chrome. The arm-time `measure()` runs
  post-flush.
- **Focusability inference.** `isRovedSeat` and `HELD_CONTROL_SELECTOR` are deleted, with no
  alias. `FOCUSABLE_SELECTOR` is read only by `announce()`, to name an undeclared child.
- **Toolbar truth.** The claim waives only `.dock-separator` and the exact reka form-select
  shape. It needs at least one child. The branch witnesses for the splitter, the hidden
  wrapper, form-select and a reactive child are green in both engines.
- **Masking and shims.** There is no clip, no overflow hiding and no consumer override. The
  reservation is lifted by an invalid custom property inside one task. Scope: only the dock,
  its tests, the 10.1.2 spec and harness, one `testMatch` line, the records and the version.

## Defects

### D-1 · high · regression: a disabled DockTrigger is a declared seat that cannot take focus

- **Where.**
  - `src/components/dock/DockTrigger.vue` stamps `data-glass-dock-seat` on every arm and
    passes `disabled` through `$attrs` to reka. `SelectTrigger`, `DropdownMenuTrigger` and a
    `<Select disabled>` root all render the native `disabled` attribute.
  - `useDockRun.ts` `syncRoving()` then writes the stop onto whatever declared seat comes
    first (or is current), and `onKeydown` moves to the adjacent declared seat
    unconditionally.
  - Contrast `DockControl.vue`, which stamps `aria-disabled` ALONE "never the native
    `disabled` attr, which would drop a boundary nav control from the tab order".
- **Probe Q1** (`disabled-first`). A fixed dock holds `[Select disabled > DockTrigger
  for=select, DockControl, DockControl]`. Tab from a button before the dock.

  | Engine, width | v10.1.1 | Branch |
  |---|---|---|
  | Chromium 390 / 1440 | `seat-1, after` | `after, BODY`: the dock is skipped. `seat-0` is `disabled` with `tabindex="0"`, and both live seats are `-1` |
  | WebKit 2287 390 / 1440 | `seat-1, after` | `after, BODY` |

  The control arm (`DockControl disabled` first, which uses `aria-disabled`) is
  `seat-0, after` on both trees and both engines.
- **Probe Q2** (`disabled-mid`). The dock holds `[DockControl, DropdownMenu > DockTrigger
  for=dropdown disabled, DockControl]`. Tab into the dock, then press ArrowRight twice.
  - v10.1.1: `seat-0 -> seat-2`.
  - Branch, both engines, both widths: `seat-0 -> seat-0 -> seat-0`. `moveTo` focuses a
    disabled button, which fails, so the arrows cannot pass the disabled seat. Only End
    reaches past it.
- **Effect.** This is the case 10.1.2 exists to protect. A dock with a filter or menu
  trigger that is disabled while loading or empty either loses every declared seat from Tab
  (no keyboard path into the dock at all) or splits its run in two for arrow keys. 10.1.1
  excluded a native-disabled button from the roved set, through the selector the ruling
  retires. 10.1.2 drops that exclusion and puts nothing in its place.
- **No witness covers it.** `g-dock-seat-rule.test.ts`, `crit-seat-cx.test.ts` and
  `release-10-1-2.spec.ts` never seat a disabled `DockTrigger`.
- **Records.** CHANGELOG contract point 1 says a seat "has no other test", and point 2
  roves "between declared seats only". Neither tells a consumer that a declared seat must
  stay focusable. So `<button disabled data-glass-dock-seat>` reproduces Q1 for a custom
  seat too.
- **Cure shape (glass's choice).** Keep membership declared and make the primitive honour
  its declaration. `DockTrigger` maps `disabled` to `aria-disabled` and blocks activation
  itself, as `DockControl` does, so a declared seat is always focusable. Add to the contract
  (CHANGELOG point 1 and MIGRATION) that a declared seat must remain focusable, so a
  disabled seat uses `aria-disabled`, never `disabled`. Add RED-on-branch, GREEN-after
  witnesses for Q1 and Q2 in both engines.

## Notes, not defects

- Cost. Each text mutation in a pane runs `observe()` and a capture, with up to four forced
  layouts while collapsed. A dock carrying a ticking value pays this every tick. I did not
  measure frame cost.
- The demo docks were not audited for undeclared plain-element seats. "No other change"
  keeps the demo out of 10.1.2.
- Scratch artefacts, not committed, are under
  `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/b3/`.
  The `out/` folder holds the Q1, Q2, P1, P2 and P3 JSON for {old,new} x {chromium,webkit}
  and the P3 captures. The probe is in `probe/`, and the run logs are `*.log`.
