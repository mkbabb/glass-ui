# RU-14 — redress twice-critique redo, ring round 4 — seat B (F31-F50 + A01-A17)

- **modelId (verbatim from system context):** `claude-fable-5`
- **Charge:** fresh critic over `redress/DOSSIER-F31-F40.md`, `redress/DOSSIER-F41-F50.md`,
  `redress/DOSSIER-A01-A17.md` + their `refable/REFABLE-RU-13-*` sidecars, as amended by the
  RU-14 R4 fix seat (`RU14-FIXLOG-R4.md`). I authored none of them and none of the ring history;
  every claim — including every R4 cure — was presumed wrong until re-proven on disk.
- **Verification base:** HEAD `485891a2` (master). Tree parity RE-PROVEN this seat:
  `git diff --stat 55f5170d..HEAD -- src/ demo/` is EMPTY — the paint tree every pass judged is
  byte-identical to today's. The operative docs state is the WORKING TREE (the R3+R4 fixes are
  uncommitted `M` on five of the six corpus files; F41-F50 untouched since 08:07). The concurrent
  REFABLE RU-03 union has WIDENED since CRIT3: beyond `BAND-A11Y`/`BAND-COLOCATION`/
  `BAND-DOC-TRUTH`, it has now rewritten `waves/BAND-FEEDBACK-MOTION.md` (167→327 lines, mtime
  14:12:01), `waves/BAND-MATERIAL.md` (14:13:54), and `waves/BAND-GATES.md` — all uncommitted,
  all BEFORE the R4 fix seat's final edits (`DOSSIER-F31-F40.md` 14:20:33, fixlog 14:22:49).
  That sequencing is load-bearing for finding 1.
