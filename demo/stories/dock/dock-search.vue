<script setup lang="ts">
// the DOCK as the native dynamic-search-bar (the consumer #1
// exerciser). Tap the collapsed dock pill → it MORPHS (continuously, via the dock's OWN
// `--dock-morph-t` glide + the byte-untouched morph-bridge metaball) into a search field;
// type → the fuzzy dropdown ranks live with subsequence-match highlighting + an
// autocomplete ghost-text completion of the top match; ArrowDown/Up walks the results,
// Enter routes, a result-select seats-and-scrolls to the windowed target below; tap away
// → the dock returns to a compact PERSISTENT bar (NO extra-tap-to-restore).
//
// THE CONSUMING-SEAM DISCIPLINE. The page composes `useDockSearch` (the gesture/shrink/
// dropdown seam) + the SHIPPED /search `useFuzzySearch` matcher (NO re-fork) + the
// `useVirtualSectionWindow` results window + the `useScrollTo` ToC subuse — and slots its
// field + dropdown into `<GlassDock search>`'s `#search` aperture. The morph engine
// (dockMorphContext/DOCK_SPRING) is byte-untouched; the dock-search is a seam BESIDE it.
import { computed, ref, useTemplateRef } from "vue";
import { Search } from "@lucide/vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { GlassDock, useDockSearch } from "@glass/components/dock";
import { useDockState } from "@glass/components/dock/composables/useDockState";
import { useVirtualSectionWindow, type FlatSection } from "../../composables/virtual";
import { useScrollTo } from "@glass/composables/sidebar";
import type { SearchableItem } from "@glass/components/search/composables";
import DockStage from "./_frame/DockStage.vue";

// ── A sizeable searchable item set — section titles + their body text (the fuzzy
// index searches label×12/type×10/text×3). Each item is ALSO a content section the
// result-select scrolls to (the ToC subsume) — so `items` doubles as the windowed list.
const SECTION_TITLES = [
    "Foundations",
    "Color tokens",
    "Typography ladder",
    "Glass tiers",
    "Spacing scale",
    "Motion canon",
    "Spring presets",
    "Easing doctrine",
    "Dock orientation",
    "Dock morph engine",
    "Dock search bar",
    "Configurator chassis",
    "Aurora background",
    "Blob metaball",
    "Constellation field",
    "Fourier epicycles",
    "Flow field",
    "Concentric rings",
    "Border progress",
    "Completion seal",
    "Feedback tone",
    "Menu glass",
    "Surface axis",
    "Adaptive legibility",
    "Dark material",
    "Warm chroma floor",
    "Card padding ladder",
    "Scroll choreography",
    "Fading scroll",
    "Drawer modes",
    "Sortable list",
    "Virtual windowing",
];

interface DocSection extends SearchableItem, FlatSection {}

const items = computed<DocSection[]>(() =>
    SECTION_TITLES.map((title, index) => ({
        // SearchableItem
        id: `sec-${index}`,
        label: title,
        text: `${title} — the ${title.toLowerCase()} register and its tokens, recipes, and consumer surface.`,
        type: index < 8 ? "foundation" : index < 20 ? "viz" : "system",
        // FlatSection (the windowing hierarchy — a flat single-level list)
        index,
        depth: 0,
        rootId: `sec-${index}`,
        parentId: null,
        rootIndex: index,
        estimatedHeight: 88,
    })),
);

// ── The content scroller + the virtual window (the results list rides it) ──────────
const scrollEl = useTemplateRef<HTMLElement>("scrollEl");
const visibleCountRef = ref(items.value.length);

const {
    visibleItems,
    topSpacerPx,
    bottomSpacerPx,
    measureSection,
    ensureTargetWindow,
} = useVirtualSectionWindow<DocSection>({
    items,
    scrollContainer: scrollEl,
});

// The rAF-retry scroll-to-id (the ToC subsume). totalCount/visibleCount are generic
// params (no consumer-type coupling).
const { scrollTo } = useScrollTo({
    scrollContainer: scrollEl,
    totalCount: items.value.length,
    visibleCount: visibleCountRef,
});

// ── The dock state machine + the dock-search seam ──────────────────────────────────
const dockEl = useTemplateRef<HTMLElement>("dockEl");
const dockState = useDockState({ rootEl: dockEl });

const lastRouted = ref<string | null>(null);

