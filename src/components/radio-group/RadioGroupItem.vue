<script lang="ts">
import type { HTMLAttributes } from "vue";
import type { SelectionValue } from "../_shared/selection";

export interface RadioGroupItemProps {
    value: SelectionValue;
    id?: string;
    disabled?: boolean;
    class?: HTMLAttributes["class"];
}
</script>

<script setup lang="ts">
import { computed } from "vue";
import { RadioGroupIndicator, RadioGroupItem, useForwardProps } from "reka-ui";
import { cn } from "../_shared/class-names";

const props = defineProps<RadioGroupItemProps>();

const delegatedProps = computed(() => {
    const { class: _class, ...delegated } = props;
    return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
    <RadioGroupItem
        data-slot="radio-group-item"
        v-bind="forwardedProps"
        :class="cn('radio-group__item', props.class)"
    >
        <span class="radio-group__face" aria-hidden="true">
            <RadioGroupIndicator
                data-slot="radio-group-indicator"
                class="radio-group__indicator"
            />
        </span>
    </RadioGroupItem>
</template>

<style src="./styles.css"></style>
