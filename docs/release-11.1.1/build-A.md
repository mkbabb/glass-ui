# 11.1.1 build seat A: scope rows 1 to 4

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`, cut from
master at 938cfcbd3 (v11.1.0 is an ancestor: `git merge-base --is-ancestor v11.1.0 master` held). No
seat before this one left records here, and no orchestrator note existed when the seat started.

## Setup

- Worktree created with `--no-checkout`, sparse `'/*' '!/docs/tranches/'`, then checked out.
- **Sparse additions**: the eight docs files `.github/workflows/ci.yml` lists for its own sparse
  checkout (`git sparse-checkout add`, the same list). Why: `tests/styles/dissolve.test.ts` reads
  `docs/tranches/BJ/waves/BAND-FEEDBACK-MOTION.md`, so vitest fails without it, as it would in CI
  without CI's list. Nothing else under `docs/tranches/` was added.
- `package.json` and the lockfile at 11.1.1, CHANGELOG entry opened (e4bd15061). `npm ci` under
  `guarded` (`logs/npm-ci.log`).
- RED tree: `git archive v11.1.0` (without `docs/tranches`) into `.cache/red-v11.1.0/tree`
  (gitignored), `node_modules` a directory of per-entry symlinks into this worktree's, so it keeps
  its own vite cache. Its `src/` is identical to master's.
- Servers, each `guarded --timeout 90` (restarted once when the 90 minutes ran out): 5351 the
  branch, 5352 the v11.1.0 tree. Every visual run sets `GLASS_UI_DEMO_PORT`/`GLASS_UI_DEMO_URL`.
- Runner: `scripts/build-A-run.sh <branch|red> <project> <log> [grep]` copies the 11.1.1 spec,
  config and harness into the RED tree before a red run; WebKit projects run under
  `guarded --exclusive webkit`. One wait on the WebKit lock (another session's 11.0.1 battery);
  no wait passed 60 minutes. **The guard refused nothing.**

## The witness

`tests-visual/release-11-1-1.spec.ts` with `release-11-1-1.config.ts` (four projects:
`chromium-phone` and `webkit-phone` at 390 x 844, DPR 3, `hasTouch`, real touch taps;
`chromium-desktop` and `webkit-desktop` at 1440 x 900 with the mouse; WebKit is build 2287), the
harness `release-11-1-1/exits-harness.{html,ts}` (a GlassDock seating a Select driven by
`v-model:open` and a DropdownMenu, then a Popover, Tooltip, Dialog, right and bottom Sheets and a
detented Sheet, over a busy striped ground) and `release-11-1-1/film.ts` (a per-frame film stamped
with each frame's own time: presence, box, effective opacity, form, material, running animations).
The CommandDialog cells use the demo's own `/containers/command` story, because a minimal palette
in the harness did not reproduce the cut (below). Run from `scripts/release.sh`'s visual pass by
the close; CI runs no browser.

"Seen" is opacity times the share of the box on screen, so a fade and a slide off an edge read on
one scale. "Per-frame share" is the largest change over one 60 Hz frame: each sample against the
first sample at least 16.7 ms later, scaled to one frame.

### Final reading, RED on v11.1.0 / GREEN on the branch

Cells are chromium-phone, chromium-desktop, webkit-phone, webkit-desktop; `-` is skipped by design.
Logs: `logs/final-red-*.{log,json}` (v11.1.0) and `logs/tip-green-*.{log,json}` (the committed tip).

| cell | c-phone | c-desk | wk-phone | wk-desk |
|---|---|---|---|---|
| form · dock Select, pick / outside / escape | R/G ×3 | G/G (no defect at 1440) | R/G pick, escape; outside - | G/G |
| form · dock DropdownMenu material, three routes | R/G ×3 | G/G | R/G pick, escape | G/G |
| glass · Select and dock menu, light and dark | R/G ×4 | - | R/G ×4 (material only) | - |
| glass · solid under reduced transparency | G/G ×2 | - | - | - |
| exit · Select, DropdownMenu, Popover, Dialog | R/G | R/G | R/G | R/G |
| exit · Tooltip | - | R/G | - | R/G |
| exit · Sheet right / bottom | G/G, G/G | R/G, G/G | R/G, G/G | G/G, R/G |
| routes · detented Sheet, escape / outside | R/G ×2 | R/G ×2 | R/G, - | R/G ×2 |
| routes · CommandDialog, escape / outside | R/G ×2 | R/G ×2 | R/G, - | R/G ×2 |
| routes · CommandDialog, pick | R/G | R/G (3 of 3 after the restart guard) | R/G in 2 of 3 runs (below) | R/G |
| routes · trigger re-press, Select / menu / Popover | R/G ×3 | R/G ×3 | - | R/G ×3 |

Skips, each stated in the spec: Playwright WebKit's `touchscreen.tap` reaches no outside-press
listener (the exits table's "WK outside: harness"), so WebKit at 390 skips the outside routes and
the trigger re-press (which closes through that listener); a Tooltip does not open on touch; the
glass cells are the phone form's; reduced transparency is emulated through Chromium's CDP only.

## Rows

| row | commit | disposition |
|---|---|---|
| 1 the phone sheet jumps on close | b0748ff69 | landed |
| 2 a phone popup is glass | ca17dd857 | landed |
| 3 one exit curve, Dialog and Sheet on it | 8471b7ab5 | landed |
| 4 every dismissal route leaves the same way | 22e65f1ba | landed, with one WebKit cell at the bound (below) |

### Row 1 (b0748ff69)

- **Root.** `sheet-width.ts` recomputed the form from `open` in a sync watcher, so `sheet` fell
  in the tick `open` did. It now releases the media listener on close and keeps the value: the
  form latches from open until the next open reads the query again. The sheet form gets its own
  exit: `glass-reveal-out` for the fade and `translate: 0 100%` on the closed state (a 0,3,0 rule
  after the side rules, and its reduced-motion `translate: none` twin, so the vaporize neutraliser
  still answers every closed transform; `dissolve.test.ts`).
- **Witness.** `form`: the plate keeps `data-form`, material, x and width on every exit frame,
  never rises, and moves no further in a frame than its own height. v11.1.0 phone: the sheet turns
  glass and jumps 530 px in one frame (Chromium and WebKit). 1440 has no sheet form, so the
  desktop cells are a no-regression read, GREEN on both trees.

### Row 2 (ca17dd857)

- **Root.** `SelectContent` and `DropdownMenuContent` stamped `data-surface="opaque"` at sheet
  width. They stamp `data-plate="firm"`; `surface-axis.css` gives it the overlay rung's ink and
  blur at `--glass-level: 0.35` (0.1 under more contrast; level 0 and no backdrop under reduced
  transparency and forced colours). No new token (a first try with a derived root token made a
  token-graph cycle; `token-graph.test.ts` caught it). `sheet-opaque.test.ts` is restated as
  `sheet-plate.test.ts`.
- **Witness.** `glass`: backdrop blur, fill alpha below 1, no backdrop-filter on any descendant
  or pseudo, and the highlighted row and a plain row at 4.5:1 against every painted pixel behind
  their text (text hidden, screenshot read). Chromium reads 4.86 to 10.10:1, light and dark; the
  lowest is the dark dock menu over the white trigger buttons, which is why the level is 0.35
  (0.5 read 3.93:1 there).
- **WebKit 2287 paints no backdrop blur**: it computes `blur(22px) saturate(1.5)` and draws the
  stripes unblurred (`build-A/glass-select-dark-webkit2287.png` beside
  `build-A/glass-select-dark-chromium.png`). So WebKit judges the material from computed style and
  records the contrast without judging it (4.59 and 3.95 at the 0.5 level). Real Safari unmeasured.
- The CHANGELOG names the attribute change for stylesheets that targeted the old one.

### Row 3 (8471b7ab5)

- **Root.**
  - `--exit-curve` is `cubic-bezier(0.3, 0.2, 0.7, 0.8)`: its steepest 60 Hz frame carries 0.158
    of the travel at the table's shortest exit clock (0.12 s). The first pick,
    `cubic-bezier(0.3, 0, 0.6, 0.7)` (0.183), read 0.19 to 0.21 on the 120 ms Dialog under load.
  - `glass-reveal-out` loses its 60 % opacity stop; the menu recede loses its 90 % hold, so both
    fade across the whole clock.
  - The menu register recedes on `--spring-bloom-exit-duration` (about 222 ms), the exit reader of
    the bloom row its `glass-menu-grow` enters on. The Tooltip stays at 120 ms; the Popover at 250.
  - `useSpringMount`: a close that is not a drag release tweens the position from where it is to
    1 on `--exit-curve` over `--spring-<row>-exit-duration`, both read from the stylesheet at the
    close (a probe element), so Dialog (120 ms) and Sheet (250 ms) leave on the popups' curve and
    sooner than they open. The clock advances at most one 60 Hz frame per frame, so a long frame
    slows the exit instead of skipping a stretch; a reopen mid-exit hands the position to the
    spring; a second close restarts from where it is. Under reduced motion, or where no exit
    clock resolves (no library stylesheet, as in happy-dom), the spring rides the exit as before.
- **Witness.** `exit`, closed by Escape: painted more than two frames, per-frame share of what is
  seen (and of the travel, where it moves 16 px or more) at most 0.2, the progress within 0.12 of
  the exit curve, and the exit shorter than the entrance (the measured settle, or the clock its
  open state declares: the Tooltip appears whole, which is row 6's). Branch reads: Select and menu
  about 225 to 250 ms, Popover 250 to 270, Tooltip 120 to 140, Dialog about 130, Sheets about 260;
  per-frame shares 0.06 to 0.19.
- **The Sheet cells are a weak RED.** On v11.1.0 the side Sheets already left faster than they
  entered and within the per-frame bound; only the curve check separates them (stray 0.14 to 0.2
  against 0.12), so 4 of the 8 Sheet cells read GREEN on v11.1.0 in the final pass.

### Row 4 (22e65f1ba)

- **Detented Sheet.** Below its floor the plate stopped shrinking and was unmounted with 47 % of
  it on screen. `sheet/styles.css` names the floor (`--_sheet-floor`) and translates the plate by
  `max(0px, floor − rung)` (down for bottom, up for top), so it is wholly past the edge when the
  engine unmounts it, on every route and on the way in. `sheet-reach.test.ts`'s "never
  translates" and floor gates are restated to that.
- **Command palette.** reka unmounts a closed combobox's list at once. `CommandList` force-mounts
  its content once the dialog it sits in has closed (`injectDialogRootContext`), so the dialog's
  own exit takes the list with it. A minimal controlled palette in the harness kept its list on
  v11.1.0; the demo story (groups, separators, `CommandEmpty`, bound models) loses it in the first
  exit frame (plate 435 → 51 px), so the cells run on `/containers/command`.
- **Trigger re-press.** No surface reopened. On v11.1.0 a second tap on an open dock Select's
  trigger closes it once and leaves it closed (Chromium, 390 touch: pointerdown, pointerup, click,
  closed; reka defers a touch outside press to the click). A guard written before that probe was
  removed unlanded. The cell stands as the trigger route's witness: RED on v11.1.0 by the cut and
  the front-loaded fade, GREEN on the branch.
- **The one cell at the bound.** The palette's pick route in WebKit 2287 at 390 passed 2 of 3
  runs after the restart guard (`logs/pick-wp-*`); the failing run reads a per-frame share of
  0.207 just after a 60 ms stall frame on the pick, on the 120 ms Dialog exit, where WebKit's
  frame stamps cluster (samples 5 ms apart). Chromium at 1440 passed 3 of 3 (`logs/pick-cd-*`).
  Not relaxed; listed under open gaps.
- The detented Sheet's swipe route was not driven; the cure does not depend on the route.

## Not done here

- Typecheck and vitest after the last row: typecheck exit 0; vitest 285 files, 2600 passed,
  10 expected fail, 1 skipped (`logs/vitest.log`; `demo:dist:build` first, as CI does).
- The 11.0.x and 11.1.0 release specs were not re-run by this seat.
- No GPU-lane frame-cost claim is made, so no renderer string is recorded.
- Rows 5 to 10 are not this seat's.
- No tag, no push, no publish.
