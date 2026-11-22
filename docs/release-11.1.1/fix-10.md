# 11.1.1 fix seat 10 (before critic 10)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`, from
`15ca90647` (critique 9). Every orchestrator note in this directory was read (fourteen), with
`critique-9.md`, `fix-9.md` and the scope file in the main checkout. The list is critique 9's
three defects. Every run went through `guarded`, WebKit under `--exclusive webkit`, on ports 5351
to 5356. The guard refused nothing.

## Commits

| item | commit | what |
|---|---|---|
| 1 (the lost film) | cd48787a5 | the film logs the page's main-frame navigations and console from `startFilm` on; `stopFilm`, `markFilm` and `markTurn` fail by name when the page no longer holds its film (spec only) |
| 2 (frost) | f68bf74a8 | the frost cell's out leg asserts the frost layer is mounted on every frame its plate is (spec only) |
| 3 (CHANGELOG) | 8d59c4175 | the 250 ms close is a Sheet's without detents; a detented Sheet slides off on its own spring in about 400 ms |

No source file moved, so no bundle byte moved and the ratchet stands. No tag, no push, no
publish.

## 1. Row 9's reversal cell crashed on the tip: the cause is found

**The cause.** Critic 9's own plant tree. It was extracted into the worktree, at
`.cache/critic9-plant/tree`, while the gate's Chromium 390 part B was running on the worktree's
dev server, and it wrote `tsconfig.json` files into a directory that server watches. Vite 8.1.5
reloads every page it serves when it sees a `tsconfig.json` added, changed or removed anywhere it
watches. That reload took the page's window, and the film with it.

- **Vite.** `reloadOnTsconfigChange` (`node_modules/vite/dist/node/chunks/node.js:3476-3490`)
  sends `{ type: "full-reload", path: "*" }` to every client for any file whose path ends in
  `/tsconfig.json`. It is called on every watcher `add`, `change` and `unlink`
  (`:25974`, `:25992`).
  - The watcher ignores only `**/.git/**`, `**/node_modules/**`, `**/test-results/**` and
    Vite's own cache dir (`:13230-13236`). The worktree's `.cache/` is watched.
  - The client reloads 20 ms after that message (`vite/dist/client/client.mjs:913-927`,
    `:1002-1009`).
- **The times.** The plant tree's directory was born at 18:40:40. The `ctime` of each
  `tsconfig.json` it holds, outside `node_modules`, is when it landed:
  - `docs/release-11.0.0/atlas-smoke/tsconfig.json` at 18:40:41.83;
  - eight `docs/release-11.1.0/.../typewitness/tsconfig.json` from 18:40:42.94 to 18:40:44.68
    (42.94, 43.08, 43.18, 43.31, 43.46, 43.59, 44.14, 44.68);
  - the root `tsconfig.json` at 18:41:29.00, after the part had ended (18:41:26).
- **The cell.** In critic 9's report (`critic-9/logs/tip-chromium-phone-1.json`) the failing
  cell began at 18:40:39.159 and ran 4.620 s, to 18:40:43.78. From the cell's own waits, its
  film runs over about its last 1.3 s (18:40:42.5 to 18:40:43.8): `markTurn` finds the film
  just after it starts, and `stopFilm` reads it 1.2 s after the turn. Six of the reloads, 42.94
  to 43.59, land in that stretch.
  - The next cell (`Escape is live from the entrance's first frame`, 18:40:44.32, 1.99 s)
    passed through the 44.68 reload. Its claim, a collapsed container 800 ms later, also
    holds on a fresh page.
- **Why the server said nothing.** Vite logs "changed tsconfig file detected ... forcing
  full-reload" at info level, which goes to stdout. Playwright 1.61.1 passes a web server's
  stdout on only when the config sets `stdout: "pipe"` (`playwright/lib/runner/index.js:870-876`),
  and `playwright.config.ts` does not. Only stderr reached the log, which is why the forwarded
  `console.warn` lines are there. "The vite server logged no reload" was not evidence that none
  was sent: this seat's probe below reloads the page eleven times, and its logs hold no server
  line.

