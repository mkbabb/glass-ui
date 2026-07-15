<script setup lang="ts">
import type { WithClassAsProps } from './interface'
import { ArrowLeft } from "@lucide/vue"
import { cn } from '../../_shared/class-names'
import { Button, type ButtonVariants } from '../button'
import { useCarousel } from './useCarousel'

const props = withDefaults(defineProps<{
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}
& WithClassAsProps>(), {
  variant: 'outline',
})

const { orientation, canScrollPrev, scrollPrev } = useCarousel()
</script>

<template>
  <Button
    data-slot="carousel-previous"
    :disabled="!canScrollPrev"
    :class="cn(
      'absolute h-(--carousel-nav-size) w-(--carousel-nav-size) rounded-pill',
      orientation === 'horizontal'
        ? 'top-1/2 -translate-y-1/2 left-[calc(-1*var(--carousel-nav-offset))]'
        : 'left-1/2 -translate-x-1/2 rotate-90 top-[calc(-1*var(--carousel-nav-offset))]',
      props.class,
    )"
    :variant="variant"
    :size="size"
    icon-only
    @click="scrollPrev"
  >
    <slot>
      <ArrowLeft />
      <span class="sr-only">Previous Slide</span>
    </slot>
  </Button>
</template>
