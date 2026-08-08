<script lang="ts">
import type { HTMLAttributes } from "vue";

export interface SelectValueProps {
    placeholder?: string;
    class?: HTMLAttributes["class"];
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { SelectValue as RekaSelectValue } from "reka-ui";
import { fixedHostAttrs } from "../_shared/primitive";

/* THE SLOT IS CONDITIONAL, and that is the whole repair. This wrapper used to hand
 * reka a default slot unconditionally, which shadowed reka's own label rendering —
 * so it then had to re-implement that rendering as a fallback, and re-validate a
 * `modelValue` that only reka could have produced (a throw on an unreachable
 * branch). Passing the slot through only when the consumer wrote one restores
 * reka as the single authority on both the default text and the slot props: the
 * consumer receives reka's whole slot payload, not a narrowed two-key copy. */
defineOptions({ name: "SelectValue", inheritAttrs: false });

const props = defineProps<SelectValueProps>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
</script>

<template>
    <RekaSelectValue
        v-bind="forwardedAttrs"
        :placeholder="props.placeholder"
        :class="props.class"
    >
        <template v-if="$slots.default" #default="slotProps">
            <slot v-bind="slotProps" />
        </template>
    </RekaSelectValue>
</template>
