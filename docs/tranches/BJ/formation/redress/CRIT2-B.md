# CRIT2-B — fresh Fable critique (pass 2, seat B — consecutive-clean check)

Second adversarial pass over `DOSSIER-F31-F40.md`, `DOSSIER-F41-F50.md`, `DOSSIER-A01-A17.md`
**as amended by the pass-1 fix pass** (`FIXLOG-PASS1.md`; prior critique `CRIT1-B.md`). I did not
write the dossiers, the pass-1 critique, or the fixes — I assumed residual faults and hunted them.
Tranche-development only — this file is the sole artifact, no `src/`/`demo/` touch, no commit.

**Method (what I actually did this pass).**
- HEAD moved since the dossiers were authored (`55f5170d` → `b29beaa9`, `v7.0.0-25`). Verified
  `git diff --stat 55f5170d..HEAD -- src/ demo/` is **EMPTY** — every commit since is docs-only
  (`docs/tranches/BJ/**`), so all `src/`/`demo/` anchors that were disk-true at authoring remain
  disk-true at HEAD.
- **Spot-verified ~40 `src/`/`demo/` anchors** (well past the ten-anchor floor): all of `brush.ts`
  (111/140/144/153/154/160/184/222/235/262/266), `constants.ts` 57/61, `ink.ts` se-guard,
  `HandMark.vue` 290/312/327/338/341/351/352, `typewriter.vue:103`, `field-control.css` (base pill
  `:34` + F7 rule `:46-47`), `radius.css` 32/34/141, `auth-shell.vue` 27/38-42/64/99,
  `gate-pattern.vue` 119/143-150/156-158, `SectionPreviewCard.vue` 28/35/63/65/87/88/90/91,
  `BottomDock.vue` 17-20/42/48, `glass.css` blur-ladder + halo 171-173, `ModalOverlay.vue:49`,
  `deck.vue:127`, `paper-backdrop/` presence.
- **Re-checked every REDRESS owner citation against the CURRENT band files** (the load-bearing part
  of a consecutive-clean pass): `BAND-STORY` (G-CFG-5 `:269`, G-COPY-2/3/4 `:195/196/197`,
  W-PREVIEW-CARD `:355`, G-PRV-2/3/4 `:393-395`, OPEN-D3 `:506-509`, perf split `:47-51`, A01/A11
  cross-ref `:258`, adoption block `:545`), `BAND-MATERIAL` (dialog=card `:74`, F45 §D `:110-115`,
  OPEN-1a `:135/165`, OPEN-2a-2d `:210/219/222/254`, W3 `:288` + OPEN-3a `:368-369`, W5 `:456-461`,
  double-card cross-ref `:486-488`, converse `:504-506`, F12/F17 guard `:667-669`),
  `BAND-FEEDBACK-MOTION` (full read — F19-F24 only), `BAND-REDUCTION` (`:74-76/156-160/306-312/356`),
  `ASK-REDUCTION` (§B4 `:120`, §C1 `:148`, §C2 `:171`, §C3 `:190`, §D1 `:227`, §A2 `:53`, fixture
  re-home `:235-238`, roll-up `:266`), and the FSF amendments D-4/D-5/D-6/D-8 (`:288/296/302/311`) +
  G-COPY-LINT (`:403-407`).
- **Read four screenshots first-hand that CRIT1-B did NOT read** (F36, F41, F43, F46), to add
  independent coverage beyond CRIT1-B's six (F34/F40/F45/F47/F48/F49).
- Read `formation/superfluity/SUPERFLUITY.md` in full and reconciled its F33 / F32+F42 / F08 / F26 /
  F18 verdicts against the rows in scope.

**Headline.** All three CRIT1-B fixes landed correctly and no new BLOCKER/MAJOR/MINOR surfaced.
Anchor fidelity is total (helped by the frozen `src/`/`demo/` tree), owner citations resolve on the
current band files including the newer OPEN labels, and screenshots are faithful. The only new
material is superfluity-alignment guidance for the lead judge (NOTEs), where a *newer* confrontation
artifact sharpens a recommendation the dossiers accurately reported at authoring.

