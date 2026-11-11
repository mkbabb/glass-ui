# 10.1.5 — critique, round 14 (adversarial, gated on the finite list)

Critic: claude-fable-5-2, fresh context. Branch `release/10.1.5` at `2c7bae5cb` (fix round 13:
`c390571e6` T1, `eeebfddef` witnesses and CHANGELOG, `6d28338a3` the rebind, and the records). I
read every commit over `v10.1.4`, `critique-13.md`, `fix-13.md`, the inbound briefs and every
orchestrator note. `orchestrator-note-fable-review.md` binds this round: the scope is frozen at
O-207, and I gate only on its item 2 list, on its matrix (390 coarse and 1440 fine, 320 and 844
where a named witness reads them, LTR), with the named witnesses. Anything else is in
*For INBOUND* and does not count against clean. The two one-off measurements (the observer's frame
cost, the 320-per-arm first expand) were taken in round 13 and are not repeated.

Every browser run, build and test went through `guarded` (WebKit 2287 under `--exclusive webkit`),
one run at a time. **None was refused.** Drivers: `scripts/queue-critic-14.sh`,
`scripts/chain-critic-14.sh`, `scripts/gates-critic-14.sh`; summary
`python3 -I scripts/critic-14-summary.py <project>`. Rows bank to `critic-14/` (`runs.txt` and
`queue.txt` list every run with its load). I wrote no harness scene and no spec.

## Verdict

**Not clean, by one records line. One finding.**

- **V1 (records, invariant 11):** the patch moves the default fill colour of every Slider in dark,
  and the CHANGELOG neither names it nor counts it ("Three token values move").

Every paint and behaviour invariant on the list holds in Chromium and WebKit 2287, and fix 13's T1
and T2 cures both reproduce. The release spec is 107/107 in Chromium. In WebKit it is 107/107 on
the tip as two processes (84 + 23) and 106/107 as one process, where q2 at 1440 again hung inside
`page.goto` as the 90th test, as it has in every whole WebKit pass since fix 11; q2 alone is 8/8.
g6 is GREEN in both engines and g7 is GREEN.

## Finding

### V1: the dark Slider's default fill moved and the CHANGELOG is silent (low; records only; invariant 11)

- **What moved.** `src/components/slider/styles.css:157`: `.slider-range` set
  `--liquid-fill-tint: var(--slider-range-bg, var(--glass-capsule-warm))` on v10.1.4 and sets
  `var(--slider-range-bg, var(--slider-fill-ink))` on the branch. `--slider-fill-ink` is
  `--glass-capsule-warm` in light (no change) and
  `color-mix(in oklab, var(--foreground) 22%, transparent)` under `.dark` (`:149-152`), where
  v10.1.4 resolved `oklch(0.42 0.06 75)` (`src/styles/tokens/dark-arm.css:396`). The rule is on
  `.dark .glass-slider, .dark .glass-loupe`, so it is every Slider and loupe in dark that sets no
  `--slider-range-bg`, not only the dock-hosted one O-167 reported. Commit `870411576`.
- **It paints.** The `m3 O-167` witness asserts the dark fill is neutral (channel spread at most
  16) and quiet (alpha at most 80 of 255): GREEN on the tip in both engines
  (`critic-14/branch-ch.json`, `partA-wk.json`), RED on v10.1.4 with the warm brown
  (`critique-7.md:158`, `implement.md:572`).
- **What the records say.** The CHANGELOG's 10.1.5 header says "Three token values move, each
  because the token is the cure" and lists `--dock-cap-rest`, the coarse `--control-text` pair and
  the dark `--shadow-color`. `--dock-cap-rest` is itself a component-scoped property, so by the
  CHANGELOG's own count the Slider's dark `--liquid-fill-tint` default is a fourth. The Slider entry
  (`CHANGELOG.md:73-84`) describes the thumb and the lane and says nothing of the fill's colour.
  `implement.md:539-552` records the move; the CHANGELOG, which is what a consumer reads, does not.
- **Read twice.** First the `-`/`+` custom-property lines of `git diff -U0 v10.1.4..HEAD -- src`
  (the only existing properties whose value moves are `--dock-cap-rest`, `--liquid-fill-tint` on
  `.slider-range`, and `--glass-specular-intensity-hover`, which only moves inside a
  `(hover: hover)` block with the same value). Then the CHANGELOG section grepped for the fill's
  colour: no line. Critiques 8 and 13 read `--slider-fill-ink` as a new internal property and
  counted three moves; the property is new, but the value it replaces under `.dark` is not.
