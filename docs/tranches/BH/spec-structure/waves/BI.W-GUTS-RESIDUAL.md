# BI.W-GUTS-RESIDUAL — the §2.5 guts-reach residual enumeration (R6-FOLD directive #2)

> **Wave id:** `BI.W-GUTS-RESIDUAL` · **band:** S4 (RESIDUE VERIFICATION) · **class:** `H` (device-free) ·
> **gate:** `proof:import-boundaries` (G4 cross-component-GUTS arm, warn-staged) · **preconds:**
> BI.W-PROMOTE-CONTEXT, BI.W-PROMOTE-PRIMITIVES. A born-RED VERIFICATION wave (the residue routes into the DAG as
> the adjudication commissioned).

## §0 — Verdict

The 5.1.0 tree is NOT claimed §2.5-clean at the cut on the direct-SFC-guts residual (blocker-fold's G4-staging,
recorded-open). The flatten is a pure path-relabel (introduces no new guts reach); the PROMOTE waves green the
BURIED-primitive/context subset of the 25 reaches. But a SMALL residual of direct cross-family-SFC-guts reaches
that are NOT buried primitives survives — this wave ENUMERATES it at the cut and DECIDES per-reach, so the tree's
§2.5 status is EXPLICIT, not asserted. (R6-FOLD cut-time verification directive #2.)

## §1 — The enumeration + per-reach decision

Enumerate the EXACT residual cross-family-SFC-GUTS reach set the 5.1.0 flatten+PROMOTE tree retains. The live
witness (verified): `ContinuousMarkers.vue → hover-popover/HoverPopover.vue` — a direct SFC reach that wants a
re-point to the `hover-popover` BARREL, NOT a promote (it is not a buried primitive). For each residual reach,
DECIDE:

- **re-point to the sibling BARREL IN-cut** where trivial (the `components → sibling BARREL` LEGAL edge);
- **else book to the deferred barrel-discipline pass** (R6-4) — the reach is warn-gated in 5.1.0 and flips to
  `error` when that pass greens it.

## §2 — Binding criteria (born-RED → GREEN)

- Born-RED: `proof:import-boundaries` cross-component-GUTS arm flags the enumerated residual set (after the
  PROMOTE waves have removed the buried-primitive/context subset).
- GREEN (warn-staged): the residual set is ENUMERATED + DECIDED per-reach; the trivial re-points landed; the
  deferred set is BOOKED (warn-gated, named to R6-4). The arm ships `warn`-gated for the enumerated residual in
  5.1.0 and flips to `error` when the barrel-discipline pass greens it.
- The tree's §2.5 status at the cut is RECORDED explicitly (a reader must NOT read the 5.1.0 flat tree as fully
  §2.5-clean until the barrel-discipline pass lands).

## §3 — Fences

- This wave does NOT do the barrel-discipline pass (R6-4 — a later graph-invariant pass with a POSITIVE
  pure-barrel DCE measurement). It ENUMERATES + DECIDES + BOOKS.
- The buried-primitive/context reaches are already resolved (BI.W-PROMOTE-*) — this is the NON-buried residual
  only.
- ZERO paint change.

## §4 — Cross-refs

R6-FOLD directive #2; §6 G4 (cross-component-GUTS 5.0.0 staging); R6-4 (deferred barrel-discipline pass); §9.3.
