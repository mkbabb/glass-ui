# STAB1 — COMPLETENESS lens (Fable stability critic, pass 1)

Fresh critic over the completed BJ tranche formation. Charter bar: NOTHING from the original prompt
set may be dropped — every F01-F50, every A01-A17, every judged delta, every confrontation verdict,
every carried defect must trace to a terminal owner reachable from `PLAN.md` or `ASK.md`. Lens =
COMPLETENESS. TRANCHE-DEVELOPMENT ONLY; this is the only file written.

Register: plain, evidence-cited. Every claim below was walked on disk at HEAD (`codex/bi-p-q-execution`).

---

## VERDICT: AMEND(2) — two broken chains, both in the CARRY trace

The 67-row ledger trace, the 26-ruling judged-delta trace, and the 11-verdict confrontation trace are
**COMPLETE** — every row/ruling/verdict reaches a terminal owner that EXISTS and whose text covers it.
The breaks are NOT in the feedback ledger; they are two carried/derived obligations whose *fix wave was
never drafted*, plus two narrower gaps.

**Findings by severity:** 0 BLOCKER · **2 MAJOR** · 2 MINOR · 2 NOTE.

---

## MAJOR findings

### MAJOR-1 — the chip + glass-atom @import re-home FIX WAVE has no owning wave

The carried 7.0.0 defect (`glass-chip.css` + `glass-atom.css` in no `index.css` @import closure →
Chip/Badge/glass-atom styling DEAD in the bundle, `grep glass-chip dist = 0`) has its GATE owned but
its FIX orphaned. Three capstones/bands *point at* a fix wave; none *contains* it:

- `PLAN.md:62-63` (ordering law) + `:299` (§5 known carry): "the CSS re-home of glass-chip/glass-atom
  flips W3's `orphan-CSS-partial`" / "the CSS re-home (**Family C/H coordination**) flips it GREEN."
- `BAND-GATES.md:251` (W3): authors `orphan-CSS-partial` **born-RED**; "The fix flip (re-home the two
  `@import`s into `glass.css`) is a **Family C/H coordination** obligation."
- `BAND-REDUCTION.md:71-72`: "The chip/glass-atom orphan … a **family-G** born-RED fix wave, not a
  reduction. **Out.**" and `:528` (A6): "the orphan-partial **fix wave** covers BOTH glass-chip.css AND
  glass-atom.css."

Where the chain breaks: the fix is attributed to **C/H** by PLAN+GATES and to **G** by REDUCTION —
contradictory — and **no band file drafts the wave**. Family G (`BAND-FEEDBACK-MOTION` W1-W6 =
toast/rim/tune/alert/idle/pager) has no chip wave. Family H (`BAND-COLOCATION`) re-homes *accent-tone.css*
(Move C) but lists `glass-chip.css` as a CENTRAL KEEP (`:170`) and never adds the missing @import;
worse, COLOCATION is a declared **byte-identity / null-DELTA** band (`:29-32`) and CANNOT resurrect dead
CSS (that changes `dist/glass-ui.css`), so it is structurally barred from owning this. Family C
(`BAND-REDUCTION`) explicitly disclaims it ("Out").

Why it matters: the close (`PLAN.md:324-325` §7) REQUIRES "the static-hygiene gates" GREEN.
`orphan-CSS-partial` is a static-hygiene gate authored born-RED; with no wave to flip it, the tranche
cannot close green. This is the identical "recognized-family-but-no-band-file → silent drop at
execution" defect the ASSEMBLY-CROSSWALK caught for F19-F24 — but it slipped through because the chip
orphan is a *carried defect*, not an F/A ledger row.

**Required fix:** draft the orphan-partial fix wave with ONE terminal owner (re-home the two @imports
into the `glass.css` closure; a real-visual DELTA is owed — it resurrects live styling, so it is NOT a
null-DELTA move). Reconcile the family attribution (it cannot be both C/H-inert and G-visual). A
`BAND-FEEDBACK-MOTION` W0 or a new REDUCTION visual wave are the two honest homes.

### MAJOR-2 — the R3b "blob forced-reflow fix" (routed to Family E) has no owner in BAND-PERF

