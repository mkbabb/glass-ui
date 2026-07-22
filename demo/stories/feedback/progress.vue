<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { Progress } from "@glass/components/progress";
import { loopProgressValue } from "./loop-driver";
import { Button } from "@glass/components/button";
import { ScrollProgressRim } from "@glass/components/scroll-progress-rim";
import { GlassDock } from "@glass/components/dock";
// the feedback band's --section-color-8 ruby identity.

const determinate = ref(42);
const segmentProgress = [1, 0.72, 0.35, 0] as const;
const progressVariants = ["default", "gradient", "liquid"] as const;
const rimStates = [0, 50, 100] as const;
const rimWidths = ["1px", "4px", "12px"] as const;
const rimAxes = [
    { label: "Horizontal", orientation: "horizontal", dir: "ltr" },
    { label: "Vertical", orientation: "vertical", dir: "ltr" },
    { label: "Horizontal · RTL", orientation: "horizontal", dir: "rtl" },
] as const;

const animated = ref(0);
let raf: number | undefined;

// The loop breathes on the canon indeterminate-sweep tempo
// (--motion-duration-progress-indeterminate = 4s, the R3b 4000ms engagement
// exemplar) — read from the token layer, never a component-local literal.
function loopPeriodMs(): number {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(
        "--motion-duration-progress-indeterminate",
    );
    const seconds = Number.parseFloat(raw);
    return Number.isFinite(seconds) && seconds > 0 ? seconds * 1000 : 4000;
}

