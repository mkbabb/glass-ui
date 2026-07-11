# The Constellation Structure Standard — ROUND-5 SPEC (verification fold)

**Status:** ROUND-5 DRAFT. Folds the round-5 8-agent VERIFICATION pass into the canonical `STRUCTURE-SPEC.md`. The design LAW is unchanged and unanimous — every round-5 lane EXECUTED its prototype born-RED→GREEN at live HEAD (`5fbb8a3b`, tranche/BG) and confirmed the core (proportion law, recursive colocation, 4-node DAG, the flatten-to-pure-flat verdict, the two-atom decomposition, the basename `componentIdGenerator`, the backend §5). What changed is the MACHINERY: sixteen verified corrections, the largest being **a 9th mixed barrel discovered on disk** (§3), **the dead-barrel GATE-reconcile** (§7), **the DIFFERENTIAL resolves-on-disk floor** (§6), and **the BUILD-SCOPED generator** (§7). Round-5 verification folds are flagged `[R5v]`; the standing `[R5]`/`[R4]` folds from the canonical stand and remain flagged.

**Scope:** ONE structural grammar for every repo in the constellation — glass-ui (the library) + its sibling demo/consumer apps (speedtest, words/floridify, slides, sci-report) + the polyglot backends. Frontend and backend under one law; each language binds its own idiomatic norms.

**Constitution:** the user's edicts (§0). Aristotelian proportion is the divining rod; colocation is recursive; no god-modules, no needless encapsulation; clean break, no legacy.

