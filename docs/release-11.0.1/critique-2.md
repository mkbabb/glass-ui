# 11.0.1 critique, round 2

Critic: claude-fable-5-2, fresh; built nothing on this branch. Tree: `release/11.0.1` at
`3641e5ca5` (the merge is `81486dbd2`; fix 2 is `8f4a5eb47`). Gated on the six-item list,
with fix 2's A1 witness as the orchestrator's ruling adds, and nothing else. Every build,
test and browser run went through `~/.claude/guard/guarded` (WebKit 2287 under
`--exclusive webkit`), one at a time; **none was refused**. Paths are relative to
`docs/release-11.0.1/` unless they start with `src`, `tests` or `/`. Rows:
`critic-2/runs/runs.txt`; gates `critic-2/logs/gates.txt`.

## Verdict: CLEAN. No finding

Every item on the list holds in Chromium and WebKit 2287. Fix 2's three cures reproduce,
and the two things fix 2 left unread are now read and hold: the morph corner is a circle
**in the pixels** of captured frames (not only as computed radius times scale), and the
vertical arm of the morph rule works. Three cells failed once each during the passes;
each was read twice and none is the tree (below, *Failures read twice*).

## What I added to the reading

`tests-visual/release-11-0-1-critic-2.spec.ts` with two scenes in
`tests-visual/release-11-0-1/critic-2.ts`. It fills the plate opaque, captures twelve
frames at 3x through each morph as fast as the engine gives them, and measures the
silhouette's two ends against a circle of half the cross extent at three depths. This
sees the engine's corner clamp, which the computed reading (o3, critic 1's d) cannot.

| cell | merged, Chromium | merged, WebKit 2287 | v11.0.0, Chromium |
|---|---|---|---|
| m figure dock, expand and collapse, light and dark, 1440 fine and 390 coarse (8 morphs, 96 frames per engine, 7 to 12 mid-morph each) | 0 frames off; worst 0.74 px | 0 off; worst 0.59 px | all 96 off, 9 to 15 px |
| v vertical dock, expand and collapse, light 1440 and dark 390 coarse | 0 off; worst 0.65 px | 0 off; worst 0.49 px | all off, 10 to 17 px |
| s open dock, wide face to its one-seat face and back | 0 off; worst 0.59 px | 0 off; worst 0.41 px | all off (the narrow face's end inset 0 px: the cut) |
| k a dock with 11.0.0's `expandOn="press"`: Tab onto the folded summary | stays folded, focus on the summary; Enter opens | the same | the same |

The threshold is 1.5 px; a flattened 13 x 28 end reads about 8 px off, and the v11.0.0
arm shows the reader sees it. Frames: `critic-2/runs/c2-shots/` (for example
`m-dark-1440f-wk-collapse-03.png`, a capsule at scale 0.49), v11.0.0's under
`c2-shots-v1100/`. The s cell first failed on my own assertion that a face switch sets
`data-morphing`; it does not (the box takes the new width on the first frame), so the
cell was restated to read every frame and re-run (`c2-s-{ch,wk}.log`).

k is there because 10.1.5's keyboard reopen (`onSummaryFocusIn`, `GlassDock.vue`) calls
the first-seat focus even when `onFocusIn` declines under press-only. The folded face is
inert, so the focus call lands nowhere and 11.0.0's contract holds; measured, not assumed.

## The list, item by item

### 1. The 10.1.5 invariants, by their witnesses, both engines: HOLD

`release-10-1-5.spec.ts` as two processes per engine: Chromium 84 + 23 = **107/107**;
WebKit 2287 84 + 22 of 23 in the pass, with p2 failing one of its cells once at a
1-minute load of 32 and then **6/6 alone** (below), so 107 cells green. g6:
`release-10-1-4` 23/23 Chromium, WebKit 14 + 8 skips with F-4 failing once at load 33
and then 15/15 alone; `release-10-1-3` Chromium 59/60 with D-1 at load 17 (A/B below),
WebKit 58 + 2 skips. `u-b7` 21 + 1 skip. Invariant 11: no line added to `src` over
v11.0.0 carries a row, round or seat id; no export removed (item 3).

### 2. The owner's named cells, in paint: HOLD

- **The wide label seat's plate is a capsule.** Critic 1's a cells (plate ink isolated,
  the row under its top edge against a stadium and an ellipse), light and dark, 1440 fine
  and 390 coarse: green in both engines. I looked at the captures:
  `critic-2/runs/c1-shots/a-light-1440f-ch-name-hover.png`, `a-light-390c-wk-name-active.png`
  (both plainly capsules). The release's o1 and daraksha's own page read the seat at
  `20px` on a 90 x 35 box. daraksha renders both of the owner's seats ("Name ›" in
  `SiteDock.vue`, "Focus" in `ReaderDock.vue`) as `DockControl compact`, the class the cure
  is on.
