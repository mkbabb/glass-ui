# P.W5 Lane A.1—`copyToClipboard` bare co-export (Path B; glass-ui-side prereq)

**Status**: COMPLETED.
**Date**: 2026-05-16.
**Lane shape**: orchestrator-direct (additive composable surface; the cross-repo Lane A.2-A.4 work for value.js depends on this).

## §1—Scope

Per `docs/tranches/P/waves/W5.md` Lane A.1 + `docs/tranches/P/audit/P11-Lane-e-value-js.md` §"useClipboard Path A vs B—RECOMMEND PATH B".

value.js ships a `copyToClipboard(text): Promise<boolean>` bare function across 20 call sites. Glass-ui's `useClipboard()` composable returns `{ copied, copy }`—a surface-shape mismatch that blocked the consumer-side bulk import flip.

Path B (the chosen path per P11/e + W5.md): add `copyToClipboard(text, options?): Promise<boolean>` as an additive bare co-export from `src/composables/dom/useClipboard.ts`. Re-exported automatically through the existing `export * from "./useClipboard"` chain to the root barrel.

The consumer-side cross-walk now reduces to a one-line rewrite per call site (`from "../composables/useClipboard"` → `from "@mkbabb/glass-ui"`).

## §2—Edit

`src/composables/dom/useClipboard.ts` was refactored:

- The composite copy-path helpers (`writeViaClipboardApi` + `writeViaExecCommand`) lifted from the `useClipboard()` closure to module-scope helpers. The two surface shapes share one implementation; no behavioural divergence.
- Added `export async function copyToClipboard(text: string, options?: UseClipboardOptions): Promise<boolean>`—calls into the same composite copy path. Returns the success boolean; no reactive state. SSR-safe via the same `navigator` / `document` guards.
- `useClipboard()`'s internal `copy()` now delegates to `copyToClipboard` for the copy attempt (then layers the reactive `copied` flip + auto-reset window on top). Single source of truth for the copy path.
- The `resetMs` option is preserved on the bare function's signature for forward-compatibility (currently a no-op for stateless callers).

Tests in `tests/public-surface.spec.ts` `composableRuntimeExports` extended with `useClipboard` + `copyToClipboard` to lock the root-barrel runtime surface contract.

## §3—Verification

- `npm run typecheck`—PASS.
- `npm run build`—PASS (26.86 s; Lane A bake).
- `npm run verify-export-types`—PASS.
- `npm run profile:budget`—PASS.
- `npm test`—PASS (32 files / 365 tests; surface-lock test asserts the 2 clipboard runtime exports).
- `npm run audit:stash`—PASS (clean).
- `node -e "console.log(typeof require('./dist/glass-ui.js').copyToClipboard)"` → `function`.

## §4—Consumer migration (value.js)

The 19 sites at value.js consume `copyToClipboard(text)` from a local composable. Post-v1.8.2 ship, the consumer-side rewrite at P.W5 Lane A.4 is a single-line import rewrite per site (`from "@/composables/useClipboard"` → `from "@mkbabb/glass-ui"`).

The local `composables/useClipboard.ts` (the consumer's parallel implementation) retires at the same write. ~10 hand-rolled `copied = ref(false) + setTimeout` patterns at value.js are an OPPORTUNISTIC consume of `useClipboard()`—not required for the bulk import flip.

## §5—P invariant compliance

- **P invariant 5 (NO LEGACY CODE)**: the refactor consolidates the copy-path helpers to one canonical implementation. No legacy alias or shim shipped.
- **P invariant 28 (zero deferral)**: the Path B glass-ui-side prereq ships at this wave; consumer-side bulk flip lands at Lane A.4.
- **N invariant 23 wire-before-retire**: `copyToClipboard` already has 2 consumers at landing (value.js 19 sites + the internal `useClipboard()` composable as the canonical consumer #1).

## §6—Status: COMPLETED.
