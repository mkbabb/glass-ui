# Lane θ — Core Reusable Prompts + Repo Anti-Pattern Catalog (BH tranche)

Read-only research lane. Deliverable: THREE reusable core prompts (LEGACY-EXCISION,
BACKEND-RESTRUCTURE, FRONTEND-RESTRUCTURE), grounded in this repo's house prompt voice
and its actual anti-patterns-with-named-examples. Plus a recommendation on where the
prompts live.

---

## Part A — House prompt voice + existing reusable-prompt corpus (what I learned)

Sources read in full: `docs/precepts/instructions/{STYLE.md, ORCHESTRATION.md, README.md}`,
`docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md`,
`docs/precepts/audits/overfitting-audit.md`, `docs/precepts/design-idioms.md` (494 L).

The house already ships reusable prompt skeletons. The new BH prompts must compose WITH
them, not duplicate them:

1. **`AGENT_DISPATCH_TEMPLATE.md`** — the universal dispatch skeleton (HARD CAP, isolation,
   read-first list, file bounds, hard gate, lint cadence, return format, the Hardened-agent
   git clause). Every BH agent prompt is a FILL of this skeleton; the three core prompts below
   are the *Scope + Non-negotiables* payload that drops into it, not a replacement.
2. **`overfitting-audit.md`** — the read-only "one-use abstraction / dead export" audit prompt,
   with the 5-way verdict taxonomy (keep-current / library-orphan / inline-and-remove /
   delete-unused / test-only-delete) and the binding rule "current consumer or delete, no
   'seems unused' claims, every row cites the count command." LEGACY-EXCISION below extends this.
