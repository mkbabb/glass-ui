export const meta = {
  name: 'ay-batch3-wave1',
  description: 'AY Batch-3 wave 1 (the build resumes per the standing directive): 4 file-disjoint lanes on OPUS — LANE-AURORA (W-AUR-STUDIO: the 5 dead selects + 2 RED gate re-skins + atoms-default seed-from-preset + the -5/3 arm + the sentinel), LANE-CON (the constellation fix cluster: zero-paint + freeze tautology + cool-tolerance honesty + the RG2/RG3 capture debts), LANE-PRIM (W-PRIM-POLISH + the W-SLD1 cylinder correction — Slider.vue single-writer), LANE-BLOB (W-BLOB-CONFIG: the paused-destroys-canvas + sign + stretch + seed feed + the library Configurator adoption). Shared files orchestrator-integrated; captures vs :5199; no git.',
  phases: [{ title: 'Build', detail: '4 disjoint lanes, opus' }],
}

const GU = '/Users/mkbabb/Programming/glass-ui'
const W = GU + '/docs/tranches/AY/waves'

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['wave', 'status', 'gatesGreen', 'typecheckGreen', 'deltaCaptured', 'capturedPngs', 'sharedFileDeltas', 'summary', 'blocker'],
  properties: {
    wave: { type: 'string' },
    status: { type: 'string', enum: ['DONE', 'DONE_WITH_MISSES', 'PARTIAL', 'BLOCKED'] },
    gatesGreen: { type: 'boolean' },
    typecheckGreen: { type: 'boolean' },
    deltaCaptured: { type: 'boolean' },
    capturedPngs: { type: 'array', items: { type: 'string' } },
    sharedFileDeltas: {
      type: 'object', additionalProperties: false,
      required: ['packageJsonScripts', 'gatesMjsRows', 'progressRow', 'visualAllowlistAdd'],
      properties: {
        packageJsonScripts: { type: 'array', items: { type: 'string' } },
        gatesMjsRows: { type: 'array', items: { type: 'string' } },
        progressRow: { type: 'string', description: 'the FULL replacement PROGRESS row (no pipes inside cells — use /)' },
        visualAllowlistAdd: { type: 'array', items: { type: 'string' } },
      },
    },
    summary: { type: 'string' },
    blocker: { type: ['string', 'null'] },
  },
}

const PRE = `You are a glass-ui AY BUILD agent at ${GU}, branch tranche/AY @ da930d0 (clean, typecheck GREEN). The glass-ui demo dev server runs at http://localhost:5199 (reuse for captures — do NOT kill it; if a Playwright config insists on :5173, pass GLASS_UI_DEMO_URL/PORT env to point at 5199 — :5173 belongs to a FOREIGN app).

EXECUTE your wave spec(s) to the HARD GATE. Procedure: (1) READ your spec(s) at ${W}/<wave>.md IN FULL (incl. every §0/§RE-GROUND block — re-grep every stale cite first; the specs were authored against audit evidence, cite-grounded). (2) IMPLEMENT idiomatically — no workarounds, gestalt; match the surrounding code's idiom. (3) CAPTURE the own-surface DELTA against :5199 — real PNGs ({light,dark} × ≥2 viewports; REAL 390-width for mobile claims — the ledger gate now expects honest dimensions) into ${GU}/docs/tranches/AY/audit/visual/ named <WAVE>-<what>-<viewport>-<scheme>.png + write <WAVE>-DELTA.md with the paired-π numbers. (4) VERIFY: your gate(s) run green via node scripts/proof-<x>.mjs; npx vue-tsc --noEmit exit 0; the adjacent component gate fleets still green.

ABSOLUTE RULES: NO git commands. Do NOT edit the 4 SHARED files (package.json / scripts/gates.mjs / docs/tranches/AY/PROGRESS.md / audit/visual/VISUAL-ALLOWLIST.json) — REPORT their deltas in sharedFileDeltas. Clean up /tmp scratch. Return the structured result (wave = your primary wave id; fold sibling-wave notes into summary).`

function ag(wave, scope) {
  return () => agent(`${PRE}\n\n=== YOUR LANE: ${wave} ===\n${scope}\n\nExecute now; return the structured result.`,
    { label: wave, phase: 'Build', schema: SCHEMA, model: 'opus' })
}

