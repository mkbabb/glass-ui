# RU-14 — redress critique, ring round 8 — seat B (F31-F50 + A01-A17): the second-consecutive-clean gate

- **modelId (verbatim from system context):** `claude-fable-5`
- **Charge:** fresh adversarial critic over `redress/DOSSIER-F31-F40.md`,
  `redress/DOSSIER-F41-F50.md`, `redress/DOSSIER-A01-A17.md` + their `refable/REFABLE-RU-13-*`
  sidecars. Corpus presumed wrong until re-proven — including every surviving prior-round fix.
  Ring history CRIT1..CRIT7 + FIXLOG-R3..R7 read from disk; nothing inherited.
- **Verification base:** HEAD `dcb2832a` (master). NEW this round: the corpus is COMMITTED at
  HEAD — `dcb2832a` banked the six dossiers + six sidecars + the CRIT6/CRIT7 pairs + the R6/R7
  fixlogs (18 BJ files), and `git status` shows the redress/refable corpus clean. Parity
  re-proven this seat, not inherited: `git diff --name-only 02e322f1..HEAD -- src/ demo/` =
  EMPTY (the two commits past the round-7 base are `f44224df`, IOS27-MICRO corpus-redo docs
  only, and `dcb2832a`, the BJ ring journal) and `git log 55f5170d..HEAD -- src/ demo/` = EMPTY
  — the paint tree every prior round judged is byte-identical at today's COMMITTED HEAD. The
  ONE working-tree modification under `formation/` is `ios27/IOS27-CODEX.md` (the concurrent
  IOS27-MICRO pass-3 lane, uncommitted — OUT OF SCOPE per the fence); all codex claims below
  were judged at `git show HEAD:` and the uncommitted diff does NOT touch the evidence-basis
  line, so no in-scope claim flips under it — no cross-lane note owed.
