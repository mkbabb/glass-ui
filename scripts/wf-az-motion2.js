// AZ — THE R7 MOTION TRIUMVIRATE (research → plan AZ.W-MOTION2 → redress).
// The user-edict response to USER-AUDIT R7 (the curve gallery): per the completion
// bar, a reflection FAIL routes through the triumvirate, never an inline patch.
// Three SEQUENTIAL opus lanes; each reads its predecessor's artefact from disk.
export const meta = {
  name: 'az-motion2',
  description: 'R7 triumvirate: research the keyframes.js easing canon + presentation idiom, author the ad-hoc AZ.W-MOTION2 spec, then redress the curve gallery to it (thick strokes, vivid register, a real picker, 1:1 isomorphism).',
  phases: [
    { title: 'Research', detail: 'the keyframes.js easing inventory + its demo idiom + the gallery gap census' },
    { title: 'Plan', detail: 'author docs/tranches/AZ/waves/AZ.W-MOTION2.md per TRANCHE-AND-WAVE-SPEC' },
    { title: 'Redress', detail: 'execute the spec: gallery rebuilt, gate born-RED→GREEN, DELTA captured' },
  ],
}

const GU = '/Users/mkbabb/Programming/glass-ui'
const KF = '/Users/mkbabb/Programming/keyframes.js'

const COMMON = `You operate in glass-ui at ${GU} (branch tranche/AY @ HEAD). THE BINDING AUDIT: ${GU}/docs/tranches/AZ/audit/USER-AUDIT-2026-06-11-R7.md (read it FIRST — four rows: R7-1 the muted register, R7-2 the ~1.5px strokes, R7-3 the cramped picker, R7-4 the missing keyframes.js isomorphism). The before-state capture: ${GU}/docs/tranches/AZ/audit/ground/R7-curve-gallery-before.png. THE ISOMORPHISM AUTHORITY (read-only, NEVER edit): ${KF}/src/animation/easing.ts + ${KF}/src/animation/springTimingFunction.ts, plus the keyframes demo presentation idiom at ${KF}/demo/easing/ + ${KF}/demo/spring/. The surface: ${GU}/demo/stories/motion/curve-gallery.vue + curve-families.ts (and the /motion band context per docs/tranches/AZ/waves/AZ.W-MOTION-SUITE.md). HARD FENCES: the ppmycota purple --motion-accent stays DEMO-LOCAL (never a library token); the one-color-event rule holds (the purple is the band's ONE event — thick strokes in it are the point); tailwind-first (a reference's standalone CSS re-expresses via @theme/@utility, never pasted raw); PRM-gate any animation; port discipline (:5199 is the gate demo — restart with "npm run dev -- --port 5199 --strictPort" if down; NEVER :5173; the user audits :5210 — leave it). NO git operations EVER (no stage/commit/checkout/reset — the orchestrator owns the index). Your final text is data for the orchestrator, not prose for a human.`

phase('Research')
const research = await agent(`${COMMON}

=== LANE: RESEARCH (audit-only — NO source edits; you may write ONLY your dossier) ===
Produce the complete research dossier at ${GU}/docs/tranches/AZ/audit/R7-MOTION2-RESEARCH.md covering:
1. THE CANON INVENTORY — enumerate EVERY exported easing item from ${KF}/src/animation/easing.ts (names, families/groups, signatures, any parameterized generators) and ${KF}/src/animation/springTimingFunction.ts (the spring timing surface). Tabulate exhaustively: this table IS the isomorphism target; a miss here propagates to the spec.
2. THE PRESENTATION IDIOM — read the keyframes demo (${KF}/demo/easing/, ${KF}/demo/spring/, + DESIGN.md/app chrome as needed): how does keyframes PRESENT its curves? Stroke weight, plot composition, grouping/IA, naming, interaction (hover/scrub/preview), color register. Capture the idiom as transferable principles (it re-expresses in the glass idiom — never copy CSS raw).
3. THE GALLERY CENSUS — the current ${GU}/demo/stories/motion/curve-gallery.vue + curve-families.ts: what it carries today (families, items, stroke widths file:line, the picker structure, the card register), diffed against the canon inventory → the literal GAP MATRIX (present/missing/misnamed/misgrouped per item).
4. THE REGISTER DIAGNOSIS — file:line root causes for R7-1/R7-2/R7-3 (which classes/tokens make it grey-on-grey; where the stroke-width is set; the picker's markup), + which house registers SHOULD carry it (the SegmentedTabs underline/segmented picker? the hierarchy rungs? the suffusion one-color-event with --motion-accent?).
Return JSON.`,
  { label: 'r7:research', phase: 'Research', model: 'opus',
    schema: { type: 'object', additionalProperties: false, required: ['lane', 'dossierPath', 'canonCount', 'gapCount', 'summary'], properties: {
      lane: { type: 'string' }, dossierPath: { type: 'string' },
      canonCount: { type: 'number', description: 'total easing items in the keyframes canon' },
      gapCount: { type: 'number', description: 'items missing/misrepresented in the gallery today' },
      summary: { type: 'string' } } } })

