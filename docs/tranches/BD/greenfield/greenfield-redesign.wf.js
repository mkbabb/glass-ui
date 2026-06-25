export const meta = {
  name: 'greenfield-redesign',
  description: 'Greenfield first-principles redesign of ONE glass-ui item: brainstorm-3 (diverse lenses) -> golden synthesis -> challenge-3 (adversarial) -> delta-assay vs current + concrete wave amendment. Survival-of-the-fittest, DEFT integration, KISS, no legacy. Args: {slug, title, item, currentFiles, pages, brief}.',
  phases: [
    { title: 'Brainstorm', detail: '3 greenfield designs from first principles — distinct lenses' },
    { title: 'Golden', detail: 'synthesize the single best variant (+ prototype where it de-risks)' },
    { title: 'Challenge', detail: '3 adversarial refutations — correctness · cross-engine · design-fidelity' },
    { title: 'DeltaAssay', detail: 'live golden-vs-current -> union path + concrete wave amendment' },
  ],
}

const A = (typeof args === 'string') ? JSON.parse(args) : (args || {});
const SLUG = A.slug || 'item';
const TITLE = A.title || SLUG;
const ITEM = A.item || SLUG;            // what is being redesigned (prose)
const BRIEF = A.brief || '';            // the specific user feedback / target / known defects
const CURRENT = A.currentFiles || '';   // the current implementation files
const PAGES = A.pages || '';            // the live demo routes to inspect
const DIR = 'docs/tranches/BD/greenfield/' + SLUG + '/';

const LAW = ' BINDING LAW (design.md + docs/tranches/BD/GREENFIELD-HARDENING-PLAN.md §1): the iOS-27 reference demos are the guiding light (docs/tranches/BD/viz/video-audit/IOS27-REFERENCE.md). PERFECTED glass morphism (transmissive warm-cream six-layer composite, NEVER gray, both modes, the BA.W-NO-GRAY warm floor; §3 = a COLORFUL FIELD behind glass + a defined edge). PAPER morphism visible. AUDACIOUS √φ typography. CARTOON ANIMATION + SHADOWING (the 1940s technicolor register: bold layered-offset shadows + FLOW & PUNCH — anticipation, exaggeration, follow-through, overlapping action, arcs, squash & stretch with real WEIGHT/INERTIA; elevate design.md §L4 weak/medium principles toward universal). LIQUID-WEIGHT UNIVERSAL (inertia/weight/bounce/squish on ALL motion; morph MORE on move; NEVER tight/springy). ARISTOTELIAN golden-ratio proportion in ALL things. MEATBALLING + liquid animations must be PERFECT in CHROME *and* SAFARI (static SVG goo filter, sRGB color-interp, NO backdrop-filter:url, compositor-only, @supports/PRM floors; NO naive ellipsoids — real blob<->meatball metaball merge). DEFT INTEGRATION into the robust extant ecosystem — a UNION, never a bolt-on or a parallel fork; KISS, DRY, reuse extant primitives. NO LEGACY EVER. Survival of the fittest: keep what is fit, REFINE what is weak, RE-INVENT only what is broken.';

function brainstorm(lensKey, lensName, lensCharge) {
  return 'You are GREENFIELD BRAINSTORM (' + lensName + ') redesigning "' + ITEM + '" from FIRST PRINCIPLES. The user feedback / target / known defects: "' + BRIEF + '". Current implementation (READ to understand the status quo, but design GREENFIELD — do not be anchored by it): ' + CURRENT + '. Live demo routes: ' + PAGES + '. YOUR LENS: ' + lensCharge + ' READ design.md + CLAUDE.md + ' + (PAGES ? 'live-inspect the current surface (chrome-devtools-mcp via ToolSearch: navigate ' + PAGES + ' on http://localhost:5173, screenshot + getComputedStyle the current state) and ' : '') + 'the ios27 reference. Optionally WebSearch SOTA (Apple HIG / awwwards / ios27 liquid glass / the relevant technique). DESIGN the item anew through your lens: the visual + motion + interaction spec, the precise mechanism (tokens/recipes/shaders/composables), how it composes EXISTING glass-ui primitives (deft, KISS, no re-fork), the cross-engine (Chrome+Safari) approach, the a11y/PRM carve. Be audacious AND idiomatic. Write your greenfield design -> ' + DIR + 'brainstorm/lens-' + lensKey + '.md. Return a 1-paragraph summary of your core idea + the single boldest move.' + LAW;
}

