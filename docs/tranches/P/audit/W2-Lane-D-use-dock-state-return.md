# P.W2 Lane D—`UseDockStateReturn` named-return interface

## §1 Scope

Closes Pγ.3 ("useDockState inline return") per
`docs/tranches/P/research/Pgamma-encapsulation-post-O.md §"Composable named-return interface sweep (Rγ L2 carry)"`:

> Add `UseDockStateReturn` to `useDockState.ts`; annotate the function.

The Pγ audit flagged `useDockState` (severity: MEDIUM) as the surviving inline-return outlier post-O.W4 Lane B. `useAurora` was fixed at O.W4 Lane B; `useDockState` carried forward to P. Pγ §"Pre-existing composables still without named return shape" line 182:

> `useDockState`—inferred—`UseDockStateOptions` and `DockState` are exported as option-arg + value-enum, but the function itself has NO `UseDockStateReturn` interface. Consumer must use `ReturnType<typeof useDockState>` to annotate a wrapper variable.

This lane closes the gap. Naming canon mirrors the O.W6 Lane A `UseClipboardReturn` precedent.

## §2 Inferred → named-interface diff

The function returned (pre-Lane-D) an inline object literal whose shape vue-tsc inferred. Lane D enumerates every field and freezes the surface as `UseDockStateReturn`:

| Field | Type | Role |
|---|---|---|
| `state` | `Ref<DockState>` | Three-state machine ref (`"collapsed" \| "hover" \| "pinned"`). |
| `expanded` | `Ref<boolean>` | Derived ref—`true` whenever `state !== "collapsed"`. Note: `ref(boolean)` not `ComputedRef`; mutated by `syncDerived`. |
| `isPinned` | `Ref<boolean>` | Derived ref—`true` whenever `state === "pinned"`. Same shape as `expanded`. |
| `isHeld` | `ComputedRef<boolean>` | Computed—`true` whenever `keepOpenCount > 0`. The lone `ComputedRef` in the return. |
| `onMouseEnter` | `() => void` | Mouseenter handler—transitions `collapsed → hover`. |
| `onMouseLeave` | `(e?: MouseEvent) => void` | Mouseleave handler—schedules `hover → collapsed` after `collapseDelay`. |
| `onFocusIn` | `() => void` | Focusin handler—keyboard parity with mouse. |
| `onFocusOut` | `(e: FocusEvent) => void` | Focusout handler—schedules collapse when focus leaves dock. |
| `onClickCollapsed` | `() => void` | Click handler on the collapsed layer—transitions to `pinned`. |
| `keepOpen` | `() => void` | Increment hold ref-count; suppresses timer-based collapse. |
| `release` | `() => void` | Decrement hold ref-count; resumes timer when count == 0. |
| `expand` | `() => void` | Imperative open—`state = "hover"` (no-op when `alwaysExpanded`). |
| `collapse` | `() => void` | Imperative close—`state = "collapsed"` (no-op when `alwaysExpanded`). |

**Total: 13 fields.** No widening / no narrowing—the interface freezes today's exact inferred shape. The `expanded` + `isPinned` fields are intentionally typed `Ref<boolean>` (not `ComputedRef`) because the implementation mutates them via `syncDerived()`—that's the authoritative current shape and Lane D preserves it (any future refactor to make them computed updates the interface in lockstep, matching the `UseAuroraReturn` lifecycle binding at L invariant 16).

Function signature change:

```ts
// Before
export function useDockState(options: UseDockStateOptions) { ... }
// After
export function useDockState(options: UseDockStateOptions): UseDockStateReturn { ... }
```

## §3 Re-export topology

### `src/components/custom/dock/composables/index.ts`

Extended the existing type re-export to include the new interface:

```ts
export type { UseDockStateOptions, UseDockStateReturn, DockState } from "./useDockState";
```

### `src/components/custom/dock/index.ts`

Extended the O.W4 Lane B comment block + the type re-export:

```ts
// O.W4 Lane B—Fix 1 (Rγ L1): re-export composable types ...
// P.W2 Lane D (Pγ.3): `UseDockStateReturn` joins the cohort—the named
// composable-return shape paralleling `UseClipboardReturn` / `UseAuroraReturn`.
export type { UseDockStateOptions, UseDockStateReturn, DockState } from "./composables";
```

### `src/api/index.ts`

Added a new "Dock" section + updated the running-tally preamble (P.W2 Lane D entry):

```ts
// ── Dock ───────────────────────────────────────────────────────────────────
// `UseDockStateReturn`—canonical composable-return shape paralleling
// `UseClipboardReturn` / `UseAuroraReturn`. Consumers wrapping `<GlassDock>`
// or authoring a custom dock chassis pin against this rather than
// redeclaring the state-machine handle. Promoted P.W2 Lane D per Pγ.3
// "useDockState inline return". `UseDockStateOptions` + `DockState` ship via
// the `/dock` subpath barrel only (component-internal arg + state-enum;
// O.W4 Lane B disposition preserved).
export type { UseDockStateReturn } from "../components/custom/dock";
```

`UseDockStateOptions` and `DockState` remain `/dock`-only per O.W4 Lane B's deliberate disposition (component-internal arg shape + value-enum; not consumer-facing-canonical). Only the return shape rises to `/api`.

## §4 Verification

### Gate output

| Gate | Result |
|---|---|
| `npm run typecheck` | PASS (no errors) |
| `NODE_OPTIONS=--max-old-space-size=8192 npm run build` | PASS—final `✓ built in 28.49s`. (One transient retry due to `vite-plugin-dts` `runParallel` race on `confirm-dialog.d.ts` / `header-ribbon.d.ts`—unrelated to Lane D; resolved on clean retry.) |
| `npm run verify-export-types` | PASS—"All package export targets and type resolutions are valid." |
| `npm test` | PASS—`Test Files 32 passed (32) / Tests 361 passed (361)`. |

### Dist surface probe

```
$ grep -c 'UseDockStateReturn' dist/api.d.ts dist/dock.d.ts
dist/api.d.ts:1
dist/dock.d.ts:1
```

Both ≥ 1—the named interface resolves at both subpaths. Line locations:

```
dist/dock.d.ts:426:export declare interface UseDockStateReturn {
dist/api.d.ts:948:export declare interface UseDockStateReturn {
```

`/api` discovery + `/dock` subpath both surface the type to consumers.

### Surface-lock test

`tests/public-surface.spec.ts` enforces the `/dock` runtime surface via `Object.keys(surface)`. `UseDockStateReturn` is a type-only export—it does NOT register as a runtime key. The test passes without modification (included in the 361-test green count above).

## §5 Surface count diff

Pre-Lane-D: 63 symbols (59 types + 4 constants)—P.W1 Lane A close.

Post-Lane-D: **64 symbols (60 types + 4 constants)**. One promotion: `UseDockStateReturn`.

The `/api` preamble running tally is updated in lockstep—P.W2 Lane D entry added between the P.W1 Lane A block and the section list.

## §6 Status

COMPLETED.

- Interface authored at `src/components/custom/dock/composables/useDockState.ts:22-58` (13 fields enumerated; comment block cites O.W6 Lane A precedent + P.W2 Lane D).
- Function annotated: `useDockState(options: UseDockStateOptions): UseDockStateReturn`.
- Re-exported from `src/components/custom/dock/composables/index.ts` (composables barrel) + `src/components/custom/dock/index.ts` (package barrel; subpath surface).
- Promoted to `src/api/index.ts` under new "Dock" section.
- All gates green; dist surface probe ≥ 1 at both `/api` and `/dock`.
- Surface count: 63 → 64.
