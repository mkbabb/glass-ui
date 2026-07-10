# The Constellation Structure Standard — Round-3 Canonical Draft

**Status:** FINAL synthesis draft (round-3, cut HEAD `c3621f08`). Supersedes `STRUCTURE-SPEC.md`, `ROUND-2-SPEC.md`, `ROUND-1-SPEC.md`. Every round-2 **[R3]** item is now RESOLVED by a round-3 execution prototype (dev-CSS resolver proven under HMR; the PROMOTE chunk-weight measured; the `dockContext` promote run end-to-end; G7 shipped born-RED; G9 ratified + wired; the src→`@glass` re-open adjudicated). No **[R3]** design questions remain open; the residue is a short, named EXECUTION-CARVE ledger (§9) — decisions already made, mechanics to encode in the codemod.
**Scope:** ONE structural grammar for every repo in the constellation — glass-ui (the library) + its sibling demo/consumer apps (speedtest, words/floridify, slides, sci-report) + the polyglot backends. Frontend and backend under one law; each language binds its own idiomatic norms.
**Constitution:** the user's edicts (§0). Aristotelian proportion is the divining rod; colocation is recursive; no god-modules, no needless encapsulation; clean break, no legacy.

---

## §0 The constitution (edicts, restated as binding)

1. ONE standard for component/module structure covering BOTH frontend and backend, for the WHOLE constellation.
2. **Aristotelian proportion is the divining rod.** Needless encapsulation and excessive granularity are vices; god-modules are the opposite vice. The MEAN divines components, nested/recursive components, modules, directories.
3. **Colocation, recursively.** A component lives WITH its sub-components, composables, skeletons, constants, styles, shaders, README — recursing for nested components. Only truly module/global-level kin live in a shared home.
4. Long-running dirs ALWAYS break into common modules, encapsulated befittingly.
5. Settle with evidence: FLATTEN the `components/ui + components/custom` two-tier, or not? SOTA (2025-2026)? — **SETTLED: FLATTEN** (§3).
6. Backend gets the SAME treatment + enforcement, abstracted per language.
7. NO quick solutions, NO workarounds. Idiomatic, gestalt approaches. Architectural transposition for elegance, simplicity, performance. NO legacy code, no back-compat aliases.
8. Every file, component, style examined, then RE-examined.

---

## §1 The Law of Aristotelian Proportion

> The mean is not a number. It is the answer to one question asked of every module: **does everything in here belong together, and is anything that belongs together kept apart?** The thresholds below are guardrails that catch a module drifting toward either vice — they are not the law. The law is cohesion. The divining rod runs in **both directions**: it folds an over-abstracted leaf back into its sole owner, AND it promotes a general primitive out of the one consumer that buried it (§1.5).

### §1.1 The two vices, named

| Vice | Name | The failure |
|---|---|---|
| **Excess** (too little division) | **God-module** | A file/dir holds >1 concern; things that change independently are fused; a reader must hold the whole file to understand any part. |
| **Deficiency** (too much division) | **Atomization** | A concern is shattered across many tiny modules; an abstraction is minted before ≥2 real consumers exist; the reader runs a scavenger hunt across folders to assemble one behaviour. Premature abstraction is *more* harmful than the duplication it removes. Three special cases: **atomization-by-misplacement** (burying a general/sibling-owned/app-global primitive inside ONE consumer); **the buried-primitive** (a genuinely shared primitive physically resident inside one component that ≥2 OTHER components reach into — the **25** live cross-component guts reaches, §1.5, re-measured); **the buried DI-context** (a provide/inject context provided by ONE component and read by ≥2 FOREIGN component families — the `dockContext` case, §1.3/§1.5, proven end-to-end). |

Layer-by-TYPE (`controllers/ models/ utils/`) is the god-module's structural cousin (scatters one feature across type-folders); over-colocation is atomization's. The spec forbids both.

### §1.2 The unit: the component FOLDER

The atomic module is the **per-component folder with an index barrel** — reka-ui's Combobox (17 files) and a 2-file wrapper are the SAME unit at different scales; the folder scales with the concern, the barrel is invariant. This is FSD's *slice*, bulletproof-react's *per-feature dir*, Josh Comeau's *component-folder-with-index* — one convergent unit, SOTA-praised across every round. glass-ui already runs it in `custom/`; the spec canonizes THIS unit as universal (frontend and backend).

**Colocation is the default; promotion to a shared home is the exception that must be earned** (§1.3 T3). This single directionality — *local until proven shared* — is the spine every source encodes.

### §1.3 The thresholds (guardrails, with rationale)

**T1 — File size. Hard ceiling 500 RAW lines; soft target ~300; the real test is cohesion.**
- 500 is the house-native ratchet (`proof:no-god-module`, `HARD_LIMIT=500`). **Lines are counted RAW** (`source.split("\n")`, mirrors `wc -l`) — the house's live definition, PINNED. No "logic-line" variant. The §8 RATCHET_BASELINES are raw counts, untouched.
- A hard number becomes a target ("files fill up right to the limit"). So 500 is a **fail ceiling**, ~300 an **advisory soft target** (warn, not fail), and a file *under* 500 is still a violation if it fuses >1 concern.
- **Over-ceiling escape: the draining RATCHET only — no permanent length exemption (RULED).** A cohesive file over 500 registers a ratchet row with rationale and drains as it is carved; it is NOT permanently exempt. A permanent complexity-gated file-length exemption is rejected (edict 7). The god-FUNCTION metric IS adopted as a SEPARATE per-language advisory (§5.2). The only length carves are the three single-artifact cases below.
- **Shader-literal exemption:** a single cohesive `*.{glsl,wgsl,frag,vert}.ts` string is ONE artifact — splitting corrupts the assembled shader. Exempt from the line gate, governed by cohesion.
- **Data-manifest exemption (T1a):** a single-source DATA manifest N gates parse by literal path (demo `stories/manifest.ts` 1406L; the `tokens.css` cascade) may exceed 500 *as data* IFF its resolution/logic machinery is carved out (the `manifest/lazy.ts` precedent). Registered, named — not silent drift.
- **SFC scoped-style exemption (T1b).** A `.vue`'s RAW line count is fair (§6 G2 counts `<template>+<script>+<style>`), but a cohesive SFC whose template+script is proportionate while its `<style scoped>` mass pushes it over 500 (the census's worst class: speedtest `SpeedtestResults.vue` 2265L / ~1350 style; glass-ui `Slider.vue` 475/278, `ContinuousTimeline.vue` 351/315, `ContinuousMarkers.vue` 444/264, `CarouselContent.vue` 375/218) is drained the SAME way its shaders are — the style is EXTRACTED to `<style src="./styles/<Name>.css">` in the component's colocated `styles/` dir (§2.6), and the extracted CSS is EXEMPT from the SFC line count (a single cohesive artifact under its own CSS ceiling). **This is byte-neutral for glass-ui** (SFC scoped CSS already folds to `/styles` at build, AN.W1). The extracted CSS file is subject to the CSS line gate (§6 G2) and its own cohesion. **The T1b/§2.6-walk interaction has a mandatory convention** (round-3, §2.6): a `<style src>`-extracted file is Vue-SCOPED and rides the SFC fold pipeline (`dist/glass-ui.css`), NOT the `index.css` cascade — so the component-styles build walk MUST NOT blindly copy every `*.css` under `components/**/styles/` into `dist/styles/` (double-emit). The walk copies ONLY the sheets `index.css` references; SFC-extracted CSS is skipped by that predicate.

**T2 — Directory depth. Colocation nests at most ONE segment level below a component root; recursion resets the budget.**
- SOTA: readers lose context past 3–4 levels; FSD caps at EXACTLY 3 (Layer→Slice→Segment).
- **Rule:** within one component root the tree is `root → {segment dir} → file`. A segment dir (`composables/ shaders/ skeleton/ styles/ sections/ constants/ config/`) holds files, NOT other segment dirs. A nested SUB-COMPONENT (a child with its own multi-file structure + `index.ts`) is a NEW component root that RESETS the local budget — how recursion (edict 3) stays legal without unbounded depth. A global sanity cap (**≤5 dirs** below the NEAREST feature/component root — relative, not an absolute `src/components/` path, since product apps have no such anchor) catches runaway recursion without a recorded rationale. Machine-locked by `proof:depth` (§6 G3; prototyped, self-test 5/5).

**T3 — Promotion to the shared tree. ≥2 UNRELATED families — decidably counted, with three placement cases.**

The house's ≥2-consumer visual-load-bearing invariant (J-inv-10) IS this rule; the spec extends it to every non-visual leaf. The naive `grep | family-extract | distinct-count` gives WRONG counts (the A1 flagship greenlit 7 illegal folds). The count is made decidable by its inclusion/exclusion set:

