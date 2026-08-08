<script setup lang="ts">
import { NumberFieldDecrement, NumberFieldIncrement } from "reka-ui";
import { computed, inject, type HTMLAttributes } from "vue";
import { Minus, Plus } from "@lucide/vue";
import { Button } from "../button";
import { cn } from "../_shared/class-names";
import { numberFieldContextKey } from "./context";

/**
 * ONE public stepper, parameterised by direction.
 *
 * `NumberFieldIncrement` and `NumberFieldDecrement` were byte-twins modulo four
 * tokens (the Reka primitive, the glyph, the slot name, the modifier class), and
 * keeping both public names over one implementation costs either two wrapper SFCs
 * — at which point the fold saves nothing — or an `h()` factory, which is
 * indirection bought with nothing. Six-repo census: zero external consumers.
 *
 * The public name therefore diverges from Reka's pair; the SFC still wraps the
 * Reka primitives internally, switched on `direction`.
 */
export interface NumberFieldStepProps {
    class?: HTMLAttributes["class"];
    direction: "decrement" | "increment";
    disabled?: boolean;
}

const props = defineProps<NumberFieldStepProps>();

// The root provides unconditionally, so this cannot be absent inside a mounted
// NumberField — and outside one the Reka primitive below throws first.
const context = inject(numberFieldContextKey)!;

const step = computed(() =>
    props.direction === "increment" ? NumberFieldIncrement : NumberFieldDecrement,
);
const glyph = computed(() => (props.direction === "increment" ? Plus : Minus));
</script>

<template>
    <component
        :is="step"
        :data-slot="props.direction"
        :disabled="props.disabled"
        as-child
    >
        <!-- `secondary`, not `quiet`: a stepper that paints nothing at rest is a
             44×44 target the eye cannot find, and the field's own well is what it
             has to read against. The focus half of that defect is already closed
             upstream — the shared `.focus-ring` utility moved to `outline`, so a
             `box-shadow: none` emphasis can no longer erase an indicator. -->
        <Button
            emphasis="secondary"
            :size="context.size.value"
            iconOnly
            :class="
                cn(
                    'number-field__step',
                    `number-field__step--${props.direction}`,
                    props.class,
                )
            "
        >
            <slot>
                <component :is="glyph" aria-hidden="true" />
            </slot>
        </Button>
    </component>
</template>
