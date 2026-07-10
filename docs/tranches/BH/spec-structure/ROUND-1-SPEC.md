# The Constellation Structure Standard — Round 1 Spec Draft

**Status:** synthesis round 1 (folds the 8-agent research into one law). Later rounds refine; nothing here is final except the settled-matter restatements in §8.
**Scope:** ONE structural grammar for every repo in the constellation — glass-ui (the library) + its sibling demo/consumer apps + the polyglot backends. Frontend and backend bound under one law, each language binding its own idiomatic norms.
**Constitution:** the user's edicts (verbatim in §0). Aristotelian proportion is the divining rod; colocation is recursive; no god-modules, no needless encapsulation; clean break, no legacy.

---

## §0 The constitution (edicts, restated as binding)

1. ONE standard for component/module structure covering BOTH frontend and backend, for the WHOLE constellation. One coherent spec they all follow.
2. **Aristotelian proportion is the divining rod.** Needless encapsulation and excessive granularity are vices; god-modules are the opposite vice. The MEAN divines components, nested/recursive components, modules, directories.
3. **Colocation, recursively.** A component lives WITH its sub-components, composables, skeletons, constants, styles, shaders, README — and this recurses for nested components. Only truly module/global-level kin live in a shared home.
4. Long-running dirs ALWAYS break into common modules, encapsulated befittingly.
5. Settle with evidence: FLATTEN the `components/ui + components/custom` two-tier for readability, or not? What is SOTA (2025-2026)?
6. Backend gets the SAME treatment + enforcement, abstracted per language.
7. NO quick solutions, NO workarounds. Idiomatic, gestalt approaches. Architectural transposition for elegance, simplicity, performance. NO legacy code, no back-compat aliases.
8. Every file, component, style examined, then RE-examined.

---

## §1 The Law of Aristotelian Proportion

> The mean is not a number. It is the answer to one question asked of every module: **does everything in here belong together, and is anything that belongs together kept apart?** The thresholds below are the guardrails that catch a module drifting toward either vice — they are not the law itself. The law is cohesion.

### §1.1 The two vices, named

| Vice | Name | The failure |
|---|---|---|
| **Excess** (too little division) | **God-module** | A file/dir holds >1 concern; things that change independently are fused; a reader must hold the whole file to understand any part. |
| **Deficiency** (too much division) | **Atomization** | A concern is shattered across many tiny modules; an abstraction is minted before ≥2 real consumers exist; the reader runs a "scavenger hunt" (Maestros) across folders to assemble one behaviour. Premature abstraction is *more* harmful than the duplication it removes (Transcend/Better-Programming). |

Both are documented industry failure modes. Layer-by-TYPE (`controllers/ models/ utils/`) is the god-module's structural cousin (scatters one feature across type-folders); over-colocation is atomization's. The spec forbids both.

### §1.2 The unit: the component FOLDER

The atomic module is the **per-component folder with an index barrel** — reka-ui's Combobox (17 files) and its Button-equivalent (2 files) are the SAME unit at different scales; the folder scales with the concern, the barrel is invariant. This is FSD's *slice*, bulletproof-react's *per-feature dir*, and Josh Comeau's *component-folder-with-index* — one convergent unit across every reference architecture. glass-ui already runs it in `custom/`. The spec canonizes THIS unit as universal (frontend and backend) rather than inventing a taxonomy.

**Colocation is the default; promotion to a shared home is the exception that must be earned** (§2.4). This single directionality — *local until proven shared* — is the spine every source encodes (Kent Dodds "close as reasonable", LoB "obvious from the unit alone", FSD "not everything needs to be a feature", bulletproof `shared → features → app`).

### §1.3 The thresholds (guardrails, with rationale)

**T1 — File size. Hard ceiling 500 lines; soft target ~300; the real test is cohesion.**
- 500 is the house-native ratchet (`proof:no-god-module`, `HARD_LIMIT=500`). It is defensible: ESLint `max-lines` defaults 300, sane range 100–500.
- BUT the sources warn a hard number becomes a *target* ("code bases fill up with files that go right up to the limit" — ESLint docs). So 500 is a **fail ceiling**, ~300 an **advisory soft target** (warn, not fail), and a file *under* 500 is still a violation if it fuses >1 concern (cohesion, not the number, is the law).
- **Shader-literal exemption** stays: a single cohesive `*.{glsl,wgsl,frag,vert}.ts` string is ONE artifact — splitting it corrupts the assembled shader (the byte-identical-carve fence). Exempt from the line gate, governed by cohesion alone.
- **Data-manifest exemption** (T1a): a single-source DATA manifest that N gates parse by literal path (demo `stories/manifest.ts`, 1406L) may exceed 500 *as data* IFF its pure resolution/logic machinery is carved out (the `manifest/lazy.ts` precedent). Registered, named — not silent drift.

