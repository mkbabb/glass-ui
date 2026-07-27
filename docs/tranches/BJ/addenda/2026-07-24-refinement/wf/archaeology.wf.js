export const meta = {
  name: 'session-tranche-archaeology',
  description: 'The reckoning: unearth 100+ sessions + 116 tranches — recurrence × implementation matrix, re-exhort/prune verdicts, the lessons ledger',
  phases: [
    { title: 'Unearth', detail: 'Opus swarm — every session shard, every tranche dir, physically read', model: 'opus' },
    { title: 'Distill', detail: 'Fable batched passes — the de-duplicated registers', model: 'fable' },
    { title: 'Verify', detail: 'Opus — implementation-state claims grepped at HEAD', model: 'opus' },
    { title: 'Reckoning', detail: 'tri-fold — Fable ∥ Opus arms → Fable apotheosis', model: 'fable' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const ARCH = '/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/archaeology'
const CANON = `Repo /Users/mkbabb/Programming/glass-ui, HEAD 26a41fe3, tranche BJ. You author no repo byte;
your text is the deliverable. State your modelId. Dense rows, verbatim owner quotes preserved exactly
(typos included — the owner's words are the source of record), em dashes without spaces. Sibling repos
are READ-ONLY. Facts only in unearth work — no interpretation, no softening.`

const CLAUDE_SHARDS = [
  { key: 'bc-era-a', files: ['glass-ui__12963045-86c9-4e30-a230-b35ed1f4676b__parta.jsonl'] },
  { key: 'bc-era-b', files: ['glass-ui__12963045-86c9-4e30-a230-b35ed1f4676b__partb.jsonl'] },
  { key: 'bc-era-c', files: ['glass-ui__12963045-86c9-4e30-a230-b35ed1f4676b__partc.jsonl'] },
  { key: 'bc-era-d', files: ['glass-ui__12963045-86c9-4e30-a230-b35ed1f4676b__partd.jsonl'] },
  { key: 'bc-era-e', files: ['glass-ui__12963045-86c9-4e30-a230-b35ed1f4676b__parte.jsonl'] },
  { key: 'bc-era-f', files: ['glass-ui__12963045-86c9-4e30-a230-b35ed1f4676b__partf.jsonl'] },
  { key: 'bg-era-a', files: ['glass-ui__1cec2ef4-8e9b-486a-a1f7-877fa77a0ade__parta.jsonl'] },
  { key: 'bg-era-b', files: ['glass-ui__1cec2ef4-8e9b-486a-a1f7-877fa77a0ade__partb.jsonl'] },
  { key: 'bg-era-c', files: ['glass-ui__1cec2ef4-8e9b-486a-a1f7-877fa77a0ade__partc.jsonl'] },
  { key: 'bg-era-d', files: ['glass-ui__1cec2ef4-8e9b-486a-a1f7-877fa77a0ade__partd.jsonl'] },
  { key: 'bi-era-a', files: ['glass-ui__e79fce3f-d24e-4654-8b27-d029653fedbe__parta.jsonl'] },
  { key: 'bi-era-b', files: ['glass-ui__e79fce3f-d24e-4654-8b27-d029653fedbe__partb.jsonl'] },
  { key: 'bd-era', files: ['glass-ui__1a0455ed-edd3-4982-9b5d-a2c27aa2d6fb.jsonl'] },
  { key: 'bj-current', files: ['glass-ui__f7246310-06bc-4dbe-ba5d-5b9bbe793e21.jsonl'] },
  { key: 'small-bundle', files: ['glass-ui__07f72fcf-ffb7-4e11-b229-31555f8a9b79.jsonl', 'glass-ui__6140d0a2-8e47-4029-a52f-d5f7522b91ac.jsonl', 'glass-ui__b6be3111-171e-4694-9499-e55eab250e14.jsonl', 'glass-ui__b6d23e41-2f2a-4407-ba89-e126e9497583.jsonl', 'glass-ui__bb9e799f-bc6a-47f8-bb7e-aa5e5056c05a.jsonl', 'glass-ui__d62b74d4-411f-4775-b007-ec48caf28c2f.jsonl', '_image-census.jsonl'] },
]
const CODEX_SHARDS = ['a', 'b', 'c', 'd'].map(s => ({ key: `codex-${s}`, files: [`codex__shard${s}.jsonl`], dir: 'codex' }))

const TRANCHE_GROUPS = [
  { key: 'gu-early-1', dirs: ['C', 'D', 'D-II', 'E', 'F', 'H', 'I'] },
  { key: 'gu-early-2', dirs: ['IOS27-MICRO', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'V'] },
  { key: 'gu-ab-ao', dirs: ['AB', 'AB+1', 'AB+2', 'AM', 'AN', 'AO'] },
  { key: 'gu-ap-au', dirs: ['AP', 'AQ', 'AR', 'AS', 'AT', 'AU'] },
  { key: 'gu-av-az', dirs: ['AV', 'AW', 'AX', 'AY', 'AZ'] },
  { key: 'gu-ba-bd', dirs: ['BA', 'BB', 'BC', 'BD'] },
  { key: 'gu-be-bh', dirs: ['BE', 'BF', 'BG', 'BH'] },
  { key: 'gu-bi-bj', dirs: ['BI', 'BJ'] },
]
const SIBLINGS = [
  { key: 'sib-slides', repo: 'slides' },
  { key: 'sib-valuejs', repo: 'value.js' },
  { key: 'sib-keyframes', repo: 'keyframes.js' },
  { key: 'sib-sci-fourier', repo: 'sci-report AND fourier-analysis (both)' },
]

const SESSION_UNEARTH = (shard, dir) => `${CANON}

UNEARTH — session-log archaeology, shard ${shard.key}. Read EVERY line of:
${shard.files.map(f => `${ARCH}/${dir}/${f}`).join('\n')}
Each line is one owner message ({t: timestamp, x: verbatim text}) extracted from the raw transcripts.
This is the owner's actual voice across months. Emit one row per SUBSTANTIVE directive:
WHEN | VERBATIM (the owner's exact words, trimmed to the directive core — never paraphrase) |
KIND (ecoute-moi / feedback / feature-request / steer / correction / rejection / screenshot-or-video-ref) |
TARGET (component / substrate / process / aesthetic / tranche) | INTENSITY (casual · firm · exasperated ·
repeated-within-shard). Skip pure acknowledgments ("continue", "yes"). Count what you skipped. At the
end: this shard's REPETITION SIGNALS — which demands the owner made more than once HERE, in which words.`

const TRANCHE_UNEARTH = (g) => `${CANON}

UNEARTH — tranche archaeology, group ${g.key}: docs/tranches/{${g.dirs.join(',')}}/ in glass-ui.
For EACH tranche read what exists of: PLAN.md, EXECUTION-PROGRESS.md, FINAL.md, FEEDBACK*.md, ASK*.md,
waves/ headings, coordination/ headings. Use git log --oneline -- <dir> where the docs are ambiguous.
Emit per tranche: one THESIS line (what this tranche was for), then rows:
WAVE/ITEM | PROMISED (one line) | STATE — LANDED (commit/evidence) / HALF-BAKED (landed then partially
reverted, or spec'd beyond what shipped — cite the gap) / DROPPED-SILENTLY / REJECTED (by whom, why) /
SUPERSEDED (by which later tranche) | EVIDENCE file:line or commit hash.
Then: this group's REPEATED-FAILURE PATTERNS (what kept going wrong across these tranches) and
CONTRIVANCE CANDIDATES (process artefacts, gate theatre, waves that existed for the process not the
library). Verify any LANDED claim you repeat by actually checking HEAD — a doc saying LANDED is a claim,
not evidence; ~29% of old paths are rotted.`

const SIBLING_UNEARTH = (s) => `${CANON}

UNEARTH — sibling tranche archaeology: /Users/mkbabb/Programming/${s.repo}/docs/tranches/ (READ-ONLY).
Extract ONLY glass-ui-relevant rows: consumer promises (what the sibling was told glass-ui would ship —
did it?), relay addenda received/executed, version-adopt waves (which glass-ui version, adopted or
stalled), defects the sibling attributes to glass-ui, and any owner directive quoted there that names
glass-ui. Same row discipline: ITEM | PROMISED | STATE | EVIDENCE. End with: what this consumer's
history says glass-ui keeps breaking or keeps failing to deliver.`

phase('Unearth')
const keyed = (key, p) => p.then(out => (out ? { key, out } : null))
const [claudeRows, codexRows, trancheRows, siblingRows] = await parallel([
  () => parallel(CLAUDE_SHARDS.map(sh => () => keyed(sh.key, agent(SESSION_UNEARTH(sh, 'claude'), { label: `unearth:${sh.key}`, phase: 'Unearth', model: 'opus', effort: 'high' })))),
  () => parallel(CODEX_SHARDS.map(sh => () => keyed(sh.key, agent(SESSION_UNEARTH(sh, 'codex'), { label: `unearth:${sh.key}`, phase: 'Unearth', model: 'opus', effort: 'high' })))),
  () => parallel(TRANCHE_GROUPS.map(g => () => keyed(g.key, agent(TRANCHE_UNEARTH(g), { label: `unearth:${g.key}`, phase: 'Unearth', model: 'opus', effort: 'high' })))),
  () => parallel(SIBLINGS.map(s => () => keyed(s.key, agent(SIBLING_UNEARTH(s), { label: `unearth:${s.key}`, phase: 'Unearth', model: 'opus', effort: 'high' })))),
])
const pick = (rows, keys) => rows.filter(Boolean).filter(r => keys.includes(r.key)).map(r => `===== ${r.key} =====\n${r.out}`).join('\n\n')
const all = (rows) => rows.filter(Boolean).map(r => `===== ${r.key} =====\n${r.out}`).join('\n\n')
log(`unearthed: ${claudeRows.filter(Boolean).length}/15 claude · ${codexRows.filter(Boolean).length}/4 codex · ${trancheRows.filter(Boolean).length}/8 tranche · ${siblingRows.filter(Boolean).length}/4 sibling`)

phase('Distill')
const DISTILL = (name, body) => `${CANON}

DISTILL — batched adjudication pass: ${name}. The unearthed rows follow. De-duplicate into CANONICAL
THEMES: for each theme — THEME (named in the owner's own vocabulary) | TIMES SAID (count the rows) |
FIRST SAID → LAST SAID | VERBATIM EXEMPLARS (2-3, exact) | ESCALATION ARC (did intensity rise?) |
CLAIMED STATE (what the rows say happened to it). Preserve minority/one-off directives in a short tail
list — a thing said once is not noise, it is just not yet a theme. No theme minting: every theme must
cite its rows.

${body}`

const [dClaudeEarly, dClaudeLate, dCodex, dTranche, dSibling] = await parallel([
  () => agent(DISTILL('claude sessions, BC/BD era', pick(claudeRows, ['bc-era-a', 'bc-era-b', 'bc-era-c', 'bc-era-d', 'bc-era-e', 'bc-era-f', 'bd-era', 'small-bundle'])), { label: 'distill:claude-early', phase: 'Distill', model: 'fable', effort: 'xhigh' }),
  () => agent(DISTILL('claude sessions, BG→BJ era (the recent voice — weight it)', pick(claudeRows, ['bg-era-a', 'bg-era-b', 'bg-era-c', 'bg-era-d', 'bi-era-a', 'bi-era-b', 'bj-current'])), { label: 'distill:claude-late', phase: 'Distill', model: 'fable', effort: 'xhigh' }),
  () => agent(DISTILL('codex sessions (the Sol/Luna era — the owner steering codex)', all(codexRows)), { label: 'distill:codex', phase: 'Distill', model: 'fable', effort: 'xhigh' }),
  () => agent(`${CANON}\n\nDISTILL — the IMPLEMENTATION LEDGER across 43 glass-ui tranches. Merge the group rows into one per-theme implementation history: THEME | TRANCHES THAT TOUCHED IT | NET STATE AT HEAD (landed / half-baked / dropped / ping-ponged — implemented then reverted then re-implemented) | THE REPEATED-FAILURE PATTERN if any. Then the CONTRIVANCE ROSTER: every candidate the groups flagged, deduped, ranked.\n\n${all(trancheRows)}`, { label: 'distill:tranches', phase: 'Distill', model: 'fable', effort: 'xhigh' }),
  () => agent(`${CANON}\n\nDISTILL — the CONSUMER LEDGER. Merge the sibling rows: what the constellation was promised vs got, per repo; the recurring glass-ui failure classes as consumers experience them.\n\n${all(siblingRows)}`, { label: 'distill:siblings', phase: 'Distill', model: 'fable', effort: 'xhigh' }),
])

phase('Verify')
const distillates = [
  { key: 'claude-early', d: dClaudeEarly }, { key: 'claude-late', d: dClaudeLate },
  { key: 'codex', d: dCodex }, { key: 'tranches', d: dTranche },
].filter(x => x.d)
const verified = await parallel(distillates.map(x => () =>
  agent(`${CANON}

VERIFY AT HEAD — banausic, exact. The distillate below carries per-theme CLAIMED STATE. For every theme
that claims an implementation state, determine the TRUE state at HEAD 26a41fe3 by grep/read/test — not
by trusting any doc. Emit: THEME | CLAIMED | TRUE AT HEAD (with the grep or file:line that proves it) |
VERDICT: TRUE / HALF-BAKED (say exactly which half) / FALSE / UNVERIFIABLE-STATICALLY (needs paint).
Consume ${REF}/EXEC-STATE.md first for the standing corrections (port 5400, census caveats).

${x.d}`, { label: `verify:${x.key}`, phase: 'Verify', model: 'opus', effort: 'high' })
    .then(v => ({ key: x.key, d: x.d, v }))))

phase('Reckoning')
const RECKONING = `${CANON}

THE RECKONING — the long-horizon deliverable. Inputs: era distillates + HEAD verifications + the
implementation ledger + the consumer ledger. Author the body of \`ARCHAEOLOGY.md\`:

§1 THE ECOUTE REGISTER — the de-duplicated master register of the owner's directives across ~1,500
messages and both harnesses: theme | times said | arc | verbatim exemplars | TRUE state at HEAD.
Answer the owner's pointed question directly: "how many more ecoute-moi's must this take" — for each
theme repeated ≥3 times, name what SPECIFICALLY failed to make it stick (the friction), and the one
structural change that retires it permanently.
§2 THE RECURRENCE × IMPLEMENTATION MATRIX — said-often × still-not-true = RE-EXHORT (these become
standing edicts, wave-anchored, born-RED where gateable); said-once × contrived-or-superseded = PRUNE;
said × done = RETIRE (stop re-auditing it); the ping-pong list (implemented↔reverted cycles — name the
cause each time).
§3 THE LESSONS LEDGER — the months-of-mistakes distillation: failure classes ranked by cost, each with
its mechanism and its structural cure. Include the process failures (gate theatre, doc-truth drift,
silent drops, worktree/wall losses) alongside the design failures.
§4 PLAN AMENDMENTS — concrete deltas to the BJ corpus: which extant waves in the terminal specs carry
contrivance to strike, which missing waves the register demands, which addenda rows to prune. File§ per
delta. Route to TERMINAL-ROSTER (the consolidation run) — do not re-author the roster.
§5 THE SHADCN ABROGATION + APOTHEOSIS-REDUCTION READING — what the register says the library must
distill INTO (the owner's own words for it: golden glass, breath of life, movement of momentum), and
every place the archaeology shows shadcn residue or component overfit the owner already condemned.
Nothing invented: every claim cites a row.`

const [rOpus, rFable] = await parallel([
  () => agent(`${RECKONING}\n\n${verified.map(x => `\n===== ${x.key} — DISTILLATE =====\n${x.d}\n===== ${x.key} — HEAD VERIFICATION =====\n${x.v}`).join('\n')}\n\n===== CONSUMER LEDGER =====\n${dSibling || '(sibling distill died)'}`, { label: 'reckoning:opus', phase: 'Reckoning', model: 'opus', effort: 'xhigh' }),
  () => agent(`${RECKONING}\n\n${verified.map(x => `\n===== ${x.key} — DISTILLATE =====\n${x.d}\n===== ${x.key} — HEAD VERIFICATION =====\n${x.v}`).join('\n')}\n\n===== CONSUMER LEDGER =====\n${dSibling || '(sibling distill died)'}`, { label: 'reckoning:fable', phase: 'Reckoning', model: 'fable', effort: 'xhigh' }),
])
const arms = [rFable, rOpus].filter(Boolean)
if (!arms.length) throw new Error('both reckoning arms died — distillates + verifications are in the journal; salvage')
const reckoning = arms.length === 1 ? arms[0] : await agent(`${CANON}

TRI-FOLD ADJUDICATOR — two independent Reckonings from the same record. Agglomerate with sagacity and
INCREDULITY: spot-check contested register counts against the distillates, reproduce disagreements on
disk and RULE — never average. The re-exhort/prune verdict splits are the headline. Losers to §REJECTED
with falsifiers. Emit the final ARCHAEOLOGY.md body.

===== FABLE =====
${rFable}

===== OPUS =====
${rOpus}`, { label: 'reckoning:apotheosis', phase: 'Reckoning', model: 'fable', effort: 'xhigh' })

return { reckoning }