function startAnimated(): void {
    stopAnimated();
    const period = loopPeriodMs();
    const start = performance.now();
    const frame = (now: number): void => {
        animated.value = loopProgressValue((now - start) / period);
        raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
}

function stopAnimated(): void {
    if (raf !== undefined) {
        cancelAnimationFrame(raf);
        raf = undefined;
    }
}

onMounted(startAnimated);
onUnmounted(stopAnimated);
</script>

<template>
    <StoryPage>
        <!-- the feedback-band identity COLOR EVENT (the tinted
             eyebrow + the inline accent rail, both on
             --section-color-8). The page-level color identity, DISTINCT from the
             StorySection labels + the range content below — it carries
             NO heading rung (not an idiom-B second header; PH3). -->

        <StorySection label="determinate">
            <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                    <p class="font-mono text-micro text-muted-foreground">
                        {{ determinate }}% complete
                    </p>
                    <div class="flex items-center gap-2">
                        <Button
                            class="h-7 px-2 text-micro"
                            @click="determinate = Math.max(0, determinate - 10)"
                        >
                            −10
                        </Button>
                        <Button
                            class="h-7 px-2 text-micro"
                            @click="determinate = Math.min(100, determinate + 10)"
                        >
                            +10
                        </Button>
                    </div>
                </div>
                <Progress
                    :model-value="determinate"
                    :marks="[20, 40, 60, 80]"
                    aria-label="Checkpointed completion"
                />
                <div class="grid gap-4 md:grid-cols-2">
                    <div class="grid gap-2">
                        <span class="font-mono text-micro text-muted-foreground">
                            Arbitrary domain · 0.5 / 1
                        </span>
                        <Progress
                            :model-value="0.5"
                            :max="1"
                            :marks="[0.25, 0.5, 0.75]"
                            aria-label="Normalized checkpoint example"
                        />
                    </div>
                    <div dir="rtl" class="grid gap-2">
                        <span class="font-mono text-micro text-muted-foreground">
                            RTL · 25 / 100
                        </span>
                        <Progress
                            :model-value="25"
                            :marks="[25, 50, 75]"
                            aria-label="RTL checkpoint example"
                        />
                    </div>
                </div>
            </div>
        </StorySection>

        <StorySection label="animated (loop)">
            <Progress
                :model-value="animated"
                :style="{ '--progress-fill': 'var(--viz-fourier)' }"
                aria-label="Looping progress demonstration"
            />
        </StorySection>

        <StorySection label="indeterminate">
            <p class="font-mono text-micro text-muted-foreground">
                <code>indeterminate</code> removes the numeric value and the rail sweeps
                to signal unknown duration. It becomes static under
                <code>prefers-reduced-motion</code>.
            </p>
            <Progress indeterminate />
        </StorySection>

        <StorySection label="sizes">
            <div class="grid gap-4">
                <Progress :model-value="62" class="h-1.5" />
                <Progress :model-value="62" />
                <Progress :model-value="62" class="h-6" />
            </div>
        </StorySection>

        <StorySection label="complete · error">
            <div class="grid gap-4 md:grid-cols-2">
                <div class="grid gap-2">
                    <span class="text-small text-foreground">Complete</span>
                    <Progress :model-value="100" aria-label="Complete" />
                </div>
                <div class="grid gap-2">
                    <span class="text-small text-foreground">Failed at 63%</span>
                    <Progress
                        :model-value="63"
                        status="error"
                        aria-label="Upload failed at 63 percent"
                    />
                </div>
            </div>
        </StorySection>

        <StorySection label="vertical">
            <div class="flex h-48 items-stretch justify-center gap-6">
                <Progress
                    v-for="variant in progressVariants"
                    :key="variant"
                    :variant="variant"
                    orientation="vertical"
                    :model-value="62"
                    :marks="[25, 50, 75]"
                    :aria-label="`Vertical ${variant} progress`"
                />
            </div>
        </StorySection>

        <!-- Gradient paint over the shared progress geometry and semantics. -->
        <StorySection label="gradient variant">
            <p class="font-mono text-micro text-muted-foreground">
                <code>variant="gradient"</code> adds the lifecycle motion grammar and
                optional indeterminate sweep (a slow left-to-right pan, retired under
                <code>prefers-reduced-motion</code>).
            </p>
            <div class="grid gap-4">
                <Progress variant="gradient" :model-value="determinate" />
                <Progress variant="gradient" indeterminate />
            </div>
        </StorySection>

        <!-- liquid variant — the shared.glass-liquid-fill glass-cylinder meter
             The same warm-glass fill is shared with Slider; the
             phase colour rides --progress-fill (here the legendre violet) with zero
             per-site glass knowledge. -->
        <StorySection label="liquid variant (shared glass-cylinder fill)">
            <p class="font-mono text-micro text-muted-foreground">
                <code>variant="liquid"</code> selects the shared
                <code>.glass-liquid-fill</code> paint that Slider also reads. The tint
                rides <code>--progress-fill</code> (or <code>--liquid-fill-tint</code>).
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

        <StorySection label="scroll progress rim">
            <p class="font-mono text-micro text-muted-foreground">
                A law-12 fill-pill: an inset stadium hugs one host edge and the
                spectrum pill grows to the true fraction — a linear read that stays
                honest on a pill Dock, a wide card, or a circular host alike.
            </p>
            <div class="flex flex-wrap items-center gap-4">
                <div
                    v-for="value in rimStates"
                    :key="`dock-${value}`"
                    class="relative inline-grid rounded-[var(--radius-dock)]"
                >
                    <GlassDock always-expanded backdrop-mode="static">
                        <span class="px-3 font-mono text-micro tabular-nums">
                            {{ value }}%
                        </span>
                    </GlassDock>
                    <ScrollProgressRim
                        :value="value"
                        :max="100"
                        :aria-label="`Dock rim at ${value} percent`"
                    />
                </div>
                <div class="relative inline-grid rounded-[var(--radius-dock)]">
                    <GlassDock
                        :start-collapsed="true"
                        :collapse-delay="60_000"
                        backdrop-mode="static"
                        style="pointer-events: none"
                    >
                        <span class="px-3 font-mono text-micro">Expanded</span>
                        <template #collapsed>
                            <span
                                class="size-2 rounded-full bg-foreground/60"
                                aria-hidden="true"
                            />
                        </template>
                    </GlassDock>
                    <ScrollProgressRim
                        :value="50"
                        :max="100"
                        aria-label="Collapsed Dock rim at 50 percent"
                    />
                </div>
                <div
                    class="relative grid size-16 place-items-center rounded-full bg-card/40"
                >
                    <span class="font-mono text-micro tabular-nums">65%</span>
                    <ScrollProgressRim
                        :value="65"
                        :max="100"
                        aria-label="Circular host rim at 65 percent"
                    />
                </div>
            </div>

            <div class="grid grid-cols-3 gap-2">
                <div
                    v-for="width in rimWidths"
                    :key="width"
                    class="relative grid h-12 min-w-0 place-items-center rounded-card bg-card/40"
                >
                    <ScrollProgressRim
                        :value="50"
                        :max="100"
                        :style="{ '--scroll-progress-rim-width': width }"
                        :aria-label="`${width} rim at 50 percent`"
                    />
                    <span class="font-mono text-micro text-muted-foreground">
                        {{ width }}
                    </span>
                </div>
                <div
                    v-for="axis in rimAxes"
                    :key="axis.label"
                    :dir="axis.dir"
                    class="relative grid h-24 min-w-0 place-items-center rounded-card bg-card/40"
                >
                    <ScrollProgressRim
                        :value="50"
                        :max="100"
                        :orientation="axis.orientation"
                        :aria-label="`${axis.label} rim at 50 percent`"
                    />
                    <span class="font-mono text-micro text-muted-foreground">
                        {{ axis.label }}
                    </span>
                </div>
            </div>

            <div class="glass-card relative rounded-card px-4 py-3 pb-5">
                <ScrollProgressRim
                    :value="2.07"
                    :max="4"
                    :segments="segmentProgress"
                    aria-label="Segment progress"
                />
                <div class="flex flex-col gap-0.5">
                    <span class="text-mono-small font-medium tabular-nums">
                        4 stages · 52%
                    </span>
                    <span class="font-mono text-micro text-muted-foreground">
                        Per-item · 1.00 / 0.72 / 0.35 / 0.00
                    </span>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
