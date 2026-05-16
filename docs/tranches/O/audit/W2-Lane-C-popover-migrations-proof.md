# O.W2 Lane C—Popover-family consumer-site migrations to typed dock context

**Wave**: O.W2 (Dock subsystem DI canonical-shape migration)
**Lane**: C—4 popover-family consumer-site migrations
**Status**: complete; typecheck + 348 tests green; worktree changes ready for orchestrator merge.

## Scope

Migrate 4 popover-family consumer sites from raw string-key `inject(...)` of `"glassDockContext"` (and, for HoverPopover, `"glassDockId"`) to the canonical typed-context helper landed by Lane A (`src/components/custom/dock/composables/dockContext.ts`, commit `ba546c7`).

Bounds:

- `src/components/custom/hover-popover/HoverPopover.vue`
- `src/components/ui/popover/PopoverContent.vue`
- `src/components/ui/select/SelectContent.vue`
- `src/components/ui/dropdown-menu/DropdownMenuContent.vue`

Out of bounds (Lane A / Lane B):

- Any dock file
- `src/components/ui/slider/Slider.vue`

## Reconcile vs. dispatch spec

The dispatch spec referenced `useOptionalDockContext()`. The actual helper exported by Lane A's `dockContext.ts` at HEAD is:

```ts
export function useDockContext(): DockContext | null {
    return inject<DockContext | null>(DOCK_CONTEXT_KEY, null);
}
```

That is, a single helper whose silent-default semantics already match the lane-spec's `useOptionalDockContext` shape (returns `null` outside `<GlassDock>`). No strict-throw variant ships at HEAD. This lane uses `useDockContext()` accordingly—the resulting consumer-site behaviour is identical to the dispatch's described `dock?.id` access pattern.

`DockContext` at HEAD is `{ id: string; orientation: ComputedRef<DockOrientation> }`. Lane A did **not** consolidate `dockKeepOpen` / `dockRelease` / `dockHeld` onto the typed context—those remain raw string-keyed injects provided by `useDockState.ts`. The HoverPopover migration handles this asymmetry (see §HoverPopover below).

## Disposition (per-file before / after)

### File 1: `src/components/custom/hover-popover/HoverPopover.vue`

**Before** (lines 1–10 import block + 138–140 inject block):

```ts
import type { HTMLAttributes } from "vue";
import { computed, inject, ref, watch } from "vue";
import { /* reka-ui */ } from "reka-ui";
import { cn } from "../../../utils";

// ...

const dockKeepOpen = inject<(() => void) | null>("dockKeepOpen", null);
const dockRelease = inject<(() => void) | null>("dockRelease", null);
const dockId = inject<string | null>("glassDockId", null);
```

**After**:

```ts
import type { HTMLAttributes } from "vue";
import { computed, inject, ref, watch } from "vue";
import { /* reka-ui */ } from "reka-ui";
import { cn } from "../../../utils";
import { useDockContext } from "../dock/composables/dockContext";

// ...

/* O.W2 Lane C—`dockId` migrated to the canonical typed-context helper
   (`useDockContext()` returning `DockContext | null`). The `dockKeepOpen`
   / `dockRelease` callables remain raw injects pending a Lane A extension
   that surfaces them on `DockContext` (currently the typed context
   carries only `{ id, orientation }`). Optional dock contract preserved:
   outside a `<GlassDock>` the dock helper returns `null` and the keepOpen
   / release injects fall back to `null`, so the watcher is a no-op. */
const dock = useDockContext();
const dockKeepOpen = inject<(() => void) | null>("dockKeepOpen", null);
const dockRelease = inject<(() => void) | null>("dockRelease", null);
```

Call-site `dockId` references migrated:

```ts
// Before
const portalAttrs = computed(() =>
    props.keepDockOpen && dockId
        ? { "data-glass-dock-portal": "", "data-glass-dock-owner": dockId }
        : {},
);

// After
const portalAttrs = computed(() =>
    props.keepDockOpen && dock?.id
        ? { "data-glass-dock-portal": "", "data-glass-dock-owner": dock.id }
        : {},
);
```

`dockKeepOpen?.()` / `dockRelease?.()` call sites unchanged—those callables are not on `DockContext` and remain raw injects.

`inject` is still imported (still used for the two callable injects). The unused `string | null` type alias for `dockId` is gone.

### File 2: `src/components/ui/popover/PopoverContent.vue`

**Before**:

```ts
import { type HTMLAttributes, computed, inject } from 'vue'
// ...
const dockContext = inject<{ id: string } | null>("glassDockContext", null)
```

**After**:

```ts
import { type HTMLAttributes, computed } from 'vue'
// ...
import { useDockContext } from '../../custom/dock/composables/dockContext'
// ...
const dockContext = useDockContext()
```

Template references `dockContext?.id`—unchanged; the new helper returns `DockContext | null` and `.id` is still the read field.

`inject` import removed (no other usage).

### File 3: `src/components/ui/select/SelectContent.vue`

Same shape as PopoverContent. Diff is identical in spirit: import the helper, drop `inject`, swap the one local.

```ts
// Before
const dockContext = inject<{ id: string } | null>("glassDockContext", null)

// After
const dockContext = useDockContext()
```

### File 4: `src/components/ui/dropdown-menu/DropdownMenuContent.vue`

Same shape. Identical migration to PopoverContent / SelectContent.

```ts
// Before
const dockContext = inject<{ id: string } | null>("glassDockContext", null)

// After
const dockContext = useDockContext()
```

