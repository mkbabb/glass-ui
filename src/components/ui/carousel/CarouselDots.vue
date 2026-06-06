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
                'inline-flex items-center justify-center gap-1.5',
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
            class="focus-ring rounded-pill cursor-pointer transition-[background-color,transform,width,height,box-shadow] duration-fast"
            :class="
                cn(
                    orientation === 'vertical' ? 'w-1.5' : 'h-1.5',
                    i - 1 === selectedIndex
                        ? orientation === 'vertical'
                            ? 'h-6 bg-foreground scale-[var(--scale-hover)]'
                            : 'w-6 bg-foreground scale-[var(--scale-hover)]'
                        : orientation === 'vertical'
                            ? 'h-1.5 bg-muted-medium hover:bg-foreground/50'
                            : 'w-1.5 bg-muted-medium hover:bg-foreground/50'
                )
            "
            @click="scrollTo(i - 1)"
        />
    </div>
</template>
