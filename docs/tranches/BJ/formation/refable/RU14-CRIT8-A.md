# RU-14 CRIT8-A — ring round 8, seat A (F01-F30): the second-consecutive-clean gate

- **Unit:** RU-14, ring round 8, seat A. Scope: `redress/DOSSIER-F01-F10.md`,
  `DOSSIER-F11-F20.md`, `DOSSIER-F21-F30.md` + sidecars
  `refable/REFABLE-RU-13-{F01-F10,F11-F20,F21-F30}.md`. Ring history `RU14-CRIT1..7-A/B` +
  `RU14-FIXLOG-R3..R7` read from disk. Critique-only pass — no fixlog input existed for this
  round (round 7's six minors were DISPOSITIONED tail-class at the `dcb2832a` bank, not cured).
- **modelId:** `claude-fable-5` (verbatim from this seat's system context).
- **Verification base:** HEAD `dcb2832a` (master) — the corpus is now COMMITTED (the rounds-6-7
  bank; the six dossiers + six sidecars byte-equal working tree = HEAD). Parity re-proven this
  seat: `git diff --name-only 02e322f1..HEAD -- src/ demo/` = EMPTY and
  `-- docs/tranches/BJ/waves/ formation/ios27/ formation/greenfields/ formation/perfection/` =
  EMPTY — the paint tree and the whole evidence layer are byte-identical to what the CRIT7 seats
  judged; `dcb2832a` touched exactly the 18 ring files. ONE working-tree divergence exists:
  `formation/ios27/IOS27-CODEX.md` carries uncommitted IOS27-MICRO pass-3 edits — judged OUT OF
  SCOPE per the round charter; codex claims verified against `git show HEAD:` (see the
  cross-lane note, §4).
- **Method:** fresh assume-wrong pass; I authored none of the corpus and none of the ring
  history. **~290 anchors re-verified at COMMITTED HEAD**: ≈150 `src/`/`demo/` pins (the full
  F17 chain `SearchBar.vue:4`/`FuzzySearch.vue:126-127`/`searchVariants.ts:8-11`/
  `components.css:12-16`/`search.vue:504`/`.fuzzy-search--floating` grep-0; the F04/F05 rail set
  — entries roster 8, `slice(0, 4)` at `:130` = Compass/Shapes/Boxes/Navigation exact, the
  second `slice(0, 5)` at `:173` checked and NOT a counterexample (6 icons — the "exactly home +
  four" claim survives), "Vertical dock" `v-for="e in entries"` = all 8 + home, ONE `<Aurora>`
  at `:69`, `:117-121`/`:120`, postures `:142-189` bounds + `:157`, `overview.vue:53-56/:118/
  :630`, `useDockShellProps.ts:53`, `Card.vue:33,:39`; the F01/F02 chassis
  (`SectionPreviewCard.vue:35/:63-65`, both landings' fixed grids, `CatalogLanding.vue:7→:40`,
  4 `.tile.vue`, `AppShell.vue:11/:26-28/:59/:141/:146-154 v-if/:192/:201-203`,
  `router.ts:115-117/:122-129`, 73 modulepreloads); `layers.vue:279/:303/:329/:330-337` +
  `manifest.ts:932/:207-212`; the F08 WGSL `applyMedium` 3/5/6/7→`mediumKuwahara` verbatim +
  17 demo presets counted + `src…presets.ts:73-78`; the F09/F10/F11 configurator set
  (`AuroraColorSection.vue:163/:168-173/:180/:199/:237`, `Configurator.vue:146/:211`,
  `configurator/styles.css:25/:109-113/:117-119`, `AuroraConfigDock.vue:267/:274/:278` + 7
  `<ConfiguratorLayer>`, `StorySection.vue:31-32`, `sizing-config.css:35`); the F12/F13/F15 set
  (`tags-input/styles.css:8/:61`, `TagsInputItem.vue:23`, `radius.css:16/:21/:31/:34/:46`,
  sortable `:69/:76/:109/:117/:143` + `SortableList.vue:144`, `infinite-scroll.vue:72-78/:89`,
  `segmented.css:169/:306`); the F16 facade truth (index exports GlassTimeline+types only,
  `GlassTimeline.vue:2-4` delegates, `ContinuousTimeline.vue:3-4` composes, LOC
  232/349/214/436 + 2,254 total, README §Exports still false, test `:4`/`:226`); the F19/F20
  set (alert `index.ts:8/:11-18`, `Alert.vue:37`, wash 1px `glass.css:86`, `Toast.vue:80/
  :91-103`, `transitions.css:87+`, `DialogContent.vue:235/:458`); the F21 three-mechanism rim
  (`styles.css:14-35` conic exact, `:37-46`/`:49-59` linear+clip arms, builders `:43/:53/:89`);
  the F22 driver (`progress.vue:22-45` 120ms/+3/wrap `:29-32`, `:108-114`,
  `Progress.vue:157-158`); the F23 registers (`Slider.vue:14/:224/:286-293`,
  `Progress.vue:4/:59-62/:94-102/:169-171`, `ScrubberTimeline.vue:209` live); the F24 set
  (`Skeleton.vue:51-57/:59-63`, `scheme-motion.css:101/:106-107` = 0.3s/3s/5s,
  `literals.css:23-34` intent-quote verbatim); the F25 demo page (`:5-9` header comment, 3
  `<Dialog>` + 3 `<DialogContent>`); the F27 set (`overflow.css:50-59` FITS both-visible,
  `:62-70` overflow branch, the false "spec-forces… to a clip" comment VERBATIM at `:65-66`,
  `:83`, `useSelectionGroup.ts:183-186` `block:'nearest'`, `useDockOverflowFit.ts:38-41`,
  `shell.css` vertical scroll port `:250`); the F28 statics (`springs.vue:229-254` with
  `:231/:232-245/:248/:249` exact, both defaults `secondary` at `Button.vue:35` +
  `StoryPlayButton.vue:34`, `button/styles.css:40-50` deep-primary/resting-secondary, ladder
  radii 1/7/7/11/11 `glass.css:86-97`, five composed rungs `:138-153`, deep 16px
  `glass-deep.css:56` + `deep.css:78-79`, the 2dppx 17px arm `light-dark.css:36`,
  `--control-surface-blur` `:407`); F29 Configurator-grep-0 + `springs.vue:257/:345/:415`; F30
  `tempo.vue:47-53/:71-77`; `PagerDots.vue:326` ≡ `DeckGooFilter.vue:26` re-diffed IDENTICAL);
  ≈110 formation/waves pins (REGISTRY `:7/:148-152/:236-238/:293-296/:297-299/:327-329`; JUDGE
  `:21-25/:38/:94` + F13 grep-0; APPLYLOG F13 grep-0; BAND-STORY `:254/:321/:322/:323/:458-460/
  :462/:506-510/:527/:529` + W1=STORY-TAXONOMY `:51/:97`; BAND-MATERIAL `:29/:55/:131/:135/
  :170/:175/:203/:212/:270/:301/:336/:460/:474/:488-490/:503-510/:590-591/:665-666/:788/:793/
  :822-826`; BAND-FEEDBACK-MOTION `:57/:66/:82/:91/:102-103/:119/:126/:134/:141/:158-162/:165/
  :241/:250-251/:260-261/:318`; BAND-REDUCTION `:237/:416/:452-456/:508/:517-518/:638` + "F04
  shape" grep-0; BAND-GATES `:376-381`; BAND-DOC-TRUTH `:94` T33; GF-DOCK `:104-111/:204-206/
  :211/:217/:319/:322/:357/:388-389` + rail.vue grep-0; GF-AURORA `:163/:237/:315/:461` +
  Q-AURORA-QUARTET ×8; GF-HANDMARK `:208-211` + retired-gates grep-0; SUPERFLUITY `:227/:668/
  :674-675/:682-686`; PLAN `:83-84/:187/:195-196`; crosswalk `:23/:24/:28/:33-40/:43/:56-58/
  :213-216/:227-229` + RU-06 grep-0 in §Judgment corrections; FSF `:398/:550-554`; ledger
  C5/D1/E2 states verbatim; R3B-DIGEST `:50-57`; VISUAL-GESTALT `:10-12`; IOS27-CODEX law 12 at
  `:28` AT COMMITTED HEAD; all 20 in-scope FEEDBACK-LEDGER cells read in FULL at glyph grain;
  screenshot inventory exact — 14 in-scope PNGs present, F02/F06/F07/F08 absent as billed); the
  count-greps reproduced exact (filtered `text-(sm|xs)` = **234 = 218 demo + 16 src**; bare =
  **257 lines / 260 occurrences**; arbitrary `text-[…px|rem|em]` = **9 under the stated
  `--include` filter** — the unfiltered 10th hit is a `sizing.css` comment the method correctly
  excludes; raw `text-[` = **14 / 11 excl. `length:var`**); 16 git proofs (the parity diffs;
  `git show c368ccbc --diff-filter=D` = the four confirm-dialog paths + message quote verbatim
  incl. the paren; matching pathspec → c368ccbc + cbbaeb05 exactly; dead pathspec EMPTY;
  cbbaeb05 = the AV `src/confirm-dialog.ts` delete; c368ccbc + ef3ea646 both ancestor-of
  490cc46e; 490cc46e ships `--radius-field` + `tags-input/styles.css` untouched-since;
  ff69acd9 message incl. "inter-section gap"; 6f77ab12/1340a918/117b7f12/5f8ee2e3 dates+subjects;
  ASK-REDUCTION commit-stable at `4ab12128` with `:25/:171/:209/:265/:266/:267` exact); ~14
  sibling-census greps run fresh (completion-seal: speedtest ×0, sci-report
  `dashboards/home/gallery/CategoryHomeView.vue:4` + `GalleryView.vue:19`, atlas
  `completion.ts` + `category.ts` + compositor/preset refs; confirm-dialog: words ×5 at the
  exact five files, muster `App.vue:69` `import(` dynamic, value.js docs-only ×2 at the exact
  two paths, `words/frontend/vite.config.ts:218` — PLUS two hits the corpus never classifies,
  see R8A-3; instrument-chassis: speedtest ×4 subpath-import files exact + muster ×5 exact;
  fourier metric ×7 code files; speedtest `PhaseTimeline.vue:49` GlassTimeline import +
  MeterColumn comments-only).

## 1. Round-7 disposition re-check (the six tail-class minors)

No R8 fixlog exists; the bank ruled round 7 CLEAN (0/0) and dispositioned the minors uncured.
Per the charter, a disposition that holds is not a finding. All four A-scope dispositions
re-verified factually intact and still tail-class:

| r7 minor | state this seat |
|---|---|
| R7A-1 (J2 case drift) | HOLDS — `JUDGE.md:22-23` still lowercase "a different dock"; the corpus sites (`DOSSIER-F01-F10.md:221`, sidecar `:61`) still uppercase DIFFERENT mid-quote; substance identical, J2's application re-proven at source (postures section + backdrop disambiguation both re-derived) |
| R7A-2 (F23 routing mirror) | HOLDS — `REFABLE-RU-13-F21-F30.md:113` still reads "coverage PARTIAL per the RU-14 addendum below"; the pointer's destination (`:124-136` + `:174-179`) carries the R5 EXACT-pending-J12 state, so the delegation self-heals on read-through; dossier COVERAGE paragraph + summary cell re-verified correct |
| R7A-3 (F01 "always-on") | HOLDS — `AppShell.vue:147` `v-if="shellFieldActive"` + `router.ts:115-117` re-verified; the dossier still says "always-on" + `:147-156`; the R3b never-pauses-while-mounted evidence (`REGISTRY.md:327-329`) still grounds the perf claim; cannot misdirect |
| R7A-4 (F28 ladder pin) | HOLDS — `glass.css:138-153` still composes five rungs (wash/quiet/resting/floating/overlay), deep composed in `deep.css:78-79` from `glass-deep.css:56`, values at `:86-97`; the {1,7,11,16} = 4-distinct arithmetic re-proven TRUE; the pin still under-covers its parenthetical; verdict unaffected |

(R7B-1/R7B-2 — the F43 pin record and the F40/F41/F44 glyph demotion — live in F31-F50, seat
B's range; not re-judged here except that R8A-2 below finds the SAME glyph-demotion class
present in THIS range, which round 7's B-side enumeration explicitly scoped out.)

## 2. Findings

| id | severity | file | claim | evidence | required cure |
|----|----------|------|-------|----------|---------------|
| R8A-1 | MINOR | `redress/DOSSIER-F01-F10.md:299-300` (F07 REDRESS) + `refable/REFABLE-RU-13-F01-F10.md:43` (F07 row) | The dossier quotes PLAN §1 as "PERF W4 OWNS the F07 story-transition choreography; Family D consulted, not co-owner" inside quotation marks; the sidecar row endorses it "(PLAN §1 verbatim)" | On disk `PLAN.md:83-84` reads "…choreography (Family D consulted, not co-owner)." — the corpus swaps the paren construction for a semicolon inside quotation marks (the R6A-1/CRIT5B-3 species; the only other "co-owner" phrasing on disk, `BAND-PERF.md:450`, is a different sentence and not the cited source). Words and substance identical; the ownership claim itself re-proven true. Never caught in 7 rounds — the ring verified `:83` as an anchor destination but never glyph-diffed the quote | Re-take the quote verbatim ("choreography (Family D consulted, not co-owner)") at the dossier site; drop or qualify the sidecar's "verbatim" |
| R8A-2 | MINOR | `redress/DOSSIER-F01-F10.md:110` (F03) + `:150-152` (F04); `redress/DOSSIER-F11-F20.md:213-214` (F16) + `:321-322` (F18); `redress/DOSSIER-F21-F30.md:513-514` (F30) | The INVENTORY convention presents ledger cells verbatim inside italic quotation marks | Glyph drift inside quotation marks, five sites — the exact CRIT7B-2 species, which round 7 enumerated ONLY for F31-F50 ("all twenty in-scope ledger rows compared… every other INVENTORY quote is glyph-exact" was seat B's range; nobody ever swept F01-F30 at glyph grain). Inner double quotes demoted to singles: F03 (`'Most of this is worthless.'` vs ledger `"Most of this is worthless."`, `FEEDBACK-LEDGER.md:15`), F04 (`'This shape is to be abrogated'` vs `"…"`, `:16`), F18 (`'what of our grand pruning…?'` vs `"…"`, `:30`), F30 (`'What even is'` vs `"What even is"`, `:42`). Ledger BOLD dropped inside the quote: F04 (`**questions in reduction relayed to the user**` unbolded) and F16 (`**Redesign from the ground up.**` unbolded, `:28`) — real drift, not a rendering constraint: F09 and F23 keep their ledger bold inside the same italic-quote convention. All other in-scope cells re-compared glyph-exact (F01/F02/F05-F08/F09-F15 quote-or-paraphrase forms, F17/F19-F29 exact; the route-prefix fold in F24/F25/F26/F29/F30 is the corpus's stated anchor+quote composition convention, applied uniformly — not drift). Cannot misdirect — no grep keys on the glyphs | Re-take the five quotes with the ledger's double quotes + bold, or state the nested-quote/emphasis normalization once in each dossier's convention paragraph (the CRIT7B-2 cure shape — one disposition can cover both ranges) |
| R8A-3 | MINOR | `redress/DOSSIER-F21-F30.md:285-296` (F25 TARGET census) + `:302-308` (REDRESS figure); `refable/REFABLE-RU-13-F21-F30.md:57` (F25 row), `:104-107` (evidence-grain note), `:152-156` (R3 addendum) | "the fresh sibling census (this seat, `grep -rln "glass-ui/confirm-dialog"`) finds 6 LIVE import sites… value.js is ×0 live (the old pair are DOC references only…). The family-B relay carries the corrected 6-live + 1-config + 2-doc figure" | The quoted census command, run over the sibling repos, surfaces TWO more doc references the roster never classifies: `muster/docs/DESIGN_v2.md:187` + `muster/docs/DESIGN.md:101` both carry the `@mkbabb/glass-ui/confirm-dialog` literal verbatim (verified this seat). The 6-live half is EXACT (words ×5 + muster `App.vue:69` dynamic), the 1-config half EXACT (`vite.config.ts:218`), and the 2-doc arm correctly names value.js's pair — but as the census total it undercounts doc references 2 → 4, and the corpus's own F26 treatment shows the standard (it names atlas's extra compositor/preset references). SUPERFLUITY C-I (`:682-686`) shares the omission — lead-side, not chargeable to the ring. Cannot misdirect: doc references carry no break; the relay's blast-radius accounting (live + config) is exact and the relay files regardless | One clause widening the doc arm ("+ muster's 2 design-doc references, `DESIGN.md:101`/`DESIGN_v2.md:187`") or scope the census sentence to import/config surfaces |

## 3. What re-proved clean (the ratified spine, this pass)

Every mechanism-layer claim in scope re-verified at the byte-identical paint tree, now from the
COMMITTED corpus: the F17 chain end-to-end (utilities-layer `rounded-none` beating the
components-layer `--radius-2xl`; zero re-chroming rules; the PLAN `:195-196` +
`crosswalk:227-229` false-premise residue still live exactly as the docket says); the F04
corrections (the `slice(0, 4)` icon census EXACT against the 8-entry roster — and the
neighboring `slice(0, 5)` section probed as a potential counterexample and cleared: 6 icons,
bare backdrop, not "home + four"); the F05 disambiguation (overview's DockStage at `:118` vs
rail's bare postures div; ONE `<Aurora>`); the F08 WGSL alias verbatim + 17 presets + the
fallback-arm comment — the refresh figures (17→11, three-arm W4, Q-AURORA-QUARTET ×8, C-H
~11-not-10) all live at the GF-AURORA pins; the F16 facade truth (delegation imports on disk;
README §Exports still false; T33 standing at `BAND-DOC-TRUTH.md:94`); the F21 three-mechanism
rim + both builders; the F22 120ms-vs-300ms interruption + the `>=100 → 0` wrap; the F24
5s-via-token + the ladder's fast-rung intent quote VERBATIM at `literals.css:26`; the F25
corrected archaeology re-run from scratch (all five git facts, message quote paren intact —
the R7 cure survives its second hostile re-proof); the F26 census re-proven at the exact
consumer pins (fourth-plus verification); the F27 computed-auto mechanism (FITS both-visible,
the false "clip" comment verbatim, `block:'nearest'`, the vertical-only measure, the
by-design vertical scroll port at `shell.css:250`); the F28 all-7px statics (both defaults
`secondary`; deep unreachable in-frame; the STRUCK sentence at `BAND-MATERIAL:270` + `:788`);
the F29 grep-0 born-RED; the F30 mount-scoped root-write. The JUDGE-2 docket's ten states all
re-proven at HEAD: rows 1/3/6/10 LIVE exactly as stamped (F13 grep-0 in JUDGE+APPLYLOG;
GF-DOCK rail.vue grep-0 + §4.1 still citing the block-overflow measure + `overflow.css:65-66`
unchanged; crosswalk `:56-58` still citing G-CONTAIN-class gates + zero RU-06 in §Judgment
corrections + retired gate names grep-0 in the RU-06 charter + the live wave map at
`GF-HANDMARK:208-211`); the consumed rows' band evidence verbatim (`BAND-MATERIAL:55/:488-490/
:503-510/:793`; `BAND-FEEDBACK-MOTION:134/:158-162/:241/:250-251/:260-261`;
`BAND-REDUCTION:237` + "F04 shape" grep-0; T33); row 9's goo-clone identity re-diffed
byte-identical. The five count-greps reproduce exactly under their stated methods — including
the arbitrary-9, where the unfiltered 10th hit (a `sizing.css` comment) validates the
`--include` filter as load-bearing rather than falsifying the figure. C5 still enumerates rows
5+9 only; D1/E2 still PENDING. The R5/R6/R7 re-anchor sweeps' destinations all land where
billed (`:131/:170`, `:322/:323`, `:398`, `:57/:82`, `:217/:322/:388`, `:265`). The screenshot
inventory is exact. No ownership move, no ruling contradiction, no coverage overstatement, no
wrong consumption stamp, no dead reproducible command found anywhere in scope.

## 4. Disposition (PROPOSE only — the lead applies)

| artifact | BLOCKER | MAJOR | MINOR | verdict |
|---|---|---|---|---|
| DOSSIER-F01-F10 (+ sidecar) | 0 | 0 | 2 (R8A-1; R8A-2 share: F03/F04) | CLEAN at the ring's severity bar; tail sweepable |
| DOSSIER-F11-F20 (+ sidecar) | 0 | 0 | 1 (R8A-2 share: F16/F18) | CLEAN at the ring's severity bar; tail sweepable |
| DOSSIER-F21-F30 (+ sidecar) | 0 | 0 | 2 (R8A-2 share: F30; R8A-3) | CLEAN at the ring's severity bar; tail sweepable |

**0 BLOCKER / 0 MAJOR / 3 MINOR.** Under the convention the lead set at the round-7 bank
(CLEAN = 0 blockers / 0 majors; tail-class minors dispositionable), seat A's round 8 is
**CLEAN — the second consecutive**. The three MINORs are the same tail species round 7
dispositioned: two quote-fence drifts (one source-quote paren swap; five ledger-glyph sites of
the CRIT7B-2 class in the range seat B's enumeration explicitly did not cover) and one census
doc-arm undercount whose load-bearing halves are exact. None can misdirect a BJ wave. Whether
they are swept in a single fix pass or dispositioned alongside the round-7 set is the lead's
call; nothing here re-opens the ring.

**CROSS-LANE note (routed to the lead ledger, not a finding):** the uncommitted IOS27-MICRO
pass-3 edit to `formation/ios27/IOS27-CODEX.md` (working tree only at `dcb2832a`) inserts a
CORPUS-REDO bracket into law 11, shifting law 12 from `:28` to `:29`. The corpus's law-12 pins
(`DOSSIER-F21-F30.md` F21 REDRESS; `REFABLE-RU-13-F21-F30.md:53`) are TRUE at committed HEAD
and flip only under that edit. When the pass-3 codex commit lands, the F21 law-12 pin (and any
law-pinned cite in seat B's range) needs a one-line re-anchor sweep.

*End — RU-14 CRIT8-A. One file under `formation/refable/`; no `src/`/`demo/` edits, no commit.*
