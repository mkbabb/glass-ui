<script setup lang="ts">
import { computed, useId } from "vue";
import { Label } from "../label";
import type { LabeledFieldProps, LabeledFieldSlotProps } from "./types";

defineOptions({ name: "LabeledField" });

const props = withDefaults(defineProps<LabeledFieldProps>(), {
    disabled: false,
    errorLive: "polite",
    invalid: false,
    layout: "default",
    controlLabelable: true,
});

const slots = defineSlots<{
    default(props: LabeledFieldSlotProps): unknown;
    error?(): unknown;
}>();
const id = useId();
const controlId = `${id}-control`;
const labelId = `${id}-label`;
const descriptionId = `${id}-description`;
const errorId = `${id}-error`;
const errorMessageId = computed(() => props.invalid && slots.error ? errorId : undefined);
const describedBy = computed(() => [
    props.description ? descriptionId : undefined,
    errorMessageId.value,
].filter(Boolean).join(" ") || undefined);
const required = computed(() => props.requirement === "required");
</script>

<template>
    <div
        class="labeled-field"
        data-slot="labeled-field"
        :data-layout="layout"
        :data-invalid="invalid || undefined"
        :data-disabled="disabled || undefined"
    >
        <div class="labeled-field-copy">
            <Label
                :id="labelId"
                :for="controlLabelable ? controlId : undefined"
                :requirement="requirement"
                :disabled="disabled"
            >
                {{ label }}
            </Label>
            <p v-if="description" :id="descriptionId" class="labeled-field-description">
                {{ description }}
            </p>
        </div>
        <div class="labeled-field-control">
            <slot
                :control-id="controlId"
                :labelled-by="labelId"
                :described-by="describedBy"
                :error-id="errorMessageId"
                :invalid="invalid"
                :disabled="disabled"
                :required="required"
            />
            <p
                v-if="errorMessageId"
                :id="errorId"
                class="labeled-field-error"
                :aria-live="errorLive === 'off' ? undefined : errorLive"
            >
                <slot name="error" />
            </p>
        </div>
    </div>
</template>

<style scoped>
.labeled-field,
.labeled-field-copy,
.labeled-field-control {
    display: grid;
    min-inline-size: 0;
}

.labeled-field {
    gap: calc(var(--spacing) * 2);
    inline-size: 100%;
}

.labeled-field-copy,
.labeled-field-control {
    gap: var(--spacing);
}

.labeled-field-description,
.labeled-field-error {
    margin: 0;
    font-size: var(--type-small);
    line-height: var(--type-leading-small);
}

.labeled-field-description {
    color: var(--muted-foreground);
}

.labeled-field-error {
    color: var(--destructive);
}

.labeled-field[data-layout="horizontal"] {
    grid-template-columns: minmax(8rem, 0.382fr) minmax(0, 1fr);
    gap: calc(var(--spacing) * 4);
    align-items: start;
}

@media (max-width: 36rem) {
    .labeled-field[data-layout="horizontal"] {
        grid-template-columns: minmax(0, 1fr);
        gap: calc(var(--spacing) * 2);
    }
}
</style>
