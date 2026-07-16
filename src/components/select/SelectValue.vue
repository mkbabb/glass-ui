<script lang="ts">
import type { HTMLAttributes } from "vue";
import type { SelectionValue } from "../_shared/selection";

export interface SelectValueProps {
    placeholder?: string;
    class?: HTMLAttributes["class"];
}

export interface SelectValueSlotProps {
    selectedLabel: string[];
    modelValue: SelectionValue | undefined;
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { SelectValue as RekaSelectValue } from "reka-ui";
import { fixedHostAttrs } from "../_shared/primitive";
import { isSelectionValue } from "../_shared/selection";

defineOptions({ name: "SelectValue", inheritAttrs: false });

const props = defineProps<SelectValueProps>();
defineSlots<{ default?: (props: SelectValueSlotProps) => unknown }>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));

function scalarModelValue(value: unknown): SelectionValue | undefined {
    if (value == null) return undefined;
    if (!isSelectionValue(value)) {
        throw new TypeError("[glass-ui] SelectValue received a non-scalar value.");
    }
    return value;
}
</script>

<template>
    <RekaSelectValue
        v-slot="{ selectedLabel, modelValue }"
        v-bind="forwardedAttrs"
        :placeholder="props.placeholder"
        :class="props.class"
    >
        <slot
            :selected-label="selectedLabel"
            :model-value="scalarModelValue(modelValue)"
        >
            {{ selectedLabel.length ? selectedLabel.join(", ") : props.placeholder }}
        </slot>
    </RekaSelectValue>
</template>
