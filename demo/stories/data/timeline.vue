<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref, computed } from "vue";
import { GlassTimeline } from "@glass/components/timeline";
import { cn } from "@glass/components/_shared/class-names";

// BG.W-DEMO-DUP-MERGE (F7.3) — the Data TIMELINE family, mechanically consolidated.
// The three timeline registers (discrete scrubber · segmented multi-phase · one-rail
// continuous) render as THREE <StorySection> registers on this ONE page. The prior
// routed `timeline-segmented.vue` / `timeline-continuous.vue` member wrappers +
// the <FamilyTabs> switcher are RETIRED (clean break) — each render body moved bare
// into a colocated PascalCase body sub-component (Timeline{Segmented,Continuous}Body).
import TimelineSegmentedBody from "./timeline/TimelineSegmentedBody.vue";
import TimelineContinuousBody from "./timeline/TimelineContinuousBody.vue";

interface TimelineEvent {
    id: string;
    at: number; // normalized 0..1
    label: string;
    body: string;
    tone: string; // section-N
}

const events: TimelineEvent[] = [
    { id: "e1", at: 0.04, label: "Kickoff", body: "Research and discovery.",         tone: "0" },
    { id: "e2", at: 0.22, label: "Design",  body: "Wireframes approved.",            tone: "2" },
    { id: "e3", at: 0.41, label: "Build",   body: "Core features land.",             tone: "5" },
    { id: "e4", at: 0.58, label: "Beta",    body: "First testers onboard.",          tone: "4" },
    { id: "e5", at: 0.76, label: "Polish",  body: "Performance pass and bug fixes.", tone: "7" },
    { id: "e6", at: 0.94, label: "Launch",  body: "Public release.",                 tone: "8" },
];

const position = ref(0.0);

const activeIndex = computed(() => {
    let idx = -1;
    for (let i = 0; i < events.length; i += 1) {
        if (events[i]!.at <= position.value) idx = i;
    }
    return idx;
});

const activeEvent = computed(() =>
    activeIndex.value >= 0 ? events[activeIndex.value]! : null,
);

const label = computed(() => {
    const pct = Math.round(position.value * 100);
    return activeEvent.value ? `${pct}% · ${activeEvent.value.label}` : `${pct}%`;
});

function jumpTo(e: TimelineEvent) {
    position.value = e.at;
}
</script>

<template>
    <StoryPage>
        <StorySection heading="Discrete progression">
            <div>
                <p class="text-admin-label mb-4 text-muted-foreground">Release timeline</p>

                <div
                    :class="
                        cn(
                            'flex flex-col gap-8 rounded-card border border-border bg-card p-6 shadow-cartoon',
                        )
                    "
                >
                    <!-- Scrubber -->
                    <div class="relative pt-8">
                        <GlassTimeline
                            :model-value="position"
                            :label="label"
                            @update:model-value="position = $event"
                        />

                        <!-- Tick overlay — absolute so the dots sit on top of the glass track. -->
                        <div class="pointer-events-none absolute inset-x-1 bottom-0 top-8 flex">
                            <div
                                v-for="e in events"
                                :key="e.id"
                                class="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                                :style="{ left: `${e.at * 100}%` }"
                            >
                                <span
                                    class="block h-2 w-2 rounded-full ring-2 ring-background"
                                    :style="{ background: `var(--section-color-${e.tone})` }"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Active event callout -->
                    <div
                        v-if="activeEvent"
                        class="flex items-start gap-3 rounded-md border-l-[3px] bg-background p-4"
                        :style="{ borderLeftColor: `var(--section-color-${activeEvent.tone})` }"
                    >
                        <div class="flex min-w-0 flex-col gap-1">
                            <span
                                class="text-admin-label"
                                :style="{ color: `var(--section-color-${activeEvent.tone})` }"
                            >
                                {{ activeEvent.label }}
                            </span>
                            <span class="text-small text-foreground">{{ activeEvent.body }}</span>
                        </div>
                    </div>
                    <div
                        v-else
                        class="ghost-slot p-4 text-small"
                    >
                        Drag the scrubber or click an event below.
                    </div>
                </div>
            </div>

            <!-- Event list -->
            <div>
                <p class="text-admin-label mb-4 text-muted-foreground">Events</p>
                <ol class="flex flex-col divide-y divide-border rounded-card border border-border bg-card shadow-cartoon">
                    <li
                        v-for="(e, i) in events"
                        :key="e.id"
                        :class="
                            cn(
                                'interactive-item flex cursor-pointer items-center gap-4 px-4 py-3',
                                i === activeIndex && 'bg-muted/40',
                            )
                        "
                        @click="jumpTo(e)"
                    >
                        <!-- F2.R1 W-DARK-READABILITY-REPAIR (paint re-open): the step number sits
                             on a brand-ramp fill whose luminance varies per tone, so a hardcoded
                             white collapses on the LIGHT rungs in dark (WCAG ~1.8-2.8). The native
                             contrast-color() picks the max-contrast ink per fill on the census
                             engines (Chrome 149 / Safari 26); text-white is the pre-modern base. -->
                        <span
                            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white"
                            :style="{ background: `var(--section-color-${e.tone})`, color: `contrast-color(var(--section-color-${e.tone}))` }"
                        >
                            {{ i + 1 }}
                        </span>
                        <div class="flex min-w-0 flex-1 flex-col">
                            <span class="text-small font-medium">{{ e.label }}</span>
                            <span class="text-mono-caption text-muted-foreground">{{ e.body }}</span>
                        </div>
                        <span class="fira-code text-mono-caption text-muted-foreground">
                            {{ Math.round(e.at * 100) }}%
                        </span>
                    </li>
                </ol>
            </div>
        </StorySection>

        <StorySection heading="Segmented — multi-phase progress">
            <TimelineSegmentedBody />
        </StorySection>

        <StorySection heading="Continuous — one rail, N regions">
            <TimelineContinuousBody />
        </StorySection>
    </StoryPage>
</template>