- **Anchors re-proven on disk this seat: ~150.** The full `brush.ts` register (pen 6/0.7/1.2 ·
  boil 7/hull/0.9/1.4 · pencil 3 · crayon 16/hull/3.0 at `:198` · ring 5/grain 0.7 at `:222` ·
  marker 12 · highlighter 26/hull/0.38), `HandMark.vue` (:272/:290 pathLength/:291
  vector-effect/:312 C-1(e)/:327/:331-339/:341-342/:349-365), `useHandMark.ts:113` verbatim,
  `paper.css:124-126`, breath grep = 108 src-wide / 0 in `button/` / 0 in
  slider+checkbox+radio-group+toggle+switch, engage-surface grep = 0, `src/components` = 68
  entries / 66 dirs, `typewriter.vue:103` + the :92-99 no-nowrap container,
  `field-control.css:34` pill + :37-48 F7 rule, `radius.css:32-34/:141`, demo `PRESETS` = 17
  exact (:685-703, SETTING_SUN…SPEEDTEST), `src/components/aurora/constants/presets.ts:73-78`
  ("Each authors its own shader body with no shared dispatch" verbatim),
  `constants/shaders/aurora-mediums.wgsl.ts:387-403` (`applyMedium` 3/5/6/7→Kuwahara),
  `SectionPreviewCard.vue:17-19/:63-65/:87-92`, `storyTile.ts:41-51`, the 4-file `.tile.vue`
  census (exact), `Slider.vue` 651 lines + :420-424 box-INVIOLATE, `EasingPicker.vue` 518 +
  :327/:336/:345, `DeckPager.vue` 47, the FEEDBACK-LEDGER rows :43-62 verbatim, GF-HANDMARK
  (retired gates `G-CONTAIN|G-RING-LAYER|G-DRAW-CONNECTED|G-NO-SLIVER` grep-zero; wave map
  W0-W5 at :207-212; :31/:114-116/:126-129/:158-165/:240/:248/:250), GF-DOCK
  (:52-54/:115-122/:180/:318-322/:357/:363-367/:369-371/:388-389; retired names grep-zero),
  GF-BLOB :255-257/:284, GF-AURORA :177/:237/:314/:461, `BAND-DOC-TRUTH.md` T33 :94 / T40 :121 /
  the :133-134 routing (still uncommitted `M`), `DECIDED-rows` grep across ALL current
  working-tree `waves/` = the one T40 hit (the A09 softened rider survives the three new band
  rewrites), the JUDGE-2 docket rows 8-10 + preamble in `DOSSIER-F11-F20.md`, crosswalk
  :53-72/:56-62 retired names standing/:217-220/:231-233 COUNTS/:237, BAND-STORY
  :155/:195-197/:245/:269/:506-509/:545-547/:582-587/:590, ASK-REDUCTION §B4/§C1/§C3/§D1
  headers at :120/:148/:190/:227 exact, BAND-MATERIAL and BAND-FEEDBACK-MOTION verified in BOTH
  states (committed via `git show HEAD:`, rewritten via working tree — findings 1-3),
  BAND-REDUCTION :66-70/:73-76/:161/:285-288/:306-310/:359 + PROCEDURAL-SUITE grep = 0,
  BAND-PERF :92-96, `auth-shell.vue` :27/:38-42/:65-66/:193/:207-218, `settings.vue`
  :29-30/:52/:201-203, `gate-pattern.vue` :119/:143-145/:156-158, `intro.vue` :53/:79-87,
  `curve-gallery.vue:189-196`, `text-motion.vue:11-16`, the handmark demo caption sites
  (:24-26/:36-38/:50-53/:66-67/:72-74/:105-110/:117-120/:150-151), `deck.vue`
  :19-20/:31/:90/:127, `BottomDock.vue` :42/:65 + 297 lines, `overflow.css` :58/:64 +
  `scroll-snap-type` grep-zero, `useSelectionGroup.ts:183-186`, the blur ladder 1/7/7/11/11 +
  deep 16 + the 17px 2dppx arm (`light-dark.css:36`), `--glass-halo-*` 20px/13rem/7rem
  (:171-173), `ModalOverlay.vue:49/:98`, `DialogContent.vue:466-473`, `PagerDots.vue:326` ≡
  `DeckGooFilter.vue:26` (the `d` attribute extracted and hashed — md5-identical), the six cure
  commits' `merge-base --is-ancestor` vs `v7.0.0` (all six YES; tag `4ab12128` 07-17 18:11;
  `923c5254` 10:02 / `2764f60b` 03:07 / `58fba6e6` 10:02 subjects verbatim), the eleven
  referenced history commits (`7746d586` 01:32 / `117b7f12` 06:43 / `5c847780` 01:32 /
  `490cc46e`+`2d804ce6` 07-16 / `26a81929` / `2d1584a5` / `06929a4b` / `ae71daa0` 07-13 /
  `db861d71`+`910dfffd` 07-12 — all exist, dates match), REGISTRY :66-67/:174, CHRONIC
  :5/:22-25/:76, BI.W-ENGAGE-AFFORD :31/:293/:297-298, RF-1 :74 (counting-base clause verbatim),
  RF-4 :43/:46/:84, RF-5 OW-1 :49 / OW-3 :51 (verbatim), CENSUS-CLASSIFICATION :154,
  model-census 349 seats / 332 `claude-opus-4-8`, the Downloads corpus EXTANT (31 items, 9
  recording files = 7 MP4 + 2 .mov incl. the copy → 8 unique, 22 stills), the bi-addenda
  `openai-popup-1.png` + `engagement-affordance/research.md` on disk, `ADJUDICATION-1.md:49`,
  commit `2a4c38d4` (suffusion matrix), `AppShell.vue:11/:21-23/:26`, `aurora-hero.ts:15-16`,
  `PROCEDURAL-SUITE.md` six-retained-incl-LiquidGrid, all four COLO-1 move-targets live,
  manifest `pageType` grep-zero, FSF :224/:257-258/:413-419/:421-425/:427-429/:436-439/:588-592.

## §1 — R4 cure verification (all five in-scope CRIT3-B cures)

