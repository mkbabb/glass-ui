# N.W0 Lane A1 — `useTouchGate` → `<Slider>` wire proof

## § Disposition

Wired `useTouchGate` into `src/components/ui/slider/Slider.vue`. The Slider
now mirrors the canonical `useTouchGate` consumer pattern from `GlassDock.vue`
on top of its existing `dockKeepOpen` contract:

- A per-Slider `useTouchGate()` instance is instantiated in `<script setup>`.
- `touchstart` / `touchmove` / `touchend` handlers on the `<SliderRoot>` feed
  the gate's `handleTouchStart` / `handleScrollCheck` / `handleTouchEnd` API.
- A `useTemplateRef` (`sliderRootRef`) captures the `SliderRoot` instance and
  resolves the underlying `HTMLElement` (via `$el` fall-through) at gesture
  time — this is the `controlEl` passed to `handleTouchStart`.
- The first tap on a touch device is gated (returns `false` from
  `handleTouchStart`); we `preventDefault()` + `stopPropagation()` on the
  initial tap exactly as `GlassDock` does, so the SliderRoot doesn't begin a
  drag until the gate flips `isActive` true.
- Off-control taps deactivate via the shared `document`-level `touchstart`
  listener built into `useTouchGate`'s `gateRegistry` — no per-consumer wire
  needed.
- A `watch(touchGate.isActive)` mirrors gate activation/deactivation onto the
  existing `dockKeepOpen` / `dockRelease` acquire-token path, so an enclosing
  `<GlassDock>` observes the touch gesture as held for the duration of the
  gate's active window. This preserves the bidirectional dock keep-open
  contract documented in CLAUDE.md ("Slider keep-dock-open contract").
- The root element reflects gate state via `:data-touch-active` (additional
  attribute alongside the existing `:data-held`), enabling consumers and
  scoped CSS to target touch-active state.
- Desktop pointers are unaffected: `useTouchGate.isTouchDevice` is `false`,
  so `handleTouchStart` returns `true` and all gate machinery short-circuits.

## § File changes summary

- Edited: `src/components/ui/slider/Slider.vue` (+60 / -1)
  - Imports: added `useTemplateRef` + `watch` from `vue`; added `useTouchGate`
    from `../../../composables/dom/useTouchGate`.
  - Script: added `sliderRootRef` (`useTemplateRef`), `touchGate` instance,
    `getRootEl()` helper, `onTouchStart` / `onTouchMove` / `onTouchEnd`
    handlers, a `watch(touchGate.isActive)` that bridges gate state into the
    existing `acquire()` / `release()` dock-token path, and an
    `isTouchActive` computed.
  - Template: added `ref="sliderRootRef"` and `:data-touch-active` on
    `SliderRoot`; wired `@touchstart` / `@touchmove` / `@touchend` listeners.

## § Canonical pattern citation

Reference site: `src/components/custom/dock/GlassDock.vue`, especially
lines 85, 194–220, 222–226:

```ts
// GlassDock.vue:85
const touchGate = useTouchGate(props.collapseDelay);

// GlassDock.vue:194-204
function onTouchStart(event: TouchEvent): void {
  if (!shouldGateTouch() || visualExpanded.value) return;
  const root = dockEl.value;
  const touch = event.touches[0];
  if (!root || !touch) return;
  if (!touchGate.handleTouchStart(root, touch.clientY)) {
    event.preventDefault();
    event.stopPropagation();
  }
}

// GlassDock.vue:206-209
function onTouchMove(event: TouchEvent): void {
  if (!shouldGateTouch()) return;
  touchGate.handleScrollCheck(event);
}

// GlassDock.vue:222-226
watch(touchGate.isActive, (isActive) => {
  if (!isActive && expanded.value && !isPinned.value && !alwaysExpanded.value) {
    collapse();
  }
});
```

Slider mirroring:

- `touchGate = useTouchGate()` instance shape: identical (Slider uses the
  default 3000 ms deactivate delay — see open question §below for the
  delay-choice rationale).
- `handleTouchStart(root, clientY)` return-value semantics: identical — when
  it returns `false` we `preventDefault()` + `stopPropagation()` to swallow
  the initial gate-pending tap.
- `handleScrollCheck(event)` on `touchmove`: identical.
- `handleTouchEnd()` on `touchend`: identical.
- `watch(touchGate.isActive, …)`: identical structure; Slider's reactive
  side-effect bridges to the existing dock `acquire()` / `release()` token
  path rather than `collapse()`, because the Slider's role in the contract
  is the keep-open producer, not the dock-state consumer.

The only consumer-specific divergence is the gate-eligibility predicate:
`GlassDock` short-circuits via `shouldGateTouch()` (orientation +
`alwaysExpanded` filter) because vertical / always-expanded docks have no
collapsed state to gate. Slider has no analogous filter — every slider is
gate-eligible on touch — so the predicate is elided.

