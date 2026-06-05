<script lang="ts">
// Opt out of Vue's default attr fall-through and forward every consumer attr
// explicitly onto the inner reka-ui <input> via `v-bind="$attrs"` (below).
// This lands the accessible-name attrs (aria-label / aria-labelledby) on the
// focusable input (gap 4, AM.W0.2) without dropping the other attrs
// (placeholder / id / listeners) that a cherry-picked forward would discard.
//
// AQ.W4 §W4.2 — `inputmode="decimal"` is supplied as the DEFAULT (before
// `v-bind="$attrs"` so a consumer override wins). reka-ui NumberField supports
// fractional/negative values, so `decimal` surfaces the decimal point on
// mobile keyboards; an integer-only consumer passes `inputmode="numeric"`.
export default { inheritAttrs: false }
</script>

<script setup lang="ts">
import { NumberFieldInput } from 'reka-ui'
import { cn } from '../../../utils'

// `inputmode` is an <input>-specific attribute reka's NumberFieldInput does not
// type; supply it as a default through a spread (a consumer `$attrs` override
// still wins) rather than binding it as a static named attr.
const defaultAttrs = { inputmode: 'decimal' as const }
</script>

<template>
  <NumberFieldInput
    v-bind="{ ...defaultAttrs, ...$attrs }"
    data-slot="input"
    :class="cn('focus-ring flex h-10 w-full rounded-input border border-input bg-background py-2 text-sm text-center placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-disabled')"
  />
</template>
