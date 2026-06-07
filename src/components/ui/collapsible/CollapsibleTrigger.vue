<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { CollapsibleTrigger, type CollapsibleTriggerProps } from 'reka-ui'
import { cn } from '../../../utils'

const props = defineProps<CollapsibleTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <!-- AW.W25 — the CollapsibleTrigger carried NO focus paint at HEAD (UA outline
       only). It now composes the canonical `.focus-ring` + the iOS press-spring
       (`.tap-squish`) + `transition-control` so it speaks the four-state contract
       like every other interactive atom. The trigger is content-shaped, so the
       focus/press recipes ride a `rounded-control` corner. -->
  <CollapsibleTrigger
    data-slot="collapsible-trigger"
    v-bind="delegatedProps"
    :class="cn(
      'tap-squish focus-ring rounded-control transition-control disabled:pointer-events-none disabled:opacity-disabled',
      props.class,
    )"
  >
    <slot />
  </CollapsibleTrigger>
</template>
