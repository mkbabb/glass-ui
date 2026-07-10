# The Constellation Structure Standard — Round 2

**Status:** CANONICAL working spec (post round-2 synthesis). Supersedes `STRUCTURE-SPEC.md`, `ROUND-1-SPEC.md`. Every round-1 **[R2]** directive is now resolved by measured evidence and folded in; the tags are dropped. Remaining open items are tagged **[R3]** (round-3 execution-prototype confirmations, not design questions).
**Scope:** ONE structural grammar for every repo in the constellation — glass-ui (the library) + its sibling demo/consumer apps (speedtest, words, slides, sci-report) + the polyglot backends. Frontend and backend under one law; each language binds its own idiomatic norms.
**Constitution:** the user's edicts (§0). Aristotelian proportion is the divining rod; colocation is recursive; no god-modules, no needless encapsulation; clean break, no legacy.

---

## §0 The constitution (edicts, restated as binding)

1. ONE standard for component/module structure covering BOTH frontend and backend, for the WHOLE constellation.
2. **Aristotelian proportion is the divining rod.** Needless encapsulation and excessive granularity are vices; god-modules are the opposite vice. The MEAN divines components, nested/recursive components, modules, directories.
3. **Colocation, recursively.** A component lives WITH its sub-components, composables, skeletons, constants, styles, shaders, README — recursing for nested components. Only truly module/global-level kin live in a shared home.
4. Long-running dirs ALWAYS break into common modules, encapsulated befittingly.
5. Settle with evidence: FLATTEN the `components/ui + components/custom` two-tier, or not? What is SOTA (2025-2026)? — **SETTLED: FLATTEN** (§3).
6. Backend gets the SAME treatment + enforcement, abstracted per language.
7. NO quick solutions, NO workarounds. Idiomatic, gestalt approaches. Architectural transposition for elegance, simplicity, performance. NO legacy code, no back-compat aliases.
8. Every file, component, style examined, then RE-examined.

---

## §1 The Law of Aristotelian Proportion

> The mean is not a number. It is the answer to one question asked of every module: **does everything in here belong together, and is anything that belongs together kept apart?** The thresholds below are guardrails that catch a module drifting toward either vice — they are not the law. The law is cohesion. And the divining rod runs in **both directions**: it folds an over-abstracted leaf back into its sole owner, AND it promotes a general primitive out of the one consumer that buried it (§1.5).

### §1.1 The two vices, named

| Vice | Name | The failure |
|---|---|---|
| **Excess** (too little division) | **God-module** | A file/dir holds >1 concern; things that change independently are fused; a reader must hold the whole file to understand any part. |
| **Deficiency** (too much division) | **Atomization** | A concern is shattered across many tiny modules; an abstraction is minted before ≥2 real consumers exist; the reader runs a scavenger hunt across folders to assemble one behaviour. Premature abstraction is *more* harmful than the duplication it removes. Two special cases, mirror images of each other: **atomization-by-misplacement** — burying a general/sibling-owned/app-global primitive inside ONE consumer (the vice A1 committed on 7 of 8 folds; §Appendix A1); and **the buried-primitive** — a genuinely shared primitive physically resident inside one component that ≥2 OTHER components reach into (the 28 live cross-component guts reaches, §1.5). |

Layer-by-TYPE (`controllers/ models/ utils/`) is the god-module's structural cousin (scatters one feature across type-folders); over-colocation is atomization's. The spec forbids both.

### §1.2 The unit: the component FOLDER

The atomic module is the **per-component folder with an index barrel** — reka-ui's Combobox (17 files) and a 2-file wrapper are the SAME unit at different scales; the folder scales with the concern, the barrel is invariant. This is FSD's *slice*, bulletproof-react's *per-feature dir*, Josh Comeau's *component-folder-with-index* — one convergent unit. glass-ui already runs it in `custom/`; the spec canonizes THIS unit as universal (frontend and backend).

**Colocation is the default; promotion to a shared home is the exception that must be earned** (§1.3 T3). This single directionality — *local until proven shared* — is the spine every source encodes.

### §1.3 The thresholds (guardrails, with rationale)

**T1 — File size. Hard ceiling 500 RAW lines; soft target ~300; the real test is cohesion.**
- 500 is the house-native ratchet (`proof:no-god-module`, `HARD_LIMIT=500`). **Lines are counted RAW** (`source.split("\n")`, mirrors `wc -l`) — the house's live definition, PINNED. There is no "logic-line" variant anywhere in this spec. The §8 RATCHET_BASELINES are raw counts, untouched.
- A hard number becomes a target ("files fill up right to the limit"). So 500 is a **fail ceiling**, ~300 an **advisory soft target** (warn, not fail), and a file *under* 500 is still a violation if it fuses >1 concern.
- **Over-ceiling escape: the draining RATCHET only — no permanent length exemption (B10 RULED).** A cohesive file over 500 registers a ratchet row with rationale and drains as it can be carved; it is NOT permanently exempt. Round 2 considered a permanent complexity-gated exemption (mccabe / PLR0915 measured against the god-FUNCTION) and **rejects it for file length** (edict 7 — a permanent exemption is the workaround that lets files fill to any size). The god-FUNCTION metric IS adopted as a SEPARATE per-language advisory (§5.2: ruff `C901`/`PLR0915`, eslint-none-so-`proof:*` on the TS side booked) — a long *function* inside a legal-length file is a distinct smell, flagged, not fatal. The ONLY length exemptions are the two single-artifact cases below.
- **Shader-literal exemption:** a single cohesive `*.{glsl,wgsl,frag,vert}.ts` string is ONE artifact — splitting corrupts the assembled shader. Exempt from the line gate, governed by cohesion.
- **Data-manifest exemption (T1a):** a single-source DATA manifest N gates parse by literal path (demo `stories/manifest.ts` 1406L; the 1210L `tokens.css` cascade) may exceed 500 *as data* IFF its resolution/logic machinery is carved out (the `manifest/lazy.ts` precedent). Registered, named — not silent drift.

**T2 — Directory depth. Colocation nests at most ONE segment level below a component root; recursion resets the budget.**
- SOTA: readers lose context past 3–4 levels; FSD caps at EXACTLY 3 (Layer→Slice→Segment).
- **Rule:** within one component root the tree is `root → {segment dir} → file`. A segment dir (`composables/ shaders/ skeleton/ styles/ sections/ constants/ config/`) holds files, NOT other segment dirs. A nested SUB-COMPONENT (a child with its own multi-file structure + `index.ts`) is a NEW component root that RESETS the local budget — how recursion (edict 3) stays legal without unbounded depth. A global sanity cap (**≤5 dirs** below the NEAREST feature/component root — relative, not an absolute `src/components/` path, since product apps have no such anchor) catches runaway recursion without a recorded rationale. Machine-locked by `proof:depth` (§6 G3; prototyped, self-test 5/5).

**T3 — Promotion to the shared tree. ≥2 UNRELATED families — decidably counted.**

The house's ≥2-consumer visual-load-bearing invariant (J-inv-10) IS this rule; the spec extends it to every non-visual leaf. The naive `grep | family-extract | distinct-count` gives WRONG counts (the A1 flagship is the proof — it greenlit 7 illegal folds). The count is made decidable by specifying its inclusion/exclusion set:

- **INCLUDE composition edges.** A leaf real-imported by a SIBLING shared-tree leaf belongs to that sibling's shared family. `morphSignatures` is imported by `useGooMorph` → a shared motion primitive, NOT dock-only.
- **INCLUDE demo/sibling-app usage.** A leaf a consumer app uses APP-GLOBALLY (demo `AppShell.vue`, a sibling repo) is proven-general. `useBloomUp` is app-global route-bloom → stays shared.
- **EXCLUDE provide/inject DI plumbing** (`useGeolocation` reads as 7-importer cross-family but is single-family wired through DI keys). A `provide`/`inject`/DI-key indirection is NOT a family edge.
- **EXCLUDE root-barrel and curated-aggregator re-exports** — a re-export from `src/index.ts` or a `*/core/index.ts` is a PUBLISH edge, not a consumer family. **Publication is a publish-surface signal, NOT a physical-location signal** (§2.5): a published leaf can STILL fold physically, because the subpath-entry re-points to the deep leaf (B4). `publishedPublic` is advisory in the promotion decider, never a false 2nd family.

**The overriding rule:** *a shared leaf composed by a sibling shared leaf OR used app-globally STAYS shared, regardless of component-family count.* Below the bar, a leaf colocates under its sole owner. Machine-locked by the `proof:colocation` globality clause (§6 G1; prototyped, self-test 6/6, born-RED FOLD-census on HEAD).

- **Exemption (T3a):** a PUBLISHED subpath surface with a recorded external (cross-repo) consumer stays module-level at 0 in-repo families (`/virtual`, `/sidebar`). Machine-checkable against `docs/consumer-evidence/`.
- Census fact: ~10 composables clear ≥3-unrelated-families today; the bar is **≥2** (aligned to inv-10), ≥3 the natural cluster.

**T4 — Segment minimum-substance.** A `composables/` holding one file, an empty `constants.ts`/`shaders/` — atomization. A segment appears ONLY with real members OR a genuinely-separable concern. A lone component-local composable stays a sibling file at the component root until a second earns the `composables/` dir. Machine-locked by the `proof:colocation` no-empty-segment clause (§6 G1).

### §1.4 Both-direction violations, decidable

**God-module (excess) — any of:**
- file >500 RAW lines (non-shader, non-data-manifest);
- a dir mixing >1 domain/concern with no sub-grouping;
- layer-by-type at the top level (`controllers/`, `services/`, `models/` as app-global dirs — but see the §5.1 infra-ring carve);
- a grab-bag (`utils.ts`, `helpers.go`, `common.py`) accreting unrelated leaves.
- **The `mixed-kind` flat-dir smell (B12b RULED — advisory, not a gate).** A flat dir of >~7 sibling files of MIXED kind (page vs helper vs shared) is a human-review flag, NOT a mechanical gate — "mixed kind" is not decidable from filenames alone. The machine-checkable substitutes ARE gated: the README domain-map (§3, every `components/*` appears in it), `proof:depth` (no over-nesting), and `proof:import-boundaries` (no cross-component guts reach — the real mechanism by which a flat peer set stays legible is that peers compose only through barrels). No standalone `mixed-kind` gate is minted.