**The cure** (`cd48787a5`), as the list writes it, in `tests-visual/release-11-1-1/film.ts`.
- `startFilm` starts a log of the page, kept per page and reset at each film:
  - every main-frame navigation (`framenavigated` on `page.mainFrame()`), with its URL;
  - every console message, with its type.

  Each entry is stamped in ms from the film's start.
- `stopFilm` returns null from the page when `window.__film` is gone and throws "the page lost
  its film: it navigated or reloaded", followed by the navigations and the last twelve console
  lines.
- `markFilm` and `markTurn` do the same when the page's `__mark` or `__turn` is gone. They read
  the same film, and on the old module they would crash the same way.
- A film the page keeps reads exactly as before.

**Witness: a reload in the middle of a film** (`fix-10/probe/lost.probe.ts`, run by
`fix-10/probe/run.sh`, logs `fix-10/logs/lost-*`).
- Five rounds in Chromium 390, on a demo server the probe starts the way a gate part starts its
  own (port 5354). Each round:
  - opens the exits harness;
  - starts and marks a film with the module under test;
  - writes `.cache/fix10-reload/tsconfig.json`, as the plant tree did;
  - calls `stopFilm` 1.5 s later.

  The probe counts the page's main-frame navigations itself.
- Before any write, `run.sh` checks that no dev server other than its own is rooted at the
  worktree or the main checkout. Only other sessions' `vite preview` servers were running, and
  those watch nothing.

| film module | rounds | the write reloaded the page | `stopFilm` |
|---|---|---|---|
| `15ca90647` (before) | 5 | 5 of 5 | `page.evaluate: TypeError: Cannot set properties of undefined (setting 'stop')`, 5 of 5: critic 9's crash |
| branch | 5 | 5 of 5 (one round twice) | "the page lost its film: it navigated or reloaded", naming the reload of the harness URL at +33 to +121 ms and the Vite client reconnecting (`[vite] connecting...`, `[vite] connected.`), 5 of 5 |

v11.1.0 has no film module. The film is 11.1.1's witness, so its RED is the module before this
fix.

