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

        <!--
            Label-binding contract. The accessible name belongs on the inner
            <NumberFieldInput> (the focusable spinbutton), NOT on the NumberField
            group wrapper. Bind it via one of three channels — each lands the name
            on the input below.
        -->
        <section class="grid grid-cols-1 gap-10 md:grid-cols-3">
            <!-- Channel 1: <Label for> → input id. -->
            <div class="flex flex-col gap-3">
                <Label for="nf-label-input">Servings</Label>
                <NumberField v-model="quantity" :min="0">
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput id="nf-label-input" />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <p class="text-mono-caption text-muted-foreground">
                    <code class="fira-code">&lt;Label for&gt;</code> → input id
                </p>
            </div>

            <!-- Channel 2: aria-labelledby → external label id. -->
            <div class="flex flex-col gap-3">
                <span id="nf-aria-by" class="text-admin-label text-foreground">Portions</span>
                <NumberField v-model="quantity" :min="0">
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput aria-labelledby="nf-aria-by" />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <p class="text-mono-caption text-muted-foreground">
                    <code class="fira-code">aria-labelledby</code>
                </p>
            </div>

            <!-- Channel 3: aria-label directly on the input. -->
            <div class="flex flex-col gap-3">
                <NumberField v-model="quantity" :min="0">
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput aria-label="Helpings" />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <p class="text-mono-caption text-muted-foreground">
                    <code class="fira-code">aria-label</code> on input
                </p>
            </div>
        </section>
    </StoryPage>
</template>
