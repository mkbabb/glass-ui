# 11.1.1 critique 7

Critic: claude-opus-5-5. Fable is out of quota until 2026-11-21, so this seat runs on Opus by
the orchestrator's ruling. It is a fresh seat and built nothing on the branch. Tip read:
`389aea978` on `release/11.1.1`. Every orchestrator note in this directory was read, with
`fix-7.md`, `critique-6.md` and the scope file in the main checkout.

**Verdict: not ready to tag, and not measured.** The owner's power hold paused every run of
this worktree for the whole sitting (below). No build, test, probe or browser run was started.
What could be read without one was read: items 4, 6 and 7 and the static half of item 5.
Items 1, 2 and 3 were not read by this seat.

- **One defect,** from the source and from fix 7's gate log on this tip: a film's first frame
  is waited for by a flat 80 ms, so under load a film can hold no frame before its mark and
  the cell crashes. This is what stopped the exits gate's one part run on the final tip.
- **Nothing found against items 4, 6 and 7:** no name removed, no stamp in an added comment,
  and the CHANGELOG's size lines exact to the byte.

Tools and readings: `critic-7/`.

## The power hold

`docs/tranches/BL/driver/power-hold.py` in the main checkout pauses with SIGSTOP every
process that names this worktree's path, or whose shell's working directory is inside it,
while the battery is at 40 % or less. It resumes them at 80 %. Readings
(`critic-7/logs/hold.txt`):

| time | battery | 1-minute load | hold |
|---|---|---|---|
| 16:43 | 19 %, charging on AC | 26.8 | `low_hold` true, `fall_level` 2 |
| 16:48 | 17 % (25 % at the start of the hold's window) | 15.0 | on |
| 16:53 | 16 % | 11.6 | on |

The battery fell while it charged, so the hold could not lift within the sitting. At 16:50 a
copy of this seat's readings into `critic-7/` was stopped by the hold within its first
seconds (pid 67764, state T). It was ended by PID with SIGKILL, and nothing of this seat is
left running. Ports 5351 to 5356 were never opened. `guarded` was not called, so it refused
nothing.

## How it was read

- **The tip's package.** `npm pack --ignore-scripts` of the worktree: 904 files, 3,056,356 B
  unpacked (equal to `.bundle-ratchet`), 1,121,801 B packed (`critic-7/logs/pack-tip.json`).
  It packs the `dist` that fix 7's build gate wrote at 13:01 on `df038f063`. `src` has not
  changed since that commit: `git diff df038f063..HEAD -- src` is empty. A build of this
  seat's own is owed (below).
- **The published packages.** The registry tarballs of 11.1.0 and 11.0.2 cached under
  `.cache/critic6-pub/tgz`. Their sha-1 equals `npm view`'s `dist.shasum` (11.1.0
  `2180c51d…`, 11.0.2 `b425a414…`), and 11.1.0's sha-512 equals its `dist.integrity`. Each
  was unpacked into its own empty directory.
- **Comparisons**: `critic-7/tools/cmp.py` (files, exports, `package.json`), `names.py`
  (names in the built CSS and JS), `vals.py` (custom properties whose declared values moved),
  and a `diff` of every declaration on both. Sizes use critic 6's `sizes.py` and
  `closure.mjs`, unchanged.
- **Source.** `git diff v11.1.0..HEAD -- src`: 1,276 added lines, the 285 comment lines among
  them read whole (`critic-7/logs/src-added-comments.txt`). Also every source and spec change
  since critique 6 (`59077c708..HEAD`) and the CHANGELOG's diff since critique 6.

## The finite list

### 1. Each landed row's witness, RED on v11.1.0 and GREEN on the tip

**Not read by this seat.** The record's readings of the final tip (`cc0384d4e`, whose source
is the tip's) are fix 7's, not this seat's, and they are not whole:

| reading on the final tip | what fix 7 records |
|---|---|
| the exits gate, as `release.sh` runs it | 1 of its 16 parts ran (chromium-phone part A, load about 40): 37 passed, 3 skipped, **1 failed**. The failure is `routes · a CommandDialog keeps its list through its exit by pick`, a `TypeError` (defect 1). The other 15 parts were paused by the hold. |
| part B in WebKit 390, three times running | 30 + **2 failed**; 30 + **2 failed**; 32 (load 26 to 44). The four failures are `reverse · a Select closed while it opens` and `· a DropdownMenu closed while it opens`, refused as holed films (holes of 35 to 115 ms). The ruling after fix 6 asks for three green passes. |
| row A's cell, Chromium 390 | `h3-tip` at load 39 not whole: clause (3) read 0.339, and at +120 four taps counted with twenty taken again. The gate's part A passed it at load about 40. |
| the disclosure guard | twenty films on each tree at a load under 10 (the ruling after fix 7): not run |