const GOLDEN = 'You are the GOLDEN SYNTHESIZER for "' + ITEM + '". READ the three greenfield brainstorms (' + DIR + 'brainstorm/lens-a.md, ' + DIR + 'brainstorm/lens-b.md, ' + DIR + 'brainstorm/lens-c.md). SYNTHESIZE the SINGLE BEST variant — the GOLDEN reference: take the strongest move from each lens, reconcile the cross-engine + audacity + correctness tensions, and resolve to ONE coherent design. It MUST be DEFTLY INTEGRABLE (a union with the extant ecosystem, reusing primitives, KISS/DRY, no parallel fork, no legacy) and PERFECT in Chrome AND Safari. Produce: (1) ' + DIR + 'GOLDEN.md — the canonical spec (the visual+motion+interaction design, the exact mechanism: tokens/recipes/shaders/composables + files, the cross-engine plan, the a11y/PRM carve, the acceptance bar, and a born-RED gate sketch — a π/readback that proves it); (2) where a small prototype de-risks the boldest mechanism, BUILD it under ' + DIR + 'golden/ (throwaway spike, glass-ui src/ only if truly needed but PREFER the greenfield dir; verify it live if built). Return a 1-paragraph summary of the golden design + the files written.' + LAW;

function challenge(n, lensName, lensCharge) {
  return 'You are ADVERSARIAL CHALLENGER #' + n + ' (' + lensName + ') of the GOLDEN "' + ITEM + '" design. READ ' + DIR + 'GOLDEN.md (+ ' + DIR + 'golden/ if a prototype exists) but TRUST NOTHING — your job is to REFUTE it. YOUR LENS: ' + lensCharge + ' Find every way the golden FAILS: where it is NOT deftly integrable (a bolt-on / parallel fork / legacy), where it breaks in Safari OR Chrome (' + (PAGES ? 'live-test via chrome-devtools-mcp on ' + PAGES + ' if a prototype exists; ' : '') + 'reason about WebKit backdrop-filter:url / filter / color-interp / compositor gaps), where it violates a precept (gray glass / naive ellipsoid / tight-springy / non-golden proportion / missing cartoon-punch), where KISS/DRY is violated, where the gate is not actually born-RED, any a11y/PRM gap, any overfit/hardcoded ref. Default to REFUTED. Write the specific refutations + the concrete hardening -> ' + DIR + 'challenge/' + n + '.md. Return: does it SURVIVE your lens (boolean-ish) + the top refutation.' + LAW;

}

const DELTA = 'You are the DELTA-ASSAY + WAVE-AMENDMENT architect for "' + ITEM + '". READ ' + DIR + 'GOLDEN.md + the three challenges (' + DIR + 'challenge/1.md, 2.md, 3.md) and FOLD their hardening into the golden as you assay. LIVE-INSPECT the CURRENT implementation (chrome-devtools-mcp via ToolSearch: navigate ' + PAGES + ' on http://localhost:5173, screenshot + getComputedStyle; READ ' + CURRENT + ') and assay the DELTA: what the current does well (KEEP), what is weak (REFINE), what is broken (RE-INVENT) — survival of the fittest. PRODUCE: (1) ' + DIR + 'DELTA-ASSAY.md — the golden-vs-current delta + the UNION path (the deft integration: precisely how to evolve the current toward the golden reusing extant primitives, KISS, no legacy, no dual-path); (2) ' + DIR + 'WAVE-AMENDMENT.md — the CONCRETE tranche amendment: which existing waves in docs/tranches/BD/union/waves/ to AUGMENT / UPDATE / PRUNE / EXCISE (cite them by filename), or the NEW wave(s) to author, each referencing ' + DIR + 'GOLDEN.md as the reference implementation, with a real born-RED gate. No duplicative work — reconcile against the extant 116-wave set. Update the ledger row for ' + SLUG + ' in docs/tranches/BD/GREENFIELD-HARDENING-PLAN.md §6 (status + triage + note). Return a 1-paragraph summary: the union verdict (refine/re-invent), the waves touched, and a convergence % for this item.' + LAW;

