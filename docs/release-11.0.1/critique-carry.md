# 11.0.1 carry critique: the morph chrome read against the layers box

Critic: claude-fable-5-2, fresh; built nothing on this branch before this pass. Under
review: `9bd02b5f3` (cherry-pick of release/10.1.5's `314ce60fc`, the conflict in
`src/components/dock/composables/dockMorphMeasure.ts` resolved by hand) and `7e72f7796`
(the D-1 witness). Gated on the six-item list (a) to (f) and nothing else. Every build,
test and browser run went through `~/.claude/guard/guarded` (WebKit 2287 under
`--exclusive webkit`), one at a time; **none was refused**. Paths are relative to
`docs/release-11.0.1/` unless they start with `src`, `tests` or `/`. Rows:
`critic-carry/runs/runs.txt`; gates `critic-carry/logs/gates.txt` and `gates-2.txt`.

## Verdict: CLEAN on the list. Two commits of my own

Every item holds. I made three small commits the list asks for: the ratchet rebind
verify:package demanded (`3e27437fb`, 2911439 to 2911472, +33 B), and the CHANGELOG
clause for this cure (`fde96c880`, its figure corrected in the commit that carries this
file). One thing outside the list matters for the tag and is first under *For INBOUND*:
the eight `O-101 ·` cells still fail on the tip exactly as they fail on v11.0.0.

## The list, item by item

### (a) The hand resolution: RIGHT. No path double-reads or skips the layers box

Read against both parents (`git show 314ce60fc`, `git show 9bd02b5f3`, and
`git diff release/10.1.5 HEAD` on the file).

- The carry's hunks are 10.1.5's hunks one for one: `restSize` takes `layers` and its
  delta is `chrome - (size - layers)`; the rest chrome is `root - layers`; `runEdge` is
  `layers - client`; three comments. The only difference is where the two `restSize`
  calls sit, because 11.0.0 wrapped them in its rest read.
- **At rest expanded**: the chrome is `rootNow - layers` (one layers read) and the
  endpoint is `rootNow`. `restSize` is not called, so the layers box is read once. On
  10.1.5 the same path calls `restSize` with the chrome just read; its delta is then
  zero and it returns the root's box, the same number.
- **At rest collapsed**: `collapsedChrome = rootNow - layers`, `collapsedPx = rootNow`,
  and the expanded endpoint goes through `restSize(root, layers, full, summary, …,
  expandedChrome)`, which reads the layers box with the full pane in flow. This is the
  path the cure is for, and it has the layers argument.
- **Morphing**: `rootNow` is 0 and unused (both uses are behind `!morphing`); no chrome
  is latched; both endpoints go through `restSize` with `layers`.
- **`runEdge`** is written only at rest with the run active, as `layers - client`, so
  the rest port a host-moved endpoint derives, `expandedPx - expandedChrome - runEdge`,
  is `expandedPx - root + client`: the run's client box, as the commit says.
- No reader of the old pane-based chrome is left: `expandedChrome`, `collapsedChrome`,
  `runEdge` and `restSize` are named only in this file, and every `getSize(pane…)` that
  remains is in `first`/`anchor`, which do not take a chrome.

Second reading, against the trace: on a `git archive` tree of `bc30490cc` (the tip
before the carry) the O-101a reversal (390->1440) cell fails 6/6 in Chromium, 4/6 on
coarse-touch and 6/6 in WebKit 2287, reserving **980 for 976** (1060 for 1056 coarse).
On the tip it passes 6/6 in each. The over-reserve on this line is 4 px, not 10.1.5's
7 px: 11.0.0 has no hover scale, so one reserve box is the ring's 4 px. That the size
of the error tracks the reserve box is what the commit's diagnosis predicts.

### (b) `release-10-1-2.spec.ts`, whole, three projects: NO title outside the v11.0.0 set

| project | tip | failing titles | not in the v11.0.0 set | v11.0.0-failing titles that now pass |
|---|---|---|---|---|
| chromium-headless-new | 44 passed, 8 failed | the eight `O-101 ·` reversal and mid-expand cells | none | none |
| coarse-touch | 44 passed, 8 failed | the same eight | none | none |
| webkit (2287) | 44 passed, 8 failed | the same eight | none | none |

Title sets: `critic-carry/runs/r2-{ch,co,wk}-failed-titles.txt`, built with the
baseline's pipeline and compared with `comm` against `baseline-v11.0.0/*-failed-titles.txt`.
D-1 passes 4/4 on coarse-touch, reading as ruled (no hover fill on the enabled trigger
where the pointer cannot hover, every disabled arm still read), and 4/4 in the two
hovering projects.

**None of the eight v11.0.0-failing O-101 titles passes on the tip.** They fail with
v11.0.0's own messages, value for value (settled 160, reserved 390; settled 592,
reserved 160; settled 152, reserved 584; settled 584, reserved 152; the coarse figures
172/640/164/632 likewise). That is a different and much larger defect than the one this
carry cures; see *For INBOUND*.

### (c) The O-101a reversal (390->1440) cell: 6 of 6 in each project

`rev6-ch`, `rev6-co`, `rev6-wk`: 6 passed each. RED arm on `bc30490cc` above
(`pre-rev6-*`).

### (d) The release specs: GREEN in both engines

