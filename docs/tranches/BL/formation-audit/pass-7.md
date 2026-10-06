# BL — formation audit, pass 7

| field | value |
|---|---|
| seat | formation critic, pass 7. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-6 or fixes 2-7 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `a1732a48` for every probe. Since fix-7's commit `532857cd`, the only change is one cursor line in `FORMATION-PROGRESS.md`. `git diff --stat v10.1.0 HEAD -- src` is empty, so `src` is the published 10.1.0 |
| inputs read | `PLAN.md` §1, §2 and §5-§7 in full, and §3 by script; the fix-7 diff over `waves/` (487 lines) in full; all 99 specs by script, plus the §3-§5 of W-A.5, W-D.2, W-L.2, W-L.3, W-L.4 and W-L.8, W-H.1 §3.2 item 8, §4, §5 and §6, W-0.1 appendix A, W-E.1 appendix B and W-E.2 appendix A; `LEDGER.md` by script; `audit/REGISTRY.md` (family headers); `audit/INBOUND.md` was not re-read (fix-7 did not touch it); `formation-audit/pass-6.md`; `formation-audit/fix-7.md` last |
| where probes ran | a worktree at `a1732a48` (`scratchpad/formation/crit-7/wt`, `node_modules` and `tests-visual/node_modules` symlinked). `npm run build` and `npm run demo:dist:build` both exit 0. The band-E consumer app (W-E.1 appendix B, built against `npm pack` of the worktree) is in `crit-7/bandE/`, served on :5874, with the demo dist on :5873. The worktree was removed and both servers stopped before return. Chromium is Playwright's. Playwright WebKit was not run. Real-Safari cells are UNMEASURED (OW-3). Load average 7-12 |
| fences | no source edit; no git write except the worktree add and remove; nothing under `design/` read or written; the one write in the checkout is this file |

The checklist has nine fixed rows, and each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | PASS |
| 3 | no vacuous gate | FAIL (FG-02, FG-03) |
| 4 | every visual claim carries π/DELTA | PASS |
| 5 | every ledger row terminal, pointing at a wave that covers it | PASS |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | PASS |
| 7 | DAG acyclic, one source, band 0 external only on D3 | FAIL (FG-01) |
| 8 | every break has a MIGRATION row, no alias | PASS |
| 9 | no re-booked chronic | PASS |

**clean = false.** 3 new findings. All three of pass 6's findings are cured as named. Two of them recur by class, in places fix-7 did not sweep:
- FG-01 is FF-02's class (one wave deletes or moves what an unordered wave builds on), across the CI workflow files.
- FG-02 is FF-03's class (H1-G23 goes green while an FL-6 plate read stands), for the third time.

## Pass 6, re-verified

| id | verdict | reading here |
|---|---|---|
| FF-01 | cured as named | Each kit in PLAN's list (`PLAN.md:383-391`) has one lander named in its own §4, and every user's §4 names the kit as the lander's. Checks: W-0.3 §4 (`W-0.3.md:70`); W-0.1, W-0.2, W-0.4, W-0.8 and W-0.9 §4; W-F.1 §4 against W-F.2 §4 and appendix D; W-B.9 §4 against W-G.1 §4; W-G.6 §4 and appendix D against W-G.7 §4 and appendix B; W-K.11 §4 against W-K.5 §4. Every user reaches its lander in this seat's closure of §5 (`crit-7/dag.py`). The band-0 kit waits on no loop: W-0.3 has no dependency. A sweep of same-band wave ids in every spec against the closure finds 37 unordered mentions. This seat read each context. None is a kit: they are routing prose, text locations of an appendix (W-F.6 and W-F.7 cite "`lib.mjs` is W-F.2 appendix D", which the note allows, and both depend on the lander W-F.1), HEAD readings, or the W-G.4/W-G.5 pair recorded as unordered |
| FF-02 | cured as named; class open | W-L.3 → W-L.4 is in §5 (`PLAN.md:363`), G-L4-5 is gone, and W-L.4 §4 no longer lists `scripts/verify-export-types.mjs`. G-L3-8 exits **1** here. W-L.8 step 4 and G-L8-4 no longer read deleted files. The same class stands between W-D.2 and three workflow-editing waves: FG-01. Fix-7's new G-L8-4 is FG-03 |
| FF-03 | cured as named; class open | The H1-G23 block, extracted from `W-H.1.md` and run in the worktree, prints the 9 lines fix-7 lists and exits **1**. On a `git archive` copy of `src` with fix-7's second bite state applied (the seven tokens re-pointed, both fallbacks dropped), it exits **0**, as fix-7 says. That copy still carries three FL-6 plate reads that no gate sees: FG-02 |