const CHALLENGE_SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['survives', 'topRefutation', 'hardening'],
  properties: {
    survives: { type: 'boolean', description: 'Does the golden SURVIVE this adversarial lens intact? false if a real refutation lands.' },
    topRefutation: { type: 'string', description: 'The single strongest refutation (or "none" if it survives clean).' },
    hardening: { type: 'string', description: 'The concrete change that answers the refutation.' },
  },
};

phase('Brainstorm');
log('Greenfield "' + TITLE + '": 3 first-principles designs (ios27-fidelity | cross-engine/perf | cartoon-technicolor-punch)');
const brains = await parallel([
  () => agent(brainstorm('a', 'PURE iOS-27 FIDELITY', 'design the most faithful, audacious iOS-27 Liquid-Glass interpretation — match or BETTER the reference demos; the canonical ios27 example. Maximize design fidelity to the edicts (glass/paper morphism, cartoon-technicolor flow & punch, audacious type, golden proportion, liquid weight).'), { label: 'brainstorm:ios27', phase: 'Brainstorm', model: 'opus', effort: 'high' }),
  () => agent(brainstorm('b', 'CROSS-ENGINE / PERF-FIRST', 'design for FLAWLESS Chrome AND Safari + performance — the meatball/liquid motion must be perfect on WebKit (static SVG goo, sRGB, no backdrop-filter:url, compositor-only, @supports/PRM). Favor the simplest mechanism that hits the bar (KISS); GPU-only where it is a viz; offscreen-pause.'), { label: 'brainstorm:cross-engine', phase: 'Brainstorm', model: 'opus', effort: 'high' }),
  () => agent(brainstorm('c', 'AUDACIOUS CARTOON-TECHNICOLOR PUNCH', 'design for maximum 1940s-technicolor FLOW & PUNCH — bold cartoon shadowing, exaggerated squash/stretch/morph, anticipation + follow-through + overlapping action + arcs, real weight & inertia; the boldest, most alive variant (still idiomatic + cross-engine).'), { label: 'brainstorm:cartoon', phase: 'Brainstorm', model: 'opus', effort: 'high' }),
]);

phase('Golden');
const golden = await agent(GOLDEN, { label: 'golden-synth', phase: 'Golden', model: 'opus', effort: 'high' });

phase('Challenge');
const challenges = await parallel([
  () => agent(challenge(1, 'CORRECTNESS / DEFT-INTEGRATION / KISS', 'attack idiom, deft integration (is it a union or a bolt-on/fork/legacy?), KISS/DRY, the gate-is-born-RED claim, overfit/hardcoded refs.'), { label: 'challenge:correctness', phase: 'Challenge', model: 'opus', effort: 'high', schema: CHALLENGE_SCHEMA }),
  () => agent(challenge(2, 'CROSS-ENGINE / SAFARI / PERF', 'attack Safari+Chrome parity (backdrop-filter:url, filter, color-interp, compositor), perf, naive-ellipsoid meatball, a11y/PRM.'), { label: 'challenge:cross-engine', phase: 'Challenge', model: 'opus', effort: 'high', schema: CHALLENGE_SCHEMA }),
  () => agent(challenge(3, 'DESIGN-FIDELITY / GESTALT', 'attack design fidelity to the edicts AS A USER — gray glass, tight-springy motion, missing cartoon-punch, non-golden proportion, weak gestalt; the gestalt is the bar, not the metric.'), { label: 'challenge:design', phase: 'Challenge', model: 'opus', effort: 'high', schema: CHALLENGE_SCHEMA }),
]);

phase('DeltaAssay');
const delta = await agent(DELTA, { label: 'delta+amendment', phase: 'DeltaAssay', model: 'opus', effort: 'high' });

const survivors = challenges.filter(Boolean);
const allSurvive = survivors.length > 0 && survivors.every(c => c.survives);
log('Greenfield "' + TITLE + '" done: golden=' + !!golden + ' challengesSurvive=' + survivors.filter(c=>c.survives).length + '/' + survivors.length + ' delta=' + !!delta);
return {
  slug: SLUG,
  brainstormed: brains.filter(Boolean).length,
  golden: !!golden,
  challengesSurvive: survivors.filter(c => c.survives).length,
  challengesTotal: survivors.length,
  goldenSurvivesClean: allSurvive,
  topRefutations: survivors.filter(c => !c.survives).map(c => c.topRefutation),
  delta: !!delta,
};
