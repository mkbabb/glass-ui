# 11.1.1 critique 8

Critic: claude-opus-5-5. Fable is out of quota until 2026-11-21, so this seat runs on Opus by
the orchestrator's ruling. It is a fresh seat and built nothing on the branch. Tip read:
`11b58de50` on `release/11.1.1`, whose source, specs and CHANGELOG equal `d0f85bd29`'s (the
commit after it adds one orchestrator note). Every orchestrator note in this directory was
read, the frost note among them, with `fix-8.md`, `critique-7.md` and the scope file in the
main checkout.

The seat ran in four sittings: 2026-11-19 and 11-20, and 2026-11-21 before and after the
orchestrator's stop at 15:22. The first three logged to `critic-8/logs/` and `critic-8/r3/`.
The stops came from the weekly usage limit, then the orchestrator's added item, and before
that the battery, which the owner has since ruled out. None was a fault of the run. Every run
whose log is whole and was taken on `d0f85bd29` is used here. The fourth sitting's runs are in
`critic-8/r4/`. Every run went through `guarded`, with WebKit under `--exclusive webkit`, on
ports 5351 to 5356. The guard refused nothing. It held runs for headroom while other sessions
kept the 1-minute load at 30 to 80.

**Verdict: not ready to tag.** Three defects:
1. **The frost note's item fails on the tip.** Under reduced motion a Sheet's frost layer
   stays at full opacity through its plate's fade and goes in one frame. On the way in it
   stands whole from the first frame while the plate fades up from 0. Measured in films:
   0 of 9 films pass in each of the four projects (Sheet right, Sheet bottom and detented Sheet,
   three times each). On v11.1.0 plate and frost layer both cut.
2. **A film's first frame can share its mark's millisecond in WebKit**, so a cell fails by
   chance. WebKit 2287 stamps both on a 1 ms clock. 02dd6a7cb's wait then leaves the film
   with no frame strictly before its mark. This failed two cells in the WebKit 390 gate parts
   on `d0f85bd29`: one failed by name, one crashed with a `TypeError`.
3. **The CHANGELOG says a Sheet fades under reduced motion.** With defect 1, its frost layer
   does not.

Items 2 to 6 hold.

## The finite list

### 1. Each landed row's witness, RED on v11.1.0 and GREEN on the tip

**How it was read.** The exits gate's sixteen parts ran as `gate.sh` splits them, on the
worktree at `d0f85bd29` (`logs/tip-<project>-<part>`). Then parts A, B and D ran on a
`git archive` tree of v11.1.0, with HEAD's 11.1.1 specs and harnesses copied in
(`logs/red-<project>-<part>`, `redspecs.sh`, hashes equal). Part C, the standing cell, was
read on the tip only: the scope makes it a standing read, not a RED/GREEN witness. `r4/matrix.py why` tabulates each cell on both
trees (`r4/matrix-u.txt`, 146 titles).

