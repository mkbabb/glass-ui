<script setup lang="ts">
// useWindowedStore — sliding-window resident store backing virtual lists.
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { Button } from "../../../src/components/ui/button";
import { useWindowedStore } from "../../../src/composables/virtual/useWindowedStore";

const store = useWindowedStore<{ id: number; label: string }>({ maxResident: 50 });

let nextId = 0;
function appendBatch() {
    const batch = Array.from({ length: 30 }, () => {
        const id = nextId++;
        return { id, label: `item-${id}` };
    });
    // appendIfCurrent rejects stale appends; this top-up uses set with replace=false
    store.set(batch, false);
}

function reset() {
    store.clear();
    nextId = 0;
}
</script>

<template>
    <StoryPage>
        <StorySection
            label="sliding window with eviction"
            blurb="Backs virtual / infinite lists. Append-with-eviction trims items from the front when the window grows past maxResident; the windowStart ref tracks the logical offset of items[0]. A generation counter rejects stale appends after a backward reset."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-col gap-3">
                    <div class="flex gap-2">
                        <Button @click="appendBatch">+30 items</Button>
                        <Button variant="outline" @click="reset">reset</Button>
                    </div>
                    <div class="grid grid-cols-3 gap-3 text-sm">
                        <div>resident: <code class="fira-code">{{ store.items.value.length }}</code></div>
                        <div>windowStart: <code class="fira-code">{{ store.windowStart }}</code></div>
                        <div>generation: <code class="fira-code">{{ store.generation }}</code></div>
                    </div>
                    <div class="max-h-60 overflow-auto rounded-md border border-border bg-card p-3 font-mono text-xs">
                        <div v-for="item in store.items.value" :key="item.id">
                            {{ item.label }}
                        </div>
                    </div>
                </div>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
