# Structure audit vs the grand colocation edict

**Auditor mode:** READ-ONLY on `/Users/mkbabb/Programming/glass-ui`. No builds, no writes
inside the repo, no git mutations.
**Working-tree HEAD:** `e5b3a2095b6c3e330b5d82ca3330f1eac4e3c895` (branch `master`).
**Tree state:** giant uncommitted transaction — `git status --short`: 697 modified,
155 deleted, 107 untracked. The census below reads the **working tree on disk** (the
in-flight transaction is the most-current truth), not any committed HEAD.

**The edict (2026-07-16):** components colocated with their sub-components, composables,
skeletons, constants, styles — recursively; module-/global-level composables live in
`composables/`, else colocated; same for styles; long dirs broken into encapsulated
modules; backend/scripts get the language-befitting treatment.

**Headline:** the edict is **~90% already executed** by the MS-band (P006–P012) plus the
component-apotheosis/privatization waves. Component families now colocate their own
`composables/`, `styles/`, `constants.ts`, `types.ts`, context files (proof: the `dock`
family below). The residual is small and specific: a handful of single-consumer/dead
`_shared` members, one library-orphan composable subtree, one genuinely-oversized
`composables/motion/` dir, and ~14 stale empty directory husks left on disk by the
in-flight consolidation (which git will not commit).

---

## 1. MS-band truth (MS1–MS9 → P005–P013)

The receipt/cursor protocol was abandoned after P001; the structure waves landed as
conventional commits, some under `refactor(structure/msN)` labels, some renamed.

| wave | P-slot | title | fate | evidence |
| --- | --- | --- | --- | --- |
| MS1 | P005 | census recompute — "generated current-HEAD structure authority" | **FOLDED / no standalone deliverable** | No `ms1` commit exists (`git log b5eee380..ea3c002c` shows only ms2). Formation ruled it "census-as-baseline / baseline-not-constants" (`ffa0ee1f`, `cb9805d6`). No generated structure-authority artifact survives on disk (searched). Its intent — know current structure before moving — was satisfied implicitly by executing MS2+. **No verifiable MS1 output.** |
| MS2 | P006 | dissolve generic utils into semantic owners | LANDED (labeled) | `ea3c002c refactor(structure/ms2): colocate generic utilities with semantic owners` |
| MS3 | P007 | colocate sortable behavior with SortableList | **LANDED under a feat name** | `9f165717 feat(sortable-list): unify accessible reorder transactions with the component family`. `git show --stat 9f165717`: moves `src/composables/sortable/dragController.ts` + `src/components/custom/sortable-list/*` → `src/components/sortable-list/composables/{useSortable,dragController,dropResolver,ghostRenderer,touchGate,transitionTiming,types}.ts`. Family confirmed on disk: `src/components/sortable-list/composables/`. |
| MS4 | P008 | flatten ui/custom | LANDED (labeled) | `9a8761f0 refactor(structure/ms4): flatten component families into one semantic home` (the `custom/`→flat move above rides the same era; no `src/components/ui` or `src/components/custom` remains on disk) |
| MS5 | P009 | dissolve root barrels | LANDED (labeled) | `bba7b51d refactor(structure/ms5): dissolve root barrel mirrors into semantic homes` |
| MS6 | P010 | remove source subpath mirrors | LANDED (labeled) | `bb5c1e5c refactor(structure/ms6): remove source subpath mirrors from the entry graph`. `src/subpaths/` gone; the published surface is re-derived from `scripts/lib/subpath-policy.mjs`. |
| MS7 | P011 | colocate component-owned CSS | LANDED (labeled) | `4bf29831 refactor(styles/ms7): colocate component-owned CSS with family homes`. Confirmed: `src/styles/index.css` now `@import`s `../components/<fam>/styles/...` (dock, tabs, card, button, dialog, metric, drawer, …). |
| MS8 | P012 | demo terminal / private-chassis re-home | LANDED (labeled) | `f1acf31f refactor(demo/ms8): rehome private composition under terminal owners` |
| MS9 | P013 | live differential guard for the settled structure | **DROPPED** | No commit references "differential" as a structure guard (`git log --all` grep: only unrelated `f89fbc38`). No structure-guard test on disk. **The opposite happened:** the working tree DELETES the whole verification substrate — `scripts/verification/{discover,invariants,mutation-fixtures}.mjs` + schemas, `scripts/tranche/{cursor,transaction-envelope,bootstrap-receipt}.mjs` (6 files), `docs/tranches/BI/{EXECUTION-PROGRESS.md,BOOTSTRAP.json}` (all `D` in `git status`). |

---

## 2. Current-tree census vs the edict

### 2a. `src/components/` — flat one-dir-per-family?

**YES.** `src/components/` is flat: one dir per family, no `ui/`/`custom/` nesting. Families
colocate recursively. Exemplar — the `dock` family on disk:

