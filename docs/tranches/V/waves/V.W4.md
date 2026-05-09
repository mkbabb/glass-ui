# V.W4 — Storybook + composables expansion (v0.9.0)

**Cohort window**: `227e1b0` (2026-05-08) → `23ce73c` (2026-05-08) — 14 commits delivering chassis primitives, useStoryDemo, missing primitive entries, 24 composable storybook entries, 3 token-tour pages, smoke-gate test, and v0.9.0 release.
**Mode**: sequential storybook + composable cohort.
**Status**: closed @ `23ce73c` (v0.9.0 release).

## Purpose

V.W4 expands the public storybook surface to canonical-chassis-aware coverage. Where V.W2 + V.W3 converged the substrate, V.W4 exposes it: ships 5 demo-private chassis primitives, lifts the 23-composable public surface to a documented storybook entry per composable, adds 9 missing primitive entries, and lands a smoke-gate test asserting manifest-vs-file integrity.

## Commit cohort

### Chassis primitives + useStoryDemo

| Commit | Subject | Notes |
|---|---|---|
| `227e1b0` | feat(useStoryDemo): canonical play/reset/status harness with cleanup discipline | Mirrors useStagger's timer-set discipline; cleanup(fn) registrar fires on reset() + onScopeDispose. |
| `deff97a` | feat(StorySection): demo-side label + body chassis primitive | Demo-private; replaces ~hand-rolled story-section literals. |
| `8136baf` | feat(ShowcaseFrame): pad knob with 5 rungs over rounded-card showcase chassis | Replaces `rounded-card border border-border bg-card shadow-cartoon` idiom across ~25-30 sites. |
| `60fd745` | feat(DockShowcaseFrame): chassis-aware showcase frame for 13 dock sites | Sibling of `<ShowcaseFrame>` with dock-tier substrate (bg-card/40 + justify-center). |
| `cfbcb48` | feat(TokenLadder + ToneSwatch): token tour primitives | Foundation of the token-tour pages. |

### Storybook entries

| Commit | Subject | Notes |
|---|---|---|
| `fb38034` | feat(stories): add 9 missing primitive entries | configurator, dark-mode-toggle, expandable-container, icon-tooltip, labeled-field, paper-backdrop, stacked-icons, toggle-chip, glass-panel. Absorbs K W1.c (Configurator second consumer). |
| `1fdfd4d` | feat(stories): Toaster.vue story (B4 §3.3 — A4 missed ui/ orphan) | ui/ orphan filled. |
| `a686f78` | feat(stories): Badge success/warning/info variants demo | Pairs with `5dfe6fb` Badge variant additions. |
| `323d675` | feat(stories): 24 composable storybook entries (public surface) | 23 V.W4-spec public composables + useStoryDemo. |
| `d7a90f4` | fix(stories): typecheck reconcile — v-pre + ref-unwrap + correct API shapes | Story typecheck fixes after composable expansion. |

### Token-tour foundation pages

| Commit | Subject | Notes |
|---|---|---|
| `f8d3bed` | feat(stories): Surface Tints token-tour page | Consumes `<TokenLadder>` + `<ToneSwatch>`. |
| `879e9ff` | feat(stories): Overlays & Scrims token-tour page | Consumes `<TokenLadder>` + `<ToneSwatch>`. |
| `3828c15` | feat(stories): Chart & Chassis Palette token-tour page | Consumes `<TokenLadder>` + `<ToneSwatch>`. |

### Story migrations + smoke gate

| Commit | Subject | Notes |
|---|---|---|
| `1c9a487` | refactor(stories/badge): adopt <StorySection> primitive | Canonical chassis adoption. |
| `ea7005d` | refactor(stories/toast): retire raw Tailwind tones for semantic tokens | Story tone migration. |
| `6667370` | feat(tests): smoke gate over storybook manifest (V.W4.T16) | vitest variant; asserts manifest integrity, story-id uniqueness, lazy-import resolution. Replaces originally-spec'd Playwright over-the-DOM smoke. |

### v0.9.0 release

| Commit | Subject |
|---|---|
| `23ce73c` | release(v0.9.0): chassis primitives + 23 composables + structural unions + foundation polish |

