# RU-14 — redress critique, ring round 5 — seat B (F31-F50 + A01-A17)

- **modelId (verbatim from system context):** `claude-fable-5`
- **Charge:** fresh adversarial critic over `redress/DOSSIER-F31-F40.md`,
  `redress/DOSSIER-F41-F50.md`, `redress/DOSSIER-A01-A17.md` + their `refable/REFABLE-RU-13-*`
  sidecars, as amended through `RU14-FIXLOG-R5.md`. Corpus presumed wrong until re-proven —
  including every R5 cure.
- **Verification base:** HEAD `7aec864d` (master). The R5 corpus edits are working-tree-only
  (the six dossiers + six sidecars modified, fixlog untracked; `git status` re-proven this seat).
  `src/`+`demo/` parity holds (`git diff --stat 55f5170d..HEAD -- src/ demo/` = EMPTY), so every
  paint-tree pin was judged against the same bytes all prior passes saw.
- **Anchors re-proven on disk this seat: ~250.** The committed nine-band layer:
  FM `:40/:53/:189/:236-237/:241/:250-251/:260-261/:278`; REDUCTION
  `:52-54/:76-77/:88-93/:279/:287-290/:299-304/:306-310/:411/:638-648/:677/:701-702/:738`;
  DOC-TRUTH `:48/:94/:112/:121/:133-134` + `DECIDED-rows` grep = the one T40 hit; MATERIAL
  `:52/:94/:111-115/:135/:146-149/:160/:212/:333-335/:340/:458/:590-594` + "F45 joins" grep = 0;
  COLOCATION `:38-39/:91/:102/:230/:260/:265/:284-288/:295/:326/:347`; STORY
  `:38/:212/:253-256/:307/:325/:410/:459-461/:549/:633/:672-673/:679`; PERF `:92-96` (aurora-hero
  277KB at `:94`). Formation: REGISTRY `:66-67/:174-175/:235-238`; JUDGE `:38`; CHRONIC
  `:5/:22-25`; PROCEDURAL-SUITE `:11/:57-59`; crosswalk `:53-72/:205-207/:217-220/:231-233`
  (COUNTS 50+5+3+10=68≠67 still on disk, per the A16 OW-1 rider); FEEDBACK-LEDGER `:43-62`
  verbatim; ledger rows A2/B1/B2/C3/C5/D1/E1/E2/H2; ASK-REDUCTION §B4/§C1/§C3/§D1 at
  `:120/:148/:190/:227`, last touch `4ab12128`; SUPERFLUITY `:632/:658-661`; APOTHEOSIS `:214`
  (MECH-04+D-05). Greenfields at `117b7f12`: GF-HM (265 lines; W0-W5 roster `:207-212`; NO-blend
  `:126-129`; ONE-pen `:158-165`; `:16-17/:31/:231/:240/:248/:250`; old gates grep-zero); GF-DOCK
  (459 lines; `:52-54/:115-117/:180/:318-322/:357-372/:388-389`; G-OCCLUSION-PEEK/G-SNAP-DETENT/
  G-REVEAL grep-zero); GF-BLOB `:284`; GF-AURORA `:112/:170/:177/:237/:314-315`; FSF
  `:224/:256-259/:413/:421/:427-429/:436-439/:550-554/:588-592`. Src/demo (all exact): brush.ts
  ×14, HandMark.vue ×8 spans, `useHandMark.ts:113`, `paper.css:124-126`, `constants.ts:57/:61`,
  handmark.vue `:26/:50-53/:66-67/:72-74/:105-110/:117-120/:148-151`, `typewriter.vue:103` (+
  nowrap grep 0), gate-pattern `:143-150/:156-158`, auth-shell `:27/:38-42/:64-69/:207-212` (+
  last touches `490cc46e`/`2d804ce6`), settings `:29-30/:52-58/:201/:209`, radius `:32-34/:141`,
  field-control `:32-49`, light-dark `:36`, glass `:86-97/:138-155/:171-173`, glass-deep 16px,
  ModalOverlay `:49/:98`, DialogContent `:466-473`, overflow `:62-66/:76-78/:91-93` +
  scroll-snap grep 0, `useSelectionGroup.ts:183-186`, BottomDock `:17-22/:42/:65-68/:184-196/
  :221-224`, SectionPreviewCard `:17-19/:23-25/:35/:63-65/:87-92`, `.tile.vue` census = 4,
  `storyTile.ts:41-51`, EasingPicker `:327/:336/:345` + 518 lines, Slider 651 + `:420-424`,
  `search.vue:504`, curve-gallery `:189-202`, scroll.vue `:10-12/:27-37`, AppShell `:11/:21-23/
  :26`, `aurora-hero.ts:15-16`, demo presets `:685/:703`, src presets `:73-78`, wgsl `applyMedium
  :387+`, `PagerDots.vue:326` ≡ `DeckGooFilter.vue:26` (byte-identical), deck.vue `:19-20/:31/
  :90/:127`, src root listing, 66-dir/68-entry count, breath = 108 / `button/` = 0,
  engage-surface grep = 0, `dialog.confirm-preset.test.ts` extant. Commits: all 17 cited hashes
  extant with matching dates; `923c5254`/`2764f60b`/`58fba6e6`/`24b63d01`/`189ae15c`/`71892b9e`
  all `merge-base`-proven v7.0.0 ancestors (tag commit `4ab12128`); `ae71daa0`/`db861d71`/
  `910dfffd` dated as the A09 rider states. model-census.json = 349 seats (332 opus / 15 fable /
  2 unattributed — the A15 arithmetic holds). Downloads corpus: 31 items, 9 mp4/mov (8 unique +
  the copy) — the A02/N4 census holds.

