<script setup lang="ts">
// Timeline's stage: five release phases on one axis, the third under way, with a
// measured fill or with no measure yet (indeterminate).
import { computed, ref } from "vue";
import { Timeline, type TimelineSegment } from "@glass/components/timeline";
import StageSwap from "../../chassis/variants/StageSwap.vue";

type Mode = "running" | "indeterminate";

const props = withDefaults(defineProps<{ mode?: Mode }>(), { mode: "running" });

const PHASES: readonly { key: string; label: string; at: number; note: string }[] = [
    { key: "kickoff", label: "Kickoff", at: 0.16, note: "Four days" },
    { key: "design", label: "Design", at: 0.38, note: "Eleven days" },
    { key: "build", label: "Build", at: 0.66, note: "Under way" },
    { key: "beta", label: "Beta", at: 0.82, note: "Not started" },
    { key: "launch", label: "Launch", at: 1, note: "Not started" },
];

const segments = computed<TimelineSegment[]>(() =>
    PHASES.map((p, i) => ({
        key: p.key,
        label: p.label,
        at: p.at,
        value: p.note,
        state: i < 2 ? "completed" : i === 2 ? "active" : undefined,
        progress: i === 2 && props.mode === "running" ? 0.45 : undefined,
    })),
);

const current = ref("build");
</script>

<template>
    <div class="timeline-stage">
        <StageSwap :swap-key="mode" class="timeline-stage-swap">
            <Timeline
                :segments="segments"
                :current="current"
                label="Release"
                @select="current = $event.key"
            >
                <template #detail="{ segment }">
                    <div v-if="segment" class="timeline-stage-detail">
                        <span>{{ segment.label }}</span>
                        <span aria-hidden="true">·</span>
                        <span>{{ segment.value }}</span>
                    </div>
                </template>
            </Timeline>
        </StageSwap>
    </div>
</template>

<style scoped>
.timeline-stage {
    display: grid;
    place-items: center;
    block-size: 100%;
    padding: var(--sp-6) var(--sp-5);
}
/* The swap box clips, so its padding holds the end marks' overhang. */
.timeline-stage-swap {
    inline-size: min(100%, 60rem);
    padding: var(--sp-4) var(--sp-3);
}
.timeline-stage-detail {
    display: flex;
    justify-content: center;
    gap: var(--sp-2);
    padding-block-start: var(--sp-4);
    font-size: var(--text-body, 1rem);
}
</style>
