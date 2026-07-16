<script setup lang="ts">
import { type HTMLAttributes, computed, inject, nextTick, ref } from "vue";
import {
    injectTagsInputRootContext,
    TagsInputInput as RekaTagsInputInput,
} from "reka-ui";
import { cn } from "../_shared/class-names";
import { tagsInputContextKey } from "./context";

export interface TagsInputInputProps {
    placeholder?: string;
    autoFocus?: boolean;
    maxLength?: number;
    class?: HTMLAttributes["class"];
}

const props = defineProps<TagsInputInputProps>();
const context = inject(tagsInputContextKey);
const root = injectTagsInputRootContext();
const invalid = computed(
    () => context?.invalid.value === true || root.isInvalidInput.value,
);
const composing = ref(false);

function beginComposition() {
    composing.value = true;
}

function endComposition() {
    nextTick(() => {
        composing.value = false;
    });
}

function guardCompositionInput(event: Event) {
    if (composing.value) event.stopImmediatePropagation();
}
</script>

<template>
    <RekaTagsInputInput
        :placeholder="props.placeholder"
        :auto-focus="props.autoFocus"
        :max-length="props.maxLength"
        data-slot="tags-input-input"
        :aria-invalid="invalid || undefined"
        :class="cn('tags-input__input', props.class)"
        @compositionstart.capture="beginComposition"
        @compositionend.capture="endComposition"
        @input.capture="guardCompositionInput"
    />
</template>
