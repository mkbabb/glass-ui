# RU-14 CRIT6-A — ring round 6, seat A (F01-F30): fresh adversarial critique

- **Unit:** RU-14, ring round 6, seat A. Scope: `redress/DOSSIER-F01-F10.md`,
  `DOSSIER-F11-F20.md`, `DOSSIER-F21-F30.md` + sidecars
  `refable/REFABLE-RU-13-{F01-F10,F11-F20,F21-F30}.md`, as amended by the R6 fix seat
  (`RU14-FIXLOG-R6.md`); ring history `RU14-CRIT1-A/B` through `RU14-CRIT5-A/B` +
  `RU14-FIXLOG-R3/R4/R5` read from disk.
- **modelId:** `claude-fable-5` (verbatim from this seat's system context).
- **Verification base:** HEAD `4daf5c02` (master); the R6 corpus edits live UNCOMMITTED on the
  working tree (the six dossiers + six sidecars `M`; `RU14-FIXLOG-R6.md` untracked) — this pass
  judges the on-disk bytes. Parity re-proven this seat: `git diff --stat 7aec864d..HEAD --
  docs/tranches/BJ/waves/` = EMPTY and `-- src/ demo/` = EMPTY — the nine-band layer and the
  paint tree are byte-identical to what the CRIT5 seats and the R6 fix seat judged.
- **Method:** fresh assume-wrong pass; I authored none of the corpus and none of the ring
  history. **~250 anchors re-verified at HEAD**: ≈120 `src/`/`demo/` pins (the full F17 chain
  `SearchBar.vue:4`/`FuzzySearch.vue:126-127`/`searchVariants.ts:8-11`/`components.css:12-16`/
  `search.vue:504`/floating-chrome grep-0; the F24 chain `Skeleton.vue:51-57`/
  `scheme-motion.css:101,:106-107`/`literals.css:23-34`; the F22 driver `progress.vue:22-45`
  (120ms/+3/wrap) + `Progress.vue:157-158`; the F21 rim three-mechanism set `styles.css:14-24,
  :37-46` + `ScrollProgressRim.vue:43-50`; the F27 set `overflow.css:50-59,:62-70,:65-66
  false-comment verbatim,:83` + `useSelectionGroup.ts:183-186` + `useDockOverflowFit.ts:38-41`;
  the F28 statics `button/styles.css:40-50` + `Button.vue:35` + `StoryPlayButton.vue:34` +
  `springs.vue:229-249` + Configurator-grep-0 + the 6-names/4-radii ladder (`glass.css:86-97` +
  `glass-deep.css:56` 16px); the F04/F05 rail set (`rail.vue:69/:108-121/:120/:142-157`,
  one-`<Aurora>` count, `useDockShellProps.ts:53`, `overview.vue:630` the live `card` setter);
  `Card.vue:33,:39`; the F08 set (`applyMedium` WGSL `:387-403` verbatim, 17 demo presets
  `:685-703` incl. SPEEDTEST, `src…presets.ts:73-78`); the F16 facade set (GlassTimeline `:2-4`,
  ContinuousTimeline `:3-4`, index, README §Exports `:11+`, test `:4/:226`, per-SFC LOC
  232/349/214/436); layers.vue `:279/:303/:329-337`; `manifest.ts:932` + `:207-212`;
  AppShell `:11/:26-28/:143-157/:201-203/:59/:192`; `routeTransition.ts:5-13`;
  `router.ts:121-130`; `aurora-hero.ts:14-16`; the F09/F10/F11 configurator set
  (`AuroraColorSection.vue:163-175,:180,:199,:237`, `Configurator.vue:146,:211`,
  `configurator/styles.css:25,:109-113,:117-119`, `StorySection.vue:31-32`,
  `sizing-config.css:35`, `AuroraConfigDock.vue:267/:274/:278`); the F12/F13/F15 set
  (`tags-input/styles.css:8,:61`, `radius.css:16/:21/:31/:34/:46`, `TagsInputItem.vue:23`,
  sortable ×5 + `SortableList.vue:144`, `infinite-scroll.vue:72-78,:89`,
  `segmented.css:169,:306`); the F19/F20 set (alert `index.ts:8,:11-18`, `glass.css:86,:407`,
  `Alert.vue:37`, `Toast.vue:80,:91+`, `transitions.css:87-90`, `DialogContent.vue:235,:458`,
  `light-dark.css:36`); confirm-dialog src-absence + demo header `:5-9`; tempo `:47-53,:71-77`;
  Slider `:14/:224/:286+` + Progress `:4/:59-62/:94+/:169-171` + `ScrubberTimeline.vue:209`;
  `PagerDots.vue:326` ≡ `DeckGooFilter.vue:26` byte-equal; 4 `.tile.vue`; 73 modulepreloads);
  ≈75 `waves/`+formation pins (BAND-MATERIAL ×19 incl. `:29/:55/:117-119/:131/:135/:146-149/
  :170/:175/:203/:270/:301/:336/:474/:488-490/:503-505/:590-591/:663-668/:694-701/:788/:793/
  :820-826; BAND-FEEDBACK-MOTION ×13 incl. `:41-47/:57/:66/:82/:102/:119/:134/:141/:158-162/
  :241/:250-251/:260-261/:318`; BAND-REDUCTION `:237/:299-304/:452-456/:508/:517-518/:638-640`
  + "F04 shape" grep-0; BAND-GATES `:374-382`; BAND-STORY `:254/:321/:323/:462/:506/:527/:529`;
  BAND-DOC-TRUTH `:94`; REGISTRY `:7/:234-239/:291-300/:320-330`; PLAN `:83/:103/:185-197`;
  JUDGE `:38/:94/:122-123` + F13 grep-0; APPLYLOG F13 grep-0; LEAD-AMENDMENT-LEDGER `:35` (C5 =
  rows 5+9 only); FSF `:255-260/:270-282/:396-400/:550-554`; GF-DOCK `:104-111/:204-217/
  :225-226/:319/:322/:357/:366-372/:388` + rail.vue grep-0 + last-commit `117b7f12`; GF-AURORA
  `:163/:237/:315/:461` + Q-AURORA-QUARTET; GF-HANDMARK `:207-212` + G-CONTAIN-class grep-0;
  IOS27-CODEX `:28`; ASK-REDUCTION `:25/:171/:175-186/:209-211/:258-268`; SUPERFLUITY
  `:227/:668/:674/:682`; crosswalk `:23/:24/:33-40/:43/:56-62/:213-216/:227-229/:237/:243`);
  8 FEEDBACK-LEDGER rows; the five count-greps reproduced exact (filtered `text-(sm|xs)` =
  **234 = 218 demo + 16 src**; bare = **257 lines / 260 occurrences**; arbitrary
  `text-[…px|rem|em]` = **9**; BAND-MATERIAL value-mark = **9**; demo PRESETS = **17**);
  11 git proofs (hash existence ×5, `ef3ea646` ancestor-of-`490cc46e`, tags-input
  `radius-field` in the `490cc46e` cut + untouched-since, `c368ccbc` deletion paths,
  GF-DOCK commit-stability, the three parity diffs); 9 sibling-census greps run fresh
  (speedtest `PhaseTimeline.vue:49` + completion-seal ×0 + `useStagger` live ×2
  (`ResultStack.vue:171`, `useResultReveal.ts:36`); words confirm-dialog ×5 +
  `vite.config.ts:218`; muster ×1 + instrument-chassis ×5 files; fourier-analysis
  metric-badge/MetricBadge ×7 files; sci-report `CategoryHomeView.vue:4`+`GalleryView.vue:19`;
  atlas `completion.ts`+`category.ts`+compositor/preset).

## 1. R6 fixlog cure verification (all in-scope cures, hostile re-proof)

| fixlog row | verdict this seat |
|---|---|
| R5A-1 (F29 AMEND-D-2 re-anchor) | **LANDED** — `FSF:274-280` re-proven AMEND-D-9 prose (ends "(AMEND-D-9.)" at `:280`); the AMEND-D-2 block heads at `:398` on disk. Dossier F29 body (`DOSSIER-F21-F30.md:491-493`) and the sweep's F29 row (`:626-628`) both carry `:398` with the R6 annotation; sidecar R6 addendum (`REFABLE-RU-13-F21-F30.md:190+`) as billed |
| R5A-2 (F10 251→234) | **LANDED** — `BAND-GATES.md:376-381` ("THE FIGURE … 234 = 218 demo + 16 src … 251 is STALE") + `BAND-MATERIAL.md:665-666` re-proven verbatim; the F10 clause (`DOSSIER-F01-F10.md:425-429`) now carries "the 234-site (+9 arbitrary) codemod … per FLIP F-3's consumption" with both pins; the filtered grep reproduced 234 = 218+16 this seat; sidecar R6 addendum (`:198+`) as billed |
| R5A-3 (F17 premise pins) | **LANDED** — `BAND-MATERIAL:117-119` re-proven the `proof:squircle-language` item, `:696-700` W6 codemod prose, `:822-826` the CORRECTED lead amendment (F17-half FALSE), `:135` the born-RED FIX row; `PLAN.md:187` the ceded above-fold edit, `:195-196` the premise. The dossier's sweep F17 row (`DOSSIER-F11-F20.md:500-506`), the body bracket (`:303-305`), and the sidecar FLIP F-1 bracket (`:44-48`) all landed; no verdict moved |
| R5A-4 (F04 mislabel tense) | **LANDED** — "F04 shape" greps 0 in `BAND-REDUCTION.md`; `G-CARD-DEFAULT-PAINT` at `:237` re-proven with the `Card.vue:33,:39` cite; the dossier bullet (`DOSSIER-F01-F10.md:193-198`) reads past-tense with the R6 bracket; the sidecar §FLIPS FLIP-2 paragraph (`:79-83`) heads with the CONSUMED bracket |
| R5A-5 (three REGISTRY spans) | **LANDED** — at HEAD: F02-CLEARED heads `REGISTRY.md:293` (item 2, spans `:293-296`), F06 white-flash `:297-299`, idle-rAF ~40k RunTasks `:327-329`, `:322-326` the cold-LCP paragraph — all four re-proven; all six corpus sites re-pinned (`DOSSIER-F01-F10.md:51/:93/:260`; sidecar `:38/:39/:42`) |
| R5A-6 (ledger-C5 precision) | **LANDED** — `LEAD-AMENDMENT-LEDGER.md:35` re-proven: C5 enumerates docket rows **5 + 9 only**. All charged sites now carry the posture/vehicle wording with the enumeration disclosed (`DOSSIER-F11-F20.md:459-462/:474/:478`; `DOSSIER-F01-F10.md:469-472`; `DOSSIER-F21-F30.md:190-192/:542`); the D2-5 row-5 cites correctly left untouched |
| R5A-7a (F09 J5-class list) | **LANDED** — the clause (`DOSSIER-F01-F10.md:387-390`) reads "alongside F12/F45 — … the union flipped F17 OUT" with `BAND-MATERIAL.md:135` + the `JUDGE.md:38` ruling-quote keep (J5's F09/F12/F17 list re-proven on disk at `:38`) |
| R5A-7b (F15 sweep destination) | **LANDED** — the entry (`DOSSIER-F11-F20.md:495-498`) carries both destinations, re-proven: `:131` the §D F15 row, `:170` "F15 reset RED at HEAD… GREEN on the library `<Button>` swap" |

**Cure refutations: zero.** All eight in-scope R6 cures landed as billed and their evidence pins
re-prove true. (The four CRIT5-B cures touched A01-A17/F31-F50 — seat B's scope.)

## 2. Findings

| id | severity | file | claim | evidence | required cure |
|----|----------|------|-------|----------|---------------|
| R6A-1 | **MAJOR** | `redress/DOSSIER-F21-F30.md:263-265` (F25 ISOLATION) + `refable/REFABLE-RU-13-F21-F30.md:57` (F25 row) | "`git log --diff-filter=D -- 'src/components/confirm-dialog*'` names exactly c368ccbc"; the sidecar row seconds "`git log --diff-filter=D` is unambiguous" | The command as written returns **EMPTY** at HEAD (reproduced this seat) — and never named c368ccbc at any HEAD: the paths deleted at `c368ccbc` are `src/components/custom/confirm-dialog/{ConfirmDialog.vue,index.ts,README.md}` + `src/subpaths/confirm-dialog.ts` (`git show c368ccbc --diff-filter=D --name-only`), none matching the `src/components/confirm-dialog*` pathspec (the literal prefix diverges at `custom/`). The SUBSTANCE survives — c368ccbc IS the demotion (message verbatim: "ConfirmDialog DEMOTED to a consumer Dialog preset (dirs/barrels/subpaths DELETED…"), predating `490cc46e` — but the one reproducible proof the dossier offers for its headline F25 evidence-correction produces nothing; a J12+/wave verifier re-running it can judge the c368ccbc attribution fabricated. Aggravator, same sentence: the commit-message "quote" swaps the message's paren for a comma inside quotation marks (the CRIT5B-3 class). Uncaught six rounds | Correct the command to a matching pathspec (`git log --diff-filter=D -- '*confirm-dialog*'` → c368ccbc + cbbaeb05, or cite the four deleted paths outright) and re-take the message quote verbatim; one-line note in the sidecar F25 row |
| R6A-2 | MINOR | `refable/REFABLE-RU-13-F11-F20.md:33` (F20 verdict row) | "J4 applied verbatim at `BAND-FEEDBACK-MOTION.md:41-47`" | Dead pin: at HEAD `:41-47` is band sequencing prose + the wave-table header; J4's applied state is the W1 heading (`:57`) + gate (a) (`:82` — the pin the dossier's own R5 sweep re-anchored to). The R5 addendum's R4A-8 note re-read only the row's "OPEN-FM-1" label; the `:41-47` band pin in the same cell was never re-anchored or bracketed — the one sidecar mirror the sweeps missed | Re-anchor the row's cite `:41-47` → `:57`/`:82` (or bracket it historical per the sweep's G-COPY-2 idiom) |
| R6A-3 | MINOR | `redress/DOSSIER-F21-F30.md:295` (F25 REDRESS) | "Owned by `ASK-REDUCTION §C2` (`../../ASK-REDUCTION.md:171-188`, roll-up `:266`)" | Off-by-one: the §C2 roll-up row sits at `ASK-REDUCTION.md:265` ("C2 · confirm-dialog · fold already landed…"); `:266` is the C3 (reveal/scroll) row. The file is commit-stable since `4ab12128`, so the pin was born off — F30's sibling cite (roll-up `:267` = C4) is exact. CRIT4-A's method line sampled `:266-267` as an existence check and did not catch the row mismatch | Re-pin `:266` → `:265` |
| R6A-4 | MINOR | `refable/REFABLE-RU-13-F01-F10.md:101` (ROUTING RT1) + `:141-142` (RE-VERIFICATION bullet) | RT1 pins the lead's re-touch at "§5 (`:204-206`) + §Gates (`:225-226`, the F04/F47 baseline)"; the RE-VERIFICATION bullet endorses "GF-DOCK-PASS3.md:204-217 unchanged" | Half-dead after the `117b7f12` rewrite: `:204-206` still lands on §5 ring-delete content (coincidental geography — "Kept whole from the opus round… Delete the decorative per-item outline-ring circles (F04-direct…)"), but `:225-226` is now W6 crossfade STRUCK prose; the F04 baseline/gates live at `:217` (RED-at-HEAD), `:322` (W5 roster), `:388` (`G-RADIUS-GRAMMAR`). The R5 addendum re-proved FLIP-1/D2-3 live (rail.vue grep-0 — re-reproduced this seat) but never re-anchored RT1's pins; a lead executing RT1 chases the §Gates half into the wrong wave's text | Re-anchor RT1's pins (`:225-226` → `:217`/`:322`/`:388`) or bracket the row + the ":204-217 unchanged" clause as pre-rewrite history; D2-3's substance needs no movement |
| R6A-5 | MINOR | `refable/RU14-FIXLOG-R6.md:10-11` (verification-base paragraph) | "the `7aec864d..HEAD` docs diff is exactly the six dossiers + six sidecars + CRIT5 pair + R5 fixlog" | Overstated: `git diff --name-only 7aec864d..HEAD` = **48 files**; 33 are `docs/tranches/IOS27-MICRO/**` (a different tranche riding the same range). The claim is true only scoped to `docs/tranches/BJ/` (exactly the 15 named files). The banked-corpus substance holds; the certification's "exactly" does not | One-word precision when next edited: "the `docs/tranches/BJ/` diff is exactly…" (a log note suffices — the fixlog is the R6 seat's own artifact, inside the ring fence) |

## 3. What re-proved clean (the ratified spine, this pass)

Every mechanism-layer claim in scope re-verified at the byte-identical paint tree: the F17
chain end-to-end (`rounded-none` at `searchVariants.ts:10` beating `.input-bar`'s
components-layer `--radius-2xl`; zero re-chroming rules); the F24 chain (5s via
`scheme-motion.css:107`; the fast-rung intent verbatim at `literals.css:25-26`); the F22 pair
(120ms tick + 3% step + the `>=100 → 0` wrap vs the 300ms transition); the F21 three-mechanism
rim (conic `:19-26`, linear+clip-path `:37-46`); the F27 pair (the false "clip" comment verbatim
at `overflow.css:65-66`; both-axes-visible FITS branch; `block:'nearest'`); the F28 all-7px
statics + the 6-names/4-radii ladder (1/7/11/16); the F04/F05 rail anchors (`shape="rounded"` at
`:120`; postures `:142+`; ONE `<Aurora>` at `:69`); the F08 WGSL 3/5/6/7→`mediumKuwahara` alias
+ 17 presets + the `:73-78` fallback-arm comment; the F16 facade truth end-to-end including the
232/349/214/436 LOC roster and the still-false README §Exports (T33 standing at
`BAND-DOC-TRUTH.md:94`); the F11 gap chain; F12's disk state + the `490cc46e` cut proof +
untouched-since; F25's preset-page header + src absence + the live relay census re-run fresh
(words ×5 + muster ×1 + `vite.config.ts:218`); F26's census re-run fresh (speedtest ×0,
sci-report ×2 at the exact pins, atlas live); F18's censuses re-run fresh (muster
instrument-chassis ×5 files, fourier metric ×7 files); F29's grep-0 born-RED; F30's
mount-scoped root-write; F09's concentric relay + overflow-fight comment; F10's two sites;
the F33 goo-clone byte-identity (`PagerDots.vue:326` ≡ `DeckGooFilter.vue:26`). The docket
splits re-proven genuinely correct: rows 1/3/6/10 + both residues LIVE (F13 grep-0 in
JUDGE+APPLYLOG; GF-DOCK rail.vue grep-0 + §4.1 still citing the block-overflow measure;
crosswalk `:56-62` still citing the retired G-CONTAIN-class gates, grep-0 in the RU-06 charter;
`PLAN.md:195-196` + `crosswalk:227-229` false premise verbatim); the consumed rows' band
evidence verbatim on disk. The five count-greps and the JUDGE "Zero floating notes remain"
quote (`JUDGE.md:122-123` — line-wrapped, real) all reproduce. `useStagger`'s KEEP evidence
live-imports at both speedtest sites. No ownership move, no ruling contradiction, no wrong
consumption stamp found anywhere in scope.

## 4. Disposition (PROPOSE only — the lead applies)

| artifact | BLOCKER | MAJOR | MINOR | verdict |
|---|---|---|---|---|
| DOSSIER-F01-F10 (+ sidecar) | 0 | 0 | 1 (R6A-4) | AMEND |
| DOSSIER-F11-F20 (+ sidecar) | 0 | 0 | 1 (R6A-2) | AMEND |
| DOSSIER-F21-F30 (+ sidecar) | 0 | 1 (R6A-1) | 1 (R6A-3) | AMEND |
| RU14-FIXLOG-R6 | 0 | 0 | 1 (R6A-5) | log-note |

**0 BLOCKER / 1 MAJOR / 4 MINOR.** The R6 fix seat's eight in-scope cures all landed completely
— zero unlanded, zero landed-wrong — and the corpus's mechanism spine survived a ~250-anchor
hostile re-proof intact. The MAJOR is a six-round survivor outside every sweep's site list: F25's
one reproducible git-archaeology command produces nothing (the attribution it defends is true).
The MINORs are the familiar tail — two dead pins the sweeps' enumerations missed, one born
off-by-one roll-up pin, one fixlog "exactly" that isn't. Consecutive-clean is NOT met — one
MAJOR stands for a round-7 fix pass; the cure vehicle is small and dated, per the ring's
established form.

*End — RU-14 CRIT6-A. One file under `formation/refable/`; no `src/`/`demo/` edits, no commit.*
