<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxEmpty as RekaComboboxEmpty } from "reka-ui";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import type { ComboboxEmptyProps } from "../_shared/selection";

defineOptions({ name: "CommandEmpty", inheritAttrs: false });

const props = defineProps<ComboboxEmptyProps>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
</script>

<template>
    <RekaComboboxEmpty
        v-bind="forwardedAttrs"
        data-slot="command-empty"
        :class="cn('command__empty', props.class)"
    >
        <slot />
    </RekaComboboxEmpty>
</template>
