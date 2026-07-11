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
import { ref, type Component } from "vue";
import {
    SegmentedTabs,
    type SegmentedTabOption,
} from "@glass/components/custom/tabs";
import { IconChip } from "@glass/components/custom/icon-chip";
import { LayoutGrid, List, Kanban, Clock } from "@lucide/vue";

// BC.W-SUFFUSE-reconcile — the navigation band's ONE coherent --section-color-12 indigo identity. PH3-safe (inline borderLeft, not the border-l-[3px] + <IconChip> double-header shape).
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

// ── Pill (glass) — EYEGLASS (the iOS-27 loupe, BG.W-EYEGLASS-TABS) ──
const eyeglassView = ref("grid");
// The selected-GLYPH accent-ink demo needs a glyph (an svg icon) per option — the
// `--tab-selected-ink` seam tints the selected svg while the LABEL stays warm-ink.
const eyeglassIcons: Record<string, Component> = {
    grid: LayoutGrid,
    list: List,
    kanban: Kanban,
    timeline: Clock,
};

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
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${NAV_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="LayoutGrid" :section="NAV_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Navigation · Tabs
                </span>
                <p class="text-small text-muted-foreground">
                    Panel-nav and toggle-strip tabs — the section identity is the ONE color event.
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
                    <!-- BH.W-MOTION-AXIS — the drag is the `motion="full"` DEFAULT
                         (the retired `draggable` boolean's successor); a click-only
                         strip opts DOWN via `motion="reduced"`. -->
                    <SegmentedTabs
                        v-model="liquidView"
                        :options="viewOptions"
                    />
                    <span class="text-xs text-muted-foreground"
                        >selected: {{ liquidView }} — drag the pill</span
                    >
                </div>
            </div>
        </StorySection>

        <!-- ════ The PILL material — EYEGLASS (the iOS-27 loupe) ════ -->
        <StorySection
            heading="Pill — eyeglass (the iOS-27 loupe)"
            blurb="The proud liquid-glass LOUPE (pill-only, additive default-off). The selected pill composes .glass-lens — on Chromium it REFRACTS the frosted aurora stage through a squircle bevel; off backdrop-filter:url() engines it degrades to the honest proud .glass-capsule frost floor (no faked bend). The pill sits PROUD — taller than its slot, crown/base spilling past the track. A consumer accent preset (teal) flows the rim + tints the selected GLYPH via --tab-selected-ink while the LABEL stays warm-ink (the contrast-split). The snappy glide + squish are unchanged (frozen clock)."
        >
            <div class="glass-card flex flex-col gap-4 rounded-[var(--radius-card)] p-5">
                <div class="flex flex-wrap items-center gap-3">
                    <SegmentedTabs
                        v-model="eyeglassView"
                        :options="viewOptions"
                        eyeglass
                        :style="{
                            '--glass-accent': 'oklch(0.82 0.13 205)',
                            '--glass-accent-strength': '42%',
                            '--tab-selected-ink': 'oklch(0.86 0.15 205)',
                        }"
                    >
                        <template #option="{ option }">
                            <component
                                :is="eyeglassIcons[option.value]"
                                class="inline size-4 align-[-3px]"
                            />
                            <span class="ml-1.5">{{ option.label }}</span>
                        </template>
                    </SegmentedTabs>
                    <span class="text-xs text-muted-foreground"
                        >selected: {{ eyeglassView }}</span
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