RED readings on v11.1.0 in fix 7's record:
- row A, by clause (2), in both engines;
- row B (`a2-red`);
- the four detented standing and routes cells, 20 of 20 each (`d20-red`);
- the Toast cell in WebKit, 10 of 10 (`t1-red`);
- the detented Sheet's reduced-motion fade, in both engines (`rm1-red`, `rm2-red`).

### 2. The motion rows' frame tables

**Not read.** No film was taken. From the source, the gestalt of the two rows built since
critique 6 is one effect each:
- A detented Sheet rises by the translate already on its box. `--_sheet-below-floor` becomes
  `max(floor, size) − t·100dvh` (`sheet/styles.css:566-570`), and `block-size` holds at the
  rung through the open leg (`detents/use.ts:132-133`, `:189`).
- Under reduced motion it fades on one opacity, and the scrim follows that opacity
  (`SheetContent.vue:215-220`).

### 3. The earlier release specs

**Not read.** Critic 6 read them last, at `110da49fd`. The source moved after that read:
- the disclosure turn was removed, and `AccordionContent.vue` and `CollapsibleContent.vue`
  are byte-equal to v11.1.0 again;
- a detented Sheet rises at its rung's size;
- a detented Sheet fades under reduced motion;
- the exit clock moved to `motion/spring/exitClock.ts`.

The four specs are owed in both engines.

### 4. Nothing removed or renamed

Holds on the package as packed from fix 7's build of the committed source.

- **`exports`**: 70 keys on both, none removed, added or changed. No other `package.json`
  field differs but `version` (`logs/pack-vs-11.1.0.txt`).
- **Files**: none of the 899 published files is missing on the tip (chunk hashes
  normalised). Five are added: `exit-press` and `leave-finished`, each a chunk and a
  declaration, and `exitClock.d.ts`. `turn.d.ts`, which the branch had added, left with the
  turn.
- **Declarations**: eleven files differ, all by additions (`logs/dts-vs-11.1.0.txt`):
  - the `leaveFinished` emit and its handler on the surface contents;
  - two exports on the private overlay index;
  - `size` and `opacity` on `UseSheetDetentsReturn`;
  - the Toast's `open` and `defaultOpen` among its defaults;
  - two reworded doc comments, and renumbered locals.
- **Names in the built CSS and JS** (`logs/names-vs-11.1.0.txt`):

  | names | v11.1.0 | tip |
  |---|---|---|
  | custom property declarations | 1,164 | 1,171, none removed |
  | `@property` | 94 | 94 |
  | keyframes | 97 | 100, none removed (adds `glass-reveal-hold`, `disclosure-fade-open` and `disclosure-fade-close`) |
  | layers | 4 | 5 (adds `reduced-motion`) |
  | class selectors | 651 | 651, none removed |
  | `data-` attributes in the CSS | 121 | 123 (adds `data-leaving` and `data-plate`) |
  | custom properties written from JS | 185 | 186 (adds `--_detent-size`) |

  In `src`, custom property declarations go from 1,123 to 1,130 names, none removed
  (`logs/src-custom-properties.txt`).
- **Moved values** in the built CSS (`logs/moved-values-vs-11.1.0.txt`). Each one is
  described in the CHANGELOG:
  - `--exit-curve`;
  - the overlay register's `--glass-reveal-blur` and `--glass-reveal-enter-scale`;
  - `--reveal-exit-clock` on the popover register;
  - `--glass-level` on the new firm plate;
  - `--glass-veil-rung` for a pressed glass Button under reduced motion;
  - `--card-fill` for a pressed Card;
  - `--bouncy-slider-radius` for a wide coarse-pointer strip.
- **Defaults moved since critique 6.** A detented Sheet now opens at its rung's size and
  rises by a translate. A detented Sheet fades under reduced motion. The CHANGELOG names
  both. The first rests on the orchestrator's binding note on atlas's rows, not on the scope
  file (open gap C).

### 5. Gates on the committed tree

