<script setup lang="ts">
import { computed } from "vue";
import { cn } from "../_shared/class-names";
import { useCarousel } from "./useCarousel";
import { provideSlideContext } from "../deck";
import type { WithClassAsProps } from "./types";

/* CarouselItem — the member, and it GROWS, which is the correct direction.
   The predecessor was a twenty-four line pass-through: `role="group"`, a
   roledescription, and two Tailwind gutter literals. Everything a member owes a
   reader it did not do. An off-snap member sat in the tab order at seventy percent
   opacity behind `overflow: hidden` — over a thousand pixels of content a keyboard
   user could reach and nobody could see — and four rails declared themselves
   tablists while zero panels declared themselves panels.

   So: off-snap members are `inert` AND `aria-hidden`; a member linked to a panel
   declares `role="tabpanel"` with the id the rail's dot points at; and each member
   carries its own name. The content node exists to carry the interior lag (LAW 3),
   and it is one div. */

const props = defineProps<
    {
        /** This member's 0-based index. Required for the state + linkage. */
        index: number;
        /** This member's accessible name. */
        label?: string;
        /** The panel id when the rail runs the `"tabs"` register. */
        id?: string;
    } & WithClassAsProps
>();

const { deck, orientation, pattern } = useCarousel();

const state = computed(() => deck.stateFor(props.index));
const active = computed(() => state.value === "active");
const panel = computed(() => pattern === "tabs" && !!props.id);

provideSlideContext({
    index: computed(() => props.index),
    total: computed(() => deck.total.value),
    active,
});
</script>

<template>
    <div
        :id="id"
        data-slot="carousel-item"
        :data-state="state"
        :data-orientation="orientation"
        :role="panel ? 'tabpanel' : 'group'"
        :aria-roledescription="panel ? undefined : 'slide'"
        :aria-label="label"
        :aria-hidden="active ? undefined : 'true'"
        :inert="active ? undefined : true"
        :tabindex="panel && active ? 0 : undefined"
        :class="cn('carousel-item', props.class)"
    >
        <!-- The content node — the interior lag lives HERE, never on the housing. -->
        <div class="carousel-item-content">
            <slot :index="index" :active="active" />
        </div>
    </div>
</template>
