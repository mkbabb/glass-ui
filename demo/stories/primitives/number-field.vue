<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Hash } from "lucide-vue-next";
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from "@/components/ui/number-field";
import { Label } from "@/components/ui/label";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { IconStamp } from "@/components/custom/icon-stamp";

const quantity = ref<number>(3);
const tip = ref<number>(0.18);
const steps = ref<number>(50);
const bounded = ref<number>(5);
</script>

<template>
    <StoryPage>
        <!-- Hero — section-9 chassis. Numerals are the gesture. -->
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <div
                class="pointer-events-none absolute inset-0 -z-10 opacity-40"
                :style="{
                    backgroundImage: `
                        radial-gradient(ellipse 65% 50% at 18% 22%, color-mix(in srgb, var(--section-color-9) 35%, transparent) 0%, transparent 65%),
                        radial-gradient(ellipse 80% 65% at 92% 80%, var(--rainbow-pastel-yellow) 0%, transparent 60%)
                    `,
                }"
            />

            <div class="relative flex flex-col gap-[var(--space-phi-2)]">
                <p class="section-label" :style="{ color: 'var(--section-color-9)' }">
                    primitives · number-field · § 9
                </p>
                <div class="flex items-start gap-[var(--space-phi-3)]">
                    <IconStamp size="2xl" frame="stamp" accent="section-9" aria-hidden="true">
                        <Hash />
                    </IconStamp>
                    <div class="flex flex-col gap-[var(--space-phi-1)]">
                        <DisplayHero
                            size="display-3"
                            variation="wonk"
                            class="leading-[0.95]"
                            :style="{ color: 'var(--section-color-9)' }"
                        >
                            Step, scrub, snap.
                        </DisplayHero>
                        <p class="text-prose max-w-prose text-foreground/80">
                            A numeric field is the smallest control with the largest
                            contract — bound, step, format, lock. Four idioms; one
                            primitive. Tabular numerals throughout; no jitter under change.
                        </p>
                    </div>
                </div>
                <FlourishDivider tone="section-9" class="mt-[var(--space-phi-2)]" />
            </div>
        </CreamSurface>

        <section class="grid grid-cols-1 gap-[var(--space-phi-4)] md:grid-cols-2">
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
