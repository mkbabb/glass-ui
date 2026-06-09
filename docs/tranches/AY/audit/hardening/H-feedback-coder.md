# H-feedback-coder — adversarial hardening of L.W6 (honesty pass) + L.W7 (J-docs un-strand)

**Lane:** Track B — feedback-coder honesty + J-docs (slides L.W6 / L.W7).
**Verdict:** GAPS-FOUND. The two waves are detailed and source-cite, but L.W6's
0.72 hard gate accepts a WRONG metric name as resolution, misses the live
RETRACTED-artefact claim in BRIEF/PRESENTATION (a chronic I→J→L miss), and rests
its honesty gates on subjective "adversarial read" with no machine check; L.W7's
option (B) does not actually un-strand. Both fixable with the source-of-truth
material below.

Source-of-truth read this pass: `feedback-coder/docs/findings/REPORT.md`,
`feedback-coder/docs/GLOSSARY.md`, `feedback-coder/README.md`,
`feedback-coder/docs/PROCESS.md` — the authoritative measurement record the deck
SHOULD be sourced from. The slides deck (`src/decks/feedback-coder/`) and slides
Tranche I are on `main`; J is branch-only on `deck/feedback-coder` (confirmed by
`git ls-tree`).

---

## Finding 1 — the 0.72 metric is MISLABELED in the deck, and L.W6's gate would bless the wrong name (GAP)

**The corpus framed this as "balanced-accuracy vs κ" (PROMPT-CORPUS §29; L.W6
§"The defect").** I read the source-of-truth. The answer is NEITHER, and the
deck's own prose is wrong:

- The 0.72 is **L2 macro-F1 = 0.7235** — `feedback-coder/REPORT.md:28` ("`L2
  macro-F1` (binding L2 metric) | 0.7235"), `:77` ("The L2 macro-F1 (the
  unweighted mean of these three per-class F1 scores) reads **0.7235**").
- `feedback-coder/GLOSSARY.md:57` defines macro-F1 as "the unweighted mean of the
  per-class F1 scores." The deck's `BRIEF.md:63-66` describes 0.72 as "a balanced
  score that's harder to game than plain accuracy ... checks that every category
  is handled well ... and averages them evenly." That description is a CORRECT
  plain-language gloss of **macro-F1** — but the WORD it uses, "balanced score /
  balanced measure" (`PRESENTATION.md:40`), reads as **balanced accuracy**, a
  DIFFERENT statistic (balanced accuracy = mean per-class recall; macro-F1 = mean
  per-class F1). A numerate auditor who knows the difference will catch the
  mislabel; a policymaker won't, but then the precision is decorative.
- κ is NOT the metric. `feedback-coder/PROCESS.md:126-130` + `GLOSSARY.md:69`:
  **κ_L2 was RETIRED as a binding gate** at D-Inv 6 due to the kappa paradox on
  the 73/15/12 D/C/S skew. The deck plots no κ.

**Therefore OQ29's worst-case fear is FALSE but the gate is mis-aimed.** OQ29
(SLIDES-REVIEW §312) worried that the AI score (balanced-acc) and the
human-agreement band (κ) are DIFFERENT metrics, making the one-number-line
(`Slide04.vue:60-79`) invalid. The source disproves that: ALL THREE plotted
quantities are L2 macro-F1 on the SAME fold/class-matched basis —
`REPORT.md:39,41,146`: AI 0.7235; Alfred-vs-Ceire rater-vs-rater floor **0.7208**
(`human_human_baseline`, n=314 eval-fold two-coder turns); rater-vs-consensus
band Alfred-vs-Final 0.8374 / Ceire-vs-Final 0.9452 → the 0.84–0.95 band. The
number-line is metric-VALID. The real defect is the deck calls 0.72 "balanced
accuracy" when it is macro-F1.

**L.W6 hard gate #4 is mis-specified.** It reads: "0.72 identity answered: a
recorded confirmation the AI score and the agreement band are the same measure,
OR the one-number-line is split." That gate would PASS on a confirmation that
keeps the word "balanced accuracy" — because the comparison genuinely IS
internally consistent. The gate does not require the deck to use the CORRECT
metric name. The honesty defect (wrong statistic named to the room) survives the
gate as written.

**Fold:** L.W6 (re-spec hard gate #4 + edit `BRIEF.md:63`, `PRESENTATION.md:40`).

---

## Finding 2 — the RETRACTED "two humans also land at 0.72" claim is STILL LIVE in BRIEF/PRESENTATION, and L.W6 does not cite it (CHRONIC MISS, I→J→L)

This is the sharpest miss. The slides Tranche-I deep audit
(`slides/docs/tranches/I/audit/DEEP-AUDIT-DIGEST.md:547`) named, as a BLOCKER:

> "BRIEF.md and PRESENTATION.md still carry the SUPERSEDED ... **'two humans also
> land at 0.72' framing (RETRACTED in FINAL §4a as the Alfred-Ceire FLOOR
> artefact)**".

The source-of-truth confirms the retraction nuance: `feedback-coder/REPORT.md:41`
+ `:302-303` re-frame 0.7208 as "the Alfred-vs-Ceire rater-vs-rater FLOOR, not a
rater-vs-truth ceiling" — and `:39` is explicit that "the prior framing rode" the
0.7208 Alfred-vs-Ceire floor. The retraction is NOT of the number; it is of any
phrasing that treats the AI's coincidence with 0.7208 as "at the human level."

I.W6 claimed to RECONCILE BRIEF/PRESENTATION (`I/I.md:102`, `I/FINAL.md:21` marks
W6 LANDED: "FINAL floor framing, 86% / ~3,800"). **It did not finish the job.**
The live files on `main` STILL carry the retracted framing:

- `BRIEF.md:66-67`: "Two humans working alone, scored the same way, **also land at
  0.72**—that's the floor."
- `PRESENTATION.md:42-43`: "Two humans working alone, scored the same way, **also
  land at 0.72**".
- `PRESENTATION.md:67-69`: "It matches a lone rater. On the Stance level it scores
  0.72, **the same as two trained humans working alone agree with each other**".

This phrasing is the EXACT "two humans also land at 0.72" the I audit flagged as
retracted-artefact. It is technically defensible as a FLOOR statement (the source
DOES say the AI matches the 0.72 pairwise floor) — so this is a borderline case,
NOT a clean falsehood. But L.W6's §"The defect" block does NOT list it at all:
L.W6 cites `BRIEF.md:62-70` only for the metric-NAME question (gate #4), never for
the surviving retracted-floor phrasing. A reviewer running L.W6 to its hard gates
will leave the I-audit's own blocker un-actioned a SECOND time. This is the
chronic-miss signature: flagged in I, marked LANDED in I, still live, not
re-listed in L.

**Convergence requires:** L.W6 must (a) cite the three live sites above, (b)
decide whether "two humans also land at 0.72" is retained as a deliberate floor
statement (defensible per REPORT.md:41) or rephrased to avoid the "at the human
level" reading the I audit retracted, and (c) gate on the decision with a
grep-able assertion, not "adversarial read."

**Fold:** L.W6 (add the three BRIEF/PRESENTATION sites to the defect ledger + a
machine gate).

---

## Finding 3 — L.W6's honesty gates are subjective; no machine check, and the shipped conformance gate is blind to all four defects (GAP)

L.W6's six hard gates lean on un-verifiable language:

- #1 "an adversarial read confirms one coherent framing" — a human judgement, not
  an artefact. The TRANCHE-AND-WAVE-SPEC §"Hard gate" is explicit: "Grep-only and
  'API exists' checks are insufficient for runtime features" — but the inverse
  also binds: a hard gate "is valid only when it can be verified by an artefact."
  "An adversarial read confirms" is neither grep nor artefact; it is opinion.
- #4 "a recorded confirmation ... OR the one-number-line is split" — see Finding 1;
  the recorded confirmation can bless the wrong metric name.
- #5 "audience locked: `L.md §7` records the decision" — `L.md §7` does not exist
  (the plan stops at §3; the wave even points to a nonexistent section). The
  audience-lock decision has no home.

The deck DOES ship a machine gate — `scripts/proof-deck-copy-conformance.mjs` —
but SLIDES-REVIEW §295 + §342 + AUDIT-LEDGER §A row "language" establish it is
**blind to rule-8 (CTA filler), rule-2 (fragment-for-effect), and the
unsubstantiated-claim class**, and it tokenizes pre-render source (it cannot see
glyph-fragmented spans). None of L.W6's four honesty defects (the 1,845 double-use,
the metric mislabel, the unsupported S5 claims, the retracted floor phrasing) is
catchable by that gate as-is, and L.W6 does not propose extending it (that is
L.W4, a Track-A wave that does not touch feedback-coder copy). So after L.W6
closes, every one of these defect CLASSES can silently recur on the next edit.

**Convergence requires:** at least the falsifiable defects get a grep gate. The
1,845 double-use is grep-able (assert the Delivered tile's annotation and the
Slide04 segmentation bar carry DISTINCT framing tokens). The metric name is
grep-able (`grep -n "balanced" BRIEF.md PRESENTATION.md` returns the corrected
"macro-F1" gloss, not "balanced accuracy"). The S5 unsupported claims are grep-able
(`grep "three independent fixes" Slide05.vue` returns 0 unless evidence is added).
The audience lock + the metric-name-confirmation are the only legitimately
narrative gates; those land as a recorded decision in a section that EXISTS.

**Fold:** L.W6 (convert gates #1, #3 to grep assertions; create `L.md §7` or name
the real home; extend `proof-deck-copy-conformance.mjs` with a feedback-coder
claim-token arm, or explicitly scope that to L.W4 and cross-reference).

---

## Finding 4 — the 1,845 contradiction objective is under-specced on the harder half (segmentation recall vs delivered corpus) (GAP)

L.W6 §Objective for 1,845 is good as far as it goes ("the Delivered tile names the
corpus delivered; the Slide04 bar names the segmenter's recall — distinct
framings"). But the source makes the contradiction WORSE than the wave records,
and the fix must reconcile a real numeric tension, not just relabel tiles:

- `Slide05.vue:152-154`: Delivered tile = "258 forms coded" + note "**1,845**
  labeled turns, all on the lab's own hardware."
- `Slide04.vue:118,123-124`: the AI marks "~1,845" turns vs a human's "~3,800" —
  the SAME 1,845 is the under-segmented half.
- The source-of-truth says these 1,845 turns ARE the delivered artefact AND the
  under-segmented count simultaneously — `feedback-coder/BRIEF.md:108-109`: "The
  coded output—**1,845 turns across all 258 forms**—lives in a Google Sheet." So
  1,845 is genuinely both "what we delivered" and "half what a human would mark."
  The honest reframe is not to hide one; it is to say "we delivered 258 forms
  coded; the segmenter recovered ~1,845 of the ~3,800 turns a human marks — that
  recall gap is the open piece." The Delivered tile currently leads with 1,845 as
  a volume brag; the honest version leads with 258 forms (the true unit of
  delivery) and frames 1,845 AS the recall number, not a separate achievement.

L.W6's objective allows a relabel that still leaves 1,845 reading as an
achievement. The wave needs the explicit instruction: the Delivered tile's UNIT
is forms (258), the turns count is the recall-gap number, framed as such.

Note also `Slide04.vue:117,123` hard-code SVG bar widths `320` (human) and `155`
(AI) — 155/320 = 0.484, encoding "about half." But the source per-form parity
median is **0.465–0.571** depending on the lever (`REPORT.md:178`), and the
delivered-40 baseline was 292/587 = 0.497 (`REPORT.md:178`). "About half" is
defensible; but if the deck wants the honest spread it should not over-precision a
single 155/320. Low-priority, but note it so the reframe does not introduce a
fake-precision bar.

**Fold:** L.W6 (sharpen the 1,845 objective: forms = the delivery unit, turns =
the recall-gap number).

---

## Finding 5 — the S5 close trim drops two claims that ARE sourced; the gate should require sourcing-or-cut, and one claim is actually TRUE (GAP / over-correction risk)

L.W6 §"The overloaded S5 close" flags `Slide05.vue:175-176` ("three independent
fixes don't yet close it" + "the limit is missing labelled data, not the model")
as "appear nowhere else and arrive unsupported." Half-true:

- "three independent fixes don't yet close it" — `feedback-coder/REPORT.md:178`
  documents exactly three segmentation levers (rebuilt span-offset exemplar bank +
  per-policy prior relocation; max-split decouple probe; PE-9 ensemble) that moved
  parity but did NOT reach 1.0 ("the absolute residual persists"). So the claim is
  SOURCED — it is just sourced in a doc the deck never cites. Cutting it loses a
  true, load-bearing honesty beat.
- "the limit is missing labelled data, not the model" — `REPORT.md:178` is
  explicit the residual is "framing-movable, not a hard model ceiling ... the last
  mile to parity needs the learned boundary stage ... gated on the same fresh
  fold." That maps to "missing labelled data, not the model." Also SOURCED.

So SLIDES-REVIEW §238's read ("arrive unsupported") is wrong against the
source-of-truth: both claims are true and sourced — they are just UNFAMILIAR to a
reader who only saw S4. The honest fix is NOT to cut them blindly (L.W6's default)
but to decide: keep them (they are the truest part of the close) and trim the
REDUNDANT clauses, or move them to a presenter note. L.W6's hard gate #3 ("carries
no claim that appears nowhere else and nowhere supported — the two flagged claims
are cut OR sourced") is actually CORRECT here (it allows sourcing) — but the
§Objective says "drop the two unsupported claims unless their evidence is added,"
biasing toward cut. The wave should record that the source EXISTS
(`REPORT.md:178`) so the trim keeps the true beats and cuts the word-count, not the
honesty.

**Fold:** L.W6 (note `REPORT.md:178` sources both S5 claims; trim for length, keep
the true beats; the over-length is the defect, not the claims).

---

## Finding 6 — L.W7 option (B) does NOT un-strand; it ratifies the stranding (NOT-COHESIVE)

L.W7's binding question (OQ26) is "a production deck whose tranche record is
branch-only and invisible on the publish source." Option (A) — bring the 13 J files
to `main` — actually fixes it. Option (B) — "formally fold the J wave-set into I's
record" by recording a J→I mapping in `I/FINAL.md` or a new `I/J-FOLD.md` — does
NOT. Under (B), the 13 J files (`J.md`, `DEEP-AUDIT-DIGEST.md`, `J.W0–J.W10`)
REMAIN branch-only on `deck/feedback-coder`; only a pointer lands on main. The
"un-strand" goal (the wave's own headline: "its docs un-stranded") is NOT met by a
pointer to docs that still live only on a feature branch. Worse, the precepts ban
exactly this: MEMORY "no backwards compat / clean breaks" + "greenfield no meta"
+ the zero-deferral close. A J→I-FOLD pointer to branch-only docs is a meta-shim
that records the stranding rather than resolving it.

The clean break is: J's work either landed (in which case its plan/audit belong on
main alongside the I tranche that ships the same deck — option A) or J was an
abandoned successor whose docs should be DELETED from the branch (not memorialized
on main as folded). There is no honest third state where "the record is folded but
the 13 files stay branch-only."

Note the asymmetry the wave under-weights: slides Tranche I IS on main (A–I per
`git ls-tree`), and the deck source + the I commits (`ffdd98f` etc.) are on main.
So the deck's PRIMARY tranche record (I) is already un-stranded. J is the
SUCCESSOR-tranche docs. The real decision is narrower than the wave frames it:
did J's planned work (Fourier intensity, bank glass-container, gloss-in-flow,
keyboard, mobile gate, frontend-design polish) LAND, or is J an unexecuted plan?
If J never executed, its docs are an unshipped plan and option (A) pollutes main
with an unexecuted tranche; if J executed, the J COMMITS (not just docs) must also
reach main. L.W7 verifies neither — it treats J as docs-only with "no code change."

**VERIFIED this pass (the decisive fact L.W7 lacks).** `git log
deck/feedback-coder ^main --oneline` = exactly **2 commits**, BOTH
`docs(tranche-J)` (`b927326` scaffold the legibility-and-flow plan; `1461683`
ratify the five §7 decisions). **J shipped NO code.** J is a pure UNEXECUTED PLAN
— the J.W0–J.W10 waves never landed. So:

- The deck on main is NOT "at J's state" — there is no J state; J is a plan that
  was never executed. L.W7 §"The defect" treats J as "the deck's actual wave-set"
  — that is wrong; I is the deck's actual (executed) wave-set, J is a successor
  plan that died on the branch.
- Option (A) "merge or cherry-pick the J docs to main" is CONTAMINATED if done as a
  branch merge: `git diff --stat main deck/feedback-coder -- src/` shows the branch
  is BEHIND main on til-briefing (`SlideNutrition.vue` +339, the pre-rename
  `SlideTitle/SlideProblem/SlideLoop` paths, the old `constellation.ts`) — merging
  the branch would drag in stale til-briefing source. A clean (A) is a
  path-scoped cherry-pick of `docs/tranches/J/**` ONLY, never a branch merge.

The honest resolution given J-is-an-unexecuted-plan: either (A-clean) land the J
PLAN docs on main path-scoped as "the unexecuted successor plan to I, archived"
(legitimate — a plan can live on main marked unexecuted), OR delete the branch
(an unexecuted plan with no consumers is substrate-without-consumer). What is NOT
honest is L.W7's option (B): a J→I-FOLD pointer implies J's WORK folded into I —
but J's work never happened, so there is nothing to fold; the pointer would
memorialize a phantom tranche.

**Fold:** L.W7 (record the VERIFIED fact: J = 2 doc commits, 0 code, unexecuted;
the binary is A-clean (path-scoped cherry-pick of `docs/tranches/J/**`, marked
unexecuted-successor) or delete-the-branch; kill option B as a phantom-fold).

---

## Finding 7 — the audience-lock has no decision home and gates a conditional that L.W6 cannot itself decide (UNDER-SPECCED)

L.W6 §"The framing decision" makes the research-vs-policymaker audience lock the
FIRST decision and gates the S2/S4 density + math-notation trims on it
(`Slide02.vue:91-92` the `(D,S,F)` tuple; `Slide03.vue:81-82` the `F: page →
{(turn,label)}` operator — both verified at source). Two problems:

1. **No home.** Hard gate #5 says "`L.md §7` records the decision" — `L.md` has no
   §7 (it ends at §3 ordering). The decision needs a real location (a `decisions`
   table in `L.md`, or the J/I record per L.W7).
2. **Not L.W6's to decide.** The audience lock is a USER decision (it is the
   business question — is feedback-coder ever shown to the policymaker/auditor
   room, or only the research/lab). L.W6 is a content wave; it cannot manufacture
   the answer. As written, L.W6 BLOCKS on a user input it does not surface as a
   user-gate. This is a scope-reveal waiting to fire: the wave will stall on the
   lock with no escalation path.

**Convergence requires:** the audience lock is surfaced as an explicit user-gate
(like the deploy hinge), with a DEFAULT recorded (the deck's own posture —
SLIDES-REVIEW §232 reads it as "a 5-slide prototype account for a
technical/research audience," so research is the standing default and the trims do
NOT fire unless the user flips it to policymaker). L.W6 then proceeds on the
default without stalling.

**Fold:** L.W6 (record research as the default audience; surface the policymaker
flip as a user-gate; name the decision's real home).

---

## Chronic misses (carried ≥2 tranches)

1. **The retracted "two humans also land at 0.72 / at the human level" framing in
   BRIEF.md + PRESENTATION.md** — flagged BLOCKER in slides-I
   (`I/audit/DEEP-AUDIT-DIGEST.md:547`), marked LANDED in I.W6 (`I/FINAL.md:21`),
   STILL live (`BRIEF.md:66-67`, `PRESENTATION.md:42-43,67-69`), re-scoped to L.W6
   but NOT listed in L.W6's defect ledger. I → J(branch) → L: three tranches, never
   finished, and the L wave that owns it doesn't cite the surviving sites.

2. **The conformance gate's blindness to the unsubstantiated-claim class** —
   SLIDES-REVIEW §295/§342 + AUDIT-LEDGER §A. The honesty defects in this deck are
   exactly the class the gate cannot see, and L.W6 ships honesty fixes without
   closing the recurrence hole (that is parked in L.W4, a Track-A wave that does
   not touch feedback-coder). The class will recur unguarded on the feedback-coder
   side specifically.

---

## Convergence criteria for this lane (the acceptance bar)

L.W6 + L.W7 are "perfected" when:

1. The deck's 0.72 is described with the CORRECT statistic name — macro-F1, plain-
   glossed — not "balanced accuracy"; `grep -n "balanced acc" BRIEF.md
   PRESENTATION.md` returns 0, and a plain-language macro-F1 gloss is present.
2. The number-line (`Slide04.vue:60-79`) is recorded as metric-VALID with a one-
   line provenance note (all three quantities are fold/class-matched L2 macro-F1
   per `feedback-coder/REPORT.md:39,41,146`) — not "split" (the worst-case fear was
   disproved).
3. The retracted-floor phrasing in BRIEF/PRESENTATION is DECIDED (retained as a
   deliberate floor statement, or rephrased) with a grep-able assertion, and the
   three live sites are cited in the wave.
4. The 1,845 Delivered tile leads with forms (258) as the delivery unit and frames
   1,845 as the recall-gap number; an adversarial reader cannot read 1,845 as a
   standalone volume achievement; gated by a distinct-framing-token grep.
5. The S5 close is trimmed for LENGTH while KEEPING the two true, now-sourced beats
   (`REPORT.md:178`); gated by word-count + a sourced-claims check.
6. The audience lock is recorded (research default; policymaker flip surfaced as a
   user-gate) in a section that exists.
7. J docs are EITHER fully on main (with J's code, if any, also merged) OR the
   branch plan is deleted — no "folded pointer to branch-only docs" half-state;
   `git log deck/feedback-coder ^main` is run first to establish which.
8. `npm run build` + `proof:deck-copy-conformance` green; a captured DELTA of S4
   (the metric line) and S5 (the Delivered tile + close) at 1280×720.

---

## waveSpecInputs (concrete material a fully-authored wave spec needs)

**L.W6 (re-spec):**
- DEFECT (metric name): `BRIEF.md:63` "a balanced score" + `PRESENTATION.md:40`
  "a balanced measure" → mislabel; the metric is L2 macro-F1 (`feedback-coder/
  REPORT.md:28,77`; `GLOSSARY.md:57`). "Balanced accuracy" ≠ macro-F1.
- DEFECT (retracted floor, chronic): `BRIEF.md:66-67`, `PRESENTATION.md:42-43,67-69`
  carry "two humans also land at 0.72" / "the same as two trained humans" —
  flagged retracted in `slides/docs/tranches/I/audit/DEEP-AUDIT-DIGEST.md:547`,
  defensible only AS a floor (`feedback-coder/REPORT.md:41`).
- DEFECT (1,845 double-use, P0): `Slide05.vue:152-154` Delivered tile vs
  `Slide04.vue:117-124` segmentation bar — same 1,845. Source confirms both true
  (`feedback-coder/BRIEF.md:108-109`).
- DEFECT (tile title): `Slide05.vue:139` "About one human's level".
- DEFECT (S5 over-length, NOT unsourced): `Slide05.vue:173-179`; both flagged
  claims sourced at `feedback-coder/REPORT.md:178`.
- OBJECTIVE: correct the metric NAME; add a provenance note that the number-line is
  valid (all macro-F1); decide+gate the retracted phrasing; reframe Delivered tile
  (forms=unit); retitle the tile; trim S5 length keeping the sourced beats; record
  research audience default + policymaker user-gate.
- EDIT SITES: `Slide04.vue` (provenance note region near `:34-37`),
  `Slide05.vue:139,152-154,173-179`, `BRIEF.md:62-70`, `PRESENTATION.md:40-43,67-69`;
  conditionally `Slide02.vue:91-92` + `Slide03.vue:81-82` (only if user flips to
  policymaker).
- HARD GATE (evidence-backed): `grep -n "balanced acc" BRIEF.md PRESENTATION.md` = 0
  AND a macro-F1 gloss present; `grep "three independent fixes" Slide05.vue` returns
  the line only if S5 retains the sourced beat (else 0); Delivered-tile and Slide04-
  bar carry distinct framing tokens (grep-asserted); audience decision recorded in a
  real section; S5 word-count ≤ ~45; `npm run build` exit 0; captured DELTA of S4 +
  S5.

**L.W7 (re-spec):**
- DEFECT: `docs/tranches/J/**` (13 files) branch-only on `deck/feedback-coder`,
  absent on `main` (`git ls-tree --name-only main -- docs/tranches/` = A–I, K, L; no
  J). Confirmed this pass.
- VERIFIED FACT (the wave lacks it): `git log deck/feedback-coder ^main` = 2
  commits, both `docs(tranche-J)` (`b927326`, `1461683`); J shipped ZERO code; J is
  an UNEXECUTED successor plan to I. The branch is also BEHIND main on til-briefing
  (`git diff --stat main deck/feedback-coder -- src/` → stale `SlideNutrition.vue`,
  pre-rename slide paths) — so a branch merge is contaminated; (A) must be a
  path-scoped cherry-pick of `docs/tranches/J/**` only.
- OBJECTIVE: a binary on an UNEXECUTED plan — (A-clean) path-scoped cherry-pick of
  `docs/tranches/J/**` to main, marked "unexecuted successor plan to I"; or
  (delete) delete the branch (unexecuted, no consumers). KILL option B (a J→I-FOLD
  pointer memorializes a phantom tranche — J's work never happened, nothing to
  fold).
- EDIT SITES: (A-clean) `docs/tranches/J/**` cherry-picked to main + a header note
  marking it unexecuted; (delete) branch deletion + one-line note in `I/FINAL.md`
  §"Open and deferred".
- HARD GATE: `git ls-tree --name-only main -- docs/tranches/J/` either lists the 13
  files WITH the unexecuted-marker note (A-clean), or the branch is gone and no
  branch-only production-deck tranche docs exist (delete); decision recorded in a
  real `L.md` section; deck still builds (no `src/` change either way).
