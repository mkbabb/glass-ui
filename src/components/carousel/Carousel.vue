<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../_shared/class-names";
import { useProvideCarousel } from "./useCarousel";
import type { CarouselEmits, CarouselProps, WithClassAsProps } from "./types";

/* Carousel — thin, and it is supposed to be.
   Every line the predecessor spent reconciling two authorities is gone with the
   second authority: no delta guard, no select/reInit echo watchers, no
   programmatic-scroll feedback fence. The one keyboard handler it carried was
   unreachable on all five mounts it shipped in — the root took `tabindex` only
   when it also took an accessible name, so an unnamed carousel had no way to
   receive the key it was listening for — and the ONE paging contract lives on the
   dot rail now, which is the register that was measured correct. */

const props = withDefaults(defineProps<CarouselProps & WithClassAsProps>(), {
    orientation: "horizontal",
    projection: "none",
    pattern: "group",
});
const emits = defineEmits<CarouselEmits>();

/** v-model:active — the active 0-based member. */
const active = defineModel<number>("active", { default: 0 });

const context = useProvideCarousel(props, emits, active);
const accessibleName = computed(() => props.ariaLabel?.trim() || undefined);

defineExpose({ deck: context.deck });
</script>

<template>
    <div
        data-slot="carousel"
        :data-orientation="orientation"
        :class="cn('relative', props.class)"
        :role="accessibleName ? 'region' : undefined"
        :aria-roledescription="accessibleName ? 'carousel' : undefined"
        :aria-label="accessibleName"
    >
        <slot
            :deck="context.deck"
            :index="context.deck.index.value"
            :can-next="context.deck.canNext.value"
            :can-prev="context.deck.canPrev.value"
            :orientation="orientation"
        />
    </div>
</template>
