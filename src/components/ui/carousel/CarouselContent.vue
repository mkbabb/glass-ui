<script setup lang="ts">
// BI.W-CAROUSEL-REBUILD — the carousel track host: a clean embla viewport + track.
//
// THE CATEGORY ERROR RETIRED (D-PAGER PASS-1 §0 Defect 2). The prior build painted a
// content BARBELL over the slides — a 265px goo body flying 559px OUTSIDE the 414px card
// and sweeping the description text every advance (a whole-layer filtered goo cast).
// Unanimous verdict across families: RETIRE wholesale. The content-barbell composable +
// its goo tokens are now DEFINITION-ABSENT (BI.W-PAGER-RETIRES, terminal — clean break, no
// alias, no dormant stub). A metaball-merge is the INDICATOR's job (the pager worm,
// PagerDots) — the CONTENT is crisp weighty embla scroll, with ZERO filter (the 559px-escape
// class is structurally unreproducible: there is no filtered layer left to escape).
//
// WHAT SHIPS. A clean viewport + track. Programmatic/dot scrolls carry inertia from the
// weighty embla `duration` (the drag already has momentum) — the calm-overdamped
// content-snap law (momentum yes, bounce no). An OPTIONAL compositor-only arrival
// (`:arrival`) scales each slide 0.965→1 + fades it off its distance-from-centre, CLIPPED
// inside the `overflow-hidden` viewport — transform + opacity ONLY, never a filter, never a
// layout property (motion-canon P5). The pager worm (PagerDots) is the ONE metaball morph;
// the drag-scrub that drives it lives in the consumer beside the pager.
import type { WithClassAsProps } from "./interface";
import { onBeforeUnmount, ref, watch } from "vue";
import { cn } from "../../_shared/class-names";
import { useCarousel } from "./useCarousel";
import type { UnwrapRefCarouselApi } from "./interface";

defineOptions({
    inheritAttrs: false,
});

const props = withDefaults(
    defineProps<
        {
            /**
             * Opt-in compositor-only arrival: each slide scales 0.965→1 + fades off its
             * distance from the viewport centre as it scrolls (transform + opacity ONLY,
             * clipped inside the viewport — no filter, no layout property). Default off.
             */
            arrival?: boolean;
        } & WithClassAsProps
    >(),
    { arrival: false },
);

const { carouselRef, carouselApi, orientation } = useCarousel();

const trackEl = ref<HTMLElement | null>(null);

// ── The OPTIONAL compositor arrival (scale + opacity off scrollProgress) ──────────
// Standard embla scale-on-scroll: each slide's distance from the nearest snap drives a
// sub-perceptual scale (1 at centre → 0.965 one slide away) + fade. Written straight onto
// the slide node's `transform`/`opacity` (compositor-only) — embla transforms the TRACK,
// so a per-slide transform never collides. PRM → the slides rest at scale 1 (no arrival).
const ARRIVAL_SCALE_DROP = 0.035; // 1 → 0.965 at one slide away
const ARRIVAL_FADE_DROP = 0.3; // 1 → 0.7 at one slide away
const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function applyArrival(): void {
    const api = carouselApi.value;
    if (!api) return;
    const nodes = api.slideNodes();
    if (!props.arrival || prefersReducedMotion) {
        for (const node of nodes) {
            node.style.transform = "";
            node.style.opacity = "";
        }
        return;
    }
    const progress = api.scrollProgress();
    const snaps = api.scrollSnapList();
    nodes.forEach((node, i) => {
        const snap = snaps[i] ?? progress;
        const t = Math.min(Math.abs(snap - progress) * (snaps.length - 1 || 1), 1);
        node.style.transform = `scale(${(1 - ARRIVAL_SCALE_DROP * t).toFixed(4)})`;
        node.style.opacity = (1 - ARRIVAL_FADE_DROP * t).toFixed(4);
    });
}

let bound: UnwrapRefCarouselApi | null = null;
function bindArrival(api: UnwrapRefCarouselApi | null | undefined): void {
    if (!api || bound === api) return;
    bound = api;
    api.on("scroll", applyArrival);
    api.on("reInit", applyArrival);
    api.on("init", applyArrival);
    applyArrival();
}
watch(carouselApi, (api) => bindArrival(api), { immediate: true });
watch(
    () => props.arrival,
    () => applyArrival(),
);
onBeforeUnmount(() => {
    const api = bound;
    if (!api) return;
    api.off("scroll", applyArrival);
    api.off("reInit", applyArrival);
    api.off("init", applyArrival);
    bound = null;
});
</script>

<template>
    <!-- THE EMBLA VIEWPORT — `carouselRef`; its ONLY child is the scroll track (embla treats
         the first child as its scroll container). `overflow-hidden` CLIPS the arrival scale
         inside the card — nothing paints outside the viewport box. -->
    <div
        ref="carouselRef"
        data-slot="carousel-content"
        class="carousel-viewport overflow-hidden"
    >
        <!-- THE CRISP CONTENT — the embla track. No filter, ever. -->
        <div
            ref="trackEl"
            :class="
                cn(
                    'carousel-track flex',
                    orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
                    props.class
                )
            "
            v-bind="$attrs"
        >
            <slot />
        </div>
    </div>
</template>

<style scoped>
.carousel-viewport {
    position: relative;
}
.carousel-track {
    position: relative;
}
</style>
