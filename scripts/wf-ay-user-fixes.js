export const meta = {
  name: 'ay-user-audit-fixes-band1',
  description: 'The glass-ui round of the USER LIVE AUDIT (docs/tranches/AY/audit/USER-AUDIT-2026-06-10.md §B — BINDING), band 1 of 2: the dock band + the slider final form + the quick re-verifies + the MOTION2 finish. 4 lanes on OPUS. The REBUILDS (blob/van-Gogh/configurator/fourier) are band 2. No git.',
  phases: [{ title: 'Fix', detail: '4 lanes: dock-band / slider-R3 / sb-reverify+type / motion2-finish' }],
}

const GU = '/Users/mkbabb/Programming/glass-ui'
const AUDIT = GU + '/docs/tranches/AY/audit/USER-AUDIT-2026-06-10.md'

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['lane', 'status', 'gatesGreen', 'typecheckGreen', 'itemsClosed', 'capturedPngs', 'sharedFileDeltas', 'summary', 'blocker'],
  properties: {
    lane: { type: 'string' },
    status: { type: 'string', enum: ['DONE', 'DONE_WITH_MISSES', 'PARTIAL', 'BLOCKED'] },
    gatesGreen: { type: 'boolean' },
    typecheckGreen: { type: 'boolean' },
    itemsClosed: { type: 'array', items: { type: 'string' } },
    capturedPngs: { type: 'array', items: { type: 'string' } },
    sharedFileDeltas: {
      type: 'object', additionalProperties: false,
      required: ['packageJsonScripts', 'gatesMjsRows', 'progressRow', 'visualAllowlistAdd'],
      properties: {
        packageJsonScripts: { type: 'array', items: { type: 'string' } },
        gatesMjsRows: { type: 'array', items: { type: 'string' } },
        progressRow: { type: 'string' },
        visualAllowlistAdd: { type: 'array', items: { type: 'string' } },
      },
    },
    summary: { type: 'string' },
    blocker: { type: ['string', 'null'] },
  },
}

const PRE = `You are a glass-ui BUILD agent at ${GU}, branch tranche/AY @ 6d27fc64 (Batch 3 closed; 22 live-verified rows; typecheck green). Demo at http://localhost:5199 (restart if down: npm run dev -- --port 5199; NEVER touch :5173). READ FIRST: ${AUDIT} (§B — the user's BINDING live audit; the user's judgment OVERRIDES gate-green). Your lane's items below. IMPLEMENT idiomatically (gestalt, no patches); CAPTURE own-surface DELTAs (real dims; literal filenames in the <WAVE>-DELTA.md); VERIFY (your gates + vue-tsc + the adjacent fleets). NO git. Do NOT edit package.json/gates.mjs/PROGRESS/VISUAL-ALLOWLIST — report in sharedFileDeltas. Clean /tmp.`

function ag(lane, scope) {
  return () => agent(`${PRE}\n\n=== YOUR LANE: ${lane} ===\n${scope}\n\nExecute now; return (lane="${lane}").`,
    { label: lane, phase: 'Fix', schema: SCHEMA, model: 'opus' })
}

