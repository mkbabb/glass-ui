<script setup lang="ts">
import { ref } from "vue";
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from "@/components/ui/number-field";
import { Label } from "@/components/ui/label";

const quantity = ref<number>(3);
const tip = ref<number>(0.18);
const steps = ref<number>(50);
const bounded = ref<number>(5);
</script>

<template>
    <article class="flex flex-col gap-14">
        <header class="flex flex-col gap-3">
            <p class="text-admin-label text-muted-foreground">primitives · number-field</p>
            <h1 class="text-title text-foreground">Number Field</h1>
            <p class="text-prose max-w-2xl text-muted-foreground">
                Spin-button input with decrement / increment controls, keyboard arrow and
                wheel support, locale formatting, and min / max / step bounds. Ships as a
                compound of <code class="font-mono-code">NumberField</code> plus
                <code class="font-mono-code">Content</code>,
                <code class="font-mono-code">Decrement</code>,
                <code class="font-mono-code">Input</code>,
                <code class="font-mono-code">Increment</code>.
            </p>
        </header>

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
    </article>
</template>
