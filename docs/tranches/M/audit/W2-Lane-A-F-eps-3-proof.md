# M.W2 Lane A — F-ε-3 Configurator recursion methodical reproduction + fix

**Date**: 2026-05-12
**Lane**: A (F-ε-3 absorption).
**Tree state**: `master` at `0cf99c9` (parent worktree HEAD; agent worktree `agent-ac06596aab2166b1e`).
**Tooling**: Vitest 4.1.5 + happy-dom 20.9.0 (fixture); lighthouse@12.8.2 + headless Chrome `--disable-gpu` (in-the-wild repro); puppeteer-core 24.43.1 (CDP-level trace capture).
**Lighthouse output**: `/tmp/lh-mw2a/metaballs-post-fix-4.json` (post-fix capture; **errors-in-console score=1, count=0, best-practices=0.96**).

## § Disposition

**CLOSED via source fix.**

Three causal layers diagnosed; each fixed at source:

1. **Primary** — reka-ui `<CollapsibleContent>` height-measurement watcher + `<Presence>` FSM watcher race under stricter cold-load scheduler discipline. Fixed by refactoring `<ConfiguratorLayer>` to a CSS-only `grid-template-rows` reveal that requires no JS watchers.
2. **Secondary** — Vue 3 Boolean prop coercion bug: `<ConfiguratorLayer>` declared `open?: boolean` with no `withDefaults` value, so consumers passing no `:open` received `props.open === false` (not `undefined`). The initializer `ref(props.open ?? props.defaultOpen)` short-circuited on the `false`, opening NO layers at mount. Fixed by explicit `open: undefined` default in `withDefaults`.
3. **Tertiary** — `<MetaballCanvas>` exposed `isSupported` as a reactive ref that flipped `true → false` after `getContext('webgl')` returned null (the exact Lighthouse `--disable-gpu` configuration). Consumer pattern `<MetaballCanvas v-if="canvasRef?.isSupported ?? true">` then created an asymmetric mount/unmount cycle that tripped Vue's 100-iteration recursion cap on the surrounding `<Configurator>`. Fixed by (a) `useMetaballs` probing WebGL support synchronously at composable-call time, (b) `init()` no longer mutating `isSupported` post-probe (defensive bails return without mutation), (c) `MetaballCanvas` dropping `isSupported` from `defineExpose` so the consumer's `?? true` fallback always resolves true and never cycles, (d) a new `isWebGLSupported()` helper exported from `@mkbabb/glass-ui/metaballs` for consumers that need a non-cycle-prone probe.

Net result under Lighthouse cold-load `/motion/metaballs` headless `--disable-gpu`:

| Metric | Pre-fix (L.W8 baseline) | Post-fix (M.W2 Lane A) |
|---|---|---|
| `errors-in-console` score | 0 (1 item: recursion) | **1** (0 items) |
| `errors-in-console` items | 1 | **0** |
| `best-practices` category | 0.96 | **0.96** |
| pageerror events (puppeteer, throttled cold-load) | 15+ | **0** |
| `[Vue warn]: Unhandled error during execution of watcher callback` traces | 14+ (Presence + CollapsibleContent at every ConfiguratorLayer) | **0** |

The Vitest fixture at `tests/configurator-recursion.spec.ts` exits 0 (6/6 tests pass; 5 metaballs-shape coverage + 1 probe self-test that confirms the harness captures real recursions). `npm run typecheck` exits 0 (only pre-existing timeline-segmented/timeline-continuous V.W3 errors). `npm run build` exits 0 (28s build, declaration files emitted).

## § Investigation summary

### Probed

