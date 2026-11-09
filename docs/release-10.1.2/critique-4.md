# release/10.1.2 · critique 4 (fresh adversarial critic, round 4)

Critic: claude-opus-5-5. Branch `release/10.1.2` at `ba0d4d3b1`, read against tag `v10.1.1`.
I read all eleven commits, from `24ca1e7e5` to `ba0d4d3b1`, and edited no source. Critique 3
found one defect (D-1, the form-bound select voiding the claim). `12ccfa4eb` cures it by
exempting inert children from the toolbar claim. The cure works for its witness. The new
exemption opens two smaller holes (D-1, D-2 below).

## Verdict

The change holds. Every atlas shape that lost its tab stop on 10.1.1 is back in the Tab order
on the branch:

- in both directions (Tab and Shift+Tab)
- in headless Chromium and Playwright WebKit 2287
- at 390 and 1440, in light and dark
- in paint

Arrows rove only declared seats, and Home and End stay on declared seats. Composites keep their
keys. Escape from an undeclared control hands focus to the summary. ARIA names have not
changed. Three low defects survive my re-check:

- D-1 and D-2: the round-3 inert exemption can claim `role="toolbar"` falsely, or keep a claim
  that has gone stale.
- D-3: three comments and one record disagree with the code or with the runs.

None of them loses a tab stop.

## Gates (all through `guarded`)

| Gate | Result |
|---|---|
| `npm run typecheck` (worktree) | exit 0 |
| `npm run build` (worktree) | exit 0. The worktree status is unchanged (only `docs/release-10.1.2/` is untracked) |
| `npx vitest run --maxWorkers=2` (worktree) | 245 files passed. 2358 passed, 10 expected fail, 1 skipped |
| `npm run verify:package` (worktree) | `terminal: CLEAN`, version 10.1.2. Both root entries in `package-lock.json` read 10.1.2 |
| The branch's `g-dock-seat-rule` and `crit-seat-cx`, run on a `git archive v10.1.1` tree | 11 failed, 6 passed. This matches the CHANGELOG's "11 of 17 RED". On the branch: 17 of 17 |
| `release-10-1-1.spec.ts` + `release-10-1-2.spec.ts`, `chromium-headless-new`, `--workers=1`, on a `git archive HEAD` tree | 41/41 |
| the same, `webkit` on 2287 (`--exclusive webkit`) | 41/41 |
| The branch's `release-10-1-2.spec.ts` + harness, run on the v10.1.1 tree, both engines | 12 of 16 RED per engine. The 4 green tests are the all-declared and composites arms at each width. `form-select` is RED on 10.1.1 (see D-3) |

I ran the engine specs in scratch archive trees, so the worktree's `test-results/` and `.cache/`
were not touched.

## My own engine probe (not the builder's spec or harness)

I used two scratch trees (`git archive v10.1.1` and `git archive HEAD`) and my own harness, with
one Vite server per tree (ports 5411 and 5412). Each engine ran one browser, opened a new
context per cell and closed everything in `finally`. Each engine covered 8 cells: 2 trees x
390/1440 x light/dark (`colorScheme` plus `.dark` on `html`). WebKit walked with Option-Tab.
No cell threw a page error. Within each tree, every engine, width and theme gave the same
result. The servers were stopped afterwards.

The atlas run in the probe holds a `DockControl`, a `PopoverTrigger`, a plain button, a
`span[role=button][tabindex=0]`, two number inputs, a `DarkModeToggle` and a second `DockControl`.

