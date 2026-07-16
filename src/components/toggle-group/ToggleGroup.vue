<script setup lang="ts" generic="TMode extends SelectionMode">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { ToggleGroupRoot as RekaToggleGroupRoot } from "reka-ui";
import {
    provideToggleGroupContext,
    type ToggleGroupSize,
    type ToggleGroupVariant,
} from "./toggleGroupContext";
import { cn } from "../_shared/class-names";
import type { Orientation } from "../_shared/axes";
import {
    fixedHostAttrs,
    type Direction,
    type FormFieldProps,
} from "../_shared/primitive";
import {
    isSelectionValue,
    type SelectionMode,
    type SelectionValue,
} from "../_shared/selection";

export type ToggleGroupValue<TMode extends SelectionMode = SelectionMode> =
    TMode extends "single" ? SelectionValue | undefined : SelectionValue[];

export interface ToggleGroupProps<TMode extends SelectionMode = SelectionMode>
    extends FormFieldProps {
    type: TMode;
    modelValue?: TMode extends "single" ? SelectionValue : SelectionValue[];
    defaultValue?: TMode extends "single" ? SelectionValue : SelectionValue[];
    rovingFocus?: boolean;
    disabled?: boolean;
    orientation?: Orientation;
    dir?: Direction;
    loop?: boolean;
    class?: HTMLAttributes["class"];
    variant?: ToggleGroupVariant;
    size?: ToggleGroupSize;
}

export interface ToggleGroupEmits<TMode extends SelectionMode = SelectionMode> {
    "update:modelValue": [value: ToggleGroupValue<TMode>];
}

export interface ToggleGroupSlotProps<TMode extends SelectionMode = SelectionMode> {
    modelValue: ToggleGroupValue<TMode>;
}

defineOptions({ name: "ToggleGroup", inheritAttrs: false });

const props = withDefaults(defineProps<ToggleGroupProps<TMode>>(), {
    rovingFocus: true,
    disabled: false,
    loop: true,
});
const emit = defineEmits<ToggleGroupEmits<TMode>>();
defineSlots<{ default?: (props: ToggleGroupSlotProps<TMode>) => unknown }>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));

provideToggleGroupContext({
    get variant() {
        return props.variant;
    },
    get size() {
        return props.size;
    },
});

function inputValue(value: unknown, name: "modelValue" | "defaultValue") {
    if (value === undefined) return undefined;
    if (props.type === "single" && isSelectionValue(value)) return value;
    if (
        props.type === "multiple" &&
        Array.isArray(value) &&
        value.every(isSelectionValue)
    ) {
        return value as SelectionValue[];
    }
    throw new TypeError(
        `[glass-ui] ToggleGroup type="${props.type}" received an invalid ${name}.`,
    );
}

function outputValue(value: unknown): ToggleGroupValue<TMode> {
    if (props.type === "single" && (value === undefined || isSelectionValue(value))) {
        return value as ToggleGroupValue<TMode>;
    }
    if (
        props.type === "multiple" &&
        Array.isArray(value) &&
        value.every(isSelectionValue)
    ) {
        return value as ToggleGroupValue<TMode>;
    }
    throw new TypeError(
        `[glass-ui] ToggleGroup type="${props.type}" emitted an invalid selection model.`,
    );
}

function updateModelValue(value: unknown): void {
    emit("update:modelValue", outputValue(value));
}
</script>

<template>
    <RekaToggleGroupRoot
        v-slot="{ modelValue: currentValue }"
        as-child
        :type="type"
        :model-value="inputValue(modelValue, 'modelValue')"
        :default-value="inputValue(defaultValue, 'defaultValue')"
        :name="name"
        :required="required"
        :roving-focus="rovingFocus"
        :disabled="disabled"
        :orientation="orientation"
        :dir="dir"
        :loop="loop"
        @update:model-value="updateModelValue"
    >
        <div
            v-bind="forwardedAttrs"
            data-slot="toggle-group"
            :data-type="props.type"
            :data-variant="props.variant || 'default'"
            :data-size="props.size || 'md'"
            :class="cn('toggle-group', props.class)"
        >
            <slot :model-value="outputValue(currentValue)" />
        </div>
    </RekaToggleGroupRoot>
</template>

<style src="./styles.css"></style>
