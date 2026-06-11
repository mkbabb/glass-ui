// AZ — RE-REFLECT band, stage A (dock + glass-registers). Fresh full reflections
// REWRITING each record (the prior FAIL + its discharge addendum live in git
// history); proof:az-reflect reads the operative verdict. 2 parallel lanes
// (the blob-redress lane runs concurrently — 3 total holds under the throttle).
export const meta = {
  name: 'az-rereflect-a',
  description: 'Re-reflect stage A: dock + glass-registers — fresh full reflection records post-redress (the clause-10 re-stamp).',
  phases: [{ title: 'ReReflectA', detail: 'dock ‖ glass-registers' }],
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

const PRE = `You are a RE-REFLECTION AUDITOR in glass-ui at ${GU} (branch tranche/AY @ HEAD). This is the SECOND reflection pass on your surface: the first pass (in git history of your record file) returned FAIL, its misses were REDRESSED, and you now judge AFRESH. THE PROTOCOL (AZ.W-REFLECT — read ${GU}/docs/tranches/AZ/waves/AZ.W-REFLECT.md FIRST): (1) RECAPITULATE every audit item (R1→R7 across docs/tranches/AZ/audit/USER-AUDIT-*.md) + the FIRST-pass record's misses + their redress commits, tabulated; (2) RE-VERIFY LIVE on :5199 with FRESH captures at >=2 viewports x both modes + pi readbacks where numeric (restart if down: npm run dev -- --port 5199 --strictPort; NEVER :5173; leave :5210); (3) THE PERFECTION QUESTION as a first-time auditor — a "wtf" is a MISS even if every ledger row is green; (4) VERDICT. REWRITE the record at ${GU}/docs/tranches/AZ/audit/reflect/<surface>.md IN FULL (a fresh record — the prior one is git history; head it "RE-REFLECTION (pass 2)" with the date) with the verdict, the recapitulation incl. the pass-1 misses x redress evidence, the LITERAL capture filenames (store PNGs beside the record), and any NEW misses. AUDIT-ONLY: NO source/demo/script edits, NO git. Your final text is data.`

phase('ReReflectA')
const out = (await parallel([
  () => agent(`${PRE}

=== RE-REFLECTION: dock ===
Pass-1 FAIL: D1 — the beyond-dock hairline sub-perceptible (alpha 0.04-0.06), the end-icon a detached orphan. THE REDRESS SINCE: AZ.W-RAIL3 landed (commit 83ea0ef9) — the contextual facets MOVED OUT of both shell docks onto the <DockRail> floating-carousel chip strip OUTSIDE the dock box (box INVIOLATE, pi deltaW=deltaH=0), the connective hairline made VISIBLE (box-shadow: var(--border-hairline) + a faint divider bg), the strip re-seated to the dock MIDLINE (the H1-occlusion fix), the dead entries prop clean-broken onto items. JUDGE AFRESH the full dock surface: the rail strip on BOTH shell docks (is the hairline now PERCEPTIBLE? walk it with a pixel-strip readback like pass 1 did), the tight dock pill (both orientations), the taxonomy, tap integrity, flicker, coarse register, the iOS register, adaptive darken, the morph showcase, the in-dock /dock/layers switcher rail (unregressed?), and the floating-chip overlap design (mid-body overlap is the accepted floating paradigm; the H1/title band must be CLEAR). Fine + coarse pointer, light + dark, the shell + the stories. Return (lane="dock").`,
    { label: 'rereflect:dock', phase: 'ReReflectA', schema: SCHEMA, model: 'opus' }),
  () => agent(`${PRE}

=== RE-REFLECTION: glass-registers ===
Pass-1 FAIL: G1/G2/G3 — three stale gates (proof:glass-cohesion CI-red on a relocated read-path regex; proof:glass-material-unified on the literal-mount string; proof:glass-material-sota on the deprecated squircle keyword). THE REDRESS SINCE: all three gates re-pointed (commit 3300949f) — re-run them yourself and confirm GREEN at HEAD. JUDGE AFRESH the full glass+registers surface: the glass-first default, the adaptive auto-darken (self-engage + the default-ON luminance observer — walk dock-over-light + content-glass-over-light live with contrast readbacks), the veil Card surface, the de-red iOS register (NO brand-red on any interactive state), the squircle family, AA legibility everywhere you walk, and the FULL register gate roster re-run (adaptive-glass, adaptive-observer, adaptive-glass-live, register-ios, card-veil, glass-level, glass-cohesion, glass-material-unified, glass-material-sota). Return (lane="glass-registers").`,
    { label: 'rereflect:glass-registers', phase: 'ReReflectA', schema: SCHEMA, model: 'opus' }),
])).filter(Boolean)
log('re-reflect A: ' + out.map(r => r.lane + ':' + r.verdict).join(' '))
return out