| Read | v10.1.1 | branch |
|---|---|---|
| Tab walk | `s0, after` | `s0, filter, gear, handle, from, to, dark, after` |
| Shift+Tab walk from `after` | `s0, before` | `dark, to, from, handle, gear, filter, s0, before` |
| `tabindex` on the six undeclared controls | all `-1` | untouched. The handle keeps its authored `0`; the others have none |
| `.dock-run` role | `toolbar` | none |
| ARIA snapshot | `toolbar` holding 8 named controls | the same 8 names and roles, without the toolbar wrapper |
| 4th keyboard stop, in paint | `before` (the Tab order had already left the page). No ring in the dock | the handle, `:focus-visible`, ring painted in the dock (light and dark, 390 and 1440, both engines) |
| Escape from `to` (an undeclared input) in a collapsible dock | the summary | the summary |
| `[DockControl, div[aria-hidden=true] > button, DockControl]` | `toolbar`, Tab `s0, hid, after` | **`toolbar`**, Tab `s0, hid, after` (D-1) |

Paint captures are scratch only, not committed: `{engine}-{tree}-{390|1440}-{light|dark}-4th.png`.

My unit probe (`vitest`, scratch tree only) also showed:

- Home and End move between declared seats only. A key pressed in an undeclared button is left
  alone.
- On a vertical run, the arrows skip an input, ArrowRight is ignored, and the stop is the
  `aria-current` seat.
- A re-render does not undo the run's write over a consumer's `tabindex="0"` on a `DockControl`.

## Attack surface with no defect

- **Inference from focusability, for seats.** None. A seat is tested only by
  `child.hasAttribute(DOCK_SEAT_ATTR)`. `isRovedSeat`, `HELD_CONTROL_SELECTOR` and
  `rovedSeatsOf` appear nowhere. `FOCUSABLE_SELECTOR` is left in two places:
  - `announce` uses it to pick which element's name the live region reads.
  - `onSummaryKeydown` uses it to pick the re-expand target. That use predates this change.

  The toolbar claim does read focusability (`isInert`, `tabIndex < 0`). That read is the root
  of D-1.
- **Seat primitives.** `DockControl` (through `stateAttrs`, and so on `as-child` children and
  `DockBackgroundToggle`) and `DockTrigger` (all three arms) are the full set. `DockLayerGroup`
  is a composite with its own roving. `DarkModeToggle` is correctly left undeclared.
- **Shims, aliases, masking fallbacks.** None. The `authored` WeakMap restores exactly what the
  run took. It is not a fallback.
- **Regressions.** These all pass in both engines: the 10.1.1 O-102(3) and G-3 witnesses, focus
  return on collapse, the declared toolbar, and the edits to `g-dock-lattice` and
  `scroll-overflow`, which only declare their seats.
- **Scope.** The diff holds the marker, the claim, the release of a dropped marker, the tests
  and harness, the records, the version and `.bundle-ratchet`. `playwright.config.ts` only adds
  the new spec to `webkit`.
- **Version and records.** `package.json` and `package-lock.json` read 10.1.2. The CHANGELOG
  gives the attribute name, the four-clause contract and the build path. MIGRATION 10.1.2 says
  a custom seat must carry `data-glass-dock-seat`.

## Defects

### D-1 · low · the inert exemption claims `role="toolbar"` over a Tab-reachable undeclared control

- **Where.** `src/components/dock/composables/useDockRun.ts`, `isInert`, which is
  `aria-hidden === "true" && child.tabIndex < 0`. A non-focusable wrapper always has
  `tabIndex -1`, so `<div aria-hidden="true"><button>…</button></div>` counts as inert, even
  though its button takes Tab.
- **Witness.** I seated `[DockControl, div[aria-hidden=true] > button, DockControl]` in a run.
  In all 8 branch cells per engine (Chromium and WebKit 2287, 390/1440, light/dark) the run
  claims `toolbar`, and Tab walks `s0, hid, after`. That is two stops inside a toolbar, one of
  them not roved. Unit (jsdom): role `toolbar`, inner button `tabIndex 0`.
- **Why it is a defect.** The ruling (O-102d) says a run with any undeclared child claims no
  toolbar role. The CHANGELOG adds that "an `aria-hidden` control that still takes Tab" is
  undeclared. A wrapper that still holds a Tab stop is the same case one level down, and the
  claim lets it through, because the exemption reads the child's own focusability rather than
  its marker. On 10.1.1 this run was also a toolbar, so this is a gap in 10.1.2's new
  toolbar truth, not a regression. It needs `aria-hidden` over focusable content, which is
  already an authoring error (axe `aria-hidden-focus`). Hence low.