- **Anchors re-proven on disk this seat: ~250.** Src/demo (~120): `brush.ts` ×20 (pen
  6/:111/0.7/1.2 · boil 7/:140/hull/0.9/1.4 · pencil 3/:160 · crayon 16/:184/3.0/:198 · ring
  5/:213/grain 0.7/:222 · marker 12/:235 · highlighter 26/:262/hull/:266/0.38/:267), HandMark
  ×10 (:272 none-stretch/:290 pathLength/:291 non-scaling/:312-316 C-1(e) verbatim/:327
  overflow/:331-339 z −1/:340-343 multiply/:349-353 dash), `useHandMark.ts:113` exact,
  `paper.css:124-126` isolation, `geometry.ts:143-167` box+bracket, `ink.ts:195-215` se-guard,
  demo `handmark.vue` ×10 (captions :26/:51/:67/:119-120/:150-151 verbatim; sections
  :23-33/:36-46/:53/:72-74/:84-95/:105-110 with `:box=` at :109), EasingPicker 518 lines +
  :1-2/:327/:336/:345 (38cqi verbatim; container-type grep 0), EasingConfigurator :1-13,
  curve-gallery :189-202 (:191/:193/:194/:195-200), the goo-clone identity re-diffed
  (`PagerDots.vue:326` ≡ `demo/stories/motion/deck/DeckGooFilter.vue:26`, `d` byte-identical)
  + the full clone set on disk (`useDeckGoo.ts`/`gooBarbellGeometry.ts`/`DeckGooFilter.vue`
  under `demo/stories/motion/deck/`; `tests/components/custom/deck/DeckGoo.private.test.ts`),
  `CarouselContent.vue:4-18` (:8 "A metaball-merge is the INDICATOR's job (the pager worm," +
  :17 "the ONE metaball morph" — both verbatim), deck.vue :19-20/:31/:90/:127, DeckPager 47
  lines, `usePagerWorm.ts`, Slider 651 + :420-424 box-INVIOLATE, typewriter :87-111 (:103 the
  install string verbatim; :92-99 no-nowrap container), text-motion :11-27, auth-shell
  :27/:38-42/:64-69/:90-94/:97-112/:207-218 + the three credential strings + the :193
  "always paints" comment, settings dead knobs (:29-30/:201/:209 vs :52-75 no consume),
  gate-pattern :119/:143-150/:156-158, field-control :34 pill/:37-45 comment/:46-48 rule/:49
  blank, radius.css :32-34/:141 "MATCH THE CARD", glass.css :86-97 (1/7/7/11/11)/:138-155/
  :171-173 (20px/13rem/7rem), glass-deep 16px, light-dark.css:36 17px inside the 2dppx arm,
  ModalOverlay :49/:98, DialogContent :466-473, SectionPreviewCard :17-19/:23-33/:35/:63-65/
  :87/:88/:89-92, storyTile :41-51, the `.tile.vue` census = 4 exact by find, BottomDock
  :17-22/:42/:65-68/:159+/:184-196/:221+, overflow.css :50-59 FITS/:62-64 auto/:76-78 gutter/
  :91-97 mask + scroll-snap-type grep 0, useSelectionGroup :183-186, useDockOverflowFit
  :38-41, AppShell :11/:21-23/:26/:146-147 (`v-if="shellFieldActive"`)/:154, router :115-117,
  aurora-hero :15-16, 17 presets exact (:686-702 SETTING_SUN…SPEEDTEST), `applyMedium` at
  `constants/shaders/aurora-mediums.wgsl.ts:387-403` (3/5/6/7 → `mediumKuwahara` verbatim),
  `constants/presets.ts:73-78`, Blob.vue:354 ambient+contact, reveal = 7 files / scroll = 7
  files + both demo pages' section spines, manifest `pageType` grep 0, engage-surface grep 0
  (`--scale-engage`/`.engage-grow`/`useEngageModal`), breath 108 src-wide / 0 in `button/`,
  src root listing exact (7 entries), src/components 66 dirs + 2 files, purge targets ×4 +
  COLO-1 move targets ×4 all present. Formation (~130): FEEDBACK-LEDGER :43-62 all twenty
  in-scope rows read against every INVENTORY quote; crosswalk :53-72 all twenty flags + :65
  "regardless" verbatim + :217-220 "buttons ranked first" verbatim + :231-233 COUNTS still
  50+5+3+10 "(= 67" on disk; BAND-STORY :174-177 (W1 prose)/:196 (W2 heading)/:254-256 (gate
  rows)/:307/:325/:633/:672-673/:679; BAND-MATERIAL :146-149 J5-class quote VERBATIM incl. the
  `:47-49` band grain/:52/:60/:78-79/:94/:135/:160/:333-335/:458/:567/:592-594; BAND-REDUCTION
  :279-280 truth-up quote VERBATIM/:299-304 useStagger OVERTURN (ResultStack.vue:171 +
  useResultReveal.ts:36)/:52-54/:88-93/:638-648 W8/:677 W9/:701-702/:738-740 close items 4-5/
  :76-77/:287-290/:411; BAND-FEEDBACK-MOTION :40/:53/:189/:241/:250-251/:260-261/:278;
  BAND-COLOCATION :38-39/:91/:102/:284-288/:326; BAND-DOC-TRUTH :48/:112/:121 T40/:133-134;
  BAND-PERF :43/:88-90 (74 eager ≈ 770 KB + 317 KB)/:92-96 (277KB at :94)/:475/:516;
  ASK-REDUCTION :120/:148/:190/:227/:265 + untouched-since-`4ab12128`; GF-HM 265 lines +
  :16-17/:31/:126-129/:136-143 (choreography at HEAD — the F34/F40 row-body pins there are the
  dead pre-RU-06 layer, read through the header table as prescribed)/:158-165/:207-212/:240/
  :248/:250 + retired gates grep 0; GF-DOCK :52-54 law 14 verbatim/:115-118/:180 §4.4/:217
  RED/:318/:322/:363-367/:369-372 G-REACH RED VERBATIM/:388-389 + retired names grep 0 +
  last-commit `117b7f12`; GF-BLOB :255-257 §2.9/:284; GF-AURORA :168/:237/:314-315/:461; FSF
  :224/:256-259/:413/:421-422/:427-429 AMEND-D-6 verbatim/:436-439 AMEND-D-8 verbatim/
  :588-592 G-COPY-LINT; JUDGE :21-25 (J2 lowercase on disk)/:38 (J5 original class); CHRONIC
  :5/:22-25/:76; IOS27-CODEX at COMMITTED HEAD (46 lines; :4 RU-16 provenance; :5 evidence
  basis in full incl. the exclusion fragment verbatim + the law-11 dot-lattice routing; :14
  law 4 with the Proportion clause verbatim; :26 law 10; :41-46 six BEST vectors; laws 1/12
  survive for F49/F50; `sr-0710` cited ×4 in the laws); MARKS-A/B video rosters read row-by-row
  (A V1-V3 + the .mov pair; B V1-V4) + both `verified-model: claude-fable-5` stamps;
  refable-timelines = 10 files (9 videos + stills) + the `sr-0710-1626.md` header ("iOS 27
  reference timeline", 1206x2622); RU-15 :3-4; `REFABLE-RU-16.md` extant; REGISTRY :66-67
  (298/408)/:175 family-I charter; PROCEDURAL-SUITE :11/:57-59 LiquidGrid; ADJUDICATION-1
  :9/:49 verbatim; LEAD ledger A2 APPLIED `dda87dcc` / C5 rows 5+9 / E1 PENDING / E2 PENDING /
  H2 WAITING; model-census = 349 seats, 332 opus + 15 fable; BI.W-ENGAGE-AFFORD
  :31/:293/:528-533; R3B-DIGEST :7/:45/:69-71 (1.0→1.015 verbatim); RF-1 :74 in full
  ("state its counting base"); RF-4 :43/:46/:84; the JUDGE-2 docket rows 9/10 seated in
  DOSSIER-F11-F20 (:446/:479); PLAN §3 challenge law (:297); Downloads corpus re-censused
  file-for-file (31 items = 9 video files (7 MP4 + the .mov pair) + 22 stills (6 IMG + 14
  screenshots + images-2.jpeg + the liquid-metal texture)); the bi-addenda exemplar set
  (research/harden/tranche-write + 4 critiques + formation-repair-r1) + openai-popup-1/2.png
  on disk; 20 commits re-read (dates + subjects: `63239549` 07-18 01:01 "13 opus laws to 18
  Fable laws", `f9813c97`, `2a4c38d4`, `dda87dcc`, `5f8ee2e3`, `923c5254` 07-17 10:02,
  `2764f60b` 03:07, `58fba6e6` 10:02, the `24b63d01`/`189ae15c`/`71892b9e` 11:14 trio,
  `490cc46e`/`2d804ce6` 07-16, `26a81929`, `2d1584a5`, `7746d586` 01:32, `117b7f12` 06:43,
  `5c847780`, `1340a918`, `ff69acd9`) + all six rounding/halo commits ancestor-of-`4ab12128`
  by `merge-base`, re-run.

## §1 — Round-7 disposition re-check (six minors, dispositioned tail-class at `dcb2832a`)

| disposition | state this seat |
|---|---|
| R7A-1 (J2 "DIFFERENT dock" case drift, F01-F10 pair) | **HOLDS.** `DOSSIER-F01-F10.md:221` + sidecar `:61` still uppercase DIFFERENT mid-quote; `JUDGE.md:22-23` still lowercase on disk. Fact pattern unchanged, substance intact — accepted-tail as dispositioned |
| R7A-2 (F23 routing-cell mirror, F21-F30 sidecar) | **HOLDS.** `REFABLE-RU-13-F21-F30.md:113` still reads "coverage PARTIAL per the RU-14 addendum below"; the addendum it delegates to still carries the EXACT-pending-J12 grade. Self-healing delegation as dispositioned |
| R7A-3 (F01 "always-on" vs the `v-if`) | **HOLDS.** Dossier text unchanged (`:49-50`/`:58`); on disk `AppShell.vue:147` `v-if="shellFieldActive"` + `router.ts:115-117` unchanged; the R3b never-pauses-while-mounted reading still true. Accepted overstatement as dispositioned |
| R7A-4 (F28 blur-ladder pin `:138-153`) | **HOLDS.** `DOSSIER-F21-F30.md:441` unchanged; ladder values and the deep/2dppx satellites re-proven where they live. Accepted under-covering pin as dispositioned |
| CRIT7B-1 (F43 pin record out of range) | **HOLDS.** `DOSSIER-F41-F50.md:181` still pins `BAND-STORY.md:174-177,196`; at HEAD `:174-177` is still W1 paint-parity prose, `:196` still the W2 heading, the credentials text still at `:254-256`; the movement record still lives ONLY in `REFABLE-RU-13-F31-F40.md` (R5 addendum). Owner + born-RED + the crosswalk "regardless" routing all live — accepted-tail as dispositioned |
| CRIT7B-2 (three inner-quote glyph demotions) | **HOLDS.** F40 `'SE'` / F41 `'wtf …?'` / F44 `'Wtf even is'` all still demoted against the ledger's doubles (ledger rows :52/:53/:56 re-read); words/order/punctuation otherwise exact. Accepted-tail as dispositioned |

**No disposition dodges.** None of the six worsened, none conceals a higher-severity defect, and
the round-7 CLEAN call (0 blockers / 0 majors) reproduces from the disk evidence.

## §2 — Findings

| id | severity | file | claim | evidence | required cure |
|----|----------|------|-------|----------|---------------|
| CRIT8B-1 | MINOR | `redress/DOSSIER-A01-A17.md:79-91` (A02 R7 rider) + `refable/REFABLE-RU-13-A01-A17.md:40` (basis row), `:229-241` (R7 addendum) | The rider's two-layer census does not reconcile, and the irreconcilability goes unflagged: layer 1 (ON DISK) = "8 unique recordings (7 MP4 + 1 .mov; the 'copy.mov' is a duplicate)"; layer 2 (iOS EVIDENCE) = "the codex admits **6 recordings** — the two `Screen Recording 06-22 14.38.42` .movs are NOT iOS…" | Both layers are separately faithful to their sources (the Downloads census re-run file-for-file this seat; `IOS27-CODEX.md:5` at COMMITTED HEAD does say "6 iOS recordings" and names only the .movs as excluded) — but they cannot both be whole: 8 unique − 1 unique non-iOS .mov (the copy was never in the 8) = **7** iOS recordings on disk, and the MARKS rosters the same dossier ratifies as the RU-15 cure mark exactly 7 MP4s as iOS reference videos (MARKS-A V1-V3 + MARKS-B V1-V4, each with a `refable-timelines/` ledger; `sr-0710-1626.md` is headed "iOS 27 reference timeline", iPhone-portrait 1206x2622), and the committed codex itself cites `sr-0710` in FOUR law sites — the 7th recording is load-bearing evidence in the very document that admits only 6. The codex integer is the codex's own miscount (an RU-16/lead-side artifact, outside the ring fence); the DOSSIER defect is transmitting both layers as a settled "two-layer census" with the .mov exclusion reading as the 8→6 bridge (it bridges only by double-counting the duplicate the rider itself names). Six prior rounds verified each layer against its source and never added them up. Cannot misdirect materially: MARKS + timelines are the working authority, the codex laws cite the 7th recording by name, and no gate consumes the integer | One dated bracket in the A02 rider + sidecar basis row: the codex `:5` integer is one short of its own MARKS roster (7 iOS MP4s on disk, all timelined); the codex-side 6→7 correction routes to the lead (RU-16 layer, outside the ring's write fence) |
| CRIT8B-2 | MINOR | `redress/DOSSIER-A01-A17.md:470-473` (A17 POST-MORTEM) | The sentence attributes ALL its figures to "R3b DEV baselines — … 119ms warm route freeze + CLS 0.04, 186ms cold-nav stall" | The ~186ms figure is R3a's, not R3b's: `BAND-PERF.md:43` reads "~186ms cold-nav stall **(R3a)**" (mirrored at `:475` and `:516`), and `186` greps ZERO in `R3B-DIGEST.md` — every sibling number in the same dossier sentence (391/405/488ms LCP, CLS 0.00, 2 long-tasks ~208-210ms, ~1.56-1.71s/~3.11s rAF churn, 119ms + CLS 0.04) IS digest-true and was re-read verbatim this seat. Same live-round family, correct value, wrong sub-round. Cannot misdirect: the owning wave (PERF W4) carries the figure with the correct provenance as its pending-affordance floor, and A17's verdict/ownership do not turn on which sub-round measured it | Bracket the one figure "(R3a — `BAND-PERF.md:43`)" in the A17 sentence, or split the attribution ("R3b DEV baselines … plus R3a's ~186ms cold-nav stall") |

## §3 — What held (the ratified spine)

Everything else probed re-proved true at COMMITTED HEAD. The handmark evidence chain end-to-end
(register weights to the line, the C-1(e)/isolation/multiply invisibility arithmetic, the
dual-draw attribution at `GF-HM:31`, the se-guard, the jargon captions verbatim); the
SUPERSEDED-BY-RU-06 read-through discipline (spot-broken at `GF-HM:136-143`, which is
choreography content at HEAD exactly as the header table warns); the F41-F50 src layer (the
born-RED install string live at `:103`, the credential strings live at `:39-41`, the dead knobs
dead, the 6-names→4-radii ladder incl. deep-16 and the 17px 2dppx arm, the graded-backdrop
experiment end-to-end with all six commits pre-tag by `merge-base` re-run); the F47 GF-DOCK
re-map (law 14 verbatim, §4.4, the G-REACH RED verbatim, retired gates grep-zero); the goo-clone
identity re-diffed byte-for-byte and the deletion set located exactly (demo-local clone files +
the test under `tests/`); the A-dossier correction layer in full (A15 332/349 re-counted from
the census JSON, A05 66+2/68 re-found, A07 move-targets live, A11 breath 108/0 re-grepped, A16's
COUNTS line still false on disk exactly as the OW-1 rider says, A09's phantom-wave evidence
chain, the OPEN-FM-3 gate at `:40/:53/:189`, the G-CONSUMER-ADDENDUM recast at `:326`); all
twenty ledger INVENTORY quotes re-read (exact modulo the three dispositioned demotions); all
twenty crosswalk flags; the Downloads census file-for-file; the docket rows 9/10 seated; the
ledger states unchanged. The dossier-body birth pins predating the `1340a918` union (F31
`:245,269`/`:545-556`/`:509`, F32 `:155`, F38 `:66-70,161`, F40 `:195/:197`, F41 `:506-509`,
F46 `:355-417`, A06 `:590`, A10 `:486-545`, A14 `:582-587`) all read through in-range sidecar
R5 addenda — the settled CRIT4B2-7 idiom, re-confirmed record-by-record; CRIT7B-1's F43 gap
remains the single missed record, dispositioned. No J1-J11 ruling contradicted; no ownership
move; no coverage overstatement (F31-F40 EXACT 10 at ownership grain re-derived, F41-F50 EXACT
10, the A-table verdicts re-derive from disk; all three sidecar count rows internally
consistent). Two zero-severity observations inventoried, NOT filed: (a) the F31 AMEND-D-8
quote demotes FSF's inner double quotes to singles — a fourth instance of the CRIT7B-2 species
the lead already dispositioned as a class; (b) the F45/F47 INVENTORY quotes drop the ledger's
**bold** emphasis markup (F31/F38 preserve theirs) — markdown emphasis, below the glyph fence
as the ring has construed it (words, order, punctuation identical), and a fortiori inside the
dispositioned class.

## §4 — Disposition (PROPOSE only — the lead applies)

| artifact | BLOCKER | MAJOR | MINOR | verdict |
|---|---|---|---|---|
| DOSSIER-F31-F40 (+ sidecar) | 0 | 0 | 0 | **CLEAN** |
| DOSSIER-F41-F50 (+ sidecar) | 0 | 0 | 0 | **CLEAN** |
| DOSSIER-A01-A17 (+ sidecar) | 0 | 0 | 2 (CRIT8B-1, CRIT8B-2) | CLEAN at the gate grain — two tail-class brackets owed |
| Round-7 dispositions (×6) | — | — | — | all HOLD; none dodges |

**0 BLOCKER / 0 MAJOR / 2 MINOR.** Under the ring's round-7 convention (CLEAN = zero blockers,
zero majors; minors dispositioned), this is seat B's SECOND consecutive clean round — the
two-consecutive-clean gate is MET from this seat, subject to seat A's range and the lead's
disposition of the two new minors. Both minors are attribution-grain tail in the A-dossier: one
census layer whose source integer contradicts the roster the same dossier ratified (the codex's
own miscount, lead-side to cure), and one sub-round label on a correct figure. Neither can
misdirect a BJ wave. The corpus's mechanism spine survived a fresh ~250-anchor hostile pass at
the first COMMITTED-at-HEAD baseline the ring has had.

*End — RU-14 ring round 8, seat B. One file; no `src/`/`demo/`/`waves/` edits, no commit.*
