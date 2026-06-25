export const meta = {
  name: 'goo-morph-triumvirate',
  description: 'Iterative triumvirate (research -> plan/tranche+wave write -> prototype -> judge, looping) for the FAR-more-liquid Google-deck WORM goo-morph pager dots + the universal liquid-weight law',
  phases: [
    { title: 'Research', detail: 'triumvirate: Google/Material worm indicator | SVG goo/metaball merge | glass-ui primitive reuse' },
    { title: 'PlanWave', detail: 'synthesize -> BUILD-SPEC + W-PAGER-GOO-MORPH wave + W-LIQUID-ENTRANCE-GENERAL universal-weight fold' },
    { title: 'Prototype', detail: 'build + live-verify the worm goo-morph' },
    { title: 'Judge', detail: 'far-more-liquid Google-deck bar? iterate if not' },
  ],
}

const DIR = 'docs/tranches/BD/viz/goo-morph/';
const LAW = ' BINDING LAW (the user, remember always): MOST items + transitions must carry INERTIA, WEIGHT, BOUNCE, and LIQUID-GLASS quality; ALL scrolling + movement must have inertia + liquid weight. The pager/deck dots must GOO-MORPH from one to another like the EXTANT GOOGLE DECK dot morph - FAR more liquid + squishy than a subtle shift. NO legacy, idiomatic, gestalt, compositor-only, PRM-carved, Safari-compatible. See memory feedback_liquid_weight_universal + CLAUDE.md W-MOTION-CANON.';

const R1 = 'You are RESEARCH-1 (the Google/Material WORM page-indicator). Research the EXTANT Google-deck/Material/iOS liquid PAGE-INDICATOR dot morph the user named. The canonical pattern is the WORM / liquid page indicator: as the active dot moves A->B the indicator STRETCHES to span BOTH dots (an elongated worm/capsule), then the trailing edge catches up (contracts) to land on B - a 2-phase stretch-then-contract, very liquid + squishy. Use WebSearch: "material design worm page indicator", "viewpager2 worm dots indicator animation", "google slides pagination dot morph", "react liquid gooey dots indicator". Document the EXACT buildable mechanism: the leading-edge vs trailing-edge positions, the spring TIMING OFFSET between them (leading moves first -> stretch; trailing follows -> contract), the squish/scale math, and how a goo/metaball variant looks. Write a precise mechanism spec to ' + DIR + 'research-google-worm.md. Concrete + buildable - the builder must implement from your mechanism.' + LAW;

const R2 = 'You are RESEARCH-2 (the SVG GOO/metaball merge). Research the SVG gooey-filter metaball merge that makes page dots MERGE liquidly (the goo-blob smin look on dots). The classic gooey filter: feGaussianBlur(stdDeviation) + feColorMatrix(alpha-threshold row like "0 0 0 N -M") + feComposite/feBlend -> nearby shapes melt into one blob. READ glass-ui sources: src/styles/dock/morph-bridge.css (the EXISTING goo bridge - the exact filter values) and src/components/custom/goo-blob (the metaball smin philosophy). THE KEY PROBLEM to solve: the goo filter thresholds ALPHA, so it needs near-OPAQUE shapes, but the pager dots are translucent (52% foreground). Solve it cleanly: render the dots+indicator into an OPAQUE goo layer (full-alpha fills) then apply the rail translucency/tint at the LAYER level (opacity / mix-blend / mask). Document the exact filter + the opaque-layer technique + how it composes WITH the worm indicator (R1) so the stretching worm MERGES with the dots as it passes. WebSearch "svg gooey filter metaball nav css" / "gooey effect feColorMatrix threshold" if needed. Write to ' + DIR + 'research-goo-merge.md. Concrete + buildable.' + LAW;

