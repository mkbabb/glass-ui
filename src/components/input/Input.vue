<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { useVModel } from "@vueuse/core";
import { cn } from "../_shared/class-names";
import { useFieldControlState } from "../_shared/fieldControl";
import type { InputProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<InputProps>(), {
    invalid: false,
    size: "md",
    type: "text",
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
    autocomplete: props.autocomplete,
    disabled: props.disabled,
    enterkeyhint: props.enterkeyhint,
    form: props.form,
    inputmode: props.inputmode,
    maxlength: props.maxlength,
    minlength: props.minlength,
    name: props.name,
    pattern: props.pattern,
    placeholder: props.placeholder,
    readonly: props.readonly,
    required: props.required,
    type: props.type,
}));
</script>

<template>
    <input
        v-bind="{ ...forwardedAttrs, ...nativeProps }"
        v-model="modelValue"
        data-slot="input"
        data-kind="input"
        :data-size="size"
        :data-state="state"
        :aria-invalid="ariaInvalid"
        :class="cn('field-control glass-defined', props.class)"
    />
</template>

<style src="../_shared/field-control.css"></style>
