export const meta = {
  name: 'refine-triumvirate',
  description: 'Parameterized iterative triumvirate (research root-cause | SOTA target | fix-mechanism -> plan/wave -> prototype -> judge, looping) for a user-feedback REFINEMENT. Args: {slug, title, directive, pages, files}.',
  phases: [
    { title: 'Research', detail: 'triumvirate: live root-cause | SOTA/design target | fix-mechanism' },
    { title: 'PlanWave', detail: 'synthesize -> BUILD-SPEC + wave' },
    { title: 'Prototype', detail: 'build + live-verify' },
    { title: 'Judge', detail: 'meets the directive? iterate if not' },
  ],
}

const A = (typeof args === 'string') ? JSON.parse(args) : (args || {});
const SLUG = A.slug || 'refine';
const TITLE = A.title || SLUG;
const DIRECTIVE = A.directive || '';
const PAGES = A.pages || '';
const FILES = A.files || '';
const DIR = 'docs/tranches/BD/viz/refine/' + SLUG + '/';

const LAW = ' BINDING north star: design.md + the iOS-27 Liquid Glass language (the six-layer optical composite: backdrop blur+saturate · warm tint · edge rim · inner catch-light · drop shadow · grain) + glass+PAPER morphism + the BA.W-NO-GRAY warm-chroma floor (glass is warm MATERIAL, never gray) + the [[feedback-liquid-weight-universal]] law (inertia/weight/bounce/squish on ALL motion). NO legacy, idiomatic, gestalt, compositor-only, PRM-carved, Safari-compatible. NO quick workarounds.';

const R1 = 'You are RESEARCH-1 (LIVE ROOT-CAUSE). The user feedback: "' + DIRECTIVE + '". Target pages/surfaces: ' + PAGES + '. Load chrome-devtools-mcp via ToolSearch (select:mcp__plugin_chrome-devtools-mcp_chrome-devtools__navigate_page,mcp__plugin_chrome-devtools-mcp_chrome-devtools__evaluate_script,mcp__plugin_chrome-devtools-mcp_chrome-devtools__take_screenshot,mcp__plugin_chrome-devtools-mcp_chrome-devtools__list_console_messages). LIVE-INSPECT the offending surfaces on http://localhost:5173: getComputedStyle the exact elements, read the resolved color/background/tint/filter tokens, find the PRECISE mechanism causing the defect (which token resolves wrong, which recipe paints it, the cascade path). For a GRAY-GLASS defect: sample the panel/card/button/chip background-color + the --glass-bg-* / --glass-tint-* / --card / --popover / --neutral-* resolution + any adaptive-glass darkening (--glass-backdrop) + the dark-material arm; determine WHY it reads gray not warm-cream. For a MOTION defect: sample the timing/spring/scale. Document the CONFIRMED root cause (the exact tokens + values + the cascade) to ' + DIR + 'research-root-cause.md. Concrete, with the live computed values. Relevant files: ' + FILES + '.' + LAW;

const R2 = 'You are RESEARCH-2 (the SOTA / DESIGN TARGET). The user feedback: "' + DIRECTIVE + '". Research + define the CORRECT target the fix must hit. READ design.md (the six-layer composite, the 7 glass tiers, warm-cream identity) + CLAUDE.md (the BA.W-NO-GRAY warm-chroma floor: the neutral ladder + --card are warm MATERIAL at OKLab hue 62-75, NOT gray; the W-DARK-MATERIAL luminous-dark transmissive register; the --glass-tint-* adaptive seam) + the [[feedback-liquid-weight-universal]] memory. WebSearch the iOS-26/27 Liquid Glass material if useful ("ios 26 liquid glass material design", "visionOS glass material warm"). Define PRECISELY what the surface SHOULD look like (the warm-cream luminous glass: the hue/chroma/luminosity, the tint direction, the saturation-lift, never gray; OR for motion: the slower/weightier/bigger target). Document the TARGET spec + the acceptance bar to ' + DIR + 'research-target.md.' + LAW;

const R3 = 'You are RESEARCH-3 (the FIX MECHANISM, glass-ui internals — no re-fork, no-dual-path). Map the EXACT glass-ui tokens/recipes to retune to fix the defect. READ the relevant sources: ' + FILES + ' + src/styles/tokens/ (glass.css, glass-fx.css, glass-deep.css, dark-arm.css, scale-paper.css), src/styles/glass/ (ladder.css, surfaces.css, material.css, reveal.css), src/styles/menu.css, the --glass-bg-* compose recipe (AX.W54 --glass-level), the --glass-tint-* adaptive seam (W55), the BA.W-NO-GRAY tokens, the W-DARK-MATERIAL dark arm. For GRAY-GLASS: identify the token/recipe changes that make the glass warm-cream luminous (lift chroma/saturation/warm-tint, abrogate any gray cast, keep AA text contrast) WITHOUT breaking the existing no-gray gate (proof:no-gray) — extend it. For MOTION: the spring/clock/scale tokens. Document the precise mechanism (the tokens + the new values + the gate impact) to ' + DIR + 'research-mechanism.md. Compose existing primitives, never re-fork.' + LAW;

const PLAN = 'You are the PLAN + WAVE architect. READ ' + DIR + 'research-root-cause.md, ' + DIR + 'research-target.md, ' + DIR + 'research-mechanism.md. SYNTHESIZE the BEST fix for "' + DIRECTIVE + '". PRODUCE: (1) a precise BUILD-SPEC -> ' + DIR + 'BUILD-SPEC.md (the exact token/recipe changes, files+lines, the before/after values, the acceptance criteria, the gate impact, the a11y/PRM/Safari rules); (2) a wave spec -> docs/tranches/BD/union/waves/W-' + SLUG.toUpperCase() + '.md (the wave + a REAL gate sketch — a π readback proving the fix, born-RED on the current defect). Be the architect: concrete, idiomatic, no-legacy, gestalt. Return a 1-paragraph summary + the files written.' + LAW;

