export const meta = {
  name: 'bk-phi0-cures',
  description: 'Durable round-4 replay for the existing BK Φ0 run; apply the bounded cures, challenge them, and adjudicate without opening a new run',
  phases: [
    { title: 'Round-4 cure application', detail: 'Exact Luna graph and surface owners apply only the registered finite cure slices', model: 'gpt-5.6-luna' },
    { title: 'Round-4 document integration', detail: 'Exact Luna document owner banks the integrated existing-run evidence after both cure owners', model: 'gpt-5.6-luna' },
    { title: 'Round-4 challenges', detail: 'Two fresh Sol xhigh judgment-only challenges inspect the integrated cut without mechanical commands', model: 'gpt-5.6-sol' },
    { title: 'Round-4 adjudication', detail: 'Fresh Sol xhigh lead adjudication rules the integrated Φ0 cut', model: 'gpt-5.6-sol' },
  ],
}

const ROOT = '/Users/mkbabb/Programming/glass-ui'
const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const RUN = 'bk-phi0-20260729-01'
const CANON = `Repository ${ROOT}. Existing run ${RUN}; do not create a new run.
State the actual invoked model exactly. Read ${REF}/EXEC-STATE.md,
${REF}/WORKFLOWS.md, ${REF}/TERMINAL-ROSTER.md rows #1/#2/#75,
docs/tranches/BK/PLAN.md, docs/tranches/BK/EXECUTION-PROGRESS.md, and
docs/tranches/BK/execution/2026-07-29-phi0/{journal.jsonl,RESULTS.md}.
Preserve historical bk-phi0-execution.wf.js, all unrelated tracked bytes, and
the 248 pre-existing nonignored untracked files. Do not add a wave, row, gate,
registry, cron, daemon, watcher, or control plane. Do not edit product source,
graph source/artifacts/tests outside the registered owner slice.`

const GRAPH_CHARTER = `Graph round-4 cure charter: use an explicit canonical generator
with OWNER-MANIFEST inputs in scripts-generators; do not replace it with a
generic reached-boundary queue. Apply conservative mutation taint to
assignment, update, delete, destructuring, loop, and property-write paths.
Emit full flat Vue SFC block identity: blockKind, blockType, blockIndex, lang,
and setup, retaining existing style metadata. Treat an import with empty named
bindings as a runtime side effect; an import type with empty bindings remains
type-only.`

const SURFACE_CHARTER = `Surface round-4 cure charter: derive an eager static runtime
closure from AppShell using current graph truth; do not follow type-only edges or
lazy dynamic branches. Scan every blur occurrence. Make 0.1em ASCII-insensitive
while preserving exact custom-property case.`

phase('Round-4 cure application')
const [graph, surface] = await parallel([
  () => agent(`${CANON}

You are the exact gpt-5.6-luna xhigh graph application owner. Apply only the
registered graph cure slice: the builder, the focused graph test, regenerated
V3 JSON and rendered summary, and METHOD. Do not edit any other path. Preserve
historical v1/v2 bytes and the existing run boundary. Record actual model,
exact changed paths, and the bounded evidence returned by the owner.

${GRAPH_CHARTER}`, {
    label: 'apply:graph-cures-round-4',
    phase: 'Round-4 cure application',
    model: 'gpt-5.6-luna',
  }),
  () => agent(`${CANON}

You are the exact gpt-5.6-luna xhigh surface application owner. Apply only the
registered surface cure slice in boot-graph, token-hygiene, and type-hygiene.
Do not edit any other path, test, product source, or package metadata. Preserve
the existing detector scope and the integrated run boundary. Record actual
model, exact changed paths, and the bounded evidence returned by the owner.

${SURFACE_CHARTER}`, {
    label: 'apply:surface-cures-round-4',
    phase: 'Round-4 cure application',
    model: 'gpt-5.6-luna',
  }),
])

