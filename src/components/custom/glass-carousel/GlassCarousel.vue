<script setup lang="ts">
import { computed, ref, useTemplateRef, watch, type HTMLAttributes } from "vue";
import { ScrollAreaRoot, ScrollAreaViewport } from "reka-ui";
import { useGlassCarousel } from "./useGlassCarousel";
import { cn } from "../../../utils";

const props = withDefaults(
    defineProps<{
        /** Scroll axis */
        orientation?: "horizontal" | "vertical";
        /** Expanded = items spread to fill space; collapsed = compact pill */
        expanded?: boolean;
        /** Enable scroll-snap */
        snap?: boolean | "mandatory" | "proximity";
        /** Show overflow fade indicators */
        fadeOverflow?: boolean;
        class?: HTMLAttributes["class"];
    }>(),
    {
        orientation: "vertical",
        expanded: true,
        snap: false,
        fadeOverflow: true,
    },
);

const rootEl = useTemplateRef<HTMLElement>("rootEl");
const viewportEl = ref<HTMLElement | null>(null);
const orientationRef = computed(() => props.orientation);
const expandedRef = computed(() => props.expanded);

const {
    canScrollStart,
    canScrollEnd,
    getOverflowFadeClass,
    updateOverflow,
    scrollToItem,
    visualExpanded,
    isTransitioning,
    transitionSize,
    suppressTransition,
    onTransitionEnd,
} = useGlassCarousel({
    orientation: orientationRef,
    expanded: expandedRef,
    rootEl,
    viewportEl,
});

// Grab the viewport element from reka-ui's ScrollAreaViewport after mount
const scrollAreaViewportRef = useTemplateRef<InstanceType<typeof ScrollAreaViewport>>("scrollViewport");
watch(scrollAreaViewportRef, (comp) => {
    viewportEl.value = comp?.$el ?? null;
    updateOverflow();
}, { immediate: true });

const snapClass = computed(() => {
    if (!props.snap) return "";
    const type = props.snap === true ? "proximity" : props.snap;
    const axis = props.orientation === "vertical" ? "y" : "x";
    return `[scroll-snap-type:${axis}_${type}]`;
});

const rootStyle = computed(() => {
    if (transitionSize.value == null) return undefined;
    return props.orientation === "vertical"
        ? { height: transitionSize.value }
        : { width: transitionSize.value };
});

defineExpose({
    canScrollStart,
    canScrollEnd,
    scrollToItem,
    isTransitioning,
    visualExpanded,
});
</script>

<template>
    <div
        ref="rootEl"
        :class="
            cn(
                'glass-carousel',
                {
                    'glass-carousel--vertical': orientation === 'vertical',
                    'glass-carousel--horizontal': orientation === 'horizontal',
                    'glass-carousel--expanded': visualExpanded,
                    'glass-carousel--collapsed': !visualExpanded,
                    'glass-carousel--animating': isTransitioning,
                    'glass-carousel--no-transition': suppressTransition,
                },
                props.class,
            )
        "
        :style="rootStyle"
        @transitionend="onTransitionEnd"
    >
        <ScrollAreaRoot class="glass-carousel__scroll-root">
            <ScrollAreaViewport
                ref="scrollViewport"
                :class="[
                    'glass-carousel__viewport',
                    snapClass,
                    fadeOverflow ? getOverflowFadeClass() : '',
                ]"
            >
                <div
                    :class="[
                        'glass-carousel__content',
                        {
                            'glass-carousel__content--vertical': orientation === 'vertical',
                            'glass-carousel__content--horizontal': orientation === 'horizontal',
                        },
                    ]"
                >
                    <slot />
                </div>
            </ScrollAreaViewport>
        </ScrollAreaRoot>
    </div>
</template>

<style scoped>
/* ── Base: pill-shaped glass container, matching GlassDock visual language ── */
.glass-carousel {
    display: inline-flex;
    align-items: center;
    border-radius: var(--radius-dock);
    overflow: hidden;
    padding: 0.375rem;
    background: transparent;
    border: 1px solid var(--glass-border-subtle);
    transition:
        height var(--duration-normal) var(--spring-snappy),
        width var(--duration-normal) var(--spring-snappy),
        padding var(--duration-normal) var(--spring-snappy),
        gap var(--duration-normal) var(--spring-snappy),
        border-radius var(--duration-normal) var(--spring-snappy),
        box-shadow var(--duration-normal) var(--ease-standard),
        background var(--duration-normal) var(--ease-standard),
        border-color var(--duration-normal) var(--ease-standard),
        transform var(--duration-normal) var(--spring-snappy);
}

.glass-carousel:hover {
    box-shadow: var(--glass-shadow-subtle);
}

.glass-carousel--no-transition {
    transition: none !important;
}

.glass-carousel--animating {
    overflow: hidden !important;
}

/* ── Scroll root fills the carousel ── */
.glass-carousel__scroll-root {
    position: relative;
    overflow: hidden;
    flex: 1;
    min-width: 0;
    min-height: 0;
}

.glass-carousel__viewport {
    height: 100%;
    width: 100%;
    --mask-fade-width: 1.5rem;
}

/* ── Content layout ── */
.glass-carousel__content {
    display: flex;
    align-items: stretch;
    gap: 0.25rem;
}

.glass-carousel__content--vertical {
    flex-direction: column;
}

.glass-carousel__content--horizontal {
    flex-direction: row;
}

/* ── Expanded: items spread, each takes equal space ── */
.glass-carousel--expanded .glass-carousel__content {
    height: 100%;
}

.glass-carousel--expanded .glass-carousel__content--vertical {
    justify-content: stretch;
}

.glass-carousel--expanded .glass-carousel__content--vertical > :deep(.glass-carousel-item) {
    flex: 1;
}

.glass-carousel--expanded .glass-carousel__content--horizontal > :deep(.glass-carousel-item) {
    flex: 1;
}

/* ── Collapsed: items compact, centered ── */
.glass-carousel--collapsed .glass-carousel__content {
    justify-content: center;
    gap: 0.125rem;
}

.glass-carousel--collapsed .glass-carousel__content--vertical > :deep(.glass-carousel-item) {
    flex: 0 0 auto;
}

.glass-carousel--collapsed .glass-carousel__content--horizontal > :deep(.glass-carousel-item) {
    flex: 0 0 auto;
}

/* ── Fade during transition (content fades out/in) ── */
.glass-carousel--animating .glass-carousel__content {
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--duration-instant) var(--ease-standard);
}

.glass-carousel:not(.glass-carousel--animating) .glass-carousel__content {
    opacity: 1;
    transition: opacity var(--duration-instant) var(--ease-standard);
}
</style>
