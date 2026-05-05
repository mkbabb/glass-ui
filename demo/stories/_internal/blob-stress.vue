<!--
  _internal/blob-stress — Wβ3 multi-instance stress test.

  Eight simultaneous `<Blob>` instances at 6rem; a control bar with:
    · Run profile  — captures 5s of frame stats via `useRAFLoop` deltas;
                     emits a row of `<MetricBadge>` results.
    · Toggle visibility — flips `display: none` on the grid; rAF subscriptions
                          should halt while the canvases are detached from
                          layout. Frame counter freezes as evidence.

  Thresholds derived from SPEC.md §9 (≤2ms GPU on M1; 8 instances degrade
  gracefully via visibility gating; PRM = zero rAF activity).
-->
<script setup lang="ts">
import { computed, ref } from "vue";

import StoryPage from "../StoryPage.vue";
import { Blob } from "@/components/custom/blob";
import { Button } from "@/components/ui/button";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { default as MetricBadge } from "@/components/custom/metric-badge/MetricBadge.vue";
import { useRAFLoop, type RAFLoopTiming } from "@/composables/motion";
import type { BlobMood } from "@/components/custom/blob";

interface Specimen {
    color: string;
    mood: BlobMood;
}

const SPECIMENS: Specimen[] = [
    { color: "hsl(43 74% 49%)", mood: "idle" },
    { color: "hsl(6 72% 49%)", mood: "happy" },
    { color: "hsl(224 58% 46%)", mood: "curious" },
    { color: "hsl(286 46% 47%)", mood: "excited" },
    { color: "hsl(163 46% 35%)", mood: "sleepy" },
    { color: "hsl(35 70% 42%)", mood: "happy" },
    { color: "hsl(334 63% 47%)", mood: "curious" },
    { color: "hsl(256 44% 52%)", mood: "excited" },
];

// ── Profile state ──────────────────────────────────────────────────────────
const PROFILE_DURATION_MS = 5000;

interface ProfileResult {
    frames: number;
    meanFrameMs: number;
    maxFrameMs: number;
    elapsedMs: number;
    fps: number;
}

const isProfiling = ref<boolean>(false);
const profileResult = ref<ProfileResult | null>(null);
const liveFrameCount = ref<number>(0);
const visible = ref<boolean>(true);

let profileFrames = 0;
let profileMaxDelta = 0;
let profileSumDelta = 0;
let profileStart = 0;

const profile = useRAFLoop(
    (timing: RAFLoopTiming) => {
        liveFrameCount.value = timing.frame;
        // First delivered frame has delta=0 — exclude from mean/max.
        if (timing.frame === 0) return;
        profileFrames += 1;
        profileSumDelta += timing.delta;
        if (timing.delta > profileMaxDelta) profileMaxDelta = timing.delta;

        if (timing.now - profileStart >= PROFILE_DURATION_MS) {
            const elapsed = timing.now - profileStart;
            profileResult.value = {
                frames: profileFrames,
                meanFrameMs:
                    profileFrames > 0 ? profileSumDelta / profileFrames : 0,
                maxFrameMs: profileMaxDelta,
                elapsedMs: elapsed,
                fps: profileFrames / (elapsed / 1000),
            };
            profile.stop();
            isProfiling.value = false;
        }
    },
    { immediate: false, respectReducedMotion: true },
);

function runProfile(): void {
    if (isProfiling.value) return;
    profileFrames = 0;
    profileMaxDelta = 0;
    profileSumDelta = 0;
    liveFrameCount.value = 0;
    profileResult.value = null;
    isProfiling.value = true;
    profile.start();
    profileStart = performance.now();
}

function toggleVisibility(): void {
    visible.value = !visible.value;
}

const profileStatus = computed(() => {
    if (isProfiling.value) {
        return `recording · frame ${liveFrameCount.value}`;
    }
    if (profileResult.value) {
        return "complete";
    }
    return "idle";
});