- **The dock's end is round at rest, collapsed, and open on a narrow face.** o2 (house
  tokens and `--radius-dock: 1.875rem`) and critic 1's b cells, all four modes, both
  engines; captures `b-dark-390c-wk-rd-collapsed-end.png`, `b-dark-1440f-ch-rd-narrow.png`,
  `b-light-390c-ch-house-collapsed-end.png`: capsules.
- **Every morph frame.** o3 (restated to paint by fix 2), critic 1's d (0 of 65 to 67
  frames off per morph in Chromium, 0 of 33 to 35 in WebKit) and the pixel reading above.
- **Before the script runs (A1).** Fix 2's f1 to f4, 14/14 in both engines: the
  script-free prerendered cell paints 28 px (30 coarse), first ink 13 to 14 px in at the
  row 4 px under the top; the measured value lands on the same length. Critic 1's e:
  equal published and unpublished.
- **daraksha's pages** (copies in `daraksha-repro/`, differing from
  `~/Programming/daraksha-wt/o1110-finish/test/glass-repro/` only in the dock import):
  `dock-cutcap.html?radius-dock=1.875rem&active=page&end=1` collapsed and open: box and
  plate `28px` x 4, run overflow 0, seat 90.2 x 35.25 at `20px`, both engines.
  `dock-press-scroll.html`: presses 1, scrollLeft 0, 113/113. That one is booked for
  11.0.2; it did not reproduce and was not touched.

### 3. Nothing 11.0.0 shipped is lost: HOLDS

Against the installed `@mkbabb/glass-ui@11.0.0` package and the build of `3641e5ca5`:
`package.json` equal but for the version (69 export keys each); the `dist` file list
equal with hashes stripped (885 files); every `.d.ts` byte-equal except
`slider/types.d.ts` (a comment) and `dock/composables/useDockClickIntegrity.d.ts` (two
handlers gone from a composable no entry exports). Custom properties declared in `src`:
none removed; the changed values are the seven the CHANGELOG names. 11.0.0's own changes
in source: `expandOn`, `anchor`, `collapsedLabel` intact (k above); no hover scale; the
radius tokens untouched; the rounded and card collapsed corners kept by
`:not(.shape-pill)`; `overscroll-behavior`, `--hover-ink-mix` as on master. The release
workflow and `scripts/` are byte-equal to master.

### 4. No name 11.0.0 removed survives: HOLDS

Each removed name counts the same in `src` and `demo` at HEAD as at v11.0.0 (zero, or
the same comment lines and the unrelated `MenuTrigger` context type), and no added line
names one.

### 5. The gates on the committed tree: ALL EXIT 0

`3641e5ca5`, clean: build 0, typecheck 0, demo:dist:build 0, vitest 0 (270 files, 2511
passed, 10 expected fail, 1 skipped), verify:package 0 (ratchet 2911439).

### 6. The CHANGELOG entry: ACCURATE

Fix 2's wording matches the source (`--dock-cross`, its two fallbacks, the morph rule).
Every changed value in my own census of declarations (v11.0.0 against HEAD) is named
with old and new value; the three new tokens and the two written properties are named.
No internal id, path or seat vocabulary.

