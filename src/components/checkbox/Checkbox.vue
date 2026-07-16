<script setup lang="ts">
import { Check, Minus } from "@lucide/vue";
import { computed, type HTMLAttributes } from "vue";
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "reka-ui";
import type { FormFieldProps, PrimitiveProps } from "../_shared/primitive";
import type { CheckedState, SelectionValue } from "../_shared/selection";

export interface CheckboxProps extends PrimitiveProps, FormFieldProps {
    modelValue?: CheckedState | null;
    defaultValue?: CheckedState;
    disabled?: boolean;
    value?: SelectionValue;
    id?: string;
    class?: HTMLAttributes["class"];
}

const props = defineProps<CheckboxProps>();
const emit = defineEmits<{
    "update:modelValue": [value: CheckedState];
}>();
const delegatedProps = computed(() => {
    const { class: _class, ...delegated } = props;
    return delegated;
});
const forwarded = useForwardPropsEmits(delegatedProps, emit);

function checkedState(state: CheckedState): CheckedState {
    return state;
}
</script>

<template>
    <CheckboxRoot
        v-slot="{ state }"
        v-bind="forwarded"
        data-slot="checkbox"
        class="checkbox control-surface glass-control-edge focus-ring tap-squish"
        :class="props.class"
    >
        <span class="checkbox__seat" aria-hidden="true" />
        <CheckboxIndicator class="checkbox__indicator" aria-hidden="true">
            <slot :state="checkedState(state)">
                <Minus v-if="state === 'indeterminate'" :size="12" :stroke-width="3" />
                <Check v-else :size="12" :stroke-width="3" />
            </slot>
        </CheckboxIndicator>
    </CheckboxRoot>
</template>

<style src="./styles.css"></style>
