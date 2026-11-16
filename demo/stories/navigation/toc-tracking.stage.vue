<script setup lang="ts">
// ToC Tracking's stage: a contents list beside a long scrolling column. The list
// marks the deepest heading in view, keeps it in sight, and scrolls the column to
// any entry pressed. The column's text is Skeleton blocks and renders in batches.
import { computed, ref } from "vue";
import { Skeleton } from "@glass/components/skeleton";
import {
    useScrollTracker,
    useSidebarFollow,
    useScrollTo,
    useClickDelegate,
    useLazyLoader,
    useTreeIndex,
    type SidebarSection,
} from "@glass/composables/sidebar";

const CHAPTERS = [
    "Overview",
    "Setup",
    "Layout",
    "Colour",
    "Type",
    "Motion",
    "Glass",
    "Docks",
    "Forms",
    "Data",
    "Access",
    "Release",
];
const PARTS = ["Basics", "Details", "Notes"];

const SECTIONS: SidebarSection[] = CHAPTERS.map((title, i) => ({
    id: `toc-${i}`,
    title,
    children: PARTS.map((part, j) => ({ id: `toc-${i}-${j}`, title: part })),
}));

// Line widths for the skeleton text, varied so the column reads as prose.
const LINES = [
    [100, 94, 62],
    [100, 88],
    [100, 97, 76],
];

const { index: treeIndex } = useTreeIndex(SECTIONS);
const scrollContainer = ref<HTMLElement | null>(null);
const navContainer = ref<HTMLElement | null>(null);

const { visibleCount, loadSentinel } = useLazyLoader(SECTIONS.length, {
    batchSize: 3,
    scrollContainer,
});
const visibleSections = computed(() => SECTIONS.slice(0, visibleCount.value));

const { scrollTo } = useScrollTo({
    scrollContainer,
    totalCount: SECTIONS.length,
    visibleCount,
    treeIndex,
});

const { activeId, activeRootId } = useScrollTracker(
    () => visibleSections.value,
    () => treeIndex,
    { scrollContainer },
);

useSidebarFollow({
    sidebarEl: navContainer,
    activeId,
    activeRootId,
    scrollSource: scrollContainer,
});

useClickDelegate({
    container: navContainer,
    resolve: (value) => value,
    scrollTo,
});
</script>

<template>
    <div class="toc-stage">
        <nav ref="navContainer" class="toc-stage-nav glass-resting" aria-label="Contents">
            <template v-for="root in SECTIONS" :key="root.id">
                <button
                    type="button"
                    class="toc-stage-entry transition-control"
                    :data-scroll-target="root.id"
                    :data-active="activeRootId === root.id || activeId === root.id || undefined"
                >
                    {{ root.title }}
                </button>
                <button
                    v-for="child in root.children"
                    :key="child.id"
                    type="button"
                    class="toc-stage-entry toc-stage-entry-child transition-control"
                    :data-scroll-target="child.id"
                    :data-active="activeId === child.id || undefined"
                >
                    {{ child.title }}
                </button>
            </template>
        </nav>

        <div ref="scrollContainer" class="toc-stage-doc glass-resting">
            <section v-for="root in visibleSections" :id="root.id" :key="root.id" class="toc-stage-chapter">
                <h3 class="toc-stage-heading">{{ root.title }}</h3>
                <Skeleton class="toc-stage-figure" />
                <section
                    v-for="(child, j) in root.children"
                    :id="child.id"
                    :key="child.id"
                    class="toc-stage-part"
                >
                    <h4 class="toc-stage-subheading">{{ child.title }}</h4>
                    <Skeleton
                        v-for="(w, k) in LINES[j]"
                        :key="k"
                        class="toc-stage-line"
                        :style="{ inlineSize: `${w}%` }"
                    />
                </section>
            </section>
            <div ref="loadSentinel" class="toc-stage-sentinel" />
        </div>
    </div>
</template>

<style scoped>
.toc-stage {
    display: grid;
    grid-template-columns: minmax(0, min(14rem, 30%)) minmax(0, 1fr);
    gap: var(--sp-4);
    block-size: 100%;
    padding: var(--sp-4);
}

.toc-stage-nav,
.toc-stage-doc {
    min-block-size: 0;
    overflow-y: auto;
    border-radius: var(--radius-panel);
    scrollbar-width: thin;
}

.toc-stage-nav {
    display: flex;
    flex-direction: column;
    gap: var(--sp-1);
    padding: var(--sp-2);
}

.toc-stage-entry {
    inline-size: 100%;
    padding: var(--sp-2) var(--sp-3);
    border-radius: var(--radius-control);
    text-align: start;
    font-size: var(--text-small, 0.875rem);
    color: var(--foreground);
}

.toc-stage-entry-child {
    padding-block: var(--sp-1);
    padding-inline-start: var(--sp-5);
    font-size: var(--text-micro, 0.75rem);
}

.toc-stage-entry:hover {
    background-color: color-mix(in srgb, var(--foreground) 6%, transparent);
}

.toc-stage-entry[data-active] {
    background-color: color-mix(in srgb, var(--primary) 12%, transparent);
    color: var(--primary);
}

/* A narrow stage lists the chapters only; the tracking still marks the chapter. */
@container (inline-size < 34rem) {
    .toc-stage {
        grid-template-columns: minmax(0, 38%) minmax(0, 1fr);
        gap: var(--sp-3);
        padding: var(--sp-3);
    }
    .toc-stage-entry-child {
        display: none;
    }
}

.toc-stage-doc {
    padding: var(--sp-5);
}

.toc-stage-chapter {
    display: flex;
    flex-direction: column;
    gap: var(--sp-3);
    margin-block-end: var(--sp-6);
}

.toc-stage-heading {
    font-size: var(--text-subheading, 1.125rem);
    font-weight: 600;
    color: var(--foreground);
}

.toc-stage-figure {
    block-size: 7rem;
    border-radius: var(--radius-card);
}

.toc-stage-part {
    display: flex;
    flex-direction: column;
    gap: var(--sp-2);
    padding-inline-start: var(--sp-3);
}

.toc-stage-subheading {
    font-size: var(--text-small, 0.875rem);
    font-weight: 500;
    color: var(--foreground);
}

.toc-stage-line {
    block-size: 0.625rem;
    border-radius: 999px;
}

.toc-stage-sentinel {
    block-size: 1px;
}
</style>
