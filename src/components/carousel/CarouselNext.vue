<script setup lang="ts">
import type { WithClassAsProps } from './interface'
import { ArrowRight } from "@lucide/vue"
import { cn } from '../_shared/class-names'
import { Button, type ButtonVariants } from '../button'
import { useCarousel } from './useCarousel'

const props = withDefaults(defineProps<{
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}
& WithClassAsProps>(), {
  variant: 'outline',
})

const { orientation, canScrollNext, scrollNext } = useCarousel()
</script>

<template>
  <Button
    data-slot="carousel-next"
    :disabled="!canScrollNext"
    :class="cn(
      'absolute h-(--carousel-nav-size) w-(--carousel-nav-size) rounded-pill',
      orientation === 'horizontal'
        ? 'top-1/2 -translate-y-1/2 right-[calc(-1*var(--carousel-nav-offset))]'
        : 'left-1/2 -translate-x-1/2 rotate-90 bottom-[calc(-1*var(--carousel-nav-offset))]',
      props.class,
    )"
    :variant="variant"
    :size="size"
    icon-only
    @click="scrollNext"
  >
    <slot>
      <ArrowRight />
      <span class="sr-only">Next Slide</span>
    </slot>
  </Button>
</template>
