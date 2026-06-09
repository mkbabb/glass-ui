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
  <!-- AW.W25 — the stepper input adopts the `.input-pill` GLASS recipe (the same
       glass-tint substrate + resting-border floor + `:user-invalid`/`[aria-invalid]`
       destructive ring the Input pill carries) at the non-pill `--radius-field` rung
       (`rounded-field`), so it reads as an Input sibling rather than a different design
       system (was solid `bg-background`/`border-input` + `rounded-input` at HEAD). The
       multi-control NumberField box is not a single-line stadium, so it takes the field
       rung, not the `9999px` pill. The `text-center` + flank-padding for the steppers
       overlay the pill base. -->
  <NumberFieldInput
    v-bind="{ ...defaultAttrs, ...$attrs }"
    data-slot="input"
    :class="cn('input-pill h-[var(--control-h-md)] rounded-field px-9 py-2 text-sm text-center')"
  />
</template>
