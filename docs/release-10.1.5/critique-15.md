# 10.1.5 — critique, round 15 (adversarial, gated on the finite list)

Critic: claude-fable-5-2, fresh context. Branch `release/10.1.5` at `147c79cf9` (fix round 14: the
CHANGELOG entry for V1, prose only; `git diff 2c7bae5cb..HEAD` touches `CHANGELOG.md` and the
round-14 records and nothing in `src` or `tests-visual`). I read every commit over `v10.1.4`,
`critique-14.md`, the fix-14 diff, the inbound briefs and every orchestrator note.
`orchestrator-note-fable-review.md` binds this round: the scope is frozen at O-207, and I gate only
on its item 2 list, on its matrix (390 coarse and 1440 fine, 320 and 844 where a named witness
reads them, LTR), with the named witnesses. Anything else is in *For INBOUND* and does not count
against clean. The two one-off measurements were taken in round 13 and are not repeated.

Every browser run, build and test went through `guarded` (WebKit 2287 under `--exclusive webkit`),
one run at a time. **None was refused.** Drivers: `scripts/queue-critic-15.sh`,
`scripts/chain-critic-15.sh`, `scripts/gates-critic-15.sh` (round 14's, pointed at `critic-15/`,
with the WebKit release spec run as the two processes critique 14 recommends); summary
`python3 -I scripts/critic-15-summary.py <project>`. Rows bank to `critic-15/` (`runs.txt` and
`queue.txt` list every run with its load). I wrote no harness scene and no spec.

## Verdict

**Not clean, by one records line. One finding.**

- **W1 (records, invariant 11):** the patch moves `--glass-level` on a static-backdrop dock's plate
  from 0 to 1, and the CHANGELOG neither names it nor counts it ("Four token values move"). It is
  the same class as V1, and V1's reading missed it because it compared only `-`/`+` pairs.

Fix 14's V1 cure reproduces: the header says four, names the Slider's dark `--liquid-fill-tint`,
and the Slider section carries the entry, and the entry matches `src/components/slider/styles.css`.
Every paint and behaviour invariant on the list holds in Chromium and WebKit 2287. The release spec
is 107/107 in Chromium and 107/107 in WebKit (84 + 23, two processes). g6 is GREEN in both engines
and g7 is GREEN.

## Finding

### W1: the static plate's `--glass-level` moved and the CHANGELOG is silent (low; records only; invariant 11)

- **What moved.** `src/components/dock/styles/adaptive-legibility.css:92-93`:
  `.glass-dock[data-backdrop-mode="static"] .dock-plate { --glass-level: 1; … }`. On v10.1.4 the
  plate declared no `--glass-level` and inherited the root's `0` (`:80-83` there:
  `.glass-dock[data-backdrop-mode="static"] { --glass-level: 0; … }`, with the comment "No
  plate-colour re-point"). `--glass-level` is an existing token (declared in 13 files of `src` at
  v10.1.4). The same rule adds the plate's `background` (the veil over `--card`). Commit
  `870411576` (O-157).
- **It paints.** `m3 O-157` (a static plate under no, green and red `--glass-veil-ink` paints three
  opaque plates, the green one greener, light and dark) is GREEN on the tip in both engines
  (`critic-15/branch-ch.json`, `partA-wk.json`) and RED on v10.1.4, where the three plates were
  one colour (`implement.md:564`).
