# The Constellation Structure Standard — ROUND-6 SPEC (the directive-close)

**Status:** the directive-close. Round-5 promoted `STRUCTURE-SPEC.md` to CANONICAL (min-convergence 72% cleared on every lens; the design LAW unanimous and prototype-proven at family AND full-tree scale on two independent HEADs) and left FOUR genuinely-contested matters as round-6 DIRECTIVES — verifications of gate-hardening, not new design. Round 6 EXECUTED all four as born-RED→GREEN prototypes with real builds, real backends, real dev servers. Every one resolved; two DECISIONS reversed a round-5 default on the evidence. This spec folds the four directive-closes plus two enforcement-machinery corrections into the canonical LAW+RUNBOOK, flagged `[R6]`. Prior flags carry through unchanged: `[R5c]` round-5 CLOSE, `[R5v]` round-5 verification, `[R5]`/`[R4]` standing.

**What round 6 CHANGED from the canonical (the four directives + two folds, adjudicated with executed evidence):**
1. **`[R6]` The `componentIdGenerator` SWAPS — GLOBAL parent-scoped, not build-scoped basename.** Parent-scoped `getHash(immediateParentDir + '/' + basename)` DOMINATES the round-5 basename ruling on every axis and strictly on four; the swap was EXECUTED born-RED→GREEN over six real builds + a live dev/HMR smoke. §7 + §6-G6 rewritten. The build-scoping gymnastics and the family-prefix source-convention gate are DROPPED (counter-edict removed).
2. **`[R6]` The golden-hash gate's invariant is CORRECTED (a soundness bug the swap exposed, generator-independent).** The full flatten reorders the SFC-fold blocks for ANY generator, so the round-5 "byte-IDENTICAL `dist/glass-ui.css` under the generator" claim over-promises and would FALSE-RED the real flatten. The true invariant is scoped-token-SET identity + a ONE-TIME golden byte rebaseline at the cut (§6-G6).
3. **`[R6]` The component-CSS-locator leaf is REJECTED (DEFER→hard REJECT).** The build side consumes ZERO per-component paths (whole-directory `cpSync` + `@import`-graph resolution), so the leaf's second consumer-class is a phantom; its first-move cost is strictly greater than the mechanical rewrite AND adds a new gate; the no-legacy + aristotelian edicts forbid the indirection for a value that changes ONCE. The sound factoring the investigation SURFACES — a shared CORPUS-ROOT constant (`STYLE_CORPUS_ROOTS`) — is ADOPTED instead. "5 tree-walkers develop a blind spot" corrected to 4.
4. **`[R6]` §4P.5's soft branch is now DECIDABLE — the colocated feature-shaped-interior criterion.** Executed born-RED→GREEN over speedtest admin/dashboard/survey (3→0) with an independent non-overfit witness in words/frontend. The honest soft-note is retired.
5. **`[R6]` The README-complexity trigger ships MACHINERY-GATED (a correction to the round-5 raw ≥3-SFC fold).** The raw form storms 23 false-positives across the shadcn compound-component families on the settled flatten; the machinery-gate narrows 24→4 and keeps the flagship (configurator) born-RED (§2.1, §6-G1).
6. **`[R6]` The G9 backend resolver v2 is PROMOTED** (recursion + DATA/LOGIC + core/pipelines + integrations + pluralize-normalize; floridify 47→49; self-test 9→12; four anti-evasion mutants each drop to 11/12). §5.1, §6-G9.

**Scope:** ONE structural grammar for every repo in the constellation — glass-ui (the library) + its sibling demo/consumer apps (speedtest, words/floridify, slides, sci-report) + the polyglot backends. Frontend and backend under one law; each language binds its own idiomatic norms.

**Constitution:** the user's edicts (§0). Aristotelian proportion is the divining rod; colocation is recursive; no god-modules, no needless encapsulation; clean break, no legacy.

