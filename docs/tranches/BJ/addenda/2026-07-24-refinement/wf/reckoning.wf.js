export const meta = {
  name: 'sol-codex-reckoning-deepen',
  description: 'Deepen and adversarially challenge the lead reckoning of the Sol/codex BJ-hardening + BI/BJ partial execution',
  phases: [
    { title: 'Deepen', detail: 'five readers over the corpus the lead did not reach', model: 'opus' },
    { title: 'Verify', detail: 'check each reader against git and disk', model: 'opus' },
    { title: 'Challenge', detail: 'three adversaries attack the lead reckoning itself', model: 'opus' },
    { title: 'Fold', detail: 'corrections and additions to the reckoning', model: 'opus' },
  ],
}

const REPO = '/Users/mkbabb/Programming/glass-ui'

const RECKONING = `
LEAD RECKONING (delivered to the owner; built by direct reading of the 35 steers, the 509-line
CLAUDE-SOL-IMPL-RECEIPTS.md, EXECUTION-PROGRESS.md, REJECTIONS.md, C65/C66/C67, FREEZE-MANIFEST,
the C34 burndown, and git at HEAD 0371836d):

WHAT IT WAS. Sol = codex thread, x-high, judgment/audit. Luna = its bounded-mechanical counterpart.
Owner ECOUTE-MOI 2026-07-21 split ownership: Claude owned product implementation (source/tests/
evidence/commits); Sol owned exactly five surfaces (ASK.md, PLAN.md, EXECUTION-PROGRESS.md,
waves/BAND-REDUCTION.md, addenda/2026-07-21-convergent-hardening/**). The split held — no Claude
commit touches a Sol surface.

RESULTS ON PAPER. C65 = "FORMATION GREEN / … / PRODUCT, SOURCE, TEST, GATE, PACKAGE, CONSUMER,
BROWSER-AT, RELEASE, AND TRANCHE EXECUTION RED." C66 = "FORMATION GOAL COMPLETE — 100% … Execution
authority: none until explicit owner release." Denominators: 63 owners (61 Vue families + _shared +
Deck), 174 leaves seated once, 99 routes, 93 rows (ASK-26 DECLINE minted row 93), 396 browser receipt
seats. Seven owner-final decisions execution may not reopen. REJECTIONS.md kills ~40 candidates each
against a named falsifier.

RESULTS IN SOURCE. ~25 commits 2026-07-20..22; cursor reads 30 source-touched + 62 other. Landed:
gate trio, pixel-floor CI, spring registers, W-COLO-1, reduction deletes, toast/dialog parity,
progress-rim, a11y linkage+state, story copy canon, configurator std, radius role canon W1, blur
ladder W2, type codemod W6, typed track seam W4, refract latch W7/W8, orphan-CSS gate, PRM cure.
NOT ONE WAVE ACCEPTED. package.json still 7.0.0. 84 dirty status entries.

HOW HANDLED. steer -> read at workflow boundary (never mid-lane) -> Claude commits -> receipt with
HEAD/tree/sorted-dirty-sha256/sorted-untracked-sha256/actual-model-truth/mutations/routed-remainder
-> Sol spawns two exact-byte critics + a third adjudicator -> verdict frozen in addenda -> next steer.
Good disciplines: history never rewritten (a rejected commit becomes a "banked partial", never a
revert); provenance never relabelled (Opus stays Opus). Degradation: every wave carried four terminal
arms nothing in the Claude lane could clear — an immutable 8.0.0 package (owner's CI hinge), real
Safari+VoiceOver (blocked until 2026-07-24 23:53), consumer repin across four repos mid-tranche, and
TWO FRESH SOL CRITICS THAT RESET ON ANY BYTE CHANGE (a non-converging gate).

SIX ERROR CLASSES the lead reported:
 E1 Model-law deadlock. Sol required Luna x-high for every byte-changing cut; steer 24: "the
    collaboration runtime does not expose a Luna seat." Steer 34 closed the Opus byte lane entirely.
    The tranche is stalled on an unfillable seat.
 E2 Gates that cannot fail. prm-no-resurrection: 4 proven false greens (2nd @media block invisible to
    prmBlock(); transition-delay never inspected; authorized-duration drift; shorthands unnormalized).
    typed-track-seam: 15/15 from a clean archive with dist ABSENT. W1 radius gates 23/23 GREEN under
    two semantic mutation bundles. Orphan gate's dead-SFC bite pointed at a file that never existed
    (!existsSync skipped it vacuously).
 E3 Status inflation. "Safari passed" from Playwright-WebKit (re-fought steers 8/12/13/14); W2-PAINT
    reported CLOSED-GREEN; abb1eba2 claimed "validated end-to-end" (only one build + local dry-pack);
    false ", Luna x-high seat" at BAND-MATERIAL.md:1244; §CLOSE HARDENING III said "now CURED, 16
    tests GREEN" while the source was uncommitted and the defects live.
 E4 Under-committed closer (>=3x). W6 gate committed / codemod residue dirty. W2 closer committed 4
    comment cures, left the 11-path body. W8 detector redress STILL dirty at HEAD — verified sha256
    8295afbc… byte-identical to steer-22's frozen snapshot, its 325-line test untracked.
 E5 Destructive mutation method. W4 closer restored mutations with \`git checkout <file>\` — restored
    rejected HEAD bytes, erased four candidate edits, made 2->3->4->8->9 failure counts CUMULATIVE not
    isolated. W4's mutation evidence is void.
 E6 Steer/launch race (structural). Batch-2 wf_b5378be1-632 launched while the session was at steer 16;
    steers 17-23 had landed untracked; prompts freeze at launch. abb1eba2 was committed directly
    contrary to steer-23's "make no commit, return NEEDS-LUNA". Same class as ddc20dc4 racing the W6
    steer. Async steer channel vs sync workflow prompt — not closable by discipline alone.

REAL PRODUCT DEFECTS FOUND (mostly Sol's catch): --radius-field tree-shaken from :root because its
only consumers load via SFC <style src>, outside the Tailwind-scanned cascade — TagsInput computed 0px
while the test passed on abs(9999-0)>100. PRM wildcard could override authored transition:none and
attach a clock to a receiver that authored none; mechanism mis-explained as specificity when it is
layered-!important. Installed Lightning deletes the unprefixed leg (5 prefixed-only rules at root, 7
live source vendor declarations). ./styles.css emitted zero rules for its shared classes. W8 detector
latches OFF permanently on a transient probe exception; armed is module-global not per-Document.

CORRECTED, VERIFIED AT HEAD: the ~25 commits; abb1eba2 is an ancestor of HEAD; false-Luna struck
(4b5bc369); mount-arm reverted (b5e70155); fictional dead-SFC replaced + exclusion invariant added,
reach 532/536 (0169e935); PRM prose + a genuine emulateMedia proof (6f9acf1f); @theme static
field-writer (b0f2818a); the under-committed W2 body committed (20e064f1).
DOCUMENTED BUT NOT AT HEAD: the W8 I-2/I-3 detector.
ACCEPTED: ZERO waves.

LATE CORRECTION the lead has already absorbed (do not re-derive; an independent extractor settled it
2026-07-25): the lead's own DAG.md numbers were partly false. Settled census — 62 components, 56,676
LOC; 30 code+style edges; 36 clusters / 30 singletons; sole SCC>1 = [dropdown-menu, dock];
zero-consumer count 42 but **LOC 30,594 (54.0%), not the 38,204 (67%) DAG.md claimed**, and membership
is wrong 11-of-42 in EACH direction (nine phantom consumers came from counting a CSS @import as a
consumer). Note the open contradiction: Sol's REJECTIONS.md calls the dock<->dropdown-menu cycle
"refuted — the current graph reaches leaf dockContext with no back-edge, the actual static runtime
barrel cycles are Alert and Badge", while the independent extractor finds that SCC surviving. These
may be two different graphs (runtime reach vs static barrel). Settle it if your slice touches it.

THREE OWNER DECISIONS the lead surfaced: seat Luna or dissolve the Sol/Luna model law; rule on
abb1eba2 (stands vs forward-revert); replace "two fresh critics reset on any byte" with a finite
invariant checklist. Plus: Safari went live 2026-07-24 23:53, satisfying one of the four terminal arms.
`

