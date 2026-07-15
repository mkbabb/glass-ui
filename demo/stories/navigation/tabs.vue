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
} from "@glass/components/tabs";
import { IconChip } from "@glass/components/icon-chip";
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

// ── Pill — accent ink & glyph (the contrast-split) ──
const eyeglassView = ref("grid");
// The selected-GLYPH accent-ink demo needs a glyph (an svg icon) per option — the
// `--tab-selected-ink` seam tints the selected svg while the LABEL stays warm-ink.
const eyeglassIcons: Record<string, Component> = {
    grid: LayoutGrid,
    list: List,
    kanban: Kanban,
    timeline: Clock,
};

// ── Pill — vertical sizing (the --eyeglass-proud knob) ──
const sizingViewFlat = ref("grid");
const sizingViewProud = ref("grid");

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
            blurb="The default register — the iOS-27 loupe. A glass-quiet track with a hairline edge; the selected indicator is a proud liquid-glass plate that sits taller than its slot (an inset long-rest that magnifies proud on touch and travel — the two-rest-state) and refracts the frosted track through a squircle bevel. It glides AND squishes on the calibrated snappy clock. Off backdrop-filter:url() engines it degrades to the honest glass-capsule frost floor — no faked bend."
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
            blurb="The iOS-27 move: GRAB the indicator and PULL it. The lozenge follows the finger ~1:1, stretches on drag velocity (capped low — it swells, never taffy-pulls), and flings to the nearest tab on release. The click path is unchanged; the drag is the additive :draggable axis. Composes the shared drag substrate (no second drag engine)."
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

        <!-- ════ The PILL material — accent ink & glyph (the contrast-split) ════ -->
        <StorySection
            heading="Pill — accent ink & glyph (the contrast-split)"
            blurb="A consumer accent (teal) flows the selected rim via --glass-accent and tints the SELECTED glyph via --tab-selected-ink, while the LABEL stays warm-ink for the AA floor — the contrast-split. The per-option slot renders an icon beside its label; the accent tokens are the token-first retune knob (unset → byte-identical to the bare default)."
        >
            <div class="glass-card flex flex-col gap-4 rounded-[var(--radius-card)] p-5">
                <div class="flex flex-wrap items-center gap-3">
                    <SegmentedTabs
                        v-model="eyeglassView"
                        :options="viewOptions"
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

        <!-- ════ The PILL material — vertical sizing (the config) ════ -->
        <StorySection
            heading="Pill — vertical sizing (the config)"
            blurb="ONE knob tunes the loupe's proud outset: --eyeglass-proud (the LIVE magnify ratio) with --eyeglass-settled (the inset rest). The left strip pins both to 1 for a FLAT slot-fill pill (the token-first escape — the flat register the loupe replaces); the right strip pushes the proud to the tall end of the measured band."
        >
            <div class="glass-card flex flex-wrap items-center gap-8 rounded-[var(--radius-card)] p-5">
                <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground"
                        >flat (--eyeglass-proud: 1)</span
                    >
                    <SegmentedTabs
                        v-model="sizingViewFlat"
                        :options="viewOptions"
                        :style="{ '--eyeglass-proud': '1', '--eyeglass-settled': '1' }"
                    />
                </div>
                <div class="flex flex-col gap-2">
                    <span class="text-xs text-muted-foreground"
                        >proud (--eyeglass-proud: 1.18)</span
                    >
                    <SegmentedTabs
                        v-model="sizingViewProud"
                        :options="viewOptions"
                        :style="{ '--eyeglass-proud': '1.18' }"
                    />
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
