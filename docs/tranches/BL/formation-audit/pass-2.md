# BL — formation audit, pass 2

| field | value |
|---|---|
| seat | formation critic, pass 2. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, pass 1 or fix 2 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `6b75e0a7` (the fix-2 commit). `git diff --stat v10.1.0 HEAD -- src` is empty, so `src` is the published 10.1.0. The plan folder has no uncommitted edits outside `design/` |
| inputs read | `CHARTER.md`; `PLAN.md` in full; `waves/INDEX.md` in full; `LEDGER.md` §0-§9 in full and appendix A by script and by sampled rows; `audit/INBOUND.md` (O-74..O-86, O-77a); `audit/REGISTRY.md` (family headers, severities, the F-14 round-2 correction); `FORMATION-PROGRESS.md:70-86`; §1, §3, §5, §6 and §7 of every spec a finding cites, and §5 of all 99 specs by script; `design/material/PORTFOLIO.md` and `design/dock/REGISTRY.md` (read only, greps); `formation-audit/pass-1.md`; `formation-audit/fix-2.md` last |
| where probes ran | a worktree at HEAD (`scratchpad/formation/crit-2/wt`, `node_modules` and `tests-visual/node_modules` symlinked), removed before return. Browser probes: fix-2's appendix P app rebuilt against that worktree, and one Sheet scene of this seat's own. Chromium (Playwright's) and Playwright WebKit. Playwright WebKit is not Safari; every real-Safari cell is UNMEASURED (OW-3). Load average 15-18 during the runs |
| fences | no source edit, no git write except the worktree add and remove; nothing under `design/` written; the one write in the checkout is this file |

The checklist is fixed at nine rows. Each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | FAIL (FB-01) |
| 2 | every spec has a gate; every gate RED at HEAD | FAIL (FB-02, FB-03, FB-04) |
| 3 | no vacuous gate | FAIL (FB-05, FB-06, FB-07, FB-08, FB-09) |
| 4 | every visual claim carries π/DELTA | FAIL (FB-10) |
| 5 | every ledger row terminal, pointing at a wave that covers it | FAIL (FB-11, FB-12, FB-13) |
| 6 | no loop wave pre-empted, except owner-ratified and recorded exceptions | FAIL (FB-14, FB-15, FA-17 still open) |
| 7 | DAG acyclic, one source, band 0 external only on D3 | acyclic and one source PASS; FAIL on band 0 (FB-16) |
| 8 | every break has a MIGRATION row, no alias | FAIL (FB-17) |
| 9 | no re-booked chronic | FAIL (FB-18) |

**clean = false.** 18 new findings, plus FA-17 still open. Of pass 1's 21 findings, 17 are cured, 3 are cured in the cited instance with the same class left elsewhere (FA-03, FA-08, FA-21), and 1 is still open (FA-17). The re-verification table is next.

## Pass 1, re-verified

| id | verdict | reading here |
|---|---|---|
| FA-01 | cured | B1-G1 struck (`W-B.1.md:105`); B1-G2 exits 1 (checker absent); W-H.2 G10 is OW-8's docket gate; G-L8-7 exits 1 |
| FA-02 | cured, with one remainder | G6-G4, W-J.1 G15, W-J.2 G4/G5 struck; W-I.1 G22 moved to I6-G1/G2. K7-G13 is now labelled a hold line, but its bite cannot bite (FB-08) |
| FA-03 | cured for B6-G4; the class remains | B6-G4 struck and the band moved to W-H.1 G18 (hold, 10.86 light / 6.37 dark, reproduced here in Chromium). Four other gates still read loop documents (FB-05) |
| FA-04 | cured | no gate runs `verify-ledger.mjs --rows`; the decide gates are docket gates or tree enactments |
| FA-05 | cured | W-K.6/K.8/K.9/K.10 carry 27/8/7/7 per-id rows, each with its own criterion |
| FA-06 | cured | W-0.2's ring slot falls back to `transparent`; G2 holds four slots; the neutral π pair is in §6. Reproduced: Chromium neutral fill `#d3d1cc`/`#25221d`, edge `#bab7b0`/`#403e38`, ring `rgba(0, 0, 0, 0)`. G3 is broken separately (FB-07) |
| FA-07 | cured | W-0.3 rewritten to O-77a; G1 FAIL 7 of 9 in Chromium here (only the 600 px `layer-actions` and `layer-bare` rows pass), G3 hold 52.4 = 52.4 = 52.4 |
| FA-08 | cured for wave-time captures in most specs; open for the band-E probe library | FB-10 |
| FA-09 | cured | no row reads UNPLACED; W-0.8, W-0.9, W-0.10 exist; the script count is 495 BUILD, 125 FOLD, 8 BANKED, 180 RETIRE, 0 UNPLACED |
| FA-10 | cured | LEDGER §0 and W-B.1 §3.1 use the four terminals; every BANKED row names a re-trigger (8 of 8, by script) |
| FA-11 | cured for the rows it named | UIA-V-76 → E7-G7 and E7-G10; UIA-V-236 → E7-G10 (Chromium: 35.3 vs 40, reproduced); UIA-KF-243 → E7-G11 (12 vs 20, reproduced). Rows tagged `[G]` show the same defect (FB-13) |
| FA-12 | cured for its list | R56 in W-I.1; O-71 in W-E.2; O-73 in W-K.4; S1 in W-K.6; S10 in W-B.3. Two other hand-offs have no receiver (FB-12) |
| FA-13 | cured | the publisher and the dock subscription are H1-G19/H1-G20, D3-B only; W-G.3 keeps the idle-loop cure and the readback removal |
| FA-14 | cured | W-0.2 is a loop D3 wave with `<edge>`, `<fill>`, `<ink>`, `<hover>` slots |
| FA-15 | cured | W-I.4 is a loop D2 wave |
| FA-16 | recorded, but the record is wrong for two of the three cures | FB-14 |
| FA-17 | **still open** | `ls docs/tranches/BL/design` prints `dock material structure tile`. D5 has no portfolio, and W-J.2 waits on its gate. fix-2 lists it under Open |
| FA-18 | cured | W-I.1 → W-0.8 in PLAN §5 |
| FA-19 | cured | PLAN §5 has 99 rows. Every spec's `depends on` field names no wave id (script over 99 files). 0 cycles, 0 dangling, 0 forward edges |
| FA-20 | cured | G7-G4 exits 1 at HEAD; the MIGRATION row names one successor |
| FA-21 | cured for the seven rows it named; C-8 remains | seven own waves exist. C-8's gate still spans two waves, and three other disease rows now show the same pattern (FB-18) |

## Gates re-run at `6b75e0a7`

**Static gates, all 99 specs.** A script extracted every backticked `!`/`test`/`grep`/`rg`/`node`/`npm`/`git` command from the gate column of each §5 table: 200 commands. It ran each one in the worktree in both spellings (the raw markdown with `\|`, and the rendered form with `|`). Every divergent pair except one needs the rendered form, because its pipes are shell pipes. Rendered-form results by band, as nonzero exits of total: 0 15/16, A 27/27, B 28/29, C 15/17, D 8/8, E 21/21, G 9/9, H 12/12, I 25/26, J 8/8, K 10/10, L 16/17. Every zero exit is a declared hold line, or FB-02, FB-06 or FB-09. Band F has no shell gate; F1-G1's regex, re-run over `src`, gives 7 sites in 5 files, as the spec states.

**BLOCKER families.**
- F-01 (W-A.2): A2-G3 exits 1, A2-G6 exits 1, A2-G7 exits 1 (10 `it.fails(`).
- F-68 (W-0.7, W-L.7, W-L.8): W-0.7 G1 exits 1 (`10.1.0`); G3 and G4 exit 1 (no 10.2.0 on npm); G-L7-3 exits 1; G-L8-1, -2, -3, -6 and -7 exit 1.
- F-21 (W-E.2): E2-G1 re-read with a Sheet scene of this seat's own (`Dialog :open` + `SheetContent`, Chromium, 390×844 and 1440×900, bottom and right). All 4 cells compute `position: relative` with all four corners `24px`: RED 4 of 4, the spec's reading on its position and radius legs. The `top` values differ from the spec's because the scene is smaller than the demo.

**Browser gates re-run through fix-2's appendix P**, rebuilt against HEAD, in Chromium unless marked:
- W-0.8 G1: FAIL 4 of 7. The used corners read `160.0x28.0` and `32.0x130.0` where the stadium needs 28 and 32.
- W-0.8 G2: overrun 28 px.
- W-0.8 G3: ink gaps 30.83, 18.89 and 6.95 against 5.45.
- W-0.9 G2/G3 hold: 20.352, 23.669 and 27.516 px; `--type-title` 32.928.
- W-0.3 G1: FAIL 7 of 9.
- E4-G16: overlap 4 px. E4-G17: 741 px². E4-G18: the hit is `cover`.
- W-E.4 `msel`: right edge 610.9 at 390.
- K11-G2: `role` null, `tabindex` null.
- E7-G10/G11: 35.3 vs 40; 12 vs 20.
- E5 `mtoast`: 3 toasts for 2 calls sharing an id, 1 glyph on success.
- E9-G8: 11 = 11.
- W-H.1 G18 hold: 10.86 / 6.37.
- K7-G13: 0 running (FB-08).
- A1-G13 (Chromium and Playwright WebKit): Chromium opens the Accordion on 6 of 6 clicks and taps. Playwright WebKit: click times out 3 of 3; tap gives `Page crashed` 3 of 3.

Every reading matches its spec.

**Not re-run here.** The HIGH browser gates that need their wave's own appendix app or a GPU:
- W-K.2 and W-K.3 (pass 1 re-ran them);
- W-F.6's layout counts;
- W-G.1 to W-G.5's GPU probes;
- W-H.1/H.2's D3 harness battery;
- W-I.1's D2 harness.

Their static halves were run above.

## Row 1 · families placed

`grep -oE '^#### F-[0-9]{2}' audit/REGISTRY.md` gives 85 ids. PLAN §3's family column names the same 85 (0 missing, 0 extra, by script).

### FB-01 · PLAN places F-54's dock-hallmark split in two waves

- **Where:** `PLAN.md:197` (W-I.1: "F-54 split (the dock hallmarks, #67)"); `PLAN.md:199` (W-I.6: "F-54 split (#67a, #67d, #90a, #90d; disease rows)"); `PLAN.md:55` (band I: "F-54 (dock-hallmark split)", once); `waves/INDEX.md` (W-I.1 lists F-16, F-17, F-18, F-71 and no F-54); `waves/W-I.1.md:10` ("The dock hallmarks (#67, #90) are W-I.6's").
- **Defect:** fix-2 moved the hallmarks to W-I.6 but left them in PLAN §3's W-I.1 row. The source of record now places the same split twice, and PLAN and INDEX disagree.
- **Evidence:** a per-wave diff of family sets, PLAN §3 against INDEX: W-I.1 is the only mismatch (`['F-16','F-17','F-18','F-54','F-71']` against `['F-16','F-17','F-18','F-71']`).

## Row 2 · gates exist and are RED at HEAD

Every one of the 99 specs has a §5 table with at least one gate row, and at least one RED reading (script).

### FB-02 · C2-G5 is GREEN at HEAD under the plan's own command convention

- **Where:** `waves/W-C.2.md:66`, `! grep -rq "DISSOLVE_DIALECTS\|dissolveDialect" src dist`, recorded **exit 1**.
- **Defect:** the folder's gates are written in table cells where `\|` renders as `|`. Of the 61 gates whose raw and rendered forms give different exits, 60 work only when rendered (their `\|` is a shell pipe; raw, they exit 2 or read the wrong thing). C2-G5 is the one that works only raw. Rendered, it is a basic-regex grep for the literal string `DISSOLVE_DIALECTS|dissolveDialect`, which matches nothing, so the gate exits 0 at HEAD while `DISSOLVE_DIALECTS` stands at `dissolveGrammar.ts:52,97`. An executor who transcribes the gates the way the other 60 need gets a green gate over a live defect.
- **Evidence:** in the worktree, the rendered form gives `0` and the raw form gives `1`. `grep -rn DISSOLVE_DIALECTS src` prints `:52` and `:97`.

### FB-03 · I5-G1's born-RED reading is mostly not the dock's defect

- **Where:** `waves/W-I.5.md:17,22,32,39` ("130 lines in `src` still name fission or Siri"; files touched `src/components/dock/**`; gate `! git grep -qniE 'fission\|siri\b' -- src`).
- **Defect:** the 130 lines span all of `src`. The dock facilities are already deleted: `dock/index.ts:105-111` records them as "DEFINITION-ABSENT (decided-terminal, clean break, no alias)". So the dock's residue is 12 comment lines, and the rest belong to two components the wave does not touch. One of those, DotRing, is a BUILD in W-B.8, and the blob's fission is W-G.5's greenfield physics. The gate cannot turn green within the wave's stated files. Turning it green removes the blob's published `fissioning?: boolean` (`blob/types.ts:44`) with no MIGRATION row (row 8).
- **Evidence:** `git grep -ciE 'fission|siri\b' -- src` by file:

  | area | files | lines |
  |---|---|---|
  | blob | 10 | 107 |
  | DotRing | `DotRing.vue` 1, `dot-ring.css` 8 | 9 |
  | dock | 5 | 12 |
  | tokens | 2 | 2 |
  | **total** | | **130** |

### FB-04 · Loop-wave gates whose executables W-C.1 deletes, with no edge ordering them

- **Where:**
  - `waves/W-C.1.md:43`: "A loop that has converged has no live tooling to move; its files go with step 3" (deleted); open loops move to `scripts/loops/<loop>/`.
  - `waves/W-J.1.md:164`: `H=scripts/loops/tile/harness`, falling back to the `docs/…/harness` path until W-C.1.
  - W-H.1, W-H.2 and W-I.1: `$H` at `docs/tranches/BL/design/{material,dock}/harness`.
  - `waves/W-I.6.md` I6-G3: `node docs/tranches/IOS27-MICRO/prototypes/spine-conductor/check.mjs`.
  - PLAN §5: W-J.1 depends on W-C.1. W-H.1, W-H.2, W-H.5, W-I.1 and W-I.6 have no path to or from W-C.1.
- **Defect:** a loop wave lands only after its loop converges, so the harness its gates run is, by W-C.1's own rule, the converged loop's tooling that W-C.1 deletes. W-J.1 lands after W-C.1 by edge. If D4 has converged by then, `scripts/loops/tile/harness` was never created and the docs path is gone. W-J.1's `$H` gates cannot run. W-H.1, W-H.2 and W-I.1 are unordered against W-C.1, so whether their gates can run depends on landing order. I6-G3 runs a script under `docs/`, which C1-G1 requires to be empty.
- **Evidence:** the lines cited; the PLAN §5 rows for W-J.1 (`…, W-C.1`) and for W-H.1, W-H.2 and W-I.1 (no W-C.1).

## Row 3 · vacuous gates

### FB-05 · Gates that read loop documents, not the tree (the FA-03 class)

- **Where:**
  - `W-B.10.md:36` B10-G1: `grep -c useAnisotropicExtent design/dock/REGISTRY.md`.
  - `W-B.15.md:40` B15-G1: `grep -c R56 design/dock/REGISTRY.md`.
  - `W-I.1.md:218` G24: `grep -c O-85 design/dock/REGISTRY.md`.
  - `W-B.3.md` B3-G4: `grep -q 'DESIGN.md §L' design/<d>/PORTFOLIO.md` for four loops.
- **Defect:** each turns green when the string appears anywhere in a loop document, whatever the loop said about it. "O-85: not carried" passes G24. None measures an enactment in the tree (PLAN §1). The executing wave cannot write `design/`, which the loops own.
- **Evidence:** each exits 1 at HEAD, and each would pass on a one-word mention.

### FB-06 · W-I.1 G17 fails open when its script is absent, and its script lands after it

- **Where:** `waves/W-I.1.md:215`, `! (node scripts/probes/band-I/hover-census.mjs . --list | grep -q 'src/components/dock/')`, recorded **exit 1** (6 rules). The script is `W-I.3.md` appendix A. PLAN §5 has W-I.3 depending on W-I.1.
- **Defect:** with the script missing, `node` errors, `grep -q` sees nothing, and the negation exits 0. The script is not in the tree at HEAD, and it lands with W-I.3, a dependant of W-I.1. So G17 is green at W-I.1's close whether or not the six unguarded dock hover rules stand.
- **Evidence:** in the worktree the gate exits `0`; `ls scripts/probes` → no such directory. No other gate in the folder negates a `node` call (`grep -nE '\`! *\(?node '` → 1 hit, this one).

### FB-07 · W-0.2 G3 cannot tell a token fallback from a literal one

- **Where:** `waves/W-0.2.md` §5 G3, `grep -nE "var\(--toggle-tint, *[^v]" src/components/toggle-group/styles.css` "prints nothing"; §3's cure template.
- **Defect:** ` *` matches zero spaces, and `[^v]` then matches the space. So every `var(--toggle-tint, …)` written with a space matches, token fallback included. The spec's own template fails G3: `var(--toggle-tint, transparent)` matches, and so does `var(--toggle-tint, var(--foreground))`. The gate turns red on any cure written in the house style, and says nothing about literal fallbacks.
- **Evidence:** the two template lines piped through the gate's grep: both print, exit 0 (a match, so the gate fails).

### FB-08 · K7-G13's bite cannot make the hold line red

- **Where:** `waves/W-K.7.md:76` (passes when "at most 1 running in any frame"; HEAD 0; bite: a planted keyframe beside the material's transition, "the max reads 2"). fix-2's probe (`formation-audit/fix-2.md:557`) tests `maxRunning === 1`.
- **Defect:** the probe observes 0 running animations on the trigger's `::before` at HEAD, so the material's own opacity transition is not seen as running. A single planted keyframe animation then reads 1, which passes "at most 1". The stated bite reading of 2 assumes the transition is observed, and the probe shows it is not. The spec's criterion (≤ 1) and the probe's (= 1) also disagree: the probe prints `pass: false` at HEAD while the spec records the hold.
- **Evidence:** re-run here, scene `dtrig`, Chromium, `reducedMotion: no-preference`: `maxRunning 0`, `seen []`, `pass false`, class `collapsed` → `expanded`.

### FB-09 · C1-G7 is vacuous by its own statement

- **Where:** `waves/W-C.1.md:70`, `test ! -e scripts/loops`: "passes at HEAD vacuously … Not counted as born RED".
- **Defect:** PLAN §1 admits two kinds of gate: born RED with its HEAD reading, or a hold line with a planted bite. C1-G7 is neither: it has no bite, and it passes while its subject does not exist.
- **Evidence:** exits 0 in the worktree.

## Row 4 · π and DELTA

Every spec has a §6. The specs with no visual change say so, or carry a byte-identity hold. The nine new specs name `.cache/evidence/<wave>/`.

### FB-10 · The band-E probe library writes captures to the session scratchpad (FA-08, remainder)

- **Where:** `waves/W-E.1.md:203` `export const CAP = '<scratchpad>/formation/band-E/cap'`. This is the `lib.mjs` that e1..e10 import (`W-E.2.md` appendix A: `import { …, CAP, … } from './lib.mjs'`, and every `--shots` DELTA writes under `${CAP}`). `W-F.2.md:340` and `W-G.1.md:151` default `CAP` to `../cap`. HEAD sets are cited in the scratchpad at `W-E.9.md:78`, `W-E.10.md:114` and `W-K.4.md:92`.
- **Defect:** PLAN §1 names one evidence root, `.cache/evidence/<wave>/`, and fix-2 states "`<scratch>/BL/evidence/` was replaced in every spec". The band-E DELTAs (the F-21 BLOCKER's among them) still land in a session directory, which pass 1 showed a restart wipes. W-L.8's cite check would not find them.
- **Evidence:** `grep -n "CAP *=" waves/W-*.md`. `ls .cache/evidence` in the checkout: no such directory (expected at formation). The session's `scratchpad/formation/band-E/cap/e10/` exists now and will not outlive the session.

## Row 5 · ledger rows

A script parsed 827 row lines (808 terminal rows plus the docket). BUILD and FOLD rows all name an existing wave. Every BANKED row names a re-trigger. No row reads UNPLACED. A literal search for each BUILD/FOLD row's id in its wave spec misses 98 rows. Most misses are abbreviations (`KFA-8` written `-8`) or composite ids. The defects below were read by hand.

### FB-11 · Rows that point at a wave that hands the subject elsewhere

- **Where / evidence:**
  - `LEDGER.md:120`, **#49c** BUILD **W-E.9**: "R11, the starved configurator (C-13c); W-E.9 §8". W-E.9 says the opposite at `:9` ("The configurator envelope (C-13c, R11, R4-02-07, the `:390` latch) is W-E.14's"), at `:18` and at `:89`. W-E.14 closes R11 (`W-E.14.md:73`).
  - `LEDGER.md:196`, **#82a** BUILD **W-H.2**: "G-F2 … W-H.2 §8". W-H.2 says at `:28` "#25, #82 G-F2 | the well: W-H.5's". W-H.5 closes #82's G-F2 (`W-H.5.md:70`).
  - `LEDGER.md:734,742`, **UIA-V-234** and **UIA-V-431** BUILD **W-H.2** "[N]". W-H.5 closes both (`W-H.5.md:20,70`), and W-H.2 also lists them (`:31`): two waves claim them, and the ledger names the one whose subject moved.
- **Defect:** fix-2 moved the disease subjects into their own waves and left these four rows on the shared waves they left.

### FB-12 · Hand-offs no receiver carries

- **Where / evidence:**
  - **`useAnisotropicExtent`** (#46b, and #67c "handed to loop D2", `LEDGER.md:112,173`). `grep -l useAnisotropicExtent waves/*.md design/dock/REGISTRY.md` returns only `W-B.10.md` and `INDEX.md`. It is not in W-I.1, W-I.4, W-I.5, W-I.6 or W-I.7, and not in PLAN §4's list of D2 obligations.
  - **O-76's fallback.** `W-0.2.md:93`: if D3 has not converged or G1 stays red, "the wave's terminal state in this band is 'rides W-H.1 at 11.0.0 under G1 and G2'". `grep -n "O-76\|toggle-tint" waves/W-H.1.md` → 0.
- **Defect:** PLAN §1: "A hand-off the receiver does not carry is a defect of the receiver". #67c's ledger row points at a wave whose whole act is the hand-off.

### FB-13 · W-E.7 rows with no gate that reaches them

- **Where:** `LEDGER.md:951-968` (the `[G]` rows placed on W-E.7 "F-29 mechanism; joins the wave's born-RED set"), `LEDGER.md:473` (O-74 E-5 BUILD W-E.7), and `waves/W-E.7.md` §5.
- **Defect:** the sampled rows are placed as BUILD on W-E.7, but none of E7-G1 to E7-G16 measures them:
  - **The micro floor.** A2-KE-L2-14, A2-FO-L2-18 and O-74 E-5 (value.js's 11 px `text-micro` joining the micro floor) have no micro-floor gate. W-E.7 also retires UIA-KF-147, the row A2-KE-L2-14 cites, as NOT-REPRODUCED (`W-E.7.md:97`).
  - **The segmented strip's coarse floor.** A2-FO-L2-6 ("the strip's buttons have no coarse floor") is not measured: E7-G7 reads the compact dock seat and the slider thumb only.
  - **SegmentedTabs overflow.** A2-FO-L2-14 is placed on W-E.7, but W-E.7 hands overflow to E9-G5 (`W-E.7.md:36,99`).

  This is FA-11's defect under the `[G]` tag.
- **Evidence:** `grep -nE "micro|text-micro|control-target|strip" waves/W-E.7.md` finds no gate row for any of them.

## Row 6 · loop pre-emption

### FB-14 · O-84 and O-84a pre-empt D2 against the owner's ratification

- **Where:** `PLAN.md:37` ("The owner ratified this on 2026-09-25 (`FORMATION-PROGRESS.md:79`, IN:37-39)"); `waves/W-0.8.md`; `FORMATION-PROGRESS.md:78-79`; `audit/INBOUND.md:38-39`.
- **Defect:** the owner's ratification is line 78, 16:28. It ratified "O-83 DOCK-CAP-ELLIPSE and O-77a … join band 0 (10.2.0) …; O-84 DOCK-SUMMARY-SQUARE + O-84a METRIC-TOKEN-JOIN fold into D2 with O-65 (not 10.2.0)". Line 79 (16:3x) is a re-ruling by the value.js session "under the owner ratify grant", which moves O-84 and O-84a into band 0. That is a sibling session's judgement reversing what the owner ratified, not an owner word. Only O-83's third of W-0.8 is an owner-ratified exception. The summary's square lock and the metric token are D2 subjects (O-65's collapsed form, DOCKET-Q-10), and W-0.8 builds them in 10.2.0 ahead of D2. PLAN §1 records the exception with a cite to line 79.
- **Evidence:** `grep -n "OWNER RATIFIED\|O-84b" FORMATION-PROGRESS.md` → lines 78 and 79 as quoted.

### FB-15 · W-0.7 G5 pins a D3 mechanism

- **Where:** `waves/W-0.7.md:86` G5: in the 10.2.0 tarball, "`--glass-veil-ink: oklch(0.28 0.035 70)` = 0 (the old light ink is gone)". `waves/W-0.1.md` §3 "minor-lawful": no token removed or renamed in 10.2.0. `design/material/PORTFOLIO.md:273,287`.
- **Defect:** whether the light veil is cured by a new ink value or by a new pole with the ink axis deleted is D3's choice. D3-A paints toward `--glass-veil-pole: var(--card)` and "Deletes … the ink axis", and D3-B takes the same pole. Under such a route, the minor must keep `--glass-veil-ink` declared (a removal is not minor-lawful), and it may keep today's value. Then G5 fails a correct 10.2.0. W-0.7 is not a loop wave, and its gate decides the mechanism ahead of D3.
- **Evidence:** the lines cited.

### FA-17 · still open

D5 has no portfolio, and `design/` holds four loops. PLAN §6 and LEDGER `PLAN-§6-D5` record opening it as a formation act owed. W-J.2 (#27, #77a, D-2, GAP-2) waits on a gate no loop can meet.

## Row 7 · the DAG

PLAN §5, parsed with W-L.6's "every wave of bands C to K" expanded: 99 rows, one per spec, 0 cycles, 0 dangling ids, 0 edges into a later band. No spec's `depends on` field restates an edge. Band 0 edges: W-0.1 on the D3 gate; W-0.2 on the D3 gate and W-0.1; W-0.5 on W-0.1 and W-0.2; W-0.7 on the other nine; W-0.9 on OW-12; the rest on nothing.

### FB-16 · Band 0 depends on an owner answer the plan schedules inside its own cut

- **Where:** `PLAN.md:277` (W-0.9 | OW-12 (owner, the token name)); `PLAN.md:275` (W-0.7 depends on W-0.9); `PLAN.md:381` ("W-0.9 ships the name the owner gives at the 10.2.0 confirmation"); `waves/W-0.7.md` G9 (the confirmation is W-0.7's gate); `waves/W-0.9.md` G4 (RED while OW-12 is pending); `LEDGER.md` §4 ("10.2.0 ships (a)'s name until then").
- **Defect:** the invariant allows band 0 one external dependency, D3 for the veil rows. W-0.9 adds a second, OW-12, and it blocks W-0.7. The plan expects that answer at W-0.7's own confirmation step, so W-0.7 waits on W-0.9, which waits on an act inside W-0.7. The ledger's line that 10.2.0 ships the seat's name meanwhile contradicts W-0.9 G4, which holds the wave red until the owner answers.
- **Evidence:** the lines cited.

## Row 8 · breaks and aliases

The nine new specs' §7 were read. W-E.14, W-H.5, W-K.11 and W-G.7 name each removal with its successor. W-0.8, W-0.9 and W-0.10 are additive in 10.2.0. No alias was found.

### FB-17 · OW-12's option (b) is an 11.0.0 break no wave owns

- **Where:** `waves/W-0.9.md:47,66`; `LEDGER.md` §4 (OW-12's options (a) and (b)).
- **Defect:** under option (b), 10.2.0 ships the seat's name, and 11.0.0 renames the display rung and moves the card rung onto `--type-title`. Two published tokens change in 11.0.0:
  - the display rung's name (for slides, speedtest and keyframes.js);
  - the 10.2.0 card-title name, which goes.

  W-0.9 §7 names only the first, as "an 11.0.0 MIGRATION row (W-L.7's packets name its readers)". No 11.0.0 wave carries either rename. `grep -ln "type-title\|type-card-title\|OW-12" waves/*.md PLAN.md` returns `INDEX.md`, `W-0.7.md`, `W-0.9.md` and `PLAN.md`, so no band-L spec. FB-03's gate would also remove the blob's published `fissioning?` type with no row.
- **Evidence:** the grep above.

## Row 9 · re-booked chronics

No row is re-booked to a later tranche. The 8 BANKED rows carry re-triggers, and none is a chronic.

### FB-18 · Disease rows whose enacting gate belongs to a shared wave

- **Where:**
  - **#45** (DISEASE, `LEDGER.md:110`), W-B.9. B9-G1 and B9-G2 are "built in W-G.1"; `W-B.9.md` §5 note: they are "bound into W-G.1's acceptance". W-B.9 §4 lists no file.
  - **#78** (DISEASE, `LEDGER.md:190`), W-B.11. B11-G2 is "built in W-C.3" and B11-G3 "built in W-C.1". §4 lists no file.
  - **#64b** (DISEASE, `LEDGER.md:163`), W-B.12. B12-G2 needs W-A.2's `roster.json`, and B12-G3 is "built in W-C.2". §4 lists no file.
  - **C-8** (DISEASE, `LEDGER.md:229`), W-I.7. I7-G4 is "W-I.1 G7's edge rows". W-I.1 G7 (`W-I.1.md:205`) needs 18/18 including those rows, and W-I.1 lands before W-I.7 (PLAN §5: W-I.7 depends on W-I.1).
- **Defect:** PLAN §1: "the ruling and the gate that enacts it are the own wave's", and pass 1's FA-21 named C-8's two-wave span. In each of these four, the own wave's gates cannot go green on its own act: they go green only when a shared wave lands. For C-8 the span now runs the other way: W-I.1 cannot close G7 without building C-8's cure first, which pre-empts W-I.7.
- **Evidence:** the lines cited. The `## 4 · Files it touches` headings of W-B.9, W-B.11 and W-B.12 are empty.

## Notes outside the checklist (not counted)

- **Docket gates.** `! grep -qE '^\| OW-n \|.*\| pending \|' LEDGER.md` turns green on any edit of the word `pending`, owner quote or not. PLAN §1 allows the form, while also saying "No gate re-reads the ledger for a terminal word".
- **O-86 in PLAN.** INDEX's W-L.1 row names O-86, and W-L.1 §3.20 owns it. PLAN §3's W-L.1 row and PLAN §7's band L row do not.
- **Group tags.** Three W-E.1 rows (`A2-FO-L2-2`, `A2-VA-L2-12`, `A2-KE-L2-15`) are tagged `[N]`, but W-E.1 names them only as "O-74's F-85 rows" (`[G]`).
- **H5-G3** hard-codes the retirement of `--input-on-glass`, a D3 outcome, inside a loop D3 wave. W-H.5's MIGRATION row names D3-A's tokens as the successor before D3 converges.
- **Band-0 rulings.** `FORMATION-PROGRESS.md:80` records O-74b and O-86 as ruled on 2026-09-25 without naming an owner word. Neither is a loop subject, so this is outside row 6.
- **P-1.** The 42 older specs pass 1 listed still carry no gestalt-pass section. fix-2 treats this as an execution-time duty.
- **Critical path.** Unchanged: W-A.1 depends on W-0.7, so most of the major waits on D3 through the 10.2.0 cut.
- **Fence.** This seat read `design/` and did not write it. The probe builds sat in this seat's scratchpad, outside the checkout.