const PREAMBLE = `You are reading the glass-ui repo at ${REPO} (branch master, HEAD 0371836d).

A "codex" session — agent handle **Sol** (bounded-mechanical counterpart **Luna**) — formulated the
HARDENING of tranche BJ and drove a partial EXECUTION of tranches BI and BJ. It communicated through
docs/tranches/BJ/coordination/SOL-TO-CLAUDE-LIVE-STEER*.md (35 files) and a 206-file / 42,633-line
corpus at docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/. Claude replied via
coordination/CLAUDE-SOL-IMPL-RECEIPTS.md and by landing commits.

The owner asked: what were the RESULTS, HOW was it handled, what ERRORS were found, what has been
CORRECTED. The lead already answered from direct reading. That answer is reproduced below as a PRIOR.

${RECKONING}

YOUR JOB IS NOT TO RESTATE THE PRIOR. It is to find what the prior MISSED and what the prior got
WRONG. The lead read only ~8 of the 206 addenda files and barely touched BI. Report:
  NEW      — substantive things absent from the prior entirely
  REFUTES  — where the prior is wrong, overstated, or misattributed, with the corrected statement
  CONFIRMS — only where you personally reproduced a prior claim AND it is load-bearing

CRITICAL EPISTEMICS. This corpus launders verdicts. A document asserting closure is a CLAIM. Tag
everything: DOC-CLAIM (a document asserts it) · GIT-FACT (you ran git and saw it) · DISK-FACT (you
read the source at HEAD) · CONTRADICTED (two artefacts disagree — name both).
When a doc says "landed at <sha>", run \`git show --stat <sha>\` and say whether the shape matches.
Never upgrade a DOC-CLAIM because it sounds authoritative.

READ-ONLY. Do not edit, stage, commit, revert, clean, or move anything — in this repo or any sibling.
Never relocate or park a sibling repository for any reason.

BE PITHY. The owner despises padding. Dense rows of substance, file paths and SHAs. Your output is
DATA for a synthesizer, not a memo. Em dashes without spaces.`

