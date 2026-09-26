# BL — formation audit, pass 5

| field | value |
|---|---|
| seat | formation critic, pass 5. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-4 or fixes 2-5 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `ccb1aaae` (fix 5's commit) for every probe. `git diff --stat v10.1.0 HEAD -- src` is empty, so `src` is the published 10.1.0 |
| inputs read | `PLAN.md` in full; the fix-5 diff (`git diff c42aee9d ccb1aaae -- docs/tranches/BL`) in full; `waves/INDEX.md`, `LEDGER.md` and all 99 specs by script, plus §3-§9 of W-E.2, W-E.4, W-E.6, W-E.7, W-G.3, W-H.1, W-H.2, W-H.5, W-I.7, W-K.4, W-K.5, W-L.1 and the §4 and §8 of every spec; `audit/REGISTRY.md` (family headers and max severities); `audit/INBOUND.md`; `formation-audit/pass-4.md`; `design/material/REGISTRY.md` §3 floor rows FL-1..FL-13 and the harness specimens (read only); `formation-audit/fix-5.md` last |
| where probes ran | a worktree at `ccb1aaae` (`scratchpad/formation/crit-5/wt`, `node_modules` and `tests-visual/node_modules` symlinked; `npm run build` exit 0; `npm run demo:dist:build` exit 0), removed before return. The band-E consumer app is the band-E seat's build of the packed 10.1.0: its installed `dist` and this worktree's `dist` hash the same (`shasum` over every `.js` and `.css`, `e6cdc2f2…` both). Chromium is Playwright's. Playwright WebKit is not Safari, and every real-Safari cell is UNMEASURED (OW-3). Load average 33-44 |
| fences | no source edit; no git write except the worktree add and remove; nothing under `design/` written; the one write in the checkout is this file |

The checklist has nine fixed rows, and each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | PASS |
| 3 | no vacuous gate | PASS |
| 4 | every visual claim carries π/DELTA | FAIL (FE-02) |
| 5 | every ledger row terminal, pointing at a wave that covers it | PASS |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | PASS |
| 7 | DAG acyclic, one source, band 0 external only on D3 | FAIL (FE-01, FE-03) |
| 8 | every break has a MIGRATION row, no alias | PASS |
| 9 | no re-booked chronic | PASS |

**clean = false.** 3 new findings. Of pass 4's 3 findings, all 3 are cured as named. FE-01 is FD-03's class in pairs FD-03 did not name.

## Pass 4, re-verified

| id | verdict | reading here |
|---|---|---|
| FD-01 | cured | G-L1-7 (`W-L.1.md:194`) is fix-5 appendix R's scene. Extracted from the appendix, built against this worktree and run: `{"rest":{"top":414,"cx":705},"moved_in_place":{"top":414,"cx":705},"swap_300_200":{"top":214,"cx":305},"pass":false}`, **exit 1**. The bite (`update-position-strategy="always"` added to `PopoverContent`) reads `moved_in_place` top 614, cx 905, **exit 0**. #76b (`LEDGER.md:184`) and W-0.10 §1 name the in-place case |
| FD-02 | cured | W-E.2 §3 item 4 is struck and its MIGRATION row is gone; W-E.6 §3 item 4 removes only the blend; W-H.1 §3.2 item 8 builds FL-6. `grep glass-plate` over every spec outside W-0.1, W-0.2, W-H.1, W-H.2 and W-H.5 finds no state fill routed onto a plate (one hit, W-C.4's dead-token list). H1-G23 exits **1** with the six lines fix-5 lists; on a `git archive` copy of `src` with those six declarations re-pointed at `oklch(from var(--foreground) l c h / var(--fill-selected))` the equivalent `grep -rqE` exits 0. H1-G21 and H1-G22 were re-run (row 2) |
| FD-03 | cured as named | PLAN §5 now orders W-E.7 → W-E.2, W-F.3 → W-F.2, W-G.4 → W-G.3 and W-G.7, and W-H.1 → W-E.6 (`PLAN.md:314,324,332,336`). `grep -c W-E.2 waves/W-E.6.md` → 0. The same class remains in other pairs: FE-01. fix-5's sweep read only each spec's "Dependencies" section (`fix-5.md` §FD-03); FE-01's pairs are stated elsewhere in the specs |

## Gates re-run at `ccb1aaae`

**Static gates, all 99 specs.** This seat's own extractor took every backticked command in a §5 gate column (343 spans, rendered form, `\|` → `|`) and ran each in the worktree with the library built, six at a time, 240 s cap. 63 were skipped: `$H` and `$D3_OUT` harness calls, Playwright runs, `npm view`/`npm pack`, placeholders and appendix references. Of 280 run, nonzero exits by band: 0 15/21, A 48/51, B 28/31, C 19/22, D 9/11, E 30/36, F 2/2, G 20/22, H 12/12, I 24/25, J 4/7, K 10/10, L 25/30. Every band has RED readings. The 34 zero exits fall into the kinds pass 4 named:
- labelled hold lines: W-0.1 G5 (both spans), W-0.2 G3, W-0.3 G6, W-0.6 G5, W-0.10 G3, W-B.10 G3, W-B.15 G3, W-C.1 C1-G6's unit half, W-D.2 D2-G5, W-G.2 G4, W-J.2 G6, W-L.3 G-L3-9;
- latch files run before their `it.fails` → `it` conversion: E8-G1, E9-G1, E10-G0, E14-G3, W-I.1 G12, W-J.1 G14, W-J.2 G1, B8-G5;
- the `npm run build` half of a two-part gate whose other half is red: D2-G6, E11-G3, E11-G4, G1-G11, G-L5-1, A5-G7;
- a count or value whose pass condition is its value: A1-G11 (`wc -l`), C4-G7 (20), G-L5-4 (`4.0.0`);
- a command that needs its edit applied first: A5-G7's suite run, G-L6-2, G-L4-5's `verify:package` half;
- one struck row, ~~C1-G7~~.

Exits of 2, 128 or a timeout are spans cut by an inner backtick (A1-G3, B1-G3, C1-G4), fragments (A2-G6's bare `grep -E`, W-0.7 G5's `grep -o`, E6-G10's `node --experimental-strip-types`, G-L4-6's `diff --stat`), or reads of files absent at HEAD with no `!` in front (A3-G1, A3-G2, C5-G3, C5-G6, W-0.7 G6/G9, G-L8-12), which are RED as intended. No negated gate passed on an absent path. G-L1-7 and G17 of W-H.1 exit 1 in the runner only because their scripts are not in the tree; G-L1-7 was run from appendix R above. One hold line reads red on this platform (notes: G-L1-5).

**BLOCKER families** (F-01, F-21, F-68 by the registry's "Max severity" lines):
- F-01 (W-A.2): 48 of 51 band-A spans exit nonzero; the three zeros are A1-G11's `wc -l` and A5-G7's two spans run without their planted export.
- F-68 (W-0.7, W-L.7, W-L.8): every span that ran exits nonzero or is a fragment.
- F-21, W-E.2 appendix A (extracted from the spec, run whole in Chromium against the band-E app and this worktree's `dist-demo`):
  - E2-G1 **4 of 4 FAIL**: `position: relative`, top 992 (390×844) and 1109.2 (1440×900), flush corners `24px`.
  - E2-G2 travel **0**; E2-G4 reach **2** against 16 on all four rungs (`contain: paint`); E2-G5 **127 > 85**; E2-G6 **3 of 3** clipped at 390 and 1440; E2-G7 `scale 1`, `blur(0px)`; E2-G8 9 px and 13 px visible; E2-G9 no fade; E2-G10 44 against 54; E2-G11 `rotate 180deg` on a closed trigger. Every row matches the spec's HEAD column.
  - H1-G21 (the G3 block, F-21's #84a split): Chromium light ΔE 0.0562 (control), dark **0.0013**, PRT **0**: **2 of 3 FAIL**. Playwright WebKit dark **0.0057**. This is the first re-run of H1-G21 since fix-5 moved it; fix-5 carried the reading from `4d2e3123`.
  - W-I.7 I7-G1..G3 (the C-8 split) exit 1 in the static run.

**Other browser gates:**
- H1-G22 through W-E.6 appendix A block G2: the selected chip's `background-color` is `oklab(0.807187 …)` light and `oklab(0.4059 …)` dark, opaque, so **FAIL**. E6-G2 (the blend alone): `blends ["plus-lighter"]`, **FAIL** in both themes. E6-G1 1 of 5 fills, E6-G3 scale 1.07416, as recorded.
- W-0.8 G1 and W-0.3 G1 through fix-2's appendix P app (crit-4's copy) rebuilt against this worktree: `W-0.8/O83-CAP` **4 of 7 FAIL**, `W-0.3/O77a-NO-ELLIPSIS` **7 of 9 FAIL**, as pass 4 read.

Not re-run: the HIGH browser gates that need their wave's own app, a GPU or a loop harness (W-F.*, W-G.1-W-G.5, the `$H` calls of W-0.1, W-H.1, W-H.2, W-I.1, W-J.1, and I7-G4). Their static halves ran above.

## Row 1 · families placed

No finding. PLAN §3 names 85 families, matching the registry's 85 `#### F-nn` headers (0 missing, 0 extra), and `waves/INDEX.md` matches PLAN §3's families column on 99 of 99 waves (script). fix-5's new splits are named on both sides: F-28 "less X-G1's selected fill" in W-E.6 and "split" in W-H.1; F-21's #84a split in W-H.1 beside W-E.2 and W-I.7. INDEX's split list gains F-28.

## Row 2 · gates exist and are RED at HEAD

No finding. Every spec has an unstruck §5 row with a RED reading (the static run and the browser runs above). fix-5's edits keep that true: W-E.2 keeps 18 RED rows without G3, W-E.6 keeps E6-G2 on the blend, W-H.1 gains H1-G21, H1-G22 and H1-G23, all three RED here, and G-L1-7 is RED here.

## Row 3 · vacuous gates

No finding.
- G-L1-7 fails at HEAD and passes on a real mechanism (the bite).
- H1-G23 fails at HEAD and passes on the planted cure. It reads one-line declarations; a re-point through an intermediate token would pass it, and the row says the paint gates hold the rest.
- E6-G2 reddens on any blend in the chip subtree.

## Row 4 · π and DELTA

### FE-02 · Four of the six state tokens W-H.1 re-points have no paired capture

- **Where:**
  - `waves/W-H.1.md:98` (§3.2 item 8): the six state tokens that read a plate at HEAD are re-pointed at the one-ink fill register, and ToggleGroup and the chip are painted "so they show".
  - `W-H.1.md:170` (H1-G23), the static gate over those six declarations.
  - `W-H.1.md` §6: the paired captures. fix-5 added one row, "ToggleGroup on and off; the selected chip" (`:192`). Of the six tokens, `--menu-row-bg`'s light row is W-0.1's with its own π, and `--dock-control-active-bg` is the dock tabs of G14 (`dock-*.png`).
- **Defect:** the other four tokens change paint on surfaces that no §6 row captures:
  - `--control-checked-bg` (read by `src/styles/glass/control-bit.css`: the checked checkbox, radio and switch bit);
  - `--control-surface-bg-hover` (read by `glass/control-surfaces.css` and `_shared/disclosure/disclosure.css`: the hovered SelectTrigger, ToggleGroup item and disclosure trigger);
  - `--dock-control-hover-bg` (read by the dock's `icon-button.css`, `tab-button.css`, `triggers.css`);
  - `--dock-layer-switcher-active` (read by `dock/styles/layer-group.css`).
  PLAN §1 requires a screenshot and paired π reading before and after for every visual claim. H1-G23 proves the declarations moved, not the paint. The row covering "the ladder, the dock, the popover and the real Dialog" per D3 cell (`$H/capture.mjs`) does not include these states at HEAD: `git show HEAD:docs/tranches/BL/design/material/harness/specimens.mjs | grep -ci 'checkbox\|data-fill\|data-hover'` → 0. D3 is adding state-fill specimens (a checked Checkbox, a hovered DockControl) in its uncommitted working tree, but W-H.1 §6 does not name them or any M-row for them.
- **Evidence:** `git grep -l -- 'var(--<token>' -- src` in the worktree, for each token above; the §6 table read in full.

## Row 5 · ledger rows

No finding.
- **Terminals.** A script over every `LEDGER.md` table reads BUILD 496, FOLD 139, RETIRE 185 and BANKED 8 (828 cells). Less §4's docket and the §9 header cell, that is §9's 808 (`LEDGER.md:533`). fix-5 changed no terminal word.
- **Waves.** Every BUILD and FOLD row names a wave that exists; the one script hit is the §9 header row. No row reads UNPLACED; every BANKED row carries a re-trigger.
- **fix-5's rows.** #84a (`:200`) points at W-H.1, whose §1 names it (`W-H.1.md:28`). #43 (`:108`) keeps BUILD W-E.6 and names X-G1's fill as W-H.1's (H1-G22, `W-H.1.md:29`). #76b (`:184`) names G-L1-7's in-place case. PLAN-§6-D5 and U-12 record D5 as opened.

## Row 6 · loop pre-emption

No finding. The W-0.8 exception is recorded (`PLAN.md:38`) and ratified (`FORMATION-PROGRESS.md:78`). FD-02's cure removes the one contradiction pass 4 found. This seat walked D3's floor rows FL-1..FL-13 against the non-loop waves:
- FL-6 is now W-H.1's.
- FL-11 is W-H.5's (fix-4).
- FL-2 (drop `contain: paint`) is built by W-E.2 in band E, before band H. W-E.2 builds exactly what FL-2 rules in every route, and PLAN §2 records that D3's M-7 witness reads W-E.2's cure (`PLAN.md:67`), so no D3 choice is pre-empted. The plan's text on who owns it disagrees with itself (notes).
- FL-1 (delete the sampler): W-G.3 removes the readback and the `backgroundCanvas` prop, which is a subset of FL-1, as pass 4 read it (notes).
- The D2 floor (row 3's hover gate and coarse pin) is W-I.3's after W-I.1, and W-E.7's compact-seat hit area leaves the seat box alone and matches no D2 floor row in the opposite direction.

## Row 7 · the DAG

This seat's walk of PLAN §5 (Python `graphlib`, with W-L.6's "every wave of bands C to K" expanded) found:
- 99 rows, one per spec;
- acyclic, with 0 dangling ids and 0 edges into a later band;
- no band-0 row with an external dependency other than the D3 gate (W-0.1, W-0.2).

Band 0's specs name later waves only as hand-offs (grep of every `W-[A-L].n` mention in `W-0.*.md`).

### FE-01 · Within-band dependencies the specs state that §5 does not carry

- **Where** (each pair is unordered under §5's transitive closure, checked by script):
  - **W-E.2, W-E.6, W-E.7, W-E.9 → W-E.1.**
    - W-E.1 §4 (`W-E.1.md:69`) lands "the band's fixture app `tests-visual/fixtures/band-e/` (appendix B) that every band-E wired spec drives".
    - W-E.2, W-E.6, W-E.7 and W-E.9 each drive it (`HEAD` field, line 7 of each: "probes drive the band-E fixture app (W-E.1 appendix B)"), and each lands its probe as a wired spec (`surface-geometry.spec.ts`, `chip.spec.ts`, `density.spec.ts`, `cel-container.spec.ts`).
    - None of the four lists the fixture app in its own §4, and none reaches W-E.1 in §5 (`PLAN.md:309,313,314,316`). W-E.10 and W-E.14 reach it only through W-E.9.
  - **W-G.3 → W-G.6.** W-G.3 §4 (`W-G.3.md:55`) lands `tests-visual/wired/dock-idle-loop.spec.ts` "(appendix B, on the harness page)". W-G.6 §4 moves that harness page into `tests-visual/fixtures/`. §5 gives each only W-G.1 (`PLAN.md:331,334`).
  - **W-H.2 → W-H.1.**
    - W-H.1 §4 lands `scripts/probes/band-H/` and its npm script (`W-H.1.md:134`).
    - W-H.2's G4 reads that probe's `H2/LENS-INERT` rows (`W-H.2.md:119`), its setup is "as W-H.1 §5" (`:112`), and its §4 adds two files inside that directory (`:108`).
    - W-H.5's §4 lists the same directory "shared with W-H.2".
    - §5 gives W-H.1, W-H.2 and W-H.5 the same external edges and none between them (`PLAN.md:336,337,340`).
  - **W-E.4 → W-E.2.** W-E.4 §3 item 8 (`W-E.4.md:64`) rewrites SelectContent's classes and says "the side-translate utilities are already gone in W-E.2". W-E.2 removes them (E2-G12, `SelectContent.vue`). §5 gives W-E.4 W-0.4 and W-E.1 (`PLAN.md:311`).
  - **W-K.4 → W-K.5.** W-K.5 §4 (`W-K.5.md:51`): "the ring selector reads it; W-K.4 then points every register at that ring". §5 gives W-K.4 W-H.1 and W-I.1, and W-K.5 W-E.4, W-K.2 and W-K.11 (`PLAN.md:353,354`).
- **Defect:** PLAN §5 is the one record of edges, and band order does not order waves inside a band. Each pair above can land in either order under §5, though the spec text puts one first.
  - If W-E.2 lands before W-E.1, its wired spec drives a fixture app that is not in the tree, so W-E.2 either lands the app too (two waves carry one fixture) or lands a spec that cannot run.
  - The same holds for W-G.3's harness page and W-H.2's probe.
  - W-E.4's and W-K.4's texts are written for one order and are wrong under the other.
- **Evidence:** the lines cited; `scratchpad/formation/crit-5/dag.py` (the §5 parse, closure, and a sweep of every same-band wave id mentioned anywhere in each spec). The sweep's other hits are hand-offs, shared probe patterns with no landing, or pairs a spec declares order-free (W-G.1/W-G.2, W-G.4/W-G.5).

### FE-03 · Fifteen specs restate their edges beside §5

- **Where:** PLAN §5: "A wave spec cites it and does not restate its edges" (`PLAN.md:266`). These specs' dependency paragraphs list their edges as wave ids:
  - W-D.1 (§ Dependencies: "W-A.2 first … W-C.2 first … W-C.1 first") and W-D.2 (`W-D.2.md:109`);
  - W-F.1 (`:142`), W-F.4 (`:85`), W-F.5 (`:94`), W-F.6 (`:81`), W-F.7 (`:82`);
  - W-G.1 (`:129`), W-G.2 (`:82`), W-G.5 (`:119`), W-G.6 (`:84`), W-G.7 (`:93`);
  - W-H.4 (`:101`), W-I.2 (`:119`), W-I.3 (`:101`).
- **Defect:** these lists are derived copies of §5, so the DAG has two records. fix-5 struck the same duplicate in W-F.2, W-F.3 and W-G.4, and found W-F.3's copy had already gone stale when its W-F.2 edge landed (`fix-5.md` §FD-03). Today the copies agree with §5 except W-G.5, which lists W-G.4 beside W-G.1 while §5 gives it W-G.1 alone (W-G.5 calls the pair order-free). Any later §5 edit leaves these copies stale unless every one is re-edited.
- **Evidence:** a script comparing each paragraph's wave ids with its §5 row (`scratchpad/formation/crit-5`). All 99 spec headers read "depends on | PLAN §5".

## Row 8 · breaks and aliases

No finding.
- fix-5 deletes W-E.2's state-fill MIGRATION row together with the change it described.
- W-H.1 adds two rows (`:203-204`) for the five plate-reading tokens and the two `background-color` fills, with no alias; `--dock-control-active-bg` keeps its own row.
- W-L.1's forwarded update strategy is a new declared prop (additive), and its §7 is unchanged.
- W-E.6's blend removal changes paint, not a public surface.

## Row 9 · re-booked chronics

No finding. A grep of `PLAN.md`, `LEDGER.md` and every spec for later-tranche carries (`BM`, "next tranche", "after BL", `12.0.0`, "later tranche", "future tranche") finds none. #84a moved between two BL waves and stays BUILD. 47 rows are marked DISEASE, and none is BANKED.

## Notes outside the checklist (not counted)

- **G-L1-5 reads red on macOS.** `test "$(grep -rl '<svg' src/components/dark-mode-toggle | wc -l)" = 1` (`W-L.1.md:193`) is labelled a hold line reading 1 at HEAD. BSD `wc -l` prints `       1`, the string comparison fails, and the command exits 1 here. It passes on GNU. `-eq` or `awk` would make it platform-neutral, as C2-G7 and I7-G2 already do.
- **`contain: paint` has two owners in the text.** W-E.2 §3.2 removes it with a MIGRATION row, and W-H.2 (`:34`) says "M-7's cure … is W-E.2's". W-0.1 (`:57`) says `contain: paint` (M-7) lands "in W-H.1 or W-H.2, with their MIGRATION rows there". FL-2 puts it in D3's floor patch too. The build is W-E.2's by PLAN §2, and the W-0.1 sentence is stale.
- **D3-B is banked, and the plan still branches on it.** `design/material/REGISTRY.md:22` banks D3-B at `020f6586`, and FL-1 deletes the sampler in every route. PLAN §2 (`:67`), §4 (`:259`), §5's notes (`:374`), W-G.3 §3 and §7 (whose MIGRATION row says `data-backdrop-sample-source` "still reads `canvas`", a surface FL-1 deletes), and H1-G19/H1-G20 still build or gate on D3-B. Pass 3 and pass 4 noted the same premise gap.
- **W-E.2's appendix still carries the G3 block.** The appendix lands as `surface-geometry.spec.ts` (`W-E.2.md:121`), and its `E2-G3 toggle on≠off` row (`:173`) is red until W-H.1 lands. Whether W-E.2 lands the block (a red wired row between the waves) or leaves it to W-H.1 is not said.
- **W-J.1's "whichever is first".** W-J.1 (`:123`, `:153`) lands the `--control-surface-bg-hover` fix "with W-H.1's control-surface ladder or in this wave's patch, whichever is first". §5 orders W-J.1 after W-H.1, and H1-G23 re-points that token, so the second branch is dead text.
- **The band-K fixture app has no landing wave.** W-K.1's header names appendix B "shared by W-K.1 .. W-K.10", but no band-K §4 lands `tests-visual/fixtures/…` for it, unlike W-E.1's.
- **Fence.** This seat read `design/` and did not write it. The probes, the extracted gate list and the results are in this seat's scratchpad, outside the checkout.