- **Cure (prose only).** One CHANGELOG entry for the dark fill (the default in dark is the
  foreground's ink at 22%, where 10.1.4 painted `--glass-capsule-warm`'s dark floor; a consumer's
  `--slider-range-bg` still wins; light is unchanged) and "Three" becomes "Four" in the header.
  No `src`, no witness, no browser run.

## The list, invariant by invariant

Each row was read from the run's report and then against the banked rows or the capture.

| # | invariant | Chromium | WebKit 2287 | reading |
|---|---|---|---|---|
| 1 | rest corner | holds | holds | g1 x4, e1 x4, e4 x2, k3 x2, l1 x12, q1 x2, m4 x4 GREEN; c12b LTR: at every cap whose flag is set the four corners are equal, rest and hover (27 caps x 3 cells per engine, 0 uneven) |
| 2 | collapsed | holds | holds | g2 x2, m1 x6, s1 x2 GREEN |
| 3 | true overflow | holds | holds | g1 (overflow), h1 x2, k2 GREEN; c12b's caps under the fit edge cut the trailing side only (LTR `30px … 25.96px` style rows) |
| 4 | ring | holds, with the recorded vertical bound | same | c4 x2, e2 x3, e3 x2, k1 x2, s2 x2, t1 x2 GREEN; c12b LTR, plain run and layer group: first and end ring cut 0 to 0.11 px at all 27 caps of the three cells, the flagged run scrolling at most 8 px; c12a: the 1, 2, 3, 4 px cuts at the four stages of the yield band (1440: 320 to 314; 390 coarse: 344 to 338), identical in both engines, light and dark, which is the bound `fix-12.md` sends to the owner and the CHANGELOG now states |
| 5 | morph edges, static host | holds | holds | n1 x2 GREEN in the whole pass and 12/12 alone in WebKit; u1 GREEN (16 collapses) in Chromium and 2/2 (32 collapses) in WebKit; c13b on the branch 0/24 at 332 and 0/8 at each of 316, 324, 332, 340, 348 |
| 6 | morph, host resize | holds | holds | p1 x2, p2 x2, s4 GREEN; no new door opened |
| 7 | consumer markup | holds | holds | q1 x2, q2 x2, q3 x2, r1 x2 GREEN (q2 at 1440 in WebKit in the split pass and 8/8 alone) |
| 8 | Slider, type, menu | holds | holds | g3, c1, c3, m3 O-167; g4, c2; g5 GREEN |
| 9 | one-row cures | holds | holds | f1, f2, m3 x15, m5 x8, s3 GREEN |
| 10 | regression gates | holds | holds | g6 `release-10-1-4` 23/23 and 15 + 8 skips (`page.pdf`); `release-10-1-3` 60/60 and 58 + 2 skips, D-1 and F-4 GREEN in both (so no A/B was needed); g7 all exit 0 |
| 11 | source and records | holds | — | **V1.** Otherwise: the note's grep, widened to round letters and seat words, returns nothing over the added `src` lines; no `export` line removed or renamed; `verify:package` CLEAN |

## Fix 13, reproduced

- **T1 (`c390571e6`).** RED arm: `u1` on the round-13 tip's `src` (`c788bbca7`, swapped in for
  one run and restored) fails in WebKit with 6 of 16 collapse starts at `scrollTop` 0 → 20 and S1
  24 → 4 (`critic-14/u1-tip-wk.log`). GREEN arm: `u1` on the branch twice in WebKit (32
  collapses), and critique 13's own per-frame reading, c13b, 0 of 24 at the 332 px stage with the
  run's `scrollTop` 0 on the first morph frame every time (`c13b-branch-webkit.json`). The cure
  does not move the other stages: 0 of 8 at each of the five (`c13b5-branch-webkit.json`), and n1
  12/12 alone. In Chromium u1 is GREEN on the branch; the defect is WebKit's, as `fix-13.md` says.
  The restore reads nothing new on an expand (the leaving pane there is the summary), and m1's six
  cells (a collapse from a scrolled run seals round) stay GREEN in both engines.
- **T2 (`eeebfddef`).** The O-201 entry now says what the tip does: the horizontal boxes yield
  down to the ring reserve, the vertical run keeps its padding yield and cuts up to 4 px in the
  8 px above its fit edge. c12a measures exactly that in both engines (the table above).

