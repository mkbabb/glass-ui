<script setup lang="ts">
// useVirtualSectionWindow — virtualizes a sectioned (grouped-headers) flat list.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
</script>

<template>
    <StoryPage>
        <StorySection
            label="virtualized sectioned lists"
            blurb="Backs the canonical grouped-headers flat-list layout (think 'recent / older / archived' contact lists). Pairs scrollContainer + items + estimated heights; emits the visible window range + scroll offset for sticky headers."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <pre class="fira-code text-sm overflow-x-auto"><code>const { window, activeSection, layout } = useVirtualSectionWindow({
  items: () =&gt; flatItems,            // FlatSection[] (depth + parentId + estimatedHeight)
  scrollContainer,                   // Ref&lt;HTMLElement | null&gt;
  contentEl,                         // optional wrapper for offset accounting
  overscanBeforePx: 200,
  overscanAfterPx: 600,
  forceWindow,                       // optional manual range (e.g. for jump-to-section)
});

window.value          // SectionWindowRange { start, end }
activeSection.value   // currently sticky section id
layout.value          // SectionLayout (cumulative offsets for offset-jumps)</code></pre>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="see also"
            blurb="The virtual-mode <DataTable> primitive composes this for sectioned grids; the Sidebar's section nav uses the layout offsets for accurate scroll-into-view."
        />
    </StoryPage>
</template>
