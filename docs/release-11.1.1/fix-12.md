# 11.1.1 fix seat 12 (before critic 12)

Seat: claude-opus-5-5. Worktree `.claude/worktrees/release-11.1.1`, branch `release/11.1.1`, from
`3cfb53222` (critique 11; its source and specs are those of `ce5f320b7`). Every orchestrator note in
this directory was read (fourteen), with `critique-11.md`, `fix-11.md` and critic 11's tooltip probe
and films. The list is critique 11's two defects, and the orchestrator's line that the tooltip's
entrance takes the ruling after critique 1 (the scale and the blur go from both legs of a register;
that ruling allows no scale, so the hint is whole from its first frame). No tag, no push, no publish.

**Stopped by the guard. measured=false.** At 06:34:42 `guarded` refused every heavy and browser run
(rc 75, DISK-LOW: 33 GB free, the flag set below 40 GB and cleared only above 60 GB). The two
comparison trees this seat built at 06:31 to 06:32 (about 13.9 GB, see below) pushed free space
under 40 GB. I deleted them and logged both in `~/.dev-logs/disk-reclaim/DELETED.tsv`. Free space
rose to 44 to 46 GB, the flag still stands and the guard still refuses. What ran before the refusal
is recorded here. What it stopped is under "Owed".

## Commits

| item | commit | what |
|---|---|---|
| 1 (the tooltip's squish) | 10c8e23c9 | `reveal.css`: the tooltip register sets `--glass-reveal-enter-scale: 1`, `--lq-stretch-x: 1`, `--lq-stretch-y: 1` and `--glass-reveal-blur: 0px`, as the overlay and menu registers do, and keeps its slide token. Three comments now describe the code. The film records each frame's computed `scale`, `transform` and `filter`. A new cell, plus a size read added to the three existing tooltip cells. |
| 2 (the CHANGELOG sentence) | 56af37693 | "A tooltip now fades in and out with no change of size; it used to shrink and squash as it left. `--enter-tooltip-scale` and `--enter-tooltip-blur` are still defined, but they no longer shape a tooltip." This replaces "A tooltip no longer shrinks as it leaves; it still grows slightly as it arrives." |

The ratchet is not rebound. Rebinding needs a build, and the guard refused it (see "Owed").

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
`--exclusive webkit`. The guard printed its zone warning and nothing else until 06:34:42.
- Tools: `fix-12/part.sh`, `fix-12/chain.sh` and `fix-12/trees.sh`.
- Readers: `fix-12/tools_size.py`, writing to `logs/size-pre-fix.txt` and `logs/size-trees.txt`.
- Run lines: `logs/runs.out`. The 1-minute load was 9 to 14.

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
| committed 10c8e23c9, `--repeat-each=3` | the other three | **refused by the guard** (rc 75) | — | — |

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
  no file was edited between those runs and the commit. Only Chromium 1440's three repeats ran on
  the committed tree before the refusal.

## 2. The CHANGELOG sentence

In the "A popover moves by fading" paragraph (56af37693). On 11.1.0 the hint appeared whole in one
frame (the "Tooltips fade in" paragraph says so) and shrank and squashed as it left. On the branch it
fades in and out at its full size (the films above). The sentence now says that, and names the two
tooltip tokens as no longer shaping a tooltip, as the paragraph does for the overlay's.
- No em dash.
- No internal id.
- `README.md` and `MIGRATION.md` name neither token.

## Owed (stopped by the guard's refusal)

1. **The ratchet rebind.** `verify:package` binds `.bundle-ratchet` by exact equality, and
   10c8e23c9 changes `reveal.css`, which ships in `dist`'s CSS. So at 56af37693 `verify:package`
   is expected to fail on the ratchet until it is rebound from a build of the committed tree. The
   new value is not measured.
   - `fix-12/sizes.sh` is ready. It builds, packs, unpacks, prints the byte total and runs critic 6's
     `sizes.py`.
2. **The size lines.** The change is CSS only, and `sizes.py` measures JS import closures, so no
   entry's line is expected to move. This is not measured.
3. **The committed tree's tooltip cells three times** in Chromium 390, WebKit 1440 and WebKit 390
   (the last three steps of `fix-12/chain.sh`).
4. **The five gates** (`fix-12/gates.sh`) and **the exits gate whole** as `scripts/release.sh` runs
   it. With the new cell, part B is expected to count one more cell in each project: 33 + 10
   skipped at 390 and 43 + 1 skipped at 1440. This is not measured.

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

  They are not this seat's, so under the disk rules (rule 7) I did not delete them. Clearing them
  would lift free space above 60 GB and clear the flag. That is the orchestrator's call.

Nothing of this seat is left running. Ports 5351 to 5356 are free.

## Open gaps

A. **A Tooltip on the phone form opens only by keyboard focus**, the route this cell drives at 390.
   A touch does not open a Tooltip (reka), so "real touch input" has no Tooltip route to read.
B. **Critique 11's open gaps A to J** stand as it wrote them.
