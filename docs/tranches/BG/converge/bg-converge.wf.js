/**
 * BG convergence engine — the user's 5-step iterative loop, per workstream, INTERNAL to the workflow.
 *
 * A PASS = research-8 (batches of 3) -> synth-1 -> prototype-fleet (batches of 3, worktree build-test)
 *          -> critique-fleet (batches of 3, returns convergence%) -> final-synth-1 (agglomerate, %).
 * The workflow loops passes with newfound context until the final synthesis reports 100% convergence
 * (or MAX_PASSES). On 100% it returns the converged spec — the exact wave set to develop out.
 *
 * Invoke per workstream:  Workflow({ scriptPath: <this>, args: { ws, directives, maxPasses } })
 *   args.ws = { id, title, brief, seedAuditFiles[], convergenceCriteria, candidateWaves[], defectsCovered[] }
 *
 * Batches of 3 throughout (the rate-wall discipline). Opus fanout. Tranche-DEV: prototypes test-implement
 * in DISCARDED worktrees to PROVE buildability; nothing lands to master — the deliverable is the converged
 * spec + the validated approach. The actual src landing happens only after the user greenlights the tranche.
 */
export const meta = {
  name: 'bg-converge',
  description: 'BG convergence loop for ONE workstream: research-8 -> synth -> prototype-fleet (worktree build-test) -> critique-fleet (%conv) -> re-synth, looped to 100%. Batches of 3. Returns the converged wave-set spec.',
  phases: [
    { title: 'Research', detail: 'up to 8 agents: web SOTA · codebase · tranches · refs · constraints · KISS/DRY · risk' },
    { title: 'Synthesize', detail: 'ONE agent → cogent spec + prototype-item list' },
    { title: 'Prototype', detail: 'fleet: greenfield brainstorm + worktree test-implement' },
    { title: 'Critique', detail: 'fleet: harden/challenge/refine → convergence %' },
    { title: 'Re-synthesize', detail: 'ONE agent → agglomerate, convergence %, next-pass context' },
  ],
}

const ws = args?.ws
const DIRECTIVES = args?.directives ?? ''
const MAX_PASSES = args?.maxPasses ?? 4
if (!ws) throw new Error('bg-converge requires args.ws')
const DIR = `docs/tranches/BG/converge/${ws.id}`
const LAWS = `Cardinal laws (binding): NO quick solutions / NO workarounds — idiomatic gestalt first-principles only; NO legacy code (clean breaks, no aliases/shims/dual-paths); KISS + DRY + DEFT integration (a union, never a bolt-on/fork); colocate composables with components; break >500-line files into colocated sub-dirs WITHOUT contrivance; presets-in-consumers; warm/weighty/liquid iOS-27 identity (12 laws of animation, cartoon-technicolor punch, aristotelian √φ, perfected glass+paper morphism); Chrome AND Safari; foreign-tree fence ABSOLUTE (edit ONLY glass-ui).`

// ── schemas ──
const RESEARCH_SCHEMA = { type:'object', additionalProperties:false, required:['angle','findings'],
  properties:{ angle:{type:'string'}, findings:{type:'string', description:'the concrete, evidenced findings (file:line / URL / spec) — dense, not prose'}, recommendations:{type:'array',items:{type:'string'}} } }
const SYNTH_SCHEMA = { type:'object', additionalProperties:false, required:['specFile','prototypeItems'],
  properties:{ specFile:{type:'string'}, summary:{type:'string'},
    prototypeItems:{ type:'array', items:{ type:'object', additionalProperties:false, required:['id','title','brief','mode'],
      properties:{ id:{type:'string'}, title:{type:'string'}, brief:{type:'string', description:'what to prototype + the gestalt approach to prove'}, mode:{type:'string', enum:['implement','spec'], description:'implement=worktree build-test a real proof; spec=design proof + concrete code sketch'} } } } } }
const PROTO_SCHEMA = { type:'object', additionalProperties:false, required:['item','approach','buildPassed','convergenceEstimate','learnings'],
  properties:{ item:{type:'string'}, approach:{type:'string', description:'the gestalt approach, validated'}, codeSketch:{type:'string', description:'the concrete code (the actual edit/diff/snippet) that worked'}, buildPassed:{type:'boolean', description:'did vue-tsc/build pass in the worktree (false for spec-mode)'}, convergenceEstimate:{type:'number', description:'0-100 your honest estimate this approach is correct + complete'}, learnings:{type:'string', description:'what worked, what broke, the surprises — the hardening fuel'} } }
