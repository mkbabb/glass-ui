<script lang="ts">
export default { inheritAttrs: false };
</script>

<script setup lang="ts">
import { injectNumberFieldRootContext, NumberFieldInput } from "reka-ui";
import { computed, inject } from "vue";
import { cn } from "../_shared/class-names";
import { isAriaInvalid } from "../_shared/field/control";
import { numberFieldContextKey } from "./context";

// Both injections are REQUIRED, and the second one throws when this is mounted
// outside a NumberField — so the optional chaining that used to guard the first
// was theatre standing next to a real guard.
const context = inject(numberFieldContextKey)!;
const root = injectNumberFieldRootContext();
const state = computed(() =>
    root.disabled.value
        ? "disabled"
        : root.readonly.value
          ? "readonly"
          : isAriaInvalid(context.ariaInvalid.value)
            ? "invalid"
            : "default",
);
</script>

<template>
    <NumberFieldInput
        v-bind="$attrs"
        data-slot="input"
        data-kind="input"
        :data-size="context.size.value"
        :data-state="state"
        :aria-invalid="context.ariaInvalid.value"
        :aria-required="context.required.value || undefined"
        :class="cn('number-field__input field-control glass-control-edge')"
    />
</template>

<style src="../_shared/field/control.css"></style>
