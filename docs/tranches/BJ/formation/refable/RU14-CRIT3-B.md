# RU-14 — redress twice-critique redo, pass 3 — seat B (F31-F50 + A01-A17)

- **modelId (verbatim from system context):** `claude-fable-5`
- **Charge:** fresh critic over `redress/DOSSIER-F31-F40.md`, `redress/DOSSIER-F41-F50.md`,
  `redress/DOSSIER-A01-A17.md` + their `refable/REFABLE-RU-13-*` sidecars, as amended by the
  RU-14 R3 fix seat (`RU14-FIXLOG-R3.md`). I authored none of them and none of the ring history;
  every claim — including every R3 cure — was presumed wrong until re-proven on disk.
- **Verification base:** HEAD `485891a2` (master). Tree parity RE-PROVEN this seat:
  `git diff --stat 55f5170d..HEAD -- src/ demo/` is EMPTY — the paint tree every pass judged is
  byte-identical to today's. The operative docs state is the WORKING TREE (the R3 fixes are
  uncommitted `M` on all six corpus files), and TWO CONCURRENT sessions are also writing:
  IOS27-MICRO (out of scope) and a refable seat rewriting `waves/BAND-A11Y.md`,
  `waves/BAND-COLOCATION.md`, `waves/BAND-DOC-TRUTH.md` (mtimes 13:52-13:58, uncommitted) — the
  last of these falsifies two in-scope grep claims in flight (findings 4-5).
- **Anchors re-proven on disk this seat: ~115.** The full `brush.ts` register (13 value pins),
  `useHandMark.ts:113`, `HandMark.vue` (:272/:290-291/:312-316/:327/:331-339/:340-343/:349-353 —
  one off-by-one found, finding 2), `paper.css:124-126`, `ink.ts:195+`, `geometry.ts:143+`, the
  demo `handmark.vue` caption/spec sites (:24-26/:37/:50-51/:53/:66-67/:72-74/:105-110/:117-120/
  :148-151), `typewriter.vue:92-99/:103`, `text-motion.vue:11-16`, `curve-gallery.vue:189-200`,
  `EasingPicker.vue:327/:336/:345` + 518 lines, `settings.vue:29-30/:201/:209` dead knobs,
  `auth-shell.vue:27/:38-42/:64-69/:207-209` + last-touch commits both 07-16,
  `gate-pattern.vue:119/:143-150/:156-158`, `field-control.css:34/:37-48`,
  `radius.css:32-34/:141`, `SectionPreviewCard.vue:17-19/:63-65/:87-92`, `storyTile.ts:41+`, the
  4-file `.tile.vue` census (exact), `intro.vue:53/:79-82`, `BottomDock.vue:17-22/:42/:65-68/
  :161-252`, `overflow.css:62-64/:76-78/:91+` + `scroll-snap-type` grep-zero,
  `useSelectionGroup.ts:183-186`, the blur ladder 1/7/7/11/11/16 + 2dppx 17
  (`glass.css:86-97`, `glass-deep.css`, `light-dark.css:36`), `--glass-halo-*` 20px/13rem/7rem
  (`glass.css:171-173`), `ModalOverlay.vue:49/:98`, `DialogContent.vue:466+`, `placement.css`
  FORM-2 intersect, `PRESETS` = 17 exact (:685-703), `applyMedium` 3/5/6/7→Kuwahara
  (`aurora-mediums.wgsl.ts:387-403`), `AppShell.vue:11/:21-23/:26`, `aurora-hero.ts:15-16`,
  `Slider.vue` 651 / `DeckPager.vue` 47 lines, `deck.vue:19-20/:31/:90/:127`,
  `PagerDots.vue:326` ≡ `DeckGooFilter.vue:26` (byte-identical `d`), `CarouselContent.vue:4-8`,
  `Blob.vue:354` shadow pair, engage-surface grep-zero in `src/`, `button/` breath grep-zero,
  the full 108-hit src `breath` grep (finding 1), GF-HANDMARK (retired gates grep-zero, wave map
  W0-W5 at :206-213, :31/:126-129/:158-159/:240/:248/:250), GF-DOCK (:52-54/:115/:180/:217/
  :318-322/:357-389, retired gate names grep-zero), GF-BLOB :255-257/:284, GF-AURORA
  :163/:170-172/:237/:314-315/:461 + Q-AURORA-QUARTET ×8, FSF :224/:257-258/:413/:421/:427-429/
  :436-437/:588, BAND-STORY :155/:195-197/:245/:269/:506-507/:545-547/:582-583/:590,
  BAND-MATERIAL :75/:111-115/:295/:509, BAND-FEEDBACK-MOTION :98/:130+, BAND-REDUCTION
  :66-67/:73-76/:161/:285-286/:306-307/:359, ASK-REDUCTION :120/:148/:190/:227, BAND-PERF
  :40/:70-72/:92-96 (74 files/770KB/317KB), SUPERFLUITY :110-112/:227/:632/:659/:668-672/:674/
  :682-687, REGISTRY :66-67/:174, CHRONIC :5/:22-25/:76 ("Re-booking count in BJ: ZERO"),
  crosswalk :56-62 (retired names stand)/:231-233 (COUNTS still 50+5+3+10"=67")/:237,
  BI.W-ENGAGE-AFFORD :31/:293/:297-298/:528-529, FEEDBACK-LEDGER 6 rows, RF-5 OW-1/OW-3/R-1/R-5
  (quotes verbatim), RF-4 :43/:46/:84, RF-1 :74, CENSUS-CLASSIFICATION :154, model-census 349
  seats / 332 `claude-opus-4-8`, JUDGE J1/J3/J5/J9/J11/C-D, IOS27-CODEX laws 1/12,
  BAND-COLOCATION (rewritten in-flight — W-COLO-1/2/3 + G-BARREL-REACH + the 8.0.0 ride ALL
  survive; the four COLO-1 move-targets live), `src/components` = 68 entries / 66 dirs / 2 files
  enumerated, the six cure commits' `merge-base --is-ancestor` vs `v7.0.0` (all YES; tag
  `4ab12128` 07-17 18:11), `7746d586`/`5c847780` 01:32 + `117b7f12` 06:43, the F50 trio subjects
  (mint/halo/test verbatim), the JUDGE-2 docket rows 1-10 + count language in all three host
  dossiers, manifest `pageType` grep-zero, src root listing, feedback PNGs on disk, R3B-DIGEST
  on disk.

