<script setup lang="ts">
import { Progress } from "../../ui/progress";
import { cn } from "../../../utils";

/**
 * DeckProgress — a thin `:value`-only wrapper that renders the shipped
 * `<Progress variant="default">` styled as the `.glass-progress-rail`
 * deck-position rail (AW.W16).
 *
 * It owns the rail LOOK and NOTHING ELSE. The CONSUMER owns:
 *   - the position math — `value` is a pre-computed 0..100 percentage
 *     (`100·(k+1)/N` is a one-liner every consumer already keeps);
 *   - the viewport-pinned chrome — `position: fixed`,
 *     `bottom: env(safe-area-inset-bottom)`, the z-index — supplied via the
 *     forwarded `class` (a consumer pins it; this wrapper declares no
 *     positioning).
 *
 * NO `:index`/`:total` convenience path, NO `deckProgress()` math import, NO
 * `/deck` subpath (the `/deck` name is reserved for the slides deck-engine
 * lift). The wrapper ships on the root barrel like the other cherry-picked
 * custom composites.
 */
export interface DeckProgressProps {
    /** Pre-computed deck-position percentage (0..100) the consumer supplies. */
    value: number;
    /** Forwarded class — the consumer pins the rail's viewport chrome here. */
    class?: string;
}

const props = defineProps<DeckProgressProps>();
</script>

<template>
    <Progress
        variant="default"
        :model-value="props.value"
        :class="cn('glass-progress-rail', props.class)"
        aria-label="Deck position"
    />
</template>
