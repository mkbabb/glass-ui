# release/10.1.2 · critique 3 (fresh adversarial critic, round 3)

Critic: claude-opus-5-5. Branch `release/10.1.2` at `f7bf3f97a`, read against tag `v10.1.1`.
I read all nine commits, from `24ca1e7e5` to `f7bf3f97a`, and edited no source. Critique 2
found two defects, and both are cured: `40e9985b2` exempts only `.dock-separator` and seats
the year pair directly. I re-checked both cures below.

## Verdict

The change holds. Every atlas shape that lost its tab stop on 10.1.1 is back in the Tab order
on the branch:

- in both directions (Tab and Shift+Tab)
- in headless Chromium and Playwright WebKit 2287
- at 390 and 1440, in light and dark
- in paint

Arrows rove only declared seats. Composites keep their keys. ARIA names have not changed. One
low defect survives my re-check (D-1): one of glass's own seat primitives can void the toolbar
claim of a run built only from glass primitives.

## Gates (worktree at `f7bf3f97a`, all through `guarded`)

| Gate | Result |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run build` | exit 0. The marker ships in `dist/participation-*.js`. `isRovedSeat`, `HELD_CONTROL_SELECTOR`, `rovedSeatsOf` and `data-dock-seat-target` appear nowhere in `src`, `tests`, `tests-visual` or `dist` |
| `npx vitest run --maxWorkers=2` | 245 files, 2355 passed, 10 expected fail, 1 skipped. One failure was `boot-graph` "dist-demo is STALE": the ignored `dist-demo/` was older than the newest commit. I rebuilt it with `npm run demo:dist:build`, and `boot-graph` then passed 14/14. The failure came from the stale local build, not from the branch |
| `npm run verify:package` | `terminal: CLEAN`, version 10.1.2. Both root entries in `package-lock.json` read 10.1.2 |
| `release-10-1-1.spec.ts` + `release-10-1-2.spec.ts`, `chromium-headless-new`, `--workers=1` (port 5393) | 39/39 |
| the same, `webkit` on 2287 (`--exclusive webkit`) | 39/39 |
| Branch `g-dock-seat-rule` + `crit-seat-cx` run on a `git archive v10.1.1` tree | 10 failed, 5 passed, which matches the CHANGELOG's "10 of 15 RED" |
| Branch `release-10-1-2.spec.ts` + harness run on the v10.1.1 tree, both engines | 10 of 14 RED per engine. The 4 green tests are the two labelled regression arms (all-declared, composites) at each width |

## My own engine probe (not the builder's spec or harness)

I made two scratch trees, `git archive v10.1.1` and `git archive HEAD`. Each got my own harness
and its own Vite server (ports 5395 and 5396). Each engine ran one browser, opened a new
context per cell and closed everything in `finally`. Each engine covered 8 cells: 2 trees x
390/1440 x light/dark (`colorScheme` plus `.dark` on `html`). WebKit walked with Option-Tab.
No cell threw a page error. Within each tree, every engine, width and theme cell gave the same
result.

| Read | v10.1.1 (8 cells per engine) | branch (8 cells per engine) |
|---|---|---|
| Tab walk, atlas shapes seated directly | `seat-0, after` | `seat-0, filter, gear, handle, year-from, year-to, dark, after` |
| Shift+Tab walk from `after` | `seat-0, before` | `dark, year-to, year-from, handle, gear, filter, seat-0, before` |
| `tabindex` on the six undeclared controls | all `-1` | untouched. The handle keeps its authored `0`; the others have none |
| `.dock-run` role | `toolbar` over the mixed run | none |
| ARIA snapshot of the run | `toolbar` holding 8 named controls | the same 8 names and roles, without the toolbar wrapper |
| Keyboard focus on the 4th stop, in paint | the handle is unreachable, and the ring lands on `after` outside the dock | the handle, `:focus-visible`, ring painted inside the dock (light and dark, 390 and 1440) |
| Escape from `year-to`, `dark` or `seat-9` in a collapsible dock | focus goes to the summary | focus goes to the summary |
| All-declared run with a glass Tooltip (`TooltipTrigger as-child` > `DockControl`) | toolbar. Arrows: `seat-1, seat-9`, no wrap | identical, and every seat carries the marker |
| All-declared run with `DockTrigger for="select"` (no form) | toolbar | toolbar |
| The same run inside a `<form>` with a named `Select` | toolbar. ArrowRight lands on reka's hidden `<select>` | **no role** (D-1). Arrows skip the hidden select |

Paint captures are scratch only, not committed: `chromium|webkit-{tree}-{390|1440}-{light|dark}-kbfocus.png`.

## Attack surface with no defect

- **Surviving inference from focusability.** None. A seat is tested only by
  `child.hasAttribute(DOCK_SEAT_ATTR)`. `FOCUSABLE_SELECTOR` is left in two places:
  - `announce` uses it only to pick which element's name the live region reads.
  - `GlassDock.onSummaryKeydown` uses it to pick the re-expand focus target. That use predates
    this change.
- **Seat primitives.** `DockControl` sets the marker through `stateAttrs`, so `as-child` and
  `TooltipTrigger as-child` children carry it, and so does `DockBackgroundToggle`. `DockTrigger`
  sets it on all three arms. `DarkModeToggle` is correctly left undeclared, since the ruling
  needs it Tab-reachable. `DockLayerGroup` is a composite with its own roving. I found no
  other glass seat.
- **Masking fallback, shim or alias.** None. The deletion of `isRovedSeat` is a clean break.
- **Regressions.** These all pass in both engines: the 10.1.1 O-102(3) and G-3 witnesses
  (`release-10-1-1.spec.ts`), focus return on collapse, the vertical axis (lattice unit), and
  Home (unit). The edits to `g-dock-lattice` and `scroll-overflow` only declare their seats and
  do not weaken any assertion.
- **Scope.** The diff holds only the marker, the toolbar claim, the release of a dropped
  marker, the tests and harness, the records, the version and `.bundle-ratchet`.
  `playwright.config.ts` only adds the new spec to `webkit`.
- **Records.** The CHANGELOG gives the attribute name, the four-clause contract, the build
  path and the witnesses, and its counts match my runs. MIGRATION 10.1.2 says custom seats must
  carry `data-glass-dock-seat`. Its advice to move controls to `#persistent` holds, because that
  region sits outside `.dock-run`.