const CLAIMS_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['modelId', 'slice', 'summary', 'items'],
  properties: {
    modelId: { type: 'string', description: 'Your exact model id. Required.' },
    slice: { type: 'string' },
    summary: { type: 'string', description: 'At most 8 sentences. What this slice shows that the prior does not.' },
    items: {
      type: 'array',
      maxItems: 36,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'relation', 'kind', 'statement', 'provenance', 'evidence'],
        properties: {
          id: { type: 'string' },
          relation: { type: 'string', enum: ['NEW', 'REFUTES', 'CONFIRMS'] },
          kind: {
            type: 'string',
            enum: ['result', 'handling', 'error-found', 'correction-landed', 'open-remainder', 'contradiction'],
          },
          statement: { type: 'string', description: 'One dense sentence.' },
          provenance: { type: 'string', enum: ['DOC-CLAIM', 'GIT-FACT', 'DISK-FACT', 'CONTRADICTED'] },
          evidence: { type: 'string', description: 'paths, SHAs, line refs, or the command run and its output' },
          severity: { type: 'string', enum: ['S0', 'S1', 'S2', 'S3', 'info'] },
          owner: { type: 'string', description: 'Sol / Luna / Claude / lead / subagent / spec / owner' },
          prior_target: { type: 'string', description: 'If REFUTES/CONFIRMS: which prior claim (e.g. E4, "zero waves accepted")' },
        },
      },
    },
  },
}

const VERDICT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['modelId', 'checked', 'verdicts'],
  properties: {
    modelId: { type: 'string' },
    checked: { type: 'number' },
    verdicts: {
      type: 'array',
      maxItems: 36,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'verdict', 'note'],
        properties: {
          id: { type: 'string' },
          verdict: { type: 'string', enum: ['CONFIRMED', 'REFUTED', 'PARTIAL', 'UNVERIFIABLE'] },
          note: { type: 'string', description: 'What you ran/read and what it showed. If REFUTED, state the true state.' },
          corrected_statement: { type: 'string' },
        },
      },
    },
  },
}

