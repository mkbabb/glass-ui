<script setup lang="ts" generic="T extends string">
// LabeledSelect — the storybook's own labelled-select preset.
//
// DEMO-PRIVATE, and deliberately so (BK #57, DAG-RULINGS 4.11): an `items` array
// is a *preset*, not a composition primitive, and it was the single import that
// made `@mkbabb/glass-ui/labeled-field` drag the whole overlay chain behind it.
// The library ships the anatomy (`LabeledField`) and the three relays that add
// no taxonomy of their own; a caller who wants a select in that anatomy composes
// `<LabeledField>` + `<Select>` exactly as this file does, in ~30 lines.
import { computed } from "vue";
import { LabeledField } from "@glass/components/labeled-field";
import type { LabeledFieldCommonProps } from "@glass/components/labeled-field";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@glass/components/select";

defineOptions({ name: "LabeledSelect" });

const props = defineProps<
    LabeledFieldCommonProps & {
        modelValue: T;
        items: readonly (T | { value: T; label: string })[];
        open?: boolean;
        placeholder?: string;
        invalid?: boolean;
        disabled?: boolean;
        required?: boolean;
    }
>();
const emit = defineEmits<{
    "update:modelValue": [value: T];
    "update:open": [value: boolean];
}>();

// The VALUE is the contract; the LABEL is what a reader is owed. A bare string is
// an option whose label is its own value, so the two forms share one render path
// and no caller keeps a second lookup table alive to name its own options.
const options = computed(() =>
    props.items.map((item) =>
        typeof item === "string" ? { value: item, label: item } : item,
    ),
);

// The round trip is closed: reka hands back exactly the string one of our own
// options registered, so the narrowing is a fact about `items`, not a hope.
function select(next: unknown): void {
    emit("update:modelValue", String(next) as T);
}
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
            <Select
                :model-value="modelValue"
                :open="open"
                :disabled="disabled"
                :required="effectiveRequired"
                @update:open="emit('update:open', $event)"
                @update:model-value="select"
            >
                <SelectTrigger
                    :id="controlId"
                    :aria-labelledby="labelledBy"
                    :aria-describedby="describedBy"
                    :aria-errormessage="errorId"
                    :aria-invalid="invalid || undefined"
                >
                    <SelectValue :placeholder="placeholder" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem
                            v-for="option in options"
                            :key="option.value"
                            :value="option.value"
                        >
                            {{ option.label }}
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </template>
        <template v-if="$slots.error" #error><slot name="error" /></template>
    </LabeledField>
</template>