## §1 — R3 cure verification (all six in-scope CRIT2-B cures + the shared docket)

| CRIT2-B finding | cure state this seat | evidence |
|---|---|---|
| MAJOR-1 (crosswalk half unowned) | **LANDED** | Docket row 10 seated (`DOSSIER-F11-F20.md:454`) with a true state-at-HEAD column (crosswalk :56-62 re-proven unchanged; §Judgment corrections :237 carries no RU-06 item; live map :208-211 correct); sidecar addendum present (`REFABLE-RU-13-F31-F40.md:112-116`). The fence held — no crosswalk edit. |
| MAJOR-2 (F33 docket pointer false) | **LANDED** | Row 9 seated (`DOSSIER-F11-F20.md:453` — the full clone-file roster + the §C1/§C3 refresh, evidence column re-proven: `PagerDots.vue:326` ≡ `DeckGooFilter.vue:26`, FM W6 :130+ sequences only the DeckPager cut); both F33 texts pin "row 9, seated RU-14 R3" (`DOSSIER-F31-F40.md:242-243`; sidecar :102/:108-111). The pointer is now true. |
| MINOR-3 (8+1=9 ≠ 10) | **LANDED** | `DOSSIER-F31-F40.md:585` reads EXACT 9 / PARTIAL 1; the coverage table carries exactly ten rows, nine EXACT-flavored + F33 PARTIAL — re-counted. |
| MINOR-4 (A05 68-dirs conflation) | **LANDED** | `DOSSIER-A01-A17.md:128-129` "66 component dirs — 68 entries counting the 2 files" + summary row :447; re-counted this seat: `ls` = 68, `find -maxdepth 1 -type d` = 67 incl. root, the 2 root files are exactly `PROCEDURAL-SUITE.md` + `index.ts`. |
| MINOR-5 (A09/A16 vs RF-5 uncross-referenced) | **LANDED** | A09 rider :234-240 + A16 rider :406-411 + sidecar addendum :127-140; RF-5 OW-1 (:49 — 50+5+3+10 = 68, honest partition 50/5/2/10, V-A95 category error) and OW-3 (:51 — "never drafted and will never execute") re-read verbatim; the COUNTS line re-proven still standing at `ASSEMBLY-CROSSWALK.md:231-233`. One rider phrase is already rotting in flight — finding 5. |
| MINOR-6 (bare `useHandMark.ts`) | **LANDED** | Header list `:22` reads `composables/useHandMark.ts`; F34/F37 targets carry the full `src/components/handmark/composables/useHandMark.ts:113`; `:113` re-proven exact. |
| CRIT2-A MAJOR-1 spillover (docket count language) | **LANDED** | "ten-item"/"all ten" consistent across `DOSSIER-F01-F10.md:457-459`, `DOSSIER-F11-F20.md:429-436`, `DOSSIER-F21-F30.md:589/:598`; no stray "seven-item" remains outside the historical parentheticals. |

