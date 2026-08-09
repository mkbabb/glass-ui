export { default as Carousel } from "./Carousel.vue";
export { default as CarouselContent } from "./CarouselContent.vue";
export { default as CarouselItem } from "./CarouselItem.vue";
export { default as CarouselPager } from "./CarouselPager.vue";

export { useCarousel, useProvideCarousel } from "./useCarousel";

// The member projection's three laws, pure and testable: the distance function
// (lifted intact — it was the one piece of the old engine shaped like a law), the
// travel-clock scale, and the bounded velocity lag the interior content rides.
export {
    memberDistance,
    memberScale,
    memberLag,
    MEMBER_SCALE_DROP,
    MEMBER_LAG_TAU_S,
    MEMBER_LAG_CEIL,
} from "./projection";

export type {
    CarouselContext,
    CarouselEmits,
    CarouselProjection,
    CarouselProps,
} from "./types";
