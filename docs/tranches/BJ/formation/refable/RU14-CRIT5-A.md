# RU-14 CRIT5-A — ring round 5, seat A (F01-F30): fresh adversarial critique

- **Unit:** RU-14, ring round 5, seat A. Scope: `redress/DOSSIER-F01-F10.md`,
  `DOSSIER-F11-F20.md`, `DOSSIER-F21-F30.md` + sidecars
  `refable/REFABLE-RU-13-{F01-F10,F11-F20,F21-F30}.md`, as amended by the R5 fix seat
  (`RU14-FIXLOG-R5.md`); ring history `RU14-CRIT1-A/B`, `RU14-CRIT2-A/B`, `RU14-CRIT3-A/B`,
  `RU14-CRIT4-A/B` read from disk.
- **modelId:** `claude-fable-5` (verbatim from this seat's system context).
- **Verification base:** HEAD `7aec864d` (master). The nine-band layer is byte-identical to the
  CRIT4/R5 base (`git diff --stat 66294838..HEAD -- docs/tranches/BJ/waves/` = EMPTY; worktree
  clean under `waves/`). `src/`+`demo/` parity holds (`git diff --stat 55f5170d..HEAD -- src/
  demo/` = EMPTY) — the paint tree is byte-identical to every prior pass. The R5 corpus edits
  live UNCOMMITTED on the working tree (the six dossiers + six sidecars all `M`;
  `RU14-FIXLOG-R5.md` untracked) — this pass judges the on-disk bytes, and the un-banked state
  is noted for the lead's ring journaling, not charged as a corpus defect.
- **Method:** fresh assume-wrong pass; I authored none of the corpus and none of the ring
  history. **~160 anchors re-verified at current HEAD**: ≈60 `waves/` pins (BAND-REDUCTION
  `:237`/`:416`/`:452-456`/`:508`/`:517-518`/`:527`/`:638-648` + "F04 shape" grep-0;
  BAND-FEEDBACK-MOTION ×17 incl. `:40`/`:53`/`:66`/`:82`/`:91`/`:102`/`:119`/`:126`/`:134`/
  `:141`/`:158-162`/`:165`/`:189`/`:241`/`:250-251`/`:260-261`/`:318`; BAND-MATERIAL ×22 incl.
  `:29`/`:55`/`:117-119`/`:131`/`:135`/`:146-149`/`:170`/`:175`/`:203`/`:212`/`:270`/`:301`/
  `:336`/`:460`/`:474`/`:488-490`/`:503-510`/`:590-591`/`:666`/`:788`/`:793`/`:822-824` +
  value-mark grep = 9; BAND-GATES `:376-381`; BAND-DOC-TRUTH `:94`/`:133-134`; BAND-STORY
  `:242`/`:254`/`:304`/`:321`/`:323`/`:462`/`:506`/`:527`/`:529`/`:637`); ≈30 formation pins
  (REGISTRY `:175`/`:236-238`/`:291-299`/`:322-329`; PLAN `:187`/`:195`; crosswalk `:227-229` +
  RU-06 grep-0 + last-commit `aded259b`; JUDGE `:94` + F13 grep-0; APPLYLOG F13 grep-0;
  SUPERFLUITY `:227`/`:668`/`:674`/`:682-686`; FSF `:274-280`/`:385-391`/`:398`/`:434`/
  `:550-554`; LEAD-AMENDMENT-LEDGER rows C3/C5/D1/E1/E2; GF-DOCK `:104-111`/`:204-211`/
  `:225-226`/`:319`/`:357` + rail.vue grep-0 + commit-stability at `117b7f12`; GF-AURORA
  `:237`/`:315`/`:461` + Q-AURORA-QUARTET; IOS27-CODEX `:28`; ASK-REDUCTION commit-stability at
  `4ab12128`); ≈70 src/demo pins (the full F17 chain `search.vue:504`/`searchVariants.ts:10`/
  `components.css:12-16`/floating-chrome grep-0; the F24 chain `Skeleton.vue:54`/
  `scheme-motion.css:107`=5s/`literals.css:23-35` verbatim; the F22/F21 chains
  `progress.vue:22-32`/`Progress.vue:157-158`/rim `styles.css:14-24,:37-46`/
  `ScrollProgressRim.vue:43-91`; the F27 pair `overflow.css:63-66` false-comment verbatim +
  `useSelectionGroup.ts:183-186`; the F28 statics `button/styles.css:40-50`/`Button.vue:35`/
  `StoryPlayButton.vue:34`; rail.vue `:69`/`:108-121`/`:142-157` + one-`<Aurora>` count;
  `useDockShellProps.ts:53`; `Card.vue:33,:39`; layers.vue `:279`/`:303`/`:329-337`;
  `manifest.ts:932`; AppShell `:11`/`:26-28`/`:138-160`/`:201-203`; `router.ts:115-130`;
  `applyMedium` WGSL `:387-403` + both preset rosters (17; `:73-78` verbatim); the full F16
  facade set (GlassTimeline `:2-4`, index, README `:11-21`, test `:4`/`:226`,
  ContinuousTimeline `:3-4`); alert `index.ts:8-18` + `glass.css:86/:138-153/:407` +
  `radius.css:16/:21/:31-32/:46` + `light-dark.css:36`; Toast `:80`/`transitions.css:87-90`/
  DialogContent `:235`/`:458`; configurator `styles.css:25/:109-113/:117-119` +
  `Configurator.vue:146/:211` + AuroraConfigDock `:267/:274/:278` +
  `AuroraColorSection.vue:163-173`; tags-input `styles.css:8` + the v7.0.0 `git show` proof +
  `TagsInputItem.vue:23`; sortable ×5 + `SortableList.vue:144`; infinite-scroll `:72-78`/`:89`;
  springs Configurator-grep-0 + `:229-249`; tempo `:47-53`; confirm-dialog `:5-9` + src
  absence; StorySection `:31-32` + `sizing-config.css:35`; SectionPreviewCard `:63-65` +
  CatalogLanding `:7/:32/:40` + SectionLanding `:33` + 4 `.tile.vue`; Slider `:14/:224/
  :286-288` + Progress `:4/:59-62/:94-96` + ScrubberTimeline `:209`; dist-demo modulepreload
  = 73); plus the count-greps reproduced exact (filtered `text-(sm|xs)` = **234 = 218 demo +
  16 src**; arbitrary `text-[…px|rem|em]` = **9**; BAND-MATERIAL value-mark = **9**; demo
  PRESETS = **17**).

## 1. R5 fixlog cure verification (all in-scope cures, hostile re-proof)

| fixlog row | verdict this seat |
|---|---|
| R4A-1 (docket recount + consumption stamps) | **LANDED as logged** — rows 2/4/5/7/8/9 state cells re-stamped exactly as billed; preamble rewritten to the COMMITTED fourth union; D2-3 LIVE / D2-4 CONSUMED split in F01-F10; D2-5/D2-F23 CONSUMED + D2-6 LIVE in F21-F30; the F01-F10 "remain OPEN"/"still label" lines and the F21-F30 "remain OPEN" line all bracketed. Rows 1/3/6/10 re-proven genuinely live this seat (F13 grep-0 in JUDGE+APPLYLOG; GF-DOCK rail.vue grep-0 at `117b7f12`; §4.1 still cites the block-overflow measure + `overflow.css:65-66` "clip" comment verbatim; crosswalk RU-06 grep-0); both residues re-proven live (`PLAN.md:195` + `crosswalk:227-229` false premise verbatim; ASK-REDUCTION untouched since `4ab12128`) |
| R4A-2 (FLIP F-3 consumption) | **LANDED** — the §FLIPS bracket stamp with `BAND-GATES.md:376-379` (names the flip, 234 = 218+16, filtered method) + `BAND-MATERIAL.md:666` + `REGISTRY.md:236-238` all re-proven verbatim; the F15 parenthetical rewritten to the executed state; the REGISTRY "unfiltered" divergence note carried (and the divergence re-proven: REGISTRY does say "the 251 was the unfiltered figure"). All four counts reproduced this seat. **But the same stale 251 figure survives un-swept in the SIBLING dossier — finding R5A-2** |
| R4A-3 (F23 restored) | **LANDED** — COVERAGE paragraph converted to CONSUMED-BY-UNION — EXACT-pending-J12-ratification; summary cell updated; docket row 8 + D2-F23 stamped; sidecar RU-14 addendum bracketed + R5 addendum. All committed pins re-proven (`:55`/`:474`/`:488-490`/`:503-510`/`:793`; value-mark grep = 9; the path reconciled to `SUPERFLUITY.md:227`) |
| R4A-4 (F16 five → SIX) | **LANDED** — REDRESS re-scoped ALL SIX with the enumeration + `ContinuousMarkers.vue` named; `:508` (heading exact: "STUB → design-loop, shape FILLED") + `:517-518` re-proven; the dead `:527` struck (at HEAD `:527` is the dispatcher line); sidecar row corrected |
| R4A-5 (UNCOMMITTED discharge) | **LANDED** — all five sites carry the `1340a918` discharge; T33 re-proven surviving at `BAND-DOC-TRUTH.md:94` with the same truth-up + provenance cell |
| R4A-6 (pin re-anchor sweep) | **LANDED INCOMPLETE** — both sweep sections exist and every entry they carry re-proved exact this seat (F11-F20: `:323`/`:590-591`/`:822`/`:527`/`:529`/`:506+`/`:376-427`/`:508+`/`:165+`/`:82`; F21-F30: `:91+`/`:119`/`:102`/`:126+`/`:141`/`:460+`/`:452-456`/`:416+`/`:212+`/`:301`/`:336`/`:321`; F01-F10: FSF `:550-554` + G-PRV-1..5/`:462`). But the CRIT4-A-itemized F29 FSF pin was NOT re-anchored — **finding R5A-1**. Named coverage gaps beyond the itemization: F17's premise pins and the F15 destination — findings R5A-3/R5A-7 |
| R4A-7 (F28 residue) | **LANDED** — `BAND-MATERIAL.md:270` strike + `:788` fork-closed re-proven verbatim; dossier REDRESS + Δ-F28-1 + sidecar near-flip note all carry the discharge |
| R4A-8 (OPEN-FM-3a rename) | **LANDED** — dossier F20 renamed with both pins re-proven (`FM:66` "the dossier's F20 ruling"; `:318` = the band's OPEN-FM-1); the gate cite re-pinned to `:82` (re-proven = gate (a) J4); sidecar read-through note as logged |
| R4A-9 (`:504`) | **LANDED** — both sites corrected; `variant="floating"` re-proven at `demo/stories/data/search.vue:504` |

**Fixlog refutations: zero on cure substance; one incompleteness.** Every stamp the R5 seat
claims to have landed is on disk and its committed pins re-prove true. The one defect is a cure
billed CURED whose itemized site list was not fully executed (R5A-1).

## 2. Findings

| id | severity | file | claim | evidence | required cure |
|----|----------|------|-------|----------|---------------|
| R5A-1 | **MAJOR** | `redress/DOSSIER-F21-F30.md:491` (F29 REDRESS) + `RU14-FIXLOG-R5.md` R4A-6 row | "AMEND-D-2 (`../perfection/FABLE-STORY-FRAMEWORK.md:274-280`) rules ADOPT-not-BUILD" — presented as a current pin; the fixlog stamps R4A-6 **CURED** | The pin is dead and the cure that owed its re-anchor did not land it: at HEAD `FSF:274-280` is the AMEND-D-9 code-context prose (ends "(AMEND-D-9.)"), and AMEND-D-2 ("configurator standard = ADOPT, not BUILD") lives at `FSF:398`. CRIT4-A R4A-6 ITEMIZED exactly this pin ("F29's AMEND-D-2 `:274-280` (now `:398`)"), yet the R5 sweep's F29 row re-anchors only `BAND-STORY:244,265 → :321`; grep across `DOSSIER-F21-F30.md` + its sidecar finds zero `:398` and the `:274-280` cite standing. A reader verifying F29's ADOPT-not-BUILD authority lands mid-AMEND-D-9 and can judge the cite fabricated | Re-anchor the F29 FSF cite to AMEND-D-2 at `:398` (or by amendment name per the G-COPY-2 rule) — in the F29 body or as an F29 row in the existing R5 sweep section; correct the fixlog row R4A-6 from CURED to CURED-less-one or log the completion |
| R5A-2 | **MAJOR** | `redress/DOSSIER-F01-F10.md:420` (F10 REDRESS) | F10 is "backed by `BJ.W-TYPE-CODEMOD` (BAND-MATERIAL W6), the default-ramp reset + **251-site codemod** landing in one cut with GATES W4 (RULING 2)" | FALSE at HEAD — the band's standing figure is **234** (+ the 9 arbitraries as a separate named arm): `BAND-MATERIAL.md:666` "the 251 figure is STALE. The reproducible count is 234…", `BAND-GATES.md:376-379` (names FLIP F-3, states the filtered method), `REGISTRY.md:236-238` re-stamped (B2, `5f8ee2e3`); the filtered grep reproduced 234 = 218 demo + 16 src this seat. The R4A-2 cure rewrote the sibling F15 parenthetical to the executed 234 state but nothing corrected this range's own 251 assertion — five ring rounds missed it, and NOTHING inside DOSSIER-F01-F10 corrects it (the file never mentions 234). A reader of F01-F10 alone carries a codemod scope the band has declared stale | Rewrite the F10 clause to the executed figure ("the 234-site (+9 arbitrary) codemod per FLIP F-3's consumption, `BAND-GATES.md:376-379`"); one-line note in the F01-F10 sidecar R5/R6 addendum |
| R5A-3 | MINOR | `redress/DOSSIER-F11-F20.md:300-302` (F17 FLIP-recorded sentence) + `refable/REFABLE-RU-13-F11-F20.md:44-47` (FLIP F-1) | The RULING-8 premise is pinned "(`BAND-MATERIAL.md:117-119` 'the search component has no own border-radius (rides field-control pill)', `:698-700` lead amendment, … `PLAN.md:187`) … the lead re-judges" | All three premise pins are dead at HEAD and the re-judge ask is half-executed: `BAND-MATERIAL:117-119` is now the SQUIRCLE-GATE item (unrelated content — a verifier chasing the quote finds a different claim entirely); `:698-700` is now W6 codemod prose; the premise text PLAN-side moved `:187` → `:195` (`:187` is now the ceded above-fold edit) — and the SAME files' docket row 2 + R5 addendum already carry the corrected state (band half CONSUMED, F17 born-RED at `:135`, ledger D1 affirmed, residue = `PLAN.md:195` + `crosswalk:227-229`), so the corpus cites `:187` and `:195` for the same premise simultaneously. The R5 sweep has no F17 entry | Add an F17 row to the F11-F20 R5 sweep: premise now at `BAND-MATERIAL.md:822-824` (the F17-half-FALSE statement) + `:135` (born-RED); `PLAN.md:187` → `:195`; bracket the FLIP F-1 pin list and "the lead re-judges" with the row-2 SPLIT-CONSUMED read-through. No verdict movement |
| R5A-4 | MINOR | `redress/DOSSIER-F01-F10.md:192-195` (F04 REDRESS, opinionated-defaults bullet) + `refable/REFABLE-RU-13-F01-F10.md:79-85` (§FLIPS FLIP-2 paragraph) | Present tense: "BAND-REDUCTION's framing … **mislabels** the Card default as 'the F04 shape'; the gate is sound, the label **is** wrong (FLIP-2, sidecar)"; the sidecar §FLIPS paragraph likewise reads live and un-bracketed | The union relabeled the probe: `grep "F04 shape" BAND-REDUCTION.md` = 0 at HEAD; the gate is `G-CARD-DEFAULT-PAINT` (`:237`, re-proven with the `Card.vue:33,:39` cite). The consumption IS recorded in the same files (D2-4 CONSUMED in §JUDGE-2; sidecar RE-VERIFICATION bracket + R5 addendum) — the two body sites just kept the live-present tense. Same closure class the ring graded MINOR at R4A-5/CRIT3B-4 | Past-tense or bracket both sites ("mislabeled — relabeled by the union, D2-4") so no site in either file asserts the mislabel as current |
| R5A-5 | MINOR | `redress/DOSSIER-F01-F10.md:50-51` (F01 TARGET), `:92` (F02 POST-MORTEM), `:256-257` (F06 ISOLATION) + `refable/REFABLE-RU-13-F01-F10.md:38-39,:42` (mirror rows) | R3a/R3b evidence pinned at `REGISTRY.md:322-326` (idle-rAF ~40k RunTasks), `:291-294` (F02 CLEARED), `:295-297` (F06 flash-refuted) | All three spans drifted after the B1/B2 REGISTRY re-stamps (`5f8ee2e3` — the same shift the ring caught at `:174`→`:175`): the F02 CLEARED item now sits at `:293-296`, the F06 white-flash item at `:297-299`, and the idle-rAF numbers at `:327-329` (`:322-326` is now the cold-LCP perf paragraph — the pinned span misses the claimed content entirely). Substance survives verbatim at the shifted anchors; no prior pass swept REGISTRY pins (R4A-6's charter was BAND-*/FSF only) | Re-pin the three spans (or anchor by item label per the G-COPY-2 idiom) in the dossier + sidecar mirror rows |
| R5A-6 | MINOR | `redress/DOSSIER-F01-F10.md:462-463` + `redress/DOSSIER-F11-F20.md:455-457` + docket rows 4/8 state cells + `redress/DOSSIER-F21-F30.md:540` (F23 summary cell) | Consumed rows "ratify-and-close **per ledger C5** ('DISCHARGED-BY-UNION—ratify-and-close, do not re-apply')" — applied to rows 2(band half)/4/7/8 + D2-4 + D2-F23 | Ledger C5 on disk enumerates docket rows **5 + 9 only** ("docket rows 5 (Δ-F24-1 gate reshape) + 9 (goo-clone migration) stamped DISCHARGED-BY-UNION — ratify-and-close, do not re-apply"). For rows 2/4/7/8 + D2-4 + D2-F23 the C5 cite is a POSTURE borrow, not an existing stamp — a J12+ lead looking for the C5 row covering row 4 finds none. The fixlog's own disposition names the formal close of those rows as lead-owed "via the C5 vehicle", which is the honest phrasing | One-word precision at the citing sites: "per the ledger-C5 posture/vehicle (C5 itself enumerates rows 5+9; the remaining consumed rows await their ledger stamp)" — or ask the lead to widen C5 |
| R5A-7 | MINOR | `redress/DOSSIER-F01-F10.md:384-385` (F09 REDRESS) + `redress/DOSSIER-F11-F20.md` R5 sweep F15 entry | (a) "F09 sits in J5's regression-guard conversion class alongside F12/F17/F45"; (b) the F15 sweep entry says "`BAND-MATERIAL:109-110/:138` → moved" with NO destination | (a) stale vs the union's F17 flip: the band's applied J5 class at HEAD is "F12 + F45 + F48-rounding — REGRESSION-GUARDS" with F17 flipped OUT to BORN-RED FIX (`BAND-MATERIAL.md:135`/`:146-149`/`:52`); `JUDGE.md:38` still reads F09/F12/F17 so the RULING-cite is defensible, but the unqualified list imports the stale F17 posture into the F09 row (the exact drift class CRIT4B2-2 charged in F41-F50); F09's own routing (OPEN-1a, narrowed to F09/F12 — `:175`/`:203`, re-proven) is unaffected. (b) live anchors exist and were omitted: the F15 §D row at `BAND-MATERIAL.md:131` and the born-RED at `:170` ("F15 reset RED at HEAD… GREEN on" — the very text the dossier quotes) — "moved" with no target strands the pin-chaser | (a) append "(F17 since flipped born-RED by the union — see docket row 2)" to the F09 clause; (b) complete the F15 sweep entry: `:109-110/:138` → `:131` (§D row) + `:170` (born-RED) |

## 3. What re-proved clean (the ratified spine, this pass)

Every mechanism-layer claim in scope re-verified at the byte-identical paint tree: the F17 chain
(`search.vue:504` → `searchVariants.ts:10` `rounded-none` beating `.input-bar`'s
components-layer `--radius-2xl`, zero re-chroming rules); the F24 chain (5s via
`scheme-motion.css:107`, the fast-rung intent verbatim in `literals.css`); the F22 pair
(120ms tick vs 300ms transition + the wrap at `progress.vue:29-32`); the F21 three-mechanism rim
(conic `:19-26` + linear/clip-path `:37-46`); the F27 pair (the false "clip" comment verbatim at
`overflow.css:65-66`; `block:"nearest"` at `:185`); the F28 all-7px statics (secondary at
(0,2,0) over both `:47-50`; both buttons default-secondary); the F04/F05 rail anchors (one
`<Aurora>` at `:69`; "Rounded shape" + `shape="rounded"` at `:108-121`; postures `:142+`); the
F08 WGSL 3/5/6/7→`mediumKuwahara` alias + 17 presets + the `:73-78` fallback-arm comment; the
F16 facade truth end-to-end (imports, index, README §Exports still false → T33 committed and
surviving at `BAND-DOC-TRUTH.md:94`); the F11 gap chain (`styles.css:25`→`:117-119`); F12's
disk + v7.0.0-cut `git show` proof; F25's preset-page header + src absence; F29's grep-0
born-RED; F30's mount-scoped root-write; F09's concentric relay + the overflow-fight comment at
`AuroraColorSection.vue:168-173`; F10's two sites. The R5 consumption stamps match the
committed band text everywhere checked; the four count-greps reproduce exactly; docket rows
1/3/6/10 and both row-residues are genuinely still live; no J1-J11 ruling is contradicted
anywhere in scope. The 73-modulepreload and 4-`.tile.vue` counts reproduce. GF-DOCK/GF-AURORA/
crosswalk/ASK-REDUCTION all commit-stable since the corpus's pins.

## 4. Disposition (PROPOSE only — the lead applies)

| artifact | BLOCKER | MAJOR | MINOR | verdict |
|---|---|---|---|---|
| DOSSIER-F01-F10 (+ sidecar) | 0 | 1 (R5A-2) | 3 (R5A-4, R5A-5, shares R5A-6/R5A-7a) | AMEND |
| DOSSIER-F11-F20 (+ sidecar) | 0 | 0 | 2 (R5A-3, R5A-7b) + R5A-6 share | AMEND |
| DOSSIER-F21-F30 (+ sidecar) | 0 | 1 (R5A-1) | R5A-6 share | AMEND |
| RU14-FIXLOG-R5 | 0 | shares R5A-1 (R4A-6 billed CURED, landed incomplete) | 0 | correct the R4A-6 row when the F29 pin lands |

**0 BLOCKER / 2 MAJOR / 5 MINOR.** No ownership moves, no ruling contradictions, no consumption
stamp wrong — the R5 seat's sixteen cures all landed in substance, fifteen of them completely.
The residue is one itemized-and-missed pin re-anchor (R5A-1), one stale figure that hid outside
the flip's home range for five rounds (R5A-2), and a thin tail of pin/tense drift in exactly the
places the sweep's site list did not enumerate. All seven findings share one cure vehicle: a
small dated R6 sweep entry per file. Consecutive-clean is NOT met — two MAJORs stand for a
round-6 fix pass.

*End — RU-14 CRIT5-A. One file under `formation/refable/`; no `src/`/`demo/` edits, no commit.*
