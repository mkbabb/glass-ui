# 11.1.1 fix seat 12 (before critic 12)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`, from
`3cfb53222` (critique 11; its source and specs are those of `ce5f320b7`). Every orchestrator note in
this directory was read (fourteen), with `critique-11.md`, `fix-11.md` and critic 11's tooltip probe
and films. The list is critique 11's two defects, and the orchestrator's line that the tooltip's
entrance takes the ruling after critique 1 (the scale and the blur go from both legs of a register;
that ruling allows no scale, so the hint is whole from its first frame). No tag, no push, no publish.

**Measured, in two sittings.**
- **The first sitting stopped on the guard.** At 06:34:42 `guarded` refused every heavy and browser
  run (rc 75, DISK-LOW: 33 GB free; the flag is set below 40 GB and cleared above 60 GB). The two
  comparison trees this seat built at 06:31 to 06:32 (about 13.9 GB, see "Disk") had pushed free
  space under 40 GB. I deleted them and logged both in `~/.dev-logs/disk-reclaim/DELETED.tsv`.
- **The orchestrator then freed 43 GB** from finished seats' trees in `.cache`, and the flag cleared.
- **The second sitting** began at 06:46 with 90 GB free. It kept every commit and cell the first had
  banked and ran what the guard had refused:
  - the committed tree's tooltip cells, three times in each of the other three projects;
  - the ratchet rebind;
  - the five gates;
  - the exits gate whole.

  Everything it ran passed, from 06:46 to 07:20 at a 1-minute load of 8 to 15. The guard printed
  its zone warning and refused nothing.

## Commits