**Atomization (deficiency) — any of:**
- a shared-tree resident with <2 unrelated families (per the T3 count) and no external-consumer exemption → **FOLD** to its sole owner;
- **atomization-by-misplacement:** a general/sibling-composed/app-global leaf buried inside one consumer;
- **the buried-primitive:** a genuinely shared primitive resident inside one component that ≥2 OTHER components import → **PROMOTE** to the shared tree (§1.5);
- a segment dir with a single trivial member (T4);
- a wrapper module that only re-passes its inputs (labeled-field's 5 `Labeled*` SFCs → one generic + typed slot);
- a composable/util extracted before its 2nd consumer exists.

### §1.5 The FOLD↔PROMOTE symmetry (the round-2 sharpening — the divining rod runs both ways)

The law is one rule applied in two directions. **T3 is a placement function of the family count, not a one-way ratchet.** The `proof:colocation` globality clause and `proof:import-boundaries` are the two ends of the SAME divining rod:

- **FOLD (globality gate, §6 G1).** A shared-tree leaf with EXACTLY ONE in-repo family and no sibling/app-global/external-evidence signal is over-abstracted — it colocates under its sole owner. The verified live fold set is small (Appendix A1): `useDockCtaReceive` → `dock/composables/`; `composables/sortable/` → `sortable-list/composables/`. Seven round-1-named "folds" are re-adjudicated STAY-SHARED (composition-chain / app-global / sidebar-family).

- **PROMOTE (import-boundaries gate, §6 G4).** A primitive physically resident inside one component that ≥2 OTHER components reach into is a buried shared leaf — it promotes OUT to the shared tree. This is NOT a hypothetical: `proof:import-boundaries` is **born-RED on HEAD with 28 cross-component GUTS reaches**, a whole class the round-1 spec named only by its single curlFBM instance. The measured drivers:
  - `aurora/constants/budget.ts` — imported cross-component by **7 viz families** (concentric, constellation, dot-flow-field, dot-matrix, fourier-field, goo-blob, liquid-grid). A shared viz-budget primitive buried in aurora/. → promote to a shared viz/glass home.
  - `aurora/constants/shaders/procedural-color.wgsl.ts` (the AV.W2 shared color chunk's WGSL twin) — spliced by **6 sibling viz shaders**. Its GLSL twin already lives shared at `composables/glass/webgl/shaders/`; the WGSL twin got buried. → promote to the same shared shaders home (reunite the twins).
  - `concentric/composables/levelField.ts` → `liquid-grid/composables/liquidGrid.ts` (the spec's named curlFBM case) — a shared field operator reached cross-component.
  - `dock/…` and the remaining tail complete the 28.

**The two operations use the same census machinery** (the globality decider and the boundary adjudicator both classify importers into families with the same INCLUDE/EXCLUDE set) and resolve to the same target — a leaf lives where its family count places it. The reshape wave runs BOTH: the FOLD list (small) and the PROMOTE list (the 28-reach class) drain to a tree where every cross-component edge goes through a barrel and every shared primitive lives in the shared tree. This is the deepest round-2 finding: the aristotelian mean is a single decidable placement rule, not two.

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

**The barrel-only rule + the deep-leaf exemption (B4).** `index.ts` is the ONLY import surface for anything reaching this component from ANOTHER component or the app. The SOLE exemption: a **curated subpath-entry** (§2.5, the 4th DAG node) re-exports the deep colocated LEAF directly (`export { X } from '../components/dock/composables/X'`) — NEVER through the component barrel, which would drag the whole component (SFC + sub-components + shaders) into a heavy subpath chunk. `proof:import-boundaries` distinguishes a legitimate subpath deep-leaf re-export from an illegal cross-component reach into another component's guts.

### §2.2 What colocates (the default)
Everything a component OWNS: sub-components, component-local composables, constants, shaders, skeletons, styles (§2.6), README. A component-specific composable read only by that component is NOT module-level and must NOT sit in the shared tree.

### §2.3 Recursion
A sub-component that grows its own multi-file structure becomes a nested component root under the parent (or under `sections/`), with its own `index.ts`, its own local `composables/`, its own README if complex. Aurora (demo) is the gold standard: `aurora/` root + `config/` + `sections/` + `presets.ts`. Each nesting RESETS the depth budget (T2). The `tabs/reka/` sub-component group (§3, B9) is the executable instance of this: reka primitives nest as a named sub-component group under `components/tabs/`.

### §2.4 The shared tree — what earns a module-level home
`src/composables/` holds ONLY leaves clearing T3 — the genuinely-global motion/glass/dom primitives. Its sub-trees (`motion/ glass/ dom/ dark/ reactive/ context/`) are the shared homes. The PROMOTE set (§1.5) joins them: buried multi-family primitives (`budget.ts`, `procedural-color.wgsl.ts`, …) land in the befitting shared sub-tree (viz-budget → a shared viz/glass leaf; the WGSL shader → `composables/glass/webgl/shaders/` beside its GLSL twin).

**The Vue-idiomatic divergence (recorded, deliberate).** FSD names segments by PURPOSE and warns against essence-names (`hooks/`). glass-ui and the Vue ecosystem use `composables/` (essence-name). The spec KEEPS it (ecosystem consistency) and records this as a documented divergence, not drift. Backend uses purpose-names (§5).

### §2.5 Location vs publish-surface (the orthogonality ruling) + the 4-node boundary model

TWO axes the current tree conflates:
- **Physical location** is governed by T3 (family count).
- **Publish surface** is governed by the SCC / heavy-peer discipline (a keyframes/value.js-bearing leaf ships via a curated subpath, off the vueuse-free root barrel).

**These do not couple.** "Must ship on `/motion`" does NOT mean "must physically live in `composables/motion/`."

**The boundary model is a 4-node DAG (the §2.5↔G4 reconciliation):**
```
shared/composables → components → subpath-entries (src/*.ts) → app
```
The curated **subpath-entry layer** (`src/index.ts`, `src/motion.ts`, `src/dark.ts`, `src/keyboard.ts`, the 78 `src/subpaths/*.ts` mirror barrels, `src/api/index.ts`) is the ONLY node EXEMPT from the shared→components prohibition — it may reach BOTH directions (re-export from `shared/` AND from the deep leaf of a `components/*` colocated composable). proto1 proved this is the only shape that compiles: `/motion` resolves through `src/motion.ts`, so a fold of a published dock composable into `dock/composables/` requires `src/motion.ts` (or `composables/motion/index.ts` re-pointed) to re-export from the component's deep leaf — a legal subpath-entry edge, an illegal `composables/`→`components/` edge. `proof:import-boundaries` (§6 G4) asserts exactly this.

**The measured edge legality table (prototyped, self-test 9/9):**
| Edge | Verdict |
|---|---|
| subpath-entry → anything | LEGAL (the exempt publish node) |
| components → shared | LEGAL (the UP edge) |
| components → same-component guts | LEGAL |
| components → sibling BARREL (`index.ts`) | LEGAL (compose a sibling) |
| components → other-component GUTS | **RED** (promote the shared primitive) |
| shared → shared | LEGAL |
| shared → components (plain) | **RED** (the DAG prohibition) |
| shared → components via `export *` aggregator barrel | LEGAL (the T3 publish carve) |
| any → subpath-entry | **RED** (the publish layer is the sink, not a dependency) |

**The FOLD set + the PROMOTE set (§1.5).** FOLD: `useDockCtaReceive` → `dock/composables/` (the fold's `/motion` re-export targets the deep leaf via `src/motion.ts`, never the dock barrel); `composables/sortable/` → `sortable-list/composables/`. PROMOTE: the 28 cross-component guts reaches (§1.5) drain OUT to the shared tree. The chunk-graph delta of BOTH is MEASURED gate-neutral (§7 — the [R2] tag is dropped).

### §2.6 Styles / CSS — PHYSICAL colocation, byte-clean via flatten-on-publish (the round-2 RULING FLIP)

The census found component-SPECIFIC CSS (`dock/*.css`, `border-progress.css`, `cta-seat.css`, `segmented-tabs.css`) in the GLOBAL `src/styles/` tree — a colocation miss vs SOTA (Vuetify colocates `VBtn.sass`). Round 1 set the conservative default (documented-ownership) because a naive physical move was proven to break the publish bundle. **Round 2 MEASURED a byte-clean physical-colocation path and the ruling FLIPS to physical colocation.**

**Why the naive move fails (unchanged, re-confirmed).** The directive's literal mechanism — relocate a family's CSS into `dist/components/<n>/styles/` and rewrite the `index.css` `@import` target — cannot diff clean by construction: (a) rewriting `@import "./dock.css"` is a byte change in index.css; (b) files land in a different dist tree; (c) that tree is the `.d.ts`-only mirror → the CSS never ships. This is the branch round-1 correctly predicted would fail.

**The measured byte-clean path — source-colocate + flatten-on-publish.** In a throwaway worktree, 4 representative families' CSS moved into colocated `src/components/<fam>/styles/` dirs (dock + its 17-partial `dock/` subdir, border-progress, drawer, tabs/segmented-tabs), **every `index.css` `@import "./X.css"` left UNCHANGED**, and `copyStyleAssets` extended by ~12 lines to walk `src/components/**/styles/` and `cpSync` each into `dist/styles/` (flattened, sub-structure preserved). Result: `npm run build` green; `diff -rq baseline dist/styles` → **exit 0 across all 106 CSS files**; aggregate sorted-hash parity (`b5fa8b976e5a3862f3c1499ce522092750119a57`) both sides; the ONLY changed files are the moved `.css` + the build plugin (zero product `.ts`/`.vue`) → `dist/*.js` deterministically invariant; `profile:budget`/chunk-graph unaffected (CSS is not in the JS graph).

**Why the flat-namespace publish is NECESSARY, not merely convenient.** `icon-chip.css` `@import`s the GLOBAL `./glass/glass-atom.css` + `./glass/glass-chip.css`. Approach (a)'s flat `dist/styles/` namespace resolves this cross-family ref (`dist/styles/glass/glass-atom.css` is present); the scatter-into-`dist/components/` approach would BREAK it. This is the strongest structural argument for flatten-on-publish over relocate-and-rewrite. The flatten is collision-free (all top-level `src/styles/*.css` basenames are globally unique; the only top-level↔subdir overlaps — `glass.css`, `utilities.css` — are GLOBAL roots that never colocate). A family @importing subdir partials (dock.css→17×`./dock/*.css`) keeps the subdir INSIDE its colocated `styles/` dir, so the relative @import survives the flatten (proto: 17 partials landed correctly).

**The ruling:**
1. **The ~14 CLEAN single-owner families colocate PHYSICALLY** into `components/<n>/styles/<n>.css` (+ subdir partials): dock, drawer, border-progress, tabs, select, sheet, completion-seal, hover-popover, instrument-chassis, configurator, cards, floating-panel, card-scroll, glass-refract. Machine-locked by the new `proof:css-colocation` (§6 G6): every colocated CSS flattens to a UNIQUE `dist/styles/` target (no clobber); a family's subdir partials stay within its `styles/` dir; the build walk reaches every `src/components/**/styles/` dir; a golden-hash manifest of the shipped `/styles` reds any drift.
2. **CROSS-COUPLED single-owner files stay DOCUMENTED-OWNERSHIP** pending a source-@import audit — `icon-chip.css` reaches the global `./glass/` primitives, so its SOURCE `@import "./glass/glass-atom.css"` would dangle at source once moved (it resolves only in the flattened dist namespace). Until the source-CSS-@import-resolution audit of the gate corpus clears (**[R3]** — no source-reading gate must break on the moved home), such files keep a `README OWNER:` field + the `proof:css-ownership` gate (§6 G6) that names the sole owner. This is the honest interim, not a workaround — the file paints identically; only its physical home is deferred.
3. **Genuinely-global cascade stays in `src/styles/`:** the token cascade, the 5-rung glass ladder, typography, theme, `utilities.css`, `paper.css`, `animations.css`, `transitions.css`, and no-single-owner recipes. `feedback-tone.css` is owned by the feedback CLUSTER (Alert/Notification/Toast, ≥2) — genuinely shared, stays global with the cluster named.
4. **`index.css` remains the SINGLE INTER-component ordering authority** — the load-bearing @layer + source-order ties (`menu.css` after `utilities.css`; `glass/rim.css` after `ladder.css`) are INVIOLATE. Colocation is a pure SOURCE-tree reorganization; the published cascade is byte-identical. The physical CSS move is the exact analogue of the §2.5 location-vs-publish orthogonality: SOURCE colocation, ONE flat PUBLISHED namespace (`dist/styles/`).

**The build change lands in the EXECUTION tranche, not the spec phase** (the ~12-line `copyStyleAssets` extension is a `src`/build write the spec-phase fence forbids). The spec records the mechanism + the measured proof + the golden-hash gate; the actual move + the plugin edit are a gated execution wave.

---

## §3 VERDICT — flatten `components/ui` + `components/custom`

**FLATTEN.** Merge into ONE `src/components/` of domain-organized per-component folders as flat peers. No provenance tier, no dead markers. **This is settled (edict 5), executable, and proven** — restated here, not reopened.

### The evidence (unanimous for owned libraries)
Every library that OWNS its components keeps flat peers, no vendored-vs-house tier: **reka-ui** (~78 flat + `shared/`, glass-ui's own substrate, verified against the installed dep), **Base UI** (per-component + `utils/ internals/`), **Ark UI** (~70 flat + `factory.ts`), **PrimeVue** (80+), **Vuetify**. The two-tier is EXCLUSIVELY a shadcn-CONSUMER pattern whose sole rationale — protecting vendored copies for `npx shadcn add` re-pull — is DEAD here (glass-ui's `ui/` is ~100% forked). No owned library splits on primitive-vs-composite; the folder's contents signal complexity (reka Combobox 17 files vs a 2-file wrapper, same tier). The demo corroborates: no ui/custom split, reads cleanly grouped by concern.

### The reshape — proven executable (CODEMOD-SPEC, run GREEN in an isolated worktree)
The move is ONE elision: remove the segment `ui`/`custom` wherever it immediately follows `components`.
- **src imports (all-relative, `@glass` 0×): resolve-and-recompute.** `newSpecifier = normalize(relative(elide(dirname(F)), elide(resolve(dirname(F), S))))` — needs NO module resolver (elide removes a middle segment, so the tail is byte-identical; extensionless stays extensionless, `.vue` stays `.vue`). 358 src files rewritten → typecheck exit 0, zero TS2307.
- **demo/tests (`@glass/components/{ui,custom}/*` absolute alias): segment-drop.** `@glass/components/custom/dock` → `@glass/components/dock` resolves with ZERO depth arithmetic; the alias itself is UNTOUCHED (no config change). 210 demo/tests files rewritten.
- **The tests mirror ALSO flattens** (the src↔tests mirror invariant) — a codemod that flattens src but not tests is a broken half-migration (proven: the first run corrupted 3 test files). The move-map is `{src/components, tests/components}`; demo rides the alias.
- **The `tabs` name-collision (B9 CONFIRMED).** `comm -12` over the ui/custom dir-name sets returns exactly `tabs` — the SOLE non-uniform case. Reka `ui/tabs` (1 internal importer, `DockLayerGroup`) vs SegmentedTabs `custom/tabs` (12 importers) cannot both become `components/tabs`. **Ruling (executable form proven): `ui/tabs → components/tabs/reka`** — reka nested as a named sub-component group (the §2.3 recursion model), applied as a one-entry override BEFORE the uniform segment-drop; `DockLayerGroup` repaths. `components/tabs/` holds `SegmentedTabs.vue` + `composables/` + `constants.ts` + `index.ts` + `README.md` at root, `reka/{Tabs.vue,…}` nested. **[R3]** the exact reka home (`tabs/reka/` subdir — the proven form) is ratified; a bare-peer alternative was considered and rejected (it re-creates the index.ts barrel collision).
- **The dead `ui/index.ts` aggregate barrel is DROPPED** (ZERO real importers — only 2 `src/index.ts` COMMENT mentions; `src/index.ts` re-exports each package explicitly). Clean break, no-legacy. No `components/index.ts` exists pre- or post-flatten.
- **Domain map lives in a MACHINE-LOCKED `components/README.md`** — a `proof:claude-structure-sync`-pattern gate asserts every `components/*` dir appears in the map and vice-versa (the navigation aid cannot silently drift). reka-at-78-flat is the SOTA precedent. **[R3]** the heterogeneity evidence (a 2-file `avatar/` beside a 17-file WebGL `aurora/`): a LIGHT physical domain sub-grouping (form/overlay/viz/…) vs flat+gated-README — evidence-settle in execution, NOT a re-open of the flatten. The default is FLAT + gated README (reka precedent); a sub-grouping is adopted only if the execution census shows the flat map exceeds the human-legibility bar.
- **No provenance markers** (greenfield-no-meta). A future actively-upstream-synced component earns a LIVE marker then; none qualifies today.
- **Export surface stable, INTERNAL churn large.** package.json `exports` untouched (0 keys); ~568 internal file rewrites (358 src + 210 demo/tests) + 218 scripts + ~91 dir moves. Final: **91 flat peers** (43 ui + 49 custom − 1 tabs merge − 1 dead barrel).

### The residual proportion pass the flatten enables
`timeline/` (2274L, `geometry.ts`→`composables/`), `configurator/` (`useConfiguratorState`→`composables/`), the 500-breachers (`useGlassBackdropLuminance` 554, `DockLayerGroup` 524, `GlassDock` 515) carve by cohesion (BG.W-CUT's live-engine drain owns these — ORTHOGONAL to the flatten, delta=0), `labeled-field`'s 5 wrappers collapse to one generic.

---

## §4 The demo/application grammar

The demo/application layer has TWO archetypes on ONE feature-slice spine. **§4-STORYBOOK** (the library's own demo — story-driven) and **§4-PRODUCT** (a router/store/backend-bearing consumer app — speedtest, words, slides, sci-report). Both are the same `component-folder + local-until-shared + recursion-resets-depth` grammar; they differ only in the top-of-tree layers a router-driven app earns.

### §4-STORYBOOK — the story archetype

#### §4S.1 The fixed skeleton
```
<app>/
  App.vue · main.ts · router.ts
  shell/                       # app chrome (AppShell + nav docks + shell composables + shell CSS)
  chassis/                     # demo-private PRESENTATION primitives (content COMPOSES, never re-authors)
    subtype/                   # the closed presentation-subtype taxonomy (§4S.4), its own dir
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

#### §4S.4 The closed subtype taxonomy
Every demo mints a CLOSED presentation-subtype taxonomy (stage / specimen / interaction / matrix / composition) in its own `chassis/subtype/` dir.

#### §4S.5 God-SFC escalation
A story tripping the ratchet becomes a feature dir (the aurora model). Symmetric across a family: `blob.vue` (875L) + `constellation.vue` (759L) → feature dirs like their sibling `aurora/`.

#### §4S.6 The barrel-vs-deep-path idiom
**Deep-path for demo-private SFCs** (no external surface; the barrel is ceremony); **index barrel for anything a sibling app consumes.** Drop vestigial `chassis/index.ts` if unused.

### §4-PRODUCT — the router/store/backend-bearing consumer app (the round-2 twin)

The consumer app is the STORYBOOK mirrored across the router boundary: storybook `stories/`↔product `views/`, storybook `chassis/`↔product `components/`+`features/`, storybook `shell/`↔product `App.vue`+`layouts/`. The skeleton is DOCUMENTATION of the convergent-in-practice shape (speedtest/words/slides/sci-report already run it), not a new taxonomy.

#### §4P.1 The fixed skeleton
```
<app>/src/
  main.ts · App.vue · router(.ts | /)      # the entry pair + routing
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
All four apps name route-bound components `views/` (speedtest `SpeedtestView`/`SurveyView`/`ChartsView`/…). FSD's canonical name is `pages/`; the constellation deliberately uses the Vue-native `views/`. A view holds route-BOUND components ONLY (one per router record, `<Name>View.vue`); it is a THIN composition that wires a feature barrel to a layout, NEVER domain logic. Clean-break: no `pages/` alias.

#### §4P.3 router FILE→DIR by T4 proportion
`router.ts` (a bare route table — slides' 7-line `createRouter` + 3 lazy routes) until it EARNS `router/` (index.ts + navigation guards + `typed-routes.d.ts` + per-domain route modules ≥2 — speedtest/words). The same substance-minimum gate as every other segment; no premature `router/` dir for a 3-route deck.

#### §4P.4 The `api/` FE transport-leaf infra-ring
`api/` = ONE `client.ts` transport kernel (auth headers + `apiFetch` wrapper + token — canonical name **`client.ts`**, reconciling words' `core.ts`) + per-resource modules named by DOMAIN RESOURCE not layer (`dashboard.ts`, `sessions.ts`, `surveys.ts`) + `types.ts` envelopes + optional domain subtrees + an explicit-named-re-export `index.ts`. It is UNIDIRECTIONAL and the architectural LEAF: `views/ → stores/ → api/ → client.ts`; `api/` NEVER imports upward. This is the FE twin of the §5.1 backend infra-ring — the transport core is cross-cutting infra, resource modules are thin domain adapters, auth/error policy lives ONCE in `client.ts` never per-feature-duplicated. A full feature slice with its OWN api surface gets `features/<x>/api/` importing the shared client; a resource used by ≥2 unrelated view-families stays app-global (T3). Machine-enforced by `proof:import-boundaries` scope-extended to the product 4-node DAG (`api → stores → views/features → app`) — speedtest already ships `check-internal-boundaries.mjs` as the precedent to unify.

#### §4P.5 The domain-graduation predicate (the sharpest §4-PRODUCT law — the scatter fix)
A domain is a `components/<domain>/` GROUP by default (view-components + local composables + a barrel, reading app-global `stores/`/`api/`/`views/`). It **GRADUATES to a full `features/<domain>/` slice when it acquires a presence in ≥3 app-global layer dirs** (`components/` + `stores/` + `api/` + `views/`) **OR its own engine/state/domain-logic** — because at that point the app-global layers have become layer-by-type SCATTER for that domain (the §1.1/§5.1 vice at the DOMAIN grain). The scattered pieces fold into the slice (`features/<domain>/{ui,state,api,composables,index.ts}`); the app-global dirs keep ONLY cross-cutting members.

Live targets in the reference (speedtest): `admin` (17 files across components/stores/api/views — 4 dirs) GRADUATES; `dashboard` (31 files across 4 dirs) GRADUATES; `survey` (already carries its own `composables/`+`utils/`+`index.ts` — 90% a slice) GRADUATES; `speedtest` is ALREADY correctly graduated (`engine/ + state/ + ui/ + composables/ + index.ts`, 100+ files). This is T3 at the domain grain: local-until-shared, promote-at-scatter.

**`features/` is a PROPORTION-EARNED escalation, NOT a mandatory tier.** slides (a 7-line-App.vue deck viewer, no stores) has NO `features/` dir — `components/` + `views/` + a store or two suffice; minting empty slices is the atomization vice. Only a GRADUATED domain earns `features/<x>/`. The feature INTERIOR is by-purpose segments + a boundary `index.ts` barrel that is the SOLE cross-feature entry (speedtest's doctrine verbatim: "every consumer OUTSIDE imports through here, never by reaching into engine/, ui/, state/, or composables/ directly; intra-feature modules import siblings by path"). This IS §2.1's barrel-only rule + §2.3 recursion, transposed to the product-app domain.

**[R3]** the graduation threshold ("≥3 app-global layer dirs") is decidable NOW but must be PROTOTYPE-folded on the cheapest speedtest domain (survey — already barrel-bearing) to confirm the fold typechecks + `proof:import-boundaries` greens + the per-route bundle delta (its lazy-route boundary re-homes; `check-route-weight.mjs`/`proof:budget` gate it) before the gate goes born-RED on `admin`/`dashboard`.

#### §4P.6 The Pinia T3 split (feature-state colocates, app-global promotes)
A store owned by ONE feature slice lives at `features/<x>/state/` and is reached cross-feature ONLY through the feature barrel. A store used by ≥2 unrelated view/feature families (auth, session, api-cache, app-variant, journey) promotes to app-global `src/stores/`. A domain store CLUSTER gets a `stores/<domain>/` subtree (speedtest `stores/admin/`); Pinia plugins get `stores/plugins/`. The count uses the SAME T3 inclusion/exclusion set as §1.3. One store per file (Pinia SOTA: flat-by-design, one-per-domain for code-split + TS inference). **[R3]** whether a `stores/<domain>/` subtree is itself a graduation smell (speedtest scatters `admin` while words centralizes everything in `stores/` subtrees with no `features/` at all — the two references disagree in spirit); the ruling: a store-CLUSTER short of the ≥3-layer scatter is a legitimate app-global grouping, but a cluster that co-occurs with the ≥3-layer signal graduates.

#### §4P.7 `styles/` is the app-global design-layer name (clean-break rename of `design/`)
The library's own app-global style home is `src/styles/`; a consumer authoring a thin design layer atop it has no grounds for a different name. speedtest's `design/` renames to `styles/` with NO content loss — `tokens.css`/`register.css`/`motion.ts` stay (styles/ is the design-LAYER home, not merely a CSS bucket); `MOTION-DOCTRINE.md` moves to `docs/`. One name, no alias. The nuance is recorded: a design-system-owning app's `styles/` legitimately carries tokens + motion + registry (the library's own `src/styles/` IS the richest such system yet named `styles/`); the DIR NAME is uniform.

#### §4P.8 `config/` is the presets-in-consumers home (file→dir by proportion)
A single `site.config.ts` FILE until ≥2 config modules earn `config/`. `config/` holds app-global STATIC config + the consumer's named glass-ui PRESET registries (speedtest `auroraConfig.ts` — presets-in-consumers lives HERE, never leaking into the library) + deployment registries (`variants.ts`). This closes the loop with the standing presets-in-consumers precept.

#### §4P.9 NO root-shell god-SFC exemption — App.vue OBEYS the 500 ceiling and carves
The app root's legitimate job is THIN: mount `<RouterView>`, install app-global providers, host persistent chrome. Provider/substrate wiring carves to `composables/useAppProviders.ts` (speedtest already did this — the carve target for its 833L App.vue exists); layout switching carves to `layouts/`; persistent chrome (a 774L `Dock.vue`) carves to `components/dock/` as a normal component folder. The interim over-ceiling state uses the house RATCHET (registered row + rationale, drains) — NOT a permanent exemption (edict 7, §1.3 B10). slides' 7-line `App.vue` is the target shape.

#### §4P.10 `layouts/` app-global route-frame chrome
`layouts/` holds the route-chrome wrappers that frame `<RouterView>` (`AdminDashboardLayout`, `PublicDashboardLayout`). A layout is cross-cutting by nature (it wraps multiple routes) so it is app-global at `src/layouts/`, NEVER colocated into a feature. The router selects it via `route.meta.layout` or an App.vue branch.

#### §4P.11 The entry pair
`main.ts` (bootstrap: `createApp` + install router/Pinia/app-global providers/dark-cascade + mount) + `App.vue` (thin root shell) at src-root, beside `router(.ts|/)`. The invariant top-of-tree for every product app; the storybook twin (`App.vue · main.ts · router.ts`) already matches.

#### §4P.12 The FSD-divergence ledger (constellation-native names, deliberate, not drift)
The constellation runs a **PROPORTION-COLLAPSED FSD**: `app (main/App) → views → features/components → shared (stores/api/composables/styles/config)`. Route layer = `views/` (FSD `pages/`); hooks = `composables/` (FSD `hooks/`); feature dir = `features/` (FSD `features/`+`entities/`+`widgets/` collapsed by proportion — a small app needs neither `entities/` nor `widgets/` layers, and minting them is atomization). Unidirectional imports preserved; the 6-layer FSD tower is flattened to what the app's size earns.

---

## §5 Backend transposition (language-abstracted)

### §5.1 The grammar (identical shape to frontend)
- **Domain/feature PACKAGE** = the backend component folder. Named by DOMAIN, not technical layer.
- **By-PURPOSE segments:** `api/` (routes/handlers — transport edge), `model/` (domain types/data/rules), `lib/` (pure helpers). Colocate handler + model + logic FOR one domain TOGETHER.
- **Shared home** (`shared/`, `core/`) ONLY for truly-global — the ≥2-unrelated-DOMAINS bar (T3).
- **Reject layer-by-type of DOMAIN LOGIC.** `controllers/ + services/ + models/` as app-global dirs scattering one domain across type-folders is the vice (the "screaming architecture" verdict; group vertically). **Live target: `speedtest/server/src/` (routes/services/middleware/validation/utils layer-by-type) is a §5 reshape target** — §4-PRODUCT owns only the backend's PLACEMENT (top-level peer workspace); the interior domain-vertical reshape is §5's jurisdiction.
- **The infra-ring carve.** A thin CROSS-CUTTING infrastructure ring that runs on EVERY domain — `middleware/`, `logging/`, `events/`, a shared transport `core/`/`http/` kernel, a uniform repository base — is NOT the scavenger-hunt vice; it is the backend twin of the FE `_shared/` / the `api/client.ts` leaf (§4P.4). Distinguish "layer-by-type of DOMAIN LOGIC" (vice — scatter) from "thin adapter/infra ring around vertical domains" (legitimate). A `validation/` dir that is half-domain / half-shared dissolves FILE-BY-FILE: domain rules → the domain, shared helpers → the infra ring.
- **No grab-bags.** A `utils.py`/`helpers.go`/`common.ts` of unrelated leaves is a god-module (but named-cohesive leaves like `logging.py`/`config.py`/`paths.py` are NOT a grab-bag).
- **Depth (T2), import discipline, recursion** — identical: unidirectional (`shared → domain → app/entry`), no cross-domain imports except via a package's public API, long dirs break into sub-modules.

### §5.2 Per-language befitting notes
| Language | Module ceiling | Function norm | Idiom |
|---|---|---|---|
| TypeScript (backend) | 500 raw | short, cohesive | ESM subpath exports; `import type`; barrels per package. A `proof:*` god-function advisory is booked (no ESLint exists). |
| Python | ~300–500 module lines | Google ~40-line funcs | package = domain dir with `__init__.py` public API; `model.py`/`api.py`/`lib/`; no `utils.py` grab-bag; ruff `C901`/`PLR0915` for the god-FUNCTION (the B10 complexity advisory, per-language). |
| Go | package-per-domain | short | one package = one domain; `gofmt`; exported identifiers ARE the public API. |
| Rust | module-per-domain | short | `mod.rs`/`lib.rs` re-export = the barrel; `pub` = public API. |

The NUMBER is per-language; the GRAMMAR (domain-vertical, by-purpose segments, promote-shared-at-≥2, shallow depth, no grab-bags, infra-ring-is-legitimate) is constellation-wide. proto4 built a clean 27-file Python service the gate greened by construction and caught 8 real violations + 35 warnings on floridify — the grammar is language-neutral.

---

## §6 Enforcement — how the `proof:*` gates evolve

The house machine-locks structure (`proof:colocation`, `proof:no-god-module`). The spec EXTENDS them; it invents no parallel regime — and **every new gate is a device-free `proof:*` script with self-test bites, NOT ESLint** (zero ESLint config/dep exists repo-wide). All four new/extended gates are PROTOTYPED (`docs/tranches/BH/spec-structure/proto-gates/`), born-RED on HEAD where they should be, self-tests firing.

**G1 — `proof:colocation` extends (the FOLD end of the divining rod).** KEEP the README-marker binding. ADD the **globality clause (T3)** with the decidable count: INCLUDE composition edges + demo/sibling usage, EXCLUDE DI plumbing + root-barrel/aggregator re-exports; the overriding "sibling-composed OR app-global STAYS shared" rule ships as self-test bites (a `morphSignatures` sibling-shared bite; the reframed root-barrel-published-single-family FOLDS bite — publication is a publish-signal, not a false 2nd family). ADD the **no-empty-segment clause (T4)**. SCOPE-EXTEND to `demo/`. *(Prototyped: `proof-colocation-globality.mjs`, self-test 6/6, emits the FOLD census.)*

**G2 — `proof:no-god-module` unifies across `.ts`/`.vue`/`.css`** (shader-literal exempt), ONE `HARD_LIMIT=500` RAW, a `~300` advisory soft-target (warn), a data-manifest exemption (T1a, generalized to CSS token cascades). The CSS arm is a cohesion-carve BOUND by the byte-identical-carve fence + source-order preservation (§8.6) — closes the blind spot where `ladder.css` 510 / `surfaces.css` 508 / `shell.css` 524 breach 500 uncounted while `index.css`'s own header falsely asserts "each < 500."

**G3 — `proof:depth` (new):** the T2 cap — no segment dir under a segment dir (unless the inner carries an `index.ts` → recursion reset); depth beyond ≤5 below the nearest feature/component root needs a recorded rationale. *(Prototyped: `proof-depth.mjs`, self-test 5/5.)*

**G4 — `proof:import-boundaries` (new — the PROMOTE end of the divining rod).** The 4-node DAG (`shared → components → subpath-entries → app`); the subpath-entry layer reaches both directions, `composables/` never reaches `components/` (except the `export *` aggregator publish carve), no cross-component reach into another component's GUTS, one-barrel public API with the deep-leaf subpath exemption (B4). **Born-RED on HEAD with 28 cross-component guts reaches** (§1.5 — the PROMOTE driver: `aurora/constants/budget.ts` reached by 7 viz families, `procedural-color.wgsl.ts` by 6, the curlFBM `levelField`→`liquidGrid` case, the dock tail). Self-test bites: a `composables/`→`components/` edge REDs; the aggregator `export *` re-export PASSES; a subpath-entry deep-leaf re-export PASSES; a cross-component guts reach REDs; a component reaching its OWN guts / composing a sibling via barrel PASSES; a component reaching the subpath-entry sink REDs. Scope-extends to the product-app DAG (§4P.4, unifying speedtest's `check-internal-boundaries.mjs`). *(Prototyped: `proof-import-boundaries.mjs`, self-test 9/9, FAIL on HEAD by design.)*

**G5 — location-vs-publish orthogonality:** physical location by G1's family clause; publish surface by the SCC/heavy-peer discipline. A colocated PUBLIC composable is never flagged for being public.

**G6 — the CSS pair (§2.6):**
- **`proof:css-colocation` (new, the TARGET gate):** every colocated `components/<n>/styles/*.css` flattens to a UNIQUE `dist/styles/` target (no clobber across families); a family's subdir partials stay within its `styles/` dir; the build's component-styles walk reaches every `src/components/**/styles/` dir; a golden sorted-hash manifest of the shipped `/styles` reds any byte drift. Gates the physical-colocation ruling of the ~14 clean families.
- **`proof:css-ownership` (the interim/cross-coupled gate):** every component-specific `src/styles/*.css` that STAYS global (cross-coupled or interim) names its single owner via a `README OWNER:` / header field that RESOLVES to a real component dir; a no-single-owner recipe stays owner-less (a global file claiming an owner REDs). *(Prototyped: `proof-css-ownership.mjs`, self-test 5/5, born-RED until OWNER: headers land.)*

**G7 — the enforcement-corpus migration meta-gate (`proof:no-tier-literal`).** After the flatten wave, assert ZERO surviving `components/(ui|custom)/` literal in `scripts/`. The flatten codemod (re-root `proof-colocation`, drop-segment the 838 literal paths, rewrite RATCHET keys, `ui/tabs→tabs/reka` override) lands ATOMICALLY in the same wave. `proof:no-tier-literal` (`["local","ci"]`, device-free, skip-self, 7-fixture self-test + anti-evasion bite) is born-RED 838→GREEN 0 across the migration — the STANDING witness the corpus can never silently re-couple to the dead tier. *(Proven executable: run GREEN in the isolated worktree — CODEMOD-SPEC §3-4.)*

**G8 — constellation propagation:** gate SCRIPTS live per-repo (each sibling carries the transposed set — the product-app G4 binds the `api → stores → views/features → app` DAG; a backend sibling binds its language's line/format norm §5.2); the SPEC (this doc, promoted to the precepts submodule) is the single source.

---

## §7 Migration posture — clean break, gestalt transposition

- **No legacy, no aliases.** The flatten, the FOLD/PROMOTE shared-tree reshape, the CSS physical colocation, the demo tri-partition, the §4-PRODUCT graduations are MOVES — position-preserving where the byte-identical-carve applies (CSS partials, source-order ties), gestalt-reshaping where structure demands. No compat shim survives a fold.
- **The named migration instrument (the HYBRID, proven).** For **{src, tests}** (both mirror-trees, all-relative, `@glass` 0×) — resolve-and-recompute the RELATIVE imports (proto2-proven green over 500 files; execution-proven over 358 src + 210 demo/tests, typecheck exit 0). For **demo** (`@glass/components/{ui,custom}/*` absolute alias) — a segment-drop (the alias itself untouched). For the **enforcement corpus** — one uniform `dropSegment` pass (re-root + literal-path drop + RATCHET-key rewrite + `ui/tabs→tabs/reka` override), landing atomically (G7). The move-map is **`{src/components, tests/components}` flatten atomically; demo rides the alias** — a codemod that flattens src but skips the tests mirror is a broken half-migration (proven: 3-file corruption).
- **"Zero churn" corrected concretely:** zero PUBLIC-EXPORT churn (the `@mkbabb/glass-ui/*` subpath surface is `src/*.ts` entry files, untouched; 0 package.json keys) + ~568 internal file rewrites + 218 scripts + ~91 dir moves. Honest, not asserted-away.
- **Chunk-graph churn — MEASURED gate-neutral (the [R2] tag DROPPED).** The reshape delta is **+29 gzip TOTAL** across the 190-chunk dist (0.007%): the two folds add +14/+13 to their D5-EXEMPT shared chunks (`useDockCtaReceive`, `useSortable`), every other chunk byte-identical; the flatten is **+0 gzip** (entry count preserved — `libraryFileName` keys dist filenames on the ENTRY NAME, decoupled from source path). Gate verdicts BYTE-IDENTICAL before/after. **The execution constraint:** the sortable fold's root-barrel re-export MUST target the deep composables leaf (`./components/custom/sortable-list/composables`), NEVER the component barrel (which would drag the SFCs onto the root barrel's eager graph). Named failure mode recorded. *(Caveat: `profile:budget` is ALREADY RED at HEAD on PRE-EXISTING causes — goo-blob ceiling breach + stale AP D5 baseline — owned by the BG close-battery, ORTHOGONAL to the reshape; the joint 5.0.0 cut must resolve them, but the reshape is not blamed for or blocked by them.)*
- **Whole-tree, not incremental.** Edict 8 is the cadence: the census (done) is the examine pass; execution re-examines each file at the move.
- **[R3]** whether the flatten is the moment to migrate src onto `@glass/*` too (so future structural moves stop rewriting import strings — the import-mechanism-incoherence point). Deferred; the resolve-and-recompute instrument works without it.
- **Sequencing:** this reshape is a `src/` + `demo/` + `scripts/` + build-plugin write-set; sequences AFTER the owning BG waves per the BH interleave protocol, lands in the joint 5.0.0 cut. The CSS build-plugin extension (§2.6) and the graduation folds (§4P.5) are gated execution sub-waves with their own born-RED proofs. The `/api` drop is orthogonal (its own track).

---

## §8 Settled matters (restated, NOT reopened)

1. The 500-line no-god-module ratchet exists, drains to ∅, counts **RAW lines**, and has NO permanent length exemption — only shader-literal + data-manifest single-artifact carves (§1.3). The spec unifies its file-type coverage (§6 G2).
2. `proof:colocation` exists (4 clauses). The spec extends it (§6 G1); the clauses stand.
3. The ≥2-consumer visual-load-bearing invariant (J-inv-10) is the promotion bar; generalized to non-visual leaves (T3) with a decidable count that runs BOTH directions (§1.5).
4. The SCC / heavy-peer publish discipline is preserved and ORTHOGONAL to physical location (§2.5, 4-node DAG). Publication is a publish-signal, not a location-signal.
5. The clean-break / no-back-compat law, presets-in-consumers, byte-identical-carve are the migration constitution (§7).
6. The load-bearing `index.css` cascade order (@layer + source-order ties, sole-writer partials) is INVIOLATE; CSS colocation is a pure source-tree reorganization with a byte-identical published cascade (§2.6).
7. `subpaths/` glob-batch generation is an accepted mechanical exception — kept.
8. The Vue `composables/` essence-name is a deliberate, recorded divergence from FSD — kept (§2.4); `views/` (not FSD `pages/`) is the parallel product-app divergence (§4P.2).
9. FLATTEN `ui`+`custom` is settled (edict 5, §3); the codemod is proven executable; `ui/tabs → tabs/reka` is the sole non-uniform case.

---

## Appendix A — worked examples (verified)

**A1 — The dock split-brain (the FOLD census, verified).** Of the 8 shared-tree composables the round-1 draft named "dock-only," exactly ONE folds:

| Leaf | Verdict | Reason (verified) |
|---|---|---|
| `useDockCtaReceive` | **FOLDS → dock/composables/** | dock-purpose; no sibling-import edge (`useBloomUp`/`useElementMorph` mentions are COMMENTS); dock already re-exports it. |
| `morphSignatures` | STAYS shared | `MORPH_SIGNATURES` imported by sibling `useGooMorph` + root barrel. |
| `useScrollTo` | STAYS in sidebar | sidebar-family leaf composed by sibling `useClickDelegate`/`useLazyLoader`. |
| `useLiquidReveal` | STAYS shared | bloom-family root; on `/motion` + `/api`; dock is one of ≥2 reaches. |
| `useScrollTrigger` | STAYS shared | composed by sibling `scrollReader`/`useScrollChrome`. |
| `useScrollChrome` | STAYS shared | scroll-reader family; on `/api`. |
| `useBloomUp` | STAYS shared | app-global demo `AppShell.vue` route bloom + composed by sibling `useElementMorph`. |
| `useGlassBackdropLuminance` | STAYS shared | glass adaptive family; composed by sibling `ambientHueHistogram`/`backdropSampleMath`. |

The fold's `/motion` re-export targets the deep leaf `../components/dock/composables/useDockCtaReceive` via the `src/motion.ts` subpath-entry (§2.5, B4), never the dock barrel.

**A1′ — The PROMOTE census (the round-2 mirror — the 28 buried primitives).** `proof:import-boundaries` born-RED drivers (§1.5): `aurora/constants/budget.ts` (7 viz families) → shared viz/glass leaf; `aurora/constants/shaders/procedural-color.wgsl.ts` (6 sibling shaders) → `composables/glass/webgl/shaders/` beside its GLSL twin; `concentric/composables/levelField.ts` reached by `liquid-grid` (curlFBM) → shared field operator; the dock tail completes the 28. Each drains OUT to the shared tree via a `components→shared` UP edge; the reaching siblings re-point to the new shared home.

**A2 — The single-family subtree.** `composables/sortable/` (860L, sole consumer `sortable-list/`) → `sortable-list/composables/`, root-barrel re-export via the DEEP composables leaf (chunk-graph measured neutral, §7). `/virtual` + `/sidebar` (0 in-repo consumers) STAY module-level (T3a).

**A3 — The god-SFC family asymmetry.** `blob.vue` (875L) + `constellation.vue` (759L) → feature dirs like their sibling `aurora/`.

**A4 — The atomization cluster.** `labeled-field/` 5 `Labeled*` wrappers → ONE generic + typed control slot.

**A5 — The provenance flatten.** `components/{ui,custom}/*` → `components/*` flat peers, `ui/tabs→tabs/reka`, machine-locked README domain-map, zero EXPORT churn (§3, §7).

**A6 — The §4-PRODUCT graduation (speedtest).** `admin`/`dashboard`/`survey` GRADUATE from scattered app-global-layer presence into `features/<domain>/{ui,state,api,composables,index.ts}` slices; the app-global `components/`/`stores/`/`api/`/`views/` keep only cross-cutting members. `design/`→`styles/`; `App.vue` 833L carves to `useAppProviders` + `layouts/`; `Dock.vue` 774L → `components/dock/`.

---

## Appendix B — the round-2 [R2]→resolved ledger

| [R2] directive | Resolution | Evidence |
|---|---|---|
| §2.6 CSS physical move | **ADOPT physical colocation** (~14 clean families) via source-colocate + flatten-on-publish; cross-coupled stay documented-ownership | byte-clean measured: `diff dist/styles` exit 0, hash-parity, JS-invariant; ~12-line `copyStyleAssets` walk |
| §4-PRODUCT twin | **AUTHORED** (§4-PRODUCT) — proportion-collapsed FSD, domain-graduation predicate, views/api/styles/config rulings | speedtest/words/slides/sci-report census; FSD/Pinia SOTA |
| Chunk-graph delta | **RESOLVED gate-neutral** (+29 gzip total, +0 flatten); deep-leaf re-export constraint | isolated worktree build, gate verdicts byte-identical |
| B9 tabs collision | **CONFIRMED** `ui/tabs → tabs/reka` (named sub-component group) | `comm -12` = `tabs` sole case; executable form proven |
| B10 over-500 exemption | **REJECTED for file length** (ratchet only); god-FUNCTION metric adopted as per-language advisory | edict 7 |
| B12b mixed-kind heuristic | **ADVISORY, not a gate**; the machine-lockable substitutes (README map + depth + import-boundaries) cover it | not decidable from filenames |
| The 4 new gates | **PROTOTYPED**, born-RED on HEAD, self-tests firing | `proto-gates/` (6/6, 5/5, 9/9, 5/5) |

*Remaining **[R3]** items are execution-prototype confirmations (survey-graduation fold + route-weight; the reka home ratify; the source-CSS-@import audit; the src→`@glass` migration; the store-cluster-vs-graduation edge), NOT open design questions. The design is settled; execution proves the folds.*
