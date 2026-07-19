# RU-14 — redress critique, ring round 7 — seat B (F31-F50 + A01-A17)

- **modelId (verbatim from system context):** `claude-fable-5`
- **Charge:** fresh adversarial critic over `redress/DOSSIER-F31-F40.md`,
  `redress/DOSSIER-F41-F50.md`, `redress/DOSSIER-A01-A17.md` + their `refable/REFABLE-RU-13-*`
  sidecars, as amended through `RU14-FIXLOG-R7.md`. Corpus presumed wrong until re-proven —
  including every R7 cure and every surviving prior-round fix.
- **Verification base:** HEAD `02e322f1` (master). Re-proven this seat, not inherited:
  `git diff --name-only 4daf5c02..HEAD -- docs/tranches/BJ/` = EMPTY and `-- src/ demo/` = EMPTY
  (HEAD moved on IOS27-MICRO commits only — the corpus, the nine-band layer, and the paint tree
  are byte-identical to what both CRIT6 seats and the R7 fix seat judged);
  `git log 55f5170d..HEAD -- src/ demo/` = EMPTY (the dossiers' tree-parity claim extends to
  today's HEAD); `git diff --name-only 7aec864d..HEAD -- docs/tranches/BJ/` = exactly the 15
  files (six dossiers + six sidecars + CRIT5 pair + R5 fixlog — the R7 fixlog's base paragraph
  reproduces exactly, including the unscoped 48-at-CRIT6-base / 52-at-`02e322f1` file counts);
  working tree: six dossiers + six sidecars `M`, CRIT6 pair + `RU14-FIXLOG-R6.md` +
  `RU14-FIXLOG-R7.md` untracked — as the R7 fixlog states.
- **Anchors re-proven on disk this seat: ~300.** Src/demo (all exact at the byte-identical
  tree): `brush.ts` ×17 (pen 6/0.7/1.2 · boil 7/hull/0.9/1.4 · pencil 3 · crayon 16/3.0 · ring
  5/grain 0.7/wobble 2.6 · marker 12 · highlighter 26/hull/0.38), `HandMark.vue` ×13
  (:272/:290/:291/:312-316 C-1(e)/:327/:331-339/:340-343/:349-353), `useHandMark.ts:113`,
  `paper.css:124-126`, `geometry.ts:143-167`, `ink.ts:195-215` se-guard, demo `handmark.vue` ×16
  (captions :26/:51/:67/:119-120/:150-151; sections :23-33/:36-46/:53/:72-74/:84-95/:105-110),
  EasingPicker 518 lines + :327/:336/:345 (38cqi verbatim; container-type grep 0),
  `curve-gallery.vue:189-202`, `typewriter.vue:92-103` (born-RED live at :103), auth-shell
  :27/:38-42/:64-69/:90-94/:97-112/:207-218 + the three credential strings :39-41, settings dead
  knobs (:29-30 vs :52-75 grep 0), gate-pattern :119/:143-150/:156-158, `field-control.css`
  :34 pill / :37-45 comment / :46-48 selector block / :49 blank, `radius.css:32-34/:141`,
  `glass.css:86-97/:138-155/:171-173` (ladder 1/7/7/11/11; halo 20px/13rem/7rem), glass-deep
  16px, `light-dark.css:36` 17px inside the `@media (min-resolution: 2dppx)` arm,
  `ModalOverlay.vue:49/:98`, `DialogContent.vue:466-473`, SectionPreviewCard
  :17-19/:35/:63-65/:87-92, `storyTile.ts:41-51`, the `.tile.vue` census = 4 exact, BottomDock
  ×13 (:17-22/:42/:65-68/:159-215/:184-196/:221-263), `overflow.css` :62-64 auto / :76-78 gutter
  / :91 mask / scroll-snap-type grep 0, `useSelectionGroup.ts:183-186`
  (`src/composables/motion/morph/`), Slider 651 + :420-424 box-INVIOLATE, `PagerDots.vue:326` ≡
  `DeckGooFilter.vue:26` (`d` byte-identical, re-diffed), deck.vue :19-20/:31/:90/:127, the goo
  file set extant incl. `tests/components/custom/deck/DeckGoo.private.test.ts`, `usePagerWorm.ts`,
  DeckPager 47 lines, `useDockOverflowFit.ts`, AppShell :11/:21-23/:26, `aurora-hero.ts:15-16`,
  demo presets = 17 exact (:685-703 SETTING_SUN…SPEEDTEST), `constants/presets.ts:73-78`,
  `applyMedium` at `aurora-mediums.wgsl.ts:387`, `Blob.vue:354` ambient+contact pair,
  reveal/scroll/text-motion demo + the reveal (7 files) / scroll (7 files) composable sets,
  engage-surface grep 0, breath = 108 src-wide / 0 in `button/`, src root listing exact,
  src/components = 66 dirs + 2 files = 68 entries, purge targets ×4 present,
  `dialog.confirm-preset.test.ts` imports gate-pattern, manifest `pageType` grep 0. Formation:
  IOS27-CODEX ×14 (46 lines; :4 the 1-13-renumber-stable + RATIFIED/AMENDED/REPLACED tag census
  — verified against every law head; :5 evidence basis verbatim incl. "excluded from every
  dock/card/tab/glass claim" + the law-11 dot-lattice routing; laws 1/3/4/10/12 content; 18 laws
  :11-37; 6 BEST vectors :41-46; "148 frames" grep 0; `63239549` 07-18 01:01 "13 opus laws to 18
  Fable laws"; `f9813c97` extant; `REFABLE-RU-16.md` extant; MARKS-A stamped
  `verified-model: claude-fable-5`); GF-HM (265 lines; :16-17/:31/:126-129/:158-165/:207-212
  wave map/:240/:248/:250; retired gates grep 0; G-CALM/G-RESTRAINT/G-WEIGHT/G-DRAW live);
  GF-DOCK (:52-54 law 14/:115-122/:180 §4.4/:217 RED/:318/:322/:363-367/:369-372 G-REACH RED
  VERBATIM/:388-389; retired names grep 0); GF-BLOB :255-257 §2.9 + :284; GF-AURORA
  :168-177/:237/:314-315/:461; FM :40/:53/:57/:82/:189/:241/:250-251/:260-261/:278; REDUCTION
  :52-54/:76-77/:88-93 (the §C3 re-issue NOTE at :90-93)/:279-280 truth-up quote VERBATIM/
  :287-290/:299-304 useStagger OVERTURN/:411/:638-640 W8/:677 W9/:701-702/close roster items
  4-5 at :738-740; MATERIAL :52/:60 (the band already cites the RU-16 codex)/:78-79/:94/:135/
  :146-149 J5-class quote VERBATIM incl. the `:47-49` band grain/:160/:212/:333-335/:340/:458/
  :567/:592-594; STORY :155 (now "Out")/:174-177 (now W1 paint-parity prose)/:196 W2 heading/
  :212/:245/:254-256 G-COPY gate rows/:269/:307/:325/:459/:461/:506/:633/:672-673/:679;
  DOC-TRUTH :48/:112/:121 T40/:133-134; PERF :92-96 (277KB at :94); COLOCATION
  :38-39/:91/:102/:284-288/:326; crosswalk :53-72 all twenty in-scope flags + :65 "regardless"
  verbatim + :217-220 verbatim + :231-233 COUNTS still 50+5+3+10 "(= 67" on disk; REGISTRY
  :66-67/:174-175; CHRONIC :5/:22-25/:76 re-booking ZERO; JUDGE :38; FSF
  :224/:256-259/:413-419/:421-425/:427-429/:436-439/:588-592; FEEDBACK-LEDGER :43-62 read in
  FULL against every in-scope INVENTORY quote; ASK-REDUCTION :120/:148/:190/:227/:265 +
  untouched-since-`4ab12128`; JUDGE-2 docket rows 9/10 + preamble; LEAD ledger A2 APPLIED
  `dda87dcc` / C5 rows 5+9 / E1 PENDING / E2 PENDING / H2 WAITING; PROCEDURAL-SUITE :11/:57-59;
  model-census 332 opus + 15 fable (+2 = 349); RF-5 OW-1 :49 / OW-3 :51 / R-1 :109 / R-5 :122;
  RF-4 :43/:46/:84; RF-1 :74; BI.W-ENGAGE-AFFORD :31/:293/:297-298/:528-533; the R5 fixlog
  CRIT4B2-7 row (the sidecar-addendum cure vehicle, prescribed); Downloads corpus = 31 items /
  9 mp4-mov (8 unique + copy) / 22 stills; openai-popup-1/2.png on disk; the
  engagement-affordance exemplar triple on disk; FABLE-DAG-REDUCTION + the component-graph
  triple (`component-graph.json`/`duplication-candidates.md`/`role-census.md`); the six
  rounding/halo commits ancestor-of-`4ab12128` by `merge-base` (dates/subjects re-read);
  suffusion commit `2a4c38d4` extant with the quoted subject.

## §1 — R7 fixlog cure verification (the four in-scope cures, hostile re-proof)

| cure | state this seat | evidence |
|---|---|---|
| CRIT6B-1 (A02 codex descriptors → RU-16, MAJOR) | **LANDED, true** | The dated R7 rider sits at `DOSSIER-A01-A17.md:79-91`, immediately after the pre-RU-16 descriptors it labels history; every claim in it re-proven against the codex at first hand: 18 laws `:11-37` with laws 1-13 renumber-stable and EVERY law tagged RATIFIED/AMENDED/REPLACED (tag census run law-by-law this seat: 4/12 RATIFIED, 7/13 REPLACED, rest AMENDED, 14-18 NEW), 6 BEST vectors `:41-46`, the manifest text ("148 frames") grep-zero, the two-layer census (8 recordings + 22 stills ON DISK re-counted in Downloads; 6 recordings as iOS EVIDENCE per `:5`), the exclusion fragment "excluded from every dock/card/tab/glass claim" VERBATIM on `:5`, the RU-15+RU-16 cure span (`REFABLE-RU-16.md` extant), no verdict movement. Sidecar A02 basis row (`REFABLE-RU-13-A01-A17.md:40`) + R7 addendum (`:227-241`) carry the same re-point. The F49/F50 law-1/law-12 cites re-verified against the RU-16 text — both survive. |
| CRIT6B-2 (F33 register quote re-take, MINOR) | **LANDED, true** | `DOSSIER-F31-F40.md:208-209` now reads "A metaball-merge is the INDICATOR's job… the ONE metaball morph"; on-disk `CarouselContent.vue:8` head words "A metaball-merge is the INDICATOR's job (the pager worm," and `:17` "the ONE metaball morph" — both fragments verbatim, pin `:4-18` live. Sidecar R7 addendum (`REFABLE-RU-13-F31-F40.md:185-193`) as billed. |
| CRIT6B-3 (field-control gloss reword, MINOR) | **LANDED, true** | Both gloss sites name the drift instead of endorsing it: `DOSSIER-F41-F50.md:616-618` ("the band's `:47-49` is the rule-body grain, one high of the `:46-48` selector block — a lead-side pin, noted not endorsed [reworded RU-14 R7]") + the sidecar R5-addendum note (`REFABLE-RU-13-F41-F50.md:120-124`) and R7 addendum (`:153-164`). Disk re-measured: `:46` selector, `:47` declaration, `:48` brace, `:49` blank. The two verbatim `BAND-MATERIAL:146-149` quotes (dossier `:294`, sidecar `:112`) correctly keep the band's `:47-49` INSIDE quotation marks — re-proven verbatim against the band. |
| CRIT6B-4 (A03 laws 3/4 → 4/10, MINOR) | **LANDED, true** | `DOSSIER-A01-A17.md:112-115` cites laws 4/10 with the dated R7 bracket; law 3 re-read = "Specular edge caustic, not a border" (no proportion content), law 4 = the Proportion clause (`IOS27-CODEX.md:14`, head words verbatim), law 10 = the type ladder (`:26`); A10's row already read 4/10 — the two rows now agree; the band's own authority line (`BAND-MATERIAL.md:60/:78-79`) confirmed correct throughout. Sidecar addendum bullet (`:242-247`) as billed. |

**Cure refutations: zero.** The R6A-5 disposition (log-note in the R7 fixlog; `RU14-FIXLOG-R6.md`
left uncorrected by fence) re-verified consistent: the CRIT6-A cure text itself rules a log note
sufficient, the corrected reading is recorded in the R7 fixlog's R6A-5 row, and the underlying
diff facts (15 BJ files; 48/52 unscoped) reproduce exactly. The R6A-1/R6A-2/R6A-3/R6A-4 cures
are seat A's scope (F01-F30) and were not re-judged here.

## §2 — Findings

| id | severity | file | claim | evidence | required cure |
|----|----------|------|-------|----------|---------------|
| CRIT7B-1 | MINOR | `redress/DOSSIER-F41-F50.md:181` (F43 REDRESS) + `refable/REFABLE-RU-13-F41-F50.md` (R5 addendum, by omission) | F43's credentials ban is pinned "G-COPY-3 (BAND-STORY W2, `../../waves/BAND-STORY.md:174-177,196`)" with no movement record anywhere in the F41-F50 pair | Half-dead pin, and the read-through record lives out of range: at HEAD `BAND-STORY.md:174-177` is the W1 paint-parity/DELTA paragraph (the G-COPY-3 credentials text now lives in the gate rows at `:254-256`; `:196` still lands on the W2 heading — that half survives). The R5 CRIT4B2-7 movement record covering this pin ("F40/F43 STORY `:195-197/:174-177/:196` → `:254-256`") sits ONLY in `REFABLE-RU-13-F31-F40.md:166-167` — the neighbor range's sidecar, which the F41-F50 dossier and sidecar never reference; the F41-F50 sidecar's own R5 addendum enumerates its CRIT4B2-7 shares (F41 `:506-509`→`:633`, F46 `:355-417`→`:410-465`, the five BAND-MATERIAL re-pins) and omits F43 (`:174-177` greps zero in the file). A reader of the F41-F50 pair chases `:174-177` into W1 prose with no recorded correction. Cannot misdirect materially — the owner (`G-COPY-3`, W2) is named, the born-RED grep + `auth-shell.vue:39-41` are live, and `crosswalk:65` carries the "regardless" routing verbatim (re-proven) | One line in the F41-F50 sidecar's next addendum mirroring the F31-F40 record (F43 STORY `:174-177` → `:254-256`, `:196` survives), or an R-bracket at the dossier pin |
| CRIT7B-2 | MINOR | `redress/DOSSIER-F31-F40.md:537-538` (F40 INVENTORY) + `redress/DOSSIER-F41-F50.md:28-29` (F41 INVENTORY), `:203` (F44 INVENTORY) | The INVENTORY convention presents the ledger rows verbatim inside italic quotation marks | Inner-quote glyph demotion inside quotation marks (the CRIT5B-3 fence, weakest species): the ledger reads `(what is "SE")` (F40, `FEEDBACK-LEDGER.md:52`), `"wtf is this npm install bit?"` (F41, `:53`), `"Wtf even is" this` (F44, `:56`) — the three dossier quotes demote the inner double quotes to singles (`'SE'`, `'wtf …?'`, `'Wtf even is'`). Words, order, and punctuation otherwise exact (all twenty in-scope ledger rows compared in full this seat; every other INVENTORY quote is glyph-exact). Cannot misdirect — no grep in the corpus keys on the quoted glyphs — but the ring has cured paren-for-comma and article drift inside quotation marks; the fence is glyph-level or it is nothing | Re-take the three quotes with the ledger's double quotes (or state the nested-quote normalization once in each dossier's convention paragraph) |

