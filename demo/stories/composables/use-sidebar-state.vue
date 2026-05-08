<script setup lang="ts">
// useSidebarState — orchestrator of useScrollTracker + useSidebarFollow + useTreeIndex.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
</script>

<template>
    <StoryPage>
        <StorySection
            label="orchestrator composable"
            blurb="Single-call combiner of the three sidebar primitives. Pass a tree config + scroll container; receive { activeId, isExpanded, expand, collapse, toggle, isInActiveChain } as the canonical sidebar API surface."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <pre v-pre class="fira-code text-sm overflow-x-auto"><code>const sidebar = useSidebarState({
  tree,                // TreeNode[]
  scrollContainer,
  expandActiveAncestors: true,
  followCursor: true,
});

sidebar.activeId        // currently visible section id
sidebar.isExpanded(id)  // whether a node is expanded
sidebar.toggle(id)
sidebar.isInActiveChain(id)</code></pre>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="see also"
            blurb="Live composition: Navigation / Sidebar."
        />
    </StoryPage>
</template>