## Hard-gate items

- `useStoryDemo` canonical play/reset/status harness (`227e1b0`).
- `<StorySection>` demo-side label + body chassis primitive (`deff97a`).
- `<ShowcaseFrame>` pad knob 5 rungs over rounded-card showcase chassis (`8136baf`).
- `<DockShowcaseFrame>` chassis-aware showcase frame for 13 dock sites (`60fd745`).
- `<TokenLadder>` + `<ToneSwatch>` token tour primitives (`cfbcb48`).
- 9 missing primitive entries (`fb38034`) — absorbs K W1.c (Configurator second consumer).
- `<Toaster>` story (`1fdfd4d`).
- `<Badge>` success/warning/info variants demo (`a686f78`).
- 24 composable storybook entries (`323d675`).
- Story typecheck reconcile: v-pre + ref-unwrap (`d7a90f4`).
- Token-tour pages: surface tints (`f8d3bed`), overlays & scrims (`879e9ff`), chart & chassis palette (`3828c15`).
- `<Toast>` raw Tailwind tones retired for semantic tokens (`ea7005d`).
- `<Badge>` story adopts `<StorySection>` (`1c9a487`).
- Storybook smoke-gate test (`6667370` — V.W4.T16). The commit subject explicitly references `V.W4.T16`, the only V-tranche numbering reference in the cohort and the cited evidence in the K reconciliation that V was a real (if unwritten) tranche.
- v0.9.0 release: chassis primitives + 23 composables + structural unions + foundation polish (`23ce73c`).

## Architectural transpositions executed

- **5 chassis primitives** — `<StorySection>`, `<ShowcaseFrame>`, `<DockShowcaseFrame>`, `<TokenLadder>`, `<ToneSwatch>`. All demo-private (live under `demo/stories/`); not exported from `src/`.
- **`useStoryDemo` composable** — canonical play/reset/status harness with cleanup discipline. Demo-private.
- **24 composable storybook entries** (`323d675`) — public composable surface documented for the first time. 23 V.W4-spec public + `useStoryDemo`.

## Composables landed in v0.9.0

The 23-composable public surface (per `323d675` + release-note semantics):

**Platform**: `useGlobalDark`, `useKeyboardShortcuts`, `useResizeObserver`, `useGlassRenderer`, `useTouchGate`, `useTimer`, `useInterval`.
**Motion**: `useAnimatedNumber`, `useAnimatedNumberMap`, `useDarkModeSync`, `useIntersectionPause`, `useRAFLoop`, `useScrollProgress`, `useSpringOrchestrator`, `useStagger`, `useStaggerReveal`, `useTokenColor`.
**Pagination + virtual + sortable**: `useOffsetPagination`, `useVirtualSectionWindow`, `useWindowedStore`, `useSortable`, `useInfiniteScroll`.
**Sidebar**: `useScrollTracker`, `useSidebarFollow`, `useSidebarState`, `useTreeIndex`.

Plus `useStoryDemo` (V.W4.T5; demo-private).

## Test gates

- `npm test` 311/311 (was 301 at v0.8.6 baseline; +6 useStoryDemo + 4 stories smoke).
- `npm run typecheck` exit 0.
- `npm run build` exit 0; `dist/index.d.ts` exposes `useStoryDemo` + every chassis-side composable.
- Speedtest `npm run check` exit 0.
- Speedtest `npm run test:run:client` 304/304 (≥ 287 baseline).

## Authority

V.W4 closes at `23ce73c` — the v0.9.0 release commit, also the V-tranche close. No 6-agent post-close audit ran; no `audit/V.W4-*.md` deliverables exist. K's 2026-05-08 reconciliation substitutes.

Cross-tranche debt absorbed: K W1.c (Configurator second consumer via `fb38034` primitive story).

V.W4 is the most-visible cohort: it ships the public surface that the K reconciliation faces. The 23 promoted composables + 5 chassis primitives + 9 missing primitive entries are what made the K plan's CLAUDE.md / README.md / DESIGN.md drift "larger at HEAD than at K open" (per K W4 hard gate).
