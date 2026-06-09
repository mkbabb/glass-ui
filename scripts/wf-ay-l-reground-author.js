export const meta = {
  name: 'ay-l-reground-and-author-waves',
  description: 'Re-ground AY+L against AX HEAD using the 30 hardening findings (drop re-build-shipped waves, add net-new uncovered, reconcile numbering, author the execution DAG, re-stamp the ledger), THEN fully author every corrected wave spec (batches of 4) pursuant to the wave-spec precept.',
  phases: [
    { title: 'Re-ground', detail: 'one synthesizer rewrites AY.md/L.md + EXECUTION-DAG.md + re-stamps AUDIT-LEDGER; returns the corrected wave list' },
    { title: 'Author specs', detail: 'agent-per-wave (batches of 4) authors waves/<id>.md from the hardening findings' },
  ],
}
const GU = '/Users/mkbabb/Programming/glass-ui'
const SL = '/Users/mkbabb/Programming/slides'
const HARD = GU + '/docs/tranches/AY/audit/hardening'
const PRECEPT = GU + '/docs/precepts/instructions/TRANCHE-AND-WAVE-SPEC.md'

const WAVE_LIST_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['waves', 'droppedShipped', 'netNew', 'summary'],
  properties: {
    summary: { type: 'string' },
    droppedShipped: { type: 'array', items: { type: 'string' }, description: 'waves CUT because the work shipped in AX/K (with the gate/commit evidence)' },
    netNew: { type: 'array', items: { type: 'string' }, description: 'net-new waves added for uncovered items (Drawer-opaque, motion-coherence, a11y-perf, carry-closure, per-component-convergence, colocation, deck-chassis, feedback-coder-fourier)' },
    waves: {
      type: 'array',
      items: {
        type: 'object', additionalProperties: false,
        required: ['id', 'repo', 'title', 'state', 'hardeningFiles', 'seed'],
        properties: {
          id: { type: 'string', description: 'the reconciled wave id, e.g. AY.W-CON1 or L.W1' },
          repo: { type: 'string', enum: ['glass-ui', 'slides'] },
          title: { type: 'string' },
          state: { type: 'string', enum: ['OPEN', 'DONE-VERIFY', 'DEBT', 'NET-NEW', 'RESEARCH'] },
          hardeningFiles: { type: 'array', items: { type: 'string' }, description: 'the H-*.md finding files that inform this wave' },
          seed: { type: 'string', description: 'the defect + objective + edit-sites + the evidence-backed hard-gate seed for the spec author' },
        },
      },
    },
  },
}

phase('Re-ground')
const reground = await agent(`You are the AY+L RE-GROUND synthesizer. The 30-lane hardening hand-challenge proved the PLAN is the defect (not the code): the AUDIT-LEDGER is STALE (≥6 shipped+gated features mis-marked UNADDRESSED/DEFERRED — re-building them is churn), the wave set is DUAL-NUMBERED, ZERO wave specs exist, there are PHANTOM waves + PHANTOM gates, NO execution DAG, and ~6 uncovered items (the opaque .glass-drawer BLOCKER, motion-coherence, a11y/perf, carry-closure, per-component convergence, colocation, deck-chassis, feedback-coder Fourier bespoke).

READ ALL of these (they are the corrected truth, verified against HEAD):
- the 30 findings in ${HARD}/*.md — ESPECIALLY H-convergence.md (the per-band [DONE-VERIFY]/[OPEN]/[DEBT] acceptance checklist), H-gaps-master.md (the lane roll-call + the stale-ledger + phantom-wave classes), H-wave-completeness.md (the dual-numbering + uncovered-items + corrected inventory), H-execution-dag.md (the cross-repo publish→re-pin→adopt→deploy chain).
- ${PRECEPT} + ${GU}/docs/precepts/instructions/ORCHESTRATION.md (the format you author TO).
- the current ${GU}/docs/tranches/AY/AY.md + ${GU}/docs/tranches/AY/AY-DRAFT.md + ${SL}/docs/tranches/L/L.md + ${SL}/docs/tranches/L/L-DRAFT.md (the stale plans to CORRECT).

PRODUCE (use Write):
1. REWRITE ${GU}/docs/tranches/AY/AY.md — ONE reconciled numbering scheme; DROP every wave aimed at already-shipped work (warp AX.W17, slider AX.W59, --ui-scale touch/type AX.W51, fourier export, aurora oklab/atoms, the 4 READMEs) — record them in a "shipped, do-not-rebuild (verify-only)" table with the gate/commit evidence; KEEP the genuine [OPEN] work re-scoped (constellation RESIZE-REFIT transposition; aurora van-Gogh "stunning" born-RED; blob default-dark+consumer#2+simplify; dock-with-slider+progress-bar-off-dock; fourier abstract-or-book; god-module carves; the route-prune residue; the RESEARCH.md docs); ADD the net-new uncovered waves (W-GLASS-COHESION incl. the Drawer-opaque BLOCKER + Slider-off-glass-level; W-MOTION-COHERENCE; W-A11Y-PERF; W-CARRY carry-closure; W-CONVERGE per-component; W-COLOCATE; W-DELTA the 7 cardinal DELTA-owed + generalize the live-verified-ledger gate off AX-hardcoded). Add W0-REGROUND as the prerequisite wave. Keep the §0 directive table + §1 re-ground + §2 bands + a NEW §3 that POINTS to the execution DAG.
2. REWRITE ${SL}/docs/tranches/L/L.md — fix the 3 phantom waves (give L.W-MOB/CHR/ADOPT real rows or fold), re-ground the mobile/chrome against the CURRENT slide set (much shipped per H-slides-mobile-chrome), re-scope L.W-ADOPT as the constellation RE-ARCHITECTURE (anomaly-skin→drawOverlay + scanner model-change + the proof:no-bespoke-constellation gate authored HERE in slides), correct the feedback-coder facts (0.72 is macro-F1 not balanced-accuracy per H-feedback-coder), keep L.W1 5/6/7 with the xray-redolent TOKENS + the resolved-bookend-on-one-slide fix.
3. WRITE ${GU}/docs/tranches/AY/EXECUTION-DAG.md — the single hardened roadmap: the batch order (W0-REGROUND first; then the OPEN component work; then the close; then the cross-repo PUBLISH→slides-re-pin-EXACT-version→L.W-ADOPT→L.W5-deploy chain), the dependency edges, the per-wave DELTA-capture, the user-domain publish hinge.
4. RE-STAMP ${GU}/docs/tranches/AY/audit/AUDIT-LEDGER.md — flip the mis-marked rows to their true HEAD state (DONE-VERIFY where shipped+gated), per H-convergence + H-precept-drift.

Then RETURN the structured corrected WAVE LIST (every wave that needs a spec authored — the OPEN/NET-NEW/DEBT ones, NOT the DONE-VERIFY ones), each with its id/repo/title/state/the hardeningFiles that inform it/the seed (defect+objective+edit-sites+hard-gate). This list drives the spec-authoring phase.`, { label: 'reground-synthesizer', phase: 'Re-ground', schema: WAVE_LIST_SCHEMA })

