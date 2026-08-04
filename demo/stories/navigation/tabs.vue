<script setup lang="ts">
// SegmentedTabs demonstrates two materials and both orientation axes. The glass
// pill sits over glass; the paper underline sits over a grain card. Selection is
// singular here; multi-selection belongs to ToggleGroup.
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref } from "vue";
import { SegmentedTabs, type SegmentedTabOption } from "@glass/components/tabs";
// The leaf path, not the aurora barrel: the barrel's first line re-exports
// Aurora.vue and would drag the live component into this route's graph for a
// backdrop that never arms a device (the AppShell import takes the same leaf).
import { auroraFallbackGround } from "@glass/components/aurora/composables/auroraFallbackGround";
import { heroAuroraConfig, type HeroPaletteKey } from "../../chassis/hero/aurora-hero";

// ── The Q-4 specimen substrate (FROST Q-2/Q-4 — the #56 receiver row) ────────
// A glass pill over a flat page measures NOTHING: a blur radius over a flat field
// is invisible, so a material π taken on this route is inadmissible by
// σ-degeneracy. Every pill strip below therefore sits in a FIELD-WELL — the house
// idiom the configurator gallery already ships (`components/configurator/styles.css`
// §3: "the well is the COLOURFUL field; the warm-glass capsule frames it"), painted
// by the same device-free `auroraFallbackGround` raster the aurora preset cards
// bake (`substrates/aurora/usePresetThumbnails.ts`). It is STATIC — one CPU field
// sample at setup, no GL context, nothing animating, so nothing for PRM to pause.
//
// The paper/underline sections are deliberately NOT welled: that material declares
// NO plate and NO blur, so it has nothing to transmit and no π to feed.
//
// The field is this category's OWN hero palette (hue + chroma KEPT — the
// per-category identity the manifest declares), with its L band re-registered for a
// plate. Light folds the pastel hero wash DOWN into a band a 7-11px blur can
// visibly bite; dark is the house luminous-dark model (`aurora-hero.ts`
// §shellAuroraConfigDark — low L, warm hue, chroma kept) on a WIDER band, because
// the page-wide shell wash must stay recessive under prose and a specimen well
// carries none.
function plateField(palette: HeroPaletteKey, lo: number, hi: number) {
    const base = heroAuroraConfig(palette);
    const span = Math.max(1, base.palette.length - 1);
    return auroraFallbackGround(
        {
            ...base,
            palette: base.palette.map((stop, i) => ({
                ...stop,
                L: lo + ((hi - lo) * i) / span,
            })),
        },
        // 12 × 12 field samples (the preset cards bake 10): finer texels keep real
        // structure inside a crop the size of one tab strip.
        { grid: 12 },
    );
}

const wellLight = plateField("cat-navigation", 0.58, 0.97);
const wellDark = plateField("cat-navigation", 0.04, 0.64);
const wellStyle = {
    "--well-field": wellLight.backgroundImage,
    "--well-field-color": wellLight.backgroundColor,
    "--well-field-dark": wellDark.backgroundImage,
    "--well-field-color-dark": wellDark.backgroundColor,
};

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

