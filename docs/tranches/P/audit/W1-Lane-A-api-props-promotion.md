# P.W1 Lane A—/api Props promotion sweep (AB+1 cohort + StackedIconGroup carryover)

**Status**: COMPLETED.
**Date**: 2026-05-16.
**Lane shape**: 1 agent (worktree-isolated); bounds disjoint from Lane B (dock barrel) + Lane C (cosmetic comments).

## §1—Scope

Per `docs/tranches/P/waves/W1.md` Lane A + Pγ.1 §"AB+1 cohort skipped the Props-export canon".

The AB+1 cohort (v1.5.0 → v1.7.0) shipped 5 new SFCs (MetricCell, MetricStack, MetricRow, AnimatedDigit, ResponsiveTabs) with inline `defineProps<{...}>` shapes—diverging from the HeaderRibbon (O.W6) precedent that lifts Props to a named interface and re-exports it from the package barrel. Plus 2 private appearance/mode unions (`MetricCellAppearance`, `AnimatedDigitMode`). Plus 1 Rγ-baseline carryover (`StackedIconGroupProps`) missed at the O.W4 Lane A triad.

Lane A promotes 8 type-only additions to `src/api/index.ts`, expanding the canonical public surface 55 → 63 (51 → 59 types; 4 constants unchanged).

## §2—Per-type promotion table

| # | Type | Source file | Barrel export | /api section | LOC delta |
|---|---|---|---|---|---|
| 1 | `MetricCellProps` | `src/components/custom/metric-cell/MetricCell.vue` | `metric-cell/index.ts` | AB+1 primitives | +1 |
| 2 | `MetricCellAppearance` | `src/components/custom/metric-cell/MetricCell.vue` | `metric-cell/index.ts` | AB+1 primitives | +1 |
| 3 | `MetricStackProps` | `src/components/custom/metric-stack/MetricStack.vue` | `metric-stack/index.ts` | AB+1 primitives | +1 |
| 4 | `MetricRowProps` | `src/components/custom/metric-stack/MetricRow.vue` | `metric-stack/index.ts` | AB+1 primitives | +1 |
| 5 | `AnimatedDigitProps` | `src/components/custom/animated-digit/AnimatedDigit.vue` | `animated-digit/index.ts` | AB+1 primitives | +1 |
| 6 | `AnimatedDigitMode` | `src/components/custom/animated-digit/AnimatedDigit.vue` | `animated-digit/index.ts` | AB+1 primitives | +1 |
| 7 | `ResponsiveTabsProps` | `src/components/custom/responsive-tabs/ResponsiveTabs.vue` | `responsive-tabs/index.ts` | AB+1 primitives | +1 |
| 8 | `StackedIconGroupProps` | `src/components/custom/stacked-icons/types.ts` (pre-existing) | `stacked-icons/index.ts` (pre-existing) | StackedIconGroup | +1 |

## §3—SFC refactor diffs

Per P invariant 5 (NO LEGACY CODE)—every inline anonymous-Props shape lifted to a named interface; the inline form is REPLACED, not preserved alongside.

### 3.1 `MetricCell.vue`—lift inline Props + appearance to named interface

- Was: `type MetricCellAppearance = "dashboard" | "compact" | "bare"` (private, inline at L52) + `defineProps<{...inline 13 fields...}>()`.
- Now: `export type MetricCellAppearance = ...` + `export interface MetricCellProps { ... }` + `defineProps<MetricCellProps>()`.

### 3.2 `MetricStack.vue`—lift inline Props to named interface

- Was: 2 private aliases (`MetricStackVariant = string | undefined`, `MetricStackAs = string | Component`) + `defineProps<{...inline 5 fields...}>()`.
- Now: `export interface MetricStackProps { ... }` + `defineProps<MetricStackProps>()`. The 2 private aliases dissolve back into the field types per Pγ Risk #4—`MetricStackVariant` was `string | undefined` (no narrowing value to a consumer); `MetricStackAs` was a 2-element union used once. Inlining keeps the interface readable.

### 3.3 `MetricRow.vue`—lift inline Props to named interface

- Was: `defineProps<{...inline 12 fields...}>()`.
- Now: `export interface MetricRowProps { ... }` + `defineProps<MetricRowProps>()`.

### 3.4 `AnimatedDigit.vue`—lift inline Props + mode union to named interface

- Was: inline `"absolute" | "progress"` for `mode` axis (private) + `defineProps<{...inline 7 fields...}>()`.
- Now: `export type AnimatedDigitMode = "absolute" | "progress"` + `export interface AnimatedDigitProps { ... mode?: AnimatedDigitMode ... }` + `defineProps<AnimatedDigitProps>()`.

