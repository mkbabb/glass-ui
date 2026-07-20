<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { Search } from "@lucide/vue";
import { ComboboxInput as RekaComboboxInput } from "reka-ui";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import type {
    ComboboxInputEmits,
    ComboboxInputProps,
} from "../_shared/selection";

defineOptions({ name: "CommandInput", inheritAttrs: false });

const props = defineProps<ComboboxInputProps>();
const emit = defineEmits<ComboboxInputEmits>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => ({
    ...fixedHostAttrs(attrs),
    placeholder: props.placeholder,
}));
</script>

<template>
    <div class="command__input-wrapper" data-slot="command-input-wrapper">
        <Search class="command__input-icon" aria-hidden="true" />
        <RekaComboboxInput
            v-bind="forwardedAttrs"
            data-slot="command-input"
            :model-value="props.modelValue"
            :auto-focus="props.autoFocus"
            :disabled="props.disabled"
            :class="cn('command__input', props.class)"
            @update:model-value="emit('update:modelValue', $event)"
        />
    </div>
</template>
