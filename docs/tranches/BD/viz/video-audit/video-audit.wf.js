export const meta = {
  name: 'video-audit-ios27',
  description: 'Frame-by-frame audit of the ios27 reference videos (dock morphing / tabs / glass transitions / aurora) -> the IOS27-REFERENCE target + the wave deltas glass-ui must hit or better.',
  phases: [
    { title: 'Analyze', detail: 'one agent per video reads its frames + a frame-by-frame analysis' },
    { title: 'Synthesize', detail: 'fold -> the ios27 reference + the wave deltas + convergence %' },
  ],
}

const DIR = 'docs/tranches/BD/viz/video-audit/';
const NORTH = ' The user: glass-ui must be FULLY ALIGNED or BETTERED than these ios27 references. North star: the iOS-27 Liquid Glass language (transmissive glass · vibrant accents · rounded · liquid spring motion with inertia/weight/bounce/squish · audacious type). Adhere to CLAUDE.md (the dock system, the glass tiers, motion-canon, W-LIQUID-ENTRANCE-GENERAL) + design.md. Compare glass-ui CURRENT to the reference; name the GAP + the wave that closes it. NO legacy, idiomatic, gestalt, Safari-compatible.';

function vid(dir, what) {
  return 'You are a FRAME-BY-FRAME analyst of an ios27 reference video. READ the frames in ' + DIR + dir + '/frames/ IN ORDER (f001.jpg, f002.jpg, ... — sample intelligently if there are many; read enough to see every animation arc start→peak→settle). This video shows: ' + what + '. Document FRAME-BY-FRAME (cite frame numbers): every animation + transition you see — the spring physics (overshoot? weight? squish? the fade-up/out?), the timing (fast/slow/eased), the dock behaviour (morphing bi-directional? form/function by context? sub-sections? shrunken state? layers by context? SUB-DOCKS goo-splitting off the core dock?), the tab animations (the liquid indicator? the album fade?), the glass transitions (transmissive? blur-engage? the six-layer composite?). For EACH observed behaviour: how does glass-ui CURRENT compare (read the relevant src — the dock, tabs, glass, aurora), what is the GAP, and which wave closes it (cite/propose). Write a thorough analysis to ' + DIR + dir + '/ANALYSIS.md. Return a 1-paragraph summary of the top gaps.' + NORTH;
}

phase('Analyze');
log('Frame-by-frame: 3 ios27 reference videos (tabs/glass · dock-a · dock-b)');
const analyses = await parallel([
  () => agent(vid('v1-tabs-glass', 'baseline TABS animation/feature + various ios27 glass transitions — the album fade-up/out, the dock morphing with FULL bi-directionality, the dock changing form/function by context, multiple dock sub-sections, a shrunken state, layers by context, and SUB-DOCKS (the apple-music logo goo-splits off the core dock to form the abstract bottom dock)'), { label: 'video:tabs-glass', phase: 'Analyze', model: 'opus', effort: 'high' }),
  () => agent(vid('v2-dock-a', 'an ios27 dock + glass + aurora interaction sequence (dock morphing / contextual change / glass transitions)'), { label: 'video:dock-a', phase: 'Analyze', model: 'opus', effort: 'high' }),
  () => agent(vid('v3-dock-b', 'an ios27 dock + glass + aurora interaction sequence (the longer recording — dock morphing, layers, sub-docks, aurora generative demos to match/better)'), { label: 'video:dock-b', phase: 'Analyze', model: 'opus', effort: 'high' }),
]);

phase('Synthesize');
const synth = await agent(
  'You are the ios27-REFERENCE synthesizer + challenger. READ the 3 video analyses (' + DIR + 'v1-tabs-glass/ANALYSIS.md, ' + DIR + 'v2-dock-a/ANALYSIS.md, ' + DIR + 'v3-dock-b/ANALYSIS.md) + the dot-flow surpass-reference frames (' + DIR + 'v4-dotflow/frames/, the background glass-ui must approach-but-far-surpass). SYNTHESIZE: (1) the IOS27-REFERENCE TARGET — the consolidated set of ios27 behaviours glass-ui must MATCH or BETTER (the dock bi-directional morph, the contextual form/function change, the sub-dock goo-split, the shrunken/layered states, the tab liquid indicator, the album fade-up/out glass transition, the aurora generative quality); (2) the WAVE DELTAS — for each target, the glass-ui gap + the wave that closes it (W-DOCK-HUB-API, W-DOCK-MORPH-FAMILY, W-IOS27-SUFFUSE, W-LIQUID-ENTRANCE-GENERAL, W-AURORA-METALLIC, the tabs waves) — HARDEN the wave with the specific ios27 fidelity bar; (3) the dot-flow surpass-target for W-DOTFLOW-REBUILD; (4) the CONVERGENCE % (how much of the ios27 reference is already met vs the gap). WRITE ' + DIR + 'IOS27-REFERENCE.md. Be the ruthless challenger — name what glass-ui must BUILD to hit/beat the input.' + NORTH,
  { label: 'synth:ios27-reference', phase: 'Synthesize', model: 'opus', effort: 'high' }
);
log('ios27 video-audit synthesized -> IOS27-REFERENCE.md');
return { analyzed: analyses.filter(Boolean).length, synthesized: !!synth };
