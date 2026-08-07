<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Timeline } from "@glass/components/timeline";
import type { TimelineSegment } from "@glass/components/timeline";
import { Slider } from "@glass/components/slider";
import { cn } from "@glass/components/_shared/class-names";

/**
 * The Timeline route. ONE component and ONE composed <Slider :marks> replace the
 * three mechanisms this page used to hand-roll: a scrubber, a tick overlay
 * absolutely positioned over it, and a roving event list that duplicated the
 * marks' own keyboard path.
 *
 * The axis REPORTS (role=progressbar) and the playhead COMMANDS (role=slider).
 * They are separate surfaces because they are separate roles.
 */

interface PhasePayload {
    value: string;
    description: string;
}

/** `at` is each phase's END boundary, cumulative. The set ends at 0.94 on
 *  purpose: the trailing 6% is an OPEN AXIS — the groove paints it, no phase
 *  owns it, no mark sits on it, and the aggregate still reads 100% when every
 *  OWNED phase completes. */
const phases = ref<TimelineSegment[]>([
    {
        key: "kickoff",
        label: "Kickoff",
        at: 0.16,
        state: "completed",
        value: { value: "4 days", description: "Research and discovery." },
    },
    {
        key: "design",
        label: "Design",
        at: 0.38,
        state: "completed",
        value: { value: "11 days", description: "Wireframes approved." },
    },
    {
        key: "build",
        label: "Build",
        at: 0.66,
        state: "active",
        progress: 0.45,
        value: { value: "in flight", description: "Core features land." },
    },
    {
        key: "beta",
        label: "Beta",
        at: 0.82,
        value: { value: "—", description: "First testers onboard." },
    },
    {
        key: "launch",
        label: "Launch",
        at: 0.94,
        value: { value: "—", description: "Public release." },
    },
]);

const current = ref<string>("build");

/** `defineExpose({ value })` is the door a SCRIPT can reach — a slot prop cannot,
 *  and a CSS variable only through polled `getComputedStyle`. */
const axis = useTemplateRef<{ value: number }>("axis");
const aggregate = computed(() => Math.round((axis.value?.value ?? 0) * 100));

function payloadOf(seg: TimelineSegment | null): PhasePayload | null {
    return seg ? ((seg.value as PhasePayload | undefined) ?? null) : null;
}

function onSelect(payload: { key: string; segment: TimelineSegment }): void {
    current.value = payload.key;
}

function advance(): void {
    const build = phases.value[2];
    const beta = phases.value[3];
    if (!build || !beta) return;
    if (build.state === "active" && (build.progress ?? 0) < 1) {
        build.progress = Math.min(1, (build.progress ?? 0) + 0.25);
        if (build.progress >= 1) {
            build.state = "completed";
            beta.state = "active";
            beta.progress = 0.1;
            current.value = "beta";
        }
    } else if (beta.state === "active") {
        beta.progress = Math.min(1, (beta.progress ?? 0) + 0.25);
        if (beta.progress >= 1) beta.state = "completed";
    }
}

function reset(): void {
    phases.value = phases.value.map((seg, i) => ({
        ...seg,
        state: i < 2 ? "completed" : i === 2 ? "active" : undefined,
        progress: i === 2 ? 0.45 : undefined,
    }));
    current.value = "build";
}

/** The honest indeterminate state: `active` with `progress` omitted. Kill the
 *  flow and this becomes pixel-identical to `pending` — which is exactly why the
 *  flow is the library's one lawful idle loop rather than decoration. */
function indeterminate(): void {
    phases.value = phases.value.map((seg, i) => ({
        ...seg,
        state: i < 2 ? "completed" : i === 2 ? "active" : undefined,
        progress: undefined,
    }));
    current.value = "build";
}

// ── The playhead. A COMMANDING surface, so it is a Slider — with :marks
// carrying the same boundaries the axis marks sit on, which is the composition
// that made the hand-rolled tick overlay unnecessary.
const t = ref(0);
const ticks = computed(() => phases.value.map((seg) => seg.at ?? 0));
</script>

<template>
    <StoryPage>
        <StorySection heading="One reporting axis" level="heading">
            <div>
                <p class="text-small mb-4 text-muted-foreground">Release timeline</p>

                <div
                    :class="
                        cn(
                            'flex flex-col gap-6 rounded-card border border-border bg-card p-6 shadow-cartoon',
                        )
                    "
                >
                    <Timeline
                        ref="axis"
                        :segments="phases"
                        :current="current"
                        label="Release timeline"
                        @select="onSelect"
                    >
                        <template #detail="{ segment, source }">
                            <div
                                v-if="segment"
                                class="flex min-w-0 flex-col gap-1 border-l-[3px] border-border pl-3"
                            >
                                <span class="text-small flex items-center gap-2">
                                    {{ segment.label }}
                                    <span class="text-caption text-muted-foreground">
                                        {{ segment.state ?? "pending" }}
                                    </span>
                                    <span
                                        v-if="source === 'hovered'"
                                        class="text-caption text-muted-foreground"
                                    >
                                        · hover
                                    </span>
                                </span>
                                <span class="text-heading font-medium">
                                    {{ payloadOf(segment)?.value ?? "—" }}
                                </span>
                                <span class="text-small text-muted-foreground">
                                    {{ payloadOf(segment)?.description ?? "" }}
                                </span>
                            </div>
                            <div v-else class="ghost-slot p-4 text-small">
                                Hover or select a mark to inspect the phase.
                            </div>
                        </template>
                    </Timeline>

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
                            @click="indeterminate"
                        >
                            Indeterminate
                        </button>
                        <button
                            type="button"
                            class="rounded-md border border-border bg-background px-3 py-1.5 text-small font-medium hover:bg-muted/40"
                            @click="reset"
                        >
                            Reset
                        </button>
                        <span class="fira-code text-mono-small text-muted-foreground">
                            aggregate {{ aggregate }}%
                        </span>
                    </div>
                </div>
            </div>

            <div>
                <p class="text-small mb-4 text-muted-foreground">Phases</p>
                <ol
                    class="flex flex-col divide-y divide-border rounded-card border border-border bg-card shadow-cartoon"
                >
                    <li
                        v-for="seg in phases"
                        :key="seg.key"
                        class="flex items-center gap-4 px-4 py-3"
                    >
                        <span class="flex min-w-0 flex-1 flex-col">
                            <span class="text-small font-medium">{{ seg.label }}</span>
                            <span class="text-mono-small text-muted-foreground">
                                state: {{ seg.state ?? "pending" }}
                            </span>
                        </span>
                        <span class="fira-code text-mono-small text-muted-foreground">
                            {{ Math.round((seg.at ?? 0) * 100) }}%
                        </span>
                    </li>
                </ol>
            </div>
        </StorySection>

        <StorySection heading="Playhead — the commanding surface">
            <div>
                <p class="text-small mb-4 text-muted-foreground">
                    A timeline reports; a playhead commands. The transport is a
                    <code class="text-mono-small">&lt;Slider :marks&gt;</code> carrying the
                    same phase boundaries — no second coordinate system, no stacking.
                </p>
                <div
                    :class="
                        cn(
                            'rounded-card border border-border bg-card p-6 shadow-cartoon',
                        )
                    "
                >
                    <Slider
                        :model-value="[t]"
                        :min="0"
                        :max="1"
                        :step="0.01"
                        :marks="ticks"
                        aria-label="Playhead"
                        @update:model-value="(v) => (t = v?.[0] ?? 0)"
                    />
                    <p class="fira-code text-mono-small mt-4 text-muted-foreground">
                        t = {{ t.toFixed(2) }}
                    </p>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