## Failures read twice

| cell | first reading | second reading |
|---|---|---|
| D-1, `release-10-1-3`, Chromium | 2.08 px against 2, at load 17 | A/B against a v11.0.0 archive tree, three rounds each, alternating: merged 31, 31, 30/31 (2.08 at load 30); v11.0.0 31, 30/31 (2.00 at load 38), 31. The same cell fails on both under load: not the merge (`critic-2/runs/d1-ab/ab.txt`) |
| p2, WebKit coarse, "v 350->348" | one seat step of 0.98 px at the settle, at load 32 | alone, three repeats per pointer: 6/6 at load 13 to 16 |
| F-4, `release-10-1-4`, WebKit | 2 against 1, at load 33 | alone, three repeats: 15/15 at load 10 |
| critic 1's c, light 390 coarse, WebKit | the dock missing mid-run | mine: I unpacked the v11.0.0 tree into the served root during that run and the dev server reloaded the page; alone it passes |

Another session drove the load to 30 to 38 during the WebKit chain.

## For INBOUND (outside the list; none counts against clean)

- **A fitting dock within a ring's room of its content does scroll a few pixels.** The
  CHANGELOG's focus-ring entry says "the dock does not scroll"; in the band where the
  controls fit with less than the ring's room it scrolls by at most that shortfall, which
  is how the end ring is shown. Optional clause: "and the dock scrolls by no more than
  those few pixels".
- **A vertical dock's width steps on the first frame of its morph** (64 to 58 px
  collapsing, back on expanding; 68 and 61 coarse). The same on v11.0.0.
- **Tab-shaped seats and `DockTrigger` rest on `--radius-pill` (16 px)**, so on a 38 to 40 px
  seat their plate is a rounded bar, not a full capsule (not an ellipse either). That is
  11.0.0's pill rung; daraksha's surah button is one.
- **A cut end can still flatten mid-morph on a run that overflows** (fix 2's recorded
  bound: the plate's cut-cap keyframes are not counter-scaled).
- **The leaving face's label paints over the persistent seat mid-collapse**
  (`critic-2/runs/c1-shots/c-dark-1440f-ch-collapse-4.png`: a ghost "Name ›" under the
  theme seat). The crossfade's own behaviour, not the corner.
- Carried from critique 1, unchanged: k3's early return in WebKit at 320 coarse; the
  re-aim guard keeps a pointer position after the pointer has left (an owner-opened dock
  defers a press within 6 px of it); the dark hover and active plate differ from the dock
  by 3 to 6 of 765; the 10.1.5 section's own row ids; the dev server's failed dependency
  scan over the missing `./v1014/` copy; real Safari not measured.

## What ran

| run | Chromium (`chromium-headless-new`) | WebKit 2287 |
|---|---|---|
| gates | all exit 0 | |
| owner cells, daraksha pages | 9/9, 2/2 | 9/9, 2/2 |
| fix 2 f1 to f4 | 14/14 | 14/14 |
| critic 1 paint spec | 22/22 | 21/22, then the one cell alone 1/1 |
| 10.1.5 release spec, parts A and B | 84/84, 23/23 | 84/84, 22/23; p2 alone 6/6 |
| g6 `release-10-1-4`, `release-10-1-3` | 23/23; 59/60, D-1 A/B above | 14 + 8 skips, F-4 alone 15/15; 58 + 2 skips |
| `u-b7` | 21 + 1 skip | no WebKit project |
| critic 2 paint spec | 9/9 (s restated) | 9/9 (s restated) |
| critic 2 paint spec on v11.0.0 | 8 RED, k green | not run |

The `rc=0` on the `v1100-c2-ch` and `c1-rerun-wk` rows of `runs.txt` is `date`'s exit
code, a slip in my driver; the pass and fail counts beside them are Playwright's. The
v11.0.0 archive tree (`./v1100`) is deleted. Not measured: real Safari.
