<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { BouncyTabs, type TabOption } from "@/components/custom/tabs";

const viewMode = ref("grid");
const viewOptions: TabOption[] = [
    { label: "Grid", value: "grid" },
    { label: "List", value: "list" },
    { label: "Kanban", value: "kanban" },
    { label: "Timeline", value: "timeline" },
];

const priority = ref("normal");
const priorityOptions: TabOption[] = [
    { label: "Low", value: "low" },
    { label: "Normal", value: "normal" },
    { label: "High", value: "high" },
    { label: "Urgent", value: "urgent" },
];

const tense = ref("present");
const tenseOptions: TabOption[] = [
    { label: "Past", value: "past" },
    { label: "Present", value: "present" },
    { label: "Future", value: "future" },
];

const density = ref("cozy");
const densityOptions: TabOption[] = [
    { label: "Compact", value: "compact" },
    { label: "Cozy", value: "cozy" },
    { label: "Roomy", value: "roomy" },
];
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">Default variant</h2>
            <p class="text-sm text-muted-foreground">
                Subtle muted track, soft slider — suitable for dense panels.
            </p>
            <div class="flex flex-wrap items-center gap-3 rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-4">
                <BouncyTabs v-model="viewMode" :options="viewOptions" />
                <span class="text-xs text-muted-foreground">selected: {{ viewMode }}</span>
            </div>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">Pill variant</h2>
            <p class="text-sm text-muted-foreground">
                Solid foreground slider against a faint ghost — bolder, for hero toggles.
            </p>
            <div class="flex flex-wrap items-center gap-3 rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-4">
                <BouncyTabs v-model="priority" :options="priorityOptions" variant="pill" />
                <span class="text-xs text-muted-foreground">selected: {{ priority }}</span>
            </div>
        </section>

        <section class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="flex flex-col gap-2 rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-4">
                <p class="text-xs uppercase tracking-wide text-muted-foreground">Tense</p>
                <BouncyTabs v-model="tense" :options="tenseOptions" />
            </div>
            <div class="flex flex-col gap-2 rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-4">
                <p class="text-xs uppercase tracking-wide text-muted-foreground">Density</p>
                <BouncyTabs v-model="density" :options="densityOptions" variant="pill" />
            </div>
        </section>

        <section class="flex flex-col gap-2 text-sm text-muted-foreground">
            <h2 class="text-sm font-semibold text-foreground">How it works</h2>
            <ul class="list-disc pl-5 space-y-1">
                <li>Slider position + width reflow on prop change via a ResizeObserver-backed measure pass.</li>
                <li>Transition uses <code class="rounded bg-muted px-1">var(--spring-snappy)</code> for the slide, linear ease for fade.</li>
                <li>Click triggers a keyframed squash-stretch on the pressed button (200ms bouncy cubic).</li>
            </ul>
        </section>
    </StoryPage>
</template>
