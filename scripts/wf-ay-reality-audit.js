export const meta = {
  name: 'ay-reality-audit',
  description: 'The user-directed REALITY audit: "truly audit each implementation" — open the LIVE demo and judge the thing itself against the claim (not gate-green, not spec-said-so). 8 lanes, batches of 4: aurora configurator robustness; aurora painterly truly-SOTA; flow fields; blob configurator + hover; glass-as-DEFAULT coverage; typography; dock animations; the animation suite. Live inspection + capture + honest judgment. Read-only on source; findings + captures only. No git.',
  phases: [
    { title: 'RealityA', detail: 'aurora-config / aurora-painterly / flow-fields / blob' },
    { title: 'RealityB', detail: 'glass-default / typography / dock-anim / anim-suite' },
  ],
}

const GU = '/Users/mkbabb/Programming/glass-ui'
const OUT = GU + '/docs/tranches/AY/audit/reality'
const DEMO = 'http://localhost:5199'

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['lane', 'verdict', 'fileWritten', 'capturedPngs', 'findings', 'summary'],
  properties: {
    lane: { type: 'string' },
    verdict: { type: 'string', enum: ['TRULY-SOTA', 'GOOD-NOT-SOTA', 'CLAIM-OVERSTATED', 'BROKEN', 'MIXED'] },
    fileWritten: { type: 'string' },
    capturedPngs: { type: 'array', items: { type: 'string' } },
    findings: { type: 'array', items: { type: 'string' }, description: 'honest per-claim judgments, each grounded in a capture or a live interaction result' },
    summary: { type: 'string' },
  },
}

const PRE = `You are a REALITY auditor for glass-ui. The user's bar: "truly audit each implementation" — does the thing ACTUALLY do what the docs/specs/PROGRESS claim, and is it TRULY SOTA, judged by LOOKING at and DRIVING the live artifact? The glass-ui demo is LIVE at ${DEMO} (the "glass-ui Feature Demo"). Implementation is HALTED: read-only on all source; you write ONLY your findings doc (${OUT}/<lane>.md, dir nests) + capture PNGs into ${OUT}/ (name them <lane>-<what>.png).

METHOD: drive the live demo — navigate routes, interact (click presets, drag sliders, hover, toggle dark mode via the demo's toggle or emulation), and CAPTURE what you see (npx playwright screenshot for statics; author SMALL throwaway playwright scripts under /tmp for interactions — clean them up after; the tests-visual workspace + its installed chromium are available, reuse its patterns). Judge each claim HONESTLY: a thing can be gate-green and still mediocre; say so. Where a claim is overstated, cite the capture that shows it. Where it is genuinely excellent, say that too — calibrated, not reflexively harsh. NO git. NO source edits. Return the structured result.`

function lane(name, phase, scope) {
  return () => agent(`${PRE}\n\n=== LANE: ${name} (${phase}) ===\n${scope}\n\nDrive it, capture it, judge it; write ${OUT}/${name}.md; return (lane="${name}").`,
    { label: name, phase, schema: SCHEMA })
}

const A = [
  lane('RA-aurora-config', 'RealityA', `DOES THE AURORA ACTUALLY HAVE A ROBUST CONFIGURATOR? Find the aurora route(s) (/substrates/aurora + any configurator/studio route in the demo manifest). Drive EVERY control: the preset switcher (all 12 presets — do they all visibly change the field?), each atom slider/knob (does each BITE live — a visible delta per control?), the derive-color path, per-preset clone persistence (edit a slider, switch preset, switch back — does the edit survive per the cloneMode contract?). Capture before/after per control class. Verdict on ROBUSTNESS: complete coverage of the atoms? responsive? any dead controls, NaN states, jank?`),
  lane('RA-aurora-painterly', 'RealityA', `DOES THE AURORA ACTUALLY RENDER OIL + VAN-GOGH BRUSH STROKES — GENERATIVE, PROCEDURAL, TRULY SOTA? Drive the medium switcher live: van-Gogh, oil-pastel, oil. Let each settle; capture light+dark per medium at full size. Judge against the bar the user set: "atomic brush strokes with depth, variation, congruence to actual van Gogh works"; "oil pastel resembling oil pastel works of art, painterly, non-uniform"; "stunningly beautiful, arresting, gradient works of art." Compare mentally against the starry-night reference (tests-visual/fixtures/starry-night-crop.png — view it side by side). The W-AUR-PAINTERLY DELTA claims van-Gogh lands all 3 numeric bands — but do the STROKES read as strokes (directional, anisotropic, layered), or as band-passing noise? Is the motion painterly or swimmy? HONEST verdict per medium.`),
  lane('RA-flow-fields', 'RealityA', `WHAT OF THE FLOW FIELDS? Inventory every flow-field-like substrate in the library + demo: the aurora's tensor/flow field (proof:aurora-tensor-field exists — what does it drive visually?), the fourier-field (/substrates/fourier-field or per the manifest — drive both presets, judge the comet/epicycles live in both modes), the constellation drift field. For each: does the field READ as a coherent flow (directionality, continuity), or as noise? Is there a MISSING flow-field primitive the set implies (e.g. a standalone flow-field background a consumer could use)? Capture each. Verdict on the flow-field STORY as a set.`),
  lane('RA-blob', 'RealityA', `DOES THE BLOB ACTUALLY HAVE A ROBUST CONFIGURATOR + HOVER EFFECTS THAT READ? Drive /substrates/blob: the mood/seed/harmony UI (does each control bite live?), the cream default at rest, the HOVER response (move the pointer across the bead slowly + flick — does the lean READ to a human eye, or is it sub-perceptual? capture a frame series with the pointer position visible), the CLICK bounce (does it read as a squish/bounce?), the satellites/merge behaviour. Judge: is the interaction ALIVE (the "creature notices you" claim) or inert-unless-measured? Configurator robustness verdict + interaction verdict.`),
]