| CRIT3-B finding | cure state this seat | evidence |
|---|---|---|
| CRIT3B-1 (A11 breath sentence false) | **LANDED** | The dossier CORRELATION parenthetical (`DOSSIER-A01-A17.md:266-271`) + the sidecar ratified-table row (:48) + the R4 addendum (:144-152) all carry the honest scope. Re-proven independently: 108 src-wide hits, `button/` = 0, AND (this seat's extension) slider/checkbox/radio-group/toggle/switch = 0 — "the ATOM families carry none of it" survives a wider probe than the cure ran. No verdict movement, correctly. |
| CRIT3B-2 (F37 HandMark pins off by one) | **LANDED** | `DOSSIER-F31-F40.md:397-399` now pins `:290` pathLength / `:291` vector-effect; both re-proven exact on disk; the sidecar F37 row carries no pins for the pair (re-checked — no edit was owed). |
| CRIT3B-3 (A13 presets cite wrong file in context) | **LANDED** | `DOSSIER-A01-A17.md:323-324` carries the full `src/components/aurora/constants/presets.ts:73-78`; the comment re-read verbatim on disk (spans :73-78 exactly); the same row's demo pin (:685-703 = 17 presets) re-counted exact. |
| CRIT3B-4 (FLIP-2 grep-zero falsified in flight) | **LANDED** | The dated rider sits in the A14 NEW-FINDING paragraph (:360-364); `BAND-DOC-TRUTH.md:133-134` re-proven still uncommitted `M`; `BAND-REDUCTION.md` PROCEDURAL-SUITE grep re-run = 0 (routed-but-not-chartered holds); FLIP-2 correctly NOT stamped CONSUMED. |
| CRIT3B-5 (A09 grep-zero rots on commit) | **LANDED** | The softened charter-sense rider at :236-238; re-proven at the CURRENT tree: `grep -rn DECIDED-rows waves/` = the one T40 hit even after the RU-03 union rewrote three MORE band files — the "no band CHARTERS the wave" formulation is robust to the widened rewrite. Sidecar §FLIPS text stands unedited, correctly. |

**Refutations of the R4 fixlog: zero** on cure substance. One precision residue — finding 4.

## §2 — Findings (fresh hunt; ring history read first, then every claim re-derived on disk)

| id | severity | file | claim | evidence | required cure |
|----|----------|------|-------|----------|---------------|
| CRIT4B-1 | **MAJOR** | `redress/DOSSIER-F31-F40.md:240-246` (+ `:228-230` W6 pin, `:576` summary row, `:585` totals; `refable/REFABLE-RU-13-F31-F40.md:97-104`) | F33: "the byte-identical stage-goo clone deletion … is owned by NO wave at HEAD"; "J3's W6 sequences only the vestigial `DeckPager.vue` cut"; ask = "widen `BJ.W-PAGER-DOT-MORPH` (or BAND-REDUCTION) to carry the RU-09 F33 migration explicitly" (rides docket row 9) | **True at committed HEAD, falsified in flight — and stale at the corpus's own final amendment.** The uncommitted RU-03 rewrite of `waves/BAND-FEEDBACK-MOTION.md` (167→327 lines, mtime 14:12:01; sidecar `REFABLE-RU-03-FEEDBACK-MOTION.md` 14:13:14) reauthors W6 as "F33 dot-refinement + the goo-clone collapse": roster row `:54` + charter `:230-245` read "Sequenced WITH the DeckPager cut AND the stage-goo clone deletion (SUPERFLUITY F33 as rewritten by RU-09 — COLLAPSE-FAMILY; **widened per the JUDGE-2 docket row 9**)". The exact widening the dossier asks the lead for is already executed on the tree a lead would read. The R4 fix seat re-affirmed the F33 PARTIAL state AFTER that rewrite was on disk (dossier mtime 14:20:33 > 14:12:01) with its material-state check scoped to `BAND-DOC-TRUTH.md` only — by the working-tree-operative standard FIXLOG-R4 itself adopted for CRIT3B-4, the claim was already false at re-affirmation. Also the dossier's W6 pin `BAND-FEEDBACK-MOTION.md:130-148` resolves to skeleton-wave text on the working tree (W6 now `:230`; committed HEAD `:130` verified via `git show` — pin true committed, dead working). The consumption is HALF: row 9's second clause (refresh the ASK §C1/§C3 recommendation text) remains unexecuted (`ASK-REDUCTION.md` unmodified). | Land a dated RU-14 R5 in-flight rider on the F33 REDRESS + sidecar mirror (the CRIT3B-4 vehicle): the RU-03 FM rewrite consumes the wave-widening half of row 9, UNCOMMITTED, ASK-text refresh residual. On the RU-03 commit: stamp docket row 9 HALF-CONSUMED-with-pointer, re-tally F33 coverage (PARTIAL → EXACT-at-ownership; the ASK-refresh residue stays lead-side), re-pin W6 to the committed line. |
| CRIT4B-2 | MINOR | `redress/DOSSIER-F41-F50.md:285-288` (F45; also `:470`/`:474` F48, `:557-558` F50, `:599-605` Consumed-deltas; `redress/DOSSIER-A01-A17.md:258` A10) | F45: "`../../waves/BAND-MATERIAL.md:111-115` now reads 'F45 joins the F09/F12/F17 conversion class…'" (a verbatim-quote claim), plus the sibling BAND-MATERIAL pins — `:75` role table (F48), `:196-227` W2, `:295-390` W3, `:509` F31 roster, `:486-545` A10 | **In-flight rot, same RU-03 union:** the uncommitted `waves/BAND-MATERIAL.md` rewrite (14:13:54) drops the quoted sentence ("F45 joins" grep = 0 file-wide on the working tree) and moves every pinned anchor (dialog role row now `:94`; W2 `:212`; W3 `:333`; W5 `:550`; the J5 substance survives re-expressed — `:146-149` "Re-aimed born-RED-sweep → REGRESSION-GUARD (J5) … cures the dialog-input case (landed pre-tag, `923c5254`)"). All pins verified TRUE at committed HEAD via `git show` — the dossier's second-consecutive-CLEAN standing is intact against the tree it judged; the defect is that a lead reading the working tree gets a dead verbatim quote with no rider, while the sibling dossiers already carry dated riders for the SAME union's earlier files. | On the RU-03 commit (or now, as a rider): a dated re-anchor addendum in `REFABLE-RU-13-F41-F50.md` re-pinning the five BAND-MATERIAL cites and re-quoting the J5 text in its new form. No verdict movement — ownership (W1/W2/W3/W5, J5 substance) survives the rewrite intact. |
| CRIT4B-3 | MINOR | `redress/DOSSIER-A01-A17.md:279-280` (A11 REDRESS) + `:52-53` (A01 REDRESS) | "`BJ.W-IDLE-BREATH` (BAND-FEEDBACK-MOTION W5, on disk, re-proven)" / "→ `BJ.W-IDLE-BREATH` (BAND-FEEDBACK-MOTION **W5**, per J1)" — an UNCONDITIONAL owned-at-W5 posture | **In-flight posture drift:** the rewritten working-tree FM band gates the wave on a user ruling — roster `:53` "GATED on OPEN-FM-3", heading `:178` "## Wave 5 — `BJ.W-IDLE-BREATH` (A01/A11 + J1) — GATED on OPEN-FM-3", `:40` "W5 is BLOCKED on the OPEN-FM-3 user ruling (the breath-of-life vs suffusion-idle-law …)". Ownership and J1 survive (verified in both states); what drifts is the dossier's unconditional "OWNED-AT-W5" reading — on the tree a lead would read, A01/A11's terminal owner is user-ruling-gated. Committed HEAD carries no gate (verified via `git show`). | Fold into the same RU-03 rider set: on commit, annotate the A01/A11 owner cells (dossier + sidecar summary) with the OPEN-FM-3 gate; verdicts unchanged (OWNED-AT-W5 → OWNED-AT-W5-GATED is a posture note, not a re-verdict). |
| CRIT4B-4 | MINOR | `refable/RU14-FIXLOG-R4.md:29-30` | The CRIT3B-4 cure row pins its sidecar addendum at "`REFABLE-RU-13-A01-A17.md:154-160`" and the CRIT3B-5 row at "`:161-168`" | Off on disk: the FLIP-2 bullet spans `:157-162` (`:154-156` are the A13 bullet's tail) and the A09 bullet spans `:163-169` — both cure-location pointers drift by 2-3 lines into the neighboring bullet. The cures themselves LANDED (verified §1); the drift is confined to the ring-internal log and cannot misdirect a wave. | Correct forward only (the standing logs-are-logs convention): this row is the record; the next fixlog cites `:157-162`/`:163-169`. |

## §3 — What held (the ratified spine)

Everything else re-proved true on disk, including the entire R4-new text layer (the five cure
edits — this pass's prime hunting ground) and the R3 layer beneath it (docket rows 8-10, the
A09/A16 riders, the A05 count base, the F33 row-9 pointers — all pointing at rows that exist).
Specifically re-proven beyond §1: the F34-F40 SUPERSEDED-BY-RU-06 read-through table's every
GF-HM anchor (wave map, NO-blend-modes law at :126-129, ONE pen voice at :158-165, Q-HM-1/2 at
:248/:250, the mask-draw at :114-116); the FLIP-1/FLIP-2 CONSUMED-BY-RU-06 closures; the F47
re-map's every GF-DOCK anchor including §4.4 :180, the W-table :318-322, G-REACH's RED :369-371
("recenter-on-select only exists…" — the dossier's library-recenter precision verbatim), and
G-RADIUS-GRAMMAR's RED `BottomDock.vue:161-252`; the F45/F48/F50 commit set re-derived by
independent ancestry (all six v7.0.0 ancestors — the R3-corrected pre-tag dating is right); the
F43 dating (rework commits both 07-16, corpus 07-17); the F41 site + wrap rider (:103 +
the :92-99 container with no nowrap); the F44 dead knobs (:29-30 bound at :201-203, absent from
`surfaceStyle` :52+); the F46 double-card (:87-92 second bordered surface) + 4-tile census +
AMEND-D-4/D-5; the F33 clone identity re-proven at the byte level (the `d` attribute extracted
from both lines and hashed — identical; note the LINES differ in markup context, the DATA is
what's byte-identical, exactly as claimed); the whole A-dossier correction layer (A15 332/349,
A01/N5 engage grep-zero, A02's corpus re-censused on disk this seat — 31 items / 8 unique
recordings / 22 stills, N4's numbers exact; A05 counts, A07 move-targets all live, A16's
re-booking-ZERO at CHRONIC:76 + the OW-1 rider matching RF-5 :49 verbatim, A17's
AppShell/barrel chain). Coverage sums in all three dossiers (10 = 9+1, 10 = 10+0+0, 17 rows).
The `:26/:51/:67` vs GF-HM's `:37/:50/:66` handmark caption enumerations are BOTH true on disk
(blurb lines vs label lines — different grain, no contradiction). No J1-J11 ruling is
contradicted anywhere in scope; nothing smuggled — every supersession named in prose and sidecar.

## §4 — Disposition

| artifact | BLOCKER | MAJOR | MINOR | verdict |
|---|---|---|---|---|
| DOSSIER-F31-F40 (+ sidecar) | 0 | 1 (CRIT4B-1) | 0 | AMEND (in-flight rider owed) |
| DOSSIER-F41-F50 (+ sidecar) | 0 | 0 | 1 (CRIT4B-2) | AMEND-ON-COMMIT (clean against committed HEAD; the consecutive-clean chain holds for the tree it judged, breaks against the working tree) |
| DOSSIER-A01-A17 (+ sidecar) | 0 | 0 | 1 (CRIT4B-3) | AMEND-ON-COMMIT |
| RU14-FIXLOG-R4 | 0 | 0 | 1 (CRIT4B-4) | log precision only |

No BLOCKER. All five in-scope R4 cures landed whole — the fixlog survives a hostile re-proof on
substance with zero refutations (one pointer-precision residue). The one MAJOR is not R4's cure
work but R4's blind spot: the concurrent RU-03 union widened to BAND-FEEDBACK-MOTION/
BAND-MATERIAL/BAND-GATES minutes before the R4 seat wrote, and its FM rewrite consumed the F33
goo-clone ask (docket row 9's wave-widening half) that the R4-re-affirmed dossier still declares
unowned — the same in-flight-consumption class as CRIT3B-4/5, but here the falsification predates
the corpus's final amendment, and the ring's own working-tree-operative standard makes that a
false claim, not mere rot. All three findings 1-3 share one cure vehicle: a dated RU-03 rider
set now, stamps + re-pins when the RU-03 union commits — one owner, not three.

*End — RU-14 ring round 4, seat B. One file; no `src/`/`demo/` edits, no commit.*
