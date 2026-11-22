export const meta = {
  name: 'atlas-dock-forced-layout-triage',
  description: 'Place atlas speed finding: GlassDock forces 23-32 ms of layout at setup on /speedtest (glass 10.1.2); find the exact read from atlas traces, map it to master, 11.1.1 and the dock branch, place it (read-only, Opus), then an adversarial verify',
  phases: [{ title: 'Place' }, { title: 'Verify' }],
}
const G = '/Users/mkbabb/Programming/glass-ui'
const REL = G + '/.claude/worktrees/release-11.1.1'
const DOCK = G + '/.claude/worktrees/bl/dock/wi8'
const AT = '/Users/mkbabb/Programming/sci-report'
const OUT = '/Users/mkbabb/Programming/.u-build/out/lt/look'
const OID = 'Assert your model id from your own system identity first (expect claude-opus-5-5); if you are not Opus, say so and stop.'
const RO = 'You read and judge; you change no file in any repo, run no build, test or browser, and send no message. Never run find, du, rg, tree or ls -R over /, ~, /Users or /Volumes; search only inside the paths named here (' + G + ', ' + AT + ', ' + OUT + '). Use git -C and git show for other trees; check nothing out. Traces can be large: read them with python or jq over the named files, not whole into context.'
const CTX = 'The finding (atlas, sci-report-89, 2026-11-22): GlassDock reads offsetHeight while it sets up, forcing 23 to 32 ms of layout in about half of /speedtest\'s point mounts at 390 px with the CPU slowed 4x, the same on atlas production (6957ac95, glass 10.1.2) and its candidate; moving the read to the next frame or a ResizeObserver would take a long task under 50 ms. Write-up: ' + AT + '/atlas/docs/tranches/U/design/UNION-SPEED-1.md (the /speedtest section: perfn-st2, trace-st1); probe outputs under ' + OUT + '/union-2/ and the speed-1 folder it names. glass trees: master ' + G + ' (11.1.0 plus docs); 11.1.1 open on ' + REL + ' (release/11.1.1); the dock redesign for 11.2.0 on ' + DOCK + ' (branch bl/dock/wi8, tip 575084358 or later); 10.1.2 is tag v10.1.2. 11.1.2 scope: ' + G + '/docs/tranches/BL/driver/glass-11.1.1-scope.md (its RO-loop row at about :134 audits every ResizeObserver site); INBOUND ' + G + '/docs/tranches/BL/audit/INBOUND.md. Release rule: a patch (11.1.2) takes a defect cure that removes no export or token and changes no default; a change that lands inside the dock redesign\'s rewritten code belongs to 11.2.0. Motion law: where a frame-late read would show as an instant change on first paint, the first value is placed without a tween and later values tween.'
const ITEM = { type: 'object', properties: {
  read: { type: 'string', description: 'the exact read: file:line on v10.1.2 and the stack the trace shows (function names, chunk and character offset)' },
  on_master: { type: 'string' }, on_11_1_1: { type: 'string' }, on_dock_branch: { type: 'string' },
  verdict: { type: 'string', enum: ['glass defect', 'already cured', 'consumer side', 'duplicate', 'unconfirmed'] },
  release: { type: 'string', enum: ['11.1.2', '11.2.0', '11.1.2 and 11.2.0', 'none'] },
  dedupe_of: { type: 'string' }, cure: { type: 'string', description: 'root, smallest cure, the witness (a trace of /speedtest-like mounts or glass\'s own page with forced layout before/after), and what must not change on first paint' },
  evidence: { type: 'string' }, reply: { type: 'string', description: 'one outward line for atlas: what glass will do and in which version; no internal ids' } },
  required: ['read', 'on_master', 'on_11_1_1', 'on_dock_branch', 'verdict', 'release', 'cure', 'evidence', 'reply'] }
const S = { type: 'object', properties: { model_id: { type: 'string' }, item: ITEM }, required: ['model_id', 'item'] }
const VS = { type: 'object', properties: { model_id: { type: 'string' }, item: ITEM, changed: { type: 'array', items: { type: 'string' } } }, required: ['model_id', 'item', 'changed'] }
phase('Place')
const p = await agent(OID + '\n' + RO + '\n\n' + CTX + '\n\nFind the exact read: from the trace files (trace-st1 and any speed-1 trace), take the forced Layout and UpdateLayoutTree events inside the /speedtest point-mount task and their stacks; map the glass frames to v10.1.2 source (the dist chunk atlas loads, then git show v10.1.2:<path>). Then find whether the same read, or its successor, runs at setup on master, on release/11.1.1 and on bl/dock/wi8, citing file:line on each. Decide the verdict and release, the root and the smallest cure (next frame, a ResizeObserver entry\'s borderBoxSize, or a read that is not needed at all), and whether the 11.1.2 RO-loop row already covers it. Return the schema.', { label: 'place', phase: 'Place', model: 'opus', schema: S })
if (!p) return null
const v = await agent(OID + '\n' + RO + '\n\n' + CTX + '\n\nYou are an ADVERSARIAL verifier. Another seat placed the finding:\n' + JSON.stringify(p.item, null, 1) + '\n\nTry to refute it: re-read the trace stacks yourself and check the named read is the one forcing the 23 to 32 ms (not a neighbour, not atlas\'s own code, not Vue\'s); check each tree\'s file:line; check the release against the rule; check the cure keeps first paint from changing instantly. Correct what does not hold. Return the item and list in `changed` what you changed and why.', { label: 'verify', phase: 'Verify', model: 'opus', schema: VS })
return v
