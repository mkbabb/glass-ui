export const meta = {
  name: 'proof-sweep',
  description: 'Owner-sitting proof sweep: codex-edit adjudication + consumer substance proofs + BA-BJ tails inventory',
  phases: [
    { title: 'Digest', detail: 'Opus evidence lanes: diffs, greps, tranche tails', model: 'opus' },
    { title: 'Adjudicate', detail: 'Fable per-lane adjudication', model: 'fable' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const LAW = `Repo /Users/mkbabb/Programming/glass-ui, 2026-07-28. State your modelId first. LAWS: sibling
repos under /Users/mkbabb/Programming/* are READ-ONLY (grep/read only, never write, never git-operate
there) · you author NO repo bytes — your returned text is the deliverable · cite every claim as
file:line or a git-diff hunk · em dashes without spaces · no silent drops: every item you were given
appears in your output with a verdict or an explicit CANNOT-VERIFY.`

const A_GROUPS = [
  { key: 'A1-src', files: `MODIFIED: src/composables/glass/supportsBackdropRefract.ts · NEW UNTRACKED: tests/composables/glass/supportsBackdropRefract.test.ts`, note: `This is a src/ byte change made outside the tranche-dev fence. Read the full diff (git diff src/composables/glass/supportsBackdropRefract.ts) and the new test. What behavior changed? Does it conflict with the FROST-TABS refract-latch DELETE ruling or the no-masking-fallback law (${REF}/FROST-TABS-REAUDIT.md, EXEC-STATE)?` },
  { key: 'A2-governance', files: `MODIFIED: package.json package-lock.json vitest.config.ts · NEW UNTRACKED: vitest.governed-setup.mjs scripts/verify-governed-invariants.mjs tests/governance/ (whole dir)`, note: `This is the codex 'verify:governed' instrument (claimed 48 active + 5 reserved gate seats). Read package.json diff (new scripts?), vitest.config diff, the setup file, the verify script, and census tests/governance/ (count files, read a representative 3). Does it duplicate or conflict with the extant gate suites in tests/gates + tests/styles? Does it fit the 60-seat budget law (${REF}/TERMINAL-ROSTER.md gate rows, docs/tranches/BK/gates/ROSTER.md) or is it a parallel unrostered gate universe?` },
  { key: 'A3-contract-tests', files: `MODIFIED (17): tests/components/{accordion,avatar,checkbox,chip,command,dropdown-menu,infinite-scroll,labeled-field,number-field,pager-dots,slider,sortable-list,tags-input,tooltip,typewriter}.contract.test.ts tests/components/custom/typewriter/TypewriterText.contract.test.ts tests/components/ui/reka-binding-idiom.test.ts`, note: `Run git diff on each; classify the edit pattern (same mechanical change everywhere, or per-file semantics?). Do the edits weaken assertions (a gate that can no longer fail is theatre) or fix real drift?` },
  { key: 'A4-gate-tests', files: `MODIFIED: tests/gates/{boot-graph,orphan-css-partial,token-hygiene,type-hygiene}.test.ts tests/styles/{glass-subtlety,radius-dialog-bind,token-graph,typography}.test.ts tests/public-surface.spec.ts tests/composables/motion/{springProjection,springTokenMirror}.test.ts · NEW UNTRACKED: tests/styles/tokenGraphDetector.ts`, note: `git diff each. public-surface.spec is the HEAD-RED gate BK Φ0 row 1 cures — did the codex edit change its expected manifest (the canonical 30-subpath claim)? Did token-graph gain the new detector? Any weakened assertion flagged.` },
  { key: 'A5-bj-docs', files: `MODIFIED: docs/tranches/BJ/ASK.md docs/tranches/BJ/FEEDBACK-LEDGER.md docs/tranches/BJ/waves/BAND-REDUCTION.md`, note: `git diff each in full. Do the edits alter owner-word rows, add codex dispositions, or reference Sol/Luna process authority (VOID per EXEC-STATE §THE CODEX META-AUDIT posture ruling)? Distinguish honest record-keeping from record rewriting.` },
  { key: 'A6-strays', files: `UNTRACKED strays: card-raw.json motion-probe.json scripts/safari-probe.mjs`, note: `Read each (head is fine for large JSON). Identify origin and purpose. Verdict per file: keep-and-commit (name where it belongs), or delete-candidate (owner confirms), or move-to-audit-dir.` },
]

const B_TASKS = [
  { key: 'B1-chassis', brief: `INSTRUMENT-CHASSIS SUBSTANCE PROOF (the owner's condition: 'likely deleted unless a use case is proven across value.js, speedtest, etc.'). First resolve repo roots: ls /Users/mkbabb/Programming. Then in the speedtest repo and the muster repo, find every import of '@mkbabb/glass-ui/instrument-chassis' (whole repo, not just src/). For EACH importing file: what symbols are imported, what is actually rendered/used (read the file), which page/route mounts it, is it load-bearing UI or dead scaffolding. Also grep value, atlas roots, keyframes for any chassis usage incl. root-barrel named imports (InstrumentChassis, ChassisStage, chassis). Verdict material: is there a real, live use case?` },
  { key: 'B2-carousel-words', brief: `CAROUSEL + WORDS PROOF (owner word: carousel is NOT deleted). Resolve the words repo root (ls /Users/mkbabb/Programming, likely 'words'). Find every '@mkbabb/glass-ui/carousel' import + root-barrel named Carousel imports (whole repo). For each: symbols, what's rendered, which route. Also sweep ALL 15 roots (atlas-active, bbnf-buddy, bbnf-lang, fourier-analysis, keyframes, latex-paper, muster, parse-that, sci-report, slides, speedtest, value, words + mirrors if present) for any other carousel usage. Report per-root counts + substance.` },
  { key: 'B3-barrel-resolution', brief: `ROOT-BARREL RESOLUTION for the disposition components. The codex CONSUMER-LEDGER counts subpath imports; root-barrel imports ('@mkbabb/glass-ui' bare) hide named symbols. In each repo with heavy barrel counts — words (21), keyframes (31), speedtest (12), value (37), bbnf-buddy (29), muster (1), fourier (7), atlas (1) — extract the NAMED SYMBOLS those barrel imports pull (grep the import statements). Then report, per component on the chopping block, any barrel-only consumption: avatar, tags-input, carousel, instrument-chassis, metric, animated-digit, paper-backdrop, header-ribbon, completion-seal, watercolor-dot, drawer, deck, separator, easing, constellation, data-table. Table: component × repo × symbols × files.` },
  { key: 'B4-live-major-split', brief: `LIVE-MAJOR SPLIT for the chopping block. For each of the 15 consumer roots read its package.json glass-ui declaration (the codex ledger claims: atlas 7.0.0, keyframes 7.0.0, value ^7.0.0, sci-active 7.0.0, sci-report 6.0.0, muster ^3.1.0, speedtest ^4.0.1, words ^3.0.0, fourier ^4.0.0, bbnf-lang ^3.0.0, bbnf-buddy ^3.9.0, slides 3.13.0, slides-k ^3.2.0 — VERIFY each on disk, correct any drift). Then for the chopping-block components (list in B3), split consumers into ON-7.x (break at 8.0.0 → relay addendum required in THEIR tranche) vs OLD-MAJOR (no break until they bump; relay noted, not blocking). Deliverable: the relay-burden table.` },
]

const TRANCHES = ['BA','BB','BC','BD','BE','BF','BG','BH','BI','BJ']

const [laneA, laneB, laneC] = await parallel([
  async () => {
    const digests = await parallel(A_GROUPS.map(g => () =>
      agent(`${LAW}\n\nYou are a CODEX-EDIT DIGEST seat (lane A, group ${g.key}). The codex system left
uncommitted edits in the working tree; the owner ordered them SCRUPULOUSLY examined. Your files:
${g.files}\n\n${g.note}\n\nDeliver per file: WHAT the edit does (mechanism, not paraphrase) · correctness
risk · conflict-or-fit vs the terminal record · your recommendation (ADOPT-COMMIT / REVERT / HOLD) with
grounds. Diff hunks quoted for every load-bearing claim.`,
        { label: `digest:${g.key}`, phase: 'Digest', model: 'opus' })))
    return agent(`${LAW}\n\nLANE-A ADJUDICATOR (Fable). Six digest seats examined every uncommitted codex
edit. Adjudicate with sagacity and INCREDULITY — re-read on disk any hunk where a digest is vague or two
digests conflict. Deliver THE CODEX-EDIT DISPOSITION TABLE: every file → ADOPT-COMMIT / REVERT / HOLD-FOR-OWNER,
grounds cited, gate-semantics changes flagged loudly (a weakened assertion is theatre), src/-byte changes
flagged as fence matters. End with the exact git command lists for each disposition class (commands as
text only — you run nothing).\n\n${digests.filter(Boolean).map((d,i) => `===== ${A_GROUPS[i].key} =====\n${d}`).join('\n\n')}`,
      { label: 'adjudicate:codex-edits', phase: 'Adjudicate', model: 'fable', effort: 'xhigh' })
  },
  async () => {
    const proofs = await parallel(B_TASKS.map(t => () =>
      agent(`${LAW}\n\nYou are a CONSUMER-PROOF seat (lane B, ${t.key}). Evidence base: the codex ledger at
docs/tranches/BJ/audits/2026-07-28-consumer-constellation/CONSUMER-LEDGER.md (+ .json for file-level
detail) — trust it as a MAP, verify every load-bearing cell on disk yourself.\n\n${t.brief}`,
        { label: `proof:${t.key}`, phase: 'Digest', model: 'opus' })))
    return agent(`${LAW}\n\nLANE-B ADJUDICATOR (Fable). Four proof seats ran the consumer evidence. Deliver
THE DISPOSITION EVIDENCE TABLE for every chopping-block/consolidation component (carousel, instrument-chassis,
metric, metric-badge/cell/stack, animated-digit, paper-backdrop, header-ribbon, completion-seal, watercolor-dot,
drawer, deck, tags-input, avatar, separator, easing, constellation, data-table): per component — consumers
(repo@major × files × symbols × substance) · the ratified disposition (read ${REF}/TERMINAL-ROSTER.md rows
#18/#40 + GESTALT.md Ruling 1/6) · whether the evidence SUSTAINS, WEAKENS, or REFUTES that disposition ·
relay burden (ON-7.x vs OLD-MAJOR). Owner words bind: carousel is NOT deleted (owner, 2026-07-28);
instrument-chassis deletes UNLESS the use case is proven — state plainly whether the proof stands.
Incredulity: re-grep any cell two seats disagree on.\n\n${proofs.filter(Boolean).map((p,i) => `===== ${B_TASKS[i].key} =====\n${p}`).join('\n\n')}`,
      { label: 'adjudicate:dispositions', phase: 'Adjudicate', model: 'fable', effort: 'xhigh' })
  },
  async () => {
    const tails = await parallel(TRANCHES.map(t => () =>
      agent(`${LAW}\n\nYou are a TAILS-INVENTORY seat (lane C, tranche ${t}). The owner's order: 'the tails
of BA-BJ are not dropped off and lost — folded herein appropriately.' Read docs/tranches/${t}/ — PLAN,
EXECUTION-PROGRESS (or equivalent cursor), FINAL if present, ASK, addenda/wave indexes (skim wave bodies
only where the cursor is ambiguous). Extract EVERY tail: rows not CLOSED at that tranche's end, deferred/
parked/OWED/carried items, addenda declared but not landed, owner asks never answered, 'carries into
<next>' clauses. Then cross-check each tail against the BK record: docs/tranches/BK/PORT.md ·
docs/tranches/BK/EXECUTION-PROGRESS.md · ${REF}/TERMINAL-ROSTER.md · ${REF}/RATIFICATION.md ·
${REF}/EXEC-STATE.md (grep by the tail's own nouns). Deliver the tail table: item → source cite → status:
FOLDED-AT (cite the BK/roster row) / RETIRED-AT (cite the ruling) / ORPHAN (no home found — the violation
class; state what it needs). Tranche ${t} may legitimately have zero tails — prove it rather than assert it.`,
        { label: `tails:${t}`, phase: 'Digest', model: 'opus' })))
    return agent(`${LAW}\n\nLANE-C ADJUDICATOR (Fable). Ten seats inventoried the BA-BJ tails. Deliver THE
UNION TAILS LEDGER: dedupe across tranches (the same debt often carries BC→BD→BJ — one row, provenance
chain), then three sections: §FOLDED (count + spot-verified sample of 5 — re-read those roster/PORT cites
yourself, a wrong cite is an ORPHAN in disguise) · §RETIRED (count, each with its ruling cite) · §ORPHANS
(EVERY one, with the exact BK seat it needs — this section is the deliverable; empty only if truly empty).
Incredulity on 'zero tails' claims: spot-check those tranches' cursors yourself.\n\n${tails.filter(Boolean).map((x,i) => `===== ${TRANCHES[i]} =====\n${x}`).join('\n\n')}`,
      { label: 'adjudicate:tails', phase: 'Adjudicate', model: 'fable', effort: 'xhigh' })
  },
])

return { laneA, laneB, laneC }