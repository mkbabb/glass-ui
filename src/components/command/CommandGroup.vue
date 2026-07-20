<script setup lang="ts">
import { computed, useAttrs } from "vue";
import {
    ComboboxGroup as RekaComboboxGroup,
    ComboboxLabel as RekaComboboxLabel,
} from "reka-ui";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import type { ComboboxGroupProps } from "../_shared/selection";

defineOptions({ name: "CommandGroup", inheritAttrs: false });

const props = defineProps<ComboboxGroupProps>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
</script>

<template>
    <RekaComboboxGroup
        v-bind="forwardedAttrs"
        data-slot="command-group"
        :class="cn('command__group', props.class)"
    >
        <RekaComboboxLabel v-if="props.heading" class="command__group-label">
            {{ props.heading }}
        </RekaComboboxLabel>
        <slot />
    </RekaComboboxGroup>
</template>
