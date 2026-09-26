# BL — formation audit, pass 3

| field | value |
|---|---|
| seat | formation critic, pass 3. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-2 or fixes 2-3 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `70a128b5` for every probe (fix 3 is `1f2d48fc`; the one commit between is a cursor line). HEAD moved to `4e178f29` during the audit through two design-loop commits; `git diff --stat 70a128b5 HEAD -- docs/tranches/BL ':!docs/tranches/BL/design' src` is empty. `git diff --stat v10.1.0 HEAD -- src` is empty, so `src` is the published 10.1.0 |
| inputs read | `PLAN.md` in full; `waves/INDEX.md` in full; `LEDGER.md` §4, §5 and the rows each finding cites, and every BUILD/FOLD/BANKED/RETIRE row by script; `audit/INBOUND.md` in full; `audit/REGISTRY.md` (family headers, severities); `FORMATION-PROGRESS.md:74-90`; §1-§8 of W-0.2, W-0.7, W-0.8, W-0.9, W-B.9, W-B.11, W-B.12, W-C.2, W-E.7, W-G.1, W-G.3, W-H.5, W-I.1, W-I.7; §5 of all 99 specs by script; `design/material/REGISTRY.md` and `design/dock/REGISTRY.md` (read only, greps); `formation-audit/pass-2.md`; `formation-audit/fix-3.md` last |
| where probes ran | a worktree at `70a128b5` (`scratchpad/formation/crit-3/wt`, `node_modules` and `tests-visual/node_modules` symlinked, `npm run build` exit 0), removed before return. Browser probes: fix-2's appendix P app rebuilt against that worktree, and one Sheet scene of this seat's own. Chromium (Playwright's) only. Playwright WebKit is not Safari; every real-Safari cell is UNMEASURED (OW-3). Load average 40-45 during the runs |
| fences | no source edit; no git write except the worktree add and remove; nothing under `design/` written; the one write in the checkout is this file |

The checklist is fixed at nine rows. Each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | FAIL (FC-11) |
| 2 | every spec has a gate; every gate RED at HEAD | FAIL (FC-01, FC-02) |
| 3 | no vacuous gate | FAIL (FC-03) |
| 4 | every visual claim carries π/DELTA | FAIL (FC-10) |
| 5 | every ledger row terminal, pointing at a wave that covers it | PASS |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | FAIL (FC-05, FC-06, FA-17 still open) |
| 7 | DAG acyclic, one source, band 0 external only on D3 | FAIL (FC-07) |
| 8 | every break has a MIGRATION row, no alias | FAIL (FC-08, FC-09) |
| 9 | no re-booked chronic | FAIL (FC-04, the FB-18 remainder) |

**clean = false.** 11 findings, plus FA-17 still open. Of pass 2's 18 findings, 16 are cured, FB-18 is cured for three of its four rows (#64b stays open as FC-04), and FB-02 is not cured: fix-3 reports a cure that is not on disk (FC-01).

## Pass 2, re-verified

| id | verdict | reading here |
|---|---|---|
| FB-01 | cured | PLAN §3 and INDEX family sets match on 99 of 99 waves (script); 85 registry families placed, 0 missing, 0 extra. One spec header still claims a moved split (FC-11) |
| FB-02 | **not cured** | `W-C.2.md:66` is unchanged. FC-01 |
| FB-03 | cured | I5-G1 scoped to the dock and `scroll-tokens.css`: exit 1, 16 lines (`git grep -niE 'fission\|siri([^a-z]\|$)' -- src/components/dock src/styles/tokens/scroll-tokens.css \| wc -l` → 16) |
| FB-04 | cured | W-C.1 step 4 moves every loop harness to `scripts/loops/<loop>/`; PLAN §5 orders W-H.1, W-H.2, W-H.5, W-I.1 and W-I.7 after W-C.1; `W-J.1.md` names one `$H`; I6-G3 reads `scripts/loops/dock/owed-3/check.mjs` |
| FB-05 | cured | no unstruck §5 gate reads a file under `design/` or a `PORTFOLIO.md`/`REGISTRY.md` (script over the 341 extracted gate spans) |
| FB-06 | cured | G17 exits 1 at HEAD with the census script absent (`scripts/probes` does not exist); it no longer fails open |
| FB-07 | cured | G3 over the §3 template lines (`transparent` and `var(--foreground)` fallbacks) exits 0; with `var(--toggle-tint, #888)` appended it exits 1 |
| FB-08 | cured | K7-G13 criterion is `maxRunning <= 1`; HEAD reads `maxRunning 0`, `seen []` (reproduced, Chromium); the two-plant bite is fix-3's reading, not re-run here |
| FB-09 | cured | C1-G7 struck; G-L8-14 exits 1 at HEAD, now 421 tracked loop scripts (fix-3 read 414; the loops keep adding) |
| FB-10 | cured | `W-E.1.md:205`, `W-F.2.md:342`, `W-G.1.md:152`, `W-K.1.md:175` all take `CAP` from `WAVE` and throw without it; no spec cites a scratchpad capture set |
| FB-11 | cured | #49c → W-E.14, #82a → W-H.5, UIA-V-234 and UIA-V-431 → W-H.5, each named in the receiver |
| FB-12 | cured | `W-I.6.md:19` receives `useAnisotropicExtent`; `W-H.1.md:28` receives O-76's fallback. The fallback opens FC-07 |
| FB-13 | cured | E7-G17 and E7-G18 exist and are RED per fix-3; A2-FO-L2-14 → W-E.9. The micro floor has no π pair (FC-10) |
| FB-14 | cured | W-0.8 is O-83 alone; `PLAN.md:37` cites `FORMATION-PROGRESS.md:78`; O-84 and O-84a are W-I.1's. W-I.1's new gates pre-decide D2's Q-10 (FC-05) |
| FB-15 | cured | W-0.7 G5 no longer pins `--glass-veil-ink`; the veil is read in paint through W-0.1 G1 |
| FB-16 | cured | OW-12 retired (`LEDGER.md:335`); W-0.9 has no edge (`PLAN.md:277`); W-0.9 G4 is a tree gate, exit 1 |
| FB-17 | cured | W-0.9 §7 renames nothing; W-I.5 no longer removes `fissioning?` |
| FB-18 | cured for #45, #78, C-8; **open for #64b** | B9-G1 exit 1 (3 lines); B11-G1 exit 1 (the emitter is tracked); W-I.7 precedes W-I.1 in PLAN §5. #64b: FC-04 |
| FA-17 | **still open** | `FORMATION-PROGRESS.md` (commit `70a128b5`) records D5 opened as run `wf_4193b8cb-4a4`, but `ls docs/tranches/BL/design` prints `dock material structure tile`: no portfolio, registry or battery on disk. PLAN §6 still names the act as owed |

## Gates re-run at `70a128b5`

**Static gates, all 99 specs.** A script extracted every backticked command in the gate column of each §5 table (341 spans; the rendered form, `\|` → `|`, which is the form W-I.1, W-I.2, W-J.1 and W-J.2 state as the convention). It ran each one in the worktree with the library built. 88 were skipped: `$H` harness calls, Playwright runs, `npm view`/`npm pack` on unpublished versions, placeholders (`<…>`, `…`), and fragments. Of the 253 run, by band as nonzero exits of total: 0 11/18, A 45/47, B 27/30, C 18/20, D 9/9, E 28/32, F 2/2, G 18/19, H 10/10, I 25/26, J 4/7, K 10/10, L 20/23. Every zero exit is a declared hold line, a latch file run before its `it.fails` → `it` conversion (the spec's HEAD reading is the converted run), or C2-G5 (FC-01). Band F: F1-G1's regex over `src` gives 7 sites in 5 files, as the spec states.

**BLOCKER families.**
- F-01 (W-A.2): every extracted A2 gate exits 1; the `it.fails(` count is 10.
- F-68 (W-0.7, W-L.7, W-L.8): W-0.7 G1 exits 1 (`package.json` reads `10.1.0`), G2 exits 1; G-L7-4 exits 1 (no outbox letter); G-L8-1, -2, -4, -5, -7 and -14 exit 1.
- F-21 (W-E.2): E2-G1 re-read with this seat's own Sheet scene (`Dialog` + `SheetContent`, Chromium, 390×844 and 1440×900, bottom and right): all 4 cells `position: relative`, corners `24px` on all four: **FAIL 4 of 4**. E2's static gates at `:86`, `:88`, `:89` exit 1.

**Browser gates through fix-2's appendix P**, rebuilt against the worktree, Chromium:
- W-0.8 G1: FAIL 4 of 7 (used corners `160.0x28.0` and `32.0x130.0` at the run's ends).
- W-I.1 G27 (moved from W-0.8): `overrunPx 28`, `aspect "1 / 1"`.
- W-I.1 G28: ink gaps 30.83, 18.89, 6.95 against 5.45.
- W-0.9 G2/G3 holds: 20.352, 23.6694, 27.5159 px; `--type-title` 32.928.
- W-0.3 G1: FAIL 7 of 9.
- W-E.7 dock trigger rung: 35.3 vs 40.
- K7-G13 hold: `maxRunning 0`.

17 FAIL of 22 gated rows, as fix-2 and pass 2 read them. Not re-run: the HIGH browser gates that need their wave's own app, a GPU or a loop harness (W-F.6, W-G.1-W-G.5, W-H.1/H.2 `$H`, W-I.1 `$H`, W-J.1 `$H`); their static halves ran above.

## Row 1 · families placed

### FC-11 · W-G.1's header still places the constellation's port after fix-3 moved it to W-B.9

- **Where:** `waves/W-G.1.md:9` (families: "… W-B.9's BUILD (the constellation engine and its two primitives) …"); `W-G.1.md:116` (MIGRATION: "WebGL2 rendering in Aurora, Blob, FourierField, Constellation"); `W-G.1.md:124` ("`ConstellationField` gains `pinned` (per node) and `drift` (additive)"). Against: `W-G.1.md:31,72,97` (the constellation half "is W-B.9's"), `W-B.9.md:9,17`, `LEDGER.md:111` (#45b → W-B.9), and W-B.9 §3 item 2 (`pinned`, `pinnedDrift` and `accentEdges` are CURED at HEAD).
- **Defect:** the #45 split is placed in W-B.9 by PLAN, INDEX and the ledger, but W-G.1's own families field still lists it, and W-G.1's MIGRATION rows describe a constellation engine and additions W-G.1 no longer builds. The constellation never rendered through WebGL2 (its engine is `useCanvas2D`, `useConstellation.ts:287`).
- **Evidence:** `grep -n -i constellation waves/W-G.1.md` (lines cited above).

## Row 2 · gates exist and are RED at HEAD

Every one of the 99 specs has at least one unstruck §5 row and at least one RED reading (script).

### FC-01 · FB-02 is not cured: C2-G5 is unchanged and green under the rendered form

- **Where:** `waves/W-C.2.md:66`, still `! grep -rq "DISSOLVE_DIALECTS\|dissolveDialect" src dist`, recorded **exit 1**. `formation-audit/fix-3.md:36` reports it rewritten as `npm run build && ! grep -rq -e DISSOLVE_DIALECTS -e dissolveDialect src dist`.
- **Defect:** the cure fix-3 describes was never written. `git show 1f2d48fc -- docs/tranches/BL/waves/W-C.2.md` changes only lines 25 and 68 (the #64 cross-cites). The gate reads green over a live defect in the form the rest of the folder uses.
- **Evidence:** in the worktree with `dist` built: rendered form exit **0**; raw form exit 1. `grep -rn DISSOLVE_DIALECTS src` prints `dissolveGrammar.ts:52` and `:97`.

### FC-02 · B2-G2 cannot pass in the rendered form

- **Where:** `waves/W-B.2.md:107`, `grep -cE '\| *value\.js:O-[0-9]+' docs/tranches/BL/audit/INBOUND.md`, passes when the count is ≥ 46, HEAD **0**.
- **Defect:** the `\|` here means a literal pipe, so this gate works only raw, like the old C2-G5. Rendered, the pattern starts with an empty alternative. On macOS grep that is a syntax error, so the gate prints no count and never passes. Under the rendered convention it is RED for the wrong reason and cannot go green when W-B.2 lands.
- **Evidence:** worktree, `/usr/bin/grep` (BSD 2.6.0): rendered → `grep: empty (sub)expression`, exit 2; raw → `0`, exit 1. A raw/rendered sweep over all 253 run spans finds this the only span whose rendered form errors where the raw form counts.

## Row 3 · vacuous gates

### FC-03 · Path-pinned negated gates fail open when W-D.1 moves their file

- **Where:** PLAN §2 (`PLAN.md:65`: "D (structure) after the gates and before the component bands, so the component waves land in the final placement"); `waves/W-D.1.md:81` (the move ledger over `src`, `scripts`, `tests`, `tests-visual`); 29 negated `grep`/`git grep`/`rg` gates in bands E-L that name a specific `src` path. Examples:
  - `W-G.3.md:66` G3-G7 on `src/composables/glass/useGlassBackdropLuminance.ts` and `backdropLuminanceSample.ts`;
  - `W-E.12.md:56` on `src/components/pager-dots/worm.ts`;
  - `W-E.9.md:68` on `src/components/tabs/composables/useTabResponsive.ts`;
  - `W-K.7.md:77` on `src/composables/motion/core/useViewTransition.ts`;
  - `W-I.7.md:42,44` on `src/components/dock/styles/run.css`.
- **Defect:** `! grep -q X <file>` exits 0 when the file is absent (grep exits 2), and `! git grep -n X -- <path>` exits 0 on an empty pathspec. The plan lands W-D.1 before the component bands, and W-D.1 relocates files. D1's route-G kit, for example, reads the sampler at `src/components/dock/composables/useGlassBackdropLuminance.ts` (`design/structure/pass-3/G-kit/lists/02-stage1.json:167`). No rule re-points these gates to the moved paths. Each one whose file moves goes green with its defect standing.
- **Evidence:** worktree: `! grep -q 'getPropertyValue("--pager-dot-size")' src/components/pager-dots/worm-moved.ts` → exit 0; `! git grep -n useDockSpring -- src/components/dock-moved` → exit 0. The 29 gates were listed by script over the extracted spans; `grep -rniE "re-point|repoint|stale path" PLAN.md waves/W-D.1.md waves/W-A.2.md` finds no gate re-pointing rule.

## Row 4 · π and DELTA

### FC-10 · The micro floor changes paint and has no paired capture

- **Where:** `waves/W-E.7.md:58` (§3: under `(pointer: coarse)` `--type-micro` reads `0.75rem`, 12 px, on every `.text-micro`), `:85` (E7-G17); §6 (the paired captures: Dialog and Sheet, the `lbl`, `count` and `type` scenes).
- **Defect:** raising a type rung from 11 to 12 px is a visual claim. No §6 capture shows it: the `type` scene is the control-text model, and `grep -n "text-micro\|type-micro" waves/W-E.7.md` finds the rung only in §1, §3 and the gate row. Fix-3's appendix Q1 scene, which renders a `.text-micro` span, is not named in §6.
- **Evidence:** the lines cited.

## Row 5 · ledger rows

A script parsed 828 row lines (BUILD 497, RETIRE 185, FOLD 138, BANKED 8). Every BUILD and FOLD row names an existing wave. No row reads UNPLACED. Every BANKED row carries a re-trigger. For each row fix-3 edited, the receiving spec names it, allowing for abbreviations (`#45b` as #45, `DOCKET-Q-10` as Q-10). No finding on this row. O-84's BUILD terminal presumes a Q-10 outcome; that is FC-05.

## Row 6 · loop pre-emption

### FC-05 · W-I.1 G29 and G27 decide D2's Q-10 before D2 rules it

- **Where:** `waves/W-I.1.md:128` (§3.1 item 2: "D2's floor keeps the summary a seat-row square with `aspect-ratio: 1` … under Q-10 default (a) … D2 rules Q-10 with O-84's ask … and this wave lands the ruling under G27 and G29"); `:229` G27 (`overrunPx ≤ 0.5`); `:231` G29 (`! sed … morph.css | grep -qE '^\s*(aspect-ratio|block-size|height):'`); `design/dock/REGISTRY.md:304` (Q-10: (a) "the collapsed rung is a circle", (b) "the collapsed rung sizes to its face"; default **(a)**); `LEDGER.md:338` (DOCKET-Q-10 pending); `LEDGER.md:482` (O-84 **BUILD** W-I.1).
- **Defect:** G29 passes only when the square lock is gone, and G27 only when a wide `#collapsed` fits the summary, which together is Q-10 (b). D2's standing default is (a). Every other D2-dependent gate in W-I.1 is written conditionally: G11 "(under Q-1 (a))", G24 and G26 "retired with D2's ruling", G25 "or D2's RETIRE". G29 has no condition. So the loop wave's gate fixes the answer to a question the plan says D2 rules. The ledger's O-84 BUILD presumes the same answer.
- **Evidence:** the lines cited. G29 exits 1 at HEAD; G27 reads `overrunPx 28` with `aspect "1 / 1"` (fix-2's probe, reproduced here).

### FC-06 · H5-G2 requires the well filter that D3's floor removes

- **Where:** `waves/W-H.5.md:48` H5-G2: "the well's own filter moves the stripes (ΔE > 0), both themes", reading the Input's own `blur(14px) saturate(1.5)` (`:29`). `design/material/REGISTRY.md:323` FL-11: "The field well is a rung, a pole tone with no `backdrop-filter` of its own (its backdrop is the rung's paint, S-2), and `--input-on-glass` retires". FL-11 is a floor row, built by every route (A, C, E). It landed with D3 pass 1 at `020f6586`, before fix-3 (`git log be1969ea^..1f2d48fc`).
- **Defect:** under D3's floor the well has no filter of its own, so H5-G2 has nothing to measure and cannot pass. The wave must either keep a filter D3 removes or ship with a red gate. A loop wave's gate that contradicts the loop's floor decides the mechanism against the loop. H5-G1 (transmission) and H5-G3 (`--input-on-glass` gone) agree with FL-11; only G2 conflicts.
- **Evidence:** the lines cited.

### FA-17 · still open

See the re-verification table. The D5 run was launched at `70a128b5`, but nothing is on disk, and W-J.2's loop gate (PLAN §4) names a loop with no portfolio.

## Row 7 · the DAG

PLAN §5 parsed, with W-L.6's "every wave of bands C to K" expanded: 99 rows, one per spec, 0 cycles, 0 dangling ids, 0 edges into a later band. Band 0 rows name no wave outside band 0; the only external names are the D3 gate (W-0.1, W-0.2).

### FC-07 · W-0.2's recorded fallback is an edge §5 does not carry, and with §5's edges it closes a cycle

- **Where:** `PLAN.md:275` (W-0.7 depends on W-0.2, unconditionally); `PLAN.md:273` (W-0.5 depends on W-0.2); `waves/W-0.2.md:93` ("If D3 has not converged at the cut, or G1 stays RED on W-0.1's plate, the wave's terminal state in this band is 'rides W-H.1 at 11.0.0'"); `waves/W-H.1.md:28` (W-0.2 "lands in 11.0.0 with this wave", added by fix-3 for FB-12); `waves/W-0.7.md:55` (entry: "W-0.2 has landed or is recorded as riding W-H.1").
- **Defect:** the fallback moves W-0.2's landing to W-H.1's. W-H.1 depends on W-C.1, W-C.1 on W-A.1, and W-A.1 on W-0.7. §5 still has W-0.7 and W-0.5 waiting on W-0.2. With the fallback taken, the recorded edges form W-0.7 → W-0.2 → (W-H.1) → W-C.1 → W-A.1 → W-0.7. W-0.7's spec gets out of this by stating its own conditional entry rule. That rule is not in §5, which PLAN calls "the one record of edges" (`PLAN.md:265`). W-0.5, whose G2 is "re-run on their landing", has no such rule and would wait on W-0.2 forever.
- **Evidence:** the lines cited; the topological walk above.

## Row 8 · breaks and aliases

### FC-08 · The constellation's `drawOverlay` seam hands consumers a Canvas2D context that W-B.9 deletes

- **Where:** `src/components/constellation/constellationTypes.ts:429-430` (`drawOverlay?: (ctx: CanvasRenderingContext2D, …)`); `src/components/constellation/README.md:154` (the published prop) and `:108-116` (the documented recipe); `waves/W-B.9.md:26` ("the Canvas2D draw path is deleted in the same change"), `:39` (B9-G2: "0 `2d` requests from the constellation host"), `:50` (§7: "None: `ConstellationField` and the props keep their shape; the renderer is internal"); `waves/W-G.1.md:91` (G1-G3 forbids `getContext("2d")` in `src`).
- **Defect:** after the port there is no 2D context to pass. A 2D overlay canvas would fail B9-G2 and G1-G3. So the prop's signature changes or the prop goes, and that is a published break with no MIGRATION row and no successor. W-B.9 §3 item 2 still routes two slides items to "the consumer's `drawOverlay`". atlas's host names the seam (`atlas/src/platform/chrome/background/Constellation.host.vue:11`, read only).
- **Evidence:** `grep -rn drawOverlay waves/ LEDGER.md PLAN.md` → only `W-B.9.md:27`, which routes consumer work onto it.

### FC-09 · `--dock-plate-cross-px`, published in 10.2.0, has no 11.0.0 disposition

- **Where:** `waves/W-0.8.md:45,48,87` (W-0.8 publishes `--dock-plate-cross-px` from `dockMorphMeasure`, "a new published property"); `waves/W-I.1.md:140` (the cut cap is struck under Q-1 (a), and the plate's cross size is `--dock-cross = seat + 2·pad`); `W-I.1.md:260` (the MIGRATION row removes `--dock-cap-rest` and the band-0 length, but does not name `--dock-plate-cross-px`).
- **Defect:** the property's one reader in 10.2.0 is the cap rest, which W-I.1 strikes. In 11.0.0 the property is then either removed, a break with no MIGRATION row, or kept beside `--dock-cross`, a second published name for the plate's cross size. The plan decides neither.
- **Evidence:** `grep -rn "dock-plate-cross-px" waves/ PLAN.md LEDGER.md` → `W-0.8.md` only.

## Row 9 · re-booked chronics

No row is re-booked to a later tranche. The 8 BANKED rows carry re-triggers, and none is marked DISEASE. All 44 DISEASE rows name their deciding wave as own.

### FC-04 · #64b's only gate goes green on W-A.2's act, before W-B.12 does anything (FB-18 remainder)

- **Where:** `waves/W-B.12.md:40` B12-G2 (`tests/gates/roster.json` holds G-13, G-42 and G-01), `:34` (§4: "`docs/tranches/BL/LEDGER.md` only"); `PLAN.md:296` (W-B.12 depends on W-A.2); `waves/W-A.2.md` (the roster, with G-01 at `:135`, G-13 at `:147`, G-42 at `:176`); `LEDGER.md:163` (#64b, DISEASE, RETIRE, "decided in W-B.12 (own)").
- **Defect:** W-A.2 creates the roster with the three ids, and W-B.12 lands after it, so B12-G2 is green at W-B.12's base. The wave's only act is a ledger edit whose terminal formation has already written. The disease row's gate is enacted by a shared wave, the class FB-18 names. Fix-3 records this as open (`fix-3.md:229`).
- **Evidence:** B12-G2 exits 1 at HEAD because `roster.json` is absent; the ids it reads are W-A.2's own roster rows.

## Notes outside the checklist (not counted)

- **fix-3's report.** Besides FC-01, the fix-3 claims this seat checked hold on disk: the five pipe-escape cures, I5-G1, G17, W-0.2 G3, K7-G13's criterion, C1-G7 → G-L8-14, the `CAP` roots, the FB-11 rows, W-0.8 and W-0.9, B9-G1, B11-G1 and the W-I.7 edge.
- **B11-G1 and W-C.1.** W-C.1's sweep also `git rm`s the emitter. `W-B.11.md:28` says the sweep comes "later", which holds only if bands run in order; PLAN §5 has no W-B.11 → W-C.1 edge.
- **W-I.7 §3 item 3** says both cures "land in the converged run's patch", which reads as W-I.1's patch, though W-I.7 lands first with its own files (§4).
- **The plan's D3 premises trail D3's floor.** PLAN's header says "D3 has no REGISTRY yet", and PLAN §2, §3 and W-G.3 still branch on D3-B's published luma. D3's floor now deletes the sampler in every route (`design/material/REGISTRY.md:313`, FL-1), and pass 1 banked the B+F family. W-G.3 edits a sampler D3 then deletes.
- **INBOUND's O-84 and O-84a dispositions** still read "RE-RULED … band 0 (10.2.0)" (`audit/INBOUND.md` rows O-84, O-84a); the ledger and plan place both in W-I.1.
- **OW-12** was retired by a seat on the grounds that the ruling's parenthetical collides with a published rung. O-74b's own ruling (CUR:80) came under the same ratify grant as O-84b, which fix-3 treats as not an owner word.
- **B8-G5's HEAD reading** is "the pin is absent", with the suite green at HEAD (exit 0 here). W-B.8's other gates are RED.
- **Carried from pass 2:** docket-gate strength, O-86 missing from PLAN §3 and §7, the band-0 ruling provenance at CUR:80, and P-1 gestalt sections in the older specs.
- **Fence.** This seat read `design/` and did not write it. The probe builds and the extracted gate list are in this seat's scratchpad, outside the checkout.
