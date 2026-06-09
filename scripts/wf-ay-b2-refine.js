export const meta = {
  name: 'ay-batch2-refine-handchallenge',
  description: 'Aggressive-questioning refinement of the AS-BUILT Batch-2 waves (W-CON1/W-BLOB2/W-DOCK2/W-FF2) + the gestalt cohesion + the remaining Batch-2 readiness: every facet, every deferred item, the component-perfection bar. Read-only adversarial; writes findings. Batched 4.',
  phases: [{ title: 'Refine', detail: 'adversarial as-built challenge + gestalt + readiness; findings to docs/tranches/AY/audit/hardening/b2/' }],
}
const GU = '/Users/mkbabb/Programming/glass-ui'
const OUT = GU + '/docs/tranches/AY/audit/hardening/b2'
const W = GU + '/docs/tranches/AY/waves'
const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['lane', 'fileWritten', 'verdict', 'findings', 'deferred', 'gestalt'],
  properties: {
    lane: { type: 'string' }, fileWritten: { type: 'string' },
    verdict: { type: 'string', enum: ['PERFECTED', 'GAPS-FOUND', 'NOT-COHESIVE', 'DEFERRED-RESIDUE', 'NEEDS-REWORK'] },
    findings: { type: 'array', items: { type: 'string' }, description: 'as-built defects — what is STILL wrong / not perfect / not cohesive, file:line' },
    deferred: { type: 'array', items: { type: 'string' }, description: 'items the wave deferred or left incomplete' },
    gestalt: { type: 'string', description: 'is the COMPONENT now perfected end-to-end? the acceptance bar vs the as-built reality' },
  },
}
const PRE = `You are an ADVERSARIAL REFINEMENT agent for the AY Batch-2 AS-BUILT waves (committed at tranche/AY HEAD, glass-ui ${GU}). The waves IMPLEMENTED real source + captured DELTAs + passed their gates — your job is to RED-TEAM the AS-BUILT result: is the component genuinely PERFECTED, or merely gate-passing? Hunt every facet still wrong, every deferred item, every cohesion gap vs the gestalt (the user's bar: stunning/perfect components, not just green). READ: the wave spec (${W}/<wave>.md), the AS-BUILT source (the files the wave changed — read them), the captured DELTAs (docs/tranches/AY/audit/visual/<wave>-*.png — view them), ${GU}/CLAUDE.md + the precepts. NO code edits — findings only. Write to ${OUT}/<lane>.md (dir nests). Return the structured finding. Be RUTHLESS + specific.`
function mk(lane, scope) {
  return () => agent(`${PRE}\n\n=== LANE: ${lane} ===\n${scope}\n\nWrite ${OUT}/${lane}.md then return (lane="${lane}").`,
    { label: lane, phase: 'Refine', schema: SCHEMA })
}
const lanes = [
  mk('B2-con1', `W-CON1 (constellation refit + auto-drift transposed UP). Read constellationField.ts + Constellation.vue + the 12 DELTAs. Is the refit truly perfect (the bbox-coverage 0.92/0.98 — does the lattice LOOK right after resize, or distorted)? The auto-drift band-widening to 24px (the agent loosened the settle gate) — is that a true fix or a fudge that makes the anomaly jitter? Does it cohere with the warp? Is constellationField.ts now OVER 510 (the god-module cap) after the additions? View the DELTAs.`),
  mk('B2-blob', `W-BLOB2 (dark→warm OKLCh default; 8-atom simplify). Read the goo-blob source + the DELTAs. Is the default now a STUNNING warm-cream living bead, or just "L≥0.62"? Does it read as the README claims? Did simplifying to 8 atoms LOSE expressivity? Is useMetaballRenderer still a 694-line god-module (W-BLOB2 didn't carve it)? The mood DELTAs — do they read? View them.`),
  mk('B2-dock', `W-DOCK2 (entering-child onset lockstep gate). Read the dock source + the gate + the DELTA. Is the user's actual lag (shell shrinks, items lag ~150ms) GENUINELY fixed in the as-built, or did the gate just get re-defined to pass? Does the captured DELTA SHOW the lockstep (items fade in sync with the shell)? Is the gate now non-tautological + does it bind the real onset? View the DELTA.`),
  mk('B2-ff', `W-FF2 (fourier W43 intensity model). Read the fourier-field source + the DELTA. Did the W43 intensity model ACTUALLY land (OUTLINE_PEAK_ALPHA gone, the 'final' preset READS not a corner stub)? Is the 3-substrate parity real? Is the field now VISIBLY correct (the SOTA the W43 research demanded), or minimally-passing? The cross-repo math-dup (fourier-analysis) — resolved or deferred? View the DELTA.`),
  mk('B2-gestalt', `THE GESTALT. Do the 4 as-built components (constellation/blob/dock/fourier) now form a COHESIVE, PERFECTED set, or 4 separate gate-passes? Read the 4 DELTAs together. Is the visual/motion/interaction language consistent across them? What does the user (who wants STUNNING, not green) see when they look at all 4? The convergent-optimum bar vs the as-built reality. What's the highest-leverage refinement across the 4?`),
  mk('B2-readiness', `The REMAINING Batch-2 specs (W-CON2 warp-verify+eggs, W-CON3 freeze-seam, W-AUR2, W-AUR-PAINTERLY the born-RED stunning bar, W-AUR-WEBGPU-DECIDE, W-BLOB3, W-SLD1, W-SLD2 — read their ${W}/*.md). After the hardening, are they READY to implement (gates real, edit-sites current, no overlap with the just-landed waves)? Which need re-grounding against the as-built Batch-2 changes? The W-AUR-PAINTERLY born-RED bar especially — is it implementable?`),
]
const out = []
for (let i = 0; i < lanes.length; i += 4) {
  const batch = lanes.slice(i, i + 4)
  log(`B2 refine batch ${Math.floor(i / 4) + 1}/${Math.ceil(lanes.length / 4)} — ${batch.length} lanes`)
  out.push(...(await parallel(batch)).filter(Boolean))
}
return out
