# BI.W-BLOCK-DISJOINT — the non-scoped-global SFC-block disjointness proof (R6-FOLD directive #3)

> **Wave id:** `BI.W-BLOCK-DISJOINT` · **band:** S4 (RESIDUE VERIFICATION) · **class:** `H` (device-free) ·
> **gate:** `proof:css-colocation-golden` (the non-scoped-global disjointness arm) · **preconds:**
> BI.W-FLATTEN-MOVE. A born-RED VERIFICATION wave (blocker-fold #6). Honorable-mention riskiest wave — the ONE
> paint-adjacent risk in the tranche.

## §0 — Verdict

The golden gate's scoped-token-SET invariant + byte rebaseline covers SCOPED blocks (scope-isolation makes their
reorder benign) but is BLIND to the reorder of the ~6 DELIBERATE non-scoped/unlayered GLOBAL SFC `<style>` blocks
that fold into `dist/glass-ui.css` with LOAD-BEARING cascade precedence. The full flatten merges the
`ui/`+`custom/` alphabetical namespaces into ONE → these global blocks' fold-block source order CAN permute, and a
byte rebaseline BAKES IN whatever order results with no structural guard. This wave PROVES the reorder is benign —
or escalates it.

## §1 — The enumeration + the disjointness proof

The census DERIVES the set (a `<style>` with no `scoped` attr AND no `@layer` that folds into `dist/glass-ui.css`)
— the ~6: `GlassTimeline.vue`, `ContinuousTimeline.vue`, `SortableList.vue`, `StackedIconGroup.vue`, and
`DockLayerGroup.vue` (whose OWN comment declares it "an unlayered SFC `<style>` — unlayered wins over the layered
rules"). This canonical adds THREE things:

1. **ENUMERATE** the non-scoped/unlayered global SFC blocks (the census derives the set, not a hand-list).
2. **Assert PAIRWISE SELECTOR-DISJOINTNESS** across them — a reorder is provably benign IFF their selector sets do
   not intersect. If two non-scoped global blocks share a selector, the reorder is a RENDERING bug → ESCALATE
   (the byte rebaseline is UNSAFE there).
3. **ADOPT the sorted-block canonicalization** for the golden gate (sort the SFC-fold blocks before hashing) so
   the gate stays reorder-robust across THIS flatten AND future colocation moves — rather than relying on the
   one-time byte rebaseline alone.

## §2 — Binding criteria (born-RED → GREEN)

- Born-RED: the golden gate has no disjointness arm; the non-scoped-global blocks are unguarded.
- GREEN: the ~6 blocks are ENUMERATED (census-derived); pairwise selector-disjointness is PROVEN (or the
  non-disjoint pair ESCALATED to a rendering concern); the sorted-block canonicalization is adopted.
- **`proof:ba-gestalt`'s visual readback is the RECORDED binding backstop for the non-disjoint case** — the ONE
  place this paint-neutral tranche touches the visual gate. Decide sorted-block-hash vs byte-rebaseline+disjoint-
  ness on the evidence (R6-FOLD directive #3).

## §3 — Fences

- If the ~6 are proven disjoint, the byte rebaseline is SAFE and the sorted-block canonicalization is a robustness
  upgrade. If NOT disjoint, the reorder is a rendering bug — escalate; do NOT bake the byte rebaseline.
- The SCOPED blocks are untouched (their reorder is benign by scope-isolation — the scoped-token-SET invariant
  already covers them).
- This is the SOLE paint-adjacent wave; every other BI wave is paint-neutral by construction.

## §4 — Cross-refs

blocker-fold #6; R6-FOLD directive #3; §6 G6 (the golden invariant correction); the visual-gate backstop.