const search = useDockSearch<DocSection>({
    dockState,
    items: () => items.value,
    // The result-select → ToC subsume: seat the window THEN scroll-to-and-land.
    ensureTargetWindow,
    scrollTo,
    onResultSelect: (result) => {
        lastRouted.value = result.item.label;
    },
    // The optional collapse-on-scroll (persistent-default — opt-in here to demo the
    // transform-only shrink; the morph itself NEVER fires on a passive scroll).
    collapseOnScroll: true,
    scrollContainer: scrollEl,
    chromeRef: dockEl,
});

const { fuzzy, autocompleteText, armSearch, disarmSearch, acceptAutocomplete } = search;

// Highlight the subsequence-match characters in a result label.
function highlightParts(label: string, matchIndices: number[]) {
    const set = new Set(matchIndices);
    return label.split("").map((ch, i) => ({ ch, on: set.has(i) }));
}

// The input ref so we focus the field as the morph reveals it.
const fieldRef = useTemplateRef<HTMLInputElement>("fieldRef");

function onArm() {
    armSearch();
    // Focus the revealed field on the next frame (after the morph aperture opens).
    requestAnimationFrame(() => fieldRef.value?.focus());
}

function onKeydown(e: KeyboardEvent) {
    // Tab/Space/ArrowRight at the end of the query fills the ghost-text.
    if ((e.key === "Tab" || e.key === "ArrowRight") && autocompleteText.value) {
        e.preventDefault();
        acceptAutocomplete();
        return;
    }
    // Arrow/Enter/Escape → the composed useFuzzySearch keyboard nav.
    fuzzy.onKeydown(e);
}
</script>

<template>
    <StoryPage>
        <DockStage #default="{ backgroundCanvas }">
            <StorySection heading="The dock IS a search bar" gap="lg">
                <p class="text-small text-muted-foreground max-w-prose">
                    Tap the collapsed dock pill — it MORPHS continuously (not a hard
                    swap) into a search field. Type —
                    the fuzzy dropdown ranks live with subsequence-match highlighting +
                    an autocomplete ghost-text completion of the top match (Tab / →
                    fills it); ArrowDown/Up walks the results, Enter routes, a select
                    seats and scrolls to the windowed section below. Scroll the content
                    and the dock shrinks (the optional
                    <code class="rounded bg-muted px-1">collapseOnScroll</code>
                    transform-only quiet, persistent-default); the morph NEVER fires on
                    a passive scroll (the iOS-27 lesson — that costs a tap). The active
                    field reads ≥4.5:1 over the live field — never a pale ghost.
                </p>

                <div class="dock-stage-tile dock-search-demo">
                    <!-- The dock-search bar over the live field. PERSISTENT by default;
                         `search` opts into the field aperture. -->
                    <GlassDock
                        ref="dockEl"
                        search
                        always-expanded
                        :background-canvas="backgroundCanvas"
                        class="dock-search-host"
                    >
                        <!-- The collapsed pill — a search affordance (tap morphs it into
                             the field). -->
                        <template #collapsed>
                            <button
                                type="button"
                                class="dock-search-trigger"
                                aria-label="Open search"
                                @click="onArm"
                            >
                                <Search class="size-4" />
                            </button>
                        </template>

                        <!-- The search field aperture rides the morph; adaptive tinting
                             keeps its text contrast at or above 4.5:1. -->
                        <template #search>
                            <div class="input-bar" data-surface="glass">
                                <Search class="size-4 text-muted-foreground shrink-0" />
                                <div class="dock-search-input-wrap">
                                    <input
                                        ref="fieldRef"
                                        v-model="fuzzy.query.value"
                                        class="input-bar-field"
                                        placeholder="Search sections…"
                                        aria-label="Search sections"
                                        @keydown="onKeydown"
                                        @blur="disarmSearch"
                                    />
                                    <!-- The autocomplete ghost-text — the unmatched suffix
                                         of the top match, rendered behind the input. -->
                                    <span class="dock-search-ghost" aria-hidden="true"
                                        ><span class="dock-search-ghost-query">{{
                                            fuzzy.query.value
                                        }}</span
                                        >{{ autocompleteText }}</span
                                    >
                                </div>
                            </div>

                            <!-- The fuzzy dropdown — the result rows ride.glass-menu-row;
                                 only the windowed slice paints (the spacers hold height). -->
                            <ul
                                v-if="fuzzy.results.value.length"
                                class="dock-search-results"
                                role="listbox"
                            >
                                <li
                                    v-for="(r, i) in fuzzy.results.value"
                                    :key="r.item.id"
                                    class="dock-search-result glass-menu-row"
                                    role="option"
                                    :aria-selected="i === fuzzy.selectedIndex.value"
                                    :data-highlighted="
                                        i === fuzzy.selectedIndex.value || undefined
                                    "
                                    @click="fuzzy.selectResult(r)"
                                >
                                    <span class="dock-search-result-label">
                                        <span
                                            v-for="(p, ci) in highlightParts(
                                                r.item.label,
                                                r.matchIndices,
                                            )"
                                            :key="ci"
                                            :class="{ 'dock-search-match': p.on }"
                                            >{{ p.ch }}</span
                                        >
                                    </span>
                                    <span class="dock-search-result-meta">{{
                                        r.item.type
                                    }}</span>
                                </li>
                            </ul>
                        </template>
                    </GlassDock>

                    <!-- The content list the result-select scrolls to (rides the virtual
                         window — only the windowed slice paints; the spacers hold scroll
                         height). -->
                    <div ref="scrollEl" class="dock-search-content">
                        <div :style="{ height: `${topSpacerPx}px` }" />
                        <section
                            v-for="item in visibleItems"
                            :id="item.id"
                            :key="item.id"
                            :ref="
                                (el) =>
                                    measureSection(item.id, el as HTMLElement | null)
                            "
                            class="dock-search-section"
                            :class="{
                                'dock-search-section--routed':
                                    lastRouted === item.label,
                            }"
                        >
                            <h3 class="text-subheading">{{ item.label }}</h3>
                            <p class="text-small text-muted-foreground">{{ item.text }}</p>
                        </section>
                        <div :style="{ height: `${bottomSpacerPx}px` }" />
                    </div>
                </div>

                <p class="text-small text-muted-foreground">
                    The dock owns the gesture, the shrink, and the dropdown; the
                    consumer plugs in its data source. One matcher, one windowed list,
                    one scroll reader — no second of any.
                </p>
            </StorySection>
        </DockStage>
    </StoryPage>
