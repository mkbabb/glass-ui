# J.W3.B — DockPopover Collapse onto HoverPopover

**Wave**: J.W3 Lane B.
**Owner**: single-agent SEQUENTIAL.
**Status**: closed.

## Architectural transposition (J invariant 2)

R1 §A diagnosed `<DockPopover>` (273 LOC) as a hand-rolled re-implementation of every facility reka-ui's HoverCard / Popover already provides:
- click-away (`pointerdown` capture listener)
- direction-flip on viewport clip (custom `triggerRect.top - panelRect.height < VIEWPORT_PAD` check)
- horizontal nudge on center-align clip
- mount-time positioning seed
- hover-trigger + delayed-close timer (the only feature not in `<Popover>` — but `<HoverCard>` ships it)

**W0 amendment §F item 3** pivoted the collapse path: instead of extending `<Popover>` with `keepDockOpen` + `hoverOpenDelay`, extend `<HoverPopover>` (v0.7.0; composes reka-ui HoverCard) with `keepDockOpen`. The hover-driven popover semantics are HoverPopover's identity; the dock-keep contract is the only thing missing.

## Implementation

### `<HoverPopover>` extension

Added single prop: `keepDockOpen?: boolean` (default `false`). When set:
1. Track open state via `v-model:open` on `HoverCardRoot`.
2. While `isOpen.value === true`, call the parent-provided `dockKeepOpen()` callback (injected from `<GlassDock>` via `useDockState`'s `provide("dockKeepOpen", keepOpen)`). Release on close.
3. Mark portaled HoverCard content with `data-glass-dock-portal=""` + `data-glass-dock-owner="${dockId}"` attrs so the dock's `isTeleportedTarget` allowlist treats clicks inside the popover as "inside the dock" — preserves the click-away exemption the retired `<DockPopover>` carried.

Outside a dock context, all three injects (`dockKeepOpen`, `dockRelease`, `glassDockId`) fall back to `null`; the watcher and portal attrs are no-ops.

### `<GlassDock>` provide additions

Added `provide("glassDockId", dockId)` so `<HoverPopover keep-dock-open>` can inject the string-keyed dock id for portal marking. `dockId` was already generated for `useDockState`; we just thread it as a separate provide alongside the symbol-keyed `dockContext`.

### `dockContext.ts` slim-down

Retired `DockPopoverRegistration` interface + `registerPopover` / `closeOtherPopovers` methods from the `DockContext`. These existed solely to coordinate cooperative dismissal between sibling DockPopovers (when one opens, sibling popovers schedule-collapse). HoverCard's pointer-leave timer handles the cluster-transit case natively; cooperative dismissal is no longer needed.

The `DockContext` now carries only `id` + `orientation` — the minimum surface descendants need.

### Style retirement

Removed from `src/styles/dock.css`:
- `:where(.glass-dock, .dock-popover, ...) {}` aggregate — `.dock-popover` selector retired
- `--dock-motion-popover-enter` / `--dock-motion-popover-leave` token aliases (zero consumers post-retirement)
- `.dock-popover` substrate block (~40 LOC: `--dock-popover-*` knobs, `.popover-trigger`, `.popover-panel`)
- `pop-up-enter-active` / `pop-up-leave-active` / `pop-up-enter-from` / `pop-up-leave-to` Vue Transition classes
- `pop-down-enter-active` / `pop-down-leave-active` / `pop-down-enter-from` / `pop-down-leave-to` Vue Transition classes

Total CSS retirement: ~70 LOC.

## Consumer migration ledger

| Consumer | Before | After | Mode |
|---|---|---|---|
| `demo/stories/navigation/dock.vue` § "With popover triggers" — Share | `<DockPopover direction="down">` + `Share2` icon trigger | `<HoverPopover side="bottom" align="center" keep-dock-open>` + `<DockIconButton aria-label="Share">` trigger | hover |
| `demo/stories/navigation/dock.vue` § "With popover triggers" — Export | `<DockPopover direction="down" align="end">` + `Download` icon | `<HoverPopover side="bottom" align="end" keep-dock-open>` + `<DockIconButton aria-label="Export">` | hover |
| `demo/stories/navigation/dock.vue` § "With popover triggers" — Track | `<DockPopover direction="down">` + Track + ChevronDown | `<HoverPopover side="bottom" align="center" keep-dock-open>` + `<DockIconButton aria-label="Track">` wrapping Track + ChevronDown span | hover |

Cross-repo speedtest consumers: not probed in this wave (no reachable speedtest checkout from glass-ui's working dir). If speedtest consumes `<DockPopover>` from `@mkbabb/glass-ui/dock`, the next package release will surface a breaking-change marker — consumers migrate to `<HoverPopover keep-dock-open>` per the ledger above.

## Files modified

| File | LOC delta | Concern |
|---|---:|---|
| `src/components/custom/dock/DockPopover.vue` | -256 | DELETED |
| `src/components/custom/dock/index.ts` | -1 | Drop `DockPopover` re-export |
| `src/components/custom/dock/composables/dockContext.ts` | -7 | Retire `DockPopoverRegistration`, `registerPopover`, `closeOtherPopovers` |
| `src/components/custom/dock/composables/index.ts` | -1 | Drop `DockPopoverRegistration` re-export |
| `src/components/custom/dock/GlassDock.vue` | -22 | Drop popover registration plumbing; add `provide("glassDockId")` |
| `src/components/custom/hover-popover/HoverPopover.vue` | +37 | Add `keepDockOpen` prop + dock-keep watcher + portal-marker attrs |
| `src/styles/dock.css` | -70 | Retire `.dock-popover` substrate + pop-up/pop-down keyframes + `--dock-motion-popover-*` aliases |
| `demo/stories/navigation/dock.vue` | net +6 | Migrate 3 `<DockPopover>` instances to `<HoverPopover keep-dock-open>` |
| `tests/public-surface.spec.ts` | -2 | Drop `DockPopover` from dock subpath runtime exports |

## Hard-gate verification

| Gate | Status | Evidence |
|---|:-:|---|
| (b) `rg DockPopover src/ demo/` returns 0 hits | PASS | confirmed |
| (c) `rg "@keyframes pop-up\|@keyframes pop-down" src/styles/dock.css` returns 0 hits | PASS | confirmed (and the related `pop-up-*` / `pop-down-*` Vue Transition classes also retired) |
| `npm run typecheck` post-Lane-B | PASS | clean (only pre-existing metaballs errors in working tree) |
| `npm test` post-Lane-B | PASS | 269 / 269 (after dropping `DockPopover` from `public-surface.spec.ts` runtime expectation) |
| Per-story consumption sweep | PASS | only consumer was `demo/stories/navigation/dock.vue` § "With popover triggers"; migrated |
| HoverPopover keepDockOpen wires sink correctly | PASS | watcher tracks `isOpen` via `v-model:open` on HoverCardRoot; calls `dockKeepOpen?.()` / `dockRelease?.()` once per open/close edge; `isHeld` flag prevents double-acquire |

## Citation

- R1 §A "DockPopover diagnosis (A)": file:line citation `src/components/custom/dock/DockPopover.vue:1-273`. Retired.
- W3.md Lane B (W0-amended).
- I-tranche `_internal/dockKeepOpenSink.ts` referenced in dispatch packet — at HEAD the sink is implemented as Vue `provide`/`inject` (`provide("dockKeepOpen", keepOpen)` in `useDockState`), not a token-keyed sink module. The semantics are equivalent (ref-counted holds suppress timer-based collapse); the implementation differs from the dispatch's description.
