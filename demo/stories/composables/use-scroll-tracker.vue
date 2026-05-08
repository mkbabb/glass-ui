<script setup lang="ts">
// useScrollTracker — active section tracking as host scrolls.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
</script>

<template>
    <StoryPage>
        <StorySection
            label="scroll-position → active section"
            blurb="Tracks the active section as the host scrolls. Composes inside useSidebarState; standalone consumers can use it for ToC / outline / sidebar-nav active-state."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <pre v-pre class="fira-code text-sm overflow-x-auto"><code>const { activeId } = useScrollTracker&lt;TreeNode&gt;({
  scrollContainer,    // Ref&lt;HTMLElement | null&gt;
  index,              // TreeIndex from useTreeIndex
  rootMargin: "0px",
});

// activeId.value reflects the section currently in the viewport top-band.</code></pre>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
