<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import FeedbackMark from "../_shared/FeedbackMark.vue";
import type { PulseState } from "../_shared/feedback";

defineOptions({
    name: "Pulse",
    inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
        /** The truthful state represented by the mark. */
        state?: PulseState;
        /** Accessible identity. Omit when adjacent text already names the state. */
        label?: string;
        class?: HTMLAttributes["class"];
    }>(),
    { state: "active" },
);
</script>

<template>
    <span
        v-bind="$attrs"
        :class="['pulse', props.class]"
        :data-state="state"
        :data-identity="label ? 'labelled' : 'decorative'"
        :role="label ? 'img' : undefined"
        :aria-label="label"
        :aria-hidden="label ? undefined : 'true'"
    >
        <FeedbackMark :state="state" motion />
    </span>
</template>

<style scoped>
.pulse {
    --feedback-mark-size: 0.875rem;
    display: inline-grid;
    inline-size: var(--feedback-mark-size);
    block-size: var(--feedback-mark-size);
    flex: none;
    place-items: center;
    vertical-align: -0.1em;
}
</style>
