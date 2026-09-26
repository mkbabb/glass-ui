# BL — formation audit, pass 6

| field | value |
|---|---|
| seat | formation critic, pass 6. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-5 or fixes 2-6 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `aa28d43c` (fix 6's commit) for every probe. `git diff --stat v10.1.0 HEAD -- src` is empty, so `src` is the published 10.1.0 |
| inputs read | `PLAN.md` in full; the fix-6 diff (`git diff 958ca517 aa28d43c -- docs/tranches/BL/waves docs/tranches/BL/PLAN.md`, 470 lines) in full; `waves/INDEX.md`, `LEDGER.md` and all 99 specs by script, plus the §3-§5 and appendices of W-0.1, W-0.3, W-0.4, W-0.8, W-F.1, W-F.2, W-G.2, W-G.6, W-G.7, W-H.1, W-H.2, W-H.5, W-K.1, W-L.3 and W-L.4, and the dependency paragraph of every spec fix-6 edited; `audit/REGISTRY.md` (family headers); `audit/INBOUND.md`; `formation-audit/pass-5.md`; `formation-audit/fix-6.md` last |
| where probes ran | a worktree at `aa28d43c` (`scratchpad/formation/crit-6/wt`, `node_modules` and `tests-visual/node_modules` symlinked; `npm run build` exit 0; `npm run demo:dist:build` exit 0), removed before return. The band-E app is the band-E seat's build of the packed 10.1.0 (pass 5 hashed it against a 10.1.0 `dist`; `src` has not changed since). Chromium is Playwright's. Playwright WebKit is not Safari; every real-Safari cell is UNMEASURED (OW-3). Load average 28-57 |
| fences | no source edit; no git write except the worktree add and remove; nothing under `design/` read or written; the one write in the checkout is this file |

The checklist has nine fixed rows, and each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | PASS |
| 3 | no vacuous gate | FAIL (FF-03) |
| 4 | every visual claim carries π/DELTA | PASS |
| 5 | every ledger row terminal, pointing at a wave that covers it | PASS |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | PASS |
| 7 | DAG acyclic, one source, band 0 external only on D3 | FAIL (FF-01, FF-02) |
| 8 | every break has a MIGRATION row, no alias | PASS |
| 9 | no re-booked chronic | PASS |

**clean = false.** 3 new findings. Of pass 5's 3 findings, all 3 are cured as named. FF-01 is FE-01's class in kits fix-6's rule does not reach; FF-03 is the hole fix-6 closed for one fallback, still open for two other dock state fills.

## Pass 5, re-verified

| id | verdict | reading here |
|---|---|---|
| FE-01 | cured as named | Every pair pass 5 named is an edge in §5: W-E.2, W-E.6, W-E.7, W-E.9 → W-E.1 (`PLAN.md:309,313,314,316`); W-G.3, W-G.5 → W-G.6 (`:331,333`); W-H.2, W-H.5 → W-H.1 (`:337,340`); W-E.4 → W-E.2 (`:311`); W-K.4 → W-K.5 (`:353`); and the band-K app edges (`:351,356-359`), with W-K.1 §4 now landing `tests-visual/fixtures/band-k/` (`W-K.1.md:56`). The sweep of every same-band wave id in every spec against §5's closure (`crit-6/dag.py`) finds none of those pairs unordered. The class remains in kits the new note does not list: FF-01, FF-02 |
| FE-02 | cured as named | W-H.1 §6 has the state-fill row (`W-H.1.md:193`). Its probe, extracted from fix-6 appendix S and run here against this worktree's `dist-demo`, prints 16 rows that match fix-6's table to four places on 15 rows (switcher dark 0.0524 here, 0.0504 there). H1-G23 exits **1** here with 7 lines. The same hole class stays open on two other dock state fills: FF-03 |
| FE-03 | cured | Every spec's dependency section was read by script: none lists two or more of its own §5 edges (0 hits). A grep for "depends on" outside a `PLAN §5` citation finds one hit, W-H.2:78, which is prose about a paint count |

## Gates re-run at `aa28d43c`

**Static gates, all 99 specs.** This seat's extractor took every backticked command in a §5 gate column (343 spans, `\|` → `|`) and ran each in the worktree with the library built, six at a time, 240 s cap. 63 were skipped (`$H` and `$D3_OUT` harness calls, Playwright runs, `npm view`/`npm pack`, placeholders, appendix references). Of 280 run, nonzero exits by band: 0 15/21, A 48/51, B 28/31, C 19/22, D 9/11, E 30/36, F 2/2, G 20/22, H 12/12, I 24/25, J 4/7, K 10/10, L 24/30. Every band has RED readings. The zero exits are pass 5's list less one addition: G-L1-5 now exits 0, as fix-6 intended (a labelled hold line). Each zero is a labelled hold line, a latch file run before its conversion, the `npm run build` half of a two-part gate, a count whose pass condition is its value, or a command that needs its edit first (pass 5 lists them). No negated gate passed on an absent path.

**BLOCKER families** (F-01, F-21, F-68):
- F-01 (W-A.2): 48 of 51 band-A spans exit nonzero; the three zeros are A1-G11's `wc -l` and A5-G7's two spans run without their planted export.
- F-68 (W-0.7, W-L.7, W-L.8): every span that ran exits nonzero or is a fragment.
- F-21, W-E.2 appendix A (crit-5's extraction, run whole in Chromium against the band-E app and this worktree's `dist-demo`): **21 rows, 20 FAIL**. E2-G1 4 of 4 (`position: relative`, top 992 and 1109.2, flush corners `24px`); E2-G2 travel 0; E2-G4 reach 2 on all four rungs (`contain: paint`); E2-G5 127 > 85; E2-G6 3 of 3 clipped at 390 and 1440; E2-G7 `scale 1`, `blur(0px)`; E2-G8 9 and 13 px; E2-G9 no fade; E2-G10 44 against 54; E2-G11 `rotate 180deg` on a closed trigger.
- H1-G21 (the G3 block): light ΔE 0.0562 (control, PASS), dark **0.0013**, PRT **0**: 2 of 3 FAIL.
- H1-G22 and E6-G2 through W-E.6 appendix A: `blends ["plus-lighter"]`, background `oklab(0.807187 …)` light and `oklab(0.4059 …)` dark: FAIL in both themes. The whole block reads 12 rows, 11 FAIL (E6-G6 the one PASS, as recorded).
- H1-G23: **exit 1**, 7 lines (`menu.css:10`, `layer-group.css:353`, `glass.css:257`, `scale-paper.css:106`, `sizing.css:206,207,225`).

**Band 0 browser gates** through fix-2 appendix P (crit-5's copy, rebuilt against this worktree): `W-0.8/O83-CAP` **4 of 7 FAIL**, `W-0.3/O77a-NO-ELLIPSIS` **7 of 9 FAIL**, as pass 5 read.

Not re-run: the HIGH browser gates that need their wave's own app, a GPU or a loop harness (W-F.*, W-G.1-W-G.5, the `$H` calls of W-0.1, W-H.1, W-H.2, W-I.1, W-J.1, and I7-G4). Their static halves ran above.

## Row 1 · families placed

No finding. PLAN §3 names 85 families (F-30 as its two rows F-30a and F-30b, per `REGISTRY.md:110`), matching the registry's 85 `#### F-nn` headers, and `waves/INDEX.md` matches §3's families column on 99 of 99 waves (script). fix-6 moved no family.

## Row 2 · gates exist and are RED at HEAD

No finding. Every band has RED readings in the static run, and every BLOCKER family's gates read RED above. fix-6 changed two gates: H1-G23 (RED, 7 lines) and G-L1-5 (now a hold line reading exit 0, with its bite recorded).

## Row 3 · vacuous gates

### FF-03 · H1-G23 goes green while two dock state fills still read a plate

- **Where:**
  - `waves/W-H.1.md:98` (§3.2 item 8): "At HEAD six state tokens read a plate", and "a plate fallback behind a re-pointed token is a masking fallback", which removes the switcher's fallback at `layer-group.css:353`.
  - `W-H.1.md:129` (§4) lists the six tokens and `layer-group.css:353`.
  - `W-H.1.md:170` (H1-G23): seven line patterns, with fix-6's bite ("with that fallback dropped too it exits 0").
- **Defect:** two more state fills read a plate at HEAD, and neither the item, §4 nor H1-G23 names them:
  - `src/components/dock/styles/controls/icon-button.css:199-202`, the active icon button: `--glass-capsule-fill: var(--dock-control-active-bg, var(--glass-plate-floating))`. This is the same plate fallback behind a re-pointed token that fix-6 removed from the switcher. It spans three lines, so no line pattern of H1-G23 reads it.
  - `src/styles/tokens/sizing.css:261-264`, `--dock-control-press-bg: color-mix(in oklab, var(--glass-plate-resting), var(--foreground) 7%)`. This is a seventh state token (the press), read by `icon-button.css:123`, `tab-button.css:77` and `triggers.css:89`. Item 8 lists "active" among the states that read the fill register. The declaration spans lines, and the token is not in H1-G23's list.

  So the gate passes on a tree where FL-6's defect stands. Neither plate read is in a paint gate or a §6 row: the state-fill row captures hover, checked and the switcher, not the press, and the fallback never paints once the token is re-pointed, so only a static gate can see it. This is the hole fix-6 closed for one fallback (fix-6 §FE-02, "The gate hole").
- **Evidence:** the bite, run here. It uses a `git archive HEAD src` copy (`crit-6/bite`) with the six declarations re-pointed at `oklch(from var(--foreground) l c h / var(--fill-selected))` and the `layer-group.css:353` fallback dropped, which is fix-6's second bite state.
  - H1-G23's `git grep` finds nothing, so the gate exits **0**.
  - The same copy still carries `icon-button.css:199-202`'s plate fallback and `sizing.css:261-264`'s press token.
  - `git grep -n "dock-control-press-bg" -- src` lists the three readers.

## Row 4 · π and DELTA

No finding. fix-6's new §6 row names its surfaces, themes, engines, captures and π, and its HEAD readings were re-taken here. fix-6's other edits make no new visual claim: W-J.1 item 9 is conditioned on a measurement and its WebKit cells are G6's, and W-E.2's G3 block moves to W-H.1's existing row.

## Row 5 · ledger rows

No finding. `LEDGER.md` is unchanged since `ccb1aaae` (`git diff 958ca517 aa28d43c -- LEDGER.md` is empty), so pass 5's count stands. Every wave id in a ledger row names a spec that exists (script). `UNPLACED` appears only in the three lines that say no row carries it (`:11,28,491`, `:535`). fix-6's diff removes no row id from any spec: a comparison of the row ids on its removed lines with those on its added lines finds 0 lost.

## Row 6 · loop pre-emption

No finding. fix-6 adds one conditional build, W-J.1 item 9: the SF-8 fix to `--control-surface-bg-hover`, a D3-owned token, lands in W-J.1 only if the WebKit hang survives W-H.1's re-point. W-J.1 lands after W-H.1 (§5), which lands after D3's gate, so the D3 loop has converged before that branch can run. The W-0.8 exception stays recorded (`PLAN.md:38`).

## Row 7 · the DAG

This seat's walk of PLAN §5 (`crit-6/dag.py`, Python `graphlib`, with W-L.6's "every wave of bands C to K" expanded) found:
- 99 rows, one per spec;
- acyclic, with 0 dangling ids and 0 edges into a later band;
- no band-0 row with an external dependency other than the D3 gate.

### FF-01 · Shared kits that fix-6's rule does not reach

fix-6's §5 note says: "A shared kit lands once, and its users wait on it. … The lander is the one wave whose §4 names the kit; no user lands a second copy" (`PLAN.md:383`). It names four kits. At least four more break the rule:

- **Band 0, `scripts/probes/band-0/`.**
  - W-0.1 lands it: "The paint probe (appendix A) lands as `scripts/probes/band-0/`" (`W-0.1.md:68`).
  - W-0.3, W-0.4 and W-0.8 each list the directory in their own §4 (`W-0.3.md:70`, `W-0.4.md:71`, `W-0.8.md:63`). Their gates run `node scripts/probes/band-0/build.mjs` (`W-0.3.md:75`, `W-0.4.md:75`, `W-0.8.md:68`).
  - §5 gives all three "—" (`PLAN.md:272,273,277`). W-0.1 waits on the D3 gate, so if D3 has not converged, each of the three either lands the probe itself (a second lander) or gates on a directory that is not in the tree.
  - The rule's cure, an edge to W-0.1, is not available here: it would chain O-77, O-78/O-81 (4) and O-83 to D3. Row 7's band-0 clause allows D3 only for the veil rows. The kit needs a lander that is not a D3 wave.
- **Band G, the one-Button `b` page.**
  - W-G.6 §4 lands appendix D's harness app in `tests-visual/fixtures/` "as the one copy the band's wired specs drive" (`W-G.6.md:55`). Its appendix says the `b` page "is W-G.7's consumer fixture" (`W-G.6.md:231`).
  - W-G.7's HEAD field reads the page from "W-G.6 appendix D" (`W-G.7.md:7`), and so does its appendix B (`:149`). Its §4 also lands "the one-Button fixture moved into `tests-visual/fixtures/`" (`:53`).
  - PLAN's note says "W-G.7's one-Button page is its own landing (W-G.7 §4)" (`PLAN.md:385`).
  - So there are two landers and no edge (W-G.7: W-G.1, W-A.5, `PLAN.md:335`).
- **Band F, `lib.mjs`.**
  - PLAN says W-F.2 "owns the probe libraries W-F.3's appendix A imports (`W-F.2.md` appendices D, E)" (`PLAN.md:377`).
  - No band-F §4 lands `lib.mjs`. W-A.1 does not land it either: `grep lib.mjs` over W-A.1, W-A.3 and W-C.1 finds 0 hits. fix-6 declined this kit as "W-A.1's `tests-visual/_support/` question" (fix-6 §FE-01, "Checked and not changed").
  - W-F.1's wired spec imports it (`W-F.1.md:261,268`). W-F.1 lands before its owner, since W-F.2 depends on W-F.1 (`PLAN.md:323`).
  - W-F.6 and W-F.7 import it (`W-F.6.md:98`, `W-F.7.md:100`) and are unordered against W-F.2 (`PLAN.md:327,328`).
- **Band G, `lib.mjs`** (W-G.1 appendix A).
  - W-G.2's wired specs import it (`W-G.2.md:7,98,124`).
  - W-G.2 is unordered against W-G.1 by design (`W-G.2.md` §8).
  - No §4 lands the library, so a W-G.2 that lands first ships specs that import a file absent from the tree.

- **Defect:** in each kit, one of three things holds: a user wave lands before or apart from the kit's lander; two §4s land the one kit; or no §4 lands it. The plan's own record contradicts itself on the `b` page (`PLAN.md:385` against `W-G.6.md:55`) and on the band-F library (`PLAN.md:377` against every band-F §4).
- **Evidence:** the lines cited; `crit-6/dag.py`'s same-band sweep (the W-0.3 → W-0.1/W-0.4/W-0.8 and W-G.6 ↔ W-G.7 hits); `grep -n "probes/band-0" waves/W-0.*.md`; `grep -n "lib.mjs" waves/W-F.*.md waves/W-G.2.md`.

### FF-02 · W-L.3 deletes the script W-L.4 builds and gates on, and §5 leaves them unordered

- **Where:**
  - W-L.4 §3.6 edits `scripts/verify-export-types.mjs` (`W-L.4.md:94`, §4 `:98`). It says "W-L.3's consumer matrix runs the same fixture", meaning W-L.4's new `tests/_support/declaration-floor/`.
  - G-L4-5 (`W-L.4.md:110`) passes only when `grep -q "types: \[\]" scripts/verify-export-types.mjs` and `npm run verify:package` both exit 0.
  - W-L.3 deletes `scripts/verify-export-types.mjs` and the `verify:package` script (`W-L.3.md:68,73`). G-L3-8 (`:87`) passes only when `verify:package` is absent from `package.json`.
  - W-L.3 never names W-L.4.
  - §5: W-L.3 depends on W-A.5, W-G.7, W-K.6 and W-L.2; W-L.4 on W-F.2 and W-E.7 (`PLAN.md:363,364`). No path joins them.
- **Defect:** the specs put W-L.4 first, since W-L.3's matrix runs W-L.4's fixture. §5 allows either order.
  - If W-L.3 lands first, W-L.4 edits a deleted file (a second path) and G-L4-5 can never pass.
  - If W-L.4 lands first, W-L.3's landing turns G-L4-5 red, and nothing re-points it to the matrix's types leg.
  - In both orders, G-L4-5 and G-L3-8 cannot both be green on the release commit W-L.8 reads.
- **Evidence:** in the worktree, G-L4-5's `npm run verify:package` exits 0 (`"terminal":"CLEAN"`) and its grep half exits 1. G-L3-8 exits 1. The lines are cited above.

## Row 8 · breaks and aliases

No finding. fix-6's one source change is internal: it removes the plate fallback at `layer-group.css:353`, and the token keeps its name. W-K.1's new fixture app is test tooling. No MIGRATION row moved, and no alias appears in the diff.

## Row 9 · re-booked chronics

No finding. A grep of `PLAN.md`, `LEDGER.md` and every spec for later-tranche carries (`BM`, "next tranche", "after BL", `12.0.0`, "later tranche", "future tranche") finds no carry. 47 lines of `LEDGER.md` read DISEASE, and none of them is BANKED.

## Notes outside the checklist (not counted)

- **W-H.2 §4 still lists the well's lines.** `W-H.2.md` §4 touches `on-glass-fg.css:37` and `dark-arm.css:303` "(the well and the dark veil)". Its own §3 item 1 says the well "is W-H.5's: `--input-on-glass` retires there", and W-H.5 §4 lists the same two lines. `dark-arm.css:303` is the well's dark arm per W-H.5 (`W-H.5.md:25`), so the two waves name one line for one change.
- **W-L.4 and W-L.6 on `useDragMorph`.** W-L.4 adds `interrupt` to `useDragMorph` and says W-L.6 decides whether it stays published (`W-L.4.md:131`). W-L.6 depends on bands C to K only, so the two are unordered. Unpublishing does not remove the file, so neither order breaks a gate. Recorded, not a finding.
- **D3-B still branches the plan.** This is pass 5's note, which fix-6 declined because D3 has not converged. It stands as recorded.
- **Fence.** This seat did not read or write `design/`. The probes, the extracted gate list, the bite copy and the results are in this seat's scratchpad (`crit-6/`), outside the checkout. The worktree was removed and the two local servers stopped before return.
