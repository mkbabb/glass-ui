<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref, computed } from "vue";
import { GlassTimeline } from "../../../src/components/custom/timeline";
import type { TimelineSegment } from "../../../src/components/custom/timeline";
import { cn } from "../../../src/utils/cn";

/**
 * Segmented variant — Z.W2.T1 / A2 §B5. Adjacent gradient bands with
 * boundary dots that emit `hover` + `click` events. Demo shape mirrors
 * the speedtest 3-phase progression (ping → download → upload); each
 * segment carries its own gradient endpoint pair and a payload surfaced
 * via the events.
 */

interface DemoSegmentPayload {
    label: string;
    state: "pending" | "active" | "completed";
    value: string;
    description: string;
}

const segments = ref<TimelineSegment[]>([
    {
        key: "ping",
        label: "Ping",
        state: "completed",
        progress: 1,
        gradient: { from: "#5B8DEF", to: "#7BA6F5" },
        value: {
            label: "Ping",
            state: "completed",
            value: "23 ms",
            description: "Network latency — lower is better",
        } as DemoSegmentPayload,
    },
    {
        key: "download",
        label: "Download",
        state: "active",
        progress: 0.6,
        gradient: { from: "#CC2233", to: "#E55060" },
        value: {
            label: "Download",
            state: "active",
            value: "245.3 Mbps",
            description: "Download throughput",
        } as DemoSegmentPayload,
    },
    {
        key: "upload",
        label: "Upload",
        state: "pending",
        gradient: { from: "#E09030", to: "#F0B060" },
        value: {
            label: "Upload",
            state: "pending",
            value: "—",
            description: "Upload throughput",
        } as DemoSegmentPayload,
    },
]);

const hovered = ref<TimelineSegment | null>(null);
const selected = ref<TimelineSegment | null>(null);

function onHover(payload: { key: string; segment: TimelineSegment }) {
    hovered.value = payload.segment;
}

function onClick(payload: { key: string; segment: TimelineSegment }) {
    selected.value = payload.segment;
}

const detail = computed<DemoSegmentPayload | null>(() => {
    const seg = selected.value ?? hovered.value;
    if (!seg) return null;
    return (seg.value as DemoSegmentPayload | undefined) ?? null;
});

// Toy state-cycling helper — flips the second segment forward so
// reviewers see the band animate from 0 → 0.6 → 1 + the next segment
// activating. Not a load-bearing demo concern; just makes the story
// interactive without a contrived "Start" button.
function advance() {
    const dl = segments.value[1];
    const ul = segments.value[2];
    if (!dl || !ul) return;
    if (dl.state === "active" && (dl.progress ?? 0) < 1) {
        dl.progress = Math.min(1, (dl.progress ?? 0) + 0.2);
        if ((dl.progress ?? 0) >= 1) dl.state = "completed";
    } else if (dl.state === "completed" && ul.state === "pending") {
        ul.state = "active";
        ul.progress = 0.1;
    } else if (ul.state === "active") {
        ul.progress = Math.min(1, (ul.progress ?? 0) + 0.2);
        if ((ul.progress ?? 0) >= 1) ul.state = "completed";
    }
}

function reset() {
    segments.value = [
        { ...segments.value[0]!, state: "completed", progress: 1 },
        { ...segments.value[1]!, state: "active", progress: 0.6 },
        { ...segments.value[2]!, state: "pending", progress: undefined },
    ];
    selected.value = null;
    hovered.value = null;
}
</script>

<template>
    <StoryPage>
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">
                Segmented variant — multi-phase progress (Z.W2.T1)
            </p>

            <div
                :class="
                    cn(
                        'flex flex-col gap-6 rounded-card border border-border bg-card p-6 shadow-cartoon',
                    )
                "
            >
                <!-- Segmented timeline -->
                <div class="px-1">
                    <GlassTimeline
                        variant="segmented"
                        :segments="segments"
                        @hover="onHover"
                        @click="onClick"
                    />
                </div>

                <!-- Active phase detail (hover or click) -->
                <div
                    v-if="detail"
                    class="flex items-start gap-3 rounded-md border-l-[3px] bg-background p-4"
                    :style="{
                        borderLeftColor:
                            detail.state === 'completed'
                                ? 'var(--success, #22c55e)'
                                : detail.state === 'active'
                                  ? 'var(--accent, #5B8DEF)'
                                  : 'var(--muted-foreground)',
                    }"
                >
                    <div class="flex min-w-0 flex-col gap-1">
                        <span class="text-admin-label flex items-center gap-2">
                            {{ detail.label }}
                            <span
                                class="text-mono-caption uppercase tracking-wider text-muted-foreground"
                            >
                                {{ detail.state }}
                            </span>
                        </span>
                        <span class="text-heading font-medium">{{ detail.value }}</span>
                        <span class="text-small text-muted-foreground">
                            {{ detail.description }}
                        </span>
                    </div>
                </div>
                <div
                    v-else
                    class="rounded-md border border-dashed border-border bg-background p-4 text-small text-muted-foreground"
                >
                    Hover or click a segment dot to inspect the phase payload.
                </div>

                <!-- Controls -->
                <div class="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        class="rounded-md border border-border bg-background px-3 py-1.5 text-small font-medium hover:bg-muted/40"
                        @click="advance"
                    >
                        Advance phase
                    </button>
                    <button
                        type="button"
                        class="rounded-md border border-border bg-background px-3 py-1.5 text-small font-medium hover:bg-muted/40"
                        @click="reset"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>

        <!-- Phase legend -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">Segments</p>
            <ol
                class="flex flex-col divide-y divide-border rounded-card border border-border bg-card shadow-cartoon"
            >
                <li
                    v-for="seg in segments"
                    :key="seg.key"
                    class="flex items-center gap-4 px-4 py-3"
                >
                    <span
                        class="block h-3 w-12 rounded-full"
                        :style="{
                            background:
                                typeof seg.gradient === 'object' && seg.gradient !== null
                                    ? `linear-gradient(90deg, ${(seg.gradient as { from: string; to: string }).from}, ${(seg.gradient as { from: string; to: string }).to})`
                                    : 'var(--surface-tint-15)',
                        }"
                    />
                    <div class="flex min-w-0 flex-1 flex-col">
                        <span class="text-small font-medium">{{ seg.label }}</span>
                        <span class="text-mono-caption text-muted-foreground">
                            state: {{ seg.state }}
                        </span>
                    </div>
                    <span class="fira-code text-mono-caption text-muted-foreground">
                        {{ typeof seg.progress === "number" ? Math.round(seg.progress * 100) : "—" }}%
                    </span>
                </li>
            </ol>
        </div>
    </StoryPage>
</template>