**T2 — Directory depth. Colocation nests at most ONE segment level below a component root; recursion resets the budget.**
- SOTA: readers lose context past 3–4 levels; FSD caps at EXACTLY 3 (Layer→Slice→Segment). Deep single-inheritance trees are fragile and punish shared mental models (getsort.io, karl-voit).
- **Rule:** within one component root, the tree is `root → {segment dir} → file`. A segment dir (`composables/ shaders/ skeleton/ styles/ sections/`) holds files, NOT other segment dirs. A nested SUB-COMPONENT (a child with its own multi-file structure) is a NEW component root that RESETS the local budget — this is how recursion (edict 3) stays legal without unbounded depth. A global sanity cap (~5 dirs below `src/components/` without a recorded rationale) catches runaway recursion.
- Aurora demo dir (`aurora/ → config/ → *Layer.vue`) is exactly conformant: root → segment → file.

**T3 — Promotion to the shared tree. ≥2 UNRELATED families, or a public-subpath external-consumer exemption.**
- The house's ≥2-consumer visual-load-bearing invariant (J-inv-10) IS this rule; the structure spec extends it to every non-visual leaf (composable, util, type, style). A leaf graduates to the shared tree when it has **≥2 unrelated in-repo families** as consumers (count FAMILIES, not call-sites within one family). Below that, it colocates under its sole owner.
- **Exemption (T3a):** a leaf that is a PUBLISHED subpath surface with a recorded external (cross-repo) consumer stays module-level at 0 in-repo families (`/virtual`, `/sidebar` — public families whose consumers live in sibling repos). This is a distinct clause from the in-repo family count, machine-checkable against `docs/consumer-evidence/`.
- Census fact: only ~10 composables clear ≥3-unrelated-families today (`usePointerVelocityField`, the motion suite, `useLiquidFlex`, `useResizeObserver`, `useSpringPress`, `useSpring`, `vSpecular`, `useGlobalDark`, `useIntersectionPause`, `SPRING_PRESETS`). Everything else in the shared tree is a colocation candidate. The spec draws the bar at **≥2** (aligned to inv-10) but records that ≥3 is the natural cluster.

**T4 — Segment minimum-substance. A segment dir must justify itself.**
- A `composables/` holding one file, a `constants.ts` holding nothing, an empty `shaders/` — these are atomization. The "if needed" clause is literal: a segment appears ONLY when it has real members OR a genuinely-separable concern. A lone component-local composable stays a sibling file at the component root until a second colocated composable earns the `composables/` dir.

### §1.4 Both-direction violations, decidable

A reviewer or a gate can name the vice:

**God-module (excess) — any of:**
- file >500 logic lines (non-shader, non-data-manifest);
- a dir mixing >1 domain/concern with no sub-grouping;
- a flat dir with >~7 sibling files of MIXED kind (page vs helper vs shared) with no separation;
- layer-by-type at the top level (`controllers/`, `services/`, `models/` as app-global dirs);
- a grab-bag (`utils.ts`, `helpers.go`, `common.py`) accreting unrelated leaves.

