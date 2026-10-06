# BL — formation audit, pass 8

| field | value |
|---|---|
| seat | formation critic, pass 8. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-7, fixes 2-8 or the sweeps |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `64ff7aa2` (fix-8's commit) for every probe. The plan folder in the checkout matches HEAD outside `design/`. `git diff --stat e64da115 HEAD -- src` is empty, so `src` is still the published 10.1.0 |
| inputs read | `PLAN.md` §1-§7 (§3 and §5 by script, §4 and the §5 notes at `:394-402` in full); the fix-8 diff over `waves/`; all 99 specs by script, plus W-H.1 item 8, §6 and appendix C, W-D.2 §3 items 1-9 and appendix A's ONE-VERIFY arm, W-L.3 item 8 and G-L3-8, W-L.8 §3.5 step 1, G-L8-3 to G-L8-7 and appendix B, W-A.2 §2 and A2-G8/A2-G10, W-A.3 A3-G5, W-A.5 item 3 and A5-G5, W-C.1 C1-G6, W-C.2 item 8 and its scope row, W-C.3 items 2 and 8, W-E.1 appendix B, W-E.2 and W-E.6 appendix A; `LEDGER.md` by script (unchanged since fix-6); `audit/REGISTRY.md` family headers; `audit/INBOUND.md` (unchanged since fix-7); `formation-audit/pass-7.md`; the four files under `sweeps/`; `formation-audit/fix-8.md` last |
| where probes ran | a worktree at `64ff7aa2` (`scratchpad/formation/crit-8/wt`, `node_modules` and `tests-visual/node_modules` symlinked). `npm run build` exit 0, `npm run demo:dist:build` exit 0. The band-E consumer app was assembled from W-E.1 appendix B and built against `npm pack --ignore-scripts` of the worktree (`crit-8/bandE/`), served on :5874, with the demo dist on :5873. Both servers were stopped and the worktree removed before return (`git worktree list` shows no crit-8 entry). Chromium is Playwright's. Playwright WebKit was not run. Real-Safari cells are UNMEASURED (OW-3). Load average 15-28 |
| fences | no source edit; no git write except the worktree add and remove; nothing under `design/` read or written. The one intended write in the checkout is this file. Running the sweeps with plain `python3` left `formation-audit/sweeps/__pycache__/` (three `.pyc` files, 12:31-12:32). This seat's `rm` of it was refused by the permission layer, so it is still there. It is untracked bytecode, and the next seat or the cursor owner can delete it. Later runs set `PYTHONDONTWRITEBYTECODE=1` |

The checklist has nine fixed rows, and each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | PASS |
| 3 | no vacuous gate | PASS |
| 4 | every visual claim carries π/DELTA | PASS |
| 5 | every ledger row terminal, pointing at a wave that covers it | PASS |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | PASS |
| 7 | DAG acyclic, one source, band 0 external only on D3 | FAIL (FH-01) |
| 8 | every break has a MIGRATION row, no alias | PASS |
| 9 | no re-booked chronic | PASS |

**clean = false.** One new finding. All three of pass 7's findings are cured as named, and all three sweeps exit 0. One sweep is too narrow for its class: `reshape-order.py` never expands a brace-listed deletion, and the missed instance is a band-A gate that plants into a file W-G.1 deletes (FH-01).

## Sweeps, re-run at `64ff7aa2`

Each sweep ran from the checkout's `formation-audit/sweeps/`.

| sweep | command | exit | summary line |
|---|---|---:|---|
| `reshape-order.py` | `python3 reshape-order.py` | **0** | `rows 51, open 0, stale 0` |
| `borrowed-red.py` | `python3 borrowed-red.py` | **0** | `rows 0, open 0, stale 0` |
| `fl6-plate-reads.py` | `python3 fl6-plate-reads.py /Users/mkbabb/Programming/glass-ui` | **0** | `reads 27, open 0` (19 flagged by H1-G23 and cited in item 8, 8 reads on the 7 SURFACES rules) |
| `plan_dag.py` | the shared reader, imported by the three above (no `main`) | 0 on import | used for row 7 below |

**Width of each sweep against its class:**
- **`reshape-order.py` is too narrow.** This is FH-01.
- **`borrowed-red.py`: no missed instance found.**
  - It keys BORROWED on the recorded HEAD reading. This seat re-ran it with ENOENT, `MODULE_NOT_FOUND`, `No test files`, `not found` and `exit 127` added to the absence words: 0 rows.
  - It also listed every §5 gate that runs a `scripts/`, `tests/`, `tests-visual/` or `.github/` file absent at HEAD, landed by an earlier wave and not edited by the gate's own wave. That gives one row, G-L8-7 (`verify-ledger.mjs`, W-B.1). Fix-8 re-founded its RED on W-L.8's own act.
  - RESTATED misses commands that share a test file but differ in their fragment spans: E8-G1 against W-J.1 G14 (`radius-role-canon.test.ts`), and E9-G1 against E14-G3 (`layout-canon.test.ts`). Each pair gates different `it`s (`:458` against new rows; `:371,:403` against `:390`), so none of them is a restatement.
- **`fl6-plate-reads.py`: no missed instance found.**
  - It reads only literal `var(--glass-plate-…)` reads, so a state rule that reads a SURFACES token (`--control-surface-bg`, the `--color-glass-quiet` bridge, `--feedback-tone-rung`) would pass. This seat looked for one in `src`. `--control-surface-bg` is read at rest only (`control-surfaces.css:79`, `defined.css:82`), and its hover twin is flagged (`glass.css:257`). `bg-glass-quiet` and `--color-glass-quiet` have no reader. `--feedback-tone-rung` is read only as the toast's fallback (`feedback-tone.css:83`).
  - A `.ts` or `.tsx` file in `src` names a plate only in comments.
  - Recorded under Notes.

## Pass 7, re-verified

| id | verdict | reading here |
|---|---|---|
| FG-01 | cured as named | **Edges.** The closure of PLAN §5 (`plan_dag.py`) orders W-A.3 → W-A.5 → W-D.2 → {W-L.2, W-L.3} → W-L.8. W-A.6, W-E.1 and W-K.1 stay unordered against W-D.2, as the workflow note records (`PLAN.md:394-398`). W-D.2 §3 item 6 (`W-D.2.md:71-73`) puts `payload.mjs --enforce` into `verify.yml` and keeps the non-verify steps in their jobs. W-L.2 item 12 and §4 write into `verify.yml`. W-L.3 item 8 takes the step out of `verify.yml`. W-L.8 step 5 names the post-W-D.2 jobs. **Gates.** A5-G5 exits 1 here; it reads the workflow directory. A3-G5 exits 1; it reads `visual` anywhere in a `needs` list. G-L3-8 exits 1; its middle clause reads every workflow file. One more instance of the class, which the sweep misses, is FH-01 |
| FG-02 | cured as named | **The reader at HEAD.** Appendix C (`plate-reads.mjs`), extracted from the spec and run on the worktree, exits **1**: 27 reads, 19 outside the surfaces. **Bite.** On a `git archive HEAD src` copy, every flagged line's `var(--glass-plate-*)` was rewritten to `var(--fill-selected)`, and the reader exits **0** (7 reads, 0 outside). A plant `src/zz-plant.css` with a `:hover` background and a `[data-state="on"]` hook token split across lines makes it exit **1**, naming both rules. **Spec.** Item 8 cites each of pass 7's three lines (`configurator/styles.css:529`, `glass.css:116`, `dark-arm.css:286`), and §6 carries their π row |
| FG-03 | cured as named | **Struck gates.** G-L8-4, B14-G2, H3-G4 and I4-G6 are struck with reasons (`W-L.8.md:99`, `W-B.14.md:38`, `W-H.3.md:72`, `W-I.4.md:80`). `grep` finds none of them cited live in `PLAN.md`, `LEDGER.md`, `audit/`, `ledger/` or another spec. **G-L8-3.** Appendix B (`artefact-origin.mjs`), extracted and run against the registry, gives: `11.0.0 v11.0.0` → `FAIL no tag v11.0.0`, exit **1**; `10.1.0 v10.1.0` → 3 PASS (source `d8bda2a9…`, `release.yml@refs/tags/v10.1.0`, sha512 `d0277211…`), exit 0; `10.1.0 v10.0.1` → source and workflow FAIL, exit **1**. **G-L8-7.** Its new HEAD reading, 11 `pending` docket rows, matches this seat's count over `LEDGER.md` |

## Gates re-run at `64ff7aa2`

**Static gates, all 99 specs.** This seat's extractor (`crit-8/extract.py`) took every backticked span in the gate column of each §5 table, 894 spans in all:
- 500 are fragments;
- 95 are harness, browser, registry or placeholder spans;
- 6 belong to struck rows;
- 293 ran in the worktree with the library and demo built (`crit-8/run.py`: light commands six at a time, builds and vitest serially, 240 s cap).

W-F.5's §5 is a two-column table whose seven gates are appendix A's rows, so it contributes no static span.

Nonzero exits by band: 0 16/23, A 47/52, B 28/31, C 20/21, D 9/11, E 31/39, F 4/4, G 23/25, H 13/13, I 23/25, J 4/7, K 11/11, L 27/31. Every band has RED readings. This seat read the HEAD column of each of the 37 zero exits. Each one is:
- a labelled hold line: W-0.1 G5, W-0.10 G3, W-0.2 G3, W-0.3 G6, W-0.4 G6, W-0.6 G5, B10-G3, B15-G3, D2-G5, G2-G4, W-J.2 G6, G-L3-9, and the floor half of W-I.1 G29;
- a recorded count or value: C4-G7 `20`, G-L5-4 `4.0.0`;
- the `wc -l` reading of A1-G11;
- a build or vitest half run without its plant or its edit: A2-G8, A5-G7, G-L6-2, the `npm run build` halves of D2-G6, E11-G3, E11-G4, G1-G11 and G-L5-1, and A2-G10, which this seat re-ran with its `touch` step (below);
- a latch file still carrying `it.fails`, or a test the wave writes rows into: E8-G1, E9-G1, E10-G0, E14-G3, W-I.1 G12, W-J.1 G14, W-J.2 G1, B8-G5;
- a span cut at a fragment: E6-G8 `perl`, E6-G10 `node --experimental-strip-types`.

**BLOCKER families** (F-01, F-21, F-68):
- **F-01 (W-A.2).** Every W-A.2 span is nonzero except A2-G8, whose HEAD reading is the SURVIVED exit 0 of the unplanted run, and A2-G10, run bare. With its step (`touch src/components/badge/index.ts`, then `npx vitest run tests/gates/boot-graph.test.ts`), A2-G10 exits **1**: `× the dist-demo it measures is NEWER than every source it is built from`.
- **F-68 (W-0.7, W-L.7, W-L.8).**
  - W-0.7: G1, G2, G5 and G8 exit 1; the tag reads G6 and G9 exit 128.
  - W-L.7: G-L7-1 to G-L7-3 exit 1.
  - W-L.8: G-L8-1, G-L8-2, G-L8-6, G-L8-7, G-L8-9 and G-L8-14 exit 1; G-L8-12 exits 128; G-L8-3 is exit 1 by appendix B (above).
- **F-21 (W-E.2 appendix A).** `e2.mjs`, extracted from the spec, ran in Chromium against this seat's band-E app and the worktree's `dist-demo` with `WAVE=W-E.2`: **21 rows, 20 FAIL**, exit 1. The readings equal pass 7's:
  - E2-G1: `relative`, top 992 and 1109.2, flush `24px`;
  - E2-G2: travel 0;
  - E2-G4: reach 2 on four rungs, `contain: paint`;
  - E2-G5: 127 > 85;
  - E2-G6: 3 of 3 clipped at 390 and 1440;
  - E2-G7: `scale 1`, `blur(0px)`;
  - E2-G8: 9 and 13 px;
  - E2-G9: no fade;
  - E2-G10: 44 against 54;
  - E2-G11: `rotate 180deg` on a closed trigger.
- **H1-G21** (the E2-G3 block): light ΔE 0.0562 (PASS), dark **0.0013**, PRT **0**.
- **H1-G22 and E6-G2** (W-E.6 appendix A): `blends ["plus-lighter"]`, background `oklab(0.807187 …)` light and `oklab(0.4059 …)` dark. The block reads 12 rows, 11 FAIL, exit 1. E6-G6 is the one PASS, as recorded.
- **H1-G23:** exit **1**, 19 lines (above).

Not re-run here:
- the D-band and loop-harness browser gates (`$H`, `$D3_OUT`);
- the W-F.* and W-G.1-W-G.5 GPU and wired gates;
- fix-8's appendix U paint probe.

Their static halves ran above. Fix-8's appendix U π readings are HEAD records for the §6 row, not gates.

## Row 1 · families placed

No finding. `audit/REGISTRY.md` has 85 `#### F-nn` headers. PLAN §3's 99 wave rows name all 85, with none missing and none extra (script).

Fourteen families appear in more than one row: F-16, F-21, F-22, F-24, F-28, F-29, F-31, F-33, F-40, F-50, F-54, F-63, F-65 and F-68. Each has exactly one unsplit placement, and every other row marks itself "split". `waves/INDEX.md` matches §3's families on 99 of 99 waves.

## Row 2 · gates exist and are RED at HEAD

No finding. Every spec has a §5 table with at least one gate. Every band has RED readings, and every BLOCKER family reads RED above.

Fix-8's changed gates, read here:
- A3-G5: exit 1.
- A5-G5: exit 1.
- G-L3-8: exit 1.
- C1-G6: Playwright half, not re-run. The unit half is clean, as recorded.
- G-L8-3: exit 1 on its own tag.
- G-L8-7: reading re-founded, count matched.
- H1-G23: exit 1.

## Row 3 · vacuous gates

No finding. Fix-8's new gate forms were each checked for a bite:
- H1-G23: the plant above reddens it.
- G-L8-3: the `v10.0.1` mismatch reddens it.
- G-L3-8: fix-8's five-file fixture. This seat confirmed that the clause reads `.github/workflows` recursively.
- A3-G5 and A5-G5 are weak but not vacuous. A3-G5 accepts `visual` in any job's `needs`, not only `publish`'s. A5-G5 would accept the string in a comment. At HEAD neither has a satisfying line, and in the cured tree no other job needs `visual`.

These are under Notes.

## Row 4 · π and DELTA

No finding. Fix-8's one new visual claim is the re-point of the six FL-6 rules. It has its §6 row (`W-H.1.md`, §6 row 22): surfaces, themes, engines, captures and π, with HEAD readings for the chip, the wake, the track and the veil. The halo's HEAD reading is stated as not taken, with the reason given (the sheets sit at `y = 900`) and the wave's base named as where it is taken. The obligation stands. Fix-8's FG-01 and FG-03 edits make no visual claim.

## Row 5 · ledger rows

No finding.
- `LEDGER.md` is unchanged since fix-6 (`git diff e64da115 HEAD -- LEDGER.md` is empty).
- Every wave id it cites names a spec that exists: 0 dangling.
- The register rows' terminal column reads BUILD 153, FOLD 56 and RETIRE 42. The other words this seat's parser read come from the owner docket's columns (OW-1 to OW-12), whose terminals sit further right.
- No row cites a gate fix-8 struck.
- The `development`-condition half of L13-16, which fix-8 handed from W-C.3 to W-D.2, has its row in W-D.2 §1 (`W-D.2.md:26`). No ledger row points it at W-C.3.

## Row 6 · loop pre-emption

No finding. Fix-8's loop-wave edit is W-H.1 item 8 and H1-G23.
- Item 8's subject list (the segmented track, the capsule track, the switcher) predates fix-8: it is fix-5's text, present at `e64da115`.
- PLAN §4 hands "FL-6's state-fill list as W-H.1 builds it" to D3 as an obligation (`PLAN.md`, §4 obligations). Item 8 still says the census is D3's and that the wave builds the converged list.
- The W-0.8 exception stays recorded (`PLAN.md:38`).

## Row 7 · the DAG

**The walk.** This seat walked PLAN §5 with `plan_dag.py` and Python `graphlib`, with W-L.6's "every wave of bands C to K" expanded. It found:
- 99 rows, one per spec;
- a full topological order, so no cycles;
- 0 dangling ids and 0 edges into a later band;
- no band-0 wave with a dependency outside band 0;
- only W-0.1 and W-0.2 naming the D3 gate.

**Order claims in the specs.** A scan of every spec for order claims ("after", "waits on", "has already", "landed by", "lands first") against the closure finds 4 that the closure does not hold:
- W-A.5 → W-D.2 and W-B.9 → W-G.1 are forward references, with the order correct.
- W-C.2 → W-C.3 is gestalt prose.
- W-C.2's scope row, "the file's header after W-B.13's edit" (`W-C.2.md:28`), is under Notes: item 8 states the pair is unordered and converges.

### FH-01 · `reshape-order.py` never expands a brace-listed deletion, and misses A2-G8 planting into a file W-G.1 deletes

- **Where.**
  - **The sweep.** `formation-audit/sweeps/reshape-order.py` `deletions()` takes each backticked path from a `Deleted:` clause as one literal string. `names()` then matches a path by substring, or by a basename that must carry an extension. A brace list such as `src/components/blob/shaders/{metaball.frag,metaball.vert,…}.ts` is neither, so it never matches any other wave's text.
  - **The deletion.** W-G.1 §4 (`W-G.1.md:79`) deletes four such lists: the aurora GLSL shaders, `tests/composables/glass/{webgl,canvas2d}/`, `blob/composables/{buildMetaballProgram,uploadBlobUniforms}.ts`, and `blob/shaders/{metaball.frag,metaball.vert,sdf-body.glsl,watercolor-edges.glsl,oklch-perturb.glsl,metaball-uniforms.glsl}.ts`.
  - **The reader.** W-A.2 A2-G8 (`W-A.2.md:106`; plant at `:48`) appends `export const probeSecondContext = "webgl2";` to `src/components/blob/shaders/metaball.frag.ts`, "an allowed file, `gl-excise.test.ts:151-154`", and passes when the fence exits 1 naming the new member.
- **Defect.**
  - **The order.** W-A.2 lands before W-G.1 (closure: W-G.1 reaches W-A.2). W-L.8 §3.5 step 1 (`W-L.8.md:72`) requires every gate of bands A to L green on the release commit. So A2-G8 is re-run on a tree where its plant target is deleted, and where W-G.1 has retired the `gl-excise` latch that held the allow-list. W-A.2 §3.7 makes W-G.1 its owner.
  - **What the plant does.** On that tree, `>>` creates a one-line file at a deleted path. Whether the fence then names it depends on what W-G.1 leaves of `gl-excise.test.ts`, and no spec says.
  - **Why the sweep misses it.** This is the sweep's own BEFORE row (X deletes P, an earlier Y's §5 names P, and the release-commit re-run reads it). Fix-8's adjudication table therefore needed a reading for it and has none. The sweep exits 0 because the row is never enumerated.
  - **The class.** It is FG-01's class (FF-02's: one wave deletes what an earlier gate reads). The sweep is the enumeration fix-8 put in place of a list, so a parser gap in it reopens the class.
