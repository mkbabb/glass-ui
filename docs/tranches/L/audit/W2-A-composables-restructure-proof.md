# L.W2 Lane A — composables/ restructure proof

**Wave**: L.W2. **Lane**: A. **Status**: PASS.
**Hard gate refs**: W2 (a) composables restructured into coherent sub-trees; (b) every importer in src/ + demo/ + tests/ updated; (c) `src/composables/index.ts` barrel re-exports sub-trees coherently; (g) typecheck + build + test green; budget PASS.

Lane B (sibling-module cohesion + import-shape) ran in parallel; this proof only covers Lane A's file moves + barrel + importer-graph edits.

## Survey (before)

Mixed shape at L.W2 open: 11 flat top-level `.ts` files + 4 sub-tree dirs.

```
src/composables/
├── glass/        useGlassRenderer + webgl/ + webgpu/
├── motion/       useScrollProgress, useSpringOrchestrator, useStaggerReveal,
│                 useAnimatedNumber, useAnimatedNumberMap, useDarkModeSync,
│                 useRAFLoop, useIntersectionPause, constants
├── sidebar/      useSidebarState, useSidebarFollow, useScrollTracker, useTreeIndex
├── sortable/     useSortable
├── __tests__/    10 vitest specs
├── dark.ts                 # impl (W0 Lane III lift)
├── keyboard.ts             # impl (W0 Lane III lift)
├── useGlobalDark.ts        # shim → dark.ts
├── useKeyboardShortcuts.ts # shim → keyboard.ts
├── useInterval.ts
├── useTimer.ts
├── useResizeObserver.ts
├── useTouchGate.ts
├── useTokenColor.ts
├── useStagger.ts
├── useStoryDemo.ts
└── index.ts                # 14-line barrel
```

`pagination/` + `virtual/` were retired at W3 (zero consumers). `useDarkModeSync` lives inside `motion/` (W3 left it WIRE-RETAINED there).

## Moves table

| Old path | New path | Kind |
|---|---|---|
| `src/composables/useGlobalDark.ts` | (deleted — was a shim) | retired |
| `src/composables/dark.ts` | `src/composables/dark/useGlobalDark.ts` + `dark/index.ts` | promote to sub-tree |
| `src/composables/useKeyboardShortcuts.ts` | (deleted — was a shim) | retired |
| `src/composables/keyboard.ts` | `src/composables/keyboard/useKeyboardShortcuts.ts` + `keyboard/index.ts` | promote to sub-tree |
| `src/composables/useInterval.ts` | `src/composables/reactive/useInterval.ts` | new sub-tree |
| `src/composables/useTimer.ts` | `src/composables/reactive/useTimer.ts` | new sub-tree |
| `src/composables/useResizeObserver.ts` | `src/composables/dom/useResizeObserver.ts` | new sub-tree |
| `src/composables/useTouchGate.ts` | `src/composables/dom/useTouchGate.ts` | internal `./useTimer` → `../reactive/useTimer` |
| `src/composables/useTokenColor.ts` | `src/composables/dom/useTokenColor.ts` | internal `./useGlobalDark` → `../dark` |
| `src/composables/useStagger.ts` | `src/composables/motion/useStagger.ts` | absorb into motion (the IntersectionObserver-gated `useStaggerReveal` already lives there) |
| `src/composables/useStoryDemo.ts` | `demo/composables/useStoryDemo.ts` | demo-private per CLAUDE.md |
| `src/composables/motion/useDarkModeSync.ts` | (in place) | internal `../useGlobalDark` → `../dark` |

Resulting shape:

```
src/composables/
├── dark/            useGlobalDark
├── keyboard/        useKeyboardShortcuts
├── reactive/        useInterval, useTimer
├── dom/             useResizeObserver, useTouchGate, useTokenColor
├── motion/          useScrollProgress, useSpringOrchestrator, useStaggerReveal,
│                    useAnimatedNumber, useAnimatedNumberMap, useDarkModeSync,
│                    useRAFLoop, useIntersectionPause, useStagger, constants
├── glass/           useGlassRenderer + webgl/ + webgpu/
├── sidebar/         useSidebarState, useSidebarFollow, useScrollTracker, useTreeIndex
├── sortable/        useSortable
├── __tests__/       (in place; relative imports rewritten)
└── index.ts         re-exports each sub-tree
```

## Importer-graph edits

**Total importer edits**: 24 files.

src/ (4):
- `src/components/custom/dock/GlassDock.vue` — `composables/useTouchGate` → `composables/dom/useTouchGate`
- `src/components/custom/controls/DarkModeToggle.vue` — `composables/useGlobalDark` → `composables/dark`
- `src/components/custom/expandable-container/ExpandableContainer.vue` — `composables/useKeyboardShortcuts` → `composables/keyboard`
- `src/components/custom/scrolling-text/ScrollingText.vue` — `composables/useResizeObserver` → `composables/dom/useResizeObserver`

src/ barrels (3):
- `src/composables/index.ts` — re-authored to re-export sub-trees coherently
- `src/index.ts` — updated `Core composables (vueuse-free)` block to point at `reactive/`, `dom/`, `motion/`, `glass/`, `sortable/`
- `src/dark.ts`, `src/keyboard.ts` — comment refresh; the `./composables/dark` and `./composables/keyboard` import targets now resolve through the new sub-tree `index.ts` files (no path change needed at the subpath barrel)