| spec | Chromium | WebKit 2287 |
|---|---|---|
| `release-10-1-5`, parts A and B | 84 + 23 = 107/107 | 84 + 23 = 107/107 |
| `release-10-1-4` | 23/23 | 15 passed, 8 skipped |
| `release-10-1-3` | 60/60 | 58 passed, 2 skipped |
| `release-11-0-1` (owner cells) | 9/9 | 9/9 |
| `release-11-0-1-fix-2` | 14/14 | 14/14 |
| `release-11-0-1-critic-2` (pixel reader) | 9/9 | 9/9 |

No cell failed once, so nothing needed reading alone: D-1 of `release-10-1-3`, p2 and
F-4 all passed in their first pass (1-minute load 9 to 23 through the chains).

### (e) The gates on the committed tree: ALL EXIT 0

At `fde96c880`, clean (`critic-carry/logs/gates-2.txt`): build 0, typecheck 0,
demo:dist:build 0, vitest `--maxWorkers=2` 0 (270 files, 2511 passed, 10 expected fail,
1 skipped), verify:package 0 (terminal CLEAN, ratchet datum 2911472 equal to the
unpacked bytes). The commits after `fde96c880` touch `CHANGELOG.md` and `docs/` only,
neither of which is in the package or a demo source.

The first pass, at `7e72f7796`, is in `gates.txt` with two exit 1s, both read:

- verify:package: `bundle ratchet increase forbidden: 2911472 > 2911439`. The carry adds
  33 bytes. Rebound to 2911472 in `3e27437fb`.
- vitest: one failure, `tests/gates/boot-graph.test.ts` "the dist-demo it measures is
  NEWER than every source". My driver ran vitest without the demo build before it. With
  the build first (the second pass) it passes. Mine, not the tree's.

### (f) The CHANGELOG: the cure is now named

The 11.0.1 entry did not mention it. I added one clause to the focus-ring bullet, in
outward prose: the ring's room is measured the same way open and folded, so a dock
reopened while it is still closing, as the window changes width, takes its final width
at once instead of holding a few pixels too much for a frame. It states what 11.0.1
does and does not claim 11.0.0 had the fault, since on 11.x the fault existed only
between the merge and this carry.

## For INBOUND (outside the list; none counts against clean)

- **The eight `O-101 ·` cells are an 11.0.0 regression that 11.0.1 still ships.**
  v10.1.4 passes them (the 10.1.5 close's A/B), v11.0.0 fails all eight in all three
  projects, and so does this tip. When a dock's content changes at a breakpoint while
  the dock is opening, or while a close is reversed into an open, every later frame of
  the animation keeps the old content's width or height (592 px held for a dock that
  settles at 160, or 160 held for one that settles at 592), then snaps at the settle.
  By the orchestrator's ruling these are not a regression against v11.0.0, so they do
  not block this tag, but 11.0.1 does not improve them and a 10.1.x consumer moving to
  11 gains the fault. A lead, not verified: 11.0.0 changed the pane MutationObserver
  from capturing to re-observing only (`if (!observer) capture()`,
  `dockMorphMeasure.ts`); the 10.1.x line captures there, and v10.1.4 passes these cells. The
  O-101a cells (the host changes, the content does not) pass, which fits. The dev
  server logs "ResizeObserver loop completed with undelivered notifications" during
  these cells. Suggest booking it for 11.0.2 with these eight titles as its witness.
- **The 10.1.5 CHANGELOG does not name this cure either** (release-10.1.5 worktree, not
  mine to write).
- **Two of the three v11.0.0 title sets are untracked** on this branch
  (`baseline-v11.0.0/coarse-touch-failed-titles.txt`, `webkit-failed-titles.txt`, with
  the baseline's reports, lists and scripts, and edits to its README and to
  `orchestrator-note-deadline.md` and two orchestrator notes). They are another seat's;
  I read them and left them as found. The close will want them committed, since (b)
  and the suite comparison cite them.
- **The 11.0.1 WebKit configs do not match `release-10-1-2.spec.ts`**
  (`release-11-0-1.config.ts` narrows the project's `testMatch`). The spec runs in
  WebKit through `tests-visual/webkit-2287.config.ts`. My first WebKit pass found no
  tests for that reason (rows `r2-wk`, `rev6-wk` at 23:37 with no counts) and was
  re-run as `wk-1b`.
- Not measured: real Safari. Every WebKit cell is Playwright WebKit 2287.

## What ran

Drivers: `scripts/carry-queue.sh` over `carry-gates.sh` and `carry-chain.sh`, then
`carry-gates-2.sh`, then `carry-pre.sh`. Ports 5431 (Chromium projects), 5432 (WebKit),
5433 and 5434 (the `bc30490cc` tree); nothing listens on them now. The `bc30490cc`
archive tree under `.cache/carry-pre` is deleted. The `head=` column of `runs.txt` moves
from `3e27437fb` to `fde96c880` during the chains because the ratchet and CHANGELOG
commits landed while they ran; `src` and `tests-visual` are identical from `7e72f7796`
on. I edited `carry-chain.sh` (the WebKit config for the 10.1.2 steps) while the
Chromium chain was running it; that chain's rows and guard log show no stray step. The
pixel reader's captures (10 MB, the same scenes as `critic-2/runs/c2-shots/`) were not
kept.