const B = [
  lane('RA-glass-default', 'RealityB', `IS GLASS ACTUALLY THE DEFAULT FOR ALL COMPONENTS? The W54 canon: a bare <Button> paints GLASS; glass is the default register for EVERY band; the opaque escape is explicit; the allowlist (avatar/label/separator/skeleton/table/badge-loud) is the only legit opacity. Drive the component routes (buttons, cards, dialogs, selects, tabs, inputs via /forms, menus, tooltips, popovers...): for each, does the DEFAULT render visibly read as GLASS (translucency + blur over a backdrop — put it over a busy background where the demo allows)? Capture a contact-sheet sweep. Flag every component whose default is opaque OFF-allowlist, and every glass surface that reads FLAT (no perceptible glass because nothing behind it — the W60 backdrop question). Verdict on the glass-default TRUTH vs the canon.`),
  lane('RA-typography', 'RealityB', `WHAT OF THE TYPOGRAPHY? The claimed system: golden-ratio scale (sqrt-phi), semantic classes, the font registers (which fonts ACTUALLY load — check the network/computed styles: the display serif, body, mono). Drive the typography/foundations routes + sample real component text across the demo. Judge: does the hierarchy READ (display vs body vs caption clearly stepped)? Are the fonts the intended ones (no fallback-font flashes/wrong faces)? Is the scale coherent across components or do off-scale sizes leak? Light+dark legibility. Capture the type ladder + in-situ samples. Verdict.`),
  lane('RA-dock-anim', 'RealityB', `WHAT OF THE DOCK ANIMATIONS? The user's historic bar: "springy, iOS-like; the items fade/morph in lockstep with the shell." Drive /dock/overview + the dock-with-slider composition: expand/collapse repeatedly (capture a frame series via a /tmp playwright script with CDP screencast or rapid screenshots), layer switching (the crossfade + size FLIP), the rail, hover registers (bg/scale/specular on hover), the held state. Judge LIVE: does the morph read springy-iOS (one coherent glide, no desync, no jank)? Do entering children track the shell? Any visible stutter/pop? HONEST verdict vs the W-DOCK1 'lag captured-ABSENT' verdict — does the human eye agree with the instrument?`),
  lane('RA-anim-suite', 'RealityB', `WHAT OF THE ANIMATION SUITE? Drive the motion across the demo: dialog enter/exit, popover/dropdown, sheet/drawer, the tabs elastic indicator (drive segments fast + slow — does the squish read?), toasts, reveals/staggers on route enter, the skeleton shimmer, transitions between routes. Judge against the §6 doctrine LIVE: enters lively (bouncy/snappy), exits clean (NO overshoot), surface fades on bezier, one coherent register across components — or do different components speak different motion dialects? Any animation that fires on mount when it should be idle-quiet? Capture the standouts both ways. Verdict on the SUITE as one language.`),
]

phase('RealityA')
const ra = (await parallel(A)).filter(Boolean)
log(`RealityA: ${ra.length}/4`)
phase('RealityB')
const rb = (await parallel(B)).filter(Boolean)
log(`RealityB: ${rb.length}/4`)
return { realityA: ra, realityB: rb }
