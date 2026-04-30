# A.D.research.01 — Tranche A + B Retrospective (Reconstructed)

## Reconstruction method

Tranches A and B predate the bbnf-lang tranche format and left no formal tranche documents. Mined the git log across ~150 commits (March 25 — April 23, 2026) before c-close, categorised commits by scope and timeline, correlated with architectural decisions noted in commit messages, and cross-referenced the 101 library-orphan candidates from C.W0's overfitting audit.

**Phase A (Build-out)**: March 25 — April 8, ~84 commits. Initial library scaffold + foundational custom components + GlassDock stack + Aurora WebGL system.

**Phase B (Coherent Chrome)**: April 8 — April 23, ~65 commits. Demo storybook waves 1–3, UI unification, P2 configurator + Rail primitive, multi-component packages.

## Phase A — Build-out

### Core architectural moves
1. Foundation commit (`e8380d7`): 30+ shadcn-vue/reka-ui primitives + custom dock/atmosphere/tabs/controls packages. Four-tier glass token system. Keyframe integration. 176-line CLAUDE.md.
2. Dock multi-layer / vertical orientation (`9078f3e — 01d6f66`): DockLayer + DockLayerGroup sub-components with provide/inject; axis-aware composables.
3. Carousel primitives (`85d6b6a`): GlassCarousel + useGlassCarousel composable.
4. Atmosphere / Aurora WebGL (`d126359 — 7929353`): Metaball blob rendering; organic motion; `useAtmosphereCanvas` composable.
5. Token ecosystem matured: golden-ratio typography (√φ), semantic color aliases, icon/carousel/stack-overlap/heatmap palettes, 23 transition classes + 10 keyframes.

### Substrate-without-consumer count: ~38 library-orphan candidates
Per C.W0 audit, components fall into "built-but-not-wired":
- **Dock package**: DockPopover, DockLayerGroup, DockLayer, DockIconButton, DockSelectTrigger, DockDropdownTrigger — exported but zero demo stories at A close.
- **Glass-carousel package**: GlassCarousel, GlassCarouselItem, useGlassCarousel — built (`85d6b6a`), zero consumer.
- **Search package**: FuzzySearch, SearchBar, useFuzzySearch + 4 utility functions — `2af6501` (Mar 25); zero consumer.
- **Sidebar package**: ProgressiveSidebar + 4 composables — same commit; zero consumer.
- **Sortable package**: SortableList + 3 siblings — `d8a51e0`; demo lands 13 days later.
- **Singleton orphans (~14)**: ExpandableContainer, GlassPanel, InfiniteScroll, Pulse, MetricBadge, ConfirmDialog, StackedIconGroup, StatusDot, UnderlineTabs, GlassTimeline, ToggleChip, TypewriterText, useTypewriter, createAurora.

**Anti-pattern evidence**: components authored to public API (`src/index.ts`) BEFORE story consumer landed. Inverse of bbnf-lang SPEC §"Substrate-with-consumer".

### Silent deferrals
Commit messages reveal ad-hoc wiring with no explicit ledger:
- `d8a51e0` (Sortable): "add useSortable + SortableList primitive" — no demo target named.
- `85d6b6a` (GlassCarousel): "add custom GlassCarousel component" — no consumer planned.
- `2af6501` (FuzzySearch + ProgressiveSidebar): both packages built; both remain orphaned through C close.
- `ab97342` (DockIconButton + variants): "first-class DockIconButton, DockSelectTrigger, DockDropdownTrigger" — no demo named.

### Token/CSS anti-patterns leaking through
- Self-referential `@theme` mappings (caught by C.W1.D): `--radius-card: var(--radius-card)`. Worked around via cascade order; brittle.
- Undefined utility classes: `font-mono-code`, `text-2xs`, `dock-tab-btn` exist in markup with no `@utility` declaration — silent fallthrough to body cascade.
- CSS classes superseding components: `.glass-btn`, `.btn-pill`, `.input-pill`, `.cartoon-card` parallel to Button/Input/Card components — never wired.

## Phase B — Coherent Chrome

### Core moves
1. Demo storybook waves 0–3: 73 stories authored across 4 waves.
2. Configurator refactor (`c21fb39`, `cd7b4fa`): delta-based API; neutral-0..5 scale.
3. Rail primitive (`3338de9`): vertical dock-based rail; retired HeaderBar/BrandWordmark.
4. Button unification (`6eea8de`): CVA-based variants; deleted btn-pill-accent/ghost/glass classes.
5. UI alignment pass (`97c9bdb`): focus-ring tokens, interactive-state utilities, `cn()` forwarding — single sweep across 32 UI primitives.

