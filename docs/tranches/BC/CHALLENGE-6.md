# BC CHALLENGE-6 — clean-confirm #1 attempt (iteration 14, post-DEEPEN-2)

## EXECUTION-DAG.md soundness (edge re-derivation from binding Sequence l: GAPS-FOUND
ACYCLICITY VERDICT: CONFIRMED ACYCLIC — NO BLOCKER on the DAG axis. I re-derived the full edge set from all 70 actual **Sequence:** lines and ran a programmatic Kahn topological sort. The full 70-node graph — including the contested SPRING-EASE→DOCK-ENGINE edge the DAG denies — drains completely (topo length 70 = node count) once the DAG's own documented GRID-SIMPLE/PAGE-CHASSIS recipe/page split is applied. The single apparent cycle is the GRID-SIMPLE↔PAGE-CHASSIS soft-mutual, which the DAG exp

## A11Y + PERF consistency (the iter13 DEEPEN-2 enrichments): the 9 a11y-: CONVERGED
VERDICT CONVERGED — 0 BLOCKER/MAJOR on the A11Y+PERF dimension. Read EXECUTION-DAG.md + A11Y-CONTRACT.md + WAVE-INDEX.md first, then re-grepped every cited HEAD fact (did NOT take DEEPEN-2 on faith).

(1) A11Y MATRIX vs 9 WAVES — FULLY CONSISTENT, GROUNDED. Every per-element matrix row matches its owning wave's aria/role/focus/PRM arm with zero contradiction: Radio (role=radio+aria-checked reka, SFC adds NO aria-pressed — the `aria-allowed-attr` floor, RADIO-FIX R3); Select/Dropdown (combobox/li

## FINAL coverage + soundness resweep (post-iter13 DEEPEN-2): phantom/tri: CONVERGED
CLEAN-CONFIRM #1 (post-DEEPEN-2). All 5 prompt items verified adversarially against live source + git diff, not on faith.

