# release/10.1.2 · critique 1 (fresh adversarial critic, round 1)

Critic: claude-opus-5-5. Branch `release/10.1.2` at `2e4955a18`, read against tag `v10.1.1`
(commits `24ca1e7e5`, `3323977d6`, `8782aac6e`, `c8d0f1c83`, `2e4955a18`). No source edited.

## Verdict

The change holds. Every atlas shape that lost its tab stop on 10.1.1 is back in the Tab order
on the branch, in both engines, at 390 and 1440, light and dark. Arrows rove only declared
seats. `role="toolbar"` is claimed only over an all-declared run. One defect survives the
re-check (D-1, low): a child that drops its marker while still mounted keeps the `-1` the run
wrote, so it stays out of the Tab order.

## Gates (run on the worktree, all through `guarded`)

| Gate | Result |
|---|---|
| `npm run typecheck` | clean |
| `npm run build` | exit 0; the marker ships once in `dist/participation-*.js`; no `isRovedSeat` in `dist/` |
| `npx vitest run --maxWorkers=2` | 245 files, 2353 passed, 10 expected fail, 1 skipped |
| `npm run verify:package` | `terminal: CLEAN`, version 10.1.2 |
| `release-10-1-1.spec.ts` + `release-10-1-2.spec.ts`, `chromium-headless-new` | 35/35 |
| the same, `webkit` on WebKit 2287 (`--exclusive webkit`) | 35/35 |

## RED on 10.1.1, GREEN on the branch

**Unit.** I copied the branch's `g-dock-seat-rule.test.ts` and `crit-seat-cx.test.ts` onto a
`git archive v10.1.1` tree. 7 of 12 fail there, which matches the CHANGELOG. They are
primitives-declare, undeclared-stops, arrows-rove-declared, key-in-undeclared, no-toolbar,
claim-follows-children and crit undeclared. The 5 that pass are the regression arms the
CHANGELOG names. All 12 pass on the branch.

