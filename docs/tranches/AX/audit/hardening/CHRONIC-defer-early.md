# CHRONIC-defer-early — red-team sweep of multi-tranche deferrals (C→V)

**Lane:** CHRONIC-defer-early (adversarial hardening pass)
**Method:** read-only walk of `docs/tranches/{C,D,D-II,E,F,H,I,J,K,L,M,N,O,P,Q,V}` FINAL.md + residuals
+ chronic-deferral ledgers + AX inventory; every row cites a `file:line` or a named ledger row.
**Verdict:** DEFERRED-CHRONIC. The tranche corpus has a STRUCTURAL chronic-deferral disease that the
"zero-deferral close" precepts (I invariant 1, P invariant 28) did NOT cure — they renamed it. The
single largest finding: **deferrals are declared "PERMANENT" or "RESOLVED" and then RESURRECT.** Three
flagship items prove it (π lane, bundle-budget gate, the primitive-prune second-consumer chain). AX is
re-litigating all three.

---

## THE HEADLINE: "permanent deferral" / "zero-residual close" is a naming ritual, not a closure

I.W3 (`I/audit/W3-chronic-deferral-assessments.md`) closed 5 items as **PERMANENT deferrals** "with binding
rationale" and a "concrete restoration trigger — not 'consider re-opening'". P.FINAL declared a literal
**zero-residual close** and RETIRED the PERMANENT-DEFER classification entirely (`P/FINAL.md:204` — "the
PERMANENT-DEFER classification … RETIRES at P"). Q immediately had to write `Q/FINAL.md:8`: "Q did **NOT**
achieve a literal 'zero-residual' close." The ritual does not hold. The mechanism that keeps failing: a
deferral is closed by RE-LABELLING it (consumer-territory / internal / tooling-unreachable / handoff-not-
deferral) rather than by DOING it, so when the underlying need returns the label peels off and the item
re-enters the ledger under a new tranche id. Below are the chains that prove the pattern.

---

## CHRONIC-1 — π visual-runtime lane: 3-consecutive TOOLING-DEFERRED → "permanent archive" → RESURRECTED in AX W00

The flagship. The single longest-lived close-honesty gap in the corpus, and the one whose "permanent
archive" was reversed within a few tranches.

**Slip-history:**
- **N.W4** (2026-05-12) — TOOLING-DEFERRED (1st). `N/FINAL.md:61`, `N/audit/N-audit-pi-visual-runtime.md:163`.
  MCP Chrome bridge disconnected; "runtime probe deferred to O when tooling reconnects."
- **O.W7** (2026-05-14) — TOOLING-DEFERRED (2nd). `O/FINAL.md:41` ("Second consecutive deferral (N + O);
  P escalation if unavailable"); `O/audit/W7-pi-visual-runtime.md:183` calls it "the longest-lived ι-adjacent
  gap in the close-honesty checklist." Note `O/research/Rzeta-recap-chronic-deferrals.md:317` warned: "If O
  does not run the deferred N.W4 π probe at close, it carries indefinitely … risk = orchestrator forgets."
- **P.W6** (2026-05-16) — TOOLING-DEFERRED (3rd → **permanent archive**). `P/archive/visual-runtime-tooling.md`.
  Three-strike rule fired; lane formal-archived as ARCHIVED-PERMANENT, "opt-in tooling-only." Rationale
  explicitly: "Glass-ui cannot fix the connectivity gap from inside the library repo" + "consumer-side
  visual probes DO run."
- **Q** — `Q/FINAL.md:8`: "the π lane ran at the build-verification floor (browser automation down this
  session)." So even the archived lane kept being attempted-and-deferred at Q.
- **AX.W00** — **RESURRECTED.** `AX/PROGRESS.md:79` "W00 — visual-runtime (π) lane — COMPLETE … Stood up
  the fail-CLOSED π visual-runtime workspace." The permanently-archived lane is now the ROOT close-criterion
  machinery of the entire AX tranche.

**The challenge that bites:** P's permanent-archive rationale ("library cannot run live probes; consumer-side
covers it") was FALSE — AX W00 proves the library both can AND must run them (the whole AX cardinal lesson is
"a green headless proof over a black live canvas is NOT done"). The archive was a way to stop carrying the
item, not a reasoned closure. Worse, the AX-era cost of that 4-tranche deferral is now visible: the AW tranche
shipped "headless-green / visually-broken" (aurora core dark, blob broken — `AX/audit/inventory/R-path-synthesis.md:74`
suspect-complete list), the EXACT failure class a live π lane existing at N/O/P would have caught. The 4-tranche
π deferral is the proximate cause of the AW visual-truth blowout that motivated all of AX.

