<script setup lang="ts">
import { TagsInputRoot, useForwardPropsEmits } from "reka-ui";
import { computed, type HTMLAttributes, provide, useAttrs } from "vue";
import { cn } from "../_shared/class-names";
import { isAriaInvalid } from "../_shared/field/fieldControl";
import type { Direction, FormFieldProps } from "../_shared/primitive";
import { tagsInputContextKey } from "./context";

export interface TagsInputProps extends FormFieldProps {
    modelValue?: string[] | null;
    defaultValue?: string[];
    addOnPaste?: boolean;
    addOnTab?: boolean;
    addOnBlur?: boolean;
    duplicate?: boolean;
    disabled?: boolean;
    delimiter?: string | RegExp;
    dir?: Direction;
    max?: number;
    id?: string;
    /** App-driven invalid state; duplicate attempts still use Reka's invalid event. */
    invalid?: boolean;
    class?: HTMLAttributes["class"];
}

const props = defineProps<TagsInputProps>();
const emits = defineEmits<{
    "update:modelValue": [value: string[]];
    invalid: [value: string];
    addTag: [value: string];
    removeTag: [value: string];
}>();
const attrs = useAttrs();

const delegatedProps = computed(() => {
    const { class: _, invalid: __, ...delegated } = props;
    return delegated;
});
const invalid = computed(
    () => props.invalid === true || isAriaInvalid(attrs["aria-invalid"]),
);
const state = computed(() =>
    props.disabled ? "disabled" : invalid.value ? "invalid" : "default",
);

provide(tagsInputContextKey, { invalid });

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <TagsInputRoot
        data-slot="tags-input"
        data-kind="tags-input"
        v-bind="forwarded"
        :data-state="state"
        :aria-invalid="invalid || undefined"
        :class="cn('tags-input field-control glass-defined', props.class)"
    >
        <slot />
    </TagsInputRoot>
</template>

<style src="../_shared/field/field-control.css"></style>
<style src="./styles.css"></style>
