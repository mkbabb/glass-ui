<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { computed, reactive, ref } from "vue";
import {
    DEFAULT_METABALL_CONFIG,
    MetaballCanvas,
    useMetaballs,
    type MetaballConfig,
} from "@/components/custom/metaballs";
import { cn } from "@/utils/cn";

const directCanvas = ref<HTMLCanvasElement | null>(null);

const componentConfig = {
    blobCount: 10,
    speed: 0.1,
    threshold: 0.92,
    baseRadius: 0.15,
    orbitAmplitude: 0.24,
    colors: ["#E31937", "#FF8A3D", "#FFD166", "#4ECDC4", "#5C7AEA"],
    bgAlpha: 0.04,
    edgeSoftness: 0.38,
} satisfies MetaballConfig;

const directConfig = reactive({
    ...DEFAULT_METABALL_CONFIG,
    blobCount: 7,
    speed: 0.16,
    threshold: 0.86,
    baseRadius: 0.17,
    orbitAmplitude: 0.28,
    colors: ["#2DD4BF", "#38BDF8", "#A78BFA", "#F472B6"],
    bgAlpha: 0.12,
    edgeSoftness: 0.42,
});

const { isSupported } = useMetaballs(directCanvas, directConfig);

const supportState = computed(() =>
    isSupported.value ? "WebGL supported" : "WebGL unavailable",
);

const renderingState = computed(() =>
    isSupported.value ? "canvas shader render" : "fallback content",
);

const readouts = computed(() => [
    { label: "useMetaballs support", value: supportState.value },
    { label: "direct rendering", value: renderingState.value },
    { label: "blob count", value: String(directConfig.blobCount) },
    { label: "edge softness", value: String(directConfig.edgeSoftness) },
]);
</script>

<template>
    <StoryPage content-class="gap-8">
        <section
            data-testid="metaballs-story"
            :class="
                cn(
                    'relative min-h-[28rem] overflow-hidden rounded-card border border-border/60 p-6 md:p-8',
                    'bg-[radial-gradient(circle_at_20%_20%,color-mix(in_srgb,var(--viz-fourier)_30%,transparent),transparent_34%),radial-gradient(circle_at_85%_25%,color-mix(in_srgb,var(--viz-topology)_28%,transparent),transparent_30%),linear-gradient(135deg,var(--background),color-mix(in_srgb,var(--card)_78%,var(--background)))]',
                )
            "
        >
            <MetaballCanvas :config="componentConfig">
                <template #fallback>
                    <div
                        data-testid="metaball-component-fallback"
                        class="absolute inset-x-5 top-5 rounded-panel border border-border/70 bg-card/90 p-4 shadow-cartoon"
                    >
                        <p class="text-small font-medium text-foreground">
                            MetaballCanvas fallback
                        </p>
                        <p class="text-small text-muted-foreground">
                            WebGL is unavailable, so the component rendered its fallback slot.
                        </p>
                    </div>
                </template>
            </MetaballCanvas>

            <div class="relative z-10 flex min-h-[22rem] flex-col justify-between gap-8">
                <div class="max-w-xl">
                    <p class="text-admin-label text-muted-foreground">
                        MetaballCanvas · WebGL substrate
                    </p>
                    <h2 class="text-title text-foreground">Metaballs</h2>
                    <p class="text-prose mt-2 text-muted-foreground">
                        Fixed canvas renderer with an explicit fallback slot, paired with
                        a direct composable probe below.
                    </p>
                </div>

                <div
                    data-testid="metaballs-support-readout"
                    class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
                >
                    <div
                        v-for="item in readouts"
                        :key="item.label"
                        class="rounded-panel border border-border/60 bg-card/70 p-3 shadow-cartoon-sm backdrop-blur-sm"
                    >
                        <p class="text-mono-caption text-muted-foreground">
                            {{ item.label }}
                        </p>
                        <p class="text-small text-foreground">{{ item.value }}</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div
                :class="
                    cn(
                        'relative h-80 overflow-hidden rounded-card border border-border/60 bg-background/60',
                        'shadow-cartoon',
                    )
                "
            >
                <canvas
                    v-show="isSupported"
                    ref="directCanvas"
                    data-testid="metaballs-direct-canvas"
                    aria-label="useMetaballs direct canvas"
                    class="absolute inset-0 h-full w-full"
                />

                <div
                    v-if="!isSupported"
                    data-testid="metaballs-direct-fallback"
                    class="absolute inset-4 flex flex-col justify-center rounded-panel border border-border/70 bg-card/90 p-5"
                >
                    <p class="text-subheading text-foreground">WebGL unavailable</p>
                    <p class="text-small text-muted-foreground">
                        The direct useMetaballs probe rendered fallback content instead
                        of leaving the stage empty.
                    </p>
                </div>

                <div
                    class="absolute bottom-4 left-4 right-4 rounded-panel border border-border/60 bg-card/75 p-3 backdrop-blur-sm"
                >
                    <p class="text-small text-foreground">
                        direct useMetaballs · {{ supportState }}
                    </p>
                    <p class="text-mono-caption text-muted-foreground">
                        {{ renderingState }}
                    </p>
                </div>
            </div>

            <div class="flex flex-col justify-between gap-4 rounded-card border border-border/60 bg-card/60 p-5">
                <div>
                    <p class="text-admin-label text-muted-foreground">Shader inputs</p>
                    <h3 class="text-subheading text-foreground">Composable config</h3>
                </div>
                <dl class="grid grid-cols-2 gap-3 text-small">
                    <div class="rounded-panel border border-border/60 bg-background/50 p-3">
                        <dt class="text-mono-caption text-muted-foreground">speed</dt>
                        <dd class="text-foreground">{{ directConfig.speed }}</dd>
                    </div>
                    <div class="rounded-panel border border-border/60 bg-background/50 p-3">
                        <dt class="text-mono-caption text-muted-foreground">threshold</dt>
                        <dd class="text-foreground">{{ directConfig.threshold }}</dd>
                    </div>
                    <div class="rounded-panel border border-border/60 bg-background/50 p-3">
                        <dt class="text-mono-caption text-muted-foreground">radius</dt>
                        <dd class="text-foreground">{{ directConfig.baseRadius }}</dd>
                    </div>
                    <div class="rounded-panel border border-border/60 bg-background/50 p-3">
                        <dt class="text-mono-caption text-muted-foreground">amplitude</dt>
                        <dd class="text-foreground">{{ directConfig.orbitAmplitude }}</dd>
                    </div>
                </dl>
                <div class="flex flex-wrap gap-2">
                    <span
                        v-for="color in directConfig.colors"
                        :key="color"
                        class="h-6 w-6 rounded-full border border-border/70 shadow-cartoon-sm"
                        :style="{ backgroundColor: color }"
                        :aria-label="`Metaball color ${color}`"
                    />
                </div>
            </div>
        </section>
    </StoryPage>
</template>
