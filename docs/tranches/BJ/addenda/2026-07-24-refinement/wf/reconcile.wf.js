export const meta = {
  name: 'cross-tranche-deep-reconciliation',
  description: 'Sweep all 44 tranches for unreconciled items; fold component audits and every feedback row into concrete spec routing',
  phases: [
    { title: 'Sweep', detail: 'eight readers over the tranche corpus', model: 'opus' },
    { title: 'Verify', detail: 'test each claimed gap against the live BJ corpus and disk', model: 'opus' },
    { title: 'Fold', detail: 'the terminal reconciliation ledger', model: 'opus' },
  ],
}

const REPO = '/Users/mkbabb/Programming/glass-ui'
const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'

const PREAMBLE = `You are reading the glass-ui repo at ${REPO} (HEAD 0371836d, package 7.0.0).

**44 tranches** live under \`docs/tranches/\`: AB AB+1 AB+2 AM AN AO AP AQ AR AS AT AU AV AW AX AY AZ BA BB
BC BD BE BF BG BH BI BJ C D D-II E F H I IOS27-MICRO J K L M N O P Q V. Thousands of markdown files.
BJ is the CURRENT tranche and the only live one.

**THE QUESTION.** The owner asks: how many items from those tranches were never reconciled? Were the
component audits ever folded into concrete specs? Were the feedback items?

**THE MEASURED SUSPICION (verify or refute it).** The live BJ refinement corpus at \`${REF}/\` cites only
nine prior tranches, and the citation counts are: BI 9 · AX 6 · BC 3 · AW 3 · G 2 · BG 2 · BB 2 · AY 2 ·
AS 2. **BD — 957 markdown files, the single largest body of component-audit work in this repo, including
a 118-page storybook/component audit — is cited ZERO times.** Only **8 of 62 components** have a terminal
spec (\`${REF}/COMPONENT-WAVES-TERMINAL.md\`).

**WHAT COUNTS AS UNRECONCILED.** An item is unreconciled if it is a finding, defect, audit verdict, owner
ask, or design decision that (a) was recorded in a tranche, and (b) has **no terminal disposition** —
no landed commit, no owning wave in the live corpus, no explicit retire-with-rationale. A thing that was
deliberately killed with a stated falsifier IS reconciled. A thing that was simply never mentioned again
is NOT.

**WHAT DOES NOT COUNT.** Do not report: process chatter, superseded planning prose, duplicate restatements
of the same finding across passes, or anything already carried in the live corpus. Cross-check EVERY
candidate against \`${REF}/\` (grep it) and against \`docs/tranches/BJ/waves/BAND-*.md\` before reporting it.
A candidate already covered there is NOT a gap — say so and drop it.

**EPISTEMICS.** Tag every row: DOC-CLAIM (a tranche doc asserts it) · GIT-FACT (verified in git) ·
DISK-FACT (verified by reading current source). A tranche saying it closed something is a CLAIM. If a
finding names a file or a symbol, check whether the defect is STILL LIVE at HEAD — a stale finding about
deleted code is not a gap, it is noise.

**READ-ONLY.** Author no source, test, or config byte. Do not edit, stage, commit or clean anything, here
or in any sibling repo. Never move or park a sibling repository.

**BE RUTHLESS ABOUT VOLUME.** The owner wants what MATTERS, not an inventory. Prefer 15 load-bearing rows
over 200 trivia. Rank by consequence. Dense tables, file paths, no padding. Em dashes without spaces.`