## Gates re-run at `a1732a48`

**Static gates, all 99 specs.** This seat's extractor (`crit-7/extract.py`) took every backticked span in the gate column of each §5 table (897 spans, `\|` → `|`).
- 513 are fragments, not commands (paths, selectors, values).
- 84 were skipped: `$H` and `$D3_OUT` harness calls, Playwright runs, `npm view`/`npm pack`, `gh run`, placeholders and appendix references.
- The other 300 ran in the worktree with the library built (`crit-7/run.py`, six at a time, 240 s cap; builds and vitest runs serial).

Nonzero exits by band: 0 16/23, A 49/52, B 31/34, C 20/22, D 9/11, E 33/39, F 4/4, G 23/25, H 13/13, I 24/26, J 4/7, K 11/11, L 28/33. Every band has RED readings. This seat read the HEAD column of every zero exit. Each one is one of:
- a labelled hold line: W-0.10 G3, W-0.2 G3, B15-G3, G2-G4, G-L3-9;
- a recorded count or value: C4-G7 `20`, G-L5-4 `4.0.0`;
- the hold half of a two-part gate: W-0.1 G5, the floor half of W-I.1 G29;
- a struck gate: C1-G7;
- the `wc -l` reading of A1-G11;
- a build or vitest half run without its plant (A5-G7) or before its conversion (the latch files).

**BLOCKER families** (F-01, F-21, F-68):
- **F-01 (W-A.2):** 49 of 52 band-A spans exit nonzero, and every W-A.2 span is nonzero.
- **F-68 (W-0.7, W-L.7, W-L.8):** every span that ran exits nonzero, except the `npm run build` half of G-L8-4. W-0.7 G5's span is a stdin fragment and timed out. The tag reads (G6, G9, G-L8-12) exit 128.
- **F-21, W-E.2 appendix A** (`e2.mjs` extracted from the spec), run in Chromium against this seat's band-E app and the worktree's `dist-demo` with `WAVE=W-E.2`: **21 rows, 20 FAIL**. The readings match pass 6:
  - E2-G1, 4 of 4: `position: relative`, top 992 and 1109.2, flush corners `24px`.
  - E2-G2: travel 0. E2-G4: reach 2 on all four rungs (`contain: paint`). E2-G5: 127 > 85.
  - E2-G6: 3 of 3 clipped at 390 and 1440. E2-G7: `scale 1`, `blur(0px)`. E2-G8: 9 and 13 px. E2-G9: no fade.
  - E2-G10: 44 against 54. E2-G11: `rotate 180deg` on a closed trigger.
- **H1-G21** (that run's G3 block): light ΔE 0.0562 (PASS), dark **0.0013**, PRT **0**. 2 of 3 FAIL.
- **H1-G22 and E6-G2**, through W-E.6 appendix A: `blends ["plus-lighter"]`, background `oklab(0.807187 …)` light and `oklab(0.4059 …)` dark. FAIL in both themes. The whole block reads 12 rows, 11 FAIL (E6-G6 is the one PASS, as recorded).
- **H1-G23:** **exit 1**, 9 lines (above).
- **Fix-7's press probe** (appendix T, extracted and run over the worktree's `dist-demo`) prints the six rows of `W-H.1.md:207` to four places. Icon press against rest reads 0.1034 light and 0.0464 dark; active against inactive reads 0.1981 light and 0.3074 dark. It saved 16 PNGs.

Not re-run here:
- the band-0 browser gates (fix-2 appendix P), whose static spans read 16 of 23 RED above;
- the HIGH browser gates that need their wave's own app, a GPU or a loop harness (W-F.*, W-G.1 to W-G.5, the `$H` calls of W-0.1, W-H.1, W-H.2, W-I.1 and W-J.1, and I7-G4).

Their static halves ran above.

