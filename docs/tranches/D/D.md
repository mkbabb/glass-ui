# D — Substrate-with-Consumer

Tranche document for Phase 4 of the glass-ui storybook reform. It now inherits shared orchestration from `docs/precepts/instructions/tranche/SPEC.md`; glass-ui-specific rules live at `docs/instructions/README.md`. Tranche letters: A = build-out, B = Coherent Chrome, C = Operational Truth, **D = Substrate-with-Consumer**.

## Opening

C closed at tag `c-close`. Six research agents (A1-A6) audited A+B+C, hunted dead/contrived code, measured velocity, drafted plans, and proposed E's architectural departure. Synthesis at `docs/tranches/D/research/SYNTHESIS.md`. D resolves every actionable item from the synthesis without deferral: wires the orphans whose abstractions earn their slot, deletes everything else (including the ~20 zero-value reka-ui façade wrappers and any composable not consumed by component or demo), hoists sidebar composables to `src/composables/sidebar/`, ships the Vitest harness with ~100 smoke tests, splits the typecheck and build into routine vs proof tiers, and re-runs the hardened audit at close. D's name is its thesis: every public-surface symbol has a Playwright-walked story or a current source consumer. Anything else deletes.

## Architectural thesis

A library exports what its consumers (including its own demo) actually use. Substrate without consumer is debt. The remedy is mechanical: re-ground each candidate against current master, wire it to a current consumer or delete it, and verify at close that the audit's actionable count drops below noise. The velocity work is structural, not cosmetic: routine iteration must complete in under 10 s wall, or every subsequent tranche pays the tax. Vitest is the missing test substrate; once it ships, E + F + G inherit it. The sidebar's split structure (composables under a component package, re-exported from `src/composables/`) is two concerns sharing one path: hoist them once, structurally, per CLAUDE.md's stated convention.

## Invariants

Cross-tranche preserved (A/B/C):

1. Library components are self-contained. No component requires an ancestor provider mounted by the consumer.
2. Tailwind-first. Every utility class has a matching `@theme` token or `@utility` block; no ambient fallthrough.
3. `@theme` references primitives. No self-referential `--x: var(--x)`.
4. Storybook chrome is library composition. `demo/layout/` does not re-implement glass primitives.
5. No silent overfitting. Every public-surface symbol has a current story, current internal consumer, or current external consumer. Audit runs at every tranche close.
6. Workspace green at every wave boundary. typecheck + build clean; zero console errors on Playwright walk.

D-specific:

7. **Re-grounded audit, not C's ledger.** Every wire/delete decision references a fresh `rg` against current master.
8. **Deletes propagate to `src/index.ts`.** Half-deletes don't pass; gate closes only when `git diff src/index.ts` shows the symbol removed AND `npm run build` exits 0.
9. **Wires are Playwright-walked.** A "wired" story whose route 404s, throws on mount, or renders empty `<main>` does not count.
10. **Consumer evidence names current code.** Every retained public symbol cites a current story path, internal source path, or external consumer repo path.
11. **Agent budgets calibrated at dispatch.** Each prompt declares tool-call budget per the wave's measured-scope-per-call rate (~3-5 tool calls per Playwright route from C.W4 measurement).
12. **Zero façade components.** A component whose template is `<X v-bind="props"><slot/></X>` with no added styling beyond `cn()` adds zero semantic value. Inline at consumer or delete.
13. **Routine cycle < 10 s wall.** `npm run iter-check && iter-build && iter-test` < 10 s. Hard infrastructure gate at D.W4 close.

## Wave schedule

Per-wave specs at [`waves/W{0..5}.md`](waves/) (shared precepts WAVE_SPEC format). Sub-agent dispatch boilerplate at [`dispatch/AGENT.md`](dispatch/AGENT.md). Orchestrator entry-point at [`HANDOFF.md`](HANDOFF.md).