const ROW_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['modelId', 'slice', 'summary', 'scanned', 'rows'],
  properties: {
    modelId: { type: 'string' },
    slice: { type: 'string' },
    summary: { type: 'string', description: 'At most 8 sentences. The shape of what is unreconciled in this slice.' },
    scanned: { type: 'string', description: 'What you actually read — tranches, dirs, file counts. Be honest about coverage.' },
    rows: {
      type: 'array',
      maxItems: 40,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'source', 'item', 'live_at_head', 'covered_by', 'route', 'provenance'],
        properties: {
          id: { type: 'string' },
          source: { type: 'string', description: 'tranche + file:line' },
          item: { type: 'string', description: 'One dense sentence: the finding/ask/decision itself.' },
          live_at_head: { type: 'string', enum: ['LIVE', 'FIXED', 'MOOT', 'UNKNOWN'], description: 'Is the underlying defect still real at HEAD? You must check.' },
          covered_by: { type: 'string', description: 'The live-corpus wave/spec that already owns it, or NONE. You must grep before saying NONE.' },
          route: { type: 'string', description: 'Where it should go: a named wave, a terminal spec, a new wave to mint, or RETIRE-with-rationale.' },
          provenance: { type: 'string', enum: ['DOC-CLAIM', 'GIT-FACT', 'DISK-FACT'] },
          severity: { type: 'string', enum: ['S0', 'S1', 'S2', 'S3', 'info'] },
          component: { type: 'string', description: 'The component/family it concerns, if any.' },
        },
      },
    },
  },
}

const VERDICT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['modelId', 'verdicts'],
  properties: {
    modelId: { type: 'string' },
    verdicts: {
      type: 'array',
      maxItems: 40,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['id', 'verdict', 'note'],
        properties: {
          id: { type: 'string' },
          verdict: { type: 'string', enum: ['REAL-GAP', 'ALREADY-COVERED', 'NOT-A-DEFECT', 'STALE', 'UNVERIFIABLE'] },
          note: { type: 'string', description: 'What you ran/read. If ALREADY-COVERED, name the file:line that covers it.' },
        },
      },
    },
  },
}

