<script setup lang="ts">
import { computed, useAttrs } from "vue";
import { ComboboxAnchor as RekaComboboxAnchor } from "reka-ui";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import type { ComboboxAnchorProps } from "./types";

defineOptions({ name: "ComboboxAnchor", inheritAttrs: false });

const props = defineProps<ComboboxAnchorProps>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => {
    const { reference: _reference, ...forwarded } = fixedHostAttrs(attrs);
    return forwarded;
});
</script>

<template>
    <RekaComboboxAnchor
        data-slot="combobox-anchor"
        v-bind="forwardedAttrs"
        :class="cn('w-popover', props.class)"
    >
        <slot />
    </RekaComboboxAnchor>
</template>
