<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { useVModel } from "@vueuse/core";
import { cn } from "../_shared/class-names";
import { useFieldControlState } from "../_shared/fieldControl";
import type { TextareaProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<TextareaProps>(), {
    invalid: false,
    resize: "vertical",
    size: "md",
});

const emit = defineEmits<{
    "update:modelValue": [value: string | number];
}>();

const attrs = useAttrs();
const { ariaInvalid, forwardedAttrs, state } = useFieldControlState(props, attrs);
const modelValue = useVModel(props, "modelValue", emit, {
    passive: true,
    defaultValue: props.defaultValue,
});

const nativeProps = computed(() => ({
    cols: props.cols,
    disabled: props.disabled,
    form: props.form,
    maxlength: props.maxlength,
    minlength: props.minlength,
    name: props.name,
    placeholder: props.placeholder,
    readonly: props.readonly,
    required: props.required,
    rows: props.rows,
    wrap: props.wrap,
}));
</script>

<template>
    <textarea
        v-bind="{ ...forwardedAttrs, ...nativeProps }"
        v-model="modelValue"
        data-slot="textarea"
        data-kind="textarea"
        :data-size="size"
        :data-state="state"
        :data-resize="resize"
        :aria-invalid="ariaInvalid"
        :class="cn('field-control glass-defined', props.class)"
    />
</template>

<style src="../_shared/field-control.css"></style>
