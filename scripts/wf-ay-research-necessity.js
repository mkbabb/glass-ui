export const meta = {
  name: 'ay-research-necessity-audit',
  description: 'Per-component NECESSITY audit (user-directed): for each core component, READ the existing research corpus + the as-built code and DEEM whether fresh SOTA research is necessary or refinements can be divined from existing docs + code analysis. 10 component lanes + 1 chronic-deferral trends lane + 1 synthesis. Read-only (findings docs only), batches of 4, no git.',
  phases: [
    { title: 'Audit', detail: '10 component-necessity lanes + the deferral-trends lane, batched 4' },
    { title: 'Synthesize', detail: 'the necessity matrix + the hand-challenge manifest fold' },
  ],
}

const GU = '/Users/mkbabb/Programming/glass-ui'
const OUT = GU + '/docs/tranches/AY/audit/research-necessity'
const W = GU + '/docs/tranches/AY/waves'

const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['lane', 'verdict', 'fileWritten', 'existingCorpus', 'divinedRefinements', 'researchGaps', 'readmeState', 'summary'],
  properties: {
    lane: { type: 'string' },
    verdict: { type: 'string', enum: ['FRESH-RESEARCH-NEEDED', 'REFINE-FROM-EXISTING', 'SETTLED', 'MIXED'] },
    fileWritten: { type: 'string' },
    existingCorpus: { type: 'array', items: { type: 'string' }, description: 'the research/synthesis docs that already exist for this component (paths)' },
    divinedRefinements: { type: 'array', items: { type: 'string' }, description: 'concrete refinements derivable WITHOUT new research (from corpus + code), each with file:line grounding' },
    researchGaps: { type: 'array', items: { type: 'string' }, description: 'questions ONLY fresh external research can answer (empty unless verdict warrants)' },
    readmeState: { type: 'string', description: 'README vs as-built: ACCURATE | STALE(where) | MISSING' },
    summary: { type: 'string' },
  },
}

const PRE = `You are a READ-ONLY research-necessity auditor for glass-ui at ${GU} (branch tranche/AY). The question for YOUR component: is another iterative SOTA research pass NECESSARY, or can the remaining refinements be DIVINED from the already-researched/synthesized corpus + code analysis? Do NOT assume research is good per se — research that re-treads a settled corpus is churn; research is warranted ONLY where a question exists that the corpus + code cannot answer.

METHOD: (1) READ the existing corpus for your component (the pointers below + anything you find under docs/tranches/*/research/, the component's RESEARCH.md/DESIGN.md/README, its wave specs under ${W}, and the b2 hand-challenge findings under docs/tranches/AY/audit/hardening/). (2) READ the as-built source. (3) GRADE the README against the as-built. (4) DEEM the verdict + enumerate the divined refinements (concrete, file:line-grounded) and any genuine research gaps. NOTE: a Batch-2 finisher workflow is concurrently writing some source (aurora shaders, constellation, slider, dock story) — prefer the COMMITTED state + the corpus for line-cites; mark in-flight files as such.

HARD RULES: NO git commands. NO source edits. Write your findings to ${OUT}/<lane>.md (dir may need creating). Return the structured result.`

function lane(name, scope) {
  return () => agent(`${PRE}\n\n=== LANE: ${name} ===\n${scope}\n\nWrite ${OUT}/${name}.md and return (lane="${name}").`,
    { label: name, phase: 'Audit', schema: SCHEMA })
}

