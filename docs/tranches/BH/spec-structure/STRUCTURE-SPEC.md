# The Constellation Structure Standard — CANONICAL

**Status:** CANONICAL (round-3 close, cut HEAD `c3621f08`, verified against live HEAD `2f67ead5`). Supersedes `ROUND-3-SPEC.md`, `ROUND-2-SPEC.md`, `ROUND-1-SPEC.md`. Every round-2 `[R3]` design question is RESOLVED; every round-3 blocker judged correct is FOLDED IN (the fold ledger is Appendix C). The residue is a named EXECUTION-CARVE ledger (§9) — decisions made, mechanics to encode in the codemod/gates.
**Scope:** ONE structural grammar for every repo in the constellation — glass-ui (the library) + its sibling demo/consumer apps (speedtest, words/floridify, slides, sci-report) + the polyglot backends. Frontend and backend under one law; each language binds its own idiomatic norms.
**Constitution:** the user's edicts (§0). Aristotelian proportion is the divining rod; colocation is recursive; no god-modules, no needless encapsulation; clean break, no legacy.

**Freshness note (load-bearing).** The round-3 prototypes ran on a STALE worktree base and reported the migration instrument as targeting phantom machinery (`@glass` absent, `subpath-policy.mjs` absent, `goo-dot-matrix`, 50 custom). Three independent lenses + this synthesizer verified against live HEAD: `@glass/* → ./src/*` in `tsconfig.json` (src 0 uses — stays relative; demo+tests **521** `@glass/components/(ui|custom)` specifiers); `subpath-policy.mjs` EXISTS with the two-tier TIERS structure; `liquid-grid` present, `goo-dot-matrix` absent; 43 ui + 49 custom dirs. **The spec is accurate against the tree execution will run against.** Proto "phantom" findings are stale-base artifacts and are DISCARDED.

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
3. **A file over 500 RAW lines is a god-module** — drains via the ratchet by cohesion carve. Single-artifact carves only: shader-literal, data-manifest (T1a), SFC `<style>`-mass (T1b), SFC script/template-mass (T1c). No permanent length exemption. The 500 ceiling binds product-app feature INTERIORS and backend packages identically.
4. **A segment dir holds files, not other segment dirs.** Segments: `composables/ lib/ shaders/ skeleton/ styles/ sections/ constants/ config/` (FE), `api/ model/ lib/` (BE). A segment appears only with real members OR a genuinely-separable concern (T4). A single separable helper stays a ROOT SIBLING file until a 2nd earns its dir.
5. **A nested sub-component with its own `index.ts` RESETS the depth budget** — how recursion stays legal (≤5 dirs below the nearest feature/component root; T2).
6. **Cross-family imports go through the BARREL, never into another component's guts.** Precondition: each repo declares `sideEffects` (js side-effect-free) so barrels tree-shake. The SOLE barrel exemption is a curated subpath-entry re-exporting a deep colocated LEAF (never through the component barrel).
7. **The divining rod runs both ways:** FOLD an over-abstracted single-owner leaf back to its owner; PROMOTE a buried multi-family primitive / DI-context OUT to the shared tree.
8. **Location and publish-surface are ORTHOGONAL** (4-node DAG, §2.5). "Ships on a subpath" ≠ "lives in a shared dir."
9. **Reject layer-by-type of DOMAIN LOGIC** (`controllers/ services/ models/` scattering one domain) — group vertically. The infra-ring, shared-types registry, and orchestration/pipeline tiers are the legitimate exceptions (§5.1). The scatter check runs RECURSIVELY at every dir level.
10. **Route/entry layer:** FE `views/` (route-bound, never folds), BE `pipelines/`/app-service tier (composes domains downward). Bootstrap concern thin.
11. **Clean break, no aliases.** Every move is position-preserving where byte-identical-carve applies, gestalt-reshaping where structure demands. No compat shim survives a fold.
12. **Every new structural gate is a device-free `proof:*` script with self-test bites, born-RED on the tree it drains — never ESLint.**

---

## §1 The Law of Aristotelian Proportion

> The mean is not a number. It is the answer to one question asked of every module: **does everything in here belong together, and is anything that belongs together kept apart?** The thresholds below are guardrails that catch a module drifting toward either vice — they are not the law. The law is cohesion. The divining rod runs in **both directions**: it folds an over-abstracted leaf back into its sole owner, AND it promotes a general primitive out of the one consumer that buried it (§1.5).

### §1.1 The two vices, named

| Vice | Name | The failure |
|---|---|---|
| **Excess** (too little division) | **God-module** | A file/dir holds >1 concern; things that change independently are fused; a reader must hold the whole file to understand any part. |
| **Deficiency** (too much division) | **Atomization** | A concern is shattered across many tiny modules; an abstraction is minted before ≥2 real consumers exist; the reader runs a scavenger hunt across folders to assemble one behaviour. Premature abstraction is *more* harmful than the duplication it removes. Three special cases: **atomization-by-misplacement** (burying a general/sibling-owned/app-global primitive inside ONE consumer); **the buried-primitive** (a genuinely shared primitive physically resident inside one component that ≥2 OTHER components reach into — the **25** live cross-component guts reaches, §1.5); **the buried DI-context** (a provide/inject context provided by ONE component and read by ≥2 FOREIGN component families — the `dockContext` case, §1.3/§1.5, proven end-to-end). |

Layer-by-TYPE (`controllers/ models/ utils/`) is the god-module's structural cousin (scatters one feature across type-folders); over-colocation is atomization's. The spec forbids both.

### §1.2 The unit: the component FOLDER

The atomic module is the **per-component folder with an index barrel** — reka-ui's Combobox (17 files) and a 2-file wrapper are the SAME unit at different scales; the folder scales with the concern, the barrel is invariant. This is FSD's *slice*, bulletproof-react's *per-feature dir*, Josh Comeau's *component-folder-with-index* — one convergent unit, SOTA-praised across every round. glass-ui already runs it in `custom/`; the spec canonizes THIS unit as universal (frontend and backend).

**Colocation is the default; promotion to a shared home is the exception that must be earned** (§1.3 T3). This single directionality — *local until proven shared* — is the spine every source encodes.

### §1.3 The thresholds (guardrails, with rationale)

**T1 — File size. Hard ceiling 500 RAW lines; soft target ~300; the real test is cohesion.**
- 500 is the house-native ratchet (`proof:no-god-module`, `HARD_LIMIT=500`). **Lines are counted RAW** (`source.split("\n")`, mirrors `wc -l`) — the house's live definition, PINNED. No "logic-line" variant. The §8 RATCHET_BASELINES are raw counts, untouched.
- A hard number becomes a target ("files fill up right to the limit"). So 500 is a **fail ceiling**, ~300 an **advisory soft target** (warn, not fail), and a file *under* 500 is still a violation if it fuses >1 concern.
- **Over-ceiling escape: the draining RATCHET only — no permanent length exemption (RULED).** A cohesive file over 500 registers a ratchet row with rationale and drains as it is carved; it is NOT permanently exempt. A permanent complexity-gated file-length exemption is rejected (edict 7). The god-FUNCTION metric IS adopted as a SEPARATE per-language advisory (§5.2). The only length carves are the single-artifact cases below.
- **Shader-literal exemption:** a single cohesive `*.{glsl,wgsl,frag,vert}.ts` string is ONE artifact — splitting corrupts the assembled shader. Exempt from the line gate, governed by cohesion.
- **Data-manifest exemption (T1a):** a single-source DATA manifest N gates parse by literal path (demo `stories/manifest.ts` 1406L; the `tokens.css` cascade) may exceed 500 *as data* IFF its resolution/logic machinery is carved out (the `manifest/lazy.ts` precedent). Registered, named — not silent drift.

- **SFC over-ceiling carves — TWO tools for TWO breach classes (T1b + T1c; a `.vue`'s RAW count is `<template>+<script>+<style>`, §6 G2):**
  - **T1b — `<style>`-mass extraction.** A cohesive SFC whose template+script is proportionate while its `<style scoped>` mass pushes it over 500 (census worst class: speedtest `SpeedtestResults.vue` 2265L/~1350 style; glass-ui `Slider.vue` 475/278, `ContinuousTimeline.vue` 351/315, `ContinuousMarkers.vue` 444/264) is drained the way its shaders are — the style is EXTRACTED to `<style src="./styles/<Name>.css">` in the component's colocated `styles/` dir (§2.6), and the extracted CSS is EXEMPT from the SFC line count (a single cohesive artifact under its own CSS ceiling). **Byte-neutral for glass-ui** (SFC scoped CSS already folds to `/styles` at build, AN.W1). The extracted file rides the SFC fold pipeline (`dist/glass-ui.css`), NOT the `index.css` cascade — so the component-styles walk copies ONLY the sheets `index.css` references (the T1b/§2.6-walk convention).
  - **T1c — script/template-mass carve (BH-R3 fold — the taxonomy completion).** T1b does NOT drain an SFC that breaches with LITTLE OR NO `<style>` — the script+template IS the mass. **Live glass-ui drivers (verified):** `GlassDock.vue` 515L (**~0 `<style>` lines** — a pure script+template breacher T1b cannot touch), `DockLayerGroup.vue` 524L/~49-style. proto4's speedtest twin: `App.vue` 833L (~400-line `<template>`). *(The critiques' "SegmentedTabs 512" citation was a stale-base artifact — SegmentedTabs.vue is 416L at HEAD, not a breacher.)* The carve is the standard cohesion decomposition, applied to the two SFC axes:
    - **Template mass →** extract cohesive sub-component SFCs (a section of the template with its own props/logic becomes a nested sub-component under the root or under `sections/`, §2.3).
    - **Script mass →** extract component-local composables (a coherent block of reactive logic → `composables/<useX>.ts`; a single such block stays a ROOT SIBLING file until a 2nd earns the dir, T4).
    - The carve drains under the RATCHET like any cohesion carve — it is NOT a permanent exemption and NOT a T1b `<style src>` extraction (a no-`<style>` SFC has nothing to extract). Every over-500 SFC now has a named drain tool: `<style>`-mass → T1b, script/template-mass → T1c.

**T2 — Directory depth. Colocation nests at most ONE segment level below a component root; recursion resets the budget.**
- SOTA: readers lose context past 3–4 levels; FSD caps at EXACTLY 3 (Layer→Slice→Segment).
- **Rule:** within one component root the tree is `root → {segment dir} → file`. A segment dir (`composables/ lib/ shaders/ skeleton/ styles/ sections/ constants/ config/`) holds files, NOT other segment dirs. A nested SUB-COMPONENT (a child with its own multi-file structure + `index.ts`) is a NEW component root that RESETS the local budget — how recursion (edict 3) stays legal without unbounded depth. A global sanity cap (**≤5 dirs** below the NEAREST feature/component root — relative, not an absolute `src/components/` path, since product apps have no such anchor) catches runaway recursion without a recorded rationale. Machine-locked by `proof:depth` (§6 G3; prototyped, self-test 5/5).

**T3 — Promotion to the shared tree. ≥2 UNRELATED families — decidably counted, with three placement cases.**

The house's ≥2-consumer visual-load-bearing invariant (J-inv-10) IS this rule; the spec extends it to every non-visual leaf. The naive `grep | family-extract | distinct-count` gives WRONG counts (the A1 flagship greenlit 7 illegal folds). The count is made decidable by its inclusion/exclusion set:

