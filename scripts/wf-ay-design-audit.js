export const meta = {
  name: 'ay-dual-design-perf-audit',
  description: 'The user-directed combined audit fleet: the DUAL frontend-design audit on FABLE (design lanes inherit the session model — "your core fable intelligence when fanned out") over glass-ui primitives + storybook pages + the revamped til-briefing deck; PLUS the performance + Lighthouse lanes on OPUS (parsimony directive) over both surfaces; PLUS the rolling deferral-currency audit, the slider design re-ground (clarified standard: continuous rounded cylinder; spectrum per value.js), and a closing SPEC-AUTHOR lane that flows the perf findings into wave specs. Batches of 4. NO development — findings, captures, prototypes-as-throwaway, and wave-spec authoring only. No git.',
  phases: [
    { title: 'GlassUI', detail: 'design: primitives / storybook-pages / substrates-as-pages / deferral-currency (fable)' },
    { title: 'Slides', detail: 'design: deck-gestalt / per-slide / mobile+dark / slider-design-reground (fable)' },
    { title: 'Perf', detail: 'lighthouse-demo / lighthouse-slides / runtime-substrates / bundle (opus)' },
    { title: 'SpecAuthor', detail: 'flow the perf+lighthouse findings into wave specs (opus)' },
  ],
}

const GU = '/Users/mkbabb/Programming/glass-ui'
const SL = '/Users/mkbabb/Programming/slides'
const OUT = GU + '/docs/tranches/AY/audit/design'
const DEMO = 'http://localhost:5199'
const DECK = 'http://127.0.0.1:5273/til-briefing'

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['lane', 'verdict', 'fileWritten', 'capturedPngs', 'findings', 'specEdits', 'summary'],
  properties: {
    lane: { type: 'string' },
    verdict: { type: 'string', enum: ['EXCEPTIONAL', 'STRONG', 'COMPETENT-NOT-DISTINCTIVE', 'DESIGN-DEFECTS', 'BROKEN'] },
    fileWritten: { type: 'string' },
    capturedPngs: { type: 'array', items: { type: 'string' } },
    findings: { type: 'array', items: { type: 'string' } },
    specEdits: { type: 'array', items: { type: 'string' } },
    summary: { type: 'string' },
  },
}

// The frontend-design lens, baked in (the plugin's core principles):
const LENS = `THE DESIGN LENS (judge with it, calibrated — name the exceptional as readily as the defective):
- DISTINCTIVENESS: does the surface have a clear aesthetic point-of-view executed with precision, or generic component-library sameness ("AI slop": predictable layouts, cookie-cutter patterns, timid evenly-distributed palettes)?
- TYPOGRAPHY: characterful + hierarchical (the display/body/mono registers stepped and intentional) vs default-feeling.
- COLOR & THEME: committed cohesive aesthetic; dominant colors with sharp accents vs muddled mid-tones.
- MOTION: high-impact moments (orchestrated reveals, surprising hover states) vs scattered or absent micro-interactions; one motion language.
- SPATIAL COMPOSITION: intentional asymmetry/overlap/negative-space vs uniform grids of boxes.
- BACKGROUNDS & DEPTH: atmosphere (gradients, textures, layered transparencies, grain) vs flat solid fills.
- AFFORDANCE & HIERARCHY: can a first-time user tell what is interactive, what is primary, where the eye should go — at a glance?
- DELIGHT: easter eggs, micro-surprises, levity — present and discoverable, or absent?`

const PRE = `You are a FRONTEND-DESIGN auditor (the design-plugin lens below). Implementation is HALTED: read-only on all source; write ONLY your findings doc + captures (PNGs into your OUT dir). Drive the LIVE surfaces (playwright CLI screenshots + small /tmp interaction scripts — clean up after). Judge as a designer, not a gate: a surface can be gate-green and visually mediocre; say so with the capture that shows it. NO git.

${LENS}`

// design lanes: NO model override — they inherit the session model (fable), per the user's
// "core fable intelligence when fanned out" directive for the design audits.
function lane(name, phase, scope) {
  return () => agent(`${PRE}\n\n=== LANE: ${name} (${phase}) ===\n${scope}\n\nDrive, capture, judge; write ${OUT}/${name}.md; return (lane="${name}").`,
    { label: name, phase, schema: SCHEMA })
}

