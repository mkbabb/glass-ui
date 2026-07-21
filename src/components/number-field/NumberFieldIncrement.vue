<script setup lang="ts">
import { NumberFieldIncrement } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { Plus } from "@lucide/vue";
import { Button } from "../button";
import { cn } from "../_shared/class-names";

export interface NumberFieldIncrementProps {
    disabled?: boolean;
    class?: HTMLAttributes["class"];
}

const props = defineProps<NumberFieldIncrementProps>();
</script>

<template>
    <NumberFieldIncrement data-slot="increment" :disabled="props.disabled" as-child>
        <Button
            emphasis="quiet"
            size="lg"
            iconOnly
            :class="cn('number-field__step number-field__step--increment', props.class)"
        >
            <slot>
                <Plus aria-hidden="true" />
            </slot>
        </Button>
    </NumberFieldIncrement>
</template>