phase('Build')
const out = (await parallel([
  ag('W-AUR-STUDIO', `Execute ${W}/AY.W-AUR-STUDIO.md COMPLETE: (D1) wire v-model:is-open at the 5 dead-select sites (AuroraAtomsPanel.vue x4 + config/MediumLayer.vue x1 — the LabeledSelect controlled-open contract; the Texture atom becomes reachable); (D2/D3) re-skin the TWO RED gates (aurora-atoms-render.spec.ts + aurora-painterly-statistics.spec.ts — re-point the native-select/range selectors onto the LabeledSelect/LabeledSlider DOM; the committed status:fail artefacts must flip to pass); (D4) the atoms-default seed-from-preset disposition (mint configToAtoms per the spec; atoms become a true projection of the live preset); (D5) the -5/3 radii arm (mediums.glsl.ts sBig/sMed/sSml — BOUNDED: keep only if oil-pastel beta moves toward band without regressing van-Gogh/oil on the arresting gate; else record the ceiling); (D6) the T5 re-route cites (the four dead pointers -> W-AUR-T5); (D7) the served-app sentinel + the >=1280 capture clause + the margin disclosure. Gate: proof:aurora-studio (mint per spec) + the re-skinned gates GREEN + proof:aurora-arresting STILL green. Own files: the aurora demo panels + the 2 specs + their drivers + mediums.glsl.ts + the new gate.`),
  ag('W-CON-FIX', `The constellation fix cluster (specs: ${W}/AY.W-SB1.md §1.5.2 the zero-paint arm ONLY + ${W}/AY.W-CON2.md the §hc2 amendments + ${W}/AY.W-CON1.md §0 RG2/RG3): (1) the ZERO-PAINT SOURCE fix — Constellation.vue scoped .constellation{position:relative;block-size:100%} beats the consumer's .story-hero-bg absolute (host h=0 on compositions/hero) — make the positioning consumer-overridable idiomatically (the spec's chosen shape); verify compositions/hero PAINTS (π painted-pixel readback); (2) the freeze-gate tautology fix (~8 lines: stamp lastPaintedNow inside the demo drawAnomaly closure, expose + assert ===FROZEN_NOW + frame-stable in constellation-freeze-live.spec.ts — the overlay leg becomes real); (3) the cool-tolerance HONEST restatement: either re-tune the well release to meet the spec'd ±5% on desktop AND gate mobile cooling (a mobile-viewport arm in the egg-live spec — the 13.1% worst case must be IN the gate), or amend AY.W-CON2.md §6.2 to the measured band WITH the physics rationale written; never silent — pick by measurement; (4) RG2: RE-CAPTURE the four W-CON1 mobile PNGs at REAL 390-width (replace the 1280x721 fakes; the W-CON2 mobile protocol is proven — reuse it) + update W-CON1-DELTA.md honestly (strike the RG-noted qualifier from the PROGRESS row in your progressRow report); (5) RG3: the shear arm — add the portrait->landscape sx!=sy transpose case to constellation-refit-live.spec.ts + capture it. Own files: Constellation.vue + the demo constellation story + the 2 constellation specs + tokens.css IF the well re-tune needs it.`),
  ag('W-PRIM-POLISH', `Execute ${W}/AY.W-PRIM-POLISH.md COMPLETE + the W-SLD1 §RE-GROUND-2 cylinder correction (SERIAL within this lane — you are the ONLY Slider.vue writer): (1) the gold CTA light-hover (deepen the plate or hold warm-ink per the spec's pick; + the painted-pixel gate arm on proof:affordance-contrast); (2) buttons.vue:99 the lying hover specimen -> the real post-W54 glass hover; (3) split --overlay-scrim off --shadow-color (pinned to ink both modes — the dark modal dims again; clean break); (4) the dark destructive badge to >=4.5:1; (5) the slider focus halo to the button register; (6) the checks-band decision per the spec; THEN (7) the W-SLD1 §RE-GROUND-2 cylinder correction: the standard thumb from the detached floating knob to the CONTINUOUS ROUNDED CYLINDER (integrated into the thick track, ONE piece — the user's verbatim standard; the spectrum form already embodies the containment law — read its geometry) + the isCircle clause THIRD restatement (lock integrated-continuous: round-ended, track-height-matched, zero-detachment). Capture every changed surface light+dark; the slider gets the user-judged DELTA register. Gates: proof:affordance-contrast (extended) + proof:slider-two-only (restated) + the dialog/badge fleets. Own files: utilities.css/tokens.css (the scrim + gold) + badge + Slider.vue + slider index + buttons.vue demo + the gates.`),
  ag('W-BLOB-CONFIG', `Execute ${W}/AY.W-BLOB-CONFIG.md COMPLETE (the reality-audit render/config defects): (1) the SEVERE paused-resume canvas destruction (the WCAG 2.2.2 control strobes then leaves a charcoal slab — root-cause in the pause/resume seam of useWebGLCanvas/useMetaballRenderer; fix idiomatically, verify resume paints the live bead); (2) the pointerAttraction dropped sign (-1 must repel, not lunge toward); (3) the stretch no-op (wire or delete per the spec); (4) the dead hero seed/harmony->color feed (paletteStops non-reactive — make the demo feed live); (5) the hand-rolled config strip -> the library Configurator adoption per the spec (the blob demo joins the aurora's Configurator idiom). Capture the before/after for the paused fix (the strobe is the before) + the config surface light+dark. Gates: the proof:blob-* fleet STILL green + the spec's minted gate. Own files: Blob.vue/useBlobPointer.ts/useMetaballRenderer.ts (pause seam only — do NOT carve)/the blob demo story.`),
])).filter(Boolean)
log(`Batch-3 wave 1: ${out.length}/4 lanes returned`)
return out
