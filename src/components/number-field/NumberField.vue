<script setup lang="ts">
import { NumberFieldRoot, useForwardPropsEmits } from "reka-ui";
import { computed, type HTMLAttributes, provide, useAttrs } from "vue";
import { cn } from "../_shared/class-names";
import { useFieldControlState } from "../_shared/fieldControl";
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
    class?: HTMLAttributes["class"];
}

const props = defineProps<NumberFieldProps>();
const emits = defineEmits<{
    "update:modelValue": [value: number];
}>();
const attrs = useAttrs();

defineOptions({ inheritAttrs: false });

const delegatedProps = computed(() => {
    const { class: _, invalid: __, ...delegated } = props;
    return delegated;
});
const { ariaInvalid, forwardedAttrs } = useFieldControlState(props, attrs);
const required = computed(() => props.required === true);
const rootAttrs = computed(() => ({
    ...forwardedAttrs.value,
    "aria-invalid": ariaInvalid.value,
    "aria-required": required.value || undefined,
}));

provide(numberFieldContextKey, { ariaInvalid, required });

const forwarded = useForwardPropsEmits(delegatedProps, emits);
const bindings = computed(() => ({ ...forwarded.value, ...rootAttrs.value }));
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