**`[R5]` Document structure — LAW vs RUNBOOK.** §0–§6 are the **LAW** (the timeless grammar — G8-promoted to the read-only precepts submodule as the constellation's single source). §7–§9 + Appendix D are the **RUNBOOK** (the one-time 5.0.0 migration — specifier counts, hash values, `unlink` commands; obsolete the moment the cut lands, stays BH-tranche-local). The physical split into two files is an execution decision; the seam is recorded so a reader never mistakes a migration figure for a standing law.

**`[R5v]` Freshness note (re-verified round-5 against live HEAD `5fbb8a3b`, tranche/BG — all figures EXECUTED, not asserted).**
- plugin-vue **6.0.7**; vite **8.0.13** (native Rolldown). Default SFC id = `getHash(normalizePath(relative(root,filename)) + (isProduction ? source : ''))` — **path+source, NOT source-content** (round-3 empirically REFUTED, §7).
- **253** `.vue` SFCs, of which **41** carry `<style scoped>`; **253 distinct basenames, 0 duplicates** within `src/` (the basename-key precondition holds — IF the generator is build-scoped). Across `src/ + demo/` there are **428** `.vue` with **exactly ONE** basename collision (`Notification.vue`, src↔demo) — the constraint that forces build-scoping (§7).
- The procedural-viz DOMAIN is EXACTLY the **8 live `useGpuSubstrate` importers** (aurora, concentric, constellation, dot-flow-field, dot-matrix, fourier-field, goo-blob, liquid-grid) **+ goo-filter the non-importing rider** = a **9-member VIRTUAL domain**. `paper-grid` is RETIRED/absent on disk; `liquid-grid` superseded it (BG.W-DOTFLOW-REBUILD).
- **`[R5v]` `PROCEDURAL-SUITE.md` (the viz SSOT) is STALE by 3 members** vs the live edge: it lists `paper-grid` (retired) + `watercolor-dot` (a family member with NO drawing context — not a substrate importer) and OMITS `liquid-grid`. Reconciling it is a BG-owed migration PRECONDITION (§3), not a spec blocker — the domain-map gate is born-RED on the drift by design.
- **`[R5v]` NINE mixed barrels live in glass-ui, NOT eight.** The 8 CVA barrels (alert/avatar/badge/button/sheet/slider/toggle + custom/toggle-chip) PLUS **`composables/color/index.ts`** (own=9 value.js-backed color functions + 2 re-exports; also the `/color` subpath entry) — discovered by running `proof:barrel-pure` over ALL 116 `src/**/index.ts` (§3). glass-ui declares `sideEffects: ["*.css"]`; all four siblings declare NONE.
- **The codemod MUST recompute VIZ membership, the BARREL census, the family count, and specifier counts against the ACTUAL cut HEAD** — the live BG engine is concurrently mutating `src/`, and the barrel census already drifted 8→9 this round.

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
2. **Colocate by default; promote to a shared home only when EARNED** (≥2 UNRELATED families — decidably counted, §1.3 T3).
3. **A file over 500 RAW lines is a god-module** — drains via the ratchet by cohesion carve. Single-artifact drain tools: shader-literal, data-manifest (T1a), SFC `<style>`-mass (T1b), SFC script/template-mass (T1c). **T1b and T1c COMPOSE** — apply T1b, RE-MEASURE, then T1c if still over 500. **`[R5v]` The drain is a TREE, not a 2-step sequence** — a T1c template carve births large children that recursively re-breach and need their own drain (§1.3). A plain over-500 `.ts`/`.py`/`.go`/`.rs` drains by the ORDINARY cohesion carve. No permanent length exemption. **A cohesive file inflated by load-bearing documentation drains by STRUCTURAL carve, never comment-stripping** (§6 G2, the anti-gaming detector). The 500 ceiling binds product-app feature INTERIORS and backend packages identically.
4. **A segment dir holds files, not other segment dirs.** Segments: `composables/ lib/ shaders/ skeleton/ styles/ sections/ constants/ config/` (FE), `api/ model/ lib/` (BE). A segment appears only with real members OR a genuinely-separable concern (T4). A single separable helper (or single style sheet) stays a ROOT SIBLING file until a 2nd earns its dir.
5. **A nested sub-component with its own `index.ts` RESETS the depth budget** (≤5 dirs below the nearest feature/component root; T2).
6. **Cross-family imports go through the BARREL, never into another component's guts.** Two preconditions: (a) each repo declares `sideEffects`; (b) **every barrel is PURE RE-EXPORT-ONLY** — no `export const/function/class/default` shares a barrel with `export … from` (Vite/Rolldown #21966 disqualifies mixed barrels from DCE). The SOLE exemption is a curated subpath-entry re-exporting a deep colocated LEAF. **This binds glass-ui's OWN barrels too** — the **`[R5v]` NINE mixed barrels** (8 CVA + `composables/color`) un-mix (the CVA-co-export convention is SUPERSEDED, clean break).
7. **The divining rod runs both ways:** FOLD an over-abstracted single-owner leaf; PROMOTE a buried multi-family primitive/DI-context OUT.
8. **Location and publish-surface are ORTHOGONAL** (4-node DAG, §2.5).
9. **Reject layer-by-type of DOMAIN LOGIC.** Infra-ring, shared-types registry, orchestration tiers are the legitimate exceptions (§5.1). The scatter check runs RECURSIVELY at every dir level.
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
- 500 is the house-native ratchet (`proof:no-god-module`, `HARD_LIMIT=500`). **Lines counted RAW** (`source.split("\n")`, mirrors `wc -l`) — PINNED. §8 RATCHET_BASELINES are raw, untouched.
- A hard number becomes a target, so 500 is a **fail ceiling**, ~300 a **soft target** (warn), and a file *under* 500 is still a violation if it fuses >1 concern.
- **Over-ceiling escape: the draining RATCHET only — no permanent length exemption.** A cohesive over-500 file registers a ratchet row and drains as carved. **`[R5v]` The anti-gaming clause is DECIDABLE (§6 G2):** a file whose count is inflated by load-bearing documentation drains by a STRUCTURAL carve, NEVER by stripping comments. This is not cautionary — it is load-bearing: measured, `App.vue` is **251 code / 530 comment / 52 blank = 64% comment**, and stripping the 530 comments ALONE clears 500 (251 < 500). The naive RAW-line gate IS gameable by deleting load-bearing DDR/narrative comments; the G2 conservation detector is the SOLE barrier. (The canonical's "~120 comment lines" for App.vue is the TEMPLATE HTML-comment subset only; the whole-file doc load is 530.)
- **Shader-literal exemption:** a single cohesive `*.{glsl,wgsl,frag,vert}.ts` string is ONE artifact — exempt, governed by cohesion.
- **Data-manifest exemption (T1a):** a single-source DATA manifest N gates parse by literal path may exceed 500 *as data* IFF its resolution/logic machinery is carved out. Registered, named.

- **SFC over-ceiling carves — TWO tools that COMPOSE into a TREE (T1b + T1c):**
  - **The composition rule (the drain is a SEQUENCE, then a TREE).** Apply T1b (extract `<style>`), RE-MEASURE `<template>+<script>`; if still over 500, apply T1c. **`[R5v]` PROTOTYPE-CONFIRMED on both named double-breachers (EXECUTED, measured to the line):** `SpeedtestResults.vue` 2265 −1351 `<style>` = **915** (still over → T1c) → full drain **374**; `App.vue` 833 −(248 `<style>` + 36 docblock) = **550** (still over → T1c) → full drain **301**. Both empirically prove T1b XOR T1c is WRONG and the compose is correct.
  - **`[R5v]` The drain is a TREE, not a 2-step.** A T1c template carve BIRTHS large children: `MetricHero.vue` absorbs 261 template lines + its share of the scoped styles (~200-400 of SpeedtestResults' 1351-line scoped block) → MetricHero itself likely re-breaches 500 → needs its OWN T1b. The carve-owning app budgets a MULTI-NODE drain; the speedtest feature has FOUR live breachers (SpeedtestResults 2265, ResultStack 697, MeterColumn 688, PhaseTimeline 501), all draining under the promoted `ui/SpeedtestResults/` folder by the same recursive rule. The "residual is coherent" bar is met at EVERY node; the node COUNT exceeds the two files.
  - **T1b — `<style>`-mass extraction.** The `<style scoped>` mass is EXTRACTED to a `<style src>` sibling; the extracted CSS is EXEMPT from the SFC line count. **`[R5v]` Placement follows T4:** root-sibling `<style src="./<Name>.css">` when it is the family's only style artifact; `styles/` only when the family earns that dir. **`[R4]` PROVEN byte-neutral end-to-end** (plugin-vue 6.0.7): `<style src scoped>` is a first-class path (0 warnings), the extracted CSS folds at the SAME graph position, byte-IDENTITY of `dist/glass-ui.css` holds under the basename generator (§7). The extracted file rides the SFC fold pipeline (`dist/glass-ui.css`), NOT the `index.css` cascade — the walk SKIPS it. **`[R5v]` The App.vue T1b arm is the SIMPLEST/lowest-risk case** — its `<style>` is NON-scoped (`@layer speedtest` global), so the extraction is a NON-scoped `<style src>` with no scope-id, ALREADY live in the repo (`SpeedtestResults.vue:906 <style src="./styles/result-metric-swap.css">` ships it in production). It does NOT depend on the §7 basename-generator guarantee; only SCOPED extractions (SpeedtestResults') do. Narrow the T1b risk surface accordingly.
  - **T1c — script/template-mass carve.** The standard cohesion decomposition on the two SFC axes:
    - **Template mass →** extract cohesive sub-component SFCs (a section with its own props/logic → a nested sub-component under the root or `sections/`). `[R4]` PROVEN: `GlassDock.vue`'s fission-bridge → `DockFissionBridge.vue` (34L, DOM-identical).
    - **Script mass →** extract component-local composables (a coherent reactive block → `composables/<useX>.ts`; a single such block stays a ROOT SIBLING until a 2nd earns the dir, T4). `[R4]` PROVEN: `GlassDock.vue`→`useGlassDock.ts` (296L) drains 515→230; `DockLayerGroup.vue`→`useDockLayerGroup.ts` (272L) drains 524→141.
  - **`[R5v]` The coherence criterion (the carve seams are the file's OWN section headers).** A carve is COHERENT iff its residual either self-composes its inputs (children call `useHeroVariant`/`inject DockStartKey` themselves) OR shares ONE nameable composable — NEVER a v-if+prop-drill glue chain. Verified: `usePersonalBest.ts` (the cross-cutting `isPersonalBest` read by BOTH `ResultHeadlineCluster` AND `ShareCompareBar`) is a shared composable, not a prop-drill; the carve seams are the files' authored section headers (`// ── AV.W16 — Aurora render-substrate consumer policy ──` → `AuroraBackdrop.vue`; `// ── AW.W8.2 — the SHARE flow ──` → `ShareCompareBar.vue`). The decomposition PROMOTES the file's existing internal organization into physical files.
  - **`[R4]` The minimal-drain-vs-symmetry ruling.** The ratchet forces ONLY enough drain to clear 500; the useX-orchestrator symmetry lift is PERMITTED but NOT FORCED. Extract a mandatory genuine cohesive LEAF; a symmetry-for-symmetry glue split with no nameable concern is atomization and forbidden. The owner elects; the ratchet only forces clearance.
  - **`[R4]` The reader-gate follow-cost is INTRINSIC and budgeted** (~3 gates per over-bound dock SFC; the SCRIPT-axis twin of T1b/CSS's cost, disjoint gate populations).
  - The carve drains under the RATCHET — never a permanent exemption.

**`[R4]` The plain-composable god-module (base-case carve).** `useGlassBackdropLuminance.ts` **554** drains by the ORDINARY cohesion carve into colocated sub-leaves. The same base case binds every over-500 `.py`/`.go`/`.rs`.

**T2 — Directory depth. Colocation nests at most ONE segment level below a component root; recursion resets the budget.**
- SOTA: readers lose context past 3–4 levels; FSD caps at EXACTLY 3.
- **Rule:** within one component root the tree is `root → {segment dir} → file`. A segment dir holds files, NOT other segment dirs. A nested SUB-COMPONENT (a child with its own `index.ts`) is a NEW root that RESETS the local budget. Global sanity cap **≤5 dirs** below the nearest feature/component root. Machine-locked by `proof:depth` (§6 G3; prototyped 5/5).

**T3 — Promotion to the shared tree. ≥2 UNRELATED families — decidably counted, three placement cases.**

The house's ≥2-consumer invariant (J-inv-10) IS this rule, extended to every non-visual leaf. The naive count is WRONG; the count is decidable by its inclusion/exclusion set:
- **INCLUDE composition edges** (a leaf real-imported by a SIBLING shared-tree leaf).
- **INCLUDE demo/sibling-app app-global usage.**
- **EXCLUDE within-family DI plumbing.**
- **EXCLUDE discovery-layer TYPE re-exports** (a `api/` type re-export is a PUBLISH edge; the criterion counts MODULE-PATH imports).
- **PROMOTE a cross-family-read DI context** (≥2 non-owning families by module-path import) to `composables/context/`, carrying its `InjectionKey` + helper + domain types. Live: `dockContext.ts` read by 5 non-dock families → promote.
- **EXCLUDE root-barrel/curated-aggregator re-exports** (a publish signal, not a location signal).

**The DI-promotion criterion, codified:** *a `createStrictContext`/`createOptionalContext` module promotes to `composables/context/` IFF ≥2 non-owning feature-dirs import its MODULE PATH.* Over all 8 DI-context sites: exactly ONE qualifies (`dockContext`=5); the 7 others=0 STAY.

- **Exemption (T3a):** a PUBLISHED subpath with a recorded external consumer stays module-level at 0 in-repo families (`/virtual`, `/sidebar`). Checkable against `docs/consumer-evidence/`.
- Census: the bar is **≥2** (aligned to inv-10).

**T4 — Segment minimum-substance.** A `composables/` holding one file, an empty `constants.ts`/`shaders/`, a 1-file `lib/`, **a `styles/` holding one sheet** — atomization. A segment appears ONLY with real members OR a genuinely-separable concern. A lone component-local composable, helper, OR style sheet stays a SIBLING FILE at the component root until a second earns the dir. Machine-locked by `proof:colocation` no-empty-segment clause (§6 G1).

### §1.4 Both-direction violations, decidable

**God-module (excess) — any of:**
- file >500 RAW lines (non-shader, non-data-manifest; SFC via T1b→T1c compose-tree; plain composable via base carve);
- a dir mixing >1 domain/concern with no sub-grouping;
- layer-by-type at ANY dir level (RECURSIVE scatter check);
- a grab-bag (`utils.ts`, `helpers.go`, `common.py`);
- **a mixed barrel** — an `index.ts` combining `export const/function/class` OWN exports with `export … from` re-exports;
- **The `mixed-kind` flat-dir smell (advisory).** A flat dir of >~7 sibling files of MIXED kind is a human-review flag. The machine substitutes ARE gated (README domain-map, `proof:depth`, `proof:import-boundaries`).

**Atomization (deficiency) — any of:**
- a shared-tree resident with <2 unrelated families and no external-consumer exemption → **FOLD**;
- **atomization-by-misplacement**;
- **the buried-primitive** (≥2 OTHERS import) → **PROMOTE**;
- **the buried DI-context** (≥2 FOREIGN families) → **PROMOTE** to `composables/context/`;
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
  core.ts                    # [R5v] the own-runtime-export leaf when a barrel would otherwise mix (the color pattern)
  constants.ts               # magic numbers/enums (when ≥1 exists)
  README.md                  # colocation-adoption marker + human map (mandatory when complex)
  composables/               # component-LOCAL composables (when ≥2, or one genuinely separable)
  lib/                       # component-LOCAL pure/mixed helpers (when ≥2)
  shaders/  skeleton/  styles/  sections/     # segment dirs, when EARNED (≥2 members)
```
The barrel `index.ts` is the invariant the flat subpath re-exports; the export surface is DECOUPLED from internal layout. A trivial 2-file component keeps the folder+barrel.

**The `lib/` segment** holds a component's PURE/MIXED domain helpers (matches backend §5.1 and product §4P.1 — ONE segment vocabulary). Per T4, a SINGLE separable helper stays a ROOT SIBLING file; `lib/` is earned by the 2nd.

**`[R5]` The `styles/` segment (T4-consistent).** A single colocated cascade sheet stays ROOT SIBLING `components/<n>/<n>.css`; `styles/` is EARNED by a multi-partial family (dock's top sheet + its 17-partial `dock/` subdir). The build walk (§2.6) globs BOTH forms.

**`[R4]` The barrel-only rule + the deep-leaf exemption + TWO barrel preconditions.**
- **Precondition A — `sideEffects` declared.** glass-ui `["*.css"]`; siblings declare NONE (audit, G8). An app declares the array form `["**/*.css","*.css",…explicit bare-registration imports]` — never blanket `false`, never glass-ui's flat `["*.css"]` (an app's deep tree needs `**/*.css`).
- **Precondition B — barrels are PURE RE-EXPORT-ONLY.** No `export const/function/class/default` shares a barrel with `export … from`. Own consts/CVA live in a SIBLING (`variants.ts` for CVA, **`[R5v]` `core.ts` for own runtime functions**), re-exported through the barrel. This is BOTH a Rolldown/Vite-8 requirement (#21966, OPEN + unfixed) AND a colocation-clarity win. **`[R5v]` It binds glass-ui itself — NINE barrels, not eight:**
  - the 8 mixed CVA barrels (alert/avatar/badge/button/sheet/slider/toggle + custom/toggle-chip) un-mix to `variants.ts` + pure barrel;
  - **`composables/color/index.ts`** (own=9 value.js-backed functions `oklchToLinear`/`warmCatchLight`/`oklchToGammaRgb`/`cssToOklch`/`oklchStopToHex`/`deriveHue`/`gamutMapStop`/`deriveBlobPalette` + `defaultBlobColorResolver`, + 2 `useAccentTone` re-exports; it is ALSO the `/color` subpath entry so NOT covered by the pure-re-exporter exemption) un-mixes to a colocated `core.ts` + pure barrel (`export * from './core'` + the 2 re-exports).
  - The CLAUDE.md "CVA variants co-exported from each index.ts" convention is SUPERSEDED (clean break, edict 7). `proof:barrel-pure` runs on glass-ui AND the Vite-8 siblings.
  - **`[R5v]` The color un-mix is the ONE case that is +1 JS chunk (190→191), a benign DCE-granularity GAIN** — the pure barrel lets Rolldown split the shared color-core as its own tree-shakeable chunk (already reached by aurora/blob/border-progress, so almost certainly `profile:budget`-neutral; re-run the budget gate at the real cut). The 8 CVA barrels are fully chunk-neutral (190→190, single-consumer variants). CSS golden hash byte-identical across all forms (§7).

### §2.2 What colocates (the default)
Everything a component OWNS: sub-components, component-local composables, `lib/`, variants, `core.ts`, constants, shaders, skeletons, styles (§2.6), README. A component-specific composable/helper read only by that component must NOT sit in the shared tree.

### §2.3 Recursion
A sub-component that grows its own multi-file structure becomes a nested component root under the parent (or under `sections/`), with its own `index.ts`, local `composables/`/`lib/`, README if complex. Aurora (demo) is the gold standard; each nesting RESETS the depth budget (T2). **`[R5]` The `tabs/primitives/` sub-component group (§3) is the executable instance** — the raw wrapped reka primitives beneath house `SegmentedTabs`; named by ROLE (`primitives/`), NOT vendor (`reka/` is a provenance marker contradicting greenfield-no-meta). **`[R5v]` Executable-confirmed:** the flatten yields reka nested at `src/components/tabs/primitives` (codemod run, `ls -d src/components/*/ = 91`).

### §2.4 The shared tree
`src/composables/` holds ONLY leaves clearing T3. Its sub-trees (`motion/ glass/ dom/ dark/ reactive/ context/ color/`) are the shared homes; the PROMOTE set (§1.5) joins them. **`composables/context/` is the DI CONTRACT home** — the promote FORCES the context's own domain types into the shared dir (a backward `shared→component` type import would violate the DAG). A DI contract IS its types. The Vue-idiomatic `composables/` essence-name is kept; `lib/` is its purpose-named sibling; backend uses purpose-names (§5).

### §2.5 Location vs publish-surface + the 4-node boundary model

TWO axes the current tree conflates: **physical location** (T3, family count) and **publish surface** (SCC/heavy-peer). **They do not couple.** The boundary model is a 4-node DAG:
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

### §2.6 Styles / CSS — PHYSICAL colocation via approach (i), PROVEN dev+HMR+byte-identical-dist

Component-SPECIFIC CSS in the GLOBAL `src/styles/` tree is a colocation miss vs SOTA (Vuetify colocates `VBtn.sass`). Approach (i) is PROVEN end-to-end on a running demo dev-server; option (ii) (Vite dev alias) is DROPPED — dominated.

**`[R5]` Placement is T4-consistent.** A CLEAN single-owner family's cascade CSS colocates PHYSICALLY:
- **single sheet → ROOT SIBLING** `components/<n>/<n>.css` (~10 of the 14 families: border-progress, drawer, select, sheet, completion-seal, hover-popover, floating-panel, card-scroll, glass-refract, cards).
- **multi-partial → `components/<n>/styles/`** carrying the top sheet + its own-subdir partials (dock keeps its 17-partial `dock/` subdir INSIDE its colocated `styles/`; tabs, instrument-chassis, configurator).

`src/styles/index.css` — the SINGLE inter-component cascade authority, staying GLOBAL — rewrites each moved `@import` to the honest on-disk path.

**`[R5v]` The MODULE-vs-COMPONENT placement criterion, made DECIDABLE (the aristotelian fold, closing the round-4 open note).** A cascade sheet colocates IFF it is a SINGLE-OWNER sheet (exactly one component family reads its rules); it STAYS in `src/styles/` as a module-level register IFF it is a cross-family SHARED register (≥2 unrelated families read it). The decidable test mirrors T3's family count over the sheet's consumer set:
- **Colocate** (single owner): dock, select, sheet, drawer, border-progress, completion-seal, hover-popover, card-scroll, glass-refract.
- **Stay module-level** (cross-family shared register): `menu.css` (5 picker families), `feedback-tone.css` (Toast/Notification/Alert), `floating-panel.css`, `cards.css` (carries the `paper-texture`/`cartoon-surface` `@utility`), plus the genuinely-global cascade (token cascade, the 5-rung glass ladder, typography, theme, `utilities.css`, `paper.css`, `animations.css`, `transitions.css`). `icon-chip.css` (the SOLE cross-global `@import`) STAYS DOCUMENTED-OWNERSHIP (`README OWNER:` + `proof:css-ownership`). This is the CSS analogue of the ≥2-family T3 test and is gate-checkable (`proof:css-colocation` extended).

**`[R5v]` The build-transform copy-UNIT + the widened walk, EXECUTED byte-identical.** A build-transform (2 fns appended to `vite.style-fold.ts`) walks the colocated cascade CSS, copies it into a FLAT `dist/styles/`, then flattens the shipped `dist/styles/index.css` @imports. Verified in a worktree: moved dock (24 members: `dock.css` + 17 partials + `dock-controls.css` + 5 partials) → `components/dock/styles/`; select/sheet/drawer → `components/<n>/<n>.css`. `diff -rq golden dist/styles` EXIT 0; **106==106 files; `dist/styles/index.css` sha `675249ea` IDENTICAL golden==new; rebuild-vs-rebuild diff EXIT 0** (deterministic). The copy UNIT is NOT "the index.css-referenced sheet" — it is the component's cascade CSS SUBTREE:
- a root-sibling `components/<n>/<n>.css` — copied whole;
- a `components/<n>/styles/` SUBTREE — copied WHOLE via ONE `cpSync(dir, dist, {recursive:true})` per `styles/` dir, because dock's 17 partials are `dock.css`-referenced (relative `@import "./dock/shell.css"`), NOT `index.css`-referenced; copying only the top sheet strands them and silently drops the entire dock `@layer components` cascade.

**`[R5v]` The glob is refined to ANY-DEPTH (the recursive-colocation edict).** The walk globs `src/components/**/*.css` MINUS `**/styles/**` (any-depth single sheets — catches a 2-level nested `timeline/continuous-rail/continuous-rail.css` a one-level `*/*.css` glob MISSES) UNION `src/components/**/styles/` (the multi-partial subtrees). The two globs are STRUCTURALLY DISJOINT (a root-sibling `.css` is never inside `styles/`; a `styles/` member is never at `components/*/`), PROVEN three ways: (a) real-tree basename-intersection EMPTY; (b) a synthetic same-component `select.css` + `styles/` ambiguity fires born-RED (`vite build` EXIT 1: "declares BOTH … — one placement per component"); (c) a synthetic cross-glob `dock/styles/select.css` colliding on `dist/styles/select.css` fires born-RED (a claim() map).

**`[R5v]` The index.css @import DISCIPLINE (the demo-HMR constraint, the correct rule).** `demo/demo.css:108` does `@import "../src/styles/index.css"` (the SOURCE cascade, for HMR). So `src/styles/index.css` @imports MUST resolve at SOURCE: they reference the COLOCATED SOURCE path (`@import "../components/dock/styles/dock.css"`, all verified to resolve on disk), and the publish WALK flattens them to `./dock.css` for dist (regex `@import "../components/[^"]*/([^"/]+\.css)"` → `./$1`). The prior "index.css keeps dist-relative `./X.css`, walk re-materializes" framing DANGLES the source @imports → breaks demo HMR. The walk is `cpSync + gather + index-rewrite`, NOT a pure cpSync.

**`[R4]` TWO colocation classes need distinct build routing.** (a) an SFC-scoped `<style src>`-extracted file (T1b) rides the SFC fold pipeline into `dist/glass-ui.css` and is SKIPPED by the cascade walk (an un-predicated walk ships it TWICE — folded-scoped AND raw-UNSCOPED, breaking scoping); a HARD `proof:css-colocation` assertion. (b) a NON-scoped cascade partial (dock/, tabs/) is copied by the walk. Class (a) is skipped by construction (its reference is a `<style src>` in an SFC, never an `index.css` @import).

**The proof:** Vite v8 dev clean (0 CSS resolve errors); `/dock/overview` HTTP 200 painting from colocated `dock/styles/dock/shell.css`; **HMR SURVIVES**; `npm run build` green; `diff -rq baseline dist/styles` exit 0 across 106 files. Approach (i) is the only variant satisfying dev+publish both.

**The rulings:**
1. The ~14 CLEAN single-owner families colocate PHYSICALLY (single-sheet → root sibling, multi-partial → `styles/`). Extracted SFC scoped styles (T1b) land as `<style src>` siblings. Machine-locked by `proof:css-colocation` (§6 G6).
2. `icon-chip.css` STAYS DOCUMENTED-OWNERSHIP.
3. Genuinely-global cascade + the cross-family shared registers (§ decidable criterion above) stay in `src/styles/`.
4. `index.css` remains the SINGLE INTER-component ordering authority — the @layer + source-order ties are INVIOLATE. Cascade-ORDER = global; file LOCATION = colocation.

**`[R5v]` This is CSS-COLOCATION, ORTHOGONAL to the flatten, and it SPLITS into B1 + B2 (§7).** B1 = the file-move + widened-walk + colocated-source @imports + walk-flatten (byte-identical, mechanically trivial, PROVEN). B2 = the GATE reader-corpus re-point — **the real ATOM-B cost, dwarfing the build-walk: 81 distinct `scripts/*.mjs` hardcode a MOVABLE component-CSS `src/styles` path** (dock 58, dock-controls 10, segmented-tabs 7, instrument-chassis 6, drawer 6, configurator 5, icon-chip 3, completion-seal 2, + singletons; 181 scripts reference `src/styles` at all). Two failure modes after the move: (a) **SPECIFIC-FILE READERS crash** (`proof-completion-seal.mjs:81` reads `src/styles/completion-seal.css` + `:189` asserts `index.css @imports ./completion-seal.css` → ENOENT); (b) **5 TREE-WALKERS develop a BLIND SPOT** (`proof-no-layout-animation.mjs:285 walk(src/styles)`, `proof-ba-animate`, `proof-motion2`, `proof-motion-demo:274`, `proof-affordance-map`) — a layout-animation planted in the moved `dock/morph.css` would ESCAPE `proof:no-layout-animation`. A GENUINE correctness hole, not cosmetic. B2 MUST (i) re-point every specific-reader path AND (ii) WIDEN the 5 tree-walkers' corpus root the SAME way the build widened (`src/styles ∪ src/components/**/*.css ∪ src/components/**/styles/**`). `gates.manifest.mjs` and `no-masking-manifest.mjs` hardcode `src/styles/dock/*` and also need updating.

---

## §3 VERDICT — flatten `components/ui` + `components/custom`

**FLATTEN to a PURE FLAT namespace.** Merge into ONE `src/components/` of domain-organized per-component folders as flat peers — **NO physical sub-tier**. Domain grouping is VIRTUAL: a machine-locked `components/README.md` domain-map. No provenance tier, no dead markers. **Settled (edict 5), executable, `[R5v]` re-PROVEN GREEN end-to-end at LIVE HEAD `5fbb8a3b`** (the round-4 prototype ran on stale `3e2387ff`): `codemod-flatten.mjs` rewrote 358 src + 211 demo/tests specifiers → 91 flat family dirs; typecheck 0; **`vite build` produces EXACTLY 190 JS chunks** (88 named entry-chunks identical to pristine modulo one stale `goo-dot-matrix.js` — live-engine drift, not a flatten artifact); `proof:subpath-classify` returns **EXACT_REPRODUCTION=true** with `package.json` BYTE-IDENTICAL to pristine; **94/94 subpaths resolve.**

### The evidence (unanimous for owned libraries)
Every library that OWNS its components keeps flat peers, no vendored-vs-house tier: reka-ui (~78 flat + `shared/`), Base UI, Ark UI (~70 flat), PrimeVue (80+), Vuetify. The two-tier is EXCLUSIVELY a shadcn-CONSUMER pattern whose sole rationale — protecting vendored copies for `npx shadcn add` re-pull — is DEAD here (glass-ui's `ui/` is ~100% forked). Sharper: **6 `ui/` components already reach UPWARD into `custom/`** (and 10 `custom/` reach into `ui/`). The boundary encodes NO architectural invariant — it is provenance sediment.

### `[R5]` The viz DROP — PURE FLAT, not a physical sub-group
DROPPED for four converging reasons:
1. **The trigger is non-discriminating** — `≥5 non-adjacent members sharing a register` fires EQUALLY for forms(13)/overlays(9)/feedback(8). Committing exactly one is a judgment dressed as a proof.
2. **The physical dir mis-targets 83 gate scripts** under uniform `dropSegment` (`components/custom/aurora → components/aurora` is WRONG if the real path is `components/viz/aurora`); G7 goes GREEN (literal absent) while 83 gates ENOENT. Pure-flat makes uniform `dropSegment` CORRECT for all 229 scripts.
3. **The 81-flat-+-1-nested grammar reads arbitrary** — a reader cannot derive "why aurora nests but dialog is flat."
4. **The README domain-map already does the navigation.**

**`[R5v]` The viz DOMAIN survives — virtually — with a DECIDABLE, SELF-MAINTAINING membership authority.** The discriminating signal is the **LIVE `useGpuSubstrate` import edge ∪ {goo-filter rider}** = EXACTLY 9 families (aurora, concentric, constellation, dot-flow-field, dot-matrix, fourier-field, goo-blob, liquid-grid, + goo-filter). Confirmed on disk this round (`proto-domain-map.mjs`). **The gate's AUTHORITY is the IMPORT EDGE computed on disk, NOT `PROCEDURAL-SUITE.md`'s prose** (proof:claude-structure-sync pattern) — so a new viz auto-enrolls the moment it imports the substrate.

**`[R5v]` The FAMILY vs DOMAIN distinction must be ENCODED (the SSOT-drift correction).** `PROCEDURAL-SUITE.md` enumerates the procedural-suite FAMILY (a SUPERSET — it lists `watercolor-dot`, which has NO drawing context and is NOT a substrate importer) and is STALE by 3 members (`paper-grid` retired/absent; `liquid-grid` OMITTED). Locking the SSOT roster verbatim would WRONGLY enroll `watercolor-dot` and KEEP the retired `paper-grid`. So:
- The domain-map gate DERIVES viz-DOMAIN membership from the `useGpuSubstrate` edge ∪ {goo-filter rider} (the 9), NOT the SSOT roster.
- `watercolor-dot` is tagged as a distinct **`mark`/family** domain (procedural FAMILY, not viz DOMAIN) — a recorded rationale, not a hand-exception.
- **MIGRATION PRECONDITION (BG-owed, not a spec blocker):** the live BG engine must reconcile `PROCEDURAL-SUITE.md` (`paper-grid`→`liquid-grid`; mark `watercolor-dot` family-not-viz-domain) BEFORE the domain-map gate greens — BG.W-DOTFLOW-REBUILD retired paper-grid + added dot-flow-field/liquid-grid but never updated the SSOT. The gate is born-RED on this 3-member drift by design.

### The final tree shape — COMMITTED
DEFAULT is FLAT + a gated `components/README.md` domain-map. **`[R5]` The domain-map enumerates ALL families** (the SOLE domain-navigation authority now viz is virtual). Each family's ONE-LINE entry names its virtual domain (viz / form / overlay / feedback / mark / …). Non-family peers are domain-map-EXEMPT: `_shared/`, `PROCEDURAL-SUITE.md`.

### `[R5]` The count arithmetic
- **92 family-dirs − 1** (`ui/tabs` folds into `components/tabs/primitives`) **= 91 top-level component dirs** (executable-confirmed: `ls -d src/components/*/ = 91`).
- **`_shared/` is domain-map-EXEMPT**, leaving **90 barrel-bearing families, ALL flat peers** (the 9 viz members grouped VIRTUALLY in the README).
- The dead `ui/index.ts` aggregate barrel (**0 real importers**) is a FILE that is DELETED, not a family subtracted.

### `[R5v]` The reshape — the TWO-ATOM decomposition (with the CORRECTED migration instrument)

**ATOM A — the FLATTEN ATOM (re-PROVEN GREEN at live HEAD).** Must land atomically for G7. Internal sequencing:
1. **Adopt the BUILD-SCOPED basename `componentIdGenerator` FIRST + rebaseline the golden `/styles` hash once** (§7 — the config change that makes every subsequent move byte-neutral for `dist/glass-ui.css`; the golden gate is EXECUTED born-RED→GREEN as the witness).
2. **glass-ui 9-barrel un-mix** (the 8 CVA → `variants.ts`; `composables/color` → `core.ts`; each `index.ts` a PURE barrel — the proto-1 slider pattern; `<style>` blocks UNTOUCHED so the golden hash stays byte-identical). `[R5v]` The MINIMAL barrel-preserved form is CHOSEN (same-family SFCs keep `import from '.'`; ZERO `.vue` edits) — byte-neutral under ANY generator, generator-independent. (The cleaner SFC→`./variants` re-pointing is a later colocation pass, generator-order-coupled, deferred.)
3. **src recompute** — `newSpecifier = normalize(relative(elide(dirname(F)), elide(resolve(dirname(F), S))))`; `[R5v]` `elide` is a UNIFORM segment-drop `components/(ui|custom)/X → components/X` (no viz-insertion). ~568 flatten-VARIANT specifiers recompute; the ~1218 invariant re-emit byte-identical.
4. **demo + tests segment-drop** (521 specifiers, alias UNTOUCHED) **+ the tests-DIRECTORY flatten** (`tests/components/{ui,custom}/X → tests/components/X`, uniform) **+ 12 fixture-gate re-points.**
5. **`[R5v]` scripts codemod — ONE UNIFORM ALL-TEXT-RECURSIVE `dropSegment` over ALL 229 files PLUS TWO semantic reconciles** (the canonical's "exactly ONE semantic rewrite" UNDERCOUNTS):
   - **The uniform pass is ALL-TEXT-RECURSIVE over `scripts/` (229 files), NOT `scripts/*.mjs` (218).** The 229-corpus includes 11 the top-level `.mjs` glob MISSES — 7 `wf-ay-*.js` history one-shots, 3 subdir `.mjs` (`aurora-profile/harness-browser`, `lib/canon-doc`, `lib/subpath-policy`), 1 `.vue` fixture (`fixtures/strict-templates`). This is the SAME file-set G7 scans; an `.mjs`-only pass leaves G7 RED at 11 files. EXCLUDE only `subpath-policy.mjs` (semantic reconcile 1).
   - **Semantic reconcile 1 — `scripts/lib/subpath-policy.mjs` (the two-set merge).** A naive textual dropSegment BREAKS `proof:subpath-classify` (both TIERS entries collapse to `relBase src/components` → cross-classify flags 48 custom dirs unclassified → fail-closed throws). The correct core is a `readTree` PARTITION of ONE flat `dirsWithIndex('src/components')` read, split by `classMap` membership (`CLASS = {...UI_CLASS, ...CUSTOM_CLASS}`, custom-wins → `tabs=PUBLISH`) — preserving the `{ui,custom,composable}` `readTree` contract every consumer reads unchanged; the composable tier survives as a 2nd TIERS entry (`COMPOSABLE_CLASS`, 11 keys, `relBase src/composables`). Verified: EXACT_REPRODUCTION=true, `package.json` byte-identical.
   - **`[R5v]` Semantic reconcile 2 — the DEAD-BARREL GATE-RECONCILE (3 gates read/witness the deleted `components/ui/index.ts`).** The dead barrel is DELETED (step 6), and there is NO aggregate `components/index.ts`, so a uniform drop mis-points these 3 gates to a NON-EXISTENT path — and G7 (literal-absence) is BLIND (`components/index.ts` carries no `ui|custom` literal). Split by severity:
     - **`proof-tabs-std.mjs:95` LIVE-READS the deleted barrel** AND witnesses the old `ui/tabs` reka path (the `DockLayerGroup` import) — PASSES pristine, FAILS on the flat tree. **Ruling:** RETIRE the vacuous `ui/`-barrel-read assertion entirely (once there IS no ui barrel, "ui/Tabs off the public barrel" is meaningless), KEEP only the `tabs/primitives` internal-keep witness (re-point to `src/index.ts` + `tabs/primitives`).
     - **`proof-consumers-static.mjs` + `proof-component-orphan.mjs`** carry the barrel path only as list/skip STRINGS (no live `read()`) — cosmetic dead-refs, PRUNE the strings.
6. **`[R5]` `ui/tabs → tabs/primitives` override** (a one-entry override BEFORE the uniform drop; `components/tabs/` holds `SegmentedTabs.vue` + `composables/` + `constants.ts` + `variants.ts` + `index.ts` + `README.md` at root, `primitives/{Tabs.vue,…}` nested; `DockLayerGroup` repaths).
7. **`[R4]` The dead `ui/index.ts` aggregate barrel is EXPLICITLY DELETED** — `unlink src/components/ui/index.ts` + `rmdir` the emptied `ui/`/`custom/` shells. **`[R5v]` The skip-not-delete bug is CONFIRMED load-bearing at live HEAD:** a codemod that SKIPS (does not unlink) the barrel leaves `ui/` non-empty → the `rmdir` fails → the `no surviving src/components/{ui,custom}` post-condition THROWS (reproduced: `ls src/components/ui/ → index.ts` stranded). The DELETE + post-condition assert is a G7-companion close assertion.
8. **config + docs: adopt the BUILD-SCOPED `componentIdGenerator`** (§7) + sweep stale `components/(ui|custom)/` prose from READMEs + CSS comments (edict-8), **`[R5v]` INCLUDING the `src/index.ts:118` comment `components/ui/tabs/*`** (an import-specifier-only rewrite does not touch doc-comments — a stale doc-comment outside G7's `scripts/` scope, owed a hand-sweep).

- Close battery: G7 + the DIFFERENTIAL resolves-on-disk floor + `proof:subpath-classify` + `proof:build` + the 12 fixture gates + the dead-barrel post-condition + `proof:barrel-pure` (glass-ui GREEN, 0 mixed).

**ATOM B — the CSS-COLOCATION ATOM (§2.6). `[R5v]` SPLIT into B1 + B2.** Orthogonal (`src/styles` untouched by A). Sequenced AFTER A.
- **B1 (byte-identical, PROVEN):** file-move (`src/styles/*.css` → root-sibling `<n>.css` or `<n>/styles/`) + the widened-walk build-transform + colocated-source `index.css` @imports + the walk-flatten-rewrite.
- **B2 (the load-bearing migration cost):** the 81-gate path re-point + the 5 tree-walker corpus-widen (§2.6). Without B2 the close is RED on ~81 gates.
- Gated by G6 (golden hash + basename-uniqueness precondition) + `proof:css-colocation` (+ its SOURCE-reader-gate arm) + `proof:css-ownership`.

- **`[R5]` Domain map** lives in a MACHINE-LOCKED `components/README.md` enumerating ALL 90 families with their virtual domain; viz membership DERIVES from the `useGpuSubstrate` edge ∪ {goo-filter}, `watercolor-dot` tagged `mark`. **No provenance markers. Export surface stable** (package.json `exports` untouched, 0 keys); INTERNAL churn large.

### The residual proportion pass the flatten enables
- `timeline/geometry.ts` STAYS a ROOT SIBLING file (T4). A 2nd helper earns `timeline/lib/`.
- `configurator/`: `useConfiguratorState` (subpath-exported STATE factory) STAYS.
- 500-breachers carve by cohesion (ORTHOGONAL, delta=0): `GlassDock.vue` 515 (T1c), `DockLayerGroup.vue` 524 (T1c script-axis), `useGlassBackdropLuminance.ts` 554 (plain-composable base carve).
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
**Colocation ladder:** story-PRIVATE → `stories/<cat>/<story>/`; category-SHARED → `stories/<cat>/_shared/`; CROSS-category → `chassis/`; app-GLOBAL → `shell/` or root. **Tri-partition:** page SFCs at root, `_shared/` for category chassis, per-story `<story>/` dirs for private helpers. **The closed subtype taxonomy** (stage/specimen/interaction/matrix/composition) mints in `chassis/subtype/` ONLY above a complexity floor (≥~20 stories OR ≥2 categories); glass-ui's rich demo earns it, slides' thin deck does not. **God-SFC escalation:** a story tripping the ratchet becomes a feature dir (aurora model); `blob.vue` 875 + `constellation.vue` 759 → feature dirs (T1b→T1c compose). **Barrel-vs-deep-path:** deep-path for demo-private; index barrel for anything a sibling app consumes.

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
- **`§4P.4` The `api/` FE transport-leaf infra-ring** — ONE `client.ts` + per-resource modules + `types.ts` + explicit re-export `index.ts`; UNIDIRECTIONAL `views/ → stores/ → api/ → client.ts`. **`[R5v]` speedtest SHIPS `scripts/check-internal-boundaries.mjs` — the exact §4P.4 product 4-node-DAG gate** (TIER-1 top-level layers + TIER-2 intra-feature `ui→{composables,state}→engine`; auto-detects `features/<X>/`; `FEATURE_LAYERS={ui,state,engine,composables}`; baseline GREEN, 15 rules). This is the machine precedent the product-DAG gate transposes.
- **`§4P.5` The domain-graduation predicate.** A domain is a `components/<domain>/` GROUP by default; it GRADUATES to a full `features/<domain>/` slice when it acquires presence in ≥3 of `{components/, stores/, api/, composables/}` (`views/` REMOVED from the trigger) OR its own engine/state/domain-logic.
  - **`[R5]` The soft OR-branch, recorded honestly.** The `≥3-of-4` arm is fully decidable; the `OR its own domain-logic` arm is SOFT. `survey` has components+api = **2-of-4** → graduates ONLY via the soft branch (its own colocated domain-logic). The gate records survey under the soft arm with a rationale. A fully-decidable domain-logic criterion is a booked refinement, not a 5.0.0 blocker.
  - **`[R5]` The feature-interior unifying rule (proto-3).** The feature INTERIOR obeys the 500 ceiling identically. **A drain-tripping feature-interior SFC (a bare `ui/` SFC needing a T1b/T1c drain, its own `skeleton/`, or its own `styles/`) PROMOTES to a component-folder-with-index INSIDE the feature's `ui/`** — `ui/<Name>.vue` → `ui/<Name>/{<Name>.vue, index.ts, styles/…, skeleton/…}`. This closes THREE collisions in ONE rule: (a) the double-breach drain gets a dir for T1b's extracted CSS; (b) `state/engine/` and `ui/styles/`/`ui/skeleton/` no longer trip G3 (the segment is now under a component root, which RESETS the depth budget); (c) the feature-`ui/`-segment vs component-`styles/`-segment grammars UNIFY. `features/speedtest/state/engine/` (born-REDs G3 at HEAD) resolves the same: `engine/` earns an `index.ts` (a state sub-component root) OR folds into `state/`. **The carve owner is the APP, not glass-ui.** Recursive sub-domain graduation is in-scope (the METER sub-domain graduates one level down).
  - **`[R5v]` The survey fold surfaces a REAL boundary violation the gate must resolve — a load-bearing finding, not a pure move.** `src/components/survey/composables/useSurveyFlow.ts:12-13` imports `{ variant } from "../SurveyStep.vue"` and `"../SurveyReview.vue"` (two SFC-EMBEDDED `export const variant = "form"/"review" as const`). Under `components/` this is legal (whole subtree = TIER-1 `components`); after graduation to `features/survey/`, the intra-feature stack makes a `composables → ui` (SFC) import a BACKWARD edge that `check-internal-boundaries.mjs` born-REDs. **Ruling:** the graduation MOVES the SFC-embedded `variant` const OUT of the SFC into a colocated non-SFC module (`features/survey/constants.ts` or the `ui/<Step>/` component-folder's `index.ts`), so `composables` reads a peer/downward module, not an SFC in the `ui` layer. This is the SAME clean-break discipline (no SFC-embedded exported logic across a layer boundary) — the graduation gate must run born-RED on this before greening, confirming the boundary is HONEST, not hidden.
  - Live targets (speedtest): `admin` (17, ≥3), `dashboard` (31, ≥3), `survey` (soft-branch) GRADUATE; `speedtest` ALREADY graduated. `features/` is proportion-EARNED, NOT mandatory (slides has none). Fold `survey` FIRST (cheapest, soft-branch) to confirm typecheck + boundary gate + per-route bundle delta green before born-REDing admin/dashboard.
- **`§4P.6` The Pinia T3 split** — a ONE-feature store lives at `features/<x>/state/`; a ≥2-unrelated-family store promotes to app-global `src/stores/`; a domain CLUSTER gets `stores/<domain>/`; plugins get `stores/plugins/`. One store per file.
- **`§4P.7` `styles/` is the app-global design-layer name** — speedtest's `design/`→`styles/` (no content loss); `MOTION-DOCTRINE.md`→`docs/`.
- **`§4P.8` `config/` is the presets-in-consumers home** (file→dir by proportion).
- **`§4P.9` NO root-shell god-SFC exemption — App.vue OBEYS the 500 ceiling.** `[R5v]` speedtest's 833L drains by T1b→T1c compose: T1b (`<style>`+docblock → `./App.css`, non-scoped, generator-INDEPENDENT) leaves 550; T1c carves `AuroraBackdrop.vue` (template L4-55 + render-mode policy) + `useMockResultsGate.ts` (the `?mock-results` DEV gate) → residual **301**. The anti-gaming clause: the file is 64% comment — the drain is STRUCTURAL, comments NOT stripped. Structural-carve conservation PROVEN (moved 509 + residual 277 = 786 ≈ 781 original + 5 added mount lines). slides' 7-line `App.vue` is the target.
- **`§4P.10` `layouts/`** app-global route-frame chrome; cross-cutting → `src/layouts/`, NEVER colocated into a feature.
- **`§4P.11` The entry pair** — the BOOTSTRAP CONCERN (`createApp` + install + mount) + a thin root `App.vue`. speedtest has NO `main.ts` (inline in `index.html` for LCP — legitimate). The gate asserts the concern, never a filename.
- **`§4P.13` The per-sibling migration instrument.** Each SIBLING authors its own instrument from the SHARED repo-agnostic FORMULA (§7), binding its own alias set + graduation renames. G8 propagates the FORMULA + gate scripts; the per-repo alias namespace is repo-local. **`[R5v]` The per-repo barrel-purity figures are HEAD-SENSITIVE and OWED a recompute** — glass-ui's own census undercounted 8→9 this round, so the sibling table below is authored-not-verified; run `proof:barrel-pure` read-only over each sibling's `src/**/index.ts` at the cut:

| Repo | `sideEffects` to add | barrels to un-mix (RECOMPUTE at cut) |
|---|---|---|
| **glass-ui** (Vite 8) | already `["*.css"]` (keep) | **`[R5v]` 9** (8 CVA + `composables/color` → `core.ts`) |
| speedtest (Vite 8) | `["**/*.css","*.css","src/components/dashboard/charts/echartsInit.ts"]` | 1 (`features/speedtest/state/index.ts`) — recompute |
| words/frontend (Vite 8) | `["**/*.css","*.css"]` | 6 (`api/index.ts` priority) — recompute |
| slides (Vite 7) | `["**/*.css","*.css"]` | 0 (clean) — recompute |
| sci-report (via @mkbabb/atlas) | `["**/*.css","*.css"]` (verify atlas honors it) | 0 (clean) — recompute |

**The proportion fence (edict 2):** do NOT force slides/sci-report to grow feature-dir barrels for uniformity — mandating barrels there is the needless-encapsulation vice.

---

## §5 Backend transposition (language-abstracted)

### §5.1 The grammar (identical shape to frontend)
- **Domain/feature PACKAGE** = the backend component folder. Named by DOMAIN, not technical layer.
- **By-PURPOSE segments:** `api/` (routes/handlers), `model/` (domain types/data/rules), `lib/` (pure helpers). Colocate handler+model+logic FOR one domain TOGETHER.
- **Shared home** (`shared/`, `core/`) ONLY for truly-global (≥2-unrelated-DOMAINS).
- **Reject layer-by-type of DOMAIN LOGIC. The scatter check runs RECURSIVELY at EVERY dir level.** Live: `speedtest/server/src/` (top-level) AND the NESTED case — floridify's `api/{core,middleware,repositories,routers,services}/` is a 73-file layer-by-type god-dir ONE LEVEL DOWN; fold each router+repo+service triple into its domain package; `api/core/` is a legitimate nested infra-ring.
- **The infra-ring carve — FIXED constants.** Scatter threshold: a type-named dir holding modules from **≥2 distinct domain stems** IS scatter → dissolve; **≤1 stem** or purely-infra is not. Infra-ring CRITERIA: (a) cross-cutting, (b) NO single domain's business rules, (c) a thin adapter/kernel/policy. Seed allowlist: `middleware/`, `logging/`, `events/`, transport `core/`/`http/` kernel, uniform repository/model base, `config/`, `paths/`, error/exception policy. `proof:backend-structure` (§6 G9) carries this set + the ≥2-stem threshold.
- **The shared-types carve.** A type module read by ≥2 unrelated domains stays a shared registry; a ONE-domain type folds in. floridify `models/` (174 importers) STAYS shared.
- **The orchestration / use-case tier.** A cross-domain PIPELINE (floridify `lookup_pipeline.py` composes 5) lives in `pipelines/` (backend) / app-service tier, importing domain barrels DOWNWARD only. The FE twin is `views/`.
- **No grab-bags.** A `utils.py`/`helpers.go`/`common.ts` of unrelated leaves is a god-module.
- **Depth (T2), import discipline, recursion** — identical: unidirectional, no cross-domain imports except via a package's public API.

### §5.2 Per-language befitting notes (per-language NUMBER, constellation-wide GRAMMAR; each a GATED arm §6 G9)
| Language | Module ceiling | Function norm | Idiom |
|---|---|---|---|
| TypeScript (backend) | 500 raw | short, cohesive | ESM subpath exports; `import type`; barrels PURE RE-EXPORT-ONLY; **declare `sideEffects`**. `proof:*` god-function advisory booked (no ESLint). |
| Python | 500 raw / ~300 soft | Google ~40-line funcs | package = domain dir with `__init__.py` public API; `model.py`/`api.py`/`lib/`; no `utils.py` grab-bag; ruff `C901`/`PLR0915` advisory. **`[R5]` `__init__.py`/`__all__` is pure CONVENTION, NOT enforcement** — a `_secret` in a non-`__all__` module IS cross-package importable (proto-4, real `python3`); the barrel-only discipline for Python is enforced SOLELY by the G9 gate. |
| Go | 500 raw / package-per-domain | short | one package = one domain; `gofmt`; exported identifiers ARE the public API. **Acyclicity IS a compile invariant** (`import cycle not allowed`) — the strongest seam, the model the FE gate emulates. |
| Rust | 500 raw / module-per-domain | short | `mod.rs`/`lib.rs` re-export = the barrel; `pub` = public API. **Encapsulation IS a compile invariant** (a private `mod` → `E0603`). **But import DIRECTIONALITY + ACYCLICITY are NOT** (proto-4, real `rustc`): a module cycle AND a `shared→domain` up-edge both COMPILE CLEAN in a single crate. So directionality remains a **G9(e) gate concern** for a single-crate service; only encapsulation is free. |

Live-backend reproduces §5.2: floridify (41 god-module + 5 grab-bag + 1 top-level layer-by-type; `wiktionary_parser.py` 1198 largest), speedtest/server 4, dns-speedtest 2, greenfield-rs/pulse GREEN.

---

## §6 Enforcement — how the `proof:*` gates evolve

The house machine-locks structure (`proof:colocation`, `proof:no-god-module`). The spec EXTENDS them — no parallel regime — and **every new gate is a device-free `proof:*` script with self-test bites, NOT ESLint**. All FE gates (G1/G3/G4/G6/G7) + the backend gate (G9) are PROTOTYPED in `proto-gates/`, born-RED on HEAD. Registers stated per gate.

**G1 — `proof:colocation` extends (the FOLD end). Register `["local","ci"]`.** KEEP the README-marker binding. ADD the globality clause (T3), the no-empty-segment clause (T4, covering a 1-file `lib/` AND a 1-sheet `styles/`). SCOPE-EXTEND to `demo/`. **`[R5]` The dropSegment WIDENS the gate's scan from `custom/` to all of `components/` — a SEMANTIC change** (in the close battery, not a cosmetic swap); **`[R5v]` confirmed PASSES on the flat tree** (`readme-map=true`, `dock-leaf-verify stale-dead-refs=0`) — a valid semantic change, not a false-green. **`[R5]` The README=enrollment equivalence:** a `README.md` ENROLLS its dir in the complex-dir proportion clauses, so a TRIVIAL dir must NOT carry a courtesy README (or it is silently subjected to the composables/constants proportion gate) — the gate exempts a dir whose only complexity signal is a courtesy README with no segment members. *(Prototyped 6/6.)*

**G2 — `proof:no-god-module` unifies across `.ts`/`.vue`/`.css`. Register `["local","ci"]`.** ONE `HARD_LIMIT=500` RAW, a `~300` advisory soft-target (shader-literal + data-manifest + extracted-SFC-style T1b exempt). The `.vue` arm counts `<template>+<script>+<style>` RAW; **`[R5]` the drain dispatch is a SEQUENCE-then-TREE** — a `<style>`-mass breach → T1b, RE-MEASURE, a residual script/template-mass breach → T1c; a T1c carve may birth a re-breaching child needing its own drain; a plain over-500 `.ts` → the base cohesion carve. The CSS arm is a cohesion-carve BOUND by byte-identical fence + source-order preservation.
- **`[R5v]` The anti-gaming DETECTOR is DECIDABLE: NON-BLANK-LINE CONSERVATION.** When a ratchet-tracked file crosses 500→<500 in a diff, the removed non-blank lines MUST be traceable to new/grown sibling files (git `-M`/`-C` move-detection or content-hash match), ELSE flag. The signature of a structural carve is `moved + residual ≈ original` (delta = the added mount/call lines); a comment-strip shows deleted content with NO absorbing sibling. Pin the git-similarity threshold (`-C50%` or content-hash) so a legitimately DE-DUPLICATING carve (total non-blank shrinks) is not false-flagged. This is the SOLE barrier to draining by deleting load-bearing DDR narratives (App.vue: 530 comment lines, comment-strip alone clears 500).

**G3 — `proof:depth` (new). Register `["local","ci"]`.** The T2 cap — no segment dir under a segment dir (unless the inner carries `index.ts` → recursion reset); depth beyond ≤5 below the nearest feature/component root needs a recorded rationale. **`[R5]` The feature-interior rule (§4P.5) is the resolution** when a graduated feature's `ui/`/`state/` segment would nest a segment — the inner earns an `index.ts` rather than born-REDing G3. *(Prototyped 5/5.)*

**G4 — `proof:import-boundaries` (new — the PROMOTE end). Register `["local","ci"]`.** The 4-node DAG; subpath-entry reaches both directions; `composables/` never reaches `components/` (except the `export *` aggregator carve); no cross-component GUTS reach; one-barrel public API with the deep-leaf subpath exemption. Born-RED with 25 cross-component guts reaches. The DI-context sub-ruling: a reach into a `createStrictContext`/`createOptionalContext` module imported by ≥2 FOREIGN families → PROMOTE. Self-test 11/11. Scope-extends to the product-app DAG (§4P.4; speedtest's `check-internal-boundaries.mjs` is the precedent). **`[R5]` A cycle-detection arm (component→sibling-BARREL edges forming an A↔B pure-re-export SCC) is BOOKED for the deferred barrel-discipline pass (§9.3), NOT the 5.0.0 flatten (graph-invariant).** *(Prototyped, FAIL on HEAD by design.)*

**G5 — location-vs-publish orthogonality. Register `["local","ci"]`.** Physical location by G1's family clause; publish surface by the SCC/heavy-peer discipline. A colocated PUBLIC composable is never flagged for being public.

**G6 — the CSS pair (§2.6). `[R5]` Register `["ci","release"]` on BOTH arms** (a basename collision under the basename-keyed generator = two SFCs sharing one `data-v-` scope-id = a silent CSS scope-leak, a rendering-correctness defect):
- **`proof:css-colocation` (new, TARGET gate):** every colocated CSS flattens to a UNIQUE `dist/styles/` target (no clobber); **the copy UNIT is the cascade CSS SUBTREE** (root-sibling sheet OR `styles/` top+partials moving atomically — dock's 17 partials verified within `styles/`); **`[R5v]` the walk globs `src/components/**/*.css` MINUS `**/styles/**` (any-depth single sheets) UNION `src/components/**/styles/` (subtrees)** — the disjoint-two-glob form catching nested/recursive components; a golden sorted-hash manifest of the shipped `/styles` (BOTH `dist/styles/index.css` sha `675249ea` AND the SFC-fold `dist/glass-ui.css`, 106+ files) reds any byte drift; **`[R5v]` the SOURCE-@import arm asserts every `index.css` @import resolves at SOURCE** (the demo-HMR constraint); the T1b-walk convention (SFC-`<style src>`-extracted files NOT double-emitted — a HARD assertion; a synthetic double-emit fires born-RED); the SOURCE-reader-gate arm asserts no gate reads a colocated CSS by its retired `src/styles/<name>.css` path (the **`[R5v]` 81-gate movable-component-path corpus** + the 5 tree-walker corpus-widen). PLUS the zero-scoped-id-collision arm (all `data-v-` ids distinct — 41 today) PLUS the basename-uniqueness precondition arm.
- **`[R5v]` The golden-hash gate stays GREEN through the flatten IFF the BUILD-SCOPED basename `componentIdGenerator` (§7) is adopted — EXECUTED born-RED→GREEN this round as the machine witness:** four real `vite build`s (plugin-vue 6.0.7) with a real scoped-SFC move — H1 default@HEAD `564b2c7f`, H2 default@MOVED `71564867` (≠H1 → **RED**), H3 basename@MOVED `898a06cf`, H4 basename@HEAD `898a06cf` (==H3 → **GREEN**). The golden `/styles` hash DRIFTS under the default generator and is BYTE-IDENTICAL under basename. **The wave MUST re-execute this born-RED→GREEN at the cut** (rotate the golden hash once at basename adoption; watch it red under default, green under basename) — that execution IS the witness the correct generator was adopted; NOT settled from a dry-run (round-3 was empirically WRONG on this exact surface). The basename-uniqueness precondition arm's scan surface is **253 src `.vue`** (build-scoped generator — 0 dup, HOLDS); if the generator were global it would have to scan **428 src+demo** (1 collision, RED — §7).
- **`proof:css-ownership` (interim). Register `["local","ci"]`.** Every `src/styles/*.css` that STAYS global names its single owner via `README OWNER:`. *(Prototyped 5/5.)*

**G7 — the enforcement-corpus migration meta-gate (`proof:no-tier-literal`) — SHIPPED. Register `["local","ci"]`.** After the flatten, assert ZERO surviving `components/(ui|custom)/` literal in `scripts/`. All-text-extension + recursive scan (scripts/ is NEITHER typechecked NOR test-resolved, so G7 is the SOLE structural witness). Detector `= /(?:@glass\/)?components\/(ui|custom)(?=[/"'\`)\s]|$)/g`. Born-RED at 865 across 229 files. Self-test 9/9. The gate AND the codemod share ONE all-text-recursive file-set (**`[R5v]` all 229, not the 218 `.mjs`-only** — the 11 `wf-ay-*.js`/subdir-`.mjs`/`.vue`-fixture files must be covered or G7 stays RED); the codemod lands ATOMICALLY.

**G7-companion — the post-flatten CLOSE BATTERY (CRITICAL). `[R5v]` The DIFFERENTIAL resolves-on-disk anti-evasion floor.** G7-GREEN (0 literals) is NECESSARY but NOT SUFFICIENT — G7 asserts literal ABSENCE, not path CORRECTNESS, and is BLIND to the dead-barrel mis-target (the 3 gates re-pointed to a non-existent `components/index.ts` carry no `ui|custom` literal). The close battery MUST:
- **`[R5v]` assert `{post-flatten danglers} \ {pre-flatten danglers} == ∅` (flatten-induced = 0), NOT an absolute "every path resolves".** The tree carries **46 pre-existing stale-ref danglers** (retired `goo-dot-matrix`/`paper-grid`, DEC-8 `underline`, `color-picker` in `wf-ay-*.js` history, `_selftest-*` fixtures, `.test.ts` paths that live in `tests/` not `src/`) — ALL orthogonal to the flatten; an absolute floor false-REDs on these 46. The correct anti-evasion floor is the DIFFERENTIAL: pre-flatten `both-resolve=667, pre-existing-dangle=46`; post-flatten the flatten-INDUCED danglers must be EXACTLY 0 (this round's uncorrected uniform drop produced 3 — the dead-barrel mis-target — caught SOLELY by the differential, invisible to G7). **Mechanism ruling:** compute the 46-dangler baseline from a PRISTINE checkout at gate-run time (a second worktree) OR — the SIMPLER 5.0.0-clean path — PRUNE the 46 stale refs as part of the `scripts/` god-dir disposition (§9), making the floor ABSOLUTE-clean rather than differential. **RULING: prune in 5.0.0 (no-legacy edict), fall back to a frozen-allowlist differential only if the prune is deferred.**
- run `proof:subpath-classify` + `proof:build` (`[R4]` proof:build is INDEPENDENT of the policy rewrite since `libraryEntries` sources a curated map + the `subpaths/*.ts` glob, NOT `readTree` — build-verify the flatten FIRST, then the policy rewrite gates classify/regen-exports/regen-structure);
- run the 12 fixture-reading gates (tests-dir soundness);
- run the 81-gate/tree-walker CSS-reader corpus (colocation soundness, B2);
- **`[R5]` list `proof:colocation`'s dropSegment as SEMANTIC-not-cosmetic;**
- assert the dead-barrel post-condition (`no surviving src/components/{ui,custom}`);
- **`[R5v]` assert the DEAD-BARREL GATE-RECONCILE landed** (proof-tabs-std's vacuous ui-barrel-read RETIRED + `tabs/primitives` witness re-pointed; proof-consumers-static + proof-component-orphan dead-string pruned);
- **`[R5v]` assert `proof:barrel-pure` GREEN on glass-ui — 0 mixed (the 9-barrel un-mix landed).**

**G8 — constellation propagation. `[R5]` G8 promotes ONLY the LAW half (§0–§6)** to the precepts submodule (the runbook §7–§9 + Appendix D stays BH-tranche-local). Gate SCRIPTS live per-repo; the LAW is the single source. Audit items: (1) each sibling declares `sideEffects`; (2) each sibling authors its migration instrument from the shared formula. Two sibling gates: `proof:sibling-sideEffects` (declaration exists + array form + covers CSS + names every bare-registration import) and `proof:barrel-pure` (no barrel mixes own runtime exports with re-exports — a HARD blocking gate for the 3-of-4 Vite-8 repos AND glass-ui itself). **`[R5v]` `proof:barrel-pure` is AUTHORED + PROVEN LOAD-BEARING** (`proto-gates/proof-barrel-pure.mjs`): scans `src/**/index.ts`; MIXED := ≥1 own runtime export (`export const|let|var|class|function|default` NOT via `from`, comment-stripped) AND ≥1 re-export; TYPE-ONLY exports (`export type`/`interface`) exempt (DCE-erased). 6/6 self-test bites pass; born-RED on the main tree (9 mixed) → GREEN after un-mix (0) → re-introduction bite (`export const _regression = cva(...)` appended → EXIT 1). NOT vacuous. Recommend both arms `['ci','release']`.

**G9 — `proof:backend-structure` (new — edict-6) — RATIFIED + WIRED. Register `["local","ci"]`.** The backend twin of G2+G4, language-abstracted. Six arms: (a) file-length ceiling (`wc -l`, hard 500/soft 300); (b) grab-bag detection (with the cohesive-leaf carve); (c) layer-by-type-of-domain-logic — the ≥2-distinct-domain-stem threshold RECURSIVELY at EVERY dir level; (d) depth (T2); (e) import-direction — a per-language RESOLVER; (f) god-FUNCTION advisory (ruff `C901`/`PLR0915`). **`[R5]` The `--self-test 9/9` ENUMERATES which bite covers which language** (a python `..`-arithmetic bite, a rust `crate/super` bite, a ts relative-path bite) — so a stubbed per-language resolver cannot pass the aggregate while leaking directionality (proto-4: directionality LEAKS in all four languages, so the resolver is load-bearing and its per-language coverage must be verifiable). Born-RED on floridify (47 arm-hit: 41 god-module + 5 grab-bag + 1 top-level layer-by-type) + speedtest/server (4) + dns-speedtest (2); GREEN on greenfield-rs/pulse.

**G10 — `proof:no-glass-in-dist` (new — the src-stays-relative permanent lock). Register `["ci","release"]`.** Assert ZERO `@glass` specifiers in `dist/*.d.ts`. glass-ui ships NO dts-alias resolver, so ANY src file on `@glass` would emit unresolvable specifiers into the SHIPPED types — a highest-severity publish defect. Born-REDs the instant a future wave migrates a src file to `@glass`.

---

# ═══ RUNBOOK (§7–§9 + Appendix D) — the one-time 5.0.0 migration, BH-tranche-local ═══

## §7 Migration posture — clean break, gestalt transposition

- **No legacy, no aliases.** The flatten, the FOLD/PROMOTE/PROMOTE-context reshape, the CSS colocation, the demo tri-partition, the §4-PRODUCT graduations are MOVES — position-preserving where byte-identical-carve applies, gestalt-reshaping where structure demands. No compat shim survives a fold. Grep-locked comments carry VERBATIM into the host file.

- **The named migration instrument (the HYBRID).** `@glass` is the CROSS-PUBLISHED-BOUNDARY / consumer alias (demo, tests, scripts, siblings); the PUBLISHED `src` tree stays RELATIVE (dts self-containment + within-atom colocation cohesion).

- **The move-map is TWO independently-gated ATOMS** (ATOM A internal sequencing + close battery per §3; ATOM B split into B1/B2 per §2.6). The recompute formula (repo-agnostic, no module resolver): `newSpecifier = normalize(relative(elide(dirname(F)), elide(resolve(dirname(F), S))))`; `elide` is a UNIFORM segment-drop. Each SIBLING authors its own instance (§4P.13).

- **`[R5v]` The `componentIdGenerator` ruling — BASENAME-keyed AND BUILD-SCOPED.**
  - **BASENAME.** `@vitejs/plugin-vue` 6.0.7 defaults `descriptor.id = getHash(normalizePath(relative(root, filename)) + (isProduction ? source : ''))` — **path+source**. `dist/glass-ui.css` carries `data-v-XXXX` scoped selectors (41 of 253 SFCs), so the flatten (which changes BOTH path AND import-rewritten source) ROTATES every scope-id. The round-3 "scope-id keyed on SOURCE CONTENT / byte-identical under default" ruling is EMPIRICALLY FALSE (mechanism isolated: `getHash('src/components/custom/pulse/Pulse.vue' + source) = b90507f0` = the dist `data-v-b90507f0`; a move rotates it `b90507f0`→`85658882`). **RULING: `getHash(BASENAME)`** — `componentIdGenerator: (fp, _s, _p, getHash) => getHash(fp.split('/').pop())`. Build-PROVEN: 0 collisions across ALL 253 SFCs; byte-IDENTICAL `dist/glass-ui.css`; the ONLY generator invariant to {directory move, `<script>` import rewrite, `<style>` extraction (T1b), script/template carve (T1c), the 9-barrel un-mix}. One-time cost: 100% of the 41 scoped ids rotate exactly ONCE at the 5.0.0 cut (H1 `564b2c7f`→H4 `898a06cf`).
  - **`[R5v]` BUILD-SCOPED (the new correction).** A GLOBAL `vue({ features: { componentIdGenerator } })` is safe for the published dist BUT DEGRADES the dev server: `Notification.vue` exists at BOTH `src/components/ui/notification/Notification.vue` AND `demo/stories/dock/examples/Notification.vue` (both `<style scoped>`), so under a global basename generator BOTH dev modules serve `data-v-9e26d10b` (proven live via curl against the running `:5199` dev server) → scoped-CSS bleed + `__hmrId` collision. **RULING: gate the generator to `command === 'build'`** (the function-config form `defineConfig(({command}) => …)` — a small structural edit to `vite.config.ts`'s current object-form the CODEMOD specifies) so it applies ONLY to the library build. Golden invariance kept; dev/serve stays on the default path-keyed generator (collision-free); `demo/vite.demo-dist.config.ts` (a bare `vue()`) is naturally unaffected and MUST stay bare (the deployed demo has no golden-hash gate and inherits the Notification collision, so it correctly stays on the default). This strictly DOMINATES the alternative (global generator + rename the demo Notification.vue + enforce full-dev-graph basename uniqueness — a fragile standing constraint on every future demo example file).
  - **The basename-uniqueness precondition arm scans the surface the generator APPLIES TO** — build-scoped → assert 0 dup basenames over **253 src `.vue`** (holds); this is the SOLE precondition of the zero-collision guarantee.
  - **`[R5v]` Scoped-style HMR CONFIRMED under basename** (real-browser smoke test): editing a `<style scoped>` produced `[vite] hmr update /Widget.vue?vue&type=style&…&scoped=dc8af4ae` (a STYLE hot update, not a reload); the window sentinel SURVIVED; color hot-applied; scope-id stable. T1b/T1c are byte-neutral under basename BY CONSTRUCTION (both change SFC bytes, not the filename).

- **REJECTED: the src→`@glass` whole-tree re-open** — LEAKS `@glass` into the PUBLISHED `.d.ts`. Locked permanently by G10.

- **`[R5v]` Chunk-graph churn — the 5.0.0 ATOMS MEASURED (scoped claim):**
  - **The FLATTEN is +0 gzip** (entry-count-preserving; `libraryFileName` keys dist filenames on the ENTRY NAME; re-confirmed 190 chunks).
  - **The FOLDS are +29 gzip** (two folds add +14/+13 to D5-EXEMPT shared chunks).
  - **The PROMOTE-primitive class is BYTE-NEUTRAL** (190→190 chunks, 414001→414001 gzip).
  - **The PROMOTE-context class is a per-route WIN** (`dockContext` promote → −327 gzip on EACH of 5 foreign routes; the dock route nets −122 gz). **"Performance above all" SATISFIED.**
  - **`[R5v]` The 8 CVA un-mix is byte-neutral (190→190); the color un-mix is +1 JS chunk (190→191), a benign DCE-granularity GAIN** (the shared color-core splits out as its own tree-shakeable chunk, already reached by aurora/blob/border-progress — almost certainly `profile:budget`-neutral, re-run the budget gate at the cut). CSS golden hash byte-identical across baseline/8-unmix/9-unmix/color-remix builds.
  - **Content-hash CHURN is TWO items:** (1) the 6-chunk PROMOTE rehash; (2) the ONE-TIME scope-id rotation at basename adoption. `profile:budget` compares per-chunk by BASENAME (hash-stripped), scoped to the 6 PROMOTE chunks.
  - **`[R5]` NOT covered — the DEFERRED guts→sibling-BARREL reroute class (§9.3).** Its production DCE-neutrality for PURE re-export barrels rests on Rolldown lazy-barrel DCE being reliable, for which the spec cites only the mixed-barrel #21966 DISQUALIFICATION, never a positive pure-barrel proof. OUT of 5.0.0; DCE-neutrality measured BEFORE the deferred barrel-discipline pass.
  - *(Caveat: `profile:budget` is ALREADY RED at HEAD on PRE-EXISTING causes — goo-blob ceiling + stale AP D5 baseline — owned by the BG close-battery.)*

- **Zero PUBLIC-EXPORT churn** (the subpath surface is `src/*.ts` entry files, untouched; 0 package.json keys) + the internal rewrites + scripts + ~91 dir moves + tests-dir + CSS-reader sweeps + the 9-barrel un-mix.

- **Whole-tree, not incremental** (edict 8). **Sequencing:** this reshape is a `src/`+`demo/`+`tests/`+`scripts/`+build-plugin+`vite.config` write-set; sequences AFTER the owning BG waves per the BH interleave, lands in the joint 5.0.0 cut. Atom A before Atom B (B1 before B2); the graduation folds (§4P.5), G7/G9/G10, and the sibling G8 gates land as gated execution sub-waves with born-RED proofs. The `/api` drop is orthogonal.

---

## §8 Settled matters (restated, NOT reopened)

1. The 500-line no-god-module ratchet exists, drains to ∅, counts RAW lines, no permanent length exemption — only shader-literal + data-manifest (T1a) + SFC `<style>`-mass (T1b) + SFC script/template-mass (T1c, composing with T1b into a TREE for double-breachers) carves; a plain over-500 file drains by the base cohesion carve. A doc-inflated file drains by STRUCTURAL carve, not comment-stripping (the G2 conservation detector). The 500 ceiling binds product-app feature interiors + backend packages identically.
2. `proof:colocation` exists (4 clauses); the spec extends it (§6 G1).
3. The ≥2-consumer visual-load-bearing invariant (J-inv-10) is the promotion bar, generalized to non-visual leaves (T3) with a decidable count over THREE placement cases — FOLD, PROMOTE-primitive, PROMOTE-context.
4. The SCC/heavy-peer publish discipline is preserved and ORTHOGONAL to physical location (§2.5, 4-node DAG).
5. The clean-break/no-back-compat law, presets-in-consumers, byte-identical-carve are the migration constitution.
6. The load-bearing `index.css` cascade order is INVIOLATE; CSS colocation keeps a byte-identical PUBLISHED cascade via approach (i); the SFC-fold `dist/glass-ui.css` stays byte-identical via the BUILD-SCOPED BASENAME `componentIdGenerator` (§7).
7. `subpaths/` glob-batch generation is an accepted mechanical exception — kept.
8. The Vue `composables/` essence-name is a recorded FSD divergence — kept; `lib/` its pure-helper sibling; `views/` (not FSD `pages/`) the product-app divergence. `composables/context/` is the DI CONTRACT home. `variants.ts` is the CVA sibling; **`[R5v]` `core.ts` is the own-runtime-function sibling** (the color pattern) — barrels stay pure.
9. **FLATTEN `ui`+`custom` is settled → a PURE FLAT namespace (NO physical sub-tier).** The viz DOMAIN is VIRTUAL (a machine-locked README domain-map deriving membership from the `useGpuSubstrate` edge ∪ {goo-filter}, `watercolor-dot` tagged mark-not-viz-domain). `ui/tabs → tabs/primitives` is the sole non-uniform component case; the `subpath-policy.mjs` two-set merge (`tabs=PUBLISH`) is the sole non-uniform SCRIPT case; the scripts `dropSegment` is otherwise UNIFORM. **`[R5v]` The migration instrument is ONE uniform dropSegment PLUS TWO semantic reconciles** (subpath-policy two-set merge + the dead-barrel gate-reconcile). `@glass` is the CONSUMER-tree alias; src stays RELATIVE.
10. `src` stays RELATIVE (dts self-containment, G10). The migration instrument is the TWO-ATOM move-map scanning BOTH specifier spaces; each sibling authors its own from the shared formula.
11. **Barrels are PURE RE-EXPORT-ONLY + `sideEffects` is a binding barrel precondition constellation-wide** (§2.1); **`[R5v]` glass-ui un-mixes its OWN NINE barrels** (8 CVA + `composables/color`; the CVA-co-export convention SUPERSEDED); the four siblings each carry a per-repo `sideEffects` + un-mix step (recompute at cut). Slides/sci-report keep 0 barrels (the proportion fence).
12. **The `viz/` physical sub-group is DROPPED** (round-4 → round-5); the domain survives virtually. **The god-document law/runbook seam is recorded** (§0–§6 LAW, §7–§9 RUNBOOK; G8 promotes the LAW half only).

---

## §9 The execution-carve ledger (decisions made; mechanics to encode)

No design question remains open at blocker-severity. Named EXECUTION carves:

1. **The T1b/§2.6-walk double-emit convention (RULED):** the walk copies the cascade CSS SUBTREE; a `<style src>`-extracted scoped file rides the SFC fold and is SKIPPED. A HARD `proof:css-colocation` assertion (synthetic double-emit fires born-RED).
2. **The T1b→T1c compose-TREE carve (RULED, §1.3, `[R5v]` measured):** GlassDock 515 (→230/→489), DockLayerGroup 524 (→141), App.vue 833→301, SpeedtestResults 2265→374 drain by T1b THEN T1c re-measure, recursing on re-breaching children (speedtest has 4 feature breachers). +reader-follow cost; the useX-symmetry lift is elected, not forced; grep-locked comments carry verbatim; doc-inflation drains structurally via the G2 conservation detector.
3. **The barrel-vs-deep-leaf discipline (CARVE):** the recompute preserves existing reach depth (no forced re-barrelling in the flatten wave); a barrel-discipline census is a later pass. **`[R5]` A G4 cycle-detection arm + a POSITIVE pure-barrel Rolldown DCE measurement are BOOKED** for that deferred pass (the spec cites only the mixed-barrel #21966 disqualification, never a positive pure-barrel proof).
4. **The subpath-policy semantic rewrite (RULED, §3):** collapse `TIERS` two-tier → two-set with `CLASS={...UI_CLASS,...CUSTOM_CLASS}` (`tabs=PUBLISH`); NO viz-descent; close battery runs `proof:subpath-classify` + `proof:build` (build-verify FIRST).
5. **The tests-DIRECTORY flatten + fixture-gate re-point (RULED, §3):** move `tests/components/{ui,custom}/X → tests/components/X` (uniform), re-point the 12 fixture gates.
6. **`[R5v]` ATOM B split (RULED, §2.6):** B1 = file-move + widened-walk + colocated-source @imports + walk-flatten (byte-identical, proven); B2 = the 81-gate movable-path re-point + the 5 tree-walker corpus-widen (`proof:no-layout-animation` et al. widen their root the SAME way the build widened). **Open mechanism (booked): a canonical component-CSS LOCATOR leaf** (a `src/styles`↔component map both the walk AND all specific-reader gates import) would convert the recurring 81-gate blast radius into a single seam — but the no-legacy edict argues against an indirection layer; ruled DEFER (mechanically rewrite the 81 gates for 5.0.0; revisit the locator leaf if a 2nd placement change recurs).
7. **The BUILD-SCOPED BASENAME `componentIdGenerator` adoption (RULED, §7, PROVEN):** `getHash(fp.split('/').pop())` gated to `command==='build'` (function-config `vite.config.ts`); validate 0-collision over 253 src `.vue`, EXECUTE the golden gate born-RED→GREEN, run the `vite dev` HMR smoke test (confirmed passing this round). `demo/vite.demo-dist.config.ts` stays bare `vue()`.
8. **`[R4]` The dead-barrel EXPLICIT DELETE + post-condition + `[R5v]` gate-reconcile:** `unlink src/components/ui/index.ts` + `rmdir ui/`/`custom/` + assert `no surviving src/components/{ui,custom}`; RETIRE proof-tabs-std's vacuous ui-barrel-read (keep the `tabs/primitives` witness); PRUNE the dead barrel-path strings in proof-consumers-static + proof-component-orphan.
9. **`[R5v]` The glass-ui + sibling `sideEffects` + barrel-purity propagation (G8):** the glass-ui NINE-barrel un-mix (8 CVA → `variants.ts` + `composables/color` → `core.ts`, ATOM A) + the per-repo table (recompute at cut) + `proof:sibling-sideEffects` + `proof:barrel-pure` (glass-ui-inclusive, authored + self-tested this round); the proportion fence keeps slides/sci-report at 0 barrels.
10. **`[R5v]` The feature-interior promotion rule (§4P.5, proto-3):** a drain-tripping feature `ui/` SFC promotes to a component-folder-with-index inside `ui/`, resolving `state/engine/` + `ui/styles/` + the double-breach-no-drain-target collisions in ONE rule; fold `survey` FIRST (soft-branch), resolving its SFC-embedded `export const variant` boundary violation (move the const out of the SFC into `constants.ts`/a component-folder `index.ts`) before born-REDing admin/dashboard; confirm typecheck + `check-internal-boundaries.mjs` (speedtest's live product-DAG gate) + per-route bundle delta green.
11. **`[R5v]` The `scripts/` god-dir disposition doubles as the resolves-on-disk cleanup (§6 G7-companion):** the 46 pre-existing stale-ref danglers (retired viz, DEC-8 underline, `color-picker` in `wf-ay-*.js` history, `_selftest-*` fixtures, tests-tree paths) PRUNE as part of the `scripts/` god-dir disposition (498 text files; the 37 `wf-*.js` + `_reflect-*/_reshoot-*` one-shots → a `scripts/tranche-history/` home OR a no-legacy prune) — making the resolves-on-disk floor ABSOLUTE-clean rather than differential (the differential + frozen-allowlist is the fallback if the prune is deferred).
12. **The `profile:budget` basename-keying confirm + the color +1-chunk re-run:** confirm basename-keying before the 6-chunk rehash; re-run the budget gate against the 191-chunk color-un-mix tree at the cut; `curlFBM` real edge is `concentric → liquid-grid/index.ts`.

---

## Appendix A — worked examples (verified)

**A1 — The dock split-brain (FOLD census).** Of 8 shared-tree composables round-1 named "dock-only," exactly ONE folds: `useDockCtaReceive` → dock/composables/. The 7 others STAY-SHARED.

**A1′ — PROMOTE-primitive (25 buried primitives).** `budget.ts` (12/7 viz) → shared; `procedural-color.wgsl.ts` (6 shaders) → `composables/glass/webgl/shaders/`; `useDockHold.ts` (`ui/slider`) → promote with `dockContext`; `curlFBM` (`concentric` → `liquid-grid/index.ts`) → shared field operator.

**A1″ — PROMOTE-context (proven).** `dockContext.ts` (5 non-dock families) → `composables/context/dockContext.ts` (InjectionKey + helper + `DockOrientation`/`DockLayout` + inlined `DOCK_CONTEXT_LABEL`; SFC-free). Typecheck 0, build 0, `/dock` byte-stable, +0 backward edges, −327 gz/route ×5.

**A2 — Single-family subtree.** `composables/sortable/` (860L) → `sortable-list/composables/`. `/virtual`+`/sidebar` (0 in-repo) STAY module-level (T3a).

**A3 — God-SFC family asymmetry.** `blob.vue` (875L) + `constellation.vue` (759L) → feature dirs.

**A4 — Atomization cluster.** `labeled-field/` 5 `Labeled*` → ONE generic + typed slot.

**A5 — The provenance flatten.** `components/{ui,custom}/*` → `components/*` (**`[R5]` 90 barrel-bearing families, ALL flat peers + `_shared` exempt; 91 dirs; viz VIRTUAL in the README**), `ui/tabs→tabs/primitives`, `subpath-policy.mjs` two-set merge (`tabs=PUBLISH`), the dead `ui/index.ts` EXPLICITLY DELETED + the 3-gate dead-barrel reconcile, the glass-ui **NINE**-barrel un-mix, machine-locked README domain-map, tests-dir flatten mirror, zero EXPORT churn. **`[R5v]` re-PROVEN GREEN at live HEAD:** typecheck 0, vite build 190 chunks, classify EXACT_REPRODUCTION=true, 94/94 subpaths resolve.

**A5′ — The T4 self-fix.** `timeline/geometry.ts` STAYS a root sibling. Frontend `lib/` earned by a 2nd helper; a single cascade sheet stays `components/<n>/<n>.css`, `styles/` earned by a 2nd.

**A6 — §4-PRODUCT graduation (speedtest).** `admin`/`dashboard` (≥3) + `survey` (soft-branch) GRADUATE into `features/<domain>/{ui,state,api,composables,lib,config,constants,types,index.ts}`; feature INTERIORS obey the 500 ceiling; a drain-tripping `ui/` SFC promotes to a component-folder-with-index inside `ui/` (resolving `state/engine/` G3); **`[R5v]` the survey fold resolves its SFC-embedded `export const variant` boundary violation** (const out of the SFC); `views/` stays app-global; `design/`→`styles/`; `App.vue` 833→301 (T1b non-scoped → `AuroraBackdrop` + `useMockResultsGate`); the sibling `sideEffects`/barrel-purity step.

**A7 — Backend reshape (floridify + speedtest/server).** floridify `models/` (174) — shared schema-registry carve; `lookup_pipeline.py` → `pipelines/`; 41 god-modules drain under G9; the NESTED `api/{routers,repositories,services}/` layer-by-type dissolves file-by-file into domain packages, `api/core/` stays a nested infra-ring. speedtest/server `routes/`+`services/`+`validation/` dissolve.

---

## Appendix D — the round-5 VERIFICATION correction ledger (`[R5v]` — folds beyond the canonical's 15)

| # | Canonical claim (round-5-close STRUCTURE-SPEC.md) | Round-5 VERIFICATION finding (EXECUTED) | Correction | Where |
|---|---|---|---|---|
| v1 | "8 mixed CVA barrels" everywhere | running `proof:barrel-pure` over all 116 `src/**/index.ts` found a 9th — `composables/color/index.ts` (own=9 color fns + 2 re-exports; ALSO the `/color` subpath entry). After un-mixing only 8, proof:barrel-pure STAYS RED | **NINE barrels; `composables/color`→`core.ts` + pure barrel** | §2.1, §3, §4P.13, §8.11 |
| v2 | "the 8-barrel un-mix is byte-neutral" | 8 CVA are byte+chunk-neutral (190→190); the color un-mix is CSS-byte-identical but +1 JS chunk (190→191) — a benign DCE split-out | **record the color +1-chunk as a benign DCE GAIN, re-run profile:budget at cut** | §2.1, §7 |
| v3 | migration = "ONE uniform dropSegment PLUS exactly ONE semantic rewrite" | a uniform drop mis-points 3 gates reading/witnessing the deleted `ui/index.ts` to a non-existent `components/index.ts`; G7 is BLIND (no `ui\|custom` literal) | **ONE uniform dropSegment PLUS TWO semantic reconciles** (subpath-policy + the DEAD-BARREL gate-reconcile: retire proof-tabs-std's vacuous ui-barrel-read + prune 2 dead-string gates) | §3, §7, §9.8 |
| v4 | G7-companion "assert every re-pointed path RESOLVES" (absolute) | the tree carries 46 pre-existing stale-ref danglers an absolute floor false-REDs on; the uniform drop's 3 flatten-induced danglers are caught SOLELY by the differential | **DIFFERENTIAL floor: `{post}\{pre}==∅`; PRUNE the 46 in 5.0.0 (no-legacy) to make it absolute-clean, frozen-allowlist fallback** | §6 G7-companion, §9.11 |
| v5 | scripts codemod scope stated loosely | `scripts/*.mjs` (218) MISSES 11 (`wf-ay-*.js` history, subdir `.mjs`, a `.vue` fixture) that G7 scans → G7 stays RED at 11 | **ALL-TEXT-RECURSIVE over all 229, excluding only subpath-policy.mjs** | §3, §6 G7 |
| v6 | README domain-map derives viz from `PROCEDURAL-SUITE.md` prose | the SSOT is STALE by 3 (lists retired paper-grid + non-substrate watercolor-dot, omits liquid-grid); locking the roster wrongly enrolls watercolor-dot | **authority = the LIVE `useGpuSubstrate` edge ∪ {goo-filter}=9; FAMILY(superset)≠DOMAIN(subset); watercolor-dot tagged `mark`; PROCEDURAL-SUITE.md reconcile is a BG-owed migration precondition** | §3 |
| v7 | generator adopted GLOBALLY (`vue({features:{…}})`) | a global basename generator collides the src↔demo `Notification.vue` pair (both `data-v-9e26d10b`, proven live) → dev scoped-CSS bleed + HMR-id collision | **BUILD-SCOPED (`command==='build'`, function-config); precondition arm scans 253 src (holds); demo:dist stays bare `vue()`** | §7, §6 G6 |
| v8 | ATOM B = "the 107-ref/261-file reader re-point" | B1 (file-move+walk) is byte-identical/trivial; the LOAD-BEARING cost is 81 gates hardcoding a movable component-CSS path + 5 tree-walkers that develop a genuine correctness BLIND SPOT | **split ATOM B → B1 (proven byte-identical) + B2 (81-gate re-point + 5 tree-walker corpus-widen)** | §2.6, §7, §9.6 |
| v9 | index.css @imports "keep dist-relative `./X.css`, walk re-materializes" | `demo/demo.css` imports the SOURCE `../src/styles/index.css` for HMR — dist-relative source @imports DANGLE → break demo HMR | **index.css @imports reference COLOCATED SOURCE paths; the publish walk flattens them to `./X.css` for dist** | §2.6 |
| v10 | G2 anti-gaming stated as POLICY | App.vue is 64% comment (530 lines, not ~120); comment-strip ALONE clears 500 (251 code) — the gate IS gameable | **decidable DETECTOR: non-blank-line CONSERVATION (moved+residual≈original via git -M/-C), pinned similarity threshold** | §1.3, §6 G2 |
| v11 | T1b→T1c "compose" (a 2-step) | a T1c template carve births large children (MetricHero ~261L + style share) that re-breach 500; speedtest has 4 feature breachers | **the drain is a TREE, not a 2-step; recursive graduation under the promoted `ui/<Name>/` folder** | §1.3, §6 G2, §9.2 |
| v12 | §2.6 module-vs-component placement an "honest curated list" | the criterion IS decidable — single-owner sheet colocates, ≥2-family shared register stays module-level (the CSS analogue of T3) | **decidable ≥2-family CSS placement test; menu/feedback-tone/floating-panel/cards stay module-level** | §2.6 |
| v13 | glob-A = one-level `src/components/*/*.css` | a 2-level nested single-sheet (`timeline/continuous-rail/continuous-rail.css`) is MISSED | **`src/components/**/*.css` MINUS `**/styles/**` (any-depth, disjoint from the styles/ glob)** | §2.6, §6 G6 |
| v14 | survey graduation is a pure move | the fold born-REDs 2 boundary violations — `useSurveyFlow.ts` imports SFC-embedded `export const variant` (a `composables→ui` backward edge post-graduation) | **the graduation MOVES the SFC-embedded const out into `constants.ts`/a component-folder index; the boundary gate runs born-RED on it** | §4P.5, §9.10 |
| v15 | G6 golden gate settled from a dry-run | EXECUTED born-RED→GREEN: 4 real builds, default@moved RED (`71564867`≠`564b2c7f`), basename@moved==basename@HEAD GREEN (`898a06cf`); scoped-style HMR confirmed live | **the wave RE-EXECUTES the golden gate born-RED→GREEN as the machine witness; caveat discharged** | §6 G6, §7 |
| v16 | sibling barrel figures authored | glass-ui's own census undercounted 8→9 → the sibling per-repo un-mix figures are equally HEAD-sensitive | **recompute `proof:barrel-pure` read-only over each sibling at the cut** | §4P.13 |

**No remaining blocker-severity design questions.** Two open refinements (directives, not blockers): a fully-decidable §4P.5 soft-branch domain-logic criterion; the DEFERRED barrel-discipline pass (G4 cycle-arm + a POSITIVE pure-barrel Rolldown DCE proof). The 5.0.0 residue is EXECUTION — the reshape applied against the ACTUAL cut HEAD (barrel census, viz membership, specifier counts RECOMPUTED), the golden gate + `proof:barrel-pure` + the differential resolves floor + the boundary gate run born-RED→GREEN over the mechanically-applied rewrite.
