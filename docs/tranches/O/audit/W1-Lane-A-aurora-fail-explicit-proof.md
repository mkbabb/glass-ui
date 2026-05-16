# O.W1 Lane A—Aurora init fail-explicit (F1 migration)

**Status**: LANDED in worktree (orchestrator-pending integration).
**Scope**: F1—`useAurora` init failure → throw-by-default, with
`onInitError` opt-in for silent fallback.
**Invariant**: O invariant 24 (library-internal contract violations throw;
browser-API degradation paths remain befitting silent fallbacks).
**Source finding**: `docs/tranches/O/research/Ralpha-legacy-code.md:85` (F1).

---

## § Disposition

### Before behavior contract

`createAurora` failure (WebGL2 unavailable, shader compile, program link)
inside `useAurora`'s `onMounted` was caught and logged via
`console.warn("[Aurora]", err)`. The composable then returned early and the
`<canvas>` rendered empty. No surface signal beyond the dev console.

### After behavior contract

`useAurora`'s `onMounted` try/catch now rethrows the caught error by default.
If the consumer provides `onInitError(err)`, the callback is invoked and the
canvas stays unmounted (the silent-fallback opt-in path).

Consumer-visible surface:

- New `<Aurora>` prop: `onInitError?: (err: Error) => void`.
- New `AuroraRuntimeOptions` field: `onInitError?: (err: Error) => void`
  (automatically published via `@mkbabb/glass-ui/api` since
  `AuroraRuntimeOptions` is already on that barrel).
- The imperative `createAurora(...)` runtime remains unchanged—it
  unconditionally throws on init failure (it has no Vue-lifecycle seam to
  inject the callback at). The `useAurora` Vue-wrapper is the seam.

Top-level prop wins over `runtimeOptions.onInitError` when both are
provided. The merge happens in `Aurora.vue`'s `mergedRuntimeOptions`
computed, so consumers passing a fully-composed
`AuroraRuntimeOptions` (e.g. thumbnail-baking pipelines) can still
declare it nested, while typical consumers use the ergonomic top-level
prop.

### Semver disposition

Patch (v1.2.1)—additive prop. Behavior change is consumer-visible (silent
→ throw) but on a code path that previously rendered nothing; the migration
path is one prop addition for opt-in silent. Documented in MIGRATION.md
under "v1.2.1—Aurora init fail-explicit (O.W1 Lane A)".

---

## § File changes summary

```
 MIGRATION.md                                       | 85 ++++++++++++++++++++++
 src/components/custom/aurora/Aurora.vue            | 18 ++++-
 .../custom/aurora/composables/runtime.ts           | 12 +++
 .../custom/aurora/composables/useAurora.ts         | 14 +++-
 4 files changed, 125 insertions(+), 4 deletions(-)
```

### `src/components/custom/aurora/composables/runtime.ts` (+12 lines)

Extended `AuroraRuntimeOptions` interface with `onInitError?: (err: Error)
=> void`. Inline doc-comment notes that the callback is the
`useAurora` Vue-wrapper contract—`createAurora(...)` itself remains
unconditionally throw-on-init-failure.

### `src/components/custom/aurora/composables/useAurora.ts` (+11 / -3)

Replaced `console.warn` + early-return with:

```ts
const error = err instanceof Error ? err : new Error(String(err));
if (runtimeOptions.onInitError) {
    runtimeOptions.onInitError(error);
    return;
}
throw error;
```

Defensive `instanceof Error` wrap covers the theoretically-possible
non-Error throw from `createAurora` (currently every throw site is
`throw new Error(...)`, but TS lacks a `throws` channel so the
`unknown` from `catch` needs narrowing).

### `src/components/custom/aurora/Aurora.vue` (+17 / -3)

Added `onInitError?: (err: Error) => void` to `defineProps`. Introduced
`mergedRuntimeOptions` computed that merges the top-level prop into a
copy of `props.runtimeOptions`, with the top-level prop winning.
Threaded the merged options into `useAurora`.