const SLICES = [
  {
    key: 'bd',
    label: 'sweep:BD-the-957-file-blind-spot',
    prompt: `SLICE: **tranche BD alone — 957 markdown files, cited ZERO times by the live corpus.**

This is the single largest suspected gap. BD carried a first-principles greenfield/redesign framework and,
per the project record, a **full 118-page storybook + component audit** (multiple contexts per page →
per-page synthesis → category gestalt), plus a substrate canvas-resize fix across 9 visualizations, a
cta-receive fix, colorful-field fixes, and a "goo-morph triumvirate".

\`ls -R docs/tranches/BD/\` first and map its shape. Find the per-page/per-component audit output and the
greenfield-hardening plan/ledger. Then determine, for the audit findings specifically:
 (a) which were LANDED (check git log for the era's commits);
 (b) which were carried into a later tranche (grep BE/BF/BG/BH/BI/BJ for the finding);
 (c) **which simply stopped** — recorded, never disposed.

Category (c) is the deliverable. For each, check whether the defect is STILL LIVE at HEAD by reading the
source. Report the load-bearing ones with their component.

Also answer plainly: **is the 118-page audit reusable as a spec input today, or is it rotted against the
current tree?** Quantify — sample at least 10 findings and say how many still describe reality.`,
  },
  {
    key: 'components',
    label: 'sweep:component-audits-to-specs',
    prompt: `SLICE: **the component-audit → concrete-spec fold, across ALL tranches.**

The live corpus has terminal specs for exactly 8 of 62 components (\`${REF}/COMPONENT-WAVES-TERMINAL.md\`:
timeline handmark aurora tabs alert dock toast slider). The other 54 have none.

Your job: for those **54 uncovered components**, find what audit material ALREADY EXISTS across the 44
tranches that a spec could be written from — so the remaining 54 workflows are not starting from zero.

Enumerate \`src/components/\` for the true component list. Then sweep the tranches for per-component audit
findings: \`docs/tranches/*/audit*/\`, \`*/audits/\`, files matching \`*audit*\`, \`GESTALT*\`, \`*PASS[0-9]*\`,
\`*CRIT*\`, and the BG gestalt fold (9 families / 76 rows).

Return one row per component that has unfolded audit material: what exists, where, how much, and whether
it is still accurate at HEAD. Rank by (volume of existing material × severity of what it found), because
that ranking is the build order for the remaining 54 workflows.

Explicitly name any component with **zero** audit material anywhere — those need a from-scratch pass and
are the expensive ones.`,
  },
  {
    key: 'feedback',
    label: 'sweep:feedback-row-reconciliation',
    prompt: `SLICE: **every owner feedback item, reconciled to a concrete spec.**

Primary source: \`docs/tranches/BJ/FEEDBACK-LEDGER.md\` — 50 screenshot rows (F01-F50), 17 non-screenshot
asks (A01-A17), and consumer field report CFR-01. Screenshots at \`docs/tranches/BJ/feedback/*.png\`.
Secondary: \`${REF}/ECOUTE.md\` (178 lines of owner-row reconciliation) and \`${REF}/ASK.md\`.

**Also sweep EARLIER tranches for owner feedback that predates this ledger** — prior tranches carry their
own owner-verdict rows (grep for feedback ledgers, ECOUTE files, owner-mark tables). Owner feedback from
tranche AW or BD does not expire because a new ledger opened.

For EVERY row produce: the row, the owner's actual words (condensed), and its TRUE state —
  LANDED (name the commit, verify with git)
  OWNED (name the live wave or terminal spec that will do it — grep to confirm it really says so)
  TOUCHED-NOT-OWNED (mentioned somewhere in the corpus but with no terminal disposition — this is the
    dangerous category, it LOOKS handled)
  ORPHAN (no mention anywhere)
  RETIRED (killed with a stated rationale — name it)

The owner's standing edict is that a silent drop is forbidden. **TOUCHED-NOT-OWNED and ORPHAN are the
deliverable.** Sampling showed F13 and F29 appear in only one corpus file each — check those first, then
do all of them.

Be precise about the difference between a row being *cited* and a row being *dispositioned*.`,
  },
  {
    key: 'late',
    label: 'sweep:BG-BH-BI-IOS27',
    prompt: `SLICE: tranches **BG, BH, BI, IOS27-MICRO** — the immediate predecessors (466 + 96 + 395 + 96 md files).

These are the most likely to hold live, un-rotted unreconciled work, because they are recent and their
subject matter overlaps BJ directly.

 - **BG** — the 5.0.0 restructure: 3 audits + a gestalt fold (9 families / 76 rows) + 9 keystone specs +
   ATLAS-M inbound. Were the 76 gestalt rows all dispositioned? Were the 9 keystone specs implemented?
 - **BH** — repo-cleanup / de-indirection / 5.0.0 restructure, developed to ~91% via 3 convergent passes.
   What of that 91% actually landed? What did the remaining 9% contain?
 - **BI** — 91 waves + a 17-round audit + 20 Q-wave addenda placed untracked. The BI handoff names several
   status surfaces as stale/archival. What of BI never landed and never carried into BJ?
 - **IOS27-MICRO** — W-0 banked at \`1d0c17c6\` (6 PASS / 1 DEFER / 0 FAIL); W-1..W-7 scheduled into BJ's
   P-EX3 and still QUEUED. Is that whole micro-tranche simply parked?

For each: what remains, is it live at HEAD, and does the live BJ corpus own it. Check git for what landed.`,
  },
  {
    key: 'mid',
    label: 'sweep:AT-AZ+BA-BF',
    prompt: `SLICE: tranches **AT AU AV AW AX AY AZ BA BB BC BE BF** (BD is another seat's; skip it).

Era notes to orient you: AW halted on a headless-green/visually-broken gap and was re-formulated into AX
(30+ waves, dock-first). AY carried dock/demo feedback. AZ closed with the reflection-bar completion model
and published 3.13.0. BA published 4.0.0. BB was specced to 64 waves and then diagnosed as diseased; BC
was "the BB-disease cure" (96 waves, published 4.1.0). BE and BF were folded into a union.

**BB and BE and BF are the highest-suspicion members** — BB was abandoned as diseased and BE/BF were
unioned away. Work that is abandoned mid-flight is exactly where unreconciled items hide. Determine what
BB/BE/BF contained that was never carried anywhere.

Also: AV/G were formed as "READY-TO-EXECUTE on greenlight" — did they execute, or are they parked specs?

For each tranche: what shipped, what was carried forward, and what stopped. Report only what is still
LIVE at HEAD or still WANTED. Verify against git and source.`,
  },
  {
    key: 'early',
    label: 'sweep:early-tranches',
    prompt: `SLICE: the early tranches — **C D D-II E F H I J K L M N O P Q V AB AB+1 AB+2 AM AN AO AP AQ AR AS**.

25 tranches, mostly small (4-80 md files each), all with a FINAL.md except D-II. Old work rots, so your
default posture is **STALE unless proven live**.

Your job is NOT to inventory them. It is to find the few items that are still real:
 - a design decision or invariant that was RULED and is still binding but is absent from the live corpus
   (these are the dangerous ones — a rule nobody remembers is a rule that gets violated);
 - a deferred/parked item whose gate has since opened;
 - a known defect that was accepted-as-shipped and never fixed, and is STILL live at HEAD;
 - owner feedback from that era with no terminal disposition.

Read each FINAL.md first — that is where a tranche states what it did and did not finish. Follow up only
where a FINAL admits an unfinished item. Then verify at HEAD before reporting.

If a tranche is genuinely fully reconciled, say so in one line. Most probably are. Do not pad.`,
  },
  {
    key: 'invariants',
    label: 'sweep:rulings-and-invariants-drift',
    prompt: `SLICE: **binding rulings and invariants that drifted.**

Across the tranches, the owner and the leads issued RULINGS — laws, edicts, canons, invariants — that are
supposed to be permanently binding. This slice finds the ones the current tree VIOLATES.

Sweep for ruling-shaped language across all tranches: "RULING", "EDICT", "LAW", "CANON", "INVARIANT",
"BINDING", "STANDING", "NEVER", "ALWAYS", "MUST", "FORBIDDEN", "no legacy", "clean break".

Collect the distinct standing rules. Dedupe hard — the same rule restated in eight tranches is ONE rule.
Then, for each, **test the current source at HEAD for violations** and report only the violated ones with
the violating file:line.

Known live examples to verify and use as calibration (do not merely restate them — confirm and extend):
 - no masking fallback → the blob ships a 1,040-LOC WebGL2 fallback behind \`navigator.gpu\`;
 - \`light-dark()\` inset-shadow trap → an inset fragment inside \`light-dark()\` voids the whole box-shadow;
 - Vue scoped \`:global(.dark)\` silently drops from emitted CSS;
 - tests must never be colocated in \`src/\`;
 - the canonical proportion series in \`${REF}/PROPORTION.md\`.

The deliverable is a violated-invariant ledger with the source rule and the live violation.`,
  },
  {
    key: 'asks',
    label: 'sweep:open-asks-and-parked-gates',
    prompt: `SLICE: **every open ASK and every parked gate, across all tranches.**

BJ alone carries ~33 ASK rows and a large PARKED register (\`docs/tranches/BJ/EXECUTION-PROGRESS.md\`
§PARKED, \`docs/tranches/BJ/ASK.md\`, \`ASK-REDUCTION.md\`, and \`${REF}/ASK.md\` which reduced 33 to 6 under
a "silence advances the recommendation" rule). Earlier tranches have their own ASK registers.

Produce the union: every ask/gate that still blocks work, across every tranche. For each —
 - the ask, in the owner's terms;
 - what it blocks (named waves);
 - whether it was ANSWERED anywhere (an owner ruling elsewhere may have silently resolved it — search for
   that, it is the most valuable outcome here);
 - whether it is now MOOT (the thing it gated was deleted, or a later ruling superseded it).

Two rulings from 2026-07-25 that may moot a large number of these — verify their reach:
 (1) **Sol and Luna are dissolved; Claude owns BI and BJ.** Every "route to Luna", "await Sol critics",
     and model-law gate is void.
 (2) **Greenfielding is tranche-development work, done now** — the P-EX4 parking of the four greenfields
     is struck.

Say precisely how many parked items each ruling releases, and name them. That number is the deliverable.`,
  },
]

