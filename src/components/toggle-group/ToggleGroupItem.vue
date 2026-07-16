<script setup lang="ts">
import { type HTMLAttributes, computed, useAttrs } from "vue";
import { ToggleGroupItem as RekaToggleGroupItem } from "reka-ui";
import {
    useOptionalToggleGroupContext,
    type ToggleGroupSize,
    type ToggleGroupVariant,
} from "./toggleGroupContext";
import { cn } from "../_shared/class-names";
import { fixedHostAttrs } from "../_shared/primitive";
import type { SelectionValue } from "../_shared/selection";

export interface ToggleGroupItemProps {
    value: SelectionValue;
    disabled?: boolean;
    class?: HTMLAttributes["class"];
    variant?: ToggleGroupVariant;
    size?: ToggleGroupSize;
}

defineOptions({ name: "ToggleGroupItem", inheritAttrs: false });

const props = defineProps<ToggleGroupItemProps>();
const attrs = useAttrs();
const forwardedAttrs = computed(() => fixedHostAttrs(attrs));

const context = useOptionalToggleGroupContext();
const variant = computed(() => context?.variant ?? props.variant ?? "default");
const size = computed(() => context?.size ?? props.size ?? "md");
</script>

<template>
    <RekaToggleGroupItem
        v-bind="forwardedAttrs"
        as="button"
        :value="props.value"
        :disabled="props.disabled"
        data-slot="toggle-group-item"
        :data-variant="variant"
        :data-size="size"
        :class="cn('toggle-group__item tap-squish focus-ring', props.class)"
    >
        <slot />
    </RekaToggleGroupItem>
</template>

<style src="./styles.css"></style>
