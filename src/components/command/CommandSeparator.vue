<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxSeparator as RekaComboboxSeparator } from "reka-ui";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import type { ComboboxSeparatorProps } from "../combobox/types";

defineOptions({ name: "CommandSeparator", inheritAttrs: false });

const props = defineProps<ComboboxSeparatorProps>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
</script>

<template>
    <RekaComboboxSeparator
        v-bind="forwardedAttrs"
        data-slot="command-separator"
        :class="cn('command__separator', props.class)"
    >
        <slot />
    </RekaComboboxSeparator>
</template>
