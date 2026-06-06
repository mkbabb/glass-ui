<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../../src/components/ui/tabs";
import { BouncyTabs, type TabOption } from "../../../src/components/custom/tabs";
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

// Bouncy variant — the custom <BouncyTabs> spring-slider toggle (merged in
// from the former standalone bouncy-tabs story, AV.W10).
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

        <!-- Bouncy — the custom <BouncyTabs> spring-slider toggle variant. -->
        <section class="flex flex-col gap-3">
            <h2 class="text-sm font-semibold text-muted-foreground">
                Bouncy (custom spring-slider variant)
            </h2>
            <p class="text-sm text-muted-foreground">
                <code class="rounded bg-muted px-1">&lt;BouncyTabs&gt;</code> — a
                squash-stretch spring slider over a shared track. Default and
                pill variants; slider position + width reflow on prop change.
            </p>
            <div class="flex flex-wrap items-center gap-3 rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-4">
                <BouncyTabs v-model="viewMode" :options="viewOptions" />
                <span class="text-xs text-muted-foreground">selected: {{ viewMode }}</span>
            </div>
            <div class="flex flex-wrap items-center gap-3 rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-4">
                <BouncyTabs v-model="priority" :options="priorityOptions" variant="pill" />
                <span class="text-xs text-muted-foreground">selected: {{ priority }}</span>
            </div>
        </section>
    </StoryPage>
</template>
