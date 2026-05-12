// @mkbabb/glass-ui/carousel — vueuse-bearing carousel composable (v1.0 subpath)
//
// L.W1 Lane C — new public subpath for `useCarousel` (the embla-carousel-vue
// + `createInjectionState`-based composable that powers `<Carousel>` and the
// `Carousel*` family). The composable was previously reachable only via the
// root barrel (`@mkbabb/glass-ui` re-exports it through the `ui/carousel/`
// package), which drags `@vueuse/core` into the consumer's tree-shake walk —
// the same SCC trap Phase 2 closes for `useGlobalDark` / `registerShortcut`.
//
// Lane A removes `useCarousel` from the root-barrel re-export chain; consumers
// reach it here. The component package `<Carousel>` + subcomponents remain on
// the root barrel (they re-export `useCarousel` internally only for their own
// `provide`/`inject` wiring, not as a public surface).
//
// Implementation home: `src/components/ui/carousel/useCarousel.ts`.
export { useCarousel } from "./components/ui/carousel/useCarousel";
export type { CarouselApi } from "./components/ui/carousel";