## §3 — What held (the ratified spine)

Everything else probed re-proved true at HEAD, including every line the R7 fix seat newly wrote
(the layer history says is most error-prone): the A02 rider's codex claims are exact to the
glyph where quoted; the A03/A10 authority pair now agree and match the band; the F33 corrected
block's two register fragments are verbatim; the field-control glosses now describe the disk
state precisely. The R7 verification-base paragraph reproduces in full — including the exact
15-file `docs/tranches/BJ/` diff, the empty BJ/src/demo diffs since the CRIT6 base, and the
48/52 unscoped counts. The mechanism spine survived a fresh ~300-anchor hostile pass: the full
handmark evidence chain (register weights, the C-1(e)/isolation/multiply invisibility
arithmetic, the dual-draw pins, the se-guard, the jargon captions), the F41-F50 src layer
(born-RED install string live, credentials strings live, dead knobs dead, the 6-names→4-radii
ladder incl. deep-16 and the 2dppx 17px arm, the graded-backdrop experiment end-to-end with all
six commits pre-tag by `merge-base`), the F47 GF-DOCK re-map (law 14, §4.4 at `:180`, the
G-REACH RED verbatim, retired gates grep-zero), the goo-clone identity + the full deletion set
extant on disk (incl. `DeckGoo.private.test.ts`, located under `tests/`), docket rows 9/10
seated with the stamps the dossiers describe, C5/E1/E2/H2 ledger states unchanged, the A-dossier
correction layer (A15 332/349, A05 66+2/68, A07 move-targets live, A11 breath split 108/0, A16's
OW-1 rider still true — COUNTS still false on disk, lead-side, RF-5 R-1 pending), the RU-16-era
codex cites in F49/F50 (laws 1/12 survive), and the Downloads census file-for-file. The
dossier-body birth pins that predate the `1340a918` union (F31 `:245,269`/`:545-556`/`:509`,
F32 `:155`, F38 `:66-70,161`, F40 `:195/:197`, F41 `:506-509`, F46 `:355-417`, A10 `:486-545`,
A14 `:582-587`) all read through the sidecar R5 addenda per the prescribed CRIT4B2-7 cure
vehicle (re-read in `RU14-FIXLOG-R5.md` this seat) — settled idiom, not re-opened; CRIT7B-1 is
the one pin that idiom's record MISSED for its own range. No J1-J11 ruling contradicted; no
ownership move; no coverage overstatement found (F31-F40 EXACT 10 at ownership grain, F41-F50
EXACT 10, and the A-table verdicts all re-derive from the disk evidence).

