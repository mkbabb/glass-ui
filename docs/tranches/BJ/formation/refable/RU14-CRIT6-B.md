# RU-14 — redress critique, ring round 6 — seat B (F31-F50 + A01-A17)

- **modelId (verbatim from system context):** `claude-fable-5`
- **Charge:** fresh adversarial critic over `redress/DOSSIER-F31-F40.md`,
  `redress/DOSSIER-F41-F50.md`, `redress/DOSSIER-A01-A17.md` + their `refable/REFABLE-RU-13-*`
  sidecars, as amended through `RU14-FIXLOG-R6.md`. Corpus presumed wrong until re-proven —
  including every R6 cure.
- **Verification base:** HEAD `4daf5c02` (master). The R6 corpus edits are working-tree-only (the
  six dossiers + six sidecars modified, `RU14-FIXLOG-R6.md` untracked — `git status` re-proven this
  seat); the R5 corpus + CRIT5 pair + R5 fixlog ARE committed (`git diff --stat 7aec864d..HEAD --
  docs/tranches/BJ/` = exactly those 15 files, as the R6 fixlog states). `waves/` parity
  (`7aec864d..HEAD` = EMPTY) and `src/`+`demo/` parity (same diff = EMPTY) both re-proven — every
  paint-tree pin was judged against the same bytes all prior passes saw.
- **Anchors re-proven on disk this seat: ~230.** The committed nine-band layer: REDUCTION
  `:50-56/:76-77/:86-95/:276-282/:287-290/:296-306/:321/:323/:335/:411/:638-641/:677/:701-702/
  :735-742` (the `:279-280` truth-up quote VERBATIM; the `:299-304` useStagger OVERTURN + `:52-54`
  lesson + `:88-93` §C3 re-issue + close-roster item 5 all exact); FM
  `:40/:53/:189/:236-237/:241/:250-251/:260-261/:278`; DOC-TRUTH `:48/:112/:121/:133-134` (T40 +
  the PROCEDURAL-SUITE routing verbatim); STORY `:212/:254-256/:307/:325/:459/:461/:633/:672-673/
  :679`; MATERIAL `:9/:52/:60/:78-79/:94/:135/:146-149/:160/:212/:333-335/:340/:458/:567-570/
  :590-594` (the J5-class quote verbatim); PERF `:52/:88-91/:92-96` (74 files/770KB/1.09MB);
  COLOCATION `:38-39/:91/:102/:284-288/:326`. Greenfields: GF-HM (265 lines; `:16-17` user ruling;
  `:207-212` wave map; `:31/:126-129/:158-165/:240/:248/:250`; old-gates grep 0); GF-DOCK
  (`:52-54/:115-117/:180/:318/:322/:363-367/:369-372/:388-389` — the G-REACH RED quote VERBATIM);
  GF-BLOB `:284` + §2.9; GF-AURORA `:168-170/:241`. FSF
  `:224/:255-260/:396-400/:413/:421/:427-429/:436-439/:588-592` (the F41 canon spans `:256-259`
  exactly as re-pinned). Formation: crosswalk `:53-72` (all 20 in-scope flags) +
  `:205-207/:217-220/:231-233` (COUNTS 50+5+3+10=68≠67 STILL on disk — the A16 OW-1 rider holds);
  REGISTRY `:66-67/:174-175`; CHRONIC `:5/:22-25`; JUDGE `:38`; ASK-REDUCTION
  `:120/:148/:190/:196-199/:227`; ledger rows A2 (APPLIED `dda87dcc`)/C5 (`:35`, rows 5+9
  only)/E1/E2 (PENDING)/H2; FEEDBACK-LEDGER rows F31-F33/F41/F47-F50 verbatim; PROCEDURAL-SUITE
  `:11/:57-59`; ADJUDICATION-1 `:9/:49`; SUPERFLUITY `:632/:658-661`; RF-4 `:43/:46/:84`; RF-1
  `:74`; CENSUS-CLASSIFICATION `:154`; model-census.json = 349 seats (332 opus / 15 fable / 2
  unattributed); BI.W-ENGAGE-AFFORD `:291-295`; R3B-DIGEST + component-graph triple extant;
  `DECIDED-rows` across waves+PLAN = the one T40 hit; manifest `pageType` grep 0. Src/demo (all
  exact): brush.ts ×15 lines, `useHandMark.ts:113`, `constants.ts:57/:61`, HandMark.vue ×8 spans,
  `paper.css:124-126`, handmark.vue ×9 spans, `geometry.ts:143-167`, `ink.ts:195-215`,
  EasingPicker (518 lines, `:1-2/:327/:336/:345` — the 38cqi style VERBATIM; container-type grep
  0), EasingConfigurator `:1-3`, curve-gallery `:189-195`, `typewriter.vue:103` (+ nowrap 0),
  text-motion `:11-16`, auth-shell `:27/:38-42/:64-66/:193/:207-218`, settings (`:29-30` dead
  knobs — `surfaceStyle` consumes neither, re-grepped), gate-pattern `:119/:143-145/:156-158`,
  field-control `:32-49` (the concentric rule = comment `:37-45` + selector block `:46-48`),
  radius.css `:32-34/:141`, glass.css `:86-88/:138-142/:171-173`, light-dark `:36`, glass-deep
  16px, ModalOverlay `:49/:98`, DialogContent `:466-468`, SectionPreviewCard
  `:17-19/:35/:63-65/:87-92`, storyTile `:41-44`, `.tile.vue` census = 4, intro `:38-40/:79-81`,
  BottomDock `:17-22/:42/:65-68/:161/:184/:221/:252`, overflow.css `:62-66/:76-78/:91-105` +
  scroll-snap grep 0, `useSelectionGroup.ts:183-186`, Slider (651, `:420-424` box-INVIOLATE),
  `PagerDots.vue:326` ≡ `DeckGooFilter.vue:26` (byte-identical), deck.vue `:19-20/:31/:90/:127`,
  the goo-clone file set extant, AppShell `:11/:21-23/:26`, `aurora-hero.ts:15-16`, demo presets
  17 exact (`:685-703`), src `constants/presets.ts:73-78`, wgsl `applyMedium` at `:387`,
  `Blob.vue:354`, reka `SliderThumbImpl.vue:59-60`, engage-surface grep 0, breath = 108 src-wide /
  0 in `button/`, src/components = 66 dirs + 2 files = 68 entries, A05 census targets all present,
  `dialog.confirm-preset.test.ts` extant + imports gate-pattern. Cross-repo AT FIRST HAND:
  `speedtest/src/features/speedtest/ui/ResultStack.vue:171` +
  `composables/useResultReveal.ts:36` DO live-import `useStagger` — the union's OVERTURN evidence
  is true on the sibling's disk. Commits: all six rounding/halo hashes `merge-base`-proven v7.0.0
  ancestors (tag commit `4ab12128`); Downloads corpus = 31 items / 9 mp4-mov (8 unique + copy);
  IOS27-CODEX history: `f9813c97` (13-law original) → `63239549` RU-16 rewrite 07-18 01:01
  ("13 opus laws to 18 Fable laws").

