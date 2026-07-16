<script setup lang="ts">
import { computed, ref, watch, type HTMLAttributes } from "vue";
import { useScrollTrigger } from "../../composables/motion/scroll/useScrollTrigger";
import { cn } from "../_shared/class-names";

const props = defineProps<{
    /** Requires `.card-scroll-host` on the scrollable ancestor. */
    shrink?: boolean;
    class?: HTMLAttributes["class"];
}>();

const root = ref<HTMLElement | null>(null);
const condensed = ref(false);
const scrollRoot = computed(() =>
    props.shrink
        ? (root.value?.closest<HTMLElement>(".card-scroll-host") ?? null)
        : null,
);

function hasRoomToCondense(host: HTMLElement): boolean {
    const header = root.value;
    if (!header) return false;
    const overflow = host.scrollHeight - host.clientHeight;
    return overflow > header.getBoundingClientRect().height / 2 + 24;
}

function syncInitialState(): void {
    const host = scrollRoot.value;
    condensed.value = !!host && host.scrollTop >= 24 && hasRoomToCondense(host);
}

useScrollTrigger(scrollRoot, {
    trackProgress: false,
    triggers: [
        { at: 24, direction: "down", id: "condense" },
        { at: 12, direction: "up", id: "expand" },
    ],
    onCross(id) {
        const host = scrollRoot.value;
        if (id === "condense") {
            condensed.value = !!host && hasRoomToCondense(host);
        } else {
            condensed.value = false;
        }
    },
});

watch(scrollRoot, syncInitialState, { immediate: true, flush: "post" });
</script>

<template>
    <div
        ref="root"
        data-slot="card-header"
        :data-condensed="condensed || undefined"
        :class="cn('card-header', shrink && 'card-header--shrink', props.class)"
    >
        <slot />
    </div>
</template>
