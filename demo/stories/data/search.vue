<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { computed, ref } from "vue";
import { SearchBar, useFuzzySearch } from "@glass/components/search";
import type { SearchResult, SearchableItem } from "@glass/components/search";
import { Badge } from "@glass/components/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@glass/components/card";
import { Surface } from "@glass/components/surface";

type SearchStatus = "wired" | "proof" | "consumer" | "triage";

interface StorySearchItem extends SearchableItem {
    owner: string;
    status: SearchStatus;
    tags: string[];
    tone: string;
}

type RowSeed = readonly [
    label: string,
    type: string,
    text: string,
    status: SearchStatus,
    owner: string,
    tags: readonly string[],
];

const TONES = ["0", "2", "3", "4", "5", "7", "8", "11"] as const;

const rowSeeds = [
    [
        "SearchBar query rail",
        "component",
        "Compact input bar with a baked-in icon for filtering catalogue rows.",
        "proof",
        "Search",
        ["SearchBar", "input"],
    ],
    [
        "useFuzzySearch state",
        "composable",
        "Reactive query, debounce, selected index, open state, and result selection.",
        "wired",
        "Search",
        ["useFuzzySearch", "state"],
    ],
    [
        "Glass panel substrate",
        "component",
        "Glass renderer consumer row with tiered surface tokens and filter state.",
        "consumer",
        "Foundations",
        ["glass", "panel"],
    ],
    [
        "Dock dropdown trigger",
        "component",
        "Navigation package trigger row for dock-scoped menus.",
        "wired",
        "Navigation",
        ["dock", "dropdown"],
    ],
    [
        "Dock select trigger",
        "component",
        "Navigation package trigger row for dock-scoped selection controls.",
        "wired",
        "Navigation",
        ["dock", "select"],
    ],
    [
        "Carousel item slot",
        "component",
        "Container package item row with active index and slide slots.",
        "triage",
        "Containers",
        ["carousel", "slot"],
    ],
    [
        "Chip modes",
        "primitive",
        "Static, selectable, action, and removable chips with explicit semantics.",
        "wired",
        "Primitives",
        ["toggle", "chip"],
    ],
    [
        "Sortable handle drag",
        "data",
        "Drag-only handle row with reorder events and context wiring.",
        "consumer",
        "Data",
        ["sortable", "handle"],
    ],
    [
        "Timeline axis",
        "data",
        "Phase spans on one normalized axis with addressable boundary marks.",
        "consumer",
        "Data",
        ["timeline", "progress"],
    ],
    [
        "Infinite feed sentinel",
        "data",
        "Intersection observer row for batched feed loading.",
        "consumer",
        "Data",
        ["infinite", "feed"],
    ],
    [
        "Data table filter",
        "data",
        "Column sorting and pagination row with a local filter input.",
        "proof",
        "Data",
        ["table", "filter"],
    ],
    [
        "Tags input catalogue",
        "data",
        "Tokenized data entry row with removable tag chips.",
        "proof",
        "Data",
        ["tags", "input"],
    ],
    [
        "Avatar fallback stack",
        "data",
        "Initials, image loading, and grouped avatar row.",
        "proof",
        "Data",
        ["avatar", "fallback"],
    ],
    [
        "Command palette route",
        "navigation",
        "Keyboard-first command row with grouped actions.",
        "consumer",
        "Navigation",
        ["command", "palette"],
    ],
    [
        "Dock rail navigation",
        "navigation",
        "Vertical GlassDock rail row with tooltip-backed icon buttons.",
        "consumer",
        "Navigation",
        ["rail", "icons"],
    ],
    [
        "Sidebar progressive panels",
        "navigation",
        "Nested navigation row with progressive disclosure and route state.",
        "consumer",
        "Navigation",
        ["sidebar", "panels"],
    ],
    [
        "Segmented tabs motion",
        "navigation",
        "Animated tab indicator row with active tab geometry.",
        "proof",
        "Navigation",
        ["tabs", "motion"],
    ],
    [
        "Dialog focus trap",
        "container",
        "Modal surface row with overlay, title, and close action.",
        "proof",
        "Containers",
        ["dialog", "focus"],
    ],
    [
        "Sheet side panel",
        "container",
        "Edge-anchored row with controlled open state and action footer.",
        "proof",
        "Containers",
        ["sheet", "panel"],
    ],
    [
        "Sheet detent ladder",
        "container",
        "Bottom sheet resting at a rung, with the grip, the footer and the fling.",
        "proof",
        "Containers",
        ["sheet", "detents", "mobile"],
    ],
    [
        "Popover anchored surface",
        "container",
        "Floating anchored content row with trigger and portal behavior.",
        "proof",
        "Containers",
        ["popover", "anchor"],
    ],
    [
        "Dropdown menu actions",
        "container",
        "Menu item row with shortcut labels and destructive action styling.",
        "proof",
        "Containers",
        ["dropdown", "menu"],
    ],
    [
        "Context menu target",
        "container",
        "Secondary-click menu row with checkbox and separator items.",
        "proof",
        "Containers",
        ["context", "menu"],
    ],
    [
        "Hover card profile",
        "container",
        "Delayed hover surface row with avatar and metadata.",
        "proof",
        "Containers",
        ["hover", "card"],
    ],
    [
        "Tooltip delay provider",
        "container",
        "Tooltip provider row proving delayed label rendering.",
        "proof",
        "Containers",
        ["tooltip", "delay"],
    ],
    [
        "Accordion disclosure",
        "container",
        "Multi-section disclosure row with animated height.",
        "proof",
        "Containers",
        ["accordion", "disclosure"],
    ],
    [
        "Collapsible measurement",
        "container",
        "Height transition row with controlled expanded content.",
        "consumer",
        "Containers",
        ["collapsible", "height"],
    ],
    [
        "Button glass variant",
        "primitive",
        "Glass button row with hover, active, disabled, and focus-visible states.",
        "proof",
        "Primitives",
        ["button", "glass"],
    ],
    [
        "Input error state",
        "primitive",
        "Input row with label, invalid border, and destructive helper text.",
        "proof",
        "Primitives",
        ["input", "error"],
    ],
    [
        "Textarea resize",
        "primitive",
        "Multi-line entry row with tokenized focus treatment.",
        "proof",
        "Primitives",
        ["textarea", "resize"],
    ],
    [
        "Checkbox radio switch",
        "primitive",
        "Selection control row covering binary and grouped choices.",
        "proof",
        "Primitives",
        ["check", "radio"],
    ],
    [
        "Slider tick marks",
        "primitive",
        "Continuous value row with visible numeric readout.",
        "proof",
        "Primitives",
        ["slider", "range"],
    ],
    [
        "Number field steppers",
        "primitive",
        "Numeric input row with increment and decrement controls.",
        "proof",
        "Primitives",
        ["number", "stepper"],
    ],
    [
        "Select options",
        "primitive",
        "Listbox row with trigger, content, and selected value.",
        "proof",
        "Primitives",
        ["select", "listbox"],
    ],
    [
        "Combobox filter",
        "primitive",
        "Searchable select row with typed filtering.",
        "proof",
        "Primitives",
        ["combobox", "filter"],
    ],
    [
        "Multi-select badges",
        "primitive",
        "Multi-value picker row with compact selected chips.",
        "proof",
        "Primitives",
        ["multi", "select"],
    ],
    [
        "Metric badge delta",
        "primitive",
        "Metric row with trend marker and compact numeric treatment.",
        "proof",
        "Primitives",
        ["metric", "badge"],
    ],
    [
        "Status dot pulse",
        "primitive",
        "Status indicator row with semantic color and live-state label.",
        "consumer",
        "Primitives",
        ["status", "dot"],
    ],
    [
        "Separator orientation",
        "primitive",
        "Horizontal and vertical separator row with tokenized spacing.",
        "proof",
        "Primitives",
        ["separator", "orientation"],
    ],
    [
        "Spring orchestrator",
        "motion",
        "Damped spring row with position snapshots and easing output.",
        "consumer",
        "Motion",
        ["spring", "motion"],
    ],
    [
        "Stagger reveal",
        "motion",
        "Grouped reveal row with stepped delay and visibility state.",
        "consumer",
        "Motion",
        ["stagger", "reveal"],
    ],
    [
        "Scroll-driven type",
        "motion",
        "Scroll progress row with computed text position.",
        "consumer",
        "Motion",
        ["scroll", "type"],
    ],
    [
        "Typewriter text",
        "motion",
        "Character reveal row with running, paused, and complete states.",
        "consumer",
        "Motion",
        ["typewriter", "text"],
    ],
    [
        "Aurora gradient",
        "flat",
        "Procedural painterly gradient row with pointer-driven swirl.",
        "consumer",
        "Flat",
        ["aurora", "gradient"],
    ],
] satisfies RowSeed[];

