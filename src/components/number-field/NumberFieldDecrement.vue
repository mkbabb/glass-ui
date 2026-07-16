<script setup lang="ts">
import { NumberFieldDecrement } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Minus } from "@lucide/vue";
import { Button } from "../button";
import { cn } from "../_shared/class-names";

export interface NumberFieldDecrementProps {
    disabled?: boolean;
    class?: HTMLAttributes["class"];
}

const props = defineProps<NumberFieldDecrementProps>();
</script>

<template>
    <NumberFieldDecrement data-slot="decrement" :disabled="props.disabled" as-child>
        <Button
            emphasis="quiet"
            size="lg"
            iconOnly
            :class="cn('number-field__step number-field__step--decrement', props.class)"
        >
            <slot>
                <Minus />
            </slot>
        </Button>
    </NumberFieldDecrement>
</template>
