export const meta = {
  name: 'perfect-fold-and-bk-cut',
  description: 'The perfecting pass: fold ARCHAEOLOGY/GESTALT/tier-3 deltas into TERMINAL-ROSTER, then cut tranche BK from BI+BJ+the refinement corpus — tri-fold',
  phases: [
    { title: 'Fold', detail: 'Fable ∥ Opus author the amended roster → Fable adjudicates', model: 'fable' },
    { title: 'Cut', detail: 'Fable ∥ Opus author the BK tranche file-set → Fable adjudicates + writes', model: 'fable' },
    { title: 'Verify', detail: 'Opus completeness critic over the written tranche', model: 'opus' },
    { title: 'Seal', detail: 'Fable foreman: cure misses, seal the cut', model: 'fable' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const CANON = `Repo /Users/mkbabb/Programming/glass-ui, tranche BJ→BK, 2026-07-27. State your modelId.
Dense tables, file§ citations, em dashes without spaces. Consume FIRST: \`${REF}/EXEC-STATE.md\` (all
standing rulings incl. THE RATIFICATION section), then \`${REF}/RATIFICATION.md\` (every former blocker
is RULED there — cite it, never re-ask). The one-source-of-record law is absolute: specs are CITED,
never copied — duplicated derived data is the convergence disease ([[feedback-convergence-gates]]).`

const FOLD_BRIEF = `AMEND \`${REF}/TERMINAL-ROSTER.md\` — author the complete amended body (not a diff).
Fold, with per-delta dispositions (ADOPT/REFUTE-with-grep, no silent drops):
(a) \`${REF}/ARCHAEOLOGY.md\` §4 — the row #70 intake payload, §2.1 RE-EXHORT edicts (wave-anchored,
born-RED where gateable), §2.2 PRUNE verdicts, the new BUILD rows (eyeglass default · scroll-to-shrink ·
rainbow hairline · rail-rename-before-rebuild · the Stop-hook ruling-batch row).
(b) \`${REF}/GESTALT.md\` §4 routed deltas — the Ruling-1 delete dispositions with their named consumers,
deck RE-HEAR, W-DESIGN-CANON, the suffusion row-set (3 shared files close 15 INERT components), the
whole-repo consumer-walk rule, the §2 target census.
(c) \`${REF}/COMPONENT-WAVES-TERMINAL-3.md\` — the ten tier-3 lanes' waves + its fold's collisions
(field register, binary-control extraction, selection register, track seam — one owner per file per cut).
(d) \`${REF}/RATIFICATION.md\` — strike every "owner-owed" mark the roster carries for rows now RULED;
blocker #4 is DISCHARGED; the capture-time glances (r7 A/B, F50, DUSK) become in-wave capture rows with
their ratified defaults.
Keep the roster's own §0-§D shape, the 60-seat gate budget law (add-one-retire-one), and re-verify any
figure you touch on disk. Every wave still cites its spec-of-record.`

phase('Fold')
const [fO, fF] = await parallel([
  () => agent(`${CANON}\n\nYou are FOLD ARM (one of two, independent).\n\n${FOLD_BRIEF}`, { label: 'fold:opus', phase: 'Fold', model: 'opus', effort: 'xhigh' }),
  () => agent(`${CANON}\n\nYou are FOLD ARM (one of two, independent).\n\n${FOLD_BRIEF}`, { label: 'fold:fable', phase: 'Fold', model: 'fable', effort: 'xhigh' }),
])
const fArms = [fF, fO].filter(Boolean)
if (!fArms.length) throw new Error('both fold arms died')
const roster = fArms.length === 1 ? fArms[0] : await agent(`${CANON}

TRI-FOLD ADJUDICATOR — two independent amended rosters. Agglomerate with sagacity and INCREDULITY:
spot-check contested rows on disk, reproduce and RULE every disagreement (row membership, gate merges
against the 60 ceiling, collision ownership), never average; losers to §REJECTED with falsifiers.
Then WRITE the result to \`${REF}/TERMINAL-ROSTER.md\` yourself (you own the file this cut; full body,
overwrite). Return a change-summary + the final row/gate counts.

===== FABLE =====
${fF || '(died)'}

===== OPUS =====
${fO || '(died)'}`, { label: 'fold:apotheosis', phase: 'Fold', model: 'fable', effort: 'xhigh' })

const CUT_BRIEF = `CUT TRANCHE BK — the ratified execution tranche (EXEC-STATE §THE RATIFICATION: BK
ports the unexecuted remainders of BI + BJ + the refinement corpus into ONE clean cut). Author the
complete file-set as TEXT (one fenced block per file, path-labelled) — do NOT write files:
- \`docs/tranches/BK/PLAN.md\` — thin: BK's charter, the phase order, and a POINTER to
  \`${REF}/TERMINAL-ROSTER.md\` as the PLAN-of-record (never copy the roster).
- \`docs/tranches/BK/EXECUTION-PROGRESS.md\` — the cursor, initialized: every roster wave a row
  (id · phase · state=UNSTARTED · spec-of-record file§ · gate ids), Φ0 rows first.
- \`docs/tranches/BK/PORT.md\` — the port ledger: every row ported from BI (JUDGMENT-ROSTER remainders,
  Q051 carries) and BJ (WAVES.md live rows, §PARKED released rows, returned-Luna backlog) with
  FROM → BK disposition; every BI/BJ row NOT ported gets RETIRED/SUPERSEDED with grounds. Nothing
  silently dropped — the count reconciles.
- \`docs/tranches/BK/ASK.md\` — near-empty by construction: only the three capture-time glances with
  their ratified defaults (RATIFICATION §6).
- \`docs/tranches/BK/gates/ROSTER.md\` — the 60 seats verbatim-by-citation from the roster §B.5.
- Supersession marks (small header edits, quoted exactly): \`docs/tranches/BI/PLAN.md\` +
  \`docs/tranches/BJ/PLAN.md\` + \`docs/tranches/BJ/EXECUTION-PROGRESS.md\` each gain a 3-line
  SUPERSEDED-INTO-BK banner naming PORT.md as the map.
Charter constraints: tranche-format law (docs/tranches/{LETTER}/, hard gates, FINAL.md at close);
greenfield-in-development is DONE (the specs exist — BK is execution); the tri-fold labor law and the
durability edict quoted; born-RED gates bite from day one; no legacy language, no "ported from" prose
in any BK artifact body beyond PORT.md itself.

THE AMENDED ROSTER (just adjudicated):
${'${ROSTER}'}`

phase('Cut')
const cutPrompt = CUT_BRIEF.replace('${ROSTER}', () => roster)
const [cO, cF] = await parallel([
  () => agent(`${CANON}\n\nYou are CUT ARM (one of two, independent).\n\n${cutPrompt}`, { label: 'cut:opus', phase: 'Cut', model: 'opus', effort: 'xhigh' }),
  () => agent(`${CANON}\n\nYou are CUT ARM (one of two, independent).\n\n${cutPrompt}`, { label: 'cut:fable', phase: 'Cut', model: 'fable', effort: 'xhigh' }),
])
const cArms = [cF, cO].filter(Boolean)
if (!cArms.length) throw new Error('both cut arms died — the adjudicated roster is in the journal')
const cut = await agent(`${CANON}

TRI-FOLD ADJUDICATOR + WRITER — two independent BK file-sets. Agglomerate with sagacity and INCREDULITY
(reproduce contested port rows against BI/BJ on disk; rule, never average; losers to §REJECTED in
PORT.md). Then YOU ALONE write the winning file-set to disk exactly as specified (BK files + the three
supersession banners — you own every touched file this cut). Return: files written with line counts,
the port-ledger reconciliation count, and any row you could not seat.

===== FABLE =====
${cF || '(died)'}

===== OPUS =====
${cO || '(died)'}`, { label: 'cut:apotheosis', phase: 'Cut', model: 'fable', effort: 'xhigh' })

phase('Verify')
const critic = await agent(`${CANON}

COMPLETENESS CRITIC over the WRITTEN tranche (read docs/tranches/BK/ from disk). Falsify by grep:
(a) every roster wave id appears exactly once in EXECUTION-PROGRESS.md; (b) every live BI/BJ row is in
PORT.md as PORTED or RETIRED (sample-walk BI/JUDGMENT-ROSTER.md + BJ/WAVES.md + BJ §PARKED — count and
reconcile); (c) the 60 gate seats match the roster §B.5 exactly; (d) the three supersession banners
exist on disk; (e) no BK file COPIES spec bodies (spot-check: a spec paragraph appearing verbatim in
two places is a FAIL); (f) ASK.md carries exactly the three glances. Report ONLY misses with the grep
that proves each; one line if genuinely total.

CUT REPORT:\n${cut || '(writer died — say so)'}`, { label: 'verify:critic', phase: 'Verify', model: 'opus', effort: 'xhigh' })

phase('Seal')
const seal = await agent(`${CANON}

FOREMAN — cure every critic miss ON DISK (you own the BK files + TERMINAL-ROSTER for this seal;
ADOPT each miss with the fixing edit, or REFUTE with the grep that kills it — no silent drops). Then
return the SEAL VERDICT: BK cut-complete or not, remaining blockers named plainly, the one-paragraph
state a fresh session needs.

CRITIC:\n${critic || '(critic died — verify (a)-(f) yourself before sealing)'}

CUT REPORT:\n${cut || '(missing)'}`, { label: 'seal', phase: 'Seal', model: 'fable', effort: 'xhigh' })

return { seal }
