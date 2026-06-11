// AZ Batch 6 — THE REFLECTION BAND (AZ.W-REFLECT, the user-edict completion bar).
// Nine surface lanes, AUDIT-ONLY (read + capture + verdict; ALL fixes route
// through the triumvirate — never inline). Two stages of 5+4 (the throttle lesson).
export const meta = {
  name: 'az-reflect',
  description: 'AZ.W-REFLECT: the per-surface reflection audit — recapitulate → re-verify live → the perfection question → verdict. Nine surfaces; PASS records gate the close; a FAIL names its misses for the triumvirate. Opus. READ-ONLY (+ captures + the reflection record).',
  phases: [
    { title: 'ReflectA', detail: 'dock ‖ blob ‖ glass+registers ‖ shell+IA ‖ motion' },
    { title: 'ReflectB', detail: 'aurora ‖ constellation ‖ fourier ‖ cross-repo' },
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

const PRE = `You are a REFLECTION AUDITOR in glass-ui at ${GU} (branch tranche/AY @ HEAD — the full AZ build is landed: Batches 0-5 + the R4/R5 corrective). THE PROTOCOL (AZ.W-REFLECT — read ${GU}/docs/tranches/AZ/waves/AZ.W-REFLECT.md FIRST): (1) RECAPITULATE every audit item (R1→R5 across docs/tranches/AZ/audit/USER-AUDIT-*.md + the AY USER-AUDIT) + every user decision + every wave that touched YOUR surface, tabulated with its discharging evidence; (2) RE-VERIFY LIVE on :5199 with FRESH captures at ≥2 viewports × both modes + π readbacks where numeric (restart the demo if down: npm run dev -- --port 5199 --strictPort; NEVER :5173; the user audits :5210 — leave it; the aurora park trick for long evaluates); (3) THE PERFECTION QUESTION — walk your surface as a FIRST-TIME AUDITOR: anything that would draw a "wtf" is a MISS even if every ledger row is green; (4) VERDICT. Write the record to ${GU}/docs/tranches/AZ/audit/reflect/<surface>.md (mkdir -p it) with the verdict, the recapitulation table, the capture list (literal filenames; store the PNGs beside the record), and the misses (severity-graded, evidence-anchored). AUDIT-ONLY: NO source/demo/script edits, NO git — a fix belongs to the triumvirate, never your lane. Your final text is data.`

function L(surface, phase, scope) {
  return () => agent(`${PRE}\n\n=== REFLECTION: ${surface} ===\n${scope}\nReturn (lane="${surface}").`,
    { label: `reflect:${surface}`, phase, schema: SCHEMA, model: 'opus' })
}

phase('ReflectA')
const a = (await parallel([
  L('dock', 'ReflectA', 'THE DOCK: the taxonomy (ONE orientation axis), the hairline switcher rail, the DockRail beyond-dock facility (the shell is the truth surface), collapse/expand/morph BOTH orientations, the tap integrity (real-input: touch + the morph race + the iOS one-tap), the flicker kill, the contextual layers (route-driven on both shell docks), the coarse register (the knob reaches geometry; ~61px pill; the 44px floor), normalization, the V↔H morph showcase (the VT default + the perf-gated teardrop preview), the iOS-glassy selected/hover/press register. Fine + coarse pointer, light + dark, the shell + the stories.'),
  L('blob', 'ReflectA', 'THE BLOB: /substrates/blob (hero-first IA, the crisp watercolor swatches, the satellites genuinely orbiting/necking/separating), the studio (stage presence, the circular menisci, the live geometry/satellite knobs, the two-rung gel shadow, the configurator hierarchy), the cream-bead identity, the uBackdrop CONDITIONS-UNMET disposition honestly recorded. The GL renderer was REFUTED-crisp — verify the refutation still holds visually.'),
  L('glass-registers', 'ReflectA', 'GLASS + THE REGISTERS: the glass-first default across the demo, the adaptive auto-darken (the self-engage + the default-ON luminance observer — walk dock-over-light + content-glass-over-light cases live with contrast readbacks), the veil Card surface, the de-red iOS register (NO brand-red on any interactive state anywhere; red only as wordmark/viz/CTA ink), the squircle family, AA legibility everywhere you walk.'),
  L('shell-ia', 'ReflectA', 'THE SHELL + DEMO IA: the gear=PresetEditor flow end-to-end (dark-at-TOP, glassy rows, live-apply), the ℱ Foundations identity (divider, size, optical centering), the contextual facets reading sensibly per section, the R4-2 noise bar (walk EVERY demo category as a first-timer — anything "wtf" is a miss), the hierarchy rung + the suffusion outcomes (the display heroes, the one-color-events, the restraint).'),
  L('motion', 'ReflectA', 'MOTION: /motion in totality — the FULL curve canon (count the families: the value.js eases + the keyframes curves + steps + the editable bezier), the spring playground on SPRING_PRESETS (zero forks), the scroll/VT facilities live, the ppmycota purple as the band accent, the §6 easing doctrine cohesion (sample hover/press/enter/exit registers across components), the morph-showcase motion quality.'),
])).filter(Boolean)
log('reflect A: ' + a.length + '/5 — ' + a.map(r => r.lane + ':' + r.verdict).join(' '))

phase('ReflectB')
const b = (await parallel([
  L('aurora', 'ReflectB', 'AURORA: the painterly bands live on the GPU (van-Gogh crescent-comma dabs — directional, not marble; oil + oil-pastel distinct), the studio on the library Configurator (selects open, atoms seed from presets, the hierarchy vocabulary applied), the hero presets across the demo, the black-bar absence, performance (no jank on the hero pages).'),
  L('constellation', 'ReflectB', 'CONSTELLATION: warp-on-click, ?freeze determinism, the refit, the W-CON-GEN additions live (the pinned anomaly + accent edges + the settled badge on the demo), the recession/focal registers, the protected slides quintet intact (grep the exports), the hero composition with the dock floating over it.'),
  L('fourier-motion-field', 'ReflectB', 'FOURIER FIELD: the comet register both modes (full-frame traverse, no corner stub; legible on cream AND ink), the intensity envelope knob, the demo staging, the ℱ brand tie-in (the shell wordmark ↔ the field), performance.'),
  L('cross-repo', 'ReflectB', 'CROSS-REPO (read-only in siblings): the slides production state (their pins, the interim arms awaiting the 3.13.0 retire), the keyframes consumer (header-ribbon/glass-panel now restored locally — verify the local build serves what keyframes imports), the fourier-analysis re-points landed, the bbnf alias gone, the protected contracts intact at HEAD, the lineage map accuracy (3.10.1 mine → 3.11.x/3.12.0 stale-lineage → 3.13.0 staged), proof:resolution + the consumer gates green. The W-ADOPT/W-DEPLOY readiness checklist as the final section of the record.'),
])).filter(Boolean)
log('reflect B: ' + b.length + '/4 — ' + b.map(r => r.lane + ':' + r.verdict).join(' '))
return { a, b }
