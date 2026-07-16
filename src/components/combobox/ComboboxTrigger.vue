<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxTrigger as RekaComboboxTrigger } from "reka-ui";
import { fixedHostAttrs } from "../_shared/primitive";
import type { ComboboxTriggerProps } from "./types";

defineOptions({ name: "ComboboxTrigger", inheritAttrs: false });

const props = withDefaults(defineProps<ComboboxTriggerProps>(), {
    asChild: false,
});
const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const forwarded = fixedHostAttrs(attrs);
    return props.asChild ? forwarded : { ...forwarded, type: "button" };
});
</script>

<template>
    <RekaComboboxTrigger
        v-bind="forwardedAttrs"
        as="button"
        :as-child="props.asChild"
        :disabled="props.disabled"
        :class="props.class"
    >
        <slot />
    </RekaComboboxTrigger>
</template>
