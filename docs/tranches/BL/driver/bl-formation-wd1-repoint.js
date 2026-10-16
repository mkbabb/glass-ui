export const meta = {
  name: 'bl-formation-wd1-repoint',
  description: "BL formation: re-point wave W-D.1 at D1's convergence record (pass-13 kit, chain 6fdd4ec7, VALUE-SCC over src and scripts, §0 items folded into §3, the FLOOR.md recipe line), then a fresh critic; repeats once if the critic says AMEND",
  phases: [{ title: 'Re-point' }, { title: 'Critique' }],
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
for (const k of [1, 2]) {
  phase('Re-point')
  const prev = k === 1 ? '' : `\nRead ${W}/W-D.1-CRITIQUE-${k - 1}.md and cure every refuted item.`
  const a = await retry(() => agent(`You are the W-D.1 RE-POINT seat (round ${k}) of BL formation. ${ID}\n${FENCE('repoint' + k)}\n${RULE}\n${CHECK}${prev}\nTASK: amend ${W}/W-D.1.md in place (and ${W}/INDEX.md's W-D.1 row, and the one FLOOR.md recipe line under ${S}/floor/FLOOR.md) so C-1..C-7 hold. Replay the converged chain in your own worktree (pass-13/B-kit) to re-read every number the wave states about the converged tree, D1-G3's VALUE-SCC over src and scripts included. Keep a short change list at the end of ${W}/W-D.1.md only if the wave's format already has one; otherwise put it in ${W}/W-D.1-REPOINT.md. Return JSON {model_id, report_path, summary, changed, open_gaps}.`, { label: `WD1-repoint-${k}`, phase: 'Re-point', model: 'opus', schema: REP }))
  if (!a) { log(`re-point round ${k} failed twice; stopping`); break }
  phase('Critique')
  const c = await retry(() => agent(`You are a FRESH adversarial CRITIC (round ${k}) of the W-D.1 re-point. You wrote none of it. ${ID}\n${FENCE('crit' + k)}\n${RULE}\n${CHECK}\nRead ${W}/W-D.1.md, ${W}/INDEX.md, the change list and ${S}/REGISTRY.md §P13. Check C-1..C-7 and only those, each PASS or FAIL with the command or line that decides it; replay the chain yourself for C-2 and C-4. Verdict UPHELD when all seven pass, AMEND otherwise. Write ${W}/W-D.1-CRITIQUE-${k}.md. Return JSON {model_id, report_path, summary, refuted, verdict}.`, { label: `WD1-crit-${k}`, phase: 'Critique', model: 'opus', schema: CRIT }))
  rounds.push({ round: k, verdict: c?.verdict, refuted: c?.refuted?.length, summary: c?.summary?.slice(0, 600) })
  if (!c || c.verdict === 'UPHELD') break
}
return { rounds }
