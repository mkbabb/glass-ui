<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'reka-ui'
import { ChevronDown } from "@lucide/vue"
import { cn } from '../../../utils'

const props = withDefaults(
  defineProps<SelectTriggerProps & {
    class?: HTMLAttributes['class']
    /** 'default' = glass bg; 'ghost' = transparent, no border/shadow */
    variant?: 'default' | 'ghost'
    /** Height register: 'default' = h-10 (byte-identical), 'sm' = h-9 (compact controls) */
    size?: 'sm' | 'default'
  }>(),
  { variant: 'default', size: 'default' },
)

const delegatedProps = computed(() => {
  const { class: _, variant: __, size: ___, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)

const variantClass = computed(() =>
  props.variant === 'ghost'
    ? 'bg-transparent border-none shadow-none'
    : 'glass-wash',
)

// AX.W51 D18 — the trigger HEIGHT rides the `--control-h-*` comfort cohort (the
// scaled h-9/h-10 register). The font (`text-sm`, in the template `cn()` below) is
// W50's picker-family `--dropdown-text` bound, untouched here.
const sizeClass = computed(() =>
  props.size === 'sm' ? 'h-[var(--control-h-sm)]' : 'h-[var(--control-h-md)]',
)
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    v-bind="forwardedProps"
    :class="cn(
      variantClass,
      sizeClass,
      'tap-squish focus-ring flex w-full items-center justify-between rounded-pill px-3 py-2 text-dropdown placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-disabled [&>span]:line-clamp-1 transition-control aria-invalid:border-[var(--destructive)] aria-invalid:shadow-[0_0_0_var(--focus-ring-width)_color-mix(in_srgb,var(--destructive)_35%,transparent)]',
      props.class,
    )"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="transition-transform duration-200 ease-standard [&[data-state=open]]:rotate-180 h-4 w-4 shrink-0 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
