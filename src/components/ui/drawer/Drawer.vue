<script lang="ts" setup>
import { DialogRoot } from 'reka-ui'
import { computed, ref, toRef, watch } from 'vue'
import type { DrawerDirection, DrawerMode } from './index'
import { resolveDefaultSnapPoints } from './constants'
import { provideDrawerSnapContext } from './composables/drawerSnapContext'

/**
 * BB.W-DRAWER-ABROGATE — the Drawer root on the HOUSE reka `DialogRoot` substrate
 * (the SAME shape `Dialog.vue` binds). vaul-vue is gone: reka owns the open-control,
 * the portal, the focus management (trap when `modal`, free when `live-behind`) and
 * the scrim; the house `useDrawerSnap` engine (provided here, bound in DrawerContent)
 * owns the snap math vaul used to own.
 *
 * `mode` — additive shorthand (AN.W3). `"modal"` (default) keeps the iOS scale-down
 * look: `modal: true` (reka focus-traps + page-occludes). `"live-behind"` is the
 * non-modal peek/half/full bottom sheet — `modal: false` (no focus trap, no page
 * `aria-hidden`, page-behind stays interactive — reka delivers this natively),
 * `shouldScaleBackground: false`, and the direction-derived snap ladder. Every prop
 * the mode sets is still overridable by an explicit prop — `mode` only supplies
 * defaults.
 *
 * The snap props (`snapPoints`/`activeSnapPoint`/`direction`/`shouldScaleBackground`)
 * are HOUSE props now (they were vaul's `DrawerRootProps` surface — preserved by
 * shape so the consumer binding is byte-identical, but resolved by the house engine,
 * not forwarded to reka, which knows only `open`/`defaultOpen`/`modal`).
 */
const props = withDefaults(
  defineProps<{
    /** The controlled open state (`v-model:open`). */
    open?: boolean
    /** Initial open state for the uncontrolled case. */
    defaultOpen?: boolean
    /** reka modality — defaulted by `mode`; an explicit value overrides. */
    modal?: boolean
    /** Presentation mode shorthand. */
    mode?: DrawerMode
    /** The detent ladder (fractions 0..1). When omitted, resolved from `direction` (BB-2). */
    snapPoints?: (number | string)[]
    /** The active detent fraction (`v-model:active-snap-point`). */
    activeSnapPoint?: number | string | null
    /** Drag/slide axis (BB-2 default-ladder source). */
    direction?: DrawerDirection
    /** iOS page scale-down on open (the modal look). Defaulted by `mode`. */
    shouldScaleBackground?: boolean
  }>(),
  {
    mode: 'modal',
    open: undefined,
    defaultOpen: false,
    modal: undefined,
    snapPoints: undefined,
    activeSnapPoint: undefined,
    direction: 'bottom',
    shouldScaleBackground: undefined,
  },
)

const emits = defineEmits<{
  'update:open': [value: boolean]
  'update:activeSnapPoint': [value: number | string | null]
}>()

/**
 * AY.W-ANIM1 (W-ANIM-FIX) — the self-controlled open (the DrawerTrigger silent-no-op
 * fix, preserved through the abrogation — it was never a vaul artefact). When the
 * consumer binds `v-model:open` it mirrors `props.open`; uncontrolled, `localOpen`
 * is the wrapper's own state. reka's `DialogTrigger` toggles via the root's
 * `onOpenChange`; binding `:open`/`@update:open` on `DialogRoot` round-trips both the
 * controlled bind and the uncontrolled trigger.
 */
const isControlled = computed(() => props.open !== undefined)
const localOpen = ref(props.open ?? props.defaultOpen)
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

const resolvedOpen = computed(() => (isControlled.value ? props.open! : localOpen.value))

// `mode` defaults — every value is still overridable by an explicit prop.
const live = computed(() => props.mode === 'live-behind')
const resolvedModal = computed(() => props.modal ?? (live.value ? false : true))

// BB-2 — the direction-aware default snap ladder. A consumer-supplied `snapPoints`
// wins; otherwise the engine resolves it from `direction` (bottom/top →
// [0.12,0.5,1], left/right → a full-slide). The values are kept as numbers (the
// fraction ladder the house engine reads).
const resolvedSnapPoints = computed<readonly number[]>(() => {
  if (props.snapPoints && props.snapPoints.length > 0) {
    return props.snapPoints.map((p) =>
      typeof p === 'number' ? p : Number.parseFloat(p),
    )
  }
  return resolveDefaultSnapPoints(props.direction)
})

// The active-snap-point round-trip (`v-model:active-snap-point`). The house snap
// engine writes the resolved detent back through this ref; a consumer external write
// re-snaps the open sheet (the house engine owns the snap math — no vaul
// controllable-shadowing limitation).
const activeSnapModel = ref<number | string | null>(props.activeSnapPoint ?? null)
watch(
  () => props.activeSnapPoint,
  (v) => {
    if (v !== undefined) activeSnapModel.value = v
  },
)
watch(activeSnapModel, (v) => emits('update:activeSnapPoint', v))

// The local open ref the snap engine binds (the content reads it to seat the scalar).
const openRef = ref(resolvedOpen.value)
watch(resolvedOpen, (v) => (openRef.value = v))
watch(openRef, (v) => {
  // The engine never directly closes the sheet except a dismiss-flick; route it
  // through the same open-control so a bound v-model:open round-trips.
  if (v !== resolvedOpen.value) onUpdateOpen(v)
})

provideDrawerSnapContext({
  open: openRef,
  snapPoints: resolvedSnapPoints,
  direction: toRef(props, 'direction'),
  activeSnapPoint: activeSnapModel,
})
</script>

<template>
  <DialogRoot
    data-slot="drawer"
    :open="resolvedOpen"
    :modal="resolvedModal"
    @update:open="onUpdateOpen"
  >
    <slot />
  </DialogRoot>
</template>
