<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import FeedbackMark from "../_shared/feedback/FeedbackMark.vue";
import type {
    FeedbackSize,
    StatusDotState,
} from "../_shared/feedback/feedback";

defineOptions({
    name: "StatusDot",
    inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
        state?: StatusDotState;
        size?: FeedbackSize;
        /**
         * Liveness axis. `"full"` runs the breathing pulse ring on the live
         * `active` state (liquid-weight universal — the default); `"off"` opts
         * down to a static mark. Reduced-motion always wins regardless.
         */
        motion?: "full" | "off";
        /** Accessible identity. Omit when adjacent text already names the state. */
        label?: string;
        class?: HTMLAttributes["class"];
    }>(),
    {
        state: "online",
        size: "sm",
        motion: "full",
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
        <FeedbackMark :state="state" :motion="motion === 'full'" />
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

.status-dot[data-size="lg"] {
    --feedback-mark-size: 0.875rem;
}
</style>
