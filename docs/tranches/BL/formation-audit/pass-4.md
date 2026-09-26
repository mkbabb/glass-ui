# BL — formation audit, pass 4

| field | value |
|---|---|
| seat | formation critic, pass 4. Authored none of `PLAN.md`, `waves/`, `LEDGER.md`, passes 1-3 or fixes 2-4 |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `55e35700` (fix 4's commit) for every probe. HEAD moved to `43093f45` during the audit through two loop commits (`2b458106` D4, `43093f45` D5 round 0). `git diff --stat 55e35700 HEAD -- docs/tranches/BL ':!docs/tranches/BL/design' src` shows only `FORMATION-PROGRESS.md` (+2 lines). `git diff --stat v10.1.0 HEAD -- src` is empty, so `src` is the published 10.1.0 |
| inputs read | `PLAN.md` in full; `waves/INDEX.md` by script; `LEDGER.md` by script plus the rows each finding cites; `audit/REGISTRY.md` (family headers and severities); `audit/INBOUND.md`; `formation-audit/pass-3.md`; the fix-4 diff (`git diff 715912fa 55e35700 -- docs/tranches/BL`); §3-§8 of W-B.9, W-B.12, W-C.2, W-D.1, W-D.2, W-E.2, W-E.6, W-E.7, W-G.3, W-G.4, W-H.5, W-I.1, W-I.5, W-L.1; §5 of all 99 specs by script; `design/material/REGISTRY.md` and `design/engagement/REGISTRY.md` (read only); `formation-audit/fix-4.md` last |
| where probes ran | a worktree at `55e35700` (`scratchpad/formation/crit-4/wt`, `node_modules` and `tests-visual/node_modules` symlinked, `npm run build` exit 0), removed before return. Browser probes: fix-2's appendix P app rebuilt against the worktree; two scenes of this seat's own (a moving Popover anchor, a Sheet in a Dialog). Chromium is Playwright's. Playwright WebKit is not Safari, and every real-Safari cell is UNMEASURED (OW-3). Load average 38-50 during the runs |
| fences | no source edit; no git write except the worktree add and remove; nothing under `design/` written; the one write in the checkout is this file |

The checklist has nine fixed rows, and each finding names its row. Notes at the end are outside the checklist and do not count.

## Result

| row | check | result |
|---|---|---|
| 1 | all 85 families placed exactly once | PASS |
| 2 | every spec has a gate; every gate RED at HEAD | FAIL (FD-01) |
| 3 | no vacuous gate | PASS |
| 4 | every visual claim carries π/DELTA | PASS |
| 5 | every ledger row terminal, pointing at a wave that covers it | PASS |
| 6 | no loop wave pre-empts its loop, except owner-ratified and recorded exceptions | FAIL (FD-02) |
| 7 | DAG acyclic, one source, band 0 external only on D3 | FAIL (FD-03) |
| 8 | every break has a MIGRATION row, no alias | PASS |
| 9 | no re-booked chronic | PASS |

**clean = false.** 3 new findings. Of pass 3's 11 findings, all 11 are cured on disk. FA-17 is cured by the D5 round-0 commit `43093f45`.

## Pass 3, re-verified

| id | verdict | reading here |
|---|---|---|
| FC-01 | cured | `W-C.2.md:66` reads `npm run build && ! grep -rq -e DISSOLVE_DIALECTS -e dissolveDialect src dist`. It exits **1** in the worktree, and the raw and rendered forms are one command |
| FC-02 | cured | B2-G2 is struck (`W-B.2.md:107`). B2-G6 (`verify-inbound.mjs`) exits 1 at HEAD and is the one gate on sender keys |
| FC-03 | cured | PLAN §1 "Gate paths and the base re-run" (`PLAN.md:29`) and W-D.1 §3 step 11 (`W-D.1.md:78`) are on disk. W-D.2's own moves are outside that path map (see notes), but no gate on a W-D.2-moved path was found |
| FC-04 | cured | B12-G2 now reads `#64b` in the `law` field of G-13, G-42 and G-01. It exits 1 at HEAD, and it stays red at W-B.12's base because W-A.2's roster names no entry with `#64b` (W-A.2 §3 table, read here). The E-10 detector's `row-ref` class needs a two-letter prefix (`W-C.2.md` appendix A), so the bare `#64b` does not collide with C2-G1 |
| FC-05 | cured | G27 and G29 are written for Q-10 (b), and each is "retired with D2's ruling" under (a) (`W-I.1.md:229,231`). O-84 is FOLD (`LEDGER.md:482`). Probe readings are unchanged: `overrunPx 28`, `aspect "1 / 1"` |
| FC-06 | cured | H5-G2 is `! grep -nE 'backdrop-filter' src/components/_shared/field/control.css`. It exits **1** with hits at `:76`, `:104` and `:138`, which agrees with FL-11 (`design/material/REGISTRY.md:323`) |
| FC-07 | cured | §5 edges are on "W-0.2's band-0 terminal" (`PLAN.md:274,276`). This seat's walk of §5 finds 99 rows, 0 dangling ids, 0 edges into a later band and 0 cycles. Band-0 rows name no wave outside band 0 |
| FC-08 | cured | W-B.9 retires `drawOverlay` with a MIGRATION row (`W-B.9.md` §7). B9-G3 exits **1**: 42 lines in 8 files (`git grep -c drawOverlay -- src demo tests`). The successor is real: `Constellation.vue:93` `defineExpose(expose)`, and `useConstellation.ts:462-464` returns `field` and `isFrozen` |
| FC-09 | cured | The W-I.1 §7 row removes `--dock-plate-cross-px`. G11 has the arm and exits **1** with 38 lines. `dockMorphMeasure.ts` sits under `src/components/dock`, inside G11's pathspec |
| FC-10 | cured | W-E.7 §6 names the Q1 scene and the micro floor's own pair, with E7-G17's `font-size` as its π (`W-E.7.md:117,120`). Q1 exists at `fix-3.md:245` |
| FC-11 | cured | W-G.1's families field, MIGRATION table, feature pass and appendix now route every constellation item to W-B.9 (`grep -n -i constellation waves/W-G.1.md`) |
| FA-17 | cured (at `43093f45`) | `design/engagement/PORTFOLIO.md` and `REGISTRY.md` are on disk: five families A-E and a round-0 battery E-1..E-8, with seven rows RED at HEAD and planted PASSes (`design/engagement/REGISTRY.md` §0 item 2). PLAN §6 still says no portfolio is on disk (notes) |

## Gates re-run at `55e35700`

**Static gates, all 99 specs.** Every backticked command in a §5 gate column was extracted (343 spans, rendered form) and run in the worktree with the library built. 88 were skipped: `$H` harness calls, Playwright runs, `npm view`/`npm pack`, placeholders and fragments. Of the 255 that ran, nonzero exits by band out of those run: 0 11/18, A 45/47, B 27/30, C 20/21, D 9/9, E 28/32, F 2/2, G 18/19, H 11/11, I 25/26, J 4/7, K 10/10, L 20/23. Every zero exit falls into one of five kinds:
- a declared hold line (W-0.1 G5, W-0.3 G6, W-0.4 G6, W-0.6 G5, W-0.10 G3, W-B.10 G3, W-B.15 G3, W-G.2 G4, W-J.2 G6);
- a latch file run before its `it.fails` → `it` conversion (W-E.8, W-E.9, W-E.10, W-E.14, W-I.1 G12, W-J.1 G14, W-J.2 G1);
- one half of a two-part gate whose other half is red (G-L4-5: the `grep` half exits 1);
- a command that needs its plant, pin or edit applied first (A5-G7, B8-G5, G-L6-2);
- a count whose pass condition is a value (C4-G7 20, G-L5-4 `4.0.0`). Nine exits of 2 are spans cut by an inner backtick or reading a file absent at HEAD. None is a negated gate that passes.

**BLOCKER families.**
- F-01 (W-A.2): 45 of the 47 band-A spans that ran exit nonzero. The two zeros are A1-G11's `wc -l`, which reads 0 before any Playwright run, and A5-G7's suite run without its planted export. That gate is RED because the plant survives (`W-A.5.md:60`).
- F-68 (W-0.7, W-L.7, W-L.8): the W-0.7, G-L7 and G-L8 static spans that ran exit 1.
- F-21 (W-E.2): E2-G1 read with this seat's own scene (`Dialog` + `SheetContent`, Chromium, 390×844 and 1440×900, bottom and right). All 4 cells read `position: relative` with `24px` on all four corners: **FAIL 4 of 4**.

**Browser gates through fix-2's appendix P**, rebuilt against the worktree, Chromium:
- W-0.8 G1: FAIL 4 of 7 (`160.0x28.0` and `32.0x130.0` used corners at the run's ends).
- W-I.1 G27: `overrunPx 28`, `aspect "1 / 1"`.
- W-I.1 G28: ink gaps 30.83, 18.89, 6.95 against 5.45.
- W-0.3 G1: FAIL 7 of 9.
- W-E.7 G10: FAIL. W-E.7 G12-G16 FAIL as the spec records: overrun 316.7 and 269.3, separator gap 8 and 8, sm heights 44 against 54.
- K7-G13 hold: `maxRunning 0`, `seen []`.

Playwright WebKit crashed on the dock scene (`page.goto: Page crashed`), which is the crash the specs record. Not re-run: the HIGH browser gates that need their wave's own app, a GPU or a loop harness (W-F.*, W-G.1-W-G.5, the `$H` calls of W-H.1/H.2/I.1/J.1). Their static halves ran above.

## Row 1 · families placed

No finding. PLAN §3 places 85 families and matches the registry's 85 headers (0 missing, 0 extra), and INDEX matches PLAN on 99 of 99 waves (script). The whole-plus-split pairs (F-16, F-21, F-33) name their splits.

## Row 2 · gates exist and are RED at HEAD

Every spec has at least one unstruck §5 row with a RED reading, except as below.

### FD-01 · G-L1-7, #76b's only gate, passes at HEAD, and the live defect has no gate

- **Where:**
  - `waves/W-L.1.md:193`, G-L1-7: "B3 extended: move the virtual anchor to (300, 200) and call the content's `update` path (a `reference` swap); the content re-seats within 40 px of the new point". HEAD reading: "the static arm passes at HEAD …; the move arm is written with the wave".
  - `W-L.1.md:117` (§3.6), which names G-L1-7 as the gate.
  - `LEDGER.md:184`: #76b BUILD W-L.1, "the canvas-anchored overlay's moving anchor (G-L1-7, W-L.1 §3.6)".
- **Defect:**
  - The move arm has no HEAD reading. Measured at HEAD, it is green: a `reference` swap already re-seats the content through the untyped fallthrough to reka's `PopperContent`. So #76b's BUILD enters W-L.1 with no born-RED.
  - The defect that is live is a different one. An anchor moved in place keeps its reference object while its rect changes, as a canvas node does frame to frame, and the content does not follow. No gate reads that case.
- **Evidence** (this seat's scene: `<Popover :default-open>` with `<PopoverContent :reference side="bottom">`, Chromium 1440×900, built against the worktree):
  - rest: content top 414, centre x 705;
  - reference swapped to a new object at (300, 200): top **214**, cx **305**, within 40 px, so G-L1-7 passes;
  - the same object's rect moved to (900, 600): top 414, cx 705, unchanged;
  - after one `window.scrollBy(0, 1)`: top 614, cx 905.
  - The probe is `scratchpad/formation/crit-4/probe/{App.vue,anchor.mjs}`.

## Row 3 · vacuous gates

No finding. FD-01's gate also passes before the build, and it is counted once, on row 2. The fix-4 gates bite:
- B9-G3 goes red on any `drawOverlay` line under `src`, `demo` or `tests`;
- H5-G2 exits 0 only on a filter-free file (fix-4's fixture);
- B12-G2 goes red when `#64b` is dropped from one `law`;
- C2-G5 builds before it greps.

## Row 4 · π and DELTA

No finding. Fix-4's paint changes carry pairs:
- W-B.9 §6: the focal skin before and after;
- W-H.5 §6: the well over stripes, black and white;
- W-E.7 §6: the micro span.

The specs whose §6 reads "none" (W-A.5, W-B.1, W-B.3, W-B.7, W-B.11, W-B.12, W-B.13, W-B.14, W-C.1, W-C.2, W-C.3, W-I.5 under (a), W-L.5) change no paint, or prove it with a sha hold (C2-G8, D2-G5).

## Row 5 · ledger rows

No finding.
- **Terminals.** A script over every `LEDGER.md` table reads BUILD 496, FOLD 139, RETIRE 185 and BANKED 8. Taking out §4's docket rows (BUILD 3, FOLD 12, RETIRE 4) and the §9 header cell leaves BUILD 492, FOLD 127, BANKED 8 and RETIRE 181, which is the §9 total at `LEDGER.md:533` (808 rows).
- **Waves.** Every BUILD and FOLD row names an existing wave, and no row reads UNPLACED.
- **Re-triggers.** Every BANKED row carries one.
- **Receivers.** 76 BUILD/FOLD rows are named in their receiver by content, not by row id. Spot-checked here: #49f by `L03b-06`, #67b by "hallmark 6", #20, #82b and #85b by their W-C.4 §1 items. The fix-4 rows are all named in their receivers: #45b, #56d, #64b, #82a and O-84.

## Row 6 · loop pre-emption

The W-0.8 exception is recorded (`PLAN.md:38`) and ratified (`FORMATION-PROGRESS.md:78`).

### FD-02 · W-E.2 and W-E.6 route state fills onto the plate token, which D3's floor FL-6 rules out

- **Where:**
  - PLAN §3 W-E.2 (`PLAN.md:146`: "a state fill writes the plate token").
  - `waves/W-E.2.md:63` (§3 item 4: "ToggleGroup's on and hover states set the `.control-surface` plate token (`--control-surface-bg` …) instead of `background-color`. The same sweep covers every `[data-state=on|checked|active]` rule …").
  - `W-E.2.md:107` (the MIGRATION row that tells consumers to set `--control-surface-bg` on the state selector).
  - `waves/W-E.6.md:61` (§3 item 4: "The selected state writes the plate token from W-E.2 §3.4 with the accent band").
  - Against: `design/material/REGISTRY.md:318`, FL-6: "**No state fill or dim reads a plate token.** Hover, active, selected, checked, menu rows, the segmented track, the capsule track and the layer switcher read the one-ink fill register". FL-6 is a floor row that every route builds (`:519`, "A, C → FL-6"). It landed at `020f6586`, before fix 3 and fix 4.
- **Defect:**
  - Band E lands before band H, so two surface waves fix the state-fill mechanism before D3's waves build it, and they fix it the opposite way from D3's floor.
  - W-H.1 (F-23: "state, value and emphasis separate") would then undo W-E.2's sweep and W-E.6's selected fill, and W-E.2's MIGRATION row would point consumers at a token the same major reroutes.
  - The ink fill register FL-6 names already ships: `git grep -c -- '--fill-selected\|--fill-hover' -- src` lists `button/styles.css` 5, `card/styles.css` 5 and `configurator/styles.css` 3.
  - `grep -rn "FL-6\|fill register" PLAN.md waves/ LEDGER.md` finds nothing, so the plan never takes the floor row in. This is the class of pass 3's FC-06, where a non-loop gate or cure contradicted a D3 floor row.
- **Evidence:** the lines cited. E2-G3 (ΔE(on, off) ≥ 0.02) is neutral between the two mechanisms. The conflict is in the cure text, the PLAN scope line and the MIGRATION row.

## Row 7 · the DAG

This seat's walk of PLAN §5 found:
- 99 rows, one per spec;
- 0 cycles and 0 dangling ids;
- 0 edges into a later band;
- no band-0 row that names a wave outside band 0 (the only external names are the D3 gate, on W-0.1 and W-0.2).

### FD-03 · Within-band dependencies the specs state that §5 does not carry

- **Where** (each pair is unordered in §5 by transitive closure, checked by script):
  - **W-E.7 → W-E.2.**
    - `W-E.7.md` §3 item 6: "W-E.2 §3.6's coarse `::after` hit area of `max(100%, var(--touch-target))` applies to the slider thumb …, to compact dock seats, and to the SegmentedTabs strip's buttons". E7-G7 and E7-G18 read that hit area.
    - §3 item 2: "Dialog (`r` 24 after W-E.2) pads 20".
    - §5 gives W-E.7 only W-0.3 and W-A.3 (`PLAN.md:314`).
    - W-E.10 inherits the same gap: its §3 relies on "the coarse hit area, not a larger box (W-E.2 §3.6)", and it reaches W-E.2 through nothing.
  - **W-E.6 → W-E.2.** `W-E.6.md:61`: "writes the plate token from W-E.2 §3.4". §5 gives W-E.6 W-A.3 and W-B.7 (`PLAN.md:313`).
  - **W-G.4 → W-G.3.**
    - `W-G.4.md:121` (§8 "Dependencies"): "W-G.3 supplies the clock the field runs on". It also names W-G.7.
    - Both waves edit `aurora/composables/{frameLoop,useCursorInteraction,runtime}.ts` (`W-G.3.md` §4, `W-G.4.md:70`).
    - §5 gives W-G.4 W-G.1 and W-B.5 (`PLAN.md:332`), and W-G.3 depends only on W-G.1.
    - W-G.4 §8 also restates its edges beside §5, which `PLAN.md:266` says a spec does not do.
  - **W-F.2 ↔ W-F.3.**
    - `W-F.2.md:72` (§3 item 7) seats the release spring with "the finger's [velocity] … as W-F.3 windows it".
    - `W-F.3.md:47` (§3 item 5) says "W-F.2's fresh spring is seated with this velocity".
    - W-F.3's probe imports W-F.2's appendix D and E libraries (`W-F.3.md:93`).
    - Neither wave depends on the other in §5 (`PLAN.md:323-324`).
- **Defect:** PLAN §5 is "the one record of edges" (`PLAN.md:266`). Band order puts bands in sequence, but it does not order waves inside a band. Each pair above can land in either order under §5, though the specs say one builds on the other.
  - If W-E.7 or W-E.10 lands before W-E.2, it must build W-E.2's hit-area mechanism itself or ship its hit-area gates red. Either way two waves carry one mechanism.
  - If W-G.4 lands first, W-G.3's `frameInterval` edits land on a greenfield file set W-G.4 has already replaced.
  - W-F.2 and W-F.3 each hold half of one release path, and no record says which half lands first.
- **Evidence:** the lines cited; the closure script is `scratchpad/formation/crit-4` (the §5 parse, walked in both directions).

## Row 8 · breaks and aliases

No finding.
- `drawOverlay` (W-B.9 §7), `--dock-plate-cross-px` (W-I.1 §7) and `backgroundCanvas` (W-G.3 §7) each have a MIGRATION row and no alias.
- W-I.5's fission and Siri sweep removes comments only: `dock/index.ts:105-111` states the surface is already absent, and `git grep -niE 'fission|siri([^a-z]|$)' -- src/components/dock` lists comment lines only.

## Row 9 · re-booked chronics

No finding. No row is re-booked to a later tranche: a grep of LEDGER, PLAN and waves for later-tranche carries (`BM`, "next tranche", "after BL", `12.0.0`) finds only rows that say they are not re-booked. The 8 BANKED rows carry re-triggers and none is a DISEASE row. #64b's own wave now enacts its ruling (FC-04).

## Notes outside the checklist (not counted)

- **PLAN §6 is stale on D5.**
  - `PLAN.md:383` still says "no portfolio is on disk yet and the act stays owed (fix-4)".
  - `design/engagement/` landed at `43093f45`.
  - `PLAN.md:252` §4 describes D5's battery as starting from `engage-ladder.test.ts:134` and D4's T-6. D5's registry now names E-1..E-8.
- **W-D.2 moves files outside the path map.** 40 demo moves, `index.html`, six `vite.*.ts` modules and the renamed demo config (`W-D.2.md` §3 items 1, 2 and 9). PLAN §1's path map is W-D.1's ledger alone. No negated gate on a W-D.2-moved path was found. W-E.10's `! test -e demo/stories/substrates/aurora/PresetPickerRow.vue` names a file D1's kit does not move.
- **W-G.3 and D3's FL-1.** FL-1 deletes the sampler in every route (`design/material/REGISTRY.md:313`). W-G.3 still rewrites it and routes its successor through "D3-B", which D3 pass 1 banked. W-G.3's cure is a subset of FL-1 (it removes the readback and deletes the prop), so this is not counted on row 6. Pass 3 noted the same premise gap.
- **Hold lines with no stated bite.** W-0.10 G3, W-0.3 G6, W-0.6 G5, W-0.4 G6 and W-0.1 G6/G7 are labelled hold lines. Their bites are implicit (a suite or a grep that reddens on the regression), not stated as PLAN §1 asks.
- **Unlabelled sub-splits in spec headers.**
  - W-B.9 takes R2-06-04's constellation-and-fourier decision (an F-48 member), and PLAN §3 lists F-48 only under W-G.4 and W-G.5.
  - W-D.2 claims "L14-01's execution" under F-55, which PLAN places in W-D.1.
  - Neither leaves a family unplaced.
- **O-66 §1 after FL-11.** W-H.5 removes the field's `backdrop-filter`. `.control-surface` (the SelectTrigger) keeps its own (`glass/control-surfaces.css:81`), so W-0.1's "one field surface" witness has to be re-read after W-H.5. Both are D3 waves, so this is D3's to keep true.
- **Fence.** This seat read `design/` and did not write it. The probes, the extracted gate list and the results are in this seat's scratchpad, outside the checkout.
