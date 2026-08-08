<script setup lang="ts">
import { NumberFieldRoot, useForwardPropsEmits } from "reka-ui";
import { computed, type HTMLAttributes, provide, useAttrs } from "vue";
import { cn } from "../_shared/class-names";
import type { ControlSize } from "../_shared/control";
import { useFieldControlState } from "../_shared/field/control";
import type { FormFieldProps, PrimitiveProps } from "../_shared/primitive";
import { numberFieldContextKey } from "./context";

export interface NumberFieldProps extends PrimitiveProps, FormFieldProps {
    modelValue?: number | null;
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    formatOptions?: Intl.NumberFormatOptions;
    locale?: string;
    disabled?: boolean;
    readonly?: boolean;
    id?: string;
    /** App-driven invalid state; locale parsing and native form behavior stay Reka-owned. */
    invalid?: boolean;
    /** The one size rung. Threads to the spinbutton and to both steppers. */
    size?: ControlSize;
    class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<NumberFieldProps>(), { size: "md" });
const emits = defineEmits<{
    "update:modelValue": [value: number];
}>();
const attrs = useAttrs();

defineOptions({ inheritAttrs: false });

const delegatedProps = computed(() => {
    const { class: _, invalid: __, size: ___, ...delegated } = props;
    return delegated;
});
const { ariaInvalid, forwardedAttrs } = useFieldControlState(props, attrs);
const required = computed(() => props.required === true);
const size = computed(() => props.size);

// `aria-invalid` and `aria-required` are NOT stamped here. This root renders a
// plain `div` with no role, and ARIA validity/requirement states belong on the
// widget that carries the role — the spinbutton. They travel down the context and
// land on NumberFieldInput, which is also the element a screen reader's forms mode
// stops on. The root keeps only the forwarded attrs a caller aimed at it.
provide(numberFieldContextKey, { ariaInvalid, required, size });

const forwarded = useForwardPropsEmits(delegatedProps, emits);
const bindings = computed(() => ({ ...forwarded.value, ...forwardedAttrs.value }));
</script>

<template>
    <NumberFieldRoot
        data-slot="number-field"
        v-bind="bindings"
        :class="cn('number-field', props.class)"
    >
        <slot />
    </NumberFieldRoot>
</template>

<style src="./styles.css"></style>