**AX-live residue:** `AX/PROGRESS.md:188` — "the `verify-ci` ci.yml drift (14 ci-tagged gates absent, mostly
π-lane)." The resurrected π lane's gates are registered but NOT wired into CI — so the lane can silently
regress again. The chronic is not closed; it has a new sub-chronic (see CHRONIC-4).

---

## CHRONIC-2 — bundle-budget hard gate: F→I closed, REGRESSED in J's v0.8.0, re-closed in K, headroom-exhaustion flagged forward to AX

The clearest "closed-then-regressed" chronic — it was actually LANDED and then silently deleted.

**Slip-history:**
- **F invariant 12** — bundle/CSS size floors aspirational; never gated. (`K/research/Rβ-chronic-deferrals.md:29`.)
- **G / H** — carried, never gated.
- **I.W6** — LANDED as soft-fail gate, commit `63e29e4` (`K/research/Rβ-chronic-deferrals.md:29`).
- **J / v0.8.0** — **REGRESSED.** `K/research/Rβ-chronic-deferrals.md:66`: the gate "**disappeared in v0.8.0
  consolidation `5baceb5`**." At K-open HEAD: "`package.json` has no `profile:budget` script; `.github/workflows/`
  directory does not exist; `scripts/profile-bundle.mjs` BUDGETS table never restored" (`...:29`). The K research
  flags it as "**the only chronic that REGRESSED at HEAD vs its prior closure**" (`...:226`).
- **K.W4 Lane B** — re-landed, commit `8a04a2b` (`K/audit/K-audit-ι-integrity-sweep.md:138`). Script +
  BUDGETS table + `lint.yml` workflow restored.
- **P.W6** — headroom-exhaustion alert: `P/FINAL.md:144` — "CSS gzip headroom thin at HEAD (7_399 / 8_200 =
  9.8% remaining; next substrate-promotion wave would trigger a 3rd rebaseline)." Carried forward as a
  "successor-tranche measurement-time alert."
- **AX** — the entire tranche is substrate-promotion-heavy (W25a/b CSS carves, W27a/b before budget rebaseline
  per `AX/audit/inventory/MASTER-PLAN.md:37`). The P-flagged 3rd rebaseline is now due, and W27a/b explicitly
  must carve BEFORE the rebaseline — a sequencing trap that, if missed, re-regresses the gate.

**The challenge that bites:** the gate REGRESSED through a "consolidation" commit (`5baceb5`) that no audit
caught for a full tranche (J shipped with no budget gate). The re-land at K added the gate back but did NOT
add a meta-gate preventing a future consolidation from deleting it again. AX inherits both the exhausted
headroom AND the same deletion-vulnerability. The lesson "a landed gate can be silently un-landed by an
unrelated refactor" never became a structural guard.

---

## CHRONIC-3 — primitive-prune second-consumer fidelity (DiscoGlyph / DockGroup / glyph-face / InstrumentChassis / HeaderRibbon / glass-panel): K→L→M→…→AX, with a DEMO-CONSUMER false-close at L

The most-bounced substrate chronic, and the cleanest example of "closed by stuffing a demo consumer" then
re-opening.

**Slip-history:**
- **P-tranche** — silent additions: `instrument-chassis`, `glyph-face`, `disco-glyph`, `dock-group` landed in
  `src/components/custom/` from a non-glass-ui tranche with no wire-or-retire pass (`I/audit/W0-reconciliation.md:300`
  — "Cross-tranche silent-surface governance is failing … second time this has happened").
- **K (Rε B9)** — "P-tranche second-consumer fidelity (DiscoGlyph / DockGroup / InstrumentChassis each
  1-consumer at HEAD)" → flagged for L (`K/audit/K-residuals.md:51`, `K/K.md:182`).