const CRITIQUE_SCHEMA = { type:'object', additionalProperties:false, required:['item','convergencePct','verdict','critique'],
  properties:{ item:{type:'string'}, convergencePct:{type:'number', description:'0-100: is this approach correct, complete, idiomatic, KISS, on-identity, Safari-safe, a11y/perf-sound?'}, verdict:{type:'string', enum:['converged','refine','reject']}, critique:{type:'string'}, mustFix:{type:'array',items:{type:'string'}} } }
const FINAL_SCHEMA = { type:'object', additionalProperties:false, required:['convergedSpecFile','convergencePct','residualGaps','nextPassContext'],
  properties:{ convergedSpecFile:{type:'string'}, convergencePct:{type:'number', description:'0-100 OVERALL workstream convergence — the gate'}, waveSet:{type:'array',items:{type:'string', description:'BG.W-* : intent'}}, residualGaps:{type:'array',items:{type:'string'}}, nextPassContext:{type:'string', description:'the focused brief for the next pass (the unconverged frontier) — empty if 100%'} } }

const ANGLES = [
  { key:'web-sota', task:`Research the WEB for SOTA + iOS-26/27 "Liquid Glass" technique for THIS workstream's domain (use WebSearch/WebFetch). Find concrete, current techniques, Apple HIG guidance, reference implementations, the canonical motion/material/interaction patterns. Cite URLs.` },
  { key:'codebase-deep', task:`Deep-read the HEAD glass-ui SOURCE for this workstream (Read/Grep/Glob/Bash). Map every relevant file:symbol, the current mechanism, the contrivances, the breakage. Be exhaustive + precise (file:line).` },
  { key:'tranche-history', task:`Read the relevant TRANCHE HISTORY + design precepts for this workstream (docs/tranches/*, docs/precepts/*, CLAUDE.md). What was already tried, decided, booked, retired? What recurring pattern/lesson applies? Avoid re-litigating settled fences; surface the chronic ones to fix.` },
  { key:'seed-audit', task:`Synthesize the SEED AUDIT files (${(ws.seedAuditFiles||[]).join(', ')}) into this workstream's current-truth + the proposed fixes. Extract the concrete defect root-causes + the proposed waves + the folded deferred items. Reconcile any disagreement between audit files.` },
  { key:'reference', task:`Analyze REFERENCE material for this workstream (the Siri recordings at scratchpad/evidence/frames-* for the Siri WS; iOS apps / Apple's design gallery / competitor design systems for the rest; the captured screenshots at scratchpad/evidence/). Distill the target design language + the concrete gestalt the prototypes must hit.` },
  { key:'constraints', task:`Enumerate the binding CONSTRAINTS for this workstream: a11y (PRM carves, focus, roving-tabindex, aria, contrast), perf (the one-GL-context-per-route budget, offscreen-pause, CLS reserve, bundle budget), Chrome+Safari (backdrop-filter:url bug, @supports gates, light-dark/oklch/contrast-color progressive enhancement), the token-first + component-over-class design axes. State the hard limits every wave must honor.` },
  { key:'kiss-dry', task:`The KISS/DRY/encapsulation/NO-LEGACY angle: what to DELETE, what to FOLD, what to colocate, the >500-line splits, the dead/single-consumer symbols, the legacy shims/aliases/dual-paths to remove. Name concrete files/symbols/tokens. Simpler-thing-that-replaces-it for every contrivance.` },
  { key:'risk', task:`Risk + feasibility scan: the HARDEST sub-problems, the things most likely to break (the headless-green/visually-broken trap, the Safari metaball/blur gaps, the spring/transition collisions), and the concrete PROTOTYPE TARGETS that must be build-proven before the spec can be trusted. What would falsify the proposed approach?` },
]

function chunk(arr, n) { const out=[]; for (let i=0;i<arr.length;i+=n) out.push(arr.slice(i,i+n)); return out }
async function batched3(items, mk) { const res=[]; for (const b of chunk(items,3)) { res.push(...(await parallel(b.map(mk))).filter(Boolean)); } return res }

let passNum = 0
let priorContext = ''
let convergencePct = 0
let convergedSpecFile = ''
let waveSet = []

