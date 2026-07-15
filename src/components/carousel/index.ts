export { default as Carousel } from './Carousel.vue'
export { default as CarouselContent } from './CarouselContent.vue'
// BA.W-PAGER — CarouselDots RETIRED onto <PagerDots> (@mkbabb/glass-ui/pager-dots);
// clean break, no alias (the dots are the shared carousel ≡ deck register now).
export { default as CarouselItem } from './CarouselItem.vue'
export { default as CarouselNext } from './CarouselNext.vue'
export { default as CarouselPager } from './CarouselPager.vue'
export { default as CarouselPrevious } from './CarouselPrevious.vue'
export type {
  UnwrapRefCarouselApi as CarouselApi,
} from './interface'

export { useCarousel } from './useCarousel'
