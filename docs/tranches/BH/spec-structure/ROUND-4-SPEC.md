# The Constellation Structure Standard — ROUND-4 CANONICAL

**Status:** CANONICAL (round-4 close). Supersedes `STRUCTURE-SPEC.md` and every prior round. The round-3 design law stands unchanged; round-4 is an EXECUTION-PROTO close that folds five verified corrections into the machinery — the largest being the `componentIdGenerator` ruling (§7), which was empirically FALSE as written and is now corrected from source-content-keyed to **basename-keyed**. Every round-4 correction is flagged `[R4]` for diff; the fold ledger is Appendix D.
**Scope:** ONE structural grammar for every repo in the constellation — glass-ui (the library) + its sibling demo/consumer apps (speedtest, words/floridify, slides, sci-report) + the polyglot backends. Frontend and backend under one law; each language binds its own idiomatic norms.
**Constitution:** the user's edicts (§0). Aristotelian proportion is the divining rod; colocation is recursive; no god-modules, no needless encapsulation; clean break, no legacy.

**Freshness note (load-bearing, re-verified round-4 against live HEAD `4f3c58ff`, agent runs at `2f67ead5`/`ff565fe0`).** The spec is accurate against the tree execution will run against. Re-confirmed this round on disk: plugin-vue **6.0.7** installed; **253** `.vue` SFCs of which **41** carry `<style scoped>`; **zero** duplicate SFC basenames (the basename-key precondition, §7); **0** importers of the dead `components/ui/index.ts` barrel (safe to delete); `GlassDock.vue` **515**, `DockLayerGroup.vue` **524**, `useGlassBackdropLuminance.ts` **554** are LIVE `proof:no-god-module` violations; glass-ui declares `sideEffects: ["*.css"]` and **all four siblings declare NONE**. The round-3 prototypes' "phantom machinery" gaps were stale-worktree-base artifacts and remain DISCARDED. **The codemod MUST recompute the VIZ membership, family count, and specifier counts against the ACTUAL cut HEAD** — the figures below are HEAD-sensitive and the live BG engine is concurrently mutating `src/`.

---

## §0 The constitution (edicts, restated as binding)

1. ONE standard for component/module structure covering BOTH frontend and backend, for the WHOLE constellation.
2. **Aristotelian proportion is the divining rod.** Needless encapsulation and excessive granularity are vices; god-modules are the opposite vice. The MEAN divines components, nested/recursive components, modules, directories.
3. **Colocation, recursively.** A component lives WITH its sub-components, composables, skeletons, constants, styles, shaders, README — recursing for nested components. Only truly module/global-level kin live in a shared home.
4. Long-running dirs ALWAYS break into common modules, encapsulated befittingly.
5. Settle with evidence: FLATTEN the `components/ui + components/custom` two-tier, or not? SOTA (2025-2026)? — **SETTLED: FLATTEN** (§3), with the one decidable domain sub-group the trigger commits.
6. Backend gets the SAME treatment + enforcement, abstracted per language.
7. NO quick solutions, NO workarounds. Idiomatic, gestalt approaches. Architectural transposition for elegance, simplicity, performance. NO legacy code, no back-compat aliases.
8. Every file, component, style examined, then RE-examined.

---

## §0.5 The normative quick-reference (the whole law at a glance)

*The crisp core G8 propagates to every polyglot engineer; the sections below are the rationale.*

1. **The unit is the component/domain FOLDER with an `index.ts` barrel** — scales with the concern, the barrel is invariant. FE `component/`, BE domain `package/`.
2. **Colocate by default; promote to a shared home only when EARNED** (≥2 UNRELATED families — decidably counted, §1.3 T3).
3. **A file over 500 RAW lines is a god-module** — drains via the ratchet by cohesion carve. The SPECIAL single-artifact drain tools: shader-literal, data-manifest (T1a), SFC `<style>`-mass (T1b), SFC script/template-mass (T1c). A plain over-500 `.ts`/`.py`/`.go`/`.rs` drains by the ORDINARY cohesion carve (the base case, no special tool). No permanent length exemption. The 500 ceiling binds product-app feature INTERIORS and backend packages identically.
4. **A segment dir holds files, not other segment dirs.** Segments: `composables/ lib/ shaders/ skeleton/ styles/ sections/ constants/ config/` (FE), `api/ model/ lib/` (BE). A segment appears only with real members OR a genuinely-separable concern (T4). A single separable helper stays a ROOT SIBLING file until a 2nd earns its dir.
5. **A nested sub-component with its own `index.ts` RESETS the depth budget** — how recursion stays legal (≤5 dirs below the nearest feature/component root; T2).
6. **Cross-family imports go through the BARREL, never into another component's guts.** `[R4]` Two preconditions: (a) each repo declares `sideEffects` (js side-effect-free) so barrels tree-shake; (b) **every barrel is PURE RE-EXPORT-ONLY** — no `export const/function/class/default` shares a barrel with `export … from` (Vite/Rolldown #21966 disqualifies mixed barrels from DCE). The SOLE barrel exemption is a curated subpath-entry re-exporting a deep colocated LEAF.
7. **The divining rod runs both ways:** FOLD an over-abstracted single-owner leaf back to its owner; PROMOTE a buried multi-family primitive / DI-context OUT to the shared tree.
8. **Location and publish-surface are ORTHOGONAL** (4-node DAG, §2.5). "Ships on a subpath" ≠ "lives in a shared dir."
9. **Reject layer-by-type of DOMAIN LOGIC** (`controllers/ services/ models/` scattering one domain) — group vertically. Infra-ring, shared-types registry, and orchestration/pipeline tiers are the legitimate exceptions (§5.1). The scatter check runs RECURSIVELY at every dir level.
10. **Route/entry layer:** FE `views/` (route-bound, never folds), BE `pipelines/`/app-service tier (composes domains downward). Bootstrap concern thin.
11. **Clean break, no aliases.** Position-preserving where byte-identical-carve applies, gestalt-reshaping where structure demands. **`[R4]` Grep-locked comments (BOOK/BOOKED provenance markers a gate asserts on) carry VERBATIM into whichever file hosts them post-carve** — comment provenance is contract surface.
12. **Every new structural gate is a device-free `proof:*` script with self-test bites, born-RED on the tree it drains — never ESLint.**

---

## §1 The Law of Aristotelian Proportion

> The mean is not a number. It is the answer to one question asked of every module: **does everything in here belong together, and is anything that belongs together kept apart?** The thresholds below are guardrails that catch a module drifting toward either vice — they are not the law. The law is cohesion. The divining rod runs in **both directions**: it folds an over-abstracted leaf back into its sole owner, AND it promotes a general primitive out of the one consumer that buried it (§1.5).

### §1.1 The two vices, named

| Vice | Name | The failure |
|---|---|---|
| **Excess** (too little division) | **God-module** | A file/dir holds >1 concern; things that change independently are fused; a reader must hold the whole file to understand any part. |
| **Deficiency** (too much division) | **Atomization** | A concern is shattered across many tiny modules; an abstraction is minted before ≥2 real consumers exist; the reader runs a scavenger hunt across folders to assemble one behaviour. Premature abstraction is *more* harmful than the duplication it removes. Three special cases: **atomization-by-misplacement** (burying a general/sibling-owned/app-global primitive inside ONE consumer); **the buried-primitive** (a genuinely shared primitive physically resident inside one component that ≥2 OTHER components reach into — the 25 live cross-component guts reaches, §1.5); **the buried DI-context** (a provide/inject context provided by ONE component and read by ≥2 FOREIGN component families — the `dockContext` case, §1.3/§1.5, proven end-to-end). |

Layer-by-TYPE (`controllers/ models/ utils/`) is the god-module's structural cousin (scatters one feature across type-folders); over-colocation is atomization's. The spec forbids both.

### §1.2 The unit: the component FOLDER

The atomic module is the **per-component folder with an index barrel** — reka-ui's Combobox (17 files) and a 2-file wrapper are the SAME unit at different scales; the folder scales with the concern, the barrel is invariant. This is FSD's *slice*, bulletproof-react's *per-feature dir*, Josh Comeau's *component-folder-with-index* — one convergent unit, SOTA-praised across every round. glass-ui already runs it in `custom/`; the spec canonizes THIS unit as universal (frontend and backend).

**Colocation is the default; promotion to a shared home is the exception that must be earned** (§1.3 T3). This single directionality — *local until proven shared* — is the spine every source encodes.

### §1.3 The thresholds (guardrails, with rationale)

**T1 — File size. Hard ceiling 500 RAW lines; soft target ~300; the real test is cohesion.**
- 500 is the house-native ratchet (`proof:no-god-module`, `HARD_LIMIT=500`). **Lines are counted RAW** (`source.split("\n")`, mirrors `wc -l`) — the house's live definition, PINNED. The §8 RATCHET_BASELINES are raw counts, untouched.
- A hard number becomes a target ("files fill up right to the limit"). So 500 is a **fail ceiling**, ~300 an **advisory soft target** (warn, not fail), and a file *under* 500 is still a violation if it fuses >1 concern.
- **Over-ceiling escape: the draining RATCHET only — no permanent length exemption (RULED).** A cohesive file over 500 registers a ratchet row with rationale and drains as it is carved; it is NOT permanently exempt. The god-FUNCTION metric IS adopted as a SEPARATE per-language advisory (§5.2).
- **Shader-literal exemption:** a single cohesive `*.{glsl,wgsl,frag,vert}.ts` string is ONE artifact — splitting corrupts the assembled shader. Exempt from the line gate, governed by cohesion.
- **Data-manifest exemption (T1a):** a single-source DATA manifest N gates parse by literal path (demo `stories/manifest.ts` 1406L; the `tokens.css` cascade) may exceed 500 *as data* IFF its resolution/logic machinery is carved out (the `manifest/lazy.ts` precedent). Registered, named — not silent drift.

