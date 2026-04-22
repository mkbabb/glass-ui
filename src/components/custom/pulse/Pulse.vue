<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '../../../utils'

type PulseVariant = 'dots' | 'ring'
type PulseSpeed = 'slow' | 'normal' | 'fast'

const props = withDefaults(
  defineProps<{
    variant?: PulseVariant
    count?: number
    speed?: PulseSpeed
    class?: HTMLAttributes['class']
  }>(),
  {
    variant: 'dots',
    count: 3,
    speed: 'normal',
  },
)

const dots = computed(() => Array.from({ length: props.count }, (_, i) => i))

const durationVar = computed(() => ({
  slow: 'var(--duration-slow, 0.45s)',
  normal: 'var(--duration-panel, 0.55s)',
  fast: 'var(--duration-fast, 0.2s)',
}[props.speed]))
</script>

<template>
  <div
    :class="cn(
      'inline-flex items-center',
      variant === 'dots' && 'gap-1',
      props.class,
    )"
    :style="{ '--pulse-duration': durationVar }"
  >
    <template v-if="variant === 'dots'">
      <span
        v-for="i in dots"
        :key="i"
        class="pulse-dot"
        :style="{ '--pulse-index': i }"
      />
    </template>
    <template v-else-if="variant === 'ring'">
      <span class="pulse-ring" />
    </template>
  </div>
</template>

<style scoped>
.pulse-dot {
    display: inline-block;
    width: 0.375rem;
    height: 0.375rem;
    border-radius: 9999px;
    background: currentColor;
    opacity: 0.35;
    animation: pulse-dot-bounce calc(var(--pulse-duration) * 2) ease-in-out infinite;
    animation-delay: calc(var(--pulse-index, 0) * (var(--pulse-duration) * 0.3));
}

@keyframes pulse-dot-bounce {
    0%, 80%, 100% { opacity: 0.35; transform: scale(0.8); }
    40%           { opacity: 1;    transform: scale(1.2); }
}

.pulse-ring {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 9999px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    animation: pulse-ring-spin var(--pulse-duration) linear infinite;
}

@keyframes pulse-ring-spin {
    to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
    .pulse-dot,
    .pulse-ring { animation: none; opacity: 0.6; }
}
</style>
