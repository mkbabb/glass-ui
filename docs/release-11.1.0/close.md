# glass-ui 11.1.0 · the release close

Run by claude-opus-5-5 on `release/11.1.0` in `.claude/worktrees/release-11.1.0`, 2026-11-15.
Every orchestrator note in this folder was read first. Nothing was tagged, pushed or published.

Every build, test and browser run went through `~/.claude/guard/guarded` (WebKit under
`--exclusive webkit`), one at a time. **The guard refused nothing**; its only lines were waits for
the WebKit lock. Disk stayed between 52 and 63 GB free. The one-minute load reached 170 once
(another session, around 17:20, during `co-part-aj`), otherwise 4 to 25.

Records: `close/` (drivers `run.sh`, `chain.sh`, `release.sh`, `gates.sh`, `archive-gates.sh`,
`scripts/`; logs `chain.log`, `gates/`, `gates-archive-*/`, `release/`, `suite/`, and each
witness's `out/`).

## Merges, in order

1. **v11.0.1** was already an ancestor (fix 7's merge, `merge-master.md`).
2. **master** (v11.0.2, the browser-free and sparse-checkout workflows, the dist-tag step and the
   demo deploy): `594f5d245`. Conflicts, each read on both sides:
   - `dock.css`, `shell.css`: 11.0.2's edge (the host-colour-or-lerp chain over
     `--_dock-edge-expanded-ink` and `--glass-border-floating`; the library no longer declares
     `--dock-plate-expanded-border`), drawn at 11.1.0's `--dock-plate-border-width`, which
     `ScrollProgressRim edge="border"` strokes over.
   - `run.css`: 11.0.2's zero-specificity seat transitions (a slotted control keeps its own list)
     with 11.1.0's mark excluded, `:where(… > .dock-run > :not(.dock-run-mark))`.
   - `Slider.vue`: 11.1.0's own/grab model with 11.0.2's `loupe` prop held out of reka's props.
   - `g-dock-lattice.test.ts`: 11.0.2's axis-only overscroll with the mark-aware seat selector.
   - `README.md`: 11.0.2's Slider token paragraph, then 11.1.0's two font entries.
   - `CHANGELOG.md`: 11.1.0 above 11.0.2.
   - `.bundle-ratchet`: held, rebound last.
   `.github/workflows/*` and `scripts/dist-tag.mjs` are master's bytes.
3. **bl/ro-loop** (the resize-mid-morph cure): `1059f6f87`, a clean auto-merge of
   `dockMorphMeasure.ts`; its witness `tests-visual/ro-loop.spec.ts` comes with it.
4. `676fdbb20`: version 11.1.0 (package.json, package-lock.json) and the CHANGELOG line for the
   resize cure, in consumer voice.
5. `95cd5bb33`: ratchet rebind **3030963 → 3035791 (+4828 B)**, measured on a `git archive` build
   of `676fdbb20` inside the worktree (`.cache/close-1110`, deleted). The growth is the two
   merges: 11.0.2's own cures and the cure's owed-frame capture. No 11.1.0 byte moved.

After them, `a92a113d7` restates one visual-suite literal (below) and `b93d7d476` sets the
CHANGELOG cut date. No package byte moved: the archive gates at `b93d7d476`
(`gates-archive-closed/`) read every step exit 0 and verify:package CLEAN with the ratchet equal.

## The battery (exit codes)

release.yml's checks, in its order, on the committed tree:

| step | worktree `gates/` @95cd5bb33 | archive `gates-archive-final/` @95cd5bb33 | archive `gates-archive-closed/` @b93d7d476 |
|---|---|---|---|
| tag = package version (11.1.0); `dist-tag.mjs 11.1.0 11.0.2` → `latest` | 0 | 0 | 0 |
| `prepare` (npm ci's build) | | 0 | 0 |
| `npm run typecheck` | 0 | 0 | 0 |
| `npm run build` + `dist/index.d.ts` | 0 | 0 | 0 |
| `npm run verify:package` | 0, CLEAN, ratchet equal | 0, CLEAN, ratchet equal at 3035791 | 0, CLEAN, equal |
| `npm run demo:dist:build` (before the test step) | 0 | 0 | 0 |
| `CI=true npm test -- --maxWorkers=2` | 0: 285 files, 2600 passed, 10 expected fail, 1 skipped | same | same |

Before the rebind, verify:package exited 1 on `G-BUNDLE-RATCHET … 3035791 > 3030963` in both
(`gates-archive-pre-rebind/`); the archive's first typecheck exited 2 only because it ran before
`prepare` built the self-referenced `dist/` (CI builds first), so `prepare` was added ahead of it.
`CI=true npm test` needs no browser, as `ci-browser-free.test.ts` asserts.

scripts/release.sh's local legs (`gates/`, own server on 5743):

- `npm run test:browser`: exit 0, 2 files, 12 passed.
- `gate:pixel-floor`: exit 0, GREEN, 3 floors on the live paint path.
- `gate:pixel-floor:planted`: exit 0, GREEN self-test, 2 floors RED on the plant.
- `gate:pixel-floor:planted:flood`: exit 0, GREEN self-test, the blob ceiling RED on the plant.
- release.yml makes no pi-report freshness check (its header routes one elsewhere).

## Release specs and witnesses on the merged tree (`chain.log`, `release/runs.txt`)

| | Chromium (headless-new) | WebKit 2287 |
|---|---|---|
| release-10-1-2 | 52/52 | 52/52 |
| release-10-1-4 | 23/23 | 15 + 8 skipped |
| release-10-1-3 (with the O-194 restatement) | 60/60 | 58 + 2 skipped |
| release-10-1-5 part A / part B | 84/84, 23/23 | 84/84, 23/23 |
| release-11-0-1 owner / fix 2 / critic 2 | 9, 14, 9 | 9, 14, 9 |
| **release-11-0-2** + slider-forced-colors | 57/57 | 54 + 3 skipped |
| release-11-0-2 on coarse-touch / on WebKit 2311 | 37 + 17 skipped | 51 + 3 skipped |
| **ro-loop** (the resize-mid-morph witness) | 4/4 | 4/4 (`RO_LOOP_WEBKIT=1`) |
| probe11 / probe10 | 60/60, 40/40 | 60/60, 40/40 |
| lane L1 (O-164, O-188, O-169) | 27/27 | 27/27 |
| lane L2 | 33/33 | 29/29 + the 4 paint cells unmeasurable in WebKit, as in every round since critique 2 |
| lane L3 (O-158, O-184, O-178, O-179) | 18/18 | 18/18 |
| lane L4 (probe + font probe) | exit 0, exit 0 | exit 0, exit 0 |
| lane L5 | 60/60 | 60/60 |
| lane L6 | 161/161 | 155/155 |
| lane L7 | 80/80 | 80/80 |

The merged tree holds both the resize witness and fix 9's probes green, as the note requires.

**The dock search page.** `/dock/dock-search` still throws `TypeError: root.addEventListener is
not a function` at mount (`searchthrow/`, 0/4 in Chromium and in WebKit), at
`useDockState.ts:271`. v11.0.1 throws the same (fix 9), so by the note it is left for 11.1.1,
which can take fix 9's `665c5ca1f`.

## The visual suite

The v11.0.0 failure title sets are the 11.0.1 close's (`docs/release-11.0.1/baseline-v11.0.0`),
reused as instructed. The suite: the 179 v11.0.0 spec files in the baseline's 12 chunks on
`chromium-headless-new` and `coarse-touch`, the release specs as one chunk per project (`rel`:
release-10-1-5, release-11-0-1, -daraksha, release-11-0-2, ro-loop, slider-forced-colors), the
7-file WebKit project on build 2287 and the release-11-0-1 WebKit config. Own servers on 5751
(Chromium) and 5753 (WebKit) via `GLASS_UI_DEMO_URL`. Comparison: `scripts/compare.sh`, output
`suite/compare.txt` (C collation; an earlier un-pinned `comm` misread a coarse chunk and was
corrected).

| project | branch failing | v11.0.0 failing | branch-only |
|---|---|---|---|
| chromium-headless-new | 450 | 450 | 8 |
| coarse-touch | 451 | 456 | 3 |
| webkit 2287 (7 files) | 4 | 10 | 3 |
| release specs: ch-rel 179, co-rel 162 + 17 skipped, wk-rel 11 | 0 | | |

The eight O-101 cells v11.0.0 failed now pass in all three projects.

Every branch-only title, adjudicated (`suite/ch-re`, `co-re`, `wk-re`, `wk-u1`, and the A/B in
`suite/ab/`, each a `git archive` tree inside the worktree, deleted after):

- `easing-primitive` P1, P2, P4, P5, P11 and `no-gray` (a) dark desktop (Chromium): pass on the
  rerun; load flakes. (The rerun's other `easing-primitive` and `no-gray` failures are in the
  v11.0.0 set.)
- `motion2` "calm substrate" (coarse): passes on the rerun.
- `radius-scale` "a SegmentedTabs strip … a short one a stadium", light and dark (coarse):
  **a stale literal**. 11.1.0 makes a touch-screen SegmentedTabs at least 44 px tall (its
  CHANGELOG says so) and the corner follows, 22 px; the spec asserted 16 px for every project.
  Restated: 22 px under `coarse-touch`, 16 px elsewhere; the stadium bound beside it is
  unchanged. Passes on the rerun in coarse-touch.
- `viz-fourier-ribbon` "paints as a chromatic stroke — dark" (Chromium): fails twice on the
  branch at a spread of 59.97 and 59.91 against a floor of 60. A/B: **fails on v11.0.1 and on
  v11.0.2 too**, passes on the pre-merge 11.1.0 tip `909b385c2`. A threshold reading shared
  with published releases; not 11.1.0's.
- `dockmorph-cta` "the seat reserves its box … opacity FLIP" (Chromium): the pending seat reads
  opacity 1, not the dim ghost. Twice on the branch. A/B: **fails on v11.0.2**, passes on v11.0.1
  and on `909b385c2`. It arrives with the 11.0.2 merge: a regression 11.0.2 shipped, not
  11.1.0's. Recorded for 11.1.1.
- WebKit: `release-10-1-3` O-110 right-anchored, `release-10-1-5` e1 at 390, `safari-webgl`
  blob (dark): all three were `page.goto` timeouts and pass on the rerun (177 tests, 174
  passed). That rerun's one failure, `release-10-1-5` u1 (scroll range 0), passed in the two
  other WebKit runs of the same tree; repeated alone four times (`wk-u1`) it passes 4/4.

**No failure is 11.1.0-only.**

## The tree

The suite rewrote tracked PNGs under `docs/tranches`; they were restored with
`git checkout -- docs/tranches`, and the suite's new untracked outputs there were removed. The
13 untracked files that predate this seat (capture outputs under `docs/tranches`, ruled to stay,
`orchestrator-note-after-fix-7.md`) were left; the two records among them under
`docs/release-11.1.0/` are committed with this record.

## Deliberate changes made here

- The ratchet rebind above.
- `tests-visual/radius-scale.spec.ts`: the coarse-pointer literal.
- CHANGELOG: the resize-cure line; the cut date 2026-11-15.
