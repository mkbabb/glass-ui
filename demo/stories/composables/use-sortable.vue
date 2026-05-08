<script setup lang="ts">
// useSortable — pointer-capture drag-reorder. Live demo at data/sortable-list.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
</script>

<template>
    <StoryPage>
        <StorySection
            label="pointer-capture drag-reorder"
            blurb="Headless composable for drag-reorder lists. Owns pointer handling, drop resolution, splice math + DOM-clone drag ghost. Cross-list drops via the `group` prop — two SortableLists sharing a group accept items from each other."
        />

        <StorySection
            label="API"
            blurb="Returns container + registerItem + isDragging + dragId + dragPosition + dropIndex. Spread the container binding on the host element; call registerItem(item, getId) to obtain a per-row binding (ref + dataAttrs + class + onPointerdown). Live primitive demo: Data / Sortable List."
        >
            <ShowcaseFrame pad="md" tier="quiet">
                <pre class="fira-code text-sm overflow-x-auto"><code>const { container, registerItem, isDragging, dragId, dropIndex } = useSortable&lt;T&gt;({
  items,
  getId: (item) =&gt; item.id,
  group: "lists",                      // optional cross-list group id
  onReorder: (next) =&gt; { items.value = next; },
  onInsert:  (index, item) =&gt; { /* foreign-list drop */ },
  handleSelector: ".drag-handle",      // optional restrict to a sub-element
});

&lt;ul v-bind="container"&gt;
  &lt;li
    v-for="row in items"
    :key="row.id"
    v-bind="registerItem(row, row.id)"
  &gt;{{ row.label }}&lt;/li&gt;
&lt;/ul&gt;</code></pre>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