- **INCLUDE composition edges.** A leaf real-imported by a SIBLING shared-tree leaf belongs to that sibling's shared family. `morphSignatures` imported by `useGooMorph` → a shared motion primitive, NOT dock-only.
- **INCLUDE demo/sibling-app usage.** A leaf a consumer app uses APP-GLOBALLY (demo `AppShell.vue`, a sibling repo) is proven-general. `useBloomUp` is app-global route-bloom → stays shared.
- **EXCLUDE WITHIN-FAMILY DI plumbing.** A `provide`/`inject`/DI-key indirection wired WITHIN one component family is NOT a family edge (`useGeolocation` reads as 7-importer cross-family but is single-family through DI keys → stays single-family).
- **EXCLUDE discovery-layer TYPE re-exports.** A context's TYPE re-exported through the `api/` discovery layer (`api/index.ts`, `api/types-extra.ts`) is a PUBLISH edge, NOT a foreign consumer. `dockMorphContext` is type-re-exported via `api/` but has ZERO foreign module-path importers → STAYS colocated (round-3: the criterion counts MODULE-PATH imports, never name mentions or type re-exports).
- **PROMOTE a cross-family-read DI context (the third case — proven end-to-end, round-3).** A provide/inject context PROVIDED by one component and READ (via `inject`/the paired helper) by **≥2 non-owning component families, counted by module-path import**, is a genuine shared context primitive — NOT excludable, NOT a guts reach to route through a heavy barrel. It PROMOTES to a lightweight shared context leaf (`composables/context/`), carrying the `InjectionKey` + the helper pair + the context's own domain types (round-3 ratification below). The provider imports it UP; every foreign reader imports it UP — both legal `components→shared` edges; `proof:import-boundaries` (G4) greens, T3 is satisfied, no component's SFC graph is dragged into a foreign chunk. **Live driver:** `dock/composables/dockContext.ts` (a `createStrictContext` module that ALREADY imports the shared factory from `composables/context/`) is read by 5 non-dock families (`ui/slider`, `ui/select`, `ui/popover`, `ui/dropdown-menu`, `custom/hover-popover`) via `useOptionalDockContext` → **promote to `composables/context/dockContext.ts`.**
- **EXCLUDE root-barrel and curated-aggregator re-exports** — a re-export from `src/index.ts` or a `*/core/index.ts` is a PUBLISH edge, not a consumer family. **Publication is a publish-surface signal, NOT a physical-location signal** (§2.5): a published leaf can STILL fold physically, because the subpath-entry re-points to the deep leaf (B4). `publishedPublic` is advisory in the promotion decider, never a false 2nd family.

**The DI-promotion criterion, codified (round-3, decidable):** *a `createStrictContext`/`createOptionalContext` module promotes to `composables/context/` IFF ≥2 non-owning feature-dirs import its MODULE PATH; else it stays colocated with its owning component.* Enumerated over all 8 DI-context instance sites at HEAD, exactly ONE qualifies: `dockContext`=5 → PROMOTE; `dockMorphContext`/`dockLayerContext`/`drawerSnapContext`/`toggleGroupContext`/`sortable-list/context`/`configurator/size`/`DockLayerGroup`=0 → ALL STAY. A many-foreign-consumer STATE factory (`useConfiguratorState`) is a DIFFERENT category — already correctly exported via subpath — the DI rule is scoped to context INSTANCES.

**The overriding rule:** *a shared leaf composed by a sibling shared leaf, used app-globally, OR read as a context by ≥2 foreign families STAYS/BECOMES shared, regardless of component-family count.* Below the bar, a leaf colocates under its sole owner. Machine-locked by `proof:colocation` globality clause (§6 G1) + `proof:import-boundaries` DI-context sub-ruling (§6 G4).

- **Exemption (T3a):** a PUBLISHED subpath surface with a recorded external (cross-repo) consumer stays module-level at 0 in-repo families (`/virtual`, `/sidebar`). Machine-checkable against `docs/consumer-evidence/`.
- Census fact: ~10 composables clear ≥3-unrelated-families today; the bar is **≥2** (aligned to inv-10), ≥3 the natural cluster.

**T4 — Segment minimum-substance.** A `composables/` holding one file, an empty `constants.ts`/`shaders/` — atomization. A segment appears ONLY with real members OR a genuinely-separable concern. A lone component-local composable stays a sibling file at the component root until a second earns the `composables/` dir. Machine-locked by `proof:colocation` no-empty-segment clause (§6 G1).

### §1.4 Both-direction violations, decidable

**God-module (excess) — any of:**
- file >500 RAW lines (non-shader, non-data-manifest; SFC drained via T1b extraction);
- a dir mixing >1 domain/concern with no sub-grouping;
- layer-by-type at the top level (`controllers/`, `services/`, `models/` as app-global dirs — but see the §5.1 infra-ring + shared-types carves);
- a grab-bag (`utils.ts`, `helpers.go`, `common.py`) accreting unrelated leaves.
- **The `mixed-kind` flat-dir smell (advisory, not a gate).** A flat dir of >~7 sibling files of MIXED kind (page vs helper vs shared) is a human-review flag. The machine-checkable substitutes ARE gated: the README domain-map (§3), `proof:depth`, `proof:import-boundaries` (the real mechanism by which a flat peer set stays legible — peers compose only through barrels). No standalone `mixed-kind` gate.

