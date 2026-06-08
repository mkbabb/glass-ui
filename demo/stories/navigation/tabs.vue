<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../src/components/ui/tabs";
import {
    SegmentedTabs,
    type SegmentedTabOption,
} from "../../../src/components/custom/tabs";
import { cn } from "../../../src/utils/cn";

const defaultTab = ref("overview");
const pillTab = ref("daily");
const underlineTab = ref("notes");
const verticalTab = ref("profile");

const sections = [
    { id: "overview", label: "Overview", blurb: "Glanceable summary of everything that matters." },
    { id: "activity", label: "Activity", blurb: "Recent events in reverse-chronological order." },
    { id: "settings", label: "Settings", blurb: "Per-space preferences — sync, notifications, theme." },
];

const cadences = [
    { id: "daily", label: "Daily" },
    { id: "weekly", label: "Weekly" },
    { id: "monthly", label: "Monthly" },
];

const docs = [
    { id: "notes", label: "Notes" },
    { id: "specs", label: "Specs" },
    { id: "logs", label: "Logs" },
];

const profile = [
    { id: "profile", label: "Profile" },
    { id: "billing", label: "Billing" },
    { id: "team", label: "Team" },
    { id: "keys", label: "API Keys" },
];

// Segmented (default) — the <SegmentedTabs> spring-slider over a muted track;
// the elastic indicator glides and squishes on --spring-snappy.
const viewMode = ref("grid");
const viewOptions: SegmentedTabOption[] = [
    { label: "Grid", value: "grid" },
    { label: "List", value: "list" },
    { label: "Kanban", value: "kanban" },
    { label: "Timeline", value: "timeline" },
];

// Pill variant — the solid --foreground pill.
const priority = ref("normal");
const priorityOptions: SegmentedTabOption[] = [
    { label: "Low", value: "low" },
    { label: "Normal", value: "normal" },
    { label: "High", value: "high" },
    { label: "Urgent", value: "urgent" },
];

// Underline variant — the panel-nav (role=tablist) hairline rule.
const docTab = ref("notes");
const docTabs: SegmentedTabOption[] = docs.map((d) => ({ label: d.label, value: d.id }));

// Multi-select — the ToggleGroup-shaped surface (role=group, aria-pressed) over
// the same engine; N simultaneous pressed segments.
const facets = ref<string[]>(["pdf"]);
const facetOptions: SegmentedTabOption[] = [
    { label: "PDF", value: "pdf" },
    { label: "Docs", value: "docs" },
    { label: "Slides", value: "slides" },
    { label: "Sheets", value: "sheets" },
];