const waves = (reground?.waves ?? []).filter((w) => w && w.id && w.state !== 'DONE-VERIFY')
log(`re-ground complete: ${waves.length} waves to author (dropped ${reground?.droppedShipped?.length ?? 0} shipped, added ${reground?.netNew?.length ?? 0} net-new)`)

phase('Author specs')
const PRE = `You are a WAVE-SPEC author for the AY (glass-ui ${GU}) + L (slides ${SL}) golden tranches, authoring pursuant to ${PRECEPT} (read it: a wave spec = defect→objective→files/edit-sites→evidence-backed HARD GATE; grep-only/"API exists" gates are INSUFFICIENT for runtime features; zero-deferral). Read your wave's hardening finding files for the verified defect + spec inputs. Author the COMPLETE spec — concrete file:line defects, the objective, the exact edit-sites, and a HARD GATE backed by an artefact (a proof:* gate / a π readback / a captured DELTA / a deletion-proof / a build-diff). NO vague gates. Honor the precepts (gestalt, no-workaround, root-not-consumer, ≥2-consumer bar, the cardinal DELTA, greenfield-no-meta). Write the spec to its waves/ file. Return a one-line confirmation + the hard gate.`

const BATCH = 4
const authored = []
for (let i = 0; i < waves.length; i += BATCH) {
  const batch = waves.slice(i, i + BATCH)
  log(`authoring wave specs batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(waves.length / BATCH)} — ${batch.map((w) => w.id).join(', ')}`)
  const res = await parallel(batch.map((w) => () => {
    const dir = w.repo === 'slides' ? `${SL}/docs/tranches/L/waves` : `${GU}/docs/tranches/AY/waves`
    const findings = (w.hardeningFiles ?? []).map((f) => `${HARD}/${f.replace(/^.*\//, '')}`).join(', ') || `${HARD}/*.md (find the relevant)`;
    return agent(`${PRE}\n\n=== WAVE: ${w.id} — ${w.title} (state: ${w.state}, repo: ${w.repo}) ===\nHardening findings: ${findings}\nSeed: ${w.seed}\n\nWrite the full spec to ${dir}/${w.id.replace(/[^A-Za-z0-9.-]/g, '_')}.md and return {id:"${w.id}", gate:"<the hard gate>"}.`,
      { label: `spec:${w.id}`, phase: 'Author specs' })
  }))
  authored.push(...res.filter(Boolean))
}
return { reground: reground?.summary, wavesAuthored: authored.length, dropped: reground?.droppedShipped, netNew: reground?.netNew, authored }