The R3b fold routes a named deliverable to BAND-PERF that the band does not carry.
`REGISTRY.md:327` (Round-3b fold): "**Family E's headline gate becomes a rAF-budget / idle-frame-cost
gate + the blob forced-reflow fix**; LCP gates seed from these baselines" — the `/substrates/blob`
ForcedReflow insight (`:326-327`, ~52k RunTasks / 3.11s).

Where the chain breaks: `grep 'forced-reflow|ForcedReflow|rAF-budget|idle-frame|RunTasks|40k'
BAND-PERF.md` = **0 hits.** BAND-PERF W2 (`SHELL-FIELD-GOVERN`) addresses the continuous idle-rAF
*mechanism* conceptually, but the **blob forced-reflow fix has no wave, no gate, no mention** anywhere in
Family E. The crosswalk reconciliation (`ASSEMBLY-CROSSWALK.md:220`) asserts "perf gate baselines seed
BAND-PERF from the R3b DEV numbers" as a fully-LANDED reconciliation — but that fold did not land the
ForcedReflow deliverable.

**Required fix:** give the blob ForcedReflow fix an owner (a BAND-PERF wave/gate, or an explicit
hand-off to GF-BLOB with the perf-gate stated), and add the rAF-budget/idle-frame gate the R3b fold
names as Family E's headline.

---

## MINOR findings

### MINOR-1 — BAND-PERF W1/W2 read "PENDING-R3" though R3b HAS run; DEV baselines un-seeded

The R3b fold produced numbers (`REGISTRY.md:321-330`: cold LCP root 391/foundations 405/blob 488ms;
~40k RunTasks / 1.6-1.7s idle task-time; CLS 0.04 at the blob swap). Only W4 got them, via a bolt-on
`BAND-PERF.md:505-508` Lead seam ruling (119ms/CLS 0.04/186ms). W1 (LCP) and W2 (continuous-rAF) still
read "PENDING-R3 … do NOT claim a number without the trace" (`:40-41,146-148,223-227`) as if R3 never
ran. The mechanism is owned; the *baselines the crosswalk claims seed BAND-PERF* were back-propagated
only to W4. **Fix:** seed W1/W2 gates from the R3b DEV numbers (re-measure on build) rather than leaving
them PENDING.

### MINOR-2 — the liquid-weight-universal edict is encoded as two waves, not a PLAN-level law