const SLICES = [
  {
    key: 'hardening-a',
    label: 'read:addenda-A-to-G',
    prompt: `SLICE: convergent-hardening addenda, files beginning A-G (case-insensitive).

Directory: docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/ (206 files). You own:
A11Y-*, AUTHORITATIVE-*, BREADTH-*, BROWSER-*, C2-*, CHALLENGES.md, CLAUDE-WORKFLOW-RECONCILIATION-C2.md,
COMPLETION-SEAL-*, COMPONENT-*, COORDINATION.md, CURRENT-HEAD-TRUTH-*, DATA-FEEDBACK-*, DATATABLE-*,
DOCK-*, DUAL-BROWSER-*, EXEMPLAR-*, FM-W3-*, FORMATION-GOAL-CURSOR-C21.md, FREEZE-MANIFEST.md,
FRESH-OPUS-EYES-*, GATE-*.

The lead read only FREEZE-MANIFEST (head), FRESH-OPUS-EYES-C67 (head), the C65 adjudication (head),
and TWELVE-HOUR-CONVERGENCE-BURNDOWN-C34 (head). EVERYTHING ELSE HERE IS UNREAD BY THE LEAD.

Read the ADJUDICATION / RECONCILIATION / SEAL / RECEIPT files in full — they carry verdicts. Skim the
CRITIC files for verdict blocks. The GATE-SEMANTIC-ROSTER-C7..C19 series is a ~30-file convergence
loop — characterize the LOOP, its cost, and its terminal state (C8 froze 48 active + 4 hard + 1
conditional = 53 worst-case, 7 seats free); do not read all of them.

Priority questions: (a) what did the DOCK structural cohort (C30/C31/C32/C33/C37/C56) conclude, and
does it agree or conflict with the lead's separate 2026-07-24 W-DOCK GREENFIELD verdict (14 props ->
8)? (b) what does the BROWSER assay law (C23/C24/C25/C29) require and how much was actually captured?
(c) what does HOME-AURORA-AND-DUAL-MOBILE-RED-C27 say is broken, and is it still broken at HEAD?
(d) what do the DATA-FEEDBACK and BREADTH cohorts rule on tabs/slider/alert/handmark/completion-seal?
(e) any defect class the prior's E1-E6 does not cover.`,
  },
  {
    key: 'hardening-b',
    label: 'read:addenda-H-to-Z',
    prompt: `SLICE: convergent-hardening addenda, files beginning H-Z (case-insensitive).

Same directory. You own: HANDMARK-*, HOME-AURORA-*, IMPLEMENTATION-ASKS-C2.md, INVENTORY.md,
LIVING-*, LUNA-*, OVERFIT-*, Q-*, REGISTRY.md, REJECTIONS.md, RESEARCH.md, RESTART-SAFE-*,
ROW-CHALLENGE-MATRIX.md, ROW-CHALLENGE-VERDICTS-C1.md, SEGMENTED-TABS-*, TWELVE-HOUR-*, UNIVERSAL-*,
VISUAL-HARDENING.md, W1-* … W8-*, WHOLE-*, plus the evidence/ and snapshots/ subdirs (characterize,
do not enumerate).

The lead read only REJECTIONS.md and the C65/C66 heads. EVERYTHING ELSE IS UNREAD.

Read IN FULL: REGISTRY.md, ROW-CHALLENGE-VERDICTS-C1.md, IMPLEMENTATION-ASKS-C2.md (the I-1..I-17
binding backlog), UNIVERSAL-COMPONENT-APOTHEOSIS-CANDIDATE-C61.md, UNIVERSAL-C61-ALIGNED-AMENDMENT-C63.md,
OVERFIT-SUBTRACTION-OWNER-RULING-C45.md, WHOLE-CENSUS-RECONCILIATION-PASS-1/2-C59.

Priority questions: (a) the ROW CHALLENGE — how many rows challenged, how many survived, what died?
(b) I-1..I-17 — enumerate each with its owning wave and its state at HEAD (several directly caused
commits the prior lists). (c) what does the OVERFIT SUBTRACTION owner ruling delete, and does it agree
with the settled census (42 zero-consumer components, 30,594 LOC / 54.0%)? (d) the per-wave W1..W8
critic verdicts — did ANY wave end GREEN? (e) what do the LUNA-* C3 design packets specify that has
never been implemented — this is the shape of the work that is stalled. (f) the Q-*-CORRECTION files
record corrections: to whom, of what?`,
  },
  {
    key: 'bi',
    label: 'read:BI-tranche-and-inheritance',
    prompt: `SLICE: tranche BI — what executed, what carried into BJ. The lead read ONLY the first 50
lines of HANDOFF-ACTIVE-EXECUTION.md. This slice is effectively unexplored.

Read: docs/tranches/BI/HANDOFF-ACTIVE-EXECUTION.md (full), HANDOFF-PERFECTED-BI.md, PLAN.md,
PLAN-FRAME.md, STRUCTURE-ADDENDA.md, TAIL-EXCAVATION.md, REPO-CLEANUP-PLAN.md, MS-MINT.md. Then list
and sample docs/tranches/BI/{ledgers,coordination,addenda,audit,waves,FORMATION}/.

Answer precisely:
 (a) BI's wave count, and how many actually landed in source. Cross-check against git — BI-era commits
     predate 2026-07-20: \`git log --oneline --until=2026-07-20 | head -80\`.
 (b) What was UNFINISHED in BI and explicitly carried into BJ. The handoff says several status surfaces
     are stale/archival (FORMATION/WAVE-INDEX.md, waves.json, FINAL-PRECONDITIONS.md, the 93-wave
     PLAN.md, asks-and-consumes.md) — determine the TRUE state.
 (c) The branch \`codex/bi-p-q-execution\` @ c181f0a7 is named in the handoff. Does it still exist
     (\`git branch -a\`, \`git log --oneline c181f0a7 -20\` if reachable)? Is its work in master, or is
     there unmerged BI work sitting on a branch nobody is looking at? That last possibility is
     important — check it properly.
 (d) What BI defects BJ inherited, and whether any are still live at HEAD (read the source).
 (e) The owner's standing edict "NOTHING from the misfiring of BI or previous dropped" (FEEDBACK-LEDGER
     A16) — is there evidence anything WAS dropped?`,
  },
  {
    key: 'waves',
    label: 'read:wave-ledger-vs-git',
    prompt: `SLICE: the per-wave ledger, claimed status vs git reality.

For each of the 9 files docs/tranches/BJ/waves/BAND-*.md (5,970 lines) plus waves/APOTHEOSIS.md, do
NOT read end to end. Grep out per-wave headers and status/close blocks (patterns: '^#### ', '^### ',
'STATUS', 'CLOSE', 'LANDED', 'RED', 'GREEN', 'DEFER', 'BLOCKED', 'PARKED', 'sha', backtick-wrapped
7-8 hex).

Build a WAVE LEDGER TABLE: band · wave id · claimed status · claimed landing SHA.

Then cross-check EVERY claimed SHA: does the commit exist (\`git cat-file -t <sha>\`)? Is it an
ancestor of HEAD (\`git merge-base --is-ancestor <sha> HEAD\`)? Does \`git show --stat\` match the
claimed scope?

Report counts: total BJ waves; claimed closed; claimed acceptance-RED; never started; and
claimed-with-a-SHA-that-does-not-exist-or-does-not-match. The prior asserts "NOT ONE WAVE ACCEPTED"
and "30 source-touched + 62 other" — test both. Any band file still carrying a LANDED/DONE/CLOSED
claim that Sol's critics rejected is a live doc-truth defect: name file and line. The prior already
found one (BAND-MATERIAL.md still carries rejected "LANDED"/pixel-identical W4 claims per the abb1eba2
receipt §1.2) — verify it and find the others.`,
  },
  {
    key: 'crossrepo',
    label: 'read:cross-repo-and-consumer-arm',
    prompt: `SLICE: the cross-repo / consumer arm — what glass-ui owes its consumers and vice versa.

Read: docs/tranches/BJ/coordination/{ATLAS-Q-G-BATCH-DISPOSITION.md, SCI-BEAD-INBOUND.md,
atlas-outbound-*.md (4 files), valuejs-outbound-2026-07-24-parser-p0-prm-idiom-dockcrossfade.md,
colo-w1-lead-amendment-2026-07-20.md, ios27micro-inbox-2026-07-18-glass-refract-webkit-gate-lie.md,
webkit-dock-crash-repro.html}, plus docs/tranches/BJ/addenda/2026-07-23-metric-shape-consumer-report.md.

Verify consumer-side claims against sibling repos IF PRESENT on disk (~/Programming/sci-report,
~/Programming/atlas or .p-totality/*, value.js, keyframes.js). \`ls\` first; if a repo is absent say so
rather than guessing. READ-ONLY — modify nothing, and NEVER move or park a sibling repo.

Answer: (a) the G-row set (G-1..G-6, G-CLOSE) — what each asks, its destination band, its state.
(b) which consumer repins are gated on the never-produced immutable 8.0.0 artifact. (c) the value.js
outbound (323 lines) — what P0 defect does it report, and is it fixed at HEAD? (d) the ios27micro
inbox names a "glass refract WebKit gate-lie" — what was the lie, was it cured (44621bb4 / f0d32d69 /
b5e70155), and is the cure live at HEAD? (e) webkit-dock-crash-repro.html — what does it reproduce,
and how does it relate to the lead's separate 2026-07-24 finding that Playwright-WebKit crashes 5/5
on every route while REAL Safari 26.4 renders all of them perfectly (302 nodes on /, exactly matching
Chromium)? If this repro rests on Playwright-WebKit it may be a harness artefact, not a product
defect — determine which, because a live S0 may be void.`,
  },
]