## §1 — Fixlog re-verification (R6 cures in scope, hostile re-proof)

| cure | state this seat | evidence |
|---|---|---|
| CRIT5B-1 (A14 fabricated quote re-taken) | **LANDED, true** | On-disk `BAND-REDUCTION.md:279-280` reads exactly "`src/components/PROCEDURAL-SUITE.md` LiquidGrid rows (`:11`, `:57-59`) truth-up joins THIS wave's delete scope — the retained-suite doc must not list a deleted member"; both corpus sites (`DOSSIER-A01-A17.md:376-381`, sidecar `:103-107`) now carry it verbatim with the paraphrase provenance annotated; "mechanical bundle" survives only as historical annotation in the provenance brackets + ring history. The R5 false-certification record is present in the fixlog + the A-sidecar R6 addendum. |
| CRIT5B-2 (useStagger census rider ×4 sites) | **LANDED, true** | All four charged sites carry the dated R6 rider (dossier F32 rider `DOSSIER-F31-F40.md:165-169` + summary `:589`; `DOSSIER-F41-F50.md:123-128`; sidecar mirrors `REFABLE-RU-13-F31-F40.md:116-120`, `REFABLE-RU-13-F41-F50.md:97-100`); the zero-caller roster reads `useStaggerReveal`/`useBloomUp`/`useTextHighlight` everywhere (band-consistent: `:321/:323/:335`); the §C3-refresh directives point at `:88-93`/ledger E2; ownership unmoved. The OVERTURN evidence re-proven at first hand on speedtest's disk (`ResultStack.vue:171`, `useResultReveal.ts:36`). |
| CRIT5B-3 (F47 G-REACH quote verbatim) | **LANDED, true** | `GF-DOCK-PASS3.md:369-372` on-disk RED = "`BottomDock` routes through `goTo()` with no recenter (F47b); recenter-on-select only exists in `useSelectionGroup` rails" — the dossier bullet (`DOSSIER-F41-F50.md:398-401`) now matches word-for-word, pin present. |
| CRIT5B-4 (F41 pin `:256-259`) | **LANDED, true** | FSF head words at `:256`, "Fix: a neutral demo string" closing at `:258-259`; dossier `:68` and sidecar F41 cell both re-pinned. |
| CRIT5B-5 (pre-RU-06 basis bracket + F38 re-anchor) | **LANDED, true** | The read-through bracket heads the sidecar verdict table (`REFABLE-RU-13-F31-F40.md:20-26`) covering the F36/F37/F38 cells and defusing the R5 "byte-stable" endorsement read; the dossier F38 body pin now `GF-HM:16-17` (`DOSSIER-F31-F40.md:478-479`); the 265-line count, `:16-17` ruling, and `:207-212` wave map all re-proven. |

