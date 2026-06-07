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
  <SwitchRoot
    data-slot="switch"
    v-bind="forwarded"
    :class="cn(
      'focus-ring peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-pill border-2 border-transparent transition-control disabled:cursor-not-allowed disabled:opacity-disabled data-[state=checked]:bg-primary data-[state=unchecked]:bg-[color-mix(in_srgb,var(--input)_80%,var(--glass-bg-quiet))]',
      props.class,
    )"
  >
    <SwitchThumb
      :class="cn('pointer-events-none block h-5 w-5 rounded-pill bg-background ring-0 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0')"
      style="box-shadow: var(--shadow-md), var(--glass-highlight); transition: translate var(--duration-normal) var(--spring-snappy)"
    />
  </SwitchRoot>
</template>
