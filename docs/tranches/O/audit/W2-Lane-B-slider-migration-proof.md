# O.W2 Lane B — Slider `useOptionalDockContext()` migration proof

**Wave**: O.W2
**Lane**: B (Slider keep-dock-open contract migration)
**Worktree**: `worktree-agent-a81c077695ffe399a`
**Worktree base**: `827b6ae` (W1 close, v1.2.1)
**Lane A dependency commit**: `ba546c7` (sibling worktree — NOT in this branch's tree)
**Bounds**: `src/components/ui/slider/Slider.vue` + this proof doc
**Invariant**: 25 (typed-key + helper-pair canonical DI shape)

## § Disposition — before/after diff for the 3 inject migrations

### Migration 1 — `dockKeepOpen` callable

**Before** (string-key inject + optional-chain call site):

```ts
const dockKeep = inject<(() => void) | null>('dockKeepOpen', null)
// ...
function acquire() {
  if (!keepDockOpen.value || acquired) return
  dockKeep?.()
  acquired = true
}
```

**After** (typed-context helper + property-access call site):

```ts
const dock = useOptionalDockContext()
// ...
function acquire() {
  if (!keepDockOpen.value || acquired) return
  dock?.keepOpen()
  acquired = true
}
```

### Migration 2 — `dockRelease` callable

**Before**:

```ts
const dockRelease = inject<(() => void) | null>('dockRelease', null)
// ...
function release() {
  if (!acquired) return
  dockRelease?.()
  acquired = false
}
```

**After**:

```ts
// (no separate inject; reuses `dock` binding from migration 1)
function release() {
  if (!acquired) return
  dock?.release()
  acquired = false
}
```

### Migration 3 — `dockHeld` reactive flag

**Before**:

```ts
const dockHeld = inject<ComputedRef<boolean> | null>('dockHeld', null)
// ...
const isHeld = computed(() => dockHeld?.value === true)
```

**After**:

```ts
// (no separate inject; reuses `dock` binding from migration 1)
const isHeld = computed(() => dock?.held.value === true)
```

### Net shape change

3 string-key `inject()` call sites collapse into 1 `useOptionalDockContext()` call. The 3 call-site invocations rewrite to property-access on the optional-chained context binding (`dock?.keepOpen()`, `dock?.release()`, `dock?.held.value`). No behavioral semantics shift — `inject` with default `null` and `useOptionalDockContext()` both return `DockContext | null`, and the optional-chain idiom is preserved across all three call sites.

## § File changes summary

| File | Change | Lines |
|---|---|---|
| `src/components/ui/slider/Slider.vue` | -3 string-key injects → +1 typed-context helper call; +1 import; -2 unused imports (`inject`, `ComputedRef`); comment block annotated with `O.W2 Lane B` migration note | +15 −12 |

**Import-level deltas**:

- Removed: `inject` from `vue`, `ComputedRef` type from `vue`.
- Added: `useOptionalDockContext` from `'../../custom/dock/composables/dockContext'`.

**No structural changes**: the `acquire()`/`release()` reference-count discipline, the `watch(touchGate.isActive)` mirror wire, the `onBeforeUnmount(release)` cleanup, the `onPointerDown` window-scoped `pointerup`/`pointercancel` listener, the `data-held` and `data-touch-active` attribute reflection — all preserved verbatim. Only the inject layer renamed.

## § Verification

### Diff stat

```
 src/components/ui/slider/Slider.vue | 27 +++++++++++++++------------
 1 file changed, 15 insertions(+), 12 deletions(-)
```

### Test suite

```
$ npm test 2>&1 | tail -10
 Test Files  30 passed (30)
      Tests  348 passed (348)
   Duration  2.63s
```

Slider has no dedicated unit tests; the suite green confirms no upstream surface broke. The `keep-dock-open` contract is integration-level (cross-substrate against `<GlassDock>`), exercised via the proof story (visual contract; see § below).

### Typecheck

```
$ npm run typecheck 2>&1 | tail -5
src/components/ui/slider/Slider.vue(7,10): error TS2305: Module
'"../../custom/dock/composables/dockContext"' has no exported member
'useOptionalDockContext'.
```

**Expected failure — cross-lane dependency**: this worktree branches from `827b6ae` (W1 close); Lane A's typed-context expansion landed at sibling commit `ba546c7` on a separate worktree and is NOT in this branch's tree. Verified the published shape via `git show ba546c7:src/components/custom/dock/composables/dockContext.ts`:

```ts
export function useOptionalDockContext(): DockContext | null {
    return inject(DOCK_CONTEXT_KEY, null);
}

export interface DockContext {
    id: string;
    orientation: ComputedRef<DockOrientation>;
    keepOpen: () => void;
    release: () => void;
    held: ComputedRef<boolean>;
}
```

The Slider migration is exactly aligned with this shape: `dock?.keepOpen()` / `dock?.release()` / `dock?.held.value` map 1-1 to the `DockContext` interface fields. **Typecheck will pass green once orchestrator merges Lane A + Lane B at W2 close.** No action required from this lane.

### Behavior preservation audit

Cross-checking each call site against the dispatch's required behavior contract:

| Behavior | Pre-migration | Post-migration | Status |
|---|---|---|---|
| pointer-drag `acquire()` | `dockKeep?.()` | `dock?.keepOpen()` | preserved (same callable, renamed) |
| pointerup/pointercancel `release()` | `dockRelease?.()` | `dock?.release()` | preserved |
| TouchGate `watch(isActive)` mirror | `acquire()` / `release()` | unchanged — calls migrated helpers | preserved |
| `isHeld` computed for `data-held` | `dockHeld?.value === true` | `dock?.held.value === true` | preserved |
| INSIDE `<GlassDock>` | `inject` returns provided callables/ref | `dock` returns `DockContext`; all methods callable | preserved |
| OUTSIDE `<GlassDock>` | `inject(..., null)` returns null; `?.()` no-ops | `useOptionalDockContext()` returns null; `dock?.` no-ops; halo does NOT intensify | preserved (befitting silent default per invariant 25) |
| `onBeforeUnmount(release)` cleanup | unchanged | unchanged | preserved |
| `dockKeepOpen` prop default `true` opt-out gate | unchanged guard at `acquire()` head | unchanged | preserved |

The pointer-drag/touch-gate/cleanup wiring is structurally identical; only the inject surface renames.

## § Cross-substrate proof story status

**File**: `demo/stories/compositions/dock-with-slider.vue` (UNTOUCHED — outside Lane B bounds).

**Visual contract verification** (deferred to W7 π lane if MCP tooling reconnects):

- Slider INSIDE `<GlassDock>` → thumb halo intensifies on drag (`.glass-slider[data-held]` recipe in scoped CSS) AND dock substrate tier-shades up (`.glass-dock[data-held]` recipe in `src/styles/dock.css`). Both states release on pointer-up. Identical to pre-migration.
- Slider OUTSIDE `<GlassDock>` (any standalone story site, e.g. `demo/stories/components/slider.vue`) → `dock === null`; `dock?.keepOpen()` is a no-op; `dock?.held.value === true` evaluates to `false`; `data-held` attribute absent; halo at default rung. Correct behavior per dispatch ("there's no dock to be held").
- Multi-slider dock (third StorySection in the proof story): both sliders subscribe to the same `dock` context (single typed key resolves to the same provided ref); held-state mirrors when EITHER slider drags. Identical to pre-migration via `dockHeld` ref-counted aggregation.

Runtime probe via MCP browser tooling is not available in this lane window; visual contract verification deferred per spec to the W7 π lane or post-merge inspection by the orchestrator. The story file itself requires no code change (it consumes `<Slider>` and `<GlassDock>` public API only; both APIs are surface-compatible across the migration).

## § Open questions for orchestrator

1. **Cross-lane integration sequencing**: this worktree's typecheck will only pass green once Lane A (`ba546c7`) is merged. Lane A's commit message explicitly calls out a "transitional dual-provide window" preserving the 5 legacy string-keys (`dockKeepOpen`, `dockRelease`, `dockHeld`, `glassDockId`, `glassDockContext`) at `GlassDock.vue` for Lane B + Lane C consumer-migration. At W2 close, after Lane B + Lane C merge, the orchestrator should run the **transitional-provide sweep** to remove those 5 string-keys from `GlassDock.vue` (Lane A's own scope; Lane B does not touch `GlassDock.vue`).

2. **Speedtest binary-transparency spot-check**: dispatch notes speedtest does NOT inject any dock key per O11/f, so the migration is automatic. Suggest the orchestrator confirm at W2 close via `rg "inject\\((['\"])dock" speedtest-clone/` (or equivalent) yielding 0 results — this is a 1-line verification and closes invariant gate (g).

3. **Cross-substrate visual proof story re-render**: the dispatch defers runtime verification to W7 π lane if MCP reconnects. The story file is verbatim-compatible across the migration (no public API surface changed for `<Slider>` or `<GlassDock>`), so visual regression is not expected. Flag for re-shoot at W7.

4. **No Lane B follow-up tasks**: Slider migration is single-file; no downstream consumer of Slider's public API observes the inject-layer change (it's a purely internal substrate detail). No CHANGELOG entry beyond the Lane A canonicalization note that covers the wave.

## § Worktree diff verification

```
$ git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-a81c077695ffe399a diff --stat
 src/components/ui/slider/Slider.vue | 27 +++++++++++++++------------
 1 file changed, 15 insertions(+), 12 deletions(-)
```

Plus this proof doc (`docs/tranches/O/audit/W2-Lane-B-slider-migration-proof.md`, untracked at lane close per agent git clause; orchestrator stages).

**Bounds respected**: no dock file modified (Lane A); no popover-family consumer modified (Lane C); proof story file `demo/stories/compositions/dock-with-slider.vue` untouched. Only `src/components/ui/slider/Slider.vue` + this proof doc, per spec.

## § Hardened-agent git clause compliance

No mutating git ran. Only `git log`, `git show`, `git status`, `git diff`, `git branch -a`, `git merge-base` — read-only inspection. Orchestrator owns the index at W2 close.