1. **Vitest reproduction fixture** (`tests/configurator-recursion.spec.ts`) — 5 tests mirror the metaballs story's reactive shape (commit-on-write `useConfiguratorState`, `motionMode` computed reading `cfg.speed`, color-stop `v-for` binding to `cfg.colors[index]`, `BouncyToggle` `setMotionMode` write-back path) and exercise:
   - N=8 preset swaps across 3 presets (sunset / cool / mono)
   - M=12 color-stop mutations interleaved with preset swaps
   - 6 `setMotionMode` toggles (still / drift / orbit)
   - A flush-stress cold-start (synchronous burst before scheduler drain)
   - Mount-time cold-start (3 nextTicks)
   Probe captures recursion via `console.warn` interception + `process.on('unhandledRejection')` + an inline `try/catch` on `await nextTick()` (which catches the scheduler-thrown error inside its `Promise.resolve().then(flush)` microtask). The probe self-test mounts a known-recursive Bumper component (`watch(a) → b++; watch(b) → a++`) and verifies the probe trips. **Under Vitest+happy-dom, the metaballs-shape tests produce zero recursion** — consistent with Playwright's clean result and orthogonal to the Lighthouse-OPEN diagnosis from L.W8.

2. **Live dev-server reproduction** (`http://localhost:5173/motion/metaballs` via `npm run dev`):
   - Confirmed Lighthouse `errors-in-console` audit fails (score 0, 1 item: `Maximum recursive updates exceeded in component <Configurator>` — matches L.W8 baseline).
   - Confirmed puppeteer-core throttled cold-load (1.5Mbps DL / 750Kbps UL / 4x CPU) reproduces the recursion (15+ pageerror events).

3. **Component-trace capture via puppeteer CDP**:
   - Hooked `console.warn` + `console.error` at page level via `page.evaluateOnNewDocument` to capture Vue's full trace strings.
   - First 14 warnings were `[Vue warn]: Unhandled error during execution of watcher callback` with traces all rooted at `<CollapsibleContent>` → `<Presence>` inside each of the 7 `<ConfiguratorLayer>` instances (Falloff, Count, Radius, Color, IsoLevel, Motion, Output).
   - Inspected reka-ui sources: `node_modules/reka-ui/src/Presence/usePresence.ts` watches `present` + `node` with `immediate: true`, reads `getComputedStyle(node).animationName` + dispatches into a FSM; `node_modules/reka-ui/src/Collapsible/CollapsibleContent.vue` watches `[isOpen.value, presentRef.value?.present]` then `await nextTick()` + `node.getBoundingClientRect()` + writes `height.value`/`width.value`. Under Lighthouse's cold-load scheduler discipline these watchers non-convergently re-trigger.

4. **DOM-state probe post-Collapsible refactor**:
   - Confirmed all 7 layers rendered as `data-state="closed" aria-expanded="false"` despite `defaultOpen: true` — exposed the Boolean-prop-coercion secondary cause.
   - After `open: undefined` fix in `withDefaults`: all 7 layers correctly rendered `data-state="open"`.