---

## DOSSIER-F31-F40

### Fix-verification (CRIT1-B findings for this dossier)

| CRIT1-B finding | sev | FIXLOG action | landed? | evidence |
|---|---|---|---|---|
| #11 Δ-F33-1 option (b) mis-targets `BI.W-ENGAGE-AFFORD` | MINOR | APPLIED (drop opt b) | **LANDED** | Current Δ-F33-1 (`:482-495`) is single-proposal: "add a fifth wave to `BAND-FEEDBACK-MOTION` — `BJ.W-PAGER-DOT-MORPH`." No option (a)/(b) split, no `BI.W-ENGAGE-AFFORD` mention. |
| #12 F35 retract-of-retract citation unread | NOTE | SKIPPED | **CORRECT SKIP** | Pure completeness observation; no dossier-change directive. I re-read `GF-HM:32-33` context indirectly via the gate collapse — consistent with the retract; nothing to apply. |
| #13 F33/F40 coverage-summary flavor | NOTE | SKIPPED | **CORRECT SKIP** | "Self-consistent convention, not a defect." Confirmed. |

### New findings

None at BLOCKER/MAJOR/MINOR. Independent re-checks that held:
- Δ-F33-1 is fully substantiated on disk: `BAND-FEEDBACK-MOTION` covers exactly F19/F20/F21/F22/F24
  (W1-W4) with **zero** F33/pager/`usePagerWorm`/deck references — the dot-refinement residue is real
  and unowned. `crosswalk:55` ("dot-refinement → motion (unassigned)"), `:205-207` (flagged
  ambiguity), and `:213-216` (the ORPHAN-cure lists F20/F21/F22/F24/F19, **not** F33) all verbatim.
- F36 read first-hand: torn gold blob escaping below the card's bottom border + no visible highlight
  over "The part that really matters here" — matches the F36 isolation exactly.