```
src/components/dock/
  GlassDock.vue DockControl.vue DockCrossfade.vue DockLayer.vue … (8 .vue)
  composables/{dockContext,useDockState,useDockSearch,useDockSpring, …}.ts  (14)
  constants.ts   index.ts
  styles/{dock,morph,overflow,crossfade,…}.css + styles/controls/{icon-button,tab-button,touch-floor,triggers}.css
```

This is precisely the edict's target (sub-components + composables + constants + styles,
recursively). The same pattern holds for aurora, blob, data-table, deck, etc. The untracked
half of the transaction is itself the colocation move: new `?? src/components/<fam>/styles.css`,
`?? src/components/<fam>/types.ts`, `?? src/components/command/dialogContext.ts`,
`?? src/components/dialog/dialogStageContext.ts`, `?? src/components/blob/composables/resolveBlobSurface.ts`, etc.

**Violation found — `_shared` single-consumer members** (see 2c).
**No** family was found with component logic stranded in `src/composables/` at exactly one
consumer that is unpublished (see 2b — the composables tree is clean on this axis).

Borderline compound family (not a violation): `src/components/dropdown-menu/` carries 17
direct files (14 `DropdownMenu*.vue` sub-components + `index.ts` + `styles.css` +
`useMenuTrigger.ts`). All sub-components are colocated with the parent; flat-17 is
acceptable per the edict, optional nesting only.

### 2b. `src/composables/` — module-level vs single-owner

Authority: `scripts/lib/subpath-policy.mjs` (`COMPOSABLE_CLASS`, lines 98–108). Consumer
counts computed by resolving relative + `@/` + `@glass/` imports across `src/` and `demo/`.

| subdir | policy | in-repo consumers (distinct component/module owners) | verdict |
| --- | --- | --- | --- |
| `color` | PUBLISH (`./color`) | aurora, blob, chip, fourier-field, liquid-grid (+tests) | **LEGIT** (published + multi) |
| `context` | INTERNAL | configurator, dialog, dock, drawer, popover, sortable-list, toggle-group (7) | **LEGIT** (DI substrate, multi) |
| `dark` | CURATED (`./dark`) | dark-mode-toggle, fourier-field | **LEGIT** (published) |
| `dom` | PUBLISH (`./dom`) | blob, data-table, dock, fading-scroll, fourier-field, pager-dots, slider (+forms,root) | **LEGIT** (published + multi) |
| `glass` | INTERNAL (+ `glass/canvas2d`→`./canvas`) | aurora, blob, button, constellation, dock, fourier-field, handmark, liquid-grid, surface, timeline, watercolor-dot (11) | **LEGIT** (GL substrate, multi) |
| `keyboard` | CURATED (`./keyboard`) | expandable-container (1 component) + demo | **LEGIT-thin** (published; only 1 in-repo component consumer — flag, do not move) |
| `motion` | CURATED (`./motion`,`./motion-core`) | 20+ component families | **LEGIT** (published + multi) — but **oversized dir**, see 2d |
| `reactive` | PUBLISH (`./reactive`) | consumed by `dom` composables (useBreakpoint/useResizeObserver/…) + root barrel | **LEGIT** (published + multi-internal) |
| `sidebar` | CURATED (`./sidebar`) | 0 in-repo components; `composables/virtual` + demo only | **LEGIT-thin** (published for external consumers; no in-repo component) |
| `virtual` | INTERNAL (retired from publish) | **0 real `src` import statements**; demo-only (`@glass/composables/virtual` in 3 demo stories) | **LIBRARY-ORPHAN** — see Class B |

**Published-subpath constraint STILL HOLDS.** 8 of 10 composable subdirs remain published
(`color`, `dom`, `reactive` via own `index.ts`; `dark`, `keyboard`, `motion`, `sidebar`
CURATED; `glass/canvas2d`→`./canvas`) — plus `motion-core`, `fourier-math`, `blob-config`,
`animated-digit` etc. as nested/CURATED leaves. The historic "8/11 published ⇒ cannot
colocate into a component" blocker is intact: the published composables legitimately stay
in `composables/`. Only `context`/`glass` (multi-consumer substrates, legit) and `virtual`
(orphan) are unpublished.

### 2c. `src/components/_shared/` census (19 members)

Consumer counts (distinct owners, self excluded):

