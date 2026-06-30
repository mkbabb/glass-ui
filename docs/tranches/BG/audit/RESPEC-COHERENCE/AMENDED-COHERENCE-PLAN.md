# AMENDED COHERENCE PLAN — BG cross-wave coherence audit (DEVELOPED, PASS 3)

**The fold-ready plan.** Seven coherence clusters resolved + critiqued + the critique mustResolve items folded in. For each: the LOCKED decision (re-sequence / spec / gate-addition) + the EXACT build-map/cursor/gate edits it implies, ready for a fold-agent to apply.

**Date:** 2026-06-30 · **HEAD:** `31b128aa` (`tranche/BG`; the COHERENCE master + the spec-mode resolves ran at `6c1f5386`, the tree moved +N — every load-bearing anchor re-verified at HEAD this pass) · **pkg:** 4.2.0 parked, cut user-gated as 5.0.0
**Overall convergence:** **84%** (critique-weighted aggregate — see §9) · **developReady:** YES
**Next:** FOLD INTO THE TRANCHE SET.

> Inputs: `SEED-CONTEXT.md` · `COHERENCE.md` (the living master) · `pass-2-synthesis.md` (cluster detail) · the 7 PASS-3 resolves (`pass-3-proto-PT-1.md`=G1 · `pass-3-resolve-G2-token-spine-sourcing.md` · `pass-3-resolve-G3.md` · `pass-3-resolve-G4.md` · `pass-3-resolve-G5`→worktree build-map · `pass-3-resolve-G6.md` · `pass-3-resolve-G7.md`) + the 7 critiques. This file DEVELOPS the open design decisions the critiques flagged so the plan is fold-ready — it folds the critique `mustResolve` items in place, never defers them. G1/G2/G5 were implement-mode worktree spikes (NOT merged); G3/G4/G6/G7 were spec-mode (written to RESPEC-COHERENCE/). All seven reduce to plan-text / gate-spec amendments + a small set of src/wf.js edits the build phase applies — ZERO feasibility restart anywhere.

---

## 0. THE THREE STANDING TRUTHS (carried from the first audit's AMENDED-WAVE-PLAN, re-confirmed)

