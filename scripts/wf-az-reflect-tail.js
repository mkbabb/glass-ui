// AZ — the reflect-band TAIL: the rate-limit-killed shell-ia lane re-run +
// the blob M1/M2 redress (the reflection record carries the diagnosis — the
// research+plan halves of the triumvirate are the record itself; this is the
// redress arm). SEQUENTIAL to hold total opus concurrency at 3 alongside the
// in-flight RAIL3 + MOTION2 workflows.
export const meta = {
  name: 'az-reflect-tail',
  description: 'Reflect-band tail: the shell-ia reflection lane (re-run) then the blob M1 (mobile 0x0 stage) + M2 (double-label leak) redress.',
  phases: [
    { title: 'ShellIA', detail: 'the shell+demo-IA reflection record' },
    { title: 'BlobRedress', detail: 'M1 mobile stage collapse + M2 raw-key label leak' },
  ],
}

const GU = '/Users/mkbabb/Programming/glass-ui'

const REFLECT_PRE = `You are a REFLECTION AUDITOR in glass-ui at ${GU} (branch tranche/AY @ HEAD — the full AZ build is landed: Batches 0-5 + the R4/R5 corrective). THE PROTOCOL (AZ.W-REFLECT — read ${GU}/docs/tranches/AZ/waves/AZ.W-REFLECT.md FIRST): (1) RECAPITULATE every audit item (R1→R7 across docs/tranches/AZ/audit/USER-AUDIT-*.md + the AY USER-AUDIT) + every user decision + every wave that touched YOUR surface, tabulated with its discharging evidence; (2) RE-VERIFY LIVE on :5199 with FRESH captures at >=2 viewports x both modes + pi readbacks where numeric (restart the demo if down: npm run dev -- --port 5199 --strictPort; NEVER :5173; the user audits :5210 — leave it); (3) THE PERFECTION QUESTION — walk your surface as a FIRST-TIME AUDITOR: anything that would draw a "wtf" is a MISS even if every ledger row is green; (4) VERDICT. Write the record to ${GU}/docs/tranches/AZ/audit/reflect/<surface>.md with the verdict, the recapitulation table, the capture list (literal filenames; store the PNGs beside the record), and the misses (severity-graded, evidence-anchored). AUDIT-ONLY: NO source/demo/script edits, NO git — a fix belongs to the redress, never your lane. Your final text is data.`

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

phase('ShellIA')
const shellIa = await agent(`${REFLECT_PRE}

=== REFLECTION: shell-ia ===
THE SHELL + DEMO IA: the gear=PresetEditor flow end-to-end (dark-at-TOP, glassy rows, live-apply), the script-F Foundations identity (divider, size, optical centering), the contextual facets reading sensibly per section, the R4-2 noise bar (walk EVERY demo category as a first-timer — anything "wtf" is a miss), the hierarchy rung + the suffusion outcomes (the display heroes, the one-color-events, the restraint). NOTE: a sibling lane flagged that programmatic scrollIntoView() fires the demo scroll-spy and re-writes the route mid-probe (a clean deep-link load does NOT redirect) — assess whether that scroll-spy behavior is itself a first-time-auditor miss for THIS lane, and avoid it corrupting your probes. NOTE 2: the R6 rail redirect (the in-dock facet groups are being moved onto a floating carousel strip by the in-flight W-RAIL3 redress — the shell docks may change under you mid-audit; if you see the in-dock DockLayerGroup facets, record their state as PRE-RAIL3 rather than failing the lane on them, and scope your contextual-facets verdict to the ROUTE-DRIVEN mapping itself).
Return (lane="shell-ia").`,
  { label: 'reflect:shell-ia', phase: 'ShellIA', schema: SCHEMA, model: 'opus' })

log('shell-ia: ' + (shellIa ? shellIa.verdict : 'NULL'))

phase('BlobRedress')
const blobRedress = await agent(`You are the BLOB REDRESS lane in glass-ui at ${GU} (branch tranche/AY @ HEAD). The reflection record ${GU}/docs/tranches/AZ/audit/reflect/blob.md is your RESEARCH+PLAN — read it in full. Discharge its TWO misses:

M1 (S2): the studio hero bead collapses to 0x0 on the mobile/coarse-touch viewport (390px) — the goo-blob-canvas resolves to a 0x0 rect; the mobile user sees the configurator controlling nothing. Root-cause the stage sizing (the studio stage at demo/stories/substrates/blob.vue — likely a height chain that collapses when the flex/grid context changes on the mobile layout) and fix it at the ROOT (no magic min-height patch unless the root is genuinely an unsized flex child — then the fix is the proper intrinsic-size contract).

M2 (S2): every configurator slider/select row leaks its raw camelCase config key as a visible label — ConfiguratorRow label="Attraction" WRAPS LabeledSlider label="attraction", so both render and the raw key reads as the primary line (blob.vue:487-516, all ~11 rows). Fix the DOUBLE-LABEL pattern at the root: ONE human label per row. Check whether the same double-label pattern lives in the AURORA studio chrome and any other Configurator consumer (grep ConfiguratorRow + Labeled* across demo/) and fix every instance — the fix must be the house pattern, not a per-row patch (if LabeledSlider inside a ConfiguratorRow should suppress its own label, prefer passing no label / an aria-label, or restructure to use the bare Slider — follow the existing idiom in the aurora studio if it is already correct there).

VERIFY: typecheck (npx vue-tsc --noEmit) + the relevant gates (npm run proof:blob-studio-config, proof:hierarchy if touched) + LIVE on :5199 — capture the redressed states (the mobile 390px studio with the bead PAINTING, the configurator rows with single labels) into ${GU}/docs/tranches/AZ/audit/visual/ as W-BLOB-REDRESS-*-light.png/-dark.png and author the DELTA doc W-BLOB-REDRESS-DELTA.md beside them citing the captures with the surface-paths/surface-hash headers (match the sibling DELTA docs' format exactly; surfaceHash is exported from scripts/proof-live-verified-ledger.mjs). Then APPEND a redress addendum to the reflection record (do not rewrite the auditor's verdict). Port discipline: :5199 only (restart via npm run dev -- --port 5199 --strictPort if down); NEVER :5173; leave :5210. NO git operations. Do NOT edit package.json/scripts/gates.mjs/PROGRESS.md — report needed deltas in sharedFileDeltas. Your final text is data.`,
  { label: 'redress:blob', phase: 'BlobRedress', model: 'opus',
    schema: { type: 'object', additionalProperties: false, required: ['lane', 'status', 'filesTouched', 'capturedPngs', 'sharedFileDeltas', 'verification', 'summary'], properties: {
      lane: { type: 'string' }, status: { type: 'string', enum: ['COMPLETE', 'PARTIAL', 'BLOCKED'] },
      filesTouched: { type: 'array', items: { type: 'string' } },
      capturedPngs: { type: 'array', items: { type: 'string' } },
      sharedFileDeltas: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['file', 'delta'], properties: {
        file: { type: 'string' }, delta: { type: 'string' } } } },
      verification: { type: 'string' }, summary: { type: 'string' } } } })

log('blob redress: ' + (blobRedress ? blobRedress.status : 'NULL'))
return { shellIa, blobRedress }