| item | commit | what |
|---|---|---|
| 1 (the tooltip's squish) | 10c8e23c9 | `reveal.css`: the tooltip register sets `--glass-reveal-enter-scale: 1`, `--lq-stretch-x: 1`, `--lq-stretch-y: 1` and `--glass-reveal-blur: 0px`, as the overlay and menu registers do, and keeps its slide token. Three comments now describe the code. The film records each frame's computed `scale`, `transform` and `filter`. A new cell, plus a size read added to the three existing tooltip cells. |
| 2 (the CHANGELOG sentence) | 56af37693 | "A tooltip now fades in and out with no change of size; it used to shrink and squash as it left. `--enter-tooltip-scale` and `--enter-tooltip-blur` are still defined, but they no longer shape a tooltip." This replaces "A tooltip no longer shrinks as it leaves; it still grows slightly as it arrives." |
| the ratchet | 7b653a25d | `.bundle-ratchet` from 3056513 to 3056459 (−54 B), from a build of the committed tree, once, after 10c8e23c9, the last source commit (see "The ratchet and the sizes") |

## 1. The tooltip arrived with a squish

**Cause.** As critique 11 reads it:
- `dae6d8b3f` keys the reveal's open state and its `@starting-style` on `[data-state$="open"]`, so a
  tooltip's `delayed-open` and `instant-open` enter from the from-state.
- `13573d28b` restated `--lq-stretch-x: 1.06; --lq-stretch-y: 0.945` on the tooltip register,
  beside `--glass-reveal-enter-scale: var(--enter-tooltip-scale)` (0.97).
- So the first frame read `scale: 1.0282 0.91665`.

**Cure.** In `src/styles/glass/reveal.css`, the tooltip register's scale, squish and blur knobs are
neutral, as on the overlay and menu registers. `--glass-reveal-slide` still reads
`--enter-tooltip-slide`, which is 0 by default, so a hint comes and goes by its fade alone.
- The blur is neutral too because the ruling after critique 1 takes the blur from both legs of the
  register it rules. That changes nothing by default, since `--enter-tooltip-blur` is `0px`.
- `--enter-tooltip-scale` and `--enter-tooltip-blur` stay defined in `motion-registers.css`, and no
  rule reads them now. The CHANGELOG says so.
- Comments: the header says the tooltip register's knobs are neutral and its slide is 0 by
  default. The squish comment says every register holds `1 1`. The tooltip block's comment says
  a hint keeps its size and its focus both ways.

### The witness

`tests-visual/release-11-1-1.spec.ts`:
- **New cell, `tooltip · a hint keeps its size as it comes and goes`.** It runs in all four
  projects.
  - At 1440 it opens by hover and closes by moving the pointer away.
  - At 390 it opens by keyboard focus and closes by Escape. A Tooltip does not open on touch
    (reka's trigger ignores touch pointer moves), so focus and Escape are a hint's only routes on
    the phone form.
  - Each leg is filmed per frame. Its clauses, in order:
    1. the first mounted frame of the entrance is at opacity ≤ 0.1;
    2. more than two frames lie between 0.02 and 0.98;
    3. on every mounted frame of the entrance and of the exit, computed `scale` times the scale
       part of computed `transform` is within 0.001 of 1 on both axes;
    4. the box is within 0.25 px of its resting box;
    5. the filter blurs nothing;
    6. the exit ends with the hint unmounted.
- **The existing cells** (`a Tooltip enters on a tween`, `a hint handed to its neighbour fades,
  incoming|outgoing`, desktop only) also take the size read on their own film, after their own
  clauses. Their v11.1.0 reds stay on the clauses they failed on before.
- `release-11-1-1/film.ts` records `scale`, `transform` and `filter` on every frame.

**Runs.** Each run is one guarded call, on ports 5351 to 5353, with WebKit under
`--exclusive webkit`. The guard printed its zone warning and nothing else until 06:34:42, and
nothing but that warning in the second sitting.
- Tools: `fix-12/part.sh`, `fix-12/chain.sh` and `fix-12/trees.sh`. In the second sitting,
  `fix-12/chain2.sh` (the repeats, then `sizes.sh`) and `fix-12/chain3.sh` (`gates.sh`, then the
  exits gate).
- Readers: `fix-12/tools_size.py`, writing to `logs/size-pre-fix.txt` and `logs/size-trees.txt`
  (it reads the second sitting's reports, `logs/tt-tip-{cp,wd,wp}.json`, the same way).
- Run lines: `logs/runs.out`. The 1-minute load was 9 to 14 in the first sitting and 8 to 15 in
  the second.

**The trees.**
- **ce5** is a `git archive ce5f320b7`.
- **red** is a `git archive v11.1.0`.
- Each had HEAD's (10c8e23c9) 11.1.1 specs, config and harnesses copied in, with hashes equal to
  HEAD's (`logs/specs-*.sha`). Their `src` and `demo` equal their ref's, blob for blob: 866 and 863
  files (`logs/src-demo-*.blobs`).
- They were built at 06:31 to 06:32, before any server of theirs ran.
- "Worktree, before the cure" is the worktree at 06:28, whose source was `ce5f320b7`'s, with the new
  spec uncommitted.

The first entrance frame below is written as [ms after the input, opacity, scale, box].

| tree | project | result | the new cell's first entrance frame | the new cell's exit |
|---|---|---|---|---|
| worktree before the cure | Chromium 1440 | **RED**, 3 of 4 (outgoing passes) | [33, 0, `1.0282 0.91665`, 57.4 × 33.6] | scale 1 |
| worktree before the cure | Chromium 390 | **RED** | [9, 0, `1.0282 0.91665`, 51.4 × 31] | scale 1 |
| worktree before the cure | WebKit 1440 | **RED**, 3 of 4 | [33, 0, `1.0282 0.91665`, 56.7 × 33.6] | scale 1 |
| worktree before the cure | WebKit 390 | **RED** | [12, 0, `1.0282 0.91665`, 50.9 × 31] | scale 1 |
| ce5 (`ce5f320b7`) | Chromium 1440 | **RED**, 3 of 4 | [26, 0, `1.0282 0.91665`, 57.4 × 33.6] | scale 1 |
| ce5 | Chromium 390 | **RED** | [9, 0, `1.0282 0.91665`, 51.4 × 31] | scale 1 |
| ce5 | WebKit 1440 | **RED**, 3 of 4 | [30, 0, `1.0282 0.91665`, 56.7 × 33.6] | scale 1 |
| ce5 | WebKit 390 | **RED** | [14, 0, `1.0282 0.91665`, 50.9 × 31] | scale 1 |
| red (v11.1.0) | Chromium 1440 | **RED**, 4 of 4 | [25, 1, `none`, 55.8 × 36.7] | scale 0.0833 off 1, box 3.06 px off |
| red | Chromium 390 | **RED** | [5, 1, `none`, 50 × 33.8] | scale 0.0833 off 1, box 2.82 px off |
| red | WebKit 1440 | **RED**, 4 of 4 | [29, 1, `none`, 55.2 × 36.7] | scale 0.0832 off 1, box 3.05 px off |
| red | WebKit 390 | **RED** | [12, 1, `none`, 49.5 × 33.8] | scale 0.0832 off 1, box 2.81 px off |
| worktree after the cure (the content of 10c8e23c9) | Chromium 1440 | **GREEN**, 4 of 4 | [26, 0, `1`, 55.8 × 36.7] | scale 1, box 0 |
| worktree after the cure | Chromium 390 | **GREEN** (3 desktop-only cells skipped) | [6, 0, `1`, 50 × 33.8] | scale 1, box 0 |
| worktree after the cure | WebKit 1440 | **GREEN**, 4 of 4 | [31, 0, `1`, 55.2 × 36.7] | scale 1, box 0 |
| worktree after the cure | WebKit 390 | **GREEN** | [13, 0, `1`, 49.5 × 33.8] | scale 1, box 0 |
| committed 10c8e23c9, `--repeat-each=3` | Chromium 1440 | **GREEN**, 12 of 12 | [24 to 32, 0, `1`, 55.8 × 36.7] | scale 1, box 0 |
| committed 022701fe8, `--repeat-each=3` (second sitting) | Chromium 390 | **GREEN**, 3 of 3 (9 desktop-only runs skipped) | [4 to 6, 0, `1`, 50 × 33.8] | scale 1, box 0 |
| committed 022701fe8, `--repeat-each=3` | WebKit 1440 | **GREEN**, 12 of 12 | [31 to 33, 0, `1`, 55.2 × 36.7] | scale 1, box 0 |
| committed 022701fe8, `--repeat-each=3` | WebKit 390 | **GREEN**, 3 of 3 (9 skipped) | [14 to 19, 0, `1`, 49.5 × 33.8] | scale 1, box 0 |

- **On the tip as it stood** (the worktree before the cure, and ce5) the cells fail on clause 3,
  "its scale and transform scale nothing on every frame". The scale is 0.0834 off 1, and the box is
  3.06 px off at 1440 and 2.82 px off at 390. The new cell, the entrance cell and the incoming
  hand-over cell fail. The outgoing hand-over cell passes there, because the tip's exit had no
  squish.
- **On v11.1.0** the new cell fails on clause 1, "it arrives from gone", in all four projects. Its
  first frame is at opacity 1 and scale `none`. Its exit also strays 0.0833 in scale (critique 11's
  `1.028 0.917` on the way out), though that clause is not reached. The three existing cells fail
  on the clauses they failed on before: the two entrance cells on "more than two frames between
  gone and whole", the outgoing cell on "no frame carries more than a fifth".
- **After the cure** every frame of both legs reads computed `scale: 1` and `transform: none`, with
  the box at its resting size and no filter. The entrance starts at opacity 0 and has 19 to 26
  frames between gone and whole.
- The committed 10c8e23c9 is the same bytes as the cured worktree that read GREEN in four projects:
  no file was edited between those runs and the commit.
- The committed tree read GREEN three times in each of the four projects:
  - Chromium 1440 at 10c8e23c9, in the first sitting;
  - the other three at 022701fe8, in the second.

  No file under `src`, `demo` or `tests-visual` differs between 10c8e23c9 and 7b653a25d. The
  commits after the cure touch only the CHANGELOG, `.bundle-ratchet` and this record.

## 2. The CHANGELOG sentence

In the "A popover moves by fading" paragraph (56af37693). On 11.1.0 the hint appeared whole in one
frame (the "Tooltips fade in" paragraph says so) and shrank and squashed as it left. On the branch it
fades in and out at its full size (the films above). The sentence now says that, and names the two
tooltip tokens as no longer shaping a tooltip, as the paragraph does for the overlay's.
- No em dash.
- No internal id.
- `README.md` and `MIGRATION.md` name neither token.

## The ratchet and the sizes

`verify:package` binds `.bundle-ratchet` by exact equality, and 10c8e23c9 changes `reveal.css`,
which ships in `dist`'s CSS.
- **The build.** `fix-12/sizes.sh` built the committed tree 022701fe8 at 06:47 (guarded, exit 0),
  packed it as npm packs it and unpacked it into `.cache/fix12-pub`. Logs: `logs/sizes-build.log`,
  `logs/pack-tip.json`, `logs/sizes.txt`.
- **The unpacked content** is 3,056,459 bytes in 904 files, against the ratchet's 3,056,513: 54
  bytes fewer.
  - The tooltip register ships once, in `dist/styles/glass/reveal.css`, with its comments
    stripped.
  - Its four values are 54 bytes shorter: `var(--enter-tooltip-scale)` to `1` (25),
    `var(--enter-tooltip-blur)` to `0px` (22), `1.06` to `1` (3) and `0.945` to `1` (4).
- **The rebind.** 7b653a25d sets `.bundle-ratchet` to 3056459. `verify:package` reads it equal on
  the committed tree (below).
- **The size lines.** Each entry's gzipped import closure reads as the CHANGELOG's "Sizes" lines
  state it:
  - the dock entry at 40,533 (38,673 in 11.0.2, 40,541 in 11.1.0);
  - the twelve other entries those lines name, at the values they give.

  The change is CSS only and no JS closure moved, so no line changes.
- `.cache/fix12-pub` (6.4 MB) is deleted now that its numbers are recorded, and the deletion is
  logged in `DELETED.tsv`.

## The five gates

`fix-12/gates.sh` ran on 7b653a25d, one guarded run each, from 06:48 to 06:50 at a 1-minute load of
10 to 15 (`logs/gates.out`). The only tracked files dirty were this seat's four logs under
`fix-12/logs`. All five exited 0:
- typecheck;
- build;
- `verify:package`: terminal `CLEAN`, 197 claims, the ratchet `PRESENT` and equal at 3,056,459;
- `demo:dist:build`;
- vitest `--maxWorkers=2`: 285 files, 2,600 passed, 10 expected to fail, 1 skipped.

## The exits gate whole

The gate ran as `scripts/release.sh` runs it: `npm -w tests-visual run gate:exits`, with
`GLASS_UI_DEMO_PORT=5355`, on 7b653a25d (`fix-12/chain3.sh`, log `logs/gate.log`). It ran from
06:50:30 to 07:20:37 at a 1-minute load of 8 to 15 and **exited 0, all sixteen parts green**:

| project | A | B | standing | D |
|---|---|---|---|---|
| Chromium 390 | 38 + 3 skipped | 33 + 11 skipped | 41 + 3 skipped | 17 + 1 skipped |
| Chromium 1440 | 28 + 13 skipped | 43 + 1 skipped | 44 | 18 |
| WebKit 390 | 25 + 16 skipped | 33 + 11 skipped | 27 + 17 skipped | 16 + 2 skipped |
| WebKit 1440 | 28 + 13 skipped | 43 + 1 skipped | 44 | 18 |

- Part B counts one more passing cell in each project than fix 11's run: the new tooltip cell.
  Every other count equals fix 11's.
- The first sitting expected 10 skipped at 390. That was wrong: the three desktop-only tooltip
  cells were already among the 11, so the count stays 11.
- WebKit 1440's standing part logged three "ResizeObserver loop completed with undelivered
  notifications" errors at 07:17, with every cell passing. Critiques 9 and 10 and fix 11 recorded
  the same three on both trees (critique 10's open gap B).
- The guard printed its zone warning (armed, a warning only) and refused nothing.

## Disk

- **My trees.** `fix12-ce5f320b7` (7.04 GB) and `fix12-v11.1.0` (6.88 GB) were whole-repository
  `git archive`s with symlinked `node_modules`. Almost all of their size is the archived `docs/`
  tree. They are deleted and logged. A rebuilt tree that archives only `src`, `demo`,
  `tests-visual`, the config files and `package*.json` would be far smaller.
- **Earlier seats' trees** in this worktree's `.cache` hold about 51 GB:
  - `critic5-v11.1.0`, `critic6-v11.1.0`, `critic9-v11.1.0`, `critic10-v11.1.0` and
    `critic11-v11.1.0`, 6.4 GB each;
  - `critic9-plant` and `critic10-plant`, 6.5 GB each;
  - `fix11-v11.1.0`, 6.4 GB.

  They are not this seat's, so under the disk rules (rule 7) I did not delete them. Between the
  sittings the orchestrator cleared the finished seats' trees (43 GB) and kept `critic11-v11.1.0`
  for reuse.
- **The second sitting** needed no v11.1.0 or ce5 tree, since their cells were banked. It made
  only `.cache/fix12-pub`, deleted as above.

Nothing of this seat is left running. Ports 5351 to 5356 are free.

## Open gaps

A. **A Tooltip on the phone form opens only by keyboard focus**, the route this cell drives at 390.
   A touch does not open a Tooltip (reka), so "real touch input" has no Tooltip route to read.
B. **Critique 11's open gaps A to J** stand as it wrote them.
