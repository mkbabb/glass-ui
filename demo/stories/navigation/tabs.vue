<script setup lang="ts">
// BA.W-TABS — the /navigation/tabs story rebuilt on the standardized family.
// ONE component (`SegmentedTabs`), TWO materials (pill-glass + underline-paper),
// ONE orientation axis (horizontal · vertical). The four hand-rolled `ui/Tabs`
// recipes (the NF-1 full-width track / NF-3 rogue h3 / NF-7 four-radii incoherence)
// and the multi-select section (re-homed to ToggleGroup) are GONE — each material
// is shown over its PROPER substrate (pill over a glass backdrop, underline over a
// paper/grain card). The constellation may freely change (R10, verbatim).
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { ref } from "vue";
import {
    SegmentedTabs,
    type SegmentedTabOption,
} from "../../../src/components/custom/tabs";
import { IconChip } from "../../../src/components/custom/icon-chip";
import { LayoutGrid } from "@lucide/vue";
// BA.W-SUFFUSE2 — the navigation band's ONE coherent --section-color-12 indigo identity.
const NAV_STOP = 12;

// ── Pill (glass) — horizontal ──
const viewMode = ref("grid");
const viewOptions: SegmentedTabOption[] = [
    { label: "Grid", value: "grid" },
    { label: "List", value: "list" },
    { label: "Kanban", value: "kanban" },
    { label: "Timeline", value: "timeline" },
];

const priority = ref("normal");
const priorityOptions: SegmentedTabOption[] = [
    { label: "Low", value: "low" },
    { label: "Normal", value: "normal" },
    { label: "High", value: "high" },
    { label: "Urgent", value: "urgent" },
];

// ── Pill (glass) — DRAGGABLE (the LIQUID TAB, BB.W-DRAG-MORPH) ──
const liquidView = ref("grid");

// ── Pill (glass) — vertical ──
const account = ref("profile");
const accountOptions: SegmentedTabOption[] = [
    { label: "Profile", value: "profile" },
    { label: "Billing", value: "billing" },
    { label: "Team", value: "team" },
    { label: "API Keys", value: "keys" },
];

// ── Underline (paper) — horizontal ──
const docTab = ref("notes");
const docTabs: SegmentedTabOption[] = [
    { label: "Notes", value: "notes" },
    { label: "Specs", value: "specs" },
    { label: "Logs", value: "logs" },
];

// ── Underline (paper) — vertical (the leading-edge ink rail) ──
const chapterTab = ref("intro");
const chapterTabs: SegmentedTabOption[] = [
    { label: "Introduction", value: "intro" },
    { label: "Derivation", value: "derive" },
    { label: "Convergence", value: "converge" },
    { label: "Appendix", value: "appendix" },
];

// ── Responsive — the strip collapses to a <Select> below the breakpoint ──
const respView = ref("overview");
const respOptions: SegmentedTabOption[] = [
    { label: "Overview", value: "overview" },
    { label: "Activity", value: "activity" },
    { label: "Members", value: "members" },
    { label: "Settings", value: "settings" },
];

const chapterBody: Record<string, string> = {
    intro: "The setup: a periodic signal decomposed onto an orthonormal basis.",
    derive: "Project onto each basis function; the coefficients fall out by inner product.",
    converge: "Partial sums approach the signal in the mean-square sense.",
    appendix: "Edge cases, the Gibbs phenomenon, and the discrete transform.",
};
</script>