**Fixlog refutations: none.** All five in-scope R6 cures landed and landed right; the fixlog's
verification-base paragraph (commit topology, waves parity, src/demo parity) re-proven exact.
The two out-of-fence corrections it records (the R4A-6 CURED-less-one; the impeached R5
"re-proven verbatim" certification) are both present and accurate.

## §2 — Findings

| id | severity | file | claim | evidence | required cure |
|----|----------|------|-------|----------|---------------|
| CRIT6B-1 | **MAJOR** | `redress/DOSSIER-A01-A17.md:74-76` (A02 CORRELATION) | The codex is described "(13 laws + 5 BEST-vectors)" and "the codex manifest (\"8 recordings, 148 frames @1fps, ~22 stills\") is the corrected census" | **Both descriptors are rotted by the RU-16 codex rewrite — uncaught by five ring rounds.** `IOS27-CODEX.md` at HEAD is the RU-16 REFABLE union (`63239549`, 07-18 01:01, "13 opus laws to 18 Fable laws"): **18 numbered laws** (`:11-37`, with [AMENDED]/[REPLACED]/[NEW] tags) + a **6-bullet** BEST section (`:39+`); the old 13-law/5-bullet shape (`f9813c97`) is gone. The quoted manifest text ("8 recordings, 148 frames @1fps, ~22 stills") no longer exists in the file — the RU-16 evidence basis reads "6 iOS recordings (dense 4/12/20/60fps bursts…) + ~20 stills" and **EXCLUDES the two `Screen Recording 06-22 14.38.42` .movs as non-iOS (Anthropic Cowork desktop) "from every dock/card/tab/glass claim"** (`:5`). So the "corrected census" A02 endorses has itself been superseded: a design wave reading A02 would count all 8 recordings as iOS evidence when the design authority admits only 6. The disk census (31 items, 8 unique recordings + 22 stills) remains true as a FILE count — the rot is the codex-manifest layer. Neither the dossier nor the sidecar mentions RU-16 anywhere (grep 0); prior rounds verified only laws 1/12 (which happen to survive the renumber — the F49/F50 dossier cites stay correct). | Dated R7 rider on the A02 CORRELATION + the sidecar A02 row: re-point the codex descriptors to the RU-16 union (18 laws + 6 BEST vectors, `63239549`); restate the census in two layers — 8 unique recordings + 22 stills ON DISK, of which 6 recordings are iOS EVIDENCE + 2 excluded desktop captures per the codex `:5`; note A02's Fable cure now spans RU-15 (marks) + RU-16 (codex). No verdict movement — EXACT-VIA-RU-15 stands at the deliverable layer. |
| CRIT6B-2 | MINOR | `redress/DOSSIER-F31-F40.md:208-209` (F33 ISOLATION, the RU-14 corrected block) | Quoted as register text: "the metaball-merge is the INDICATOR's job… the ONE metaball morph" | On-disk `CarouselContent.vue:8` reads "**A** metaball-merge is the INDICATOR's job (the pager worm," — article + case drift inside quotation marks (the second fragment, `:17` "the ONE metaball morph", IS verbatim). A grep for the quoted head words returns zero. Same species the ring cured at CRIT5B-3; content, pin (`:4-18`), and substance all hold. | Re-take the first fragment verbatim ("A metaball-merge is the INDICATOR's job") or drop the quotation marks; no other movement. |
| CRIT6B-3 | MINOR | `redress/DOSSIER-F41-F50.md:616-617` (Consumed deltas) + `refable/REFABLE-RU-13-F41-F50.md:120-121` (R5 addendum) | "the band pins the selector alone at `:47-49`, the same rule at two grains" / "the band's `:47-49` (selector alone)" | The selector block on disk is `field-control.css:46-48` (`:46` selector, `:47` declaration, `:48` brace; `:49` blank) — the band's `:47-49` pin is off by one, and the corpus's gloss endorses it as exact ("selector alone") instead of naming the drift. The dossier's own `:37-48` pin is exact (comment `:37-45` + rule `:46-48`), the band pin is lead-side (waves fence), and the rule is unambiguous — cannot misdirect. | Reword both sites: "the band's `:47-49` is the rule-body grain (one high of the `:46-48` selector block — a lead-side pin)"; no band edit from the ring fence. |
| CRIT6B-4 | MINOR | `redress/DOSSIER-A01-A17.md:99` (A03) vs `:269` (A10) | A03: "the proportion content is codex laws 3/4"; A10: "design authority = codex laws 4/10" | Law 3 at HEAD (and in the pre-RU-16 codex — numbering 1-13 is unchanged) is "Specular edge caustic, not a border" — no proportion content; the proportion clause lives in law 4 ("Proportion: shelf gaps ≈ the pill's own corner radius…") with the hierarchy ladder at law 10. The same dossier cites the proportion authority two ways ("3/4" vs "4/10") for the same wave (`BJ.W-ARISTOTLE-PROPORTION`); A10's pair is the defensible one. The band carries its own correct authority line (`BAND-MATERIAL.md:60/:78-79`), so no wave misdirects. | Correct A03's cite to laws 4/10 (or 4 + the restraint floor 11, whichever the R7 sweep rules), aligning the two rows; fold into the CRIT6B-1 rider sweep. |