- **What the records say.** `implement.md:513-516` records the move ("`--glass-level: 1`, so the
  consumer's `--glass-veil-ink` reaches it"). The CHANGELOG's 10.1.5 section has no line with
  `--glass-level`, "static" or "veil", and its header counts four moved values:
  `--dock-cap-rest`, the coarse `--control-text` pair, the dark `--shadow-color`, the Slider's dark
  `--liquid-fill-tint`. Two of those four are selector-scoped moves of the same kind as this one,
  so by the CHANGELOG's own count this is a fifth. Critique 14's *For INBOUND* listed the missing
  O-157 entry and said "None moves a token value"; for O-157 that is not so.
- **Read twice.** First a table of every custom-property declaration the `src` diff adds or
  removes, each name checked for a declaration at v10.1.4 (not only the `-`/`+` pairs critique 14
  read). The existing names it touches are exactly seven: `--dock-cap-rest`, `--control-text`,
  `--control-text-sm`, `--shadow-color`, `--liquid-fill-tint` (all named in the CHANGELOG),
  `--glass-specular-intensity-hover` (the same value, now inside `(hover: hover)`; not a value
  move), and `--glass-level` on the static plate (not named). Every other name the patch declares
  is new at v10.1.4 (`--dock-run-*`, `--field-text-floor`, `--icon-label-gap`, `--slider-fill-ink`,
  `--slider-lane-cut`, `--value-mark-inset`). Then the two files at both refs, and the CHANGELOG
  section grepped for the three words.
- **The table is complete.** It is the whole set, so this finding has no sibling left for a later
  round: after W1 the CHANGELOG names every existing token whose value the patch moves.
- **Cure (prose only).** One CHANGELOG entry for the static plate (a `backdrop-mode="static"`
  dock's plate now reads the veil at full level over an opaque `--card`, so a consumer's
  `--glass-veil-ink` tints it; `--glass-level` on that plate is 1 where it inherited the root's 0;
  the root's 0 still holds the dock's other glass surfaces; the live plate is unchanged), and
  "Four" becomes "Five" in the header. No `src`, no witness, no browser run.

## The list, invariant by invariant

Each row was read from the run's report and then against the banked rows.

| # | invariant | Chromium | WebKit 2287 | reading |
|---|---|---|---|---|
| 1 | rest corner | holds | holds | g1 x4, e1 x4, e4 x2, k3 x2, l1 x12, q1 x2, m4 x4 GREEN; c12b LTR (390 coarse, 1440 fine, 390 fine; 27 caps each): at all 16, 17 and 16 flagged caps the four corners are equal at rest and under hover, 0 uneven, in both engines |
| 2 | collapsed | holds | holds | g2 x2, m1 x6, s1 x2 GREEN |
| 3 | true overflow | holds | holds | g1 (overflow), h1 x2, k2 GREEN; c12b's unflagged caps cut the trailing side only (`30px 25.96px 25.96px 30px` at 390 coarse, `28px 24.25px 24.25px 28px` fine, the same in both engines) |
| 4 | ring | holds, with the recorded vertical bound | same | c4 x2, e2 x3, e3 x2, k1 x2, s2 x2, t1 x2 GREEN; c12b LTR: first and end ring cut at most 0.11 px (Chromium) and 0.23 px (WebKit) at all 27 caps of the three cells, the flagged run scrolling at most 8 px; c12a: 1, 2, 3, 4 px at the four stages of the yield band (1440: 320 to 314; 390 coarse: 344 to 338), identical in both engines, light and dark, which is the bound the CHANGELOG states |
| 5 | morph edges, static host | holds | holds | n1 x2 GREEN in the pass; WebKit alone: n1 12/12 and u1 2/2 (32 collapses) |
| 6 | morph, host resize | holds | holds | p1 x2, p2 x2, s4 GREEN; no new door opened |
| 7 | consumer markup | holds | holds | q1 x2, q2 x2, q3 x2, r1 x2 GREEN; q2 alone in WebKit 8/8 |
| 8 | Slider, type, menu | holds | holds | g3, c1, c3, m3 O-167 x2; g4, c2; g5 GREEN |
| 9 | one-row cures | holds | holds | f1, f2, m3 x15, m5 x8, s3 GREEN |
| 10 | regression gates | holds | holds | g6 `release-10-1-4` 23/23 and 15 + 8 skips (`page.pdf`); `release-10-1-3` 60/60 and 58 + 2 skips, D-1 and F-4 GREEN in both at load under 10 (no A/B needed); g7 all exit 0 |
| 11 | source and records | holds but for W1 | — | **W1.** The note's grep, widened to round letters and seat words, over the comment lines the `src` diff adds returns one line, a v10.1.4 stamp whose text was edited (see *For INBOUND*); no `export` line removed or renamed; `verify:package` CLEAN |

## For INBOUND (outside the list or the matrix; none counts against clean)

- **A v10.1.4 comment stamp sits on a line the patch edits.** `src/components/dock/GlassDock.vue:39`
  reads `// [2026-08-24 · BK #47 W3 LATTICE + W6] The run: reach to the seat's snap position via`;
  the stamp is v10.1.4's and the patch changed only the clause after it. I read it as outside
  invariant 11 (the patch did not add the id), and the close seat may drop the stamp with the
  CHANGELOG's row ids if the prose rule reaches `src`.
- **The CHANGELOG still lists no entry for the other round-7 behaviour cures:** hover gated on
  `(hover: hover)` (O-161), the summary's ring on the pill (O-162), open docks arming the idle
  window (O-176), Tab reopening a folded dock and the re-aimed press (O-177). None of these moves
  a token value (the table in W1 covers them). The close seat owns them with the prose rule, as
  critique 14 said; W1's entry covers O-157.
- **In the ring-room band a flagged run rests round with its end seat's box up to 4 px under the
  port** (c12b, both engines: the caps where the scroll range is 5 to 8 px read `hidden 1` with
  four equal corners). This is the form the note's item 4 prescribes (the reserve's floor is the
  ring's room and reach uses the scroll), so it is not read against invariants 1 or 3. Recorded
  for the dock redesign.
- **RTL: a focused end seat in a layer group is not reached** (c12b's RTL rows, both engines: the
  end ring cut 0.8 to 8.8 px on flagged caps and 12 to 38 px under the fit edge). Unchanged from
  rounds 13 and 14, outside the matrix; routed to W-I.8 there.
- **The one-process WebKit pass was not repeated.** Five such passes lost q2 at 1440 inside
  `page.goto` as the 90th test; this round ran the two processes only (84 + 23, and q2 alone 8/8).
  The close seat should do the same.
- **Untracked files.** `tests-visual/release-10-1-5/v1014/`, `tests-visual/x` and
  `tests-visual/docs/` are still untracked. The close seat decides.

## What ran (all through `guarded`; none refused)

| run | Chromium (`chromium-headless-new`) | WebKit 2287 |
|---|---|---|
| `release-10-1-5.spec.ts` on the tip | 107/107, one process (load 8) | 84/84 and 23/23, two processes (load 7 to 8) |
| q2 alone, 4 repeats per width | — | 8/8 |
| n1 alone, 6 repeats per pointer | — | 12/12 |
| u1 alone, 2 repeats | — | 2/2 |
| g6 `release-10-1-4` | 23/23 | 15 passed, 8 skipped |
| g6 `release-10-1-3` | 60/60 | 58 passed, 2 skipped |
| c12a, c12b (critic 12's cells) | 1/1, 1/1 | 1/1, 1/1 |
| g7 (`critic-15/g7/gates.txt`) | typecheck, build, demo:dist:build, vitest 247 files / 2397 passed (10 expected fail, 1 skipped), verify:package CLEAN: all exit 0 | |

- A WebKit lock wait is not a refusal: the second WebKit chain waited about 5 minutes on another
  session's lane.
- Fix 13's RED arm (u1 on the round-13 tip's `src`) was not repeated: critique 14 banked it and
  `src` has not changed since.
- Not measured: real Safari (safaridriver is not enabled); every WebKit cell is Playwright WebKit
  2287.

## Union verdict

Not clean, on records alone. **W1**: on a static-backdrop dock's plate `--glass-level` moved from
the inherited 0 to 1 (O-157), and the CHANGELOG names four moved values where there are five. The
table in W1 is every existing token the patch touches, so one entry closes invariant 11. Every
paint and behaviour invariant the list gates holds in Chromium and WebKit 2287: rest corner,
collapsed, true overflow, ring (with the vertical bound the CHANGELOG states), morph edges, the
closed host-resize cells, consumer markup, Slider, type, menu, the one-row cures, g6 and g7. Fix
14's V1 entry reproduces against the source. The release spec is 107/107 in Chromium and, as two
processes, 107/107 in WebKit. With W1's one CHANGELOG entry the tip is a clean round.