- **SFC over-ceiling carves — TWO tools for TWO breach classes (T1b + T1c; a `.vue`'s RAW count is `<template>+<script>+<style>`, §6 G2):**
  - **T1b — `<style>`-mass extraction.** A cohesive SFC whose template+script is proportionate while its `<style scoped>` mass pushes it over 500 (census worst: speedtest `SpeedtestResults.vue` 2265L/~1350 style; glass-ui `Slider.vue` 475/278, `ContinuousTimeline.vue` 351/315, `ContinuousMarkers.vue` 444/264) is drained the way its shaders are — the style is EXTRACTED to `<style src="./styles/<Name>.css">` in the component's colocated `styles/` dir (§2.6), and the extracted CSS is EXEMPT from the SFC line count. **`[R4]` PROVEN byte-neutral end-to-end** (8 real builds, plugin-vue 6.0.7): `<style src scoped>` is a first-class plugin-vue path (0 warnings), the extracted CSS becomes a VIRTUAL sub-module folding at the SAME graph position as the inline `<style>` (Slider's block stays at byte-offset 12151, total 51650 bytes), so **fold-ORDER is preserved UNCONDITIONALLY**. The `./styles/<Name>.css` reference resolves relative to the SFC dir, so it survives the flatten with ZERO edit. Byte-IDENTITY of `dist/glass-ui.css` under a T1b extraction holds iff the scope-id-hash input excludes the extracted region — **guaranteed by the basename generator (§7)**, which is invariant to `<style>` extraction. The extracted file rides the SFC fold pipeline (`dist/glass-ui.css`), NOT the `index.css` cascade — so the component-styles walk copies ONLY the sheets `index.css` references (the T1b/§2.6-walk convention).
  - **T1c — script/template-mass carve.** T1b does NOT drain an SFC that breaches with LITTLE OR NO `<style>` — the script+template IS the mass. **Live glass-ui drivers (re-verified round-4 as active `proof:no-god-module` violations):** `GlassDock.vue` **515** (**~0 `<style>`** — a pure script+template breacher T1b cannot touch), `DockLayerGroup.vue` **524** (~49-style — not the mass; PLUS an UNLAYERED SFC `<style>` at :434-524 that is cascade-load-bearing and IMMOVABLE, so this file MUST drain on the SCRIPT axis, direct proof T1c ≠ T1b). The carve is the standard cohesion decomposition on the two SFC axes:
    - **Template mass →** extract cohesive sub-component SFCs (a template section with its own props/logic becomes a nested sub-component under the root or under `sections/`, §2.3). `[R4]` PROVEN: `GlassDock.vue`'s fission-bridge template → `DockFissionBridge.vue` (34L, single-root, DOM-identical).
    - **Script mass →** extract component-local composables (a coherent block of reactive logic → `composables/<useX>.ts`; a single such block stays a ROOT SIBLING file until a 2nd earns the dir, T4). `[R4]` PROVEN: `GlassDock.vue`→`useGlassDock.ts` (296L, the setup assembly) drains 515→230; `DockLayerGroup.vue`→`useDockLayerGroup.ts` (272L) drains 524→141. Both typecheck 0, `vite build` 0, DOM-identical (`useTemplateRef` binds refs by string key inside the composable transparently).
  - **`[R4]` The minimal-drain-vs-symmetry ruling (the mean, made decidable).** The ratchet demands ONLY enough drain to clear 500. Beyond that, the useX-orchestrator symmetry lift (draining the setup assembly to `useX.ts` so the SFC drops to a thin `props + refs + useX()` call) is a LEGAL, house-canonized cohesion completion — the useAurora/useMetaballRenderer/useFourierField precedent, gate-witnessed (`proof:dock-orchestrator-single` already unions `dockMorphContext + useDockSpring`). It is PERMITTED but NOT FORCED. **The decidable rule:** extract a mandatory genuine cohesive LEAF (a template section that is its own concern — `DockFissionBridge`; a nameable reactive sub-domain); a symmetry-for-symmetry glue split with no nameable concern is atomization and is forbidden. For `GlassDock` specifically: the `DockFissionBridge` template carve is MANDATORY (genuine leaf) and ALONE clears the bound (→489, 11-line margin, ZERO script-gate follow-cost); the full `useGlassDock` orchestrator lift is the ELECTED symmetry completion (drains to 230 with margin, completes the canonized useX-symmetry) whose ~6-gate reader-follow cost (below) is a coordinated code+gate sweep. The owner elects; the ratchet only forces clearance.
  - **`[R4]` The script-axis reader-gate follow-cost is INTRINSIC and budgeted.** A dock SOURCE gate greps the SFC for exactly the composable-call symbols that constitute the script mass, so draining the mass moves the grep targets — measured ~3 gates per over-bound dock SFC (6 for the two dock files). ~85% are the mechanical union-read (`read(SFC) + read(carved-composable)`, the house "reader-gate follows the carve into the leaf" idiom already present in `proof:dock-orchestrator-single:482`); ~15% need a STRUCTURAL RECONCILE when a gate is purpose-built for the PRIOR decomposition shape (`proof:dock-decompose` — split its shared source read so the D1 line-count self-test and the D2 path-agnostic import check don't corrupt each other). This is the SCRIPT-axis twin of T1b/CSS's reader-gate cost; the two hit DISJOINT gate populations. A gate purpose-built for a specific decomposition (e.g. `proof:dock-decompose`, superseded by the useX intermediary) is a reconcile-OR-RETIRE follow-item.
  - The carve drains under the RATCHET like any cohesion carve — NOT a permanent exemption, NOT a T1b `<style src>` extraction. Every over-500 SFC has a named drain tool: `<style>`-mass → T1b, script/template-mass → T1c.

**`[R4]` The plain-composable god-module (the base-case carve, not a special tool).** `useGlassBackdropLuminance.ts` **554** is a plain `.ts` composable that regrew past 500 after a prior colocation drain. It has NO SFC axis and needs NO T1b/T1c special tool — it drains by the ORDINARY cohesion carve into colocated sub-leaves (the BG.W-COLOCATE precedent: a coherent block → `composables/<useX>.ts` or `lib/<x>.ts` beside its owner). The same base case binds every over-500 `.py`/`.go`/`.rs`. T1a/T1b/T1c are the SFC/single-artifact SPECIAL tools; the base cohesion carve is the default drain.

**T2 — Directory depth. Colocation nests at most ONE segment level below a component root; recursion resets the budget.**
- SOTA: readers lose context past 3–4 levels; FSD caps at EXACTLY 3 (Layer→Slice→Segment).
- **Rule:** within one component root the tree is `root → {segment dir} → file`. A segment dir holds files, NOT other segment dirs. A nested SUB-COMPONENT (a child with its own multi-file structure + `index.ts`) is a NEW component root that RESETS the local budget — how recursion (edict 3) stays legal. A global sanity cap (**≤5 dirs** below the NEAREST feature/component root — relative, not an absolute `src/components/` path) catches runaway recursion without a recorded rationale. Machine-locked by `proof:depth` (§6 G3; prototyped 5/5).

**T3 — Promotion to the shared tree. ≥2 UNRELATED families — decidably counted, with three placement cases.**

The house's ≥2-consumer visual-load-bearing invariant (J-inv-10) IS this rule; the spec extends it to every non-visual leaf. The naive `grep | family-extract | distinct-count` gives WRONG counts. The count is made decidable by its inclusion/exclusion set:

- **INCLUDE composition edges.** A leaf real-imported by a SIBLING shared-tree leaf belongs to that sibling's shared family. `morphSignatures` imported by `useGooMorph` → shared motion primitive.
- **INCLUDE demo/sibling-app usage.** A leaf a consumer app uses APP-GLOBALLY (demo `AppShell.vue`, a sibling repo) is proven-general.
- **EXCLUDE WITHIN-FAMILY DI plumbing.** A `provide`/`inject`/DI-key indirection wired WITHIN one component family is NOT a family edge.
- **EXCLUDE discovery-layer TYPE re-exports.** A context's TYPE re-exported through `api/` is a PUBLISH edge, not a foreign consumer. The criterion counts MODULE-PATH imports, never name mentions or type re-exports.
- **PROMOTE a cross-family-read DI context (the third case — proven end-to-end).** A provide/inject context PROVIDED by one component and READ by **≥2 non-owning families, counted by module-path import**, promotes to a lightweight shared context leaf (`composables/context/`), carrying the `InjectionKey` + helper pair + its own domain types. **Live driver:** `dock/composables/dockContext.ts` is read by 5 non-dock families → promote.
- **EXCLUDE root-barrel and curated-aggregator re-exports.** Publication is a publish-surface signal, NOT a physical-location signal (§2.5).

**The DI-promotion criterion, codified (decidable):** *a `createStrictContext`/`createOptionalContext` module promotes to `composables/context/` IFF ≥2 non-owning feature-dirs import its MODULE PATH; else it stays colocated.* Over all 8 DI-context sites at HEAD, exactly ONE qualifies: `dockContext`=5 → PROMOTE; the 7 others=0 → STAY.

**The overriding rule:** *a shared leaf composed by a sibling shared leaf, used app-globally, OR read as a context by ≥2 foreign families STAYS/BECOMES shared, regardless of component-family count.* Machine-locked by `proof:colocation` globality clause (§6 G1) + `proof:import-boundaries` DI-context sub-ruling (§6 G4).

- **Exemption (T3a):** a PUBLISHED subpath with a recorded external consumer stays module-level at 0 in-repo families (`/virtual`, `/sidebar`). Machine-checkable against `docs/consumer-evidence/`.
- Census fact: ~10 composables clear ≥3-unrelated-families today; the bar is **≥2** (aligned to inv-10).

**T4 — Segment minimum-substance.** A `composables/` holding one file, an empty `constants.ts`/`shaders/`, a 1-file `lib/` — atomization. A segment appears ONLY with real members OR a genuinely-separable concern. **A lone component-local composable OR a lone pure/mixed helper stays a SIBLING FILE at the component root until a second earns the dir.** (`timeline/geometry.ts` stays a root sibling.) Machine-locked by `proof:colocation` no-empty-segment clause (§6 G1).

### §1.4 Both-direction violations, decidable

**God-module (excess) — any of:**
- file >500 RAW lines (non-shader, non-data-manifest; SFC drained via T1b/T1c; plain composable via the base carve);
- a dir mixing >1 domain/concern with no sub-grouping;
- layer-by-type at ANY dir level (scattering ≥2 domain stems — see §5.1 infra-ring/shared-types carves; the scatter check runs RECURSIVELY);
- a grab-bag (`utils.ts`, `helpers.go`, `common.py`) accreting unrelated leaves;
- **`[R4]` a mixed barrel** — an `index.ts` combining `export const/function/class` OWN exports with `export … from` re-exports (disqualifies DCE, §2.1);
- **The `mixed-kind` flat-dir smell (advisory, not a gate).** A flat dir of >~7 sibling files of MIXED kind is a human-review flag. The machine substitutes ARE gated (README domain-map, `proof:depth`, `proof:import-boundaries`).

**Atomization (deficiency) — any of:**
- a shared-tree resident with <2 unrelated families and no external-consumer exemption → **FOLD**;
- **atomization-by-misplacement:** a general/sibling-composed/app-global leaf buried inside one consumer;
- **the buried-primitive:** a shared primitive resident inside one component that ≥2 OTHERS import → **PROMOTE** (§1.5);
- **the buried DI-context:** a context module-path-imported by ≥2 FOREIGN families → **PROMOTE** to `composables/context/`;
- a segment dir with a single trivial member (T4);
- a wrapper module that only re-passes its inputs (labeled-field's 5 `Labeled*` → one generic + typed slot);
- a composable/util extracted before its 2nd consumer exists.

### §1.5 The FOLD↔PROMOTE symmetry (the divining rod runs both ways)

One census machinery, three placement cases. **T3 is a placement function of the family count, not a one-way ratchet.**

- **FOLD (globality gate, §6 G1).** A shared-tree leaf with EXACTLY ONE in-repo family and no sibling/app-global/external/context signal colocates under its sole owner. Verified fold set (Appendix A1): `useDockCtaReceive` → `dock/composables/`; `composables/sortable/` → `sortable-list/composables/`. Seven round-1-named "folds" are STAY-SHARED.

- **PROMOTE — buried primitive (import-boundaries gate, §6 G4).** `proof:import-boundaries` is **born-RED on HEAD with 25 cross-component GUTS reaches**. Drivers: `aurora/constants/budget.ts` (12 files / 7 viz families, byte-neutral) → shared viz/glass home; `aurora/constants/shaders/procedural-color.wgsl.ts` (6 sibling shaders, byte-neutral) → `composables/glass/webgl/shaders/` beside its GLSL twin; `dock/composables/useDockHold.ts` (reached by `ui/slider`) → promote with `dockContext`; `liquid-grid/composables/liquidGrid.ts` `curlFBM` (reached by `concentric`) → the shared field operator.

- **PROMOTE — buried DI-context (import-boundaries gate, §6 G4).** `dockContext.ts` → `composables/context/`, per §1.3. **Proven end-to-end:** typecheck 0, build 0, `/dock` byte-stable, **ZERO new backward edges** (imports only `vue` + `./createContext`), leaf 1166B→415B, **−327 gz on each of 5 foreign routes**.

**The three cases use the same census machinery. The aristotelian mean is one decidable placement RULE run over three cases.**

---

## §2 The recursive component-dir schema (frontend)

### §2.1 The atomic unit
```
components/<name>/
  <Name>.vue                 # the root SFC
  <SubName>.vue …            # sibling sub-components (flat until they earn their own dir)
  index.ts                   # THE public API barrel — PURE RE-EXPORT-ONLY (feeds the subpath)
  constants.ts               # magic numbers/enums (when ≥1 exists)
  README.md                  # the colocation-adoption marker + human map (mandatory when complex)
  composables/               # component-LOCAL composables (when ≥2, or one genuinely separable)
  lib/                       # component-LOCAL pure/mixed helpers — non-`use*` math/factories (when ≥2)
  shaders/  skeleton/  styles/  sections/     # segment dirs, when present
```
The barrel `index.ts` is the invariant the flat subpath re-exports, so the export surface is DECOUPLED from internal layout. A trivial 2-file component keeps the folder+barrel.

**The `lib/` segment.** `lib/` beside `composables/` matches backend §5.1 and product features §4P.1 — the ONE segment vocabulary across FE and BE. `lib/` holds a component's PURE/MIXED domain helpers (`timeline/geometry.ts` is pure math + a reactive factory). Per T4, a SINGLE separable helper stays a ROOT SIBLING file; `lib/` is earned by the 2nd.

**`[R4]` The barrel-only rule + the deep-leaf exemption (B4) + TWO barrel preconditions.** `index.ts` is the ONLY import surface for anything reaching this component from another component or the app. The SOLE exemption: a curated subpath-entry (§2.5) re-exports the deep colocated LEAF directly — NEVER through the component barrel. `proof:import-boundaries` distinguishes a legitimate subpath deep-leaf re-export from an illegal guts reach.
  - **Precondition A — `sideEffects` declared.** The tree-shaking safety of the barrel-only mandate DEPENDS on the repo declaring `sideEffects` (js side-effect-free). glass-ui declares `sideEffects: ["*.css"]`; **all four siblings declare NONE** (round-4 audit, G8). Without it a barrel-per-feature-dir mandate RETAINS every unused re-export (measurable production bloat). A consumer APP declares the array form `["**/*.css", "*.css", …explicit bare-registration imports]` — NEVER blanket `false` (which prunes a load-bearing bare registration; speedtest's `import "./echartsInit"` in two non-entry components is the live proof) and NEVER glass-ui's flat `["*.css"]` (an app's deep src tree needs the nested `**/*.css`).
  - **Precondition B — barrels are PURE RE-EXPORT-ONLY.** No `export const/function/class/default` may share a barrel with `export … from`. Module-level own consts live in a SIBLING file, re-exported through the barrel. This is BOTH a Rolldown/Vite-8 optimization requirement (Vite #21966 — mixed barrels are disqualified from lazy-barrel DCE, OPEN + unfixed for the 3-of-4 repos on Vite 8) AND a colocation-clarity win (a barrel that is a pure re-export manifest reads as pure wiring). It aligns with the divining rod, not ceremony.

### §2.2 What colocates (the default)
Everything a component OWNS: sub-components, component-local composables, `lib/` helpers, constants, shaders, skeletons, styles (§2.6), README. A component-specific composable/helper read only by that component is NOT module-level and must NOT sit in the shared tree.

### §2.3 Recursion
A sub-component that grows its own multi-file structure becomes a nested component root under the parent (or under `sections/`), with its own `index.ts`, its own local `composables/`/`lib/`, its own README if complex. Aurora (demo) is the gold standard. Each nesting RESETS the depth budget (T2). The `tabs/reka/` sub-component group (§3) is the executable instance.

### §2.4 The shared tree — what earns a module-level home
`src/composables/` holds ONLY leaves clearing T3. Its sub-trees (`motion/ glass/ dom/ dark/ reactive/ context/`) are the shared homes. The PROMOTE set (§1.5) joins them.

**`composables/context/` is the DI CONTRACT home.** The DI-context promote FORCES the context's own domain types into the shared dir (`DockContext` consumes `DockOrientation`/`DockLayout`; a backward `shared→component` type import would violate the DAG). So `composables/context/` is **"the neutral factory + every cross-cutting promoted context + that context's own contract types."** A DI contract IS its types.

**The Vue-idiomatic divergence (recorded).** The spec KEEPS `composables/` (ecosystem essence-name); `lib/` is its purpose-named sibling. Backend uses purpose-names (§5).

### §2.5 Location vs publish-surface (the orthogonality ruling) + the 4-node boundary model

TWO axes the current tree conflates: **physical location** (governed by T3, family count) and **publish surface** (governed by SCC/heavy-peer discipline). **These do not couple.**

**The boundary model is a 4-node DAG:**
```
shared/composables → components → subpath-entries (src/*.ts) → app
```
The curated subpath-entry layer (`src/index.ts`, `src/motion.ts`, `src/dark.ts`, `src/keyboard.ts`, the `src/subpaths/*.ts` mirror barrels, `src/api/index.ts`) is the ONLY node EXEMPT from the shared→components prohibition — it may reach BOTH directions.

**The measured edge legality table (prototyped, self-test 11/11 incl. the DI bite):**
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
| shared → components via `export *` aggregator barrel | LEGAL (the ONE standing HEAD instance is `composables/index.ts → infinite-scroll/composables`) |
| any → subpath-entry | **RED** (the publish layer is the sink) |

### §2.6 Styles / CSS — PHYSICAL colocation via approach (i), PROVEN dev+HMR+byte-identical-dist

The census found component-SPECIFIC CSS in the GLOBAL `src/styles/` tree — a colocation miss vs SOTA (Vuetify colocates `VBtn.sass`). **Approach (i) is PROVEN end-to-end on a running demo dev-server. Option (ii) (Vite dev alias) is DROPPED — dominated.**

**The proven mechanism — approach (i):**
1. The ~14 CLEAN single-owner families relocate PHYSICALLY into `components/<n>/styles/<n>.css` (+ own-subdir partials — dock.css keeps its 17-partial `dock/` subdir INSIDE its colocated `styles/`).
2. `src/styles/index.css` — the SINGLE inter-component cascade authority, staying GLOBAL — rewrites each moved `@import "./dock.css"` to the honest on-disk path.
3. A ~30-line build-transform (2 fns appended to `vite.style-fold.ts`): `copyColocatedComponentStyles` walks `src/components/**/styles/` and `cpSync`s each index.css-referenced sheet into a FLAT `dist/styles/`; `rewriteDistIndexColocatedImports` rewrites the shipped `dist/styles/index.css` back to flat.

**The proof:** Vite v8 dev clean (0 CSS resolve errors); `/dock/overview` HTTP 200 painting from colocated `dock/styles/dock/shell.css`; **HMR SURVIVES**; `npm run build` green; `diff -rq baseline dist/styles` **exit 0 across all 106 CSS files**. The "leave @import UNCHANGED + flatten-on-publish" variant is a HARD DEV BREAK (HTTP 500); approach (i) is the only variant satisfying BOTH.

**`[R4]` The TWO colocation classes need distinct build routing.** (a) an SFC-scoped `<style src>`-extracted file (T1b) rides the SFC fold pipeline into `dist/glass-ui.css` and is SKIPPED by the cascade walk — the T1b/walk convention, now a HARD `proof:css-colocation` assertion because the double-emit is real (a colocated `styles/Slider.css` is a copy-able 14KB sibling; an un-predicated walk ships it TWICE — folded-scoped in glass-ui.css AND raw-UNSCOPED in dist/styles/, breaking scoping). (b) a NON-scoped cascade partial (dock/, tabs/) is copied by the walk into flat `dist/styles/`. The walk copies ONLY index.css-referenced cascade sheets; class (a) is skipped by construction.

**The rulings:**
1. **The ~14 CLEAN single-owner families colocate PHYSICALLY** (+ own-subdir partials): dock, drawer, border-progress, tabs, select, sheet, completion-seal, hover-popover, instrument-chassis, configurator, cards, floating-panel, card-scroll, glass-refract. Extracted SFC scoped styles (T1b) land here too, under the walk convention above. Machine-locked by `proof:css-colocation` (§6 G6).
2. **`icon-chip.css` (the SOLE cross-global @import) STAYS DOCUMENTED-OWNERSHIP** (`README OWNER:` field + `proof:css-ownership`).
3. **Genuinely-global cascade stays in `src/styles/`:** the token cascade, the 5-rung glass ladder, typography, theme, `utilities.css`, `paper.css`, `animations.css`, `transitions.css`, no-single-owner recipes. `feedback-tone.css` (feedback CLUSTER, ≥2) stays global.
4. **`index.css` remains the SINGLE INTER-component ordering authority** — the @layer + source-order ties are INVIOLATE. Cascade-ORDER = global; file LOCATION = colocation.

**`[R4]` This is the CSS-COLOCATION ATOM (§7), ORTHOGONAL to the flatten atom.** The dry-run PROVED the flatten does NOT physically move `src/styles` (dock.css/cards.css stay in place; the flatten only rewrites `@import` specifiers) and builds+typechecks GREEN with ZERO `src/styles` move. So the CSS colocation is a SEPARATE, independently-gated sub-wave. The reader-gate corpus it must re-point is **107 gate FILES / 261 refs** reading `src/styles/*.css` (NOT "14 gates") — `dock.css` alone is **58 refs** dominated by its 17-partial subdir (`proof-dock-css-carve.mjs` HARD-asserts `src/styles/dock.css` + `@import ./dock/${name}`); `tabs.css` is ALREADY colocated (the 1-of-14 `|| read(TABS_DIR/…)` fallback precedent). `proof:css-colocation` gains a SOURCE-reader-gate arm: assert no gate reads a colocated CSS by its retired `src/styles/` path.

---

## §3 VERDICT — flatten `components/ui` + `components/custom`

**FLATTEN.** Merge into ONE `src/components/` of domain-organized per-component folders as flat peers — with the ONE decidable domain sub-group the trigger commits (`viz/`). No provenance tier, no dead markers. **Settled (edict 5), executable, PROVEN GREEN end-to-end this round (typecheck 0, `vite build` 190 chunks 0 resolution errors, classify-reproduction exact 89-key public surface).**

### The evidence (unanimous for owned libraries)
Every library that OWNS its components keeps flat peers, no vendored-vs-house tier: reka-ui (~78 flat + `shared/`), Base UI, Ark UI (~70 flat), PrimeVue (80+), Vuetify. The two-tier is EXCLUSIVELY a shadcn-CONSUMER pattern whose sole rationale — protecting vendored copies for `npx shadcn add` re-pull — is DEAD here (glass-ui's `ui/` is ~100% forked). Sharper proof: **6 `ui/` components already reach UPWARD into `custom/`**. The ui/custom boundary encodes NO architectural invariant — it is provenance sediment.

### The final tree shape — COMMITTED
The DEFAULT is FLAT + a gated `components/README.md` domain-map. The flat-namespace legibility trigger is decidable and FIRES: >60 flat peers AND ≥1 domain family with ≥5 non-adjacent members. Measured at HEAD: the flat peer set AND a **9-member procedural-viz family** (aurora, concentric, constellation, dot-flow-field, dot-matrix, fourier-field, goo-blob, goo-filter, liquid-grid) scattered across alphabet positions. The trigger FIRES:

- **ONE light domain sub-group is adopted — `components/viz/`** — holding exactly the 9-member procedural-viz family (goo-filter rides with its family). Every OTHER family stays a pure flat peer. The subpath is UNCHANGED (`@mkbabb/glass-ui/aurora` re-points to `../components/viz/aurora`; zero export churn).
- **Why domain-grouping ESCAPES §3's own anti-two-tier argument.** A `viz/` navigate-by-CATEGORY step ("aurora is a viz") encodes REAL cohesion: the 9 members share the WebGL/WebGPU substrate (`useGpuSubstrate`), the promoted `budget.ts`, the `procedural-color` shaders, the one-GL-context-per-route budget. Domain grouping ENCODES cohesion; provenance grouping encoded nothing. That saves the second sub-group where it killed the first — and it is why `viz/` is the ONLY sub-group the mean permits.

### `[R4]` The count arithmetic, CORRECTED (spec-hygiene)
The round-3 "91 = 43 ui + 49 custom − 1 tabs merge − 1 dead barrel" mixed FAMILIES with FILES (the dead barrel is the `ui/index.ts` FILE, not a family). The clean statement, re-measured on the flattened disk this round:
- **92 family-dirs − 1** (`ui/tabs` folds into `custom/tabs/reka` as a nested sub-group) **= 91 top-level component dirs.**
- Of these, **`_shared/` is domain-map-EXEMPT** (a non-family shared-primitives dir, not a flat peer), leaving **90 barrel-bearing families = 81 flat peers + 9 under `viz/`** (all 9 viz members incl. goo-filter carry an `index.ts`).
- The dead `ui/index.ts` aggregate barrel (**0 real importers, re-confirmed round-4**) is a FILE that is DELETED, not a family subtracted.

### The reshape — the TWO-ATOM decomposition `[R4]`
The round-3 "FIVE coordinated sweeps" is RE-FRAMED as **TWO independently-gated atoms** (the dry-run proved sweep 4 is orthogonal to 1/2/3/5):

**ATOM A — the FLATTEN ATOM (sweeps 1, 2, 3, 5; PROVEN GREEN end-to-end).** Must land atomically for G7.
- **src imports (all-relative, `@glass` 0×): resolve-and-recompute, SCOPED to the flatten-VARIANT subset.** `newSpecifier = normalize(relative(elide(dirname(F)), elide(resolve(dirname(F), S))))`. Of 1786 src relative specifiers, 1218 are flatten-INVARIANT, 568 are flatten-VARIANT; the recompute writes ONLY the 568. `[R4]` typecheck EXIT 0 confirmed over 291 rewritten src files (the recompute formula is count-agnostic — the 568/1218 split is spec-asserted, the binding proof is typecheck 0).
- **demo AND tests IMPORTS (`@glass/components/{ui,custom}/*`): segment-drop** (521 specifiers, ZERO depth arithmetic, alias UNTOUCHED). **+ the tests-DIRECTORY flatten** — move `tests/components/{ui,custom}/X` → `tests/components/X` (viz members → `tests/components/viz/`), recompute relative fixture imports, re-point the **12 gate scripts** hardcoding a `tests/components/(custom|ui)/X` fixture literal (viz fixtures → `tests/components/viz/X`; non-viz → `tests/components/X`; top-level test FILES drop-segment identically). `proof:no-test-in-src` PASSES on the incoherent flat-src/two-tier-tests end-state (it fails only on tests-under-src), so it is NOT the witness — the tests-dir flatten keeps the src/tests mirror coherent AND the fixture-gates green.
- **scripts (recursive, all-text): one uniform `dropSegment` PLUS exactly ONE semantic rewrite.** `scripts/lib/subpath-policy.mjs` carries GENUINE two-tier SEMANTIC logic; a blind textual drop collapses both `relBase`s to `src/components`, double-scans the flat 91, reports ~91 spurious collisions. The pass MUST collapse the two-tier model to a two-SET model — `{relBase:"src/components", classMap:CLASS}` with `CLASS={...UI_CLASS,...CUSTOM_CLASS}`. `[R4]` The rewrite is **~7 coordinated code-sites in ONE file** (TIERS, `readTree`/`dirsWithIndex` — which must DESCEND one level into `viz/`, `buildEntrySet` ×2 source-templates, fidelity paths ×2, CURATED `fourier-math` re-point to the viz member, comments) PLUS **the composable tier must survive as a 2nd TIERS entry** (`COMPOSABLE_CLASS`, 11 keys, `relBase src/composables` — the two-set merge only merges ui+custom). The merge is DETERMINISTIC: `UI_CLASS ∩ CUSTOM_CLASS = {tabs}` (UI:INTERNAL, CUSTOM:PUBLISH → custom-wins → `tabs=PUBLISH`), merged = 91 keys, 0 unclassified, the public NAME set == the 89 package.json `./subpath` keys EXACTLY (dry-run EXACT_REPRODUCTION confirmed). `viz/` members key on component NAME not dir path, so the classMap needs no viz change — only the relBase walk descends one level.
- **`ui/tabs → components/tabs/reka`** (a one-entry override BEFORE the uniform drop; `components/tabs/` holds `SegmentedTabs.vue` + `composables/` + `constants.ts` + `index.ts` + `README.md` at root, `reka/{Tabs.vue,…}` nested; `DockLayerGroup` repaths). Aligns with `tabs=PUBLISH`.
- **`[R4]` The dead `ui/index.ts` aggregate barrel is EXPLICITLY DELETED** (`unlink src/components/ui/index.ts` + `rmdir` the emptied `ui/`, and the `custom/` shell). **This is a REAL codemod bug the dry-run surfaced:** the round-3 "proven" codemod SKIPS-but-never-DELETES the barrel, leaving a stranded barrel whose relative imports dangle → ~30 `TS2307` → typecheck FAIL. The DELETE + a post-condition assert (`no surviving src/components/{ui,custom}` dir) is a G7-companion close assertion.
- **config + docs (sweep 5): adopt the path-independent `componentIdGenerator`** (§7, basename-keyed) + sweep stale `components/(ui|custom)/` prose from component README self-references + CSS comments (edict-8; 0 live imports but the prose must not lie).
- **`viz/` insertion** for the 9 members (the recompute formula handles the extra segment).

**ATOM B — the CSS-COLOCATION ATOM (sweep 4; §2.6).** Orthogonal (`src/styles` untouched by A). Physical `src/styles/*.css` → `components/<n>/styles/` move + the 107-ref/261-file reader re-point + the build-transform walk. Gated by G6 (golden hash + source-reader arm). Sequenced AFTER A within the 5.0.0 cut (so the basename generator is already adopted; B keeps `dist/glass-ui.css` untouched and `dist/styles/index.css` byte-identical per approach (i)).

- **Domain map** lives in a MACHINE-LOCKED `components/README.md` (`proof:claude-structure-sync`-pattern gate). Non-component peers domain-map-EXEMPT: `_shared/`, `viz/` (the sub-group dir), `PROCEDURAL-SUITE.md`.
- **No provenance markers** (greenfield-no-meta). **Export surface stable, INTERNAL churn large.** package.json `exports` untouched (0 keys).

### The residual proportion pass the flatten enables
- `timeline/geometry.ts` (its ONLY separable helper) **stays a ROOT SIBLING file** per T4. A 2nd timeline helper earns `timeline/lib/`.
- `configurator/`: `useConfiguratorState` is already subpath-exported (a many-consumer STATE factory) — STAYS.
- The 500-breachers carve by cohesion (ORTHOGONAL to the flatten, delta=0): `GlassDock.vue` 515 (T1c pure script+template), `DockLayerGroup.vue` 524 (T1c script-axis — the unlayered `<style>` is immovable), `useGlassBackdropLuminance.ts` 554 (plain-composable base carve). `[R4]` All three re-confirmed LIVE violations; the two dock carves PROVEN (typecheck/build 0, DOM-identical, drain 515→230 / 524→141).
- `labeled-field`'s 5 wrappers collapse to one generic + typed slot.

---

## §4 The demo/application grammar

TWO archetypes on ONE feature-slice spine. **§4-STORYBOOK** and **§4-PRODUCT**, the same `component-folder + local-until-shared + recursion-resets-depth` grammar, differing only in the top-of-tree layers a router-driven app earns. §4-PRODUCT is ~85% a description of speedtest's live tree.

### §4-STORYBOOK — the story archetype

#### §4S.1 The fixed skeleton
```
<app>/
  App.vue · main.ts · router.ts
  shell/                       # app chrome (AppShell + nav docks + shell composables + shell CSS)
  chassis/                     # demo-private PRESENTATION primitives (content COMPOSES, never re-authors)
    subtype/                   # the closed presentation-subtype taxonomy (§4S.4) — WHEN EARNED
  stories/
    <category>/
      <story>.vue              # a manifest row (kebab-case)
      _shared/                 # category-scoped chassis (≥2 stories, one category)
      <story>/                 # per-story dir for PRIVATE (1-consumer) helpers
    manifest.ts                # the single SSOT wiring stories → routes → nav
```

#### §4S.2 The colocation ladder (recursive spine, demo scope)
| Consumers | Home |
|---|---|
| story-PRIVATE (1 story) | `stories/<cat>/<story>/` |
| category-SHARED (≥2 stories, one category) | `stories/<cat>/_shared/` |
| CROSS-category | top-level `chassis/` |
| app-GLOBAL | `shell/` or root |

#### §4S.3 The tri-partition rule for a category dir
Page vs helper vs shared by LOCATION alone: (a) story SFCs at root, (b) `_shared/` for category chassis, (c) per-story `<story>/` dirs for private helpers.

#### §4S.4 The closed subtype taxonomy (scoped by proportion)
A demo mints a CLOSED presentation-subtype taxonomy (stage / specimen / interaction / matrix / composition) in its own `chassis/subtype/` dir **ONLY above a complexity floor** (≥~20 stories OR ≥2 categories needing it). A small sibling demo keeps flat chassis primitives. glass-ui's rich demo earns the dir; slides' thin deck does not.

#### §4S.5 God-SFC escalation
A story tripping the ratchet becomes a feature dir (the aurora model). `blob.vue` (875L) + `constellation.vue` (759L) → feature dirs. Both `<style>`-mass and script/template-mass SFCs escalate this way (T1b/T1c).

#### §4S.6 The barrel-vs-deep-path idiom
Deep-path for demo-private SFCs; index barrel for anything a sibling app consumes. Drop vestigial `chassis/index.ts` if unused.

### §4-PRODUCT — the router/store/backend-bearing consumer app

The consumer app is the STORYBOOK mirrored across the router boundary: storybook `stories/`↔product `views/`, storybook `chassis/`↔product `components/`+`features/`, storybook `shell/`↔product `App.vue`+`layouts/`.

#### §4P.1 The fixed skeleton
```
<app>/src/
  bootstrap (main.ts | inline in index.html) · App.vue · router(.ts | /)
  views/<Name>View.vue                     # route-BOUND compositions (one per router record)
  layouts/                                 # route-frame chrome that wraps <RouterView>
  features/<domain>/                       # proportion-EARNED domain slices (§4P.5)
    ui/ state/ api/ engine|lib/ composables/  index.ts
  components/<domain>/                      # UNgraduated domain groups + shared app UI
  stores/                                  # app-global Pinia (+ domain subtrees + plugins/)
  api/                                     # the FE HTTP-transport leaf (§4P.4)
  config/                                  # presets-in-consumers + static/deployment config
  composables/  lib/  types/  utils/
  styles/                                  # the app-global design layer
<app>/server/ | backend/ | functions/ | workers/   # the peer backend workspace (§5, NOT under src/)
```

#### §4P.2 `views/` is the canonical route-layer name (recorded FSD divergence)
All four apps name route-bound components `views/` (FSD's is `pages/`). A view holds route-BOUND components ONLY; a THIN composition wiring a feature barrel to a layout, NEVER domain logic. Clean-break: no `pages/` alias. **`views/` NEVER folds into a feature slice.**

#### §4P.3 router FILE→DIR by T4 proportion
`router.ts` until it EARNS `router/` (index.ts + guards + `typed-routes.d.ts` + per-domain route modules ≥2). No premature dir for a 3-route deck.

#### §4P.4 The `api/` FE transport-leaf infra-ring
`api/` = ONE `client.ts` transport kernel + per-resource modules named by DOMAIN RESOURCE + `types.ts` envelopes + an explicit-named-re-export `index.ts`. UNIDIRECTIONAL: `views/ → stores/ → api/ → client.ts`; `api/` NEVER imports upward. A full feature slice with its OWN api gets `features/<x>/api/`. Machine-enforced by `proof:import-boundaries` scope-extended to the product 4-node DAG (speedtest ships `check-internal-boundaries.mjs` as the precedent).

#### §4P.5 The domain-graduation predicate (the sharpest §4-PRODUCT law)
A domain is a `components/<domain>/` GROUP by default. It **GRADUATES to a full `features/<domain>/` slice when it acquires a presence in ≥3 app-global FOLDABLE layer dirs OR its own engine/state/domain-logic.**

**The foldable layer set — `views/` removed from the trigger.** The trigger counts presence across `{components/, stores/, api/, composables/}` (≥3 of the 4 present). `views/` is NOT in the trigger set.

**The fold-set.** On graduation the scattered pieces fold into `features/<domain>/{ui, state, api, composables, lib, config, constants, types, index.ts}`. Per-leaf T3 decides each config/constants/types module (domain-owned folds in; ≥2-domain-shared stays app-global).

**The feature INTERIOR obeys the 500 ceiling identically (graduation is NOT a length exemption).** G2's 500 raw ceiling + G9's backend ceiling bind a graduated feature's INTERIOR files exactly as they bind a library component. **The carve owner is the APP, not glass-ui** — each app OWNS the drain of its own over-500 feature files under its own RATCHET (speedtest `useMeterRenderer.ts` 693L drains by a renderer split, NOT an exemption). **Recursive sub-domain graduation is in-scope:** the METER sub-domain (`composables/meter/` + `ui/meter/` + `useMeterRenderer` + `MeterColumn.vue`) graduates to a nested `features/<domain>/<sub>/` slice by the SAME ≥3-foldable-presence trigger one level down.

Live targets (speedtest): `admin` (17 files, ≥3), `dashboard` (31, ≥3), `survey` (own composables/utils/index) GRADUATE; `speedtest` ALREADY graduated. `features/` is a PROPORTION-EARNED escalation, NOT a mandatory tier (slides has none). The graduation gate goes born-RED on `admin`/`dashboard` only AFTER the cheapest domain (`survey`) is PROTOTYPE-folded to confirm typecheck + `proof:import-boundaries` green + the per-route bundle delta.

#### §4P.6 The Pinia T3 split
A store owned by ONE feature lives at `features/<x>/state/`, reached cross-feature ONLY through the feature barrel. A store used by ≥2 unrelated families promotes to app-global `src/stores/`. A domain store CLUSTER gets `stores/<domain>/`; plugins get `stores/plugins/`. One store per file.

#### §4P.7 `styles/` is the app-global design-layer name
speedtest's `design/` renames to `styles/` with NO content loss; `MOTION-DOCTRINE.md` moves to `docs/`. One name, no alias.

#### §4P.8 `config/` is the presets-in-consumers home (file→dir by proportion)
A single `site.config.ts` FILE until ≥2 config modules earn `config/`. A domain-owned config module folds into that domain on graduation; only ≥2-domain-shared config stays app-global.

#### §4P.9 NO root-shell god-SFC exemption — App.vue OBEYS the 500 ceiling
**App.vue over 500 is drained by T1c:** speedtest's 833L → `useAppProviders.ts` (script) + `layouts/` (template layout-switching) + `components/dock/` (the 774L `Dock.vue` chrome). slides' 7-line `App.vue` is the target.

#### §4P.10 `layouts/` app-global route-frame chrome
`layouts/` holds the route-chrome wrappers that frame `<RouterView>`. Cross-cutting → app-global at `src/layouts/`, NEVER colocated into a feature.

#### §4P.11 The entry pair — the bootstrap CONCERN, not the `main.ts` FILE
The invariant is the BOOTSTRAP CONCERN (`createApp` + install router/Pinia/providers/dark-cascade + mount) + a thin root `App.vue`. speedtest has NO `main.ts` (inline in `index.html` for LCP — a LEGITIMATE placement). The gate asserts the concern exists and is thin, never a filename.

#### §4P.12 The FSD-divergence ledger
A PROPORTION-COLLAPSED FSD: `app → views → features/components → shared`. Route layer = `views/`; hooks = `composables/`; pure helpers = `lib/`; feature dir = `features/` (FSD `features/`+`entities/`+`widgets/` collapsed). Unidirectional imports preserved.

#### §4P.13 The per-sibling migration instrument (edict 1, the whole constellation)
Each SIBLING carries its OWN alias namespace (speedtest `@src`/`@features`/`@design`). **Ruling:** each sibling AUTHORS its own migration instrument from the SHARED repo-agnostic codemod FORMULA (§7), binding its own alias set + graduation renames. G8 propagates the FORMULA + the transposed gate scripts (the SPEC is the single source); the per-repo alias namespace + move-map are repo-local.

**`[R4]` Each sibling instrument carries a `sideEffects` step + a barrel-purity step (G8 audit, per-repo recorded):**
| Repo | `sideEffects` to add | barrels to un-mix |
|---|---|---|
| speedtest (Vite 8) | `["**/*.css","*.css","src/components/dashboard/charts/echartsInit.ts"]` (the bare-registration import) | 1 (`features/speedtest/state/index.ts`) |
| words/frontend (Vite 8) | `["**/*.css","*.css"]` | 6 (`api/index.ts` the priority — re:14 own:2 — utils/stores/types/search-constants/definition-constants) |
| slides (Vite 7) | `["**/*.css","*.css"]` | 0 (clean; 0 internal barrels) |
| sci-report (via @mkbabb/atlas) | `["**/*.css","*.css"]` (verify atlas honors it) | 0 (clean) |

**The proportion fence (edict 2):** do NOT force slides/sci-report to grow feature-dir barrels for uniformity — both have 0 internal barrels at their current scale and mandating barrels there is the needless-encapsulation vice. A barrel earns its place at a cohesion/size threshold (a promotion, like `dockContext`, not a blanket floor).

---

## §5 Backend transposition (language-abstracted)

### §5.1 The grammar (identical shape to frontend)
- **Domain/feature PACKAGE** = the backend component folder. Named by DOMAIN, not technical layer.
- **By-PURPOSE segments:** `api/` (routes/handlers), `model/` (domain types/data/rules), `lib/` (pure helpers). Colocate handler + model + logic FOR one domain TOGETHER. (The SAME `lib/` the frontend §2.1 carries.)
- **Shared home** (`shared/`, `core/`) ONLY for truly-global (≥2-unrelated-DOMAINS bar).
- **Reject layer-by-type of DOMAIN LOGIC. The scatter check runs RECURSIVELY at EVERY dir level.** `controllers/ + services/ + models/` scattering one domain is the vice. **Live: `speedtest/server/src/`** (top-level layer-by-type) AND the NESTED case — floridify's `api/{core,middleware,repositories,routers,services}/` is a 73-file layer-by-type god-dir ONE LEVEL DOWN inside a domain package. The ≥2-distinct-domain-stem scatter threshold applies at every directory level. `api/routers/{ai,media,search,wordlist,words,wotd}/` + `api/repositories/` + `api/services/` fold each router+repo+service triple into its domain package; `api/core/` is a legitimate NESTED infra-ring.
- **The infra-ring carve — FIXED constants.** Scatter threshold: a type-named dir holding modules from **≥2 distinct domain stems** IS scatter → dissolve file-by-file; **≤1 stem** or purely-infra is not. Applied recursively. Infra-ring CRITERIA: (a) cross-cutting, (b) NO single domain's business rules, (c) a thin adapter/kernel/policy. Seed allowlist: `middleware/`, `logging/`, `events/`, transport `core/`/`http/` kernel, uniform repository/model base, `config/`, `paths/`, error/exception policy. `proof:backend-structure` (§6 G9) carries this set + the ≥2-stem threshold as gate constants.
- **The shared-types carve.** A type module read by ≥2 unrelated domains is a shared schema registry → keep shared; a type module read by ONE domain folds in. floridify `models/` (174 importers) STAYS shared (blind dissolution shreds it into 8 domains behind 174 rewrites).
- **The orchestration / use-case tier.** A cross-domain PIPELINE composing ≥2 domains (floridify `lookup_pipeline.py` composes 5) lives in a `pipelines/` (backend) / app-service tier, importing domain barrels DOWNWARD only. The FE twin is `views/`.
- **No grab-bags.** A `utils.py`/`helpers.go`/`common.ts` of unrelated leaves is a god-module (named-cohesive `logging.py`/`config.py`/`paths.py` are NOT a grab-bag).
- **Depth (T2), import discipline, recursion** — identical: unidirectional, no cross-domain imports except via a package's public API.

### §5.2 Per-language befitting notes
| Language | Module ceiling | Function norm | Idiom |
|---|---|---|---|
| TypeScript (backend) | 500 raw | short, cohesive | ESM subpath exports; `import type`; barrels per package (PURE RE-EXPORT-ONLY, §2.1); **declare `sideEffects`** so barrels tree-shake. `proof:*` god-function advisory booked (no ESLint). |
| Python | 500 raw / ~300 soft | Google ~40-line funcs | package = domain dir with `__init__.py` public API; `model.py`/`api.py`/`lib/`; no `utils.py` grab-bag; ruff `C901`/`PLR0915` god-FUNCTION advisory. |
| Go | 500 raw / package-per-domain | short | one package = one domain; `gofmt`; exported identifiers ARE the public API. |
| Rust | 500 raw / module-per-domain | short | `mod.rs`/`lib.rs` re-export = the barrel; `pub` = public API. **Encapsulation IS a compile invariant** (a private `mod` makes guts UNREACHABLE — `E0603`). **But import DIRECTIONALITY + ACYCLICITY are NOT** (proto4, real `rustc`): a module cycle AND a `shared→domain` up-edge both COMPILE CLEAN in a single crate; Rust enforces acyclicity only at CRATE granularity — the workspace-of-crates cost the §1 mean REJECTS for a proportionate service. So directionality remains a **gate (G-BE4b) concern** for a single-crate service; only encapsulation is free. |

The NUMBER is per-language; the GRAMMAR is constellation-wide. **The file-length ceiling is a GATED arm per language (§6 G9), not prose.** G9 RATIFIED + wired (`--self-test` 9/9). Live-backend reproduces §5.2: floridify 47 (41 god-module + 5 grab-bag + 1 top-level layer-by-type; `wiktionary_parser.py` 1198 largest), speedtest/server 4, dns-speedtest 2 (negative control), greenfield-rs/pulse GREEN.

---

## §6 Enforcement — how the `proof:*` gates evolve

The house machine-locks structure (`proof:colocation`, `proof:no-god-module`). The spec EXTENDS them — no parallel regime — and **every new gate is a device-free `proof:*` script with self-test bites, NOT ESLint**. All frontend gates (G1/G3/G4/G6/G7) + the backend gate (G9) are PROTOTYPED in `proto-gates/`, born-RED on HEAD, self-tests firing.

**G1 — `proof:colocation` extends (the FOLD end).** KEEP the README-marker binding. ADD the globality clause (T3): INCLUDE composition + demo/sibling usage, EXCLUDE within-family DI + root-barrel/aggregator + discovery-layer type re-exports, PROMOTE a ≥2-foreign-read DI context. ADD the no-empty-segment clause (T4, covering a 1-file `lib/`). SCOPE-EXTEND to `demo/`. *(Prototyped 6/6.)*

**G2 — `proof:no-god-module` unifies across `.ts`/`.vue`/`.css`** (shader-literal + data-manifest + extracted-SFC-style T1b exempt), ONE `HARD_LIMIT=500` RAW, a `~300` advisory soft-target. The `.vue` arm counts `<template>+<script>+<style>` RAW; a `<style>`-mass breach → T1b, a script/template-mass breach → T1c, a plain over-500 `.ts` → the base cohesion carve. The CSS arm is a cohesion-carve BOUND by byte-identical fence + source-order preservation.

**G3 — `proof:depth` (new):** the T2 cap — no segment dir under a segment dir (unless the inner carries `index.ts` → recursion reset); depth beyond ≤5 below the nearest feature/component root needs a recorded rationale. *(Prototyped 5/5.)*

**G4 — `proof:import-boundaries` (new — the PROMOTE end).** The 4-node DAG; subpath-entry reaches both directions; `composables/` never reaches `components/` (except the `export *` aggregator carve); no cross-component GUTS reach; one-barrel public API with the deep-leaf subpath exemption. **Born-RED with 25 cross-component guts reaches.** The DI-context sub-ruling: a cross-component reach into a `createStrictContext`/`createOptionalContext` module imported by ≥2 FOREIGN families → PROMOTE-to-`composables/context/`. Self-test 11/11. Scope-extends to the product-app DAG (§4P.4). *(Prototyped, FAIL on HEAD by design.)*

**G5 — location-vs-publish orthogonality:** physical location by G1's family clause; publish surface by the SCC/heavy-peer discipline. A colocated PUBLIC composable is never flagged for being public.

**G6 — the CSS pair (§2.6):**
- **`proof:css-colocation` (new, TARGET gate):** every colocated `components/<n>/styles/*.css` flattens to a UNIQUE `dist/styles/` target (no clobber); subdir partials stay within `styles/`; the walk reaches every `src/components/**/styles/` dir; **a golden sorted-hash manifest of the shipped `/styles` (BOTH `dist/styles/index.css` AND the SFC-fold `dist/glass-ui.css`, 107 files) reds any byte drift**; the SOURCE-@import arm asserts no `index.css` @import dangles at SOURCE; the **T1b-walk convention** is asserted (SFC-`<style src>`-extracted files NOT double-emitted — a real double-emit, so a HARD assertion); the **SOURCE-reader-gate arm**: assert no gate reads a colocated CSS by its retired `src/styles/<name>.css` path (the 107-file reader corpus; dock's 17-partial subdir the stress case). **`[R4]` PLUS the zero-scoped-id-collision arm** (all `data-v-` ids in glass-ui.css distinct — 41 today) **PLUS the basename-uniqueness precondition arm** (no two `src/**/*.vue` share a basename — re-confirmed 0 duplicates; the SOLE precondition of the §7 zero-collision guarantee). **`[R4]` The golden-hash gate stays GREEN through the flatten IFF the basename-keyed `componentIdGenerator` (§7) is adopted — prototyped GREEN under basename (96b74ee7 both sides), RED under source-key (42590f30→dccabf40).** The gate's green-through-flatten property IS the machine witness the correct generator was adopted; it born-REDs the flatten under the default OR source generator. The golden hash is ALSO pinned in `profile:budget`/the release path so the one-time 5.0.0 rotation is re-baselined exactly once and a later generator regression born-REDs at a cut.
- **`proof:css-ownership` (interim):** every `src/styles/*.css` that STAYS global names its single owner via `README OWNER:` (`icon-chip.css` the one standing case). *(Prototyped 5/5.)*

**G7 — the enforcement-corpus migration meta-gate (`proof:no-tier-literal`) — SHIPPED.** After the flatten, assert ZERO surviving `components/(ui|custom)/` literal in `scripts/`. All-text-extension + recursive scan (scripts/ is NEITHER typechecked NOR test-resolved, so G7 is the SOLE structural witness). Detector = `/(?:@glass\/)?components\/(ui|custom)(?=[/"'\`)\s]|$)/g`. Born-RED at 865 across 229 files. Self-test 9/9. The gate AND the flatten codemod share ONE comprehensive all-text-recursive file-set; the codemod lands ATOMICALLY. **`[R4]` G7 does NOT witness the `tests/components/(ui|custom)/` fixture-dir, the `src/styles/<name>.css` reader, OR the dead-barrel-delete shapes** — those are the tests-dir flatten (§3, atom A), the G6 SOURCE-reader-gate arm (atom B), and the explicit `unlink+rmdir` post-condition (§3) respectively.

**G7-companion — the post-flatten CLOSE BATTERY (CRITICAL).** G7-GREEN (0 literals) is NECESSARY but NOT SUFFICIENT. The uniform textual drop BREAKS `subpath-policy.mjs`'s two-tier semantic logic while G7 stays green. The close battery MUST run `proof:subpath-classify` + `proof:build` (semantic soundness — `[R4]` proof:build is INDEPENDENT of the policy rewrite since `libraryEntries` sources a curated map + the `subpaths/*.ts` glob, NOT `readTree` — build-verify the flatten FIRST, then the policy rewrite gates classify/regen-exports/regen-structure) + the 12 fixture-reading gates (tests-dir soundness) + the 107-file/261-ref CSS-reader corpus (colocation soundness) + the dead-barrel post-condition assert.

**G8 — constellation propagation:** gate SCRIPTS live per-repo; the SPEC (this doc, promoted to the precepts submodule) is the single source. **G8 audit items:** (1) each sibling declares `sideEffects` (the barrel precondition, §2.1 / the per-repo table §4P.13); (2) each sibling authors its migration instrument from the shared formula (§4P.13). **`[R4]` Two new sibling gates:** `proof:sibling-sideEffects` (the declaration exists + is the array form + covers CSS + names every bare-registration import; read-only over sibling `package.json`) and `proof:barrel-pure` (no barrel mixes own runtime exports with re-exports — a HARD blocking gate for the 3-of-4 repos on Vite 8 where #21966 is live). Placement: the sibling's OWN gate suite (distributed enforcement) with the SPEC as the single source; a centralized read-only audit crosses the foreign-tree fence for reads only and is the fallback.

**G9 — `proof:backend-structure` (new — the edict-6 enforcement) — RATIFIED + WIRED.** The backend twin of G2+G4, language-abstracted. Six arms: (a) file-length ceiling (`wc -l`, hard 500 / soft 300); (b) grab-bag detection (with the cohesive-leaf carve); (c) layer-by-type-of-domain-logic — the ≥2-distinct-domain-stem threshold applied RECURSIVELY at EVERY dir level; (d) depth (T2); (e) import-direction — a per-language RESOLVER (python `..`-arithmetic, rust `crate/super`, ts relative); (f) god-FUNCTION advisory (ruff `C901`/`PLR0915`). Self-test 9/9. Born-RED on floridify (47) + speedtest/server (4) + dns-speedtest (2, negative control); GREEN on greenfield-rs/pulse. *(Prototyped + wired, `--self-test` exit 0.)*

**G10 — `proof:no-glass-in-dist` (new — the src-stays-relative permanent lock).** Assert ZERO `@glass` specifiers in `dist/*.d.ts`. glass-ui ships NO dts-alias resolver, so ANY src file on `@glass` would emit unresolvable specifiers into the SHIPPED types — a highest-severity publish defect. Born-REDs the instant a future wave migrates a src file to `@glass`. Register `["ci","release"]`.

---

## §7 Migration posture — clean break, gestalt transposition

- **No legacy, no aliases.** The flatten, the FOLD/PROMOTE/PROMOTE-context reshape, the CSS colocation, the demo tri-partition, the §4-PRODUCT graduations are MOVES — position-preserving where byte-identical-carve applies, gestalt-reshaping where structure demands. No compat shim survives a fold. **`[R4]` Grep-locked comments carry VERBATIM into the host file** (comment provenance is contract surface; a dropped `BOOKED: AY.W-…` marker silently reds a gate with zero code defect).

- **The named migration instrument (the HYBRID). `@glass` is the CROSS-PUBLISHED-BOUNDARY / consumer alias (demo, tests, scripts, siblings); the PUBLISHED `src` tree stays RELATIVE (dts self-containment + within-atom colocation cohesion).** `@glass` earns its keep where there is no dts tax; `relative` earns its keep where colocation + published-dts-cleanliness live.

- **`[R4]` The move-map is TWO independently-gated ATOMS (re-framed from "five sweeps" — the dry-run proved sweep 4 orthogonal):**

  **ATOM A — the FLATTEN ATOM** (sweeps 1, 2, 3, 5; must land atomically for G7; PROVEN GREEN: typecheck 0, `vite build` 190 chunks, classify EXACT_REPRODUCTION). Internal sequencing:
  1. **Adopt the basename `componentIdGenerator` FIRST + rebaseline the golden `/styles` hash once** (below — the config change that makes every subsequent move byte-neutral for `dist/glass-ui.css`).
  2. **src recompute** (568 flatten-VARIANT specifiers; the 1218 invariant re-emit byte-identical; formula below; the `viz/` segment handled by the same formula).
  3. **demo + tests segment-drop** (521 specifiers) **+ tests-DIRECTORY flatten** (`tests/components/{ui,custom}/X → tests/components/X`, viz → `tests/components/viz/`) **+ 12 fixture-gate re-points.**
  4. **scripts uniform `dropSegment` + the ONE subpath-policy two-set-merge semantic rewrite** (~7 code-sites + composable-tier preservation + readTree viz-descent, §3).
  5. **`ui/tabs → tabs/reka` override** (before the uniform drop) **+ EXPLICIT `unlink src/components/ui/index.ts` + `rmdir` the emptied `ui/`/`custom/` dirs** (the dead-barrel-delete the dry-run proved mandatory — skip-not-delete = ~30 TS2307) **+ prose sweep** (README/CSS-comment stale paths).
  - Close battery: G7 + `proof:subpath-classify` + `proof:build` + the 12 fixture gates + the dead-barrel post-condition assert.

  **ATOM B — the CSS-COLOCATION ATOM** (sweep 4; §2.6; orthogonal — `src/styles` untouched by A). Sequenced AFTER A. Physical `src/styles/*.css` → `components/<n>/styles/` + the 107-file/261-ref reader re-point + the build-transform walk + the T1b double-emit predicate. Close battery: G6 (golden hash — stays green because A already adopted the basename generator and B keeps `dist/glass-ui.css` untouched + `dist/styles/index.css` byte-identical per approach (i)) + the SOURCE-reader-gate arm + `proof:css-ownership`.

  The recompute formula (repo-agnostic, no module resolver): `newSpecifier = normalize(relative(elide(dirname(F)), elide(resolve(dirname(F), S))))`. Each SIBLING authors its own instance binding its own alias set (§4P.13).

- **`[R4]` The `componentIdGenerator` ruling — CORRECTED from source-content-keyed to BASENAME-keyed (the load-bearing round-4 fold).** `@vitejs/plugin-vue` 6.0.7 (verified) defaults `descriptor.id = getHash(relative(root, filename) + source)`; `dist/glass-ui.css` carries `data-v-XXXX` scoped selectors (41 scoped SFCs of 253), so the flatten ROTATES every scope-id.

  **The round-3 ruling ("scope-id keyed on SOURCE CONTENT") is EMPIRICALLY FALSE and is REPLACED.** Build-proven this round: `getHash(source)` ROTATES 28 of the 41 scoped SFCs on the flatten, because those SFCs carry `<script>` relative imports the flatten rewrites (`../../../composables/…`, cross-tier `../../ui/…`) — a depth change is a SOURCE change is an id rotation (Constellation `54045736→2f6220d9`, golden `/styles` hash `42590f30→dccabf40` = RED). Source-content is byte-neutral for a pure MOVE but NOT for the flatten's `<script>`-editing moves, NOT for a T1b `<style>` extraction (which edits the SFC to a one-line `<style src>`), and BY CONSTRUCTION not for a T1c carve.

  **RULING: `getHash(BASENAME)` — the component filename identity, config `vue({ features: { componentIdGenerator: (fp, _s, _p, getHash) => getHash(fp.split('/').pop()) } })`.** Build-PROVEN: **0 collisions across ALL 253 SFCs** (253 distinct basenames → 253 unique 8-char hashes; the precondition re-confirmed round-4: zero duplicate basenames on disk), byte-IDENTICAL `dist/glass-ui.css` under the flatten's `<script>` edits (`898a06cf` unchanged), golden `/styles` hash INVARIANT (`96b74ee7` both sides = GREEN). Basename is invariant to **directory moves AND `<script>` import edits AND `<style>` extraction AND script/template carve** — the ONLY generator that makes ALL of {flatten, T1b, T1c, every future colocation move} byte-neutral (no content-hash can make T1c byte-neutral, so basename strictly DOMINATES both the source-key and the offered `getHash(source∖style)` refinement — this RESOLVES the source-vs-nostyle fork entirely). It also yields LESS glass-ui.css churn than source-key on ordinary content edits (the selector prefix stays; only edited `<style>` rules change).

  **The one-time cost, measured:** switching off the default rotates 100% of the 41 scoped ids exactly ONCE at the 5.0.0 cut (0 of 41 baseline ids survive; `comm -12` = 0). After adoption every move is stable. The `dist/styles/` cascade (106 authored sheets) carries ZERO `data-v-` ids, so it is byte-identical under the flatten UNCONDITIONALLY (a physical MOVE); only `dist/glass-ui.css` is gated by the generator choice, and basename makes it byte-neutral.

  **The rejected alternatives:** (default `getHash(path+source)` — per-flatten mass rehash + false-RED golden gate, the needless-per-move-ceremony vice); (`getHash(source)` — the round-3 literal, rotates 28/41 on the flatten + re-rotates on every import-editing move); (`getHash(source∖style)` — path+extraction-independent but does NOT cover T1c, and needs in-generator SFC parsing, a new failure surface basename avoids). Basename is simplest, collision-free, flatten+T1b+T1c+move byte-stable, least churn, no parsing.

  **Corrected byte-identity claims:** the FLATTEN's `index.css` cascade is byte-identical UNCONDITIONALLY; `dist/glass-ui.css` is byte-identical through the flatten AND T1b AND T1c AND every future colocation move IFF the BASENAME generator is adopted. The round-3 "byte-identical dist" framing proved only the cascade half; basename closes the SFC-fold half. **`[R4]` The prose "~92 SFCs" is CORRECTED: 92 is the family-DIR count; there are 253 SFCs, 41 scoped — the collision proof is over 253, the scope-id rotation over 41.**

  **The one remaining empirical residue:** a `vite dev` scoped-style HMR smoke test under the custom generator (reasoned-safe — HMR keys on `filename`, not scope-id — but not dev-server-driven-verified). Runs before the execution wave commits.

- **REJECTED: the src→`@glass` whole-tree re-open (adjudicated).** src→`@glass` LEAKS `@glass` into the PUBLISHED `.d.ts`. demo/tests/scripts are LEAF consumer trees; src is the PUBLISHED library whose `.d.ts` IS public. Locked permanently by G10.

- **Chunk-graph churn — ALL classes MEASURED.**
  - **The FLATTEN is +0 gzip** (entry-count-preserving; `libraryFileName` keys dist filenames on the ENTRY NAME).
  - **The FOLDS are +29 gzip** (two folds add +14/+13 to D5-EXEMPT shared chunks).
  - **The PROMOTE-primitive class is BYTE-NEUTRAL** (A/B `vite build`, 190→190 chunks, 414001→414001 gzip).
  - **The PROMOTE-context class is a per-route WIN**: `dockContext` promote strips the `dock/constants.ts` drag out of 5 foreign chunks — **−327 gzip on EACH of 5 foreign routes**; the dock route nets −122 gz. **"Performance above all" is SATISFIED.**
  - **Content-hash CHURN is TWO items:** (1) the 6-chunk PROMOTE rehash; (2) the ONE-TIME scope-id rotation at basename-generator adoption (after which moves are stable — NOT the per-flatten mass rehash the default would impose). `profile:budget` compares per-chunk by BASENAME (hash-stripped), scoped to the 6 PROMOTE chunks.
  - **The execution constraint:** the root-barrel/subpath-entry re-export MUST target the deep composables leaf, NEVER the component barrel; the DI-context promote targets `composables/context/` (SFC-free) AND relocates the DI-key literal INTO the context leaf so it carries ONLY {InjectionKey, types, helper pair} with NO `dock/constants` edge — that leanness IS the −327 gz/route mechanism.
  - *(Caveat: `profile:budget` is ALREADY RED at HEAD on PRE-EXISTING causes — goo-blob ceiling + stale AP D5 baseline — owned by the BG close-battery, ORTHOGONAL to the reshape.)*

- **Zero PUBLIC-EXPORT churn** (the subpath surface is `src/*.ts` entry files, untouched; 0 package.json keys) + the internal rewrites + scripts + ~91 dir moves + tests-dir + CSS-reader sweeps.

- **Whole-tree, not incremental.** Edict 8 is the cadence.

- **Sequencing:** this reshape is a `src/` + `demo/` + `tests/` + `scripts/` + build-plugin + `vite.config` write-set; sequences AFTER the owning BG waves per the BH interleave, lands in the joint 5.0.0 cut. Atom A before atom B; the graduation folds (§4P.5), G7/G9/G10, and the sibling G8 gates land as gated execution sub-waves with born-RED proofs. The `/api` drop is orthogonal.

---

## §8 Settled matters (restated, NOT reopened)

1. The 500-line no-god-module ratchet exists, drains to ∅, counts **RAW lines**, and has NO permanent length exemption — only shader-literal + data-manifest (T1a) + SFC `<style>`-mass (T1b) + SFC script/template-mass (T1c) carves; a plain over-500 `.ts`/`.py`/`.go`/`.rs` drains by the base cohesion carve. The 500 ceiling binds product-app feature interiors + backend packages identically.
2. `proof:colocation` exists (4 clauses). The spec extends it (§6 G1); the clauses stand.
3. The ≥2-consumer visual-load-bearing invariant (J-inv-10) is the promotion bar; generalized to non-visual leaves (T3) with a decidable count running THREE placement cases — FOLD, PROMOTE-primitive, PROMOTE-context.
4. The SCC / heavy-peer publish discipline is preserved and ORTHOGONAL to physical location (§2.5, 4-node DAG). Publication is a publish-signal, not a location-signal.
5. The clean-break / no-back-compat law, presets-in-consumers, byte-identical-carve are the migration constitution.
6. The load-bearing `index.css` cascade order is INVIOLATE; CSS colocation keeps a byte-identical PUBLISHED cascade via approach (i); the SFC-fold `dist/glass-ui.css` stays byte-identical via the **BASENAME** `componentIdGenerator` (§7, `[R4]` corrected + PROVEN).
7. `subpaths/` glob-batch generation is an accepted mechanical exception — kept.
8. The Vue `composables/` essence-name is a recorded FSD divergence — kept; `lib/` its pure-helper sibling, the ONE segment vocabulary across FE/BE; `views/` (not FSD `pages/`) the product-app divergence. `composables/context/` is the DI CONTRACT home.
9. FLATTEN `ui`+`custom` is settled; the codemod is proven executable + GREEN end-to-end; the ONE decidable domain sub-group `viz/` (9 members) is COMMITTED; `ui/tabs → tabs/reka` is the sole non-uniform component case; the `subpath-policy.mjs` two-set merge (`tabs=PUBLISH`) is the sole non-uniform SCRIPT case; `@glass` is the CONSUMER-tree alias, src stays RELATIVE.
10. `src` stays RELATIVE (dts self-containment, G10). The migration instrument is the TWO-ATOM move-map scanning BOTH specifier spaces; each sibling authors its own from the shared formula.
11. **`[R4]` Barrels are PURE RE-EXPORT-ONLY + `sideEffects` is a binding barrel precondition constellation-wide** (§2.1); the four siblings each carry a per-repo `sideEffects` + un-mix step (§4P.13). Slides/sci-report keep 0 barrels (the proportion fence).

---

## §9 The execution-carve ledger (decisions made; mechanics to encode)

No design question remains. These are named EXECUTION carves the reshape wave encodes:

1. **The T1b/§2.6-walk double-emit convention (RULED):** the component-styles walk copies ONLY index.css-referenced cascade sheets; a `<style src>`-extracted scoped file rides the SFC fold pipeline and is SKIPPED. `[R4]` A HARD `proof:css-colocation` assertion (the double-emit is a real, copy-able 14KB sibling).
2. **The T1c script/template-mass carve (RULED, §1.3, PROVEN):** GlassDock 515 (no-`<style>`, →230 via useGlassDock + DockFissionBridge, or →489 via the template-only leaf), DockLayerGroup 524 (→141, script-axis, unlayered style immovable), App.vue 833 drain by extraction. `[R4]` +6-gate reader-follow cost (~85% union-read, ~15% reconcile); the useX-symmetry lift is elected, not forced; grep-locked comments carry verbatim.
3. **The barrel-vs-deep-leaf discipline for the 360 shared-module reaches (CARVE):** the recompute preserves existing reach depth (no forced re-barrelling in the flatten wave; shaders legitimately reach `.glsl.ts` leaves); a barrel-discipline census is a later proportion pass.
4. **The subpath-policy semantic rewrite (RULED, §3):** collapse `TIERS` two-tier → two-set with `CLASS={...UI_CLASS,...CUSTOM_CLASS}` (`tabs=PUBLISH`); `[R4]` ~7 code-sites + preserve the composable tier + readTree viz-descent; close battery runs `proof:subpath-classify` + `proof:build` (build-verify FIRST, independent of the policy rewrite).
5. **The tests-DIRECTORY flatten + fixture-gate re-point (RULED, §3):** move `tests/components/{ui,custom}/X → tests/components/X` (viz → `tests/components/viz/`), re-point the 12 fixture-reading gates (dir-literals AND file-literals drop-segment identically).
6. **The CSS reader-gate SOURCE-path sweep (RULED, §2.6, atom B):** re-point every `src/styles/<name>.css` literal — `[R4]` 107 gate FILES / 261 refs (dock's 17-partial subdir = 58 refs, the stress case), NOT "14 gates"; G6 SOURCE-reader-gate arm witnesses.
7. **The BASENAME `componentIdGenerator` adoption (RULED, §7, PROVEN):** `[R4]` `getHash(fp.split('/').pop())`; validate 0-collision (proven, 253 distinct basenames + the uniqueness precondition arm), measure the one-time 41-id rotation (proven, rebaseline golden once), run the `vite dev` HMR smoke test (the one residue).
8. **`[R4]` The dead-barrel EXPLICIT DELETE + post-condition:** `unlink src/components/ui/index.ts` + `rmdir ui/`/`custom/` + assert `no surviving src/components/{ui,custom}` — the dry-run's real codemod bug (skip-not-delete = ~30 TS2307).
9. **`[R4]` The sibling `sideEffects` + barrel-purity propagation (G8):** the per-repo table (§4P.13) + the two new gates `proof:sibling-sideEffects` + `proof:barrel-pure`; the proportion fence keeps slides/sci-report at 0 barrels.
10. **The `profile:budget` basename-keying confirm + the survey-graduation prototype-fold + the A1′ census correction:** confirm basename-keying before the 6-chunk rehash; fold `survey` first; `levelField.ts` is concentric-internal (the real curlFBM edge is `concentric → liquid-grid/index.ts`).

The `scripts/` god-dir disposition (498 text files; the 37 `wf-*.js` + `_reflect-*/_reshoot-*` one-shots) → a `scripts/tranche-history/` home OR a no-legacy prune, orthogonal to G7's literal scope.

---

## Appendix A — worked examples (verified)

**A1 — The dock split-brain (the FOLD census).** Of 8 shared-tree composables round-1 named "dock-only," exactly ONE folds: `useDockCtaReceive` → dock/composables/. The 7 others (`morphSignatures`, `useScrollTo`, `useLiquidReveal`, `useScrollTrigger`, `useScrollChrome`, `useBloomUp`, `useGlassBackdropLuminance`) STAY-SHARED (sibling-composed / app-global / on a publish surface).

**A1′ — The PROMOTE-primitive census (25 buried primitives).** `budget.ts` (12/7 viz, byte-neutral) → shared viz/glass leaf; `procedural-color.wgsl.ts` (6 shaders, byte-neutral) → `composables/glass/webgl/shaders/`; `useDockHold.ts` (`ui/slider`) → promote with `dockContext`; `curlFBM` (`concentric`) → shared field operator (NOT `levelField.ts`, concentric-internal).

**A1″ — The PROMOTE-context census (proven).** `dockContext.ts` (5 non-dock families) → `composables/context/dockContext.ts` (InjectionKey + helper pair + `DockOrientation`/`DockLayout` + inlined `DOCK_CONTEXT_LABEL`; SFC-free). Typecheck 0, build 0, `/dock` byte-stable, +0 backward edges, −327 gz/route ×5. The 7 other DI-contexts (0 foreign importers) STAY.

**A2 — The single-family subtree.** `composables/sortable/` (860L) → `sortable-list/composables/`. `/virtual`+`/sidebar` (0 in-repo) STAY module-level (T3a).

**A3 — The god-SFC family asymmetry.** `blob.vue` (875L) + `constellation.vue` (759L) → feature dirs like `aurora/`.

**A4 — The atomization cluster.** `labeled-field/` 5 `Labeled*` → ONE generic + typed slot.

**A5 — The provenance flatten.** `components/{ui,custom}/*` → `components/*` (**81 flat peers + `_shared` exempt + 9 under `viz/` = 90 barrel-bearing families of 91 dirs**), `ui/tabs→tabs/reka`, `subpath-policy.mjs` two-set merge (`tabs=PUBLISH`), the dead `ui/index.ts` EXPLICITLY DELETED, machine-locked README domain-map, tests-dir flatten mirror, zero EXPORT churn. `[R4]` PROVEN GREEN: typecheck 0, vite build 190 chunks, classify EXACT_REPRODUCTION (89-key public surface).

**A5′ — The T4 self-fix.** `timeline/geometry.ts` STAYS a root sibling file. Frontend `lib/` earned only by a 2nd helper.

**A6 — The §4-PRODUCT graduation (speedtest).** `admin`/`dashboard`/`survey` GRADUATE into `features/<domain>/{ui,state,api,composables,lib,config,constants,types,index.ts}`; feature INTERIORS obey the 500 ceiling (`useMeterRenderer.ts` 693 carves under the app's ratchet; the METER sub-domain recursively graduates); `views/` stays app-global; `design/`→`styles/`; `App.vue` 833L → `useAppProviders` + `layouts/` + T1c template carve; `Dock.vue` 774L → `components/dock/`; `[R4]` + the sibling `sideEffects`/barrel-purity step.

**A7 — The backend reshape (floridify + speedtest/server).** floridify `models/` (174) — shared schema-registry carve; `lookup_pipeline.py` → `pipelines/`; 41 god-modules drain under G9; the NESTED `api/{routers,repositories,services}/` layer-by-type dissolves file-by-file into domain packages, `api/core/` stays a nested infra-ring. speedtest/server `routes/`+`services/`+`validation/` dissolve. Both reproduced live by G9.

---

## Appendix B — the round-3 [R3]→resolution ledger

Unchanged from `STRUCTURE-SPEC.md` Appendix B (all 9 items resolved). Superseded where round-4 refines: the "28-reach PROMOTE chunk delta" and "Vue scope-id rotation" rows are further corrected in Appendix D.

---

## Appendix C — the round-3 BLOCKER→fold ledger

Unchanged from `STRUCTURE-SPEC.md` Appendix C (all 12 blockers folded). Round-4 revisits the `componentIdGenerator` fold (Appendix D #1).

---

## Appendix D — the round-4 EXECUTION-PROTO correction ledger

| # | Round-3 claim (canonical) | Round-4 finding | Correction | Where |
|---|---|---|---|---|
| 1 | scope-id keyed on SOURCE CONTENT makes every move byte-neutral | `getHash(source)` ROTATES 28/41 scoped SFCs on the flatten (`<script>` imports rewrite); golden RED | **BASENAME-keyed** `getHash(fp.split('/').pop())` — 0 collisions/253, byte-neutral through flatten+T1b+T1c+every move, golden GREEN; the source-vs-nostyle fork RESOLVED (basename dominates) | §7, §6 G6, §8.6 |
| 2 | "FIVE coordinated sweeps" | sweep 4 (CSS) is ORTHOGONAL — flatten builds+typechecks GREEN with `src/styles` untouched | **TWO independently-gated ATOMS** (A: flatten sweeps 1/2/3/5; B: CSS colocation) | §3, §7 |
| 3 | codemod skips the dead `ui/index.ts` barrel | skip-not-delete strands a barrel → ~30 TS2307 → typecheck FAIL | **EXPLICIT `unlink+rmdir`** + a no-surviving-`{ui,custom}` post-condition | §3, §6 G7, §9.8 |
| 4 | "~92 SFCs" | 92 = family-DIR count; 253 SFCs, 41 scoped | prose corrected; collision proof over 253, rotation over 41 | §7 |
| 5 | "14 CSS-reader gates" | 107 gate FILES / 261 refs (dock's 17-partial subdir = 58) | reader corpus restated; G6 arm scans the whole 14-family reader corpus | §2.6, §6 G6, §9.6 |
| 6 | subpath-policy "one semantic rewrite" | ~7 coordinated code-sites + composable-tier preservation + readTree viz-DESCENT | rewrite enumerated; build-verify FIRST (proof:build is readTree-independent) | §3, §6 G7-companion |
| 7 | family count "91 = 43+49−1−1" mixes families+files | 92 dirs −1 (tabs) = 91; `_shared` exempt; 90 barrel-bearing = 81 flat + 9 viz | arithmetic corrected | §3, A5 |
| 8 | GlassDock/DockLayerGroup T1c carve (asserted) | PROVEN: 515→230 / 524→141, typecheck/build 0, DOM-identical; +6-gate reader-follow cost; comment-provenance rule | carve confirmed shippable; follow-cost budgeted; minimal-drain-vs-symmetry ruling | §1.3 T1c, §9.2 |
| 9 | T1b `<style src>` byte-identity (asserted) | PROVEN: fold-ORDER unconditional (virtual sub-module); byte-identity under basename generator | T1b confirmed; the walk double-emit is a HARD gate assertion | §1.3 T1b, §2.6, §9.1 |
| 10 | barrel-only needs `sideEffects` | CONFIRMED glass-ui alone declares it; +barrels must be PURE RE-EXPORT-ONLY (Vite #21966); per-repo table | two barrel preconditions; `proof:sibling-sideEffects` + `proof:barrel-pure`; proportion fence | §2.1, §4P.13, §6 G8, §9.9 |

**No remaining design questions. The residue is the single `vite dev` HMR smoke test (§7) + running the actual close battery over the mechanically-applied rewrite (§6 G7-companion). §9 is the execution-carve ledger — settled rulings, codemod/gate mechanics to encode.**
