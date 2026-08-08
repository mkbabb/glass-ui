<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue";
import { SwitchRoot, SwitchThumb, useForwardPropsEmits } from "reka-ui";
import { cn } from "../_shared/class-names";
import { type ControlProps, controlStateAttrs } from "../_shared/control";
import type { FormFieldProps, PrimitiveProps } from "../_shared/primitive";
import type { SelectionValue } from "../_shared/selection";

export interface SwitchProps extends PrimitiveProps, FormFieldProps, ControlProps {
    modelValue?: boolean;
    defaultValue?: boolean;
    id?: string;
    value?: SelectionValue;
    class?: HTMLAttributes["class"];
}

const props = defineProps<SwitchProps>();
const emit = defineEmits<{
    "update:modelValue": [value: boolean];
}>();

/* `value` is published at the triad's ONE scalar type (D13: three `modelValue`
 * nullability grammars and a `value?: string` against `SelectionValue` were four
 * answers to one question). Reka's `SwitchRoot` takes `value?: string`, so the seam
 * COERCES rather than casts — and that is not a concession, it is what the platform
 * does: the value lands in a hidden form input, and `FormData` stringifies it either
 * way. `String(2)` and `2` submit identically; the public surface simply stops
 * pretending only one of them is allowed. */
const delegatedProps = computed(() => {
    const { class: _class, invalid: _invalid, value, ...delegated } = props;
    return { ...delegated, value: value === undefined ? undefined : String(value) };
});
const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
    <!-- The `size` axis is GONE (R11): a role's radius is fixed by its role, so a
         size rung breaks `r = 0.30 × face` at two of three stops, `--control-h-*`
         resolve 36/40/44 rather than the claimed uniform 44, and zero external sites
         passed it. The silhouette itself is byte-kept (ADJ-1) — 44 × 24 with a 1px
         pad against a 1px perimeter is symmetric at rest AND checked, and always
         was; the refuted "fix" to 48 × 24 / pad 2 is what would have broken it. -->
    <SwitchRoot
        data-slot="switch"
        v-bind="{ ...forwarded, ...controlStateAttrs(props.invalid) }"
        :class="cn('switch control-bit tap-squish', props.class)"
    >
        <span class="control-bit__face" aria-hidden="true">
            <!-- The thumb IS the switch's mark and keeps its own translate channel;
                 it does not compose `.control-bit__mark`, whose job is a scale/opacity
                 entrance a travelling thumb must not have. -->
            <SwitchThumb class="switch__thumb" />
        </span>
    </SwitchRoot>
</template>

<style src="./styles.css"></style>
