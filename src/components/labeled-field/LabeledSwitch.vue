<script setup lang="ts">
import { computed } from "vue";
import { Switch } from "../switch";
import LabeledField from "./LabeledField.vue";
import type { LabeledSwitchProps } from "./types";

defineOptions({ name: "LabeledSwitch" });

/* `modelValue: undefined` for the same reason as `Chip.vue`'s — the prop is bound
 * unconditionally onto `<Switch>` below, so the absent-Boolean cast arrived there as an
 * explicit `false` and pinned an uncontrolled field shut. The type widens to optional in
 * the same edit: the runtime never enforced required, and `<Switch>` itself publishes
 * `modelValue?: boolean`. */
const props = withDefaults(defineProps<LabeledSwitchProps>(), {
    modelValue: undefined,
});
const emit = defineEmits<{ "update:modelValue": [value: boolean] }>();

const controlProps = computed(() => {
    const {
        label: _label,
        description: _description,
        requirement: _requirement,
        layout: _layout,
        errorLive: _errorLive,
        invalid: _invalid,
        modelValue: _modelValue,
        ...control
    } = props;
    return control;
});
</script>

<template>
    <LabeledField
        :label="label"
        :description="description"
        :requirement="required ? 'required' : requirement"
        :layout="layout"
        :error-live="errorLive"
        :invalid="invalid"
        :disabled="disabled"
    >
        <template #default="{ controlId, labelledBy, describedBy, errorId, required: effectiveRequired }">
            <Switch
                v-bind="controlProps"
                :id="controlId"
                :model-value="modelValue"
                :aria-labelledby="labelledBy"
                :aria-describedby="describedBy"
                :aria-errormessage="errorId"
                :invalid="invalid"
                :required="effectiveRequired"
                @update:model-value="emit('update:modelValue', $event)"
            />
        </template>
        <template v-if="$slots.error" #error><slot name="error" /></template>
    </LabeledField>
</template>
