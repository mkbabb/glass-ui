<script setup lang="ts">
import { computed, ref, watch, type HTMLAttributes } from "vue";
import { useScrollTrigger } from "../../composables/motion/scroll/useScrollTrigger";
import { cn } from "../_shared/class-names";

const props = defineProps<{
    /**
     * Requires `.card-scroll-host` on the scrollable ancestor — an element INSIDE
     * the plate, NEVER the plate itself. The host wears `overflow-y` and the
     * trailing feather MASK, and a mask clips the element's whole rendering: put
     * it on the `<Card>` and the plate's own bottom edge dissolves and the cast it
     * casts is clipped away with it. The host is the viewport the header sticks
     * to; the plate stays crisp around it.
     */
    shrink?: boolean;
    class?: HTMLAttributes["class"];
}>();

/* The hysteresis band sits on the space series, like every other distance in the
   card: condense at `--space-family` (20) down, release at `--space-body` (12)
   up. The shipped 24/24/12 put two of the three off the series and left the two
   ends asymmetric for no stated reason. The band is real — a header that
   condensed and released at one threshold flickers across it. */
const CONDENSE_PX = 20;
const RELEASE_PX = 12;

const root = ref<HTMLElement | null>(null);
const condensed = ref(false);
/* Armed by the FIRST real crossing, never at mount: the scale glide is a
   response to a threshold the reader crossed, not an entrance animation. */
const glide = ref(false);
const scrollRoot = computed(() =>
    props.shrink
        ? (root.value?.closest<HTMLElement>(".card-scroll-host") ?? null)
        : null,
);

function hasRoomToCondense(host: HTMLElement): boolean {
    const header = root.value;
    if (!header) return false;
    const overflow = host.scrollHeight - host.clientHeight;
    return overflow > header.getBoundingClientRect().height / 2 + CONDENSE_PX;
}

function syncInitialState(): void {
    const host = scrollRoot.value;
    /* A re-resolved scroll root is a NEW binding, not a crossing. Whatever the
       previous host armed does not travel to this one — a header re-parented
       into a fresh viewport must not play the glide it inherited. */
    glide.value = false;
    condensed.value =
        !!host && host.scrollTop >= CONDENSE_PX && hasRoomToCondense(host);
}

useScrollTrigger(scrollRoot, {
    trackProgress: false,
    triggers: [
        { at: CONDENSE_PX, direction: "down", id: "condense" },
        { at: RELEASE_PX, direction: "up", id: "expand" },
    ],
    onCross(id) {
        const host = scrollRoot.value;
        /* Compute the NEXT state first. The glide is armed by an actual FLIP,
           never by a crossing: a condense crossing on a header with no room to
           condense changes nothing, and a glide that answers no change is an
           animation on a state that never moved. */
        const next = id === "condense" ? !!host && hasRoomToCondense(host) : false;
        if (next === condensed.value) return;
        glide.value = true;
        condensed.value = next;
    },
});

watch(scrollRoot, syncInitialState, { immediate: true, flush: "post" });
</script>

<template>
    <div
        ref="root"
        data-slot="card-header"
        :data-condensed="shrink ? String(condensed) : undefined"
        :data-shrink-glide="glide || undefined"
        :aria-live="shrink ? 'polite' : undefined"
        :class="cn('card-header', shrink && 'card-header--shrink', props.class)"
    >
        <slot />
    </div>
</template>
