<script setup lang="ts">
import { useAttrs } from "vue";
import { cn } from "../_shared/class-names";
import { useFieldControlState } from "../_shared/field/control";
import type { InputProps } from "./types";

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<InputProps>(), {
    invalid: false,
    size: "md",
    type: "text",
});

// The native form/constraint attributes (`autocomplete`, `form`, `maxlength`,
// `pattern`, `placeholder`, `required`, …) are NOT re-declared as props and are not
// re-bound here: they ride `$attrs`, which `useFieldControlState` forwards whole.
// Declaring them cost 15 lines of `nativeProps` plus ~9 type rows to reproduce
// exactly what the platform already gives, and the only reason the re-declaration
// existed is `inheritAttrs: false` — which is here so the class/data-attrs land on
// the input rather than being merged twice, not so the input can be re-specified.
// `default: ""` is not decoration: an empty text control's value IS the empty
// string, and declaring it keeps the emitted type narrow (`string | number`)
// for every wrapper that re-emits it. `useVModel` + a hand-written
// `defineEmits` + a `defaultValue` prop delivered the same thing in three
// pieces, one of which (`defaultValue`) had three demo callers and no other.
const modelValue = defineModel<string | number>({ default: "" });
const attrs = useAttrs();
const { ariaInvalid, forwardedAttrs, state } = useFieldControlState(props, attrs);
</script>

<template>
    <input
        v-bind="forwardedAttrs"
        v-model="modelValue"
        :type="props.type"
        :disabled="props.disabled"
        :readonly="props.readonly"
        data-slot="input"
        data-kind="input"
        :data-size="size"
        :data-state="state"
        :aria-invalid="ariaInvalid"
        :class="cn('field-control glass-control-edge', props.class)"
    />
</template>

<style src="../_shared/field/control.css"></style>
