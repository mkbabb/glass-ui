<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Label, type LabelProps } from 'reka-ui'
import { cn } from '../_shared/class-names'

const props = defineProps<
  LabelProps & {
    class?: HTMLAttributes['class']
    /**
     * AQ.W4 §W4.5 — render a required-field asterisk after the label text.
     * The asterisk is decorative-to-AT (the `required` attribute on the input
     * is the semantic carrier), so it is marked `aria-hidden`. Indicate
     * required fields visually BEFORE interaction (required-field-feedback
     * guide).
     */
    required?: boolean
  }
>()

const delegatedProps = computed(() => {
  const { class: _, required: _r, ...delegated } = props

  return delegated
})
</script>

<template>
  <Label data-slot="label"
    v-bind="delegatedProps"
    :class="
      cn(
        'text-small font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        props.class,
      )
    "
  >
    <slot />
    <span v-if="required" class="text-destructive" aria-hidden="true"> *</span>
  </Label>
</template>