demo/ (13): all `demo/stories/composables/use-*.vue` rewritten + `demo/configurator/usePresetEditor.ts` + `demo/layout/AppShell.vue` + `demo/stories/aurora.vue`. New file `demo/composables/useStoryDemo.ts` lifted from `src/composables/useStoryDemo.ts`.

tests/ (8):
- `tests/useStoryDemo.spec.ts` — points at `demo/composables/useStoryDemo`
- `tests/public-surface.spec.ts` — typeSurfaceChecks rewritten to new home paths for `ShortcutOptions`, `RegisteredShortcut`, `TouchGateReturn`
- 6 specs under `src/composables/__tests__/` rewritten to new relative paths (`../reactive/useTimer`, `../dom/useTouchGate`, `../motion/useStagger`, `../dom/useTokenColor`, `../keyboard`, `../reactive/useInterval`)

## Sub-tree barrel snippets

`src/composables/dark/index.ts`:

```ts
export { useGlobalDark } from "./useGlobalDark";
```

`src/composables/keyboard/index.ts`:

```ts
export * from "./useKeyboardShortcuts";
```

`src/composables/reactive/index.ts`:

```ts
export * from "./useInterval";
export * from "./useTimer";
```

`src/composables/dom/index.ts`:

```ts
export * from "./useResizeObserver";
export * from "./useTouchGate";
export * from "./useTokenColor";
```

`src/composables/motion/index.ts` — `useStagger` added at the bottom alongside the existing motion exports.

`src/composables/index.ts` — re-exports every sub-tree (`dark`, `keyboard`, `reactive`, `dom`, `motion`, `glass`, `sortable`, `sidebar`) + the co-located infinite-scroll composable. Root barrel (`src/index.ts`) intentionally does NOT walk `dark` or `keyboard` (vueuse-bearing); those reach consumers via the flat `/dark` + `/keyboard` subpaths.

## Public-surface preservation

- The flat `@mkbabb/glass-ui/dark` and `@mkbabb/glass-ui/keyboard` subpaths still resolve unchanged — `src/dark.ts` and `src/keyboard.ts` re-export `./composables/dark` / `./composables/keyboard`, which now resolve through the sub-tree `index.ts` barrels rather than the retired top-level impl files.
- Root barrel symbols `useGlobalDark` and `useKeyboardShortcuts` remain absent from the root barrel (L.W1 Lane A SCC closure preserved).
- `useStoryDemo` is no longer exported from `src/composables/index.ts` — demo-private status per CLAUDE.md is now enforced by file location.

## Verification

| Gate | Result |
|---|---|
| `npm run typecheck` | PASS (vue-tsc --noEmit, no diagnostics) |
| `npm test` | PASS (27 files / 330 tests) |
| `NODE_OPTIONS=--max-old-space-size=8192 npm run build` | PASS (dts emission clean; `dist/glass-ui.js` 123.75 kB) |
| `npm run profile:budget` | PASS (`glass-ui.js` 65.1% raw / 65.8% gzip; `glass-ui.css` 77.9% raw / 77.3% gzip) |

## Worktree diff (final)

```
 M demo/configurator/usePresetEditor.ts
 M demo/layout/AppShell.vue
 M demo/stories/aurora.vue
 M demo/stories/composables/use-{dark-mode-sync,global-dark,interval,keyboard-shortcuts,resize-observer,stagger,story-demo,timer,token-color,touch-gate}.vue
 M docs/tranches/K/audit/W4-bundle-profile.json   # regenerated by profile:budget
 M src/components/custom/{controls/DarkModeToggle,dock/GlassDock,expandable-container/ExpandableContainer,scrolling-text/ScrollingText}.vue
 M src/composables/__tests__/use{Interval,KeyboardShortcuts,Stagger,Timer,TokenColor,TouchGate}.test.ts
 D src/composables/{dark,keyboard,useGlobalDark,useInterval,useKeyboardShortcuts,useResizeObserver,useStagger,useStoryDemo,useTimer,useTokenColor,useTouchGate}.ts
 M src/composables/index.ts
 M src/composables/motion/{index.ts,useDarkModeSync.ts}
 M src/{dark,index,keyboard}.ts
 M tests/{public-surface,useStoryDemo}.spec.ts
?? demo/composables/useStoryDemo.ts
?? src/composables/{dark,dom,keyboard,reactive}/
?? src/composables/motion/useStagger.ts
```

11 deletions; 4 new sub-tree dirs; 1 new motion leaf; 1 new demo-private file; 24 modifications.

## Open questions for orchestrator

1. **CLAUDE.md tree diagram** — Lane B will update the `composables/` section of CLAUDE.md to reflect the new shape. Lane A's moves are settled; the diagram refresh is a doc walk that fits Lane B / W5 territory.
2. **`useDarkModeSync` placement** — left inside `motion/` per the W3 status. It depends on `useGlobalDark` (now imported via `../dark`); placing it under `dark/` was considered but `useStaggerReveal` already lives in `motion/` and `useDarkModeSync` is closer to motion-driven canvas-resync work than to the dark-mode state machine itself.
3. **No `package.json` exports change** — internal restructure only. Subpath surface unchanged.
4. **`docs/tranches/K/audit/W4-bundle-profile.json` regeneration** — the budget gate rewrites this file on every run; the diff in the worktree is a no-op delta on bundle sizes (under the budget) and is safe to land OR safe to ignore via `git checkout -- docs/tranches/K/audit/W4-bundle-profile.json` at orchestrator's discretion.
