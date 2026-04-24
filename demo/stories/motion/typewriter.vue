<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
// Typewriter story — cycles multiple phrases, exposes speed + cursor controls.
import { computed, ref } from "vue";
import {
    TypewriterText,
    type TypewriterWord,
} from "@/components/custom/typewriter";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/utils/cn";

const phrases: TypewriterWord[] = [
    { text: "warm cream" },
    { text: "paper grain" },
    { text: "cartoon shadows" },
    { text: "audacious type" },
    { text: "spring physics" },
];

// Controls
const baseSpeed = ref<number[]>([120]);
const errorRate = ref<number[]>([1.5]);
const cursorVisible = ref(true);
const cursorBlink = ref(true);
const remountKey = ref(0);

// Read first element of the array-based slider model.
const speedMs = computed(() => baseSpeed.value[0] ?? 120);
const errorPct = computed(() => errorRate.value[0] ?? 1.5);
const errorProb = computed(() => errorPct.value / 100);

function restart(): void {
    remountKey.value += 1;
}
</script>

<template>
    <StoryPage>
        <!-- Hero display: Fraunces display type hosting the rotating phrase. -->
        <section
            :class="
                cn(
                    'flex items-center justify-center rounded-card border border-border bg-card',
                    'min-h-48 px-8 py-12 shadow-cartoon paper-grain-overlay',
                )
            "
        >
            <p class="font-display text-display-3 leading-tight text-foreground">
                Built on
                <span class="text-[var(--viz-fourier)]">
                    <TypewriterText
                        :key="remountKey"
                        :words="phrases"
                        :base-speed="speedMs"
                        :error-rate="errorProb"
                        :cursor-visible="cursorVisible"
                        :cursor-blink="cursorBlink"
                        :pause-after-type="2200"
                        :pause-after-delete="600"
                        :interactive="false"
                    />
                </span>
                .
            </p>
        </section>

        <!-- Secondary: single-line, monospace, for code-style typing. -->
        <section class="flex flex-col gap-2">
            <span class="text-admin-label text-muted-foreground">Single-line, monospace</span>
            <div
                :class="
                    cn(
                        'rounded-panel border border-border bg-background/50 px-4 py-3',
                        'font-mono-code text-small text-foreground',
                    )
                "
            >
                <span class="text-muted-foreground">$&nbsp;</span>
                <TypewriterText
                    :key="`cli-${remountKey}`"
                    text="npm install @mkbabb/glass-ui"
                    :base-speed="speedMs"
                    :error-rate="errorProb"
                    :cursor-visible="cursorVisible"
                    :cursor-blink="cursorBlink"
                    :loop="false"
                    :interactive="false"
                />
            </div>
        </section>

        <!-- Controls. -->
        <section
            :class="
                cn(
                    'grid grid-cols-1 gap-6 rounded-panel border border-border/60 bg-card/60 p-5',
                    'md:grid-cols-2',
                )
            "
        >
            <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                    <Label for="tw-speed">Base speed</Label>
                    <span class="font-mono-code text-small text-muted-foreground">
                        {{ speedMs }}ms
                    </span>
                </div>
                <Slider id="tw-speed" v-model="baseSpeed" :min="30" :max="300" :step="10" />
            </div>

            <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                    <Label for="tw-errors">Error rate</Label>
                    <span class="font-mono-code text-small text-muted-foreground">
                        {{ errorPct.toFixed(1) }}%
                    </span>
                </div>
                <Slider
                    id="tw-errors"
                    v-model="errorRate"
                    :min="0"
                    :max="8"
                    :step="0.5"
                />
            </div>

            <div class="flex items-center justify-between gap-3">
                <Label for="tw-cursor">Cursor</Label>
                <Switch id="tw-cursor" v-model="cursorVisible" />
            </div>

            <div class="flex items-center justify-between gap-3">
                <Label for="tw-blink">Blink</Label>
                <Switch id="tw-blink" v-model="cursorBlink" />
            </div>

            <div class="md:col-span-2 flex justify-end">
                <Button variant="secondary" @click="restart">Restart</Button>
            </div>
        </section>
    </StoryPage>
</template>
