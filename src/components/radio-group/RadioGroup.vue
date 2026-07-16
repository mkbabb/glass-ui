<script lang="ts">
import type { HTMLAttributes } from "vue";
import type { Orientation } from "../_shared/axes";
import type { Direction, FormFieldProps, PrimitiveProps } from "../_shared/primitive";
import type { SelectionValue } from "../_shared/selection";

export interface RadioGroupProps extends PrimitiveProps, FormFieldProps {
    modelValue?: SelectionValue;
    defaultValue?: SelectionValue;
    disabled?: boolean;
    orientation?: Orientation;
    dir?: Direction;
    loop?: boolean;
    class?: HTMLAttributes["class"];
    invalid?: boolean;
}

export interface RadioGroupEmits {
    "update:modelValue": [value: SelectionValue];
}
</script>

<script setup lang="ts">
import { computed } from "vue";
import { RadioGroupRoot, useForwardProps } from "reka-ui";
import { isSelectionValue } from "../_shared/selection";
import { cn } from "../_shared/class-names";

const props = withDefaults(defineProps<RadioGroupProps>(), {
    invalid: false,
    orientation: "vertical",
});
const emit = defineEmits<RadioGroupEmits>();

const delegatedProps = computed(() => {
    const { class: _class, invalid: _invalid, ...delegated } = props;
    return delegated;
});
const forwarded = useForwardProps(delegatedProps);

function updateModelValue(value: unknown) {
    if (!isSelectionValue(value)) {
        throw new TypeError("[glass-ui] RadioGroup received a non-scalar value.");
    }
    emit("update:modelValue", value);
}
</script>

<template>
    <RadioGroupRoot
        data-slot="radio-group"
        v-bind="forwarded"
        @update:model-value="updateModelValue"
        :class="cn('radio-group', props.class)"
        :data-invalid="props.invalid || undefined"
        :aria-invalid="props.invalid || undefined"
    >
        <slot />
    </RadioGroupRoot>
</template>

<style src="./styles.css"></style>
