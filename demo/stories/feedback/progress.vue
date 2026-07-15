<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { onMounted, onUnmounted, ref } from "vue";
import {
    Progress,
    type ProgressSegment,
} from "@glass/components/progress";
import { Button } from "@glass/components/button";
import { ScrollProgressRim } from "@glass/components/scroll-progress-rim";
import { IconChip } from "@glass/components/icon-chip";
import { Gauge } from "@lucide/vue";
// BB.W-SUFFUSE3 — the feedback band's --section-color-8 ruby identity. Progress is
// a REFERENCE surface (its phase-bus --viz-* hues ARE the teaching content); the
// page identity is the eyebrow/rail/chip event, distinct from the bus colors.
const FEEDBACK_STOP = 8;


// Sectioned variant demo — a 4-phase pattern (pings / jitter / download /
// upload) with one phase active to show the spring active-fill.
const phaseSegments: ProgressSegment[] = [
    { key: "pings", label: "Pings", color: "var(--viz-fourier)", state: "completed" },
    { key: "jitter", label: "Jitter", color: "var(--viz-chebyshev)", state: "completed" },
    { key: "download", label: "Download", color: "var(--viz-legendre)", state: "active" },
    { key: "upload", label: "Upload", color: "var(--viz-amber)", state: "pending" },
];
const phaseActive = ref<string>("download");
const phaseProgress = ref<number>(58);

const determinate = ref(42);
const segmentProgress = [1, 0.72, 0.35, 0] as const;

const animated = ref(0);
let timer: number | undefined;

function startAnimated(): void {
    stopAnimated();
    animated.value = 0;
    timer = window.setInterval(() => {
        if (animated.value >= 100) {
            animated.value = 0;
            return;
        }
        animated.value = Math.min(100, animated.value + 3);
    }, 120);
}

function stopAnimated(): void {
    if (timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
    }
}

onMounted(startAnimated);
onUnmounted(stopAnimated);
</script>

<template>
    <StoryPage>
        <!-- BB.W-SUFFUSE3 — the feedback-band identity COLOR EVENT (the tinted
             eyebrow + the inline accent rail + the focal IconChip, all on
             --section-color-8). The page-level color identity, DISTINCT from the
             StorySection labels + the phase-bus --viz-* content below — it carries
             NO heading rung (not an idiom-B second header; PH3). -->
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FEEDBACK_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="Gauge" :section="FEEDBACK_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Feedback · Progress
                </span>
                <p class="text-small text-muted-foreground">
                    Progress surfaces — the phase bus carries its own --viz-* hues;
                    the section identity is the ONE page event.
                </p>
            </div>
        </header>

        <StorySection label="determinate">
            <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                    <p class="font-mono text-xs text-muted-foreground">
                        {{ determinate }}% complete
                    </p>
                    <div class="flex items-center gap-2">
                        <Button
                            variant="outline"
                            class="h-7 px-2 text-xs"
                            @click="determinate = Math.max(0, determinate - 10)"
                        >
                            −10
                        </Button>
                        <Button
                            variant="outline"
                            class="h-7 px-2 text-xs"
                            @click="determinate = Math.min(100, determinate + 10)"
                        >
                            +10
                        </Button>
                    </div>
                </div>
                <Progress :model-value="determinate" />
            </div>
        </StorySection>

        <StorySection label="animated (loop)">
            <p class="font-mono text-xs text-muted-foreground">
                Auto-advancing driver resets at 100. The bar below overrides its
                fill with <code>[&amp;>[data-state=loading]]:bg-viz-fourier</code>
                for the red basis colour.
            </p>
            <Progress
                :model-value="animated"
                class="[&>[data-state=loading]]:bg-viz-fourier"
            />
        </StorySection>

        <StorySection label="indeterminate">
            <p class="font-mono text-xs text-muted-foreground">
                No <code>model-value</code> passed — the fill pulses to signal
                unknown duration. Honours <code>prefers-reduced-motion</code>
                via <code>motion-safe:</code>.
            </p>
            <Progress
                class="motion-safe:[&>[data-state=loading]]:animate-pulse [&>[data-state=loading]]:bg-primary/60"
            />
        </StorySection>

        <StorySection label="sizes">
            <div class="grid gap-4">
                <Progress :model-value="62" class="h-1.5" />
                <Progress :model-value="62" />
                <Progress :model-value="62" class="h-6" />
            </div>
        </StorySection>

        <!-- gradient variant — the lifecycle motion grammar dispatcher arm. -->
        <StorySection label="gradient variant">
            <p class="font-mono text-xs text-muted-foreground">
                <code>variant="gradient"</code> routes to ProgressGradient — a
                lifecycle motion grammar with an optional indeterminate sweep
                (a slow left-to-right pan, retired under
                <code>prefers-reduced-motion</code>).
            </p>
            <div class="grid gap-4">
                <Progress variant="gradient" :model-value="determinate" />
                <Progress variant="gradient" indeterminate />
            </div>
        </StorySection>

        <!-- liquid variant — the shared .glass-liquid-fill glass-cylinder meter
             (BG.W-LIQUID-FILL). The SAME warm-glass fill the Slider re-reads; the
             phase colour rides --progress-fill (here the legendre violet) with zero
             per-site glass knowledge. -->
        <StorySection label="liquid variant (shared glass-cylinder fill)">
            <p class="font-mono text-xs text-muted-foreground">
                <code>variant="liquid"</code> routes to ProgressLiquid — the ONE
                <code>.glass-liquid-fill</code> register the Slider re-reads. The tint
                rides <code>--progress-fill</code> (or <code>--liquid-fill-tint</code>);
                the register owns the blur / rim / under-shadow.
            </p>
            <div class="grid gap-4">
                <Progress variant="liquid" :model-value="determinate" />
                <Progress
                    variant="liquid"
                    :model-value="72"
                    :style="{ '--progress-fill': 'var(--viz-legendre)' }"
                />
            </div>
        </StorySection>

        <!-- Sectioned variant — per-segment colour cells,
             spring active fill, transition-gradient seams. -->
        <StorySection label="sectioned variant (phase bus)">
            <p class="font-mono text-xs text-muted-foreground">
                Per-segment colour cells + spring active-fill overlay. Mirrors the
                speedtest phase-bus shape (pings / jitter / download / upload).
            </p>
            <Progress
                variant="sectioned"
                :segments="phaseSegments"
                :current-segment-key="phaseActive"
                :active-progress="phaseProgress / 100"
                class="h-3"
            />
        </StorySection>

        <StorySection label="scroll progress rim">
            <p class="font-mono text-xs text-muted-foreground">
                A thin rainbow band follows the host radius without changing layout.
            </p>
            <div class="glass-card relative rounded-card p-6">
                <ScrollProgressRim
                    :value="determinate"
                    :max="100"
                    aria-label="Example scroll progress"
                />
                <div class="flex flex-col gap-1">
                    <span class="text-display-1 tabular-nums">{{ determinate }}%</span>
                    <span class="section-label--tinted text-admin-label">
                        Coverage · full-ring
                    </span>
                </div>
            </div>
            <div class="glass-card relative rounded-card p-6">
                <ScrollProgressRim
                    :value="2.07"
                    :max="4"
                    :segments="segmentProgress"
                    aria-label="Segment progress"
                />
                <div class="flex flex-col gap-1">
                    <span class="text-display-1 tabular-nums">4 stages</span>
                    <span class="section-label--tinted text-admin-label">
                        Per-item · 1.00 / 0.72 / 0.35 / 0.00
                    </span>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
