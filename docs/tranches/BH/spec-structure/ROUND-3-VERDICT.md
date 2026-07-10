# ROUND-3 VERDICT — The Constellation Structure Standard

**Synthesizer role:** agglomerating close of round 3 (min convergence 70%).
**Outcome:** **CONVERGED.** Mean convergence **74.8%** across five lenses, floor 70%. The spec's proportion ENGINE and its factual base are shippable; the round-3 folds close the perimeter holes every lens demonstrated by BUILDING. `STRUCTURE-SPEC.md` is now the canonical spec with every judged-correct blocker folded in.

---

## Scores

| Lens | Convergence | Verdict |
|---|---|---|
| aristotelian-proportion | 74% | Strong center, holed perimeter — 5 surgical fixes folded |
| performance-mechanics | 76% | Mostly perf-aware; the scope-id rotation hole folded |
| migration-enforcement | 80% | Core verified sound; 3 sweep-completeness fixes folded |
| dx-readability | 70% | Flatten direction correct; final-tree-shape + test-tree folded |
| gestalt-coherence | 70% | Segment-vocabulary / T4 self-violation folded |
| **Mean** | **74.8%** | **Converged — fold the blockers, ship the spec** |

---

## The load-bearing correction: the prototypes ran on a STALE base; the spec is accurate against live HEAD

All four prototypes reported the migration instrument targets phantom machinery (`@glass` absent, `subpath-policy.mjs` absent, `goo-dot-matrix` not `liquid-grid`, 50 custom dirs). **THREE independent lenses (performance, migration, dx) verified against live main that every one of those is a stale-worktree-base artifact** — the exact trap in MEMORY `project_workflow_stale_worktree_trap`. I re-verified myself against live HEAD `2f67ead5` (c3621f08 IS its ancestor):

