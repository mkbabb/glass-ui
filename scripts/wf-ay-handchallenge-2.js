export const meta = {
  name: 'ay-handchallenge-verification-fleet',
  description: 'The 32-agent-class hand-challenge RE-SCOPED per NECESSITY-MATRIX §5: an execution/verification fleet, not a research fleet. 16 lanes in 4 batches of 4: as-built re-grounds (B2-style) over every finisher-landed wave; the cardinal lane DEEPENED (IHDR dimensions, demonstrative frames, real-surface GREEN); the mechanism-execution binary audit; spec-hardening edits (W-LIQUID/W-UNDERLINE/W-MOTION2/W-DOC1); the ONE validated research arm (Siri reference-capture); the user-hinge register; the L deck graded against the 17 decisions. NO source implementation (findings + wave-spec edits only). No git.',
  phases: [
    { title: 'Reground', detail: 'B2-style as-built re-grounds over the finisher-landed waves' },
    { title: 'Verify', detail: 'cardinal-deep + mechanisms + glass + a11y witnesses' },
    { title: 'SpecHarden', detail: 'W-LIQUID/W-UNDERLINE/W-MOTION2/W-DOC1 spec edits' },
    { title: 'CloseOut', detail: 'the research arm + GOD1 re-grade + user-hinge + the L deck' },
  ],
}

const GU = '/Users/mkbabb/Programming/glass-ui'
const SL = '/Users/mkbabb/Programming/slides'
const OUT = GU + '/docs/tranches/AY/audit/hardening/hc2'
const NX = GU + '/docs/tranches/AY/audit/research-necessity'
const W = GU + '/docs/tranches/AY/waves'

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['lane', 'verdict', 'fileWritten', 'findings', 'specEdits', 'summary'],
  properties: {
    lane: { type: 'string' },
    verdict: { type: 'string', enum: ['CLEAN', 'GAPS-FOUND', 'MECHANISMS-UNBUILT', 'SPEC-HARDENED', 'RESEARCH-FILLED', 'BLOCKED'] },
    fileWritten: { type: 'string' },
    findings: { type: 'array', items: { type: 'string' }, description: 'defects/gaps, file:line-grounded' },
    specEdits: { type: 'array', items: { type: 'string' }, description: 'wave-spec files EDITED (spec-hardening lanes only; empty otherwise)' },
    summary: { type: 'string' },
  },
}

const PRE = `You are a hand-challenge lane for glass-ui at ${GU} (branch tranche/AY, Batch-2 COMPLETE at HEAD 8ddddce+). The NECESSITY-MATRIX (${NX}/NECESSITY-MATRIX.md — READ IT first, plus your lane's named inputs) re-scoped this fleet: VERIFICATION + MECHANISM-EXECUTION + SPEC-HARDENING, not research. Implementation is HALTED: you may NOT edit src/ source, styles, tests, or scripts (findings docs + WAVE-SPEC docs only — spec-hardening lanes EDIT their named ${W}/*.md; every other lane writes findings ONLY to ${OUT}/<lane>.md, dir nests). NO git commands. Be ruthless + specific (file:line). Return the structured result.`

function lane(name, phase, scope) {
  return () => agent(`${PRE}\n\n=== LANE: ${name} (phase ${phase}) ===\n${scope}\n\nWrite ${OUT}/${name}.md (or edit your named specs) and return (lane="${name}").`,
    { label: name, phase, schema: SCHEMA })
}

