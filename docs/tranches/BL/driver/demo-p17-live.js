export const meta = {
  name: 'demo-p17-live',
  description: 'Read the deployed P17 on glass.babb.dev: cold first paint, a cold Code press at 390, and the Dialog arrival at 390, in both engines (one Opus seat; reads only)',
  phases: [{ title: 'Live' }],
}
const G = '/Users/mkbabb/Programming/glass-ui'
const WT = G + '/.claude/worktrees/bl/demo'
const D = G + '/docs/tranches/BL/design/demo-site'
const LAW = 'Machine law (~/.claude/CLAUDE.md, binding): every browser run through ~/.claude/guard/guarded (never --light); Playwright WebKit only under guarded --exclusive webkit; headless only; one browser per run, a context per cell, closed in finally; nothing durable in /tmp; never find/du/rg/tree/ls -R over /, ~, /Users or /Volumes; stop nothing by a pgrep pattern. One browser run of yours at a time. If guarded REFUSES (not a queue wait), stop and report what ran. The battery is never a reason to stop or wait.'
const S = { type: 'object', properties: { model_id: { type: 'string' }, pass: { type: 'boolean' }, readings: { type: 'string' }, faults: { type: 'array', items: { type: 'string' } }, not_run: { type: 'array', items: { type: 'string' } }, summary: { type: 'string' } }, required: ['model_id', 'pass', 'readings', 'faults', 'summary'] }

phase('Live')
const r = await agent('Assert your model id from your own system identity first (expect claude-opus-5-5); if you are not Opus, say so and stop.\n' + LAW + '\n\nThe demo pass P17 (bl/demo d91764978, merged to master as f0a2d0273) is deployed to https://glass.babb.dev (deploy run 45000662694 green; scripts/check-live.mjs PASS in Chromium and WebKit, 8 loads each). You read the live site; you change no source, deploy nothing, and touch no other site. Read ' + D + '/build/P17.md (its Close and Cure sections) and ' + D + '/build/P17-cure-verify.md first: they name four reads owed after the deploy. Reuse the cure\'s probes in ' + WT + '/.p17/cure/ (and .p17/close/) by pointing them at the live origin; copy a probe into ' + D + '/build/shots/P17/live/ if it needs a change. Every load on a cold cache (a fresh context, cache disabled where the engine allows).\n'
  + '1. Cold first contentful paint of /, /data/metric and /forms/number-field: Chromium with CDP network emulation (400 ms RTT, 1.6 Mbps down) three reads each, and WebKit without emulation five reads each; the code face requested only on routes whose row says codeFace; the mono glyphs on the first painted frame and 2 s later the same.\n'
  + '2. A cold "Code" press at 390 by touch and at 1440 by click, three routes, both engines, filmed: the chevron and the panel move on the press\'s frame or the next; no instant change of colour or face inside the code block.\n'
  + '3. Two more 390 arrival captures of Dialog (the library\'s two-state focus veil, O-390 e), both engines, light and dark.\n'
  + '4. The stage swap on two routes at 1440 in WebKit: the enter and the leave each at most 0.2 per 60 Hz frame read from the film\'s own clock.\n'
  + 'Write a "Live" section into ' + D + '/build/P17.md with each reading and anything not run; keep only crops a reading uses under ' + D + '/build/shots/P17/live/ (do not stage). pass means no fault: no first paint waits on a font, the press moves on its frame, nothing inside the code block changes instantly, the fades hold. Return the schema.', { label: 'p17-live', phase: 'Live', model: 'opus', schema: S })
return r