Updated the SFC's top-of-file doc comment to call out the fail-explicit
contract.

### `MIGRATION.md` (+85 lines)

New top-level section "v1.2.1—Aurora init fail-explicit (O.W1 Lane
A)" inserted between the v1.0 "New surfaces" cohort and "Recommended
new surfaces". Documents:

- Before / after behavior contract (with code samples).
- Opt-in silent path (`onInitError={(err) => console.warn("[Aurora]",
  err)}`).
- Threading via `runtimeOptions` for fully-composed-options consumers.
- Why the change (invariant 24, Rα F1, silent-warn concealed bugs).
- Migration cost grep recipe.

---

## § Verification

### Typecheck (in worktree)

```
$ npm run typecheck 2>&1 | tail -10

> @mkbabb/glass-ui@1.2.0 typecheck
> vue-tsc --noEmit
```

Exit code 0; no diagnostics.

### Tests

```
$ npm test -- aurora 2>&1 | tail -10

> @mkbabb/glass-ui@1.2.0 test
> vitest run aurora

 RUN  v4.1.5 /Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-a1db1aac7aa76cf99

No test files found, exiting with code 1

filter: aurora
include: src/**/*.{test,spec}.{ts,tsx}, src/**/*.{test,spec}.vue, tests/**/*.{test,spec}.{ts,tsx}, scripts/**/*.{test,spec}.{ts,tsx}
exclude:  **/node_modules/**, **/.git/**
```

No aurora-specific test files exist at HEAD. Test creation is out-of-scope
for Lane A (Lane E covers test-file relocation; aurora has none to
relocate). Full-suite vitest is the responsibility of W1 close-time
verification (gate `f`).

### Surface verification (`AuroraRuntimeOptions` already on `/api`)

```
$ grep -n "AuroraRuntimeOptions" src/api/index.ts

47:    AuroraRuntimeOptions,
```

Adding `onInitError` to `AuroraRuntimeOptions` is automatically published
via the existing `/api` re-export—no `src/api/index.ts` change needed.

### Worktree diff stat

```
$ git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-a1db1aac7aa76cf99 diff --stat

 MIGRATION.md                                       | 85 ++++++++++++++++++++++
 src/components/custom/aurora/Aurora.vue            | 18 ++++-
 .../custom/aurora/composables/runtime.ts           | 12 +++
 .../custom/aurora/composables/useAurora.ts         | 14 +++-
 4 files changed, 125 insertions(+), 4 deletions(-)
```

---

## § Cross-repo audit (speedtest, READ-ONLY)

Per W1.md §"Lane A—F1" item 4—speedtest is the deep Aurora consumer.
Audit findings (grep over `/Users/mkbabb/Programming/speedtest/{src,demo}`):

### `Aurora\b` call sites

- `src/App.vue:127`—`import { Aurora } from "@mkbabb/glass-ui/aurora";`
- `src/App.vue:5`—`<Aurora ref="auroraRef" :config="auroraConfig" />`
  (single render site; no `onInitError` wired).
- `src/composables/useAuroraPolicy.ts:2,5`—doc-comment mentions; no
  import.
- `src/config/auroraConfig.ts:3`—`import type { AuroraConfig } from
  "@mkbabb/glass-ui/aurora";` (type-only).
- `src/__tests__/App.{resume,surveyEntry,abandon}.test.ts`—stub
  references; render nothing (`render: () => null` or `template: "<div
  />"`); the fail-explicit change does not reach the stubbed paths.

### `useAurora\b` call sites

- Zero—speedtest never calls the composable directly. The library's
  SFC owns the composable; speedtest only renders `<Aurora>`.

### Disposition for speedtest

The single live consumer (`src/App.vue:5`) renders Aurora without an
`onInitError`. After v1.2.1, a `createAurora` failure on that path will
**throw** at `onMounted` and propagate to the Vue error handler. Three
follow-up paths (decision deferred to the cross-repo cohort wave, W1.md
gate `a`):