**`[R5]` Document structure — LAW vs RUNBOOK.** §0–§6 are the **LAW** (the timeless grammar, G8-promoted to the read-only precepts submodule as the constellation's single source). §7–§9 + the appendices are the **RUNBOOK** (the one-time 5.0.0 migration — specifier counts, hash values, `unlink` commands; obsolete the moment the cut lands, BH-tranche-local). The physical split is an execution decision; the seam is recorded so no reader mistakes a migration figure for a standing law.

**`[R6]` Freshness note (recomputed round-6 against the live cut branch tranche/BG; the codemod re-runs the census at the ACTUAL cut HEAD, never a verification HEAD).**
- The cut tree is MOVING under the live BG engine (round-6 census HEAD `5d59207`; this session's HEAD `f7e9b6ca`; round-5 verification HEAD `5fbb8a3b`). Every count below is a snapshot; the RECOMPUTE mandate (barrel census, viz membership, family count, specifier counts, `RATCHET_BASELINES`) is binding at the cut.
- plugin-vue **6.0.7**; vite **8.0.13** (native Rolldown). `getHash = sha256(text).substring(0,8)`. Default SFC id = `getHash(normalizePath(relative(root,filename)) + (isProduction ? source : ''))` — path+source. **`[R6]` The generator is REPLACED (§7): GLOBAL parent-scoped.**
- **253** `.vue` in `src/`, **41** carry `<style scoped>`. Across `src/ + demo/` = **428** `.vue`. **`[R6]` Under parent-scoped keying there are 0 collisions across all 428** (basename had 1: the `Notification.vue` src↔demo pair) — so build-scoping is no longer needed. The FLAT tree emits exactly **41 distinct scoped-ids, 0 collisions**.
- The procedural-viz DOMAIN is the **8 live `useGpuSubstrate` importers** (aurora, concentric, constellation, dot-flow-field, dot-matrix, fourier-field, goo-blob, liquid-grid) **+ goo-filter the non-importing rider** = a **9-member VIRTUAL domain**. `paper-grid` retired; `liquid-grid` superseded it. STABLE this round.
- **NINE mixed barrels** in glass-ui (8 CVA + `composables/color/index.ts`). STABLE at 9. **`[R6]` `proof:barrel-pure` is a PROPOSED gate — not yet on disk** (a BH-migration deliverable authored at the cut); the census is a hand-transcribed scan of all 116 `src/**/index.ts`. glass-ui declares `sideEffects: ["*.css"]`; all four siblings declare NONE.
- Sibling barrel census (recomputed at cut HEAD, all MATCH the authored §4P.13 table): speedtest 1 mixed / 14 (`features/speedtest/state/index.ts`); words/frontend 6 mixed / 48 (`api/index.ts` priority); slides 0/0; sci-report 0/2.

---

# ═══ LAW (§0–§6) — the timeless grammar, G8-promoted to precepts ═══

## §0 The constitution (edicts, restated as binding)

1. ONE standard for component/module structure covering BOTH frontend and backend, for the WHOLE constellation.
2. **Aristotelian proportion is the divining rod.** Needless encapsulation and excessive granularity are vices; god-modules are the opposite vice. The MEAN divines components, nested/recursive components, modules, directories.
3. **Colocation, recursively.** A component lives WITH its sub-components, composables, skeletons, constants, styles, shaders, README — recursing for nested components. Only truly module/global-level kin live in a shared home.
4. Long-running dirs ALWAYS break into common modules, encapsulated befittingly.
5. Settle with evidence: FLATTEN the `components/ui + components/custom` two-tier, or not? — **SETTLED: FLATTEN to a PURE FLAT namespace** (§3); domain grouping is VIRTUAL (a machine-locked README domain-map), no physical sub-tier.
6. Backend gets the SAME treatment + enforcement, abstracted per language.
7. NO quick solutions, NO workarounds. Idiomatic, gestalt approaches. Architectural transposition for elegance, simplicity, performance. NO legacy code, no back-compat aliases.
8. Every file, component, style examined, then RE-examined.

---

## §0.5 The normative quick-reference (the whole law at a glance)

*The crisp core G8 propagates to every polyglot engineer; the sections below are the rationale.*

1. **The unit is the component/domain FOLDER with an `index.ts` barrel** — scales with the concern, the barrel is invariant. FE `component/`, BE domain `package/`.
2. **Colocate by default; promote to a shared home only when EARNED** (≥2 UNRELATED families, decidably counted — §1.3 T3).
3. **A file over 500 RAW lines is a god-module** — drains via the ratchet by cohesion carve. Single-artifact drain tools: shader-literal, data-manifest (T1a), SFC `<style>`-mass (T1b), SFC script/template-mass (T1c). **T1b and T1c COMPOSE into a TREE** — apply T1b, RE-MEASURE, then T1c if still over 500; a T1c carve births large children that recursively re-breach. A plain over-500 `.ts`/`.py`/`.go`/`.rs` drains by the ordinary cohesion carve. No permanent length exemption. A doc-inflated cohesive file drains by STRUCTURAL carve, NEVER comment-stripping (§6 G2 conservation detector). The 500 ceiling binds product-app feature INTERIORS and backend packages identically.
4. **A segment dir holds files, not other segment dirs.** Segments (FE): `composables/ lib/ shaders/ skeleton/ styles/ sections/ constants/ config/`; (BE): `api/ model/ lib/`. A segment appears only with real members OR a genuinely-separable concern (T4). A single separable helper (or single style sheet) stays a ROOT SIBLING file until a 2nd earns the dir.
5. **A nested sub-component with its own `index.ts` RESETS the depth budget** (≤5 dirs below the nearest feature/component root; T2).
6. **Cross-family imports go through the BARREL, never into another component's guts.** Two preconditions: (a) each repo declares `sideEffects`; (b) **every barrel is PURE RE-EXPORT-ONLY** — no `export const/function/class/default` shares a barrel with `export … from` (Vite/Rolldown #21966 disqualifies mixed barrels from DCE). The SOLE exemption is a curated subpath-entry re-exporting a deep colocated LEAF. This binds glass-ui's OWN barrels — the **NINE mixed barrels** (8 CVA + `composables/color`) un-mix; the own-runtime export moves to a purpose-named SIBLING named by its KIND (`variants.ts` CVA · `store.ts` Pinia · `constants.ts` magic numbers · `core.ts` the pure-runtime FALLBACK) and the barrel re-exports it via `export * from './<sibling>'` (§2.1).
7. **The divining rod runs both ways:** FOLD an over-abstracted single-owner leaf; PROMOTE a buried multi-family primitive/DI-context OUT.
8. **Location and publish-surface are ORTHOGONAL** (4-node DAG, §2.5).
9. **Reject layer-by-type of DOMAIN LOGIC.** Infra-ring, shared-types registry, orchestration tiers are the legitimate exceptions (§5.1). **The scatter check runs GENUINELY RECURSIVELY at EVERY dir level** (over `walkDirs`, not top-level `readdirSync`), governed by a **DATA-vs-LOGIC split** (a type/schema/dto/serializer REGISTRY → WARN; a routes/services/repositories LOGIC scatter → born-RED). `pipelines/` (orchestration, reaches domains downward) ≠ `core/` (infra-ring, reaches nothing downward); external-service adapters go in `integrations/`. Layer names are pluralize-NORMALIZED. **`[R6]` The v2 resolver is PROMOTED (§5.1/§6-G9): floridify 47→49, 12-bite self-test, four anti-evasion mutants.**
10. **Route/entry layer:** FE `views/` (route-bound, never folds), BE `pipelines/`/app-service tier. Bootstrap concern thin.
11. **Clean break, no aliases.** Position-preserving where byte-identical-carve applies, gestalt-reshaping where structure demands. Grep-locked provenance comments carry VERBATIM into the host file post-carve.
12. **Every new structural gate is a device-free `proof:*` script with self-test bites, born-RED on the tree it drains — never ESLint.**

---

## §1 The Law of Aristotelian Proportion

> The mean is not a number. It is the answer to one question asked of every module: **does everything in here belong together, and is anything that belongs together kept apart?** The thresholds are guardrails that catch drift toward either vice — not the law. The law is cohesion. The divining rod runs in **both directions**.

### §1.1 The two vices, named

| Vice | Name | The failure |
|---|---|---|
| **Excess** (too little division) | **God-module** | A file/dir holds >1 concern; things that change independently are fused; a reader must hold the whole file to understand any part. |
| **Deficiency** (too much division) | **Atomization** | A concern shattered across many tiny modules; an abstraction minted before ≥2 real consumers. Premature abstraction is *more* harmful than the duplication it removes. Special cases: **atomization-by-misplacement** (burying a general/sibling-owned/app-global primitive inside ONE consumer); **the buried-primitive** (a shared primitive resident inside one component that ≥2 OTHERS reach into — §1.5); **the buried DI-context** (a context provided by ONE component, read by ≥2 FOREIGN families — the `dockContext` case). **A one-file segment dir (a `styles/` holding one sheet, a `composables/` holding one composable) is atomization** — the single artifact stays a root sibling until a 2nd earns the dir (T4). |

Layer-by-TYPE is the god-module's structural cousin; over-colocation is atomization's. The spec forbids both.

### §1.2 The unit: the component FOLDER

The atomic module is the **per-component folder with an index barrel** — reka-ui's Combobox (17 files) and a 2-file wrapper are the SAME unit at different scales; the folder scales with the concern, the barrel is invariant. FSD's *slice*, bulletproof-react's *per-feature dir*, Comeau's *component-folder-with-index* — one convergent SOTA-praised unit. glass-ui already runs it in `custom/`; the spec canonizes it as universal (frontend and backend). **Colocation is the default; promotion to a shared home is the exception that must be earned** (§1.3 T3).

### §1.3 The thresholds (guardrails, with rationale)

**T1 — File size. Hard ceiling 500 RAW lines; soft target ~300; the real test is cohesion.**
- 500 is the house-native ratchet (`proof:no-god-module`, `HARD_LIMIT=500`). **Lines counted RAW** (`source.split("\n")`, mirrors `wc -l`) — PINNED. §8 `RATCHET_BASELINES` are raw.
- 500 is a **fail ceiling**, ~300 a **soft target** (warn), and a file *under* 500 is still a violation if it fuses >1 concern.
- **Over-ceiling escape: the draining RATCHET only — no permanent length exemption.** The anti-gaming clause is DECIDABLE (§6 G2): a file inflated by load-bearing documentation drains by a STRUCTURAL carve, NEVER by stripping comments. Measured, `App.vue` is 251 code / 530 comment / 52 blank = 64% comment, and stripping the 530 comments ALONE clears 500 — the G2 conservation detector is the SOLE barrier.
- **Shader-literal exemption:** a single cohesive `*.{glsl,wgsl,frag,vert}.ts` string is ONE artifact — exempt, governed by cohesion.
- **Data-manifest exemption (T1a):** a single-source DATA manifest N gates parse by literal path may exceed 500 *as data* IFF its resolution/logic machinery is carved out. Registered, named.
- **SFC over-ceiling carves — TWO tools that COMPOSE into a TREE (T1b + T1c):**
  - **The composition rule.** Apply T1b (extract `<style>`), RE-MEASURE `<template>+<script>`; if still over 500, apply T1c. PROTOTYPE-CONFIRMED on both double-breachers: `SpeedtestResults.vue` 2265 −1351 `<style>` = 915 → full drain 374; `App.vue` 833 −(248 `<style>` + 36 docblock) = 550 → full drain 301.
  - **The drain is a TREE, not a 2-step.** A T1c template carve births large children (`MetricHero.vue` absorbs ~261 template lines + a scoped-style share → re-breaches → needs its own T1b). The speedtest feature has FOUR live breachers (SpeedtestResults 2265, ResultStack 697, MeterColumn 688, PhaseTimeline 501), all draining under the promoted `ui/SpeedtestResults/` folder by the same recursive rule.
  - **T1b — `<style>`-mass extraction.** The `<style scoped>` mass extracts to a `<style src>` sibling; the extracted CSS is EXEMPT from the SFC line count. Placement follows T4: root-sibling `<style src="./<Name>.css">` when it is the family's only style artifact; `styles/` only when the family earns that dir. PROVEN byte-neutral end-to-end (plugin-vue 6.0.7). The extracted file rides the SFC fold pipeline (`dist/glass-ui.css`), NOT the `index.css` cascade. The App.vue arm is the lowest-risk case (its `<style>` is NON-scoped `@layer speedtest`, no scope-id, already live in the repo).
  - **T1c — script/template-mass carve.** Template mass → cohesive sub-component SFCs (a section with its own props/logic → nested sub-component under the root or `sections/`). Script mass → component-local composables (a coherent reactive block → `composables/<useX>.ts`; a single such block stays a ROOT SIBLING until a 2nd earns the dir, T4). PROVEN: `GlassDock.vue`→`useGlassDock.ts` drains 515→230; `DockLayerGroup.vue`→`useDockLayerGroup.ts` drains 524→141.
  - **The coherence criterion (the carve seams are the file's OWN section headers).** A carve is COHERENT iff its residual either self-composes its inputs OR shares ONE nameable composable — NEVER a v-if+prop-drill glue chain. The decomposition PROMOTES the file's existing internal organization into physical files.
  - **The minimal-drain-vs-symmetry ruling.** The ratchet forces ONLY enough drain to clear 500; the useX-orchestrator symmetry lift is PERMITTED but NOT FORCED. A symmetry-for-symmetry glue split with no nameable concern is atomization and forbidden.
  - The reader-gate follow-cost is INTRINSIC and budgeted (~3 gates per over-bound dock SFC).
- **The plain-composable god-module (base carve).** `useGlassBackdropLuminance.ts` 554 drains by the ordinary cohesion carve into colocated sub-leaves. The same base case binds every over-500 `.py`/`.go`/`.rs`.

**T2 — Directory depth. Colocation nests at most ONE segment level below a component root; recursion resets the budget.**
- SOTA: readers lose context past 3–4 levels; FSD caps at 3. Within one component root the tree is `root → {segment dir} → file`. A segment dir holds files, NOT other segment dirs. A nested SUB-COMPONENT (a child with its own `index.ts`) is a NEW root that RESETS the local budget. Global sanity cap ≤5 dirs below the nearest feature/component root. Machine-locked by `proof:depth` (§6 G3).

**T3 — Promotion to the shared tree. ≥2 UNRELATED families — decidably counted.**

The house's ≥2-consumer invariant (J-inv-10) IS this rule, extended to every non-visual leaf. The count is decidable by its inclusion/exclusion set:
- INCLUDE composition edges (a leaf real-imported by a SIBLING shared-tree leaf).
- INCLUDE demo/sibling-app app-global usage.
- EXCLUDE within-family DI plumbing.
- EXCLUDE discovery-layer TYPE re-exports (an `api/` type re-export is a PUBLISH edge; the criterion counts MODULE-PATH imports).
- PROMOTE a cross-family-read DI context (≥2 non-owning families by module-path import) to `composables/context/`, carrying its `InjectionKey` + helper + domain types. Live: `dockContext.ts` read by 5 non-dock families → promote.
- EXCLUDE root-barrel/curated-aggregator re-exports (a publish signal, not a location signal).

**The DI-promotion criterion, codified:** *a `createStrictContext`/`createOptionalContext` module promotes to `composables/context/` IFF ≥2 non-owning feature-dirs import its MODULE PATH.* Over all 8 DI-context sites exactly ONE qualifies (`dockContext`=5); the 7 others STAY.

- **Exemption (T3a):** a PUBLISHED subpath with a recorded external consumer stays module-level at 0 in-repo families (`/virtual`, `/sidebar`). Checkable against `docs/consumer-evidence/`.

**T4 — Segment minimum-substance.** A `composables/` holding one file, an empty `constants.ts`/`shaders/`, a 1-file `lib/`, a `styles/` holding one sheet — atomization. A segment appears ONLY with real members OR a genuinely-separable concern. A lone component-local composable, helper, OR style sheet stays a SIBLING FILE at the component root until a second earns the dir. Machine-locked by `proof:colocation` no-empty-segment clause (§6 G1).

### §1.4 Both-direction violations, decidable

**God-module (excess) — any of:**
- file >500 RAW lines (non-shader, non-data-manifest; SFC via T1b→T1c compose-tree; plain composable via base carve);
- a dir mixing >1 domain/concern with no sub-grouping;
- layer-by-type at ANY dir level (RECURSIVE scatter check);
- a grab-bag (`utils.ts`, `helpers.go`, `common.py`);
- a mixed barrel (`export const/function/class` OWN exports beside `export … from`);
- **the `mixed-kind` flat-dir smell (advisory):** a flat dir of >~7 sibling files of MIXED kind is a human-review flag (the machine substitutes are the README domain-map, `proof:depth`, `proof:import-boundaries`).

**Atomization (deficiency) — any of:**
- a shared-tree resident with <2 unrelated families and no external-consumer exemption → **FOLD**;
- atomization-by-misplacement;
- the buried-primitive (≥2 OTHERS import) → **PROMOTE**;
- the buried DI-context (≥2 FOREIGN families) → **PROMOTE** to `composables/context/`;
- a segment dir with a single trivial member (T4 — incl. a 1-sheet `styles/`);
- a wrapper module that only re-passes its inputs (labeled-field's 5 `Labeled*` → one generic + typed slot);
- a composable/util extracted before its 2nd consumer.

### §1.5 The FOLD↔PROMOTE symmetry

One census machinery, three placement cases. **T3 is a placement function of family count, not a one-way ratchet.**
- **FOLD (globality gate, §6 G1).** Verified: `useDockCtaReceive` → `dock/composables/`; `composables/sortable/` → `sortable-list/composables/`. Seven round-1-named "folds" are STAY-SHARED.
- **PROMOTE — buried primitive (§6 G4).** Born-RED with 25 cross-component GUTS reaches. Drivers: `aurora/constants/budget.ts` (12 files/7 viz families) → shared; `procedural-color.wgsl.ts` (6 sibling shaders) → `composables/glass/webgl/shaders/`; `useDockHold.ts` (reached by `ui/slider`) → promote with `dockContext`; `curlFBM` (`concentric` reaches `liquid-grid/index.ts`) → shared field operator.
- **PROMOTE — buried DI-context (§6 G4).** `dockContext.ts` → `composables/context/`. Proven: typecheck 0, build 0, `/dock` byte-stable, ZERO new backward edges, −327 gz on each of 5 foreign routes.

---

## §2 The recursive component-dir schema (frontend)

### §2.1 The atomic unit
```
components/<name>/
  <Name>.vue                 # the root SFC
  <SubName>.vue …            # sibling sub-components (flat until they earn their own dir)
  <name>.css                 # the single colocated cascade sheet (T4 root sibling)
  index.ts                   # THE public API barrel — PURE RE-EXPORT-ONLY (feeds the subpath)
  variants.ts                # the CVA + variant types when present (never in the barrel)
  store.ts                   # the Pinia/state own-runtime leaf when a barrel would otherwise mix
  core.ts                    # the pure-runtime-function own-export leaf (the FALLBACK kind-name; the color pattern)
  constants.ts               # magic numbers/enums (when ≥1 exists; also the own-runtime home for bare consts)
  README.md                  # colocation-adoption marker + human map (mandatory when complex — the trigger below)
  composables/               # component-LOCAL composables (when ≥2, or one genuinely separable)
  lib/                       # component-LOCAL pure/mixed helpers (when ≥2)
  shaders/  skeleton/  styles/  sections/     # segment dirs, when EARNED (≥2 members)
```
The barrel `index.ts` is the invariant the flat subpath re-exports; the export surface is DECOUPLED from internal layout. A trivial 2-file component keeps the folder+barrel.

**The own-runtime-sibling RULE.** When a barrel would mix an own runtime export with re-exports (Precondition B), the own export moves to a purpose-named SIBLING named by its KIND, re-exported via `export * from './<sibling>'`. The kind→name table (not two hard examples): CVA → `variants.ts`; a Pinia/state store → `store.ts`; bare magic-number consts → `constants.ts`; a color/value runtime-function cluster (or any own-runtime export with no narrower kind) → `core.ts` (the FALLBACK). A barrel carrying BOTH a CVA AND own helpers gets BOTH siblings. FE `core.ts` (own-runtime FILE) is distinct from BE `core/` (infra-ring DIR, §5.1); the grammar names them apart so a reader never conflates them.

**`[R6]` The README complexity trigger — MACHINERY-GATED (the corrected form).** `proof:colocation` derives its target set from README PRESENCE, so "README mandatory when complex" was machine-UNENFORCEABLE — a complex family that OMITS its README was not a target (the flagship live witness at HEAD is `custom/configurator/`: 3 SFCs, 1122 root lines, `useConfiguratorState.ts` at the package root, NO README, and `proof:colocation` returns PASS with configurator ABSENT from the target set entirely). The gate now carries a POSITIVE COMPLEXITY TRIGGER that ENROLLS a family INDEPENDENT of README presence, target set = `README-bearing ∪ complexity-triggered`.

The **canonical predicate** (the round-5 raw ≥3-SFC form is CORRECTED — it storms 23 false-positives across the shadcn compound-component families on the settled flatten):
```
complex := (sfcCount ≥ 3  AND  hasMachinery)
        OR  subComponentWithOwnMultiFileDir
        OR  rootLineSum > ~1200        # ROOT-only (depth-1), never recursive
where hasMachinery := a root `use*.ts`/`*Context.ts`  |  a `composables/` dir
                    |  `constants.ts` or a `constants/` dir  |  a `shaders/` dir
                    |  a root `.frag`/`.vert`/`.glsl.ts` shader
```
- **Why the machinery-gate (evidence).** Run raw over the 91-family flatten, the ≥3-SFC arm flags 24 complex-no-README dirs — 23 are thin reka-ui forwarder compounds (dropdown-menu 14 SFC, context-menu 12, select 10, card 9, …) where many-tiny-SFCs IS the idiom; forcing 23 ceremony READMEs violates the aristotelian no-excessive-granularity edict on the documentation axis. Gating the SFC arm on internal machinery suppresses 20 pure forwarders → the refined count is **24→4**: the four survivors (`configurator` useConfiguratorState, `carousel` useCarouselWorm+composables/, `drawer` useDrawerSnap+constants.ts, `progress` useProgressGeometry) each carry a real engine and are genuinely feature-grade. configurator STAYS born-RED.
- **The line-sum + recursion arms stay UNCONDITIONAL** (the safety net). `timeline` (6 SFC, no machinery — geometry.ts/types.ts are plain helpers) is NOT caught by the machinery-gated SFC arm but IS caught by the unconditional `2274 > 1200` line-sum arm. Line-sum is measured ROOT-only (depth-1) — a recursive line-sum would penalize good colocation (a fat `composables/` subtree); the smell is a fat ROOT.
- **The trigger closes a WHOLE-contract coverage hole, not merely a doc-nag.** Three of the four caught dirs ALSO red on the composable-at-package-root clause (configurator/useConfiguratorState.ts, carousel/useCarousel.ts, progress/useProgressGeometry.ts) — the current gate is blind to all three because the dirs aren't targets. The trigger's remediation is therefore NOT "add a README" alone: configurator/carousel/progress ALSO relocate their root composable under `composables/` (and configurator wants a `constants.ts` home) — concrete BH build-engine wave items.
- **The recursion arm has ZERO live positives** across all 91 families — it is pure recursion-support that ONLY the self-test guards, so the self-test bite is load-bearing. The self-test is enriched for the machinery-gate: a synthetic ≥3-SFC-NO-machinery dir MUST NOT flag (the shadcn-suppression bite); a ≥3-SFC-WITH-machinery dir MUST flag; plus the SFC boundary (==3 complex, ==2 not), the line-sum boundary (==1200 not, +1 complex), and the circularity-target assertion (a complex-no-README dir IS a target).
- **Open calibration (recorded, not a blocker).** The `card`/`toast`/`dialog`/`select` boundary (9 SFC / 798 root-ln / NO machinery, currently suppressed): whether a secondary line-floor on the SFC arm — `sfcCount ≥ 3 AND (hasMachinery OR rootLineSum > ~700)` — should catch these large-count no-machinery compounds is the one live aristotelian call. Recommend the machinery-gate-only form for 5.0.0 (a thin forwarder compound is navigable by its barrel); revisit if a reviewer finds a suppressed compound un-navigable.

**The `lib/` segment** holds a component's PURE/MIXED domain helpers (matches backend §5.1 and product §4P.1 — ONE segment vocabulary). Per T4, a SINGLE separable helper stays a ROOT SIBLING; `lib/` is earned by the 2nd.

**The `styles/` segment (T4-consistent).** A single colocated cascade sheet stays ROOT SIBLING `components/<n>/<n>.css`; `styles/` is EARNED by a multi-partial family (dock's top sheet + its 17-partial `dock/` subdir). The build walk (§2.6) globs BOTH forms.

**The barrel-only rule + the deep-leaf exemption + TWO barrel preconditions.**
- **Precondition A — `sideEffects` declared.** glass-ui `["*.css"]`; siblings declare NONE (audit, G8). An app declares the array form `["**/*.css","*.css",…explicit bare-registration imports]` — never blanket `false`, never glass-ui's flat `["*.css"]`.
- **Precondition B — barrels are PURE RE-EXPORT-ONLY.** No `export const/function/class/default` shares a barrel with `export … from`. Own consts/CVA live in a SIBLING, re-exported through the barrel — BOTH a Rolldown/Vite-8 requirement (#21966, OPEN + unfixed) AND a colocation-clarity win. It binds glass-ui itself — NINE barrels:
  - the 8 mixed CVA barrels (alert/avatar/badge/button/sheet/slider/toggle + custom/toggle-chip) un-mix to `variants.ts` + pure barrel;
  - `composables/color/index.ts` (own=9 value.js-backed functions + 2 `useAccentTone` re-exports; ALSO the `/color` subpath entry, so NOT covered by the pure-re-exporter exemption) un-mixes to a colocated `core.ts` + pure barrel.
  - The CLAUDE.md "CVA variants co-exported from each index.ts" convention is SUPERSEDED (clean break, edict 7). `proof:barrel-pure` runs on glass-ui AND the Vite-8 siblings.
  - **The color un-mix is the ONE case with real graph impact — +1 JS chunk (190→191), a granularity change whose downstream DCE benefit is UNPROVEN, byte-impact unmeasured.** The prior "already reached by border-progress → budget-neutral" citation is CORRECTED: border-progress reaches color-core ONLY via a deliberate DYNAMIC `import("./spectrum-walk")` code-split boundary (`useBorderSpectrum.ts:88`, BC.W-AX-BP-LAZY) — NOT a static reach (aurora/blob DO reach it statically). `composables/color` IS the value.js color-math leaf three gates fence off the eager first-paint path, so the ATOM-A close battery MUST add `proof:bp-lazy` + `proof:vueuse-free-root` + `profile:budget` (critical-path arm) — the sub-wave gates what it touches (§3). Re-run `profile:budget` as a per-chunk BASENAME-keyed DIFF at the cut (isolating the un-mix delta against the pre-existing HEAD red), NOT an absolute pass. The 8 CVA barrels are fully chunk-neutral (190→190). CSS golden token-set identical across all forms (§7).

### §2.2 What colocates (the default)
Everything a component OWNS: sub-components, component-local composables, `lib/`, variants, `core.ts`, constants, shaders, skeletons, styles (§2.6), README. A component-specific composable/helper read only by that component must NOT sit in the shared tree.

### §2.3 Recursion
A sub-component that grows its own multi-file structure becomes a nested component root under the parent (or under `sections/`), with its own `index.ts`, local `composables/`/`lib/`, README if complex. Aurora (demo) is the gold standard; each nesting RESETS the depth budget (T2). The `tabs/primitives/` sub-component group (§3) is the executable instance — the raw wrapped reka primitives beneath house `SegmentedTabs`, named by ROLE (`primitives/`), NOT vendor. Executable-confirmed: the flatten yields reka nested at `src/components/tabs/primitives` (`ls -d src/components/*/ = 91`). **`[R6]` None of the 5 tabs primitives carries `<style scoped>`, so their parent-scoped id rotation (`tabs→primitives`) touches ZERO golden CSS** (§7).

### §2.4 The shared tree
`src/composables/` holds ONLY leaves clearing T3. Its sub-trees (`motion/ glass/ dom/ dark/ reactive/ context/ color/`) are the shared homes; the PROMOTE set (§1.5) joins them. `composables/context/` is the DI CONTRACT home — the promote FORCES the context's own domain types into the shared dir (a backward `shared→component` type import would violate the DAG). The Vue-idiomatic `composables/` essence-name is kept; `lib/` is its purpose-named sibling; backend uses purpose-names (§5).

### §2.5 Location vs publish-surface + the 4-node boundary model

TWO axes the current tree conflates: **physical location** (T3, family count) and **publish surface** (SCC/heavy-peer). They do not couple. The boundary model is a 4-node DAG:
```
shared/composables → components → subpath-entries (src/*.ts) → app
```
The curated subpath-entry layer (`src/index.ts`, `src/motion.ts`, `src/dark.ts`, `src/keyboard.ts`, `src/subpaths/*.ts`, `src/api/index.ts`) is the ONLY node EXEMPT from the shared→components prohibition.

| Edge | Verdict |
|---|---|
| subpath-entry → anything | LEGAL (the exempt publish node) |
| components → shared | LEGAL (the UP edge) |
| components → same-component guts | LEGAL |
| components → sibling BARREL | LEGAL |
| components → other-component GUTS | **RED** (promote the shared primitive) |
| ≥2 components → same buried DI-context guts | **RED → promote to `composables/context/`** |
| shared → shared | LEGAL |
| shared → components (plain) | **RED** (the DAG prohibition) |
| shared → components via `export *` aggregator barrel | LEGAL (the ONE standing instance: `composables/index.ts → infinite-scroll/composables`) |
| any → subpath-entry | **RED** (the publish layer is the sink) |

Self-test 11/11 incl. the DI bite.

### §2.6 Styles / CSS — PHYSICAL colocation, PROVEN dev+HMR+byte-identical-dist

Component-SPECIFIC CSS in the GLOBAL `src/styles/` tree is a colocation miss vs SOTA (Vuetify colocates `VBtn.sass`). Approach (i) — the file-move + widened build-walk — is PROVEN end-to-end on a running demo dev-server; the Vite-dev-alias option is DROPPED (dominated).

**Placement is T4-consistent.** A CLEAN single-owner family's cascade CSS colocates PHYSICALLY:
- **single sheet → ROOT SIBLING** `components/<n>/<n>.css` (~10 families: border-progress, drawer, select, sheet, completion-seal, hover-popover, floating-panel, card-scroll, glass-refract, cards).
- **multi-partial → `components/<n>/styles/`** carrying the top sheet + its own-subdir partials (dock keeps its 17-partial `dock/` subdir INSIDE its colocated `styles/`; tabs, instrument-chassis, configurator).

`src/styles/index.css` — the SINGLE inter-component cascade authority, staying GLOBAL — rewrites each moved `@import` to the honest on-disk SOURCE path.

**The MODULE-vs-COMPONENT placement criterion, DECIDABLE (the ≥2-family CSS test).** A cascade sheet colocates IFF it is a SINGLE-OWNER sheet (exactly one family reads its rules); it STAYS in `src/styles/` IFF it is a cross-family SHARED register (≥2 unrelated families):
- **Colocate** (single owner): dock, select, sheet, drawer, border-progress, completion-seal, hover-popover, card-scroll, glass-refract.
- **Stay module-level** (cross-family shared register): `menu.css` (5 picker families), `feedback-tone.css` (Toast/Notification/Alert), `floating-panel.css`, `cards.css` (the `paper-texture`/`cartoon-surface` `@utility`), plus the genuinely-global cascade (token cascade, the 5-rung glass ladder, typography, theme, `utilities.css`, `paper.css`, `animations.css`, `transitions.css`). `icon-chip.css` (the SOLE cross-global `@import`) STAYS DOCUMENTED-OWNERSHIP (`README OWNER:` + `proof:css-ownership`).

**The build-transform copy-UNIT + the widened walk, EXECUTED byte-identical.** A build-transform (2 fns appended to `vite.style-fold.ts`) walks the colocated cascade CSS, copies it into a FLAT `dist/styles/`, then flattens the shipped `dist/styles/index.css` @imports. Verified: `diff -rq golden dist/styles` EXIT 0; 106==106 files; `dist/styles/index.css` sha `675249ea` IDENTICAL golden==new; rebuild-vs-rebuild diff EXIT 0. The copy UNIT is the component's cascade CSS SUBTREE:
- a root-sibling `components/<n>/<n>.css` — copied whole;
- a `components/<n>/styles/` SUBTREE — copied WHOLE via ONE `cpSync(dir, dist, {recursive:true})` (dock's 17 partials are `dock.css`-referenced relative @imports, NOT `index.css`-referenced; copying only the top sheet strands them and silently drops the entire dock `@layer components` cascade).

**The glob is ANY-DEPTH (the recursive-colocation edict).** The walk globs `src/components/**/*.css` MINUS `**/styles/**` (any-depth single sheets — catches a 2-level nested `timeline/continuous-rail/continuous-rail.css` a one-level glob MISSES) UNION `src/components/**/styles/` (multi-partial subtrees). The two globs are STRUCTURALLY DISJOINT, proven three ways (real-tree basename-intersection EMPTY; a synthetic same-component ambiguity fires born-RED EXIT 1; a synthetic cross-glob target collision fires born-RED via a claim() map).

**The index.css @import DISCIPLINE (the demo-HMR constraint).** `demo/demo.css:108` does `@import "../src/styles/index.css"` (the SOURCE cascade, for HMR). So `src/styles/index.css` @imports MUST resolve at SOURCE (`@import "../components/dock/styles/dock.css"`, all verified on disk); the publish WALK flattens them to `./dock.css` for dist (regex `@import "../components/[^"]*/([^"/]+\.css)"` → `./$1`). The walk is `cpSync + gather + index-rewrite`, NOT a pure cpSync.

**TWO colocation classes need distinct build routing.** (a) an SFC-scoped `<style src>`-extracted file (T1b) rides the SFC fold pipeline into `dist/glass-ui.css` and is SKIPPED by the cascade walk (an un-predicated walk ships it TWICE, breaking scoping); a HARD `proof:css-colocation` assertion. (b) a NON-scoped cascade partial (dock/, tabs/) is copied by the walk.

**The rulings:**
1. The ~14 CLEAN single-owner families colocate PHYSICALLY (single-sheet → root sibling, multi-partial → `styles/`). Extracted SFC scoped styles (T1b) land as `<style src>` siblings. Machine-locked by `proof:css-colocation` (§6 G6).
2. `icon-chip.css` STAYS DOCUMENTED-OWNERSHIP.
3. Genuinely-global cascade + the cross-family shared registers stay in `src/styles/`.
4. `index.css` remains the SINGLE INTER-component ordering authority — the @layer + source-order ties are INVIOLATE. Cascade-ORDER = global; file LOCATION = colocation.

**`[R6]` This is CSS-COLOCATION, ORTHOGONAL to the flatten, and it SPLITS into B1 + B2 — with the reader-corpus corrected.**
- **B1** = file-move + widened-walk + colocated-source @imports + walk-flatten (byte-identical, mechanically trivial, PROVEN).
- **B2** = the GATE reader-corpus re-point + a corpus-root WIDEN. The round-6 adjudication REPLACES the round-5 "locator-leaf DEFER" (see §7 R6-2 + §9.6) with the MECHANICAL rewrite plus a shared corpus-root constant:
  - **(i) mechanical per-family path/specifier re-point.** Every gate hardcoding a MOVABLE component-CSS `src/styles` path (path-const + `@import`-specifier regex + self-test fixture + cosmetic message) re-points to the colocated path. Measured over the 3-family mover slice: **17 edit sites across 8 gates** (border-progress 4, completion-seal 5, configurator 8) — corroborating the ~21-hardcode/13-gate order of magnitude. The blast radius is a ONE-TIME bounded codemod: **238 path-const line-sites total, 176 of them the DOCK family** (133 `dock/` partials + 26 `dock.css` sites + 17 `dock-controls`) = ONE uniform `src/styles/dock/ → src/components/dock/styles/dock/` pass verified by the ~50 dock gates; the non-dock remainder is 62 path sites + ~15 specifier sites across 39 gates, each family carrying its OWN gate that goes born-RED (path ENOENT) → GREEN after re-point. After 5.0.0 the paths are STABLE — no recurring maintenance for an indirection to amortize.
  - **(ii) the shared CORPUS-ROOT constant WIDEN (the sound factoring, replacing the rejected locator leaf).** The genuine correctness hole is that FOUR tree-walkers root on `walk("src/styles")` ONLY and, post-colocation, develop a blind spot (a layout-animation planted in the moved `dock/morph.css` would ESCAPE `proof:no-layout-animation`): `proof-ba-animate.mjs`, `proof-motion2`, `proof-motion-demo`, `proof-affordance-map`. **`[R6]` The round-5 "5 tree-walkers" is CORRECTED to 4** — `proof-no-layout-animation.mjs:286` ALREADY walks `src/components/**/*.css` and does NOT regress. Adopt a shared `scripts/lib/style-corpus.mjs` exporting `STYLE_CORPUS_ROOTS = ['src/styles', 'src/components']` (with a `.css` filter), imported by the 4 blind-spot walkers AND by the build's `cpSync`/`readdir` widen — closing the blind-spot in ONE seam instead of 4. This is the CSS analogue of the already-shipping shared scope constants (`no-masking-manifest.mjs` `scope:'src/styles/dock'`, `gates.manifest.mjs`) and the SOTA-idiomatic factoring (ESLint flat-config glob `files:[...]`, stylelint `**/*.css`, Vite `@import`-graph resolution — never a hand-maintained component→path map). `gates.manifest.mjs` and `no-masking-manifest.mjs` hardcode `src/styles/dock/*` and also update in the same pass.
- Without B2 the close is RED on ~81 gates. Gated by G6 (golden token-set + parentDir/basename-key precondition) + `proof:css-colocation` (+ its SOURCE-reader-gate arm + the corpus-root widen assertion) + `proof:css-ownership`.

---

## §3 VERDICT — flatten `components/ui` + `components/custom`

**FLATTEN to a PURE FLAT namespace.** Merge into ONE `src/components/` of domain-organized per-component folders as flat peers — **NO physical sub-tier**. Domain grouping is VIRTUAL: a machine-locked `components/README.md` domain-map. No provenance tier, no dead markers. Settled (edict 5), executable, re-PROVEN GREEN end-to-end at LIVE HEAD: `codemod-flatten.mjs` rewrote 358 src + 211 demo/tests specifiers → 91 flat family dirs; typecheck 0; `vite build` produces EXACTLY 190 JS chunks; `proof:subpath-classify` returns EXACT_REPRODUCTION=true with `package.json` BYTE-IDENTICAL to pristine; 94/94 subpaths resolve.

### The evidence (unanimous for owned libraries)
Every library that OWNS its components keeps flat peers, no vendored-vs-house tier: reka-ui (~78 flat + `shared/`), Base UI, Ark UI (~70 flat), PrimeVue (80+), Vuetify. The two-tier is EXCLUSIVELY a shadcn-CONSUMER pattern whose sole rationale — protecting vendored copies for `npx shadcn add` re-pull — is DEAD here (glass-ui's `ui/` is ~100% forked). Sharper: 6 `ui/` components already reach UPWARD into `custom/` (and 10 `custom/` reach into `ui/`). The boundary encodes NO architectural invariant — it is provenance sediment.

### The viz DROP — PURE FLAT, not a physical sub-group
DROPPED for four converging reasons: (1) the `≥5 non-adjacent members sharing a register` trigger is non-discriminating (fires equally for forms(13)/overlays(9)/feedback(8)); (2) a physical `viz/` dir mis-targets 83 gate scripts under uniform `dropSegment`; (3) an 81-flat-+-1-nested grammar reads arbitrary; (4) the README domain-map already does the navigation.

**The viz DOMAIN survives — virtually — with a DECIDABLE, SELF-MAINTAINING membership authority.** The discriminating signal is the LIVE `useGpuSubstrate` import edge ∪ {goo-filter rider} = EXACTLY 9 families (aurora, concentric, constellation, dot-flow-field, dot-matrix, fourier-field, goo-blob, liquid-grid, + goo-filter). The gate's AUTHORITY is the IMPORT EDGE computed on disk, NOT `PROCEDURAL-SUITE.md`'s prose — so a new viz auto-enrolls the moment it imports the substrate.

**The FAMILY vs DOMAIN distinction is ENCODED (the SSOT-drift correction).** `PROCEDURAL-SUITE.md` enumerates the procedural-suite FAMILY (a SUPERSET — it lists `watercolor-dot`, no drawing context, not a substrate importer) and is STALE by 3 members. So: the domain-map gate DERIVES viz membership from the substrate edge ∪ {goo-filter} (the 9), NOT the SSOT roster; `watercolor-dot` is tagged `mark`/family (recorded rationale); the SSOT reconcile (`paper-grid`→`liquid-grid`; mark `watercolor-dot`) is a BG-owed MIGRATION PRECONDITION, the gate born-RED on the 3-member drift by design.

### The final tree shape — COMMITTED
DEFAULT is FLAT + a gated `components/README.md` domain-map enumerating ALL families, each ONE-LINE entry naming its virtual domain (viz / form / overlay / feedback / mark / …). The domain-map's freshness is TWO-TIER: the GATE checks COMPLETENESS (dir-list == rows) + viz-DOMAIN membership (import-edge-derived); non-viz domain TAGS are ADVISORY human annotations (a stale non-viz tag is a doc nit, not a gate failure). The flatten's #4 justification STANDS regardless — reka-ui/Ark/PrimeVue ship flat with NO map, so glass-ui flat + a completeness-gated map is strictly MORE navigation aid than the SOTA reference.

**Tier-root LOOSE (non-family) files are a DISTINCT codemod case.** `_shared/` is domain-map-EXEMPT. `PROCEDURAL-SUITE.md` (a loose doc at `custom/`) re-homes to `components/` root (absorbed by the domain-map, no row). A loose test file at a tier root needs move + specifier-RECOMPUTE (a plain family-dir dropSegment leaves its `../../../src` imports overshooting root). The codemod enumerates every tier-root loose file (§7 ATOM-A 5b).

### The count arithmetic (recomputed round-6, STABLE)
- **92 family-dirs − 1** (`ui/tabs` folds into `components/tabs/primitives`) **= 91 top-level component dirs** (`ls -d src/components/*/ = 91`).
- **`_shared/` is domain-map-EXEMPT**, leaving **90 barrel-bearing families, ALL flat peers** (the 9 viz members grouped VIRTUALLY in the README).
- The dead `ui/index.ts` aggregate barrel (0 real importers) is a FILE that is DELETED, not a family subtracted.

### The reshape — the TWO-ATOM decomposition

**ATOM A — the FLATTEN ATOM (re-PROVEN GREEN at live HEAD).** Must land atomically for G7. Internal sequencing:
1. **`[R6]` Adopt the GLOBAL parent-scoped `componentIdGenerator` FIRST + rebaseline the golden `/styles` token-set + byte hash once** (§7 — the config change that makes every subsequent move scoped-token-set-neutral; the golden gate is EXECUTED born-RED→GREEN as the witness).
2. **glass-ui 9-barrel un-mix** (8 CVA → `variants.ts`; `composables/color` → `core.ts`; each `index.ts` a PURE barrel — the proto-1 slider pattern; `<style>` blocks UNTOUCHED). The MINIMAL barrel-preserved form is CHOSEN (same-family SFCs keep `import from '.'`; ZERO `.vue` edits) — generator-independent.
3. **src recompute** — `newSpecifier = normalize(relative(elide(dirname(F)), elide(resolve(dirname(F), S))))`; `elide` is a UNIFORM segment-drop `components/(ui|custom)/X → components/X`. ~568 flatten-VARIANT specifiers recompute; the ~1218 invariant re-emit byte-identical.
4. **demo + tests segment-drop** (521 specifiers, alias UNTOUCHED) + the tests-DIRECTORY flatten (`tests/components/{ui,custom}/X → tests/components/X`, uniform) + 12 fixture-gate re-points.
   - **5b — TIER-ROOT LOOSE files are a DISTINCT move+recompute case:** `custom/PROCEDURAL-SUITE.md` → `components/` root (loose doc, no row); a loose test file → move AND specifier-RECOMPUTE. Enumerate every tier-root loose file (docs + tests + fixtures).
5. **scripts codemod — ONE UNIFORM ALL-TEXT-RECURSIVE `dropSegment` over ALL 229 files PLUS TWO semantic reconciles.**
   - The uniform pass is ALL-TEXT-RECURSIVE over `scripts/` (229 files, NOT the 218 `.mjs` — the 11 `wf-ay-*.js`/subdir-`.mjs`/`.vue`-fixture files must be covered or G7 stays RED). EXCLUDE only `subpath-policy.mjs`.
   - **Semantic reconcile 1 — `subpath-policy.mjs` two-set merge.** A `readTree` PARTITION of ONE flat `dirsWithIndex('src/components')` read, split by `classMap` membership (`CLASS = {...UI_CLASS, ...CUSTOM_CLASS}`, custom-wins → `tabs=PUBLISH`), preserving the `{ui,custom,composable}` `readTree` contract. Verified EXACT_REPRODUCTION=true.
   - **Semantic reconcile 2 — the DEAD-BARREL GATE-RECONCILE (3 gates).** `proof-tabs-std.mjs:95` LIVE-READS the deleted `ui/index.ts` barrel → RETIRE the vacuous ui-barrel-read assertion, KEEP only the `tabs/primitives` internal-keep witness (re-point to `src/index.ts` + `tabs/primitives`). `proof-consumers-static.mjs` + `proof-component-orphan.mjs` carry the barrel path only as list/skip STRINGS → PRUNE.
6. **`ui/tabs → tabs/primitives` override** (a one-entry override BEFORE the uniform drop; `components/tabs/` holds `SegmentedTabs.vue` + `composables/` + `constants.ts` + `variants.ts` + `index.ts` + `README.md` at root, `primitives/{Tabs.vue,…}` nested; `DockLayerGroup` repaths).
7. **The dead `ui/index.ts` aggregate barrel is EXPLICITLY DELETED** — `unlink` + `rmdir` the emptied `ui/`/`custom/` shells; assert `no surviving src/components/{ui,custom}` (a codemod that SKIPS the unlink leaves `ui/` non-empty → `rmdir` fails → the post-condition THROWS — confirmed load-bearing).
8. **config + docs: adopt the parent-scoped `componentIdGenerator`** (§7) + sweep stale `components/(ui|custom)/` prose from READMEs + CSS comments (edict-8), INCLUDING `src/index.ts:118` `components/ui/tabs/*` (a doc-comment outside G7's `scripts/` scope, owed a hand-sweep).

- Close battery: G7 + the DIFFERENTIAL resolves-on-disk floor + `proof:subpath-classify` + `proof:build` + the 12 fixture gates + the tier-root-loose-file recompute + the dead-barrel post-condition + `proof:barrel-pure` (glass-ui GREEN, 0 mixed) + `proof:bp-lazy` + `proof:vueuse-free-root` + `profile:budget` (critical-path arm, per-chunk basename-keyed DIFF) — the value.js-fence gates the `composables/color` un-mix touches.

**ATOM B — the CSS-COLOCATION ATOM (§2.6). SPLIT into B1 + B2.** Orthogonal (`src/styles` untouched by A). Sequenced AFTER A.
- **B1 (byte-identical, PROVEN):** file-move + widened-walk + colocated-source @imports + walk-flatten-rewrite.
- **B2 (the load-bearing migration cost):** the per-family path/specifier re-point + the CORPUS-ROOT constant widen (§2.6, R6). Without B2 the close is RED on ~81 gates.
- Gated by G6 (golden token-set + parentDir/basename-key precondition) + `proof:css-colocation` (+ SOURCE-reader-gate arm + corpus-root widen) + `proof:css-ownership`.

- **Domain map** lives in a MACHINE-LOCKED `components/README.md` enumerating ALL 90 families; viz membership DERIVES from the `useGpuSubstrate` edge ∪ {goo-filter}, `watercolor-dot` tagged `mark`. No provenance markers. Export surface stable (package.json `exports` untouched, 0 keys); INTERNAL churn large.

### The residual proportion pass the flatten enables
- `timeline/geometry.ts` STAYS a ROOT SIBLING file (T4). A 2nd helper earns `timeline/lib/`.
- `configurator/`: `useConfiguratorState` (subpath-exported STATE factory) STAYS — **`[R6]` but relocates under `configurator/composables/` and gains a README (the complexity trigger's remediation, §2.1).**
- 500-breachers carve by cohesion (ORTHOGONAL, delta=0), CEDED to their owning BG waves: `GlassDock.vue` 515 (T1c), `DockLayerGroup.vue` 524 (T1c script-axis), `useGlassBackdropLuminance.ts` 554 (plain-composable base carve).
- `labeled-field`'s 5 wrappers collapse to one generic + typed slot.

---

## §4 The demo/application grammar

TWO archetypes on ONE feature-slice spine — **§4-STORYBOOK** and **§4-PRODUCT** — the same `component-folder + local-until-shared + recursion-resets-depth` grammar, differing only in the top-of-tree layers a router-driven app earns. §4-PRODUCT is ~85% a description of speedtest's live tree.

### §4-STORYBOOK — the story archetype
```
<app>/
  App.vue · main.ts · router.ts
  shell/                       # app chrome (AppShell + nav docks + shell composables + shell CSS)
  chassis/                     # demo-private PRESENTATION primitives (content COMPOSES)
    subtype/                   # the closed presentation-subtype taxonomy (§4S.4) — WHEN EARNED
  stories/
    <category>/
      <story>.vue              # a manifest row (kebab-case)
      _shared/                 # category-scoped chassis (≥2 stories, one category)
      <story>/                 # per-story dir for PRIVATE (1-consumer) helpers
    manifest.ts                # the single SSOT wiring stories → routes → nav
```
**Colocation ladder:** story-PRIVATE → `stories/<cat>/<story>/`; category-SHARED → `stories/<cat>/_shared/`; CROSS-category → `chassis/`; app-GLOBAL → `shell/` or root. **The closed subtype taxonomy** (stage/specimen/interaction/matrix/composition) mints in `chassis/subtype/` ONLY above a complexity floor (≥~20 stories OR ≥2 categories); glass-ui's rich demo earns it, slides' thin deck does not. **God-SFC escalation:** a story tripping the ratchet becomes a feature dir (aurora model); `blob.vue` 875 + `constellation.vue` 759 → feature dirs (T1b→T1c compose). **Barrel-vs-deep-path:** deep-path for demo-private; index barrel for anything a sibling app consumes.

### §4-PRODUCT — the router/store/backend-bearing consumer app

The consumer app is the STORYBOOK mirrored across the router boundary: `stories/`↔`views/`, `chassis/`↔`components/`+`features/`, `shell/`↔`App.vue`+`layouts/`.
```
<app>/src/
  bootstrap · App.vue · router(.ts | /)
  views/<Name>View.vue                     # route-BOUND compositions (one per router record)
  layouts/                                 # route-frame chrome that wraps <RouterView>
  features/<domain>/                       # proportion-EARNED domain slices (§4P.5)
    ui/ state/ api/ engine|lib/ composables/  index.ts
  components/<domain>/                      # UNgraduated domain groups + shared app UI
  stores/  api/  config/  composables/  lib/  types/  utils/  styles/
<app>/server/ | backend/ | functions/ | workers/   # the peer backend workspace (§5, NOT under src/)
```

- **`§4P.2` `views/` is the canonical route-layer name** (recorded FSD divergence — FSD's is `pages/`); holds route-BOUND compositions ONLY, NEVER domain logic. Clean-break: no `pages/` alias. `views/` NEVER folds.
- **`§4P.3` router FILE→DIR by T4** — `router.ts` until it EARNS `router/` (index + guards + `typed-routes.d.ts` + ≥2 route modules).
- **`§4P.4` The `api/` FE transport-leaf infra-ring** — ONE `client.ts` + per-resource modules + `types.ts` + explicit re-export `index.ts`; UNIDIRECTIONAL `views/ → stores/ → api/ → client.ts`. speedtest SHIPS `scripts/check-internal-boundaries.mjs` — the exact §4P.4 product 4-node-DAG gate (TIER-1 top-level layers + TIER-2 intra-feature `ui→{composables,state}→engine`; `FEATURE_LAYERS={ui,state,engine,composables}`; baseline GREEN, 15 rules) — the machine precedent the product-DAG gate transposes.
- **`§4P.5` The domain-graduation predicate.** A domain is a `components/<domain>/` GROUP by default; it GRADUATES to a full `features/<domain>/` slice via EITHER branch:
  - **The HARD branch (decidable):** presence in ≥3 of `{components/, stores/, api/, composables/}` (`views/` REMOVED from the trigger). Use EXACT-stem matching for the top-level scatter detector — `base === domain || base === domain+'s' || a stores/<domain>/ or api/<domain>/ dir` — never a loose `base.includes(domain)` substring (which over-counts on domain-name substrings, e.g. a `dash` domain matching `dashboard`).
  - **`[R6]` The SOFT branch — DECIDABLE (the colocated feature-shaped-interior criterion, replacing the round-5 honest soft-note).** A `components/<domain>/` GROUP graduates via the soft branch when its COLOCATED interior already carries **≥2 DISTINCT by-purpose logic segments from `{composables/, engine/, state/, lib/}`** — each a dir with ≥1 non-`index` `.ts` and **0 SFCs** (an SFC-bearing colocated dir like `dashboard/charts/` is a sub-COMPONENT group, NOT a segment) — with `utils/`+`helpers/` NORMALIZED to `lib/` and `hooks/` to `composables/` (the §5.1 alias-normalize precedent). The `≥2` is the standing earned-by-the-2nd proportion (T4/§4P.1/§5.1), NOT a survey-tuned constant. **`api/` is EXCLUDED** from the soft set (it is the HARD-branch top-level signal — branch orthogonality; the two branches count DISJOINT locations, so no double-count). Below `≥2` the domain stays a GROUP.
    - **Semantic alignment (why this is the elegant form, not a workaround).** At ≥2 by-purpose segments the `components/<domain>/` interior is ALREADY organized like a feature interior (the §4P.5 `ui/state/engine/composables/lib` grammar), so promoting it to `features/<domain>/` is a RENAME of an already-feature-shaped interior, not an inflation. The segment set is the spec's OWN feature-interior vocabulary (the FSD slice-segment model already cited).
    - **Born-RED→GREEN witness (executed).** speedtest @ HEAD: `admin` (hard=3 → HARD), `dashboard` (hard=3 → HARD), `survey` (hard=2 [components+api] + soft={composables,lib}=2 → **SOFT**) — all three MEET the predicate but live at `components/` → 3 RED violations; simulating the fold to `features/{admin,dashboard,survey}` → 0 = GREEN. survey's branch is COMPUTED (softSegments≥2), not annotated.
    - **The non-overfit witness is a DIFFERENT repo.** words/frontend's `definition` domain has survey's EXACT shape (hard=2, soft=2) in a different repo — a second, independent, unambiguously feature-grade domain matching the criterion proves it is not tuned to survey (words `search`/`wordlist` graduate via hard+soft). The proportion fence holds: slides has NO `components/` domain dir → 0 graduating domains (the criterion never forces slides to grow feature dirs).
    - **The predicate CHAINS into the boundary gate (§9.10).** Making survey's graduation a machine FACT triggers the born-RED on `components/survey/composables/useSurveyFlow.ts:12-13` (`import { variant } from "../SurveyStep.vue"` + `"../SurveyReview.vue"` — two SFC-EMBEDDED `export const variant`): under `components/` this is legal; after graduation the intra-feature stack makes a `composables → ui` (SFC) import a BACKWARD edge `check-internal-boundaries.mjs` born-REDs. The graduation MOVES the const OUT of the SFC into a colocated non-SFC module (`features/survey/constants.ts` or a component-folder `index.ts`) — the same clean-break discipline; the boundary gate runs born-RED before greening, confirming the boundary is HONEST.
    - **Rejected refinement (recorded).** A line-mass/module-count floor on the soft-segment threshold (to guard "2 trivial segments") reintroduces a tunable magic number and overfits; the pure topological ≥2-segment form reuses the existing earned-by-the-2nd constant. Ship the pure form.
  - **The feature-interior unifying rule (proto-3).** The feature INTERIOR obeys the 500 ceiling identically. **A drain-tripping feature-interior SFC (a bare `ui/` SFC needing a T1b/T1c drain, its own `skeleton/`, or its own `styles/`) PROMOTES to a component-folder-with-index INSIDE the feature's `ui/`** — `ui/<Name>.vue` → `ui/<Name>/{<Name>.vue, index.ts, styles/…, skeleton/…}`. This closes THREE collisions in ONE rule: (a) the double-breach drain gets a dir for T1b's extracted CSS; (b) `state/engine/` and `ui/styles/`/`ui/skeleton/` no longer trip G3 (the segment is under a component root, which RESETS the depth budget); (c) the feature-`ui/`-segment vs component-`styles/`-segment grammars UNIFY. The carve owner is the APP, not glass-ui.
  - Live targets (speedtest): `admin`/`dashboard` (hard, ≥3) + `survey` (soft, decidably 2+2) GRADUATE; `speedtest` ALREADY graduated. `features/` is proportion-EARNED, NOT mandatory (slides has none). Fold `survey` FIRST (cheapest, soft-branch, now a gate output) to confirm typecheck + boundary gate + per-route bundle delta green before born-REDing admin/dashboard.
- **`§4P.6` The Pinia T3 split** — a ONE-feature store lives at `features/<x>/state/`; a ≥2-unrelated-family store promotes to app-global `src/stores/`; a domain CLUSTER gets `stores/<domain>/`; plugins get `stores/plugins/`. One store per file. **The graduation PULL-SCOPE is the T3 count:** a graduating domain's SINGLE-CONSUMER resources (store, `api/<domain>/`, composables) MIGRATE INTO the feature; a resource read by ≥2 UNRELATED families STAYS app-global by the SAME count — resolving "feature-local store" vs "`stores/<domain>/` cluster" (the count decides). The `api/` DAG stays unidirectional (a pulled-in single-consumer transport module is INSIDE the feature).
- **`§4P.6b` The shared-app-UI home.** Top-level shared app CHROME that is neither domain-member, route-bound, nor a feature (speedtest's `Dock.vue` 774, `AppSettingsButton`, `CellularWarningDialog`) lives at `components/` root as a FLAT component-folder-with-index — the same atomic unit as any family — and a 500-breacher there drains by the SAME T1b/T1c rule. NOT dissolved into `App.vue`/`layouts/` (those are route-frame chrome). No new archetype.
- **`§4P.7` `styles/` is the app-global design-layer name** — speedtest's `design/`→`styles/`; `MOTION-DOCTRINE.md`→`docs/`.
- **`§4P.8` `config/` is the presets-in-consumers home** (file→dir by proportion).
- **`§4P.9` NO root-shell god-SFC exemption — App.vue OBEYS the 500 ceiling.** speedtest's 833L drains by T1b→T1c compose: T1b (`<style>`+docblock → `./App.css`, non-scoped) leaves 550; T1c carves `AuroraBackdrop.vue` + `useMockResultsGate.ts` → residual 301. The anti-gaming clause: 64% comment — the drain is STRUCTURAL, comments NOT stripped. slides' 7-line `App.vue` is the target.
- **`§4P.10` `layouts/`** app-global route-frame chrome; cross-cutting → `src/layouts/`, NEVER colocated into a feature.
- **`§4P.11` The entry pair** — the BOOTSTRAP CONCERN (`createApp` + install + mount) + a thin root `App.vue`. speedtest has NO `main.ts` (inline in `index.html` for LCP — legitimate). The gate asserts the concern, never a filename.
- **`§4P.13` The per-sibling migration instrument.** Each SIBLING authors its own instrument from the SHARED repo-agnostic FORMULA (§7), binding its own alias set + graduation renames. G8 propagates the FORMULA + gate scripts; the per-repo alias namespace is repo-local. The per-repo barrel-purity figures are HEAD-SENSITIVE — run `proof:barrel-pure` read-only over each sibling at the cut:

| Repo | `sideEffects` to add | barrels to un-mix (RECOMPUTE at cut) |
|---|---|---|
| **glass-ui** (Vite 8) | already `["*.css"]` (keep) | **9** (8 CVA + `composables/color` → `core.ts`) |
| speedtest (Vite 8) | `["**/*.css","*.css","src/components/dashboard/charts/echartsInit.ts"]` | 1 (`features/speedtest/state/index.ts`) |
| words/frontend (Vite 8) | `["**/*.css","*.css"]` | 6 (`api/index.ts` priority) |
| slides (Vite 7) | `["**/*.css","*.css"]` | 0 (clean) |
| sci-report (via @mkbabb/atlas) | `["**/*.css","*.css"]` (verify atlas honors it) | 0 (clean) |

**The proportion fence (edict 2):** do NOT force slides/sci-report to grow feature-dir barrels for uniformity — mandating barrels there is the needless-encapsulation vice.

---

## §5 Backend transposition (language-abstracted)

### §5.1 The grammar (identical shape to frontend)
- **Domain/feature PACKAGE** = the backend component folder. Named by DOMAIN, not technical layer.
- **By-PURPOSE segments:** `api/` (routes/handlers), `model/` (domain types/data/rules), `lib/` (pure helpers). Colocate handler+model+logic FOR one domain TOGETHER.
- **Shared home** (`shared/`, `core/`) ONLY for truly-global (≥2-unrelated-DOMAINS).
- **`[R6]` Reject layer-by-type of DOMAIN LOGIC — the v2 resolver is PROMOTED (proto executed, 12-bite self-test, 4 anti-evasion mutants).** The scatter check runs GENUINELY RECURSIVELY at EVERY dir level (over `walkDirs`, NOT top-level `readdirSync`). The round-5 proto scanned top-level ONLY — false-as-implemented on its own flagship (the nested `api/{routers,repositories,services}/` case invisible; the 47 count matched only because a false-RED on `models/` cancelled 3 false-negatives). The v2 folds:
  - **FOLD 1 — genuine recursion.** `checkLayerByType` iterates `[srcRoot, ...walkDirs(srcRoot)]`. Catches floridify's `api/repositories/` (10 stems), `api/routers/` (11), `api/services/` (4) as 3 nested violations — the +3 pushing 47→49. `api/core/` + `api/middleware/` stay exempt (infra-ring).
  - **FOLD 2 — the DATA-vs-LOGIC split (the shared-types carve made machine-real, arithmetically load-bearing).** `LOGIC_LAYER_DIRS = {services, repositories, routers, routes, controllers, handlers, validation, validators, managers, views}` → born-RED; `DATA_LAYER_DIRS = {models, schemas, entities, dto, serializers, types, structs}` → **WARN, never a violation**. floridify's `models/` (101+ importers) reclassifies from a v1 VIOLATION to a WARN — the −1 that keeps the count at 49 (a naive resolver adding `models` to LOGIC would report 50 and mis-condemn the shared registry).
  - **FOLD 3 — the `core/`-vs-`pipelines/` downward-reach disambiguation.** `PIPELINE_TIER = {pipelines, usecases, orchestration, workflows, sagas}` sits ABOVE the infra ring. An infra-ring file reaching the app edge OR the pipeline tier is an upward leak (advisory WARN). Real evidence: floridify `core/lookup_pipeline.py` imports domains from inside `core/` → 16 upward-leak WARNs (floridify's violation count unchanged; directionality is advisory-strength, matching the proto-4 single-crate Rust finding that a `shared→domain` up-edge COMPILES clean). The unidirectional rule is stated `shared→domain→pipeline→app`.
  - **FOLD 4 — the `integrations/` bucket.** `INFRA_RING += {integrations, adapters, clients, connectors, gateways, providers, external}` — an external-service adapter dir is never counted as domain scatter (a NAMING-CONVENTION exemption by dir-name). A `services/` mixing domain logic + adapters SPLITS: the logic folds into its domain package, the adapters move to `integrations/`.
  - **FOLD 5 — pluralize-normalize.** `normalizeStem()` singularizes before BOTH dir-name matching (`repositories ≡ repository`) AND domain-stem counting (`handlers/{user.py, users.py}` → ONE stem, not ≥2 scatter). (Recorded open: over-singularizes Latin `-us/-is/-sis` nouns cosmetically; does NOT change any target count; a short irregular-plural guard hardens it — ship the naive form, proven count-correct.)
  - **The 12-bite self-test ENUMERATES the new bite-classes per-language** (nested-scatter, data-registry-WARN, and core→pipeline in PYTHON `from ..pipelines` + RUST `use crate::pipelines` + TYPESCRIPT `../pipelines`) — so a top-level-only OR stubbed-per-language resolver cannot pass. Four anti-evasion mutants each drop to 11/12: revert-recursion fails the nested bite, null-rust-import-regex fails the rust bite, force-isData-false fails the data-WARN bite, null-ts-import-regex fails the ts bite.
  - Rebaseline: floridify born-RED **47→49** (41 god + 5 grab-bag + 3 nested `api/`; `models/`→WARN); speedtest/server 4 (genuinely top-level scatter, recursion does not over-fire); dns-speedtest 2 (`utils.py` god + grab-bag); greenfield-rs/pulse GREEN (a real reproduction: domain-vertical packages, infra `core/`, `pipelines/` reaching domains downward = 0 violations + 1 benign `models/` WARN).
- **The infra-ring carve — FIXED constants + the `core/` NAME DISAMBIGUATION.** Scatter threshold: a LOGIC-layer dir holding modules from ≥2 distinct domain stems IS scatter → dissolve; ≤1 stem or purely-infra is not. Infra-ring CRITERIA: (a) cross-cutting, (b) NO single domain's business rules, (c) a thin adapter/kernel/policy, (d) reaches NOTHING downward. RULING: reserve `core/` for infra-ring; the orchestration tier is `pipelines/`; the gate distinguishes by DOWNWARD-REACH. Seed allowlist: `middleware/`, `logging/`, `events/`, transport `core/`/`http/` kernel, uniform repository/model base, `config/`, `paths/`, error/exception policy.
- **The shared-types carve.** A type module read by ≥2 unrelated domains stays a shared registry (WARN, never RED); a ONE-domain type folds in. floridify `models/` (174 importers) STAYS shared. (Recorded open: escalating the data-WARN to a violation when the registry is read by <2 domains would need a cross-module importer scan the gate does not currently run — stays a human-audit WARN.)
- **The orchestration / use-case tier.** A cross-domain PIPELINE lives in `pipelines/`, importing domain barrels DOWNWARD only — NEVER `core/`. The FE twin is `views/`.
- **No grab-bags.** A `utils.py`/`helpers.go`/`common.ts` of unrelated leaves is a god-module.
- **Depth (T2), import discipline, recursion** — identical: unidirectional, no cross-domain imports except via a package's public API.

### §5.2 Per-language befitting notes (per-language NUMBER, constellation-wide GRAMMAR; each a GATED arm §6 G9)
| Language | Module ceiling | Function norm | Idiom |
|---|---|---|---|
| TypeScript (backend) | 500 raw | short, cohesive | ESM subpath exports; `import type`; barrels PURE RE-EXPORT-ONLY; declare `sideEffects`. `proof:*` god-function advisory booked (no ESLint). |
| Python | 500 raw / ~300 soft | Google ~40-line funcs | package = domain dir with `__init__.py` public API; `model.py`/`api.py`/`lib/`; no `utils.py` grab-bag; ruff `C901`/`PLR0915` advisory. `__init__.py`/`__all__` is pure CONVENTION, NOT enforcement — a `_secret` in a non-`__all__` module IS cross-package importable (proto-4, real `python3`); the barrel-only discipline for Python is enforced SOLELY by the G9 gate. |
| Go | 500 raw / package-per-domain | short | one package = one domain; `gofmt`; exported identifiers ARE the public API. **Acyclicity IS a compile invariant** (`import cycle not allowed`) — the strongest seam, the model the FE gate emulates. |
| Rust | 500 raw / module-per-domain | short | `mod.rs`/`lib.rs` re-export = the barrel; `pub` = public API. **Encapsulation IS a compile invariant** (`E0603`). But import DIRECTIONALITY + ACYCLICITY are NOT (proto-4, real `rustc`): a module cycle AND a `shared→domain` up-edge both COMPILE CLEAN in a single crate. So directionality remains a G9(e) gate concern for a single-crate service; only encapsulation is free. |

Live-backend reproduces §5.2: floridify (41 god-module + 5 grab-bag + 3 nested layer-by-type = 49; `wiktionary_parser.py` 1198 largest), speedtest/server 4, dns-speedtest 2, greenfield-rs/pulse GREEN. The A7 backend-reshape wave (dissolving floridify `api/{routers,repositories,services}/` into domain packages) drives the 49 DOWN as the reshape lands — the gate is the born-RED→GREEN witness.

---

## §6 Enforcement — how the `proof:*` gates evolve

The house machine-locks structure (`proof:colocation`, `proof:no-god-module`). The spec EXTENDS them — no parallel regime — and every new gate is a device-free `proof:*` script with self-test bites, NOT ESLint. All FE gates (G1/G3/G4/G6/G7) + the backend gate (G9) are PROTOTYPED in `proto-gates/`, born-RED on HEAD.

**G1 — `proof:colocation` extends (the FOLD end). Register `["local","ci"]`.** KEEP the README-marker binding. ADD the globality clause (T3), the no-empty-segment clause (T4, covering a 1-file `lib/` AND a 1-sheet `styles/`). SCOPE-EXTEND to `demo/`. The dropSegment WIDENS the gate's scan from `custom/` to all of `components/` — a SEMANTIC change (confirmed PASSES on the flat tree). The README=enrollment equivalence: a `README.md` ENROLLS its dir in the complex-dir proportion clauses, so a TRIVIAL dir must NOT carry a courtesy README — the gate exempts a dir whose only complexity signal is a courtesy README with no segment members.
- **`[R6]` The COMPLEXITY TRIGGER closes the README-derivation circularity — MACHINERY-GATED (the corrected form, §2.1).** The gate previously derived its ENTIRE target set from README PRESENCE, so a complex family that OMITTED its README was NOT a target (live at HEAD: `custom/configurator`, 3 SFCs / 1122 root-ln / useConfiguratorState.ts at root / no README → PASS while ABSENT from the target set). ADD a POSITIVE complexity trigger, target set = `README-bearing ∪ complexity-triggered`: `complex := (sfcCount ≥ 3 AND hasMachinery) OR subComponentWithOwnMultiFileDir OR rootLineSum > ~1200`, where `hasMachinery := root use*/Context.ts | composables/ | constants.ts|constants/ | shaders/ | root shader`. The machinery-gate on the SFC arm is LOAD-BEARING: raw ≥3-SFC over the 91-family flatten storms 24 hits (23 thin shadcn forwarders — forcing 23 ceremony READMEs violates edict 2); the machinery-gate narrows 24→4 (configurator/carousel/drawer/progress, each a real engine). The line-sum + recursion arms stay UNCONDITIONAL (timeline caught by `2274 > 1200`, not the SFC arm); line-sum is ROOT-only (recursive line-sum penalizes good colocation). A complexity-triggered family with no README born-REDs (missing-mandatory-README) AND surfaces its whole-contract holes (3 of the 4 also red on the composable-at-package-root clause). Self-test enriched: ≥3-SFC-NO-machinery MUST NOT flag; ≥3-SFC-WITH-machinery MUST flag; the SFC/line-sum boundaries; the circularity-target assertion.
- **The domain-map COMPLETENESS clause (not tag-correctness).** G1 asserts `components/README.md` carries exactly one row per family dir (dir-list == rows) and viz-DOMAIN rows match the live `useGpuSubstrate` edge ∪ {goo-filter}. It does NOT verify non-viz domain TAGS (advisory, §3). A missing/extra ROW REDs; a debatable non-viz tag does not.

**G2 — `proof:no-god-module` unifies across `.ts`/`.vue`/`.css`. Register `["local","ci"]`.** ONE `HARD_LIMIT=500` RAW, a `~300` advisory soft-target (shader-literal + data-manifest + extracted-SFC-style T1b exempt). The `.vue` arm counts `<template>+<script>+<style>` RAW; the drain dispatch is a SEQUENCE-then-TREE (T1b, RE-MEASURE, T1c; a T1c carve may birth a re-breaching child; a plain over-500 `.ts` → the base cohesion carve). The CSS arm is a cohesion-carve BOUND by byte-identical fence + source-order preservation.
- **The anti-gaming DETECTOR is DECIDABLE: NON-BLANK-LINE CONSERVATION.** When a ratchet-tracked file crosses 500→<500 in a diff, the removed non-blank lines MUST be traceable to new/grown sibling files (git `-M`/`-C` move-detection or content-hash), ELSE flag. The signature of a structural carve is `moved + residual ≈ original`; a comment-strip shows deleted content with NO absorbing sibling. Pin the git-similarity threshold (`-C50%` or content-hash) so a legitimately DE-DUPLICATING carve is not false-flagged. This is the SOLE barrier to draining by deleting load-bearing DDR narratives (App.vue: 530 comment lines clear 500 alone).

**G3 — `proof:depth` (new). Register `["local","ci"]`.** The T2 cap — no segment dir under a segment dir (unless the inner carries `index.ts` → recursion reset); depth beyond ≤5 needs a recorded rationale. The feature-interior rule (§4P.5) is the resolution when a graduated feature's `ui/`/`state/` segment would nest a segment. Prototyped 5/5.

**G4 — `proof:import-boundaries` (new — the PROMOTE end). Register `["local","ci"]`.** The 4-node DAG; subpath-entry reaches both directions; `composables/` never reaches `components/` (except the `export *` aggregator carve); no cross-component GUTS reach; one-barrel public API with the deep-leaf subpath exemption. Born-RED with 25 cross-component guts reaches. The DI-context sub-ruling: a reach into a `createStrictContext`/`createOptionalContext` module imported by ≥2 FOREIGN families → PROMOTE. Self-test 11/11. Scope-extends to the product-app DAG (§4P.4; speedtest's `check-internal-boundaries.mjs` is the precedent). **`[R6]` A `proof:domain-graduation` arm (or an extension of G1's globality clause) asserts every product-app `components/<domain>/` that MEETS (hard≥3 OR soft≥2 by §4P.5) LIVES at `features/<domain>/`** — born-RED at HEAD (3 speedtest violations), GREEN post-fold; the scatter/segment computation is the same fs walk `check-internal-boundaries.mjs` already does. A cycle-detection arm (component→sibling-BARREL edges forming an A↔B pure-re-export SCC) is BOOKED for the deferred barrel-discipline pass (§9.3), NOT the 5.0.0 flatten. Prototyped, FAIL on HEAD by design.

**G5 — location-vs-publish orthogonality. Register `["local","ci"]`.** Physical location by G1's family clause; publish surface by the SCC/heavy-peer discipline. A colocated PUBLIC composable is never flagged for being public.

**G6 — the CSS pair (§2.6). `[R6]` Register `["ci","release"]` on BOTH arms — REWRITTEN for the parent-scoped generator + the golden-invariant correction.** A same-key collision under the scope-id generator = two SFCs sharing one `data-v-` scope-id = a silent CSS scope-leak, a rendering-correctness defect.
- **`proof:css-colocation` (new, TARGET gate):** every colocated CSS flattens to a UNIQUE `dist/styles/` target (no clobber); the copy UNIT is the cascade CSS SUBTREE; the walk globs `src/components/**/*.css` MINUS `**/styles/**` UNION `src/components/**/styles/`; a golden sorted-hash manifest of the shipped `/styles` reds any byte drift; the SOURCE-@import arm asserts every `index.css` @import resolves at SOURCE; the T1b-walk convention (no double-emit); the SOURCE-reader-gate arm asserts no gate reads a colocated CSS by its retired `src/styles/<name>.css` path (the per-family re-point + the CORPUS-ROOT constant widen — `STYLE_CORPUS_ROOTS`, §2.6 R6); PLUS the zero-scoped-id-collision arm (all `data-v-` ids distinct — 41 today).
- **`[R6]` The KEY-UNIQUENESS precondition arm — parentDir/basename over the GLOBAL 428 surface (REPLACING the basename-uniqueness + family-prefix source-convention arm).** Under the parent-scoped generator the key is `(immediateParentDir, basename)`. The arm asserts NO `(parentDir, basename)` duplicate across the GLOBAL 428 src+demo surface (matching the global generator) — a dup = two SFCs sharing a `data-v-` scope-id = scope bleed. This arm is NEAR-VACUOUS today (0/428) and only bites the narrow recurring-generic-sub-dir case (two families each growing a `sections/` or `primitives/` sub-dir with a same-basename SFC). **The round-5 family-prefix SOURCE-convention arm is DROPPED entirely** — parent-scoped makes generic dir-scoped names (`tabs/Content.vue`) LEGAL, so asserting `TabsContent`-not-`Content` is obsolete AND counter-edict (it fought the recursive-colocation pull to generic names). The residual-collision RESOLUTION convention (a one-line note): rename one, OR fall back to a 2-ancestor key `grandParent/parent/basename` for that pair; 0/428 today, single `primitives/` dir.
- **`[R6]` The golden-hash gate's INVARIANT is CORRECTED — scoped-token-SET identity + a ONE-TIME byte rebaseline (a soundness bug the swap exposed, generator-independent).** The FULL flatten REORDERS the SFC-fold blocks (module-graph order change), so the full-byte hash of `dist/glass-ui.css` DRIFTS HEAD↔FLAT for ALL THREE generators — the round-4 "byte-identical under basename" witness used a MINIMAL single-file move that did NOT perturb block order; the full flatten does. The round-5 §6-G6 claim "byte-IDENTITY of `dist/glass-ui.css` holds under the generator across the flatten" is FALSE for the real flatten and would false-RED it. The TRUE generator invariant is the **scoped-token-SET** (data-v- ids ∪ @keyframes-hash suffixes, extracted from `dist/glass-ui.css`) — IDENTICAL HEAD↔FLAT under parent-scoped (`diff` empty; 41 distinct ids, 0 collisions) — PLUS a ONE-TIME golden BYTE rebaseline at the flatten cut (accept the benign layout-driven block reshuffle). The wave EXECUTES the golden gate born-RED→GREEN at the cut (default@FLAT RED — token set ROTATES; parent@FLAT GREEN once the golden is rebaselined onto the parent-scoped token set) + the vite dev HMR smoke (confirmed passing this round) + the parentDir/basename-key uniqueness arm over the 428 surface (0 today). (Optional hardening, recorded: SORT the SFC-fold blocks in the golden gate to stay GREEN across future colocation moves that only reshuffle order — viable, adds a canonicalization step; the one-time rebaseline is simpler and in the plan.)
- **`proof:css-ownership` (interim). Register `["local","ci"]`.** Every `src/styles/*.css` that STAYS global names its single owner via `README OWNER:`. Prototyped 5/5.

**G7 — the enforcement-corpus migration meta-gate (`proof:no-tier-literal`) — SHIPPED. Register `["local","ci"]`.** After the flatten, assert ZERO surviving `components/(ui|custom)/` literal in `scripts/`. All-text-extension + recursive scan (scripts/ is NEITHER typechecked NOR test-resolved, so G7 is the SOLE structural witness). Detector `= /(?:@glass\/)?components\/(ui|custom)(?=[/"'\`)\s]|$)/g`. Born-RED at 865 across 229 files. Self-test 9/9. The gate AND the codemod share ONE all-text-recursive file-set (all 229, not the 218 `.mjs`-only); the codemod lands ATOMICALLY.

**G7-companion — the post-flatten CLOSE BATTERY (CRITICAL). The DIFFERENTIAL resolves-on-disk anti-evasion floor.** G7-GREEN (0 literals) is NECESSARY but NOT SUFFICIENT — G7 asserts literal ABSENCE, not path CORRECTNESS, and is BLIND to the dead-barrel mis-target (the 3 gates re-pointed to a non-existent `components/index.ts` carry no `ui|custom` literal). The close battery MUST:
- assert `{post-flatten danglers} \ {pre-flatten danglers} == ∅` (flatten-induced = 0), NOT an absolute "every path resolves" (the tree carries 46 pre-existing stale-ref danglers orthogonal to the flatten). RULING: PRUNE the 46 in 5.0.0 (no-legacy edict) to make the floor ABSOLUTE-clean, fall back to a frozen-allowlist differential only if the prune is deferred;
- run `proof:subpath-classify` + `proof:build` (build-verify FIRST, then the policy rewrite gates classify/regen-exports/regen-structure);
- run the 12 fixture-reading gates (tests-dir soundness);
- run the CSS-reader corpus (colocation soundness, B2: the per-family re-point + the corpus-root widen);
- list `proof:colocation`'s dropSegment as SEMANTIC-not-cosmetic;
- assert the dead-barrel post-condition (`no surviving src/components/{ui,custom}`);
- assert the DEAD-BARREL GATE-RECONCILE landed (proof-tabs-std's vacuous ui-barrel-read RETIRED + `tabs/primitives` witness re-pointed; proof-consumers-static + proof-component-orphan dead-string pruned);
- assert `proof:barrel-pure` GREEN on glass-ui — 0 mixed (the 9-barrel un-mix landed).

**G8 — constellation propagation. G8 promotes ONLY the LAW half (§0–§6)** to the precepts submodule (the runbook §7–§9 stays BH-tranche-local). Gate SCRIPTS live per-repo; the LAW is the single source. Audit items: (1) each sibling declares `sideEffects`; (2) each sibling authors its migration instrument from the shared formula. Two sibling gates: `proof:sibling-sideEffects` (declaration exists + array form + covers CSS + names every bare-registration import) and `proof:barrel-pure` (no barrel mixes own runtime exports with re-exports — a HARD blocking gate for the 3-of-4 Vite-8 repos AND glass-ui itself). **`[R6]` `proof:barrel-pure` is a PROPOSED gate authored at the cut — the prototype (scans `src/**/index.ts`; MIXED := ≥1 own runtime export NOT via `from`, comment-stripped, AND ≥1 re-export; TYPE-ONLY exports exempt; 6-bite self-test; born-RED 9 mixed → GREEN 0 → re-introduction bite EXIT 1) is authored + proven load-bearing, but is NOT yet the on-disk standing gate** (its build is a BH-migration deliverable). Recommend both arms `['ci','release']`.

**G9 — `proof:backend-structure` (new — edict-6) — the v2 resolver PROMOTED. Register `["local","ci"]`.** The backend twin of G2+G4, language-abstracted. Six arms: (a) file-length ceiling (`wc -l`, hard 500/soft 300); (b) grab-bag detection (with the cohesive-leaf carve); (c) **`[R6]` layer-by-type-of-domain-logic — the ≥2-distinct-domain-stem threshold GENUINELY RECURSIVELY at EVERY dir level, with the DATA-vs-LOGIC split (registry WARN, logic RED), the `core/`-vs-`pipelines/` downward-reach disambiguation, the `integrations/` external-adapter bucket, and the pluralize-NORMALIZED layer-name set** (§5.1 FOLDs 1–5); (d) depth (T2); (e) import-direction — a per-language RESOLVER; (f) god-FUNCTION advisory (ruff `C901`/`PLR0915`). The `--self-test 12/12` ENUMERATES which bite covers which language (python `..`, rust `crate/super`, ts relative) AND which covers each new arm (nested-scatter, data-registry-WARN, core→pipeline per-language) — so a stubbed per-language resolver cannot pass while leaking directionality, and a top-level-only scatter check cannot pass while missing the nested flagship (four anti-evasion mutants each 11/12). Born-RED on floridify (**49 arm-hit: 41 god + 5 grab-bag + 3 NESTED `api/`; `models/`→WARNING**) + speedtest/server (4) + dns-speedtest (2); GREEN on greenfield-rs/pulse. Harvest path: replace `proto-gates/proof-backend-structure.mjs`'s v1 body with the v2 (recursion + splits + 12 bites) when the BH structure band lands.

**G10 — `proof:no-glass-in-dist` (new — the src-stays-relative permanent lock). Register `["ci","release"]`.** Assert ZERO `@glass` specifiers in `dist/*.d.ts`. glass-ui ships NO dts-alias resolver, so ANY src file on `@glass` would emit unresolvable specifiers into the SHIPPED types — a highest-severity publish defect. Born-REDs the instant a future wave migrates a src file to `@glass`.

---

# ═══ RUNBOOK (§7–§9) — the one-time 5.0.0 migration, BH-tranche-local ═══

## §7 Migration posture — clean break, gestalt transposition

- **No legacy, no aliases.** The flatten, the FOLD/PROMOTE/PROMOTE-context reshape, the CSS colocation, the demo tri-partition, the §4-PRODUCT graduations are MOVES — position-preserving where byte-identical-carve applies, gestalt-reshaping where structure demands. No compat shim survives a fold. Grep-locked comments carry VERBATIM into the host file.

- **The migration instrument is PURE RELATIVE dropSegment — `@glass` is DROPPED (no new alias namespace).** Both prototypes migrated `src`+`demo`+`tests`+`scripts` end-to-end with PURE relative-specifier dropSegment and left existing aliases UNTOUCHED; the house already RETIRED `@/*` at v0.8.2, so minting a new alias namespace for a migration that provably needs none is the needless-encapsulation vice (edict 2). The PUBLISHED `src` tree stays RELATIVE (dts self-containment). G10 is KEPT regardless — a permanent, zero-cost lock.

- **The move-map is TWO independently-gated ATOMS** (ATOM A internal sequencing + close battery per §3; ATOM B split into B1/B2 per §2.6). The recompute formula (repo-agnostic, no module resolver): `newSpecifier = normalize(relative(elide(dirname(F)), elide(resolve(dirname(F), S))))`; `elide` is a UNIFORM segment-drop. Each SIBLING authors its own instance (§4P.13).

- **`[R6]` R6-1 — the `componentIdGenerator` ruling — SWAPPED to GLOBAL PARENT-SCOPED (the round-5 build-scoped basename is REPLACED; executed born-RED→GREEN over six real builds + a live dev/HMR smoke).**
  - **The generator.**
    ```ts
    // vite.config.ts — applied UNCONDITIONALLY (dev + build), NOT gated to command==='build'
    vue({ features: { componentIdGenerator: (fp, _s, _p, h) => {
      const a = fp.split('/'); return h(a[a.length - 2] + '/' + a[a.length - 1]);
    } } })
    ```
    The key is `immediateParentDir + '/' + basename`. Drop the round-5 function-config `defineConfig(({command}) => …)` gymnastics — the build-scoping is no longer needed.
  - **Why it DOMINATES the basename form (the four strict wins, executed).** Parent-scoped is ≥ basename on every axis (the move-invariant scoped-token SET is IDENTICAL HEAD↔FLAT — `diff` empty for both `data-v-` ids AND `@keyframes` suffixes; 41 distinct ids, 0 collisions on the FLAT tree) and STRICTLY BETTER on four: (a) **0 collisions on the GLOBAL 428 dev surface** (basename had 1 — the `Notification.vue` src↔demo pair both hashing to `data-v-9e26d10b`, forcing basename to be build-scoped; parent-scoped resolves them to distinct `a30792df`/`660b63eb`) → NO build-scoping needed; (b) **no family-prefix source-convention naming tax** (the round-5 standing gate arm is dropped); (c) **colocation-FRIENDLY** — generic dir-scoped names (`tabs/Content.vue`) become LEGAL, aligning with the recursive-colocation edict; (d) **simpler config** (no `command==='build'` branch). One-time adoption cost is IDENTICAL to basename (all 41 scoped ids rotate ONCE at adoption).
  - **Live dev + HMR CONFIRMED under GLOBAL parent-scoped** (booted `vite --port 5271` with the generator applied unconditionally): `transformMain` reads `features.componentIdGenerator` in the serve path too, so the two `Notification` modules serve distinct scope-ids in dev (no bleed); editing a `<style scoped>` in `Pulse.vue` fired a STYLE hot-update (`scoped=5f1af09b` == the analytical `getHash('pulse/Pulse.vue')`), not a reload — scoped HMR is clean.
  - **The ONE honest trade-off (recorded).** Parent-scoped is move-invariant to the flatten's tier-ABOVE-family elide (immediate parent preserved) but NOT to a future recursive-colocation RE-NEST that changes a scoped SFC's immediate parent (basename would be invariant to that). This is (a) honest — a re-nested component genuinely moved, an id rotation reflecting its new colocation home is CORRECT (arguably a correctness feature: the scope-id encodes the component's home); (b) the same one-time golden-rebaseline class the spec already accepts; (c) zero-impact for 5.0.0 (the only re-nest is `tabs/primitives`, which is UNSCOPED). Perf/bundle impact of the swap = ZERO (only the 8-hex scope-id STRINGS change; same length/count; chunk graph + gzip budget + DCE untouched).
  - **The precondition arm scans the GLOBAL 428 src+demo surface** (matching the global generator), asserting 0 `(parentDir, basename)`-key duplicates (0 today). `demo/vite.demo-dist.config.ts` may stay bare `vue()` for unrelated simplicity (parent-scoped is collision-free there too; no functional need to adopt it in the demo build, though uniformity is optional).

- **`[R6]` R6-2 — the component-CSS-LOCATOR leaf is REJECTED (round-5 DEFER → hard REJECT); the CORPUS-ROOT constant is ADOPTED instead.** The round-5 directive to prototype the locator vs the mechanical rewrite is CLOSED with a hard REJECT on executed evidence:
  - **The build side consumes ZERO per-component paths** — the leaf's claimed second consumer-class is a PHANTOM. `vite.style-fold.ts:90` does whole-DIRECTORY `cpSync(src/styles → dist/styles)`; `:147/:271` `readdirSync`; `vite.utility-emit.ts:177` `readdirSync(src/styles)`. NO vite/build file hardcodes any per-component name; the build resolves the `@import` graph transitively. The B1 widened-walk is a GLOB-ROOT widen (`STYLE_CORPUS_ROOTS`), not a component→path map — so the map would have exactly ONE consumer class (specific-file reader gates), halving its claimed leverage.
  - **The tree-walkers want a CORPUS-ROOT, not a map** — a different abstraction. The correct factoring is `scripts/lib/style-corpus.mjs` exporting `STYLE_CORPUS_ROOTS = ['src/styles', 'src/components']` (`.css` filter), imported by the 4 blind-spot walkers + the build widen. **"5 tree-walkers develop a blind spot" is CORRECTED to 4** (`proof-no-layout-animation.mjs:286` already walks `src/components/**/*.css`).
  - **The locator's first-move cost is STRICTLY GREATER** (arithmetic-certain): building the map for the full ~14-family mover set with `{file, importSpecifier}` fields + its OWN soundness gate `proof:css-map-sound` (a NEW gate — the exact class the mechanical rewrite avoids) + rewriting the SAME 17 slice edit sites to consume `componentCss(fam).file` + ~8 imports. `Locator_firstmove = Mechanical_firstmove + Leaf + Gate + Imports`. And the `@import`-specifier/fixture sites are colocation-sensitive (a function of `index.css`'s position, not a bare path) — a path-map does NOT solve them.
  - **Payback requires a 2nd placement move that never comes** — 5.0.0's recursive colocation IS the terminal placement; a 2nd move is unplanned, and if it ever occurred the mechanical sweep is RE-RUNNABLE (ATOM-A already proved `scripts/` sweeps uniformly, EXACT_REPRODUCTION=true). Amortization denominator ≈ 0.
  - **The no-legacy + aristotelian edicts FORBID the indirection.** `componentCss('border-progress').file` is strictly LESS transparent than the literal `src/components/border-progress/border-progress.css` a reader can grep and open; the leaf's sole justification is a hypothetical 2nd move — the textbook speculative-workaround both edicts reject. The corpus-root constant is a ROOT (no per-component indirection, no legibility loss) and the SOTA-idiomatic factoring (ESLint glob `files:[...]`, stylelint `**/*.css`).
  - **The revisit clause is REPLACED:** re-run the mechanical codemod (it is re-runnable) if a 2nd placement move is ever contemplated; the leaf is NOT resurrected.

- **`[R6]` R6-3 — §4P.5's soft branch is DECIDABLE** (the colocated feature-shaped-interior criterion, §4P.5 R6). The round-5 booked refinement is CLOSED — survey graduates as a gate OUTPUT (softSegments≥2), executed born-RED→GREEN (speedtest 3→0) with the words/definition non-overfit witness; the boundary-gate chain (§9.10) is confirmed.

- **`[R6]` R6-4 — the DEFERRED barrel-discipline pass** (a G4 cycle-detection arm + a POSITIVE pure-barrel Rolldown DCE measurement) STAYS out of 5.0.0 (the spec cites only the mixed-barrel #21966 DISqualification, never a positive pure-barrel proof; DCE-neutrality measured BEFORE it lands). This is the ONE round-5 directive that stays a booking (it was never a blocker; it is genuinely a later graph-invariant pass).

- **`[R6]` Chunk-graph churn — the 5.0.0 ATOMS MEASURED (scoped claim, generator-swap adds nothing).**
  - The FLATTEN is +0 gzip (entry-count-preserving; 190 chunks).
  - The FOLDS are +29 gzip (two folds add +14/+13 to D5-EXEMPT shared chunks).
  - The PROMOTE-primitive class is BYTE-NEUTRAL (190→190).
  - The PROMOTE-context class is a per-route WIN (`dockContext` promote → −327 gz on EACH of 5 foreign routes; the dock route nets −122 gz). "Performance above all" SATISFIED.
  - The 8 CVA un-mix is byte-neutral (190→190); the color un-mix is +1 JS chunk (190→191), a granularity change (downstream DCE benefit UNPROVEN — re-run `profile:budget` per-chunk basename-keyed DIFF at cut).
  - The parent-scoped generator swap is PERF-NEUTRAL (only 8-hex scope-id strings change; 0 chunk/budget/DCE impact).
  - Content-hash CHURN is TWO items: the 6-chunk PROMOTE rehash; the ONE-TIME scope-id rotation at generator adoption. `profile:budget` compares per-chunk by BASENAME (hash-stripped), scoped to the 6 PROMOTE chunks.
  - *(Caveat: `profile:budget` is ALREADY RED at HEAD on PRE-EXISTING causes — goo-blob ceiling + stale AP D5 baseline — owned by the BG close-battery.)*

- **Zero PUBLIC-EXPORT churn** (the subpath surface is `src/*.ts` entry files, untouched; 0 package.json keys) + the internal rewrites + scripts + ~91 dir moves + tests-dir + CSS-reader sweeps + the 9-barrel un-mix.

- **Whole-tree, not incremental** (edict 8). **Sequencing:** this reshape is a `src/`+`demo/`+`tests/`+`scripts/`+build-plugin+`vite.config` write-set; sequences AFTER the owning BG waves per the BH interleave, lands in the joint 5.0.0 cut. Atom A before Atom B (B1 before B2); the graduation folds (§4P.5), G7/G9/G10, and the sibling G8 gates land as gated execution sub-waves with born-RED proofs. The `/api` drop is orthogonal.

- **The BG/BH INTERLEAVE is explicit — no double-carve.** The tree sits mid-BG-drain (`RATCHET_BASELINES` holds ≥2 BG-owned rows, not `{}`; GlassDock re-grew 495→515 after BG.W-DOCK-DECOMPOSE). The 500-breacher carves the reshape enumerates (GlassDock 515, DockLayerGroup 524) are CEDED to their owning live BG waves — BH does NOT double-carve. `RATCHET_BASELINES`, the barrel census (STABLE at 9), the viz membership (STABLE at 9), and the specifier counts are ALL RECOMPUTED against the ACTUAL cut HEAD.

- **`[R6]` ALL FOUR round-6 directives are now RESOLVED — no contested matter remains.** The parent-scoped generator (R6-1, SWAP), the component-CSS-locator (R6-2, REJECT + corpus-root), the §4P.5 soft branch (R6-3, DECIDABLE), and the deferred barrel-discipline pass (R6-4, stays a booked later pass by design). The 5.0.0 residue is EXECUTION.

---

## §8 Settled matters (restated, NOT reopened)

1. The 500-line no-god-module ratchet exists, drains to ∅, counts RAW lines, no permanent length exemption — only shader-literal + data-manifest (T1a) + SFC `<style>`-mass (T1b) + SFC script/template-mass (T1c, composing into a TREE) carves; a plain over-500 file drains by the base cohesion carve. A doc-inflated file drains by STRUCTURAL carve (the G2 conservation detector). The 500 ceiling binds product-app feature interiors + backend packages identically.
2. `proof:colocation` exists (4 clauses); the spec extends it (§6 G1). **`[R6]` The complexity trigger is machinery-gated** (§2.1/§6-G1).
3. The ≥2-consumer visual-load-bearing invariant (J-inv-10) is the promotion bar, generalized to non-visual leaves (T3) with a decidable count over THREE placement cases — FOLD, PROMOTE-primitive, PROMOTE-context.
4. The SCC/heavy-peer publish discipline is preserved and ORTHOGONAL to physical location (§2.5, 4-node DAG).
5. The clean-break/no-back-compat law, presets-in-consumers, byte-identical-carve are the migration constitution.
6. The load-bearing `index.css` cascade order is INVIOLATE; CSS colocation keeps a byte-identical PUBLISHED cascade via approach (i); **`[R6]` the SFC-fold `dist/glass-ui.css` stays scoped-token-set-identical via the GLOBAL PARENT-SCOPED `componentIdGenerator`, with a one-time golden byte rebaseline at the cut** (§7 R6-1, §6-G6).
7. `subpaths/` glob-batch generation is an accepted mechanical exception — kept.
8. The Vue `composables/` essence-name is a recorded FSD divergence — kept; `lib/` its pure-helper sibling; `views/` (not FSD `pages/`) the product-app divergence. `composables/context/` is the DI CONTRACT home. The own-runtime-barrel-sibling is named by its KIND — `variants.ts` (CVA), `store.ts` (Pinia), `constants.ts` (bare consts), `core.ts` (pure runtime fns, the FALLBACK). FE `core.ts` is distinct from BE `core/` (infra-ring dir, §5.1).
9. **FLATTEN `ui`+`custom` is settled → a PURE FLAT namespace (NO physical sub-tier).** The viz DOMAIN is VIRTUAL (a completeness-gated README domain-map deriving VIZ membership from the `useGpuSubstrate` edge ∪ {goo-filter}, `watercolor-dot` tagged mark-not-viz-domain; non-viz tags ADVISORY). `ui/tabs → tabs/primitives` is the sole non-uniform component case; the `subpath-policy.mjs` two-set merge (`tabs=PUBLISH`) is the sole non-uniform SCRIPT case; the scripts `dropSegment` is otherwise UNIFORM. The migration instrument is ONE uniform dropSegment PLUS TWO semantic reconciles (subpath-policy two-set merge + the dead-barrel gate-reconcile) PLUS the tier-root-loose-file move+recompute case. `@glass` is DROPPED (pure relative dropSegment); src stays RELATIVE; G10 KEPT.
10. `src` stays RELATIVE (dts self-containment, G10). The migration instrument is the TWO-ATOM move-map scanning BOTH specifier spaces; each sibling authors its own from the shared formula.
11. **Barrels are PURE RE-EXPORT-ONLY + `sideEffects` is a binding barrel precondition constellation-wide** (§2.1); glass-ui un-mixes its OWN NINE barrels (8 CVA + `composables/color`; the CVA-co-export convention SUPERSEDED); the four siblings each carry a per-repo `sideEffects` + un-mix step (recompute at cut). Slides/sci-report keep 0 barrels (the proportion fence).
12. **The `viz/` physical sub-group is DROPPED** (round-4 → round-5); the domain survives virtually. The god-document law/runbook seam is recorded (§0–§6 LAW, §7–§9 RUNBOOK; G8 promotes the LAW half only).
13. **`[R6]` The four round-6 directives are ALL RESOLVED** — the parent-scoped generator SWAP (R6-1), the component-CSS-locator REJECT + corpus-root adopt (R6-2), the §4P.5 decidable soft-branch (R6-3), and the deferred barrel-discipline pass staying a booked later graph-invariant pass (R6-4). No contested matter remains at blocker OR directive severity.

---

## §9 The execution-carve ledger (decisions made; mechanics to encode)

No design question remains open at blocker OR directive severity. Named EXECUTION carves:

1. **The T1b/§2.6-walk double-emit convention (RULED):** the walk copies the cascade CSS SUBTREE; a `<style src>`-extracted scoped file rides the SFC fold and is SKIPPED. A HARD `proof:css-colocation` assertion.
2. **The T1b→T1c compose-TREE carve (RULED, §1.3):** GlassDock 515, DockLayerGroup 524, App.vue 833→301, SpeedtestResults 2265→374 drain by T1b THEN T1c re-measure, recursing on re-breaching children. +reader-follow cost; the useX-symmetry lift is elected, not forced; doc-inflation drains structurally via the G2 conservation detector.
3. **The barrel-vs-deep-leaf discipline (CARVE):** the recompute preserves existing reach depth (no forced re-barrelling in the flatten wave); a barrel-discipline census is a later pass. A G4 cycle-detection arm + a POSITIVE pure-barrel Rolldown DCE measurement are BOOKED for that deferred pass (R6-4).
4. **The subpath-policy semantic rewrite (RULED, §3):** collapse `TIERS` two-tier → two-set with `CLASS={...UI_CLASS,...CUSTOM_CLASS}` (`tabs=PUBLISH`); NO viz-descent; build-verify FIRST.
5. **The tests-DIRECTORY flatten + fixture-gate re-point (RULED, §3):** move `tests/components/{ui,custom}/X → tests/components/X` (uniform), re-point the 12 fixture gates.
6. **`[R6]` ATOM B split (RULED, §2.6) — the component-CSS-LOCATOR leaf REJECTED, the CORPUS-ROOT constant ADOPTED.** B1 = file-move + widened-walk + colocated-source @imports + walk-flatten (byte-identical). B2 = (i) the per-family path/specifier mechanical re-point (17 sites/8 gates measured on the 3-family slice; 238 total path-sites, 176 the DOCK family = one uniform pass; 39 non-dock gates born-RED→GREEN) + (ii) the shared `STYLE_CORPUS_ROOTS = ['src/styles','src/components']` constant (`scripts/lib/style-corpus.mjs`) imported by the 4 blind-spot tree-walkers + the build widen. "5 tree-walkers" corrected to 4. The locator leaf is a hard REJECT (phantom 2nd consumer; strictly greater first-move cost + a new gate; amortization denominator ≈ 0; no-legacy edict forbids the indirection). Re-run the mechanical codemod (re-runnable) if a 2nd move ever recurs; the leaf is not resurrected.
7. **`[R6]` The GLOBAL PARENT-SCOPED `componentIdGenerator` adoption (RULED, §7 R6-1, EXECUTED):** `getHash(immediateParentDir + '/' + basename)` applied UNCONDITIONALLY in `vite.config.ts` (dev + build); validate 0 `(parentDir,basename)`-key collisions over the 428 src+demo surface, EXECUTE the golden gate born-RED→GREEN on the scoped-token SET (with the one-time byte rebaseline for the layout-driven block reshuffle), run the `vite dev` HMR smoke (confirmed passing this round). `demo/vite.demo-dist.config.ts` may stay bare `vue()`. The round-5 build-scoped basename form + the family-prefix source-convention gate are RETIRED.
8. **The dead-barrel EXPLICIT DELETE + post-condition + gate-reconcile:** `unlink src/components/ui/index.ts` + `rmdir ui/`/`custom/` + assert `no surviving src/components/{ui,custom}`; RETIRE proof-tabs-std's vacuous ui-barrel-read (keep the `tabs/primitives` witness); PRUNE the dead barrel-path strings in proof-consumers-static + proof-component-orphan.
9. **The glass-ui + sibling `sideEffects` + barrel-purity propagation (G8):** the glass-ui NINE-barrel un-mix (8 CVA → `variants.ts` + `composables/color` → `core.ts`, ATOM A) + the per-repo table (recompute at cut) + `proof:sibling-sideEffects` + `proof:barrel-pure` (glass-ui-inclusive; **`[R6]` a BH-migration deliverable — authored + self-tested this round, not yet the on-disk standing gate**); the proportion fence keeps slides/sci-report at 0 barrels.
10. **The feature-interior promotion rule (§4P.5, proto-3) + the DECIDABLE soft branch (R6-3):** a drain-tripping feature `ui/` SFC promotes to a component-folder-with-index inside `ui/`; fold `survey` FIRST (soft-branch, now a gate OUTPUT via the ≥2-colocated-segment criterion), resolving its SFC-embedded `export const variant` boundary violation (move the const out of the SFC into `constants.ts`/a component-folder `index.ts`) before born-REDing admin/dashboard; confirm typecheck + `check-internal-boundaries.mjs` + per-route bundle delta green. The `proof:domain-graduation` arm (§6 G4) asserts every product-app `components/<domain>/` meeting hard≥3 OR soft≥2 LIVES at `features/<domain>/`; use exact-stem matching for the hard-branch scatter detector.
11. **The `scripts/` god-dir disposition doubles as the resolves-on-disk cleanup (§6 G7-companion):** the 46 pre-existing stale-ref danglers PRUNE as part of the `scripts/` god-dir disposition — making the resolves-on-disk floor ABSOLUTE-clean rather than differential (the differential + frozen-allowlist is the fallback if the prune is deferred).
12. **The `profile:budget` basename-keying confirm + the color +1-chunk re-run:** confirm basename-keying before the 6-chunk rehash; re-run the budget gate against the 191-chunk color-un-mix tree at the cut; `curlFBM` real edge is `concentric → liquid-grid/index.ts`.
13. **`[R6]` The G9 v2 resolver harvest (§5.1/§6-G9):** replace `proto-gates/proof-backend-structure.mjs`'s v1 body with the executed v2 (recursion + DATA/LOGIC split + core/pipelines downward-reach + integrations bucket + pluralize-normalize + 12-bite self-test) when the BH structure band lands; rebaseline floridify born-RED 47→49; the A7 backend reshape drives 49 DOWN as it lands.

---

## Appendix A — worked examples (verified)

**A1 — The dock split-brain (FOLD census).** Of 8 shared-tree composables round-1 named "dock-only," exactly ONE folds: `useDockCtaReceive` → dock/composables/. The 7 others STAY-SHARED.

**A1′ — PROMOTE-primitive (25 buried primitives).** `budget.ts` (12/7 viz) → shared; `procedural-color.wgsl.ts` (6 shaders) → `composables/glass/webgl/shaders/`; `useDockHold.ts` (`ui/slider`) → promote with `dockContext`; `curlFBM` (`concentric` → `liquid-grid/index.ts`) → shared field operator.

**A1″ — PROMOTE-context (proven).** `dockContext.ts` (5 non-dock families) → `composables/context/dockContext.ts` (InjectionKey + helper + `DockOrientation`/`DockLayout` + inlined `DOCK_CONTEXT_LABEL`; SFC-free). Typecheck 0, build 0, `/dock` byte-stable, +0 backward edges, −327 gz/route ×5.

**A2 — Single-family subtree.** `composables/sortable/` (860L) → `sortable-list/composables/`. `/virtual`+`/sidebar` (0 in-repo) STAY module-level (T3a).

**A3 — God-SFC family asymmetry.** `blob.vue` (875L) + `constellation.vue` (759L) → feature dirs.

**A4 — Atomization cluster.** `labeled-field/` 5 `Labeled*` → ONE generic + typed slot.

**A5 — The provenance flatten.** `components/{ui,custom}/*` → `components/*` (90 barrel-bearing families, ALL flat peers + `_shared` exempt; 91 dirs; viz VIRTUAL in the README), `ui/tabs→tabs/primitives`, `subpath-policy.mjs` two-set merge (`tabs=PUBLISH`), the dead `ui/index.ts` EXPLICITLY DELETED + the 3-gate dead-barrel reconcile, the glass-ui NINE-barrel un-mix, machine-locked README domain-map, tests-dir flatten mirror, zero EXPORT churn. re-PROVEN GREEN at live HEAD: typecheck 0, vite build 190 chunks, classify EXACT_REPRODUCTION=true, 94/94 subpaths resolve.

**A5′ — The T4 self-fix.** `timeline/geometry.ts` STAYS a root sibling. Frontend `lib/` earned by a 2nd helper; a single cascade sheet stays `components/<n>/<n>.css`, `styles/` earned by a 2nd.

**A5″ — `[R6]` The README-complexity remediation (machinery-gated).** `configurator/` (3 SFC, useConfiguratorState at root, no README) born-REDs the complexity trigger → relocate `useConfiguratorState` under `configurator/composables/`, add a README, home its magic numbers in `constants.ts`. carousel/drawer/progress are the sibling remediations. The 23 thin shadcn compounds (dropdown-menu, context-menu, select, card, …) are SUPPRESSED by the machinery-gate — no ceremony READMEs.

**A6 — §4-PRODUCT graduation (speedtest).** `admin`/`dashboard` (hard, ≥3) + `survey` (**`[R6]` soft, decidably 2+2 by the colocated-segment criterion**) GRADUATE into `features/<domain>/{ui,state,api,composables,lib,config,constants,types,index.ts}`; feature INTERIORS obey the 500 ceiling; a drain-tripping `ui/` SFC promotes to a component-folder-with-index inside `ui/`; the survey fold resolves its SFC-embedded `export const variant` boundary violation; `views/` stays app-global; `design/`→`styles/`; `App.vue` 833→301; the sibling `sideEffects`/barrel-purity step. The words/frontend `definition` domain is the independent non-overfit graduation witness.

**A7 — Backend reshape (floridify + speedtest/server).** floridify `models/` (174) — shared schema-registry carve (**`[R6]` a data-registry WARN, not a violation**); `lookup_pipeline.py` → `pipelines/`; 41 god-modules drain under G9; the NESTED `api/{routers,repositories,services}/` layer-by-type dissolves file-by-file into domain packages (the 3 nested violations of the 49 count), `api/core/` stays a nested infra-ring. speedtest/server `routes/`+`services/`+`validation/` dissolve (the `services/` adapters move to `integrations/`).

---

## Appendix R6 — the round-6 directive-close ledger

The round-5 CLOSE left FOUR genuinely-contested matters as round-6 DIRECTIVES + the canonical carried TWO enforcement-machinery corrections owed executed proof. All resolved this round with real builds/backends/dev-servers.

| # | Round-6 matter (directive/fold) | Executed finding | Resolution | Where |
|---|---|---|---|---|
| R6-1 | The parent/family-scoped `componentIdGenerator` (round-5 DIRECTIVE 1) | 6-build golden witness + live dev/HMR: parent-scoped is move-invariant to the flatten's scoped-token SET (`diff` empty; 41 ids, 0 collisions) AND strictly better on 4 axes (0/428 dev collisions vs basename's 1; no naming tax; colocation-friendly generic names; simpler config) | **SWAP to GLOBAL parent-scoped** `getHash(parentDir+'/'+basename)`, applied unconditionally; DROP build-scoping + the family-prefix source-convention gate; precondition arm = parentDir/basename-key uniqueness over 428 | §7 R6-1, §6 G6, §9.7 |
| R6-1b | The golden-hash gate's byte-identity claim (a soundness bug the swap exposed, generator-independent) | the FULL flatten reorders SFC-fold blocks for ALL THREE generators; the round-4 basename witness used a minimal move that didn't perturb block order; the real flatten drifts the byte hash | **the invariant is scoped-token-SET identity + a ONE-TIME golden byte rebaseline at the cut** (or a sorted-block hardened gate); the "byte-identical under basename" claim is RETIRED | §6 G6, §7 R6-1 |
| R6-2 | The component-CSS-locator leaf (round-5 DIRECTIVE 2) | the build side consumes ZERO per-component paths (whole-dir `cpSync` + `@import`-graph) → the leaf's 2nd consumer is a phantom; first-move cost strictly greater + a new gate; "5 tree-walkers" is actually 4 (`proof-no-layout-animation` already walks `src/components`) | **hard REJECT (DEFER→REJECT); ADOPT the `STYLE_CORPUS_ROOTS` corpus-root constant** for the 4 blind-spot walkers + build widen; B2 = mechanical per-family re-point + corpus widen; re-run the codemod (re-runnable) if a 2nd move ever recurs | §2.6, §7 R6-2, §9.6 |
| R6-3 | The decidable §4P.5 soft-branch (round-5 DIRECTIVE 3) | born-RED→GREEN over speedtest admin/dashboard/survey (3→0, survey machine-decided SOFT via ≥2 colocated `{composables,lib}` segments); words/definition = independent non-overfit witness; chains into the §9.10 boundary gate | **the colocated feature-shaped-interior criterion: ≥2 distinct by-purpose logic segments from `{composables,engine,state,lib}` (each ≥1 non-index .ts, 0 SFCs), utils/helpers→lib, hooks→composables, api/ excluded; the honest soft-note RETIRED** | §4P.5 R6, §6 G4, §9.10 |
| R6-4 | The deferred barrel-discipline pass (round-5 DIRECTIVE 4) | a graph-invariant later pass; the spec still cites only the mixed-barrel #21966 disqualification, no positive pure-barrel DCE proof | **STAYS a booked later pass (never a blocker); the G4 cycle-arm + positive pure-barrel DCE measurement land BEFORE it, OUT of 5.0.0** | §7 R6-4, §9.3 |
| R6-5 | The README-complexity trigger (canonical `[R5c]` fold, owed executed calibration) | raw ≥3-SFC storms 24 hits over the 91-family flatten (23 thin shadcn forwarders); machinery-gate narrows 24→4; configurator is the live born-RED flagship; the trigger also surfaces 3 composable-at-package-root holes | **ship MACHINERY-GATED: `(sfcCount≥3 AND hasMachinery) OR subComponentMultiFileDir OR rootLineSum>~1200`; line-sum ROOT-only; self-test enriched with the shadcn-suppression bite** | §2.1, §6 G1 |
| R6-6 | The G9 backend resolver (canonical `[R5c]` fold, owed executed promote) | v2 EXECUTED: recursion + DATA/LOGIC split + core/pipelines downward-reach + integrations bucket + pluralize-normalize; floridify 47→49; 12-bite self-test; 4 anti-evasion mutants each 11/12 | **PROMOTE v2 into the standing gate; rebaseline floridify 47→49; self-test 9→12; the A7 reshape drives 49 down** | §5.1, §6 G9, §9.13 |
| R6-7 | The census recompute (the always-binding mandate) | cut tree moving under the live BG engine (round-6 HEAD `5d59207`, this session `f7e9b6ca`); barrel 9-STABLE, viz 9-STABLE, family 91/90-STABLE; `proof:barrel-pure` + `style-corpus.mjs` ABSENT (BH deliverables) | **recompute barrel/viz/family/specifier counts + RATCHET_BASELINES at the ACTUAL cut HEAD; `proof:barrel-pure` + `STYLE_CORPUS_ROOTS` are authored-at-cut BH deliverables** | Freshness note, §6 G8, §9.9 |

**No remaining blocker- OR directive-severity question.** The 5.0.0 residue is EXECUTION — the reshape applied against the ACTUAL cut HEAD (barrel census, viz membership, specifier counts, RATCHET recomputed), the golden gate (scoped-token SET + one-time byte rebaseline) + `proof:barrel-pure` + the differential resolves floor + the boundary/graduation gate + the value.js-fence gates + the recursive G9 v2 run + the machinery-gated complexity trigger, all born-RED→GREEN over the mechanically-applied rewrite. The plan draft folds into the BH tranche plan (§7 ATOM-A/B sequencing + §9 carve ledger) as the executable 5.0.0 cut.