## §1 — Fixlog re-verification (R5 cures in scope, hostile re-proof)

| cure | state this seat | evidence |
|---|---|---|
| CRIT4B2-1 (F33 EXACT-at-ownership restore) | **LANDED, true** | Dossier REDRESS/summary/totals re-pinned to live anchors — FM `:241/:250-251/:260-261/:278` + REDUCTION `:638-648` all re-proven verbatim; ledger C5/E2 read as stated; sidecar consequence-mirror bracketed + R5 addendum present. |
| CRIT4B2-2 (F45/F48 re-anchor) | **LANDED, true** | MATERIAL `:146-149` quote re-proven VERBATIM on disk (incl. the F17-flipped carry `:135/:52/:160`); `:111-115` is the `--radius-input` misnomer block as stated; `:94/:212/:333-335/:340/:458` all live; "F45 joins" greps 0; `JUDGE.md:38` distinction honest. |
| CRIT4B2-3 (A14/FLIP-2 CONSUMED stamp) | **LANDED — one quote landed WRONG** | The stamp, the `:279`+`:738`+`:133-134` pins, the SWEEP-NOW/TRIGGERED retire (`:48/:112`), and the summary-row flip all check — but the embedded verbatim quote is fabricated (finding CRIT5B-1). |
| CRIT4B2-4 (A07 recast rider) | **LANDED, true** | COLOCATION `:284-288` ("the old precondition was unsatisfiable (RU-12 RT11)") + `:326` ("no longer a clearance bar") re-proven verbatim; ledger A2 APPLIED `dda87dcc`; move-targets `:38-39/:91/:102` live. |
| CRIT4B2-5 (A01/A11 gate annotation) | **LANDED, true** | FM `:40/:53/:189` re-proven verbatim; ledger E1 PENDING; dossier verdicts + summary rows + sidecar rows 39/48 all carry the gate. |
| CRIT4B2-6 (:175 re-pin + rider rewrite) | **LANDED, true** | `REGISTRY.md:175` = the family-I charter line, `:174` = the family-C tail; the one residual ":174" string in scope is the R5 addendum's own historical description, not a live pin; T40 survives verbatim at DOC-TRUTH `:121`; no unbracketed "UNCOMMITTED" remains in scope. |
| CRIT4B2-7 (three re-pin addenda) | **LANDED, true** | All table entries spot-proven: STORY `:307/:325/:549` (W7 at the old `:545-556` span), MATERIAL `:592-594` (review-mark cites the RU-13 union at `:594`), REDUCTION `:287-290` (easing §B4; `:306-310` is the combobox fold as stated), `:677/:701-702` (W9 + the A06 clause), REDUCTION nine waves / STORY seven waves (`BAND-STORY.md:38`), A10 `:567-594`, A14 `:672-673`, N6 `:679`, A17 PERF pin survival. |

**Fixlog refutations: one partial.** The fixlog's CRIT4B2-3 row certifies `BAND-REDUCTION.md:279`
"re-proven verbatim" — the quote it planted is NOT the on-disk text (CRIT5B-1). Every other
in-scope R5 edit re-proved exact.

## §2 — Findings