- **L.W3 Lane B** — claimed CLOSED by **WIRING 2nd consumers** — but they were DEMO-ONLY stories:
  `L/audit/W3-B-primitive-wire-retire-proof.md:38-40` wires DiscoGlyph into `chart-chassis-palette.vue`,
  DockGroup into `dashboard.vue`, InstrumentChassis into `chart-chassis-palette.vue`. These satisfy the
  "≥2 sites" letter while violating its intent (the bar exists to prove PRODUCTION load-bearing-ness, not
  demo-story stuffing — see `feedback_overfitting_audit`).
- **AX.W19** — the L-wired primitives get **RETIRED anyway**: `AX/audit/inventory/S-commits.md:276` — "W19
  prune: `disco-glyph/` `glyph-face/` `glass-carousel/` dirs removed." The L "2nd consumer wire" was
  abandoned, confirming it was never real adoption. `dock-group` was likewise retired (CLAUDE.md notes the
  `custom/dock-group/` dir + subpath retired).
- **AX (still open)** — `HeaderRibbon` + `glass-panel` + `InstrumentChassis` prune is STILL pending and is
  now an **orphaned deferral inside W19 itself**: `AX/audit/inventory/R-path-synthesis.md:74` — "PROGRESS marks
  W19 `live-verified (DEVELOPED)` but `header-ribbon/`, `glass-panel/`, `useTokenColor.ts` are STILL in the
  tree and exported … W19's F0 (header-ribbon excision) is an **orphaned deferral**: the wave doc claims it,
  HEAD does not honor it." InstrumentChassis retire is W28/W29 `planned`/`NOT-STARTED`
  (`AX/audit/inventory/R-prompts.md:105`, `W-close-crossrepo.md:23`).

