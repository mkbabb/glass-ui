export const meta = {
  name: 'no-incomplete-work-validation',
  description: 'Validate every workflow seat across all 28 runs: nothing incomplete, nothing harvested-unbanked, every debt owned — the completeness certificate',
  phases: [
    { title: 'Audit', detail: 'Opus — run coverage ×2 + the debt hunter', model: 'opus' },
    { title: 'Certificate', detail: 'Fable — VALIDATION.md verdict', model: 'fable' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const WFD = '/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows'
const CANON = `Repo /Users/mkbabb/Programming/glass-ui, 2026-07-28. State your modelId. Author no repo
byte — text is the deliverable. THE EDICT under audit: NO incomplete work, ever — every workflow seat
completed or its loss cured; nothing harvested-but-unbanked; every declared debt has a named owner and
trigger. Journals live under ${WFD}/<runId>/journal.jsonl (one {"type":"result",…} line per completed
agent; keys are hashes — identify seats by content). The run ledger of record: ${REF}/WORKFLOWS.md.
Live runs (novelties wf_16a39d5d-36b · perfect wf_54069001-013 · design-now wf_2eec57c9-fb5) are
IN-FLIGHT, not incomplete — validate their journals grow, nothing more. Em dashes without spaces.`

phase('Audit')
const [covA, covB, debts] = await parallel([
  () => agent(`${CANON}

RUN-COVERAGE VALIDATOR A — the ten named closed runs of the first waves: apotheosis wf_df5ddb7a-134
(88 results, ledger says 60/60) · dag wf_5e7dd9f7-18a (28 vs 16/16) · structure wf_71b65b7b-323 (34 vs
22/22 — its zone-settlement debt was just banked as ${REF}/STRUCTURE-ZONES.md; verify the five banked
settlements match the journal's five largest and that NO sixth adjudicated settlement exists) ·
proportion wf_6cb9f75f-b6c (39 vs 31/31) · reckoning wf_b5c595d5-e53 (14/14) · reconcile wf_6b459be5-e21
(17/17) · tier2 wf_aaa19aee-da2 (71 vs 65/65) · layout wf_ab31a195-57f (8/8) · greenfield wf_50bff562-da7
(55 results, ledger 41/42 — ONE arm died to a schema retry cap, "duplex absorbed it": RULE whether the
lost arm's work is genuinely absorbed/superseded (GF-BLOB re-cut by design-now, GF-AURORA by procedural)
or still owed) · procedural wf_51cdb0e0-bdb (16/16). Result-count > ledger-count is EXPECTED (resume
replays append). Per run: expected seats (from ${REF}/wf/<script>) vs distinct completed seats in the
journal · any adjudicated output whose content is in NO banked artifact (grep the corpus for distinctive
strings from it) · verdict COMPLETE / DEBT(named). Facts + greps.`,
    { label: 'coverage:first-wave', phase: 'Audit', model: 'opus', effort: 'high' }),
  () => agent(`${CANON}

RUN-COVERAGE VALIDATOR B — (i) the six recent closed runs: gestalt wf_e3eec3a9-c1f→GESTALT.md ·
consolidate wf_1f04cfd9-089→TERMINAL-ROSTER.md · archaeology wf_1a9b1bd8-dad→ARCHAEOLOGY.md · tier3
wf_c6d8b0c5-fcf→COMPONENT-WAVES-TERMINAL-3.md · frost wf_b0b48d79-692→FROST-TABS-REAUDIT.md ·
exemplars wf_a31672c0-e81→EXEMPLARS-CODEX.md. Per run: journal seat census vs script; the banked file
EXISTS, is non-truncated (its final section present — e.g. a §REJECTED/accounting/verdict tail), and
its content matches the journal's final apotheosis (spot-string check). (ii) The nine historical Jul-24
runs (wf_04a3ee0a 0-results · wf_07793cb6 0 · wf_a8cdd58c 0 · wf_23e9336d 1 · wf_8ade5527 1 ·
wf_823db7d5 6 · wf_6f229ca3 10 · wf_0a472ed6 12 · wf_fcfb62ad 9): the ledger calls their scripts
historical/superseded — for each, name WHICH later run superseded its intent and confirm the
superseding run banked; a 0-result aborted launch with a superseding successor is CLEAN, one without
is DEBT. Verdicts per run.`,
    { label: 'coverage:recent+historical', phase: 'Audit', model: 'opus', effort: 'high' }),
  () => agent(`${CANON}

THE DEBT HUNTER — sweep ${REF}/*.md + docs/tranches/BJ/EXECUTION-PROGRESS.md for every
declared-but-not-yet-done marker: "in journal" · "unbanked" · OWED · "owed" · QUEUED · "stage-2" ·
"at its bank" · "pending" · "fires on/after" · "when … closes" · "STAGE-2 DELTA" · "re-bank" ·
"boundary dut" · "carry" rows that name future action. Per hit: file:line · the debt · its OWNER
(a live run / a declared trigger / a roster wave / an owner glance) · classification: SEQUENCED (has
a named owner+trigger — legal) / DISCHARGED-ALREADY (the doc is stale, the work is done — cite where) /
ORPHAN (no owner, no trigger — the edict violation class). ORPHANS are the deliverable. Also verify the
three live runs' journals have grown within the last 30 minutes (ls -l timestamps) — a stalled live run
is a debt.`,
    { label: 'debt-hunter', phase: 'Audit', model: 'opus', effort: 'high' }),
])

phase('Certificate')
const cert = await agent(`${CANON}

THE COMPLETENESS CERTIFICATE — adjudicate the three audits with INCREDULITY (reproduce any contested
cell yourself: journals and the corpus are on disk). Emit the VALIDATION.md body: §1 the run table —
all 28 runs, each COMPLETE / SUPERSEDED-CLEAN / IN-FLIGHT / DEBT(cure named) · §2 the debt register —
every SEQUENCED debt with its owner+trigger (the legal list), every ORPHAN with its CURE assigned NOW
(no orphan survives this document — assign it to a roster wave, a live run's stage-2, or name it a
new banking action performed by the lead on read) · §3 the greenfield 41/42 ruling · §4 THE STANDING
PROTOCOL (the edict operationalized): at every run close the lead verifies agents_error==0 or resumes;
result-vs-expected census before the ledger row reads CLOSED; harvested-not-banked journal material is
DEBT and blocks CLOSED; every future QUEUED/stage-2 declaration names owner+trigger at declaration time.
One line at the end: the certificate — CLEAN or the count of open cures.

===== COVERAGE A =====\n${covA || '(died — validate A yourself from the journals)'}
\n===== COVERAGE B =====\n${covB || '(died)'}
\n===== DEBT HUNTER =====\n${debts || '(died)'}`,
  { label: 'certificate', phase: 'Certificate', model: 'fable', effort: 'xhigh' })

return { cert }