## For INBOUND (outside the list or the matrix; none counts against clean)

- **q2 at 1440 hangs in `page.goto` as the 90th test of a one-process WebKit pass.** Five whole
  passes across fix 11, critique 13, fix 13 and this round lost that one cell the same way, before
  any assertion, and it has never failed alone or in a shorter process (this round: 23/23 in the
  second half, 8/8 alone). It is the harness and the machine (the 10.1.3 close traced the same
  signature to macOS `akd`), not the branch. The close seat should run the WebKit release spec as
  the two processes `chain-critic-14.sh` names (`partA`, `partB`: 84 + 23), or it will read
  106/107 again.
- **The CHANGELOG lists no entry for the round-7 behaviour cures:** the static plate's veil
  (O-157), hover gated on `(hover: hover)` (O-161), the summary's ring on the pill (O-162), open
  docks arming the idle window (O-176), Tab reopening a folded dock and the re-aimed press
  (O-177). None moves a token value, so invariant 11 does not reach them, but a consumer sees each.
  The close seat owns it with the prose rule (the CHANGELOG also still carries row ids, as
  critiques 11 to 13 noted).
- **RTL: a focused end seat in a layer group is not reached** (c12b's RTL rows, both engines: the
  end ring cut 0.8 to 8.8 px on flagged caps and 12 to 38 px under the fit edge). Unchanged from
  round 13, better than v10.1.4, outside the matrix; routed to W-I.8 there.
- **Untracked files the v10.1.4 arms need.** `tests-visual/release-10-1-5/v1014/` is still
  untracked, and `tests-visual/x` and `tests-visual/docs/` are still strays. The close seat decides.

## What ran (all through `guarded`; none refused)

| run | Chromium (`chromium-headless-new`) | WebKit 2287 |
|---|---|---|
| `release-10-1-5.spec.ts` on the tip, one process | 107/107 (load 6) | 106/107: q2 at 1440, `page.goto` timeout (load 20) |
| the same spec as two processes (`partA` 84, `partB` 23) | — | 84/84 and 23/23 (load 7 to 11) |
| q2 alone, 4 repeats per width | — | 8/8 |
| n1 alone, 6 repeats per pointer | — | 12/12 |
| u1 alone, 2 repeats / on the round-13 tip's `src` | — | 2/2 / RED 6 of 16 |
| c13b at 332 (24 collapses) / at five stages (8 each) | — | 0/24 / 0/40 |
| g6 `release-10-1-4` | 23/23 | 15 passed, 8 skipped |
| g6 `release-10-1-3` | 60/60 | 58 passed, 2 skipped |
| c12a, c12b (critic 12's cells) | 1/1, 1/1 | 1/1, 1/1 |
| g7 (`critic-14/g7/gates.txt`) | typecheck, build, demo:dist:build, vitest 247 files / 2397 passed (10 expected fail, 1 skipped), verify:package CLEAN: all exit 0 | |

- The `u1-tip` step swapped `c788bbca7`'s `src` into this worktree for one 46 s run and restored
  HEAD's (`git status --short src` empty after).
- A WebKit lock wait is not a refusal: the chains waited up to 7 minutes on other sessions' lanes.
- One command ran outside `guarded`: `npx playwright test --list` (no browser, 2 s), to read which
  titles the split pattern selects. It should have been `guarded --light`.
- Not measured: real Safari (safaridriver is not enabled); every WebKit cell is Playwright WebKit
  2287.

## Union verdict

Not clean, on records alone. **V1**: the dark Slider's default fill moved from
`--glass-capsule-warm`'s dark floor to the foreground's ink at 22% for every Slider and loupe, and
the CHANGELOG names three moved values where there are four. Every paint and behaviour invariant
the list gates holds in Chromium and WebKit 2287: rest corner, collapsed, true overflow, ring (with
the vertical bound the note sends to the owner), morph edges, the closed host-resize cells,
consumer markup, Slider, type, menu, the one-row cures, g6 and g7. Fix 13's T1 is RED on the
round-13 tip and GREEN on the branch in WebKit, and T2's prose matches the measurement. The
release spec is 107/107 in Chromium and, as two processes, 107/107 in WebKit. With V1's one
CHANGELOG entry the tip is a clean round.
