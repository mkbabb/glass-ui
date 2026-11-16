# glass-ui 11.1.0 · fix 8

The fix seat before critic 8, run by claude-opus-5-5 on `release/11.1.0` in
`.claude/worktrees/release-11.1.0`, from `a257d3f4f` (critique 7, amended). The branch
already contains v11.0.1 (`git merge-base --is-ancestor v11.0.1 HEAD` exits 0), so there was
no merge to do. It took critique 7's two findings and the two instructions in
`orchestrator-note-after-fix-7.md`.

**The guard refused at 15:23:46 (disk low: 37 GB free, under its 40 GB floor).** Per the
machine law a refusal is a stop, and nothing was deleted to free disk. **Resumed at 16:59**
(80 GB free): every cell the refusal cut ran, the guard admitted each one, and nothing was
rebuilt. The resume added no commit to the source; it ran `bash fix-8/chain.sh p10w g63c g63w
l1c l1w l7c l7w` then `bash fix-8/e2e.sh` (`fix-8/chain.log` from "RESUME"). See *The resume*.

Commits, read from `git log`: `df8a65446` (the cure), `186364da4` (CHANGELOG),
`bbce22058` (the restated cells), `b4fb41041` (the ratchet), and the records commit that
carries this file. Driver: `fix-8/chain.sh`. Every run and its exit code are in `fix-8/chain.log`.

## 1. The gliding plate left its tab when an earlier control changed width (low)

**Root.** `useDockRunMark` observed only the run and the current control for resizes, and its
MutationObserver drops changes inside a control by design. In a run whose own size holds (a
phone-width or fixed-width nav dock), a control BEFORE the current one that widens or narrows
moves the current control along the run. Neither observed box changed size, so nothing
re-measured and the plate stayed at its old offset.

**Cure** (`df8a65446`). One `observe(run)` watches the run, every seat (`isRunSeat`, the one
predicate the mark-box ruling names), and the destination. It runs when the destination
changes and when the run's own child list changes (a seat added or removed), so the observed
set always matches the seats. A resize while the glide is live is ignored, as before: the glide
reads the arriving seat live each frame. Nothing changes in paint, motion or the spring.

**Witnesses.**

- Unit: `GlassDock.run-mark.test.ts` "re-measures when any seat resizes, not only the run and
  the destination". A stub ResizeObserver records what the mark's own observer watches. The
  stub attributes by stack, because the dock's other composables observe seats for their own
  reasons. The cell is RED on the pre-fix source (`fix-8/unit-red.out`: the first seat is not
  observed) and GREEN on the cure (`fix-8/unit-green.out`, 8/8).
- Engine: critic 7's probe10 run unchanged under its own path (`fix-8/probe10`). The cell is
  `tick`: four or eight tabs with the current tab marked, an earlier label made longer and
  then shorter, and a tab inserted at the front. The magenta plate is checked against the
  current control's plate box, within 1.5 px.