| id | severity | file | claim | evidence | required cure |
|----|----------|------|-------|----------|---------------|
| CRIT5B-1 | **MAJOR** | `redress/DOSSIER-A01-A17.md:377-379` (A14 NEW-FINDING) + `refable/REFABLE-RU-13-A01-A17.md:103-104` (FLIP-2 R5 bracket); `refable/RU14-FIXLOG-R5.md:39` ("both re-proven verbatim") | Both sites quote `BAND-REDUCTION.md:279` as verbatim: "…truth-up joins THIS wave's **mechanical bundle**" | **The quote is fabricated.** On disk `:277-279` reads "…truth-up joins THIS wave's **delete scope** — the retained-suite doc must not list a deleted member." "mechanical bundle" greps ZERO in the entire `waves/` layer; its only occurrences are `RU14-CRIT4-B.md:71` (the finding that coined it) and the two corpus sites the R5 fix seat copied it into — the fixlog propagated the CRIT seat's paraphrase as a verbatim quote while certifying it "re-proven verbatim." The substantive stamp survives (W3 DOES charter the truth-up at `:279` + close roster `:738`; routing at `BAND-DOC-TRUTH.md:133-134` verbatim), so no verdict moves — but a lead grepping the band for the quoted words finds nothing and rightly doubts the CONSUMED-BY-RU-03 stamp's evidence layer. | Re-take the quote verbatim at both sites ("truth-up joins THIS wave's delete scope — the retained-suite doc must not list a deleted member"); note in the next fixlog that the R5 "re-proven verbatim" certification was false for this pin. |
| CRIT5B-2 | **MAJOR** | `redress/DOSSIER-F31-F40.md:161-165` (F32 post-JUDGE rider) + `:581` (summary row); `redress/DOSSIER-F41-F50.md:119-124` (F42 REDRESS); `refable/REFABLE-RU-13-F41-F50.md:95-97` (RU-14 addendum); `refable/REFABLE-RU-13-F31-F40.md:106-108` (consequence mirror) | The RU-09 C-F census is stated as the settled ground at HEAD — "`useStagger`/`useStaggerReveal`/`useBloomUp`/`useTextHighlight` **all zero-caller**" — and both dossiers direct "the §C3 recommendation text re-anchors to / reads from the RU-09 verdicts" | **The useStagger leg is OVERTURNED by the committed union the same R5 pass re-pinned everything else to.** `BAND-REDUCTION.md:299-304`: "useStagger — RESOLVED KEEP … BACKED: `speedtest/src/features/speedtest/ui/ResultStack.vue:171` + `composables/useResultReveal.ts:36` live-import `useStagger` … RU-09 R6's DELETE-useStagger leg is OVERTURNED by this evidence — its own A9 escape clause fires"; `:52-54` names this exact error as the band's consumer-truth lesson ("RU-09's F32 seat called useStagger zero-caller (speedtest consumes it ×2)"); `:88-93` rules the §C3 re-issue happens "with the corrected censuses," not the RU-09 verdicts raw; close roster `:738+` item 5 = "useStagger → RESOLVED KEEP (census BACKED: speedtest ×2)." The RU-09 source text ("the sibling hits are prose, not imports", `SUPERFLUITY.md:658-661`) is factually false for useStagger. No prior ring round caught this (grep: zero useStagger hits in CRIT1-4). A lead executing the E2 refresh from the dossier layer ships a kill-useStagger recommendation to the user that the committed band has already disproven. | Dated rider at the four sites: the RU-09 census carries the union's useStagger OVERTURN (`BAND-REDUCTION.md:299-304`; the zero-caller roster shrinks to useStaggerReveal/useBloomUp/useTextHighlight); the §C3-refresh directive re-points to the union-corrected census per `:88-93` (ledger E2 vehicle). No ownership/coverage movement — §C3 remains the owner, W9 remains §C3-gated. |
| CRIT5B-3 | MINOR | `redress/DOSSIER-F41-F50.md:393-394` (F47 TARGET, refable-precision bullet) | GF-DOCK quoted as verbatim: "only `useSelectionGroup` rails recentre; the `BottomDock` strip routes through `goTo()`" | The on-disk G-REACH RED (`GF-DOCK-PASS3.md:369-372`) reads "`BottomDock` routes through `goTo()` with no recenter (F47b); recenter-on-select only exists in `useSelectionGroup` rails" — content-equivalent, but the dossier's quotation marks present a paraphrase as charter text ("recentre" appears nowhere in the file). Pin, gate, and substance all hold. | Drop the quotation marks or re-take the sentence verbatim; no other movement. |
| CRIT5B-4 | MINOR | `redress/DOSSIER-F41-F50.md:67-68` (F41 REDRESS) | The copy-canon cite "out-of-place install strings as demo CONTENT (F41)… Fix: a neutral demo string" pinned `FABLE:257-258` | The quoted content spans `FABLE-STORY-FRAMEWORK.md:256-259` — the head words ("Out-of-place install strings as demo CONTENT (F41)") sit at `:256`, outside the stated pin; "Fix: a neutral demo string" closes at `:259`. Same off-by-one class the ring already cured at REGISTRY `:174`→`:175` and `search.vue:503`→`:504`. | Re-pin `:256-259`. |
| CRIT5B-5 | MINOR | `refable/REFABLE-RU-13-F31-F40.md:27-29` (F36/F37/F38 basis cells) + `redress/DOSSIER-F31-F40.md:471` (F38 body) | Sidecar basis cells still verify against the pre-RU-06 charter without a bracket: "GF-HM W3 cure" (F36), "GF-HM W5 `createStrokeDrawIn`" (F37), "User-ruling full-surface-authority framing confirmed (`GF-HM:377-386`)" (F38) | The rewritten GF-HANDMARK-PASS3 is **265 lines** — `:377-386` is beyond EOF, not merely moved (the user-ruling text lives at `:16-17`); the new wave map is W2-THE-SURFACE / W3-THE-CHOREOGRAPHY (old W3/W5 names now denote different waves — at HEAD "W5" is CONSUMER+FINAL, `:212`). The dossier's SUPERSEDED-BY-RU-06 header table correctly re-maps its own row bodies, and the sidecar's routing-section bracket covers the routing lines — but the per-row basis cells carry no read-through marker, and the R5 addendum's "Handmark rows (F34-F40) byte-stable — no movement" reads as an endorsement of the stale cells. Ownership cannot actually misdirect (the header table governs), hence MINOR. | One bracket on the sidecar verdict-table header (or the three cells): "pre-RU-06 basis — wave/gate names and GF-HM line pins read through the dossier's SUPERSEDED-BY-RU-06 table; `:377-386` is beyond the 265-line rewrite (user ruling now `:16-17`)." |

