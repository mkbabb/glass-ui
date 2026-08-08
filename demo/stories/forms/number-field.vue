<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import { ref } from "vue";
import {
    NumberField,
    NumberFieldInput,
    NumberFieldStep,
} from "@glass/components/number-field";
import { Label } from "@glass/components/label";
import type { ControlSize } from "@glass/components/_shared";

const quantity = ref<number>(3);
const tip = ref<number>(0.18);
const steps = ref<number>(50);
const bounded = ref<number>(5);
// F19's cure: the required-numeric specimen is POPULATED. It used to render EMPTY
// wearing a full destructive border at rest with no asterisk — a field that had
// never been touched, told the user it was wrong.
const amount = ref<number>(42);
const invalidValue = ref<number>(120);

const sizes: readonly ControlSize[] = ["sm", "md", "lg"];
</script>

<template>
    <StoryPage>
        <section class="grid grid-cols-1 gap-10 md:grid-cols-2">
            <!-- Plain integer counter. -->
            <div class="flex flex-col gap-3">
                <Label id="nf-qty-label" for="nf-qty-input">Quantity</Label>
                <NumberField
                    v-model="quantity"
                    :min="0"
                    :max="99"
                    :format-options="{ maximumFractionDigits: 0 }"
                    aria-labelledby="nf-qty-label"
                >
                    <NumberFieldStep direction="decrement" />
                    <NumberFieldInput id="nf-qty-input" />
                    <NumberFieldStep direction="increment" />
                </NumberField>
                <p class="text-small text-muted-foreground">Integer · 0..99</p>
            </div>

            <!-- Decimal + percent formatting. -->
            <div class="flex flex-col gap-3">
                <Label id="nf-tip-label" for="nf-tip-input">Tip rate</Label>
                <NumberField
                    v-model="tip"
                    :min="0"
                    :max="1"
                    :step="0.01"
                    locale="de-DE"
                    :format-options="{ style: 'percent' }"
                    aria-labelledby="nf-tip-label"
                >
                    <NumberFieldStep direction="decrement" />
                    <NumberFieldInput id="nf-tip-input" />
                    <NumberFieldStep direction="increment" />
                </NumberField>
                <p class="text-small text-muted-foreground">Percent · 0..100%</p>
            </div>

            <!-- Stepped integer. -->
            <div class="flex flex-col gap-3">
                <Label id="nf-step-label" for="nf-step-input">Step by 5</Label>
                <NumberField
                    v-model="steps"
                    :min="0"
                    :max="100"
                    :step="5"
                    aria-labelledby="nf-step-label"
                >
                    <NumberFieldStep direction="decrement" />
                    <NumberFieldInput id="nf-step-input" />
                    <NumberFieldStep direction="increment" />
                </NumberField>
                <p class="text-small text-muted-foreground">
                    Moves in fives · use ± or arrow keys
                </p>
            </div>

            <!-- Disabled. -->
            <div class="flex flex-col gap-3">
                <Label id="nf-disabled-label" for="nf-disabled-input">Disabled</Label>
                <NumberField
                    v-model="bounded"
                    disabled
                    aria-labelledby="nf-disabled-label"
                >
                    <NumberFieldStep direction="decrement" />
                    <NumberFieldInput id="nf-disabled-input" />
                    <NumberFieldStep direction="increment" />
                </NumberField>
                <p class="text-small text-muted-foreground">Locked</p>
            </div>

            <!-- REQUIRED, and satisfied: a pristine required field paints nothing
                 destructive on any channel. -->
            <div class="flex flex-col gap-3">
                <Label id="nf-amount-label" for="nf-amount-input" requirement="required">
                    Amount
                </Label>
                <NumberField
                    v-model="amount"
                    required
                    :min="0"
                    aria-labelledby="nf-amount-label"
                >
                    <NumberFieldStep direction="decrement" />
                    <NumberFieldInput id="nf-amount-input" />
                    <NumberFieldStep direction="increment" />
                </NumberField>
                <p class="text-small text-muted-foreground">
                    Required and answered — no destructive paint at rest
                </p>
            </div>

            <!-- INVALID, and it is actually wrong: out of range, with the reason. -->
            <div class="flex flex-col gap-3">
                <Label id="nf-invalid-label" for="nf-invalid-input" requirement="required">
                    Percentage of budget
                </Label>
                <NumberField
                    v-model="invalidValue"
                    invalid
                    required
                    :min="0"
                    :max="100"
                    aria-labelledby="nf-invalid-label"
                    aria-describedby="nf-invalid-error"
                >
                    <NumberFieldStep direction="decrement" />
                    <NumberFieldInput
                        id="nf-invalid-input"
                        aria-describedby="nf-invalid-error"
                    />
                    <NumberFieldStep direction="increment" />
                </NumberField>
                <p id="nf-invalid-error" class="text-small text-destructive">
                    120 is over the 100% ceiling.
                </p>
            </div>
        </section>

        <!-- The size axis NumberField never had: it hard-pinned `lg` (44px) while
             calling itself the "md" of the family, one route away from a 40px
             Input. Three rungs, threaded to the spinbutton AND both steppers from
             one prop, and the stepper clearance follows because it reads the
             resolved height off the input itself. -->
        <section class="mt-10 flex flex-col gap-6">
            <div v-for="size in sizes" :key="size" class="flex flex-col gap-3">
                <Label :id="`nf-size-${size}-label`" :for="`nf-size-${size}-input`">
                    size="{{ size }}"
                </Label>
                <NumberField
                    :size="size"
                    :model-value="12"
                    :aria-labelledby="`nf-size-${size}-label`"
                >
                    <NumberFieldStep direction="decrement" />
                    <NumberFieldInput :id="`nf-size-${size}-input`" />
                    <NumberFieldStep direction="increment" />
                </NumberField>
            </div>
        </section>
    </StoryPage>
</template>
