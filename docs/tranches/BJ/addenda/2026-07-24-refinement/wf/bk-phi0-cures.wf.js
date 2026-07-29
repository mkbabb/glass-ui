export const meta = {
  name: 'bk-phi0-cures',
  description: 'Cure and independently re-challenge the existing BK Φ0 truth cut without opening a new wave, registry, or control plane',
  phases: [
    { title: 'Cures', detail: 'Two Sol judgment/implementation owners cure only the challenged graph-v3 and #1 truth defects', model: 'gpt-5.6-sol' },
    { title: 'Mechanical re-attestation', detail: 'Luna independently re-runs both candidate diffs, tests, censuses, manifests, and receipts', model: 'gpt-5.6-luna' },
    { title: 'Challenge G', detail: 'A fresh Sol instance falsifies tranche, wave, and feature truth', model: 'gpt-5.6-sol' },
    { title: 'Challenge H', detail: 'A second fresh Sol instance independently falsifies the same integrated cut', model: 'gpt-5.6-sol' },
  ],
}

const ROOT = '/Users/mkbabb/Programming/glass-ui'
const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const CANON = `Repository ${ROOT}. State the invoked model exactly. Read
${REF}/EXEC-STATE.md, ${REF}/WORKFLOWS.md, ${REF}/TERMINAL-ROSTER.md rows
#1/#2/#75, docs/tranches/BK/PLAN.md, docs/tranches/BK/EXECUTION-PROGRESS.md,
and docs/tranches/BK/execution/2026-07-29-phi0/{journal.jsonl,RESULTS.md}.
This is an existing-run cure: add no wave, row, gate, registry, cron, daemon,
or parallel control plane. Preserve unrelated tracked and untracked bytes.`

phase('Cures')
const [graph, surface] = await parallel([
  () => agent(`${CANON}

Cure only the challenged graph-v3 defects: ignored-artifact receipt invariance,
file-native Vue SFC locations with block identity, and fail-closed provenance
for nonliteral local dynamic modules. Preserve historical v1/v2 bytes. Verify
the full stored JSON and rendered summary twice, the adversarial architecture
suite under realistic load, the active ignored-artifact matrix, typecheck
delta, fatal ledgers, and diff containment. Return exact paths, counts,
receipt, hashes, and limitations.`, {
  label: 'cure:graph-v3-round-3',
  phase: 'Cures',
  model: 'gpt-5.6-sol',
  }),
  () => agent(`${CANON}

Cure only the challenged #1 truth gaps. Make the TagsInput canary assert the
contract it actually exercises without dead queries; detect side-effect-only
eager imports in all three boot scanners; and make CSS property/value hygiene
case-insensitive where CSS syntax is case-insensitive. Add discriminating
positive/negative mutation bites, preserve detector scope, run the six-file
battery and typecheck delta, and return exact paths and evidence.`, {
    label: 'cure:surface-salvage-round-3',
    phase: 'Cures',
    model: 'gpt-5.6-sol',
  }),
])

phase('Mechanical re-attestation')
const mechanical = await agent(`${CANON}

Mechanically re-attest both candidate cures without changing files or making
design judgments. Enumerate every post-boundary Sol cure receipt in the Φ0
journal, mapping earlier bytes to `superseded-by` or `currently-reproduced` so
the deviation window has zero silent drops. Verify exact changed-path containment; Git-visible and
ignored-artifact graph censuses; generated snapshot and manifest checks twice;
file-native SFC edge locations; resolved/nonliteral dynamic-module ledgers;
focused graph and six-file surface batteries; CSS/import mutation matrices;
typecheck delta; historical v1/v2 hashes; Stop-hook 14-class matrix; cron and
global-hook counts; and diff checks. Record the actual model and every command,
count, hash, failure, and limitation.`, {
  label: 'mechanical-reattestation:phi0-round-3',
  phase: 'Mechanical re-attestation',
  model: 'gpt-5.6-luna',
})

phase('Challenges')
const [challengeG, challengeH] = await parallel([
  () => agent(`${CANON}

Read the actual graph cure and integrated diff. Aggressively challenge
total-tranche fit, original-wave optimality, specification/process adherence,
machine-local durability, and every #1/graph-v3/#75 feature. Reproduce the
ignored-artifact matrix, SFC provenance, dynamic-module fail-closed behavior,
receipt determinism, hook matrix, and #2 readiness. Read-only; classify every
finding ADOPT, REJECT, or SPECULATION.

GRAPH:
${graph}

SURFACE:
${surface}

MECHANICAL RE-ATTESTATION:
${mechanical}`, {
    label: 'challenge-g:phi0-graph-cures-round-3',
    phase: 'Challenges',
    model: 'gpt-5.6-sol',
  }),
  () => agent(`${CANON}

Independently falsify the same integrated Φ0 cut. Check the registered-run
history, model provenance, exact graph payload and summary, projection and
owner totality, all typed edge locations, ignored-output invariance, SCC
ratchets, #1 detector/timer cures, Stop-hook durability, and the complete #2
source charter. Read-only; classify every finding ADOPT, REJECT, or
SPECULATION.

GRAPH:
${graph}

SURFACE:
${surface}

MECHANICAL RE-ATTESTATION:
${mechanical}`, {
    label: 'challenge-h:phi0-graph-cures-round-3',
    phase: 'Challenges',
    model: 'gpt-5.6-sol',
  }),
])

return { graph, surface, mechanical, challengeG, challengeH }