## §3 — What held (the ratified spine)

The R5 re-pin layer is otherwise exact: every FM/REDUCTION/DOC-TRUTH/MATERIAL/COLOCATION/STORY/
PERF anchor the three addenda planted re-proved verbatim at HEAD, including the load-bearing
quote set (C5's "DISCHARGED-BY-UNION — ratify-and-close", FM's "W8 is the SOLE owner of the
cuts" + "widened per the JUDGE-2 docket row 9", COLOCATION's recast-precondition pair, MATERIAL's
unioned J5 class with the F17-flipped carry). The handmark evidence layer (F34-F40) is
byte-stable and exact end-to-end; the F41-F50 src layer is exact end-to-end (typewriter born-RED
still true at `:103` with no nowrap; credentials at `:38-42`; dead knobs re-proven — baseSize/
radius never reach `surfaceStyle`; blur ladder 6-names→4-radii incl. the deep-16 and 17px-2dppx
arms; the graded-backdrop experiment + its three pre-tag commits; the F45/F48 rounding cures
pre-tag by `merge-base`). The A-dossier's correction layer holds: A15's 332/349 split matches
the census file exactly (15 Fable + 2 unattributed), A05's 66/68 counting base re-counted, A07's
move-targets live, A09's commit-dating triple exact, A16's OW-1 rider still true on disk
(50+5+3+10=68≠67 uncorrected, lead-side), A17's premise pins live. FLIP-1 (fam-I DECIDED-rows)
correctly stays LIVE; FLIP-2's CONSUMED stamp is substantively right (the quote defect aside).
No J-ruling is contradicted; no smuggled supersession found beyond the two quote/census defects
above.

## §4 — Disposition

| artifact | BLOCKER | MAJOR | MINOR | verdict |
|---|---|---|---|---|
| DOSSIER-F31-F40 (+ sidecar) | 0 | share of CRIT5B-2 | CRIT5B-5 | AMEND — the RU-09 census rider |
| DOSSIER-F41-F50 (+ sidecar) | 0 | share of CRIT5B-2 | CRIT5B-3, CRIT5B-4 | AMEND — same rider + two quote/pin trims |
| DOSSIER-A01-A17 (+ sidecar) | 0 | CRIT5B-1 | 0 | AMEND — one verbatim re-take |
| RU14-FIXLOG-R5 | 0 | 1 impeached certification (CRIT5B-1) | 0 | 16/16 cures landed; 1 landed wrong in its quote layer |

**0 BLOCKER / 2 MAJOR / 3 MINOR.** The residue is small and of one species: quote fidelity against
the committed union — one fabricated verbatim quote propagated from the CRIT4-B finding text
under a false "re-proven verbatim" certification, and one RU-09 census claim (useStagger
zero-caller) that the same union the corpus now re-pins to has explicitly overturned. Neither
moves ownership, coverage, or any verdict; both would erode a lead's trust in the evidence layer
if left standing. Cure set: one verbatim re-take (two sites), one dated census rider (four
sites), two pin/quote trims, one bracket.

*End — RU-14 ring round 5, seat B. One file; no `src/`/`demo/`/`waves/` edits, no commit.*