1. **Accept the throw**—if speedtest has an upstream error boundary or
   the failure mode is acceptable as a hard fail, no consumer-side
   change is needed. The fail-explicit signal reaches the consumer's
   error handler.
2. **Opt back into silent-warn**—one-line:
   `<Aurora :on-init-error="(err) => console.warn('[Aurora]', err)" ...>`
   matches the pre-v1.2.1 behaviour exactly.
3. **Custom report**—wire `onInitError` to speedtest's telemetry
   surface (e.g. the diagnostic-event bus referenced in
   `useAuroraPolicy.ts`).

Cross-repo WRITER coordination is **gated on user authorization at
O.W6** per the agent task instructions. This lane is READ-ONLY for the
speedtest tree.

---

## § Open questions for orchestrator

1. **Merge-semantics for `runtimeOptions.onInitError` vs top-level
   `onInitError`**—currently the top-level prop wins. Alternative
   shape: ignore the top-level prop entirely if `runtimeOptions` is
   provided (treat `runtimeOptions` as the canonical full options
   bundle, no prop-level overrides). The current shape is more
   ergonomic for the common single-callback case; the alternative is
   more "principle-of-one-canonical-surface". Defer to orchestrator
   choice; current shape documented in MIGRATION.md.

2. **No `init-error` Vue event**—the Rα research doc (`docs/tranches/O/
   research/Ralpha-legacy-code.md:181`) mentions emitting a Vue event
   as an alternative shape. Callback-prop was chosen for symmetry with
   the existing `setCursor` / `clearCursor` imperative API surface and
   to avoid widening the `defineEmits` surface for a once-only signal.
   Confirm this disposition.

3. **Should `AuroraRuntimeOptions.onInitError` be promoted to a
   sibling export from `@mkbabb/glass-ui/api`?**—currently it's a
   field on `AuroraRuntimeOptions` (already exported); no new top-level
   type. If a `OnAuroraInitError = (err: Error) => void` type alias is
   useful for consumers (e.g. typed handler factories), promote it. No
   action taken in this lane.

4. **Demo coverage**—no demo story exercises the `onInitError`
   contract. A minimal demo would force-fail (mock `WebGL2RenderingContext`
   unavailable) and surface the throw vs silent-callback paths. Defer
   to demo-cohort or a follow-up Lane.

---

## § Worktree diff verification

```
$ git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-a1db1aac7aa76cf99 status

On branch worktree-agent-a1db1aac7aa76cf99
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   MIGRATION.md
	modified:   src/components/custom/aurora/Aurora.vue
	modified:   src/components/custom/aurora/composables/runtime.ts
	modified:   src/components/custom/aurora/composables/useAurora.ts

no changes added to commit (use "git add" and/or "git commit -a")
```

```
$ git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-a1db1aac7aa76cf99 diff --stat

 MIGRATION.md                                       | 85 ++++++++++++++++++++++
 src/components/custom/aurora/Aurora.vue            | 18 ++++-
 .../custom/aurora/composables/runtime.ts           | 12 +++
 .../custom/aurora/composables/useAurora.ts         | 14 +++-
 4 files changed, 125 insertions(+), 4 deletions(-)
```

Worktree changes match the Lane A bound exactly—no stray edits to other
W1 lanes' files (`metaballs/useMetaballs.ts`, `frostShader.ts`,
`useConfiguratorState.ts`, `typewriter/utils/keyboard.ts`, any
`*.test.ts`). Per the closing rule, **no git mutation has been performed**
(no add / commit / push / stash). Orchestrator integrates via `cp` on the
four modified paths.

Proof doc itself is the fifth artefact in this lane (this file,
`docs/tranches/O/audit/W1-Lane-A-aurora-fail-explicit-proof.md`)—also
left as unstaged in the worktree.
