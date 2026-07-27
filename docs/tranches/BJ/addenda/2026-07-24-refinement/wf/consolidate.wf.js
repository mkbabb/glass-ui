export const meta = {
  name: 'terminal-roster-consolidation',
  description: 'R2: consolidate every banked spec + the 43-gap burn-down into ONE dependency-ordered implementable wave roster — tri-fold',
  phases: [
    { title: 'Draft', detail: 'Fable ∥ Opus each draft the full roster + burn-down', model: 'opus' },
    { title: 'Adjudicate', detail: 'Fable apotheosis', model: 'fable' },
    { title: 'Complete', detail: 'Opus completeness critic — grep-verified coverage', model: 'opus' },
    { title: 'Terminal', detail: 'Fable foreman → TERMINAL-ROSTER', model: 'fable' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const CANON = `Repo /Users/mkbabb/Programming/glass-ui, HEAD 26a41fe3, tranche BJ, TRANCHE DEVELOPMENT —
read everything, author no repo byte; your text is the deliverable. State your modelId. Dense tables,
file:line, em dashes without spaces. Consume \`${REF}/EXEC-STATE.md\` FIRST (all standing rulings incl.
tri-fold law, port 5400, census caveats), then \`${REF}/AUDIT-PLAN.md\`.`

const BRIEF = `THE TASK — the "ready for implementation" hinge. The corpus holds terminal specs scattered
across nine artefacts, but \`${REF}/WAVES.md\` (the wave set of record) contains ZERO references to the
waves minted this cycle (verified: W-BLOB, GF-TIMELINE, GF-FOURIER, W-CONFIG-EXPRESS, LAYOUT all absent).
Produce the ONE implementable roster + the R2 burn-down:

**A · THE TERMINAL ROSTER.** Every wave, one table + one dependency DAG, consolidated from ALL of:
\`WAVES.md\` (legacy — audit each row: superseded by a newer spec? absorbed? still live?),
\`COMPONENT-WAVES-TERMINAL.md\` (tier-1 ×8), \`COMPONENT-WAVES-TERMINAL-2.md\` (tier-2 ×8),
\`GREENFIELD-TERMINAL.md\` (5 lanes — blob/aurora SUBORDINATED to \`PROCEDURAL-LEDGER.md\` per its header),
\`PROCEDURAL-LEDGER.md\` (blob-physics · GF-FOURIER · config-express + the unified defect ledger),
\`LAYOUT.md\`, \`RECONCILIATION.md\` §2 (the 43 gaps incl. the 4 S0s), the returned-Luna backlog
(EXEC-STATE — W8 detector, W4 nine-step, W7 K4, A11Y I-13, W6 namespace reset, W1/W2 redresses),
\`ECOUTE.md\` §3, and \`BAND-FOLD.md\`. Per wave: id · owning spec (file§) · band · depends-on ·
breaks (consumer relay? name the sibling) · gate ids · phase order. EVERY wave cites its spec-of-record;
a wave with no spec is flagged, never invented.
**B · THE BURN-DOWN.** (1) The W-BLOB roster entry with RE-AUTHORED born-RED gates (the drafted ones
pass on arrival — RECONCILIATION §2 row 4; gate against the charter: fission occurs, satellites orbit,
mood reads, cartoon cast live). (2) The unparking table: every EXECUTION-PROGRESS §PARKED row vs the
closed ASKs (\`${REF}/ASK.md\` "silence advances") and the 2026-07-25 rulings — RELEASED (say what fires)
or STILL-PARKED (say the live gate). (3) The 16 blank BI JUDGMENT-ROSTER decisions — propose a lead
disposition each (KEEP/CUT/FOLD + one-line ground) or mark the few genuinely owner-only. (4) The
doc-truth strike list: band files still carrying LANDED/CLOSED claims that critics rejected — file:line
+ the replacement line. (5) The GATE BUDGET: consolidate every gate every spec requests against the
40-60 invariant ceiling (gates-abrogation mandate); merge duplicates, strike any gate that cannot fail,
show the count.
**C · CONSTELLATION READINESS.** Per sibling (slides, value.js, keyframes, sci/atlas, fourier-analysis):
what 8.0.0 changes reach them, the relay addendum each gets (the slides relay is drafted in
PROCEDURAL-LEDGER §3 — cite it), and what is owed NOTHING. Fresh-census-at-ship stays law.
**D · WHAT GENUINELY NEEDS THE OWNER.** The minimal list. Known candidates: the consumer-definition
sentence (settles the 45-70% census); any BI blank rows you could not disposition; anything else you
find. Do NOT re-ask anything the owner already answered — check ASK.md and EXEC-STATE first.`

phase('Draft')
const [dO, dF] = await parallel([
  () => agent(`${CANON}\n\nYou are DRAFT ARM (one of two, independent).\n\n${BRIEF}`, { label: 'draft:opus', phase: 'Draft', model: 'opus', effort: 'xhigh' }),
  () => agent(`${CANON}\n\nYou are DRAFT ARM (one of two, independent).\n\n${BRIEF}`, { label: 'draft:fable', phase: 'Draft', model: 'fable', effort: 'xhigh' }),
])
const arms = [dF, dO].filter(Boolean)
if (!arms.length) throw new Error('both draft arms died')

phase('Adjudicate')
const apo = arms.length === 1 ? arms[0] : await agent(`${CANON}

TRI-FOLD ADJUDICATOR. Two independent drafts of the terminal roster follow. Agglomerate with sagacity
and INCREDULITY: spot-check shared claims against the corpus on disk; reproduce and RULE every
disagreement (roster membership, dependency edges, unpark verdicts, gate merges) — never average;
losers to §REJECTED with falsifiers.

===== FABLE =====\n${dF || '(died)'}\n\n===== OPUS =====\n${dO || '(died)'}`,
  { label: 'adjudicate', phase: 'Adjudicate', model: 'fable', effort: 'xhigh' })

phase('Complete')
const critic = await agent(`${CANON}

COMPLETENESS CRITIC. The roster below claims to consolidate everything. Falsify that by grep: (a) every
wave/spec heading in the nine source artefacts — is it in the roster or explicitly absorbed/retired?
(b) every RECONCILIATION §2 gap id; (c) every F01-F50/A01-A17/CFR row — owned, landed, or retired in
the roster's terms? (d) every returned-Luna item; (e) every gate any spec requests vs the budget table.
Report ONLY misses and miscounts, with the grep that proves each. If coverage is genuinely total, say
so in one line.

${apo}`,
  { label: 'complete:critic', phase: 'Complete', model: 'opus', effort: 'xhigh' })

phase('Terminal')
const terminal = await agent(`${CANON}

FOREMAN. Fold the completeness critic's misses into the roster (ADOPT each, or REFUTE with the grep
that kills it — no silent drops), then emit the TERMINAL body for \`TERMINAL-ROSTER.md\`: §A roster +
DAG · §B burn-down (all five parts) · §C constellation · §D owner-needs · §REJECTED · a final
READY-FOR-IMPLEMENTATION verdict with any remaining blockers named plainly.

ROSTER:\n${apo}\n\nCRITIC:\n${critic || '(critic died — say so in the verdict)'}`,
  { label: 'terminal:roster', phase: 'Terminal', model: 'fable', effort: 'xhigh' })

return { terminal }