- **Workflows.** `.github/` is unchanged from v11.1.0. No step in `ci.yml`, `release.yml`
  or `deploy-demo.yml` installs or runs a browser. `scripts/release.sh` runs `gate:exits`,
  whose `gate.sh` runs under `set -euo pipefail`, so a failed part stops the release.
- **The five commands: not run by this seat.** Fix 7 ran them once each through `guarded`
  at `df038f063`, all exit 0 (`fix-7/logs/gates.out`):
  - typecheck;
  - build;
  - `verify:package`;
  - `demo:dist:build`;
  - vitest: 285 files, 2,600 passed.

  The commits after `df038f063` touch only the CHANGELOG, `docs/` and
  `tests-visual/release-11-1-1.spec.ts`. None of the five reads these files:
  - `tsconfig.json` includes `src/` and `demo/`;
  - `tsconfig.test.json` includes `tests/` and `src/`;
  - vitest includes `tests/**` and `scripts/**`.

  A run on the tip is owed.

### 6. Comments added in `src`

Holds. The 285 added comment lines were read whole. They were also searched for:
- inbound, row, round and release ids, and dates;
- tranche paths, and site and consumer names;
- the words "witness", "ruling", "owner", "scope", "critic" and "fix seat", and π.

No line carries a stamp. The hits are the dock's own "seat" and `:scope`. The Toast's comment
lost its old law and wave numbers. The carried tranche path in `glass/dissolve.css` is
11.1.0's (open gap E).

### 7. The CHANGELOG entry

It holds on everything that can be read without a film.

- **Prose.** It is outward prose: no internal id appears, and its one em dash is in the
  heading.
- **Sizes.** Every line is exact against this seat's measure of the tip's pack and the two
  registry tarballs (`logs/sizes.txt`).
  - The dock entry: 38,673, 40,541 and 40,533 bytes.
  - The surfaces a dock opens: `dialog` 12,508 to 14,529, `select` 8,453 to 9,517,
    `popover` 8,663 to 9,385, `tooltip` 5,897 to 6,607 and `menu` 11,865 to 12,555.
  - The entries that grew by more than half a kilobyte: the root entry 104,776 to 108,642,
    `command` 16,804 to 18,898, `sheet` 14,306 to 16,695, `tabs` 19,091 to 20,154, `easing`
    36,889 to 37,983, `motion` 12,599 to 13,544 and `toast` 5,093 to 5,879.
  - No other entry grew past 500 B: `configurator` +448 and `expandable-container` +436.
- **Values against the source.**
  - `--exit-curve` was `var(--ease-out)`, which is `--motion-ease-out`, that is
    `cubic-bezier(0, 0, 0.2, 1)`. It is now `cubic-bezier(0.3, 0.2, 0.7, 0.8)`.
  - The `reduced-motion` layer comes after `utilities`.
  - The Accordion's and Collapsible's reduced-motion fade runs `--duration-fast` (200 ms) on
    `--exit-curve`.
  - `.interactive-item:active` takes `scale: 1` under reduced motion.
  - The keyframes the entry names are all still defined.
- **The sentences added since critique 6.** The rung-to-rung drag, the rise at the rung's
  size and the reduced-motion paragraph's toast and `ExpandableContainer` agree with the
  source and with fix 7's readings. No sentence still names the Accordion or Collapsible
  reversal.
- **Not re-read**: the clocks it states for each surface. Critic 6 read them in films, and
  no source behind them has moved since, except the detented Sheet's.

## Defects