phase('Fix')
const out = (await parallel([
  ag('W-DOCK-NAV-BAND', `Items B1/B2/B4/B5/B8/B9/B15 + B6/B7 (the WHOLE dock band — you own ALL dock files this fleet): (B15 FIRST, the root) the morph must expand/collapse from the CENTER, not the right — root-cause the anchor (the transform-origin / the width-animation anchoring in the morph CSS + dockMorphContext) and fix so the dock grows symmetrically about its center; ALSO the /dock/overview first-section shrunken-dock offset. (B4) the collapsed state EXACTLY circular (aspect 1:1 — the collapsed-floor tokens re-derived). (B1) EVERY demo dock composes the AX.W61 nav-pattern (home-left persistent control + DockSeparator dividers — the shell docks + the overview docks; the frontpage dock too). (B2) the SELECTED state re-tuned (the glass-first active tier — kill the heavy underline+dark fill the user condemned). (B5) the dock control families: proper hierarchy, dividing lines, icon affordances per the three condemned screenshots' surfaces (the overview tier sections). (B8) the two indistinguishable variants: differentiate-or-collapse + fix the misaligned selected bar. (B9) the persistent-controls polish: a divider before the right item; the forward arrow ADAPTIVE (hidden/absent when nothing more — never greyed-out dead chrome). (B6/B7) /dock/layers REBUILT: the rail element line RESTORED (read the value.js dock reference at /Users/mkbabb/Programming/value.js — find its dock/layer implementation + the prior glass-ui rail captures in docs/tranches/A*/audit/visual if present); the lag root-caused (profile the layer crossfade); the vertical-overflow story FIXED + re-gated. Gates: proof:dock-unify + proof:dock-region-model + proof:dock-perfection + the new arms your fixes warrant; capture the full dock DELTA series (morph center-out frames, the circle collapse, layers + rail, vertical overflow).`),
  ag('W-SLD1-R3', `Items B3 + B14 (the slider FINAL form — you are the ONLY Slider.vue writer): (B3) the standard slider: ONE continuous segment — NO VISIBLE THUMB AT ALL; you pull the TRACK itself (the filled segment's end IS the handle; the track is thick and rounded per the cylinder; the only affordance is the fill edge + the cursor/touch response). Restate the proof-slider-two-only shape clause AGAIN: assert NO distinct thumb paint (the thumb element exists for a11y/drag but paints INVISIBLE — width/opacity/fill merged into the track). Keyboard focus shows the focus ring on the TRACK (the W-PRIM-POLISH register). (B14) the spectrum variant: the thumb a bit THINNER, per the value.js color-picker reference (read /Users/mkbabb/Programming/value.js/demo/@/components/custom/color-picker/ — match its thumb proportions). Verify: proof:slider-two-only restated + green; the dock-with-slider drag still works (the keepDockOpen contract); proof:touch-target still green (the invisible thumb keeps its 44px coarse hit halo). Capture standard rest/drag/focus + spectrum, both modes, both viewports.`),
  ag('W-SB-REVERIFY', `Items B11/B13/B16/B17/B22 (the post-wave-2 re-verify + the type pass): (B16) /compositions/hero — verify the constellation NOW paints on the LIVE route (the :where() fix + staging landed at 6d27fc64); if anything still reads invisible, fix the residue. (B13) /substrates/glass-material — verify the staging gave it a real bright substrate; if the black background survives, stage it over a live aurora-behind-glass scene (the page's whole point). (B22) /foundations/intro — verify the aurora is now the ENTIRE background (no sub-container); fix the residue if boxed. (B11) the TYPE pass (W-SB-TYPE): the demo story chrome rides the proper ladder rungs — sweep the story pages for display-size body text + off-token sizes (the RA-typography 8 off-token headings + what you find); fix to the semantic classes; the user: "the text on all of these pages is WAY too large" — bias the story chrome DOWN to the documented ladder. (B17) /compositions/dashboard — fix the squished numbers (the metric-cell/stack layout) AND record the W-PRUNE candidacy honestly (do not delete — the prune wave decides). Capture each fixed page.`),
  ag('W-MOTION2-FINISH', `The W-MOTION2 owed remainder (the honest-partial row): MOVE 0 — bump the @mkbabb/keyframes.js devDependency ^2.2.0 → ^4.1.0 + npm install + verify the 3 constructed classes (SpringProgress/SmoothProgress/NumericAnimation) + every callable-timingFunction site survives (typecheck + the motion tests). THEN the full STATIC suite re-export through src/motion.ts (the 4.1.0 static barrel incl. Sequence/stagger/flip + loadAnimationEngine ITSELF; the 16 DYNAMIC engine members NOT statically flattened — the isolation boundary), MOTION_CURVES (the CSS↔JS curve table off the already-lifted springPresets.ts single-source + the value.js ease* enumeration), the curve-gallery demo story (every curve live: a dot + its plot, token name + JS name), the SUITE-COMPLETE two-tier parity manifest gate (STATIC asserted present / DYNAMIC asserted loader-reachable + NOT static; the version stamp) + CURVE-TABLE-BOUND (every --ease-*/--spring-* token has a JS twin). The value.js static-edge decided by profile:bundle BOTH WAYS (record the numbers; carve to a sibling subpath if heavy). Gates green; the gallery captured both modes.`),
])).filter(Boolean)
log(`glass-ui user-fixes band 1: ${out.length}/4`)
return out