- All eleven `brush.ts` scalar anchors + `constants.ts` NOISE_OCTAVES/AMP + `HandMark.vue` structural
  anchors + `ink.ts` se-guard fallback (`if (outline.length < 4 || hullD === "")` @ `:203`, push
  @ `:204-209`; the dossier's `:200-206` correctly frames the fallback code, not just the comment).

### Superfluity-alignment notes

- **NOTE — F33 squares with SUPERFLUITY, with one Δ-F33-1 coordination point.** SUPERFLUITY F33 =
  **KEEP-DISTINCT** and SUPPORTS ASK-REDUCTION §C1 — full agreement with the dossier's deck-vs-carousel
  EXACT verdict (headless `useDeck` engine + atlas ×2; carousel visual). The dossier's ISOLATION that
  `DeckPager.vue` is a "thin `PagerDots` wrapper" matches SUPERFLUITY's "49-line `PagerDots` wrapper."
  SUPERFLUITY adds a NEW micro-fold: **cut the vestigial `DeckPager.vue`** (replace the `deck.vue:127`
  usage with a direct `PagerDots pattern="group" :ring="false"` call, drop the export; routed to
  reduction). This does **not** conflict with Δ-F33-1 — the morph-refinement target is the substrate
  (`usePagerWorm.ts` + `PagerDots.vue`), which survives the wrapper cut, and the Δ-F33-1 π "across an
  index change on `/motion/deck`" still captures (the page renders `PagerDots` directly post-cut).
  **For the judge:** sequence `BJ.W-PAGER-DOT-MORPH` (feedback-motion) with the `DeckPager` cut
  (reduction); Δ-F33-1's descriptive parenthetical "both `DeckPager` and `CarouselPager` ride" goes
  stale after the cut (becomes direct `PagerDots` on `/motion/deck` + `CarouselPager`) — a one-phrase
  update at execution, non-blocking. Not a dossier defect.
- **NOTE — F32 (shared with F41-F50/F42): SUPERFLUITY sharpens the §C3 recommendation.** See the F42
  note below; it applies jointly to F32.

**Verdict: CLEAN.** The one CRIT1-B MINOR landed; the two NOTE-skips were correct; every disk/gate/
screenshot/owner claim earns its call. Superfluity aligns (deck-vs-carousel) with one non-blocking
coordination NOTE.

---

## DOSSIER-F41-F50

### Fix-verification (CRIT1-B findings for this dossier)

| CRIT1-B finding | sev | FIXLOG action | landed? | evidence |
|---|---|---|---|---|
| #14 F45 STATUS asserts F45 rides OPEN-1a; disk = F09/F12/F17-only | MINOR | APPLIED | **LANDED** | F45 REDRESS pt 2 (`:234-243`) now reads "not yet in OPEN-1a's live-π set (OPEN-1a is scoped to F09/F12/F17 at `:135,165`; F45 is a §D bullet at `:110-115` that Δ-F45-1 appends)"; STATUS (`:245-248`) scopes the disagreement to "W1's F45 SCOPE TEXT." Disk confirms: `BAND-MATERIAL:135/165` = OPEN-1a F09/F12/F17; `:110-115` = the F45 §D bullet. |
| #15 cross-dossier HEAD drift | NOTE | SKIPPED | **CORRECT SKIP** | Header records the authoring HEAD; rewriting falsifies the record. All anchors re-verified disk-true at current HEAD regardless. |
| #16 F45 base-pill line drift (":34" cited; "sits ~:42 on disk") | NOTE | SKIPPED | **CORRECT SKIP — and CRIT1-B's note was itself wrong.** | On disk `field-control.css:34` **is** `border-radius: var(--radius-pill);` — the dossier's `:34` is dead-on; CRIT1-B's "~:42" was a mis-measure. The skip (decline) was right, and the dossier anchor needs no change. |

### New findings

None at BLOCKER/MAJOR/MINOR. Independent re-checks that held:
- Δ-F45-1's whole premise re-substantiated on disk: `BAND-MATERIAL:110-115` (§D F45) frames the target
  as *"the input/button coherence is the sweep target"* and describes the on-disk hits only as
  *"`rounded-full` icon tiles (correct)"* — it does **not** cite `field-control.css:37-48`, the landed
  F7 concentric rule (`[data-slot="dialog-content"] .field-control[data-kind="input"] { border-radius:
  var(--radius-field) }` @ `:46-47`, comment naming the "Rename workspace" Slug case verbatim). So W1
  would born-RED against the intended coherent state unless the delta re-aims it — exactly Δ-F45-1's
  point. The F12/F17 regression-guard precedent it cites (`:667-669`) is real verbatim.
- The dossier correctly treats the **binding FSF amendments as terminal owners** over the band files'
  stale inline text: `AMEND-D-6` (`FSF:302`) closes OPEN-D3 by pinning `typewriter.vue:103` even
  though `BAND-STORY:506-509` still reads "locate at execution"; `AMEND-D-5` (`FSF:296`) resolves the
  F46 double-card even though `BAND-STORY:355/393` still say "LIVE miniature." The dossiers cite the
  amendment (which the lead adjudication `BAND-STORY:545` binds), not the superseded inline line —
  correct precedence, and F41/F46 flag the supersession explicitly.
- All BAND-MATERIAL OPEN labels the dossiers lean on exist verbatim: OPEN-2b (`:219/282`), OPEN-2c
  (`:222/283`), OPEN-3a (`:368` "the single most load-bearing OPEN in this band"). `:486-488` literally
  reads "fix owned by `BAND-STORY` `W-PREVIEW-CARD`" — confirming F46's "not a second owner" claim.
- F41 and F43 read first-hand: F41's `$ npm install @mkbabb/glass-ui` terminal panel + configurator
  row, and F43's putrid olive→khaki→mauve wash + the SOC 2 / End-to-end / 12k-teams fabricated trust
  rows — both match the isolations exactly. `auth-shell.vue:39-41` credentials + `BAND-STORY:196`
  G-COPY-3 "→ :39-41" disk-true.

### Superfluity-alignment notes

- **NOTE — F42 + F32: SUPERFLUITY sharpens §C3 from "design call" to a ratifiable table.** SUPERFLUITY
  F32-F42 = **COLLAPSE-FAMILY** and SUPPORTS the consolidation direction + the two-page collapse the
  dossiers recommend (fold `/motion/reveal` into `/motion/scroll`; keep the ≥2-consumer keeps incl.
  `fading-scroll`). It **UNDERMINES the deferral** (its Contradiction **C-D**): the corrected Q060
  census + grep resolve the full 9-keep / 6-cut kill/keep table, so §C3's "exact merge shape reserved
  to the user as a design call" should be upgraded to a firm ratifiable recommendation. The dossiers'
  F32/F42 **owner (§C3) and coverage (EXACT-decision) still hold** — the row routes to §C3 either way —
  so this is a *recommendation-sharpening for the lead judge*, not a dossier coverage break. The
  dossier's phrase "the census … cannot mint the taxonomy unilaterally" (F32) reflects §C3 as it stood
  at authoring; SUPERFLUITY (committed *after* the dossiers, `b29beaa9`) is the artifact that now moves
  it. Flag for the judge to adopt the sharpened §C3 text; no dossier edit required for CLEAN.

**Verdict: CLEAN.** The one CRIT1-B MINOR landed; both NOTE-skips were correct (and #16's underlying
note was itself a mis-measure the dossier had right). Δ-F45-1 is sound and appendable as written.

---

## DOSSIER-A01-A17

### Fix-verification (CRIT1-B findings for this dossier)

| CRIT1-B finding | sev | FIXLOG action | landed? | evidence |
|---|---|---|---|---|
| #17 A14 over-generous EXACT (paper-backdrop un-dispositioned) | MINOR | APPLIED (EXACT→PARTIAL + D-A14 + retally) | **LANDED** | A14 REDRESS (`:551`) = "PARTIAL — residue: `paper-backdrop`"; STATUS (`:555-556`) = "AGREE … the un-dispositioned `paper-backdrop` member is the one coverage residue (D-A14)"; summary table (`:661`) A14 = PARTIAL; tally (`:666`) = **EXACT 11 · PARTIAL 5 · MISSING 1**, Deltas 6; D-A14 delta present (`:719-725`). Retally re-counted from the table and is internally consistent (EXACT: A02/03/05/07/09/10/12/13/15/16/17 = 11; PARTIAL: A01/04/06/08/14 = 5; MISSING: A11 = 1; deltas D-A01/04/06/08/11/14 = 6). |
| #18 A11 severity framing (MISSING vs PARTIAL) | NOTE | SKIPPED | **CORRECT SKIP** | "Defensible convention"; D-A11 stands under either framing. |
| #19 A02/A06/A08 unverified-by-me | NOTE | SKIPPED | **CORRECT SKIP** | Completeness disclaimer; no change directive. |

### New findings

None at BLOCKER/MAJOR/MINOR. Independent re-checks that held:
- **D-A14 is disk-true.** `src/components/paper-backdrop/` EXISTS; a grep for `paper-backdrop` across
  `docs/tranches/BJ/waves/`, `ASK-REDUCTION.md`, and `greenfields/` returns **empty** — it carries no
  greenfield, no ASK, no delete. The A14 PARTIAL and D-A14 (route it into the reduction ≥2-consumer
  census) are correct.
- **D-A11 (the campaign headline) re-confirmed.** `BAND-FEEDBACK-MOTION.md:15-16` literally reads
  "this band REFINES that motion, it does not add breath (that is `BI.W-ENGAGE-AFFORD`'s charter)";
  `BAND-STORY.md:258` cross-refs A01/A11 breath-of-life to family G "referenced, not authored here."
  So idle-breath for the inert atoms is nominally assigned to a wave whose scope excludes it — the
  DISAGREE is demonstrable, not merely defensible. (CRIT1-B already UPHELD this against source; I
  re-hit the two independent disclaimers above and concur.)
- A10's W5 owner is disk-true: `BAND-MATERIAL:456-461` discharges A10 with the ledger quote verbatim;
  `:480/504-506` carry the converse ("proportion demanding content"); `:486-488` marks the double-card
  and routes the fix to `BAND-STORY W-PREVIEW-CARD` (consistent with F46).

### Superfluity-alignment notes

- **NOTE — SUPERFLUITY corroborates A05 and A13; no A-row conflict.** The confrontation IS the
  operational F04/A05 ≥2-consumer reduction audit, and its outcomes support the A-dossier rather than
  contradict it:
  - **F08** (aurora) = **COLLAPSE-FAMILY** "remove the `applyMedium` 3/5/6/7→kuwahara alias … bound to
    W1-W4 real-body authorship, `G-MODE-DISTINCT` green" — this **squares exactly** with the dossier's
    **A13 EXACT** (GF-AURORA §3.3 kills the `applyMedium:399-400` four-way Kuwahara collapse; born-RED
    `G-MODE-DISTINCT`). Strong corroboration.
  - **F26** (completion-seal) = **KEEP-DISTINCT**, its "belongs only in speedtest" premise a **verified
    factual error** (speedtest imports it zero; real census sci-report ×2 + atlas ×2). **F26 is not a
    row in any of my three dossiers** (it lives in `DOSSIER-F21-F30`, seat A's scope), so there is no
    F26 treatment here to conflict — but its ≥2-consumer KEEP, and F18 (chassis/metric) KEEP on merit,
    are datapoints *for* A05's ≥2 bar and A16's "nothing dropped." No conflict with A05's EXACT verdict.
  - **A14** paper-backdrop is untouched by the confrontation — the PARTIAL residue stands.

**Verdict: CLEAN.** The one CRIT1-B MINOR landed with a self-consistent retally; both NOTE-skips were
correct; D-A11/D-A14 re-verified against source; SUPERFLUITY corroborates A05/A13.

---

## Cross-dossier tally

| dossier | CRIT1-B fix landed | BLOCKER | MAJOR | MINOR | NOTE | verdict |
|---|---|---|---|---|---|---|
| F31-F40 | Δ-F33-1 single-proposal — **LANDED** | 0 | 0 | 0 | 2 | **CLEAN** |
| F41-F50 | F45 OPEN-1a status — **LANDED** | 0 | 0 | 0 | 1 | **CLEAN** |
| A01-A17 | A14 EXACT→PARTIAL + D-A14 + 11/5/1 retally — **LANDED** | 0 | 0 | 0 | 1 | **CLEAN** |

All three CRIT1-B MINORs landed correctly; all six NOTE-skips were correct declines (one, #16, rested
on a CRIT1-B mis-measure the dossier had right). No new BLOCKER/MAJOR/MINOR. The NOTEs are
superfluity-alignment guidance for the lead judge, not dossier defects.

**Superfluity-verdict conflicts found: none that break a dossier.** Two recommendation-sharpenings for
the judge (both NOTE): (1) SUPERFLUITY F32-F42 (Contradiction C-D) upgrades §C3 from an unsettleable
"design call" to a ratifiable 9-keep/6-cut table — the dossiers' §C3 ownership/coverage still hold;
(2) SUPERFLUITY F33's `DeckPager.vue` cut needs sequencing with Δ-F33-1's `usePagerWorm` refinement
(compatible; a one-phrase Δ-F33-1 parenthetical goes stale post-cut). SUPERFLUITY F08 and F26/F18
corroborate the dossiers' A13/A05 verdicts.

**The consecutive-clean bar is met: F31-F40 CLEAN, F41-F50 CLEAN, A01-A17 CLEAN.**

*End — CRIT2-B, fresh Fable seat B, pass 2. One file under `formation/redress/`; no `src/`/`demo/`
edits, no commit.*
