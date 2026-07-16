<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxEmpty as RekaComboboxEmpty } from "reka-ui";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import type { ComboboxEmptyProps } from "./types";

defineOptions({ name: "ComboboxEmpty", inheritAttrs: false });

const props = defineProps<ComboboxEmptyProps>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));
</script>

<template>
    <RekaComboboxEmpty
        data-slot="combobox-empty"
        v-bind="forwardedAttrs"
        :class="cn('py-6 text-center text-dropdown', props.class)"
    >
        <slot />
    </RekaComboboxEmpty>
</template>