## §3 — What held (the ratified spine)

The R6 quote layer is now exact end-to-end in scope: the `BAND-REDUCTION.md:279-280` truth-up
quote, the GF-DOCK G-REACH RED, the FSF F41 canon span, and the GF-HM read-through bracket all
re-proved verbatim at HEAD — the CRIT5 cure species (quote fidelity, pin currency, consumption
tense) is discharged. The useStagger OVERTURN rider is not merely band-consistent but
first-hand-true on speedtest's disk. The handmark evidence layer (F34-F40) is byte-stable and
exact (brush weights 6/7/3/16/12/26, grain 0.7, the dual-draw pins, the demo jargon captions, the
isolation-isolate mechanism); the F41-F50 src layer is exact (typewriter born-RED live at `:103`,
credentials at `:38-42`, dead knobs re-proven dead, the blur ladder 6-names→4-radii incl. deep-16
and the 17px 2dppx arm, the graded-backdrop experiment + its six pre-tag commits by
`merge-base`). The A-dossier's correction layer holds: A15's 332/349 split exact against the
census file, A05's 66/68 base re-counted, A07's move-targets live, A11's breath split (108
src-wide / 0 atoms) re-grepped, A16's OW-1 rider still true (COUNTS 68≠67 uncorrected on disk,
lead-side), A17's premise pins live, T40 still the one `DECIDED-rows` hit — FLIP-1 correctly
LIVE, FLIP-2 correctly CONSUMED with an honest quote. Crosswalk flags for all twenty in-scope
rows match the dossiers' STATUS CHECK cells. No J-ruling contradicted; no smuggled supersession;
no coverage overstatement found beyond the codex-descriptor rot above.

## §4 — Disposition

| artifact | BLOCKER | MAJOR | MINOR | verdict |
|---|---|---|---|---|
| DOSSIER-A01-A17 (+ sidecar) | 0 | CRIT6B-1 | CRIT6B-4 | AMEND — one dated RU-16 re-point rider |
| DOSSIER-F31-F40 (+ sidecar) | 0 | 0 | CRIT6B-2 | AMEND — one quote re-take |
| DOSSIER-F41-F50 (+ sidecar) | 0 | 0 | CRIT6B-3 | AMEND — one gloss reword (two sites) |
| RU14-FIXLOG-R6 | 0 | 0 | 0 | 5/5 in-scope cures LANDED true; verification base exact |

**0 BLOCKER / 1 MAJOR / 3 MINOR.** The CRIT5 residue is fully cured — nothing re-opens. The one
MAJOR is a NEW rot class no prior round swept: the A02 row still describes the pre-RU-16 codex
(13 laws / 5 vectors / the 8-recording manifest) while the design authority at HEAD is the
RU-16 union (18 laws / 6 vectors / 6 iOS recordings + 2 exclusions) — the same
greenfield-re-point discipline the ring already applied to GF-HM/GF-DOCK/GF-BLOB/GF-AURORA was
never applied to the codex. Cure set: one dated rider (two sites + the A03/A10 cite alignment),
one verbatim re-take, one gloss reword. No ownership, coverage, or verdict moves anywhere.

*End — RU-14 ring round 6, seat B. One file; no `src/`/`demo/`/`waves/` edits, no commit.*