| member | consumers | verdict |
| --- | --- | --- |
| `class-names.ts` | 44 families + root | LEGIT (universal) |
| `axes.ts` | 17 families + root, **published `./axes`** | LEGIT |
| `control-size.ts` | input, labeled-field, number-field, search, switch, textarea (6) | LEGIT |
| `resolveSurfaceClass.ts` | dialog, dropdown-menu, select, surface, toast, tooltip (6) | LEGIT |
| `useMotionAxis.ts` | dialog, dock, drawer, slider, tabs (5) | LEGIT |
| `fieldControl.ts` | input, number-field, tags-input, textarea (4) | LEGIT |
| `field-control.css` | input, number-field, tags-input, textarea (4) | LEGIT |
| `FeedbackMark.vue` | pulse, status-dot (2) | borderline (shared pair) |
| `feedback.ts` | pulse, status-dot (2) | borderline (shared pair) |
| `disclosure-context.ts` | accordion, collapsible (2) | borderline (shared pair) |
| `disclosure.css` | accordion, collapsible (2) | borderline (shared pair) |
| `menuRowClass.ts` | combobox, select (2) | borderline (shared pair) |
| `valueDomain.ts` | progress, slider (2) | borderline (shared pair) |
| `feedback-tone.css` | global `@import` (index.css) + Toast.vue | LEGIT (global stylesheet) |
| `field-surfaces.css` | global `@import` (index.css) | LEGIT (global stylesheet) |
| `menu.css` | global `@import` (index.css) | LEGIT (global stylesheet) |
| `index.ts` | barrel (re-exports only `control-size`) | n/a |
| **`ModalOverlay.vue`** | **dialog only (1)** — `dialog/DialogContent.vue:15,369` | **VIOLATION — colocate into `dialog/`** |
| **`useStalePropWarning.ts`** | **0 references anywhere** (grep `src demo scripts`) | **VIOLATION — dead, prune** |

The six 2-consumer members are genuinely shared across a sibling pair; they defensibly stay
in `_shared` (colocating into one forces the sibling to reach across). Not counted as
violations, but candidates for the 2d sub-grouping.

### 2d. Long-dir census (>15 direct file entries, `src/` + `demo/` + `scripts/`)

| dir | direct files | assessment / natural split |
| --- | --- | --- |
| **`src/composables/motion/`** | **43** | **The one clear split.** Already has `core/`. Sketch: `spring/` (useSpring, useSpringMount, useSpringPress, springPresets, springProjection, useLiquidPress, useLiquidFlex), `scroll/` (scrollReader, useScroll{Chrome,Pin,Progress,Scene,Trigger}), `number/` (useAnimatedNumber, useAnimatedNumberMap, useCountup, useNumericTransition), `reveal/` (useLiquidReveal, useStagger, useStaggerReveal, vReveal, useBloomUp, bloomUpField, useTextHighlight, useLeadTrail), `pointer/` (usePointerVelocityField, pointerFieldMappings, useRoutePointer, useDragMorph, useElementMorph). Published surface is the `index.ts`/`core/index.ts` barrel — an internal reorg is export-safe. ~35 files re-homed. |
| `src/styles/glass/` | 21 | Cohesive design-token partials (material/ladder/rim/surface-axis…) under a thin `@import` root. Borderline; optional sub-grouping. Library-identity — low priority. |
| `src/styles/tokens/` | 20 | Same — token partials (`@import` root). Low priority. |
| `src/styles/` (top level) | 20 | Thin `@import` roots + foundational sheets; already sub-organized into glass/theme/tokens/typography/utilities. Low priority. |
| `src/components/_shared/` | 19 | After pulling ModalOverlay/useStalePropWarning, sub-group the rest: `field/`, `disclosure/`, `feedback/`, `menu/`, `surface/`. ~17 files. Optional refinement. |
| `src/components/dropdown-menu/` | 17 | Compound family, colocated — acceptable (2a). |
| `src/components/dock/styles/` | 15 | Already the family's own styles dir (correctly colocated) with a `controls/` sub-split. Fine. |
| `src/components/aurora/composables/` | 15 | Family-colocated. Fine (could micro-split, low priority). |
| `demo/stories/containers/` | 14 | Flat story leaves (one `.vue` per story). Acceptable demo shape. |
| `scripts/` (top level) | 13 | See 2f. |
| `demo/stories/foundations/` | 13 | Flat story leaves. Acceptable. |

`src/components/` itself (~80 family dirs) is the intended flat one-dir-per-family — **not** a
long-dir violation.

### 2e. `demo/` — chassis / shell / stories

Colocation is largely honored:

- `demo/chassis/` splits by concern: `body/ code/ family/ hero/ landing/ page/ play/ section/
  showcase/` + a few root files (`index.ts`, `routeTransition.ts`, `useStoryNavigation.ts`,
  `TransitionRouteLink.vue`). Fine.
- `demo/shell/` colocates its docks + `configurator/` + shell composables
  (`useContextualDockLayers.ts`, `useShellNavDock.ts`, `dock-layer-contexts.ts`, `dock-nav.css`). Fine.
- `demo/stories/` — story-local helpers **are** colocated per-story: `motion/deck/{gooBarbellGeometry,useDeckGoo}.ts`,
  `substrates/aurora/{config/,presets.ts,usePresetThumbnails.ts}`,
  `substrates/fourier-field/{fGlyphPoints,fourier-paths}.ts`. Good.