- **Evidence.**
  - This seat re-ran the sweep's enumeration with `deletions()` brace-expanded and every other rule unchanged. It prints exactly one new row: `BEFORE W-G.1 src/components/blob/shaders/metaball.frag.ts W-A.2`. In `plan_dag.py`, `before('W-A.2','W-G.1')` is True.
  - The other expanded paths are the aurora shader names, `tests/composables/glass/webgl/`, `canvas2d/` and the two blob composables. No other wave names any of them.
  - At HEAD, `test -e src/components/blob/shaders/metaball.frag.ts` passes, and the sweep prints no `metaball` row (`grep metaball` over its output: 0 lines).

## Row 8 · breaks and aliases

No finding.
- Fix-8's public-facing change is W-D.2 dropping `prepare`. It has a MIGRATION row: "installing `@mkbabb/glass-ui` from a git URL built `dist/` through `prepare`" → "install from the registry" (`W-D.2.md:106`).
- `verify:package` keeps its row in W-L.3.
- The re-pointed FL-6 rules change token values, not names. The dropped plate fallbacks are internal and are the masking-fallback cure.
- No alias appears in the fix-8 diff (`grep` over its added lines for alias, shim, legacy and fallback-kept wording: 0 lines that add one).

## Row 9 · re-booked chronics