function protoPrompt(iter) {
  const prev = iter > 1 ? (' ITERATION ' + iter + ' — READ ' + DIR + 'JUDGE-' + (iter-1) + '.md and ADDRESS its refinements (the prior attempt did NOT meet the bar).') : '';
  return 'You are the PROTOTYPE + LIVE-VERIFY builder for "' + DIRECTIVE + '".' + prev + ' READ ' + DIR + 'BUILD-SPEC.md. BUILD the fix in glass-ui src/ (+ demo/ if the spec calls for it). It MUST decisively meet the user directive (the user has rejected subtle/half fixes — go FULLY for the target). Token-first where possible (the warm-glass identity / the motion clocks), idiomatic, no-legacy, compositor-only, PRM-carved, a11y-preserved (AA text contrast), Safari-OK. VERIFY LIVE: load chrome-devtools-mcp via ToolSearch, navigate the target pages (' + PAGES + ') on http://localhost:5173, getComputedStyle + screenshot the FIXED surfaces, PROVE the defect is gone (warm-cream luminous glass not gray / readable text / the slower-bigger-more-dramatic motion / etc per the directive). Capture before-claim screenshots to ' + DIR + '. Run: cd /Users/mkbabb/Programming/glass-ui && npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -iE "error TS" | head (no NEW errors) + node scripts/verify-siblings-intact.mjs --quiet (siblings OK). CONSTRAINTS (absolute): edit ONLY glass-ui src/ + demo/; NEVER touch ~/Programming siblings; NEVER mv/rm outside the repo; no git commit/push/stage; no browser dialogs. Write a report -> ' + DIR + 'BUILD-REPORT-' + iter + '.md (what built + files/lines + before/after computed values + screenshot paths + typecheck + a11y). Return the report.' + LAW;
}

function judgePrompt(iter) {
  return 'You are the RUTHLESS JUDGE of the "' + DIRECTIVE + '" fix (iteration ' + iter + '). READ ' + DIR + 'BUILD-REPORT-' + iter + '.md but TRUST NOTHING in it — prior judges PASSED fixes the user reports STILL BROKEN, so DEFAULT TO FAIL (meetsBar=false) and PASS only if you INDEPENDENTLY PROVE every listed defect is gone. LIVE-VERIFY (chrome-devtools-mcp via ToolSearch) on EACH target page (' + PAGES + '): (1) INDEPENDENTLY REPRODUCE each ORIGINAL user defect by performing the EXACT user gesture (real click/drag/hover/scroll/reload — NOT a synthetic dispatchEvent; if the page navigates wrong, a control no-ops, or the gesture does not do what the user expects, that is a FAIL); (2) SCREENSHOT the gestalt and judge it AS A USER would — a mechanism number (a scaleX/token value) passing while the surface LOOKS or FEELS broken is a FAIL; the GESTALT is the bar, not the metric; (3) check console for errors; (4) flag any WebKit/SAFARI-fragile backdrop-filter/filter/animation (the user keeps flagging Safari). If ANY listed defect still reproduces, ANY console error, ANY gestalt-looks-broken, or ANY doubt → meetsBar=FALSE with the SPECIFIC defect + the concrete refinement. Be MERCILESS. Return the verdict (schema) + write ' + DIR + 'JUDGE-' + iter + '.md with the live evidence + the SPECIFIC concrete refinements if not passing.' + LAW;
}

const VERDICT_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['meetsBar', 'refinements', 'evidence'],
  properties: {
    meetsBar: { type: 'boolean', description: 'Does the fix DECISIVELY meet the user directive (warm-glass-no-gray / slower-bigger-more-dramatic / etc)? false if still subtle/gray/half.' },
    refinements: { type: 'string', description: 'If not: the SPECIFIC concrete refinements (the exact token/value/knob to push further).' },
    evidence: { type: 'string', description: 'The live computed values + visual evidence observed.' },
  },
};

phase('Research');
log('Refine "' + TITLE + '": triumvirate research (root-cause | target | mechanism)');
const research = await parallel([
  () => agent(R1, { label: 'research:root-cause', phase: 'Research', model: 'opus', effort: 'high' }),
  () => agent(R2, { label: 'research:target', phase: 'Research', model: 'opus', effort: 'high' }),
  () => agent(R3, { label: 'research:mechanism', phase: 'Research', model: 'opus', effort: 'high' }),
]);

phase('PlanWave');
const plan = await agent(PLAN, { label: 'plan+wave', phase: 'PlanWave', model: 'opus', effort: 'high' });

let verdict = null;
let iter = 0;
const MAX_ITER = 3;
while (iter < MAX_ITER) {
  iter++;
  phase('Prototype');
  await agent(protoPrompt(iter), { label: 'prototype#' + iter, phase: 'Prototype', model: 'opus', effort: 'high' });
  phase('Judge');
  verdict = await agent(judgePrompt(iter), { label: 'judge#' + iter, phase: 'Judge', model: 'opus', effort: 'high', schema: VERDICT_SCHEMA });
  log('Judge#' + iter + ': meetsBar=' + (verdict ? verdict.meetsBar : 'null'));
  if (verdict && verdict.meetsBar) break;
}

return { slug: SLUG, researchDone: research.filter(Boolean).length, planned: !!plan, iterations: iter, meetsBar: verdict ? verdict.meetsBar : null, finalRefinements: verdict ? verdict.refinements : null };