The `controlEl` source is the SliderRoot's underlying `HTMLElement`. Because
`SliderRoot` is a reka-ui compound primitive (Vue component instance, not a
bare DOM element), we resolve it lazily via the `$el` field on the captured
template ref. The captured ref is typed as `{ $el: HTMLElement } | HTMLElement | null`
to keep TS happy on either resolution path.

## § Verification

- `npx vue-tsc --noEmit` — GREEN for all `src/` files. The only remaining
  errors are the pre-existing `demo/stories/data/timeline-{continuous,segmented}.vue`
  template-literal/syntax errors that were present at HEAD baseline before
  this lane's edit; they are unrelated to this wire.
- `NODE_OPTIONS="--max-old-space-size=8192" npm run build` — GREEN.
  Final lines:
  ```
  [vite:dts] Declaration files built in 28030ms.
  ✓ built in 28.82s
  ```
- File bounds respected: only `src/components/ui/slider/Slider.vue` was
  edited. No staging / committing / git mutation performed (hardened agent
  git clause).

## § Open questions for orchestrator

1. **`useTouchGate` deactivate delay**: this wire uses the composable's
   default (3000 ms). `GlassDock` passes `collapseDelay` (default 2000 ms)
   so the gate's auto-deactivate stays loosely-coupled to the dock collapse
   timer. The Slider has no own collapse timer — should it adopt 2000 ms to
   match dock-cohort expectations, or stay at 3000 ms? Default of 3000 ms
   seems appropriate as the gesture-active window for a discrete control.
   Flagging for explicit ratification.
2. **`data-touch-active` CSS recipe**: no scoped CSS rule was added against
   `[data-touch-active]` in this lane (Slider already has a `data-held`
   recipe for the halo intensification). If a separate touch-active visual
   treatment is desired (e.g. enlarged thumb during touch gesture before
   first move event fires), it can be layered in a follow-up. The
   attribute is exposed and reactive — no further script changes needed.
3. **Reka-ui `$el` access**: the runtime `instanceof HTMLElement` branch in
   `getRootEl()` is defensive — under Vue 3.5 + reka-ui current `SliderRoot`,
   the template ref always resolves to a component instance with an `$el`
   field. If the orchestrator prefers, the branch can be tightened to a
   single `(ref.$el as HTMLElement | undefined) ?? null` — the dual-branch
   shape was chosen to be resilient to reka-ui version drift.

## § Worktree diff verification output

```
$ git diff --stat
 src/components/ui/slider/Slider.vue | 61 ++++++++++++++++++++++++++++++++++++-
 1 file changed, 60 insertions(+), 1 deletion(-)
```

Full diff captured (truncated below for brevity; see `git diff src/components/ui/slider/Slider.vue` in the worktree for the canonical text):

```diff
@@ -1,8 +1,9 @@
 <script setup lang="ts">
-import { type HTMLAttributes, type ComputedRef, computed, inject, onBeforeUnmount } from 'vue'
+import { type HTMLAttributes, type ComputedRef, computed, inject, onBeforeUnmount, useTemplateRef, watch } from 'vue'
 import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
 import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from 'reka-ui'
 import { cn } from '../../../utils'
+import { useTouchGate } from '../../../composables/dom/useTouchGate'
 import { sliderVariants, type SliderVariants } from './index'
 ...
+const sliderRootRef = useTemplateRef<{ $el: HTMLElement } | HTMLElement | null>('sliderRootRef')
+const touchGate = useTouchGate()
+...
+function onTouchStart(event: TouchEvent): void {
+  const root = getRootEl()
+  const touch = event.touches[0]
+  if (!root || !touch) return
+  if (!touchGate.handleTouchStart(root, touch.clientY)) {
+    event.preventDefault()
+    event.stopPropagation()
+  }
+}
+...
+watch(touchGate.isActive, (isActive) => {
+  if (isActive) { acquire() } else { release() }
+})
+...
+const isTouchActive = computed(() => touchGate.isActive.value)
   <SliderRoot
+    ref="sliderRootRef"
     :class="cn(sliderVariants({ variant: v, size: s }), props.class)"
     :data-variant="v"
     :data-size="s"
     :data-held="isHeld || undefined"
+    :data-touch-active="isTouchActive || undefined"
     v-bind="forwarded"
     @pointerdown="onPointerDown"
+    @touchstart="onTouchStart"
+    @touchmove="onTouchMove"
+    @touchend="onTouchEnd"
```

The orchestrator runs `git -C <worktree-path> diff --stat` at wave close and
will see the same `1 file changed, 60 insertions(+), 1 deletion(-)` outcome
this proof reports.