**Atomization (deficiency) — any of:**
- a shared-tree resident with <2 unrelated families (per T3) and no external-consumer exemption → **FOLD** to its sole owner;
- **atomization-by-misplacement:** a general/sibling-composed/app-global leaf buried inside one consumer;
- **the buried-primitive:** a genuinely shared primitive resident inside one component that ≥2 OTHER components import → **PROMOTE** to the shared tree (§1.5);
- **the buried DI-context:** a provide/inject context module-path-imported by ≥2 FOREIGN families → **PROMOTE** to a shared context leaf (§1.3 T3);
- a segment dir with a single trivial member (T4);
- a wrapper module that only re-passes its inputs (labeled-field's 5 `Labeled*` SFCs → one generic + typed slot);
- a composable/util extracted before its 2nd consumer exists.

### §1.5 The FOLD↔PROMOTE symmetry (the divining rod runs both ways)

One census machinery, three placement cases. **T3 is a placement function of the family count, not a one-way ratchet.** `proof:colocation` globality and `proof:import-boundaries` are the two ends of the SAME rod:

- **FOLD (globality gate, §6 G1).** A shared-tree leaf with EXACTLY ONE in-repo family and no sibling/app-global/external/context signal colocates under its sole owner. The verified fold set is small (Appendix A1): `useDockCtaReceive` → `dock/composables/`; `composables/sortable/` → `sortable-list/composables/`. Seven round-1-named "folds" are STAY-SHARED.

- **PROMOTE — buried primitive (import-boundaries gate, §6 G4).** A primitive resident inside one component that ≥2 OTHER components reach into promotes OUT. `proof:import-boundaries` is **born-RED on HEAD with 25 cross-component GUTS reaches** (round-3 re-measure — was a prose "28"). The measured drivers:
  - `aurora/constants/budget.ts` — imported cross-component by **12 files across 7 viz families** (concentric, constellation, dot-flow-field, dot-matrix, fourier-field, goo-blob, liquid-grid). A shared viz-budget primitive buried in aurora/. → promote to a shared viz/glass home. **(Weight note, §7: byte-neutral — `budget.ts` is fully constant-folded; there is no output module to relocate.)**
  - `aurora/constants/shaders/procedural-color.wgsl.ts` — spliced by **6 sibling viz shaders**. Its GLSL twin already lives shared at `composables/glass/webgl/shaders/`; the WGSL twin got buried. → promote to the same shared shaders home (reunite the twins). **(Weight note: byte-neutral — the two twins already co-bundle into one Rolldown chunk; the promote is a source-tree reunion.)**
  - `dock/composables/useDockHold.ts` reached by `ui/slider` — a non-DI dock guts reach. → promote WITH `dockContext` (it imports `useOptionalDockContext`) or re-point UP.
  - `liquid-grid/composables/liquidGrid.ts` (the `curlFBM` field operator) reached by `concentric/useConcentric`. → the shared field operator. **CORRECTION (round-3):** the round-2 A1′ entry naming `concentric/composables/levelField.ts` as the shared operator is a FACTUAL ERROR — `levelField.ts` is imported ONLY within `concentric/` (concentric-internal, not cross-family). The real cross-family curlFBM edge is the REVERSE: `concentric` imports `curlFBM` from `liquid-grid/index.ts` (already barrel-exposed). Fix the census entry.
  - The 5 `dockContext` reaches are the DI-context case (below), not buried-primitive.

- **PROMOTE — buried DI-context (import-boundaries gate, §6 G4).** `dockContext.ts` → `composables/context/`, per the codified criterion (§1.3). **Proven end-to-end (round-3):** the move typechecks (`vue-tsc --noEmit` exit 0, test-tsconfig exit 0), `vite build` exit 0, `proof:subpath-enumeration` PASS (the `/dock` public surface re-exports all 7 symbols byte-stable), `proof:colocation`/`proof:no-nested-import` PASS, and the promote introduces **ZERO new backward edges** (`composables/context/dockContext.ts` imports only `vue` + `./createContext`). The chunk-graph is CLEAN before AND after (the "split-brain" chunk-leak NEVER existed — the baseline already hoists `dockContext` into a GlassDock-free leaf); the promote marginally IMPROVES it (leaf 1166B→415B, factory dedups across 6 chunks, every foreign route reaches −1 chunk).

**The three cases use the same census machinery.** The reshape wave runs all three: FOLD (small), PROMOTE-primitive (the buried-primitive class), PROMOTE-context (the DI-context class) — draining to a tree where every cross-component edge goes through a barrel or a shared leaf. **The aristotelian mean is one decidable placement RULE run over three cases — the DI-context case is why "single verdict, not two" was too strong.**

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
  shaders/  skeleton/  styles/  sections/     # segment dirs, when present
```
The barrel `index.ts` is the invariant the flat subpath (`@mkbabb/glass-ui/<name>`) re-exports, so the export surface is DECOUPLED from internal layout. A trivial 2-file component keeps the folder+barrel (needed for the subpath; reka does this uniformly).

**The barrel-only rule + the deep-leaf exemption (B4).** `index.ts` is the ONLY import surface for anything reaching this component from ANOTHER component or the app. The SOLE exemption: a **curated subpath-entry** (§2.5) re-exports the deep colocated LEAF directly (`export { X } from '../components/dock/composables/X'`) — NEVER through the component barrel (which would drag the whole component into a heavy subpath chunk). `proof:import-boundaries` distinguishes a legitimate subpath deep-leaf re-export from an illegal cross-component guts reach.

### §2.2 What colocates (the default)
Everything a component OWNS: sub-components, component-local composables, constants, shaders, skeletons, styles (§2.6), README. A component-specific composable read only by that component is NOT module-level and must NOT sit in the shared tree.

### §2.3 Recursion
A sub-component that grows its own multi-file structure becomes a nested component root under the parent (or under `sections/`), with its own `index.ts`, its own local `composables/`, its own README if complex. Aurora (demo) is the gold standard: `aurora/` root + `config/` + `sections/` + `presets.ts`. Each nesting RESETS the depth budget (T2). The `tabs/reka/` sub-component group (§3) is the executable instance: reka primitives nest as a named sub-component group under `components/tabs/`.

### §2.4 The shared tree — what earns a module-level home
`src/composables/` holds ONLY leaves clearing T3. Its sub-trees (`motion/ glass/ dom/ dark/ reactive/ context/`) are the shared homes. The PROMOTE set (§1.5) joins them: buried multi-family primitives (`budget.ts`, `procedural-color.wgsl.ts`) land in the befitting shared sub-tree (viz-budget → a shared viz/glass leaf; the WGSL shader → `composables/glass/webgl/shaders/` beside its GLSL twin); the buried DI-context (`dockContext.ts`) lands in `composables/context/`.

**`composables/context/` is the DI CONTRACT home (round-3 ratification — an identity refined, not a surprise).** The prototype proved the DI-context promote FORCES the context's own domain types into the shared dir: `DockContext` consumes `DockOrientation`/`DockLayout`, and a backward `shared→component` type import would violate the DAG, so those types move WITH the context. `composables/context/` is therefore explicitly redefined from "domain-neutral DI FACTORY only" (`createStrictContext`/`createOptionalContext`) to **"the DI CONTRACT home = the neutral factory + every cross-cutting promoted context + that context's own contract types."** A reader finding `DockOrientation` in the shared DI dir is seeing the law work, not a smell. The domain-types-ride-along is the accepted proportion cost of the promote; it is coherent because a DI contract IS its types.

**The Vue-idiomatic divergence (recorded, deliberate).** FSD names segments by PURPOSE and warns against essence-names (`hooks/`). glass-ui and the Vue ecosystem use `composables/` (essence-name). The spec KEEPS it (ecosystem consistency), recorded as a documented divergence. Backend uses purpose-names (§5).

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

**The measured edge legality table (prototyped, self-test 11/11 incl. the round-3 DI bite):**
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
| shared → components via `export *` aggregator barrel | LEGAL (the T3 publish carve; the ONE standing HEAD instance is `composables/index.ts → infinite-scroll/composables`, the documented colocation-exception seam) |
| any → subpath-entry | **RED** (the publish layer is the sink, not a dependency) |

**The FOLD / PROMOTE-primitive / PROMOTE-context sets (§1.5).** FOLD: `useDockCtaReceive`, `composables/sortable/`. PROMOTE-primitive: the buried-primitive class (`budget.ts` 12/7, `procedural-color.wgsl.ts` 6, `useDockHold.ts`, `liquidGrid.ts`/curlFBM). PROMOTE-context: `dockContext.ts` → `composables/context/`. The chunk-graph delta of ALL classes is now MEASURED (§7): FOLDs +29 gz to D5-exempt shared chunks; PROMOTE-primitive byte-neutral; PROMOTE-context a per-route WIN.

### §2.6 Styles / CSS — PHYSICAL colocation via approach (i), PROVEN dev+HMR+byte-identical-dist

The census found component-SPECIFIC CSS (`dock/*.css`, `border-progress.css`, `cta-seat.css`, `segmented-tabs.css`) in the GLOBAL `src/styles/` tree — a colocation miss vs SOTA (Vuetify colocates `VBtn.sass`). **Round-3 PROVED approach (i) end-to-end on a running demo dev-server; it is the canonical mechanism. Option (ii) (Vite dev alias) is DROPPED — dominated.**

**The proven mechanism — approach (i): rewrite the SOURCE @import to the real colocated path + a build-transform that flattens it back.**
1. The ~14 CLEAN single-owner families relocate PHYSICALLY into `components/<n>/styles/<n>.css` (+ any own-subdir partials — dock.css keeps its 17-partial `dock/` subdir INSIDE its colocated `styles/`, so `./dock/*` internal refs survive untouched).
2. `src/styles/index.css` — the SINGLE inter-component cascade-ordering authority, staying physically in GLOBAL `src/styles/` — rewrites each moved `@import "./dock.css"` to the honest on-disk path `@import "../components/custom/dock/styles/dock.css"` (a REAL file every resolver agrees on: Vite, @tailwindcss/vite enhanced-resolve, esbuild, IDE go-to-definition).
3. A ~30-line build-transform (2 fns appended to the existing `vite.style-fold.ts` god-module-carve plugins, wired into `publishStyleAssets` AFTER `copyStyleAssets`, BEFORE `foldSfcBundle`): `copyColocatedComponentStyles` walks `src/components/**/styles/` and `cpSync`s each index.css-referenced sheet into a FLAT `dist/styles/`; `rewriteDistIndexColocatedImports` regex-rewrites `@import "../components/…/styles/(X)"` → `@import "./$1"` in the shipped `dist/styles/index.css`.

**The proof (round-3, isolated HEAD-pinned worktree — NOT the stale origin/master):** Vite v8 dev started clean, 0 CSS resolve errors; `/dock/overview` HTTP 200 with `.glass-dock` computed `padding:8px 12px` / `radius:9999px` / `blur(8px) saturate(1.2)` all painting from the colocated `dock/styles/dock/shell.css`; **HMR SURVIVES** — editing the colocated `shell.css` logged `hmr update /src/components/custom/dock/styles/dock/shell.css` and mutated the live `.glass-dock` with NO reload; `npm run build` green; `diff -rq baseline dist/styles` **exit 0 across all 106 CSS files**, aggregate sorted-hash parity, `dist/styles/index.css` byte-identical (@imports rewritten back to flat `./dock.css`, ZERO `../components` leak). **Decisive contrast:** the round-2 "leave @import UNCHANGED + flatten-on-publish" variant is a HARD DEV BREAK (HTTP 500 `Can't resolve './dock.css'`); approach (i) is the only variant satisfying BOTH dev and build.

**The rulings:**
1. **The ~14 CLEAN single-owner families colocate PHYSICALLY** into `components/<n>/styles/` (+ own-subdir partials): dock, drawer, border-progress, tabs, select, sheet, completion-seal, hover-popover, instrument-chassis, configurator, cards, floating-panel, card-scroll, glass-refract. Extracted SFC scoped styles (T1b) land here too — but under the T1b/walk convention (§1.3): the walk copies ONLY index.css-referenced cascade sheets; a `<style src>`-extracted SFC-scoped file rides the SFC fold pipeline (`dist/glass-ui.css`) and is SKIPPED by the walk. Machine-locked by `proof:css-colocation` (§6 G6): every colocated cascade CSS flattens to a UNIQUE `dist/styles/` target (no clobber); subdir partials stay within `styles/`; the walk reaches every `src/components/**/styles/` dir; a golden sorted-hash manifest of the shipped `/styles` reds any byte drift; a synthetic un-rewritten escaped @import born-REDs; **the SOURCE-@import arm asserts no `index.css` @import dangles at SOURCE** (the dev-HMR resolver is present and resolving).
2. **`icon-chip.css` (the SOLE cross-global @import — it `@import`s the GLOBAL `./glass/glass-atom.css` + `./glass/glass-chip.css`) STAYS DOCUMENTED-OWNERSHIP.** Physically colocating it would need a SECOND rewrite rule (normalize its intra-sheet escaped ref back to `./glass/*` in dist) — not worth the extra transform surface for one file. It keeps a `README OWNER:` field + `proof:css-ownership` (§6 G6). The census confirms icon-chip is the ONLY cross-global @import among the candidate families (the other 12 carry ZERO @import; dock/dock-controls @import only their own subdir partials).
3. **Genuinely-global cascade stays in `src/styles/`:** the token cascade, the 5-rung glass ladder, typography, theme, `utilities.css`, `paper.css`, `animations.css`, `transitions.css`, no-single-owner recipes. `feedback-tone.css` is owned by the feedback CLUSTER (≥2) — stays global with the cluster named.
4. **`index.css` remains the SINGLE INTER-component ordering authority** — the load-bearing @layer + source-order ties (`menu.css` after `utilities.css`; `glass/rim.css` after `ladder.css`) are INVIOLATE. The PUBLISHED cascade is byte-identical; only the SOURCE @import TARGETS change (to real colocated paths), and the resolved order does not. Cascade-ORDER = global concern (index.css owns it); file LOCATION = colocation (`component/styles/` owns it).

**The build change lands in the EXECUTION tranche** (a `src`/build write the spec-phase fence forbids). The spec records the mechanism + the dev+HMR+byte-identical proof + the golden-hash gate + the T1b-walk convention.

---

## §3 VERDICT — flatten `components/ui` + `components/custom`

**FLATTEN.** Merge into ONE `src/components/` of domain-organized per-component folders as flat peers. No provenance tier, no dead markers. **Settled (edict 5), executable, proven** — restated, not reopened.

### The evidence (unanimous for owned libraries)
Every library that OWNS its components keeps flat peers, no vendored-vs-house tier: **reka-ui** (~78 flat + `shared/`, glass-ui's own substrate), **Base UI**, **Ark UI** (~70 flat + `factory.ts`), **PrimeVue** (80+), **Vuetify**. The two-tier is EXCLUSIVELY a shadcn-CONSUMER pattern whose sole rationale — protecting vendored copies for `npx shadcn add` re-pull — is DEAD here (glass-ui's `ui/` is ~100% forked). Sharper structural proof: **6 `ui/` components already reach UPWARD into `custom/`** (`Section→paper-backdrop`, `MetricPill→metric-badge`, 4× reka→dock) — a "base" tier importing the "composite" tier is no layering. The ui/custom boundary encodes NO architectural invariant; folder contents signal complexity (reka Combobox 17 files vs a 2-file wrapper, same tier). The tier is provenance sediment.

### The reshape — proven executable (CODEMOD-SPEC, run GREEN over all 92 families)
The move is ONE elision: remove the segment `ui`/`custom` wherever it immediately follows `components`.
- **src imports (all-relative, `@glass` 0×): resolve-and-recompute — SCOPED to the flatten-VARIANT subset (round-3 refinement).** Of 1786 src relative specifiers, **1218 are flatten-INVARIANT** (the string is unchanged under the elision — within-atom colocation + same-tier sibling reaches — a correct codemod re-emits them byte-identical) and **568 are flatten-VARIANT** (360 reach a shared module `composables/utils/styles/api`; 208 reach a tier sibling `subpaths/*.ts → ../components/<atom>`). The recompute writes ONLY the 568 that differ. The migration NUMBER is "568 src specifiers change; 1218 unchanged" — not "recompute all 1786". The SAME codemod that executes the flatten performs this recompute one-shot.
- **demo AND tests imports (`@glass/components/{ui,custom}/*` absolute alias): segment-drop.** `@glass/components/custom/dock` → `@glass/components/dock` resolves with ZERO depth arithmetic; the alias UNTOUCHED. Verified at HEAD `c3621f08`: **398 demo + 123 tests** `@glass/components/(ui|custom)` segment-drop specifiers. Tests ride `@glass`, NOT relative — grouping tests WITH src (all-relative) would SKIP the tests mirror under the resolve-and-recompute pass. The residual relative-into-src (1 tests, 0 demo at HEAD) is swept to `@glass` in the same wave for a 0-residual invariant.
- **scripts (enforcement corpus): one uniform `dropSegment` pass PLUS exactly ONE semantic rewrite (round-3 CRITICAL correction).** The all-text-recursive drop-segment (§6 G7) handles the literal PATHS. But `scripts/lib/subpath-policy.mjs` carries GENUINE two-tier SEMANTIC logic — `TIERS=[{tier:"ui",relBase:"src/components/ui",classMap:UI_CLASS},{tier:"custom",relBase:"src/components/custom",classMap:CUSTOM_CLASS},…]`, `classifyTier(tree.ui,UI_CLASS)+classifyTier(tree.custom,CUSTOM_CLASS)`, the `publishUi`/`publishCustom` collision loop. A blind textual drop collapses both `relBase`s to identical `src/components`, double-scans the flat 91 families, marks 48 unclassified, and reports ~91 spurious collisions (breaking `proof:subpath-classify`, `proof:build`, `regen-exports`, `regen-structure`). The pass MUST collapse the two-tier model to a two-set model — `{relBase:"src/components", classMap:CLASS}` with `CLASS={...UI_CLASS,...CUSTOM_CLASS}` — the merge is DETERMINISTIC (UI_CLASS 43 keys + CUSTOM_CLASS 49 keys overlap on exactly ONE key `tabs`: UI `INTERNAL` (reka substrate) vs CUSTOM `PUBLISH` (SegmentedTabs); custom-wins → `tabs=PUBLISH`, 91 total keys — the settled flat family count). CODEMOD-SPEC §2.4's claim "no gate branches semantically on ui-vs-custom" is REFUTED and must be corrected.
- **The `tabs` name-collision.** `comm -12` over the ui/custom dir-name sets returns exactly `tabs`. Reka `ui/tabs` (1 internal importer, `DockLayerGroup`) vs SegmentedTabs `custom/tabs` (12 importers). **Ruling: `ui/tabs → components/tabs/reka`** — reka nested as a named sub-component group (§2.3), a one-entry override BEFORE the uniform segment-drop; `DockLayerGroup` repaths. `components/tabs/` holds `SegmentedTabs.vue` + `composables/` + `constants.ts` + `index.ts` + `README.md` at root, `reka/{Tabs.vue,…}` nested. This aligns with the subpath-policy `tabs=PUBLISH` merge.
- **The dead `ui/index.ts` aggregate barrel is DROPPED** (ZERO real importers; `src/index.ts` re-exports each package explicitly). Clean break. No `components/index.ts` exists pre- or post-flatten.
- **Domain map lives in a MACHINE-LOCKED `components/README.md`** — a `proof:claude-structure-sync`-pattern gate asserts every COMPONENT `components/*` dir appears in the map and vice-versa. **Non-component `components/*` peers are domain-map-EXEMPT:** `_shared/` and `PROCEDURAL-SUITE.md` sit at `components/` root; the gate roster is restricted to README-bearing COMPONENT dirs (the exemption list explicit in the gate).
- **The flat-namespace legibility trigger (decidable, not a vibe).** The DEFAULT is FLAT + gated README (reka-77-flat precedent). A LIGHT physical domain sub-grouping (form/overlay/viz/feedback/…) is adopted IFF the execution census trips: **>60 flat peers AND ≥1 domain family with ≥5 non-adjacent members** (the measured driver is the 9-member procedural-viz family — aurora/concentric/constellation/dot-flow-field/dot-matrix/fourier-field/goo-blob/goo-filter/liquid-grid — scattered across the alphabet). At 91 peers with a 9-member scattered viz family the bar IS tripped, so a light `viz/` sub-group is the likely execution outcome; the final flat-vs-grouped call is the census's, but it is a METRIC, not a vibe. The sub-group set is ratified at execution.
- **No provenance markers** (greenfield-no-meta). **Export surface stable, INTERNAL churn large.** package.json `exports` untouched (0 keys). Final: **91 flat peers** (43 ui + 49 custom − 1 tabs merge − 1 dead barrel).

### The residual proportion pass the flatten enables
`timeline/` (2274L, `geometry.ts`→`composables/`), `configurator/` (`useConfiguratorState`→`composables/`), the 500-breachers (`useGlassBackdropLuminance` 554, `DockLayerGroup` 524, `GlassDock` 515) carve by cohesion (BG.W-CUT's live-engine drain owns these — ORTHOGONAL to the flatten, delta=0), `labeled-field`'s 5 wrappers collapse to one generic.

---

## §4 The demo/application grammar

TWO archetypes on ONE feature-slice spine. **§4-STORYBOOK** (story-driven library demo) and **§4-PRODUCT** (a router/store/backend-bearing consumer app). Both are the same `component-folder + local-until-shared + recursion-resets-depth` grammar; they differ only in the top-of-tree layers a router-driven app earns. §4-PRODUCT is ~85% a description of speedtest's live tree — the skeleton DOCUMENTS the convergent-in-practice shape, not a new taxonomy.

### §4-STORYBOOK — the story archetype

#### §4S.1 The fixed skeleton
```
<app>/
  App.vue · main.ts · router.ts
  shell/                       # app chrome (AppShell + nav docks + shell composables + shell CSS)
  chassis/                     # demo-private PRESENTATION primitives (content COMPOSES, never re-authors)
    subtype/                   # the closed presentation-subtype taxonomy (§4S.4), its own dir — WHEN EARNED
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
A demo mints a CLOSED presentation-subtype taxonomy (stage / specimen / interaction / matrix / composition) in its own `chassis/subtype/` dir **ONLY above a complexity floor** — a demo with **≥ ~20 stories OR ≥2 categories needing the taxonomy**. A small sibling demo keeps flat chassis primitives (the taxonomy dir would be imposed ceremony — the needless-encapsulation vice). glass-ui's rich demo earns the dir; slides' thin deck does not.

#### §4S.5 God-SFC escalation
A story tripping the ratchet becomes a feature dir (the aurora model). Symmetric across a family: `blob.vue` (875L) + `constellation.vue` (759L) → feature dirs like their sibling `aurora/`.

#### §4S.6 The barrel-vs-deep-path idiom
**Deep-path for demo-private SFCs** (no external surface; the barrel is ceremony); **index barrel for anything a sibling app consumes.** Drop vestigial `chassis/index.ts` if unused.

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
  composables/  types/  utils/
  styles/                                  # the app-global design layer
<app>/server/ | backend/ | functions/ | workers/   # the peer backend workspace (§5, NOT under src/)
```

#### §4P.2 `views/` is the canonical route-layer name (recorded FSD divergence)
All four apps name route-bound components `views/`. FSD's canonical name is `pages/`; the constellation uses Vue-native `views/`. A view holds route-BOUND components ONLY (one per router record, `<Name>View.vue`); a THIN composition wiring a feature barrel to a layout, NEVER domain logic. Clean-break: no `pages/` alias. **`views/` NEVER folds into a feature slice** (§4P.5).

#### §4P.3 router FILE→DIR by T4 proportion
`router.ts` (a bare route table — slides' 7-line `createRouter` + 3 lazy routes) until it EARNS `router/` (index.ts + navigation guards + `typed-routes.d.ts` + per-domain route modules ≥2 — speedtest/words). No premature `router/` dir for a 3-route deck.

#### §4P.4 The `api/` FE transport-leaf infra-ring
`api/` = ONE `client.ts` transport kernel (auth headers + `apiFetch` wrapper + token — canonical name **`client.ts`**, reconciling words' `core.ts`) + per-resource modules named by DOMAIN RESOURCE (`dashboard.ts`, `sessions.ts`, `surveys.ts`) + `types.ts` envelopes + optional domain subtrees + an explicit-named-re-export `index.ts`. UNIDIRECTIONAL, the architectural LEAF: `views/ → stores/ → api/ → client.ts`; `api/` NEVER imports upward. The FE twin of the §5.1 backend infra-ring — auth/error policy lives ONCE in `client.ts`. A full feature slice with its OWN api gets `features/<x>/api/`; a resource used by ≥2 unrelated view-families stays app-global (T3). Machine-enforced by `proof:import-boundaries` scope-extended to the product 4-node DAG (`api → stores → views/features → app`) — speedtest already ships `check-internal-boundaries.mjs` as the precedent to unify.

#### §4P.5 The domain-graduation predicate (the sharpest §4-PRODUCT law — the scatter fix)
A domain is a `components/<domain>/` GROUP by default. It **GRADUATES to a full `features/<domain>/` slice when it acquires a presence in ≥3 app-global FOLDABLE layer dirs OR its own engine/state/domain-logic** — because at that point the app-global layers have become layer-by-type SCATTER for that domain.

**The foldable layer set — `views/` removed from the trigger.** The graduation TRIGGER counts presence across the FOLDABLE app-global dirs `{components/, stores/, api/, composables/}`. `views/` is NOT in the trigger set: a domain having its own views SUGGESTS a slice but views NEVER FOLD (§4P.2), so counting them double-counts a non-foldable axis. A domain with views but <3 foldable-dir presence stays a GROUP; its views stay in app-global `views/`.

**The fold-set.** On graduation the scattered pieces fold into `features/<domain>/{ui, state, api, composables, lib, config, constants, types, index.ts}`. **Per-leaf T3 decides each:** a `config/survey.ts` that is survey-OWNED folds into `features/survey/config/`; a config module ≥2 domains share stays app-global `config/` (§4P.8). Same rule for `constants`/`types` — domain-owned folds, shared stays app-global. This resolves the round-1 `config/survey.ts` contradiction by making it a per-leaf T3 count.

Live targets (speedtest): `admin` (17 files across 4 foldable dirs) GRADUATES; `dashboard` (31 files across 4) GRADUATES; `survey` (own `composables/`+`utils/`+`index.ts`, 90% a slice) GRADUATES; `speedtest` is ALREADY correctly graduated. This is T3 at the domain grain.

**`features/` is a PROPORTION-EARNED escalation, NOT a mandatory tier.** slides (a 7-line-App.vue deck viewer, no stores) has NO `features/` dir — minting empty slices is atomization. Only a GRADUATED domain earns `features/<x>/`. The feature INTERIOR is by-purpose segments + a boundary `index.ts` barrel that is the SOLE cross-feature entry (speedtest doctrine verbatim). This IS §2.1's barrel-only rule + §2.3 recursion, transposed to the product-app domain.

The graduation gate goes born-RED on `admin`/`dashboard` only AFTER the cheapest speedtest domain (`survey` — already barrel-bearing) is PROTOTYPE-folded to confirm the fold typechecks + `proof:import-boundaries` greens + the per-route bundle delta (an execution sub-wave, §9).

#### §4P.6 The Pinia T3 split (feature-state colocates, app-global promotes)
A store owned by ONE feature slice lives at `features/<x>/state/`, reached cross-feature ONLY through the feature barrel. A store used by ≥2 unrelated view/feature families (auth, session, api-cache, app-variant, journey) promotes to app-global `src/stores/`. A domain store CLUSTER gets a `stores/<domain>/` subtree; Pinia plugins get `stores/plugins/`. One store per file. A `stores/<domain>/` subtree co-occurring with the ≥3-foldable-dir signal graduates (its stores fold into the slice); a cluster SHORT of the signal is a legitimate app-global grouping.

#### §4P.7 `styles/` is the app-global design-layer name (clean-break rename of `design/`)
The library's app-global style home is `src/styles/`; a consumer's thin design layer has no grounds for a different name. speedtest's `design/` renames to `styles/` with NO content loss — `tokens.css`/`register.css`/`motion.ts` stay; `MOTION-DOCTRINE.md` moves to `docs/`. One name, no alias.

#### §4P.8 `config/` is the presets-in-consumers home (file→dir by proportion)
A single `site.config.ts` FILE until ≥2 config modules earn `config/`. `config/` holds app-global STATIC config + the consumer's named glass-ui PRESET registries (speedtest `auroraConfig.ts`) + deployment registries (`variants.ts`). A DOMAIN-owned config module folds into that domain's slice on graduation (§4P.5 per-leaf T3); only ≥2-domain-shared config stays app-global here.

#### §4P.9 NO root-shell god-SFC exemption — App.vue OBEYS the 500 ceiling and carves
The app root's job is THIN: mount `<RouterView>`, install app-global providers, host persistent chrome. Provider/substrate wiring carves to `composables/useAppProviders.ts`; layout switching to `layouts/`; persistent chrome (a 774L `Dock.vue`) to `components/dock/`. Interim over-ceiling uses the house RATCHET — NOT a permanent exemption. slides' 7-line `App.vue` is the target.

#### §4P.10 `layouts/` app-global route-frame chrome
`layouts/` holds the route-chrome wrappers that frame `<RouterView>`. A layout is cross-cutting by nature so it is app-global at `src/layouts/`, NEVER colocated into a feature.

#### §4P.11 The entry pair — the bootstrap CONCERN, not the `main.ts` FILE
The invariant is the BOOTSTRAP CONCERN (`createApp` + install router/Pinia/app-global providers/dark-cascade + mount) + a thin root `App.vue`, beside `router(.ts|/)`. **The concern is named, not the file:** speedtest has NO `main.ts` — its bootstrap is inline in `index.html` for LCP, a LEGITIMATE placement of the same concern. The gate asserts the bootstrap concern exists and is thin (whether in `main.ts`, `index.html`, or a named bootstrap module), never a specific filename.

#### §4P.12 The FSD-divergence ledger (constellation-native names, deliberate)
A **PROPORTION-COLLAPSED FSD**: `app (bootstrap/App) → views → features/components → shared (stores/api/composables/styles/config)`. Route layer = `views/` (FSD `pages/`); hooks = `composables/` (FSD `hooks/`); feature dir = `features/` (FSD `features/`+`entities/`+`widgets/` collapsed by proportion). Unidirectional imports preserved; the 6-layer tower flattened to what the app earns.

---

## §5 Backend transposition (language-abstracted)

### §5.1 The grammar (identical shape to frontend)
- **Domain/feature PACKAGE** = the backend component folder. Named by DOMAIN, not technical layer.
- **By-PURPOSE segments:** `api/` (routes/handlers — transport edge), `model/` (domain types/data/rules), `lib/` (pure helpers). Colocate handler + model + logic FOR one domain TOGETHER.
- **Shared home** (`shared/`, `core/`) ONLY for truly-global — the ≥2-unrelated-DOMAINS bar (T3).
- **Reject layer-by-type of DOMAIN LOGIC.** `controllers/ + services/ + models/` as app-global dirs scattering one domain across type-folders is the vice (group vertically). **Live target: `speedtest/server/src/` (routes/services/middleware/validation/utils layer-by-type) is a §5 reshape target.**
- **The infra-ring carve — with FIXED constants.** A thin CROSS-CUTTING infrastructure ring that runs on EVERY domain is NOT the scavenger-hunt vice; it is the backend twin of the FE `_shared/` / the `api/client.ts` leaf. The two constants are FIXED so the verdict is reproducible across siblings:
  - **Scatter threshold:** a type-named dir (`services/`, `routes/`, `validation/`) holding modules from **≥2 distinct domain stems** IS layer-by-type scatter → dissolve file-by-file (domain rules → the domain; shared helpers → the infra ring). A type-named dir holding **≤1 domain stem** (or purely infra) is not scatter.
  - **Infra-ring CRITERIA:** a module is infra-ring IFF it is (a) cross-cutting (runs on EVERY domain), (b) carries NO single domain's business rules, (c) is a thin adapter/kernel/policy. Seed allowlist (extend per-repo, criteria-gated): `middleware/`, `logging/`, `events/`, a transport `core/`/`http/` kernel, a uniform repository/model base, `config/`, `paths/`, error/exception policy. `proof:backend-structure` (§6 G9) carries this criteria set + the ≥2-stem threshold as gate constants.
- **The shared-types carve (the TYPE-analogue of the infra-ring).** "A domain's OWN types severed from its logic" (fold INTO the domain — the layer-by-type vice) vs "a schema registry ≥2 domains genuinely share" (STAYS shared). floridify `models/` (126 importers) is the driver: blind T3 dissolution shreds it into 8 domains behind 126 rewrites — the "shredded not beautiful" failure. Rule: a type module read by ≥2 unrelated domains is a shared schema registry → keep shared; a type module read by ONE domain folds into that domain. Same ≥2-domain-stem count.
- **The orchestration / use-case tier.** A cross-domain PIPELINE that COMPOSES ≥2 domains (floridify `lookup_pipeline.py` composes 5) is neither a single domain (can't colocate) nor layer-by-type scatter (genuine composition). It lives in a `pipelines/` (backend) / app-service tier next to the composition root, importing domain barrels DOWNWARD only (unidirectional). The FE twin is `views/`.
- **No grab-bags.** A `utils.py`/`helpers.go`/`common.ts` of unrelated leaves is a god-module (named-cohesive leaves like `logging.py`/`config.py`/`paths.py` are NOT a grab-bag).
- **Depth (T2), import discipline, recursion** — identical: unidirectional (`shared → domain → pipelines/app-entry`), no cross-domain imports except via a package's public API, long dirs break into sub-modules.

### §5.2 Per-language befitting notes
| Language | Module ceiling | Function norm | Idiom |
|---|---|---|---|
| TypeScript (backend) | 500 raw | short, cohesive | ESM subpath exports; `import type`; barrels per package. `proof:*` god-function advisory booked (no ESLint). |
| Python | 500 raw hard / ~300 soft | Google ~40-line funcs | package = domain dir with `__init__.py` public API; `model.py`/`api.py`/`lib/`; no `utils.py` grab-bag; ruff `C901`/`PLR0915` for the god-FUNCTION advisory. |
| Go | 500 raw / package-per-domain | short | one package = one domain; `gofmt`; exported identifiers ARE the public API. |
| Rust | 500 raw / module-per-domain | short | `mod.rs`/`lib.rs` re-export = the barrel; `pub` = public API; a private `mod` makes guts UNREACHABLE and an import cycle a HARD ERROR — unidirectionality is a COMPILE invariant, not merely a gate. |

The NUMBER is per-language; the GRAMMAR (domain-vertical, by-purpose segments, promote-shared-at-≥2, shallow depth, no grab-bags, infra-ring + shared-types + pipelines legitimate) is constellation-wide. **The file-length ceiling is a GATED arm per language (§6 G9), not prose.** G9 is RATIFIED + wired (round-3): `--self-test` 9/9; the two directive-required arms present — the per-language `wc -l` ceiling (G-BE1) + the per-language import RESOLVER (G-BE4b, keyed python `from X import`/rust `use ::`/ts `from "…"`). Live-backend reproduces §5.2 exactly: floridify 47 violations (`caching/manager.py` 833, `search/engine` 1187, …), speedtest/server 4 (routes/ 10 stems, services/ 5, validation/ 9, + a middleware→routes upward leak), dns-speedtest 2 (negative control), greenfield-rs/pulse GREEN (clean by construction on a Rust service).

---

## §6 Enforcement — how the `proof:*` gates evolve

The house machine-locks structure (`proof:colocation`, `proof:no-god-module`). The spec EXTENDS them — no parallel regime — and **every new gate is a device-free `proof:*` script with self-test bites, NOT ESLint** (zero ESLint config/dep repo-wide). All frontend gates (G1/G3/G4/G6/G7) AND the backend gate (G9) are now PROTOTYPED in `proto-gates/`, born-RED on HEAD, self-tests firing.

**G1 — `proof:colocation` extends (the FOLD end).** KEEP the README-marker binding. ADD the **globality clause (T3)**: INCLUDE composition edges + demo/sibling usage, EXCLUDE within-family DI + root-barrel/aggregator re-exports + discovery-layer type re-exports, PROMOTE a ≥2-foreign-read DI context; the overriding rule ships as self-test bites (a `morphSignatures` sibling-shared bite; the root-barrel-published-single-family FOLDS bite; the `dockContext` ≥2-foreign-read PROMOTES bite). ADD the **no-empty-segment clause (T4)**. SCOPE-EXTEND to `demo/`. *(Prototyped: `proof-colocation-globality.mjs`, 6/6, born-RED FOLD-census.)*

**G2 — `proof:no-god-module` unifies across `.ts`/`.vue`/`.css`** (shader-literal + data-manifest + **extracted-SFC-style T1b** exempt), ONE `HARD_LIMIT=500` RAW, a `~300` advisory soft-target (warn). The `.vue` arm counts `<template>+<script>+<style>` RAW; a cohesive SFC breaching on `<style>` mass fixes via T1b extraction (not ratchet-forever) and the extracted CSS is counted as a CSS file. The CSS arm is a cohesion-carve BOUND by the byte-identical fence + source-order preservation — closes the blind spot where `ladder.css` 510 / `surfaces.css` 508 / `shell.css` 524 breach 500 uncounted.

**G3 — `proof:depth` (new):** the T2 cap — no segment dir under a segment dir (unless the inner carries an `index.ts` → recursion reset); depth beyond ≤5 below the nearest feature/component root needs a recorded rationale. *(Prototyped: `proof-depth.mjs`, 5/5.)*

**G4 — `proof:import-boundaries` (new — the PROMOTE end).** The 4-node DAG; subpath-entry reaches both directions; `composables/` never reaches `components/` (except the `export *` aggregator carve); no cross-component GUTS reach; one-barrel public API with the deep-leaf subpath exemption (B4). **Born-RED on HEAD with 25 cross-component guts reaches** (round-3 re-measure). **The DI-context sub-ruling:** a cross-component reach into a `createStrictContext`/`createOptionalContext` module module-path-imported by ≥2 FOREIGN families is classified DISTINCTLY from a buried non-DI primitive — resolution is PROMOTE-to-`composables/context/` (not barrel-route), and the gate names the shared-context target. Self-test bites (11/11, round-3): a `composables/`→`components/` edge REDs; the aggregator `export *` PASSES; a subpath-entry deep-leaf re-export PASSES; a cross-component guts reach REDs; a **≥2-foreign DI-context reach flags PROMOTE-to-context, DISTINCT from the guts-primitive bite** (proven decidably distinct on LIVE data — the 5 `dockContext` reaches → DI verdict naming `composables/context/`; `Slider→useDockHold` → generic buried-primitive verdict); a component reaching its OWN guts / composing a sibling via barrel PASSES; a component reaching the subpath-entry sink REDs. The ONE standing HEAD backward edge (`composables/index.ts → infinite-scroll/composables`) is the named colocation-exception allowlist entry — the gate ships born-RED on the 25 guts reaches, not on this seam. Scope-extends to the product-app DAG (§4P.4). *(Prototyped: `proof-import-boundaries.mjs`, FAIL on HEAD by design.)*

**G5 — location-vs-publish orthogonality:** physical location by G1's family clause; publish surface by the SCC/heavy-peer discipline. A colocated PUBLIC composable is never flagged for being public.

**G6 — the CSS pair (§2.6):**
- **`proof:css-colocation` (new, TARGET gate):** every colocated `components/<n>/styles/*.css` flattens to a UNIQUE `dist/styles/` target (no clobber); subdir partials stay within `styles/`; the build's component-styles walk reaches every `src/components/**/styles/` dir; a golden sorted-hash manifest of the shipped `/styles` reds any byte drift; **the SOURCE-@import arm asserts no `index.css` @import dangles at SOURCE** (the dev-HMR resolver from §2.6 is present + resolving — the DIST-only proof gap closed at the gate); a synthetic un-rewritten escaped @import born-REDs; the **T1b-walk convention** is asserted (the walk copies ONLY index.css-referenced sheets; an SFC-`<style src>`-extracted file is NOT double-emitted into `dist/styles/`).
- **`proof:css-ownership` (interim/cross-coupled):** every component-specific `src/styles/*.css` that STAYS global names its single owner via a `README OWNER:` header resolving to a real component dir (`icon-chip.css` is the one standing case). *(Prototyped: `proof-css-ownership.mjs`, 5/5, born-RED until OWNER: headers land.)*

**G7 — the enforcement-corpus migration meta-gate (`proof:no-tier-literal`) — SHIPPED (round-3).** After the flatten wave, assert ZERO surviving `components/(ui|custom)/` literal in `scripts/`. **The scan is all-text-extension + recursive** (round-3 double-correction): {`.mjs,.js,.cjs,.mts,.cts,.ts,.vue`}, node_modules/.git excluded, skip-self by realpath — because scripts/ is NEITHER typechecked (`tsconfig.build.json` include=`[src/]`) NOR test-resolved (vitest globs only `*.{test,spec}.ts`), so G7 is the SOLE structural witness and a `.mjs`-only or top-level-only scan false-greens (18 hide in `scripts/{aurora-profile,lib,fixtures}/` subdirs; 16 more in `wf-*.js` + a live `.vue` test fixture). Detector = `/(?:@glass\/)?components\/(ui|custom)(?=[/"'`)\s]|$)/g` (slash / bare-segment-terminal / @glass-alias forms; the lookahead spares `components/custom-hook`). Born-RED at **865 across 229 files at HEAD `c3621f08`** (a WITNESS figure that DRIFTS as gates land — the PASS/FAIL is purely `survivors===0`, never a threshold). Self-test 9/9 incl. the REQUIRED anti-evasion recursion bite (a nested-subdir `.js` literal is caught + subdir-attributed) + a realpath skip-self bite. Register `["local","ci"]`, device-free. **The gate AND the flatten codemod MUST share ONE comprehensive all-text-recursive file-set** — a `scripts/*.mjs`-only codemod glob leaves 33 dead literals (11 files) → G7 can NEVER reach GREEN; the widened pass drives it to 0. The flatten codemod (re-root `proof:colocation`, drop-segment the literal paths, rewrite RATCHET keys, `ui/tabs→tabs/reka` override, **+ the ONE subpath-policy semantic rewrite §3**) lands ATOMICALLY in the same wave — the ORDER is load-bearing (a moved family silently exits `proof:colocation` coverage while the gate stays exit-0 if the re-root does not land first). *(Prototyped: `proof-no-tier-literal.mjs`, born-RED 865, 9/9.)*

**G7-companion — the post-flatten CLOSE BATTERY (round-3 CRITICAL).** G7-GREEN (0 literals) is NECESSARY but NOT SUFFICIENT for atomic-migration soundness. The uniform textual drop BREAKS `subpath-policy.mjs`'s two-tier semantic logic (§3) — G7 stays green (0 literals survive) while `proof:subpath-classify` / `proof:build` / `regen-exports` / `regen-structure` red. The close battery for the flatten wave MUST run `proof:subpath-classify` + `proof:build` (the semantic-soundness consumers), not only the structural literal witness. The round-2 §4 close (typecheck/colocation/no-god-module/no-tier-literal + 3 substrate gates) never ran the subpath-policy consumers — the breakage was never surfaced.

**G8 — constellation propagation:** gate SCRIPTS live per-repo (each sibling carries the transposed set); the SPEC (this doc, promoted to the precepts submodule) is the single source.

**G9 — `proof:backend-structure` (new — the edict-6 enforcement) — RATIFIED + WIRED (round-3).** The backend twin of G2+G4, language-abstracted (detect language from the manifest: `pyproject.toml`→python, `Cargo.toml`→rust, `package.json`→ts, `go.mod`→go). Six arms: **(a) file-length ceiling** (`wc -l`, hard 500 raw / soft 300 — the gap G2 left backend, the single most important backend correction); (b) grab-bag detection (with the cohesive-leaf carve); (c) layer-by-type-of-domain-logic (the ≥2-distinct-domain-stem threshold); (d) depth (T2); (e) import-direction — a per-language RESOLVER (python `..`-arithmetic, rust `crate/super`, ts relative), the §5.1 unidirectional invariant + the `api.core.exceptions` precision fix; (f) god-FUNCTION advisory (ruff `C901`/`PLR0915` on python). Self-test 9/9 incl. anti-evasion (renamed `common.py`) + 3 legit-shape negative bites (clean `core/`, cohesive `config.py`, clean-search no-false). Born-RED on floridify (47) + speedtest/server (4) + dns-speedtest (2, negative control); GREEN by construction on greenfield-rs/pulse. *(Prototyped + wired: `proto-gates/proof-backend-structure.mjs`, 427 lines, `--self-test` exit 0.)*

**G10 — `proof:no-glass-in-dist` (new — the src-stays-relative permanent lock, round-3).** Assert ZERO `@glass` specifiers in `dist/*.d.ts`. glass-ui ships NO dts-alias resolver (verified: no `tsc-alias`/`rollup-plugin-dts`/`api-extractor` in `package.json`; `emit-types` = `vue-tsc` + `flatten-subpath-types.mjs`'s naive `../→./` text rewrite, which does NOT resolve `@glass`). TypeScript's declaration emit preserves import specifiers as-written, so ANY src file on `@glass` would emit unresolvable `@glass/composables/…` into the SHIPPED types — a highest-severity publish defect. This gate born-REDs the instant any future wave migrates a src file to `@glass` without a (rejected) dts-rewrite step — the mechanical witness that closes the src→`@glass` question permanently (§7). Register `["ci","release"]`.

---

## §7 Migration posture — clean break, gestalt transposition

- **No legacy, no aliases.** The flatten, the FOLD/PROMOTE/PROMOTE-context reshape, the CSS physical colocation, the demo tri-partition, the §4-PRODUCT graduations are MOVES — position-preserving where the byte-identical-carve applies, gestalt-reshaping where structure demands. No compat shim survives a fold.

- **The named migration instrument (the HYBRID — RESOLVED, round-3). `@glass` is the CROSS-PUBLISHED-BOUNDARY / consumer alias (demo, tests, scripts, siblings — leaf trees with no dts obligation); the PUBLISHED `src` tree stays RELATIVE (dts self-containment + within-atom colocation cohesion).** This is the aristotelian mean for the alias itself: `@glass` earns its keep exactly where there is no dts tax; `relative` earns its keep exactly where colocation + published-dts-cleanliness live.
  - **src (all-relative, `@glass` 0×): resolve-and-recompute, SCOPED to the 568 flatten-VARIANT specifiers** (360 into shared modules, 208 tier/subpath); the 1218 flatten-invariant re-emit byte-identical. `newSpecifier = normalize(relative(elide(dirname(F)), elide(resolve(dirname(F), S))))` — needs NO module resolver; typecheck exit 0, zero TS2307.
  - **demo AND tests (`@glass/components/{ui,custom}/*` absolute alias): segment-drop** (521 specifiers: 398 demo + 123 tests; zero depth arithmetic; the alias UNTOUCHED). Tests ride `@glass`, NOT relative — grouping tests with the src relative pass would SKIP the tests mirror (the broken half-migration the spec names fatal). The 1 residual relative-into-src (tests) sweeps to `@glass` for a 0-residual invariant.
  - **scripts (recursive, all-text): one uniform `dropSegment` PLUS the ONE `subpath-policy.mjs` semantic rewrite** (§3) — landing atomically (G7 + the close battery).
  - **The move-map is `{src/components (recompute-568), demo (segment-drop), tests (segment-drop), scripts (segment-drop + 1 semantic rewrite)}`.** The migration instrument MUST scan BOTH the relative specifier space (src) AND the `@glass` alias space (demo/tests/scripts) — the `dockContext` promote proved a relative-only sweep misses the 3 `@glass` test specifiers.

- **REJECTED: the src→`@glass` whole-tree re-open (adjudicated, round-3).** The round-2 [R3] proposal to move src ALSO onto `@glass` (making the whole flatten a uniform segment-drop, retiring resolve-and-recompute) is REJECTED. **Decisive blocker:** src→`@glass` LEAKS `@glass` into the PUBLISHED `.d.ts` (no dts-alias resolver exists; declaration emit preserves specifiers as-written — verified live, 0 `@glass` in dist/*.d.ts today, but the dist tree-mirror already carries the deep `from '../../../../composables/color'` specifiers that WOULD become unresolvable `@glass/composables/…`). BH.B2.0 is a CATEGORY-ERROR precedent: demo/tests/scripts are LEAF consumer trees (never published, never emit `.d.ts` — pure depth-decouple win); src is the PUBLISHED library whose `.d.ts` IS a public artifact. The "279-file proven precedent" proves `@glass` for CONSUMER trees, not the published SOURCE tree. The counter-option (build a permanent per-build dts-rewrite step) is rejected by proportion: permanent machinery + a new highest-severity failure surface to eliminate only a RARE one-time post-flatten churn is the needless-encapsulation vice. Locked permanently by G10 (`proof:no-glass-in-dist`).

- **Chunk-graph churn — ALL classes now MEASURED (round-3 completes the [R3] gap).**
  - **The FLATTEN is +0 gzip** (entry-count-preserving; `libraryFileName` keys dist filenames on the ENTRY NAME, decoupled from source path — `vite.library.ts:58-59`).
  - **The FOLDS are +29 gzip** (the two folds add +14/+13 to their D5-EXEMPT shared chunks; every other chunk byte-identical).
  - **The PROMOTE-primitive class is BYTE-NEUTRAL** (measured A/B `vite build`, 190→190 chunks, 414001→414001 gzip, ZERO rehash): `budget.ts` is fully constant-folded (no output module to relocate), the `procedural-color` twins already co-bundle into one Rolldown chunk, and Rolldown's basename+content-hash chunk-naming is path-independent.
  - **The PROMOTE-context class is a per-route WIN** (measured): the lean-leaf `dockContext` promote strips the incidental `dock/constants.ts` drag (a 17-export module) out of the 5 foreign component chunks — **−327 gzip on EACH of the 5 foreign routes** (Slider/Select/Popover/DropdownMenu/HoverPopover); the dock route nets −122 gz; `dock/constants` is NOT duplicated. **"Performance above all" is SATISFIED — the reshape STRENGTHENS the perf posture.** A DI context buried in a heavyweight component silently taxes every foreign consumer with the host's module-scope payload; the promote is the fix.
  - **The lone cost is content-hash CHURN** — 6 chunk filenames rehash on the release that ships the dock-tail promote (a one-time CDN/browser cache-bust, NOT an ongoing weight). `profile:budget` MUST compare per-chunk sizes by BASENAME (hash-stripped), not by hashed filename, so the rehash does not false-RED as a size regression — confirm/rebaseline the gate's keying before landing.
  - **The execution constraint (all folds/promotes):** the root-barrel/subpath-entry re-export MUST target the deep composables leaf, NEVER the component barrel (which would drag SFCs onto the eager graph); the DI-context promote targets `composables/context/` (SFC-free) AND relocates the DI-key literal (`DOCK_CONTEXT_LABEL`) INTO the context leaf so the leaf carries ONLY {InjectionKey, types, helper pair} with NO `dock/constants` edge — that leanness IS the mechanism of the −327 gz/route win; a promote that leaves the label behind is either illegal (G4-RED, a `shared→component` up-reach) or weight-forfeiting.
  - *(Caveat: `profile:budget` is ALREADY RED at HEAD on PRE-EXISTING causes — goo-blob ceiling breach + stale AP D5 baseline — owned by the BG close-battery, ORTHOGONAL to the reshape.)*

- **Zero PUBLIC-EXPORT churn** (the `@mkbabb/glass-ui/*` subpath surface is `src/*.ts` entry files, untouched; 0 package.json keys) + the internal file rewrites + scripts + ~91 dir moves. Honest, not asserted-away.

- **Whole-tree, not incremental.** Edict 8 is the cadence.

- **Sequencing:** this reshape is a `src/` + `demo/` + `tests/` + `scripts/` + build-plugin write-set; sequences AFTER the owning BG waves per the BH interleave, lands in the joint 5.0.0 cut. The CSS build-plugin extension + dev-resolver (§2.6), the graduation folds (§4P.5), and G7/G9/G10 land as gated execution sub-waves with born-RED proofs. The `/api` drop is orthogonal.

---

## §8 Settled matters (restated, NOT reopened)

1. The 500-line no-god-module ratchet exists, drains to ∅, counts **RAW lines**, and has NO permanent length exemption — only shader-literal + data-manifest + extracted-SFC-style single-artifact carves (§1.3). The spec unifies its file-type coverage (§6 G2) and adds the backend length gate (§6 G9).
2. `proof:colocation` exists (4 clauses). The spec extends it (§6 G1); the clauses stand.
3. The ≥2-consumer visual-load-bearing invariant (J-inv-10) is the promotion bar; generalized to non-visual leaves (T3) with a decidable count running THREE placement cases — FOLD, PROMOTE-primitive, PROMOTE-context (§1.5).
4. The SCC / heavy-peer publish discipline is preserved and ORTHOGONAL to physical location (§2.5, 4-node DAG). Publication is a publish-signal, not a location-signal.
5. The clean-break / no-back-compat law, presets-in-consumers, byte-identical-carve are the migration constitution (§7).
6. The load-bearing `index.css` cascade order (@layer + source-order ties) is INVIOLATE; CSS colocation keeps a byte-identical PUBLISHED cascade via approach (i) — the SOURCE @import targets change to real colocated paths, resolving under HMR (§2.6, PROVEN round-3).
7. `subpaths/` glob-batch generation is an accepted mechanical exception — kept.
8. The Vue `composables/` essence-name is a deliberate, recorded divergence from FSD — kept (§2.4); `views/` (not FSD `pages/`) is the parallel product-app divergence (§4P.2). `composables/context/` is the DI CONTRACT home (factory + promoted contexts + their contract types, §2.4).
9. FLATTEN `ui`+`custom` is settled (edict 5, §3); the codemod is proven executable; `ui/tabs → tabs/reka` is the sole non-uniform component case; the `subpath-policy.mjs` two-set merge (`tabs=PUBLISH`) is the sole non-uniform SCRIPT case; `@glass` is the CONSUMER-tree alias (demo/tests/scripts), src stays RELATIVE (§7).
10. `src` stays RELATIVE (dts self-containment, G10). The migration instrument is `{src recompute-568 / demo,tests,scripts segment-drop}` scanning BOTH specifier spaces.

---

## §9 The execution-carve ledger (decisions made; mechanics to encode)

No **[R3]** DESIGN question remains. These are named EXECUTION carves — the codemod/gate mechanics the reshape wave encodes, each with a settled ruling:

1. **The T1b/§2.6-walk double-emit convention (RULED, §1.3/§2.6):** the component-styles build walk copies ONLY index.css-referenced cascade sheets; an SFC-`<style src>`-extracted scoped file rides the SFC fold pipeline and is skipped. Encode the predicate; assert it in `proof:css-colocation`.
2. **The barrel-vs-deep-leaf discipline for the 360 shared-module reaches (CARVE, §2.5):** many src flatten-variant reaches enter a shared module PAST its barrel (`from '…/composables/glass/webgl/shaders/procedural-color.glsl'`). The default is route cross-MODULE reaches through the module's public barrel (`composables/glass/index.ts`), BUT shaders legitimately reach specific `.glsl.ts` leaves — so a blanket "always barrel" rule needs a shader-leaf carve. Ruling: the recompute preserves the existing reach depth (no forced re-barrelling in the flatten wave); a separate barrel-discipline census is a distinct, later proportion pass, NOT a flatten prerequisite.
3. **The subpath-policy semantic rewrite (RULED, §3/§6 G7-companion):** collapse `TIERS` two-tier → a two-set model with `CLASS={...UI_CLASS,...CUSTOM_CLASS}` (`tabs=PUBLISH`); the close battery runs `proof:subpath-classify` + `proof:build`.
4. **The `scripts/` god-dir disposition (NAMED, §5-grammar applied to the enforcement corpus):** `scripts/` is 498 text files; the 37 tracked `wf-*.js` completed-tranche workflow scripts + the `_reflect-*/_reshoot-*` one-shots are exactly the long-running-dir accumulation edicts 4+7 target. Ruling: they get a `scripts/tranche-history/` home OR a no-legacy prune (a §5 disposition call), orthogonal to G7's literal scope but the natural next-tier concern the 498-file dir raises. G7's file-set marginally shrinks if the 7 literal-bearing `wf-*.js` are pruned; the live `.vue` fixture forces `.vue` coverage regardless.
5. **The `profile:budget` basename-keying confirm (§7):** confirm the gate keys baselines on stable basename/subpath keys (not hashed filenames) before the 6-chunk PROMOTE rehash lands; rebaseline if it keys on hashes.
6. **The survey-graduation prototype-fold (§4P.5):** fold the cheapest speedtest domain (`survey`, already barrel-bearing) first to confirm typecheck + `proof:import-boundaries` green + per-route delta, before the graduation gate goes born-RED on `admin`/`dashboard`.
7. **A1′ census correction (RULED, §1.5):** `levelField.ts` is concentric-internal, NOT the shared field operator; the real cross-family curlFBM edge is `concentric → liquid-grid/index.ts` (barrel-exposed). The G4 born-RED baseline asserts the ACTUAL 25-reach tree count, not a prose 28.

---

## Appendix A — worked examples (verified)

**A1 — The dock split-brain (the FOLD census, verified).** Of the 8 shared-tree composables round-1 named "dock-only," exactly ONE folds:

| Leaf | Verdict | Reason (verified) |
|---|---|---|
| `useDockCtaReceive` | **FOLDS → dock/composables/** | dock-purpose; no sibling-import edge; dock already re-exports it. |
| `morphSignatures` | STAYS shared | `MORPH_SIGNATURES` imported by sibling `useGooMorph` + root barrel. |
| `useScrollTo` | STAYS in sidebar | sidebar-family leaf composed by sibling `useClickDelegate`/`useLazyLoader`. |
| `useLiquidReveal` | STAYS shared | bloom-family root; on `/motion` + `/api`; dock is one of ≥2 reaches. |
| `useScrollTrigger` | STAYS shared | composed by sibling `scrollReader`/`useScrollChrome`. |
| `useScrollChrome` | STAYS shared | scroll-reader family; on `/api`. |
| `useBloomUp` | STAYS shared | app-global demo `AppShell.vue` route bloom + composed by sibling `useElementMorph`. |
| `useGlassBackdropLuminance` | STAYS shared | glass adaptive family; composed by sibling `ambientHueHistogram`/`backdropSampleMath`. |

**A1′ — The PROMOTE-primitive census (25 buried primitives, corrected).** `aurora/constants/budget.ts` (12 files / 7 viz families, byte-neutral — constant-folded) → shared viz/glass leaf; `aurora/constants/shaders/procedural-color.wgsl.ts` (6 sibling shaders, byte-neutral — twins already co-bundle) → `composables/glass/webgl/shaders/` beside its GLSL twin; `dock/composables/useDockHold.ts` (reached by `ui/slider`) → promote with `dockContext`; `liquid-grid/composables/liquidGrid.ts` `curlFBM` (reached by `concentric`) → the shared field operator (NOT the mis-identified `levelField.ts`, which is concentric-internal). Each drains OUT via a `components→shared` UP edge; the reaching siblings re-point.

**A1″ — The PROMOTE-context census (the DI-context third case, proven end-to-end).** `dock/composables/dockContext.ts` (a `createStrictContext` module already importing the shared factory) is module-path-imported by 5 non-dock families (`ui/slider`, `ui/select`, `ui/popover`, `ui/dropdown-menu`, `custom/hover-popover`) via `useOptionalDockContext` → **PROMOTE to `composables/context/dockContext.ts`** (InjectionKey + helper pair + `DockOrientation`/`DockLayout` contract types + the inlined `DOCK_CONTEXT_LABEL`; SFC-free; provider + all 5 readers import it UP). Typecheck 0, build 0, `/dock` byte-stable, +0 backward edges, chunk-graph clean+improved (−327 gz on each of 5 foreign routes). The 7 other DI-context instances have 0 foreign module-path importers → STAY colocated.

**A2 — The single-family subtree.** `composables/sortable/` (860L, sole consumer `sortable-list/`) → `sortable-list/composables/`, root-barrel re-export via the DEEP composables leaf. `/virtual` + `/sidebar` (0 in-repo consumers) STAY module-level (T3a).

**A3 — The god-SFC family asymmetry.** `blob.vue` (875L) + `constellation.vue` (759L) → feature dirs like their sibling `aurora/`.

**A4 — The atomization cluster.** `labeled-field/` 5 `Labeled*` wrappers → ONE generic + typed control slot.

**A5 — The provenance flatten.** `components/{ui,custom}/*` → `components/*` flat peers (91), `ui/tabs→tabs/reka`, `subpath-policy.mjs` two-set merge (`tabs=PUBLISH`), machine-locked README domain-map (non-component peers exempt), zero EXPORT churn.

**A6 — The §4-PRODUCT graduation (speedtest).** `admin`/`dashboard`/`survey` GRADUATE into `features/<domain>/{ui,state,api,composables,lib,config,constants,types,index.ts}` slices (per-leaf T3 on config/types); the app-global layers keep only cross-cutting members; `views/` stays app-global. `design/`→`styles/`; `App.vue` 833L carves to `useAppProviders` + `layouts/`; `Dock.vue` 774L → `components/dock/`.

**A7 — The backend reshape (floridify + speedtest/server).** floridify `models/` (126 importers) — the shared schema-registry carve keeps ≥2-domain types shared, folds single-domain types into their domain; `lookup_pipeline.py` (5-domain composition) → `pipelines/`; the 41 god-modules drain under §6 G9's length ceiling. speedtest/server `routes/`+`services/`+`validation/` (≥2-domain-stem scatter) dissolve file-by-file into domain packages + the infra ring. Both reproduced live by the wired G9 (floridify 47 / speedtest-server 4 / dns-speedtest 2 / greenfield-rs GREEN).

---

## Appendix B — the round-3 [R3]→resolution ledger

| [R3] item (round-2) | Resolution (round-3) | Where |
|---|---|---|
| src→`@glass` whole-tree re-open | **REJECTED** — dts-leak blocker (no dts-alias resolver); `@glass`=consumer-tree alias, src stays relative; recompute scoped to 568-variant; new G10 lock | §7, §6 G10 |
| dev-CSS-resolver + HMR proof | **PROVEN** — approach (i) end-to-end (dev + HMR + byte-identical dist); option (ii) dropped; T1b-walk convention added | §2.6, §6 G6 |
| 28-reach PROMOTE chunk delta | **MEASURED** — primitive class byte-neutral, DI-context class −327 gz/route WIN; count corrected 28→25; A1′ levelField error fixed; basename-keying note | §7, §1.5, A1′ |
| dockContext DI-context promote | **PROVEN end-to-end** — typecheck/build 0, +0 edges, chunk clean+improved; criterion codified (≥2 non-owning feature-dirs by module-path); `composables/context/` = DI CONTRACT home | §1.3, §1.5, §2.4, A1″ |
| ship G7 as a real script | **SHIPPED** — born-RED 865, all-text-recursive, 9/9; + subpath-policy semantic rewrite + close-battery `proof:subpath-classify`/`proof:build` | §6 G7, §3 |
| ratify + wire G9 | **RATIFIED + WIRED** — proto4 in proto-gates/, self-test 9/9, live-backend reproduced | §6 G9, A7 |
| the reka `tabs/reka` home | **CONFIRMED** — `ui/tabs → components/tabs/reka` + `tabs=PUBLISH` merge | §3, A5 |
| survey-graduation fold | **NAMED execution sub-wave** — prototype-fold survey first | §4P.5, §9 |
| source-CSS-@import audit | **CLOSED** — census: icon-chip sole cross-global @import → documented-ownership; 12 clean families zero @import | §2.6 |

*No remaining **[R3]** design questions. §9 is the execution-carve ledger — settled rulings, codemod/gate mechanics to encode.*
