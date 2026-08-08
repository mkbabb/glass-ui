<script setup lang="ts">
import { Check, Minus } from "@lucide/vue";
import { computed, type HTMLAttributes } from "vue";
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "reka-ui";
import { type ControlProps, controlStateAttrs } from "../_shared/control";
import type { FormFieldProps, PrimitiveProps } from "../_shared/primitive";
import type { CheckedState, SelectionValue } from "../_shared/selection";

export interface CheckboxProps extends PrimitiveProps, FormFieldProps, ControlProps {
    modelValue?: CheckedState;
    defaultValue?: CheckedState;
    value?: SelectionValue;
    id?: string;
    class?: HTMLAttributes["class"];
}

const props = defineProps<CheckboxProps>();
const emit = defineEmits<{
    "update:modelValue": [value: CheckedState];
}>();
const delegatedProps = computed(() => {
    const { class: _class, invalid: _invalid, ...delegated } = props;
    return delegated;
});
const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
    <!-- The host is the SEAT and it is IN FLOW: `.control-bit` sizes it to the 44px
         target with margin box == border box, so `getBoundingClientRect` reads what
         the pointer actually hits. The absolutely-positioned `.checkbox__seat` span
         it replaces bled 14px past a 16px box in every direction and made the rect
         lie. `invalid` is stamped by the ONE shared grammar; `state` is Reka's. -->
    <CheckboxRoot
        v-slot="{ state }"
        v-bind="{ ...forwarded, ...controlStateAttrs(props.invalid) }"
        data-slot="checkbox"
        class="checkbox control-bit tap-squish"
        :class="props.class"
    >
        <span class="control-bit__face" aria-hidden="true">
            <!-- FORCE-MOUNTED (D4): the indicator used to mount ON state, so the
                 only checked-state motion in the whole triad was a fill cross-fade.
                 A node that does not exist cannot be transitioned. The Check/Minus
                 `v-if` INSIDE it is content, not entrance, and stays (ADJ-6). -->
            <CheckboxIndicator force-mount class="control-bit__mark" aria-hidden="true">
                <slot :state="state">
                    <Minus v-if="state === 'indeterminate'" :size="12" :stroke-width="3" />
                    <Check v-else :size="12" :stroke-width="3" />
                </slot>
            </CheckboxIndicator>
        </span>
    </CheckboxRoot>
</template>

<style src="./styles.css"></style>
