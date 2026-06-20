<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { GlassTimeline } from "../../../src/components/custom/timeline";
import type {
    TimelineSegment,
    TimelineSegmentGradient,
} from "../../../src/components/custom/timeline";
import { cn } from "../../../src/utils/cn";

/**
 * Continuous variant — ONE rounded-pill rail with N absolute-positioned region
 * children. Same TimelineSegment[] shape as the segmented variant; per-region
 * gradient endpoints use the `--chart-*` tokens. This demo mirrors a 3-phase
 * progression (ping → download → upload).
 *
 * The story exercises the `#detail` scoped slot. The slot payload
 * `{ segment, source, currentKey, hoveredKey }` resolves on the primitive side
 * (`hovered ?? current` — hover trumps current; the current-phase reading
 * restores on hover-leave). The slot body composes a `<Transition mode="out-in">`
 * keyed on the segment's stable `key` for a fade-swap on segment change. The
 * two-keyed-children shape (`v-if="segment"` + `v-else` idle) is load-bearing;
 * a single `v-if` inside the Transition would silently break the choreography.
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
        gradient: { from: "var(--chart-ping)", to: "var(--chart-ping)" },
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
        gradient: { from: "var(--chart-download)", to: "var(--chart-download)" },
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
        gradient: { from: "var(--chart-upload)", to: "var(--chart-upload)" },
        value: {
            label: "Upload",
            state: "pending",
            value: "—",
            description: "Upload throughput",
        } as DemoSegmentPayload,
    },
]);

// The current-segment key threads to the primitive via `current-segment-key`.
// Consumers do not track `hoveredKey` locally — the primitive owns it and
// surfaces it through the slot payload.
const currentSegmentKey = ref<string>("download");

function onClick(payload: { key: string; segment: TimelineSegment }) {
    // Click stamps a sticky selection — consumers compose `current-segment-key`
    // with their own click-stick semantics. (Speedtest's PhaseTimeline does
    // this for the running route.)
    currentSegmentKey.value = payload.segment.key;
}

function payloadFor(seg: TimelineSegment | null): DemoSegmentPayload | null {
    if (!seg) return null;
    return (seg.value as DemoSegmentPayload | undefined) ?? null;
}

// State-cycling helper — flips the active segment forward so reviewers
// see the region animate from 0 → 0.6 → 1 + the next segment activating.
// Same advance/reset shape as the segmented story for parity.
function advance() {
    const dl = segments.value[1];
    const ul = segments.value[2];
    if (!dl || !ul) return;
    if (dl.state === "active" && (dl.progress ?? 0) < 1) {
        dl.progress = Math.min(1, (dl.progress ?? 0) + 0.2);
        if ((dl.progress ?? 0) >= 1) {
            dl.state = "completed";
            currentSegmentKey.value = "upload";
        }
    } else if (dl.state === "completed" && ul.state === "pending") {
        ul.state = "active";
        ul.progress = 0.1;
        currentSegmentKey.value = "upload";
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
    currentSegmentKey.value = "download";
}

/**
 * Legend swatch background. Lifted out of the template binding so the
 * inline `{ from, to }` type assertion doesn't clash with vue-tsc's
 * template parser. Mirrors the primitive's own `gradientFor` resolver shape.
 */
function legendBackground(seg: TimelineSegment): string {
    const g = seg.gradient;
    if (g && typeof g === "object") {
        const pair = g as TimelineSegmentGradient;
        return `linear-gradient(90deg, ${pair.from}, ${pair.to})`;
    }
    return "var(--surface-tint-15)";
}
</script>

<template>
    <StoryPage>
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">
                Continuous variant — ONE rail, N regions
            </p>

            <div
                :class="
                    cn(
                        'flex flex-col gap-6 rounded-card border border-border bg-card p-6 shadow-cartoon',
                    )
                "
            >
                <!-- Continuous timeline + #detail slot. The
                     `:current-segment-key` binding threads in the active
                     phase; the slot payload's `segment` resolves to the
                     hovered marker when hover is live, falling back to
                     `current` otherwise. The `<Transition mode="out-in">`
                     fade-swap keys on `segment.key` so consecutive
                     segments animate cleanly; the idle branch is the
                     keyed `<div key="detail-idle">` sibling per Vue's
                     two-keyed-children requirement. -->
                <div class="continuous-detail-host px-1">
                    <GlassTimeline
                        variant="continuous"
                        :segments="segments"
                        :current-segment-key="currentSegmentKey"
                        aria-label="Speedtest progress: ping, download, upload"
                        @click="onClick"
                    >
                        <template #detail="{ segment, source }">
                            <Transition name="phase-detail" mode="out-in">
                                <div
                                    v-if="segment"
                                    :key="`detail-${segment.key}`"
                                    :data-source="source"
                                    class="phase-detail flex items-start gap-3 rounded-md border-l-[3px] bg-background p-4"
                                    :style="{
                                        borderLeftColor:
                                            segment.state === 'completed'
                                                ? 'var(--success)'
                                                : segment.state === 'active'
                                                  ? 'var(--accent)'
                                                  : 'var(--muted-foreground)',
                                    }"
                                >
                                    <div class="flex min-w-0 flex-col gap-1">
                                        <span class="text-admin-label flex items-center gap-2">
                                            {{ payloadFor(segment)?.label ?? segment.label }}
                                            <span
                                                class="text-mono-caption uppercase tracking-wider text-muted-foreground"
                                            >
                                                {{ segment.state }}
                                            </span>
                                            <span
                                                v-if="source === 'hovered'"
                                                class="text-mono-caption uppercase tracking-wider text-muted-foreground"
                                            >
                                                · hover
                                            </span>
                                        </span>
                                        <span class="text-heading font-medium">
                                            {{ payloadFor(segment)?.value ?? "—" }}
                                        </span>
                                        <span class="text-small text-muted-foreground">
                                            {{ payloadFor(segment)?.description ?? "" }}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    v-else
                                    key="detail-idle"
                                    class="phase-detail-idle ghost-slot p-4 text-small"
                                >
                                    Hover or click a boundary dot to inspect the phase payload.
                                </div>
                            </Transition>
                        </template>
                    </GlassTimeline>
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
                        :style="{ background: legendBackground(seg) }"
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

<style scoped>
/* Fade-swap choreography for the #detail slot. The transition name
   `phase-detail` keys both the leave and the enter so segment-to-segment
   swaps (and active ↔ idle swaps) animate
   identically. PRM users skip the cross-fade. */
.phase-detail-enter-active,
.phase-detail-leave-active {
    transition:
        opacity 180ms var(--ease-standard),
        transform 180ms var(--ease-standard);
}

.phase-detail-enter-from,
.phase-detail-leave-to {
    opacity: 0;
    transform: translateY(2px);
}

@media (prefers-reduced-motion: reduce) {
    .phase-detail-enter-active,
    .phase-detail-leave-active {
        transition-duration: 0.01ms;
    }
}
</style>
