<script setup lang="ts">
// BC.W-TOC-RECONCILE — the /navigation/toc-tracking story exercising the ONE
// reconciled ToC-tracking family from @mkbabb/glass-ui/sidebar:
//   - useScrollTracker (reactive-roots, deepest-visible-wins) drives the active
//     highlight as the long document scrolls,
//   - useSidebarFollow keeps the active ToC item in the nav viewport (damped),
//   - useScrollTo warms the target into the window THEN smooth-scrolls on a ToC
//     click (the partial-load + rAF-retry settle),
//   - useClickDelegate handles every ToC link with ONE delegated listener,
//   - useLazyLoader grows the rendered batch as the user scrolls down.
// The BC.W-VIRTUAL-WINDOW bridge is composed AT THE CALL SITE: the ToC-click
// fires useVirtualSectionWindow.ensureTargetWindow(id) (warm) BEFORE
// useScrollTo.scrollTo(id) — the two leaves are file-disjoint, joined here.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { computed, ref } from "vue";
import {
    useScrollTracker,
    useSidebarFollow,
    useScrollTo,
    useClickDelegate,
    useLazyLoader,
    useTreeIndex,
    type SidebarSection,
} from "@glass/composables/sidebar";
import { useVirtualSectionWindow } from "@glass/composables/virtual";
import type { FlatSection } from "@glass/composables/virtual";

// ── A synthetic long document — 12 roots, each with 3 subsections ───────────
const SECTIONS: SidebarSection[] = Array.from({ length: 12 }, (_, i) => ({
    id: `sec-${i}`,
    title: `Section ${i + 1}`,
    children: Array.from({ length: 3 }, (_, j) => ({
        id: `sec-${i}-${j}`,
        title: `${i + 1}.${j + 1} Subsection`,
    })),
}));

// Flat list of EVERY node id in document order (for the lazy-loader count + the
// FlatSection windowing input).
const FLAT_IDS = SECTIONS.flatMap((s) => [
    s.id,
    ...(s.children ?? []).map((c) => c.id),
]);
const totalCount = SECTIONS.length;

const { index: treeIndex } = useTreeIndex(SECTIONS);

// The FlatSection input for the warm-window bridge (the consumer's flattener).
const flatSections = computed<FlatSection[]>(() =>
    SECTIONS.map((s, i) => ({
        id: s.id,
        index: i,
        depth: 0,
        rootId: s.id,
        parentId: s.id,
        rootIndex: i,
        estimatedHeight: 320,
    })),
);

const scrollContainer = ref<HTMLElement | null>(null);
const navContainer = ref<HTMLElement | null>(null);

// ── Lazy-loader: the progressive render-mount count ─────────────────────────
const { visibleCount, loadSentinel } = useLazyLoader(totalCount, {
    batchSize: 3,
    scrollContainer,
});
const visibleSections = computed(() => SECTIONS.slice(0, visibleCount.value));

// ── The virtual window (the warm source for the bridge) ─────────────────────
const { ensureTargetWindow } = useVirtualSectionWindow({
    items: flatSections,
    scrollContainer,
});

// ── Scroll-to: the rAF-retry + treeIndex-aware partial-load ─────────────────
const { scrollTo } = useScrollTo({
    scrollContainer,
    totalCount,
    visibleCount,
    treeIndex,
});

// The ToC-click chain: warm-window THEN scroll-to (the bridge, at the call site).
function handleToc(id: string) {
    ensureTargetWindow(id);
    scrollTo(id);
}

// ── Scroll tracking: deepest-visible drives the active highlight ────────────
const { activeId, activeRootId } = useScrollTracker(
    () => SECTIONS,
    () => treeIndex,
    { scrollContainer },
);

// ── Sidebar follow: keep the active ToC item in the nav viewport ────────────
useSidebarFollow({
    sidebarEl: navContainer,
    activeId,
    activeRootId,
    scrollSource: scrollContainer,
});

// ── Click delegation: ONE listener resolves [data-scroll-target] → scrollTo ──
useClickDelegate({
    container: navContainer,
    resolve: (value) => value,
    scrollTo: handleToc,
});
</script>

<template>
    <StoryPage>
        <StorySection
            heading="ToC tracking — the reconciled family"
            blurb="One home (@mkbabb/glass-ui/sidebar): the active section tracks the deepest visible node, the sidebar auto-scrolls to keep it in view, a ToC click warms the virtual window then smooth-scrolls, and the rendered batch grows as you scroll."
        >
            <div class="grid grid-cols-[200px_1fr] gap-4 h-[480px]">
                <!-- The ToC sidebar (delegated clicks, damped follow) -->
                <nav
                    ref="navContainer"
                    class="themed-card overflow-y-auto scrollbar-thin p-2 rounded-xl space-y-0.5"
                >
                    <template v-for="root in SECTIONS" :key="root.id">
                        <button
                            :data-toc-id="root.id"
                            :data-scroll-target="root.id"
                            :class="[
                                'w-full text-left px-3 py-1.5 rounded-md text-sm transition-fast',
                                activeRootId === root.id || activeId === root.id
                                    ? 'bg-primary/10 text-primary font-medium'
                                    : 'hover:bg-muted/50 text-muted-foreground',
                            ]"
                        >
                            {{ root.title }}
                        </button>
                        <button
                            v-for="child in root.children"
                            :key="child.id"
                            :data-toc-id="child.id"
                            :data-scroll-target="child.id"
                            :class="[
                                'w-full text-left pl-6 pr-3 py-1 rounded-md text-xs transition-fast',
                                activeId === child.id
                                    ? 'bg-primary/10 text-primary'
                                    : 'hover:bg-muted/40 text-muted-foreground/80',
                            ]"
                        >
                            {{ child.title }}
                        </button>
                    </template>
                </nav>

                <!-- The long scroll document -->
                <div
                    ref="scrollContainer"
                    class="themed-card overflow-y-auto scrollbar-thin p-4 rounded-xl"
                >
                    <template
                        v-for="root in visibleSections"
                        :key="root.id"
                    >
                        <section :id="root.id" class="mb-8">
                            <h3 class="text-lg font-semibold mb-2">
                                {{ root.title }}
                            </h3>
                            <p class="text-sm text-muted-foreground mb-4">
                                A scrollable section body for {{ root.title }}.
                                Scroll to watch the active ToC item track the
                                deepest visible node.
                            </p>
                            <section
                                v-for="child in root.children"
                                :id="child.id"
                                :key="child.id"
                                class="mb-4 pl-3 border-l-2 border-border/50"
                            >
                                <h4 class="text-sm font-medium mb-1">
                                    {{ child.title }}
                                </h4>
                                <p class="text-xs text-muted-foreground">
                                    Subsection body content. The deepest visible
                                    node wins the active highlight.
                                </p>
                            </section>
                        </section>
                    </template>
                    <!-- The lazy-loader bottom sentinel -->
                    <div ref="loadSentinel" class="h-1" />
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