## §4 — Disposition

| artifact | BLOCKER | MAJOR | MINOR | verdict |
|---|---|---|---|---|
| DOSSIER-A01-A17 (+ sidecar) | 0 | 0 | 0 | **CLEAN** |
| DOSSIER-F31-F40 (+ sidecar) | 0 | 0 | 1 (CRIT7B-2 share: the F40 quote) | AMEND — one glyph re-take |
| DOSSIER-F41-F50 (+ sidecar) | 0 | 0 | 2 (CRIT7B-1; CRIT7B-2 share: F41/F44) | AMEND — one addendum line + two glyph re-takes |
| RU14-FIXLOG-R7 | 0 | 0 | 0 | 4/4 in-scope cures LANDED true; verification base exact |

**0 BLOCKER / 0 MAJOR / 2 MINOR.** All four in-scope R7 cures landed whole and true — zero
refutations, zero unlanded, zero landed-wrong — and the A-dossier pair is CLEAN for the first
time in the ring. The two MINORs are tail-class: one out-of-range movement record the R5
addendum vehicle missed for F43 (the only such gap found — every other moved pin has an
in-range record), and one three-site inner-quote glyph demotion beneath every prior round's
radar. Neither can misdirect a BJ wave. This is seat B's first zero-MAJOR round; consecutive-
clean is within one small fix pass if seat A's range concurs.

*End — RU-14 ring round 7, seat B. One file; no `src/`/`demo/`/`waves/` edits, no commit.*
