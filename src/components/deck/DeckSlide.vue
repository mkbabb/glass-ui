<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "../_shared/class-names";
import { provideSlideContext, useDeckStage } from "./slideContext";
import type { DeckState, SlideEntry } from "./types";

/* DeckSlide — one member, and nothing else.
   Attribute fall-through with ZERO DOM reach: the member does not measure itself,
   does not read the stage, and does not own a transition. It carries the ONE
   `[data-state]` vocabulary (`active | prev | next`) and the manifest's dark and
   aria flags, and it provides the per-member context so its own content can ask
   where it sits without threading props.

   THE MANIFEST CARRIES THE FLAGS, not the node: a dark member and its accessible
   name travel with the entry, so reordering the sequence cannot leave a slide
   wearing its neighbour's name. */

const props = defineProps<{
    /** This member's 0-based index in the sequence. */
    index: number;
    /** The manifest entry — carries `dark`, the accessible name, the id. */
    entry?: SlideEntry;
    /** Force the state (a member rendered outside a stage). */
    state?: DeckState;
    class?: HTMLAttributes["class"];
}>();

const deck = useDeckStage();

const state = computed<DeckState>(
    () => props.state ?? deck?.stateFor(props.index) ?? "active",
);
const total = computed(() => deck?.total.value ?? 1);
const active = computed(() => state.value === "active");

provideSlideContext({
    index: computed(() => props.index),
    total,
    active,
});
</script>

<template>
    <section
        data-slot="deck-slide"
        :data-state="state"
        :data-dark="entry?.dark ? '' : undefined"
        :class="cn('deck-slide', entry?.dark && 'dark', props.class)"
        :aria-label="entry?.ariaLabel ?? entry?.title"
        :aria-roledescription="'slide'"
        :aria-hidden="active ? undefined : 'true'"
        :inert="active ? undefined : true"
    >
        <slot :index="index" :total="total" :active="active" />
    </section>
</template>
