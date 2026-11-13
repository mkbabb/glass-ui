# 11.0.2 critique, round 1

Seat: a fresh adversarial critic, claude-fable-5-2, 2026-11-12. I built nothing on this branch.
Read: `git log v11.0.1..release/11.0.2`, `build-A.md`, `build-B.md`, `build-C.md` (untracked
when I read it), the four orchestrator notes, and the frozen scope. Tip under test:
`648d70e59`. Every run went through `guarded`, WebKit 2287 under `--exclusive webkit`, one
browser a run, `--workers=1`. **No run was refused.** Paths are relative to
`docs/release-11.0.2/` unless they start with `src`, `tests` or `tests-visual`.

## Verdict

**Not ready to tag. Four defects on the list, one of them by the binding fold note.**

| # | item | verdict |
|---|---|---|
| 1 | every landed row's witness RED on v11.0.1, GREEN on the tip | **RED**: the Slider-at-minimum guard fails on the tip (D-1); the Blob row has no browser witness that is RED on v11.0.1 (D-3) |
| 2 | release-10-1-5 107/107, release-10-1-2/-3/-4 no new failing title | GREEN, both engines |
| 3 | the release-11-0-1 specs | GREEN, both engines |
| 4 | nothing removed or renamed | **RED**: two custom properties are renamed (D-2); exports, files and declarations hold |
| 5 | typecheck, build, demo:dist:build, vitest, verify:package exit 0 | **RED**: `verify:package` exits 1 on the bundle ratchet (D-4); the other four exit 0 |
| 6 | the CHANGELOG entry | **RED** on one sentence ("Nothing is removed or renamed", D-2) and one missing sentence (D-1); the rest is true and outward |

## How it was run

- The v11.0.1 tree is seat A's `git archive v11.0.1` at `.cache/red-v11.0.1/tree`. I checked it
  first: `src/` is byte-identical to a fresh `git archive v11.0.1` (`diff -rq`), and the only
  differing tests are the witnesses the seats copied in. Before my runs I copied the tip's
  11.0.2 spec, config, harnesses, the forced-colors spec and the nine unit witnesses over it
  again (`critic-1/scripts/chain1.sh`).
- Each Playwright call brought its own vite through the config's `webServer` (5341 the tip,
  5342 v11.0.1; the Select probe and the capture used 5343 to 5346), with
  `GLASS_UI_DEMO_URL` set. Scripts are in `critic-1/scripts/`, logs and JSON reports in
  `critic-1/logs/`, the chain's own line per run in `critic-1/logs/chain.out`.
- `chain1.sh` printed `date`'s exit code for the five release gates (its first five lines say
  "exit 0" for all, `verify:package` included, which is wrong). `chain2.sh` ran the five
  again and captured each code; those are the "rc=" lines and the ones this record cites.
- One slip against the machine law: the two 20-second Slider captures ran while my
  coarse-touch run was still going, so for under a minute this seat held two guarded runs.

## 1. Witnesses

### The 11.0.2 cells and the forced-colors spec

`critic-1/logs/v1101-{chco,wk}.json` and `tip-{ch,co,wk-a}.json`. "ch" is
chromium-headless-new, "co" coarse-touch, "wk" Playwright WebKit 2287.

