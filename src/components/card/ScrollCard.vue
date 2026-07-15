<script lang="ts">
import type { HTMLAttributes } from "vue";
import type { CardTier, CardSurface, CardSpecular } from "./Card.vue";

/** Props for `<ScrollCard>` — the first-class scroll-shrink card. */
export interface ScrollCardProps {
    /** Card surface tier — forwarded to the inner `<Card>`. Default `resting`. */
    tier?: CardTier;
    /** Surface decoration register — forwarded to `<Card>`. Default `glass`. */
    surface?: CardSurface;
    /** Surface drop shadow — forwarded to `<Card>`. Default `true`. */
    shadow?: boolean;
    /** Specular catch-light — forwarded to `<Card>`. Default `off`. */
    specular?: CardSpecular;
    /** Max scroll-port height. The scroll region needs a bounded height for
     *  the `--card-scroll` timeline to have a scroll range. Default `18rem`. */
    maxHeight?: string;
    class?: HTMLAttributes["class"];
}
</script>

<script setup lang="ts">
import { computed } from "vue";
import Card from "./Card.vue";

/**
 * <ScrollCard> — the FIRST-CLASS scroll-shrink card (BB.W-SCROLL-CARD).
 *
 * A `<Card>` host that internally carries the `.card-scroll-host` scroll-port
 * (the canonical `--card-scroll` named-timeline emitter), so a consumer writes
 * `<ScrollCard>` with a slotted `<ScrollCardHeader>` (or `<CardHeader shrink>`)
 * + body and gets the WHOLE scroll-shrink choreography — the header compresses,
 * the title shrinks IN PLACE, the description retires, the header background
 * lifts — ZERO consumer rAF/scroll-listener, all on the compositor.
 *
 *   <ScrollCard>
 *     <ScrollCardHeader>
 *       <CardTitle>…</CardTitle>
 *       <CardDescription>…</CardDescription>
 *     </ScrollCardHeader>
 *     <CardContent>… long body …</CardContent>
 *   </ScrollCard>
 *
 * The consumer no longer hand-applies `class="card-scroll-host overflow-auto"`
 * (the `<CardHeader shrink>` + `card-scroll-host` interim composition) — the
 * scroll-port + the named timeline are owned by this family. `grain` defaults
 * OFF (the paper-grain `::after` conflicts with the scroll-overflow repaints —
 * the Card.vue grain note), `tabindex` defaults `0` so the region is keyboard-
 * scrollable.
 *
 * It is a thin wrapper — NO second keyframe set, NO parallel scroll engine: the
 * choreography is the `card-*-shrink` lanes minted ONCE in CardHeader.vue.
 */
const props = withDefaults(
    defineProps<ScrollCardProps>(),
    {
        tier: "resting",
        surface: "glass",
        shadow: true,
        specular: "off",
        maxHeight: "18rem",
    },
);

const hostStyle = computed(() => ({ "--scroll-card-max-height": props.maxHeight }));
</script>

<template>
    <Card
        :tier="tier"
        :surface="surface"
        :shadow="shadow"
        :specular="specular"
        :grain="false"
        tabindex="0"
        role="region"
        aria-label="Scrollable content"
        data-slot="scroll-card"
        :style="hostStyle"
        :class="['scroll-card', 'card-scroll-host', props.class]"
    >
        <slot />
    </Card>
</template>

<style scoped>
/* The scroll-port: a bounded-height overflow region so the `--card-scroll`
   named timeline (emitted by `.card-scroll-host`) has a scroll range to drive
   the slotted `<ScrollCardHeader>`/`<CardHeader shrink>` choreography. The
   inner padding is owned by the slotted CardHeader/CardContent (the W-CARD-PAD
   golden ladder), so the scroll-card root carries none. */
.scroll-card {
    max-block-size: var(--scroll-card-max-height, 18rem);
    overflow-y: auto;
    padding: 0;
}
</style>
