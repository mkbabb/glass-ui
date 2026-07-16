<script setup lang="ts">
// BA.W-TABS — the /navigation/tabs story rebuilt on the standardized family.
// ONE component (`SegmentedTabs`), TWO materials (pill-glass + underline-paper),
// ONE orientation axis (horizontal · vertical). The four hand-rolled `ui/Tabs`
// recipes (the NF-1 full-width track / NF-3 rogue h3 / NF-7 four-radii incoherence)
// and the multi-select section (re-homed to ToggleGroup) are GONE — each material
// is shown over its PROPER substrate (pill over a glass backdrop, underline over a
// paper/grain card). The constellation may freely change (R10, verbatim).
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref } from "vue";
import { SegmentedTabs, type SegmentedTabOption } from "@glass/components/tabs";


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
    { label: "Urgent", value: "urgent", disabled: true },
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

const reviewTab = ref("changes");
const reviewOptions: SegmentedTabOption[] = [
    { label: "Summary", value: "summary" },
    { label: "Changes", value: "changes" },
    { label: "Checks", value: "checks" },
];
const reviewBody: Record<string, string> = {
    summary: "One release candidate, ready for review.",
    changes: "Six component refinements and two accessibility fixes.",
    checks: "Type, unit, and package checks are green.",
};

const historyRange = ref("month");
const historyOptions: SegmentedTabOption[] = [
    { label: "Today", value: "today" },
    { label: "7 days", value: "week" },
    { label: "30 days", value: "month" },
    { label: "Quarter", value: "quarter" },
    { label: "Half year", value: "half" },
    { label: "Year", value: "year" },
    { label: "All time", value: "all" },
];

const rtlView = ref("activity");
const rtlOptions: SegmentedTabOption[] = [
    { label: "نظرة عامة", value: "overview" },
    { label: "النشاط", value: "activity" },
    { label: "الفريق", value: "team" },
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

        <!-- ════ The PILL material (glass) ════ -->
        <StorySection
            heading="Pill — the glass material (default)"
            blurb="A quiet glass track with one selected capsule. The measured capsule owns its fill, rim, refraction, glide, and transient travel squish; at rest it fits its slot at scale 1."
        >
            <div
                class="glass-card flex flex-col gap-4 rounded-[var(--radius-card)] p-5"
            >
                <div class="flex flex-wrap items-center gap-3">
                    <SegmentedTabs
                        v-model="viewMode"
                        :options="viewOptions"
                        aria-label="View mode"
                    />
                    <span class="text-xs text-muted-foreground"
                        >selected: {{ viewMode }}</span
                    >
                </div>
                <div class="flex flex-wrap items-center gap-3">
                    <SegmentedTabs
                        v-model="priority"
                        :options="priorityOptions"
                        aria-label="Priority"
                    />
                    <span class="text-xs text-muted-foreground"
                        >selected: {{ priority }}</span
                    >
                </div>
            </div>
        </StorySection>

        <!-- ════ The PILL material — DRAGGABLE (the LIQUID TAB) ════ -->
        <StorySection
            heading="Pill — draggable (the liquid tab)"
            blurb="The iOS-27 move: GRAB the indicator and PULL it. The lozenge follows the finger ~1:1, stretches on drag velocity (capped low — it swells, never taffy-pulls), and flings to the nearest tab on release. The click path is unchanged; the drag is the additive :draggable axis. Composes the shared drag substrate (no second drag engine)."
        >
            <div
                class="glass-card flex flex-col gap-4 rounded-[var(--radius-card)] p-5"
            >
                <div class="flex flex-wrap items-center gap-3">
                    <!-- BH.W-MOTION-AXIS — the drag is the `motion="full"` DEFAULT
                         (the retired `draggable` boolean's successor); a click-only
                         strip opts DOWN via `motion="reduced"`. -->
                    <SegmentedTabs
                        v-model="liquidView"
                        :options="viewOptions"
                        aria-label="Draggable view mode"
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
            <div class="glass-card flex gap-5 rounded-[var(--radius-card)] p-5">
                <SegmentedTabs
                    v-model="account"
                    :options="accountOptions"
                    orientation="vertical"
                    aria-label="Account settings"
                    class="shrink-0"
                />
                <div class="min-h-32 flex-1 text-small text-muted-foreground">
                    Configure your
                    {{
                        accountOptions
                            .find((o) => o.value === account)
                            ?.label.toLowerCase()
                    }}
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
                    aria-label="Document section"
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
                    aria-label="Chapter"
                    class="shrink-0"
                />
                <p class="min-h-24 flex-1 text-small text-muted-foreground">
                    {{ chapterBody[chapterTab] }}
                </p>
            </div>
        </StorySection>

        <StorySection
            heading="Manual activation"
            blurb="Arrow keys move the focus ring without moving the selected fill. Enter or Space commits the focused panel; click and touch still select directly."
        >
            <div class="glass-card max-w-xl rounded-[var(--radius-card)] p-5">
                <SegmentedTabs
                    v-model="reviewTab"
                    :options="reviewOptions"
                    semantics="tabs"
                    activation="manual"
                    aria-label="Release review"
                />
                <p class="mt-4 text-small text-muted-foreground">
                    {{ reviewBody[reviewTab] }}
                </p>
            </div>
        </StorySection>

        <StorySection
            heading="Overflow and direction"
            blurb="The first strip remains a real horizontally scrollable tab run; it does not collapse or clip options. The second keeps the one measured active fill fitted in right-to-left flow."
        >
            <div class="grid gap-5 lg:grid-cols-2">
                <div class="glass-card min-w-0 rounded-[var(--radius-card)] p-5">
                    <p class="mb-3 text-caption text-muted-foreground">
                        Scrollable history range
                    </p>
                    <div
                        class="max-w-[22rem] overflow-x-auto pb-2"
                        role="region"
                        aria-label="Scrollable history ranges"
                        tabindex="0"
                    >
                        <SegmentedTabs
                            v-model="historyRange"
                            :options="historyOptions"
                            semantics="tabs"
                            aria-label="History range"
                            class="min-w-max"
                        />
                    </div>
                    <p class="mt-2 text-caption text-muted-foreground">
                        Selected: {{ historyRange }}
                    </p>
                </div>

                <div
                    dir="rtl"
                    class="glass-card min-w-0 rounded-[var(--radius-card)] p-5 text-right"
                >
                    <p class="mb-3 text-caption text-muted-foreground">
                        اتجاه من اليمين إلى اليسار
                    </p>
                    <SegmentedTabs
                        v-model="rtlView"
                        :options="rtlOptions"
                        semantics="tabs"
                        aria-label="عرض المشروع"
                    />
                    <p class="mt-2 text-caption text-muted-foreground">
                        المحدد: {{ rtlView }}
                    </p>
                </div>
            </div>
        </StorySection>

        <!-- ════ Responsive collapse ════ -->
        <StorySection
            heading="Responsive — collapses to a Select"
            blurb="Below the breakpoint the strip becomes a <Select>, both driven by one v-model. Narrow the viewport past 640px to see the swap."
        >
            <div class="glass-card max-w-md rounded-[var(--radius-card)] p-5">
                <SegmentedTabs
                    v-model="respView"
                    :options="respOptions"
                    variant="underline"
                    aria-label="Project view"
                    :responsive="{ ariaLabel: 'Project view' }"
                />
                <p class="mt-4 text-xs text-muted-foreground">
                    active view: {{ respView }}
                </p>
            </div>
        </StorySection>
    </StoryPage>
</template>
