<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { onMounted, onUnmounted, ref } from "vue";
import {
    Progress,
    type ProgressSegment,
} from "../../../src/components/ui/progress";
import { Button } from "../../../src/components/ui/button";
import { BorderProgress } from "../../../src/components/custom/border-progress";
import { IconChip } from "../../../src/components/custom/icon-chip";
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

        <!-- BB.W-BORDER-PROGRESS — progress IS the element's border: the
             masked-conic @property ring (radius-following, the brand spectrum
             walked OKLCH/shorter-hue), bound to the same `determinate` model. -->
        <StorySection label="border ring (progress IS the chrome)">
            <p class="font-mono text-xs text-muted-foreground">
                The conic ring paints in the card's own border band ({{ determinate }}%) —
                no floating bar, no relayout; the glass interior still transmits the
                backdrop. Coverage full-ring; the spectrum walks the brand ramp.
            </p>
            <BorderProgress
                :value="determinate"
                coverage="full-ring"
                class="glass-card rounded-card p-6"
            >
                <div class="flex flex-col gap-1">
                    <span class="text-display-1 tabular-nums">{{ determinate }}%</span>
                    <span class="section-label--tinted text-admin-label">
                        Coverage · full-ring
                    </span>
                </div>
            </BorderProgress>
        </StorySection>
    </StoryPage>
</template>
