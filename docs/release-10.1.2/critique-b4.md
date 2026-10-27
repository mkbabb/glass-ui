# 10.1.2 critique b4 (fresh adversarial critic, round 4)

Model: claude-opus-5-5. Branch `release/10.1.2` at `abd829944`: 26 commits over `v10.1.1`,
all read. The worktree was not edited. Probes ran from scratch copies of `v10.1.1` and
`release/10.1.2` (`git archive`), with the branch's witnesses overlaid on the 10.1.1 copy.
Every run went through `guarded`, and every WebKit run through `guarded --exclusive webkit`.
Ports were 5291 to 5293, so no run reused another seat's server.

## What was run

| Check | Result |
|---|---|
| `npm run typecheck` | clean |
| `npm run build` | clean |
| `npx vitest run --maxWorkers=2` (full suite) | 245 files, 2375 passed, 10 expected-fail, 1 skipped |
| `npm run verify:package` | `terminal: CLEAN`, 10.1.2 |
| `release-10-1-2.spec.ts` on the branch, Chromium, light and dark | 48 of 48, both schemes |
| the same, Playwright WebKit 2287, light and dark | 48 of 48, both schemes |
| `release-10-1-1.spec.ts` on the branch, Chromium light and WebKit dark | 25 of 25, both (73 of 73 with the spec above, as the CHANGELOG says) |
| `release-10-1-2.spec.ts` on the 10.1.1 tree, Chromium and WebKit | 42 RED, 6 GREEN in both engines |
| the branch's three unit files on 10.1.1 source | seat-rule + crit: 13 of 19 RED, plus 5 of 7 disabled-trigger arms; measure: 13 of 13 RED |

The 6 that pass on 10.1.1 are the ones the CHANGELOG names as regression arms: the
all-declared toolbar and the seated RadioGroup/ToggleGroup (both widths), and the two
scroll-keeping cells. No other witness passes on 10.1.1.

**The lost tab stops (G-4).** I reproduced them on 10.1.1 and saw them cured on the
branch, at 390 and 1440, in both engines. In the `atlas` scene on 10.1.1, the filter
trigger, gear, handle, year inputs and dark toggle are written to `-1`, and the Tab walk
skips them. On the branch the walk is `seat-0, filter, gear, handle, year-from, year-to,
dark, after`. Arrows rove only `seat-0 <-> seat-9`. An undeclared control keeps its own
ArrowRight. `role=toolbar` is set only on an all-declared run.

**O-101 per frame.** On 10.1.1 in Chromium, 1440->390 reserves 592 px for a 160 px dock,
and document `scrollWidth` reaches 491 for `clientWidth` 390 over 90 to 124 sampled frames.
390->1440 reserves 160 px for 592. The vertical dock reserves 584 px for 152. O-101a
reserves 976 px for 390, with `scrollWidth` 683. WebKit 2287 fails the same cells. On the
branch, every frame is within 1 px of the settled size and no frame overflows, in both
engines and both schemes.

**My own probe** (`b4probe`: a run of `DockControl`, a select, dropdown and popover
`DockTrigger`, and a Tooltip-wrapped `DockControl`). It ran on both trees at 390 and 1440
in both engines. Every row below matched 10.1.1, except the intended disabled-trigger
change:

- Each enabled trigger opens by Enter and by click. A select item can be chosen by
  keyboard, and focus returns to the trigger after the select, the menu and the popover
  close.
- `v-specular` still tracks the pointer on the `SeatHost` button. The accessible names
  are announced in the run status. Home and End go to the ends of the run, and the arrows
  stop without wrapping.
- On collapse, focus moves to the summary on both trees.
- Disabled triggers stay focusable and do not open on Enter, Space, ArrowDown, ArrowUp or
  click. The popover's `onClick` does not fire, and the select value does not change.

**Dock regression sweep.** I ran `dock-morph-family`, `dock-morph-insitu`,
`dock-animation-live`, `dockmorph-cta`, `aria-orientation`, `nav-dock-fix` and
`dock-sections` in Chromium on both trees. The per-test status is identical (8 pass, 15 fail
on both), so these failures are existing rot and not caused by this branch.