| project | A | B | standing | D |
|---|---|---|---|---|
| Chromium 390 | 38 + 3 skipped (re-run at load 3 to 11; the first pass at load 37 to 48 failed row A's share, below) | 32 + 11 skipped | 41 + 3 skipped | 17 + 1 skipped |
| Chromium 1440 | 28 + 13 skipped | 42 + 1 skipped | 44 | 18 |
| WebKit 390 | 24 + 16 skipped + **1 failed** (defect 2) | 32 + 11 skipped | 27 + 17 skipped | 15 + 2 skipped + **1 failed** (defect 2) |
| WebKit 1440 | 28 + 13 skipped | 42 + 1 skipped | 44 | 18 |

WebKit 390's parts A and D ran whole again on the tip in this sitting, at a load of 13 to 16
(`r4/wp-A`, `r4/wp-D`): 25 + 16 skipped and 16 + 2 skipped, with no failure. That does not
clear defect 2, which strikes a few films in a hundred.

- **RED on v11.1.0.** Every part fails there in every project, 19 to 35 cells a part. Each
  failure was read for a cell that is green on the tip. The cells that crashed on v11.1.0 in
  the gate pass were run again: `exit · Sheet bottom` (WebKit 390, five times), and
  `exit · Tooltip` and `exit · Sheet right` (WebKit 1440, three times each) (`r3/wp-red-x5`,
  `r3/wd-red-x3`). Each failed on its claim, "the exit follows the exit curve" or "no frame
  takes more than a fifth of what is seen", with no crash.
- **Cells green on both trees.** Each is a no-regression read that the record and earlier
  critiques name:
  - `form` at 1440: the dock Select and DropdownMenu open no sheet at the desktop form;
  - the compact SegmentedTabs strip;
  - solid under reduced transparency;
  - `reverse · a DropdownMenu reopened` (v11.1.0 already turned from where it was);
  - the disclosure guard;
  - ExpandableContainer's entrance and first-frame Escape;
  - the Slider held still (the branch had broken it, and fixed it again);
  - the "says nothing" halves of the leave event (v11.1.0 has no event).
- **The rows added since critique 6** are all R/G:
  - row A's rise, in Chromium 390 and WebKit 390;
  - the Toast reversal cell, in all four projects;
  - the detented Sheet's reduced-motion fade, in all four;
  - the detented routes cells, in every project they run in. The detented standing cells were
    read on the tip only; fix 7 read their v11.1.0 reds, 20 of 20.
- **Row B** runs in Chromium 390 only. The spec skips WebKit 390 because "Playwright WebKit's
  touchscreen can tap but not drag", so this seat's probe drags by the mouse there
  (`probe/rowb.probe.ts`, the spec's sequence and bounds). In WebKit 390 the tip passed both
  releases. v11.1.0 failed both, with shares 0.908 and 0.863. At 1440 the probe's phone-scaled
  drag does not reach the midpoint on either tree, so it reads nothing there.
- **The cells that failed on the tip:**
  - WebKit 390 part A: `exit · Sheet bottom leaves on the exit curve`, "the film holds no
    frame of the surface before its mark {"mark":2,"first":[[2,true],…]}". This is defect 2.
    The same cell ran ten times green on the tip at load 42 to 46 (`r3/wp-tip-x10`).
  - WebKit 390 part D: `fade · a Toast appears and leaves on a fade`, `TypeError: Cannot read
    properties of undefined (reading 'present')` in `judgeLeg`. Defect 2 again: the reduce
    spec's judge reads the last frame before the mark unguarded. Ten green on the tip in
    `r3/wp-tip-x10`.
  - Chromium 390 part A, first pass, at load 37 to 48: row A's clause (3) read 0.215.
    - Its frame table holds a 33 ms frame at the start (17 to 50 ms), after which the head
      goes 967 to 839 to 797 px in two frames.
    - The re-run at load 3 to 11 passed, as fix 8's read did at load 9 to 25 (0.105).
    - The run started at a 1-minute load of 37 and ended at 48, above the guard's admission
      line (36). This seat reads it as load, not a fault of the row.
- **The Sheet bottom's reduced-motion fade in WebKit 390** failed once in ten on the tip in
  `r3/wp-tip-x10`: out leg 227 ms against 220.7, at load 42 to 46. Fix 8 read 305 ms once.
  `runExitClock` advances at most 16.7 ms a frame by design, so a long frame lengthens the fade
  instead of skipping part of it. Ten repeats at a 1-minute load of 15.6 to 16.1 all
  passed, with out legs of 192 to 196 ms (`r4/wp-fade-x10`). The cell holds on steady frames, so
  this seat reads it as load (open gap A).
- **The disclosure guard** (the ruling after fix 7): twenty films on each tree in WebKit 390,
  interleaved by fives, at a 1-minute load of 2.5 to 3.9. All twenty are whole and green on
  each tree (`logs/guard-{tip,red}-{1..4}`).
- **The frost note's witness** is defect 1.

### 2. The motion rows' frame tables

Read from the tip's sixteen part reports (`r4/sum-tip.txt`, `r4/steps5-tip.txt`,
`r4/channels-tip.txt`):
- **No frame carries more than a fifth.** In each part's reports, leaving out the disclosure
  guard, the most any 16.7 ms window carries is between 0.123 and 0.180 (`r4/sum-tip-nodisc.txt`).
- **No last-frame step.** The largest last moving sample is 0.023 to 0.049.
- **No cut at the start.** The largest first moving sample is 0.067 to 0.119.
- **No sample against its leg's direction** outside the turn cells.
- **No overshoot** in an exit table.

**The gestalt** is one effect per change, each surface's own:
- a dock Select at 390 fades and slides down past the edge;
- a DropdownMenu fades, with its clip drawing in;
- a Popover fades and moves 8 px;
- a detented Sheet's top edge goes down without a break, from its rung to past the edge. It
  is a shrink to the floor and then the floor's slide, which reads as one motion.
- A CommandDialog fades with about 5 % of scale and an 11 px drop. That is the Dialog's
  three channels, booked for 11.1.2 (C, after critique 5).

The disclosure guard's film does cut: on a reopen the region drops from about 0.4 to 0 in one
frame and opens again from 0. That is 11.1.0's behaviour, which the ruling after fix 6 keeps
for 11.1.1.

### 3. The earlier release specs

They ran on `d0f85bd29` in Chromium (headless-new) and WebKit 2287, with critic 6's step
list (`reg-inner.sh`, `logs/chain.txt`):

| spec | Chromium | WebKit |
|---|---|---|
| release-10-1-5, part A / part B | 84, 23 | 84, 23 |
| release-11-0-1: owner, daraksha, fix 2, critic 2 | 9, 2, 14, 9 | 9, 2, 14, 9 |
| release-11-0-1 critic 1 and 1b | 24 | 22 + **2 failed** |
| release-11-0-2 with slider-forced-colors | 57 | 54 + 3 skipped |
| release-11-0-2 on coarse touch / on WebKit 2311 | 37 + 17 skipped | 51 + 3 skipped |
| ro-loop (11.1.0) | 4 | 4 |
| release-10-1-3 (restated in 11.1.0) | 60 | 58 + 2 skipped |
| radius-scale (restated in 11.1.0), Chromium and coarse touch | 64 | not matched |

The two WebKit failures are "a light-1440f: the wide label seat's plate is a capsule in
paint" and the same at light-390c. Each fails on v11.1.0 as well:
- light-1440f in `logs/reg-red-c1-wk`;
- light-390c in `r3/c1-red-1`.

Both pass on the tip in `r3/c1-tip-1`, and both pass on v11.1.0 in `r3/c1-red-2`. They are
the witness fault booked for 11.1.2 (I, after critique 5). **No title fails on the tip that
passes on v11.1.0.**

### 4. Nothing removed or renamed

**What was read.** The pack of the build at `d0f85bd29` (`logs/pack-tip.json`): 904 files,
3,056,356 B unpacked, equal to `.bundle-ratchet`. `src` has not changed since. It was read
against the 11.1.0 registry tarball (sha-1 equal to `npm view`).
- **`exports`:** 70 keys on both trees, none removed, added or changed. Only `version`
  differs in `package.json`.
- **Files:** none missing. Five added: the `exit-press` and `leave-finished` chunks with
  their declarations, and `exitClock.d.ts`.
- **Declarations:** eleven changed. All are additions, two reworded doc comments, and
  renumbered locals.
- **Names in the built CSS and JS:**
  - custom property declarations 1,164 to 1,171, none removed;
  - `@property` 94 to 94;
  - keyframes 97 to 100, none removed;
  - class selectors 651 to 651;
  - layers 4 to 5 (`reduced-motion`);
  - `data-` attributes 121 to 123.
- **Moved values,** each described in the CHANGELOG:
  - `--exit-curve`;
  - `--glass-reveal-blur` and `--glass-reveal-enter-scale`;
  - `--reveal-exit-clock`;
  - `--glass-level` on the firm plate;
  - `--glass-veil-rung`;
  - `--card-fill`;
  - `--bouncy-slider-radius`.
- **Defaults moved:**
  - the exit clocks and curve (row 3);
  - the narrow form's material and attribute (row 2);
  - the reduced-motion layer (row 8);
  - a detented Sheet's rise at its rung's size (the orchestrator's binding note on atlas's
    rows, outside the scope file, open gap C).

  The CHANGELOG names each.

### 5. The gates on the committed tree

Each command ran once through `guarded` on `d0f85bd29` (`logs/gates.out`):
- typecheck: exit 0;
- build: exit 0;
- `verify:package`: exit 0;
- `demo:dist:build`: exit 0;
- vitest `--maxWorkers=2`, whole, run three times:
  - exit 0 once, at a load of 9.7 to 15.5: 285 files, 2,600 passed, 10 expected to fail,
    1 skipped (`r3/vitest-3`, 2026-11-21, HEAD still `d0f85bd29`);
  - exit 1 twice, at loads of 37 to 46 and of 23 (`logs/gate-vitest`, `gate-vitest-2`). The
    failures were the DropdownMenu contract's "restores focus on execute"
    (`tests/components/menu/contract.test.ts:124`, a 30 ms wait), both times, and the aurora
    atoms fuzz, once.

  Both flake on v11.1.0 too:
  - In 16 interleaved runs of the two files on each tree (`logs/vitest-ab.txt`,
    `vitest-cd.txt`), the contract failed 6 times on the tip and once on v11.1.0. The fuzz
    failed on both trees. The counts lean to the tip, but by a margin that chance can make
    (a two-sided exact test gives about 0.08).
  - A probe of the contract's own menu (`probe/focus*.probe.test.ts`) times focus's return to
    the trigger after the item's click. It reads the same on both trees: 5 to 28 ms, medians
    about 10 ms.

  This seat reads the 30 ms wait as a race under load, and not a slower focus on the branch
  (open gap B).

`.github/` is unchanged from v11.1.0. No workflow installs or runs a browser.
`scripts/release.sh` runs `gate:exits`.

### 6. Comments added in `src`

Holds. `src` has not changed since critique 7 read its 285 added comment lines. A search of
the 1,232 added lines for ids, stamps, dates, tranche and consumer names, and seat vocabulary
finds only the dock's own "seat" and a DOM probe in `exitClock.ts`
(`r4/src-added.txt`).

### 7. The CHANGELOG entry

Equal to what critique 7 read, which verified its sizes to the byte, its values against the
source and its prose. It names every moved value (item 4). It is outward prose, with no
internal id and one em dash (the heading's).

**One sentence is untrue on the tip:** "Each now fades in and out over at most 200 ms" names
sheets, and a glass Sheet's frost layer does not fade under reduced motion (defect 1). It
becomes true with defect 1's cure. No change of wording is asked.

## Defects

### 1. Under reduced motion a Sheet's frost layer does not fade with its plate

**The reading.** `probe/frost.probe.ts` is the frost note's witness. It runs on the exits
harness with `prefers-reduced-motion: reduce`. Each of the Sheet right, the Sheet bottom and
the detented Sheet is opened by a tap and closed by Escape, three times. Every frame records
the plate's effective opacity and `[data-slot="glass-graded-halo"]`'s.

| project | tip `11b58de50` (source of `d0f85bd29`) | v11.1.0 |
|---|---|---|
| Chromium 390 | 0/9: the frost layer reads 1 on its first frame (the plate 0), stays 1 through the plate's fade (gap up to 1.000), and goes after 25 to 27 frames | 0/9: plate and frost layer appear at 1 together and are gone by the first frame after Escape (0 or 1 frame) |
| Chromium 1440 | 0/9, the same (25 to 27 frames) | 0/9, the same (0 frames) |
| WebKit 390 | 0/9, the same (21 to 22 frames, gap up to 0.996 on the way out) | 0/9, the same (0 or 1 frame) |
| WebKit 1440 | 0/9, the same (21 to 22 frames) | 0/9, the same (0 frames) |

A strip of the tip, Sheet right at 390 (ms from the mark, plate, frost):
- in: `[51, 0, 1] [59, 0, 1] [76, 0.029, 1] [84, 0.099, 1] … [217, 0.818, 1]`;
- out: `[11, 1, 1] [29, 0.968, 1] … [203, 0.06, 1] [213, 0.031, 1] [220, gone, gone]`.

On v11.1.0 plate and frost appear together at 1 and are both gone on the first frame after
Escape, so the leave films no frost at all. This is the frost slab keyframes filmed outliving
its plate.

**The cause, in the source.**
- The plate's reduced-motion fade is written on the plate alone:
  - `SheetContent.vue:166-172` for a detented Sheet (`sheetDetents.opacity`);
  - `:180-185` for a sliding one (`1 - p`).
- The frost span at `:458-465` carries no style.
- Its rules in `sheet/styles.css:365-458` set no opacity.
- It stays mounted while `haloPresent` holds (`:205-208`), and then unmounts in one frame.

**Cure, as the note writes it.** SheetContent writes one fade value on both boxes:
- detented, `sheetDetents.opacity`;
- sliding, `1 - p` under reduce.

`springStyle` reads it, and so does a `:style` on the frost span at `:458-465`. No export,
prop or token changes. Leave the normal-motion half alone (11.1.2).

**Witness.** The reduce spec's `fade · a Sheet right`, `· a Sheet bottom` and `· a detented
Sheet` cells also film `[data-slot="glass-graded-halo"]`. On every frame it is present, its
opacity is within 0.02 of the plate's. It enters from 0.02 or less and leaves at 0.02 or less.
- Projects: Chromium and WebKit, 390 and 1440.
- RED on v11.1.0 and RED on `d0f85bd29`, as the tables above read; GREEN after.
- `critic-8/probe/frost.probe.ts` is this reading as a probe and can serve as the cell's
  draft.

### 2. A film's first frame can share its mark's millisecond in WebKit

**The reading.** `r3/raf.mjs` replays the film's own sequence sixty times per form on a plain
page: `startFilm`'s frame callback, then `firstFrame`'s wait, then `markFilm`. It records each
frame's stamp beside `performance.now()` read in the callback.
- WebKit 2287: in 6 of 60 films at each form, the first frame's stamp equals the mark, for
  example `{"mark":9,"t":9}`. Every value is a whole millisecond.
- Chromium 149: 0 of 60 at each form.

`firstFrame` resolves on `frames.length > 0`, and Playwright polls that on the page's own
frame callbacks. So the mark that follows can land in the same millisecond as the first
frame. Then no frame is strictly before it (`film.ts:131`, `f.t < film.mark`).

**What it breaks on the tip.** Two cells in the gate's WebKit 390 parts on `d0f85bd29`:
- `exit · Sheet bottom leaves on the exit curve`: `exitOf` throws by name, with mark 2 and
  first frame 2 (`logs/tip-webkit-phone-0`).
- `fade · a Toast appears and leaves on a fade`: `judgeLeg`
  (`release-11-1-1-reduce.spec.ts:58-60`) reads `before[before.length - 1]` unguarded and
  throws a `TypeError` (`logs/tip-webkit-phone-3`).

The standing judge at `release-11-1-1.spec.ts:1877-1879` reads its start the same way.
`release.sh` stops on the first part that fails, so the gate is red by chance in WebKit on
any pass. Both cells ran green ten times in a row afterwards.

**Cure, in the spec, at the root.** `firstFrame` resolves once the page's clock has passed
the first frame's stamp: `frames.length > 0 && performance.now() - t0 > frames[0].t`. The
mark stamped after it is then strictly later, on any clock resolution. Each judge that reads
the last frame before its mark fails by name when there is none, as `exitOf` does:
- the reduce spec's `judgeLeg`;
- the standing judge.

No bound is widened.

**Witness.**
- `raf.mjs` with the cured wait reads 0 of 60 per form in WebKit 2287.
  - This seat ran it as `r4/raf-cured.mjs`, the probe with only the wait changed: 0 of 60 at
    each form in WebKit 26.5 (build 2287), and 0 of 60 in Chromium 149.
  - The same probe with the tip's wait read 6 of 60 at each form in WebKit (`r3/raf-webkit.json`).
- WebKit 390 parts A and D pass whole on the tip.
- Every v11.1.0 red stays red on its claim.

### 3. The CHANGELOG's reduced-motion sentence is untrue for a glass Sheet

The cure is defect 1. Once the frost layer fades with its plate, the sentence is true as it
stands. If the cure lands, nothing in the CHANGELOG changes.

## Open gaps (for INBOUND)

A. **A long frame lengthens a reduced-motion fade by design.** `runExitClock` advances at most
   16.7 ms a frame, so the 200 ms cap holds on steady frames only. The witness reads the wall
   clock: 227 ms once in ten at load 42 to 46, and 305 ms once in fix 8. At a load of 16, ten
   in ten read 192 to 196 ms. The trade keeps every frame's step small, which is the owner's
   law, so this seat does not file it. A wall-clock bound in the cell will still fail now and
   then on a loaded machine, and the record should say which the release means.

B. **Two vitest cells race the machine's load on both trees.**
   - The DropdownMenu contract's 30 ms focus wait (`menu/contract.test.ts:124`).
   - The aurora atoms fuzz.

   CI's runners are not this machine, but a wait read from the clock is the same class as
   defect 2.

C. **Rows A and B came in after the scope closed at thirteen rows** (carried from critique 7).
   Row A moves a default the scope file does not name. The CHANGELOG names both.

D. **Carried from critique 7:**
   - Row A's tap at a drawn centre (critique 7's gap A).
   - A vetoed drag-dismiss unmounts a detented Sheet under reduced motion (its gap B).
   - Hover scales under reduced motion.
   - The detented Sheet's sub-pixel tail.
   - `glass/dissolve.css`'s tranche path.
   - The `release-10-1-5-critic-*` specs, never run.
   - The 11.1.2 bookings, and the CHANGELOG heading's date at the close.

E. **The frost note's normal-motion half**, and K1 and K2, are 11.1.2 by the note.

## Owed by the fix round

Defects 1 and 2, then:
- the reduce spec's three Sheet cells with the frost layer in the four projects, RED on
  v11.1.0;
- the exits gate whole as `release.sh` runs it;
- the bundle ratchet rebound if defect 1's cure moves bytes;
- the CHANGELOG's sheet size line read again;
- the five gates on the committed tree.
