<script lang="ts">
import type { HTMLAttributes } from "vue";
import type { PrimitiveProps } from "../_shared/primitive";
import type { SelectionValue } from "../_shared/selection";

export interface RadioGroupItemProps extends PrimitiveProps {
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
    <!-- In flow, at the register's 44px seat. The −13px margins this replaces bought
         a 44px hit box on an 18px layout footprint, and the tiling gap derived from
         them was ALREADY broken by the component's own demo route (gap-6 = 24px on an
         18px effective box = a 42px pitch under a 44px seat, i.e. a 2px overlap). At
         gap 0 the in-flow seat reproduces the shipped 44px pitch exactly — 18 + 26 =
         44 — so the group keeps its rhythm and the overlap becomes impossible. -->
    <RadioGroupItem
        data-slot="radio-group-item"
        v-bind="forwardedProps"
        :class="cn('control-bit tap-squish', props.class)"
    >
        <span class="control-bit__face" aria-hidden="true">
            <RadioGroupIndicator
                force-mount
                data-slot="radio-group-indicator"
                class="control-bit__mark radio-group__dot"
                aria-hidden="true"
            />
        </span>
    </RadioGroupItem>
</template>

<style src="./styles.css"></style>
