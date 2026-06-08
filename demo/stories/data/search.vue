<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { computed, ref } from "vue";
import {
    CheckCircle2,
    Database,
    ListPlus,
    Search,
    Sparkles,
    Trash2,
} from "@lucide/vue";
import {
    FuzzySearch,
    SearchBar,
    buildIndex,
    clearSearchCache as clearCache,
    fuzzyMatch,
    searchIndex,
    useFuzzySearch,
} from "../../../src/components/custom/search";
import type {
    SearchIndex,
    SearchResult,
    SearchableItem,
} from "../../../src/components/custom/search";
import { Badge } from "../../../src/components/ui/badge";
import { Button } from "../../../src/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../src/components/ui/card";
import { Input } from "../../../src/components/ui/input";

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
    ["FuzzySearch overlay", "component", "Keyboard navigation, modal expansion, and highlighted fuzzy result labels.", "wired", "Search", ["FuzzySearch", "keyboard"]],
    ["SearchBar query rail", "component", "Compact input bar with a baked-in icon for filtering catalogue rows.", "proof", "Search", ["SearchBar", "input"]],
    ["useFuzzySearch state", "composable", "Reactive query, debounce, selected index, open state, and result selection.", "wired", "Search", ["useFuzzySearch", "state"]],
    ["buildIndex helper", "helper", "Builds lowercased index entries from the 50-row sample dataset.", "wired", "Search", ["buildIndex", "index"]],
    ["searchIndex helper", "helper", "Scores multi-token fuzzy queries and returns ordered search results.", "proof", "Search", ["searchIndex", "score"]],
    ["fuzzyMatch scorer", "helper", "Subsequence matching with bonuses for prefixes, separators, and consecutive runs.", "proof", "Search", ["fuzzyMatch", "score"]],
    ["clearCache control", "helper", "Flushes cached search results after dataset or route state changes.", "wired", "Search", ["clearCache", "cache"]],
    ["Glass panel substrate", "component", "Glass renderer consumer row with tiered surface tokens and filter state.", "consumer", "Foundations", ["glass", "panel"]],
    ["Dock dropdown trigger", "component", "Navigation package trigger row for dock-scoped menus.", "wired", "Navigation", ["dock", "dropdown"]],
    ["Dock select trigger", "component", "Navigation package trigger row for dock-scoped selection controls.", "wired", "Navigation", ["dock", "select"]],
    ["Carousel item slot", "component", "Container package item row with active index and slide slots.", "triage", "Containers", ["carousel", "slot"]],
    ["Toggle chip states", "primitive", "Chip and cell variants with pressed-state proof.", "wired", "Primitives", ["toggle", "chip"]],
    ["Sortable handle drag", "data", "Drag-only handle row with reorder events and context wiring.", "consumer", "Data", ["sortable", "handle"]],
    ["Timeline scrubber", "data", "Release event row driven by normalized position and active event labels.", "consumer", "Data", ["timeline", "scrubber"]],
    ["Infinite feed sentinel", "data", "Intersection observer row for batched feed loading.", "consumer", "Data", ["infinite", "feed"]],
    ["Data table filter", "data", "Column sorting and pagination row with a local filter input.", "proof", "Data", ["table", "filter"]],
    ["Tags input catalogue", "data", "Tokenized data entry row with removable tag chips.", "proof", "Data", ["tags", "input"]],
    ["Avatar fallback stack", "data", "Initials, image loading, and grouped avatar row.", "proof", "Data", ["avatar", "fallback"]],
    ["Command palette route", "navigation", "Keyboard-first command row with grouped actions.", "consumer", "Navigation", ["command", "palette"]],
    ["Dock rail navigation", "navigation", "Vertical GlassDock rail row with tooltip-backed icon buttons.", "consumer", "Navigation", ["rail", "icons"]],
    ["Sidebar progressive panels", "navigation", "Nested navigation row with progressive disclosure and route state.", "consumer", "Navigation", ["sidebar", "panels"]],
    ["Segmented tabs motion", "navigation", "Animated tab indicator row with active tab geometry.", "proof", "Navigation", ["tabs", "motion"]],
    ["Dialog focus trap", "container", "Modal surface row with overlay, title, and close action.", "proof", "Containers", ["dialog", "focus"]],
    ["Sheet side panel", "container", "Edge drawer row with controlled open state and action footer.", "proof", "Containers", ["sheet", "panel"]],
    ["Drawer bottom panel", "container", "Mobile-style drawer row with handle, footer, and snap motion.", "proof", "Containers", ["drawer", "mobile"]],
    ["Popover anchored surface", "container", "Floating anchored content row with trigger and portal behavior.", "proof", "Containers", ["popover", "anchor"]],
    ["Dropdown menu actions", "container", "Menu item row with shortcut labels and destructive action styling.", "proof", "Containers", ["dropdown", "menu"]],
    ["Context menu target", "container", "Secondary-click menu row with checkbox and separator items.", "proof", "Containers", ["context", "menu"]],
    ["Hover card profile", "container", "Delayed hover surface row with avatar and metadata.", "proof", "Containers", ["hover", "card"]],
    ["Tooltip delay provider", "container", "Tooltip provider row proving delayed label rendering.", "proof", "Containers", ["tooltip", "delay"]],
    ["Accordion disclosure", "container", "Multi-section disclosure row with animated height.", "proof", "Containers", ["accordion", "disclosure"]],
    ["Collapsible measurement", "container", "Height transition row with controlled expanded content.", "consumer", "Containers", ["collapsible", "height"]],
    ["Button glass variant", "primitive", "Glass button row with hover, active, disabled, and focus-visible states.", "proof", "Primitives", ["button", "glass"]],
    ["Input error state", "primitive", "Input row with label, invalid border, and destructive helper text.", "proof", "Primitives", ["input", "error"]],
    ["Textarea resize", "primitive", "Multi-line entry row with tokenized focus treatment.", "proof", "Primitives", ["textarea", "resize"]],
    ["Checkbox radio switch", "primitive", "Selection control row covering binary and grouped choices.", "proof", "Primitives", ["check", "radio"]],
    ["Slider tick marks", "primitive", "Continuous value row with visible numeric readout.", "proof", "Primitives", ["slider", "range"]],
    ["Number field steppers", "primitive", "Numeric input row with increment and decrement controls.", "proof", "Primitives", ["number", "stepper"]],
    ["Select options", "primitive", "Listbox row with trigger, content, and selected value.", "proof", "Primitives", ["select", "listbox"]],
    ["Combobox filter", "primitive", "Searchable select row with typed filtering.", "proof", "Primitives", ["combobox", "filter"]],
    ["Multi-select badges", "primitive", "Multi-value picker row with compact selected chips.", "proof", "Primitives", ["multi", "select"]],
    ["Metric badge delta", "primitive", "Metric row with trend marker and compact numeric treatment.", "proof", "Primitives", ["metric", "badge"]],
    ["Status dot pulse", "primitive", "Status indicator row with semantic color and live-state label.", "consumer", "Primitives", ["status", "dot"]],
    ["Separator orientation", "primitive", "Horizontal and vertical separator row with tokenized spacing.", "proof", "Primitives", ["separator", "orientation"]],
    ["Spring orchestrator", "motion", "Damped spring row with position snapshots and easing output.", "consumer", "Motion", ["spring", "motion"]],
    ["Stagger reveal", "motion", "Grouped reveal row with stepped delay and visibility state.", "consumer", "Motion", ["stagger", "reveal"]],
    ["Scroll-driven type", "motion", "Scroll progress row with computed text position.", "consumer", "Motion", ["scroll", "type"]],
    ["Typewriter text", "motion", "Character reveal row with running, paused, and complete states.", "consumer", "Motion", ["typewriter", "text"]],
    ["Aurora gradient", "flat", "Procedural painterly gradient row with pointer-driven swirl.", "consumer", "Flat", ["aurora", "gradient"]],
] satisfies RowSeed[];

