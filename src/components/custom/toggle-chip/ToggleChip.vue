<script setup lang="ts">
/**
 * ToggleChip — accessible toggleable "chip" or "cell" selector, built
 * on reka-ui's Toggle root so it carries proper `aria-pressed` and
 * keyboard semantics. Pair with `variant="chip"` for inline horizontal
 * selectors or `variant="cell"` for square icon + label cards.
 *
 * Usage:
 *   <ToggleChip v-model:pressed="isActive" variant="chip">
 *     Label
 *   </ToggleChip>
 *
 * When multiple chips share an exclusive selection, wire them up via
 * `pressed` / `@update:pressed` rather than reaching for ToggleGroup —
 * this component is deliberately unopinionated about selection mode.
 */
import type { HTMLAttributes } from "vue";
import { Toggle, type ToggleEmits, type ToggleProps, useForwardPropsEmits } from "reka-ui";
import { cn } from "../../../utils";
import { toggleChipVariants, type ToggleChipVariants } from ".";

const props = defineProps<ToggleProps & {
    variant?: ToggleChipVariants["variant"];
    class?: HTMLAttributes["class"];
}>();

const emits = defineEmits<ToggleEmits>();

const forwarded = useForwardPropsEmits(
    () => {
        const { class: _class, variant: _variant, ...rest } = props;
        return rest;
    },
    emits,
);
</script>

<template>
    <Toggle
        v-bind="forwarded"
        :class="cn(toggleChipVariants({ variant: props.variant }), props.class)"
    >
        <slot />
    </Toggle>
</template>
