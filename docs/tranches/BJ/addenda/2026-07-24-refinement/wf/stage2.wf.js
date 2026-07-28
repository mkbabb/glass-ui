export const meta = {
  name: 'stage2-delta-fold',
  description: 'The declared STAGE-2 DELTA FOLD (roster #90): fold DESIGN-NOW + EXPERIMENTS(+capture) + CURES + the apotheoses supersession into TERMINAL-ROSTER and the BK cursor — the final formulation act',
  phases: [
    { title: 'Fold', detail: 'Fable ∥ Opus author the delta set', model: 'fable' },
    { title: 'Write', detail: 'Fable adjudicates + writes roster/BK', model: 'fable' },
    { title: 'Certify', detail: 'Opus critic + Fable seal', model: 'opus' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const CANON = `Repo /Users/mkbabb/Programming/glass-ui, 2026-07-28, THE STAGE-2 DELTA FOLD — roster row
#90's declared owner firing on its declared trigger (all inputs banked). State your modelId. Consume
FIRST: ${REF}/EXEC-STATE.md (all rulings, all edicts) · ${REF}/TERMINAL-ROSTER.md (90 rows, the
PLAN-of-record) · docs/tranches/BK/ (the cut: PLAN/PORT/EXECUTION-PROGRESS/gates/ASK). Em dashes
without spaces. One-source law absolute; the 60-gate budget is add-one-retire-one.`

const BRIEF = `THE DELTA SET to fold, each with per-delta dispositions (ADOPT/route/REFUTE-with-grep,
no silent drops):
(a) ${REF}/DESIGN-NOW.md — the four thrice-designed specs: GF-BLOB re-cut (its §0 adjudication
OVERTURNS PROCEDURAL-LEDGER's 0.380 separation bar and supersedes the GF-BLOB rows; drive default 0.90;
depth cap 2; regime-F emergent) · GF-FOURIER (N7 discharged — seat it) · W-CHIP (blocker #5 discharged)
· W-DESIGN-CANON body (the wave becomes a LAND; verify the canon-body lane actually emitted a landable
body — if it emitted an outline/summary instead, say so plainly and the wave stays AUTHOR with the
banked material as its seed, honestly recorded) + its fold's roster deltas.
(b) ${REF}/EXPERIMENTS.md INCLUDING THE CAPTURE ADDENDUM (it supersedes §Row-38 where it conflicts):
grasp constants enter #22 with the addendum's corrections — the single-layer cure is BLOCKED as
written, the G-1 arithmetic struck, frost-thinning (25% raw at o=0.5) is the named residual defect
needing a ruled cure clause at #22 (rule it: e.g. never-both-below-α floor on the crossfade, or a
third approach — this is the ONE design ruling this fold may mint, ground it in the measured table);
loupe constants enter #35 confirmed; the rest-cost figure (+33 µs/resting rung) routes to #69.
(c) ${REF}/CURES.md — CF-1/X3's delete-first clause at #26 · X4's five→three primitive reconcile at
#78 · W-OVERLAY seated at #89 (spec-of-record = CURES.md §2; its DAG edges + the four unblocked
terminals noted).
(d) ${REF}/PROCEDURAL-APOTHEOSES.md — mark the blob charter's superseded cells (the DESIGN-NOW §0
overturns) IN PLACE per the strike-in-place law; GF-FOURIER/config-express apotheoses stand, now cited
by their banked file§.
(e) ${REF}/VALIDATION.md §4 protocol + ${REF}/EXPERIMENTS.md OWED rows + ASK.md R-7 — verify the BK
cursor carries them (owner+trigger each).
DELIVER: the complete amended TERMINAL-ROSTER.md body (in-place amendments, ⊕-marked, §0 fold ledger
extended) + the BK deltas (EXECUTION-PROGRESS row updates — #89 spec'd, #5/#90-related states,
new/changed rows; PORT.md §stage-2 record).`

phase('Fold')
const [fO, fF] = await parallel([
  () => agent(`${CANON}\n\nYou are FOLD ARM (one of two, independent).\n\n${BRIEF}`, { label: 'fold:opus', phase: 'Fold', model: 'opus', effort: 'xhigh' }),
  () => agent(`${CANON}\n\nYou are FOLD ARM (one of two, independent).\n\n${BRIEF}`, { label: 'fold:fable', phase: 'Fold', model: 'fable', effort: 'xhigh' }),
])
const arms = [fF, fO].filter(Boolean)
if (!arms.length) throw new Error('both fold arms died')

phase('Write')
const written = await agent(`${CANON}

TRI-FOLD ADJUDICATOR + WRITER — two independent delta folds. Agglomerate with sagacity and INCREDULITY
(contested cells re-read on disk; the #22 frost-thinning cure ruling is the headline split-risk — RULE
it from the measured table, never average). Then YOU ALONE write: the amended \`${REF}/TERMINAL-ROSTER.md\`
(full body) + the BK file amendments (\`docs/tranches/BK/EXECUTION-PROGRESS.md\`, \`docs/tranches/BK/PORT.md\`
— surgical edits, cursor ids stay reconciled). Return the change summary + final counts + §REJECTED.

===== FABLE =====\n${fF || '(died)'}\n\n===== OPUS =====\n${fO || '(died)'}`,
  { label: 'write:apotheosis', phase: 'Write', model: 'fable', effort: 'xhigh' })

phase('Certify')
const critic = await agent(`${CANON}

CRITIC over the WRITTEN state (read the roster + BK from disk). Falsify: (a) every delta-set item
(a)-(e) present or explicitly refuted in the roster's fold ledger; (b) the BK cursor still Σ-reconciles
(ids unique, no orphan states); (c) gates still exactly 60; (d) no banked file now cites an unbanked
section; (e) zero deferred-design clauses introduced. Report ONLY misses with proving greps; one line
if total.

WRITE REPORT:\n${written || '(writer died)'}`,
  { label: 'certify:critic', phase: 'Certify', model: 'opus', effort: 'xhigh' })

const seal = await agent(`${CANON}

SEAL — cure every critic miss ON DISK (you own the roster + BK files this seal), then return the
FORMULATION-CLOSED verdict: is the formulation corpus now whole — every spec terminal, every debt owned,
every design decision ruled, BK executable at Φ0 — with any residue named plainly (the legal OWED set:
Safari cells, device cells, R-7 footage, the three ratified glances).

CRITIC:\n${critic || '(critic died — verify (a)-(e) yourself before sealing)'}
\nWRITE REPORT:\n${written || '(missing)'}`,
  { label: 'seal', phase: 'Certify', model: 'fable', effort: 'xhigh' })

return { seal }