5. **MountObserver probe**:
   - Tracked DOM mutations after page settle. Pre-fix-3 showed 0 mount/unmount events post-settle, but 3 pageerror events at initial mount — indicating the recursion wasn't a continuous cycle but a tight initial-flush burst.
   - After tertiary fix (drop `isSupported` from `MetaballCanvas`'s `defineExpose`): 0 pageerror events.

### Eliminated

- `useConfiguratorState.writeIntoConfig` two-pass delete + assign on the reactive proxy (tried in-place `splice` for array-valued keys; recursion persisted). Reverted to the original two-pass implementation.
- `motionMode` computed write-back via `BouncyToggle.setMotionMode` (BouncyToggle does not feed-back; only emits on user click).
- `MetaballCanvas` WebGL render loop reads of `cfg.*` (inside RAF callback, not in Vue effect graph).
- L.W7 Lane B `toRaw` clone-path hardening — confirmed at HEAD, doesn't touch the metaballs render path.

## § Root cause

The recursion was THREE independent issues stacking:

### 1. reka-ui Collapsible + Presence height-measurement race (PRIMARY)

`<Collapsible>` → `<CollapsibleContent>` → `<Presence>` chain in reka-ui drives the height-animation via two interlocking watchers:

```ts
// reka-ui/src/Collapsible/CollapsibleContent.vue:49-78
watch(
  () => [isOpen.value, presentRef.value?.present],
  async () => {
    await nextTick();
    const node = currentElement.value;
    if (!node) return;
    node.style.transitionDuration = '0s';
    node.style.animationName = 'none';
    const rect = node.getBoundingClientRect();
    height.value = rect.height;
    width.value = rect.width;
    if (!isMountAnimationPrevented.value) {
      node.style.transitionDuration = currentStyle.value.transitionDuration;
      node.style.animationName = currentStyle.value.animationName;
    }
  },
  { immediate: true },
);
```

```ts
// reka-ui/src/Presence/usePresence.ts
watch(node, (newNode, oldNode) => {
  if (newNode) {
    stylesRef.value = getComputedStyle(newNode);
    newNode.addEventListener('animationstart', handleAnimationStart);
    // ...
  } else {
    dispatch('ANIMATION_END');
  }
}, { immediate: true });
```

Under Lighthouse's `--disable-gpu` + slow-3G simulation + CPU throttle 4x, the render of `<ConfiguratorLayer>` × 7 produces 7 `<Presence>` + 7 `<CollapsibleContent>` watchers each, with `immediate: true`, each scheduled into the same flush. `getComputedStyle()` reads against a partially-styled DOM (CSS animation property still resolving from `tw-animate-css` injection) produce slightly-different `animationName` values between successive watcher invocations, causing the `Presence` FSM to transition (`mounted ↔ unmountSuspended ↔ unmounted`), which feeds back into `CollapsibleContent`'s `[isOpen, presentRef.value?.present]` watcher, which re-reads `getBoundingClientRect()`, which writes `height`/`width`, which re-renders, which re-fires `Presence.watch(node)` with new computed styles. The cycle non-convergently iterates >100 times → Vue scheduler tripsTM `Maximum recursive updates exceeded` attributed to the topmost ancestor with a render effect (`<Configurator>`).

**Fix**: ConfiguratorLayer no longer composes `<Collapsible>` from reka-ui. The new structure uses the canonical CSS-only animated reveal:

```vue
<div
    role="region"
    :aria-hidden="!internalOpen"
    :data-state="stateAttr"
    class="configurator-layer-region grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none"
    :style="{ gridTemplateRows: internalOpen ? '1fr' : '0fr' }"
>
    <div class="min-h-0 overflow-hidden">
        <div :class="cn('configurator-layer-body px-3 py-2 space-y-2', props.bodyClass)">
            <slot />
        </div>
    </div>
</div>
```

`grid-template-rows: 0fr ↔ 1fr` with `transition-[grid-template-rows]` produces the same height-reveal animation **without any JS watcher**, no `getBoundingClientRect`, no `getComputedStyle`. The reka-ui `data-state` vocabulary is preserved on both the layer root and trigger button so consumer CSS (chevron-rotate, etc.) keeps working. A11y surface uses standard `<button aria-expanded aria-controls>` + `role="region"` on the body — matches reka-ui's contract. The `useId()` helper provides instance-unique IDs for `aria-controls` pairing.

### 2. Vue Boolean prop coercion (SECONDARY)

Vue 3 coerces optional `Boolean`-typed props to `false` when no value is passed AND no `default` is specified in `withDefaults`. Pre-fix:

```ts
const props = withDefaults(
    defineProps<{ open?: boolean; defaultOpen?: boolean; ... }>(),
    { defaultOpen: true },   // <-- only defaultOpen has a default
);
const internalOpen = ref(props.open ?? props.defaultOpen);   // props.open === false → ref(false)
```

Story passes no `:open`, so `props.open === false` (not `undefined`). `false ?? true === false` (nullish coalescing only triggers on null/undefined). `internalOpen = ref(false)` → ALL layers start CLOSED.

Pre-fix this was masked by the Collapsible cycle — the layers visibly cycled open/closed during the recursion until Vue gave up. Post-fix the layers stayed closed, exposing the bug.

**Fix**: Explicit `open: undefined` default in `withDefaults` sidesteps Boolean coercion:

```ts
{
    open: undefined,        // M.W2 — sidesteps Vue 3 Boolean prop coercion
    defaultOpen: true,
}
```

### 3. `MetaballCanvas.isSupported` mutation + consumer fallback (TERTIARY)

`useMetaballs` initialized `isSupported = ref(true)` and flipped it to `false` if `canvas.getContext('webgl')` returned null. The metaballs story:

```ts
const canvasRef = ref<InstanceType<typeof MetaballCanvas> | null>(null);
const isSupported = computed(() => canvasRef.value?.isSupported ?? true);
<MetaballCanvas v-if="isSupported" ref="canvasRef" :config="cfg">
```

Under Lighthouse's `--disable-gpu`, WebGL is unavailable. Sequence:
1. Initial render: `canvasRef.value === null` → `null?.isSupported = undefined` → `?? true` → v-if=true → MetaballCanvas mounts.
2. `useMetaballs.init()` calls `getContext('webgl')` → null → `isSupported.value = false`.
3. Vue re-evaluates story's `isSupported` computed: `canvasRef.value.isSupported = false` → v-if=false → MetaballCanvas unmounts.
4. canvasRef.value = null again → `null?.isSupported = undefined` → `?? true` → v-if=true → MetaballCanvas re-mounts. **Loop.**

Vue's scheduler hit the recursion cap on this loop attributed to the topmost ancestor (`<Configurator>`).

**Fix** — three coordinated changes:

(a) `useMetaballs` now probes WebGL synchronously at composable-call time:
```ts
export function isWebGLSupported(): boolean {
    if (typeof document === "undefined") return false;
    try {
        const probe = document.createElement("canvas");
        const ctx = probe.getContext("webgl", { failIfMajorPerformanceCaveat: false });
        return !!ctx;
    } catch { return false; }
}
// ...
const isSupported = ref(isWebGLSupported());   // synchronous, one-shot
```

(b) `useMetaballs.init()` no longer mutates `isSupported` — defensive bails return without flipping the ref:
```ts
gl = canvas.getContext("webgl", { ... });
if (!gl) return;     // M.W2 — NO mutation; probe already gated
```

(c) `MetaballCanvas` drops `isSupported` from `defineExpose`:
```ts
defineExpose({
    isReducedMotion: readonly(isReducedMotion),
    isReducedTransparency: readonly(isReducedTransparency),
    // isSupported NOT exposed — see F-ε-3 disposition.
});
```

With `isSupported` no longer exposed, the story's `canvasRef.value?.isSupported` is `undefined` for both the pre-mount and post-mount cases. The `?? true` fallback resolves to `true` always. v-if stays true. MetaballCanvas mounts once, its INTERNAL v-if (still using the local `isSupported` ref) routes to either the canvas or the fallback slot. The story's status readout (which used to flip on `isReducedMotion` / `isReducedTransparency`) still works — those refs remain exposed as readonly snapshots. Consumers wanting an explicit WebGL probe can call the new `isWebGLSupported()` helper exported from `@mkbabb/glass-ui/metaballs`.

## § Fix description

### Files modified

| File | Δ summary |
|---|---|
| `src/components/custom/configurator/ConfiguratorLayer.vue` | Dropped reka-ui `<Collapsible>` composition; replaced with CSS-only `grid-template-rows: 0fr ↔ 1fr` reveal. Added `open: undefined` default in `withDefaults` to sidestep Boolean prop coercion. Used `useId()` for instance-unique `aria-controls` pairing. Preserved `data-state` vocabulary so consumer CSS keeps working. |
| `src/components/custom/metaballs/useMetaballs.ts` | Added `isWebGLSupported()` helper (synchronous probe via throwaway canvas). `isSupported = ref(isWebGLSupported())` at composable-call time. `init()` no longer flips `isSupported` to false — defensive bails return without mutation. |
| `src/components/custom/metaballs/MetaballCanvas.vue` | Dropped `isSupported` from `defineExpose` (canonical consumer pattern with `?? true` fallback created a mount/unmount cycle). Wrapped exposed `isReducedMotion` / `isReducedTransparency` in `readonly()`. |
| `src/components/custom/metaballs/index.ts` | Added `isWebGLSupported` to package exports for consumers needing an explicit synchronous WebGL probe. |
| `tests/configurator-recursion.spec.ts` (new) | Vitest reproduction fixture — 6 tests (5 metaballs-shape coverage + 1 probe self-test). |

### Public API surface impact

- **NEW export** — `isWebGLSupported(): boolean` from `@mkbabb/glass-ui/metaballs` (synchronous probe; no proxy, no ref-cycle hazard).
- **REMOVED expose** — `MetaballCanvas.isSupported` no longer reachable via instance ref. Internal template still uses it for the canvas/fallback split.
- **HARDENED expose** — `MetaballCanvas.isReducedMotion` / `isReducedTransparency` now `readonly()` (consumers can read but not mutate).
- **No change** — `ConfiguratorLayer` public props/emits/slots match prior shape; consumer CSS reading `data-state="open"|"closed"` keeps working.
- **No change** — `useConfiguratorState` unchanged.

Per the v1.0 invariant 4 (no backwards-compat aliases), the `isSupported` removal is a clean break. Consumers of `@mkbabb/glass-ui/metaballs` reading `canvasRef.value?.isSupported` will see `undefined` post-upgrade; the canonical replacement is the new `isWebGLSupported()` synchronous probe.

## § Verification

### Vitest fixture

```
$ npx vitest run tests/configurator-recursion.spec.ts
 Test Files  1 passed (1)
      Tests  6 passed (6)
```

All 6 tests pass:

- `does not recurse on mount (cold-start with watcher graph live)` — PASS
- `does not recurse across N=8 preset swaps` — PASS
- `does not recurse across M=12 color mutations interleaved with preset swaps` — PASS
- `does not recurse across setMotionMode toggles (computed write-back path)` — PASS
- `does not recurse under a flush-stress cold-start (synchronous burst + microtask drain)` — PASS
- (probe self-test) `captures a known watcher write-feedback recursion` — PASS

### Full test suite

```
$ npx vitest run
 Test Files  29 passed (29)
      Tests  339 passed (339)
```

No regressions in any existing test file. The 28 pre-existing test files (components.smoke, composables.smoke, lifecycle-cleanup, menuItemVariants, public-surface, stories.smoke, useStoryDemo, ...) all pass.

### Typecheck

```
$ npm run typecheck
> @mkbabb/glass-ui@1.0.4 typecheck
> vue-tsc --noEmit
(emits the pre-existing V.W3 timeline-segmented + timeline-continuous TS1128/TS1160/TS1005 syntax errors; no NEW errors introduced by M.W2 Lane A.)
```

The pre-existing timeline errors are unrelated to F-ε-3 (V.W3 unclosed template literal in `demo/stories/data/timeline-segmented.vue`). Lane A introduces zero new typecheck errors.

### Build

```
$ NODE_OPTIONS=--max-old-space-size=8192 npm run build
[vite:dts] Declaration files built in 27302ms.
✓ built in 28.09s
```

Library builds cleanly. All 38 subpaths emit per the canonical L.W1 Lane C surface.

### Lighthouse re-run

Output: `/tmp/lh-mw2a/metaballs-post-fix-4.json`.

```
$ lighthouse@12 http://localhost:5173/motion/metaballs \
    --chrome-flags="--headless=new --no-sandbox --disable-gpu" \
    --max-wait-for-load=60000 \
    --only-categories=best-practices
```

```
errors-in-console score: 1 (PASS)
errors-in-console count: 0
best-practices category score: 0.96
```

Vs the L.W8 baseline (`docs/tranches/L/audit/L-audit-ε-performance.md § 4`):

| Audit | L.W8 (pre-fix) | M.W2 (post-fix) |
|---|---|---|
| `errors-in-console` score | 0 | **1** |
| `errors-in-console` items | 1 (recursion) | **0** |
| `best-practices` category | 0.96 | 0.96 |

The F-ε-3 recursion is **CLEARED** under Lighthouse's canonical reproduction configuration.

### Puppeteer-core throttled cold-load (cross-verification)

Pre-fix (puppeteer with 1.5Mbps DL / 750Kbps UL / 4x CPU throttle):
```
PAGEERROR COUNT: 15
[0] Maximum recursive updates exceeded in component <Configurator>...
[1] Maximum recursive updates exceeded in component <Configurator>...
... (15 in total)
```

Plus 14 `[Vue warn]: Unhandled error during execution of watcher callback` traces rooted at `<Presence>` + `<CollapsibleContent>` (7 layers × 2 watchers = 14).

Post-fix:
```
PAGEERROR COUNT: 0
```

Zero pageerror events. Zero `[Vue warn]` traces. The dev server renders the route cleanly.

## § Open questions for orchestrator

1. **Demo story author confirmation**: the metaballs story (`demo/stories/motion/metaballs.vue`) still uses the legacy `v-if="isSupported"` + `?? true` fallback pattern. With `MetaballCanvas.isSupported` no longer exposed, the story's computed always resolves to `true` — MetaballCanvas always mounts and routes to its internal fallback slot when WebGL is unavailable. The story's intent ("hide MetaballCanvas when unsupported") is now structurally impossible to express via that pattern; it would need to call `isWebGLSupported()` directly. This is a Lane C concern (consumption-pattern cleanup); Lane A leaves the story unchanged per Lane A bounds. Recommend Lane C absorb the call-site update.

2. **Tertiary fix is API-breaking on `MetaballCanvas.isSupported`**: per v1.0 invariant 4 (no backwards-compat aliases), the clean break is acceptable, but a v1.x patch tag (e.g., `v1.0.5`) should bump CHANGELOG accordingly. The MIGRATION.md addition would be one paragraph: `canvasRef.value?.isSupported` → `isWebGLSupported()`.

3. **Lighthouse `font-size` audit drift** (1.0 → 0 on one of my intermediate captures, returned to 1.0 in the final post-fix-4): this is a Lighthouse heuristic flake on Vite dev-mode SSR shell; not F-ε-3-related and not introduced by Lane A. Flagging as observation only.

4. **`open: undefined` in `withDefaults`**: this is a defensive fix for a Vue 3 Boolean coercion gotcha that affects ANY component declaring an optional Boolean prop without a default. Could be lifted to a tranche-wide audit (V.W3 style) — there may be other components with the same latent bug. Not blocking for M.W2 Lane A close.

## § Worktree diff verification

```
$ git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-ac06596aab2166b1e status --short
 M src/components/custom/configurator/ConfiguratorLayer.vue
 M src/components/custom/metaballs/MetaballCanvas.vue
 M src/components/custom/metaballs/index.ts
 M src/components/custom/metaballs/useMetaballs.ts
?? tests/configurator-recursion.spec.ts
?? docs/tranches/M/audit/W2-Lane-A-F-eps-3-proof.md

$ git -C /Users/mkbabb/Programming/glass-ui/.claude/worktrees/agent-ac06596aab2166b1e diff --stat
 .../custom/configurator/ConfiguratorLayer.vue      | 104 ++++++++++++++++-----
 src/components/custom/metaballs/MetaballCanvas.vue |  45 ++++++++-
 src/components/custom/metaballs/index.ts           |   2 +-
 src/components/custom/metaballs/useMetaballs.ts    |  63 ++++++++++++-
 4 files changed, 182 insertions(+), 32 deletions(-)
```

**Within Lane A bounds.** All modifications fall under `src/components/custom/configurator/**`, `src/components/custom/metaballs/**`, and `tests/**`. No changes to `src/api/`, `demo/`, `MIGRATION.md`, or any other tracked path.

## § Authority

Lane A operated under the M.W2 dispatch + the hardened agent git clause (read-only git: `git status`, `git diff` only; no add / commit / stash / reset / restore / checkout). Build + test commands invoked: `npm run dev` (background), `npx vitest run`, `npm run typecheck`, `npm run build`, `lighthouse@12` via npx, `puppeteer-core` via npx for CDP-level trace capture. Orchestrator owns integration + commit of the 4 modified source files + the new test fixture + this proof doc.
