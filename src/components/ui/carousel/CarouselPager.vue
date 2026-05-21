<script setup lang="ts">
import type { WithClassAsProps } from "./interface";
import { computed, onMounted, ref, watch } from "vue";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "@lucide/vue";
import { cn } from "../../../utils";
import { Button } from "../button";
import { useCarousel } from "./useCarousel";

const props = withDefaults(
    defineProps<{
        /** Show "X / N" counter between chevrons. Defaults to true. */
        showCounter?: boolean;
    } & WithClassAsProps>(),
    {
        showCounter: true,
    }
);

const { carouselApi, canScrollNext, canScrollPrev, orientation, scrollNext, scrollPrev } =
    useCarousel();

const selectedIndex = ref(0);
const slideCount = ref(0);

function syncIndex() {
    const api = carouselApi.value;
    if (!api) return;
    selectedIndex.value = api.selectedScrollSnap();
    slideCount.value = api.scrollSnapList().length;
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

const PrevIcon = computed(() =>
    orientation === "vertical" ? ChevronUp : ChevronLeft
);
const NextIcon = computed(() =>
    orientation === "vertical" ? ChevronDown : ChevronRight
);
</script>

<template>
    <div
        data-slot="carousel-pager"
        :class="
            cn(
                'inline-flex items-center gap-2',
                orientation === 'vertical' && 'flex-col',
                props.class
            )
        "
    >
        <Button
            variant="ghost"
            size="icon"
            :disabled="!canScrollPrev"
            :aria-label="orientation === 'vertical' ? 'Previous slide (up)' : 'Previous slide'"
            data-slot="carousel-pager-prev"
            @click="scrollPrev"
        >
            <component :is="PrevIcon" class="size-4" />
        </Button>

        <span
            v-if="showCounter && slideCount > 0"
            data-slot="carousel-pager-counter"
            class="rounded-pill border border-border bg-card px-3 py-1 text-mono-caption tabular-nums"
        >
            {{ selectedIndex + 1 }} / {{ slideCount }}
        </span>

        <Button
            variant="ghost"
            size="icon"
            :disabled="!canScrollNext"
            :aria-label="orientation === 'vertical' ? 'Next slide (down)' : 'Next slide'"
            data-slot="carousel-pager-next"
            @click="scrollNext"
        >
            <component :is="NextIcon" class="size-4" />
        </Button>
    </div>
</template>
