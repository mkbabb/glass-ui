<script setup lang="ts">
import type { CarouselEmits, CarouselProps, WithClassAsProps } from './interface'
import type { UnwrapRefCarouselApi } from './interface'
import { watch } from 'vue'
import { cn } from '../../_shared/class-names'
import { useProvideCarousel } from './useCarousel'

const props = withDefaults(defineProps<CarouselProps & WithClassAsProps>(), {
  orientation: 'horizontal',
})

const emits = defineEmits<CarouselEmits>()

// BI.W-CAROUSEL-REBUILD — embla is the ONE authority. `v-model:active` reflects the
// selected snap; the consumer binds it (or leaves it emit-free). NO shadow active ref —
// `selectedScrollSnap()` is the source of truth, guarded by the `previousScrollSnap`
// delta so a rapid click + Next-hammer never double-writes (G7): on `select` the model is
// written ONLY when the snap actually moved (prev !== to AND to !== the model), and an
// external model write scrolls embla ONLY when it is not already there. No feedback loop.
const active = defineModel<number>('active', { default: 0 })

const { canScrollNext, canScrollPrev, carouselApi, carouselRef, orientation, scrollNext, scrollPrev } = useProvideCarousel(props, emits)

function syncActive(api: NonNullable<UnwrapRefCarouselApi>) {
  const to = api.selectedScrollSnap()
  const prev = api.previousScrollSnap()
  // the delta guard: reflect ONLY a real snap move (prev !== to) that the model has not
  // already caught (to !== active) — a settle/reInit echo or an externally-driven scroll
  // never re-writes, so a rapid click + Next-hammer produces no double-write / dropped morph.
  if (prev !== to && to !== active.value) active.value = to
}

watch(
  carouselApi,
  (api) => {
    if (!api) return
    // seat the model on the initial snap without churning embla
    if (api.selectedScrollSnap() !== active.value) active.value = api.selectedScrollSnap()
    api.on('select', syncActive)
    api.on('reInit', syncActive)
  },
  { immediate: true },
)

// an external model write drives embla — only when integer + not already there (a
// fractional value, e.g. a drag-scrub feed, never triggers a programmatic scroll).
watch(active, (i) => {
  const api = carouselApi.value
  if (!api || !Number.isInteger(i)) return
  if (api.selectedScrollSnap() !== i) api.scrollTo(i)
})

defineExpose({
  canScrollNext,
  canScrollPrev,
  carouselApi,
  carouselRef,
  orientation,
  scrollNext,
  scrollPrev,
})

function onKeyDown(event: KeyboardEvent) {
  const prevKey = props.orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = props.orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'

  if (event.key === prevKey) {
    event.preventDefault()
    scrollPrev()

    return
  }

  if (event.key === nextKey) {
    event.preventDefault()
    scrollNext()
  }
}
</script>

<template>
  <div
    data-slot="carousel"
    :class="cn('relative', props.class)"
    role="region"
    aria-roledescription="carousel"
    tabindex="0"
    @keydown="onKeyDown"
  >
    <slot :can-scroll-next :can-scroll-prev :carousel-api :carousel-ref :orientation :scroll-next :scroll-prev />
  </div>
</template>