phase('Deepen')

const results = await pipeline(
  SLICES,
  (s) => agent(`${PREAMBLE}\n\n---\n\n${s.prompt}`, {
    label: s.label,
    phase: 'Deepen',
    model: 'opus',
    effort: 'high',
    schema: CLAIMS_SCHEMA,
  }),
  (r, s) => {
    if (!r || !r.items || !r.items.length) return null
    const claimList = r.items.map(i =>
      `[${i.id}] (${i.relation}/${i.kind}/${i.provenance}) ${i.statement}\n    evidence: ${i.evidence}`
    ).join('\n')
    return agent(
      `${PREAMBLE}

---

You are the ADVERSARIAL VERIFIER for the "${s.key}" slice. Another agent produced the claims below.
REFUTE them. A claim survives only if you personally reproduced it.

If a claim names a SHA: \`git show --stat <sha>\` and \`git show -s --format=%B <sha>\`.
If it names a file or source state: READ the file at HEAD.
If it says something closed/landed/corrected: check the corrected state is in the working tree NOW.
If it says something is RED or broken: check whether it is STILL broken at HEAD.
If it REFUTES the lead's prior: scrutinize hardest — the prior was built from direct reading and much
of it is git-verified. Do not let a doc-claim overturn a git-fact.

Watch for this corpus's signature failure: a closure recorded because a nearby file changed, while the
specific property named in the complaint never moved.

Return a verdict for EVERY id. Prefer REFUTED/PARTIAL over politeness. UNVERIFIABLE if you cannot
check it with the tools available — do not guess.

CLAIMS:
${claimList}`,
      { label: `verify:${s.key}`, phase: 'Verify', model: 'opus', effort: 'high', schema: VERDICT_SCHEMA }
    ).then(v => ({ slice: s.key, read: r, verify: v }))
  }
)