const lanes = [
  lane('aurora', `Corpus: src/components/custom/aurora/RESEARCH.md (the T1-T6 technique set) + DESIGN.md + README; scripts/aurora-arresting-metric.mjs + the starry-night reference triple (C=70.67/A=0.83/beta=-1.67); waves W-AUR1/W-AUR2/W-AUR-PAINTERLY/W-AUR-WEBGPU-DECIDE; the AX aurora research synthesis if present under docs/tranches/AX/research/. The question: the painterly bar is reference-anchored and W-AUR-PAINTERLY is mid-implementation — is there ANY question left that needs external research, or is the remaining work pure tuning against the shipped metric? Grade the 702-line README against as-built.`),
  lane('blob', `Corpus: docs/tranches/AX/research/blob-synthesis.md (the 32-agent synthesis: "no algorithm changes needed"); goo-blob README + types.ts comments; waves W-BLOB1/2/3 + the b2/B2-blob.md findings (honey-tan stunning-bar RG6, mood neon, sticker shadow -> W-COHERE). The question: the cream-base/specular tuning (RG6) + the W-COHERE mood-register — divinable from the synthesis + the live pi readbacks, or does the gel-bead read need fresh material-rendering research?`),
  lane('fourier-field', `Corpus: docs/tranches/AX/audit/inventory/W43-fourier-field-SOTA.md (the preserved SOTA research); waves W-FF1/W-FF2 + b2/B2-ff.md (thin-arc F1, bbox-proxy F2, light-floor F3, recession F4). The question: the W-FF2 §0 RG re-opens (trail toward a signature stroke, the perceptual gate metric, the light-mode floor) — does the W43 research already prescribe these (read it), or is a fresh oscilloscope/phosphor-rendering research pass warranted?`),
  lane('constellation', `Corpus: constellation README; AX.W17 (warp thesis); waves W-CON1/2/3 + b2/B2-con1.md; the W-COHERE recession-prop assignment. The question: refit/wander/warp/eggs/freeze are all specced or landed — is ANYTHING left that needs research, or is this component effectively SETTLED pending its in-flight waves + the W-CON1 RG2 re-capture?`),
  // batch 2
  lane('dock', `Corpus: dock README; the dock.css partials + dock-controls.css; waves W-DOCK1/2/3 + b2/B2-dock.md (the LOOSE 537ms budget RG3, the phantom cap-rung child RG4, the OWED capture RG1/RG2); the keyframes.js dock lineage (the repo at ~/Programming/keyframes.js — its first dock implementation the user calls the once-perfected reference); CLAUDE.md dock sections (morph, orientation, nav-pattern, aria). The question: the user's standing bar is "springy iOS-like" — W-DOCK1 captured the lag ABSENT, but is the dock's FEEL settled, or does the iOS-dock-register (magnification? press squish -> W-LIQUID?) need a comparative-reference research pass vs the keyframes.js original?`),
  lane('underline', `Corpus: the just-authored ${W}/AY.W-UNDERLINE.md + the source R&D sci-report/usf/web/src/platform/charts/HandUnderline.vue (mature: two clocks, PRM, filter-free) + the slides bespoke twins (s1-draw/cta-draw in SlideIntro/SlideCloser/SlideSovereignty). The question: is the spec + R&D sufficient to build (likely REFINE/SETTLED), and does the variant continuum (pencil/crayon/boil headroom) warrant research NOW or stay deferred headroom?`),
  lane('liquid-glass', `Corpus: the AX.W52 liquid-glass model (btn-audacious-gold D19: edge catch-light over diffuse bloom; the CLAUDE.md easing doctrine §6) + W54 glass-first + W55 adaptive legibility + the just-authored ${W}/AY.W-LIQUID.md (the iOS-27 Siri flex+squish facility) + AX.W53 (the volume-preserving elastic stretch precedent). The question: W-LIQUID names a fresh SOTA research lane (the Siri orb deformation model) — VALIDATE or REFUTE that necessity: how much of the parameter model is already derivable from the shipped W52/W53 axes + the blob membrane code, and what GENUINELY needs external reference study (the Apple material-response specifics)?`),
  lane('motion-primitives', `Corpus: tokens.css §2 (the easing/spring vocabulary) + transitions.css + animations.css; the W-MOTION DELTA; the just-authored W-MOTION2 (full keyframes.js suite + curve table) + W-ANIM1 (first-principles audit) specs; the keyframes.js repo surface (~/Programming/keyframes.js src exports — enumerate the ACTUAL public suite + curve set so W-MOTION2's parity manifest is grounded in the real export list, not an assumption). The question: is W-MOTION2's scope complete vs the real keyframes.js surface, and does the curve set need research or is it a pure re-export+table job?`),
  // batch 3
  lane('glass-material', `Corpus: glass.css (the 5-rung ladder) + the CLAUDE.md W54 glass-first canon + W55 adaptive-legibility sections; the W-GLASS DELTA (Drawer/Slider/Notification/specular opt-in); proof:glass-cohesion. The question: the material SYSTEM is heavily specced and gated — is anything left research-shaped (e.g. the contrast-color() refinement, the backdrop-luma observer that shipped demo-private), or is the remaining work the W-A11Y-PERF engagement + tuning?`),
  lane('tabs-slider', `Corpus: SegmentedTabs (AX.W53 — the unified spring-slider family + proof:tabs-unified) + the slider pair (AX.W59 two-only + W-SLD1's landed rounded-knob resolution + W-SLD2 in-flight) + the W-LIQUID re-point plan (the indicator's bespoke stretch deletes onto useLiquidFlex). The question: both surfaces are decided+gated — SETTLED verdict check, plus: any refinement divinable for the indicator squish that W-LIQUID's research lane should inherit?`),
  lane('chronic-deferrals', `THE TRENDS LANE. Read: ${W}/AY.W-CARRY.md (the deferral-register wave + the AT BOOK backlog it onboards); docs/tranches/AY/audit/hardening/b2/*.md (the RG debts: W-CON1 mobile re-capture, W-BLOB2 mood re-capture, W-DOCK2 owed capture, FF light-floor); docs/tranches/AY/audit/AUDIT-LEDGER.md; docs/tranches/AY/PROGRESS.md (the RG-noted rows); docs/tranches/AY/audit/MASTER-RECAP-2026-06-09.md; the AX FINAL/PROGRESS deferral rows if present under docs/tranches/AX/. SPOT THE TRENDS: what CLASSES of work get chronically deferred (live-capture debt? consumer-#2 binding? cross-repo re-points? god-module carves? mobile verification?), WHY (what structural property makes each class slip — needs a device, needs a publish, needs a user judgment, needs serialized access to a hot file), and what MECHANISM would stop each class from slipping (a gate, an ordering rule, a standing lane). This feeds the hand-challenge as its trend-grading rubric.`),
]