</template>

<style scoped>
.dock-search-demo {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    padding: 2.5rem;
    border-radius: var(--radius-card);
}

.dock-search-host {
    inline-size: min(28rem, 100%);
}

.dock-search-trigger {
    display: grid;
    place-items: center;
    inline-size: var(--dock-control-size);
    block-size: var(--dock-control-size);
    color: var(--foreground);
    background: transparent;
    border: 0;
    cursor: text;
}

/* The ghost-text overlays the input at the same metrics; the query portion is
   transparent so only the completion suffix reads behind the live text. */
.dock-search-input-wrap {
    position: relative;
    flex: 1;
    min-inline-size: 0;
    display: grid;
}

.dock-search-input-wrap > .input-bar-field,
.dock-search-ghost {
    grid-area: 1 / 1;
    font: inherit;
    line-height: inherit;
    white-space: pre;
}

.dock-search-ghost {
    pointer-events: none;
    overflow: hidden;
    /* the suffix reads the on-glass muted rung (the surface CSS sets the color); the
       query portion is hidden so it aligns under the live input text. */
}

.dock-search-ghost-query {
    color: transparent;
}

.dock-search-results {
    list-style: none;
    margin: 0;
    padding: 0.25rem;
    max-block-size: 16rem;
    overflow-y: auto;
}

.dock-search-result {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
    border-radius: var(--radius-md);
    cursor: pointer;
}

.dock-search-match {
    color: var(--primary);
    font-weight: 600;
}

.dock-search-content {
    inline-size: min(36rem, 100%);
    max-block-size: 18rem;
    overflow-y: auto;
    border-radius: var(--radius-card);
    border: 1px solid var(--border);
    background: color-mix(in oklab, var(--glass-bg-quiet), transparent 30%);
    backdrop-filter: blur(var(--glass-blur-quiet-radius, 8px));
    padding: 0.5rem;
}

.dock-search-section {
    padding: 0.75rem 1rem;
    border-radius: var(--radius-md);
    scroll-margin-top: 0.5rem;
}

.dock-search-section--routed {
    background: color-mix(in oklab, var(--primary), transparent 88%);
}
</style>