// perf/spec lanes: OPUS (the parsimony directive — mechanical measurement + spec authoring).
// PERF_PRE is defined below with the C lanes; resolved at call time.
function lane2(name, phase, scope) {
  return () => agent(`${PERF_PRE}\n\n=== LANE: ${name} (${phase}) ===\n${scope}\n\nMeasure/author; write ${OUT}/${name}.md (plus any named spec files); return (lane="${name}").`,
    { label: name, phase, schema: SCHEMA, model: 'opus' })
}

const A = [
  lane('FD-primitives', 'GlassUI', `THE CORE PRIMITIVES as designed objects. Demo: ${DEMO}. Drive the primitive routes (Button — all variants incl. the glass default + primary-audacious + gold-audacious; Card incl. cartoon surface; Dialog; Select; Tabs/SegmentedTabs; Input/forms; Switch/Checkbox/Radio; Slider both forms; Badge; Tooltip; Popover). For EACH: capture light+dark, judge by the lens — is THIS primitive distinctive-glass-ui or generic-shadcn-with-blur? Affordance check per interactive state (hover/active/focus visible + legible?). Name the 3 strongest + the 3 weakest primitives with the captures that prove it.`),
  lane('FD-storybook', 'GlassUI', `THE STORYBOOK PAGES as designed artifacts — the user's standard, verbatim: pages "should be contained in a glass-card, have the occasional usage of aurora, constellation, fourier-field, blob, etc, alongside divined easter eggs and the lack [thereof], with proper design hierarchy and affordance." Drive the demo SHELL (${DEMO}): the nav/sidebar/dock chrome, a representative page from each section (foundations/primitives/substrates/compositions/forms/dock/...). Per page: (1) is the story content contained in the glass-card chassis (ShowcaseFrame/StorySection) or raw? (2) does ANY page use a live substrate backdrop (aurora/constellation/ff/blob) — where, and where SHOULD one be (the occasional-usage standard — divine the befitting placements)? (3) easter eggs: hunt for them (konami? hover surprises? seasonal?) — what exists, what is MISSING that the substrate set implies? (4) hierarchy + affordance of each page. Produce the per-page disposition table + the divined easter-egg/backdrop placement list (this feeds W-SB1/W-COHERE).`),
  lane('FD-substrate-pages', 'GlassUI', `THE SUBSTRATE SHOWCASE PAGES as designed pages (not the substrate quality — the reality audit owns that): /substrates/aurora, /substrates/blob, /substrates/constellation, the fourier-field page. Judge the PAGE design around each hero: does the page STAGE its substrate (full-bleed hero, content floating in glass over it — the W60 model), or is the stunning thing boxed in a plain card on flat cream? Capture each page full-height light+dark. The gap list feeds W-SB1/W60-class work: per page, the staging move that would make it read like a product page, not a test harness.`),
  lane('FD-deferral-currency', 'GlassUI', `THE ROLLING DEFERRAL AUDIT (post-hc2 currency): read ${GU}/docs/tranches/AY/audit/hardening/hc2/*.md (all 13) + the USER-HINGE-REGISTER + USER-DECISIONS + the RG blocks in the wave specs. Produce the CURRENT owed-ledger: every item still owed at HEAD (the W-CON1 RG2 fakes — PAST-DUE; RG3 shear; the freeze tautology fix; the cool-tolerance regression; the W-DOCK2 RG1/RG2 captures; the W-GLASS 8 PNGs; the painterly-statistics selector fix; the T5 dead-pointer routing; the -5/3 respacing; the mechanism pieces R1/R3/R6/W-CARRY/slides-gate/ratchet; anything hc2 added) — each with: owner wave, class (A-G per the trends taxonomy), and whether it BLOCKS the publish (W-PUB1) or can trail. The output is THE BUILD QUEUE seed, ordered.`),
]