const fpsColor = computed(() => {
    const r = profileResult.value;
    if (!r) return undefined;
    if (r.fps >= 55) return "var(--rainbow-green)";
    if (r.fps >= 30) return "var(--gold)";
    return "var(--rainbow-red)";
});
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <p class="section-label">_internal · stress test · debug</p>
            <DisplayHero size="display-3" variation="wonk" class="mt-2 mb-3">
                Eight specimens, one driver.
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                Drive the Wβ3 SPEC.md §9 budget. Eight blobs subscribe to one
                <code class="fira-code">useRAFLoop</code> driver. Click
                <em>Run profile</em> to capture 5 s of frame deltas; toggle
                visibility to confirm the rAF subscription halts when the grid
                is removed from layout.
            </p>
        </CreamSurface>

        <!-- Controls -->
        <section
            class="flex flex-wrap items-center gap-[var(--space-phi-3)] rounded-2xl border border-border bg-card p-[var(--space-phi-3)] shadow-cartoon"
        >
            <Button
                variant="cartoon"
                :disabled="isProfiling"
                @click="runProfile"
            >
                {{ isProfiling ? "Recording…" : "Run profile · 5s" }}
            </Button>
            <Button variant="outline" @click="toggleVisibility">
                {{ visible ? "Hide grid" : "Show grid" }}
            </Button>
            <span class="text-mono-caption text-muted-foreground">
                status · <strong>{{ profileStatus }}</strong>
            </span>
            <span class="text-mono-caption text-muted-foreground">
                live frames · <strong class="tabular-nums">{{ liveFrameCount }}</strong>
            </span>
        </section>

        <!-- Live metrics row -->
        <section
            v-if="profileResult"
            class="flex flex-wrap items-center gap-[var(--space-phi-3)] rounded-2xl border border-border bg-card p-[var(--space-phi-3)] shadow-cartoon"
        >
            <MetricBadge
                :amount="profileResult.fps.toFixed(1)"
                unit="fps"
                size="lg"
                :color="fpsColor"
            />
            <MetricBadge
                :amount="profileResult.frames"
                unit="frames"
                size="md"
            />
            <MetricBadge
                :amount="profileResult.meanFrameMs.toFixed(2)"
                unit="ms mean"
                size="md"
            />
            <MetricBadge
                :amount="profileResult.maxFrameMs.toFixed(2)"
                unit="ms max"
                size="md"
            />
            <MetricBadge
                :amount="(profileResult.elapsedMs / 1000).toFixed(2)"
                unit="s elapsed"
                size="sm"
            />
        </section>

        <!-- Eight-blob grid -->
        <section
            v-show="visible"
            class="grid grid-cols-2 gap-[var(--space-phi-3)] rounded-2xl border border-border bg-card p-[var(--space-phi-5)] shadow-cartoon md:grid-cols-4"
        >
            <div
                v-for="(s, i) in SPECIMENS"
                :key="`stress-${i}`"
                class="flex items-center justify-center"
            >
                <Blob
                    :color="s.color"
                    :mood="s.mood"
                    size="6rem"
                    :seed="1618 + i"
                />
            </div>
        </section>

        <section
            v-show="!visible"
            class="rounded-2xl border border-dashed border-border bg-card p-[var(--space-phi-5)] text-center text-mono-caption text-muted-foreground"
        >
            grid hidden · canvases detached from layout · rAF should halt
        </section>

        <!-- Notes -->
        <section class="flex flex-col gap-2">
            <p class="section-label">budget · SPEC.md §9</p>
            <ul class="text-mono-small list-disc pl-5 text-foreground/80">
                <li>≤ 2 ms GPU per frame on M1 / iPhone 12 / Pixel 5.</li>
                <li>≤ 0.5 ms CPU renderer · ≤ 0.3 ms CPU state machine.</li>
                <li>≤ 256 KB memory per instance.</li>
                <li>4 instances at 60 fps; 8 instances ≥ 30 fps with gating.</li>
                <li>PRM enabled · zero rAF activity · static specimens only.</li>
            </ul>
        </section>
    </StoryPage>
</template>
