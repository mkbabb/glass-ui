<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'reka-ui'
import { Check, Minus } from "@lucide/vue"
import { cn } from '../_shared/class-names'

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <CheckboxRoot
    data-slot="checkbox"
    v-bind="forwarded"
    :class="
      cn('group tap-squish focus-ring peer relative touch-hit-area h-4 w-4 shrink-0 rounded-control border border-primary transition-control disabled:cursor-not-allowed disabled:opacity-disabled data-[state=checked]:bg-(--control-checked-bg) data-[state=checked]:text-primary-foreground data-[state=indeterminate]:bg-(--control-checked-bg) data-[state=indeterminate]:text-primary-foreground',
         props.class)"
  >
    <CheckboxIndicator class="flex h-full w-full items-center justify-center text-current">
      <slot>
        <!-- AW.W25 — reka 2.9's CheckboxIndicator force-mounts on
             data-state="indeterminate" too, so the dash must branch off the
             root state attribute or an indeterminate box paints a checkmark.
             group-data targets the CheckboxRoot's data-state. -->
        <Minus class="hidden h-4 w-4 group-data-[state=indeterminate]:block" />
        <Check class="h-4 w-4 group-data-[state=indeterminate]:hidden" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>
