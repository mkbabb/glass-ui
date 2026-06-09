# H-slides-backlog — adversarial hardening of the slides P0/P1 backlog (L.W2/W3/W4)

**Lane:** RED-TEAM the slides backlog waves — SLIDES-REVIEW §6 (34 OQ) + §7 (P0/P1/P2). Are the
P0s (Ask headline rule-8, Confidential, ~$5M arithmetic) + the P1 redundancy + the
conformance-gate extension authored with file:line + evidence-backed hard gates? Which of the 34
OQs are unresolved decisions that BLOCK?

**Verdict: GAPS-FOUND.** The three wave docs (L.W2/W3/W4) are unusually well-grounded — file:line
refs verified accurate against live source, the P0s correctly scoped, the dead-token P0 correctly
recorded as already-landed. But four classes of defect remain: (1) **structurally unverifiable
hard gates** — `grep -c = 1` cannot verify "thesis stated once" when the thesis is paraphrased;
(2) **the L.W4 gate re-architecture is under-specced and self-contradictory** — it asks the gate to
both strip interpolations (current correct behavior) AND scan inside them, with no fixture harness
specified and no resolution of the strip-vs-scan tension; (3) **author-decision OQs are routed but
several are genuine BLOCKERS that L.W2/W3 cannot complete without** (the ~$5M scope fact, OQ7 corner-
case sourcing); (4) **stale OQs** (OQ25/OQ26 assume uncommitted K — but K is committed @ 3765d52).

---

## What is SOLID (verified, not asserted)

The file:line refs in L.W2/W3/W4 were checked against the live `main` working tree. They hold:

- **L.W2 Ask headline** — `SlideAsk.vue:51` is live `Let's <em>work<svg.../></em> together.`
  (verified). The glyph-fragmentation claim is real (the `<em>work<svg/></em>` wraps the verb).
- **L.W2 Confidential** — `SlideTitle.vue:43` is live `Briefing · <b>Confidential</b> · 2026`
  (verified, sole occurrence deck-wide). `meta.ts:16 softGated: false` confirmed.
- **L.W2 ~$5M** — `SlideProblem.vue:65` lab `Cumulative overpayment · DIT service invoices`,
  `:67` figure `~$5M`, beside the single-charter `~$618K`/`~$600K` narrative `:71`. Arithmetic
  gap confirmed: (618−600)K = $18K/mo drift; $5M ÷ $18K ≈ 278 months ≈ 23 years — provably not
  single-charter. The wave doc's claim is sound.
- **L.W2 dead-token correctly recorded as DONE** — `deck.css:80-81` now defines
  `--muted-foreground`/`--muted-foreground-strong` at `:root` via `light-dark()`. The L.W2 doc
  correctly excludes this from scope. The `.slide--dark:506-507` re-pin is NOT a DRY violation
  (force-dark slides legitimately override the `:root` `light-dark()`).
- **L.W3 Monitoring** — `SlideMonitoring.vue:40` "reading each transaction as it lands" + `:63`
  `⚑ ANOMALY · FLAGGED LIVE` (verified live). Grep-based hard gate is verifiable here.
- **L.W3 footer em dash** — `SlideFooter.vue:21` `{{ pad(index) }} — {{ pad(total) }}` (verified
  live, spaced). The `grep -nP '\}\} \x{2014} \{\{'` gate is a real verifiable assertion.
- **L.W3 Problem placeholder** — `Months`/`Uncaught` live at `SlideProblem.vue:113-116` (doc says
  114-115 — one-line drift, acceptable).
- **L.W4 gate internals** — `proof-deck-copy-conformance.mjs` verified: `:77` strips `{{ }}`,
  `:78` tags→newline (the fragmentation), `:133` (doc says `:131` — drift) `if(CARVE_OUT.test(line))
  continue` is the blanket per-line exemption, `:53-55` rule-8 matches only the two literal phrases.
  All three L.W4 defect claims are real.

The grounding discipline is genuinely strong — better than most lanes. The gaps below are about
gate VERIFIABILITY and OQ-routing honesty, not fabricated defects.

---

## FINDING 1 — L.W3 hard gate #1 + #5 are structurally UNVERIFIABLE (the grep-count trap)