## Row 1 · families placed

No finding. `audit/REGISTRY.md` has 85 `#### F-nn` headers. PLAN §3's 99 wave rows name all 85, with F-30 as its two rows F-30a and F-30b (`REGISTRY.md:110`). `waves/INDEX.md` matches §3's families column on 99 of 99 waves (script). Fix-7 moved no family.

## Row 2 · gates exist and are RED at HEAD

No finding. Every spec has a §5 table with at least one gate. Every band has RED readings in the static run, and every BLOCKER family reads RED above. Fix-7 changed or added four gates:
- H1-G23: RED, 9 lines.
- G-L3-8: RED, exit 1.
- G-L8-4: RED, but only by an absent file. See FG-03.
- G-L4-5: removed. W-L.4 keeps G-L4-1, G-L4-3 and G-L4-4, all exit 1 here.

## Row 3 · vacuous gates

### FG-02 · H1-G23 goes green while three more FL-6 plate reads stand

- **Where.** W-H.1 §3.2 item 8 (`W-H.1.md:98`): "No state fill or dim reads a plate token". It covers "hover, active, selected, checked …", and "the focus veil and the sheet scrim read the scrim ink". The item then lists "seven state tokens" and two fallbacks. §4 (`:129`) lists the same, and H1-G23 (`:170`, the block after the table) reads only those seven token names plus any `var(--x, var(--glass-plate-…))`.
- **Defect.** Three plate reads in the item's own subject are named in no item, §4 line, gate or §6 row:
  - `src/components/configurator/styles.css:529`: `.configurator-preset-chip.is-active { --glass-capsule-fill: var(--glass-plate-quiet); }`. This is the selected preset chip's fill, set straight to a plate. The comment above it calls it "the selected rung".
  - `src/styles/tokens/glass.css:116`: `--glass-focus-veil-dim: color-mix(in oklab, var(--glass-plate-overlay) 50%, transparent)`, read by `glass/focus-veil.css:74`.
  - `src/styles/tokens/dark-arm.css:286`: the same token's dark arm, at 40 %.
  - So H1-G23 passes on a tree where FL-6's defect stands. No paint gate holds these surfaces either. H1-G21 is the ToggleGroup, H1-G22 the chip of W-E.6, and G14 the dock tabs. The §6 state-fill rows (`:206-207`) capture the checks, the toggle hover, the dock and the switcher, but not the configurator chip or the focus veil. `grep -rn "preset-chip\|glass-capsule-fill\|focus-veil-dim"` over `PLAN.md`, `LEDGER.md` and `waves/` finds 0 lines.
  - This is the third time the class has recurred: FE-02 (one fallback), FF-03 (the press and a second fallback), and now a selected fill set through a hook token, and a dim. Each cure enumerated what the last critic found. Fix-7 widened the fallback half to the whole class but left the declaration half as a closed list of names.
- **Evidence.**
  - The bite copy is `crit-7/bite/`: `git archive HEAD src`, `git init`ed. It has fix-7's second bite state: the seven declarations re-pointed at `oklch(from var(--foreground) l c h / var(--fill-selected))`, and the fallbacks at `layer-group.css:353` and `icon-button.css:199-202` dropped (`git diff --stat`: 6 files).
  - The H1-G23 block, extracted from the spec, exits **0** on that copy.
  - `grep` on the same copy still prints `configurator/styles.css:529`, `glass.css:116` and `dark-arm.css:286`.
  - A whole-file scan of `src` CSS and SFCs for any custom property declared from `--glass-plate-` lists 14 declarations. These three are the only state or dim ones outside H1-G23's list. The others are the ladder itself, `--feedback-tone-rung` and `--color-glass-quiet`.

### FG-03 · G-L8-4 is A5-G1 restated, and it enters W-L.8 green