// ── Batch A — as-built re-grounds (B2-style; Class-G defense) ──
const A = [
  lane('HC-con', 'Reground', `Re-ground W-CON2 + W-CON3 AS-BUILT (landed at 8ddddce): read the specs + the DELTAs + the source; is each genuinely perfected vs gate-passing? Check: the asymmetric WELL_RELEASE_RAMP fix (a magic 22/s — tokenised or hand-set?); the wander token prop-over-token layering; the freeze hash protocol (does it cover the overlay phase REALLY?); the W-CON1 RG2 (mobile re-capture) + RG3 (shear arm) debts — STILL owed? constellation verify-only per the matrix (SETTLED — do not re-litigate).`),
  lane('HC-aurora', 'Reground', `Re-ground W-AUR-PAINTERLY's close: the DELTA claims DONE_WITH_MISSES — verify the 18 registered PNGs are demonstrative (view them: does van-Gogh READ as van Gogh, or band-passing?); the proof:aurora-arresting gate hard-asserts the achieved bars (run it); the T5 successor routing is recorded; the -5/3 respacing residue (mediums.glsl.ts sBig/sMed) — landed or owed? + the aurora README-stale ledger (matrix §2 W-DOC1 rows) confirmed current.`),
  lane('HC-sld-dock', 'Reground', `Re-ground W-SLD1/W-SLD2/W-DOCK3 AS-BUILT: the rounded-knob resolution (view the 4 SLD1 PNGs — does the knob READ as the iOS knob the user asked for, fully-rounded + continuous?); the inverted isCircle clause + the 5-clause gate (run proof:slider-two-only); the dock-with-slider drag DELTA (view the 8 PNGs — does data-held SHOW?); the Slider.vue:242 stale 'scaleX squish' comment (flag, do not edit); W-DOCK2's RG1/RG2 captures STILL owed (the matrix marks them BLOCKING).`),
  lane('HC-blob', 'Reground', `Re-ground W-BLOB3 AS-BUILT + the W-BLOB2 RG debts: the DI strip (run proof:blob3-strip); the 14 interaction PNGs — VIEW the 5 hover frames: is the lean READABLE this time (the B2-blob F2 failure mode), or another static series? The orchestrator-authored W-BLOB3-DELTA.md — accurate? RG2/RG3/RG4/RG6 (mood re-captures, stale comments, gel-bar) — still owed, correctly routed (W-BLOB2 RG / W-COHERE)?`),
]

// ── Batch B — the deepened verification lanes ──
const B = [
  lane('HC-cardinal', 'Verify', `THE DEEPENED CARDINAL LANE (matrix §4 Class A/E + the trends rubric): inventory EVERY PNG under docs/tranches/AY/audit/visual/ — (1) IHDR-decode each claimed-mobile PNG and compare the actual pixel dimensions against the filename claim (the W-CON1 fabricated-mobile vector — find EVERY instance, not just the known one); (2) for each motion/frame series, are the frames DEMONSTRATIVE (visually distinct in the claimed way — view spot samples); (3) for each live gate, does a PERSISTED GREEN artefact exist in .cache/gates/ against the REAL surface (the B2-dock F2 gap — synthetic-only GREENs listed); (4) grade each live-verified PROGRESS row A-G per the trends rubric. Findings only.`),
  lane('HC-mechanisms', 'Verify', `THE MECHANISM-EXECUTION BINARY AUDIT (matrix §4 — 'did the stopping mechanisms land', not 'what defers'): for each — W-CARRY register (manifest JSON + completeness clause)? the slides cardinal-gate port (slides/scripts/)? proof-no-bespoke-constellation.mjs (spec copy-in-ready at AY.W-CON3.md §5)? the W-GOD1 ratchet (per-violator baselines, RED-on-growth)? R1 IHDR assert in proof-live-verified-ledger.mjs? R3 user-hinge register disposition? R6 GREEN-on-real-surface clause? — answer BUILT/UNBUILT with the exact landing site each needs. This is the §5 'freed capacity' target list.`),
  lane('HC-glass', 'Verify', `W-GLASS capture-arm check (matrix: its DELTA's 'live-verified' OVERSTATES — the 8 referenced PNGs do not exist): verify the claim, enumerate exactly which captures are owed (the Drawer/Slider/Notification flatten at level:0, the specular opt-in), and whether proof:glass-cohesion runs green at HEAD; + the C6 per-rung AA calibration + C7 a11y cascade-guard findings (matrix §2 W-GLASS rows) confirmed against HEAD source. Findings only.`),
  lane('HC-a11y', 'Verify', `W-A11Y-PERF born-RED witness verification (matrix §5): re-measure the witnesses the glass lane cited — the webkit prefix parity (the dist CSS carries -webkit-backdrop-filter where?), the dormant W55 bucket (is --glass-backdrop: light engaged ANYWHERE by default?), the specular rAF thrash (useSpecularTracking.ts — coalesced or per-event?). Confirm O-1..O-5 are still accurate-and-owed against HEAD. Findings only.`),
]

