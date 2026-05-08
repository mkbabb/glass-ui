<script setup lang="ts">
// useTreeIndex — memoised flat-index of a hierarchical tree.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
</script>

<template>
    <StoryPage>
        <StorySection
            label="flat-index over a hierarchical tree"
            blurb="Returns a Map&lt;id, TreeIndexEntry&gt; — every node carries depth + parentId + rootId + rootIndex. Backs sidebar nav, ToC, and any UI that needs O(1) tree-position queries. Companion helpers: buildTreeIndex (pure), isActive(id, activeId), isInActiveChain(id, activeId)."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <pre v-pre class="fira-code text-sm overflow-x-auto"><code>const index = useTreeIndex&lt;MyNode&gt;(roots, {
  getChildren: (n) =&gt; n.kids,    // optional accessor
});

const entry = index.get(id);
// entry: { node, depth, rootId, parentId, rootIndex }

isActive(id, activeId)            // direct match
isInActiveChain(id, activeId)     // ancestor-of relation</code></pre>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