const B = [
  lane('FD-slides-gestalt', 'Slides', `THE DECK AS ONE DESIGNED ARC. Deck: ${DECK} (slides 1-9; the dev server). Read ${SL}/docs/tranches/L/audit/restructure/REFINEMENT-DECISIONS.md (the 18 binding decisions) + DECK-DESIGN-CONTRACT.md first. Walk the full deck light THEN dark; capture every slide both modes (18 captures). Judge the ARC by the lens: does it read as ONE designed object (the bookends, the red discipline, the type register, the glass idiom) at the POSTER register (decision 15 — "big animal pictures": one big idea per slide)? Which slides are already poster-grade, which are text-dense documents? The poster-pass work order, slide by slide, with the split recommendation (which examples become their own slides — the register decides the count, decision 18).`),
  lane('FD-slides-perslide', 'Slides', `PER-SLIDE DESIGN CRITIQUE (1-9) at ${DECK}: for each slide, against the lens + its storyboard draft (${SL}/docs/tranches/L/audit/restructure/s*.md) + its binding decisions: composition, type hierarchy, the focal-red discipline (ONE focal per slide?), spacing/negative space, the substrate usage (constellation bookends — do they read?), affordance of interactive bits (the xray iframe chrome). Name per slide: KEEP (what is right), CUT (what fights the poster register), MOVE (what belongs elsewhere). The S2 clip + recompose and the WOPR/console balance get explicit verdicts. Captures per finding.`),
  lane('FD-slides-mobile-dark', 'Slides', `MOBILE + DARK FIRST-CLASS (decision 17). Drive ${DECK} at 390x844 (portrait) + 844x390 (landscape-phone) + 768x1024, light AND dark — every slide. Capture the portrait set. Judge: does the portrait ladder hold (no clipped/squished/occluded content — the historic mobile failure class), does dark mode read as DESIGNED (not inverted-as-an-afterthought), do the substrates (constellation/maps/WOPR/iframe) survive small viewports? The per-slide mobile defect list feeds L.W-MOB.`),
  lane('FD-slider-design', 'Slides', `THE SLIDER DESIGN RE-GROUND (the user's CLARIFIED BINDING standard, verbatim): "our slider should be of two forms — a continuous rounded cylinder (thumb integrated into a thick track that appears as one continuous piece) and our spectrum slider, as seen in value.js". READ ${GU}/docs/tranches/AY/audit/USER-DECISIONS-2026-06-09.md (the addendum) + ${GU}/docs/tranches/AY/waves/AY.W-SLD1.md + the W-SLD1 DELTA + its 4 PNGs. VIEW the as-built live (${DEMO} forms/slider route) + the value.js spectrum REFERENCE (read /Users/mkbabb/Programming/value.js/demo/@/components/custom/color-picker/ColorPicker.vue + ConfigSliderPane.vue; if a value.js demo serves locally find it, else judge from source+the repo's assets). VERDICT: does the as-built W-SLD1 standard thumb read as the CONTINUOUS ROUNDED CYLINDER (one piece, integrated) or as a detached floating knob (over-shot)? Does the spectrum form match the value.js register? THEN EDIT ${GU}/docs/tranches/AY/waves/AY.W-SLD1.md: append a "§RE-GROUND 2 — the clarified standard" block recording the user's words as the binding geometry, the live verdict, the precise delta (if any) the build phase owes, and the isCircle-clause THIRD restatement (lock integrated-continuous geometry: round-ENDED, track-height-matched, zero-detachment — not a bare circle test). This is the ONE lane allowed a spec edit.`),
]

// ── Perf + Lighthouse lanes (OPUS — the parsimony directive; mechanical measurement) ──
const PERF_PRE = `You are a PERFORMANCE auditor. Implementation is HALTED: read-only on src/; you may BUILD (vite build / vite preview — build artefacts are not source edits), run lighthouse/CDP tracing, and write findings + measurement artefacts ONLY (into ${OUT}/). Prototyping is allowed as THROWAWAY under /tmp (never committed, cleaned up). Measure honestly — record the conditions (dev vs preview, throttling, machine) with every number. NO git.`

