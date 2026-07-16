<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import FeedbackMark from "../_shared/FeedbackMark.vue";
import type {
    FeedbackSize,
    StatusDotState,
} from "../_shared/feedback";

defineOptions({
    name: "StatusDot",
    inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
        state?: StatusDotState;
        size?: FeedbackSize;
        /** Accessible identity. Omit when adjacent text already names the state. */
        label?: string;
        class?: HTMLAttributes["class"];
    }>(),
    {
        state: "online",
        size: "sm",
    },
);
</script>

<template>
    <span
        v-bind="$attrs"
        :class="['status-dot', props.class]"
        :data-state="state"
        :data-size="size"
        :data-identity="label ? 'labelled' : 'decorative'"
        :role="label ? 'img' : undefined"
        :aria-label="label"
        :aria-hidden="label ? undefined : 'true'"
    >
        <FeedbackMark :state="state" />
    </span>
</template>

<style scoped>
.status-dot {
    --feedback-mark-size: 0.5rem;
    display: inline-grid;
    inline-size: var(--feedback-mark-size);
    block-size: var(--feedback-mark-size);
    flex: none;
    place-items: center;
    vertical-align: 0.05em;
}

.status-dot[data-size="md"] {
    --feedback-mark-size: 0.625rem;
}
</style>
