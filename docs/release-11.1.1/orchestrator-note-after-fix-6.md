# The orchestrator's ruling on fix 6's open item (2026-11-17). BINDING for fix seat 7 and critics 7 on.

Fix 6 bisected critique 5's defect 1 to `useDisclosureTurn` (`src/components/_shared/disclosure/turn.ts`, added in `001a726e8`) and found no form of it that keeps row 5's claim for a disclosure without the stall: the shipped seek, the negative delay, the delay by arithmetic and the turn keyframes all stall; only the read-only form is clean, and it restarts from the far end. The stall lives in WebKit's GPU process, starts at an ordinary close of a rested Accordion or Collapsible on the full exits page, and carries over to the browser's later contexts until it restarts. Without the turn no film stalls (0 of 48).

## Ruling: the disclosure turn leaves 11.1.1

A patch release does not take a risk to every close for a claim about the rare reversal. With the turn, a plain close of a rested disclosure can set off the slow state, so the cost would reach anyone who closes an Accordion on a busy page in WebKit; real Safari cannot be read from here. Without it, a disclosure behaves as in 11.1.0, so nothing regresses.

- Remove `useDisclosureTurn`, its two call sites and anything only it uses, as one commit that names `001a726e8`. No dead code, no flag, no fallback. Every other surface's reversal (menus, popovers, the Select, the sheet, ExpandableContainer) keeps its turn and its cells.
- The four disclosure reversal cells (`reverse · a Collapsible reopened`, `· a Accordion reopened`, and the two "closed while it opens") leave row 5's witness, with one line in the spec saying the disclosure turn moved to 11.1.2. The gate does not read them in 11.1.1.
- One cell stays, as a guard against a regression: a disclosure reopened while it closes finishes its reopen without a holed film and without a failure, in WebKit 390 and Chromium 390 (that is 11.1.0's behaviour, and it must hold).
- The CHANGELOG's row 5 sentence names the surfaces that turn from where they are and does not name the Accordion or the Collapsible.
- The ratchet is rebound once after the last source commit.
- Witness: the exits gate's part B green in WebKit 390 three times running, and part B's other cells as before; v11.1.0's reds on the remaining row 5 cells stay red.

## Booked for 11.1.2

The disclosure turn, with its cause found before a cure: what the turn's presence does on the full exits page that sets WebKit's GPU process into a slow state that outlasts the page (fix 6's stall harness, `probe/stall-harness.ts` with `stall7.probe.ts`, is the reproduction: 0 of 12 alone, 10 of 17 with the dock, the rows and ExpandableContainer added back). The cure keeps the claim and reads clean in WebKit 390 on that page, and the GPU process's CPU during a reversal stays within v11.1.0's.
