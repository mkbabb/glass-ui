<script setup lang="ts">
import { ref, watch } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Button } from "@glass/components/button";
import { PagerDots } from "@glass/components/pager-dots";

const count = ref(8);
const active = ref(3);
watch(count, (total) => {
    active.value = Math.min(active.value, Math.max(0, total - 1));
});
</script>

<template>
    <StoryPage>
        <StorySection
            heading="Position, without noise"
            label="pager-dots"
            blurb="A local liquid indicator over crisp, accessible page targets. Change the count to exercise window boundaries and selection recovery."
        >
            <div class="flex flex-col items-center gap-6 rounded-card glass-quiet p-8">
                <PagerDots
                    v-model:active="active"
                    :count="count"
                    :window-fit="5"
                    aria-label="Example pages"
                />
                <p class="text-mono-caption">Page {{ count ? active + 1 : 0 }} of {{ count }}</p>
                <div class="flex items-center gap-3">
                    <Button emphasis="quiet" :disabled="count === 0" @click="count--">Remove page</Button>
                    <Button emphasis="quiet" :disabled="count === 12" @click="count++">Add page</Button>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
