// AZ — RE-REFLECT band, stage B (blob then shell-ia, SEQUENTIAL — stage A's two
// lanes run concurrently; sequential B holds total opus concurrency at 3).
export const meta = {
  name: 'az-rereflect-b',
  description: 'Re-reflect stage B: blob then shell-ia — fresh full reflection records post-redress (the clause-10 re-stamp).',
  phases: [
    { title: 'ReReflectBlob', detail: 'blob pass 2' },
    { title: 'ReReflectShell', detail: 'shell-ia pass 2' },
  ],
}

const GU = '/Users/mkbabb/Programming/glass-ui'
const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['lane', 'verdict', 'recordPath', 'misses', 'capturedPngs', 'summary'],
  properties: {
    lane: { type: 'string' },
    verdict: { type: 'string', enum: ['PASS', 'FAIL'] },
    recordPath: { type: 'string' },
    misses: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['id', 'severity', 'what', 'evidence'], properties: {
      id: { type: 'string' }, severity: { type: 'string', enum: ['S1', 'S2', 'S3'] }, what: { type: 'string' }, evidence: { type: 'string' } } } },
    capturedPngs: { type: 'array', items: { type: 'string' } },
    summary: { type: 'string' },
  },
}

const PRE = `You are a RE-REFLECTION AUDITOR in glass-ui at ${GU} (branch tranche/AY @ HEAD). This is the SECOND reflection pass on your surface: the first pass (in git history of your record file) returned FAIL, its misses were REDRESSED (committed at HEAD), and you now judge AFRESH. THE PROTOCOL (AZ.W-REFLECT — read ${GU}/docs/tranches/AZ/waves/AZ.W-REFLECT.md FIRST): (1) RECAPITULATE every audit item (R1→R7 across docs/tranches/AZ/audit/USER-AUDIT-*.md) + the FIRST-pass record's misses + their redress commits, tabulated; (2) RE-VERIFY LIVE on :5199 with FRESH captures at >=2 viewports x both modes + pi readbacks where numeric (restart if down: npm run dev -- --port 5199 --strictPort; NEVER :5173; leave :5210); (3) THE PERFECTION QUESTION as a first-time auditor — a "wtf" is a MISS even if every ledger row is green; (4) VERDICT. REWRITE the record at ${GU}/docs/tranches/AZ/audit/reflect/<surface>.md IN FULL (a fresh record — the prior one is git history; head it "RE-REFLECTION (pass 2)" with the date) with the verdict, the recapitulation incl. the pass-1 misses x redress evidence, the LITERAL capture filenames (store PNGs beside the record), and any NEW misses. AUDIT-ONLY: NO source/demo/script edits, NO git. Your final text is data.`

phase('ReReflectBlob')
const blob = await agent(`${PRE}

=== RE-REFLECTION: blob ===
Pass-1 FAIL: M1 — the studio hero bead 0x0 on the 390px coarse viewport; M2 — every configurator row leaked its raw camelCase key as a visible label. THE REDRESS SINCE (commit 90bf11e5): M1 root-fixed in Configurator.vue (the single-column band gains an explicit minmax(var(--configurator-stage-min),auto) stage track; the bead wrapper re-based to a true square) and M2 wired the hideLabel seam on blob.vue (11 rows) + compositions/configurator.vue (4 rows). JUDGE AFRESH the full blob surface: /substrates/blob (hero-first IA, crisp watercolor swatches, the satellites orbiting), the studio (the stage on BOTH desktop AND the 390px coarse viewport — the bead must PAINT; the configurator rows must read ONE human label each; the live knobs; the two-rung gel shadow; the hierarchy), the cream-bead identity, the uBackdrop CONDITIONS-UNMET disposition. Return (lane="blob").`,
  { label: 'rereflect:blob', phase: 'ReReflectBlob', schema: SCHEMA, model: 'opus' })
log('blob pass 2: ' + (blob ? blob.verdict : 'NULL'))

phase('ReReflectShell')
const shellIa = await agent(`${PRE}

=== RE-REFLECTION: shell-ia ===
Pass-1 FAIL: SHELL-IA-M1 — the vertical W-RAIL3 facet chips occluded the page <h1> on desktop multi-facet routes (~26px overlap, "Buttons"→"uttons"). THE REDRESS SINCE (commit 83ea0ef9): the strip re-seated to the dock's vertical MIDLINE (inset-block-start: 50% + translate -50% in src/styles/dock/rail-extend.css) — the orchestrator already re-probed /display/buttons + /motion/springs with h1Overlap:false; CONFIRM independently on those routes + at least one more multi-facet route, both modes, and judge whether the midline seat reads well (the mid-body chip overlap is the ACCEPTED floating paradigm — content scrolls behind; only a load-bearing-chrome or title-band collision is a miss). Pass-1 M2 (S3, the F ink-mass band delegated to the tests-visual/shell-identity.spec.ts pi probe) stays recorded-not-a-defect. JUDGE AFRESH the full shell-IA surface per the pass-1 scope: the gear=Configurator flow, the F identity, the facet mapping, hierarchy + suffusion, the noise bar, mobile IA. Return (lane="shell-ia").`,
  { label: 'rereflect:shell-ia', phase: 'ReReflectShell', schema: SCHEMA, model: 'opus' })
log('shell-ia pass 2: ' + (shellIa ? shellIa.verdict : 'NULL'))
return { blob, shellIa }
