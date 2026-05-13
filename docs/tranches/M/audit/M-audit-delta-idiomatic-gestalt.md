# M.W4 Lane δ — idiomatic-gestalt + per-story consumption sweep

Read-only audit of every M-introduced API + every consumer's adoption pattern. Authored from the Lane δ Explore-agent return; agent was read-only, so the orchestrator persists the findings here.

## Methodology

Walked every M-introduced or M-modified surface and applied two gestalt heuristics:
- **Idiomatic vs workaround**: does the change use the canonical Vue 3.5 / Tailwind v4 / reka-ui v2 pattern, or does it bypass an established pattern?
- **Per-story consumption sweep**: does the demo's usage of an M-introduced primitive consume it canonically, or does it bypass the canon?

## Verdict: CLEAN

No P0 non-gestalt issues. No blocking idiomatic deviations.

## Per-change verdicts

### M.W0 — Carousel subpath substrate (v1.0.4)

- **`src/carousel.ts`** — re-exports the full `Carousel*` family from `./components/ui/carousel`. **IDIOMATIC**: matches MIGRATION.md §1.2 contract; mirrors the root-barrel-curation pattern (Phase 2 SCC trap closure); single canonical home preserved.
- **Demo consumption**: `demo/stories/navigation/carousel.vue` + `demo/stories/containers/glass-carousel.vue` import from the internal `src/components/ui/carousel` path. Acceptable for in-repo consumers (per L.W2 lanes convention), but inconsistent with the MIGRATION.md doctrine that external consumers must use `/carousel`. **Recommend fast-follow** demo import path harmonisation.

### M.W0 — Precept submodule reconciliation

- **SPEC.md / ORCHESTRATION.md / AGENT_DISPATCH_TEMPLATE.md / LESSONS-LEARNED.md** — all reconciled at `08a2e9c` on precepts/main. M.Rδ P1 (`git checkout <path>` enumerated) + P3 (MULTI-WRITER) + P6 (dual ceiling) integrated inline. **IDIOMATIC**: matches the close-ceremony pattern actually used at M.

### M.W2 Lane A — F-ε-3 Configurator recursion fix

- **`ConfiguratorLayer.vue` CSS `grid-template-rows: 0fr ↔ 1fr` reveal** — **IDIOMATIC**. Vue 3.5 + Tailwind v4 canonical collapsible pattern; no JS watchers; no DOM-measurement race. Not a workaround — eliminates the recursion surface by construction (V4 architectural-transposition).
- **`MetaballCanvas.vue` `defineExpose` drop of `isSupported`** — **IDIOMATIC**. Closes the asymmetric mount/unmount cycle by making `isSupported` synchronous (composable-call-time probe).
- **`useMetaballs.ts` `isWebGLSupported()` synchronous probe** — **IDIOMATIC**. Exported from `src/components/custom/metaballs/index.ts` as the canonical consumer probe (replaces the broken `canvasRef.value?.isSupported` pattern).

### M.W2 Lane B — `src/api/` canonical-type promotions

5 type promotions all idiomatic with the existing api/ surface:

| Type | Canonical home | Naming pattern | Verdict |
|---|---|---|---|
| `GlassPanelVariant` | `src/components/custom/glass-panel/GlassPanel.vue` | `*Variant` (matches `ButtonVariants`, `BadgeVariants`, `ToastVariant`) | IDIOMATIC |
| `ConfiguratorCloneMode` | `src/components/custom/configurator/useConfiguratorState.ts` | `*Mode` (matches `ConfiguratorScrollMode`) | IDIOMATIC |
| `TimelineSegment` | `src/components/custom/timeline/types.ts` | data-shape type | IDIOMATIC |
| `TimelineSegmentGradient` | `src/components/custom/timeline/types.ts` | data-shape type | IDIOMATIC |
| `TimelineSegmentState` | `src/components/custom/timeline/types.ts` | lifecycle enum (parallel to `ToastVariant`) | IDIOMATIC |

Plus the canonical-home barrel fix at `src/components/custom/glass-panel/index.ts` re-exporting `GlassPanelVariant` from the SFC: **IDIOMATIC**. Closes the single-canonical-home invariant for the type.

