<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from "vue";
import { cn } from "../_shared/class-names";
import { useReducedMotion } from "../../composables/motion/core/useReducedMotion";
import { useCarousel } from "./useCarousel";
import { memberDistance, memberLag, memberScale } from "./projection";
import type { WithClassAsProps } from "./types";

/* CarouselContent — the strip, on the platform's own scroll-snap.
   There is no track transform here and no engine holding one: the members ARE the
   scroll content, `scroll-snap-type: … mandatory` is the snap, and the inertia is
   the platform's. `scroll-snap-stop: always` is what keeps a fast flick from
   skipping three members — a tween engine has to re-implement that, and does not.

   ONE ELEMENT, not two. The engine required a viewport whose ONLY child was a
   track it could transform; nothing transforms a track any more, so the strip
   scrolls and lays out the members itself and the wrapper is gone.

   THE PROJECTION IS WRITTEN ON TWO CLOCKS (LAW 1). The SCALE is written here, per
   scroll frame, off the continuous position the travel arm feeds — the inertial
   clock. The OPACITY is a CSS transition on `[data-state]` in the stylesheet — a
   fired clock, on a governed spring. They cannot be collapsed into one `t` by a
   later edit, because they are not in the same language.

   THE INTERIOR LAG (LAW 3) is written on the member's CONTENT node, off the travel
   velocity, on the same bounded velocity-lag law the pager worm's trail edge runs.
   A parent transform is not a content lag; it is the housing moving twice.

   THE PARTICIPATION FLAG (I4b / #29). In `"window"` projection only the ACTIVE
   member projects and the neighbours do not move. */

const props = defineProps<WithClassAsProps>();

const { deck, viewport, setCount, orientation, projection } = useCarousel();
const prefersReducedMotion = useReducedMotion();

let observer: MutationObserver | null = null;

function members(): HTMLElement[] {
    const el = viewport.value;
    return el ? (Array.from(el.children) as HTMLElement[]) : [];
}

function syncCount(): void {
    setCount(members().length);
}

/** Write the travel-clock channel. Compositor properties only. */
function project(): void {
    const nodes = members();
    if (projection === "none" || prefersReducedMotion.value) {
        for (const node of nodes) {
            node.style.removeProperty("--member-scale");
            node.style.removeProperty("--member-lag");
        }
        return;
    }
    const position = deck.position.value;
    const lag = memberLag(deck.velocity.value);
    const active = deck.index.value;
    nodes.forEach((node, i) => {
        // I4b — in a window expansion the neighbours do not move.
        const participates = projection === "travel" || i === active;
        const d = participates ? memberDistance(i, position) : 1;
        node.style.setProperty("--member-scale", memberScale(d).toFixed(4));
        node.style.setProperty("--member-lag", participates ? lag.toFixed(4) : "0");
    });
}

watch(
    [() => deck.position.value, () => deck.velocity.value, prefersReducedMotion],
    project,
);
watch(() => deck.total.value, project);

onMounted(() => {
    syncCount();
    project();
    const el = viewport.value;
    if (el && typeof MutationObserver !== "undefined") {
        observer = new MutationObserver(() => {
            syncCount();
            project();
        });
        observer.observe(el, { childList: true });
    }
});
onBeforeUnmount(() => {
    observer?.disconnect();
    observer = null;
});
</script>

<template>
    <div
        ref="viewport"
        data-slot="carousel-content"
        :data-orientation="orientation"
        :data-projection="projection"
        :class="cn('carousel-strip', props.class)"
    >
        <slot />
    </div>
</template>