**Refutations of the fixlog: zero.** Every pin the fixlog cites in my scope resolved exactly.

## §2 — Findings (fresh hunt; pass-1/pass-2 read only after the independent sweep)

| id | severity | file | claim | evidence | required cure |
|----|----------|------|-------|----------|---------------|
| CRIT3B-1 | **MAJOR** | `redress/DOSSIER-A01-A17.md:263-264` (+ `refable/REFABLE-RU-13-A01-A17.md:48`) | A11 CORRELATION: "every 'breath' grep hit in `src/` is a padding metaphor, not motion" | **False at HEAD, and false at every prior pass (tree parity holds since `55f5170d`).** `grep -rin breath src/` = 108 hits, dozens of them MOTION registers: aurora's `still \| breathing \| drifting` axis + `breathDepth`/`breathPeriod` shader luminance wobble (`atoms-fields.ts:17,:59-60`, `aurora.wgsl.ts:368-370`, `aurora.frag.ts:409-411`), the blob's de-synced `fn breath()` pulse (`metaball.frag.ts:70-94`, `metaball-palette.wgsl.ts:53-54`), LiquidGrid's "slowly breathing" sheet (`LiquidGrid.vue:10`), watercolor-dot "organic breathing" (`useWatercolorBlob.ts:38`), the waveField "breathing swell" (`waveField.ts:352`). These are exactly the "live substrate fields" the row's OWN next sentence credits as satisfying the edict (R3B-DIGEST) — the evidence sentence contradicts the row's own check line. The A11 substance survives intact: `button/` breath grep = 0, the atoms ARE inert, J1/`BJ.W-IDLE-BREATH` unaffected. Both prior ring passes endorsed the false sentence (the RU-13 sidecar ratified-table row repeats it; CRIT1-B and CRIT2-B re-proved around it without running the grep). | Rewrite the parenthetical in both files to scope the claim honestly — e.g. "zero idle animation in the atom families (`button/` breath grep = 0); the src-wide breath vocabulary lives in the procedural substrates the R3b check already credits" — no verdict change. |
| CRIT3B-2 | MINOR | `redress/DOSSIER-F31-F40.md:397-399` | F37 TARGET pins `HandMark.vue:291` = `pathLength="1"` and `:292` = `vector-effect` | Off by one on disk: `pathLength="1"` is `:290`, `vector-effect="non-scaling-stroke"` is `:291` (grep-verified; the file is unchanged since `55f5170d`, so the pin was wrong at write and was repeated as "re-proven" in BOTH prior passes' anchor inventories — a ring miss). The sibling pins (:272, :349-353) are exact. | Re-pin `:290`/`:291` in the F37 TARGET. |
| CRIT3B-3 | MINOR | `redress/DOSSIER-A01-A17.md:317` | A13: "the `presets.ts:73-77` 'each authors its own body' comment describes the WebGL2 arm only" | Wrong file in context: the same row pins `demo/stories/substrates/aurora/presets.ts:685-703` two clauses earlier, but `:73-77` in THAT file is a palette-stop list. The comment lives at `src/components/aurora/constants/presets.ts:73-78` ("Each authors its own shader body with no shared dispatch" — content re-proven, and it does describe the per-dab arm the WGSL primary aliases away). Same bare-path class as RU14-8/MINOR-6; inherited verbatim from the RU-13 F01-F10 sidecar (whose dossier carries the sibling bare cite at `DOSSIER-F01-F10.md:316` — seat A scope, flagged for the lead). | Full-path the cite to `src/components/aurora/constants/presets.ts:73-78`. |
| CRIT3B-4 | MINOR | `redress/DOSSIER-A01-A17.md:352` (+ `refable/REFABLE-RU-13-A01-A17.md:78,:105`) | A14/N2/FLIP-2: the suite-doc truth-up is "owned by NO wave (zero hits in `waves/`)" | **True at committed HEAD, falsified in flight by a concurrent seat:** the uncommitted `waves/BAND-DOC-TRUTH.md:133` (mtime 13:58) now records "`src/components/PROCEDURAL-SUITE.md` LiquidGrid row — routed to `BAND-REDUCTION` W3 scope (RU-13 FLIP-2, cheapest cure)". The gap narrows but does not close: `BAND-REDUCTION` W3's own charter text still carries zero PROCEDURAL-SUITE mention (grep re-run), so the edit is routed-but-not-yet-chartered. FLIP-2 still reads as a fully open lead ask. | When the BAND-DOC-TRUTH edit commits: stamp FLIP-2 CONSUMED-with-pointer (routing recorded; residual = the W3 charter line) in the sidecar + a dated rider on the A14 flag. No text change owed while the edit is uncommitted — recorded here so the closure is not silent. |
| CRIT3B-5 | MINOR | `redress/DOSSIER-A01-A17.md:235-236` (+ `refable/REFABLE-RU-13-A01-A17.md:94`) | A09 R3 rider: fam-I evidence "grep-zero in PLAN and all nine bands" | Same in-flight rot, same concurrent edit: uncommitted `waves/BAND-DOC-TRUTH.md:121` (row T40) now names the `CHRONIC-ADJUDICATION.md:5` "DECIDED-rows wave" phrase as a doc-truth target, deferring disposition to "the lead's FLIP-1 ruling (RU-13-A01)". The substance is untouched — no band CHARTERS such a wave (T40 is a phrase-correction row that cites FLIP-1 itself), and the sidecar's stricter formulation ("all nine band files carry NO such wave") stays true. Only the dossier rider's "grep-zero" phrasing rots on commit. | Same vehicle as CRIT3B-4: on commit, soften the rider to "no band charters the wave (BAND-DOC-TRUTH T40 tracks the phrase, deferring to FLIP-1)". |

## §3 — What held (the ratified spine)

Everything else re-proved true on disk, including the entire R3-new text layer (the docket rows
8-10, the A09/A16 riders, the A05 count base, the F33 pointers, the re-tallied totals — the
least-critiqued surface and this pass's prime hunting ground). Specifically re-proven: the
F34-F40 SUPERSEDED-BY-RU-06 read-through table's every GF-HM anchor (wave map W0-W5, NO-blend-modes
law, ONE pen voice, Q-HM-1/2, the π-BAND invisibility probe); the FLIP-1/FLIP-2 closures
(CONSUMED-BY-RU-06 — the residual pre-RU-06 language inside the F36/F37 row bodies stays covered
by the range-header stamp, the convention both prior passes accepted; not refiled); the F47
re-map's every GF-DOCK anchor including §4.4 at `:180` (the dossier's pin is right; CRIT2-B's own
anchor list said `:182` — the critic drifted, not the corpus); the F45/F48/F50 commit dating by
independent ancestry; the F43 dating (rework commits both 07-16, corpus 07-17); the F41 site +
wrap rider; the F44 dead knobs; the F46 double-card + 4-tile census + the PERF W1 numbers
(74 files / ~770 KB / 317 KB); the F42 composable rosters (non-exhaustive listings, all named
files live); the whole A-dossier correction layer (A15 332/349, A01/N5 engage grep-zero, A02
census, A05 counts, A07 move-targets + the COLO waves surviving the in-flight BAND-COLOCATION
rewrite, A16's re-booking-ZERO pin at CHRONIC:76, A17 barrel-drag). Coverage accounting sums in
all three dossiers (10 = 9+1, 10 = 10+0+0, 17 = 15+2 flips). No J1-J11 ruling is contradicted
anywhere in scope; nothing is smuggled — every supersession is named in prose and sidecar.

## §4 — Disposition

| artifact | BLOCKER | MAJOR | MINOR | verdict |
|---|---|---|---|---|
| DOSSIER-F31-F40 (+ sidecar) | 0 | 0 | 1 (CRIT3B-2) | AMEND (cosmetic re-pin) |
| DOSSIER-F41-F50 (+ sidecar) | 0 | 0 | 0 | **CLEAN — second consecutive clean pass** |
| DOSSIER-A01-A17 (+ sidecar) | 0 | 1 (CRIT3B-1) | 3 (CRIT3B-3/4/5) | AMEND |

No BLOCKER. All six R3 cures landed whole — the fixlog's claims survive a hostile re-proof with
zero refutations. The one MAJOR is not R3's: it is an RU-13-era evidence sentence (the A11
src-wide breath grep) that is false on disk and was carried as re-proven through both prior ring
passes; its cure is a two-file parenthetical rewrite with no verdict movement. Two of the four
MINORs are not defects of the corpus at its write time at all but in-flight rot from a concurrent
uncommitted `BAND-DOC-TRUTH.md` edit that is CONSUMING the dossier's own FLIP-1/FLIP-2 asks —
recorded here so the closure lands stamped, not silent. Consecutive-clean at the ring layer:
F41-F50 has it (CRIT2-B + this pass); F31-F40 and A01-A17 do not.

*End — RU-14 pass 3, seat B. One file; no `src/`/`demo/` edits, no commit.*