- **Cure shape (glass's choice).** Either exempt only the one shape glass's own primitive emits
  (reka's `select[aria-hidden="true"]` bubble beside a `DockTrigger for="select"`), or also
  require the inert child to hold no element with a `tabIndex` of 0 or more. The first is
  narrower and reads no focusability. Add a unit and an engine arm with the wrapper shape.

### D-2 · low · the toolbar claim goes stale when a child's `aria-hidden` or `tabindex` changes in place

- **Where.** `useDockRun.ts` `onMounted`. The MutationObserver's `attributeFilter` is
  `["aria-current", DOCK_SEAT_ATTR]`. `isToolbar` also reads `aria-hidden`, `tabIndex` and
  the `dock-separator` class, and none of those is observed.
- **Witness (unit, jsdom).** I seated `[DockControl, button[aria-hidden=true][tabindex=-1],
  DockControl]`. The role is `toolbar`, which is right. Then I removed `aria-hidden` and
  `tabindex` from the button. The button now has `tabIndex 0` and is in the accessibility
  tree, yet the role stays `toolbar` until some other child or marker change.
- **Why it is a defect.** The CHANGELOG says "The claim is re-derived when children or markers
  change". Since `12ccfa4eb` the claim has inputs beyond children and markers, and they are not
  watched. This is narrow: a consumer would have to toggle `aria-hidden` on a run child in
  place.
- **Cure shape.** If D-1 is cured by exempting only reka's bubble select (a fixed shape), this
  goes away with it. Otherwise add `aria-hidden` and `tabindex` to the filter, then check that
  `syncRoving`'s own `tabIndex` writes do not loop through the observer.

### D-3 · low · three comments and one record disagree with the code or the runs

- **The contract text is stale in three places after `12ccfa4eb`:**
  - `src/components/dock/constants.ts:78` says the claim holds "when every direct child carries
    it (glass's `<DockSeparator>` aside)", with no inert exemption.
  - `src/components/dock/GlassDock.vue:476-477` says "claimed only while every child of the run
    is a declared seat", with no exemption at all.
  - `tests/components/custom/dock/g-dock-seat-rule.test.ts:6` says "glass's DockSeparator aside".

  The CHANGELOG and MIGRATION state both exemptions. `constants.ts` is where the attribute is
  documented in source, so it should match.
- **`tests-visual/release-10-1-2.spec.ts` contradicts itself on `form-select`.**
  - The header says each test is "RED on a 10.1.1 tree … except where a test says it is a
    regression arm".
  - The `form-select` test calls itself a "Regression arm against 10.1.1", and the CHANGELOG
    lists it among the "three regression arms".
  - In both engines, at both widths, it is RED on 10.1.1: `Expected: "seat-3" / Received: null`
    at spec line 131. 10.1.1 roves ArrowRight onto reka's hidden `<select>`.

  So it is a real 10.1.1-RED witness, mislabelled. The unit arm of the same name is green on
  10.1.1, so the CHANGELOG's unit count ("6 that pass on both") is correct. Only the engine
  labelling is wrong.

## Out of scope, noted only

- `src/components/dock/README.md`'s first example seats the views as
  `<div class="contents" role="group">` holding `DockControl`s. Under (b-ii):
  - That group is an undeclared child, so the run claims no toolbar.
  - Its `DockControl`s carry the marker but are not direct children, so they are not roved, and
    each one keeps its own tab stop.

  Roving is the same as on 10.1.1. Only the role differs. The README does not mention the
  marker or the direct-child rule. "No other change" keeps it out of 10.1.2, so it is a
  candidate for 10.2.0's docs.
- Re-expanding from the summary focuses the first `FOCUSABLE_SELECTOR` match, not the seat that
  held focus before the collapse. This is unchanged from 10.1.1, as critique 3 noted.