| Wave | Title | Spec | Agents | Mode | Hard gate (one-line) | Status |
|---|---|---|---|---|---|---|
| W0 | Hardened audit + triage + structural decisions | [W0.md](waves/W0.md) | 5 | parallel | 9 audit docs landed; every C-forwarded candidate re-grepped; sidebar decision = hoist; façade-list enumerated | planned |
| W1 | Wire pass — orphan packages with demo stories | [W1.md](waves/W1.md) | 5 | parallel | every `wire`-verdict has Playwright-rendered story; manifest entry; route renders non-empty `<main>` zero console errors | planned |
| W2 | Delete pass — orphans + façades + sidebar hoist | [W2.md](waves/W2.md) | 5 | parallel | named symbols absent from `src/index.ts`; bundle smaller; sidebar at `src/composables/sidebar/`; consumer builds clean | planned |
| W3 | Consumer evidence sweep | [W3.md](waves/W3.md) | 2 | parallel | `docs/consumer-evidence/*.md` per retained public symbol that lacks a story; each cites current source paths; canned audit prompt updated | planned |
| W4 | Velocity foundation — Vitest + tsconfig.src + iter scripts | [W4.md](waves/W4.md) | 4 | parallel | `npm run iter` < 10 s wall; ~120-160 tests green; `scripts/ay-close.sh` end-to-end exits 0 | planned |
| W5 | Re-audit + close ceremony | [W5.md](waves/W5.md) | 4 + orchestrator | parallel + n/a | re-audit actionable ≤ 5; FINAL.md + retro committed; tag `d-close` | planned |

