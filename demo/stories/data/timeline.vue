<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref, computed } from "vue";
import { GlassTimeline } from "@glass/components/custom/timeline";
import { cn } from "@glass/utils/cn";

interface TimelineEvent {
    id: string;
    at: number; // normalized 0..1
    label: string;
    body: string;
    tone: string; // section-N
}

const events: TimelineEvent[] = [
    { id: "e1", at: 0.04, label: "Kickoff",       body: "Tokens audit begins.",                 tone: "0" },
    { id: "e2", at: 0.22, label: "Paper backdrop",body: "Turbulence underpaint lands.",         tone: "2" },
    { id: "e3", at: 0.41, label: "Cartoon shadow",body: "Default card shadow gets the offset.", tone: "5" },
    { id: "e4", at: 0.58, label: "Dock FLIP",     body: "Layer-group size-FLIP + crossfade.",   tone: "4" },
    { id: "e5", at: 0.76, label: "Storybook",     body: "Routed demo replaces monolith.",       tone: "7" },
    { id: "e6", at: 0.94, label: "Ship",          body: "Consumers rebase onto defaults.",      tone: "8" },
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
                    <span
                        class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white"
                        :style="{ background: `var(--section-color-${e.tone})` }"
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
    </StoryPage>
</template>
