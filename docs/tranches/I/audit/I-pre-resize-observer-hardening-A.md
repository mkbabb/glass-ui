# I-pre — useResizeObserver hardening (Lane A)

Correctness audit + test coverage for `src/composables/useResizeObserver.ts`. Lane B handles call-site migration; this lane locks the composable down.

## Audit table

| # | Criterion | Verdict | Evidence |
|---|-----------|---------|----------|
| 1 | SSR safety — no pre-guard touches of `window`/`document` | PASS | The only DOM-touching path is `observe()`, gated at lines 117-119 by `typeof window === "undefined" \|\| typeof ResizeObserver === "undefined"`. `getCurrentScope` / `onScopeDispose` / `watch` are pure Vue. |
| 2 | Multiple-call safety — duplicate calls each dispose cleanly | PASS | Each invocation closes over its own `observer` / `observed` / `rafId` / `pending`. `onScopeDispose(stop)` is registered per call. No shared state. |
| 3 | Target-ref switching — `disconnect()` runs before `observe()` | PASS | `watch(target, (el) => { disconnect(); if (el) observe(el); }, { immediate: true, flush: "post" })` at lines 138-145. Order is explicit: tear down first, then re-observe. |
| 4 | Threshold edge cases — negative / NaN / 0 / Infinity | FIXED | Was undefined for negatives (always-fire) and NaN (also always-fire, by `< NaN` returning false). Now clamped: `Number.isNaN(rawThreshold) ? 0 : Math.max(0, rawThreshold)`. `0` and `Infinity` retain their natural semantics (every-change vs. never). JSDoc updated. |
| 5 | Initial-dispatch contract — fire-on-first vs. silent | DOCUMENTED | The bounding-box snapshot at `observe()` time means the first RO entry typically does not exceed threshold. This is intentional — the JSDoc now explicitly states "does NOT fire once on mount" so callers don't rely on a fire-on-mount semantic. |
| 6 | rAF coalescing — last entry within frame wins | PASS | `pending = entry; if (rafId === null) rafId = requestAnimationFrame(flush)` at lines 100-103. `pending` is overwritten by every subsequent dispatch in the window; only the last survives until `flush()` reads + clears it. |
| 7 | Disconnect mid-pending rAF — `flush()` handles `pending === null` | PASS | `disconnect()` calls `cancelAnimationFrame(rafId)` and sets `pending = null` (lines 113-118). `flush()` early-returns on `if (!pending) return;` at line 79. Tested explicitly. |
| 8 | Structural `RefLike<T \| null>` typing — `vue-tsc --noEmit` accepts | PASS | The internal `target as Ref<T \| null>` cast bridges the structural public type to the brand-checked `watch` parameter. `vue-tsc --noEmit` runs clean against `ref<HTMLElement \| null>(null)` consumer usage. |
| 9 | Box option forwarded — `{ box }` reaches `observer.observe` | PASS | Line 130: `observer.observe(el, box ? { box } : undefined)`. Tested with `box: "border-box"` and the default (undefined). |
| 10 | Concurrent observe — race against existing observed element | PASS | `observe()` is only reachable through the watcher, which always calls `disconnect()` first. There is no exported re-entry path. |
| 11 | Memory profile — fresh options object per `observe()` call | ACCEPTED | One small object literal per target change. Negligible. |

## Findings + fixes applied

Two surgical fixes landed in `src/composables/useResizeObserver.ts`:

1. **Threshold sanitization** (criterion 4). Previously, a negative threshold satisfied `Math.abs(...) < negative` as always-`false` (every change fires) and a `NaN` threshold compared as `NaN < NaN` always-`false` (also every change fires). Both were silently inconsistent with the documented "skip sub-threshold" contract. Now clamped at construction: `Math.max(0, rawThreshold)` for negatives and an explicit `NaN → 0` fallback. `Infinity` is preserved as the documented "never fire" escape hatch.

2. **JSDoc — initial-dispatch contract** (criterion 5). The bounding-box snapshot taken inside `observe()` means the first ResizeObserver entry typically equals the snapshot and is gated out by threshold. Many ResizeObserver wrappers (notably `@vueuse/core`) DO fire-on-observe; this one does not. Spelled out in the function-level JSDoc so callers don't import a bug-shaped expectation.

No defect required a substantive refactor. Core flow (watch → disconnect → observe; rAF coalesce; scope-disposal) is correct as-shipped.

## Test coverage

Added `tests/composables/use-resize-observer.test.ts` (15 cases across 7 describes). The default `TestResizeObserver` in `tests/setup.ts` is a pure stub — it doesn't capture its callback — so the test file installs a `CapturingResizeObserver` per file via `beforeEach`/`afterEach`, restoring the original on teardown. `requestAnimationFrame` is also vi-spied per file so tests can flush the rAF queue deterministically.

| # | Case | Cluster |
|---|------|---------|
| 1 | callback fires on size change beyond threshold | basic dispatch |
| 2 | sub-threshold change does NOT fire (default 0.5px) | threshold gating |
| 3 | threshold = 0 fires on every change | threshold gating |
| 4 | threshold = -5 clamps to 0 | threshold gating |
| 5 | threshold = NaN clamps to 0 | threshold gating |
| 6 | target ref switch: old observer disconnected, new observed | switching |
| 7 | observer disconnect on component unmount | scope disposal |
| 8 | manual `stop()` outside scope unobserves + disconnects, watcher torn down | manual stop |
| 9 | rAF coalesces 5 rapid resizes into 1 callback with last entry | rAF coalescing |
| 10 | `rafBatch: false` fires synchronously per entry | rAF coalescing |
| 11 | `stop()` mid-pending rAF cancels the queued flush safely | rAF coalescing |
| 12 | missing `ResizeObserver` returns no-op `{ stop }` silently | env guard |
| 13 | missing `window` does not throw | env guard |
| 14 | `box: 'border-box'` forwarded to `observer.observe` | box option |
| 15 | undefined `box` passes `undefined` (not `{}`) | box option |

One scope reveal during authoring: an early version of case 8 asserted that synthetically firing the captured RO callback after `stop()` would not reach the consumer callback. This is testing the *mock*, not the composable — in real browsers `disconnect()` cessates further entries. Case 8 was tightened to assert observable contract instead (unobserve + disconnect spies + watcher tear-down).

### Verdict

15 / 15 green in isolation. Full-suite delta: 263 → 278 passing (+15); the 3 unrelated `tests/public-surface.spec.ts` failures pre-date this lane and belong to W2 / Lane B.

## Final outputs

```
$ npm run typecheck
> @mkbabb/glass-ui@0.6.1 typecheck
> vue-tsc --noEmit
(clean)

$ npx vitest run tests/composables/use-resize-observer.test.ts
 Test Files  1 passed (1)
      Tests  15 passed (15)
   Duration  201ms

$ npm run test  (full suite, for situational awareness)
 Test Files  1 failed | 18 passed (19)
      Tests  3 failed | 278 passed (281)
```

The 3 pre-existing failures are in `tests/public-surface.spec.ts` (utility-token assertions: `--shimmer-blue-`, `--shimmer-duration`, `.progress-gradient`). Untouched per scope.

## Files modified / created

- MODIFIED: `src/composables/useResizeObserver.ts` — threshold sanitization (~6 lines) + JSDoc note (~5 lines).
- CREATED: `tests/composables/use-resize-observer.test.ts` — 15 test cases, ~310 lines.
- CREATED: this audit doc.

No destructive git commands run. No commit attempted.
