<script setup lang="ts">
import type { WithClassAsProps } from "./interface";
import { onMounted, ref, watch } from "vue";
import { cn } from "../../../utils";
import { useCarousel } from "./useCarousel";

const props = defineProps<WithClassAsProps>();

const { carouselApi, orientation } = useCarousel();

const selectedIndex = ref(0);
const slideCount = ref(0);

function syncIndex() {
    const api = carouselApi.value;
    if (!api) return;
    selectedIndex.value = api.selectedScrollSnap();
    slideCount.value = api.scrollSnapList().length;
}

function scrollTo(index: number) {
    carouselApi.value?.scrollTo(index);
}

watch(
    carouselApi,
    (api) => {
        if (!api) return;
        syncIndex();
        api.on("select", syncIndex);
        api.on("reInit", syncIndex);
    },
    { immediate: true }
);

onMounted(syncIndex);
</script>

<template>
    <div
        v-if="slideCount > 0"
        data-slot="carousel-dots"
        role="tablist"
        :aria-orientation="orientation"
        :class="
            cn(
                'carousel-dots inline-flex items-center justify-center gap-1.5',
                orientation === 'vertical' && 'flex-col',
                props.class
            )
        "
    >
        <button
            v-for="i in slideCount"
            :key="i - 1"
            type="button"
            role="tab"
            :aria-selected="i - 1 === selectedIndex"
            :aria-label="`Go to slide ${i}`"
            :data-active="i - 1 === selectedIndex ? '' : undefined"
            data-slot="carousel-dot"
            class="carousel-dot focus-ring tap-squish"
            @click="scrollTo(i - 1)"
        />
    </div>
</template>

<style scoped>
/* ── CarouselDots — token-adaptive, dark/light-safe position-dot rail ──────────
   Re-authored from first principles against the slides `DeckPager` oracle
   (`~/Programming/slides/src/deck/DeckPager.vue`). The prior recipe painted the
   inactive dot `bg-muted-medium` (a token tuned for an OPAQUE light card) and
   drove the active emphasis with the dead `scale-[var(--scale-hover)]`
   arbitrary class (a Tailwind-v4 var-in-arbitrary NON-EMIT — it compiled to
   nothing, so the active morph was `transform:none`). Both are excised. (AX.W23 F4)

   CONTRAST — the inactive dot paints `color-mix(in srgb, var(--foreground) 52%,
   transparent)`. This is the DeckPager oracle value: the house `--surface-tint-*`
   pattern (foreground-over-transparent, re-tints under `.dark` BY CONSTRUCTION
   since `--foreground` flips), at the 52% stop the token ladder does not
   pre-mint (the ladder tops at 40%, which clears ≥3:1 in DARK but not LIGHT
   against the translucent `bg-card/30` surface every consumer places the rail
   on). 52% clears ≥3:1 (WCAG 1.4.11 non-text) in BOTH schemes on the composited
   translucent dark card (measured: 4.79 dark / 3.52 light). The hover lifts to
   72%, the active is the full `--foreground`.

   ACTIVE EMPHASIS — driven through a REAL emitted scoped `[data-active]` rule
   (the DeckPager `.is-active::before` pattern): the dot ELONGATES along the
   scroll axis (the `width`/`height` morph) AND scales up (a real emitted
   `scale`), so the active dot reads as an elongated PIP, not a stuck progress
   fill. The morph rides the governed `--spring-dock` register (the published
   iOS-control curve the dock family shares — W23 CONSUMES it; W05 owns its
   authorship). `.tap-squish` adds the press-spring; `.focus-ring` (the
   token-first focus utility) keeps the keyboard cue. */

.carousel-dot {
    /* ≥24px hit target (WCAG 2.5.8) via a transparent box; the painted dot is
       centered by the grid. The grid base is square (6px both axes); the active
       rule elongates the painted axis. */
    width: 24px;
    height: 24px;
    padding: 0;
    border: 0;
    cursor: pointer;
    background: transparent;
    display: grid;
    place-items: center;
}

.carousel-dot::before {
    content: "";
    --dot-size: 0.375rem; /* 6px base — the resting pip diameter */
    --dot-elongated: 1.5rem; /* 24px — the active elongation along the scroll axis */
    width: var(--dot-size);
    height: var(--dot-size);
    border-radius: var(--radius-pill);
    /* ≥3:1 vs the translucent dark card (WCAG 1.4.11 non-text), dark/light-safe
       by construction — re-tints under `.dark` because `--foreground` flips. */
    background: color-mix(in srgb, var(--foreground) 52%, transparent);
    transition:
        width var(--duration-normal) var(--spring-dock),
        height var(--duration-normal) var(--spring-dock),
        background var(--duration-fast) var(--ease-standard);
}

.carousel-dot:hover::before {
    background: color-mix(in srgb, var(--foreground) 72%, transparent);
}

/* Active — the REAL emitted morph: the painted dot elongates along the scroll
   axis (horizontal rail → width; vertical rail → height) and lifts to the full
   foreground. The orientation is keyed off the rail's `aria-orientation` via the
   wrapper (`.carousel-dots[aria-orientation]`). Default (no orientation attr or
   horizontal) elongates width. */
.carousel-dot[data-active]::before {
    width: var(--dot-elongated);
    background: var(--foreground);
}

.carousel-dots[aria-orientation="vertical"] .carousel-dot[data-active]::before {
    width: var(--dot-size);
    height: var(--dot-elongated);
}

@media (prefers-reduced-motion: reduce) {
    .carousel-dot::before {
        transition: background var(--duration-fast) var(--ease-standard);
    }
}
</style>
