export const meta = {
  name: 'validation-cures',
  description: 'CURE-4: adjudicate the canon-opus CROSS-FOLD vs the terminal record · CURE-5: W-OVERLAY (#89) thrice-design — the last unowned spec',
  phases: [
    { title: 'Work', detail: 'CROSS-FOLD adjudication ∥ W-OVERLAY design arms', model: 'fable' },
    { title: 'Seal', detail: 'W-OVERLAY apotheosis', model: 'fable' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const XF = '/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/cures/cross-fold.md'
const CANON = `Repo /Users/mkbabb/Programming/glass-ui, 2026-07-28, VALIDATION cures. State your
modelId. Author no repo byte — text is the deliverable. Consume FIRST: ${REF}/EXEC-STATE.md (all
rulings) · ${REF}/VALIDATION.md (the certificate; you are executing its cures) · ${REF}/TERMINAL-ROSTER.md.
Em dashes without spaces.`

phase('Work')
const OVERLAY_BRIEF = `W-OVERLAY (#89) — THE LAST UNOWNED SPEC (CURE-5: "blocks four banked terminals").
Research: the overlay/scrim/portal surface at HEAD (ModalOverlay.vue, DrawerOverlay.vue, portal
wrappers, scrim tokens; the FROST-TABS ruling that deleted their backdrop-filter; NOVELTIES X-G
corollary — nothing forming a backdrop root sits above glass; G-SCRIM-NO-BLUR seat; LAW 10's two-glasses
rule (toward-content lightens, away darkens); MOTION-CANON §5 veil law) + which four terminals #89
blocks (grep the roster). Design the terminal W-OVERLAY spec: the ONE overlay register (scrim material —
ink-veil not blur; both modes; the veil's clock per §5), portal/backdrop-root discipline, dismissal
physics (EXIT=0.6×ENTRY), a11y (inert/focus containment), born-RED gates from the seated set (no new
gates — the budget is full). Fully formed per the Seventh Ecoute — zero deferred design. Spec shape:
COMPONENT-WAVES-TERMINAL-2 (9 sections, π rows both engines).`

const [xfold, oF, oO] = await parallel([
  () => agent(`${CANON}

CURE-4 — THE CROSS-FOLD ADJUDICATION. The canon-opus run's harvested CROSS-FOLD (never banked, never
retired) is at ${XF} — read it in full. It carries CF-1..CF-10 cross-component facts, a twelve-primitive
layer proposal, and a 16-prop dock-API death table, all authored 07-24 AGAINST A PRE-REFINEMENT record.
Adjudicate EVERY fact against the terminal record at HEAD (TERMINAL-ROSTER + COMPONENT-WAVES-TERMINAL*
+ GESTALT + NOVELTIES + the banked apotheoses): per fact — ADOPTED (it adds something the terminal
record lacks; name the receiving wave§) / ALREADY-SEATED (cite where — the expected majority) /
REFUTED (falsifier). No silent drops; end with the counts. This retires the debt: your output is the
CROSS-FOLD's disposition of record.`,
    { label: 'cure4:cross-fold', phase: 'Work', model: 'fable', effort: 'xhigh' }),
  () => agent(`${CANON}\n\nYou are DESIGN ARM (one of two, independent).\n\n${OVERLAY_BRIEF}`,
    { label: 'overlay:fable', phase: 'Work', model: 'fable', effort: 'xhigh' }),
  () => agent(`${CANON}\n\nYou are DESIGN ARM (one of two, independent).\n\n${OVERLAY_BRIEF}`,
    { label: 'overlay:opus', phase: 'Work', model: 'opus', effort: 'xhigh' }),
])

phase('Seal')
const arms = [oF, oO].filter(Boolean)
const overlay = !arms.length ? null : arms.length === 1 ? arms[0] : await agent(`${CANON}

THRICE-DESIGN APOTHEOSIS — W-OVERLAY. Two independent designs; agglomerate with sagacity and
INCREDULITY, choosily; reproduce contested disk claims; RULE, never average; losers to §REJECTED with
falsifiers. Emit the fully formed terminal spec.

===== FABLE =====\n${oF}\n\n===== OPUS =====\n${oO}`,
  { label: 'overlay:apotheosis', phase: 'Seal', model: 'fable', effort: 'xhigh' })

return { xfold, overlay }