Cherry-pick-then-dispatch model. Worktrees pre-created at `/Users/mkbabb/Programming/glass-ui-wt-d-w<N><tag>`. Parallel agents within a wave have disjoint allow-lists; cross-wave conflicts sequence (W2 follows W1's `manifest.ts` consolidation).

## Phases

### D.W0 — Hardened audit + triage + structural decisions (5 parallel)

C.W0's auto-keep-on-public-surface masked half the signal until the `library-orphan` verdict was added mid-execution. C.W0's grep regex missed cross-package internal imports (sortable-list, timeline, infinite-scroll all have demo stories yet showed as orphans). D.W0 re-runs the audit with both refinements baked in.

#### D.W0.A — Hardened audit re-run (4 sub-agents per scope)
- **Mechanism**: re-run `docs/audits/overfitting-audit.md` canned prompt across `src/components/ui/`, `src/components/custom/`, `src/composables/`, `src/styles/` with two refinements: (1) for components, also `rg '<ComponentName' src/ demo/` (Vue tag form catches `<GlassTimeline>`-style template references); (2) for composables, `rg <symbol> src/` separately from import grep (catches re-export-chain consumers). Each agent returns ≤ 1500 words including the verdict table.
- **Files**: `docs/tranches/D/audit/W0-overfitting-{ui,custom,composables,styles}.md` (create — 4 sub-agents); orchestrator integrates to `docs/tranches/D/audit/W0-overfitting.md`.
- **Sub-gate**: integrated table covers C's 335-row baseline; `c-w0-verdict` vs `d-w0-verdict` columns with `delta` flag; expected delta ≥ 10 (false-negative recoveries).

#### D.W0.B — Triage classification per candidate
- **Mechanism**: synthesize the 4-agent integrated table into a single triage MD with one row per actionable candidate. Columns: `candidate | def-site | actual-site-count-rerun | proposed-action ∈ {wire, keep-current, delete} | rationale-with-rg | budget-estimate-tool-calls`. **Wire-vs-delete cutoff**: candidate is `wire` iff (a) a single-page demo story can be authored in ≤ 80 SLoC `<template>` + ≤ 40 SLoC `<script setup>` AND (b) the abstraction has semantic value beyond reka-ui's primitive (i.e., not a façade). Candidates failing either condition route through `delete` unless current source usage justifies `keep-current`.
- **Files**: `docs/tranches/D/audit/W0-triage.md` (create); `docs/tranches/D/audit/W0-already-resolved.md` (create — for C-forwarded rows whose re-grep flips to `keep`).
- **Sub-gate**: every C-forwarded candidate has either a triage row OR an already-resolved row. Sum equals 101.

#### D.W0.C — Façade enumeration (the A3 fold-in for D.W2)
- **Mechanism**: scan `src/components/ui/` for components whose `<template>` is a single-element body of `<X v-bind="props"><slot/></X>` or `<X v-bind="props" :class="cn(...)" />` with zero added logic. For each candidate, `rg` across all 3 consumer trees (`../fourier-analysis/web/src`, `../words/frontend/src`, `../bbnf-lang/playground/src`) to verify no consumer depends on the façade specifically. Façades with ≥ 1 consumer site stay as **wired façades** (they're real consumer-facing API; consumer migration to reka-ui direct happens at E). Façades with zero consumer sites delete in D.W2.
- **Files**: `docs/tranches/D/audit/W0-facade-list.md` (create).
- **Sub-gate**: enumerated facade table with consumer-grep rationale per row; verdict per row ∈ {delete, keep-as-wired-facade}.

#### D.W0.D — Sidebar restructure plan
- **Mechanism**: decide hoist mechanics. Option (i) chosen by user: move `src/components/custom/sidebar/composables/*` → `src/composables/sidebar/`; types stay co-located with the component (`src/components/custom/sidebar/types.ts`). Document the diff plan: files to move, `src/composables/index.ts` block to rewrite, `src/components/custom/sidebar/index.ts` shim removal.
- **Files**: `docs/tranches/D/audit/W0-sidebar-plan.md` (create).
- **Sub-gate**: plan enumerates exact `git mv` commands, `src/composables/index.ts` line-range to rewrite, `src/components/custom/sidebar/index.ts` shim deletion lines, expected post-move import paths in `ProgressiveSidebar.vue`.

#### D.W0.E — Plan critical-files audit
- **Mechanism**: confirm every file in §"Critical files" exists; demo paths correct; W1 allow-lists disjoint; W2 delete-list disjoint from W1 wire-list; W4 tooling files don't conflict with existing ones. Verify `tsconfig.src.json` doesn't yet exist (would conflict).
- **Files**: `docs/tranches/D/audit/W0-file-bounds.md` (create).
- **Sub-gate**: zero overlapping allow-lists; W1/W2 intersection = ∅; tooling-file-not-yet-present ✓.

**Hard gate (W0)**: 6 audit docs landed (4 per-scope + W0-overfitting integrated + W0-triage + W0-already-resolved + W0-facade-list + W0-sidebar-plan + W0-file-bounds = 9 files at minimum). Triage covers every C-forwarded candidate; façade verdicts assigned; sidebar plan recorded.

### D.W1 — Wire pass (5 parallel)

For every `wire`-verdict candidate from W0.B. Sub-agents partition by package.

#### D.W1.A — Search package
`demo/stories/data/search.vue` (create) exercising `FuzzySearch`, `SearchBar`, `useFuzzySearch`, `buildIndex`, `searchIndex`, `fuzzyMatch`, `clearSearchCache`. Sample 50-row dataset; results in `<Card>`; story controls trigger each helper explicitly. Append manifest row.
- **Sub-gate**: Playwright at `/data/search`: route loads; typing changes results; zero console errors.

#### D.W1.B — Carousel + Sortable extension
- `demo/stories/containers/glass-carousel.vue` (create) exercising `GlassCarousel`, `GlassCarouselItem`, `useGlassCarousel`.
- `demo/stories/data/sortable-list.vue` (modify) — extend coverage to demonstrate `SortableHandle` + `SORTABLE_CONTEXT` use (audit's grep missed these).
- **Sub-gate**: Playwright at `/containers/glass-carousel` (carousel pages on click; reactive index) and `/data/sortable-list` (drag-handle visible; reorder operates).

#### D.W1.C — Sidebar story
`demo/stories/navigation/progressive-sidebar.vue` (create) exercising `ProgressiveSidebar`, `useSidebarState`, `useSidebarFollow`, `useScrollTracker`, `useTreeIndex`, `buildTreeIndex`, `isActive`, `isInActiveChain`. Tree of mock document sections; sidebar tracks scroll; click navigates.
- **Sub-gate**: Playwright at `/navigation/progressive-sidebar`: scroll updates active-row class within 500ms; tree expand/collapse works.

#### D.W1.D — Dock subset extension
Extend existing `demo/stories/navigation/dock.vue` + `dock-layers.vue` with sections demonstrating `DockPopover`, `DockSelectTrigger`, `DockDropdownTrigger`, `DockIconButton`, `DockLayerGroup`. No new routes — gestalt: dock primitives belong together.
- **Sub-gate**: Playwright: every named subcomponent in DOM; each interactive subcomponent's basic action fires.

#### D.W1.E — Singleton orphans (per W0.B verdict)
For singleton orphans verdicted `wire`: extend existing category stories (Pulse/StatusDot → feedback; ToggleChip → primitives/buttons; ConfirmDialog → containers/dialog; TypewriterText/StackedIconGroup → compositions). New routes only when no fit. ExpandableContainer + GlassPanel + InfiniteScroll + GlassTimeline stay or delete per W0.B.
- **Sub-gate**: Playwright walk over modified routes; every wired component in DOM; manifest row growth ≤ 2.

**Hard gate (W1)**: every `wire`-verdict from W0.B has a Playwright-rendered story; `npm run typecheck` + `npm run build` clean; full route walk produces zero console errors.

### D.W2 — Delete pass — orphans + façades + sidebar hoist (5 parallel)

C-retro lesson: trust artefacts not claims. Every delete in W2 re-greps against current master immediately before `rm`; if a consumer surfaces, the row flips to `wire` and dispatches as a follow-on commit within W2.

#### D.W2.A — Delete orphan components
For each `delete`-verdict component from W0.B: `rm -rf src/components/custom/<package>/`; remove from `src/components/custom/index.ts`; remove from CLAUDE.md.
- **Sub-gate**: typecheck + build exit 0; `git diff src/components/custom/index.ts` shows exports removed; bundle size shrinks.

#### D.W2.B — Delete façade ui components
For each W0.C `delete` verdict: `rm` the component file; remove from `src/components/ui/<dir>/index.ts`; remove cn() / re-imports from any consumer in src/ or demo/. Wired façades (W0.C `keep-as-wired-facade`) remain untouched.
- **Sub-gate**: typecheck + build exit 0; consumer build smoke (`fourier-analysis/web`, `words/frontend`, `bbnf-lang/playground`) all exit 0.

#### D.W2.C — Hoist sidebar composables (per W0.D plan)
- `git mv src/components/custom/sidebar/composables/* src/composables/sidebar/`
- Create `src/composables/sidebar/index.ts` re-exporting all moved files.
- Rewrite `src/composables/index.ts` sidebar block: replace `export * from "../components/custom/sidebar"` with `export * from "./sidebar"`.
- Delete `src/components/custom/sidebar/composables/` directory.
- Trim `src/components/custom/sidebar/index.ts` to component + types only.
- Update `ProgressiveSidebar.vue` import paths.
- **Sub-gate**: `rg 'from "@/components/custom/sidebar/composables"' src/ demo/` empty; typecheck + build exit 0; consumer builds clean.

#### D.W2.D — Delete unwired CSS classes / @utility blocks
Per W0.B `delete` verdicts. C.W5 swept 4; D handles whatever the re-run flags new.
- **Sub-gate**: full route walk produces zero "missing utility" warnings.

#### D.W2.E — `src/index.ts` reconciliation + CLAUDE.md sync
Orchestrator-led consolidation post-W2.A/B/C/D cherry-picks. Verify cascade resolves; deleted package absent from `dist/index.d.ts`; update CLAUDE.md structure tree, custom-component count, composable count.
- **Sub-gate**: `dist/index.d.ts` doesn't contain any deleted symbol name; CLAUDE.md counts match `find` reality; consumer builds clean; bundle size delta recorded in commit.

**Hard gate (W2)**: typecheck + build clean; bundle strictly smaller than c-close (currently 381.42 kB JS); three consumer builds clean; CLAUDE.md counts match filesystem; sidebar at `src/composables/sidebar/`.

### D.W3 — Consumer evidence sweep (2 parallel)

#### D.W3.A — Per-`keep-current` evidence doc creation
For each `keep-current` verdict from W0.B: create `docs/consumer-evidence/<artefact>.md`. Each doc contains: (1) artefact path, (2) current source consumer path, (3) current use case, (4) `keep-current` rationale citing semantic value, (5) exact `rg` command proving the consumer. Items without current consumers flip to `delete` and route through W2 follow-on.
- **Sub-gate**: every `keep-current` verdict has a doc; current-consumer grep per doc passes.

#### D.W3.B — Index + canned-prompt verdict precedence
Create `docs/consumer-evidence/README.md` with table (artefact | doc | current consumer | added-in-tranche). Update `docs/audits/overfitting-audit.md`'s verdict precedence: before assigning `library-orphan`, check current source usage and cite `docs/consumer-evidence/` only when the grep still passes.
- **Sub-gate**: README row count = doc count; canned prompt references current consumer evidence.

**Hard gate (W3)**: `ls docs/consumer-evidence/*.md | wc -l` = `keep-current` count + 1 (README); every doc contains a current source path and exact `rg` command.

### D.W4 — Velocity foundation (4 parallel)

A4 measured: typecheck 11.8 s warm, build 6.5 s warm (65% = dts plugin), zero tests. D.W4 ships the three-tier surface and Vitest.

#### D.W4.A — `tsconfig.src.json` + `iter-check` script
- Author `tsconfig.src.json` extending `tsconfig.json` with `include: ["src/"]` (exclude demo/).
- Add `package.json` script: `"iter-check": "vue-tsc --noEmit --project tsconfig.src.json"`.
- **Sub-gate**: `time npm run iter-check` warm < 8 s wall.

#### D.W4.B — `vite.iter.config.ts` + `iter-build` script
- Author `vite.iter.config.ts` cloning `vite.config.ts` but **omitting the `dts()` plugin**.
- Add `package.json` scripts: `"iter-build": "vite build --config vite.iter.config.ts"`, `"emit-types": "vue-tsc --emitDeclarationOnly --outDir dist/types"` (used by full build only).
- **Sub-gate**: `time npm run iter-build` warm < 3 s wall.

#### D.W4.C — Vitest harness + smoke tests
- Install `vitest` + `@vitest/browser` (or `happy-dom`) + `@vue/test-utils`.
- Author `vitest.config.ts` (jsdom or happy-dom; reuses `tsconfig.json`).
- Author smoke tests at `tests/<area>/<component>.spec.ts`:
  - 32 ui components × 2-3 tests each (props, slots, variant) = ~70-90 tests
  - Surviving custom components × 2 tests each (post-W2 delete) = ~20-30 tests
  - 18 composables × 2 tests each = 36 tests
  - Total: ~120-160 tests
- Add `package.json` script: `"iter-test": "vitest run --reporter=verbose"`.
- **Sub-gate**: `time npm run iter-test` warm < 5 s wall; full suite green.

#### D.W4.D — Three-tier scripts + consumer validation
- Add `package.json` scripts:
  - `"iter": "npm run iter-check && npm run iter-build && npm run iter-test"`
  - `"profile-bundle": "vite build --config vite.config.ts --mode profile"` (with rollup-plugin-visualizer)
  - `"profile-consumers": "scripts/validate-consumers.sh"`
  - `"ay-close": "scripts/ay-close.sh"` (orchestrated full proof: clean + typecheck + build + iter-test + 3 consumer builds + screenshot baseline)
- Author `scripts/validate-consumers.sh` (loops over 3 consumer dirs, captures wall time + exit code).
- Author `scripts/ay-close.sh` (proof ceremony).
- **Sub-gate**: `time npm run iter` warm < 10 s wall (combined); `scripts/validate-consumers.sh` exits 0 on green build.

**Hard gate (W4)**: `npm run iter` < 10 s wall; ~120-160 Vitest tests green; `scripts/ay-close.sh` exists and runs end-to-end (consumer builds + bundle delta capture).

### D.W5 — Re-audit + close ceremony (4 parallel + orchestrator)

#### D.W5.A — Re-run hardened audit
Re-dispatch the 4-agent audit per `docs/audits/overfitting-audit.md` with W3.B's current-consumer evidence check. Integrate to `docs/tranches/D/audit/W5-overfitting.md`. Compute actionable count.
- **Sub-gate**: actionable count ≤ 5. Else: 5 < count ≤ 10 → declare D-II per SPEC §"Multi-pass tranche split" with named residual; count > 10 → halt + research+plan+redress triumvirate.

#### D.W5.B — Final QA sweep
Playwright walks every route in light + dark mode. Three consumer builds. Bundle size delta recorded.
- **Sub-gate**: light + dark zero console errors; consumer builds clean; bundle strictly smaller than c-close.

#### D.W5.C — FINAL.md
- **Sub-gate**: every D.W{0..4} sub-phase has commit hash row OR deferred-ledger row with named destination + rationale.

#### D.W5.D — Retro at `docs/tranches/D/audit/D-retro.md`
- **Sub-gate**: covers (a) hardened audit's false-negative recovery rate, (b) façade-deletion blast radius, (c) sidebar hoist scope-reveal, (d) Vitest authoring time vs estimate, (e) routine-cycle wall delta.

#### D.W5.E (orchestrator) — tag `d-close`

**Hard gate (W5)**: re-audit actionable ≤ 5 (or D-II declared); FINAL.md + retro committed; tag `d-close` placed.

## Critical files

| File | Owning sub-phase | Access | Purpose |
|---|---|---|---|
| `docs/tranches/D/audit/W0-overfitting-{ui,custom,composables,styles}.md` | D.W0.A | create | per-scope re-audit (4 agents) |
| `docs/tranches/D/audit/W0-overfitting.md` | D.W0.A | create | integrated 4-agent table |
| `docs/tranches/D/audit/W0-triage.md` | D.W0.B | create | per-candidate wire/keep-current/delete verdict |
| `docs/tranches/D/audit/W0-already-resolved.md` | D.W0.B | create | C-forwarded → keep flips |
| `docs/tranches/D/audit/W0-facade-list.md` | D.W0.C | create | ui façade enumeration with verdict per row |
| `docs/tranches/D/audit/W0-sidebar-plan.md` | D.W0.D | create | hoist diff plan |
| `docs/tranches/D/audit/W0-file-bounds.md` | D.W0.E | create | allow-list disjointness |
| `demo/stories/data/search.vue` | D.W1.A | create | FuzzySearch + helpers story |
| `demo/stories/containers/glass-carousel.vue` | D.W1.B | create | Carousel + composable story |
| `demo/stories/data/sortable-list.vue` | D.W1.B | modify | extend SortableHandle + SORTABLE_CONTEXT coverage |
| `demo/stories/navigation/progressive-sidebar.vue` | D.W1.C | create | sidebar + composables story |
| `demo/stories/navigation/{dock,dock-layers}.vue` | D.W1.D | modify | extend dock subset coverage |
| existing feedback/containers/compositions stories | D.W1.E | modify | wire singletons |
| `demo/stories/manifest.ts` | D.W1.A-E | modify-disjoint-hunks | append manifest rows |
| `src/components/custom/<deleted>/**` | D.W2.A | delete | unwired component packages |
| `src/components/ui/<facade-deletes>/**` | D.W2.B | delete | zero-value façade wrappers |
| `src/components/custom/index.ts`, `src/components/ui/index.ts` | D.W2.A/B | modify | drop deleted re-exports |
| `src/composables/sidebar/**` | D.W2.C | create+rename | hoisted composables |
| `src/components/custom/sidebar/composables/` | D.W2.C | delete | empty post-hoist |
| `src/components/custom/sidebar/{index.ts,ProgressiveSidebar.vue,types.ts}` | D.W2.C | modify | trim shim, update imports |
| `src/composables/index.ts` | D.W2.C | modify | rewrite sidebar block |
| `src/styles/<files>` | D.W2.D | modify | delete unused CSS rules |
| `src/index.ts`, `CLAUDE.md` | D.W2.E | modify-orchestrator-consolidation | reconcile cascade + counts |
| `docs/consumer-evidence/<artefact>.md` (×N) | D.W3.A | create | per-`keep-current` evidence doc |
| `docs/consumer-evidence/README.md` | D.W3.B | create | index |
| `docs/audits/overfitting-audit.md` | D.W3.B | modify | current-consumer verdict precedence |
| `tsconfig.src.json` | D.W4.A | create | src-only typecheck path |
| `vite.iter.config.ts` | D.W4.B | create | no-dts iter build |
| `vitest.config.ts` | D.W4.C | create | test runner config |
| `tests/<area>/<component>.spec.ts` (×~120-160) | D.W4.C | create | smoke tests |
| `scripts/validate-consumers.sh` | D.W4.D | create | consumer build orchestration |
| `scripts/ay-close.sh` | D.W4.D | create | proof ceremony orchestration |
| `package.json` | D.W4.A/B/C/D | modify-disjoint-hunks | scripts |
| `docs/tranches/D/audit/W5-overfitting-*.md` + integrated | D.W5.A | create | re-audit |
| `docs/tranches/D/FINAL.md` | D.W5.C | create | close document |
| `docs/tranches/D/audit/D-retro.md` | D.W5.D | create | retro |

W2.E and W4 `package.json` modifications are orchestrator-led consolidation commits per SPEC §"N-agent shared-file consolidation".

## Hard gates summary

| Wave | Gate | Verification artefact |
|---|---|---|
| W0 | 9 audit docs landed; triage + façade-list + sidebar-plan recorded; file-bounds disjoint | `ls docs/tranches/D/audit/`; row counts |
| W1 | every `wire`-verdict has Playwright-rendered story; typecheck + build clean; route walk zero errors | Playwright DOM evals; build exit codes; manifest row count delta |
| W2 | named symbols absent from `src/index.ts`; bundle smaller than c-close; consumer builds clean; sidebar at `src/composables/sidebar/` | `dist/index.d.ts` greps; `du -sh dist/glass-ui.js` delta; consumer build exits |
| W3 | every `keep-current` item has current-consumer evidence; canned prompt updated | `ls docs/consumer-evidence/*.md`; current-consumer grep per doc |
| W4 | `npm run iter` < 10 s wall; ~120-160 Vitest tests green; `ay-close.sh` end-to-end | `time` outputs; vitest run exit + count |
| W5 | re-audit actionable ≤ 5 (or D-II); FINAL.md + retro committed; tag `d-close` | re-audit table; `git show d-close` |

Every gate closes on runtime evidence per SPEC §"Runtime-evidence clause". No grep-only gates.

### Floor-check

- W4's "iter < 10 s" gate: A4 measured warm typecheck (full) at 11.8 s; src-only excludes demo (~50 files, ~14% of corpus) → ~7 s estimated. Build without dts is ~2.3 s (per A4: 6.5 s × 0.35 = 2.3 s). Vitest full suite < 1 s for 120 tests warm. Combined: ~10 s. Tight but achievable.
- W5.A's "actionable ≤ 5" gate: C.W0 was 108 actionable. D wires N (~30-50), deletes M (~30-50), and keeps only current-consumer evidence rows. Conservative conversion gives residual 5-10. ≤ 5 tight; fallback (D-II if 5 < count ≤ 10) named explicitly.

## Cross-tranche debt

**Inherited from C**:
- 101 library-orphan candidates (W0.A re-run flips ~10-15 to `keep`).
- 21 current-consumer evidence candidates (resolved at W3).
- 4 already-deleted items (D verifies cascade through `src/index.ts`).
- Reduced-motion visual emulation (forwarded to E — Playwright MCP doesn't expose CDP `Emulation.setEmulatedMedia`; E ships consumer-bundle measurement which can run direct Playwright if needed).
- Velocity gap (folded into D.W4).
- Kind-aware navigation pattern documentation (folded into D.W3 current-consumer evidence as `flat-route-contract.md`).

**Forwarded to E**:
- Subpath publication of orphan-package code that survives D as wired (e.g., `/dock`, `/aurora`, `/search`, `/sidebar`, `/sortable`, `/carousel`, `/timeline`, `/metaballs`).
- Reduced-motion visual emulation (consumer-build-test integration with direct Playwright).

**Forwarded to F**:
- Tailwind v4 plugin formalisation (40 kB → ≤ 12 kB CSS).
- Removal of deprecated `@import "@mkbabb/glass-ui/styles"` path.

**Forwarded to G or beyond** (named, not silent):
- Prop-API unification via `defineComponentBase` (composes on top of E + F; deferred until subpath publication has narrowed surface).
- Deeper a11y sweep (focus rings, aria coverage, dark contrast) — uses E's screenshot baseline.
- Consumer adoption push (move bbnf-lang/playground or fourier-analysis/web to use more glass-ui primitives).

## Escape clause

Workspace green at every wave boundary. No declared unworkability windows.

- **Absorb-mode**: if a W1 wire reveals the candidate needs new library code (not just demo SLoC), flip to `delete` and route through W2.
- **D-II split**: if W5.A's re-audit reports 5 < actionable ≤ 10, the architectural thesis holds; D-II opens with residual triage. > 10 → halt + research+plan+redress.
- **Consumer-build regression**: if W2.B's façade-deletes break a consumer build that wasn't surfaced by `rg`, restore the façade as `keep-as-wired-facade` (W0.C row update) and document in D-retro. Single sub-phase reversion, not a tranche-wide pause.
- **Diagnostic-loop relinquish**: agent in 3+ iterations without commit halts; orchestrator dispatches research+plan+redress.

## Directory layout

```
docs/tranches/D/
├── D.md                                        # this plan
├── PROGRESS.md                                 # dated wave log
├── FINAL.md                                    # close (W5.C)
├── research/                                   # already in place
│   ├── 01-AB-retrospective.md
│   ├── 02-C-deep-retro.md
│   ├── 03-code-health-hunt.md
│   ├── 04-velocity-audit.md
│   ├── 05-D-plan-draft.md
│   ├── 06-architectural-departure.md
│   └── SYNTHESIS.md
└── audit/
    ├── W0-overfitting-{ui,custom,composables,styles}.md
    ├── W0-overfitting.md
    ├── W0-triage.md
    ├── W0-already-resolved.md
    ├── W0-facade-list.md
    ├── W0-sidebar-plan.md
    ├── W0-file-bounds.md
    ├── W5-overfitting-{ui,custom,composables,styles}.md
    ├── W5-overfitting.md
    └── D-retro.md

docs/consumer-evidence/                         # NEW at D.W3
├── README.md
└── <artefact>.md (×~21+)

src/composables/sidebar/                        # NEW at D.W2.C (hoist target)
├── index.ts
├── useSidebarState.ts
├── useSidebarFollow.ts
├── useScrollTracker.ts
├── useTreeIndex.ts
├── buildTreeIndex.ts
├── isActive.ts
└── isInActiveChain.ts

tests/                                          # NEW at D.W4.C
├── ui/
│   ├── button.spec.ts
│   ├── card.spec.ts
│   └── ... (×~30 ui specs)
├── custom/
│   └── ... (×~15-20 custom specs)
└── composables/
    └── ... (×~18 composable specs)

scripts/                                        # NEW at D.W4.D
├── validate-consumers.sh
└── ay-close.sh

tsconfig.src.json                               # NEW at D.W4.A
vite.iter.config.ts                             # NEW at D.W4.B
vitest.config.ts                                # NEW at D.W4.C

demo/stories/data/search.vue                    # NEW at D.W1.A
demo/stories/containers/glass-carousel.vue      # NEW at D.W1.B
demo/stories/navigation/progressive-sidebar.vue # NEW at D.W1.C
```

## Verification (run end-to-end after D close)

- `npm run typecheck` + `npm run build` clean.
- `npm run iter` < 10 s warm.
- `npm run iter-test` ~120-160 tests green.
- `scripts/ay-close.sh` end-to-end exit 0.
- Bundle strictly smaller than `c-close` (`du -sh dist/glass-ui.js`).
- Playwright walk over post-D route set in light + dark: zero console errors.
- `rg <deleted-symbol> dist/index.d.ts` empty for every W2 deletion.
- `rg 'from "@/components/custom/sidebar/composables"' src/ demo/` empty.
- `npm run build` in 3 consumer dirs exit 0.
- `docs/tranches/D/audit/W5-overfitting.md` actionable count ≤ 5.
- `docs/consumer-evidence/` contains a doc per `keep-current` verdict with a current consumer.
- CLAUDE.md `<n> ui + <m> custom` / `<k> composables` counts updated to post-D values.
- `git tag` includes `d-close`.

## Ground rules

- **No workarounds.** Wires wire properly; deletes propagate through `src/index.ts` + CLAUDE.md.
- **No legacy code.** No deprecated re-exports. No façade kept for "compatibility" without a wired consumer.
- **No silent deferrals.** Every D forwarded item names the destination tranche.
- **No grep-only gates.** Build exit + Playwright DOM eval + bundle size delta + file existence with content checks.
- **No god modules.** Sidebar restructure separates composables from component per CLAUDE.md.
- **Substrate-with-consumer.** Every wire lands story + manifest + Playwright verification in same wave.
- **Zero façade components.** Per Invariant 12.
- **Routine cycle < 10 s.** Per Invariant 13. D.W4 is the structural foundation.
- **Frequent /commit.** One scope per sub-phase.
- **Master clean before each wave dispatch.** Cherry-pick model.
- **Audit-claim hardening.** Re-grep before every delete; trust artefacts not narrative.
- **Agent-budget calibration.** Each prompt declares tool-call budget at dispatch.
- **Idiomatic gestalt approach.** Architectural transpositions for elegance, simplicity, performance — necessary and desirable.

## Checklist — ready to dispatch D.W0

- [ ] `docs/tranches/D/D.md` on master.
- [ ] Worktrees pre-created: `glass-ui-wt-d-w0a`, `…-w0b`, `…-w0c`, `…-w0d`, `…-w0e`.
- [ ] Sub-agent prompts drafted from `docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md`; each declares tool-call budget.
- [ ] Allow-lists verified disjoint within W0.
- [ ] Master clean (`git status --short` empty).
- [ ] Hard-gate phrasings runtime-verifiable.

## Checklist — ready to close D

- [ ] Every sub-phase landed with commit hash, or appears in FINAL deferred ledger with destination.
- [ ] Every invariant (1-13) verified with artefact citation.
- [ ] Every hard gate closed with evidence path.
- [ ] `npm run typecheck` + `npm run build` + `npm run iter` clean.
- [ ] Bundle strictly smaller than c-close.
- [ ] Post-D Playwright walk: zero console errors in light + dark.
- [ ] Three consumer builds clean.
- [ ] `docs/tranches/D/audit/W5-overfitting.md` actionable ≤ 5 (or D-II declared).
- [ ] `docs/tranches/D/FINAL.md` composed.
- [ ] `docs/tranches/D/PROGRESS.md` close entry.
- [ ] `docs/consumer-evidence/` populated; canned prompt updated.
- [ ] CLAUDE.md structure tree + counts synced.
- [ ] All D-specific worktrees removed.
- [ ] `git tag d-close` placed.