phase('Audit')
const results = []
for (let i = 0; i < lanes.length; i += 4) {
  const batch = lanes.slice(i, i + 4)
  log(`necessity-audit batch ${Math.floor(i / 4) + 1}/${Math.ceil(lanes.length / 4)} — ${batch.length} lanes`)
  results.push(...(await parallel(batch)).filter(Boolean))
}

phase('Synthesize')
const matrix = await agent(`${PRE}\n\n=== SYNTHESIS ===\nThe 11 lane findings are on disk under ${OUT}/ (read them all). Produce ${OUT}/NECESSITY-MATRIX.md: (1) the component x verdict table (FRESH-RESEARCH-NEEDED / REFINE-FROM-EXISTING / SETTLED / MIXED) with the one-line WHY; (2) the consolidated divined-refinements list grouped by owning wave (each refinement -> the AY wave that owns it, or NEW-WAVE-NEEDED); (3) the genuine research-gap list (ONLY the questions external research can answer — expect this to be SHORT); (4) the chronic-deferral TREND table (class x structural cause x stopping mechanism) from the trends lane; (5) the hand-challenge manifest fold — which lanes the 32-agent hand-challenge should now include/drop given these verdicts. Return (lane="SYNTHESIS").`,
  { label: 'necessity-matrix', phase: 'Synthesize', schema: SCHEMA })

return { results, matrix }
