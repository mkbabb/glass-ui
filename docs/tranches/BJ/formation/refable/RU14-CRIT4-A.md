# RU-14 CRIT4-A — ring round 4, seat A (F01-F30): fresh adversarial critique

- **Unit:** RU-14, ring round 4, seat A (re-paired — the prior CRIT4-A died at the wall
  pre-write, per 050d4a5b). Scope: `redress/DOSSIER-F01-F10.md`, `DOSSIER-F11-F20.md`,
  `DOSSIER-F21-F30.md` + sidecars `refable/REFABLE-RU-13-{F01-F10,F11-F20,F21-F30}.md`, as
  amended by the R4 fix seat (`RU14-FIXLOG-R4.md`); ring history `RU14-CRIT1-A/B`,
  `RU14-CRIT2-A/B`, `RU14-CRIT3-A/B`, `RU14-CRIT4-B` read from disk.
- **modelId:** `claude-fable-5` (verbatim from this seat's system context).
- **Verification base:** commit HEAD `66294838` (master), working tree CLEAN under `waves/`.
  **The corpus has been overtaken:** every corpus file's last write (14:17-14:22, banked at
  `050d4a5b`) predates `1340a918` (15:13 — the RU-03/04 union COMMITTED: all nine
  `waves/BAND-*.md` rewritten + `APOTHEOSIS.md` added), `dda87dcc` (PLAN.md truth-ups),
  `5f8ee2e3` (REGISTRY 251→234 re-stamp), and `f3c9e7bc`/`59c52ef0`
  (`LEAD-AMENDMENT-LEDGER.md`). `src/`+`demo/` parity holds (`git diff --stat
  55f5170d..HEAD -- src/ demo/` EMPTY) — the paint tree is byte-identical to every prior pass.
  Sequencing note (extends CRIT4B-1's finding into this scope): `BAND-FEEDBACK-MOTION` (14:12),
  `BAND-MATERIAL` (14:13), `BAND-GATES` (14:14) were already rewritten ON THE WORKING TREE
  before the R4 fix seat's final edits (14:17-14:22); its material-state check covered
  `BAND-DOC-TRUTH.md` only. `BAND-REDUCTION`/`BAND-STORY`/`PLAN`/`REGISTRY` moved only at the
  15:13-15:16 commits — pure post-corpus rot.
- **Method:** fresh assume-wrong pass; I authored none of the corpus and none of the ring
  history. **~140 anchors re-verified at current HEAD** (≈85 doc pins: BAND-DOC-TRUTH
  T33 `:94`/T40 `:121`/`:133-134`; BAND-MATERIAL ×25 incl. `:29`/`:55`/`:57`/`:117-119`/
  `:137-138`/`:270`/`:301`/`:474`/`:488-490`/`:503-510`/`:588-592`/`:666`/`:698-700`/`:768-769`/
  `:793`/`:822-824`; BAND-GATES `:10-11`/`:48`/`:376-381`/`:397-427`; BAND-FEEDBACK-MOTION ×20
  incl. `:16`/`:40`/`:50-54`/`:66`/`:82`/`:102`/`:119`/`:134-162`/`:241-276`/`:318`;
  BAND-REDUCTION `:237`/`:362-364`/`:410`/`:452-456`/`:503-518`/`:722`; BAND-STORY `:221`/
  `:242`/`:254`/`:267`/`:304`/`:321-324`/`:398`/`:442`/`:458-461`/`:506-511`/`:527-529`/`:637`;
  PLAN `:183-195`; REGISTRY `:236-238`; GF-DOCK `:104-111`/`:319`/`:357` + rail.vue-grep-0;
  GF-AURORA commit-stability at `117b7f12`; JUDGE `:94`; SUPERFLUITY `:227`/`:668`/`:674`/
  `:682-686`; crosswalk `:227-229` + RU-06-grep-0; ASK-REDUCTION `:25`/`:171`/`:209`/`:266-267`
  + commit-stability at `4ab12128`; FSF `:150`/`:221`/`:250`/`:274-280`/`:385-391`/`:398`/
  `:550-554`; LEAD-AMENDMENT-LEDGER in full; REFABLE-RU-03-FEEDBACK-MOTION `:23-24`/`:53`/
  `:63`/`:76`; JUDGE/APPLYLOG F13-grep-0; ≈55 src/demo pins: every load-bearing F01-F30 cite
  incl. `searchVariants.ts:8-11`, `search.vue:504`, `components.css:12-16`, `Skeleton.vue:51-57`,
  `scheme-motion.css:106-107`, `literals.css:23-35`, `overflow.css:63-66`,
  `useSelectionGroup.ts:183-186`, `progress.vue:28-32`, `Progress.vue:157-158`, the WGSL
  `applyMedium` body `:387+`, both preset rosters (17 keys `:685-703`; the `:73-78` comment
  verbatim), `rail.vue:69/:108-121`, `layers.vue:279/:303/:329`, `manifest.ts:932`,
  `AppShell.vue:201-203`, `router.ts:121-124`, `Card.vue:33/:39`, timeline
  facade/index/README/test/`ScrubberTimeline.vue:209`, `alert/index.ts:8`, `glass.css:86`,
  `radius.css:16/:21/:31-32`, `Toast.vue:80`, `transitions.css:87+`,
  `DialogContent.vue:235/:458`, `infinite-scroll.vue:72-78`, `SortableList.vue:144`,
  springs-Configurator-grep-0, `tempo.vue:47-49`, `AuroraConfigDock.vue:267/:274/:278`,
  `button/styles.css:40-50`, `Button.vue:35`, `StoryPlayButton.vue:34`, `StorySection.vue:31-32`,
  `SectionPreviewCard.vue:63-65`, `CatalogLanding.vue:7/:40`, `useDockShellProps.ts:53`,
  `sizing-config.css:35`, `tags-input/styles.css:8`); plus the four count-greps reproduced
  exact (filtered `text-(sm|xs)` = **234**; arbitrary `text-[…]` excl. `length:var` = **11**;
  `text-[…px|rem|em]` = **9** — the band's "verified 9" and the sidecar's 14/11 are different
  grains, BOTH true; PRESETS = 17).

## 1. R4 fixlog cure verification (all in-scope cures)

| fixlog row | verdict this seat |
|---|---|
| R3A-1 (row 7 → CONSUMED-BY-T33) | **LANDED as logged** — row 7, F16 body, open-items line, sidecar text + addendum all present; T33 re-proven at `BAND-DOC-TRUTH.md:94`. The rider's commit-state language has since ROTTED (the RU-03 commit happened; finding R4A-5) — the pre-registered closure, not a cure defect |
| R3A-2 (FLIP F-3 population split) | **LANDED as logged** — the 218+19+9 decomposition, the 237→234 slice scoping, the re-DERIVE routing row all on disk; every count reproduced this seat. The flip has since been CONSUMED by the union (finding R4A-2) |
| R3A-3 (presets comment full-pathed) | **LANDED** — `src/components/aurora/constants/presets.ts:73-78` at all three sites; comment re-read verbatim on disk |
| R3A-4 (C-I pin `:682-686`) | **LANDED** — both corpus sites corrected; C-I re-proven opening at `SUPERFLUITY.md:682`, `:687` blank |
| R3A-5 (F08 summary-row C-labels) | **LANDED** — "under JUDGE C-G (`JUDGE.md:94`) / SUPERFLUITY C-H (`:674-681`)" on disk; both label sites re-proven exact |

**Refutations of the R4 fixlog: zero on cure substance.** But its verification-base blind spot
(material-state re-proven for `BAND-DOC-TRUTH.md` ONLY, while FM/MATERIAL/GATES were already
rewritten on the same tree at 14:12-14:14) let five F01-F30 state-at-HEAD claims stand that were
already stale at the corpus's final write — the same class CRIT4B-1 charged for F31-F40. And
the fixlog's DEFER-with-owner rows ("owner = whichever seat commits the RU-03 union") TRIGGERED
at `1340a918` and the owner executed none of the stamps — the corpus mtimes all predate the
commit.

## 2. Findings

| id | severity | file | claim | evidence | required cure |
|----|----------|------|-------|----------|---------------|
| R4A-1 | **MAJOR** | `redress/DOSSIER-F11-F20.md:434-460` (docket preamble + rows 2/4/5/8/9) + `redress/DOSSIER-F01-F10.md:445-462` (§JUDGE-2, D2-4) + `redress/DOSSIER-F21-F30.md:585-601` (D2-5, D2-F23) + `refable/REFABLE-RU-13-F01-F10.md:152-155` ("FLIP-1/FLIP-2 remain OPEN … BAND-REDUCTION `:33-37`/`:240` still label the Card probe 'the F04 shape'") + `REFABLE-RU-13-F11-F20.md:104-114` + `REFABLE-RU-13-F21-F30.md:131-133` | The consolidated JUDGE-2 docket bills TEN live items for "ONE consolidated JUDGE-2 pass (J12+) ruling all ten, then an APPLYLOG-mirrored application pass"; the rows' state-at-HEAD cells assert the band texts unchanged | The committed RU-03/04 nine-band union (`1340a918`) CONSUMED five of the ten: **row 4** — `grep "F04 shape" BAND-REDUCTION.md` = 0; G-CARD-DEFAULT-PAINT relabeled (`:237` "a default `<Card>` at HEAD renders `metal:gold` + `grain:true` (`Card.vue:33,:39`)" — even adopting the sidecar's `:39` nit); **row 5** — FM W3 carries "Δ-F24-1 — the corrected read, replacing the prior gate" (`BAND-FEEDBACK-MOTION.md:134`) + the period-VALUE/RUNG-BINDING/driver-shape gates (`:158-162`); **row 8** — MATERIAL W4 charters "BOTH registers: the track well AND the value-marks paint" (`:55`), mints `src/styles/glass/track-well.css` + `value-marks.css` (`:505-510`), and names "the prior `_shared/track.css`" superseded (`:503`) — the path split RECONCILED to SUPERFLUITY's `:227`; **row 9 wave-half** — FM W6 is now "F33 dot-refinement + the goo-clone collapse" (`:241-262`), self-described "widened per the JUDGE-2 docket row 9" (CRIT4B-1 caught this in flight from the F31-F40 side; it is committed now); **row 2 band-half** — `BAND-MATERIAL.md:29` "role-correct on disk — with ONE proven exception (F17, below)" + `:822-824` ("…is FALSE at HEAD: the search floating variant strips the radius on disk"), and the RU-04 judge affirmed the R8 re-open with the posture split (ledger D1). The lead's own ledger orders the consequence: **C5 "docket rows 5 + 9 stamped DISCHARGED-BY-UNION — ratify-and-close, do not re-apply"** (+ RU-03-FM sidecar R2 verbatim). Live remainder re-proven this seat: rows 1 (F13 grep 0 in JUDGE + APPLYLOG), 3 (GF-DOCK rail.vue grep 0), 6 (§4.1 still cites the block-overflow measure; `overflow.css:65-66` comment stands), 10 (crosswalk RU-06 grep 0); row 2 residue — the false premise SURVIVES at `PLAN.md:195` (moved from the row's `:185-189` pin) + `crosswalk:227-229`; row 9 residue — the ASK §C1/§C3 refresh (`ASK-REDUCTION.md` untouched since `4ab12128`). A J12+ lead executing "rule all ten, then apply" re-applies band edits already landed — the exact re-application C5 forbids | Stamp rows 4/5/8 CONSUMED-BY-UNION (`1340a918`, committed pins); row 9 HALF-CONSUMED (ASK-refresh residue named); row 2 SPLIT-CONSUMED (band half consumed; residue = `PLAN.md:195` + `crosswalk:227-229`, pins corrected). Recount the ask: the J12+ pass RULES rows 1/3/6/10 + the two named residues and RATIFIES-AND-CLOSES the consumed rows (per C5 — never re-apply). Rewrite the preamble's "a FOURTH (the REFABLE RU-03 doc-truth union, working-tree/uncommitted…)" framing — the fourth union is the COMMITTED nine-band RU-03/04 union. Sweep both sibling dossiers' docket sections + all three sidecar addenda (incl. the F01-F10 sidecar's "FLIP-2 remains OPEN" and its R4 addendum's "still label" claims) |
| R4A-2 | **MAJOR** | `refable/REFABLE-RU-13-F11-F20.md:64-81` (FLIP F-3) + `:140-144` (R4 addendum) + `redress/DOSSIER-F11-F20.md:184-188` (F15 parenthetical) | "The 251 figure standing in `BAND-MATERIAL.md` W6 (`:40`/`:588-592`) and `BAND-GATES.md` W4 (`:381-386`)…"; "`REGISTRY.md:236` frames 251 as 'text-sm/text-xs (251 sites)' — the two band sites disagree with each other"; routing row: "the lead re-DERIVES the W6 figure … at J12+/wave time" | FALSE at HEAD — the flip was EXECUTED by the union and the lead: `BAND-MATERIAL.md:666` "the 251 figure is STALE. The reproducible count is **234** …" (+ roster `:57`); `BAND-GATES.md:376-379` "THE FIGURE (**RU-13 FLIP F-3**, re-verified…): 234 sites = 218 demo + 16 src … The previously standing **251** figure is STALE" with the 9 `text-[…px|rem|em]` arbitraries a separate named arm (`:381` "verified 9 at HEAD" — reproduced this seat: unit-suffixed grep = 9; the sidecar's 14/11 counts ALL arbitraries excl. `length:var` — different grains, both true) + the four CSS-declaration sites — "one figure, both bands"; `REGISTRY.md:237-238` re-stamped 234-filtered (lead amendment B2, `5f8ee2e3`). `BAND-MATERIAL.md:588-592` is now the W5 proportion roster — the decomposition pin is dead. A lead executing the routing row re-derives an already-re-derived figure | Stamp FLIP F-3 CONSUMED-BY-UNION, citing `BAND-GATES.md:376-379` (which names the flip) + the B2 re-stamp; sweep the dossier F15 parenthetical to the executed state (the band's standing figure IS 234+9+4 now). One-line residue worth carrying: REGISTRY's new "the 251 was the unfiltered figure" phrasing diverges from the flip's own account (251 was the 218+19+9 decomposition summing 246; the unfiltered grep is 257 lines / 260 occurrences) — note it for the lead, do not re-litigate |
| R4A-3 | **MAJOR** | `redress/DOSSIER-F21-F30.md:180-190` (F23 COVERAGE DOWNGRADE) + `:537` (summary row) + `refable/REFABLE-RU-13-F21-F30.md:120-130` | "verified this seat: BAND-MATERIAL contains zero value-mark text file-wide"; "SUPERFLUITY charters `src/styles/glass/track-well.css` (`:227`) while BAND-MATERIAL `:433`/`:476` charter `_shared/track.css`"; "Coverage returns to EXACT only on a JUDGE-2 ruling that charters the value-marks register into W4 (or rules it out) and reconciles the track-well file path" | Both terminal conditions are MET on disk at HEAD and the stated evidence is now false: `value-mark` grep in `BAND-MATERIAL.md` = **9 hits** (the W4 charter now owns both registers — `:55`, the twin ~65-line marks census `:488-490`, the `:474` history line); the union mints `src/styles/glass/value-marks.css` (`:509-510`) and `track-well.css` at the SUPERFLUITY path (`:505`), naming "the prior `_shared/track.css`" superseded (`:503`); `OPEN-4a` RULED toward the CSS register pair (`:793`). The `:433`/`:476` pins are dead (`:476` is factor-mass prose). Only the formal J12 ratify-and-close (the C5 vehicle) remains. Left as written, the dossier directs a lead to re-open a wave whose scope is already chartered | Convert the DOWNGRADE paragraph to CONSUMED-BY-UNION-pending-J12-ratification with the committed pins; summary-row coverage cell PARTIAL → EXACT-pending-ratification (or the lead's stamp of choice); D2-F23's disposition folds into R4A-1's docket recount; sidecar RU-14 addendum mirrors |
| R4A-4 | **MAJOR** | `redress/DOSSIER-F11-F20.md:244-246` (F16 REDRESS) + `refable/REFABLE-RU-13-F11-F20.md:29` (F16 row "owner + A2 all-five scope") | "scope bound by amendment A2 to ALL FIVE variants (`:527`) — the A2 all-five binding holds under the facade truth too" | At HEAD the chartered scope is SIX: `BAND-REDUCTION.md:517-518` "Scope = **ALL SIX variants** (RU-12 A2 CHANGED — the draft's 'five variants ~1500 LOC' undercount … is struck)", enumerating `GlassTimeline.vue` (232) + `ContinuousTimeline` (349) + `ContinuousRail` (214) + "**`ContinuousMarkers.vue` (436 — named so it cannot silently survive)**" + Scrubber + Segmented; the W5 heading advanced STUB → "shape FILLED" (`:508`). The `:527` pin is dead. A lead reading the dossier's five-variant binding could contract the chartered redesign scope by exactly the SFC the charter names so it "cannot silently survive" | Restate the F16 REDRESS scope as ALL SIX per RU-12 A2-as-CHANGED; re-pin to `:508`/`:517-518`; record the STUB→FILLED status advance; sweep the sidecar F16 row |
| R4A-5 | MINOR | `redress/DOSSIER-F11-F20.md:457` (row 7 state cell) + `:223-225` (F16 body) + `:428-429` (open-items line) + `refable/REFABLE-RU-13-F11-F20.md:86-89`, `:133-139` | "working-tree UNCOMMITTED (the last commit touching the file, `4ab12128`, has zero `timeline` hits)"; residue "confirm T33 survives the RU-03 commit" | The RU-03 commit HAPPENED (`1340a918`); `waves/` is clean; the last commit touching `BAND-DOC-TRUTH.md` is no longer `4ab12128`; **T33 SURVIVED** — re-proven at committed `BAND-DOC-TRUTH.md:94` with the same truth-up + provenance cell. The pre-registered residue is dischargeable; the present-tense UNCOMMITTED clauses are false at HEAD (the dated "at RU-14 R4" phrasings stand as history). Same closure class the ring graded MINOR at CRIT3B-4/5 | Discharge the residue with the `1340a918` pin ("T33 survived the commit at `:94`"); strike or past-tense the UNCOMMITTED clauses at all five sites |
| R4A-6 | MINOR | all three dossiers + sidecars (pin layer) | BAND-*/FSF line pins presented as current | The nine-band rewrite moved essentially every BAND-* line pin the corpus carries; substance survives at the new anchors (verified per pin this seat): F11 `BAND-STORY:242,267`→G-CFG-3 `:323` (`:242` is now "### KISS / parsimony"), MATERIAL W5 `:507`→`:590-591`; F13 `:466`/`:468`/`:450-451`→`:527`/`:529`; F14 `:420-489`/`:436-438`→W6 `:506+`; F15 `BAND-MATERIAL:109-110,:138`→moved (`:138` is now the F17 input-bar line), `BAND-GATES:381-386`→`:376-427`; F16 `BAND-REDUCTION:435-478`→`:508+`; F19 FM `:86-96`→`:165+` ; F20 FM `:41-47`→`:82`; F21 FM `:49-63`/`:60-61`/`:56-58`→`:91+`/`:119`/`:102`; F22 `:65-84`/J7 `:79-84`→`:126+`/`:141`; F23 `:389-443`→`:460+`; F26 `BAND-REDUCTION:392-396`/`:363-418`→`:452-456`/`:416+` (census upgraded: + atlas `seal-compositor` vite plugin); F28 `:170-300`/OPEN-2d `:258-262,:291`→W2 `:212+`/`:301`/`:336`; F29 `BAND-STORY:244,265`→`:321`; F12 lead-amendment `:698-700`→`:822` (OPEN-1a survives, narrowed to F09/F12, `:175`/`:203`). Plus two FSF pins: F03's `FABLE-STORY-FRAMEWORK.md:385-391` (narration pattern — now §8 finding 10, `:550-554`; `:385-391` is the §7 amendments header) and F29's AMEND-D-2 `:274-280` (now `:398`) — G-COPY-2 itself now orders "anchor by section, never line" (`BAND-STORY:254`). Riding nit: F01's "gates G-PRV-1..4" understates HEAD's five (G-PRV-5 regression-guard, `:64`/`:442`) | One dated re-anchor sweep across the three dossiers + sidecars; for band cites prefer wave/gate names + section anchors over line pins (the G-COPY-2 rule), keeping line pins only where load-bearing |
| R4A-7 | MINOR | `redress/DOSSIER-F21-F30.md:446-449` (F28 REDRESS residue) + `:563-565` (Δ-F28-1 residue line) + `refable/REFABLE-RU-13-F21-F30.md:97-100` (near-flip) | "the §Design(D) prose (`:233-236`) still carries the superseded 'plausibly deep-tier primary' sentence … should fall when W2 runs" / "Falls at W2 execution" | The union already struck it: `BAND-MATERIAL.md:270` "the earlier 'plausibly the deep-tier primary vs the quiet select' hypothesis is STRUCK (it assumed a primary button the frame does not contain)"; the fork-closed note re-stated at `:788`. The residue fell at the union, not W2 | Mark the residue DISCHARGED-BY-UNION (`1340a918`) at all three sites; the sidecar near-flip note sweeps with it |
| R4A-8 | MINOR | `redress/DOSSIER-F11-F20.md:387-388` (F20 REDRESS "(`OPEN-FM-1`)") | The toast unify-vs-parity design call is labeled `OPEN-FM-1` | At HEAD the FM band's `OPEN-FM-1` is W2's loop/indeterminate fill-pill scope question (`BAND-FEEDBACK-MOTION.md:318`) — which DOSSIER-F21-F30's F21 cites CORRECTLY — while the F20 toast-register question is now **`OPEN-FM-3a`** (`:66`, self-described "the dossier's F20 ruling"). The lead ledger already orders the dossier-side rename (C3, PENDING, from RU-03-FM R4) — unrecorded by any ring pass until now. A lead resolving the dossier's label lands on the WRONG open question | Rename the dossier-side label per C3 (e.g. "the toast-register call — band `OPEN-FM-3a`"); no verdict movement |
| R4A-9 | MINOR | `redress/DOSSIER-F11-F20.md:303` (F17 STATUS/REFABLE-2 line) + `refable/REFABLE-RU-13-F11-F20.md:14` (boundary moment) | "`search.vue:503` `variant="floating"`" | Off by one: `variant="floating"` sits at `demo/stories/data/search.vue:504` (grep this seat; src/demo parity — never moved). The dossier's own TARGET span `:502-508` and the ring files (CRIT2-A/CRIT3-A `:504`) are right; the two `:503` cites drifted through four ring rounds uncaught | `:503` → `:504` at both sites |

## 3. What re-proved clean (the ratified spine, this pass)

Every mechanism-layer claim the ring rests on re-verified at the byte-identical paint tree: the
F17 chain (`search.vue:504` → `searchVariants.ts:10` `rounded-none` in the utilities layer vs
`.input-bar`'s components-layer `--radius-2xl` at `components.css:12-16`); the F24 chain
(`Skeleton.vue:54` → 5s via `scheme-motion.css:107`, the fast-rung intent verbatim at
`literals.css:25-26`); the F27 chain (the false "clip" comment verbatim at `overflow.css:65-66`;
`block:"nearest"` at `useSelectionGroup.ts:185`); the F22 pair (120ms wrap `:29-31` vs 300ms
`Progress.vue:158`); the F08 WGSL alias + 17 presets + the `:73-78` fallback-arm comment; the
F04/F05 rail anchors (`:69` one `<Aurora>`, `:108-121` "Rounded shape" + `shape="rounded"` at
`:120`); the F28 statics (both buttons default-secondary); the F16 facade
(`GlassTimeline.vue:2-4`, index GlassTimeline+types only, README §Exports `:11+` still false —
T33's committed cure pin `README.md:14-21` names the same section); F03/F19/F25/F26/F29/F30
anchors all exact. The consumed items were consumed FAITHFULLY — the union's band text matches
the corpus's asks in substance everywhere checked (Δ-F24-1 near-verbatim; the goo clone-set
enumerated file-for-file; the value-marks register at the corpus's own ~65-line grain; the 234
figure with the method stated and the corpus's flip cited BY NAME at `BAND-GATES:376`), so the
rot is bookkeeping, not contradiction. Docket rows 1/3/6/10 are genuinely still live. No J1-J11
ruling is contradicted anywhere in scope; RF-5 partition undisturbed; the four count-greps
reproduce exactly.

## 4. Disposition (PROPOSE only — the lead applies)

| artifact | BLOCKER | MAJOR | MINOR | verdict |
|---|---|---|---|---|
| DOSSIER-F01-F10 (+ sidecar) | 0 | shares R4A-1 (D2-4 consumed; sidecar "FLIP-2 remains OPEN"/"still label" claims) | shares R4A-6 (FSF `:385-391` pin) | AMEND |
| DOSSIER-F11-F20 (+ sidecar) | 0 | 3 (R4A-1 host, R4A-2, R4A-4) | 3 (R4A-5, R4A-8, R4A-9) + R4A-6 share | AMEND |
| DOSSIER-F21-F30 (+ sidecar) | 0 | 1 (R4A-3) + R4A-1 share (D2-5/D2-F23) | R4A-7 + R4A-6 share | AMEND |

Zero BLOCKERs: no feedback row loses its owner (every F01-F30 owner survives the nine-band
rewrite, several strengthened), no JUDGE ruling is contradicted, and the union consumed the
corpus's asks faithfully — the defect class is a docket/status layer now standing on the wrong
side of a committed union, plus one wave-scope misstatement (F16 five→six) the band charter
overrides. All four MAJORs share one cure vehicle: a single dated RU-14 R5
consumption-and-re-anchor sweep against `1340a918`, coordinated with the lead ledger's C3/C5/D1
rows (which already order the ratify-and-close posture). Consecutive-clean is NOT met — four
MAJORs plus five MINORs stand for a round-5 fix pass.

*End — RU-14 CRIT4-A. One file under `formation/refable/`; no `src/`/`demo/` edits, no commit.*
