<script setup lang="ts">
import { NumberFieldInput } from 'reka-ui'
import { cn } from '@utils'
</script>

<template>
  <NumberFieldInput data-slot="input" :class="cn('focus-ring flex h-10 w-full rounded-input border border-input bg-background py-2 text-sm text-center placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50')" />
</template>