**Cost.** A text change in a 40-seat pane costs about 0.15 ms more per mutation than on
10.1.1 (Chromium, 300 ticks). That is negligible.

**Inference and scope.** No focusability inference survives in roving or in the toolbar
claim. `FOCUSABLE_SELECTOR` remains only in `announce()` naming and in the summary
disclosure's focus target, both unchanged from 10.1.1. `isRovedSeat`,
`HELD_CONTROL_SELECTOR` and `rovedSeatsOf` are gone from `src/` and `tests/`. I found no
shim and no masking override. The changed composables (`useDockExpandedSize`,
`useDockMorphOrchestrator`, `useDockRun`) are not on a public barrel, so "no type change"
holds. Versions, CHANGELOG figures (checked against the value.js letter) and the MIGRATION
bullets match the code, except for the defect below.

## Defects

### D-1 · medium · regression in paint: a disabled DockTrigger now paints as enabled

- **Where.** `2b4efe77e` moved a disabled `DockTrigger` from native `disabled` to
  `aria-disabled="true"`. The dock's disabled paint and the trigger hover and press rules
  still select on `:disabled`:
  - `src/components/dock/styles/index.css:300-307` sets `opacity: var(--opacity-disabled);
    cursor: not-allowed`. It lists `.dock-select-trigger:disabled` and
    `.dock-dropdown-trigger:disabled`, but has the `[aria-disabled="true"]` arm only for
    `.dock-icon-button` and `.dock-tab-button`.
  - `src/components/dock/styles/controls/triggers.css:78-90`: `.dock-trigger` /
    `.dock-select-trigger` / `.dock-dropdown-trigger` `:hover:not(:disabled)` and
    `:active:not(:disabled)`, the hover fill and the press shrink.
  - Compare `controls/icon-button.css:112-126`, whose hover and active rules exclude
    `[aria-disabled="true"]`. That is why a disabled `DockControl` paints correctly.
- **Probe** (`b4paint`, scene `triggers&disabled=1`, a disabled select, dropdown and
  popover trigger). Computed style of each trigger at rest, then the dropdown trigger
  under hover:

  | Tree | Engines, widths, schemes | At rest | Hovered |
  |---|---|---|---|
  | v10.1.1 | Chromium and WebKit 2287; 390 and 1440; light and dark | `opacity 0.5`, `cursor not-allowed` | no fill |
  | branch | the same | `opacity 1`, `cursor pointer` | the enabled hover fill (`/0.14` light, `/0.18` dark) |

  The captures show the same thing:
  `scratchpad/b4/shots/old/chromium-1440-light-dis1-seat1.png` is dimmed, and
  `scratchpad/b4/shots/newtree/chromium-1440-light-dis1-seat1.png` is full strength.
- **Effect.**
  - A disabled filter or menu trigger looks, hovers and presses like a live one. The
    accessibility tree says disabled, but the paint says enabled.
  - 10.1.1 painted it disabled. So the b3 cure fixed focus and broke paint.
  - The CHANGELOG says a disabled trigger is a stop "like a disabled `DockControl`", and
    in paint that is not true.
- **No witness covers it.** The seven disabled-trigger unit arms and the two engine cells
  read focus, attributes and open state, never paint.
- **Cure shape (glass's choice).** Give the trigger family the same `aria-disabled` arms
  the icon button has:
  - add `.dock-select-trigger[aria-disabled="true"]` and
    `.dock-dropdown-trigger[aria-disabled="true"]` to the shared disabled group;
  - add `:not([aria-disabled="true"])` to the trigger `:hover` and `:active` rules.
  - Or select on the one state both arms share, rather than on `:disabled`.

  Add a witness that is RED on `abd829944` and GREEN after, in both engines: a disabled
  trigger computes `--opacity-disabled` and `cursor: not-allowed`, and takes no hover fill.

## Notes, not defects

- The CHANGELOG date is 2026-10-21. Release-close should set the actual cut date.
- Probe sources and logs are in
  `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/b4/`:
  `probe/` holds the specs and harness, `out/` the JSON reports, `shots/` the captures, and
  `*.log` the run logs. Nothing there is durable.