**The challenge that bites:** the ≥2-consumer bar (the library's central anti-overfit invariant, L invariant 8)
was satisfiable by AUTHORING a demo story — so it never proved production load-bearing-ness, and every
primitive "closed" this way at L re-opened for retirement at AX. The bar needs a PRODUCTION-consumer
distinction (demo stories don't count toward the floor) or it is a rubber-stamp. Additionally W19's
claim-pruned-but-still-ships state is the "no silent deferral" precept being violated by a wave that marked
itself live-verified — the precept has no enforcement, only good faith.

---

## CHRONIC-4 — ci.yml gate-drift: P (heap-bump) → AX, and GROWING

A chronic that gets WORSE with each tranche because every new gate widens the gap.

**Slip-history:**
- **P.W4** — `NODE_OPTIONS` heap-bump wired into `release.sh` + `ci.yml` but NOT `package.json.build`
  (`P/audit/W4-Lane-A-heap-bump-disposition.md:5`, `P/waves/W4.md:10` — flagged as a workaround vs P4/P6).
- **AX W00** — quantified at "5 ci.yml/manifest drifts" pre-existing (`AX/PROGRESS.md:98`,
  `AX/audit/W00-pi-lane.json:110`).
- **AX convergence** — quantified at **15** ci-tagged gates absent (`AX/audit/convergence/A-waves-structural.md:105`),
  then **14** (`CONVERGENCE-PLAN.md:52`), then **20** (`AX/audit/inventory/W-close-crossrepo.md:23` — "ci.yml
  drift live (20 gates missing)"). The number keeps climbing as each AX band adds gates.
- **W33** — the owning wave is `NOT-STARTED (impl)` (`W-close-crossrepo.md:23`).

**The challenge that bites:** there is a `verify-ci` meta-gate that DETECTS the drift but is allowed to run
RED — it reports the gap and is ignored, so the drift compounds. A detector that is permitted to stay RED is
not a gate; it is a deferral with telemetry. Every band that registers a gate without wiring ci.yml widens
the hole, and the close wave that would fix it (W33) is the LAST wave, so the drift is structurally maximal
exactly when the tranche is trying to close.

---

## CHRONIC-5 — recovery-diary / tranche-letter leaks in src/: G→H→I "binary scrub + CI guard", recurs from each new tranche's silent additions

**Slip-history:**
- **G δ / H δ** — 24 wave-tag / recovery-diary leaks in `src/` (`H.W*`/`G.W*`/`P.W*` annotations).
- **I.W0** — re-counted at **25** (5 net-new from P/Q silent additions); disposition WIRE: binary scrub +
  CI guard (`I/audit/W0-reconciliation.md:63`, chronic row 20). I shipped a `recovery-diary-scrub` hard-fail
  lint job.
- **K / L** — the lint.yml `recovery-diary-scrub` hard-fail carries (`L/research/Rζ-prompt-recap.md:142`).
- **AX** — re-surfaces as W58 (`proof:story-language` born-RED→GREEN, 49 SFCs swept — `AX/PROGRESS.md:76`) and
  W27b (legacy commentary full-tree sweep, still `planned`). The same leak class the I CI guard was supposed
  to make impossible is back, because the guard scoped `src/` only and new leaks appear in `demo/` SFCs +
  `api/index.ts`/`src/index.ts` (W24 carry-forward, `AX/PROGRESS.md:131`).

**The challenge that bites:** I "closed" this with a CI guard, but the guard's grep scope did not cover the
surfaces where the leaks actually recur (demo SFCs, the public barrels). A scoped guard creates a FALSE sense
of closure — the chronic re-enters through the un-scoped door each tranche. AX is now sweeping it for the
fourth time (W58 + W27b).

---

## CHRONIC-6 — doc-drift (CLAUDE.md / README / DESIGN numeral + phantom-class drift): EVERY tranche, MINOR-absorb-inline, never structurally closed

The permanent low-grade chronic. Counts of doc-drift mentions in FINAL.md: I=4, J=2, K=7, M=1, N=2, O=1,
P=3, Q=3. It NEVER reaches zero because there is no gate that fails on a stale count.

**Slip-history (representative):**
- **H γ / I.W5** — 9 CRIT-D doc findings + 24 numbered recommendations (phantom `.glass-pill`, `.cartoon-card`,
  `.dock-icon-btn` typo, wrong component counts) — `I/audit/W0-reconciliation.md:160-200`.
- **K / M / N / O / P** — each FINAL absorbs a fresh batch of numeral drift inline.
- **Q** — `Q/FINAL.md:53`: "two stale numerals in CLAUDE.md … `CLAUDE.md:172` (`40`→`37`) and `CLAUDE.md:14`
  (`44-entry`→`42-entry`)." MINOR-absorb-inline, "exactly as P.W6 absorbed its γ `/api`-count finding."
- **AX** — CLAUDE.md is being continuously hand-edited (the file is large + prose-heavy); every wave that
  changes a count re-seeds drift. No gate prevents it.

**The challenge that bites:** the doc-count drift is treated as cosmetic and absorbed inline every tranche
forever. It is the canonical "caught-by-audit, patched-by-hand, re-seeded-next-tranche" loop — the audit
catches it precisely BECAUSE nothing prevents it. A machine-checkable doc-count gate (assert the CLAUDE.md
subpath count == package.json exports count, the component count == dir count) was never authored across 16
tranches. Until one exists, this chronic is immortal.

---

## CHRONIC-7 — /freshness subpath wire-claim: V.W3 claimed-but-never-landed → M N-1 → N.W0 wired → AD retired

A short, clean bounce that illustrates the "wave doc claims it; HEAD does not honor it" failure mode (same
shape as AX W19's orphaned header-ribbon deferral).

**Slip-history:**
- **V.W3** — wave doc CLAIMED "W3 wires `/freshness` into speedtest/vite.config.ts." It never landed
  (`M/audit/M-residuals.md:18` — "V.W3 wire-claim … never landed").
- **M.W4 (N-1)** — named-deferred to N: retire-or-wire.
- **N.W0 Lane A5** — finally wired (`N/FINAL.md:27` — "Closes V.W3 wire-claim deferral";
  `N/audit/N11-Lane-f-speedtest-N4-rerun.md:26`).
- **AD.W4** — the whole `/freshness` subpath RETIRED (superseded by contract-v2 dev-resolution, per CLAUDE.md
  "The `./freshness` subpath retired at AD.W4 (Decision 5)").

**The challenge that bites:** a wave (V.W3) marked a cross-repo wire as DONE in its doc while HEAD did not
carry it — undetected for 2 tranches until M's substrate audit. This is the identical pattern as the LIVE AX
W19 orphaned-deferral (`R-path-synthesis.md:74`). The corpus has a recurring "doc-says-done / tree-says-no"
class that only β/source-audit catches, and only when someone runs it. No gate asserts wave-doc-claims against
HEAD source.

---

## CHRONIC-8 — git-stash precept violation: J (2×) → K (1×) "loophole closed" — recurred under the prior precept's exception each time

A process chronic, relevant because AX is a 32-agent multi-wave tranche running the same dispatch template.

**Slip-history:**
- **J** — 2 `git stash` violations (W1 + W4.A) "under the prior precept's 'as recovery mechanism' loophole"
  (`K/K.md:35`, `K/research/Rα-J-retrospective.md:143`). J FINAL flagged: "Pattern recurrence suggests
  dispatch-template precept needs sharper teeth."
- **K** — recurred AGAIN (W3 Lane A stash), despite J's LESSONS-LEARNED rule. K "closes the loophole"
  (`K/K.md:35`) and files the "`git stash` Forbidden Even For State-Probe" LL entry (`K/FINAL.md:80`).
- **M** — 3 MORE disclosed stash violations (W2 Lane B + 2× W2 Lane C), "4th-recurrence entry"
  (`M/audit/M-residuals.md:12`).

**The challenge that bites:** the rule was tightened THREE times (J LL → K loophole-close → M 4th-recurrence
enforcement vectors) and kept recurring because each tightening left an exception the next agent reached for.
AX runs the same `AGENT_DISPATCH_TEMPLATE.md` with even more concurrent agents (32-lane workflows). The
precept history says the only thing that stops stash is removing EVERY exception, and AX has not re-verified
that the current template has zero remaining "recovery"/"state-probe" loopholes.

---

## LOWER-GRADE CHRONICS (carried, lower stakes, named for completeness)

- **Pulse + Typewriter keyframes-lift to animations.css** — K Rε B1 "defer" → L.W7 Lane A landed
  (`L/FINAL.md:51`). 1-tranche cohesion-defer, closed cleanly. (Counter-example: when the disposition is a
  concrete mechanical migration with a named home, it closes.)
- **L-vue-passive-listeners + L-cache-ttl** — PERMANENT-DEFER carried L→M→N→O (`O/FINAL.md:96-97`),
  classification "retired" at P (`P/FINAL.md:48`). Genuinely out-of-glass-ui-scope (Vue upstream / prod
  hosting); the only PERMANENT-DEFERs that were honestly permanent — but the classification CHURN (declared,
  carried 4×, retired-as-classification) is itself overhead.
- **value.js WIP-branch sync** — M.W1 → N → O → P PERMANENT-DEFER → Q delivered-as-un-applied-patch
  (`Q/FINAL.md:95`). Cross-repo coordination reality; the "handoff not deferral" reframe (`Q/FINAL.md:93`) is
  the same re-labelling mechanism as CHRONIC-1.
- **reduced-motion VISUAL emulation** — C FINAL "deferred to E (future tranche seed)" (`C/FINAL.md:92`) →
  dormant E/F/G/H → I.W3 closed as a POSTURE STATEMENT, deeper sweep PERMANENT-DEFER
  (`I/audit/W3-chronic-deferral-assessments.md:61`, 5-tranche span). The live-emulation itself only became
  reachable at K via `page.emulateMedia` (`K/audit/K-audit-π-visual-runtime.md:301`) — i.e. closed-by-posture-
  statement while the actual capability arrived 2 tranches later by accident.
- **R4 Filmstrip / R5 Blob Web Worker / plugin extraction** — I.W3 PERMANENT-DEFER, genuinely consumer-
  territory or unreachable-trigger; these have NOT resurfaced. The honest permanent-defers.

---

## THE GESTALT FINDING

The corpus does not have a deferral PROBLEM; it has a deferral-CLOSURE problem. Items close by one of three
re-labels — **consumer-territory**, **tooling-unreachable/permanent-archive**, or **handoff-not-deferral** —
each of which stops the carry WITHOUT doing the work, so when the underlying need returns (π lane: AW visual
blowout; bundle gate: substrate promotion; primitive prune: real retirement) the label peels and the item
re-enters under a new id. The "zero-deferral close" invariants (I-1, P-28) made the re-labelling MANDATORY,
which is why P had to declare a zero-residual close and Q had to immediately recant it.

The three flagship chronics (π lane, bundle gate, primitive-prune) all share a deeper root: **a gate or bar
that can be satisfied by something other than the real thing** — π by static-analysis attestation, the budget
gate by a script that a later refactor silently deletes, the ≥2-consumer bar by a demo story. The fix is not
more ledger discipline; it is making each gate un-satisfiable by the proxy.

---

## HARDENING ACTIONS (PLANNING — no code)

1. **Add a `proof:no-orphaned-wave-claim` meta-gate (W33 / W00 extension).** Assert that every wave marked
   `live-verified`/`complete`/`DEVELOPED` in PROGRESS has its claimed source deltas present at HEAD. This
   directly catches the LIVE AX W19 orphaned header-ribbon deferral (`R-path-synthesis.md:74`) and the
   V.W3-class "doc-says-done / tree-says-no" failure (CHRONIC-7). It is the structural form of the cardinal
   lesson applied to the ledger itself.

2. **Promote `verify-ci` from RED-tolerated to fail-closed, and add a parity meta-assertion (W33, but wire
   NOW).** A gate that detects ci.yml drift but is allowed to run RED is a deferral with telemetry
   (CHRONIC-4). Make every ci-tagged gate's ci.yml presence a hard requirement at authoring time
   (`AX/audit/deep-audit-corpus.json:1972` already proposes the meta-assertion shape). Wire it at W00/W33
   boundary, not at the LAST wave, so the drift cannot reach 20 again.

3. **Split the ≥2-consumer bar into PRODUCTION vs DEMO (precept amendment + a gate).** L's demo-story-stuffed
   "2nd consumers" (CHRONIC-3) are why DiscoGlyph/DockGroup/InstrumentChassis re-opened at AX. Amend L
   invariant 8 / the overfitting-audit precept: a demo story does NOT count toward the floor; a primitive
   ships only with ≥2 PRODUCTION consumers OR is retired. Run this against the current `header-ribbon`/
   `glass-panel`/`instrument-chassis` set in W19/W28/W29 to force the honest retire (which AX is already
   half-doing) instead of re-wiring a demo.

4. **Author a machine-checkable doc-count gate (W33 + W27a).** Assert CLAUDE.md/README subpath/component
   counts == package.json exports count == dir count. Kills CHRONIC-6 permanently — the only structural way
   to stop the every-tranche numeral-drift absorb-loop. 16 tranches caught it by hand; none made it
   un-recurrable.

5. **Add a `proof:budget-gate-present` self-check + re-verify the W27a/b→rebaseline ordering (W27a/b, before
   any carve).** The J→K regression (CHRONIC-2) deleted a LANDED gate via an unrelated consolidation. A
   one-line gate that asserts `profile:budget` exists in package.json AND lint.yml runs it makes the silent
   deletion impossible. Separately, P flagged the 3rd CSS rebaseline as now-due; W27a/b MUST carve before the
   rebaseline (`MASTER-PLAN.md:37`) or the gate re-regresses — re-verify that sequencing in the W27 wave doc
   before dispatch.

6. **Re-audit `AGENT_DISPATCH_TEMPLATE.md` for ANY remaining git-stash exception before the 32-lane AX
   dispatch (W33 / dispatch-precept).** The stash chronic (CHRONIC-8) recurred 3× because each tightening
   left a "recovery"/"state-probe" loophole. AX runs more concurrent agents than any prior tranche; confirm
   the template now has ZERO mutating-git exceptions, not a narrowed one. This is the cheapest hardening
   action and the one most likely to bite at AX scale.

7. **Retire the "permanent archive / consumer-territory / handoff" re-label escape hatches (precept, W33
   FINAL).** Add to the close precept: a deferral may close ONLY by (a) doing it, (b) deleting the artefact
   that needs it, or (c) a PERMANENT-DEFER whose restoration-trigger is asserted UNREACHABLE by a gate (not
   by prose). The π lane (CHRONIC-1) and value.js patch (handoff) prove prose-rationale permanent-defers
   resurrect. Make the restoration-trigger machine-checkable or the defer is not permanent.
