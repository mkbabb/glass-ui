# release/10.1.2 · critique 2 (fresh adversarial critic, round 2)

Critic: claude-opus-5-5. Branch `release/10.1.2` at `90fb6ce29`, read against tag `v10.1.1`
(commits `24ca1e7e5`, `3323977d6`, `8782aac6e`, `c8d0f1c83`, `2e4955a18`, `3dc2dc2c5`,
`90fb6ce29`). No source edited. Critique 1's D-1 (a child that drops its marker keeps the
run's `-1`) is cured by `3dc2dc2c5`, and I re-checked that cure in both engines below.

## Verdict

The change holds. Every atlas shape that lost its tab stop on 10.1.1 is back in the Tab order
on the branch. That holds in headless Chromium and Playwright WebKit 2287, at 390 and 1440,
in light and dark, and in paint. Arrows rove only declared seats. Composites keep their keys.
The all-declared run is the same as on 10.1.1. Two low defects survive my re-check. D-1 is a
toolbar claim over a focusable `role=separator`. D-2 is a year-range witness shape that is
already green on 10.1.1.

## Gates (worktree at `90fb6ce29`, all through `guarded`)

| Gate | Result |
|---|---|
| `npm run typecheck` | exit 0 |
| `npm run build` | exit 0. The marker ships once, in `dist/participation-*.js`. No `isRovedSeat` in `dist/` |
| `npx vitest run --maxWorkers=2` | 245 files: 2355 passed, 10 expected fail, 1 skipped |
| `npm run verify:package` | `terminal: CLEAN`, version 10.1.2 |
| `release-10-1-1.spec.ts` + `release-10-1-2.spec.ts`, `chromium-headless-new`, `--workers=1` | 37/37 |
| the same, `webkit` on WebKit 2287 (`--exclusive webkit`) | 37/37 |
| Branch `g-dock-seat-rule` + `crit-seat-cx` on a `git archive v10.1.1` tree | 9 failed, 5 passed (matches the CHANGELOG's "9 of 14 RED") |

## My own engine probe (not the builder's spec)

I made two scratch trees: `git archive v10.1.1` and `git archive HEAD`. Each got its own
harness and its own Vite server (ports 5291/5292). I ran one browser per engine, with a new
context per cell, closed in `finally`. There were 16 cells per engine: 2 trees x 390/1440 x
light/dark (`.dark` on `html` plus `colorScheme`). WebKit walks with Option-Tab. Every cell
ran with no page errors. Within each tree, results matched across all eight engine, width
and theme cells.

| Read | v10.1.1 (8 cells) | branch (8 cells) |
|---|---|---|
| Tab walk: atlas shapes seated directly (year pair as two direct inputs) | `seat-0, after` | `seat-0, filter, gear, handle, year-from, year-to, dark, after` |
| `tabindex` written: filter/gear/handle/year-from/year-to/dark | all `-1` | all untouched (natural) |
| `.dock-run` role | `toolbar`/`horizontal` over the mixed run | none |
| ArrowRight on seat-0 | `filter` (roves undeclared) | `seat-9` |
| ArrowRight on gear / End on handle / ArrowRight on dark | stolen (handle / seat-9 / seat-9) | stays |
| ArrowRight in year-from | focus jumps to year-to | stays (caret key) |
| Third Tab stop, in paint | not in the dock, no ring | `gear`, `:focus-visible`, ring painted in the dock |
| Vertical run: ArrowDown / End / Home on seats, ArrowDown on undeclared gear | ArrowDown goes to gear, and gear's ArrowDown is stolen | `seat-1` / `seat-2` / `seat-0`, gear keeps ArrowDown |
| Collapse: Escape from gear, seat-2 or seat-0 | summary (`Expand dock`) | summary (`Expand dock`) |
| Re-expand (Enter on summary) | `seat-0` | `seat-0` (unchanged) |
| All-declared run (link `aria-current`, separator, DockTrigger select/dropdown/popover, DockBackgroundToggle, disabled DockControl, DockControl) | toolbar, one stop, arrows walk all 7 seats with no wrap, Home/End | identical. Every child except the separator carries `data-glass-dock-seat` on the run's direct child (the Select arm included) |
| ARIA names in the all-declared run | link "Home", separator, combobox "Speed", buttons "Menu", "Time", "Pause background animation", "Disabled" [disabled], "End" | identical |

Paint (scratch, not committed). `*-third.png` in both engines and both themes: on 10.1.2 the
gear carries the focus ring inside the dock, and on 10.1.1 no dock control does.

## Attack surface with no defect

- **Surviving inference.** `isRovedSeat`, `HELD_CONTROL_SELECTOR` and `rovedSeatsOf` are gone
  from `src`, `tests`, `tests-visual` and `dist`. The seat test is `hasAttribute(DOCK_SEAT_ATTR)`
  alone. `FOCUSABLE_SELECTOR` survives in two places. In `useDockRun.announce` it only picks
  the element whose name the live region reads. In `GlassDock.onSummaryKeydown` it picks the
  re-expand focus target. That second use was already in 10.1.1, is not part of seat roving,
  and gives the same result on both trees.
- **D-1 cure (`3dc2dc2c5`).** The `authored` WeakMap restores the pre-write `tabindex` (or
  removes it). Unit arms cover both cases, and the engine arm is green in both engines. On
  10.1.1 both unit arms are RED.
- **Seat primitives.** DockControl sets the marker through `stateAttrs`, so `as-child` children
  carry it, and so does DockBackgroundToggle. DockTrigger sets it on all three arms.
  DarkModeToggle is correctly left undeclared, since the ruling needs it Tab-reachable.
  DockLayerGroup is a composite with its own roving. I found no other glass seat.
- **Masking fallback / shim / alias.** None. `data-dock-seat-target` appears nowhere.
- **Scope.** The diff touches only the marker, the toolbar claim, the D-1 release, the tests
  and harness, the CHANGELOG, MIGRATION, the version (`package.json` and both
  `package-lock.json` root entries) and `.bundle-ratchet` (2928509). `playwright.config.ts` adds
  only the new spec to `webkit`.
- **Records.** The CHANGELOG gives the attribute name, the four-clause contract and the build
  path. MIGRATION 10.1.2 says custom seats must carry `data-glass-dock-seat` to rove. INBOUND
  O-102d is the ruling quoted.

## Defects

### D-1 · low · a focusable `role="separator"` child is undeclared yet the run claims `toolbar`

- **Where.** `src/components/dock/composables/useDockRun.ts`, `isToolbar`:
  `seatsOf(run).filter((child) => child.getAttribute("role") !== "separator")`. Any
  `role=separator` child is waived from the claim, whatever it is.
- **Witness.** I seated a run as `[DockControl, div[role=separator][tabindex=0][aria-valuenow]
  (an APG window splitter, a focusable widget), DockControl]`. In all 8 branch cells, the run
  claims `role="toolbar"`/`horizontal`. The splitter keeps its own stop: the Tab walk is
  `seat-0, splitter, after`.
- **Why it is a defect.** The ruling says "a run with any undeclared child claims no toolbar
  role". The splitter is an undeclared child, and the run announces a one-stop toolbar while
  holding a second Tab stop. That is the same false claim the change exists to remove. The
  exemption also reads `role` rather than an explicit glass mark. Only glass's own
  `DockSeparator` (a non-focusable, decorative divider) needs it.
- **Cure shape.** Exempt only glass's `DockSeparator`, by an explicit glass-owned mark it
  renders (or by its class), not by any `role="separator"`. The alternative is to exempt a
  separator only when it is not focusable. Add a unit arm with a focusable splitter, where
  the expected result is no toolbar role. Update CHANGELOG contract clause 4 and the MIGRATION
  bullet to match.
- **Scope.** Narrow. It needs a consumer splitter seated directly in the run. Not a regression:
  10.1.1 claimed `toolbar` over every run.

### D-2 · low · the committed year-range witness uses a shape that is already green on 10.1.1

- **Where.** `tests-visual/release-10-1-2/harness.ts` (scene `atlas`) and
  `tests/components/custom/dock/g-dock-seat-rule.test.ts` (`atlasRun`). Both seat the year-range
  input pair inside a wrapper `div`.
- **Witness.** On v10.1.1 that wrapped pair is never written to `-1`: 10.1.1's held-control
  clause leaves a container alone. My probe's wrapped scene walks
  `seat-0, year-from, year-to, after` on 10.1.1 in all 8 cells. The shape that loses the year
  range on 10.1.1 is the pair seated directly: `-1` on both inputs, walk `seat-0, after`. The
  branch fixes that shape (verified above), but no committed witness exercises it. The
  "atlas shapes" tests are still RED on 10.1.1 as a whole, through the other four shapes.
  Still, the year-range arm of "each RED on v10.1.1 and GREEN after" is not shown by the
  committed witnesses.
- **Cure shape.** Seat `year-from`/`year-to` directly in the run in both the harness scene and
  `atlasRun` (keep the wrapped form only as a regression arm). The CHANGELOG line "It had
  written `-1` onto ... year range" is then witnessed. As written, that line holds only for a
  directly seated range.

## Out of scope, noted only

- Re-expanding from the summary focuses the first `FOCUSABLE_SELECTOR` match (`seat-0` in every
  cell), not the seat that held focus before collapse. Identical on 10.1.1.
- `demo/shell/SidebarDock.vue` seats its controls inside `div.contents[role=group]` wrappers, so
  its run roves nothing on 10.1.1 or 10.1.2. Its comment still says "roving tablist". This is
  pre-existing, and the ruling's "no other change" keeps it out of this cut.