| Proto "phantom" claim | Live HEAD truth (verified this round) |
|---|---|
| `@glass` absent | `tsconfig.json:18` `@glass/* → ./src/*`; **src 0 files** (stays relative, as specced), **demo+tests 521** `@glass/components/(ui\|custom)` specifiers (spec's exact 398+123) |
| `subpath-policy.mjs` absent | **EXISTS** (16 548 B, TIERS/classifyTier structure the §3 semantic-rewrite targets) |
| `goo-dot-matrix` present | **ABSENT**; `liquid-grid` present (spec correct) |
| 50 custom dirs | **43 ui + 49 custom** = 92 (spec's 91 flat = 43+49−1 tabs merge−1 dead barrel) |

**Ruling:** the spec's migration instrument matches the tree execution will actually run against. Proto "phantom" findings are DISCARDED. A future round that "fixes" the spec toward the protos' recommendations (drop `@glass`, uniform-relative) would BREAK 521 live imports.

---

## Decisive blockers — FOLDED IN (judged correct, verified this round)

1. **The `geometry.ts → composables/` self-contradiction + the missing frontend `lib/` segment.** §3's residual mints a 1-file `composables/` dir — a T4 atomization the spec itself forbids. ROOT: the frontend schema §2.1 has NO `lib/` segment while backend §5.1 AND product features §4P.1 both do. **Verified:** `geometry.ts` is timeline's ONLY separable helper (its sibling non-SFC leaves are just `index.ts`+`types.ts`). **Fold:** added a frontend `lib/` segment for pure/mixed domain-helpers; a SINGLE such helper stays a ROOT SIBLING file (like `constants.ts`) until a 2nd earns the `lib/` dir; §3 residual corrected (`geometry.ts` stays a root sibling, `geometry.ts→composables/` DELETED). Segment vocabulary is now ONE law frontend↔backend. *(aristotelian, dx, migration, gestalt)*

2. **The SFC-over-500 taxonomy hole on the non-style axis (T1c).** T1b drains only `<style>`-mass SFCs. **Verified live:** `GlassDock.vue` is 515 lines with **~0 `<style>` lines** (a pure script+template breacher T1b cannot touch), `DockLayerGroup.vue` 524/~49-style. The spec's own §3 names GlassDock 515 as a breacher but had no drain tool for it. proto4 found the twin in speedtest: `App.vue` 833L template-mass. *(NB: the critiques' "SegmentedTabs 512" citation is a stale-base artifact — it is 416 at HEAD — so GlassDock 515 is the corrected live driver.)* **Fold:** added **T1c** — the script/template-mass SFC carve (extract cohesive sub-components for template mass, composables for script mass); §4P.9 names App.vue's template-mass carve. *(aristotelian, migration, proto3, proto4)*

3. **G9's nested layer-by-type blind spot.** The ≥2-domain-stem scatter check fired only at app-global top level. proto4 measured floridify's `api/` as a 73-file NESTED layer-by-type god-dir (`api/{core,middleware,repositories,routers,services}/`) — the exact §5.1 vice, one level down, MISSED. **Fold:** the scatter check runs RECURSIVELY at every directory level (G9 clause c). *(aristotelian, proto4)*

4. **Feature-interior length ceiling unstated for product apps.** §4P.5 graduates a domain to `features/<domain>/` but never restated 500 as binding on the interior, and pinned the carve owner to `BG.W-CUT` (glass-ui-ONLY). proto3 found `useMeterRenderer.ts` 693L inside the already-graduated speedtest feature, uncarved. **Fold:** §4P.5 states G2/G9's ceiling binds feature interiors identically (graduation is not a length exemption); each app OWNS its carve; recursive sub-domain graduation named. *(aristotelian, proto3)*

5. **The factually-wrong + proportion-incoherent Rust claim.** §5.2 asserted an import cycle is a HARD ERROR and unidirectionality a COMPILE invariant. proto4 probed with real `rustc`: private-mod encapsulation HELD (E0603), but a module cycle AND a `shared→domain` up-edge both COMPILED CLEAN in a single crate. Rust enforces acyclicity only at CRATE granularity — the workspace-of-crates cost the §1 mean rejects for a proportionate service. **Fold:** §5.2 corrected — "encapsulation is a compile invariant; directionality remains a gate (G-BE4b) concern unless you pay the workspace-of-crates cost." *(aristotelian, migration, proto4)*

6. **The tests-DIRECTORY flatten (a coupled 4th sweep, not just test imports).** §7 migrated test IMPORT specifiers but never moved the test DIRECTORIES. **Verified:** `tests/components/{ui,custom}/` exist and **12 gate scripts hardcode the `tests/components/custom/X` fixture literal**; G7's uniform drop rewrites them to `tests/components/X` — which resolves ONLY if the test dirs flatten. `proof:no-test-in-src` (a tests-mirror-src gate) would pass on the incoherent flat-src/two-tier-tests end-state while the fixture-reading gates red. **Fold:** §7 enumerates the tests-DIRECTORY flatten (keeps the mirror coherent) + the fixture-gate re-point as the coupled step. *(migration, dx, aristotelian)*

7. **The CSS reader-gate sweep (the true 4th coordinated sweep).** §2.6 physical CSS colocation breaks the reader-gate corpus with no named sweep. **Verified:** **107 gate scripts read `src/styles/*.css` SOURCE literals** (58 read `dock.css`); `proof-dock-css-carve.mjs` HARD-asserts `src/styles/dock.css` + `@import ./dock/*`. G7 scans only `components/(ui|custom)/`; G6 checks DIST byte-parity. **Fold:** §2.6/§7/§9 enumerate the `src/styles/<name>.css` reader-gate re-point; G6 gains a SOURCE-reader-gate arm. The atomic wave is FIVE coordinated sweeps, not two. *(migration, dx, proto1)*

8. **The Vue scope-id rotation (verified from plugin source).** `@vitejs/plugin-vue` **v6.0.7** (verified installed) defaults `descriptor.id = getHash(relative(root, filename) + source)`; `dist/glass-ui.css` carries `data-v-XXXX` scoped selectors. The flatten removes the `/ui/` or `/custom/` path segment from every scoped SFC → rotates every scope-id. Functionally harmless (template+CSS rotate in lockstep) but it means the SFC-fold half of dist is NOT byte-identical (the spec proved only the `index.css` cascade), rehashes ~every SFC-bearing chunk (a far larger cache-bust than the 6-chunk PROMOTE), and collides with `proof:css-colocation`'s golden `/styles` hash (which covers glass-ui.css). **Fold (the performance-above-all + orthogonality-thesis choice):** adopt a PATH-INDEPENDENT `componentIdGenerator` (scope-id keyed on source content, not the root-relative path) — a one-time rotation at the 5.0.0 cut that makes the flatten AND every future colocation move byte-neutral for BOTH `dist/styles/index.css` and `dist/glass-ui.css`, keeps the golden-hash gate green through moves, and keeps `profile:budget` basename-keying scoped to the 6 PROMOTE chunks. The byte-identity claims are corrected. *(performance)*

9. **The barrel-only rule's missing `sideEffects` precondition.** glass-ui declares `sideEffects: ["*.css"]` so its JS tree-shakes through barrels — the fold/promote wins are real IN glass-ui. But the spec made barrel-only cross-family imports UNIVERSAL constellation-wide without stating the tree-shaking safety DEPENDS on each sibling declaring `sideEffects`. A sibling lacking it would see the barrel-only mandate INFLATE production bundles. **Fold:** `sideEffects` (js side-effect-free) is a binding precondition of the barrel-only rule constellation-wide; a G8 sibling-audit item. *(performance)*

10. **The un-committed final tree shape (flat-91 vs domain-grouped).** The spec's OWN decidable trigger (>60 peers AND a ≥5-member scattered family) FIRES (91 peers, a 9-member viz family scattered across the alphabet) yet the spec hedged ("likely execution outcome", "ratified at execution"). The readable END-STATE is the deliverable edict-5 asks for. **Fold:** COMMIT the verdict — the flatten is flat peers EXCEPT the ONE family that trips the trigger (a light `viz/` domain sub-group), with the cohesion-vs-sediment distinction stated explicitly: domain-grouping encodes real cohesion (shared substrate + `budget.ts` + one-GL-context-per-route budget) where provenance-grouping encoded nothing — which is why domain grouping escapes §3's anti-two-tier argument and provenance does not. *(dx, aristotelian, gestalt)*

11. **No per-sibling migration instrument (edict 1, the FIRST edict).** §7's instrument is 100% glass-ui-specific; siblings carry their own alias namespaces (speedtest `@src/@features/@design`, ~50 importer re-points on graduation). **Fold:** each sibling authors its OWN migration instrument from the shared, repo-agnostic codemod FORMULA (`normalize(relative(elide(dirname(F)), elide(resolve(dirname(F),S))))`), binding its own alias namespace; G8 propagates the FORMULA + the gate scripts. *(migration, proto3)*

12. **No crisp normative core (a legibility flaw in the STANDARD itself).** A 487-line dense standard G8 propagates to backend/Python/Rust/Go engineers who will not read the round-correction prose. **Fold:** added **§0.5 — the normative quick-reference** (~12 bullets, the whole law at a glance). *(dx)*

Plus a light **doc/comment sweep** (README self-references + CSS comments carry stale `components/(ui|custom)/` prose paths that survive the flatten — edict-8 "examined then re-examined"). *(migration, dx)*

---

## What the prototypes PROVED (the strengths that hold)

- **The FLATTEN compiles at full scale.** proto1 and proto2 INDEPENDENTLY ran the complete 92-family flatten to a green typecheck (0 new errors) + green `vite build` (190 chunks, 0 resolution errors) + 0 export churn. The structural argument (6 `ui/` components reach UP into `custom/`, so the tier encodes no layering) holds under a real build. The 4-node boundary DAG (§2.5) self-tests 11/11.
- **The CORE promotion machinery is decidable AND proportionate.** Of 8 DI-context sites exactly ONE (`dockContext`=5) promotes; of 8 FOLD candidates exactly ONE folds. proto1/proto2 confirmed the `dockContext` promote typechecks + builds + is a **−327 gz/route perf WIN** on 5 foreign routes. Neither over-promotes nor over-folds.
- **The anti-atomization carves resist over-division at BOTH ends.** proto4 confirmed the shared-types carve keeps floridify `models/` shared (blind T3 would shred it behind 174 rewrites), the infra-ring criteria leave `utils/` DIR unflagged while catching `utils.py` FILES, the 463L notification-server is NOT force-fitted into a package, and T4 caught a proto3 scaffold over-provision (`survey/state/`).
- **G9 reproduces EXACTLY.** proto4 ran the spec's own prototyped gate: floridify 47 / speedtest-server 4 / dns-speedtest 2 / greenfield-rs GREEN, self-test 9/9 — all matching spec claims. proto4 BUILT the greenfield Rust `pulse` service GREEN to prove "GREEN by construction."
- **§4-PRODUCT is a codification of speedtest's ALREADY-convergent tree.** proto3: speedtest's own `check-internal-boundaries.mjs` docblock encodes the exact §4P.4 DAG. The grammar is convergent-in-practice, not an imposed taxonomy.

---

## Residue → next-round directives (execution-validation, not design)

No `[R3]` DESIGN question remains open. The residue is execution-proto validation of the folded rulings: the path-independent `componentIdGenerator` (no-collision + one-time-rotation measure), the `<style src scoped>` fold-order byte-check, the sibling `sideEffects` audit, the T1c carve of GlassDock 515, and the five-sweep atomic-wave dry-run. These seed the structured object's directives.
