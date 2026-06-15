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

const props = defineProps<SwitchRootProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<SwitchRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

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
  <SwitchRoot
    data-slot="switch"
    v-bind="forwarded"
    :class="cn(
      'glass-wash glass-specular-track focus-ring peer relative touch-hit-area inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-pill border-2 border-transparent transition-control disabled:cursor-not-allowed disabled:opacity-disabled data-[state=checked]:bg-primary data-[state=unchecked]:bg-(--glass-bg-wash)',
      props.class,
    )"
  >
    <SwitchThumb
      :class="cn('pointer-events-none block h-5 w-5 rounded-pill bg-background ring-0 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0')"
      style="box-shadow: var(--shadow-md), var(--glass-highlight); transition: translate var(--spring-snappy-duration) var(--spring-snappy)"
    />
  </SwitchRoot>
</template>