## File changes summary

| File | Adds | Removes | Net |
|---|---|---|---|
| `src/components/custom/hover-popover/HoverPopover.vue` | `+import { useDockContext }` + `const dock = useDockContext()` + comment | `dockId` raw inject; `dockId` references → `dock?.id` | +11 / -3 |
| `src/components/ui/popover/PopoverContent.vue` | `+import { useDockContext }` | `inject` named import; raw inject call | +3 / -2 |
| `src/components/ui/select/SelectContent.vue` | `+import { useDockContext }` | `inject` named import; raw inject call | +3 / -2 |
| `src/components/ui/dropdown-menu/DropdownMenuContent.vue` | `+import { useDockContext }` | `inject` named import; raw inject call | +3 / -2 |

Templates touch **zero** characters in PopoverContent / SelectContent / DropdownMenuContent. HoverPopover template is unchanged; only the `portalAttrs` computed in `<script setup>` shifted from `dockId` to `dock?.id`.

## Verification

- `npm run typecheck`—green (vue-tsc --noEmit, no errors).
- `npm test`—30 files, 348 tests, all passing (run duration 2.47s).
- `git -C <worktree> diff --stat`:

  ```
   src/components/custom/hover-popover/HoverPopover.vue    | 14 +++++++++++---
   src/components/ui/dropdown-menu/DropdownMenuContent.vue |  5 +++--
   src/components/ui/popover/PopoverContent.vue            |  5 +++--
   src/components/ui/select/SelectContent.vue              |  5 +++--
   4 files changed, 20 insertions(+), 9 deletions(-)
  ```

- Behavioural equivalence:
  - INSIDE `<GlassDock>`—`dockContext?.id` (PopoverContent / SelectContent / DropdownMenuContent) and `dock?.id` (HoverPopover) resolve to the dock's id; `data-glass-dock-portal=""` and `data-glass-dock-owner="<dockId>"` attributes emit exactly as before. The injection key is the same string (`"glassDockContext"`—Lane A's `dockContext.ts` declares `const DOCK_CONTEXT_KEY = "glassDockContext"`), and `provideDockContext({ id, orientation })` in `GlassDock.vue` supplies a context whose `.id` is the dock's id.
  - OUTSIDE `<GlassDock>`—`useDockContext()` returns `null` (silent default), `dockContext?.id` / `dock?.id` are `undefined`, and the `data-glass-dock-portal` / `data-glass-dock-owner` attributes do NOT emit (the `v-bind` with `undefined` values is a no-op in Vue). Matches prior behaviour.

- HoverPopover specific:
  - `dock?.id` replaces `dockId` for the dock-portal opt-in attributes.
  - `dockKeepOpen` / `dockRelease` raw injects unchanged; the keep-open watcher's no-op-outside-dock behaviour is preserved (still fallback to `null`).

## Open questions for orchestrator

1. **`dockKeepOpen` / `dockRelease` not on `DockContext`.** Lane A's `dockContext.ts` only consolidated `{ id, orientation }`. The Wave plan's invariant 25 implicitly asks for ALL six legacy keys (`dockKeepOpen`, `dockRelease`, `dockHeld`, `dockExpanded`, `glassDockId`, `glassDockContext`) to fold into the typed context. Lane B (Slider) will face the same asymmetry—`dockKeepOpen` / `dockRelease` / `dockHeld` are not yet on `DockContext`. Three options:
   - **(a)** Lane A reopens to extend `DockContext` with `keepOpen` / `release` / `held` (matches the dispatch packet's `dock?.keepOpen()` / `dock?.release()` / `dock.held` shape). Lane C re-migrates the two HoverPopover callables. **Recommended**—closes invariant 25 properly.
   - **(b)** Lane B / Lane C wrap their own callable-side injects via a small adapter inside each consumer. Defers the consolidation; leaves the inconsistency visible.
   - **(c)** Author a follow-up W2.1 to consolidate. Lane C as shipped is correct under (b)+(c).
2. **`provide("glassDockId", dockId)` in `GlassDock.vue` (line 98) is now dead.** With HoverPopover's `dockId` migrated, `glassDockId` has zero consumers. The W2 plan calls for dedup'ing it with `glassDockContext.id` (hard gate (b)). Lane A's worktree may or may not have removed the legacy `provide`—Lane C did not touch dock files per bounds. Orchestrator: please verify Lane A removes the `provide("glassDockId", ...)` call when merging.
3. **`useOptionalDockContext()` naming.** Dispatch spec called for `useOptionalDockContext()`; Lane A landed a single `useDockContext()` that returns `DockContext | null`. The behaviour is identical to the dispatch's intent. If a strict-throw helper is later required, it can ship as `useStrictDockContext()` (or rename the current helper and add a sibling) without touching Lane C consumers—they only need silent-default semantics.

## Worktree diff verification

```
$ git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-a936ef171e20d8453 diff --stat
 src/components/custom/hover-popover/HoverPopover.vue    | 14 +++++++++++---
 src/components/ui/dropdown-menu/DropdownMenuContent.vue |  5 +++--
 src/components/ui/popover/PopoverContent.vue            |  5 +++--
 src/components/ui/select/SelectContent.vue              |  5 +++--
 4 files changed, 20 insertions(+), 9 deletions(-)
```

No files outside lane bounds touched. No dock file mutated. No Slider file mutated.

## Closing

Worktree left in place; no git staging / commit / stash performed (hardened agent git clause).
