export const meta = {
  name: 'bl-formation-wd1-confirm',
  description: "BL formation: confirming critics on the W-D.1 re-point (rounds 3 and 4 on the fixed C-1..C-7 checklist); two consecutive UPHELD close it, an AMEND stops for the driver's cure",
  phases: [{ title: 'Critique' }],
}
const ROOT = '/Users/mkbabb/Programming/glass-ui'
const SP = '/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl'
const S = 'docs/tranches/BL/design/structure'
const W = 'docs/tranches/BL/waves'
const ID = `Assert your model id from your own system identity (expect claude-opus-5-5); if not Opus, say so and stop.`
const FENCE = (label) => `FENCES: tranche development only: no edits to tracked source in ${ROOT} (src/, demo/, scripts/, tests, package files); never git add/commit/stash/checkout/reset/restore; never read ~/.claude (running ~/.claude/guard/guarded is required); sibling repos READ-ONLY. Any replay or gate run happens only in your own worktree: git worktree add ${SP}/formation/wd1-${label}/wt HEAD, symlink node_modules from ${ROOT}, git worktree remove --force before returning, then remove ${SP}/formation/wd1-${label}/. MACHINE LAW: every build, replay or test through ~/.claude/guard/guarded -- <cmd> (--light --rss-gb 8 if the heavy queue holds you over 30 min); vitest --maxWorkers=2; no browser needed; nothing left running; if guarded refuses on the kernel zone count (13M), stop and say so. Numbers come from commands you ran.`
const RULE = `Read ${S}/REGISTRY.md's "Pass 13" part (§P13-*: the convergence record, what passes to formation, P9-G6, P11-G3, P13-G1) and ${S}/RULINGS.md. The convergence record is the one source of record for D1's facts: cite it, never restate a number it does not carry. The project's writing rules: plain declarative prose, no history or "previously" language in the wave body (greenfield: the wave describes what it lands), em dashes without spaces, no editorializing.`
const REP = { type: 'object', properties: { model_id: { type: 'string' }, report_path: { type: 'string' }, summary: { type: 'string' }, changed: { type: 'array', items: { type: 'string' } }, open_gaps: { type: 'array', items: { type: 'string' } } }, required: ['model_id', 'report_path', 'summary', 'open_gaps'] }
const CRIT = { type: 'object', properties: { model_id: { type: 'string' }, report_path: { type: 'string' }, summary: { type: 'string' }, refuted: { type: 'array', items: { type: 'string' } }, verdict: { type: 'string', enum: ['UPHELD', 'AMEND'] } }, required: ['model_id', 'report_path', 'summary', 'refuted', 'verdict'] }
const retry = async (fn) => { const a = await fn(); return a ?? await fn() }
const CHECK = `THE FIXED CHECKLIST (critics may not add items): C-1 every citation of the kit, chain, digest, floor base, datum and battery in ${W}/W-D.1.md and ${W}/INDEX.md's W-D.1 row names the pass-13 convergence record's values (kit pass-13/B-kit, chain 6fdd4ec7…, 126 steps, floor base 6773b4ec…, S70 datum 2,920,386), and no pass-4 kit, 472cf493 or wt2 reading stands as the wave's base; C-2 D1-G3's VALUE-SCC reads both src and scripts, and its stated reading on the converged tree is a number the critic reproduces from a fresh replay; C-3 W-D.1 §0 items 2, 3 and 5 are folded into §3 steps 5 and 7 as REGISTRY §P13 places them, and §0 holds no stale item; C-4 every gate's "HEAD reading" and "converged tree" column is reproduced by the critic in its own worktree (or the row says why it cannot run without a browser); C-5 FLOOR.md's recipe line (P11-G3) and the P13-G1 qualifier land where the record says; C-6 the waves that read W-D.1's landing (W-D.2, W-C.1, W-L.8, W-C.2) cite W-D.1 consistently with the re-pointed text; C-7 the writing rules hold in every changed line.`

const rounds = []
for (const k of [3, 4]) {
  phase('Critique')
  const c = await retry(() => agent(`You are a FRESH adversarial CRITIC (round ${k}) of the W-D.1 re-point. You wrote none of it and no earlier critique. ${ID}\n${FENCE('crit' + k)}\n${RULE}\n${CHECK}\nRead ${W}/W-D.1.md, ${W}/INDEX.md, ${W}/W-D.1-REPOINT.md (its driver-cure section last), ${W}/W-D.1-CRITIQUE-2.md${k === 4 ? ` and ${W}/W-D.1-CRITIQUE-3.md` : ''} and ${S}/REGISTRY.md §P13. Check C-1..C-7 and only those, each PASS or FAIL with the command or line that decides it; replay the chain yourself for C-2 and C-4. Under C-6, a count W-D.2 states for the converged tree must be the converged reading; a count it states for HEAD must be labelled HEAD. Verdict UPHELD when all seven pass, AMEND otherwise. Write ${W}/W-D.1-CRITIQUE-${k}.md. Return JSON {model_id, report_path, summary, refuted, verdict}.`, { label: `WD1-crit-${k}`, phase: 'Critique', model: 'opus', schema: CRIT }))
  rounds.push({ round: k, verdict: c?.verdict, refuted: c?.refuted, summary: c?.summary?.slice(0, 900) })
  if (!c || c.verdict !== 'UPHELD') break
}
return { rounds }