// Responsive — the strip collapses to a <Select> below the breakpoint
// (subsumes the former standalone ResponsiveTabs).
const respView = ref("overview");
const respOptions: SegmentedTabOption[] = [
    { label: "Overview", value: "overview" },
    { label: "Activity", value: "activity" },
    { label: "Members", value: "members" },
    { label: "Settings", value: "settings" },
];
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">Default</h2>
            <Tabs v-model="defaultTab" class="flex flex-col gap-3">
                <TabsList class="bg-muted/50">
                    <TabsTrigger
                        v-for="s in sections"
                        :key="s.id"
                        :value="s.id"
                        :class="cn('data-[state=active]:bg-background data-[state=active]:shadow-sm')"
                    >
                        {{ s.label }}
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    v-for="s in sections"
                    :key="s.id"
                    :value="s.id"
                    class="rounded-[var(--radius-card)] border border-border/40 bg-card/50 p-4 text-sm"
                >
                    {{ s.blurb }}
                </TabsContent>
            </Tabs>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">Pill (inline highlight)</h2>
            <Tabs v-model="pillTab" class="flex flex-col gap-3">
                <TabsList class="rounded-full bg-foreground/5 p-1 gap-1">
                    <TabsTrigger
                        v-for="c in cadences"
                        :key="c.id"
                        :value="c.id"
                        :class="cn('rounded-full px-4 data-[state=active]:bg-foreground data-[state=active]:text-background')"
                    >
                        {{ c.label }}
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    v-for="c in cadences"
                    :key="c.id"
                    :value="c.id"
                    class="text-sm text-muted-foreground"
                >
                    Showing {{ c.label.toLowerCase() }} metrics. Drag the range to adjust the window.
                </TabsContent>
            </Tabs>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">Underline</h2>
            <Tabs v-model="underlineTab" class="flex flex-col gap-3">
                <TabsList class="rounded-none border-b border-border/40 bg-transparent p-0 gap-6">
                    <TabsTrigger
                        v-for="d in docs"
                        :key="d.id"
                        :value="d.id"
                        :class="cn('rounded-none border-b-2 border-transparent px-0 pb-2 data-[state=active]:border-foreground')"
                    >
                        {{ d.label }}
                    </TabsTrigger>
                </TabsList>
                <TabsContent
                    v-for="d in docs"
                    :key="d.id"
                    :value="d.id"
                    class="text-sm text-muted-foreground"
                >
                    {{ d.label }} live here. Press <kbd class="rounded border px-1">/</kbd> to search.
                </TabsContent>
            </Tabs>
        </section>

        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">Vertical</h2>
            <Tabs
                v-model="verticalTab"
                orientation="vertical"
                class="flex gap-6 rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-3"
            >
                <TabsList class="flex h-auto flex-col items-stretch gap-1 bg-transparent p-0 w-40">
                    <TabsTrigger
                        v-for="p in profile"
                        :key="p.id"
                        :value="p.id"
                        :class="cn('justify-start rounded-md data-[state=active]:bg-muted')"
                    >
                        {{ p.label }}
                    </TabsTrigger>
                </TabsList>
                <div class="flex-1 min-h-32">
                    <TabsContent
                        v-for="p in profile"
                        :key="p.id"
                        :value="p.id"
                        class="mt-0 text-sm text-muted-foreground"
                    >
                        <h3 class="mb-1 text-base font-medium text-foreground">{{ p.label }}</h3>
                        Configure your {{ p.label.toLowerCase() }} here.
                    </TabsContent>
                </div>
            </Tabs>
        </section>

        <!-- SegmentedTabs (DEFAULT) — the unified spring-slider with the
             elastic glide+squish indicator on --spring-snappy. -->
        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">
                Segmented (default spring-slider variant)
            </h2>
            <p class="text-sm text-muted-foreground">
                <code class="rounded bg-muted px-1">&lt;SegmentedTabs&gt;</code> — the
                default pill-slider over a muted track. The indicator glides AND
                squishes (volume-preserving stretch capped at
                <code class="rounded bg-muted px-1">--tab-indicator-max-stretch</code>)
                on <code class="rounded bg-muted px-1">--spring-snappy</code>.
            </p>
            <div class="flex flex-wrap items-center gap-3 rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-4">
                <SegmentedTabs v-model="viewMode" :options="viewOptions" />
                <span class="text-xs text-muted-foreground">selected: {{ viewMode }}</span>
            </div>
        </section>

        <!-- Pill variant — the solid --foreground pill. -->
        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">
                Pill (variant="pill")
            </h2>
            <p class="text-sm text-muted-foreground">
                <code class="rounded bg-muted px-1">variant="pill"</code> — the solid
                foreground pill chrome over the same elastic indicator.
            </p>
            <div class="flex flex-wrap items-center gap-3 rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-4">
                <SegmentedTabs v-model="priority" :options="priorityOptions" variant="pill" />
                <span class="text-xs text-muted-foreground">selected: {{ priority }}</span>
            </div>
        </section>

        <!-- Underline variant — the panel-nav (role=tablist) hairline rule. -->
        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">
                Underline (variant="underline")
            </h2>
            <p class="text-sm text-muted-foreground">
                <code class="rounded bg-muted px-1">variant="underline"</code> — the
                panel-nav <code class="rounded bg-muted px-1">role="tablist"</code>
                hairline rule, sharing the same glide+squish indicator grammar.
            </p>
            <div class="rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-4">
                <SegmentedTabs v-model="docTab" :options="docTabs" variant="underline" />
                <p class="mt-3 text-xs text-muted-foreground">selected: {{ docTab }}</p>
            </div>
        </section>

        <!-- Multi-select — the ToggleGroup-shaped surface over the same engine. -->
        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">
                Multi-select (:multi-select="true")
            </h2>
            <p class="text-sm text-muted-foreground">
                <code class="rounded bg-muted px-1">:multi-select="true"</code> — the
                ToggleGroup-shaped surface (<code class="rounded bg-muted px-1">role="group"</code>,
                <code class="rounded bg-muted px-1">aria-pressed</code>); N
                simultaneous pressed segments over the shared slider engine.
            </p>
            <div class="flex flex-wrap items-center gap-3 rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-4">
                <SegmentedTabs v-model="facets" :options="facetOptions" :multi-select="true" />
                <span class="text-xs text-muted-foreground">selected: {{ facets.join(", ") }}</span>
            </div>
        </section>

        <!-- Responsive — strip collapses to a <Select> below the breakpoint. -->
        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">
                Responsive (:responsive — subsumes ResponsiveTabs)
            </h2>
            <p class="text-sm text-muted-foreground">
                <code class="rounded bg-muted px-1">:responsive="true"</code> — below
                the breakpoint the strip collapses to a
                <code class="rounded bg-muted px-1">&lt;Select&gt;</code>, both
                driven by one v-model. Narrow the viewport past 640px to see the swap.
            </p>
            <div class="max-w-md rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-4">
                <SegmentedTabs
                    v-model="respView"
                    :options="respOptions"
                    variant="underline"
                    :responsive="{ ariaLabel: 'Project view' }"
                />
                <p class="mt-3 text-xs text-muted-foreground">active view: {{ respView }}</p>
            </div>
        </section>
    </StoryPage>
</template>