**Engine (my own probe, not the builder's spec).** One browser per engine and a new context
per cell. Cells: v10.1.1 and branch, x 390/1440, x light/dark, in headless Chromium and
Playwright WebKit 2287 (Option-Tab walk on WebKit). There are 32 cells. One v10.1.1 Chromium
390-light cell timed out on the first dev-server optimise and is covered by the other seven
10.1.1 cells. The scene was the atlas shapes seated directly between declared seats: a
PopoverTrigger filter, a plain gear button, a `div[role=button][tabindex=0]` handle, a
single `input[type=range]` year, a `DarkModeToggle`, and three `DockControl`s. I also ran the
builder's atlas scene (year range as an input pair).

| Read | v10.1.1 (all cells) | branch (all cells) |
|---|---|---|
| Tab walk, my scene | `seat-0, after` | `seat-0, filter, gear, handle, year, dark, after` |
| Tab walk, builder scene | `seat-0, year-from, year-to, after` | all seven, then `after` |
| tabIndex written | filter/gear/handle/year/dark `-1` | all `0`; declared seats `0,-1,-1` |
| ArrowRight on seat-0 | `filter` | `seat-5` (skips undeclared) |
| End / Home | seat-9 / seat-0 | seat-9 / seat-0 |
| ArrowRight on gear | moves to `handle` (stolen) | stays on `gear` |
| End on handle | moves to `seat-9` (stolen) | stays |
| ArrowRight / Home on the range | focus leaves, value unchanged | focus stays, 2019 to 2020; Home sets 2000 |
| run `role` | `toolbar` over a mixed run | none |
| Third Tab stop, in paint | no ring in the dock | ring painted on `G` (`:focus-visible`, outline auto) |

**Paint.** The dock screenshots with the third Tab stop focused are under the critic's
scratchpad (`critique/out/*-atlas-focus3.png`, 16 files). On 10.1.1 no control in the dock
carries a ring. On the branch the gear carries the ring in light and dark at both widths.

**All-declared run** (DockControl, `<a data-glass-dock-seat aria-current="page">`,
DockSeparator, DockTrigger for select, dropdown and popover, DockBackgroundToggle, a disabled
DockControl, DockControl). Every primitive carries the marker on the element that is the run's
direct child, the Select arm included (no hidden native select lands in the run). The run
claims `toolbar` with the separator present. The one Tab stop is the `aria-current` seat.
Arrows walk all eight seats in order and stop at the end, with no wrap. This is identical on
10.1.1, so there is no regression in the all-declared case.

**Screen-reader names.** The ARIA snapshot of the mixed run on the branch lists every control
by name (`button "Filter"`, `button "Settings"`, `button "Provenance"`, `slider "Year"`,
`button "Switch to dark mode"`, ...), with no toolbar wrapper. The live region announced
`Settings` on focusing the undeclared gear. Naming of undeclared children is read only.

**Collapse and focus return.** On a collapsible dock, Escape from an undeclared control hands
focus to the summary (`Expand dock`), the same as 10.1.1. The 10.1.1 O-102(3), G-3 and O-102(6)
witnesses are green on the branch (Chromium 35/35, WebKit above).

## Attack surface with no defect

- **Surviving inference.** `isRovedSeat`, `HELD_CONTROL_SELECTOR` and `rovedSeatsOf` are gone
  from `src`, `tests` and `dist`. `FOCUSABLE_SELECTOR` stays in `useDockRun.ts` only to read an
  undeclared child's name for the live region, which writes nothing. The run's seat test is
  `hasAttribute(DOCK_SEAT_ATTR)` and nothing else.
- **Seat primitives.** DockControl (via `stateAttrs`, so `as-child` children carry it),
  DockTrigger (all three arms) and DockBackgroundToggle (which renders a DockControl). DockLayerGroup is a
  composite with its own roving, so it is correctly undeclared. DockSeparator is
  `role="separator"`. I found no other glass component that is a seat.
- **Masking fallback or shim.** None. There is no alias for the deleted predicate. The
  10.1.1 `data-dock-seat-target` spelling appears nowhere.
- **Scope.** The diff is the marker, the toolbar claim, the tests and harness, the release
  records, the version and the bundle ratchet. `playwright.config.ts` adds the spec to the
  `webkit` testMatch. No other runtime change.
- **Toolbar truth.** `isToolbar` requires at least one non-separator child and every one of
  them declared. It is re-derived on `childList` and `data-glass-dock-seat` mutations
  (unit "claim follows the children", RED on 10.1.1).
- **Witnesses passing on 10.1.1.** Each is named as a regression arm in the spec and in the
  CHANGELOG. Every new-behaviour witness is RED on 10.1.1 (shown above).
- **Version and records.** `package.json` and `package-lock.json` (both root entries) read
  10.1.2. CHANGELOG 10.1.2 gives the attribute name, the four-clause contract and the build
  path (`release/10.1.2`, `npm ci && npm run build`, `npm pack`). MIGRATION 10.1.2 says a
  custom seat must carry `data-glass-dock-seat` to rove. INBOUND O-102d is committed on master
  (`ab0497e5f`). `useDockRun`/`UseDockRunReturn` are not exported from any entry, so the
  added `toolbar` member is not a public type change ("no type change" holds).

## Defects

### D-1 · low · a child that drops the marker keeps the run's `-1` and loses its tab stop

- **Where.** `src/components/dock/composables/useDockRun.ts`, `syncRoving`. It writes
  `tabIndex` only into `declaredSeatsOf(run)` and never clears what it wrote into a child that
  has since lost `data-glass-dock-seat`. The MutationObserver does fire on the attribute
  change, but the re-sync skips the child.
- **Witness.** Scene: `[DockControl, <button data-glass-dock-seat>, DockControl]`, then the
  middle button's marker is removed while it stays mounted (a consumer binding
  `:data-glass-dock-seat="isRoute || undefined"`). In every branch cell (Chromium and WebKit
  2287, 390/1440, light/dark) the run correctly drops `toolbar`, but the button keeps
  `tabindex="-1"`. The Tab walk reads `seat-0, after`, so the now-undeclared control is not
  Tab-reachable. This breaks contract clause 3 ("the run writes nothing into an undeclared
  child") and the release's own headline ("every undeclared control keeps its natural tab
  stop").
- **Scope.** Narrow. The marker on glass's own primitives is static. It bites only a consumer
  seat whose declaration is reactive. 10.1.1 has the same stale write for the analogous case,
  so this is a gap in the cure, not a regression.
- **Cure shape.** Have the run remember the elements it wrote (a `WeakSet`) and remove the
  `tabindex` attribute it wrote (`removeAttribute`, not `-1` or `0`) from any remembered
  child that is no longer declared on each `syncRoving`. Or state in the contract that a seat
  must not drop its marker while mounted. Add a unit arm: remove the marker and check that
  the child's `tabIndex` is back to its natural value.

## Out of scope, noted only

- Re-expanding from the summary focuses the first `FOCUSABLE_SELECTOR` match in the run
  (`GlassDock.vue` `onSummaryKeydown`), not the roving stop. After Escape from seat-5,
  re-expand lands on seat-0. This is identical on 10.1.1 and is not part of this change.
- The engine spec and my probe read focus and attributes. Paint was read from the focus-ring
  screenshots above, not by a pixel gate.
