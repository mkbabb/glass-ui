<script lang="ts">
import type { HTMLAttributes } from "vue";
import type { Orientation } from "../_shared/axes";
import type { ControlProps } from "../_shared/control";
import type { Direction, FormFieldProps, PrimitiveProps } from "../_shared/primitive";
import type { SelectionValue } from "../_shared/selection";

export interface RadioGroupProps
    extends PrimitiveProps,
        FormFieldProps,
        ControlProps {
    modelValue?: SelectionValue;
    defaultValue?: SelectionValue;
    orientation?: Orientation;
    dir?: Direction;
    loop?: boolean;
    class?: HTMLAttributes["class"];
}

export interface RadioGroupEmits {
    "update:modelValue": [value: SelectionValue];
}
</script>

<script setup lang="ts">
import { computed } from "vue";
import { RadioGroupRoot, useForwardProps } from "reka-ui";
import { cn } from "../_shared/class-names";
import { controlStateAttrs } from "../_shared/control";

const props = withDefaults(defineProps<RadioGroupProps>(), {
    orientation: "vertical",
});
const emit = defineEmits<RadioGroupEmits>();

const delegatedProps = computed(() => {
    const { class: _class, invalid: _invalid, ...delegated } = props;
    return delegated;
});
const forwarded = useForwardProps(delegatedProps);

/* THE RUNTIME THROW IS GONE (ADJ-5). It re-policed at RUNTIME a contract the TYPE
 * surface already closes — `RadioGroupItemProps.value: SelectionValue` is the only
 * entry point a value can arrive through — and converted inputs Reka itself
 * round-trips correctly into a production crash. Fail-loud governs the library's
 * primary function; it is not a licence to re-check the compiler.
 *
 * ADJ-5'S STATED GROUND IS FALSE AT HEAD, and its outcome stands anyway — recorded
 * rather than quietly executed. The falsifier it was ruled on: "Checkbox narrows
 * Reka's emit to `CheckedState` and Switch to `boolean` through the identical
 * `useForwardPropsEmits` seam, no guard, no visible cast." They do — because their
 * Reka emits are ALREADY `boolean | 'indeterminate'` and `boolean`, so nothing is
 * being narrowed. `RadioGroupRoot` emits `AcceptableValue`, which admits `null` and
 * objects and is strictly WIDER than `SelectionValue`; under `strictFunctionTypes` a
 * handler accepting less than its caller may pass is unsound. `useForwardPropsEmits`
 * here is therefore not a style choice but a compile error, verbatim:
 *     Type '(value: SelectionValue) => void' is not assignable to type
 *     '(payload: AcceptableValue) => any'. … Type 'null' is not assignable to type
 *     'SelectionValue'.
 * So the competing arm was RIGHT that striking the throw needs an unchecked cast and
 * wrong that this justifies keeping the throw. This is that cast, sound because the
 * typed surface admits nothing else. Nor is the shape the "emit-doctrine fork" the
 * defect table called it: it is the library's ONE grammar for the
 * `SelectionValue`-over-`AcceptableValue` seam, live at `select/Select.vue` — and
 * minting a third answer here is the very defect (D13) this lane exists to close. */
function updateModelValue(value: unknown): void {
    emit("update:modelValue", value as SelectionValue);
}
</script>

<template>
    <RadioGroupRoot
        data-slot="radio-group"
        v-bind="{ ...forwarded, ...controlStateAttrs(props.invalid) }"
        :class="cn('radio-group', props.class)"
        @update:model-value="updateModelValue"
    >
        <slot />
    </RadioGroupRoot>
</template>

<style src="./styles.css"></style>
