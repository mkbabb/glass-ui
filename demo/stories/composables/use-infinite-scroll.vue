<script setup lang="ts">
// useInfiniteScroll — scroll-driven incremental load. Live primitive demo: data/infinite-scroll.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
</script>

<template>
    <StoryPage>
        <StorySection
            label="scroll-driven load"
            blurb="Infinite-scroll engine sitting under the InfiniteScroll primitive. Pairs an IntersectionObserver sentinel with a fetch loop; gates concurrent fetches so the consumer only ever sees one in-flight request per direction."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <pre v-pre class="fira-code text-sm overflow-x-auto"><code>const { items, loading, error, loadMore, reset } = useInfiniteScroll({
  fetchPage: async (cursor) =&gt; ({ items: [...], next: nextCursor }),
  threshold: 0.5,
});</code></pre>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="see also"
            blurb="Live primitive demo: Data / Infinite Scroll."
        />
    </StoryPage>
</template>