(1) PHANTOM RESWEEP: 70 on-disk wave specs confirmed (ls waves/*.md). EXECUTION-DAG.md references 69 distinct BC.W-* (all resolve; its §4 topo-sort enumerates all 70 in a valid linearization — zero phantom, zero omission). A11Y-CONTRACT.md references 10 (all resolve). Whole-tree grep found 81 non-resolving names — EVERY ONE is in an EXEMPT doc (PLAN.md/audit/research frozen 


## BLOCKER (0)

## MAJOR (1)
- [BC.W-SPRING-EASE (binding Sequence) vs DAG §3 R2 / §1 reconcile-table] Reconcile the DAG §3 R2 + §1-table row to the binding Sequence: state the edge SPRING-EASE→DOCK-ENGINE EXISTS (DOCK-ENGINE consumes the eased `--spring-dock` token) but is a consume-after-mint that is one-directional and acyclic — the SAME R1/R5 treatment, NOT '∅/no edge'. The 'frozen curve' argument justifies that DOCK-ENGINE need not WAIT on a curve *change* (the row is byte-frozen), but a consumer still reads the token, so the build/verify edge stands. Aligning the prose costs nothing — the topo order already honors it.
  · CONTRADICTED EDGE: SPRING-EASE -> DOCK-ENGINE. The DAG §3 R2 and the §1 reconcile-table row both assert this edge 'resolves to ∅' / 'there is NO edge between th

## MINOR (2)
- [BC.W-PAGE-PRUNE / BC.W-CODE-BLOCKS (WAVE-INDEX sequence-after column)] Fix the WAVE-INDEX `sequence-after` cells: PAGE-PRUNE → 'before PAGE-CHASSIS + PAGE-HIERARCHY (FIRST of Band-5 re-author)'; (CODE-BLOCKS 'after PAGE-HIERARCHY' is benign but the wave Sequence is 'after CHASSIS + HIERARCHY' — tighten to match). Either fix WAVE-INDEX or soften the DAG preamble's source-of-truth claim to 'edges come from each wave Sequence line; WAVE-INDEX is the band/name registry only'.
  · WAVE-INDEX `sequence-after` column directly contradicts two Band-5 wave Sequence lines, and the DAG preamble (lines 10-12) claims it derives from WAVE-INDEX. WA
- [BC.W-GRID-SIMPLE / BC.W-PAGE-CHASSIS (DAG §4 Tier 17 vs Tier 20)] Move GRID-SIMPLE out of Tier 17 into a Tier 20.5/21 slot (after PAGE-CHASSIS) in §4, or re-label it 'Tier 17 (recipe rhythm) / Tier 20+ (page leg)' so the tier number does not contradict its own 'after Tier 20' annotation. Substantively already resolved; this is doc-hygiene on the topo presentation.
  · GRID-SIMPLE↔PAGE-CHASSIS soft-mutual: tier-label vs documented-position mismatch. A naive both-directions edge model (GRID-SIMPLE after PAGE-CHASSIS AND PAGE-CH

## THIN (5)
- [BC.W-MOTION-ONE-CLOCK] Keep the explicit 'SOURCE audit, does NOT block on its consumers' framing in both the wave Sequence and DAG §2 Band 7 — it is the hinge that keeps the Band-7↔Band-2/3 consume-after-mint relations acyclic. Do not promote it to a hard predecessor edge.
  · MOTION-ONE-CLOCK 'reads the Band-2 dock engine + Band-3 liquid tab as canonical consumers, but does NOT block on them' (its Sequence). The DAG §2 Band 7 correct
- [BC.W-CONTROL-SMOOTH / BC.W-AFFORDANCE-MAP (both correctly scope the Toggle press; only the matrix cell's literal is imprecise)] Reword the matrix Toggle PRM cell to `tap-squish :active (--scale-press); card variant active:scale-95` so the base vs card-variant distinction is exact. Cosmetic; no wave-spec edit needed.
  · A11Y-CONTRACT.md Toggle row (line 28) PRM cell reads `tap-squish` `active:scale-95` as one register, but at HEAD `toggle/index.ts:34` the BASE Toggle carries on
- [BC.W-TABS-IOS (T4 byte-fences SegmentedTabs.vue ARIA), BC.W-CONTROL-SMOOTH (visual-only fence on Switch role), BC.W-AFFORDANCE-MAP (no aria touch)] Add a one-line provenance header to A11Y-CONTRACT.md per-element matrix (e.g. 'line numbers verified @HEAD 2026-06-18; the owning wave byte-fences the cited file') so a reviewer knows the cells are point-in-time + protected. Optional.
  · The A11Y-CONTRACT matrix legend defines `(reka)` as 'reka-owned, BC preserves' but several cells assert reka facts with explicit HEAD line numbers (e.g. Segment
- [BC.W-AFFORDANCE-MAP (owns the per-element affordance/a11y registry; the A11Y-CONTRACT consolidates its cells) — the line numbers re-verify at each owning wave's execution close, not at tranche-dev time] No action for tranche-dev convergence. At execution, each owning wave re-greps its cited file:line (the contract already says "owning BC wave verifies the cell at its close"). Optionally add a one-line note to A11Y-CONTRACT.md that the :NNN citations are HEAD-at-iter13 and re-verified at each wave close.
  · A11Y-CONTRACT.md cites verbatim source file:line numbers as verified-at-HEAD facts (SegmentedTabs.vue:400,443,466 / Toaster.vue:92 / GlassDock.vue:371,436,442 /
- [n/a (doc-hygiene observation; the F2 scan reads FOLD-LEDGER.json rows + DEFERRAL-LEDGER cells, never CHALLENGE prose, so no gate trips)] None required. If a future gate ever greps CHALLENGE docs for wave-ids, anchor the regex to a word boundary or skip the CHALLENGE corpus (already exempt).
  · My initial broad regex `BC\.W-[A-Z0-9-]+` surfaced 5 bare-stem 'names' (BC.W-CON, BC.W-VIZ-, BC.W-GOOBLOB-, BC.W-PAGE-CHASSIS-, BC.W-GPU-PAR) that are NOT phant
