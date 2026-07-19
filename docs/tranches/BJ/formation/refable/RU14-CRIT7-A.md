# RU-14 CRIT7-A — ring round 7, seat A (F01-F30): fresh adversarial critique

- **Unit:** RU-14, ring round 7, seat A. Scope: `redress/DOSSIER-F01-F10.md`,
  `DOSSIER-F11-F20.md`, `DOSSIER-F21-F30.md` + sidecars
  `refable/REFABLE-RU-13-{F01-F10,F11-F20,F21-F30}.md`, as amended by the R7 fix seat
  (`RU14-FIXLOG-R7.md`); ring history `RU14-CRIT1-A/B` through `RU14-CRIT6-A/B` +
  `RU14-FIXLOG-R3/R4/R5/R6/R7` read from disk.
- **modelId:** `claude-fable-5` (verbatim from this seat's system context).
- **Verification base:** HEAD `02e322f1` (master); the corpus edits live UNCOMMITTED on the
  working tree (six dossiers + six sidecars `M`; `RU14-FIXLOG-R6.md`/`R7.md` + the CRIT6 pair
  untracked) — this pass judges the on-disk bytes. Parity re-proven this seat:
  `git diff --name-only 4daf5c02..HEAD -- docs/tranches/BJ/` = EMPTY, `-- src/ demo/` = EMPTY,
  `7aec864d..HEAD -- src/ demo/` = EMPTY, and the `7aec864d..HEAD -- docs/tranches/BJ/` diff is
  exactly the 15 committed files — the nine-band layer and the paint tree are byte-identical to
  what the CRIT6 seats and the R7 fix seat judged; zero working-tree `src/`/`demo/` mods.
- **Method:** fresh assume-wrong pass; I authored none of the corpus and none of the ring
  history. **~300 anchors re-verified at HEAD**: ≈160 `src/`/`demo/` pins (the full F17 chain
  `SearchBar.vue:4`/`FuzzySearch.vue:126-127`/`searchVariants.ts:8-11`/`components.css:12-16`/
  `search.vue:504`/floating-chrome grep-0; the F24 chain `Skeleton.vue:51-63`/
  `scheme-motion.css:101,:106-107`/`literals.css:23-34` intent-quote verbatim; the F22 driver
  `progress.vue:22-45` (120ms/+3/wrap `:29-32`) + `Progress.vue:157-158` + `:108-114`; the F21
  three-mechanism rim (`styles.css:14-35` conic block exact, `:37-64` linear+clip arms,
  gate spans `:20-24`/`:39-46`, `ScrollProgressRim.vue:43`/`:53`/`:89` builders,
  `progress.vue:197/:242/:258/:276/:291`); the F27 set (`overflow.css:50-59` FITS both-visible,
  `:62-70` overflow branch, `:65-66` false "clip" comment verbatim, `:83`;
  `useSelectionGroup.ts:183-186` `block:'nearest'`; `useDockOverflowFit.ts:38-41`); the F28
  statics (`button/styles.css:40-50` primary-deep/secondary-resting, `Button.vue:35` +
  `StoryPlayButton.vue:34` both `secondary`, `springs.vue:229-254` with `:231/:232-245/:248/:249`
  exact, wash-radius 1px `glass.css:86`, `--control-surface-blur` `:407`, the 2dppx arm
  `light-dark.css:36`); the F04/F05 rail set (`rail.vue:69` the ONE `<Aurora>`, `:108-140`
  Rounded-shape + `slice(0, 4)` at `:130` the only slice, `:117-121`/`:120`, `:142-189` postures +
  `:157`, `:45-46`/`:53` labels, `:64-67` wash comment; `overview.vue:54-55`/`:118` DockStage +
  `:630` the live `shape="card"`; `useDockShellProps.ts:53`); `Card.vue:33,:39`; the F08 set
  (`applyMedium` WGSL `:387-403` verbatim 3/5/6/7→`mediumKuwahara`, 17 demo presets `:685-703`
  incl. SPEEDTEST counted, `src…presets.ts:73-78` fallback-arm comment); the F16 facade set
  (GlassTimeline `:2-4`, ContinuousTimeline `:3-4`, index exports GlassTimeline+types only,
  README §Exports `:11-17` still false, test `:4`/`:226`, LOC 232/349/214/436 + the ~2,250 total,
  speedtest `PhaseTimeline.vue:49` + MeterColumn comments-only); the F01/F02/F03 chassis
  (`SectionPreviewCard.vue:35`/`:63-65`, `SectionLanding.vue:33`, `CatalogLanding.vue:7/:32/:40`,
  4 `.tile.vue`, `AppShell.vue:11/:26-28/:59/:192/:201-203` + the shell `<Aurora>` block
  `:146-154`, `hero/aurora-hero.ts:15`, `routeTransition.ts:5-13`, `router.ts:115-117/:122-130`,
  73 modulepreloads, `layers.vue:279/:303/:329/:330-337`, `manifest.ts:932` + `:207-212`); the
  F09/F10/F11 configurator set (`AuroraColorSection.vue:163/:168-173/:180/:199/:237`,
  `Configurator.vue:146/:211`, `configurator/styles.css:25/:47-56/:109-113/:117-119`,
  `ConfiguratorLayer.vue:88+`, `StorySection.vue:31-32`, `sizing-config.css:35`,
  `AuroraConfigDock.vue:267/:274/:278` + exactly 7 `<ConfiguratorLayer>` in `:267-296`); the
  F12/F13/F15 set (`tags-input/styles.css:8/:61`, `TagsInputItem.vue:23`,
  `radius.css:16/:21/:31/:34/:46`, sortable `:69/:76/:109/:117/:143` + `SortableList.vue:144`,
  `infinite-scroll.vue:72-78/:89`, `segmented.css:169/:306`); the F19/F20 set (alert
  `index.ts:8/:11-18`, `Alert.vue:37`, `glass.css:86`, `Toast.vue:80/:91-103`,
  `transitions.css:87+`, `DialogContent.vue:235/:458`); the F23 set (`Slider.vue:14/:224/:286+`,
  `Progress.vue:4/:59-62/:94+/:169-171`, `ScrubberTimeline.vue:209` `glass-track` live); the F25
  demo header `:5-9` + 3 `<Dialog>`; F29 Configurator-grep-0 + `springs.vue:345/:415`; F30
  `tempo.vue:47-53/:71-77`); ≈125 `waves/`+formation pins (BAND-FEEDBACK-MOTION
  `:41-47/:57/:66/:82/:102/:119/:134/:141/:158-162/:241/:250-251/:260-261/:318`; BAND-MATERIAL
  `:29/:55/:117-119/:131/:135/:146-149/:170/:175/:203/:270/:301/:336/:474/:488-490/:503-510/
  :590-591/:665-666/:788/:793/:822-826`; BAND-STORY `:254/:321/:323/:462/:506-510/:527/:529`;
  BAND-REDUCTION `:125/:237/:452-456/:508/:517-518/:638` + "F04 shape" grep-0; BAND-GATES
  `:376-381/:413/:468`; BAND-DOC-TRUTH `:94`; REGISTRY `:7/:236-238/:293-296/:297-299/:322-329`;
  PLAN `:83/:187/:195-196`; JUDGE `:21-25/:38/:94/:109/:122-123` + F13 grep-0; APPLYLOG F13
  grep-0; ASK-REDUCTION `:25/:53/:171-181/:209-211/:265-267` + last-commit `4ab12128`;
  SUPERFLUITY `:227/:668/:674-675/:682-686`; crosswalk `:23/:24/:33-40/:43/:56-62/:213-216/
  :227-229/:237+` + RU-06 grep-0; GF-DOCK `:104-111/:204-206/:211/:217/:225-226/:319/:322/:357/
  :388` + rail.vue grep-0 + last-commit `117b7f12`; GF-AURORA `:163/:237/:315/:461` +
  Q-AURORA-QUARTET ×8; FSF `:274-280/:398/:550-554`; IOS27-CODEX `:28`; LEAD-AMENDMENT-LEDGER
  `:35` (C5 = rows 5+9 only) + E2 PENDING `:49`; ADJUDICATION-1 items 8/9; VISUAL-GESTALT
  `:10-12`; R3B-DIGEST `:50-57`; 8 FEEDBACK-LEDGER rows; screenshot inventory exact — 14 PNGs
  present, F02/F06/F07/F08 absent as billed); the count-greps reproduced exact (filtered
  `text-(sm|xs)` = **234 = 218 demo + 16 src**; bare = **257 lines / 260 occurrences**; arbitrary
  `text-[…px|rem|em]` = **9**; raw `text-[` = **14 / 11 excl. `length:var`**; BAND-MATERIAL
  value-mark = **9**); 16 git proofs (the four parity diffs; dead-pathspec EMPTY; matching
  pathspec → c368ccbc + cbbaeb05 exactly; `c368ccbc --diff-filter=D` four confirm-dialog paths +
  message verbatim; cbbaeb05 = the AV `src/confirm-dialog.ts` delete; c368ccbc ancestor-of
  490cc46e; ef3ea646 ancestor-of 490cc46e; 490cc46e ships `--radius-field` + file untouched-since
  + the metric-badge/cell/stack typesVersions removal; ff69acd9 date/message incl. "inter-section
  gap"; 5f8ee2e3; 1340a918 the nine-band union; 117b7f12; 4ab12128; 6f77ab12); ~20 sibling-census
  greps run fresh (confirm-dialog: words ×5 at the exact five files + muster `App.vue` ×1 +
  value.js docs-only ×2 + `vite.config.ts:218`; completion-seal: speedtest ×0, sci-report
  `CategoryHomeView.vue:4` + `GalleryView.vue:19`, atlas `completion.ts:5` + `category.ts:2`;
  instrument-chassis: speedtest ×4 files exact + muster ×5; fourier metric ×7 code files exact).

## 1. R7 fixlog cure verification (all in-scope cures, hostile re-proof)

| fixlog row | verdict this seat |
|---|---|
| R6A-1 (F25 archaeology command + message quote) | **LANDED** — re-proven from scratch: `git log --diff-filter=D -- 'src/components/confirm-dialog*'` returns EMPTY; `git show c368ccbc --diff-filter=D --name-only` lists the four confirm-dialog paths (`custom/confirm-dialog/{ConfirmDialog.vue,index.ts,README.md}` + `subpaths/confirm-dialog.ts`); `git log --diff-filter=D -- '*confirm-dialog*'` names exactly c368ccbc + cbbaeb05; cbbaeb05 IS the AV-era `src/confirm-dialog.ts` delete (`feat(tranche-AV)…`); the message quote in the rewritten block is now VERBATIM against `git log -1 --format=%B c368ccbc` (paren restored); c368ccbc ancestor-of-490cc46e re-proven. The dossier block (`DOSSIER-F21-F30.md:261-273`, bracket at `:265`) and the sidecar F25 row (`:57`) + R7 addendum (`:203+`) all carry it as billed |
| R6A-2 (F20 sidecar J4 pin) | **LANDED** — `REFABLE-RU-13-F11-F20.md:33` now cites the W1 heading (`BAND-FEEDBACK-MOTION.md:57`) + gate (a) REGISTER-PARITY (`:82`) with the R7 bracket; both destinations re-proven on disk; the dead `:41-47` span re-proven band-sequencing prose + table header |
| R6A-3 (§C2 roll-up pin) | **LANDED** — `DOSSIER-F21-F30.md:302` carries `:265`; on disk `ASK-REDUCTION.md:265` = the C2 confirm-dialog row, `:266` = C3, `:267` = C4 (F30's cite stays exact); file commit-stable at `4ab12128` re-proven |
| R6A-4 (RT1 re-anchor) | **LANDED** — `REFABLE-RU-13-F01-F10.md:101` pins `:217`/`:322`/`:388` with the R7 bracket; on disk `GF-DOCK-PASS3.md:217` = the RED-at-HEAD F04-rings line, `:322` = the W5 roster row, `:388` = `G-RADIUS-GRAMMAR`, `:204-206` = §5 ring-delete content, `:225-226` = W6 crossfade STRUCK prose — all as billed; the `:141-143` RE-VERIFICATION bracket landed; rail.vue grep-0 re-reproduced |

**Cure refutations: zero.** All four in-scope R7 cures landed as billed and their evidence
re-proves true. (CRIT6B-1/2/3/4 touched A01-A17/F31-F50 — seat B's scope. R6A-5's log-note
disposition is consistent with the on-disk state: the `7aec864d..HEAD` BJ-scoped diff is exactly
the 15 files, re-run this seat.)

## 2. Findings

| id | severity | file | claim | evidence | required cure |
|----|----------|------|-------|----------|---------------|
| R7A-1 | MINOR | `redress/DOSSIER-F01-F10.md:221` (F05 ISOLATION) + `refable/REFABLE-RU-13-F01-F10.md:61` (N2 row) | Both quote JUDGE J2 as "R3b's field evidence was a DIFFERENT dock" inside quotation marks | On disk the ruling reads lowercase: `JUDGE.md:22-23` "…R3b's field evidence was a different dock." (line-wrapped across `:22-23`, which is also why a naive one-line grep misses it). The corpus uppercases DIFFERENT mid-quote — unmarked emphasis attributed to the source, the CRIT5B-3/CRIT6B-2 species (word-form drift inside quotation marks). Substance identical; J2's adoption and application re-proven true everywhere else | Re-take the quote verbatim ("a different dock") at both sites, or move the emphasis outside the quotation marks |
| R7A-2 | MINOR | `refable/REFABLE-RU-13-F21-F30.md:113` (Routing summary, F23 row) | "F23 → `BJ.W-TRACK-DRY` … — coverage PARTIAL per the RU-14 addendum below" | Stale mirror: the standing grade after R5 is **EXACT-pending-J12-ratification** — carried by the dossier's F23 COVERAGE paragraph (`DOSSIER-F21-F30.md:180-193`), the summary-row cell (`:549`), this sidecar's own R5 addendum (`:174-179`), and the R5 bracket appended to the RU-14 addendum the routing row points at. The R5 sweep updated all those sites but never re-marked this routing cell — the R6A-2 class (the one sidecar mirror an enumeration missed). The delegation phrase partially self-heals; the asserted grade does not | Bracket the cell (e.g. "— coverage PARTIAL [RU-14 R5: → EXACT-pending-J12-ratification; see the R5 addendum]") |
| R7A-3 | MINOR | `redress/DOSSIER-F01-F10.md:49-50` (F01 TARGET) + `:58` (POST-MORTEM) + `refable/REFABLE-RU-13-F01-F10.md:38` (F01 row pin) | "the always-on `fixed inset-0` shell Aurora (`AppShell.vue:147-156`)"; post-mortem "the continuous idle rAF field behind every route" | The shell Aurora is conditionally mounted: `v-if="shellFieldActive"` (`AppShell.vue:147`), computed `!meta.suppressesShellField` (`demo/router.ts:115-117`), false on focal routes (chromatic-hero / self-staging dock — the shell's own comment `:141` "Mounted IFF `shellFieldActive`"). "Always-on" holds only in the never-pauses-while-mounted reading (the R3b idle-rAF evidence, which stands); "the [shell] field behind every route" is loose — focal routes swap to a page-owned field. Secondary: the element block spans `:146-154` (opener `<Aurora` at `:146`, `/>` at `:154`); the `:147-156` span clips the opener and annexes two comment lines. Cannot misdirect — the owning waves baseline on the live R3b trace and meet the `v-if` on first read | Reword to "the default-on shell Aurora (`v-if="shellFieldActive"` — suppressed only on focal routes, which stage their own field)"; re-pin `:146-154` at both sites |
| R7A-4 | MINOR | `redress/DOSSIER-F21-F30.md:441` (F28 TARGET) | "Material facts: `tokens/glass.css:138-153` (6 rung names → 4 distinct radii)" | The pinned span composes FIVE rungs (wash `:138`, quiet `:146`, resting `:147`, floating `:152`, overlay `:153`); the sixth (deep) is composed in `src/styles/glass/deep.css:78-79` from `--glass-blur-deep-radius: 16px` at `src/styles/tokens/glass-deep.css:56`, and the radius VALUES sit at `tokens/glass.css:86-97` (1/7/7/11/11). The ladder arithmetic is TRUE ({1, 7, 11, 16} = 4 distinct across 6 names) — but the offered pin contains neither the sixth name nor any radius value, so a verifier chasing it counts 5 names and 0 radii. The F28 verdict is unaffected (no deep/primary in frame; the all-7px statics re-proven) | Widen the pin: `tokens/glass.css:86-97` (radii) + `:138-153` (five composed rungs) + `tokens/glass-deep.css:56` (deep 16px) |

## 3. What re-proved clean (the ratified spine, this pass)

Every mechanism-layer claim in scope re-verified at the byte-identical paint tree: the F17 chain
end-to-end (`rounded-none` at `searchVariants.ts:10` beating `.input-bar`'s components-layer
`--radius-2xl`; zero re-chroming rules; PLAN `:195-196` + crosswalk `:227-229` residue still live
as the docket says); the F24 chain (5s via `scheme-motion.css:107`; the fast-rung intent verbatim
at `literals.css:26`); the F22 pair (120ms tick + 3% step + the `>=100 → 0` wrap vs the 300ms
transition; R3B-DIGEST `:50-57` real); the F21 three-mechanism rim (conic block `:14-35` exact,
edge arms `:37-64`, both builders); the F27 pair (FITS both-axes-visible `:50-59`; the false
"clip" comment verbatim at `:65-66`; `block:'nearest'`; the vertical-only measure); the F28
all-7px statics (both defaults `secondary`, the springs row pins exact to the line); the F04/F05
rail anchors (`shape="rounded"` at `:120`; `slice(0, 4)` at `:130` the ONLY slice — the
"only section" claim exact; ONE `<Aurora>` at `:69`; the postures/backdrop disambiguation against
`overview.vue:118` DockStage); the F08 WGSL 3/5/6/7→`mediumKuwahara` alias verbatim + 17 presets
counted + the `:73-78` fallback-arm comment; the F16 facade truth end-to-end (LOC roster exact;
~2,250 with geometry+types; README §Exports still false; T33 standing at `BAND-DOC-TRUTH.md:94`);
the F25 corrected archaeology (all five git facts) + preset page + the 6-live + 1-config + 2-doc
relay census re-run fresh at the exact files; F26's census re-run fresh (speedtest ×0, sci-report
×2 + atlas ×2 at the exact pins); F18's censuses re-run fresh (speedtest ×4 exact files, muster
×5, fourier ×7 code files); F29's grep-0 born-RED; F30's mount-scoped root-write; F09's
overflow-fight comment `:168-173` + concentric relay; F10's two sites; F11's 7-section count +
`ff69acd9` provenance incl. the "inter-section gap" message text; F12's `490cc46e` cut proof +
untouched-since; F13/F14/F15's anchors + the 100-route census at `BAND-STORY:506-510`. The
JUDGE-2 docket's ten states all re-proven: rows 1/3/6/10 + the row-2/9 residues LIVE (F13 grep-0
in JUDGE+APPLYLOG; GF-DOCK rail.vue grep-0 + §4.1 still citing the block-overflow measure +
`overflow.css:65-66` unchanged; crosswalk `:56-62` still citing G-CONTAIN-class gates + zero
RU-06 in §Judgment corrections; PLAN/crosswalk false premise verbatim; ASK untouched since
`4ab12128` + ledger E2 PENDING); the consumed rows' band evidence verbatim on disk
(`BAND-MATERIAL:55/:488-490/:503-510/:793`; `BAND-FEEDBACK-MOTION:134/:158-162/:241/:250-251/
:260-261`; `BAND-REDUCTION:237` + "F04 shape" grep-0; T33). The five count-greps and the raw
`text-[` 14/11 split all reproduce. C5's rows-5+9-only enumeration re-proven at the ledger. The
screenshot inventory is exact. No ownership move, no ruling contradiction, no wrong consumption
stamp, no dead reproducible command found anywhere in scope.

## 4. Disposition (PROPOSE only — the lead applies)

| artifact | BLOCKER | MAJOR | MINOR | verdict |
|---|---|---|---|---|
| DOSSIER-F01-F10 (+ sidecar) | 0 | 0 | 2 (R7A-1, R7A-3) | AMEND |
| DOSSIER-F11-F20 (+ sidecar) | 0 | 0 | 0 | CLEAN |
| DOSSIER-F21-F30 (+ sidecar) | 0 | 0 | 2 (R7A-2, R7A-4) | AMEND |

**0 BLOCKER / 0 MAJOR / 4 MINOR.** The R7 fix seat's four in-scope cures all landed completely —
zero unlanded, zero landed-wrong — and the corpus's mechanism spine survived a ~300-anchor
hostile re-proof intact, including every git-archaeology command now offered as reproducible.
The four MINORs are pure precision tail: one mid-quote case drift (the CRIT5B-3 species' mildest
form), one stale sidecar routing mirror (the R6A-2 class), one "always-on" overstatement against
a `v-if`, one ladder pin that under-covers its own parenthetical. None can misdirect a BJ wave.
For seat A's scope this is the first zero-MAJOR round of the ring; whether round 7 counts toward
consecutive-clean is the lead's call against seat B's result and the ring's severity convention
(MINOR-only rounds have still triggered fix passes in this ring).

*End — RU-14 CRIT7-A. One file under `formation/refable/`; no `src/`/`demo/` edits, no commit.*
