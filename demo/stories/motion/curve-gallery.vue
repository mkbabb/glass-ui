<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { SpringProgress } from "@mkbabb/keyframes.js";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Button } from "@glass/components/button";
import {
    EasingConfigurator,
    type EasingPickerValue,
} from "@glass/components/easing";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@glass/components/select";
import {
    SPRING_PRESETS,
    springPreset,
    type SpringPresetName,
} from "@glass/composables/motion/spring/springPresets";

const preset = ref<SpringPresetName>("snappy");
const activePreset = computed(() => springPreset(preset.value));
const progress = ref(0);
const velocity = ref(0);
const target = ref(0);
let spring: SpringProgress | undefined;
let unsubscribe: (() => void) | undefined;

function disposeSpring(): void {
    unsubscribe?.();
    spring?.dispose();
    unsubscribe = undefined;
    spring = undefined;
}

function resetSpring(): void {
    disposeSpring();
    progress.value = 0;
    velocity.value = 0;
    target.value = 0;
}

function selectPreset(value: unknown): void {
    if (typeof value === "string" && SPRING_PRESETS.some((row) => row.name === value)) {
        preset.value = value as SpringPresetName;
        resetSpring();
    }
}

function move(): void {
    const row = activePreset.value;
    const nextTarget = target.value === 0 ? 1 : 0;
    const initial = progress.value;
    const initialVelocity = velocity.value;

    disposeSpring();
    spring = new SpringProgress({
        response: row.response,
        dampingFraction: row.dampingFraction,
        initial,
        initialVelocity,
        respectReducedMotion: true,
    });
    unsubscribe = spring.subscribe((value, nextVelocity) => {
        progress.value = value;
        velocity.value = nextVelocity;
    });
    target.value = nextTarget;
    spring.target = nextTarget;
    spring.play();
}

const overlayKey = ref(0);
const bezier = ref<EasingPickerValue>();
const steps = ref<EasingPickerValue>();

onBeforeUnmount(disposeSpring);
</script>

<template>
    <StoryPage>
        <StorySection
            label="Physical vocabulary"
            blurb="Choose a motion character, then reverse the target mid-flight to see momentum carry continuously through the turn."
        >
            <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
                <div
                    class="relative h-40 overflow-hidden rounded-card border border-border/60 bg-background/40 paper-grain-overlay"
                >
                    <div class="absolute inset-x-6 top-1/2 h-px bg-border/60" />
                    <div
                        class="glass-resting absolute left-6 top-1/2 flex h-16 w-24 items-center justify-center rounded-panel text-small font-semibold text-foreground shadow-cartoon-sm will-change-transform"
                        :style="{
                            transform: `translate3d(${progress * 8.5}rem, -50%, 0) rotate(${progress * 3}deg) scale(${1 + progress * 0.04})`,
                        }"
                    >
                        {{ preset }}
                    </div>
                </div>

                <div class="glass-quiet flex flex-col gap-4 rounded-card p-4">
                    <Select :model-value="preset" @update:model-value="selectPreset">
                        <SelectTrigger aria-label="Spring preset">
                            <SelectValue placeholder="Choose a preset" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-for="row in SPRING_PRESETS"
                                :key="row.name"
                                :value="row.name"
                            >
                                {{ row.name }}
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <dl class="grid grid-cols-2 gap-x-3 gap-y-2 text-small">
                        <dt class="text-muted-foreground">response</dt>
                        <dd class="fira-code text-right">
                            {{ activePreset.response }}s
                        </dd>
                        <dt class="text-muted-foreground">damping</dt>
                        <dd class="fira-code text-right">
                            ζ{{ activePreset.dampingFraction }}
                        </dd>
                        <dt class="text-muted-foreground">velocity</dt>
                        <dd class="fira-code text-right">{{ velocity.toFixed(2) }}</dd>
                    </dl>

                    <div class="flex gap-2">
                        <Button size="sm" @click="move">
                            {{ target === 0 ? "Move" : "Return" }}
                        </Button>
                        <Button size="sm" emphasis="quiet" @click="resetSpring">
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
        </StorySection>

        <StorySection
            label="Transition grammar"
            blurb="The surface below mounts through Glass's real overlay register: spatial bloom on the named spring and its own clock, opacity on the effects curve, and a no-overshoot exit."
        >
            <div class="grid gap-4 md:grid-cols-[minmax(0,1fr)_18rem]">
                <div
                    class="relative flex min-h-48 items-center justify-center overflow-hidden rounded-card border border-border/60 bg-background/40 paper-grain-overlay"
                >
                    <div
                        :key="overlayKey"
                        class="glass-floating glass-reveal rounded-panel border px-6 py-5 shadow-cartoon-sm"
                        data-state="open"
                        data-reveal="overlay"
                    >
                        <p class="text-subheading text-foreground">
                            Material arrives as one layer.
                        </p>
                        <p class="mt-1 text-small text-muted-foreground">
                            scale · fade · decongest
                        </p>
                    </div>
                </div>

                <div class="flex flex-col justify-between gap-4">
                    <ul class="space-y-3 text-small">
                        <li>
                            <span class="text-muted-foreground">Spatial</span>
                            <code class="ml-2">--enter-overlay-spring</code>
                        </li>
                        <li>
                            <span class="text-muted-foreground">Clock</span>
                            <code class="ml-2">--enter-overlay-clock</code>
                        </li>
                        <li>
                            <span class="text-muted-foreground">Exit</span>
                            <code class="ml-2">--ease-out</code>
                        </li>
                    </ul>
                    <Button size="sm" @click="overlayKey++">Replay arrival</Button>
                </div>
            </div>
        </StorySection>

        <!-- The curve authoring surfaces adopt the ONE configurator anatomy
             (BJ.W-CONFIGURATOR-STD G-CFG-5): BOTH editors are now
             <EasingConfigurator> (picker seated in a <ConfiguratorLayer>/
             <ConfiguratorRow>), reading the shared card grammar instead of one
             carded + one bare. `items-start` stops the shorter editor's stage
             from stretching to its sibling's height and painting an empty
             bottom void (the F31 over-height defect). -->
        <StorySection
            heading="Authoring boundary"
            level="title"
            blurb="Shape a reusable curve with keyboard-accessible controls and compare continuous and stepped timing side by side."
        >
            <div class="grid items-start gap-6 lg:grid-cols-2">
                <EasingConfigurator
                    v-model="bezier"
                    label="Continuous timing"
                    :name="bezier?.css"
                    mode="bezier"
                />
                <EasingConfigurator
                    v-model="steps"
                    label="Discrete timing"
                    :name="steps?.css"
                    mode="steps"
                />
            </div>
        </StorySection>
    </StoryPage>
</template>