- **INCLUDE composition edges.** A leaf real-imported by a SIBLING shared-tree leaf belongs to that sibling's shared family. `morphSignatures` imported by `useGooMorph` → a shared motion primitive, NOT dock-only.
- **INCLUDE demo/sibling-app usage.** A leaf a consumer app uses APP-GLOBALLY (demo `AppShell.vue`, a sibling repo) is proven-general. `useBloomUp` is app-global route-bloom → stays shared.
- **EXCLUDE WITHIN-FAMILY DI plumbing.** A `provide`/`inject`/DI-key indirection wired WITHIN one component family is NOT a family edge (`useGeolocation` reads as 7-importer cross-family but is single-family through DI keys → stays single-family).
- **EXCLUDE discovery-layer TYPE re-exports.** A context's TYPE re-exported through the `api/` discovery layer (`api/index.ts`, `api/types-extra.ts`) is a PUBLISH edge, NOT a foreign consumer. `dockMorphContext` is type-re-exported via `api/` but has ZERO foreign module-path importers → STAYS colocated (the criterion counts MODULE-PATH imports, never name mentions or type re-exports).
- **PROMOTE a cross-family-read DI context (the third case — proven end-to-end).** A provide/inject context PROVIDED by one component and READ (via `inject`/the paired helper) by **≥2 non-owning component families, counted by module-path import**, is a genuine shared context primitive — NOT excludable, NOT a guts reach to route through a heavy barrel. It PROMOTES to a lightweight shared context leaf (`composables/context/`), carrying the `InjectionKey` + the helper pair + the context's own domain types. The provider imports it UP; every foreign reader imports it UP — both legal `components→shared` edges; `proof:import-boundaries` (G4) greens, T3 is satisfied, no component's SFC graph is dragged into a foreign chunk. **Live driver:** `dock/composables/dockContext.ts` (a `createStrictContext` module that ALREADY imports the shared factory from `composables/context/`) is read by 5 non-dock families (`ui/slider`, `ui/select`, `ui/popover`, `ui/dropdown-menu`, `custom/hover-popover`) via `useOptionalDockContext` → **promote to `composables/context/dockContext.ts`.**
- **EXCLUDE root-barrel and curated-aggregator re-exports** — a re-export from `src/index.ts` or a `*/core/index.ts` is a PUBLISH edge, not a consumer family. **Publication is a publish-surface signal, NOT a physical-location signal** (§2.5): a published leaf can STILL fold physically, because the subpath-entry re-points to the deep leaf (B4). `publishedPublic` is advisory in the promotion decider, never a false 2nd family.

**The DI-promotion criterion, codified (decidable):** *a `createStrictContext`/`createOptionalContext` module promotes to `composables/context/` IFF ≥2 non-owning feature-dirs import its MODULE PATH; else it stays colocated with its owning component.* Enumerated over all 8 DI-context instance sites at HEAD, exactly ONE qualifies: `dockContext`=5 → PROMOTE; `dockMorphContext`/`dockLayerContext`/`drawerSnapContext`/`toggleGroupContext`/`sortable-list/context`/`configurator/size`/`DockLayerGroup`=0 → ALL STAY. A many-foreign-consumer STATE factory (`useConfiguratorState`) is a DIFFERENT category — already correctly exported via subpath — the DI rule is scoped to context INSTANCES.

**The overriding rule:** *a shared leaf composed by a sibling shared leaf, used app-globally, OR read as a context by ≥2 foreign families STAYS/BECOMES shared, regardless of component-family count.* Below the bar, a leaf colocates under its sole owner. Machine-locked by `proof:colocation` globality clause (§6 G1) + `proof:import-boundaries` DI-context sub-ruling (§6 G4).

- **Exemption (T3a):** a PUBLISHED subpath surface with a recorded external (cross-repo) consumer stays module-level at 0 in-repo families (`/virtual`, `/sidebar`). Machine-checkable against `docs/consumer-evidence/`.
- Census fact: ~10 composables clear ≥3-unrelated-families today; the bar is **≥2** (aligned to inv-10), ≥3 the natural cluster.

