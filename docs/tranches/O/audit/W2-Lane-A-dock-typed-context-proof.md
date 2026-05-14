# O.W2 Lane A — Dock typed-context + helper-pair canonicalization proof

**Wave**: O.W2 HEADLINE — dock DI canonical-shape migration (invariant 25).
**Lane**: A — author typed-context + helper-pair; migrate `<GlassDock>` provide; DockLayer DRIFT cleanup; ToggleGroup DRIFT cleanup.
**Status**: complete; verification green; transitional dual-provide preserved per W2 brittleness window.

## Disposition (per-file verdict)

### `src/components/custom/dock/composables/dockContext.ts` — REWRITE

Before:
- `DOCK_CONTEXT_KEY` was a raw string `"glassDockContext"`.
- `DockContext` carried `{ id, orientation }` only.
- `useDockContext()` returned `DockContext | null` (silent default).
- No paired strict/optional helpers; consumers manually-typed `inject<DockContext | null>(...)`.

After:
- `DOCK_CONTEXT_KEY: InjectionKey<DockContext> = Symbol("glass-ui:dock-context")`.
- `DockContext` expanded to `{ id, orientation, keepOpen, release, held }` — `keepOpen`/`release` lifted up-stack from `useDockState`'s descendant provides; `held` is the canonical `isHeld` rename.
- `useDockContext()` is now STRICT — throws `[glass-ui:dock] useDockContext() called outside <GlassDock>; use useOptionalDockContext() if the primitive may render outside a dock.`
- New `useOptionalDockContext()` returns `DockContext | null` — befitting silent default for Lane B/C consumers.
- `dockExpanded` field intentionally absent (zero downstream consumers per Rδ + `rg -n "dockExpanded" src/ demo/` confirmation).

### `src/components/custom/dock/composables/dockLayerContext.ts` — NEW

Authored from scratch:
- `DOCK_LAYER_GROUP_KEY: InjectionKey<DockLayerGroupContext> = Symbol("glass-ui:dock-layer-group")`.
- `DockLayerDescriptor` lifted from inline duplication in `DockLayer.vue`/`DockLayerGroup.vue` into the shared module.
- `DockLayerGroupContext` lifted out of `DockLayer.vue`'s inline duplicate.
- `provideDockLayerGroupContext()` + `useDockLayerGroupContext()` (strict — throws `<DockLayer> must be used inside <DockLayerGroup>`) + `useOptionalDockLayerGroupContext()` (reserved for future consumers; not currently used).

### `src/components/custom/dock/composables/index.ts` — UPDATE

Added exports for `useOptionalDockContext` + `DOCK_CONTEXT_KEY` + all 5 `dockLayerContext` symbols (`provideDockLayerGroupContext`, `useDockLayerGroupContext`, `useOptionalDockLayerGroupContext`, `DOCK_LAYER_GROUP_KEY`, plus the 2 types).

### `src/components/custom/dock/composables/useDockState.ts` — UPDATE

Before:
- Lines 230-237: `provide("dockKeepOpen", keepOpen); provide("dockRelease", release); provide("dockExpanded", expanded); provide<ComputedRef<boolean>>("dockHeld", isHeld);`
- Imported `provide` + `inject` from vue.

