# D.W0.D - Sidebar hoist plan

## Current state evidence

Commands:

```sh
rg --files src/components/custom/sidebar src/composables | sort
nl -ba src/composables/index.ts
nl -ba src/components/custom/sidebar/index.ts
nl -ba src/components/custom/sidebar/ProgressiveSidebar.vue
nl -ba src/components/custom/sidebar/composables/*.ts
```

Observed source files:

```text
src/components/custom/sidebar/ProgressiveSidebar.vue
src/components/custom/sidebar/types.ts
src/components/custom/sidebar/composables/index.ts
src/components/custom/sidebar/composables/useScrollTracker.ts
src/components/custom/sidebar/composables/useSidebarFollow.ts
src/components/custom/sidebar/composables/useSidebarState.ts
src/components/custom/sidebar/composables/useTreeIndex.ts
src/composables/index.ts
```

Decision: hoist composables to `src/composables/sidebar/`. Keep shared sidebar data types at `src/components/custom/sidebar/types.ts`.

## Exact move commands

```sh
mkdir -p src/composables/sidebar
git mv src/components/custom/sidebar/composables/index.ts src/composables/sidebar/index.ts
git mv src/components/custom/sidebar/composables/useScrollTracker.ts src/composables/sidebar/useScrollTracker.ts
git mv src/components/custom/sidebar/composables/useSidebarFollow.ts src/composables/sidebar/useSidebarFollow.ts
git mv src/components/custom/sidebar/composables/useSidebarState.ts src/composables/sidebar/useSidebarState.ts
git mv src/components/custom/sidebar/composables/useTreeIndex.ts src/composables/sidebar/useTreeIndex.ts
```

No separate `buildTreeIndex.ts`, `isActive.ts`, or `isInActiveChain.ts` files exist. They are exported from `useTreeIndex.ts`.

## Target `src/composables/sidebar/index.ts`

Starting point is the moved `src/components/custom/sidebar/composables/index.ts` lines 1-6. Rewrite it to re-export moved composables plus the component-owned types:

```ts
export { useScrollTracker } from "./useScrollTracker";
export { useSidebarFollow } from "./useSidebarFollow";
export type { SidebarFollowOptions } from "./useSidebarFollow";
export { useSidebarState } from "./useSidebarState";
export type { UseSidebarStateOptions } from "./useSidebarState";
export { useTreeIndex, buildTreeIndex, isActive, isInActiveChain } from "./useTreeIndex";
export type {
    TreeNode,
    TreeIndexEntry,
    SidebarSection,
    SidebarIndexEntry,
    SidebarState,
    ScrollTrackerOptions,
} from "../../components/custom/sidebar/types";
```

## Line-range edits

| File | Current line range | Edit |
|---|---:|---|
| `src/composables/index.ts` | 15-34 | Replace the explicit sidebar value/type re-export block with `export * from "./sidebar";`. This preserves the public composable surface through the new hoisted package index. |
| `src/components/custom/sidebar/index.ts` | 2-7 | Delete composable value/type exports for `useSidebarState`, `useSidebarFollow`, `useScrollTracker`, `useTreeIndex`, `buildTreeIndex`, `isActive`, and `isInActiveChain`. |
| `src/components/custom/sidebar/index.ts` | 8-15 | Keep only component-owned type exports from `./types`; remove `UseSidebarStateOptions` and `SidebarFollowOptions` because those move with composables. |
| `src/composables/sidebar/useScrollTracker.ts` | 11 | Change `from "../types"` to `from "../../components/custom/sidebar/types"`. |
| `src/composables/sidebar/useSidebarState.ts` | 8 | Change `from "../types"` to `from "../../components/custom/sidebar/types"`. |
| `src/composables/sidebar/useTreeIndex.ts` | 1 | Change `from "../types"` to `from "../../components/custom/sidebar/types"`. |

Expected `src/components/custom/sidebar/index.ts` after trim:

```ts
export { default as ProgressiveSidebar } from "./ProgressiveSidebar.vue";
export type {
    TreeNode,
    TreeIndexEntry,
    SidebarSection,
    SidebarIndexEntry,
    SidebarState,
    ScrollTrackerOptions,
} from "./types";
```

## ProgressiveSidebar import check

`src/components/custom/sidebar/ProgressiveSidebar.vue` currently has no imports from `./composables/*`; lines 1-4 are:

```ts
import { ref } from "vue";
import { ChevronUp } from "lucide-vue-next";
import type { SidebarState } from "./types";
```

Therefore D.W2.C has no `ProgressiveSidebar.vue` composable import path to update. Keep the type import from `./types` unchanged. The stale-import gate should still run:

```sh
rg 'from "@/components/custom/sidebar/composables"' src/ demo/
rg 'from "../components/custom/sidebar/composables"' src/
rg 'from "\./composables' src/components/custom/sidebar src/ demo/
```

## Post-hoist verification

Run after the source move lands:

```sh
rg 'from "@/components/custom/sidebar/composables"' src/ demo/
rg 'from "../components/custom/sidebar/composables"' src/
rg 'src/components/custom/sidebar/composables' src/ demo/
npm run typecheck
npm run build
```