### M.W2 Lane C — L cosmetic residuals absorb

Per-story consumption sweep results — for every M.W2 Lane C-modified story, confirm canonical-primitive consumption:

| Story | Change | Canonical primitive consumed? |
|---|---|---|
| `demo/stories/TokenLadder.vue` | `min-w-0 break-all` on token label cells | YES (grid structure unchanged) |
| `demo/stories/compositions/dashboard.vue` | `.kpi-strip-scroll` wrapper + `min-w-0` flex cols | YES (DockGroup primitive unchanged) |
| `demo/stories/aurora.vue` | `overflow-clip` on `.relative` host | YES (AuroraInstance + aurora chrome unchanged) |
| `demo/stories/primitives/dock-group.vue` | `MetricBadge` import from `/metric-badge` subpath | YES (now via canonical subpath) |
| `demo/stories/composables/use-story-demo.vue` | Relative import path canonicalisation | YES |

Non-story changes:
- `src/composables/motion/index.ts` barrel style — **IDIOMATIC**: aligns with sibling composables/ barrels (`dark/`, `keyboard/`, `dom/`, `reactive/`) that all use `export *`.
- `src/components/ui/_shared/ModalOverlay.vue` comment refinement — **IDIOMATIC**: precision improvement on `layout="edge"` semantics; no behavior change.

### M.W1 — per-consumer migration patterns

| Consumer | Adoption pattern | Verdict |
|---|---|---|
| keyframes.js | 23 SFCs → v1.0 flat subpaths per MIGRATION.md | IDIOMATIC |
| value.js | 27 imports → flat subpaths + 3 retired-upstream forks + 3 dead-barrel drops | IDIOMATIC |
| fourier-analysis | 4 `DockPopover`→`HoverPopover` swaps + `useOffsetPagination` local fork | IDIOMATIC |
| words/frontend | 17× `glass-subtle` → `glass-wash` resolution | IDIOMATIC (phantom→canonical, not a loss of semantic intent) |
| bbnf-buddy | 22 per-package subpath migrations + `ScrollArea`→`ScrollPane` rename + `useLeaveTimer` local impl | IDIOMATIC |
| speedtest | No source changes (Y handoff DONE; v1.0.4 consumption clean) | IDIOMATIC |

### words/frontend `glass-subtle → glass-wash` semantic check

Verified the resolution is correct:
- `glass-subtle` was a phantom class (not in `glass.css`, not in v1.0 `buttonVariants`) — pre-Lane status: silently no-op in DOM.
- `glass-wash` is the lightest rung of the canonical 5-rung ladder (`wash | quiet | resting | floating | overlay`).
- Disposition rationale (per W1-Lane-D proof): "the lightest rung is the closest semantic match" — phantom → canonical replacement, not loss of distinction.

## Non-gestalt findings + recommendations

**P0 issues**: None.

**Minor (informational)**:
- Demo carousel stories consume from direct SFC paths rather than `/carousel` subpath. Acceptable for in-repo demos but inconsistent with the migration doctrine. Recommend fast-follow demo import-path harmonisation (zero risk).
- Demo metaballs story still uses legacy `<MetaballCanvas v-if="canvasRef?.isSupported ?? true">` pattern. Structurally safe post-fix (defineExpose no longer ships `isSupported`; the `?? true` fallback always mounts) but could be cleaned up to consume `isWebGLSupported()` directly.

## Open questions for orchestrator absorb

Three integration points flagged for absorb (named-defer or fast-follow):

1. 26 pre-existing typecheck errors in `demo/stories/data/timeline-{continuous,segmented}.vue` (AA.W1 commits — out of M scope; named-defer to N or fast-follow patch).
2. Dock-layer substrate regression flagged by W2 Lane C (NEW out-of-bounds finding; needs M.W4 disposition — see ι sweep).
3. Demo carousel + metaballs story import-path harmonisation (fast-follow cosmetic; zero risk).

## Return

Status: CLEAN (gestalt audit passes; no P0 non-gestalt issues). 3 informational items routed to orchestrator for absorb/defer.