1. **ZERO restart. The BG/BH plan + DAG + build order KEEP.** Every coherence issue is a plan-text / gate-spec / wf.js amendment — no wave is invalidated, no mechanism re-architected. The audit found BROKEN COHERENCE inside already-planned waves (a mis-sequenced row, an under-enumerated reader set, a stale canon-home string, a self-disagreeing census), not missing waves.
2. **No coherence issue is a feasibility blocker.** All 7 clusters are FEASIBLE in direction (all 7 critiques confirm). The work is to fold the exact edits so a resumed execution does not mis-execute (PT-4's would-be §0E-1 regression, the WS8 reader fan-out, the kf-peer no-op) or stall (the empty-batch terminal, the paint-FAIL ping-pong).
3. **The decoupled-paint engine is ADJUDICATED keep-decoupled-with-guards** (G1) — the recovery mechanism (FAIL-PAINT → FIX-AGENT → re-judge) is the missing guard the adjudication named, defined here. The cut stays COUPLED to painted truth (the two-gate `cutReady`).

---

## 1. CLUSTER LEDGER (the 7 + their critique convergence)

| Cluster | Mode | Owns (§2.X) | Resolve conv | Critique conv | Disposition |
|---|---|---|---|---|---|
| **G1** dag-paint-keystone | impl (spike) | §2.D1/D2/D3 + G1-lockstep + A1-recovery | 88% | **82%** | LOCKED + 2 mustResolve folded |
| **G2** token-spine-sourcing | impl (spike) | §2.T4/T1 + T2/M4 | 90% | **76%** | LOCKED + 5 mustResolve folded (1 BLOCKING) |
| **G3** ws8-reader-fanout | spec | §2.G2/A2 | 91% | **90%** | LOCKED + 5 mustResolve folded |
| **G4** cuttime-gate-blind | spec | §2.C1/G3/G4/L15 | 93% | **88%** | LOCKED + 4 mustResolve folded |
| **G5** livefix-protectors | impl (build-map) | §2.T5/T6/T7 | 93% | **90%** | LOCKED + 4 mustResolve folded |
| **G6** canonhome-interleave | spec | §2.I1/L12/L13/L14 | 94% | **79%** | LOCKED + 5 mustResolve folded (1 census-correction) |
| **G7** coverage-deadfile-carve | spec | §2.M2/L7/L8/U1/M1/P1/P3/P5/L1 | 91% | **85%** | LOCKED + 5 mustResolve folded (2 recursion-fixes) |

**Critique-weighted mean: 84%.** No cluster below the first-audit develop bar (G2's 76% is the floor; its 5 mustResolve items are folded below — the one BLOCKING C6-regression is the load-bearing correction). developReady = every cluster is fully-resolved OR an explicitly-accepted-residual with a named owner (§8).

---

## 2. G1 — DAG re-anchor + paint-decouple keystone (LOCKED, conv 82%)

**Owns:** §2.D1 (G4 mis-positioned: declared LANDS-FIRST, seq-LAST) · §2.D2 (WS3 3.6 is G4's PREREQUISITE not victim) · §2.D3 (PAINT-PENDING ≠ DONE build-ordering) · §2.G1-lockstep (2 live G8 "rides W-REFLECT3" violations) · §2.A1 (the undefined paint-FAIL recovery).

### 2.1 The LOCKED decisions

1. **RE-SEQUENCE `BG.W-CLOSEFIX-9SITE` 12.0 → 0.7** — physically re-home the row into PHASE 0 (after 0.6) + a no-delete back-pointer in PHASE 12.
2. **The precond edges (belt-and-suspenders):** G4 preconds `[STAGE-0, BG.W-GLASS-BLUR-PEER (3.6)]`; G4 is a precond of `[3.5 TINT-UNIFY, 13.1/WS8 SUFFUSE-UNIVERSAL, 14.1/WS9 PAPER-GRAIN-REAL]`. Encode on ALL THREE derivation sources (cursor rows + build-map blocks + the bg-bh-execute loader prompt) so the loader does not depend on the LLM seq-pin alone (O4 closed).
3. **`doneBuilding(w) = {DONE, PAINT-PENDING}` widen** routed through `allDone`/`ready`/`pendingLeft`; split `cutReady` into `buildComplete ∧ paintComplete`.
4. **The paint-FAIL recovery = ONE terminating mechanism:** a new `FAIL-PAINT` status (added to DAG_SCHEMA enum); `bg-paint.wf.js` flips PAINT-PENDING→FAIL-PAINT on FAIL with `mustFix` in the DELTA; `bg-bh-execute.wf.js` re-enters FAIL-PAINT waves through a FIX-AGENT (`paintFixable` predicate + composeBatch), bounded `MAX_FIX→BLOCKED`. The dead in-cycle fixLoop + orphaned PAINT_SCHEMA deleted; engine-design.md §2/§3/§4/§7 reconciled. Root-fix-before-re-judge structurally kills the ping-pong.
5. **Lockstep the 2 live G8a "rides W-REFLECT3" violations** at `EXECUTION-PROGRESS.md:38/113` onto "the wave's OWN non-authoring paint close" + re-home the 2 matching build-map G8a-form twins (`:198`, `:655`) for cross-file coherence.

### 2.2 The critique mustResolve items — FOLDED

- **[MR-1 — intra-file contradiction, the re-bitten friction class]:** `bg-build-map.md:962` (the D-G4 deferral-table row) still names `**W-REFLECT3**` as the proving wave for the grain-tail π, while the spec body (`:470`) re-homed the SAME π to "the wave's OWN non-authoring paint close". **FOLD: re-home the D-G4 table row's Proven-by cell to the same phrase** (G4's own deferral is in THIS cluster, not a clean PT-2 hand-off). Apply the SAME to the D-G6 W-REFLECT3 tail if it summarises a re-homed body deferral. (The 11 NON-`rides`-form `→ W-REFLECT3` deferral-table cells that do NOT red the gate stay PT-2's phantom-proving-wave reconcile — but the D-G4 row specifically is THIS cluster's own.)
- **[MR-2 — DAG-loader status ambiguity]:** `EXECUTION-PROGRESS.md` has TWO full 7-column rows both reading `| 0.7 | BG.W-CLOSEFIX-9SITE (G4…) | BG/WS7 | H | PENDING |` (`:73` + `:237`). Benign while both PENDING, but a latent status-lookup ambiguity once G4 lands and only one row is flipped. **FOLD: the PHASE-12 back-pointer (`:237`) carries a NON-status sentinel in its status cell (`→ see 0.7`)** or drops the seq/status columns to plain prose, so a status-lookup keyed on the wave id cannot resolve to two diverging rows.
- **[MR-3 — SCOPE-NOTE, routed to G4/§2.A2]:** `bg-paint.wf.js`'s `pp` (L46), `pipe` (L48), `report` (L57) agent calls are un-null-guarded + dereferenced (the Class-Q session-limit crash). The FAIL-PAINT recovery requires bg-paint to run to completion. **ROUTE to §2.A2** (the null-guard mirror, co-tracked in G3 §4) — the guards land at execution before the recovery mechanism is load-bearing; the recovery is not silently defeated by a null-crash in its own judge.
- **[MR-4 — RUN-TIME arm, acknowledged-not-closeable-device-free]:** the first real boot must confirm the LLM DAG-loader emits exactly ONE G4 node from the build-map source (not two from the dual EXEC-PROGRESS rows), with preconds `[STAGE-0, BG.W-GLASS-BLUR-PEER]` + G4-as-precond-of `[3.5,13.1,14.1]`, and that composeBatch picks G4 first among the ready set. **ACCEPT-RESIDUAL (build-phase):** the loader-prompt carve-edge + the per-row preconds are belt-and-suspenders; the binding proof is the boot dry-run (named in §8, owner = first EXECUTION boot).

### 2.3 The EXACT edits (fold target)

| File | Edit |
|---|---|
| `docs/tranches/BG/execution/EXECUTION-PROGRESS.md` | (a) re-home the G4 row to PHASE 0 (seq 0.7, after 0.6); (b) the PHASE-12 back-pointer (`:237`) status cell → `→ see 0.7` (MR-2); (c) correct the FALSE "predecessor of WS1" EXECUTION-ORDER NOTE → "lands EARLY after 3.6, before 3.5/SUFFUSE-UNIVERSAL/PAPER-GRAIN-REAL"; (d) re-home the 2 G8a hits `:38`/`:113` onto "the wave's OWN non-authoring paint close" |
| `docs/tranches/BG/execution/bg-build-map.md` | (a) G4 `*Precond:*` `[STAGE-0, BG.W-GLASS-BLUR-PEER (3.6)]` + the 3 consumer preconds in each consumer row's note cell; (b) the "before WS1" prose → "lands EARLY after 3.6, before 3.5/13.1/14.1"; (c) re-home the 2 G8a-form twins `:198`/`:655`; (d) **the D-G4 deferral-table row `:962` Proven-by cell → "the wave's OWN non-authoring paint close"** (MR-1); (e) the title/id disambiguation note ("`BG.W-GLASS-BLUR-PEER` (3.6) is the DISTINCT blur-peer demote, NOT this carve; id is BG.W-CLOSEFIX-9SITE everywhere") at the G4 block |
| `docs/tranches/BG/execution/bg-bh-execute.wf.js` | (a) `doneBuilding` helper + route `allDone`/`ready`/`pendingLeft` through it; (b) split `cutReady` → `buildComplete ∧ paintComplete`; (c) the FIX-AGENT dispatch for FAIL-PAINT waves (`paintFixable` + composeBatch, bounded MAX_FIX→BLOCKED); DELETE the dead in-cycle fixLoop; (d) the loader prompt carve-edge clause (MR's O4 close) |
| `docs/tranches/BG/execution/bg-paint.wf.js` | (a) FAIL → flip FAIL-PAINT + write `mustFix`/`defectLocalization` to the DELTA + commit the flip; (b) the 4 null-guards (`pp`/`pipe`/batched-judge `.catch`/`report` — MR-3, co-applied with §2.A2) |
| `docs/tranches/BG/execution/engine-design.md` | reconcile §2/§3/§4/§7 to the FAIL-PAINT mechanism; DELETE the orphaned PAINT_SCHEMA + the live-fixLoop prose |

---

## 3. G2 — token-spine sourcing (LOCKED, conv 76% — the floor; the BLOCKING C6 fold is the load-bearing correction)

**Owns:** §2.T4 (`--glass-key-*` dual source + banned-angle + WS8←WS9 DAG inversion) · §2.T1 (the F substitution-trap note) · §2.T2 (C-SAFARI `uChromatic`/`chromatic_aberration` dual-stack drift + WGSL fence hole) · §2.M4 (`--glass-edge-dispersion` box-shadow→float type collision).

### 3.1 The LOCKED decisions

1. **`--glass-key-*` — KEEP-BOTH-as-siblings bound by §0E-1 SHARED-SOURCING** (each register calc-derives from one canonical `--glass-key-azimuth`/`--glass-key-lit-*` spine — the AUTHORITATIVE `SPEC-pass4-converged §0E-1`, NOT PT-4's weaker hemisphere-sign form). The three PT-4 crit FAILs FOLDED: drop the phantom liquid-morph 135deg thread (FAIL-1), replace sign-coherence with §0E-1 shared-sourcing (FAIL-2), drop the fabricated bevel-reads-R positive keep only the negative (FAIL-3).
2. **STRIKE the false WS8←WS9 "bevel reads F" DAG edge** (build-map:692-693 + FINAL.md:418) — WS8's bevel is a net-new bright-bloom register reading R, runs BEFORE WS9. The single highest-value bounded fix.
3. **The chromatic dual-stack:** re-anchor the transcription onto the REAL artifact `docs/tranches/BG/audit/glassShader-tier2.wgsl` (already `array<vec4f,8>` + `squircleProfile` + `textureSampleLevel` — resolves PT-5's M6 panel-array conflict BY CONSTRUCTION); pin ONE shared `CHROMATIC_SCALE = 0.0045` named const across BOTH GLSL + WGSL (kills the 0.003/0.004/0.0045 three-way drift at root); per-language spelling map (GLSL `uChromatic` / WGSL `chromatic_aberration`); widen F3 → F3a-F3d.
4. **MINT `--glass-chromatic-strength` scalar `@property`** (initial-value 0, the no-fringe degrade floor) resolving the `--glass-edge-dispersion` box-shadow→float type collision — two siblings in the degrade ladder, `--glass-edge-dispersion` STAYS the Tier-0 CSS box-shadow rung byte-untouched.

### 3.2 The critique mustResolve items — FOLDED

- **[MR-1 — BLOCKING, the re-committed friction class]:** the spike's WS8 M7 framing (§3.1 amendment body + FAIL-3) instructs re-pointing the SHARED `--glass-rim-bottom` "AWAY from `--glass-key-shade-y` / UNDER `--glass-bevel-*`" — that is the SUPERSEDED PASS-3 framing. WS8's OWN authoritative `SPEC-pass4-converged.md:128` (C6 fold) EXPLICITLY CORRECTED it: decouple ONLY via a rim-PRIVATE bottom token consumed ONLY in the `rim.css:90-95` composition, so the SHARED `--glass-rim-bottom` (live readers VERIFIED at HEAD: `select.css:88`, `rim.css:95`, `glass-capsule.css:72/89`, `dock/shell.css:167`) KEEPS its `--glass-key-shade-y` grounding. **FOLD: re-ground the WS8 M7 amendment onto WS8 pass-4 C6.** The shared `--glass-rim-bottom` MUST NOT lose its grounding; only a rim-PRIVATE bottom token in the rim.css:90-95 composition decouples. The spike's verbatim wording would strip dock/capsule/select grounding — the exact C6 regression pass-4 caught, the read-superseded-passes recursion re-committed on the bevel after folding it for §0E-1. This is the LOAD-BEARING correction; the develop pass MUST apply the C6-grounded form, NOT the spike's M7 prose.
- **[MR-2 — false on-disk claim]:** the spike says "every anchor RE-VERIFIED on disk at 998136bb", but `glassShader-tier2.wgsl` + `glass-field-shaders.json` are ABSENT in worktree 998136bb (the commit that added them is not an ancestor); they exist only in the shared checkout (HEAD `31b128aa`). **FOLD: the develop pass re-verifies the chromatic re-anchor against the shared-checkout path it amends** (HEAD), and the F3b/F5 on-disk-resolves fence anchors to a file PRESENT in the develop tree. Content claims survive (verified against HEAD this pass: `array<vec4f,8>` @:20, `chromatic_aberration:f32` @:16, `squircleProfile`, `textureSampleLevel`, panel loop @:138, `0.004` @:102).
- **[MR-3 — SHAPE-vs-magnitude honesty seam]:** "operator-SHAPE line-for-line transcribed" but tier2's rim weight is `edge = prof` (squircle) while the transcribed bodies use `rim = 1.0 - smoothstep(0.0, 0.16, edge)` (the GLSL source-of-truth form) — DIFFERENT weightings; the F6 mean≤2.0 parity rests on which form ships. **FOLD: specify the WGSL twin ships the GLSL source-of-truth `rim` form (canonical)**, OR downgrade "line-for-line" → "shape-concept-aligned" and scope F6 mean≤2.0 to the form that ships. The develop pass states the canonical rim form explicitly in the WS8 §4 supersede.
- **[MR-4 — reconcile §3.2(e)]:** `build-map:649` ALREADY names `useGlassRefraction.ts` in WS8 §2 Files — the "ADD useGlassRefraction.ts" instruction is a redundant no-op. **FOLD: state the WS8 §2 *Files* add as `property-regs.css` ONLY** (the genuine add — the `--glass-chromatic-strength` registration); leave the Files-path correction `src/glassShader.wgsl → src/composables/glass/webgpu/glassShader.wgsl` (build-map:649, a genuine fix).
- **[MR-5 — off-by-one cite]:** the tier2 chromatic operator anchor is `:100-102` (edge=prof at :101, ab=... at :102), the spike cited `:101-102`. **FOLD: correct the load-bearing operator anchor to `:100-102`.**

### 3.3 The EXACT edits (fold target)

| File | Edit |
|---|---|
| `docs/tranches/BG/execution/bg-build-map.md` WS8 §1 (`BG.W-GLASS-SUFFUSE-UNIVERSAL`) | bevel reads R hemisphere (existing `--glass-key-{lit,shade}-{x,y}`), NO F precond; **the WS8 M7 amendment re-grounded onto C6: the shared `--glass-rim-bottom` KEEPS its `--glass-key-shade-y` grounding; only a rim-PRIVATE bottom token in rim.css:90-95 decouples** (MR-1, BLOCKING); bevel is hemisphere-coherent bright-bloom, NOT a literal per-axis R reader |
| `docs/tranches/BG/execution/bg-build-map.md` WS8 §2 (`BG.W-GLASS-REFRACT-WEBGL`) | (a) rewrite the §2.M4 sentence → `--glass-chromatic-strength` (`<number>` @property, initial 0) threads the uniform, `--glass-edge-dispersion` is the Tier-0 box-shadow analogue separate type; (b) `CHROMATIC_SCALE = 0.0045` named const both stacks; (c) F3 → F3a-F3d (+ F3c cross-stack equality); (d) Files-path `:649` `src/glassShader.wgsl → src/composables/glass/webgpu/glassShader.wgsl`; (e) *Files* add = `property-regs.css` ONLY (MR-4); (f) the §0-DRIFT note — WGSL twin from `glassShader-tier2.wgsl:100-102` SHAPE (MR-5), the canonical `rim` form = GLSL source-of-truth (MR-3) |
| `docs/tranches/BG/execution/bg-build-map.md` WS8 §4 (`BG.W-GLASS-SOTA-LADDER`) | the WGSL supersede from `glassShader-tier2.wgsl` SHAPE (the `array<vec4f,8>` panel-loop) + canonical `chromatic_aberration · CHROMATIC_SCALE = 0.0045` + the GLSL `rim` form (MR-3 canonical) |
| `docs/tranches/BG/execution/bg-build-map.md` WS9 §0 + header `:692` + `FINAL.md:418` | strike the spurious WS8←WS9 read edge; the spine-comment + substitution-trap note + under-shadow anchor `430-432 → 434-436` |
| `src/styles/tokens/property-regs.css` | mint the `@property --glass-chromatic-strength` block after `--glass-depth` (the spike landed it device-free GREEN; the develop pass merges it) |

> **§0E-1 (`SPEC-pass4-converged.md`) is the FRONTIER — UNTOUCHED.** G2 confirms it; it does NOT re-litigate it. The C6 fold (`:128`) is the WS8-OWN pass-4 correction the develop pass re-grounds the M7 amendment onto.

---

## 4. G3 — WS8 `.glass-lens`/`glass-refract.css` retire reader fan-out (LOCKED, conv 90%)

**Owns:** §2.G2 (WS8 retire under-enumerates the reader set — 4 of 24 named) · §2.A2 (the `bg-paint.wf.js` null-crash, co-tracked).

### 4.1 The LOCKED decisions

1. **The FULL 28-file reader fan-out** (12 gate scripts + 6 source + 3 §-sibling source + 3 demo + 4 comment-only); 24 are behaviour/red/structural-bearing — the current WS8.4 *Files* names 4.
2. **Add the 3 hard build/published breaks to *Files*:** `index.css:166 @import` (build ENOENT), `critical-partition.mjs:63 CRITICAL_PARTIALS` manifest, the PUBLISHED `GlassPanel.vue` (imports the §4-deleted `useGlassRenderer.ts` — a public-surface break + `proof:lineage-probe` + MIGRATION row if retired).
3. **Route ALL surviving-gate refraction asserts THROUGH `proof:glass-refract-fence`'s `REFRACTION_READERS` roster** (the WS8.2-minted single-source) — not per-gate frozen strings (the §2.G2 anti-fan-out harden); + F5 on-disk-resolves extended + a synthetic frozen-string-re-point self-test bite.
4. **Name the WS8.4 *Gate* set:** `proof:button-glass [release]` + `proof:visual-reconcile [ci]` (both RED on naive delete, both ABSENT from build-map) + `proof:safari-webgl [release]` (dead LENS_CSS const cleanup) + `proof:glass-refract-fence`/`css-critical`/`no-dead-token`/`no-retired-survivor`/`liquid-glass-tokens` + `typecheck`; the DEFINITION-ABSENT grep scope pinned to src+demo (NOT scripts — keeps survivor-teeth).

### 4.2 The critique mustResolve items — FOLDED

- **[MR-1 — roster shape, the recursion one level down]:** the spec conflates the build-map's "5 GL refraction SITES" (paint locations — file paths) with `REFRACTION_READERS` (binding CLASSES/imports B4/a1 walk + the `@supports`-write list S5 walks), then has F5 assert "every member resolves on disk." A class-string (`.glass-refract-gl`) does not resolve on disk like a file path. **FOLD: a TYPED roster shape `{ sites: filepath[], bindings: (class|import)[] }`** — B4/a1 walk `bindings`, S5 walks the `@supports`-gated `sites` write-list, F5 "resolves on disk" applies ONLY to `sites` file-path members. Pin which clause reads which slice.
- **[MR-2 — comment-grep scope]:** the WS8.4 *Gate* asserts a "class-scoped" DEFINITION-ABSENT grep but never gives the regex, while glass-refract/glass-lens COMMENT strings survive in src/demo (`material.css:303`, `glass-specular-track.css:22`, `surfaces.css:314-325`, `buttons.vue:9`) inside the SAME atomic commit. **FOLD: pin the exact class-pattern regex** (`\.glass-(lens\|refract)\b` selector + `['"]glass-lens['"]` binding) so a bare-substring grep cannot false-RED on surviving prose.
- **[MR-3 — comment-cleanup coverage]:** move the src-comment cleanup (`material.css`/`glass-specular-track.css`/`surfaces.css` residual stale comments) from §1e prose INTO the binding *Files* §E/§F list so it co-lands in the WS8.4 atomic commit. **FOLD: enroll the comment-only readers in the binding *Files* list** (the comment-sub-fan-out is the under-enumeration class one level down).
- **[MR-4 — stale §4 cross-ref]:** §1e routes the comment-only readers to "the §4 doc-reconcile sweep", but the spec's §4 is the bg-paint null-guards, not a doc-reconcile (a stale carry from the prior PT-3 proto). **FOLD: re-point the cross-ref to the §3 *Files* §E/§F cleanup** so the comment bucket has a named in-document owner.
- **[MR-5 — WS8.2 sequencing dependency]:** the fence-roster route depends on WS8.2 EXPORTING `REFRACTION_READERS` (the export does NOT exist at HEAD — `proof-glass-refract-fence.mjs` is unwritten). **FOLD: WS8.4's Precond #1+#2+#3 explicitly carries the ROSTER-EXPORT** (not just `useGlassRefraction` minting) so the WS8.4 survivor-gate re-points have a real symbol to import (else the re-points reference an unexported binding — typecheck/import red at the cut).

### 4.3 The EXACT edits (fold target)

| File | Edit |
|---|---|
| `docs/tranches/BG/execution/bg-build-map.md:678-681` (WS8.4 `BG.W-GLASS-SOTA-LADDER`) | replace with the §3 spec block (the 28-file census *Files* A-F + the *Gate* set) + the MR folds: (a) the comment-only readers in the *Files* §E/§F list (MR-3); (b) the class-pattern regex pinned in the *Gate* DEFINITION-ABSENT clause (MR-2); (c) the §1e cross-ref re-pointed to §E/§F (MR-4); (d) WS8.4 Precond carries the ROSTER-EXPORT (MR-5) |
| `docs/tranches/BG/execution/bg-build-map.md:644-646` (WS8.2 `BG.W-GLASS-REFRACT-WEBGL`) | add to *Files*: `proof-glass-refract-fence.mjs` EXPORTS the TYPED `REFRACTION_READERS = { sites: filepath[], bindings: (class\|import)[] }` (MR-1); add F5 clause: every `sites` member resolves on disk + a frozen-string-re-point self-test bite |
| `docs/tranches/BG/execution/bg-paint.wf.js` (co-tracked §2.A2) | the 4 null-guards (applied at execution, mirrors bg-bh-execute — co-applied with G1 MR-3) |

---

## 5. G4 — cut-time device-free-gate-blind omissions (LOCKED, conv 88%)

**Owns:** §2.C1 (kf peer `^5.0.0` vs the shipped 5.1.0 `DragOptions.snap` — a LIVE broken-gesture defect) · §2.G3 (ci.yml `proof:glass-idiom-factor` re-emit + the build-map:451 over-claim) · §2.G4 (3 stale AZ freshness hashes) · §2.L15 (budget net-lift as ONE number). C2 (value `^1.1.1` floor) DROPPED — MOOT (executed `^1.0.0` GREEN, `wcagContrastRatio` zero callers).

### 5.1 The LOCKED decisions

1. **C1 is a LIVE HEAD defect** — `useDragMorph.ts:325` ships `snap:`, the re-roll was EXCISED, kf peer is `^5.0.0`, `DragOptions.snap` first ships 5.1.0 → a kf-5.0.0 consumer never snaps. **Re-home the kf peer bump `^5.0.0 → ^5.1.0` onto `BH-B2.1-swap`** (the FINAL pre-cut package.json single-writer, after WS5/WS6/WS12 before BG.W-CUT — B1-W2 is CLOSED, cannot be the owner). + the floor-vs-API gate-hardening into `proof:peer-conformance`.
2. **G3 over-claim corrected by an INTRA-WAVE ORDERING FLIP** (R4 re-tag `category-card-warm` → full battery BEFORE R3 `gates:emit-ci`) so the emit legitimately adds BOTH gates in one pass — sharper than a re-word, closes the integrator foot-gun.
3. **The 3 stale AZ freshness hashes discharge via the RETIRED-SUPERSEDED banner, GATED AFTER WS2∧WS5** (the deltas capture surface-paths WS2/WS5 rewrite → re-shoot now re-stales). Owned by `BG.W-CLOSE-SWEEP` with a hard clause precond.
4. **L15 = a NAME-AGNOSTIC one-number RE-BASELINE at `BH-B2.1-swap`** (every dist viz/GL chunk in BUDGETS + `criticalPath.violations==[]`) + an optional `profile:budget` un-walked-chunk fold.

### 5.2 The critique mustResolve items — FOLDED

- **[MR-1 — G4 banner-vs-reshoot is asserted from prose, not the *Files* enumeration]:** WS2's build-map *Files* (`useDockSpring.ts` NEW / `useDockOrientationMorph.ts` / `useLiquidFlex.ts` / proof-*) do NOT name `dockMorphContext.ts`/`morph.css`/`layers.css` as DELETED — wave-1 folds `useLayerTransition` + DOCK-DECOMPOSE *carves* GlassDock.vue (modify, not delete). **FOLD: state the G4 discharge decision-rule MECHANICALLY in the CLOSE-SWEEP clause** — per delta, IF every surface-path still RESOLVES post-WS2/WS5 THEN re-shoot+re-stamp (the W-DOCK1 doc's own VERIFY-OR-FALSIFY discipline) ELSE banner; drop the 96%/"banner is the verified answer" framing to ~80% (the per-delta call is genuinely unknown until WS2/WS5 land).
- **[MR-2 — internal-contradiction guard]:** the W-DOCK1/W-DOCK2 DELTA docs were last discharged by RE-SHOOT+RE-STAMP at `1fc03780` with prose insisting "every surface-path RESOLVES / did NOT vanish". A RETIRED-SUPERSEDED "surface gone" banner would be INTERNALLY CONTRADICTORY unless WS2 genuinely deletes those files. **FOLD: the CLOSE-SWEEP clause REQUIRES the per-delta artefact to record the live post-WS2 resolve-check (does the surface-path still resolve?) as the banner-vs-reshoot gate**, NOT a wave-name assertion.
- **[MR-3 — L15 aux-exclusion spec]:** the un-walked-chunk fold into `profile:budget` needs an aux-exclusion list — assert "every `dist/*.js` NON-AUX chunk ∈ BUDGETS" — name the aux set (subpath mirror barrels, index, etc.) explicitly, or the fold reds on every trivial subpath chunk. **FOLD: name the aux-exclusion set in the L15 re-baseline clause** (the readdirSync walk is feasible; the exclusion list is the only open mechanical detail).
- **[MR-4 — single owner for the floor-vs-API gate-hardening]:** pick ONE owner (not the "B2.1-swap co-land OR BG.W-GATE-FIELD-AURORA" disjunction). **FOLD: `BG.W-GATE-FIELD-AURORA` owns the floor-vs-API clause** (it already touches `proof:peer-conformance` — the natural home; closes the two-owner crack).

### 5.3 The EXACT edits (fold target)

| File | Edit |
|---|---|
| `docs/tranches/BG/execution/bg-build-map.md` `BH-B2.1-swap` (`:880-888`) | (a) ADD a `peerDependencies` clause to *Files*: bump `@mkbabb/keyframes.js` `^5.0.0 → ^5.1.0` (REQUIRED-BY B1-W3); (b) the L15 net-rebaseline: every NEW dist viz/GL chunk added to BUDGETS, re-pin moved ceilings as ONE net number, `criticalPath.violations==[]`; (c) the FINAL ci.yml emit byte-fresh incl. `glass-idiom-factor`+`category-card-warm` |
| `docs/tranches/BG/execution/bg-build-map.md` `BG.W-CLOSEFIX-9SITE` (R3/R4, `:451`) | FLIP the intra-wave order: R4 (re-tag `category-card-warm` → `["local","ci","release"]`) BEFORE R3 (`gates:emit-ci`); mechanism prose re-ordered (d)-then-(c) |
| `docs/tranches/BG/execution/bg-build-map.md` `BG.W-CLOSE-SWEEP` (`:471`) | ADD the freshness-discharge clause: **per delta, IF every surface-path RESOLVES post-WS2/WS5 THEN re-shoot+re-stamp ELSE RETIRED-SUPERSEDED banner** (MR-1/MR-2 — the resolve-check is the banner-vs-reshoot gate, recorded in the per-delta artefact, NOT a wave-name assertion); HARD ordering edge: gated AFTER WS2∧WS5 (a clause precond in bg-bh-execute.wf.js) |
| `proof:peer-conformance` (via `BG.W-GATE-FIELD-AURORA` *Files*) | ADD the floor-vs-API assertion (kf floor ≥ first-`snap`-version 5.1.0 when `useDragMorph.ts` references `snap:`); born-RED on `^5.0.0` (MR-4 — single owner) |
| `profile:budget` (optional, `BH-B2.1-swap` RE-BASELINE) | ADD the un-walked-chunk assertion: every `dist/*.js` NON-AUX chunk ∈ BUDGETS, with the aux-exclusion set named (MR-3) |

---

## 6. G5 — live-fix regression protectors (LOCKED, conv 90%)

**Owns:** §2.T6 (D-3 `--dock-expand-t` directional read in WS2 rewrites; WS2 gate blind) · §2.T7 (D-1 constellation parallax-default in a file WS5 rewrites; ZERO standing gate) · §2.T5 (D-2 demo-warm grain double-warms under WS9 GRAIN-REAL).

### 6.1 The LOCKED decisions (3 protectors wired into bg-build-map.md)

1. **WS2 DOCK-MORPH-UNIFY: add `proof:dock-engine` ([local,ci,release], gates.mjs:1761) to the per-wave gate set** — its E4 blend-clamp arm IS the D-3 directional `--dock-expand-t` read assert (verified: E4 reds with the EXACT collapse-balloon-revert message on a pre-D-3 base, GREEN iff the fix present).
2. **WS5 VIZ-DEMIGRATE: a D-1 parallax-default preservation note + an extend-in-place `DEFAULT_PARALLAX===0` assert on `proof:constellation-gen` ([local,ci], gates.mjs:856)** — the durable substrate-agnostic host (`proof:viz-constellation`'s C1 asserts WebGPU which WS5 INVERTS — wrong host; `constellation-gen` reads `constants.ts` + asserts behavioral defaults, survives the de-migration).
3. **WS9 PAPER-GRAIN-REAL OWNS the D-2 demo-local warm-substrate hand-off** (double-warm guard: retire-or-keep-with-rationale, warm-hue floor ≥0.020 gate-locks no-revert, ba-gestalt paper-band verdict gates no-double-warm ceiling).

### 6.2 The critique mustResolve items — FOLDED

- **[MR-1 — WS5 build-arm is unbound, the Class-A recursion one level up]:** the `DEFAULT_PARALLAX===0` assert does NOT exist in `proof-constellation-gen.mjs` today (grep -c = 0), and the build-map edit carries no born-RED forcing it to land. A WS5 build-agent that omits the one-line arm leaves `proof:constellation-gen` GREEN-over-a-re-flipped-default — the exact headless-green/live-broken disease the protector targets. **FOLD: add a born-RED clause** (the arm must red on a planted non-zero DEFAULT_PARALLAX, mirroring WS9's `proof:paper-grain` born-RED binding), OR a develop-time checklist gate asserting `proof-constellation-gen.mjs` contains the assert before the WS5 close. State the WS5 code-arm as a HARD, non-optional WS5 build deliverable.
- **[MR-2 — protector-strength asymmetry undocumented]:** WS2 = LIVE on-disk gate (E4 exists, reds now); WS5 + WS9 = build-time promises (no on-disk assert). The build-map prose presents all three as equivalent "standing protections." **FOLD: make the WS5/WS9 build-time-landing dependency EXPLICIT in their *Gate*/*Files* lines** so the develop phase treats the code-arm edit as a hard, non-optional WS5/WS9 build deliverable.
- **[MR-3 — registry-note drift, cosmetic]:** `proof:dock-engine`'s gates.mjs note enumerates E1/E2/E3/E5 + OMITS E4, while the script + the edit's prose correctly carry E4. **FOLD (optional hygiene): re-stamp the gates.mjs note to list E4** so a future reader does not mistake E4 for absent — outside the 3-protector edit scope, but a clean co-fold.
- **[MR-4 — WS9 binding paint, the honest residual]:** `proof:paper-grain` is born-RED this-wave (no runnable double-warm detector); the no-double-warm CEILING is enforced by the ba-gestalt paper-band verdict + the *Files* retire-or-keep fence + the warm-hue floor. **FOLD: the build-map names WHICH ba-gestalt roster surface carries the no-double-warm verdict** so it is not lost in the W-REFLECT3 sweep (accept-residual: paint IS the gate for a paint-gated wave, named in §8).

### 6.3 The EXACT edits (fold target)

| File | Edit |
|---|---|
| `docs/tranches/BG/execution/bg-build-map.md` WS2 `BG.W-DOCK-MORPH-UNIFY` | add `proof:dock-engine [local,ci,release]` to the per-wave *Gate* set (its E4 IS the D-3 protector) |
| `docs/tranches/BG/execution/bg-build-map.md` WS5 `BG.W-VIZ-DEMIGRATE` | add the D-1 parallax-default preservation note + the `DEFAULT_PARALLAX===0` extend-in-place assert on `proof:constellation-gen`; **a born-RED clause forcing the arm to land** (MR-1) + the build-time-landing dependency explicit in the *Gate* line (MR-2) |
| `docs/tranches/BG/execution/bg-build-map.md` WS9 `BG.W-PAPER-GRAIN-REAL` | the D-2 hand-off block (retire-or-keep-with-rationale + warm-hue floor ≥0.020 + the named ba-gestalt paper-band verdict — MR-4); the build-time-landing dependency explicit (MR-2) |
| `scripts/proof-constellation-gen.mjs` (WS5 build) | land the one-line `DEFAULT_PARALLAX===0` code-arm + its born-RED self-test (MR-1) — the develop-phase follow-up |
| `scripts/gates.mjs` (optional hygiene) | re-stamp the `proof:dock-engine` note to list E4 (MR-3) |

---

## 7. G6 — canon-home reconcile + BG↔BH interleave edges (LOCKED, conv 79% — the census-correction is the load-bearing fold)

**Owns:** §2.I1 (G3 canon-home `BG/canon/` split from the realized `docs/canon/` + resolver) · §2.L12 (`.githooks/commit-msg` shared B0→G3 writer) · §2.L13 (B4f naive-grep scope ≠ B5c hard-reader cleanup) · §2.L14 (`proof:claude-deletable` absent from BH-side B4f specs).

### 7.1 The LOCKED decisions

1. **§2.I1 — home G3's close-disease-sweep canon at the REALIZED `docs/canon/build-and-gates.md`** (the B4b-skeleton home the `canon-doc.mjs` resolver names, resolver-reachable + B4b-architecture-native + already claims the close-battery canon), NOT the fold's chosen-but-ABSENT `docs/tranches/BG/canon/`. Register the G3(WS7)→B4b-content(WS12) shared-write edge with the APPEND-not-clobber constraint.
2. **§2.L13/L14 — receiver-scope the B4f gate onto `proof:claude-deletable` C2 de-blinded** (the bare `rg -l 'CLAUDE.md'=0` CANNOT pass at HEAD); own the soft-mention cleanup at B5c (incl. the `crossrepo-asks WAVE_BOUNDS "CLAUDE.md"` entry removal); name `proof:claude-deletable` in BOTH BH-side specs.
3. **§2.L12 — register the B0(done,[C])→G3(WS7) commit-msg EXTEND-not-clobber edge** (G3 keeps B0's env-gate+ledger arm, appends sweep-fast under the SAME gate); + the C4-both-arms-survive constraint.

### 7.2 The critique mustResolve items — FOLDED

- **[MR-1 — CENSUS CORRECTION, the load-bearing fold]:** the spec asserts a live HARD-reader count of **15** and that "the receiver-gate measures the 15 content-readers", explaining the 16th as "the instrument-chassis README owner that does not read CLAUDE.md." This is FALSE on every axis. The de-blinded C2 receiver detector (the EXACT form B3-a adopts) measures **16** at HEAD (G5's committed set: 12 enumerated + 4 missed: `close-battery-parity:149`, `doc-override-idiom:113`, `on-glass-fg:399`, `readme-meta-clean:221`); every doc the spec edits says 16 (build-map 829/855/906, EXEC-PROG rows 18.10/19.2 + :36, bh-interleave-map 72/146/186); EXEC-PROG:79 lists instrument-chassis as a README B4b-content OWNS (a HOME to author, never a reader — the spec conflates homes-count with readers-count). **FOLD: re-state the census as 16, NOT 15; delete the false "instrument-chassis README is the 16th reader" explanation.**
- **[MR-2 — soft/hard overlap]:** handmark (`proof-handmark.mjs:249 const claude = rd("CLAUDE.md")`; `:252` asserts on it — VERIFIED a genuine HARD reader G5 de-blinded) appears in BOTH the spec's 12 SOFT-cleanup set AND the 16 HARD-reader set. **FOLD: remove handmark from the soft-cleanup set;** its CLAUDE read re-homes via `readCanon` at B5c like the other hard readers, it is NOT a comment-only soft mention.
- **[MR-3 — expandable-part:66 reconcile with G5]:** the spec lists `expandable-part:66` among the 12 SOFT for B5c comment-cleanup, but G5 already names `proof:expandable-part:66` a C2 dead-constant EXCLUSION (declared CLAUDE_MD path const never dereferenced — `:363` reads P.SFC not P.CLAUDE_MD). **FOLD: state the B5c soft-cleanup MUST NOT rewrite/remove the :66 constant** (G5 keeps it as the named exclusion); decide whether the soft-cleanup even applies to it.
- **[MR-4 — derive the soft-set from the CORRECTED 16-hard definition]:** re-run `comm -23` with the de-blinded receiver set as the subtrahend so the soft-set excludes every genuine reader (the read()/rd() form — the F7 4-missed-reader blind spot G5 corrected); only true comment/allowlist-only mentions (`crossrepo-asks WAVE_BOUNDS:56`, `bc-fold-ledger:274`, `peer-optional:5`, `scroll-trigger:87`, etc.) remain. **FOLD: the soft-cleanup set is `(string-grep ∖ de-blinded-16-hard-readers)`, derived not hand-listed.**
- **[MR-5 — re-anchor edit line numbers against live HEAD]:** the spec verified at stale `6c1f5386`; specifically edit #2 (`bh-interleave-map:155` is BLANK — the bare-literal gate is ONE clause at 151-152, not a second occurrence at 155) + the §2 hard-collision table header (`:93`). **FOLD: the develop pass re-anchors all edit line numbers against HEAD `31b128aa`** before applying (the spec's "drop-in edit lists with verified line numbers" pitch needs a stale-HEAD anchor pass).

### 7.3 The EXACT edits (fold target)

| File | Edit |
|---|---|
| `docs/tranches/BG/execution/EXECUTION-PROGRESS.md:232` (row 12.4b G3) | canon-home → `docs/canon/build-and-gates.md` (the realized resolver-named home, OUT of the submodule, APPEND to the build-and-gates close-battery section, shared with G5); the commit-hook arm note (EXTENDS B0-W0's env-driven hook — keeps the ledger arm, adds sweep-fast under the SAME gate) |
| `docs/tranches/BG/execution/bg-build-map.md:483/490/856/924` | every `docs/tranches/BG/canon/close-disease-sweep.md` → `docs/canon/build-and-gates.md` (drop the "(NEW, parent-tracked)" qualifier — the file exists); `:480` C4 clause append (asserts B0's ledger arm survives) |
| `docs/tranches/BG/audit/RESPEC/AMENDED-WAVE-PLAN.md:107` (§2.G3) | `docs/tranches/BG/canon/close-disease-sweep.md` → `docs/canon/build-and-gates.md` (keep the "SHARED with G5's canon-home" sentence — now TRUE on disk) |
| `docs/tranches/BG/execution/bh-interleave-map.md` §2 + §4 | ADD the G3(WS7)→B4b-content(WS12) hard-collision row + the `.githooks/commit-msg` B0→G3 row + the G7(WS5)→crossrepo-asks edge; B4f gate (`:151-152`, re-anchored at HEAD — MR-5) → `proof:claude-deletable` GREEN (C1/C2-de-blinded-**16**/C3); the B5c note: the soft-cleanup strips the SOFT string-mentions **derived from the corrected-16-hard subtrahend** (MR-1/MR-4), **handmark NOT in the soft set** (MR-2), **the expandable-part:66 dead-const NOT rewritten** (MR-3) |
| `docs/tranches/BH/PLAN.md:93` (B4f) + B5c | B4f gate → `proof:claude-deletable` GREEN form; B5c soft-cleanup note (same MR folds) |

> **The census is 16, not 15** (MR-1). Every count the develop pass writes is 16; the soft-cleanup set is derived (string-grep ∖ 16-hard), not hand-listed.

---

## 8. G7 — coverage-matrix + dead-file + carve-chain + consumer reconciles (LOCKED, conv 85% — 2 recursion-fixes folded)

**Owns:** §2.M2 (5 phantom dock owner-waves incl. ★★ dock-gallery) · §2.L7 (PaletteLayer.vue dead file) · §2.L8 (~106/120 pages late-local-only paint) · §2.U1 (bbnf `--glass-blur-dock` silent no-op) · §2.M1 (ladder/shell carve→WS9-grain re-point) · §2.P1 (liquid-morph.css double-owned) · §2.P3 (WS5 6.3/6.7 transient-RED) · §2.P5 (goo-morph worm carve binding-presence) · §2.L1 (no reka/kf binding-sweep).

### 8.1 The LOCKED decisions (the 14-row amendment table)

1. **§2.M2** — 5 FOLD onto real WS2 waves (A4/A5/A6/A9/A11), 3 CONSCIOUS-DEFER-with-rationale (A7/A8/A12), the ★★ dock-gallery directive (A10) earns ONE new clause + `proof:dock-story-modularize`.
2. **§2.L7** — `PaletteLayer.vue` (zero-importer) → `BG.W-DEMO-CHASSIS-CONSOLIDATE` (WS4 delete set).
3. **§2.L8** — ACCEPT the deliberate late-capture model (a 480-to-ci promotion re-creates the §2.A1 chokepoint) + a NEW 16-capture mid-tranche per-band sentinel for the 4 no-roster categories (containers/data/forms/compositions).
4. **§2.U1** — ran the OWED inv-11 exact-name deep-grep (the asymmetric partial no-op confirmed: `--glass-blur-dock`=1 retired read, the 3 survivors live); add a B7 migration row + MINT `proof:retired-token-consumers`.
5. **§2.M1** — G4 carves the GLASS grain (`.glass-*::after`) while WS9 re-engineers the PAPER grain (`--paper-grain-tooth`, paper.css-local): DISJOINT; re-point WS9 *Files* off the pre-carve paths + assign `BG.W-WS12-CENSUS` as the post-WS9 re-carve owner (M1-RECARVE ≤500).
6. **§2.P1** — `BG.W-SPIKE-DELETE` (12.1) is the whole-file-rehome owner, 3.11 keeps only the in-place M5a token close, precond 3.11<12.1.
7. **§2.P3** — move the `proof-gpu-substrate-single.mjs` gate edit ENTIRELY into 6.7, 6.3 source-only+gate-GREEN, precond 6.3<6.7.
8. **§2.P5** — the goo-morph worm carve is DONE+repaired (6daf7ef3); add a binding-presence assert to `proof:colocation` (call-args⊆leaf-params) + un-defer the paint to WS11.
9. **§2.L1** — MINT `proof:binding-sweep` (the feedback_glass_ui_binding_verification gate) wired into the kf-peer bump wave + WS4 DESHADCN-SWEEP + BG.W-CUT.

### 8.2 The critique mustResolve items — FOLDED

- **[MR-1 — A10 MISTARGETS the file, the recursion the audit hunts]:** the spec's `proof:dock-story-modularize` (A10) points at `dock-gallery.vue` — which has **0 `<GlassDock>`** (VERIFIED at HEAD: `grep -c GlassDock dock-gallery.vue = 0`); it is the deliberate BREADTH gallery (iOS surface tiles: AppleMusic/Spotlight/DynamicIsland…). The "ONE dock + tabs facility" substance lives in `liquid-playground.vue` (VERIFIED: **8 `<GlassDock>`** + `<DockStack mode=facets>`, shown horizontal+vertical). Clause-A10's assertions (one GlassDock + DockLayerGroup/DockStack) would be born-RED-FOREVER against dock-gallery OR force a design-breaking rewrite. **FOLD: SPLIT the clause** — (i) `liquid-playground.vue` OWNS the "ONE dock + tabs facility" protection assert (it already PASSES — a protection gate, NOT born-RED); (ii) the "no hardcoded real names" cleanup targets `dock-gallery`'s demo CONTENT labels (the in-dock placeholder app names), NOT the example component filenames (AppleMusic/Spotlight are the gallery's deliberate breadth point). Re-grep BOTH files before authoring the gate.
- **[MR-2 — `proof:retired-token-consumers` re-introduces the inv-11 false-clean it targets]:** specified as a [local]-only RAW-GREP of `$BBNF/src`, it CANNOT run in the siblings-ABSENT `--run full` close battery (W-CLOSE-BATTERY) where token retires land, and has no offline-safe/present-false discipline — so it is the "remembered scout" it claims to replace. The claimed twin (`proof:lineage-probe`) is `[local,ci,release]` + CI-safe-by-DESIGN (registry probe + `constellation.mjs presentConsumers()`/`resolveSibling()` present-false seam + offline-safe pinned fallback). **FOLD: re-architect `proof:retired-token-consumers` through `constellation.mjs presentConsumers()`/`resolveSibling()`** (the present-false CI-safe seam its claimed twin uses) and tag it `[local,ci,release]` so it actually fires at the cut; otherwise a future token-retire-consumer break is never caught at the close.
- **[MR-3 — C2-SENTINEL wrong-anchor (class U)]:** the clause names `forms/input` — the real route/file is `forms/inputs.vue` (VERIFIED: `forms/inputs.vue` exists, `forms/input` does not). **FOLD: correct to `forms/inputs`** (the other 3 — `compositions/math-paper`, `containers/sheet`, `data/metric-stack` — verified present).
- **[MR-4 — WS5 P3-2 precond reconcile]:** `build-map:294` already states 6.7's "*Precond:* M4(#3)" where #3 IS DEMIGRATE (6.3), and the Gate line already says "co-revert atomic with DEMIGRATE (#3)". **FOLD: state the §2.P3 edit as a REFINE** (move the gate edit ENTIRELY into 6.7 + tighten the precond to name 6.3 explicitly), NOT a net-new edge — otherwise the de-dup reads as adding a precond that partly exists.
- **[MR-5 — WS9 M1 executor-judgement, carried honestly]:** the WS9 *Files* re-point onto `grain-overlay.css`/`shell-regions.css` is conditional on whether GRAIN-REAL touches the GLASS `::after` grain or ONLY paper.css's `--paper-grain-tooth`. **FOLD: resolve the IF at amend-time by reading the WS9 mechanism intent** (the azimuth is gate-locked to `--glass-key-direction`, the PAPER system) — if WS9 touches paper.css only, the WS9 *Files* DROP `ladder.css`/`shell.css` entirely (they carry 0 `--paper-grain-tooth`), not re-point them to the carved leaves.

### 8.3 The EXACT edits (fold target — the 14-row amendment table, MR-corrected)

| # | File | Edit |
|---|---|---|
| M2-1 | `P-historical-coverage.md` + build-map Wave-2 preamble | the §A2 reconcile table (5 phantom owner names → real WS2 waves; 5 FOLD, 3 DEFER-with-rationale) |
| M2-2 | build-map `BG.W-DOCK-STORY-MODULARIZE` | **SPLIT clause A10 (MR-1): (i) `liquid-playground.vue` owns the one-dock+tabs-facility protection assert (PASSES, not born-RED); (ii) the no-hardcoded-names cleanup targets `dock-gallery.vue` demo CONTENT labels, NOT example component filenames** + `proof:dock-story-modularize` re-grepped against both files |
| L7-1 | build-map `BG.W-DEMO-CHASSIS-CONSOLIDATE` | add `aurora/config/PaletteLayer.vue` to the delete set |
| L8-1 | build-map `BG.W-PAGE-COMPONENT-AUDIT` (WS12) | clause C2-SENTINEL (16-capture mid-tranche per-band spot-check; **the 4 representative pages = `forms/inputs`/`compositions/math-paper`/`containers/sheet`/`data/metric-stack` — MR-3** correcting `forms/input → forms/inputs`) + the section-landing scope note |
| U1-1 | `asks-and-consumes.md` (or BH B7 table) | the `bbnf-glass-blur-dock-retune-no-op` B7 migration row |
| U1-2 | `gates.mjs` + build-map | mint `proof:retired-token-consumers` **re-architected through `constellation.mjs presentConsumers()`/`resolveSibling()`, tagged `[local,ci,release]` (MR-2)**; G4's *Gate* set adds it; born-RED on bbnf:230 |
| M1-1 | build-map `BG.W-PAPER-GRAIN-REAL` *Files* | **resolve the IF (MR-5): if WS9 touches paper.css only → DROP `ladder.css`/`shell.css`; if it re-tints the glass `::after` grain → re-point onto `grain-overlay.css`/`shell-regions.css`**; record GLASS-vs-PAPER grain disjointness |
| M1-2 | build-map `BG.W-WS12-CENSUS` | clause M1-RECARVE (post-WS9 ≤500 re-check of ladder/shell/carved-leaves) |
| P1-1 | build-map `BG.W-DEMO-STYLE-REHOME` (3.11) | drop the whole-file rehome (keep the M5a in-place token close); 12.1 owns the 850L move |
| P1-2 | build-map `BG.W-SPIKE-DELETE` (12.1) | add precond `BG.W-DEMO-STYLE-REHOME` (3.11) — the in-place token close lands before the file moves |
| P3-1 | build-map WS5 preamble (`:265`) + 6.3/6.7 | **REFINE (MR-4): move the gate edit ENTIRELY into 6.7 + tighten the existing 6.7 precond to name 6.3 explicitly** (NOT a net-new edge); 6.3 source-only+gate-GREEN |
| P5-1 | `proof:colocation` + build-map | clause WORM-BINDING (call-args⊆leaf-params binding-presence assert) + self-test |
| P5-2 | EXECUTION-PROGRESS BH.B2.4a paint note + WS11 build-map | un-defer the worm paint from WS12 to WS11 (the carousel/pager band) |
| L1-1 | `gates.mjs` + the kf-peer bump wave + WS4 DESHADCN-SWEEP + `BG.W-CUT` | mint `proof:binding-sweep` [local]; wire into the bump wave + deshadcn + the cut |

> Two cross-PT compositions recorded (no double-assign): `proof:binding-sweep` ↔ G4's kf-peer bump owner (G4 names the wave `BH-B2.1-swap`, G7 mints the locking gate); `proof:retired-token-consumers` ↔ inv-11 `proof:lineage-probe` (the EXPORT twin — now sharing the `constellation.mjs` present-false seam per MR-2).

---

## 9. CONVERGENCE ACCOUNTING

| Cluster | Resolve | Critique | Driver of the discount |
|---|---|---|---|
| G1 | 88% | **82%** | the MR-1 intra-file D-G4-table contradiction + MR-2 dual-row ambiguity (re-bitten friction class, folded) |
| G2 | 90% | **76%** | the MR-1 BLOCKING C6-regression (read-superseded-passes recursion on the bevel) + MR-2 false-on-disk + MR-3 shape-vs-magnitude — all folded |
| G3 | 91% | **90%** | MR-1 roster-shape + MR-2 comment-grep-scope (recursion one level down) — folded |
| G4 | 93% | **88%** | MR-1/MR-2 banner-vs-reshoot asserted-from-prose — folded to a mechanical resolve-check rule |
| G5 | 93% | **90%** | MR-1 WS5 build-arm unbound (Class-A recursion one level up) — folded to a born-RED clause |
| G6 | 94% | **79%** | MR-1 the 16-vs-15 census error (the de-blinded receiver measures 16) + MR-2 handmark soft/hard overlap — folded |
| G7 | 91% | **85%** | MR-1 A10-mistarget (dock-gallery has 0 GlassDock) + MR-2 `retired-token-consumers` CI-blind (the two recursion-fixes) — folded |

**Overall (critique-weighted aggregate): 84%.** Up from the PASS-1 baseline 68% — PASS 3 folded every critique mustResolve item in place. The discount from 100% is: (a) the build-phase residuals every cluster honestly carries (the run-time-only arms, the on-device Metal parity, the live FAIL-recovery boot — all named in §10, NONE a feasibility unknown); (b) the EXECUTOR judgements bounded + named (the GlassPanel re-point-vs-retire, the Button `:liquid` disposition, the soft-mention re-phrasing). NO cluster carries an unresolved feasibility open; every critique BLOCKING/recursion finding is folded with an exact edit.

---

## 10. ACCEPTED RESIDUALS (build-phase / executor-judgement — each named + owned)

These are NOT feasibility unknowns or design restarts — each is an executable wave or a bounded judgement, de-risked at audit:

| # | Residual | Owner (the proving wave / boot) |
|---|---|---|
| R-1 | The first-boot DAG dry-run: ONE G4 node from build-map (not two from the dual EXEC-PROG rows), preconds + G4-as-precond-of present, composeBatch picks G4 first (G1 MR-4) | first EXECUTION boot (the loader-prompt carve-edge is belt-and-suspenders) |
| R-2 | The G2 chromatic uniform VALUE + ε (field-dependent), the WebKit shader-compile time, the per-pixel Metal-rasterizer drift, the WGSL Tier-2 FBO on Safari.app | keystone `BG.W-GLASS-BACKDROP-SAMPLE` + `BG.W-SAFARI-PARITY-GATE` + W-REFLECT3 (the C18 harness ships) |
| R-3 | The G4 banner-vs-reshoot per-delta call (genuinely unknown until WS2/WS5 land — the resolve-check rule is mechanical) | `BG.W-CLOSE-SWEEP` (after WS2∧WS5) |
| R-4 | The G5 WS9 no-double-warm binding paint (paint IS the gate for a paint-gated wave; the named ba-gestalt paper-band verdict) | `BG.W-PAPER-GRAIN-REAL` + W-REFLECT3 |
| R-5 | The G5 WS5 `DEFAULT_PARALLAX===0` code-arm (the born-RED clause forces it; the develop-time checklist backstops) | WS5 `BG.W-VIZ-DEMIGRATE` build |
| R-6 | The G7 GlassPanel re-point-vs-retire-published-/glass-panel decision + the Button `:liquid` disposition (bounded executor calls) | WS8.4 build (owed-before-build, not feasibility-open) |
| R-7 | The G6 A2-ii overgrow fallback (standalone `docs/canon/close-disease-sweep.md` + resolver key, ONLY if build-and-gates overgrows at B4b-content) + the exact soft-mention re-phrasing | B4b-content / B5c (executor judgement) |
| R-8 | The G2/G6/G7 stale-HEAD line-number re-anchor (the spec resolves ran at 6c1f5386/998136bb; the develop pass re-anchors against HEAD 31b128aa before applying) | the FOLD agent (a mechanical re-anchor pass) |

---

## 11. developReady VERDICT

**developReady: TRUE.** Every cluster is either fully-resolved (G3/G4/G6/G7 — exact edits named, critique mustResolve folded) OR an explicitly-accepted-residual with a named owner (§10) — matching the first audit's RESPEC/AMENDED-WAVE-PLAN.md bar (which closed at 86% develop-ready with named build-phase deferrals). The seven clusters reduce to plan-text / gate-spec amendments + a bounded set of src/wf.js edits the build phase applies; ZERO feasibility restart. The two BLOCKING / recursion findings the critiques surfaced (G2's C6-regression, G7's A10-mistarget + retired-token CI-blindness) are folded with exact edits + on-disk verification this pass.

**The fold-agent applies:** §2.3 (G1), §3.3 (G2), §4.3 (G3), §5.3 (G4), §6.3 (G5), §7.3 (G6), §8.3 (G7) — each re-anchored against HEAD `31b128aa` (R-8) before applying.

**nextFocus: FOLD INTO THE TRANCHE SET.**
