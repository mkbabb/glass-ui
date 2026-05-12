// @mkbabb/glass-ui/carousel — vueuse-bearing carousel surface (v1.0 subpath)
//
// L.W1 Lane C introduced this subpath to host `useCarousel`. M.W0 Lane V
// (v1.0.4) extends it to mirror MIGRATION.md §1.2's contract — the entire
// `Carousel*` component family lives here because every `Carousel*.vue`
// injects `useCarousel`, which composes `createInjectionState` from
// `@vueuse/core`. Keeping the components on the root barrel would have
// dragged the vueuse SCC into every consumer's tree-shake walk, defeating
// the Phase 2 root-barrel curation that L.W1 closed for the dark/keyboard
// surfaces.
//
// Single canonical home: `src/components/ui/carousel/index.ts` (the package
// barrel). The root barrel does NOT re-export this family.
export {
    Carousel,
    CarouselContent,
    CarouselDots,
    CarouselItem,
    CarouselNext,
    CarouselPager,
    CarouselPrevious,
    GlassCarouselPager,
    useCarousel,
} from "./components/ui/carousel";
export type { CarouselApi } from "./components/ui/carousel";
