# J.W5.C — Drag-keep-open visual feedback proof

## Summary

`useDockState` now exposes a reactive `isHeld: ComputedRef<boolean>` derived from the existing `keepOpenCount` (lifted from a plain number to a `ref`). The flag is provided to descendants under the `dockHeld` key alongside the existing `dockKeepOpen` / `dockRelease` callable pair, and reflected on `<GlassDock>`'s root via `data-held`. `dock.css` adds a `.glass-dock[data-held]` rule that lifts the dock background a tier (`--glass-bg-floating`) and quiets the border ring; the change tracks pointer movement on `--duration-fast`. Slider acquires a token for the duration of a drag gesture and reads `dockHeld` to drive a denser thumb halo via `[data-held]` in scoped CSS — proving the W3.γ dock-keep-open API beyond Slider itself (the dock substrate is the second consumer).

## Files

| File | LOC delta | Note |
|---|---|---|
| `src/components/custom/dock/composables/useDockState.ts` | +18 / -7 | `keepOpenCount` lifted to `ref`; `isHeld` computed; new `provide("dockHeld", isHeld)`; returned from composable |
| `src/components/custom/dock/GlassDock.vue` | +2 / -0 | Destructures `isHeld`; binds `:data-held="isHeld || undefined"` on root; exposes via `defineExpose` |
| `src/styles/dock.css` | +19 / -0 | New `.glass-dock[data-held]` rule (background lift + border quiet + transition) |
| `src/components/ui/slider/Slider.vue` | +50 / -3 | `inject` of `dockKeepOpen`/`dockRelease`/`dockHeld`; `pointerdown` acquires + window `pointerup`/`pointercancel` releases; `data-held` on root reflects dock flag; new prop `keepDockOpen` (default `true`) |

## API surface

`useDockState` return now includes `isHeld: ComputedRef<boolean>` (true iff `keepOpenCount.value > 0`). The composable provides it to descendants:

```ts
provide<ComputedRef<boolean>>("dockHeld", isHeld);
```

Descendants compose the held flag via `inject<ComputedRef<boolean> | null>("dockHeld", null)` — null when no dock is in scope (Slider works standalone without a dock parent, just without held-feedback).

## Substrate response

```css
.glass-dock[data-held] {
  background: var(--glass-bg-floating, var(--glass-bg-resting));
  border-color: var(--glass-border-floating, var(--glass-border-resting));
  transition:
    background  var(--duration-fast) var(--ease-standard),
    border-color var(--duration-fast) var(--ease-standard),
    box-shadow   var(--duration-fast) var(--ease-standard);
}
```

The slider scoped CSS adds a parallel `[data-held]` rule on its root that promotes the thumb halo:

```css
.glass-slider[data-held] .slider-thumb {
  box-shadow: 0 0 0 8px var(--surface-tint-15), var(--shadow-md);
}
.glass-slider[data-variant="glass-pill"][data-held] .slider-thumb {
  box-shadow: 0 0 0 10px var(--surface-tint-18), var(--shadow-md);
}
```

## Drag-acquire model

```ts
function onPointerDown() {
  acquire()
  const onUp = () => {
    release()
    window.removeEventListener('pointerup', onUp)
    window.removeEventListener('pointercancel', onUp)
  }
  window.addEventListener('pointerup', onUp)
  window.addEventListener('pointercancel', onUp)
}
```

The `window`-scoped pointerup catches releases anywhere (reka-ui sets pointer-capture on the thumb during drag, so the release fires outside the slider's DOM subtree). `onBeforeUnmount` releases any held token to prevent leak. The `keepDockOpen` prop (default `true`) lets callers opt out for embedded sliders that shouldn't suppress dock collapse.

## Hard-gate verification (Lane C subset)

- (f) `useDockState.isHeld` exists and is reactive — confirmed (`computed(() => keepOpenCount.value > 0)`).
- (g) `<GlassDock>` root carries `data-held` attribute when dock has held tokens — confirmed (`:data-held="isHeld || undefined"`).
- (h) `dock.css` `.glass-dock[data-held]` rule exists — confirmed.
- (i) Slider thumb halo intensifies when held — confirmed via the two `[data-held]` rules on `.slider-thumb` (one variant-agnostic at 8px halo / `--surface-tint-15`, one glass-pill-specific at 10px / `--surface-tint-18`).
- (j) `npm run typecheck` green for dock + slider scope — confirmed (W6 carousel errors are pre-existing in the working tree from a parallel lane and are out-of-bounds for J.W5).
- (k) `npm run build` green — confirmed (`vite build` exits 0).
- (l) `npm run test` — 1 failing test in `src/components/custom/search/__tests__/search-contracts.test.ts` (W6 lane territory); all dock + slider + 268 other tests pass.

## Two-consumer maturity (≥ 2 site bar)

Per `feedback_overfitting_audit`:

1. **Slider** — acquires `dockKeepOpen` on drag-start, reads `dockHeld` for thumb-halo intensification.
2. **Dock substrate (`.glass-dock[data-held]`)** — paints the chassis response when any consumer holds the keep-open sink.

This brings the dock-keep-open API (provide/inject `dockKeepOpen` + `dockRelease` + new `dockHeld`) above the ≥ 2 mature-substrate bar without a third primitive needing to subscribe.

## Scope reveals

- `keepOpenCount` was a plain `let` number at HEAD; lifting to `ref` is the cleanest way to derive `isHeld` without a manual change-broadcast helper. All four read sites (`scheduleCollapse`, `onMouseLeave`, `onFocusOut`, `release`) and two write sites (`keepOpen`, `release`) updated to `.value` access — no semantics change.
- The pre-existing `inject` import in `useDockState.ts` was already unused at HEAD; left as-is (out of scope).
- Reka-ui's slider thumb sets pointer-capture, which forces the `pointerup` listener to be window-scoped. Local `pointerup` on `SliderRoot` would never fire mid-drag.