**T4 — Segment minimum-substance.** A `composables/` holding one file, an empty `constants.ts`/`shaders/`, a 1-file `lib/` — atomization. A segment appears ONLY with real members OR a genuinely-separable concern. **A lone component-local composable OR a lone pure/mixed helper stays a SIBLING FILE at the component root until a second earns the `composables/`/`lib/` dir.** (This is why `timeline/geometry.ts` — timeline's ONLY separable helper, verified — stays a root sibling, NOT a 1-file `composables/`; §3.) Machine-locked by `proof:colocation` no-empty-segment clause (§6 G1).

### §1.4 Both-direction violations, decidable

**God-module (excess) — any of:**
- file >500 RAW lines (non-shader, non-data-manifest; SFC drained via T1b `<style>`-mass OR T1c script/template-mass carve);
- a dir mixing >1 domain/concern with no sub-grouping;
- layer-by-type at ANY dir level (`controllers/`, `services/`, `models/` scattering ≥2 domain stems — but see the §5.1 infra-ring + shared-types carves; the scatter check runs RECURSIVELY, §5.1);
- a grab-bag (`utils.ts`, `helpers.go`, `common.py`) accreting unrelated leaves.
- **The `mixed-kind` flat-dir smell (advisory, not a gate).** A flat dir of >~7 sibling files of MIXED kind (page vs helper vs shared) is a human-review flag. The machine-checkable substitutes ARE gated: the README domain-map (§3), `proof:depth`, `proof:import-boundaries` (the real mechanism by which a flat peer set stays legible — peers compose only through barrels). No standalone `mixed-kind` gate.

**Atomization (deficiency) — any of:**
- a shared-tree resident with <2 unrelated families (per T3) and no external-consumer exemption → **FOLD** to its sole owner;
- **atomization-by-misplacement:** a general/sibling-composed/app-global leaf buried inside one consumer;
- **the buried-primitive:** a genuinely shared primitive resident inside one component that ≥2 OTHER components import → **PROMOTE** to the shared tree (§1.5);
- **the buried DI-context:** a provide/inject context module-path-imported by ≥2 FOREIGN families → **PROMOTE** to a shared context leaf (§1.3 T3);
- a segment dir with a single trivial member (T4) — incl. a 1-file `composables/`/`lib/`;
- a wrapper module that only re-passes its inputs (labeled-field's 5 `Labeled*` SFCs → one generic + typed slot);
- a composable/util extracted before its 2nd consumer exists.

### §1.5 The FOLD↔PROMOTE symmetry (the divining rod runs both ways)

One census machinery, three placement cases. **T3 is a placement function of the family count, not a one-way ratchet.** `proof:colocation` globality and `proof:import-boundaries` are the two ends of the SAME rod:

- **FOLD (globality gate, §6 G1).** A shared-tree leaf with EXACTLY ONE in-repo family and no sibling/app-global/external/context signal colocates under its sole owner. The verified fold set is small (Appendix A1): `useDockCtaReceive` → `dock/composables/`; `composables/sortable/` → `sortable-list/composables/`. Seven round-1-named "folds" are STAY-SHARED.

- **PROMOTE — buried primitive (import-boundaries gate, §6 G4).** A primitive resident inside one component that ≥2 OTHER components reach into promotes OUT. `proof:import-boundaries` is **born-RED on HEAD with 25 cross-component GUTS reaches**. The measured drivers:
  - `aurora/constants/budget.ts` — imported cross-component by **12 files across 7 viz families** (concentric, constellation, dot-flow-field, dot-matrix, fourier-field, goo-blob, liquid-grid). A shared viz-budget primitive buried in aurora/. → promote to a shared viz/glass home. **(Weight note, §7: byte-neutral — `budget.ts` is fully constant-folded.)**
  - `aurora/constants/shaders/procedural-color.wgsl.ts` — spliced by **6 sibling viz shaders**. Its GLSL twin already lives shared at `composables/glass/webgl/shaders/`; the WGSL twin got buried. → promote to the same shared shaders home. **(Weight note: byte-neutral — the twins already co-bundle.)**
  - `dock/composables/useDockHold.ts` reached by `ui/slider` — a non-DI dock guts reach. → promote WITH `dockContext` or re-point UP.
  - `liquid-grid/composables/liquidGrid.ts` (`curlFBM`) reached by `concentric/useConcentric`. → the shared field operator. (The round-2 A1′ entry naming `concentric/composables/levelField.ts` was a FACTUAL ERROR — `levelField.ts` is concentric-internal; the real cross-family curlFBM edge is `concentric` importing `curlFBM` from `liquid-grid/index.ts`, already barrel-exposed.)
  - The 5 `dockContext` reaches are the DI-context case (below), not buried-primitive.

- **PROMOTE — buried DI-context (import-boundaries gate, §6 G4).** `dockContext.ts` → `composables/context/`, per the codified criterion (§1.3). **Proven end-to-end:** the move typechecks (`vue-tsc --noEmit` exit 0, test-tsconfig exit 0), `vite build` exit 0, `proof:subpath-enumeration` PASS (the `/dock` public surface re-exports all 7 symbols byte-stable), and the promote introduces **ZERO new backward edges** (`composables/context/dockContext.ts` imports only `vue` + `./createContext`). The chunk-graph is CLEAN before AND after; the promote marginally IMPROVES it (leaf 1166B→415B, factory dedups across 6 chunks, every foreign route reaches −1 chunk).

**The three cases use the same census machinery.** The reshape wave runs all three: FOLD (small), PROMOTE-primitive, PROMOTE-context — draining to a tree where every cross-component edge goes through a barrel or a shared leaf. **The aristotelian mean is one decidable placement RULE run over three cases.**

---

## §2 The recursive component-dir schema (frontend)

### §2.1 The atomic unit
```
components/<name>/
  <Name>.vue                 # the root SFC
  <SubName>.vue …            # sibling sub-components (flat until they earn their own dir)
  index.ts                   # THE public API barrel — the component's import surface (feeds the subpath)
  constants.ts               # magic numbers/enums (when ≥1 exists; proof:colocation clause b)
  README.md                  # the colocation-adoption marker + human map (mandatory when complex)
  composables/               # component-LOCAL composables (when ≥2, or one genuinely separable)
  lib/                       # component-LOCAL pure/mixed helpers — non-`use*` math/factories (when ≥2; else a root sibling file)
  shaders/  skeleton/  styles/  sections/     # segment dirs, when present
```
The barrel `index.ts` is the invariant the flat subpath (`@mkbabb/glass-ui/<name>`) re-exports, so the export surface is DECOUPLED from internal layout. A trivial 2-file component keeps the folder+barrel (needed for the subpath; reka does this uniformly).

**The `lib/` segment (BH-R3 fold — the segment-vocabulary-is-one-law completion).** The frontend schema now carries `lib/` beside `composables/`, matching backend §5.1 (`lib/`) and product features §4P.1 (`engine|lib/`) — the asymmetry that forced the `geometry.ts` self-contradiction is closed. `lib/` holds a component's PURE/MIXED domain helpers — non-`^use[A-Z]` math, pure factories, geometry (`timeline/geometry.ts` is pure math + a reactive `createContinuousGeometry` factory, NOT a `use*` composable). Per T4, a SINGLE separable helper stays a ROOT SIBLING file (like `constants.ts`); `lib/` is earned by the 2nd. This is the ONE segment vocabulary across FE and BE; `composables/` is the Vue essence-name divergence (§2.4), `lib/` its pure-helper sibling.

**The barrel-only rule + the deep-leaf exemption (B4) + the `sideEffects` precondition.** `index.ts` is the ONLY import surface for anything reaching this component from ANOTHER component or the app. The SOLE exemption: a **curated subpath-entry** (§2.5) re-exports the deep colocated LEAF directly (`export { X } from '../components/dock/composables/X'`) — NEVER through the component barrel (which would drag the whole component into a heavy subpath chunk). `proof:import-boundaries` distinguishes a legitimate subpath deep-leaf re-export from an illegal cross-component guts reach. **PRECONDITION (BH-R3 fold, constellation-wide):** the barrel-only rule's tree-shaking safety DEPENDS on the repo declaring `sideEffects` (js side-effect-free) in `package.json` — glass-ui declares `sideEffects: ["*.css"]`, so unused barrel re-exports are eliminated. A sibling repo that does NOT declare `sideEffects` would see the barrel-only mandate INFLATE production bundles (unused re-exports retained). `sideEffects` is therefore a BINDING precondition of the barrel-only rule everywhere; a G8 sibling-audit item.

### §2.2 What colocates (the default)
Everything a component OWNS: sub-components, component-local composables, `lib/` helpers, constants, shaders, skeletons, styles (§2.6), README. A component-specific composable/helper read only by that component is NOT module-level and must NOT sit in the shared tree.

### §2.3 Recursion
A sub-component that grows its own multi-file structure becomes a nested component root under the parent (or under `sections/`), with its own `index.ts`, its own local `composables/`/`lib/`, its own README if complex. Aurora (demo) is the gold standard: `aurora/` root + `config/` + `sections/` + `presets.ts`. Each nesting RESETS the depth budget (T2). The `tabs/reka/` sub-component group (§3) is the executable instance.

### §2.4 The shared tree — what earns a module-level home
`src/composables/` holds ONLY leaves clearing T3. Its sub-trees (`motion/ glass/ dom/ dark/ reactive/ context/`) are the shared homes. The PROMOTE set (§1.5) joins them: buried multi-family primitives (`budget.ts`, `procedural-color.wgsl.ts`) land in the befitting shared sub-tree; the buried DI-context (`dockContext.ts`) lands in `composables/context/`.

**`composables/context/` is the DI CONTRACT home (an identity refined, not a surprise).** The prototype proved the DI-context promote FORCES the context's own domain types into the shared dir: `DockContext` consumes `DockOrientation`/`DockLayout`, and a backward `shared→component` type import would violate the DAG, so those types move WITH the context. `composables/context/` is therefore explicitly redefined from "domain-neutral DI FACTORY only" to **"the DI CONTRACT home = the neutral factory + every cross-cutting promoted context + that context's own contract types."** A reader finding `DockOrientation` in the shared DI dir is seeing the law work, not a smell — a DI contract IS its types.

**The Vue-idiomatic divergence (recorded, deliberate).** FSD names segments by PURPOSE and warns against essence-names (`hooks/`). glass-ui and the Vue ecosystem use `composables/` (essence-name). The spec KEEPS it (ecosystem consistency), recorded as a documented divergence; `lib/` is its purpose-named sibling for non-`use*` helpers. Backend uses purpose-names (§5).

### §2.5 Location vs publish-surface (the orthogonality ruling) + the 4-node boundary model

TWO axes the current tree conflates:
- **Physical location** is governed by T3 (family count).
- **Publish surface** is governed by the SCC / heavy-peer discipline (a keyframes/value.js-bearing leaf ships via a curated subpath, off the vueuse-free root barrel).

**These do not couple.** "Must ship on `/motion`" does NOT mean "must physically live in `composables/motion/`."

**The boundary model is a 4-node DAG:**
```
shared/composables → components → subpath-entries (src/*.ts) → app
```
The curated **subpath-entry layer** (`src/index.ts`, `src/motion.ts`, `src/dark.ts`, `src/keyboard.ts`, the `src/subpaths/*.ts` mirror barrels, `src/api/index.ts`) is the ONLY node EXEMPT from the shared→components prohibition — it may reach BOTH directions. proto1 proved this is the only shape that compiles: `/motion` resolves through `src/motion.ts`, so a fold of a published dock composable into `dock/composables/` requires `src/motion.ts` (or `composables/motion/index.ts` re-pointed) to re-export from the deep leaf — a legal subpath-entry edge, an illegal `composables/`→`components/` edge.

**The measured edge legality table (prototyped, self-test 11/11 incl. the DI bite):**
| Edge | Verdict |
|---|---|
| subpath-entry → anything | LEGAL (the exempt publish node) |
| components → shared | LEGAL (the UP edge) |
| components → same-component guts | LEGAL |
| components → sibling BARREL (`index.ts`) | LEGAL (compose a sibling) |
| components → other-component GUTS | **RED** (promote the shared primitive) |
| ≥2 components → same buried DI-context guts | **RED → promote to `composables/context/`** (distinct DI verdict) |
| shared → shared | LEGAL |
| shared → components (plain) | **RED** (the DAG prohibition) |
| shared → components via `export *` aggregator barrel | LEGAL (the T3 publish carve; the ONE standing HEAD instance is `composables/index.ts → infinite-scroll/composables`) |
| any → subpath-entry | **RED** (the publish layer is the sink) |

### §2.6 Styles / CSS — PHYSICAL colocation via approach (i), PROVEN dev+HMR+byte-identical-dist

The census found component-SPECIFIC CSS (`dock/*.css`, `border-progress.css`, `cta-seat.css`, `segmented-tabs.css`) in the GLOBAL `src/styles/` tree — a colocation miss vs SOTA (Vuetify colocates `VBtn.sass`). **Approach (i) is PROVEN end-to-end on a running demo dev-server; it is the canonical mechanism. Option (ii) (Vite dev alias) is DROPPED — dominated.**

**The proven mechanism — approach (i): rewrite the SOURCE @import to the real colocated path + a build-transform that flattens it back.**
1. The ~14 CLEAN single-owner families relocate PHYSICALLY into `components/<n>/styles/<n>.css` (+ any own-subdir partials — dock.css keeps its 17-partial `dock/` subdir INSIDE its colocated `styles/`, so `./dock/*` internal refs survive untouched).
2. `src/styles/index.css` — the SINGLE inter-component cascade-ordering authority, staying in GLOBAL `src/styles/` — rewrites each moved `@import "./dock.css"` to the honest on-disk path `@import "../components/dock/styles/dock.css"` (a REAL file every resolver agrees on; no `custom/` segment post-flatten).
3. A ~30-line build-transform (2 fns appended to `vite.style-fold.ts`, wired into `publishStyleAssets` AFTER `copyStyleAssets`, BEFORE `foldSfcBundle`): `copyColocatedComponentStyles` walks `src/components/**/styles/` and `cpSync`s each index.css-referenced sheet into a FLAT `dist/styles/`; `rewriteDistIndexColocatedImports` regex-rewrites `@import "../components/…/styles/(X)"` → `@import "./$1"` in the shipped `dist/styles/index.css`.

**The proof (isolated HEAD-pinned worktree):** Vite v8 dev started clean, 0 CSS resolve errors; `/dock/overview` HTTP 200 with `.glass-dock` computed values all painting from the colocated `dock/styles/dock/shell.css`; **HMR SURVIVES** (editing the colocated `shell.css` mutated the live `.glass-dock` with NO reload); `npm run build` green; `diff -rq baseline dist/styles` **exit 0 across all 106 CSS files**, `dist/styles/index.css` byte-identical. **Decisive contrast:** the "leave @import UNCHANGED + flatten-on-publish" variant is a HARD DEV BREAK (HTTP 500); approach (i) is the only variant satisfying BOTH dev and build.

**The rulings:**
1. **The ~14 CLEAN single-owner families colocate PHYSICALLY** into `components/<n>/styles/` (+ own-subdir partials): dock, drawer, border-progress, tabs, select, sheet, completion-seal, hover-popover, instrument-chassis, configurator, cards, floating-panel, card-scroll, glass-refract. Extracted SFC scoped styles (T1b) land here too — but under the T1b/walk convention: the walk copies ONLY index.css-referenced cascade sheets; a `<style src>`-extracted SFC-scoped file rides the SFC fold pipeline (`dist/glass-ui.css`) and is SKIPPED. Machine-locked by `proof:css-colocation` (§6 G6).
2. **`icon-chip.css` (the SOLE cross-global @import) STAYS DOCUMENTED-OWNERSHIP.** It keeps a `README OWNER:` field + `proof:css-ownership` (§6 G6). The census confirms icon-chip is the ONLY cross-global @import among the candidate families.
3. **Genuinely-global cascade stays in `src/styles/`:** the token cascade, the 5-rung glass ladder, typography, theme, `utilities.css`, `paper.css`, `animations.css`, `transitions.css`, no-single-owner recipes. `feedback-tone.css` is owned by the feedback CLUSTER (≥2) — stays global.
4. **`index.css` remains the SINGLE INTER-component ordering authority** — the load-bearing @layer + source-order ties are INVIOLATE. The PUBLISHED cascade is byte-identical; only the SOURCE @import TARGETS change. Cascade-ORDER = global; file LOCATION = colocation.

**The CSS reader-gate SOURCE-path sweep (BH-R3 fold — the true 4th coordinated sweep).** Physical CSS colocation breaks the reader-gate corpus: **107 gate scripts read `src/styles/*.css` SOURCE literals** (58 read `dock.css`; `proof-dock-css-carve.mjs` HARD-asserts `src/styles/dock.css` exists AND `@import ./dock/${name}`). G7 (§6) scans only `components/(ui|custom)/` literals and MISSES the `src/styles/*.css` shape; G6 checks DIST byte-parity, not SOURCE reader-gates. So the CSS-colocation sub-wave MUST re-point every `src/styles/<name>.css` SOURCE literal in the 14 colocation-target families to its colocated path — a distinct sweep from the `components/(ui|custom)/` drop and the tests-dir flatten. `proof-tabs-std` already carries the `|| read(TABS_DIR/…)` colocated-fallback precedent for 1 of 14; the other 13 need it. `proof:css-colocation` (G6) gains a SOURCE-reader-gate arm: assert no gate script reads a colocated CSS by its retired `src/styles/` path.

**The build change lands in the EXECUTION tranche.** The spec records the mechanism + the dev+HMR+byte-identical proof + the golden-hash gate + the T1b-walk convention + the reader-gate sweep.

---

## §3 VERDICT — flatten `components/ui` + `components/custom`

**FLATTEN.** Merge into ONE `src/components/` of domain-organized per-component folders as flat peers — with the ONE decidable domain sub-group the flat-namespace trigger commits (`viz/`, below). No provenance tier, no dead markers. **Settled (edict 5), executable, proven.**

### The evidence (unanimous for owned libraries)
Every library that OWNS its components keeps flat peers, no vendored-vs-house tier: **reka-ui** (~78 flat + `shared/`, glass-ui's own substrate), **Base UI**, **Ark UI** (~70 flat + `factory.ts`), **PrimeVue** (80+), **Vuetify**. The two-tier is EXCLUSIVELY a shadcn-CONSUMER pattern whose sole rationale — protecting vendored copies for `npx shadcn add` re-pull — is DEAD here (glass-ui's `ui/` is ~100% forked). Sharper structural proof: **6 `ui/` components already reach UPWARD into `custom/`** — a "base" tier importing the "composite" tier is no layering. The ui/custom boundary encodes NO architectural invariant. The tier is provenance sediment.

### The final tree shape — COMMITTED (BH-R3 fold: fire the trigger, don't hedge)
The DEFAULT is FLAT + a gated `components/README.md` domain-map (the reka-77-flat precedent). The **flat-namespace legibility trigger is decidable and FIRES:** >60 flat peers AND ≥1 domain family with ≥5 non-adjacent members. Measured at HEAD: **91 flat peers** AND a **9-member procedural-viz family** (aurora, concentric, constellation, dot-flow-field, dot-matrix, fourier-field, goo-blob, goo-filter, liquid-grid) scattered across alphabet positions. The trigger FIRES, so the spec COMMITS the verdict rather than deferring to "the census":

- **ONE light domain sub-group is adopted — `components/viz/`** — holding exactly the 9-member procedural-viz family (goo-filter, the SVG-goo `<defs>` mount, rides with its family). Every OTHER family stays a pure flat peer (no other family trips the ≥5-non-adjacent-members bar). The subpath is UNCHANGED (`@mkbabb/glass-ui/aurora` re-points to `../components/viz/aurora`; zero export churn).
- **Why domain-grouping ESCAPES §3's own anti-two-tier argument (the reconciliation the spec owed).** §3's sharpest anti-tier proof is "you must KNOW dock is *custom* before you can `ls`" — a navigate-by-PROVENANCE step that encodes NOTHING (provenance is dead sediment). A `viz/` domain sub-group's navigate-by-CATEGORY step ("aurora is a viz") is legitimate because it encodes REAL cohesion: the 9 members share the WebGL/WebGPU substrate (`useGpuSubstrate`), the buried-then-promoted `budget.ts`, the `procedural-color` shaders, and the one-GL-context-per-route budget. Domain grouping ENCODES cohesion; provenance grouping encoded nothing. That is the distinction that saves the second sub-group where it killed the first — and it is why `viz/` is the ONLY sub-group the mean permits (a `form/`/`overlay/` alphabetical bucket would be sediment, not cohesion).

### The reshape — proven executable (CODEMOD-SPEC, run GREEN over all 92 families)
The move is ONE elision (remove the `ui`/`custom` segment after `components`) plus the ONE `viz/` insertion for the 9-member family.
- **src imports (all-relative, `@glass` 0×): resolve-and-recompute — SCOPED to the flatten-VARIANT subset.** Of 1786 src relative specifiers, **1218 are flatten-INVARIANT** and **568 are flatten-VARIANT** (360 reach a shared module; 208 reach a tier sibling). The recompute writes ONLY the 568 that differ.
- **demo AND tests IMPORTS (`@glass/components/{ui,custom}/*`): segment-drop.** `@glass/components/custom/dock` → `@glass/components/dock`, ZERO depth arithmetic, alias UNTOUCHED. Verified at HEAD: **521** segment-drop specifiers (398 demo + 123 tests). The residual relative-into-src sweeps to `@glass` in the same wave for a 0-residual invariant.
- **The tests-DIRECTORY flatten (BH-R3 fold — the coupled step, not just imports).** The test FIXTURE tree `tests/components/{ui,custom}/` MIRRORS src tier-for-tier, and `proof:no-test-in-src` treats `tests/` as a structural mirror of `src/`. **12 gate scripts hardcode the `tests/components/custom/X` fixture-path literal** (`proof-single-color-core`, `proof-metric-core`, `proof-dock-hold-contract`, `proof-reka-binding-idiom`, …); G7's uniform drop-segment rewrites them to `tests/components/X` — which RESOLVES ONLY IF the test dirs also flatten. So §7's move-map MUST move the test DIRECTORIES (`tests/components/{ui,custom}/X` → `tests/components/X`, viz members → `tests/components/viz/`), recompute any relative fixture imports, and re-point the 12 fixture-reading gates as the coupled step. `proof:no-test-in-src` PASSES on the incoherent flat-src/two-tier-tests end-state (it fails only on tests-under-src), so it is NOT the witness — the tests-dir flatten keeps the src/tests mirror coherent AND the fixture-gates green.
- **scripts (enforcement corpus): one uniform `dropSegment` pass PLUS exactly ONE semantic rewrite (the subpath-policy CRITICAL correction).** The all-text-recursive drop-segment (§6 G7) handles the literal PATHS. But `scripts/lib/subpath-policy.mjs` carries GENUINE two-tier SEMANTIC logic (`TIERS=[{tier:"ui",relBase:"src/components/ui",classMap:UI_CLASS},…]`, `classifyTier`, the collision loop). A blind textual drop collapses both `relBase`s to `src/components`, double-scans the flat 91, reports ~91 spurious collisions (breaking `proof:subpath-classify`/`proof:build`/`regen-exports`/`regen-structure`). The pass MUST collapse the two-tier model to a two-SET model — `{relBase:"src/components", classMap:CLASS}` with `CLASS={...UI_CLASS,...CUSTOM_CLASS}` — the merge DETERMINISTIC (43 UI keys + 49 CUSTOM keys overlap on exactly ONE key `tabs`: UI `INTERNAL` vs CUSTOM `PUBLISH`; custom-wins → `tabs=PUBLISH`, 91 keys). *(The `viz/` members live one level down; the classMap keys on component NAME not dir path, so `viz/` needs no classMap change — only the relBase-resolution walk descends one level for the viz members.)*
- **The `tabs` name-collision.** `comm -12` over the ui/custom dir-name sets returns exactly `tabs`. Reka `ui/tabs` (1 internal importer) vs SegmentedTabs `custom/tabs` (12). **Ruling: `ui/tabs → components/tabs/reka`** — reka nested as a named sub-component group (§2.3), a one-entry override BEFORE the uniform segment-drop; `DockLayerGroup` repaths. `components/tabs/` holds `SegmentedTabs.vue` + `composables/` + `constants.ts` + `index.ts` + `README.md` at root, `reka/{Tabs.vue,…}` nested. Aligns with `tabs=PUBLISH`.
- **The dead `ui/index.ts` aggregate barrel is DROPPED** (ZERO real importers). Clean break. No `components/index.ts` exists pre- or post-flatten.
- **Domain map lives in a MACHINE-LOCKED `components/README.md`** — a `proof:claude-structure-sync`-pattern gate asserts every COMPONENT dir (flat peer OR `viz/<member>`) appears in the map and vice-versa. **Non-component `components/*` peers are domain-map-EXEMPT:** `_shared/`, `viz/` (the sub-group dir itself), `PROCEDURAL-SUITE.md`.
- **No provenance markers** (greenfield-no-meta). **Export surface stable, INTERNAL churn large.** package.json `exports` untouched (0 keys). Final: **91 component families** (43 ui + 49 custom − 1 tabs merge − 1 dead barrel), 82 flat peers + 9 under `viz/`.

### The residual proportion pass the flatten enables
- `timeline/` (2274L): its ONLY separable helper `geometry.ts` (verified — its non-SFC siblings are just `index.ts`+`types.ts`) **stays a ROOT SIBLING file** per T4 (a lone pure/mixed helper does NOT earn a 1-file dir; the round-3 `geometry.ts→composables/` residual is DELETED as a self-contradiction it committed against its own T4). If a 2nd timeline helper lands, both earn `timeline/lib/`.
- `configurator/`: `useConfiguratorState` is already subpath-exported (a many-consumer STATE factory, §1.3) — it STAYS; no forced `composables/` mint.
- The 500-breachers carve by cohesion: `useGlassBackdropLuminance.ts` 554 (a `.ts` composable → sub-composables), `DockLayerGroup.vue` 524 (T1c carve — ~49 style is not the mass), `GlassDock.vue` 515 (**T1c pure script+template carve — ~0 `<style>`**; T1b does not apply). These drain under the RATCHET, ORTHOGONAL to the flatten (delta=0).
- `labeled-field`'s 5 wrappers collapse to one generic + typed slot.

---

## §4 The demo/application grammar

TWO archetypes on ONE feature-slice spine. **§4-STORYBOOK** (story-driven library demo) and **§4-PRODUCT** (a router/store/backend-bearing consumer app). Both are the same `component-folder + local-until-shared + recursion-resets-depth` grammar; they differ only in the top-of-tree layers a router-driven app earns. §4-PRODUCT is ~85% a description of speedtest's live tree.

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
A demo mints a CLOSED presentation-subtype taxonomy (stage / specimen / interaction / matrix / composition) in its own `chassis/subtype/` dir **ONLY above a complexity floor** — a demo with **≥ ~20 stories OR ≥2 categories needing the taxonomy**. A small sibling demo keeps flat chassis primitives (the needless-encapsulation vice otherwise). glass-ui's rich demo earns the dir; slides' thin deck does not.

#### §4S.5 God-SFC escalation
A story tripping the ratchet becomes a feature dir (the aurora model). Symmetric across a family: `blob.vue` (875L) + `constellation.vue` (759L) → feature dirs like `aurora/`. (Both `<style>`-mass and script/template-mass SFCs escalate this way — T1b/T1c.)

#### §4S.6 The barrel-vs-deep-path idiom
**Deep-path for demo-private SFCs**; **index barrel for anything a sibling app consumes.** Drop vestigial `chassis/index.ts` if unused.

### §4-PRODUCT — the router/store/backend-bearing consumer app

The consumer app is the STORYBOOK mirrored across the router boundary: storybook `stories/`↔product `views/`, storybook `chassis/`↔product `components/`+`features/`, storybook `shell/`↔product `App.vue`+`layouts/`.

#### §4P.1 The fixed skeleton
```
<app>/src/
  bootstrap (main.ts | inline in index.html) · App.vue · router(.ts | /)   # the entry concern + routing (§4P.11)
  views/<Name>View.vue                     # route-BOUND compositions (one per router record)
  layouts/                                 # route-frame chrome that wraps <RouterView>
  features/<domain>/                       # proportion-EARNED domain slices (§4P.5)
    ui/ state/ api/ engine|lib/ composables/  index.ts   # by-purpose segments + boundary barrel
  components/<domain>/                      # UNgraduated domain groups + shared app UI
  stores/                                  # app-global Pinia (+ domain subtrees + plugins/)
  api/                                     # the FE HTTP-transport leaf (§4P.4)
    client.ts  <resource>.ts…  types.ts  index.ts
  config/                                  # presets-in-consumers + static/deployment config
  composables/  lib/  types/  utils/
  styles/                                  # the app-global design layer
<app>/server/ | backend/ | functions/ | workers/   # the peer backend workspace (§5, NOT under src/)
```

#### §4P.2 `views/` is the canonical route-layer name (recorded FSD divergence)
All four apps name route-bound components `views/`. FSD's canonical name is `pages/`; the constellation uses Vue-native `views/`. A view holds route-BOUND components ONLY (one per router record); a THIN composition wiring a feature barrel to a layout, NEVER domain logic. Clean-break: no `pages/` alias. **`views/` NEVER folds into a feature slice** (§4P.5).

#### §4P.3 router FILE→DIR by T4 proportion
`router.ts` (a bare route table) until it EARNS `router/` (index.ts + navigation guards + `typed-routes.d.ts` + per-domain route modules ≥2). No premature `router/` dir for a 3-route deck.

#### §4P.4 The `api/` FE transport-leaf infra-ring
`api/` = ONE `client.ts` transport kernel (auth headers + `apiFetch` + token — canonical name **`client.ts`**, reconciling words' `core.ts`) + per-resource modules named by DOMAIN RESOURCE + `types.ts` envelopes + an explicit-named-re-export `index.ts`. UNIDIRECTIONAL, the architectural LEAF: `views/ → stores/ → api/ → client.ts`; `api/` NEVER imports upward. A full feature slice with its OWN api gets `features/<x>/api/`; a resource used by ≥2 unrelated view-families stays app-global (T3). Machine-enforced by `proof:import-boundaries` scope-extended to the product 4-node DAG — speedtest already ships `check-internal-boundaries.mjs` as the precedent.

#### §4P.5 The domain-graduation predicate (the sharpest §4-PRODUCT law — the scatter fix)
A domain is a `components/<domain>/` GROUP by default. It **GRADUATES to a full `features/<domain>/` slice when it acquires a presence in ≥3 app-global FOLDABLE layer dirs OR its own engine/state/domain-logic** — because at that point the app-global layers have become layer-by-type SCATTER for that domain.

**The foldable layer set — `views/` removed from the trigger.** The graduation TRIGGER counts presence across the FOLDABLE app-global dirs `{components/, stores/, api/, composables/}`. `views/` is NOT in the trigger set. *(The trigger reads "present in ≥3 of the 4 foldable dirs," NOT "present in all 4" — admin/dashboard each fire at exactly 3 present, per proto3's re-count.)*

**The fold-set.** On graduation the scattered pieces fold into `features/<domain>/{ui, state, api, composables, lib, config, constants, types, index.ts}`. **Per-leaf T3 decides each:** a `config/survey.ts` that is survey-OWNED folds into `features/survey/config/`; a config module ≥2 domains share stays app-global (§4P.8). Same rule for `constants`/`types`.

**The feature INTERIOR obeys the 500 ceiling identically (BH-R3 fold — graduation is NOT a length exemption).** A graduated `features/<domain>/` is a component/domain root like any other: G2's 500 raw ceiling + G9's backend ceiling bind its INTERIOR files exactly as they bind a library component. **The carve owner is the APP, not glass-ui** — the round-3 pin to "BG.W-CUT's live engine" is glass-ui-ONLY; a consumer app has no such owner, so each app OWNS the drain of its own over-500 feature files under its own RATCHET. Live driver: speedtest `useMeterRenderer.ts` 693L sits INSIDE the already-graduated speedtest feature, uncarved — it drains by cohesion (a renderer split), NOT an exemption. **Recursive sub-domain graduation is in-scope:** a sub-domain scattered across a feature's own segments (proto3's METER sub-domain — `composables/meter/` + `ui/meter/` + `useMeterRenderer` + `MeterColumn.vue`) graduates to a nested `features/<domain>/<sub>/` slice by the SAME ≥3-foldable-presence trigger applied one level down — the recursion of §2.3 at the product-app grain.

Live targets (speedtest): `admin` (17 files, ≥3 foldable dirs) GRADUATES; `dashboard` (31, ≥3) GRADUATES; `survey` (own `composables/`+`utils/`+`index.ts`) GRADUATES; `speedtest` ALREADY graduated. This is T3 at the domain grain.

**`features/` is a PROPORTION-EARNED escalation, NOT a mandatory tier.** slides (a 7-line-App.vue deck viewer, no stores) has NO `features/` dir. The feature INTERIOR is by-purpose segments + a boundary `index.ts` barrel that is the SOLE cross-feature entry (the `sideEffects` precondition of §2.1 applies to the feature barrel too). This IS §2.1's barrel-only rule + §2.3 recursion, transposed.

The graduation gate goes born-RED on `admin`/`dashboard` only AFTER the cheapest speedtest domain (`survey`) is PROTOTYPE-folded to confirm the fold typechecks + `proof:import-boundaries` greens + the per-route bundle delta (an execution sub-wave, §9).

#### §4P.6 The Pinia T3 split (feature-state colocates, app-global promotes)
A store owned by ONE feature slice lives at `features/<x>/state/`, reached cross-feature ONLY through the feature barrel. A store used by ≥2 unrelated view/feature families promotes to app-global `src/stores/`. A domain store CLUSTER gets a `stores/<domain>/` subtree; Pinia plugins get `stores/plugins/`. One store per file.

#### §4P.7 `styles/` is the app-global design-layer name (clean-break rename of `design/`)
speedtest's `design/` renames to `styles/` with NO content loss; `MOTION-DOCTRINE.md` moves to `docs/`. One name, no alias.

#### §4P.8 `config/` is the presets-in-consumers home (file→dir by proportion)
A single `site.config.ts` FILE until ≥2 config modules earn `config/`. `config/` holds app-global STATIC config + the consumer's named glass-ui PRESET registries + deployment registries. A DOMAIN-owned config module folds into that domain's slice on graduation; only ≥2-domain-shared config stays app-global.

#### §4P.9 NO root-shell god-SFC exemption — App.vue OBEYS the 500 ceiling and carves
The app root's job is THIN: mount `<RouterView>`, install app-global providers, host persistent chrome. **App.vue over 500 is drained by T1c (BH-R3 fold — the template-mass carve):** speedtest's `App.vue` 833L is `useAppProviders.ts`-carved (already done, 73L) but its RESIDUE is ~400 lines of `<template>` mass — provider/substrate wiring → `composables/useAppProviders.ts` (script), the template's layout-switching → `layouts/`, persistent chrome (a 774L `Dock.vue`) → `components/dock/`. Interim over-ceiling uses the house RATCHET. slides' 7-line `App.vue` is the target.

#### §4P.10 `layouts/` app-global route-frame chrome
`layouts/` holds the route-chrome wrappers that frame `<RouterView>`. A layout is cross-cutting so it is app-global at `src/layouts/`, NEVER colocated into a feature.

#### §4P.11 The entry pair — the bootstrap CONCERN, not the `main.ts` FILE
The invariant is the BOOTSTRAP CONCERN (`createApp` + install router/Pinia/app-global providers/dark-cascade + mount) + a thin root `App.vue`, beside `router(.ts|/)`. speedtest has NO `main.ts` — its bootstrap is inline in `index.html` for LCP, a LEGITIMATE placement. The gate asserts the bootstrap concern exists and is thin, never a specific filename.

#### §4P.12 The FSD-divergence ledger (constellation-native names, deliberate)
A **PROPORTION-COLLAPSED FSD**: `app (bootstrap/App) → views → features/components → shared (stores/api/composables/lib/styles/config)`. Route layer = `views/` (FSD `pages/`); hooks = `composables/`; pure helpers = `lib/`; feature dir = `features/` (FSD `features/`+`entities/`+`widgets/` collapsed). Unidirectional imports preserved; the 6-layer tower flattened to what the app earns.

#### §4P.13 The per-sibling migration instrument (BH-R3 fold — edict 1, the whole constellation)
§7's migration instrument is glass-ui-specific (`@glass`, the 568-variant recompute, the subpath-policy two-set merge). Each SIBLING carries its OWN alias namespace (speedtest `@src`/`@features`/`@design`; ~50 importer re-points for `@design→@styles` + `@src/components/{admin,dashboard,survey}→@features/*` on graduation). **Ruling:** each sibling AUTHORS its own migration instrument from the SHARED, repo-agnostic codemod FORMULA — `newSpecifier = normalize(relative(elide(dirname(F)), elide(resolve(dirname(F), S))))` — binding its own alias set and graduation renames. G8 propagates the FORMULA + the transposed gate scripts (the SPEC is the single source); the per-repo alias namespace + move-map are repo-local. No sibling shares glass-ui's `@glass`/relative split; each divines its own by the same law.

---

## §5 Backend transposition (language-abstracted)

### §5.1 The grammar (identical shape to frontend)
- **Domain/feature PACKAGE** = the backend component folder. Named by DOMAIN, not technical layer.
- **By-PURPOSE segments:** `api/` (routes/handlers — transport edge), `model/` (domain types/data/rules), `lib/` (pure helpers). Colocate handler + model + logic FOR one domain TOGETHER. (This is the SAME `lib/` the frontend §2.1 now carries — one segment vocabulary.)
- **Shared home** (`shared/`, `core/`) ONLY for truly-global — the ≥2-unrelated-DOMAINS bar (T3).
- **Reject layer-by-type of DOMAIN LOGIC. The scatter check runs RECURSIVELY at EVERY dir level (BH-R3 fold).** `controllers/ + services/ + models/` scattering one domain across type-folders is the vice. **Live target: `speedtest/server/src/`** (routes/services/middleware/validation/utils layer-by-type at the top). **AND the NESTED case (the round-3 blind spot proto4 measured):** floridify's `api/{core,middleware,repositories,routers,services}/` is a 73-file layer-by-type god-dir ONE LEVEL DOWN inside a domain package — the SAME vice, nested. The ≥2-distinct-domain-stem scatter threshold applies at every directory level, not only the app-global top; `api/routers/{ai,media,search,wordlist,words,wotd}/` + `api/repositories/` + `api/services/` fold each router+repository+service triple into its domain package (`words/api.py` + `words/repository.py`), while `api/core/` (base/cache/dependencies/exceptions/…) is a legitimate NESTED infra-ring by the criteria.
- **The infra-ring carve — with FIXED constants.** A thin CROSS-CUTTING infrastructure ring that runs on EVERY domain is NOT the scavenger-hunt vice; it is the backend twin of the FE `_shared/` / the `api/client.ts` leaf. The constants are FIXED so the verdict is reproducible:
  - **Scatter threshold:** a type-named dir holding modules from **≥2 distinct domain stems** IS layer-by-type scatter → dissolve file-by-file. A type-named dir holding **≤1 domain stem** (or purely infra) is not scatter. **Applied recursively.**
  - **Infra-ring CRITERIA:** a module is infra-ring IFF it is (a) cross-cutting (runs on EVERY domain), (b) carries NO single domain's business rules, (c) is a thin adapter/kernel/policy. Seed allowlist (extend per-repo, criteria-gated): `middleware/`, `logging/`, `events/`, a transport `core/`/`http/` kernel, a uniform repository/model base, `config/`, `paths/`, error/exception policy. `proof:backend-structure` (§6 G9) carries this criteria set + the ≥2-stem threshold as gate constants.
- **The shared-types carve (the TYPE-analogue of the infra-ring).** "A domain's OWN types severed from its logic" (fold INTO the domain) vs "a schema registry ≥2 domains genuinely share" (STAYS shared). floridify `models/` (174 importers — re-measured; round-3 said 126) is the driver: blind T3 dissolution shreds it into 8 domains behind 174 rewrites — the "shredded not beautiful" failure. Rule: a type module read by ≥2 unrelated domains is a shared schema registry → keep shared; a type module read by ONE domain folds into that domain. Same ≥2-domain-stem count.
- **The orchestration / use-case tier.** A cross-domain PIPELINE that COMPOSES ≥2 domains (floridify `lookup_pipeline.py` composes 5) is neither a single domain nor layer-by-type scatter (genuine composition). It lives in a `pipelines/` (backend) / app-service tier next to the composition root, importing domain barrels DOWNWARD only. The FE twin is `views/`.
- **No grab-bags.** A `utils.py`/`helpers.go`/`common.ts` of unrelated leaves is a god-module (named-cohesive leaves like `logging.py`/`config.py`/`paths.py` are NOT a grab-bag — the gate flags per-domain `utils.py` FILES, never a cohesive `utils/` DIR).
- **Depth (T2), import discipline, recursion** — identical: unidirectional (`shared → domain → pipelines/app-entry`), no cross-domain imports except via a package's public API, long dirs break into sub-modules.

### §5.2 Per-language befitting notes
| Language | Module ceiling | Function norm | Idiom |
|---|---|---|---|
| TypeScript (backend) | 500 raw | short, cohesive | ESM subpath exports; `import type`; barrels per package; **declare `sideEffects`** (js side-effect-free) so barrels tree-shake. `proof:*` god-function advisory booked (no ESLint). |
| Python | 500 raw hard / ~300 soft | Google ~40-line funcs | package = domain dir with `__init__.py` public API; `model.py`/`api.py`/`lib/`; no `utils.py` grab-bag; ruff `C901`/`PLR0915` for the god-FUNCTION advisory. |
| Go | 500 raw / package-per-domain | short | one package = one domain; `gofmt`; exported identifiers ARE the public API. |
| Rust | 500 raw / module-per-domain | short | `mod.rs`/`lib.rs` re-export = the barrel; `pub` = public API. **Encapsulation IS a compile invariant** (a private `mod` makes guts UNREACHABLE — `E0603`). **But import DIRECTIONALITY + ACYCLICITY are NOT** (BH-R3 fold — proto4 proved with real `rustc`): a module cycle AND a `shared→domain` up-edge both COMPILE CLEAN in a single crate; Rust enforces acyclicity only at CRATE granularity — the workspace-of-crates cost the §1 mean REJECTS for a proportionate service. So for a single-crate service, directionality remains a **gate (G-BE4b) concern** exactly as for Python/TS; only encapsulation is free. |

The NUMBER is per-language; the GRAMMAR (domain-vertical, by-purpose segments, promote-shared-at-≥2, shallow depth, no grab-bags, recursive scatter check, infra-ring + shared-types + pipelines legitimate) is constellation-wide. **The file-length ceiling is a GATED arm per language (§6 G9), not prose.** G9 is RATIFIED + wired: `--self-test` 9/9; the per-language `wc -l` ceiling (G-BE1) + the per-language import RESOLVER (G-BE4b). Live-backend reproduces §5.2 exactly: floridify 47 (41 god-module + 5 grab-bag + 1 top-level layer-by-type; `wiktionary_parser.py` 1198 is the largest, unnamed; `search/engine.py` 1186; `caching/manager.py` 832), speedtest/server 4 (routes/ 10 stems, services/ 5, validation/ 9, + a middleware→routes upward leak), dns-speedtest 2 (negative control), greenfield-rs/pulse GREEN.

---

## §6 Enforcement — how the `proof:*` gates evolve

The house machine-locks structure (`proof:colocation`, `proof:no-god-module`). The spec EXTENDS them — no parallel regime — and **every new gate is a device-free `proof:*` script with self-test bites, NOT ESLint** (zero ESLint config/dep repo-wide). All frontend gates (G1/G3/G4/G6/G7) AND the backend gate (G9) are PROTOTYPED in `proto-gates/`, born-RED on HEAD, self-tests firing.

**G1 — `proof:colocation` extends (the FOLD end).** KEEP the README-marker binding. ADD the **globality clause (T3)**: INCLUDE composition edges + demo/sibling usage, EXCLUDE within-family DI + root-barrel/aggregator re-exports + discovery-layer type re-exports, PROMOTE a ≥2-foreign-read DI context. ADD the **no-empty-segment clause (T4)** — now covering a 1-file `lib/` as well as `composables/`. SCOPE-EXTEND to `demo/`. *(Prototyped: `proof-colocation-globality.mjs`, 6/6, born-RED FOLD-census.)*

**G2 — `proof:no-god-module` unifies across `.ts`/`.vue`/`.css`** (shader-literal + data-manifest + **extracted-SFC-style T1b** exempt), ONE `HARD_LIMIT=500` RAW, a `~300` advisory soft-target (warn). The `.vue` arm counts `<template>+<script>+<style>` RAW; a cohesive SFC breaching on `<style>` mass fixes via T1b extraction, and a **no-`<style>` SFC breaching on script/template mass fixes via T1c cohesion carve** (not ratchet-forever). The CSS arm is a cohesion-carve BOUND by the byte-identical fence + source-order preservation — closes the blind spot where `ladder.css` 510 / `surfaces.css` 508 / `shell.css` 524 breach uncounted.

**G3 — `proof:depth` (new):** the T2 cap — no segment dir under a segment dir (unless the inner carries an `index.ts` → recursion reset); depth beyond ≤5 below the nearest feature/component root needs a recorded rationale. *(Prototyped: `proof-depth.mjs`, 5/5.)*

**G4 — `proof:import-boundaries` (new — the PROMOTE end).** The 4-node DAG; subpath-entry reaches both directions; `composables/` never reaches `components/` (except the `export *` aggregator carve); no cross-component GUTS reach; one-barrel public API with the deep-leaf subpath exemption (B4). **Born-RED on HEAD with 25 cross-component guts reaches.** **The DI-context sub-ruling:** a cross-component reach into a `createStrictContext`/`createOptionalContext` module module-path-imported by ≥2 FOREIGN families is classified DISTINCTLY from a buried non-DI primitive — resolution is PROMOTE-to-`composables/context/`, and the gate names the shared-context target. Self-test bites (11/11): the 5 `dockContext` reaches → DI verdict; `Slider→useDockHold` → generic buried-primitive verdict; the aggregator `export *` PASSES; a subpath-entry deep-leaf re-export PASSES; a component reaching the subpath-entry sink REDs. The ONE standing HEAD backward edge (`composables/index.ts → infinite-scroll/composables`) is the named colocation-exception allowlist entry. Scope-extends to the product-app DAG (§4P.4). *(Prototyped: `proof-import-boundaries.mjs`, FAIL on HEAD by design.)*

**G5 — location-vs-publish orthogonality:** physical location by G1's family clause; publish surface by the SCC/heavy-peer discipline. A colocated PUBLIC composable is never flagged for being public.

**G6 — the CSS pair (§2.6):**
- **`proof:css-colocation` (new, TARGET gate):** every colocated `components/<n>/styles/*.css` flattens to a UNIQUE `dist/styles/` target (no clobber); subdir partials stay within `styles/`; the walk reaches every `src/components/**/styles/` dir; **a golden sorted-hash manifest of the shipped `/styles` (covering BOTH `dist/styles/index.css` AND the SFC-fold `dist/glass-ui.css`) reds any byte drift**; **the SOURCE-@import arm asserts no `index.css` @import dangles at SOURCE**; a synthetic un-rewritten escaped @import born-REDs; the **T1b-walk convention** is asserted (SFC-`<style src>`-extracted files not double-emitted); **the SOURCE-reader-gate arm (BH-R3 fold): assert no gate script reads a colocated CSS by its retired `src/styles/<name>.css` path** (mirrors G7's `components/(ui|custom)/` witness for the CSS reader corpus). The golden-hash gate stays GREEN through the flatten IFF the path-independent `componentIdGenerator` (§7) is adopted — otherwise the scope-id rotation false-REDs it (glass-ui.css rotates).
- **`proof:css-ownership` (interim/cross-coupled):** every component-specific `src/styles/*.css` that STAYS global names its single owner via a `README OWNER:` header resolving to a real component dir (`icon-chip.css` is the one standing case). *(Prototyped: `proof-css-ownership.mjs`, 5/5.)*

**G7 — the enforcement-corpus migration meta-gate (`proof:no-tier-literal`) — SHIPPED.** After the flatten wave, assert ZERO surviving `components/(ui|custom)/` literal in `scripts/`. **The scan is all-text-extension + recursive** ({`.mjs,.js,.cjs,.mts,.cts,.ts,.vue`}, node_modules/.git excluded, skip-self by realpath) — because scripts/ is NEITHER typechecked NOR test-resolved, so G7 is the SOLE structural witness. Detector = `/(?:@glass\/)?components\/(ui|custom)(?=[/"'`)\s]|$)/g`. Born-RED at **865 across 229 files at HEAD** (a WITNESS figure that DRIFTS; PASS/FAIL is `survivors===0`). Self-test 9/9 incl. the anti-evasion recursion bite. Register `["local","ci"]`, device-free. **The gate AND the flatten codemod share ONE comprehensive all-text-recursive file-set.** The flatten codemod (re-root `proof:colocation`, drop-segment the literal paths, rewrite RATCHET keys, `ui/tabs→tabs/reka` override, `viz/` insertion, + the ONE subpath-policy semantic rewrite) lands ATOMICALLY — the ORDER is load-bearing. *(Prototyped: `proof-no-tier-literal.mjs`, born-RED 865, 9/9.)* **G7 does NOT witness the `tests/components/(ui|custom)/` fixture-dir or the `src/styles/<name>.css` reader shapes** — those are the tests-dir flatten (§3) and the G6 SOURCE-reader-gate arm respectively; the atomic wave is FIVE coordinated sweeps (§7), not one G7 scan.

**G7-companion — the post-flatten CLOSE BATTERY (CRITICAL).** G7-GREEN (0 literals) is NECESSARY but NOT SUFFICIENT. The uniform textual drop BREAKS `subpath-policy.mjs`'s two-tier semantic logic (§3) — G7 stays green while `proof:subpath-classify`/`proof:build`/`regen-exports`/`regen-structure` red. The close battery for the flatten wave MUST run `proof:subpath-classify` + `proof:build` (semantic soundness) + the 12 fixture-reading gates (tests-dir soundness) + the 14 CSS-reader gates (colocation soundness), not only the structural literal witness.

**G8 — constellation propagation:** gate SCRIPTS live per-repo (each sibling carries the transposed set); the SPEC (this doc, promoted to the precepts submodule) is the single source. **G8 audit items (BH-R3 fold):** (1) each sibling declares `sideEffects` (the barrel-only precondition, §2.1); (2) each sibling authors its own migration instrument from the shared codemod formula (§4P.13).

**G9 — `proof:backend-structure` (new — the edict-6 enforcement) — RATIFIED + WIRED.** The backend twin of G2+G4, language-abstracted (detect from the manifest). Six arms: **(a) file-length ceiling** (`wc -l`, hard 500 raw / soft 300); (b) grab-bag detection (with the cohesive-leaf carve); **(c) layer-by-type-of-domain-logic — the ≥2-distinct-domain-stem threshold applied RECURSIVELY at EVERY dir level** (BH-R3 fold — catches the nested floridify `api/` god-dir, not only app-global top); (d) depth (T2); (e) import-direction — a per-language RESOLVER (python `..`-arithmetic, rust `crate/super`, ts relative), the §5.1 unidirectional invariant + the `api.core.exceptions` precision fix; (f) god-FUNCTION advisory (ruff `C901`/`PLR0915`). Self-test 9/9 incl. anti-evasion (renamed `common.py`) + 3 legit-shape negative bites. Born-RED on floridify (47) + speedtest/server (4) + dns-speedtest (2, negative control); GREEN by construction on greenfield-rs/pulse. *(Prototyped + wired: `proto-gates/proof-backend-structure.mjs`, `--self-test` exit 0.)*

**G10 — `proof:no-glass-in-dist` (new — the src-stays-relative permanent lock).** Assert ZERO `@glass` specifiers in `dist/*.d.ts`. glass-ui ships NO dts-alias resolver (no `tsc-alias`/`rollup-plugin-dts`/`api-extractor`; `emit-types` = `vue-tsc` + `flatten-subpath-types.mjs`'s naive `../→./` rewrite, which does NOT resolve `@glass`). Declaration emit preserves import specifiers as-written, so ANY src file on `@glass` would emit unresolvable `@glass/composables/…` into the SHIPPED types — a highest-severity publish defect. Born-REDs the instant any future wave migrates a src file to `@glass`. Register `["ci","release"]`.

---

## §7 Migration posture — clean break, gestalt transposition

- **No legacy, no aliases.** The flatten, the FOLD/PROMOTE/PROMOTE-context reshape, the CSS physical colocation, the demo tri-partition, the §4-PRODUCT graduations are MOVES — position-preserving where the byte-identical-carve applies, gestalt-reshaping where structure demands. No compat shim survives a fold.

- **The named migration instrument (the HYBRID). `@glass` is the CROSS-PUBLISHED-BOUNDARY / consumer alias (demo, tests, scripts, siblings); the PUBLISHED `src` tree stays RELATIVE (dts self-containment + within-atom colocation cohesion).** The aristotelian mean for the alias itself: `@glass` earns its keep where there is no dts tax; `relative` earns its keep where colocation + published-dts-cleanliness live.

- **The move-map is FIVE coordinated sweeps (BH-R3 fold — completed from the round-3 "two"):**
  1. **src (all-relative, `@glass` 0×): resolve-and-recompute, SCOPED to the 568 flatten-VARIANT specifiers** (360 into shared modules, 208 tier/subpath); the 1218 flatten-invariant re-emit byte-identical. `newSpecifier = normalize(relative(elide(dirname(F)), elide(resolve(dirname(F), S))))` — needs NO module resolver; typecheck exit 0, zero TS2307. (The `viz/` insertion adds one segment for the 9 viz members — the same formula handles it.)
  2. **demo AND tests IMPORTS (`@glass/components/{ui,custom}/*`): segment-drop** (521 specifiers; zero depth arithmetic; alias UNTOUCHED). **+ the tests-DIRECTORY flatten** — move `tests/components/{ui,custom}/X` → `tests/components/X` (viz members → `tests/components/viz/`) so the tests tree stays a coherent mirror of the flattened src (`proof:no-test-in-src`), recompute any relative fixture imports, and re-point the **12 gate scripts** hardcoding the `tests/components/custom/X` fixture literal.
  3. **scripts (recursive, all-text): one uniform `dropSegment` PLUS the ONE `subpath-policy.mjs` semantic rewrite** (§3), landing atomically (G7 + the close battery).
  4. **CSS reader-gates: re-point every `src/styles/<name>.css` SOURCE literal** in the 14 colocation-target families to its colocated path, coupled with the §2.6 physical move (107 gate-script references; G6 SOURCE-reader-gate arm witnesses).
  5. **config + docs: adopt the path-independent `componentIdGenerator`** (below) + sweep stale `components/(ui|custom)/` prose paths from component `README.md` self-references + CSS comments (edict-8 "examined then re-examined"; 0 live imports but the prose must not lie).
  - The migration instrument MUST scan BOTH the relative specifier space (src) AND the `@glass` alias space (demo/tests/scripts). Each SIBLING authors its own instance from the shared formula (§4P.13).

- **The Vue scope-id rotation → adopt a PATH-INDEPENDENT `componentIdGenerator` (BH-R3 fold — the performance-above-all ruling).** `@vitejs/plugin-vue` v6.0.7 (verified installed) defaults `descriptor.id = getHash(relative(root, filename) + source)`; `dist/glass-ui.css` carries `data-v-XXXX` scoped selectors, so the flatten (which strips the `ui/`/`custom/` segment from every scoped SFC's path) ROTATES every scope-id. Functionally harmless (template + CSS rotate in lockstep) but it makes the SFC-fold half of dist NOT byte-identical, rehashes ~every SFC-bearing chunk (a far larger cache-bust than the 6-chunk PROMOTE), and false-REDs `proof:css-colocation`'s golden `/styles` hash (which covers glass-ui.css). **Ruling:** the execution wave adopts a path-independent `componentIdGenerator` (scope-id keyed on SOURCE CONTENT, not the root-relative path — the SAME location-vs-identity orthogonality the whole spec runs). This is a one-time full rotation at the 5.0.0 cut, after which the flatten AND every future colocation move (T1b/T1c extraction, recursion, fold/promote) is byte-neutral for BOTH `dist/styles/index.css` and `dist/glass-ui.css`, the golden-hash gate stays green through moves, and `profile:budget` basename-keying stays scoped to the 6 PROMOTE chunks. **The rejected alternative** (leave the default; document per-move churn; rebaseline the golden-hash gate and widen basename-keying to ~every SFC chunk on EVERY move) is the needless-per-move-ceremony vice. **Corrected byte-identity claims:** the FLATTEN's `index.css` cascade is byte-identical unconditionally; the SFC-fold `dist/glass-ui.css` is byte-identical IFF the path-independent generator is adopted — the round-3 "byte-identical dist" framing proved only the cascade half.

- **REJECTED: the src→`@glass` whole-tree re-open (adjudicated).** src→`@glass` LEAKS `@glass` into the PUBLISHED `.d.ts` (no dts-alias resolver; declaration emit preserves specifiers as-written). demo/tests/scripts are LEAF consumer trees (never emit `.d.ts`); src is the PUBLISHED library whose `.d.ts` IS a public artifact. Locked permanently by G10.

- **Chunk-graph churn — ALL classes MEASURED.**
  - **The FLATTEN is +0 gzip** (entry-count-preserving; `libraryFileName` keys dist filenames on the ENTRY NAME, decoupled from source path).
  - **The FOLDS are +29 gzip** (two folds add +14/+13 to D5-EXEMPT shared chunks; every other chunk byte-identical).
  - **The PROMOTE-primitive class is BYTE-NEUTRAL** (A/B `vite build`, 190→190 chunks, 414001→414001 gzip): `budget.ts` fully constant-folded, the `procedural-color` twins already co-bundle, Rolldown's basename+content-hash naming path-independent.
  - **The PROMOTE-context class is a per-route WIN**: the lean-leaf `dockContext` promote strips the incidental `dock/constants.ts` drag out of 5 foreign chunks — **−327 gzip on EACH of the 5 foreign routes**; the dock route nets −122 gz. **"Performance above all" is SATISFIED — the reshape STRENGTHENS the perf posture.**
  - **Content-hash CHURN is now TWO items:** (1) the 6-chunk PROMOTE rehash (a one-time cache-bust); (2) the ONE-TIME scope-id rotation at generator adoption (after which moves are stable) — NOT the per-flatten mass rehash the default generator would impose. `profile:budget` compares per-chunk sizes by BASENAME (hash-stripped), scoped to the 6 PROMOTE chunks.
  - **The execution constraint (all folds/promotes):** the root-barrel/subpath-entry re-export MUST target the deep composables leaf, NEVER the component barrel; the DI-context promote targets `composables/context/` (SFC-free) AND relocates the DI-key literal (`DOCK_CONTEXT_LABEL`) INTO the context leaf so it carries ONLY {InjectionKey, types, helper pair} with NO `dock/constants` edge — that leanness IS the −327 gz/route mechanism.
  - *(Caveat: `profile:budget` is ALREADY RED at HEAD on PRE-EXISTING causes — goo-blob ceiling + stale AP D5 baseline — owned by the BG close-battery, ORTHOGONAL to the reshape.)*

- **Zero PUBLIC-EXPORT churn** (the `@mkbabb/glass-ui/*` subpath surface is `src/*.ts` entry files, untouched; 0 package.json keys) + the internal file rewrites + scripts + ~91 dir moves + the tests-dir + CSS-reader sweeps.

- **Whole-tree, not incremental.** Edict 8 is the cadence.

- **Sequencing:** this reshape is a `src/` + `demo/` + `tests/` + `scripts/` + build-plugin + `vite.config` write-set; sequences AFTER the owning BG waves per the BH interleave, lands in the joint 5.0.0 cut. The CSS build-plugin + dev-resolver + reader-gate sweep (§2.6), the `componentIdGenerator` adoption (§7), the graduation folds (§4P.5), and G7/G9/G10 land as gated execution sub-waves with born-RED proofs. The `/api` drop is orthogonal.

---

## §8 Settled matters (restated, NOT reopened)

1. The 500-line no-god-module ratchet exists, drains to ∅, counts **RAW lines**, and has NO permanent length exemption — only shader-literal + data-manifest + SFC `<style>`-mass (T1b) + SFC script/template-mass (T1c) carves (§1.3). The 500 ceiling binds product-app feature interiors + backend packages identically. The spec unifies file-type coverage (§6 G2) + adds the backend length gate (§6 G9).
2. `proof:colocation` exists (4 clauses). The spec extends it (§6 G1); the clauses stand.
3. The ≥2-consumer visual-load-bearing invariant (J-inv-10) is the promotion bar; generalized to non-visual leaves (T3) with a decidable count running THREE placement cases — FOLD, PROMOTE-primitive, PROMOTE-context (§1.5).
4. The SCC / heavy-peer publish discipline is preserved and ORTHOGONAL to physical location (§2.5, 4-node DAG). Publication is a publish-signal, not a location-signal.
5. The clean-break / no-back-compat law, presets-in-consumers, byte-identical-carve are the migration constitution (§7).
6. The load-bearing `index.css` cascade order is INVIOLATE; CSS colocation keeps a byte-identical PUBLISHED cascade via approach (i); the SFC-fold `dist/glass-ui.css` stays byte-identical via the path-independent `componentIdGenerator` (§2.6, §7, PROVEN + RULED).
7. `subpaths/` glob-batch generation is an accepted mechanical exception — kept.
8. The Vue `composables/` essence-name is a recorded FSD divergence — kept (§2.4); `lib/` is its pure-helper sibling, the ONE segment vocabulary across FE/BE; `views/` (not FSD `pages/`) is the product-app divergence (§4P.2). `composables/context/` is the DI CONTRACT home (factory + promoted contexts + their contract types, §2.4).
9. FLATTEN `ui`+`custom` is settled (edict 5, §3); the codemod is proven executable; the ONE decidable domain sub-group `viz/` (9 members) is COMMITTED; `ui/tabs → tabs/reka` is the sole non-uniform component case; the `subpath-policy.mjs` two-set merge (`tabs=PUBLISH`) is the sole non-uniform SCRIPT case; `@glass` is the CONSUMER-tree alias, src stays RELATIVE.
10. `src` stays RELATIVE (dts self-containment, G10). The migration instrument is the FIVE-sweep move-map scanning BOTH specifier spaces; each sibling authors its own from the shared formula.

---

## §9 The execution-carve ledger (decisions made; mechanics to encode)

No `[R3]` DESIGN question remains. These are named EXECUTION carves the reshape wave encodes, each with a settled ruling:

1. **The T1b/§2.6-walk double-emit convention (RULED):** the component-styles build walk copies ONLY index.css-referenced cascade sheets; an SFC-`<style src>`-extracted scoped file rides the SFC fold pipeline and is skipped. Encode the predicate; assert in `proof:css-colocation`.
2. **The T1c script/template-mass carve (RULED, §1.3):** GlassDock 515 (no-`<style>`), DockLayerGroup 524, speedtest App.vue 833 drain by sub-component/composable extraction, NOT T1b. Encode the carve as a §6 G2 fix-path; the RATCHET tracks the interim.
3. **The barrel-vs-deep-leaf discipline for the 360 shared-module reaches (CARVE):** the recompute preserves existing reach depth (no forced re-barrelling in the flatten wave; shaders legitimately reach `.glsl.ts` leaves); a barrel-discipline census is a later proportion pass, NOT a flatten prerequisite.
4. **The subpath-policy semantic rewrite (RULED, §3/§6 G7-companion):** collapse `TIERS` two-tier → a two-set model with `CLASS={...UI_CLASS,...CUSTOM_CLASS}` (`tabs=PUBLISH`); the `viz/` members resolve one level down; the close battery runs `proof:subpath-classify` + `proof:build`.
5. **The tests-DIRECTORY flatten + fixture-gate re-point (RULED, §3/§7):** move `tests/components/{ui,custom}/X → tests/components/X` (viz → `tests/components/viz/`), re-point the 12 fixture-reading gates; keeps the `proof:no-test-in-src` mirror coherent.
6. **The CSS reader-gate SOURCE-path sweep (RULED, §2.6/§7):** re-point every `src/styles/<name>.css` literal in the 14 colocation families (107 gate-script references); G6 SOURCE-reader-gate arm witnesses.
7. **The path-independent `componentIdGenerator` adoption (RULED, §7):** a `vite.config`/plugin-vue option change making scope-ids source-content-keyed; validate no-collision + measure the one-time rotation.
8. **The `profile:budget` basename-keying confirm + the survey-graduation prototype-fold + the A1′ census correction:** confirm basename-keying before the 6-chunk rehash; fold `survey` first to confirm typecheck + `proof:import-boundaries` green + per-route delta; `levelField.ts` is concentric-internal (the real curlFBM edge is `concentric → liquid-grid/index.ts`).

The `scripts/` god-dir disposition (498 text files; the 37 `wf-*.js` + `_reflect-*/_reshoot-*` one-shots) → a `scripts/tranche-history/` home OR a no-legacy prune (a §5 disposition call), orthogonal to G7's literal scope but the natural next-tier concern.

---

## Appendix A — worked examples (verified)

**A1 — The dock split-brain (the FOLD census, verified).** Of 8 shared-tree composables round-1 named "dock-only," exactly ONE folds:

| Leaf | Verdict | Reason (verified) |
|---|---|---|
| `useDockCtaReceive` | **FOLDS → dock/composables/** | dock-purpose; no sibling edge; dock re-exports it. |
| `morphSignatures` | STAYS shared | imported by sibling `useGooMorph` + root barrel. |
| `useScrollTo` | STAYS in sidebar | sidebar-family, composed by sibling `useClickDelegate`/`useLazyLoader`. |
| `useLiquidReveal` | STAYS shared | bloom-family root; on `/motion`+`/api`; dock is one of ≥2. |
| `useScrollTrigger` | STAYS shared | composed by sibling `scrollReader`/`useScrollChrome`. |
| `useScrollChrome` | STAYS shared | scroll-reader family; on `/api`. |
| `useBloomUp` | STAYS shared | app-global demo `AppShell.vue` + composed by `useElementMorph`. |
| `useGlassBackdropLuminance` | STAYS shared | glass adaptive family; composed by `ambientHueHistogram`/`backdropSampleMath`. |

**A1′ — The PROMOTE-primitive census (25 buried primitives, corrected).** `budget.ts` (12 files / 7 viz families, byte-neutral) → shared viz/glass leaf; `procedural-color.wgsl.ts` (6 sibling shaders, byte-neutral) → `composables/glass/webgl/shaders/` beside its GLSL twin; `useDockHold.ts` (reached by `ui/slider`) → promote with `dockContext`; `liquid-grid/composables/liquidGrid.ts` `curlFBM` (reached by `concentric`) → the shared field operator (NOT `levelField.ts`, which is concentric-internal).

**A1″ — The PROMOTE-context census (proven end-to-end).** `dock/composables/dockContext.ts` is module-path-imported by 5 non-dock families via `useOptionalDockContext` → **PROMOTE to `composables/context/dockContext.ts`** (InjectionKey + helper pair + `DockOrientation`/`DockLayout` types + inlined `DOCK_CONTEXT_LABEL`; SFC-free). Typecheck 0, build 0, `/dock` byte-stable, +0 backward edges, −327 gz on each of 5 foreign routes. The 7 other DI-context instances have 0 foreign importers → STAY.

**A2 — The single-family subtree.** `composables/sortable/` (860L, sole consumer `sortable-list/`) → `sortable-list/composables/`. `/virtual`+`/sidebar` (0 in-repo) STAY module-level (T3a).

**A3 — The god-SFC family asymmetry.** `blob.vue` (875L) + `constellation.vue` (759L) → feature dirs like `aurora/`.

**A4 — The atomization cluster.** `labeled-field/` 5 `Labeled*` wrappers → ONE generic + typed slot.

**A5 — The provenance flatten.** `components/{ui,custom}/*` → `components/*` (82 flat + 9 under `viz/`), `ui/tabs→tabs/reka`, `subpath-policy.mjs` two-set merge (`tabs=PUBLISH`), machine-locked README domain-map, tests-dir flatten mirror, zero EXPORT churn.

**A5′ — The T4 self-fix.** `timeline/geometry.ts` (timeline's ONLY separable helper) STAYS a root sibling file; the round-3 `geometry.ts→composables/` residual is DELETED. Frontend `lib/` is earned only by a 2nd helper.

**A6 — The §4-PRODUCT graduation (speedtest).** `admin`/`dashboard`/`survey` GRADUATE into `features/<domain>/{ui,state,api,composables,lib,config,constants,types,index.ts}`; feature INTERIORS obey the 500 ceiling (`useMeterRenderer.ts` 693 carves under the app's own ratchet; the METER sub-domain recursively graduates); `views/` stays app-global; `design/`→`styles/`; `App.vue` 833L → `useAppProviders` + `layouts/` + T1c template carve; `Dock.vue` 774L → `components/dock/`; the per-sibling migration instrument authors from the shared formula.

**A7 — The backend reshape (floridify + speedtest/server).** floridify `models/` (174 importers) — shared schema-registry carve; `lookup_pipeline.py` (5-domain) → `pipelines/`; the 41 god-modules drain under §6 G9; the NESTED `api/{routers,repositories,services}/` layer-by-type dissolves file-by-file into domain packages (the recursive scatter check), `api/core/` stays a nested infra-ring. speedtest/server `routes/`+`services/`+`validation/` (≥2-stem scatter) dissolve into domain packages + the infra ring. Both reproduced live by G9 (floridify 47 / speedtest-server 4 / dns-speedtest 2 / greenfield-rs GREEN).

---

## Appendix B — the round-3 [R3]→resolution ledger

| [R3] item (round-2) | Resolution | Where |
|---|---|---|
| src→`@glass` whole-tree re-open | **REJECTED** — dts-leak blocker; `@glass`=consumer alias, src relative; new G10 lock | §7, §6 G10 |
| dev-CSS-resolver + HMR proof | **PROVEN** — approach (i) end-to-end; option (ii) dropped; T1b-walk convention | §2.6, §6 G6 |
| 28-reach PROMOTE chunk delta | **MEASURED** — primitive byte-neutral, DI-context −327 gz/route WIN; count 28→25; A1′ fixed | §7, §1.5 |
| dockContext DI-context promote | **PROVEN end-to-end** — typecheck/build 0, +0 edges; `composables/context/` = DI CONTRACT home | §1.3, §1.5, §2.4, A1″ |
| ship G7 as a real script | **SHIPPED** — born-RED 865, all-text-recursive, 9/9; + subpath-policy semantic rewrite + close-battery | §6 G7, §3 |
| ratify + wire G9 | **RATIFIED + WIRED** — self-test 9/9, live-backend reproduced | §6 G9, A7 |
| the reka `tabs/reka` home | **CONFIRMED** — `ui/tabs → components/tabs/reka` + `tabs=PUBLISH` | §3, A5 |
| survey-graduation fold | **NAMED execution sub-wave** | §4P.5, §9 |
| source-CSS-@import audit | **CLOSED** — icon-chip sole cross-global @import | §2.6 |

## Appendix C — the round-3 BLOCKER→fold ledger

| Blocker (round-3 critique) | Judged | Fold | Where |
|---|---|---|---|
| `geometry.ts→composables/` self-contradicts T4; frontend lacks `lib/` | CORRECT | Add `lib/` segment; single helper stays root sibling; delete the residual | §2.1, §1.3 T4, §3, A5′ |
| SFC-over-500 taxonomy incomplete on the non-style axis | CORRECT (GlassDock 515 no-`<style>` is the live driver; SegmentedTabs 512 was stale-base — it is 416) | Add T1c script/template-mass carve | §1.3 T1c, §4P.9, §6 G2 |
| G9 nested layer-by-type blind spot (floridify `api/`) | CORRECT | Recursive scatter check at every dir level | §5.1, §6 G9(c) |
| Feature-interior 500 ceiling unstated for product apps | CORRECT | Ceiling binds interiors; per-app carve owner; recursive sub-domain graduation | §4P.5 |
| Rust compile-invariant claim factually wrong | CORRECT (proto4 rustc) | Encapsulation compile-invariant; directionality is a gate concern | §5.2 |
| tests-DIRECTORY flatten omitted (only imports) | CORRECT (12 fixture gates) | Enumerate tests-dir move + fixture-gate re-points | §3, §7, §9 |
| CSS reader-gate SOURCE-path sweep unnamed | CORRECT (107 refs) | The 4th sweep; G6 SOURCE-reader-gate arm | §2.6, §6 G6, §7 |
| Vue scope-id rotation (byte-identity framing incomplete) | CORRECT (plugin-vue 6.0.7) | Path-independent `componentIdGenerator`; corrected claims | §7, §6 G6 |
| Barrel-only rule lacks `sideEffects` precondition | CORRECT | Binding precondition constellation-wide; G8 audit | §2.1, §5.2, §6 G8 |
| Un-committed final tree shape (flat vs grouped) | CORRECT (trigger fires) | Commit `viz/` sub-group + cohesion-vs-sediment reconcile | §3 |
| No per-sibling migration instrument (edict 1) | CORRECT | Each sibling authors from the shared formula | §4P.13, §6 G8 |
| No crisp normative core | CORRECT | §0.5 quick-reference | §0.5 |

*No remaining `[R3]` design questions. §9 is the execution-carve ledger — settled rulings, codemod/gate mechanics to encode.*
