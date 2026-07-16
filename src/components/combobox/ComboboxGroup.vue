<script setup lang="ts">
import { computed, useAttrs } from "vue";
import {
    ComboboxGroup as RekaComboboxGroup,
    ComboboxLabel as RekaComboboxLabel,
} from "reka-ui";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import type { ComboboxGroupProps } from "./types";

defineOptions({ name: "ComboboxGroup", inheritAttrs: false });

const props = defineProps<ComboboxGroupProps>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
</script>

<template>
    <RekaComboboxGroup
        data-slot="combobox-group"
        v-bind="forwardedAttrs"
        :class="cn('overflow-hidden p-1 text-foreground', props.class)"
    >
        <RekaComboboxLabel
            v-if="props.heading"
            class="px-2 py-1.5 text-dropdown-secondary font-medium text-muted-foreground"
        >
            {{ props.heading }}
        </RekaComboboxLabel>
        <slot />
    </RekaComboboxGroup>
</template>
