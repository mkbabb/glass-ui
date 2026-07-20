<script setup lang="ts" generic="TMode extends SelectionMode">
import { computed, useAttrs, type HTMLAttributes } from "vue";
import { AccordionRoot as RekaAccordionRoot } from "reka-ui";
import { cn } from "../_shared/class-names";
import type { SelectionMode } from "../_shared/selection";

export type AccordionValue<TMode extends SelectionMode = SelectionMode> =
    TMode extends "single" ? string | undefined : string[];

export interface AccordionProps<TMode extends SelectionMode = SelectionMode> {
    /** Whether the disclosure owns one open item or any number of open items. */
    type: TMode;
    /** Controlled open item value or values. */
    modelValue?: TMode extends "single" ? string : string[];
    /** Initial value for an uncontrolled accordion. */
    defaultValue?: TMode extends "single" ? string : string[];
    /** In single mode, allow the open item to close. */
    collapsible?: TMode extends "single" ? boolean : never;
    /** Disable interaction for the complete disclosure group. */
    disabled?: boolean;
    class?: HTMLAttributes["class"];
}

export interface AccordionEmits<TMode extends SelectionMode = SelectionMode> {
    "update:modelValue": [value: AccordionValue<TMode>];
}

export interface AccordionSlotProps<TMode extends SelectionMode = SelectionMode> {
    modelValue: AccordionValue<TMode>;
}

defineOptions({ name: "Accordion", inheritAttrs: false });

const props = defineProps<AccordionProps<TMode>>();
const emit = defineEmits<AccordionEmits<TMode>>();
defineSlots<{ default?: (props: AccordionSlotProps<TMode>) => unknown }>();

const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const {
        as: _as,
        asChild: _asChild,
        "as-child": _asChildKebab,
        dir: _dir,
        orientation: _orientation,
        unmountOnHide: _unmountOnHide,
        "unmount-on-hide": _unmountOnHideKebab,
        ...forwarded
    } = attrs;
    return forwarded;
});

function inputValue(value: unknown, name: "modelValue" | "defaultValue") {
    if (value === undefined) return undefined;
    if (props.type === "single" && typeof value === "string") return value;
    if (
        props.type === "multiple" &&
        Array.isArray(value) &&
        value.every((item) => typeof item === "string")
    ) {
        return value as string[];
    }
    throw new TypeError(
        `[glass-ui] Accordion type="${props.type}" received an invalid ${name}.`,
    );
}

function outputValue(value: unknown): AccordionValue<TMode> {
    if (props.type === "single" && (value === undefined || typeof value === "string")) {
        return value as AccordionValue<TMode>;
    }
    if (
        props.type === "multiple" &&
        Array.isArray(value) &&
        value.every((item) => typeof item === "string")
    ) {
        return value as AccordionValue<TMode>;
    }
    throw new TypeError(
        `[glass-ui] Accordion type="${props.type}" emitted an invalid selection model.`,
    );
}

function updateModelValue(value: unknown): void {
    emit("update:modelValue", outputValue(value));
}
</script>

<template>
    <RekaAccordionRoot
        v-bind="forwardedAttrs"
        v-slot="{ modelValue: currentValue }"
        as="div"
        data-slot="accordion"
        data-disclosure="accordion"
        orientation="vertical"
        :type="type"
        :model-value="inputValue(modelValue, 'modelValue')"
        :default-value="inputValue(defaultValue, 'defaultValue')"
        :collapsible="type === 'single' ? collapsible : undefined"
        :disabled="disabled ?? false"
        :class="cn('disclosure', props.class)"
        @update:model-value="updateModelValue"
    >
        <slot :model-value="outputValue(currentValue)" />
    </RekaAccordionRoot>
</template>

<style src="../_shared/disclosure/disclosure.css"></style>