// The curated seeds are the legible head of the list; the dataset is extended to
// 200 rows (the dock-scale fuzzy π) by procedurally derived variants so a query
// exercises ranking + the prefix-narrowing cache at scale, not just the small head.
const DATASET_SIZE = 200;
const STATUSES = [
    "wired",
    "proof",
    "consumer",
    "triage",
] as const satisfies readonly SearchStatus[];

const searchItems: StorySearchItem[] = Array.from(
    { length: DATASET_SIZE },
    (_, index) => {
        const seed = rowSeeds[index % rowSeeds.length]!;
        const [label, type, text, status, owner, tags] = seed;
        const variant = Math.floor(index / rowSeeds.length); // 0 for the curated head
        return {
            id: `search-row-${String(index + 1).padStart(3, "0")}`,
            label: variant === 0 ? label : `${label} ${variant + 1}`,
            type,
            text: variant === 0 ? text : `${text} (variant ${variant + 1})`,
            status: variant === 0 ? status : STATUSES[index % STATUSES.length]!,
            owner,
            tags: [...tags],
            tone: TONES[index % TONES.length]!,
        };
    },
);

const itemById = new Map(searchItems.map((item) => [item.id, item]));
const selectedResult = ref<StorySearchItem | null>(null);

const searchState = useFuzzySearch<SearchableItem>({
    items: () => searchItems,
    debounceMs: 40,
    maxResults: 12,
    onSelect: (result) => {
        selectedResult.value = itemById.get(result.item.id) ?? null;
    },
});

