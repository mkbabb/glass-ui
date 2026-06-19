<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  SwitchRoot,
  type SwitchRootEmits,
  type SwitchRootProps,
  SwitchThumb,
  useForwardPropsEmits,
} from 'reka-ui'
import { cn } from '../../../utils'
import { type ControlSize, switchSizeClass } from '../_shared/useControlSize'

const props = defineProps<SwitchRootProps & {
  class?: HTMLAttributes['class']
  // BC.W-CONTROL-CUSTOM — the shared control-size axis. The Switch geometry is
  // control-height-DERIVED: the prop re-points `--switch-track-h` off the chosen
  // `--control-h-*` rung and the rest of the `--switch-*` quad follows.
  size?: ControlSize
}>()

const emits = defineEmits<SwitchRootEmits>()

const delegatedProps = computed(() => {
  // `size` is a wrapper-only prop — keep it (with `class`) off the forwarded
  // reka SwitchRoot props.
  const { class: _, size: _size, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <!-- AY.W-PRIM-POLISH D7 ARM A — the Switch TRACK is the one checks-atom large
       enough (24×44px) to read GLASS: it composes the `.glass-wash` tier + the
       `.glass-specular-track` top-edge gleam so the unchecked register is a
       translucent wash plate (the glass-first canon, AX.W54), not an opaque
       `--input` mix. The checked ON-state stays `--primary` (the warm-ink
       signature, UNCHANGED). Checkbox/Radio (16px) take ARM B (allowlist) —
       below the size where glass reads as glass over a flat substrate. -->
  <!-- BC.W-CONTROL-CUSTOM — the `--switch-*` geometry quad. The anchor
       `--switch-track-h` defaults to `--control-h-md × 0.6` (resolving the HEAD
       `h-6` = 1.5rem); `switchSizeClass(size)` re-points it per rung. The thumb,
       track-width + throw DERIVE from the anchor (no magic literals): the thumb is
       the track-h minus the 2px×2 border, the track-w the iOS 11/6 aspect, the
       throw the track-w minus thumb minus border — so `default` resolves the HEAD
       `w-11` / `h-5 w-5` / `translate-x-5` EXACTLY (byte-identical) and `sm`/`lg`
       scale the whole geometry in lockstep. The quad inherits to the thumb via the
       custom-property cascade. -->
  <SwitchRoot
    data-slot="switch"
    v-bind="forwarded"
    :class="cn(
      '[--switch-track-h:calc(var(--control-h-md)*0.6)] [--switch-thumb:calc(var(--switch-track-h)-0.25rem)] [--switch-track-w:calc(var(--switch-track-h)*11/6)] [--switch-throw:calc(var(--switch-track-w)-var(--switch-thumb)-0.25rem)]',
      'glass-wash glass-specular-track focus-ring peer relative touch-hit-area inline-flex h-(--switch-track-h) w-(--switch-track-w) shrink-0 cursor-pointer items-center rounded-pill border-2 border-transparent transition-control disabled:cursor-not-allowed disabled:opacity-disabled data-[state=checked]:bg-primary data-[state=unchecked]:bg-(--glass-bg-wash)',
      switchSizeClass(props.size),
      props.class,
    )"
  >
    <!-- BC.W-CONTROL-SMOOTH (DESHADCN census, reskin-target) — the thumb is a CONTROL
         AFFORDANCE, so it reads the warm-cream MATERIAL (`bg-card`), NOT the flat
         `bg-background` page-token slab. A switch thumb is the moving control surface; it
         belongs to the glass/paper register the rest of the family paints, never the
         neutral page token. The `--shadow-md` + `--glass-highlight` lift + the spring-on-
         `translate` thumb-throw (the sanctioned spring-on-transform exception, C4) are
         UNTOUCHED. This retires the `bg-background` residual (proof:no-shadcn-default) +
         re-earns proof:ba-gestalt; reka behaviour is paint-only-touched. `ring-0` stays
         (the OFF state — not a shadcn focus halo, the family zeroes an inherited ring). -->
    <SwitchThumb
      :class="cn('pointer-events-none block size-(--switch-thumb) rounded-pill bg-card ring-0 data-[state=checked]:translate-x-(--switch-throw) data-[state=unchecked]:translate-x-0')"
      style="box-shadow: var(--shadow-md), var(--glass-highlight); transition: translate var(--spring-snappy-duration) var(--spring-snappy)"
    />
  </SwitchRoot>
</template>
