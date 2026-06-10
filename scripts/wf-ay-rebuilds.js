export const meta = {
  name: 'ay-user-audit-rebuilds-band2',
  description: 'The user-audit band 2 — the FIRST-PRINCIPLES REBUILDS (USER-AUDIT §B B10/B18/B19/B20/B21/B12; the user judgment OVERRIDES gate-green): W-BLOB-REBUILD (the goo + satellites + the dead showcase + the pixelation, against the historical captures), W-AUR-VANGOGH-REBUILD (real stroke-atoms, not band-passing marble; the lag), W-AUR-CONFIG-REBUILD (the studio ground-up + the named preset tunings + the black-bar), W-FF3 (the fourier register vs the fourier-analysis reference). 4 lanes on OPUS, each undivided. No git.',
  phases: [{ title: 'Rebuild', detail: '4 first-principles lanes, opus' }],
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

const PRE = `You are a glass-ui FIRST-PRINCIPLES REBUILD agent at ${GU}, branch tranche/AY @ 0947c740 (26 live-verified rows; typecheck green). Demo at http://localhost:5199 (restart if down: npm run dev -- --port 5199; NEVER touch :5173). READ FIRST: ${AUDIT} §B (the user's BINDING words — their judgment OVERRIDES every green gate; your bar is what THEY described, verified by YOUR OWN EYES on the live render, not a metric proxy). Method: (1) study the references the audit names (historical captures under docs/tranches/A*/audit/visual/, the sibling repos); (2) root-cause the current state; (3) REBUILD from first principles — gestalt, no patches; (4) iterate against the LIVE render until it READS right (view your own captures — judge them as a designer); (5) keep/extend the existing gates honestly (re-tune a gate ONLY with the rationale written; never lower a bar to pass). CAPTURE the before/after DELTA series (real dims; literal filenames in the <WAVE>-DELTA.md). NO git. Do NOT edit package.json/gates.mjs/PROGRESS/VISUAL-ALLOWLIST — report in sharedFileDeltas. Clean /tmp.`

function ag(lane, scope) {
  return () => agent(`${PRE}\n\n=== YOUR LANE: ${lane} ===\n${scope}\n\nRebuild now; return (lane="${lane}").`,
    { label: lane, phase: 'Rebuild', schema: SCHEMA, model: 'opus' })
}

phase('Rebuild')
const out = (await parallel([
  ag('W-BLOB-REBUILD', `Items B10 + B18 — the user: "/substrates/blob seems LARGELY BROKEN — this was working several versions ago — noticeably inferior, PIXELATED, and has NO goo or satellite effect. Look to our previous screenshots from many tranches ago. Re-build from first principles." + the showcase paragraph "is totally broken and does not even render." + B18: the empty-states blob "is somewhat better than the other blobs? But the hover effect is whack, and the shading is imperfect — redesign from first principles, and properly integrate the goo and satellite effects we had before."\nMETHOD: (1) find the historical blob captures (docs/tranches/AX/audit/visual/W46/, W15/W16-era, the AY W-BLOB2 plates) — establish what GOOD looked like (the goo smin-merge, the orbiting satellites, the crisp render); (2) root-cause the THREE regressions on the live page: the PIXELATION (DPR/canvas-backing-size — measure the canvas backing vs CSS px), the MISSING goo/satellites (are satellites mounted? did a config default zero them? did the atom fold drop the orbit params?), the DEAD showcase section (the Configurator-chrome mount — W-BLOB-CONFIG adopted the Configurator; does the studio section render at all now? root-cause the mount failure); (3) REBUILD: the crisp DPR-correct render + the goo merge + the live satellites + the working studio, ONE blob identity across the hero and the empty-states mascot (B18's better-reading blob informs the shading; the hover lean must READ); (4) the full proof:blob-* fleet green honestly + proof:blob-config + a new satellites/goo arm if none exists. Before/after captures incl. a hover series + a satellite-merge series.`),
  ag('W-AUR-VANGOGH-REBUILD', `Item B20 — the user: "the van gogh version is AWFUL — super laggy and looks NOTHING like a van gogh brush stroke. Re-build from first principles, with the same procedural, generative, vangogh-like brush strokes that we had before. This was one of our best demos, and it's now totally broken and inferior." (Their judgment OVERRIDES the C/A/beta band-green — the bands measure statistics, not strokes; the reality lane confirmed the 'marbled flow-bands' read.)\nMETHOD: (1) find the BEFORE — the era the user calls one of our best (the AX-era aurora captures under docs/tranches/A*/audit/visual + the W18 aurora plates; the shipped RESEARCH.md T1-T8 stroke techniques — the tensor-driven anisotropic stroke atoms); (2) root-cause the marble: which shader path replaced/diluted the stroke atoms (mediums.glsl.ts/brush.glsl.ts — did the band-tuning iterations smear the dabs into flow-bands?); the LAG (the oils 'insanely laggy' — profile the per-medium frame cost on :5199; find the expensive branch); (3) REBUILD the van-Gogh medium from first principles: DIRECTIONAL ANISOTROPIC BRUSH DABS (discrete stroke atoms with width/length/orientation riding the tensor field, layered impasto depth, visible stroke boundaries — congruent with actual van Gogh skies, not subject matter), at 60fps (the perf lane's baseline; fix the oil lag in the same pass); (4) the arresting gate stays as the FLOOR (do not regress the bands) but the BINDING bar is the stroke read — capture closeup crops beside tests-visual/fixtures/starry-night-crop.png and JUDGE; iterate until the strokes read as strokes. Keep crayon/sky/dawn/speedtest byte-identical (the user's treasured set — W-AUR-CONFIG-REBUILD owns their tunings, NOT you; coordinate via disjoint shader branches).`),
  ag('W-AUR-CONFIG-REBUILD', `Items B21 + B19 — the user: "The configurator itself is god awful and needs to be re-built from first principles. Currently a janky mess, does not have the same controls and configurability that we had before. Totally re-designed with better design hierarchy, better control types, better layout, and the same configurability and controls we had before. Crayon (a bit too oily though?) and speedtest (should be a bit more cloud like and actually change with time); sky, dawn — these are our best. The oil ones are insanely laggy." + B19: "there's STILL this noticeable black bar on the top of the preview panes. Remove this."\nMETHOD: (1) inventory the FULL historical control surface (the pre-AY aurora studio — git log the demo aurora panels; the 82-slider Advanced surface + the Atoms door; what did 'the same configurability as before' have that today lacks?); (2) REBUILD the studio chrome ground-up on the library Configurator at its best: clear hierarchy (preset row → the atoms band → grouped advanced sections), befitting control types (selects/sliders/chips/color wells per parameter class), proper layout (no jank, no dead zones), EVERY historical control reachable; (3) B19: root-cause the black bar on the preview panes (the canvas aspect/letterbox vs the pane crop) and REMOVE it; (4) the named preset tunings: crayon LESS OILY, speedtest MORE CLOUD-LIKE + EVOLVING OVER TIME (a slow temporal drift), sky/dawn byte-preserved; (5) keep proof:aurora-studio + atoms-render + arresting green honestly (extend the studio gate to the rebuilt chrome). NOTE: W-AUR-VANGOGH-REBUILD owns the vangogh/oil SHADER paths — you own the STUDIO + presets + the preview panes; coordinate via disjoint files (you: the demo panels/configurator chrome + preset configs; them: the glsl). Before/after captures of the whole studio + each fixed pane.`),
  ag('W-FF3', `Item B12 — the user: "/substrates/fourier-field sucks and is far too faint — look to how fourier-analysis, our constellation project, renders and visualizes the curves. We should have a procedural variant thereof."\nMETHOD: (1) READ the fourier-analysis reference (/Users/mkbabb/Programming/fourier-analysis — its web render: the stroke weights, glow, contrast, the epicycle visualization register); (2) the current field's faintness is a KNOWN re-open (the W-FF2 §0 RG: the thin-arc + the 0.036-alpha light floor + the sub-perceptual recession) — rebuild the RENDER REGISTER to match the fourier-analysis reading: present stroke weight, the phosphor glow with real presence in BOTH modes (the light-mode floor fork), the comet body toward ~1/3 period; (3) 'a procedural variant thereof' — the field should read as the fourier-analysis renderer's procedural sibling (epicycles + trail with the same visual authority); (4) extend proof:fourier-field-visibility-live beyond the bbox proxy (the coverage-fraction/arc-length metric from the RG) so the gate binds the NEW register; capture both presets x both modes + the recessed StoryHero state (the RG4 debt). The /fourier-math seam + the intensity prop stay (mechanism settled; this is the REGISTER rebuild).`),
])).filter(Boolean)
log(`band 2 rebuilds: ${out.length}/4`)
return out