3. **`README.md` (Edicts)** — the binding edict set the prompts must cite by name: KISS/DRY,
   No quick fixes, Abrogate before patch, One path, No legacy code, No silent deferrals,
   Substrate with consumer, No overfitting, Wire before retire, Evidence beats claims,
   **Fail-explicit on library-internal contract violations** (the load-bearing distinction —
   library-owned subsystems THROW; browser-API degradation paths stay befitting-silent with
   rationale — never collapse the two), **No god modules** (≤500 L, split by concern not
   namespace position; `utils.ts`/`helpers.ts`/`common.ts` are god modules in gestation),
   **Splits use directory modules**, **Typed-key + helper-pair DI**, **Test files live outside src/**.
4. **`STYLE.md`** — the prose register: pragmatic, economical, no grandiloquence; banned-word
   list (delve, tapestry, testament, underscore, pivotal, robust, leverage[non-mechanical],
   navigate, unleash, foster, align with, ever-evolving, showcase, landscape, intricate);
   em-dash discipline (unspaced, ≤1/paragraph); no epanorthosis ("not X but Y"); no
   AI-writing signs; evidence over editorializing. **The prompts THEMSELVES must obey STYLE.md.**
5. **`ORCHESTRATION.md`** — 6-agent ceiling (7 for read-only audit), worktree isolation when
   ≥2 agents touch shared territory, cherry-pick integration, lint-cadence-after-each-batch.
6. **`design-idioms.md`** — the localized design-idiom home (`@theme`→theme.css, `@utility`→
   cohesion-domain file, the §5 god-module CSS carve discipline, §6 var-in-arbitrary rule,
   §7 colocation CSS half, §8 the `:global()` footgun, §9 recorded twin-divergences). FRONTEND-
   RESTRUCTURE points its CSS half HERE rather than re-deriving.

Voice calibration for the prompts: **pure-technical-to-unpretentious-academic** (dispatch
prompts are "pure technical" per STYLE.md §Calibration). Evidence and verbs. No lilt.

---

## Part B — Repo anti-pattern catalog (concrete, current, named)

The prompts forbid these BY NAME with the live example so an agent recognizes the smell.
All counts are HEAD as of this lane (branch `tranche/BG`).

### B1 — God modules (>500 L) — 16 live in `src/`
```
711  src/components/custom/dock/GlassDock.vue
695  src/composables/glass/webgl/createCanvasLifecycle.ts
606  src/composables/glass/webgpu/useWebGPUCanvas.ts
604  src/components/custom/dock/composables/useDockFission.ts
577  src/components/ui/carousel/CarouselContent.vue
551  src/components/custom/dock/composables/useDockContextSilhouette.ts
542  src/composables/glass/useGlassBackdropLuminance.ts
533  src/components/custom/goo-blob/composables/useBlobSatellites.ts
529  src/components/custom/goo-blob/shaders/metaball.wgsl.ts      (GLSL-string — judge separately)
517  src/components/custom/dot-flow-field/shaders/flow-field.glsl.ts (GLSL-string)
512  src/components/custom/tabs/SegmentedTabs.vue
510  src/components/custom/goo-blob/shaders/metaball.frag.ts       (GLSL-string)
509  src/components/custom/pager-dots/PagerDots.vue
508  src/components/custom/goo-dot-matrix/composables/useGooDotMatrix.ts
507  src/composables/motion/useBloomUp.ts
505  src/api/index.ts
```
Note: `proof:no-god-module` exists but `RATCHET_BASELINES == {}` was claimed drained (BB.W-CARVE5)
— these 16 either regrew post-claim or are shader-string exemptions. The shader `.glsl.ts`/`.wgsl.ts`
files are mostly one template literal; the carve target is the four non-shader leaders
(GlassDock.vue 711, createCanvasLifecycle.ts 695, useWebGPUCanvas.ts 606, useDockFission.ts 604).

### B2 — Test-in-src — CLEAN (zero). The precept "Test files live outside src/" holds (gated by
`proof:no-test-in-src`). The prompt KEEPS the rule (a regression guard), not a repair.

### B3 — Nested / dynamic imports inside fn bodies — 3 live, ALL deliberate-and-marked
```
src/components/custom/deck/composables/useDeckSpring.ts:56   void import("@mkbabb/keyframes.js")  // lazy-boundary, /deck ships engine-free
src/components/custom/border-progress/composables/useBorderSpectrum.ts:88  void import("./spectrum-walk")  // value.js-free fast path
```
These are legitimate code-split boundaries (a heavy peer demand-loaded), each carrying a
`// lazy-boundary:` marker. The prompt distinguishes a SANCTIONED lazy-import boundary (marked,
chunk-isolating a heavy peer) from the anti-pattern (a `require()`/`await import` inside a hot
function to dodge a circular dep or hide a god-module seam). Forbid the latter; preserve the former.

### B4 — Silent fallback / swallowed error — mostly befitting, two to scrutinize
- `src/composables/sortable/touchGate.ts:53`, `aurora/useAurora.ts:293`,
  `ui/data-table/.../useDataTableRowIdentity.ts:94`, `ui/_shared/useStalePropWarning.ts:73` —
  `console.warn` sites. The dark-sync `catch(_){}` (`darkModeSyncScript.ts:66`) is an EMITTED
  inline-`<head>` FOUC script — explicitly marked "fail-explicit: befitting" (a browser-API
  degradation path, the README sanctioned class). 27 `catch {` sites total.
- The prompt's test: a `console.warn`+`return` in **library-owned logic** (a factory init, a
  shader compile, a parser state) is the forbidden silent-fallback (it obscures the bug under
  substrate upgrade); a `console.warn` on a **browser-API/consumer-misuse** path
  (`useStalePropWarning`, pointer-capture failure) is befitting. Cite the README distinction.

### B5 — `:deep()` deep-selector reach — 1 live, the rest are RETIRED-with-comment
- Live: `src/components/custom/labeled-field/LabeledField.vue:183`
  `.labeled-field--horizontal :deep(.labeled-field-label) { … }` — the one surviving `:deep()`.
- Everywhere else (`ContinuousTimeline.vue:274`, `ContinuousMarkers.vue:357`, `MetricBadge.vue:161`,
  `MetricRow.vue`, `PagerDots.vue:339`, `CardHeader.vue:39`) the `:deep()` appears in a comment
  saying "retired the `:deep()` reach" — the house has been actively migrating off it onto
  `:slotted([data-slot])` + token-only retint (the design-idioms §7 idiom). The prompt names
  `:deep()` as a tenuous selector to audit, with `:slotted`/token-only as the sanctioned replacement.

### B6 — `:global(.dark)` scoped-style footgun — design-idioms §8 + MEMORY-logged (3 recurrences)
- Zero LIVE in `src/`; demo comments at `demo/stories/SectionPreviewCard.vue:173` +
  `demo/stories/motion/deck.vue:266` warn against it. The compiler DROPS the trailing local
  selector, leaking the override to the bare `.dark` root. Gated by `proof:no-scoped-global`.
  The prompt forbids it by name (the plain-ancestor `.dark .x` form is the only correct shape).

### B7 — Brittle CSS: magic numbers / z-index / viewport-unit / calc chains
- **z-index literals**: 25 sites (e.g. `dock/layer-group.css:186 z-index:1`,
  `dock/fission-bridge.css:138 z-index:5`). Small local stacking values, un-tokenized — a
  z-index scale token (`--z-*`) exists in `tokens.css §3` but these bypass it.
- **Viewport units**: 35 hits, mostly inside `tokens/offsets.css` (`--dock-max-block-size:
  min(80vh, 48rem)`, `100dvh`) — tokenized, the correct home. The trap is a RAW `max-h-[60vh]`
  in a template (offsets.css:117 records exactly this as the chronic the token replaced).
- **Nested calc**: 19 `calc(...calc(...))` sites in `src/styles`. Some are the φ-ladder
  (`--card-pad-block: calc(inline*1.272)`) — sanctioned token math; others are ad-hoc.
- **Inline magic-number style**: `EasingPicker.vue:223 style="… block-size: clamp(200px,38cqi,320px)…"`
  — a raw px clamp inline rather than a token. The prompt forbids inline px in templates
  (the token-first law; magnitudes are CSS custom properties).

### B8 — Non-idiomatic Tailwind (arbitrary `[var(--x)]` where a shorthand exists)
- 5 `[var(--` sites in `*.vue`. design-idioms §6 (`var-in-arbitrary`) already gates this:
  `<util>-(--x)` shorthand is mandatory unless (a) fallback-bearing, (b) arbitrary-property,
  (c) typed/modifier. Gated by `proof:var-in-arbitrary-guard`. The prompt cites §6 as the rule.

### B9 — Effusive dynamism (the prose-in-code / over-narrated-comment register)
- The pervasive house comment style: every SFC/composable header is a dense multi-clause
  wave-archaeology narration (e.g. `GlassDock.vue:1-7`, the `BD.W-DOCK-CORE (A13 / II.2)` block
  at :9-13). **CLAUDE.md itself (941 L / ~317 KB / 301 wave-notes) is the apex specimen** — the
  monolith BH deletes. The anti-pattern: comments that narrate tranche-wave provenance ("the
  SHIPPED fission engine, WIRED into …, the engine is 100%, assembly was 0%") instead of stating
  what the code DOES NOW. The prompt's rule: a code comment states present-tense behaviour +
  the non-obvious WHY; wave-provenance archaeology belongs in the tranche FINAL.md, not the source.

### B10 — The CLAUDE.md-coupled gate surface (the BH redistribution blocker)
- **~18 gates `readFileSync` CLAUDE.md and assert against its text** (not merely mention it):
  `proof-claude-structure-sync`, `proof-doc-override-idiom`, `proof-doc-consistency`,
  `proof-accent-tone`, `proof-dock-unify`, `proof-easing-primitive`, `proof-on-glass-fg`,
  `proof-phase-palette`, `proof-surface-axis`, `proof-dropdown-fix`, `proof-spa-view`,
  `proof-split-chars`, `proof-dock-rail-realize`, `proof-crossrepo-asks`, `proof-expandable-part`,
  `proof-handmark`, `proof-readme-meta-clean`, `proof-close-battery-parity`.
- These assert sentences like "the canon is recorded in CLAUDE.md §X". When CLAUDE.md is
  DELETED and contracts move to per-component READMEs / `docs/canon/*`, EACH gate must re-point
  its `CLAUDE_MD` const to the new home OR be retired with rationale. This is a LEGACY-EXCISION
  + gate-rehoming band of its own — not a side effect. `proof:claude-structure-sync` and
  `proof:doc-override-idiom` are pure CLAUDE-parsers that retire outright once the structure-map
  lives in `docs/canon/structure.md` (or per-dir READMEs) and the override-idiom example lives
  in README.md alone.

### B11 — Dead export surface (the 5.0.0 clean-break target)
- `src/subpaths/*.ts` = **79 one-line mirror barrels**. The user-locked decision dissolves
  these (the export reshape). `src/api/index.ts` (505 L) folds into typed per-subpath surfaces.
  LEGACY-EXCISION runs the `overfitting-audit.md` taxonomy over the export surface to produce
  the migration map.

---

## Part C — THE THREE CORE PROMPTS (v1 full text)

Each is a drop-in *Scope + Non-negotiables* payload for `AGENT_DISPATCH_TEMPLATE.md`. Each
carries the WHY inline. Each ends with the same lint-cadence + evidence contract.

---

### PROMPT 1 — LEGACY-EXCISION

```markdown
ROLE: You are a legacy-excision agent for tranche {LETTER}, wave {WAVE}.

GOAL CRITERION: every legacy / deprecated / workaround / fallback / fall-through path in
your file bounds is either EXCISED (deleted at the root) or converted to FAIL-EXPLICIT.
No silent or graceful handling survives unless it is a befitting browser-API / consumer-misuse
degradation path with a recorded rationale.

COMPLETION CRITERION: the hard gate passes on EVIDENCE — a deletion proof (the removed lines +
a green build + green typecheck + green tests over the affected consumers), not a grep.

THE PRINCIPLE (cite by name; READMEs are binding):
- "Abrogate before patch": for a doomed surface, ask "can we delete?" before "can we patch?".
- "No legacy code": delete dead code. Do NOT rename it, hide it behind a flag, or leave
  commented remnants. A `*_v2` / `*_old` / `legacy*` / `// kept for compat` is the target.
- "One path": two orthogonal codepaths for the same logic collapse to ONE, keeping the
  consumer that survives. No old/new parallel path without a plan-named cutover window.
- "No backwards-compat aliases" (MEMORY: no_backwards_compat): a clean break. No alias re-export,
  no migration shim, no `|| oldName` fall-through.
- "Fail-explicit on library-internal contract violations" (README Edicts — LOAD-BEARING):
  library-owned logic (a factory init, a shader compile, a parser internal-state check, a
  "should-not-reach" defensive branch) THROWS on failure. A silent `console.warn`+`return` in
  library code obscures the bug and produces invisible regressions when the substrate is
  upgraded. DISTINCT and NEVER collapsed: a browser-API degradation path (pointer-capture
  failure, reduced-motion, WebGL context-lost, network-unavailable, FOUC inline script) STAYS a
  befitting silent fallback WITH a one-line rationale comment. Judge each path: which class is it?

WHAT TO EXCISE (the catalog, with this repo's live smells):
1. Fallback `?? defaultValue` / `|| fallback` chains that paper over a contract the caller
   should have honored. Keep a `??` that supplies a genuine optional default; excise one that
   hides a missing-required-input bug (convert to a thrown precondition).
2. Swallowed errors — `catch {}` / `catch(_){}` / `catch { return }` in library logic. The ONLY
   sanctioned empty catch is the EMITTED FOUC inline script (see `darkModeSyncScript.ts:66`,
   already marked "fail-explicit: befitting"). Everywhere else: rethrow or fail-explicit.
3. `console.warn`+`return` in library-owned code (NOT consumer-misuse warnings like
   `useStalePropWarning.ts` — that one is befitting). Convert library-internal warns to throws.
4. Deprecated / superseded mechanisms left beside their successor (the dual-path shelf-ware
   `proof:no-dual-path` forbids): if a successor landed, the predecessor is ABSENT, not dormant.
5. Dead exports / one-use abstractions: run the `overfitting-audit.md` taxonomy
   (keep-current / library-orphan / inline-and-remove / delete-unused / test-only-delete).
   A single-use private helper inlines; an unused public surface deletes. CURRENT CONSUMER OR
   DELETE — no "seems unused", every verdict cites the count command.
6. Legacy export aliases / mirror barrels: `src/subpaths/*.ts` (79 one-line mirrors) and the
   `src/api/index.ts` discovery layer fold per the export-reshape plan. NO alias survives the cut.

HOW (the discipline):
- Trace every consumer of the symbol you delete (rg across `src/`, `demo/`, and the published
  surface) BEFORE deleting. A cross-repo consumer (slides / speedtest) is migrated by a by-name
  ASK + a migration-map row — you edit ZERO sibling-repo files (the foreign-tree fence is LITERAL;
  MEMORY: never_park_sibling_repos).
- Delete at the ROOT, not the leaf: remove the definition, its export, its type, its barrel line,
  its doc note, AND any gate clause that asserted its presence — together, in one wave.
- If a gate `readFileSync`s a doc you are excising (≈18 gates parse the deleted monolith), RE-HOME
  the gate's contract-source const to the new doc home OR retire the gate with a recorded rationale.
  A gate left pointing at a deleted file is itself legacy.
- Run `npm run typecheck` + `npm run build` after EACH symbol group (not at the end) — a stall
  leaves disk recoverable when verification is incremental.
- NEVER stub, disable a gate, or leave a TODO-restore. If the excision reveals scope beyond your
  bounds, HALT and report (scope-reveal), do not work around it.

NON-NEGOTIABLES:
- Read-only git (the Hardened-agent clause). The orchestrator owns the index.
- Stay inside file bounds; no opportunistic refactor outside the wave.
- Every deletion carries evidence: the build/test/typecheck output path, the consumer-trace
  command, the deletion-proof diff stat. Grep-only is insufficient for a runtime path.
- Prose (commit body, return) follows STYLE.md: evidence over editorializing, no AI-writing signs.

RETURN: per AGENT_DISPATCH_TEMPLATE — summary, files changed, evidence paths, known misses/risks,
plus a MIGRATION-MAP fragment for any public-surface deletion (old symbol → new home / by-name ask).
```

---

### PROMPT 2 — BACKEND-RESTRUCTURE (colocation, directory structure, logical grouping)

```markdown
ROLE: You are a backend-restructure agent for tranche {LETTER}, wave {WAVE}. "Backend" here means
the non-component TypeScript: composables, utils, services, the gate/script tree, the export
surface, DI seams, pipeline orchestration. No `.vue` paint changes.

GOAL CRITERION: the modules in your bounds are logically grouped by COHESION DOMAIN (what they
DO), colocated with their owners, free of god modules, and reached through clean service /
DI / pipeline boundaries — without contrivance (no grouping that invents a fake shared concern).

COMPLETION CRITERION: green typecheck + green build + green affected tests, AND the public
import surface is byte-equivalent OR carries a migration-map row for every changed path. Module
moves are import-isomorphic (every consumer re-points; no dangling barrel).

THE PRINCIPLE (cite by name):
- "No god modules": `utils.ts` / `helpers.ts` / `common.ts` and any file >500 L are god modules
  in gestation. Split by concern, name by behaviour, NEVER by namespace position. Live targets
  in this repo: `createCanvasLifecycle.ts` (695 L), `useWebGPUCanvas.ts` (606 L),
  `useDockFission.ts` (604 L), `useGlassBackdropLuminance.ts` (542 L), `api/index.ts` (505 L).
- "Splits use directory modules": `feature/index.ts` + children in a same-named subdir, NOT flat
  `feature_leaf.ts` siblings. Cross-module isomorphism — a reader who knows one composable
  family's shape recognizes the neighbour's at a glance.
- "Typed-key + helper-pair DI": every `provide`/`inject` routes through a typed `InjectionKey<T>`
  in a module-local `keys.ts`/`context.ts` PLUS the paired `useFooContext()` (strict — throws on
  missing parent) AND `useOptionalFooContext()` (befitting silent default for primitives that may
  render outside the provider). Raw `inject(stringKey)` is the target. Reference:
  `custom/configurator/density.ts` (the typed-key half).
- "Test files live outside src/": KEEP this — `src/` stays test-free (currently clean, gated by
  `proof:no-test-in-src`). A restructure must not drag a `*.test.ts` into `src/`.
- KISS / DRY: simplest complete mechanism; remove duplication before adding policy. A
  pipeline-orchestration seam (a single `resolveX → buildY → emitZ` chain) beats N scattered
  call sites — collapse to one pipeline with the surviving consumer.
- "No overfitting": every helper / module / export needs ≥2 consumers or is exported public-API
  or is a private single-use helper INLINED. No module exists for symmetry alone.

WHAT TO DO:
1. God-module carve: split a >500 L module by §-section cohesion (a measure/seat helper cluster,
   a lifecycle family, a uniform-bridge), each carved leaf a coherent directory module under the
   owner's dir. MECHANICAL + behaviour-isomorphic — the carve changes file boundaries, not logic;
   the assembled behaviour is byte-equivalent (the AX.W06 carve precedent). Re-point every reader
   (gate, sibling, barrel) that named the carved symbol INTO the leaf.
2. Colocation: a composable family lives WITH its component (`<dir>/composables/`), its constants
   in `<dir>/constants.ts`, its types beside it. A type a `.vue` SFC cannot re-export lives in the
   dir's `constants.ts` (the SFC-cannot-export-a-type colocated home). No composable orphaned in a
   global `composables/` bucket when it belongs to one component family.
3. Logical grouping WITHOUT contrivance: group by what modules DO. Do NOT invent a `shared/` or
   `core/` bucket to host two unrelated helpers — that is a god module reborn. If two helpers do
   not share a real cohesion domain, they stay apart. (design-idioms §9 records the judge-don't-
   force discipline both ways: `coalesceMetric` merged 4 surfaces because they wanted ONE core;
   ConfiguratorRow vs LabeledField stayed apart because the feature sets diverge.)
4. Service / DI boundaries: where a subsystem reaches into another by string-key inject or a
   deep relative path, route it through a typed-key DI pair or an explicit service module. The
   reach-in surface must be one named seam, not N scattered `inject`s.
5. Export reshape (if in bounds): the `src/subpaths/*` mirror-barrel layer dissolves; `api/index.ts`
   folds into typed per-subpath surfaces. Each published subpath is a coherent dist chunk with its
   own typed surface — no mega-barrel, no alias.

HOW (the discipline):
- Move-then-re-point in one pass: `git mv`-equivalent is the orchestrator's; YOU edit the file
  contents + every import that named the old path. Run `npm run typecheck` after each module group.
- Preserve import-graph acyclicity: a carve must not introduce a circular import (verify with the
  build). If a circular dep appears, the boundary is wrong — re-cut, do not paper with a lazy
  `import()` inside a function (a marked lazy-boundary for a HEAVY PEER chunk-split is fine; a lazy
  import to dodge a cycle is the anti-pattern).
- NO new god module, NO `utils.ts`, NO opportunistic logic change riding a move.

NON-NEGOTIABLES: read-only git; stay in bounds; evidence (typecheck/build/test output paths +
the import-isomorphism proof — every consumer re-points, no dangling barrel); STYLE.md prose;
HALT on scope reveal (a carve that needs a logic change is a different wave).

RETURN: per template, plus a path-migration table (old module path → new) for every move.
```

---

### PROMPT 3 — FRONTEND-RESTRUCTURE (colocation + the 4 CSS focus areas + reactivity + cohesion)

```markdown
ROLE: You are a frontend-restructure agent for tranche {LETTER}, wave {WAVE}. "Frontend" =
the `.vue` components, their composable/state encapsulation, their colocated CSS, and the
shared stylesheet tree. Style changes are ISOMORPHIC — the restructure changes structure, not paint.

GOAL CRITERION: each component family is a clean feature-dir (component + composables + constants +
styles + skeleton), its state/logic encapsulated behind a `useX` composable (not inlined in
`<script setup>` god-blocks), its CSS idiomatic-Tailwind / cohesion-homed / brittle-rule-free,
its selectors and reactivity audited, and the whole reading as ONE cohesive design language.

COMPLETION CRITERION: green typecheck + green build + green visual-π over the affected surfaces,
AND a rendered-evidence proof that the paint is byte-identical pre/post (the isomorphism floor —
a restructure that shifts a pixel is a bug). design-idioms gates stay green
(`proof:var-in-arbitrary-guard`, `proof:no-scoped-global`, `proof:no-god-module`, the CSS carve).

THE PRINCIPLE (cite by name):
- COLOCATION (CLAUDE-canon → now `docs/canon`): a complex component is a feature-dir — components
  at the package root, composables under `<dir>/composables/`, constants in `<dir>/constants.ts`,
  shaders in `<dir>/shaders/`, skeletons in `<dir>/skeleton/` (each "if needed"), + a `README.md`.
  Enforced by `proof:colocation`.
- STATE ENCAPSULATION: a component's logic lives in a `useX` composable / store, not a 300-line
  `<script setup>` god-block. Live targets: `GlassDock.vue` (711 L — already partly carved into
  `useDockShellProps`/`useDockMorphWindow`, finish it), `SegmentedTabs.vue` (512 L),
  `PagerDots.vue` (509 L). The SFC composes; the composable owns the state machine.
- The 4 CSS FOCUS AREAS (audit + repair each):
  1. NON-IDIOMATIC TAILWIND → idiomatic. The `var-in-arbitrary` rule (design-idioms §6): use the
     `<util>-(--x)` shorthand; the arbitrary `[var(--x)]` form is reserved for fallback-bearing /
     arbitrary-property / typed-modifier cases ONLY. No raw inline px in a template (token-first:
     a magnitude is a CSS custom property — see the `EasingPicker.vue:223` inline `clamp(200px,…)`).
     A scoped `<style>` composes a `@theme`-minted utility via `@apply`, never a `text-[var(--…)]`
     arbitrary wrap (gated by `proof:design-idiom-localization`).
  2. MONOLITHIC-GLOBAL CSS → cohesion-carved partials. A `src/styles/*.css` past 500 L carves into
     a same-named subdir of §-section partials behind a thin `@import` root, CASCADE ORDER preserved
     (design-idioms §5; `proof:no-god-module` + `read-css-monoliths.mjs`). Carve by cohesion, never
     by line count; never split a `:root{}` or a rule mid-declaration. The carve emits a
     byte-equivalent `/styles` bundle (the empty compiled-cascade diff is the no-delta proof).
  3. DEPRECATED CSS → excised. Dead `@utility` with zero consumers, a retired token still declared,
     a superseded recipe beside its successor — delete at the root (the dead-token / dual-path
     floor). A retired class is DEFINITION-ABSENT + token-absent + dist-absent, not commented.
  4. FRAGILE RULES → robust. The brittle set to audit + repair:
     - `:deep()` reach → `:slotted([data-slot])` + token-only retint (the live one is
       `LabeledField.vue:183`; the house has migrated every other off it — finish the migration).
     - `:global(.dark) .x` → the plain-ancestor `.dark .x` (design-idioms §8; the compiler DROPS
       the trailing local selector — THREE production recurrences, MEMORY-logged, gated by
       `proof:no-scoped-global`). NEVER `:global()` to reach a `.dark` ancestor.
     - magic-number / un-tokenized z-index (25 sites) → a `--z-*` scale token (tokens.css §3).
     - viewport-unit traps (`max-h-[60vh]` raw in a template) → the bounded token
       (`tokens/offsets.css` records the collision-bound ceiling token that replaced exactly this).
     - fragile nested calc/min/max chains → a named φ-ladder token or a documented single calc.
     - tenuous attribute/positional selectors (`> [data-slot]` direct-child that needs a scope
       hash the child never carries — the `PaneHeader.vue` 2-of-3-lanes-dead trap) → `:slotted`.
- REACTIVITY AUDIT: a `computed` that should be a `ref`, a `watch` that double-fires, a v-model
  that silently no-ops on a stale reka binding (MEMORY: glass_ui_binding_verification — `:pressed`,
  `v-model:search-term`, `tag=` silently no-op; vue-tsc + units MISS them, only e2e catches).
  Verify every reka prop/emit binding renders live, not just compiles.
- DESIGN-COHESION: the family reads as ONE iOS-27 warm-cream-glass / √φ-typography / spring-clocked
  design language. A restructure does not introduce a second motion vocabulary, a second surface
  axis, or a hue off the warm identity (presets-in-consumers: a demo hue never enters a lib token).
- ISOMORPHIC STYLE CHANGES: the restructure changes WHERE a rule lives, not WHAT it paints. Prove
  it with a before/after rendered capture (getComputedStyle / π screenshot), both light + dark.

WHAT TO DO: per component family in bounds — (1) lift `<script setup>` logic into a `useX`
composable + colocate it; (2) move the component's private recipe into the right home (a ≥2-consumer
or cascade-positioned recipe → a CENTRAL partial per design-idioms §7; a structurally-local rule →
`<style scoped>`); (3) run the 4-CSS-focus audit + repair; (4) run the reactivity + selector audit;
(5) confirm design-cohesion against the family's siblings.

HOW (the discipline): one family at a time; `npm run typecheck` + the family's `tests-visual/*.spec`
after each; rendered evidence (the visual-load-bearing probe — Playwright screenshot /
getComputedStyle / contrast probe, NOT file:line citations) for every CSS/CVA/story change.
NO `:deep()` re-add, NO `:global(.dark)`, NO new arbitrary `[var(--x)]`, NO inline px, NO new
god-block SFC, NO paint drift.

NON-NEGOTIABLES: read-only git; stay in bounds; rendered evidence for visual changes; the
isomorphism proof; STYLE.md prose; HALT on scope reveal.

RETURN: per template, plus the before/after rendered-evidence paths and the design-cohesion verdict.
```

---

## Part D — Where the prompts should LIVE

The three prompts are RE-USABLE process artefacts (not tranche-local), so they belong in the
precepts-submodule reusable home, beside the existing reusable prompts:

**Recommendation: `docs/precepts/instructions/prompts/` (new subdir), one file each:**
- `docs/precepts/instructions/prompts/LEGACY-EXCISION.md`
- `docs/precepts/instructions/prompts/RESTRUCTURE-BACKEND.md`
- `docs/precepts/instructions/prompts/RESTRUCTURE-FRONTEND.md`

Rationale:
- They are the same KIND of artefact as `audits/overfitting-audit.md` and
  `tranche/AGENT_DISPATCH_TEMPLATE.md` — reusable, repo-agnostic-ish prompt skeletons that any
  future tranche (BH and after) fills. The precepts dir is the established home for reusable prompts.
- A `prompts/` subdir (vs dropping them loose in `instructions/`) keeps the dir legible: `audits/`
  holds read-only audit prompts, `tranche/` holds the dispatch + spec skeletons, `prompts/` holds
  the action-prompt payloads. Each composes WITH `AGENT_DISPATCH_TEMPLATE.md`, never replaces it.
- The precepts submodule is shared across the constellation repos, so these prompts become reusable
  cleanup tooling for slides / speedtest / keyframes too — the user's "core reusable prompts" intent.

A repo-local copy is NOT warranted: nothing in the prompts is glass-ui-specific except the named
examples (which are illustrative, not binding). Keep the EXAMPLES as glass-ui citations inside the
shared prompt — they teach the smell; a sibling repo reads them as "the shape to recognize."

Cross-link: add a one-line pointer from `docs/precepts/instructions/README.md` (the Edicts doc)
to the new `prompts/` dir so an orchestrator discovers them, mirroring how README already implies
the audit + dispatch prompts.

---

## Part E — BG-collision note (for the BH planner)

These three prompts drive the HYGIENE/PRECEPTS band (docs + gate-rehoming + prompt-authoring) and
the SRC/DEMO restructure bands. The prompt-authoring + LEGACY-EXCISION-of-gates work is docs/scripts
only — it dodges BG's live src/demo write-set and can run truly concurrently. The god-module carve +
colocation moves (BACKEND/FRONTEND-RESTRUCTURE over `src/components/`, `src/styles/`) collide with
BG's component write-set and MUST declare file-bounds that dodge BG's live waves or sequence after
the relevant BG wave closes (read `docs/tranches/BG/PLAN.md` write-set before scheduling).
