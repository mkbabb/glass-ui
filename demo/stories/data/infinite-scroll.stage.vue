<script setup lang="ts">
// InfiniteScroll's stage: a feed that scrolls inside the stage and loads eight more
// entries as its end comes near, six times, then says it is done.
import { ref } from "vue";
import { InfiniteScroll } from "@glass/components/infinite-scroll";

interface Entry {
    id: number;
    who: string;
    what: string;
}

const PAGE = 8;
const PAGES = 6;
const WHO = ["Ada", "Alan", "Grace", "Edsger", "Claude", "Barbara", "Donald", "Frances"];
const WHAT = [
    "left a comment on the draft",
    "moved the launch to Friday",
    "shared the quarterly figures",
    "approved the new layout",
    "asked for a second review",
    "closed the open questions",
    "uploaded the final photos",
];

const entries = ref<Entry[]>([]);
const loading = ref(false);
const more = ref(true);

async function loadMore(): Promise<void> {
    if (loading.value || !more.value) return;
    loading.value = true;
    await new Promise((r) => setTimeout(r, 480));
    const start = entries.value.length;
    for (let i = 0; i < PAGE; i++) {
        const n = start + i;
        entries.value.push({ id: n, who: WHO[n % WHO.length]!, what: WHAT[(n * 3) % WHAT.length]! });
    }
    if (entries.value.length >= PAGE * PAGES) more.value = false;
    loading.value = false;
}

void loadMore();
</script>

<template>
    <InfiniteScroll
        class="infinite-scroll-stage"
        :has-more="more"
        :is-loading="loading"
        :threshold="160"
        @load-more="loadMore"
    >
        <ul class="infinite-scroll-stage-list">
            <li v-for="e in entries" :key="e.id" class="infinite-scroll-stage-row">
                {{ e.who }} {{ e.what }}
            </li>
        </ul>
        <template #end>That is everything.</template>
    </InfiniteScroll>
</template>

<style scoped>
.infinite-scroll-stage {
    block-size: 100%;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding-inline: var(--sp-5);
}
.infinite-scroll-stage-list {
    inline-size: min(100%, 36rem);
    margin-inline: auto;
}
.infinite-scroll-stage-row {
    padding-block: var(--sp-3);
    border-block-end: 1px solid var(--border);
}
</style>

<style>
/* On its card the stage has no height to fill: hold it to the plate's. */
[data-card-specimen] .infinite-scroll-stage {
    block-size: 10rem;
}
</style>
