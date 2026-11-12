# 10.1.5 — critique, round 16 (adversarial, gated on the finite list)

Critic: claude-fable-5-2, fresh context. Branch `release/10.1.5` at `86c68aa50` (fix round 15: the
CHANGELOG entry for W1, prose only; `git diff 82b06b7ba..HEAD` touches `CHANGELOG.md` and nothing
else, so `src` and `tests-visual` are byte-equal to the tip critique 15 measured). I read the
commit log over `v10.1.4`, `critique-15.md`, the fix-15 diff and
`orchestrator-note-fable-review.md`, which binds this round: the scope is frozen at O-207, and I
gate only on its item 2 list, on its matrix (390 coarse and 1440 fine, 320 and 844 where a named
witness reads them, LTR), with the named witnesses. Anything else is in *For INBOUND* and does not
count against clean. The two one-off measurements were taken in round 13 and are not repeated.

Every browser run, build and test went through `guarded` (WebKit 2287 under `--exclusive webkit`),
one run at a time. **None was refused.** Drivers: `scripts/queue-critic-16.sh`,
`scripts/chain-critic-16.sh`, `scripts/gates-critic-16.sh` (round 15's, pointed at `critic-16/`);
summary `python3 -I scripts/critic-16-summary.py <project>`. Rows bank to `critic-16/`
(`runs.txt` and `queue.txt` list every run with its load). I wrote no harness scene and no spec.

## Verdict

**Clean. No finding.**

Fix 15's W1 cure reproduces against the source. Every invariant on the list holds in Chromium and
WebKit 2287. The release spec is 107/107 in Chromium and 107/107 in WebKit (84 + 23, two
processes). g6 is GREEN in both engines and g7 is GREEN.

This is the first clean round. The note asks for two in a row; the next critic's clean round on
this tip (or on a tip that differs only in records) closes the loop.

## Fix 15's cure, reproduced

- **The header counts five and names the fifth.** `CHANGELOG.md:8-14`: "Five token values move",
  ending "and `--glass-level` on a static-backdrop dock's plate (the root's inherited 0 to 1,
  O-157)".
- **The entry matches the source.** "A static dock's plate takes the consumer's veil (O-157)" says
  the plate now declares `--glass-level: 1` and paints the veil over an opaque `--card`, with the
  root kept at 0. `src/components/dock/styles/adaptive-legibility.css:80-83` holds the root's
  `--glass-level: 0`; `:92-96` is the plate's `--glass-level: 1` and
  `background: linear-gradient(var(--glass-veil), var(--glass-veil)), var(--card)`. At v10.1.4 the
  file declares `--glass-level` once, on the root (`:81`).
- **The count is right.** I rebuilt the table independently: every custom-property declaration on
  an added or removed line of `git diff -U0 v10.1.4..HEAD -- src`, each name looked up at v10.1.4.
  The existing names are seven: `--dock-cap-rest`, `--control-text`, `--control-text-sm`,
  `--shadow-color`, `--liquid-fill-tint`, `--glass-level` (all now named, with the coarse pair
  counted as one move, so five), and `--glass-specular-intensity-hover` (the same value, moved
  inside `(hover: hover)`). Each named value was then read at both refs (`run.css:664` against
  v10.1.4 `:468`; `light-dark.css:34-35` against `sizing.css:35-36`; `dark-arm.css:92`;
  `slider/styles.css:146-157` against v10.1.4 `:141`) and agrees with the CHANGELOG's words.

## The list, invariant by invariant

Each row was read from the run's report (a per-witness tally of `branch-ch.json`,
`partA-wk.json` + `partB-wk.json`, zero non-passed in either engine), and then against the banked
rows and captures.