const searchItems: StorySearchItem[] = rowSeeds.map(
    ([label, type, text, status, owner, tags], index) => ({
        id: `search-row-${String(index + 1).padStart(2, "0")}`,
        label,
        type,
        text,
        status,
        owner,
        tags: [...tags],
        tone: TONES[index % TONES.length]!,
    }),
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

const queryControl = computed({
    get: () => searchState.query.value,
    set: (value: string) => {
        searchState.query.value = value;
        if (value.trim()) searchState.open();
    },
});

const visibleResults = computed<SearchResult<StorySearchItem>[]>(() =>
    searchState.results.value
        .map((result) => {
            const item = itemById.get(result.item.id);
            return item ? { ...result, item } : null;
        })
        .filter((result): result is SearchResult<StorySearchItem> => result !== null),
);

const helperQuery = ref("search index");
const matchPattern = ref("fsp");
const matchText = ref("Fuzzy search package");
const manualIndex = ref<SearchIndex<StorySearchItem> | null>(null);
const manualResults = ref<SearchResult<StorySearchItem>[]>([]);
const matchResult = ref<{ score: number; matches: number[] } | null>(null);
const buildCalls = ref(0);
const searchCalls = ref(0);
const matchCalls = ref(0);
const clearCalls = ref(0);
const lastHelper = ref("Awaiting helper control");

const resultCount = computed(() => visibleResults.value.length);
const helperIndexSize = computed(() => manualIndex.value?.length ?? 0);

function runBuildIndex() {
    manualIndex.value = buildIndex(searchItems);
    buildCalls.value += 1;
    lastHelper.value = `buildIndex indexed ${manualIndex.value.length} rows`;
}

function runSearchIndex() {
    if (!manualIndex.value) {
        manualIndex.value = buildIndex(searchItems);
        buildCalls.value += 1;
    }

    manualResults.value = searchIndex(
        manualIndex.value,
        helperQuery.value,
        6,
    );
    searchCalls.value += 1;
    lastHelper.value = `searchIndex returned ${manualResults.value.length} rows`;
}

function runFuzzyMatch() {
    matchResult.value = fuzzyMatch(
        matchPattern.value.toLowerCase(),
        matchText.value.toLowerCase(),
    );
    matchCalls.value += 1;
    lastHelper.value = matchResult.value
        ? `fuzzyMatch score ${formatScore(matchResult.value.score)}`
        : "fuzzyMatch returned no match";
}

function runClearCache() {
    clearCache();
    manualResults.value = [];
    clearCalls.value += 1;
    lastHelper.value = "clearCache flushed cached helper results";
}

function typeLabel(item: SearchableItem): string {
    return item.type ?? "row";
}

function formatScore(score: number): string {
    return score.toFixed(1);
}

function formatMatches(indices: number[]): string {
    return indices.length > 0 ? indices.join(", ") : "none";
}
</script>

<template>
    <StoryPage>
        <section class="flex flex-col gap-5">
            <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <p class="text-admin-label text-muted-foreground">Search package</p>
                    <h2 class="text-heading">Fuzzy index</h2>
                </div>
                <div class="flex flex-wrap gap-2">
                    <Badge variant="outline" data-testid="dataset-size">
                        {{ searchItems.length }} rows
                    </Badge>
                    <Badge variant="secondary" data-testid="result-count">
                        {{ resultCount }} results
                    </Badge>
                    <Badge variant="outline">
                        {{ selectedResult?.label ?? "No selection" }}
                    </Badge>
                </div>
            </div>

            <div class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
                <div class="flex flex-col gap-4 rounded-card border border-border bg-card p-4 shadow-cartoon">
                    <SearchBar
                        v-model="queryControl"
                        placeholder="Search the 50-row dataset..."
                        data-testid="search-query"
                    />

                    <FuzzySearch
                        :state="searchState"
                        variant="floating"
                        placeholder="FuzzySearch component query..."
                        :type-label="typeLabel"
                    />
                </div>

                <div class="grid gap-3 rounded-card border border-border bg-background p-4">
                    <div class="flex items-center gap-2">
                        <Search class="h-4 w-4 text-muted-foreground" />
                        <span class="text-admin-label">useFuzzySearch readout</span>
                    </div>
                    <dl class="grid grid-cols-2 gap-3 text-small">
                        <div>
                            <dt class="text-muted-foreground">Query</dt>
                            <dd class="fira-code" data-testid="query-readout">
                                {{ queryControl || "empty" }}
                            </dd>
                        </div>
                        <div>
                            <dt class="text-muted-foreground">Open</dt>
                            <dd class="fira-code">{{ searchState.isOpen.value ? "yes" : "no" }}</dd>
                        </div>
                        <div>
                            <dt class="text-muted-foreground">Selected index</dt>
                            <dd class="fira-code">{{ searchState.selectedIndex.value }}</dd>
                        </div>
                        <div>
                            <dt class="text-muted-foreground">Expanded</dt>
                            <dd class="fira-code">{{ searchState.isExpanded.value ? "yes" : "no" }}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>

        <section class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_24rem]">
            <div class="flex flex-col gap-4 rounded-card border border-border bg-card p-4 shadow-cartoon">
                <div class="grid gap-3 sm:grid-cols-3">
                    <Input
                        v-model="helperQuery"
                        aria-label="Helper query"
                        placeholder="Helper query"
                    />
                    <Input
                        v-model="matchPattern"
                        aria-label="fuzzyMatch pattern"
                        placeholder="Pattern"
                    />
                    <Input
                        v-model="matchText"
                        aria-label="fuzzyMatch text"
                        placeholder="Text"
                    />
                </div>

                <div class="flex flex-wrap gap-2" data-testid="helper-controls">
                    <Button type="button" variant="outline" size="sm" data-testid="build-index-button" @click="runBuildIndex">
                        <ListPlus class="mr-2 h-4 w-4" />
                        buildIndex
                    </Button>
                    <Button type="button" variant="outline" size="sm" data-testid="search-index-button" @click="runSearchIndex">
                        <Database class="mr-2 h-4 w-4" />
                        searchIndex
                    </Button>
                    <Button type="button" variant="outline" size="sm" data-testid="fuzzy-match-button" @click="runFuzzyMatch">
                        <Sparkles class="mr-2 h-4 w-4" />
                        fuzzyMatch
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        data-testid="clear-cache-button"
                        aria-label="Clear search cache"
                        @click="runClearCache"
                    >
                        <Trash2 class="mr-2 h-4 w-4" />
                        Clear cache
                    </Button>
                </div>

                <div class="grid gap-3 text-small sm:grid-cols-2">
                    <div class="rounded-md border border-border bg-background p-3">
                        <span class="text-muted-foreground">Index size</span>
                        <strong class="block fira-code" data-testid="index-size">
                            {{ helperIndexSize }}
                        </strong>
                    </div>
                    <div class="rounded-md border border-border bg-background p-3">
                        <span class="text-muted-foreground">Manual results</span>
                        <strong class="block fira-code" data-testid="manual-result-count">
                            {{ manualResults.length }}
                        </strong>
                    </div>
                    <div class="rounded-md border border-border bg-background p-3">
                        <span class="text-muted-foreground">Match positions</span>
                        <strong class="block fira-code" data-testid="match-positions">
                            {{ matchResult ? formatMatches(matchResult.matches) : "none" }}
                        </strong>
                    </div>
                    <div class="rounded-md border border-border bg-background p-3">
                        <span class="text-muted-foreground">Last helper</span>
                        <strong class="block fira-code" data-testid="last-helper">
                            {{ lastHelper }}
                        </strong>
                    </div>
                </div>
            </div>

            <div class="rounded-card border border-border bg-background p-4">
                <div class="flex items-center gap-2">
                    <CheckCircle2 class="h-4 w-4 text-muted-foreground" />
                    <span class="text-admin-label">Helper call ledger</span>
                </div>
                <dl class="mt-4 grid grid-cols-2 gap-3 text-small">
                    <div>
                        <dt class="text-muted-foreground">buildIndex</dt>
                        <dd class="fira-code" data-testid="build-index-calls">{{ buildCalls }}</dd>
                    </div>
                    <div>
                        <dt class="text-muted-foreground">searchIndex</dt>
                        <dd class="fira-code" data-testid="search-index-calls">{{ searchCalls }}</dd>
                    </div>
                    <div>
                        <dt class="text-muted-foreground">fuzzyMatch</dt>
                        <dd class="fira-code" data-testid="fuzzy-match-calls">{{ matchCalls }}</dd>
                    </div>
                    <div>
                        <dt class="text-muted-foreground">clearCache</dt>
                        <dd class="fira-code" data-testid="clear-cache-calls">{{ clearCalls }}</dd>
                    </div>
                </dl>

                <ol class="mt-4 flex flex-col gap-2" data-testid="manual-results">
                    <li
                        v-for="result in manualResults"
                        :key="`manual-${result.item.id}`"
                        class="rounded-md border border-border bg-card px-3 py-2 text-small"
                    >
                        <span class="font-medium">{{ result.item.label }}</span>
                        <span class="ml-2 fira-code text-mono-caption text-muted-foreground">
                            {{ formatScore(result.score) }}
                        </span>
                    </li>
                </ol>
            </div>
        </section>

        <section class="flex flex-col gap-4">
            <div class="flex items-center justify-between gap-4">
                <h2 class="text-subheading">Results</h2>
                <span class="fira-code text-mono-caption text-muted-foreground" data-testid="visible-result-count">
                    {{ resultCount }}
                </span>
            </div>

            <div
                v-if="visibleResults.length > 0"
                class="grid gap-4 md:grid-cols-2"
                data-testid="result-list"
            >
                <Card
                    v-for="result in visibleResults"
                    :key="result.item.id"
                    data-testid="result-card"
                    class="border-l-4"
                    :style="{ borderLeftColor: `var(--section-color-${result.item.tone})` }"
                >
                    <CardHeader class="pb-3">
                        <div class="flex items-start justify-between gap-3">
                            <div>
                                <CardTitle class="text-base">{{ result.item.label }}</CardTitle>
                                <CardDescription>
                                    {{ result.item.owner }} · {{ result.item.type }}
                                </CardDescription>
                            </div>
                            <Badge variant="outline" class="fira-code">
                                {{ formatScore(result.score) }}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent class="flex flex-col gap-3 text-small text-muted-foreground">
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
                        <span class="fira-code text-mono-caption">
                            matches: {{ formatMatches(result.matchIndices) }}
                        </span>
                    </CardContent>
                </Card>
            </div>

            <div
                v-else
                class="rounded-card border border-dashed border-border bg-card p-6 text-small text-muted-foreground"
                data-testid="empty-results"
            >
                No fuzzy results for the current query.
            </div>
        </section>
    </StoryPage>
</template>