**Defect.** L.W3 HARD GATE #1: *"the 'one loop, two hands' thesis appears exactly once across
`SlideLoop.vue` (`grep -c` on the thesis phrasings = 1)"*. And HARD GATE #5: *"an adversarial read
across slides 1–7 finds no thesis or figure restated more than once."*

The redundancy SLIDES-REVIEW §3.3.1 names is **paraphrastic**, not literal. The four restatements
are: head sub (`SlideLoop.vue:115` "One loop, two hands. The machine reads at scale; people make
the calls."), the AI/human band captions, and the keyline (`:180` "AI does the tedious, repeatable
processing at scale; people step in at key junctures."). These say the SAME thing in DIFFERENT
WORDS. A `grep -c` on "one loop, two hands" returns 1 today (verified — `:115` is the only literal
occurrence) — so the gate PASSES against the unfixed deck. The gate measures literal string count;
the defect is semantic repetition. **The hard gate cannot fail on the actual defect.**

HARD GATE #5 ("an adversarial read finds no restatement") is not a hard gate at all — it is a
subjective human judgment with no artefact. Per TRANCHE-AND-WAVE-SPEC §"Hard gate": *"Grep-only and
'API exists' checks are insufficient for runtime features"* and a hard gate *"is valid only when it
can be verified by an artefact."* "An adversarial read finds X" is neither grep nor artefact.

**Fold into:** L.W3 (re-author the hard gate). The verifiable form is a CAPTURED-DELTA + an explicit
*decisions* artefact: enumerate the four restatement sites by file:line in the wave doc, require the
diff to DELETE three of them (a deletion-proof: `git diff` shows the band-caption + keyline-first-
clause + "One loop, two hands" removed/collapsed), and require ONE canonical thesis line named in
the close record. Deletion-proof is an artefact; "an adversarial read" is not.

---

## FINDING 2 — L.W4 gate re-architecture is UNDER-SPECCED and internally contradictory

**Defect A — the strip-vs-scan contradiction.** The gate at `:77` strips `{{ }}` interpolations
*deliberately and correctly* — the comment reads *"interpolations are data/glyphs, not prose"*.
This is right: `{{ pad(index) }}` is a function call, not prose; scanning it for the AI-lexicon /
negative-parallelism rules would false-positive on every data binding. L.W4 OBJECTIVE asks to
*"scan inside `{{ }}` interpolations for page-register punctuation"* — but it does not say HOW to
scan SOME rules (the em-dash rule 1) inside interpolations while NOT scanning the OTHER five rules
there. As written, "scan interpolations" would re-introduce false positives on every `{{ }}` the
deck uses. The wave doc hand-waves "(or, if the headless-render path is too heavy, strip wrapper
tags AND scan interpolations)" — offering two fundamentally different architectures (DOM-render vs
source-regex) as interchangeable, with no decision and no analysis of which is correct.

