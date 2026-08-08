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

/* The named space rungs, never `calc(var(--spacing) * n)`: the ranks carry the ONE
   width-conditional step-down (`tokens/sizing.css` §1.1), so the field tightens on a
   narrow viewport for free instead of re-deciding its own spacing at its own
   breakpoint. Copy→control is one rung under the field's own gap, which is what
   makes the label read as attached to its control rather than floating between two —
   above the 768px floor only; at or below it `--space-residue` and `--space-atom` both
   land on 4px and the two gaps converge. */
.labeled-field {
    gap: var(--space-atom);
    inline-size: 100%;
}

.labeled-field-copy,
.labeled-field-control {
    gap: var(--space-residue);
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

/* Side-by-side, the two columns are still ONE object, so they sit on the within-field
   rung (`--space-body`, the "edge" gap of `tokens/color-radius.css` §1.2) — one rung
   above the stacked gap because a horizontal seam needs more air than a vertical one,
   and a rung below `--space-family`, which is what separates sibling FIELDS. */
.labeled-field[data-layout="horizontal"] {
    grid-template-columns: minmax(8rem, 0.382fr) minmax(0, 1fr);
    gap: var(--space-body);
    align-items: start;
}

@media (max-width: 36rem) {
    .labeled-field[data-layout="horizontal"] {
        grid-template-columns: minmax(0, 1fr);
        /* Collapsed to the stacked layout, it returns to the stacked rung — the same
           token the default arm declares, not a second decision about spacing. */
        gap: var(--space-atom);
    }
}
</style>