### 3.5 `ResponsiveTabs.vue`—lift inline Props to named interface

- Was: `defineProps<{...inline 7 fields...}>()` (composes `TabOption` from `../tabs`).
- Now: `export interface ResponsiveTabsProps { ... }` + `defineProps<ResponsiveTabsProps>()`. `TabOption` continues to flow through `../tabs/index.ts`—ResponsiveTabsProps's `options: TabOption[]` field carries the type.

### 3.6 StackedIconGroup—no SFC change

`StackedIconGroupProps<TItem>` already lives at `stacked-icons/types.ts` and is already re-exported from `stacked-icons/index.ts:2`. The Lane A change is the `/api` re-export only—a 1-line addition.

## §4—Verification

Gate matrix output:

```
$ npm run typecheck
> @mkbabb/glass-ui@1.7.0 typecheck
> vue-tsc --noEmit
(zero diagnostics)                                                       PASS

$ NODE_OPTIONS=--max-old-space-size=8192 npm run build
... ✓ built in 27.09s                                                     PASS

$ npm run verify-export-types
> @mkbabb/glass-ui@1.7.0 verify-export-types
> node scripts/verify-export-types.mjs
All package export targets and type resolutions are valid.               PASS
```

Dist surface probe—all 8 promotions reachable from the `/api` subpath dts:

```
$ grep -cE "MetricCellProps|MetricCellAppearance|MetricStackProps|\
  MetricRowProps|AnimatedDigitProps|AnimatedDigitMode|\
  ResponsiveTabsProps|StackedIconGroupProps" dist/api.d.ts
10
$ grep -E "MetricCellProps|MetricCellAppearance|MetricStackProps|\
  MetricRowProps|AnimatedDigitProps|AnimatedDigitMode|\
  ResponsiveTabsProps|StackedIconGroupProps" dist/api.d.ts
export declare type AnimatedDigitMode = "absolute" | "progress";
export declare interface AnimatedDigitProps {
    mode?: AnimatedDigitMode;
export declare type MetricCellAppearance = "dashboard" | "compact" | "bare";
export declare interface MetricCellProps {
    appearance?: MetricCellAppearance;
export declare interface MetricRowProps {
export declare interface MetricStackProps {
export declare interface ResponsiveTabsProps {
export declare interface StackedIconGroupProps<TItem> {
```

10 grep hits (8 distinct symbols + 2 inline field references)—every promotion confirmed on the published `/api` surface.

## §5—Surface count diff

| Window | Symbols | Types | Constants |
|---|---:|---:|---:|
| Pre-W1 (P.W0 resync canonical at-HEAD) | 55 | 51 | 4 |
| Post-W1 Lane A | **63** | **59** | 4 |
| Delta | +8 | +8 | 0 |

Per-source delta:
- `metric-cell` (+2): `MetricCellProps`, `MetricCellAppearance`.
- `metric-stack` (+2): `MetricStackProps`, `MetricRowProps`.
- `animated-digit` (+2): `AnimatedDigitProps`, `AnimatedDigitMode`.
- `responsive-tabs` (+1): `ResponsiveTabsProps`.
- `stacked-icons` (+1): `StackedIconGroupProps<TItem>`.

## §6—Hardened-git-clause compliance

Per K W0 (`docs/precepts/instructions/tranche/AGENT_DISPATCH_TEMPLATE.md`)—this lane ran ZERO mutating git commands. No `git add`, no `git commit`, no `git stash`, no `git checkout`, no `git reset`, no `git restore`, no `git rebase`, no `git merge`, no `git cherry-pick`, no `git revert`, no `git push`, no `git pull`, no `git fetch --prune`. Read-only git operations only (none invoked at this lane). The orchestrator owns the index + push.

## §7—Status: COMPLETED.

All 8 type promotions land. 3 gates green (typecheck + build + verify-export-types). Dist surface probe confirms every promotion reaches the `/api` subpath. Surface count canonical at 63 (59 types + 4 constants).

Pγ.1 closes fully. The AB+1 cohort + StackedIconGroup carryover are now on the canonical public surface; consumers wrapping any of the 5 SFCs (MetricCell, MetricStack, MetricRow, AnimatedDigit, ResponsiveTabs) can pin against named Props types instead of `ComponentProps<typeof MetricCell>` (the leaky-abstraction pattern Rγ §3.1 L2 flagged).
