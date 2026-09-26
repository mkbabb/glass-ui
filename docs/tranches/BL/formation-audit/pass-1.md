# BL — formation audit, pass 1

| field | value |
|---|---|
| seat | formation critic, pass 1. Authored none of `PLAN.md`, `waves/` or `LEDGER.md` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `ae8370e0` (the LEDGER bank commit). `git diff --stat v10.1.0 HEAD -- src` prints nothing, so `src` is the published 10.1.0 |
| inputs read | `CHARTER.md` in full; `FORMATION-PROGRESS.md` in full; `PLAN.md` in full; `waves/INDEX.md` in full; §5 (gates) of all 90 wave specs, plus the cure, π and MIGRATION sections where a finding needed them; `LEDGER.md` §0, §4, §5, §8, §9 and every row the findings cite; `audit/REGISTRY.md` family headers (85), severities and F-14 in full; `audit/INBOUND.md:36-43`; `audit/INBOUND-MAP.md:155-203` (sampled rows); `audit/PROMPT-RECAP-SEED.md`; `design/material/PORTFOLIO.md` (the D3-A and D3-B routes); `design/dock/REGISTRY.md` (greps) |
| where probes ran | a scratch worktree at `ae8370e0` (`scratchpad/formation/crit-1/wt`, `node_modules` symlinked), removed before return. Browser probes: the band-E consumer app (the band-E seat's packed 10.1.0 install) served on :5874, and a band-K fixture rebuilt here from `W-K.1.md` appendix B over the same install (reka-ui 2.10.5) on :6272. Both servers stopped. Load average 21-27 during the runs |
| fences | no source edit, no git write; the one write in the checkout is this file |

The checklist is fixed at nine rows (the task). A finding names the row it fails. The "Notes" at the end are outside the checklist and are not counted.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every wave has a gate; every gate RED at HEAD (sample re-run) | FAIL (FA-01, FA-02, FA-03) |
| 3 | no vacuous gate | FAIL (FA-04, FA-05, FA-06, FA-07) |
| 4 | every visual claim carries π/DELTA | FAIL (FA-06, FA-08) |
| 5 | every ledger row terminal and pointing at a wave that covers it | FAIL (FA-09, FA-10, FA-11, FA-12) |
| 6 | no loop wave pre-empts its loop | FAIL (FA-13, FA-14, FA-15, FA-16, FA-17) |
| 7 | DAG acyclic; band 0 depends on nothing outside itself except D3 | acyclic and band 0 PASS; FAIL on DAG integrity (FA-18, FA-19) |
| 8 | every break has a MIGRATION row and no alias | FAIL (FA-20) |
| 9 | no re-booked chronic | FAIL (FA-21) |

**clean = false.** 21 findings.

## Row 1 · families placed

`grep -oE '^#### F-[0-9]{2}' audit/REGISTRY.md` gives 85 distinct ids. The families column of PLAN §2 (`PLAN.md:38-52`) names exactly the same 85 (a `comm -3` of the two sets is empty), and so does the families column of PLAN §3's wave rows. Families in more than one band are declared splits (F-14, F-22, F-24, F-29, F-30, F-31, F-54, F-63, F-65, F-68, F-71), and INDEX adds F-13, F-48 and F-50 as wave-level splits (`waves/INDEX.md:100`). No family is missing and none is placed without a stated split. PASS.

## Row 2 · gates exist and are RED at HEAD

Every one of the 90 specs has a §5 acceptance-gate section (a heading count per file).

**Gates re-run at `ae8370e0`, at least one per band, plus the BLOCKER families (F-01 W-A.2, F-21 W-E.2, F-68 W-0.7) and the HIGH-tagged K rows.** Every one reproduced RED except where noted.

| band | gate | reading here | spec's reading |
|---|---|---|---|
| 0 | W-0.6 G1-G3 (appendix A test written into the worktree, `npx vitest run`) | 3 failed, 1 passed: `expected 72 to be 60`; `-0.0232685 … to be close to -0.1577717`; pin fails | same |
| 0 | W-0.4 G3, G4, G5 | 29 bare `data-reveal` lines; 2 `z-` literals, exit 1; 6 `setTimeout` | 29; 2; 6 |
| 0 (F-68 BLOCKER) | W-0.7 G1, G3 | version `10.1.0`, exit 1; `npm view @mkbabb/glass-ui@10.2.0` → E404 | same |
| A (F-01 BLOCKER) | W-A.2 G3, G6, G7 | register files present, exit 1; 6 sink lines; 10 `it.fails(` | exit 1; 6; 10 |
| A | W-A.6 G0 | `plutil … AllowRemoteAutomation` → `false` | false |
| B | W-B.7 G1; W-B.9 G1; W-B.12 G3; W-B.13 G2 | 8; 4 (all `useCanvas2D` lines, the spec counts 3 code lines); 27; `:18`, `:66` | 8; 3; 27; `:18`, `:66` |
| C | W-C.1 G1, G5; W-C.2 G5; W-C.5 G7, G9 | 852 tracked scripts under `docs/`; `ci.yml:15`, `release.yml:35`; `dissolveGrammar.ts`; 26 `Math.random` code lines; 9 | 752; same; same; 24; exit 1 |
| D | W-D.1 G8; W-D.2 G4 | the three scripts present, exit 1; 8 externals lines | same |
| E (F-21 BLOCKER) | W-E.2 appendix A (`e2.mjs`, Chromium, spec text) | `E2-G1` FAIL ×4: `position: relative`, top 992 / 1109.2, flush radii 24px; G2 travel 0; G3 dark ΔE 0.0013, PRT 0 (light PASS, the control); G4 reach 2 vs 16 ×4; G5 127 > 85 | identical |
| E | W-E.1 G6; W-E.2 G12, G14, G15; W-E.3 G9; W-E.5 G9; W-E.8 G2; W-E.11 G5; W-E.12 G2; W-E.13 G6 | all RED at the cited lines (`stage.css`, `dock-nav.css`; `run.css:357,366`; `styles.css:531`, `use.ts:85`; `use-toast.ts:62`; 53; 4; `worm.ts:134`; `paper.css`) | same |
| F | W-F.1 G1 | 7 sites in 5 files | 7 in 5 |
| G | W-G.1 G1, G2; W-G.5 G4; W-G.6 G5 | 660; 19; 45 lines; 5 | 660; 19; exit 1; 5 |
| H | W-H.1 G5, G15; W-H.2 G8, G9 | 19 lines; `styles.css:144,243`; 7; spec present | exit 1; same; exit 1; exit 1 |
| I | W-I.1 G11, G15, G16, G20; W-I.2 G1; W-I.3 G4 | 38; 16; 13; 130; the three member reads; `engage-ladder.test.ts:249` | same |
| J | W-J.1 G11, G12, G13; W-J.2 G2 | `Card.vue:37`; `chipVariants.ts:15`; `SegmentedTabs.vue:320`; 2 writers | same |
| K (HIGH) | W-K.2 appendix A (`k2.mjs`, Chromium) | G1 FAIL `picked null, closes 2`; G2 FAIL 2 hidden, 2 guards; G3 PASS (hold line); G4 FAIL `controls ""` | identical |
| K (HIGH) | W-K.3 appendix A (`k3.mjs`, Chromium) | G4 FAIL (menu open, `BODY`); G6 FAIL; G7 FAIL 4 of 4; G1, G2, G3, G5, G8 PASS | identical for Chromium |
| K | W-K.1 S; W-K.2 S; W-K.4 S; W-K.5 S; W-K.6 S; W-K.7 S; W-K.8 S; W-K.9 S; W-K.10 S | all exit 1 at the cited sites (9 `activeElement` reads; 45 ring-shadow lines; `:187`; `useDeckSnap.ts:143`; `useViewTransition.ts:168`; 0 reset listeners; 3 `_unmountOnHide`, 0 `until-found`; `TypewriterText.vue:4`) | same |
| L | W-L.4 G3; W-L.5 G3, G5; W-L.6 G3; W-L.7 G1; W-L.8 G10 | helper clause fails; floors `^4.0.0`; E404 (latest 4.0.0); all four named rows present; no `coordination/` dir; `core.hooksPath` → the deleted `.githooks` | same |

Count drift (752 → 852 tracked scripts under `docs/`) comes from the BL design loops' own harness files; the gate stays RED and W-C.1 must count at its own base.

### FA-01 · A born-RED gate is GREEN at HEAD

- **Where:** `waves/W-B.1.md` §5 B1-G1; the same stale premise in `waves/W-H.2.md` §5 G10 ("`LEDGER.md` absent") and `waves/W-L.8.md` §5 G-L8-7.
- **Defect:** B1-G1 (`test -f docs/tranches/BL/LEDGER.md`) is recorded RED, and it now exits 0, because the formation LEDGER seat committed the file (`ae8370e0`). W-B.1 is described as "the formation LEDGER seat's act" (`PLAN.md:98`), so its record gates are satisfied by formation, not by an execution wave.
- **Evidence:** `test -f docs/tranches/BL/LEDGER.md; echo $?` → `0` in the worktree at `ae8370e0`.

### FA-02 · Gates that are not RED at HEAD and are not hold lines

- **Where / evidence:**
  - `W-K.7.md` §5 K7-G13: HEAD reading "**UNMEASURED** (no collapsing select dock in the demo or fixture; the executing seat adds one …)". F-43 is a HIGH family (`REGISTRY.md` F-43 lenses line).
  - `W-G.6.md` §5 G6-G4: "not stably RED: 55 ms on 1 of 8 opens".
  - `W-I.1.md` §5 G22: "not measurable at HEAD: the witnesses do not exist".
  - `W-J.1.md` §5 G15: "not measurable at HEAD".
  - `W-J.2.md` §5 G4, G5: "cannot be RED at this seat because their executable is D5's first product" (D5 does not exist, FA-17).
- **Defect:** the charter requires gates born RED where the defect is live (`CHARTER.md:48`). Each of these either names a live defect with no RED reading, or has no executable. None is labelled a hold line.

### FA-03 · A wave gate that tests a formation document

- **Where:** `waves/W-B.6.md` §5 B6-G4: `grep -qi handmark docs/tranches/BL/waves/W-H.1.md`.
- **Defect:** the gate measures the plan's own text, which the executing wave cannot change, and it is still RED because W-H.1's spec does not carry the HandMark band hand-off (FA-12).
- **Evidence:** `grep -ci handmark docs/tranches/BL/waves/W-H.1.md` → `0`.

## Row 3 · vacuous gates

### FA-04 · Decide-wave gates that the formation ledger already satisfies

- **Where:** every gate of the form `node scripts/tranche/verify-ledger.mjs docs/tranches/BL --rows …`: W-B.4 B4-G3, W-B.5 B5-G3, W-B.6 B6-G3, W-B.7 B7-G2, W-B.9 B9-G3, W-B.10 B10-G2, W-B.11 B11-G1, W-B.12 B12-G1, W-B.14 B14-G1, W-B.15 B15-G2, W-H.2 G10, W-H.3 G1, W-H.4 G5, W-I.4 G1, W-L.1 G-L1-20.
- **Defect:** each is RED at HEAD only because the checker file does not exist. The formation LEDGER already writes the terminal each gate asks for, so each gate turns green the moment W-B.1 lands the checker, before the deciding wave does anything. The gate cannot fail on the deciding wave's own act. B4-G3 says outright that "a `pending` verdict passes".
- **Evidence:** `LEDGER.md:225` C-4 is already `RETIRE … W-B.5` with its re-trigger (B5-G3's condition); `:108` #44 is `RETIRE … W-B.7` (B7-G2); `:127-128` #51a/#51b and `:226-228` C-5, C-6, C-7 carry B6-G3's terminals; `:112` #46b carries B10-G2's.

### FA-05 · K-band gates with no stated pass bound

- **Where:** `W-K.6.md` §5 ("Every row in the §2 table is a gate; it passes when its reading inverts (named, 0 hidden, … titles differ, focus moves …)"), `W-K.7.md` §5, `W-K.8.md` §5, `W-K.9.md` §5, `W-K.10.md` §5.
- **Defect:** the gate is "the inverted reading" of a §2 table row, and it has no id per row and no numeric criterion per row. "Titles differ" or "focus moves" passes on any change, including a wrong one. These gates cannot be bound into W-A.2's roster as they stand (a roster entry needs an executable and a bite, `W-A.2.md` §5 A2-G2).

### FA-06 · W-0.2's hold line misses the neutral-state change its cure makes

- **Where:** `waves/W-0.2.md` §3 and §5 G2; `PLAN.md:74`.
- **Defect:** the cure sets `--control-edge-ring: 0 0 0 1px color-mix(… var(--toggle-tint, var(--foreground)) 40% …)` on every pressed item, and the spec says "with no tint set … the edge gains a 40 % foreground ring". PLAN's scope is "unset reads today's neutral pressed state". G2, the hold line on the unset state, compares the fill only, so an edge change on every untinted ToggleGroup in every consumer passes all gates. §6 pairs only the tinted items, so the neutral change also has no π pair (row 4).
- **Evidence:** `W-0.2.md` §3, "the edge gains a 40 % foreground ring"; §5 G2 passes when "ΔE_OK ≤ 0.002 from HEAD's neutral pressed fill".

### FA-07 · Band-0 gates certify the O-77 cure that O-77a rejects

- **Where:** `waves/W-0.3.md` §3 and §5 G1, G2; `waves/W-0.7.md` §5 G5 (`configurator-layer-sub` > 0 in the tarball).
- **Defect:** O-77a (owner-framed, ratified into band 0 to amend W-0.3, `FORMATION-PROGRESS.md:76,78`) asks that "neither header line ever ellipsizes; inline when it fits, stacked when it doesn't" (`audit/INBOUND.md:43`). W-0.3 keeps `truncate` on the name and lets the sub-label truncate to 0 px. G2 passes when "the sub-label's client width ≤ 1 px", and W-0.7 G5 requires the class that carries this cure. The gates pass on the behaviour the owner rejected.
- **Evidence:** `W-0.3.md:57` ("The name keeps its `truncate`, so a name longer than the track ends in an ellipsis"); `LEDGER.md:492` (U-3).

## Row 4 · π and DELTA

Every spec has a π/DELTA section. The ones that declare no visual claim (W-A.5, W-B.1, W-B.3, W-B.7, W-B.11 to W-B.14, W-C.1 to W-C.3, W-D.1, W-D.2, W-E.12, W-K.3, W-L.5, W-L.7) either change no paint or carry a byte-identity hold line. FA-06 is one uncovered visual change.

### FA-08 · Capture roots split, and two bands write evidence to a wiped path

- **Where:** bands 0 and L (`W-0.1` to `W-0.5`, `W-0.7`, `W-L.1` to `W-L.4`, `W-L.6`) store captures under `<scratch>/BL/evidence/`. Bands C, H, I and J use `.cache/evidence/`, and band A uses `.cache/visual/`.
- **Defect:** PLAN §1 requires captures "on disk under the one scratch root (F-61)" (`PLAN.md:28`), and W-C.1 names that root as `.cache/` (`W-C.1.md:40`). Band L lands after W-C.1 and still cites the session scratchpad. That scratchpad is `/private/tmp/…`, which a restart wiped on 2026-09-24 09:43 (`FORMATION-PROGRESS.md`, outage log), so a DELTA cited there does not survive to FINAL.md's cite check (W-L.8 G-L8-9).
- **Evidence:** `grep -ln "<scratch>/BL/evidence" waves/W-*.md` → 11 files; `grep -ln "\.cache/evidence" waves/W-*.md` → 12 files.

## Row 5 · ledger rows

A parse of every `LEDGER.md` row table finds 486 BUILD, 128 FOLD, 8 BANKED, 167 RETIRE and 19 UNPLACED. Every BUILD and FOLD wave id exists in `waves/INDEX.md` (0 dangling). The failures are coverage and terminality.

### FA-09 · 19 rows are not terminal, and band 0 lacks the waves the owner ratified

- **Where:** `LEDGER.md:484-511` (§8, U-1 to U-12); `PLAN.md:20` and `:347` (band 0's rows); `waves/INDEX.md:9-15`.
- **Defect:** the ledger's own §8 lists 12 groups (19 item rows) marked UNPLACED, which is not a terminal. The most material:
  - O-83, O-84 and O-84a were ruled into a band-0 dock-surface wave before W-0.7 (`FORMATION-PROGRESS.md:78-79`, owner ratify grant). No such wave exists, and W-0.7's dependency list omits it.
  - O-74b was ruled into band 0 as a named title rung (`FORMATION-PROGRESS.md:80`, `INBOUND.md:40`). No wave carries it.
  - O-77a contradicts W-0.3 (FA-07).
  - O-85 was ruled to the dock band with O-65 (`INBOUND.md:41`). W-I.1 does not name it, and `design/dock/REGISTRY.md` has 0 hits.
  - O-82 was ruled for 10.2.0 (`FORMATION-PROGRESS.md:79`) and sits in W-L.1 (11.0.0).
  - U-6 to U-11 are rows that no spec names: #31f/#33b the toast title, #31g, #49e the aurora pause, #53c, #54b, and WEBKIT-ACCORDION-CRASH.
  - U-12: D5.
  - PLAN §1, §3 and §7 still describe band 0 without any of these rows.
- **Evidence:** `grep -c` of O-82, O-83, O-84, O-84a, O-77a, O-74b and O-85 in `PLAN.md` and `waves/INDEX.md` → 0 each.

### FA-10 · The ledger's terminal vocabulary fails its own checker

- **Where:** `waves/W-B.1.md:46` (the checker accepts BUILD, FOLD, RETIRE, ANSWERED, DECLINE, CURED); `waves/W-L.8.md` §5 G-L8-13 (the same list); `LEDGER.md` §0 and the 8 BANKED rows (`:393, :564, :565, :589, :619, :659, :671, :848`).
- **Defect:** the charter's terminal "banked with a named re-trigger" (`CHARTER.md:44`) is not in either checker's vocabulary. As specified, B1-G2 and G-L8-7 reject the ledger they are meant to certify. Conversely, ANSWERED, DECLINE and CURED appear in the checker as terminals, while the ledger carries them only as RETIRE classes.
- **Evidence:** `grep -c BANKED waves/W-B.1.md` → 0.

### FA-11 · Mechanism-only placements do not reach their rows

- **Where:** `LEDGER.md` appendix A (87 rows tagged `[M]`; W-E.7 holds 41 of them).
- **Defect:** a row placed by family mechanism is "covered" only if the wave's born-RED set reaches it (`LEDGER.md` §8 F-2). Sampled rows show it does not:
  - UIA-V-76 (HIGH: the Tools trigger's missing coarse floor, 33.4 px) is reached only in part, by E7-G7's compact seat.
  - UIA-V-236 (the DockTrigger 32 px beside 40 px DockControls) and UIA-KF-243 (a 12 px chevron beside 20 px glyphs) have no W-E.7 gate.
- **Evidence:** `audit/INBOUND-MAP.md:155,165,183`; `grep -c "UIA-V-76\|UIA-V-236\|UIA-KF-243\|UIA-V-44" waves/W-E.7.md` → 0; W-E.7's gates E7-G1..G9 measure no DockTrigger height and no chevron.

### FA-12 · Hand-offs the target spec does not carry

- **Where / evidence** (each `grep -c` on the target spec returns 0):
  - W-B.15 hands R56 (scroll glide) to W-I.1, and `W-B.15.md:11` says "D2's checklist gains R56". W-I.1 has 0 hits for R56, and so does `design/dock/REGISTRY.md` (B15-G1 RED).
  - W-B.6 hands the HandMark band to W-H.1's invariant: 0 hits.
  - W-B.2 routes value.js O-71 to W-E.2 (0), O-73 to W-K.4 (0), and O-65/O-67 to W-J.1 (0 hits for OA-50 or the value.js ids).
  - W-I.4 hands S1 (the link verb) to W-K.6: 0.
  - W-H.3 hands S10 to W-B.3: 0.
  - W-L.8 G-L8-11 reads "no census row names them" for #15, #70 and Q063, which the ledger now rows (`LEDGER.md:409-411`), so that HEAD reading is stale.
- **Defect:** ledger rows that point at these waves are placed on waves whose specs neither build nor gate them. `LEDGER.md` §8 F-8 records the list but leaves them placed.

## Row 6 · loop pre-emption

### FA-13 · W-G.3 and W-G.1 build D3's live-veil input ahead of D3

- **Where:** `waves/W-G.3.md` §5 G3-G2 and §9 ("the live veil's input (D3's M-5) exists on the shipped engine for the first time"); `waves/W-G.1.md` §5 G1-G9 (each field publishes its luma); `PLAN.md:331`.
- **Defect:**
  - W-G.3 requires every dock `[data-backdrop-sample-state]` to read `sampled`, which builds the dock's live luma channel. This is D3's M-5 subject.
  - D3's route D3-A deletes that channel: "Nothing samples, nothing publishes, and the live channel is deleted" (`design/material/PORTFOLIO.md:260`).
  - W-G.1's published field luma is D3-B's mechanism (the "field signal" column, `PORTFOLIO.md:242`).
  - Neither wave depends on the D3 gate, and W-H.1 depends on W-G.3.
  - PLAN's note that D3-A "deletes W-G.3's consumer, not its idle-loop cure" concedes that the dock half is built and then possibly deleted.

### FA-14 · W-0.2 designs a subject D3 owns

- **Where:** `waves/W-0.2.md` §3 (the mix values 12 %, 16 %, 40 % and 60 %); `FORMATION-PROGRESS.md:45` ("O-76 … folds with the O-66 grey measure in D3").
- **Defect:** W-0.2 is not a loop wave, yet it fixes the pressed-tint design, the edge ring included, from a scratch prototype on HEAD's plate. D3 owns the fold. Its only tie to the loop is a dependency on W-0.1.

### FA-15 · Dock composition decided and built outside D2

- **Where:** `waves/W-I.4.md:8` ("Not a loop wave"), with its S7 and S8 BUILD rows and gates G3-G5; `audit/REGISTRY.md` F-14 round-2 correction ("W-DOCK-COMPOSE-DECIDE (R2-06-01, inside the dock design loop)").
- **Defect:** the registry's wave shape places the dock composition decide inside D2. The plan runs it after W-I.1 as a non-loop wave that builds dock motion (the subdock legs, the search bloom) with its own probe. D2 never judges these subjects, and `design/dock/REGISTRY.md` has 0 hits for R2-06-01.
- **Evidence:** `grep -c "R2-06-01" design/dock/REGISTRY.md` → 0.

### FA-16 · The owner-ratified band-0 dock cures pre-empt D2, and the plan does not record the exception

- **Where:** `PLAN.md:32` ("no other wave builds that family's subject first"); `waves/W-I.1.md` §3.1 item 2 and §3.4 items 4-5; `FORMATION-PROGRESS.md:79`.
- **Defect:** O-83 and O-84 cure D2 subjects (the cap and the collapsed summary) in 10.2.0 ahead of D2's convergence. W-I.1 says an 11.0.0 that re-squares the summary "reverses a shipped cure" and asks D2 to re-rule Q-10. The pre-emption is ratified by the owner, but PLAN's loop rule states no exception. The band-0 wave that would carry it does not exist (FA-09).

### FA-17 · A loop wave for a loop that does not exist

- **Where:** `waves/W-J.2.md` (loop "D5, to open"); `PLAN.md:196, 236, 336`; `LEDGER.md:508` (U-12).
- **Defect:** W-J.2's entry gate is D5's convergence. D5 has no portfolio, no seat and no battery, and no formation act opens it. W-J.2's G4 and G5 have no executable (FA-02). #27, #77a, D-2 and GAP-2 wait on it.

## Row 7 · the DAG

Parsed from `PLAN.md` §5, with W-L.6's "every wave of bands C to K" expanded: 90 waves, 0 cycles, 0 edges pointing to a later band. The union of that table with all 90 specs' `depends on` fields is also acyclic, with 0 forward edges. Band 0: W-0.1 depends on the D3 gate, W-0.2 on W-0.1, W-0.5 on W-0.1 and W-0.2 (spec only), W-0.7 on W-0.1..W-0.6, and the rest on nothing. No band-0 edge leaves the band except the D3 gate. PASS on the stated invariant.

### FA-18 · A dangling edge

- **Where:** `waves/W-I.1.md:11` ("band 0's dock-surface wave (O-83, O-84, O-84a, formed at the next formation pass)").
- **Defect:** W-I.1 depends on a wave with no id in `waves/INDEX.md` (FA-09).

### FA-19 · Two DAGs that disagree

- **Where:** the `depends on` field of 28 specs against `waves/INDEX.md` / `PLAN.md` §5. Examples:
  - W-L.2: spec adds W-I.2 and W-L.1.
  - W-D.2: spec adds W-A.1, W-A.3, W-A.4 and W-B.13.
  - W-J.2: spec adds W-A.2, W-F.1, W-F.6 and W-I.3.
  - W-L.3: spec adds W-K.6 and W-L.2.
  - W-L.6: INDEX has "every wave of bands C to K", the spec has W-D.1 only.
- **Defect:** P-3 requires one source of record for derived data. The schedule an executor reads depends on which file it opens.
- **Evidence:** a per-spec diff of wave-id sets (28 mismatches). The union remains acyclic.

## Row 8 · breaks and aliases

The MIGRATION sections were read for all 90 specs. Every removal or rename sampled carries a row: W-C.2, W-C.4, W-E.4, W-E.6, W-E.8, W-F.1, W-F.5, W-F.7, W-G.3, W-G.4, W-G.5, W-I.1, W-J.1, W-K.2, W-K.4 and W-L.4.

### FA-20 · W-G.7 publishes one symbol through two doors

- **Where:** `waves/W-G.7.md` §3 item 1 ("`./aurora` re-exports the same bindings from it"), §5 G7-G4, and §7 ("the `./aurora` import keeps working").
- **Defect:** `deriveAurora` and `paletteToCssGradient` would ship on both `./aurora-palette` and `./aurora`. That is the one-symbol-two-doors alias that F-58 names and E-1 forbids. It also reddens W-D.1's D1-G4 ("0 names on two or more entries", whose HEAD reading already lists `4 aurora/color`). G7-G4 asserts the duplicate door as a pass condition, and the MIGRATION row presents the old path as still working instead of naming one successor.

## Row 9 · re-booked chronics

The 8 BANKED rows name re-triggers and none is a chronic. W-L.5 states its terminal if value.js 4.1.0 is not on npm (`W-L.5.md:54`). No row is re-booked to a later tranche.

### FA-21 · Disease rows decided inside shared waves

- **Where:** `LEDGER.md:66` (#25, W-H.2), `:116` (#48, W-I.1), `:170` (#67a, W-I.1), `:212` (#90a, W-I.1), `:229` (C-8, W-E.2), `:230` (C-9, W-K.5) and `:236` (C-13c, W-E.9); the ledger's own `§8` F-3.
- **Defect:** each row rode two or three closes undecided. The charter says "deciding it is a wave of its own" (`CHARTER.md:23`), and these are decided as one item of a wider wave. C-8's decision also spans two waves: E2-G15 turns green only when W-I.1 lands (`W-E.2.md` §5).

## Notes outside the checklist (not counted)

- **P-1 in the specs.** 42 of 90 specs never mention the gestalt passes (`grep -LiE gestalt waves/W-*.md`). Implemented waves among them include W-0.1 to W-0.6, W-A.1 to W-A.6, W-H.1, W-H.2, W-I.2, W-I.3, W-L.1 to W-L.4 and W-L.6. PLAN §1 requires the three passes of every implemented wave (`PLAN.md:31`).
- **Critical path.** W-A.1 depends on W-0.7 with no stated reason beyond "PLAN §5" (`W-A.1.md:10`). Transitively, 68 of the 83 major waves wait on the 10.2.0 tag, and so on D3's convergence; only W-B.1..W-B.15 and W-L.5 do not (computed from INDEX).
- **Stale loop state.** PLAN §4 records D1 pass 3B running (`PLAN.md:232`), and W-D.1 §0 records "Entering pass 4: 18 closed". The cursor has pass 4 CLOSED at 24/27 and pass 5 running. The loop registries are the source of record (P-3).
- **Relay path.** W-0.7 G8 and W-L.7 G-L7-1 look for letters under `docs/tranches/BL/coordination/`, while W-B.2 §3 makes `docs/tranches/BL/outbox/` the one outbox.
