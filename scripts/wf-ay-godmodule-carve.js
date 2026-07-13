export const meta = {
  name: 'ay-godmodule-carve',
  description: 'W-GOD1 (re-grounded to the TRUE line counts the B2 refinement found): carve the 4 god-modules <500 into cohesive colocated sub-modules — constellationField.ts (653), useMetaballRenderer.ts (707), SegmentedTabs.vue (689), GlassDock.vue (608). Public surface + return shapes byte-identical. proof:no-god-module GREEN. Each disjoint. Batched 4.',
  phases: [{ title: 'Carve', detail: 'one agent per god-module; cohesive sub-module split, byte-identical surface, gate green' }],
}
const GU = '/Users/mkbabb/Programming/glass-ui'
const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['module', 'status', 'beforeLines', 'afterLines', 'filesCreated', 'gateResult', 'surfaceStable', 'summary'],
  properties: {
    module: { type: 'string' }, status: { type: 'string', enum: ['DONE', 'PARTIAL', 'BLOCKED'] },
    beforeLines: { type: 'number' }, afterLines: { type: 'number' },
    filesCreated: { type: 'array', items: { type: 'string' } },
    gateResult: { type: 'string' }, surfaceStable: { type: 'boolean', description: 'public exports + return shapes byte-identical' },
    summary: { type: 'string' },
  },
}
const PRE = `You are a god-module CARVE agent (AY.W-GOD1) for glass-ui at ${GU}. The B2 refinement proved 4 files exceed the 500-line cap (proof:no-god-module RED at HEAD). Carve YOUR file into cohesive, COLOCATED sub-modules (a sub-dir if befitting: extract pure helpers / a class's method-clusters / a composable's sub-concerns into sibling files the host re-composes). RULES: the file's PUBLIC SURFACE (exports) + every function's RETURN SHAPE must be BYTE-IDENTICAL (consumers + tests unchanged). NO behavior change. NO nested imports. Colocate (same dir / a feature sub-dir). Idiomatic. Read ${GU}/CLAUDE.md + ${GU}/docs/tranches/AY/waves/AY.W-GOD1.md + the precepts (DRY/KISS, no-quick-fix). Do NOT run git (orchestrator owns the index). After carving, RUN: \`npx vue-tsc --noEmit\` + \`npm run proof:no-god-module\` + the component's own gates (proof:constellation-* / proof:blob-* / proof:tabs-unified / proof:dock-*). The carve closes only when proof:no-god-module is GREEN for your file + typecheck green + the component gates still green. Return the structured result.`
function mk(module, file, scope) {
  return () => agent(`${PRE}\n\n=== YOUR MODULE: ${module} (${file}) ===\n${scope}\n\nCarve it <500, verify the gates, return the result (module="${module}").`,
    { label: module, phase: 'Carve', schema: SCHEMA })
}
const mods = [
  mk('constellationField', 'src/components/custom/constellation/constellationField.ts (653)', `Extract the warp/wander cluster (nearestNode/warpStep/setWarpTarget/warpTo/pickWanderTarget + WARP_*/WANDER_* consts + refitField) into a colocated sibling (e.g. constellationWarp.ts), re-composed by the field. The field stays the orchestrator. Keep the default-OFF byte-identity + the AX.W17 warp thesis. proof:constellation-field + -warp-live + -refit-live stay green.`),
  mk('useMetaballRenderer', 'src/components/custom/blob/composables/useMetaballRenderer.ts (707)', `Extract the GL-program/uniform-upload cluster (shader compile + the uniform setters incl. the W-BLOB2 cCol.* color-perturbation uploads) and/or the satellite/geometry math into colocated siblings the composable re-composes. The composable stays the public seam (return shape byte-identical). proof:blob-* fleet stays green.`),
  mk('SegmentedTabs', 'src/components/custom/tabs/SegmentedTabs.vue (689)', `Extract the indicator-measure/elastic-stretch logic + the responsive-collapse logic into colocated composables (useTabIndicator already exists — lean on it; add useTabResponsive if befitting) so the SFC <script> drops <500. The variant/multi-select/responsive props + ARIA-role-per-variant unchanged. proof:tabs-unified stays green.`),
  mk('GlassDock', 'src/components/custom/dock/GlassDock.vue (608)', `Extract the morph/transition orchestration + the pointer/focus listener wiring into colocated composables (useDockTransition / a useDockChrome) so the SFC <script> drops <500. The orientation/containerName props + the morph + the aria contract unchanged. proof:dock-* stay green.`),
]
const out = []
for (let i = 0; i < mods.length; i += 4) {
  const batch = mods.slice(i, i + 4)
  log(`god-module carve — ${batch.length} files`)
  out.push(...(await parallel(batch)).filter(Boolean))
}
return out
