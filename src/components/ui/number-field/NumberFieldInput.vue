<script lang="ts">
// Opt out of Vue's default attr fall-through and forward every consumer attr
// explicitly onto the inner reka-ui <input> via `v-bind="$attrs"` (below).
// This lands the accessible-name attrs (aria-label / aria-labelledby) on the
// focusable input (gap 4, AM.W0.2) without dropping the other attrs
// (placeholder / id / listeners) that a cherry-picked forward would discard.
export default { inheritAttrs: false }
</script>

<script setup lang="ts">
import { NumberFieldInput } from 'reka-ui'
import { cn } from '../../../utils'
</script>

<template>
  <NumberFieldInput
    v-bind="$attrs"
    data-slot="input"
    :class="cn('focus-ring flex h-10 w-full rounded-input border border-input bg-background py-2 text-sm text-center placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-disabled')"
  />
</template>