const good = results.filter(Boolean)
log(`${good.length}/${SLICES.length} slices deepened + verified`)

phase('Challenge')

const LENSES = [
  {
    key: 'sol-overvalued',
    label: 'challenge:was-Sol-worth-it',
    ask: `LENS: the prior may OVERVALUE Sol. Argue the 42,633-line addenda corpus was largely ceremony.
Sample at least 15 distinct Sol findings across the addenda and classify each with evidence:
(a) a real defect that would otherwise have shipped, (b) true but already known/owned elsewhere,
(c) a process objection with no product consequence, (d) wrong. Compute an honest signal ratio.
Then test the converse: name the findings that JUSTIFY the cost — the ones nothing else would have
caught. Finally, turn Sol's own lens on Sol: do its artefacts carry the defects it charges Claude with
(false greens, uncommitted claims, status inflation, unfalsifiable assertions, gates that cannot fail)?`,
  },
  {
    key: 'blame-misattributed',
    label: 'challenge:who-actually-erred',
    ask: `LENS: the prior may MISATTRIBUTE blame. It charges E2-E5 largely to "Claude closers" and frames
E1/E6 as structural. Test who actually authored each defect by reading the receipts and commits.
(a) Were the false-green gates authored by Claude, or specified that way by Sol's own contract?
(b) Was the under-committed-closer pattern a Claude failure, or a consequence of Sol's mid-flight
steers forbidding commits? (c) The abb1eba2 contract violation — the prompt was frozen before steer-23
existed; is that a Claude error at all, or an artefact of the async channel? (d) Did the OWNER's own
instructions contribute (the model law, the four-arm acceptance bar, the no-history-rewrite rule)?
(e) Does the prior let the LEAD off lightly? The lead ran those workflows and wrote those receipts.
Find lead errors the prior omits — check the receipts for claims the lead made that do not hold.`,
  },
  {
    key: 'deadlock-real',
    label: 'challenge:is-the-deadlock-real',
    ask: `LENS: the prior's headline is "the tranche is stalled on an unfillable Luna seat." Attack it.
(a) Is Luna genuinely unavailable, or merely unavailable to the Claude session while the owner can
seat it in the codex thread trivially? Quote the exact steer language.
(b) Is the four-arm acceptance bar actually unclearable, or does it become clearable the moment the
owner authorizes a version bump — which the memory record says was ALREADY authorized for this tranche
("publish/deploy authorized")? Check ASK.md, PLAN.md and EXECUTION-PROGRESS.md for the publish
authorization and say exactly what it covers.
(c) The "two fresh Sol critics reset on any byte change" rule — quote it exactly and determine whether
it is truly non-converging, or whether the corpus contains a bounded-restart provision (read steer 32's
anti-stall / anti-re-litigation law closely).
(d) Therefore: is the right owner action "seat Luna", "dissolve the model law", or something the prior
did not name? Give a concrete unblocking sequence with the FEWEST owner decisions, each with what it
unlocks and what it risks.`,
  },
]