phase('Round-4 document integration')
const mechanical = await agent(`${CANON}

You are the exact gpt-5.6-luna xhigh document-integration owner. After both
bounded application owners return, bank their results and the integrated
round-4 state in the existing RESULTS and journal records, preserving all prior
journal lines and the six-file document boundary. Do not change product source,
graph source/artifacts/tests, or the historical workflow. Do not create another
receipt or run. Record the actual model and every path/document byte changed.

GRAPH OWNER RESULT:
${graph}

SURFACE OWNER RESULT:
${surface}

${GRAPH_CHARTER}

${SURFACE_CHARTER}`, {
  label: 'document-integration:phi0-round-4',
  phase: 'Round-4 document integration',
  model: 'gpt-5.6-luna',
})

phase('Round-4 challenges')
const [challengeG, challengeH] = await parallel([
  () => agent(`${CANON}

You are a fresh, non-author gpt-5.6-sol xhigh judgment-only Challenge G.
Inspect the graph and surface diffs, source, registered specs, exact Luna
round-3 receipt, and round-4 document integration. Challenge total-tranche fit,
process/model provenance, graph truth, surface truth, Stop durability, inbound
fit, integrated Φ0, and #2 readiness. Classify findings and state PASS,
FAIL, or NO-GO precisely.

This is judgment-only: do not run tests, builds, generators, censuses,
manifests, hook matrices, or any other mechanical command; do not invoke a CLI
or alter files. In particular, Sol must not perform mechanical reproduction.

GRAPH:
${graph}

SURFACE:
${surface}

LUNA DOCUMENT INTEGRATION:
${mechanical}

${GRAPH_CHARTER}

${SURFACE_CHARTER}`, {
    label: 'challenge-g:phi0-round-4',
    phase: 'Round-4 challenges',
    model: 'gpt-5.6-sol',
  }),
  () => agent(`${CANON}

You are a fresh, non-author gpt-5.6-sol xhigh judgment-only Challenge H.
Independently falsify the same integrated cut by inspecting diffs, source,
registered specs, exact Luna round-3 receipt, and round-4 document
integration. Check the full surface detector contract, graph payload and
provenance, ignored-output invariance, Stop, inbound, model proof, Φ0, and #2.
Classify findings and state independent passes, FAIL findings, and NO-GO.

This is judgment-only: do not run tests, builds, generators, censuses,
manifests, hook matrices, or any other mechanical command; do not invoke a CLI
or alter files. Sol challenges never reproduce Luna's mechanical ledger.

GRAPH:
${graph}

SURFACE:
${surface}

LUNA DOCUMENT INTEGRATION:
${mechanical}

${GRAPH_CHARTER}

${SURFACE_CHARTER}`, {
    label: 'challenge-h:phi0-round-4',
    phase: 'Round-4 challenges',
    model: 'gpt-5.6-sol',
  }),
])

phase('Round-4 adjudication')
const adjudication = await agent(`${CANON}

You are the fresh, non-author gpt-5.6-sol xhigh lead adjudicator. Rule the
integrated Φ0 cut from the exact Luna application/document results and both
fresh Sol judgment-only challenges. Preserve the honest round-3 failure and
charter only the minimal round-4 cure in this existing run. No frontend design
seat, no new run, and no mechanical reproduction. State the actual requested
and invoked model, verdicts, blocks, and whether round-4 remains source-fenced.

GRAPH OWNER:
${graph}

SURFACE OWNER:
${surface}

DOCUMENT INTEGRATION:
${mechanical}

CHALLENGE G:
${challengeG}

CHALLENGE H:
${challengeH}

${GRAPH_CHARTER}

${SURFACE_CHARTER}

Process ruling: Sol challenges are judgment-only and must not run tests,
builds, generators, censuses, manifests, or hook matrices. Exact Luna owns
the bounded application, mechanical/document integration, and durable ledger.`, {
  label: 'adjudication:phi0-round-4',
  phase: 'Round-4 adjudication',
  model: 'gpt-5.6-sol',
})

return { graph, surface, mechanical, challengeG, challengeH, adjudication }