After:
- All 4 descendant-facing provides retired from `useDockState` (moved up-stack to `<GlassDock>`'s typed `provideDockContext` call + 3 transitional legacy provides).
- `dockExpanded` provide deleted permanently (zero downstream consumers per Rδ); `expanded` ref still on the return shape since `<GlassDock>` itself reads it.
- `provide`/`inject` imports dropped (no longer used inside the composable).
- Replaced the deleted block with an `O.W2 Lane A` comment documenting the migration.

### `src/components/custom/dock/GlassDock.vue` — UPDATE

Before:
- Lines 89-92: `provideDockContext({ id: dockId, orientation })` — 2-field context.
- Line 98: `provide("glassDockId", dockId)` — separate string-key provide (now dedup'd as `context.id`).
- `useDockState` destructured AFTER the provide, so `keepOpen`/`release`/`isHeld` weren't surfaced in the context.

After:
- `useDockState` destructure moved BEFORE the provide (required because the new typed context surfaces `keepOpen`/`release`/`held`).
- `provideDockContext({ id, orientation, keepOpen, release, held: isHeld })` — single canonical 5-field provide.
- Transitional legacy provides preserved for the duration of the W2 brittleness window:
    - `provide("dockKeepOpen", keepOpen)` — HoverPopover consumes (Lane C).
    - `provide("dockRelease", release)` — HoverPopover consumes (Lane C).
    - `provide("dockHeld", isHeld)` — Slider consumes (Lane B).
    - `provide("glassDockId", dockId)` — HoverPopover consumes (Lane C).
    - `provide("glassDockContext", { id: dockId })` — Popover/Select/DropdownMenu consume (Lane C). This is the LITERAL string-key consumed by the 3 reka-ui content wrappers; preserved as `{ id }` shape exactly for source compatibility.
- `dockExpanded` provide gone (zero consumers; not re-provided as a legacy).

### `src/components/custom/dock/DockLayerGroup.vue` — UPDATE

Before:
- `import { useDockContext }` — used the prior optional shape.
- `provide("dockLayerGroup", {...})` — raw string-keyed provide with anonymous shape.

After:
- `import { useOptionalDockContext }` — preserves silent-default semantics. `<DockLayerGroup>` was already accessing `dock?.orientation` with optional chaining, confirming it expects null. The strict `useDockContext` would have BROKEN any consumer rendering `<DockLayerGroup>` outside a `<GlassDock>`.
- `import { provideDockLayerGroupContext, type DockLayerDescriptor }` from the new context module.
- Inline `interface DockLayerDescriptor` deleted (lifted into `dockLayerContext.ts`).
- Provide call now `provideDockLayerGroupContext({ register, unregister, currentLayerId, leavingLayerId })`.
- NO legacy provide preserved for `"dockLayerGroup"` — Lane A owns both the provide site and the only consumer (`DockLayer.vue`); migration is atomic, no brittleness window needed.

### `src/components/custom/dock/DockLayer.vue` — UPDATE

Before:
- `import { ... inject ... }` + `import type { Component, Ref }`.
- Inline `interface DockLayerGroupContext { ... }` duplicated from the DockLayerGroup.vue inline type.
- `const group = inject<DockLayerGroupContext | null>("dockLayerGroup", null); if (!group) throw new Error(...)`.

After:
- `import { useDockLayerGroupContext }` from `./composables/dockLayerContext`.
- `const group = useDockLayerGroupContext()` — strict helper; throws internally with the canonical `<DockLayer> must be used inside <DockLayerGroup>` message. Same runtime behaviour, less duplication.
- Inline interface deleted; `Ref` import dropped.

### `src/components/ui/toggle-group/toggleGroupContext.ts` — NEW

Authored module-local typed context for ToggleGroup DRIFT cleanup:
- `TOGGLE_GROUP_KEY: InjectionKey<ToggleGroupContext> = Symbol("glass-ui:toggle-group")`.
- `ToggleGroupContext { variant, size }`.
- `provideToggleGroupContext` + `useOptionalToggleGroupContext()` (befitting silent default; `<ToggleGroupItem>` can render outside a group with its own `variant`/`size` props).
- No strict helper authored — there's no use case where `<ToggleGroupItem>` MUST be inside a group, so the strict counterpart would be dead code.

### `src/components/ui/toggle-group/ToggleGroup.vue` — UPDATE

Before: `provide('toggleGroup', { variant: props.variant, size: props.size })` + manual `provide` import.
After: `provideToggleGroupContext({ variant, size })` via the new helper; `provide` import dropped.

### `src/components/ui/toggle-group/ToggleGroupItem.vue` — UPDATE

Before: `const context = inject<ToggleGroupVariants>('toggleGroup')` — untyped key, no default, swallowed missing-context as `undefined`.
After: `const context = useOptionalToggleGroupContext()` — typed key, explicit null default, same downstream `context?.variant || variant` pattern.

### `src/styles/dock.css` — UPDATE

Rephrased the line-245 comment to reference the canonical `useOptionalDockContext().held` rather than the retired `inject("dockHeld")` shape, with a footnote pointing to invariant 25 / O.W2.

## File changes summary

```
 M  src/components/custom/dock/DockLayer.vue                     | 22 +++++-------
 M  src/components/custom/dock/DockLayerGroup.vue                | 17 +++++----
 M  src/components/custom/dock/GlassDock.vue                     | 34 ++++++++++++------
 M  src/components/custom/dock/composables/dockContext.ts        | 41 +++++++++++++++++++---
 M  src/components/custom/dock/composables/index.ts              | 10 ++++++
 M  src/components/custom/dock/composables/useDockState.ts       | 19 +++++-----
 M  src/components/ui/toggle-group/ToggleGroup.vue               |  9 ++---
 M  src/components/ui/toggle-group/ToggleGroupItem.vue           |  8 ++---
 M  src/styles/dock.css                                          |  3 +-
 ?? src/components/custom/dock/composables/dockLayerContext.ts   | NEW
 ?? src/components/ui/toggle-group/toggleGroupContext.ts         | NEW
```

9 modified files + 2 new files; +102/-61 in tracked diff + 2 new context modules.

## Verification

### Typecheck

```
$ npm run typecheck
> @mkbabb/glass-ui@1.2.1 typecheck
> vue-tsc --noEmit
[exit 0]
```

### Tests

```
$ npm test
 Test Files  30 passed (30)
      Tests  348 passed (348)
   Duration  2.40s
```

### Residual string-key audit

`rg -n '"dock[A-Z]\w*"|"glassDock\w*"|"dockLayerGroup"' src/` returns:

| Site | Kind | Action |
|---|---|---|
| `GlassDock.vue:75` (`useTemplateRef<HTMLElement>("dockEl")`) | Template ref NAME, not an inject key | none — false positive on the regex |
| `GlassDock.vue:127-131` (5 legacy `provide("dockKeepOpen"\|"dockRelease"\|"dockHeld"\|"glassDockId"\|"glassDockContext", ...)`) | Transitional dual-provide | Annotated `// O.W2 transitional — Lane B/C migrate consumers; retire at W2 close` |
| `GlassDock.vue:254` (`ref="dockEl"`) | Template ref binding | false positive |
| `useDockState.ts:232` | Docstring describing the retired provides | comment only |
| `dockLayerContext.ts:9` | Docstring referencing prior shape | comment only |
| `DockLayer.vue:16` | Docstring referencing prior shape | comment only |
| `HoverPopover.vue:138-140` | Lane C bound | NOT my territory |
| `PopoverContent.vue:33`, `SelectContent.vue:35`, `DropdownMenuContent.vue:27` | Lane C bound | NOT my territory |

NO unexpected residual string-key provides in dock-subsystem code. The 5 legacy provides in `GlassDock.vue` are the planned transitional state.

## Brittleness window status

Per W2.md `breaking_changes_during_wave: yes`, the transitional dual-provide state in `GlassDock.vue` is the intentional brittleness window. Composition:

1. **Lane A (this lane)** — typed context authored + provided; 4 of 5 string keys preserved verbatim (`dockKeepOpen`, `dockRelease`, `dockHeld`, `glassDockId`, `glassDockContext`); `dockExpanded` retired (zero consumers); DockLayer DRIFT cleanup atomic (Lane A owns both ends); ToggleGroup DRIFT cleanup surgical.
2. **Lane B (pending)** — migrate `Slider.vue` from `inject("dockKeepOpen", null)` + `inject("dockHeld", null)` to `useOptionalDockContext()`. After Lane B lands, `provide("dockKeepOpen", ...)` and `provide("dockHeld", ...)` in GlassDock.vue have no remaining consumers and can be retired.
3. **Lane C (pending)** — migrate `HoverPopover.vue` + `PopoverContent.vue` + `SelectContent.vue` + `DropdownMenuContent.vue` to `useOptionalDockContext()`. After Lane C lands, `provide("dockRelease", ...)`, `provide("glassDockId", ...)`, and `provide("glassDockContext", ...)` have no remaining consumers and can be retired.
4. **W2 close commit (orchestrator)** — sweep the 5 transitional legacy provides from GlassDock.vue.

The DockLayer + ToggleGroup migrations did NOT need a brittleness window because Lane A owns both ends of each provide/inject pair.

## Open questions for orchestrator

1. **Strict-vs-optional decision for `<DockLayerGroup>`'s dock-context inject**: I chose `useOptionalDockContext()` because the existing code uses `dock?.orientation.value ?? "horizontal"` with optional chaining, strongly implying the component is allowed to render outside a `<GlassDock>`. If the wave intent is that `<DockLayerGroup>` MUST always be inside a `<GlassDock>`, the strict helper is the better choice — but that would require a downstream consumer audit to confirm no bare-DockLayerGroup usage. Flagging for confirmation.
2. **`useOptionalDockLayerGroupContext` is currently unused**: I authored it for symmetry with the dock helper pair. If the wave's symbol minimalism standard objects, the unused helper can be deleted (one line of export; one helper function); no consumer depends on it yet.
3. **ToggleGroup is NOT exported from the package barrel as a public DI surface**: `toggleGroupContext.ts` is module-internal. If invariant 25 expects ALL typed-key DI modules to be re-exported, the toggle-group `index.ts` needs the same treatment as the dock composables barrel. Currently only the `<ToggleGroup>` + `<ToggleGroupItem>` components are exported.
4. **The `expanded` field in `useDockState`'s return shape**: still present (read by `GlassDock.vue` itself); only the `provide` was retired. If the orchestrator wants the field renamed/dropped from the return shape too, that's a follow-on.

## Worktree diff verification

```
$ git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-aa5ca525dea8abb60 diff --stat
 src/components/custom/dock/DockLayer.vue                | 22 +++++-------
 src/components/custom/dock/DockLayerGroup.vue           | 17 +++++----
 src/components/custom/dock/GlassDock.vue                | 34 ++++++++++++------
 src/components/custom/dock/composables/dockContext.ts   | 41 +++++++++++++++++++---
 src/components/custom/dock/composables/index.ts         | 10 ++++++
 src/components/custom/dock/composables/useDockState.ts  | 19 +++++-----
 src/components/ui/toggle-group/ToggleGroup.vue          |  9 ++---
 src/components/ui/toggle-group/ToggleGroupItem.vue      |  8 ++---
 src/styles/dock.css                                     |  3 +-
 9 files changed, 102 insertions(+), 61 deletions(-)

$ git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-aa5ca525dea8abb60 status --short
 M src/components/custom/dock/DockLayer.vue
 M src/components/custom/dock/DockLayerGroup.vue
 M src/components/custom/dock/GlassDock.vue
 M src/components/custom/dock/composables/dockContext.ts
 M src/components/custom/dock/composables/index.ts
 M src/components/custom/dock/composables/useDockState.ts
 M src/components/ui/toggle-group/ToggleGroup.vue
 M src/components/ui/toggle-group/ToggleGroupItem.vue
 M src/styles/dock.css
?? src/components/custom/dock/composables/dockLayerContext.ts
?? src/components/ui/toggle-group/toggleGroupContext.ts
```

No mutating git operations performed by the agent. The worktree is in place for orchestrator integration via `cp <worktree>/<file> <main>/<file>`.
