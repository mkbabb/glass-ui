# BI.W-README-REMEDIATE — the machinery-gated complexity-trigger remediation (24→4)

> **Wave id:** `BI.W-README-REMEDIATE` · **band:** S3 (RECURSIVE COLOCATION) · **class:** `H` (device-free) ·
> **gate:** `proof:colocation` (G1 machinery-gated complexity trigger + composable-at-package-root clause) ·
> **preconds:** BI.W-FLATTEN-MOVE. The commissioned carry (a) machinery-gated READMEs.

## §0 — Verdict

`proof:colocation` derived its ENTIRE target set from README PRESENCE, so a complex family that OMITTED its README
was machine-invisible (the flagship live witness: `configurator/` — 3 SFCs, 1122 root lines,
`useConfiguratorState.ts` at the package root, NO README → PASS while ABSENT from the target set). The G1
machinery-gated complexity trigger (authored in BI.W-PROOF-STRUCTURE) ENROLLS a family INDEPENDENT of README
presence; this wave REMEDIATES the 4 it catches. The trigger closes a WHOLE-contract hole, not merely a doc-nag —
3 of the 4 ALSO red on the composable-at-package-root clause.

## §1 — The 4 caught families + their remediation

The machinery-gate narrows the raw ≥3-SFC storm 24→4 (the 23 thin shadcn compound-forwarders are SUPPRESSED —
forcing 23 ceremony READMEs violates edict 2). The 4 survivors each carry a real engine:

1. **`configurator`** (the born-RED flagship) — relocate `useConfiguratorState` under `configurator/composables/`,
   add a `README.md`, home its magic numbers in `constants.ts`. (A5″.)
2. **`carousel`** — `useCarouselWorm` + `composables/` machinery; add README, relocate the root composable.
3. **`drawer`** — `useDrawerSnap` + `constants.ts` machinery; add README.
4. **`progress`** — `useProgressGeometry` at root; relocate under `composables/`, add README.

`timeline` (6 SFC, NO machinery — `geometry.ts`/`types.ts` are plain helpers) is NOT caught by the machinery-gated
SFC arm but IS caught by the UNCONDITIONAL line-sum arm (`2274 > 1200`); its remediation is a README (its
`geometry.ts` STAYS a root sibling per BI.W-FOLD-CENSUS T4).

## §2 — Binding criteria (born-RED → GREEN)

- Born-RED: G1 flags configurator/carousel/drawer/progress (complexity-triggered, no README) + 3 of them on the
  composable-at-package-root clause; timeline on the line-sum arm.
- GREEN: each caught family carries a README AND (for the 3) its root composable relocated under `composables/`
  AND (configurator) its magic numbers in `constants.ts`. The 23 shadcn compounds stay README-free (suppressed —
  no ceremony storm).

## §3 — Fences

- The machinery-gate is LOAD-BEARING — do NOT add ceremony READMEs to the 23 thin shadcn forwarders (edict 2, the
  documentation axis of no-excessive-granularity).
- Line-sum is ROOT-only (depth-1); a recursive line-sum would penalize good colocation (a fat `composables/`
  subtree).
- The card/toast/dialog/select boundary (9 SFC / 798 root-ln / NO machinery) stays SUPPRESSED for 5.1.0 (a thin
  forwarder compound is navigable by its barrel) — recorded-open, revisit if a reviewer finds one un-navigable.
- README-scope at feature-interior scale (does G1 storm graduated `features/<x>/ui/<Name>/`?) is RE-CONFIRMED in
  BI.W-DIFFERENTIAL-CLOSE (R6-FOLD directive #5).
- ZERO paint change.

## §4 — Cross-refs

R6-5 (machinery-gated trigger); §2.1 + §6 G1 (the predicate); Appendix A5″ (the remediation); the composable-at-
package-root whole-contract hole.
