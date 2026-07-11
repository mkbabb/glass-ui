# ROUND-4 VERDICT — the Constellation Structure Standard

**Close type:** AGGLOMERATING synthesis, round 4. Min-convergence threshold 72% — **MET at the floor** (lowest lens 72). The core design is prototype-proven and sound; the residue is a well-characterized cluster of decidability/precision defects, every one fixable in prose. The round-4 spec is promoted to `STRUCTURE-SPEC.md` (the canonical doc) with the blockers below FOLDED IN and flagged `[R5]`. No restart; steer.

## Scores

| Lens | Convergence | Movement | Standing |
|---|---|---|---|
| performance-mechanics | **88** | — | The strongest lens. FLATTEN is +0 gzip, PROMOTE-context is −327 gz/route×5 (net perf-positive), CSS cascade-order provably preserved, SCC-neutral by construction. Three precision items, zero design defect. |
| dx-readability | **80** | — | FLATTEN verdict endorsed and prototype-proven. One surgical defect cluster: the viz/ carve-out (falsified justification + inconsistent on-disk grammar). |
| aristotelian-proportion | **73** | — | Core mean-law excellent and prototype-proven (FOLD/PROMOTE census green end-to-end). Three rulings not shippable verbatim: viz criterion, styles/ vs T4, T1b/T1c composition. |
| migration-enforcement | **72** | — | Core machinery reproduces on disk; clean-break honored, no smuggled alias. Three verified defects that would RED the gate suite at cut: viz-aware scripts pass (83 scripts), glass-ui's own 8 barrels unscheduled, viz sub-group undecidable. |
| gestalt-coherence | **72** | — | The god-document (law fused with one-time runbook), the viz sub-group, and the T1b/T1c total-function framing. |

**Weighted read:** the spec's CORE LAW (proportion, colocation, the 4-node DAG, the two-atom decomposition, the basename generator, the backend transposition) is unanimously judged sound and is proven executable by four independent prototypes at family AND full-tree scale. Every blocker is localized to a specific ruling or a precision gap, NOT the design. The single dominating theme across ALL FIVE lenses is the `viz/` physical sub-group.

## The decisive blockers — adjudicated

### 1. `viz/` physical sub-group — DROP IT (unanimous; folded) [R5]
**Every lens flagged this.** The spec's own stated trigger (≥5 non-adjacent cohesive members sharing a register) fires EQUALLY for forms(13), overlays(9), feedback(8) — so "viz is the ONE decidable sub-group the mean permits" is falsified by three peer families, and proto-2 verified it. WORSE (migration, verified on disk): a physical `viz/` dir forces `components/custom/aurora → components/viz/aurora`, so a uniform textual `dropSegment` mis-targets **83 of 229 scripts** that read viz-member SOURCE paths — and G7 (which asserts the `(ui|custom)` literal is ABSENT, not that paths RESOLVE) goes GREEN while 83 gates ENOENT.

**RESOLUTION — pure flat + a machine-locked `components/README.md` domain-map.** I verified on disk that the discriminating signal the aristotelian lens found is real (EXACTLY 8 families import `useGpuSubstrate`; goo-filter is the non-importing rider → the 9-member viz domain), and that `PROCEDURAL-SUITE.md` already exists as an SSOT. So the viz DOMAIN survives — **virtually**, in the README domain-map deriving membership from `PROCEDURAL-SUITE.md` (which records the `useGpuSubstrate` runtime-import edge as the cohesion rationale) — while the PHYSICAL dir is dropped. This single move:
- makes `dropSegment` uniform-correct for ALL 229 scripts (closes migration blocker 1 and the 83-script mis-target);
- removes the on-disk 81-flat-+-1-nested asymmetry (closes dx + gestalt);
- removes the sole non-uniform component case, the `readTree` viz-descent, and the viz-insertion codemod step (simplifies ATOM A);
- keeps domain navigability — the README indexes every family and is the SOLE navigation authority (dx: the physical dir bought only a marginal 91→84 `ls` reduction the README obviates);
- is SOTA-aligned (reka/Ark/PrimeVue all run pure-flat peers at this scale).

The aristotelian lens's alternative (keep viz, tighten the criterion to the `useGpuSubstrate` edge) is decidable but does NOT eliminate the 83-script codemod hazard nor the on-disk asymmetry. DROP dominates: it eliminates MORE verified defects while preserving the domain insight as documented, gated rationale.