- **Where.** `W-L.8.md:99` (fix-7). On the release commit after `npm run build`, it runs `git diff --quiet HEAD && node scripts/payload.mjs --enforce`, passes on exit 0, and records "**exit 1** (… `Cannot find module …/scripts/payload.mjs`; W-A.5 lands it)".
- **Defect.**
  - The gate's RED is the absence of another wave's script, not W-L.8's defect.
  - A5-G1 (`W-A.5.md:54`) is `npm run build && node scripts/payload.mjs --enforce`, passing on exit 0. W-A.5 lands before W-L.8 (W-L.8 → W-L.7 → W-L.3 → W-A.5).
  - So at W-L.8's base, G-L8-4 exits 0 on any clean commit, before W-L.8 binds or records anything. PLAN §1 says "No gate enters a wave green unless it is a labelled hold line with its bite". G-L8-4 is not labelled as one and has no bite of its own.
  - The old form compared the bound datum with `npm view … dist.unpackedSize`, the shipped bytes. The new form never reads the published artefact, so it cannot tell a tarball published from a different tree from the committed one, which is the F-12 law the row's old name ("the datum is the shipped bytes") stated.
  - Its one live clause is a duplicate. W-A.5 §3 item 3 wires `payload.mjs --enforce` into `release.yml` before `publish`, so G-L8-5 (`:100`, the release run reads `success`) already fails when it fails.
- **Evidence.** In the worktree, the `npm run build` half exits 0 and the payload half exits 1 (absent script). A5-G1 exits 1 for the same reason. The two commands differ only in `npm run build &&` against `git diff --quiet HEAD &&`.

## Row 4 · π and DELTA

No finding. Fix-7's one new visual claim, the press and active icon row (`W-H.1.md:207`), names surfaces, themes, engines, captures and π, and its HEAD readings were re-taken here to four places. Fix-7's other edits make no visual claim. FG-02's three surfaces lack a §6 row as well as a gate. That is the same defect and is counted once, under row 3.

## Row 5 · ledger rows

No finding. `LEDGER.md` is unchanged since fix-6 (`git diff 8397fcae HEAD -- docs/tranches/BL/LEDGER.md` is empty). Every wave id it cites names a spec that exists. `UNPLACED` appears only in the lines that say no row carries it (`:11,28,491,535`). No ledger row cites G-L4-5 or the deleted `.bundle-ratchet` path as its closing gate (`grep`, 0 lines).

## Row 6 · loop pre-emption

No finding. Fix-7 moves the band-0 probe's landing to W-0.3, ahead of D3. The probe is a measurement kit: its scenes and rows (`W-0.1.md` appendix A) build no token, recipe or route that D3 is choosing, and W-0.1 and W-0.2 still build O-62 and O-76 only from D3's converged spec. The W-0.8 exception stays recorded (`PLAN.md:38`).

## Row 7 · the DAG

This seat's walk of PLAN §5 (`crit-7/dag.py`, Python `graphlib`, with W-L.6's "every wave of bands C to K" expanded) found:
- 99 rows, one per spec;
- a full topological order, so no cycles;
- 0 dangling ids and 0 edges into a later band;
- no band-0 wave with a dependency outside band 0, and only W-0.1 and W-0.2 naming the D3 gate.

No spec's dependency section or "depends on"/"waits on" sentence lists two or more of its own §5 edges (script, 0 hits).

### FG-01 · W-D.2 restructures the CI workflows, and three unordered waves write steps into the old shape

- **Where.**
  - W-D.2 §3 item 6 (`W-D.2.md:70`) creates `.github/workflows/verify.yml`. It holds `npm ci`, typecheck, build, demo build, `npm test` and **`npm run verify:package`**. W-D.2 makes `ci.yml` `jobs.verify: uses: ./.github/workflows/verify.yml`, and has `release.yml` run `verify` the same way, with "No other workflow line runs a build, a typecheck or the test suite". Its D2-G1 arm ONE-VERIFY enforces that.
  - **W-A.5** §3 item 3 (`W-A.5.md:38`): "`ci.yml`'s `verify` job runs `node scripts/payload.mjs --enforce` after `npm run build`". A5-G5 (`:58`) is `grep -q "payload.mjs --enforce" .github/workflows/ci.yml`.
  - **W-L.2** §3 item 12 (`W-L.2.md:83`): "`ci.yml` runs [`check:consumer`] after `build`".
  - **W-L.3** §3 item 8 (`W-L.3.md:69`) deletes `verify:package` and `scripts/verify-export-types.mjs`. G-L3-8 (`:88`) checks `ci.yml` for `consumer-matrix` and checks `package.json` and `release.yml` for no `verify:package`. It does not read `verify.yml`.
  - **§5.** W-D.2 depends on W-D.1, W-A.1, W-A.3, W-A.4 and W-B.13 (`PLAN.md:307`). Its only dependants are W-L.6, W-L.7 and W-L.8 (closure). W-A.5 (`:284`), W-L.2 (`:362`) and W-L.3 (`:363`) neither reach W-D.2 nor are reached by it.
  - At HEAD, `ci.yml` has one `verify` job with inline steps (`ci.yml:9-31`). `release.yml:52` runs `verify:package`.