No finding. A `grep` of fix-8's added lines in `PLAN.md` and `waves/` for later-tranche carries (`BM`, "next tranche", "after BL", `12.0.0`, "later tranche", "future tranche", "re-book", "defer", "BANKED") finds none. `LEDGER.md` is unchanged, and no row reads BANKED (the four-word count above).

## Notes outside the checklist (not counted)

- **The generated CI-step block.** W-C.3's `regen-docs.mjs` writes `build-and-gates.md`'s CI steps from every `.github/workflows/*.yml`, and its `--check` (C3-G3) runs in the suite. The sweep's reading for `W-A.3|WORKFLOWS|W-C.3` says "a later workflow edit regenerates it". Only W-D.2 §3 item 6 says so. W-A.6, W-E.1, W-K.1, W-L.2 and W-L.3 each edit a workflow after W-C.3 and do not mention regeneration. The suite surfaces it in each wave, so this is a recipe gap, not an ordering defect.
- **W-C.2's scope row** (`W-C.2.md:28`) still describes `release.yml`'s header "after W-B.13's edit". Item 8 (`:50`) says the pair is unordered and either order converges. The row should match item 8.
- **ONE-VERIFY against the fixture builds.** D2-G1's ONE-VERIFY arm counts any `run: npm run build|typecheck|test` line outside `verify.yml`. W-E.1 and W-K.1 add a fixture-app build to `visual.yml`, and neither spec gives the step text. If it is written `run: npm run build` with a `working-directory`, the arm counts it.
- **A3-G5 and A5-G5 width.** A3-G5 accepts `visual` in any job's `needs`. A5-G5 accepts the string anywhere in a workflow file, comments included.
- **H1-G23 one hop.** The reader keys literal plate reads. A state rule that reads a SURFACES token (`--control-surface-bg`, `--color-glass-quiet`) would pass it. There is no instance at HEAD.
- **Lowercase deletions.** `reshape-order.py` also misses deletions written `deleted \`…\`` (W-G.5 §4, `composables/{useBlobSatellites,satelliteKinematics}.ts`) and `name (deleted)` inside a brace list (W-I.1 §4, `useDockSpring (deleted)`). No other wave names the blob pair. `useDockSpring` is named by W-B.15 and W-G.6 only in §1 HEAD readings, and both land before W-I.1. So neither form has a live instance. FH-01's cure should cover both forms.
- **Fence.** This seat did not read or write `design/`. The extracted gates, results, the band-E app, the bite copy and the probe outputs are in this seat's scratchpad (`crit-8/`), outside the checkout. The `sweeps/__pycache__/` left in the checkout is recorded in the header.