### 2. T1b and T1c COMPOSE — the drain is not a total function (unanimous; folded) [R5]
Three lenses + proto-3 verified the spec's OWN poster children are double-breachers: `SpeedtestResults.vue` 2265 − ~1350 `<style>` = ~915, STILL over 500 after T1b → needs T1c; `App.vue` double-breaches identically. The either/or framing (`§1.3`/`G2`) is undecidable for exactly the files the spec names. **FOLD:** the drain is a SEQUENCE — apply T1b, RE-MEASURE the residual, then T1c if still over. A single SFC may need both.

### 3. glass-ui's OWN 8 mixed CVA barrels are unscheduled (migration; folded) [R5]
Verified on disk: alert/avatar/badge/button/sheet/slider/toggle + custom/toggle-chip each mix `export const <x>Variants = cva(...)` with `export … from` — exactly the documented CLAUDE.md "CVA variants are co-exported from each component's index.ts" convention. Precondition B (barrels PURE RE-EXPORT-ONLY) forbids this constellation-wide, so `proof:barrel-pure` born-REDs on 8 glass-ui barrels — but the §4P.13 un-mix table listed ONLY the 4 siblings. An implementer flattening glass-ui without un-mixing leaves the gate RED at the 5.0.0 cut. **FOLD:** the CVA-co-export convention is SUPERSEDED (clean break, edict 7); the glass-ui 8-barrel un-mix (`variants.ts` sibling + pure barrel — the proto-1 slider pattern) is a named ATOM-A sub-wave; `proof:barrel-pure` runs on glass-ui.

