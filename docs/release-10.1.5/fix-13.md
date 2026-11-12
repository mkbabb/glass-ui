# 10.1.5 — fix round 13 (critique-13.md T1, T2)

Seat: claude-opus-5-5. Commits `c390571e6` (T1, `src`), `eeebfddef` (witnesses, the CHANGELOG
for T1 and T2), `6d28338a3` (the rebind), and these records. Every browser run, build and test
went through `guarded` (WebKit 2287 under `--exclusive webkit`), one at a time. **None was
refused.** Drivers: `scripts/t1-fix-13.sh` and `scripts/f13a-fix-13.sh` (the diagnosis, one
src patch per arm from `fix-13/variants/`), `scripts/queue-fix-13.sh` over
`scripts/witness-fix-13.sh` (arm `tip` swaps in `c788bbca7`'s `src` and restores HEAD's on
exit) and `scripts/gates-fix-13.sh`, `scripts/rerun-fix-13.sh`. Every run is in
`fix-13/runs.txt` and `fix-13/queue.txt`.

## T1: a collapsing run re-snapped to its scroll end in WebKit (cured, option (a), `c390571e6`)

**Diagnosis.** Critique 13's candidates first, each as a src patch on c13b's 332 px coarse cell,
24 collapses per arm, WebKit 2287 (`fix-13/t1-*.json`):

| arm | collapse starts that step |
|---|---|
| tip (`c788bbca7`) | 4/24 |
| v1: the capture's collapsed-endpoint read skipped | 5/24 |
| v2: the timeline and the clip animations kept on the leaving run | 3/24 |
| v3: the layers' block margins kept under `.collapsed` | 7/24 |

None of them is the cause. f13a (`tests-visual/release-10-1-5-fix-13.spec.ts`) then logged, with
the `d1` patch's hooks in `keepScroll` and the run's scroll writer, every scroll event and every
attribute change of the root and the run around the collapse, reading no layout of its own
(`fix-13/f13a-d1-webkit.json`). In every collapse the post-flush capture reads the run at
`clientHeight` 314, not the 298 it painted: between the swap and the arm the root lays out in
the collapsed posture with no reservation, and the leaving run's port grows. In the collapses
that step, the next layout read (`anchor`, after `play` sets `[data-morphing]` and the box is
reserved again, port 298) already finds `scrollTop` 20. Nothing writes the scroll. WebKit
re-snaps the `mandatory` run when its port shrinks back from 314 (range 4) to 298 (range 20),
and lands it on its end. Wrapping `anchor` in `keepScroll` (`c1`) does not help, because the
offset it reads on entry is already 20: 5/24.

**Cure.** The leaving run holds the scroll it painted, as the leaving pane holds its box.
`first` (pre-flush, before the swap) reads the run's offset. `anchor`, the arm's last layout
read, gives it back to a leaving run that moved (`scrollTo`, `behavior: "instant"`). On an
expand the leaving pane is the summary, which is no scroller, so nothing changes there. The
diagnostic arm (`d1+c2`): 0/24, with the restore seen firing 20 → 0.

**Witness.** `u1` in `release-10-1-5.spec.ts` ("fix 13, coarse phone"): n1's 332 px coarse
flow 16 times, asserting the run's `scrollTop` and S1 unchanged from the last rest frame to the
first morph frame.

| | Chromium | WebKit 2287 |
|---|---|---|
| `u1` on the round-13 tip | GREEN (critique 13: Chromium 0/8 on both arms) | **RED**, 4/16 (`u1-tip-wk.log`) |
| `u1` on the branch | GREEN | GREEN |
| c13b at 332 on the branch | — | 0/24 (`c13b-branch-webkit.json`) |

The defect is WebKit's own, so `u1` cannot go RED in Chromium. It is GREEN there before and after.

## T2: the CHANGELOG's O-201 entry (cured, prose only, `eeebfddef`)

The entry now says what the tip does. On a horizontal run the two reserve boxes yield down to
`--dock-ring-reserve`. A vertical run keeps its padding yield (`--dock-run-room-block`), so in
the 8 px above its fit edge a focused end seat's ring is still cut by up to 4 px, where 10.1.4
cut 4 px at every height under that edge. The title loses "whole" and "at every width". No
`src`, no witness, no browser run. T1 gets its own CHANGELOG entry.

## Runs (branch, HEAD `6d28338a3` src = `c390571e6`)

| run | Chromium | WebKit 2287 |
|---|---|---|
| release spec (107 with `u1`) | 107/107 | 106/107: q2's `page.goto` timeout, the hang critique 13 saw twice; q2 alone 8/8 (`q2-rerun-wk.log`) |
| g6 `release-10-1-4` | 23/23 | 14 + 8 skips, F-4 "flex host" 2 swaps at a 1-minute load of 25; alone at load 7.6: 15 + 8 skips (`g6-4-rerun-wk.log`) |
| g6 `release-10-1-3` | 60/60 | 58 + 2 skips |

## g7 (`fix-13/g7/gates.txt`)

typecheck, build and demo:dist:build exit 0. verify:package failed the bundle ratchet
(2955434 > 2955067, +367 B), was rebound on the committed tree (`6d28338a3`), then exit 0
(`verify-package-2.log`). vitest: 2396 passed, 10 expected fail, 1 skipped, and **1 failed**,
`dockMorphMeasure.test.ts` "a capture keeps the run's scroll position" (its `vi.waitFor` 1 s
timeout), twice in the whole suite. It is not this round's: the round-13 tip's `src` fails it
the same way in the whole suite (`vitest-tip.log`; that run's second failure, the dist-demo
freshness test, comes from the swapped `src` being newer than `dist`). The file alone passes
18/18 three times (`vitest-measure-repeat.log`) and the dock directory 189/189 plus 1 expected
fail. Fix 11 and fix 12 recorded the same test under load. Critique 13's g7 had it GREEN.

No public API removed or renamed, no token added, no token value moved.
