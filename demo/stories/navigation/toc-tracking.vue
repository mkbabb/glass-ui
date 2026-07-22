<script setup lang="ts">
// the /navigation/toc-tracking story exercising the ONE
// reconciled ToC-tracking family from @mkbabb/glass-ui/sidebar:
//   - useScrollTracker (reactive-roots, deepest-visible-wins) drives the active
//     highlight as the long document scrolls,
//   - useSidebarFollow keeps the active ToC item in the nav viewport (damped),
//   - useScrollTo loads the target's root and smooth-scrolls on a ToC click
//     (the partial-load + rAF-retry settle),
//   - useClickDelegate handles every ToC link with ONE delegated listener,
//   - useLazyLoader grows the rendered batch as the user scrolls down.
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
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

// ── A synthetic long document — 12 roots, each with 3 subsections ───────────
const SECTIONS: SidebarSection[] = Array.from({ length: 12 }, (_, i) => ({
    id: `sec-${i}`,
    title: `Section ${i + 1}`,
    children: Array.from({ length: 3 }, (_, j) => ({
        id: `sec-${i}-${j}`,
        title: `${i + 1}.${j + 1} Subsection`,
    })),
}));

const totalCount = SECTIONS.length;

const { index: treeIndex } = useTreeIndex(SECTIONS);

const scrollContainer = ref<HTMLElement | null>(null);
const navContainer = ref<HTMLElement | null>(null);

// ── Lazy-loader: the progressive render-mount count ─────────────────────────
const { visibleCount, loadSentinel } = useLazyLoader(totalCount, {
    batchSize: 3,
    scrollContainer,
});
const visibleSections = computed(() => SECTIONS.slice(0, visibleCount.value));

// ── Scroll-to: the rAF-retry + treeIndex-aware partial-load ─────────────────
const { scrollTo } = useScrollTo({
    scrollContainer,
    totalCount,
    visibleCount,
    treeIndex,
});

// ── Scroll tracking: deepest-visible drives the active highlight ────────────
const { activeId, activeRootId } = useScrollTracker(
    () => visibleSections.value,
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
    scrollTo,
});
</script>

<template>
    <StoryPage>
        <StorySection
            heading="ToC tracking — the reconciled family"
            blurb="The active section follows the deepest visible heading, stays in view in the sidebar, and scrolls smoothly to a selected destination while long documents render in measured batches."
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
                                'w-full text-left px-3 py-1.5 rounded-md text-small transition-fast',
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
                                'w-full text-left pl-6 pr-3 py-1 rounded-md text-micro transition-fast',
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
                    <template v-for="root in visibleSections" :key="root.id">
                        <section :id="root.id" class="mb-8">
                            <h3 class="text-lg font-semibold mb-2">
                                {{ root.title }}
                            </h3>
                            <p class="text-small text-muted-foreground mb-4">
                                A scrollable section body for {{ root.title }}. Scroll
                                to watch the active ToC item track the deepest visible
                                node.
                            </p>
                            <section
                                v-for="child in root.children"
                                :id="child.id"
                                :key="child.id"
                                class="mb-4 pl-3 border-l-2 border-border/50"
                            >
                                <h4 class="text-small font-medium mb-1">
                                    {{ child.title }}
                                </h4>
                                <p class="text-micro text-muted-foreground">
                                    Subsection body content. The deepest visible node
                                    wins the active highlight.
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
