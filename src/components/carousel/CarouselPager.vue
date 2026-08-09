<script setup lang="ts">
import { computed } from "vue";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "@lucide/vue";
import { cn } from "../_shared/class-names";
import { Button } from "../button";
import { useCarousel } from "./useCarousel";
import type { WithClassAsProps } from "./types";

/* CarouselPager — chevrons and a counter, over the ONE authority.
   It held a third mirror of the index and the count, kept in step by a pair of
   engine listeners plus a mount call, and the counter announced NOTHING: a bare
   span with no role, so the one live region on the route stayed empty while the
   number changed under it. The mirror is gone (the core is injected) and the
   counter is a `role="status"` reading the same source everything else reads. */

const props = withDefaults(
    defineProps<
        {
            /** Show the "X / N" counter between the chevrons. Default true. */
            showCounter?: boolean;
        } & WithClassAsProps
    >(),
    { showCounter: true },
);

const { deck, orientation } = useCarousel();

const PrevIcon = computed(() =>
    orientation === "vertical" ? ChevronUp : ChevronLeft,
);
const NextIcon = computed(() =>
    orientation === "vertical" ? ChevronDown : ChevronRight,
);
</script>

<template>
    <div
        data-slot="carousel-pager"
        :class="
            cn(
                'inline-flex items-center gap-2',
                orientation === 'vertical' && 'flex-col',
                props.class,
            )
        "
    >
        <Button
            emphasis="quiet"
            iconOnly
            :disabled="!deck.canPrev.value"
            :aria-label="
                orientation === 'vertical' ? 'Previous slide (up)' : 'Previous slide'
            "
            data-slot="carousel-pager-prev"
            @click="deck.prev()"
        >
            <component :is="PrevIcon" class="size-4" aria-hidden="true" />
        </Button>

        <!-- The counter announces. It shares the rail's glass pill chassis and adds
             only the mono caption + tabular figures. -->
        <span
            v-if="showCounter && deck.total.value > 0"
            data-slot="carousel-pager-counter"
            role="status"
            aria-live="polite"
            class="glass-pager-ring text-mono-caption tabular-nums"
        >
            {{ deck.index.value + 1 }} / {{ deck.total.value }}
        </span>

        <Button
            emphasis="quiet"
            iconOnly
            :disabled="!deck.canNext.value"
            :aria-label="
                orientation === 'vertical' ? 'Next slide (down)' : 'Next slide'
            "
            data-slot="carousel-pager-next"
            @click="deck.next()"
        >
            <component :is="NextIcon" class="size-4" aria-hidden="true" />
        </Button>
    </div>
</template>
