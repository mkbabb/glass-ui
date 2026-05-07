<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from "../../../src/components/ui/number-field";
import { Label } from "../../../src/components/ui/label";

const quantity = ref<number>(3);
const tip = ref<number>(0.18);
const steps = ref<number>(50);
const bounded = ref<number>(5);
</script>

<template>
    <StoryPage>
        <section class="grid grid-cols-1 gap-10 md:grid-cols-2">
            <!-- Plain integer counter. -->
            <div class="flex flex-col gap-3">
                <Label for="nf-qty">Quantity</Label>
                <NumberField id="nf-qty" v-model="quantity" :min="0" :max="99">
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <p class="text-mono-caption text-muted-foreground">Integer · 0..99</p>
            </div>

            <!-- Decimal + percent formatting. -->
            <div class="flex flex-col gap-3">
                <Label for="nf-tip">Tip rate</Label>
                <NumberField
                    id="nf-tip"
                    v-model="tip"
                    :min="0"
                    :max="1"
                    :step="0.01"
                    :format-options="{ style: 'percent' }"
                >
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <p class="text-mono-caption text-muted-foreground">Percent · 0..100%</p>
            </div>

            <!-- Stepped integer. -->
            <div class="flex flex-col gap-3">
                <Label for="nf-step">Step by 5</Label>
                <NumberField id="nf-step" v-model="steps" :min="0" :max="100" :step="5">
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <p class="text-mono-caption text-muted-foreground">Step 5 · 0..100</p>
            </div>

            <!-- Disabled. -->
            <div class="flex flex-col gap-3">
                <Label for="nf-disabled">Disabled</Label>
                <NumberField id="nf-disabled" v-model="bounded" disabled>
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <p class="text-mono-caption text-muted-foreground">Locked</p>
            </div>
        </section>
    </StoryPage>
</template>