// ── Batch C — spec-hardening (EDIT the named wave specs; doc-only) ──
const C = [
  lane('HC-liquid-spec', 'SpecHarden', `EDIT ${W}/AY.W-LIQUID.md per the matrix §2 W-LIQUID block: compile the pre-answered parameter scaffold INTO the spec (tanh-saturated stretch per metaball.frag.ts:198-215; velocity-driven release vs the 60ms timer at useTabIndicator.ts:143,186-194; the DOM flex band seeded from the blob's live-ratified lean pointerStrength 0.18; --liquid-max-stretch 1.08 / 1.06-1.10 cascade-read; PRM copy-down; press pointer-only); RESOLVE the three-name substrate collision (useLiquidFlex vs the un-landed AX.W42 useLiquidMorph vs W53's useSquish — ONE name, record the fold); add the tabs gate-coupling clause (proof-tabs-unified.mjs:171-190 re-statement-or-adapter in file-bounds) + the 1-D degenerate + multi-select exemptions; append the RESEARCH-ARM section stating the THREE named blanks (Siri bands / drive model / WWDC26 delta + the contrast-color rider) the HC-liquid-research lane fills. Also fix the dock-liquidglass-README.md:3 shipped-voice hazard IF it is a docs file (one line).`),
  lane('HC-underline-spec', 'SpecHarden', `EDIT ${W}/AY.W-UNDERLINE.md per the matrix §2 W-UNDERLINE block (the 10 build refinements): consumer count x2 not x3 (SlideSovereignty bare by design); the third-clock decision (active prop vs play()-on-slide-activation — pick one, record why); tokenize the stroke metrics (--gu-stroke-width/-ink-height/-ink-offset); the dark arm via token re-resolution (NCSU lift becomes a consumer prop); animation-timeline: var(--gu-timeline, view()); the easeOutCubic doctrine note; the paths escape carries the full geometry tuple; RECONCILE /underline vs the sci-report handmark /handmark packaging plan BEFORE the subpath mints (read ${NX}/underline.md for the sota-libs answer + the handmark fold); the PRM seam decision (one-shot read vs extract usePrefersReducedMotion); the dasharray tail decision.`),
  lane('HC-motion2-spec', 'SpecHarden', `EDIT ${W}/AY.W-MOTION2.md per the matrix §2 R1-R7: R1 the keyframes.js 4.1.0 dev-pin bump as MOVE 0 (the pinned 2.2.0 lacks Sequence/stagger/flip/drag/decay — SUITE-COMPLETE is unsatisfiable as written); R2 split the parity manifest STATIC vs loadAnimationEngine() DYNAMIC; R3 single-source the (response,zeta) presets out of regen-spring-tokens.mjs:57-83; R4 close the theme.css alias set in CURVE-TABLE-BOUND; R5 the value.js static-edge decided by profile:bundle measurement; R6 name cssTwinFor in the no-fork grep; R7 record the value.js enumeration version. Read ${NX}/motion-primitives.md first.`),
  lane('HC-doc1-spec', 'SpecHarden', `EDIT ${W}/AY.W-DOC1.md — WIDEN its rows with the matrix §2 consolidated README-stale ledger: aurora x6 (tonemap ACES->PBR-Neutral x4 sites, architecture tree +5 composables, mediums table +3 rows, gate table +6/7, References-WebGPU prune, cite re-grep), dock x5 (VT-driver section delete, gate table reconcile, DOCK_SPRING cite, shape+layout props), constellation x4 (wander+gravityWell prop rows, the 9-member token cohort table, provenance strip), CLAUDE.md x4 (phantom useDockTransition, proof:glass-one-model->glass-cohesion :330, the :204 luma claim, the keyframes peer range), blob x1 (README.md:184-185 stale stops literal), ff x1 (the light-mode caveat), glass.css:3-19 header re-scope. Each row: exact file:line + the as-built truth. Read ${NX}/NECESSITY-MATRIX.md §2 W-DOC1 + the per-lane files for the cites.`),
]