The standing user edict (ALL motion/transitions/scrolling carry inertia/weight/bounce; "remember this
always") appears in PLAN only as two wave descriptions — `BJ.W-ROUTE-PENDING` (`:176`) and
`BJ.W-PAGER-DOT-MORPH` (`:221-222`). It is NOT elevated to a universal law in §1/§3/§4, so
story-page/dock/greenfield transitions are not held to it at the PLAN grain. It meets the "encoded as a
wave" bar but risks under-application. **Fix:** state liquid-weight as a band-wide motion law in PLAN §3
or §4, not only inside two waves. (All other edicts pass cleanly — see the edict trace below.)

---

## NOTE findings

- **NOTE-1** — the R3b "visual-landing" rider (`REGISTRY.md:343-345`: "a detached yellow goo-blob
  floats right of the hero + empty dark bento") is routed to "family C (preview/tile work) for
  intended-vs-regression confirmation," but no wave names the stray goo-blob. Blank bento → `BAND-STORY`
  W5; the detached goo-blob is unpinned. Watch it lands in PREVIEW-CARD or a REDUCTION visual-landing
  item at execution (the crosswalk "Notable ambiguities" already flagged this).
- **NOTE-2** — F05's "why-no-background-aurora" sub-ask is recorded twice in one file: crosswalk
  reconciliation item 3 (`ASSEMBLY-CROSSWALK.md:221-223`) says CLEARED-by-R3b; the §Judgment-corrections
  item 2 (`:243`, per JUDGE D2/J2) supersedes it to LANDED (BAND-STORY, owned at `BAND-STORY.md:567-573`).
  The final state is correct and owned, but the stale CLEARED line still sits above the correction —
  a doc-coherence snag, not a drop.

---

## The 67-row trace (row → terminal owner → OK/BREAK)

All 67 rows trace to an EXISTING owner whose text covers them (reconciled counts: 50 LANDED / 5 DECIDED
/ 3 CLEARED / 10 ASK / 0 ORPHAN / 0 pending). Owners spot-verified on disk. **No row breaks at the
ledger grain** (the two MAJORs are carry-trace, not ledger-trace).

| Row | Owner | OK |
|-----|-------|----|
| F01 | STORY W5 PREVIEW-CARD + PERF W1/W3 | OK |
| F02 | CLEARED→STORY W5 (PREVIEW-CARD) | OK |
| F03 | STORY W2 COPY-CANON + MATERIAL W5 (J8 layers.vue in gate) | OK |
| F04 | REDUCTION W2 + ASK-REDUCTION + GF-DOCK §5 | OK |
| F05 | GF-DOCK W6 (shift) + PERF W4 (transition) + STORY (aurora, J2) | OK |
| F06 | CLEARED→PERF W4 + GF-DOCK G-PAGE-NOFLASH | OK |
| F07 | PERF W4 ROUTE-PENDING (owns choreography, D consulted) | OK |
| F08 | GF-AURORA W1-W4+W5 (C-G binding: not the preset cut alone) | OK |
| F09 | STORY W3 CONFIGURATOR-STD + MATERIAL W1; J10 roominess gate | OK |
| F10 | STORY W3 (G-CFG-2) + MATERIAL W5/W6 | OK |
| F11 | STORY W3 (G-CFG-3) | OK |
| F12 | MATERIAL W1 (RULING 8 → regression-guard) | OK |
| F13 | STORY W6 RESPONSIVE-AUDIT | OK |
| F14 | STORY W6 RESPONSIVE-AUDIT (first-class) | OK |
| F15 | MATERIAL W1 + W6; GATES W3/W4 | OK |
| F16 | REDUCTION W5 (STUB→loop) + ASK-7 | OK |
| F17 | MATERIAL W1 (RULING 8 → regression-guard) | OK |
| F18 | ASK-1 (RATIFY SHARED-KEEP) + REDUCTION W4 | OK |
| F19 | FEEDBACK-MOTION W4 ALERT-IDIOM (orphan cured) | OK |
| F20 | FEEDBACK-MOTION W1 TOAST-PARITY (J4) | OK |
| F21 | FEEDBACK-MOTION W2 RIM-REPLACE (phantom bank named) | OK |
| F22 | FEEDBACK-MOTION W3 TUNE (J7 driver re-home) | OK |
| F23 | MATERIAL W4 TRACK-DRY (C-C sequencing) | OK |
| F24 | FEEDBACK-MOTION W3 TUNE | OK |
| F25 | ASK-3 (DELETE/fold, C-A) | OK |
| F26 | ASK-2 (KEEP, census corrected) | OK |
| F27 | GF-DOCK W2 G-NO-BLOCK-SCROLL | OK |
| F28 | MATERIAL W2 (OPEN-2d re-aimed, J6) | OK |
| F29 | STORY W3 (G-CFG-1) + ASK-5 (tempo fold) | OK |
| F30 | ASK-5 (fold PAGE, C-E) | OK |
| F31 | STORY W3 (G-CFG-5) + ASK-11 (easing) | OK |
| F32 | ASK-4 (9-keep/6-cut, C-D) | OK |
| F33 | ASK-6 + FEEDBACK-MOTION W6 (DeckPager cut, J3) | OK |
| F34 | GF-HANDMARK W1 G-CALM | OK |
| F35 | GF-HANDMARK W1 G-WEIGHT | OK |
| F36 | GF-HANDMARK W3 G-CONTAIN | OK |
| F37 | GF-HANDMARK W5 G-DRAW-CONNECTED | OK |
| F38 | GF-HANDMARK §4 (7→3 brushes) | OK |
| F39 | GF-HANDMARK W4 G-RING-LAYER | OK |
| F40 | GF-HANDMARK W6 G-NO-JARGON + STORY W2 | OK |
| F41 | STORY W2 (site = typewriter.vue:103, resolved) | OK |
| F42 | ASK-4 (C-D) | OK |
| F43 | ASK-13 (compositions) + STORY W2 G-COPY-3 (credentials) | OK |
| F44 | ASK-13 (compositions prune) | OK |
| F45 | ASK-13 + MATERIAL W1 (J5 regression-guard) | OK |
| F46 | STORY W5 (G-PRV-4/2) + PERF W1/W3 | OK |
| F47 | GF-DOCK W1 + W3 | OK |
| F48 | MATERIAL W1/W2/W3 | OK |
| F49 | MATERIAL W2/W3 (IOS27 law 1) | OK |
| F50 | MATERIAL W3 GRADED-BACKDROP-JUDGE + ASK-26 | OK |
| A01 | FEEDBACK-MOTION W5 IDLE-BREATH (LANDED-AT-W5, D1) | OK |
| A02 | IOS27-CODEX + MARKS-A/B | OK |
| A03 | IOS27-CODEX + MATERIAL W5 + greenfield triumvirate | OK |
| A04 | DECIDED (archaeology distributed, J11 confirmed) | OK |
| A05 | REDUCTION band + ASK-REDUCTION + DAG census | OK |
| A06 | STORY band; J11 scroll-standard in scroll-collapse wave | OK |
| A07 | COLOCATION band | OK |
| A08 | DECIDED → PLAN §3 A08/J11 structural law | OK |
| A09 | DECIDED (greenfield triumvirate) | OK |
| A10 | MATERIAL W5 ARISTOTLE-PROPORTION | OK |
| A11 | FEEDBACK-MOTION W5 IDLE-BREATH (D1) | OK |
| A12 | GF-BLOB + ASK-21 | OK |
| A13 | GF-AURORA §3.4 + ASK-20 | OK |
| A14 | 4 greenfields + Fourier/Constellation ASK + paper-backdrop (J9→REDUCTION) | OK |
| A15 | DECIDED → PLAN §4 model split | OK |
| A16 | DECIDED → PLAN §1/§4 parallel architecture | OK |
| A17 | PERF band (R3b DEV baselines) | OK (see MINOR-1) |

---

## Judged-delta trace (JUDGE.md → APPLYLOG → destination text present today)

All 26 rulings (J1-J11, C-A..C-G, T1-T2, D1-D6) accounted for; spot-verified the load-bearing set on disk:

| ruling | destination text present? |
|--------|---------------------------|
| J1 IDLE-BREATH (W5) | YES — `BAND-FEEDBACK-MOTION.md:98-128` full wave + R3b table |
| J3 PAGER-DOT-MORPH (W6) | YES — `BAND-FEEDBACK-MOTION.md:130-148` |
| J4 register-parity | YES — `BAND-FEEDBACK-MOTION.md:41-44` |
| J7 driver re-home | YES — `BAND-FEEDBACK-MOTION.md:79-84` |
| J2 postures backdrop | YES — `BAND-STORY.md:567-573` (§Judgment corrections) |
| J8 G-COPY-2 layers.vue | YES — `BAND-STORY.md:195` (in-place in gate table) |
| J9 paper-backdrop | YES — `BAND-STORY.md:582-588` |
| J10 roominess/scale gate | YES — `BAND-STORY.md:575-580` |
| J11 A06 scroll standard | YES — `BAND-STORY.md:590-593`; A08→PLAN §3; A04 confirmed |
| J5 F45 regression-guard | YES — `BAND-MATERIAL.md:112-115` |
| J6 F28 probe re-aim | YES — `BAND-MATERIAL.md:257-261` (OPEN-2d) |
| C-F/T2 scene-staging (W3(b), unconditional) | YES — `BAND-MATERIAL.md:342-346` Deliverable (b) |
| C-C W4/timeline sequencing | YES — `BAND-MATERIAL.md:416-422` |
| C-G F08 GF-AURORA rider | YES — `GF-AURORA-PASS3.md:384-387` (Lead rider) |
| C-A/C-D/C-E (deferred-to-ASK) | YES — `ASK.md` ASK-3/ASK-4/ASK-5 carry them |
| T1 overlay role-split | YES — `REGISTRY.md:349-354` §Truth-up |
| D1-D6 crosswalk corrections | YES — `ASSEMBLY-CROSSWALK.md:237-249` §Judgment corrections |

Every APPLYLOG "APPLIED" claim lands in the named destination. No judged delta is a floating note.

---

## Confrontation trace (11 SUPERFLUITY verdicts → terminal home)

| verdict | home | OK |
|---------|------|----|
| F25 MERGE-INTO | ASK-3 (C-A) | OK |
| F33 KEEP-DISTINCT | ASK-6 + FEEDBACK-MOTION W6 DeckPager cut | OK |
| F18 KEEP-DISTINCT | ASK-1 | OK |
| F23 COLLAPSE-FAMILY | MATERIAL W4 (band amendment) | OK |
| F30 MERGE-INTO | ASK-5 | OK |
| F32/F42 COLLAPSE-FAMILY | ASK-4 | OK |
| F16 COLLAPSE-FAMILY | ASK-7 + REDUCTION W5 | OK |
| F26 KEEP-DISTINCT | ASK-2 | OK |
| F08 COLLAPSE-FAMILY | ASK-20 + GF-AURORA (C-G binding) | OK |
| pulse/statusdot KEEP-DISTINCT | PLAN §6 (terminal, no-action) | OK |
| dialog/drawer KEEP-DISTINCT | MATERIAL W3(b) scene-staging + PLAN §6 | OK |

All 11 reachable from the capstones. `PLAN.md:318-319` §6 ratifies the tally (5 KEEP / 4 COLLAPSE / 2
MERGE) as terminal, covering the two no-action KEEP-DISTINCT rows.

---

## Carry trace (PLAN §5 + wave-owned carries)

| carry | owner | OK |
|-------|-------|----|
| V-A95 re-repro-or-close | GF-AURORA W6 (after mode waves, §3.7) | OK |
| chip + glass-atom @import orphan (GATE) | GATES W3 orphan-CSS-partial born-RED | OK |
| chip + glass-atom @import orphan (FIX) | **none — no wave owns the re-home** | **BREAK (MAJOR-1)** |
| speedtest §3 protagonist outbound | PLAN §5 + MATERIAL inbound mark :692-694 | OK |
| Q060 outbound roster (family B) | PLAN §5 | OK |
| INFER truth-ups (T1/T2) | REGISTRY §Truth-up / MATERIAL W3(b) | OK |
| R3b perf baselines → BAND-PERF gates | W4 seeded; W1/W2 un-seeded | partial (MINOR-1) |
| R3b blob forced-reflow fix (routed to Family E) | **none in BAND-PERF** | **BREAK (MAJOR-2)** |
| guardian / EXEC-STATE durability | PLAN §4 | OK |

---

## Edict trace (standing user edicts → PLAN encoding)

| edict | PLAN encoding | OK |
|-------|---------------|----|
| liquid-weight universal | waves only (W4 :176, W6 :221) — not a PLAN-level law | MINOR-2 |
| breath-of-life | FEEDBACK-MOTION W5 IDLE-BREATH (:49,:218) + §1 framing | OK |
| aristotelian proportion | MATERIAL W5 (:194) + §4 cadence | OK |
| colocation grand edict | family H BAND-COLOCATION (§1) | OK |
| story meta-framework | family D BAND-STORY (§1, :147) | OK |
| KISS / no-legacy | §7 (:331) + per-band KISS sections | OK |
| Fable model split | §4 (:280) "Model split, always declared" | OK |
| maximal parallelization | §4 (:278) ≤3 seats + :52 + A16 | OK |

---

## Bottom line

The no-silent-drop spine holds at the ledger grain: all 67 rows, all 26 rulings, all 11 verdicts reach
existing owners whose text covers them. The two real breaks are carried/derived obligations whose GATE
was drafted but whose FIX WAVE was not: **the chip/glass-atom @import re-home (MAJOR-1)** and **the R3b
blob forced-reflow fix (MAJOR-2)**. Both are the same class the ASSEMBLY-CROSSWALK caught for F19-F24 —
recognized, gated, but un-waved — and both would silently drop at execution. AMEND(2), plus seed the R3b
baselines into PERF W1/W2 (MINOR-1) and elevate liquid-weight to a PLAN law (MINOR-2).