phase('Sweep')

const results = await pipeline(
  SLICES,
  (s) => agent(`${PREAMBLE}\n\n---\n\n${s.prompt}`, {
    label: s.label, phase: 'Sweep', model: 'opus', effort: 'high', schema: ROW_SCHEMA,
  }),
  (r, s) => {
    if (!r || !r.rows || !r.rows.length) return null
    const list = r.rows.map(x => `[${x.id}] sev=${x.severity || '-'} live=${x.live_at_head} covered_by=${x.covered_by}\n  ITEM: ${x.item}\n  SOURCE: ${x.source}\n  ROUTE: ${x.route}`).join('\n')
    return agent(
      `${PREAMBLE}

---

You are the VERIFIER for the "${s.key}" sweep. Another agent claims the rows below are UNRECONCILED.
Your default is that most are not — they are already covered, already fixed, or were never defects.

For each row:
 1. **Grep the live corpus** (\`${REF}/*.md\` and \`docs/tranches/BJ/waves/BAND-*.md\`) for the item. If it
    is owned there, verdict ALREADY-COVERED and name the file:line.
 2. **Read the source at HEAD.** If the defect no longer exists, verdict STALE.
 3. **Check git.** If a commit fixed it, verdict STALE and name the SHA.
 4. Only if none of that holds is it a REAL-GAP.
 5. If the "defect" is a matter of taste with no invariant behind it, verdict NOT-A-DEFECT.

Return a verdict for EVERY id. Be strict — a false gap costs the owner a wasted workflow.

ROWS:
${list}`,
      { label: `verify:${s.key}`, phase: 'Verify', model: 'opus', effort: 'high', schema: VERDICT_SCHEMA }
    ).then(v => ({ slice: s.key, read: r, verify: v }))
  }
)