// ── Pill (glass) — draggable liquid tab ──
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
    <StoryPage :style="wellStyle">

        <!-- ════ The PILL material (glass) ════ -->
        <StorySection
            heading="Pill — the glass material (default)"
            blurb="A quiet glass track with one selected capsule. The measured capsule owns its fill, rim, glide, and transient travel squish; at rest it fits its slot at scale 1."
        >
            <div
                class="glass-card flex flex-col gap-4 rounded-[var(--radius-card)] p-5"
            >
                <div class="flex flex-wrap items-center gap-3">
                    <div class="specimen-well">
                        <div class="grid-bg" aria-hidden="true"></div>
                        <SegmentedTabs
                            v-model="viewMode"
                            :options="viewOptions"
                            aria-label="View mode"
                        />
                    </div>
                    <span class="text-micro text-muted-foreground"
                        >selected: {{ viewMode }}</span
                    >
                </div>
                <div class="flex flex-wrap items-center gap-3">
                    <div class="specimen-well">
                        <div class="grid-bg" aria-hidden="true"></div>
                        <SegmentedTabs
                            v-model="priority"
                            :options="priorityOptions"
                            aria-label="Priority"
                        />
                    </div>
                    <span class="text-micro text-muted-foreground"
                        >selected: {{ priority }}</span
                    >
                </div>
            </div>
        </StorySection>

        <!-- ════ The PILL material — DRAGGABLE (the LIQUID TAB) ════ -->
        <StorySection
            heading="Pill — draggable (the liquid tab)"
            blurb="Grab and pull the selected lozenge. It follows the finger, stretches gently with speed, and settles onto the nearest tab when released; clicking still selects directly."
        >
            <div
                class="glass-card flex flex-col gap-4 rounded-[var(--radius-card)] p-5"
            >
                <div class="flex flex-wrap items-center gap-3">
                    <!-- the drag is the `motion="full"` DEFAULT
                         (the retired `draggable` boolean's successor); a click-only
                         strip opts DOWN via `motion="reduced"`. -->
                    <div class="specimen-well">
                        <div class="grid-bg" aria-hidden="true"></div>
                        <SegmentedTabs
                            v-model="liquidView"
                            :options="viewOptions"
                            aria-label="Draggable view mode"
                        />
                    </div>
                    <span class="text-micro text-muted-foreground"
                        >selected: {{ liquidView }} — drag the pill</span
                    >
                </div>
            </div>
        </StorySection>

        <!-- ════ The PILL material — vertical ════ -->
        <StorySection
            heading="Pill — vertical"
            blurb="The same gesture works down a column: the indicator follows the block axis and its soft stretch turns with the layout."
        >
            <div class="glass-card flex gap-5 rounded-[var(--radius-card)] p-5">
                <div class="specimen-well shrink-0">
                    <div class="grid-bg" aria-hidden="true"></div>
                    <SegmentedTabs
                        v-model="account"
                        :options="accountOptions"
                        orientation="vertical"
                        aria-label="Account settings"
                        class="shrink-0"
                    />
                </div>
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
                <div class="specimen-well">
                    <div class="grid-bg" aria-hidden="true"></div>
                    <SegmentedTabs
                        v-model="reviewTab"
                        :options="reviewOptions"
                        semantics="tabs"
                        activation="manual"
                        aria-label="Release review"
                    />
                </div>
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
                        <div class="specimen-well min-w-max">
                            <div class="grid-bg" aria-hidden="true"></div>
                            <SegmentedTabs
                                v-model="historyRange"
                                :options="historyOptions"
                                semantics="tabs"
                                aria-label="History range"
                                class="min-w-max"
                            />
                        </div>
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
                    <div class="specimen-well">
                        <div class="grid-bg" aria-hidden="true"></div>
                        <SegmentedTabs
                            v-model="rtlView"
                            :options="rtlOptions"
                            semantics="tabs"
                            aria-label="عرض المشروع"
                        />
                    </div>
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
                <p class="mt-4 text-micro text-muted-foreground">
                    active view: {{ respView }}
                </p>
            </div>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* ── The Q-4 specimen well ───────────────────────────────────────────────────
   The structured backdrop the glass reads through. TWO static house layers, both
   painted BEHIND the specimen — and nothing on the ancestor chain takes a filter,
   blend, opacity or isolation, so each glass box keeps the page as its backdrop
   root (the backdrop must sit behind the glass in stacking, never filter an
   ancestor):

     · the FIELD — the device-free `auroraFallbackGround` raster on the well's own
       background, sized by the §3 field-well rule's `cover` / `center` / smooth
       upscale (`components/configurator/styles.css`), so the tiny raster's
       per-quadrant mean luminance survives the bilinear stretch. It carries the
       LOW-frequency structure the transmission arm reads.
     · the RULING — the shipped `.grid-bg` blueprint wash (`chassis/hero/story-hero.css`),
       its two DOCUMENTED strength knobs dialled up for a plate
       (`tokens/scale-paper.css` names `--grid-line` / `--grid-line-major` the
       consumer strength knobs). The pitch rhythm is the shared one, untouched. It
       carries the HIGH frequency a blur radius can actually destroy. */
.specimen-well {
    position: relative;
    border-radius: var(--radius-card);
    padding: clamp(0.75rem, 1.5vw, 1.125rem);
    background-color: var(--well-field-color);
    background-image: var(--well-field);
    background-size: cover;
    background-position: center;
    image-rendering: auto;
}

/* Plain `.dark` ancestor — a scoped `:global(.dark)` silently drops from the
   emitted CSS. */
.dark .specimen-well {
    background-color: var(--well-field-color-dark);
    background-image: var(--well-field-dark);
}

.specimen-well > .grid-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    border-radius: inherit;
    pointer-events: none;
    --grid-line: color-mix(in srgb, var(--foreground) 18%, transparent);
    --grid-line-major: color-mix(in srgb, var(--foreground) 42%, transparent);
}

/* The specimen paints above the ruling plane; the ruling stays in the backdrop. */
.specimen-well > :not(.grid-bg) {
    position: relative;
    z-index: 1;
}
</style>
