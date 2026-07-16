# BI.W-P119 — Carousel

**Status:** DONE

## Shipped contract

`Carousel` is a thin accessible shell around Embla, which remains the sole slide and snap authority.

- An unnamed carousel stays out of the landmark list; `aria-label` opts it into a named `region` with `aria-roledescription="carousel"`.
- `CarouselPager` is the single previous/next/counter command composition.
- `PagerDots` supplies optional direct position navigation against the same active slide.
- The zero-witness `CarouselNext` and `CarouselPrevious` components and exports are deleted; no compatibility aliases remain.
- Loop, plugins, autoplay, hover/focus pause, and other policy remain caller-owned Embla configuration rather than a second Carousel state engine.
- Keyboard commands route through the same Embla previous/next methods as the pager.

## Evidence

`tests/components/carousel.contract.test.ts` covers unnamed and named landmark behavior, the public command surface, and `CarouselPager` command anatomy. The existing navigation story remains the visual consumer of `CarouselPager` plus `PagerDots`.