**Atomization (deficiency) — any of:**
- a shared-tree resident with <2 unrelated families and no external-consumer exemption;
- a segment dir with a single trivial member (T4);
- a wrapper module that only re-passes its inputs (labeled-field's 5 near-identical `Labeled*` SFCs → one generic + typed slot);
- a composable/util extracted before its 2nd consumer exists;
- ceremonial nesting a mechanical generator could produce (hand-authored, not glob-batched).

---

## §2 The recursive component-dir schema (frontend)

### §2.1 The atomic unit
```
components/<name>/
  <Name>.vue                 # the component (the root SFC)
  <SubName>.vue …            # sibling sub-components (flat until they earn their own dir)
  index.ts                   # THE public API barrel — the ONLY import surface (feeds the subpath)
  constants.ts               # magic numbers/enums (when ≥1 exists; proof:colocation clause b)
  README.md                  # the colocation-adoption marker AND the human map (mandatory when complex)
  composables/               # component-LOCAL composables (when ≥2, or one genuinely separable)
  shaders/                   # *.glsl.ts / *.wgsl.ts (when present)
  skeleton/                  # loading skeletons (when present)
  styles/                    # component-OWNED CSS (see §2.6)
  sections/                  # nested sub-component group (when a story/component decomposes — aurora model)
```
The barrel `index.ts` is the invariant. It is what the flat subpath export (`@mkbabb/glass-ui/<name>`) re-exports, so the export surface is DECOUPLED from internal layout (PrimeVue/base-ui/ark proof: `./componentname` is independent of grouping). A trivial 2-file component keeps the folder+barrel (needed for the subpath; reka does this uniformly) — the folder is not the granularity vice, an empty segment dir is.

### §2.2 What colocates (the default)
Everything a component OWNS: its sub-components, its component-local composables, its constants, shaders, skeletons, styles, README. Kent Dodds/LoB: things that change together live together; a component-specific composable read only by that component is NOT module-level and must NOT sit in the shared tree.

### §2.3 Recursion
A sub-component that grows its own multi-file structure becomes a nested component root under the parent (or under `sections/`), with its own `index.ts`, its own local `composables/`, its own README if complex. Aurora (demo) is the gold standard: `aurora/` root + `config/` (5 `*Layer.vue` + `options.ts` + `usePaletteStops.ts`) + `sections/` (3 `*Section.vue`) + `presets.ts`. Each nesting RESETS the depth budget (T2).

### §2.4 The shared tree — what earns a module-level home
`src/composables/` holds ONLY leaves clearing T3 (≥2 unrelated families) — the ~10 genuinely-global motion/glass/dom primitives. Its sub-trees (`motion/ glass/ dom/ dark/ reactive/ context/ …`) are the shared homes; a leaf lives there because it is *proven* cross-family, not because it is a composable.

**The Vue-idiomatic divergence (recorded, deliberate).** FSD names segments by PURPOSE (`model/ lib/ api/`) and warns against essence-names (`hooks/`, `components/`). glass-ui and the Vue ecosystem use `composables/` — an essence-name. The spec KEEPS `composables/` (ecosystem consistency wins; the whole Vue world reads it) and records this as a documented divergence from FSD, not drift. Backend, having no such idiom, uses purpose-names (§5).

### §2.5 Location vs publish-surface (the orthogonality ruling — the flagship fix)
These are TWO axes the current tree conflates:
- **Physical location** is governed by T3 (family count). A dock-only composable lives under `dock/composables/`.
- **Publish surface** is governed by the SCC / heavy-peer discipline (a keyframes.js/value.js-bearing leaf stays OFF the vueuse-free root barrel; it ships via a curated subpath).

**These do not couple.** A dock-named PUBLIC primitive (`useDockCtaReceive`, `morphSignatures`, `useLiquidReveal`) MUST physically colocate under `dock/composables/` AND be re-exported through its curated subpath (`/motion`). "Must ship on `/motion`" does NOT mean "must physically live in `composables/motion/`". The current tree bisects the dock engine (21 colocated + 8 shared-tree dock-only composables) because it read publish-surface as location. **Fix:** every sole-dock composable folds into `dock/composables/`; the `/motion` barrel re-exports the public ones from there. Same for `composables/sortable/` (860L, sole consumer `sortable-list/`) → folds under `sortable-list/`.

### §2.6 Styles / CSS — colocate the owned, respect the load-bearing cascade
The census found glass-ui's ONE live colocation MISS vs SOTA (Vuetify colocates `VBtn.sass`, PrimeVue colocates `style/`): component-SPECIFIC CSS (`dock/*.css`, `border-progress.css`, `cta-seat.css`, `feedback-tone.css`) lives in the GLOBAL `src/styles/` tree.

**The ruling — two ordering authorities, one per level:**
1. **Component-owned CSS colocates** under `components/<name>/styles/` (or a thin `<name>.css` root + partials). Test: does exactly ONE component own this CSS? → colocate. Applies the ≥2-consumer promotion rule to the CSS axis.
2. **Genuinely-global cascade stays in `src/styles/`**: the token cascade (`tokens/`), the 5-rung glass ladder (`glass/`), typography, theme, and any recipe no single component owns.
3. **The central `index.css` remains the SINGLE INTER-component ordering authority.** It @imports every rung — including colocated component CSS, at its correct rung position (`../components/border-progress/styles/border-progress.css`) — preserving the load-bearing order (menu.css after utilities so `.glass-menu-row` @layer hover wins; `glass/rim.css` after `ladder.css` as sole `--glass-material-rim` writer). A component's own thin-root is the authority for its INTRA-component partial order.

Physical colocation + central ordering manifest. The cascade order is untouched; only the files' HOMES move.

---

## §3 VERDICT — flatten `components/ui` + `components/custom`

**FLATTEN.** Merge into ONE `src/components/` of domain-organized per-component folders as flat peers. No provenance tier, no dead markers.

### The evidence (unanimous for owned libraries)
Every component library that OWNS its components keeps all components as **flat peers in one dir, no vendored-vs-house tier**:
- **reka-ui** (glass-ui's own substrate): ~70 flat component folders + one `shared/` hoist dir. No ui/custom split.
- **Base UI** (MUI, v1 Feb 2026): per-component folder, shared hoisted to `utils/ internals/`. No split.
- **Ark UI**: ~70 flat folders + shared `factory.ts`/`anatomy.ts`. No split.
- **PrimeVue** (80+), **Vuetify**: flat per-component folders, styles colocated. No split.

The two-tier (and 2026 three-tier `ui/ → primitives/ → blocks/`) is EXCLUSIVELY a shadcn-CONSUMER pattern whose sole rationale is **protecting vendored copies for safe `npx shadcn add` re-pull**. That rationale is DEAD here — the census found glass-ui's `ui/` is heavily forked (glass-first Button, AX.W54 canon; ~100% drift). BH's own PLAN §1 fact-4 concedes it: *"shadcn-vue `update` is correctly NOT a maintenance path (the glass diff is ~100% drift)."*

### Addressing the standing counter (BH PLAN framing-decision #2 kept the split)
The prior lock justified the split as "the service boundary that keeps it updatable / reka's semver is the real upstream track." This is undercut by its own fact-4 and by a category error: **reka is a peer DEPENDENCY, not vendored source.** Tracking reka's semver is a `package.json` bump, not a directory tier. Nothing in the two-tier is load-bearing for that. The user has explicitly REOPENED this question as an evidence-settle (edict 5); the evidence supersedes the earlier lock. The PLAN's own `@glass` alias already anticipated a rename as "a one-line target change" — the flatten is that change, taken fully.

### Why not re-base on primitive-vs-composite (the general-SOTA agent's middle)?
No owned library splits on that axis either — they let the folder's contents signal complexity (reka Combobox 17 files vs a 2-file wrapper, same tier). Re-basing reintroduces a taxonomy the reader must learn (the single-inheritance folder problem). The demo corroborates: it has NO ui/custom split and reads cleanly grouped by concern; its readable grammar is "group by concern/feature, not by provenance."

### The reshape (a pure move, zero export churn)
- `src/components/ui/*` + `src/components/custom/*` → `src/components/*` (flat peers).
- `_shared/` (ModalOverlay, menuItemVariants CVA) stays — it is a real ≥2-consumer shared-primitive home WITHIN components.
- Subpaths are unchanged: they already abstract physical path (`subpaths/button.ts` → `../components/button`). PrimeVue proves the export map is independent of grouping. package.json `exports` untouched.
- **Domain map lives in `components/README.md`** (documentation, not directories) so a reader gets the forms/feedback/overlay/viz grouping without a taxonomy tree the subpath surface would fight.
- **No provenance markers.** Per greenfield-no-meta + no-legacy: components are forked and owned; carrying "originated from shadcn" as a live tier or a dead comment is exactly the meta-cruft the edicts forbid. If a FUTURE component is kept in active upstream-sync, it earns a marker as a LIVE contract at that time — none qualifies today.

### The residual proportion pass the flatten enables
Once flat, the census violations get their gestalt fix on the same axis (no ui/custom asymmetry to preserve): `timeline/` (2274L, `geometry.ts` → `composables/`, add README), `configurator/` (`useConfiguratorState` → `composables/`, add README), the 500-breaching logic files (`useGlassBackdropLuminance` 554, `DockLayerGroup` 524, `GlassDock` 515) carve by cohesion, and `labeled-field`'s 5 wrappers collapse to one generic.

---

## §4 The demo-application grammar (every constellation app)

The demo's post-BH.B3 restructure is 80% the right grammar; the spec canonizes it as the fixed skeleton EVERY demo/consumer app follows, and names the residual violations as the born-RED targets.

### §4.1 The fixed 5-tier skeleton
```
<app>/
  App.vue · main.ts · router.ts        # entry
  shell/                                # app chrome (AppShell + nav docks + shell composables + shell CSS)
  chassis/                              # demo-private PRESENTATION primitives (content COMPOSES, never re-authors)
  stories/ (or pages/)                  # one dir per IA category
    <category>/
      <story>.vue                       # a manifest row (kebab-case)
      _shared/                          # category-scoped chassis (≥2 stories, one category)
      <story>/                          # per-story dir for PRIVATE (1-consumer) helpers
    manifest.ts                         # the single SSOT wiring stories → routes → nav
```

### §4.2 The colocation ladder (the recursive spine, applied to demo scope)
| Consumers | Home |
|---|---|
| story-PRIVATE (1 story) | nest under `stories/<cat>/<story>/` |
| category-SHARED (≥2 stories, one category) | `stories/<cat>/_shared/` |
| CROSS-category | top-level `chassis/` |
| app-GLOBAL | `shell/` or root |

*Lift when shared, nest when private.* The demo proves both the WIN (aurora feature dir, configurator engine split) and the FAILURE (`Scroll*Body`/`Timeline*Body`/`SiriWaveform` single-consumer helpers flat at category level instead of nested; `curve-families.ts`/`fourier-paths.ts` likewise).

### §4.3 The tri-partition rule for a category dir
A category dir carries at most three location-distinct zones so a reader tells page from helper by LOCATION alone: (a) story SFCs at root (manifest rows), (b) `_shared/` for category chassis (`DockStage`, `VizStudio`, `DockExampleTile`), (c) per-story `<story>/` dirs for private helpers.

### §4.4 The closed subtype taxonomy
Every demo mints a CLOSED presentation-subtype taxonomy (stage / specimen / interaction / matrix / composition) so N pages read as ONE product with natural variation — and it lives in its OWN `chassis/subtype/` dir (fixing the current loose-at-`chassis`-root violation; the taxonomy folder is itself subject to the recursive rule).

### §4.5 God-SFC escalation
A story tripping the ratchet becomes a feature dir (the aurora model). Symmetric treatment across a family is MANDATORY: `blob.vue` (875L) and `constellation.vue` (759L) cannot stay monoliths while their sibling `aurora.vue` is a 17-file feature dir. Same class, same treatment.

### §4.6 The barrel-vs-deep-path idiom (settle it)
118× deep `StoryPage.vue` imports vs a near-dead `chassis/index.ts` is the drift. ONE rule uniformly: either canonize deep-path SFC imports and drop vestigial barrels, OR require every chassis sub-dir to publish an `index.ts` consumers import from. Recommendation: **deep-path for demo-private SFCs** (no external surface to protect; the barrel is ceremony), **index barrel for anything a sibling app consumes**.

---

## §5 Backend transposition (language-abstracted)

The won principles are language-agnostic; only the line/format norm binds per-language. ONE grammar, per-language befitting notes.

### §5.1 The grammar (identical shape to frontend)
- **Domain/feature PACKAGE** = the backend analogue of the component folder. Named by DOMAIN, not by technical layer.
- **By-PURPOSE segments within it:** `api/` (routes/handlers/controllers — the transport edge), `model/` (domain types, data, business rules), `lib/` (pure helpers). Colocate the handler + model + logic FOR one domain TOGETHER.
- **Shared home** (`shared/`, `core/`, `common/`) ONLY for truly-global — the same ≥2-unrelated-DOMAINS promotion bar (T3).
- **Reject layer-by-type at the top level.** `controllers/ + services/ + models/` as app-global dirs is the backend twin of the FE ui/custom-provenance vice AND the scavenger-hunt failure mode — the same "screaming architecture" verdict transposes: group vertically by domain, not horizontally by type.
- **No grab-bags.** A `utils.py`/`helpers.go`/`common.ts` accreting unrelated leaves is a god-module. Split by cohesion into named lib leaves.
- **Depth (T2), import discipline, recursion** — identical: unidirectional (`shared → domain → app/entry`), no cross-domain imports except via a package's public API, long dirs break into sub-modules.

### §5.2 Per-language befitting notes (each ratifies its own number under the one grammar)
| Language | Module/file ceiling | Function norm | Idiom notes |
|---|---|---|---|
| TypeScript (backend) | 500 (same ratchet) | short, cohesive | ESM subpath exports; `import type`; barrels per package. |
| Python | ~300–500 module lines | Google ~40-line funcs | package = domain dir with `__init__.py` public API; `model.py`/`api.py`/`lib/` by purpose; no `utils.py` grab-bag. |
| Go | package-per-domain (Go-idiomatic) | short funcs (kernel ~48 ref) | one package = one domain; `gofmt` owns format; exported identifiers ARE the public API (no barrel needed). |
| Rust | module-per-domain | short | `mod.rs`/`lib.rs` public re-export = the barrel; `pub` = public API. |

The NUMBER is per-language (Google 40 / kernel 48 are function-length reference points; module ceilings track the language's convention). The GRAMMAR (domain-vertical, by-purpose segments, promote-shared-at-≥2, shallow depth, no grab-bags) is constellation-wide.

---

## §6 Enforcement — how the `proof:*` gates evolve

The house already machine-locks structure (`proof:colocation`, `proof:no-god-module`). The spec EXTENDS them; it does not invent a parallel regime.

**G1 — `proof:colocation` extends (frontend + demo).**
- KEEP the README-marker binding (a complex dir gains coverage the moment it adds its README — self-adopting, un-gameable).
- ADD the **globality clause** (T3): a composable/util/type/style in the shared tree must have ≥2 unrelated in-repo families OR a recorded external-consumer subpath exemption. Machine-checkable via the family-extract grep the census already ran (`grep -rlE '\bSYM\b' components | family-extract | distinct-count`).
- ADD the **no-empty-segment clause** (T4): a segment dir must have ≥1 substantive member.
- SCOPE-EXTEND to `demo/` (currently `src/`-only) — the demo's god-SFCs survive precisely because it is un-gated.

**G2 — `proof:no-god-module` unifies across `.ts` / `.vue` / `.css`** (shader-literal exempt), ONE `HARD_LIMIT=500`, a `~300` advisory soft-target (warn, not fail — guards against the ceiling-becomes-target trap), and a registered **data-manifest exemption** (T1a). Closes the blind spot where CSS partials (`ladder.css` 510, `surfaces.css` 508, `shell.css` 524) breach 500 uncounted.

**G3 — `proof:depth` (new):** the colocation depth cap (T2) — no segment dir under another segment dir; a recursion beyond the sanity cap needs a recorded rationale.

**G4 — `proof:import-boundaries` (new):** unidirectional flow (`shared → components → app`) + no cross-component imports (bulletproof `import/no-restricted-paths`) + one-barrel public API (FSD public-API rule). Implemented BOTH ways: an ESLint `import/no-restricted-paths` config for the dev inner-loop, a `proof:*` gate for the close-battery.

**G5 — location-vs-publish orthogonality:** physical location governed by G1's family clause; publish surface governed by the existing SCC/heavy-peer subpath discipline. Two orthogonal gates; a colocated PUBLIC composable is never flagged for being public, and a subpath barrel is a pure re-export of the deep colocated path.

**G6 — constellation propagation:** the gate SCRIPTS live per-repo (each sibling carries the transposed set), the SPEC (this doc, promoted to the precepts submodule) is the single source. A backend sibling binds its language's line/format norm under the one grammar (§5.2) and runs the domain-vertical / no-grab-bag / depth / import-boundary checks in its own toolchain.

---

## §7 Migration posture — clean break, gestalt transposition

- **No legacy, no aliases.** The ui/custom flatten, the shared-tree colocation folds, the CSS homings, the demo tri-partition are MOVES — physical, position-preserving where the byte-identical-carve discipline applies (CSS partials), gestalt-reshaping where structure demands it. No compat shim survives a fold.
- **Whole-tree, not incremental.** Edict 8 ("examine, then re-examine") is the migration cadence: the census (done, this round) is the examine pass; execution re-examines each file at the move. This is a gestalt transposition for elegance/simplicity/performance, not a patch stream.
- **Export surface is stable through the reshape.** The subpath layer already decouples physical path from public path; the flatten + colocation folds change zero package.json keys. The one deliberate 5.0.0 break (drop `/api`, per BH PLAN framing-decision #2) is orthogonal to this structure spec and proceeds on its own track.
- **Sequencing:** this structure reshape is a `src/` + `demo/` write-set — it sequences AFTER the owning BG waves per the BH interleave protocol (PLAN §3), lands in the joint 5.0.0 cut.

---

## §8 Settled matters (restated, NOT reopened)

These are house invariants the spec BUILDS ON; they are not up for debate this round:
1. **The 500-line no-god-module ratchet exists** and drains monotonically to ∅ (RATCHET_BASELINES). The spec unifies its file-type coverage (§6 G2); it does not abolish the number.
2. **`proof:colocation` exists** with its 4 clauses (composables-under-`composables/`, `constants.ts` magic-number fence, `shaders/`/`skeleton/` when-present, README). The spec extends it (§6 G1); the clauses stand.
3. **The ≥2-consumer visual-load-bearing invariant (J-inv-10)** is the promotion bar. The spec generalizes it to non-visual leaves (T3); the bar is unchanged.
4. **The SCC / heavy-peer publish discipline** (vueuse-free root barrel; keyframes/value.js-bearing leaves ship via curated subpaths) is preserved and declared ORTHOGONAL to physical location (§2.5).
5. **The clean-break / no-back-compat law**, **presets-in-consumers**, and the **byte-identical-carve** discipline are the migration constitution (§7).
6. **The load-bearing `index.css` cascade order** (@layer + source-order ties, sole-writer partials) is inviolate; colocation re-homes files, the central manifest keeps the order (§2.6).
7. **`subpaths/` glob-batch generation** is an accepted mechanical exception, not hand-authored ceremony — kept.
8. **The Vue `composables/` essence-name** is a deliberate, recorded divergence from FSD purpose-segments (§2.4) — kept.

---

## Appendix A — worked examples (the flagship transpositions)

**A1 — The dock split-brain (the location-vs-publish flagship).** Dock owns `dock/composables/` (21 files) YET 8 dock-only composables live in the shared tree (`morphSignatures`, `useScrollChrome`, `useScrollTrigger`, `useDockCtaReceive`, `useBloomUp`, `useLiquidReveal` in `composables/motion/`; `useGlassBackdropLuminance` in `composables/glass/`; `useScrollTo` in `composables/sidebar/`). **Fix:** all 8 fold into `dock/composables/`; the public ones re-export through `/motion` from there (§2.5). The engine stops being bisected.

**A2 — The single-family subtree.** `composables/sortable/` (9 files, 860L) is consumed ONLY by `sortable-list/`. **Fix:** fold under `components/sortable-list/composables/`. `/virtual` + `/sidebar` (0 in-repo consumers) STAY module-level under the T3a public-subpath external-consumer exemption.

**A3 — The god-SFC family asymmetry.** `aurora.vue` → 17-file feature dir; `blob.vue` (875L) + `constellation.vue` (759L) → undecomposed monoliths, same class. **Fix:** symmetric decomposition into feature dirs (§4.5).

**A4 — The atomization cluster.** `labeled-field/` 5 near-identical `Labeled*` wrappers → ONE generic `LabeledField` + typed control slot (§1.4 atomization).

**A5 — The provenance flatten.** `components/ui/button/` + `components/custom/dock/` → `components/button/` + `components/dock/`, flat peers, domain map in README, zero export churn (§3).

---

*End Round-1 draft. Open items for round 2: (a) does `components/` want a light domain sub-grouping if flat-peer count exceeds a readability threshold, or is the README map sufficient? (b) exact soft-target line number (~300 vs a cohesion-only advisory); (c) whether `api/` should be GENERATED from the component tree (single source) before BH drops it, or dropped outright; (d) the demo naming-collision resolution (`aurora.vue` beside `aurora/`) against the flat-manifest glob.*
