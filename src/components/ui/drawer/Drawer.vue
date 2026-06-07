<script lang="ts" setup>
import type { DrawerRootEmits, DrawerRootProps } from 'vaul-vue'
import { DrawerRoot } from 'vaul-vue'
import { useEmitAsProps } from 'reka-ui'
import { computed } from 'vue'
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
    shouldScaleBackground: undefined,
    modal: undefined,
    snapPoints: undefined,
  },
)

const emits = defineEmits<DrawerRootEmits>()
const emitsAsProps = useEmitAsProps(emits)

// Stable identity for the default detent ladder — recreating the array on every
// recompute would churn vaul's `snapPoints` ref and re-init the snap machinery.
const DEFAULT_LIVE_SNAP_POINTS: (number | string)[] = [0.12, 0.5, 1]

const forwarded = computed(() => {
  const { mode, ...rest } = props
  const live = mode === 'live-behind'
  return {
    ...rest,
    modal: props.modal ?? (live ? false : true),
    shouldScaleBackground: props.shouldScaleBackground ?? (live ? false : true),
    snapPoints: props.snapPoints ?? (live ? DEFAULT_LIVE_SNAP_POINTS : undefined),
    ...emitsAsProps,
  }
})
</script>

<template>
  <DrawerRoot data-slot="drawer" v-bind="forwarded">
    <slot />
  </DrawerRoot>
</template>
