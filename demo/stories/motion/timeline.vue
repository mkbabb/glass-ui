<script setup lang="ts">
import { computed, onUnmounted, ref } from "vue";
import StoryPage from "../StoryPage.vue";
import { Button } from "@/components/ui/button";
import { CreamSurface } from "@/components/custom/cream-surface";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import {
    KeyframeTimeline,
    TimelineMarker,
    TimelinePlayhead,
    TimelineRuler,
    type KeyframeTimelineMarker,
} from "@/components/custom/timeline";
import { useRAFLoop } from "@/composables/motion";
import { Pause, Play, Rewind } from "lucide-vue-next";

// 5-second timeline, golden-ratio spaced markers
const DURATION = 5;
const PHI = 1.618033988749895;

interface PhaseMarker extends KeyframeTimelineMarker {
    name: string;
}

const markers: PhaseMarker[] = [
    {
        id: "phase-0",
        name: "phase 0 · prelude",
        time: 1.0,
        variant: "diamond",
        color: "var(--section-color-0)",
        label: "Phase 0 · prelude (1.000s)",
    },
    {
        id: "phase-1",
        name: "phase 1 · ignition",
        time: PHI,
        variant: "diamond",
        color: "var(--section-color-3)",
        label: "Phase 1 · ignition (1.618s)",
    },
    {
        id: "phase-2",
        name: "phase 2 · cascade",
        time: PHI * PHI,
        variant: "circle",
        color: "var(--section-color-6)",
        label: "Phase 2 · cascade (2.618s)",
    },
    {
        id: "phase-3",
        name: "phase 3 · fanfare",
        time: PHI + PHI * PHI,
        variant: "diamond",
        color: "var(--section-color-9)",
        label: "Phase 3 · fanfare (4.236s)",
    },
];

const currentTime = ref(0);
const playing = ref(false);
const lastTickAt = ref<number | null>(null);

const raf = useRAFLoop(({ now, delta }) => {
    if (!playing.value) {
        lastTickAt.value = null;
        return;
    }
    if (lastTickAt.value === null) {
        lastTickAt.value = now;
        return;
    }
    const dt = delta / 1000;
    let next = currentTime.value + dt;
    if (next >= DURATION) next = 0;
    currentTime.value = next;
});

onUnmounted(() => raf.dispose());

function togglePlay() {
    playing.value = !playing.value;
    if (playing.value) {
        raf.start();
    }
}
function rewind() {
    currentTime.value = 0;
    playing.value = false;
}
function onMarkerActivate(m: KeyframeTimelineMarker) {
    currentTime.value = m.time;
    playing.value = false;
}

const activePhase = computed(() => {
    const t = currentTime.value;
    let active: PhaseMarker | null = null;
    for (const m of markers) {
        if (t >= m.time) active = m;
        else break;
    }
    return active;
});
</script>

<template>
    <StoryPage>
        <!-- KeyframeTimeline composed -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">KeyframeTimeline · golden-ratio phases</p>
            <CreamSurface tone="cool" class="relative">
                <div class="flex flex-col gap-[var(--space-phi-3)]">
                    <header class="flex items-center justify-between gap-[var(--space-phi-2)]">
                        <div class="flex items-center gap-[var(--space-phi-2)]">
                            <Button
                                variant="glass"
                                size="icon"
                                :aria-label="playing ? 'Pause' : 'Play'"
                                @click="togglePlay"
                            >
                                <Pause v-if="playing" class="size-4" aria-hidden="true" />
                                <Play v-else class="size-4" aria-hidden="true" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Rewind"
                                @click="rewind"
                            >
                                <Rewind class="size-4" aria-hidden="true" />
                            </Button>
                            <div class="flex flex-col">
                                <span class="text-mono-caption text-muted-foreground">elapsed</span>
                                <span class="fira-code text-prose tabular-nums">
                                    {{ currentTime.toFixed(3) }}s / {{ DURATION.toFixed(3) }}s
                                </span>
                            </div>
                        </div>
                        <div class="flex flex-col text-right">
                            <span class="text-mono-caption text-muted-foreground">active phase</span>
                            <span
                                class="text-prose"
                                :style="{ color: activePhase?.color ?? 'var(--muted-foreground)' }"
                            >
                                {{ activePhase ? activePhase.name : "—" }}
                            </span>
                        </div>
                    </header>

                    <div :style="{ '--accent-color': 'var(--section-color-3)' }">
                        <KeyframeTimeline
                            v-model:current-time="currentTime"
                            :duration="DURATION"
                            :markers="markers"
                            :tick-interval="0.25"
                            :label-every="4"
                            unit="s"
                            :height="64"
                            @marker-activate="onMarkerActivate"
                        />
                    </div>
                </div>
            </CreamSurface>
        </section>

        <FlourishDivider tone="rainbow" />

        <!-- Marker variants side-by-side -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">TimelineMarker · diamond vs circle</p>
            <div class="grid gap-[var(--space-phi-3)] md:grid-cols-2">
                <CreamSurface tone="warm">
                    <p class="text-mono-caption text-muted-foreground">variant="diamond"</p>
                    <div
                        class="relative mt-[var(--space-phi-3)] h-12 rounded-full border border-border"
                        :style="{
                            background: 'color-mix(in srgb, var(--foreground) 5%, transparent)',
                            '--accent-color': 'var(--section-color-3)',
                        }"
                    >
                        <TimelineMarker
                            v-for="(t, i) in [0.15, 0.382, 0.618, 0.85]"
                            :key="`d-${i}`"
                            :time="t"
                            :duration="1"
                            variant="diamond"
                            :selected="i === 1"
                        />
                    </div>
                </CreamSurface>
                <CreamSurface tone="warm">
                    <p class="text-mono-caption text-muted-foreground">variant="circle"</p>
                    <div
                        class="relative mt-[var(--space-phi-3)] h-12 rounded-full border border-border"
                        :style="{
                            background: 'color-mix(in srgb, var(--foreground) 5%, transparent)',
                            '--accent-color': 'var(--section-color-7)',
                        }"
                    >
                        <TimelineMarker
                            v-for="(t, i) in [0.15, 0.382, 0.618, 0.85]"
                            :key="`c-${i}`"
                            :time="t"
                            :duration="1"
                            variant="circle"
                            :selected="i === 2"
                        />
                    </div>
                </CreamSurface>
            </div>
        </section>

        <!-- TimelineRuler standalone + TimelinePlayhead standalone -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">TimelineRuler + TimelinePlayhead · standalone</p>
            <CreamSurface tone="cool">
                <TimelineRuler
                    :duration="DURATION"
                    :tick-interval="0.25"
                    :label-every="4"
                    unit="s"
                />
                <div
                    class="relative mt-[var(--space-phi-2)] h-14 rounded-[var(--radius-md)] border border-border"
                    :style="{
                        background: 'color-mix(in srgb, var(--foreground) 5%, transparent)',
                        '--accent-color': 'var(--section-color-9)',
                    }"
                >
                    <TimelinePlayhead :time="currentTime" :duration="DURATION" />
                </div>
                <p class="text-mono-caption mt-[var(--space-phi-2)] text-muted-foreground">
                    Each component is independently consumable. The playhead reads
                    <code class="fira-code">--accent-color</code> from its parent surface.
                </p>
            </CreamSurface>
        </section>
    </StoryPage>
</template>