const R3 = 'You are RESEARCH-3 (glass-ui primitive REUSE - no re-fork, the no-dual-path law). Audit glass-ui existing motion primitives to COMPOSE for the goo-morph pager. READ: src/composables/motion/useLiquidFlex.ts (the volume-preserving X/Y reciprocal squish), src/components/custom/tabs/composables/useTabIndicator.ts (the SegmentedTabs indicator that ALREADY glides + squishes between tabs - the closest WORKING reference; document HOW it travels + squishes), src/components/custom/pager-dots/PagerDots.vue (the current per-dot ::before width cross-fade to REPLACE), src/components/custom/deck (DeckPager composes PagerDots via pattern=group), the spring presets (grep SPRING_PRESETS + the --spring-* tokens + the per-spring-duration tokens). Document: which primitive the worm-morph COMPOSES (the squish from useLiquidFlex? the travel approach from useTabIndicator?), the exact spring preset for the BOUNCE + WEIGHT the user wants, the --pager-* token surface, the a11y/windowFit/orientation constraints to PRESERVE, and the compositor-only / PRM / Safari rules (READ CLAUDE.md W-MOTION-CANON + no-layout-animation). Write to ' + DIR + 'research-primitives.md. The builder COMPOSES these, never re-forks.' + LAW;

const PLAN = 'You are the PLAN + TRANCHE/WAVE-WRITE architect for the goo-morph pager. READ the 3 research docs ' + DIR + 'research-google-worm.md, ' + DIR + 'research-goo-merge.md, ' + DIR + 'research-primitives.md. SYNTHESIZE the BEST liquid worm-goo-morph: the Google-deck-quality stretch-then-contract WORM that MERGES the dots gooily, FAR more liquid + squishy than a subtle traveling pill (the user already REJECTED a subtle shift - this is the binding bar). PRODUCE: (1) a precise BUILD-SPEC -> ' + DIR + 'BUILD-SPEC.md (the exact mechanism: worm leading/trailing edges + spring offset, the squish, the goo filter + opaque-layer technique, the spring preset, the --pager-* tokens, the a11y/PRM/Safari rules, which primitives to compose); (2) the wave spec -> docs/tranches/BD/union/waves/W-PAGER-GOO-MORPH.md (the wave + a REAL gate sketch: a pi frame-series proving the worm STRETCHES mid-travel + the dots MERGE + it SETTLES + PRM-instant, both engines; the >=2 consumers carousel + DeckPager); (3) FOLD the universal liquid-weight law into docs/tranches/BD/union/waves/W-LIQUID-ENTRANCE-GENERAL.md (extend it: ALL transitions + scrolling carry inertia + weight + squish; cite feedback_liquid_weight_universal). Be the architect - concrete, idiomatic, no-legacy. Return a 1-paragraph summary + the file paths written.' + LAW;

