<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { computed, ref } from "vue";
import { cn } from "../_shared/class-names";
import { provideDeck } from "./slideContext";
import { useDeckSnap } from "./composables/useDeckSnap";
import type { DeckCore } from "./composables/useDeck";

/* DeckStage — the sequence's room, and the DOM host the core never had.
   A headless core with no rendering half leaves every consumer to re-derive the
   same four things, and they re-derived them differently: a letterboxed stage, a
   resolution-independent authoring anchor, ONE ground behind the members rather
   than one per member, and somewhere for the live announcement to actually live.

   THE LETTERBOX is a fixed-inset box with `margin: auto` and an aspect ratio, so
   the stage is the largest box of that ratio that fits, centred, whatever the
   viewport. `--cqx` publishes one percent of the stage's inline size as a length,
   which is the invariant the export path rides: authored geometry stated in `--cqx`
   is identical at 1280 and at 3840, so a frame captured at either resolution is the
   same picture.

   ONE GROUND, crossfading. Per-member grounds collide during a turn — for the
   duration of the transition BOTH are on screen and the seam between them is
   visible — so the ground is a single layer behind the strip and members carry
   their own ink over it.

   TWO REGISTERS, never mixed (LAW 11): `register="turn"` stacks the members and
   the authored spring-clock turn moves them; `register="snap"` scrolls the strip
   and the platform's own snap moves it, inertially. The snap register mounts the
   travel arm; the turn register does not, and gets its gesture from the swipe
   driver instead. */

const props = withDefaults(
    defineProps<{
        /** The sequence core (`useDeck`). */
        deck: DeckCore;
        /** Which motion register the stage runs. Default `"turn"`. */
        register?: "turn" | "snap";
        /** The letterbox aspect ratio. Default 16 / 9. Set `null` to fill the host. */
        ratio?: number | null;
        /** Cover the viewport (a presentation) rather than the parent box. */
        fullscreen?: boolean;
        /** Accessible name for the sequence region. */
        ariaLabel?: string;
        class?: HTMLAttributes["class"];
    }>(),
    { register: "turn", ratio: 16 / 9, fullscreen: false },
);

const stripEl = ref<HTMLElement | null>(null);

provideDeck(props.deck);

// The travel arm is the snap register's, and only the snap register's.
if (props.register === "snap") {
    useDeckSnap({ strip: stripEl, deck: props.deck });
}

const styles = computed(() => ({
    ...(props.ratio ? { "--deck-ratio": String(props.ratio) } : {}),
}));
</script>

<template>
    <div
        data-slot="deck-stage"
        :data-register="register"
        :data-axis="deck.axis.value"
        :data-fullscreen="fullscreen ? '' : undefined"
        :data-ratio="ratio ? '' : undefined"
        role="region"
        :aria-roledescription="ariaLabel ? 'carousel' : undefined"
        :aria-label="ariaLabel"
        :style="styles"
        :class="cn('deck-stage', props.class)"
    >
        <!-- ONE ground behind every member (never one per member — they collide
             for the whole duration of a turn). -->
        <div class="deck-ground" aria-hidden="true">
            <slot name="ground" />
        </div>

        <div ref="stripEl" class="deck-strip" data-slot="deck-strip">
            <slot />
        </div>

        <slot name="chrome" />

        <!-- The step announcement's DOM host. The core computed it and nothing
             rendered it; every consumer re-authored this paragraph. -->
        <p class="sr-only" aria-live="polite" aria-atomic="true">
            {{ deck.liveMessage.value }}
        </p>
    </div>
</template>
