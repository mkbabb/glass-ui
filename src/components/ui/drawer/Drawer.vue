<script lang="ts" setup>
import type { DrawerRootEmits, DrawerRootProps } from 'vaul-vue'
import { DrawerRoot } from 'vaul-vue'
import { useEmitAsProps } from 'reka-ui'
import { computed, ref, watch } from 'vue'
import type { DrawerMode } from './index'

/**
 * `mode` — additive shorthand (AN.W3). `"modal"` (default) keeps the iOS
 * scale-down look: `shouldScaleBackground: true`, `modal: true`. `"live-behind"`
 * bundles the non-modal peek/half/full bottom-sheet contract — `modal: false`
 * (no focus trap, no page `aria-hidden`, page-behind stays interactive),
 * `shouldScaleBackground: false` (page-behind stays at native size), and the
 * default `snapPoints: [0.12, 0.5, 1]` detent ladder. Every prop the mode sets
 * is still overridable by an explicit prop — `mode` only supplies defaults.
 *
 * NOTE: we do NOT route through `useForwardPropsEmits` here. That helper
 * reflects only props the parent vnode actually passed (plus component-declared
 * defaults), so the values our `resolved` computed derives for keys the consumer
 * did NOT pass (e.g. `modal:false` under `mode="live-behind"`) would be dropped.
 * Binding `resolved` directly + merging emit-as-props is the correct shape for a
 * computed-default wrapper.
 */
const props = withDefaults(
  defineProps<DrawerRootProps & { mode?: DrawerMode }>(),
  {
    mode: 'modal',
    open: undefined,
    shouldScaleBackground: undefined,
    modal: undefined,
    snapPoints: undefined,
  },
)

const emits = defineEmits<DrawerRootEmits>()
const emitsAsProps = useEmitAsProps(emits)

/**
 * AY.W-ANIM1 (W-ANIM-FIX) — the DrawerTrigger silent-no-op fix (RA-anim-suite §4).
 *
 * `useEmitAsProps` ALWAYS injects an `onUpdate:open` handler (one per declared
 * emit), so vaul-vue's `DrawerRoot` ALWAYS sees an `update:open` listener and
 * takes its CONTROLLED branch: `h(open) { if (openProp !== undefined) { emit
 * update:open; return } else { internalOpen = open } }`. With the consumer NOT
 * binding `v-model:open`, vaul re-emits but `props.open` stays `undefined`, the
 * internal open is never set, and the trigger silently no-ops (aria-expanded /
 * data-state never flip — the exact stale-reka/vaul-binding class).
 *
 * Fix: make the wrapper SELF-CONTROLLED. `localOpen` defaults the uncontrolled
 * case; when the consumer binds `v-model:open` it mirrors `props.open`. vaul
 * always reads a defined `open` (so its controlled branch has a backing value),
 * and our `onUpdate:open` updates `localOpen` AND re-emits — so a bound
 * `v-model:open` still round-trips. No vueuse (the root barrel stays vueuse-free).
 */
const isControlled = computed(() => props.open !== undefined)
const localOpen = ref(props.open ?? false)
watch(
  () => props.open,
  (v) => {
    if (v !== undefined) localOpen.value = v
  },
)
function onUpdateOpen(open: boolean) {
  localOpen.value = open
  emits('update:open', open)
}

// Stable identity for the default detent ladder — recreating the array on every
// recompute would churn vaul's `snapPoints` ref and re-init the snap machinery.
const DEFAULT_LIVE_SNAP_POINTS: (number | string)[] = [0.12, 0.5, 1]

const forwarded = computed(() => {
  const { mode, open: _open, ...rest } = props
  const live = mode === 'live-behind'
  return {
    ...rest,
    // vaul always gets a DEFINED open (its controlled branch needs a backing
    // value); when uncontrolled this is the wrapper's self-managed localOpen.
    open: isControlled.value ? props.open : localOpen.value,
    modal: props.modal ?? (live ? false : true),
    shouldScaleBackground: props.shouldScaleBackground ?? (live ? false : true),
    snapPoints: props.snapPoints ?? (live ? DEFAULT_LIVE_SNAP_POINTS : undefined),
    ...emitsAsProps,
    // our handler OVERRIDES the emitsAsProps onUpdate:open so the uncontrolled
    // open lands in localOpen (and a controlled bind still re-emits).
    'onUpdate:open': onUpdateOpen,
  }
})
</script>

<template>
  <DrawerRoot data-slot="drawer" v-bind="forwarded">
    <slot />
  </DrawerRoot>
</template>