function protoPrompt(iter) {
  const prev = iter > 1 ? (' This is ITERATION ' + iter + ' - READ the prior verdict ' + DIR + 'JUDGE-' + (iter-1) + '.md and ADDRESS its refinements (the prior attempt was NOT liquid enough).') : '';
  return 'You are the PROTOTYPE + LIVE-VERIFY builder for the goo-morph pager.' + prev + ' READ ' + DIR + 'BUILD-SPEC.md. BUILD the worm-goo-morph in src/components/custom/pager-dots/PagerDots.vue (+ a colocated composable if the spec calls for it; DeckPager inherits it). It MUST be FAR more liquid + squishy than the current cross-fade - the GOOGLE-DECK WORM: the indicator STRETCHES to span source->target then CONTRACTS to land, the dots MERGE gooily, spring bounce + weight, compositor-only, PRM-carved, token-driven (--pager-*), a11y + windowFit + orientation PRESERVED, Safari-OK. VERIFY LIVE: load chrome-devtools-mcp via ToolSearch (select:mcp__plugin_chrome-devtools-mcp_chrome-devtools__navigate_page,mcp__plugin_chrome-devtools-mcp_chrome-devtools__evaluate_script,mcp__plugin_chrome-devtools-mcp_chrome-devtools__take_screenshot,mcp__plugin_chrome-devtools-mcp_chrome-devtools__click,mcp__plugin_chrome-devtools-mcp_chrome-devtools__emulate,mcp__plugin_chrome-devtools-mcp_chrome-devtools__list_console_messages). Navigate http://localhost:5173/motion/deck (DeckPager) + a carousel page; CLICK through dots; CAPTURE 3+ mid-travel frames proving the worm STRETCHES (a real span/scaleX != 1 mid-flight) + the dots MERGE (goo) + it SETTLES on target; screenshot to ' + DIR + '. Emulate prefers-reduced-motion -> instant, no squish. Run: cd /Users/mkbabb/Programming/glass-ui && npx vue-tsc --noEmit -p tsconfig.json 2>&1 | grep -iE "error TS" | head (no NEW errors). CONSTRAINTS (absolute): edit ONLY glass-ui src/ + demo/; NEVER touch ~/Programming siblings; NEVER mv/rm outside the repo; no git commit/push/stage; no browser dialogs (use console.log + list_console_messages). Write a report -> ' + DIR + 'BUILD-REPORT-' + iter + '.md (what built + files/lines, the live mid-travel frame evidence + screenshot paths, typecheck, a11y). Return the report.' + LAW;
}

function judgePrompt(iter) {
  return 'You are the RUTHLESS JUDGE of the goo-morph prototype LIQUIDITY (iteration ' + iter + '). READ ' + DIR + 'BUILD-REPORT-' + iter + '.md, then VERIFY LIVE YOURSELF: load chrome-devtools-mcp via ToolSearch, navigate http://localhost:5173/motion/deck, click through dots, capture mid-travel frames. THE BAR (the user binding ask): is it FAR MORE LIQUID + SQUISHY - the EXTANT GOOGLE DECK worm morph (the indicator STRETCHES to span source->target then CONTRACTS, the dots MERGE gooily, with spring bounce + weight)? A subtle traveling pill = FAIL (the user already rejected that). Judge: does the indicator visibly STRETCH mid-travel into a real worm/span (not a subtle scale)? do the dots MERGE (goo)? is there clear spring BOUNCE + WEIGHT? is it Google-deck quality? Write your verdict + the live evidence + the SPECIFIC concrete refinements (if any) to ' + DIR + 'JUDGE-' + iter + '.md. Be HARSH. Return the structured verdict.' + LAW;
}

const VERDICT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['liquidEnough', 'refinements', 'evidence'],
  properties: {
    liquidEnough: { type: 'boolean', description: 'Does it MEET the far-more-liquid Google-deck WORM bar (stretch-span + goo-merge + bounce)? false if it is still a subtle/traveling-pill shift.' },
    refinements: { type: 'string', description: 'If not liquidEnough: the SPECIFIC concrete refinements (more stretch span? goo not merging? more bounce/weight? the exact knob).' },
    evidence: { type: 'string', description: 'The live mid-travel evidence observed (stretch amount, merge yes/no, bounce yes/no).' },
  },
};

phase('Research');
log('Triumvirate research: Google worm | goo merge | primitive reuse');
const research = await parallel([
  () => agent(R1, { label: 'research:google-worm', phase: 'Research', model: 'opus', effort: 'high' }),
  () => agent(R2, { label: 'research:goo-merge', phase: 'Research', model: 'opus', effort: 'high' }),
  () => agent(R3, { label: 'research:primitive-reuse', phase: 'Research', model: 'opus', effort: 'high' }),
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
  log('Judge#' + iter + ': liquidEnough=' + (verdict ? verdict.liquidEnough : 'null'));
  if (verdict && verdict.liquidEnough) break;
}

return { researchDone: research.filter(Boolean).length, planned: !!plan, iterations: iter, liquidEnough: verdict ? verdict.liquidEnough : null, finalRefinements: verdict ? verdict.refinements : null };
