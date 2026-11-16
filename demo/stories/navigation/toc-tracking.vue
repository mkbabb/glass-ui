<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StoryStage from "../../chassis/stage/StoryStage.vue";
import StoryCode from "../../chassis/code/StoryCode.vue";
import TocTrackingStage from "./toc-tracking.stage.vue";

const snippet = `<script setup lang="ts">
import { ref } from "vue";
import { useScrollTracker, useTreeIndex } from "@mkbabb/glass-ui/sidebar";

const doc = ref<HTMLElement | null>(null);
const { index } = useTreeIndex(sections);
const { activeId } = useScrollTracker(() => sections, () => index, {
    scrollContainer: doc,
});
<\/script>

<template>
    <a v-for="s in sections" :key="s.id" :data-active="activeId === s.id">{{ s.title }}</a>
    <div ref="doc"><section v-for="s in sections" :id="s.id" :key="s.id">…</section></div>
</template>`;
</script>

<template>
    <StoryPage>
        <template #stage>
            <StoryStage size="tall">
                <TocTrackingStage />
            </StoryStage>
        </template>

        <template #code>
            <StoryCode :code="snippet" />
        </template>
    </StoryPage>
</template>
