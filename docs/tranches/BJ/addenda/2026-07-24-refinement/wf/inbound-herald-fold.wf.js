export const meta = {
  name: 'inbound-herald-fold',
  description: 'Fold the three 07-29 inbound registers (value.js O-19, atlas herald, speedtest GLASS-BK-DISPOSITIONS) into the sealed roster + draft the reply relays',
  phases: [
    { title: 'Adjudicate', detail: 'Opus per-register seat-checks vs the sealed roster', model: 'opus' },
    { title: 'Write', detail: 'Fable seats the fold + authors the reply packets', model: 'fable' },
    { title: 'Certify', detail: 'Opus critic', model: 'opus' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const CANON = `Repo /Users/mkbabb/Programming/glass-ui, 2026-07-29 (HEAD 62575d4e, the compact-and-implement
order). State your modelId. Consume FIRST: ${REF}/EXEC-STATE.md (§THE COMPACT-AND-IMPLEMENT ORDER ·
§THE RATIFICATION · both §THE OWNER SITTING rounds — the component law: carousel KEEP+deck substrate,
instrument-chassis DELETE CONFIRMED, metric family → #87, watercolor-dot RELOCATES to value.js,
muster=prototype) · ${REF}/TERMINAL-ROSTER.md (the sealed 90-row PLAN-of-record; §C consumer rows,
#76 the consumer band, #18 deletes, #40 deck, #87 metric) · ${REF}/DECK-RELOCATION.md ·
${REF}/PROOF-SWEEP.md lane B. Sibling repos READ-ONLY. Em dashes without spaces. One-source law:
cite rows, never restate specs. Gates stay EXACTLY 60. No silent drops — every inbound item gets a
disposition.`

phase('Adjudicate')
const REGISTERS = [
  { key: 'valuejs-o19', path: 'docs/tranches/BJ/coordination/valuejs-outbound-2026-07-29-o19-execution-herald-manifest.md', note: `30 items: §A A-1..A-22 asks · §B B-1..B-6 glass-owned debts · §D two early notices. For EACH: name the owning BK roster row (e.g. Button asks → #80 · slider family → its W-SLIDER lane · dialog/ConfirmDialog → the dialog lane #38/#39 · chassis G-1..G-9 → CONFLICT with the owner's chassis DELETE (EXEC-STATE item 9 — rule what survives: the G-9 proportion TOKENS may re-home, the component dies) · A-18 watercolor indicator species → adjudicate vs the watercolor-dot RELOCATE-to-value ruling (#55) + the toggle/tabs lanes · §B debts → verify each already has a roster home (B-1 orphaned dist CSS, B-2 roving rail → GF-DOCK, B-3 spectrum seam, B-4 S0 corroboration → #1/#2, B-5/B-6 → their lanes). Verdict per item: ALREADY-SEATED(row) / NEW-SEAT(row, the one-line addition needed) / CONFLICT(the ruled correction to relay back).` },
  { key: 'atlas-herald', path: 'docs/tranches/BJ/coordination/atlas-herald-2026-07-29-execution-relay.md', note: `8 producer items A-1..A-8 + §B contract restatement + §C three flags. Seat-check: A-1 color-mix dock abort → the Safari fence #6/#7 + the webkit cell law · A-2 TypewriterText sizing race → the typewriter lane · A-3 dock circular aspect-ratio + visibility floor + section-pill → GF-DOCK #47 (verify which W) · A-4 rail truncation-impossible → #47/#72 rail vocabulary · A-5 button min() stadium bound → #80 + the radius canon #23/#68 · A-6 toggle-group concentric radius → #23/#31 · A-7 --type-admin-label DELETE at 8.0.0 → the type ladder #68/#78 · A-8 --radius-button double-authority → #68/#23. Verify §B's restated contracts match our pass-2 response on disk (grep the coordination dir). Note §C-1's W-DESIGN-CANON consumer brief flag → a #78 sequencing note (the brief is a FLAG, never a blocker). Same verdict grammar.` },
  { key: 'speedtest-bk', path: '/Users/mkbabb/Programming/speedtest/docs/tranches/AX/audit/2026-07-28-session-resumption/GLASS-BK-DISPOSITIONS.md', note: `READ-ONLY sibling file (+ skim FINAL-HANDOFF.md §6 beside it). ~25 cells. CONFLICT cells to rule for the correction relay: chassis "Preserve upstream, data/instrument" (the owner DELETED it — speedtest's own no-shim law already covers the recompose) · completion-seal "Preserve upstream, feedback/completion" (DELETE-with-relay, destination atlas) · animated-digit "Preserve upstream, motion/text" (DELETE-with-relay) · ExpandableContainer "merge into Dialog" (verify OUR roster's actual EC disposition — grep it; correct if they invented one) · ScrollProgressRim "fold into navigation/progress" (our census: STAY as-is) · their invented BK family names (data/instrument, feedback/completion, motion/text, data/metric — verify against OUR terminal family matrix and name the real one). CORROBORATION cells to bank: the eleven missing-subpath list vs our ALREADY-CUT census · pulse deletion · metric grammar → #87 · no-shim law alignment. Same verdict grammar.` },
]
const adj = await parallel(REGISTERS.map(r => () =>
  agent(`${CANON}\n\nYou are a REGISTER ADJUDICATOR (${r.key}). Read ${r.path} in full.\n\n${r.note}\n\nEnd with the item count and zero-silent-drop confirmation.`,
    { label: `adj:${r.key}`, phase: 'Adjudicate', model: 'opus' })))

phase('Write')
const written = await agent(`${CANON}

THE INBOUND-FOLD WRITER (Fable) — you own ${REF}/TERMINAL-ROSTER.md + docs/tranches/BK/EXECUTION-PROGRESS.md
+ the new coordination files this cut. Three adjudicated registers below. Acts:
(1) Seat every NEW-SEAT as a ⊕⁷ one-line annotation on its owning roster row / TR §C repo row (cite
the register file + item id; never restate the ask body — the coordination file is the bank).
(2) Author ${REF}/INBOUND-2026-07-29.md — the consolidated fold register: per item one row
(id · source · verdict · seat-or-correction cite). This is the executing session's single read.
(3) Author THREE outbound reply packets in docs/tranches/BJ/coordination/:
  glass-outbound-2026-07-29-o19-receipt.md (to value.js — receipt + per-item routing + the ruled
  CONFLICT corrections: the chassis death + what survives of G-1..G-9, the watercolor-indicator
  adjudication, per E13 no ask silently dies);
  glass-outbound-2026-07-29-atlas-receipt.md (to atlas — per-item routing, the §B contract
  re-affirmation, the #78 sequencing note for their canon brief flag);
  glass-outbound-2026-07-29-speedtest-bk-corrections.md (to speedtest — the conflict-cell
  corrections vs the sealed law, the corroborations acknowledged, the REAL terminal family map
  cited by row, and the glass-side model law restated in one line: codex = occasional audit
  evidence, the tri-fold drives — so no cross-repo process drift lands on us).
(4) One ⊕⁷ line on the BK cursor #76 row + the cursor header noting the inbound fold.
Gates +0. Return the change summary + per-register counts.

${adj.filter(Boolean).map((a,i) => `===== ${REGISTERS[i].key} =====\n${a}`).join('\n\n')}`,
  { label: 'write:inbound-fold', phase: 'Write', model: 'fable', effort: 'xhigh' })

phase('Certify')
const critic = await agent(`${CANON}

CRITIC. Falsify the fold: (a) every item id from all three registers appears in ${REF}/INBOUND-2026-07-29.md
with a verdict (count them against the sources); (b) every NEW-SEAT line exists at its named row (grep);
(c) the three outbound packets exist and carry every CONFLICT correction; (d) gates still exactly 60;
(e) no spec body was restated (spot 5). Report ONLY misses with proving greps; one line if total.

WRITER:\n${written}`,
  { label: 'certify:inbound', phase: 'Certify', model: 'opus' })

return { written, critic }