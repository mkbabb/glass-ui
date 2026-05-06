# I — pre-resize-observer-hardening / Lane B (consumer migration)

Lane B consolidates the seven hand-rolled `ResizeObserver` call sites under
`src/` onto the new `useResizeObserver` composable shipped on Lane A. The
public surface (`src/index.ts:38 — export * from "./composables/useResizeObserver"`)
was already wired before this lane started, so all migrations are pure consumer
re-pointing — no new exports.

## Migration table

| # | Old pattern (file:line) | New pattern (file:line) | Options | Rationale | Typecheck |
|---|---|---|---|---|---|
| 1 | `src/composables/motion/useScrollProgress.ts:33,64-66` (let-binding + manual `observe()` in `onMounted`, manual `unobserve`/`observe` in target watcher, `disconnect` in `onBeforeUnmount`) | `src/composables/motion/useScrollProgress.ts:36-43` (single `useResizeObserver` against `computed(() => unref(options.target))`) | `{ rafBatch: false, threshold: 0 }` | Parent `schedule()` already rAF-coalesces every entry into a single `computeProgress()` call. Adding the composable's default rAF-batching would frame-skip a layer of intent that's already present; threshold gating is unnecessary because `computeProgress()` is itself idempotent and cheap. Preserve original "every entry → schedule" cadence. | green |
| 2 | `src/composables/virtual/useVirtualSectionWindow.ts:89,229-235` (`containerResizeObserver` let + `attachContainerObserver(container)` helper called inside `bindContainer`) | `src/composables/virtual/useVirtualSectionWindow.ts:228-234` (declarative `useResizeObserver(options.scrollContainer, ...)` at top level; `attachContainerObserver` helper deleted) | `{ rafBatch: false, threshold: 0 }` | `scheduleRecalculate()` already rAF-coalesces. Sub-pixel container changes can still nudge spacer arithmetic at small viewport heights, so threshold:0 preserves fidelity. The composable's internal target-ref watcher subsumes the manual rebinding inside `bindContainer`. | green |
| 3 | `src/composables/virtual/useVirtualSectionWindow.ts:283-296` (`contentResizeObserver` let + manual `watch(options.contentEl, …)` that disconnect/reobserves on swap) | `src/composables/virtual/useVirtualSectionWindow.ts:282-289` (single `useResizeObserver(options.contentEl, …)` guarded by `if (options.contentEl)`) | `{ rafBatch: false, threshold: 0 }` | Same coalescing rationale as the container observer. The composable's own `watch` handles ref-target swaps when images load above the virtual list. | green |
| 4 | `src/components/custom/aurora/composables/runtime.ts:184-185` (`const ro = new ResizeObserver(...); ro.observe(canvas)`) | `src/components/custom/aurora/composables/runtime.ts:184-193` (`useResizeObserver(canvasRef, …)` returning `stopResizeObserver`, called from `dispose()`) | `{ rafBatch: false, threshold: 0 }` | `createAurora` runs outside a Vue effect-scope (it's called imperatively from a setup with the raw canvas), so the composable's `onScopeDispose` no-ops and we need the explicit `stop()` handle. DPR-resync needs every entry; threshold:0 dodges sub-pixel canvas-resize misses. | green |
| 5 | `src/components/custom/tabs/UnderlineTabs.vue:44-56` (`let resizeObserver` + `onMounted` observe, `onUnmounted` disconnect) | `src/components/custom/tabs/UnderlineTabs.vue:44-46` (top-level `useResizeObserver(containerRef, () => updateUnderline())`) | defaults — `{ rafBatch: true, threshold: 0.5 }` | `updateUnderline()` writes inline styles; coalescing drag-resize storms is exactly what the composable defaults are tuned for. `onUnmounted` disposal removed (auto-disposed on scope). | green |
| 6 | `src/components/custom/tabs/BouncyToggle.vue:158-170` (same shape as UnderlineTabs) | `src/components/custom/tabs/BouncyToggle.vue:159-161` (top-level `useResizeObserver(containerRef, () => updateSliders())`) | defaults | Same as UnderlineTabs — single-frame slider geometry update, defaults are correct. | green |
| 7 | `src/components/custom/metaballs/useMetaballs.ts:73,151-152` (let-binding + observe inside `init()`, disconnect in `dispose()`, plus a `watch(canvasRef, …)` that re-runs `init`) | `src/components/custom/metaballs/useMetaballs.ts:243-247` (top-level `useResizeObserver(canvasRef, () => resize(), { rafBatch: false, threshold: 0 })`; the surviving `watch(canvasRef, …)` still triggers full `dispose+init` for WebGL re-init) | `{ rafBatch: false, threshold: 0 }` | Canvas DPR-resync writes `canvas.width/height` + `gl.viewport`; every entry matters. `init()` no longer creates the observer (the composable owns it for the whole component lifetime); dispose() stub-comments out the manual disconnect since `onScopeDispose` handles it. | green |

## Behavior-preservation notes

Five of seven sites use `{ rafBatch: false, threshold: 0 }`:

- **`useScrollProgress`, `useVirtualSectionWindow` (×2)**: the *consumer*
  already does its own rAF-coalescing via a single rAF-flag, so the
  composable's batching would interpose a second frame's worth of latency.
  Threshold:0 because the consumer's downstream work is idempotent and
  cheap — letting every entry through is functionally identical to
  threshold-gated dispatch in those code paths.
- **`runtime.ts` (Aurora), `useMetaballs.ts`**: WebGL DPR-resync. Want
  every observer entry through; threshold:0 to avoid skipping
  sub-pixel device-pixel-ratio edges.

Two sites adopt the composable's defaults:

- **`UnderlineTabs.vue`, `BouncyToggle.vue`**: the recompute writes layout
  inline styles directly; coalescing drag-resize storms into one
  rAF-flushed callback per frame is exactly what the defaults provide and
  is strictly better than the previous "fire on every entry" cadence
  (which could double-paint within a frame).

The default change for the two `.vue` sites is the only behavioral
delta in this lane; the rest preserve original behavior verbatim.

### Edge cases worth noting

- **`useScrollProgress`**: previously did `onMounted` + `watch` to wire and
  re-wire the observer manually. Now `useResizeObserver(targetRef, …)` is
  declarative at top level; the surviving `watch(() => unref(options.target), …)`
  retains its `schedule()` invocation so the mapping refreshes when the target
  swaps (parity with the old explicit `schedule()` call inside the watcher).
- **`useVirtualSectionWindow`**: the `attachContainerObserver(container)`
  helper is gone in full — the composable subsumes its responsibilities.
  `bindContainer` now only handles the scroll-listener side of the rebind.
- **`createAurora`**: not a Vue composable. Lane A's composable correctly
  no-ops `onScopeDispose` outside an effect-scope, so the imperative
  `stop()` handle is the only correct cleanup vector and is wired into
  `dispose()`.
- **`useMetaballs`**: the existing `watch(canvasRef, (el) => { if (el)
  { dispose(); init(); } })` pattern is retained — that's WebGL re-init,
  not observer rebinding, and remains the consumer's responsibility. The
  composable's internal `watch` independently re-targets the observer
  when `canvasRef` swaps; the two watchers don't conflict because
  `dispose()`/`init()` no longer touches the observer.

## Final residual `rg "new ResizeObserver" src/`

```
src/composables/useResizeObserver.ts:132        observer = new ResizeObserver((entries) => {
src/composables/glass/useGlassRenderer.ts:206    const observer = new ResizeObserver(() => {
src/components/custom/blob/_internal/useMetaballRenderer.ts:307  ? new ResizeObserver((entries) => {
```

3 hits, not the 1 the brief predicted. The brief enumerated 7 migration targets
explicitly by file; the additional residuals are call sites that **were not in
that list**:

- `src/composables/glass/useGlassRenderer.ts:206`
- `src/components/custom/blob/_internal/useMetaballRenderer.ts:307`

These are out of Lane B's declared file bounds (`May MODIFY` set in the brief).
**Scope reveal flagged below**; not migrated this lane.

## Final `npm run typecheck`

```
> @mkbabb/glass-ui@0.6.1 typecheck
> vue-tsc --noEmit
```

Clean — zero diagnostics.

## Final `npm run build`

```
[vite:dts] Declaration files built in 17044ms.
✓ built in 17.86s
```

Clean. (One transient false-flake observed: re-running `npm run build`
against a populated `dist/` produced a `vite-plugin-dts` "referenced path
was not found" internal error around `useTypewriter.d.ts` — unrelated to
ResizeObserver migrations, and reproduced only against a stale `dist/`.
Removing `dist/` and re-running yields a clean build, as shown above.)

## Playwright probe

Boot: `npm run dev` (background) → Vite on :5173.

| Story | URL | Console errors | Console warnings |
|---|---|---|---|
| Foundations intro (default landing) | `/foundations/intro` | 0 | 0 |
| Scroll-driven type | `/motion/scroll-type` | 0 | 0 |
| Metaballs | `/motion/metaballs` | 0 | 0 |
| Bouncy tabs (uses BouncyToggle) | `/navigation/bouncy-tabs` | 0 | 0 |
| Aurora studio | `/aurora` | 0 | 0 |
| Buttons primitives | `/primitives/buttons` | 0 | 0 |

All probed routes load cleanly. No `ResizeObserver loop completed with
undelivered notifications` warnings — historically the ones the rAF-batched
+ thresholded composable was designed to suppress.

## Scope reveals

1. **Two un-enumerated ResizeObserver call sites** still exist in `src/`:
   - `src/composables/glass/useGlassRenderer.ts:206`
   - `src/components/custom/blob/_internal/useMetaballRenderer.ts:307`

   These are NOT in Lane B's `May MODIFY` set and were NOT in the brief's
   enumerated 7-site list. Halting at scope-edge per the brief. A
   follow-up wave (or a brief addendum) can pick these up — the
   migration pattern is identical to sites #4 / #7 (canvas-DPR-resync,
   `{ rafBatch: false, threshold: 0 }`).

