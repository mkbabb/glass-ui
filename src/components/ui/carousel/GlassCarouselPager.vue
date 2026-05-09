<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { ChevronLeft, ChevronRight, ChevronUp, ChevronDown } from "lucide-vue-next";
import { computed } from "vue";
import { cn } from "../../../utils";
import { Button } from "../button";

/**
 * GlassCarouselPager — audacious carousel pager substrate.
 *
 * Lifts the hand-rolled chevron-prev + counter-pill + chevron-next + state-toggle
 * row from `containers/glass-carousel.vue:127-157` into a canonical primitive.
 * Composes `<Button variant="outline" size="icon">` chevrons with a glass-card
 * counter pill and an optional toggle slot for collapse/expand affordances.
 *
 * Standalone: accepts `:index` / `:total` props and emits `@prev` / `@next` /
 * `@select(i)`, so it composes equally with `<GlassCarousel>` (manual state) and
 * `<Carousel>` (embla — wire via `useCarousel`).
 */
const props = withDefaults(
    defineProps<{
        /** Current zero-based slide index. */
        index: number;
        /** Total slide count. */
        total: number;
        /** Layout orientation. Defaults to horizontal. */
        orientation?: "horizontal" | "vertical";
        /** Show "X / N" counter pill. Defaults to true. */
        showCounter?: boolean;
        /** Wrap at boundaries instead of disabling. Defaults to false. */
        loop?: boolean;
        class?: HTMLAttributes["class"];
    }>(),
    {
        orientation: "horizontal",
        showCounter: true,
        loop: false,
    }
);

const emit = defineEmits<{
    (e: "prev"): void;
    (e: "next"): void;
    (e: "select", index: number): void;
}>();

const canPrev = computed(() => (props.loop ? props.total > 1 : props.index > 0));
const canNext = computed(() =>
    props.loop ? props.total > 1 : props.index < props.total - 1
);

function onPrev() {
    if (!canPrev.value) return;
    if (props.loop) {
        emit("select", (props.index - 1 + props.total) % props.total);
    } else {
        emit("prev");
        emit("select", Math.max(0, props.index - 1));
    }
}

function onNext() {
    if (!canNext.value) return;
    if (props.loop) {
        emit("select", (props.index + 1) % props.total);
    } else {
        emit("next");
        emit("select", Math.min(props.total - 1, props.index + 1));
    }
}

const PrevIcon = computed(() =>
    props.orientation === "vertical" ? ChevronUp : ChevronLeft
);
const NextIcon = computed(() =>
    props.orientation === "vertical" ? ChevronDown : ChevronRight
);
</script>

<template>
    <div
        data-slot="glass-carousel-pager"
        :class="
            cn(
                'inline-flex items-center gap-2',
                orientation === 'vertical' && 'flex-col',
                /*
                   K.W5 — at 375 viewport the chevron + counter +
                   trailing-slot row overflows when consumers attach
                   trailing affordances (J π audit: chevrons measured
                   at x=1050). Allow the row to wrap at narrow widths
                   so all controls remain reachable without horizontal
                   scroll. The wrap only fires below md (≤ 767px),
                   leaving the canonical desktop row untouched.
                */
                'max-md:flex-wrap max-md:justify-center max-md:gap-2',
                props.class
            )
        "
    >
        <Button
            variant="outline"
            size="icon"
            :disabled="!canPrev"
            :aria-label="
                orientation === 'vertical' ? 'Previous slide (up)' : 'Previous slide'
            "
            data-slot="glass-carousel-pager-prev"
            @click="onPrev"
        >
            <component :is="PrevIcon" class="size-4" />
        </Button>

        <span
            v-if="showCounter && total > 0"
            data-slot="glass-carousel-pager-counter"
            class="rounded-pill border border-border bg-card px-3 py-1 text-mono-caption tabular-nums shadow-cartoon-sm"
        >
            {{ index + 1 }} / {{ total }}
        </span>

        <Button
            variant="outline"
            size="icon"
            :disabled="!canNext"
            :aria-label="
                orientation === 'vertical' ? 'Next slide (down)' : 'Next slide'
            "
            data-slot="glass-carousel-pager-next"
            @click="onNext"
        >
            <component :is="NextIcon" class="size-4" />
        </Button>

        <slot name="trailing" />
    </div>
</template>