**Witness: the cell and its part** (`fix-10/run.sh`, logs `fix-10/logs/partB-*`, `red-expand-cp`).
- On v11.1.0 (`.cache/red-v11.1.0/tree`, its `src` and `demo` equal to v11.1.0's blob for blob,
  with the branch's specs), the reversal cell fails on its claim three times of three: "the
  reopen lands mid-exit", `atTurn` 0. The container is gone before the reopen.
- On the branch, the gate's part B, three times running in each project:

| project | run 1 | run 2 | run 3 |
|---|---|---|---|
| Chromium 390 | 32 + 11 skipped | 32 + 11 skipped | 32 + 11 skipped |
| Chromium 1440 | 42 + 1 skipped | 42 + 1 skipped | 42 + 1 skipped |
| WebKit 390 | 32 + 11 skipped | 32 + 11 skipped | 32 + 11 skipped |
| WebKit 1440 | 42 + 1 skipped | 42 + 1 skipped | 42 + 1 skipped |

These are critic 9's counts per part, with its one failure now a pass. The runs went from 21:31
to 22:30, at a 1-minute load of 6 to 21. The WebKit runs waited about 2 to 12 minutes each for
the lock other sessions held.

**Not cured here: what sends the reload.** The list's cure is in the spec, and it is built. The
sender is outside the release: a seat writing a tree into the checkout while a gate part's dev
server watches it. `release.sh` in a quiet checkout does not meet it. Any seat that builds a
`git archive` tree under the worktree's `.cache/` while a gate part runs will reload that part's
page once per `tsconfig.json` the tree holds. From now on the gate fails by name when that
happens. Two ways out, neither built (open gap A).

## 2. The frost cell bites on a frost layer that leaves before its plate

**Cause** (critique 9, defect 2). The cell read the gap to the plate only on frames where the
frost layer was mounted. A frost layer that unmounted while its plate still faded gave no
reading after it went, and its own leg, a monotone fall inside 200 ms, passed the fade judge.

**Cure** (`f68bf74a8`), as the list writes it.
- `judgeFrost` counts `bare`: the frames after the mark that hold the plate without the frost
  layer.
- The out leg asserts it is 0: "the frost layer is mounted on every frame its plate is, so it
  leaves at the plate's last painted value".
- With the existing gap (within 0.02 on every frame the frost layer is mounted), the frost layer
  then leaves on the plate's last painted frame, at its value, neither before nor after.
- The spec's header says so. No bound moves, and no source changes.
- "Leaves at the plate's last painted value" in place of the note's "0.02 or less" is the
  orchestrator's ruling to make. The cell reads it that way.

**Witness** (`fix-10/run.sh`, logs `fix-10/logs/{plant,red,}frost-*`, read with `fix-10/frost.py`).
The three frost cells (`fade · a Sheet right`, `· a Sheet bottom`, `· a detented Sheet`):

| tree | project | films | result |
|---|---|---|---|
| plant (critic 9's: 9bc9a7ccc with the frost span unmounted once a closing fade falls below 0.5) | Chromium 390 | 6 | 6 failed, each on the new clause alone: 12 to 14 frames hold the plate without its frost layer; the frost layer leaves at 0.502 to 0.529 while the plate fades on to 0.003 to 0.030 |
| plant | WebKit 390 | 6 | 6 failed, each on the new clause alone: 9 to 10 bare frames; the frost layer leaves at 0.511 to 0.568, the plate at 0.003 to 0.036 |
| v11.1.0 | each of four projects | 3 | 3 failed. The plate fails its own fade first. Read from the attachment, the frost layer enters at 1 with no fading frame and is not filmed on any frame of the leave |
| branch | each of four projects, three times | 9 | 9 passed. `bare` is 0 on both legs of all 36 films; the frost layer's last value equals the plate's last painted value in every film (0.001 to 0.044) |

The plant's films pass every other frost clause, as critic 9 read: the gap is 0 on every
mounted frame, and the frost layer's own leg is a fade.

## 3. The CHANGELOG's Sheet clock

The sentence now reads: "`Dialog` and a `Sheet` without detents close on the same curve, faster
than they open (a dialog in about 180 ms, a sheet in 250 ms), where a dialog used to take as
long to close as to open and a sheet front-loaded its slide. A `Sheet` with detents slides off on
its own spring, in about 400 ms." (`8d59c4175`)
- The figures are critic 9's films (`routes · a detented Sheet leaves whole by escape`, four
  projects): under 1 % shown at 343 to 355 ms, the top edge at the foot at 398 to 409 ms.
- The detented close is not called faster than its rise (about 410 ms). The paragraph has no
  em dash, and the README states no exit clock.

## The exits gate whole

The gate ran as `scripts/release.sh` runs it: `npm -w tests-visual run gate:exits`, with
`GLASS_UI_DEMO_PORT=5355` so every part served on this seat's port, on `8d59c4175`. It ran twice.

**Run 1: stopped in its first part by a cell outside this list** (`fix-10/logs/gate-1.log`,
report `gate-1-chromium-phone-0.json`). It ran from 22:30 to 22:33, at a load of 10 rising to 18.
- Chromium 390 part A: 37 passed, 3 skipped, and 1 failed, row A's
  `sheet · a detented Sheet rises into place at its rung's size`.
- At open plus 120 ms it took 24 taps: 20 counted as aimed, and 4 were late and taken again.
  - Of the 20 aimed taps, 19 hit the button, and all 20 closed the sheet.
  - At 190, 250 and 400 ms, 20 of 20 each way.
  - The rise itself passed: height spread 0, share 0.120.
- The failing tap reads `pointerdown:00:f1:0px click:11:f1:0px`, `dy` 298.7 at 126 ms. Its
  press landed one frame after the read, as headless Chromium delivers a press. Neither the
  press's target nor the element at its point was the button, yet its recorded distance from
  the button's box is 0. The click reached the button, and the sheet closed.
- The cell counts a press as aimed late only when that distance is not 0. It rounds the
  distance first (`release-11-1-1.spec.ts:801`, `off: Math.round(off)`, read at `:846`). So a
  press that lands outside the box but within half a pixel of it counts as aimed, and then as a
  miss. This tap reads as one.
- The other four late taps at 120 ms landed 10 to 19 px out and were taken again, as the cell
  intends.
- This seat's change cannot reach the cell: it films with its own sheet film, not `startFilm`.
  The failure is a witness that fails by chance at a rounding boundary. It is not in this
  list and is not touched here (open gap B).
- `chain.sh` logged this run as "exit 0". Its `$?` is read after a `$(date)` in the same line,
  so the line is wrong. The gate's log ends in npm's "code 1". `gate.sh` logs the exit
  correctly and ran the second run.

**Run 2: whole green** (`fix-10/logs/gate-2.log`). It ran from 22:37:43 to 23:18:34, at a
1-minute load of 15 to 22, and exited 0 with all sixteen parts green:

| project | A | B | standing | D |
|---|---|---|---|---|
| Chromium 390 | 38 + 3 skipped | 32 + 11 skipped | 41 + 3 skipped | 17 + 1 skipped |
| Chromium 1440 | 28 + 13 skipped | 42 + 1 skipped | 44 | 18 |
| WebKit 390 | 25 + 16 skipped | 32 + 11 skipped | 27 + 17 skipped | 16 + 2 skipped |
| WebKit 1440 | 28 + 13 skipped | 42 + 1 skipped | 44 | 18 |

- Every count equals fix 9's whole run on `fa2ffa8f6`, and critic 9's with its one failure now
  a pass.
- No film was lost in either run.
- WebKit 1440's standing part logged the three "ResizeObserver loop completed with undelivered
  notifications" errors that critic 9 recorded on both trees (its open gap B), with every cell
  passing.

## The gates on the committed tree

`fix-10/gates.sh` ran on `8d59c4175`, one guarded run each, from 22:33 to 22:37 at a 1-minute
load of 20 to 28 (`fix-10/logs/gates.out`). Only spec and CHANGELOG files moved. All exited 0:
- typecheck;
- build;
- `verify:package`;
- `demo:dist:build`;
- vitest `--maxWorkers=2`: 285 files, 2,600 passed, 10 expected to fail, 1 skipped.

## Open gaps

A. **What sends the reload.** A seat that builds a tree inside the worktree while a gate part
   runs reloads the part's page once for each `tsconfig.json` the tree holds. Vite 8 does this
   for any `tsconfig.json` under its root outside `.git`, `node_modules`, `test-results` and its
   cache dir. Two ways out, for the orchestrator to rule on:
   - (a) seats build their trees only while no gate part of theirs or another seat's runs on the
     worktree. Copying specs into a tree that exists is harmless: only a `tsconfig.json` reloads;
   - (b) the demo's `vite.config.ts` adds `server.watch.ignored: ["**/.cache/**"]`. `.cache/` is
     where seats build their trees, so a dev server would not watch them.

   Neither is in the list. Until one is ruled, the gate fails by name when it happens.
B. **Row A's tap cell can fail by chance at a rounding boundary** (run 1 above). A press that
   lands within half a pixel outside the close button's box counts as aimed, because the cell
   rounds the distance before it tests it, and then counts as a miss. It happened to 1 tap in 24
   at open plus 120 ms in Chromium 390, and that tap's click closed the sheet. The cure would be
   to test the unrounded distance (`off > 0` before rounding) and keep the rounded value for
   the record. It is not in this list, so it is left for the orchestrator.
C. **Critique 9's open gaps A to G** stand as it wrote them.

Nothing of this seat is left running.