### 4. `styles/` segment dir contradicts T4 for single-sheet families (aristotelian; folded) [R5]
~10 of the 14 colocated families are single sheets; forcing `components/<n>/styles/<n>.css` for each mints a one-file segment dir — precisely the atomization T4 forbids. **FOLD (apply T4 uniformly):** a single-sheet cascade family stays a ROOT SIBLING `components/<n>/<n>.css`; a multi-partial family (dock's 17 partials) earns `components/<n>/styles/`. The build walk globs BOTH `components/*/*.css` AND `components/**/styles/`.

### 5. §2.6 build-transform copy-UNIT imprecision (performance; folded) [R5]
Verified: dock.css's 17 partials are dock.css-referenced, NOT index.css-referenced, and today ride a whole-subtree `cpSync` of `src/styles/` that colocation removes. An executor following the prose ("cpSyncs each index.css-referenced sheet") literally would strand dock's partials and silently drop the entire dock `@layer components` cascade in dist. **FOLD:** the copy UNIT is the component's `styles/` SUBTREE (top sheet + own-subdir partials moving atomically), OR the root-sibling `<n>.css` for a single sheet; G6's "subdir partials stay within styles/" is the CHECK, not the mechanism statement.

### 6. The god-document — law fused with one-time runbook (gestalt; folded as a recorded seam) [R5]
The spec fuses the TIMELESS LAW (§0–§6) with a ONE-TIME MIGRATION RUNBOOK (§7–§9 + Appendix D: specifier counts, hash values, byte-offsets, unlink commands) — and G8 promotes the WHOLE doc to the read-only precepts submodule. By the spec's own §1.1 test this is the excess vice. **FOLD (record the seam, defer the physical split):** the canonical doc marks §0–§6 LAW / §7–§9+Appendix D RUNBOOK; G8 promotes ONLY the LAW half to precepts, the runbook stays in the BH tranche. The physical two-file split is an execution decision, not a spec-content one.

## Secondary folds (open-question refinements, folded)
- **proto-3 unifying rule** [R5]: a drain-tripping feature-interior SFC promotes to a component-folder-with-index inside `ui/` — closes the segment-under-segment collision (`state/engine/`, `ui/skeleton/`, `ui/styles/`) and the bare-SFC-no-drain-target gap in ONE rule.
- **G6 registers** [R5]: both arms (golden-hash + basename-uniqueness precondition) pinned `["ci","release"]`; the golden gate MUST run born-RED→GREEN in the wave as the machine witness the basename generator was adopted.
- **G7-companion resolves-on-disk floor** [R5]: every re-pointed script path RESOLVES on disk (anti-evasion beyond literal-absence); `proof:colocation`'s dropSegment listed as semantic-not-cosmetic in the close battery.
- **G9 per-language enumeration** [R5]: the 9/9 self-test enumerates which bite covers which language (python `..`, rust crate/super, ts relative) — proto-4 proved directionality LEAKS in all four languages, so the resolver is load-bearing and must be verifiable per-language.
- **`tabs/reka → tabs/primitives`** [R5]: `reka/` is a vendor provenance marker contradicting greenfield-no-meta; the role-name `primitives/` describes the raw wrapped primitives beneath house `SegmentedTabs`.
- **README domain-map complete** [R5]: enumerates ALL families (viz is now virtual, so the README is the SOLE navigation authority).
- **RAW-line anti-gaming note** [R5]: a cohesive file inflated by load-bearing documentation drains by STRUCTURAL carve, never comment-stripping.
- **"ALL classes MEASURED" scoped to the 5.0.0 atoms** [R5]: the guts→sibling-barrel reroute is DEFERRED; pure-barrel Rolldown DCE-neutrality is NOT yet positively proven (only the mixed-barrel #21966 disqualification is cited).
- **survey graduation honest note** [R5]: survey graduates by the soft OR-branch (own colocated domain-logic, 2-of-4 foldable layers), recorded as an acknowledged soft-branch case.
- **README=gate-enrollment equivalence** [R5]: a courtesy README enrolls a dir in the proportion clauses, so a trivial dir must not carry one (or the gate exempts trivial dirs).
- **Python `__init__.py` convention-not-enforcement** [R5]: stated bluntly (as for Rust) — the barrel is pure convention; the gate is the sole enforcement.

## What the prototypes proved (the empirical spine)

- **proto-1 (timeline + slider slice, real moves + typecheck):** the §7 recompute formula is correct including the two-sided move case (test file AND its src target both move); typecheck EXIT 0; T4 held (geometry.ts stayed a root sibling, no needless `lib/`); the slider mixed barrel was a LIVE Precondition-B violation cleanly un-mixed. Surfaced: `proof:colocation` is a SECOND semantic-dropSegment gate; the flatten re-paths guts-reaches but does not fix them (orthogonal to PROMOTE).
- **proto-2 (full ui/custom flatten end-to-end):** typecheck 0, `vite build` **190→190 chunks**, gzip **414001→414001 byte-for-byte**, **94/94 subpath targets resolve**, package.json byte-untouched, `UI_CLASS ∩ CUSTOM_CLASS = {tabs}` (sole collision), 0 SFC basename dups. Falsified the "viz is the ONE decidable sub-group" claim by showing forms/overlays/feedback qualify equally.
- **proto-3 (speedtest §4-PRODUCT census + 226-file scaffold):** §4-PRODUCT is ~85% descriptive of the live tree; the meter recursive graduation flattens the deepest HEAD chain (depth violations → 0). Surfaced the double-breach reality (GAP-3), the `state/engine/` G3 collision (GAP-4), the feature-ui/-segment vs skeleton/styles/-segment tension (GAP-5), and the survey soft-branch graduation (GAP-6) — all folded via the unifying feature-interior rule.
- **proto-4 (backend §5, greenfield Rust `pulse` compiled GREEN):** the per-language seam matrix — Rust encapsulation HELD (`E0603`), Go acyclicity HELD (`import cycle not allowed`); directionality LEAKED in all four languages, acyclicity leaked in Rust+TS. Confirms G4/G9(e) are load-bearing exactly where the compiler gives nothing free. Segments were absent-until-earned (no premature `model.rs`, a single sibling `lib.rs` not a `lib/` dir) — the mean held at BOTH ends.

**Confidence caveat (carried to round 5):** no round-4 lane independently re-ran the basename-generator byte-identity or the atom-B CSS byte-identity — both rest on the spec's own prior dry-run on a surface where round-3 was empirically WRONG (the source-content generator). The G6 golden-hash gate is the standing born-RED witness; the round-5 directives require it be executed born-RED→GREEN in a worktree, not treated as settled.

## Standing

The spec is CANONICAL with the 16 folds above. It ships if the round-5 directives (which are VERIFICATIONS of the folds, not new design) come back green. Two matters remain genuinely open (directives, not blockers): whether the §4P.5 graduation OR-branch earns a fully-decidable domain-logic criterion (folded as an honest soft-branch note for now), and the mechanics of the DEFERRED barrel-discipline pass (booked out of 5.0.0 with a G4 cycle-detection extension).
