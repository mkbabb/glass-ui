# STAB4 — stability critique, pass 4, BOTH lenses merged (fresh Fable seat, wrote none of it)

Scope: the STAB3 cure at commit `57212de2` ("STAB3 cure — the handmark W6/G-PROPS ladder artifacts
removed, W7 seated in the intro table"), held against disk at HEAD. This is the consecutive-clean check
after STAB3's AMEND(2): (1) verify the two STAB3 residues are cured — the GF-HANDMARK W6/G-PROPS
superseded-ladder artifact (incl. the ghost ASK-27) and the BAND-MATERIAL detached-W7 table; (2) a fresh
coherence scan over sites no prior pass touched; (3) a fresh completeness probe over one lane
(FEEDBACK-MOTION). I assumed residual faults and hunted them. TRANCHE-DEVELOPMENT: this is the only file
written; no source, no commits.

Method: read all four handmark surfaces together (GF-HANDMARK W6 row + G-PROPS gate + foot rider + PLAN §2
roster); grepped `ASK-27` across the whole tranche; read BAND-MATERIAL's intro table, its §Band-level
roll-up, and the below-roll-up W7 section; walked 4 fresh PLAN §2 roster bullets against their band files
(GATES W3, STORY W4, A11Y W1, REDUCTION W2); cross-read 3 ASK-REDUCTION rows against SUPERFLUITY §4;
checked the two PLAN §1 DAG counts; and ran the FEEDBACK-MOTION completeness lane end-to-end against PLAN §2
+ the R3b table + JUDGE J3.

---

## VERDICT: CLEAN — 0 BLOCKER · 0 MAJOR · 0 MINOR (+ 2 NOTE)

Finding counts: **BLOCKER 0 · MAJOR 0 · MINOR 0 · NOTE 2.** Both STAB3 residues are cured on disk. The
fresh coherence scan (11 checked sites) and the FEEDBACK-MOTION completeness lane (6 waves + 2 gate
sources) hold with zero substantive fault. The two NOTEs are corpus-hygiene only; one is a carry from
STAB3 NOTE-1 unresolved, neither blocks the consecutive-clean chain.

---

## 1. STAB3 residue verification (both cured)

### STAB3 MAJOR-1 — GF-HANDMARK W6/G-PROPS ladder + ghost ASK-27 — **CURED**

The three handmark surfaces now read ONE coherent story — keep · greenfield-authority · ~5 working target ·
Fable — with the superseded ≤8 ASK-gated ladder gone:

| surface | disk truth at HEAD | reads the ruling? |
|---------|--------------------|-------------------|
| W6 row `GF-HANDMARK-PASS3.md:251` | "the first-principles surface (~5-prop target; **the USER RULING grants this greenfield full surface authority**); shrink the Brush model" | YES — no "BAND-REDUCTION adopted floor", no Q-HM-2/ASK-27 ladder |
| G-PROPS gate `:278-281` | "HandMarkProps at the first-principles surface (**~5 working target**; the USER RULING grants full surface authority — the design loop derives the final set) … *RED today:* 19 props, 11 census-dead" | YES — the ≤8/appear-box-drawMs-LAND/≤7/ASK-27 chain is gone; RED-cause restated to the census 11 |
| foot rider `:377-386` | "HandMark is KEEP … FULL first-principles design authority … the ≤8 conditional ladder collapses back to the first-principles target … All handmark design waves run Fable seats" | YES — now confirmation of the lines above, not a correction of them |

`grep -rn ASK-27 docs/tranches/BJ --include='*.md' | grep -v /stability/` returns **NONE outside the
stability reports** (only STAB3 itself retains the phantom, as the record of the cured fault). The ghost is
gone from every authoritative surface. PLAN §2 handmark roster `PLAN.md:237-242` is consistent ("~5-prop
target, census floor superseded … Q-HM-1/2 resolve INSIDE the design loop … All handmark design waves run
Fable"). The STAB3 stale-floor citation, count contradiction, and ghost-gating breaks are all resolved.

### STAB3 MINOR-1 — BAND-MATERIAL detached W7 — **CURED (per the pointer resolution)**

The intro table `BAND-MATERIAL.md:33-41` now enumerates **W1-W7** (W7 `BJ.W-CSS-CLOSURE-RESTORE` at `:41`),
matching the "Seven waves:" header `:31`. The lead resolved the placement not by moving the section above the
roll-up (STAB3's suggested fix) but by the pointer route the task endorses: the intro-table row carries a
forward pointer ("full wave section below the roll-up", `:41`) and the below-roll-up `## Wave 7` section
`:701-722` is now a **full wave section** (mandate + fix + gates a-d) closing with a back-pointer "(Roster
row: the intro table, wave 7.)" `:722` — **not** the STAB3 detached one-row table. No self-contradiction
survives: the primary roster is complete at 7; the section is a proper wave body cross-linked both ways.

---

## 2. Fresh coherence scan (sites no prior pass checked)

### 4 PLAN §2 roster bullets vs their band files — all match

| PLAN §2 bullet | band-file truth | match |
|----------------|-----------------|-------|
| GATES **W3 `BJ.W-STATIC-HYGIENE`** (`:102-105`): two gates token-hygiene + orphan-CSS-partial, prop-granularity FOLDED to Family C, born-RED (drawer blur(14px), SortableList 999px, glass-chip/atom absent) | `BAND-GATES.md:212,227-247,256`: (A) token-hygiene `drawer/styles.css:379` + `SortableList.vue:144`; (B) orphan-CSS-partial glass-chip/glass-atom; (C) prop-granularity FOLDED to Family C (OPEN-8) | YES |
| STORY **W4 `BJ.W-WIDTH-HIERARCHY-TRUTH`** (`:161-163`): define `--story-article-w`, bind hero-scale, dedup heading; G-WID-1..4; heroScale field-retire STRUCK (AMEND-1) | `BAND-STORY.md:294,312-313,328-331`: G-WID-1 (token→none), G-WID-2 (`hero-scale="4"`, field-retire STRUCK AMEND-1, live at `StoryPage.vue:30→:89`), G-WID-3 (double "Aurora" h1), G-WID-4 | YES |
| A11Y **W1 `BJ.W-A11Y-STATE`** (`:207-210`): 4 live-defect fixes (nav landmark · aria-pressed both-states tri-state · center-spring focus-return · placeholder ≥4.5:1); 3 vitest DOM + 1 vitest-fs; reduced-motion CONFIRMED KEEP | `BAND-A11Y.md:39,42-44,61,110-139`: the four fixes, tri-state `active` (no new prop), "3 vitest DOM asserts + 1 vitest-fs source assert", reduced-motion band-wide non-goal KEEP | YES |
| REDUCTION **W2 `BJ.W-REDUCE-CARD`** (`:138-139`): Card axis-collapse to variant+surface (A5) + neutral defaults; G-CARD-DEFAULT-PAINT the one real-visual (gold-metal+grain at HEAD) | `BAND-REDUCTION.md:207,221-226,240,531`: axis-collapse + neutral defaults "the ONE real-DELTA", G-CARD-DEFAULT-PAINT born-RED visual (`Card.vue:33,38`), "variant+surface two-axis floor" | YES |

### 3 ASK-REDUCTION rows vs SUPERFLUITY §4 — all coherent

| ASK-REDUCTION row | its recommendation | SUPERFLUITY §4 | relation |
|-------------------|--------------------|----------------|----------|
| **A2 completion-seal** (`:63-65`) | borderline KEEP (sci-report×2 + atlas×2); inline only if ≤1 | F26 (`:591-596`): KEEP public; overrule path = retire-with-relay | CONSISTENT — SUPERFLUITY sharpens "borderline" → firm KEEP (§2 F26 `:340`), no opposite disposition |
| **C1 deck vs carousel** (`:160-164`) | keep deck-as-headless-engine + carousel; collapse only overlap, never `useDeck` | F33 (`:548-552`): KEEP both distinct; only cut = vestigial DeckPager.vue | CONSISTENT — SUPERFLUITY supports+sharpens (the overlapping shell already folded onto pager-dots) |
| **C4 tempo** (`:217-218`) | token stays; fold the thin page into springs (F29) | F30 (`:569-573`): `--motion-tempo` KEEP verbatim; fold demo page into F29, drop route | CONSISTENT — token kept, page folded; identical disposition |

The SUPERFLUITY §3 CONTRADICTIONS (C-A/C-D over the C2/C3 deferrals) are verdict-vs-standing-ruling
sharpenings routed to the lead judge, not incoherences — §3 states plainly "No two verdicts reach opposite
dispositions on the same target." My three picks show support/sharpen, never conflict.

### PLAN §1 DAG counts — both correct
- `PLAN.md:42` — "FAMILY F — BAND-MATERIAL **(7)** radius-role · blur-ladder · graded-backdrop-judge ·
  track-dry · proportion · type-codemod · css-closure-restore" — 7 items, matches (7). ✓
- `PLAN.md:44` — "FAMILY G — BAND-FEEDBACK-MOTION **(6)** toast-parity · rim-replace · motion-tune · alert ·
  idle-breath · pager-dot-morph" — 6 items, matches (6). ✓

---

## 3. Fresh completeness probe — the FEEDBACK-MOTION lane (six waves)

All six waves appear in PLAN §2 (`:215-229`) with charters matching the band file (`BAND-FEEDBACK-MOTION.md`
intro table `:25-32` + wave sections):

| W | id (band) | PLAN §2 charter ↔ band charter | match |
|---|-----------|-------------------------------|-------|
| 1 | `BJ.W-TOAST-DIALOG-PARITY` (F20) | re-home Toast onto the dialog spring/transition contract | YES (`:216`↔`:27,34`) |
| 2 | `BJ.W-PROGRESS-RIM-REPLACE` (F21) | replace broken-arc rim w/ law-12 fill-pill + dots; phantom bank named/retired | YES (`:219`↔`:28,49-58`) |
| 3 | `BJ.W-FEEDBACK-MOTION-TUNE` (F22+F24) | loop-easing + skeleton shimmer to canon assertions + demo driver off `setInterval` (J7) | YES (`:221`↔`:29,65-84`) |
| 4 | `BJ.W-ALERT-IDIOM` (F19) | Alert consumes radius table + blur ladder + codex laws; runs AFTER Material W1/W2 | YES (`:223`↔`:30,86-91`) |
| 5 | `BJ.W-IDLE-BREATH` (A01/A11) | idle breath for inert atoms (buttons first · dock pill · slider) + A01 hover; compositor-only (rAF-delta 0) | YES (`:225`↔`:31,98-107`) |
| 6 | `BJ.W-PAGER-DOT-MORPH` (F33) | pager-dot goo-morph over PagerDots/usePagerWorm, sequenced w/ vestigial DeckPager.vue cut | YES (`:228`↔`:32,130-142`) |

### W5/W6 gate sourcing — both trace

- **W5 gates ← the R3b table.** `BAND-FEEDBACK-MOTION.md:109-119` reproduces the R3b presence/absence table
  **verbatim** and cites `round-3-live/R3B-DIGEST.md` finding `engagement-idle-breath-scope`. Verified at
  `R3B-DIGEST.md:75` (the finding heading, severity major) + `:79` (the source table: Idle-breath
  Progress=YES / field=YES / Slider=NO / Button=NO / Collapsed-dock=NO; Interaction Button=weak(1.5% scale)).
  The band table matches the digest row-for-row. Gate (a) `getAnimations()` presence per inert atom, (b) the
  PRM arm, (c) rAF-delta 0 all key off this table. ✓
- **W6 gates ← Δ-F33-1 / J3.** `BAND-FEEDBACK-MOTION.md:130-133` attributes the mint to "J3 / Δ-F33-1".
  Verified at `redress/JUDGE.md:27-30`: "**J3 (Δ-F33-1 — ADOPT).** MINT `BJ.W-PAGER-DOT-MORPH` as
  BAND-FEEDBACK-MOTION **W6**: the pager-dot goo-morph/worm refinement over `PagerDots.vue` +
  `usePagerWorm.ts` … sequenced with the `DeckPager.vue` cut (SUPERFLUITY F33): the cut lands first or in the
  same wave." The band W6 charter (target files, the DeckPager-cut precondition, the worm-morph assertion)
  matches J3 exactly. `JUDGE.md:113` also lists "F33: the DeckPager.vue cut + W6 mint annotated per J3." ✓

The band's own closing (`:166-167`) accounts for all five crosswalk orphans (F19-F24) PLUS A01/A11 (W5) and
F33's dot half (W6) — zero silent drops, consistent with PLAN §6.

---

## Notes (corpus-hygiene; not counted)

- **NOTE-1** — the BAND-MATERIAL §Band-level "In-scope summary" (`:678-683`) enumerates scope by wave for
  **W1-W6** only and stops before W7, because W7 physically sits *after* the roll-up (the accepted
  pointer resolution). The primary roster (intro table, `:33-41`), the header, the DAG, and PLAN §2 all
  carry W7, so this is an incomplete prose recap, not a miscount or contradiction — NOTE, not MINOR.
  Optional: add a W7 clause (css-closure restore → flips GATES W3 orphan-CSS-partial) to the summary.
- **NOTE-2 (carry from STAB3 NOTE-1)** — the W7 section header still reads "(STAB1 MAJOR-1 cure)"
  (`BAND-MATERIAL.md:701`) while its body says "Minted at STAB1-COMPLETENESS" (`:703`); STAB1-COHERENCE also
  has a MAJOR-1, so the bare label is ambiguous. Unapplied since STAB3. Add "-COMPLETENESS" to the header.

---

## Register (evidence anchors)

| # | sev | site | disk truth |
|---|-----|------|-----------|
| R1 | — (cured) | GF-HANDMARK-PASS3.md:251 + :278-281 + :377-386; PLAN:237-242 | three handmark surfaces read ONE story (keep · greenfield-authority · ~5 · Fable); no ASK-27, no ≤8 ladder |
| R2 | — (cured) | BAND-MATERIAL.md:31,33-41,701-722 | intro table W1-W7; below-roll-up W7 is a full section w/ bidirectional pointer, not a detached one-row table |
| R3 | — (holds) | PLAN:102-105/161-163/207-210/138-139 vs GATES/STORY/A11Y/REDUCTION | 4 roster bullets match their band files verbatim-faithful |
| R4 | — (holds) | ASK-REDUCTION A2/C1/C4 vs SUPERFLUITY §4 F26/F33/F30 | 3 ASK recs coherent with the superfluity verdicts (support/sharpen, no conflict) |
| R5 | — (holds) | PLAN:42 / :44 | DAG says MATERIAL (7) + FEEDBACK-MOTION (6); both item lists count out |
| R6 | — (holds) | BAND-FEEDBACK-MOTION.md:25-32 vs PLAN:215-229; R3B-DIGEST:75-79; JUDGE:27-30 | all 6 FM waves in PLAN w/ matching charters; W5←R3b table verbatim, W6←J3/Δ-F33-1 |
| NOTE-1 | NOTE | BAND-MATERIAL.md:678-683 | In-scope summary recaps W1-W6, omits W7 (post-roll-up placement) |
| NOTE-2 | NOTE | BAND-MATERIAL.md:701 vs :703 | W7 header "STAB1 MAJOR-1" unqualified (STAB3 NOTE-1 carry) |

**Single most-important result: both STAB3 residues are cured on disk** — the handmark ruling now reads one
way across all four surfaces with the ghost ASK-27 gone, and BAND-MATERIAL's W7 is seated in the primary
roster with a proper cross-linked section. The fresh coherence + completeness sweeps found no substantive
fault. This pass is **CLEAN**; with STAB3's cure landed and this pass clean, the consecutive-clean chain
advances (STAB3 AMEND(2) → cure → STAB4 CLEAN).
