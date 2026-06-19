<template>
    <div
        class="completion-seal"
        :class="cn(props.class)"
        :data-shape="shape"
        :data-play="playing ? '' : undefined"
        :data-drawn="drawn ? '' : undefined"
        role="status"
        aria-live="polite"
    >
        <svg
            class="completion-seal__svg"
            :viewBox="COMPLETION_SEAL_VIEWBOX"
            aria-hidden="true"
            focusable="false"
        >
            <!-- The ring glyph — a <circle>; the gold stroke draws around the
                 completion (a seal around the event). -->
            <circle
                v-if="shape === 'ring'"
                class="completion-seal__mark"
                :cx="COMPLETION_SEAL_RING.cx"
                :cy="COMPLETION_SEAL_RING.cy"
                :r="COMPLETION_SEAL_RING.r"
                pathLength="100"
            />
            <!-- The check / wordmark glyph — a <path>; the gold stroke inks the mark. -->
            <path
                v-else
                class="completion-seal__mark"
                :d="markPath"
                pathLength="100"
            />
        </svg>
        <!-- The accessible completion announcement (the role="status"/aria-live host
             above carries it to AT — visually hidden, the gold mark IS the visual). -->
        <span v-if="props.label" class="sr-only">{{ props.label }}</span>
    </div>
</template>

<script setup lang="ts">
import { computed, toRef } from "vue";
import { cn } from "../../../utils/cn";
import { useCompletionSeal } from "./composables/useCompletionSeal";
import {
    COMPLETION_SEAL_DEFAULT_SHAPE,
    COMPLETION_SEAL_PATHS,
    COMPLETION_SEAL_RING,
    COMPLETION_SEAL_VIEWBOX,
    type CompletionSealShape,
} from "./constants";

defineOptions({ name: "CompletionSeal" });

export interface CompletionSealProps {
    /** The seal glyph — `check` (default) | `ring` | `wordmark`. */
    shape?: CompletionSealShape;
    /**
     * The accessible completion announcement (the `role="status"`/`aria-live` text — a
     * screen reader hears "Speedtest complete", etc.). The gold mark is the visual.
     */
    label?: string;
    /**
     * The draw trigger — the consumer fires it on completion. When it flips truthy the
     * seal draws ONCE. Default (unset) plays on mount (the seal draws when it appears —
     * the canonical completion moment).
     */
    play?: boolean;
    /** Pass-through class on the root. */
    class?: string;
}

const props = defineProps<CompletionSealProps>();

const shape = computed<CompletionSealShape>(
    () => props.shape ?? COMPLETION_SEAL_DEFAULT_SHAPE,
);

// The check/wordmark path `d` (the ring branches to a <circle> in the template).
const markPath = computed(() =>
    shape.value === "wordmark"
        ? COMPLETION_SEAL_PATHS.wordmark
        : COMPLETION_SEAL_PATHS.check,
);

// The one-shot draw lifecycle — `playing` arms the `data-play` recipe seam, `drawn`
// holds the static seal afterward. When `play` is omitted the seal draws on mount.
const { playing, drawn } = useCompletionSeal({
    play: props.play === undefined ? undefined : toRef(props, "play"),
});
</script>