while (passNum < MAX_PASSES && convergencePct < 100) {
  passNum++
  log(`══ ${ws.id} PASS ${passNum} ══  (prior convergence ${convergencePct}%)`)

  // ── STEP 1: research (up to 8 angles, batches of 3) ──
  const ctxHdr = `WORKSTREAM ${ws.id} — ${ws.title}\nBRIEF: ${ws.brief}\nCONVERGENCE BAR: ${ws.convergenceCriteria}\nCANDIDATE WAVES: ${(ws.candidateWaves||[]).join('; ')}\nDEFECTS: ${(ws.defectsCovered||[]).join(', ')}\nUSER DIRECTIVES: ${DIRECTIVES}\n${passNum>1 ? `\nTHIS IS PASS ${passNum}. Focus ONLY on the unconverged frontier:\n${priorContext}\n` : ''}\n${LAWS}`
  const research = await batched3(ANGLES, a => () =>
    agent(`You are a RESEARCH agent (angle: ${a.key}) for the glass-ui BG convergence loop.\n\n${ctxHdr}\n\nYOUR ANGLE: ${a.task}\n\nReturn dense, evidenced findings + recommendations. Verify against real HEAD source / live URLs — no assumptions.`,
      { model:'opus', phase:'Research', label:`${ws.id}/r:${a.key}/p${passNum}`, schema:RESEARCH_SCHEMA }
    ).then(r => ({ angle:a.key, ...r })).catch(()=>null))

  // ── STEP 2: synthesize → spec + prototype items ──
  const researchDigest = research.map(r => `### ${r.angle}\n${r.findings}\nRECS: ${(r.recommendations||[]).join(' | ')}`).join('\n\n')
  const synth = await agent(
    `You are the SYNTHESIS agent for workstream ${ws.id} (pass ${passNum}).\n\n${ctxHdr}\n\nThe research fleet returned:\n\n${researchDigest}\n\nSynthesize ONE cogent, idiomatic, gestalt SPECIFICATION + plan for this workstream that resolves the brief + every covered defect + the user directives, honoring the cardinal laws. ${passNum>1 ? 'INCORPORATE the prior converged spec at '+convergedSpecFile+' (Read it) and ADVANCE it on the unconverged frontier — do not restart.' : ''}\n\nWrite the spec to ${DIR}/SPEC-pass${passNum}.md (structured: GESTALT GOAL · MECHANISM (the idiomatic approach, concrete) · FILES TOUCHED · the BG.W-* wave breakdown · the acceptance/real-paint-π bar · folded deferred items · open risks).\n\nThen return the specFile + a list of 3-6 PROTOTYPE ITEMS — the riskiest/most-load-bearing slices that MUST be build-proven (mode:'implement' → a worktree build-test of a real proof) or design-proven (mode:'spec' → a concrete code sketch). Pick items whose failure would falsify the spec.`,
    { model:'opus', phase:'Synthesize', label:`${ws.id}/synth/p${passNum}`, schema:SYNTH_SCHEMA })
  convergedSpecFile = synth.specFile

  // ── STEP 3: prototype fleet (greenfield brainstorm + worktree test-implement), batches of 3 ──
  const protos = await batched3(synth.prototypeItems, it => () =>
    agent(`You are a PROTOTYPE agent for workstream ${ws.id} (pass ${passNum}). ${it.mode === 'implement'
        ? 'You have your OWN isolated git worktree of glass-ui — IMPLEMENT a real, throwaway proof of this item, then run `npx vue-tsc --noEmit` (and `npm run build` if the change is build-relevant) to PROVE it compiles/builds. The worktree is DISCARDED; the deliverable is the validated approach + the concrete working code, returned (NOT a file write — your worktree is thrown away).'
        : 'Produce a design proof: brainstorm the gestalt approach from first principles, then write the CONCRETE code (the actual edit/diff/snippet you would land) as your codeSketch. Reason carefully about correctness, Safari, a11y, KISS.'}\n\n${ctxHdr}\n\nThe synthesized spec is at ${synth.specFile} (Read it). PROTOTYPE THIS ITEM:\nID: ${it.id}\nTITLE: ${it.title}\nBRIEF: ${it.brief}\n\nGreenfield it — survival of the fittest: prove the SIMPLEST idiomatic thing that fully works. Default-broken skepticism. Return your honest convergenceEstimate (0-100), the working codeSketch, buildPassed, and the learnings (what worked, what broke, the surprises).`,
      { model:'opus', phase:'Prototype', label:`${ws.id}/proto:${it.id}/p${passNum}`, schema:PROTO_SCHEMA, ...(it.mode==='implement' ? { isolation:'worktree' } : {}) }
    ).then(p => ({ item:it.id, title:it.title, ...p })).catch(()=>({ item:it.id, title:it.title, error:true, convergenceEstimate:0, buildPassed:false, learnings:'prototype agent errored' })))

  // ── STEP 4: critique fleet (harden/challenge/refine → convergence%), batches of 3 ──
  const critiques = await batched3(protos.filter(p=>!p.error), p => () =>
    agent(`You are a CRITIQUE agent for workstream ${ws.id} (pass ${passNum}) — adversarial, demanding, default-skeptical. Your job is to HARDEN: challenge the prototype, find where it is wrong / incomplete / contrived / off-identity / Safari-broken / a11y-or-perf-unsound / not-actually-KISS, and refine it.\n\n${ctxHdr}\n\nThe spec is at ${convergedSpecFile} (Read it). The prototype for "${p.title}" reported:\nAPPROACH: ${p.approach}\nBUILD PASSED: ${p.buildPassed}\nSELF-ESTIMATE: ${p.convergenceEstimate}%\nCODE SKETCH:\n${(p.codeSketch||'').slice(0,2400)}\nLEARNINGS: ${p.learnings}\n\nVerify the claims against real HEAD source where possible. Return an HONEST convergencePct (0-100: correct AND complete AND idiomatic AND KISS AND on-identity AND Safari-safe AND a11y/perf-sound — a prototype that "builds" but is contrived or visually-wrong is NOT converged; recall the headless-green/visually-broken trap), a verdict, the critique, and the concrete mustFix list. Do not inflate — a real product bar.`,
      { model:'opus', phase:'Critique', label:`${ws.id}/crit:${p.item}/p${passNum}`, schema:CRITIQUE_SCHEMA }
    ).then(c => ({ ...c })).catch(()=>null))

  // ── STEP 5: final synthesis → agglomerate, convergence%, next-pass context ──
  const protoDigest = protos.map(p=>`- ${p.title}: build=${p.buildPassed} est=${p.convergenceEstimate}% — ${p.learnings?.slice(0,300)}`).join('\n')
  const critDigest = critiques.map(c=>`- ${c.item}: ${c.convergencePct}% [${c.verdict}] — ${c.critique?.slice(0,400)} | MUSTFIX: ${(c.mustFix||[]).join('; ')}`).join('\n')
  const final = await agent(
    `You are the FINAL SYNTHESIS lead for workstream ${ws.id} (pass ${passNum}). Agglomerate the research, the spec, the prototypes, and the critiques into the CONVERGED specification for this workstream.\n\n${ctxHdr}\n\nSPEC: ${convergedSpecFile} (Read it).\nPROTOTYPE RESULTS:\n${protoDigest}\n\nCRITIQUE RESULTS:\n${critDigest}\n\nFOLD the critiques' mustFix into the spec; adopt the validated prototype approaches; resolve contradictions. Write the CONVERGED spec to ${DIR}/SPEC-pass${passNum}-converged.md (the same structure, hardened — each BG.W-* wave now carries its validated mechanism + the real-paint-π acceptance bar + the folded deferred items).\n\nReturn: the convergedSpecFile, the OVERALL convergencePct (0-100 — the honest gate: 100 ONLY if every prototype item is converged per its critique AND the brief + every covered defect + every user directive is fully + idiomatically resolved AND no residual gap remains; a single 'refine'/'reject' verdict or an unmet directive caps it below 100), the waveSet (BG.W-* : intent, ready to develop out), the residualGaps, and the nextPassContext (the focused brief for the next pass = the unconverged frontier; empty string if 100%).`,
    { model:'opus', phase:'Re-synthesize', label:`${ws.id}/final/p${passNum}`, schema:FINAL_SCHEMA })

  convergencePct = final.convergencePct
  convergedSpecFile = final.convergedSpecFile
  waveSet = final.waveSet || waveSet
  priorContext = final.nextPassContext || ''
  log(`══ ${ws.id} PASS ${passNum} → ${convergencePct}% ══  ${convergencePct>=100 ? 'CONVERGED' : 'residual: '+(final.residualGaps||[]).join('; ')}`)
}

return {
  workstream: ws.id,
  passes: passNum,
  convergencePct,
  converged: convergencePct >= 100,
  convergedSpecFile,
  waveSet,
  residualContext: priorContext,
}
