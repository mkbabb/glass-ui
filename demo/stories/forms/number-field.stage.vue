<script setup lang="ts">
// Number Field's stage: a whole-number quantity and a percentage, each with steppers.
import { ref } from "vue";
import { Label } from "@glass/components/label";
import {
    NumberField,
    NumberFieldInput,
    NumberFieldStep,
} from "@glass/components/number-field";

const quantity = ref(3);
const tip = ref(0.18);
</script>

<template>
    <div class="number-stage">
        <div class="number-stage-field">
            <Label id="number-qty-label" for="number-qty">Quantity</Label>
            <NumberField
                v-model="quantity"
                size="lg"
                :min="0"
                :max="99"
                :format-options="{ maximumFractionDigits: 0 }"
                aria-labelledby="number-qty-label"
            >
                <NumberFieldStep direction="decrement" />
                <NumberFieldInput id="number-qty" />
                <NumberFieldStep direction="increment" />
            </NumberField>
        </div>
        <div class="number-stage-field">
            <Label id="number-tip-label" for="number-tip">Tip</Label>
            <NumberField
                v-model="tip"
                size="lg"
                :min="0"
                :max="1"
                :step="0.01"
                :format-options="{ style: 'percent' }"
                aria-labelledby="number-tip-label"
            >
                <NumberFieldStep direction="decrement" />
                <NumberFieldInput id="number-tip" />
                <NumberFieldStep direction="increment" />
            </NumberField>
        </div>
    </div>
</template>

<style scoped>
.number-stage {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 14rem));
    gap: var(--sp-5);
    inline-size: min(100cqi, 30rem);
}

.number-stage-field {
    display: grid;
    gap: var(--sp-2);
}

@container (inline-size < 26rem) {
    .number-stage {
        grid-template-columns: minmax(0, 1fr);
    }
}
</style>