**Defect B — the "rendered DOM" path has no harness and would be a new dependency.** L.W4 OBJECTIVE
floats *"re-architect the gate to grep RENDERED DOM text."* Rendering a Vue SFC to DOM in a Node
`.mjs` script requires either `@vue/compiler-sfc` + `@vue/server-renderer` (mounting each slide with
its props/reactive deps — non-trivial) or the Playwright harness (already present, `audit` script,
but that's a browser e2e, not a `node scripts/*.mjs` gate). The wave doc specifies NEITHER and
costs NEITHER. This is a `NEEDS-PROTOTYPE`-class unknown sold as a settled plan.

**Defect C — the negative-fixture hard gate has no home.** L.W4 HARD GATE #1: *"a fixture test
confirms the gate FLAGS a glyph-fragmented CTA … (Negative fixtures, asserting the gate would have
caught both)."* But the slides repo's `vitest.config.ts` globs ONLY `tests/unit/**/*.spec.ts`
(verified) and the gate is a standalone `.mjs` with NO test wrapper. WHERE do the negative fixtures
live? How are they run (a new `tests/unit/conformance-gate.spec.ts` importing the `.mjs`? the `.mjs`
isn't structured for import — it executes `process.exit` at module load, `:162`). The hard gate
requires a test harness that does not exist and is not specced. Per the precept, a hard gate must be
verifiable by an artefact — a fixture test that has no runner is not yet an artefact.

**Defect D — the simpler correct fix is overlooked (gestalt-over-patch inversion).** The §8 review
itself notes the §7 "broaden the regex" fix is insufficient. But the wave doc swings to the OTHER
extreme (full DOM render) without considering the middle: a `.vue`-aware tokenizer that, BEFORE
line-splitting, (a) collapses inline glyph wrappers `<em>…</em>`/`<svg>…</svg>`/`<b>…</b>`/`<i>…</i>`
into their TEXT content joined to the surrounding text node (so "Let's work together" stays one
line) while still breaking on block tags, and (b) keeps the `{{ }}` strip for the five prose rules
but adds a SEPARATE pre-strip punctuation scan over the raw template for the em-dash rule ONLY (the
one rule that legitimately fires on page-register glyphs). That is the idiomatic, dependency-free,
KISS fix. The wave doc neither names it nor rejects it — it is under-explored.

**Fold into:** L.W4 (re-author with a decided architecture). Pick the inline-wrapper-collapse +
em-dash-pre-scan (Defect D) as the spec'd path; reject the DOM-render path with a one-line rationale
(no harness, new dep, browser-only — disproportionate to two defects). Specify the fixture home
explicitly (refactor the `.mjs` to export its `checkLine(line, kind)` so `tests/unit/conformance-
gate.spec.ts` can import + assert the negative fixtures; move the `process.exit` behind an
`import.meta.main`-style guard so import doesn't terminate).

---

## FINDING 3 — author-decision OQs routed as "decide in L.W4" are BLOCKERS for L.W2/W3 completion

**Defect.** L.W2/W3 declare `Depends on: L.W1` but several of their hard gates depend on author
FACTS/DECISIONS that L.W4 (a LATER wave, `Depends on: L.W1, L.W2, L.W3`) is supposed to resolve.
This is a dependency cycle masked as sequencing.

- **~$5M scope (OQ5/OQ32).** L.W2 HARD GATE #3 requires the slide to "state what ~$5M spans" — but
  the wave doc itself says *"Needs ONE author fact (OQ5/OQ32)."* That fact is routed to L.W4's
  decisions table (`L.W4 OBJECTIVE`: "OQ5/OQ32 (~$5M scope → L.W2)"). L.W2 runs BEFORE L.W4. So
  L.W2 cannot complete its own hard gate until a later wave's decision lands. **This is the deck's
  single most-probable on-stage failure (a numerate auditor's first probe) and its resolution is
  circular across waves.** Either the author fact lands in L.W1/pre-L.W2, or L.W2's gate is a
  goal-miss waiting to happen. Per the corpus §F: the ~$5M is "~$618K/month vs a ~$600K contract,
  for months, uncaught at DPI — ~$5M total" — i.e. the SOURCE BRIEF already states ~$5M IS the
  single-charter cumulative ($18K/mo drift wouldn't reach $5M, but the FULL $618K/mo billed against
  a $600K contract over the contract life, plus the firewall/internet/content-filter disjunction
  set, is the program). **The wave docs never reconcile against the corpus §F fact** — the audit
  ledger and SLIDES-REVIEW treat ~$5M as an open mystery when the source brief constrains it. This
  is a missed cross-reference: the answer is partially in `PROMPT-CORPUS.md §F`, not purely an open
  author question.

- **OQ7 corner-case sourcing.** L.W3 says cut OR replace the `.evidence` row, "default = cut … OQ7,8
  decision in L.W4." Same inversion — L.W3 acts on a row whose disposition L.W4 decides. If the
  author confirms the corner cases ARE real TIL examples (per corpus §F: NSLP enrollment-vs-
  membership + pre-K is a REAL named case), the "default cut" is WRONG and L.W3 will have deleted
  traceable content. **The corpus §F again constrains this** ("NSLP free-lunch overpayment
  (enrollment vs membership, pre-K counts — corner cases)") — these are REAL, so the §3.3.2 "only
  unsourced content" framing is itself questionable; the fix is to SOURCE them (add the citation),
  not cut. The wave doc's "default = cut" risks destroying real grounded content.

**Fold into:** L.W2 + L.W3 (pull the BLOCKING author decisions forward into L.W1 or a pre-wave
decisions stub; cross-reference `PROMPT-CORPUS.md §F` which already constrains ~$5M and the corner
cases). L.W4's decisions table should RECORD decisions already-forced by §F, not pretend they are
all open. Convergence: no L.W2/W3 hard gate may depend on a decision a LATER wave owns.

---

## FINDING 4 — the 34 OQs: which BLOCK vs which are craft. The L.W4 routing has stale + mis-classified entries

I read all 34 OQs. Disposition audit (the BLOCKERS are the finding):

**Genuine deploy-BLOCKERS (must be DECIDED before the relevant content wave completes):**
- **OQ1 Confidential** — L.W2 defaults to "Public briefing · 2026 unless author rules otherwise in
  L.W4." Defaulting in W2 then re-deciding in W4 is backwards; the strike is mechanical (gate #2
  greps for absence) but the REPLACEMENT string is an author call. Routing OK but the default-then-
  ratify ordering is loose.
- **OQ5/OQ32 ~$5M** — BLOCKER, circular (Finding 3). The sharpest unforced gap.
- **OQ16 dead-token** — RESOLVED this session (verified `deck.css:80-81`). Correctly recorded.
- **OQ19 Ask headline** — L.W2 owns; rule-8-clean replacement is an author-flavored choice
  ("Point it at your first feed" vs "Where do we start?"). The wave gives options; OK.
- **OQ23 gate extension** — L.W4 owns; under-specced (Finding 2).

**Mis-classified / stale (the routing finding):**
- **OQ25** ("K staged-but-not-committed-as-code … land as a code commit before deploy?") — STALE.
  K IS committed @ 3765d52 (`git log` verified: "tranche-K: execute the til-briefing content+
  language pass + session fixes"). The SLIDES-REVIEW §1/§8 and OQ25 were written against a working-
  tree that has since committed. L.W4's decisions table must mark OQ25 RESOLVED-superseded, not
  carry it as open. The L tranche is authored on a premise (uncommitted K) that no longer holds.
- **OQ26** ("docs/tranches/J does not exist on main") — routed to L.W7 (correct), but it is NOT an
  OQ for the til-briefing backlog at all; it is a feedback-coder/process item. Mixing it into the
  "34 OQs resolved" hard gate (L.W4 #4) conflates two decks' decision sets.
- **OQ27-31 (feedback-coder)** — routed to L.W6 "recorded there, cross-linked." But L.W4 HARD GATE
  #4 says "All 34 OQs decided … no OQ left open." If OQ27-31 are DECIDED in L.W6 (a Track-B wave
  that runs independently), L.W4's gate cannot assert they are closed — L.W4 is Track A, L.W6 is
  Track B, and §3 says Track B "runs independently." **L.W4's "all 34 decided" gate has a
  cross-track dependency it cannot enforce.** Either the gate scope shrinks to OQ1-26+32-34 (the
  til-briefing set) or L.W4 must depend on L.W6 (it doesn't).

**Pure craft (non-blocking, correctly P2):** OQ2,3 (cover subtitle/AI-hero), OQ4 (Months — actually
P1, routed to L.W3), OQ8,9 (Loop canonical thesis / name the actors), OQ11,12 (in-SOR / cards),
OQ13,14,15 (Handoff — folded to L.W1), OQ17 (hung-frame fallback — a presenter-process decision, not
a code change), OQ18 (portal-visible view), OQ20,21,22 (Ask body — folded L.W1), OQ24 (DIT
escalation scope), OQ33 (carve-out token-scoping — folded L.W4), OQ34 (footer em dash — folded L.W3).

**Fold into:** L.W4 (re-scope the decisions-table hard gate to the til-briefing OQ set only; mark
OQ25 RESOLVED-superseded with the 3765d52 evidence; either drop OQ26-31 from the "all decided" gate
or make the dependency explicit). Convergence: the decisions table cites EVIDENCE per row (file:line
for resolved-in-source, commit SHA for resolved-this-session, wave-id for routed) — not a bare
DECIDED/ROUTED token.

---

## FINDING 5 — the cardinal-lesson DELTA discipline is named but the capture artefacts are vague

L.W2/W3 hard gates lean on greps (verifiable) but the COPY-CHANGE gates ("reads as a real ask,"
"the rendered footer shows an unspaced em dash (screenshot)") need a CAPTURED DELTA per the cardinal
lesson (a before/after screenshot pair, not a claim). L.W2 HARD GATE #1 ("verified manually now,
machine-verified once L.W4's gate sees it") explicitly DEFERS verification to a later wave — a
goal-miss risk. L.W3 #4 says "(screenshot)" but specifies no before/after pairing, no resolution, no
file path. Per the live-verify-capture precept: "live-verified" needs a captured DELTA artefact
(screenshot + paired evidence), not a commit-message claim.

**Fold into:** L.W2 + L.W3 (each copy gate names a captured before/after screenshot at a specified
viewport, stored at a path the close record cites). The Ask-headline gate must NOT defer its only
verification to L.W4 — it needs a standalone manual-read + capture in W2.

---

## Chronic-miss check (this lane)

- **The conformance gate's coverage gap is itself chronic.** Per SLIDES-REVIEW §2: `proof:deck-copy-
  conformance` was "specced G.W4.2 → claimed born-GREEN in G/H → never built → built by K" and now
  K's build STILL can't see the rule-8 CTA or the spaced footer em dash. The gate has been
  nominally-passing-while-blind across G→H→K. L.W4 is the third attempt to make it actually
  enforce; if L.W4 ships the under-specced version (Finding 2), this chronic miss recurs a fourth
  time. This is a CHRONIC-MISS-class item, not a fresh one.
- **The ~$5M honesty gap** is chronic-adjacent: figure-obliqueness was A.W4-obscured → G/H-restored
  → K-affirmed, but the ~$5M SCOPE (vs the single charter) was never stated — it has been the
  unguarded credibility hole across the whole figure-honesty arc.

---

## Convergence criteria (what "perfected" means for this lane)

The slides P0/P1 backlog is perfected when:
1. Every L.W2/W3/W4 hard gate is **artefact-verifiable** — a grep that fails on the real defect, a
   deletion-proof diff, a runnable fixture test, or a captured before/after screenshot at a named
   viewport. No "an adversarial read finds X" gate survives.
2. **No content wave's hard gate depends on a decision a LATER wave owns** — the ~$5M scope fact and
   the OQ7 corner-case sourcing land in L.W1/pre-wave, cross-referenced to `PROMPT-CORPUS.md §F`
   which already constrains both.
3. **L.W4's gate re-architecture is decided, not floated** — the inline-wrapper-collapse + em-dash-
   pre-scan path is spec'd (the DOM-render path rejected with rationale), the fixture harness home
   is named (the `.mjs` refactored to export `checkLine` + an import guard), and a fixture test
   FAILS on the pre-W2 `SlideAsk.vue:51` form and the pre-W3 `SlideFooter.vue:21` form.
4. **The decisions table is evidence-bearing and correctly scoped** — OQ25 marked RESOLVED-
   superseded (commit 3765d52), the cross-track OQ26-31 either dropped from the "all decided" gate
   or made an explicit L.W6 dependency, every row cites file:line / SHA / wave-id.
5. The three P0s land with a captured DELTA (Ask headline rewrite + glyph re-anchor; Confidential
   strike; ~$5M scope clause) and `proof:deck-copy-conformance` runs GREEN over the rewritten copy
   WITH the extended gate able to see what it currently can't.

---

## waveSpecInputs (concrete material for the re-authored waves)

**For L.W3 (re-author the redundancy gate):**
- DEFECT: `SlideLoop.vue:115` (head sub "One loop, two hands…"), `:180` (keyline "AI does the
  tedious, repeatable processing at scale; people step in at key junctures…"), the AI/human band
  captions, and `:185-193` (`.evidence` corner-case row) — the thesis is paraphrased 4×; the
  `grep -c = 1` gate cannot detect paraphrase.
- OBJECTIVE: collapse the 4× paraphrase to ONE canonical thesis line by DELETION (not rewording),
  named in the close record; SOURCE the corner-case row (`PROMPT-CORPUS.md §F` confirms NSLP
  enrollment-vs-membership + pre-K is a REAL case — add the citation, do NOT default-cut).
- EDIT SITES: `SlideLoop.vue:115,:180,:185-193` + band captions; `deck.css` `.evidence`/`.trap-row`.
- HARD GATE (artefact): `git diff` shows three of the four restatement sites DELETED/collapsed (a
  deletion-proof); the canonical thesis line is named; the corner-case row carries a `data-source`
  or visible citation OR is cut with the §F-checked rationale recorded; Monitoring `grep -n 'as it
  lands\|FLAGGED LIVE'` returns nothing; footer `grep -nP '\}\} \x{2014} \{\{'` returns nothing;
  Problem `Months`/`Uncaught` is a number or the cell is gone — plus a captured before/after
  screenshot of Loop + Monitoring + Problem at the deck's target + portrait viewport.

**For L.W4 (re-author the gate extension with a DECIDED architecture):**
- DEFECT: `proof-deck-copy-conformance.mjs:78` (tags→newline fragments glyph CTAs), `:77` (`{{ }}`
  strip hides the footer em dash), `:133` (blanket per-line carve-out), `:53-55` (rule-8 matches
  only two literal phrases).
- OBJECTIVE: (a) before line-splitting, COLLAPSE inline glyph wrappers (`<em>`/`<svg>`/`<b>`/`<i>`/
  `<span>` with no block role) into their text joined to neighbors, so a glyph-fragmented CTA stays
  one line; keep block tags as line breaks. (b) add a SEPARATE raw-template em-dash scan (rule 1
  ONLY) that runs BEFORE the `{{ }}` strip, so `{{ pad(i) }} — {{ pad(n) }}` is caught — while the
  five prose rules keep the `{{ }}` strip (no false positives on data bindings). (c) scope the
  carve-out to strip the matched archaic TOKEN from the line, then rule-check the rest. (d) broaden
  rule-8 to `^\s*let'?s\b[^.?!]*\btogether\b` over the COLLAPSED line. REJECT the DOM-render path
  (no Node harness, new dep, browser-only — disproportionate).
- EDIT SITES: `proof-deck-copy-conformance.mjs` (refactor to export `checkLine(line,kind)` + an
  `import.meta` run-guard so import doesn't `process.exit`); new `tests/unit/conformance-gate.spec.ts`
  (the fixture home); `vitest.config.ts` already globs `tests/unit/**` (no change); `L.md §7`.
- HARD GATE (artefact): `npm test` runs `tests/unit/conformance-gate.spec.ts` GREEN with negative
  fixtures that FAIL the gate on the pre-W2 `Let's <em>work<svg/></em> together.` and the pre-W3
  `{{ pad(index) }} — {{ pad(total) }}` and a `begotten`-plus-overclaim line; `npm run
  proof:deck-copy-conformance` runs GREEN over the post-W1/W2/W3 deck; the §7 decisions table carries
  a row per OQ1-26+32-34 with file:line / SHA / wave-id evidence (OQ25 = RESOLVED-superseded @
  3765d52); OQ26-31 either dropped from the "all decided" scope or an explicit L.W6 dependency.

**For L.W2 (pull blocking facts forward + harden the capture):**
- DEFECT: HARD GATE #1 defers verification to L.W4; HARD GATE #3 (~$5M scope) needs an author fact
  routed circularly to L.W4.
- OBJECTIVE: resolve the ~$5M scope from `PROMPT-CORPUS.md §F` ("~$618K/month vs a ~$600K contract,
  for months, uncaught at DPI — ~$5M total" — the cumulative is the full billed-vs-contracted gap
  over the contract life across DIT service invoices, NOT the $18K/mo drift) and state it on
  `SlideProblem.vue` beside the figure; rewrite `SlideAsk.vue:51` + re-anchor the `cta-draw` glyph to
  the load-bearing noun; strike `Confidential` at `SlideTitle.vue:43`.
- EDIT SITES: `SlideAsk.vue:51,:144`; `SlideTitle.vue:43`; `SlideProblem.vue:65-67` (the scope
  clause).
- HARD GATE (artefact): `grep -n Confidential` returns nothing; the Ask headline is an ask anchored
  on a noun (manual read + a captured before/after screenshot AT W2, not deferred); the `~$5M`
  hero carries a scope clause reconciling the figure with the single charter; `npm run build` green
  + a captured before/after of SlideAsk + SlideTitle + SlideProblem at the target viewport.