const C = [
  lane2('PERF-lighthouse-demo', 'Perf', `LIGHTHOUSE over the glass-ui demo. Prefer a PRODUCTION build: check for a demo build script (vite build of the demo app — inspect package.json/vite config; the library build is NOT the demo build); if a demo production preview is achievable, serve it on a FREE port (NOT 5173/5180/5199/5273/4178) and lighthouse THAT; else lighthouse the dev server at ${DEMO} and RECORD the dev-mode caveat (unminified, no compression — scores are a floor). Run \`npx lighthouse\` (headless chrome) BOTH desktop + mobile configs over: the demo home, /substrates/aurora (the heavy WebGL page), a primitives page, the dock page. Report per-page: performance/a11y/best-practices scores, LCP, CLS, TBT, the top opportunities. Save the JSON/HTML reports into ${OUT}/.`),
  lane2('PERF-lighthouse-slides', 'Perf', `LIGHTHOUSE over the til-briefing deck — the PRODUCTION build: in ${SL} run \`npm run build\` then \`npx vite preview --port 4990\` (free port; do NOT touch :4188/:5273) and lighthouse http://localhost:4990/til-briefing — desktop + mobile configs. Also one heavy-slide deep link (the xray iframe slide). Report scores + LCP/CLS/TBT + the font/image payload findings (the WOPR jpg 231KB, the map PNGs, the self-hosted fonts — flag any unpreloaded LCP-critical asset). Kill the preview server after. Save reports into ${OUT}/.`),
  lane2('PERF-runtime-substrates', 'Perf', `RUNTIME frame performance of the live substrates at ${DEMO}: for aurora (per medium: wispy default + van-Gogh + oil-pastel + oil), blob (rest + hover + click), constellation (rest + warp + well-hold), fourier-field (both presets), and the DOCK morph (expand/collapse): sample real frame times via a /tmp CDP-tracing or rAF-delta playwright script — ≥5s per state, report p50/p95/p99 frame ms + dropped-frame % at (a) full speed and (b) 4x CPU throttle. Compare against the 60fps budget (16.7ms) + the shipped frame-budget gate thresholds (find them — proof:blob-* frame arms etc.). Flag any state that blows budget THROTTLED (the mid-tier-device proxy — this is the W-BLOB-GLASS G-PERF baseline too: record the blob's CURRENT numbers as the pre-refraction baseline). Save the raw samples into ${OUT}/.`),
  lane2('PERF-bundle', 'Perf', `THE PAYLOAD STORY: run \`npm run profile:bundle\` + \`npm run profile:budget\` in ${GU} (read scripts first to understand outputs); report the per-subpath gzip table vs the published docs/tranches/K/audit/W4-subpath-sizes.md (regenerate + diff — name every subpath that GREW >10%); the dist CSS size; the slides bundle (${SL}/dist after its build — vendor/glass-ui/deck chunk sizes vs the L-READINESS numbers); the font payloads both repos. Verdict: any budget regression that should gate the 3.10.0 publish?`),
]

// ── The closing spec-author lane (OPUS) ──
const D2 = [
  lane2('SPEC-perf-author', 'SpecAuthor', `Read the four Perf lane findings (${OUT}/PERF-*.md) + ${GU}/docs/tranches/AY/waves/AY.W-A11Y-PERF.md (the existing perf-bearing wave). AUTHOR/AUGMENT the wave specs (doc-only, per the TRANCHE-AND-WAVE-SPEC precept at ${GU}/docs/precepts/instructions/TRANCHE-AND-WAVE-SPEC.md — evidence-backed HARD GATES, born-RED where the current state fails):
1. AUGMENT AY.W-A11Y-PERF with the measured runtime findings (the substrate frame numbers as the gate baselines; the rAF-coalesce + contain:paint arms get their MEASURED before-numbers).
2. AUTHOR ${GU}/docs/tranches/AY/waves/AY.W-LIGHTHOUSE.md IF the lighthouse findings warrant a dedicated wave (a proof:lighthouse gate class — score floors per surface, the LCP-asset preload fixes, measured against the PRODUCTION preview protocol the lanes establish); if the findings are thin, fold them into W-A11Y-PERF instead and say so.
3. Record the W-BLOB-GLASS G-PERF BASELINE numbers (the blob's pre-refraction frame profile) into ${GU}/docs/tranches/AY/waves/AY.W-BLOB-GLASS.md §2 so the condition is measured-against-known, not vibes.
4. Add the slides perf items (asset preloads, payload) to the L tranche notes: append a PERF section to ${SL}/docs/tranches/L/audit/L-READINESS.md.
Update ${GU}/docs/tranches/AY/PROGRESS.md ONLY if a new wave row is minted (append-only). Return the spec files touched.`),
]

phase('GlassUI')
const ra = (await parallel(A)).filter(Boolean)
log(`GlassUI design audit: ${ra.length}/4`)
phase('Slides')
const rb = (await parallel(B)).filter(Boolean)
log(`Slides design audit: ${rb.length}/4`)
phase('Perf')
const rc = (await parallel(C)).filter(Boolean)
log(`Perf audit: ${rc.length}/4`)
phase('SpecAuthor')
const rd = (await parallel(D2)).filter(Boolean)
log(`Spec author: ${rd.length}/1`)
return { glassui: ra, slides: rb, perf: rc, specAuthor: rd }