1. **A film's first frame is waited for by the clock, so under load a cell crashes instead
   of reading its film.**
   - **The reading.** The exits gate's one part on the final tip (`fix-7/logs/gate.log`,
     chromium-phone part A, 15:54 to 15:58, load about 40) failed `routes · a CommandDialog
     keeps its list through its exit by pick` with `TypeError: Cannot read properties of
     undefined (reading 'present')` at `release-11-1-1.spec.ts:461`, from `judgeLeave`
     (`:481`). `release.sh` stops on it.
   - **The cause, in the source.**
     - `startFilm` (`tests-visual/release-11-1-1/film.ts:37-101`) registers its frame
       callback and then waits a flat `waitForTimeout(80)` (`:100`). It never checks that a
       frame was filmed.
     - `markFilm` stamps the mark at once.
     - On a page that draws no frame within those 80 ms, every sample is later than the
       mark. `exitOf` (`film.ts:123-130`) then returns `rest` as `undefined`, and
       `judgeLeave` reads it at once.
     - The palette's cell is one such page: it opens the demo's command palette and waits
       900 ms first.
     - The same flat wait opens `startSheetFilm` (`release-11-1-1.spec.ts:707`) and the
       reduce spec's films (`release-11-1-1-reduce.spec.ts:229`, `:304`, `:379`, `:462`,
       `:474`).
   - **What it means.** The witness depends on the time the page takes to draw its next
     frame. `guarded` admits runs up to a load of 36 on this machine, and the gate's part
     ran at about 40 in the stretches it waited through. The crash says nothing about the
     motion, since the same cell's `escape` and `outside` routes passed beside it.
   - **Cure, in the spec, at the root.** Each film starts when it holds its first sample:
     `startFilm` and `startSheetFilm` resolve only after the page has filmed a frame of the
     surface, for instance waiting in the page on `frames.length > 0`, with no fixed delay.
     A film with no frame before its mark then fails by name ("the film holds no frame
     before its mark") instead of with a `TypeError`. No bound is widened.
   - **Witness.** The three CommandDialog routes cells stay RED on v11.1.0 and read GREEN on
     the tip in Chromium 390 and 1440 and WebKit 1440, in a pass of the gate's part A at the
     load the guard admits. Every other cell keeps its verdict.

## Owed, in this order, once the hold lifts

On the tip, each run through `guarded` (WebKit under `--exclusive webkit`), on this seat's
ports:
- the five commands of item 5 on a fresh build, and the pack comparison of item 4 again on
  that build;
- the exits gate whole, its sixteen parts in four projects, against a `git archive` tree of
  v11.1.0 as well, so that item 1 is read RED and GREEN cell by cell;
- part B in WebKit 390 three times running at a normal load;
- row A's cell in Chromium 390 at a load under 16;
- the disclosure guard, twenty films on each tree, interleaved;
- the frame tables of item 2 from those reports;
- the release-10-1-5, release-11-0-1, release-11-0-2 and release-11-1-0 specs in both
  engines, with any tip failure run on v11.1.0.

## Open gaps (for INBOUND)

A. **Row A does not cure the tap that atlas measured, and its cell no longer counts that
   miss.**
   - Fix 7's readings put the close button the same distance from its rest on both trees at
     each delay: 112 to 130 px at +190 ms and 280 to 326 at +120. The head rides the same
     open spring whether the box grows or translates.
   - So a tap aimed where the button was drawn a moment earlier still lands on the head, as
     in atlas's 5 of 9.
   - Since `cc0384d4e` the cell takes again any press that misses after a later frame has
     moved the button (`release-11-1-1.spec.ts:764-868`). Its clause (1) now fails only if
     the press lands on the button's box and the button is not hit, so it reads 20 of 20 on
     both trees.
   - The CHANGELOG claims no tap and is true.
   - atlas's own judge will find the miss again. Fix 7 named the two cures that would reach
     it: a faster rise for that leg, or the head placed at rest before the body.

B. **Under reduced motion a vetoed drag-dismiss unmounts the Sheet.**
   - `detents/use.ts` `leave()` (`:217-233`) ends its fade by setting `present` to false
     without reading `open`.
   - A host that answers the drag's close request by keeping `open` true (a confirm before
     close) has its detented Sheet unmounted while the model says open.
   - Without reduced motion, and on v11.1.0, the sheet stays mounted at 0 until `open` turns
     false (`onFrame`, `:190`).

C. **Rows A and B came in after the scope was closed.**
   - Both were added by `orchestrator-note-atlas-sheet.md` after
     `orchestrator-note-row-13.md` had closed the scope at thirteen rows. Row A moves a
     default (how a detented Sheet opens) that the scope file does not name.
   - The note is binding, so this seat reads both rows as in the release. The CHANGELOG
     names both.
   - The scope file could name them, so that the next reader of it does not count thirteen
     rows.

D. **Reduced motion, carried from critique 6.**
   - Hover scales still land at once under reduced motion.
   - The detented Sheet leaves a sub-pixel tail at the viewport's foot for about 100 ms
     before its leave-finished event. Its close is untouched by row A.

E. **Carried.**
   - `glass/dissolve.css`'s tranche path.
   - The `release-10-1-5-critic-*` specs, never run.
   - The 11.1.2 bookings after critique 5 (A, C, D, I, J), the disclosure turn's cause, and
     the CHANGELOG heading's date at the close.
