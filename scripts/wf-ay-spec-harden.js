export const meta = {
  name: 'ay-spec-harden-refine',
  description: 'Second-order hand-challenge + REFINE of the 43 authored AY.W-*.md specs (+ the L INFRA specs): real evidence-backed gates, edit-sites correct vs HEAD, completeness, precept-adherence, write-scope-overlap, the W-CARDINAL-INFRA pre-commit LOCKOUT, the dual-named-L reconcile. Batched 4. Lanes REFINE the specs in place.',
  phases: [{ title: 'Harden+refine', detail: 'batches of 4; each lane challenges + REWRITES its band specs; cross-cutting fixes the overlap + lockout' }],
}
const GU = '/Users/mkbabb/Programming/glass-ui'
const SL = '/Users/mkbabb/Programming/slides'
const W = GU + '/docs/tranches/AY/waves'
const HARD = GU + '/docs/tranches/AY/audit/hardening'
const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['lane', 'specsRefined', 'verdict', 'findings', 'gateRealness'],
  properties: {
    lane: { type: 'string' },
    specsRefined: { type: 'array', items: { type: 'string' }, description: 'the waves/*.md files edited' },
    verdict: { type: 'string', enum: ['SOLID', 'REFINED', 'GAPS-REMAIN', 'BLOCKER'] },
    findings: { type: 'array', items: { type: 'string' }, description: 'what was wrong + what was fixed (gate-realness, stale edit-sites, overlap, precept) — file:line' },
    gateRealness: { type: 'string', description: 'after refinement: is every spec gate evidence-backed (artefact/π/DELTA/deletion-proof), not grep/looks-right?' },
  },
}
const PRE = `You are an AY SPEC-HARDENING + REFINEMENT agent. The 30-lane hand-challenge hardened the PLAN (which waves); now harden the AUTHORED SPECS themselves. For each spec in your lane (under ${W}/), pursuant to ${GU}/docs/precepts/instructions/TRANCHE-AND-WAVE-SPEC.md:
- Is the HARD GATE genuinely evidence-backed (a proof:* gate / π readback / captured DELTA / deletion-proof / build-diff) — NOT a grep-only or "looks-right" placeholder? If weak, REWRITE it to a real artefact-bearing gate.
- Are the edit-sites correct vs LIVE HEAD (re-verify file:line; the original authoring may cite stale lines)? Fix.
- Is the spec COMPLETE (defect→objective→edit-sites→gate) + pursuant to precepts (gestalt, root-not-consumer, ≥2-consumer, cardinal-DELTA, greenfield-no-meta)? Fill gaps.
- Does it OVERLAP another spec's write-scope (the W-GLASS↔W-MOTION gates.mjs class)? Flag it.
Read the relevant original finding in ${HARD}/ for context. REFINE each spec IN PLACE (edit the waves/*.md with Write/Edit). Do NOT run git. Return the structured result — your final message IS the data.`
function mk(lane, specs, note) {
  return () => agent(`${PRE}\n\n=== LANE: ${lane} ===\nSpecs to harden+refine (read each, rewrite where flagged): ${specs.map((s) => `${W}/${s}.md`).join(', ')}\n${note || ''}\n\nReturn the structured result (lane="${lane}").`,
    { label: lane, phase: 'Harden+refine', schema: SCHEMA })
}
const lanes = [
  mk('S-constellation', ['AY.W-CON1', 'AY.W-CON2', 'AY.W-CON3'], 'Warp SHIPPED (verify-only); the REAL work is the refitField transpose-UP + the decided-scope egg (≥2-consumer bar) + the slides-side no-bespoke gate. Ensure the gates are π/DELTA-backed, not grep.'),
  mk('S-aurora', ['AY.W-AUR1', 'AY.W-AUR2', 'AY.W-AUR-PAINTERLY', 'AY.W-AUR-WEBGPU-DECIDE'], 'OKLAB/atoms SHIPPED (W-AUR2 is a sliver). W-AUR-PAINTERLY is the born-RED stunning bar — its gate MUST be the numeric arresting metric on real-GPU + a DELTA, not "looks stunning".'),
  mk('S-blob-fourier', ['AY.W-BLOB1', 'AY.W-BLOB2', 'AY.W-BLOB3', 'AY.W-FF1', 'AY.W-FF2'], 'Blob default-dark identity defect; consumer-#2 decision. Fourier W43 intensity NEVER landed + the cross-repo math-dup. Gates = born-RED→GREEN π + DELTA + the final-preset-reads check.'),
  mk('S-dock', ['AY.W-DOCK1', 'AY.W-DOCK2', 'AY.W-DOCK3'], 'The lockstep gate is TAUTOLOGICAL (box vs its own scalar). W-DOCK2 MUST assert the ENTERING-child onset (the real lag), not the leaving child. W-DOCK3 authors the missing dock-with-slider story.'),
  mk('S-glass-motion-a11y', ['AY.W-GLASS', 'AY.W-MOTION', 'AY.W-A11Y-PERF'], 'W-GLASS + W-MOTION are ALREADY IMPLEMENTED (this session) and BOTH edited gates.mjs/ci.yml — the WRITE-SCOPE OVERLAP. Refine the specs to RECORD the overlap-resolution + the as-built state; W-GLASS owes a Drawer DELTA. W-A11Y-PERF: real Safari-prefix + frame-budget gates.'),
  mk('S-systems', ['AY.W-SCALE1', 'AY.W-SCALE2', 'AY.W-SLD1', 'AY.W-SLD2'], '--ui-scale + slider-collapse SHIPPED. W-SCALE = EXTEND (form-atoms + desktop-fluid) + a REAL axe target-size gate. W-SLD1 = reconcile the rounded-knob-vs-cylinder design CONTRADICTION via a user-judged capture.'),
  mk('S-storybook-docs', ['AY.W-SB1', 'AY.W-SB2', 'AY.W-SB3', 'AY.W-DOC1'], 'IA SHIPPED; the residue is per-route KEEP/FIX/RETIRE + orphan-component-retire (route-prune ≠ component-retire) + the real language gate. W-DOC1 = quality-uplift (READMEs exist) + provenance-meta strip.'),
  mk('S-structural', ['AY.W-GOD1', 'AY.W-CSS1', 'AY.W-LEG1', 'AY.W-COLOCATE', 'AY.W-CONVERGE'], 'God-modules CONFIRMED RED (4 files). W-GOD1 gate = .css-aware + CI-promoted + byte-identical returns. W-COLOCATE/W-CONVERGE are net-new — ensure concrete edit-sites + real gates, not aspirational prose.'),
  mk('S-close-infra', ['AY.W-CARDINAL-INFRA', 'AY.W-CARRY', 'AY.W-DELTA0', 'AY.W-CLOSE1', 'AY.W-LIVE1', 'AY.W-PUB1', 'AY.W-IC1', 'AY.W-NDA', 'AY.W-CONSUMER', 'AY.W-TRIAGE', 'AY.W-DAG'], 'PRIORITY: W-CARDINAL-INFRA created a PRE-COMMIT LOCKOUT (the born-RED default-AX arm blocks ALL commits — the gate-locks-you-out anti-pattern). REFINE its spec: the pre-commit hook gates the ACTIVE tranche (AY, green); the AX 6-row born-RED backlog is the W-DELTA0 CI/local tracker, NOT a commit-blocker. Author the un-lockout. W-CARRY/W-DELTA0/W-CLOSE1 gates evidence-backed.'),
  mk('S-cross-cutting', ['AY.W-DAG'], `CROSS-CUTTING COHESION (read ALL ${W}/*.md + ${SL}/docs/tranches/L/waves/*.md): (1) build the WRITE-SCOPE-OVERLAP MATRIX — which specs edit the same files (gates.mjs/ci.yml/tokens.css/glass.css), so the DAG can sequence them serially not parallel. (2) Reconcile the DUAL-NAMED L specs (L.W1.md vs L.W1-close-arc-rebuild.md — pick one per wave, delete the dup). (3) Re-validate the convergence-criteria checklist (H-convergence) against the refined specs. (4) Confirm every AY.md §2 id has a spec + every spec is in §2. Write the matrix + the reconcile to ${HARD}/S-cross-cutting.md.`),
]
const BATCH = 4
const out = []
for (let i = 0; i < lanes.length; i += BATCH) {
  const batch = lanes.slice(i, i + BATCH)
  log(`AY spec-harden batch ${Math.floor(i / BATCH) + 1}/${Math.ceil(lanes.length / BATCH)} — ${batch.length} lanes`)
  out.push(...(await parallel(batch)).filter(Boolean))
}
return out