const good = results.filter(Boolean)
log(`${good.length}/${SLICES.length} sweeps verified`)

phase('Fold')

const dossier = good.map(g => {
  const vm = {}
  for (const v of (g.verify?.verdicts || [])) vm[v.id] = v
  const rows = (g.read.rows || []).map(x => {
    const v = vm[x.id]
    return `- [${x.id}] ${v ? v.verdict : 'UNVERIFIED'} | sev=${x.severity || '-'} | live=${x.live_at_head} | comp=${x.component || '-'}
  ITEM: ${x.item}
  SOURCE: ${x.source} (${x.provenance})
  COVERED_BY: ${x.covered_by} | ROUTE: ${x.route}
  VERIFY: ${v ? v.note : '—'}`
  }).join('\n')
  return `\n### SWEEP ${g.slice}\nSCANNED: ${g.read.scanned}\nSUMMARY: ${g.read.summary}\n\n${rows}`
}).join('\n')

const fold = await agent(
  `${PREAMBLE}

---

You are the SYNTHESIZER. Eight sweeps covered all 44 tranches, each adversarially verified. Produce the
**TERMINAL RECONCILIATION LEDGER** — the document that makes it impossible for these items to be lost
again. Structure exactly:

**1 · THE HEADLINE NUMBERS.** How many real gaps survived verification, by tranche and by severity. How
many claimed gaps were refuted (already covered / stale / not a defect) — report that honestly, it
calibrates how much of the fear was real.

**2 · S0/S1 GAPS — live at HEAD, owned by nobody.** The actionable table: item · source · component ·
route. Ranked. This is what the owner acts on.

**3 · THE COMPONENT-AUDIT FOLD.** For each of the 54 components without a terminal spec: what audit
material already exists and where, so the remaining workflows start warm not cold. Name the components
with ZERO material — those cost the most.

**4 · THE FEEDBACK LEDGER, TRUED.** Every F/A/CFR row by true state: LANDED · OWNED · TOUCHED-NOT-OWNED ·
ORPHAN · RETIRED. Lead with TOUCHED-NOT-OWNED and ORPHAN — a silent drop is forbidden and those are the
silent drops. Give counts.

**5 · VIOLATED INVARIANTS.** Standing rules the tree breaks right now, with file:line.

**6 · ASKS RELEASED.** How many parked items the two 2026-07-25 rulings (Sol/Luna dissolved; greenfields
are development work) unblock, named. And what genuinely still needs the owner.

**7 · WHAT IS GENUINELY RECONCILED.** One short section confirming which tranches are closed and need
never be re-swept. This is as valuable as the gap list — it bounds future work.

**8 · THE BUILD ORDER.** Given all of it, the ordered plan for the remaining tranche formulation.

RULES: verifier beats reader. Never present a DOC-CLAIM as fact. If a sweep's coverage was thin, say so
and say what is still unswept. Dense tables. No filler, no exhortation. Em dashes without spaces.

DOSSIER:
${dossier}`,
  { label: 'fold:reconciliation-ledger', phase: 'Fold', model: 'opus', effort: 'high' }
)

return { fold, sweeps: good.length }