| tree | Chromium | WebKit 2287 |
| --- | --- | --- |
| branch `bbce22058`, all 40 judged cells (cnav, tick, sep) | **40/40** | **40/40** |
| pre-fix (`.cache/f8-pre`, `git archive a257d3f4f`), `tick` | **4/8** (the 390 cells, e.g. n8 longer: plate 132.9 vs paint 95; shorter: 132.8 vs 183, critic 7's own numbers) | **4/8** (the four 390 cells; n8 longer 133 vs 95, shorter 132.8 vs 183; n4 longer 119 vs 81, shorter 118.8 vs 169) |
| v11.0.0, `tick` | 8/8 | 8/8 |
| v11.0.1, `tick` | 8/8 | 8/8 |

This was a regression on the branch, so the RED tree is the pre-fix tree. v11.0.0 and v11.0.1
have no gliding mark, and each control paints its own plate, so the cells read green there, as
critique 7 recorded. On the branch the 390 `tick` cells now read exactly what v11.0.0 reads.
The branch's WebKit run was repeated on the resume and read 40/40 again
(`probe10/out/green-webkit.log`); the pre-fix, v11.0.0 and v11.0.1 WebKit cells are in
`probe10/out/{pre,red,v1101}-webkit.log`. Paint:
`probe10/out/png/{green,pre}-chromium-tick-*.png`.

## 2. The CHANGELOG headline did not list --radius-dock (low)

`186364da4` adds one item to the headline's list of defaults that change the look:

> the `--radius-dock` token is now the stadium, so a box you round with it or with the
> `rounded-dock` utility gets fully round ends instead of a 16 px corner, and a
> `--radius-dock` your theme sets shapes the dock again;

**Witness.** `fix-8/changelog-check.sh` is fix 7's check plus two lines that read only the
headline list (from "without you doing anything" to "A few fixes below"). The headline must
name `--radius-dock` and `rounded-dock`. `fix-8/changelog-check.out`: PASS on the branch.
On the pre-fix CHANGELOG, the two new lines FAIL and the rest pass. Everything fails on
v11.0.0 and v11.0.1, except the line for no internal vocabulary.

## 3. orchestrator-note-after-fix-7.md

- **The seven D-1 cells of `tests-visual/release-10-1-3.spec.ts`** (`bbce22058`) are restated
  to the owner's rule, with a comment naming O-194:
  - The four "a click on the open-side persistent seat …" cells keep their event and handler
    assertions, and now assert that the dock is NOT `.expanded`. Their title adds "and does not
    expand it".
  - The two critique-2 touch-swipe cells used a tap on the persistent seat to open the dock.
    They now open it with a tap on its summary. The swipe, Escape, focus and hover assertions
    are unchanged.
  - The critique-6 right-click dwell cell keeps its contextmenu assertion and now asserts that
    the dock reads collapsed. Its title is now "… leaves the dock collapsed".

  The CHANGELOG already states the behaviour in consumer words ("Pressing an always-visible
  control only presses it").
  **Measured on the resume:** `release-10-1-3.spec.ts` 60/60 passed in Chromium and 58 passed,
  2 skipped in WebKit (the spec's own engine skips), exit 0 in both (`fix-8/release/g6-3-*.log`).
- **Lane L7's stall cell** (`lane-L7/probe.mjs`, `bbce22058`) asks for two compositor frames
  inside the task. A cell with fewer is recorded as unmeasurable and not gated. Chromium saw
  3-4 frames per task in every earlier round, so its gate is unchanged. **Measured on the
  resume:** branch 80/80 in Chromium (stall 12/12 gated) and 80/80 in WebKit (stall recorded
  as unmeasurable, under two frames per task, not gated); v11.0.0 4/64 in Chromium and 16/64
  in WebKit (`fix-8/rerun/lane-L7/out/*.log`).
- The untracked capture outputs stay uncommitted and are untouched.

## Gates, `bbce22058` then `b4fb41041` (`fix-8/gates/head/chain.log`)

build 0, typecheck 0, demo:dist:build 0, vitest 0 (279 files; 2580 passed, 10 expected fail,
1 skipped). verify:package first exited 1: `G-BUNDLE-RATCHET … 3030858 > 3030691`. That is
+167 B: the run's mark observes every seat and re-observes when seats come or go, plus the
CHANGELOG line. The deliberate rebind is `b4fb41041`. verify:package on the committed tree
after it: exit 0, CLEAN (`verify-package-rebound.log`).

## The resume (16:59-18:10, every run admitted)

| run | Chromium | WebKit 2287 |
| --- | --- | --- |
| probe10, branch (all 40 cells) | 40/40 (before the refusal) | 40/40 |
| probe10 `tick`, pre-fix / v11.0.0 / v11.0.1 | 4/8 / 8/8 / 8/8 | 4/8 / 8/8 / 8/8 |
| `release-10-1-3.spec.ts` | 60 passed | 58 passed, 2 skipped |
| lane L1 witness, branch | O-164 4/4, O-188 6/6, O-169 17/17 | O-164 4/4, O-188 6/6, O-169 17/17 |
| lane L7 witness, branch / v11.0.0 | 80/80 / 4/64 | 80/80 / 16/64 |
| e2e set (17 specs), branch | 65 passed, 37 failed, 2 skipped | 65 passed, 37 failed, 2 skipped |

The e2e failures are exactly fix 7's branch set in each engine: 37 against 37, none new and
none gone (`fix-8/e2e/{chromium,webkit}-fails.txt` against `-fails-fix7.txt`). The WebKit runs
queued behind other sessions on the machine-wide WebKit lock and ran when it freed. The three
old comparison trees were not needed. Nothing remains unmeasured from fix 8.
