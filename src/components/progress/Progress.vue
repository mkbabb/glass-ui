<script setup lang="ts">
import { computed, type HTMLAttributes, watchEffect } from "vue";
import type { ProgressRootProps } from "reka-ui";
import ProgressDefault from "./ProgressDefault.vue";
import ProgressGradient from "./ProgressGradient.vue";
import ProgressLiquid from "./ProgressLiquid.vue";

type ProgressVariant = "default" | "gradient" | "liquid";

const props = withDefaults(
    defineProps<
        ProgressRootProps & {
            class?: HTMLAttributes["class"];
            variant?: ProgressVariant;
            /** Decorative checkpoints in the same 0..max domain as modelValue. */
            marks?: readonly number[];
            /** Gradient only — indeterminate sweep opt-in. */
            indeterminate?: boolean;
        }
    >(),
    {
        modelValue: 0,
        variant: "default",
        marks: () => [],
        indeterminate: false,
    },
);

const delegatedProps = computed(() => {
    const { class: _, variant: _v, marks: _m, indeterminate: _i, ...delegated } = props;
    return delegated;
});

watchEffect(() => {
    if (props.indeterminate && props.marks.length) {
        const message = "[glass-ui] Progress: `marks` require determinate progress.";
        if (import.meta.env.DEV) throw new Error(message);
        console.error(message);
    }
});
</script>

<template>
    <ProgressGradient
        v-if="props.variant === 'gradient'"
        v-bind="delegatedProps"
        :indeterminate="props.indeterminate"
        :marks="props.marks"
        :class="props.class"
    />
    <ProgressLiquid
        v-else-if="props.variant === 'liquid'"
        v-bind="delegatedProps"
        :marks="props.marks"
        :class="props.class"
    />
    <ProgressDefault
        v-else
        v-bind="delegatedProps"
        :marks="props.marks"
        :class="props.class"
    />
</template>
