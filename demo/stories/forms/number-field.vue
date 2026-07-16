<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import { ref } from "vue";
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from "@glass/components/number-field";
import { Label } from "@glass/components/label";

const quantity = ref<number>(3);
const tip = ref<number>(0.18);
const steps = ref<number>(50);
const bounded = ref<number>(5);
const invalidValue = ref<number>();
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
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput id="nf-qty-input" />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <p class="text-mono-caption text-muted-foreground">Integer · 0..99</p>
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
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput id="nf-tip-input" />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <p class="text-mono-caption text-muted-foreground">Percent · 0..100%</p>
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
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput id="nf-step-input" />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <p class="text-mono-caption text-muted-foreground">
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
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput id="nf-disabled-input" />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <p class="text-mono-caption text-muted-foreground">Locked</p>
            </div>

            <div class="flex flex-col gap-3">
                <Label id="nf-invalid-label" for="nf-invalid-input"
                    >Required amount</Label
                >
                <NumberField
                    v-model="invalidValue"
                    invalid
                    required
                    aria-labelledby="nf-invalid-label"
                    aria-describedby="nf-invalid-error"
                >
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput
                            id="nf-invalid-input"
                            aria-describedby="nf-invalid-error"
                        />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <p
                    id="nf-invalid-error"
                    class="text-mono-caption text-destructive"
                >
                    Enter an amount.
                </p>
            </div>
        </section>
    </StoryPage>
</template>