<template>
    <StoryPage>
        <!-- BA.W-SUFFUSE2 — the navigation-band identity event family on
             --section-color-12 (indigo). The chip is the ONE section event; the
             tab indicator stays the component's own selected-reads-as-glass register. -->
        <header
            class="flex items-center gap-4 border-l-[3px] pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${NAV_STOP})`,
                borderColor:
                    'color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="LayoutGrid" :section="NAV_STOP" />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Navigation · Tabs
                </span>
                <p class="text-small text-muted-foreground">
                    Panel and toggle navigation in two variants — pill and underline.
                    The labels stay ink; the section identity is the ONE color event.
                </p>
            </div>
        </header>

        <!-- ════ The PILL material (glass) ════ -->
        <StorySection
            heading="Pill — the glass material (default)"
            blurb="The default register. A glass-quiet track with a hairline edge; the selected indicator is the selected-reads-as-glass plate (glass-floating, forward of the track). It glides AND squishes on the calibrated snappy clock. Shown over a live glass backdrop where the material reads."
        >
            <div class="glass-card flex flex-col gap-4 rounded-[var(--radius-card)] p-5">
                <div class="flex flex-wrap items-center gap-3">
                    <SegmentedTabs v-model="viewMode" :options="viewOptions" />
                    <span class="text-xs text-muted-foreground"
                        >selected: {{ viewMode }}</span
                    >
                </div>
                <div class="flex flex-wrap items-center gap-3">
                    <SegmentedTabs v-model="priority" :options="priorityOptions" />
                    <span class="text-xs text-muted-foreground"
                        >selected: {{ priority }}</span
                    >
                </div>
            </div>
        </StorySection>

        <!-- ════ The PILL material — DRAGGABLE (the LIQUID TAB) ════ -->
        <StorySection
            heading="Pill — draggable (the liquid tab)"
            blurb="The iOS-27 move: GRAB the indicator and PULL it. The lozenge follows the finger ~1:1, stretches on drag velocity (capped low — it swells, never taffy-pulls), and flings to the nearest tab on release. The click path is unchanged; the drag is the additive :draggable axis. Composes the kf Draggable substrate (no second drag engine)."
        >
            <div class="glass-card flex flex-col gap-4 rounded-[var(--radius-card)] p-5">
                <div class="flex flex-wrap items-center gap-3">
                    <SegmentedTabs
                        v-model="liquidView"
                        :options="viewOptions"
                        draggable
                    />
                    <span class="text-xs text-muted-foreground"
                        >selected: {{ liquidView }} — drag the pill</span
                    >
                </div>
            </div>
        </StorySection>

        <!-- ════ The PILL material — vertical ════ -->
        <StorySection
            heading="Pill — vertical"
            blurb="The same engine, the block axis. The indicator tracks the column (axis-derived — no horizontal-only slab); the squish deforms on the block axis."
        >
            <div
                class="glass-card flex gap-5 rounded-[var(--radius-card)] p-5"
            >
                <SegmentedTabs
                    v-model="account"
                    :options="accountOptions"
                    orientation="vertical"
                    class="shrink-0"
                />
                <div class="min-h-32 flex-1 text-small text-muted-foreground">
                    Configure your
                    {{ accountOptions.find((o) => o.value === account)?.label.toLowerCase() }}
                    here.
                </div>
            </div>
        </StorySection>

        <!-- ════ The UNDERLINE material (paper) — horizontal ════ -->
        <StorySection
            heading="Underline — the paper material"
            blurb="For paper/editorial scenarios. NO plate, NO blur, NO track — just the 2px foreground ink hairline (the shared paper-ink-mark register). It SLIDES (a hairline does not squish). Shown over a paper-grain card, panel-nav role=tablist."
        >
            <div
                class="paper-grain-overlay rounded-[var(--radius-card)] border border-border/40 p-5"
            >
                <SegmentedTabs
                    v-model="docTab"
                    :options="docTabs"
                    variant="underline"
                />
                <p class="mt-4 text-small text-muted-foreground">
                    {{ docTab }} live here. Press
                    <kbd class="rounded border px-1">/</kbd> to search.
                </p>
            </div>
        </StorySection>

        <!-- ════ The UNDERLINE material — vertical (the leading-edge ink rail) ════ -->
        <StorySection
            heading="Underline — vertical (the leading-edge ink rail)"
            blurb="The vertical underline is the math-paper border-l read: a 2px ink rail on the active item's leading edge, running its full block extent."
        >
            <div
                class="paper-grain-overlay flex gap-6 rounded-[var(--radius-card)] border border-border/40 p-5"
            >
                <SegmentedTabs
                    v-model="chapterTab"
                    :options="chapterTabs"
                    variant="underline"
                    orientation="vertical"
                    class="shrink-0"
                />
                <p class="min-h-24 flex-1 text-small text-muted-foreground">
                    {{ chapterBody[chapterTab] }}
                </p>
            </div>
        </StorySection>

        <!-- ════ Responsive collapse ════ -->
        <StorySection
            heading="Responsive — collapses to a Select"
            blurb="Below the breakpoint the strip becomes a <Select>, both driven by one v-model. Narrow the viewport past 640px to see the swap."
        >
            <div
                class="glass-card max-w-md rounded-[var(--radius-card)] p-5"
            >
                <SegmentedTabs
                    v-model="respView"
                    :options="respOptions"
                    variant="underline"
                    :responsive="{ ariaLabel: 'Project view' }"
                />
                <p class="mt-4 text-xs text-muted-foreground">
                    active view: {{ respView }}
                </p>
            </div>
        </StorySection>
    </StoryPage>
</template>