## Defects

### D-1 · low · `DockTrigger for="select"` in a form voids the toolbar claim of an all-glass run

- **Where.** `src/components/dock/composables/useDockRun.ts`, `isToolbar`. It counts every
  element child except `.dock-separator`. Reka's `SelectRoot` renders a `BubbleSelect`
  (`<select aria-hidden="true" tabindex="-1">`) as a sibling of the trigger whenever the Select
  has a `name` and sits inside a `<form>` (`reka-ui/dist/Select/SelectRoot.js:152`). That
  sibling becomes a direct child of the run, and nobody can declare it.
- **Witness.** I seated a run as `[DockControl, Select{name} > DockTrigger for=select,
  DockSeparator, DockControl]` inside a `<form>`. All 16 branch cells (2 engines x 390/1440 x
  light/dark) show these children:
  `button[seat], button#sel[seat], select[ti=-1], div.dock-separator, button[seat]`. The role
  is null. Without the form the same run claims `toolbar`. On 10.1.1 it claimed `toolbar`.
- **Why it is a defect.** The run is built only from glass's seat primitives, and every
  control in it is declared and roves as one stop. Yet it loses `role="toolbar"`, because one
  of those primitives emits a child that is hidden from assistive technology. Contract clause 4
  is met to the letter, but glass's own primitive breaks the promise that a run of declared
  seats is a toolbar. This is not a Tab-order loss: the arrows are correct, and better than on
  10.1.1, which roved onto the hidden select.
- **Cure shape (glass's choice).** The toolbar claim could also exempt a child that is
  `aria-hidden="true"`, since it is outside the accessibility tree and so outside the
  toolbar. That is a fact about the claim, not a seat inference. If it is done, add a unit and
  an engine arm with the form-bound Select, and amend contract clause 4 and the MIGRATION
  bullet. The other route is to state the exception in clause 4 and leave the code as it is.
- **Scope.** Narrow. It needs a named dock Select inside a form. This is a regression only
  against 10.1.1's role claim, which was unconditional.

## Out of scope, noted only

- An undeclared child hidden with `v-show` or `hidden` also voids the claim. That matches the
  ruling's letter ("any undeclared child"), and it is the same class as D-1 if glass widens
  the exemption.
- Re-expanding from the summary focuses the first `FOCUSABLE_SELECTOR` match, not the seat
  that held focus before the collapse. This is the same on 10.1.1.
