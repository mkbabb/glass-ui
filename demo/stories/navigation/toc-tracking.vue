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
        <!-- `span="full"`: a two-pane instrument is StorySection's own "stage" case.
             In the default cel track (21rem = 336px) a `200px` nav left the document
             ~130px wide — the instrument was unreadable at every width, and the
             section's own prop says so. -->
        <StorySection
            span="full"
            heading="ToC tracking — the reconciled family"
            blurb="The active section follows the deepest visible heading, stays in view in the sidebar, and scrolls smoothly to a selected destination while long documents render in measured batches."
        >
            <!-- [BK #58] `h-[480px]` is STRUCK for `story-stage`: layout.css declares
                 the ONE stage envelope (`--stage-block`, min(62svh, 44rem)) and says in
                 as many words that every story which used to spell its own `vh`/px
                 height reads this instead. A second height here is a second answer to a
                 question the chassis has already answered.
                 The tracks are a PROPORTION with a cap from the measure series, not a
                 device literal: the ToC takes at most one cel and never more than 30%
                 of the instrument, and the document takes the rest. `200px` was neither
                 — at 390 it was half the screen, at 1440 it was a sliver. -->
            <div
                class="story-stage grid gap-(--sp-4) grid-cols-[minmax(0,min(var(--measure-cel),30%))_minmax(0,1fr)]"
            >
                <!-- The ToC sidebar (delegated clicks, damped follow).
                     [BK #58 TOC-MENU-GLASS · clean break] `themed-card` is GONE with no
                     alias. It was a class name with NO definition anywhere in `src/` or
                     `demo/` — a whole-repo grep found exactly these two consumers and
                     zero producers — so both panes of this instrument painted as bare
                     transparent boxes while reading, in the markup, as if they carried
                     card material. `glass-resting` is the library's own canonical plate
                     rung and `rounded-panel` its matching radius role. -->
                <nav
                    ref="navContainer"
                    class="glass-resting scrollbar-thin space-y-(--sp-1) overflow-y-auto rounded-panel p-(--sp-2)"
                >
                    <template v-for="root in SECTIONS" :key="root.id">
                        <button
                            :data-toc-id="root.id"
                            :data-scroll-target="root.id"
                            :class="[
                                'w-full rounded-control px-(--sp-3) py-(--sp-2) text-left text-small transition-fast',
                                activeRootId === root.id || activeId === root.id
                                    ? 'bg-primary/10 text-primary font-medium'
                                    : 'text-foreground hover:bg-muted/50',
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
                                'w-full rounded-control py-(--sp-1) pr-(--sp-3) pl-(--sp-5) text-left text-micro transition-fast',
                                activeId === child.id
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:bg-muted/40',
                            ]"
                        >
                            {{ child.title }}
                        </button>
                    </template>
                </nav>

                <!-- The long scroll document — the second `themed-card` consumer,
                     struck with the first. -->
                <div
                    ref="scrollContainer"
                    class="glass-resting scrollbar-thin overflow-y-auto rounded-panel p-(--sp-4)"
                >
                    <template v-for="root in visibleSections" :key="root.id">
                        <section :id="root.id" class="mb-(--sp-6)">
                            <!-- [BK #58 · BD T49 toc-readability] The document's own
                                 hierarchy reads off the house type ladder, not the
                                 Tailwind scale: `text-lg font-semibold` was a size with
                                 no rung, one step from the `text-small` body, so the
                                 tracker's target headings barely separated from the
                                 prose they head. `text-subheading` is the rung. The
                                 child rows likewise stop being `text-muted-foreground/80`
                                 — an alpha ON an already-muted colour, faded twice —
                                 and separate by SIZE and indent instead. -->
                            <h3 class="text-subheading mb-(--sp-2)">
                                {{ root.title }}
                            </h3>
                            <p class="text-small text-muted-foreground mb-(--sp-4)">
                                A scrollable section body for {{ root.title }}. Scroll
                                to watch the active ToC item track the deepest visible
                                node.
                            </p>
                            <section
                                v-for="child in root.children"
                                :id="child.id"
                                :key="child.id"
                                class="mb-(--sp-4) border-l-2 border-border/50 pl-(--sp-3)"
                            >
                                <h4 class="text-small mb-(--sp-1) font-medium">
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