log(`research: canon=${research?.canonCount} gaps=${research?.gapCount}`)

phase('Plan')
const plan = await agent(`${COMMON}

=== LANE: PLAN (spec-authoring only — you write ONLY the wave spec) ===
The research dossier is at ${research?.dossierPath || GU + '/docs/tranches/AZ/audit/R7-MOTION2-RESEARCH.md'} — read it in full. Author the ad-hoc wave spec at ${GU}/docs/tranches/AZ/waves/AZ.W-MOTION2.md PURSUANT TO ${GU}/docs/precepts/instructions/TRANCHE-AND-WAVE-SPEC.md (read it; match the shipped waves' shape — see AZ.W-MOTION-SUITE.md as the band predecessor). It must carry: §0 RE-GROUND (the R7 verbatim reads + the dossier's gap matrix), the defect table (file:line), the DESIGN (the 1:1 isomorphic canon — named, grouped, plotted as keyframes presents them, re-expressed glass/tailwind-first; the THICK stroke register; the vivid pane — kill the grey-on-grey; the picker rebuilt on a house register at proper scale with the families as the IA), the born-RED gate spec (proof:motion2 — source arms: the canon isomorphism census vs the keyframes exports, the stroke-width floor, the picker register; + the π readback arm in tests-visual), the scope fence (curve-gallery + curve-families + motion-band demo files ONLY; no library token mint for the purple; keyframes.js read-only), the capture plan (light+dark before/after), and the named successor for anything honestly out of scope. Return JSON.`,
  { label: 'r7:plan', phase: 'Plan', model: 'opus',
    schema: { type: 'object', additionalProperties: false, required: ['lane', 'specPath', 'gateName', 'summary'], properties: {
      lane: { type: 'string' }, specPath: { type: 'string' }, gateName: { type: 'string' }, summary: { type: 'string' } } } })

log(`plan: ${plan?.specPath} gate=${plan?.gateName}`)

phase('Redress')
const redress = await agent(`${COMMON}

=== LANE: REDRESS (execute the spec IN FULL) ===
The spec: ${plan?.specPath || GU + '/docs/tranches/AZ/waves/AZ.W-MOTION2.md'} (read it + the dossier it cites). Execute: rebuild the curve gallery to the spec — the 1:1 keyframes canon (every item from the dossier's inventory table, named + grouped as keyframes groups them), the THICK stroke register, the vivid/no-longer-muted pane, the picker rebuilt at proper scale on the house register. Write the gate script (born-RED discipline: it must FAIL against the pre-redress tree's logic — state in your record how it would have failed), wire the π readback spec under tests-visual/ if the spec demands one, and run: the gate + "npx vue-tsc --noEmit" + the relevant test battery. Capture the after-state on :5199 at BOTH modes (light+dark) ≥1280px wide into ${GU}/docs/tranches/AZ/audit/visual/ (literal -light.png/-dark.png names) and author the DELTA doc (W-MOTION2-DELTA.md beside the captures) citing them with the surface-paths/surface-hash headers (use surfaceHash from scripts/proof-live-verified-ledger.mjs's exported helper — read how the other DELTA docs in that dir do it and match exactly). ORCHESTRATOR-OWNED SHARED FILES — do NOT edit package.json / scripts/gates.mjs / docs/tranches/AZ/PROGRESS.md / MIGRATION.md yourself; instead report every needed delta in sharedFileDeltas (e.g. the proof:motion2 script registration line for package.json). Return JSON.`,
  { label: 'r7:redress', phase: 'Redress', model: 'opus',
    schema: { type: 'object', additionalProperties: false, required: ['lane', 'status', 'filesTouched', 'gates', 'capturedPngs', 'sharedFileDeltas', 'verification', 'summary'], properties: {
      lane: { type: 'string' }, status: { type: 'string', enum: ['COMPLETE', 'PARTIAL', 'BLOCKED'] },
      filesTouched: { type: 'array', items: { type: 'string' } },
      gates: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['name', 'scriptPath', 'result'], properties: {
        name: { type: 'string' }, scriptPath: { type: 'string' }, result: { type: 'string' } } } },
      capturedPngs: { type: 'array', items: { type: 'string' } },
      sharedFileDeltas: { type: 'array', items: { type: 'object', additionalProperties: false, required: ['file', 'delta'], properties: {
        file: { type: 'string' }, delta: { type: 'string' } } } },
      verification: { type: 'string', description: 'literal command results: gate, typecheck, tests' },
      summary: { type: 'string' } } } })

log(`redress: ${redress?.status} files=${redress?.filesTouched?.length} pngs=${redress?.capturedPngs?.length}`)
return { research, plan, redress }