const challenges = await parallel(LENSES.map(l => () =>
  agent(`${PREAMBLE}

---

You are an ADVERSARY. Find where the lead reckoning above is WRONG, soft, or missing something
material. Do not be agreeable. Do not manufacture disagreement either — if the prior is right on a
point, say so in one line and move on; spend your effort where it is wrong.

${l.ask}

Ground every charge in evidence you personally pulled (git, disk, or an exact quote with file:line).
Dense findings, most consequential first. End with two explicit lists: what in the prior must CHANGE,
and what STANDS.`,
    { label: l.label, phase: 'Challenge', model: 'opus', effort: 'high' })
      .then(text => ({ lens: l.key, text }))
))

const goodChallenges = challenges.filter(Boolean)
log(`${goodChallenges.length}/${LENSES.length} challenges returned`)

phase('Fold')

const dossier = good.map(g => {
  const vmap = {}
  for (const v of (g.verify?.verdicts || [])) vmap[v.id] = v
  const rows = (g.read.items || []).map(i => {
    const v = vmap[i.id]
    return `- [${i.id}] ${i.relation} | ${i.kind} | ${i.provenance} | sev=${i.severity || '-'} | owner=${i.owner || '-'}${i.prior_target ? ` | vs prior: ${i.prior_target}` : ''}
  CLAIM: ${i.statement}
  EVIDENCE: ${i.evidence}
  VERIFY: ${v ? `${v.verdict} — ${v.note}${v.corrected_statement ? ` || CORRECTED: ${v.corrected_statement}` : ''}` : 'NOT VERIFIED'}`
  }).join('\n')
  return `\n### SLICE ${g.slice} (reader ${g.read.modelId}, verifier ${g.verify?.modelId})\nSUMMARY: ${g.read.summary}\n\n${rows}`
}).join('\n')

const challengeText = goodChallenges.map(c => `\n### ADVERSARY: ${c.lens}\n${c.text}`).join('\n')

const fold = await agent(
  `${PREAMBLE}

---

You are the SYNTHESIZER. Five readers covered corpus the lead never reached, each adversarially
verified. Three adversaries attacked the lead reckoning itself. Fold it all into a DELTA against the
prior — not a replacement for it.

Structure exactly as:

**A. WHAT THE PRIOR GOT WRONG.** Each correction: the prior claim, the true state, the evidence, and
whether it changes the owner's decision. Lead with anything that changes a decision.

**B. WHAT THE PRIOR MISSED.** New substantive findings ranked by consequence — any defect class beyond
E1-E6, anything about BI the prior did not know, any wave-ledger or doc-truth defect, any live S0 that
turns out void.

**C. THE HONEST VERDICT ON SOL.** Signal ratio with the classification behind it. What justified the
cost and what did not. Whether Sol's own artefacts carry the defects Sol charged Claude with.

**D. THE UNBLOCKING SEQUENCE.** The fewest owner decisions that unstall the tranche, in order, each
with what it unlocks and what it risks. If the prior's three decisions were wrong or incomplete, say
so and give the right set.

RULES:
- A verifier REFUTED must be reported as refuted, never quietly dropped. Verifier beats reader unless
  the verifier's method was weaker — say which and why.
- Never present a DOC-CLAIM as fact. Use "documented" vs "verified" precisely.
- Where readers and adversaries disagree with each other, adjudicate and say why.
- If the honest answer is "we do not know", say so and say what would settle it.
- Dense prose and tables. No filler, no summary-of-the-summary, no exhortation. Em dashes without spaces.

DOSSIER:
${dossier}

ADVERSARIES:
${challengeText}`,
  { label: 'fold:delta', phase: 'Fold', model: 'opus', effort: 'high' }
)

return { fold, slices: good.length, challenges: goodChallenges.length }
