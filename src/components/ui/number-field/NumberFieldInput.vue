<script setup lang="ts">
import { type ComputedRef, computed, inject } from 'vue'
import { NumberFieldInput } from 'reka-ui'
import { type NumberFieldInputVariants, numberFieldInputVariants } from '.'
import { cn } from '@utils'

const props = defineProps<{
  variant?: NumberFieldInputVariants['variant']
}>()

const ctx = inject<{ variant: ComputedRef<NumberFieldInputVariants['variant']> } | null>('glassNumberField', null)
const resolvedVariant = computed(() => props.variant ?? ctx?.variant.value)
</script>

<template>
  <NumberFieldInput data-slot="input" :class="cn(numberFieldInputVariants({ variant: resolvedVariant }))" />
</template>