2. **`createAurora` runs outside a Vue scope.** The composable handles
   this via the documented "no scope → no auto-disposal, return `stop()`"
   contract, so this isn't a defect — but it's a pattern worth noting in
   the composable's docstring as a reference example for similar
   imperative consumers (e.g. blob mascot grammar).

## File bounds — confirmation

Modified (within `May MODIFY` bounds):
- `src/composables/motion/useScrollProgress.ts`
- `src/composables/virtual/useVirtualSectionWindow.ts`
- `src/components/custom/aurora/composables/runtime.ts`
- `src/components/custom/tabs/UnderlineTabs.vue`
- `src/components/custom/tabs/BouncyToggle.vue`
- `src/components/custom/metaballs/useMetaballs.ts`

Created:
- `docs/tranches/I/audit/I-pre-resize-observer-hardening-B.md`

NOT touched (per `Must NOT touch`):
- `src/composables/useResizeObserver.ts` — Lane A's territory; `git diff`
  confirms my workspace's `useResizeObserver.ts` modifications are Lane
  A's parallel improvements (threshold clamping, initial-dispatch
  contract docstring), not mine.

No destructive git commands used (`stash`, `reset`, `checkout HEAD --`,
`clean -f`, `--force`, `--no-verify`, etc.). No commits — orchestrator
will commit.