- **Defect.** Each of the three pairs is unordered, and each order breaks a spec or a gate:
  - **W-A.5 and W-D.2.**
    - If W-A.5 lands first, W-D.2 replaces the `verify` job's steps with a `uses:` call whose step list has no payload run. The payload gate leaves CI, and A5-G5 turns red after its wave closed.
    - If W-D.2 lands first, `ci.yml`'s `verify` job has no steps to add to and no build to run after. W-A.5 must edit `verify.yml`, a path its spec does not name, and A5-G5 still greps `ci.yml`.
  - **W-L.2 and W-D.2.** The same as above, for `check:consumer` after `build`.
  - **W-L.3 and W-D.2.**
    - If W-L.3 lands first, W-D.2 writes `npm run verify:package` into `verify.yml` after the script is deleted, and the verify build fails.
    - If W-D.2 lands first, W-L.3 deletes the script while `verify.yml` still calls it. G-L3-8 goes green, since `package.json` and `release.yml` no longer name it, on a tree where every CI run fails.
  - **W-L.8.** W-L.8 lands after all four. Its step 5 (`W-L.8.md:76`) still describes `release.yml`'s steps "in order as W-A.5 and W-L.3 leave them (`npm ci`, `typecheck`, `build`, …)", but W-D.2 moved them into `verify.yml`.
  - This is FF-02's class (a wave deletes or reshapes what an unordered wave builds on), and pass 6's fix swept the one pair named. W-D.1's move ledger does not cover it: it re-points moved *paths* in gates, and these are workflow steps.
- **Evidence.** `crit-7/dag.py`'s closure, with the dependants of W-D.2 = {W-L.6, W-L.7, W-L.8}, and W-A.5, W-L.2 and W-L.3 unordered against it. `grep -n "verify:package\|verify.yml" waves/W-D.2.md waves/W-L.3.md`, and the lines cited. In the worktree, A5-G5 and G-L3-8 both exit 1 at HEAD, so neither gate sees the conflict before a wave lands.

## Row 8 · breaks and aliases

No finding. Fix-7 changes no public surface. The `verify:package` deletion it re-homes in W-L.3 already has its MIGRATION row ("none (a repo script)", `W-L.3.md:110`). The two dock plate fallbacks it names are internal and keep their token names. No alias appears in the diff.

## Row 9 · re-booked chronics

No finding. A grep of `PLAN.md`, `LEDGER.md` and every spec for later-tranche carries (`BM`, "next tranche", "after BL", `12.0.0`, "later tranche", "future tranche", "re-book") finds only lines that forbid re-booking or describe a HEAD defect. 47 lines of `LEDGER.md` read DISEASE, and none is BANKED.

## Notes outside the checklist (not counted)

- **W-G.4 and W-G.5.** W-G.5 §8 says the configurator rows "attach when both are in" (`W-G.5.md:119`). W-G.4's studio generates its rows from each viz's config fields (`W-G.4.md:63`), so either order converges without a second path. Recorded, as fix-7 records it.
- **W-D.2 item 8** names `verify-export-types.mjs:377`'s `stripCssComments` as the model for `scripts/lex/`. If W-L.3 lands first, the cite points at a deleted file. That is prose, and FG-01's ordering cure would settle it.
- **W-0.1 appendix A, `CHECKOUT`.** The probe's absolute `CHECKOUT` literal becomes the repository root when W-0.3 lands it (`W-0.1.md:121`). The spec says so, and recording it costs nothing.
- **Fence.** This seat did not read or write `design/`. The extracted gate list, results, bite copy, band-E app, press-probe captures and DAG walk are in this seat's scratchpad (`crit-7/`), outside the checkout.