### Substrate wiring in B
B added demo stories for: Sortable (`cd85566`), BouncyTabs (`41aa672`), StatusDot (`5440d2f`), Pulse + MetricBadge (`d0aec24`).

**Orphans remaining unwired at B close**: DockPopover/DockLayerGroup/DockLayer/DockSelectTrigger/DockDropdownTrigger, GlassCarousel package, FuzzySearch package, ProgressiveSidebar package, GlassPanel, InfiniteScroll, ConfirmDialog, GlassTimeline, TypewriterText, UnderlineTabs, ExpandableContainer, ToggleChip, createAurora, useTypewriter.

### Anti-patterns persisting from A into B
1. **Substrate-before-consumer model** — B wired some but most A orphans persist; no explicit triage decision.
2. **Silent token duplication** — C.W1.C found `font-mono-code` (60+ occurrences) duplicate-named for `fira-code`; `text-2xs` duplicate of `text-micro`. B didn't surface; the C audit did.
3. **Architectural pattern retirement not enforced** — dock.css comments said "moved to Vue components" but a `dock-tab-btn` plan would have re-introduced the retired pattern. C.W2.A's scope-reveal caught it.

## Library-orphan lineage (correlated with C.W0)

| Artefact | Introduced | Intended consumer | Today | Verdict |
|---|---|---|---|---|
| DockPopover | `e8380d7` | docs only | 0 | library-orphan |
| DockLayerGroup/Layer | `01d6f66` | docs only | 0 | library-orphan |
| DockSelectTrigger/DropdownTrigger | `ab97342` | none named | 0 | library-orphan |
| GlassCarousel + items | `85d6b6a` | none | 0 | library-orphan |
| FuzzySearch package (7 items) | `2af6501` | none | 0 | library-orphan |
| ProgressiveSidebar package (5 items) | `2af6501` | none | 0 | library-orphan |
| Sortable package (4 items) | `d8a51e0` | demo lands +13 days | 1 | keep |
| ToggleChip + variants | `5f97ff7` | none | 0 | library-orphan |
| Pulse, MetricBadge | `d0aec24` | demo metric story | 1 | keep |
| StatusDot | `5440d2f` | demo status story | 1 | keep |
| StackedIconGroup | `8b10c41` | none | 0 | library-orphan |
| GlassPanel, InfiniteScroll, ConfirmDialog, GlassTimeline, TypewriterText, useTypewriter, ExpandableContainer, UnderlineTabs, createAurora | various | none | 0 | library-orphan |

## Anti-patterns to bind against in D

### 1. Substrate-without-consumer at public surface
**Pattern**: component authored, added to `src/index.ts`, released without wired consumer.
**Guardrail for D**: before adding to `src/index.ts`, confirm story landing in same/current commit OR `docs/consumer-evidence/<Name>.md` with current consumer entry. Otherwise demo-only-private under `demo/_internal/`.

### 2. Silent token duplication & undefined-utility fallthrough
**Pattern**: token added without dedup audit; markup fallthroughs silent.
**Guardrail for D**: `grep -r` for similar names before adding any token; verify `@theme` references primitives, not itself; `rg` every `.class`/`@utility` ref across full corpus.

### 3. Architectural pattern retirement not enforced
**Pattern**: comment says retired; codebase still uses old + new code re-introduces.
**Guardrail for D**: at tranche open, search src/styles for comments like "retired/deprecated/moved-to"; mark as enforcement checkpoints; verify zero violations.

### 4. Gestalt alignment pass deferred until tail
**Pattern**: components ship with individually-correct state machines but no unified contract; corrective pass at end of subsequent phase.
**Guardrail for D**: document four-state CSS contract in JSDoc upfront; Playwright state-machine audit before close.

### 5. WIP scope underestimation
**Pattern**: `git status -s` count vs `git diff --stat` magnitude.
**Guardrail for D**: use `git diff --stat` for scope estimates; flag any file > 50 lines diff as separate sub-phase.

## Summary

A shipped library scaffold + Aurora WebGL + dock multi-layer + foundational tokens with high coherence but consumer adoption planning deferred implicitly. B shipped 73 stories + Configurator delta API + Rail primitive + button unification + UI alignment pass; wired some primitives but left 38+ orphaned. C's discovery: 101 library-orphans + 7 delete-unused + 3 self-referential tokens + 21 semantic-but-one-off utilities — all forwarded to D.

**D must bind**: pre-commit consumer-of-substrate check, dedup audit before adding tokens, enforce pattern retirement, four-state contracts upfront, `git diff --stat` for WIP scope.