| row | cells | v11.0.1 ch / co / wk | tip ch / co / wk |
|---|---|---|---|
| O-223 with O-244, `dark ·` | 2 | RED / RED / RED (`isDark` false; stored `auto`) | GREEN / GREEN / GREEN |
| O-267, forced colors | 3 | RED / RED / RED (`outlineStyle: none`) | GREEN / GREEN / GREEN |
| O-232, `static ·` | 2 | RED / RED / RED | GREEN / GREEN / GREEN |
| O-269, `fill ·` dark | 2 | RED / RED / RED (hover −0.0044, −0.0078) | GREEN / GREEN / GREEN |
| O-268, `fold ·` | 1 | RED / RED / skipped (245 layouts where 79 are allowed) | GREEN / GREEN / skipped |
| O-273, `--slider-thumb-bg` | 1 | RED / RED / RED | GREEN / GREEN / GREEN |
| O-261, `pager ·` | 1 | RED / RED / RED (neck 300.5, 516.1, 302.1 px) | GREEN / GREEN / GREEN (18.9 px in WebKit) |
| O-263, `wheel ·` | 2 | RED / RED (axes; the wheel cell skips on touch) / RED | GREEN / GREEN / GREEN |
| O-262, `rail ·` | 2 | RED / RED / RED (454.6 px where 89 is allowed; crest 47 px off) | GREEN / GREEN / GREEN |
| O-270, `radius ·` | 2 | RED / RED / RED | GREEN / GREEN / GREEN |
| Slider geometry, `geometry ·` | 2 | RED / RED / RED (371 misses, diameter −4) | GREEN / GREEN / GREEN (worst 0.25, the cap drawn short) |
| O-227, `edge ·` colour | 1 | GREEN / GREEN / skipped (a hold: 11.0.0's colour) | GREEN / GREEN / skipped |
| O-240, `press ·` | 2 | GREEN in all three | GREEN in all three |
| O-241, `cutcap ·` | 2 | GREEN in all three | GREEN in all three |
| O-282, `hover ·` | 13 | GREEN / skipped / GREEN | GREEN / skipped / GREEN |
| O-235, `blob ·` | 1 | GREEN / skipped / skipped | GREEN / skipped / skipped |
| **O-219, `slider · a scrubber at its minimum`** | 3 | GREEN in all three | **RED / RED / RED** (WebKit: md and lg) |

Second reading, against the failure text of every RED cell on v11.0.1
(`critic-1/logs/v1101-*.json`): each fails on the assertion its row names, none on a timeout
or a missing selector. The paint cells read paint: `radius ·` and `fill ·` read screenshots,
the forced-colors cell reads the computed outline and the changed band.

- **O-240, O-219 and O-241 are not RED on v11.0.1**, as the seats say: 11.0.1 closed them and
  the scope allows a kept witness. I did not run v11.0.0; the RED-on-v11.0.0 arm is the
  seats' reading, not mine.
- **O-282's cells are GREEN on v11.0.1 too.** The spec the note demands is on the tree, so
  the blocking clause is met. The owner's shift is not reproduced and not cured (open gap).
- **O-266** is a test-only restatement by the orchestrator's ruling; the 24 O-101 cells are
  GREEN on the tip in all three projects (in item 2's counts).

### Unit witnesses

Nine files, copied onto the v11.0.1 tree and run in both trees
(`critic-1/logs/units-{v1101,tip}.log`): **v11.0.1 19 failed, 61 passed, every file red; the
tip 83 passed, 0 failed.** By row: `useGlobalDark` 3 RED, `blob-breath` 2 RED,
`dockMorphMeasure` 3 RED (the three rail cases), `g-dock-lattice` 2 RED, `worm-dot-px` 1 RED,
`slider.size-tokens` 3 RED, `slider-thumb-bg` 2 RED, `overlay-plate-inline-bound` 3 RED,
`open-input` RED at import (the module does not exist on v11.0.1).

### O-212, O-213's cap and O-214 (the cherry-picks)

`o212/probe.mjs` unchanged, each tree on its own vite (`critic-1/scripts/select-probe.sh`,
readings `critic-1/select/`).

| item | cells | v11.0.1 Chromium | v11.0.1 WebKit | tip Chromium | tip WebKit |
|---|---|---|---|---|---|
| O-212 rows inside the plate | 20 | 14 | 14 | 20 | 20 |
| O-213 anchored 358 px panel | 4 | 2 | 2 | 4 | 4 |
| O-214 pointer open, no ring | 4 | 0 | 0 | 4 | 4 |
| O-214 keyboard open rings the row | 12 | 12 | 12 | 12 | 12 |

### O-227 on the WebKit build the repo's Playwright resolves (2311)

The `edge · a GlassDock page opens and stays alive` cell on the `webkit-2311` project
(`critic-1/scripts/chain3.sh`, `critic-1/logs/edge-2311-{v1101,tip}.log`): **v11.0.1 RED,
`page.goto: Page crashed`; the tip GREEN.** On WebKit 2287 the same cell is GREEN on both
trees, and in Chromium the edge computes 11.0.0's colour at t = 0, 0.5 and 1 on both.

## 2. The older release specs on the tip

| spec | ch | co | wk 2287 |
|---|---|---|---|
| release-10-1-5 | 107/107 | 107/107 | 107/107 |
| release-10-1-2 | 52/52 | 52/52 | 52/52 |
| release-10-1-3 | 60/60 | 58 passed, 2 failed | 58 passed, 2 skipped |
| release-10-1-4 | 23/23 | 23/23 | 15 passed, 8 skipped (`page.pdf` is Chromium's) |

The two coarse-touch failures are the D-1 summary-glyph cells (critique-3 and critique-7).
Both are in the 11.0.1 close's coarse-touch set
(`../release-11.0.1/close/suite/coarse-touch-failed-titles.txt`, lines 374 and 375) and in
the v11.0.0 baseline, so no title fails here that passes on v11.0.1. The eight `O-101 ·`
titles that set lists for all three projects now pass (the restatement). The close's two
WebKit harness hangs (q2 at 1440, the `page.pdf` context close) did not occur.

## 3. The release-11-0-1 specs on the tip

| spec | ch | wk 2287 |
|---|---|---|
| release-11-0-1 (owner cells) | 9/9 | 9/9 |
| release-11-0-1-daraksha | 2/2 | 2/2 |
| release-11-0-1-fix-2 | 14/14 | 14/14 |
| release-11-0-1-critic-1, -1b | 22/22, 2/2 | 22/22, 2/2 |
| release-11-0-1-critic-2 (the pixel reader) | 9/9 | 9/9 |

Read by title in both reports: `o3 every frame of the expand and of the collapse paints a
round end` passes; the four `f4 … the prerendered figure dock … no script: corners and paint`
cells pass; critic 2's `m`, `s` and `v` end-in-paint cells pass in light and dark at 1440 and
390.

Under the coarse-touch project the same files are 56 of 58: the two failures are critic 1's
`a light-1440f` and `a dark-1440f`, which assert `(pointer: coarse)` is false on their first
line and fail in 43 ms on a touch project by construction. The file is byte-identical on
v11.0.1 and no glass code runs before the assertion. Not a regression; those cells belong to
the fine-pointer project.

## 4. Nothing removed or renamed

Against the published tarball (`npm pack @mkbabb/glass-ui@11.0.1`, unpacked in the scratchpad)
and the tip's own build:

- **`package.json`**: `exports` (69 entries), `files`, `main`, `module`, `types`,
  `sideEffects`, `peerDependencies` and `dependencies` are equal.
- **File list** (`npm pack --dry-run`, 891 files against 889): nothing a consumer can name is
  gone. Three content-hashed chunks changed their hash (`dark-`, `select-`, `tabs-`); two
  declaration files are new (`blob/composables/bodyBreath.d.ts`, `select/openInput.d.ts`).
- **Declarations**: no `.d.ts` is missing. Four differ, and apart from comments the changes
  are two additions: `BODY_BOX_HALF` and `storageKey?: string`.
- **Published class names**: the roster reads 291 against a datum of 291 (from the trial in
  D-4).
- **Custom properties** (declared in `src`, 1116 on v11.0.1 and 1121 on the tip; the same
  pair is missing from the built CSS): seven added, **two deleted**, see D-2.

## 5. Gates on the committed tree

`critic-1/logs/chain.out`, the `rc=` lines, at `648d70e59`:

| gate | exit |
|---|---|
| `npm run typecheck` | 0 |
| `npm run build` | 0 |
| `npm run verify:package` | **1** (D-4) |
| `npm run demo:dist:build` | 0 |
| `npx vitest run --maxWorkers=2` | 0: 276 files, 2533 passed, 10 expected fail, 1 skipped |

Seat C's own last vitest (`logs/vitest-final2-C.log`) shows one failure, the boot-graph
build arm on a stale `dist-demo/`; after a demo dist build it passes, as above.

## 6. The CHANGELOG entry

Read clause by clause against the diff. Outward prose, no internal id, no paragraph with
more than one em dash (the heading holds the entry's only one). Moved values that are named
and that I checked in the source: `--glass-edge-floating` 5% and `--glass-edge-dock` 8%; the
dark `--dock-control-{hover,press,active}-bg` at 8%, 11% and 14% of `--foreground`; the
per-axis `overscroll-behavior`; the trigger and tab corner
`calc(var(--dock-control-size) / 2)` with `--dock-control-radius` still read by all three
seats; `--slider-thumb-bg`; `--slider-thumb-size-*` no longer sizing a scrubber's thumb;
`data-open-input`; `Highlight` at 2px. No clause is left from the reverted row.

Two faults, both below: the opening sentence (D-2) and the Slider clause's silence about
the minimum (D-1).

## Defects

### D-1. The Slider geometry lands with its own minimum guard RED (items 1 and 6)

`slider · a scrubber at its minimum draws its value` passes on v11.0.1 and fails on the tip:

| rung | v11.0.1 ch | tip ch | tip co | tip wk |
|---|---|---|---|---|
| sm | 12.19 | 7.95 | fails | 8.26 (passes) |
| md | 10.59 | 6.90 | fails | 7.05 |
| lg | 9.22 | 6.32 | fails | 6.44 |

(the mean channel difference between the track's leading and trailing end; the floor is 8.)

Re-read in paint: `critic-1/capture/slider-min-{tip,v1101}-{light,dark}.png`, the harness at
3x. On v11.0.1 the fill's ink shows as a crescent round the thumb. On the tip the thumb
covers the fill whole, and in light a cream disc sits on an off-white track with nothing of
the fill's colour anywhere: the value's ink is gone at the minimum. The geometry is right;
the paint that made the minimum legible went with it.

Seat C recorded this as open and asked for a ruling. It is on my list twice: a landed row's
witness is RED on the tip, and the CHANGELOG's Slider clause does not say that the fill no
longer shows round the thumb. Either the floor is restated for a thumb that fills the band
(with the paint judged, not just the number lowered), or the paint that restores the
minimum's contrast is admitted. That is the orchestrator's call, not a critic's.

### D-2. Two custom properties are renamed, and the CHANGELOG says none is (items 4 and 6)

`--dock-plate-collapsed-border` and `--dock-plate-expanded-border` are gone from `src` and
from the built CSS; `--dock-plate-collapsed-edge` and `--dock-plate-expanded-edge` replace
them, and the type changed with the name (a colour became a percentage). On v11.0.1 they are
set in `shell.css:148,150`, `morph.css:382` and `adaptive-legibility.css:100` and read at
`dock.css:134-135`. A site that set either one loses it silently. The entry opens with
"Nothing is removed or renamed" and its dock-edge clause names `--glass-border-dock` only.

Seat B flagged the rename for a critic to judge. By the list it is a deletion. The cure that
removes nothing keeps the old names alive as inputs, or the rule is waived by the owner and
the entry's first sentence and the edge clause say what moved. The same clause already
admits that the dock stopped reading `--glass-border-dock`; that is a removed hook too, named
honestly, and the opening sentence contradicts it.

### D-3. The Blob row has no browser witness that is RED on v11.0.1 (item 1)

The vitest witness is real: two cases RED on v11.0.1, GREEN on the tip. The one browser cell
the row asked for (`blob · from 100 ms after a sweep and release …`) passes on v11.0.1 in
Chromium and skips in WebKit and on touch. Seat B says so and calls it a hold. So the
user-visible claim ("could flash a flat square") is witnessed in neither engine. Either a
cell that catches the frame seat B's diagnostic caught at 150 ms, or a ruling that the
simulation test carries the row.

### D-4. `verify:package` exits 1: the bundle ratchet was not rebound (item 5)

`G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2916186 > 2911472`
(`critic-1/logs/verify-package.log`). `.bundle-ratchet` still holds 11.0.1's datum; the
package grew 4714 bytes. No seat ran this gate. With the file set to 2916186 for one run and
restored (`critic-1/logs/verify-package-rebound-trial.log`) the verifier is CLEAN: 196
claims, 460 declarations, roster 291 of 291. So the rebind is the whole cure, on the tree
that will be tagged.

### D-5. The fold-content row is absent (the binding note, not items 1 to 6)

`orchestrator-note-dock-fold-content.md` tells a critic that finds the row absent to file a
blocking defect. It is absent: no commit, cell or CHANGELOG clause for content standing
outside the plate through the fold, or for a slotted control keeping its own `transition`.
Seat C lists it under "Not taken". It is outside my six items and filed here only on that
note's instruction.

## Open gaps, for INBOUND

- **The row-overflow regression of 11.0.1 is still on the tip.** Its cure was reverted
  (`648d70e59`) after it cut focus rings in WebKit (release-10-1-5 k3 and s2). fourier's rows
  still overflow by 4 to 8 px. The scope lists the row for this release.
- **The pager "giant rectangle" reproduction was not done.** The scope asks for eight dots,
  hops of 1, 3 and 7 and a host-set `--pager-dot-size` on both trees, and a statement either
  way. `build-C.md` does not mention it; the `pager ·` cell covers neighbour hops only.
- **The hover shift is guarded, not cured.** 0 px on both trees in both engines; no consumer
  page was read; the vertical dock's hover-only `will-change: transform` is untraced.
- **A pointer-opened Select marks its focused row with nothing under forced colors** (seat
  B's finding on the shared cherry-pick; `menu.css` has no forced-colors block).
- **Row stamps in two test headers** from the cherry-picks:
  `tests/styles/overlay-plate-inline-bound.test.ts:1` and
  `tests/components/select/open-input.test.ts:1`.
- **`--corner-shape-thumb` is read by nothing now.** The token is still declared
  (`src/styles/theme/radius.css:275`) and `DESIGN.md:417` still calls it the spectrum
  slider's knob.
- **The layout-count claim has no WebKit arm** (no counter there); its WebKit evidence is
  that the fit-edge and host-change titles hold.
- **`build-C.md`, the four orchestrator notes and seat C's scripts and logs are untracked**,
  and `build-C.md` ends on an unfilled `CHAIN11_RESULT`. Seat C's last chain did not finish
  its Chromium leg. My runs cover what it owed.
- **Two critic-1 cells fail by construction on the coarse-touch project** (item 3); they
  want a project guard.
- **Not measured: real Safari, and v11.0.0.** Every WebKit cell is Playwright WebKit.