| # | invariant | Chromium | WebKit 2287 | reading |
|---|---|---|---|---|
| 1 | rest corner | holds | holds | g1 x4, e1 x4, e4 x2, k3 x2, l1 x12, q1 x2, m4 x4 GREEN; c12b LTR (390 coarse, 1440 fine, 390 fine; 27 caps each): at all 16, 17 and 16 flagged caps the four corners are equal at rest and under hover, 0 uneven, in both engines |
| 2 | collapsed | holds | holds | g2 x2, m1 x6, s1 x2 GREEN |
| 3 | true overflow | holds | holds | g1 (overflow), h1 x2, k2 GREEN; every unflagged c12b cap hides a seat and cuts the trailing side only (`30px 25.96px 25.96px 30px` at 390 coarse, `28px 24px 24px 28px` fine, the same in both engines) |
| 4 | ring | holds, with the recorded vertical bound | same | c4 x2, e2 x3, e3 x2, k1 x2, s2 x2, t1 x2 GREEN; c12b LTR: first ring cut 0 and end ring cut at most 0.11 px (Chromium) and 0.23 px (WebKit) at all 27 caps of the three cells, the flagged run scrolling at most 8 px; c12a: 1, 2, 3, 4 px at the four stages of the yield band (1440: 320 to 314; 390 coarse: 344 to 338), identical in both engines, light and dark, which is the bound the CHANGELOG states (capture `critic-16/probe/chromium-headless-new/c12a-390-light-stage342-last.png`: the ring whole but for its lowest 2 px) |
| 5 | morph edges, static host | holds | holds | n1 x2 GREEN in the pass; WebKit alone: n1 24/24 (12 per pointer) and u1 2/2 |
| 6 | morph, host resize | holds | holds | p1 x2, p2 x2, s4 GREEN; no new door opened |
| 7 | consumer markup | holds | holds | q1 x2, q2 x2, q3 x2, r1 x2 GREEN; q2 alone in WebKit 8/8 |
| 8 | Slider, type, menu | holds | holds | g3, c1, c3, m3 O-167 x2; g4, c2; g5 GREEN |
| 9 | one-row cures | holds | holds | f1, f2, m3 x15, m5 x8, s3 GREEN |
| 10 | regression gates | holds | holds | g6 `release-10-1-4` 23/23 and 15 + 8 skips (`page.pdf`); `release-10-1-3` 60/60 and 58 + 2 skips (the spec's own WebKit skips), D-1 and F-4 GREEN in both at 1-minute load 7 to 9 (no A/B needed); g7 all exit 0 |
| 11 | source and records | holds | — | the note's grep, widened to round letters and seat words, over the comment lines the `src` diff adds returns two lines: the v10.1.4 stamp on `GlassDock.vue:39` (see *For INBOUND*) and `run.css:228` "under W5 below", which names the file's own section heading (`run.css:610`, present at v10.1.4 `:418`); no `export` line removed or renamed; `verify:package` CLEAN; every moved token value named (above) |

## For INBOUND (outside the list or the matrix; none counts against clean)

- **The CHANGELOG says the dock publishes one new measured property; the script writes four.**
  `--dock-plate-cross-px` is the one named in the header. `dockMorphMeasure.ts` and
  `useDockExpandedSize` also write `--dock-seat-max-inline-px`, `--dock-seat-max-block-px` and
  `--dock-run-room-block` on the root (the last is named in the O-201 entry's body), and the run
  carries a new `data-run-fits` attribute. None exists at v10.1.4 and none is a moved value, so
  invariant 11 does not read them. The close seat may make the header's count agree with the
  prose rule's pass.
- **Three v10.1.4 comments still say the shadow re-tints under `.dark` by construction**
  (`src/styles/scroll-chrome.css:83`, `src/styles/theme/literals.css:74`,
  `src/styles/tokens/glass-fx.css:208`, each "`--shadow-color: var(--foreground)`"). The patch
  did not add them; since O-182 the dark arm declares its own `--shadow-color`
  (`dark-arm.css:92`), so they describe light mode only. For the 11.0.1 comment pass.
- **A v10.1.4 comment stamp sits on a line the patch edits** (`GlassDock.vue:39`,
  `[2026-08-24 · BK #47 W3 LATTICE + W6]`). Unchanged from critique 15.
- **The CHANGELOG still lists no entry for the other round-7 behaviour cures** (O-161, O-162,
  O-176, O-177). None moves a token value. Unchanged from critiques 14 and 15; the close seat
  owns them.
- **In the ring-room band a flagged run rests round with its end seat's box up to 4 px under the
  port** (c12b, both engines: the flagged caps whose scroll range is 4 or 5 to 8 px read
  `hidden 1` with four equal corners). The note's item 4 prescribes this form. Recorded for the
  dock redesign.
- **RTL: a focused end seat in a layer group is not reached** (c12b's RTL rows, both engines: the
  end ring cut 0.8 to 8.8 px on flagged caps and 12 to 38 px under the fit edge). Unchanged,
  outside the matrix; routed to W-I.8.
- **The one-process WebKit pass was not repeated** (q2's `page.goto` hang as the 90th test); the
  two processes ran, and q2 alone 8/8. The close seat should do the same.
- **Untracked files.** `tests-visual/release-10-1-5/v1014/`, `tests-visual/x` and
  `tests-visual/docs/` are still untracked. The close seat decides.

## What ran (all through `guarded`; none refused)

| run | Chromium (`chromium-headless-new`) | WebKit 2287 |
|---|---|---|
| `release-10-1-5.spec.ts` on the tip | 107/107, one process (load 8) | 84/84 and 23/23, two processes (load 6 to 9) |
| q2 alone, 4 repeats per width | — | 8/8 |
| n1 alone, 12 repeats per pointer | — | 24/24 |
| u1 alone, 2 repeats | — | 2/2 |
| g6 `release-10-1-4` | 23/23 | 15 passed, 8 skipped |
| g6 `release-10-1-3` | 60/60 | 58 passed, 2 skipped |
| c12a, c12b (critic 12's cells) | 1/1, 1/1 | 1/1, 1/1 |
| g7 (`critic-16/g7/gates.txt`) | typecheck, build, demo:dist:build, vitest 247 files / 2397 passed (10 expected fail, 1 skipped), verify:package CLEAN: all exit 0 | |

- A WebKit lock wait is not a refusal: both WebKit chains waited on another session's lane before
  they were admitted.
- Not measured: real Safari (safaridriver is not enabled); every WebKit cell is Playwright WebKit
  2287.

## Union verdict

Clean. Fix 15's CHANGELOG entry for the static plate's `--glass-level` matches the source, and the
header's count of five agrees with an independent table of every existing token the patch
touches. Every invariant the list gates holds in Chromium and WebKit 2287: rest corner, collapsed,
true overflow, ring (with the vertical bound the CHANGELOG states), morph edges, the closed
host-resize cells, consumer markup, Slider, type, menu, the one-row cures, g6, g7, and source and
records. The release spec is 107/107 in Chromium and, as two processes, 107/107 in WebKit. This is
the first of the two clean rounds the note asks for.