// The live SearchBar drives the query. ONE field on this route (BK #19, O-17 D-19):
// the page used to call `searchState.open()` on every keystroke to raise a fuzzy-search
// OVERLAY that carried its own input — two stacked search fields, one of them a
// duplicate of the other. The overlay component is gone from the package surface, so
// the call raised nothing and only the `isOpen` flag moved; the catalogue below is the
// result surface and it needs no second field to drive it.
const query = computed({
    get: () => searchState.query.value,
    set: (value: string) => {
        searchState.query.value = value;
    },
});

// The three size specimens carry their own field state so the size axis reads as a
// permutation strip (the rungs sit side by side), independent of the live query.
const sizeSample = ref("");

const visibleResults = computed<SearchResult<StorySearchItem>[]>(() =>
    searchState.results.value
        .map((result) => {
            const item = itemById.get(result.item.id);
            return item ? { ...result, item } : null;
        })
        .filter((result): result is SearchResult<StorySearchItem> => result !== null),
);

const resultCount = computed(() => visibleResults.value.length);
const hasQuery = computed(() => query.value.trim().length > 0);

function formatScore(score: number): string {
    return score.toFixed(1);
}
</script>

<template>
    <StoryPage>
        <div class="flex flex-wrap items-end justify-between gap-4">
            <StorySection label="Search package" heading="Fuzzy search" />
            <div class="flex flex-wrap gap-2">
                <Badge variant="outline">{{ searchItems.length }} rows</Badge>
                <Badge variant="secondary">{{ resultCount }} matches</Badge>
                <Badge variant="outline">
                    {{ selectedResult?.label ?? "No selection" }}
                </Badge>
            </div>
        </div>

        <StorySection
            heading="Live search"
            blurb="Type to filter the 200-row catalogue. The rail and the overlay stay in sync as you type, and screen readers hear the running result count."
        >
            <Surface material="content" surface="veil" class="flex flex-col gap-4 p-5">
                <SearchBar
                    v-model="query"
                    size="lg"
                    surface="glass"
                    placeholder="Search components, composables, tokens…"
                    aria-label="Search the catalogue"
                />
            </Surface>

            <div
                v-if="hasQuery && visibleResults.length > 0"
                class="grid gap-4 md:grid-cols-2"
            >
                <Card
                    v-for="result in visibleResults"
                    :key="result.item.id"
                    class="border-l-4"
                    :style="{
                        borderLeftColor: `var(--section-color-${result.item.tone})`,
                    }"
                >
                    <CardHeader>
                        <div class="flex items-start justify-between gap-3">
                            <div class="min-w-0">
                                <CardTitle class="text-base">{{
                                    result.item.label
                                }}</CardTitle>
                                <CardDescription>
                                    {{ result.item.owner }} · {{ result.item.type }}
                                </CardDescription>
                            </div>
                            <Badge variant="outline" class="fira-code">
                                {{ formatScore(result.score) }}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent
                        class="flex flex-col gap-3 text-small text-muted-foreground"
                    >
                        <p>{{ result.item.text }}</p>
                        <div class="flex flex-wrap gap-2">
                            <Badge
                                v-for="tag in result.item.tags"
                                :key="`${result.item.id}-${tag}`"
                                variant="secondary"
                            >
                                {{ tag }}
                            </Badge>
                            <Badge variant="outline">{{ result.item.status }}</Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div
                v-else
                class="ghost-slot p-8 text-center text-small text-muted-foreground"
            >
                {{
                    hasQuery
                        ? "No matches for the current query — try a shorter subsequence."
                        : "Start typing above to rank the catalogue by fuzzy score."
                }}
            </div>
        </StorySection>

        <StorySection
            heading="Sizes"
            blurb="One warm-cream glass pill recipe across the golden control-height rungs — sm for a quiet inline filter, md the default, lg the hero field."
        >
            <div class="flex flex-col gap-3">
                <SearchBar
                    v-model="sizeSample"
                    size="sm"
                    surface="glass"
                    placeholder="size=sm — inline filter"
                    aria-label="Search bar, small"
                />
                <SearchBar
                    v-model="sizeSample"
                    size="md"
                    surface="glass"
                    placeholder="size=md — the default rail"
                    aria-label="Search bar, medium"
                />
                <SearchBar
                    v-model="sizeSample"
                    size="lg"
                    surface="glass"
                    placeholder="size=lg — the hero field"
                    aria-label="Search bar, large"
                />
            </div>
        </StorySection>
    </StoryPage>
</template>
