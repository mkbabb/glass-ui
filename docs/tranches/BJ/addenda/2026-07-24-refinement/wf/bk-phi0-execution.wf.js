export const meta = {
  name: 'bk-phi0-execution',
  description: 'Open BK Φ0 with a truthful baseline, the rejected-governance salvage, graph-v3 truth, and two gestalt challenges before product-source mutation',
  phases: [
    { title: 'Truth', detail: 'Opus implements the bounded #1 salvage and graph-v3 instrument in isolated worktrees', model: 'opus' },
    { title: 'Challenge A', detail: 'Sonnet falsifies tranche fit, wave optimality, and feature behavior', model: 'sonnet' },
    { title: 'Challenge B', detail: 'Opus independently falsifies the same cut from graph, test, and durability evidence', model: 'opus' },
  ],
}

const ROOT = '/Users/mkbabb/Programming/glass-ui'
const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const CANON = `Repository ${ROOT}. State modelId. Read ${REF}/EXEC-STATE.md §THE
COMPACT-AND-IMPLEMENT ORDER + §THE RATIFICATION OF 2026-07-28, docs/tranches/BK/PLAN.md,
docs/tranches/BK/EXECUTION-PROGRESS.md, ${REF}/TERMINAL-ROSTER.md rows #1/#2/#75 and
§A.2, ${REF}/PROOF-SWEEP.md lane A, and ${REF}/WORKFLOWS.md. Preserve every unrelated
untracked file. Do not stage, commit, stash, or mutate sibling repositories.`

phase('Truth')
const [salvage, graph] = await parallel([
  () => agent(`${CANON}

Implement only Φ0 row #1's owner-ratified REJECT-WITH-SALVAGE: three detector conversions and
three hardened test bodies from stash f37407cd, annotations stripped, no governedInvariant import,
and only their direct dev dependencies. Bank the reproduced baseline and stray census at
docs/tranches/BK/execution/2026-07-29-phi0/RESULTS.md. Verify the six files, the whole suite, and
typecheck against the two pre-existing track-well-fold errors. Return exact changed paths and
machine results.`, { label: 'truth:surface-salvage', phase: 'Truth', model: 'opus' }),
  () => agent(`${CANON}

Implement the graph-schema-v3 pre-source instrument without changing product or demo source.
Preserve graph pass 1 and v2 byte-for-byte. Emit typed Vue/TypeScript/CSS edge kinds, explicit
single-owner manifest, package/build/test/generator projections, and distinct runtime/load/
ownership SCCs with a deterministic receipt. Run twice and prove receipt stability. Return exact
changed paths, counts, receipt, unresolved rows, and limitations.`,
  { label: 'truth:graph-v3', phase: 'Truth', model: 'opus' }),
])

phase('Challenge A')
const challengeA = await agent(`${CANON}

Read the two Truth results and the actual diffs. Aggressively challenge total-tranche fit, original
wave optimality, spec adherence, friction, the two waves as units, and every changed feature.
Re-run discriminating tests and graph mutations. Classify each finding ADOPT, NARROW, REJECT, or
SPECULATION. Read-only; return misses with evidence.

SALVAGE:
${salvage}

GRAPH:
${graph}`, { label: 'challenge-a:phi0-truth', phase: 'Challenge A', model: 'sonnet' })

phase('Challenge B')
const challengeB = await agent(`${CANON}

Independently falsify the same integrated Φ0 truth cut. Check stash selectivity, detector
non-regression, current baseline accuracy, owner-manifest totality, graph determinism, every
edge-kind projection, unresolved-local fail-loud behavior, and durability state. Include the
total-tranche/wave/feature analysis required by the BK execution law. Read-only; classify every
finding ADOPT, NARROW, REJECT, or SPECULATION.

SALVAGE:
${salvage}

GRAPH:
${graph}`, { label: 'challenge-b:phi0-truth', phase: 'Challenge B', model: 'opus' })

return { salvage, graph, challengeA, challengeB }