- Minor: `demo/stories/substrates/presets.ts` is a substrates-level shared helper alongside
  the per-family `aurora/presets.ts` — check it has ≥2 story consumers or fold. `demo/examples/`
  (3 files) sits apart from `stories/` — cosmetic.

No demo colocation violations of note.

### 2f. `scripts/` (the "backend")

Module discipline **already exists**: `scripts/lib/` (12 modules incl. `subpath-policy.mjs`,
`paint-arm.mjs`, `token-manifest.mjs`, `surface-closure.mjs`, `minify-css.mjs`) + `scripts/lib/detect/`.
Subdirs: `__tests__/`, `fixtures/`, `aurora-profile/`, `lighthouse/`. The in-flight
transaction is **removing** the one-off tranche machinery (`scripts/tranche/` fully deleted;
`scripts/verification/` deleted) — consistent with the edict's "encapsulate, retire
archaeology" thrust.

13 top-level `.mjs`/`.sh`:
- **Owned tooling** (keep): `regen-exports.mjs`, `regen-primitives.mjs`, `regen-spring-tokens.mjs`
  (generators tied to `lib/subpath-policy`), `verify-export-types.mjs`, `verify-siblings-intact.mjs`,
  `flatten-subpath-types.mjs`, `no-masking-manifest.mjs`, `profile-bundle.mjs`, `release.sh`,
  `token-manifest-allowlist.json`.
- **One-off archaeology** (fold into `lib/` or retire): `audit-stash-list.mjs`,
  `reflect-capture-verify.mjs`, `worktree-gc.mjs` (tranche-scoped; dies with the tranche
  machinery being deleted).

Small residual (~2–3 files); scripts is otherwise in good structural order.

---

## 3. Violation classes + move-size estimates (addenda seed)

| class | what | files | priority |
| --- | --- | --- | --- |
| **A. `_shared` single-consumer / dead** | `ModalOverlay.vue` → colocate into `components/dialog/`; `useStalePropWarning.ts` → delete (0 refs) | **2** | high (clean, unambiguous) |
| **B. composables library-orphan** | `composables/virtual/` (4 files: useVirtualSectionWindow, useWindowedStore, virtualSectionLayout, index) — INTERNAL, 0 in-repo consumers, demo-only. Relocate to `demo/` or accept as a demoed-primitive with a documented rationale. `keyboard/`+`sidebar/` are thin-but-published — leave. | **~4** | medium |
| **C. long-dir split — `composables/motion/`** | 43 → ~6 encapsulated sub-modules behind the existing barrel | **~35** | high (the flagship long-dir) |
| **C2. `_shared` sub-grouping** (optional) | 19 → field/disclosure/feedback/menu/surface subgroups | ~17 | low |
| **C3. `styles/{glass,tokens}` sub-grouping** (optional) | cohesive token partials | ~40 | low |
| **D. stale empty-dir husks** | 14 empty dirs on disk from the in-flight consolidation — `src/components/{border-progress,controls,focus-scope,goo-filter,icon-chip,icon-tooltip,metric-badge,metric-cell,metric-stack,section,spa-view}`, `src/components/constellation/shaders`, `src/components/border-progress/composables`, `src/styles/tabs`, `demo/configurator/presets`, `demo/stories/motion/curve-gallery`. **Git will not commit empty dirs** — they vanish on fresh checkout, so this is working-tree litter, not shipped structure. Cosmetic. | 14 dirs (rmdir) | low (cosmetic; won't ship) |
| **E. scripts one-offs** | fold/retire `audit-stash-list.mjs`, `reflect-capture-verify.mjs` (worktree-gc dies with tranche machinery) | ~2 | low |

**Net actionable move size:** Class A+B+C ≈ **41 files** across three tight waves (the
`_shared` cleanup, the `virtual` disposition, the `motion` split). Everything else is
optional refinement or cosmetic litter that git will not carry forward.

---

## Caveats / UNVERIFIED

- MS1 produced no verifiable committed artifact; "folded/no-op" is inferred from the absence
  of any `ms1` commit and any structure-authority file on disk, plus the formation's
  "census-as-baseline" ruling. I did **not** find positive proof MS1 ran as its own step.
- Consumer counts derive from static import resolution (relative + `@/` + `@glass/`); dynamic
  `import()` and barrel re-exports are included where literal, but a runtime-only consumer
  could be undercounted. The single-consumer claims (ModalOverlay=dialog, useStalePropWarning=0,
  virtual=demo-only) were each confirmed by direct grep.
- The empty-dir class is asserted against the on-disk working tree; because git cannot track
  empty dirs, it will not appear in the eventual commit — reported as litter, not a defect.