// ── Batch D — the research arm + close-out rows ──
const D = [
  lane('HC-liquid-research', 'CloseOut', `THE ONE VALIDATED RESEARCH ARM (matrix §3 — time-boxed, fills NAMED blanks; the W-LIQUID spec was just hardened by HC-liquid-spec, READ IT FIRST): WebSearch/WebFetch — (1) iOS-26/27 Siri-orb reference bands: observed max silhouette deformation %, flex onset/settle times, silhouette-level vs transform-level deformation (credible teardowns/footage analyses/Apple sessions); (2) the Apple drive-signal model (audio amplitude vs assistant state vs touch); (3) the WWDC26 freshness delta vs the WWDC25-era corpus (new Liquid Glass deformation/motion APIs) + the contrast-color() multi-candidate syntax rider (has it shipped?). APPEND the findings as the spec's RESEARCH-RESULTS section with sources + the filled parameter table. If a blank cannot be filled from credible sources, record UNFILLED + the best inference — do NOT fabricate.`),
  lane('HC-god1-regrade', 'CloseOut', `EDIT ${W}/AY.W-GOD1.md: RE-GRADE every carve target against REAL HEAD line counts (the matrix found constellationField.ts 959 + Constellation.vue 597 + useMetaballRenderer.ts 692 + SegmentedTabs.vue 689 + GlassDock.vue 624 — RECOUNT each at HEAD; the finisher grew them further). Update the carve shapes for the new mass (the wander/well/freeze clusters in constellationField are now the carve's biggest shed). Fold the RATCHET spec (trends R4): CI-promote proof:no-god-module with per-violator baselines (RED on GROWTH even before the carve) + the booking-updates-spec-counts rule. The carve itself stays Batch-4 implementation — this is the spec re-grade.`),
  lane('HC-user-hinge', 'CloseOut', `Author ${GU}/docs/tranches/AY/audit/USER-HINGE-REGISTER.md (the trends R3 decision-forcing artefact): collate EVERY open user decision with the exact question + the converged context + what each answer unlocks: (1) dock magnification ship/no-ship (parameter model converged: cosine falloff ~110px, response 0.15/zeta 1.4, transform-only, PRM-gated, opt-in; NOTE the prior 'user-mandate' cite was FABRICATED — this is researcher-PROPOSED); (2) the blob uBackdrop Snell-refraction greenlight (recipe+gate on disk; needs the go + aurora-FBO seam coordination); (3) the G-4/G-5/G-6 book-or-retire forks (read W-CARRY for what they are); (4) the slides poster-pass slide-count ceiling (pending from the dialogue); (5) anything else the lane files mark user-hinge. Each entry: the question VERBATIM-ready to put to the user, the options, the default-if-silent.`),
  lane('HC-L-deck', 'CloseOut', `THE SLIDES LANE: grade the BUILT til-briefing deck (${SL}, branch tranche/til-briefing-L, HEAD ~9e10dff — the 9 SFCs + round-1 refinement) against the 17 BINDING decisions in ${SL}/docs/tranches/L/audit/restructure/REFINEMENT-DECISIONS.md: per slide x per decision PASS/DEFECT (the poster register #15 + 15-min pacing #16 + both-modes-mobile-first-class #17 are the round-2 grading bar — view the live deck at http://127.0.0.1:5273/til-briefing if up, else grade from source). Also: the S2 bottom-row clip (bound to the poster pass); the known S2 recompose; the L wave-set currency (the 13 L specs vs the built state — which are stale?). Write findings to ${OUT}/HC-L-deck.md (NO slide edits — the poster pass is a later greenlit build).`),
]

phase('Reground')
const ra = (await parallel(A)).filter(Boolean)
log(`Reground: ${ra.length}/4`)
phase('Verify')
const rb = (await parallel(B)).filter(Boolean)
log(`Verify: ${rb.length}/4`)
phase('SpecHarden')
const rc = (await parallel(C)).filter(Boolean)
log(`SpecHarden: ${rc.length}/4`)
phase('CloseOut')
const rd = (await parallel(D)).filter(Boolean)
log(`CloseOut: ${rd.length}/4`)

return { reground: ra, verify: rb, specHarden: rc, closeOut: rd }
